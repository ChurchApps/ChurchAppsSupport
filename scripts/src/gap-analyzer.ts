import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { glob } from "glob";
import matter from "gray-matter";
import { FeatureMap, RouteInfo } from "./analyzer.js";
import { ROUTE_TO_DOC } from "./generator.js";

interface ExistingDoc {
  filePath: string;
  slug: string;
  title: string;
  wordCount: number;
  isPlaceholder: boolean;
}

interface GapEntry {
  route: string;
  section: string;
  docSlug: string;
  title: string;
  status: "missing" | "placeholder" | "documented";
  wordCount: number;
}

export async function scanExistingDocs(): Promise<ExistingDoc[]> {
  const docsDir = resolve(process.cwd(), "..", "docs", "b1-admin");
  const files = await glob("**/*.md", { cwd: docsDir });
  const docs: ExistingDoc[] = [];

  for (const file of files) {
    const fullPath = resolve(docsDir, file);
    const content = readFileSync(fullPath, "utf-8");
    const { data, content: body } = matter(content);
    const slug = file.replace(/\.md$/, "").replace(/\\/g, "/");

    // Count words in body (excluding front matter)
    const words = body.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    // A doc is a placeholder if it has fewer than 50 words of actual content
    const isPlaceholder = wordCount < 50;

    docs.push({
      filePath: fullPath,
      slug,
      title: data.title || slug,
      wordCount,
      isPlaceholder,
    });
  }

  return docs;
}

export async function generateGapReport(featureMap: FeatureMap): Promise<GapEntry[]> {
  const existingDocs = await scanExistingDocs();
  const docsBySlug = new Map(existingDocs.map((d) => [d.slug, d]));
  const gaps: GapEntry[] = [];

  for (const route of featureMap.routes) {
    if (!route.isDocumentable) continue;

    const mapping = ROUTE_TO_DOC[route.path];
    if (!mapping) continue;

    const doc = docsBySlug.get(mapping.slug);

    if (!doc) {
      gaps.push({
        route: route.path,
        section: mapping.section,
        docSlug: mapping.slug,
        title: mapping.title,
        status: "missing",
        wordCount: 0,
      });
    } else if (doc.isPlaceholder) {
      gaps.push({
        route: route.path,
        section: mapping.section,
        docSlug: mapping.slug,
        title: mapping.title,
        status: "placeholder",
        wordCount: doc.wordCount,
      });
    } else {
      gaps.push({
        route: route.path,
        section: mapping.section,
        docSlug: mapping.slug,
        title: mapping.title,
        status: "documented",
        wordCount: doc.wordCount,
      });
    }
  }

  return gaps;
}

export function printGapReport(gaps: GapEntry[]): void {
  const missing = gaps.filter((g) => g.status === "missing");
  const placeholder = gaps.filter((g) => g.status === "placeholder");
  const documented = gaps.filter((g) => g.status === "documented");

  console.log("\n=== Documentation Gap Report ===\n");
  console.log(`Total routes mapped: ${gaps.length}`);
  console.log(`  Documented:  ${documented.length}`);
  console.log(`  Placeholder: ${placeholder.length}`);
  console.log(`  Missing:     ${missing.length}`);

  if (placeholder.length > 0) {
    console.log("\n--- Placeholder (need content) ---");
    for (const g of placeholder) {
      console.log(`  [${g.section.padEnd(12)}] ${g.docSlug.padEnd(40)} "${g.title}" (${g.wordCount} words)`);
    }
  }

  if (missing.length > 0) {
    console.log("\n--- Missing (no doc file) ---");
    for (const g of missing) {
      console.log(`  [${g.section.padEnd(12)}] ${g.docSlug.padEnd(40)} "${g.title}"`);
    }
  }

  if (documented.length > 0) {
    console.log("\n--- Documented ---");
    for (const g of documented) {
      console.log(`  [${g.section.padEnd(12)}] ${g.docSlug.padEnd(40)} "${g.title}" (${g.wordCount} words)`);
    }
  }

  console.log("");
}
