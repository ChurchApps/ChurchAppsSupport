---
title: "Claude"
---

# Claude

<div class="article-intro">

Ask Claude about your church in plain English and it answers from your B1 data. Questions like *"how many first-time visitors came on Sunday?"* or *"who joined a small group this month?"* — or ask it to do things, like *"add a new page to our website called Events."* Setup takes less than 3 minutes and you don't need any technical skills or software to install.

</div>

<div class="prereqs">
<h4>What You Need</h4>

- **A Claude account.** The **free plan works** — a good way to try it out. Free accounts have a daily message limit, though, and looking things up in B1 uses messages quickly, so if you use it regularly we recommend **Claude Pro** (about $20/month).
- **Your B1 login** — the same one you use for B1 Admin.

</div>

:::tip Recommended — free to try
Claude is the easiest way to connect B1 to AI, and it works on Claude's **free plan** — a perfect way for your church to try it out before paying for anything.
:::

There are two ways to connect. **Option 1 is the easiest** — no key and nothing to install.

## Option 1 — Sign in with B1 (easiest)

Works on the Claude website, the Claude desktop app, and the Claude phone app — set it up once and it's on all of them.

### Step 1 — Open Claude's connector settings

1. Go to [claude.ai](https://claude.ai) and sign in (or create a free account).
2. Click your name in the bottom-left corner, then **Settings** → **Connectors**.

### Step 2 — Add B1

1. Click **Add**, then **Add custom connector**.
2. **Name:** type `B1`.
3. **URL:** paste `https://api.churchapps.org/mcp`
4. Leave the other options as they are and click **Add**.

### Step 3 — Sign in to B1

1. Click **Connect**. A B1 sign-in page opens.
2. Log in with your B1 account. If you belong to more than one church, check that the right church is shown at the top.
3. B1 lists what Claude is asking to do and confirms you'll be sent back to **claude.ai**. Click **Allow**.

You're back in Claude, and B1 shows as connected.

### Step 4 — Ask it something

Start a **new chat** and try:

- *"How many people are in our church?"*
- *"List our active groups."*
- *"Summarize this month's giving by fund."*
- *"Who joined the church in the last 30 days?"*

The first time, Claude asks permission to use B1 — click **Allow**.

## Option 2 — Desktop extension with a B1 key

Use this if you'd rather give Claude a key with limited permissions (for example, look-only). It works in the Claude desktop app for Mac or Windows, and you need permission to manage church settings in B1 to make a key.

### Step 1 — Get the Claude app

Download the Claude app from [claude.com/download](https://claude.com/download), install it, open it, and sign in.

### Step 2 — Make your B1 key

The key is what lets Claude into *your* church's B1 — think of it like a password just for Claude.

1. Log in to [B1 Admin](https://admin.b1.church) and go to [Settings → Developer](https://admin.b1.church/settings/developer).
2. On the **API Keys** tab, click **New API Key**.
3. **Name:** type `Claude`.
4. **Scopes:** check what Claude may do. Each area has a **read** box (look only) and a **write** box (make changes). Not sure? Check just the **read** boxes to start — you can make a new key with more later.
5. Click **Save**, then **Copy** the key. It's only shown once, so go straight to Step 3.

### Step 3 — Add B1 to Claude

1. [Download the B1 extension](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Double-click** the downloaded file (`b1-churchapps.mcpb`). Claude opens and shows **B1 (ChurchApps)**.
3. Click **Install**.
4. When it asks for your **B1 API key**, paste the key from Step 2 and save.
5. **Quit Claude completely** (Mac: **Cmd+Q** · Windows: right-click the Claude icon in the taskbar → **Quit**) and open it again.

If double-clicking doesn't open Claude, go to **Settings → Extensions → Advanced settings → Install Extension…** in Claude and choose the downloaded file. Then start a new chat and ask it something.

## Is It Safe?

- Claude can only see **your church's** data.
- **Signed in (Option 1):** Claude can never do more than your own B1 login can. The B1 sign-in page lists everything Claude may do before you click **Allow**.
- **With a key (Option 2):** Claude can only do what the key allows — a key with only **read** boxes checked can look but never change anything.
- **To turn it off:** in B1 Admin go to **Settings → Developer** and revoke the app under **Connected Apps** (Option 1) or delete the key under **API Keys** (Option 2). Access stops right away. You can also click **Disconnect** on the B1 connector in Claude.

## What Does It Cost?

The B1 connection is free — it's part of ChurchApps. Claude itself has a free plan; Claude Pro (about $20/month) gives you much more use. See [claude.com/pricing](https://claude.com/pricing).

## Technical Details

The rest of this page is for technical users and AI assistants: scopes, other ways to connect, and how it works.

### Scopes

Claude talks to B1 through the **Model Context Protocol (MCP) server** built into the B1 API (`https://api.churchapps.org/mcp`). Every call runs through the same auth, permission, and church-scoping rules as a request from B1 Admin. Claude is limited to the **permissions and scopes** of the API key, and cannot reach webhooks, OAuth admin endpoints, or other operator-only paths.

Common starter scope sets:

- **Read-only assistant:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Read + add notes / tasks:** add `people:write`
- **Full operational assistant:** add the matching `:write` scopes you want

A `donations:read` key lets Claude summarize giving but cannot record a gift. A `people:write` key can add a person but cannot see donations. See [API Keys](/docs/developer/api/api-keys) for what each scope allows.

### Other ways to connect

#### Claude Code (CLI)

In a terminal:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

That's it. Inside any Claude Code session, type `/mcp` to confirm the `b1` server is connected, then ask Claude any question about your church.

#### Claude Desktop — manual config (advanced)

If you'd rather not use the extension, edit Claude Desktop's config file:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Add a `b1` server entry that bridges to B1 through `mcp-remote` (requires [Node.js](https://nodejs.org)):

```json
{
  "mcpServers": {
    "b1": {
      "command": "npx",
      "args": [
        "-y", "mcp-remote",
        "https://api.churchapps.org/mcp",
        "--header", "Authorization:Bearer cak_<prefix>.<secret>"
      ]
    }
  }
}
```

Restart Claude Desktop. The connector menu in the chat composer will show `b1` with its tools.

#### Claude.ai (web) — Custom Connector

See **Option 1** above. The connector uses OAuth 2.1: Claude discovers B1's authorization server from `https://api.churchapps.org/.well-known/oauth-protected-resource`, registers itself with Dynamic Client Registration, and signs in with PKCE. On Team and Enterprise plans an owner may need to add the connector for the organization first. Claude doesn't request specific scopes, so the consent page offers everything the signed-in B1 account can access. Revoke it under **Settings → Developer → Connected Apps** in B1 Admin.

### How it works

The B1 API exposes a single MCP endpoint at `/mcp`. Claude connects to it, authenticates with your `cak_…` key, and gets access to four tools:

| Tool | What it does |
|---|---|
| `list_endpoints` | Lists the REST endpoints Claude can call, filterable by path. Used for discovery. |
| `describe_endpoint` | Returns a short summary and an example request/response for a specific endpoint. |
| `api_call` | Actually invokes a REST endpoint as the authenticated user. |
| `describe_page_builder` | A guide to building and editing your church website's pages, which Claude reads before working on website content. |

This is the same `/membership/people`, `/giving/donations`, `/attendance/visits` etc. surface your B1Admin uses — every authorization rule applies identically.

### Safety and limits

- **Per-church isolation.** The API key resolves to one church. Claude has no way to see other churches' data.
- **Permission-scoped.** If you remove a permission from the person who minted the key in B1Admin, Claude loses it on the next call — instantly.
- **Revocable.** Delete the key in **Settings → Developer → API Keys** and Claude's access ends immediately.
- **Blocklist.** Provider webhooks, OAuth client admin endpoints, and the operator-only `apiEmails` route are not callable via MCP.
- **Response size cap.** A single tool response is capped at 64 KB so long lists don't blow out Claude's context — Claude will narrow the query with filters when this happens.
- **Audit trail.** Mutations go through the same audit log as B1Admin actions; you can review them under **Settings → Audit Log**.

### Troubleshooting

**Claude reports "Unauthorized" or 401:** the bearer token is missing, malformed, or the key has been revoked. If you used the extension, open **Settings → Extensions → B1 (ChurchApps)** in Claude and paste the key again. Otherwise re-check the `Authorization: Bearer cak_…` header (note the space and the literal `Bearer`).

**A tool call returns 403:** the API key doesn't have the scope for that endpoint. Add the scope in **Settings → Developer → API Keys** (you'll need to create a new key — scopes can't be changed in place) and paste the new key into the extension's settings or Claude's config.

**Claude can't find an endpoint:** ask it to call `list_endpoints` with a filter, e.g. *"use list_endpoints with filter 'donations' to find the right path"*. The route inventory is generated from the live API, so anything you can hit with `curl` is there.

**Local development:** swap `https://api.churchapps.org/mcp` for `http://localhost:8084/mcp` — same auth, same tools.

## Related

- [API Keys](/docs/developer/api/api-keys) — full scope reference
- [MCP Server (developer reference)](/docs/developer/api/mcp) — protocol details and tool schemas
- [ChatGPT](./chatgpt) — same idea, for OpenAI's models
