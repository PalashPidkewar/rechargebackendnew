// routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const jobController = require('../controllers/JobControllers');

router.get('/', jobController.getAllJobs);
router.post('/job', jobController.createJob);

module.exports = router;
