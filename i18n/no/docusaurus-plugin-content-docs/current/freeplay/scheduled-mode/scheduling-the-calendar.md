---
title: "Planlegge kalenderen"
---

# Planlegge kalenderen

<div class="article-intro">

Siden **Calendar** i FreePlay Admin styrer hva hver skjermgruppe spiller, og når. Legg til en plan for en spilleliste, en tjenesteplan eller en leverandørmappe, og still den til å gjentas ukentlig eller spilles én gang. Når ingenting er planlagt, spilles gruppens standardløkke.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Opprett minst én skjermgruppe. Se [Administrere skjermer og grupper](./managing-screens#screen-groups)
- [Bygg en spilleliste](./building-playlists), eller ha en plantype satt opp i B1 Admin

</div>

## Lese kalenderen

1. Gå til **Calendar**.
2. Velg en skjermgruppe fra fanene øverst. Hver fane viser hvor mange planer gruppen har.
3. Ukevisningen går fra mandag til søndag, fra kl. 06 til kl. 22. En rød linje markerer gjeldende tidspunkt.
4. Bruk pilene for å gå til forrige eller neste uke, eller klikk på **Today** for å komme tilbake til denne uken.

Undertittelen på siden viser tidssonen som brukes for kalenderen. Planene følger tidssonen til menigheten din, som du angir i B1 Admin under [Church Information](../../b1-admin/settings/church-settings.md#time-zone). Hvis menigheten din ikke har angitt en tidssone, bruker FreePlay tidssonen til campusen din. Kalenderen og TV-ene dine bruker samme tidssone. En blokk som settes kl. 09:00 i kalenderen, spilles derfor av kl. 09:00 på skjermen, selv om datamaskinen din er satt til en annen tidssone.

Planene er fargekodet etter type. En forklaring over fargene vises:

- **Default loop** - Skravert bakgrunn, vises bak alt når gruppen har en standardløkke
- **Playlist**
- **Service plan**
- **Provider folder**

Hver blokk viser navnet sitt. Høyere blokker viser i tillegg klokkeslettene, om den gjentas (**weekly** eller **once**), og hva som skjer når den blir ferdig tidlig.

## Angi standardløkken

Standardløkken spilles på gruppens skjermer når ingenting er planlagt.

1. På siden **Calendar** klikker du på **Default loop…** i toppfeltet. Hvis det allerede er satt en standardløkke, viser knappen **Default loop:** etterfulgt av navnet på spillelisten.
2. Velg en **Playlist**, eller velg **None — screen goes dark** (skjermen blir svart).
3. Klikk på **Save**.

## Legge til en plan

Det finnes tre måter å starte en ny plan på:

- Klikk på et tomt sted i kalenderen. Skjemaet åpnes med den dagen og den halvtimen allerede fylt ut.
- Klikk på **Add schedule** i toppfeltet.
- Velg **Add schedule** fra kommandopaletten (**Ctrl+K** eller **⌘K**).

Fyll deretter ut skjemaet:

1. **Play** - Velg hva som skal spilles:
   - **Playlists** - Enhver spilleliste du har bygget
   - **Service plans** - En plantype fra B1 Admin, merket **(current plan)**. Skjermen spiller den gjeldende planen for plantypen hver uke, inkludert Go Curriculum-leksjoner (også tilpassede), som bruker Go-innloggingen koblet til ministeriet for plantypen
   - **Provider folder…** - Åpner **Choose a provider folder**. Bla til en mappe og klikk på **Use this folder**. For å velge en annen mappe senere klikker du på **Change**
2. **Repeats** - Velg ukedagene planen skal spilles. For en enkelt dato slår du på **One time** og velger **Date**.
3. **Start** og **End** - Klokkeslettene planen starter og stopper.
4. **If it finishes early** - Hva som skal skje når innholdet er ferdig før sluttidspunktet:
   - **Loop until the end time** - Starter fra begynnelsen igjen. Godt egnet til skiltløkker, kunngjøringer og nedtellinger
   - **Teacher paced** - Lysbilder venter på lærerens fjernkontroll. Leksjonen forblir på skjermen forbi sluttidspunktet, til det siste lysbildet
   - **Play once, then go back to the default loop**
5. For planer som gjentas, angir du **Starts** til første dato. Under **Ends** velger du **Never**, eller **On date** og angir en **End date**.
6. Klikk på **Save**.

:::info
**Teacher paced** erstattet det eldre alternativet «hold the last slide». Planer som er lagret med det alternativet, spilles nå som teacher paced.
:::

## Redigere eller slette en plan

1. Klikk på planens blokk i kalenderen.
2. Endre et felt og klikk på **Save**, eller klikk på **Delete** for å fjerne planen.

## Overlappende planer

Hvis to planer overlapper, viser skjemaet en advarsel: **Overlaps another schedule. The one that starts later wins.** (Overlapper med en annen plan. Den som starter senere, vinner.) Mens den senere planen kjører, spiller skjermene den. Når den er ferdig, går de tilbake til den tidligere planen hvis den fortsatt kjører.

## Hvordan skjermene henter endringer

Parede skjermer laster ned alt som er planlagt for de neste 7 dagene, og sjekker selv om det finnes endringer. Du trenger ikke å røre TV-en etter at du har redigert kalenderen. For å se når en skjerm har alt den trenger, sjekker du **Ready through** på [Screens-siden](./managing-screens).

## Relaterte artikler

- **[Bygge spillelister](./building-playlists)** - Lag spillelistene du planlegger
- **[Planlagt avspilling på TV-en](./scheduled-playback)** - Hvordan leksjoner med teacher paced og fjernkontrollen fungerer på TV-en
- **[Administrere skjermer og grupper](./managing-screens)** - Legg til grupper og kontroller nedlastingene for hver skjerm
- **[Beholde bare en del av hver leksjon](/docs/b1-admin/serving/scheduling-lessons#keeping-only-part-of-every-lesson)** - Beskjær hver planlagte leksjon i en plantype til delene rommet ditt spiller
