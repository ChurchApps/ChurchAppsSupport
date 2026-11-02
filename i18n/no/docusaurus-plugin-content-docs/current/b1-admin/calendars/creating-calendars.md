---
title: "Opprette kalendere"
---

# Opprette kalendere

<div class="article-intro">

Ved å opprette en kalender i B1 Admin kan du lage en utvalgt oversikt over arrangementer ved å koble til én eller flere grupper. Arrangementer administreres av gruppeledere innenfor sine grupper, og kalenderen viser disse arrangementene samlet på ett sted. Administratorer med redigeringstilgang kan legge til eller redigere arrangementer for alle grupper. Gruppeledere som ikke er administratorer, kan bare administrere arrangementer for grupper de leder.

</div>

## Opplæringsvideo

<YouTube id="Ko3kgsCSLFs" title="Opprette kalendere, arrangementer og romreservasjoner i B1" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp [gruppene](../groups/creating-groups.md) hvis arrangementer du vil ta med i kalenderen
- Du trenger administrativ tilgang til kalenderdelen i B1 Admin

</div>

## Opprette en ny kalender

1. I B1 Admin åpner du [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Kalendere** og klikker **Kalendere**.
2. Klikk **Legg til kalender** øverst på siden. Skjemaet for ny kalender åpnes under kalenderlisten.
3. Skriv inn et **navn** på kalenderen (for eksempel «Ungdomsarrangementer» eller «Hovedkalender for kirken»).
4. Legg eventuelt til en **beskrivelse** for å hjelpe teamet ditt å forstå hva kalenderen er til for.
5. Klikk **Opprett** for å lagre den nye kalenderen.

## Detaljsiden for kalenderen

Etter at du har opprettet en kalender, klikker du **Administrer arrangementer** på raden for den for å åpne detaljsiden. Denne siden har to hovedområder:

- **Venstre kolonne** -- Kalenderens navn med handlingene sine (**Nytt arrangement**, **Rediger**, **Importer .ics** og **Skriv ut**), etterfulgt av listen **Grupper i kalenderen** som viser hvilke grupper som er med i denne kalenderen. Klikk **Fjern** ved siden av en gruppe for å ta den ut av kalenderen.
- **Hovedområdet** -- Visningen **Kalenderarrangementer** med arrangementer hentet fra tilkoblede grupper, med knappene **Abonner** og **Legg til gruppe** over seg.

## Koble til grupper

Grupper som har arrangementer i kalenderen, vises automatisk i listen **Grupper i kalenderen** på venstre side av detaljsiden.

1. Klikk **Legg til gruppe** over kalenderen for å knytte en gruppe til kalenderen.
2. Velg gruppen i nedtrekkslisten. Listen inkluderer alle grupper i kirken din, ikke bare de gruppene du selv er med i.
3. Velg om du vil ta med **alle arrangementer** fra gruppen, eller bare **bestemte arrangementer**.
4. Klikk **Lagre**.

Hvert arrangement vises bare én gang i kalenderen. Hvis du legger til en hel gruppe, blir eventuelle arrangementer fra gruppen du allerede har lagt til enkeltvis, slått sammen med gruppeoppføringen. Å velge bestemte arrangementer fra en gruppe som allerede er i kalenderen, legger ikke til noe nytt. Bare grupper som er lagt til som helhet, vises under **Grupper i kalenderen**.

### Importere en .ics-fil

Klikk **Importer .ics** for å hente inn arrangementer fra en annen kalender. Velg **gruppen** arrangementene skal tilhøre, klikk deretter **Velg .ics-fil** eller lim inn innholdet i filen, og klikk **Importer**. Arrangementene opprettes i den gruppen, og gruppen legges til i kalenderen du importerte fra, slik at arrangementene vises der med en gang.

### Fjerne et arrangement fra kalenderen

Klikk på et arrangement i kalenderen, og klikk deretter **Fjern fra kalender**. Dette tar bare arrangementet av denne kalenderen -- selve arrangementet blir værende i gruppen. Hvis arrangementet er i kalenderen fordi hele gruppen ble lagt til, fjerner du alle gruppens arrangementer fra denne kalenderen (arrangementene blir fortsatt i gruppen). For å slette et arrangement for godt sletter du det fra [gruppens kalender](../groups/group-calendar.md).

:::tip
Å koble grupper til kalenderen din er en effektiv måte å samle arrangementer automatisk på. Når en gruppeleder legger til et arrangement i [gruppen](../groups/creating-groups.md) sin, kan det flyte inn i kirkens felles kalender uten noe ekstra arbeid fra deg.
:::

:::info
Hvis du vil lage én kalender som henter arrangementer fra mange grupper i hele kirken, se [Utvalgt kalender](curated-calendar) for en enklere fremgangsmåte.
:::

## Legge til og redigere arrangementer {#adding-and-editing-events}

Klikk **Nytt arrangement** på detaljsiden for kalenderen for å legge til et arrangement, eller klikk på et arrangement i kalenderen og deretter **Rediger** for å endre det. Skjemaet **Nytt arrangement** / **Rediger arrangement** har disse feltene:

- **Gruppe** -- Gruppen arrangementet hører til. Hvis kirken din har arrangementsmaler, kan du også velge en **Mal** for å fylle ut skjemaet.
- **Tittel**
- **Arrangementsbilde** -- Klikk **Legg til bilde** (eller den tomme bildeboksen) for å velge eller laste opp et bilde, beskåret til et bredt 16:9-format. Klikk **Endre bilde** for å erstatte det. Bildet vises øverst på arrangementets side på nettstedet ditt, og som flis når et kalenderelement viser **Kommende arrangementer** (se [Vise arrangementer på nettstedet ditt](#showing-events-on-your-website)).
- **Beskrivelse** -- Vises på arrangementets side på nettstedet ditt. Fet tekst, lister og lenker støttes.
- **Start** og **Slutt**, **Gjentas** og **Synlighet** (**Offentlig** eller **Privat**).
- **Merkelapper** -- Merkelapper atskilt med komma, for eksempel `ungdom, elever`. Et kalenderelement på nettstedet ditt kan settes til kun å vise arrangementer med en bestemt merkelapp. Dette er det samme feltet **Merkelapper** som vises i arrangementets påmeldingsinnstillinger.
- **Hvem kan se notater** og **Hvem kan skrive notater** -- Hvem som kan lese og legge til notater på arrangementet (se [Arrangementsnotater](#event-notes)). Velg **Kun ansatte** (standard), **Gruppeledere** (ledere for arrangementets gruppe) eller **Gruppemedlemmer** (alle i arrangementets gruppe, inkludert ledere).
- **Rom** og **Ressurser** -- Reserver plass og utstyr til arrangementet. Se [Rom, ressurser og planlegging](rooms-resources).

Klikk **Lagre**. Hvis arrangementet gjentas, ber B1 deg bekrefte, fordi lagring oppdaterer alle forekomster i serien.

### Arrangementsnotater {#event-notes}

Hvert arrangement har sin egen notattråd for planlegging og oppfølging. Klikk på et arrangement på detaljsiden for kalenderen; dialogen viser arrangementets detaljer, påminnelser og **Notater** under dem. Skriv et notat og legg det ut for å føye det til tråden.

Ansatte med tillatelse til å redigere innhold eller administrere kalendere kan alltid lese og legge ut arrangementsnotater. Innstillingene **Hvem kan se notater** og **Hvem kan skrive notater** på arrangementet bestemmer om gruppens ledere eller medlemmer også kan det.

### Vise arrangementer på nettstedet ditt {#showing-events-on-your-website}

For å legge en kalender på nettstedet ditt, legger du til et **Kalender**-element på en side og velger denne kalenderen. Elementet kan vise en månedskalender eller et rutenett med flis for kommende arrangementer, og kan begrenses til arrangementer med én merkelapp. Besøkende som klikker på et arrangement, åpner arrangementets egen side. Se [Bruke kalenderelementet](../website/page-editor.md#using-the-calendar-element).

## Aktivere påmelding til arrangementer {#enabling-event-registration}

Du kan aktivere påmelding for alle kalenderarrangementer, slik at medlemmer kan melde seg på via B1-nettstedet eller mobilappen.

1. Klikk på et eksisterende arrangement, eller opprett et nytt.
2. I arrangementseditoren slår du på **Påmelding**.
3. Konfigurer påmeldingsinnstillingene:
   - **Kapasitet** (valgfritt) -- Angi et maksimalt antall påmeldinger. La feltet stå tomt for ubegrenset.
   - **Påmelding åpner** -- Dato og klokkeslett når påmelding blir tilgjengelig.
   - **Påmelding stenger** -- Dato og klokkeslett når påmeldingen stenger.
   - **Merkelapper** -- Merkelapper atskilt med komma (f.eks. «ungdom, retrett, vbs») for å kategorisere arrangementer som det kan meldes seg på.
   - **Påmeldingsspørsmål** -- Du kan eventuelt knytte et [skjema](../forms/creating-forms.md) slik at påmeldte svarer på ekstra spørsmål (kostholdsbehov, T-skjortestørrelse, nødkontakt osv.) som en del av påmeldingen. Velg **Ingen** for å hoppe over spørsmålene.
   - **Aktiver venteliste** -- Når arrangementet blir fullt, kan flere påmeldte settes på venteliste i stedet for å bli avvist. Se [Betalte påmeldinger](paid-registrations#waitlist).
4. Lagre arrangementet.

For betalte arrangementer lar den samme innstillingssiden deg definere prissatte **deltakertyper**, eventuelle **valg** (tilleggsvarer) og **rabattkoder**, med betaling som innkreves gjennom kirkens giveleverandør. Se [Betalte påmeldinger](paid-registrations) for hele gjennomgangen.

Når påmelding er aktivert, vil medlemmer se en knapp **Meld deg på dette arrangementet** når de viser arrangementet på [B1-nettstedet](../../b1-church/events/registering) eller [B1-mobilappen](../../b1-mobile/events/registering). Hvis du har knyttet et skjema, får de påmeldte et trinn for **Spørsmål** under påmeldingen, og svarene deres lagres sammen med påmeldingen.

:::info
Påmeldingsspørsmål fungerer bare med skjemaer som **ikke** er merket som begrenset. Et begrenset skjema hoppes automatisk over under påmeldingen i stedet for å vises, så bruk et ubegrenset skjema når du knytter spørsmål til et arrangement.
:::

### Administrere påmeldinger

For å se og administrere påmeldinger til arrangementene dine:

1. I hurtigmenyen velger du **Kalendere > Påmeldinger**.
2. Du ser en tabell med alle arrangementer der påmelding er aktivert, med arrangementets tittel, dato, gjeldende antall påmeldinger mot kapasitet og merkelapper.
3. Klikk på et arrangement for å se hele listen over påmeldinger, med navn, antall medlemmer, deltakertyper, betalingsstatus og påmeldingsdato.
4. Fra detaljsiden kan du:
   - **Legg til deltaker** -- Meld på noen manuelt som har meldt seg på frakoblet eller per telefon.
   - **Avbestill** enkeltpåmeldinger
   - **Slett** påmeldinger permanent
   - **Flytt opp** påmeldinger fra ventelisten når en plass blir ledig
   - **Eksporter CSV** -- Last ned alle påmeldinger, inkludert deltakertyper, valg, betalingsbeløp og svar på spørsmål

Hvis arrangementet har påmeldingsspørsmål knyttet til seg, viser detaljsiden også et filter for **Kun ubesvarte spørsmål** for raskt å finne påmeldte som ikke har sendt inn svar ennå, og en knapp for **Vis svar** på hver besvart påmelding for å se svarene deres. Betalte arrangementer legger til en kolonne for **Type**, en kolonne for **Betalt / Totalt**, antall per type og en dialog med betalingsdetaljer -- se [Betalte påmeldinger](paid-registrations#the-registration-roster).

:::tip
Bruk fremdriftslinjen for kapasitet for å følge med på hvor raskt arrangementene fylles opp. Linjen blir rød når et arrangement er på eller over kapasiteten.
:::

## Neste steg

- [Utvalgt kalender](curated-calendar) -- Lag en kalender som henter fra flere grupper
- [Betalte påmeldinger](paid-registrations) -- Deltakertyper, tilleggsvalg, rabattkoder, betalinger og ventelister
- [Veiledning for påmelding til arrangementer](../guides/event-registration) -- Trinn for trinn for å sette opp påmelding til arrangementer
- [Oversikt over kalendere](./) -- Gå tilbake til oversikten over kalendere
