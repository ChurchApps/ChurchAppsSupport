---
title: "Make"
description: "Koppla B1 Admin till Make för att automatisera arbetsflöden: skapa en API-nyckel, ställ in B1.church-utlösaren och åtgärderna samt felsök vanliga fel."
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (tidigare Integromat) är en visuell plattform för arbetsflödesautomation, lik Zapier i grunden men med mer flexibel logik och en lägre kostnad i stor skala. Den officiella B1.church-appen för Make låter dig skapa "scenarier" som reagerar direkt på B1-händelser och skriver tillbaka poster till B1.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Ett [Make](https://www.make.com)-konto (gratisnivån räcker för små arbetsflöden)
- En kyrkoadministratör med behörigheten **Redigera inställningar** i B1Admin
- En grov idé om scenariot du vill bygga

</div>

## Moduler

| Typ | Vad | B1-händelse/slutpunkt |
|---|---|---|
| **Direktutlösare** | Watch Events | valfri prenumererad B1-händelse (`person.created`, `donation.created`, …) |
| **Åtgärd** | Create Person | lägger till en ny person |
| **Åtgärd** | Add Donation | registrerar en gåva |
| **Åtgärd** | Add Group Member | lägger till en person i en grupp |
| **Sök** | Search People | hittar personer via namn eller e-post |

Direktutlösaren låter dig välja vilken händelse som ska lyssnas efter. Det finns en utlösarmodul per scenario, konfigurerad per händelse.

## Konfiguration

### 1. Skapa en B1 API-nyckel

1. Gå till **Inställningar → Utvecklare → API-nycklar** i B1Admin.
2. Klicka på **Ny API-nyckel**, namnge den "Make" och ge de behörigheter (scopes) du behöver.
3. **Inkludera `settings:write`** om något av dina scenarier använder direktutlösaren. Make registrerar en webhook åt dig när scenariot aktiveras.
4. Ge även de behörigheter som åtgärdsmodulerna behöver (t.ex. `donations:write` för modulen Add Donation).
5. Spara och kopiera nyckeln `cak_…`.

### 2. Installera anslutningen

1. I Make, skapa ett nytt scenario och dra in utlösarmodulen **B1.church** på arbetsytan.
2. När du uppmanas, välj **Skapa en anslutning**. Klistra in API-nyckeln i fältet *API Key* och lämna *API Base URL* som `https://api.churchapps.org` (om du inte testar mot staging).
3. Klicka på **Spara**. Make testar nyckeln genom att läsa din kyrkprofil.

Anslutningen sparas på ditt Make-konto och används igen i alla scenarier.

### 3. Konfigurera utlösaren

1. Öppna inställningarna för modulen **Watch Events**.
2. Välj den händelse du vill ha, t.ex. `donation.created`.
3. Spara. Make genererar en unik webhook-URL och lagrar den internt.

### 4. Lägg till efterföljande moduler

Dra in valfria appmoduler från Makes hundratals alternativ på arbetsytan, t.ex. Mailchimp, Google Sheets, Slack, HubSpot eller din egen HTTP-slutpunkt. Mappa utlösarens utdata (`event`, `churchId`, `data.id`, `data.amount`, …) till deras indatafält. Makes moduler för flatten, iterator, router och aggregator gör det möjligt att bygga förgrenade och parallella flöden som vore svåra att göra i Zapier.

### 5. Aktivera scenariot

Slå på **Active** i scenariots huvud. Make anropar B1:s `POST /membership/webhooks` för att registrera URL:en. Från och med då passerar varje matchande B1-händelse genom scenariot i realtid.

När du stänger av scenariot anropas `DELETE /membership/webhooks/{id}` så att inga föräldralösa prenumerationer blir kvar.

## Vanliga recept

### Synkronisera gåvor till ett Google-kalkylblad för ekonomigranskning

- **Utlösare** — B1: Watch Events (`donation.created`)
- **Åtgärd** — Google Sheets: Add a Row. Mappa `data.donationDate`, `data.amount`, `data.personId`, `data.method` och `data.batchId` till kalkylbladets kolumner.

### Villkorlig Slack-avisering beroende på gåvobelopp

- **Utlösare** — B1: Watch Events (`donation.created`)
- **Router**:
  - Gren A — Filter: `data.amount >= 1000` → Slack: publicera i `#major-gifts`
  - Gren B — övrigt → Slack: publicera i `#donations`

### Ny person → CRM + välkomstmejl + Slack

- **Utlösare** — B1: Watch Events (`person.created`)
- **Åtgärd** — HubSpot: Create Contact
- **Åtgärd** — Mailgun: Send Welcome Email
- **Åtgärd** — Slack: Meddela `#new-people` (parallellt, använd Makes router)

## Så fungerar direktutlösaren

Direktutlösaren bygger på webhooks, inte polling. När den aktiveras anropar Make `POST /membership/webhooks` med sin genererade URL och den händelse du valt. När händelsen inträffar i B1 skickar B1 en POST med kuvertet till Makes URL, och scenariot körs inom några sekunder. Om du inaktiverar scenariot tas webhooken bort.

Utlösaren aktiveras endast för händelser som inträffar **medan scenariot är aktivt**. Det finns ingen efterhandsfyllnad.

## Begränsningar och noteringar

- **En händelse per modul Watch Events.** Om du vill lyssna efter flera händelser i samma scenario lägger du till flera utlösarmoduler i separata scenarier (eller använder en enda modul med den sammanslagna händelselistan, se nedan).
- **Signaturverifiering exponeras inte.** Make skickar inte `X-B1-Signature` vidare till scenariot. Förtroendegränsen är Makes oförutsägbara webhook-URL per scenario. Detta är vanlig praxis i Make. Om du behöver explicita signaturkontroller bör du i stället bygga en egen integration med [SDK:n](/docs/developer/api/webhooks#sdk-support).
- **Antal operationer.** Varje API-anrop från en åtgärdsmodul räknas mot din kvot för Make-operationer, inte mot något på B1:s sida.

## Felsökning

- **Anslutningstestet misslyckas.** Oftast beror det på ett stavfel i API-nyckeln. Kopiera den på nytt från B1Admin. Hela nyckeln visas bara en gång. Om du har tappat bort den skapar du en ny nyckel.
- **Utlösarmodulen aktiveras inte.** Kontrollera **Inställningar → Utvecklare → Webhooks** i B1Admin. Om du inte ser någon rad "Make — &lt;event&gt;" efter att du aktiverat scenariot saknar nyckeln `settings:write`. Uppdatera nyckeln och aktivera scenariot igen.
- **Åtgärden returnerar `403 Forbidden`.** API-nyckeln saknar behörighet för den slutpunkten. Till exempel kräver Add Donation `donations:write`. Uppdatera nyckeln i B1Admin och testa igen.

## Anpassa appen

Den officiella B1.church-appen för Make är öppen källkod. JSON-definitionerna finns i repot `B1Integrations/Make/`. Om du behöver en modul som inte finns (t.ex. en ny åtgärd för en slutpunkt vi inte täckt) kan du öppna ett ärende eller en pull request där.

## Se även

- [Zapier](./zapier.md) — samma mönster med ett enklare gränssnitt och ett större appkatalog
- [Slack & Discord](./slack-discord.md) — inbyggda chattnotiser utan Make
- [Webhooks (utvecklarreferens)](/docs/developer/api/webhooks)
