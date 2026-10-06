import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const assetsDir = join(__dirname, '..', 'src', 'assets', 'brand');

const logoPath = join(assetsDir, 'logo.png');
const outputPath = join(publicDir, 'og-image.png');

if (!existsSync(logoPath)) {
  console.log('Logo not found, skipping OG image generation');
  process.exit(0);
}

try {
  const sharp = (await import('sharp')).default;
  const logoBuffer = readFileSync(logoPath);

  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: '#002840',
    },
  })
    .composite([
      {
        input: logoBuffer,
        gravity: 'center',
      },
    ])
    .png()
    .toFile(outputPath);

  console.log('Generated og-image.png (1200x630) with logo on #002840 background');
} catch {
  console.log('Sharp not available, skipping OG image generation');
  console.log('Install sharp for production: npm install sharp --save-dev');
}