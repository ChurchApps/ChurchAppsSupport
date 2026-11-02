---
title: "Arbeidsflyter"
---

# Arbeidsflyter

<div class="article-intro">

Arbeidsflyter flytter personer gjennom en rekke steg på en visuell tavle. Hver person blir et kort som beveger seg fra ett steg til neste -- fra oppfølging av førstegangsgjester, til en medlemsprosess, til en takk til førstegangsgivere, og alt annet der du må følge mange personer gjennom de samme trinnene. Et steg kan be en frivillig om å gjøre noe (ringe, ha en samtale) **og** kjøre automatiske handlinger på egen hånd -- sende en e-post eller SMS, vente noen dager, legge personen til i en gruppe -- slik at arbeidsflyter håndterer både den menneskelige oppfølgingen og arbeidet rundt den. Arbeidsflyter utvider [oppgaver](./tasks.md) til en dra-og-slipp Kanban-tavle, slik at ingen og ingenting faller mellom stolene.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Kontroller at personene du vil følge opp finnes i B1 Admin
- Gjør deg kjent med hvordan [oppgaver](./tasks.md) fungerer, siden hvert kort på en tavle er en oppgave
- For å bruke handlingen **Send e-post** må du først opprette e-postmalene du vil sende (administreres under **Innstillinger → E-postmaler**)
- For å bruke handlingen **Send SMS** må du først koble til en [SMS-leverandør](../settings/church-settings.md#texting)
- Du trenger riktig oppgavetillatelse. Å se, redigere kort og administrere arbeidsflyter er separate tillatelsesnivåer (se [Roller og tillatelser](../settings/roles-permissions.md))

</div>

## Se arbeidsflyter

Åpne [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin), utvid **Tjeneste** og klikk **Arbeidsflyter**. Arbeidsflytene dine listes i en tabell som viser hver enkelt sin **kategori** og **status** (**Aktiv** eller **Inaktiv**). Hvis du bruker kategorier, lar fanene over listen deg filtrere den etter kategori. Klikk på en arbeidsflyt for å åpne tavlen.

## Opprette en arbeidsflyt

1. På siden Arbeidsflyter klikker du **Legg til arbeidsflyt**.
2. Velg hvordan du vil starte:
   - **Tom arbeidsflyt** -- start fra bunnen av og bygg dine egne steg.
   - **Fra en mal** -- start med et ferdig sett med steg du kan redigere. Innebygde maler inkluderer:
     - **Oppfølging av ny besøkende** -- Send velkomst-e-post → Personlig telefonsamtale → Inviter til neste steg → Tilkoblet
     - **Medlemsklasse** -- Uttrykk interesse → Meld deg på klassen → Delta på klassen → Fullfør medlemskap
     - **Takk til førstegangsgiver** -- Send takkekort → Del hvilken effekt gaven får → Forvaltet
     - **Bekreftelse av tjenesteoppdrag** -- Be om og vent på svar → Ring frivillig om ubesvart forespørsel (se [Bekreftelser av tjenesteoppdrag](#serving-assignment-confirmations))

   Å bygge stegene i en mal kan ta et øyeblikk. Mens det pågår, står det **Oppretter ...** på knappen **Legg til arbeidsflyt**, og den kan ikke klikkes igjen, slik at du ikke ender opp med et duplikat. Hvis noe går galt, viser siden *«Arbeidsflyten kunne ikke opprettes. Prøv igjen.»*
3. Gi arbeidsflyten et **navn**.
4. Eventuelt tilordne en **kategori** for å gruppere beslektede arbeidsflyter. Du kan opprette en ny kategori rett fra nedtrekkslisten.
   For en tom arbeidsflyt velger du også dens **formål**: **Oppfølging av personer** (den vanlige typen) eller **Bekreftelse av tjenesteoppdrag**. Formålet kan ikke endres etter at arbeidsflyten er opprettet.
5. La arbeidsflyten være **Aktiv** slik at personer kan legges til den, eller sett den til **Inaktiv** for å skjule den fra listene for å legge til i arbeidsflyt.
6. Klikk **Lagre**.

:::tip
Bruk knappen **Dupliser** på listen over arbeidsflyter for å kopiere en eksisterende arbeidsflyt -- inkludert steg, automatiske handlinger og ruting -- som utgangspunkt for en ny.
:::

## Bygge tavlen med steg

Hver arbeidsflyttavle består av **steg**, vist som kolonner fra venstre til høyre. Åpne en arbeidsflyt og bruk **Legg til steg** for å opprette hvert trinn i prosessen din.

Når du legger til eller redigerer et steg, kan du konfigurere:

- **Stegnavn** -- kolonneoverskriften (for eksempel «Velkomstsamtale» eller «Venter på påmelding»).
- **Frist om (dager)** -- setter automatisk en frist når et kort går inn i dette steget. Kort som har passert fristen, markeres som **Forfalt**.
- **Standard ansvarlig** -- personen eller gruppen nye kort på dette steget tildeles automatisk. Når den standard ansvarlige er en person, får de et varsel om at et kort er tildelt dem.
- **Automatiske handlinger** -- ting systemet gjør på egen hånd når et kort kommer inn (se nedenfor).
- **Ruting** -- hvor kortet går når det forlater steget (se [Ruting](#routing-cards-with-outcomes-and-conditions)).

Dra stegkolonnene i den rekkefølgen som samsvarer med prosessen din. Rekkefølgen definerer også standardveien et kort tar når ingen annen ruting gjelder.

:::info
Lagre et nytt steg først. Automatiske handlinger og ruting knyttes til steget, så redigeringsprogrammet låser opp disse delene når steget finnes.
:::

## Automatiske handlinger

Hvert steg kan ha en liste med **automatiske handlinger** som kjører av seg selv øyeblikket et kort **går inn** i steget -- før noen rører det. Dette er hvordan et steg både ber en frivillig om noe *og* tar seg av det rutinemessige arbeidet rundt oppfølgingen.

I steg-redigeringsprogrammet åpner du **Automatiske handlinger**, klikker **Legg til handling**, velger en type og fyller ut innstillingene. Legg til så mange du trenger; de kjører **fra topp til bunn i rekkefølge**. Klikk **Lagre** på steget for å lagre steget og alle handlingene sammen. Å fjerne en handling med søppelbøtteikonet trer i kraft med en gang.

| Handling | Hva den gjør |
|---|---|
| **Send e-post** | Sender personen en e-postmal du velger. Du kan overstyre emnelinjen. |
| **Send SMS** | Sender personen en melding du skriver, via kirkens [SMS-leverandør](../settings/church-settings.md#texting). |
| **Vent** | Setter kortet på pause i et antall dager før det fortsetter (se nedenfor). |
| **Legg til i gruppe** | Legger personen til i en [gruppe](../groups/index.md) du velger. |
| **Fjern fra gruppe** | Fjerner personen fra en gruppe du velger. |
| **Registrer oppmøte** | Markerer personen som til stede på en gruppes gudstjenestetid som pågår (se nedenfor). |
| **Legg til i arbeidsflyt** | Starter personen i en annen arbeidsflyt -- nyttig for overlevering mellom prosesser. |
| **Legg til notat** | Registrerer et notat i kortets historikk. |
| **Sett felt** | Oppdaterer et felt på personens post: Medlemsstatus, Sivilstatus, Kjønn, By, Fylke eller Postnummer. |
| **Webhook** | Sender kortets detaljer til en ekstern nettadresse (URL) du oppgir, for å koble til andre systemer. |
| **Opprett oppgave** | Oppretter en [oppgave](./tasks.md) med tittelen og beskrivelsen du skriver inn, tildelt den du velger. |
| **Varsle person** | Sender en ansatt eller frivillig du velger en e-post og et B1-varsel om kortet (se nedenfor). |

Etter at alle handlingene i et steg er ferdige, **hviler kortet på det steget** slik at en person kan jobbe med det -- med mindre steget har en automatisk rute som flytter det videre (se [Helautomatiske steg](#fully-automated-steps)).

:::info
Automatiske handlinger kjører bare når et kort kommer inn gjennom den vanlige flyten -- når det først legges til, når et utfall eller en automatisk rute tar det inn, eller etter at en Vent er ferdig. De kjører **ikke** på nytt når en ansatt manuelt drar et kort til steget eller sender det tilbake, slik at en person ikke får den samme e-posten to ganger.
:::

### Sende e-post

Velg **Send e-post**, velg en av e-postmalene dine, og skriv eventuelt inn et eget emne. Når et kort går inn i steget, mottar personen den e-posten automatisk. (Hvis personen ikke har en e-postadresse registrert, hopper steget bare over denne handlingen.) [Flettefelt](../settings/email-templates.md#merge-fields) i malen, for eksempel `{{firstName}}`, fylles ut med personens egne detaljer.

Når e-posten sendes, registrerer kortets historikk **E-post sendt**. Hvis den ikke kan sendes -- for eksempel fordi kirkens e-post ikke er godkjent ennå, eller den daglige grensen er nådd -- legges det ikke til noen oppføring om «E-post sendt».

:::info
E-poster fra arbeidsflyter sendes bare etter at kirken din er godkjent til å sende gruppe-e-post, og de teller mot kirkens daglige e-postgrense. Se [Slå på gruppe-e-post for kirken din](../groups/group-members.md#turning-on-group-email-for-your-church). Handlingen **Send e-post** varsler deg i steg-redigeringsprogrammet når disse e-postene ikke vil bli sendt: *«Kirkens e-post er ikke godkjent ennå ...»* hvis godkjenning fortsatt venter, eller *«Kirkens e-post er satt på pause ...»* hvis nylige meldinger har blitt returnert eller meldt som søppelpost.
:::

### Registrere oppmøte

Velg **Registrer oppmøte** og klikk **Velg gruppe** for å velge gruppen oppmøtet skal registreres for. Når handlingen kjører, markeres personen som til stede på gruppens gudstjenestetid som pågår -- akkurat som om de hadde sjekket inn. Dette er nyttig sammen med en trigger som legger personer til i arbeidsflyten når de ankommer, slik at de telles uten en egen innsjekking.

- Oppmøte måles i det øyeblikket kortet ble **opprettet**, så en **Vent** tidligere i arbeidsflyten vil ikke skyve det forbi gudstjenesten.
- Bare gudstjenestetider med en dag og starttid teller. Hvis ingen av gruppens gudstjenestetider pågår på det tidspunktet, registreres ingenting, og kortets historikk noterer **Ingen planlagt gudstjeneste pågår -- oppmøte ikke registrert**.
- Når oppmøte registreres, viser kortets historikk **Oppmøte registrert** etterfulgt av gruppens navn. Å kjøre handlingen igjen for samme gudstjeneste teller ikke personen to ganger.

### Varsle en person

Velg **Varsle person**, klikk **Velg person**, og skriv eventuelt inn en **melding**. Når et kort går inn i steget, får den personen en e-post og et B1-varsel med navnet på personen på kortet, navnene på arbeidsflyten og steget, meldingen din, og en lenke for å åpne kortet. Bruk det til å gi en ansatt eller ledere i en tjeneste et varsel -- for eksempel *«Varsle pastoren når noen når steget Medlemsintervju.»* Kortets historikk registrerer **Varslet** etterfulgt av personens navn.

### Sende en SMS {#sending-a-text}

Velg **Send SMS** og skriv inn **SMS-meldingen** (opptil 1 600 tegn). Når et kort går inn i steget, mottar personen SMS-en på mobiltelefonen sin. For å personalisere meldingen klikker du på en brikke under meldingsboksen -- **Fornavn**, **Etternavn**, **Visningsnavn** eller **Kirkens navn** -- for å sette inn `{{firstName}}`, `{{lastName}}`, `{{displayName}}` eller `{{churchName}}` der markøren står. Hver av dem fylles ut med personens detaljer når SMS-en sendes.

- Hvis personen ikke har et mobilnummer registrert, sendes ingen SMS, og kortets historikk registrerer **SMS hoppet over: ingen mobiltelefon**.
- Hvis personen har meldt seg av, sendes ingen SMS, og kortets historikk registrerer **SMS hoppet over: meldt av**.
- Når SMS-en sendes, registrerer kortets historikk **SMS sendt**. Hvis sendingen mislykkes -- for eksempel fordi ingen SMS-leverandør er koblet til, eller kirken din er tom for SMS-kreditter -- logges feilen i kortets historikk, og de gjenværende handlingene i steget kjører fortsatt.

:::warning
SMS-meldinger sendes via kirkens egen [SMS-leverandør](../settings/church-settings.md#texting). Hvis ingen leverandør er koblet til, advarer handlingsredigeringsprogrammet *«Ingen SMS-leverandør er satt opp»*, og SMS-meldinger sendes ikke.
:::

### Vente noen dager (dryppsekvenser)

Handlingen **Vent** holder et kort i det antall dager du angir. Mens det venter, vises kortet som **Utsatt**. B1 sjekker for ferdige ventetider hvert 30. minutt, så et kort tas opp igjen innen omtrent en halv time etter at ventetiden er over. Når ventetiden er over:

1. Alle **gjenværende handlinger i samme steg** kjører -- slik at du kan bygge en dryppsekvens som **Send e-post → Vent 3 dager → Send en påminnelses-e-post**.
2. Deretter, hvis steget har en automatisk rute, flytter kortet seg videre; ellers hviler det på steget for at en person skal plukke det opp.

:::tip
En **Vent** helt i begynnelsen av et steg er en enkel måte å "holde" et kort før det vises for en frivillig -- for eksempel *Vent 7 dager, deretter tar en coach kontakt*.
:::

## Legge personer til som kort

Det finnes flere måter å legge personer på en tavle:

- **Fra tavlen** -- Klikk **Legg til kort** nederst i en stegkolonne og velg en person. Du kan også velge en gruppe, og hvert medlem av den gruppen legges til som kort.
- **Fra en persons post** -- Bruk **Legg til i arbeidsflyt** på en persons side for å plassere dem i en arbeidsflyt.
- **Fra personsøk** -- Velg flere personer og bruk massehandlingen **Legg til i arbeidsflyt** for å legge til alle på en gang.
- **Automatisk med en trigger** -- Legg til personer når noe skjer, for eksempel en skjemainnsending eller en første gave (se [Triggere](#triggers) nedenfor).

Å legge til noen manuelt, eller med en handling **Legg til i arbeidsflyt** i et steg, gir aldri vedkommende et nytt åpent kort i samme arbeidsflyt. Hvis de allerede har et åpent kort, hoppes de over (ved masseleggelse får bare personene uten et kort nye kort). Når kortet deres er lukket, kan du legge dem til igjen. Triggere følger i stedet sin egen innstilling for **Bare én gang per person**.

## Arbeide med tavlen {#working-the-board}

Åpne en arbeidsflyt for å se tavlen. Hvert kort viser personens navn, hvem det er tildelt, og en brikke for frist eller status (**Forfalt** eller **Utsatt**). En stegkolonne viser også små merker for automatiske handlinger den kjører, og merknader for ruting, slik at du får et oversiktskart over hvordan kortene flyter.

- **Flytt et kort** -- Dra et kort fra én kolonne til den neste når personen går videre.
- **Åpne et kort** -- Dobbeltklikk på et kort (eller klikk på det) for å åpne detaljskuffen, der du kan endre steg, tildele det på nytt, legge til notater og se gjennom det som allerede har skjedd.

Fra kortskuffen kan du:

- **Tildele** kortet til en annen person eller gruppe.
- **Utsette** kortet i 1 dag, 3 dager eller 1 uke for midlertidig å skjule fristen.
- **Send tilbake** til forrige steg eller **Hopp over** til neste steg.
- **Fest tildelingen** -- behold samme eier på kortet selv når det beveger seg mellom steg. Som standard, når et kort flyttes til et nytt steg, tildeles det på nytt til stegets standard ansvarlige; festing beholder den nåværende personen ansvarlig gjennom hele prosessen.
- **Fullfør** kortet for å avslutte det, eller velg en **utfallsknapp** hvis steget har utfall konfigurert (se [Ruting](#routing-cards-with-outcomes-and-conditions)).
- **Fjern kort** -- ta et kort av tavlen uten å fullføre det, for eksempel når noen ble lagt til ved en feil. Etter at du har bekreftet, lukkes kortet og fjernes fra alles liste. Ingen utfall, ruter eller stegshandlinger kjører, og historikken beholdes med en oppføring om **Fjernet**. For et kort for [bekreftelse av tjenesteoppdrag](#serving-assignment-confirmations) lukker fjerning forespørselen på samme måte.
- **Legge til notater** og se kortets **Aktivitet** -- en logg over automatiske handlinger som har kjørt (e-poster sendt, ventetider osv.), hver med dato og klokkeslett for når de skjedde.

For et kort om en person viser skuffen også personens mobiltelefon og e-post som lenker du kan trykke på for å ringe eller sende e-post, pluss en lenke **Vis profil** hvis du har tillatelse til å se personer. Personen kortet er tildelt, ser telefonen og e-posten selv uten tilgang til Personer.

Notater lagres med kortet. Alle som kan åpne kortet -- inkludert personen eller gruppen det er tildelt -- kan lese notatene og legge til sine egne. Personer som ikke kan åpne kortet, kan ikke se notatene.

### Massehandlinger

Kryss av i boksene på flere kort for å handle på dem samlet. For å velge hvert kort i et steg på en gang, kryss av boksen **Velg alle** i stegkolonnens overskrift; kryss av igjen for å fjerne valget. En verktøylinje vises som lar deg **Fullfør**, **Utsett**, **Tildel** (tildele på nytt) eller **Flytt til ...** et annet steg for alle valgte kort på en gang.

## Ruting av kort med utfall og betingelser {#routing-cards-with-outcomes-and-conditions}

Ruting styrer hvor et kort går når det forlater et steg. Åpne et steg-redigeringsprogram for å konfigurere to typer ruting.

### Utfallsknapper

Utfall er knapper som vises i kortskuffen når du fullfører et kort på det steget. I stedet for én enkelt **Fullfør**-knapp kan du tilby valg som «Ble med i en gruppe» eller «Ikke interessert». Hvert utfall kan:

- Sende kortet til **et annet steg** i denne arbeidsflyten,
- **Overlevere kortet** til en helt annen arbeidsflyt, eller
- **Lukke** kortet.

Dette lar én beslutning dele personen inn i ulike veier.

### Automatisk ruting (betinget)

Automatiske ruter flytter et kort videre **øyeblikket det går inn i et steg** (og etter at de automatiske handlingene er ferdige), uten at noen klikker, hvis personen samsvarer med et sett betingelser. Legg til en rute, velg målsteget, og definer én eller flere **betingelser** (for eksempel en persons kirkested, alder eller medlemsstatus). Tekstfelt kan matches eksakt eller med **inneholder**, **begynner med** eller **slutter med**. En rute uten betingelser samsvarer med alle.

Datobetingelser (Dagens dato, Fødselsdato eller Jubileum) kan sammenligne hele datoen eller bare en del av den -- ukedagen, **Dag i måneden**, **Måned** eller antall år som har gått. For en persons Fødselsdato eller Jubileum tilbyr **Dag i måneden** et relativt alternativ **I dag**, slik at en betingelse som *Fødselsdato · Dag i måneden = I dag* samsvarer med personer hvis bursdag faller på dagens dato i måneden. **Måned** tilbyr **Forrige måned**, **Gjeldende måned** og **Neste måned**. Relative verdier som disse regnes ut med kirkens tidssone, slik at de stemmer med kirkens kalenderdag i stedet for serverens.

Gruppen **Gaver** med betingelser har **Tidligere fast giver**, som finner personer som pleide å gi regelmessig og deretter sluttet. Still inn tre tall: *Ga i minst* **3** *av de siste* **12** *ukene, deretter ingenting de siste* **3** *ukene* (dette er standardverdiene). Ukene telles bakover fra i dag i kirkens tidssone, og en refundert gave teller ikke. Den er mest nyttig med en [tidsplantrigger](#schedule-triggers) -- for eksempel en ukentlig regel som legger tidligere faste givere til en oppfølgingstavle for omsorg. Betingelsen ser bare på gavedatoer, aldri beløp, og kort og varsler viser aldri beløp. Fordi den avslører hvem som har sluttet å gi, ser bare personer som kan se gaver dette alternativet, og bare de kan legge det til, endre det eller fjerne det.

Hvis betingelsene til en rute ikke kan sjekkes av en eller annen grunn, regnes ruten som ikke samsvarende. Kortet blir værende på steget (eller følger en annen rute som samsvarer), i stedet for å sitte fast.

:::info
På tavlen viser hver stegkolonne små merknader som beskriver ruting -- for eksempel en utfallsetikett eller «hvis samsvarer» etterfulgt av en pil til målsteget eller arbeidsflyten.
:::

## Helautomatiske steg {#fully-automated-steps}

Du kan få et steg til å kjøre helt av seg selv, uten at noen jobber med det. Gi steget sine **automatiske handlinger**, og legg til en **automatisk rute** (uten betingelser) som peker til neste steg. Når et kort kommer inn, kjører handlingene, og deretter flytter ruten det videre med en gang -- kortet går rett gjennom.

:::tip
Kombiner dette med **Vent**: *Send velkomst-e-post → Vent 3 dager → gå automatisk videre til steget «Personlig samtale».* E-posten og timingen håndteres for deg, og en frivillig ser kortet først når det er tid for den menneskelige kontakten.
:::

## Triggere {#triggers}

Triggere legger personer til i en arbeidsflyt automatisk når noe skjer, slik at du aldri må legge til kort for hånd. På en arbeidsflyttavle klikker du fanen **Triggere**, og deretter **Legg til trigger**. Det finnes to typer:

### Hendelsestriggere

Utløses så snart en post endres i B1. Velg hendelsen, og legg eventuelt til **betingelser** slik at bare samsvarende personer legges til:

- **Person · Opprettet / Oppdatert** -- f.eks. legg til alle hvis status blir *Besøkende* eller *Gjest* (statusen som gis til personer som registrerer seg selv).
- **Gave · Opprettet** -- f.eks. legg til en førstegangs- eller stor gave i en takkearbeidsflyt (match på beløp, fond eller metode).
- **Gruppe · Medlem ble med** / **Gruppe · Opprettet**.
- **Skjema · Sendt inn** -- legg til alle som sender inn et valgt skjema (flott for et kort «Jeg er ny» eller «Kontakt»).

### Tidsplantriggere {#schedule-triggers}

Kjører gjentatte ganger -- daglig, ukentlig, månedlig eller årlig -- mot et sett betingelser. Bruk dem til tidsbasert oppsøking, som *alle hvis bursdag er i dag* (Fødselsdato · Dag i måneden = **I dag**, med måneden matchet mot **Gjeldende måned**) eller en *månedlig* innsjekking. Selv uten **Bare én gang per person** legger en tidsplantrigger ikke til samme person igjen innenfor én gjentakelsesperiode (en dag, uke, måned eller år, avhengig av hvor ofte den kjører).

For alle triggere kan du også angi:

- **Startsteget** det nye kortet havner på (standard er det første steget).
- **Bare én gang per person** -- slik at samme person ikke legges til arbeidsflyten to ganger av triggeren. Med dette på hoppes alle som allerede har et kort på denne arbeidsflyten over.
  - **Legg til igjen etter at kortet er lukket** -- vises når **Bare én gang per person** er på. Kryss av for å la triggeren legge til noen igjen når deres tidligere kort på denne arbeidsflyten er lukket. En person har fortsatt aldri to åpne kort på arbeidsflyten samtidig. Bruk dette for ting som kan skje mer enn én gang, som en gjenkommende gjest eller en årlig prosess.
- **Aktiv** -- slå triggeren av eller på uten å slette den.

:::tip
Kombiner en trigger **Skjema · Sendt inn** med malen **Oppfølging av ny besøkende** for å gjøre skjemaet «Kontaktkort» eller «Jeg er ny» om til en automatisk oppfølgingsprosess.
:::

## Bekreftelse av tjenesteoppdrag {#serving-assignment-confirmations}

En spesiell type arbeidsflyt kan følge opp [tjenesteforespørsler](./plans.md#assigning-team-members) til hver frivillig godtar eller avslår. I stedet for personer, sporer hvert kort på denne tavlen **ett oppdrag** -- én person i én posisjon på én plan. To roller eller to gudstjenester for samme person får egne kort. Dette er valgfritt: ingenting endres for en plan før du velger en bekreftelsesarbeidsflyt i innstillingene.

### Sette det opp

1. På siden Arbeidsflyter klikker du **Legg til arbeidsflyt** og velger malen **Bekreftelse av tjenesteoppdrag**. (Eller start en **Tom arbeidsflyt** og sett dens **formål** til **Bekreftelse av tjenesteoppdrag**.) Å opprette fra malen krever tillatelse til å sende SMS, siden den inkluderer et SMS-steg.
2. Gå gjennom stegene. Malen starter med:
   - **Be om og vent på svar** -- sender tjenesteforespørselen per e-post og SMS, venter 2 dager, sender en påminnelses-e-post, venter 1 dag til, og flytter deretter kortet automatisk videre.
   - **Ring frivillig om ubesvart forespørsel** -- et steg der en person ringer den frivillige, med frist om 1 dag. Sett en **standard ansvarlig** på dette steget. Hvis det ikke har noen, går kortet til tjenestens leder, eller til tjenesteteamet hvis det ikke finnes en.
3. Rediger ventetider, meldinger og steg slik at de passer til kirken din.
4. Åpne [planinnstillingene](./plans.md#plan-settings) og velg denne arbeidsflyten under **Bekreftelsesarbeidsflyt**.

Disse arbeidsflytene bruker handlingen **Send tjenesteforespørsel** i stedet for **Send e-post** og **Send SMS**. Velg **E-post** eller **SMS** og skriv eventuelt en **forespørselsmelding**. Forespørselen inneholder alltid rollen, planen, gudstjenestedatoen og en lenke for å svare; du kan bruke `{{planName}}`, `{{positionName}}` og `{{serviceDate}}` i meldingen din. La meldingen stå tom for å bruke standardforespørselen. Frivilliges varslingsinnstillinger, SMS-samtykke, SMS-leverandøren din og kirkens e-postgodkjenning gjelder alle, og ethvert forsøk som hoppes over eller blokkeres, registreres på kortet. **Send e-post**, **Send SMS** og **Legg til i arbeidsflyt** er ikke tilgjengelige på disse tavlene.

Fanen **Triggere** på en bekreftelsesarbeidsflyt forklarer hvordan kort startes i stedet for å tilby triggere, og disse arbeidsflytene vises ikke i listene for **Legg til i arbeidsflyt** for personer.

### Hvordan kort startes og lukkes

- Kort starter når du **varsler** frivillige på en publisert plan (se [Varsle frivillige](#notifying-volunteers)). Hver ny, ubesvart tildeling får ett kort. Å lagre, publisere, kopiere eller automatisk fylle en plan kontakter ingen på egen hånd, og planer som er foreløpig planlagt sender ingenting.
- Frivillige får fortsatt det vanlige varselet i appen. E-post- og SMS-oppfølgingen kommer fra arbeidsflyten.
- Når den frivillige **godtar eller avslår**, lukkes kortet automatisk, sammen med eventuelle oppfølgingsoppgaver knyttet til det.
- Kortskuffen viser posisjonen, gudstjenestedatoen og en lenke til planen. I stedet for **Fullfør** står knappen **Registrer oppfølging gjort**. Når du klikker den, registreres det at noen har fulgt opp, men kortet forblir åpent og tildelt (vist som **Venter på svar**) til den frivillige svarer, eller svarfristen passerer.
- Svarfristen er slutten av den siste gudstjenestetiden som posisjonens team tjenestegjør i. Hvis planen ikke har tilsvarende tider, er det slutten av tjenestedagen. Hvis ingen har svart innen da, lukkes kortet med **Svarfrist passert**, og en oppgave **Gjennomgå ubesvart tjenesteforespørsel** går til kortets nåværende eier eller tjenestelederen, slik at noen kan bestemme hvordan plassen skal dekkes. Tildelingen forblir **Ubekreftet**.
- Å fjerne tildelingen, endre personen, posisjonen eller plandatoen, sette planen tilbake til foreløpig planlagt, eller bytte planen til en annen bekreftelsesarbeidsflyt lukker kortet. Et lukket kort gjenåpnes aldri av et nytt **Varsle**; legg til en ny tildeling for å sende en ny forespørsel.

:::info
For forespørsler sendt gjennom en bekreftelsesarbeidsflyt går [påminnelser til frivillige](./plans.md#volunteer-reminders) bare til frivillige som har **godtatt**, slik at personer som venter på å svare ikke får påminnelser i tillegg til arbeidsflytens oppfølging.
:::

## Mine kort

Frivillige og ansatte trenger ikke grave gjennom alle tavler for å finne arbeidet sitt. Listen **Mine kort** på siden **Mitt arbeid** viser hvert kort som er tildelt den innloggede brukeren på tvers av alle arbeidsflyter. For å komme dit klikker du **Mine kort** øverst på siden Arbeidsflyter, eller åpner **Tjeneste > Mitt arbeid** i hurtigmenyen. Når du klikker på et kort, åpnes detaljpanelet rett på siden Mitt arbeid, der du kan jobbe med kortet eller fjerne det uten å forlate siden. Hvis du kan se arbeidsflyter, har panelet også en lenke **Åpne arbeidsflyttavle** til tavlen kortet tilhører.

## Rapporter

Åpne en arbeidsflyt og klikk **Rapporter** for å se analyser for den arbeidsflyten:

- **Forfalt** -- antall kort som har passert fristen.
- **Kort per steg** -- hvor mange kort som for øyeblikket ligger på hvert steg, vist som et søylediagram.
- **Fullført (30 dager)** -- gjennomstrømning de siste 30 dagene, vist som et linjediagram.

Bruk disse til å oppdage flaskehalser -- for eksempel et steg der kort hoper seg opp og aldri går videre.

## Relaterte artikler

- [Oppgaver](./tasks.md) -- de enkelte handlingspunktene arbeidsflytkort er bygget på
- [Skjemaer](../forms/index.md) -- bygg skjemaene som kan utløse arbeidsflyter
- [Grupper](../groups/index.md) -- gruppene en handling «Legg til i gruppe» kan plassere personer i
- [Gudstjenesteplaner](./plans.md) -- velg en bekreftelsesarbeidsflyt for en plans tjenesteforespørsler
- [Roller og tillatelser](../settings/roles-permissions.md) -- styr hvem som kan se, redigere og administrere arbeidsflyter
