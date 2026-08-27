---
title: "Opprett kalendere"
---

# Opprett kalendere

<div class="article-intro">

Opprett en kalender i B1 Admin lar deg bygge en kuratert visning av hendelser ved å koble en eller flere grupper. Hendelser administreres av gruppeleder innen gruppene deres, og kalendarvisningen viser disse hendelsene på ett sted. Administratorer med redigeingstilgang kan legge til eller redigere hendelser for en gruppe. Ikke-admin gruppeleder kan bare administrere hendelser for grupper de leder.

</div>

<div class="prereqs">
<h4>Før du starter</h4>

- Sett opp [gruppene](../groups/creating-groups.md) hvis hendelser du vil inkludere i kalendarvisningen
- Du trenger administrasjonstilgang til Kalendere-delen i B1 Admin

</div>

## Opprett en ny kalender

1. I B1 Admin, naviger til **Nettsted**, og deretter til **Kalendere**-delen.
2. Klikk **Legg til kalender**.
3. Skriv inn et **navn** for kalendarvisningen (for eksempel, "Ungdommens ministeri-hendelser" eller "Hoved kirkegalender").
4. Legg til en valgfri **beskrivelse** for å hjelpe teamet ditt å forstå hva kalendarvisningen er for.
5. Klikk **Opprett** for å lagre den nye kalendarvisningen.

## Kalendarets detalj-side

Etter opprettelse av en kalender, klikk på den for å åpne detalj-siden. Denne siden har to hovedområder:

- **Venstre kolonne** -- En visning av kalendarvisningen som viser hendelser fra tilkoblede grupper.
- **Høyre kolonne** -- Den tilknyttede gruppelisten. Dette er hvor du administrerer hvilke grupper som er inkludert i denne kalendarvisningen.

## Tilknytting av grupper

Grupper som har hendelser i kalendarvisningen vises automatisk i grupplisten på høyre side av detalj-siden.

1. Klikk **Legg til** i gruppedelen for å knytte en gruppe til kalendarvisningen.
2. Velg gruppen fra rullegardinlisten.
3. Velg om du vil inkludere **alle hendelser** fra gruppen eller bare **spesifikke hendelser**.
4. Klikk **Lagre**.

:::tip
Tilknytting av grupper til kalendarvisningen er en kraftig måte å automatisk aggregere hendelser. Når en gruppeleder legger til en hendelse til sin [gruppe](../groups/creating-groups.md), kan den flyte inn i kirkegalendarvisningen uten ekstra arbeid fra deg.
:::

:::info
Hvis du vil opprette en enkelt kalender som trekker hendelser fra mange grupper på tvers av kirken, se [Kuratert kalender](curated-calendar) for en strømlinjeformet tilnærming.
:::

## Aktiver hendelsesregistrering

Du kan aktivere registrering for en hendelse slik at medlemmer kan melde seg på via B1-nettstedet eller mobilapper.

1. Klikk på en eksisterende hendelse eller opprett en ny.
2. I hendelses-redigeringsprogrammet, slå på **Registrering** for å aktivere det.
3. Konfigurer registreringsinnstellingene:
   - **Kapasitet** (valgfri) -- Sett et maksimalt antall registreringer. La stå blank for ubegrenset.
   - **Registrering åpner** -- Datoen og tidspunktet når registrering blir tilgjengelig.
   - **Registrering lukkes** -- Datoen og tidspunktet når registrering lukkes.
   - **Merker** -- Kommaseparerte etiketter (f.eks. "ungdommer, retreat, vbs") for å hjelpe til med kategorisering av registrerbare hendelser.
   - **Registrering spørsmål** -- Vedlegg valgfritt [form](../forms/creating-forms.md) så registranter svarer på ekstra spørsmål (matallergier, t-skjorte størrelse, nødkontakt, osv.) som del av påmeldingen. Velg **Ingen** for å hoppe over spørsmål.
   - **Aktiver venteliste** -- Når hendelsen blir fylt, lar du ytterlige registranter bli med på ventelisten i stedet for å bli avvist. Se [Betalte registreringer](paid-registrations#venteliste).
4. Lagre hendelsen.

For betalte hendelser, bruker den samme innstillingssiden definere priced **Deltaker-typer**, valgfri **Valg** (tillegg), og **rabattkoder**, med betaling samlet gjennom kirkens givergang-leverandør. Se [Betalte registreringer](paid-registrations) for hele gjennomgangen.

Når registrering er aktivert, vil medlemmer se en **Registrer deg for denne hendelsen**-knapp når de viser hendelsen på [B1 nettsted](../../b1-church/events/registering) eller [B1 mobilapp](../../b1-mobile/events/registering). Hvis du vedla et skjema, ser registranter et **Spørsmål**-trinn under registrering og svarene deres lagres sammen med registreringen.

:::info
Registrering spørsmål fungerer bare med skjemaer som **ikke** er merket Begrenset. Et begrenset skjema hoppes over automatisk under registrering i stedet for å vises, så bruk et ubegrenset skjema når du vedlegger spørsmål til en hendelse.
:::

### Administrering av registreringer

For å vise og administrere registreringer for hendelsene dine:

1. Naviger til **Registreringer**-siden i B1 Admin.
2. Du vil se en tabell over alle hendelser med registrering aktivert, viser hendelsestittelen, datoen, gjeldende registreringsantall mot kapasitet, og merker.
3. Klikk på en hendelse for å se hele listen over registreringer, inkludert navn, medlemsantall, deltaker-typer, betalingsstatus og registreringsdato.
4. Fra detalj-siden kan du:
   - **Legg til deltaker** -- Registrer manuelt noen som meldte seg på frakoblet eller over telefonen.
   - **Avbryt** individuelle registreringer
   - **Slett** registreringer permanent
   - **Fremme** ventelistede registreringer når en plass åpner
   - **Eksport CSV** -- Last ned alle registreringer, inkludert deltaker-typer, valg, betalingsbeløp og svar på spørsmål

Hvis hendelsen har registrering spørsmål vedlagt, viser detalj-siden også **Ubesvart spørsmål bare** filter for raskt finne registranter som ikke har sendt svar ennå, og en **Vis svar**-knapp på hver besvart registrering for å se deres svar. Betalte hendelser legger til en **Type**-kolonne, en **Betalt / Total**-kolonne, per-type teller, og en betalingsdetalj dialog -- se [Betalte registreringer](paid-registrations#registrerings-lista).

:::tip
Bruk kapasitetsprosesslinjen for å overvåke hvor raskt hendelsene fylles. Linjen blir rød når en hendelse er på eller over kapasitet.
:::

## Neste steg

- [Kuratert kalender](curated-calendar) -- Opprett en kalender som trekker fra flere grupper
- [Betalte registreringer](paid-registrations) -- Deltaker-typer, tillegg valg, rabattkoder, betalinger og ventelister
- [Hendelsesregistrering veiledning](../guides/event-registration) -- Steg-for-steg veiledning for oppsett av hendelsesregistrering
- [Kalendere oversikt](./) -- Returner til kalendaroversikten
