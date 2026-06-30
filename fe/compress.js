const sharp = require('sharp');
const fs = require('fs');

const inputPath = 'c:/laragon/www/TegalsambiGIS/fe/public/pantaitegalsambi2.webp';
const tempPath = 'c:/laragon/www/TegalsambiGIS/fe/public/pantaitegalsambi2_temp.webp';

sharp(inputPath)
  .resize(1920, null, { withoutEnlargement: true }) // Max width 1920px
  .webp({ quality: 75 })
  .toFile(tempPath)
  .then(() => {
    fs.renameSync(tempPath, inputPath);
    console.log('Image compressed successfully!');
    const stats = fs.statSync(inputPath);
    console.log('New size: ' + (stats.size / 1024).toFixed(2) + ' KB');
  })
  .catch(err => {
    console.error('Error compressing image:', err);
  });
