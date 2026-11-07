---
title: "API-nøgler"
---

# API-nøgler

<div class="article-intro">

API-nøgler (personlige adgangstokens) er den enkleste måde at autentificere sig mod B1 API'et fra et serverscript, en tredjepartsforbindelse (Zapier, Make, Google Sheets) eller et andet sted, hvor et fuldt OAuth-flow er for omfattende. En nøgle er knyttet til en bestemt person i en bestemt kirke og arver den persons tilladelser, indsnævret af et valgfrit sæt scopes.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- En kirkeadministrator med tilladelsen **Rediger indstillinger** opretter og administrerer nøgler
- Den rå nøgle vises **én gang** ved oprettelsen — gem den et sikkert sted med det samme
- Alle API-anmodninger skal bruge **HTTPS**

</div>

## Nøgleformat

En B1 API-nøgle ser sådan ud:

```
cak_<prefix>.<secret>
```

- `cak_` — fast identifikator (API-nøglens præfiks, som autentifikationslaget matcher på)
- `<prefix>` — offentligt opslagssegment på 8 tegn
- `<secret>` — hemmelighed på 48 tegn; kun en SHA-256-hash gemmes på serversiden

Den fulde nøgle sendes til serveren i den almindelige bearer-header:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

API-autentifikationslaget sender ethvert token, der begynder med `cak_`, til API-nøgle-stien, hashér hemmeligheden, slår den op via præfikset og finder nøglens persons aktuelle tilladelser. Når du tilbagekalder en tilladelse i B1Admin, træder den derfor i kraft ved næste anmodning, og nøglen kommer aldrig ud af synkronisering med rollen.

## Oprettelse af en nøgle (B1Admin)

1. Log ind på B1Admin som en bruger med **Rediger indstillinger**.
2. Åbn **Indstillinger → Udvikler → API-nøgler**.
3. Klik på **Ny API-nøgle**, giv den et genkendeligt navn (f.eks. "Zapier — donationssynkronisering"), vælg de scopes nøglen skal have, og klik på **Gem**.
4. Den fulde `cak_…`-nøgle vises **én gang** i en dialog. Kopiér den ind i din integrations konfiguration, før du lukker dialogen — den kan ikke hentes igen senere. Du kan altid oprette en ny nøgle.

## Scopes

Et scope **indsnævrer** hvad en nøgle kan gøre — det kan aldrig give en tilladelse, som den underliggende person ikke har. Ingen scopes betyder, at nøglen har personens fulde tilladelsessæt.

| Scope | Tillader |
|---|---|
| `people:read` / `people:write` | Se / rediger personer, husstande, gruppemedlemmer |
| `groups:read` / `groups:write` | Se / rediger grupper og deres medlemskab |
| `donations:read` / `donations:write` | Se / registrer donationer |
| `attendance:read` / `attendance:write` | Se / registrer fremmøde, sessioner, check-ins |
| `forms:write` | Administrer formularer (læseadgang er implicit i skriveadgang) |
| `content:read` / `content:write` | Se / rediger webstedsindhold, tilmeldinger, streaming |
| `messaging:read` / `messaging:write` | Læs beskeder; skriveadgang tillader også afsendelse af SMS |
| `roles:read` / `roles:write` | Se / rediger rolledefinitioner |
| `settings:read` / `settings:write` | Se / rediger kirkeindstillinger (**påkrævet** for at registrere webhooks programmatisk) |
| `workflows:read` / `workflows:write` | Se workflows og opgaver / kør og rediger workflows. Kørsel af et workflow kan sende e-mails og sms'er, udløse webhooks og ændre gruppemedlemskab |
| `offline_access` | Tillader langvarige opdateringstokens (kun OAuth-flows — har ingen effekt på API-nøgler) |

`write`-scopes inkluderer implicit det tilsvarende `read`. Tilladelser for server- og domæneadministratorer er bevidst ikke eksponeret som scopes — en scoped legitimation kan aldrig øge sine rettigheder til webstedsadministration.

:::tip
Hvis du vil bruge nøglen til at registrere webhooks (f.eks. til en Zapier- eller Make-integration), skal nøglen have `settings:write`. En nøgle med kun `people:read` returnerer stille 403 på `POST /membership/webhooks`.
:::

## Brug af en nøgle

Det samme som ethvert bearer-token — alle godkendte endpoints accepterer API-nøgler præcis som JWT'er:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

En anmodning, hvis nøgle har utilstrækkelige scopes, får svaret **403 Forbidden** i samme format, som enhver fejl ved manglende tilladelse bruger.

## Administration af nøgler via API'et

Alle endpoints ligger under Membership-modulets sti `/membership/apiKeys` og kræver et JWT (ikke en API-nøgle) fra en kirkeadministrator med **Rediger indstillinger**.

| Metode og sti | Formål |
|---|---|
| `GET /membership/apiKeys` | List kirkens nøgler (uden hemmelighed — kun `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Liste over alle tilgængelige scope-navne — til en brugerflade for oprettelse af nøgler |
| `POST /membership/apiKeys` | Opret en ny nøgle. Body: `{ "name": "...", "scopes": ["people:read"] }`. Svaret indeholder den rå `cak_…`-nøgle **én gang**. |
| `DELETE /membership/apiKeys/:id` | Tilbagekald en nøgle — træder i kraft ved næste anmodning |

En tilbagekaldt nøgle er straks ugyldig — der er ingen karensperiode.

## Bedste praksis

- **Én nøgle pr. integration.** Hvis noget bliver kompromitteret, tilbagekalder du kun den ene nøgle uden at ødelægge de andre.
- **Opret de smallest mulige scopes, der fungerer.** En Google Sheets-eksport har kun brug for `people:read`, ikke `settings:write`.
- **Knyt nøglen til en tjenestekonto, ikke til en rigtig medarbejder.** Hvis en medarbejder stopper, ophører deres B1-adgang — og det gør også alle nøgler, der er oprettet under deres identitet.
- **Gem nøgler i en secret manager** (dit hostingudbyders miljøvariabler, AWS Secrets Manager osv.) — aldrig i kildekodestyring.
- **Roter nøgler**, hvis du har mistanke om, at de er blevet eksponeret: opret en ny nøgle, opdater integrationen, og slet derefter den gamle.

## Hvordan det adskiller sig fra OAuth

API-nøgler er velegnede, når **din kirke er den eneste, der bruger integrationen**. For en forbindelse, der skal have adgang til mange kirker, hvor hver enkelt giver eksplicit samtykke — som en SaaS-app, der deles i B1-fællesskabet — bør du i stedet bruge [OAuth og tilsluttede apps](./connected-apps).

| | API-nøgle | OAuth |
|---|---|---|
| Hvem installerer den | Én kirkeadministrator | Hver kirkeadministrator godkender appen |
| Auth-header | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Tokens levetid | Indtil den tilbagekaldes | Adgang ≈ 7 dage, opdatering ≈ 90 dage |
| Bedst til | Interne scripts, Zapier/Make/Sheets-forbindelser | Tredjepartsapps med flere lejere |
