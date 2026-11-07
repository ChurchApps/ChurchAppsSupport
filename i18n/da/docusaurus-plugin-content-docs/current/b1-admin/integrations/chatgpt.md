---
title: "ChatGPT"
description: "Forbind ChatGPT til din kirkes B1-data med en API-nøgle, så du kan stille spørgsmål i almindeligt sprog om personer, gaver og fremmøde i B1 Admin."
---

# ChatGPT

<div class="article-intro">

Forbind ChatGPT til din kirkes B1-data, og stil spørgsmål til det på almindeligt dansk — det svarer ud fra dine levende kirkeoplysninger. Du kan også bede det om hjælp til opgaver, der ellers ville kræve flere trin i B1 Admin.

**Nogle ting du kan spørge om:**
- *"Vis mig alle, der deltog i sidste uge, men som ikke er tilmeldt en smågruppe"*
- *"Opsummér denne måneds gaver fordelt på fond"*
- *"Hvem er vores nyeste medlemmer, og har vi fulgt op på dem?"*
- *"Jeg kan ikke finde ud af, hvordan jeg gør X i B1 — kan du vise mig trin for trin?"*

</div>

<div class="prereqs">
<h4>Det skal du bruge</h4>

- **ChatGPT-desktopappen** til Mac eller Windows
- **Et betalt ChatGPT-abonnement** (Plus eller højere). Gratis ChatGPT-konti kan ikke forbindes til B1.
- **Dit B1-login** med tilladelse til at administrere kirkeindstillinger (nødvendigt for at oprette en nøgle). Har du ikke den, så spørg din kirkes B1-administrator.

</div>

:::tip Anbefalet: prøv Claude først — det er gratis
[Claude](./claude.md) forbinder til B1 på sin **gratis plan** og er klar på under 3 minutter — tilføj blot B1 som en connector og log ind med din B1-konto. Ingen nøgle er nødvendig. Det er den nemmeste måde for din kirke at prøve AI sammen med B1, før I betaler for noget.
:::

## Sådan konfigurerer du det

Skærmbillederne kan se lidt anderledes ud i din version af ChatGPT.

---

**Trin 1 — Opret din B1-nøgle**

Nøglen er det, der giver ChatGPT adgang til *din* kirkes B1 — tænk på den som en adgangskode, der kun er til ChatGPT.

1. Log ind på [B1 Admin](https://admin.b1.church) og gå til [Indstillinger → Udvikler](https://admin.b1.church/settings/developer).
2. Under fanen **API Keys** klikker du på **New API Key** og giver den navnet `ChatGPT`.
3. **Scopes:** Markér, hvad ChatGPT må gøre. Hvert område har en **read**-boks (kun se) og en **write**-boks (foretage ændringer). Er du i tvivl, så markér kun **read**-boksene til at starte med.
4. Klik på **Save**, og derefter på **Copy** for at kopiere nøglen (den starter med `cak_`). Den vises kun én gang.

---

**Trin 2 — Klik på dit navn i nederste venstre hjørne af ChatGPT**

![Klik på dit profilnavn](/img/guides/chatgpt-mcp/01.png)

---

**Trin 3 — Klik på Settings**

![Klik på Settings i menuen](/img/guides/chatgpt-mcp/02.png)

---

**Trin 4 — Klik på Plugins i venstre sidebjælke**

![Klik på Plugins under Integrations](/img/guides/chatgpt-mcp/03.png)

---

**Trin 5 — Klik på fanen MCPs**

![Klik på fanen MCPs](/img/guides/chatgpt-mcp/04.png)

Her ser du eventuelle MCP-servere, du allerede har tilføjet.

---

**Trin 6 — Klik på Add → Add MCP server**

![Klik på Add og derefter Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Trin 7 — Udfyld formularen og klik på Save**

![Formular til forbindelse med en brugerdefineret MCP](/img/guides/chatgpt-mcp/07.png)

Klik på **Streamable HTTP**, og udfyld derefter:

| Felt | Hvad du skal indtaste |
|---|---|
| **Name** | `B1 Church` (eller et andet navn du foretrækker) |
| **Type** | Klik på **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Lad feltet være tomt |
| **Headers** | Klik på **+ Add header** → Key: `Authorization` → Value: se nedenfor |

![Eksempel på udfyldt formular med Authorization i Key og Bearer-nøglen i Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_dinnøgle` — ordet Bearer, et mellemrum og din nøgle

Klik på **Save**.

Så er du klar! Gå tilbage til en chat og spørg noget som *"Hvor mange mennesker er der i vores kirke?"*, så henter ChatGPT svaret direkte fra B1.

---

## Er det sikkert?

- ChatGPT kan kun se **din kirkes** data.
- Det kan kun gøre det, din nøgle tillader — en nøgle med kun **read**-bokse markeret kan kigge, men aldrig ændre noget.
- Vil du slukke for det, så slet nøglen i B1 Admin under **Indstillinger → Udvikler**. Adgangen stopper med det samme.

## Hvad koster det?

B1-forbindelsen er gratis — den er en del af ChurchApps. ChatGPT kræver et betalt abonnement (Plus eller højere) for at forbinde; se OpenAI's priser.

## Tekniske detaljer

Resten af denne side er til tekniske brugere og AI-assistenter. B1's MCP-server findes på `https://api.churchapps.org/mcp` (Streamable HTTP) og tager API-nøglen som en `Authorization: Bearer cak_…`-header. Se [MCP Server-referencen for udviklere](/docs/developer/api/mcp).

### Custom GPT med Actions

En Custom GPT giver dig en dedikeret assistent, dit hele team kan dele — de åbner et link og begynder at stille spørgsmål uden nogen opsætning. Det kræver en ChatGPT Plus-, Team- eller Enterprise-konto og cirka 10 minutter.

#### 1. Opret en API-nøgle

Følg Trin 1 under Sådan konfigurerer du det ovenfor, hvis du ikke allerede har gjort det.

#### 2. Byg den Custom GPT

1. I ChatGPT klikker du på din profil → **My GPTs** → **Create a GPT**.
2. Skift til fanen **Configure**, giv GPT'en et navn (f.eks. "B1 Assistant") og tilføj instruktioner:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Scroll ned til **Actions** → **Create new action** → **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** indsæt din `cak_…`-nøgle
   - **Auth Type:** Bearer
   - Gem.

4. Indsæt denne startspecifikation i OpenAPI-feltet **Schema**:

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

5. Gem action'en. Test den: *"hvor mange mennesker er der i kirken?"* — ChatGPT kalder `listPeople` og svarer.
6. **Publicér** GPT'en (Only me / Anyone with link / Organization) og del linket med dit team.

#### 3. Brug den

Alle med linket kan stille spørgsmål i almindeligt sprog. Nøglens scopes gælder stadig — en skrivebeskyttet nøgle afviser ændringer, uanset hvad action-skemaet siger.

---

### Sikkerhed og begrænsninger

- **Isolation pr. kirke.** API-nøglen er knyttet til præcis én kirke. ChatGPT kan ikke se andre kirkers data.
- **Tilladelsesstyret.** Nøglen bærer kun de scopes, du har givet den. Fjernes et scope (ved at slette og oprette nøglen igen), stopper adgangen ved det næste kald.
- **Kan tilbagekaldes øjeblikkeligt.** Slet nøglen under **Indstillinger → Udvikler → API Keys**, og adgangen ophører med det samme.
- **Deling af en Custom GPT deler data.** Alle med adgang til GPT'en kan se det, nøglens scopes tillader. Vælg hellere smallere scopes (f.eks. udelad `donations:read`) til GPT'er, der deles bredt.
- **Revisionsspor.** Ændringer foretaget via ChatGPT går gennem det samme auditlog som handlinger i B1 Admin — find dem under **Indstillinger → Audit Log**.

### Fejlfinding

**MCP-connectoren siger "Unauthorized" eller viser en 401-fejl:** Din API-nøgle mangler eller er forkert. Åbn connector-indstillingerne og kontroller **Authorization**-headeren: værdien skal være ordet `Bearer`, et mellemrum, og derefter hele `cak_…`-nøglen uden ekstra mellemrum.

**ChatGPT siger, at den ikke kan finde visse data:** Nøglen mangler muligvis de rette scopes. Opret en ny nøgle under **Indstillinger → Udvikler → API Keys** med de ekstra scopes, og opdatér connectoren.

**Custom GPT-action returnerer 401:** Bekræft i action'ens authentication-panel, at **Auth Type: Bearer** er valgt, og at nøglen ikke selv indeholder ordet `Bearer` (ChatGPT tilføjer det automatisk).

**Custom GPT-action returnerer 403:** Nøglen har ikke scope til det endpoint. Opret en ny nøgle med de rigtige scopes, og opdatér GPT'en.

**Action-skemaet afvises:** ChatGPT kræver OpenAPI 3.1 med mindst én `paths`-post og en `servers`-URL. Valider YAML'en på [editor.swagger.io](https://editor.swagger.io), før du indsætter den.

## Relateret

- [API Keys](/docs/developer/api/api-keys) — fuld scope-reference
- [MCP Server (udviklerreference)](/docs/developer/api/mcp) — protokoldetaljer og værktøjsskemaer
- [Claude](./claude.md) — samme idé, til Anthropics modeller
- [REST API-reference](/docs/developer/api/endpoints) — alle endpoints, en Custom GPT-action kan kalde
