---
title: "Claude"
---

# Claude

<div class="article-intro">

Spør Claude om kirken din med vanlig språk, og det svarer ut fra B1-dataene dine -- inkludert FreePlay-leksjonene og klasserommene dine. Spørsmål som *«hvor mange førstegangsbesøkende kom på søndag?»* eller *«hvem ble med i en smågruppe denne måneden?»* -- eller be den gjøre ting, som *«legg til en ny side på nettstedet vårt som heter Arrangementer.»* Oppsettet tar under 3 minutter, og du trenger ingen tekniske ferdigheter eller programvare for å installere.

</div>

<div class="prereqs">
<h4>Hva du trenger</h4>

- **En Claude-konto.** **Gratisabonnementet fungerer** -- en god måte å prøve det på. Gratiskontoer har imidlertid en daglig meldingsgrense, og oppslag i B1 bruker meldinger raskt, så hvis du bruker det regelmessig anbefaler vi **Claude Pro** (ca. 20 USD/måned).
- **B1-innloggingen din.** Den samme som du bruker for B1 Admin.

</div>

:::tip Anbefalt -- gratis å prøve
Claude er den enkleste måten å koble B1 til KI på, og den fungerer på Claudes **gratisabonnement** -- et perfekt første steg for kirken din før dere betaler for noe.
:::

Det finnes to måter å koble til på. **Alternativ 1 er enklest** -- ingen nøkkel og ingenting å installere.

## Alternativ 1 — Logg inn med B1 (enklest)

Fungerer på Claude-nettsiden, Claude-skrivebordsappen og Claude-mobilappen -- sett det opp én gang, så er det på alle.

### Steg 1 — Åpne Claudes tilkoblingsinnstillinger

1. Gå til [claude.ai](https://claude.ai) og logg inn (eller opprett en gratis konto).
2. Klikk på navnet ditt nederst til venstre, deretter **Innstillinger** → **Tilkoblinger**.

### Steg 2 — Legg til B1

1. Klikk **Legg til**, og deretter **Legg til egendefinert tilkobling**.
2. **Navn:** skriv `B1`.
3. **URL:** lim inn `https://api.churchapps.org/mcp`
4. La de andre alternativene stå som de er og klikk **Legg til**.

### Steg 3 — Logg inn i B1

1. Klikk **Koble til**. En innloggingsside for B1 åpnes.
2. Logg inn med B1-kontoen din. Hvis du er med i mer enn én kirke, kontroller at riktig kirke vises øverst.
3. B1 viser hva Claude ber om å få lov til, og bekrefter at du sendes tilbake til **claude.ai**. Klikk **Tillat**.

Du er tilbake i Claude, og B1 vises som tilkoblet.

### Steg 4 — Still et spørsmål

Start en **ny samtale** og prøv:

- *«Hvor mange personer er det i kirken vår?»*
- *«Lista opp de aktive gruppene våre.»*
- *«Oppsummer denne måneds gaver etter fond.»*
- *«Hvem ble med i kirken de siste 30 dagene?»*

Første gang spør Claude om tillatelse til å bruke B1 -- klikk **Tillat**.

## Alternativ 2 — Skrivebordsutvidelse med en B1-nøkkel

Bruk dette hvis du heller vil gi Claude en nøkkel med begrensede tillatelser (for eksempel bare lesetilgang). Det fungerer i Claude-skrivebordsappen for Mac eller Windows, og du trenger tillatelse til å administrere kirkeinnstillinger i B1 for å lage en nøkkel.

### Steg 1 — Skaff Claude-appen

Last ned Claude-appen fra [claude.com/download](https://claude.com/download), installer den, åpne den og logg inn.

### Steg 2 — Lag B1-nøkkelen din

Nøkkelen er det som slipper Claude inn i *din* kirkes B1 -- tenk på den som et passord bare for Claude.

1. Logg inn på [B1 Admin](https://admin.b1.church) og gå til [Innstillinger → Utvikler](https://admin.b1.church/settings/developer).
2. Under fanen **API-nøkler** klikker du **Ny API-nøkkel**.
3. **Navn:** skriv `Claude`.
4. **Omfang:** kryss av for hva Claude får lov til. Hvert område har en boks for **lese** (bare se) og en boks for **skrive** (gjøre endringer). Usikker? Kryss bare av for **lese**-boksene for å starte -- du kan lage en ny nøkkel med mer tilgang senere.
5. Klikk **Lagre**, og deretter **Kopier** nøkkelen. Den vises bare én gang, så gå rett til steg 3.

### Steg 3 — Legg til B1 i Claude

1. [Last ned B1-utvidelsen](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Dobbeltklikk** på den nedlastede filen (`b1-churchapps.mcpb`). Claude åpnes og viser **B1 (ChurchApps)**.
3. Klikk **Installer**.
4. Når den spør etter **B1-API-nøkkelen** din, lim inn nøkkelen fra steg 2 og lagre.
5. **Avslutt Claude helt** (Mac: **Cmd+Q** · Windows: høyreklikk Claude-ikonet i oppgavelinjen → **Avslutt**) og åpne den igjen.

Hvis dobbeltklikk ikke åpner Claude, gå til **Innstillinger → Utvidelser → Avanserte innstillinger → Installer utvidelse…** i Claude og velg den nedlastede filen. Start deretter en ny samtale og still et spørsmål.

:::tip Har du allerede installert utvidelsen?
Det er ingenting å gjøre -- FreePlay fungerer via samme tilkobling. Det eneste unntaket er versjon 1.1.0, som ba om en B1-e-post og passord: last ned og installer utvidelsen på nytt for å oppdatere. Nøkkelen din består.
:::

## Er det trygt?

- Claude kan bare se **din kirkes** data.
- **Innlogget (alternativ 1):** Claude kan aldri gjøre mer enn det din egen B1-innlogging kan. Innloggingssiden for B1 lister opp alt Claude kan gjøre før du klikker **Tillat**.
- **Med nøkkel (alternativ 2):** Claude kan bare gjøre det nøkkelen tillater i B1 -- en nøkkel med bare **lese**-bokser krysset av kan se, men aldri endre noe. FreePlay fungerer på samme måte, under samme nøkkel.
- **For å slå det av:** i B1 Admin går du til **Innstillinger → Utvikler** og tilbakekaller appen under **Tilkoblede apper** (alternativ 1) eller sletter nøkkelen under **API-nøkler** (alternativ 2). Tilgangen stopper med en gang. Du kan også klikke **Koble fra** på B1-tilkoblingen i Claude.

## Hva koster det?

B1-tilkoblingen er gratis -- den er en del av ChurchApps. Claude selv har et gratisabonnement; Claude Pro (ca. 20 USD/måned) gir deg mye mer bruk. Se [claude.com/pricing](https://claude.com/pricing).

## Tekniske detaljer

Resten av denne siden er for tekniske brukere og KI-assistenter: omfang, andre måter å koble til på, og hvordan det fungerer.

### Omfang {#scopes}

Claude snakker med B1 gjennom **Model Context Protocol (MCP)-serveren** som er innebygd i B1-API-et (`https://api.churchapps.org/mcp`). Hvert kall går gjennom de samme autentiserings-, tillatelses- og kirkeavgrensningsreglene som en forespørsel fra B1 Admin. Claude er begrenset til **tillatelsene og omfanget** til API-nøkkelen, og kan ikke nå webhooks, OAuth-administrasjonsendepunkter eller andre stier som bare operatører har tilgang til.

Vanlige startsett med omfang:

- **Skrivebeskyttet assistent:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Les + legg til notater / oppgaver:** legg til `people:write`
- **Full operativ assistent:** legg til de `:write`-omfangene du ønsker

En `donations:read`-nøkkel lar Claude oppsummere gaver, men den kan ikke registrere en gave. En `people:write`-nøkkel kan legge til en person, men kan ikke se gaver. Se [API-nøkler](/docs/developer/api/api-keys) for hva hvert omfang tillater.

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

Start Claude Desktop på nytt. Tilkoblingsmenyen i chatten viser `b1` med verktøyene sine.

#### Claude.ai (web) — egendefinert tilkobling

Se **alternativ 1** over. Tilkoblingen bruker OAuth 2.1: Claude finner B1s autorisasjonsserver fra `https://api.churchapps.org/.well-known/oauth-protected-resource`, registrerer seg selv med Dynamic Client Registration, og logger inn med PKCE. På Team- og Enterprise-abonnementer må en eier kanskje først legge til tilkoblingen for organisasjonen. Claude ber ikke om spesifikke omfang, så samtykkesiden tilbyr alt den innloggede B1-kontoen har tilgang til. Tilbakekall den under **Innstillinger → Utvikler → Tilkoblede apper** i B1 Admin.

### Slik fungerer det

B1-API-et eksponerer ett enkelt MCP-endepunkt på `/mcp`. Claude kobler til det, autentiserer med `cak_…`-nøkkelen din, og får tilgang til fire verktøy:

| Verktøy | Hva det gjør |
|---|---|
| `list_endpoints` | Lister REST-endepunktene Claude kan kalle, og kan filtreres på sti. Brukes til oppdagelse. |
| `describe_endpoint` | Returnerer en kort oppsummering og et eksempel på forespørsel og svar for et bestemt endepunkt. |
| `api_call` | Kaller faktisk et REST-endepunkt som den autentiserte brukeren. |
| `describe_page_builder` | En guide for å bygge og redigere kirkens nettsidene, som Claude leser før den jobber med nettstedsinnhold. |

Dette er samme flate som `/membership/people`, `/giving/donations`, `/attendance/visits` osv. som B1 Admin bruker -- alle autorisasjonsregler gjelder på samme måte. FreePlay-endepunktene (lessons.church) er listet under `/lessons/*`; Claudes kall til dem videresendes til FreePlay som samme bruker, med samme tillatelser.

### Sikkerhet og begrensninger

- **Isolasjon per kirke.** API-nøkkelen peker til én kirke. Claude har ingen måte å se andre kirkers data på.
- **Tillatelsesavgrenset.** Hvis du fjerner en tillatelse fra personen som laget nøkkelen i B1 Admin, mister Claude den ved neste kall -- med en gang.
- **Kan tilbakekalles.** Slett nøkkelen under **Innstillinger → Utvikler → API-nøkler**, så stopper Claudes tilgang med en gang.
- **Svarteliste.** Webhooks fra leverandører, administrasjonsendepunkter for OAuth-klienter og den operatør-only `apiEmails`-ruten kan ikke kalles via MCP.
- **Størrelsesgrense for svar.** Ett verktøysvar er begrenset til 64 KB, slik at lange lister ikke sprenger Claudes kontekst -- Claude vil snevre inn spørringen med filtre når dette skjer.
- **Revisjonslogg.** Endringer går gjennom samme revisjonslogg som handlinger i B1 Admin; du kan se dem under **Innstillinger → Revisjonslogg**.

### Feilsøking

**Claude ber om en B1-e-post og passord for å bruke FreePlay:** du har versjon 1.1.0 av skrivebordsutvidelsen. Last ned og installer den på nytt for å oppdatere -- nyere versjoner bruker bare nøkkelen din.

**Claude melder «Unauthorized» eller 401:** bearer-tokenet mangler, er feil utformet, eller nøkkelen er tilbakekalt. Hvis du brukte utvidelsen, åpner du **Innstillinger → Utvidelser → B1 (ChurchApps)** i Claude og limer inn nøkkelen på nytt. Ellers sjekker du `Authorization: Bearer cak_…`-headeren på nytt (legg merke til mellomrommet og det bokstavelige `Bearer`).

**Et verktøykall returnerer 403:** API-nøkkelen har ikke omfanget for det endepunktet. Legg til omfanget under **Innstillinger → Utvikler → API-nøkler** (du må lage en ny nøkkel -- omfang kan ikke endres på stedet) og lim den nye nøkkelen inn i utvidelsens innstillinger eller Claudes konfigurasjon.

**Claude finner ikke et endepunkt:** be den kalle `list_endpoints` med et filter, f.eks. *«bruk list_endpoints med filteret 'donations' for å finne riktig sti»*. Rute-oversikten genereres fra det kjørende API-et, så alt du kan nå med `curl` finnes der.

**Lokal utvikling:** bytt `https://api.churchapps.org/mcp` med `http://localhost:8084/mcp` -- samme autentisering, samme verktøy.

## Relatert

- [API-nøkler](/docs/developer/api/api-keys) — full oversikt over omfang
- [MCP-server (utviklerreferanse)](/docs/developer/api/mcp) — protokolldetaljer og verktøyskjemaer
- [ChatGPT](./chatgpt) — samme idé, for OpenAIs modeller
