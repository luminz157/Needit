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
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// API Endpoints

// 1. Submit a new contact inquiry
app.post('/api/contact', (req, res) => {
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

    transporter.sendMail(mailOptions).catch(err => console.error('Email sending failed (Check .env credentials):', err.message));

    res.status(201).json({ 
      success: true, 
      message: 'Inquiry submitted successfully',
      id: info.lastInsertRowid 
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to save inquiry to the database.' });
  }
});

// 2. Google Form Webhook
app.post('/api/google-form', async (req, res) => {
  const formData = req.body;

  try {
    const insert = db.prepare('INSERT INTO applications (data) VALUES (?)');
    const info = insert.run(JSON.stringify(formData));
    
    // Generate PDF Report in memory
    const generatePDF = () => new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50 });
      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      // Design the PDF
      doc.fontSize(24).fillColor('#1e0a3c').text('Needit Startup', { align: 'center' });
      doc.moveDown();
      doc.fontSize(18).fillColor('#333333').text('Official Application Report', { align: 'center' });
      doc.moveDown(2);
      
      doc.fontSize(10).fillColor('#888888').text(`Generated: ${new Date().toLocaleString()}`, { align: 'right' });
      doc.moveDown();
      
      doc.rect(50, doc.y, 500, 1).fill('#dddddd');
      doc.moveDown(2);

      Object.entries(formData).forEach(([question, answer]) => {
        doc.fontSize(12).fillColor('#1e0a3c').text(question, { continued: false });
        doc.moveDown(0.5);
        doc.fontSize(12).fillColor('#555555').text(String(answer), { indent: 15 });
        doc.moveDown(1.5);
      });

      doc.end();
    });

    const pdfBuffer = await generatePDF();

    // Send Email to Founder with PDF attachment
    const mailOptions = {
      from: `"Needit Startup" <${process.env.EMAIL_USER}>`,
      to: process.env.FOUNDER_EMAIL || process.env.EMAIL_USER,
      subject: `📄 New Application Report Received!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #1e0a3c;">New Application Received!</h2>
          <p>Someone just submitted the Google Application Form.</p>
          <p>Please find the official PDF report attached to this email.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #888;">Automated notification from your NeeditStartup backend.</p>
        </div>
      `,
      attachments: [
        {
          filename: 'Application_Report.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ success: true, message: 'Application processed and PDF sent' });
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
