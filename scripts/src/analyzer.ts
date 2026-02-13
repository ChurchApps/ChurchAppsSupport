import { readFileSync, existsSync, statSync } from "fs";
import { resolve, dirname } from "path";
import { glob } from "glob";

export interface RouteInfo {
  path: string;
  componentName: string;
  componentFile: string;
  section: string;
  isParameterized: boolean;
  isDocumentable: boolean;
}

export interface NavItem {
  url: string;
  label: string;
  icon?: string;
  section: string;
}

export interface ComponentAnalysis {
  file: string;
  heading?: string;
  buttons: string[];
  formFields: string[];
  tableColumns: string[];
  tabs: string[];
  permissions: string[];
  imports: string[];
}

export interface FeatureMap {
  routes: RouteInfo[];
  navigation: NavItem[];
  components: Record<string, ComponentAnalysis>;
}

const B1_ADMIN_SRC = resolve(process.cwd(), "..", "..", "B1Admin", "src");

function getSectionFromPath(routePath: string): string {
  if (routePath === "/") return "Dashboard";
  const segments = routePath.split("/").filter(Boolean);
  const sectionMap: Record<string, string> = {
    people: "People",
    groups: "Groups",
    attendance: "Attendance",
    donations: "Donations",
    forms: "Forms",
    reports: "Reports",
    settings: "Settings",
    admin: "Settings",
    serving: "Serving",
    profile: "Profile",
    site: "Website",
    calendars: "Calendars",
    sermons: "Sermons",
  };
  return sectionMap[segments[0]] || segments[0];
}

function isDocumentableRoute(route: string): boolean {
  // Skip print routes, oauth, device auth
  if (route.includes("/print")) return false;
  if (route.startsWith("/oauth")) return false;
  if (route.startsWith("/device")) return false;
  if (route.startsWith("/admin")) return false;
  return true;
}

export function parseRoutes(): RouteInfo[] {
  const authFile = resolve(B1_ADMIN_SRC, "Authenticated.tsx");
  const content = readFileSync(authFile, "utf-8");

  const routes: RouteInfo[] = [];
  // Match Route declarations with path and element
  const routeRegex = /<Route\s+path="([^"]+)"\s+element=\{<(\w+)/g;
  let match;

  while ((match = routeRegex.exec(content)) !== null) {
    const [, routePath, componentName] = match;
    const isParameterized = routePath.includes(":");

    // Find the component's import/lazy load to get file path
    const lazyRegex = new RegExp(
      `const ${componentName}\\s*=\\s*React\\.lazy\\(\\(\\)\\s*=>\\s*import\\("([^"]+)"\\)`
    );
    const lazyMatch = lazyRegex.exec(content);
    const componentFile = lazyMatch ? lazyMatch[1].replace("./", "") : "";

    routes.push({
      path: routePath,
      componentName,
      componentFile,
      section: getSectionFromPath(routePath),
      isParameterized,
      isDocumentable: isDocumentableRoute(routePath),
    });
  }

  return routes;
}

export function parseNavigation(): NavItem[] {
  const navFile = resolve(B1_ADMIN_SRC, "helpers", "SecondaryMenuHelper.ts");
  const content = readFileSync(navFile, "utf-8");

  const items: NavItem[] = [];
  // Match menuItems.push patterns
  const pushRegex =
    /menuItems\.push\(\{\s*url:\s*"([^"]+)",\s*label:\s*(?:Locale\.label\("([^"]+)"\)|"([^"]+)")(?:\s*\|\|\s*"([^"]+)")?\s*(?:,\s*icon:\s*"([^"]+)")?\s*\}\)/g;
  let match;

  // Track which method we're in for section context
  const methodSections: Record<string, string> = {
    getPeopleMenu: "People",
    getSettingsMenu: "Settings",
    getServingMenu: "Serving",
    getDonationsMenu: "Donations",
    getDashboardMenu: "Dashboard",
    getSiteMenu: "Website",
    getSermonsMenu: "Sermons",
    getProfileMenu: "Profile",
  };

  for (const [methodName, section] of Object.entries(methodSections)) {
    const methodRegex = new RegExp(
      `static ${methodName}[\\s\\S]*?(?=static \\w|$)`,
      "g"
    );
    const methodMatch = methodRegex.exec(content);
    if (!methodMatch) continue;

    const methodContent = methodMatch[0];
    const innerPushRegex =
      /menuItems\.push\(\{\s*url:\s*"([^"]+)",\s*label:\s*(?:Locale\.label\("[^"]+"\)\s*(?:\|\|\s*"([^"]+)")?\s*|"([^"]+)")(?:,\s*icon:\s*"([^"]+)")?\s*\}\)/g;
    let innerMatch;

    while ((innerMatch = innerPushRegex.exec(methodContent)) !== null) {
      const url = innerMatch[1];
      const label = innerMatch[2] || innerMatch[3] || url;
      const icon = innerMatch[4];

      items.push({ url, label, icon, section });
    }
  }

  return items;
}

export function analyzeComponent(componentPath: string): ComponentAnalysis {
  const fullPath = resolve(B1_ADMIN_SRC, componentPath);

  // Try with .tsx extension if not already there
  const tryPaths = [
    fullPath + ".tsx",
    fullPath + ".ts",
    fullPath + "/index.tsx",
    fullPath,
  ];

  let content = "";
  let resolvedFile = "";
  for (const p of tryPaths) {
    if (existsSync(p) && statSync(p).isFile()) {
      content = readFileSync(p, "utf-8");
      resolvedFile = p;
      break;
    }
  }

  if (!content) {
    return {
      file: componentPath,
      buttons: [],
      formFields: [],
      tableColumns: [],
      tabs: [],
      permissions: [],
      imports: [],
    };
  }

  // Extract buttons (Button, IconButton components with text/labels)
  const buttons: string[] = [];
  const btnRegex =
    /<(?:Button|IconButton)[^>]*>([^<]*)<\/(?:Button|IconButton)>/g;
  let btnMatch;
  while ((btnMatch = btnRegex.exec(content)) !== null) {
    if (btnMatch[1].trim()) buttons.push(btnMatch[1].trim());
  }
  // Also look for onClick handlers with descriptive names
  const onClickRegex = /onClick=\{[^}]*?(\w+)\}/g;
  let clickMatch;
  while ((clickMatch = onClickRegex.exec(content)) !== null) {
    const handler = clickMatch[1];
    if (
      handler.startsWith("handle") ||
      handler.startsWith("on") ||
      handler.startsWith("save") ||
      handler.startsWith("delete")
    ) {
      buttons.push(handler);
    }
  }

  // Extract form fields (TextField, Select, InputLabel)
  const formFields: string[] = [];
  const fieldRegex = /(?:label|placeholder)=["'{]([^"'}]+)["'}]/g;
  let fieldMatch;
  while ((fieldMatch = fieldRegex.exec(content)) !== null) {
    formFields.push(fieldMatch[1]);
  }

  // Extract table columns
  const tableColumns: string[] = [];
  const colRegex =
    /(?:TableCell|th)[^>]*>(?:{[^}]*}|([^<]+))<\/(?:TableCell|th)>/g;
  let colMatch;
  while ((colMatch = colRegex.exec(content)) !== null) {
    if (colMatch[1]?.trim()) tableColumns.push(colMatch[1].trim());
  }

  // Extract tabs
  const tabs: string[] = [];
  const tabRegex = /(?:Tab|tab)[^>]*label=["'{]([^"'}]+)["'}]/g;
  let tabMatch;
  while ((tabMatch = tabRegex.exec(content)) !== null) {
    tabs.push(tabMatch[1]);
  }

  // Extract permission checks
  const permissions: string[] = [];
  const permRegex = /Permissions\.(\w+\.\w+\.\w+)/g;
  let permMatch;
  while ((permMatch = permRegex.exec(content)) !== null) {
    permissions.push(permMatch[1]);
  }

  // Extract imports
  const imports: string[] = [];
  const importRegex = /import\s+.*?from\s+["']([^"']+)["']/g;
  let importMatch;
  while ((importMatch = importRegex.exec(content)) !== null) {
    imports.push(importMatch[1]);
  }

  // Try to find heading/title
  let heading: string | undefined;
  const headingRegex = /(?:Typography|Heading|h[12])[^>]*>([^<{]+)</;
  const headingMatch = headingRegex.exec(content);
  if (headingMatch) heading = headingMatch[1].trim();

  return {
    file: resolvedFile || componentPath,
    heading,
    buttons: [...new Set(buttons)],
    formFields: [...new Set(formFields)],
    tableColumns: [...new Set(tableColumns)],
    tabs: [...new Set(tabs)],
    permissions: [...new Set(permissions)],
    imports,
  };
}

export async function buildFeatureMap(): Promise<FeatureMap> {
  const routes = parseRoutes();
  const navigation = parseNavigation();

  const components: Record<string, ComponentAnalysis> = {};
  for (const route of routes) {
    if (route.componentFile && route.isDocumentable) {
      const key = route.componentFile.replace(/\.tsx?$/, "");
      if (!components[key]) {
        components[key] = analyzeComponent(route.componentFile);
      }
    }
  }

  return { routes, navigation, components };
}
