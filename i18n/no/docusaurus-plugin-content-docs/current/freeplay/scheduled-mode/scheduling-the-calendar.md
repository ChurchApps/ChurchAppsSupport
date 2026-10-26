---
title: "Planlegge kalenderen"
---

# Planlegge kalenderen

<div class="article-intro">

**Kalender**-siden i FreePlay Admin styrer hva hver skjermgruppe spiller, og når. Legg til en tidsplan for en spilleliste, en tjenesteplan eller en leverandørmappe, og still den til å gjentas ukentlig eller spille én gang. Når ingenting er planlagt, spiller gruppens standard-sløyfe.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Opprett minst én skjermgruppe. Se [Administrere skjermer og grupper](./managing-screens#screen-groups)
- [Lag en spilleliste](./building-playlists), eller ha en plantype satt opp i B1 Admin

</div>

## Lese kalenderen

1. Gå til **Kalender**.
2. Velg en skjermgruppe fra fanene øverst. Hver fane viser hvor mange tidsplaner gruppen har.
3. Ukevisningen går fra mandag til søndag, kl. 06.00 til 22.00. En rød linje markerer nåværende tidspunkt.
4. Bruk pilene for å gå til forrige eller neste uke, eller klikk **I dag** for å komme tilbake til denne uken.

Undertittelen på siden viser tidssonen som brukes for kalenderen. Tidsplaner følger kirkens tidssone, som du setter i B1 Admin under [Kirkeinformasjon](../../b1-admin/settings/church-settings.md#time-zone). Hvis kirken ikke har en tidssone satt, bruker FreePlay tidssonen til campus'et ditt. Kalenderen og TV-ene dine bruker samme tidssone, så en blokk lagt kl. 09.00 i kalenderen spilles kl. 09.00 på skjermen, selv om datamaskinen din er satt til en annen tidssone.

Tidsplaner er fargekodet etter type. En forklaring viser fargene:

- **Standard-sløyfe** - Skrå bakgrunn, vist bak alt når gruppen har en standard-sløyfe
- **Spilleliste**
- **Tjenesteplan**
- **Leverandørmappe**

Hver blokk viser navnet sitt, og høyere blokker viser også tidspunktene, om den gjentas (**ukentlig** eller **én gang**), og hva som skjer når den er ferdig tidlig.

## Sette standard-sløyfen

Standard-sløyfen spilles på gruppens skjermer når ingenting er planlagt.

1. På **Kalender**-siden klikker du **Standard-sløyfe…** i toppteksten. Hvis en standard-sløyfe allerede er satt, viser knappen **Standard-sløyfe:** etterfulgt av spillelistens navn.
2. Velg en **Spilleliste**, eller velg **Ingen – skjermen blir svart**.
3. Klikk **Lagre**.

## Legge til en tidsplan

Det finnes tre måter å starte en ny tidsplan på:

- Klikk et tomt sted i kalenderen. Skjemaet åpnes med den dagen og den halvtimen allerede fylt inn.
- Klikk **Legg til tidsplan** i toppteksten.
- Velg **Legg til tidsplan** fra kommandopaletten (**Ctrl+K** eller **⌘K**).

Fyll deretter inn skjemaet:

1. **Spill** - Velg hva som spilles:
   - **Spillelister** - Enhver spilleliste du har laget
   - **Tjenesteplaner** - En plantype fra B1 Admin, merket **(gjeldende plan)**. Skjermen spiller hvilken plan som er gjeldende for plantypen hver uke, inkludert Go Curriculum-leksjoner (også tilpassede), som bruker Go-innloggingen koblet til plantypens tjeneste
   - **Leverandørmappe…** - Åpner **Velg en leverandørmappe**. Bla til en mappe og klikk **Bruk denne mappen**. For å velge en annen mappe senere klikker du **Endre**
2. **Gjentas** - Velg ukedagene denne tidsplanen spiller. For en enkelt dato i stedet slår du på **Én gang** og velger **Dato**.
3. **Start** og **Slutt** - Tidspunktene tidsplanen starter og stopper.
4. **Hvis den er ferdig tidlig** - Hva som skal skje når innholdet går tom før sluttidspunktet:
   - **Gjenta til sluttidspunktet** - Starter fra begynnelsen igjen. Godt for skiltsløyfer, kunngjøringer og nedtellinger
   - **Lærerstyrt** - Lysbilder venter på lærerens fjernkontroll. Leksjonen forblir oppe etter sluttidspunktet til siste lysbilde
   - **Spill én gang, gå deretter tilbake til standard-sløyfen**
5. For gjentakende tidsplaner setter du **Starter** til første dato. Under **Slutter** velger du **Aldri**, eller velger **På dato** og skriver inn en **Sluttdato**.
6. Klikk **Lagre**.

:::info
**Lærerstyrt** erstattet det eldre alternativet «hold siste lysbilde». Tidsplaner lagret med det alternativet spilles nå som lærerstyrt.
:::

## Redigere eller slette en tidsplan

1. Klikk på tidsplanens blokk i kalenderen.
2. Endre et felt og klikk **Lagre**, eller klikk **Slett** for å fjerne tidsplanen.

## Overlappende tidsplaner

Hvis to tidsplaner overlapper, viser skjemaet en advarsel: **Overlapper en annen tidsplan. Den som starter senere vinner.** Mens den senere tidsplanen kjører, spiller skjermene den. Når den er ferdig, går de tilbake til den tidligere tidsplanen hvis den fortsatt kjører.

## Hvordan skjermer henter endringer

Koblede skjermer laster ned alt som er planlagt for de neste 7 dagene, og de sjekker selv etter endringer. Du trenger ikke å røre TV-en etter at du har redigert kalenderen. For å se når en skjerm har alt den trenger, sjekk **Klar til og med** på [Skjermsiden](./managing-screens).

## Relaterte artikler

- **[Lage spillelister](./building-playlists)** - Lag spillelistene du planlegger
- **[Planlagt avspilling på TV-en](./scheduled-playback)** - Hvordan lærerstyrte leksjoner og fjernkontrollen fungerer på TV-en
- **[Administrere skjermer og grupper](./managing-screens)** - Legg til grupper og sjekk hver skjerms nedlastinger
