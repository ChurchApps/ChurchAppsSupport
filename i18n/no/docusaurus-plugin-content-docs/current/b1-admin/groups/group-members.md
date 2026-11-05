---
title: "Gruppemedlemmer"
---

# Gruppemedlemmer

<div class="article-intro">

Når du har opprettet en gruppe, er neste steg å legge til medlemmer. Fra gruppens detaljside kan du søke etter personer, legge dem til i gruppen, utpeke ledere, sende meldinger og eksportere medlemslisten. Å administrere gruppemedlemskap er avgjørende for å koordinere smågrupper, komiteer og klasser.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger minst én gruppe satt opp i B1 Admin. Se [Opprette grupper](creating-groups.md) hvis du ikke har laget en ennå.
- Personene du vil legge til bør allerede finnes i [personkatalogen](../people/adding-people.md). Hvis noen ikke finnes der, kan du opprette dem fra medlemssøket (se nedenfor).

</div>

## Legge til medlemmer i en gruppe

1. I [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) velger du **Personer > Grupper** og klikker på gruppen du vil administrere.
2. I seksjonen **Medlemmer** på gruppesiden klikker du **Alle medlemmer**. (Team og tjenester åpnes direkte til medlemslisten.)
3. I boksen **Legg til person** under medlemslisten skriver du inn navnet på personen du vil legge til, og trykker **Enter** eller klikker søkeikonet.
4. Klikk på personens navn, eller pluss-ikonet ved siden av det, i søkeresultatene.
5. Personen vises nå i gruppens medlemsliste.

:::tip
Før du skriver noe, viser boksen **Legg til person** en kort liste over **nylige personer** du kan legge til med ett klikk.
:::

Når du er ferdig, klikker du lenken **Tilbake til** med gruppens navn for å gå tilbake til gruppesiden. Gruppesiden viser et sammendrag av gruppens **Medlemmer**, **Økter**, **Kalender** og **Helse**, hver med en lenke til full visning. Hvis du er en av gruppens ledere, vises også **Ledernotater** (se [Ledernotater](#leader-notes) nedenfor). Når skjemaer er koblet til gruppen, vises også en seksjon for **Koblede skjemaer** (se [Koblede skjemaer](#linked-forms) nedenfor).

### Legge til noen som ikke er i B1 ennå

Hvis søket ditt ikke finner noen, viser søket **Ingen poster funnet** med en lenke til **Legg til ny person**. Klikk på den, skriv inn personens fornavn, etternavn og eventuelt e-post, og klikk **Legg til**. Den nye personen opprettes i personkatalogen din og legges til i gruppen i ett steg -- du trenger ikke søke etter dem igjen.

## Utpeke gruppeledere {#designating-group-leaders}

Gruppeledere har spesielle rettigheter -- de kan redigere [gruppekalenderen](group-calendar.md), administrere arrangementer og hjelpe til med å koordinere gruppen.

1. Finn personen du vil gjøre til leder i gruppens medlemsliste.
2. Klikk på **stjerneikonet** (**Gjør til leder**) ved siden av navnet deres.
3. Personen er nå utpekt som gruppeleder og viser en merkelapp **Leder**.

For å fjerne lederstatus klikker du stjerneikonet (**Fjern lederrettigheter**) igjen.

:::info
Alle gruppemedlemmer kan se gruppekalenderen og arrangementene, men bare ledere kan legge til eller redigere kalenderarrangementer.
:::

## Koblede skjemaer {#linked-forms}

Når et frittstående skjema er [koblet til gruppen](../forms/creating-forms.md#linking-a-form-to-a-group), viser gruppesiden en seksjon for **Koblede skjemaer** med hvert skjemas navn, om det er **Åpent** eller **Stengt**, og hvor mange skjemaer som er koblet. Seksjonen vises bare for gruppens ledere og for personer som kan administrere skjemaer, og bare når minst ett skjema er koblet. Skjemaadministratorer kan klikke på et skjemas navn for å åpne det, eller klikke **Alle skjemaer** for å gå til siden Skjemaer.

Gruppeledere leser og skriver ut svarene på disse skjemaene fra gruppens side på [B1.church](../../b1-church/groups/group-details.md#linked-forms).

## Ledernotater {#leader-notes}

Gruppeledere kan føre private notater om gruppen -- for eksempel oppfølginger, bønnebehov eller pastorale bekymringer -- som resten av gruppen aldri ser.

Seksjonen **Ledernotater** vises på gruppesiden bare for personer som er ledere i den gruppen. Den viser det nyeste notatet, hvem som skrev det og når, og hvor mange notater det finnes.

1. På gruppesiden klikker du **Alle notater** i seksjonen **Ledernotater**.
2. Skriv notatet ditt i boksen og legg det ut. Notatene vises med forfatterens navn og bilde, og dato og klokkeslett for når hvert ble lagt ut.
3. Klikk lenken **Tilbake til** med gruppens navn for å gå tilbake til gruppesiden.

:::info
Ledernotater er bare synlige for gruppens ledere. Andre medlemmer kan ikke se dem, og det kan heller ikke ansatte eller administratorer -- selv med full tilgang -- med mindre de også er ledere i den gruppen. For å gi en annen person tilgang, [gjør du dem til leder](#designating-group-leaders). Ledere ser også disse notatene i seksjonen **Ledernotater** på gruppesiden på [B1.church](../../b1-church/groups/group-details.md#leader-notes), og på fanen **Grupper** på siden [Notater](../people/notes.md) i B1 Admin.
:::

## Sende meldinger til gruppemedlemmer

Du kan kommunisere med alle medlemmene i en gruppe direkte fra B1 Admin:

1. I gruppens medlemsliste klikker du ikonet **Send en melding til medlemmer** over listen.
2. Skriv meldingen din i tekstboksen (eller velg en fra **Maler**).
3. Klikk **Send**.

Meldingen din leveres til alle medlemmene i gruppen.

## Sende e-post til gruppemedlemmer

Du kan sende formaterte e-poster til alle medlemmene i en gruppe:

1. Fra gruppens detaljside klikker du knappen **E-post** på venstre side av siden.
2. Dialogen Send e-post åpnes og viser hvor mange medlemmer som vil få e-posten, og hvor mange som ikke har en e-postadresse registrert.
3. Velg eventuelt en **e-postmal** fra nedtrekkslisten, eller skriv en melding fra bunnen av. Klikk **Administrer maler** for å lage eller redigere maler.
4. Skriv inn en **emnelinje**. Du kan sette inn flettefelt ved å klikke på feltbrikkene: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`, og **Gruppenavn** (`{{groupName}}`), som fylles ut med gruppens navn.
5. Skriv **e-postinnholdet** i HTML-editoren. De samme flettefeltene er tilgjengelige her.
6. Klikk **Send**.
7. En oppsummering viser hvor mange e-poster som ble sendt, og hvor mange medlemmer som ble hoppet over (ingen e-post registrert).

:::tip
Lag gjenbrukbare e-postmaler for gjentakende kommunikasjon, som ukeoppdateringer, arrangementskunngjøringer eller bønneemner. Maler sparer tid og sikrer ensartet budskap.
:::

### Slå på gruppe-e-post for kirken din {#turning-on-group-email-for-your-church}

Alle kirker på B1 sender e-post fra samme adresse, og de deler derfor én avsenderomdømme. For å holde alles e-post unna søppelpostmapper, gjennomgår ChurchApps-teamet hver kirke én gang før den kan sende gruppe-e-post.

Hvis kirken din ikke er gjennomgått ennå, viser dialogen Send e-post **Gruppe-e-post trenger en rask gjennomgang** i stedet for meldingseditoren:

1. Klikk **Be om gjennomgang**. ChurchApps-støtteteamet får beskjed.
2. Dialogen endres til **Gjennomgang forespurt**. Du kan lukke den.
3. Gruppe-e-post slås vanligvis på innen én arbeidsdag. Åpne dialogen Send e-post igjen etter det for å sende meldingen din.

Før kirken din er godkjent, sender B1 heller ikke [oppfølgings-e-poster fra skjemaer](../forms/creating-forms.md#sending-a-follow-up-email) eller trinnet **Send e-post** i [arbeidsflyter](../serving/workflows.md).

:::info Sendingsgrenser
Etter godkjenning kan en kirke sende opptil 150 kirkeskrevne e-poster per dag. Grensen øker etter hvert som kirken bygger opp en ren sendingshistorikk, opptil 2 000 per dag. Hvis nylige meldinger har blitt returnert eller merket som søppelpost, settes gruppe-e-post på pause, og dialogen ber deg kontakte støtte. Hvis en sending ville gå over den daglige grensen din, sender B1 den ikke og viser en feilmelding.
:::

## Sende tekstmeldinger til gruppemedlemmer {#texting-group-members}

Når kirken din har koblet til en [SMS-leverandør](../settings/church-settings.md#texting), vises en knapp **SMS** (**Send SMS til denne gruppen**) ved siden av knappen **E-post** på gruppesiden.

1. Klikk **SMS** fra gruppens detaljside.
2. Dialogen viser hvor mange medlemmer som får meldingen. Medlemmer uten registrert mobilnummer, eller som har reservert seg, hoppes over.
3. Velg eventuelt en lagret tekstmelding fra **Last inn mal (valgfritt)** for å fylle ut meldingen. Velgeren vises når kirken din har [tekstmaler](../settings/email-templates.md#text-templates); personer som kan redigere innstillinger ser også en lenke til **Administrer maler**.
4. Skriv eller rediger meldingen din. For å personalisere den klikker du på en plassholderbrikke under meldingsboksen -- **Fornavn**, **Etternavn**, **Visningsnavn**, **Kirkens navn** eller **Gruppenavn** -- for å sette den inn der markøren står. Hver plassholder fylles ut med mottakerens egne opplysninger når teksten sendes; **Gruppenavn** blir gruppens navn.
5. Klikk **Send**.

Se [Personalisere tekster med flettefelt](../settings/church-settings.md#personalizing-texts-with-merge-fields) for mer informasjon.

## Eksportere gruppedata

For å laste ned gruppens medlemsliste som en fil:

1. I gruppens medlemsliste klikker du **Eksporter** over listen.
2. En CSV-fil med informasjon om gruppens medlemmer lastes ned til datamaskinen din.

En CSV-eksport er nyttig for å importere data til andre verktøy, eller for å beholde offline-kopier. For flere eksportalternativer, se [Eksportere data](../people/exporting-data.md).

## Skrive ut medlemslisten {#printing-the-member-list}

I gruppens medlemsliste klikker du ikonet **Skriv ut navneliste** (skriver) over listen og velger et oppsett. Siden åpnes i en ny fane, og nettleserens utskriftsdialog vises automatisk.

- **Oppmøteliste** -- en udatert klasseliste med bokser for **Til stede** og **Fraværende**, som lærere kan krysse av for hånd. Se [Skrive ut en navneliste](../attendance/recording-attendance.md#printing-a-roll-sheet).
- **Kontaktliste** -- en kontaktliste for gruppen, datert i dag og med kirkens logo (**logo for lys bakgrunn** fra [Nettsted > Utseende](../website/appearance.md), hvis du har lastet opp en) øverst, med kirkens navn under, og gruppens navn. Hvert medlem har en rad med **Navn**, **Telefon**, **E-post** og **Adresse**. Ledere står først og er merket **Leder**, deretter alle andre etter etternavn. Telefonnummeret som vises er medlemmets mobilnummer, eller hjem- eller jobbnummer hvis det ikke finnes et mobilnummer. Kontaktopplysninger står tomme for dem som har reservert seg.

:::warning
En kontaktliste inneholder medlemmenes personlige kontaktopplysninger. Del utskrevne kopier bare med gruppens ledere og andre som trenger dem.
:::

## Sende push-varsler til gruppemedlemmer {#sending-push-notifications-to-group-members}

Du kan sende et push-varsel direkte til alle gruppemedlemmer som har B1.church-appen installert på enheten sin med push-varsler slått på.

1. Fra gruppens detaljside klikker du **Varsle** (under knappene **E-post** og **SMS** -- SMS-knappen vises når en [SMS-leverandør](../settings/church-settings.md#texting) er koblet til).
2. En dialog åpnes og viser hvor mange av gruppens medlemmer som har push slått på.
3. Fyll inn detaljene for varselet:
   - **Tittel** *(påkrevd)* -- Et kort sammendrag, opptil 80 tegn.
   - **Melding** *(påkrevd)* -- Varslets innhold, opptil 240 tegn.
   - **URL for åpne lenke eller flyer** *(valgfritt)* -- En relativ appsti (for eksempel `/mobile/groups`) eller en full `https://`-URL som varselet åpner når det trykkes på.
   - **Bilde-URL** *(valgfritt)* -- En `https://`-URL til et bilde som vises sammen med varselet på støttede enheter.
4. En direkte forhåndsvisning viser hvordan varselet vil se ut på enheten.
5. Klikk **Send varsel**.

:::info
Push-varsler leveres bare til gruppemedlemmer som har B1.church-PWA-en installert og ikke har slått av push-varsler. Medlemmer uten registrert push-enhet, eller med push slått av, telles som hoppet over, og sendingsoppsummeringen viser hvor mange som ble nådd og hvor mange som ble hoppet over.
:::

:::tip
Etter sending viser dialogen hvor mange varsler som ble lagt i kø. Hvis de fleste medlemmene vises som hoppet over, kan du minne dem på å besøke B1.church-nettstedet sitt, installere det som en app på hjemskjermen og tillate varsler når de blir spurt.
:::

## Fjerne medlemmer

For å fjerne noen fra en gruppe, finner du navnet deres i medlemslisten og klikker knappen **fjern** ved siden av oppføringen.

:::info
Å fjerne en person fra en gruppe sletter dem ikke fra kirkekatalogen din. De vil fortsatt vises i delen [Personer](../people/adding-people.md) og kan legges til i gruppen igjen når som helst.
:::
