const express = require('express');
const cors = require('cors');
const db = require('./db');
const nodemailer = require('nodemailer');
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
      from: process.env.EMAIL_USER,
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
app.post('/api/google-form', (req, res) => {
  const formData = req.body;

  try {
    const insert = db.prepare('INSERT INTO applications (data) VALUES (?)');
    const info = insert.run(JSON.stringify(formData));
    
    // Send Email to Founder
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.FOUNDER_EMAIL || process.env.EMAIL_USER,
      subject: `🚀 New Google Form Application Received!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #1e0a3c;">New Application Received!</h2>
          <p>Someone just submitted the Google Application Form.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Form Data:</strong></p>
          <pre style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${JSON.stringify(formData, null, 2)}</pre>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #888;">Automated notification from your NeeditStartup backend.</p>
        </div>
      `
    };

    transporter.sendMail(mailOptions).catch(err => console.error('Email sending failed (Check .env credentials):', err.message));

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to save application.' });
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
