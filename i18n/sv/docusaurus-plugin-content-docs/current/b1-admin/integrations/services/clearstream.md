---
title: "Clearstream"
---

# Clearstream

<div class="article-intro">

Utlös ett [Clearstream](https://clearstream.io)-sms från valfri B1-händelse, till exempel ny person, nytt bidrag, formulärinskickning eller kalenderuppdatering, och hämta svar tillbaka som B1-poster. Clearstreams Zapier-app stöder båda riktningarna, så hela kopplingen är ett recept och inte egen kod.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Ett [Clearstream](https://clearstream.io)-konto med minst en lista och en SMS-kvot
- Ett [Zapier](https://zapier.com)-konto
- En B1Admin-användare med behörigheten **Edit Settings**

</div>

## Vad du kan koppla ihop

| Riktning | Utlösare | Åtgärd |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Create/Update Subscriber + Send Text to Number |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Send Text to List (t.ex. för att meddela ekonomiteamet) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Send Text to List till en fördelningslista (t.ex. bönförfrågningsteamet) |
| Clearstream → B1 | New Incoming Text | B1: Create Person; tagga med nyckelordet som de skickade |

Clearstreams Zapier-åtgärder: *Send Text to Number*, *Send Text to List*, *Create/Update Subscriber*, *Add Subscriber to Automated Workflow*, *Add Tag to Subscriber*, *Remove Subscriber From List*.

## Installation

### 1. Skapa en B1 API-nyckel

**Settings → Developer → API Keys → New API Key**:

- `settings:write`: krävs för att B1 ska kunna registrera utlösarens webhook
- `people:read`: behövs för att slå upp personen från händelsen (`personId` → namn/telefon/e-post)
- (Valfritt) `people:write` om Clearstream-svar ska skapa B1-kontakter

### 2. Bygg Zapen "text vid nytt bidrag"

1. **Trigger**: B1.church: New Donation
2. **Action**: B1.church: Find Person (donationens `personId`)
3. **Action**: Clearstream: Send Text to Number. Använd personens telefonnummer från steg 2 som mottagare och skriv meddelandet (`"Tack för din gåva, {first}! …"`).

Slå på Zapen. B1 registrerar donations-webhooken vid aktivering, och du ser `Zapier — donation.created` under **Settings → Developer → Webhooks**.

### 3. (Valfritt) Hämta svar tillbaka som B1-poster

1. **Trigger**: Clearstream: New Incoming Text
2. **Action**: Filter by Zapier på nyckelordet, till exempel fortsätt bara om textens början är `PRAY`
3. **Action**: B1.church: Find Person (på telefonnummer)
4. **Action**: Filter / Path. Om personen inte hittas, skapa den. I båda fallen sparar du textinnehållet någonstans, till exempel i Slack, i ett Google-kalkylblad eller som ett B1-formulärinskick via Webhooks by Zapier.

## Vanliga recept

### Bemanning av volontärteam

- **Trigger**: B1.church: New Form Submission (filtrerat på bönförfrågningsformulärets id)
- **Action**: Clearstream: Send Text to List, där listan är ditt jourhavande pastoralteam. Skriv meddelandet så här: `Ny bönförfrågan: {data.questions.0.answer}`.

### Uppföljningssekvens för förstagångsbesökare

- **Trigger**: B1.church: New Person, filtrerat på B1-persontaggen "First-time visitor"
- **Action**: Clearstream: Add Subscriber to Automated Workflow. Koppla arbetsflödets id till en färdig 7-dagars sms-serie.

### Nyckelordsstyrd gruppanmälan

- **Trigger**: Clearstream: New Incoming Text (filtrera på nyckelordet `MENS`)
- **Action**: B1.church: Find Person (på telefonnummer). Förgrena vid "inte hittad" till Create Person.
- **Action**: B1.church: Add Group Member till gruppen Men's Ministry

## Begränsningar och noteringar

- **Clearstream räknar SMS per meddelande.** Varje Send Text-åtgärd förbrukar en eller flera krediter beroende på längd och antal mottagare. Kontrollera din plans kvot.
- **Telefonnumret måste vara i E.164-format** (t.ex. `+15555550199`) för *Send Text to Number*. B1:s personpost sparar det som angavs. Använd ett steg *Formatter by Zapier — Numbers → Format Phone Number* om du inte kan garantera formatet.
- **B1 behöver inte skicka någon header.** Clearstreams autentisering finns helt i dess Zapier-anslutning.

## Felsökning

- **Utlösaren aktiveras aldrig**: `Settings → Developer → Webhooks` bör visa en rad `Zapier — <event>` efter att Zapen slagits på. Om den saknas har B1 API-nyckeln inte `settings:write`. Skapa en ny nyckel och anslut på nytt.
- **Clearstream returnerar "Invalid phone number"**: mottagarfältet är inte i E.164-format. Lägg till ett steg för Format Phone Number.
- **Send Text to List misslyckas med `403`**: Clearstreams API-användare saknar behörighet för listan, eller så är listans id fel. Listans id visas på Clearstreams sida för listdetaljer.

## Se även

- [Text In Church](./text-in-church): alternativ SMS-plattform med liknande upplägg
- [Mobile Message](./mobile-message): för församlingar utanför USA
- [Zapier (översikt)](../zapier): B1-sidan av alla Zapier-recept
- [Clearstream API-dokumentation](https://api-docs.clearstream.io/): för egna integrationer utöver Zapier-appen
