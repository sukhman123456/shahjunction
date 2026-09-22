import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
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
      for (let x = 0; x < width; x++) {
        const inPx = x * bytesPerPixel;
        const r = currRow[inPx];
        const g = currRow[inPx + 1];
        const b = currRow[inPx + 2];
        const inA = colorType === 6 ? currRow[inPx + 3] : 255;
        const maxVal = Math.max(r, g, b);
        let outA = inA;
        if (maxVal <= 46) {
          outA = 0;
        } else if (maxVal < 92) {
          const t = (maxVal - 46) / 46;
          outA = Math.round(Math.pow(t, 1.4) * inA);
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

      // The Grand Entrance Palace Gate image
      const brainRoot = "C:/Users/hp/.gemini/antigravity-ide/brain/5a7ab2f5-13ed-4bdd-86ed-d8eb2c8836a4";
      const tempStorage = path.join(brainRoot, ".tempmediaStorage");
      const gateImgSrc = path.join(tempStorage, "media_1789751295200.jpg");
      if (fs.existsSync(gateImgSrc)) {
        fs.copyFileSync(gateImgSrc, path.join(assetsDir, "palace-gate.jpg"));
        fs.copyFileSync(gateImgSrc, path.join(publicDir, "palace-gate.jpg"));
        console.log("[palace-plugin] Synced palace-gate.jpg");
      }

      // Latest Shah Junction Villa Luxury Brand Logo
      const logoPngCandidates = [
        path.join("C:/Users/hp/.gemini/antigravity-ide/brain/5a337712-e05a-48f2-af0e-a25cf857fda4/.user_uploaded", "media_1790088831247.png"),
      ];
      for (const cand of logoPngCandidates) {
        if (fs.existsSync(cand)) {
          fs.copyFileSync(cand, path.join(assetsDir, "shah-junction-villa-logo.jpg"));
          fs.copyFileSync(cand, path.join(publicDir, "shah-junction-villa-logo.jpg"));
          // Generate true transparent PNG
          generateTransparentPng(
            cand,
            path.join(assetsDir, "shah-junction-villa-logo.png"),
            path.join(publicDir, "shah-junction-villa-logo.png")
          );
          console.log("[palace-plugin] Processed latest logo into transparent PNG from " + cand);
          break;
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
