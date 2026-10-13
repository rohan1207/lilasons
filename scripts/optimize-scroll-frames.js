/**
 * Convert scroll_images3 PNG frames → WebP (high quality, much smaller).
 * Usage: node scripts/optimize-scroll-frames.js
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const DIR = path.join(__dirname, "..", "public", "scroll_images3");
const QUALITY = 82; // visually near-lossless for 1280x720 scroll frames
const CONCURRENCY = 8;

async function convertOne(file) {
  const src = path.join(DIR, file);
  const dest = path.join(DIR, file.replace(/\.png$/i, ".webp"));
  await sharp(src)
    .webp({ quality: QUALITY, effort: 4 })
    .toFile(dest);
  const before = fs.statSync(src).size;
  const after = fs.statSync(dest).size;
  fs.unlinkSync(src);
  return { before, after };
}

async function main() {
  const files = fs
    .readdirSync(DIR)
    .filter((f) => f.toLowerCase().endsWith(".png"))
    .sort();

  if (!files.length) {
    console.log("No PNG frames found in", DIR);
    return;
  }

  console.log(`Converting ${files.length} frames → WebP q=${QUALITY}…`);
  let beforeTotal = 0;
  let afterTotal = 0;
  let done = 0;

  for (let i = 0; i < files.length; i += CONCURRENCY) {
    const batch = files.slice(i, i + CONCURRENCY);
    const results = await Promise.all(batch.map(convertOne));
    for (const r of results) {
      beforeTotal += r.before;
      afterTotal += r.after;
      done += 1;
    }
    process.stdout.write(
      `\r${done}/${files.length}  ${(afterTotal / 1e6).toFixed(1)} MB`,
    );
  }

  console.log("\nDone.");
  console.log(
    `Before: ${(beforeTotal / 1e6).toFixed(1)} MB → After: ${(afterTotal / 1e6).toFixed(1)} MB (${Math.round((1 - afterTotal / beforeTotal) * 100)}% smaller)`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
