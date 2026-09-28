---
title: "Serveradministrasjon"
---

# Serveradministrasjon

<div class="article-intro">

Serveradministrasjonsfunksjoner i ChurchApps er kun tilgjengelige for brukere med **Server.Admin** tillatelsen. Disse verktøyene brukes for plattformoperasjoner, support og feilsøking på tvers av alle kirker i systemet.

</div>

:::warning Tilgang begrenset
Funksjonene som er beskrevet på denne siden krever **Server.Admin** tillatelse og er ikke tilgjengelige for vanlige kirkeadministratorer. De er ment for plattformoperatører og supportpersonell kun.
:::

## Tilgang til serveradministrasjon

Brukere med Server.Admin-tillatelse kan få tilgang til serveradministrasjonspanelet fra B1 Admin:

1. Logg inn på [admin.b1.church](https://admin.b1.church)
2. Åpne **Innstillinger**, og klikk deretter **Serveradministrasjon** i Innstillinger-menyen. (Du kan også gå direkte til `admin.b1.church/admin`.)
3. Serveradministrasjonspanelet har seksjoner for Kirker, Brukere, Etterlign bruker, Bakgrunnsjobber, Commons, Brukstrender, Oversettelsessøk, Serverhelse og Databasemigrasjoner

## Brukerimitasjon

Imitasjonsfunksjonen lar serveradministratorer logge inn som en annen bruker for support- og feilsøkingsformål. Dette er nyttig når du undersøker problemer som brukeren rapporterer eller hjelper kirker med å konfigurere systemene sine.

### Slik etterligner du en bruker

1. Åpne **Etterlign bruker**-delen av serveradministrasjonspanelet
2. Skriv inn brukerens navn eller e-postadresse i søkefeltet
3. Klikk **Søk** eller trykk Enter
4. Fra søkeresultatene, klikk på brukeren du vil etterligne
5. Bekreft imitasjonen i dialogen som vises
6. Du vil bli logget inn som den brukeren og omdirigert til kontoen deres

### Viktige merknader

- Imitasjon oppretter en ny økt med målbrukerens tillatelser og kirkens tilgang
- Din opprinnelige admin-økt slutter når du etterligner en annen bruker
- Alle handlinger som utføres mens etterlignede, blir logget i revideringsloggen
- For å gå tilbake til administratorkontoen din, logg ut og logg inn igjen med legitimasjonen din
- Bruk imitasjon kun når det er nødvendig for støtteformål og informer alltid brukere når du får tilgang til kontoen deres for support

### API-endepunkt

Imitasjonsfunksjonen støttes av `/users/:userId/impersonate`-endepunktet i medlemskaps-API. Se [Medlemskapsendepunkter](/docs/developer/api/endpoints/membership#users) for tekniske detaljer.

### Sikkerhetshensyn

- Imitasjon krever Server.Admin-tillatelse - denne tillatelsen bør gis sparsamt og kun til pålitelige plattformoperatører
- Alle imitasjonshendelser er logget med administratorbruker-ID og målbruker-ID
- Kirker blir ikke varslet når imitasjon oppstår, så etabler klare retningslinjer for når og hvordan denne funksjonen skal brukes
- Vurder å dokumentere imitasjonshendelser i støttebilettsystemet ditt for ansvarlighet

## Commons-moderasjon

Commons er den delte modereringskøen for brukersendinger på tvers av produkter — WorshipCommons-sanger, Lessons.church-leksjoner, FreeShow-maler og B1-nettstedbyggermaler flyter alle gjennom samme kø i stedet for separate per-produkt-gjennomgangsverktøy.

### Tilgang til Commons

1. Naviger til **Commons**-fanen i serveradministrasjonspanelet.
2. Du vil se tre underfaner: **Kø**, **Rapporter** og **Ressurser**.

En begrenset **musikkredigeringsstilling** kan også se køfanen, men er blokkert fra å godkjenne innleveringer som endrer en sangs rettigheter eller lisensiering.

### Kø

Køen viser hver ventende innlevering på tvers av alle produkter, filtrerbar etter produkt og ressurstype. Hver rad viser om innleveringen er en ny ressurs, en redigering av dens opprinnelige forfattter eller en redigering av tredjepart, sammen med innsenderens godkjenningsspor og hvor lenge innleveringen har ventet (flagget når den går forbi 72 timer).

Klikk **Gjennomgang** for å åpne en skuff med feltdetaljer, filforhåndsvisninger og en innebygd skrivebeskyttet forhåndsvisning av gjenstanden. Bruk **a**/**r** tastatursnarveier til å godkjenne eller avvise, og **j**/**k** for å flytte til neste eller forrige innlevering uten å forlate skuffen. Avvisning krever valg av en grunn (for eksempel kvalitet, duplikat, lisensiering, ccli, ai eller off-topic) og en merknad.

### Rapporter

Rapporter-fanen håndterer opphavsrets- og policy/kvalitetsrapporter som er sendt inn mot allerede publiserte ressurser, delt inn i separate Opphavsrett og Policy & Annet køer pluss en Løst historie. Kreve en rapport for å begynne å arbeide med den, løs den deretter med en resolusjon (opprettholdt, avvist eller duplikat) og en handling (ingen, avpublisere eller fjerne).

### Ressurser

Ressurser-fanen er en søkbar nettleser for publisert innhold med handlinger for **Fremhev** en ressurs (fremhever den på produktets hjemmeside), **Avpublisere**/**Gjenopublisere** den eller **Fjerne** den (med en opphavsrett eller policy-grunn).

For sanger spesifikt, er dette også der en sang blir **Søndagsready** og kvalifisert til å vises i en kirkes B1 Admin-sangsøk: en gjennomganger åpner ressursen og markerer hver publisert nøkkel som **Lyttet** når de har hørt gjennom den og bekreftet at poengsum, akkorder og slides alle er tilstede. En sang blir kun søndagsready når hver nøkkel er avmerket.

:::info
Commons-moderasjon er kun for personell — individuelle kirker ser aldri denne køen. Det eneste stedet en individuell kirkes B1 Admin berører Commons-data er "WorshipCommons — gratis"-delen av [sangsøket](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), som kun viser sanger som allerede har gjennomgått denne gjennomgangsprosessen.
:::

Se [Content Commons-arkitektur](/docs/developer/architecture/commons)-siden for den underliggende datamodellen og innleveringssyklusen.

## Godkjenning av gruppee-post

Kirker kan ikke sende kirkeskriven e-post (gruppee-post, skjemaoppfølginger, arbeidsflyte-e-poster og kontoinvitasjoner) før en serveradministrator godkjenner dem. Dette hindrer bot-registrerte kirker fra å bruke den delte ChurchApps-sendingsadressen for spam.

1. Åpne **Kirker**-fanen i serveradministrasjonspanelet.
2. Hver kirke viser en **Gruppee-post**-brikke: **Godkjent** (grønn) eller **Ikke godkjent** (skissert).
3. Klikk på brikken og bekreft for å godkjenne kirken, eller for å tilbakekalle en godkjenning.

Kirkepersonalet ber om godkjenning med **Forespørsel gjennomgang**-knappen i B1 Admin's Send Email-dialog. Forespørselen blir sendt til støtteadressen og viser kirkens navn, ID, registreringsdato, plassering og hvem som spurte. En kirke kan sende en forespørsel per uke. Se [Kirkeforfatterlig e-postgrenser](/docs/developer/architecture/notifications#church-authored-email-limits) for det daglige tilskuddet og automatisk pause på spretter og klager.

## Databasemigrasjoner

Distribusjoner endrer ikke databasen. De vertsbaserte databasene godtar kun tilkoblinger fra innenfor Api-nettverket, så etter en versjon som legger til en migrering, bruker en serveradministrator den fra **Databasemigrasjoner**-fanen. (Selvhosted Docker-installasjoner kjører fortsatt migrasjoner automatisk når Api-beholderen starter.)

Fanen viser det gjeldende miljøet og en rad per modul (medlemskap, oppmøte, donasjon og så videre) med statusen, antall brukte og ventende migrasjoner og den siste som ble brukt.

- **Kjør ventende migrasjoner** bruker hver ventende migrering, en modul om gangen, i rekkefølge. Den stopper ved første feil og viser hva som ble brukt for hver modul.
- En modul merket **Ingen historie** har en database som forutgår migrasjonsposting. Den blir aldri kjørt automatisk, fordi det ville gjenta gamle datamigrasjoner over live-tabeller. Klikk **Kontroller skjema** på den modulen i stedet. Api sammenligner tabellene, kolonnene og indeksene hver migrering oppretter med den live-databasen og markerer hver migrering **Allerede brukt**, **Manglende**, **Delvis brukt** eller **Kun data**. Ingenting endres av kontroll.
- I kontrollresultatene markerer **Oppføringsresultat som allerede brukt** de oppdagede migraseringene i migrasjonshistorikken uten å kjøre dem. Manglende forblir ventende og kan deretter kjøres normalt.
- En **Delvis brukt** migrering blokkerer oppføringen. Hvis migrasjonen er trygg å kjøre igjen (les den først), kryss av **Kjør på nytt** så den forblir ventende og kjøres igjen fra toppen.

Serveradministrasjonspanelet og CLI (`yarn migrate:up`) bruker samme Kysely-migrering og `kysely_migration`-tabell, så de er alltid enige om hva som har blitt brukt. Støtteendepunktene er `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` og `POST .../:module/baseline`, alle Server.Admin kun.

## Relaterte sider

- [Godkjenning og tillatelser](/docs/developer/api/endpoints/authentication) — Tillatelsemodell og JWT-godkjenning
- [Medlemskapsendepunkter](/docs/developer/api/endpoints/membership) — API for bruker- og kirkestyring
- [Revisjonlogg](/docs/b1-admin/reports/audit-log) — Vis aktivitetslogger for en kirke
- [Content Commons-arkitektur](/docs/developer/architecture/commons) — Delt eiendelmodell og modereringssyklus
