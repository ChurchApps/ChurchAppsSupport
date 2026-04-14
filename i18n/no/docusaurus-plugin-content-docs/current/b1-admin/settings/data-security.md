---
title: "Datasikkerhet"
---

# Datasikkerhet

<div class="article-intro">

Selv om det ikke finnes noe perfekt sikkert system, tar ChurchApps datasikkerhet alvorlig. Denne siden forklarer tiltakene som iverksettes for å beskytte all data som oppgis i B1.church Admin og andre ChurchApps-produkter.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Gjennomgå denne siden for å forstå hvordan kirkens data beskyttes
- Sett opp [Roller & Tillatelser](./roles-permissions.md) for å kontrollere hvem som kan få tilgang til sensitiv informasjon
- Gjør deg kjent med [personvernerklæringen](https://churchapps.org/privacy)

</div>

## Begrensning av sensitiv data som lagres

Vår første tilnærming er å ikke lagre mer sensitiv data enn nødvendig. Dette betyr aldri å lagre kredittkortt- eller bankkontoopplysninger som brukes til å gi donasjoner. Når en bruker gir en donasjon ved hjelp av B1.church Admin eller B1, blir kredittkorttdataene aldri overført til noen av serverne våre, bare betalingsgatewayen (Stripe). Dette betyr at i tilfelle et databrudd, vil det ikke være noen kredittkorting- eller bankinfo som ville blitt kompromittert.

Vi lagrer aldri passord i systemet. Alle passord behandles gjennom en enveishashalgorisme der noen av dataene blir ødelagt, noe som gjør det umulig for noen å hente passord fra databasen, selv for oss. For å verifisere passord, må den oppgitte verdien passere gjennom samme enveishash og produsere samme resultat.

Etter å ha fjernet disse to kildene er det eneste sensitive data som gjenstår en liste over navn og kontaktinfo.

:::tip
Fordi ChurchApps aldri lagrer kredittkorting- eller bankopplysninger, ville selv et worst-case-databrudd ikke eksponere finansiell kontoinformasjon. Bare navn og kontaktinformasjon ville være utsatt for fare.
:::

## Bruk av standard beste praksis

Vi bruker industristandardens beste praksis for sikkerhet, inkludert kryptering av alle data i transitt til og fra serverne våre ved hjelp av HTTPS. Alle servere er vert i et sikkert fysisk datasenter med Amazon Web Services. Alle databaseservere lagres bak en brannmur og er utilgjengelige fra internett.

## Datasegregering

Data er adskilt i ulike databaser basert på omfang. Hver av API-ene våre (Medlemskap, Giving, Oppmøte, Messaging, Doing og Lessons) er uavhengige data-siloer med sine egne databaser. Hvis en av dem blir kompromittert, er datausefullheten begrenset uten at andre også blir kompromittert. For eksempel, hvis Giving API/databasen skulle bli kompromittert, kunne en ondsinnet aktør potensielt få tilgang til en liste over donasjoner og datoer (men aldri kort- / bankdata). De ville imidlertid ikke ha tilgang til hvilke brukere som gjorde donasjonen eller hvilke kirker de var for, siden disse dataene lagres i den separate medlemskapsdatabasen.

:::info
Datasegregering betyr at kompromittering av ett system ikke gir tilgang til all kirkdata. Hver API opererer uavhengig med sin egen database, noe som begrenser virkningen av et potensielt brudd.
:::

## Begrenset tilgang

Tilgang til produksjonserverne er strengt begrenset til serveradministratørene som krever tilgang. Dette er for øyeblikket to individer som også er medlemmer av styret. Utviklere, frivillige og andre styremedlemmer har ikke tilgang til produksjonserverne.

## Personvernerklæring

Dataene dine er dine og vil aldri bli solgt til tredjeparter. Du kan lese hele personvernerklæringen vår [her](https://churchapps.org/privacy).

## GDPR-samsvar

ChurchApps støtter GDPR-samsvar for kirker med medlemmer i Storbritannia eller EU. Slik adresserer vi nøkkelkravene:

### Dataeierrettigheter

ChurchApps tilbyr verktøy for å hjelpe kirker med å svare på dataeikerforespørsler:

- **Rett til innsyn (artikkel 15)** -- Medlemmer kan be om en kopi av personopplysningene ved å kontakte kirken. Administratorer kan eksportere enhver persons data fra **Data Management**-delen på personen detaljside i B1.church Admin.
- **Rett til sletting (artikkel 17)** -- Medlemmer kan be om kontosletting ved å kontakte kirken. Administratorer kan anonymisere en persons data på tvers av alle moduler fra **Data Management**-delen på personen detaljside. Anonymisering erstatter personopplysninger med generiske verdier mens aggregerte poster (donasjonstotaler, oppmøtetall) bevares som trengs for kirkens finansiell rapportering.
- **Rett til begrensning (artikkel 18)** -- Medlemmer kan be om begrensning av behandling ved å kontakte kirken, inkludert fravalgingsalternativ for kommunikasjon.
- **Rett til dataportabilitet (artikkel 20)** -- Administratorer kan eksportere personopplysninger i strukturert, maskinlesbar JSON-format på vegne av medlemmer som ber om det.

### Bruk av dataadministrasjonsverktøy

For å få tilgang til GDPR-dataverktøy for en person:

1. Gå til **Personer** i B1 Admin og åpne personens post.
2. Klikk **Rediger** for å gå inn i redigeringsmodus.
3. Rull ned til **Data Management**-delen (kollapsert som standard) og klikk for å utvide den.
4. Bruk **Eksport data** for å laste ned en JSON-fil med alle data som lagres for denne personen.
5. Bruk **Anonymiser** for å erstatte personopplysninger med generiske verdier. Du blir bedt om å skrive `ANONYMISER` for å bekrefte -- denne handlingen kan ikke angres.

:::warning
Anonymisering er permanent. Donasjonstotaler og oppmøtetall bevares for finansiell rapportering, men alle personidentifikatorer (navn, e-post, adresse osv.) blir fjernet og kan ikke gjenopprettes.
:::

### Databehandling

ChurchApps fungerer som en **databehandler** på vegne av kirken (dataansvarlig). [Data Processing Agreement](https://churchapps.org/terms) vår skisserer ansvaret for hver part, inkludert underbehandleransvar, prosedyrer for bruddvarsel og datahåndtering ved avslutning.

### Internasjonale dataoverføringer

ChurchApps data er vert på Amazon Web Services (AWS) i USA. Internasjonale dataoverføringer fra Storbritannia/EU dekkes av AWS sin Standard Contractual Clauses (SCCs) under [AWS Data Processing Addendum](https://aws.amazon.com/compliance/data-processing-addendum/). AWS DPA inkorporeres automatisk i AWS-servicebetingelsene for alle kunder. EU-basert hosting er ikke påkrevd når passende overføringsmekanismer som SCCs er på plass.

For detaljer om hvordan overføringsrisiko har blitt evaluert, se [Transfer Risk Assessment](./transfer-risk-assessment.md).

### Underbehandlere

- **Amazon Web Services (AWS)** -- Infrastruktur hosting, datalagring og innholdsleveranse
- **Stripe** -- Betalingsbehandling for donasjoner (ingen kortdata lagres av ChurchApps)

:::info
For fullstendige detaljer om hvordan vi håndterer personopplysninger, se [personvernerklæringen](https://churchapps.org/privacy) og [servicevilkårene](https://churchapps.org/terms). Hvis du har spørsmål om GDPR-samsvar, kontakt oss på support@churchapps.org.
:::
