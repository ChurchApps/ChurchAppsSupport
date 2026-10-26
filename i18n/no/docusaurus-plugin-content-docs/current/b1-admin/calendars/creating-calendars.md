---
title: "Opprette kalendere"
---

# Opprette kalendere

<div class="article-intro">

Når du oppretter en kalender i B1 Admin, kan du bygge en utvalgt visning av arrangementer ved å koble til én eller flere grupper. Arrangementer administreres av gruppeledere innenfor sine grupper, og kalenderen viser disse arrangementene samlet på ett sted. Administratorer med redigeringstilgang kan legge til eller redigere arrangementer for alle grupper. Gruppeledere som ikke er administratorer, kan bare administrere arrangementer for grupper de leder.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp [gruppene](../groups/creating-groups.md) som har arrangementene du vil ta med i kalenderen
- Du trenger administrativ tilgang til kalenderdelen i B1 Admin

</div>

## Opprette en ny kalender

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Kalendere** og klikker **Kalendere**.
2. Klikk **Legg til kalender** øverst på siden. Skjemaet for ny kalender åpnes under kalenderlisten.
3. Skriv inn et **navn** på kalenderen (for eksempel «Ungdomsarrangementer» eller «Hovedkalender for menigheten»).
4. Legg eventuelt til en **beskrivelse** for å hjelpe teamet ditt å forstå hva denne kalenderen er til for.
5. Klikk **Opprett** for å lagre den nye kalenderen.

## Detaljsiden for kalenderen

Etter at du har opprettet en kalender, klikker du **Administrer arrangementer** på raden for å åpne detaljsiden. Denne siden har to hovedområder:

- **Venstre kolonne** -- Kalenderens navn med tilhørende handlinger (**Nytt arrangement**, **Rediger**, **Importer .ics** og **Skriv ut**), etterfulgt av listen **Grupper i kalenderen** som viser hvilke grupper som er med i kalenderen. Klikk **Fjern** ved siden av en gruppe for å ta den ut av kalenderen.
- **Hovedområde** -- Visningen **Kalenderarrangementer** med arrangementer hentet fra tilkoblede grupper, med knappene **Abonner** og **Legg til gruppe** over.

## Koble til grupper

Grupper som har arrangementer i kalenderen, vises automatisk i listen **Grupper i kalenderen** på venstre side av detaljsiden.

1. Klikk **Legg til gruppe** over kalenderen for å knytte en gruppe til kalenderen.
2. Velg gruppen fra rullegardinlisten. Listen inneholder alle grupper i menigheten din, ikke bare de gruppene du selv er med i.
3. Velg om du vil ta med **alle arrangementer** fra gruppen, eller bare **bestemte arrangementer**.
4. Klikk **Lagre**.

Hvert arrangement vises bare én gang i kalenderen. Hvis du legger til en hel gruppe, blir eventuelle arrangementer fra gruppen som du tidligere har lagt til enkeltvis, slått sammen med gruppeoppføringen. Hvis du velger bestemte arrangementer fra en gruppe som allerede er i kalenderen, legges det ikke til noe nytt. Bare grupper som er lagt til som helhet, vises under **Grupper i kalenderen**.

### Importere en .ics-fil

Klikk **Importer .ics** for å hente arrangementer fra en annen kalender. Velg **gruppen** arrangementene skal tilhøre, klikk deretter **Velg .ics-fil** eller lim inn innholdet i filen, og klikk **Importer**. Arrangementene opprettes i den gruppen, og gruppen legges til i kalenderen du importerte fra, slik at arrangementene vises der med en gang.

### Fjerne et arrangement fra kalenderen

Klikk på et arrangement i kalenderen, og klikk deretter **Fjern fra kalender**. Dette tar bare arrangementet ut av denne kalenderen -- selve arrangementet blir værende i gruppen. Hvis arrangementet står i kalenderen fordi hele gruppen er lagt til, fjerner du alle gruppens arrangementer fra denne kalenderen (arrangementene blir fortsatt i gruppen). Hvis du vil slette et arrangement for godt, sletter du det fra [gruppens kalender](../groups/group-calendar.md).

:::tip
Å koble grupper til kalenderen din er en effektiv måte å samle arrangementer automatisk på. Når en gruppeleder legger til et arrangement i sin [gruppe](../groups/creating-groups.md), kan det flyte inn i menighetens felles kalender uten noe ekstra arbeid fra deg.
:::

:::info
Hvis du vil opprette én kalender som henter arrangementer fra mange grupper på tvers av menigheten, kan du se [Utvalgt kalender](curated-calendar) for en enklere fremgangsmåte.
:::

## Legge til og redigere arrangementer {#adding-and-editing-events}

Klikk **Nytt arrangement** på detaljsiden for kalenderen for å legge til et arrangement, eller klikk på et arrangement i kalenderen og deretter **Rediger** for å endre det. Skjemaet **Nytt arrangement** / **Rediger arrangement** har disse feltene:

- **Gruppe** -- Gruppen arrangementet tilhører. Hvis menigheten din har arrangementsmaler, kan du også velge en **Mal** for å fylle ut skjemaet.
- **Tittel**
- **Bilde for arrangementet** -- Klikk **Legg til bilde** (eller den tomme bildeboksen) for å velge eller laste opp et bilde, beskjært til et bredt 16:9-format. Klikk **Endre bilde** for å erstatte det. Bildet vises øverst på arrangementets side på nettstedet ditt, og som flis når et Kalender-element viser **Kommende arrangementer** (se [Vise arrangementer på nettstedet ditt](#showing-events-on-your-website)).
- **Beskrivelse** -- Vises på arrangementets side på nettstedet ditt. Fet tekst, lister og lenker støttes.
- **Start** og **Slutt**, **Gjentas** og **Synlighet** (**Offentlig** eller **Privat**).
- **Etiketter** -- Kommaseparerte merkelapper, for eksempel `ungdom, studenter`. Et Kalender-element på nettstedet ditt kan settes til kun å vise arrangementer med en bestemt etikett. Dette er det samme feltet **Etiketter** som vises i arrangementets påmeldingsinnstillinger.
- **Hvem kan se notater** og **Hvem kan skrive notater** -- Hvem som kan lese og legge til i arrangementets notater (se [Arrangementsnotater](#event-notes)). Velg **Kun ansatte** (standard), **Gruppeledere** (ledere for arrangementets gruppe) eller **Gruppemedlemmer** (alle i arrangementets gruppe, inkludert ledere).
- **Rom** og **Ressurser** -- Reserver plass og utstyr til arrangementet. Se [Rom, ressurser og planlegging](rooms-resources).

Klikk **Lagre**. Hvis arrangementet gjentas, ber B1 deg bekrefte, fordi lagring oppdaterer alle forekomstene i serien.

### Arrangementsnotater {#event-notes}

Hvert arrangement har sin egen notattråd for planlegging og oppfølging. Klikk på et arrangement på detaljsiden for kalenderen; dialogen viser arrangementets detaljer, påminnelsene og **Notater** under dem. Skriv et notat og publiser det for å legge det til i tråden.

Ansatte med tillatelse til å redigere innhold eller administrere kalendere kan alltid lese og skrive arrangementsnotater. Innstillingene **Hvem kan se notater** og **Hvem kan skrive notater** på arrangementet avgjør om gruppens ledere eller medlemmer også kan det.

### Vise arrangementer på nettstedet ditt {#showing-events-on-your-website}

For å legge en kalender på nettstedet ditt, legger du til et **Kalender**-element på en side og velger denne kalenderen. Elementet kan vise en månedskalender eller et rutenett med flis for kommende arrangementer, og kan begrenses til arrangementer med én etikett. Besøkende som klikker på et arrangement, åpner arrangementets egen side. Se [Bruke Kalender-elementet](../website/page-editor.md#using-the-calendar-element).

## Aktivere påmelding til arrangementer {#enabling-event-registration}

Du kan aktivere påmelding for alle kalenderarrangementer, slik at medlemmer kan melde seg på via B1-nettstedet eller mobilappen.

1. Klikk på et eksisterende arrangement, eller opprett et nytt.
2. I arrangementseditoren slår du på **Påmelding**.
3. Konfigurer påmeldingsinnstillingene:
   - **Kapasitet** (valgfritt) -- Angi et maksimalt antall påmeldinger. La feltet stå tomt for ubegrenset.
   - **Påmelding åpner** -- Dato og klokkeslett for når påmeldingen blir tilgjengelig.
   - **Påmelding stenger** -- Dato og klokkeslett for når påmeldingen stenger.
   - **Etiketter** -- Kommaseparerte merkelapper (f.eks. «ungdom, retrett, vbs») for å kategorisere arrangementer det kan meldes seg på.
   - **Påmeldingsspørsmål** -- Du kan eventuelt knytte et [skjema](../forms/creating-forms.md), slik at deltakerne svarer på ekstra spørsmål (kosthensyn, T-skjortestørrelse, nødkontakt osv.) som en del av påmeldingen. Velg **Ingen** for å hoppe over spørsmål.
   - **Aktiver venteliste** -- Når arrangementet blir fullt, kan flere deltakere settes på venteliste i stedet for å bli avvist. Se [Betalte påmeldinger](paid-registrations#waitlist).
4. Lagre arrangementet.

For betalte arrangementer lar den samme innstillingssiden deg definere prissatte **Deltakertyper**, eventuelle **Valg** (tilleggsvalg) og **Rabattkoder**, med betaling via menighetens gaveleverandør. Se [Betalte påmeldinger](paid-registrations) for hele gjennomgangen.

Når påmelding er aktivert, ser medlemmer en knapp **Meld deg på dette arrangementet** når de viser arrangementet på [B1-nettstedet](../../b1-church/events/registering) eller [B1-mobilappen](../../b1-mobile/events/registering). Hvis du har knyttet et skjema til arrangementet, får deltakerne et steg **Spørsmål** under påmeldingen, og svarene deres lagres sammen med påmeldingen.

:::info
Påmeldingsspørsmål fungerer bare med skjemaer som **ikke** er merket som begrenset. Et begrenset skjema hoppes automatisk over under påmeldingen i stedet for å vises, så bruk et ubegrenset skjema når du knytter spørsmål til et arrangement.
:::

### Administrere påmeldinger

For å se og administrere påmeldinger til arrangementene dine:

1. I Hurtigmenyen velger du **Kalendere > Påmeldinger**.
2. Du får en tabell med alle arrangementer der påmelding er aktivert, med arrangementets tittel, dato, nåværende antall påmeldinger mot kapasitet og etiketter.
3. Klikk på et arrangement for å se hele listen over påmeldinger, med navn, antall medlemmer, deltakertyper, betalingsstatus og påmeldingsdato.
4. Fra detaljsiden kan du:
   - **Legg til deltaker** -- Registrer manuelt noen som meldte seg på offline eller over telefon.
   - **Avlys** enkeltpåmeldinger
   - **Slett** påmeldinger permanent
   - **Flytt opp** påmeldinger fra ventelisten når en plass blir ledig
   - **Eksporter CSV** -- Last ned alle påmeldinger, inkludert deltakertyper, valg, betalingsbeløp og svar på spørsmål

Hvis arrangementet har påmeldingsspørsmål knyttet til seg, viser detaljsiden også et filter for **Kun ubesvarte spørsmål** for raskt å finne deltakere som ennå ikke har sendt inn svar, og en knapp for **Vis svar** på hver besvart påmelding for å se svarene deres. Betalte arrangementer legger til en kolonne for **Type**, en kolonne for **Betalt / Totalt**, antall per type og en dialog med betalingsdetaljer -- se [Betalte påmeldinger](paid-registrations#the-registration-roster).

:::tip
Bruk fremdriftslinjen for kapasitet for å følge med på hvor raskt arrangementene fylles opp. Linjen blir rød når et arrangement er på eller over kapasiteten.
:::

## Neste steg

- [Utvalgt kalender](curated-calendar) -- Opprett en kalender som henter fra flere grupper
- [Betalte påmeldinger](paid-registrations) -- Deltakertyper, tilleggsvalg, rabattkoder, betalinger og ventelister
- [Veiledning for påmelding til arrangementer](../guides/event-registration) -- Trinn-for-trinn-veiledning for oppsett av påmelding til arrangementer
- [Oversikt over kalendere](./) -- Gå tilbake til oversikten over kalendere
