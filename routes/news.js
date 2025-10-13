// // routes/news.js
// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/middauth');
// const { addNews, getNews } = require('../controllers/newsController');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Ensure uploads directory exists
// const uploadDir = path.join(__dirname, '..', 'uploads');
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// // Multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => {
//     const safeName = file.originalname.replace(/\s+/g, '-');
//     cb(null, Date.now() + '-' + safeName);
//   }
// });

// // Optional: simple fileFilter for images
// const fileFilter = (req, file, cb) => {
//   if (!file.mimetype.startsWith('image/')) {
//     return cb(new Error('Only image files are allowed!'), false);
//   }
//   cb(null, true);
// };

// const upload = multer({ storage, fileFilter });

// router.post('/add', auth, upload.single('image'), addNews); // protected; controller checks admin by email list
// router.get('/', getNews);

// module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const newsController = require('../controllers/newsController');

// Set storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

router.post('/add', upload.single('image'), newsController.addNews);
router.get('/get',newsController.getNews);


router.put('/edit/:id', upload.single('image'), newsController.editNews); // Edit
router.delete('/delete/:id', newsController.deleteNews); // Delete

module.exports = router;
