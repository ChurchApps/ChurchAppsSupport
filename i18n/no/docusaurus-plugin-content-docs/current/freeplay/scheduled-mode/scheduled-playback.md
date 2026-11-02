---
title: "Planlagt avspilling på TV-en"
---

# Planlagt avspilling på TV-en

<div class="article-intro">

Når en TV er koblet til en kalender, kjører FreePlay den for deg. Den laster ned uken som kommer, bytter innhold til planlagte tider, og fortsetter å spille fra sin egen lagring hvis internett faller ut. En lærer eller frivillig kan fortsatt pause, hoppe over og bla rundt med TV-fjernkontrollen.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- [Koble TV-en til en kalender](./pairing-a-screen)
- [Legg noe på kalenderen](./scheduling-the-calendar), eller sett en standard loop for skjermens gruppe

</div>

## Hva TV-en gjør av seg selv

- **Åpner rett til planen** - Når en koblet TV starter FreePlay, går den rett til den planlagte spilleren
- **Laster ned på forhånd** - FreePlay laster ned alle filer som er planlagt for de neste 7 dagene, pluss standard loop, og spiller fra disse nedlastingene
- **Spiller etter klokken** - Ved hver planlagte starttid bytter skjermen til det innholdet. Når ingenting er planlagt, spiller den gruppens standard loop
- **Sjekker etter endringer** - FreePlay sjekker FreePlay Admin for endringer i kalenderen regelmessig og laster ned alt nytt
- **Retter dårlige filer** - Hvis en nedlastet fil ikke vil spille, hopper FreePlay over den og laster den ned igjen

Før de første filene kommer, viser skjermen **Loading schedule...** eller **Downloading X of Y files**. Hvis ingenting er planlagt og gruppen ikke har en standard loop, viser den **Nothing is scheduled right now**.

## Info-panelet

Trykk **Velg** på fjernkontrollen for å åpne info-panelet. Det lukkes av seg selv etter noen sekunder. Panelet viser:

- **Øverst til høyre** - **Ready through** etterfulgt av en dato når alt til og med den datoen er lastet ned, eller **Downloading** mens filer fortsatt kommer inn. Under det, hvor mange filer som er lastet ned og en fremdriftslinje
- **Nederst til venstre** - Navnet på det som spilles (eller **Default loop**), hvilket element som er på skjermen, og hva som kommer neste og når
- **Last checked** - Når FreePlay sist sjekket etter endringer i planen

Panelet har også tre knapper:

- **Pin This Playlist** - Behold det gjeldende innholdet som spiller i en loop og ignorer kalenderen. Velg **Unpin Playlist** for å gå tilbake til planen
- **Browse Content** - Forlat den planlagte spilleren for å bla i de tilkoblede leverandørene dine
- **Settings** - Åpne FreePlay-innstillinger, der du kan [koble fra eller koble til en annen kalender](./pairing-a-screen#changing-or-unpairing-from-the-tv)

:::tip
For å gå tilbake til planen etter å ha bladd, trykk **Tilbake** på fjernkontrollen fra skjermen **Innholdsleverandører**, eller åpne **Innstillinger**, velg **Koble til en kalender**, og velg **Back to schedule**. En koblet TV går også tilbake til den planlagte spilleren hver gang FreePlay kommer tilbake i forgrunnen, og den åpner alltid den planlagte spilleren.
:::

## Fjernkontroll

| Fjernkontrollknapp | Handling |
|---|---|
| **Velg** | Åpne info-panelet |
| **Spill/Pause** | Pause eller fortsett. Et play-ikon vises mens det er pauset |
| **Høyre pil** | Neste lysbilde eller video |
| **Venstre pil** | Forrige lysbilde eller video |
| **Opp-pil** | Åpne lysbilde-oversikten for å hoppe til et hvilket som helst lysbilde |
| **Spol fremover** | Hopp 10 sekunder fremover i en video |
| **Spol tilbake** | Hopp 10 sekunder tilbake i en video |
| **Tilbake** | Lukk lysbilde-oversikten eller info-panelet, eller åpne info-panelet |

Neste og forrige holder seg innenfor innholdet som spiller nå. De går bare rundt fra siste element til det første når planen er satt til å loope. Spol fremover og spol tilbake fungerer bare under en video. De gjør ingenting på et lysbilde.

### Hoppe til et lysbilde

Trykk **Opp** for å åpne lysbilde-oversikten. Den viser hvert element i gjeldende spilleliste eller leksjon. Gå til det du vil ha og trykk **Velg** for å hoppe rett dit.

## Lærerstyrte leksjoner

Når en plan er satt til **Teacher paced**, går bildelysbilder ikke videre av seg selv. Læreren går fremover med **Høyre pil**. En video spilles til slutten og går deretter videre til neste element.

En lærerstyrt leksjon blir på skjermen forbi sitt planlagte sluttidspunkt til læreren når det siste lysbildet og det er ferdig. Deretter går skjermen videre til det som er planlagt neste. Dette hindrer at en klasse som går over tid blir avbrutt midt i leksjonen.

## Presentere fra en nettleser {#presenting-from-a-browser}

Du kan også spille en skjermgruppes kalender i en nettleser. I FreePlay Admin åpner du skjermen fra siden **Screens** og klikker **Present in browser**. Nettleseren følger den skjermens kalender på samme måte som TV-en, og kontrollfeltet viser hva som kommer neste. Bruk **Mellomrom** for å pause, **←** / **→** for å hoppe, **F** for fullskjerm, og **Esc** for å avslutte.

## Relaterte artikler

- **[Planlegge kalenderen](./scheduling-the-calendar)** - Bestem hva som spilles og hva som skjer når den er ferdig tidlig
- **[Administrere skjermer og grupper](./managing-screens)** - Sjekk hver skjerms nedlastinger fra FreePlay Admin
- **[Spille av innhold](../content-providers/playing-content)** - Kontroller for avspilling når du spiller av innhold selv
