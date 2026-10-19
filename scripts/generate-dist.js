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

  // Map /src/assets/<name> to /assets/<hashed-name>
  distAssets.forEach(file => {
    if (file.endsWith('.webp')) {
      const baseName = file.replace(/-[A-Za-z0-9_-]+\.webp$/, '.webp');
      const regex = new RegExp(`/src/assets/${baseName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
      html = html.replace(regex, `/assets/${file}`);
    }
  });

  // Also copy unhashed assets to dist/assets as safety fallback
  const srcAssets = fs.readdirSync('src/assets');
  srcAssets.forEach(file => {
    if (file.endsWith('.webp')) {
      fs.copyFileSync(path.join('src/assets', file), path.join('dist/assets', file));
    }
  });

  // Clean dev source markers
  html = html.replace(/data-tsd-source="[^"]*"/g, '');

  // Write dist/index.html
  fs.writeFileSync('dist/index.html', html, 'utf8');
  console.log('Successfully generated dist/index.html (' + html.length + ' bytes)');

  // SPA fallback rule in _redirects
  fs.writeFileSync('dist/_redirects', '/*    /index.html   200\n', 'utf8');
  console.log('Verified dist/_redirects');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
