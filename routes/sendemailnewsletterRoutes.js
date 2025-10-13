const express = require('express');
const { sendNewsletter } = require('../controllers/SendEmailNewletterController');

const router = express.Router();

// POST /api/newsletter/send
router.post('/send', sendNewsletter);

module.exports = router;
