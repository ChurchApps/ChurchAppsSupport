---
title: "API-nøkler"
---

# API-nøkler

<div class="article-intro">

API-nøkler (personlige tilgangstokener) er den enkleste måten å autentisere mot B1 API-et fra et serverbasert skript, en tredjepartskobling (Zapier, Make, Google Sheets) eller hvor som helst en full OAuth-flyt er unødvendig. En nøkkel er knyttet til en bestemt person i en bestemt menighet og arver den personens tillatelser, begrenset av et valgfritt sett med omfang (scopes).

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En menighetsadministrator med tillatelsen **Rediger innstillinger** oppretter og administrerer nøklene
- Den rå nøkkelen vises **én gang** når den opprettes. Lagre den et trygt sted med en gang.
- Alle API-forespørsler må bruke **HTTPS**

</div>

## Nøkkelformat

En B1 API-nøkkel ser slik ut:

```
cak_<prefix>.<secret>
```

- `cak_` -- fast identifikator (API-nøkkelprefikset autentiseringslaget matcher på)
- `<prefix>` -- 8 tegn langt offentlig oppslagssegment
- `<secret>` -- 48 tegn langt hemmelig segment. Bare en SHA-256-hash lagres på serveren.

Den fulle nøkkelen presenteres for serveren i standard bearer-header:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

Autentiseringslaget for API-et sender alle tokener som begynner med `cak_` til API-nøkkelveien. Det hasher hemmeligheten, slår den opp etter prefiks og finner gjeldende tillatelser for nøkkelens person. Når en tillatelse trekkes tilbake i B1Admin, får det derfor effekt på neste forespørsel, og nøkkelen kommer aldri ut av synk med rollen.

## Opprette en nøkkel (B1Admin)

1. Logg inn på B1Admin som bruker med **Rediger innstillinger**.
2. Åpne **Innstillinger → Utvikler → API-nøkler**.
3. Klikk **Ny API-nøkkel**, gi den et lett gjenkjennelig navn (f.eks. "Zapier -- synkronisering av gaver"), velg omfangene nøkkelen skal ha, og klikk **Lagre**.
4. Den fulle `cak_…`-nøkkelen vises **én gang** i en dialog. Kopier den inn i integrasjonens konfigurasjon før du lukker dialogen. Den kan ikke hentes frem senere, men du kan alltid opprette en ny nøkkel.

## Omfang {#scopes}

Et omfang **begrenser** hva en nøkkel kan gjøre. Det kan aldri gi en tillatelse som den underliggende personen ikke har. Tomme omfang betyr at nøkkelen har personens fulle tillatelsessett.

| Omfang | Tillater |
|---|---|
| `people:read` / `people:write` | Se / rediger personer, husstander og gruppemedlemmer |
| `groups:read` / `groups:write` | Se / rediger grupper og medlemskap i dem |
| `donations:read` / `donations:write` | Se / registrer gaver |
| `attendance:read` / `attendance:write` | Se / registrer oppmøte, økter og innsjekkinger |
| `forms:write` | Administrer skjemaer (lesetilgang er implisitt i skrivetilgang) |
| `content:read` / `content:write` | Se / rediger nettstedsinnhold, påmeldinger og streaming |
| `messaging:read` / `messaging:write` | Les meldinger. Skrivetilgang tillater også sending av SMS. |
| `roles:read` / `roles:write` | Se / rediger rolledefinisjoner |
| `settings:read` / `settings:write` | Se / rediger menighetsinnstillinger (**kreves** for å registrere webhooks programmatisk) |
| `workflows:read` / `workflows:write` | Se arbeidsflyter og oppgaver / kjør og rediger arbeidsflyter. Kjøring av en arbeidsflyt kan sende e-post og tekstmeldinger, utløse webhooks og endre gruppemedlemskap. |
| `offline_access` | Tillat langlivede oppdateringstokener (bare for OAuth-flyter, har ingen effekt på API-nøkler) |

Omfanget `write` inkluderer implisitt det tilsvarende `read`. Tillatelser på server- og domenenivå er bevisst ikke eksponert som omfang. En legitimasjon med begrensede omfang kan dermed aldri heve seg til administrasjon av nettstedet.

:::tip
Hvis du skal bruke nøkkelen til å registrere webhooks (for eksempel for en Zapier- eller Make-integrasjon), trenger nøkkelen `settings:write`. En nøkkel med bare `people:read` gir en stille 403-feil på `POST /membership/webhooks`.
:::

## Bruke en nøkkel

Den fungerer som alle andre bearer-tokener. Alle autentiserte endepunkter godtar API-nøkler akkurat som de godtar JWT-er:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

En forespørsel der nøkkelen har for få omfang, får svaret **403 Forbidden** i samme format som alle andre feil ved manglende tillatelse.

## Administrere nøkler via API-et

Alle endepunktene ligger under Membership-modulens bane `/membership/apiKeys`. De krever en JWT (ikke en API-nøkkel) fra en menighetsadministrator med **Rediger innstillinger**.

| Metode og bane | Formål |
|---|---|
| `GET /membership/apiKeys` | Lister menighetens nøkler (uten hemmelighet, bare `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt` og `createdAt`) |
| `GET /membership/apiKeys/scopes` | Liste over alle tilgjengelige omfangsnavn, til bruk i et brukergrensesnitt for oppretting av nøkler |
| `POST /membership/apiKeys` | Oppretter en ny nøkkel. Body: `{ "name": "...", "scopes": ["people:read"] }`. Svaret inneholder den rå `cak_…`-nøkkelen **én gang**. |
| `DELETE /membership/apiKeys/:id` | Tilbakekaller en nøkkel. Det får effekt på neste forespørsel. |

En tilbakekalt nøkkel er borte umiddelbart. Det er ingen karenstid.

## Beste praksis

- **Én nøkkel per integrasjon.** Hvis noe blir kompromittert, tilbakekaller du bare den ene nøkkelen uten å bryte de andre.
- **Bruk de smaleste omfangene som fungerer.** En Google Sheets-eksport trenger bare `people:read`, ikke `settings:write`.
- **Knytt nøkkelen til en tjenestekonto, ikke til en ekte ansatt.** Hvis en ansatt slutter, opphører B1-tilgangen deres, og det gjør også alle nøkler som er opprettet under deres identitet.
- **Lagre nøkler i en hemmelighetsbehandler** (miljøvariablene til hostingleverandøren din, AWS Secrets Manager osv.), aldri i kildekontroll.
- **Roter nøkler** hvis du mistenker eksponering: opprett en ny nøkkel, oppdater integrasjonen og slett deretter den gamle.

## Hvordan den skiller seg fra OAuth

API-nøkler passer når **din menighet er den eneste som bruker integrasjonen**. For en kobling som trenger tilgang til mange menigheter, der hver gir sitt eksplisitte samtykke (som en SaaS-app delt i B1-fellesskapet), bruk i stedet [OAuth og tilkoblede apper](./connected-apps).

| | API-nøkkel | OAuth |
|---|---|---|
| Hvem installerer den | En menighetsadministrator | Hver menighetsadministrator autoriserer appen |
| Autentiseringsheader | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Levetid for token | Til den tilbakekalles | Tilgang ≈ 7 dager, oppdatering ≈ 90 dager |
| Best for | Interne skript, Zapier-/Make-/Sheets-koblinger | Tredjepartsapper med flere tenanter |
