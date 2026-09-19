import fs from "fs";
import path from "path";

const uploadedImg =
  "C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\5a7ab2f5-13ed-4bdd-86ed-d8eb2c8836a4\\.user_uploaded\\media_1789749951779.jpg";
const assetsDir = path.resolve("src", "assets");
const publicDir = path.resolve("public");

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const targets = [
  path.join(assetsDir, "shahi-villa-real.jpg"),
  path.join(assetsDir, "palace-hero.jpg"),
  path.join(assetsDir, "palace-entrance.jpg"),
  path.join(assetsDir, "palace-hall.jpg"),
  path.join(assetsDir, "palace-original.jpg"),
  path.join(assetsDir, "palace-wedding-hero.jpg"),
  path.join(publicDir, "shahi-villa-real.jpg"),
  path.join(publicDir, "palace-hero.jpg"),
];

for (const dest of targets) {
  if (fs.existsSync(uploadedImg)) {
    fs.copyFileSync(uploadedImg, dest);
    console.log(`Copied real Shahi Villa image: ${path.basename(dest)} (${fs.statSync(dest).size} bytes)`);
  }
}

