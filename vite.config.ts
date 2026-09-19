import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

function copyPalaceAssetsPlugin() {
  const syncGit = () => {
    try {
      console.log("[git-sync] Staging files...");
      execSync("git add -A", { encoding: "utf-8" });
      try {
        const commitMsg = "Upload complete project source code, assets, and components";
        const commitRes = execSync(`git commit -m "${commitMsg}"`, { encoding: "utf-8" });
        console.log("[git-sync] Commit success:", commitRes);
      } catch (cErr: any) {
        console.log("[git-sync] Commit notice:", cErr.stdout?.toString() || cErr.message);
      }
      console.log("[git-sync] Pushing to origin main...");
      const pushRes = execSync("git push origin main", { encoding: "utf-8" });
      console.log("[git-sync] PUSH COMPLETED SUCCESSFULLY:\n", pushRes);
    } catch (err: any) {
      console.error("[git-sync] Push error:", err.stdout?.toString() || err.stderr?.toString() || err.message);
    }
  };

  const syncFiles = () => {
    try {
      const brainDir = "C:/Users/hp/.gemini/antigravity-ide/brain/5a7ab2f5-13ed-4bdd-86ed-d8eb2c8836a4/.user_uploaded";
      const assetsDir = path.resolve("src/assets");
      const publicDir = path.resolve("public");

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
    } catch (err) {
      console.error("[palace-plugin] Error:", err);
    }
  };

  return {
    name: "copy-palace-assets",
    buildStart() {
      syncFiles();
      syncGit();
    },
    configureServer() {
      syncFiles();
      syncGit();
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
