---
title: "Zapier"
description: "Koppla B1 Admin till Zapier för att starta automatiseringar vid nya personer, gåvor och gruppmedlemmar och skriv tillbaka poster till B1 utan kodning."
---

# Zapier

<div class="article-intro">

Den officiella B1.church-appen på Zapier låter en Zap reagera på händelser i din församling (ny person, ny gåva, ny gruppmedlem, …) och skriva tillbaka poster till B1. Ingen kodning och ingen infrastruktur behövs. Du kopplar ihop allt i Zapiers redigerare med dra-och-släpp, klistrar in en API-nyckel och slår på Zapen.

</div>

:::caution Väntar på Zapiers godkännande
B1.church-appen är byggd och fungerar, men den väntar fortfarande på Zapiers granskning innan den visas offentligt i Zap-redigerarens appkatalog. Tills den är godkänd kan endast inbjudna konton använda den. Allt nedan beskriver hur den kommer att fungera när den är godkänd.
:::

<div class="prereqs">
<h4>Innan du börjar</h4>

- Ett [Zapier](https://zapier.com)-konto (gratisnivån räcker för några enstaka Zaps)
- En församlingsadministratör med behörigheten **Redigera inställningar** i B1Admin (där skapar du en API-nyckel)
- En idé om vad du vill göra, t.ex. "när en person läggs till i B1, lägg till den i min Mailchimp-lista"

</div>

## Utlösare och åtgärder

| Typ | Vad | B1-händelse / slutpunkt |
|---|---|---|
| **Utlösare** | Ny person | `person.created` |
| **Utlösare** | Uppdaterad person | `person.updated` |
| **Utlösare** | Ny gåva | `donation.created` |
| **Utlösare** | Ny gruppmedlem | `group.member.added` |
| **Utlösare** | Nytt formulärsvar | `form.submission.created` |
| **Åtgärd** | Skapa person | lägger till en ny person |
| **Åtgärd** | Lägg till gåva | registrerar en gåva |
| **Åtgärd** | Lägg till gruppmedlem | lägger till en person i en grupp |
| **Åtgärd** | Hitta person | slår upp en person med id, e-post eller namn; misslyckas om ingen matchar |

Kombinera dessa fritt med vilken som helst av Zapiers över 7 000 appar som stöds.

## Konfiguration

### 1. Skapa en B1 API-nyckel

1. Gå i B1Admin till **Inställningar → Utvecklare → API-nycklar**.
2. Klicka på **Ny API-nyckel**, ge den ett namn som "Zapier" och välj de behörighetsomfång (scopes) som Zapen behöver.
3. **Viktigt:** Zapier-utlösare registrerar en webhook å dina vägnar när Zapen slås på, och det kräver behörighetsomfånget **`settings:write`**. Inkludera alltid `settings:write` om någon av dina Zaps använder en B1-utlösare.
4. Ge även de behörigheter som åtgärderna behöver. Till exempel behöver åtgärden "Lägg till gåva" `donations:write` och "Skapa person" behöver `people:write`.
5. Spara. Den fullständiga `cak_…`-nyckeln visas **en gång**. Kopiera den.

### 2. Koppla Zapier till B1

1. Skapa en ny Zap i Zapier.
2. När du väljer en B1-utlösare eller -åtgärd för första gången ber Zapier dig att **Logga in på B1.church**.
3. Klistra in API-nyckeln från steg 1 och klicka på **Ja, fortsätt**. Zapier validerar nyckeln mot din församling.

Kopplingen sparas i Zapier och används av alla Zaps på ditt konto.

### 3. Bygg Zapen

Välj en utlösare och lägg sedan till ett eller flera åtgärdssteg. Exempel följer nedan.

## Vanliga recept

### Lägg till nya B1-personer i Mailchimp

- **Utlösare** — B1: Ny person
- **Åtgärd** — Mailchimp: Lägg till/uppdatera prenumerant. Mappa B1:s `name__first`, `name__last` och `contactInfo__email` till Mailchimps fält För-/Efternamn och E-post.

### Publicera gåvor i en Slack-kanal med ett rikare kort än den inbyggda kopplingen

- **Utlösare** — B1: Ny gåva
- **Åtgärd** — Slack: Skicka kanalmeddelande. Skapa valfri layout med knappar, bilagor osv. som den inbyggda [Slack-kopplingen](./slack-discord.md) inte klarar av.

### Lägg till nya gruppmedlemmar i en Google-grupp

- **Utlösare** — B1: Ny gruppmedlem (filtrerad på ett specifikt `groupId`)
- **Åtgärd** — Filter av Zapier: fortsätt bara om B1-gruppen är den du bryr dig om
- **Åtgärd** — B1: Hitta person (använd utlösarens `personId` för att hämta e-postadressen)
- **Åtgärd** — Google-grupper: Lägg till medlem

### Skicka formulärsvar till ett projektverktyg

- **Utlösare** — B1: Nytt formulärsvar
- **Åtgärd** — Notion / Linear / Asana / Trello: Skapa sida / ärende / uppgift

## Så fungerar utlösare under huven

Utlösare är **REST-hooks**, inte polling. Zapier frågar alltså inte B1 var 15:e minut. När du slår på Zapen ber Zapier B1 att registrera en webhook som pekar på en privat Zapier-URL. När händelsen inträffar skickar B1 meddelandet till Zapier med POST, och din Zap startar **inom några sekunder**. Stänger du av Zapen ber Zapier B1 att ta bort webhooken, så det blir inga övergivna prenumerationer.

Det innebär att utlösaren bara aktiveras för händelser som inträffar **efter** att Zapen slagits på. Det finns ingen bakåtfyllnad. Att slå på en Zap spelar inte upp gårdagens gåvor.

## Begränsningar och noteringar

- **Flera Zaps med samma utlösare** registrerar var och en sin egen B1-webhook. Det finns ingen konflikt, men det är bra att veta om du tittar under **Inställningar → Utvecklare → Webhooks** och undrar varför det finns tre identiska rader med `Zapier — donation.created`.
- **Testdata i Zap-konfigurationen**: När du bygger en Zap ber Zapier om exempeldata för att mappa fält. Den hämtar den senaste matchande händelsen från B1 om en sådan finns. Annars används ett syntetiskt exempel från appdefinitionen.
- **Åtgärdsfel visas som Zap-fel** i Zapiers uppgiftshistorik. Vanlig orsak: en API-nyckel saknar rätt behörighetsomfång (t.ex. behöver åtgärden "Lägg till gåva" `donations:write`). Skapa en ny nyckel med rätt behörigheter och koppla om i Zapier.
- **Kvoter för utgående API-anrop**: varje B1 API-anrop från en åtgärd räknas mot din Zapier-uppgiftskvot, inte mot något på B1:s sida.

## Felsökning

- **"Autentisering misslyckades"** vid anslutning: API-nyckeln är fel, återkallad eller saknar de behörighetsomfång som Zapen behöver. Skapa en ny nyckel i B1Admin med minst `settings:write` plus de resursbehörigheter Zapen använder, och uppdatera sedan kopplingen.
- **Utlösaren aktiveras aldrig**: kontrollera att webhooken faktiskt registrerades. I B1Admin under **Inställningar → Utvecklare → Webhooks** ska det nu finnas en rad med namnet "Zapier — &lt;händelse&gt;". Om den saknas hade API-nyckeln troligen inte `settings:write` när du slog på Zapen. Åtgärda nyckeln, stäng av Zapen och slå på den igen.
- **Utlösaren aktiveras två gånger**: Zapier skickar ibland om meddelanden om bekräftelsen gick förlorad. Om du behöver strikt dubblettkontroll, använd ett steg "Filter av Zapier" på ett unikt id (t.ex. personens `id`).

## Se även

- [Make](./make.md): samma mönster, annan plattform
- [Slack & Discord](./slack-discord.md): enklare chattaviseringar utan Zapier
- [Webhooks (utvecklarreferens)](/docs/developer/api/webhooks)
