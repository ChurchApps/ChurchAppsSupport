---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Holde en Mailchimp-publikum synkronisert med B1 automatisk: folk flyter inn med deres navn, e-post og telefon; gruppe- og listemedlemskap blir Mailchimp-tagger; slettede folk blir arkivert. Synkroniseringen er innebygd i B1 — ingen tredjepartstjeneste, ingen per-oppgave-måling, og endringer ankommer i nær sanntid i stedet for på en nightly tidsplan.

</div>

<div class="prereqs">
<h4>Før du starter</h4>

- En [Mailchimp](https://mailchimp.com)-konto med publikummet du vil at B1 skal administrere
- En Mailchimp **API-nøkkel** (Mailchimp: profilikon → **Konto & billing → Ekstras → API-nøkler**)
- Din **publikum-ID** (Mailchimp: **Publikum → Innstillinger → Publikumnavn og standarder**)
- En B1Admin-bruker med **Rediger innstillinger**-tilgang

</div>

## Hva som synkroniseres

| B1-endring | Mailchimp-effekt |
|---|---|
| Person lagt til eller oppdatert | Abonnent lagt til/oppdatert (fornavn, etternavn, telefon; nye abonnenter kommer som `abonnent`) |
| Person slettet (eller GDPR-slettet) | Abonnent arkivert |
| Personen blir medlem av en gruppe | Tag navngitt etter gruppen lagt til |
| Person forlater en gruppe | Den tagen fjernet |
| Person trer inn i en lagret liste | Tag navngitt etter listen lagt til |
| Person forlater en lagret liste | Den tagen fjernet |

**Lagrede lister er vanligvis den bedre tag-kilden.** En B1 [lagret liste](/docs/b1-admin/people/lists) er en regelbasert publikum som re-evaluerer seg selv — "alle ved Nord-campus," "medlemmer som valgte inn i pastoral e-poster." Pek Mailchimp-segmentene dine på list-tagger og synkroniseringen vedlikeholder dem; bruk gruppe-tagger for ministry-team-postinger.

Synkroniseringen er **enveis** (B1 → Mailchimp) og berører bare Mailchimp-standard-felt, så det kan ikke være i konflikt med merge-felt eller segmenter du administrerer i Mailchimp.

## Oppsett

1. Gå til **Innstillinger → Utvikler → Webhooks → Legg til Webhook** i B1Admin.
2. Sett **Koblingtype** til **Mailchimp**.
3. Lim inn din **Mailchimp API-nøkkel** og **publikum-ID**. Nøkkelen lagres kryptert og vises aldri igjen.
4. De relevante hendelsene er forhåndsvalgte; avmerke eventuelle du ikke vil ha (f.eks. la person-hendelser være påslått men hopp over gruppe-tagger).
5. Lagre. B1 verifiserer nøkkelen og publikummet mot Mailchimp før aksept — en stavefeil mislykkes umiddelbart med en grunn.

Bruk **Send Test** når som helst for å re-verifisere forbindelsen. Hvert synkroniseringsforsøk er logget i webhook-leveringshistorikken med Mailchimp's faktiske svar, og mislykket leveringer prøver igjen automatisk med backoff i omtrent fem dager.

## Initial import

Koblingen synkroniserer *endringer* fra det øyeblikk den er på; den fyller ikke ut din eksisterende katalog på forhånd. For oppsettsdag:

1. Gå til **People** i B1Admin, søk etter folkene du vil ha (eller kjør en lagret liste), og klikk **Eksporter** for å laste ned en CSV.
2. I Mailchimp bruk **Publikum → Importer kontakter** for å laste CSV, bruk eventuelle tagger under import.

Å gjøre den initiale lasten gjennom Mailchimp's importer holder deg i kontroll over samtykkespørsmålet — bare importer folk som faktisk har gått med på å motta e-poster dine. Bulk-importering av hele katalog som abonnert-kontakter kan bryte med Mailchimp's vilkår og antispam-lov (CAN-SPAM/GDPR).

## Grenser & merknader

- **Enveis synkronisering.** Avmeldinger, bounces, og rediteringer gjort i Mailchimp flyter ikke tilbake til B1. Noen som avmelder seg i Mailchimp kan fortsatt motta e-post sendt direkte fra B1 — behandle Mailchimp som sannhetskilden for bulk-mail-samtykke.
- **Folk uten e-postadresse hoppes over** (logget som sådan i leveringshistorikken) — Mailchimp-abonnenter er nøklede etter e-post.
- **E-postadresseendringer oppretter en ny abonnent.** Mailchimp identifiserer mennesker etter e-post, så å endre noens e-post i B1 legger dem under den nye adressen; den gamle abonnenten blir igjen til du arkiverer den i Mailchimp.
- **Bare standard-felt synkroniseres** -- fornavn, etternavn, telefon. Medlemskaps-status, campus, og tilpasset B1-felt mapper ikke til Mailchimp merge-felt i denne versjonen; bruk listetagg for å segmentere i stedet.
- **Tagnavn er gruppe/listenavn.** Å omdøpe en gruppe eller liste starter tagging under det nye navnet; den gamle tagen forblir på eksisterende abonnenter til fjernet i Mailchimp.
- **Mailchimp's kontaktgrenser gjelder fortsatt** -- en synkronisering som skyver et free-tier publikum forbi grensen vil logge `Member limit reached`-feil i leveringshistorikken.

## Andre oppskrifter (Zapier / Make)

Alt utover publikum-synkronisering — tagging av givere på `donation.created`, en Mailchimp → B1 reversretning, eller synkronisering til en helt annen e-post-plattform (Constant Contact, Brevo, etc.) — er fortsatt tilgjengelig gjennom [Zapier](../zapier) eller [Make](../make), som utløser på de samme webhook-hendelsene:

- **Tagg givere:** B1 *Ny donasjon* → B1 *Finn person* → Mailchimp *Legg til abonnent til tag* (`Ga-2026`)
- **Toveis:** Mailchimp *Ny abonnent* → B1 *Opprett person*

Hvis du tidligere kjørte person/gruppe-synkronisering gjennom Zapier, slå av disse Zaps etter å ha aktivert den innebygde koblingen — å kjøre begge doble-prosesser hver hendelse og brenner Zapier-oppgaver for ingenting.

## Problemløsing

- **Lagre mislykkes med "Mailchimp avviste API-nøkkelen"** — nøkkelen ble tilbakekalt eller stavefeil. Nøkler må ende med et data-senter-suffiks som `-us21`.
- **Lagre mislykkes med "publikum ikke funnet"** — publikum-ID-en eksisterer ikke under den kontoen. Kopier det fra **Publikum → Innstillinger → Publikumnavn og standarder** (det er ikke publikumets navn).
- **En person vises aldri i Mailchimp** — sjekk webhook-leveringshistorikken. "Hoppet over: person har ingen e-postadresse" betyr nøyaktig det; en `4xx` fra Mailchimp viser årsaken i responsekroppen.
- **Leveringer stoppet helt** — etter gjentatte utmattede leveringer deaktiveres webhook automatisk. Rett årsaken (vanligvis en tilbakekalt nøkkel), re-aktiver den, og bruk **Send Test** for å bekref te.

## Se også

- [Webhooks (utviklerreferanse)](/docs/developer/api/webhooks) — motoren under, hendelseskatalog, leveranse/forsøk-semantikk
- [Lagrede lister](/docs/b1-admin/people/lists) — regelbasert publikum som mapper naturlig til Mailchimp-tagger
- [Zapier (oversikt)](../zapier) — for oppskrifter utover publikum-synkronisering
