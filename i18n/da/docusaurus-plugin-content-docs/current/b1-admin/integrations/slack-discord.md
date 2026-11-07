---
title: "Slack og Discord"
---

# Slack og Discord

<div class="article-intro">

Send letlæselige notifikationer fra B1 direkte til en Slack- eller Discord-kanal: nye personer, donationer, tilmeldinger til grupper, formularindsendelser, kalenderbegivenheder og meget mere. Der er ingen tredjepartskonto og ingen Zap at vedligeholde. B1 omformaterer hændelser til chatbeskeder og sender dem via POST til kanalens webhook-URL.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Du skal have tilladelsen **Rediger indstillinger** i B1Admin
- En administrator i dit Slack-workspace eller din Discord-server skal oprette kanalens Incoming Webhook
- Beslut, hvilken kanal du vil have notifikationer i. Du kan bruge samme kanal til flere hændelsestyper, eller fordele dem på flere kanaler.

</div>

## Sådan fungerer det

B1 har en indbygget **Connector Type** til chatplatforme. Når du opretter en webhook med typen **Slack** eller **Discord**, håndterer webhook-motoren stadig levering, genforsøg og signerede headers som normalt. Men indholdet, der sendes, omformes fra B1's almindelige `{event,churchId,data}`-envelope til den korte `{text}`-besked (Slack) eller `{content}`-besked (Discord), som tjenesterne forventer.

B1-servere kontakter ikke Slack pr. kirke ud over det eksisterende udgående webhook-flow. Der er ingen ny infrastruktur at hoste og intet ekstra at betale for.

## Slack: trin for trin

### 1. Hent en Slack Incoming Webhook-URL

1. Åbn [api.slack.com/apps](https://api.slack.com/apps) i det Slack-workspace, hvor du vil have notifikationerne.
2. Klik på **Create New App → From scratch**, giv appen et navn som "B1 Notifications", og vælg workspace.
3. Vælg **Incoming Webhooks** i venstre menu, og slå **Activate Incoming Webhooks** til *On*.
4. Klik på **Add New Webhook to Workspace**, vælg kanal (f.eks. `#donations`), og klik på **Allow**.
5. Slack sender dig tilbage til siden med en ny **Webhook URL**, der ser sådan ud: `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…`. Kopiér den. Det er den eneste oplysning B1 har brug for.

:::caution
Behandl Slack-webhook-URL'en som en hemmelighed. Enhver, der har den, kan sende vilkårlige beskeder til kanalen. Hvis du ved en fejl eksponerer den, kan du generere en ny fra Slack-appens side. Generering roterer blot URL'en, så opdatér B1 bagefter, så de matcher.
:::

### 2. Forbind den i B1Admin

1. Gå i B1Admin til **Indstillinger → Udvikler → Webhooks**.
2. Klik på **Ny webhook**.
3. Udfyld felterne:
   - **Navn**: noget letlæseligt som "Donationer → #donations". Kun dit team ser det.
   - **Connector Type**: vælg **Slack**.
   - **Payload-URL**: indsæt Slack-URL'en fra trin 1.
   - **Hændelser**: markér de hændelser, du vil have som beskeder. Til en donationskanal er det kun `donation.created`. Til en #people-kanal kan du prøve `person.created` og `group.member.added`.
4. Klik på **Gem**. En dialog med "Signing Secret" vises. Den kan du ignorere for Slack, fordi Slack ikke verificerer B1-signaturer. Luk den.

### 3. Test den

Åbn webhooken igen fra listen og klik på **Send testhændelse**. Inden for et sekund eller to vises en besked som

> 💝 New donation: $50.00

i din Slack-kanal, og en ny række dukker op i tabellen **Seneste leveringer** på samme skærm med status `succeeded`. Så er du færdig.

## Discord: trin for trin

### 1. Hent en Discord-webhook-URL

1. Gå til din Discord-server, hold musen over den kanal, du vil have notifikationer i, og klik på **⚙-tandhjulet** (Rediger kanal).
2. Åbn **Integrations → Webhooks → New Webhook**.
3. Giv webhooken et navn og eventuelt en avatar, og klik på **Copy Webhook URL**. URL'en ser sådan ud: `https://discord.com/api/webhooks/123…/abc…`.

### 2. Forbind den i B1Admin

Det er identisk med Slack-flowet ovenfor, bortset fra at du sætter **Connector Type** til **Discord**. Indsæt Discord-URL'en i **Payload-URL**, og gem.

:::tip
Du skal **ikke** tilføje `/slack` til slutningen af Discord-URL'en. B1 sender Discord-native `{content}`-payloads, ikke Slack-kompatible. Indsæt bare den URL, Discord gav dig.
:::

### 3. Test den

Brug samme knap **Send testhændelse**. Discord viser beskeden i den valgte kanal, og leveringsloggen skifter til `succeeded`.

## Sådan ser beskederne ud

| Hændelse | Eksempel på besked |
|---|---|
| `person.created` | 👤 New person added: Jordan Rivera |
| `person.updated` | 👤 Person updated: Jordan Rivera |
| `group.created` | 👥 New group created: Tuesday Bible Study |
| `group.member.added` | ➕ Someone was added to a group |
| `donation.created` | 💝 New donation: $50.00 |
| `donation.updated` | 💝 Donation updated: $75.00 |
| `attendance.recorded` | ✅ Attendance recorded |
| `form.submission.created` | 📝 New form submission received |
| `event.created` | 📅 New event: Easter Service |

Den fulde liste findes i [webhook-hændelseskataloget](/docs/developer/api/webhooks#event-catalog). Enhver hændelse der står der, kan sendes til Slack eller Discord.

## Én kanal pr. emne

Du behøver ikke samle alle hændelser ét sted. De fleste kirker opsætter et par webhooks:

- En **#donations**-kanal, der kun lytter på `donation.created`
- En **#new-people**-kanal til `person.created` og `group.member.added`
- En **#admin-alerts**-kanal til hændelser med lav trafik, som `form.submission.created`

Der er ingen grænse for antallet af webhooks pr. kirke. Hver enkelt er uafhængig. Hvis du sletter eller deaktiverer én, påvirker det ikke de andre.

## Gennemgang af leveringer

Tabellen **Seneste leveringer** i webhook-editoren viser de sidste 50 forsøg. Klik på en række for at se den præcise payload, der blev sendt, og svaret, der kom tilbage. For en Slack-connector er payloaden `{"text":"💝 New donation: $50.00"}` og ikke den rå `{event,churchId,...}`-envelope, fordi B1 omformer den før levering.

Hvis noget fejlede (et rødt `failed`- eller `exhausted`-mærke), viser dialogen HTTP-statuskoden og svarteksten, så du kan se præcis, hvad Slack eller Discord ikke accepterede. Det skyldes typisk en kopi-/indsæt-fejl i URL'en.

## Fejlfinding

- **Ingen besked vises, og leveringsstatus er `400`**: Connector Type er typisk sat til **Standard**, mens URL'en er en Slack- eller Discord-URL. Slack og Discord afviser den rå envelope. Skift dropdown til **Slack** eller **Discord**, og send testen igen.
- **Webhook deaktiveret automatisk**: Efter 3 fejlede leveringer i træk slår B1 webhooken fra. Ret URL'en (eller rotér den i Slack eller Discord), og slå **Aktiv** til igen.
- **Besked kom frem, men mangler detaljer**: Alle chatplatforme begrænser beskedstørrelsen. B1's beskeder er bevidst korte. Til rigere notifikationer kan du bruge [Zapier](./zapier) eller [Make](./make) til at sammensætte en fyldigere Slack-besked via deres Slack-handlinger.

## Skift af Connector Type senere

Du kan ændre Connector Type på en eksisterende webhook. Ændringen træder i kraft ved næste levering. Hvis du skifter fra Slack til Standard, peger du URL'en på dit eget HTTPS-endpoint. Den samme signeringshemmelighed (den blev udstedt, da webhooken blev oprettet) kan så bruges til at verificere den rå envelope.

## Se også

- [Zapier](./zapier): til flertrinsworkflows, der udløses af B1-hændelser
- [Make](./make): visuel scenariebygger
- [Webhooks (udviklerreference)](/docs/developer/api/webhooks): det fulde payload- og signaturformat, hvis du nogensinde peger en webhook på din egen server
