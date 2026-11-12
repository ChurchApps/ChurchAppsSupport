---
title: "Datasikkerhet"
description: "Se hvordan ChurchApps beskytter menighetens data i B1 Admin, fra hashede passord og HTTPS til separerte databaser og verktøy for GDPR-data."
---

# Datasikkerhet

<div class="article-intro">

Ingen system er helt sikkert, men ChurchApps tar datasikkerhet på alvor. Denne siden forklarer tiltakene som er satt inn for å beskytte alle data som registreres i B1.church Admin og andre ChurchApps-produkter.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Les gjennom denne siden for å forstå hvordan menighetens data beskyttes
- Sett opp [Roller og tillatelser](./roles-permissions.md) for å styre hvem som får tilgang til sensitiv informasjon
- Gjør deg kjent med [personvernerklæringen](https://churchapps.org/privacy)

</div>

## Begrense sensitive data som lagres {#limiting-sensitive-data-stored}

Vår første tilnærming er å ikke lagre mer sensitiv informasjon enn nødvendig. Det betyr at vi aldri lagrer kredittkort- eller bankkontoopplysninger som brukes til gaver. Når en bruker gir en gave via B1.church Admin eller B1, sendes kortdataene aldri til noen av våre servere, bare til din betalingsløsning (Stripe). Dette betyr at kort- eller bankopplysninger ikke vil være kompromittert ved et eventuelt datainnbrudd.

Vi lagrer heller aldri passord i systemet vårt. Alle passord behandles med en envegs hashingalgoritme der deler av dataene ødelegges, slik at det er umulig for noen å hente passord fra databasen, heller ikke for oss. For å verifisere passord må den innskrevne verdien gjennom den samme envegs-hashen og gi samme resultat.

Etter at disse to kildene er fjernet, er den eneste sensitive informasjonen som gjenstår en liste med navn og kontaktinformasjon.

:::tip
Fordi ChurchApps aldri lagrer kredittkort- eller bankopplysninger, ville heller ikke et verste tenkelige datainnbrudd avsløre økonomiske kontodetaljer. Bare navn og kontaktinformasjon ville være i fare.
:::

## Bruke standard beste praksis {#using-standard-best-practices}

Vi bruker bransjestandarder for sikkerhet, blant annet kryptering av all data som sendes til og fra serverne våre via HTTPS. Alle servere er driftet i et sikkert fysisk datasenter hos Amazon Web Services. Alle databaseservere står bak en brannmur og er ikke tilgjengelige fra internett.

## Datasegregering {#data-segregation}

Data er delt inn i ulike databaser etter omfang. Hver av modulene våre (Medlemskap, Giving, Oppmøte, Meldinger, Oppgaver og Innhold) er et uavhengig datasilo med egne databaser. Hvis én av dem kompromitteres, er nytten av dataene begrenset uten at andre også kompromitteres. For eksempel: Hvis giving-API-et/databasen ble kompromittert, kunne en angriper muligens få tilgang til en liste over gaver og datoer (men aldri kort- eller bankdata). De ville imidlertid ikke få tilgang til hvilke brukere som ga gavene eller hvilke menigheter de var for, siden disse dataene er lagret i den separate medlemsdatabasen.

:::info
Datasegregering betyr at kompromittering av ett system ikke gir tilgang til alle menighetens data. Hvert API fungerer uavhengig med sin egen database, noe som begrenser konsekvensene av et eventuelt innbrudd.
:::

## Begrenset tilgang {#limited-access}

Tilgang til produksjonsserverne er strengt begrenset til serveradministratorene som trenger den. Dette er for tiden to personer som også er medlemmer av styret. Utviklere, frivillige og andre styremedlemmer har ikke tilgang til produksjonsserverne.

## Personvernerklæring {#privacy-policy}

Dine data tilhører deg, og de vil aldri bli solgt til tredjeparter. Du kan lese vår fullstendige personvernerklæring [her](https://churchapps.org/privacy).

## GDPR-samsvar {#gdpr-compliance}

ChurchApps støtter GDPR-samsvar for menigheter med medlemmer i Storbritannia eller EU/EØS. Slik håndterer vi de viktigste kravene:

### Rettigheter for registrerte {#data-subject-rights}

ChurchApps tilbyr verktøy som hjelper menigheter med å besvare henvendelser fra registrerte:

- **Innsynsrett (artikkel 15)** — Medlemmer kan be om en kopi av sine personopplysninger ved å kontakte menigheten sin. Administratorer kan eksportere en hvilken som helst persons data med **Eksporter data** på personens registrering, eller fra delen **Datahåndtering** i persons redigeringsskjema, i B1.church Admin.
- **Rett til sletting (artikkel 17)** — Medlemmer kan selv be om sletting av kontoen sin fra profilsiden sin (se [Behandle forespørsler om sletting av konto](../profile/account-deletion.md)), eller ved å kontakte menigheten sin direkte. Administratorer kan også anonymisere en persons data i alle moduler fra delen **Datahåndtering** på personens detaljside. Anonymisering erstatter personopplysninger med generiske verdier, men beholder samlede registreringer (gavesummer, oppmøtetall) som trengs for menighetens økonomirapportering.
- **Rett til begrensning (artikkel 18)** — Medlemmer kan be om begrensning av behandlingen ved å kontakte menigheten sin, blant annet ved å reservere seg mot kommunikasjon.
- **Rett til dataportabilitet (artikkel 20)** — Administratorer kan eksportere personopplysninger i et strukturert, maskinlesbart JSON-format på vegne av medlemmer som ber om det.

### Bruke verktøyene for datahåndtering {#using-the-data-management-tools}

For å åpne GDPR-verktøyene for en enkeltperson:

1. Gå til **Personer** i B1 Admin og åpne personens registrering.
2. Klikk på **Rediger** for å gå i redigeringsmodus.
3. Scroll ned til delen **Datahåndtering** (skjult som standard) og klikk for å utvide den.
4. Bruk **Eksporter data** for å laste ned en JSON-fil med alle data som er lagret for personen. (Den samme lenken **Eksporter data** finnes også blant handlingene under personens navn, uten at du må åpne redigeringsskjemaet.)
5. Bruk **Anonymiser** for å erstatte personopplysninger med generiske verdier. Du blir bedt om å skrive `ANONYMIZE` for å bekrefte — denne handlingen kan ikke angres.

:::warning
Anonymisering er permanent. Gavesummer og oppmøtetall beholdes for økonomirapportering, men alle personlige identifikatorer (navn, e-post, adresse osv.) fjernes og kan ikke gjenopprettes.
:::

### Databehandling {#data-processing}

ChurchApps fungerer som **databehandler** på vegne av menigheten din (**behandlingsansvarlig**). Vår [databehandleravtale](https://churchapps.org/terms) beskriver ansvaret til hver part, blant annet bruk av underleverandører, rutiner for varsling ved brudd og håndtering av data ved oppsigelse.

### Internasjonale dataoverføringer {#international-data-transfers}

ChurchApps-data er vert hos Amazon Web Services (AWS) i USA. Internasjonale dataoverføringer fra Storbritannia/EU dekkes av AWS' standardavtaleklausuler (SCC-er) under [AWS-databehandlingstillegget](https://aws.amazon.com/compliance/data-processing-addendum/). AWS' databehandleravtale inngår automatisk i AWS-tjenestevilkårene for alle kunder. Vertstjenester i EU/EØS er ikke nødvendig når egnede overføringsmekanismer som SCC-er er på plass.

For detaljer om hvordan risikoen ved overføring er vurdert, se [Vurdering av overføringsrisiko](./transfer-risk-assessment.md).

### Underleverandører {#sub-processors}

- **Amazon Web Services (AWS)** — Infrastruktur, datalagring og innholdslevering
- **Stripe** — Betalingsbehandling for gaver (ChurchApps lagrer ingen kortdata)

:::info
For fullstendige detaljer om hvordan vi håndterer personopplysninger, se vår [personvernerklæring](https://churchapps.org/privacy) og [vilkår for bruk](https://churchapps.org/terms). Hvis du har spørsmål om GDPR-samsvar, kontakt oss på support@churchapps.org.
:::
