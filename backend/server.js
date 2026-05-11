const express = require('express');
const cors = require('cors');
const db = require('./db');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

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

// API Endpoints

// 1. Submit a new contact inquiry
app.post('/api/contact', async (req, res) => {
  const { name, email, company, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required fields.' });
  }

  try {
    const insert = db.prepare('INSERT INTO contacts (name, email, company, message) VALUES (?, ?, ?, ?)');
    const info = insert.run(name, email, company || '', message);
    
    // Send Email to Founder
    const mailOptions = {
      from: `"Needit Startup" <${process.env.EMAIL_USER}>`,
      to: process.env.FOUNDER_EMAIL || process.env.EMAIL_USER,
      subject: `🚀 New Startup Inquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #1e0a3c;">New Startup Inquiry Received!</h2>
          <p>A new potential client/partner just filled out the contact form on NeeditStartup.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Startup / Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${message}</div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #888;">This is an automated notification from your NeeditStartup backend.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ 
      success: true, 
      message: 'Inquiry submitted successfully',
      id: info.lastInsertRowid 
    });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ 
      error: 'Backend Error: Failed to send email.',
      details: error.message 
    });
  }
});

// 2. Google Form Webhook
app.post('/api/google-form', async (req, res) => {
  const formData = req.body;

  try {
    const insert = db.prepare('INSERT INTO applications (data) VALUES (?)');
    const info = insert.run(JSON.stringify(formData));
    
    console.log("--- New Application Received ---");
    console.log("Form Data:", JSON.stringify(formData, null, 2));
    
    // Find User Email from Form Data (Finds the first NON-EMPTY email)
    const findEmail = (data) => {
      const keys = Object.keys(data);
      // Look for keys containing "email", then check if they have a value
      for (const key of keys) {
        if (key.toLowerCase().includes('email')) {
          const value = data[key] ? data[key].trim() : '';
          if (value && value.includes('@')) return value;
        }
      }
      return null;
    };
    
    const userEmail = findEmail(formData);
    console.log("Detected User Email:", userEmail);

    console.log("Step 1: Starting PDF Generation...");
    // Generate Premium PDF Report
    const generatePDF = () => new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50, size: 'A4' });
        const buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
        doc.on('error', (err) => {
          console.error("PDF Error Event:", err);
          reject(err);
        });

        // --- PDF HEADER ---
        doc.rect(0, 0, 600, 150).fill('#1e0a3c');
        doc.fontSize(28).fillColor('#ffffff').text('NEEDIT STARTUP', 50, 65);
        
        doc.moveDown(5);

        // --- CONTENT ---
        doc.fillColor('#1e0a3c').fontSize(16).text('Application Receipt & Initial Briefing');
        doc.moveDown(1.5);
        
        doc.fontSize(10).fillColor('#888888').text(`Reference ID: #APP-${info.lastInsertRowid}`, { align: 'right' });
        doc.moveDown(2);

        Object.entries(formData).forEach(([question, answer]) => {
          if (!answer || !question) return;
          doc.fontSize(10).fillColor('#1e0a3c').text(String(question).trim().toUpperCase());
          doc.moveDown(0.2);
          doc.fontSize(10).fillColor('#444444').text(String(answer).trim(), { indent: 15 });
          doc.moveDown(1);
        });

        doc.end();
      } catch (err) {
        console.error("PDF Catch Error:", err);
        reject(err);
      }
    });

    const pdfBuffer = await generatePDF();
    console.log("Step 2: PDF Generated successfully. Size:", pdfBuffer.length);

    // 1. Send Briefing to User
    if (userEmail) {
      console.log("Step 3: Sending email to USER:", userEmail);
      const userMail = {
        from: `"Needit Startup" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: `Your Global Expansion Briefing - Needit Startup`,
        html: `<h3>Thank you for applying to Needit Startup.</h3><p>Please find your briefing report attached.</p>`,
        attachments: [{ filename: 'Needit_Expansion_Briefing.pdf', content: pdfBuffer }]
      };
      await transporter.sendMail(userMail);
      console.log("Step 4: User email SENT.");
    }

    // 2. Send Copy to Founder
    console.log("Step 5: Sending email to FOUNDER...");
    const founderMail = {
      from: `"Needit Startup" <${process.env.EMAIL_USER}>`,
      to: process.env.FOUNDER_EMAIL || process.env.EMAIL_USER,
      subject: `🚀 New Application Received`,
      html: `<p>New application received. See attached briefing.</p>`,
      attachments: [{ filename: 'Report.pdf', content: pdfBuffer }]
    };
    await transporter.sendMail(founderMail);
    console.log("Step 6: Founder email SENT.");

    res.status(201).json({ success: true, message: 'Application stored and briefings sent' });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Failed to process application.' });
  }
});

// 3. Admin endpoint to view all contacts
app.get('/api/admin/contacts', (req, res) => {
  try {
    const contacts = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all();
    res.status(200).json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to retrieve contacts.' });
  }
});

// 4. Admin endpoint to view all applications
app.get('/api/admin/applications', (req, res) => {
  try {
    const applications = db.prepare('SELECT * FROM applications ORDER BY created_at DESC').all();
    res.status(200).json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to retrieve applications.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Admin dashboard data available at http://localhost:${PORT}/api/admin/contacts`);
});

// Keep event loop alive
setInterval(() => {}, 1000 * 60 * 60);
