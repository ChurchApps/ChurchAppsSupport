---
title: "API-nøkler"
description: "Opprett, avgrens og tilbakekall B1 API-nøkler i B1 Admin for serverskript og Zapier-, Make- eller Google Sheets-koblinger, uten en full OAuth-flyt."
---

# API-nøkler

<div class="article-intro">

API-nøkler (personlige tilgangstokener) er den enkleste måten å autentisere mot B1 API-et fra et serverskript, en koblingstjeneste fra tredjepart (Zapier, Make, Google Sheets), eller ethvert sted der en full OAuth-flyt er unødvendig tung. En nøkkel er knyttet til en bestemt person i en bestemt menighet og arver personens tillatelser, avgrenset av et valgfritt sett med omfang.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En menighetsadministrator med tillatelsen **Rediger innstillinger** oppretter og administrerer nøklene
- Den rå nøkkelen vises **én gang** ved opprettelse -- lagre den et trygt sted med en gang
- Alle API-forespørsler må bruke **HTTPS**

</div>

## Nøkkelformat {#key-format}

En B1 API-nøkkel ser slik ut:

```
cak_<prefix>.<secret>
```

- `cak_` -- fast identifikator (API-nøkkelprefikset autentiseringslaget bruker for å gjenkjenne den)
- `<prefix>` -- 8 tegn langt offentlig oppslagssegment
- `<secret>` -- 48 tegn lang hemmelighet. Bare en SHA-256-hash lagres på serveren

Den fullstendige nøkkelen sendes til serveren i den vanlige bearer-headeren:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

Autentiseringslaget for API-et sender alle tokener som starter med `cak_` til API-nøkkelbanen, hasher hemmeligheten, slår opp nøkkelen etter prefiks og henter personens gjeldende tillatelser. Derfor trer det i kraft ved neste forespørsel når du fjerner en tillatelse i B1Admin, og nøkkelen kommer aldri ut av synk med rollen.

## Opprette en nøkkel (B1Admin) {#creating-a-key-b1admin}

1. Logg inn i B1Admin som en bruker med **Rediger innstillinger**.
2. Åpne **Innstillinger → Utvikler → API-nøkler**.
3. Klikk på **Ny API-nøkkel**, gi den et gjenkjennelig **Navn** (f.eks. «Zapier -- synkronisering av gaver»), velg minst ett av **omfangene** nøkkelen skal ha, velg eventuelt en **Utløper**-dato (la feltet stå tomt for en nøkkel som aldri utløper), og **Lagre**.
4. Den fullstendige `cak_…`-nøkkelen vises **én gang** i en dialog. Kopier den inn i konfigurasjonen for integrasjonen din før du lukker dialogen. Den kan ikke hentes frem senere. Du kan alltid opprette en ny nøkkel.

## Omfang {#scopes}

Et omfang **avgrenser** hva en nøkkel kan gjøre. Den kan aldri gi en tillatelse som personen den tilhører ikke har. Tomme omfang betyr at nøkkelen har personens fulle tillatelsessett. B1Admin krever alltid minst ett omfang, så en nøkkel uten omfang kan bare opprettes gjennom API-et.

| Omfang | Tillater |
|---|---|
| `people:read` / `people:write` | Vise / redigere personer, husstander, gruppemedlemmer |
| `groups:read` / `groups:write` | Vise / redigere grupper og medlemskap i dem |
| `donations:read` / `donations:write` | Vise / registrere gaver |
| `attendance:read` / `attendance:write` | Vise / registrere oppmøte, økter, innsjekkinger |
| `forms:write` | Administrere skjemaer (lesetilgang følger implisitt av skrivetilgang) |
| `content:read` / `content:write` | Vise / redigere innhold på nettstedet, påmeldinger, direktesending |
| `messaging:read` / `messaging:write` | Lese meldinger. Skrivetilgang tillater også sending av SMS |
| `roles:read` / `roles:write` | Vise / redigere rolledefinisjoner |
| `settings:read` / `settings:write` | Vise / redigere innstillinger for menigheten (**kreves** for å registrere webhooks programmatisk) |
| `workflows:read` / `workflows:write` | Vise arbeidsflyter og oppgaver / kjøre og redigere arbeidsflyter. Å kjøre en arbeidsflyt kan sende e-post og tekstmeldinger, utløse webhooks og endre gruppemedlemskap |
| `offline_access` | Tillater langvarige oppdateringstokener (bare for OAuth-flyter -- har ingen effekt på API-nøkler) |

`write`-omfang inkluderer implisitt det tilsvarende `read`-omfanget. Tillatelser for server- og domeneadministrasjon er bevisst ikke eksponert som omfang. En avgrenset legitimasjon kan aldri heves til administrasjon av nettstedet.

:::tip
Hvis du skal bruke nøkkelen til å registrere webhooks (f.eks. for en Zapier- eller Make-integrasjon), trenger nøkkelen `settings:write`. En nøkkel med bare `people:read` får stille 403 på `POST /membership/webhooks`.
:::

## Bruke en nøkkel {#using-a-key}

Den brukes som et hvilket som helst bearer-token. Alle autentiserte endepunkter godtar API-nøkler akkurat som JWT-er:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

En forespørsel der nøkkelen har utilstrekkelige omfang, får svaret **403 Forbidden** med samme struktur som alle andre feil om manglende tillatelse.

## Administrere nøkler via API-et {#managing-keys-via-the-api}

Alle endepunkter ligger under `/membership/apiKeys` i Membership-modulen og krever en JWT (ikke en API-nøkkel) fra en menighetsadministrator med **Rediger innstillinger**.

| Metode og sti | Formål |
|---|---|
| `GET /membership/apiKeys` | Lister menighetens nøkler (uten hemmeligheten -- bare `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Liste over alle tilgjengelige omfangsnavn -- til et brukergrensesnitt for oppretting av nøkler |
| `POST /membership/apiKeys` | Oppretter en ny nøkkel. Body: `{ "name": "...", "scopes": ["people:read"] }`. Svaret inneholder den rå `cak_…`-nøkkelen **én gang** |
| `DELETE /membership/apiKeys/:id` | Tilbakekaller en nøkkel -- trer i kraft ved neste forespørsel |

En tilbakekalt nøkkel er borte med en gang -- det finnes ingen karenstid.

## Beste praksis {#best-practices}

- **Én nøkkel per integrasjon.** Hvis noe blir kompromittert, tilbakekaller du bare den ene nøkkelen uten å ødelegge de andre.
- **Bruk de smalest mulige omfangene som fungerer.** En eksport til Google Sheets trenger bare `people:read`, ikke `settings:write`.
- **Knytt nøkkelen til en tjenestekonto, ikke en faktisk ansatt.** Hvis en ansatt slutter, avsluttes vedkommendes B1-tilgang -- og dermed også eventuelle nøkler opprettet under vedkommendes identitet.
- **Lagre nøkler i en hemmelighetsbehandler** (miljøvariablene til hosting-leverandøren din, AWS Secrets Manager osv.) -- aldri i kildekontroll.
- **Roter nøkler** hvis du mistenker eksponering: opprett en ny nøkkel, oppdater integrasjonen, og slett deretter den gamle.

## Hvordan dette skiller seg fra OAuth {#how-it-differs-from-oauth}

API-nøkler passer når **din menighet er den eneste som bruker integrasjonen**. For en kobling som må få tilgang til mange menigheter, der hver enkelt menighet gir uttrykkelig samtykke -- for eksempel en SaaS-app som deles i B1-fellesskapet -- bruk i stedet [OAuth og tilkoblede apper](./connected-apps.md).

| | API-nøkkel | OAuth |
|---|---|---|
| Hvem installerer den | Én menighetsadministrator | Hver menighetsadministrator autoriserer appen |
| Autentiseringsheader | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Tokenlevetid | Til den tilbakekalles | Tilgang ≈ 7 dager, oppdatering ≈ 90 dager |
| Best egnet til | Interne skript, Zapier/Make/Sheets-koblinger | Flerleietakerapper fra tredjepart |
