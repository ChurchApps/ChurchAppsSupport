import { Command } from "commander";
import { writeFileSync } from "fs";
import { resolve } from "path";
import { buildFeatureMap } from "./analyzer.js";
import { generateAllArticles } from "./generator.js";
import { generateGapReport, printGapReport } from "./gap-analyzer.js";
import { migrateJekyllDocs } from "./migrate.js";
import { translationStatus, translationSnapshot } from "./translation-tracker.js";

const program = new Command();

program
  .name("docs-automation")
  .description("Documentation automation pipeline for ChurchApps")
  .version("1.0.0");

program
  .command("analyze")
  .description("Parse B1Admin source code and generate a feature map")
  .action(async () => {
    console.log("Analyzing B1Admin source code...");
    const featureMap = await buildFeatureMap();

    const outputPath = resolve(process.cwd(), "output", "feature-map.json");
    writeFileSync(outputPath, JSON.stringify(featureMap, null, 2));

    console.log(`\nFeature Map Summary:`);
    console.log(`  Routes: ${featureMap.routes.length} (${featureMap.routes.filter(r => r.isDocumentable).length} documentable)`);
    console.log(`  Navigation items: ${featureMap.navigation.length}`);
    console.log(`  Components analyzed: ${Object.keys(featureMap.components).length}`);
    console.log(`\nOutput saved to: ${outputPath}`);
  });

program
  .command("generate")
  .description("Generate documentation articles using AI")
  .option("--slug <slug>", "Generate a single article by slug (e.g., b1-admin/reports/index)")
  .option("--api-key <key>", "Anthropic API key (or set ANTHROPIC_API_KEY env var)")
  .action(async (options) => {
    const apiKey = options.apiKey || process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error("Error: Anthropic API key required. Use --api-key or set ANTHROPIC_API_KEY env var.");
      process.exit(1);
    }

    console.log("Analyzing B1Admin source code...");
    const featureMap = await buildFeatureMap();

    await generateAllArticles(featureMap, apiKey, options.slug);
    console.log("\nDone! Review generated articles in docs/b1-admin/");
  });

program
  .command("gap-report")
  .description("Show documentation coverage report")
  .action(async () => {
    console.log("Analyzing B1Admin source code...");
    const featureMap = await buildFeatureMap();

    console.log("Scanning existing documentation...");
    const gaps = await generateGapReport(featureMap);

    printGapReport(gaps);

    // Save JSON report
    const outputPath = resolve(process.cwd(), "output", "gap-report.json");
    writeFileSync(outputPath, JSON.stringify(gaps, null, 2));
    console.log(`Report saved to: ${outputPath}`);
  });

program
  .command("migrate")
  .description("Migrate existing Jekyll B1Admin docs to Docusaurus format")
  .action(async () => {
    console.log("Migrating Jekyll B1Admin docs to Docusaurus...\n");
    const results = await migrateJekyllDocs();

    const migrated = results.filter(r => r.status === "migrated");
    const merged = results.filter(r => r.status === "merged");
    const skipped = results.filter(r => r.status === "skipped");

    console.log(`\nMigration Summary:`);
    console.log(`  Migrated: ${migrated.length}`);
    console.log(`  Merged:   ${merged.length}`);
    console.log(`  Skipped:  ${skipped.length}`);

    if (skipped.length > 0) {
      console.log("\nSkipped files (no slug mapping):");
      for (const s of skipped) {
        console.log(`  ${s.sourceFile}`);
      }
    }
  });

program
  .command("translation-status")
  .description("Show which English docs changed since last translation snapshot")
  .option("--locale <code>", "Show detailed missing files for a specific language")
  .action(async (options) => {
    await translationStatus(options.locale);
  });

program
  .command("translation-snapshot")
  .description("Save current English doc hashes after completing translations")
  .action(async () => {
    await translationSnapshot();
  });

program.parse();
