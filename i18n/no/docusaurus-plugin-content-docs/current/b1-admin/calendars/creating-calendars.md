---
title: "Opprette kalendere"
---

# Opprette kalendere

<div class="article-intro">

Når du oppretter en kalender i B1 Admin, kan du lage en utvalgt visning av arrangementer ved å koble til en eller flere grupper. Arrangementer administreres av gruppeledere i sine egne grupper, og kalenderen din viser disse arrangementene samlet på ett sted. Administratorer med redigeringstilgang kan legge til eller redigere arrangementer for alle grupper. Gruppeledere som ikke er administratorer, kan bare administrere arrangementer for grupper de leder.

</div>

## Opplæringsvideo

<YouTube id="Ko3kgsCSLFs" title="Creating Calendars, Events, and Room Bookings in B1" next="Event Registration and Paid Events in B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp [gruppene](../groups/creating-groups.md) hvis arrangementer du vil ha med i kalenderen
- Du trenger administrativ tilgang til Calendars-delen i B1 Admin

</div>

## Opprette en ny kalender

1. I B1 Admin åpner du [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Calendars** og klikker på **Calendars**.
2. Klikk på **Add Calendar** øverst på siden. Skjemaet for ny kalender åpnes under kalenderlisten.
3. Skriv inn et **navn** for kalenderen (for eksempel «Ungdomsarrangementer» eller «Hovedkalender for menigheten»).
4. Legg eventuelt til en **beskrivelse** som hjelper teamet ditt å forstå hva kalenderen er til for.
5. Klikk på **Create** for å lagre den nye kalenderen.

## Detaljsiden for kalenderen

Når du har opprettet en kalender, klikker du på **Manage Events** på raden for kalenderen for å åpne detaljsiden. Denne siden har to hovedområder:

- **Venstre kolonne** -- Kalenderens navn med handlingene **New Event**, **Edit**, **Import .ics** og **Print**, etterfulgt av listen **Groups in Calendar** som viser hvilke grupper som er med i kalenderen. Klikk på **Remove** ved siden av en gruppe for å ta den ut av kalenderen.
- **Hovedområde** -- Visningen **Calendar Events** med arrangementer hentet fra tilkoblede grupper, med knappene **Subscribe** og **Add Group** over.

## Koble til grupper

Grupper som har arrangementer i kalenderen, vises automatisk i listen **Groups in Calendar** på venstre side av detaljsiden.

1. Klikk på **Add Group** over kalenderen for å knytte en gruppe til kalenderen.
2. Velg gruppen fra nedtrekkslisten. Listen inneholder alle gruppene i menigheten din, ikke bare gruppene du selv er med i.
3. Velg om du vil ta med **all events** fra gruppen, eller bare **specific events**.
4. Klikk på **Save**.

Hvert arrangement vises bare én gang i kalenderen. Hvis du legger til en hel gruppe, blir eventuelle arrangementer fra gruppen som du allerede har lagt til enkeltvis, slått sammen med gruppeoppføringen. Å velge bestemte arrangementer fra en gruppe som allerede er i kalenderen, legger ikke til noe nytt. Bare grupper som er lagt til som hele grupper, vises under **Groups in Calendar**.

### Importere en .ics-fil

Klikk på **Import .ics** for å hente arrangementer fra en annen kalender. Velg **Group** arrangementene skal tilhøre, og klikk deretter på **Choose .ics file** eller lim inn innholdet i filen. Klikk til slutt på **Import**. Arrangementene opprettes i den gruppen, og gruppen legges til i kalenderen du importerte fra, slik at arrangementene vises der med en gang.

### Fjerne et arrangement fra kalenderen

Klikk på et arrangement i kalenderen, og klikk deretter på **Remove from Calendar**. Dette tar bare arrangementet ut av denne kalenderen -- arrangementet blir liggende i gruppen sin. Hvis arrangementet er med i kalenderen fordi hele gruppen er lagt til, fjerner du alle arrangementene i gruppen fra denne kalenderen (arrangementene blir fortsatt i gruppen). For å slette et arrangement for godt sletter du det fra [kalenderen til gruppen](../groups/group-calendar.md).

:::tip
Å koble grupper til kalenderen din er en god måte å samle arrangementer automatisk på. Når en gruppeleder legger til et arrangement i sin [gruppe](../groups/creating-groups.md), kan det havne i menighetens felleskalender uten noe ekstra arbeid fra deg.
:::

:::info
Hvis du vil lage én enkelt kalender som henter arrangementer fra mange grupper i menigheten, kan du se [Curated Calendar](curated-calendar) for en enklere fremgangsmåte.
:::

## Legge til og redigere arrangementer {#adding-and-editing-events}

Klikk på **New Event** på detaljsiden for kalenderen for å legge til et arrangement, eller klikk på et arrangement i kalenderen og deretter på **Edit** for å endre det. Skjemaet **New Event** / **Edit Event** har disse feltene:

- **Group** -- Gruppen arrangementet tilhører. Hvis menigheten har arrangementsmaler, kan du også velge en **Template** for å fylle ut skjemaet.
- **Title**
- **Event photo** -- Klikk på **Add Photo** (eller den tomme boksen for bilde) for å velge eller laste opp et bilde, som beskjæres til et bredt format på 16:9. Klikk på **Change Photo** for å bytte det ut. Bildet vises øverst på arrangementets side på nettstedet ditt, og som flis når et Calendar-element viser **Upcoming events** (se [Vise arrangementer på nettstedet ditt](#showing-events-on-your-website)).
- **Description** -- Vises på arrangementets side på nettstedet ditt. Fet tekst, lister og lenker støttes.
- **Start** og **End**, **Repeats** og **Visibility** (**Public** eller **Private**).
- **Tags** -- Kommaseparerte etiketter, for eksempel `youth, students`. Et Calendar-element på nettstedet ditt kan settes til bare å vise arrangementer med en bestemt etikett. Dette er det samme feltet **Tags** som vises i innstillingene for påmelding til arrangementet.
- **Who can view notes** og **Who can post notes** -- Hvem som kan lese og legge til i arrangementets notater (se [Arrangementsnotater](#event-notes)). Velg **Staff only** (standard), **Group leaders** (ledere av arrangementets gruppe) eller **Group members** (alle i arrangementets gruppe, inkludert lederne).
- **Rooms** og **Resources** -- Reserver plass og utstyr til arrangementet. Se [Rom, ressurser og planlegging](rooms-resources).

Klikk på **Save**. Hvis arrangementet gjentas, ber B1 deg bekrefte, fordi lagring oppdaterer alle forekomster i serien.

### Arrangementsnotater {#event-notes}

Hvert arrangement har sin egen notattråd for planlegging og oppfølging. Klikk på et arrangement i kalenderen. Dialogen viser arrangementets detaljer, påminnelsene og **Notes** under dem. Skriv et notat og publiser det for å legge det til i tråden.

Ansatte med tillatelse til å redigere innhold eller administrere kalendere kan alltid lese og skrive arrangementsnotater. Innstillingene **Who can view notes** og **Who can post notes** på arrangementet avgjør om arrangementets gruppeledere eller medlemmer også kan det.

### Vise arrangementer på nettstedet ditt {#showing-events-on-your-website}

For å legge en kalender på nettstedet ditt legger du til et **Calendar**-element på en side og velger denne kalenderen. Elementet kan vise en månedskalender eller et rutenett med flis for kommende arrangementer, og det kan begrenses til arrangementer med én bestemt etikett. Besøkende som klikker på et arrangement, åpner arrangementets egen side. Se [Bruke Calendar-elementet](../website/page-editor.md#using-the-calendar-element).

## Aktivere påmelding til arrangementer {#enabling-event-registration}

Du kan aktivere påmelding for alle kalenderarrangementer, slik at medlemmer kan melde seg på via B1-nettstedet eller mobilappen.

1. Klikk på et eksisterende arrangement, eller opprett et nytt.
2. Slå på **Registration** i arrangementseditoren.
3. Konfigurer innstillingene for påmelding:
   - **Capacity** (valgfritt) -- Angi et maksimalt antall påmeldte. La feltet stå tomt for ubegrenset.
   - **Registration Opens** -- Dato og klokkeslett for når påmelding blir tilgjengelig.
   - **Registration Closes** -- Dato og klokkeslett for når påmeldingen stenges.
   - **Tags** -- Kommaseparerte etiketter (for eksempel «youth, retreat, vbs») for å kategorisere arrangementer med påmelding.
   - **Registration Questions** -- Du kan valgfritt knytte et [skjema](../forms/creating-forms.md) til påmeldingen, slik at deltakerne svarer på ekstra spørsmål (kosthensyn, t-skjortestørrelse, nødkontakt osv.) som en del av påmeldingen. Velg **None** for å hoppe over spørsmålene.
   - **Enable Waitlist** -- Når arrangementet blir fullt, kan flere få plass på en venteliste i stedet for å bli avvist. Se [Betalte påmeldinger](paid-registrations#waitlist).
4. Lagre arrangementet.

For betalte arrangementer lar den samme innstillingssiden deg definere prissatte **Attendee Types**, valgfrie **Selections** (tillegg) og **Discount Codes**. Betalingen går via menighetens giveleverandør. Se [Betalte påmeldinger](paid-registrations) for hele gjennomgangen.

Når påmelding er aktivert, ser medlemmer en knapp **Register for this Event** når de åpner arrangementet på [B1-nettstedet](../../b1-church/events/registering) eller i [B1 Mobile-appen](../../b1-mobile/events/registering). Hvis du har knyttet et skjema til arrangementet, får deltakerne et trinn **Questions** under påmeldingen, og svarene deres lagres sammen med påmeldingen.

:::info
Registration Questions fungerer bare med skjemaer som **ikke** er merket som Restricted. Et begrenset skjema hoppes over automatisk under påmeldingen i stedet for å vises, så bruk et skjema uten begrensning når du knytter spørsmål til et arrangement.
:::

### Administrere påmeldinger

For å se og administrere påmeldinger til arrangementene dine:

1. I Jump-menyen velger du **Calendars > Registrations**.
2. Du ser en tabell med alle arrangementer som har påmelding aktivert. Den viser arrangementets tittel, dato, gjeldende antall påmeldte mot kapasitet, og etiketter.
3. Klikk på et arrangement for å se hele listen over påmeldinger, med navn, antall medlemmer, deltakertyper, betalingsstatus og påmeldingsdato.
4. Fra detaljsiden kan du:
   - **Add Attendee** -- Legg manuelt inn en person som har meldt seg på offline eller per telefon.
   - **Cancel** enkeltpåmeldinger
   - **Delete** påmeldinger permanent
   - **Promote** påmeldinger fra venteliste når en plass blir ledig
   - **Export CSV** -- Last ned alle påmeldingene, inkludert deltakertyper, valg, betalingsbeløp og svar på spørsmål

Hvis arrangementet har Registration Questions knyttet til seg, viser detaljsiden også et filter **Unanswered questions only** for raskt å finne deltakere som ikke har sendt inn svar ennå, og en knapp **View Answers** på hver besvart påmelding for å se svarene. Betalte arrangementer legger til en kolonne **Type**, en kolonne **Paid / Total**, antall per type og en dialog med betalingsdetaljer. Se [Betalte påmeldinger](paid-registrations#the-registration-roster).

:::tip
Bruk fremdriftslinjen for kapasitet for å følge med på hvor raskt arrangementene fylles opp. Linjen blir rød når et arrangement er på eller over kapasiteten.
:::

## Neste steg

- [Curated Calendar](curated-calendar) -- Lag en kalender som henter fra flere grupper
- [Paid Registrations](paid-registrations) -- Deltakertyper, tilleggsvalg, rabattkoder, betalinger og venteliste
- [Veiledning for påmelding til arrangementer](../guides/event-registration) -- Trinn-for-trinn-veiledning for oppsett av påmelding til arrangementer
- [Oversikt over kalendere](./) -- Tilbake til oversikten over kalendere
