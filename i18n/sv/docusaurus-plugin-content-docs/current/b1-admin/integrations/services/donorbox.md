---
title: "Donorbox"
---

# Donorbox

<div class="article-intro">

Om din kyrka tar emot gåvor via Donorbox men håller reda på personer och kvitton i B1, kan du låta Donorboxs direkta Zapier-triggers skapa motsvarande gåvoposter i B1. Om givaren inte redan finns som person i B1 skapas personen även där. Ingen manuell avstämning och ingen månatlig export behövs.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Ett [Donorbox](https://donorbox.org)-konto med minst en kampanj
- Ett [Zapier](https://zapier.com)-konto
- En B1Admin-användare med behörigheten **Redigera inställningar**

</div>

## Vad du kan koppla ihop

| Riktning | Donorbox-trigger | B1-åtgärd |
|---|---|---|
| Donorbox → B1 | Ny eller uppdaterad gåva (direkt) | Hitta person → Lägg till gåva |
| Donorbox → B1 | Ny eller uppdaterad givare | Skapa person |
| Donorbox → B1 | Ny eller uppdaterad plan (återkommande) | Hitta person → Lägg till gåva (använd plan-id som anteckning) |

Donorbox publicerar sina triggers som **direkta**. De aktiveras inom några sekunder efter en riktig gåva, så det blir ingen väntetid för avfrågning.

## Installation

### 1. Skapa en API-nyckel i B1

I B1Admin: **Inställningar → Utvecklare → API-nycklar → Ny API-nyckel**. Behörigheter (scopes):

- `people:read` för att slå upp givaren via e-postadress
- `people:write` för att skapa givaren om hen är ny
- `donations:write` för att registrera gåvan

Triggers i den här riktningen kommer från Donorbox, inte från B1, så du behöver inte `settings:write` här.

### 2. Bygg Zapen "registrera en gåva"

1. **Trigger**: Donorbox: New Donation. Anslut med Donorboxs API-nyckel (i Donorbox: *Account → Profile → API Settings*).
2. **Åtgärd**: B1.church: Find Person. Koppla givarens e-postadress från triggern till sökfältet *Email*.
3. **Åtgärd**: Filter by Zapier (valfritt): fortsätt bara om givaren inte hittades, annars…
4. **Åtgärd**: B1.church: Create Person. Koppla förnamn, efternamn och e-post så att givaren blir en medlem och inte bara en gåvopost.
5. **Åtgärd**: B1.church: Add Donation. Koppla:
   - Belopp → `data.amount`
   - Gåvodatum → gåvodatum från triggern
   - Fond → välj den B1-fond som motsvarar Donorbox-kampanjen (med ett filter- eller formatteringssteg i Zapier kan du byta fond beroende på villkor)
   - Metod → "Online"
   - Anteckningar → Donorboxs transaktions-id (praktiskt vid avstämning)

Aktivera Zapen. Nästa livegåva via Donorbox hamnar automatiskt under **B1Admin → Gåvor**.

## Vanliga upplägg

### En Zap per fond

Om du har flera Donorbox-kampanjer som motsvarar olika B1-fonder är det enklaste upplägget en Zap per kampanj, med ett filter för Donorbox-*kampanjen* först. Då är fondkopplingen fast inbyggd och du slipper uppslagningssteget.

### Behandla uppdaterade gåvor som rättelser

Donorboxs *New or Updated Donation* aktiveras även vid ändringar. Använd ett Zapier-steg av typen *Path* på `event_type` för att dela upp flödet: "new" går till Add Donation, och "updated" går till Find Donation + Update. Observera att B1:s Zapier-app inte har någon åtgärd för att uppdatera en gåva just nu. Logga därför händelser av typen "updated" i en Slack-kanal för manuell granskning.

### Skicka ändringar i återkommande planer till en Slack-kanal

- **Trigger**: Donorbox: New or Updated Plan
- **Åtgärd**: Slack: Send Message till `#donations` (t.ex. "Plan ändrad: Sarahs månatliga gåva är nu 200 USD")

## Begränsningar och noteringar

- **Matcha givare via e-post.** Donorbox delar inte B1:s person-id. E-postadressen är den enda varaktiga kopplingsnyckeln. Givare som ger med en annan e-postadress skapar en ny person i B1, och din månatliga avstämning bör leta efter sådana dubbletter.
- **Återbetalningar visas inte separat.** Donorbox skickar en statusuppdatering på samma gåva. B1:s Zapier-app saknar för närvarande åtgärden *Update Donation*. Det säkra sättet just nu är att logga återbetalningar utanför systemet och justera gåvan manuellt.
- **Testa först i Donorboxs sandbox** för att undvika skapade falska gåvor i B1-produktion. Donorbox tillhandahåller testläget med egna inloggningsuppgifter, separata från de skarpa.

## Felsökning

- **"Person not found" varje körning**: Det är helt normalt om du har ordnat stegen så att *Create Person* körs i grenen för "not found". Om steget Create Person aldrig körs heller, kontrollera att API-nyckeln har behörigheten `people:write`.
- **Gåvobeloppet ser 100 gånger för stort eller litet ut**: Donorbox skickar ibland belopp i ören och ibland i kronor/dollar, beroende på variant av datapaketet. Använd ett steg med *Formatter by Zapier, Numbers* för att dela med 100 vid behov.
- **Dubbla gåvor från en enda gåva**: Donorbox aktiverar både *New Donation* och *Updated Donation*. Filtrera antingen på `event_type = "donation.succeeded"` eller skapa två Zaps med icke-överlappande filter.

## Se även

- [Zapier (översikt)](../zapier): B1-sidan av alla Zapier-upplägg
- [Subsplash](./subsplash): en annan gåvoplattform med en Zapier-app
- [Mailchimp](./mailchimp): koppla "ny gåva" till en e-posttagg
