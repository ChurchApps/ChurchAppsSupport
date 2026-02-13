import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { mkdir } from "fs/promises";
import { FeatureMap, ComponentAnalysis, RouteInfo } from "./analyzer.js";

const DOCS_DIR = resolve(process.cwd(), "..", "docs", "b1-admin");

interface DocArticle {
  slug: string;
  title: string;
  section: string;
  routePath: string;
  componentFile: string;
  analysis: ComponentAnalysis | null;
  relatedSlugs: string[];
}

// Map routes to their documentation article slugs
const ROUTE_TO_DOC: Record<string, { slug: string; title: string; section: string }> = {
  "/": { slug: "index", title: "B1 Admin Overview", section: "" },
  "/people": { slug: "people/index", title: "People", section: "people" },
  "/people/add": { slug: "people/adding-people", title: "Adding People", section: "people" },
  "/groups": { slug: "groups/index", title: "Groups", section: "groups" },
  "/attendance": { slug: "attendance/index", title: "Attendance", section: "attendance" },
  "/donations": { slug: "donations/index", title: "Donations", section: "donations" },
  "/donations/batches": { slug: "donations/batches", title: "Donation Batches", section: "donations" },
  "/donations/funds": { slug: "donations/funds", title: "Managing Funds", section: "donations" },
  "/donations/statements": { slug: "donations/giving-statements", title: "Giving Statements", section: "donations" },
  "/donations/stripe-import": { slug: "donations/stripe-import", title: "Stripe Import", section: "donations" },
  "/forms": { slug: "forms/index", title: "Forms", section: "forms" },
  "/reports": { slug: "reports/index", title: "Reports", section: "reports" },
  "/settings/*": { slug: "settings/index", title: "Settings", section: "settings" },
  "/serving": { slug: "serving/index", title: "Serving", section: "serving" },
  "/serving/tasks": { slug: "serving/tasks", title: "Tasks", section: "serving" },
  "/serving/tasks/automations": { slug: "serving/automations", title: "Automations", section: "serving" },
  "/serving/songs": { slug: "serving/songs", title: "Songs", section: "serving" },
  "/sermons": { slug: "sermons/index", title: "Sermons", section: "sermons" },
  "/sermons/playlists": { slug: "sermons/playlists", title: "Playlists", section: "sermons" },
  "/sermons/times": { slug: "sermons/live-streaming", title: "Live Streaming", section: "sermons" },
  "/sermons/bulk": { slug: "sermons/bulk-import", title: "Bulk Import", section: "sermons" },
  "/calendars": { slug: "calendars/index", title: "Calendars", section: "calendars" },
  "/profile": { slug: "profile/index", title: "Profile", section: "profile" },
  "/profile/devices": { slug: "profile/devices", title: "Managing Devices", section: "profile" },
  "/site/*": { slug: "website/index", title: "Website", section: "website" },
};

// Related articles mapping by section
const SECTION_RELATED: Record<string, string[]> = {
  people: ["groups/index", "attendance/index"],
  groups: ["people/index", "attendance/index"],
  attendance: ["people/index", "groups/index"],
  donations: ["reports/index"],
  serving: ["forms/index"],
  forms: ["serving/index", "people/index"],
  reports: ["donations/index", "attendance/index", "people/index"],
  website: ["calendars/index"],
  sermons: ["website/index"],
  calendars: ["website/index"],
  settings: ["people/roles-permissions"],
  profile: ["settings/index"],
};

function buildArticleList(featureMap: FeatureMap): DocArticle[] {
  const articles: DocArticle[] = [];

  for (const route of featureMap.routes) {
    if (!route.isDocumentable) continue;

    const docMapping = ROUTE_TO_DOC[route.path];
    if (!docMapping) continue;

    const componentKey = route.componentFile.replace(/\.tsx?$/, "");
    const analysis = featureMap.components[componentKey] || null;
    const relatedSlugs = SECTION_RELATED[docMapping.section] || [];

    articles.push({
      slug: docMapping.slug,
      title: docMapping.title,
      section: docMapping.section,
      routePath: route.path,
      componentFile: route.componentFile,
      analysis,
      relatedSlugs,
    });
  }

  return articles;
}

function buildPrompt(article: DocArticle, componentSource: string): string {
  const analysisSection = article.analysis
    ? `
Based on analysis of the source code, this page has:
${article.analysis.formFields.length > 0 ? `- Form fields: ${article.analysis.formFields.join(", ")}` : ""}
${article.analysis.buttons.length > 0 ? `- Buttons/actions: ${article.analysis.buttons.join(", ")}` : ""}
${article.analysis.tableColumns.length > 0 ? `- Table columns: ${article.analysis.tableColumns.join(", ")}` : ""}
${article.analysis.tabs.length > 0 ? `- Tabs: ${article.analysis.tabs.join(", ")}` : ""}
${article.analysis.permissions.length > 0 ? `- Required permissions: ${article.analysis.permissions.join(", ")}` : ""}
`.trim()
    : "";

  return `You are writing end-user documentation for B1 Admin (https://admin.b1.church), a free, open-source church management tool by ChurchApps.

Write a help article for: "${article.title}"

This page is accessed at route: ${article.routePath}
It belongs to the ${article.section || "main"} section.

${analysisSection}

Here is the React component source code for this page:
\`\`\`tsx
${componentSource}
\`\`\`

Write ONLY the markdown body content (no front matter - that is added separately). Follow this format:

1. Start with a brief 1-2 sentence description of what this feature does and why it's useful
2. Write step-by-step instructions for the primary workflow using numbered lists
3. Add additional sections (## headings) for secondary workflows if the page supports them
4. Use Docusaurus admonitions where helpful:
   - :::tip for helpful shortcuts or best practices
   - :::info for important context
   - :::note for additional details

Rules:
- Keep language simple, friendly, and church-appropriate
- Use "you" voice (e.g., "Click the Add button" not "The user clicks")
- Reference UI elements in **bold** (e.g., **People** tab, **Save** button)
- Do not invent features that aren't in the source code
- Do not include screenshot placeholders
- Keep the article focused and concise (aim for 200-500 words)
- If the page has tabs, document each tab in its own section`;
}

export async function generateArticle(
  article: DocArticle,
  apiKey: string
): Promise<string> {
  // Read the component source
  const b1AdminSrc = resolve(process.cwd(), "..", "..", "B1Admin", "src");
  let componentSource = "";

  const tryPaths = [
    resolve(b1AdminSrc, article.componentFile + ".tsx"),
    resolve(b1AdminSrc, article.componentFile + ".ts"),
    resolve(b1AdminSrc, article.componentFile, "index.tsx"),
    resolve(b1AdminSrc, article.componentFile),
  ];

  for (const p of tryPaths) {
    if (existsSync(p)) {
      componentSource = readFileSync(p, "utf-8");
      break;
    }
  }

  // Truncate if too long (keep first 4000 chars)
  if (componentSource.length > 6000) {
    componentSource = componentSource.substring(0, 6000) + "\n// ... (truncated)";
  }

  const prompt = buildPrompt(article, componentSource);

  const client = new Anthropic({ apiKey });
  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2000,
    messages: [{ role: "user", content: prompt }],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  return textBlock?.text || "";
}

export async function writeArticle(slug: string, title: string, content: string): Promise<void> {
  const filePath = resolve(DOCS_DIR, slug + ".md");
  await mkdir(dirname(filePath), { recursive: true });

  const frontMatter = `---\ntitle: "${title}"\n---\n\n`;
  writeFileSync(filePath, frontMatter + content);
}

export async function generateAllArticles(
  featureMap: FeatureMap,
  apiKey: string,
  targetSlug?: string
): Promise<void> {
  const articles = buildArticleList(featureMap);

  const toGenerate = targetSlug
    ? articles.filter((a) => a.slug === targetSlug)
    : articles;

  if (toGenerate.length === 0) {
    console.log(targetSlug ? `No article found for slug: ${targetSlug}` : "No articles to generate.");
    return;
  }

  console.log(`Generating ${toGenerate.length} article(s)...`);

  for (const article of toGenerate) {
    console.log(`  Generating: ${article.slug} (${article.title})...`);
    try {
      const content = await generateArticle(article, apiKey);
      await writeArticle(article.slug, article.title, content);
      console.log(`  Done: ${article.slug}`);
    } catch (err: any) {
      console.error(`  Error generating ${article.slug}: ${err.message}`);
    }
  }
}

export { buildArticleList, ROUTE_TO_DOC };
