import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { mkdir } from "fs/promises";
import { glob } from "glob";
import matter from "gray-matter";

const JEKYLL_DIR = resolve(process.cwd(), "..", "b1Admin");
const DOCS_DIR = resolve(process.cwd(), "..", "docs", "b1-admin");

// Map Jekyll section names to Docusaurus folder paths
const SECTION_TO_FOLDER: Record<string, string> = {
  "01 Getting Started": "",
  "02 Admin": "settings",
  "03 Website": "website",
  "04 People": "people",
  "05 Donations": "donations",
  "05 Giving": "donations",
  "06 Groups": "groups",
  "07 Attendance": "attendance",
  "08 Calendar": "calendars",
  "08 Sermons": "sermons",
  "09 Forms": "forms",
  "10 Plans": "serving",
  "11 Automation": "serving",
  "12 Data": "settings",
};

// Map Jekyll filenames to Docusaurus slugs
const FILE_SLUG_MAP: Record<string, string> = {
  "intro": "index",
  "adding-people": "people/adding-people",
  "advanced-search": "people/searching-people",
  "ai-search": "people/ai-search",
  "assigning-roles": "people/roles-permissions",
  "exporting-data": "people/exporting-data",
  "manual-input": "donations/recording-donations",
  "import-csv": "people/importing-data",
  "import-from-breeze": "people/importing-data",
  "website-initial-setup": "website/initial-setup",
  "website-page-setup": "website/managing-pages",
  "website-advanced": "website/appearance",
  "groups": "groups/creating-groups",
  "group-roster": "groups/group-members",
  "group-calendar": "groups/group-calendar",
  "attendance": "attendance/setup",
  "checkin": "attendance/check-in",
  "giving": "donations/online-giving-setup",
  "donation-report": "donations/donation-reports",
  "forms": "forms/creating-forms",
  "sermons": "sermons/managing-sermons",
  "stream-setup": "sermons/live-streaming",
  "youtube-channel-id": "sermons/live-streaming",
  "automations": "serving/automations",
  "curated-calendar": "calendars/curated-calendar",
  "plans": "serving/plans",
  "service-order": "serving/service-order",
  "tasks": "serving/tasks",
  "data-security": "settings/church-settings",
  "mobile-admin": "settings/mobile-app",
};

function extractStepText(content: string): string[] {
  const steps: string[] = [];
  // Match step-text spans in the accordion markup
  const stepRegex = /<span class="step-text">([^<]+)<\/span>/g;
  let match;
  while ((match = stepRegex.exec(content)) !== null) {
    steps.push(match[1].trim());
  }
  return steps;
}

function stripHtmlMarkup(content: string): string {
  // Remove style blocks
  let clean = content.replace(/<style>[\s\S]*?<\/style>/g, "");
  // Remove script blocks
  clean = clean.replace(/<script>[\s\S]*?<\/script>/g, "");
  // Remove video container divs
  clean = clean.replace(/<div id="videoContainer">[\s\S]*?<\/div>\s*<\/div>/g, "");
  // Remove step accordion divs
  clean = clean.replace(/<div id="[^"]*-steps"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g, "");
  // Remove remaining HTML tags but keep text
  clean = clean.replace(/<[^>]+>/g, "");
  // Clean up extra whitespace
  clean = clean.replace(/\n{3,}/g, "\n\n").trim();
  return clean;
}

export interface MigrationResult {
  sourceFile: string;
  targetSlug: string;
  title: string;
  steps: string[];
  status: "migrated" | "skipped" | "merged";
}

export async function migrateJekyllDocs(): Promise<MigrationResult[]> {
  const results: MigrationResult[] = [];

  if (!existsSync(JEKYLL_DIR)) {
    console.log("Jekyll b1Admin directory not found. Skipping migration.");
    return results;
  }

  const files = await glob("*.md", { cwd: JEKYLL_DIR });

  // Track which target slugs we've already written to (for merging)
  const writtenSlugs = new Set<string>();

  for (const file of files) {
    const basename = file.replace(/\.md$/, "");
    if (basename === "index") continue; // Skip the app index page

    const fullPath = resolve(JEKYLL_DIR, file);
    const rawContent = readFileSync(fullPath, "utf-8");
    const { data: frontMatter, content } = matter(rawContent);

    const targetSlug = FILE_SLUG_MAP[basename];
    if (!targetSlug) {
      console.log(`  Skipping ${file}: no slug mapping defined`);
      results.push({
        sourceFile: file,
        targetSlug: "",
        title: frontMatter.title || basename,
        steps: [],
        status: "skipped",
      });
      continue;
    }

    // Extract step instructions from accordion markup
    const steps = extractStepText(content);

    // Also extract any plain text content
    const plainText = stripHtmlMarkup(content);

    // Build the migrated markdown content
    const title = frontMatter.title || basename;
    let mdContent = "";

    if (steps.length > 0) {
      mdContent += "## Steps\n\n";
      steps.forEach((step, i) => {
        mdContent += `${i + 1}. ${step}\n`;
      });
      mdContent += "\n";
    }

    // Add any remaining plain text that isn't just whitespace
    const cleanPlain = plainText
      .replace(/^#.*$/gm, "") // Remove headings (they'll be in front matter)
      .replace(/## Related Tutorials[\s\S]*$/m, "") // Remove related tutorials (handled by sidebar)
      .trim();

    if (cleanPlain.length > 20) {
      mdContent += cleanPlain + "\n";
    }

    if (writtenSlugs.has(targetSlug)) {
      // Append to existing file instead of overwriting
      const targetPath = resolve(DOCS_DIR, targetSlug + ".md");
      if (existsSync(targetPath)) {
        const existing = readFileSync(targetPath, "utf-8");
        writeFileSync(targetPath, existing + "\n\n" + mdContent);
      }
      results.push({ sourceFile: file, targetSlug, title, steps, status: "merged" });
    } else if (mdContent.trim().length > 0) {
      const targetPath = resolve(DOCS_DIR, targetSlug + ".md");
      await mkdir(dirname(targetPath), { recursive: true });

      const fullContent = `---\ntitle: "${title}"\n---\n\n# ${title}\n\n${mdContent}`;
      writeFileSync(targetPath, fullContent);
      writtenSlugs.add(targetSlug);

      results.push({ sourceFile: file, targetSlug, title, steps, status: "migrated" });
    } else {
      results.push({ sourceFile: file, targetSlug, title, steps, status: "skipped" });
    }
  }

  return results;
}
