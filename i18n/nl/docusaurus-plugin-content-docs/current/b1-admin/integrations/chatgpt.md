---
title: "ChatGPT"
description: "Koppel ChatGPT met een API-sleutel aan je B1-kerkdata, zodat je in gewone taal vragen kunt stellen over mensen, giften en aanwezigheid in B1 Admin."
---

# ChatGPT

<div class="article-intro">

Verbind ChatGPT met de B1-gegevens van je kerk en stel vragen in gewone taal. Het antwoordt op basis van je actuele kerkgegevens. Je kunt het ook vragen om hulp bij taken die in B1 Admin meerdere stappen vergen.

**Voorbeelden van vragen:**
- *"Wie is vorige week geweest maar is nog niet aan een kleine groep toegewezen?"*
- *"Vat de gift van deze maand samen per fonds."*
- *"Wie zijn onze nieuwste leden, en hebben we contact met hen opgenomen?"*
- *"Ik snap niet hoe ik X in B1 doe. Kun je me stap voor stap uitleggen hoe?"*

</div>

<div class="prereqs">
<h4>Wat je nodig hebt</h4>

- **De ChatGPT-desktopapp** voor Mac of Windows
- **Een betaald ChatGPT-abonnement** (Plus of hoger). Gratis ChatGPT-accounts kunnen niet met B1 verbinden.
- **Je B1-inloggegevens** met toestemming om kerkinstellingen te beheren (nodig om een sleutel aan te maken). Heb je die niet? Vraag het aan de B1-beheerder van je kerk.

</div>

:::tip Aanbevolen: probeer eerst Claude, het is gratis
[Claude](./claude.md) werkt met B1 op het **gratis abonnement** en is in minder dan 3 minuten ingesteld. Voeg B1 gewoon toe als connector en log in met je B1-account. Er is geen sleutel nodig. Het is de eenvoudigste manier voor je kerk om AI met B1 uit te proberen voordat je ergens voor betaalt.
:::

## Instellen

De schermen kunnen er in jouw versie van ChatGPT iets anders uitzien.

---

**Stap 1: Maak je B1-sleutel aan**

De sleutel geeft ChatGPT toegang tot *jouw* kerk in B1. Zie hem als een wachtwoord dat alleen voor ChatGPT bedoeld is.

1. Log in bij [B1 Admin](https://admin.b1.church) en ga naar [Settings → Developer](https://admin.b1.church/settings/developer).
2. Klik op het tabblad **API Keys** op **New API Key** en geef de sleutel de naam `ChatGPT`.
3. **Scopes:** vink aan wat ChatGPT mag doen. Elk onderdeel heeft een vakje **read** (alleen bekijken) en een vakje **write** (wijzigingen aanbrengen). Weet je het niet zeker? Vink om te beginnen alleen de vakjes **read** aan.
4. Klik op **Save** en vervolgens op **Copy** om de sleutel te kopiëren. De sleutel begint met `cak_`. Hij wordt maar één keer getoond.

---

**Stap 2: Klik linksonder in ChatGPT op je naam**

![Klik op je profielnaam](/img/guides/chatgpt-mcp/01.png)

---

**Stap 3: Klik op Settings**

![Klik op Settings in het menu](/img/guides/chatgpt-mcp/02.png)

---

**Stap 4: Klik in de linkerzijbalk op Plugins**

![Klik op Plugins onder Integrations](/img/guides/chatgpt-mcp/03.png)

---

**Stap 5: Klik op het tabblad MCPs**

![Klik op het tabblad MCPs](/img/guides/chatgpt-mcp/04.png)

Hier zie je alle MCP-servers die je al hebt toegevoegd.

---

**Stap 6: Klik op Add → Add MCP server**

![Klik op Add en daarna op Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Stap 7: Vul het formulier in en klik op Save**

![Formulier om een aangepaste MCP-server te verbinden](/img/guides/chatgpt-mcp/07.png)

Klik op **Streamable HTTP** en vul vervolgens in:

| Veld | Wat je invult |
|---|---|
| **Name** | `B1 Church` (of een andere naam naar keuze) |
| **Type** | Klik op **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Laat leeg |
| **Headers** | Klik op **+ Add header** → Key: `Authorization` → Value: zie hieronder |

![Voorbeeld met Authorization in het veld Key en de Bearer-sleutel in het veld Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_jouwsleutel`. Dat is het woord Bearer, een spatie en daarna je sleutel.

Klik op **Save**.

Dat is alles! Ga terug naar een gesprek en stel een vraag zoals *"Hoeveel mensen horen bij onze kerk?"* ChatGPT haalt het antwoord dan direct uit B1.

---

## Is het veilig?

- ChatGPT kan alleen de gegevens van **je eigen kerk** zien.
- Het kan alleen doen wat je sleutel toestaat. Een sleutel met alleen de vakjes **read** aangevinkt kan wel bekijken, maar nooit iets wijzigen.
- Wil je het uitschakelen, verwijder dan de sleutel in B1 Admin onder **Settings → Developer**. De toegang stopt meteen.

## Wat kost het?

De B1-verbinding is gratis. Het is onderdeel van ChurchApps. Voor ChatGPT heb je een betaald abonnement nodig (Plus of hoger) om te verbinden. Zie de prijzen van OpenAI.

## Technische details

De rest van deze pagina is bedoeld voor technisch ervaren gebruikers en AI-assistenten. De MCP-server van B1 staat op `https://api.churchapps.org/mcp` (Streamable HTTP) en verwacht de API-sleutel als header `Authorization: Bearer cak_…`. Zie de [MCP Server-referentie voor ontwikkelaars](/docs/developer/api/mcp).

### Aangepaste GPT met Actions

Met een aangepaste GPT maak je een eigen assistent die je hele team kan gebruiken. Ze openen een link en kunnen meteen vragen stellen, zonder zelf iets in te stellen. Hiervoor heb je een ChatGPT Plus-, Team- of Enterprise-account nodig en ongeveer 10 minuten.

#### 1. Maak een API-sleutel aan

Volg stap 1 van Instellen hierboven als je dat nog niet hebt gedaan.

#### 2. Bouw de aangepaste GPT

1. Klik in ChatGPT op je profiel → **My GPTs** → **Create a GPT**.
2. Ga naar het tabblad **Configure**, geef de GPT een naam (bijvoorbeeld "B1 Assistant") en voeg instructies toe:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Scroll naar **Actions** → **Create new action** → **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** plak je `cak_…`-sleutel
   - **Auth Type:** Bearer
   - Sla op.

4. Plak in het vak **Schema** deze startspecificatie in OpenAPI:

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

5. Sla de actie op en test haar: *"Hoeveel mensen horen bij de kerk?"* ChatGPT roept dan `listPeople` aan en geeft antwoord.
6. **Publiceer** de GPT (Only me / Anyone with link / Organization) en deel de link met je team.

#### 3. Gebruik het

Iedereen met de link kan vragen in gewone taal stellen. De scopes van de sleutel blijven gelden. Een sleutel met alleen leesrechten weigert schrijfacties, wat het actieschema ook zegt.

---

### Veiligheid en beperkingen

- **Isolatie per kerk.** De API-sleutel hoort bij precies één kerk. ChatGPT kan de gegevens van andere kerken niet zien.
- **Beperkt tot rechten.** De sleutel bevat alleen de scopes die je hebt toegekend. Als je een scope verwijdert (door de sleutel te verwijderen en opnieuw aan te maken), vervalt die toegang bij de volgende aanroep.
- **Direct in te trekken.** Verwijder de sleutel onder **Settings → Developer → API Keys** en de toegang stopt meteen.
- **Een gedeelde aangepaste GPT deelt ook de gegevens.** Iedereen met toegang tot de GPT kan alles zien wat de scopes van de sleutel toestaan. Kies voor bredit gedeelde GPT's liever smallere scopes (bijvoorbeeld zonder `donations:read`).
- **Auditlogboek.** Wijzigingen die via ChatGPT worden gedaan, gaan door hetzelfde auditlogboek als acties in B1 Admin. Je vindt ze onder **Settings → Audit Log**.

### Probleemoplossing

**De MCP-connector meldt "Unauthorized" of toont een 401-fout:** je API-sleutel ontbreekt of is onjuist. Open de instellingen van de connector en controleer de header **Authorization**. De waarde moet bestaan uit het woord `Bearer`, één spatie en de volledige `cak_…`-sleutel, zonder extra spaties.

**ChatGPT zegt dat het bepaalde gegevens niet kan vinden:** de sleutel heeft mogelijk niet de juiste scopes. Maak een nieuwe sleutel aan onder **Settings → Developer → API Keys** met de extra scopes en werk de connector bij.

**Actie van de aangepaste GPT geeft 401:** controleer in het authenticatiepaneel van de actie of **Auth Type: Bearer** is geselecteerd en of de sleutel zelf het woord `Bearer` niet bevat (ChatGPT voegt dat automatisch toe).

**Actie van de aangepaste GPT geeft 403:** de sleutel heeft niet de scope voor dat endpoint. Maak een nieuwe sleutel met de juiste scopes aan en werk de GPT bij.

**Het actieschema wordt geweigerd:** ChatGPT vereist OpenAPI 3.1 met minstens één `paths`-item en een `servers`-URL. Controleer de YAML op [editor.swagger.io](https://editor.swagger.io) voordat je hem plakt.

## Gerelateerd

- [API Keys](/docs/developer/api/api-keys): volledig overzicht van scopes
- [MCP Server (referentie voor ontwikkelaars)](/docs/developer/api/mcp): protocoldetails en toolschema's
- [Claude](./claude.md): hetzelfde idee, voor de modellen van Anthropic
- [REST API-referentie](/docs/developer/api/endpoints): alle endpoints die een actie van een aangepaste GPT kan aanroepen
