// models/Application.js
const db = require('../configg/db');

class Application {
  // Create a new application
  static async create(job_id, name, mobile, email, address, contact_number, skill, resume_path) {
    const [result] = await db.query(
      `INSERT INTO applications 
       (job_id, name, mobile, email, address, contact_number, skill, resume_path) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [job_id, name, mobile, email, address, contact_number, skill, resume_path]
    );
    return result.insertId;
  }

  // Get all applications
  static async getAll() {
    const [rows] = await db.query(
      `SELECT a.*, j.title AS job_title
       FROM applications a
       LEFT JOIN jobs j ON a.job_id = j.id
       ORDER BY a.created_at DESC`
    );
    return rows;
  }


}

module.exports = Application;
