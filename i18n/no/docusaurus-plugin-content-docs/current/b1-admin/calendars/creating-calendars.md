---
title: "Opprette kalendere"
---

# Opprette kalendere

<div class="article-intro">

Å opprette en kalender i B1 Admin lar deg bygge en kuratert visning av arrangementer ved å koble til én eller flere grupper. Arrangementene administreres av gruppeledere innenfor sine grupper, og kalenderen viser dem samlet på ett sted. Administratorer med redigeringstilgang kan legge til eller redigere arrangementer for alle grupper. Gruppeledere uten administratorrettigheter kan bare administrere arrangementer for grupper de leder.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp [gruppene](../groups/creating-groups.md) hvis arrangementer du vil inkludere i kalenderen
- Du trenger administrativ tilgang til kalenderdelen i B1 Admin

</div>

## Opprette en ny kalender

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Kalendere** og klikker på **Kalendere**.
2. Klikk på **Legg til kalender** øverst på siden. Skjemaet for ny kalender åpnes under kalenderlisten.
3. Skriv inn et **navn** for kalenderen (for eksempel "Ungdomsarrangementer" eller "Hovedkalender for menigheten").
4. Legg til en valgfri **beskrivelse** for å hjelpe teamet ditt å forstå hva denne kalenderen er til for.
5. Klikk på **Opprett** for å lagre den nye kalenderen.

## Detaljsiden for kalenderen

Etter at du har opprettet en kalender, klikker du på **Administrer arrangementer** på raden hennes for å åpne detaljsiden. Denne siden har to hovedområder:

- **Venstre kolonne** -- Kalenderens navn med handlingene sine (**Nytt arrangement**, **Rediger**, **Importer .ics** og **Skriv ut**), etterfulgt av listen **Grupper i kalenderen** som viser hvilke grupper som er med i denne kalenderen. Klikk på **Fjern** ved siden av en gruppe for å ta den ut av kalenderen.
- **Hovedområde** -- Visningen **Kalenderarrangementer** med arrangementer hentet fra tilkoblede grupper, og knappene **Abonner** og **Legg til gruppe** over den.

## Koble til grupper

Grupper som har arrangementer i kalenderen, vises automatisk i listen **Grupper i kalenderen** på venstre side av detaljsiden.

1. Klikk på **Legg til gruppe** over kalenderen for å knytte en gruppe til kalenderen din.
2. Velg gruppen fra rullegardinmenyen.
3. Velg om du vil ta med **alle arrangementer** fra gruppen, eller bare **spesifikke arrangementer**.
4. Klikk på **Lagre**.

:::tip
Å koble grupper til kalenderen din er en kraftig måte å samle arrangementer automatisk på. Når en gruppeleder legger til et arrangement i sin [gruppe](../groups/creating-groups.md), kan det flyte inn i den menighetsomfattende kalenderen uten ekstra arbeid fra deg.
:::

:::info
Hvis du vil lage én kalender som henter arrangementer fra mange grupper i hele kirken, se [Kuratert kalender](curated-calendar) for en mer strømlinjeformet fremgangsmåte.
:::

## Legge til og redigere arrangementer {#adding-and-editing-events}

Klikk på **Nytt arrangement** på detaljsiden for kalenderen for å legge til et arrangement, eller klikk på et arrangement i kalenderen og deretter på **Rediger** for å endre det. Skjemaet **Nytt arrangement** / **Rediger arrangement** har disse feltene:

- **Gruppe** -- Gruppen arrangementet tilhører. Hvis kirken din har arrangementsmaler, kan du også velge en **Mal** for å fylle ut skjemaet.
- **Tittel**
- **Arrangementsbilde** -- Klikk på **Legg til bilde** (eller på den tomme bildeboksen) for å velge eller laste opp et bilde, beskåret til et bredt 16:9-format. Klikk på **Endre bilde** for å erstatte det. Bildet vises øverst på arrangementets side på nettstedet ditt, og som flis når et Kalender-element viser **Kommende arrangementer** (se [Vise arrangementer på nettstedet ditt](#showing-events-on-your-website)).
- **Beskrivelse** -- Vises på arrangementets side på nettstedet ditt. Fet tekst, lister og lenker støttes.
- **Start** og **Slutt**, **Gjentas** og **Synlighet** (**Offentlig** eller **Privat**).
- **Tagger** -- Kommaseparerte etiketter, for eksempel `youth, students`. Et Kalender-element på nettstedet ditt kan settes til å vise bare arrangementer med en bestemt tagg. Dette er det samme feltet **Tagger** som vises i arrangementets påmeldingsinnstillinger.
- **Hvem kan se notater** og **Hvem kan legge inn notater** -- Hvem som kan lese og legge til i arrangementets notater (se [Arrangementsnotater](#event-notes)). Velg **Kun staben** (standard), **Gruppeledere** (ledere i arrangementets gruppe) eller **Gruppemedlemmer** (alle i arrangementets gruppe, inkludert ledere).
- **Rom** og **Ressurser** -- Reserver plass og utstyr til arrangementet. Se [Rom, ressurser og planlegging](rooms-resources).

Klikk på **Lagre**. Hvis arrangementet gjentas, ber B1 deg bekrefte, fordi lagring oppdaterer hver forekomst i serien.

### Arrangementsnotater {#event-notes}

Hvert arrangement har sin egen notattråd for planlegging og oppfølging. Klikk på et arrangement i detaljvisningen for kalenderen. Dialogen viser arrangementets detaljer, påminnelser og **Notater** under dem. Skriv et notat og legg det inn for å føye det til tråden.

Staben som har tillatelse til å redigere innhold eller administrere kalendere, kan alltid lese og legge inn arrangementsnotater. Innstillingene **Hvem kan se notater** og **Hvem kan legge inn notater** på arrangementet avgjør om gruppelederne eller medlemmene i arrangementets gruppe også kan det.

### Vise arrangementer på nettstedet ditt {#showing-events-on-your-website}

For å legge en kalender på nettstedet ditt, legger du til et **Kalender**-element på en side og velger denne kalenderen. Elementet kan vise en månedskalender eller et rutenett med flis for kommende arrangementer, og kan begrenses til arrangementer med én tagg. Besøkende som klikker på et arrangement, åpner sin egen arrangementsside. Se [Bruke Kalender-elementet](../website/page-editor.md#using-the-calendar-element).

## Aktivere påmelding til arrangementer {#enabling-event-registration}

Du kan aktivere påmelding til ethvert kalenderarrangement, slik at medlemmer kan melde seg på via B1-nettstedet eller mobilappen.

1. Klikk på et eksisterende arrangement, eller opprett et nytt.
2. I arrangementseditoren slår du på **Påmelding**.
3. Konfigurer innstillingene for påmelding:
   - **Kapasitet** (valgfritt) -- Angi et maksimalt antall påmeldinger. La feltet være tomt for ubegrenset.
   - **Påmelding åpner** -- Datoen og klokkeslettet da påmelding blir tilgjengelig.
   - **Påmelding stenger** -- Datoen og klokkeslettet da påmeldingen stenger.
   - **Tagger** -- Kommaseparerte etiketter (f.eks. "youth, retreat, vbs") for å kategorisere arrangementer man kan melde seg på.
   - **Påmeldingsspørsmål** -- Du kan valgfritt legge ved et [skjema](../forms/creating-forms.md), slik at deltakerne svarer på ekstra spørsmål (kostholdsbehov, T-skjortestørrelse, nødkontakt osv.) som en del av påmeldingen. Velg **Ingen** for å hoppe over spørsmål.
   - **Aktiver venteliste** -- Når arrangementet blir fullt, kan flere melde seg på en venteliste i stedet for å bli avvist. Se [Betalte påmeldinger](paid-registrations#waitlist).
4. Lagre arrangementet.

For betalte arrangementer lar den samme innstillingssiden deg definere prissatte **Deltakertyper**, valgfrie **Valg** (tillegg) og **Rabattkoder**. Betaling samles inn via kirkens giveleverandør. Se [Betalte påmeldinger](paid-registrations) for hele gjennomgangen.

Når påmelding er aktivert, vil medlemmene se en knapp **Meld deg på dette arrangementet** når de åpner arrangementet på [B1-nettstedet](../../b1-church/events/registering) eller i [B1-mobilappen](../../b1-mobile/events/registering). Hvis du har lagt ved et skjema, får deltakerne et steg med **Spørsmål** under påmeldingen, og svarene deres lagres sammen med påmeldingen.

:::info
Påmeldingsspørsmål fungerer bare med skjemaer som **ikke** er merket som Begrenset. Et begrenset skjema hoppes automatisk over under påmelding i stedet for å vises, så bruk et ubegrenset skjema når du legger ved spørsmål til et arrangement.
:::

### Administrere påmeldinger

For å se og administrere påmeldinger til arrangementene dine:

1. I Hurtigmenyen velger du **Kalendere > Påmeldinger**.
2. Du ser en tabell over alle arrangementer med påmelding aktivert. Den viser arrangementets tittel, dato, nåværende antall påmeldinger kontra kapasitet, og tagger.
3. Klikk på et arrangement for å se hele listen over påmeldinger, inkludert navn, antall medlemmer, deltakertyper, betalingsstatus og påmeldingsdato.
4. Fra detaljsiden kan du:
   - **Legg til deltaker** -- Meld på noen manuelt som har meldt seg på utenfor nettet eller per telefon.
   - **Avbestill** enkeltpåmeldinger
   - **Slett** påmeldinger permanent
   - **Flytt opp** påmeldinger fra venteliste når en plass blir ledig
   - **Eksporter CSV** -- Last ned alle påmeldinger, inkludert deltakertyper, valg, betalingsbeløp og spørsmålssvar

Hvis arrangementet har påmeldingsspørsmål knyttet til seg, viser detaljsiden også et filter **Kun ubesvarte spørsmål** for raskt å finne deltakere som ennå ikke har sendt inn svar, og en knapp **Vis svar** på hver besvart påmelding for å se svarene deres. Betalte arrangementer legger til en kolonne **Type**, en kolonne **Betalt / Totalt**, antall per type og en betalingsdetaljdialog. Se [Betalte påmeldinger](paid-registrations#the-registration-roster).

:::tip
Bruk fremdriftslinjen for kapasitet for å følge med på hvor raskt arrangementene fylles opp. Linjen blir rød når et arrangement er på eller over kapasitet.
:::

## Neste steg

- [Kuratert kalender](curated-calendar) -- Opprett en kalender som henter fra flere grupper
- [Betalte påmeldinger](paid-registrations) -- Deltakertyper, tilleggsvalg, rabattkoder, betalinger og ventelister
- [Veiledning for påmelding til arrangementer](../guides/event-registration) -- Trinn-for-trinn-veiledning for oppsett av påmelding til arrangementer
- [Oversikt over kalendere](./) -- Gå tilbake til oversikten over kalendere
