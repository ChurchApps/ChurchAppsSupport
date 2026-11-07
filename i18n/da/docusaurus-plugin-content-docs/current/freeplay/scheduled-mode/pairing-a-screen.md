---
title: "Parring af en skærm"
description: "Par et FreePlay-tv med en skærmgruppes kalender i FreePlay Admin ved hjælp af firebogstavskoden på tv'et, så det selv afspiller planlagt indhold."
---

# Parring af en skærm

<div class="article-intro">

Hvis du vil knytte en tv til en kalender, parrer du det med **FreePlay Admin**. Tv'et viser en firebogstavskode. Du indtaster koden på [admin.freeplay.church](https://admin.freeplay.church) og vælger den skærmgruppe, hvis kalender tv'et skal følge. Dette gør du kun én gang pr. tv.

</div>

<div class="prereqs">
<h4>Inden du begynder</h4>

- Installer og start FreePlay på tv'et. Se [Kom i gang](../getting-started/index.md)
- Hav et ChurchApps-login til din kirke, så du kan logge ind på FreePlay Admin
- Valgfrit: [Opret en afspilningsliste](./building-playlists.md) og [planlæg den](./scheduling-the-calendar.md) først, så tv'et har noget at afspille med det samme

</div>

## Vis koden på tv'et

1. Åbn **Indstillinger** nederst i sidepanelet på tv'et.
2. Vælg **Par til en kalender**. Rækken viser **Ikke parret**, når tv'et endnu ikke er parret.
3. Skærmen **Par denne skærm** viser en QR-kode og en firebogstavs parringskode med teksten **Scan med din telefon, eller gå til freeplay.church/pair og indtast denne kode**.
4. Under koden blinker **Venter på bekræftelse**, mens FreePlay venter på, at du afslutter parringen.

Koden er gyldig i 15 minutter, og en nedtælling under den viser, hvor lang tid der er tilbage. Når tiden er udløbet, viser FreePlay automatisk en ny kode. Du kan også vælge **Generer ny kode** for at få en frisk kode, eller **Annuller** for at vende tilbage til Indstillinger.

## Parring i FreePlay Admin

1. Scan QR-koden med din telefon, eller gå til **freeplay.church/pair** på en hvilken som helst computer eller telefon. Log ind, hvis du bliver bedt om det. FreePlay Admin åbner formularen **Par skærm** med koden allerede udfyldt.
   - Du kan også selv åbne formularen. Gå til **Skærme** i FreePlay Admin og klik på **Par skærm**.
2. Kontroller **Parringskoden**. Det er de fire bogstaver på tv'et.
3. Indtast et **Navn** (Label), så du kan skelne dette tv fra de andre, for eksempel "Foyer venstre". Dette er valgfrit.
4. Under **Gruppe** vælger du den skærmgruppe, hvis kalender dette tv skal følge. For at oprette en ny vælger du **＋ Ny gruppe…** og indtaster et **Nyt gruppenavn**.
5. Under **Tilstand** lader du **Planlagt** være valgt. Tv'et afspiller så efter gruppens kalender af sig selv.
6. Klik på **Par**.

Tv'et viser **Forbundet!** og derefter **Indlæser din plan...**. Det henter det planlagte indhold og begynder at afspille. Se [Planlagt afspilning på tv'et](./scheduled-playback.md).

:::info
Hvis FreePlay Admin siger **Den kode matchede ikke et tv**, skal du kontrollere koden på skærmen. Hvis den er udløbet, skal du bruge den nye kode, som tv'et viser nu.
:::

### Planlagt vs. manuel

Indstillingen **Tilstand** har to valgmuligheder:

- **Planlagt** - Afspiller efter gruppens kalender af sig selv. Ingen behøver at trykke på Start.
- **Manuel** - En person vælger indhold med fjernbetjeningen. En manuel skærm vises stadig på din liste over **Skærme**, men den følger ikke en kalender, så feltet **Gruppe** er slået fra.

Du kan senere ændre en skærms tilstand via **Rediger** på [siden Skærme](./managing-screens.md).

## Parring til en tjenesteplan i stedet

Koden på skærmen **Par denne skærm** virker også i B1 Admin. Hvis du indtaster den dér og vælger en plantype under **Vis planer for**, følger tv'et den plantype i [Planlægningstilstand](../plan-mode/index.md) i stedet for en kalender. Se [Parring af din enhed](../plan-mode/device-pairing.md).

## Ændring eller fjernelse af parring fra tv'et

Når tv'et er parret, viser rækken **Par til en kalender** i **Indstillinger** navnet på den skærmgruppe, den følger. Vælg rækken for at åbne dialogen **Parret til**, som har tre valgmuligheder:

- **Tilbage til plan** - Lukker dialogen og vender tilbage til den planlagte afspiller. Parringen ændres ikke.
- **Fjern parring** - Stopper med at følge en kalender. FreePlay åbner skærmen **Indholdsudbydere**.
- **Par til en anden kalender** - Fjerner parringen og viser derefter en ny parringskode, så du kan parre tv'et igen.

:::warning
Fjernelse af parringen sletter de filer, FreePlay har downloadet til den kalender.
:::

## Fjernelse af parring i FreePlay Admin

1. Gå til **Skærme** og klik på skærmens navn.
2. Klik på **Mere** og derefter **Fjern parring**.
3. Klik på **Fjern parring** igen for at bekræfte.

Tv'et vender tilbage til at vise en parringskode. Par det igen, når du vil have det tilbage.

## Relaterede artikler

- **[Administration af skærme og grupper](./managing-screens.md)** - Omdøb en skærm, flyt den til en anden gruppe, eller se dens downloads
- **[Planlægning af kalenderen](./scheduling-the-calendar.md)** - Bestem, hvad gruppens skærme afspiller
- **[Valg af parringstilstand](../getting-started/pairing-modes.md)** - Sammenlign Planlagt tilstand med Planlægningstilstand og gennemsøgning af udbydere selv
