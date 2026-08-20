const sharp = require('sharp');
const fs = require('fs');

async function convert() {
  try {
    await sharp('./assets/dashboard_finance_1787147845528.jpg')
      .resize(800)
      .webp({ quality: 50 })
      .toFile('./assets/dashboard_finance_1787147845528.webp');
    console.log('Conversion successful');
  } catch (err) {
    console.error('Error during conversion:', err);
  }
}
convert();
