---
title: "Overføring av risikoevaluering"
---

# Overføring av risikoevaluering

<div class="article-intro">

Dette dokumentet registrerer ChurchApps' vurdering av risiko knyttet til internasjonale overføringer av personopplysninger fra Storbritannia/EØS til USA, som kreves under Storbritannias GDPR og EU GDPR. Dette er en intern samsvarpost som vedlikeholdes av ChurchApps som databehandler.

</div>

**Sist gjennomgått:** april 2026

## 1. Overføringsdetaljer

| Element | Detalj |
|---|---|
| **Dataeksportør** | Kirker som bruker ChurchApps (Datakontrollanter) som er lokalisert i Storbritannia/EØS |
| **Dataimportør** | ChurchApps (Databehandler), som opererer fra USA |
| **Kategorier av datasubjekter** | Kirkens medlemmer, deltakere, besøkende, givere, frivillige, barn (administrert av foreldre/administratorer) |
| **Kategorier av personopplysninger** | Navn, e-postadresser, telefonnummere, postadresser, fødselsdato, kjønn, sivilstatus, profilbilder, donasjonsposter, oppmøteposter, gruppetedeelskaper, frivilligassignmenter, meldingshistorikk |
| **Sensitive data** | Ingen med vilje samlet. Ingen helsedata, biometriske data eller straffeopplysninger lagres. Finansielle kontoopplysninger (kredittkort, bankkontoer) lagres aldri av ChurchApps -- disse håndteres direkte av Stripe. |
| **Formål med overføring** | Levering av kirkestyrssoftwaretjenester (medlemsadministrasjon, donasjoner, oppmøtesporing, kommunikasjon, frivilligplanlegging, hendelsesregistrering) |
| **Destinasjonsland** | USA |
| **Overføringsmekanisme** | EU standard kontraktuelle klausuler (SCCs) og Storbritannias internasjonale dataoversendelsestillegg (IDTA), innlemmet via AWS dataprosesseringslisten |

## 2. Underbehandlere

| Underbehandler | Rolle | Sted | Overføringsmekanisme |
|---|---|---|---|
| **Amazon Web Services (AWS)** | Infrastruktur-hosting, datalagring, innholdslevering (us-east-2-område) | USA | AWS DPA med SCCs (automatisk inkludert i AWS-vilkår) |
| **Stripe** | Betalingsbehandling for donasjoner | USA | Stripe DPA med SCCs |

Kredittkort- og bankkontodata overføres direkte fra brukerens nettleser til Stripe og lagres aldri på eller overføres gjennom ChurchApps-servere.

## 3. Risikoevaluering

### 3.1 Kryptering

- **Under transport:** All data er kryptert ved hjelp av TLS/HTTPS for all kommunikasjon mellom brukere og ChurchApps-servere.
- **I hvile:** Data som lagres på AWS er kryptert i hvile ved hjelp av AWS-administrert kryptering.

### 3.2 Tilgangskontroller

- Produksjonsservertilgang er begrenset til to individer som er medlemmer av ChurchApps-styret.
- Utviklere, frivillige og andre styremedlemmer har ikke tilgang til produksjonsservere eller databaser.
- Databasservere er bak en brannmur og er ikke direkte tilgjengelige fra internett.
- Kirkens data er logisk atskilt -- hver kirke kan bare få tilgang til egne data gjennom tilgangskontroller på applikasjonsnivå.

### 3.3 Dataaggregering

Data distribueres over seks uavhengige databaser (medlemskap, giver, oppmøte, meldinger, gjøring, innhold). Kompromiss av en database utsetter ikke data fra de andre. For eksempel inneholder giverdatabasen donasjonbeløp og datoer, men ikke navn eller kontaktinformasjon for givere (lagret i medlemskap).

### 3.4 Dataminimalisering

- Ingen kredittkort- eller bankkontoopplysninger lagres (håndtert av Stripe).
- Passord lagres ved hjelp av enveiskryptering og kan ikke hentes.
- Kirker kontrollerer hvilke data de samler fra medlemmene sine.

### 3.5 Rettighetene til datasubjekt

ChurchApps gir tekniske verktøy som gjør det mulig for kirker å oppfylle forespørsler fra datasubjekter:

- **Tilgang og portabilitet:** Full dataeksport i maskinlesbart JSON-format.
- **Sletting:** Anonymisering på tvers av alle seks databaser, og erstat personopplysninger med generiske verdier samtidig som du bevarer samleregister som kreves for finansiell rapportering.
- **Restriksjon:** Inaktiv medlemskapsstatus ekskluderer individer fra søk, katalog, rapporter og meldinger mens du beholder deres post.
- **Retting:** Medlemmer og administratorer kan redigere personopplysninger gjennom applikasjonen.

### 3.6 Bruddarmelding

ChurchApps forplikter seg til å varsle berørte kirker innen 72 timer fra det blir klar over et brud på personopplysninger, som dokumentert i [vilkår for tjeneste](https://churchapps.org/terms) (avsnitt 11.6).

### 3.7 Risiko for tilgang fra US-regjering

Den primære risikoen forbundet med data-hostet i USA er potensiell tilgang fra US-myndighetene under FISA seksjon 702 eller direktiv 12333. Denne risikoen vurderes som **lav** av følgende årsaker:

- ChurchApps behandler kirkens medlemskaps- og oppmøtedata, ikke data av etterretningsverdi.
- Datasubjekter er kirkens medlemmer og deltakere -- ikke kategorier som typisk blir målrettet av overvåkingsprogrammer.
- Ingen sensitive personopplysninger (helse, finansielle kontoer, politiske meninger) lagres.
- AWS DPA inkluderer forpliktelser angående tilgang til statlige forespørsler og transparensrapportering.
- EU-USA dataprivatsframeworket (etablert 2023) gir ytterligere sikkerhetsmuligheter for dataoverføringer til sertifiserte US-organisasjoner.

## 4. Samlet risikokonclusjon

Risikoen for datasubjekter fra denne internasjonale overføringen vurderes som **lav**. Kombinasjonen av:

- Standardkontraktuelle klausuler som juridisk overføringsmekanisme
- Kryptering under transport og i hvile
- Strenge tilgangskontroller med bare to autoriserte individer
- Dataaggregering på tvers av uavhengige databaser
- Ingen lagring av finansielle kontoopplysninger
- Lav sensitivitet og lav etterretningsverdi av dataene som behandles
- Tekniske verktøy for å utøve alle datasubjektsrettigheter

gir tilstrekkelige tilleggsmanuskript for å sikre at de overførte dataene får et beskyttelsesnivå som er vesentlig tilsvarende det som er garantert innenfor Storbritannia/EØS.

## 5. Gjennomgangsplan

Denne evalueringen vil bli gjennomgått årlig eller når det er en vesentlig endring i databehandlingen, underbehandlere eller juridisk rammeverk som styrer internasjonale dataoverføringer.
