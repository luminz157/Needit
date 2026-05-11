const db = require('./db');
const bcrypt = require('bcryptjs');

async function createAdmin() {
  const username = 'admin';
  const password = process.env.ADMIN_PASSWORD || 'needit2026';
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const insert = db.prepare('INSERT INTO admins (username, password) VALUES (?, ?)');
    insert.run(username, hashedPassword);
    console.log('--- ADMIN CREATED ---');
    console.log('Username: admin');
    console.log('Password:', password);
    console.log('---------------------');
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      console.log('Admin already exists.');
    } else {
      console.error('Error creating admin:', error);
    }
  }
}

createAdmin();
