import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import child_process from "node:child_process";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// CRC32 table for valid PNG generation
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf: Buffer) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function generateTransparentPng(inputPath: string, outPath1: string, outPath2: string) {
  try {
    const buf = fs.readFileSync(inputPath);
    if (buf.readUInt32BE(0) !== 0x89504E47 || buf.readUInt32BE(4) !== 0x0D0A1A0A) {
      return false;
    }
    let pos = 8;
    let width = 0;
    let height = 0;
    let bitDepth = 0;
    let colorType = 0;
    const idatChunks: Buffer[] = [];
    while (pos < buf.length) {
      const length = buf.readUInt32BE(pos);
      const type = buf.toString("ascii", pos + 4, pos + 8);
      const data = buf.subarray(pos + 8, pos + 8 + length);
      pos += 12 + length;

      if (type === "IHDR") {
        width = data.readUInt32BE(0);
        height = data.readUInt32BE(4);
        console.log("[palace-plugin] LOGO DIMENSIONS:", width, "x", height, "aspect:", width / height);
        bitDepth = data.readUInt8(8);
        colorType = data.readUInt8(9);
      } else if (type === "IDAT") {
        idatChunks.push(data);
      }
    }
    if (bitDepth !== 8 || (colorType !== 2 && colorType !== 6)) {
      return false;
    }
    const decompressed = zlib.inflateSync(Buffer.concat(idatChunks));
    const bytesPerPixel = colorType === 6 ? 4 : 3;
    const scanlineLength = 1 + width * bytesPerPixel;
    const outScanlineLength = 1 + width * 4;
    const outDecompressed = Buffer.alloc(height * outScanlineLength);
    const prevRow = Buffer.alloc(width * bytesPerPixel);
    const currRow = Buffer.alloc(width * bytesPerPixel);

    for (let y = 0; y < height; y++) {
      const inStart = y * scanlineLength;
      const filter = decompressed[inStart];
      for (let i = 0; i < width * bytesPerPixel; i++) {
        const rawByte = decompressed[inStart + 1 + i];
        const a = i >= bytesPerPixel ? currRow[i - bytesPerPixel] : 0;
        const b = prevRow[i];
        const c = i >= bytesPerPixel ? prevRow[i - bytesPerPixel] : 0;
        let val = rawByte;
        if (filter === 1) val = (rawByte + a) & 0xff;
        else if (filter === 2) val = (rawByte + b) & 0xff;
        else if (filter === 3) val = (rawByte + Math.floor((a + b) / 2)) & 0xff;
        else if (filter === 4) {
          const p = a + b - c;
          const pa = Math.abs(p - a);
          const pb = Math.abs(p - b);
          const pc = Math.abs(p - c);
          let pr = a;
          if (pb < pa && pb <= pc) pr = b;
          else if (pc < pa && pc < pb) pr = c;
          val = (rawByte + pr) & 0xff;
        }
        currRow[i] = val;
      }
      prevRow.set(currRow);

      const outStart = y * outScanlineLength;
      outDecompressed[outStart] = 0;
      const marginX = Math.round(width * 0.05);
      const marginY = Math.round(height * 0.05);
      for (let x = 0; x < width; x++) {
        const inPx = x * bytesPerPixel;
        const r = currRow[inPx];
        const g = currRow[inPx + 1];
        const b = currRow[inPx + 2];
        const inA = colorType === 6 ? currRow[inPx + 3] : 255;
        const maxVal = Math.max(r, g, b);
        const minVal = Math.min(r, g, b);
        const saturation = maxVal - minVal;

        if (x < marginX || x > width - marginX || y < marginY || y > height - marginY) {
          outDecompressed[outStart + 1 + x * 4] = 0;
          outDecompressed[outStart + 1 + x * 4 + 1] = 0;
          outDecompressed[outStart + 1 + x * 4 + 2] = 0;
          outDecompressed[outStart + 1 + x * 4 + 3] = 0;
          continue;
        }

        let outA = inA;
        if (maxVal <= 56) {
          outA = 0;
        } else if (saturation < 14 && maxVal < 90) {
          outA = 0;
        } else if (maxVal < 105) {
          const t = (maxVal - 56) / 49;
          outA = Math.round(Math.pow(t, 1.6) * inA);
        }

        const distFromLeft = x - marginX;
        const distFromRight = width - marginX - x;
        const distFromTop = y - marginY;
        const distFromBottom = height - marginY - y;
        const edgeDist = Math.min(distFromLeft, distFromRight, distFromTop, distFromBottom);
        if (edgeDist < 20) {
          outA = Math.round(outA * (edgeDist / 20));
        }

        const outPx = outStart + 1 + x * 4;
        outDecompressed[outPx] = r;
        outDecompressed[outPx + 1] = g;
        outDecompressed[outPx + 2] = b;
        outDecompressed[outPx + 3] = outA;
      }
    }

    function makeChunk(typeStr: string, dataBuf: Buffer) {
      const chunkBuf = Buffer.alloc(12 + dataBuf.length);
      chunkBuf.writeUInt32BE(dataBuf.length, 0);
      chunkBuf.write(typeStr, 4, 4, "ascii");
      dataBuf.copy(chunkBuf, 8);
      const crc = crc32(chunkBuf.subarray(4, 8 + dataBuf.length));
      chunkBuf.writeUInt32BE(crc, 8 + dataBuf.length);
      return chunkBuf;
    }

    const newIdatData = zlib.deflateSync(outDecompressed);
    const ihdrData = Buffer.alloc(13);
    ihdrData.writeUInt32BE(width, 0);
    ihdrData.writeUInt32BE(height, 4);
    ihdrData.writeUInt8(8, 8);
    ihdrData.writeUInt8(6, 9);
    ihdrData.writeUInt8(0, 10);
    ihdrData.writeUInt8(0, 11);
    ihdrData.writeUInt8(0, 12);

    const pngHeader = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    const finalPng = Buffer.concat([
      pngHeader,
      makeChunk("IHDR", ihdrData),
      makeChunk("IDAT", newIdatData),
      makeChunk("IEND", Buffer.alloc(0)),
    ]);
    fs.writeFileSync(outPath1, finalPng);
    fs.writeFileSync(outPath2, finalPng);
    console.log("[palace-plugin] Successfully generated transparent PNG! Bytes:", finalPng.length);

    // Identify distinct vertical sections in the logo
    const rowCounts: number[] = [];
    for (let y = 0; y < height; y++) {
      let count = 0;
      const start = y * outScanlineLength;
      for (let x = 0; x < width; x++) {
        if (outDecompressed[start + 1 + x * 4 + 3] > 20) count++;
      }
      rowCounts.push(count);
    }

    const intervals: Array<{ start: number; end: number; maxCount: number }> = [];
    let inSection = false;
    let segStart = 0;
    let maxC = 0;
    for (let y = 0; y < height; y++) {
      if (rowCounts[y] > 10) {
        if (!inSection) {
          inSection = true;
          segStart = y;
          maxC = rowCounts[y];
        } else {
          maxC = Math.max(maxC, rowCounts[y]);
        }
      } else {
        if (inSection) {
          inSection = false;
          intervals.push({ start: segStart, end: y - 1, maxCount: maxC });
        }
      }
    }
    if (inSection) intervals.push({ start: segStart, end: height - 1, maxCount: maxC });

    console.log("[palace-plugin] LOGO SECTIONS FOUND:", JSON.stringify(intervals));

    function slicePng(y1: number, y2: number) {
      // Find minX, maxX in this y range
      let minX = width;
      let maxX = 0;
      for (let y = y1; y <= y2; y++) {
        const start = y * outScanlineLength;
        for (let x = 0; x < width; x++) {
          if (outDecompressed[start + 1 + x * 4 + 3] > 20) {
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
          }
        }
      }
      // Add small 8px padding
      minX = Math.max(0, minX - 8);
      maxX = Math.min(width - 1, maxX + 8);
      y1 = Math.max(0, y1 - 4);
      y2 = Math.min(height - 1, y2 + 4);

      const cropW = maxX - minX + 1;
      const cropH = y2 - y1 + 1;
      const cropScanline = 1 + cropW * 4;
      const cropDecompressed = Buffer.alloc(cropH * cropScanline);

      for (let y = 0; y < cropH; y++) {
        const srcY = y1 + y;
        const inStart = srcY * outScanlineLength + 1 + minX * 4;
        const outStart = y * cropScanline;
        cropDecompressed[outStart] = 0;
        outDecompressed.copy(cropDecompressed, outStart + 1, inStart, inStart + cropW * 4);
      }

      const cropIdat = zlib.deflateSync(cropDecompressed);
      const cropIhdr = Buffer.alloc(13);
      cropIhdr.writeUInt32BE(cropW, 0);
      cropIhdr.writeUInt32BE(cropH, 4);
      cropIhdr.writeUInt8(8, 8);
      cropIhdr.writeUInt8(6, 9);
      cropIhdr.writeUInt8(0, 10);
      cropIhdr.writeUInt8(0, 11);
      cropIhdr.writeUInt8(0, 12);

      return Buffer.concat([
        pngHeader,
        makeChunk("IHDR", cropIhdr),
        makeChunk("IDAT", cropIdat),
        makeChunk("IEND", Buffer.alloc(0)),
      ]);
    }

    if (intervals.length >= 3) {
      // 0: SJ Monogram, 1: SHAH JUNCTION, 2: VILLA
      const sjPng = slicePng(intervals[0].start, intervals[0].end);
      const shahJunctionPng = slicePng(intervals[1].start, intervals[1].end);
      const villaPng = slicePng(intervals[2].start, intervals[2].end);

      const assetsDir = path.dirname(outPath1);
      const publicDir = path.dirname(outPath2);

      fs.writeFileSync(path.join(assetsDir, "logo-sj-monogram.png"), sjPng);
      fs.writeFileSync(path.join(publicDir, "logo-sj-monogram.png"), sjPng);

      fs.writeFileSync(path.join(assetsDir, "logo-shah-junction-text.png"), shahJunctionPng);
      fs.writeFileSync(path.join(publicDir, "logo-shah-junction-text.png"), shahJunctionPng);

      fs.writeFileSync(path.join(assetsDir, "logo-villa-text.png"), villaPng);
      fs.writeFileSync(path.join(publicDir, "logo-villa-text.png"), villaPng);

      console.log("[palace-plugin] Successfully exported sliced logo assets: logo-sj-monogram.png, logo-shah-junction-text.png, logo-villa-text.png!");
    }

    return true;
  } catch (err) {
    console.error("[palace-plugin] Failed to generate transparent PNG in node:", err);
    return false;
  }
}

function copyPalaceAssetsPlugin() {
  const assetsDir = path.resolve("src/assets");
  const publicDir = path.resolve("public");

  const syncFiles = () => {
    try {
      const brainDir = "C:/Users/hp/.gemini/antigravity-ide/brain/5a7ab2f5-13ed-4bdd-86ed-d8eb2c8836a4/.user_uploaded";

      // Hero Twilight image
      const twilightCandidates = [
        path.join(brainDir, "media_1789749951779.jpg"),
        path.join(brainDir, "media_1789748055077.jpg"),
      ];
      const twilightImg = twilightCandidates.find((p) => fs.existsSync(p));
      if (twilightImg) {
        fs.copyFileSync(twilightImg, path.join(assetsDir, "shahi-villa-real.jpg"));
        fs.copyFileSync(twilightImg, path.join(publicDir, "shahi-villa-real.jpg"));
      }

      // The authentic venue photos
      const venuePhotos: Record<string, string> = {
        "media_1789752700283.jpg": "shahi-day-facade.jpg",
        "media_1789752694731.jpg": "shahi-grand-hall.jpg",
        "media_1789752706633.jpg": "shahi-floral-tunnel.jpg",
        "media_1789752691443.jpg": "shahi-vip-lounge.jpg",
        "media_1789752688017.jpg": "shahi-lawn-canopy.jpg",
        "media_1789753577762.jpg": "shahi-live-hall.jpg",
        "media_1789753592651.jpg": "shahi-lawn-buffet.jpg",
        "media_1789754148078.jpg": "shahi-floral-arch.jpg",
        "media_1789755046070.jpg": "shahi-parking.jpg",
        "media_1789755868529.jpg": "shahi-wedding-tunnel.jpg",
        "media_1789756643201.jpg": "shahi-bar-counter.jpg",
        "media_1789756646933.jpg": "shahi-restaurant-lounge.jpg",
      };

      for (const [srcFile, dstFile] of Object.entries(venuePhotos)) {
        const fullSrc = path.join(brainDir, srcFile);
        if (fs.existsSync(fullSrc)) {
          fs.copyFileSync(fullSrc, path.join(assetsDir, dstFile));
          fs.copyFileSync(fullSrc, path.join(publicDir, dstFile));
        }
      }

      // Food & Drinks Menu images
      const menuBrainDir = "C:/Users/hp/.gemini/antigravity-ide/brain/531cc97a-bbd6-45d8-a8c0-9362f1210e40";
      const menuPhotos: Record<string, string> = {
        "menu_cocktail_drinks_1790240067722.jpg": "menu-drinks.jpg",
        "menu_tandoori_sizzler_1790240100872.jpg": "menu-tandoori.jpg",
        "menu_royal_curries_1790240120071.jpg": "menu-curries.jpg",
        "menu_chinese_manchurian_1790247781109.jpg": "menu-chinese.jpg",
        "menu_indo_chinese_1790240149688.jpg": "menu-chinese-nonveg.jpg",
        "menu_breakfast_kulcha_1790240178998.jpg": "menu-breakfast.jpg",
        "menu_omelette_sandwich_1790241168869.jpg": "menu-omelette.jpg",
        "menu_fish_tikka_1790241692477.jpg": "menu-fish.jpg",
        "menu_soups_1790241775702.jpg": "menu-soups.jpg",
        "menu_butter_chicken_1790243318599.jpg": "menu-chicken.jpg",
        "menu_woodfire_pizza_1790243778222.jpg": "menu-pizza.jpg",
        "menu_tandoori_chicken_1790244158232.jpg": "menu-tandoori-chicken.jpg",
        "menu_shahi_raita_1790245041854.jpg": "menu-raita.jpg",
      };
      for (const [srcFile, dstFile] of Object.entries(menuPhotos)) {
        const fullSrc = path.join(menuBrainDir, srcFile);
        if (fs.existsSync(fullSrc)) {
          fs.copyFileSync(fullSrc, path.join(assetsDir, dstFile));
          fs.copyFileSync(fullSrc, path.join(publicDir, dstFile));
          console.log("[palace-plugin] Synced " + dstFile);
        }
      }

      // New Celebrations & Parties uploaded banquet hall images
      const celebrationBrainDir = "C:/Users/hp/.gemini/antigravity-ide/brain/9047ddc1-d796-4f1d-b108-d253cd1aa8c8/.user_uploaded";
      const celebrationPhotos: Record<string, string> = {
        "media_1790407746094.jpg": "banquet-celebration-hall.jpg",
        "media_1790407750965.jpg": "banquet-engagement-arch.jpg",
        "media_1790407754498.jpg": "banquet-ceremony-stage.jpg",
        "media_1790407758494.jpg": "banquet-birthday-party.jpg",
      };
      for (const [srcFile, dstFile] of Object.entries(celebrationPhotos)) {
        const fullSrc = path.join(celebrationBrainDir, srcFile);
        if (fs.existsSync(fullSrc)) {
          fs.copyFileSync(fullSrc, path.join(assetsDir, dstFile));
          fs.copyFileSync(fullSrc, path.join(publicDir, dstFile));
          console.log("[palace-plugin] Synced celebration photo " + dstFile);
        }
      }

      // Owner portrait (formal tie & turban portrait)
      const ownerSrc = path.join(celebrationBrainDir, "media_1790413898959.jpg");
      if (fs.existsSync(ownerSrc)) {
        fs.copyFileSync(ownerSrc, path.join(assetsDir, "shah-junction-owner.jpg"));
        fs.copyFileSync(ownerSrc, path.join(publicDir, "shah-junction-owner.jpg"));
        console.log("[palace-plugin] Synced new shah-junction-owner.jpg");
      }

      // The Grand Entrance Palace Gate image
      const brainRoot = "C:/Users/hp/.gemini/antigravity-ide/brain/5a7ab2f5-13ed-4bdd-86ed-d8eb2c8836a4";
      const tempStorage = path.join(brainRoot, ".tempmediaStorage");
      const gateImgSrc = path.join(tempStorage, "media_1789751295200.jpg");
      if (fs.existsSync(gateImgSrc)) {
        fs.copyFileSync(gateImgSrc, path.join(assetsDir, "palace-gate.jpg"));
        fs.copyFileSync(gateImgSrc, path.join(publicDir, "palace-gate.jpg"));
        console.log("[palace-plugin] Synced palace-gate.jpg");
      }

      // User-Approved Option 2: Royal Filigree SJ Monogram & Wordmark
      const chosenLogoJpg = "C:/Users/hp/.gemini/antigravity-ide/brain/5a337712-e05a-48f2-af0e-a25cf857fda4/shahi_name_logo_v2_1790094571627.jpg";
      if (fs.existsSync(chosenLogoJpg)) {
        fs.copyFileSync(chosenLogoJpg, path.join(assetsDir, "shah-junction-villa-logo.jpg"));
        fs.copyFileSync(chosenLogoJpg, path.join(publicDir, "shah-junction-villa-logo.jpg"));

        const tempPng = path.join(assetsDir, "temp-raw-logo.png");
        try {
          const psCmd = `powershell -NoProfile -Command "Add-Type -AssemblyName System.Drawing; $b = [System.Drawing.Bitmap]::FromFile('${chosenLogoJpg}'); $b.Save('${tempPng}', [System.Drawing.Imaging.ImageFormat]::Png); $b.Dispose()"`;
          child_process.execSync(psCmd);
          if (fs.existsSync(tempPng)) {
            generateTransparentPng(
              tempPng,
              path.join(assetsDir, "shah-junction-villa-logo.png"),
              path.join(publicDir, "shah-junction-villa-logo.png")
            );
            fs.unlinkSync(tempPng);
            console.log("[palace-plugin] Successfully processed chosen Option 2 logo into transparent PNG!");
          }
        } catch (e) {
          console.error("[palace-plugin] Error converting JPG to PNG:", e);
        }
      }
    } catch (err) {
      console.error("[palace-plugin] Error:", err);
    }
  };

  return {
    name: "copy-palace-assets",
    buildStart() {
      syncFiles();
    },
    configureServer(server) {
      syncFiles();
      server.middlewares.use("/__api/save-transparent-logo", (req, res) => {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });
        req.on("end", () => {
          try {
            const { dataUrl } = JSON.parse(body);
            if (dataUrl) {
              const base64 = dataUrl.replace(/^data:image\/png;base64,/, "");
              const buffer = Buffer.from(base64, "base64");
              fs.writeFileSync(path.join(assetsDir, "shah-junction-villa-logo.png"), buffer);
              fs.writeFileSync(path.join(publicDir, "shah-junction-villa-logo.png"), buffer);
              console.log("[palace-plugin] Successfully saved transparent logo PNG to assets and public!");
            }
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true }));
          } catch (err) {
            console.error("[palace-plugin] Error saving transparent logo:", err);
            res.writeHead(500);
            res.end();
          }
        });
      });
    },
  };
}

export default defineConfig({
  vite: {
    plugins: [copyPalaceAssetsPlugin()],
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});
