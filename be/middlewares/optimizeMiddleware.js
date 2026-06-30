const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const optimizeImage = async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next();
  }

  try {
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const filePath = file.path;
      const tempPath = path.join(file.destination, 'temp-' + file.filename);

      // Process with sharp
      await sharp(filePath)
        .resize({ width: 1200, withoutEnlargement: true })
        .jpeg({ quality: 80, force: false })
        .png({ quality: 80, compressionLevel: 8, force: false })
        .webp({ quality: 80, force: false })
        .toFile(tempPath);

      // Replace original file
      fs.renameSync(tempPath, filePath);
    }
    next();
  } catch (err) {
    console.error('Error optimizing image:', err);
    next(err); // Pass error to express
  }
};

module.exports = optimizeImage;
