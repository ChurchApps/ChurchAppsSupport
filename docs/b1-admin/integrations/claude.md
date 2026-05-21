---
title: "Claude"
---

# Claude

<div class="article-intro">

Connect Anthropic's Claude to your church's B1 data. With an API key and a few minutes of setup, you can ask Claude questions like "how many first-time visitors came on Sunday?" or "draft a thank-you email to the people who gave to the building fund this month" — and Claude will read the answers directly from your church's records, scoped to your permissions.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- A church admin with the **Edit Settings** permission (to mint an API key)
- One of: **Claude Code** (CLI / IDE extension), **Claude Desktop** (Mac/Windows), or a **Claude Pro/Max/Team** account
- The full URL of your B1 API — usually `https://api.churchapps.org` for hosted churches, or your self-hosted Api host

</div>

## What Claude Can See

Claude talks to B1 through the **Model Context Protocol (MCP) server** built into the B1 API. Every call Claude makes runs through the same auth, permission, and church-scoping rules as a request from B1Admin — meaning Claude:

- Only ever sees data for **your** church
- Is limited to whatever **permissions and scopes** the API key you give it carries
- Cannot reach webhooks, OAuth admin endpoints, or other operator-only paths (those are blocklisted)

A `donations:read` key lets Claude summarize giving but cannot record a gift. A `people:write` key can add a person but cannot see donations. Pick the scopes that match the work.

## Setup

### 1. Create an API key

1. In B1Admin go to **Settings → Developer → API Keys**.
2. Click **New API Key**, name it `Claude`, and select the scopes Claude should have. Common starter sets:
   - **Read-only assistant:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
   - **Read + add notes / tasks:** add `people:write`
   - **Full operational assistant:** add the matching `:write` scopes you want
3. Save. The full `cak_…` key is shown **once** — copy it.

See [API Keys](/docs/developer/api/api-keys) for what each scope allows.

### 2. Connect Claude

Pick the Claude client you use:

#### Claude Code (CLI)

In a terminal:

```bash
claude mcp add --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

That's it. Inside any Claude Code session, type `/mcp` to confirm the `b1` server is connected, then ask Claude any question about your church.

#### Claude Desktop

Edit Claude Desktop's config file:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Add a `b1` server entry. Newer versions of Claude Desktop speak HTTP MCP natively:

```json
{
  "mcpServers": {
    "b1": {
      "url": "https://api.churchapps.org/mcp",
      "headers": {
        "Authorization": "Bearer cak_<prefix>.<secret>"
      }
    }
  }
}
```

If your Claude Desktop version only supports stdio servers, bridge through `mcp-remote`:

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

Restart Claude Desktop. The connector icon in the chat composer will show `b1` with three tools (`list_endpoints`, `describe_endpoint`, `api_call`).

#### Claude.ai (web) — Custom Connector

Claude.ai's "Add custom connector" feature requires OAuth, which the B1 MCP server does not support today. Use Claude Code or Claude Desktop instead.

### 3. Ask Claude something

Once connected, no special syntax is needed — Claude discovers what's available on the fly. Examples:

- *"How many people are in my church and what are the active groups?"*
- *"Summarize this month's donations by fund."*
- *"List the people who attended the 10am service last Sunday but haven't been to a Wednesday group in the last 60 days."*
- *"Draft a welcome email for the four people added this week, addressed by first name."*

Behind the scenes Claude will call the MCP tools — first to discover the right endpoint, then to fetch the data — and answer in plain language.

## How It Works

The B1 API exposes a single MCP endpoint at `/mcp`. Claude connects to it, authenticates with your `cak_…` key, and gets access to three tools:

| Tool | What it does |
|---|---|
| `list_endpoints` | Lists the REST endpoints Claude can call, filterable by path. Used for discovery. |
| `describe_endpoint` | Returns a short summary and an example request/response for a specific endpoint. |
| `api_call` | Actually invokes a REST endpoint as the authenticated user. |

This is the same `/membership/people`, `/giving/donations`, `/attendance/visits` etc. surface your B1Admin uses — every authorization rule applies identically.

## Safety and Limits

- **Per-church isolation.** The API key resolves to one church. Claude has no way to see other churches' data.
- **Permission-scoped.** If you remove a permission from the person who minted the key in B1Admin, Claude loses it on the next call — instantly.
- **Revocable.** Delete the key in **Settings → Developer → API Keys** and Claude's access ends immediately.
- **Blocklist.** Provider webhooks, OAuth client admin endpoints, and the operator-only `apiEmails` route are not callable via MCP.
- **Response size cap.** A single tool response is capped at 64 KB so long lists don't blow out Claude's context — Claude will narrow the query with filters when this happens.
- **Audit trail.** Mutations go through the same audit log as B1Admin actions; you can review them under **Reports → Audit Log**.

## Cost

ChurchApps is free and open-source — the MCP server is part of the API your church already runs. Anthropic charges for Claude usage per their plans. There is no per-call cost from ChurchApps.

## Troubleshooting

**Claude reports "Unauthorized" or 401:** the bearer token is missing, malformed, or the key has been revoked. Re-check the `Authorization: Bearer cak_…` header (note the space and the literal `Bearer`).

**A tool call returns 403:** the API key doesn't have the scope for that endpoint. Add the scope in **Settings → Developer → API Keys** (you'll need to create a new key — scopes can't be changed in place) and update Claude's config.

**Claude can't find an endpoint:** ask it to call `list_endpoints` with a filter, e.g. *"use list_endpoints with filter 'donations' to find the right path"*. The route inventory is generated from the live API, so anything you can hit with `curl` is there.

**Local development:** swap `https://api.churchapps.org/mcp` for `http://localhost:8084/mcp` — same auth, same tools.

## Related

- [API Keys](/docs/developer/api/api-keys) — full scope reference
- [MCP Server (developer reference)](/docs/developer/api/mcp) — protocol details and tool schemas
- [ChatGPT](./chatgpt) — same idea, for OpenAI's models
