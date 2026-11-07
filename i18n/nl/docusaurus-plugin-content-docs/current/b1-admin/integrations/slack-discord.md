---
title: "Slack & Discord"
---

# Slack & Discord

<div class="article-intro">

Plaats leesbare meldingen uit B1 rechtstreeks in een Slack- of Discord-kanaal: nieuwe personen, donaties, aanmeldingen voor groepen, ingevulde formulieren, agenda-items en meer. Je hebt geen account van een derde partij nodig en je hoeft geen Zap te onderhouden. B1 zet gebeurtenissen om in chatberichten en stuurt die zelf naar de webhook-URL van het kanaal.

</div>

<div class="prereqs">
<h4>Voordat je begint</h4>

- Je hebt de rechten **Instellingen bewerken** nodig in B1Admin
- Een beheerder in je Slack-werkruimte of Discord-server die de Inkomende Webhook voor het kanaal kan aanmaken
- Bepaal in welk kanaal je de meldingen wilt ontvangen (je kunt hetzelfde kanaal voor meerdere soorten gebeurtenissen gebruiken, of ze over verschillende kanalen verdelen)

</div>

## Hoe het werkt

B1 heeft een ingebouwd **Connectortype** voor chatplatforms. Wanneer je een webhook maakt met het type **Slack** of **Discord**, doorloopt de webhook-engine nog steeds de gebruikelijke stappen van verzenden, opnieuw proberen en ondertekende headers. De inhoud die wordt verstuurd wordt echter omgevormd van de gebruikelijke envelop `{event,churchId,data}` van B1 naar het eenvoudige bericht `{text}` (Slack) of `{content}` (Discord) dat deze diensten verwachten.

B1-servers nemen bij deze functie geen contact op met Slack per kerk; er verloopt alleen de bestaande uitgaande webhook-flow. Er is dus niets nieuws te hosten en er zijn geen extra kosten.

## Slack — stap voor stap

### 1. Haal een Slack Inkomende Webhook-URL op

1. Open [api.slack.com/apps](https://api.slack.com/apps) in de Slack-werkruimte waarin je meldingen wilt ontvangen.
2. Klik op **Create New App → From scratch**, geef de app een naam zoals "B1 Notificaties" en kies de werkruimte.
3. Kies in het linkermenu **Incoming Webhooks** en zet **Activate Incoming Webhooks** op *On*.
4. Klik op **Add New Webhook to Workspace**, kies het kanaal (bijvoorbeeld `#donaties`) en klik op **Allow**.
5. Slack brengt je terug naar de pagina met een nieuwe **Webhook URL** die er zo uitziet: `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…`. Kopieer deze. Dit is het enige gegeven dat B1 nodig heeft.

:::caution
Behandel de Slack-webhook-URL als een geheim. Iedereen die deze heeft, kan willekeurige berichten in het kanaal plaatsen. Als je hem per ongeluk openbaar maakt, genereer er dan een nieuwe vanaf de Slack-apppagina. Een nieuwe URL vervangt de oude; werk daarna de instelling in B1 bij.
:::

### 2. Koppel het in B1Admin

1. Ga in B1Admin naar **Instellingen → Ontwikkelaar → Webhooks**.
2. Klik op **Nieuwe webhook**.
3. Vul het volgende in:
   - **Naam** — iets leesbaars zoals "Donaties → #donaties". Alleen jouw team ziet deze naam.
   - **Connectortype** — kies **Slack**.
   - **Payload-URL** — plak de Slack-URL uit stap 1.
   - **Gebeurtenissen** — vink de gebeurtenissen aan die je als berichten wilt ontvangen. Voor een donatiekanaal volstaat `donation.created`. Voor een #mensen-kanaal kun je `person.created` en `group.member.added` proberen.
4. Klik op **Opslaan**. Er verschijnt een dialoogvenster met een "Signing Secret". Voor Slack kun je dit negeren, want Slack controleert B1-handtekeningen niet. Sluit het venster.

### 3. Test het

Open de webhook opnieuw vanuit de lijst en klik op **Testgebeurtenis verzenden**. Binnen een seconde of twee verschijnt een bericht zoals

> 💝 Nieuwe donatie: $50.00

in je Slack-kanaal. Op hetzelfde scherm verschijnt een nieuwe regel in de tabel **Recente leveringen** met status `succeeded`. Je bent klaar.

## Discord — stap voor stap

### 1. Haal een Discord-webhook-URL op

1. Ga op je Discord-server naar het kanaal waarin je meldingen wilt ontvangen, beweeg de muis erover en klik op het **⚙ tandwiel** (Kanaal bewerken).
2. Open **Integraties → Webhooks → Nieuwe webhook**.
3. Geef de webhook een naam en eventueel een avatar, en klik daarna op **Webhook-URL kopiëren**. Die ziet er zo uit: `https://discord.com/api/webhooks/123…/abc…`.

### 2. Koppel het in B1Admin

Dit verloopt hetzelfde als de Slack-stappen hierboven, behalve dat je het **Connectortype** op **Discord** zet. Plak de Discord-URL in **Payload-URL** en sla op.

:::tip
Je hoeft **geen** `/slack` aan het einde van de Discord-URL toe te voegen. B1 stuurt Discord-eigen `{content}`-payloads, niet Slack-compatibele. Plak gewoon de URL die Discord je heeft gegeven.
:::

### 3. Test het

Gebruik dezelfde knop **Testgebeurtenis verzenden**. Discord toont het bericht in het gekozen kanaal en het leveringslogboek wordt `succeeded`.

## Hoe de berichten eruitzien

| Gebeurtenis | Voorbeeldbericht |
|---|---|
| `person.created` | 👤 Nieuwe persoon toegevoegd: Jordan Rivera |
| `person.updated` | 👤 Persoon bijgewerkt: Jordan Rivera |
| `group.created` | 👥 Nieuwe groep aangemaakt: Dinsdagse Bijbelstudie |
| `group.member.added` | ➕ Er is iemand aan een groep toegevoegd |
| `donation.created` | 💝 Nieuwe donatie: $50.00 |
| `donation.updated` | 💝 Donatie bijgewerkt: $75.00 |
| `attendance.recorded` | ✅ Aanwezigheid geregistreerd |
| `form.submission.created` | 📝 Nieuw formulier ontvangen |
| `event.created` | 📅 Nieuw evenement: Paasdienst |

De volledige lijst staat in de [webhook-gebeurtenissencatalogus](/docs/developer/api/webhooks#event-catalog). Elke gebeurtenis daarin kan naar Slack of Discord worden doorgestuurd.

## Eén kanaal per onderwerp

Je hoeft niet alle gebeurtenissen op één plek te zetten. De meeste kerken stellen een paar webhooks in:

- Een kanaal **#donaties** dat alleen naar `donation.created` luistert
- Een kanaal **#nieuwe-personen** voor `person.created` en `group.member.added`
- Een kanaal **#beheermeldingen** voor gebeurtenissen met weinig volume, zoals `form.submission.created`

Het aantal webhooks per kerk is onbeperkt. Elke webhook werkt zelfstandig. Als je er een verwijdert of uitschakelt, heeft dat geen invloed op de andere.

## Leveringen bekijken

In de webhook-editor toont de tabel **Recente leveringen** de laatste 50 pogingen. Klik op een rij om de exacte payload te zien die is verstuurd en het antwoord dat terugkwam. Bij een Slack-connector is de payload `{"text":"💝 Nieuwe donatie: $50.00"}` en niet de ruwe envelop `{event,churchId,...}`, omdat B1 deze vóór het verzenden omvormt.

Als er iets is mislukt (een rood label `failed` of `exhausted`), toont het venster de HTTP-status en het antwoord van de server, zodat je precies kunt zien wat Slack of Discord niet accepteerde. Meestal gaat het om een fout bij het kopiëren of plakken van de URL.

## Probleemoplossing

- **Er verschijnt geen bericht en de leveringsstatus is `400`** — meestal staat het Connectortype op **Standaard**, terwijl de URL een Slack- of Discord-URL is. Slack en Discord weigeren de ruwe envelop. Zet de keuzelijst op **Slack** of **Discord** en verstuur de testmelding opnieuw.
- **Webhook is automatisch uitgeschakeld** — na 3 opeenvolgende mislukte leveringen schakelt B1 de webhook uit. Corrigeer de URL (of genereer een nieuwe in Slack of Discord) en zet **Actief** weer aan.
- **Bericht is aangekomen, maar mist details** — elke chatdienst beperkt de berichtgrootte. De berichten van B1 zijn bewust kort. Voor uitgebreidere meldingen gebruik je [Zapier](./zapier) of [Make](./make), die via hun Slack-acties een vollediger Slack-bericht samenstellen.

## Later van Connectortype wisselen

Je kunt het Connectortype van een bestaande webhook wijzigen. Dit werkt vanaf de volgende levering. Als je van Slack naar Standaard overstapt, wijs je de URL naar je eigen HTTPS-eindpunt. Het bestaande ondertekeningsgeheim (dat is uitgegeven toen de webhook werd aangemaakt) kan dan worden gebruikt om de ruwe envelop te verifiëren.

## Zie ook

- [Zapier](./zapier) — voor werkstromen met meerdere stappen die door B1-gebeurtenissen worden gestart
- [Make](./make) — visuele scenario-builder
- [Webhooks (ontwikkelaarsreferentie)](/docs/developer/api/webhooks) — het volledige formaat voor payloads en handtekeningen, als je een webhook ooit naar je eigen server wilt laten wijzen
