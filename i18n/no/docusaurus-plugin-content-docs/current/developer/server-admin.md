---
title: "Serveradministrasjon"
---

# Serveradministrasjon

<div class="article-intro">

Funksjoner for serveradministrasjon i ChurchApps er bare tilgjengelige for brukere med tillatelsen **Server.Admin**. Disse verktøyene brukes til plattformdrift, støtte og feilsøking på tvers av alle kirker i systemet.

</div>

:::warning Tilgang begrenset
Funksjonene som beskrives på denne siden krever tillatelsen **Server.Admin** og er ikke tilgjengelige for vanlige kirkeadministratorer. De er laget for plattformoperatører og støttepersonell alene.
:::

## Åpne serveradministrasjon

Brukere med tillatelsen Server.Admin kan åpne serveradministrasjonspanelet fra B1 Admin:

1. Logg inn på [admin.b1.church](https://admin.b1.church)
2. Åpne [Hurtigmenyen](../b1-admin/introduction.md#getting-around-with-the-jump-menu), utvid **Innstillinger**, og klikk **Serveradministrasjon**. (Du kan også gå direkte til `admin.b1.church/admin`.)
3. Serveradministrasjonspanelet lister sine seksjoner nedover venstre side i tre grupper: **Katalog** (Kirker, Brukere, Utgi deg for en bruker), **Drift** (Bakgrunnsjobber, Commons, Bruksrender) og **System** (Oversettelsesoppslag, Serverhelse, Databasemigreringer)

## Tilbakestille tofaktorpålogging

Hvis en bruker har [tofaktorpålogging](../b1-admin/profile/managing-profile.md#two-factor-sign-in) slått på og har mistet både telefonen og reservekodene, kan en serveradministrator slå den av:

1. Åpne seksjonen **Brukere** i serveradministrasjonspanelet og finn brukeren.
2. Brukere med tofaktorpålogging viser en merkelapp **Tofaktor på**. Klikk **Tilbakestill 2FA** ved siden av den.
3. Bekreft meldingen. Gjør dette bare etter at du har bekreftet hvem du snakker med.

Brukeren kan deretter logge inn med bare passordet og sette opp tofaktorpålogging igjen fra profilen sin. Tilbakestillinger skrives til revisjonsloggen som `mfa_reset`. Endepunktet er `POST /membership/users/mfa/reset/:userId` og krever Server.Admin.

## Brukerimpersonering

Impersonering gjør det mulig for serveradministratorer å logge inn som en annen bruker for støtte og feilsøking. Dette er nyttig når man undersøker problemer brukere har rapportert, eller hjelper kirker med å konfigurere systemene sine.

### Slik impersonerer du en bruker

1. Åpne seksjonen **Utgi deg for en bruker** i serveradministrasjonspanelet
2. Skriv inn brukerens navn eller e-postadresse i søkefeltet
3. Klikk **Søk** eller trykk Enter
4. Klikk på brukeren du vil impersonere i søkeresultatene
5. Bekreft impersoneringen i dialogen som vises
6. Du blir logget inn som den brukeren og sendt videre til kontoen deres

### Viktige merknader

- Impersonering oppretter en ny økt med målbrukerens tillatelser og kirketilgang
- Din opprinnelige administratorøkt avsluttes når du impersonerer en annen bruker
- Alle handlinger som utføres mens du er impersonert, logges i revisjonssporet
- For å gå tilbake til administratorkontoen din logger du ut og inn igjen med påloggingsopplysningene dine
- Bruk impersonering bare når det er nødvendig for støtte, og informer alltid brukere når du får tilgang til kontoene deres for støtte

### API-endepunkt

Impersoneringsfunksjonen støttes av endepunktet `/users/:userId/impersonate` i Membership-API-et. Se [Membership-endepunkter](/docs/developer/api/endpoints/membership#users) for tekniske detaljer.

### Sikkerhetshensyn

- Impersonering krever tillatelsen Server.Admin — denne tillatelsen bør gis sparsomt og bare til pålitelige plattformoperatører
- Alle impersoneringshendelser logges med administratorens bruker-ID og målbrukerens bruker-ID
- Kirker varsles ikke når impersonering skjer, så etabler klare retningslinjer for når og hvordan funksjonen skal brukes
- Vurder å dokumentere impersoneringshendelser i støttesystemet ditt for ansvarlighet

## Commons-moderering

Commons er den felles moderasjonskøen for brukerinnsendt innhold på tvers av produkter — WorshipCommons-sanger, Lessons.church-leksjoner, FreeShow-maler og B1-nettsidemaler flyter alle gjennom samme kø i stedet for separate gjennomgangsverktøy per produkt.

### Åpne Commons

1. Gå til fanen **Commons** i serveradministrasjonspanelet.
2. Du ser tre undefaner: **Kø**, **Rapporter** og **Innhold**.

En begrenset **musikkredigerer**-rolle kan også se fanen Kø, men er blokkert fra å godkjenne innsendinger som endrer en sangs rettigheter eller lisensiering.

### Kø

Køen lister alle ventende innsendinger på tvers av alle produkter, filtrerbare etter produkt og innholdstype. Hver rad viser om innsendingen er et nytt innhold, en redigering fra den opprinnelige forfatteren, eller en redigering fra en tredjepart, sammen med innsenderens godkjenningshistorikk og hvor lenge innsendingen har ventet (flagget når den har passert 72 timer).

Klikk **Gjennomgå** for å åpne en skuff med feltnivådiffer, filforhåndsvisninger og en innebygd skrivebeskyttet forhåndsvisning av elementet. Bruk hurtigtastene **a**/**r** for å godkjenne eller avvise, og **j**/**k** for å gå til neste eller forrige innsending uten å forlate skuffen. Avvisning krever at du velger en grunn (for eksempel kvalitet, duplikat, lisensiering, ccli, ai eller off-topic) og et notat.

### Rapporter

Fanen Rapporter håndterer opphavsrettsrapporter og policy-/kvalitetsrapporter som er sendt inn mot allerede publiserte innhold, delt i separate køer for Opphavsrett og Policy og annet, pluss en Løste-historikk. Ta en rapport for å begynne å jobbe med den, og løs den deretter med en resolusjon (opprettholdt, avvist eller duplikat) og en handling (ingen, avpubliser eller fjern).

### Innhold

Fanen Innhold er en søkbar oversikt over publisert innhold med handlinger for å **fremheve** et innhold (løfter det frem på produktets forside), **avpublisere**/**gjenpublisere** det, eller **fjerne** det (med en opphavsrettslig eller policy-grunn).

For sanger spesifikt er dette også stedet der en sang blir **klar for søndag** og kan dukke opp i en kirkes B1 Admin-sangsøk: en gjennomgåer åpner innholdet og merker hver publisert toneart som **Hørt** når de har hørt gjennom den og bekreftet at partituret, akkordene og lysbildene er til stede. En sang blir først klar for søndag når alle tonearter er avkrysset.

:::info
Commons-moderering er kun for ansatte — enkeltkirker ser aldri denne køen. Det ene stedet en enkelt kirkes B1 Admin berører Commons-data er seksjonen «WorshipCommons — gratis» i [sangsøket](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), som bare viser sanger som allerede har vært gjennom denne gjennomgangen.
:::

Se siden [Content Commons-arkitektur](/docs/developer/architecture/commons) for den underliggende datamodellen og innsendingslivssyklusen.

## Godkjenning av gruppe-e-post

Kirker kan ikke sende kirkeskrevet e-post (gruppe-e-post, oppfølgings-e-poster for skjemaer, arbeidsflyt-e-poster og kontoinvitasjoner) før en serveradministrator har godkjent dem. Dette hindrer botregistrerte kirker i å bruke den delte ChurchApps-avsenderadressen til spam.

1. Åpne fanen **Kirker** i serveradministrasjonspanelet.
2. Hver kirke viser en merkelapp **Gruppe-e-post**: **Godkjent** (grønn) eller **Ikke godkjent** (kontur).
3. Klikk merkelappen og bekreft for å godkjenne kirken, eller for å trekke tilbake en godkjenning.

Kirkens ansatte ber om godkjenning med knappen **Be om gjennomgang** i B1 Admins dialog for å sende e-post. Forespørselen sendes på e-post til supportadressen og lister kirkens navn, ID, registreringsdato, sted og hvem som ba om den. En kirke kan sende én forespørsel per uke. Se [Grenser for kirkeskrevet e-post](/docs/developer/architecture/notifications#church-authored-email-limits) for den daglige kvoten og den automatiske pausen ved returnerte meldinger og klager.

## Databasemigreringer

Arbeidsflyten **Deploy Prod** bruker ventende migreringer selv. De vertsbaserte databasene aksepterer bare tilkoblinger fra innsiden av Api-nettverket, så en GitHub-runner kan ikke nå dem; i stedet kaller arbeidsflyten, rett etter `serverless deploy`, Api-ets `migrate`-Lambda (`api-Prod-migrate`), som kjører alle moduleres ventende migreringer med samme kjører som denne fanen, og feiler utrullingen hvis en modul feiler eller avvises. **Rollback Prod** reverserer bare Lambda-koden; brukte migreringer forblir brukt. Fanen **Databasemigreringer** er for å sjekke status, kjøre det en utrulling ikke kjørte (for eksempel i demomiljøet, hvis utrulling ikke migrerer), og baseline moduler uten historikk.
(Selvhostede Docker-installasjoner kjører fortsatt migreringer automatisk når Api-containeren starter.)

Fanen viser gjeldende miljø og én rad per modul (membership, attendance, giving osv.) med status, antall brukte og ventende migreringer, og den sist brukte.

- **Kjør ventende migreringer** bruker alle ventende migreringer, én modul om gangen, i rekkefølge. Den stopper ved den første feilen og viser hva som ble brukt for hver modul.
- En modul merket **Ingen historikk** har en database som kom før migreringssporing. Den kjøres aldri automatisk, fordi det ville spille av gamle datamigreringer over live tabeller. Klikk **Sjekk skjema** for den modulen i stedet. Api-et sammenligner tabellene, kolonnene og indeksene hver migrering oppretter med den live databasen, og merker hver migrering **Allerede brukt**, **Mangler**, **Delvis brukt** eller **Bare data**. Ingenting endres av sjekken.
- I sjekkresultatene skriver **Registrer som allerede brukt** de oppdagede migreringene inn i migreringshistorikken uten å kjøre dem (etter en bekreftelse). Alt opp til den siste **Allerede brukt**-migreringen registreres, inkludert **Bare data**-migreringer i det intervallet; **Mangler**-migreringer forblir ventende og kan deretter kjøres normalt med **Kjør ventende migreringer**.
- En **Delvis brukt**-migrering blokkerer registrering. Hvis migreringen er trygg å kjøre igjen (les den først), huk av for **Kjør på nytt** slik at den forblir ventende og kjøres igjen fra begynnelsen.

Serveradministrasjonspanelet og CLI-en (`yarn migrate:up`) bruker den samme Kysely-migratoren og `kysely_migration`-tabellen, så de er alltid enige om hva som er brukt. Bakenforliggende endepunkter er `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` og `POST .../:module/baseline`, alle kun for Server.Admin.

## Relaterte sider

- [Autentisering og tillatelser](/docs/developer/api/endpoints/authentication) — tillatelsesmodellen og JWT-autentisering
- [Membership-endepunkter](/docs/developer/api/endpoints/membership) — API for brukere og kirker
- [Revisjonslogg](/docs/b1-admin/reports/audit-log) — vis aktivitetslogger for en kirke
- [Content Commons-arkitektur](/docs/developer/architecture/commons) — delt innholdsmodell og moderasjonslivssyklus
