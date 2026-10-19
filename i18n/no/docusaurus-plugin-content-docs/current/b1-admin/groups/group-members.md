---
title: "Gruppemedlemmer"
---

# Gruppemedlemmer

<div class="article-intro">

Når du har opprettet en gruppe, er neste steg å legge til medlemmer. Fra gruppens detaljside kan du søke etter personer, legge dem til i gruppen, utpeke ledere, sende meldinger og eksportere medlemslisten. Å administrere gruppemedlemskap er viktig for å koordinere smågrupper, komiteer og klasser.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger minst én gruppe satt opp i B1 Admin. Se [Opprette grupper](creating-groups.md) hvis du ikke har opprettet en ennå.
- Personene du vil legge til bør allerede finnes i [Personer](../people/adding-people.md)-katalogen. Hvis noen ikke finnes der, kan du opprette dem fra medlemssøket (se nedenfor).

</div>

## Legge til medlemmer i en gruppe

1. I [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) velger du **Personer > Grupper** og klikker på gruppen du vil administrere.
2. I **Medlemmer**-delen på gruppesiden klikker du på **Alle medlemmer**. (Team og tjenester åpnes direkte til medlemslisten.)
3. I boksen **Legg til person** under medlemslisten skriver du navnet på personen du vil legge til, og trykker **Enter** eller klikker på søkeikonet.
4. Klikk på personens navn, eller på legg-til-ikonet ved siden av, i søkeresultatene.
5. Personen vises nå i gruppens medlemsliste.

:::tip
Før du skriver noe, viser boksen **Legg til person** en kort liste over **Nylige personer** som du kan legge til med ett klikk.
:::

Når du er ferdig, klikker du på lenken **Tilbake til** med gruppens navn for å gå tilbake til gruppesiden. Gruppesiden viser en oppsummering av gruppens **Medlemmer**, **Økter**, **Kalender** og **Helse**, hver med en lenke til hele visningen. Hvis du er en av gruppens ledere, vises også **Ledernotater** (se [Ledernotater](#leader-notes) nedenfor).

### Legge til noen som ikke er i B1 ennå

Hvis søket ikke finner noen, viser søket **Ingen poster funnet** med en lenke til **Legg til ny person**. Klikk på den, skriv inn personens fornavn, etternavn og (valgfritt) e-post, og klikk på **Legg til**. Den nye personen opprettes i din personkatalog og legges til i gruppen i ett steg – du trenger ikke å søke etter vedkommende igjen.

## Utpeke gruppeledere {#designating-group-leaders}

Gruppeledere har spesielle rettigheter – de kan redigere [gruppekalenderen](group-calendar.md), administrere hendelser og hjelpe til med å koordinere gruppen.

1. I gruppens medlemsliste finner du personen du vil gjøre til leder.
2. Klikk på **stjerneikonet** (**Gjør til leder**) ved siden av navnet.
3. Personen er nå utpekt som gruppeleder og viser et **Leder**-merke.

For å fjerne lederstatus klikker du på stjerneikonet (**Fjern ledertilgang**) igjen.

:::info
Alle gruppemedlemmer kan se gruppekalenderen og hendelsene, men bare ledere kan legge til eller redigere kalenderhendelser.
:::

## Ledernotater {#leader-notes}

Gruppeledere kan føre private notater om gruppen – for eksempel oppfølging, bønnebehov eller pastorale bekymringer – som resten av gruppen aldri ser.

Seksjonen **Ledernotater** vises på gruppesiden bare for personer som er ledere i den gruppen. Den viser det nyeste notatet, hvem som skrev det og når, og hvor mange notater det finnes.

1. På gruppesiden klikker du på **Alle notater** i seksjonen **Ledernotater**.
2. Skriv notatet ditt i boksen og publiser det. Notatene vises med forfatterens navn og bilde.
3. Klikk på lenken **Tilbake til** med gruppens navn for å gå tilbake til gruppesiden.

:::info
Ledernotater er bare synlige for gruppens ledere. Andre medlemmer kan ikke se dem, og det kan heller ikke ansatte eller administratorer – selv med full tilgang – med mindre de også er ledere i den gruppen. For å gi en annen person tilgang, [gjør dem til leder](#designating-group-leaders). Ledere ser også disse notatene i seksjonen **Ledernotater** på gruppesiden i [B1.church](../../b1-church/groups/group-details.md#leader-notes).
:::

## Sende meldinger til gruppemedlemmer

Du kan kommunisere med alle medlemmer i en gruppe direkte fra B1 Admin:

1. I gruppens medlemsliste klikker du på ikonet **Send en melding til medlemmene** over listen.
2. Skriv meldingen din i tekstboksen (eller velg en fra **Maler**).
3. Klikk på **Send**.

Meldingen din leveres til alle medlemmer i gruppen.

## Sende e-post til gruppemedlemmer

Du kan sende formaterte e-poster til alle medlemmer i en gruppe:

1. Fra gruppens detaljside klikker du på knappen **E-post** på venstre side av siden.
2. Dialogen for å sende e-post åpnes og viser hvor mange medlemmer som vil motta e-posten, og hvor mange som ikke har en e-postadresse registrert.
3. Velg eventuelt en **e-postmal** fra rullegardinlisten, eller skriv en melding fra bunnen av. Klikk på **Administrer maler** for å opprette eller redigere maler.
4. Skriv inn en **emnelinje**. Du kan sette inn flettefelt ved å klikke på feltbrikkene: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Skriv **e-postteksten** med HTML-editoren. De samme flettefeltene er tilgjengelige her.
6. Klikk på **Send**.
7. Et sammendrag viser hvor mange e-poster som ble sendt, og hvor mange medlemmer som ble hoppet over (ingen e-post registrert).

:::tip
Lag gjenbrukbare e-postmaler for faste utsendelser, som ukentlige oppdateringer, hendelsesannonser eller bønneforespørsler. Maler sparer tid og sikrer konsekvent kommunikasjon.
:::

### Aktivere gruppe-e-post for menigheten din {#turning-on-group-email-for-your-church}

Alle menigheter på B1 sender e-post fra samme adresse, og de deler derfor én avsenderomdømme. For at alles e-post skal holde seg unna søppelpostmapper, gjennomgår ChurchApps-teamet hver menighet én gang før den kan sende gruppe-e-post.

Hvis menigheten din ikke er gjennomgått ennå, viser dialogen for å sende e-post **Gruppe-e-post trenger en rask gjennomgang** i stedet for meldingseditoren:

1. Klikk på **Be om gjennomgang**. ChurchApps-supportteamet får beskjed.
2. Dialogen endres til **Gjennomgang forespurt**. Du kan lukke den.
3. Gruppe-e-post aktiveres vanligvis innen én virkedag. Åpne dialogen for å sende e-post igjen etter det for å sende meldingen din.

Før menigheten din er godkjent, sender B1 heller ikke [oppfølgings-e-poster for skjemaer](../forms/creating-forms.md#sending-a-follow-up-email) eller trinnet **Send e-post** i [arbeidsflyter](../serving/workflows.md).

:::info Sendegrenser
Etter godkjenning kan en menighet sende opptil 150 e-poster skrevet av menigheten per dag. Grensen øker etter hvert som menigheten bygger opp en ren sendehistorikk, opp til 2 000 per dag. Hvis nylige meldinger har blitt returnert som ulevert eller merket som søppelpost, settes gruppe-e-post på pause, og dialogen ber deg kontakte support. Hvis en utsending ville gått over den daglige grensen, sender B1 den ikke og viser en feilmelding.
:::

## Sende tekstmeldinger til gruppemedlemmer

Når menigheten din har koblet til en [SMS-leverandør](../settings/church-settings.md#texting), vises en knapp **Tekst** (**Send tekst til denne gruppen**) ved siden av knappen **E-post** på gruppesiden.

1. Fra gruppens detaljside klikker du på **Tekst**.
2. Dialogen viser hvor mange medlemmer som vil få teksten. Medlemmer uten registrert mobilnummer, eller som har reservert seg, hoppes over.
3. Skriv meldingen din. For å tilpasse den klikker du på en plassholderbrikke under meldingsboksen – **Fornavn**, **Etternavn**, **Visningsnavn** eller **Menighetsnavn** – for å sette den inn der markøren står. Hver plassholder fylles ut med mottakerens egne opplysninger når teksten sendes.
4. Klikk på **Send**.

Se [Tilpasse tekstmeldinger med flettefelt](../settings/church-settings.md#personalizing-texts-with-merge-fields) for mer informasjon.

## Eksportere gruppedata

For å laste ned gruppens medlemsliste som en fil:

1. I gruppens medlemsliste klikker du på **Eksporter** over listen.
2. En CSV-fil med medlemsinformasjonen for gruppen lastes ned til datamaskinen din.

En CSV-eksport er nyttig for å importere data til andre verktøy eller for å beholde frakoblede registreringer. For flere eksportalternativer, se [Eksportere data](../people/exporting-data.md).

## Skrive ut medlemslisten {#printing-the-member-list}

I gruppens medlemsliste klikker du på ikonet **Skriv ut deltakerliste** (skriver) over listen og velger et oppsett. Siden åpnes i en ny fane, og nettleserens utskriftsdialog vises automatisk.

- **Oppmøteliste** – en udatert klasseliste med bokser for **Til stede** og **Fravær** som lærere kan krysse av for hånd. Se [Skrive ut en deltakerliste](../attendance/recording-attendance.md#printing-a-roll-sheet).
- **Kontaktliste** – en kontaktliste for gruppen, datert i dag og med menighetens logo øverst (**logoen for lys bakgrunn** fra [Nettsted > Utseende](../website/appearance.md), hvis du har lastet opp en), med menighetens navn under og gruppenavnet. Hvert medlem har en rad med **Navn**, **Telefon**, **E-post** og **Adresse**. Ledere listes først og merkes **Leder**, deretter alle andre etter etternavn. Telefonnummeret som vises er medlemmets mobilnummer, eller hjemme- eller jobbnummer hvis det ikke finnes mobilnummer. Kontaktopplysninger er tomme for alle som har reservert seg.

:::warning
En kontaktliste inneholder medlemmenes personlige kontaktopplysninger. Del utskrevne kopier bare med gruppens ledere og andre som trenger dem.
:::

## Sende push-varsler til gruppemedlemmer

Du kan sende et push-varsel direkte til alle gruppemedlemmer som har B1.church-appen installert på enheten sin med push-varsler aktivert.

1. Fra gruppens detaljside klikker du på **Varsle** (under knappene **E-post** og **Tekst** – knappen **Tekst** vises når en [SMS-leverandør](../settings/church-settings.md#texting) er koblet til).
2. En dialog åpnes og viser hvor mange av gruppens medlemmer som har push aktivert.
3. Fyll ut opplysningene for varselet:
   - **Tittel** *(påkrevd)* – et kort sammendrag, opptil 80 tegn.
   - **Melding** *(påkrevd)* – innholdet i varselet, opptil 240 tegn.
   - **Åpne lenke eller URL til flyer** *(valgfritt)* – en relativ app-sti (for eksempel `/mobile/groups`) eller en full `https://`-URL som varselet åpner når det trykkes på.
   - **Bilde-URL** *(valgfritt)* – en `https://`-URL til et bilde som vises sammen med varselet på støttede enheter.
4. En direkteforhåndsvisning viser hvordan varselet vil se ut på enheten.
5. Klikk på **Send varsel**.

:::info
Push-varsler leveres bare til gruppemedlemmer som har B1.church-PWA-en installert og ikke har slått av push-varsler. Medlemmer uten registrert push-enhet, eller med push slått av, telles som hoppet over, og sammendraget viser hvor mange som ble nådd og hvor mange som ble hoppet over.
:::

:::tip
Etter utsending viser dialogen hvor mange varsler som ble satt i kø. Hvis de fleste medlemmene vises som hoppet over, minn dem på å besøke B1.church-siden sin, installere den som app på startskjermen og tillate varsler når du blir bedt om det.
:::

## Fjerne medlemmer

For å fjerne noen fra en gruppe finner du navnet deres i medlemslisten og klikker på knappen **Fjern** ved siden av oppføringen.

:::info
Å fjerne en person fra en gruppe sletter ikke vedkommende fra menighetens katalog. De vil fortsatt vises i seksjonen [Personer](../people/adding-people.md) og kan legges til i gruppen igjen når som helst.
:::
