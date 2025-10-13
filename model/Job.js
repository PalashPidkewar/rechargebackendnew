// models/Job.js
const db = require('../configg/db');

class Job {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM jobs ORDER BY post_date DESC');
    return rows;
  }

  static async create(title, post_date, experience_required, required_skills) {
    const [result] = await db.query(
      'INSERT INTO jobs (title, post_date, experience_required, required_skills) VALUES (?, ?, ?, ?)',
      [title, post_date, experience_required, required_skills]
    );
    return result.insertId;
  }
}

module.exports = Job;
