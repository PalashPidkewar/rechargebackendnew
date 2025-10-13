const db = require('../configg/db');

async function createUser({ name, email, phone }) {
  const [result] = await db.execute(
    'INSERT INTO chatbot (name, email, phone) VALUES (?, ?, ?)',
    [name, email, phone]
  );
  return result.insertId;
}

async function updateUser(userId, fields) {
  const sets = [];
  const values = [];
  for (const key in fields) {
    sets.push(`${key} = ?`);
    values.push(fields[key]);
  }
  if (sets.length === 0) return;
  values.push(userId);
  const sql = `UPDATE chatbot SET ${sets.join(', ')} WHERE id = ?`;
  await db.execute(sql, values);
}

async function getUserById(userId) {
  const [rows] = await db.execute('SELECT * FROM chatbot WHERE id = ?', [userId]);
  return rows[0];
}

module.exports = {
  createUser,
  updateUser,
  getUserById,
};
