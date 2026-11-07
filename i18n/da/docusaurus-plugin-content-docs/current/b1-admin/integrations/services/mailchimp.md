---
title: "Mailchimp"
description: "Synkronisér B1 Admin-personer og gruppe- eller gemte lister til et Mailchimp-publikum som tags, med opsætning, første import og fejlfinding."
---

# Mailchimp

<div class="article-intro">

Hold en Mailchimp-målgruppe synkroniseret med B1 automatisk: personer kommer ind med navn, e-mail og telefonnummer, gruppe- og listemedlemskab bliver til Mailchimp-tags, og slettede personer arkiveres. Synkroniseringen er indbygget i B1. Der kræves ingen tredjepartstjeneste og ingen betaling pr. opgave, og ændringer kommer næsten i realtid i stedet for på en natlig tidsplan.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- En [Mailchimp](https://mailchimp.com)-konto med den målgruppe, du vil have B1 til at administrere
- En Mailchimp **API-nøgle** (Mailchimp: profilikon → **Account & billing → Extras → API keys**)
- Dit **Audience ID** (Mailchimp: **Audience → Settings → Audience name and defaults**)
- En B1Admin-bruger med tilladelsen **Edit Settings**

</div>

## Hvad synkroniseres

| Ændring i B1 | Effekt i Mailchimp |
|---|---|
| Person tilføjet eller opdateret | Abonnent tilføjes/opdateres (fornavn, efternavn, telefon; nye abonnenter får status `subscribed`) |
| Person slettet (eller slettet efter GDPR) | Abonnent arkiveres |
| Person bliver medlem af en gruppe | Tag med gruppens navn tilføjes |
| Person forlader en gruppe | Det tag fjernes |
| Person kommer ind på en gemt liste | Tag med listens navn tilføjes |
| Person forlader en gemt liste | Det tag fjernes |

**Gemte lister er som regel den bedre kilde til tags.** En B1 [gemt liste](/docs/b1-admin/people/lists) er en regelbaseret målgruppe, der selv genberegner sit indhold, fx „alle på Nordcampus“ eller „medlemmer, der har tilmeldt sig pastorale e-mails“. Peg dine Mailchimp-segmenter på listetags, så holder synkroniseringen dem opdateret. Brug gruppetags til udsendelser til tjenesteteams.

Synkroniseringen går **kun én vej** (B1 → Mailchimp) og rører kun Mailchimps standardfelter, så den ikke kan komme i konflikt med flettefelter eller segmenter, du administrerer i Mailchimp.

## Opsætning

1. Gå i B1Admin til **Settings → Developer → Webhooks → New Webhook**.
2. Sæt **Connector Type** til **Mailchimp**.
3. Indsæt din **Mailchimp API Key** og dit **Audience ID**. Nøglen gemmes krypteret og vises aldrig igen.
4. De relevante hændelser er forvalgt. Fjern markeringen ved dem, du ikke ønsker (fx kan du lade personhændelser være aktive og springe gruppetags over).
5. Gem. B1 verificerer nøglen og målgruppen over for Mailchimp, før de accepteres. En tastefejl fejler med det samme og med en årsag.

Brug **Send Test** når som helst til at bekræfte forbindelsen igen. Hvert synkroniseringsforsøg logges i webhookens leveringshistorik med Mailchimps faktiske svar, og mislykkede leveringer forsøges automatisk igen med stigende ventetid i cirka fem dage.

## Første import

Connectoren synkroniserer *ændringer* fra det øjeblik, den er slået til. Den henter ikke din eksisterende kartotek tilbage. Til opsætningsdagen:

1. Gå i B1Admin til **People**, søg efter de personer, du vil have med (eller kør en gemt liste), og klik på **Export** for at downloade en CSV-fil.
2. Brug i Mailchimp **Audience → Import contacts** til at indlæse CSV-filen, og tilføj eventuelle tags under importen.

Når du laver den første indlæsning via Mailchimps importværktøj, bevarer du kontrollen over samtykket. Importér kun personer, der faktisk har accepteret at modtage dine e-mails. Masseimport af et helt kartotek som abonnenter kan overtræde Mailchimps vilkår og anti-spamlovgivningen (CAN-SPAM/GDPR).

## Begrænsninger og noter

- **Synkronisering i én retning.** Afmeldinger, bounces og redigeringer foretaget i Mailchimp sendes ikke tilbage til B1. En person, der afmelder sig i Mailchimp, kan stadig modtage e-mails, der sendes direkte fra B1. Behandl Mailchimp som den endelige kilde for samtykke til masseudsendelser.
- **Personer uden e-mailadresse springes over** (og det logges i leveringshistorikken), fordi Mailchimp-abonnenter identificeres ud fra e-mail.
- **Ændring af e-mailadresse opretter en ny abonnent.** Mailchimp identificerer personer ud fra e-mail. Hvis du ændrer en persons e-mail i B1, tilføjes personen under den nye adresse. Den gamle abonnent bliver liggende, indtil du arkiverer den i Mailchimp.
- **Kun standardfelter synkroniseres**, nemlig fornavn, efternavn og telefon. Medlemsstatus, kirkecampus og egne B1-felter kortlægges ikke til Mailchimp-flettefelter i denne version. Brug listetags til at segmentere i stedet.
- **Tagnavne er gruppe- og listenavnene.** Hvis du omdøber en gruppe eller liste, begynder tagging under det nye navn. Det gamle tag bliver på eksisterende abonnenter, indtil du fjerner det i Mailchimp.
- **Mailchimps kontakgrænser gælder stadig.** Hvis en synkronisering skubber en gratis målgruppe over loftet, logges fejl med `Member limit reached` i leveringshistorikken.

## Andre opskrifter (Zapier / Make)

Alt ud over synkronisering af målgrupper, fx tagging af givere ved `donation.created`, en omvendt retning fra Mailchimp til B1, eller synkronisering til en helt anden e-mailplatform (Constant Contact, Brevo osv.), kan stadig gøres med [Zapier](../zapier.md) eller [Make](../make.md). De udløses af de samme webhook-hændelser:

- **Tag givere:** B1 *New Donation* → B1 *Find Person* → Mailchimp *Add Subscriber to Tag* (`Gave-2026`)
- **Begge retninger:** Mailchimp *New Subscriber* → B1 *Create Person*

Hvis du tidligere har sat person- og gruppesynkronisering op via Zapier, skal du slukke for de Zaps, når du har aktiveret den indbyggede connector. Hvis begge kører, behandles hver hændelse to gange, og du bruger Zapier-opgaver uden grund.

## Fejlfinding

- **Gem fejler med „Mailchimp rejected the API key“**: Nøglen er blevet tilbagekaldt eller skrevet forkert. Nøgler skal ende med et datacenter-suffiks som `-us21`.
- **Gem fejler med „audience not found“**: Audience ID'et findes ikke under den konto. Kopiér det fra **Audience → Settings → Audience name and defaults**. Det er ikke målgruppens navn.
- **En person er aldrig dukket op i Mailchimp**: Tjek webhookens leveringshistorik. „Skipped: person has no email address“ betyder netop det. En `4xx`-fejl fra Mailchimp viser årsagen i svarets indhold.
- **Leveringerne er helt standset**: Efter gentagne mislykkede leveringer deaktiveres webhooken automatisk. Ret årsagen (oftest en tilbagekaldt nøgle), aktiver webhooken igen, og brug **Send Test** til at bekræfte.

## Se også

- [Webhooks (udviklerreference)](/docs/developer/api/webhooks): motoren bag, hændelseskataloget og reglerne for levering og genforsøg
- [Gemte lister](/docs/b1-admin/people/lists): regelbaserede målgrupper, der passer naturligt til Mailchimp-tags
- [Zapier (oversigt)](../zapier.md): til opskrifter ud over synkronisering af målgrupper
