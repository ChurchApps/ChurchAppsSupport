---
title: "Overdracht risicobeoordeling"
---

# Overdracht risicobeoordeling

<div class="article-intro">

Dit document bevat ChurchApps' beoordeling van risico's verbonden aan internationale overdrachten van persoonlijke gegevens van het VK/EEA naar de Verenigde Staten, zoals vereist onder UK GDPR en EU GDPR. Dit is een interne compliancegegevens die door ChurchApps als gegevensprocessor wordt bijgehouden.

</div>

**Laatst gecontroleerd:** April 2026

## 1. Overdrachtsdetails

| Item | Detail |
|---|---|
| **Gegevensexporteur** | Kerken die ChurchApps gebruiken (gegevenscontrollers) in het VK/EEA |
| **Gegevensimporteerder** | ChurchApps (gegevensprocessor), werkend vanuit de Verenigde Staten |
| **Categorieën van gegevensonderwerpen** | Kerkleden, deelnemers, bezoekers, donoren, vrijwilligers, kinderen (beheerd door ouders/beheerders) |
| **Categorieën van persoonlijke gegevens** | Namen, e-mailadressen, telefoonnummers, postadres, geboortedatums, geslacht, burgerlijke staat, profielfoto's, donatiegegevens, aanwezigheidsgegevens, groepslidmaatschappen, vrijwilligerstoewijzingen, berichtgeschiedenis |
| **Gevoelige gegevens** | Geen opzettelijk verzameld. Geen gezondheidsgegevens, biometrische gegevens of strafblad worden opgeslagen. Financiële rekeningdetails (creditcards, bankrekeningen) worden nooit opgeslagen door ChurchApps -- deze worden rechtstreeks door Stripe verwerkt. |
| **Doel van overdracht** | Verstrekken van kerkbeheersoftware (ledenbeheer, donaties, aanwezigheidsregistratie, communicatie, vrijwilligers planning, event-registratie) |
| **Bestemmingsland** | Verenigde Staten |
| **Overdrachsmechanisme** | EU Standard Contractual Clauses (SCC's) en UK International Data Transfer Addendum (IDTA), opgenomen via de AWS Data Processing Addendum |

## 2. Subprocessors

| Subprocessor | Rol | Locatie | Overdrachsmechanisme |
|---|---|---|---|
| **Amazon Web Services (AWS)** | Infrastructuurhosting, gegevensopslag, contentlevering (us-east-2 regio) | Verenigde Staten | AWS DPA met SCC's (automatisch opgenomen in AWS Service Terms) |
| **Stripe** | Betalingsverwerking voor donaties | Verenigde Staten | Stripe DPA met SCC's |

Creditcard- en bankrekeninggegevens worden rechtstreeks van de browser van de gebruiker naar Stripe verzonden en worden nooit op ChurchApps-servers opgeslagen of erdoorheen verzonden.

## 3. Risicobeoordeling

### 3.1 Versleuteling

- **In transit:** Alle gegevens worden versleuteld met behulp van TLS/HTTPS voor alle communicatie tussen gebruikers en ChurchApps-servers.
- **In rust:** Gegevens die op AWS zijn opgeslagen, worden in rust versleuteld met behulp van AWS-beheerde versleuteling.

### 3.2 Toegangsbesturingselementen

- Productieservertoegang is beperkt tot twee personen die leden van het bestuursbestuur van ChurchApps zijn.
- Ontwikkelaars, vrijwilligers en andere bestuursleden hebben geen toegang tot productieservers of databases.
- Databaseservers bevinden zich achter een firewall en zijn niet rechtstreeks toegankelijk via internet.
- Kerkgegevens zijn logisch gescheiden -- elke kerk kan alleen via applicatie-niveau toegangsbesturingselementen toegang krijgen tot de eigen gegevens.

### 3.3 Gegevenssegmentatie

Gegevens worden verdeeld over zes onafhankelijke databases (lidmaatschap, geven, aanwezigheid, berichten, doen, inhoud). Compromis van één database stelt de gegevens van de anderen niet bloot. De Giving-database bevat bijvoorbeeld donatiegegevens en datums, maar niet de namen of contactgegevens van donoren (opgeslagen in Membership).

### 3.4 Gegevensminimalisering

- Geen creditcard- of bankrekeninggegevens worden opgeslagen (afgehandeld door Stripe).
- Wachtwoorden worden opgeslagen met behulp van eenrichtingshashin en kunnen niet worden opgehaald.
- Kerken bepalen welke gegevens zij van hun leden verzamelen.

### 3.5 Rechten van gegevensonderwerpen

ChurchApps biedt technische hulpmiddelen waarmee kerken verzoeken van gegevensonderwerpen kunnen vervullen:

- **Toegang & Portabiliteit:** Volledige gegevensexport in machine-leesbaar JSON-formaat.
- **Vergetelheid:** Anonimisering in alle zes databases, persoonlijke gegevens vervangen door generieke waarden terwijl cumulatieve gegevens nodig voor financiële rapportage behouden blijven.
- **Beperking:** Inactieve lidmaatschapsstatus sluit personen uit van zoeken, directorybestanden, rapporten en berichten terwijl hun gegevens behouden blijven.
- **Rechtsbijstand:** Leden en beheerders kunnen persoonlijke informatie via de toepassing bewerken.

### 3.6 Inbreukmelding

ChurchApps verplicht zich ervan uitgaande kerken binnen 72 uur van het bewustzijn van een gegevenslekng op de hoogte te stellen, zoals vastgelegd in de [Servicevoorwaarden](https://churchapps.org/terms) (sectie 11.6).

### 3.7 Risico van toegang van de VS-regering

Het primaire risico verbonden aan gegevens die in de VS worden gehost, is mogelijke toegang door Amerikaanse regeringsfunctionarissen onder FISA sectie 702 of Executive Order 12333. Dit risico wordt beoordeeld als **laag** om de volgende redenen:

- ChurchApps verwerkt kerklidmaatschap en aanwezigheidsgegevens, geen gegevens van inlichtingenenwaarde.
- Gegevensonderwerpen zijn kerkleden en deelnemers -- niet categorieën die doorgaans door surveillanceprogramma's worden benaderd.
- Geen gevoelige persoonlijke gegevens (gezondheid, financiële rekeningen, politieke meningen) worden opgeslagen.
- De DPA van AWS bevat verplichtingen met betrekking tot verzoeken van de regering en transparantierapporten.
- Het EU-VS Data Privacy Framework (opgericht 2023) biedt aanvullende waarborgen voor gegevensoverdrachten naar gecertificeerde Amerikaanse organisaties.

## 4. Algehele risicoverstelling

Het risico voor gegevensonderwerpen van deze internationale overdracht wordt beoordeeld als **laag**. De combinatie van:

- Standard Contractual Clauses als het juridische overdrachsmechanisme
- Versleuteling in transit en in rust
- Strikte toegangsbesturingselementen met slechts twee geautoriseerde personen
- Gegevenssegmentatie over onafhankelijke databases
- Geen opslag van financiële rekeningdetails
- Lage gevoeligheid en lage inlichtingenwaarde van de verwerkte gegevens
- Technische hulpmiddelen voor het uitoefenen van alle rechten van gegevensonderwerpen

biedt voldoende aanvullende maatregelen om ervoor te zorgen dat de overgedragen gegevens een beschermingsniveau krijgen dat essentieel gelijk is aan dat gegarandeerd in het VK/EEA.

## 5. Controleschema

Deze beoordeling zal jaarlijks of bij een wezenlijke wijziging van de gegevensverwerking, subprocessors of juridisch kader voor internationale gegevensoverdrachten worden herzien.
