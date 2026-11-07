---
title: "Administration af skærme og grupper"
description: "Tjek hvilke FreePlay-tv der er online og klar til søndag, rediger skærmindstillinger, og opret grupper, der deler én kalender, i FreePlay Admin."
---

# Administration af skærme og grupper

<div class="article-intro">

Siden **Skærme** i FreePlay Admin viser alle tv'er, der er parret med din kirke, hvad de viser lige nu, og om de er klar til søndag. Her administrerer du også **skærmgrupper**. Skærme i samme gruppe deler én kalender og én standardloop.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Log ind på FreePlay Admin på [admin.freeplay.church](https://admin.freeplay.church)
- [Par mindst én skærm](./pairing-a-screen.md)

</div>

## Siden Skærme

Øverst giver tre tal dig et hurtigt overblik over status:

- **Online nu** - Skærme, der har meldt sig inden for de sidste 15 minutter
- **Klar til søndag** - Hvor mange planlagte skærme der har hentet alt indhold frem til den kommende søndag
- **Kræver opmærksomhed** - Skærme, der er offline, eller som mangler filer

Nedenfor kan du bruge **Søg skærme** til at finde en skærm efter etiket, gruppe eller det, den viser. Filtermærkerne begrænser listen til **Alle**, **Planlagt**, **Manuel**, **Kræver opmærksomhed** eller en enkelt gruppe. Skift mellem visningerne **Tabel** og **Gitter** med knappen til højre.

Hver skærm viser sin:

- **Etiket** og enhedsmodel
- **Gruppe**
- **Tilstand** - **Planlagt** eller **Manuel**
- **Afspilles nu** - Det, der vises på skærmen lige nu. Manuelle skærme viser **Klasselokale · lærer trykker på Start**
- **Klar til** - Datoen, som skærmen har hentet indhold til. Hvis filer ikke blev hentet, vises i stedet **N filer mangler**. En ny skærm viser **Venter på første synkronisering**
- **Sidst set** - Hvornår skærmen sidst meldte sig. En skærm, der ikke har meldt sig i et stykke tid, viser **Offline**, og en skærm, der aldrig har forbundet sig, viser **Aldrig set**

Brug **Vis** for at afspille skærmens kalender i din browser, eller **Rediger** for at ændre indstillingerne.

## Visning af en skærm

Klik på en skærms etiket for at åbne dens side. Til venstre finder du:

- **Vis i browser** - Afspil denne skærms kalender på fuld skærm i din browser, således som den ville se ud på tv'et. Se [Præsentation fra en browser](./scheduled-playback.md#presenting-from-a-browser)
- **Rediger** - Ændr etiketten, gruppen eller tilstanden
- **Mere** > **Fjern parring** - Afbryd tv'et. Det vender tilbage til at vise en parringskode

Resten af siden har disse sektioner:

- **Nu og næste** - Hvad der afspilles nu, og indtil hvornår, efterfulgt af alt, der er planlagt de næste 7 dage. Klik på **Åbn kalender** for at gå direkte til denne gruppes kalender
- **Downloads** - **Klar til** en dato, når alt er hentet, eller en liste over de filer, der mangler
- **Enhed** - Enheds-ID, platform, model, FreePlay-appversion, IP-adresse, lagerplads brugt og ledig, sidst set og tilstand
- **Seneste** - De seneste aktiviteter, skærmen har rapporteret

:::tip
Hvis en skærm viser manglende filer, så sørg for, at den er online, og at der er ledig lagerplads. Tv'et henter selv de manglende filer, næste gang det melder sig.
:::

## Redigering af en skærm

1. Klik på **Rediger** ved siden af skærmen, eller på dens side.
2. Ændr **Etiket**, **Gruppe** eller **Tilstand** (**Planlagt** eller **Manuel**).
3. Klik på **Gem**.

Hvis du flytter en skærm til en anden gruppe, skifter den til den gruppes kalender.

## Skærmgrupper

En skærmgruppe er et sæt skærme, der viser det samme på samme tid, for eksempel "Lobby" eller "Børnefløjen". Hver gruppe har sin egen kalender og kan have en **standardloop**, der afspilles, når intet er planlagt.

For at administrere grupper klikker du på **Grupper** øverst på siden **Skærme**. Listen **Skærmgrupper** viser hver gruppes navn, hvor mange skærme den har, og dens standardloop. Klik på **Skærme** for at vende tilbage.

### Tilføjelse af en gruppe

1. I visningen **Skærmgrupper** klikker du på **Tilføj gruppe**.
2. Indtast et **Navn**, for eksempel "Lobby".
3. Vælg en afspilningsliste som **Standardloop**, eller lad den stå på **Ingen — skærmen slukkes**.
4. Klik på **Gem**.

Du kan også oprette en gruppe, mens du parrer en skærm, ved at vælge **＋ Ny gruppe…** i feltet **Gruppe**.

### Redigering eller sletning af en gruppe

1. Klik på **Rediger** ved siden af gruppen.
2. Ændr navnet eller standardloopen, og klik derefter på **Gem**.
3. For at fjerne gruppen klikker du på **Slet** og bekræfter.

:::warning
Hvis du sletter en gruppe, slettes også dens plan. Skærmene i gruppen slukkes, indtil du flytter dem til en anden gruppe.
:::

## Relaterede artikler

- **[Parring af en skærm](./pairing-a-screen.md)** - Tilføj et nyt tv
- **[Planlægning af kalenderen](./scheduling-the-calendar.md)** - Angiv, hvad hver gruppe viser, og dens standardloop
- **[Planlagt afspilning på tv'et](./scheduled-playback.md)** - Hvad datoen "Klar til" betyder på selve tv'et
