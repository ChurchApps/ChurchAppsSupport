---
title: "Gruppemedlemmer"
---

# Gruppemedlemmer

<div class="article-intro">

Når du har opprettet en gruppe, er neste steg å legge til medlemmer. Fra en gruppes detaljside kan du søke etter personer, legge dem til i gruppen, tilordne ledere, sende meldinger og eksportere medlemslisten. Håndtering av gruppemedlemskap er avgjørende for koordinering av små grupper, komiteer og klasser.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du må ha minst én gruppe satt opp i B1 Admin. Se [Opprette grupper](creating-groups.md) hvis du ikke har opprettet en ennå.
- Personene du vil legge til må allerede finnes i din [Personoversikt](../people/adding-people.md).

</div>

## Legge til medlemmer i en gruppe

1. Gå til siden **Grupper** og klikk på gruppen du vil administrere.
2. Klikk på fanen **Medlemmer**.
3. I søkeboksen skriver du inn navnet på personen du vil legge til.
4. Klikk **Legg til** ved siden av personens navn i søkeresultatene.
5. Personen vises nå i listen over gruppemedlemmer.

:::tip
La søkeboksen være tom og klikk **Søk** for å bla gjennom hele personoversikten. Dette er nyttig hvis du er usikker på den nøyaktige stavemåten av noe sitt navn.
:::

## Tilordne gruppeleder

Gruppeleder har spesielle rettigheter – de kan redigere [gruppekalenderen](group-calendar.md), administrere arrangementer og hjelpe til med koordinering av gruppen.

1. Finn personen du vil gjøre til leder i medlemslisten.
2. Klikk på **grønt nøkkelpiktogram** ved siden av deres navn.
3. Personen er nå utpekt som gruppeleder.

For å fjerne lederstatus, klikk på grønt nøkkelpiktogram igjen.

:::info
Ethvert gruppemedlem kan vise gruppekalenderen og arrangementer, men bare ledere kan legge til eller redigere kalenderarrangementer.
:::

## Sende meldinger til gruppemedlemmer

Du kan kommunisere med alle medlemmer av en gruppe direkte fra B1 Admin:

1. Fra gruppens detaljside finner du meldingsområdet.
2. Skriv meldingen din i tekstboksen.
3. Klikk **Send**.

Meldingen din blir levert til alle medlemmer av gruppen.

## Sende e-post til gruppemedlemmer

Du kan sende formaterte e-poster til alle medlemmer av en gruppe:

1. Fra gruppens detaljside klikker du på **e-postikonet**.
2. Dialogboksen Send e-post åpnes og viser hvor mange medlemmer som får e-posten og hvor mange som ikke har e-postadresse registrert.
3. Du kan eventuelt velge en **e-postmal** fra rullegardinlisten, eller skrive en melding fra bunnen av. Klikk **Administrer maler** for å opprette eller redigere maler.
4. Skriv inn en **emnelinje**. Du kan sette inn flettefelt ved å klikke feltchippene: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Skriv **e-postinnholdet** ved hjelp av HTML-redigeringsprogrammet. De samme flettefeltene er tilgjengelige her.
6. Klikk **Send**.
7. En oppsummering viser hvor mange e-poster som ble sendt og hvor mange medlemmer som ble hoppet over (ingen e-postadresse registrert).

:::tip
Opprett gjenbrukbare e-postmaler for gjentakende kommunikasjon, for eksempel ukentlige oppdateringer, arrangementskunngjeringer eller bønneanmodninger. Maler sparer tid og sikrer ensartet meldinger.
:::

## Eksportere gruppedata

For å laste ned medlemslisten som en fil:

1. Fra gruppens detaljside klikker du på **nedlastingsikonet**.
2. En CSV-fil som inneholder gruppens medlemsinformasjon blir lastet ned til datamaskinen din.

Dette er nyttig for å lage trykte medlemslister, importere data til andre verktøy eller holde offline-registreringer. For flere eksportalternativer, se [Eksportere data](../people/exporting-data.md).

## Sende push-meldinger til gruppemedlemmer

Du kan sende en push-melding direkte til alle gruppemedlemmer som har B1.church-appen installert på enheten deres med push-meldinger aktivert.

1. Fra gruppens detaljside klikker du på **klokkeikon** i toppraden (ved siden av e-post- og SMS-ikonene).
2. En dialog åpnes som viser hvor mange av gruppens medlemmer som har push aktivert.
3. Fyll inn meldingsdetaljene:
   - **Tittel** *(obligatorisk)* – En kort oppsummering, opptil 80 tegn.
   - **Melding** *(obligatorisk)* – Meldingsteksten, opptil 240 tegn.
   - **Åpne lenke eller flyeradresse** *(valgfritt)* – En relativ appsti (for eksempel `/mobile/groups`) eller en fullstendig `https://`-adresse som åpnes når meldingen trykkes.
   - **Bildeadresse** *(valgfritt)* – En `https://`-adresse til et bilde som vises ved siden av meldingen på støttede enheter.
4. En direktevisning viser hvordan meldingen vil se ut på enheten.
5. Klikk **Send melding**.

:::info
Push-meldinger leveres bare til gruppemedlemmer som har B1.church PWA installert og ikke har deaktivert push-meldinger. Medlemmer uten registrert push-enhet eller med push slått av telles som hoppet over, og sendeoppsummeringen viser hvor mange som ble nådd kontra hoppet over.
:::

:::tip
Etter sending viser dialogen hvor mange meldinger som ble køet. Hvis de fleste medlemmene vises som hoppet over, husk dem på å besøke B1.church-siden sin, installere den som hjemmeskjermapp og tillate meldinger når det spørres.
:::

## Fjerne medlemmer

For å fjerne noen fra en gruppe finner du deres navn i medlemslisten og klikker på **slettknappen** ved siden av oppføringen deres.

:::info
Å fjerne en person fra en gruppe sletter dem ikke fra personoversikten din. De vil fortsatt vises i [Personoversikt](../people/adding-people.md)-delen og kan legges til gruppen igjen når som helst.
:::