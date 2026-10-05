---
title: "Gruppemedlemmer"
---

# Gruppemedlemmer

<div class="article-intro">

Når du har opprettet en gruppe, er neste steg å legge til medlemmer. På gruppens detaljside kan du søke etter personer, legge dem til i gruppen, utpeke ledere, sende meldinger og eksportere medlemslisten. Å administrere gruppemedlemskap er viktig for å koordinere smågrupper, komiteer og kurs.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger minst én gruppe i B1 Admin. Se [Opprette grupper](creating-groups.md) hvis du ikke har opprettet en ennå.
- Personene du vil legge til bør allerede finnes i [personregisteret](../people/adding-people.md) ditt. Hvis noen ikke gjør det, kan du opprette dem fra medlemssøket (se nedenfor).

</div>

## Legge til medlemmer i en gruppe

1. Velg **Personer > Grupper** i [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) og klikk på gruppen du vil administrere.
2. Klikk på fanen **Medlemmer**.
3. Skriv navnet på personen du vil legge til i søkefeltet.
4. Klikk på **Legg til** ved siden av personens navn i søkeresultatene.
5. Personen vises nå i gruppens medlemsliste.

:::tip
La søkefeltet stå tomt og klikk på **Søk** for å bla gjennom hele registeret ditt. Det er nyttig hvis du ikke er sikker på hvordan et navn staves.
:::

### Legge til noen som ikke finnes i B1 ennå

Hvis søket ikke finner noen, viser det **Ingen poster funnet** med en lenke **Legg til ny person**. Klikk på den, skriv inn personens fornavn, etternavn og eventuelt e-postadresse, og klikk på **Legg til**. Den nye personen opprettes i personregisteret ditt og legges til i gruppen i ett steg, så du trenger ikke søke etter vedkommende på nytt.

## Utpeke gruppeledere

Gruppeledere har spesielle rettigheter. De kan redigere [gruppekalenderen](group-calendar.md), administrere arrangementer og hjelpe til med å koordinere gruppen.

1. Finn personen du vil gjøre til leder i gruppens medlemsliste.
2. Klikk på det **grønne nøkkelikonet** ved siden av navnet.
3. Personen er nå utpekt som gruppeleder.

For å fjerne lederstatusen klikker du på det grønne nøkkelikonet igjen.

:::info
Alle gruppemedlemmer kan se gruppekalenderen og arrangementene, men bare ledere kan legge til eller redigere kalenderarrangementer.
:::

## Sende meldinger til gruppemedlemmer

Du kan kommunisere med alle medlemmene i en gruppe direkte fra B1 Admin:

1. Finn meldingsfeltet på gruppens detaljside.
2. Skriv meldingen i tekstboksen.
3. Klikk på **Send**.

Meldingen leveres til alle medlemmene i gruppen.

## Sende e-post til gruppemedlemmer

Du kan sende formaterte e-poster til alle medlemmene i en gruppe:

1. Klikk på **e-postikonet** på gruppens detaljside.
2. Dialogen Send e-post åpnes og viser hvor mange medlemmer som får e-posten, og hvor mange som ikke har registrert e-postadresse.
3. Velg eventuelt en **e-postmal** fra nedtrekksmenyen, eller skriv en melding fra bunnen av. Klikk på **Administrer maler** for å opprette eller redigere maler.
4. Skriv inn en **emnelinje**. Du kan sette inn flettefelt ved å klikke på feltbrikkene: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Skriv **e-postteksten** i HTML-redigereren. De samme flettefeltene er tilgjengelige her.
6. Klikk på **Send**.
7. En oppsummering viser hvor mange e-poster som ble sendt, og hvor mange medlemmer som ble hoppet over (ingen e-postadresse registrert).

:::tip
Lag gjenbrukbare e-postmaler for tilbakevendende kommunikasjon som ukentlige oppdateringer, kunngjøringer om arrangementer eller bønneemner. Maler sparer tid og sikrer ensartede meldinger.
:::

### Slå på gruppe-e-post for menigheten din

Alle menigheter på B1 sender e-post fra samme adresse, så de deler ett avsenderrykte. For å holde alles e-poster ute av søppelpostmappene gjennomgår ChurchApps-teamet hver menighet én gang før den kan sende gruppe-e-post.

Hvis menigheten din ikke er gjennomgått ennå, viser dialogen Send e-post **Gruppe-e-post trenger en rask gjennomgang** i stedet for meldingsredigereren:

1. Klikk på **Be om gjennomgang**. ChurchApps-supportteamet får beskjed.
2. Dialogen endres til **Gjennomgang forespurt**. Du kan lukke den.
3. Gruppe-e-post slås vanligvis på innen én arbeidsdag. Åpne dialogen Send e-post på nytt etter det for å sende meldingen.

Frem til menigheten din er godkjent sender B1 heller ikke [oppfølgings-e-poster fra skjemaer](../forms/creating-forms.md#sending-a-follow-up-email) eller trinnet **Send e-post** i [arbeidsflyter](../serving/workflows.md).

:::info Sendegrenser
Etter godkjenning kan en menighet sende opptil 150 e-poster skrevet av menigheten per dag. Grensen øker etter hvert som menigheten bygger opp en ren sendehistorikk, opptil 2 000 per dag. Hvis nylige meldinger har sprettet tilbake eller er markert som søppelpost, settes gruppe-e-post på pause, og dialogen ber deg kontakte support. Hvis en utsendelse ville gått over den daglige grensen, sender ikke B1 den og viser en feilmelding.
:::

## Sende tekstmeldinger til gruppemedlemmer

Når menigheten din har koblet til en [tekstmeldingsleverandør](../settings/church-settings.md#texting), vises et tekstikon (**Send tekstmelding til denne gruppen**) i gruppens overskrift.

1. Klikk på **tekstikonet** på gruppens detaljside.
2. Dialogen viser hvor mange medlemmer som får tekstmeldingen. Medlemmer uten registrert mobilnummer eller som har reservert seg, hoppes over.
3. Skriv meldingen. For å personalisere den klikker du på en plassholderbrikke under meldingsboksen (**Fornavn**, **Etternavn**, **Visningsnavn** eller **Menighetsnavn**) for å sette den inn ved markøren. Hver plassholder fylles ut med mottakerens egne opplysninger når tekstmeldingen sendes.
4. Klikk på **Send**.

Se [Personalisere tekstmeldinger med flettefelt](../settings/church-settings.md#personalizing-texts-with-merge-fields) for mer informasjon.

## Eksportere gruppedata

For å laste ned gruppens medlemsliste som en fil:

1. Klikk på **nedlastingsikonet** på gruppens detaljside.
2. En CSV-fil med gruppens medlemsinformasjon lastes ned til datamaskinen din.

For å skrive ut en oppmøteliste for et kurs bruker du i stedet **Skriv ut navneliste**. Se [Skrive ut en navneliste](../attendance/recording-attendance.md#printing-a-roll-sheet).

En CSV-eksport er nyttig for å importere data til andre verktøy eller for å ha offline-registre. For flere eksportalternativer, se [Eksportere data](../people/exporting-data.md).

## Sende pushvarsler til gruppemedlemmer

Du kan sende et pushvarsel direkte til alle gruppemedlemmer som har B1.church-appen installert på enheten sin med pushvarsler slått på.

1. Klikk på **bjelleikonet** i verktøylinjen i overskriften på gruppens detaljside (ved siden av e-post- og tekstikonene. Tekstikonet vises når en [tekstmeldingsleverandør](../settings/church-settings.md#texting) er koblet til).
2. En dialog åpnes og viser hvor mange av gruppens medlemmer som har push slått på.
3. Fyll ut detaljene for varselet:
   - **Tittel** *(påkrevd)* -- En kort oppsummering, opptil 80 tegn.
   - **Melding** *(påkrevd)* -- Selve teksten i varselet, opptil 240 tegn.
   - **Åpne lenke eller flyer-URL** *(valgfritt)* -- En relativ appsti (for eksempel `/mobile/groups`) eller en full `https://`-URL som varselet åpner når det trykkes på.
   - **Bilde-URL** *(valgfritt)* -- En `https://`-URL til et bilde som vises sammen med varselet på enheter som støtter det.
4. En live forhåndsvisning viser hvordan varselet vil se ut på enheten.
5. Klikk på **Send varsel**.

:::info
Pushvarsler leveres bare til gruppemedlemmer som har B1.church-PWA-en installert og ikke har slått av pushvarsler. Medlemmer uten registrert pushenhet eller med push avslått telles som hoppet over, og oppsummeringen viser hvor mange som ble nådd og hvor mange som ble hoppet over.
:::

:::tip
Etter utsendelsen viser dialogen hvor mange varsler som ble satt i kø. Hvis de fleste medlemmene vises som hoppet over, kan du minne dem på å gå til B1.church-nettstedet sitt, installere det som en app på startskjermen og tillate varsler når de blir spurt.
:::

## Fjerne medlemmer

For å fjerne noen fra en gruppe finner du navnet i medlemslisten og klikker på knappen **fjern** ved siden av oppføringen.

:::info
Når du fjerner en person fra en gruppe, slettes ikke vedkommende fra menighetsregisteret. Personen vises fortsatt i delen [Personer](../people/adding-people.md) og kan legges til i gruppen igjen når som helst.
:::
