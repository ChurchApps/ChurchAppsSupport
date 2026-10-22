---
title: "Claude"
---

# Claude {#claude}

<div class="article-intro">

Koble Anthropics Claude til kirkens B1-data. Legg til B1 som en egendefinert konnektor på claude.ai og logg inn, eller bruk en API-nøkkel med Claude Code eller Claude Desktop. Etter noen minutters oppsett kan du stille Claude spørsmål som «hvor mange førstegangsbesøkende kom på søndag?» eller «skriv et takkebrev til de som ga til bygningsfondet denne måneden» -- og Claude henter svarene direkte fra kirkens registre, begrenset av dine tillatelser.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En konto for **Claude Pro/Max/Team/Enterprise** (for den egendefinerte konnektoren på claude.ai), eller **Claude Code** (CLI / IDE-utvidelse) eller **Claude Desktop** (Mac/Windows)
- For API-nøkkeloppsettet: en kirkeadministrator med tillatelsen **Rediger innstillinger** (for å opprette en API-nøkkel)
- Den fullstendige URLen til B1 API-et ditt -- vanligvis `https://api.churchapps.org` for kirker med hosting, eller verten for ditt egenhostede API

</div>

## Hva Claude kan se {#what-claude-can-see}

Claude snakker med B1 gjennom **Model Context Protocol (MCP)-serveren** som er innebygd i B1 API-et. Hvert kall Claude gjør, går gjennom de samme reglene for autentisering, tillatelser og kirkeavgrensning som en forespørsel fra B1 Admin -- det betyr at Claude:

- Bare ser data for **din** kirke
- Er begrenset til de **tillatelsene og omfangene** API-nøkkelen eller påloggingen du gir, har
- Ikke kan nå webhooks, OAuth-administrasjonsendepunkter eller andre stier som bare er for operatører (de er svartelistet)

En nøkkel med `donations:read` lar Claude oppsummere giving, men den kan ikke registrere en gave. En nøkkel med `people:write` kan legge til en person, men kan ikke se gaver. Velg omfangene som passer til arbeidet.

## Oppsett {#setup}

Det finnes to måter å koble til på:

- **Claude.ai-egendefinert konnektor** -- det enkleste. Du logger inn i B1 og godkjenner tilgang i nettleseren din, uten en nøkkel å kopiere. Konnektoren fungerer også i Claude Desktop og Claude-mobilappene når den er lagt til kontoen din.
- **API-nøkkel** -- for Claude Code, eller en konfigurasjonsfil for Claude Desktop. Du oppretter en nøkkel og limer den inn i Claudes innstillinger.

### Claude.ai (web) — egendefinert konnektor {#claudeai-web--custom-connector}

1. I Claude åpner du **Innstillinger → Konnektorer** og klikker **Legg til egendefinert konnektor**. (På Team- og Enterprise-planer må kanskje en eier legge den til for organisasjonen først.)
2. Gi den navnet `B1` og skriv inn server-URLen `https://api.churchapps.org/mcp`, og klikk deretter **Legg til**.
3. Klikk **Koble til**. Et B1-påloggingsvindu åpnes. Logg inn med din B1-konto og velg kirken din hvis du blir bedt om det.
4. Siden **AUTORISERING KREVES** viser appens navn, dataene den ber om (for eksempel **Se personer, husstander og kontaktopplysninger**, eller **Alt B1-kontoen din har tilgang til** hvis den ikke ba om noe smalere), og adressen du sendes tilbake til etter at du har valgt -- kontroller at den er **claude.ai**.
5. Klikk **Tillat**. Du sendes tilbake til Claude, og B1 vises som tilkoblet.

Claude registrerer seg selv hos B1 første gang du kobler til, så siden noterer også at appen registrerte seg selv, og at den aldri kan gjøre mer enn din egen B1-konto kan. For å koble den fra senere går du til **Innstillinger → Utvikler → Tilkoblede apper** i B1Admin og tilbakekaller den.

### Bruke en API-nøkkel {#using-an-api-key}

#### 1. Opprett en API-nøkkel {#1-create-an-api-key}

1. I B1Admin går du til **Innstillinger → Utvikler → API-nøkler**.
2. Klikk **Ny API-nøkkel**, gi den navnet `Claude`, og velg omfangene Claude skal ha. Vanlige startsett:
   - **Assistent som bare leser:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
   - **Lese + legge til notater / oppgaver:** legg til `people:write`
   - **Full operativ assistent:** legg til de tilsvarende `:write`-omfangene du vil ha
3. Lagre. Den fullstendige `cak_…`-nøkkelen vises **én gang** -- kopier den.

Se [API-nøkler](/docs/developer/api/api-keys) for hva hvert omfang tillater.

#### 2. Koble til Claude {#2-connect-claude}

Velg Claude-klienten du bruker:

##### Claude Code (CLI) {#claude-code-cli}

I en terminal:

```bash
claude mcp add --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Det var alt. Skriv `/mcp` i en hvilken som helst Claude Code-økt for å bekrefte at serveren `b1` er tilkoblet, og still deretter Claude et hvilket som helst spørsmål om kirken din.

##### Claude Desktop {#claude-desktop}

Rediger konfigurasjonsfilen til Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Legg til en oppføring for serveren `b1`. Nyere versjoner av Claude Desktop snakker HTTP MCP direkte:

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

Hvis din versjon av Claude Desktop bare støtter stdio-servere, kobler du gjennom `mcp-remote`:

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

Start Claude Desktop på nytt. Konnektorikonet i chatfeltet viser `b1` med tre verktøy (`list_endpoints`, `describe_endpoint`, `api_call`).

### Still Claude et spørsmål {#ask-claude-something}

Når den er koblet til, trengs ingen spesiell syntaks -- Claude finner ut hva som er tilgjengelig underveis. Eksempler:

- *«Hvor mange personer er det i kirken min, og hvilke grupper er aktive?»*
- *«Oppsummer denne månedens gaver per fond.»*
- *«List opp personene som deltok på 10-gudstjenesten sist søndag, men som ikke har vært på en onsdagsgruppe de siste 60 dagene.»*
- *«Skriv et velkomstbrev til de fire personene som ble lagt til denne uken, adressert med fornavn.»*

Bak kulissene kaller Claude MCP-verktøyene -- først for å finne riktig endepunkt, deretter for å hente dataene -- og svarer på vanlig språk.

## Hvordan det fungerer {#how-it-works}

B1 API-et eksponerer ett enkelt MCP-endepunkt på `/mcp`. Claude kobler seg til det, autentiserer med `cak_…`-nøkkelen din eller påloggingen du godkjente, og får tilgang til tre verktøy:

| Verktøy | Hva det gjør |
|---|---|
| `list_endpoints` | Lister REST-endepunktene Claude kan kalle, og kan filtreres på sti. Brukes til å oppdage dem. |
| `describe_endpoint` | Returnerer en kort oppsummering og et eksempel på forespørsel/svar for et bestemt endepunkt. |
| `api_call` | Kaller et REST-endepunkt faktisk, som den autentiserte brukeren. |

Dette er den samme overflaten `/membership/people`, `/giving/donations`, `/attendance/visits` osv. som B1Admin bruker -- alle autorisasjonsregler gjelder på nøyaktig samme måte.

## Sikkerhet og begrensninger {#safety-and-limits}

- **Isolasjon per kirke.** API-nøkkelen eller påloggingen er knyttet til én kirke. Claude har ingen måte å se andre kirkers data.
- **Begrenset av tillatelser.** Hvis du fjerner en tillatelse fra personen som opprettet nøkkelen (eller logget inn) i B1Admin, mister Claude den ved neste kall -- umiddelbart.
- **Kan tilbakekalles.** Slett nøkkelen under **Innstillinger → Utvikler → API-nøkler**, eller tilbakekall claude.ai-tilkoblingen under **Innstillinger → Utvikler → Tilkoblede apper**, så avsluttes Claudes tilgang umiddelbart.
- **Svartelist.** Webhooks fra leverandører, administrasjonsendepunkter for OAuth-klienter og den operatørbegrensede ruten `apiEmails` kan ikke kalles via MCP.
- **Størrelsesgrense for svar.** Ett enkelt verktøysvar er begrenset til 64 KB, slik at lange lister ikke sprenger Claudes kontekst -- Claude vil avgrense spørringen med filtre når dette skjer.
- **Revisjonslogg.** Endringer går gjennom samme revisjonslogg som handlinger i B1Admin; du kan gå gjennom dem under **Innstillinger → Revisjonslogg**.

## Kostnad {#cost}

ChurchApps er gratis og åpen kildekode -- MCP-serveren er en del av API-et kirken din allerede kjører. Anthropic tar betalt for Claude-bruk etter sine planer. Det er ingen kostnad per kall fra ChurchApps.

## Feilsøking {#troubleshooting}

**Claude melder «Unauthorized» eller 401:** bearer-tokenet mangler, er feilformatert, eller nøkkelen er tilbakekalt. Kontroller headeren `Authorization: Bearer cak_…` på nytt (merk mellomrommet og det bokstavelige ordet `Bearer`). På claude.ai kobler du fra og til B1-konnektoren igjen for å logge inn på nytt.

**Et verktøykall gir 403:** API-nøkkelen mangler omfanget for det endepunktet. Legg til omfanget under **Innstillinger → Utvikler → API-nøkler** (du må opprette en ny nøkkel -- omfang kan ikke endres på stedet), og oppdater Claudes konfigurasjon.

**Claude finner ikke et endepunkt:** be den kalle `list_endpoints` med et filter, for eksempel *«bruk list_endpoints med filteret 'donations' for å finne riktig sti»*. Ruteoversikten genereres fra det kjørende API-et, så alt du kan nå med `curl`, finnes der.

**Lokal utvikling:** bytt `https://api.churchapps.org/mcp` ut med `http://localhost:8084/mcp` -- samme autentisering, samme verktøy.

## Relatert {#related}

- [API-nøkler](/docs/developer/api/api-keys) — fullstendig referanse for omfang
- [MCP-server (utviklerreferanse)](/docs/developer/api/mcp) — protokolldetaljer og verktøyskjemaer
- [ChatGPT](./chatgpt) — samme idé, for OpenAIs modeller
