---
title: "Mailchimp"
description: "Synkroniser personer i B1 Admin og medlemskap i grupper eller lagrede lister til en Mailchimp-målgruppe som merkelapper, med oppsett, første import og feilsøking."
---

# Mailchimp

<div class="article-intro">

Hold en Mailchimp-målgruppe automatisk synkronisert med B1. Personer kommer inn med navn, e-post og telefon. Medlemskap i grupper og lister blir Mailchimp-merkelapper, og slettede personer arkiveres. Synkroniseringen er innebygd i B1. Det er ingen tredjepartstjeneste og ingen måling per oppgave, og endringer kommer nesten i sanntid i stedet for på en nattlig plan.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En [Mailchimp](https://mailchimp.com)-konto med målgruppen du vil at B1 skal administrere
- En Mailchimp **API-nøkkel** (Mailchimp: profilikon → **Konto og fakturering → Tillegg → API-nøkler**)
- Din **målgruppe-ID** (Mailchimp: **Målgruppe → Innstillinger → Målgruppenavn og standarder**)
- En B1 Admin-bruker med tillatelsen **Rediger innstillinger**

</div>

## Hva som synkroniseres {#what-syncs}

| Endring i B1 | Effekt i Mailchimp |
|---|---|
| Person lagt til eller oppdatert | Abonnent lagt til eller oppdatert (fornavn, etternavn, telefon. Nye abonnenter kommer inn som `subscribed`) |
| Person slettet (eller slettet etter GDPR) | Abonnent arkivert |
| Person blir med i en gruppe | Merkelapp med gruppens navn legges til |
| Person forlater en gruppe | Den merkelappen fjernes |
| Person kommer inn i en lagret liste | Merkelapp med listens navn legges til |
| Person forlater en lagret liste | Den merkelappen fjernes |

**Lagrede lister er vanligvis den beste kilden til merkelapper.** En [lagret liste](/docs/b1-admin/people/lists) i B1 er en regelbasert målgruppe som evaluerer seg selv på nytt, for eksempel «alle på Nordre kampus» eller «medlemmer som har takket ja til pastorale e-poster». Pek Mailchimp-segmentene dine på listemerkelappene, så vedlikeholder synkroniseringen dem. Bruk gruppemerkelapper til utsendelser til tjenesteteam.

Synkroniseringen går **én vei** (B1 → Mailchimp) og rører bare Mailchimps standardfelt. Den kan derfor ikke komme i konflikt med flettefelt eller segmenter du administrerer i Mailchimp.

## Oppsett {#setup}

1. I B1 Admin går du til **Innstillinger → Utvikler → Webhooks → Ny webhook**.
2. Sett **Connector-type** til **Mailchimp**.
3. Lim inn **Mailchimp API-nøkkel** og **Målgruppe-ID**. Nøkkelen lagres kryptert og vises aldri igjen.
4. De relevante hendelsene er forhåndsvalgt. Fjern merket for dem du ikke vil ha (f.eks. la personhendelser være på, men hopp over gruppemerkelapper).
5. Lagre. B1 verifiserer nøkkelen og målgruppen mot Mailchimp før den godtar dem. En skrivefeil mislykkes umiddelbart med en begrunnelse.

Åpne webhooken på nytt og klikk på **Send testhendelse** når som helst for å bekrefte tilkoblingen på nytt. For Mailchimp sjekker den nøkkelen og målgruppen i stedet for å sende en prøveabonnent. Hvert synkroniseringsforsøk blir logget i webhookens leveranselogg, med Mailchimps faktiske svar. Mislykkede leveranser prøves automatisk på nytt med økende ventetid i omtrent fem dager.

## Første import {#initial-import}

Koblingen synkroniserer *endringer* fra det øyeblikket den er slått på. Den fyller ikke ut eksisterende katalog bakover i tid. Slik gjør du på oppsettsdagen:

1. I B1 Admin går du til **Personer**, søker etter personene du vil ha (eller kjører en lagret liste), og klikker på **Eksporter** for å laste ned en CSV-fil.
2. I Mailchimp bruker du **Målgruppe → Importer kontakter** for å laste inn CSV-filen, og legger til eventuelle merkelapper under importen.

Ved å gjøre den første innlastingen gjennom Mailchimps importverktøy beholder du kontrollen over samtykket. Importer bare personer som faktisk har godtatt å motta e-posten din. Masseimport av en hel katalog som abonnenter kan bryte Mailchimps vilkår og antispam-lovgivning (CAN-SPAM/GDPR).

## Begrensninger og merknader {#limits--notes}

- **Synkroniseringen går én vei.** Avmeldinger, returnerte e-poster og endringer som gjøres i Mailchimp, flyttes ikke tilbake til B1. Noen som melder seg av i Mailchimp, kan fortsatt motta e-post sendt direkte fra B1. Behandle Mailchimp som den viktigste kilden for samtykke til masseutsendelser.
- **Personer uten e-postadresse hoppes over** (logges slik i leveranseloggen). Mailchimp-abonnenter identifiseres med e-post.
- **Endring av e-postadresse oppretter en ny abonnent.** Mailchimp identifiserer personer med e-post. Hvis du endrer noens e-post i B1, legges de til under den nye adressen, og den gamle abonnenten forblir til du arkiverer den i Mailchimp.
- **Bare standardfelt synkroniseres**: fornavn, etternavn og telefon. Medlemsstatus, kampus og egendefinerte B1-felt kobles ikke til flettefelt i Mailchimp i denne versjonen. Bruk listemerkelapper til segmentering i stedet.
- **Merkelappnavn er gruppe- eller listenavnene.** Hvis du endrer navnet på en gruppe eller liste, begynner merkelappingen under det nye navnet. Den gamle merkelappen blir værende på eksisterende abonnenter til den fjernes i Mailchimp.
- **Mailchimps kontaktgrenser gjelder fortsatt.** En synkronisering som dytter en gratis målgruppe over taket, logger feilen `Member limit reached` i leveranseloggen.

## Andre oppskrifter (Zapier / Make) {#other-recipes-zapier--make}

Alt utover synkronisering av målgruppe (merkelapp til givere ved `donation.created`, motsatt retning fra Mailchimp til B1, eller synkronisering til en helt annen e-postplattform, som Constant Contact, Brevo osv.) er fortsatt tilgjengelig gjennom [Zapier](../zapier.md) eller [Make](../make.md). De utløses av de samme webhook-hendelsene:

- **Merk givere:** B1 *Ny gave* → B1 *Finn person* → Mailchimp *Legg abonnent til merkelapp* (`Gave-2026`)
- **Toveis:** Mailchimp *Ny abonnent* → B1 *Opprett person*

Hvis du tidligere koblet person- og gruppesynkronisering gjennom Zapier, slår du av disse Zapene etter at du har aktivert den innebygde koblingen. Å kjøre begge dobbeltbehandler hver hendelse og bruker Zapier-oppgaver uten grunn.

## Feilsøking {#troubleshooting}

- **Lagring mislykkes med «Mailchimp rejected the API key»**: nøkkelen er trukket tilbake eller har en skrivefeil. Nøkler må ende med et datasenter-suffiks som `-us21`.
- **Lagring mislykkes med «audience not found»**: målgruppe-ID-en finnes ikke under den kontoen. Kopier den fra **Målgruppe → Innstillinger → Målgruppenavn og standarder** (det er ikke målgruppens navn).
- **En person dukket aldri opp i Mailchimp**: sjekk webhookens leveranselogg. «Skipped: person has no email address» betyr akkurat det. En `4xx` fra Mailchimp viser årsaken i svarteksten.
- **Leveranser har stoppet helt**: etter gjentatte mislykkede leveranser slår webhooken seg automatisk av. Løs årsaken (vanligvis en trukket nøkkel), aktiver den igjen, og bruk **Send testhendelse** for å bekrefte.

## Se også {#see-also}

- [Webhooks (referanse for utviklere)](/docs/developer/api/webhooks): motoren under, hendelseskatalogen og semantikken for leveranse og nytt forsøk
- [Lagrede lister](/docs/b1-admin/people/lists): regelbaserte målgrupper som passer naturlig til Mailchimp-merkelapper
- [Zapier (oversikt)](../zapier.md): for oppskrifter utover synkronisering av målgruppe
