---
title: "Serveradministration"
description: "Kun til Server.Admin-brugere: nulstil tofaktorlogin, skift til andre konti, modér Commons og godkend kirkens e-mail i B1 Admin."
---

# Serveradministration

<div class="article-intro">

Serveradministrationsfunktionerne i ChurchApps er kun tilgængelige for brugere med tilladelsen **Server.Admin**. Disse værktøjer bruges til platformsdrift, support og fejlfinding på tværs af alle kirker i systemet.

</div>

:::warning Adgang begrænset
Funktionerne beskrevet på denne side kræver tilladelsen **Server.Admin** og er ikke tilgængelige for almindelige kirkeadministratorer. De er kun beregnet til platformsoperatører og supportmedarbejdere.
:::

## Adgang til Server Admin

Brugere med tilladelsen Server.Admin kan åbne serveradministrationspanelet fra B1 Admin:

1. Log ind på [admin.b1.church](https://admin.b1.church)
2. Åbn [Jump-menuen](../b1-admin/introduction.md#getting-around-with-the-jump-menu), udvid **Indstillinger** og klik på **Server Admin**. (Du kan også gå direkte til `admin.b1.church/admin`.)
3. Panelet Server Admin viser sine sektioner i venstre side i tre grupper: **Katalog** (Kirker, Brugere, Impersonér bruger), **Drift** (Baggrundsjobs, Commons, Brugstendenser) og **System** (Oversættelsesopslag, Serversundhed, Databasemigreringer)

## Nulstilling af totrinsbekræftelse

Hvis en bruger har [totrinsbekræftelse](../b1-admin/profile/managing-profile.md#two-factor-sign-in) slået til og har mistet både sin telefon og sine backupkoder, kan en serveradministrator slå den fra:

1. Åbn sektionen **Brugere** i panelet Server Admin og find brugeren.
2. Brugere med totrinsbekræftelse vises med et mærke **Totrinsbekræftelse til**. Klik på **Nulstil 2FA** ved siden af.
3. Bekræft prompten. Gør dette først, når du har kontrolleret, hvem du taler med.

Brugeren kan derefter logge ind med kun sin adgangskode og konfigurere totrinsbekræftelse igen fra sin profil. Nulstillinger skrives til revisionsloggen som `mfa_reset`. Endepunktet er `POST /membership/users/mfa/reset/:userId` og kræver Server.Admin.

## Impersonering af brugere

Impersonering gør det muligt for serveradministratorer at logge ind som en anden bruger til support og fejlfinding. Det er nyttigt, når man undersøger problemer rapporteret af brugere, eller når man hjælper kirker med at konfigurere deres systemer.

### Sådan impersonerer du en bruger

1. Åbn sektionen **Impersonér bruger** i panelet Server Admin
2. Indtast brugerens navn eller e-mailadresse i søgefeltet
3. Klik på **Søg** eller tryk på Enter
4. Klik på den bruger, du vil impersonere, i søgeresultaterne
5. Bekræft impersoneringen i dialogen, der vises
6. Du bliver logget ind som den bruger og omdirigeret til vedkommendes konto

### Vigtige noter

- Impersonering opretter en ny session med målbrugerens tilladelser og kiradgang
- Din oprindelige administratorsession afsluttes, når du impersonerer en anden bruger
- Alle handlinger udført under impersonering logges i revisionssporet
- For at vende tilbage til din administratorkonto skal du logge ud og logge ind igen med dine legitimationsoplysninger
- Brug kun impersonering, når det er nødvendigt til support, og informer altid brugere, når du tilgår deres konti i supportøjemed

### API-endepunkt

Impersoneringsfunktionen understøttes af endepunktet `/users/:userId/impersonate` i Membership API'et. Se [Membership-endepunkter](/docs/developer/api/endpoints/membership#users) for tekniske detaljer.

### Sikkerhedsovervejelser

- Impersonering kræver tilladelsen Server.Admin - denne tilladelse bør gives sparsomt og kun til betroede platformsoperatører
- Alle impersoneringshændelser logges med administratorens bruger-ID og målbrugerens bruger-ID
- Kirker underrettes ikke, når impersonering finder sted, så etablér klare retningslinjer for, hvornår og hvordan funktionen skal bruges
- Overvej at dokumentere impersoneringshændelser i jeres supportticketsystem for at sikre ansvarlighed

## Commons-moderation

Commons er den fælles modereringskø for brugerindsendt indhold på tværs af produkter. WorshipCommons-sange, Lessons.church-lektioner, FreeShow-skabeloner og skabeloner til B1's hjemmesidebygger løber alle gennem den samme kø i stedet for separate modereringsværktøjer for hvert produkt.

### Adgang til Commons

1. Gå til fanen **Commons** i panelet Server Admin.
2. Du ser tre undersider: **Kø**, **Rapporter** og **Aktiver**.

En begrænset rolle som **musikredaktør** kan også se fanen Kø, men kan ikke godkende indsendelser, der ændrer en sangs rettigheder eller licens.

### Kø

Køen viser alle afventende indsendelser på tværs af alle produkter, og du kan filtrere efter produkt og aktivtype. Hver række viser, om indsendelsen er et nyt aktiv, en redigering af den oprindelige forfatter eller en redigering fra en tredjepart. Den viser også indsenderens godkendelseshistorik og hvor længe indsendelsen har ventet (markeret, når den har ventet over 72 timer).

Klik på **Gennemgå** for at åbne en sidepanel med feltvise forskelle, filforhåndsvisninger og en indlejret skrivebeskyttet forhåndsvisning af elementet. Brug tastaturgenvejene **a**/**r** til at godkende eller afvise, og **j**/**k** for at gå til den næste eller forrige indsendelse uden at forlade sidepanelet. Ved afvisning skal du vælge en årsag (for eksempel kvalitet, dublet, licens, ccli, ai eller off-topic) og skrive en note.

### Rapporter

Fanen Rapporter håndterer ophavsretsrapporter og politik- og kvalitetsrapporter, der er indgivet mod allerede publicerede aktiver. De er opdelt i køerne Ophavsret og Politik og andet samt en historik over løste sager. Tag en rapport for at begynde at arbejde på den, og løs den derefter med en resolution (fastholdt, afvist eller dublet) og en handling (ingen, afpublicér eller fjern).

### Aktiver

Fanen Aktiver er en søgbar oversigt over publiceret indhold med handlinger til at **fremhæve** et aktiv (det vises på produktets forside), **afpublicere**/**republicere** det eller **fjerne** det (med en begrundelse om ophavsret eller politik).

For sange er det også her, en sang bliver **klar til søndag** og kan vises i en kirkes søgning af sange i B1 Admin. En gennemgangsperson åbner aktivet og markerer hver publiceret tonart som **Lyttet**, når vedkommende har lyttet igennem den og bekræftet, at noderne, akkorderne og slides er til stede. En sang bliver først klar til søndag, når alle tonarter er markeret.

:::info
Commons-moderation er kun for personale. Enkelte kirker ser aldrig denne kø. Det eneste sted, hvor en enkelt kirkes B1 Admin rører ved Commons-data, er afsnittet "WorshipCommons — gratis" i [sangsøgningen](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons). Der vises kun sange, der allerede har været igennem denne gennemgang.
:::

Se siden [Content Commons-arkitektur](/docs/developer/architecture/commons) for den underliggende datamodel og indsendelsesforløbet.

## Godkendelse af gruppe-e-mail

Kirker kan ikke sende kirkeskrevne e-mails (gruppe-e-mail, opfølgning på formularer, workflow-e-mails og invitationer til konti), før en serveradministrator har godkendt dem. Det forhindrer botregistrerede kirker i at bruge ChurchApps' fælles afsenderadresse til spam.

1. Åbn fanen **Kirker** i panelet Server Admin.
2. Hver kirke viser et mærke **Gruppe-e-mail**: **Godkendt** (grøn) eller **Ikke godkendt** (kun kant).
3. Klik på mærket og bekræft for at godkende kirken eller for at tilbagekalde en godkendelse.

Kirkens medarbejdere anmoder om godkendelse med knappen **Anmod om gennemgang** i dialogen Send e-mail i B1 Admin. Anmodningen sendes til supportadressen og indeholder kirkens navn, ID, registreringsdato, placering og hvem der har anmodet. En kirke kan sende én anmodning om ugen. Se [Begrænsninger for kirkeskrevne e-mails](/docs/developer/architecture/notifications#church-authored-email-limits) for det daglige antal og den automatiske pause ved bounces og klager.

## Databasemigreringer

Workflowet **Deploy Prod** anvender selv ventende migreringer. De hostede databaser accepterer kun forbindelser fra Api'ens netværk, så en GitHub-runner kan ikke nå dem. I stedet kalder workflowet lige efter `serverless deploy` Api'ens `migrate`-Lambda (`api-Prod-migrate`), som kører alle modulers ventende migreringer med samme runner som denne fane, og fejler deployet, hvis et modul fejler eller afvises. **Rollback Prod** tilbagefører kun Lambda-koden; anvendte migreringer forbliver anvendt. Fanen **Databasemigreringer** bruges til at kontrollere status, til at køre det, en deployment ikke gjorde (for eksempel i demomiljøet, hvis deployment ikke migrerer), og til at baseline'e moduler uden historik. (Self-hosted Docker-installationer kører stadig migreringer automatisk, når Api-containeren starter.)

Fanen viser det aktuelle miljø og én række pr. modul (membership, attendance, giving og så videre) med status, antallet af anvendte og ventende migreringer samt den sidst anvendte.

- **Kør ventende migreringer** anvender alle ventende migreringer, ét modul ad gangen, i rækkefølge. Den stopper ved første fejl og viser, hvad der blev anvendt for hvert modul.
- Et modul markeret **Ingen historik** har en database, der er ældre end migreringssporingen. Det køres aldrig automatisk, fordi det ville afspille gamle datamigreringer over live-tabeller. Klik i stedet på **Kontrollér skema** for det modul. Api'en sammenligner tabellerne, kolonnerne og indekserne, som hver migrering opretter, med den live database og markerer hver migrering som **Allerede anvendt**, **Mangler**, **Delvist anvendt** eller **Kun data**. Kontrollen ændrer ikke noget.
- I kontrolresultaterne skriver **Registrér som allerede anvendt** de fundne migreringer ind i migreringshistorikken uden at køre dem (efter bekræftelse). Alt op til den sidste migrering med **Allerede anvendt** registreres, herunder **Kun data**-migreringer i det interval. Migreringer med **Mangler** forbliver ventende og kan derefter køres normalt med **Kør ventende migreringer**.
- En migrering med **Delvist anvendt** blokerer registrering. Hvis migreringen er sikker at køre igen (læs den først), sæt flueben i **Kør igen**, så den forbliver ventende og køres igen fra begyndelsen.

Panelet Server Admin og CLI'en (`yarn migrate:up`) bruger den samme Kysely-migrator og tabellen `kysely_migration`, så de altid er enige om, hvad der er anvendt. De bagvedliggende endepunkter er `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` og `POST .../:module/baseline`, og alle kræver Server.Admin.

## Relaterede sider

- [Godkendelse og tilladelser](/docs/developer/api/endpoints/authentication) — Tilladelsesmodel og JWT-godkendelse
- [Membership-endepunkter](/docs/developer/api/endpoints/membership) — API til bruger- og kirkeadministration
- [Revisionslog](/docs/b1-admin/reports/audit-log) — Vis aktivitetslogs for en kirke
- [Content Commons-arkitektur](/docs/developer/architecture/commons) — Delt aktivmodel og modereringsforløb
