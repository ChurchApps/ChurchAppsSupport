---
title: "De kalender plannen"
---

# De kalender plannen

<div class="article-intro">

De pagina **Kalender** in FreePlay Admin bepaalt wat elke schermgroep afspeelt en wanneer. Voeg een planning toe voor een afspeellijst, een dienstplan of een providermap, en stel in of die wekelijks herhaald wordt of eenmalig speelt. Als er niets gepland is, speelt de standaardlus van de groep.

</div>

<div class="prereqs">
<h4>Voordat je begint</h4>

- Maak minstens één schermgroep aan. Zie [Schermen en groepen beheren](./managing-screens#screen-groups)
- [Bouw een afspeellijst](./building-playlists), of zorg dat er in B1 Admin een plantype is ingesteld

</div>

## De kalender lezen

1. Ga naar **Kalender**.
2. Kies een schermgroep uit de tabbladen bovenaan. Elk tabblad toont hoeveel planningen de groep heeft.
3. De weekweergave loopt van maandag tot en met zondag, van 06:00 tot 22:00 uur. Een rode lijn geeft de huidige tijd aan.
4. Gebruik de pijltjes om naar de vorige of volgende week te gaan, of klik op **Vandaag** om terug te keren naar deze week.

De ondertitel van de pagina toont de tijdzone die voor de kalender wordt gebruikt. Planningen volgen de tijdzone van je kerk, die je in B1 Admin instelt onder [Kerkgegevens](../../b1-admin/settings/church-settings.md#time-zone). Als je kerk geen tijdzone heeft, gebruikt FreePlay de tijdzone van je campus. De kalender en je tv's gebruiken dezelfde tijdzone. Een blok dat je om 9:00 uur in de kalender plaatst, speelt dus om 9:00 uur af op het scherm, ook als je computer op een andere tijdzone staat ingesteld.

Planningen zijn per type kleurgecodeerd. Een legenda legt de kleuren uit:

- **Standaardlus** - Gearceerde achtergrond, achter alles getoond wanneer de groep een standaardlus heeft
- **Afspeellijst**
- **Dienstplan**
- **Providermap**

Elk blok toont zijn naam. Hogere blokken tonen ook de tijden, of het zich herhaalt (**wekelijks** of **eenmalig**), en wat er gebeurt als het eerder eindigt.

## De standaardlus instellen

De standaardlus speelt op de schermen van de groep wanneer er niets gepland is.

1. Klik op de pagina **Kalender** in de koptekst op **Standaardlus…**. Als er al een standaardlus is ingesteld, toont de knop **Standaardlus:** gevolgd door de naam van de afspeellijst.
2. Kies een **Afspeellijst**, of kies **Geen — scherm wordt donker**.
3. Klik op **Opslaan**.

## Een planning toevoegen

Er zijn drie manieren om een nieuwe planning te starten:

- Klik op een lege plek in de kalender. Het formulier opent met die dag en dat halfuur al ingevuld.
- Klik in de koptekst op **Planning toevoegen**.
- Kies **Planning toevoegen** in het opdrachtenpaneel (**Ctrl+K** of **⌘K**).

Vul daarna het formulier in:

1. **Afspelen** - Kies wat er speelt:
   - **Afspeellijsten** - Elke afspeellijst die je hebt gemaakt
   - **Dienstplannen** - Een plantype uit B1 Admin, gemarkeerd met **(huidig plan)**. Het scherm speelt elke week het huidige plan voor dat plantype af, inclusief Go Curriculum-lessen (ook aangepaste), die de Go-login gebruiken die aan het ministerie van het plantype is gekoppeld
   - **Providermap…** - Opent **Kies een providermap**. Blader naar een map en klik op **Deze map gebruiken**. Om later een andere map te kiezen, klik je op **Wijzigen**
2. **Herhalen** - Selecteer de dagen van de week waarop deze planning speelt. Voor één specifieke datum zet je **Eenmalig** aan en kies je de **Datum**.
3. **Start** en **Einde** - De tijden waarop de planning begint en stopt.
4. **Als het eerder klaar is** - Wat er moet gebeuren wanneer de inhoud opraakt voordat de eindtijd is bereikt:
   - **Herhalen tot de eindtijd** - Begint opnieuw vanaf het begin. Geschikt voor signagelussen, aankondigingen en aftellingen
   - **Op tempo van de leraar** - Dia's wachten op de afstandsbediening van de leraar. De les blijft na de eindtijd staan tot de laatste dia
   - **Eén keer afspelen, daarna terug naar de standaardlus**
5. Stel bij herhalende planningen **Begint op** in op de eerste datum. Kies onder **Eindigt** de optie **Nooit**, of kies **Op datum** en vul een **Einddatum** in.
6. Klik op **Opslaan**.

:::info
**Op tempo van de leraar** heeft de oudere optie "laatste dia vasthouden" vervangen. Planningen die met die optie zijn opgeslagen, spelen nu af als op tempo van de leraar.
:::

## Een planning bewerken of verwijderen

1. Klik op het blok van de planning in de kalender.
2. Wijzig een veld en klik op **Opslaan**, of klik op **Verwijderen** om de planning te verwijderen.

## Overlappende planningen

Als twee planningen elkaar overlappen, toont het formulier een waarschuwing: **Overlapt een andere planning. De planning die later begint, wint.** Terwijl de latere planning loopt, spelen de schermen die af. Wanneer die eindigt, keren ze terug naar de eerdere planning als die nog loopt.

## Hoe schermen wijzigingen oppikken

Gekoppelde schermen downloaden alles wat voor de komende 7 dagen is gepland, en ze controleren zelf op wijzigingen. Je hoeft de tv niet aan te raken nadat je de kalender hebt bewerkt. Om te zien wanneer een scherm alles heeft wat het nodig heeft, bekijk je **Gereed tot en met** op de [pagina Schermen](./managing-screens).

## Gerelateerde artikelen

- **[Afspeellijsten bouwen](./building-playlists)** - Maak de afspeellijsten die je plant
- **[Gepland afspelen op de tv](./scheduled-playback)** - Hoe lessen op tempo van de leraar en de afstandsbediening op de tv werken
- **[Schermen en groepen beheren](./managing-screens)** - Groepen toevoegen en de downloads van elk scherm controleren
- **[Alleen een deel van elke les behouden](/docs/b1-admin/serving/scheduling-lessons#keeping-only-part-of-every-lesson)** - Beperk elke geplande les in een plantype tot de onderdelen die je ruimte afspeelt
