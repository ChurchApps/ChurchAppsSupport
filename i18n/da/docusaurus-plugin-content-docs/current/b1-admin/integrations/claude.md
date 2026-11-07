---
title: "Claude"
---

# Claude

<div class="article-intro">

Spørg Claude om din menighed på almindeligt dansk, så svarer den ud fra dine B1-data, herunder dine FreePlay-lektioner og klasselokaler. Spørgsmål som *"hvor mange første gangs gæster kom søndag?"* eller *"hvem har meldt sig til en små grupper i denne måned?"* – eller bed den om at udføre opgaver, som *"tilføj en ny side til vores hjemmeside kaldet Begivenheder."* Opsætningen tager under 3 minutter, og du behøver hverken tekniske færdigheder eller software for at installere den.

</div>

<div class="prereqs">
<h4>Det skal du bruge</h4>

- **En Claude-konto.** Den **gratis plan virker** – en god måde at prøve det af på. Gratis konti har dog en daglig meddelelsesgrænse, og opslag i B1 bruger meddelelser hurtigt, så hvis du bruger det regelmæssigt, anbefaler vi **Claude Pro** (ca. 20 USD/måned).
- **Dit B1-login** – det samme, som du bruger til B1 Admin.

</div>

:::tip Anbefalet – gratis at prøve
Claude er den nemmeste måde at forbinde B1 med AI på, og den virker på Claudes **gratis plan** – en perfekt måde for din menighed at prøve det af, før I betaler for noget.
:::

Der er to måder at forbinde på. **Mulighed 1 er den nemmeste** – ingen nøgle og intet at installere.

## Mulighed 1 – Log ind med B1 (nemmest)

Virker på Claudes hjemmeside, Claude-desktopappen og Claude-telefonappen – opsæt det én gang, og det er tilgængeligt på alle.

### Trin 1 – Åbn Claudes connector-indstillinger

1. Gå til [claude.ai](https://claude.ai) og log ind (eller opret en gratis konto).
2. Klik på dit navn nederst til venstre, og vælg derefter **Settings** → **Connectors**.

### Trin 2 – Tilføj B1

1. Klik på **Add**, og vælg derefter **Add custom connector**.
2. **Name:** skriv `B1`.
3. **URL:** indsæt `https://api.churchapps.org/mcp`
4. Lad de andre indstillinger være, som de er, og klik på **Add**.

### Trin 3 – Log ind på B1

1. Klik på **Connect**. En B1-loginside åbnes.
2. Log ind med din B1-konto. Hvis du hører til mere end én menighed, skal du kontrollere, at den rigtige menighed vises øverst.
3. B1 viser, hvad Claude beder om lov til at gøre, og bekræfter, at du sendes tilbage til **claude.ai**. Klik på **Allow**.

Du er tilbage i Claude, og B1 vises som forbundet.

### Trin 4 – Stil et spørgsmål

Start en **ny chat** og prøv for eksempel:

- *"Hvor mange mennesker er der i vores menighed?"*
- *"Vis en liste over vores aktive grupper."*
- *"Opsummer denne måneds donationer fordelt på fonde."*
- *"Hvem er kommet til menigheden de sidste 30 dage?"*

Første gang beder Claude om tilladelse til at bruge B1 – klik på **Allow**.

## Mulighed 2 – Desktopudvidelse med en B1-nøgle

Brug denne, hvis du hellere vil give Claude en nøgle med begrænsede rettigheder (for eksempel kun læseadgang). Den virker i Claude-desktopappen til Mac eller Windows, og du skal have tilladelse til at administrere menighedsindstillinger i B1 for at oprette en nøgle.

### Trin 1 – Hent Claude-appen

Download Claude-appen fra [claude.com/download](https://claude.com/download), installér den, åbn den og log ind.

### Trin 2 – Opret din B1-nøgle

Nøglen er det, der lader Claude komme ind i *din* menigheds B1 – tænk på den som en adgangskode, der kun er til Claude.

1. Log ind på [B1 Admin](https://admin.b1.church), og gå til [Settings → Developer](https://admin.b1.church/settings/developer).
2. Klik på **New API Key** på fanen **API Keys**.
3. **Name:** skriv `Claude`.
4. **Scopes:** marker det, Claude må gøre. Hvert område har en **read**-boks (kun læseadgang) og en **write**-boks (ændre data). Er du i tvivl, så marker kun **read**-boksene til at begynde med – du kan senere oprette en ny nøgle med flere rettigheder.
5. Klik på **Save**, og klik derefter på **Copy** for at kopiere nøglen. Den vises kun én gang, så gå direkte til Trin 3.

### Trin 3 – Tilføj B1 til Claude

1. [Download B1-udvidelsen](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Dobbeltklik** på den downloadede fil (`b1-churchapps.mcpb`). Claude åbner og viser **B1 (ChurchApps)**.
3. Klik på **Install**.
4. Når den beder om din **B1 API key**, skal du indsætte nøglen fra Trin 2 og gemme.
5. **Afslut Claude helt** (Mac: **Cmd+Q** · Windows: højreklik på Claude-ikonet i proceslinjen → **Quit**), og åbn den igen.

Hvis dobbeltklik ikke åbner Claude, så gå til **Settings → Extensions → Advanced settings → Install Extension…** i Claude og vælg den downloadede fil. Start derefter en ny chat og stil et spørgsmål.

:::tip Har du allerede installeret udvidelsen?
Så er der intet at gøre – FreePlay virker via den samme forbindelse. Den ene undtagelse er version 1.1.0, som bad om en B1-e-mail og adgangskode: installér udvidelsen igen for at opdatere den. Din nøgle bliver bevaret.
:::

## Er det sikkert?

- Claude kan kun se **din menigheds** data.
- **Logget ind (Mulighed 1):** Claude kan aldrig gøre mere, end dit eget B1-login kan. B1-loginsiden viser alt, hvad Claude må gøre, før du klikker på **Allow**.
- **Med nøgle (Mulighed 2):** Claude kan kun gøre det, nøglen tillader i B1 – en nøgle med kun **read**-bokse markeret kan kigge, men aldrig ændre noget. FreePlay virker på samme måde under samme nøgle.
- **Sådan slår du det fra:** I B1 Admin skal du gå til **Settings → Developer** og tilbagekalde appen under **Connected Apps** (Mulighed 1) eller slette nøglen under **API Keys** (Mulighed 2). Adgangen stopper med det samme. Du kan også klikke på **Disconnect** på B1-connectoren i Claude.

## Hvad koster det?

Forbindelsen til B1 er gratis – den er en del af ChurchApps. Claude har selv en gratis plan; Claude Pro (ca. 20 USD/måned) giver dig meget mere brug. Se [claude.com/pricing](https://claude.com/pricing).

## Tekniske detaljer

Resten af denne side er til tekniske brugere og AI-assistenter: scopes, andre måder at forbinde på, og hvordan det virker.

### Scopes

Claude taler med B1 gennem **Model Context Protocol (MCP)-serveren** indbygget i B1 API'et (`https://api.churchapps.org/mcp`). Hvert kald kører gennem de samme regler for autentificering, tilladelser og menighedsafgrænsning som en anmodning fra B1 Admin. Claude er begrænset til **tilladelserne og scopes** på API-nøglen og kan ikke nå webhooks, OAuth-administrationsendepunkter eller andre stier, der kun er til operatører.

Almindelige startsæt af scopes:

- **Skrivebeskyttet assistent:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Læs + tilføj noter / opgaver:** tilføj `people:write`
- **Fuld driftsassistent:** tilføj de matchende `:write`-scopes, du ønsker

En `donations:read`-nøgle lader Claude opsummere donationer, men kan ikke registrere en gave. En `people:write`-nøgle kan tilføje en person, men kan ikke se donationer. Se [API-nøgler](/docs/developer/api/api-keys) for, hvad hvert scope tillader.

### Andre måder at forbinde på

#### Claude Code (CLI)

I en terminal:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Det er alt. Skriv `/mcp` i en hvilken som helst Claude Code-session for at bekræfte, at `b1`-serveren er forbundet, og stil derefter Claude et spørgsmål om din menighed.

#### Claude Desktop – manuel konfiguration (avanceret)

Hvis du hellere vil lade være med at bruge udvidelsen, kan du redigere Claude Desktops konfigurationsfil:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Tilføj en `b1`-serverpost, der forbinder til B1 gennem `mcp-remote` (kræver [Node.js](https://nodejs.org)):

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

Genstart Claude Desktop. Connector-menuen i chatfeltet viser `b1` med dets værktøjer.

#### Claude.ai (web) – brugerdefineret connector

Se **Mulighed 1** ovenfor. Connectoren bruger OAuth 2.1: Claude finder B1's godkendelsesserver via `https://api.churchapps.org/.well-known/oauth-protected-resource`, registrerer sig selv med Dynamic Client Registration og logger ind med PKCE. På Team- og Enterprise-planer skal en ejer muligvis først tilføje connectoren for organisationen. Claude beder ikke om bestemte scopes, så samtykkesiden tilbyder alt, den indloggede B1-konto har adgang til. Tilbagekald det under **Settings → Developer → Connected Apps** i B1 Admin.

### Sådan virker det

B1 API'et stiller et enkelt MCP-endepunkt til rådighed på `/mcp`. Claude forbinder til det, autentificerer sig med din `cak_…`-nøgle og får adgang til fire værktøjer:

| Værktøj | Hvad det gør |
|---|---|
| `list_endpoints` | Viser de REST-endepunkter, Claude kan kalde, som kan filtreres efter sti. Bruges til at finde dem. |
| `describe_endpoint` | Returnerer en kort beskrivelse og et eksempel på anmodning/svar for et bestemt endepunkt. |
| `api_call` | Kalder faktisk et REST-endepunkt som den autentificerede bruger. |
| `describe_page_builder` | En vejledning til at bygge og redigere din menigheds hjemmesidesider, som Claude læser, før den arbejder med hjemmesideindhold. |

Det er den samme flade med `/membership/people`, `/giving/donations`, `/attendance/visits` osv., som din B1Admin bruger – alle autorisationsregler gælder på samme måde. FreePlay-endepunkter (lessons.church) vises under `/lessons/*`; Claudes kald til dem videresendes til FreePlay som den samme bruger med de samme tilladelser.

### Sikkerhed og begrænsninger

- **Isolation pr. menighed.** API-nøglen er knyttet til én menighed. Claude har ingen måde at se andre menigheders data.
- **Tilladelsesafgrænset.** Hvis du fjerner en tilladelse fra den person i B1Admin, der oprettede nøglen, mister Claude den ved næste kald – med det samme.
- **Kan tilbagekaldes.** Slet nøglen under **Settings → Developer → API Keys**, og Claudes adgang ophører straks.
- **Blokeringsliste.** Webhooks fra udbydere, OAuth-klientadministrationsendepunkter og ruten `apiEmails`, der kun er til operatører, kan ikke kaldes via MCP.
- **Grænse for svarstørrelse.** Et enkelt værktøjssvar er begrænset til 64 KB, så lange lister ikke fylder Claudes kontekst – Claude vil indsnævre forespørgslen med filtre, når det sker.
- **Revisionsspor.** Ændringer går gennem den samme revisionslog som handlinger i B1Admin; du kan gennemgå dem under **Settings → Audit Log**.

### Fejlfinding

**Claude beder om en B1-e-mail og adgangskode for at bruge FreePlay:** du har version 1.1.0 af desktopudvidelsen. Download og installér den igen for at opdatere – nyere versioner bruger kun din nøgle.

**Claude melder "Unauthorized" eller 401:** bearer-tokenet mangler, er forkert formateret, eller nøglen er blevet tilbagekaldt. Hvis du brugte udvidelsen, skal du åbne **Settings → Extensions → B1 (ChurchApps)** i Claude og indsætte nøglen igen. Ellers skal du kontrollere `Authorization: Bearer cak_…`-headeren igen (bemærk mellemrummet og det bogstavelige `Bearer`).

**Et værktøjskald returnerer 403:** API-nøglen har ikke scope til det endepunkt. Tilføj scopet under **Settings → Developer → API Keys** (du skal oprette en ny nøgle – scopes kan ikke ændres på stedet), og indsæt den nye nøgle i udvidelsens indstillinger eller Claudes konfiguration.

**Claude kan ikke finde et endepunkt:** bed den kalde `list_endpoints` med et filter, for eksempel *"brug list_endpoints med filteret 'donations' til at finde den rigtige sti"*. Ruteoversigten genereres fra det kørende API, så alt, du kan nå med `curl`, er med.

**Lokal udvikling:** udskift `https://api.churchapps.org/mcp` med `http://localhost:8084/mcp` – samme autentificering, samme værktøjer.

## Relateret

- [API-nøgler](/docs/developer/api/api-keys) – fuld referenceliste over scopes
- [MCP-server (udviklerreference)](/docs/developer/api/mcp) – protokoldetaljer og værktøjsskemaer
- [ChatGPT](./chatgpt) – samme idé, til OpenAI's modeller
