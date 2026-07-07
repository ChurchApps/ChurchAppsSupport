---
title: "Oppretting av kalendere"
---

# Oppretting av kalendere

<div class="article-intro">

Opprett en kalender i B1 Admin slik at du kan bygge en kuratert visning av begivenheter ved å koble sammen en eller flere grupper. Begivenheter administreres av gruppeledere innenfor gruppene deres, og kalenderen din viser disse begivenhetene på ett sted. Selv en domeneadministrator kan ikke legge til eller redigere begivenheter direkte i kalendereksjonen hvis de ikke er leder av gruppen begivenhetene tilhører.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp [gruppene](../groups/creating-groups.md) hvis begivenheter du vil inkludere i kalenderen din
- Du trenger administrativ tilgang til seksjonen Kalendere i B1 Admin

</div>

## Opprett en ny kalender

1. I B1 Admin navigerer du til **Nettsted**, deretter til seksjonen **Kalendere**.
2. Klikk **Legg til kalender**.
3. Skriv inn et **navn** for kalenderen din (for eksempel "Ungdomministerium-begivenheter" eller "Hovedkirkekalender").
4. Legg til en valgfri **beskrivelse** for å hjelpe teamet ditt med å forstå hva denne kalenderen er for.
5. Klikk **Opprett** for å lagre den nye kalenderen.

## Siden med kalenderdetaljer

Etter å ha opprettet en kalender, klikk på den for å åpne detaljsiden. Denne siden har to hovedområder:

- **Venstre kolonne** -- En visning av kalenderen som viser begivenheter trukket fra tilkoblede grupper.
- **Høyre kolonne** -- Listen over tilknyttede grupper. Det er her du administrerer hvilke grupper som er inkludert i denne kalenderen.

## Tilkobling av grupper

Grupper som har begivenheter i kalenderen vises automatisk i gruppelisten på høyre side av detaljsiden.

1. Klikk **Legg til** i gruppedelen for å knytte en gruppe til kalenderen din.
2. Velg gruppen fra rullegardinmenyen.
3. Velg om du vil inkludere **alle begivenheter** fra den gruppen eller bare **bestemte begivenheter**.
4. Klikk **Lagre**.

:::tip
Tilkobling av grupper til kalenderen din er en kraftig måte å automatisk sammenstille begivenheter. Når en gruppeleder legger til en begivenhet i [gruppen sin](../groups/creating-groups.md), kan den flyte inn i hele kirkens kalender uten ekstra arbeid fra deg.
:::

:::info
Hvis du vil lage en enkelt kalender som trekker begivenheter fra mange grupper på tvers av kirken din, se [Kuratert kalender](curated-calendar) for en strømlinjeformet tilnærming.
:::

## Aktivering av begivenhetersregistrering

Du kan aktivere registrering for enhver begivenhet i kalenderen slik at medlemmer kan melde seg på gjennom B1-nettstedet eller mobilappen.

1. Klikk på en eksisterende begivenhet eller opprett en ny.
2. I begivenheetsredigeringsprogrammet, slå på **Registrering**.
3. Konfigurer registreringsinnstillingene:
   - **Kapasitet** (valgfritt) -- Sett et maksimalt antall registreringer. La stå blank for ubegrenset.
   - **Registreringen åpnes** -- Datoen og tiden når registrering blir tilgjengelig.
   - **Registreringen lukkes** -- Datoen og tiden når registreringen lukkes.
   - **Merker** -- Kommaseparerte etiketter (f.eks. "ungdom, tilbaketrekking, vbs") for å hjelpe med å kategorisere registrerbare begivenheter.
   - **Spørsmål om registrering** -- Fest valgfritt et [skjema](../forms/creating-forms.md) slik at påmeldere svarer på ekstra spørsmål (kostpreferanser, t-skjørtstørrelse, nødkontakt osv.) som en del av påmelding. Velg **Ingen** for å hoppe over spørsmål.
   - **Aktiver venteliste** -- Når begivenheten fylles opp, la ytterligere påmeldere bli med på en venteliste i stedet for å bli avvist. Se [Betalte registreringer](paid-registrations#waitlist).
4. Lagre begivenheten.

For betalte begivenheter, på samme innstillingsside kan du definere prissatte **Deltakertyper**, valgfrie **Valg** (tilleggspakker) og **Rabattkoder**, med betaling innsamlet gjennom kirkens givingleverandør. Se [Betalte registreringer](paid-registrations) for den fullstendige gjennomgangen.

Når registrering er aktivert, vil medlemmer se en **Registrer deg for denne begivenheten**-knapp når de viser begivenheten på [B1-nettstedet](../../b1-church/events/registering) eller [B1-mobilappen](../../b1-mobile/events/registering). Hvis du festet et skjema, ser påmeldere et **Spørsmål**-trinn under registrering og svarene deres lagres med registreringen.

:::info
Spørsmål om registrering fungerer bare med skjemaer som **ikke** er merket som begrenset. Et begrenset skjema hoppes automatisk over under registrering i stedet for å vises, så bruk et ubegrenset skjema når du fester spørsmål til en begivenhet.
:::

### Administrasjon av registreringer

For å se og administrere registreringer for begivenhetene dine:

1. Naviger til siden **Registreringer** i B1 Admin.
2. Du vil se en tabell over alle begivenheter med registrering aktivert, som viser begivenhetens tittel, dato, gjeldende registreringsantall kontra kapasitet og merker.
3. Klikk på en begivenhet for å se hele listen over registreringer, inkludert navn, medlemsantall, deltakertyper, betalingsstatus og registreringsdato.
4. Fra detaljsiden kan du:
   - **Legg til deltaker** -- Registrer manuelt noen som meldte seg opp offline eller over telefonen.
   - **Avbryt** individuelle registreringer
   - **Slett** registreringer permanent
   - **Fremme** venteliste registreringer når en plass blir ledig
   - **Eksporter CSV** -- Last ned alle registreringer, inkludert deltakertyper, valg, betalingsbeløp og svar på spørsmål

Hvis begivenheten har Spørsmål om registrering vedlagt, viser detaljsiden også et **Bare ubesvarte spørsmål**-filter for raskt å finne påmeldere som ikke har sendt inn svar ennå, og en **Vis svar**-knapp på hver besvart registrering for å se svarene. Betalte begivenheter legger til en **Type**-kolonne, en **Betalt/Totalt**-kolonne, telleresultater per type og en betalingsdetalj-dialog -- se [Betalte registreringer](paid-registrations#the-registration-roster).

:::tip
Bruk kapasitetsfremdriftslinjen til å overvåke hvor raskt begivenheter fylles opp. Linjen blir rød når en begivenhet er på eller over kapasitet.
:::

## Neste steg

- [Kuratert kalender](curated-calendar) -- Opprett en kalender som trekker fra flere grupper
- [Betalte registreringer](paid-registrations) -- Deltakertyper, tilleggspakker, rabattkoder, betalinger og ventelister
- [Veiledning for begivenhetersregistrering](../guides/event-registration) -- Trinn-for-trinn veiledning for oppsett av begivenhetersregistrering
- [Kalenderøversikt](./) -- Gå tilbake til kalenderøversikten
