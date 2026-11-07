---
title: "API-nycklar"
---

# API-nycklar

<div class="article-intro">

API-nycklar (personliga åtkomsttokens) är det enklaste sättet att autentisera mot B1:s API från ett serverbaserat skript, en tredjepartskoppling (Zapier, Make, Google Sheets) eller i alla situationer där ett fullständigt OAuth-flöde är överdrivet. En nyckel är kopplad till en specifik person i en specifik kyrka och ärver den personens behörigheter, begränsade av en valfri uppsättning omfattningar.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- En kyrkadministratör med behörigheten **Edit Settings** skapar och hanterar nycklar
- Den råa nyckeln visas **en gång** när den skapas. Spara den på ett säkert ställe direkt
- Alla API-anrop måste använda **HTTPS**

</div>

## Nyckelformat

En B1 API-nyckel ser ut så här:

```
cak_<prefix>.<secret>
```

- `cak_` — fast identifierare (API-nyckelprefixet som autentiseringslagret matchar mot)
- `<prefix>` — offentligt uppslagssegment på 8 tecken
- `<secret>` — hemlighet på 48 tecken. Endast en SHA-256-hash lagras på servern

Den fullständiga nyckeln skickas till servern i standardhuvudet för bearer-token:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

API:ets autentiseringslager skickar alla token som börjar med `cak_` till API-nyckelvägen, hashar hemligheten, slår upp den via prefixet och hämtar nyckelns persons aktuella behörigheter. Om du återkallar en behörighet i B1Admin träder det därför i kraft vid nästa anrop, och nyckeln kommer aldrig ur synk med rollen.

## Skapa en nyckel (B1Admin)

1. Logga in i B1Admin som en användare med **Edit Settings**.
2. Öppna **Settings → Developer → API Keys**.
3. Klicka på **New API Key**, ge den ett igenkännbart namn (t.ex. "Zapier — synk av donationer), välj de omfattningar nyckeln ska ha och klicka på **Save**.
4. Den fullständiga `cak_…`-nyckeln visas **en gång** i en dialogruta. Kopiera den till integrationens konfiguration innan du stänger dialogrutan. Det finns inget sätt att hämta den senare, men du kan alltid skapa en ny nyckel.

## Omfattningar

En omfattning **begränsar** vad en nyckel kan göra. Den kan aldrig ge en behörighet som den underliggande personen inte har. Om inga omfattningar anges får nyckeln hela personens behörighetsuppsättning.

| Omfattning | Tillåter |
|---|---|
| `people:read` / `people:write` | Visa / redigera personer, hushåll, gruppmedlemmar |
| `groups:read` / `groups:write` | Visa / redigera grupper och deras medlemskap |
| `donations:read` / `donations:write` | Visa / registrera donationer |
| `attendance:read` / `attendance:write` | Visa / registrera närvaro, sessioner, incheckningar |
| `forms:write` | Hantera formulär (läsåtkomst ingår implicit i skrivåtkomst) |
| `content:read` / `content:write` | Visa / redigera webbplatsinnehåll, registreringar, streaming |
| `messaging:read` / `messaging:write` | Läsa meddelanden. Skrivåtkomst tillåter även att skicka SMS |
| `roles:read` / `roles:write` | Visa / redigera rolldefinitioner |
| `settings:read` / `settings:write` | Visa / redigera kyrkans inställningar (**krävs** för att registrera webhooks programmatiskt) |
| `workflows:read` / `workflows:write` | Visa arbetsflöden och uppgifter / köra och redigera arbetsflöden. Att köra ett arbetsflöde kan skicka e-post och SMS, utlösa webhooks och ändra gruppmedlemskap |
| `offline_access` | Tillåter långlivade uppdateringstokens (endast OAuth-flöden, har ingen effekt på API-nycklar) |

`write`-omfattningar inkluderar implicit motsvarande `read`. Behörigheter för server- och domänadministratörer exponeras medvetet inte som omfattningar. En omfattningsbegränsad credential kan aldrig eskalera till webbplatsadministration.

:::tip
Om du ska använda nyckeln för att registrera webhooks (t.ex. för en Zapier- eller Make-integration) behöver nyckeln `settings:write`. En nyckel med endast `people:read` får tyst ett 403-svar på `POST /membership/webhooks`.
:::

## Använda en nyckel

Samma som för alla bearer-token. Varje autentiserad endpoint accepterar API-nycklar precis som JWT:er:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

Ett anrop vars nyckel saknar tillräckliga omfattningar svarar med **403 Forbidden**, i samma format som alla andra felmeddelanden om nekad behörighet.

## Hantera nycklar via API:et

Alla endpoints ligger under Membership-modulens sökväg `/membership/apiKeys` och kräver en JWT (inte en API-nyckel) från en kyrkadministratör med **Edit Settings**.

| Metod och sökväg | Syfte |
|---|---|
| `GET /membership/apiKeys` | Lista kyrkans nycklar (utan hemlighet, endast `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Lista alla tillgängliga omfattningsnamn, till exempel för ett gränssnitt för att skapa nycklar |
| `POST /membership/apiKeys` | Skapa en ny nyckel. Body: `{ "name": "...", "scopes": ["people:read"] }`. Svaret innehåller den råa `cak_…`-nyckeln **en gång**. |
| `DELETE /membership/apiKeys/:id` | Återkalla en nyckel. Träder i kraft vid nästa anrop |

En återkallad nyckel slutar fungera omedelbart. Det finns ingen övergångsperiod.

## Bästa praxis

- **En nyckel per integration.** Om något komprometteras återkallar du bara den nyckeln utan att bryta de andra.
- **Skapa med smalast möjliga omfattningar.** En export till Google Sheets behöver bara `people:read`, inte `settings:write`.
- **Koppla nyckeln till ett tjänstekonto, inte till en riktig medarbetare.** Om en medarbetare slutar upphör deras åtkomst till B1, och alla nycklar som skapats under deras identitet upphör också.
- **Lagra nycklar i en hemlighetshanterare** (hostingleverantörens miljövariabler, AWS Secrets Manager o.s.v.), aldrig i källkodshantering.
- **Byt ut nycklar** om du misstänker att de har röjts. Skapa en ny nyckel, uppdatera integrationen och ta sedan bort den gamla.

## Skillnaden mot OAuth

API-nycklar passar när **din kyrka är den enda som använder integrationen**. För en koppling som behöver nå många kyrkor, där varje kyrka uttryckligen godkänner åtkomsten, till exempel en SaaS-app som delas inom B1-communityt, använd i stället [OAuth och anslutna appar](./connected-apps).

| | API-nyckel | OAuth |
|---|---|---|
| Vem installerar den | En kyrkadministratör | Varje kyrkadministratör godkänner appen |
| Autentiseringshuvud | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Tokens livslängd | Tills den återkallas | Åtkomst ≈ 7 dagar, uppdatering ≈ 90 dagar |
| Bäst för | Interna skript, Zapier/Make/Sheets-kopplingar | Tredjepartsappar för flera kunder |
