const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/Admin/Desktop/data/assets';
const files = fs.readdirSync(dir);

async function processImages() {
  for (const file of files) {
    if (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.webp')) {
      const inputPath = path.join(dir, file);
      if (file.includes('_temp')) continue;
      
      const parsed = path.parse(file);
      const outputPath = path.join(dir, parsed.name + '_temp.webp');
      
      try {
        await sharp(inputPath)
          .webp({ quality: 50, effort: 6 })
          .resize({ width: 800, withoutEnlargement: true })
          .toFile(outputPath);
        
        console.log(`Processed: ${file} -> ${parsed.name}.webp`);
        fs.unlinkSync(inputPath); // delete original
        fs.renameSync(outputPath, path.join(dir, parsed.name + '.webp'));
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }
}

processImages();
