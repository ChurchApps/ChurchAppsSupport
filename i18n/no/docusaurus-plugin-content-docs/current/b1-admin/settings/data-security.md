---
title: "Datasikkerhet"
---

# Datasikkerhet

<div class="article-intro">

Selv om det ikke finnes noe perfekt sikkert system, tar ChurchApps datasikkerhet på alvor. Denne siden forklarer tiltakene som er tatt for å beskytte alle data som legges inn i B1.church Admin og andre ChurchApps-produkter.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Les gjennom denne siden for å forstå hvordan kirkens data er beskyttet
- Sett opp [Roller og tillatelser](./roles-permissions.md) for å kontrollere hvem som kan få tilgang til sensitiv informasjon
- Gjør deg kjent med [personvernreglene](https://churchapps.org/privacy)

</div>

## Begrensning av lagrede sensitive data

Vår første tilnærming er å ikke lagre mer sensitive data enn nødvendig. Dette betyr at vi aldri lagrer kredittkort- eller bankkontoopplysninger som brukes til donasjoner. Når en bruker gir en donasjon via B1.church Admin eller B1, overføres kredittkortdataene aldri til noen av våre servere, kun til betalingsløsningen din (Stripe). Dette betyr at ved et datainnbrudd vil ingen kredittkort- eller bankinformasjon bli kompromittert.

Vi lagrer heller aldri passord i systemet vårt. Alle passord behandles gjennom en enveis hashing-algoritme der noen av dataene ødelegges, noe som gjør det umulig for noen å hente passord fra databasen, selv for oss. For å verifisere passord må den angitte verdien gå gjennom samme enveis hash og produsere samme resultat.

Etter å ha fjernet disse to kildene er de eneste sensitive dataene som gjenstår en liste over navn og kontaktinformasjon.

:::tip
Fordi ChurchApps aldri lagrer kredittkort- eller bankinformasjon, vil selv et verste-fall datainnbrudd ikke eksponere finansielle kontoopplysninger. Bare navn og kontaktinformasjon vil være utsatt.
:::

## Bruk av standard beste praksis

Vi bruker bransjens standard beste praksis for sikkerhet, inkludert kryptering av alle data under overføring til og fra våre servere ved hjelp av HTTPS. Alle servere er hostet i et sikkert fysisk datasenter hos Amazon Web Services. Alle databaseservere er lagret bak en brannmur og er utilgjengelige fra Internett.

## Datasegregering

Data er separert i forskjellige databaser basert på omfang. Hver av våre API-er (Membership, Giving, Attendance, Messaging, Doing og Lessons) er uavhengige siloer av data med egne databaser. Hvis en av dem blir kompromittert, er nytteverdien av dataene begrenset uten at andre også blir kompromittert. For eksempel, hvis Giving API/databasen skulle bli kompromittert, kunne en ondsinnet aktør potensielt få tilgang til en liste over donasjoner og datoer (men aldri kort-/bankdata). De ville imidlertid ikke ha tilgang til hvilke brukere som ga donasjonene eller hvilke kirker de tilhørte, ettersom disse dataene er lagret i den separate Membership-databasen.

:::info
Datasegregering betyr at kompromittering av ett system ikke gir tilgang til alle kirkedata. Hver API opererer uavhengig med sin egen database, noe som begrenser konsekvensene av et eventuelt innbrudd.
:::

## Begrenset tilgang

Tilgang til produksjonsserverne er strengt begrenset til serveradministratorene som trenger tilgang. Dette er for tiden to personer som også er styremedlemmer. Utviklere, frivillige og andre styremedlemmer har ikke tilgang til produksjonsserverne.

## Personvernregler

Dine data er dine og vil aldri bli solgt til tredjeparter. Du kan lese våre fullstendige personvernregler [her](https://churchapps.org/privacy).

## GDPR-samsvar

ChurchApps støtter for tiden ikke GDPR-samsvar på grunn av de betydelige tekniske og økonomiske kravene som er involvert. GDPR ville kreve at vi hoster data på EU-baserte servere og bygger en separat infrastruktur for å rute og lagre data regionalt, noe som effektivt ville doble våre hosting- og utviklingskostnader. Som en ideell organisasjon som tilbyr gratis verktøy til kirker, har vi ikke ressursene til å støtte dette for øyeblikket.

:::warning
Hvis kirken din har medlemmer i EU, vær oppmerksom på at ChurchApps for tiden ikke oppfyller GDPR-kravene. Rådfør deg med din juridiske rådgiver om samsvarsforpliktelser før du lagrer data om EU-medlemmer.
:::
