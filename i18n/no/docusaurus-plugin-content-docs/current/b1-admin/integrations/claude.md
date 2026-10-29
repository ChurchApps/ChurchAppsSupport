---
title: "Claude"
---

# Claude

<div class="article-intro">

Spør Claude om kirken din på vanlig språk, så svarer den ut fra B1-dataene dine — inkludert dine FreePlay-leksjoner og klasserom. Spørsmål som *«hvor mange førstegangsbesøkende kom på søndag?»* eller *«hvem ble med i en smågruppe denne måneden?»* — eller be den om å gjøre ting, for eksempel *«legg til en ny side på nettstedet vårt som heter Arrangementer.»* Oppsettet tar under 3 minutter, og du trenger ingen tekniske ferdigheter eller programvare for å installere det.

</div>

<div class="prereqs">
<h4>Det du trenger</h4>

- **En Claude-konto.** **Gratisplanen fungerer** — en god måte å prøve det på. Gratiskontoer har en daglig meldingsgrense, men oppslag i B1 bruker meldinger raskt, så hvis du bruker det regelmessig anbefaler vi **Claude Pro** (omtrent 20 USD/måned).
- **Din B1-pålogging** — den samme du bruker for B1 Admin.

</div>

:::tip Anbefalt — gratis å prøve
Claude er den enkleste måten å koble B1 til KI på, og det fungerer på Claudes **gratisplan** — en perfekt måte for kirken din å prøve det før dere betaler for noe.
:::

Det finnes to måter å koble til på. **Alternativ 1 er enklest** — ingen nøkkel og ingenting å installere.

## Alternativ 1 — Logg inn med B1 (enklest)

Fungerer på Claude-nettsiden, Claude-skrivebordsappen og Claude-mobilappen — sett det opp én gang, så er det på alle.

### Steg 1 — Åpne Claudes koblingsinnstillinger

1. Gå til [claude.ai](https://claude.ai) og logg inn (eller opprett en gratis konto).
2. Klikk på navnet ditt nederst til venstre, deretter **Innstillinger** → **Koblinger**.

### Steg 2 — Legg til B1

1. Klikk **Legg til**, og deretter **Legg til egendefinert kobling**.
2. **Navn:** skriv `B1`.
3. **URL:** lim inn `https://api.churchapps.org/mcp`
4. La de andre alternativene være som de er og klikk **Legg til**.

### Steg 3 — Logg inn i B1

1. Klikk **Koble til**. En påloggingsside for B1 åpnes.
2. Logg inn med B1-kontoen din. Hvis du tilhører mer enn én kirke, kontroller at riktig kirke vises øverst.
3. B1 viser hva Claude ber om å få lov til, og bekrefter at du sendes tilbake til **claude.ai**. Klikk **Tillat**.

Du er tilbake i Claude, og B1 vises som tilkoblet.

### Steg 4 — Spør om noe

Start en **ny samtale** og prøv for eksempel:

- *«Hvor mange personer er det i kirken vår?»*
- *«List opp de aktive gruppene våre.»*
- *«Oppsummer denne månedens gaver etter fond.»*
- *«Hvem ble med i kirken de siste 30 dagene?»*

Første gang spør Claude om lov til å bruke B1 — klikk **Tillat**.

## Alternativ 2 — Skrivebordsutvidelse med en B1-nøkkel

Bruk dette hvis du heller vil gi Claude en nøkkel med begrensede tillatelser (for eksempel bare lesetilgang). Det fungerer i Claude-skrivebordsappen for Mac eller Windows, og du trenger tillatelse til å administrere kirkeinnstillinger i B1 for å lage en nøkkel.

### Steg 1 — Skaff Claude-appen

Last ned Claude-appen fra [claude.com/download](https://claude.com/download), installer den, åpne den og logg inn.

### Steg 2 — Lag B1-nøkkelen din

Nøkkelen er det som slipper Claude inn i *din* kirkes B1 — tenk på den som et passord bare for Claude.

1. Logg inn på [B1 Admin](https://admin.b1.church) og gå til [Innstillinger → Utvikler](https://admin.b1.church/settings/developer).
2. På fanen **API-nøkler** klikker du **Ny API-nøkkel**.
3. **Navn:** skriv `Claude`.
4. **Omfang:** kryss av for hva Claude får lov til. Hvert område har en boks for **lese** (bare se) og en boks for **skrive** (gjøre endringer). Er du usikker? Kryss av bare for **lese**-boksene for å starte — du kan lage en ny nøkkel med mer senere.
5. Klikk **Lagre**, og deretter **Kopier** nøkkelen. Den vises bare én gang, så gå rett videre til steg 3.

### Steg 3 — Legg til B1 i Claude

1. [Last ned B1-utvidelsen](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Dobbeltklikk** på den nedlastede filen (`b1-churchapps.mcpb`). Claude åpnes og viser **B1 (ChurchApps)**.
3. Klikk **Installer**.
4. Når den ber om **B1 API-nøkkelen**, lim inn nøkkelen fra steg 2 og lagre.
5. **Avslutt Claude helt** (Mac: **Cmd+Q** · Windows: høyreklikk Claude-ikonet i oppgavelinjen → **Avslutt**) og åpne det igjen.

Hvis dobbeltklikk ikke åpner Claude, gå til **Innstillinger → Utvidelser → Avanserte innstillinger → Installer utvidelse…** i Claude og velg den nedlastede filen. Start deretter en ny samtale og spør om noe.

:::tip Har du allerede installert utvidelsen?
Det er ingenting å gjøre — FreePlay fungerer gjennom samme kobling. Unntaket er versjon 1.1.0, som ba om en B1-e-post og passord: last ned og installer utvidelsen på nytt for å oppdatere den. Nøkkelen din beholdes.
:::

## Er det trygt?

- Claude kan bare se **din kirkes** data.
- **Innlogget (alternativ 1):** Claude kan aldri gjøre mer enn din egen B1-pålogging kan. Påloggingssiden for B1 viser alt Claude får lov til å gjøre før du klikker **Tillat**.
- **Med nøkkel (alternativ 2):** Claude kan bare gjøre det nøkkelen tillater i B1 — en nøkkel med bare **lese**-bokser krysset av kan se, men aldri endre noe. FreePlay fungerer på samme måte, under samme nøkkel.
- **Slik slår du det av:** i B1 Admin går du til **Innstillinger → Utvikler** og tilbakekaller appen under **Tilkoblede apper** (alternativ 1) eller sletter nøkkelen under **API-nøkler** (alternativ 2). Tilgangen stopper med en gang. Du kan også klikke **Koble fra** på B1-koblingen i Claude.

## Hva koster det?

B1-koblingen er gratis — den er en del av ChurchApps. Claude selv har en gratisplan; Claude Pro (omtrent 20 USD/måned) gir deg mye mer bruk. Se [claude.com/pricing](https://claude.com/pricing).

## Tekniske detaljer

Resten av denne siden er for tekniske brukere og KI-assistenter: omfang, andre måter å koble til på, og hvordan det fungerer.

### Omfang

Claude snakker med B1 gjennom **Model Context Protocol (MCP)-serveren** som er innebygd i B1-API-et (`https://api.churchapps.org/mcp`). Hvert kall går gjennom de samme reglene for autentisering, tillatelser og kirkeavgrensning som en forespørsel fra B1 Admin. Claude er begrenset til **tillatelsene og omfangene** til API-nøkkelen, og kan ikke nå webhooks, OAuth-administrasjonsendepunkter eller andre stier som kun er for operatøren.

Vanlige startsett med omfang:

- **Skrivebeskyttet assistent:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Lese + legge til notater / oppgaver:** legg til `people:write`
- **Full driftsassistent:** legg til de samsvarende `:write`-omfangene du ønsker

En nøkkel med `donations:read` lar Claude oppsummere gaver, men kan ikke registrere en gave. En nøkkel med `people:write` kan legge til en person, men kan ikke se gaver. Se [API-nøkler](/docs/developer/api/api-keys) for hva hvert omfang tillater.

### Andre måter å koble til på

#### Claude Code (CLI)

I en terminal:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Det er alt. Skriv `/mcp` i en hvilken som helst Claude Code-økt for å bekrefte at `b1`-serveren er tilkoblet, og still deretter Claude et hvilket som helst spørsmål om kirken din.

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

Start Claude Desktop på nytt. Koblingsmenyen i chat-skrivefeltet viser `b1` med sine verktøy.

#### Claude.ai (web) — egendefinert kobling

Se **Alternativ 1** over. Koblingen bruker OAuth 2.1: Claude finner B1s autorisasjonsserver fra `https://api.churchapps.org/.well-known/oauth-protected-resource`, registrerer seg selv med Dynamic Client Registration, og logger inn med PKCE. På Team- og Enterprise-planer må en eier kanskje legge til koblingen for organisasjonen først. Claude ber ikke om bestemte omfang, så samtykkesiden tilbyr alt den innloggede B1-kontoen har tilgang til. Tilbakekall den under **Innstillinger → Utvikler → Tilkoblede apper** i B1 Admin.

### Slik fungerer det

B1-API-et eksponerer ett enkelt MCP-endepunkt på `/mcp`. Claude kobler til det, autentiserer med `cak_…`-nøkkelen din, og får tilgang til fire verktøy:

| Verktøy | Hva det gjør |
|---|---|
| `list_endpoints` | Lister REST-endepunktene Claude kan kalle, som kan filtreres på sti. Brukes til oppdagelse. |
| `describe_endpoint` | Returnerer en kort oppsummering og et eksempel på forespørsel/svar for et bestemt endepunkt. |
| `api_call` | Kaller faktisk et REST-endepunkt som den autentiserte brukeren. |
| `describe_page_builder` | En veiledning for å bygge og redigere kirkens nettsidesider, som Claude leser før den jobber med nettstedinnhold. |

Dette er det samme `/membership/people`, `/giving/donations`, `/attendance/visits` osv. som B1 Admin bruker — alle autorisasjonsregler gjelder helt likt. FreePlay-endepunktene (lessons.church) listes under `/lessons/*`; Claudes kall til dem videresendes til FreePlay som samme bruker, med samme tillatelser.

### Sikkerhet og begrensninger

- **Isolasjon per kirke.** API-nøkkelen knyttes til én kirke. Claude har ingen måte å se andre kirkers data på.
- **Tillatelsesavgrenset.** Hvis du fjerner en tillatelse fra personen som laget nøkkelen i B1 Admin, mister Claude den ved neste kall — med en gang.
- **Kan tilbakekalles.** Slett nøkkelen under **Innstillinger → Utvikler → API-nøkler**, så stopper Claudes tilgang med en gang.
- **Blokkeringsliste.** Webhooks fra leverandører, administrasjonsendepunkter for OAuth-klienter og den operatørkun `apiEmails`-ruten kan ikke kalles via MCP.
- **Størrelsesgrense for svar.** Et enkelt verktøysvar er begrenset til 64 KB, slik at lange lister ikke sprenger Claudes kontekst — Claude vil snevre inn spørringen med filtre når dette skjer.
- **Revisjonsspor.** Endringer går gjennom samme revisjonslogg som handlingene i B1 Admin; du kan se dem under **Innstillinger → Revisjonslogg**.

### Feilsøking

**Claude ber om en B1-e-post og passord for å bruke FreePlay:** du har versjon 1.1.0 av skrivebordsutvidelsen. Last ned og installer den på nytt for å oppdatere — nyere versjoner bruker bare nøkkelen din.

**Claude melder «Unauthorized» eller 401:** bearer-tokenet mangler, er feil formatert, eller nøkkelen er tilbakekalt. Hvis du brukte utvidelsen, åpne **Innstillinger → Utvidelser → B1 (ChurchApps)** i Claude og lim inn nøkkelen på nytt. Ellers sjekk `Authorization: Bearer cak_…`-headeren på nytt (legg merke til mellomrommet og det bokstavelige `Bearer`).

**Et verktøykall returnerer 403:** API-nøkkelen mangler omfanget for det endepunktet. Legg til omfanget under **Innstillinger → Utvikler → API-nøkler** (du må lage en ny nøkkel — omfang kan ikke endres på stedet) og lim inn den nye nøkkelen i utvidelsens innstillinger eller Claudes konfigurasjon.

**Claude finner ikke et endepunkt:** be den kalle `list_endpoints` med et filter, f.eks. *«bruk list_endpoints med filteret 'donations' for å finne riktig sti»*. Rute-oversikten genereres fra det kjørende API-et, så alt du kan nå med `curl` finnes der.

**Lokal utvikling:** bytt `https://api.churchapps.org/mcp` ut med `http://localhost:8084/mcp` — samme autentisering, samme verktøy.

## Relatert

- [API-nøkler](/docs/developer/api/api-keys) — fullstendig referanse for omfang
- [MCP-server (utviklerreferanse)](/docs/developer/api/mcp) — protokolldetaljer og verktøyskjemaer
- [ChatGPT](./chatgpt) — samme idé, for OpenAIs modeller
