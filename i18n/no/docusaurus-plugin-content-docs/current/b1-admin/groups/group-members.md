---
title: "Gruppemedlemmer"
---

# Gruppemedlemmer

<div class="article-intro">

Når du har opprettet en gruppe, er neste steg å legge til medlemmer. Fra gruppens detaljside kan du søke etter personer, legge dem til i gruppen, tildele ledere, sende meldinger og eksportere medlemslisten. Styring av gruppemedlemskap er essensielt for å koordinere små grupper, utvalg og klasser.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du må ha minst en gruppe satt opp i B1 Admin. Se [Opprett grupper](creating-groups.md) hvis du ikke har opprettet en ennå.
- Personene du vil legge til må allerede finnes i din [Personmappe](../people/adding-people.md).

</div>

## Legge til medlemmer i en gruppe

1. Gå til siden **Grupper** og klikk på gruppen du vil administrere.
2. Klikk på fanen **Medlemmer**.
3. I søkefeltet, skriv inn navn på personen du vil legge til.
4. Klikk **Legg til** ved siden av personens navn i søkeresultatene.
5. Personen vises nå i gruppemedlemslisten.

:::tip
La søkefeltet være tomt og klikk **Søk** for å bla gjennom hele mappen din. Dette er nyttig hvis du ikke er sikker på eksakt stavemåte av noens navn.
:::

## Utnevn gruppeledere

Gruppledere har spesielle rettigheter -- de kan redigere [gruppens kalender](group-calendar.md), administrere arrangementer og hjelpe til med å koordinere gruppen.

1. I gruppemedlemslisten, finn personen du vil gjøre til leder.
2. Klikk på **grønn nøkkelikonen** ved siden av deres navn.
3. Personen er nå utnevnt som gruppleder.

For å fjerne lederstatus, klikk på grønn nøkkelikon igjen.

:::info
Alle gruppemedlemmer kan se gruppens kalender og arrangementer, men bare ledere kan legge til eller redigere kalenderarrangementer.
:::

## Sende meldinger til gruppemedlemmer

Du kan kommunisere med alle medlemmer i en gruppe direkte fra B1 Admin:

1. Fra gruppens detaljside, se etter meldingsområdet.
2. Skriv meldingen din i tekstfeltet.
3. Klikk **Send**.

Meldingen din vil bli levert til alle medlemmer i gruppen.

## Sende e-post til gruppemedlemmer

Du kan sende formatert e-post til alle medlemmer i en gruppe:

1. Fra gruppens detaljside, klikk på **e-postikonet**.
2. Dialogboksen Send e-post åpnes, som viser hvor mange medlemmer som vil motta e-posten og hvor mange som ikke har noen e-postadresse registrert.
3. Velg valgfritt en **e-postmal** fra rullegardinmenyen, eller skriv en melding fra bunnen av. Klikk **Administrer maler** for å opprette eller redigere maler.
4. Skriv inn en **emnelinjen**. Du kan sette inn sammenslåingsfelt ved å klikke på feltbrikker: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Skriv **e-postkroppen** ved hjelp av HTML-redigereren. De samme sammenslåingsfeltene er tilgjengelige her.
6. Klikk **Send**.
7. Et sammendrag viser hvor mange e-poster som ble sendt med hell og hvor mange medlemmer som ble hoppet over (ingen e-postadresse registrert).

:::tip
Opprett gjenbrukbare e-postmaler for gjentakende kommunikasjon som ukentlige oppdateringer, hendelseskunngjøringer eller begjæringer om bønn. Maler sparer tid og sikrer konsistent meldinger.
:::

### Slå på gruppee-post for kirken din

Alle kirker på B1 sender e-post fra samme adresse, så de deler ett sendomdømme. For å holde alle e-poster utenfor spammapper, gjennomgår ChurchApps-teamet hver kirke en gang før den kan sende gruppee-post.

Hvis kirken din ikke har blitt gjennomgått ennå, viser Send e-post-dialogboksen **Gruppee-post trenger en rask gjennomgang** i stedet for meldingsredigereren:

1. Klikk **Forespørsel gjennomgang**. ChurchApps-supportteamet blir varslet.
2. Dialogboksen endres til **Gjennomgang forespurt**. Du kan lukke den.
3. Gruppee-post slås vanligvis på innen en virkedag. Åpne Send e-post-dialogboksen igjen etterpå for å sende meldingen din.

Inntil kirken din er godkjent, sender B1 heller ikke [e-poster med skjemafølging](../forms/creating-forms.md#sending-a-follow-up-email) eller trinnet **Send e-post** i [arbeidsflyter](../serving/workflows.md).

:::info Sendingsgrenser
Etter godkjenning kan en kirke sende opptil 150 kirkeskrevne e-poster per dag. Grensen øker når kirken din bygger opp en ren sendehistorikk, opptil 2 000 per dag. Hvis nylige meldinger spratt tilbake eller ble merket som søppelpost, pauser gruppee-post og dialogboksen ber deg kontakte support. Hvis en sending ville overstige dine daglige grenser, sender B1 det ikke og viser en feil.
:::

## Eksportere gruppedataer

For å laste ned gruppemedlemslisten som en fil:

1. Fra gruppens detaljside, klikk på **nedlastingsikonet**.
2. En CSV-fil som inneholder gruppens medlemsinformasjon vil lastes ned til datamaskinen din.

For å skrive ut et frammøtekjema for en klasse i stedet, bruk **Skriv ut frammøteliste** -- se [Skrive ut en frammøteliste](../attendance/recording-attendance.md#printing-a-roll-sheet).

En CSV-eksport er nyttig for å importere data til andre verktøy eller for å holde frakoblet poster. For flere eksportalternativer, se [Eksportere data](../people/exporting-data.md).

## Sende pushvarsler til gruppemedlemmer

Du kan sende en pushvarsel direkte til alle gruppemedlemmer som har B1.church-appen installert på enheten sin med pushvarsler aktivert.

1. Fra gruppens detaljside, klikk på **klokkeikonen** i topplinjeverktøylinjen (ved siden av e-post- og SMS-ikonene).
2. En dialogboks åpnes som viser hvor mange av gruppens medlemmer som har push aktivert.
3. Fyll ut meldingsdetaljene:
   - **Tittel** *(påkrevd)* -- En kort sammenfatning, opptil 80 tegn.
   - **Melding** *(påkrevd)* -- Meldingsteksten, opptil 240 tegn.
   - **Åpne lenke eller flyerURL** *(valgfritt)* -- En relativ appsti (for eksempel `/mobile/groups`) eller en fullstendig `https://`-URL som varselet åpner når du trykker på det.
   - **Bilde-URL** *(valgfritt)* -- En `https://`-URL til et bilde som vises ved siden av varselet på støttede enheter.
4. En live-forhåndsvisning viser hvordan varselet vil vises på enheten.
5. Klikk **Send varsel**.

:::info
Pushvarsler leveres bare til gruppemedlemmer som har B1.church PWA installert og som ikke har deaktivert pushvarsler. Medlemmer uten registrert pushmekanisme eller med push slått av, telles som hoppet over, og sendeoppsummeringen viser hvor mange som ble nådd versus hoppet over.
:::

:::tip
Etter sending viser dialogboksen hvor mange varsler som ble satt i køen med hell. Hvis de fleste medlemmer vises som hoppet over, minne dem på at de besøker B1.church-nettstedet sitt, installerer det som en hjemmeskjerm-app og tillater varsler når de blir bedt om det.
:::

## Fjerne medlemmer

For å fjerne noen fra en gruppe, finn deres navn i medlemslisten og klikk på **fjern**-knappen ved siden av deres oppføring.

:::info
Hvis du fjerner en person fra en gruppe, blir de ikke slettet fra kirkens mappe din. De vil fortsatt vises i [Personmappen](../people/adding-people.md) og kan legges til gruppen igjen når som helst.
:::
