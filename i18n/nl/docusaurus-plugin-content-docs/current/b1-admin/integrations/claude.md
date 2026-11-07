---
title: "Claude"
---

# Claude

<div class="article-intro">

Stel Claude in gewone taal een vraag over je kerk en het antwoordt op basis van je B1-gegevens, inclusief je FreePlay-lessen en klaslokalen. Vragen als *"hoeveel eerste bezoekers kwamen er op zondag?"* of *"wie heeft deze maand een kleine groep gekozen?"* werken, net als opdrachten zoals *"voeg een nieuwe pagina toe aan onze website met de naam Evenementen."* Instellen duurt minder dan 3 minuten en je hebt geen technische vaardigheden of software nodig om het te installeren.

</div>

<div class="prereqs">
<h4>Wat je nodig hebt</h4>

- **Een Claude-account.** Het **gratis abonnement werkt**. Dat is een goede manier om het uit te proberen. Gratis accounts hebben wel een dagelijkse berichtenlimiet, en het opzoeken van gegevens in B1 gebruikt snel berichten. Als je het regelmatig gebruikt, raden we daarom **Claude Pro** aan (ongeveer $20 per maand).
- **Je B1-inloggegevens**, dezelfde die je gebruikt voor B1 Admin.

</div>

:::tip Aanbevolen: gratis uit te proberen
Claude is de eenvoudigste manier om B1 met AI te verbinden, en het werkt met Claude's **gratis abonnement**. Dat is een ideale manier voor je kerk om het uit te proberen voordat je ergens voor betaalt.
:::

Er zijn twee manieren om te verbinden. **Optie 1 is het eenvoudigst**. Je hebt geen sleutel nodig en hoeft niets te installeren.

## Optie 1: Inloggen met B1 (eenvoudigst)

Werkt op de Claude-website, in de Claude-desktopapp en in de Claude-app voor je telefoon. Stel het één keer in en het werkt op alle drie.

### Stap 1: Open de connectorinstellingen van Claude

1. Ga naar [claude.ai](https://claude.ai) en log in (of maak een gratis account aan).
2. Klik linksonder op je naam en kies vervolgens **Settings** → **Connectors**.

### Stap 2: Voeg B1 toe

1. Klik op **Add** en vervolgens op **Add custom connector**.
2. **Name:** typ `B1`.
3. **URL:** plak `https://api.churchapps.org/mcp`
4. Laat de overige opties ongewijzigd en klik op **Add**.

### Stap 3: Log in bij B1

1. Klik op **Connect**. Er opent een B1-inlogpagina.
2. Log in met je B1-account. Als je bij meer dan één kerk hoort, controleer dan of bovenaan de juiste kerk wordt getoond.
3. B1 laat zien wat Claude wil doen en bevestigt dat je terugkeert naar **claude.ai**. Klik op **Allow**.

Je bent weer in Claude en B1 wordt als verbonden weergegeven.

### Stap 4: Stel een vraag

Start een **nieuw gesprek** en probeer bijvoorbeeld:

- *"Hoeveel mensen horen bij onze kerk?"*
- *"Geef een overzicht van onze actieve groepen."*
- *"Vat de giften van deze maand samen per fonds."*
- *"Wie is de afgelopen 30 dagen lid geworden van de kerk?"*

De eerste keer vraagt Claude om toestemming om B1 te gebruiken. Klik dan op **Allow**.

## Optie 2: Desktopextensie met een B1-sleutel

Gebruik deze optie als je Claude liever een sleutel met beperkte rechten geeft, bijvoorbeeld alleen-lezen. Het werkt in de Claude-desktopapp voor Mac of Windows. Om een sleutel aan te maken heb je het recht nodig om kerkinstellingen in B1 te beheren.

### Stap 1: Haal de Claude-app op

Download de Claude-app via [claude.com/download](https://claude.com/download), installeer die, open hem en log in.

### Stap 2: Maak je B1-sleutel

De sleutel geeft Claude toegang tot de B1 van *jouw* kerk. Zie hem als een wachtwoord dat alleen voor Claude bedoeld is.

1. Log in op [B1 Admin](https://admin.b1.church) en ga naar [Settings → Developer](https://admin.b1.church/settings/developer).
2. Klik op het tabblad **API Keys** op **New API Key**.
3. **Name:** typ `Claude`.
4. **Scopes:** vink aan wat Claude mag doen. Elk onderdeel heeft een vakje **read** (alleen kijken) en een vakje **write** (wijzigingen maken). Weet je het niet zeker? Vink dan alleen de vakjes **read** aan om te beginnen. Later kun je altijd een nieuwe sleutel met meer rechten maken.
5. Klik op **Save** en vervolgens op **Copy** om de sleutel te kopiëren. Hij wordt maar één keer getoond, dus ga direct naar stap 3.

### Stap 3: Voeg B1 toe aan Claude

1. [Download de B1-extensie](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Dubbelklik** op het gedownloade bestand (`b1-churchapps.mcpb`). Claude opent zich en toont **B1 (ChurchApps)**.
3. Klik op **Install**.
4. Wanneer om je **B1-API-sleutel** wordt gevraagd, plak je de sleutel uit stap 2 en sla je op.
5. **Sluit Claude volledig af** (Mac: **Cmd+Q** · Windows: klik met de rechtermuisknop op het Claude-pictogram in de taakbalk → **Quit**) en open het weer.

Als dubbelklikken Claude niet opent, ga dan in Claude naar **Settings → Extensions → Advanced settings → Install Extension…** en kies het gedownloade bestand. Start daarna een nieuw gesprek en stel een vraag.

:::tip Extensie al geïnstalleerd?
Je hoeft niets te doen. FreePlay werkt via dezelfde verbinding. De enige uitzondering is versie 1.1.0, die om een B1-e-mailadres en wachtwoord vroeg. Installeer de extensie dan opnieuw om deze bij te werken. Je sleutel blijft behouden.
:::

## Is dit veilig?

- Claude kan alleen de gegevens van **je eigen kerk** zien.
- **Ingelogd (optie 1):** Claude kan nooit meer doen dan je eigen B1-inlog kan. De B1-inlogpagina toont alles wat Claude mag doen voordat je op **Allow** klikt.
- **Met een sleutel (optie 2):** Claude kan alleen doen wat de sleutel in B1 toestaat. Een sleutel met alleen **read**-vakjes aangevinkt kan kijken, maar nooit iets wijzigen. FreePlay werkt op dezelfde manier, met dezelfde sleutel.
- **Uitschakelen:** ga in B1 Admin naar **Settings → Developer** en trek de app in onder **Connected Apps** (optie 1), of verwijder de sleutel onder **API Keys** (optie 2). De toegang stopt direct. Je kunt ook op **Disconnect** klikken bij de B1-connector in Claude.

## Wat kost het?

De B1-verbinding is gratis. Het hoort bij ChurchApps. Claude zelf heeft een gratis abonnement. Met Claude Pro (ongeveer $20 per maand) kun je er veel meer mee doen. Zie [claude.com/pricing](https://claude.com/pricing).

## Technische details

De rest van deze pagina is bedoeld voor technische gebruikers en AI-assistenten: scopes, andere manieren om te verbinden en hoe het werkt.

### Scopes

Claude communiceert met B1 via de **Model Context Protocol (MCP)-server** die in de B1-API is ingebouwd (`https://api.churchapps.org/mcp`). Elke aanroep loopt via dezelfde authenticatie-, rechten- en kerkregels als een verzoek vanuit B1 Admin. Claude is beperkt tot de **rechten en scopes** van de API-sleutel en kan geen webhooks, OAuth-beheereindpunten of andere paden die alleen voor beheerders zijn bereiken.

Veelgebruikte startset van scopes:

- **Alleen-lezen assistent:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Lezen + notities/taken toevoegen:** voeg `people:write` toe
- **Volledige operationele assistent:** voeg de bijbehorende `:write`-scopes toe die je wilt

Met een sleutel met `donations:read` kan Claude giften samenvatten, maar er geen gift registreren. Met een sleutel met `people:write` kan Claude een persoon toevoegen, maar geen giften zien. Zie [API Keys](/docs/developer/api/api-keys) voor wat elke scope toestaat.

### Andere manieren om te verbinden

#### Claude Code (CLI)

Voer dit in een terminal uit:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Dat is alles. Typ in een Claude Code-sessie `/mcp` om te controleren of de `b1`-server is verbonden, en stel daarna Claude elke vraag over je kerk.

#### Claude Desktop: handmatige configuratie (gevorderd)

Als je de extensie liever niet gebruikt, pas dan het configuratiebestand van Claude Desktop aan:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Voeg een `b1`-serverregel toe die via `mcp-remote` met B1 verbindt (vereist [Node.js](https://nodejs.org)):

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

Start Claude Desktop opnieuw. In het connectorenmenu van het chatveld wordt `b1` met de bijbehorende tools getoond.

#### Claude.ai (web): aangepaste connector

Zie **Optie 1** hierboven. De connector gebruikt OAuth 2.1: Claude vindt de autorisatieserver van B1 via `https://api.churchapps.org/.well-known/oauth-protected-resource`, registreert zichzelf met Dynamic Client Registration en logt in met PKCE. Bij Team- en Enterprise-abonnementen moet een eigenaar de connector mogelijk eerst voor de organisatie toevoegen. Claude vraagt geen specifieke scopes aan. De toestemmingspagina biedt daarom alles aan wat het ingelogde B1-account kan openen. Trek de toegang in via **Settings → Developer → Connected Apps** in B1 Admin.

### Hoe het werkt

De B1-API biedt één MCP-eindpunt op `/mcp`. Claude verbindt ermee, authenticeert met je `cak_…`-sleutel en krijgt toegang tot vier tools:

| Tool | Wat het doet |
|---|---|
| `list_endpoints` | Toont de REST-eindpunten die Claude kan aanroepen, te filteren op pad. Wordt gebruikt om ze te ontdekken. |
| `describe_endpoint` | Geeft een korte samenvatting en een voorbeeld van verzoek en antwoord voor een specifiek eindpunt. |
| `api_call` | Roept een REST-eindpunt daadwerkelijk aan als de geauthenticeerde gebruiker. |
| `describe_page_builder` | Een gids voor het bouwen en bewerken van de pagina's van je kerkwebsite. Claude leest deze voordat het aan websiteinhoud werkt. |

Dit is dezelfde `/membership/people`, `/giving/donations`, `/attendance/visits` enzovoort die je B1Admin gebruikt. Alle autorisatieregels gelden hetzelfde. FreePlay-eindpunten (lessons.church) staan onder `/lessons/*`. Claude's aanroepen daarnaar worden doorgestuurd naar FreePlay als dezelfde gebruiker, met dezelfde rechten.

### Veiligheid en beperkingen

- **Isolatie per kerk.** De API-sleutel hoort bij één kerk. Claude kan de gegevens van andere kerken niet zien.
- **Gebonden aan rechten.** Als je een recht weghaalt van de persoon die de sleutel heeft aangemaakt in B1Admin, verliest Claude dat recht bij de volgende aanroep, direct.
- **Intrekbaar.** Verwijder de sleutel onder **Settings → Developer → API Keys** en de toegang van Claude eindigt direct.
- **Blokkeerlijst.** Webhooks van providers, beheereindpunten van OAuth-clients en de route `apiEmails` die alleen voor beheerders is, kunnen niet via MCP worden aangeroepen.
- **Limiet op responsgrootte.** Eén toolresponse is beperkt tot 64 KB, zodat lange lijsten Claudes context niet vullen. Claude beperkt de zoekopdracht dan met filters.
- **Auditlogboek.** Wijzigingen lopen via hetzelfde auditlogboek als acties in B1Admin. Je kunt ze bekijken onder **Settings → Audit Log**.

### Problemen oplossen

**Claude vraagt om een B1-e-mailadres en wachtwoord om FreePlay te gebruiken:** je hebt versie 1.1.0 van de desktopextensie. Installeer deze opnieuw om bij te werken. Nieuwere versies gebruiken alleen je sleutel.

**Claude meldt "Unauthorized" of 401:** het bearer-token ontbreekt, is onjuist opgemaakt, of de sleutel is ingetrokken. Als je de extensie gebruikt, open dan in Claude **Settings → Extensions → B1 (ChurchApps)** en plak de sleutel opnieuw. Controleer anders de header `Authorization: Bearer cak_…` (let op de spatie en het letterlijke woord `Bearer`).

**Een toolaanroep geeft 403:** de API-sleutel heeft niet de scope voor dat eindpunt. Voeg de scope toe onder **Settings → Developer → API Keys**. Je moet dan een nieuwe sleutel maken, want scopes kunnen niet ter plekke worden gewijzigd. Plak de nieuwe sleutel in de instellingen van de extensie of in de configuratie van Claude.

**Claude kan een eindpunt niet vinden:** vraag het om `list_endpoints` met een filter aan te roepen, bijvoorbeeld *"gebruik list_endpoints met het filter 'donations' om het juiste pad te vinden"*. De routelijst wordt gegenereerd uit de live API, dus alles wat je met `curl` kunt bereiken, staat erin.

**Lokale ontwikkeling:** vervang `https://api.churchapps.org/mcp` door `http://localhost:8084/mcp`. Dezelfde authenticatie, dezelfde tools.

## Gerelateerd

- [API Keys](/docs/developer/api/api-keys): volledige referentie van scopes
- [MCP Server (ontwikkelaarsreferentie)](/docs/developer/api/mcp): protocoldetails en toolschema's
- [ChatGPT](./chatgpt): hetzelfde idee, voor de modellen van OpenAI
