---
title: "VOMO"
description: "Koppla VOMO-volontäranmälningar och kioskincheckningar till personer och grupper i B1 Admin med Zapier, inklusive API-nyckelbehörigheter och installationssteg."
---

# VOMO

<div class="article-intro">

VOMO är en plattform för volontärengagemang. Människor anmäler sig till projekt, checkar in vid kiosken och samlar på sig timmar. Om du använder VOMO för volontärschemaläggning men B1 för personregister kan Zapier synkronisera medlemskap och incheckningar mellan dem, så att ingen av sidorna hamnar i otakt.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Ett [VOMO](https://vomo.org)-konto med en plan som exponerar Zapier (kontakta VOMO:s support om du är osäker)
- Ett [Zapier](https://zapier.com)-konto
- En B1Admin-användare med behörigheten **Edit Settings**

</div>

## Vad du kan koppla ihop

VOMO:s Zapier-app erbjuder fyra omedelbara utlösare och fyra åtgärder. Recepten som flest kyrkor vill ha:

| Riktning | Utlösare | Åtgärd |
|---|---|---|
| VOMO → B1 | VOMO Membership (created) | B1: Find Person → Create Person (om ny) |
| VOMO → B1 | VOMO Kiosk check-in | B1: Add Group Member till gruppen ”Currently Serving”, eller registrera som närvaro |
| B1 → VOMO | B1 `person.created` | VOMO: Find Organizer (via e-post); annars ett eget steg |
| Någondera | VOMO Participation (anmälningar) | B1: Add Group Member till projektspecifik grupp |

VOMO-åtgärderna är begränsade till att **skapa utkast till projekt** och **söka efter** befintliga organisatörer och projekt. Det finns för närvarande ingen åtgärd för att lägga till en person i ett VOMO-projekt. Den intressanta kopplingen går främst från VOMO till B1.

## Installation

### 1. Skapa en B1 API-nyckel

**Settings → Developer → API Keys → New API Key**. Behörigheter (scopes):

- `people:read`, `people:write`: för att söka upp och skapa volontärer som B1-personer
- `groups:write`: för att lägga till dem i tjänstegrupper
- (Valfritt) `attendance:write` om du behandlar kioskincheckningar som närvaro

### 2. Bygg Zapen för medlemssynkronisering

1. **Utlösare**: VOMO: Membership (händelse = `created`).
2. **Åtgärd**: B1.church: Find Person, matchad på e-post.
3. **Filter / Path**: förgrena beroende på om personen hittades eller inte:
   - Hittades inte → B1.church: Create Person, följt av Add Group Member till lämplig volontärgrupp.
   - Hittades → B1.church: Add Group Member direkt.
4. Aktivera. Nya VOMO-volontärer visas nu i B1 med rätt gruppmedlemskap.

### 3. (Valfritt) Bygg Zapen för kioskincheckning

1. **Utlösare**: VOMO: Kiosk
2. **Åtgärd**: B1.church: Find Person (via e-post)
3. **Åtgärd**: ditt val:
   - *Om du behandlar det som närvaro*: Webhooks by Zapier skickar ett POST-anrop till B1:s `/attendance/visits`-endpoint (B1:s Zapier-app har ännu ingen egen åtgärd för *Record Attendance*). B1:s [API-nyckel](/docs/developer/api/api-keys) skickas i headern `Authorization: Bearer cak_…`.
   - *Om du behandlar det som gruppmedlemskap*: B1.church: Add Group Member till gruppen ”Currently Serving (Today)”. En andra Zap senare på dagen tar bort dem igen via en schemalagd städning.

## Vanliga recept

### Synkronisering av grupp per projekt

- **Utlösare**: VOMO: Participation (created)
- **Åtgärd**: Filter by Zapier på projekt-id, sedan
- **Åtgärd**: B1.church: Add Group Member till en B1-grupp vars namn speglar VOMO-projektet.

När VOMO-projektet avslutas rensar du B1-gruppen manuellt, eller kombinerar detta med en utlösare för *Participation deleted* som tar bort medlemmarna.

### Skicka ett SMS med ”tack för din anmälan”

Kedja VOMO Participation → Clearstream Send Text eller Text In Church Send Message i samma Zap. Båda har inbyggda Zapier-åtgärder. Se [Clearstream](./clearstream.md) och [Text In Church](./text-in-church.md).

### Upptäck avhopp

Kör en daglig Zapier-utlösare *Schedule* som anropar Find Organizer i VOMO för en lista över B1-personer som gick med i tjänstegruppen den här månaden. Om VOMO svarar ”not found” har de inte aktiverat VOMO och behöver en påminnelse.

## Begränsningar och noteringar

- **E-post är nyckeln för matchning.** VOMO:s data innehåller en användares e-postadress men inget B1-person-id. Givare som använder olika e-postadresser i de två systemen kommer att skapa dubbletter.
- **Ingen åtgärd ”Add to Project” i VOMO:s Zapier-app just nu.** Om du behöver anmäla personer från B1 till ett VOMO-projekt måste du skicka ett POST-anrop till VOMO:s REST API från ett steg i *Webhooks by Zapier*. Det är en egen integration.
- **VOMO:s gratis- eller lägre nivåer inkluderar kanske inte Zapier.** Bekräfta med VOMO:s support innan du lovar ett datum för kopplingen.

## Felsökning

- **Utlösaren aktiveras aldrig**: VOMO:s omedelbara utlösare kräver att API-token förblir giltig. Testa Zapen igen. Anslut VOMO på nytt om token har roterats.
- **B1 *Add Group Member* misslyckas med 422**: gruppens id i åtgärden finns inte. Öppna **B1Admin → Groups**, klicka på gruppen och kopiera id-segmentet från URL:en till Zap-steget.
- **Dubbletter av B1-personer från en och samma VOMO-volontär**: personen har troligen anmält sig med en annan e-postadress än den som redan fanns i B1. Standardisera antingen e-postadresserna, eller lägg till en Zapier *Path* som söker på telefonnummer innan en ny person skapas.

## Se även

- [Zapier (översikt)](../zapier.md): B1-sidan av alla Zapier-recept
- [Clearstream](./clearstream.md), [Text In Church](./text-in-church.md): kombinera volontäranmälningar med SMS-bekräftelser
- [Webhooks (utvecklarreferens)](/docs/developer/api/webhooks): de händelser som VOMO kan utlösa på
