require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
