---
title: "Serverbeheer"
---

# Serverbeheer

<div class="article-intro">

Serverbeheerfuncties in ChurchApps zijn alleen beschikbaar voor gebruikers met de **Server.Admin**-machtiging. Deze hulpmiddelen worden gebruikt voor platformbeheer, ondersteuning en probleemoplossing voor alle kerken in het systeem.

</div>

:::warning Toegang beperkt
De functies op deze pagina vereisen de **Server.Admin**-machtiging en zijn niet beschikbaar voor gewone kerkbeheerders. Ze zijn uitsluitend bedoeld voor platformbeheerders en ondersteuningsmedewerkers.
:::

## Toegang tot Server Admin

Gebruikers met de Server.Admin-machtiging kunnen het serverbeheerpaneel openen vanuit B1 Admin:

1. Meld je aan bij [admin.b1.church](https://admin.b1.church)
2. Open het [Sprongmenu](../b1-admin/introduction.md#getting-around-with-the-jump-menu), vouw **Instellingen** uit en klik op **Server Admin**. (Je kunt ook direct naar `admin.b1.church/admin` gaan.)
3. Het Server Admin-paneel toont de secties links in drie groepen: **Directory** (Kerken, Gebruikers, Impersonatie van gebruiker), **Operaties** (Achtergrondtaken, Commons, GebruiksTrends) en **Systeem** (Vertaalzoekingen, Serverstatus, Databasemigraties)

## Tweestapsaanmelding opnieuw instellen

Als een gebruiker [tweestapsaanmelding](../b1-admin/profile/managing-profile.md#two-factor-sign-in) heeft ingeschakeld en zowel de telefoon als de back-upcodes is kwijtgeraakt, kan een serverbeheerder deze uitschakelen:

1. Open de sectie **Gebruikers** van het Server Admin-paneel en zoek de gebruiker op.
2. Gebruikers met tweestapsaanmelding tonen een badge **Tweestapsaanmelding aan**. Klik ernaast op **2FA resetten**.
3. Bevestig de melding. Doe dit pas nadat je hebt vastgesteld met wie je praat.

De gebruiker kan daarna alleen met het wachtwoord inloggen en kan de tweestapsaanmelding opnieuw instellen via het profiel. Resets worden in het auditlogboek vastgelegd als `mfa_reset`. Het eindpunt is `POST /membership/users/mfa/reset/:userId` en vereist Server.Admin.

## Impersonatie van gebruikers

Met impersonatie kunnen serverbeheerders zich voor ondersteuning en probleemoplossing aanmelden als een andere gebruiker. Dit is handig bij het onderzoeken van door gebruikers gemelde problemen of bij het helpen van kerken met de configuratie van hun systemen.

### Een gebruiker impersoneren

1. Open de sectie **Impersonatie van gebruiker** van het Server Admin-paneel.
2. Voer de naam of het e-mailadres van de gebruiker in het zoekveld in.
3. Klik op **Zoeken** of druk op Enter.
4. Klik in de zoekresultaten op de gebruiker die je wilt impersoneren.
5. Bevestig de impersonatie in het dialoogvenster dat verschijnt.
6. Je wordt aangemeld als die gebruiker en doorgestuurd naar hun account.

### Belangrijke opmerkingen

- Impersonatie maakt een nieuwe sessie aan met de machtigingen en kerktoegang van de doelgebruiker.
- Je oorspronkelijke beheerderssessie eindigt zodra je een andere gebruiker impersoneert.
- Alle acties die tijdens impersonatie worden uitgevoerd, worden in het auditlogboek vastgelegd.
- Om terug te keren naar je beheerdersaccount, meld je af en daarna weer aan met je eigen gegevens.
- Gebruik impersonatie alleen wanneer dat voor ondersteuning nodig is, en informeer gebruikers altijd wanneer je hun account voor ondersteuning opent.

### API-eindpunt

De impersonatiefunctie wordt ondersteund door het eindpunt `/users/:userId/impersonate` in de Membership-API. Zie [Membership-eindpunten](/docs/developer/api/endpoints/membership#users) voor technische details.

### Beveiligingsoverwegingen

- Impersonatie vereist de Server.Admin-machtiging. Deze machtiging moet spaarzaam worden toegekend en alleen aan vertrouwde platformbeheerders.
- Alle impersonatiegebeurtenissen worden vastgelegd met het ID van de beheerder en het ID van de doelgebruiker.
- Kerken worden niet op de hoogte gesteld wanneer impersonatie plaatsvindt. Stel daarom duidelijke beleidsregels op voor wanneer en hoe deze functie wordt gebruikt.
- Overweeg om impersonatiegebeurtenissen te documenteren in je ticketsysteem voor ondersteuning, zodat er verantwoording kan worden afgelegd.

## Commons-moderatie

Commons is de gedeelde moderatiewachtrij voor door gebruikers ingediende inhoud van alle producten. WorshipCommons-liedjes, Lessons.church-lessen, FreeShow-sjablonen en sjablonen voor de B1-websitebouwer komen allemaal in dezelfde wachtrij terecht, in plaats van in aparte beoordelingstools per product.

### Toegang tot Commons

1. Ga naar het tabblad **Commons** in het Server Admin-paneel.
2. Je ziet drie subtabbladen: **Wachtrij**, **Rapporten** en **Assets**.

Een beperkte rol voor **muziekbewerker** kan het tabblad Wachtrij ook zien, maar kan geen inzendingen goedkeuren die de rechten of licentie van een nummer wijzigen.

### Wachtrij

De wachtrij toont alle openstaande inzendingen van alle producten. Je kunt filteren op product en type asset. Elke rij laat zien of de inzending een nieuwe asset is, een bewerking door de oorspronkelijke auteur, of een bewerking door een derde partij. Ook zie je de goedkeuringsgeschiedenis van de indiener en hoe lang de inzending al wacht. Inzendingen die langer dan 72 uur wachten, worden gemarkeerd.

Klik op **Beoordelen** om een paneel te openen met veldgewijze verschillen, bestandsvoorbeelden en een ingesloten voorbeeld van het item dat alleen-lezen is. Gebruik de sneltoetsen **a** en **r** om goed te keuren of af te wijzen, en **j** en **k** om naar de volgende of vorige inzending te gaan zonder het paneel te verlaten. Voor afwijzing moet je een reden kiezen (bijvoorbeeld kwaliteit, duplicaat, licentie, CCLI, AI of niet relevant voor het onderwerp) en een toelichting toevoegen.

### Rapporten

Het tabblad Rapporten behandelt auteursrechten- en beleids- of kwaliteitsrapporten over al gepubliceerde assets. Deze zijn verdeeld over de aparte wachtrijen Auteursrecht en Beleid & overig, plus een geschiedenis van afgehandelde rapporten. Claim een rapport om ermee aan de slag te gaan en los het vervolgens op met een resolutie (gehandhaafd, verworpen of duplicaat) en een actie (geen, depubliceren of verwijderen).

### Assets

Het tabblad Assets is een doorzoekbaar overzicht van gepubliceerde inhoud. Er zijn acties beschikbaar om een asset te **Uitlichten** (deze wordt dan op de startpagina van het product getoond), te **Depubliceren** of **Opnieuw publiceren**, of te **Verwijderen** (met een reden voor auteursrecht of beleid).

Voor liedjes is dit ook de plek waar een lied **zondagklaar** wordt en in aanmerking komt om in de liedzoekfunctie van de B1 Admin van een kerk te verschijnen. Een beoordelaar opent de asset en markeert elke gepubliceerde toonsoort als **Beluisterd** zodra het lied is beluisterd en de partituur, akkoorden en dia's zijn gecontroleerd. Een lied wordt pas zondagklaar wanneer alle toonsoorten zijn afgevinkt.

:::info
Commons-moderatie is alleen voor medewerkers. Individuele kerken zien deze wachtrij nooit. De enige plek waar de B1 Admin van een individuele kerk met Commons-gegevens werkt, is het gedeelte "WorshipCommons — gratis" van de [liedzoekfunctie](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons). Dit gedeelte toont alleen liedjes die al door dit beoordelingsproces zijn gegaan.
:::

Zie de pagina [Content Commons-architectuur](/docs/developer/architecture/commons) voor het onderliggende datamodel en de levenscyclus van inzendingen.

## Goedkeuring van groeps-e-mail

Kerken kunnen door kerken opgestelde e-mail (groeps-e-mail, vervolg op formulieren, workflow-e-mails en uitnodigingen voor accounts) pas versturen nadat een serverbeheerder dit heeft goedgekeurd. Zo voorkomen we dat door bots geregistreerde kerken het gedeelde verzendadres van ChurchApps gebruiken voor spam.

1. Open het tabblad **Kerken** in het Server Admin-paneel.
2. Elke kerk toont een chip **Groeps-e-mail**: **Goedgekeurd** (groen) of **Niet goedgekeurd** (omlijnd).
3. Klik op de chip en bevestig om de kerk goed te keuren of een goedkeuring in te trekken.

Kerkmedewerkers vragen om goedkeuring met de knop **Beoordeling aanvragen** in het dialoogvenster E-mail verzenden van B1 Admin. Het verzoek wordt per e-mail naar het ondersteuningsadres gestuurd en bevat de naam, het ID, de registratiedatum en locatie van de kerk, en wie het verzoek heeft ingediend. Een kerk kan één verzoek per week indienen. Zie [Limieten voor door kerken opgestelde e-mail](/docs/developer/architecture/notifications#church-authored-email-limits) voor het dagelijkse maximum en de automatische pauze bij bounces en klachten.

## Databasemigraties

De workflow **Deploy Prod** past openstaande migraties zelf toe. De gehoste databases accepteren alleen verbindingen vanuit het netwerk van de Api, dus een GitHub-runner kan er niet bij. In plaats daarvan roept de workflow direct na `serverless deploy` de Lambda `migrate` van de Api aan (`api-Prod-migrate`). Die voert alle openstaande migraties van elke module uit met dezelfde runner als dit tabblad, en laat de deployment mislukken als een module een fout geeft of wordt geweigerd. **Rollback Prod** zet alleen de Lambda-code terug. Toegepaste migraties blijven toegepast. Het tabblad **Databasemigraties** is bedoeld om de status te controleren, om migraties uit te voeren die een deployment niet heeft uitgevoerd (bijvoorbeeld op de demo-omgeving, waar de deployment niet migreert), en om modules zonder geschiedenis te initialiseren. (Self-hosted Docker-installaties voeren migraties nog steeds automatisch uit wanneer de Api-container start.)

Het tabblad toont de huidige omgeving en één rij per module (membership, attendance, giving, enzovoort) met de status, het aantal toegepaste en openstaande migraties, en de laatst toegepaste migratie.

- **Openstaande migraties uitvoeren** past elke openstaande migratie toe, één module tegelijk en in volgorde. Het proces stopt bij de eerste fout en toont per module wat er is toegepast.
- Een module met de markering **Geen geschiedenis** heeft een database die ouder is dan de migratieregistratie. Die wordt nooit automatisch uitgevoerd, omdat dat oude datamigraties opnieuw zou afspelen op live tabellen. Klik in plaats daarvan op **Schema controleren** bij die module. De Api vergelijkt de tabellen, kolommen en indexen die elke migratie aanmaakt met de live database, en markeert elke migratie als **Al toegepast**, **Ontbreekt**, **Gedeeltelijk toegepast** of **Alleen data**. De controle wijzigt niets.
- In de controleresultaten schrijft **Registreren als al toegepast** de gedetecteerde migraties in de migratiegeschiedenis, zonder ze uit te voeren (na bevestiging). Alles tot en met de laatste migratie met **Al toegepast** wordt geregistreerd, inclusief de migraties **Alleen data** binnen dat bereik. Migraties met **Ontbreekt** blijven openstaan en kunnen daarna gewoon worden uitgevoerd met **Openstaande migraties uitvoeren**.
- Een migratie met **Gedeeltelijk toegepast** kan niet worden geregistreerd. Als de migratie veilig opnieuw kan worden uitgevoerd (lees die eerst), vink dan **Opnieuw uitvoeren** aan. Dan blijft de migratie openstaan en wordt ze vanaf het begin opnieuw uitgevoerd.

Het Server Admin-paneel en de CLI (`yarn migrate:up`) gebruiken dezelfde Kysely-migrator en dezelfde tabel `kysely_migration`. Ze zijn dus altijd het eens over wat is toegepast. De bijbehorende eindpunten zijn `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` en `POST .../:module/baseline`. Ze zijn allemaal alleen voor Server.Admin.

## Gerelateerde pagina's

- [Authenticatie en machtigingen](/docs/developer/api/endpoints/authentication) — Machtigingsmodel en JWT-authenticatie
- [Membership-eindpunten](/docs/developer/api/endpoints/membership) — API voor beheer van gebruikers en kerken
- [Auditlogboek](/docs/b1-admin/reports/audit-log) — Activiteitenlogboeken van een kerk bekijken
- [Content Commons-architectuur](/docs/developer/architecture/commons) — Gedeeld assetmodel en levenscyclus van moderatie
