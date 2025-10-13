const db = require('../configg/db'); // aapka updated db

// ✅ Subscribe Newsletter
const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const [result] = await db.query(
      'INSERT INTO newsletter_emails (email) VALUES (?)',
      [email]
    );

    return res.status(201).json({
      message: 'Email subscribed successfully',
      id: result.insertId
    });
  } catch (err) {
    console.error('DB ERROR:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get all subscribed emails
const getAllSubscribedEmails = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM newsletter_emails ORDER BY id DESC');

    return res.status(200).json({
      message: 'All subscribed emails fetched successfully',
      data: rows,
    });
  } catch (err) {
    console.error('DB ERROR:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// ✅ 👇 Dono ko ek sath export karo
module.exports = { subscribeNewsletter, getAllSubscribedEmails };
