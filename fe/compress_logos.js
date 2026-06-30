const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = 'c:/laragon/www/TegalsambiGIS/fe/public';

async function compressImage(filename, width, height) {
    const inputPath = path.join(publicDir, filename);
    const tempPath = path.join(publicDir, 'temp_' + filename);
    
    try {
        if (!fs.existsSync(inputPath)) {
            console.log(filename + ' not found, skipping.');
            return;
        }

        const resizeOpts = { withoutEnlargement: true };
        if (width) resizeOpts.width = width;
        if (height) resizeOpts.height = height;

        let pipeline = sharp(inputPath).resize(resizeOpts);
        
        // Save to PNG for logos to preserve transparency, but highly compressed
        await pipeline
            .png({ quality: 80, compressionLevel: 9 })
            .toFile(tempPath);
            
        // Overwrite original
        fs.rmSync(inputPath);
        fs.renameSync(tempPath, inputPath);
        
        const stats = fs.statSync(inputPath);
        console.log(`[Success] ${filename} resized to ${width || 'auto'}x${height || 'auto'}. New size: ${(stats.size / 1024).toFixed(2)} KB`);
    } catch (err) {
        console.error(`[Error] Failed processing ${filename}:`, err.message);
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }
}

async function run() {
    await compressImage('logoWeb.png', 1000, null); // Web logo doesn't need to be huge
    await compressImage('logo192.png', 192, 192); // Specifically supposed to be 192x192
    
    // For favicon.ico, we can convert a png to ico size
    // Sharp doesn't output .ico directly well, but renaming a png to ico often works for web, 
    // or we just save it as small PNG and rename.
    await compressImage('favicon.ico', 64, 64); 
}

run();
