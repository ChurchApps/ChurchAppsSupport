---
title: "Serveradministrasjon"
description: "Kun for Server.Admin-brukere: tilbakestill tofaktorinnlogging, utgi deg for å være en konto, moderer Commons og godkjenn kirkens e-post i B1 Admin."
---

# Serveradministrasjon

<div class="article-intro">

Funksjoner for serveradministrasjon i ChurchApps er bare tilgjengelige for brukere med tillatelsen **Server.Admin**. Disse verktøyene brukes til plattformdrift, support og feilsøking på tvers av alle kirker i systemet.

</div>

:::warning Begrenset tilgang
Funksjonene på denne siden krever tillatelsen **Server.Admin** og er ikke tilgjengelige for vanlige kirkeadministratorer. De er laget kun for plattformoperatører og supportpersonell.
:::

## Åpne serveradministrasjon

Brukere med tillatelsen Server.Admin kan åpne serveradministrasjonspanelet fra B1 Admin:

1. Logg inn på [admin.b1.church](https://admin.b1.church)
2. Åpne [hurtigmenyen](../b1-admin/introduction.md#getting-around-with-the-jump-menu), utvid **Innstillinger**, og klikk **Server Admin**. (Du kan også gå direkte til `admin.b1.church/admin`.)
3. Panelet for serveradministrasjon lister seksjonene sine nedover venstre side i tre grupper: **Katalog** (Kirker, Brukere, Utgi deg for en bruker), **Drift** (Bakgrunnsjobber, Commons, Bruksrytmer) og **System** (Oversettelsesoppslag, Serverhelse, Databasemigreringer)

## Tilbakestille tofaktorinnlogging

Hvis en bruker har [tofaktorinnlogging](../b1-admin/profile/managing-profile.md#two-factor-sign-in) slått på og har mistet både telefonen og reservekodene, kan en serveradministrator slå den av:

1. Åpne seksjonen **Brukere** i panelet for serveradministrasjon og finn brukeren.
2. Brukere med tofaktorinnlogging viser en merkelapp **Two-factor on**. Klikk **Reset 2FA** ved siden av den.
3. Bekreft spørsmålet. Gjør dette bare etter at du har bekreftet hvem du snakker med.

Brukeren kan deretter logge inn med bare passordet sitt og sette opp tofaktorinnlogging igjen fra profilen sin. Tilbakestillinger føres i revisjonsloggen som `mfa_reset`. Endepunktet er `POST /membership/users/mfa/reset/:userId` og krever Server.Admin.

## Utgi deg for en bruker

Funksjonen for å utgi seg for en bruker lar serveradministratorer logge inn som en annen bruker i støtte- og feilsøkingsøyemed. Dette er nyttig når man undersøker problemer brukeren har meldt, eller hjelper kirker med å konfigurere systemene sine.

### Slik utgir du deg for en bruker

1. Åpne seksjonen **Utgi deg for en bruker** i panelet for serveradministrasjon
2. Skriv inn brukerens navn eller e-postadresse i søkefeltet
3. Klikk **Search** eller trykk Enter
4. Klikk på brukeren du vil utgi deg for i søkeresultatene
5. Bekreft at du vil utgi deg for brukeren i dialogen som vises
6. Du blir logget inn som den brukeren og sendt videre til kontoen deres

### Viktige merknader

- Å utgi seg for en bruker oppretter en ny økt med målbrukerens tillatelser og kirketilgang
- Din opprinnelige administratorøkt avsluttes når du utgir deg for en annen bruker
- Alle handlinger utført mens du er utgitt for en bruker, føres i revisjonssporet
- For å gå tilbake til administratorkontoen din, logg ut og logg inn igjen med påloggingsopplysningene dine
- Bruk bare utgivelse når det er nødvendig for støtte, og informer alltid brukere når du får tilgang til kontoene deres i støtteøyemed

### API-endepunkt

Funksjonen for å utgi seg for en bruker støttes av endepunktet `/users/:userId/impersonate` i Membership-API-et. Se [Membership-endepunkter](/docs/developer/api/endpoints/membership#users) for tekniske detaljer.

### Sikkerhetshensyn

- Å utgi seg for en bruker krever tillatelsen Server.Admin — denne tillatelsen bør deles ut sparsomt og bare til betrodde plattformoperatører
- Alle hendelser med utgivelse føres med administratorens bruker-ID og målbrukerens bruker-ID
- Kirker varsles ikke når utgivelse skjer, så etabler klare retningslinjer for når og hvordan funksjonen skal brukes
- Vurder å dokumentere hendelser med utgivelse i ditt system for støttesaker, for ansvarlighetens skyld

## Commons-moderering

Commons er den felles moderasjonskøen for brukerinnsendt innhold på tvers av produkter — WorshipCommons-sanger, Lessons.church-leksjoner, FreeShow-maler og maler for nettstedsbyggeren i B1 flyter alle gjennom samme kø i stedet for separate gjennomgangsverktøy per produkt.

### Åpne Commons

1. Gå til fanen **Commons** i panelet for serveradministrasjon.
2. Du ser tre underfaner: **Queue**, **Reports** og **Assets**.

En begrenset rolle for **musikkredigerer** kan også se køfanen, men den er blokkert fra å godkjenne innsendinger som endrer en sangs rettigheter eller lisensiering.

### Kø

Køen lister alle ventende innsendinger på tvers av alle produkter, og kan filtreres etter produkt og ressurstype. Hver rad viser om innsendingen er en ny ressurs, en endring fra den opprinnelige forfatteren, eller en endring fra en tredjepart, sammen med innsenderens godkjenningshistorikk og hvor lenge innsendingen har ventet (markert når den passerer 72 timer).

Klikk **Review** for å åpne en skuff med diff-visning på feltnivå, forhåndsvisning av filer og en innebygd skrivebeskyttet forhåndsvisning av elementet. Bruk hurtigtastene **a**/**r** for å godkjenne eller avvise, og **j**/**k** for å gå til neste eller forrige innsending uten å forlate skuffen. Å avvise krever at du velger en grunn (for eksempel kvalitet, duplikat, lisensiering, ccli, ai eller off-topic) og et notat.

### Rapporter

Fanen Reports håndterer opphavsrettsrapporter og rapporter om retningslinjer/kvalitet som er sendt inn mot allerede publiserte ressurser. De er delt i separate køer for Copyright og Policy & Other, pluss en historikk over løste rapporter. Ta en rapport for å begynne å jobbe med den, og løs den deretter med en løsning (upheld, dismissed eller duplicate) og en handling (none, unpublish eller remove).

### Ressurser

Fanen Assets er en søkbar nettleser over publisert innhold, med handlinger for å **Feature** en ressurs (fremhever den på produktets hjemmeside), **Unpublish**/**Republish** den, eller **Remove** den (med en grunn knyttet til opphavsrett eller retningslinjer).

For sanger spesielt er dette også stedet der en sang blir **Sunday-ready** og kan vises i en kirkes søk etter sanger i B1 Admin: en gjennomgåer åpner ressursen og merker hver publiserte toneart som **Listened** når de har lyttet gjennom den og bekreftet at notene, akkordene og lysbildene er til stede. En sang blir først Sunday-ready når alle tonearter er avkrysset.

:::info
Commons-moderering er kun for personalet — enkeltkirker ser aldri denne køen. Det ene stedet B1 Admin for en enkelt kirke berører Commons-data, er seksjonen «WorshipCommons — gratis» i [sangsøket](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), som bare viser sanger som allerede har vært gjennom denne gjennomgangsprosessen.
:::

Se siden [Content Commons-arkitektur](/docs/developer/architecture/commons) for den underliggende datamodellen og livssyklusen for innsendinger.

## Godkjenning av gruppe-e-post

Kirker kan ikke sende kirkeskrevet e-post (gruppe-e-post, oppfølginger fra skjemaer, arbeidsflyt-e-poster og kontoinvitasjoner) før en serveradministrator har godkjent dem. Dette hindrer kirker som er registrert av roboter i å bruke den felles ChurchApps-avsenderadressen til spam.

1. Åpne fanen **Churches** i panelet for serveradministrasjon.
2. Hver kirke viser en merkelapp **Group Email**: **Approved** (grønn) eller **Not approved** (kun kontur).
3. Klikk på merkelappen og bekreft for å godkjenne kirken, eller for å trekke tilbake en godkjenning.

Kirkens personale ber om godkjenning med knappen **Request review** i B1 Admins dialog Send Email. Forespørselen sendes på e-post til supportadressen og lister kirkens navn, ID, registreringsdato, sted og hvem som ba om det. En kirke kan sende én forespørsel per uke. Se [Grenser for kirkeskrevet e-post](/docs/developer/architecture/notifications#church-authored-email-limits) for den daglige kvoten og den automatiske pausen ved returnerte e-poster og klager.

## Databasemigreringer {#database-migrations}

Arbeidsflyten **Deploy Prod** bruker ventende migreringer selv. De drevne databasene aksepterer bare tilkoblinger innenfra Api-ets nettverk, så en GitHub-runner kan ikke nå dem; i stedet kaller arbeidsflyten, rett etter `serverless deploy`, Api-ets `migrate`-Lambda (`api-Prod-migrate`), som kjører alle modulers ventende migreringer med samme runner som denne fanen, og feiler distribusjonen hvis en modul feiler eller avvises. **Rollback Prod** reverserer bare Lambda-koden; brukte migreringer forblir brukt. Fanen **Database Migrations** er til for å sjekke status, kjøre det en distribusjon ikke gjorde (for eksempel i demomiljøet, der distribusjonen ikke migrerer), og baselinjere moduler uten historikk. (Selvhostede Docker-installasjoner kjører fortsatt migreringer automatisk når Api-containeren starter.)

Fanen viser gjeldende miljø og én rad per modul (membership, attendance, giving og så videre) med status, antall brukte og ventende migreringer, og den sist brukte.

- **Run Pending Migrations** bruker alle ventende migreringer, én modul om gangen, i rekkefølge. Den stopper ved første feil og viser hva som ble brukt for hver modul.
- En modul merket **No history** har en database som er eldre enn migreringssporingen. Den kjøres aldri automatisk, fordi det ville spilt gamle datamigreringer om igjen over levende tabeller. Klikk **Check Schema** på den modulen i stedet. Api-et sammenligner tabellene, kolonnene og indeksene hver migrering oppretter med den levende databasen, og merker hver migrering som **Already applied**, **Missing**, **Partly applied** eller **Data only**. Ingenting endres av sjekken.
- I sjekkresultatene skriver **Record as Already Applied** de oppdagede migreringene inn i migreringshistorikken uten å kjøre dem (etter bekreftelse). Alt opp til den siste **Already applied**-migreringen registreres, inkludert **Data only**-migreringer i det intervallet; **Missing**-migreringer forblir ventende og kan deretter kjøres normalt med **Run Pending Migrations**.
- En **Partly applied**-migrering blokkerer registrering. Hvis migreringen er trygg å kjøre på nytt (les den først), kryss av for **Re-run** slik at den forblir ventende og kjøres på nytt fra starten.

Panelet for serveradministrasjon og CLI-en (`yarn migrate:up`) bruker den samme Kysely-migratoren og tabellen `kysely_migration`, så de er alltid enige om hva som er brukt. Endepunktene bak er `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` og `POST .../:module/baseline`, alle kun for Server.Admin.

## Relaterte sider

- [Autentisering og tillatelser](/docs/developer/api/endpoints/authentication) — tillatelsesmodell og JWT-autentisering
- [Membership-endepunkter](/docs/developer/api/endpoints/membership) — API for administrasjon av brukere og kirker
- [Revisjonslogg](/docs/b1-admin/reports/audit-log) — se aktivitetslogger for en kirke
- [Content Commons-arkitektur](/docs/developer/architecture/commons) — delt ressursmodell og livssyklus for moderering
