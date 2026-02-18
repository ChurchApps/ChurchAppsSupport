import { createHash } from "crypto";
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "fs";
import { resolve, relative } from "path";
import { glob } from "glob";

const ROOT_DIR = resolve(process.cwd(), "..");
const DOCS_DIR = resolve(ROOT_DIR, "docs");
const I18N_DIR = resolve(ROOT_DIR, "i18n");
const MANIFEST_PATH = resolve(process.cwd(), "output", "translation-manifest.json");

interface Manifest {
  timestamp: string;
  files: Record<string, string>;
}

function hashFile(filePath: string): string {
  const content = readFileSync(filePath);
  return createHash("md5").update(content).digest("hex");
}

async function getEnglishDocs(): Promise<Record<string, string>> {
  const files = await glob("**/*.md", { cwd: DOCS_DIR });
  const hashes: Record<string, string> = {};
  for (const file of files.sort()) {
    const absPath = resolve(DOCS_DIR, file);
    hashes[`docs/${file.replace(/\\/g, "/")}`] = hashFile(absPath);
  }
  return hashes;
}

function loadManifest(): Manifest | null {
  if (!existsSync(MANIFEST_PATH)) return null;
  try {
    return JSON.parse(readFileSync(MANIFEST_PATH, "utf-8"));
  } catch {
    console.warn("Warning: Could not parse translation-manifest.json, treating as first run.\n");
    return null;
  }
}

function discoverLocales(): string[] {
  if (!existsSync(I18N_DIR)) return [];
  return readdirSync(I18N_DIR)
    .filter((entry) => {
      const full = resolve(I18N_DIR, entry);
      return statSync(full).isDirectory() && entry !== "en";
    })
    .sort();
}

function getMissingTranslations(locale: string, englishDocs: string[]): string[] {
  const localeDocsDir = resolve(I18N_DIR, locale, "docusaurus-plugin-content-docs", "current");
  if (!existsSync(localeDocsDir)) return englishDocs;

  const missing: string[] = [];
  for (const docPath of englishDocs) {
    const relativePath = docPath.replace(/^docs\//, "");
    const translatedPath = resolve(localeDocsDir, relativePath);
    if (!existsSync(translatedPath)) {
      missing.push(docPath);
    }
  }
  return missing;
}

export async function translationStatus(locale?: string) {
  const currentHashes = await getEnglishDocs();
  const currentFiles = Object.keys(currentHashes);
  const manifest = loadManifest();

  console.log("Translation Status");
  console.log("=".repeat(60));
  console.log(`English docs: ${currentFiles.length} total\n`);

  if (manifest) {
    console.log(`Snapshot from: ${manifest.timestamp}\n`);

    const changed: string[] = [];
    const newFiles: string[] = [];
    const deleted: string[] = [];

    for (const file of currentFiles) {
      if (!(file in manifest.files)) {
        newFiles.push(file);
      } else if (manifest.files[file] !== currentHashes[file]) {
        changed.push(file);
      }
    }
    for (const file of Object.keys(manifest.files)) {
      if (!(file in currentHashes)) {
        deleted.push(file);
      }
    }

    const unchanged = currentFiles.length - changed.length - newFiles.length;

    if (changed.length > 0) {
      console.log(`Changed since last snapshot (${changed.length}):`);
      for (const f of changed) console.log(`  ${f}`);
      console.log();
    }

    if (newFiles.length > 0) {
      console.log(`New since last snapshot (${newFiles.length}):`);
      for (const f of newFiles) console.log(`  ${f}`);
      console.log();
    }

    if (deleted.length > 0) {
      console.log(`Deleted since last snapshot (${deleted.length}):`);
      for (const f of deleted) console.log(`  ${f}`);
      console.log();
    }

    if (changed.length === 0 && newFiles.length === 0 && deleted.length === 0) {
      console.log("No changes since last snapshot.\n");
    } else {
      console.log(`Unchanged: ${unchanged} files\n`);
    }
  } else {
    console.log("No snapshot found. Run 'translation-snapshot' after completing translations.\n");
  }

  // Check missing translations per locale
  const locales = discoverLocales();
  if (locales.length === 0) {
    console.log("No locale directories found in i18n/.");
    return;
  }

  if (locale) {
    // Detailed view for a specific language
    if (!locales.includes(locale)) {
      console.log(`Locale '${locale}' not found. Available: ${locales.join(", ")}`);
      return;
    }
    const missing = getMissingTranslations(locale, currentFiles);
    console.log(`Missing ${locale} translations (${missing.length}):`);
    if (missing.length === 0) {
      console.log("  All files translated!");
    } else {
      for (const f of missing) console.log(`  ${f}`);
    }
  } else {
    // Summary view for all languages
    console.log("Missing translations by language:");
    for (const loc of locales) {
      const missing = getMissingTranslations(loc, currentFiles);
      console.log(`  ${loc}: ${missing.length} missing`);
    }
  }
}

export async function translationSnapshot() {
  const hashes = await getEnglishDocs();
  const fileCount = Object.keys(hashes).length;

  const manifest: Manifest = {
    timestamp: new Date().toISOString(),
    files: hashes,
  };

  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`Snapshot saved: ${fileCount} English docs hashed.`);
  console.log(`Output: ${MANIFEST_PATH}`);
}
