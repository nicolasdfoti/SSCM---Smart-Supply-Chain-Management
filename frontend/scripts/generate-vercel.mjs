import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const templatePath = join(__dirname, 'templates', 'vercel.json.tpl');
const outputPath = join(__dirname, '..', 'vercel.json');

if (!existsSync(templatePath)) {
  console.error('Template not found:', templatePath);
  process.exit(1);
}

const backendOrigin = process.env.VITE_API_URL;
if (!backendOrigin) {
  console.error('VITE_API_URL is required for vercel.json generation (needed for CSP connect-src)');
  process.exit(1);
}

let content = readFileSync(templatePath, 'utf-8');
content = content.replace(/\{\{BACKEND_ORIGIN\}\}/g, backendOrigin);
writeFileSync(outputPath, content);
console.log(`Generated vercel.json with BACKEND_ORIGIN=${backendOrigin}`);