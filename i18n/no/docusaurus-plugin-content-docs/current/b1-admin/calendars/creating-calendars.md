---
title: "Opprette kalendere"
---

# Opprette kalendere

<div class="article-intro">

Når du oppretter en kalender i B1 Admin, kan du bygge en kuratert oversikt over arrangementer ved å koble til én eller flere grupper. Arrangementene administreres av gruppelederne i deres egne grupper, og kalenderen din viser dem samlet på ett sted. Administratorer med redigeringstilgang kan legge til eller redigere arrangementer for alle grupper. Gruppeledere som ikke er administratorer, kan bare administrere arrangementer for gruppene de leder.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp [gruppene](../groups/creating-groups.md) du vil ha med arrangementer fra i kalenderen
- Du trenger administratortilgang til Kalendere-delen i B1 Admin

</div>

## Opprette en ny kalender

1. Åpne [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) i B1 Admin (søkefeltet øverst til venstre), utvid **Kalendere** og klikk på **Kalendere**.
2. Klikk på **Legg til kalender**.
3. Skriv inn et **navn** på kalenderen (for eksempel «Ungdomsarrangementer» eller «Menighetens hovedkalender»).
4. Du kan legge til en **beskrivelse** som hjelper teamet ditt å forstå hva kalenderen brukes til.
5. Klikk på **Opprett** for å lagre den nye kalenderen.

## Kalenderens detaljside

Når du har opprettet en kalender, klikker du på den for å åpne detaljsiden. Siden har to hovedområder:

- **Venstre kolonne** -- En kalendervisning med arrangementer hentet fra de tilkoblede gruppene.
- **Høyre kolonne** -- Listen over tilknyttede grupper. Her bestemmer du hvilke grupper som skal inngå i kalenderen.

## Koble til grupper

Grupper som har arrangementer i kalenderen, vises automatisk i gruppelisten til høyre på detaljsiden.

1. Klikk på **Legg til** i gruppeseksjonen for å knytte en gruppe til kalenderen.
2. Velg gruppen fra nedtrekkslisten.
3. Velg om du vil ta med **alle arrangementer** fra gruppen eller bare **bestemte arrangementer**.
4. Klikk på **Lagre**.

:::tip
Å koble grupper til kalenderen er en effektiv måte å samle arrangementer automatisk på. Når en gruppeleder legger til et arrangement i [gruppen](../groups/creating-groups.md) sin, kan det vises i menighetens felles kalender uten at du trenger å gjøre noe ekstra.
:::

:::info
Hvis du vil lage én kalender som henter arrangementer fra mange grupper i menigheten, kan du se [Kuratert kalender](curated-calendar) for en enklere fremgangsmåte.
:::

## Aktivere påmelding til arrangementer

Du kan aktivere påmelding for alle kalenderarrangementer, slik at medlemmer kan melde seg på via B1-nettstedet eller mobilappen.

1. Klikk på et eksisterende arrangement eller opprett et nytt.
2. Slå på **Påmelding** i arrangementsredigeringen.
3. Konfigurer påmeldingsinnstillingene:
   - **Kapasitet** (valgfritt) -- Angi et maksimalt antall påmeldinger. La feltet stå tomt for ubegrenset.
   - **Påmeldingen åpner** -- Dato og klokkeslett når påmeldingen blir tilgjengelig.
   - **Påmeldingen stenger** -- Dato og klokkeslett når påmeldingen stenger.
   - **Etiketter** -- Kommaseparerte merkelapper (for eksempel «ungdom, weekendtur, sommerleir») som hjelper deg å kategorisere arrangementer med påmelding.
   - **Påmeldingsspørsmål** -- Du kan knytte et [skjema](../forms/creating-forms.md) til arrangementet, slik at deltakerne svarer på tilleggsspørsmål (matallergier, t-skjortestørrelse, nødkontakt osv.) når de melder seg på. Velg **Ingen** hvis du ikke vil stille spørsmål.
   - **Aktiver venteliste** -- Når arrangementet er fullt, kan flere påmeldte settes på en venteliste i stedet for å bli avvist. Se [Betalte påmeldinger](paid-registrations#waitlist).
4. Lagre arrangementet.

For betalte arrangementer kan du på den samme innstillingssiden definere prisede **deltakertyper**, valgfrie **tilvalg** og **rabattkoder**, og betalingen innhentes gjennom menighetens betalingsleverandør. Se [Betalte påmeldinger](paid-registrations) for en fullstendig gjennomgang.

Når påmelding er aktivert, ser medlemmene en knapp med teksten **Meld deg på dette arrangementet** når de åpner arrangementet på [B1-nettstedet](../../b1-church/events/registering) eller i [B1 Mobile-appen](../../b1-mobile/events/registering). Hvis du har knyttet til et skjema, ser deltakerne et **Spørsmål**-trinn under påmeldingen, og svarene lagres sammen med påmeldingen.

:::info
Påmeldingsspørsmål fungerer bare med skjemaer som **ikke** er merket som begrenset. Et begrenset skjema hoppes automatisk over under påmeldingen i stedet for å vises, så bruk et ubegrenset skjema når du knytter spørsmål til et arrangement.
:::

### Administrere påmeldinger

Slik viser og administrerer du påmeldinger til arrangementene dine:

1. Velg **Kalendere > Påmeldinger** i Jump-menyen.
2. Du ser en tabell over alle arrangementer med påmelding aktivert, med tittel, dato, antall påmeldte sammenlignet med kapasitet, og etiketter.
3. Klikk på et arrangement for å se hele listen over påmeldinger, med navn, antall medlemmer, deltakertyper, betalingsstatus og påmeldingsdato.
4. Fra detaljsiden kan du:
   - **Legg til deltaker** -- Melde på noen manuelt som har meldt seg på utenfor nettet eller over telefon.
   - **Avbryt** enkeltpåmeldinger
   - **Slett** påmeldinger permanent
   - **Flytt opp** påmeldte fra ventelisten når en plass blir ledig
   - **Eksporter CSV** -- Laste ned alle påmeldinger, inkludert deltakertyper, tilvalg, betalingsbeløp og svar på spørsmål

Hvis arrangementet har påmeldingsspørsmål, har detaljsiden også et filter, **Bare ubesvarte spørsmål**, som raskt viser deltakere som ennå ikke har sendt inn svar, og en knapp, **Vis svar**, på hver besvarte påmelding for å se svarene. Betalte arrangementer får i tillegg en **Type**-kolonne, en **Betalt / Totalt**-kolonne, antall per type og en dialog med betalingsdetaljer -- se [Betalte påmeldinger](paid-registrations#the-registration-roster).

:::tip
Bruk fremdriftsindikatoren for kapasitet til å følge med på hvor raskt arrangementene fylles opp. Indikatoren blir rød når et arrangement er fullt eller overbooket.
:::

## Neste steg

- [Kuratert kalender](curated-calendar) -- Lag en kalender som henter fra flere grupper
- [Betalte påmeldinger](paid-registrations) -- Deltakertyper, tilvalg, rabattkoder, betalinger og ventelister
- [Veiledning for arrangementspåmelding](../guides/event-registration) -- Trinnvis veiledning for å sette opp påmelding til arrangementer
- [Oversikt over kalendere](./) -- Tilbake til kalenderoversikten
