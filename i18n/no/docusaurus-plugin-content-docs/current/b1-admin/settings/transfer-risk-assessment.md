---
title: "Overføringsrisikovurdering"
---

# Overføringsrisikovurdering

<div class="article-intro">

Dette dokumentet registrerer ChurchApps sin vurdering av risikoer knyttet til internasjonale overføringer av personopplysninger fra Storbritannia/EØS til USA, slik som påkrevd under Storbritannia GDPR og EU GDPR. Dette er en internatrisikovurderingsdokument vedlikeholdt av ChurchApps som databehandler.

</div>

**Sist gjennomgått:** April 2026

## 1. Overføringsdetaljer

| Element | Detalj |
|---|---|
| **Dataeksportør** | Kirker som bruker ChurchApps (datakontrollerer) lokalisert i Storbritannia/EØS |
| **Dataimportør** | ChurchApps (databehandler), opererer fra USA |
| **Kategorier av datasubjekter** | Kirkemedlemmer, deltakere, besøkende, givere, frivillige, barn (administrert av foreldre / administratorer) |
| **Kategorier av personopplysninger** | Navn, e-postadresser, telefonnumre, postadresser, fødselsdatoer, kjønn, sivilstatus, profilfotos, donasjonshistorikk, oppmøtehistorikk, gruppetilhørighet, frivilligoppgaver, meldingshistorikk |
| **Sensitiv data** | Ingen som er bevisst innsamlet. Ingen helsedata, biometrisk data eller straffeattest lagres. Finansiell kontoinformasjon (kredittkort, bankkontoer) lagres aldri av ChurchApps -- disse håndteres direkte av Stripe. |
| **Formål for overføring** | Tilby kirkestyringstjeneste (medlemsadministrasjon, donasjoner, oppmøtesporing, kommunikasjon, frivilligplanlegging, hendelsesregistrering) |
| **Destinasjonsland** | USA |
| **Overføringsmekanisme** | EU Standard Contractual Clauses (SCCs) og Storbritannia International Data Transfer Addendum (IDTA), innlemmet via AWS Data Processing Addendum |

## 2. Underbehandlere

| Underbehandler | Rolle | Plassering | Overføringsmekanisme |
|---|---|---|---|
| **Amazon Web Services (AWS)** | Infrastruktur hosting, datalagring, innholdsleveranse (us-east-2 region) | USA | AWS DPA med SCCs (automatisk inkludert i AWS Service Terms) |
| **Stripe** | Betalingsbehandling for donasjoner | USA | Stripe DPA med SCCs |

Kredittkorting- og bankkontodata overføres direkte fra brukerens nettleser til Stripe og lagres aldri på eller overføres gjennom ChurchApps-serverne.

## 3. Risikovurdering

### 3.1 Kryptering

- **I transitt:** Alle data krypteres ved hjelp av TLS/HTTPS for all kommunikasjon mellom brukere og ChurchApps-serverne.
- **I ro:** Data lagret på AWS krypteres i ro ved hjelp av AWS-administrert kryptering.

### 3.2 Tilgangskontroller

- Produksjonservertilgang er begrenset til to individer som er medlemmer av ChurchApps styre.
- Utviklere, frivillige og andre styremedlemmer har ikke tilgang til produksjonservere eller databaser.
- Databaseservere er bak en brannmur og er ikke direkte tilgjengelig fra internett.
- Kirkdata er logisk atskilt -- hver kirke kan bare få tilgang til sine egne data gjennom applikasjonsnivå-tilgangskontroller.

### 3.3 Datasegregering

Data distribueres på tvers av seks uavhengige databaser (Medlemskap, Giving, Oppmøte, Messaging, Doing, Innhold). Kompromittering av en database eksponerer ikke data fra de andre. For eksempel inneholder Giving-databasen donasjonsbeløp og datoer, men ikke navn eller kontaktinformasjon for givere (lagret i Medlemskap).

### 3.4 Datasamling

- Ingen kredittkorting- eller bankkontoopplysninger lagres (håndteres av Stripe).
- Passord lagres ved hjelp av enveishashing og kan ikke hentes.
- Kirker kontrollerer hvilke data de samler fra medlemmene sine.

### 3.5 Dataeierrettigheter

ChurchApps tilbyr tekniske verktøy som muliggjør at kirker oppfyller dataeikerforespørsler:

- **Innsyn & bærbarhet:** Full dataeksport i maskinlesbart JSON-format.
- **Sletting:** Anonymisering på tvers av alle seks databaser, erstatter personopplysninger med generiske verdier mens du bevarer samlede poster som kreves for finansiell rapportering.
- **Begrensning:** Inaktiv medlemsstatus ekskluderer individer fra søk, mappe, rapporter og meldinger mens du beholder posten.
- **Retting:** Medlemmer og administratorer kan redigere personopplysninger gjennom applikasjonen.

### 3.6 Bruddvarsel

ChurchApps forplikter seg til å varsle berørte kirker innen 72 timer etter å være blitt klar over et databrudd, som dokumentert i [servicevilkårene](https://churchapps.org/terms) (avsnitt 11.6).

### 3.7 USA-regjeringens tilgangsrisiko

Den primære risikoen knyttet til USA-vertsdata er potensiell tilgang av USA-regjeringsmyndigheter under FISA Section 702 eller Executive Order 12333. Denne risikoen vurderes som **lav** av følgende årsaker:

- ChurchApps behandler kirkemedlemskaps- og oppmøtedata, ikke data med etterretningsverdi.
- Datamottagere er kirkemedlemmer og deltakere -- ikke kategorier som vanligvis blir målrettet av overvåkingsprogrammer.
- Ingen sensitiv personopplysning (helse, finansielle kontoer, politiske meninger) lagres.
- AWS sin DPA inkluderer forpliktelser vedr. regjeringsadgangsforespørsler og transparensrapportering.
- EU-US Data Privacy Framework (etablert 2023) gir ytterligere beskyttelse for dataoverføringer til sertifiserte USA-organisasjoner.

## 4. Overordnet risikokonklusjon

Risikoen for datamottagere fra denne internasjonale overføringen vurderes som **lav**. Kombinasjonen av:

- Standard Contractual Clauses som juridisk overføringsmekanisme
- Kryptering i transitt og i ro
- Strenge tilgangskontroller med bare to autoriserte individer
- Datasegregering på tvers av uavhengige databaser
- Ingen lagring av finansiell kontoinformasjon
- Lav følsomhet og lav etterretningsverdi av dataene som behandles
- Tekniske verktøy for å utøve alle dataeierrettigheter

gir tilstrekkelige tilleggstiltak for å sikre at de overførte dataene mottar et beskyttelsesnivå som i det vesentlige tilsvarer det som garanteres innenfor Storbritannia/EØS.

## 5. Gjennomgangstidsplan

Denne vurderingen vil bli gjennomgått årlig eller når det er en vesentlig endring i databehandling, underbehandlere eller juridisk rammeverk som styrende internasjonale dataoverføringer.
