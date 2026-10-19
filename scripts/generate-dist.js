import fs from 'node:fs';
import path from 'node:path';

async function main() {
  const res = await fetch('http://localhost:8080/');
  let html = await res.text();

  // Find css and js in dist/assets
  const distAssets = fs.readdirSync('dist/assets');
  const cssFile = distAssets.find(f => f.startsWith('styles-') && f.endsWith('.css'));
  const jsFile = distAssets.find(f => f.startsWith('index-') && f.endsWith('.js'));

  console.log('Using CSS:', cssFile, 'JS:', jsFile);

  // Replace development CSS with production hashed CSS
  html = html.replace(
    /<link rel="stylesheet" href="\/src\/styles\.css"[^>]*>/,
    `<link rel="stylesheet" href="/assets/${cssFile}">`
  );

  // Remove dev-only styles and entries
  html = html.replace(/<link rel="stylesheet" href="\/@tanstack-start\/styles\.css[^"]*"[^>]*\/>/g, '');
  html = html.replace(/<link rel="modulepreload" href="\/@id\/virtual:tanstack-start-dev-client-entry"\/>/g, '');

  // Replace development entry script with production hashed JS
  html = html.replace(
    /<script type="module" async="" src="\/@id\/virtual:tanstack-start-dev-client-entry"><\/script>/,
    `<script type="module" src="/assets/${jsFile}"></script>`
  );

  // Build dynamic mapping from unhashed names to hashed names in dist/assets
  const webpFiles = distAssets.filter(f => f.endsWith('.webp') && f.includes('-'));
  webpFiles.forEach(hashedFile => {
    // e.g. "hero-mobile-oK_ahEf5.webp" -> prefix "hero-mobile"
    const prefix = hashedFile.slice(0, hashedFile.lastIndexOf('-'));
    const unhashedName = prefix + '.webp';
    const originalPath = `/src/assets/${unhashedName}`;
    const targetPath = `/assets/${hashedFile}`;
    html = html.split(originalPath).join(targetPath);
  });

  // Also replace any remaining /src/assets/ with /assets/
  html = html.split('/src/assets/').join('/assets/');

  // Copy all webp files to dist/assets both hashed and unhashed
  const srcAssets = fs.readdirSync('src/assets');
  srcAssets.forEach(file => {
    if (file.endsWith('.webp')) {
      fs.copyFileSync(path.join('src/assets', file), path.join('dist/assets', file));
    }
  });

  // Also create dist/src/assets as safety fallback for any dynamic client requests
  fs.mkdirSync('dist/src/assets', { recursive: true });
  srcAssets.forEach(file => {
    if (file.endsWith('.webp')) {
      fs.copyFileSync(path.join('src/assets', file), path.join('dist/src/assets', file));
    }
  });

  // Clean dev source markers
  html = html.replace(/data-tsd-source="[^"]*"/g, '');

  // Write dist/index.html
  fs.writeFileSync('dist/index.html', html, 'utf8');
  console.log('Successfully wrote dist/index.html (' + html.length + ' bytes)');

  // SPA fallback rule in _redirects
  fs.writeFileSync('dist/_redirects', '/*    /index.html   200\n', 'utf8');
  console.log('Verified dist/_redirects');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
