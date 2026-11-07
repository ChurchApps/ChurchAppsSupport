---
title: "Geplande modus"
description: "Laat FreePlay-tv's playlists volgens agenda afspelen via FreePlay Admin. Schermen starten en stoppen zelf en blijven spelen bij wifi-storingen."
---

# Geplande modus

<div class="article-intro">

Met de geplande modus draait een FreePlay-tv zelfstandig. Je maakt afspeellijsten en plant ze in een agenda in **FreePlay Admin** op [admin.freeplay.church](https://admin.freeplay.church). Elke tv die aan die agenda is gekoppeld, downloadt de komende week en speelt af wat is ingepland, op het ingestelde tijdstip, zonder dat iemand op Start hoeft te drukken. Omdat de bestanden al zijn gedownload, blijft het afspelen doorgaan, zelfs als de wifi wegvalt.

</div>

:::tip
FreePlay Admin gebruikt je ChurchApps-inloggegevens, dezelfde die je voor B1 Admin gebruikt. Je hoeft geen apart account aan te maken.
:::

## Hoe het in elkaar zit

FreePlay Admin heeft vier hoofdpagina's, die bovenaan de site worden weergegeven:

- **[Schermen](./managing-screens.md)** - De tv's die je hebt gekoppeld, hun status en de **schermgroepen** waartoe ze behoren. Schermen in een groep delen één agenda en één standaardlus
- **[Afspeellijsten](./building-playlists.md)** - Lussen van afbeeldingen en video's die je kiest uit je contentproviders
- **[Agenda](./scheduling-the-calendar.md)** - Wat elke schermgroep afspeelt, en wanneer
- **[Providers](./building-playlists.md#connecting-providers)** - De contentbronnen waaruit je afspeellijsten putten. Je koppelt elke bron één keer voor de hele kerk

Als er niets is ingepland, speelt een schermgroep zijn **standaardlus** af. Als de groep geen standaardlus heeft, worden de schermen zwart.

## Het verschil met de planmodus

- **[Planmodus](../plan-mode/index.md)** volgt één dienstplantype uit B1 Admin. Iemand drukt op **Start plan** op de tv, en de les wordt afgespeeld zodra dat gebeurt
- **De geplande modus** volgt een agenda. Inhoud begint en stopt op de tijden die je instelt, wat goed werkt voor lobbyborden, aankondigingslussen en klaslokalen waar de les al moet staan voordat iemand binnenkomt

Een agenda-item kan nog steeds een dienstplan afspelen. Kies het plantype onder **Dienstplannen** wanneer je een planning toevoegt, en het scherm speelt het plan af dat in B1 Admin die week actueel is. Dit geldt ook voor Go Curriculum-lessen, zelfs als je ze in het plan hebt aangepast. Het scherm gebruikt de Go Curriculum-inlog die aan het ministerie van het plantype in B1 Admin is gekoppeld, of de Go Curriculum-verbinding van de kerk als het ministerie er geen heeft.

## Aan de slag

Totdat je elk van deze stappen hebt gedaan, toont de pagina **Schermen** een checklist **Aan de slag** met een link voor elke stap:

1. **Koppel een provider** - Koppel Dropbox, OneDrive, Lessons.church of een andere bron op de pagina **Providers**
2. **Maak een afspeellijst** - Kies afbeeldingen en video's uit een provider
3. **Zet het in de agenda** - Kies wat wanneer wordt afgespeeld, of stel een standaardlus in voor de groep
4. **Koppel een scherm** - Voer de code van vier letters in die op de tv wordt getoond

Klik op **Verbergen** om de checklist te sluiten.

:::tip
Druk op **Ctrl+K** (**⌘K** op een Mac), of klik op het zoekveld in de koptekst, om het opdrachtenpalet te openen. Vanaf daar kun je naar elke pagina springen of een actie starten, zoals **Scherm koppelen**, **Afspeellijst toevoegen** of **Planning toevoegen**.
:::

## In deze sectie

- **[Een scherm koppelen](./pairing-a-screen.md)** - Toon de code op de tv en koppel die in FreePlay Admin
- **[Schermen en groepen beheren](./managing-screens.md)** - Controleer status en downloads, en orden schermen in groepen
- **[Providers koppelen en afspeellijsten maken](./building-playlists.md)** - Koppel contentbronnen en maak lussen van afbeeldingen en video's
- **[De agenda plannen](./scheduling-the-calendar.md)** - Bepaal wat wanneer wordt afgespeeld, en wat er gebeurt als iets eerder eindigt
- **[Gepland afspelen op de tv](./scheduled-playback.md)** - Wat de tv zelfstandig doet, en hoe je de afstandsbediening gebruikt tijdens het afspelen
