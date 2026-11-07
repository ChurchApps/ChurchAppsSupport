---
title: "Överföringsriskbedömning"
---

# Överföringsriskbedömning

<div class="article-intro">

Detta dokument dokumenterar ChurchApps bedömning av riskerna förknippade med internationella överföringar av personuppgifter från Storbritannien/EES till USA, enligt kraven i brittiska GDPR och EU:s GDPR. Detta är en intern efterlevnadsrapport som förs av ChurchApps i rollen som personuppgiftsbiträde.

</div>

**Senast granskad:** april 2026

## 1. Överföringens detaljer

| Uppgift | Detalj |
|---|---|
| **Dataexportör** | Kyrkor som använder ChurchApps (personuppgiftsansvariga) med säte i Storbritannien/EES |
| **Dataimportör** | ChurchApps (personuppgiftsbiträde), verksamt från USA |
| **Kategorier av registrerade** | Kyrkomedlemmar, deltagare, besökare, givare, frivilliga, barn (hanteras av föräldrar/administratörer) |
| **Kategorier av personuppgifter** | Namn, e-postadresser, telefonnummer, postadresser, födelsedatum, kön, civilstånd, profilbilder, donationsregister, närvaroregister, gruppmedlemskap, frivilliguppdrag, meddelandehistorik |
| **Känsliga uppgifter** | Inga avsiktligt insamlade. Inga hälsouppgifter, biometriska uppgifter eller belastningsregisterutdrag lagras. Finansiella kontouppgifter (kreditkort, bankkonton) lagras aldrig av ChurchApps – dessa hanteras direkt av Stripe. |
| **Syfte med överföringen** | Tillhandahållande av programvara för kyrkoadministration (medlemshantering, donationer, närvarouppföljning, kommunikation, schemaläggning av frivilliga, eventregistrering) |
| **Destinationsland** | USA |
| **Överföringsmekanism** | EU:s standardavtalsklausuler (SCC) och brittiskt tillägg om internationella dataöverföringar (IDTA), införlivade via AWS:s personuppgiftsbiträdesavtal |

## 2. Underbiträden

| Underbiträde | Roll | Plats | Överföringsmekanism |
|---|---|---|---|
| **Amazon Web Services (AWS)** | Infrastrukturhosting, datalagring, innehållsleverans (region us-east-2) | USA | AWS DPA med SCC (ingår automatiskt i AWS:s tjänstevillkor) |
| **Stripe** | Betalningshantering för donationer | USA | Stripes DPA med SCC |

Kredit- och bankkontouppgifter överförs direkt från användarens webbläsare till Stripe och lagras aldrig på eller överförs genom ChurchApps servrar.

## 3. Riskbedömning

### 3.1 Kryptering

- **Under överföring:** All data krypteras med TLS/HTTPS för all kommunikation mellan användare och ChurchApps servrar.
- **Vilande data:** Data som lagras på AWS krypteras i vila med AWS-hanterad kryptering.

### 3.2 Åtkomstkontroller

- Åtkomst till produktionsservrar är begränsad till två personer som är medlemmar i ChurchApps styrelse.
- Utvecklare, frivilliga och andra styrelseledamöter har inte åtkomst till produktionsservrar eller databaser.
- Databasservrar är placerade bakom en brandvägg och är inte direkt åtkomliga från internet.
- Kyrkodata är logiskt separerad – varje kyrka kan endast komma åt sina egna data genom åtkomstkontroller på applikationsnivå.

### 3.3 Dataseparation

Data är fördelad över sex oberoende databaser (Medlemskap, Givande, Närvaro, Meddelanden, Uppgifter, Innehåll). Att en databas komprometteras innebär inte att data från de övriga exponeras. Till exempel innehåller givardatabasen donationsbelopp och datum, men inte givarnas namn eller kontaktuppgifter (dessa lagras i Medlemskap).

### 3.4 Dataminimering

- Inga kredit- eller bankkontouppgifter lagras (hanteras av Stripe).
- Lösenord lagras med envägshashning och kan inte återskapas.
- Kyrkor bestämmer vilka uppgifter de samlar in om sina medlemmar.

### 3.5 Registrerades rättigheter

ChurchApps tillhandahåller tekniska verktyg som gör det möjligt för kyrkor att uppfylla begäranden från registrerade:

- **Tillgång och dataportabilitet:** Fullständig export av data i maskinläsbart JSON-format.
- **Radering:** Anonymisering i alla sex databaser, där personuppgifter ersätts med generiska värden samtidigt som sammanställda poster som krävs för ekonomisk redovisning bevaras.
- **Begränsning:** Inaktiv medlemsstatus exkluderar personer från sökning, katalog, rapporter och meddelanden, men deras post bevaras.
- **Rättelse:** Medlemmar och administratörer kan redigera personuppgifter i applikationen.

### 3.6 Anmälan om personuppgiftsincidenter

ChurchApps åtar sig att underrätta berörda kyrkor inom 72 timmar från det att vi fått kännedom om en personuppgiftsincident, enligt dokumentationen i [Användarvillkoren](https://churchapps.org/terms) (avsnitt 11.6).

### 3.7 Risk för amerikansk myndighetsåtkomst

Den främsta risken förknippad med data som hostas i USA är möjlig åtkomst av amerikanska myndigheter enligt FISA-avsnitt 702 eller Executive Order 12333. Denna risk bedöms som **låg** av följande skäl:

- ChurchApps behandlar uppgifter om kyrkomedlemskap och närvaro, inte uppgifter med underrättelsevärde.
- De registrerade är kyrkomedlemmar och deltagare – inte kategorier som typiskt är föremål för övervakningsprogram.
- Inga känsliga personuppgifter (hälsa, finansiella konton, politiska åsikter) lagras.
- AWS:s personuppgiftsbiträdesavtal innehåller åtaganden om myndigheters begäranden om åtkomst och transparensrapportering.
- EU–USA:s ramverk för dataskydd (Data Privacy Framework, etablerat 2023) ger ytterligare skyddsåtgärder för dataöverföringar till certifierade amerikanska organisationer.

## 4. Övergripande riskslutsats

Risken för de registrerade från denna internationella överföring bedöms som **låg**. Kombinationen av:

- Standardavtalsklausuler som rättslig överföringsmekanism
- Kryptering under överföring och i vila
- Strikta åtkomstkontroller med endast två behöriga personer
- Dataseparation över oberoende databaser
- Ingen lagring av finansiella kontouppgifter
- Låg känslighet och lågt underrättelsevärde för den behandlade datan
- Tekniska verktyg för att utöva alla registrerades rättigheter

ger tillräckliga kompletterande skyddsåtgärder för att säkerställa att de överförda uppgifterna åtnjuter en skyddsnivå som i huvudsak motsvarar den som garanteras inom Storbritannien/EES.

## 5. Granskningsschema

Denna bedömning kommer att granskas årligen eller vid väsentliga förändringar av personuppgiftsbehandlingen, underbiträden eller det rättsliga ramverk som styr internationella dataöverföringar.
