---
title: "Check-in afronden"
description: "Rond de kioskcheck-in van een gezin af in B1 Checkin, met informatie over zaalcapaciteit, labelafdruk, beveiligingscodes voor ophalen en wat de app daarna doet."
---

# Check-in afronden

<div class="article-intro">

Zodra je het huishouden hebt nagekeken en eventuele groepstoewijzingen hebt gedaan, ben je klaar om de check-in af te ronden. Dit is de laatste stap in de kioskworkflow -- de app verstuurt de aanwezigheid, drukt labels af en maakt zich klaar voor het volgende gezin.

</div>

<div class="prereqs">
<h4>Voordat je begint</h4>

- [Controleer je huishouden](./household-review.md) op het scherm voor huishoudcontrole
- [Wijs groepen toe](./group-assignment.md) aan gezinsleden die moeten inchecken voor een specifieke klas of programma
- Voeg eventueel [gasten toe](./adding-guests.md) die met je gezin meekomen

</div>

## Inchecken

1. Tik op het scherm voor huishoudcontrole op de knop **Check-in** onderaan het scherm.
2. De app stuurt de aanwezigheidsgegevens naar de server en toont een **successcherm** met een groen vinkje en een welkomstbericht.

Meer is er niet voor nodig. De aanwezigheid van je gezin is geregistreerd.

Als iemand die je hebt geselecteerd vandaag al voor deze dienst is ingecheckt, verschijnt eerst een venster **Al ingecheckt** met hun namen. Tik op **Opnieuw inchecken** om hun nieuwe groepskeuzes op te slaan, of op **Annuleren** om terug te gaan naar het huishoudscherm.

## Volle zalen en vrijwilligersratio's

Als je kerk [veiligheidslimieten](../../b1-admin/attendance/checkin-safety.md) heeft ingesteld voor zalen, controleert de server die voordat er wordt opgeslagen:

- Als een geselecteerde zaal **vol of gesloten** is, gaat de check-in niet door en noemt de app de zaal, zodat je een andere kunt kiezen.
- Als het dienstmoment een [check-inschema](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule) heeft en het check-invenster op dit moment niet open is, wordt inchecken in de zalen van dat dienstmoment ook geweigerd. Het scherm **Kan nog niet inchecken** toont de zaal met de reden "inchecken is nu niet open". Tik op **Zalen wijzigen** om een ander dienstmoment of een andere groep te kiezen. (Dienstmomenten die al gesloten zijn, worden op het [huishoudscherm](./household-review.md) als **Gesloten** weergegeven en kunnen niet worden gekozen. Je ziet dit dus meestal alleen als een venster sluit terwijl een check-in bezig is.)
- Een huishouden dat eerder voor een dienstmoment is ingecheckt, kan later terugkomen en een open dienstmoment toevoegen, zelfs nadat het eerdere venster is gesloten. Hun bestaande check-ins blijven behouden en zorgen er niet voor dat de nieuwe check-in wordt geweigerd.
- Als een kinderzaal **te weinig vrijwilligers** heeft voor de ratio, toont de app ofwel een waarschuwing die een medewerker kan bevestigen om door te gaan, ofwel blokkeert ze de check-in volledig. Wat er gebeurt, hangt af van hoe je kerk het handhaven van de ratio heeft ingesteld.

## Labelafdruk

Als een netwerkprinter is ingesteld, drukt de app na de check-in automatisch labels af:

- **Naamlabels** worden afgedrukt voor elke persoon die is toegewezen aan een groep waarvoor de instelling **Naamlabel afdrukken** is ingeschakeld. Naamlabels bevatten de naam van de persoon, de groepstoewijzing en eventuele allergie- of opmerkingeninformatie die is vastgelegd.
- **Ophaalbriefjes voor ouders** worden afgedrukt wanneer een ingecheckte persoon in een groep zit waarvoor de instelling **Ophalen door ouders** is ingeschakeld. Personen die als **Vrijwilliger** zijn ingecheckt, worden overgeslagen. Een kinderoppasser die dient in een zaal met Ophalen door ouders krijgt dus geen ophaalbriefje. Het ophaalbriefje vermeldt de kinderen, hun groepstoewijzingen en een unieke **beveiligingscode van 4 tekens**.

:::info
Dezelfde beveiligingscode staat op het naamlabel van het kind en op het ophaalbriefje van de ouder. Bij het ophalen vergelijken vrijwilligers de codes om te controleren of de juiste volwassene elk kind ophaalt.
:::

De beveiligingscode wordt bij elke check-in opnieuw gegenereerd en bevat alleen medeklinkers en cijfers. Klinkers zijn uitgesloten om te voorkomen dat er ongepaste woorden ontstaan.

:::warning
Als de labels niet worden afgedrukt, open dan de beheerinstellingen door zeven keer op het **kerklogo** te tikken. Tik vervolgens op **Printer wijzigen** om de printerverbinding te controleren. Zie [Printerinstallatie](../getting-started/printer-setup.md) voor stappen bij het oplossen van problemen.
:::

## Wat er na de check-in gebeurt

- Als er een printer is ingesteld, drukt de app alle labels af en keert daarna automatisch terug naar het **zoekscherm**, klaar voor het volgende gezin.
- Als er geen printer is ingesteld, keert de app eveneens automatisch terug naar het **zoekscherm**.

In beide gevallen blijft het successcherm minstens 6 seconden staan vanaf het moment dat het verschijnt (8 seconden wanneer het de mijlpaal van iemands aanwezigheid viert), zodat gezinnen kunnen zien dat de check-in is gelukt. Als afdrukken langer duurt, keert de app ongeveer anderhalve seconde na het afdrukken terug.

Je hoeft niets aan te tikken om terug te gaan naar het zoekscherm; de app regelt de overgang automatisch. Zodra het scherm even zichtbaar is geweest, kun je erop tikken om meteen terug te gaan. Een tik in de eerste anderhalve seconde wordt genegeerd, zodat een snelle dubbeltik op **Check-in** het scherm niet overslaat.

:::tip
De app wordt na elke check-in volledig gereset, dus er bestaat geen risico dat het ene gezin de gegevens van een ander gezin ziet.
:::

## Wat er wordt vastgelegd

Wanneer je op **Check-in** tikt, stuurt de app het volgende naar de server voor elk huishoudlid met een groepstoewijzing:

- De **persoon** die wordt ingecheckt
- De **dienst** die die persoon bezoekt
- Het **dienstmoment** en de **groep** waaraan die persoon is toegewezen

Deze gegevens verschijnen in B1 Admin onder de sectie Aanwezigheid, waar beheerders van je kerk aanwezigheidsregistraties kunnen bekijken en beheren. Zie de [handleiding voor check-inbeheer](../../b1-admin/attendance/check-in.md) voor meer details.
