---
title: "Claude"
---

# Claude

<div class="article-intro">

Koble Anthropic's Claude til kirkas B1-data. Med en API-nøkkel og noen minutter med oppsett kan du stille Claude spørsmål som "hvor mange førstegangsbesøkende kom på søndag?" eller "skriv en takk-e-post til de som ga til byggefonden denne måneden" — og Claude vil lese svarene direkte fra kirkas poster, begrenset til dine tillatelser.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En kirkeadministrator med tillatelsen **Rediger innstillinger** (for å opprette en API-nøkkel)
- Ett av: **Claude Code** (CLI / IDE-utvidelse), **Claude Desktop** (Mac/Windows), eller en **Claude Pro/Max/Team**-konto
- Den fullstendige URL-en til B1 API-en din — vanligvis `https://api.churchapps.org` for hostede kirker, eller din selvvertssted Api-vert

</div>

## Hva Claude kan se

Claude kommuniserer med B1 gjennom **Model Context Protocol (MCP)-serveren** som er innebygd i B1 API. Hvert kall Claude gjør kjører gjennom de samme godkjennings-, tillatelse- og kirke-scopings-reglene som en forespørsel fra B1Admin — noe som betyr at Claude:

- Ser kun data for **din** kirke
- Er begrenset til de **tillatelsene og scopene** API-nøkkelen du gir den bærer
- Kan ikke nå webhooks, OAuth-adminendepunkter eller andre operatør-bare stier (disse er blokkert)

En `donations:read`-nøkkel lar Claude oppsummere gaver men kan ikke registrere en gave. En `people:write`-nøkkel kan legge til en person men kan ikke se donasjoner. Velg scopene som passer til arbeidet.

## Oppsett

### 1. Opprett en API-nøkkel

1. I B1Admin gå til **Innstillinger → Utviklernavn → API-nøkler**.
2. Klikk **Ny API-nøkkel**, gi den navnet `Claude`, og velg scopene Claude skal ha. Vanlige startinnstillinger:
   - **Skrivebeskyttet assistent:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
   - **Les + legg til notater / oppgaver:** legg til `people:write`
   - **Full operasjonell assistent:** legg til de samsvarende `:write`-scopene du vil ha
3. Lagre. Den fullstendige `cak_…`-nøkkelen vises **bare én gang** — kopier den.

Se [API-nøkler](/docs/developer/api/api-keys) for hva hver scope tillater.

### 2. Koble Claude

Velg Claude-klienten du bruker:

#### Claude Code (CLI)

I en terminal:

```bash
claude mcp add --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Det er alt. Innenfor en Claude Code-økt skriver du `/mcp` for å bekrefte at `b1`-serveren er tilkoblet, og stiller deretter Claude spørsmål om kirka di.

#### Claude Desktop

Rediger Claude Desktops konfigurasjonsfil:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Legg til en `b1`-serveroppføring. Nyere versjoner av Claude Desktop snakker HTTP MCP naturlig:

```json
{
  "mcpServers": {
    "b1": {
      "url": "https://api.churchapps.org/mcp",
      "headers": {
        "Authorization": "Bearer cak_<prefix>.<secret>"
      }
    }
  }
}
```

Hvis Claude Desktop-versjonen din bare støtter stdio-servere, bridge gjennom `mcp-remote`:

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

Start Claude Desktop på nytt. Koblingsikonen i chat-forfatteren viser `b1` med tre verktøy (`list_endpoints`, `describe_endpoint`, `api_call`).

#### Claude.ai (nett) — tilpasset kobling

Claude.ai's "Legg til tilpasset kobling"-funksjon krever OAuth, som B1 MCP-serveren ikke støtter i dag. Bruk Claude Code eller Claude Desktop i stedet.

### 3. Spør Claude noe

Når den er koblet til, er det ikke behov for spesiell syntaks — Claude oppdager hva som er tilgjengelig på fluen. Eksempler:

- *"Hvor mange personer er i kirka mi og hva er de aktive gruppene?"*
- *"Oppsummer denne måneds donasjoner etter fond."*
- *"List folka som møtte 10am-tjenesten forrige søndag men ikke har vært på en onsdag-gruppe på de siste 60 dagene."*
- *"Skriv en velkomst-e-post til de fire personene som ble lagt til denne uken, adressert ved fornavn."*

Bak kulissene vil Claude ringe MCP-verktøyene — først for å oppdage riktig endepunkt, så for å hente dataene — og svar på vanlig engelsk.

## Hvordan det fungerer

B1 API-en viser et enkelt MCP-endepunkt på `/mcp`. Claude kobler til det, autentiserer med `cak_…`-nøkkelen din, og får tilgang til tre verktøy:

| Verktøy | Hva det gjør |
|---|---|
| `list_endpoints` | Viser REST-endepunktene Claude kan ringe, filtrerbar etter sti. Brukt for oppdagelse. |
| `describe_endpoint` | Returnerer en kort oppsummering og et eksempel på forespørsel/svar for et spesifikt endepunkt. |
| `api_call` | Faktisk påkaller et REST-endepunkt som den godkjente brukeren. |

Dette er den samme `/membership/people`, `/giving/donations`, `/attendance/visits` etc. overflaten B1Admin bruker — hver autorisasjonsregel gjelder identisk.

## Sikkerhet og grenser

- **Per-kirke-isolasjon.** API-nøkkelen løser seg til én kirke. Claude har ingen måte å se andre kirkers data.
- **Tillatelse-omfang.** Hvis du fjerner en tillatelse fra personen som opprettet nøkkelen i B1Admin, mister Claude den på neste kall — øyeblikkelig.
- **Tilbakekallt.** Slett nøkkelen i **Innstillinger → Utviklernavn → API-nøkler** og Claudes tilgang slutter umiddelbart.
- **Blokkert.** Leverandør-webhooks, OAuth-klient-adminendepunkter, og operatør-bare `apiEmails`-ruten er ikke kallbare via MCP.
- **Responsgrensestørrelse.** Ett verktøysvar er begrenset til 64 KB slik at lange lister ikke sprenger Claudes kontekst — Claude vil begrense spørsmålet med filtre når dette skjer.
- **Revisjonsspor.** Mutasjoner går gjennom samme revisjonsvalglogg som B1Admin-handlinger; du kan gjennomgå dem under **Rapporter → Revisjonsvalglogg**.

## Kostnad

ChurchApps er gratis og åpen kildekode — MCP-serveren er del av API-en kirka di allerede kjører. Anthropic belaster for Claude-bruk per deres planer. Det er ingen kostnad per anrop fra ChurchApps.

## Problemløsing

**Claude rapporterer "Unauthorized" eller 401:** bearer-tokenen mangler, er malformet, eller nøkkelen har blitt tilbakekalt. Dobbeltsjekk `Authorization: Bearer cak_…`-overskriften (merk mellomrommet og den bokstavelige `Bearer`).

**Et verktøykall returnerer 403:** API-nøkkelen har ikke scopet for det endepunktet. Legg til scopet i **Innstillinger → Utviklernavn → API-nøkler** (du må opprette en ny nøkkel — scopene kan ikke endres på plass) og oppdater Claudes konfigurasjon.

**Claude kan ikke finne et endepunkt:** be det ringe `list_endpoints` med et filter, f.eks. *"bruk list_endpoints med filter 'donations' for å finne riktig sti"*. Rutelageret genereres fra live API, så alt du kan treffe med `curl` er der.

**Lokal utvikling:** bytt `https://api.churchapps.org/mcp` for `http://localhost:8084/mcp` — samme auth, samme verktøy.

## Relatert

- [API-nøkler](/docs/developer/api/api-keys) — full scope-referanse
- [MCP-server (utviklerreferanse)](/docs/developer/api/mcp) — protokolldetaljer og verktøyskjemaer
- [ChatGPT](./chatgpt) — samme idé, for OpenAI-modeller
