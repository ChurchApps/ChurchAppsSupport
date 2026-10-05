---
title: "Kunngjøringer"
---

# Kunngjøringer

<div class="article-intro">

FreePlay kan spille av en mappe med kunngjøringsslides i løkke på TV-en din -- for eksempel i vestibylen eller før undervisningen begynner. Du velger en mappe fra en av de tilkoblede innholdsleverandørene dine, FreePlay laster ned slidene til enheten, og et **Announcements**-element vises i sidefeltet, slik at du kan starte løkken når som helst.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- [Koble til en innholdsleverandør](./connecting-providers) som har kunngjøringsslidene dine, for eksempel Google Drive eller Dropbox
- Legg bildene eller videoene du vil spille i løkke, sammen i én mappe hos leverandøren

</div>

## Velge kunngjøringsmappen

1. Åpne **Settings** nederst i sidefeltet, og velg deretter **Providers**
2. Velg den tilkoblede leverandøren som har slidene dine (den har et **Connected**-merke) for å åpne **Provider Settings**
3. Velg **Use for Announcements**
4. Nettleseren **Choose the Announcements Folder** åpnes. Gå gjennom mappene til du kommer til den som har slidene dine, og velg deretter den mappen (eller en hvilken som helst fil i den)
5. FreePlay laster ned slidene og går tilbake til **Provider Settings**, der raden nå lyder **Looping "*mappenavn*" -- *antall* slides downloaded**

Bare én mappe brukes til kunngjøringer om gangen. Hvis du velger en mappe fra en annen leverandør, erstatter den den forrige.

## Spille av kunngjøringer

Når slidene er lastet ned, vises et **Announcements**-element nær toppen av sidefeltet (under **Today's Plan**, hvis TV-en din viser det). Velg det for å starte løkken.

- Bilder vises på skjermen i 15 sekunder, med mindre leverandøren har gitt filen sin egen varighet
- Videoer spilles av til slutten før neste slide vises
- Etter siste slide begynner løkken på nytt fra den første
- Hvis mappen bare har én video, gjentas den på stedet

Løkken spilles av fra filene som er lagret på enheten, så den fortsetter å gå uten internettforbindelse. Du kan bruke de samme fjernkontrollfunksjonene som for alt annet innhold -- se [Spille av leksjoner](../classroom-mode/playing-lessons).

## Oppdatere slidene

FreePlay sjekker kunngjøringsmappen hver gang appen starter, laster ned nye slides og fjerner slides som er slettet fra mappen.

For å sjekke med en gang åpner du leverandørens **Provider Settings** og velger **Check for Announcement Updates**. Raden viser **Up to date** sammen med antall slides når den er ferdig.

:::info
Hvis FreePlay ikke får kontakt med leverandøren, eller mappen viser seg å være tom, fortsetter appen å spille slidene den allerede har. Hvis du vil slutte helt å bruke kunngjøringer, slår du dem av som beskrevet nedenfor.
:::

:::warning
En slide som erstattes med en ny versjon under samme filnavn, lastes ikke ned på nytt. Hvis du vil endre en slide, legger du den til som en ny fil og sletter den gamle.
:::

## Slå av kunngjøringer

Åpne leverandørens **Provider Settings** og velg **Use for Announcements** på nytt. FreePlay slutter å bruke mappen, sletter de nedlastede slidene fra enheten og fjerner **Announcements** fra sidefeltet.

Hvis du kobler fra leverandøren, slås også kunngjøringer fra den av.

## Relaterte artikler

- **[Koble til leverandører](./connecting-providers)** - Koble til leverandøren som har slidene dine
- **[Bla i og laste ned innhold](./browsing-content)** - Bla i en leverandørs mapper og spill av innhold ved behov
- **[Spille av leksjoner](../classroom-mode/playing-lessons)** - Avspillingskontroller for TV-fjernkontrollen
