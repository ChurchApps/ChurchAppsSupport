---
title: "Opprette kalendere"
description: "Opprett en kalender i B1 Admin, koble til grupper eller importer .ics-filer, og administrer hendelser, registreringer og notater fra ett sted."
---

# Opprette kalendere

<div class="article-intro">

Når du oppretter en kalender i B1 Admin, kan du bygge en utvalgt oversikt over hendelser ved å koble til én eller flere grupper. Hendelser administreres av gruppeledere i sine egne grupper, og kalenderen viser disse hendelsene samlet på ett sted. Administratorer med redigeringstilgang kan legge til eller redigere hendelser for alle grupper. Gruppeledere uten administratortilgang kan bare administrere hendelser for grupper de leder.

</div>

## Opplæringsvideo {#training-video}

<YouTube id="Ko3kgsCSLFs" title="Creating Calendars, Events, and Room Bookings in B1" next="Event Registration and Paid Events in B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp [gruppene](../groups/creating-groups.md) hvis hendelser du vil ha med i kalenderen
- Du trenger tillatelsen **Edit Content**

</div>

## Opprette en ny kalender {#creating-a-new-calendar}

1. I B1 Admin åpner du [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Calendars** og klikker **Calendars**.
2. Klikk **Add Calendar** øverst på siden. Skjemaet for ny kalender åpnes under kalenderlisten.
3. Skriv inn et **Calendar Name** (for eksempel «Ungdomsarrangementer» eller «Hovedkalender for menigheten»).
4. Klikk **Create** for å lagre den nye kalenderen.

For å gi nytt navn til eller slette en kalender senere, holder du musepekeren over raden på siden Calendars og klikker **Edit** (eller klikker **Edit** på detaljsiden for kalenderen).

## Detaljsiden for kalenderen {#the-calendar-detail-page}

Etter at du har opprettet en kalender, klikker du på navnet (eller holder musepekeren over raden og klikker **Manage Events**) for å åpne detaljsiden. Denne siden har to hovedområder:

- **Venstre kolonne** – kalenderens navn med handlingene (**New Event**, **Edit**, **Import .ics** og **Print**), en lenke til eventuelle ventende godkjenninger, og listen **Groups in Calendar** som viser hvilke grupper som er med i denne kalenderen. Klikk **Remove** ved siden av en gruppe for å ta den ut av kalenderen.
- **Hovedområde** – visningen **Calendar Events** med hendelser hentet fra tilkoblede grupper, med knappene **Subscribe** og **Add Group** over. Bruk **Today**, **Back**, **Next** og visningene **Month**, **Week**, **Day** og **Agenda** for å navigere. Hver hendelse vises i farge etter gruppen den tilhører. Farger velges automatisk, og en gruppe beholder samme farge i alle kalendere.

Klikk **Print** for en utskriftsvennlig månedsvisning. Utskriften starter med menighetens logo på lys bakgrunn (fra [Utseende](../website/appearance.md), hvis du har angitt en), menighetens navn og kalenderens navn. Hendelsesnavn brytes over flere linjer i stedet for å kuttes av, og gruppefargene beholdes.

## Koble til grupper {#connecting-groups}

Grupper som har hendelser i kalenderen, vises automatisk i listen **Groups in Calendar** på venstre side av detaljsiden.

1. Klikk **Add Group** over kalenderen for å knytte en gruppe til kalenderen.
2. Velg gruppen i **Select a Group**. Listen inneholder alle grupper i menigheten, ikke bare de gruppene du selv er med i.
3. Velg **Add all the events of the group**, eller **Add specific events** og klikk på hver hendelse du vil ha med i den lille kalenderen som vises.
4. Klikk **Save**.

Hver hendelse vises bare én gang i kalenderen. Hvis du legger til en hel gruppe, blir eventuelle hendelser fra gruppen som du tidligere har lagt til enkeltvis, slått sammen til gruppeoppføringen, og hvis du velger bestemte hendelser fra en gruppe som allerede er i kalenderen, legges det ikke til noe nytt. Bare grupper som er lagt til som helhet, vises under **Groups in Calendar**.

### Importere en .ics-fil {#importing-an-ics-file}

Klikk **Import .ics** for å hente hendelser fra en annen kalender. Velg **Group** hendelsene skal tilhøre, klikk deretter **Choose .ics file** eller lim inn innholdet i filen, og klikk **Import**. Hendelsene opprettes i den gruppen, og gruppen legges til i kalenderen du importerte fra, slik at hendelsene vises der med en gang.

### Fjerne en hendelse fra kalenderen {#removing-an-event-from-the-calendar}

Klikk på en hendelse i kalenderen, og klikk deretter **Remove from Calendar**. Dette fjerner bare hendelsen fra denne kalenderen – hendelsen selv blir liggende i gruppen sin. Hvis hendelsen er i kalenderen fordi hele gruppen er lagt til, fjerner du alle hendelsene i gruppen fra denne kalenderen (hendelsene blir fortsatt i gruppen). For å slette en hendelse for godt, slett den fra [gruppens kalender](../groups/group-calendar.md).

:::tip
Å koble grupper til kalenderen din er en effektiv måte å samle hendelser automatisk på. Når en gruppeleder legger til en hendelse i sin [gruppe](../groups/creating-groups.md), kan den flyte inn i menighetens felles kalender uten ekstraarbeid fra deg.
:::

:::info
Hvis du vil opprette én kalender som henter hendelser fra mange grupper i hele menigheten, se [Utvalgt kalender](./curated-calendar.md) for en mer strømlinjeformet løsning.
:::

## Legge til og redigere hendelser {#adding-and-editing-events}

Klikk **New Event** på detaljsiden for kalenderen for å legge til en hendelse, eller klikk på en hendelse i kalenderen og deretter **Edit** for å endre den. Skjemaet **New Event** / **Edit Event** har disse feltene:

- **Group** – gruppen hendelsen tilhører. Hvis menigheten din har hendelsesmaler, kan du også velge en **Template** for å fylle ut skjemaet.
- **Title**
- **Event photo** – klikk **Add Photo** (eller den tomme bildeboksen) for å velge eller laste opp et bilde, beskåret til et bredt format på 16:9. Klikk **Change Photo** for å erstatte det. Bildet vises øverst på hendelsens side på nettstedet ditt, og som flis når et Calendar-element viser **Upcoming events** (se [Vise hendelser på nettstedet ditt](#showing-events-on-your-website)).
- **Description** – vises på hendelsens side på nettstedet ditt. Fet tekst, lister og lenker støttes.
- **Start** og **End**, **Repeats** og **Visibility** (**Public** eller **Private**).
- **Tags** – kommaseparerte etiketter, for eksempel `youth, students`. Et Calendar-element på nettstedet ditt kan settes til å vise bare hendelser med en bestemt etikett. Dette er samme felt **Tags** som vises i hendelsens påmeldingsinnstillinger.
- **Who can view notes** og **Who can post notes** – hvem som kan lese og legge til notater på hendelsen (se [Hendelsesnotater](#event-notes)). Velg **Staff only** (standard), **Group leaders** (ledere for hendelsens gruppe) eller **Group members** (alle i hendelsens gruppe, inkludert lederne).
- **Rooms** og **Resources** – reserver lokaler og utstyr til hendelsen. Se [Rom, ressurser og planlegging](./rooms-resources.md). Når du har valgt ett, kan du også legge til tid for oppsett og opprydding eller et eget reservasjonsvindu – se [Booke et rom eller en ressurs](./availability.md#booking-a-room-or-resource).
- **Reminders** – utvid denne delen for å sende påminnelser før hendelsen. Se [Påminnelser for hendelser](./event-reminders.md).

**Group**, **Title**, **Start** og **End** er påkrevd, og sluttidspunktet må være etter starttidspunktet. Klikk **Save**. Hvis hendelsen gjentas, ber B1 deg om å bekrefte, fordi lagring oppdaterer alle forekomstene i serien. For å slette en hendelse åpner du den i redigeringsvisningen og klikker **Delete**.

### Hendelsesnotater {#event-notes}

Hver hendelse har sin egen notattråd for planlegging og oppfølging. Klikk på en hendelse på detaljsiden for kalenderen; dialogen viser hendelsens detaljer, påminnelser og **Notes** under, med knappene **Edit**, **Manage Registrations** og **Remove from Calendar**. Skriv et notat og legg det ut for å føye det til tråden.

Personer med tillatelse til å redigere innhold eller administrere kalendere kan alltid lese og legge ut hendelsesnotater. Innstillingene **Who can view notes** og **Who can post notes** på hendelsen avgjør om hendelsesgruppens ledere eller medlemmer også kan det.

### Vise hendelser på nettstedet ditt {#showing-events-on-your-website}

For å legge en kalender på nettstedet ditt, legg til et **Calendar**-element på en side og velg denne kalenderen. Elementet kan vise en månedskalender eller et rutenett med flis for kommende hendelser, og kan begrenses til hendelser med én bestemt etikett. Besøkende som klikker på en hendelse, åpner hendelsens egen side. Se [Bruke Calendar-elementet](../website/page-editor.md#using-the-calendar-element).

## Aktivere påmelding til hendelser {#enabling-event-registration}

Du kan aktivere påmelding for en hvilken som helst kalenderhendelse, slik at medlemmer kan melde seg på via B1-nettstedet eller mobilappen.

1. Klikk på en eksisterende hendelse i kalenderen (opprett den først om nødvendig) og klikk **Manage Registrations**. Hendelsens påmeldingsside åpnes. (Knappen **Turn on registration** på siden **Registrations** tar deg til kalenderne dine, der du kan velge en hendelse.)
2. Klikk **Edit settings**, og slå deretter på **Enable Registration** i kortet **Registration Settings**.
3. Konfigurer påmeldingsinnstillingene:
   - **Capacity** (valgfritt) – angi et maksimalt antall påmeldinger. La feltet være tomt for ubegrenset.
   - **Registration Opens** – dato og klokkeslett når påmelding blir tilgjengelig.
   - **Registration Closes** – dato og klokkeslett når påmeldingen stenger.
   - **Tags** – kommaseparerte etiketter (f.eks. «youth, retreat, vbs») for å kategorisere hendelser som kan meldes på.
   - **Registration Questions** – valgfritt: legg ved et [skjema](../forms/creating-forms.md) slik at påmeldte svarer på ekstra spørsmål (kosthensyn, T-skjortestørrelse, nødkontakt osv.) som en del av påmeldingen. Velg **None** for å hoppe over spørsmål.
   - **Enable Waitlist** – når hendelsen blir full, kan flere melde seg på en venteliste i stedet for å bli avvist. Se [Betalte påmeldinger](./paid-registrations.md#waitlist).
4. Klikk **Save Settings**.

For betalte hendelser lar den samme innstillingssiden deg definere prissatte **Attendee Types**, valgfrie **Selections** (tilleggsvalg) og **Discount Codes**, med betaling via menighetens giveleverandør. Se [Betalte påmeldinger](./paid-registrations.md) for hele gjennomgangen.

Når påmelding er aktivert, ser medlemmer en knapp **Register for this Event** når de viser hendelsen på [B1.church eller i B1-appen](../../b1-church/events/registering.md). Hvis du har lagt ved et skjema, får påmeldte et trinn **Questions** under påmeldingen, og svarene lagres sammen med påmeldingen.

:::info
Registration Questions fungerer bare med skjemaer som **ikke** er merket som Restricted. Et begrenset skjema hoppes automatisk over under påmeldingen i stedet for å vises, så bruk et ubegrenset skjema når du legger ved spørsmål til en hendelse.
:::

### Administrere påmeldinger {#managing-registrations}

For å se og administrere påmeldinger til hendelsene dine:

1. I hurtigmenyen velger du **Calendars > Registrations**.
2. Du ser en tabell med alle hendelser som har påmelding aktivert, med hendelsens tittel, dato, gjeldende antall påmeldte mot kapasitet, og etiketter. Skriv i **Search events** for å filtrere listen.
3. Klikk på navnet til en hendelse for å se hele listen over påmeldinger, med kolonnene **Name**, **Members**, **Type**, **Paid / Total**, **Status** og **Date**.
4. Fra detaljsiden kan du:
   - **Add Attendee** – registrere manuelt en person som meldte seg på via papir eller telefon.
   - **Cancel Registration** for enkeltpåmeldinger (du må bekrefte)
   - **Delete** påmeldinger permanent (du må bekrefte)
   - **Promote** påmeldinger fra ventelisten når en plass blir ledig
   - **Export CSV** – last ned alle påmeldinger, inkludert deltakertyper, valg, betalingsbeløp og svar på spørsmål

   Disse radhandlingene er ikoner på slutten av hver rad; hold musepekeren over et ikon for å se navnet på det.

Hvis hendelsen har Registration Questions knyttet til seg, viser detaljsiden også et filter **Unanswered questions only** for raskt å finne påmeldte som ikke har svart ennå, og en knapp **View Answers** på hver besvarte påmelding for å se svarene. Hendelser med deltakertyper viser også antall per type over tabellen, og hver rad har en dialog **Registration Details** med betalinger – se [Betalte påmeldinger](./paid-registrations.md#the-registration-roster).

Venstre side av detaljsiden viser hvor mange personer som er påmeldt (den påmeldte og alle på påmeldingen), med en kapasitetslinje, eventuelt antall på venteliste, hendelsens etiketter og **Reminders**. Tittelen på kortet **Registrations** teller påmeldinger i stedet, og det er dette kapasitetsgrensene gjelder for – en familie på fire er altså én påmelding, men fire personer.

:::tip
Bruk kapasitetslinjen på siden Registrations for å følge med på hvor raskt hendelser fylles opp. Linjen blir rød når en hendelse er på eller over kapasiteten.
:::

## Neste steg {#next-steps}

- [Utvalgt kalender](./curated-calendar.md) – opprett en kalender som henter fra flere grupper
- [Betalte påmeldinger](./paid-registrations.md) – deltakertyper, tilleggsvalg, rabattkoder, betalinger og ventelister
- [Veiledning for påmelding til hendelser](../guides/event-registration.md) – trinnvis veiledning for oppsett av påmelding til hendelser
- [Oversikt over kalendere](./index.md) – gå tilbake til oversikten over kalendere
