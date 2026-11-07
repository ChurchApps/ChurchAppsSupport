---
title: "Anslutna tjänster"
---

# Anslutna tjänster

<div class="article-intro">

Det snabbaste sättet att koppla B1 till ett annat kyrkoteknikverktyg är oftast ett Zapier- eller Make-recept. Du behöver ingen ny B1-infrastruktur, och tredjepartstjänsten står för arbetsflödet. Den här sidan är en utvald lista över tjänster vi har bekräftat går att koppla ihop redan idag, med en kort installationsguide för varje som du kan kopiera och klistra in.

</div>

## Översikt

| Tjänst | Kategori | Brygga | Vad du kan koppla |
|---|---|---|---|
| [Mailchimp](./mailchimp) | E-post | Zapier eller Make | Synkronisera nya personer och givare i B1 till en Mailchimp-målgrupp |
| [Donorbox](./donorbox) | Donationer | Zapier | Skicka Donorbox-donationer och givare tillbaka till B1 |
| [Subsplash](./subsplash) | App / Donationer | Zapier | Hämta Subsplash-gåvor och personer till B1 |
| [VOMO](./vomo) | Volontärarbete | Zapier | Synkronisera volontäranmälningar mellan B1-grupper och VOMO-projekt |
| [Clearstream](./clearstream) | SMS | Zapier | Utlös ett Clearstream-sms från B1-händelser; ta emot svar som B1-poster |
| [Text In Church](./text-in-church) | SMS / Arbetsflöden | Zapier | Utlös Text In Church-arbetsflöden från B1; ta emot Connect Card-data |
| [Mobile Message](./mobile-message) | SMS (AU) | Webhooks by Zapier eller Make | Skicka sms från valfri B1-händelse |
| [Checkr](./checkr) | Bakgrundskontroller | Make | Starta en bakgrundskontroll när någon går med i ett tjänstelag |

## Gemensamt för alla dessa

1. **B1-sidan av kopplingen är identisk.** Skapa en API-nyckel med rätt behörigheter i **B1Admin → Settings → Developer → API Keys** och låt sedan bryggan registrera en webhook för utlösaren (Zapier och Make gör detta automatiskt, kräver `settings:write`), eller anropa B1:s REST-endpoints från en efterföljande åtgärd.
2. **Bryggan faktureras av dig, inte av oss.** ChurchApps är gratis. Zapier och Make har båda gratisnivåer som täcker några recept.
3. **Du kan testa kopplingen utan att gå live.** Båda bryggorna har en knapp "Test step" som utlöser händelsen en gång mot B1 och visar datastrukturen innan du aktiverar receptet.

## Välja en brygga

- **Zapier** är vänligare och har den större appkatalogen. Använd det som standard om inte kostnaden är ett problem.
- **Make** är billigare i stor skala och har mer flexibel routing och filterlogik. Använd det när ett enskilt arbetsflöde har fan-out, villkor eller många steg.
- **Webhooks by Zapier** (används i dokumentationen för Mobile Message) är en generisk adapter som låter dig skicka POST till valfri HTTP-endpoint från en Zap när målet inte är en förstklassig Zapier-app.

Om du vill ha något som inte finns på listan är B1:s [REST API](/docs/developer/api) och [webhooks](/docs/developer/api/webhooks) öppna. Du kan bygga en engångsbrygga med [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) på några timmar.

## Vad som inte finns här (och varför)

Flera populära kyrkoteknikverktyg, som Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck och MinistrySafe, saknar idag en publicerad Zapier-app eller Make-modul. De har egna API:er, men att koppla dem till B1 är ett skräddarsytt kodjobb, inte ett recept, så de passar inte in på listan. Om en leverantör lägger till en Zapier-app eller ett Make-modul lägger vi till dokumentationen.

Vi har också medvetet utelämnat Planning Center Services-specifika verktyg (musik, presentation), konkurrerande ChMS-produkter, migreringskonsulter och verktyg som bara rensar PCO-specifik data. Ingen av dem har en användbar kopplingsväg till B1.

## Se även

- [Zapier (översikt)](../zapier): B1-sidan av varje Zapier-recept är identisk, och den här dokumentationen täcker den en gång.
- [Make (översikt)](../make): samma sak för Make-scenarier.
- [Slack & Discord](../slack-discord): chattnotiser utan någon brygga.
- [Google Sheets](../google-sheets): exporter på begäran.
- [Webhooks (utvecklarreferens)](/docs/developer/api/webhooks): händelsekatalogen som alla recept förlitar sig på.
