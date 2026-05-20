import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.resolve('public');

// Images to convert to WebP with target max dimensions and quality
const imageConfigs = [
  // Team photos — large originals, resize to reasonable dimensions
  { file: 'sumit.png', maxWidth: 600, maxHeight: 600, quality: 80 },
  { file: 'co-founder.png', maxWidth: 600, maxHeight: 600, quality: 80 },
  { file: 'pradhuman-marketing-head.jpeg', maxWidth: 600, maxHeight: 600, quality: 80 },
  { file: 'atul-fullstackdeveloper.png', maxWidth: 600, maxHeight: 600, quality: 80 },
  { file: 'abhinav-frontend-devloper.png', maxWidth: 600, maxHeight: 600, quality: 80 },
  { file: 'weborbitsolution-team.png', maxWidth: 1200, maxHeight: 800, quality: 80 },
  { file: 'logo.png', maxWidth: 400, maxHeight: 200, quality: 90 },
  // Case study images
  { file: 'images/ekakshahealingcenter.png', maxWidth: 1000, maxHeight: 750, quality: 80 },
  { file: 'images/qua.png', maxWidth: 1000, maxHeight: 750, quality: 80 },
  { file: 'images/three.png', maxWidth: 1000, maxHeight: 750, quality: 80 },
  { file: 'images/studiocode.png', maxWidth: 1000, maxHeight: 750, quality: 80 },
  { file: 'images/only.png', maxWidth: 1000, maxHeight: 750, quality: 80 },
];

async function optimizeImage(config) {
  const inputPath = path.join(PUBLIC_DIR, config.file);
  
  if (!fs.existsSync(inputPath)) {
    console.log(`⏭️  Skipping ${config.file} (not found)`);
    return;
  }

  const inputStats = fs.statSync(inputPath);
  const inputSizeKB = (inputStats.size / 1024).toFixed(0);

  // Generate WebP version
  const ext = path.extname(config.file);
  const webpPath = path.join(PUBLIC_DIR, config.file.replace(ext, '.webp'));

  await sharp(inputPath)
    .resize(config.maxWidth, config.maxHeight, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: config.quality })
    .toFile(webpPath);

  const outputStats = fs.statSync(webpPath);
  const outputSizeKB = (outputStats.size / 1024).toFixed(0);
  const savings = (((inputStats.size - outputStats.size) / inputStats.size) * 100).toFixed(1);

  console.log(`✅ ${config.file}: ${inputSizeKB}KB → ${outputSizeKB}KB (${savings}% smaller)`);
}

async function main() {
  console.log('\n🖼️  Optimizing images...\n');
  
  let totalBefore = 0;
  let totalAfter = 0;

  for (const config of imageConfigs) {
    const inputPath = path.join(PUBLIC_DIR, config.file);
    if (fs.existsSync(inputPath)) {
      totalBefore += fs.statSync(inputPath).size;
    }
    
    await optimizeImage(config);

    const ext = path.extname(config.file);
    const webpPath = path.join(PUBLIC_DIR, config.file.replace(ext, '.webp'));
    if (fs.existsSync(webpPath)) {
      totalAfter += fs.statSync(webpPath).size;
    }
  }

  console.log(`\n📊 Total: ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(1)}MB`);
  console.log(`💾 Saved: ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(1)}MB (${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%)\n`);
}

main().catch(console.error);
