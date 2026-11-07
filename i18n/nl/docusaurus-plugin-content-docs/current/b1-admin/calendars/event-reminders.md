---
title: "Evenementherinneringen"
---

# Evenementherinneringen

<div class="article-intro">

Evenementherinneringen informeren automatisch de juiste mensen voordat een evenement plaatsvindt -- bijvoorbeeld: "Niet vergeten! De workshop gezondheidszorg begint morgen om 9:00 uur." Je stelt een herinnering één keer in bij het evenement, en B1 verstuurt die op het geplande moment via pushmeldingen, e-mail en, als je kerk sms'en heeft ingesteld, tekstberichten. Leden kunnen zelf bepalen welke herinneringen ze ontvangen via hun [Meldingsvoorkeuren](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Voordat je begint</h4>

- Maak het evenement aan waarvoor je mensen wilt herinneren (zie [Kalenders maken](creating-calendars))
- Om geregistreerde deelnemers te bereiken, [schakel registratie in](creating-calendars) voor het evenement
- Om een hele groep te bereiken, zorg dat het evenement bij een [groep](../groups/creating-groups) met leden hoort

</div>

## Een herinnering instellen

Je stelt herinneringen in via het gedeelte **Herinneringen** van het evenement.

- Wanneer je een **nieuw evenement maakt**, vouw je het gedeelte **Herinneringen** in de evenementeditor open voordat je opslaat.
- Voor een **bestaand evenement** open je de pagina **Registratiedetails** van het evenement (via het gedeelte **Registraties**) om een herinnering toe te voegen of te wijzigen.

1. Zet **Herinneringen inschakelen** aan.
2. Kies **Wanneer** er moet worden verzonden. Kies maximaal drie momenten: **7 dagen van tevoren**, **3 dagen van tevoren**, **1 dag van tevoren** en **Op de dag zelf**.
3. Stel het **Tijdstip** in waarop de herinnering moet worden verzonden (standaard **9:00 uur**, in de [tijdzone](../settings/church-settings.md#time-zone) van je kerk).
4. Kies **Wie** er herinnerd moet worden (zie [Wie krijgt een herinnering](#who-gets-reminded) hieronder).
5. Voeg optioneel een **Bericht** toe. Laat het leeg om de standaardtekst te gebruiken, of schrijf je eigen tekst -- je kunt `{{eventTitle}}` opnemen, dat wordt vervangen door de naam van het evenement.
6. Kies de **Kanalen**: **Pushmelding**, **E-mail** en, als je kerk een [sms-provider](../settings/church-settings.md#texting) heeft gekoppeld, **Tekstbericht**.
7. Sla het evenement op.

Terwijl je wijzigingen aanbrengt, toont een **live voorbeeld** ongeveer hoeveel mensen een herinnering krijgen, hoeveel deelnemers niet bereikt kunnen worden en wanneer de volgende verzendingen gepland staan -- zodat je kunt controleren of de herinnering klopt voordat je opslaat.

## Wie krijgt een herinnering

De instelling **Wie** bepaalt naar wie de herinnering gaat:

- **Alleen geregistreerden** -- Iedereen die voor het evenement is geregistreerd en gekoppeld is aan een persoonsrecord. Dit is de standaard wanneer registratie voor het evenement is ingeschakeld, zodat een herinnering voor een klein geregistreerd evenement nooit per ongeluk naar een hele groep gaat.
- **Gezinshoofden / alleen geregistreerden** -- Eén herinnering per registratie (de persoon die zich heeft geregistreerd), in plaats van één voor elk gezinslid op de registratie.
- **Groepsleden** -- Iedereen in de groep van het evenement. Dit is de standaard wanneer het evenement geen registratie gebruikt.
- **Automatisch** -- Gebruikt geregistreerden wanneer registratie is ingeschakeld, anders de groep.

:::info
Gasten die alleen met naam zijn toegevoegd (zonder gekoppeld persoonsrecord) kunnen geen herinnering ontvangen, omdat er geen account, apparaat of e-mailadres is om naartoe te sturen. Het voorbeeld laat zien hoeveel deelnemers in deze groep vallen, zodat er geen verrassingen zijn. Leden die zich hebben afgemeld voor communicatie worden ook overgeslagen.
:::

## Wanneer herinneringen worden verzonden

- Herinneringen worden verzonden op het **tijdstip dat je kiest**, in de lokale tijdzone van je kerk, op elk van de gekozen momenten.
- Als je de **datum of tijd van het evenement wijzigt**, worden de openstaande herinneringen automatisch opnieuw ingepland -- je hoeft de herinnering niet zelf aan te passen.
- Als je het **evenement verwijdert** (of één afspraak van een terugkerend evenement annuleert), worden de openstaande herinneringen automatisch geannuleerd.
- Terugkerende evenementen worden automatisch afgehandeld: elke komende afspraak krijgt een eigen herinnering.

:::tip
Herinneringen worden **eerst als pushmelding verzonden, met e-mail als reserve**. Als een lid pushmeldingen heeft ingeschakeld, krijgt het een pushmelding; zo niet, dan krijgt het in plaats daarvan een e-mail. Leden kiezen per soort melding welke kanalen ze willen in hun [Meldingsvoorkeuren](../../b1-church/getting-started/notification-preferences).
:::

## Tekstherinneringen

Het kanaal **Tekstbericht** verschijnt alleen wanneer je kerk een sms-provider heeft gekoppeld. Tekstberichten worden verzonden via de sms-provider van je kerk, en elk tekstbericht kan je kerk geld kosten. Ze worden verzonden naast eventuele push- of e-mailherinneringen, en alleen naar mensen die:

- **Tekstberichten** hebben ingeschakeld in hun [Meldingsvoorkeuren](../../b1-church/getting-started/notification-preferences), en
- een mobiel nummer op hun profiel hebben staan.

Elk tekstbericht begint met de naam van je kerk, blijft beperkt tot één sms en eindigt met "Antwoord STOP om je af te melden." Wie STOP antwoordt, ontvangt geen tekstberichten meer van je kerk. Om STOP-antwoorden bij B1 te laten aankomen, plak je de **URL van de inkomende (STOP) webhook** uit je [sms-instellingen](../settings/church-settings.md#texting) in de webhook voor inkomende berichten van je provider.

## Wat leden kunnen regelen

Herinneringen houden altijd rekening met de [Meldingsvoorkeuren](../../b1-church/getting-started/notification-preferences) van elk lid. Een lid kan:

- **Evenementherinneringen** uitschakelen voor push, e-mail of tekstbericht, terwijl andere meldingen aan blijven.
- Tekstherinneringen aan- of uitzetten met **Tekstberichten**.
- **Stille uren** instellen, zodat niet-dringende meldingen tot een redelijk tijdstip wachten.

Je kunt de keuze van een lid om zich af te melden voor evenementherinneringen niet overschrijven -- zo blijft B1 conform de anti-spamregels en houden leden de controle over hun inbox.

## Dienstherinneringen

Vrijwilligers die op een plan zijn ingeroosterd, ontvangen een aparte **dienstherinnering** met de details van het plan en, als ze nog niet hebben gereageerd, knoppen **Accepteren / Afwijzen** direct in de e-mail. Deze herinneringen worden ingesteld op het plantype en niet op een agenda-evenement, en kunnen ook per tekstbericht worden verzonden. Zie [Vrijwilligersherinneringen](../serving/plans#volunteer-reminders) en [Zondagsvrijwilligers](../guides/sunday-volunteers) voor hoe vrijwilligersplanning en herinneringen werken.

## Volgende stappen

- [Meldingsvoorkeuren](../../b1-church/getting-started/notification-preferences) -- Wat leden kunnen regelen
- [Gids voor evenementregistratie](../guides/event-registration) -- Registratie instellen zodat herinneringen deelnemers kunnen bereiken
- [Kalenders maken](creating-calendars) -- Terug naar het instellen van de agenda
