const fs = require("fs/promises");
const path = require("path");
const sharp = require("sharp");

const ROOT = process.cwd();
const SORTED_ROOT = path.join(ROOT, "site", "assets", "sorted");
const STATE_FILE = path.join(SORTED_ROOT, ".generate-images-state.json");
const FOLDERS = ["mitaermeln", "cleanundschlicht", "chiffron", "tuelandspitze"];
const TARGETS = [
  { suffix: "500", width: 500 },
  { suffix: "1200", width: 1200 }
];
const INPUT_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function hasGeneratedSuffix(baseName) {
  return /-(500|1200|full)$/i.test(baseName);
}

async function loadState() {
  try {
    const raw = await fs.readFile(STATE_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    if (error && error.code === "ENOENT") return {};
    throw error;
  }
}

async function saveState(state) {
  await fs.writeFile(STATE_FILE, JSON.stringify(state, null, 2) + "\n", "utf8");
}

function outputPathsFor(folderPath, fileName) {
  const parsed = path.parse(fileName);
  const basePath = path.join(folderPath, parsed.name);
  return {
    p500: basePath + "-500.webp",
    p1200: basePath + "-1200.webp",
    pfull: basePath + "-full.webp"
  };
}

async function allOutputsExist(paths) {
  for (const filePath of [paths.p500, paths.p1200, paths.pfull]) {
    try {
      await fs.access(filePath);
    } catch {
      return false;
    }
  }
  return true;
}

async function listOriginalImages(folderPath) {
  const entries = await fs.readdir(folderPath, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => {
      const ext = path.extname(name).toLowerCase();
      const base = path.basename(name, ext);
      return INPUT_EXTENSIONS.has(ext) && !hasGeneratedSuffix(base);
    });
}

async function createVariant(inputPath, outputPath, width) {
  console.log("  ->", path.basename(outputPath), "(" + width + "px)");
  await sharp(inputPath, { failOn: "none" })
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(outputPath);
}

async function createFullVariant(inputPath, outputPath) {
  console.log("  ->", path.basename(outputPath), "(full)");
  await sharp(inputPath, { failOn: "none" }).webp({ quality: 90 }).toFile(outputPath);
}

async function processImage(folderPath, fileName) {
  const sourcePath = path.join(folderPath, fileName);
  const parsed = path.parse(fileName);
  const basePath = path.join(folderPath, parsed.name);

  for (const target of TARGETS) {
    const outputPath = basePath + "-" + target.suffix + ".webp";
    await createVariant(sourcePath, outputPath, target.width);
  }

  const fullOutputPath = basePath + "-full.webp";
  await createFullVariant(sourcePath, fullOutputPath);
}

async function main() {
  const state = await loadState();
  let processed = 0;
  let skipped = 0;
  const failed = [];

  for (const folder of FOLDERS) {
    const folderPath = path.join(SORTED_ROOT, folder);
    const files = await listOriginalImages(folderPath);
    console.log("\nFolder:", folder, "-", files.length, "source images");

    for (const file of files) {
      const relativeSource = path.join(folder, file);
      const outputs = outputPathsFor(folderPath, file);
      const alreadyDone = state[relativeSource] && state[relativeSource].status === "done";
      const outputsReady = await allOutputsExist(outputs);

      if (alreadyDone && outputsReady) {
        console.log("Skipping (already generated):", relativeSource);
        skipped += 1;
        continue;
      }

      console.log("Generating:", relativeSource);
      try {
        await processImage(folderPath, file);
        state[relativeSource] = {
          status: "done",
          generatedAt: new Date().toISOString()
        };
        processed += 1;
      } catch (error) {
        state[relativeSource] = {
          status: "failed",
          failedAt: new Date().toISOString(),
          error: error && error.message ? error.message : String(error)
        };
        failed.push(relativeSource);
        console.error("Failed:", relativeSource);
        console.error("  ", state[relativeSource].error);
      }
    }
  }

  await saveState(state);

  console.log("\nGenerated variants for", processed, "source images.");
  console.log("Skipped already generated:", skipped);
  if (failed.length) {
    console.log("Failed images:", failed.length);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
