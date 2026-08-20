const sharp = require('sharp');
sharp('assets/about.jpg')
  .resize(800)
  .webp({quality: 60})
  .toFile('assets/global_reach.webp')
  .then(i => console.log('Successfully generated global_reach.webp:', i))
  .catch(e => console.error('Error generating image:', e));

