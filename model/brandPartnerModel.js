import db from '../configg/db.js';
import fs from 'fs';
import path from 'path';
// Insert logo
export const insertLogo = async (filePath) => {
  const [result] = await db.execute(
    'INSERT INTO brand_partners (logo_path) VALUES (?)',
    [filePath]
  );
  return result.insertId;
};

// Get all logos
export const getAllLogos = async () => {
  const [rows] = await db.execute('SELECT * FROM brand_partners ORDER BY created_at DESC');
  return rows;
};



// Delete logo by ID
export const deleteLogoById = async (id) => {
  // 1️⃣ Get logo path from DB
  const [rows] = await db.execute('SELECT logo_path FROM brand_partners WHERE id = ?', [id]);
  if (rows.length === 0) return null;

  const logoPath = rows[0].logo_path;

  // 2️⃣ Delete record from DB
  await db.execute('DELETE FROM brand_partners WHERE id = ?', [id]);

  // 3️⃣ Delete file from server
  const fileFullPath = path.join(process.cwd(), logoPath);
  if (fs.existsSync(fileFullPath)) {
    fs.unlinkSync(fileFullPath);
  }

  return logoPath;
};