---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Koble OpenAI ChatGPT til kirkens B1-data slik at du kan stille spørsmål som "hvem har ikke vært i en gruppe dette kvartalet?" eller "oppsummer giver for bygningsfonden denne måneden" og få ChatGPT til å hente svarene direkte fra B1. To veier er støttet: en **egendefinert GPT** som fungerer på en ChatGPT Plus-plan, og **MCP-serveren** for utviklerverktøy som støtter det.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En kirkeadministrator med **Rediger innstillinger**-tillatelsen (for å mynte en API-nøkkel)
- En **ChatGPT Plus, Pro, Team eller Enterprise**-konto (den gratis nivået kan ikke bruke egendefinerte GPTer eller koblinger)
- Den fulle URL-adressen til B1-API-en din -- vanligvis `https://api.churchapps.org` for vertskirker, eller din selvvertsette API-vert

</div>

## Velg riktig vei

| Vei | Plan som trengs | Innsats | Hva du får |
|---|---|---|---|
| **Egendefinert GPT med handlinger** | ChatGPT Plus / Team / Enterprise | 10 minutter | En delbar GPT som ringer B1s REST API for noen av laget ditt |
| **MCP via OpenAI-verktøy** | Utvikler / Agent SDK / Pro-koblinger | Mer | Full oppdagelse via MCP-serveren, egnet for kodingsverktøy og agentplattformer |

For de fleste kirker er **egendefinert GPT**-veien det riktige svaret -- det krever ingen utvikleroppsett, fungerer inne i den vanlige ChatGPT-appen og mobilklientene, og kan deles med laget ditt. MCP-veien er dokumentert nedenfor for teknisk stab som bruker OpenAI-utviklerverktøy eller agentplattformer.

## Vei A -- egendefinert GPT med handlinger

Dette kobler ChatGPT direkte til B1 REST API. Din egendefinerte GPT vil kunne lese og (valgfritt) skrive B1-poster på vegne av hvem som bruker det.

### 1. Opprett en API-nøkkel

1. I B1Admin gå til **Innstillinger → Utvikler → API-nøkler**.
2. Klikk **Ny API-nøkkel**, gi den navn `ChatGPT` og velg omfang. Vanlige startmengder:
   - **Skrivebeskyttet assistent:** `people:read`, `groups:read`, `attendance:read`, `donations:read`
   - **Les + skriv:** legg til de tilsvarende `:write`-omfangene
3. Lagre og kopier den fulle `cak_…`-nøkkelen.

Se [API-nøkler](/docs/developer/api/api-keys) for den fulle omfangslisten.

### 2. Bygg den egendefinerte GPTen

1. I ChatGPT klikker du profilen din → **Mine GPTer** → **Opprett en GPT**.
2. Bytt til **Konfigurere**-fanen og gi GPTen et navn (f.eks. "B1-assistent") og instruksjoner.
3. Scroll til **Handlinger** → **Opprett ny handling** → **Godkjenning**.
   - **Godkjenningstype:** API-nøkkel
   - **API-nøkkel:** `cak_<prefix>.<secret>`
   - **Auth-type:** Bærer
   - Lagre.
4. I **Skjema**-boksen limer du inn en minimal OpenAPI-spesifikasjon som beskriver sluttpunktene du vil at GPTen skal bruke.
5. Lagre handlingen. Test det med en melding som *"hvor mange folk er i kirken?"* -- ChatGPT vil ringe `listPeople` og svare.
6. **Publiser** GPTen (bare meg / alle med lenke / organisasjon) og del med laget ditt.

### 3. Bruk det

Alle du deler GPTen med kan stille naturligspråkspørsmål -- ChatGPT plukker riktig handling, ringer B1 og svarer. Nøkkelen omfanger gjelder fortsatt: en skrivebeskyttet nøkkel vil nekte skrivinger uavhengig av handlingen som er definert i skjemaet.

## Vei B -- MCP via OpenAI-verktøy

B1 API inkluderer en MCP-server på `/mcp` som enhver MCP-bevisst OpenAI-verktøy kan bruke -- for eksempel [OpenAI Agents SDK](https://platform.openai.com/docs/guides/agents), Responses API-er MCP-verktøy eller tredjepartsagentplattformer som bruker MCP-servere.

Godkjenn med samme `cak_…`-nøkkel i `Authorization: Bearer`-headeren. Tre verktøy er eksponert: `list_endpoints`, `describe_endpoint` og `api_call`. Se [MCP-serveren for utviklere](/docs/developer/api/mcp) for protokoll, transport og verktøyskjemaer.

## Sikkerhet og grenser

- **Per-kirke isolering.** API-nøkkelen løses til en kirke. ChatGPT kan ikke se andre kirkenes data.
- **Tillatelse-avgrenset.** Hvis du fjerner en tillatelse fra personen som skapte nøkkelen, mister ChatGPT den på neste anrop -- umiddelbar.
- **Tilbakekallbar.** Slett nøkkelen i **Innstillinger → Utvikler → API-nøkler** og ChatGPTs tilgang slutter umiddelbar.
- **Deling av en egendefinert GPT deler dataene.** Alle som har tilgang til GPTen kan stille spørsmål og se det som nøkkelen har omfang for. Begrenset deling til stab som burde se disse dataene, og foretrekk smalere omfang.
- **Revisjonsmonolog.** Mutasjoner går gjennom samme revisjonslogg som B1Admin-handlinger; gjennomgå dem under **Rapporter → Revisjonslogg**.

## Kostnad

ChurchApps er gratis og åpen kilde -- API-en som din egendefinerte GPT ringer er en del av API-en som kirken din allerede kjører. OpenAI belaster for ChatGPT-bruk per deres planer. Det er ingen per-anrop kostnad fra ChurchApps.

## Feilsøking

**Handling returnerer 401:** bearerheadingenen er ikke angitt riktig. I handlingens godkjenningspanel må du sikre at **Auth-type: Bearer** er valgt og nøkkelverdien ikke inkluderer ordet `Bearer`.

**Handling returnerer 403:** nøkkelen har ikke omfang for det sluttpunktet. Mynt en ny nøkkel med riktige omfang og oppdater GPTen.

**ChatGPT kaller feil handling:** stram opp `summary`- og `description`-feltene i OpenAPI-skjemaet slik at modellen plukker riktig. Legger til eksempelspørsmål i GPT-instruksjonene hjelper også.

## Relatert

- [API-nøkler](/docs/developer/api/api-keys) -- full omfangsreferanse
- [MCP-server (developer reference)](/docs/developer/api/mcp) -- protokolldetaljer og verktøyskjemaer
- [Claude](./claude) -- samme idé, for Anthropic-modeller
- [REST API-referanse](/docs/developer/api/endpoints) -- alle sluttpunktene en egendefinert GPT-handling kan treffe
