// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const newsRoutes = require('./routes/news');
const newletter = require('./routes/newsEmail')
const chatRoutes = require('./routes/chatroutes')
const jobRoutes = require('./routes/jobroutes');
const applicationRoutes = require('./routes/applicationRoutes');
const sendEmailNewletter= require('./routes/sendemailnewsletterRoutes')
const brandPartnerRoutes = require('./routes/brandPartnerRoutes')
const app = express();




// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// ✅ Serve uploaded resume files
app.use('/Resumes', express.static(path.join(__dirname, 'Resumes')));

app.use('/BrandsPatnerLogo', express.static(path.join(__dirname, 'BrandsPatnerLogo')));
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api', newletter);
app.use('/api/chat', chatRoutes);
app.use('/api', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/newsletter', sendEmailNewletter);
app.use('/api/brandpartners', brandPartnerRoutes);
// Healthcheck
app.get('/', (req, res) => res.send('Newsroom backend running'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
