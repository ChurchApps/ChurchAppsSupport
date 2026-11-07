---
title: "Slack och Discord"
description: "Publicera B1 Admin-händelser som nya personer, gåvor och formulärinlämningar i en Slack- eller Discord-kanal via en inkommande webhook, utan Zapier."
---

# Slack och Discord

<div class="article-intro">

Skicka läsbara notiser från B1 direkt till en Slack- eller Discord-kanal, till exempel när nya personer läggs till, gåvor kommer in, personer anmäler sig till grupper, formulär skickas in, eller kalenderhändelser skapas. Du behöver inget tredjepartskonto och ingen Zap att underhålla. B1 formaterar händelserna till chattmeddelanden och skickar dem själv till kanalens webhook-URL.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Du behöver behörigheten **Redigera inställningar** i B1Admin
- En administratör i din Slack-arbetsyta eller Discord-server behöver skapa kanalens Incoming Webhook
- Bestäm vilken kanal notiserna ska gå till (du kan använda samma kanal för flera händelsetyper, eller dela upp dem på flera kanaler)

</div>

## Så fungerar det

B1 har en inbyggd **anslutningstyp** för chattplattformar. När du skapar en webhook med typen **Slack** eller **Discord** gör webhook-motorn fortfarande sin vanliga leverans, omförsök och signerade headers. Men innehållet som skickas formas om från B1:s vanliga `{event,churchId,data}`-struktur till det korta meddelandet `{text}` (Slack) eller `{content}` (Discord) som tjänsterna förväntar sig.

B1:s servrar kontaktar inte Slack för varje kyrka utöver det befintliga flödet för utgående webhooks. Det finns inget nytt att hosta och inga extra kostnader.

## Slack, steg för steg

### 1. Hämta en Slack Incoming Webhook-URL

1. Öppna [api.slack.com/apps](https://api.slack.com/apps) i den Slack-arbetsyta där du vill ta emot notiser.
2. Klicka på **Create New App → From scratch**, ge appen ett namn som "B1-notiser" och välj arbetsytan.
3. I den vänstra menyn väljer du **Incoming Webhooks** och ställer **Activate Incoming Webhooks** på *On*.
4. Klicka på **Add New Webhook to Workspace**, välj kanal (till exempel `#donations`) och klicka sedan på **Allow**.
5. Slack tar dig tillbaka till sidan med en ny **Webhook URL** som ser ut så här: `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…`. Kopiera den. Det är den enda uppgift B1 behöver.

:::caution
Behandla Slack-webhook-URL:en som en hemlighet. Den som har den kan posta godtyckliga meddelanden i kanalen. Om den hamnar på fel ställe kan du skapa en ny från appens sida i Slack. Då roteras bara URL:en, så uppdatera B1 så att den matchar.
:::

### 2. Anslut i B1Admin

1. Gå i B1Admin till **Inställningar → Developer → Webhooks**.
2. Klicka på **New Webhook**.
3. Fyll i:
   - **Name**: något begripligt, till exempel "Gåvor → #donations". Det är bara ditt team som ser namnet.
   - **Connector Type**: välj **Slack**.
   - **Payload URL**: klistra in Slack-URL:en från steg 1.
   - **Events**: bocka i de händelser du vill ha som meddelanden. För en gåvokanal räcker `donation.created`. För en #people-kanal kan du prova `person.created` och `group.member.added`.
4. Klicka på **Save**. En dialog med "Signing Secret" visas. Du kan ignorera den för Slack eftersom Slack inte verifierar B1:s signaturer. Stäng dialogen.

### 3. Testa

Öppna webhooken igen från listan och klicka på **Send Test Event**. Inom en eller två sekunder visas ett meddelande som

> 💝 Ny gåva: $50.00

i din Slack-kanal, och en ny rad dyker upp i tabellen **Recent Deliveries** på samma skärm med status `succeeded`. Då är du klar.

## Discord, steg för steg

### 1. Hämta en Discord-webhook-URL

1. I din Discord-server för musen över kanalen där du vill ta emot notiser och klicka på **⚙-ikonen** (Edit Channel).
2. Öppna **Integrations → Webhooks → New Webhook**.
3. Ge den ett namn och eventuellt en avatar, klicka sedan på **Copy Webhook URL**. Den ser ut så här: `https://discord.com/api/webhooks/123…/abc…`.

### 2. Anslut i B1Admin

Samma flöde som för Slack ovan, förutom att du väljer **Discord** som **Connector Type**. Klistra in Discord-URL:en i **Payload URL** och spara.

:::tip
Du behöver **inte** lägga till `/slack` i slutet av Discord-URL:en. B1 skickar Discord-anpassade `{content}`-payloads, inte Slack-kompatibla. Klistra bara in URL:en som Discord gav dig.
:::

### 3. Testa

Använd samma knapp **Send Test Event**. Discord visar meddelandet i den valda kanalen, och leveranslogen växlar till `succeeded`.

## Så ser meddelandena ut

| Händelse | Exempelmeddelande |
|---|---|
| `person.created` | 👤 Ny person tillagd: Jordan Rivera |
| `person.updated` | 👤 Person uppdaterad: Jordan Rivera |
| `group.created` | 👥 Ny grupp skapad: Tisdagens bibelstudium |
| `group.member.added` | ➕ Någon lades till i en grupp |
| `donation.created` | 💝 Ny gåva: $50.00 |
| `donation.updated` | 💝 Gåva uppdaterad: $75.00 |
| `attendance.recorded` | ✅ Närvaro registrerad |
| `form.submission.created` | 📝 Nytt formulärsvar mottaget |
| `event.created` | 📅 Ny händelse: Påskgudstjänst |

Hela listan finns i [katalogen över webhook-händelser](/docs/developer/api/webhooks#event-catalog). Vilken händelse som helst där kan skickas till Slack eller Discord.

## En kanal per ämne

Du behöver inte lägga alla händelser på samma ställe. De flesta kyrkor sätter upp några webhooks:

- En kanal **#donations** som bara lyssnar på `donation.created`
- En kanal **#new-people** för `person.created` och `group.member.added`
- En kanal **#admin-alerts** för händelser med låg volym, till exempel `form.submission.created`

Det finns ingen gräns för antalet webhooks per kyrka. Varje webhook är oberoende. Att ta bort eller inaktivera en påverkar inte de andra.

## Granska leveranser

Tabellen **Recent Deliveries** i webhook-redigeraren visar de senaste 50 försöken. Klicka på en rad för att se exakt vilken payload som skickades och vilket svar som kom tillbaka. För en Slack-anslutning är payloaden `{"text":"💝 Ny gåva: $50.00"}` och inte den råa strukturen `{event,churchId,...}`, eftersom B1 formar om den innan leverans.

Om något misslyckades (en röd `failed`- eller `exhausted`-etikett) visar dialogen HTTP-statuskoden och svarets innehåll, så att du kan se exakt vad Slack eller Discord inte godkände. Oftast beror det på ett kopierings- eller klistringsfel i URL:en.

## Felsökning

- **Inget meddelande visas och leveransstatus är `400`**: Oftast är **Connector Type** satt till **Standard** men URL:en är en Slack- eller Discord-URL. Slack och Discord avvisar den råa strukturen. Byt till **Slack** eller **Discord** i listrutan och skicka testet igen.
- **Webhooken stängs av automatiskt**: Efter 3 misslyckade leveranser i rad stänger B1 av webhooken. Rätta URL:en (eller rotera den i Slack eller Discord) och slå på **Active** igen.
- **Meddelandet kom fram men saknar detaljer**: Alla chattplattformar begränsar meddelandens storlek. B1:s meddelanden är korta med avsikt. För rikare notiser kan du använda [Zapier](./zapier.md) eller [Make](./make.md) för att skriva ett mer fullständigt Slack-meddelande med deras Slack-åtgärder.

## Byta anslutningstyp senare

Du kan ändra Connector Type på en befintlig webhook. Ändringen gäller från nästa leverans. Om du byter från Slack till Standard pekar du URL:en mot din egen HTTPS-endpoint. Samma signeringshemlighet (den utfärdades när webhooken skapades) kan då användas för att verifiera den råa strukturen.

## Se även

- [Zapier](./zapier.md) för flerstegsflöden som startas av B1-händelser
- [Make](./make.md) för en visuell scenariobyggare
- [Webhooks (utvecklarreferens)](/docs/developer/api/webhooks) för hela payload- och signaturformatet om du någon gång vill peka en webhook mot din egen server
