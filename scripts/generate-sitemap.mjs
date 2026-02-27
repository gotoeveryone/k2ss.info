import { promises as fs } from 'node:fs';
import path from 'node:path';

const BUILD_DIR = path.resolve('build');
const OUTPUT_PATH = path.join(BUILD_DIR, 'sitemap.xml');
const DOMAIN = 'https://k2ss.info';

const walkHtmlFiles = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walkHtmlFiles(fullPath);
      }
      return entry.name.endsWith('.html') ? [fullPath] : [];
    }),
  );

  return files.flat();
};

const toRoutePath = (absoluteHtmlPath) => {
  const relative = path.relative(BUILD_DIR, absoluteHtmlPath).split(path.sep).join('/');

  if (relative === 'index.html') {
    return '/';
  }

  if (relative.endsWith('/index.html')) {
    return `/${relative.slice(0, -'index.html'.length)}`;
  }

  return `/${relative.replace(/\.html$/, '')}/`;
};

const shouldInclude = (routePath) => !routePath.startsWith('/404');

const escapeXml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

const run = async () => {
  const htmlFiles = await walkHtmlFiles(BUILD_DIR);
  const routes = [...new Set(htmlFiles.map(toRoutePath).filter(shouldInclude))].sort();

  const urls = routes
    .map((route) => `  <url><loc>${escapeXml(new URL(route, DOMAIN).toString())}</loc></url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  await fs.writeFile(OUTPUT_PATH, xml, 'utf8');
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
