---
title: "Claude"
---

# Claude

<div class="article-intro">

Ställ frågor om din församling till Claude på vanlig svenska, så svarar den utifrån dina B1-data, inklusive dina FreePlay-lektioner och klassrum. Frågor som *"hur många förstagångsbesökare kom på söndagen?"* eller *"vem gick med i en smågrupp den här månaden?"*, eller be den göra saker, som *"lägg till en ny sida på vår webbplats som heter Evenemang."* Installationen tar mindre än 3 minuter, och du behöver inga tekniska kunskaper eller någon programvara för att installera.

</div>

<div class="prereqs">
<h4>Det här behöver du</h4>

- **Ett Claude-konto.** Den **kostnadsfria planen fungerar**, och det är ett bra sätt att prova. Kostnadsfria konton har dock en daglig gräns för antal meddelanden, och att slå upp saker i B1 förbrukar meddelanden snabbt. Om du använder det regelbundet rekommenderar vi därför **Claude Pro** (ungefär 20 USD/månad).
- **Din B1-inloggning**, samma som du använder för B1 Admin.

</div>

:::tip Rekommenderas, gratis att prova
Claude är det enklaste sättet att koppla B1 till AI, och det fungerar med Claudes **kostnadsfria plan**. Det är ett perfekt sätt för din församling att prova innan ni betalar för något.
:::

Det finns två sätt att ansluta. **Alternativ 1 är enklast**. Där behövs ingen nyckel och inget ska installeras.

## Alternativ 1: Logga in med B1 (enklast)

Fungerar på Claudes webbplats, i Claude-skrivbordsappen och i Claude-appen för telefon. Ställ in det en gång, så fungerar det på alla.

### Steg 1: Öppna Claudes anslutningsinställningar

1. Gå till [claude.ai](https://claude.ai) och logga in (eller skapa ett kostnadsfritt konto).
2. Klicka på ditt namn nere till vänster och välj sedan **Inställningar** → **Anslutningar**.

### Steg 2: Lägg till B1

1. Klicka på **Lägg till** och sedan på **Lägg till anpassad anslutning**.
2. **Namn:** skriv `B1`.
3. **URL:** klistra in `https://api.churchapps.org/mcp`
4. Lämna de andra alternativen som de är och klicka på **Lägg till**.

### Steg 3: Logga in i B1

1. Klicka på **Anslut**. En inloggningssida för B1 öppnas.
2. Logga in med ditt B1-konto. Om du tillhör fler än en församling, kontrollera att rätt församling visas överst.
3. B1 visar vad Claude vill göra och bekräftar att du skickas tillbaka till **claude.ai**. Klicka på **Tillåt**.

Du är tillbaka i Claude, och B1 visas som ansluten.

### Steg 4: Ställ en fråga

Starta en **ny chatt** och prova till exempel:

- *"Hur många personer finns i vår församling?"*
- *"Lista våra aktiva grupper."*
- *"Sammanfatta den här månadens gåvor per fond."*
- *"Vem har gått med i församlingen de senaste 30 dagarna?"*

Första gången frågar Claude om lov att använda B1. Klicka på **Tillåt**.

## Alternativ 2: Skrivbordstillägg med en B1-nyckel

Använd det här om du hellre vill ge Claude en nyckel med begränsade behörigheter, till exempel endast läsåtkomst. Det fungerar i Claude-skrivbordsappen för Mac eller Windows, och du behöver behörighet att hantera församlingsinställningar i B1 för att skapa en nyckel.

### Steg 1: Hämta Claude-appen

Ladda ned Claude-appen från [claude.com/download](https://claude.com/download), installera den, öppna den och logga in.

### Steg 2: Skapa din B1-nyckel

Nyckeln är det som släpper in Claude i *er* församlings B1. Tänk på den som ett lösenord enbart för Claude.

1. Logga in på [B1 Admin](https://admin.b1.church) och gå till [Inställningar → Utvecklare](https://admin.b1.church/settings/developer).
2. På fliken **API-nycklar** klickar du på **Ny API-nyckel**.
3. **Namn:** skriv `Claude`.
4. **Omfattning:** bocka för vad Claude får göra. Varje område har en ruta för **läsning** (endast titta) och en ruta för **skrivning** (göra ändringar). Är du osäker? Bocka bara för **läsning** i början. Du kan skapa en ny nyckel med fler behörigheter senare.
5. Klicka på **Spara** och sedan på **Kopiera** för nyckeln. Den visas bara en gång, så gå direkt vidare till steg 3.

### Steg 3: Lägg till B1 i Claude

1. [Ladda ned B1-tillägget](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Dubbelklicka** på den nedladdade filen (`b1-churchapps.mcpb`). Claude öppnas och visar **B1 (ChurchApps)**.
3. Klicka på **Installera**.
4. När det frågar efter din **B1-API-nyckel** klistrar du in nyckeln från steg 2 och sparar.
5. **Avsluta Claude helt** (Mac: **Cmd+Q** · Windows: högerklicka på Claude-ikonen i aktivitetsfältet → **Avsluta**) och öppna det igen.

Om dubbelklick inte öppnar Claude går du till **Inställningar → Tillägg → Avancerade inställningar → Installera tillägg…** i Claude och väljer den nedladdade filen. Starta sedan en ny chatt och ställ en fråga.

:::tip Har du redan installerat tillägget?
Då behöver du inte göra något. FreePlay fungerar via samma anslutning. Undantaget är version 1.1.0, som bad om en B1-e-postadress och ett lösenord. Ladda ned och installera tillägget igen för att uppdatera det. Din nyckel finns kvar.
:::

## Är det säkert?

- Claude kan bara se **din församlings** data.
- **Inloggad (alternativ 1):** Claude kan aldrig göra mer än vad din egen B1-inloggning kan. Inloggningssidan för B1 visar allt Claude får göra innan du klickar på **Tillåt**.
- **Med nyckel (alternativ 2):** Claude kan bara göra det nyckeln tillåter i B1. En nyckel med endast rutor för **läsning** ikryssade kan titta men aldrig ändra något. FreePlay fungerar på samma sätt, med samma nyckel.
- **Så stänger du av det:** i B1 Admin går du till **Inställningar → Utvecklare** och återkallar appen under **Anslutna appar** (alternativ 1) eller tar bort nyckeln under **API-nycklar** (alternativ 2). Åtkomsten upphör direkt. Du kan också klicka på **Koppla från** för B1-anslutningen i Claude.

## Vad kostar det?

B1-anslutningen är gratis. Den ingår i ChurchApps. Claude har en kostnadsfri plan. Claude Pro (ungefär 20 USD/månad) ger dig betydligt mer användning. Se [claude.com/pricing](https://claude.com/pricing).

## Tekniska detaljer

Resten av den här sidan är till för tekniska användare och AI-assistenter: omfattningar, andra sätt att ansluta och hur det fungerar.

### Omfattningar

Claude kommunicerar med B1 via **Model Context Protocol (MCP)-servern** som är inbyggd i B1:s API (`https://api.churchapps.org/mcp`). Varje anrop går genom samma regler för autentisering, behörighet och församlingsavgränsning som en förfrågan från B1 Admin. Claude är begränsad till API-nyckelns **behörigheter och omfattningar** och kan inte nå webhooks, OAuth-administrationsslutpunkter eller andra vägar som bara är avsedda för driftansvariga.

Vanliga startuppsättningar av omfattningar:

- **Skrivskyddad assistent:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Läsning + lägga till anteckningar/uppgifter:** lägg till `people:write`
- **Fullständig driftassistent:** lägg till de motsvarande `:write`-omfattningar du vill ha

En nyckel med `donations:read` gör att Claude kan sammanfatta gåvor men inte registrera en gåva. En nyckel med `people:write` kan lägga till en person men inte se gåvor. Se [API-nycklar](/docs/developer/api/api-keys) för vad varje omfattning tillåter.

### Andra sätt att ansluta

#### Claude Code (CLI)

I en terminal:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Det är allt. Skriv `/mcp` i en valfri Claude Code-session för att bekräfta att servern `b1` är ansluten, och ställ sedan vilken fråga du vill om din församling.

#### Claude Desktop: manuell konfiguration (avancerat)

Om du hellre inte använder tillägget kan du redigera konfigurationsfilen för Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Lägg till en serverpost `b1` som kopplar till B1 via `mcp-remote` (kräver [Node.js](https://nodejs.org)):

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

Starta om Claude Desktop. Anslutningsmenyn i chattens inmatningsfält visar `b1` med dess verktyg.

#### Claude.ai (webben): anpassad anslutning

Se **alternativ 1** ovan. Anslutningen använder OAuth 2.1. Claude hittar B1:s auktoriseringsserver via `https://api.churchapps.org/.well-known/oauth-protected-resource`, registrerar sig själv med Dynamic Client Registration och loggar in med PKCE. I Team- och Enterprise-planer kan en ägare behöva lägga till anslutningen för organisationen först. Claude begär inga specifika omfattningar, så godkännandesidan erbjuder allt som det inloggade B1-kontot har tillgång till. Återkalla den under **Inställningar → Utvecklare → Anslutna appar** i B1 Admin.

### Så fungerar det

B1-API:et exponerar en enda MCP-slutpunkt på `/mcp`. Claude ansluter till den, autentiserar sig med sin `cak_…`-nyckel och får åtkomst till fyra verktyg:

| Verktyg | Vad det gör |
|---|---|
| `list_endpoints` | Listar de REST-slutpunkter Claude kan anropa, filtrerbara på sökväg. Används för att upptäcka dem. |
| `describe_endpoint` | Returnerar en kort sammanfattning och ett exempel på förfrågan och svar för en specifik slutpunkt. |
| `api_call` | Anropar faktiskt en REST-slutpunkt som den autentiserade användaren. |
| `describe_page_builder` | En guide för att bygga och redigera din församlings webbsidor, som Claude läser innan den arbetar med webbinnehåll. |

Det här är samma yta för `/membership/people`, `/giving/donations`, `/attendance/visits` osv. som din B1Admin använder. Alla auktoriseringsregler gäller på samma sätt. FreePlay-slutpunkter (lessons.church) listas under `/lessons/*`. Claudes anrop till dem skickas vidare till FreePlay som samma användare, med samma behörigheter.

### Säkerhet och begränsningar

- **Isolering per församling.** API-nyckeln kopplas till en enda församling. Claude har inget sätt att se andra församlingars data.
- **Behörighetsstyrd.** Om du tar bort en behörighet från personen som skapade nyckeln i B1Admin förlorar Claude den vid nästa anrop, direkt.
- **Återkallbar.** Ta bort nyckeln under **Inställningar → Utvecklare → API-nycklar** så upphör Claudes åtkomst direkt.
- **Blockeringslista.** Webhooks från leverantörer, administrationsslutpunkter för OAuth-klienter och den driftansvarigas rutt `apiEmails` kan inte anropas via MCP.
- **Gräns för svarsstorlek.** Ett enskilt verktygssvar begränsas till 64 KB så att långa listor inte fyller upp Claudes kontext. Claude kommer i så fall att smalna av frågan med filter.
- **Granskningslogg.** Ändringar går genom samma granskningslogg som åtgärder i B1Admin. Du kan granska dem under **Inställningar → Granskningslogg**.

### Felsökning

**Claude frågar efter en B1-e-postadress och ett lösenord för att använda FreePlay:** du har version 1.1.0 av skrivbordstillägget. Ladda ned och installera det igen för att uppdatera. Nyare versioner använder bara din nyckel.

**Claude rapporterar "Unauthorized" eller 401:** bearer-token saknas, är felaktig eller nyckeln har återkallats. Om du använde tillägget öppnar du **Inställningar → Tillägg → B1 (ChurchApps)** i Claude och klistrar in nyckeln igen. Annars kontrollerar du headern `Authorization: Bearer cak_…` igen (notera mellanslaget och det bokstavliga `Bearer`).

**Ett verktygsanrop returnerar 403:** API-nyckeln saknar omfattningen för den slutpunkten. Lägg till omfattningen under **Inställningar → Utvecklare → API-nycklar**. Du behöver skapa en ny nyckel, eftersom omfattningar inte kan ändras i efterhand. Klistra sedan in den nya nyckeln i tilläggets inställningar eller i Claudes konfiguration.

**Claude hittar inte en slutpunkt:** be den anropa `list_endpoints` med ett filter, till exempel *"använd list_endpoints med filtret 'donations' för att hitta rätt sökväg"*. Ruttförteckningen genereras från det levande API:et, så allt du kan nå med `curl` finns där.

**Lokal utveckling:** byt ut `https://api.churchapps.org/mcp` mot `http://localhost:8084/mcp`. Samma autentisering, samma verktyg.

## Relaterat

- [API-nycklar](/docs/developer/api/api-keys): fullständig referens för omfattningar
- [MCP-server (utvecklarreferens)](/docs/developer/api/mcp): protokolldetaljer och verktygsscheman
- [ChatGPT](./chatgpt): samma idé, för OpenAI:s modeller
