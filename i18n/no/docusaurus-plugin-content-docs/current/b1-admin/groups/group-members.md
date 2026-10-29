---
title: "Gruppemedlemmer"
---

# Gruppemedlemmer

<div class="article-intro">

Når du har opprettet en gruppe, er neste steg å legge til medlemmer. Fra en gruppes detaljside kan du søke etter personer, legge dem til i gruppen, utpeke ledere, sende meldinger og eksportere medlemslisten. Å administrere gruppemedlemskap er essensielt for å koordinere smågrupper, komiteer og klasser.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger minst én gruppe satt opp i B1 Admin. Se [Opprette grupper](creating-groups.md) hvis du ikke har opprettet en ennå.
- Personene du vil legge til, bør allerede være i [Personer](../people/adding-people.md)-katalogen din. Hvis noen ikke er der, kan du opprette dem fra medlemssøket (se under).

</div>

## Legge til medlemmer i en gruppe

1. I [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) velger du **Personer > Grupper** og klikker på gruppen du vil administrere.
2. I delen **Medlemmer** på gruppesiden klikker du **Alle medlemmer**. (Team og tjenester åpnes direkte til medlemslisten.)
3. I boksen **Legg til person** under medlemslisten skriver du navnet på personen du vil legge til, og trykker **Enter** eller klikker søkeikonet.
4. Klikk på personens navn, eller på legg-til-ikonet ved siden av, i søkeresultatene.
5. Personen vises nå i gruppens medlemsliste.

:::tip
Før du skriver noe, viser boksen **Legg til person** en kort liste over **Nylige personer** som du kan legge til med ett klikk.
:::

Når du er ferdig, klikker du lenken **Tilbake til** med gruppens navn for å gå tilbake til gruppesiden. Gruppesiden viser et sammendrag av gruppens **Medlemmer**, **Økter**, **Kalender** og **Helse**, hver med en lenke til full visning. Hvis du er en av gruppens ledere, viser den også **Notater for ledere** (se [Notater for ledere](#leader-notes) nedenfor). Når skjemaer er knyttet til gruppen, vises også en seksjon **Koblede skjemaer** (se [Koblede skjemaer](#linked-forms) nedenfor).

### Legge til noen som ikke er i B1 ennå

Hvis søket ditt ikke finner noen, viser søket **Ingen poster funnet** med en lenke **Legg til ny person**. Klikk på den, skriv inn personens fornavn, etternavn og (valgfritt) e-post, og klikk **Legg til**. Den nye personen opprettes i din personkatalog og legges til i gruppen i ett steg — du trenger ikke å søke etter dem igjen.

## Utpeke gruppeledere {#designating-group-leaders}

Gruppeledere har spesielle rettigheter — de kan redigere [gruppekalenderen](group-calendar.md), administrere hendelser og hjelpe til med å koordinere gruppen.

1. I gruppens medlemsliste finner du personen du vil gjøre til leder.
2. Klikk **stjerneikonet** (**Gjør til leder**) ved siden av navnet deres.
3. Personen er nå utpekt som gruppeleder og viser et merke **Leder**.

For å fjerne lederstatus klikker du stjerneikonet (**Fjern lederrettigheter**) igjen.

:::info
Alle gruppemedlemmer kan se gruppekalenderen og hendelsene, men bare ledere kan legge til eller redigere kalenderhendelser.
:::

## Koblede skjemaer {#linked-forms}

Når et frittstående skjema er [koblet til gruppen](../forms/creating-forms.md#linking-a-form-to-a-group), viser gruppesiden en seksjon **Koblede skjemaer** med navnet på hvert skjema, om det er **Åpent** eller **Lukket**, og hvor mange skjemaer som er koblet. Seksjonen vises kun for gruppens ledere og for personer som kan administrere skjemaer, og bare når minst ett skjema er koblet. Administratorer for skjemaer kan klikke på et skjemas navn for å åpne det, eller klikke **Alle skjemaer** for å gå til Skjemaer-siden.

Gruppeledere leser og skriver ut svarene på disse skjemaene fra gruppens side på [B1.church](../../b1-church/groups/group-details.md#linked-forms).

## Notater for ledere {#leader-notes}

Gruppeledere kan føre private notater om gruppen — for eksempel oppfølginger, bønnebehov eller pastorale bekymringer — som resten av gruppen aldri ser.

Seksjonen **Notater for ledere** vises på gruppesiden kun for personer som er ledere i den gruppen. Den viser det nyeste notatet, hvem som skrev det og når, og hvor mange notater det finnes.

1. På gruppesiden klikker du **Alle notater** i seksjonen **Notater for ledere**.
2. Skriv notatet ditt i boksen og legg det ut. Notatene vises med forfatterens navn og bilde, og datoen og klokkeslettet de ble lagt ut.
3. Klikk lenken **Tilbake til** med gruppens navn for å gå tilbake til gruppesiden.

:::info
Notater for ledere er kun synlige for gruppens ledere. Andre medlemmer kan ikke se dem, og heller ikke ansatte eller administratorer — selv med full tilgang — med mindre de også er ledere i den gruppen. For å gi en annen person tilgang, [gjør dem til leder](#designating-group-leaders). Ledere ser også disse notatene i seksjonen **Notater for ledere** på gruppesiden på [B1.church](../../b1-church/groups/group-details.md#leader-notes), og under fanen **Grupper** på siden [Notater](../people/notes.md) i B1 Admin.
:::

## Sende meldinger til gruppemedlemmer

Du kan kommunisere med alle medlemmer av en gruppe direkte fra B1 Admin:

1. I gruppens medlemsliste klikker du ikonet **Send en melding til medlemmene** over listen.
2. Skriv meldingen din i tekstboksen (eller velg en fra **Maler**).
3. Klikk **Send**.

Meldingen din leveres til alle medlemmer av gruppen.

## Sende e-post til gruppemedlemmer

Du kan sende formaterte e-poster til alle medlemmer av en gruppe:

1. Fra gruppens detaljside klikker du **E-post**-knappen på venstre side av siden.
2. Dialogen Send e-post åpnes og viser hvor mange medlemmer som vil motta e-posten, og hvor mange som ikke har en e-postadresse registrert.
3. Velg eventuelt en **e-postmal** fra nedtrekkslisten, eller skriv en melding fra bunnen av. Klikk **Administrer maler** for å opprette eller redigere maler.
4. Skriv inn en **emnelinje**. Du kan sette inn flettefelt ved å klikke på feltbrikkene: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`, og **Gruppenavn** (`{{groupName}}`), som fylles ut med gruppens navn.
5. Skriv **e-postteksten** i HTML-editoren. De samme flettefeltene er tilgjengelige her.
6. Klikk **Send**.
7. Et sammendrag viser hvor mange e-poster som ble sendt, og hvor mange medlemmer som ble hoppet over (ingen e-post registrert).

:::tip
Lag gjenbrukbare e-postmaler for gjentakende kommunikasjon, som ukentlige oppdateringer, arrangementsannonser eller bønneforespørsler. Maler sparer tid og sikrer ensartet budskap.
:::

### Slå på gruppe-e-post for kirken din {#turning-on-group-email-for-your-church}

Alle kirker på B1 sender e-post fra samme adresse, og de deler derfor én avsenderomdømme. For at e-posten til alle skal havne utenfor søppelpostmapper, gjennomgår ChurchApps-teamet hver kirke én gang før den kan sende gruppe-e-post.

Hvis kirken din ikke er gjennomgått ennå, viser dialogen Send e-post **Gruppe-e-post trenger en rask gjennomgang** i stedet for meldingseditoren:

1. Klikk **Be om gjennomgang**. ChurchApps-supportteamet får beskjed.
2. Dialogen endres til **Gjennomgang forespurt**. Du kan lukke den.
3. Gruppe-e-post slås vanligvis på innen én virkedag. Åpne dialogen Send e-post igjen etter det for å sende meldingen din.

Før kirken din er godkjent, sender B1 heller ikke [oppfølgings-e-post for skjemaer](../forms/creating-forms.md#sending-a-follow-up-email) eller trinnet **Send e-post** i [arbeidsflyter](../serving/workflows.md).

:::info Sendegrenser
Etter godkjenning kan en kirke sende opptil 150 e-poster skrevet av kirken per dag. Grensen øker etter hvert som kirken bygger opp en ren sendehistorikk, opp til 2 000 per dag. Hvis nylige meldinger har blitt returnert eller merket som søppelpost, settes gruppe-e-post på pause, og dialogen ber deg kontakte support. Hvis en sending ville gå over den daglige grensen, sender B1 den ikke og viser en feilmelding.
:::

## Sende tekstmeldinger til gruppemedlemmer

Når kirken din har koblet til en [tekstmeldingstjeneste](../settings/church-settings.md#texting), vises en knapp **Tekst** (**Send tekst til denne gruppen**) ved siden av **E-post**-knappen på gruppesiden.

1. Fra gruppens detaljside klikker du **Tekst**.
2. Dialogen viser hvor mange medlemmer som får tekstmeldingen. Medlemmer uten mobiltelefon registrert, eller som har reservert seg, hoppes over.
3. Velg eventuelt en lagret tekstmelding fra **Last inn mal (valgfritt)** for å fylle ut meldingen. Velgeren vises når kirken din har [tekstmaler](../settings/email-templates.md#text-templates); personer som kan redigere innstillinger ser også en lenke **Administrer maler**.
4. Skriv eller rediger meldingen din. For å personalisere den klikker du en plassholderbrikke under meldingsboksen — **Fornavn**, **Etternavn**, **Visningsnavn**, **Kirkens navn** eller **Gruppenavn** — for å sette den inn ved markøren. Hver plassholder fylles ut med mottakerens egne opplysninger når teksten sendes; **Gruppenavn** blir gruppens navn.
5. Klikk **Send**.

Se [Personalisere tekster med flettefelt](../settings/church-settings.md#personalizing-texts-with-merge-fields) for mer informasjon.

## Eksportere gruppedata

For å laste ned gruppens medlemsliste som en fil:

1. I gruppens medlemsliste klikker du **Eksporter** over listen.
2. En CSV-fil med gruppens medlemsinformasjon lastes ned til datamaskinen din.

En CSV-eksport er nyttig for å importere data til andre verktøy, eller for å beholde frakoblede kopier. For flere eksportalternativer, se [Eksportere data](../people/exporting-data.md).

## Skrive ut medlemslisten

I gruppens medlemsliste klikker du ikonet **Skriv ut navneliste** (skriver) over listen og velger et oppsett. Siden åpnes i en ny fane, og nettleserens utskriftsdialog vises automatisk.

- **Oppmøteliste** — en udatert klasseliste med bokser for **Tilstede** og **Fraværende**, som lærere kan krysse av for hånd. Se [Skrive ut en navneliste](../attendance/recording-attendance.md#printing-a-roll-sheet).
- **Kontaktliste** — en kontaktliste for gruppen, datert i dag og med kirkens logo (**Logo for lys bakgrunn** fra [Nettsted > Utseende](../website/appearance.md), hvis du har lastet opp en) med kirkens navn under, og gruppenavnet. Hvert medlem har en rad med **Navn**, **Telefon**, **E-post** og **Adresse**. Ledere listes først og merkes **Leder**, deretter alle andre etter etternavn. Telefonnummeret som vises er medlemmets mobilnummer, eller hjemme- eller jobbnummeret hvis det ikke finnes mobil. Kontaktopplysninger er tomme for alle som har reservert seg.

:::warning
En kontaktliste inneholder medlemmenes personlige kontaktopplysninger. Del utskrevne kopier kun med gruppens ledere og andre som trenger dem.
:::

## Sende push-varsler til gruppemedlemmer

Du kan sende et push-varsel direkte til alle gruppemedlemmer som har B1.church-appen installert på enheten sin med push-varsler slått på.

1. Fra gruppens detaljside klikker du **Varsle** (under knappene **E-post** og **Tekst** — knappen **Tekst** vises når en [tekstmeldingstjeneste](../settings/church-settings.md#texting) er koblet til).
2. En dialog åpnes og viser hvor mange av gruppens medlemmer som har push slått på.
3. Fyll ut varselopplysningene:
   - **Tittel** *(påkrevd)* — et kort sammendrag, opptil 80 tegn.
   - **Melding** *(påkrevd)* — innholdet i varselet, opptil 240 tegn.
   - **Åpne lenke eller flyer-URL** *(valgfritt)* — en relativ app-sti (for eksempel `/mobile/groups`) eller en full `https://`-URL som varselet åpner når det trykkes på.
   - **Bilde-URL** *(valgfritt)* — en `https://`-URL til et bilde som vises sammen med varselet på støttede enheter.
4. En direkte forhåndsvisning viser hvordan varselet vil se ut på enheten.
5. Klikk **Send varsel**.

:::info
Push-varsler leveres kun til gruppemedlemmer som har B1.church-PWA-en installert og ikke har slått av push-varsler. Medlemmer uten registrert push-enhet eller med push av, telles som hoppet over, og sendingsoppsummeringen viser hvor mange som ble nådd og hvor mange som ble hoppet over.
:::

:::tip
Etter sending viser dialogen hvor mange varsler som ble lagt i kø. Hvis de fleste viser som hoppet over, minn dem på å besøke B1.church-siden sin, installere den som en app på hjemskjermen og tillate varsler når de blir spurt.
:::

## Fjerne medlemmer

For å fjerne noen fra en gruppe finner du navnet deres i medlemslisten og klikker **fjern**-knappen ved siden av oppføringen.

:::info
Å fjerne en person fra en gruppe sletter dem ikke fra kirkens katalog. De vises fortsatt i [Personer](../people/adding-people.md)-delen og kan legges til i gruppen igjen når som helst.
:::
