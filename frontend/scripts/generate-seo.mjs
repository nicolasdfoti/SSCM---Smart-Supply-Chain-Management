import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteUrl = process.env.VITE_SITE_URL || 'http://localhost:5173';
const publicDir = join(__dirname, '..', 'public');

const files = ['robots.txt', 'sitemap.xml'];

for (const file of files) {
  const filePath = join(publicDir, file);
  if (existsSync(filePath)) {
    let content = readFileSync(filePath, 'utf-8');
    content = content.replace(/\{\{SITE_URL\}\}/g, siteUrl);
    writeFileSync(filePath, content);
    console.log(`Generated ${file} with SITE_URL=${siteUrl}`);
  }
}