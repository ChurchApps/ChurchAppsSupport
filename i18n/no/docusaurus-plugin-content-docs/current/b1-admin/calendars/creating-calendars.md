---
title: "Opprette kalendere"
---

# Opprette kalendere

<div class="article-intro">

Å opprette en kalender i B1 Admin lar deg bygge en kuratert visning av hendelser ved å koble til én eller flere grupper. Hendelser administreres av gruppeledere innenfor sine grupper, og kalenderen din viser disse hendelsene på ett sted. Selv en domeneadministrator kan ikke legge til eller redigere hendelser direkte i kalenderseksjonen med mindre de er leder for gruppen hendelsene tilhører.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp [gruppene](../groups/creating-groups.md) hvis hendelser du vil inkludere i kalenderen din
- Du trenger administrativ tilgang til Kalender-seksjonen i B1 Admin

</div>

## Opprette en ny kalender

1. I B1 Admin, naviger til **Nettside**, deretter til seksjonen **Kalendere**.
2. Klikk **Legg til kalender**.
3. Skriv inn et **navn** for kalenderen din (for eksempel «Ungdomsarrangementer» eller «Hovedkalender for menigheten»).
4. Legg til en valgfri **beskrivelse** for å hjelpe teamet ditt med å forstå hva denne kalenderen er til for.
5. Klikk **Opprett** for å lagre den nye kalenderen din.

## Kalenderens detaljside

Etter at du har opprettet en kalender, klikk på den for å åpne detaljsiden. Denne siden har to hovedområder:

- **Venstre kolonne** -- En visning av kalenderen som viser hendelser hentet inn fra tilkoblede grupper.
- **Høyre kolonne** -- Listen over tilknyttede grupper. Dette er der du administrerer hvilke grupper som er inkludert i denne kalenderen.

## Koble til grupper

Grupper som har hendelser i kalenderen automatisk vises i gruppelisten på høyre side av detaljsiden.

1. Klikk **Legg til** i gruppeseksjonen for å knytte en gruppe til kalenderen din.
2. Velg gruppen fra nedtrekksmenyen.
3. Velg om du vil inkludere **alle hendelser** fra den gruppen eller kun **bestemte hendelser**.
4. Klikk **Lagre**.

:::tip
Å koble grupper til kalenderen din er en kraftfull måte å automatisk samle hendelser på. Når en gruppeleder legger til en hendelse i [gruppen](../groups/creating-groups.md) sin, kan den flyte inn i menighetens kalender uten noe ekstra arbeid fra deg.
:::

:::info
Hvis du vil opprette én enkelt kalender som henter hendelser fra mange grupper på tvers av menigheten din, se [Kuratert kalender](curated-calendar) for en strømlinjeformet tilnærming.
:::

## Aktivere hendelsespåmelding

Du kan aktivere påmelding for en hvilken som helst kalenderhendelse, slik at medlemmer kan melde seg på gjennom B1-nettsiden eller mobilappen.

1. Klikk på en eksisterende hendelse eller opprett en ny.
2. I hendelsesredigeringen, slå på **Påmelding** for å aktivere den.
3. Konfigurer påmeldingsinnstillingene:
   - **Kapasitet** (valgfritt) -- Angi et maksimalt antall påmeldinger. La stå tomt for ubegrenset.
   - **Påmelding åpner** -- Datoen og klokkeslettet når påmelding blir tilgjengelig.
   - **Påmelding stenger** -- Datoen og klokkeslettet når påmeldingen stenger.
   - **Tagger** -- Kommaseparerte etiketter (f.eks. «ungdom, leir, ferieklubb») for å hjelpe med å kategorisere hendelser med påmelding.
   - **Påmeldingsspørsmål** -- Legg eventuelt ved et [skjema](../forms/creating-forms.md) slik at påmeldte svarer på ekstra spørsmål (matrestriksjoner, t-skjortestørrelse, nødkontakt osv.) som del av påmeldingen. Velg **Ingen** for å hoppe over spørsmål.
   - **Aktiver venteliste** -- Når hendelsen blir fullbooket, la flere påmeldte bli med på en venteliste i stedet for å bli avvist. Se [Betalte påmeldinger](paid-registrations#waitlist).
4. Lagre hendelsen.

For betalte hendelser lar den samme innstillingssiden deg definere prissatte **deltakertyper**, valgfrie **tillegg** (add-ons), og **rabattkoder**, med betaling samlet inn gjennom menighetens givertjenesteleverandør. Se [Betalte påmeldinger](paid-registrations) for en full gjennomgang.

Når påmelding er aktivert, vil medlemmer se en **Meld deg på denne hendelsen**-knapp når de ser hendelsen på [B1-nettsiden](../../b1-church/events/registering) eller [B1 Mobile-appen](../../b1-mobile/events/registering). Hvis du la ved et skjema, ser påmeldte et **Spørsmål**-steg under påmeldingen, og svarene deres lagres sammen med påmeldingen.

:::info
Påmeldingsspørsmål fungerer bare med skjemaer som **ikke** er merket som Begrenset. Et begrenset skjema hoppes automatisk over under påmelding i stedet for å vises, så bruk et ubegrenset skjema når du legger ved spørsmål til en hendelse.
:::

### Administrere påmeldinger

For å se og administrere påmeldinger for hendelsene dine:

1. Naviger til **Påmeldinger**-siden i B1 Admin.
2. Du vil se en tabell over alle hendelser med påmelding aktivert, som viser hendelsens tittel, dato, gjeldende antall påmeldinger mot kapasitet, og tagger.
3. Klikk på en hendelse for å se den fullstendige listen over påmeldinger, inkludert navn, medlemsantall, deltakertyper, betalingsstatus og påmeldingsdato.
4. Fra detaljsiden kan du:
   - **Legg til deltaker** -- Registrer manuelt noen som meldte seg på offline eller over telefon.
   - **Avlys** individuelle påmeldinger
   - **Slett** påmeldinger permanent
   - **Forfrem** ventelistede påmeldinger når en plass blir ledig
   - **Eksporter CSV** -- Last ned alle påmeldinger, inkludert deltakertyper, tillegg, betalingsbeløp og svar på spørsmål

Hvis hendelsen har påmeldingsspørsmål tilknyttet, viser detaljsiden også et **Kun ubesvarte spørsmål**-filter for raskt å finne påmeldte som ikke har sendt inn svar ennå, samt en **Vis svar**-knapp på hver besvarte påmelding for å se svarene deres. Betalte hendelser legger til en **Type**-kolonne, en **Betalt/Totalt**-kolonne, antall per type, og en detaljdialog for betalinger -- se [Betalte påmeldinger](paid-registrations#the-registration-roster).

:::tip
Bruk kapasitetsstolpen for å følge med på hvor raskt hendelser fylles opp. Stolpen blir rød når en hendelse er på eller over kapasitet.
:::

## Neste steg

- [Kuratert kalender](curated-calendar) -- Opprett en kalender som henter fra flere grupper
- [Betalte påmeldinger](paid-registrations) -- Deltakertyper, tilleggsvalg, rabattkoder, betalinger og ventelister
- [Veiledning for hendelsespåmelding](../guides/event-registration) -- Steg-for-steg-veiledning for å sette opp hendelsespåmelding
- [Oversikt over kalendere](./) -- Gå tilbake til kalenderoversikten
