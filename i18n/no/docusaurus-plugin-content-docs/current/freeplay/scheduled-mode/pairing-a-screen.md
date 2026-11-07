---
title: "Koble til en skjerm"
description: "Koble en FreePlay-TV til en skjermgruppekalender i FreePlay Admin med firebokstavskoden på TV-en, slik at den spiller planlagt innhold av seg selv."
---

# Koble til en skjerm

<div class="article-intro">

For å sette en TV på en kalender kobler du den til **FreePlay Admin**. TV-en viser en kode på fire bokstaver. Du skriver inn den koden på [admin.freeplay.church](https://admin.freeplay.church) og velger skjermgruppen hvis kalender den skal følge. Du gjør dette bare én gang per TV.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Installer og start FreePlay på TV-en. Se [Komme i gang](../getting-started/index.md)
- Ha en ChurchApps-innlogging for kirken din slik at du kan logge inn på FreePlay Admin
- Valgfritt: [bygg en spilleliste](./building-playlists.md) og [planlegg den](./scheduling-the-calendar.md) først, slik at TV-en har noe å spille med en gang

</div>

## Vise koden på TV-en

1. På TV-en åpner du **Innstillinger** nederst i sidepanelet.
2. Velg **Koble til en kalender**. Raden viser **Not paired** når TV-en ikke er koblet til ennå.
3. Skjermen **Koble til denne skjermen** viser en QR-kode og en paringskode på fire bokstaver, med meldingen **Skann med telefonen din, eller gå til freeplay.church/pair og skriv inn denne koden**.
4. Under koden pulserer **Venter på bekreftelse** mens FreePlay venter på at du skal fullføre paringen.

Koden varer i 15 minutter, og en nedtelling under den viser hvor mye tid som er igjen. Når tiden er ute, viser FreePlay automatisk en ny kode. Du kan også velge **Generate New Code** for en ny, eller **Cancel** for å gå tilbake til Innstillinger.

## Koble til i FreePlay Admin

1. Skann QR-koden med telefonen din, eller gå til **freeplay.church/pair** på en hvilken som helst datamaskin eller telefon. Logg inn hvis du blir bedt om det. FreePlay Admin åpner skjemaet **Koble til skjerm** med koden allerede fylt inn.
   - Du kan også åpne skjemaet selv. Gå til **Screens** i FreePlay Admin og klikk **Pair screen**.
2. Kontroller **paringskoden**. Det er de fire bokstavene på TV-en.
3. Skriv inn en **etikett** slik at du kan skille denne TV-en fra de andre, for eksempel «Lobby venstre». Dette er valgfritt.
4. Under **Gruppe** velger du skjermgruppen hvis kalender denne TV-en skal følge. For å starte en ny, velg **＋ New group…** og skriv inn et **nytt gruppenavn**.
5. Under **Modus** lar du **Scheduled** være valgt. TV-en vil spille etter gruppens kalender av seg selv.
6. Klikk **Pair**.

TV-en viser **Connected!** og deretter **Loading your schedule...**. Den laster ned det som er planlagt og begynner å spille. Se [Planlagt avspilling på TV-en](./scheduled-playback.md).

:::info
Hvis FreePlay Admin sier **That code didn't match a TV**, sjekk koden på skjermen. Hvis den har utløpt, bruk den nye koden TV-en viser nå.
:::

### Planlagt vs. manuell

Innstillingen **Modus** har to alternativer:

- **Scheduled** - Spiller etter gruppens kalender av seg selv. Ingen må trykke Start.
- **Manual** - Noen velger innhold med fjernkontrollen. En manuell skjerm vises fortsatt i listen din over **Screens**, men den følger ikke en kalender, så feltet **Group** er slått av.

Du kan bytte en skjerms modus senere fra **Edit** på [siden Screens](./managing-screens.md).

## Koble til en tjenesteplan i stedet

Koden på skjermen **Koble til denne skjermen** fungerer også i B1 Admin. Hvis du skriver den inn der og velger en plantype under **Show Plans For**, følger TV-en den plantypen i [Planmodus](../plan-mode/index.md) i stedet for en kalender. Se [Koble til enheten din](../plan-mode/device-pairing.md).

## Endre eller koble fra på TV-en {#changing-or-unpairing-from-the-tv}

Når TV-en er koblet til, viser raden **Koble til en kalender** i **Innstillinger** navnet på skjermgruppen den følger. Velg raden for å åpne dialogen **Koblet til**, som har tre alternativer:

- **Back to schedule** - Lukk dialogen og gå tilbake til den planlagte spilleren. Ingenting med paringen endres.
- **Unpair** - Slutt å følge en plan. FreePlay åpner skjermen **Innholdsleverandører**.
- **Pair to a different calendar** - Koble fra, og vis deretter en ny paringskode slik at du kan koble TV-en til igjen.

:::warning
Frakobling fjerner filene FreePlay lastet ned for den kalenderen.
:::

## Koble fra i FreePlay Admin

1. Gå til **Screens** og klikk skjermens etikett.
2. Klikk **More**, deretter **Unpair**.
3. Klikk **Unpair** igjen for å bekrefte.

TV-en går tilbake til å vise en paringskode. Koble den til igjen når du vil ha den tilbake.

## Relaterte artikler

- **[Administrere skjermer og grupper](./managing-screens.md)** - Gi nytt navn til en skjerm, flytt den til en annen gruppe, eller sjekk nedlastingene
- **[Planlegge kalenderen](./scheduling-the-calendar.md)** - Bestem hva gruppens skjermer spiller
- **[Velge en paringsmodus](../getting-started/pairing-modes.md)** - Sammenlign planlagt modus med planmodus og bla i leverandører selv
