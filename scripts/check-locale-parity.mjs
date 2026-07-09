import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localesDir = path.join(__dirname, "..", "src", "locales");

const base = "en";
const others = ["ru", "uk", "vi"];

const en = JSON.parse(fs.readFileSync(path.join(localesDir, `${base}.json`), "utf8"));
const enKeys = Object.keys(en).sort();

let failed = false;

for (const lang of others) {
  const file = path.join(localesDir, `${lang}.json`);
  if (!fs.existsSync(file)) {
    console.error(`MISSING FILE: ${lang}.json`);
    failed = true;
    continue;
  }
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  const keys = Object.keys(data).sort();
  const missing = enKeys.filter((k) => !(k in data));
  const extra = keys.filter((k) => !(k in en));
  console.log(`\n=== ${lang}.json ===`);
  console.log(`keys: ${keys.length} (en: ${enKeys.length})`);
  if (missing.length) {
    failed = true;
    console.error(`missing (${missing.length}):`, missing.slice(0, 20).join(", "), missing.length > 20 ? "..." : "");
  }
  if (extra.length) {
    failed = true;
    console.error(`extra (${extra.length}):`, extra.slice(0, 20).join(", "), extra.length > 20 ? "..." : "");
  }
  if (!missing.length && !extra.length) {
    console.log("parity OK");
  }
  if (lang === "vi") {
    const identical = enKeys.filter((k) => data[k] === en[k]);
    if (identical.length) {
      console.warn(`vi still identical to en (${identical.length} keys) — sample:`, identical.slice(0, 10).join(", "));
    }
  }
}

if (failed) {
  process.exit(1);
}
console.log("\nAll locale files in parity with en.json");
