---
title: "Planlegge kalenderen"
description: "Sett opp en ukentlig eller engangsplan i kalenderen i FreePlay Admin for å spille av spillelister, tjenesteplaner eller leverandørmapper på skjermgruppene dine, med standardløkker som reserve."
---

# Planlegge kalenderen

<div class="article-intro">

Siden **Kalender** i FreePlay Admin styrer hva hver skjermgruppe spiller av, og når. Legg til en plan for en spilleliste, en tjenesteplan eller en leverandørmappe, og still den inn til å gjentas ukentlig eller spilles én gang. Når ingenting er planlagt, spilles gruppens standardløkke av.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Opprett minst én skjermgruppe. Se [Administrere skjermer og grupper](./managing-screens.md#screen-groups)
- [Bygg en spilleliste](./building-playlists.md), eller ha en plantype satt opp i B1 Admin

</div>

## Lese kalenderen {#reading-the-calendar}

1. Gå til **Kalender**.
2. Velg en skjermgruppe fra fanene øverst. Hver fane viser hvor mange planer gruppen har.
3. Ukevisningen går fra mandag til søndag, kl. 06.00 til 22.00. En rød linje markerer gjeldende tidspunkt.
4. Bruk pilene for å gå til forrige eller neste uke, eller klikk på **I dag** for å komme tilbake til denne uken.

Undertittelen på siden viser tidssonen som brukes for kalenderen. Planene følger menighetens tidssone, som du angir i B1 Admin under [Menighetsinformasjon](../../b1-admin/settings/church-settings.md#time-zone). Hvis menigheten ikke har angitt en tidssone, bruker FreePlay tidssonen til campusen din. Kalenderen og TV-ene dine bruker samme tidssone, slik at en blokk plassert kl. 09.00 i kalenderen spilles av kl. 09.00 på skjermen, selv om datamaskinen din er innstilt på en annen tidssone.

Planene er fargekodet etter type. En forklaring viser fargene:

- **Standardløkke** - Skrådd bakgrunn, vises bak alt når gruppen har en standardløkke
- **Spilleliste**
- **Tjenesteplan**
- **Leverandørmappe**

Hver blokk viser navnet sitt. Høyere blokker viser også tidspunktene, om den gjentas (**ukentlig** eller **én gang**), og hva som skjer når den er ferdig tidlig.

## Angi standardløkken {#setting-the-default-loop}

Standardløkken spilles på gruppens skjermer når ingenting er planlagt.

1. Klikk på **Standardløkke…** i toppfeltet på siden **Kalender**. Hvis en standardløkke allerede er angitt, viser knappen **Standardløkke:** etterfulgt av navnet på spillelisten.
2. Velg en **Spilleliste**, eller velg **Ingen -- skjermen blir mørk**.
3. Klikk på **Lagre**.

## Legge til en plan {#adding-a-schedule}

Det finnes tre måter å starte en ny plan på:

- Klikk på et tomt sted i kalenderen. Skjemaet åpnes med den dagen og det halvtimesintervallet allerede fylt ut.
- Klikk på **Legg til plan** i toppfeltet.
- Velg **Legg til plan** fra kommandopaletten (**Ctrl+K** eller **⌘K**).

Fyll deretter ut skjemaet:

1. **Spill av** - Velg hva som skal spilles av:
   - **Spillelister** - Alle spillelister du har bygget
   - **Tjenesteplaner** - En plantype fra B1 Admin, merket **(gjeldende plan)**. Skjermen spiller hver uke den planen som er gjeldende for plantypen, inkludert Go Curriculum-leksjoner (også tilpassede), som bruker Go-innloggingen knyttet til plantypens tjenesteområde
   - **Leverandørmappe…** - Åpner **Velg en leverandørmappe**. Bla til en mappe og klikk på **Bruk denne mappen**. For å velge en annen mappe senere klikker du på **Endre**
2. **Gjentas** - Velg ukedagene planen skal spilles av. For en enkelt dato i stedet slår du på **Én gang** og velger **Dato**.
3. **Start** og **Slutt** - Tidspunktene planen starter og stopper.
4. **Hvis den er ferdig tidlig** - Hva som skal skje når innholdet er oppbrukt før sluttidspunktet:
   - **Løkke til sluttidspunktet** - Begynner om fra starten. Bra for skiltløkker, kunngjøringer og nedtellinger
   - **Lærer styrer tempoet** - Lysbilder venter på lærerens fjernkontroll. Leksjonen forblir oppe forbi sluttidspunktet til det siste lysbildet
   - **Spill én gang, og gå deretter tilbake til standardløkken**
5. For planer som gjentas, setter du **Starter** til første dato. Under **Slutter** velger du **Aldri**, eller velger **På dato** og angir en **Sluttdato**.
6. Klikk på **Lagre**.

:::info
**Lærer styrer tempoet** erstattet det eldre alternativet «hold siste lysbilde». Planer som er lagret med det alternativet, spilles nå som lærer styrer tempoet.
:::

## Redigere eller slette en plan {#editing-or-deleting-a-schedule}

1. Klikk på planens blokk i kalenderen.
2. Endre et hvilket som helst felt og klikk på **Lagre**, eller klikk på **Slett** for å fjerne planen.

## Overlappende planer {#overlapping-schedules}

Hvis to planer overlapper, viser skjemaet en advarsel: **Overlapper med en annen plan. Den som starter senere vinner.** Mens den senere planen kjører, spiller skjermene den. Når den er ferdig, går de tilbake til den tidligere planen hvis den fortsatt kjører.

## Slik henter skjermene endringer {#how-screens-pick-up-changes}

Sammenkoblede skjermer laster ned alt som er planlagt for de neste 7 dagene, og sjekker selv om det finnes endringer. Du trenger ikke å røre TV-en etter at du har redigert kalenderen. For å se når en skjerm har alt den trenger, sjekk **Klar til og med** på [Skjermer-siden](./managing-screens.md).

## Relaterte artikler {#related-articles}

- **[Bygge spillelister](./building-playlists.md)** - Lag spillelistene du planlegger
- **[Planlagt avspilling på TV-en](./scheduled-playback.md)** - Hvordan lærerstyrte leksjoner og fjernkontrollen fungerer på TV-en
- **[Administrere skjermer og grupper](./managing-screens.md)** - Legg til grupper og sjekk nedlastingene for hver skjerm
- **[Beholde bare en del av hver leksjon](/docs/b1-admin/serving/scheduling-lessons#keeping-only-part-of-every-lesson)** - Kutt hver planlagte leksjon i en plantype ned til delene rommet ditt spiller
