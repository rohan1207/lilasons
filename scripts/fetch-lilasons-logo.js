const fs = require("fs");
const https = require("https");
const http = require("http");
const path = require("path");

function get(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    lib
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" }, rejectUnauthorized: false }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          get(res.headers.location).then(resolve, reject);
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      })
      .on("error", reject);
  });
}

(async () => {
  const html = (await get("https://lilasonsdevelopers.in/")).toString("utf8");
  const urls = [...html.matchAll(/https:\/\/img[^"'\\\s>]+/g)].map((m) => m[0]);
  const unique = [...new Set(urls)];
  console.log(unique.slice(0, 50).join("\n"));
  const logo =
    unique.find((u) => /logo/i.test(u)) ||
    unique.find((u) => /\.png/i.test(u) && /isteam/i.test(u));
  console.log("LOGO_CANDIDATE", logo || "none");
  if (logo) {
    const clean = logo.split("?")[0];
    const buf = await get(logo);
    const ext = path.extname(clean) || ".png";
    const out = path.join("c:/Projects/Real-Estate/public", "lilasons-logo" + ext);
    fs.writeFileSync(out, buf);
    console.log("SAVED", out, buf.length);
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
