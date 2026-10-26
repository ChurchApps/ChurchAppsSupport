---
title: "Claude"
---

# Claude

<div class="article-intro">

Spør Claude om menigheten din på vanlig norsk, så svarer den ut fra B1-dataene dine. Spørsmål som *«hvor mange førstegangsbesøkende kom på søndag?»* eller *«hvem ble med i en smågruppe denne måneden?»* — eller be den gjøre ting, som *«legg til en ny side på nettstedet vårt kalt Arrangementer.»* Oppsettet tar under 3 minutter, og du trenger ingen tekniske ferdigheter eller programvare for å installere det.

</div>

<div class="prereqs">
<h4>Det du trenger</h4>

- **En Claude-konto.** **Gratisabonnementet fungerer** — en god måte å prøve det på. Gratiskontoer har imidlertid en daglig meldingsgrense, og oppslag i B1 bruker meldinger raskt, så hvis du bruker det regelmessig, anbefaler vi **Claude Pro** (omtrent 20 USD i måneden).
- **B1-innloggingen din** — den samme som du bruker til B1 Admin.

</div>

:::tip Anbefalt — gratis å prøve
Claude er den enkleste måten å koble B1 til KI på, og det fungerer på Claudes **gratisabonnement** — en perfekt måte for menigheten din å prøve det på før dere betaler for noe.
:::

Det finnes to måter å koble til på. **Alternativ 1 er enklest** — ingen nøkkel og ingenting å installere.

## Alternativ 1 — Logg inn med B1 (enklest)

Fungerer på Claude-nettstedet, Claude-skrivebordsappen og Claude-appen for telefon — sett det opp én gang, så er det på alle.

### Steg 1 — Åpne tilkoblingsinnstillingene i Claude

1. Gå til [claude.ai](https://claude.ai) og logg inn (eller opprett en gratis konto).
2. Klikk på navnet ditt nederst til venstre, og velg deretter **Settings** → **Connectors**.

### Steg 2 — Legg til B1

1. Klikk på **Add**, og deretter **Add custom connector**.
2. **Name:** skriv `B1`.
3. **URL:** lim inn `https://api.churchapps.org/mcp`
4. La de andre alternativene stå som de er, og klikk på **Add**.

### Steg 3 — Logg inn i B1

1. Klikk på **Connect**. En innloggingsside for B1 åpnes.
2. Logg inn med B1-kontoen din. Hvis du tilhører mer enn én menighet, kontroller at riktig menighet vises øverst.
3. B1 viser hva Claude ber om å få gjøre, og bekrefter at du blir sendt tilbake til **claude.ai**. Klikk på **Allow**.

Du er tilbake i Claude, og B1 vises som tilkoblet.

### Steg 4 — Still et spørsmål

Start en **ny chat** og prøv for eksempel:

- *«Hvor mange personer er det i menigheten vår?»*
- *«List opp de aktive gruppene våre.»*
- *«Oppsummer gavene denne måneden etter fond.»*
- *«Hvem ble med i menigheten de siste 30 dagene?»*

Første gang spør Claude om tillatelse til å bruke B1 — klikk på **Allow**.

## Alternativ 2 — Skrivebordsutvidelse med en B1-nøkkel

Bruk dette hvis du heller vil gi Claude en nøkkel med begrensede tillatelser (for eksempel bare lesing). Det fungerer i Claude-skrivebordsappen for Mac eller Windows, og du må ha tillatelse til å administrere menighetsinnstillinger i B1 for å lage en nøkkel.

### Steg 1 — Skaff Claude-appen

Last ned Claude-appen fra [claude.com/download](https://claude.com/download), installer den, åpne den og logg inn.

### Steg 2 — Lag B1-nøkkelen din

Nøkkelen er det som gir Claude tilgang til *din* menighets B1 — tenk på den som et passord bare for Claude.

1. Logg inn på [B1 Admin](https://admin.b1.church) og gå til [Settings → Developer](https://admin.b1.church/settings/developer).
2. Under fanen **API Keys** klikker du på **New API Key**.
3. **Name:** skriv `Claude`.
4. **Scopes:** kryss av for det Claude har lov til å gjøre. Hvert område har en **read**-boks (kun lesing) og en **write**-boks (gjøre endringer). Er du usikker? Kryss kun av i **read**-boksene for å starte — du kan lage en ny nøkkel med flere tillatelser senere.
5. Klikk på **Save**, og deretter **Copy** for å kopiere nøkkelen. Den vises bare én gang, så gå rett videre til steg 3.

### Steg 3 — Legg til B1 i Claude

1. [Last ned B1-utvidelsen](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Dobbeltklikk** på den nedlastede filen (`b1-churchapps.mcpb`). Claude åpnes og viser **B1 (ChurchApps)**.
3. Klikk på **Install**.
4. Når den ber om **B1 API-nøkkelen** din, limer du inn nøkkelen fra steg 2 og lagrer.
5. **Avslutt Claude helt** (Mac: **Cmd+Q** · Windows: høyreklikk på Claude-ikonet i oppgavelinjen → **Quit**) og åpne det igjen.

Hvis dobbeltklikk ikke åpner Claude, går du til **Settings → Extensions → Advanced settings → Install Extension…** i Claude og velger den nedlastede filen. Start deretter en ny chat og still et spørsmål.

## Er det trygt?

- Claude kan bare se **menighetens** data.
- **Innlogget (alternativ 1):** Claude kan aldri gjøre mer enn det din egen B1-innlogging kan. Innloggingssiden for B1 viser alt Claude kan gjøre før du klikker på **Allow**.
- **Med nøkkel (alternativ 2):** Claude kan bare gjøre det nøkkelen tillater — en nøkkel med bare **read**-bokser avkrysset kan se, men aldri endre noe.
- **Slik slår du det av:** I B1 Admin går du til **Settings → Developer** og trekker tilbake appen under **Connected Apps** (alternativ 1), eller sletter nøkkelen under **API Keys** (alternativ 2). Tilgangen stopper med en gang. Du kan også klikke på **Disconnect** på B1-connectoren i Claude.

## Hva koster det?

Tilkoblingen til B1 er gratis — den er en del av ChurchApps. Claude har et gratisabonnement selv; Claude Pro (omtrent 20 USD i måneden) gir deg mye mer bruk. Se [claude.com/pricing](https://claude.com/pricing).

## Tekniske detaljer

Resten av denne siden er for tekniske brukere og KI-assistenter: tillatelser (scopes), andre måter å koble til på, og hvordan det fungerer.

### Scopes

Claude snakker med B1 gjennom **Model Context Protocol (MCP)-serveren** som er innebygd i B1-API-et (`https://api.churchapps.org/mcp`). Hvert kall går gjennom de samme reglene for autentisering, tillatelser og menighetsavgrensning som en forespørsel fra B1 Admin. Claude er begrenset til **tillatelsene og scopene** til API-nøkkelen, og kan ikke nå webhooks, OAuth-administrasjonsendepunkter eller andre stier som bare er for operatører.

Vanlige startsett med scopes:

- **Skrivebeskyttet assistent:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Lesing + legge til notater / oppgaver:** legg til `people:write`
- **Full driftsassistent:** legg til de tilsvarende `:write`-scopene du ønsker

En nøkkel med `donations:read` lar Claude oppsummere gaver, men den kan ikke registrere en gave. En nøkkel med `people:write` kan legge til en person, men kan ikke se gaver. Se [API Keys](/docs/developer/api/api-keys) for hva hvert scope tillater.

### Andre måter å koble til på

#### Claude Code (CLI)

I en terminal:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Det er alt. Skriv `/mcp` i en hvilken som helst Claude Code-økt for å bekrefte at `b1`-serveren er tilkoblet, og still deretter et spørsmål om menigheten din.

#### Claude Desktop — manuell konfigurasjon (avansert)

Hvis du heller ikke vil bruke utvidelsen, kan du redigere konfigurasjonsfilen til Claude Desktop:

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

#### Claude.ai (nett) — egendefinert connector

Se **Alternativ 1** over. Connectoren bruker OAuth 2.1: Claude finner B1s autorisasjonsserver via `https://api.churchapps.org/.well-known/oauth-protected-resource`, registrerer seg selv med Dynamic Client Registration, og logger inn med PKCE. På Team- og Enterprise-abonnementer må kanskje en eier legge til connectoren for organisasjonen først. Claude ber ikke om spesifikke scopes, så samtykkesiden viser alt den innloggede B1-kontoen har tilgang til. Trekk den tilbake under **Settings → Developer → Connected Apps** i B1 Admin.

### Slik fungerer det

B1-API-et eksponerer ett enkelt MCP-endepunkt på `/mcp`. Claude kobler til det, autentiserer seg med `cak_…`-nøkkelen din, og får tilgang til fire verktøy:

| Verktøy | Hva det gjør |
|---|---|
| `list_endpoints` | Lister REST-endepunktene Claude kan kalle, og kan filtreres på sti. Brukes til oppdagelse. |
| `describe_endpoint` | Returnerer en kort oppsummering og et eksempel på forespørsel/svar for et bestemt endepunkt. |
| `api_call` | Kaller faktisk et REST-endepunkt som den autentiserte brukeren. |
| `describe_page_builder` | En veiledning for å bygge og redigere menighetens nettsidesider, som Claude leser før den jobber med nettstedsinnhold. |

Dette er samme flate `/membership/people`, `/giving/donations`, `/attendance/visits` osv. som B1 Admin bruker — alle autorisasjonsregler gjelder på samme måte.

### Sikkerhet og begrensninger

- **Isolasjon per menighet.** API-nøkkelen tilhører én menighet. Claude har ingen måte å se andre menigheters data på.
- **Styrt av tillatelser.** Hvis du fjerner en tillatelse fra personen som laget nøkkelen i B1Admin, mister Claude den ved neste kall — med en gang.
- **Kan trekkes tilbake.** Slett nøkkelen under **Settings → Developer → API Keys**, så opphører Claudes tilgang umiddelbart.
- **Svarteliste.** Webhooks fra leverandører, OAuth-administrasjon av klienter og den operatørbegrensede `apiEmails`-ruten kan ikke kalles via MCP.
- **Grense for svarstørrelse.** Ett enkelt verktøysvar er begrenset til 64 KB, slik at lange lister ikke sprenger Claudes kontekst — Claude vil snevre inn spørringen med filtre når dette skjer.
- **Revisjonslogg.** Endringer går gjennom den samme revisjonsloggen som handlinger i B1Admin; du kan se dem under **Settings → Audit Log**.

### Feilsøking

**Claude melder «Unauthorized» eller 401:** bearer-tokenet mangler, er feil utformet, eller nøkkelen er trukket tilbake. Hvis du brukte utvidelsen, åpner du **Settings → Extensions → B1 (ChurchApps)** i Claude og limer inn nøkkelen på nytt. Ellers må du kontrollere `Authorization: Bearer cak_…`-headeren på nytt (legg merke til mellomrommet og det bokstavelige `Bearer`).

**Et verktøykall returnerer 403:** API-nøkkelen mangler scopet for dette endepunktet. Legg til scopet under **Settings → Developer → API Keys** (du må lage en ny nøkkel — scopes kan ikke endres på stedet), og lim inn den nye nøkkelen i utvidelsens innstillinger eller i Claudes konfigurasjon.

**Claude finner ikke et endepunkt:** be den kalle `list_endpoints` med et filter, for eksempel *«bruk list_endpoints med filteret 'donations' for å finne riktig sti»*. Ruteoversikten genereres fra det kjørende API-et, så alt du kan nå med `curl` finnes der.

**Lokal utvikling:** bytt `https://api.churchapps.org/mcp` med `http://localhost:8084/mcp` — samme autentisering, samme verktøy.

## Relatert

- [API Keys](/docs/developer/api/api-keys) — fullstendig referanse for scopes
- [MCP Server (utviklerreferanse)](/docs/developer/api/mcp) — protokolldetaljer og verktøyskjemaer
- [ChatGPT](./chatgpt) — samme idé, for OpenAIs modeller
