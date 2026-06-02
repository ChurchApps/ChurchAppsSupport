---
title: "API-nøkler"
---

# API-nøkler

<div class="article-intro">

API-nøkler (personlige tilgangstoken) er den enkleste måten å godkjenne mot B1 API fra et serverside-skript, en tredjeparts kobber (Zapier, Make, Google Sheets), eller hvor som helst en full OAuth-flyt er overkill. En nøkkel er bundet til en spesifikk person i en spesifikk kirke og arver denne personens tillatelser, begrenset av et valgfritt sett med omfang.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En kirkeadmin med tillatelsen **Rediger innstillinger** oppretter og administrerer nøkler
- Råkoden vises **en gang** ved opprettelse -- lagre den på et sikkert sted umiddelbart
- Alle API-forespørsler må bruke **HTTPS**

</div>

## Nøkkelformat

En B1 API-nøkkel ser slik ut:

```
cak_<prefix>.<secret>
```

- `cak_` -- fast identifikator (API-nøkkelprefiks authlaget matcher på)
- `<prefix>` -- 8-tegn offentlig oppslagssegment
- `<secret>` -- 48-tegn hemmelighet; bare en SHA-256-hash lagres på server-siden

Hele nøkkelen presenteres for serveren i standard bærer-header:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

API-auth-laget dirigerer enhver token som starter med `cak_` til API-nøkkelbanen, hasher hemmeligheten, slår den opp etter prefiks og løser gjeldende tillatelser for nøkkelpersonens -- så å tilbakekalle en tillatelse i B1Admin tar effekt på neste forespørsel, og nøkkelen drifter aldri av synkron.

## Opprettelse av en nøkkel (B1Admin)

1. Logg på B1Admin som en bruker med **Rediger innstillinger**.
2. Åpne **Innstillinger → Utvikler → API-nøkler**.
3. Klikk på **Ny API-nøkkel**, gi den et gjenkjennelig navn (f.eks. "Zapier — donasjons-synkronisering"), velg omfangene nøkkelen skal ha, og **Lagre**.
4. Hele `cak_…`-nøkkelen vises **en gang** i en dialog. Kopier den til integrasjonenes konfigurering før du lukker -- det er ingen måte å hente den senere. Du kan alltid opprett en ny nøkkel.

## Omfang

Et omfang **begrenser** hva en nøkkel kan gjøre -- det kan aldri gi en tillatelse som den underliggende personen ikke har. Tomt / ingen omfang betyr at nøkkelen bærer personens fulle tillatelse-sett.

| Omfang | Tillater |
|---|---|
| `people:read` / `people:write` | Vis / rediger mennesker, husstander, gruppmedlemmer |
| `groups:read` / `groups:write` | Vis / rediger grupper og deres medlemskap |
| `donations:read` / `donations:write` | Vis / registrer donasjoner |
| `attendance:read` / `attendance:write` | Vis / registrer frammøte, sesjoner, sjekk-inn |
| `forms:write` | Administrer skjemaer (lese-tilgang er underforstått i skriving) |
| `content:read` / `content:write` | Vis / rediger nettstedinnhold, registreringer, streaming |
| `messaging:read` / `messaging:write` | Les meldinger; skriving tillater også sending av SMS |
| `roles:read` / `roles:write` | Vis / rediger rolle-definisjoner |
| `settings:read` / `settings:write` | Vis / rediger kirkens innstillinger (**kreves** for å registrere webhooks programmatisk) |
| `offline_access` | Tillat langlivet oppfrisknings-token (bare OAuth-flytene -- har ingen effekt på API-nøkler) |

`write`-omfang inkluderer underforstått matchende `read`. Server- og domene-admin-tillatelser eksponeres bevisst ikke som omfang -- en avgrenset legitimitet kan aldri øke til nettstedadministrasjon.

:::tip
Hvis du bruker nøkkelen til å registrere webhooks (f.eks. for en Zapier- eller Make-integrasjon), trenger nøkkelen `settings:write`. En `people:read`-bare nøkkel stiller i stille 403s på `POST /membership/webhooks`.
:::

## Bruk av en nøkkel

Samme som noen bærer token -- hver autentisert sluttpunkt godtar API-nøkler på samme måte som den godtar JWTs:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

En forespørsel hvis nøkkel har utilstrekkelig omfang svarer **403 Forbidden** med samme form som enhver tillatelse-nektet feil bruker.

## Administrering av nøkler via API-en

Alle sluttpunkter er under medlemskapsmodulens `/membership/apiKeys`-bane og krever en JWT (ikke en API-nøkkel) fra en kirkeadmin med **Rediger innstillinger**.

| Metode og vei | Formål |
|---|---|
| `GET /membership/apiKeys` | List kirkens nøkler (ingen hemmelighet -- bare `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Liste over alle tilgjengelige omfang-navn -- for en nøkkeloppretting-UI |
| `POST /membership/apiKeys` | Opprett en ny nøkkel. Kropp: `{ "name": "...", "scopes": ["people:read"] }`. Responsen inkluderer den råkode `cak_…`-nøkkelen **en gang**. |
| `DELETE /membership/apiKeys/:id` | Tilbakekall en nøkkel -- tar effekt på neste forespørsel |

En tilbakekalt nøkkel er weg umiddelbart -- det er ingen grasiøs periode.

## Best Practices

- **En nøkkel per integrasjon.** Hvis noe blir kompromittert tilbakekaller du en enkelt nøkkel uten å bryte de andre.
- **Mint det smaleste omfang som fungerer.** En Google Sheets-eksport trenger bare `people:read`, ikke `settings:write`.
- **Bind nøkkelen til en servicekonto, ikke et ekte ansatt.** Hvis et ansatt forlater må deres B1-tilgang ende -- og så gjør alle nøkler som er preget under deres identitet.
- **Lagre nøkler i en hemmelighetshåndterer** (din hosting-leverandørs miljøvariabler, AWS Secrets Manager, osv.) -- aldri i kildekontroll.
- **Roter nøkler** hvis du mistenker eksponering: opprett en ny nøkkel, oppdater integrasjonen, slett deretter den gamle.

## Hvordan det skiller seg fra OAuth

API-nøkler er passende når **kirken din er den eneste som bruker integrasjonen**. For en kobber som trenger å få tilgang til mange kirker med hvert enkelt eksplisitt samtykke -- som en SaaS-app som deles på tvers av B1-fellesskapet -- bruk [OAuth og tilkoblede apper](./connected-apps) i stedet.

| | API-nøkkel | OAuth |
|---|---|---|
| Hvem installerer det | En kirkeadmin | Hver kirkeadmin godkjenner appen |
| Auth-header | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Token-levetid | Inntil tilbakekalt | Tilgang ≈ 7 dager, oppfrisk ≈ 90 dager |
| Best for | Interne skript, Zapier/Make/Sheets-koblinger | Multi-leier tredjeparts apper |
