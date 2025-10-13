// routes/applicationRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const applicationController = require('../controllers/applicationcontroller');

// 📂 Multer Setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Resumes/');
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('resume'), applicationController.applyForJob);
router.get('/applications', applicationController.getApplications);
module.exports = router;
