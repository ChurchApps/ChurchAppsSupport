---
title: "Mobile-appinstellingen"
description: "Configureer de navigatietabbladen, startschermtegels, aanmeldprompt en privacyinstellingen van de ledenlijst voor de B1.church-ledenapp in B1 Admin."
---

# Mobile-appinstellingen

<div class="article-intro">

Op de pagina Mobile-appinstellingen configureer je de navigatietabbladen die in de **B1.church-mobiele ervaring (PWA)** voor je gemeenteleden worden getoond. Je bepaalt welke tabbladen zichtbaar zijn, waarnaar ze linken en hoe ze worden weergegeven.

</div>

## Trainingsvideo

<YouTube id="ydY7WGK16fE" title="De ledenapp van je kerk aanpassen in B1" />

:::info
Tabbladen die hier zijn ingesteld, verschijnen in de B1 App, die leden kunnen [installeren als Progressive Web App (PWA)](../../b1-church/getting-started/installing-pwa.md). Deel de installatiepagina van je kerk — `https://yourchurchname.b1.church/mobile/install` — met je leden; daarop wordt stap voor stap uitgelegd hoe ze de app op hun apparaat installeren, zonder download via de App Store of Google Play.
:::

<div class="prereqs">
<h4>Voordat je begint</h4>

- Je hebt de rechten "Kerkinstellingen bewerken" nodig. Zie [Rollen en rechten](./roles-permissions.md) als je geen toegang hebt.
- Configureer eerst je [Kerkinstellingen](./church-settings.md), inclusief de naam van je kerk en de huisstijl

</div>

## Navigatie-instellingen openen

1. Open in B1 Admin het [Sprongmenu](../introduction.md#getting-around-with-the-jump-menu) (de zoekbalk linksboven) en klap **Mobile** uit.
2. Klik op **Navigatie** (`/mobile/navigation`).
3. De pagina Navigatie toont je huidige app-tabbladen.

## Een nieuw tabblad toevoegen

1. Klik bovenaan de pagina op de knop **Tabblad toevoegen**.
2. Vul de gegevens van het tabblad in:
   - **Naam** -- Het label dat op het tabblad verschijnt (bijvoorbeeld "Preken" of "Geven").
   - **Pictogram** -- Klik op de pictogramkiezer om een pictogram voor je tabblad te kiezen.
   - **Afbeelding** -- Klik op **Afbeelding selecteren** (of **Afbeelding wijzigen**) om het tabblad een foto te geven. Tabbladen met een foto verschijnen als fototegels op het startscherm van de app -- zie [Tegels op het startscherm](#home-screen-tiles).
   - **Tabbladtype** -- Kies uit opties zoals Bijbel, Livestream, Donatie, Website en meer.
   - **URL** -- Voer het webadres in waarnaar het tabblad moet linken.
   - **Zichtbaarheid** -- Bepaal wie dit tabblad kan zien (iedereen, alleen leden, enz.). Voor een tabblad **Ledenlijst** bepaalt dit alleen wie het tabblad zelf ziet; wie de ledenlijst kan openen, wordt ingesteld met **Tonen in ledenlijst** op de pagina Ledenportal (zie [Instellingen voor ledenlijst en berichten](#member-directory--messaging-settings)).
3. Klik op **Tabblad opslaan** om het aan je app toe te voegen.

## Een bestaand tabblad bewerken

1. Klik op een bestaand tabblad in de lijst **App-tabbladen**.
2. Pas de naam, het pictogram, de URL, het type of de zichtbaarheidsinstellingen van het tabblad aan.
3. Klik op **Tabblad opslaan** om je wijzigingen toe te passen.

## Tabbladen opnieuw rangschikken

Je kunt de volgorde wijzigen waarin tabbladen in de mobiele app verschijnen. Sleep tabbladen in de lijst om ze opnieuw te rangschikken. De volgorde op deze pagina komt overeen met de volgorde die je leden in de app zien.

:::info
Sommige tabbladen kunnen automatisch verschijnen wanneer aan bepaalde voorwaarden is voldaan -- een tabblad Livestream kan bijvoorbeeld verschijnen zodra er een stream actief is. Handmatig toegevoegde tabbladen geven je altijd volledige controle over wat je leden zien.
:::

:::tip
Houd het aantal tabbladen beperkt. Drie tot vijf tabbladen werken voor de meeste kerken goed. Te veel tabbladen kunnen de navigatie voor je leden onoverzichtelijk maken.
:::

## Instellingen voor ledenlijst en berichten

Het item **Ledenportal** in dezelfde sectie Mobile bevat de instellingen voor de ledenlijst en privéberichten in de B1.church-ervaring:

- **Goedkeuringsgroep ledenlijst** -- De groep die wijzigingen in de ledenlijst en [verzoeken tot accountverwijdering](../profile/account-deletion.md) controleert voordat ze ingaan.
- **Tonen in ledenlijst** -- Wie de ledenlijst kan openen en wie erin wordt opgenomen: **Alleen beheerders**, **Leden en hoger** (de standaard), **Regelmatige bezoekers en hoger** of **Bezoekers en hoger**. Personen wier lidmaatschapsstatus lager is dan het niveau dat je kiest, zien de ledenlijst niet en worden er niet in opgenomen. **Alleen beheerders** sluit de ledenlijst voor iedereen behalve medewerkers met het recht Personen > Bekijken (een lidmaatschapsstatus Medewerker alleen is niet voldoende). Zij kunnen de ledenlijst altijd openen en iedereen zien, ongeacht deze instelling. Gasten worden nooit opgenomen, omdat iedereen die zich online zelf registreert, begint als gast.
- **Zichtbaarheidsvoorkeur** -- Stelt de standaard voor de hele kerk in voor leden die nog geen eigen instelling hebben gekozen. **Adres**, **Telefoonnummer** en **E-mail** hebben elk een eigen keuzelijst, met dezelfde vijf niveaus die overal beschikbaar zijn waar zichtbaarheid wordt ingesteld:
  - **Iedereen** -- zichtbaar voor iedereen, inclusief anonieme bezoekers
  - **Leden** -- alleen zichtbaar voor personen met een record als Lid of Medewerker
  - **Alleen groepsgenoten** -- alleen zichtbaar voor personen die een groep delen met deze persoon, plus medewerkers
  - **Groepsleiders en medewerkers** -- alleen zichtbaar voor leiders van een groep waarvan deze persoon lid is, plus medewerkers
  - **Alleen medewerkers** -- alleen zichtbaar voor medewerkers (iedereen met de lidmaatschapsstatus Medewerker of met het recht Personen > Bekijken), en voor de persoon zelf

  "Medewerkers" betekent in deze niveaus: iedereen met de lidmaatschapsstatus Medewerker of met het recht Personen > Bekijken. Wijzigingen in groepen werken direct: iemand die een groep toevoegt, of tot groepsleider wordt benoemd, kan de bijbehorende gegevens van de leden van die groep zien die de niveaus **Alleen groepsgenoten** of **Groepsleiders en medewerkers** hebben, zonder uit- en opnieuw in te loggen.

  Leden kunnen deze standaarden voor hun eigen record overschrijven via het tabblad **Privacy** van hun profiel in de B1.church PWA -- zie [Je profiel bewerken](/docs/b1-church/getting-started/me-page).
- **Minimumleeftijd voor privéberichten** -- Een instelling ter bescherming van kinderen. B1 opent geen **nieuw** privégesprek wanneer een van de twee deelnemers jonger is dan deze leeftijd. Dit wordt bepaald op basis van de geboortedatum (als er geen geboortedatum bekend is, wordt de rol binnen het huishouden als terugvaloptie gebruikt). Personen die jonger zijn, blijven volledig zichtbaar in de ledenlijst -- alleen direct berichtenverkeer wordt geblokkeerd, in **beide richtingen**, voor iedereen, ook voor medewerkers. Groepsgesprekken en berichten naar de ouders van een kind werken nog steeds. De opties zijn Uit, 13, 16 of 18; de standaard is **18**. Bestaande gesprekken worden hierdoor niet beïnvloed.

:::tip
Omdat de controle op minimumleeftijd op geboortedata is gebaseerd, zorg je ervoor dat de geboortedata van kinderen in je gemeente zijn ingevuld. Deze instelling hoort bij dezelfde familie van beschermingsmaatregelen voor kinderen als de [veiligheidsinstellingen voor incheck](../attendance/checkin-safety.md).
:::

### Aanmeldprompt op het startscherm

Bezoekers die de [startpagina](/docs/b1-church/getting-started/navigating#home) van de app openen zonder in te loggen, zien een korte prompt -- standaard *"Meld je aan om je groepen, giften en meer te zien."* -- naast een knop **Aanmelden**. Met de instellingen **Aanmeldprompt op het startscherm** op dezelfde pagina Ledenportal (`/mobile/b1-mobile`) kun je deze tekst aanpassen:

- **Aanmeldprompt tonen op het startscherm van de app** -- Zet dit uit om zowel de prompt als de knop **Aanmelden** van het startscherm te verbergen. Bezoekers kunnen zich nog steeds aanmelden via het menu van de app.
- **Tekst van de aanmeldprompt** -- Vervang de standaardtekst door je eigen boodschap (maximaal 150 tekens). Laat het veld leeg om de standaardtekst te gebruiken. Dit veld is uitgeschakeld zolang de prompt uit staat.

Klik op **Opslaan** om de wijzigingen toe te passen. Een bericht **Opgeslagen** bevestigt de wijziging. Bij opslaan worden de in de cache opgeslagen instellingen van de app ververst, zodat de wijziging zichtbaar wordt de volgende keer dat het startscherm wordt geladen.

### Tegels op het startscherm

Tabbladen met een foto (zie **Afbeelding** onder [Een nieuw tabblad toevoegen](#adding-a-new-tab)) verschijnen op de [startpagina](/docs/b1-church/getting-started/navigating#home) van de app als fototegels, in een sectie met de naam van je kerk als kop. Dit geldt ook voor een tabblad Vers van de dag, als je het een foto geeft. Tabbladen met een foto verschijnen ook nog steeds in de tabbalk.

Met de instelling **Tegels op het startscherm** op dezelfde pagina Ledenportal (`/mobile/b1-mobile`) bepaal je hoe die tegels zijn opgemaakt. Kies een **Indeling**:

- **Raster** -- Twee tegels per rij (de standaard). Als het aantal tegels oneven is, neemt de eerste tegel de volledige breedte in.
- **Scrollende rij** -- Eén rij tegels die leden opzij kunnen vegen.
- **Scrollend (automatisch)** -- Dezelfde zijwaartse rij, maar die beweegt ook vanzelf: ongeveer elke vier seconden schuift hij één tegel verder, en na de laatste tegel begint hij weer bij de eerste. De beweging pauzeert zodra een lid de rij aanraakt, eroverheen beweegt of erin navigeert met de Tab-toets, en hervat enkele seconden later. Op apparaten waarop bewegingsvermindering is ingeschakeld, blijft de rij stilstaan en werkt hij als **Scrollende rij**.
- **Lijst** -- Een lijst met een kleine fotominiatuur naast de naam van elk tabblad.

Bij beide scrollende indelingen verschijnt, wanneer er meer tegels zijn dan er naast elkaar op het scherm passen, een rij stippen onder de tegels: één stip per tegel, waarbij de stip van de huidige tegel is opgevuld. Leden kunnen op een stip tikken om naar die tegel te springen.

Klik op **Opslaan** om de wijzigingen toe te passen.

### Secties op het startscherm

Aangemelde leden zien altijd hun eigen aanwezigheidsgeschiedenis en ingediende formulieren op de [Me-pagina](/docs/b1-church/getting-started/me-page). Met de schakelaars onder **Secties op het startscherm** op dezelfde pagina Ledenportal (`/mobile/b1-mobile`) kun je deze ook op het startscherm tonen:

- **Mijn aanwezigheid op startscherm tonen** -- Voegt een sectie **Mijn aanwezigheid** toe met het aantal keren dat het lid de afgelopen 90 dagen aanwezig was, de twee meest recente bezoeken en een link **Geschiedenis** naar de volledige aanwezigheidslijst.
- **Mijn formulieren op startscherm tonen** -- Voegt een sectie **Mijn formulieren** toe met de twee meest recente formulierinzendingen van het lid en een link **Alle formulieren**.

Beide staan standaard uit. Een sectie verschijnt alleen voor leden die zijn aangemeld en ten minste één record hebben om te tonen. Klik op **Opslaan** om de wijzigingen toe te passen.

## Waar deze tabbladen verschijnen

De tabbladen die je hier configureert, worden getoond in de **B1.church PWA** die je leden installeren vanaf elke pagina op `https://yourchurchname.b1.church`. Wijzigingen die je op deze pagina aanbrengt, zijn zichtbaar zodra een lid de app de volgende keer opent.

Op een telefoon toont de onderste tabbalk **Startpagina**, maximaal drie van je tabbladen en **Meer**; op een computer toont de koptekst maximaal vijf. Ingebouwde schermen (zoals Preken, Geven of Groepen) krijgen eerst hun plaats, en tabbladen van het type **Interne pagina** vullen eventuele overgebleven plaatsen. Tabbladen van het type **Externe URL** en **Vers van de dag** krijgen nooit een plaats in de balk. Elk tabblad, ook die welke niet passen, staat op de pagina **Meer** van de app.

Tabbladen die in een tabblad **Map** staan, vormen de uitzondering: ze verschijnen alleen op het eigen scherm van de map, dat leden openen door op de map te tikken. Op dat scherm worden de tabbladen als fototegels getoond als ze allemaal een afbeelding hebben, en anders als lijst. Een map die geen tabbladen bevat die een lid kan zien, is voor dat lid verborgen. Zie [Maptabbladen](../../b1-church/getting-started/navigating.md#folder-tabs). Zie [B1App navigeren](../../b1-church/getting-started/navigating.md) voor wat leden zien.

## Volgende stappen

- [Kerkinstellingen](./church-settings.md) -- Configureer de gegevens en huisstijl van je kerk
- [Rollen en rechten](./roles-permissions.md) -- Beheer de toegang voor je team
