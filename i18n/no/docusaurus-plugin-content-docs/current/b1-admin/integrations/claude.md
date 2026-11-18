---
title: "Claude"
description: "Koble B1 Admin til Claude slik at du kan spørre om oppmøte, gaver og grupper på vanlig språk, med et innloggingsalternativ og et alternativ med en nøkkel med begrenset tilgang."
---

# Claude

<div class="article-intro">

Spør Claude om kirken din på vanlig språk, og det svarer ut fra B1-dataene dine, inkludert FreePlay-leksjonene og klasserommene dine. Spørsmål som *«hvor mange førstegangsbesøkende kom på søndag?»* eller *«hvem ble med i en smågruppe denne måneden?»*, eller be det gjøre ting, som *«legg til en ny side på nettstedet vårt som heter Arrangementer.»* Oppsettet tar under 3 minutter, og du trenger ingen tekniske ferdigheter eller programvare for å installere det.

</div>

<div class="prereqs">
<h4>Det du trenger</h4>

- **En Claude-konto.** **Gratisabonnementet fungerer**, og er en god måte å prøve det på. Gratiskontoer har imidlertid en daglig meldingsgrense, og oppslag i B1 bruker meldinger raskt, så hvis du bruker det jevnlig, anbefaler vi **Claude Pro** (omtrent 20 USD i måneden).
- **B1-innloggingen din**, den samme som du bruker i B1 Admin.

</div>

:::tip Anbefalt, gratis å prøve
Claude er den enkleste måten å koble B1 til KI på, og det fungerer på Claudes **gratisabonnement**. Det er en perfekt måte for kirken din å prøve det på før dere betaler for noe.
:::

Det finnes to måter å koble til på. **Alternativ 1 er enklest**. Ingen nøkkel og ingenting å installere.

## Alternativ 1: Logg inn med B1 (enklest) {#option-1--sign-in-with-b1-easiest}

Fungerer på Claude-nettsiden, Claude-skrivebordsappen og Claude-mobilappen. Sett det opp én gang, så er det på alle.

### Steg 1: Åpne Claudes connector-innstillinger {#step-1--open-claudes-connector-settings}

1. Gå til [claude.ai](https://claude.ai) og logg inn (eller opprett en gratis konto).
2. Klikk på navnet ditt nederst til venstre, og deretter **Tilpass** → **Connectors**.

### Steg 2: Legg til B1 {#step-2--add-b1}

1. Klikk på **Legg til**, og deretter **Legg til egendefinert connector**.
2. **Navn:** skriv `B1`.
3. **URL:** lim inn `https://api.churchapps.org/mcp`
4. La de andre alternativene stå som de er, og klikk på **Legg til**.

### Steg 3: Logg inn på B1 {#step-3--sign-in-to-b1}

1. Klikk på **Koble til**. En innloggingsside for B1 åpnes.
2. Logg inn med B1-kontoen din. Hvis du tilhører mer enn én kirke, kontroller at siden nevner riktig kirke («Vil du gi tilgang til følgende data fra *din kirke*…»).
3. B1 viser hva Claude ber om (**Alt B1-kontoen din har tilgang til**), noterer at appen registrerte seg selv hos B1, og bekrefter at du sendes tilbake til **claude.ai**. Klikk på **Tillat**.

Du er tilbake i Claude, og B1 vises som tilkoblet.

### Steg 4: Still et spørsmål {#step-4--ask-it-something}

Start en **ny chat** og prøv:

- *«Hvor mange personer er det i kirken vår?»*
- *«List opp de aktive gruppene våre.»*
- *«Oppsummer denne månedens gaver per fond.»*
- *«Hvem ble med i kirken de siste 30 dagene?»*

Første gang spør Claude om tillatelse til å bruke B1. Klikk på **Tillat**.

## Alternativ 2: Skrivebordsutvidelse med en B1-nøkkel {#option-2--desktop-extension-with-a-b1-key}

Bruk dette hvis du heller vil gi Claude en nøkkel med begrensede tillatelser (for eksempel bare lesing). Det fungerer i Claude-skrivebordsappen for Mac eller Windows, og du trenger tillatelse til å administrere kirkeinnstillinger i B1 for å lage en nøkkel.

### Steg 1: Skaff Claude-appen {#step-1--get-the-claude-app}

Last ned Claude-appen fra [claude.com/download](https://claude.com/download), installer den, åpne den og logg inn.

### Steg 2: Lag B1-nøkkelen din {#step-2--make-your-b1-key}

Nøkkelen er det som gir Claude tilgang til *kirkens* B1. Tenk på den som et passord bare for Claude.

1. Logg inn på [B1 Admin](https://admin.b1.church) og gå til [Innstillinger → Utvikler](https://admin.b1.church/settings/developer).
2. Under fanen **API-nøkler** klikker du på **Ny API-nøkkel**.
3. **Navn:** skriv `Claude`.
4. **Omfang:** kryss av for hva Claude har lov til å gjøre. De fleste områder har en boks for **lesing** (bare se) og en boks for **skriving** (gjøre endringer). Skjemaer har bare **forms:write**. Er du usikker? Kryss av bare for **lesing**-boksene til å begynne med. Du kan lage en ny nøkkel med flere tillatelser senere.
5. Klikk på **Lagre**, og deretter **Kopier** nøkkelen. Den vises bare én gang, så gå rett til steg 3.

### Steg 3: Legg til B1 i Claude {#step-3--add-b1-to-claude}

1. [Last ned B1-utvidelsen](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Dobbeltklikk** på den nedlastede filen (`b1-churchapps.mcpb`). Claude åpnes og viser **B1 (ChurchApps)**.
3. Klikk på **Installer**.
4. Når den spør etter **B1 API-nøkkelen** din, lim inn nøkkelen fra steg 2 og lagre.
5. **Avslutt Claude helt** (Mac: **Cmd+Q** · Windows: høyreklikk på Claude-ikonet i oppgavelinjen → **Avslutt**), og åpne det igjen.

Hvis dobbeltklikk ikke åpner Claude, gå til **Innstillinger → Utvidelser → Avanserte innstillinger → Installer utvidelse…** i Claude og velg den nedlastede filen. Start deretter en ny chat og still et spørsmål.

:::tip Har du allerede installert utvidelsen?
Du trenger ikke å gjøre noe. FreePlay fungerer gjennom den samme tilkoblingen. Ett unntak er versjon 1.1.0, som ba om en B1-e-postadresse og et passord. Last ned og installer utvidelsen på nytt for å oppdatere den. Nøkkelen din beholdes.
:::

## Er det trygt? {#is-it-safe}

- Claude kan bare se **kirkens** data.
- **Innlogget (alternativ 1):** Claude kan aldri gjøre mer enn din egen B1-innlogging kan. Innloggingssiden for B1 viser hva Claude ber om før du klikker **Tillat**.
- **Med en nøkkel (alternativ 2):** Claude kan bare gjøre det nøkkelen tillater i B1. En nøkkel med bare **lesing**-bokser avkrysset kan se på data, men aldri endre noe. FreePlay fungerer på samme måte, med samme nøkkel.
- **For å slå det av:** gå i B1 Admin til **Innstillinger → Utvikler** og oppheve appen under **Tilkoblede apper** (alternativ 1), eller slett nøkkelen under **API-nøkler** (alternativ 2). Tilgangen stopper med en gang. Du kan også klikke på **Koble fra** for B1-connectoren i Claude.

## Hva koster det? {#what-does-it-cost}

B1-tilkoblingen er gratis. Den er en del av ChurchApps. Claude selv har et gratisabonnement. Claude Pro (omtrent 20 USD i måneden) gir deg mye mer bruk. Se [claude.com/pricing](https://claude.com/pricing).

## Tekniske detaljer {#technical-details}

Resten av denne siden er for tekniske brukere og KI-assistenter: omfang, andre måter å koble til på, og hvordan det fungerer.

### Omfang {#scopes}

Claude snakker med B1 gjennom **Model Context Protocol (MCP)-serveren** som er innebygd i B1-API-et (`https://api.churchapps.org/mcp`). Hvert kall går gjennom de samme autentiserings-, tillatelses- og kirkeavgrensningsreglene som en forespørsel fra B1 Admin. Claude er begrenset til **tillatelsene og omfangene** til API-nøkkelen, og kan ikke nå webhooks for betalingsleverandører, administrasjonsendepunkter for OAuth-klienter, eller endepunkter for innlogging og passord.

Vanlige startsett med omfang:

- **Skrivebeskyttet assistent:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Lesing + legge til notater / oppgaver:** legg til `people:write`
- **Full operativ assistent:** legg til de tilsvarende `:write`-omfangene du ønsker

En `donations:read`-nøkkel lar Claude oppsummere gaver, men kan ikke registrere en gave. En `people:write`-nøkkel kan legge til en person, men kan ikke se gaver. Se [API-nøkler](/docs/developer/api/api-keys) for hva hvert omfang tillater.

### Andre måter å koble til på {#other-ways-to-connect}

#### Claude Code (CLI) {#claude-code-cli}

I en terminal:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Det var alt. Skriv `/mcp` i en hvilken som helst Claude Code-økt for å bekrefte at `b1`-serveren er tilkoblet, og still deretter et spørsmål om kirken din.

#### Claude Desktop, manuell konfigurasjon (avansert) {#claude-desktop--manual-config-advanced}

Hvis du heller ikke vil bruke utvidelsen, rediger konfigurasjonsfilen til Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Legg til en `b1`-serveroppføring som kobler til B1 gjennom `mcp-remote` (krever [Node.js](https://nodejs.org)):

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

Start Claude Desktop på nytt. Connector-menyen i chatfeltet viser `b1` med verktøyene sine.

#### Claude.ai (nett), egendefinert connector {#claudeai-web--custom-connector}

Se **alternativ 1** ovenfor. Connectoren bruker OAuth 2.1: Claude finner B1s autorisasjonsserver fra `https://api.churchapps.org/.well-known/oauth-protected-resource`, registrerer seg selv med Dynamic Client Registration, og logger inn med PKCE. På Team- og Enterprise-abonnementer må en eier kanskje legge til connectoren for organisasjonen først. Claude ber ikke om spesifikke omfang, så samtykkesiden tilbyr alt den innloggede B1-kontoen har tilgang til. Oppheve den under **Innstillinger → Utvikler → Tilkoblede apper** i B1 Admin.

### Slik fungerer det {#how-it-works}

B1-API-et eksponerer ett enkelt MCP-endepunkt på `/mcp`. Claude kobler seg til det, autentiserer med `cak_…`-nøkkelen din, og får tilgang til fire verktøy:

| Verktøy | Hva det gjør |
|---|---|
| `list_endpoints` | Lister REST-endepunktene Claude kan kalle, som kan filtreres på sti. Brukes til oppdagelse. |
| `describe_endpoint` | Returnerer en kort oppsummering og et eksempel på forespørsel og svar for et bestemt endepunkt. |
| `api_call` | Kaller et REST-endepunkt faktisk, som den autentiserte brukeren. |
| `describe_page_builder` | En veiledning for å bygge og redigere kirkens nettsidesider, som Claude leser før det arbeider med nettinnhold. |

Dette er den samme flaten `/membership/people`, `/giving/donations`, `/attendance/visits` osv. som B1 Admin bruker. Alle autorisasjonsregler gjelder likt. FreePlay-endepunkter (lessons.church) er listet under `/lessons/*`. Claudes kall til dem videresendes til FreePlay som samme bruker, med samme tillatelser.

### Sikkerhet og begrensninger {#safety-and-limits}

- **Isolasjon per kirke.** API-nøkkelen peker til én kirke. Claude har ingen måte å se andre kirkers data på.
- **Begrenset av tillatelser.** Hvis du fjerner en tillatelse fra personen som laget nøkkelen i B1 Admin, mister Claude den ved neste kall, med en gang.
- **Kan trekkes tilbake.** Slett nøkkelen under **Innstillinger → Utvikler → API-nøkler**, så stopper Claudes tilgang med en gang.
- **Blokkeringsliste.** Webhook-endepunkter for betalingsleverandører, administrasjonsendepunkter for OAuth-klienter, og endepunkter for innlogging, registrering, passord og tofaktor kan ikke kalles via MCP.
- **Svarstørrelsesgrense.** Ett enkelt verktøysvar er begrenset til 64 KB, så lange lister ikke sprenger Claudes kontekst. Claude vil snevre inn søket med filtre når dette skjer.
- **Revisjonsspor.** Endringer går gjennom samme revisjonslogg som handlinger i B1 Admin. Du kan se dem under **Innstillinger → Revisjonslogg**.

### Feilsøking {#troubleshooting}

**Claude ber om en B1-e-postadresse og et passord for å bruke FreePlay:** du har versjon 1.1.0 av skrivebordsutvidelsen. Last ned og installer den på nytt for å oppdatere. Nyere versjoner bruker bare nøkkelen din.

**Claude melder «Unauthorized» eller 401:** bærertokenet mangler, er feil formatert, eller nøkkelen er trukket tilbake. Hvis du brukte utvidelsen, åpne **Innstillinger → Utvidelser → B1 (ChurchApps)** i Claude og lim inn nøkkelen på nytt. Ellers kontroller `Authorization: Bearer cak_…`-headeren på nytt (legg merke til mellomrommet og det bokstavelige ordet `Bearer`).

**Et verktøykall gir 403:** API-nøkkelen har ikke omfanget for det endepunktet. Legg til omfanget under **Innstillinger → Utvikler → API-nøkler** (du må lage en ny nøkkel, for omfang kan ikke endres på stedet), og lim den nye nøkkelen inn i utvidelsens innstillinger eller Claudes konfigurasjon.

**Claude finner ikke et endepunkt:** be det kalle `list_endpoints` med et filter, f.eks. *«bruk list_endpoints med filteret 'donations' for å finne riktig sti»*. Ruteoversikten genereres fra det kjørende API-et, så alt du kan nå med `curl`, finnes der.

**Lokal utvikling:** bytt `https://api.churchapps.org/mcp` med `http://localhost:8084/mcp`. Samme autentisering, samme verktøy.

## Relatert {#related}

- [API-nøkler](/docs/developer/api/api-keys) — fullstendig referanse for omfang
- [MCP-server (referanse for utviklere)](/docs/developer/api/mcp) — protokolldetaljer og verktøyskjemaer
- [ChatGPT](./chatgpt.md) — samme idé, for OpenAIs modeller
