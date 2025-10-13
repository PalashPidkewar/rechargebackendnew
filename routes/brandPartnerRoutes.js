const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadLogo, getLogos,deleteLogo } = require('../controllers/brandPartnerController.js')





// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'BrandsPatnerLogo/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// POST: Upload Logo
router.post('/brandLogoupload', upload.single('logo'), uploadLogo);

// GET: Get All Logos
router.get('/', getLogos);
router.delete('/:id', deleteLogo);
module.exports = router;
