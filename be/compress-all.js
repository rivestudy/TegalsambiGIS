const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const uploadsDir = path.join(__dirname, 'uploads');

async function compressAll() {
  try {
    const files = fs.readdirSync(uploadsDir);
    let count = 0;

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        const filePath = path.join(uploadsDir, file);
        const tempPath = path.join(uploadsDir, 'temp-' + file);

        try {
          await sharp(filePath)
            .resize({ width: 1200, withoutEnlargement: true })
            .jpeg({ quality: 80, force: false })
            .png({ quality: 80, compressionLevel: 8, force: false })
            .webp({ quality: 80, force: false })
            .toFile(tempPath);

          // Replace old file with compressed one
          fs.renameSync(tempPath, filePath);
          console.log(`Compressed: ${file}`);
          count++;
        } catch (err) {
          console.error(`Failed to compress ${file}:`, err.message);
          // clean up temp file if exists
          if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        }
      }
    }
    console.log(`Successfully compressed ${count} images!`);
  } catch (error) {
    console.error('Error reading uploads directory:', error);
  }
}

compressAll();
