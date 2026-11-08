---
title: "Kalenders aanmaken"
description: "Maak een kalender aan in B1 Admin, koppel groepen of importeer .ics-bestanden, en beheer de evenementen, aanmeldingen en notities vanaf één plek."
---

# Kalenders aanmaken

<div class="article-intro">

Met een kalender in B1 Admin maak je een samengestelde weergave van evenementen door een of meer groepen te koppelen. Evenementen worden binnen hun groepen beheerd door groepsleiders, en je kalender toont die evenementen op één plek. Beheerders met bewerkingsrechten kunnen evenementen toevoegen of bewerken voor elke groep. Groepsleiders zonder beheerdersrechten kunnen alleen evenementen beheren voor groepen die ze leiden.

</div>

## Instructievideo

<YouTube id="Ko3kgsCSLFs" title="Kalenders, evenementen en ruimtereserveringen aanmaken in B1" next="Evenementaanmeldingen en betaalde evenementen in B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Voordat je begint</h4>

- Stel de [groepen](../groups/creating-groups.md) in waarvan je de evenementen in je kalender wilt opnemen
- Je hebt beheerderstoegang nodig tot het gedeelte Kalenders in B1 Admin

</div>

## Een nieuwe kalender aanmaken

1. Open in B1 Admin het [Jump-menu](../introduction.md#getting-around-with-the-jump-menu) (de zoekbalk linksboven), klap **Kalenders** uit en klik op **Kalenders**.
2. Klik bovenaan de pagina op **Kalender toevoegen**. Het formulier voor een nieuwe kalender opent onder de kalenderlijst.
3. Voer een **naam** in voor je kalender (bijvoorbeeld "Jeugdwerk-evenementen" of "Hoofdkalender kerk").
4. Voeg optioneel een **beschrijving** toe, zodat je team begrijpt waarvoor deze kalender bedoeld is.
5. Klik op **Aanmaken** om je nieuwe kalender op te slaan.

## De detailpagina van de kalender

Nadat je een kalender hebt aangemaakt, klik je op **Evenementen beheren** in de rij van die kalender om de detailpagina te openen. Deze pagina heeft twee hoofdgedeelten:

- **Linkerkolom** -- De naam van de kalender met de bijbehorende acties (**Nieuw evenement**, **Bewerken**, **.ics importeren** en **Afdrukken**), gevolgd door de lijst **Groepen in kalender** met de groepen die in deze kalender zijn opgenomen. Klik naast een groep op **Verwijderen** om die uit de kalender te halen.
- **Hoofdgedeelte** -- De weergave **Kalenderevenementen** met evenementen uit gekoppelde groepen, met daarboven de knoppen **Abonneren** en **Groep toevoegen**.

## Groepen koppelen

Groepen die evenementen in de kalender hebben, verschijnen automatisch in de lijst **Groepen in kalender** aan de linkerkant van de detailpagina.

1. Klik boven de kalender op **Groep toevoegen** om een groep aan je kalender te koppelen.
2. Selecteer de groep in de keuzelijst. De lijst bevat alle groepen van je kerk, niet alleen de groepen waartoe jij behoort.
3. Kies of je **alle evenementen** van die groep wilt opnemen, of alleen **specifieke evenementen**.
4. Klik op **Opslaan**.

Elk evenement verschijnt maar één keer in de kalender. Als je een hele groep toevoegt, worden evenementen van die groep die je al eerder één voor één had toegevoegd, opgenomen in het groepsitem. Specifieke evenementen kiezen uit een groep die al in de kalender staat, voegt niets nieuws toe. Alleen groepen die als geheel zijn toegevoegd, worden vermeld onder **Groepen in kalender**.

### Een .ics-bestand importeren

Klik op **.ics importeren** om evenementen uit een andere agenda binnen te halen. Kies de **groep** waartoe de evenementen moeten behoren, klik vervolgens op **.ics-bestand kiezen** of plak de inhoud van het bestand, en klik op **Importeren**. De evenementen worden in die groep aangemaakt, en de groep wordt toegevoegd aan de kalender waaruit je importeert, zodat de evenementen daar meteen zichtbaar zijn.

### Een evenement uit de kalender verwijderen

Klik op een evenement in de kalender en klik vervolgens op **Uit kalender verwijderen**. Hiermee haal je het evenement alleen uit deze kalender -- het evenement zelf blijft in zijn groep bestaan. Als het evenement in de kalender staat omdat de hele groep is toegevoegd, haal je met deze actie alle evenementen van die groep uit deze kalender (de evenementen blijven wel in de groep). Wil je een evenement definitief verwijderen, verwijder het dan via de [agenda van de groep](../groups/group-calendar.md).

:::tip
Groepen aan je kalender koppelen is een krachtige manier om evenementen automatisch samen te voegen. Wanneer een groepsleider een evenement aan zijn [groep](../groups/creating-groups.md) toevoegt, kan het zonder extra werk van jou in je kerkbrede kalender verschijnen.
:::

:::info
Als je één kalender wilt maken die evenementen uit veel groepen in je kerk samenbrengt, zie dan [Samengestelde kalender](./curated-calendar.md) voor een gestroomlijnde aanpak.
:::

## Evenementen toevoegen en bewerken {#adding-and-editing-events}

Klik op de detailpagina van de kalender op **Nieuw evenement** om een evenement toe te voegen, of klik op een evenement in de kalender en vervolgens op **Bewerken** om het te wijzigen. Het formulier **Nieuw evenement** / **Evenement bewerken** heeft de volgende velden:

- **Groep** -- De groep waartoe het evenement behoort. Als je kerk sjablonen voor evenementen gebruikt, kun je ook een **sjabloon** kiezen om het formulier in te vullen.
- **Titel**
- **Foto van evenement** -- Klik op **Foto toevoegen** (of op het lege fotovak) om een afbeelding te kiezen of te uploaden. De afbeelding wordt bijgesneden naar een brede vorm van 16:9. Klik op **Foto wijzigen** om deze te vervangen. De foto wordt bovenaan de pagina van het evenement op je website getoond, en als tegel wanneer een Agenda-element **Aankomende evenementen** toont (zie [Evenementen op je website tonen](#showing-events-on-your-website)).
- **Beschrijving** -- Wordt getoond op de pagina van het evenement op je website. Vetgedrukte tekst, lijsten en links worden ondersteund.
- **Start** en **Einde**, **Herhaling** en **Zichtbaarheid** (**Openbaar** of **Privé**).
- **Tags** -- Labels gescheiden door komma's, zoals `jongeren, studenten`. Een Agenda-element op je website kan zo worden ingesteld dat alleen evenementen met een bepaalde tag worden getoond. Dit is hetzelfde veld **Tags** als in de aanmeldingsinstellingen van het evenement.
- **Wie notities kan bekijken** en **Wie notities kan plaatsen** -- Wie de notities van het evenement kan lezen en eraan kan toevoegen (zie [Notities bij evenementen](#event-notes)). Kies **Alleen medewerkers** (de standaard), **Groepsleiders** (leiders van de groep van het evenement) of **Groepsleden** (iedereen in de groep van het evenement, inclusief de leiders).
- **Ruimten** en **Middelen** -- Reserveer ruimte en apparatuur voor het evenement. Zie [Ruimten, middelen en planning](./rooms-resources.md).

Klik op **Opslaan**. Als het evenement zich herhaalt, vraagt B1 om bevestiging, omdat het opslaan alle afleveringen in de reeks bijwerkt.

### Notities bij evenementen {#event-notes}

Elk evenement heeft zijn eigen notitiethread voor planning en opvolging. Klik op de detailpagina van de kalender op een evenement; het dialoogvenster toont de details van het evenement, de herinneringen en daaronder de **Notities**. Typ een notitie en plaats die om deze aan de thread toe te voegen.

Medewerkers met toestemming om inhoud te bewerken of kalenders te beheren, kunnen altijd notities bij evenementen lezen en plaatsen. Met de instellingen **Wie notities kan bekijken** en **Wie notities kan plaatsen** bepaal je of de groepsleiders of groepsleden van het evenement dat ook kunnen.

### Evenementen op je website tonen {#showing-events-on-your-website}

Om een kalender op je website te tonen, voeg je een **Agenda**-element toe aan een pagina en kies je deze kalender. Het element kan een maandkalender tonen of een raster met tegels van aankomende evenementen, en kan worden beperkt tot evenementen met één tag. Bezoekers die op een evenement klikken, openen de eigen pagina van dat evenement. Zie [Het Agenda-element gebruiken](../website/page-editor.md#using-the-calendar-element).

## Evenementaanmeldingen inschakelen {#enabling-event-registration}

Je kunt aanmelding inschakelen voor elk evenement in de kalender, zodat leden zich kunnen aanmelden via de B1-website of de mobiele app.

1. Klik op een bestaand evenement of maak een nieuw evenement aan.
2. Zet in de evenementeneditor de schakelaar **Aanmelding** aan.
3. Configureer de aanmeldingsinstellingen:
   - **Capaciteit** (optioneel) -- Stel een maximum aantal aanmeldingen in. Laat leeg voor onbeperkt.
   - **Aanmelding opent** -- De datum en tijd waarop aanmelden mogelijk wordt.
   - **Aanmelding sluit** -- De datum en tijd waarop aanmelden sluit.
   - **Tags** -- Labels gescheiden door komma's (bijvoorbeeld "jongeren, retreat, vbs") om evenementen waarvoor aangemeld kan worden te categoriseren.
   - **Aanmeldingsvragen** -- Koppel desgewenst een [formulier](../forms/creating-forms.md) zodat deelnemers bij het aanmelden extra vragen beantwoorden (dieetwensen, T-shirtmaat, noodcontact, enzovoort). Kies **Geen** om vragen over te slaan.
   - **Wachtlijst inschakelen** -- Wanneer het evenement vol is, kunnen extra deelnemers zich op een wachtlijst zetten in plaats van te worden geweigerd. Zie [Betaalde aanmeldingen](./paid-registrations.md#waitlist).
4. Sla het evenement op.

Voor betaalde evenementen kun je op dezelfde instellingenpagina geprijsde **deelnemerstypen**, optionele **keuzes** (extra's) en **kortingscodes** instellen. Betalingen lopen via de gevensprovider van je kerk. Zie [Betaalde aanmeldingen](./paid-registrations.md) voor de volledige uitleg.

Zodra aanmelden is ingeschakeld, zien leden de knop **Aanmelden voor dit evenement** wanneer ze het evenement bekijken op [B1.church of in de B1 App](../../b1-church/events/registering.md). Als je een formulier hebt gekoppeld, zien deelnemers tijdens het aanmelden een stap **Vragen** en worden hun antwoorden bij hun aanmelding opgeslagen.

:::info
Aanmeldingsvragen werken alleen met formulieren die **niet** als beperkt zijn gemarkeerd. Een beperkt formulier wordt tijdens het aanmelden automatisch overgeslagen in plaats van getoond. Gebruik daarom een onbeperkt formulier wanneer je vragen aan een evenement koppelt.
:::

### Aanmeldingen beheren

Zo bekijk en beheer je de aanmeldingen voor je evenementen:

1. Kies in het Jump-menu **Kalenders > Aanmeldingen**.
2. Je ziet een tabel met alle evenementen waarvoor aanmelden is ingeschakeld, met de titel van het evenement, de datum, het huidige aantal aanmeldingen tegenover de capaciteit, en de tags.
3. Klik op een evenement om de volledige lijst met aanmeldingen te zien, inclusief namen, aantal leden, deelnemerstypen, betaalstatus en datum van aanmelding.
4. Op de detailpagina kun je:
   - **Deelnemer toevoegen** -- Iemand handmatig aanmelden die offline of telefonisch is aangemeld.
   - Afzonderlijke aanmeldingen **annuleren**
   - Aanmeldingen definitief **verwijderen**
   - Aanmeldingen van de wachtlijst **promoveren** wanneer er een plek vrijkomt
   - **CSV exporteren** -- Download alle aanmeldingen, inclusief deelnemerstypen, keuzes, betaalbedragen en antwoorden op vragen

Als het evenement aanmeldingsvragen heeft, toont de detailpagina ook het filter **Alleen onbeantwoorde vragen** om snel deelnemers te vinden die nog geen antwoorden hebben ingestuurd, en een knop **Antwoorden bekijken** bij elke beantwoorde aanmelding om hun antwoorden te zien. Betaalde evenementen voegen een kolom **Type**, een kolom **Betaald / Totaal**, aantallen per type en een dialoogvenster met betalingsdetails toe. Zie [Betaalde aanmeldingen](./paid-registrations.md#the-registration-roster).

:::tip
Gebruik de voortgangsbalk van de capaciteit om te volgen hoe snel evenementen vollopen. De balk wordt rood wanneer een evenement de capaciteit heeft bereikt of overschreden.
:::

## Volgende stappen

- [Samengestelde kalender](./curated-calendar.md) -- Een kalender maken die evenementen uit meerdere groepen haalt
- [Betaalde aanmeldingen](./paid-registrations.md) -- Deelnemerstypen, extra keuzes, kortingscodes, betalingen en wachtlijsten
- [Handleiding evenementaanmeldingen](../guides/event-registration.md) -- Stapsgewijze handleiding voor het instellen van evenementaanmeldingen
- [Overzicht kalenders](./index.md) -- Terug naar het overzicht van kalenders
