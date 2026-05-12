require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const db = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'needit_super_secret_key_123';

// Auto-create initial admin if not exists
const initAdmin = async () => {
  const adminExists = db.prepare('SELECT COUNT(*) as count FROM admins').get();
  if (adminExists.count === 0) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'needit2026', 10);
    db.prepare('INSERT INTO admins (username, password) VALUES (?, ?)').run('admin', hashedPassword);
    console.log('--- DEFAULT ADMIN CREATED ---');
  }
};
initAdmin();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Email Transporter Setup
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// --- AUTH MIDDLEWARE ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token.' });
    req.user = user;
    next();
  });
};

// --- API ENDPOINTS ---

// 1. Contact Inquiry
app.post('/api/contact', async (req, res) => {
  const { name, email, company, message } = req.body;
  try {
    const insert = db.prepare('INSERT INTO contacts (name, email, company, message) VALUES (?, ?, ?, ?)');
    insert.run(name, email, company || '', message);
    
    await transporter.sendMail({
      from: `"Needit Startup" <${process.env.EMAIL_USER}>`,
      to: process.env.FOUNDER_EMAIL || process.env.EMAIL_USER,
      subject: `🚀 New Inquiry from ${name}`,
      html: `<p>New inquiry from ${name} (${email})</p><p>${message}</p>`
    });

    res.status(201).json({ success: true, message: 'Inquiry received' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Google Form Webhook
app.post('/api/google-form', async (req, res) => {
  const formData = req.body;
  try {
    const insert = db.prepare('INSERT INTO applications (data) VALUES (?)');
    const info = insert.run(JSON.stringify(formData));
    
    const findEmail = (data) => {
      const keys = Object.keys(data);
      for (const key of keys) {
        if (key.toLowerCase().includes('email')) {
          const val = data[key]?.trim();
          if (val && val.includes('@')) return val;
        }
      }
      return null;
    };
    
    const userEmail = findEmail(formData);

    const generatePDF = () => new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);
      doc.rect(0, 0, 600, 150).fill('#1e0a3c');
      doc.fontSize(28).fillColor('#ffffff').text('NEEDIT STARTUP', 50, 65);
      doc.moveDown(5);
      doc.fillColor('#1e0a3c').fontSize(16).text('Application Receipt');
      Object.entries(formData).forEach(([q, a]) => {
        if (!a) return;
        doc.fontSize(10).fillColor('#1e0a3c').text(String(q).trim().toUpperCase());
        doc.fontSize(10).fillColor('#444444').text(String(a).trim(), { indent: 15 });
        doc.moveDown(1);
      });
      doc.end();
    });

    const pdfBuffer = await generatePDF();

    if (userEmail) {
      await transporter.sendMail({
        from: `"Needit Startup" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: `Your Briefing - Needit Startup`,
        html: `<p>Thank you for applying. See attached report.</p>`,
        attachments: [{ filename: 'Report.pdf', content: pdfBuffer }]
      });
    }

    await transporter.sendMail({
      from: `"Needit Startup" <${process.env.EMAIL_USER}>`,
      to: process.env.FOUNDER_EMAIL || process.env.EMAIL_USER,
      subject: `🚀 New Application Received`,
      html: `<p>New application received. See attached report.</p>`,
      attachments: [{ filename: 'Report.pdf', content: pdfBuffer }]
    });

    res.status(201).json({ success: true, message: 'Processed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// --- ADMIN SECURE ENDPOINTS ---

// A. Admin Login
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username);
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

    // If 2FA is not enabled, return token. If enabled, return flag.
    if (!admin.two_factor_enabled) {
      const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '8h' });
      return res.json({ success: true, token, twoFactorRequired: false });
    }

    res.json({ success: true, twoFactorRequired: true, tempId: admin.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// B. Verify 2FA and Login
app.post('/api/admin/2fa/verify-login', async (req, res) => {
  const { tempId, code } = req.body;
  try {
    const admin = db.prepare('SELECT * FROM admins WHERE id = ?').get(tempId);
    if (!admin) return res.status(401).json({ error: 'Session expired' });

    const verified = speakeasy.totp.verify({
      secret: admin.two_factor_secret,
      encoding: 'base32',
      token: code,
      window: 1 // Allows for 30 seconds of clock drift
    });

    if (!verified) return res.status(401).json({ error: 'Invalid 2FA code' });

    const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '8h' });
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// C. Setup 2FA (Get QR Code)
app.post('/api/admin/2fa/setup', authenticateToken, async (req, res) => {
  try {
    const secret = speakeasy.generateSecret({ name: `NeeditStartup (${req.user.username})` });
    const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);

    // Save secret temporarily (unverified)
    db.prepare('UPDATE admins SET two_factor_secret = ? WHERE id = ?').run(secret.base32, req.user.id);

    res.json({ success: true, qrCode: qrCodeUrl, secret: secret.base32 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// D. Confirm 2FA Setup
app.post('/api/admin/2fa/confirm', authenticateToken, (req, res) => {
  const { code } = req.body;
  try {
    const admin = db.prepare('SELECT * FROM admins WHERE id = ?').get(req.user.id);
    const verified = speakeasy.totp.verify({
      secret: admin.two_factor_secret,
      encoding: 'base32',
      token: code,
      window: 1 // Allows for 30 seconds of clock drift
    });

    if (verified) {
      db.prepare('UPDATE admins SET two_factor_enabled = 1 WHERE id = ?').run(req.user.id);
      res.json({ success: true, message: '2FA Enabled successfully' });
    } else {
      res.status(400).json({ error: 'Invalid code. Verification failed.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// E. Change Password
app.post('/api/admin/password/update', authenticateToken, async (req, res) => {
  const { newPassword } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    db.prepare('UPDATE admins SET password = ? WHERE id = ?').run(hashedPassword, req.user.id);
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// F. Admin View Data (Protected)
app.get('/api/admin/contacts', authenticateToken, (req, res) => {
  const contacts = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all();
  res.json({ success: true, data: contacts });
});

app.get('/api/admin/applications', authenticateToken, (req, res) => {
  const apps = db.prepare('SELECT * FROM applications ORDER BY created_at DESC').all();
  res.json({ success: true, data: apps });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
