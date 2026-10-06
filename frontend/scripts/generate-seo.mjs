import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteUrl = process.env.VITE_SITE_URL;
const templatesDir = join(__dirname, 'templates');
const publicDir = join(__dirname, '..', 'public');

if (!siteUrl) {
  console.error('VITE_SITE_URL is required for SEO generation (sitemap.xml, robots.txt)');
  process.exit(1);
}

mkdirSync(publicDir, { recursive: true });

const files = ['robots.txt', 'sitemap.xml'];

for (const file of files) {
  const templatePath = join(templatesDir, `${file}.tpl`);
  const outputPath = join(publicDir, file);

  if (!existsSync(templatePath)) {
    console.error('Template not found:', templatePath);
    process.exit(1);
  }

  let content = readFileSync(templatePath, 'utf-8');
  content = content.replace(/\{\{SITE_URL\}\}/g, siteUrl);
  writeFileSync(outputPath, content);
  console.log(`Generated ${file} with SITE_URL=${siteUrl}`);
}