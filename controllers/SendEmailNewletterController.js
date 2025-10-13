const db = require('../configg/db');   // config ka sahi path
const { sendBulkEmail } = require('../utils/mailer');

const sendNewsletter = async (req, res) => {
  const { subject, message } = req.body;

  if (!subject || !message) {
    return res.status(400).json({ message: 'Subject and message are required' });
  }

  try {
    // Promise style query
    const [results] = await db.query('SELECT email FROM newsletter_emails');
    const emails = results.map(row => row.email);

    if (emails.length === 0) {
      return res.status(404).json({ message: 'No subscribers found' });
    }

    // Send emails
    await sendBulkEmail(emails, subject, message);

    res.status(200).json({
      message: `✅ Newsletter sent successfully to ${emails.length} subscribers!`
    });
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).json({ message: 'Failed to send newsletter', error: err.message });
  }
};

module.exports = { sendNewsletter };
