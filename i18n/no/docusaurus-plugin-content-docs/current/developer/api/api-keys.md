---
title: "API-nøkler"
---

# API-nøkler {#api-keys}

<div class="article-intro">

API-nøkler (personlige tilgangstokener) er den enkleste måten å autentisere mot B1 API fra et serverskript, en tredjeparts-connector (Zapier, Make, Google Sheets) eller der en full OAuth-flyt er unødvendig. En nøkkel er knyttet til en bestemt person i en bestemt kirke og arver denne personens tillatelser, begrenset av et valgfritt sett med scopes.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En kirkeadministrator med tillatelsen **Rediger innstillinger** oppretter og administrerer nøkler
- Den rå nøkkelen vises **én gang** ved opprettelse – lagre den et trygt sted med en gang
- Alle API-forespørsler må bruke **HTTPS**

</div>

## Nøkkelformat {#key-format}

En B1 API-nøkkel ser slik ut:

```
cak_<prefix>.<secret>
```

- `cak_` – fast identifikator (API-nøkkelprefikset autentiseringslaget matcher på)
- `<prefix>` – 8 tegn langt offentlig oppslagssegment
- `<secret>` – 48 tegn lang hemmelighet; bare en SHA-256-hash lagres på serversiden

Hele nøkkelen sendes til serveren i standard bearer-header:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

Autentiseringslaget i API-et sender ethvert token som begynner med `cak_` til API-nøkkelstien, hasher hemmeligheten, slår den opp etter prefiks og henter nøkkelpersonens gjeldende tillatelser. Hvis du fjerner en tillatelse i B1Admin, får det dermed effekt ved neste forespørsel, og nøkkelen kommer aldri ut av synk med rollen.

## Opprette en nøkkel (B1Admin) {#creating-a-key-b1admin}

1. Logg inn på B1Admin som bruker med **Rediger innstillinger**.
2. Åpne **Innstillinger → Utvikler → API-nøkler**.
3. Klikk **Ny API-nøkkel**, gi den et gjenkjennelig navn (f.eks. «Zapier – donasjonssynk»), velg scopene nøkkelen skal ha, og klikk **Lagre**.
4. Den fullstendige `cak_…`-nøkkelen vises **én gang** i en dialog. Kopier den inn i integrasjonens konfigurasjon før du lukker den – det finnes ingen måte å hente den igjen senere. Du kan alltid opprette en ny nøkkel.

## Scopes {#scopes}

Et scope **begrenser** hva en nøkkel kan gjøre – det kan aldri gi en tillatelse som den underliggende personen ikke har. Tomme scopes betyr at nøkkelen har personens fulle tillatelsessett.

| Scope | Tillater |
|---|---|
| `people:read` / `people:write` | Se / rediger personer, husstander, gruppemedlemmer |
| `groups:read` / `groups:write` | Se / rediger grupper og medlemskap i dem |
| `donations:read` / `donations:write` | Se / registrer gaver |
| `attendance:read` / `attendance:write` | Se / registrer oppmøte, økter og innsjekkinger |
| `forms:write` | Administrer skjemaer (lesetilgang er underforstått i skrivetilgang) |
| `content:read` / `content:write` | Se / rediger nettsideinnhold, påmeldinger og strømming |
| `messaging:read` / `messaging:write` | Les meldinger; skrivetilgang tillater også sending av SMS |
| `roles:read` / `roles:write` | Se / rediger rolledefinisjoner |
| `settings:read` / `settings:write` | Se / rediger kirkeinnstillinger (**kreves** for å registrere webhooks programmatisk) |
| `workflows:read` / `workflows:write` | Se arbeidsflyter og oppgaver / kjør og rediger arbeidsflyter. Kjøring av en arbeidsflyt kan sende e-post og tekstmeldinger, utløse webhooks og endre gruppemedlemskap |
| `offline_access` | Tillat langvarige oppdateringstokener (kun OAuth-flyter – har ingen effekt på API-nøkler) |

`write`-scopes inkluderer implisitt det tilsvarende `read`. Server- og domeneadministratortillatelser er bevisst ikke eksponert som scopes – en scopet legitimasjon kan aldri heve seg til administrasjon av nettstedet.

:::tip
Hvis du skal bruke nøkkelen til å registrere webhooks (f.eks. for en Zapier- eller Make-integrasjon), trenger nøkkelen `settings:write`. En nøkkel med kun `people:read` får stille 403 på `POST /membership/webhooks`.
:::

## Bruke en nøkkel {#using-a-key}

Samme som ethvert bearer-token – alle autentiserte endepunkter godtar API-nøkler akkurat som de godtar JWT-er:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

En forespørsel der nøkkelen har utilstrekkelige scopes, svarer **403 Forbidden** med samme format som andre tillatelsesfeil.

## Administrere nøkler via API {#managing-keys-via-the-api}

Alle endepunkter ligger under Membership-modulens `/membership/apiKeys`-sti og krever en JWT (ikke en API-nøkkel) fra en kirkeadministrator med **Rediger innstillinger**.

| Metode og sti | Formål |
|---|---|
| `GET /membership/apiKeys` | List kirkens nøkler (uten hemmelighet – bare `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Liste over alle tilgjengelige scope-navn – til bruk i et grensesnitt for opprettelse av nøkler |
| `POST /membership/apiKeys` | Opprett en ny nøkkel. Body: `{ "name": "...", "scopes": ["people:read"] }`. Svaret inneholder den rå `cak_…`-nøkkelen **én gang**. |
| `DELETE /membership/apiKeys/:id` | Tilbakekall en nøkkel – får effekt ved neste forespørsel |

En tilbakekalt nøkkel er borte umiddelbart – det finnes ingen karenstid.

## Beste praksis {#best-practices}

- **En nøkkel per integrasjon.** Hvis noe blir kompromittert, tilbakekaller du en enkelt nøkkel uten å ødelegge de andre.
- **Lag de smaleste scopene som fungerer.** En Google Sheets-eksport trenger bare `people:read`, ikke `settings:write`.
- **Knytt nøkkelen til en tjenestekonto, ikke en ekte ansatt.** Hvis en ansatt slutter, opphører tilgangen deres til B1 – og det samme gjelder nøkler som er laget under deres identitet.
- **Lagre nøkler i en hemmelighetsbehandler** (hostingleverandørens miljøvariabler, AWS Secrets Manager osv.) – aldri i kildekontroll.
- **Roter nøkler** hvis du mistenker eksponering: opprett en ny nøkkel, oppdater integrasjonen, og slett deretter den gamle.

## Hvordan den skiller seg fra OAuth {#how-it-differs-from-oauth}

API-nøkler passer når **kirken din er den eneste som bruker integrasjonen**. For en connector som må få tilgang til mange kirker, med hver enkelt sitt eksplisitte samtykke – som en SaaS-app delt i B1-fellesskapet – bruk i stedet [OAuth og tilkoblede apper](./connected-apps).

| | API-nøkkel | OAuth |
|---|---|---|
| Hvem installerer den | Én kirkeadministrator | Hver kirkeadministrator autoriserer appen |
| Autentiseringsheader | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Tokenets levetid | Til den tilbakekalles | Tilgang ≈ 7 dager, oppfrisking ≈ 90 dager |
| Best for | Interne skript, Zapier/Make/Sheets-connectorer | Tredjepartsapper for mange kirker |
