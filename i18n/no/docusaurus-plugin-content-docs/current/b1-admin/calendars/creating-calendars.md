---
title: "Opprette kalendere"
description: "Opprett en kalender i B1 Admin, koble til grupper eller importer .ics-filer, og administrer arrangementer, påmeldinger og notater fra ett sted."
---

# Opprette kalendere

<div class="article-intro">

Å opprette en kalender i B1 Admin lar deg bygge en tilpasset oversikt over arrangementer ved å koble til én eller flere grupper. Arrangementer administreres av gruppeledere innenfor sine egne grupper, og kalenderen din viser disse arrangementene samlet på ett sted. Administratorer med redigeringstilgang kan legge til eller redigere arrangementer for alle grupper. Gruppeledere uten administratorrettigheter kan bare administrere arrangementer for grupper de leder.

</div>

## Opplæringsvideo

<YouTube id="Ko3kgsCSLFs" title="Opprette kalendere, arrangementer og romreservasjoner i B1" next="Påmelding til arrangementer og betalte arrangementer i B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Opprett [gruppene](../groups/creating-groups.md) som arrangementene du vil ta med i kalenderen
- Du trenger administrativ tilgang til kalenderdelen i B1 Admin

</div>

## Opprette en ny kalender

1. I B1 Admin åpner du [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Kalendere** og klikker på **Kalendere**.
2. Klikk på **Legg til kalender** øverst på siden. Skjemaet for ny kalender åpnes under kalenderlisten.
3. Skriv inn et **navn** for kalenderen din (for eksempel «Ungdomsarrangementer» eller «Hovedkirkens kalender»).
4. Legg til en valgfri **beskrivelse** for å hjelpe teamet ditt å forstå hva kalenderen er til for.
5. Klikk på **Opprett** for å lagre den nye kalenderen.

## Detaljsiden for kalenderen

Etter at du har opprettet en kalender, klikker du på **Administrer arrangementer** på raden for kalenderen for å åpne detaljsiden. Denne siden har to hovedområder:

- **Venstre kolonne** -- Kalenderens navn med tilhørende handlinger (**Nytt arrangement**, **Rediger**, **Importer .ics** og **Skriv ut**), etterfulgt av listen **Grupper i kalender** som viser hvilke grupper som er med i kalenderen. Klikk på **Fjern** ved siden av en gruppe for å ta den av kalenderen.
- **Hovedområde** -- Visningen **Kalenderarrangementer** med arrangementer hentet fra tilkoblede grupper, og knappene **Abonner** og **Legg til gruppe** over.

## Koble til grupper

Grupper som har arrangementer i kalenderen, vises automatisk i listen **Grupper i kalender** på venstre side av detaljsiden.

1. Klikk på **Legg til gruppe** over kalenderen for å knytte en gruppe til kalenderen din.
2. Velg gruppen fra nedtrekkslisten. Listen inkluderer alle grupper i kirken din, ikke bare de gruppene du selv er med i.
3. Velg om du vil inkludere **alle arrangementer** fra gruppen, eller bare **bestemte arrangementer**.
4. Klikk på **Lagre**.

Hvert arrangement vises bare én gang i kalenderen. Hvis du legger til en hel gruppe, blir eventuelle arrangementer fra gruppen som du tidligere la til enkeltvis, slått sammen i gruppeoppføringen. Å velge bestemte arrangementer fra en gruppe som allerede er i kalenderen, legger ikke til noe nytt. Bare grupper som er lagt til som helhet, vises under **Grupper i kalender**.

### Importere en .ics-fil

Klikk på **Importer .ics** for å hente inn arrangementer fra en annen kalender. Velg **Gruppe** som arrangementene skal tilhøre, klikk deretter på **Velg .ics-fil** eller lim inn innholdet i filen, og klikk på **Importer**. Arrangementene opprettes i den gruppen, og gruppen legges til i kalenderen du importerte fra, slik at arrangementene vises der med en gang.

### Fjerne et arrangement fra kalenderen

Klikk på et arrangement i kalenderen, og klikk deretter på **Fjern fra kalender**. Dette tar bare arrangementet av denne kalenderen -- selve arrangementet blir i gruppen sin. Hvis arrangementet er med i kalenderen fordi hele gruppen er lagt til, fjerner du alle gruppens arrangementer fra denne kalenderen (arrangementene blir fortsatt i gruppen). For å slette et arrangement permanent, slett det fra [gruppens kalender](../groups/group-calendar.md).

:::tip
Å koble grupper til kalenderen din er en effektiv måte å samle arrangementer automatisk på. Når en gruppeleder legger til et arrangement i sin [gruppe](../groups/creating-groups.md), kan det vises i kirkens felleskalender uten ekstra arbeid fra deg.
:::

:::info
Hvis du vil opprette én kalender som henter arrangementer fra mange grupper på tvers av kirken din, se [Kuratert kalender](./curated-calendar.md) for en enklere fremgangsmåte.
:::

## Legge til og redigere arrangementer {#adding-and-editing-events}

Klikk på **Nytt arrangement** på detaljsiden for kalenderen for å legge til et arrangement, eller klikk på et arrangement i kalenderen og deretter på **Rediger** for å endre det. Skjemaet **Nytt arrangement** / **Rediger arrangement** har disse feltene:

- **Gruppe** -- Gruppen arrangementet tilhører. Hvis kirken din har arrangementsmaler, kan du også velge en **Mal** for å fylle ut skjemaet.
- **Tittel**
- **Arrangementsbilde** -- Klikk på **Legg til bilde** (eller den tomme bildeboksen) for å velge eller laste opp et bilde, beskåret til et bredt 16:9-format. Klikk på **Endre bilde** for å erstatte det. Bildet vises øverst på arrangementets side på nettstedet ditt, og som flis når et kalenderelement viser **Kommende arrangementer** (se [Vise arrangementer på nettstedet ditt](#showing-events-on-your-website)).
- **Beskrivelse** -- Vises på arrangementets side på nettstedet ditt. Fet tekst, lister og lenker støttes.
- **Start** og **Slutt**, **Gjentas** og **Synlighet** (**Offentlig** eller **Privat**).
- **Etiketter** -- Kommaseparerte etiketter, for eksempel `youth, students`. Et kalenderelement på nettstedet ditt kan settes til å vise bare arrangementer med en bestemt etikett. Dette er det samme feltet **Etiketter** som vises i arrangementets påmeldingsinnstillinger.
- **Hvem kan se notater** og **Hvem kan legge ut notater** -- Hvem som kan lese og legge til i arrangementets notater (se [Arrangementsnotater](#event-notes)). Velg **Kun ansatte** (standard), **Gruppeledere** (ledere av arrangementets gruppe) eller **Gruppemedlemmer** (alle i arrangementets gruppe, inkludert ledere).
- **Rom** og **Ressurser** -- Reserver plass og utstyr til arrangementet. Se [Rom, ressurser og planlegging](./rooms-resources.md).

Klikk på **Lagre**. Hvis arrangementet gjentas, ber B1 deg om å bekrefte, fordi lagring oppdaterer alle forekomster i serien.

### Arrangementsnotater {#event-notes}

Hvert arrangement har sin egen notattråd for planlegging og oppfølging. Klikk på et arrangement på detaljsiden for kalenderen; dialogen viser arrangementets detaljer, påminnelser og **Notater** nedenfor. Skriv et notat og publiser det for å legge det til i tråden.

Ansatte med tillatelse til å redigere innhold eller administrere kalendere kan alltid lese og legge ut arrangementsnotater. Innstillingene **Hvem kan se notater** og **Hvem kan legge ut notater** på arrangementet avgjør om gruppens ledere eller medlemmer også kan det.

### Vise arrangementer på nettstedet ditt {#showing-events-on-your-website}

For å legge en kalender på nettstedet ditt, legg til et **Kalender**-element på en side og velg denne kalenderen. Elementet kan vise en månedskalender eller et rutenett med flis for kommende arrangementer, og kan begrenses til arrangementer med én etikett. Besøkende som klikker på et arrangement, åpner arrangementets egen side. Se [Bruke kalenderelementet](../website/page-editor.md#using-the-calendar-element).

## Aktivere påmelding til arrangementer {#enabling-event-registration}

Du kan aktivere påmelding for alle kalenderarrangementer, slik at medlemmer kan melde seg på via B1-nettstedet eller mobilappen.

1. Klikk på et eksisterende arrangement, eller opprett et nytt.
2. I arrangementseditoren slår du på **Påmelding**.
3. Konfigurer innstillingene for påmelding:
   - **Kapasitet** (valgfri) -- Angi et maksimalt antall påmeldinger. La feltet stå tomt for ubegrenset.
   - **Påmelding åpner** -- Datoen og klokkeslettet når påmelding blir tilgjengelig.
   - **Påmelding stenger** -- Datoen og klokkeslettet når påmeldingen stenges.
   - **Etiketter** -- Kommaseparerte etiketter (f.eks. «youth, retreat, vbs») for å kategorisere arrangementer det kan meldes seg på.
   - **Påmeldingsspørsmål** -- Du kan valgfritt knytte et [skjema](../forms/creating-forms.md) til påmeldingen, slik at deltakerne svarer på ekstra spørsmål (kostholdsbehov, T-skjortestørrelse, nødkontakt osv.) som en del av påmeldingen. Velg **Ingen** for å hoppe over spørsmål.
   - **Aktiver venteliste** -- Når arrangementet blir fullt, kan flere deltakere settes på venteliste i stedet for å bli avvist. Se [Betalte påmeldinger](./paid-registrations.md#waitlist).
4. Lagre arrangementet.

For betalte arrangementer lar den samme innstillingssiden deg definere prissatte **deltakertyper**, valgfrie **valg** (tilleggsvalg) og **rabattkoder**, med betaling innhentet gjennom kirkens givertjeneste. Se [Betalte påmeldinger](./paid-registrations.md) for hele gjennomgangen.

Når påmelding er aktivert, ser medlemmer en knapp **Meld deg på dette arrangementet** når de viser arrangementet på [B1.church eller i B1-appen](../../b1-church/events/registering.md). Hvis du har knyttet et skjema til arrangementet, får deltakerne et trinn med spørsmål under påmeldingen, og svarene lagres sammen med påmeldingen.

:::info
Påmeldingsspørsmål fungerer bare med skjemaer som **ikke** er merket som begrenset. Et begrenset skjema hoppes over automatisk under påmeldingen i stedet for å vises, så bruk et ikke-begrenset skjema når du knytter spørsmål til et arrangement.
:::

### Administrere påmeldinger

For å se og administrere påmeldinger til arrangementene dine:

1. I hurtigmenyen velger du **Kalendere > Påmeldinger**.
2. Du ser en tabell over alle arrangementer med påmelding aktivert, med arrangementets tittel, dato, antall påmeldte mot kapasitet og etiketter.
3. Klikk på et arrangement for å se hele listen over påmeldinger, inkludert navn, antall medlemmer, deltakertyper, betalingsstatus og påmeldingsdato.
4. Fra detaljsiden kan du:
   - **Legg til deltaker** -- Meld manuelt på en person som har meldt seg på offline eller per telefon.
   - **Avbryt** enkeltpåmeldinger
   - **Slett** påmeldinger permanent
   - **Flytt opp** påmeldinger fra venteliste når en plass blir ledig
   - **Eksporter CSV** -- Last ned alle påmeldinger, inkludert deltakertyper, valg, betalingsbeløp og svar på spørsmål

Hvis arrangementet har knyttede påmeldingsspørsmål, viser detaljsiden også filteret **Bare ubesvarte spørsmål** for raskt å finne deltakere som ikke har levert svar ennå, og en knapp **Vis svar** på hver besvart påmelding for å se svarene deres. Betalte arrangementer legger til en kolonne **Type**, en kolonne **Betalt / Totalt**, antall per type og en dialog med betalingsdetaljer -- se [Betalte påmeldinger](./paid-registrations.md#the-registration-roster).

:::tip
Bruk fremdriftslinjen for kapasitet for å følge med på hvor raskt arrangementer fylles opp. Linjen blir rød når et arrangement er på eller over kapasiteten.
:::

## Neste steg

- [Kuratert kalender](./curated-calendar.md) -- Opprett en kalender som henter fra flere grupper
- [Betalte påmeldinger](./paid-registrations.md) -- Deltakertyper, tilleggsvalg, rabattkoder, betalinger og venteliste
- [Veiledning for påmelding til arrangementer](../guides/event-registration.md) -- Trinn-for-trinn-veiledning for oppsett av påmelding til arrangementer
- [Oversikt over kalendere](./index.md) -- Gå tilbake til oversikten over kalendere
