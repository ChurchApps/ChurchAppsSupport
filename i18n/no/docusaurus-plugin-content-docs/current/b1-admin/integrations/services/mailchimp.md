---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Hold en Mailchimp-publikum synkronisert med B1 automatisk: personer flyter inn med navn, e-post og telefon; gruppe- og listetilhørighet blir Mailchimp-tagger; slettede personer arkiveres. Synkroniseringen er innebygd i B1 — ingen tredjepartstjeneste, ingen per-oppgave-måling, og endringer kommer nesten i sanntid i stedet for på en nattlig tidsplan.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En [Mailchimp](https://mailchimp.com)-konto med publikummet du vil at B1 skal administrere
- En Mailchimp **API-nøkkel** (Mailchimp: profilikon → **Konto & fakturering → Ekstra → API-nøkler**)
- Din **publikum-ID** (Mailchimp: **Publikum → Innstillinger → Publikumnavn og standarder**)
- En B1Admin-bruker med tillatelse til **Rediger innstillinger**

</div>

## Hva som synkroniseres

| B1-endring | Mailchimp-effekt |
|---|---|
| Person lagt til eller oppdatert | Abonnent lagt til/oppdatert (fornavn, etternavn, telefon; nye abonnenter ankommer som `subscribed`) |
| Person slettet (eller GDPR-slettet) | Abonnent arkivert |
| Person slutter seg til en gruppe | Tagg oppkalt etter gruppen lagt til |
| Person forlater en gruppe | Den taggen fjernet |
| Person skriver seg på en lagret liste | Tagg oppkalt etter listen lagt til |
| Person forlater en lagret liste | Den taggen fjernet |

**Lagrede lister er vanligvis bedre tagg-kilde.** En B1 [lagret liste](/docs/b1-admin/people/lists) er en regelbasert publikum som re-evalueres selv — "alle på Nord-campus", "medlemmer som meldte seg på pastoralt e-post". Pek Mailchimp-segmentene dine på listetagger og synkroniseringen vedlikeholder dem; bruk gruppetagger for e-post til ministermål.

Synkroniseringen er **enveisrettet** (B1 → Mailchimp) og berører bare Mailchimp-standardfeltene, så den kan ikke være i konflikt med flettfelt eller segmenter du administrerer inne i Mailchimp.

## Oppsett

1. I B1Admin, gå til **Innstillinger → Utvikler → Webhooker → Legg til webhook**.
2. Sett **koblingstype** til **Mailchimp**.
3. Lim inn din **Mailchimp API-nøkkel** og **publikum-ID**. Nøkkelen lagres kryptert og vises aldri igjen.
4. De relevante hendelsene er forhåndsvalgt; avmerk alle du ikke vil ha (f.eks. la personhendelser være på, men hopp over gruppetagger).
5. Lagre. B1 bekrefter nøkkelen og publikummet mot Mailchimp før godkjenning — en stavefeil mislykkes umiddelbart med en grunn.

Bruk **Send test** når som helst for å reverifisere forbindelsen. Hvert synkroniseringsforsøk blir loggført i webhookens leveringshistorikk med Mailchimps faktiske svar, og mislykkede leveringer prøves automatisk på nytt med backoff i omtrent fem dager.

## Første import

Koblingen synkroniserer *endringer* fra det øyeblikket den er på; den fyller ikke inn eksisterende katalog på forhånd. For oppsettpdag:

1. I B1Admin, gå til **Personer**, søk etter personene du vil ha (eller kjør en lagret liste), og klikk **Eksporter** for å laste ned en CSV.
2. I Mailchimp, bruk **Publikum → Importer kontakter** for å laste opp CSV-filen, og bruk eventuelle tagger under importen.

Hvis du gjør den første lasten gjennom Mailchimps importer-verktøy, beholder du kontroll over samtykkespørsmålet — importer kun personer som faktisk har gitt samtykke til å motta e-post fra deg. Masseimportering av hele en katalog som abonnerte kontakter kan bryte Mailchimps vilkår og anti-spam-lover (CAN-SPAM/GDPR).

## Begrensninger og merknader

- **Enveisrettet synk.** Avmeldinger, bounces og redigeringer gjort i Mailchimp flyter ikke tilbake til B1. Noen som avmelder seg i Mailchimp kan fortsatt motta e-post sendt direkte fra B1 — behandle Mailchimp som kildekilde for massepost-samtykke.
- **Personer uten e-postadresse hoppet over** (logget som slikt i leveringshistorikken) — Mailchimp-abonnenter er nøkkelet per e-post.
- **E-postadresseendringer oppretter en ny abonnent.** Mailchimp identifiserer personer etter e-post, så endring av noens e-post i B1 legger dem til under den nye adressen; den gamle abonnenten blir værende til du arkiverer den i Mailchimp.
- **Bare standardfelt synkroniseres** — fornavn, etternavn, telefon. Medlemskapsstatus, campus og egendefinerte B1-felt mapper ikke til Mailchimp flettfelt i denne versjonen; bruk listetagger til segmentering i stedet.
- **Tagnavn er gruppe-/listenavet.** Omdøping av en gruppe eller liste starter tagging under det nye navnet; den gamle taggen blir værende på eksisterende abonnenter til du fjerner den i Mailchimp.
- **Mailchimps kontaktgrenser gjelder fortsatt** — en synk som skyver et gratis-lags publikum forbi sitt tak vil logge `Member limit reached`-feil i leveringshistorikken.

## Andre oppskrifter (Zapier / Make)

Alt utover publikumssynk — tagging av givere på `donation.created`, Mailchimp → B1 bakretning, eller synk til en annen e-postplattform helt (Constant Contact, Brevo, osv.) — er fortsatt tilgjengelig gjennom [Zapier](../zapier) eller [Make](../make), som utløses på samme webhookhendelser:

- **Tagg givere:** B1 *Ny gave* → B1 *Finn person* → Mailchimp *Legg abonnent til tagg* (`Gave-2026`)
- **To-veis:** Mailchimp *Ny abonnent* → B1 *Opprett person*

Hvis du tidligere koblet person-/gruppsynk gjennom Zapier, slå av disse Zapsene etter aktivering av den innebygde koblingen — kjøring av begge doble-prosesser hver hendelse og brenner Zapier-oppgaver for ingenting.

## Feilsøking

- **Lagring mislykkes med "Mailchimp avviste API-nøkkelen"** — nøkkelen ble tilbakekalt eller stavefeil. Nøkler må ende med et datasentersuffiks som `-us21`.
- **Lagring mislykkes med "publikum ikke funnet"** — publikum-IDen eksisterer ikke under den kontoen. Kopier den fra **Publikum → Innstillinger → Publikumnavn og standarder** (det er ikke publikumets navn).
- **En person dukket aldri opp i Mailchimp** — sjekk webhookens leveringshistorikk. "Hoppet over: person har ingen e-postadresse" betyr akkurat det; en `4xx` fra Mailchimp viser årsaken i responskroppen.
- **Leveringer stoppet helt** — etter gjentatte uttømt leveringer deaktiverer webhookene seg automatisk. Rett årsaken (vanligvis en tilbakekalt nøkkel), re-aktiver den, og bruk **Send test** for å bekrefte.

## Se også

- [Webhooks (utviklerreferanse)](/docs/developer/api/webhooks) — motoren under, hendelsetkatalog, leverans-/prøv-igjen-semantikk
- [Lagrede lister](/docs/b1-admin/people/lists) — regelbaserte publikumer som kartlegger naturlig til Mailchimp-tagger
- [Zapier (oversikt)](../zapier) — for oppskrifter utover publikumssynk
