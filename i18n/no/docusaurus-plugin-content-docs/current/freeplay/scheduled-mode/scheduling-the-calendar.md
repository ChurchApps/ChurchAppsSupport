---
title: "Planlegge kalenderen"
---

# Planlegge kalenderen

<div class="article-intro">

Siden **Kalender** i FreePlay Admin styrer hva hver skjermgruppe spiller av, og når. Legg til en plan for en spilleliste, en gudstjenesteplan eller en leverandørmappe, og still inn at den skal gjentas ukentlig eller spilles én gang. Når ingenting er planlagt, spilles gruppens standardløkke.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Opprett minst én skjermgruppe. Se [Administrere skjermer og grupper](./managing-screens#screen-groups)
- [Bygg en spilleliste](./building-playlists), eller ha en plantype satt opp i B1 Admin

</div>

## Lese kalenderen

1. Gå til **Kalender**.
2. Velg en skjermgruppe fra fanene øverst. Hver fane viser hvor mange planer gruppen har.
3. Ukevisningen går fra mandag til søndag, kl. 06.00 til 22.00. En rød linje viser gjeldende tidspunkt.
4. Bruk pilene for å gå til forrige eller neste uke, eller klikk **I dag** for å komme tilbake til denne uken.

Undertittelen på siden viser tidssonen som brukes for kalenderen. Planer følger kirkens tidssone. Hvis kirken ikke har satt en tidssone, bruker FreePlay tidssonen til campusen din.

Planer er fargekodet etter type. En forklaring viser fargene:

- **Standardløkke** - Skravert bakgrunn, vises bak alt når gruppen har en standardløkke
- **Spilleliste**
- **Gudstjenesteplan**
- **Leverandørmappe**

Hver blokk viser navnet sitt, og høyere blokker viser også tidspunktene, om den gjentas (**ukentlig** eller **én gang**), og hva som skjer når den avsluttes tidlig.

## Angi standardløkken

Standardløkken spilles på gruppens skjermer når ingenting er planlagt.

1. På siden **Kalender** klikker du **Standardløkke…** i toppteksten. Hvis en standardløkke allerede er satt, viser knappen **Standardløkke:** etterfulgt av navnet på spillelisten.
2. Velg en **Spilleliste**, eller velg **Ingen – skjermen blir mørk**.
3. Klikk **Lagre**.

## Legge til en plan

Det finnes tre måter å starte en ny plan på:

- Klikk på et tomt sted i kalenderen. Skjemaet åpnes med den dagen og halvtimen allerede utfylt.
- Klikk **Legg til plan** i toppteksten.
- Velg **Legg til plan** fra kommandopaletten (**Ctrl+K** eller **⌘K**).

Fyll deretter ut skjemaet:

1. **Spill av** - Velg hva som skal spilles:
   - **Spillelister** - Alle spillelister du har laget
   - **Gudstjenesteplaner** - En plantype fra B1 Admin, merket **(gjeldende plan)**. Skjermen spiller den planen som er gjeldende for plantypen hver uke
   - **Leverandørmappe…** - Åpner **Velg en leverandørmappe**. Bla til en mappe og klikk **Bruk denne mappen**. For å velge en annen mappe senere klikker du **Endre**
2. **Gjentas** - Velg ukedagene planen skal spilles. For én bestemt dato slår du på **Én gang** og velger **Dato**.
3. **Start** og **Slutt** - Tidspunktene planen starter og stopper.
4. **Hvis den avsluttes tidlig** - Hva som skal skje når innholdet er ferdig før sluttidspunktet:
   - **Gjenta til sluttidspunktet** - Begynner på nytt fra starten. Passer godt til skiltløkker, kunngjøringer og nedtellinger
   - **Lærerstyrt** - Lysbildene venter på lærerens fjernkontroll. Leksjonen forblir på skjermen etter sluttidspunktet til det siste lysbildet
   - **Spill én gang, gå deretter tilbake til standardløkken**
5. For planer som gjentas, sett **Starter** til første dato. Under **Slutter** velger du **Aldri**, eller du velger **På dato** og angir en **Sluttdato**.
6. Klikk **Lagre**.

:::info
**Lærerstyrt** erstattet det eldre alternativet «hold siste lysbilde». Planer som ble lagret med det alternativet, spilles nå som lærerstyrte.
:::

## Redigere eller slette en plan

1. Klikk på planens blokk i kalenderen.
2. Endre et felt og klikk **Lagre**, eller klikk **Slett** for å fjerne planen.

## Overlappende planer

Hvis to planer overlapper, viser skjemaet en advarsel: **Overlapper en annen plan. Den som starter senere vinner.** Mens den senere planen kjører, spiller skjermene den. Når den avsluttes, går de tilbake til den tidligere planen hvis den fortsatt kjører.

## Hvordan skjermene henter endringer

Parede skjermer laster ned alt som er planlagt for de neste 7 dagene, og de ser etter endringer av seg selv. Du trenger ikke røre TV-en etter at du har redigert kalenderen. For å se når en skjerm har alt den trenger, sjekk **Klar til og med** på [Skjermer-siden](./managing-screens).

## Relaterte artikler

- **[Bygge spillelister](./building-playlists)** - Lag spillelistene du planlegger
- **[Planlagt avspilling på TV-en](./scheduled-playback)** - Hvordan lærerstyrte leksjoner og fjernkontrollen fungerer på TV-en
- **[Administrere skjermer og grupper](./managing-screens)** - Legg til grupper og sjekk nedlastingene for hver skjerm
