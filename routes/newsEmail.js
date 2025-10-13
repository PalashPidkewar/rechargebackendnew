const express = require('express');
const router = express.Router();

const { subscribeNewsletter, getAllSubscribedEmails } = require('../controllers/newsletterControllers');
// POST /api/newsletter
router.post('/newsletter', subscribeNewsletter);
router.get('/getnewletteremails',getAllSubscribedEmails)

module.exports = router;