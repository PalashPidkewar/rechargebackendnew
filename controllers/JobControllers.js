

// controllers/jobController.js
const Job = require('../model/Job');

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.getAll();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.createJob = async (req, res) => {
  try {
    // 1️⃣ Destructure request body
    const { title, post_date, experience_required, required_skills } = req.body;

    // 2️⃣ Pass values **separately**, object nahi
    const jobId = await Job.create(title, post_date, experience_required, required_skills);

    // 3️⃣ Return response
    res.status(201).json({ message: 'Job created', jobId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

