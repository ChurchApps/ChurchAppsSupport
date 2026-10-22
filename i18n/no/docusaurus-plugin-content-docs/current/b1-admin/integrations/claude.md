---
title: "Claude"
---

# Claude

<div class="article-intro">

Spør Claude om kirka di på vanlig norsk, og den svarer ut fra B1-dataene deres. Spørsmål som *"hvor mange førstegangsbesøkende kom på søndag?"* eller *"hvem ble med i en smågruppe denne måneden?"* — eller be den gjøre ting, som *"legg til en ny side på nettstedet vårt som heter Arrangementer."* Oppsettet tar under 3 minutter, og du trenger ingen tekniske ferdigheter eller programvare å installere.

</div>

<div class="prereqs">
<h4>Dette trenger du</h4>

- **En Claude-konto.** **Gratisplanen fungerer** — en fin måte å prøve det ut på. Gratiskontoer har likevel en daglig meldingsgrense, og oppslag i B1 bruker opp meldinger raskt, så hvis du bruker det jevnlig anbefaler vi **Claude Pro** (rundt $20/måned).
- **B1-innloggingen din** — den samme som du bruker for B1 Admin.

</div>

:::tip Anbefalt — gratis å prøve
Claude er den enkleste måten å koble B1 til KI på, og det fungerer på Claudes **gratisplan** — en perfekt måte for kirka di å prøve det ut før dere betaler for noe.
:::

Det er to måter å koble til på. **Alternativ 1 er det enkleste** — ingen nøkkel og ingenting å installere.

## Alternativ 1 — Logg inn med B1 (enklest)

Fungerer på Claude-nettstedet, Claude desktop-appen og Claude-mobilappen — sett det opp én gang, så er det på alle sammen.

### Trinn 1 — Åpne koblingsinnstillingene i Claude

1. Gå til [claude.ai](https://claude.ai) og logg inn (eller opprett en gratis konto).
2. Klikk på navnet ditt nede i venstre hjørne, deretter **Settings** (Innstillinger) → **Connectors** (Koblinger).

### Trinn 2 — Legg til B1

1. Klikk **Add** (Legg til), deretter **Add custom connector** (Legg til tilpasset kobling).
2. **Name** (Navn): skriv `B1`.
3. **URL:** lim inn `https://api.churchapps.org/mcp`
4. La de andre alternativene være som de er, og klikk **Add** (Legg til).

### Trinn 3 — Logg inn på B1

1. Klikk **Connect** (Koble til). En B1-innloggingsside åpnes.
2. Logg inn med B1-kontoen din. Hvis du tilhører mer enn én kirke, sjekk at riktig kirke vises øverst.
3. B1 viser hva Claude ber om å få gjøre, og bekrefter at du blir sendt tilbake til **claude.ai**. Klikk **Allow** (Tillat).

Du er tilbake i Claude, og B1 vises som tilkoblet.

### Trinn 4 — Spør den om noe

Start en **ny chat** og prøv:

- *"Hvor mange personer er det i kirka vår?"*
- *"List opp de aktive gruppene våre."*
- *"Oppsummer denne månedens gaver etter fond."*
- *"Hvem har blitt med i kirka de siste 30 dagene?"*

Første gang ber Claude om tillatelse til å bruke B1 — klikk **Allow** (Tillat).

## Alternativ 2 — Desktop-utvidelse med en B1-nøkkel

Bruk dette hvis du heller vil gi Claude en nøkkel med begrensede tillatelser (for eksempel bare se). Det fungerer i Claude desktop-appen for Mac eller Windows, og du trenger tillatelse til å administrere kirkeinnstillinger i B1 for å lage en nøkkel.

### Trinn 1 — Skaff deg Claude-appen

Last ned Claude-appen fra [claude.com/download](https://claude.com/download), installer den, åpne den og logg inn.

### Trinn 2 — Lag B1-nøkkelen din

Nøkkelen er det som slipper Claude inn i B1 for *kirka di* — tenk på den som et passord bare for Claude.

1. Logg inn på [B1 Admin](https://admin.b1.church) og gå til [Innstillinger → Utvikler](https://admin.b1.church/settings/developer).
2. På fanen **API-nøkler** klikker du **Ny API-nøkkel**.
3. **Navn:** skriv `Claude`.
4. **Scopes:** kryss av for hva Claude får gjøre. Hvert område har en **read**-boks (bare se) og en **write**-boks (gjøre endringer). Usikker? Kryss bare av **read**-boksene til å begynne med — du kan lage en ny nøkkel med mer senere.
5. Klikk **Lagre**, og deretter **Kopier** nøkkelen. Den vises bare én gang, så gå rett videre til trinn 3.

### Trinn 3 — Legg B1 til i Claude

1. [Last ned B1-utvidelsen](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Dobbeltklikk** på den nedlastede filen (`b1-churchapps.mcpb`). Claude åpnes og viser **B1 (ChurchApps)**.
3. Klikk **Install**.
4. Når den ber om **B1 API key** (B1 API-nøkkelen din), limer du inn nøkkelen fra trinn 2 og lagrer.
5. **Avslutt Claude helt** (Mac: **Cmd+Q** · Windows: høyreklikk Claude-ikonet på oppgavelinjen → **Quit**) og åpne det igjen.

Hvis dobbeltklikk ikke åpner Claude, gå til **Settings → Extensions → Advanced settings → Install Extension…** i Claude og velg den nedlastede filen. Start deretter en ny chat og spør den om noe.

## Er det trygt?

- Claude kan bare se data fra **kirka di**.
- **Innlogget (alternativ 1):** Claude kan aldri gjøre mer enn din egen B1-innlogging kan. B1-innloggingssiden viser alt Claude kan få gjøre før du klikker **Allow** (Tillat).
- **Med en nøkkel (alternativ 2):** Claude kan bare gjøre det nøkkelen tillater — en nøkkel der bare **read**-boksene er avkrysset kan se, men aldri endre noe.
- **For å slå det av:** gå til **Innstillinger → Utvikler** i B1 Admin og tilbakekall appen under **Tilkoblede apper** (alternativ 1) eller slett nøkkelen under **API-nøkler** (alternativ 2). Tilgangen stopper med en gang. Du kan også klikke **Disconnect** (Koble fra) på B1-koblingen i Claude.

## Hva koster det?

B1-tilkoblingen er gratis — den er en del av ChurchApps. Claude har selv en gratisplan; Claude Pro (rundt $20/måned) gir deg mye mer bruk. Se [claude.com/pricing](https://claude.com/pricing).

## Tekniske detaljer

Resten av denne siden er for tekniske brukere og KI-assistenter: scopes, andre måter å koble til på, og hvordan det fungerer.

### Scopes

Claude kommuniserer med B1 gjennom **Model Context Protocol (MCP)-serveren** som er innebygd i B1 API (`https://api.churchapps.org/mcp`). Hvert kall kjører gjennom de samme godkjennings-, tillatelses- og kirke-scoping-reglene som en forespørsel fra B1 Admin. Claude er begrenset til **tillatelsene og scopene** til API-nøkkelen, og kan ikke nå webhooks, OAuth-adminendepunkter eller andre stier som bare er for operatører.

Vanlige startsett med scopes:

- **Skrivebeskyttet assistent:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Les + legg til notater / oppgaver:** legg til `people:write`
- **Full operasjonell assistent:** legg til de samsvarende `:write`-scopene du vil ha

En `donations:read`-nøkkel lar Claude oppsummere gaver, men kan ikke registrere en gave. En `people:write`-nøkkel kan legge til en person, men kan ikke se donasjoner. Se [API-nøkler](/docs/developer/api/api-keys) for hva hver scope tillater.

### Andre måter å koble til på

#### Claude Code (CLI)

I en terminal:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Det er alt. I en hvilken som helst Claude Code-økt skriver du `/mcp` for å bekrefte at `b1`-serveren er tilkoblet, og stiller deretter Claude et hvilket som helst spørsmål om kirka di.

#### Claude Desktop — manuell konfigurasjon (avansert)

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

Start Claude Desktop på nytt. Koblingsmenyen i chat-feltet viser `b1` med verktøyene sine.

#### Claude.ai (nett) — tilpasset kobling

Se **Alternativ 1** ovenfor. Koblingen bruker OAuth 2.1: Claude finner B1s autorisasjonsserver via `https://api.churchapps.org/.well-known/oauth-protected-resource`, registrerer seg selv med Dynamic Client Registration og logger inn med PKCE. På Team- og Enterprise-planer må en eier kanskje legge til koblingen for organisasjonen først. Claude ber ikke om bestemte scopes, så samtykkesiden tilbyr alt den innloggede B1-kontoen har tilgang til. Tilbakekall den under **Innstillinger → Utvikler → Tilkoblede apper** i B1 Admin.

### Hvordan det fungerer

B1 API-en eksponerer ett enkelt MCP-endepunkt på `/mcp`. Claude kobler til det, autentiserer med `cak_…`-nøkkelen din, og får tilgang til fire verktøy:

| Verktøy | Hva det gjør |
|---|---|
| `list_endpoints` | Viser REST-endepunktene Claude kan kalle, filtrerbart etter sti. Brukes til oppdagelse. |
| `describe_endpoint` | Returnerer en kort oppsummering og et eksempel på forespørsel/svar for et bestemt endepunkt. |
| `api_call` | Kaller faktisk et REST-endepunkt som den autentiserte brukeren. |
| `describe_page_builder` | En guide til å bygge og redigere sidene på kirkas nettsted, som Claude leser før den jobber med innhold på nettstedet. |

Dette er den samme `/membership/people`-, `/giving/donations`-, `/attendance/visits`-osv.-overflaten som B1Admin bruker — hver autorisasjonsregel gjelder på samme måte.

### Sikkerhet og grenser

- **Isolasjon per kirke.** API-nøkkelen hører til én kirke. Claude har ingen mulighet til å se andre kirkers data.
- **Begrenset av tillatelser.** Hvis du fjerner en tillatelse fra personen som opprettet nøkkelen i B1Admin, mister Claude den ved neste kall — umiddelbart.
- **Kan tilbakekalles.** Slett nøkkelen i **Innstillinger → Utvikler → API-nøkler**, og Claudes tilgang opphører umiddelbart.
- **Blokkeringsliste.** Leverandør-webhooks, OAuth-klient-adminendepunkter og den operatørforbeholdte `apiEmails`-ruten kan ikke kalles via MCP.
- **Grense for svarstørrelse.** Ett enkelt verktøysvar er begrenset til 64 KB slik at lange lister ikke sprenger Claudes kontekst — Claude snevrer inn spørringen med filtre når dette skjer.
- **Revisjonsspor.** Endringer går gjennom den samme revisjonsloggen som B1Admin-handlinger; du kan gå gjennom dem under **Innstillinger → Revisjonsspor**.

### Problemløsing

**Claude rapporterer "Unauthorized" eller 401:** bearer-tokenet mangler, er feilformatert, eller nøkkelen er tilbakekalt. Hvis du brukte utvidelsen, åpne **Settings → Extensions → B1 (ChurchApps)** i Claude og lim inn nøkkelen på nytt. Ellers dobbeltsjekker du `Authorization: Bearer cak_…`-headeren (merk mellomrommet og det bokstavelige `Bearer`).

**Et verktøykall returnerer 403:** API-nøkkelen har ikke scopet for det endepunktet. Legg til scopet i **Innstillinger → Utvikler → API-nøkler** (du må opprette en ny nøkkel — scopes kan ikke endres i etterkant) og lim inn den nye nøkkelen i utvidelsens innstillinger eller i Claudes konfigurasjon.

**Claude finner ikke et endepunkt:** be den kalle `list_endpoints` med et filter, f.eks. *"bruk list_endpoints med filteret 'donations' for å finne riktig sti"*. Ruteoversikten genereres fra live-API-et, så alt du kan nå med `curl` finnes der.

**Lokal utvikling:** bytt `https://api.churchapps.org/mcp` ut med `http://localhost:8084/mcp` — samme autentisering, samme verktøy.

## Relatert

- [API-nøkler](/docs/developer/api/api-keys) — full scope-referanse
- [MCP-server (utviklerreferanse)](/docs/developer/api/mcp) — protokolldetaljer og verktøyskjemaer
- [ChatGPT](./chatgpt) — samme idé, for OpenAIs modeller
