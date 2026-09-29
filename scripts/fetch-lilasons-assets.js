const https = require("https");
const fs = require("fs");
const path = require("path");

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: { "User-Agent": "Mozilla/5.0" },
          rejectUnauthorized: false,
        },
        (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            get(res.headers.location).then(resolve, reject);
            return;
          }
          const chunks = [];
          res.on("data", (c) => chunks.push(c));
          res.on("end", () => resolve({ status: res.statusCode, buf: Buffer.concat(chunks), type: res.headers["content-type"] }));
        },
      )
      .on("error", reject);
  });
}

(async () => {
  const pages = [
    "https://lilasonsdevelopers.in/",
    "https://lilasonsdevelopers.in/our-company",
    "https://lilasonsdevelopers.in/contact-us",
  ];
  const found = new Set();
  for (const page of pages) {
    const { buf } = await get(page);
    const html = buf.toString("utf8");
    const matches = [
      ...html.matchAll(/https:\/\/img1\.wsimg\.com\/[^"'\\\s)]+/g),
      ...html.matchAll(/\/\/img1\.wsimg\.com\/[^"'\\\s)]+/g),
    ];
    for (const m of matches) {
      let u = m[0];
      if (u.startsWith("//")) u = "https:" + u;
      u = u.replace(/[),]+$/, "");
      if (/\.(png|jpe?g|webp|svg)/i.test(u) || /isteam\/ip\//i.test(u)) found.add(u);
    }
  }
  console.log([...found].join("\n"));
  const logo = [...found].find((u) => /logo|brand|header/i.test(u)) || [...found][0];
  if (!logo) {
    console.log("NO_IMAGE");
    return;
  }
  console.log("DOWNLOADING", logo);
  const { buf, type } = await get(logo);
  let ext = ".png";
  if (/jpeg|jpg/i.test(type || "") || /\.jpe?g/i.test(logo)) ext = ".jpg";
  if (/svg/i.test(type || "") || /\.svg/i.test(logo)) ext = ".svg";
  if (/webp/i.test(type || "")) ext = ".webp";
  const out = path.join("c:/Projects/Real-Estate/public", "lilasons-logo" + ext);
  fs.writeFileSync(out, buf);
  console.log("SAVED", out, buf.length, type);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
