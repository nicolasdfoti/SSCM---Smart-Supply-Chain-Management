import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const assetsDir = join(__dirname, '..', 'src', 'assets', 'brand');

const logoPath = join(assetsDir, 'logo.png');

if (!existsSync(logoPath)) {
  console.log('Logo not found, skipping image generation');
  process.exit(0);
}

try {
  const sharp = (await import('sharp')).default;
  const logoBuffer = readFileSync(logoPath);

  const fittedLogo = (width, height) =>
    sharp(logoBuffer).resize(width, height, { fit: 'inside' }).png().toBuffer();

  // Generate og-image.png (1200x630)
  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: '#002840',
    },
  })
    .composite([{ input: logoBuffer, gravity: 'center' }])
    .png()
    .toFile(join(publicDir, 'og-image.png'));

  console.log('Generated og-image.png (1200x630) with logo on #002840 background');

  // Generate favicon.png (32x32)
  await sharp({
    create: {
      width: 32,
      height: 32,
      channels: 4,
      background: '#002840',
    },
  })
    .composite([{ input: await fittedLogo(32, 32), gravity: 'center' }])
    .png()
    .toFile(join(publicDir, 'favicon.png'));

  console.log('Generated favicon.png (32x32) with logo on #002840 background');

  // Generate apple-touch-icon.png (180x180)
  await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: '#002840',
    },
  })
    .composite([{ input: await fittedLogo(180, 180), gravity: 'center' }])
    .png()
    .toFile(join(publicDir, 'apple-touch-icon.png'));

  console.log('Generated apple-touch-icon.png (180x180) with logo on #002840 background');
} catch (error) {
  if (error?.code === 'ERR_MODULE_NOT_FOUND') {
    console.log('Sharp not available, skipping image generation');
    console.log('Install sharp for production: npm install sharp --save-dev');
  } else {
    console.error('Image generation failed:', error.message);
    process.exit(1);
  }
}