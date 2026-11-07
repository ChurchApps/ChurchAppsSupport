---
title: "Checkr"
description: "Koppla B1 Admin-anmälningar av volontärer till Checkr-bakgrundskontroller via Make.com, med valfria statusaviseringar till din koordinator för trygg verksamhet."
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) sköter bakgrundskontroller för anställda och volontärer, ett nästan allmänt behov för alla kyrkor som har barn- eller ungdomsverksamhet. B1 har **ingen inbyggd funktion för bakgrundskontroller**. Beställning av kontroller, uppföljning av resultat och efterlevnad av screeningkrav sköts alla i Checkr. Receptet nedan kopplar bara B1-händelser till Checkr. Checkr har ingen Zapier-app, men [Make.coms Checkr-integration](https://www.make.com/en/integrations/checkr) är verifierad och innehåller de åtgärder du behöver för att starta en kontroll från en B1-händelse.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Ett [Checkr](https://checkr.com)-konto med API-åtkomst och minst ett konfigurerat screeningpaket
- Ett [Make](https://www.make.com)-konto
- En B1Admin-användare med behörigheten **Redigera inställningar**

</div>

## Vad du kan koppla ihop

Make:s Checkr-app innehåller 1 utlösare och 6 åtgärder:

| Riktning | B1 / Make-utlösare | Åtgärd |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (filtrerad till en volontärgrupp) | Checkr: Create Candidate → Create Background Check Invitation |
| Checkr → B1 | Checkr-webhook (händelse för inbjudan / rapport) | B1: Uppdatera personens post (t.ex. taggen "Checkr godkänd") |

Make:s Checkr-åtgärder: Create Candidate, Create Background Check Invitation, Get Candidate, Get Report, Get Report's ETA och Get an Invitation. Dessutom 4 sökmoduler.

## Konfiguration

### 1. Skapa en B1 API-nyckel

**Inställningar → Utvecklare → API-nycklar → Ny API-nyckel**:

- `settings:write` för utlösar-webhooken
- `people:read` för att slå upp personens namn och e-post när en kontroll startas
- (Valfritt) `people:write` om du vill skriva tillbaka rapportstatusen som ett anpassat fält eller en tagg

### 2. Bygg scenariot "starta en kontroll vid volontäranmälan" i Make

1. **Utlösare**: B1.church: Watch Events (`group.member.added`).
2. **Filter**: fortsätt bara om `data.groupId` matchar din grupp "Barnvolontärer" (eller motsvarande).
3. **Åtgärd**: B1.church: Find Person (med `data.personId`) för att hämta e-post och för- och efternamn.
4. **Åtgärd**: Checkr: Create Candidate. Mappa förnamn, efternamn och e-post från steg 3.
5. **Åtgärd**: Checkr: Create Background Check Invitation. Mappa det nya kandidat-id:t från steg 4 till fältet *candidate_id*. Välj screeningpaket (t.ex. `tasker_standard` eller vad ditt konto visar).
6. (Valfritt) **Åtgärd**: Slack: meddela din koordinator för säker verksamhet att en kontroll har startat.

Aktivera scenariot. Nya volontärer i den valda gruppen får automatiskt en Checkr-inbjudan via e-post. De slutför den i telefonen eller på datorn, och Checkr genomför granskningen.

### 3. (Valfritt) Ta emot rapporten

1. **Utlösare**: Checkr: Watch Events (webhook). Make registrerar en Checkr-webhook när scenariot aktiveras.
2. **Filter**: fortsätt bara om `event_type = report.completed`.
3. **Åtgärd**: Checkr: Get Report (med rapport-id:t från webhooken).
4. **Åtgärd**: B1.church: Find Person (med kandidatens e-post).
5. **Villkorad åtgärd**: Slack eller e-post: meddela koordinatorn med statusen `clear`, `consider` eller `suspended`.

Obs: B1 har idag inget inbyggt fält för status för bakgrundskontroll. De praktiska alternativen är (a) att publicera resultatet i en privat Slack-kanal för granskning, (b) att skriva det till ett Google Kalkylark för revision, eller (c) att lägga till personen i en B1-grupp "Godkända volontärer" vid `clear`.

## Vanliga recept

### Kontrollera om volontärer var 2:a år

Kombinera ovanstående med en schemalagd utlösare i Make:

- **Utlösare**: Make: Schedule (månatligen)
- **Åtgärd**: B1.church: List Group Members för "Godkända volontärer"
- **Åtgärd**: Filter i Make: datum för godkännande är äldre än 22 månader
- **Åtgärd**: Checkr: Create Background Check Invitation (samma flöde som vid första kontrollen)

### Spärra åtkomst på steg 1 tills kontrollen är klar

Om din kyrka använder B1-gruppmedlemskap för att styra åtkomst (t.ex. att bara medlemmar i gruppen "Godkända" visas i tjänstescheman) kan du hålla nya volontärer i en väntegrupp tills Checkr-händelsen `report.completed` ändrar deras status.

## Begränsningar och noteringar

- **Checkr är bara för USA** för de flesta screeningpaket. Kyrkor i Australien, Storbritannien och Kanada behöver ett annat alternativ.
- **Priset** är per kontroll. Varje Create Invitation i Make förbrukar en riktig kontroll. Testa först i Checkrs sandbox- eller stagingkonto. Make:s Checkr-app använder de uppgifter du anger i anslutningen, så byte av uppgifter växlar mellan sandbox och skarpt läge.
- **API-åtkomst till Checkr kräver rätt abonnemang.** Mindre Checkr-konton kan ha en nivå med enbart gränssnitt. Kontakta Checkr för att aktivera API:et.

## Felsökning

- **Create Candidate misslyckas med `403`**: Checkr-API-token är skrivskyddad eller saknar rätt kontobehörigheter. Skapa en ny token i Checkrs instrumentpanel med skrivbehörighet.
- **Inbjudan kommer aldrig fram**: kontrollera kandidatens e-post i steg 3. B1 kan ha ett tomt e-postfält för personen. Lägg till ett filter som kräver e-post före Checkr-steget.
- **Webhook-utlösaren startar inte**: Checkrs webhook-registrering misslyckas ibland tyst om ditt Make-konto inte har en betald nivå som stöder utgående webhooks. Kontrollera på sidan *Webhooks* i Checkrs instrumentpanel att Make:s URL finns med.

## Se även

- [Make (översikt)](../make.md): B1-sidan av alla Make-scenarier
- [Mobilt meddelande](./mobile-message.md): för SMS-leverantörer utan Zapier-appar, med samma mönster för Webhooks/HTTP som Checkr-kopplingen i Make
- [Checkr API-dokumentation](https://docs.checkr.com/)
