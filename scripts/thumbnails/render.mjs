// Renders every thumbnail in thumbs.html with headless Chrome/Edge, then encodes WebP with ffmpeg.
// Usage: node scripts/thumbnails/render.mjs [id ...]
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../..');
const outDir = join(root, 'public', 'thumbnails', 'cards');
const tmp = join(here, '.out');
mkdirSync(outDir, { recursive: true }); mkdirSync(tmp, { recursive: true });

const WIDE = ['autoleads', 'tut', 'ibni', 'virlo', 'be3ly'];
const ALL = [...WIDE, 'autoclipper', 'claudehq', 'grokhq', 'apexone'];
const ids = process.argv.slice(2).length ? process.argv.slice(2) : ALL;

const browsers = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome', '/usr/bin/chromium',
];
const browser = browsers.find(existsSync);
if (!browser) throw new Error('No Chrome/Edge found');

for (const id of ids) {
  const [w, h] = WIDE.includes(id) ? [1600, 900] : [1200, 600];
  const png = join(tmp, `${id}.png`);
  const url = `${pathToFileURL(join(here, 'thumbs.html')).href}?id=${id}`;
  execFileSync(browser, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
    `--window-size=${w},${h}`, '--virtual-time-budget=15000', `--screenshot=${png}`, url], { stdio: 'ignore' });
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', png, '-c:v', 'libwebp', '-quality', '86', join(outDir, `${id}.webp`)]);
  console.log('rendered', id);
}
rmSync(tmp, { recursive: true, force: true });
