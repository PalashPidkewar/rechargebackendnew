// seed/createAdmin.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function createAdmin() {
  try {
    const rawEmails = (process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || '').trim();
    const email = rawEmails.split(',')[0] ? rawEmails.split(',')[0].trim() : null;
    const plain = process.env.ADMIN_PASSWORD || 'Admin@123';

    if (!email) {
      console.log('Please set ADMIN_EMAILS (at least one email) in .env');
      process.exit(1);
    }

    const [rows] = await db.execute('SELECT id FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      console.log('Admin user already exists:', email);
      process.exit(0);
    }

    const hashed = await bcrypt.hash(plain, 10);
    await db.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [
      'Admin', email, hashed
    ]);

    console.log('Admin user created:', { email, password: plain });
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin:', err);
    process.exit(1);
  }
}

createAdmin();
