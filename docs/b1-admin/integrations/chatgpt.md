---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Connect OpenAI's ChatGPT to your church's B1 data so you can ask questions like "who hasn't been in a group this quarter?" or "summarize giving for the building fund this month" and have ChatGPT pull the answers directly from B1. Two paths are supported: a **Custom GPT** that works on any ChatGPT Plus plan, and the **MCP server** for developer tooling that supports it.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- A church admin with the **Edit Settings** permission (to mint an API key)
- A **ChatGPT Plus, Pro, Team, or Enterprise** account (the free tier cannot use Custom GPTs or Connectors)
- The full URL of your B1 API — usually `https://api.churchapps.org` for hosted churches, or your self-hosted Api host

</div>

## Pick the Right Path

| Path | Plan needed | Effort | What you get |
|---|---|---|---|
| **Custom GPT with Actions** | ChatGPT Plus / Team / Enterprise | 10 minutes | A shareable GPT that calls B1's REST API for any teammate to use |
| **MCP via OpenAI tooling** | Developer / Agent SDK / Pro Connectors | More | Full discovery via the MCP server, suited to coding tools and agent platforms |

For most churches the **Custom GPT** path is the right answer — it requires no developer setup, works inside the regular ChatGPT app and mobile clients, and can be shared with your team. The MCP path is documented below for technical staff using OpenAI's developer tools or agent platforms.

## Path A — Custom GPT with Actions

This wires ChatGPT directly to the B1 REST API. Your Custom GPT will be able to read and (optionally) write B1 records on behalf of whoever uses it.

### 1. Create an API key

1. In B1Admin go to **Settings → Developer → API Keys**.
2. Click **New API Key**, name it `ChatGPT`, and pick scopes. Common starter sets:
   - **Read-only assistant:** `people:read`, `groups:read`, `attendance:read`, `donations:read`
   - **Read + write:** add the matching `:write` scopes
3. Save and copy the full `cak_…` key.

See [API Keys](/docs/developer/api/api-keys) for the full scope list.

### 2. Build the Custom GPT

1. In ChatGPT, click your profile → **My GPTs** → **Create a GPT**.
2. Switch to the **Configure** tab and give the GPT a name (e.g. "B1 Assistant") and instructions like:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Scroll to **Actions** → **Create new action** → **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** `cak_<prefix>.<secret>`
   - **Auth Type:** Bearer
   - Save.
4. In the **Schema** box, paste a minimal OpenAPI spec describing the endpoints you want the GPT to use. A starter that covers the most common reads:

   ```yaml
   openapi: 3.1.0
   info:
     title: B1 API
     version: "1.0"
   servers:
     - url: https://api.churchapps.org
   paths:
     /membership/people:
       get:
         operationId: listPeople
         summary: List people in the church
         parameters:
           - in: query
             name: firstName
             schema: { type: string }
           - in: query
             name: lastName
             schema: { type: string }
           - in: query
             name: email
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/people/{id}:
       get:
         operationId: getPerson
         summary: Get a single person by id
         parameters:
           - in: path
             name: id
             required: true
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/groups:
       get:
         operationId: listGroups
         summary: List groups in the church
         responses:
           "200":
             description: OK
     /giving/donations:
       get:
         operationId: listDonations
         summary: List donations
         parameters:
           - in: query
             name: personId
             schema: { type: string }
           - in: query
             name: startDate
             schema: { type: string, format: date }
           - in: query
             name: endDate
             schema: { type: string, format: date }
         responses:
           "200":
             description: OK
     /attendance/attendance:
       get:
         operationId: listAttendance
         summary: List attendance records
         parameters:
           - in: query
             name: serviceTimeId
             schema: { type: string }
           - in: query
             name: campusId
             schema: { type: string }
         responses:
           "200":
             description: OK
   ```

   Expand the schema with more endpoints as needed — every authenticated route in B1 accepts the same `cak_…` key. The [REST API reference](/docs/developer/api/endpoints) lists what's available.

5. Save the action. Test it with a prompt like *"how many people are in the church?"* — ChatGPT will call `listPeople` and answer.
6. **Publish** the GPT (Only me / Anyone with link / Organization) and share with your team.

### 3. Use it

Anyone you share the GPT with can ask natural-language questions — ChatGPT picks the right action, calls B1, and answers. The key's scopes still apply: a read-only key will refuse writes regardless of the action defined in the schema.

## Path B — MCP via OpenAI tooling

The B1 API includes an MCP server at `/mcp` that any MCP-aware OpenAI tool can use — for example the [OpenAI Agents SDK](https://platform.openai.com/docs/guides/agents), the Responses API's MCP tool, or third-party agent platforms that consume MCP servers.

Authenticate with the same `cak_…` key in the `Authorization: Bearer` header. Three tools are exposed: `list_endpoints`, `describe_endpoint`, and `api_call`. See the [MCP Server developer reference](/docs/developer/api/mcp) for the protocol, transport, and tool schemas.

ChatGPT's built-in "Connectors" (Pro/Business/Enterprise) currently expect MCP servers with specific `search` and `fetch` tool shapes and OAuth-based authentication, which the B1 MCP server does not advertise. For ChatGPT inside the consumer app, the Custom GPT path above is the practical choice.

## Safety and Limits

- **Per-church isolation.** The API key resolves to one church. ChatGPT cannot see other churches' data.
- **Permission-scoped.** If you remove a permission from the person who minted the key, ChatGPT loses it on the next call — instantly.
- **Revocable.** Delete the key in **Settings → Developer → API Keys** and ChatGPT's access ends immediately.
- **Sharing a Custom GPT shares the data.** Anyone with access to the GPT can ask it questions and see whatever the key has scopes for. Limit sharing to staff who should see that data, and prefer narrower scopes (e.g. omit `donations:read` for a GPT shared widely).
- **Audit trail.** Mutations go through the same audit log as B1Admin actions; review them under **Reports → Audit Log**.

## Cost

ChurchApps is free and open-source — the API your Custom GPT calls is part of the API your church already runs. OpenAI charges for ChatGPT usage per their plans. There is no per-call cost from ChurchApps.

## Troubleshooting

**Action returns 401:** the bearer header isn't set correctly. In the action's authentication panel make sure **Auth Type: Bearer** is selected and the key value does not include the word `Bearer` (ChatGPT prepends it for you).

**Action returns 403:** the key doesn't have the scope for that endpoint. Mint a new key with the right scopes and update the GPT.

**ChatGPT calls the wrong action:** tighten the `summary` and `description` fields in your OpenAPI schema so the model picks the right one. Adding example queries to the GPT's instructions also helps.

**The action panel rejects the schema:** ChatGPT requires OpenAPI 3.1 with at least one `paths` entry and a `servers` URL. Validate the YAML in any online OpenAPI validator before pasting.

**Local development:** point the action's `servers` URL at your local Api (e.g. `http://localhost:8084`) — but note ChatGPT's actions only call public URLs, so for local testing use a tunnel like `ngrok` or hit the API directly with `curl` to confirm the key first.

## Related

- [API Keys](/docs/developer/api/api-keys) — full scope reference
- [MCP Server (developer reference)](/docs/developer/api/mcp) — protocol details and tool schemas
- [Claude](./claude) — same idea, for Anthropic's models
- [REST API reference](/docs/developer/api/endpoints) — every endpoint a Custom GPT action can hit
