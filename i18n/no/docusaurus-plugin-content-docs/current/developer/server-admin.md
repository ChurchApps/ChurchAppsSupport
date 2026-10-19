---
title: "Serveradministrasjon"
---

# Serveradministrasjon

<div class="article-intro">

Funksjoner for serveradministrasjon i ChurchApps er bare tilgjengelige for brukere med tillatelsen **Server.Admin**. Disse verktøyene brukes til plattformdrift, support og feilsøking på tvers av alle menigheter i systemet.

</div>

:::warning Tilgang begrenset
Funksjonene på denne siden krever tillatelsen **Server.Admin** og er ikke tilgjengelige for vanlige menighetsadministratorer. De er kun beregnet på plattformoperatører og supportpersonell.
:::

## Åpne serveradministrasjon

Brukere med tillatelsen Server.Admin kan åpne serveradministrasjonspanelet fra B1 Admin:

1. Logg inn på [admin.b1.church](https://admin.b1.church)
2. Åpne [Jump-menyen](../b1-admin/introduction.md#getting-around-with-the-jump-menu), utvid **Innstillinger**, og klikk **Server Admin**. (Du kan også gå direkte til `admin.b1.church/admin`.)
3. Serveradministrasjonspanelet lister seksjonene sine nedover venstre side i tre grupper: **Katalog** (Menigheter, Brukere, Utgi deg for å være bruker), **Drift** (Bakgrunnsjobber, Commons, Brukstrender) og **System** (Oversettelsesoppslag, Serverhelse, Databasemigreringer)

## Brukerimpersonering

Impersonering gjør det mulig for serveradministratorer å logge inn som en annen bruker i støtte- og feilsøkingsøyemed. Det er nyttig når man undersøker problemer brukere har meldt, eller hjelper menigheter med å sette opp systemene sine.

### Slik impersonerer du en bruker

1. Åpne seksjonen **Utgi deg for å være bruker** i serveradministrasjonspanelet
2. Skriv brukerens navn eller e-postadresse i søkefeltet
3. Klikk **Søk** eller trykk Enter
4. Klikk på brukeren du vil impersonere i søkeresultatene
5. Bekreft impersoneringen i dialogen som vises
6. Du blir logget inn som den brukeren og sendt videre til kontoen deres

### Viktige merknader

- Impersonering oppretter en ny økt med målbrukerens tillatelser og menighetstilgang
- Din opprinnelige administratorøkt avsluttes når du impersonerer en annen bruker
- Alle handlinger som utføres mens du er impersonert, logges i revisjonsloggen
- For å gå tilbake til administratorkontoen din, logg ut og logg inn igjen med dine legitimasjonsdata
- Bruk impersonering bare når det er nødvendig for support, og informer alltid brukere når du får tilgang til kontoene deres i supportøyemed

### API-endepunkt

Impersoneringsfunksjonen støttes av endepunktet `/users/:userId/impersonate` i Membership-API-et. Se [Membership-endepunkter](/docs/developer/api/endpoints/membership#users) for tekniske detaljer.

### Sikkerhetshensyn

- Impersonering krever tillatelsen Server.Admin — denne tillatelsen bør deles ut sparsomt og bare til pålitelige plattformoperatører
- Alle impersoneringshendelser logges med administratorens bruker-ID og målbrukerens bruker-ID
- Menigheter varsles ikke når impersonering skjer, så etabler klare retningslinjer for når og hvordan funksjonen skal brukes
- Vurder å dokumentere impersoneringshendelser i supportsystemet deres for ansvarlighet

## Commons-moderering

Commons er den delte moderasjonskøen for brukerinnsendt innhold på tvers av produkter — WorshipCommons-sanger, Lessons.church-leksjoner, FreeShow-maler og B1-nettstedsbyggermaler går alle gjennom samme kø i stedet for separate gjennomgangsverktøy per produkt.

### Åpne Commons

1. Gå til fanen **Commons** i serveradministrasjonspanelet.
2. Du ser tre undervaner: **Kø**, **Rapporter** og **Ressurser**.

En begrenset rolle for **musikkredaktør** kan også se fanen Kø, men er blokkert fra å godkjenne innsendinger som endrer en sangs rettigheter eller lisensiering.

### Kø

Køen lister alle ventende innsendinger på tvers av alle produkter, filtrerbare etter produkt og ressurstype. Hver rad viser om innsendingen er en ny ressurs, en redigering av den opprinnelige forfatteren, eller en redigering fra en tredjepart, sammen med innsenderens godkjenningshistorikk og hvor lenge innsendingen har ventet (flagges når den har passert 72 timer).

Klikk **Gjennomgå** for å åpne en panel med feltvise forskjeller, filforhåndsvisninger og en innebygd skrivebeskyttet forhåndsvisning av elementet. Bruk tastatursnarveiene **a**/**r** for å godkjenne eller avvise, og **j**/**k** for å gå til neste eller forrige innsending uten å forlate panelet. Ved avvisning må du velge en årsak (for eksempel kvalitet, duplikat, lisensiering, ccli, ai eller off-topic) og skrive et notat.

### Rapporter

Fanen Rapporter håndterer opphavsrettsrapporter og policy-/kvalitetsrapporter som er sendt inn mot allerede publiserte ressurser, delt i separate køer for Opphavsrett og Policy og annet, pluss en historikk over løste saker. Ta en rapport for å begynne å jobbe med den, og løs den deretter med en løsning (opprettholdt, avvist eller duplikat) og en handling (ingen, avpubliser eller fjern).

### Ressurser

Fanen Ressurser er en søkbar oversikt over publisert innhold, med handlinger for å **Fremhev** en ressurs (den vises på produktets forside), **Avpubliser**/**Publiser på nytt**, eller **Fjern** den (med en opphavsrettslig eller policymessig begrunnelse).

For sanger er dette også stedet der en sang blir **klar for søndag** og kan vises i en menighets søk etter sanger i B1 Admin: en gjennomgåer åpner ressursen og markerer hver publiserte toneart som **Lyttet** når de har hørt den gjennom og bekreftet at noter, akkorder og lysbilder er til stede. En sang blir først klar for søndag når hver tonearts avkryssingsboks er haket av.

:::info
Commons-moderering er kun for ansatte — enkeltmenigheter ser aldri denne køen. Det ene stedet B1 Admin for en enkelt menighet berører Commons-data, er seksjonen «WorshipCommons — gratis» i [sangsøket](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), som bare viser sanger som allerede har gjennomgått denne prosessen.
:::

Se siden [Content Commons-arkitektur](/docs/developer/architecture/commons) for den underliggende datamodellen og innsendingslivssyklusen.

## Godkjenning av gruppe-e-post

Menigheter kan ikke sende menighetsskrevet e-post (gruppe-e-post, oppfølgingsskjemaer, arbeidsflyt-e-poster og kontoinvitasjoner) før en serveradministrator har godkjent det. Dette hindrer botregistrerte menigheter i å bruke ChurchApps' delte avsenderadresse til spam.

1. Åpne fanen **Menigheter** i serveradministrasjonspanelet.
2. Hver menighet viser en **Gruppe-e-post**-brikke: **Godkjent** (grønn) eller **Ikke godkjent** (kun kantlinje).
3. Klikk på brikken og bekreft for å godkjenne menigheten, eller for å trekke tilbake en godkjenning.

Menighetens ansatte ber om godkjenning med knappen **Be om gjennomgang** i dialogen Send e-post i B1 Admin. Forespørselen sendes på e-post til supportadressen og lister menighetens navn, ID, registreringsdato, sted og hvem som ba om den. En menighet kan sende én forespørsel per uke. Se [Begrensninger for menighetsskrevet e-post](/docs/developer/architecture/notifications#church-authored-email-limits) for den daglige kvoten og den automatiske pausen ved returer og klager.

## Databasemigreringer {#database-migrations}

Arbeidsflyten **Deploy Prod** kjører ventende migreringer selv. De hostede databasene godtar bare tilkoblinger fra innsiden av Api-ets nettverk, så en GitHub-runner kan ikke nå dem; i stedet kaller arbeidsflyten rett etter `serverless deploy` Api-ets `migrate`-Lambda (`api-Prod-migrate`), som kjører alle modulers ventende migreringer med samme runner som denne fanen, og feiler deployen hvis en modul gir feil eller blir avvist. **Rollback Prod** reverserer bare Lambda-koden; migreringer som er kjørt, forblir kjørt. Fanen **Databasemigreringer** brukes til å sjekke status, kjøre det en deploy ikke gjorde (for eksempel i demomiljøet, der deployen ikke migrerer), og baselinjesette moduler uten historikk. (Selv-hostede Docker-installasjoner kjører fortsatt migreringer automatisk når Api-containeren starter.)

Fanen viser gjeldende miljø og én rad per modul (membership, attendance, giving osv.) med status, antall kjørte og ventende migreringer, og den sist kjørte.

- **Kjør ventende migreringer** kjører alle ventende migreringer, én modul om gangen, i rekkefølge. Den stopper ved første feil og viser hva som ble kjørt for hver modul.
- En modul merket **Ingen historikk** har en database som er eldre enn migreringssporing. Den kjøres aldri automatisk, fordi det ville spille av gamle datamigreringer på nytt mot levende tabeller. Klikk i stedet **Sjekk skjema** for den modulen. Api-et sammenligner tabellene, kolonnene og indeksene hver migrering oppretter med den levende databasen, og merker hver migrering som **Allerede kjørt**, **Mangler**, **Delvis kjørt** eller **Kun data**. Ingenting endres av sjekken.
- I sjekkresultatene skriver **Registrer som allerede kjørt** de oppdagede migreringene inn i migreringshistorikken uten å kjøre dem (etter bekreftelse). Alt opp til den siste migreringen som er **Allerede kjørt**, registreres, inkludert **Kun data**-migreringer i det området; **Mangler**-migreringer forblir ventende og kan deretter kjøres normalt med **Kjør ventende migreringer**.
- En **Delvis kjørt**-migrering blokkerer registrering. Hvis migreringen er trygg å kjøre på nytt (les den først), huk av **Kjør på nytt** slik at den forblir ventende og kjøres på nytt fra starten.

Serveradministrasjonspanelet og CLI-en (`yarn migrate:up`) bruker samme Kysely-migrator og tabellen `kysely_migration`, så de er alltid enige om hva som er kjørt. Endepunktene bak er `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` og `POST .../:module/baseline`, alle kun for Server.Admin.

## Relaterte sider

- [Autentisering og tillatelser](/docs/developer/api/endpoints/authentication) — tillatelsesmodellen og JWT-autentisering
- [Membership-endepunkter](/docs/developer/api/endpoints/membership) — API for brukere og menigheter
- [Revisjonslogg](/docs/b1-admin/reports/audit-log) — vis aktivitetslogger for en menighet
- [Content Commons-arkitektur](/docs/developer/architecture/commons) — delt ressursmodell og moderasjonslivssyklus
