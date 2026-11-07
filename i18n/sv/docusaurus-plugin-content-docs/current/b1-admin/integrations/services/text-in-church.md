---
title: "Text In Church"
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) samlar SMS och droppkampanjer (drip workflows) samt automatiseringar för kontaktkort. Deras Zapier-app fungerar åt båda hållen: du kan skicka B1-händelser till ett Text In Church-arbetsflöde och hämta utlösare för kontaktkort eller nya kontakter från andra hållet in i B1.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Ett [Text In Church](https://textinchurch.com)-konto med en plan som inkluderar Zapier-integrationen
- Ett [Zapier](https://zapier.com)-konto
- En B1Admin-användare med behörigheten **Edit Settings**

</div>

## Vad du kan koppla ihop

| Riktning | Utlösare | Åtgärd |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Skapa/uppdatera person + lägg till i grupp |
| B1 → Text In Church | B1 `form.submission.created` | Skicka textmeddelande via relevant team |
| B1 → Text In Church | B1 `group.member.added` | Lägg till i grupp (spegla gruppmedlemskap) |
| Text In Church → B1 | Connect Card Submitted | B1: Skapa person + lägg till gruppmedlem |
| Text In Church → B1 | Person Created | B1: Skapa person |
| Text In Church → B1 | Person Joined Group | B1: Lägg till gruppmedlem |

Text In Church-åtgärder inkluderar också *Send Text Message*, *Send Voice Broadcast*, *Create Task*, *Find Person/Group* samt att lägga till och ta bort gruppmedlemskap.

## Konfiguration

### 1. Skapa en B1 API-nyckel

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — krävs för B1-utlösta Zaps
- `people:read`, `people:write` — för att hitta eller skapa personen
- `groups:write` — för gruppsynkronisering
- (Valfritt) `donations:write` om du kopplar gåvobekräftelser till TIC

### 2. Anslut Text In Church till Zapier

Följ [Text In Churchs guide för Zapier-integrationen](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). De skapar en API-token i TIC-instrumentpanelen.

### 3. Bygg Zapen för kontaktkort till B1

Det vanligaste upplägget. Kontaktkort som skickas från TIC blir automatiskt nya personer i B1.

1. **Utlösare** — Text In Church: Connect Card Submitted.
2. **Åtgärd** — B1.church: Find Person (via e-post).
3. **Väg** — förgrena på hittad / inte hittad:
   - Inte hittad → B1.church: Create Person.
   - Hittad → fortsätt.
4. **Åtgärd** — B1.church: Add Group Member till gruppen "Ny kontakt".

Aktivera Zapen. Nästa kontaktkort som skickas via TIC hamnar automatiskt under **B1Admin → People**.

## Vanliga recept

### Starta ett kontaktkortsliknande arbetsflöde från ett B1-formulär

- **Utlösare** — B1.church: New Form Submission (filtrera på formulär-id:t för "I'm new here")
- **Åtgärd** — Text In Church: Create/Update Person, och mappa formulärets svar för e-post, telefon och namn
- **Åtgärd** — Text In Church: Add to Group, där gruppen har ett förbyggt välkomstarbetsflöde kopplat

### Spegla gruppmedlemskap

- **Utlösare** — B1.church: New Group Member, filtrerat på ett specifikt `groupId`
- **Åtgärd** — Text In Church: Add to Group (samma person, spegelgrupp). Kombinera med en Zap för `group.member.removed` om du vill ha full synkronisering.

### Meddela en ledare när någon går med

- **Utlösare** — B1.church: New Group Member
- **Åtgärd** — Text In Church: Send Text Message, mottagare = gruppledarens telefonnummer, meddelande = `"{first} {last} just joined {group}"`.

## Begränsningar och noteringar

- **TIC:s Zapier-app kräver en viss abonnemangsnivå.** Om Zapier-integrationen är nedtonad i TIC-instrumentpanelen kontaktar du TIC-supporten för att aktivera den på din plan.
- **Grupp-id:n är TIC:s, inte B1:s.** När du speglar grupper behöver du underhålla en mappningstabell någonstans (en Zapier *Lookup Table* eller hårdkodad i varje Zap).
- **Send Text Message kostar krediter.** Varje Zap som utlöser *Send Text* drar från din SMS-kvot i TIC.

## Felsökning

- **Connect Card-utlösaren startar inte** — TIC behöver att Zapier-integrationsväxeln är påslagen. Kontrollera också att formuläret du testade med är konfigurerat som "Connect Card" och inte som en generisk enkät.
- **Create Person i B1 misslyckas med 401** — API-nyckeln är fel, återkallad eller saknar `people:write`. Skapa en ny.
- **Dubbletter av personer i B1** — TIC skickar både *Person Created* och *Connect Card Submitted* för samma händelse. Välj en som källa och lägg till ett Zapier-filter på den andra.

## Se även

- [Clearstream](./clearstream) — alternativ SMS-plattform med liknande Zapier-upplägg
- [Zapier (översikt)](../zapier) — B1-sidan av alla Zapier-recept
- [Text In Church Zapier-guide](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (TIC:s dokumentation)
