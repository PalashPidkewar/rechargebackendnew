// controllers/newsController.js
const db = require('../configg/db');
require('dotenv').config();

exports.addNews = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageFile = req.file ? req.file.filename : null;
    
    if (!title) return res.status(400).json({ message: 'Title is required' });

    await db.execute(
      'INSERT INTO news (title, description, image) VALUES (?, ?, ?)',
      [title, description || null, imageFile]
    );

    return res.json({ message: 'News added successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};


exports.getNews = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM news ORDER BY created_at DESC');

    const baseUrl = req.protocol + '://' + req.get('host');
    const mapped = rows.map(r => ({
      id: r.id,
      title: r.title,
      description: r.description,
      image: r.image ? `${baseUrl}/uploads/${r.image}` : null,
      created_at: r.created_at
    }));

    return res.json(mapped);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};





// Edit / Update news
exports.editNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const imageFile = req.file ? req.file.filename : null;

    // Check if news exists
    const [existing] = await db.execute('SELECT * FROM news WHERE id = ?', [id]);
    if (existing.length === 0) return res.status(404).json({ message: 'News not found' });

    // Update query
    await db.execute(
      'UPDATE news SET title = ?, description = ?, image = COALESCE(?, image) WHERE id = ?',
      [title || existing[0].title, description || existing[0].description, imageFile, id]
    );

    return res.json({ message: 'News updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete news
exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if news exists
    const [existing] = await db.execute('SELECT * FROM news WHERE id = ?', [id]);
    if (existing.length === 0) return res.status(404).json({ message: 'News not found' });

    // Delete query
    await db.execute('DELETE FROM news WHERE id = ?', [id]);

    return res.json({ message: 'News deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};