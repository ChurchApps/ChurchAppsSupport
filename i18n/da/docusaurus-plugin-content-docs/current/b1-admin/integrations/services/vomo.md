---
title: "VOMO"
---

# VOMO

<div class="article-intro">

VOMO er en platform for frivilligengagement, hvor folk tilmelder sig projekter, checker ind ved kiosken og samler timer. Hvis du bruger VOMO til planlægning af frivillige, men B1 til personregistrene, kan Zapier synkronisere medlemskaber og check-ins mellem dem, så ingen af systemerne kommer i uoverensstemmelse med det andet.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- En [VOMO](https://vomo.org)-konto på et abonnement, der giver adgang til Zapier (spørg VOMOs support, hvis du er i tvivl)
- En [Zapier](https://zapier.com)-konto
- En B1Admin-bruger med tilladelsen **Edit Settings**

</div>

## Hvad du kan koble op

VOMOs Zapier-app tilbyder fire øjeblikkelige triggere og fire handlinger. Her er de opskrifter, de fleste kirker ønsker:

| Retning | Trigger | Handling |
|---|---|---|
| VOMO → B1 | VOMO Membership (oprettet) | B1: Find Person → Create Person (hvis ny) |
| VOMO → B1 | VOMO kiosk-check-in | B1: Add Group Member til en gruppe "Currently Serving", eller registrér som fremmøde |
| B1 → VOMO | B1 `person.created` | VOMO: Find Organizer (efter e-mail); ellers et tilpasset trin |
| Begge | VOMO Participation (tilmeldinger) | B1: Add Group Member til en projektspecifik gruppe |

VOMO-handlingerne er begrænset til **at oprette udkast til projekter** og **at finde** eksisterende organisatorer og projekter. Der findes i dag ingen handling til at tilføje en person til et VOMO-projekt. Den mest interessante kobling går primært fra VOMO → B1.

## Opsætning

### 1. Opret en B1 API-nøgle

**Settings → Developer → API Keys → New API Key**. Scopes:

- `people:read`, `people:write`: til at slå frivillige op og oprette dem som B1-personer
- `groups:write`: til at tilføje dem til tjenestegrupper
- (Valgfrit) `attendance:write`, hvis du behandler kiosk-check-ins som fremmøde

### 2. Byg Zap'en for medlemssynkronisering

1. **Trigger**: VOMO: Membership (event = `created`).
2. **Handling**: B1.church: Find Person, matchet på e-mail.
3. **Filter / Path**: forgren efter, om personen blev fundet eller ikke:
   - Ikke fundet → B1.church: Create Person, derefter Add Group Member til den relevante frivilliggruppe.
   - Fundet → B1.church: Add Group Member direkte.
4. Slå den til. Nye frivillige fra VOMO vises nu i B1 med det rigtige gruppemedlemskab.

### 3. (Valgfrit) Byg Zap'en for kiosk-check-in

1. **Trigger**: VOMO: Kiosk
2. **Handling**: B1.church: Find Person (efter e-mail)
3. **Handling**: dit valg:
   - *Hvis det behandles som fremmøde*: Webhooks by Zapier sender et POST til B1's `/attendance/visits`-endpoint (B1's Zapier-app har endnu ikke en førsteklasses handling *Record Attendance*). B1's [API-nøgle](/docs/developer/api/api-keys) placeres i headeren `Authorization: Bearer cak_…`.
   - *Hvis det behandles som gruppemedlemskab*: B1.church: Add Group Member med gruppen "Currently Serving (Today)", og en anden Zap senere på dagen fjerner dem igen via en planlagt oprydning.

## Almindelige opskrifter

### Gruppesynkronisering pr. projekt

- **Trigger**: VOMO: Participation (created)
- **Handling**: Filter by Zapier på projekt-id, derefter
- **Handling**: B1.church: Add Group Member til en B1-gruppe, hvis navn spejler VOMO-projektet.

Når VOMO-projektet er afsluttet, skal du rydde B1-gruppen manuelt (eller kombinere dette med en trigger *Participation deleted*, der fjerner dem).

### Send en sms med "tak for din tilmelding"

Kæd VOMO Participation sammen med Clearstream Send Text eller Text In Church Send Message i samme Zap. Begge har førsteklasses Zapier-handlinger. Se [Clearstream](./clearstream) og [Text In Church](./text-in-church).

### Opdag frafald

Kør en daglig Zapier-*Schedule*-trigger, der kalder Find Organizer i VOMO for en liste over B1-personer, der er blevet en del af tjenesteteamet i denne måned. Hvis VOMO svarer "ikke fundet", har de ikke aktiveret VOMO og har brug for en påmindelse.

## Begrænsninger og noter

- **E-mail er nøglen til sammenkædning.** VOMOs payloads indeholder en brugers e-mail, men intet B1-person-id. Personer, der bruger forskellige e-mails i hvert system, vil oprette dubletter.
- **Ingen handling "Add to Project" i VOMOs Zapier-app i dag.** Hvis du har brug for at tilmelde personer fra B1 til VOMO-projekter, skal du sende et POST til VOMOs REST-API fra et *Webhooks by Zapier*-trin. Det er en tilpasset integration.
- **VOMOs gratis eller lavere abonnementer inkluderer muligvis ikke Zapier.** Bekræft med VOMOs support, før du lover en dato for koblingen.

## Fejlfinding

- **Trigger aktiveres aldrig**: VOMOs øjeblikkelige triggere kræver, at API-tokenet forbliver gyldigt. Test Zap'en igen, og forbind VOMO igen, hvis tokenet er blevet roteret.
- **B1 *Add Group Member* fejler med 422**: gruppe-id'et i handlingen findes ikke. Åbn **B1Admin → Groups**, klik på gruppen, og kopiér id-segmentet fra URL'en ind i Zap-trinnet.
- **Dubletter af B1-personer fra en enkelt frivillig i VOMO**: personen har sandsynligvis tilmeldt sig med en anden e-mail end den, de allerede havde i B1. Enten standardisér e-mails, eller tilføj en Zapier-*Path*, der også søger efter telefonnummer, før der oprettes en ny person.

## Se også

- [Zapier (overblik)](../zapier): B1-siden af alle Zapier-opskrifter
- [Clearstream](./clearstream), [Text In Church](./text-in-church): kobler frivilliges tilmeldinger sammen med sms-bekræftelser
- [Webhooks (udviklerreference)](/docs/developer/api/webhooks): de hændelser, VOMO kan udløse på
