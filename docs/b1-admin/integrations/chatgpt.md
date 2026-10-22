---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Connect ChatGPT to your church's B1 data and ask it questions in plain English — it answers from your live church records. You can also ask it to help with things that would take several steps in B1 Admin.

**Some things you can ask:**
- *"Show me everyone who attended last week but hasn't been assigned to a small group"*
- *"Summarize this month's giving by fund"*
- *"Who are our newest members and have we followed up with them?"*
- *"I can't figure out how to do X in B1 — can you walk me through it?"*

</div>

<div class="prereqs">
<h4>What You Need</h4>

- **The ChatGPT desktop app** for Mac or Windows
- **A paid ChatGPT plan** (Plus or higher). Free ChatGPT accounts can't connect to B1.
- **Your B1 login** with permission to manage church settings (needed to make a key). Don't have it? Ask your church's B1 administrator.

</div>

:::tip Recommended: try Claude first — it's free
[Claude](./claude) connects to B1 on its **free plan** and sets up in less than 3 minutes — just add B1 as a connector and sign in with your B1 account. No key needed. It's the easiest way for your church to try AI with B1 before paying for anything.
:::

## Set It Up

The screens may look slightly different in your version of ChatGPT.

---

**Step 1 — Make your B1 key**

The key is what lets ChatGPT into *your* church's B1 — think of it like a password just for ChatGPT.

1. Log in to [B1 Admin](https://admin.b1.church) and go to [Settings → Developer](https://admin.b1.church/settings/developer).
2. On the **API Keys** tab, click **New API Key** and name it `ChatGPT`.
3. **Scopes:** check what ChatGPT may do. Each area has a **read** box (look only) and a **write** box (make changes). Not sure? Check just the **read** boxes to start.
4. Click **Save**, then **Copy** the key (it starts with `cak_`). It's only shown once.

---

**Step 2 — Click your name in the bottom-left corner of ChatGPT**

![Click your profile name](/img/guides/chatgpt-mcp/01.png)

---

**Step 3 — Click Settings**

![Click Settings from the menu](/img/guides/chatgpt-mcp/02.png)

---

**Step 4 — Click Plugins in the left sidebar**

![Click Plugins under Integrations](/img/guides/chatgpt-mcp/03.png)

---

**Step 5 — Click the MCPs tab**

![Click the MCPs tab](/img/guides/chatgpt-mcp/04.png)

You'll see any MCP servers you've already added here.

---

**Step 6 — Click Add → Add MCP server**

![Click Add then Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Step 7 — Fill in the form and click Save**

![Connect to a custom MCP form](/img/guides/chatgpt-mcp/07.png)

Click **Streamable HTTP**, then fill in:

| Field | What to enter |
|---|---|
| **Name** | `B1 Church` (or any name you like) |
| **Type** | Click **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Leave blank |
| **Headers** | Click **+ Add header** → Key: `Authorization` → Value: see below |

![Filled in example showing Authorization in Key and Bearer key in Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_yourkey` — the word Bearer, a space, then your key

Click **Save**.

That's it! Go back to a chat and ask something like *"How many people are in our church?"* and ChatGPT will pull the answer straight from B1.

---

## Is It Safe?

- ChatGPT can only see **your church's** data.
- It can only do what your key allows — a key with only **read** boxes checked can look but never change anything.
- To turn it off, delete the key in B1 Admin under **Settings → Developer**. Access stops right away.

## What Does It Cost?

The B1 connection is free — it's part of ChurchApps. ChatGPT needs a paid plan (Plus or higher) to connect; see OpenAI's pricing.

## Technical Details

The rest of this page is for technical users and AI assistants. B1's MCP server is at `https://api.churchapps.org/mcp` (Streamable HTTP) and takes the API key as an `Authorization: Bearer cak_…` header. See the [MCP Server developer reference](/docs/developer/api/mcp).

### Custom GPT with Actions

A Custom GPT lets you create a dedicated assistant your whole team can share — they open a link and start asking questions without any setup on their end. It requires a ChatGPT Plus, Team, or Enterprise account and about 10 minutes.

#### 1. Create an API key

Follow Step 1 of Set It Up above if you haven't already.

#### 2. Build the Custom GPT

1. In ChatGPT, click your profile → **My GPTs** → **Create a GPT**.
2. Switch to the **Configure** tab, give the GPT a name (e.g. "B1 Assistant") and add instructions:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Scroll to **Actions** → **Create new action** → **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** paste your `cak_…` key
   - **Auth Type:** Bearer
   - Save.

4. In the **Schema** box, paste this starter OpenAPI spec:

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

5. Save the action. Test it: *"how many people are in the church?"* — ChatGPT calls `listPeople` and answers.
6. **Publish** the GPT (Only me / Anyone with link / Organization) and share the link with your team.

#### 3. Use it

Anyone with the link can ask natural-language questions. The key's scopes still apply — a read-only key refuses writes regardless of what the action schema says.

---

### Safety and limits

- **Per-church isolation.** The API key resolves to one church only. ChatGPT cannot see other churches' data.
- **Permission-scoped.** The key only carries the scopes you granted. Removing a scope (by deleting and recreating the key) cuts that access on the next call.
- **Revocable instantly.** Delete the key in **Settings → Developer → API Keys** and access ends immediately.
- **Sharing a Custom GPT shares the data.** Everyone with access to the GPT can see whatever the key's scopes allow. Prefer narrower scopes (e.g. omit `donations:read`) for GPTs shared broadly.
- **Audit trail.** Any changes made through ChatGPT go through the same audit log as B1 Admin actions — find them under **Settings → Audit Log**.

### Troubleshooting

**The MCP connector says "Unauthorized" or shows a 401 error:** your API key is missing or incorrect. Open the connector settings and check the **Authorization** header: the value should be the word `Bearer`, one space, then the full `cak_…` key with no extra spaces.

**ChatGPT says it can't find certain data:** the key may not have the right scopes. Create a new key in **Settings → Developer → API Keys** with the additional scopes and update the connector.

**Custom GPT action returns 401:** in the action's authentication panel confirm **Auth Type: Bearer** is selected and the key does not include the word `Bearer` (ChatGPT adds it automatically).

**Custom GPT action returns 403:** the key doesn't have the scope for that endpoint. Create a new key with the correct scopes and update the GPT.

**The action schema is rejected:** ChatGPT requires OpenAPI 3.1 with at least one `paths` entry and a `servers` URL. Validate the YAML at [editor.swagger.io](https://editor.swagger.io) before pasting.

## Related

- [API Keys](/docs/developer/api/api-keys) — full scope reference
- [MCP Server (developer reference)](/docs/developer/api/mcp) — protocol details and tool schemas
- [Claude](./claude) — same idea, for Anthropic's models
- [REST API reference](/docs/developer/api/endpoints) — every endpoint a Custom GPT action can call
