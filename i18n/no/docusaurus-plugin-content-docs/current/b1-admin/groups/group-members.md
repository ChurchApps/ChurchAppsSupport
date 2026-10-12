---
title: "Gruppemedlemmer"
---

# Gruppemedlemmer

<div class="article-intro">

Når du har opprettet en gruppe, er neste steg å legge til medlemmer. Fra en gruppes detaljside kan du søke etter personer, legge dem til i gruppen, utnevne ledere, sende meldinger og eksportere medlemslisten. Å administrere gruppemedlemskap er avgjørende for å koordinere smågrupper, komiteer og klasser.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger minst én gruppe satt opp i B1 Admin. Se [Opprette grupper](creating-groups.md) hvis du ikke har laget en ennå.
- Personene du vil legge til bør allerede være i [Personer](../people/adding-people.md)-katalogen din. Hvis noen ikke er det, kan du opprette dem fra medlemssøket (se nedenfor).

</div>

## Legge til medlemmer i en gruppe

1. I [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu), velg **Personer > Grupper** og klikk på gruppen du vil administrere.
2. I delen **Medlemmer** på gruppesiden klikker du **Alle medlemmer**. (Team og tjenester åpnes direkte til medlemslisten.)
3. I boksen **Legg til person** under medlemslisten skriver du inn navnet på personen du vil legge til, og trykker **Enter** eller klikker søkeikonet.
4. Klikk på personens navn, eller legg-til-ikonet ved siden av, i søkeresultatene.
5. Personen vises nå i gruppens medlemsliste.

:::tip
Før du skriver noe, viser boksen **Legg til person** en kort liste over **Nylige personer** du kan legge til med ett klikk.
:::

Når du er ferdig, klikk lenken **Tilbake til** med gruppens navn for å gå tilbake til gruppesiden. Gruppesiden viser et sammendrag av gruppens **Medlemmer**, **Økter**, **Kalender** og **Helse**, hver med en lenke til full visning.

### Legge til noen som ikke finnes i B1 ennå

Hvis søket ikke finner noen, viser søket **Ingen poster funnet** med en lenke **Legg til ny person**. Klikk på den, skriv inn personens fornavn, etternavn og (valgfritt) e-post, og klikk **Legg til**. Den nye personen opprettes i din personkatalog og legges til i gruppen i ett steg – du trenger ikke søke etter dem igjen.

## Utnevne gruppeledere

Gruppeledere har spesielle privilegier – de kan redigere [gruppekalenderen](group-calendar.md), administrere arrangementer og hjelpe til med å koordinere gruppen.

1. I gruppens medlemsliste finner du personen du vil gjøre til leder.
2. Klikk på **stjerneikonet** (**Gjør til leder**) ved siden av navnet.
3. Personen er nå utnevnt til gruppeleder og viser et merke **Leder**.

For å fjerne lederstatus, klikk stjerneikonet (**Fjern ledertilgang**) igjen.

:::info
Alle gruppemedlemmer kan se gruppekalenderen og arrangementene, men bare ledere kan legge til eller redigere kalenderarrangementer.
:::

## Sende meldinger til gruppemedlemmer

Du kan kommunisere med alle medlemmene i en gruppe direkte fra B1 Admin:

1. I gruppens medlemsliste klikker du på ikonet **Send en melding til medlemmer** over listen.
2. Skriv meldingen din i tekstboksen (eller velg en fra **Maler**).
3. Klikk **Send**.

Meldingen din leveres til alle medlemmer i gruppen.

## Sende e-post til gruppemedlemmer

Du kan sende formaterte e-poster til alle medlemmer i en gruppe:

1. Fra gruppens detaljside klikker du på knappen **E-post** på venstre side av siden.
2. Dialogen for å sende e-post åpnes og viser hvor mange medlemmer som vil få e-posten, og hvor mange som ikke har en e-postadresse registrert.
3. Velg eventuelt en **e-postmal** fra rullegardinmenyen, eller skriv en melding fra bunnen av. Klikk **Administrer maler** for å lage eller redigere maler.
4. Skriv inn en **emnelinje**. Du kan sette inn flettefelt ved å klikke på feltbrikkene: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Skriv **e-postinnholdet** i HTML-editoren. De samme flettefeltene er tilgjengelige her.
6. Klikk **Send**.
7. Et sammendrag viser hvor mange e-poster som ble sendt, og hvor mange medlemmer som ble hoppet over (ingen e-post registrert).

:::tip
Lag gjenbrukbare e-postmaler for gjentakende kommunikasjon som ukentlige oppdateringer, arrangementsannonseringer eller bønnebehov. Maler sparer tid og sikrer en konsistent melding.
:::

### Slå på gruppe-e-post for menigheten din

Alle menigheter på B1 sender e-post fra samme adresse, og deler dermed ett avsenderomdømme. For å holde alles e-post unna søppelpostmapper, går ChurchApps-teamet gjennom hver menighet én gang før den kan sende gruppe-e-post.

Hvis menigheten din ikke er gjennomgått ennå, viser dialogen for å sende e-post **Gruppe-e-post trenger en rask gjennomgang** i stedet for meldingseditoren:

1. Klikk **Be om gjennomgang**. ChurchApps-støtteteamet får beskjed.
2. Dialogen endrer seg til **Gjennomgang forespurt**. Du kan lukke den.
3. Gruppe-e-post slås vanligvis på innen én virkedag. Åpne dialogen for å sende e-post igjen etter det for å sende meldingen din.

Inntil menigheten din er godkjent, sender B1 heller ikke [oppfølgings-e-poster fra skjemaer](../forms/creating-forms.md#sending-a-follow-up-email) eller trinnet **Send e-post** i [arbeidsflyter](../serving/workflows.md).

:::info Sendegrenser
Etter godkjenning kan en menighet sende opptil 150 menighetsskrevne e-poster per dag. Grensen øker etter hvert som menigheten bygger en ren sendehistorikk, opptil 2 000 per dag. Hvis nylige meldinger har blitt returnert eller merket som søppelpost, settes gruppe-e-post på pause, og dialogen ber deg kontakte støtte. Hvis en utsending vil gå over den daglige grensen, sender B1 den ikke og viser en feilmelding.
:::

## Sende tekstmeldinger til gruppemedlemmer

Når menigheten din har koblet til en [tekstmeldingsleverandør](../settings/church-settings.md#texting), vises en knapp **Tekst** (**Send tekst til denne gruppen**) ved siden av knappen **E-post** på gruppesiden.

1. Fra gruppens detaljside klikker du **Tekst**.
2. Dialogen viser hvor mange medlemmer som vil få teksten. Medlemmer uten registrert mobilnummer, eller som har reservert seg, hoppes over.
3. Skriv meldingen din. For å personalisere den, klikk en plassholderbrikke under meldingsboksen – **Fornavn**, **Etternavn**, **Visningsnavn** eller **Menighetsnavn** – for å sette den inn ved markøren. Hver plassholder fylles inn med mottakerens egne opplysninger når teksten sendes.
4. Klikk **Send**.

Se [Personalisere tekster med flettefelt](../settings/church-settings.md#personalizing-texts-with-merge-fields) for mer detaljer.

## Eksportere gruppedata

For å laste ned gruppens medlemsliste som en fil:

1. I gruppens medlemsliste klikker du **Eksporter** over listen.
2. En CSV-fil med gruppens medlemsinformasjon lastes ned til datamaskinen din.

En CSV-eksport er nyttig for å importere data til andre verktøy, eller for å beholde offline-registreringer. For flere eksportalternativer, se [Eksportere data](../people/exporting-data.md).

## Skrive ut medlemslisten

I gruppens medlemsliste klikker du på ikonet **Skriv ut oppropsliste** (skriver) over listen og velger et oppsett. Siden åpnes i en ny fane, og nettleserens utskriftsdialog vises automatisk.

- **Oppmøteliste** -- en udatert klasseliste med bokser for **Til stede** og **Fraværende** som lærere kan krysse av for hånd. Se [Skrive ut en oppropsliste](../attendance/recording-attendance.md#printing-a-roll-sheet).
- **Kontaktliste** -- en kontaktliste for gruppen, datert i dag og med menighetens logo (**logoen for lys bakgrunn** fra [Nettside > Utseende](../website/appearance.md), hvis du har lastet opp en) med menighetens navn under, og gruppens navn. Hvert medlem har en rad med **Navn**, **Telefon**, **E-post** og **Adresse**. Ledere listes først og merkes **Leder**, deretter alle andre etter etternavn. Telefonnummeret som vises er medlemmets mobilnummer, eller hjemme- eller jobbnummer hvis det ikke finnes et mobilnummer. Kontaktopplysninger er tomme for alle som har reservert seg.

:::warning
En kontaktliste inneholder medlemmenes personlige kontaktinformasjon. Del utskrevne kopier bare med gruppens ledere og andre som trenger dem.
:::

## Sende push-varsler til gruppemedlemmer

Du kan sende et push-varsel direkte til alle gruppemedlemmer som har B1.church-appen installert på enheten sin med push-varsler aktivert.

1. Fra gruppens detaljside klikker du **Varsle** (under knappene **E-post** og **Tekst** – knappen **Tekst** vises når en [tekstmeldingsleverandør](../settings/church-settings.md#texting) er koblet til).
2. En dialog åpnes som viser hvor mange av gruppens medlemmer som har push aktivert.
3. Fyll inn detaljene for varselet:
   - **Tittel** *(påkrevd)* -- Et kort sammendrag, opptil 80 tegn.
   - **Melding** *(påkrevd)* -- Varslets innhold, opptil 240 tegn.
   - **URL til åpen lenke eller flyer** *(valgfritt)* -- En relativ app-sti (for eksempel `/mobile/groups`) eller en full `https://`-URL som varselet åpner når det trykkes på.
   - **Bilde-URL** *(valgfritt)* -- En `https://`-URL til et bilde som vises sammen med varselet på støttede enheter.
4. En direkte forhåndsvisning viser hvordan varselet vil se ut på enheten.
5. Klikk **Send varsel**.

:::info
Push-varsler leveres bare til gruppemedlemmer som har B1.church-PWA-en installert og ikke har slått av push-varsler. Medlemmer uten registrert push-enhet, eller med push slått av, telles som hoppet over, og sammendraget viser hvor mange som ble nådd, og hvor mange som ble hoppet over.
:::

:::tip
Etter sending viser dialogen hvor mange varsler som ble lagt i kø. Hvis de fleste medlemmene vises som hoppet over, minn dem på å besøke B1.church-nettstedet sitt, installere det som en app på hjemmeskjermen og tillate varsler når de blir spurt.
:::

## Fjerne medlemmer

For å fjerne noen fra en gruppe, finn navnet deres i medlemslisten og klikk knappen **fjern** ved siden av oppføringen.

:::info
Å fjerne en person fra en gruppe sletter dem ikke fra menighetskatalogen din. De vil fortsatt vises i delen [Personer](../people/adding-people.md) og kan legges til i gruppen igjen når som helst.
:::
