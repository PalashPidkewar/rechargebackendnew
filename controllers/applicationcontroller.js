// controllers/applicationController.js
const Application = require('../model/Application');

exports.applyForJob = async (req, res) => {
  try {
    const { job_id, name, mobile, email, address, contact_number, skill } = req.body;
    const resume_path = req.file ? req.file.path : null;

    const applicationId = await Application.create(
      job_id, name, mobile, email, address, contact_number, skill, resume_path
    );

    res.status(201).json({ message: 'Application submitted', applicationId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.getAll();
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};