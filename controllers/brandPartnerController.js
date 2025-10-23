// import { insertLogo, getAllLogos ,deleteLogoById } from '../model/brandPartnerModel.js';

// // Upload logo
// export const uploadLogo = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     const filePath = `BrandsPatnerLogo/${req.file.filename}`;
//     const insertId = await insertLogo(filePath);

//     res.status(201).json({ message: 'Logo uploaded successfully', filePath, id: insertId });
//   } catch (err) {
//     console.error('Error uploading logo:', err);
//     res.status(500).json({ message: 'Database error' });
//   }
// };

// // Get all logos
// export const getLogos = async (req, res) => {
//   try {
//     const logos = await getAllLogos();
//     res.json(logos);
//   } catch (err) {
//     console.error('Error fetching logos:', err);
//     res.status(500).json({ message: 'Database error' });
//   }
// };


// // Delete logo
// export const deleteLogo = async (req, res) => {
//   try {
//     const { id } = req.params;
//     if (!id) return res.status(400).json({ message: 'Logo ID is required' });

//     const deletedPath = await deleteLogoById(id);
//     if (!deletedPath) return res.status(404).json({ message: 'Logo not found' });

//     res.json({ message: 'Logo deleted successfully', path: deletedPath });
//   } catch (err) {
//     console.error('Error deleting logo:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


const { insertLogo, getAllLogos, deleteLogoById } = require('../model/brandPartnerModel.js');

// Upload logo
const uploadLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = `BrandsPatnerLogo/${req.file.filename}`;
    const insertId = await insertLogo(filePath);

    res.status(201).json({ message: 'Logo uploaded successfully', filePath, id: insertId });
  } catch (err) {
    console.error('Error uploading logo:', err);
    res.status(500).json({ message: 'Database error' });
  }
};

// Get all logos
const getLogos = async (req, res) => {
  try {
    const logos = await getAllLogos();
    res.json(logos);
  } catch (err) {
    console.error('Error fetching logos:', err);
    res.status(500).json({ message: 'Database error' });
  }
};

// Delete logo
const deleteLogo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Logo ID is required' });

    const deletedPath = await deleteLogoById(id);
    if (!deletedPath) return res.status(404).json({ message: 'Logo not found' });

    res.json({ message: 'Logo deleted successfully', path: deletedPath });
  } catch (err) {
    console.error('Error deleting logo:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { uploadLogo, getLogos, deleteLogo };

