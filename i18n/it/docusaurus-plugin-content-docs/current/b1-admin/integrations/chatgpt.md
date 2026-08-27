---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Connect OpenAI's ChatGPT Per your church's B1 data and let it do the heavy lifting. Once connected, ChatGPT can see your live church records and help you get things done that would otherwise take several steps in B1 Admin — or that you couldn't figure out how Per do at all.

**Some things you can ask it Per do:**
- *"Set up Sunday School classrooms and put each teacher in the right Stanza based on their Gruppo"*
- *"Show me everyone who attended last week but hasn't been assigned Per a small Gruppo"*
- *"Summarize this Mese's giving by fund"*
- *"Who are our newest Membri and have we followed up with them?"*
- *"I can't figure out how Per do X in B1 — can you walk me through it or do it for me?"*

ChatGPT pulls the answers and takes the actions directly from your B1 data, scoped Per your church only.

:::tip Recommended: Claude Code
For the smoothest MCP experience, [Claude Code](./claude) is the recommended client — Configurazione takes one command and it works out of the box. ChatGPT also works and is a great choice if your team is already using it.
:::

Two paths are supported: the **MCP Connector** (built into ChatGPT) and a **Custom GPT** for teams that want a shareable assistant.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- A church admin with the **Modifica Impostazioni** Permesso in B1 Admin (needed Per Crea an API key)
- A **ChatGPT Plus, Pro, Team, or Enterprise** Account

</div>

## Quick Configurazione Guide

Segui questi passaggi in the **ChatGPT desktop app** (Mac/Windows). The screens may look slightly different in other versions.

---

**Step 1 — Get your API key from B1 Admin first**

Before touching ChatGPT, Crea an API key in B1 Admin so you have it ready Per paste:

1. Go Per **Impostazioni → Developer → API Keys** in B1 Admin
2. Fai clic **New API Key**, name it `ChatGPT`, Scegli your scopes (start with `people:read`, `Gruppi:read`, `Frequenza:read`, `donations:read`), and Fai clic **Salva**
3. Copy the `cak_…` key — it's only shown once

---

**Step 2 — Fai clic your name in the bottom-left corner of ChatGPT**

![Click your profile name](/img/guides/chatgpt-mcp/01.png)

---

**Step 3 — Fai clic Impostazioni**

![Click Settings from the menu](/img/guides/chatgpt-mcp/02.png)

---

**Step 4 — Fai clic Plugins in the left sidebar**

![Click Plugins under Integrations](/img/guides/chatgpt-mcp/03.png)

---

**Step 5 — Fai clic the MCPs tab**

![Click the MCPs tab](/img/guides/chatgpt-mcp/04.png)

You'll see any MCP servers you've already added here.

---

**Step 6 — Fai clic Aggiungi → Aggiungi MCP server**

![Click Add then Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Step 7 — Fill in the form and Fai clic Salva**

![Connect to a custom MCP form](/img/guides/chatgpt-mcp/07.png)

Fai clic **Streamable HTTP**, then fill in:

| Field | What Per Inserisci |
|---|---|
| **Name** | `B1 Church` (or any name you like) |
| **Digita** | Fai clic **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Leave blank |
| **Headers** | Fai clic **+ Aggiungi header** → Key: `Authorization` → Value: see below |

![Filled in example showing Authorization in Key and Bearer key in Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_yourkey` — the word Bearer, a space, then your key

Fai clic **Salva**.

That's it! Go Indietro Per a chat and ask something like *"How many people are in our church?"* and ChatGPT will pull the answer straight from B1.

---

## Step 1 — Crea an API Key in B1 Admin

Every connection Per B1 uses an API key that you Crea. This key identifies your church, controls what ChatGPT can see, and can be revoked any Ora.

1. Apri **B1 Admin** and go Per **Impostazioni → Developer → API Keys**.
2. Fai clic **New API Key**.
3. Give the key a name — `ChatGPT` works well.
4. Seleziona the scopes (Permessi) ChatGPT should have. A good starting set for a read-only assistant:
   - `people:read`
   - `Gruppi:read`
   - `Frequenza:read`
   - `donations:read`
5. Fai clic **Salva**.
6. Copy the full key that appears — it starts with `cak_` and is shown **one Ora only**. Paste it somewhere safe.

:::tip
If you ever need Per revoke ChatGPT's access, go Indietro Per **Impostazioni → Developer → API Keys** and Elimina the key. Access ends immediately.
:::

---

## Path A — ChatGPT MCP Connector (Recommended)

This is the simplest way Per connect. ChatGPT has a built-in "Connect Per a custom MCP" dialog that works directly with B1's MCP server — No Custom GPT Obbligatorio.

### What you need

- Your `cak_…` key from Step 1

### Apri the MCP connector in ChatGPT

In ChatGPT, go Per **Impostazioni → Plugins → MCPs** and Fai clic **Aggiungi → Aggiungi MCP server**.

### Fill in the dialog

Fai clic **Streamable HTTP**, then use these values:

| Field | Value |
|---|---|
| **Name** | `B1 Church` (or any name you like) |
| **Digita** | **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Leave blank |
| **Headers** | Key: `Authorization` / Value: `Bearer cak_yourprefix.yoursecret` |

For the Value field, Digita the word `Bearer`, one space, then paste your key — all in the same box. Example: `Bearer cak_prefix.secret`.

Fai clic **Salva**.

### Ask ChatGPT something

Once connected, just ask in plain language — No special commands needed:

- *"How many people are in our church?"*
- *"Who joined in the last 30 days?"*
- *"What Gruppi are Attivo right now?"*
- *"Summarize this Mese's giving by fund."*

ChatGPT will call B1 behind the scenes and answer from your live data.

---

## Path B — Custom GPT with Actions

A Custom GPT lets you Crea a dedicated assistant your whole team can share — they Apri a link and start asking questions without any Configurazione on their end. It requires a ChatGPT Plus, Team, or Enterprise Account and about 10 minutes.

### 1. Crea an API key

Follow Step 1 above if you haven't already.

### 2. Build the Custom GPT

1. In ChatGPT, Fai clic your Profilo → **My GPTs** → **Crea a GPT**.
2. Switch Per the **Configure** tab, give the GPT a name (e.g. "B1 Assistant") and Aggiungi instructions:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Scroll Per **Actions** → **Crea new action** → **Authentication**.
   - **Authentication Digita:** API Key
   - **API Key:** paste your `cak_…` key
   - **Auth Digita:** Bearer
   - Salva.

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

5. Salva the action. Test it: *"how many people are in the church?"* — ChatGPT calls `listPeople` and answers.
6. **Publish** the GPT (Only me / Anyone with link / Organization) and share the link with your team.

### 3. Use it

Anyone with the link can ask natural-language questions. The key's scopes still apply — a read-only key refuses writes regardless of what the action schema says.

---

## Safety and Limits

- **Per-church isolation.** The API key resolves Per one church only. ChatGPT cannot see other churches' data.
- **Permesso-scoped.** The key only carries the scopes you granted. Removing a scope (by deleting and recreating the key) cuts that access on the Avanti call.
- **Revocable instantly.** Elimina the key in **Impostazioni → Developer → API Keys** and access ends immediately.
- **Sharing a Custom GPT shares the data.** Everyone with access Per the GPT can see whatever the key's scopes allow. Prefer narrower scopes (e.g. omit `donations:read`) for GPTs shared broadly.
- **Audit trail.** Any changes made through ChatGPT go through the same audit log as B1 Admin actions — Trova them under **Rapporti → Audit Log**.

## Cost

ChurchApps is free and Apri-source — the API ChatGPT calls is part of what your church already runs. OpenAI charges for ChatGPT usage per their own plans. There is No per-call cost from ChurchApps.

## Troubleshooting

**The MCP connector says "Unauthorized" or shows a 401 error:** your API key is missing or incorrect. Apri the connector Impostazioni and check that the key in the `Authorization:Bearer` argument is the full `cak_…` value with No extra spaces.

**ChatGPT says it can't Trova certain data:** the key may not have the right scopes. Crea a new key in **Impostazioni → Developer → API Keys** with the additional scopes and update the connector.

**The `npx` command fails:** Node.js may not be installed. Scarica and install it from [nodejs.org](https://nodejs.org), then try saving the connector again.

**Custom GPT action returns 401:** in the action's authentication panel confirm **Auth Digita: Bearer** is selected and the key does not include the word `Bearer` (ChatGPT adds it automatically).

**Custom GPT action returns 403:** the key doesn't have the scope for that endpoint. Crea a new key with the correct scopes and update the GPT.

**The action schema is rejected:** ChatGPT requires OpenAPI 3.1 with at least one `paths` entry and a `servers` URL. Validate the YAML at [editor.swagger.io](https://editor.swagger.io) before pasting.

## Related

- [API Keys](/docs/developer/api/api-keys) — full scope reference
- [MCP Server (developer reference)](/docs/developer/api/mcp) — protocol details and tool schemas
- [Claude](./claude) — same idea, for Anthropic's models
- [REST API reference](/docs/developer/api/endpoints) — every endpoint a Custom GPT action can call
