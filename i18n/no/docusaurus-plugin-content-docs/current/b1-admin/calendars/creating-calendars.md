---
title: "Opprette kalendere"
description: "Opprett en kalender i B1 Admin, koble til grupper eller importer .ics-filer, og administrer arrangementene, påmeldingene og notatene dine fra ett sted."
---

# Opprette kalendere

<div class="article-intro">

Når du oppretter en kalender i B1 Admin, kan du bygge en samlet visning av arrangementer ved å koble til en eller flere grupper. Arrangementene administreres av gruppeledere innenfor sine grupper, og kalenderen din viser disse arrangementene samlet på ett sted. Administratorer med redigeringstilgang kan legge til eller redigere arrangementer for alle grupper. Gruppeledere uten administratorrolle kan bare administrere arrangementer for grupper de leder.

</div>

## Opplæringsvideo

<YouTube id="Ko3kgsCSLFs" title="Opprette kalendere, arrangementer og romreservasjoner i B1" next="Påmelding til arrangementer og betalte arrangementer i B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp [gruppene](../groups/creating-groups.md) hvis arrangementer du vil ha med i kalenderen
- Du trenger administrativ tilgang til kalenderdelen i B1 Admin

</div>

## Opprette en ny kalender

1. I B1 Admin åpner du [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Kalendere** og klikker **Kalendere**.
2. Klikk **Legg til kalender** øverst på siden. Skjemaet for ny kalender åpnes under kalenderlisten.
3. Skriv inn et **navn** for kalenderen (for eksempel «Ungdomsarrangementer» eller «Hovedkalender for menigheten»).
4. Legg eventuelt til en **beskrivelse** for å hjelpe teamet ditt å forstå hva denne kalenderen er til for.
5. Klikk **Opprett** for å lagre den nye kalenderen.

## Detaljsiden for kalenderen

Etter at du har opprettet en kalender, klikker du **Administrer arrangementer** på raden for å åpne detaljsiden. Denne siden har to hovedområder:

- **Venstre kolonne** -- Kalenderens navn med handlingene sine (**Nytt arrangement**, **Rediger**, **Importer .ics** og **Skriv ut**), etterfulgt av listen **Grupper i kalenderen** som viser hvilke grupper som er med i kalenderen. Klikk **Fjern** ved siden av en gruppe for å ta den ut av kalenderen.
- **Hovedområde** -- Visningen **Kalenderarrangementer** med arrangementer hentet fra tilkoblede grupper, og knappene **Abonner** og **Legg til gruppe** over den. Hvert arrangement vises i gruppens farge. Farger velges automatisk, og en gruppe beholder samme farge i alle kalendere.

Klikk **Skriv ut** for å skrive ut en måned. Utskriften starter med menighetens logo for lys bakgrunn (fra [Utseende](../website/appearance.md), hvis du har valgt en), menighetens navn og kalenderens navn. Arrangementsnavn brytes over flere linjer i stedet for å bli kuttet av, og gruppefargene beholdes.

## Koble til grupper

Grupper som har arrangementer i kalenderen, vises automatisk i listen **Grupper i kalenderen** på venstre side av detaljsiden.

1. Klikk **Legg til gruppe** over kalenderen for å knytte en gruppe til kalenderen din.
2. Velg gruppen fra nedtrekkslisten. Listen inkluderer alle grupper i menigheten din, ikke bare gruppene du selv er medlem av.
3. Velg om du vil ta med **alle arrangementer** fra gruppen eller bare **bestemte arrangementer**.
4. Klikk **Lagre**.

Hvert arrangement vises bare én gang i kalenderen. Hvis du legger til en hel gruppe, blir eventuelle arrangementer fra gruppen som du tidligere har lagt til ett og ett, slått sammen i gruppeoppføringen. Hvis du velger bestemte arrangementer fra en gruppe som allerede er i kalenderen, legges det ikke til noe nytt. Bare grupper som er lagt til som helhet, vises under **Grupper i kalenderen**.

### Importere en .ics-fil

Klikk **Importer .ics** for å hente arrangementer fra en annen kalender. Velg **gruppen** arrangementene skal tilhøre, klikk deretter **Velg .ics-fil** eller lim inn innholdet i filen, og klikk **Importer**. Arrangementene opprettes i den gruppen, og gruppen legges til i kalenderen du importerte fra, slik at arrangementene vises der med en gang.

### Fjerne et arrangement fra kalenderen

Klikk på et arrangement i kalenderen, og klikk deretter **Fjern fra kalender**. Dette tar bare arrangementet ut av denne kalenderen -- selve arrangementet blir liggende i gruppen. Hvis arrangementet er i kalenderen fordi hele gruppen er lagt til, fjerner du alle arrangementene i gruppen fra denne kalenderen (arrangementene blir fortsatt i gruppen). Hvis du vil slette et arrangement for godt, sletter du det fra [gruppens kalender](../groups/group-calendar.md).

:::tip
Å koble grupper til kalenderen din er en kraftig måte å samle arrangementer automatisk på. Når en gruppeleder legger til et arrangement i sin [gruppe](../groups/creating-groups.md), kan det flyte inn i menighetens felles kalender uten ekstra arbeid fra deg.
:::

:::info
Hvis du vil opprette én kalender som henter arrangementer fra mange grupper i menigheten, se [Kuratert kalender](./curated-calendar.md) for en enklere fremgangsmåte.
:::

## Legge til og redigere arrangementer {#adding-and-editing-events}

Klikk **Nytt arrangement** på detaljsiden for kalenderen for å legge til et arrangement, eller klikk på et arrangement i kalenderen og deretter **Rediger** for å endre det. Skjemaet **Nytt arrangement** / **Rediger arrangement** har disse feltene:

- **Gruppe** -- Gruppen arrangementet tilhører. Hvis menigheten din har arrangementsmaler, kan du også velge en **mal** for å fylle ut skjemaet.
- **Tittel**
- **Arrangementsbilde** -- Klikk **Legg til bilde** (eller den tomme bildeboksen) for å velge eller laste opp et bilde, som beskjæres til et bredt format på 16:9. Klikk **Endre bilde** for å erstatte det. Bildet vises øverst på arrangementets side på nettstedet ditt og som flisen når et kalenderelement viser **Kommende arrangementer** (se [Vise arrangementer på nettstedet ditt](#showing-events-on-your-website)).
- **Beskrivelse** -- Vises på arrangementets side på nettstedet ditt. Fet tekst, lister og lenker støttes.
- **Start** og **Slutt**, **Gjentas** og **Synlighet** (**Offentlig** eller **Privat**).
- **Merkelapper** -- Kommaseparerte etiketter, for eksempel `ungdom, studenter`. Et kalenderelement på nettstedet ditt kan settes til bare å vise arrangementer med en bestemt merkelapp. Dette er det samme feltet **Merkelapper** som vises i arrangementets påmeldingsinnstillinger.
- **Hvem kan se notater** og **Hvem kan legge inn notater** -- Hvem som kan lese og legge til i arrangementets notater (se [Arrangementsnotater](#event-notes)). Velg **Bare ansatte** (standard), **Gruppeledere** (ledere av arrangementets gruppe) eller **Gruppemedlemmer** (alle i arrangementets gruppe, inkludert ledere).
- **Rom** og **Ressurser** -- Reserver plass og utstyr til arrangementet. Se [Rom, ressurser og planlegging](./rooms-resources.md).

Klikk **Lagre**. Hvis arrangementet gjentas, ber B1 deg bekrefte, fordi lagring oppdaterer hver forekomst i serien.

### Arrangementsnotater {#event-notes}

Hvert arrangement har sin egen notatråd for planlegging og oppfølging. Klikk på et arrangement i detaljvisningen for kalenderen; dialogen viser arrangementets detaljer, påminnelsene og **Notater** under dem. Skriv et notat og legg det ut for å føye det til tråden.

Ansatte med tillatelse til å redigere innhold eller administrere kalendere kan alltid lese og legge inn arrangementsnotater. Innstillingene **Hvem kan se notater** og **Hvem kan legge inn notater** på arrangementet bestemmer om gruppens ledere eller medlemmer også kan det.

### Vise arrangementer på nettstedet ditt {#showing-events-on-your-website}

For å legge en kalender ut på nettstedet ditt, legger du til et element for **Kalender** på en side og velger denne kalenderen. Elementet kan vise en månedskalender eller et rutenett med fliser for kommende arrangementer, og kan begrenses til arrangementer med én merkelapp. Besøkende som klikker på et arrangement, åpner arrangementets egen side. Se [Bruke kalenderelementet](../website/page-editor.md#using-the-calendar-element).

## Aktivere arrangementspåmelding {#enabling-event-registration}

Du kan aktivere påmelding for alle arrangementer i kalenderen, slik at medlemmer kan melde seg på via B1-nettstedet eller mobilappen.

1. Klikk på et eksisterende arrangement, eller opprett et nytt.
2. I arrangementseditoren slår du på **Påmelding**.
3. Konfigurer påmeldingsinnstillingene:
   - **Kapasitet** (valgfritt) -- Sett et maksimalt antall påmeldinger. La feltet være tomt for ubegrenset.
   - **Påmelding åpner** -- Datoen og klokkeslettet da påmelding blir tilgjengelig.
   - **Påmelding stenger** -- Datoen og klokkeslettet da påmeldingen stenger.
   - **Merkelapper** -- Kommaseparerte etiketter (for eksempel «ungdom, retreat, vbs») for å kategorisere arrangementer med påmelding.
   - **Påmeldingsspørsmål** -- Du kan eventuelt knytte et [skjema](../forms/creating-forms.md), slik at deltakerne svarer på flere spørsmål (kostholdsbehov, T-skjortestørrelse, nødkontakt osv.) som en del av påmeldingen. Velg **Ingen** for å hoppe over spørsmål.
   - **Aktiver venteliste** -- Når arrangementet blir fullt, kan flere få plass på en venteliste i stedet for å bli avvist. Se [Betalte påmeldinger](./paid-registrations.md#waitlist).
4. Lagre arrangementet.

For betalte arrangementer kan den samme innstillingssiden brukes til å definere priset **deltakertyper**, valgfrie **tilvalg** og **rabattkoder**, med betaling via menighetens giveleverandør. Se [Betalte påmeldinger](./paid-registrations.md) for hele gjennomgangen.

Når påmelding er aktivert, vil medlemmer se en knapp for **Meld deg på dette arrangementet** når de åpner arrangementet på [B1.church eller i B1-appen](../../b1-church/events/registering.md). Hvis du har knyttet et skjema til arrangementet, får deltakerne et trinn for **Spørsmål** under påmeldingen, og svarene deres lagres sammen med påmeldingen.

:::info
Påmeldingsspørsmål fungerer bare med skjemaer som **ikke** er merket som begrenset. Et begrenset skjema hoppes over automatisk under påmeldingen i stedet for å vises, så bruk et ubegrenset skjema når du knytter spørsmål til et arrangement.
:::

### Administrere påmeldinger

Slik ser du og administrerer påmeldinger til arrangementene dine:

1. I hurtigmenyen velger du **Kalendere > Påmeldinger**.
2. Du får en tabell over alle arrangementer med påmelding aktivert, med arrangementets tittel, dato, gjeldende antall påmeldinger mot kapasitet, og merkelapper.
3. Klikk på et arrangement for å se hele listen over påmeldinger, inkludert navn, antall medlemmer, deltakertyper, betalingsstatus og påmeldingsdato.
4. Fra detaljsiden kan du:
   - **Legg til deltaker** -- Registrer manuelt noen som meldte seg på via papir eller telefon.
   - **Avbryt** enkeltpåmeldinger
   - **Slett** påmeldinger for godt
   - **Flytt opp** påmeldinger fra venteliste når en plass blir ledig
   - **Eksporter CSV** -- Last ned alle påmeldinger, inkludert deltakertyper, tilvalg, betalingsbeløp og svar på spørsmål

Hvis arrangementet har påmeldingsspørsmål, viser detaljsiden også filteret **Bare ubesvarte spørsmål** for raskt å finne deltakere som ikke har sendt inn svar ennå, og en knapp for **Vis svar** på hver besvart påmelding for å se svarene deres. Betalte arrangementer legger til en kolonne for **Type**, en kolonne for **Betalt / Totalt**, antall per type og en detaljdialog for betalinger -- se [Betalte påmeldinger](./paid-registrations.md#the-registration-roster).

:::tip
Bruk fremdriftslinjen for kapasitet for å følge med på hvor raskt arrangementene fylles opp. Linjen blir rød når et arrangement er på eller over kapasiteten.
:::

## Neste steg

- [Kuratert kalender](./curated-calendar.md) -- Opprett en kalender som henter fra flere grupper
- [Betalte påmeldinger](./paid-registrations.md) -- Deltakertyper, tilvalg, rabattkoder, betalinger og ventelister
- [Veiledning for arrangementspåmelding](../guides/event-registration.md) -- Trinn-for-trinn-veiledning for å sette opp arrangementspåmelding
- [Oversikt over kalendere](./index.md) -- Gå tilbake til oversikten over kalendere
