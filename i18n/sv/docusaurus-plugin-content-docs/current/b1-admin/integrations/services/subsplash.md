---
title: "Subsplash"
description: "Koppla Subsplash-gåvor, nya personer och formulärsvar till B1 med Zapier, så att gåvor och profiler hamnar i B1 Admin automatiskt."
---

# Subsplash

<div class="article-intro">

Om du använder Subsplash för din kyrkoapp, dina gåvor eller dina formulär men vill att B1 ska vara huvudregistret för personer och gåvor, kan Subsplashs Zapier-app skicka gåvor, nya profiler och formulärsvar till B1 i realtid. Observera att Subsplashs Zapier-app för närvarande bara har **utlösare** – kopplingen går bara åt ett håll (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Ett Subsplash-konto med en plan som inkluderar åtkomst till **API + Zapier** (kontakta din Client Success Manager hos Subsplash, eftersom detta kräver en viss plannivå)
- Ett [Zapier](https://zapier.com)-konto
- En B1Admin-användare med behörigheten **Redigera inställningar**

</div>

## Vad du kan koppla ihop

Alla utlösare nedan kommer från Subsplash. Åtgärderna kommer från B1.

| Subsplash-utlösare | B1-åtgärd |
|---|---|
| Ny gåva | Hitta person → Lägg till gåva (Skapa person om den saknas) |
| Nytt löfte | Lägg till gåva (med `notes` = "Pledge: …") |
| Ny person skapad | Skapa person |
| Personprofil uppdaterad | (ingen direkt B1-åtgärd – logga till ett Google Sheet för manuell granskning) |
| Nytt formulärsvar | Skapa person + (valfritt) Lägg till gruppmedlem baserat på formuläret |

Subsplash → B1 är den enda riktning som Subsplashs app stöder just nu.

## Installation

### 1. Skapa en API-nyckel för B1

I B1Admin: **Inställningar → Utvecklare → API-nycklar → Ny API-nyckel**. Behörigheter:

- `people:read` – för att slå upp givaren via e-post
- `people:write` – för att skapa givaren om den inte finns
- `donations:write` – för att registrera gåvan
- (`settings:write` behövs inte – det är Subsplash, inte B1, som äger utlösaren här.)

### 2. Anslut Subsplash till Zapier

Följ [Subsplashs guide för Zapier-integrationen](https://support.subsplash.com/en/articles/9825926-zapier-integration). De utfärdar en API-token i Subsplash-instrumentpanelen som Zapier använder för att autentisera utlösaren.

### 3. Skapa Zapet "registrera en gåva"

1. **Utlösare** – Subsplash: Ny gåva
2. **Åtgärd** – B1.church: Hitta person (via e-post)
3. **Filter / Gren** – förgrena på "person hittad":
   - **Hittad:** B1.church: Lägg till gåva. Mappa belopp, datum, fond, metod = "Online" och notes = Subsplashs transaktions-id.
   - **Inte hittad:** B1.church: Skapa person → B1.church: Lägg till gåva (med den nyskapade personens id).

Aktivera Zapet. Framtida gåvor från Subsplash kommer in i **B1Admin → Gåvor** inom några sekunder.

## Vanliga recept

### Skicka ett tackmeddelande när en första gåva kommer in

- **Utlösare** – Subsplash: Ny gåva
- **Åtgärd** – Filter i Zapier: fortsätt bara om det är givarens första gåva (använd en *Uppslagstabell* på givarens e-post mot ett Google Sheet med tidigare givare, eller ett Zapier-steg *Vägar* baserat på givarens skapandedatum)
- **Åtgärd** – Mailchimp / SMTP / SendGrid: skicka tackmeddelandet för första gåvan
- **Åtgärd** – B1.church: Lägg till gåva (som vanligt)

### Separera löften från den vanliga givandet

- **Utlösare** – Subsplash: Nytt löfte
- **Åtgärd** – B1.church: Lägg till gåva med `notes = "Pledge — Subsplash"` och en fond som heter `Pledges` (skild från er driftsfond), så att du kan rapportera löften separat under **B1Admin → Gåvor → Sammanfattning**.

### Synkronisera nya appanvändare som personer i B1

- **Utlösare** – Subsplash: Ny person skapad
- **Åtgärd** – B1.church: Skapa person, med namn, e-post och telefon. Tagga personen i B1 genom att lägga till den i en grupp som "Subsplash-appanvändare".

## Begränsningar och noteringar

- **Subsplashs Zapier-app har bara utlösare.** Om du vill att ändringar i B1 ska synkas till Subsplash (t.ex. att en ny person i B1 också ska finnas i Subsplash) behöver du bygga den bryggan själv, med utlösare från B1:s Zapier-app som anropar Subsplashs REST API via en egen åtgärd *Webhooks by Zapier – POST*. Det är en skräddarsydd integration, inte ett färdigt recept.
- **API-åtkomst kräver viss plannivå.** Om Zapier-anslutningen misslyckas med `403 Forbidden` inkluderar din Subsplash-plan troligen inte API-åtkomst – kontakta din Client Success Manager.
- **Fondmappningen görs manuellt.** Subsplash skickar ett kampanj- eller kategorinamn, medan B1 behöver ett numeriskt fond-id. Antingen skriver du in fonden direkt i Zapet, eller så underhåller du en Zapier-*Uppslagstabell* som kopplar Subsplash-kampanjer till B1-fonder.

## Felsökning

- **Ingen utlösare startar efter en gåva** – kontrollera i Subsplashs Zapier-instrumentpanel att anslutningen fortfarande visar *Ansluten*. Om API-token har roterats på Subsplash-sidan slutar Zapet tyst att fungera; anslut om.
- **B1:s *Lägg till gåva* misslyckas med 422** – oftast saknas `fundId` eller så känns det inte igen. Lista dina fonder via **B1Admin → Gåvor → Fonder** och kopiera det exakta id:t till Zap-steget.
- **Första gåvan utlöser två gånger** – Subsplash skickar ibland en utlösare på nytt om Zapier missade bekräftelsen. Lägg till ett *Filter i Zapier* på gåve-id:t (Subsplash skickar ett i datan) för att filtrera bort dubbletter.

## Se även

- [Donorbox](./donorbox.md) – samma receptstruktur, en annan plattform för gåvor
- [Zapier (översikt)](../zapier.md) – B1-sidan för alla Zapier-recept
- [Subsplashs guide för Zapier-integrationen](https://support.subsplash.com/en/articles/9825926-zapier-integration) (Subsplashs dokumentation)
