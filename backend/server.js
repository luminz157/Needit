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
    
    // Find User Email from Form Data (Better detection for spaced keys)
    const findEmail = (data) => {
      const keys = Object.keys(data);
      // Look for any key that contains "email" after trimming spaces
      const emailKey = keys.find(k => k.trim().toLowerCase().includes('email'));
      return emailKey ? data[emailKey].trim() : null;
    };
    
    const userEmail = findEmail(formData);
    console.log("Detected User Email:", userEmail);

    // Generate Premium PDF Report
    const generatePDF = () => new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      // --- PDF HEADER ---
      doc.rect(0, 0, 600, 150).fill('#1e0a3c');
      doc.fontSize(30).fillColor('#ffffff').text('NEEDIT STARTUP', 50, 60, { characterSpacing: 2 });
      doc.fontSize(10).fillColor('#ffffff').text('GLOBAL EXPANSION BRIEFING', 50, 100, { characterSpacing: 1 });
      
      doc.moveDown(5);

      // --- CONTENT ---
      doc.fillColor('#1e0a3c').fontSize(18).text('Application Receipt & Initial Briefing', { underline: true });
      doc.moveDown(1.5);
      
      doc.fontSize(10).fillColor('#888888').text(`Reference ID: #APP-${info.lastInsertRowid}`, { align: 'right' });
      doc.text(`Date: ${new Date().toLocaleDateString('en-US', { dateStyle: 'long' })}`, { align: 'right' });
      doc.moveDown(2);

      Object.entries(formData).forEach(([question, answer]) => {
        if (!answer) return;
        doc.fontSize(11).fillColor('#1e0a3c').font('Helvetica-Bold').text(question.trim().toUpperCase());
        doc.moveDown(0.3);
        doc.fontSize(11).fillColor('#444444').font('Helvetica').text(String(answer), { indent: 15 });
        doc.moveDown(1.2);
        
        // Add subtle separator
        const currentY = doc.y;
        doc.moveTo(50, currentY).lineTo(550, currentY).strokeColor('#eeeeee').lineWidth(0.5).stroke();
        doc.moveDown(1);
      });

      // --- FOOTER ---
      doc.fontSize(9).fillColor('#aaaaaa').text('This document serves as an official confirmation of your application to Needit Startup. Our team will review your responses and reach out shortly.', 50, 750, { align: 'center', width: 500 });

      doc.end();
    });

    const pdfBuffer = await generatePDF();

    // 1. Send Briefing to User
    if (userEmail) {
      const userMail = {
        from: `"Needit Startup" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: `Your Global Expansion Briefing - Needit Startup`,
        html: `
          <div style="font-family: 'Helvetica', Arial, sans-serif; max-w: 600px; margin: 0 auto; padding: 40px; border: 1px solid #e0e0e0; border-radius: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1e0a3c; margin: 0; font-size: 28px;">Hello!</h1>
              <p style="color: #666; font-size: 16px;">Thank you for applying to Needit Startup.</p>
            </div>
            <div style="background-color: #f8f9fa; padding: 30px; border-radius: 15px; margin-bottom: 30px;">
              <h2 style="color: #1e0a3c; font-size: 18px; margin-top: 0;">What's Next?</h2>
              <p style="color: #444; line-height: 1.6;">We have received your application. To help you get started, we've generated an <b>Initial Expansion Briefing</b> based on your responses.</p>
              <p style="color: #444; line-height: 1.6;">Please find your formatted report attached to this email.</p>
            </div>
            <p style="color: #888; font-size: 12px; text-align: center;">This is an automated briefing. Our strategists will contact you within 48 hours.</p>
          </div>
        `,
        attachments: [{ filename: 'Needit_Expansion_Briefing.pdf', content: pdfBuffer }]
      };
      await transporter.sendMail(userMail);
    }

    // 2. Send Copy to Founder
    const founderMail = {
      from: `"Needit Startup" <${process.env.EMAIL_USER}>`,
      to: process.env.FOUNDER_EMAIL || process.env.EMAIL_USER,
      subject: `🚀 New Application: ${formData['Name'] || formData[' Founder Name '] || 'New User'}`,
      html: `<p>New application received. See attached briefing.</p>`,
      attachments: [{ filename: 'Report.pdf', content: pdfBuffer }]
    };
    await transporter.sendMail(founderMail);

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
