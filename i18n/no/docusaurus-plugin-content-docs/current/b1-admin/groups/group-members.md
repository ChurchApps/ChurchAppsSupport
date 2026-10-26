---
title: "Gruppemedlemmer"
---

# Gruppemedlemmer

<div class="article-intro">

Når du har opprettet en gruppe, er neste steg å legge til medlemmer. Fra gruppens detaljside kan du søke etter personer, legge dem til i gruppen, utpeke ledere, sende meldinger og eksportere medlemslisten. Å administrere gruppemedlemskap er avgjørende for å koordinere smågrupper, komiteer og klasser.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du må ha minst én gruppe opprettet i B1 Admin. Se [Opprette grupper](creating-groups.md) hvis du ikke har laget en ennå.
- Personene du vil legge til, bør allerede være i [personregisteret](../people/adding-people.md). Hvis noen ikke er der, kan du opprette dem fra medlemssøket (se nedenfor).

</div>

## Legge til medlemmer i en gruppe

1. I [Hopp til-menyen](../introduction.md#getting-around-with-the-jump-menu) velger du **People > Groups** og klikker på gruppen du vil administrere.
2. I seksjonen **Members** på gruppesiden klikker du på **All members**. (Team og tjenester åpnes direkte til medlemslisten.)
3. I boksen **Add Person** under medlemslisten skriver du inn navnet på personen du vil legge til, og trykker **Enter** eller klikker på søkeikonet.
4. Klikk på personens navn, eller på legg-til-ikonet ved siden av det, i søkeresultatene.
5. Personen vises nå i gruppens medlemsliste.

:::tip
Før du skriver noe, viser boksen **Add Person** en kort liste over **Recent people** som du kan legge til med ett klikk.
:::

Når du er ferdig, klikker du på lenken **Back to** med gruppens navn for å gå tilbake til gruppesiden. Gruppesiden viser en oppsummering av gruppens **Members**, **Sessions**, **Calendar** og **Health**, hver med en lenke til full visning. Hvis du er en av gruppens ledere, vises også **Leader notes** (se [Lederens notater](#leader-notes) nedenfor). Når skjemaer er knyttet til gruppen, vises også en seksjon **Linked forms** (se [Knyttede skjemaer](#linked-forms) nedenfor).

### Legge til noen som ikke er i B1 ennå

Hvis søket ikke finner noen, viser søket **No records found** med en lenke til **Add New Person**. Klikk på den, skriv inn personens fornavn, etternavn og (valgfritt) e-postadresse, og klikk på **Add**. Den nye personen opprettes i personregisteret ditt og legges til i gruppen i ett steg -- du trenger ikke å søke etter vedkommende igjen.

## Utpeke gruppeledere {#designating-group-leaders}

Gruppeledere har spesielle rettigheter -- de kan redigere [gruppekalenderen](group-calendar.md), administrere arrangementer og hjelpe til med å koordinere gruppen.

1. I gruppens medlemsliste finner du personen du vil gjøre til leder.
2. Klikk på **stjerneikonet** (**Make Leader**) ved siden av navnet.
3. Personen er nå utpekt som gruppeleder og viser et merke for **Leader**.

For å fjerne lederstatus, klikker du på stjerneikonet (**Remove Leader Access**) igjen.

:::info
Alle gruppemedlemmer kan se gruppekalenderen og arrangementene, men bare ledere kan legge til eller redigere kalenderarrangementer.
:::

## Knyttede skjemaer {#linked-forms}

Når et Stand Alone-skjema [er knyttet til gruppen](../forms/creating-forms.md#linking-a-form-to-a-group), viser gruppesiden en seksjon **Linked forms** med navnet på hvert skjema, om det er **Open** eller **Closed**, og hvor mange skjemaer som er knyttet. Seksjonen vises bare for gruppens ledere og for personer som kan administrere skjemaer, og bare når minst ett skjema er knyttet. Administratorer av skjemaer kan klikke på et skjemas navn for å åpne det, eller klikke på **All forms** for å gå til siden Forms.

Gruppeledere leser og skriver ut svarene på disse skjemaene fra gruppens side på [B1.church](../../b1-church/groups/group-details.md#linked-forms).

## Lederens notater {#leader-notes}

Gruppeledere kan føre private notater om gruppen -- for eksempel oppfølginger, bønnebehov eller pastorale bekymringer -- som resten av gruppen aldri ser.

Seksjonen **Leader notes** vises på gruppesiden bare for personer som er ledere i den gruppen. Den viser det nyeste notatet, hvem som skrev det og når, og hvor mange notater det finnes.

1. På gruppesiden klikker du på **All notes** i seksjonen **Leader notes**.
2. Skriv notatet ditt i boksen og legg det ut. Notatene vises med forfatterens navn og bilde, samt datoen og klokkeslettet da hvert notat ble lagt ut.
3. Klikk på lenken **Back to** med gruppens navn for å gå tilbake til gruppesiden.

:::info
Lederens notater er bare synlige for gruppens ledere. Andre medlemmer kan ikke se dem, og det kan heller ikke ansatte eller administratorer -- selv med full tilgang -- med mindre de også er ledere i den gruppen. For å gi en annen person tilgang, [gjør dem til leder](#designating-group-leaders). Ledere ser også disse notatene i seksjonen **Leader notes** på gruppens side på [B1.church](../../b1-church/groups/group-details.md#leader-notes), og på fanen **Groups** på siden [Notes](../people/notes.md) i B1 Admin.
:::

## Sende meldinger til gruppemedlemmer

Du kan kommunisere med alle medlemmer i en gruppe direkte fra B1 Admin:

1. I gruppens medlemsliste klikker du på ikonet **Send a message to members** over listen.
2. Skriv meldingen din i tekstboksen (eller velg en fra **Templates**).
3. Klikk på **Send**.

Meldingen din leveres til alle medlemmer i gruppen.

## Sende e-post til gruppemedlemmer

Du kan sende formaterte e-poster til alle medlemmer i en gruppe:

1. Fra gruppens detaljside klikker du på knappen **Email** på venstre side av siden.
2. Dialogen Send Email åpnes og viser hvor mange medlemmer som vil få e-posten, og hvor mange som ikke har en e-postadresse registrert.
3. Velg eventuelt en **email template** fra nedtrekkslisten, eller skriv en melding fra bunnen av. Klikk på **Manage Templates** for å opprette eller redigere maler.
4. Skriv inn en **subject line**. Du kan sette inn flettefelt ved å klikke på feltbrikkene: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Skriv e-postens **email body** med HTML-redigeringsverktøyet. De samme flettefeltene er tilgjengelige her.
6. Klikk på **Send**.
7. Et sammendrag viser hvor mange e-poster som ble sendt, og hvor mange medlemmer som ble hoppet over (ingen e-post registrert).

:::tip
Lag gjenbrukbare e-postmaler for faste utsendelser som ukentlige oppdateringer, arrangementsannonser eller bønneforespørsler. Maler sparer tid og sikrer et konsekvent budskap.
:::

### Slå på gruppe-e-post for menigheten din {#turning-on-group-email-for-your-church}

Alle menigheter på B1 sender e-post fra den samme adressen, og deler derfor én avsenderreputasjon. For å holde e-posten til alle utenfor spamfolderne, gjennomgår ChurchApps-teamet hver menighet én gang før den kan sende gruppe-e-post.

Hvis menigheten din ikke er gjennomgått ennå, viser dialogen Send Email meldingen **Group email needs a quick review** i stedet for meldingseditoren:

1. Klikk på **Request review**. ChurchApps-støtteteamet varsles.
2. Dialogen endres til **Review requested**. Du kan lukke den.
3. Gruppe-e-post slås vanligvis på innen én virkedag. Åpne dialogen Send Email igjen etter det for å sende meldingen din.

Inntil menigheten din er godkjent, sender B1 heller ikke [oppfølgingse-poster fra skjemaer](../forms/creating-forms.md#sending-a-follow-up-email) eller trinnet **Send email** i [arbeidsflyter](../serving/workflows.md).

:::info Sendegrenser
Etter godkjenning kan en menighet sende opptil 150 e-poster skrevet av menigheten per dag. Grensen øker etter hvert som menigheten bygger opp en ren sendehistorikk, opp til 2 000 per dag. Hvis nylige meldinger har blitt returnert som ulevert eller merket som spam, settes gruppe-e-post på pause, og dialogen ber deg kontakte støtte. Hvis en utsendelse ville overskride den daglige grensen, sender B1 den ikke og viser en feilmelding.
:::

## Sende tekstmeldinger til gruppemedlemmer

Når menigheten din har koblet til en [tjeneste for tekstmeldinger](../settings/church-settings.md#texting), vises en knapp **Text** (**Text this group**) ved siden av knappen **Email** på gruppesiden.

1. Fra gruppens detaljside klikker du på **Text**.
2. Dialogen viser hvor mange medlemmer som vil få teksten. Medlemmer uten registrert mobilnummer, eller som har reservert seg, hoppes over.
3. Skriv meldingen din. For å personalisere den, klikker du på en plassholderbrikke under meldingsboksen -- **First Name**, **Last Name**, **Display Name** eller **Church Name** -- for å sette den inn ved markøren. Hver plassholder fylles ut med mottakerens egne opplysninger når teksten sendes.
4. Klikk på **Send**.

Se [Tilpasse tekstmeldinger med flettefelt](../settings/church-settings.md#personalizing-texts-with-merge-fields) for mer informasjon.

## Eksportere gruppedata

For å laste ned gruppens medlemsliste som en fil:

1. I gruppens medlemsliste klikker du på **Export** over listen.
2. En CSV-fil med gruppens medlemsinformasjon lastes ned til datamaskinen din.

En CSV-eksport er nyttig for å importere data til andre verktøy, eller for å beholde frakoblede kopier. For flere eksportalternativer, se [Eksportere data](../people/exporting-data.md).

## Skrive ut medlemslisten

I gruppens medlemsliste klikker du på ikonet **Print Roll Sheet** (skriver) over listen og velger et oppsett. Siden åpnes i en ny fane, og utskriftsdialogen i nettleseren din vises automatisk.

- **Attendance Sheet** -- en udatert klasseliste med bokser for **Present** og **Absent**, som lærere kan krysse av for hånd. Se [Skrive ut en oppmøteliste](../attendance/recording-attendance.md#printing-a-roll-sheet).
- **Contact Roster** -- en kontaktliste for gruppen, datert i dag og med menighetens logo (**Light Background Logo** fra [Website > Appearance](../website/appearance.md), hvis du har lastet opp en) og menighetens navn under, samt gruppens navn. Hvert medlem har en rad med **Name**, **Phone**, **Email** og **Address**. Ledere listes først og merkes **Leader**, deretter alle andre etter etternavn. Telefonnummeret som vises, er medlemmets mobilnummer, eller hjemme- eller jobbnummeret hvis det ikke finnes et mobilnummer. Kontaktopplysninger står tomme for alle som har reservert seg.

:::warning
En kontaktliste inneholder medlemmenes personlige kontaktopplysninger. Del utskrifter bare med gruppens ledere og andre som trenger dem.
:::

## Sende push-varsler til gruppemedlemmer

Du kan sende et push-varsel direkte til alle gruppemedlemmer som har B1.church-appen installert på enheten sin, med push-varsler slått på.

1. Fra gruppens detaljside klikker du på **Notify** (under knappene **Email** og **Text** -- knappen **Text** vises når en [tjeneste for tekstmeldinger](../settings/church-settings.md#texting) er koblet til).
2. En dialog åpnes og viser hvor mange av gruppens medlemmer som har push slått på.
3. Fyll inn detaljene for varselet:
   - **Title** *(påkrevd)* -- Et kort sammendrag, opptil 80 tegn.
   - **Message** *(påkrevd)* -- Innholdet i varselet, opptil 240 tegn.
   - **Open link or flyer URL** *(valgfritt)* -- En relativ app-sti (for eksempel `/mobile/groups`) eller en full `https://`-nettadresse som varselet åpner når det trykkes på.
   - **Image URL** *(valgfritt)* -- En `https://`-nettadresse til et bilde som vises sammen med varselet på støttede enheter.
4. En direkte forhåndsvisning viser hvordan varselet vil se ut på enheten.
5. Klikk på **Send Notification**.

:::info
Push-varsler leveres bare til gruppemedlemmer som har B1.church-PWA-en installert og ikke har slått av push-varsler. Medlemmer uten registrert push-enhet, eller med push slått av, telles som hoppet over, og sammendraget etter utsendelsen viser hvor mange som ble nådd, og hvor mange som ble hoppet over.
:::

:::tip
Etter utsendelsen viser dialogen hvor mange varsler som ble lagt i kø. Hvis de fleste medlemmer vises som hoppet over, minn dem på å besøke B1.church-nettstedet sitt, installere det som en app på hjemskjermen, og tillate varsler når de blir spurt.
:::

## Fjerne medlemmer

For å fjerne en person fra en gruppe, finner du navnet hennes i medlemslisten og klikker på knappen **remove** ved siden av oppføringen.

:::info
Å fjerne en person fra en gruppe sletter ikke vedkommende fra menighetsregisteret. Personen vil fortsatt vises i seksjonen [People](../people/adding-people.md) og kan legges til i gruppen igjen når som helst.
:::
