---
title: "Serveradministrasjon"
---

# Serveradministrasjon

<div class="article-intro">

Funksjonene for serveradministrasjon i ChurchApps er bare tilgjengelige for brukere med tillatelsen **Server.Admin**. Verktøyene brukes til plattformdrift, support og feilsøking på tvers av alle kirker i systemet.

</div>

:::warning Begrenset tilgang
Funksjonene som beskrives på denne siden krever tillatelsen **Server.Admin** og er ikke tilgjengelige for vanlige kirkeadministratorer. De er kun ment for plattformoperatører og supportpersonell.
:::

## Tilgang til Server Admin

Brukere med tillatelsen Server.Admin får tilgang til serveradministrasjonspanelet fra B1 Admin:

1. Logg inn på [admin.b1.church](https://admin.b1.church)
2. Åpne [Jump-menyen](../b1-admin/introduction.md#getting-around-with-the-jump-menu), utvid **Innstillinger** og klikk på **Server Admin**. (Du kan også gå rett til `admin.b1.church/admin`.)
3. Server Admin-panelet har seksjoner for Kirker, Brukere, Utgi seg for bruker, Bakgrunnsjobber, Commons, Bruksutvikling, Oversettelsesoppslag, Serverhelse og Databasemigreringer

## Utgi seg for en bruker

Funksjonen for å utgi seg for en bruker lar serveradministratorer logge inn som en annen bruker i forbindelse med support og feilsøking. Det er nyttig når man undersøker problemer brukere har meldt, eller hjelper kirker med å sette opp systemene sine.

### Slik utgir du deg for en bruker

1. Åpne seksjonen **Impersonate User** i Server Admin-panelet
2. Skriv inn brukerens navn eller e-postadresse i søkefeltet
3. Klikk på **Søk** eller trykk Enter
4. Klikk på brukeren du vil utgi deg for, i søkeresultatene
5. Bekreft i dialogen som vises
6. Du blir logget inn som den brukeren og sendt videre til vedkommendes konto

### Viktige merknader

- Funksjonen oppretter en ny økt med målbrukerens tillatelser og kirketilgang
- Din opprinnelige administratorøkt avsluttes når du utgir deg for en annen bruker
- Alle handlinger som utføres mens du utgir deg for en bruker, logges i revisjonssporet
- For å gå tilbake til administratorkontoen din må du logge ut og inn igjen med dine egne påloggingsopplysninger
- Bruk funksjonen bare når det er nødvendig av hensyn til support, og informer alltid brukerne når du går inn på kontoene deres for å gi support

### API-endepunkt

Funksjonen er bygget på endepunktet `/users/:userId/impersonate` i Membership API. Se [Membership-endepunkter](/docs/developer/api/endpoints/membership#users) for tekniske detaljer.

### Sikkerhetshensyn

- Funksjonen krever tillatelsen Server.Admin – denne tillatelsen bør gis sparsomt og bare til pålitelige plattformoperatører
- Alle hendelser der man utgir seg for en bruker, logges med administratorens bruker-ID og målbrukerens bruker-ID
- Kirkene får ikke beskjed når dette skjer, så sørg for klare retningslinjer for når og hvordan funksjonen skal brukes
- Vurder å dokumentere slike hendelser i supportsaksystemet ditt av hensyn til etterprøvbarhet

## Commons-moderering

Commons er den delte modereringskøen for brukerinnsendt innhold på tvers av produkter – sanger i WorshipCommons, leksjoner i Lessons.church, maler i FreeShow og maler for B1-nettstedsbyggeren går alle gjennom samme kø i stedet for separate vurderingsverktøy per produkt.

### Få tilgang til Commons

1. Gå til fanen **Commons** i Server Admin-panelet.
2. Du ser tre underfaner: **Queue**, **Reports** og **Assets**.

En begrenset rolle som **musikkredaktør** kan også se fanen Queue, men kan ikke godkjenne innsendinger som endrer rettigheter eller lisensiering for en sang.

### Queue

Queue viser alle ventende innsendinger på tvers av alle produkter, og kan filtreres etter produkt og ressurstype. Hver rad viser om innsendingen er en ny ressurs, en endring fra den opprinnelige forfatteren eller en endring fra en tredjepart, sammen med innsenderens godkjenningshistorikk og hvor lenge innsendingen har ventet (merkes når den passerer 72 timer).

Klikk på **Review** for å åpne en skuff med forskjeller på feltnivå, filforhåndsvisninger og en innebygd skrivebeskyttet forhåndsvisning av elementet. Bruk hurtigtastene **a**/**r** for å godkjenne eller avvise, og **j**/**k** for å gå til neste eller forrige innsending uten å forlate skuffen. Ved avvisning må du velge en begrunnelse (for eksempel quality, duplicate, licensing, ccli, ai eller off-topic) og skrive et notat.

### Reports

Fanen Reports håndterer opphavsretts- og retningslinje-/kvalitetsrapporter som er sendt inn mot allerede publiserte ressurser, delt i egne køer for Copyright og Policy & Other pluss en historikk over løste saker. Ta en rapport for å begynne å behandle den, og løs den deretter med en avgjørelse (upheld, dismissed eller duplicate) og en handling (none, unpublish eller remove).

### Assets

Fanen Assets er en søkbar oversikt over publisert innhold, med handlinger for å **Feature** en ressurs (fremhever den på produktets forside), **Unpublish**/**Republish** den, eller **Remove** den (med en begrunnelse om opphavsrett eller retningslinjer).

For sanger er dette også stedet der en sang blir **Sunday-ready** og kan vises i sangsøket i en kirkes B1 Admin: en vurderer åpner ressursen og markerer hver publiserte toneart som **Listened** når vedkommende har hørt gjennom den og bekreftet at noter, akkorder og lysbilder alle er til stede. En sang blir først Sunday-ready når alle tonearter er avhuket.

:::info
Commons-moderering er kun for staben – enkeltkirker ser aldri denne køen. Det eneste stedet der en enkeltkirkes B1 Admin berører Commons-data, er seksjonen «WorshipCommons — free» i [sangsøket](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), som bare viser sanger som allerede har gått gjennom denne vurderingsprosessen.
:::

Se siden om [arkitekturen for Content Commons](/docs/developer/architecture/commons) for den underliggende datamodellen og livssyklusen for innsendinger.

## Godkjenning av gruppe-e-post

Kirker kan ikke sende e-post skrevet av kirken (gruppe-e-post, skjemaoppfølginger, arbeidsflyt-e-poster og kontoinvitasjoner) før en serveradministrator godkjenner dem. Dette hindrer kirker som er registrert av roboter, i å bruke den delte avsenderadressen til ChurchApps til spam.

1. Åpne fanen **Churches** i Server Admin-panelet.
2. Hver kirke har en **Group Email**-brikke: **Approved** (grønn) eller **Not approved** (med omriss).
3. Klikk på brikken og bekreft for å godkjenne kirken, eller for å trekke tilbake en godkjenning.

Kirkens ansatte ber om godkjenning med knappen **Request review** i dialogen for å sende e-post i B1 Admin. Forespørselen sendes på e-post til supportadressen og oppgir kirkens navn, ID, registreringsdato, sted og hvem som ba om den. En kirke kan sende én forespørsel per uke. Se [Grenser for e-post skrevet av kirken](/docs/developer/architecture/notifications#church-authored-email-limits) for den daglige kvoten og den automatiske pausen ved avvisninger og klager.

## Databasemigreringer

Utrullinger endrer ikke databasen. De hostede databasene godtar bare tilkoblinger fra innsiden av Api-ets nettverk, så etter en utgivelse som legger til en migrering, bruker en serveradministrator den fra fanen **Database Migrations**. (Selvhostede Docker-installasjoner kjører fortsatt migreringer automatisk når Api-containeren starter.)

Fanen viser gjeldende miljø og én rad per modul (membership, attendance, giving og så videre) med status, antall anvendte og ventende migreringer og den sist anvendte.

- **Run Pending Migrations** anvender alle ventende migreringer, én modul om gangen, i rekkefølge. Den stopper ved første feil og viser hva som ble anvendt for hver modul.
- En modul merket **No history** har en database som er eldre enn migreringssporing. Den kjøres aldri automatisk, fordi det ville spilt av gamle datamigreringer over live-tabeller. Klikk i stedet på **Check Schema** for den modulen. Api-et sammenligner tabellene, kolonnene og indeksene hver migrering oppretter, med den live databasen og markerer hver migrering som **Already applied**, **Missing**, **Partly applied** eller **Data only**. Kontrollen endrer ingenting.
- I kontrollresultatene skriver **Record as Already Applied** de oppdagede migreringene inn i migreringshistorikken uten å kjøre dem (etter en bekreftelse). Alt frem til den siste **Already applied**-migreringen registreres, inkludert **Data only**-migreringer i det området; **Missing**-migreringer blir ventende og kan deretter kjøres som vanlig med **Run Pending Migrations**.
- En **Partly applied**-migrering blokkerer registrering. Hvis det er trygt å kjøre migreringen på nytt (les den først), kryss av for **Re-run** slik at den forblir ventende og kjøres på nytt fra toppen.

Server Admin-panelet og CLI-et (`yarn migrate:up`) bruker den samme Kysely-migratoren og tabellen `kysely_migration`, så de er alltid enige om hva som er anvendt. Endepunktene bak er `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` og `POST .../:module/baseline`, alle bare for Server.Admin.

## Relaterte sider

- [Autentisering og tillatelser](/docs/developer/api/endpoints/authentication) — Tillatelsesmodellen og JWT-autentisering
- [Membership-endepunkter](/docs/developer/api/endpoints/membership) — API for bruker- og kirkeadministrasjon
- [Revisjonslogg](/docs/b1-admin/reports/audit-log) — Se aktivitetslogger for en kirke
- [Arkitektur for Content Commons](/docs/developer/architecture/commons) — Delt ressursmodell og modereringens livssyklus
