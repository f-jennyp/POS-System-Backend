const express = require("express");
const router = express.Router();
const fs = require('fs');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/images/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });
    
router.post('/update-image/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const image = await db.images.findOne({ where: { id } });
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const buffer = await fs.promises.readFile(req.file.path);
    const base64Image = buffer.toString('base64');

    await image.update({
      fileName: req.file.originalname,
      filePath: req.file.path,
      data: buffer,
      contentType: req.file.mimetype,
      base64: base64Image,
    });

    res.status(200).json({ message: 'Image updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = { upload }