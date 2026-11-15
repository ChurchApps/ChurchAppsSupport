---
title: "Slack og Discord"
description: "Publiser hendelser fra B1 Admin, som nye personer, gaver og skjemainnsendinger, til en Slack- eller Discord-kanal med en innkommende webhook. Ingen Zapier nødvendig."
---

# Slack og Discord

<div class="article-intro">

Publiser lesbare varsler fra B1 direkte til en Slack- eller Discord-kanal: nye personer, gaver, påmeldinger til grupper, skjemainnsendinger, kalenderhendelser og mer. Ingen tredjepartskonto og ingen Zap å vedlikeholde. B1 formaterer hendelsene om til chatmeldinger og sender dem selv til kanalens webhook-URL.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen **Rediger innstillinger** i B1 Admin
- En administrator i Slack-arbeidsområdet eller Discord-serveren din, som kan opprette kanalens innkommende webhook
- Bestem hvilken kanal du vil ha varslene i (du kan bruke samme kanal for flere hendelsestyper, eller dele dem på flere kanaler)

</div>

## Slik fungerer det {#how-it-works}

B1 har en innebygd **Connector-type** for chatplattformer. Når du lager en webhook med typen **Slack** eller **Discord**, gjør webhook-motoren fortsatt sin vanlige levering, nytt forsøk og signerte headere. Men innholdet som sendes, omformes fra B1s vanlige `{event,churchId,data}`-konvolutt til den lille `{text}`-meldingen (Slack) eller `{content}`-meldingen (Discord) som disse tjenestene forventer.

B1-servere kontakter ikke Slack per kirke utover den eksisterende utgående webhook-flyten. Det er ingenting nytt å drifte og ingenting ekstra å betale for.

## Slack, steg for steg {#slack--step-by-step}

### 1. Skaff en innkommende webhook-URL for Slack {#1-get-a-slack-incoming-webhook-url}

1. Åpne [api.slack.com/apps](https://api.slack.com/apps) i Slack-arbeidsområdet du vil ha varslene i.
2. Klikk på **Create New App → From scratch**, gi den et navn som «B1 Notifications», og velg arbeidsområdet.
3. Velg **Incoming Webhooks** i venstremenyen, og slå **Activate Incoming Webhooks** til *On*.
4. Klikk på **Add New Webhook to Workspace**, velg kanalen (f.eks. `#donations`), og deretter **Allow**.
5. Slack sender deg tilbake til siden med en ny **Webhook URL** som ser ut slik: `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…`. Kopier den. Det er den eneste informasjonen B1 trenger.

:::caution
Behandle Slack-webhook-URL-en som en hemmelighet. Alle som har den, kan publisere vilkårlige meldinger i kanalen. Hvis den blir eksponert ved et uhell, lag en ny fra Slack-appsiden. Ny generering bytter bare URL-en. Oppdater B1 slik at den samsvarer.
:::

### 2. Koble til i B1 Admin {#2-connect-it-in-b1admin}

1. I B1 Admin går du til **Innstillinger → Utvikler → Webhooks**.
2. Klikk på **Ny webhook**.
3. Fyll ut:
   - **Navn**: noe lesbart som «Gaver → #donations». Bare teamet ditt ser det.
   - **Connector-type**: velg **Slack**.
   - **Payload-URL**: lim inn Slack-URL-en fra steg 1.
   - **Hendelser**: kryss av hendelsene du vil ha som meldinger. For en gavekanal er det bare `donation.created`. For en #people-kanal kan du prøve `person.created` og `group.member.added`.
4. Klikk på **Lagre**. Et dialogvindu om «Signeringshemmelighet» vises. Du kan ignorere det for Slack (Slack verifiserer ikke B1-signaturer), og lukke det.

### 3. Test den {#3-test-it}

Åpne webhooken på nytt fra listen, og klikk på **Send testhendelse**. B1 sender et eksempel på den første hendelsen du krysset av for. Innen et sekund eller to vises en melding som

> 💝 New donation: $50.00

i Slack-kanalen din, og en ny rad dukker opp i tabellen **Nylige leveranser** på samme skjerm med status `succeeded`. Da er du ferdig.

## Discord, steg for steg {#discord--step-by-step}

### 1. Skaff en Discord-webhook-URL {#1-get-a-discord-webhook-url}

1. I Discord-serveren din, hold musepekeren over kanalen du vil ha varslene i, og klikk på **⚙-tannhjulet** (Rediger kanal).
2. Åpne **Integrasjoner → Webhooks → Ny webhook**.
3. Gi den et navn og (valgfritt) et avatarbilde, og klikk deretter på **Kopier webhook-URL**. Den ser ut slik: `https://discord.com/api/webhooks/123…/abc…`.

### 2. Koble til i B1 Admin {#2-connect-it-in-b1admin-1}

Samme som Slack-flyten over, bortsett fra at du setter **Connector-type** til **Discord**. Lim inn Discord-URL-en i **Payload-URL** og lagre.

:::tip
Du trenger **ikke** å legge til `/slack` på slutten av Discord-URL-en. B1 sender Discord-native `{content}`-nyttelaster, ikke Slack-kompatible. Lim bare inn URL-en Discord ga deg.
:::

### 3. Test den {#3-test-it-1}

Samme knapp **Send testhendelse**. Discord viser meldingen i den valgte kanalen, og leveranseloggen går til `succeeded`.

## Slik ser meldingene ut {#what-the-messages-look-like}

| Hendelse | Eksempelmelding |
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

Hele listen finner du i [hendelseskatalogen for webhooks](/docs/developer/api/webhooks#event-catalog). Alle hendelser der kan sendes til Slack eller Discord.

## Én kanal per tema {#one-channel-per-topic}

Du må ikke legge alle hendelser på ett sted. De fleste kirker setter opp en håndfull webhooks:

- En kanal **#donations** som bare lytter til `donation.created`
- En kanal **#new-people** for `person.created` og `group.member.added`
- En kanal **#admin-alerts** for hendelser med lite volum, som `form.submission.created`

Det er ingen grense for hvor mange webhooks en kirke kan ha. Hver enkelt er uavhengig. Å slette eller deaktivere én påvirker ikke de andre.

## Inspiser leveranser {#inspecting-deliveries}

Tabellen **Nylige leveranser** i webhook-editoren viser de siste 50 forsøkene. Klikk på en rad for å se nøyaktig nyttelast som ble sendt, og svaret som kom tilbake. For en Slack-connector er nyttelasten `{"text":"💝 New donation: $50.00"}`, ikke den rå `{event,churchId,...}`-konvolutten, fordi B1 formaterer den om før levering.

Hvis noe mislyktes (et gult merke `failed` mens B1 fortsatt prøver på nytt, eller et rødt merke `exhausted` når den har gitt opp), viser kolonnen **Respons** HTTP-statusen. Dialogen for raden viser responsteksten, slik at du kan se nøyaktig hva Slack eller Discord ikke likte. Det er vanligvis en kopierings- eller limfeil i URL-en. Klikk på **Send på nytt** for å sende leveransen på nytt.

## Feilsøking {#troubleshooting}

- **Ingen melding vises, og leveransestatusen er `400`**: vanligvis er Connector-typen satt til **Standard**, men URL-en er en Slack- eller Discord-URL. Slack og Discord avviser den rå konvolutten. Bytt nedtrekksmenyen til **Slack** eller **Discord**, og send testen på nytt.
- **Webhooken er deaktivert automatisk**: B1 prøver hver mislykket leveranse på nytt i omtrent fem dager. Hvis tre leveranser på rad går tom for forsøk, slår B1 av webhooken (statusen viser **Disabled**). Rett URL-en (eller bytt den på Slack/Discord), slå **Active** på igjen, og lagre.
- **Meldingen kom frem, men mangler detaljer**: alle chatplattformer begrenser størrelsen på meldinger. B1s meldinger er korte med vilje. For rikere varsler bruker du [Zapier](./zapier.md) eller [Make](./make.md) til å lage en mer fullstendig Slack-melding med deres Slack-handlinger.

## Bytte Connector-type senere {#switching-connector-types-later}

Du kan endre Connector-typen på en eksisterende webhook. Endringen gjelder fra neste levering. Hvis du bytter fra Slack til Standard, peker du URL-en mot ditt eget HTTPS-endepunkt. Den samme signeringshemmeligheten (den ble utstedt da webhooken ble opprettet) kan da verifiseres som den rå konvolutten.

## Se også {#see-also}

- [Zapier](./zapier.md): for flertrinnsarbeidsflyter utløst av B1-hendelser
- [Make](./make.md): visuell scenariobygger
- [Webhooks (referanse for utviklere)](/docs/developer/api/webhooks): fullt format for nyttelast og signatur, hvis du noen gang peker en webhook mot din egen server
