---
title: "Slack & Discord"
---

# Slack & Discord

<div class="article-intro">

Post lesbare meldinger fra B1 direkte til en Slack- eller Discord-kanal — nye mennesker, donasjoner, gruppepåmeldinger, skjemainnsendinger, kalender-hendelser, og mer. Ingen tredjepartskonto, ingen Zap å vedlikeholde: B1 omformer hendelser til chat-meldinger og POSTs dem til kanalens webhook-URL selv.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen **Rediger innstillinger** i B1Admin
- En admin i Slack-arbeidsplassen eller Discord-serveren for å opprette kanalens innkommende webhook
- Bestem hvilken kanal du vil meldinger i (du kan bruke samme kanal for flere hendelsestyper, eller dele dem på tvers av kanaler)

</div>

## Hvordan det fungerer

B1 har en innebygd **koblertype** for chat-plattformer. Når du oppretter en webhook med type **Slack** eller **Discord**, gjør webhook-motoren sitt vanlige leveranseleveranse + gjøre forsøk på nytt + signert-overskrift-dans, men kroppen den sender blir omformet fra B1s normal `{event,churchId,data}`-konvolutt til den lille `{text}` (Slack) eller `{content}` (Discord) melding disse tjenestene forventer.

Ingen B1-servere strekker seg til Slack på per-kirke-basis utover den eksisterende utgående webhook-flyten — der er ingenting nytt å hoste, ingenting ekstra å betale for.

## Slack — trinn for trinn

### 1. Få en Slack innkommende webhook-URL

1. Åpne [api.slack.com/apps](https://api.slack.com/apps) i Slack-arbeidsplassen du vil meldinger i.
2. Klikk **opprett ny app → fra bunnen av**, gi det navn som "B1 meldinger", og velg arbeidsplassen.
3. I venstre nav velg **innkommende webhooks** og veksle **aktivere innkommende webhooks** til *på*.
4. Klikk **legg ny webhook til arbeidsplassen**, velg kanalen (f.eks. `#donations`), deretter **tillate**.
5. Slack lander deg tilbake på siden med en frisk **webhook-URL** som ser ut som `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…`. Kopier den — det er det eneste informasjonsstykket B1 trenger.

:::caution
behandle Slack webhook-URL-en som en hemmelighet. Hvem som helst med den kan sende vilkårlige meldinger til kanalen. Hvis du utilsiktet utsetter det, generer det på nytt fra Slack-app-siden (regenerering bare roterer URL-en; oppdater B1 for å matche).
:::

### 2. Koble det i B1Admin

1. I B1Admin gå til **Innstillinger → Utviklernavn → webhooks**.
2. Klikk **ny webhook**.
3. Fyll inn:
   - **navn** — noe lesbart som "donasjoner → #donations". Bare ditt lag ser det.
   - **koblertype** — velg **Slack**.
   - **nyttelast-URL** — lim inn Slack-URL-en fra trinn 1.
   - **hendelser** — kryss av hendelsene du vil som meldinger. For en donations-kanal, bare `donation.created`. For en #people-kanal, prøv `person.created` og `group.member.added`.
4. Klikk **lagre**. En "signeringshemmelighet"-dialog vises — du kan ignorere det for Slack (Slack bekrefter ikke B1-signaturer) og lukke det.

### 3. test det

Åpne webhoken igjen fra listen og klikk **send test-hendelse**. Innen et sekund eller to en melding som

> 💝 ny donasjon: $50.00

vises i Slack-kanalen, og en ny rad vises i **nylige leveranser**-tabellen på samme skjerm med status `suksess`. Du er ferdig.

## Discord — trinn for trinn

### 1. Få en Discord webhook-URL

1. I Discord-serveren din, hover over kanalen du vil meldinger i og klikk **⚙ gear** (rediger kanal).
2. Åpne **integrasjoner → webhooks → ny webhook**.
3. Gi det et navn og (valgfritt) en avatar, deretter klikk **kopier webhook-URL** — ser ut som `https://discord.com/api/webhooks/123…/abc…`.

### 2. Koble det i B1Admin

Identisk til Slack-flyten ovenfor, bortsett fra set **koblertype** til **Discord**. Lim inn Discord-URL-en i **nyttelast-URL** og lagre.

:::tip
Du trenger **ikke** å legge til `/slack` på slutten av Discord-URL-en — B1 sender Discord-egne `{content}`-nyttelaster, ikke Slack-kompatible. Bare lim inn URL-en Discord ga deg.
:::

### 3. test det

Samme **send test-hendelse**-knapp — Discord viser meldingen i valgt kanal og leveranselandet flipper til `suksess`.

## Hva meldingene ser ut som

| Hendelse | eksempel melding |
|---|---|
| `person.created` | 👤 ny person lagt til: Jordan Rivera |
| `person.updated` | 👤 person oppdatert: Jordan Rivera |
| `group.created` | 👥 ny gruppe opprettet: tirsdag bibeltekst |
| `group.member.added` | ➕ noen ble lagt til en gruppe |
| `donation.created` | 💝 ny donasjon: $50.00 |
| `donation.updated` | 💝 donasjon oppdatert: $75.00 |
| `attendance.recorded` | ✅ frammøte registrert |
| `form.submission.created` | 📝 ny skjemainnsending mottatt |
| `event.created` | 📅 ny hendelse: påske-tjeneste |

hele listen lever i [webhook hendelseskatalog](/docs/developer/api/webhooks#event-catalog) — enhver hendelse der kan rutes til Slack/Discord.

## en kanal per emne

Du trenger ikke å legge alle hendelser på ett sted. De fleste kirker setter opp en håndfull webhooks:

- en **#donations**-kanal som bare lytter til `donation.created`
- en **#new-people**-kanal for `person.created` og `group.member.added`
- en **#admin-alerts**-kanal for lavvolum-ting som `form.submission.created`

der er ingen grense for antall webhooks per kirke. Hver en er uavhengig — sletting eller deaktivering av en påvirker ikke de andre.

## inspeksjon av leveranser

webhook-redigeringens **nylige leveranser**-tabell viser de siste 50 forsøkene. Klikk en rad for å se den nøyaktige nyttelasaten som ble sendt og svaret som kom tilbake. For en Slack-kobler er nyttelasaten `{"text":"💝 ny donasjon: $50.00"}` — ikke den rå `{event,churchId,...}`-konvolutten — fordi B1 omformer det før leveransen.

Hvis noe mislyktes (rødt `mislyktes` eller `uttømt` badge), viser dialogen HTTP-status og svarkropp slik at du kan se nøyaktig hva Slack eller Discord ikke likte — vanligvis en copy/paste-feil i URL-en.

## Problemløsing

- **Ingen melding vises + leveranses status `400`** — vanligvis koblertypen er satt til **standard** men URL-en er en Slack/Discord-en. Slack/Discord avviser rå konvolutten. Bytt dropdown til **Slack** eller **Discord** og generer testen på nytt.
- **webhook auto-deaktivert** — etter 3 påfølgende mislykkede leveranser B1 slår webhoken av. Fikser URL-en (eller roter den på Slack/Discord) og veksle **aktiv** tilbake på.
- **melding ankom men mangler detalj** — hver chat-plattform begrenser meldingsstørrelse. B1s meldinger er en-linjer ved design; for rikere meldinger bruk [Zapier](./zapier) eller [Make](./make) for å komponere en fullere Slack-melding via deres Slack-handlinger.

## bytte koblertyper senere

Du kan endre koblertypen på en eksisterende webhook — den tar virkning ved neste leveranse. Hvis du bytter fra Slack til standard, pek URL-en på ditt eget HTTPS-endepunkt og samme signeringshemmelighet (det ble utstedt når webhoken ble opprettet) begynner å være verifiserbar som rå konvolutten.

## Se også

- [Zapier](./zapier) — for multi-trinns arbeidsflyter utløst av B1-hendelser
- [Make](./make) — visuell scenario-bygger
- [webhooks (utviklerreferanse)](/docs/developer/api/webhooks) — hele nyttelast + signaturformat hvis du noen gang peker en webhook på din egen server
