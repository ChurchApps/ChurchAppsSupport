---
title: "Arbeidsflyter"
description: "Bygg Kanban-lignende tavler i B1 Admin for å føre personer gjennom oppfølgingssteg med automatiske e-poster, tekstmeldinger og utløsere som legger til personer automatisk."
---

# Arbeidsflyter

<div class="article-intro">

Arbeidsflyter fører personer gjennom en rekke steg på en visuell tavle. Hver person blir et kort som beveger seg fra ett steg til neste — fra oppfølging av en førstegangsgjest, til en medlemsprosess, til en takk til en førstegangsgiver, og alt annet der du må følge mange personer gjennom de samme stadiene. Et steg kan be en frivillig om å gjøre noe (ringe, ta en samtale) **og** kjøre automatiske handlinger på egen hånd — sende en e-post eller tekstmelding, vente noen dager, legge personen til i en gruppe — slik at arbeidsflyter tar seg av både den menneskelige oppfølgingen og arbeidet rundt den. Arbeidsflyter utvider [oppgaver](./tasks.md) til en Kanban-tavle du drar og slipper på, slik at ingen og ingenting faller mellom stolene.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Kontroller at personene du vil følge opp, finnes i B1 Admin
- Gjør deg kjent med hvordan [oppgaver](./tasks.md) fungerer, siden hvert kort på en tavle er en oppgave
- For å bruke handlingen **Send e-post** må du først opprette e-postmalene du vil sende (administreres under **Innstillinger → E-postmaler**)
- For å bruke handlingen **Send tekstmelding** må du først koble til en [tekstmeldingsleverandør](../settings/church-settings.md#texting)
- Du trenger riktig oppgavetillatelse. Å se, redigere kort og administrere arbeidsflyter er separate tillatelsesnivåer (se [Roller og tillatelser](../settings/roles-permissions.md))

</div>

## Se arbeidsflyter {#viewing-workflows}

Åpne [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin), utvid **Tjeneste** og klikk på **Arbeidsflyter**. Arbeidsflytene dine listes i en tabell som viser hver enkelt sin **kategori** og **status** (**Aktiv** eller **Inaktiv**). Hvis du bruker kategorier, lar fanene over listen deg filtrere den etter kategori. Klikk på en arbeidsflyt for å åpne tavlen.

## Opprette en arbeidsflyt {#creating-a-workflow}

1. På siden Arbeidsflyter klikker du på **Legg til arbeidsflyt**.
2. Velg hvordan du vil starte:
   - **Tom arbeidsflyt** -- start fra bunnen av og bygg dine egne steg.
   - **Fra en mal** -- start med et ferdig sett med steg du kan redigere. Innebygde maler inkluderer:
     - **Oppfølging av nye gjester** -- Send velkomst-e-post → Personlig telefonsamtale → Inviter til neste steg → Tilkoblet
     - **Medlemsklasse** -- Uttrykk interesse → Meld deg på klassen → Delta i klassen → Fullfør medlemskap
     - **Takk til førstegangsgiver** -- Send takkekort → Del hvordan gaven gjør nytte → Forvaltet
     - **Bekreftelse av tjenesteoppdrag** -- Send forespørsel og vent på svar → Ring frivillig om ubesvart forespørsel (se [Bekreftelse av tjenesteoppdrag](#serving-assignment-confirmations))

   Å bygge stegene i en mal kan ta et øyeblikk. Mens det pågår, står knappen **Legg til arbeidsflyt** på **Oppretter...** og kan ikke klikkes igjen, slik at du ikke ender opp med en duplikat. Hvis noe går galt, viser siden *«Arbeidsflyten kunne ikke opprettes. Prøv igjen.»*
3. Gi arbeidsflyten et **navn**.
4. Tilordne eventuelt en **kategori** for å gruppere relaterte arbeidsflyter sammen. Du kan opprette en ny kategori direkte fra nedtrekkslisten.
   For en tom arbeidsflyt velger du også **formålet med arbeidsflyten**: **Oppfølging av personer** (den vanlige typen) eller **Bekreftelse av tjenesteoppdrag**. Formålet kan ikke endres etter at arbeidsflyten er opprettet.
5. La arbeidsflyten være **Aktiv** slik at personer kan legges til i den, eller sett den til **Inaktiv** for å skjule den fra listene for å legge til i en arbeidsflyt.
6. Klikk på **Lagre**.

:::tip
Bruk knappen **Dupliser** på listen over arbeidsflyter for å kopiere en eksisterende arbeidsflyt — inkludert steg, automatiske handlinger og ruting — som utgangspunkt for en ny.
:::

## Bygge tavlen med steg {#building-the-board-with-steps}

Hver arbeidsflyttavle består av **steg**, vist som kolonner fra venstre til høyre. Åpne en arbeidsflyt og bruk **Legg til steg** for å opprette hvert stadium i prosessen din.

Når du legger til eller redigerer et steg, kan du konfigurere:

- **Stegnavn** -- kolonneoverskriften (for eksempel «Velkomstsamtale» eller «Venter på registrering»).
- **Forfaller om (dager)** -- setter automatisk en forfallsdato når et kort kommer inn i dette steget. Kort som er forbi forfallsdatoen, merkes **Forfalt**.
- **Standard mottaker** -- personen eller gruppen nye kort på dette steget tildeles automatisk. Når standardmottakeren er en person, får de et varsel om at et kort er tildelt dem.
- **Automatiske handlinger** -- ting systemet gjør på egen hånd når et kort kommer inn (se nedenfor).
- **Ruting** -- hvor kortet går når det forlater steget (se [Ruting](#routing-cards-with-outcomes-and-conditions)).

Dra stegkolonner i rekkefølgen som samsvarer med prosessen din. Rekkefølgen definerer også standardveien et kort tar når ingen annen ruting gjelder.

:::info
Lagre et nytt steg først. Automatiske handlinger og ruting knyttes til steget, så redigeringsverktøyet låser opp disse delene når steget finnes.
:::

## Automatiske handlinger {#automated-actions}

Hvert steg kan ha en liste over **automatiske handlinger** som kjører av seg selv i det øyeblikket et kort **kommer inn** i steget — før noen rører det. Slik kan et steg både be en frivillig om å gjøre noe *og* ta seg av det rutinemessige arbeidet rundt oppfølgingen.

I steg-redigeringsverktøyet åpner du **Automatiske handlinger**, klikker på **Legg til handling**, velger en type og fyller inn innstillingene. Legg til så mange du trenger; de kjører **fra topp til bunn i rekkefølge**. Klikk på **Lagre** for steget for å lagre steget og alle handlingene sammen. Fjerning av en handling med søppelbøtteikonet trer i kraft med en gang.

| Handling | Hva den gjør |
|---|---|
| **Send e-post** | Sender personen en e-postmal du velger. Du kan overstyre emnelinjen. |
| **Send tekstmelding** | Sender personen en melding du skriver, gjennom menighetens [tekstmeldingsleverandør](../settings/church-settings.md#texting). |
| **Vent** | Setter kortet på pause i et antall dager før det fortsetter (se nedenfor). |
| **Legg til i gruppe** | Legger personen til i en [gruppe](../groups/index.md) du velger. |
| **Fjern fra gruppe** | Fjerner personen fra en gruppe du velger. |
| **Registrer oppmøte** | Markerer personen som tilstede ved en gruppes gudstjenestetid som pågår (se nedenfor). |
| **Legg til i arbeidsflyt** | Starter personen i en annen arbeidsflyt — nyttig for overlevering mellom prosesser. |
| **Legg til notat** | Registrerer et notat i kortets historikk. |
| **Angi felt** | Oppdaterer et felt på personens registrering: Medlemsstatus, Sivilstatus, Kjønn, By, Stat eller Postnummer. |
| **Webhook** | Sender kortets detaljer til en ekstern webadresse (URL) du oppgir, for kobling til andre systemer. |
| **Opprett oppgave** | Oppretter en [oppgave](./tasks.md) med tittelen og beskrivelsen du skriver inn, tildelt den du velger. |
| **Varsle person** | Sender en medarbeider eller frivillig du velger en e-post og et B1-varsel om kortet (se nedenfor). |

Etter at alle handlingene i et steg er ferdige, **hviler kortet på det steget** slik at en person kan jobbe med det — med mindre steget har en automatisk rute som flytter det videre (se [Helt automatiserte steg](#fully-automated-steps)).

:::info
Automatiske handlinger kjører bare når et kort kommer inn gjennom den vanlige flyten — når det først legges til, når et utfall eller en automatisk rute fører det inn, eller etter at en Vent er ferdig. De kjører **ikke** på nytt når en medarbeider manuelt drar et kort til steget eller sender det tilbake, slik at en person ikke får den samme e-posten to ganger.
:::

### Sende e-post {#sending-email}

Velg **Send e-post**, velg en av e-postmalene dine, og skriv eventuelt inn et eget emne. Når et kort kommer inn i steget, mottar personen e-posten automatisk. (Hvis personen ikke har en e-postadresse registrert, hopper steget bare over denne handlingen.) [Flettefelt](../settings/email-templates.md#merge-fields) i malen, som `{{firstName}}`, fylles inn med personens egne opplysninger. Hvis en **Gave · Opprettet**-utløser startet arbeidsflyten, fylles gavefeltene `{{amount}}`, `{{giftDate}}`, `{{fund}}` og `{{receipt}}` inn fra den gaven, også på steg som kjører etter en Vent. Se [Flettefelt for gaver](../settings/email-templates.md#gift-merge-fields).

Når e-posten sendes, registrerer kortets historikk **E-post sendt**. Hvis den ikke kan sendes — for eksempel fordi menighetens e-post ikke er godkjent ennå eller den daglige grensen er nådd — legges det ikke til noen oppføring om «E-post sendt».

:::info
E-poster fra arbeidsflyter sendes først etter at menigheten din er godkjent for å sende gruppe-e-post, og de teller mot menighetens daglige e-postgrense. Se [Slå på gruppe-e-post for menigheten din](../groups/group-members.md#turning-on-group-email-for-your-church). Handlingen **Send e-post** advarer deg i steg-redigeringsverktøyet når disse e-postene ikke sendes: *«Menighetens e-post er ikke godkjent ennå...»* hvis godkjenningen fortsatt venter, eller *«Menighetens e-post er satt på pause...»* hvis nylige meldinger har studsa eller blitt rapportert som spam.
:::

### Registrere oppmøte {#recording-attendance}

Velg **Registrer oppmøte** og klikk på **Velg gruppe** for å velge gruppen oppmøtet skal registreres for. Når handlingen kjører, markeres personen som tilstede ved gruppens gudstjenestetid som pågår — akkurat som om de hadde sjekket inn. Dette er nyttig sammen med en utløser som legger til personer i arbeidsflyten når de ankommer, slik at de telles uten en egen innsjekking.

- Oppmøte måles i det øyeblikket kortet ble **opprettet**, slik at en **Vent** tidligere i arbeidsflyten ikke skyver det forbi gudstjenesten.
- Bare gudstjenestetider med dag og starttid teller. Hvis ingen av gruppens gudstjenestetider pågår på det tidspunktet, registreres ingenting, og kortets historikk noterer **Ingen planlagt gudstjeneste pågår — oppmøte ikke registrert**.
- Når oppmøte registreres, viser kortets historikk **Oppmøte registrert** etterfulgt av gruppens navn. Hvis du kjører handlingen igjen for samme gudstjeneste, telles ikke personen to ganger.

### Varsle en person {#notifying-a-person}

Velg **Varsle person**, klikk på **Velg person**, og skriv eventuelt inn en **melding**. Når et kort kommer inn i steget, får den personen en e-post og et B1-varsel med navnet på personen på kortet, navnene på arbeidsflyten og steget, meldingen din og en lenke for å åpne kortet. Bruk den til å gi en medarbeider eller tjenesteleder en forhåndsvarsling — for eksempel *«Varsle pastoren når noen når steget Medlemsintervju.»* Kortets historikk registrerer **Varslet** etterfulgt av personens navn.

### Sende en tekstmelding {#sending-a-text}

Velg **Send tekstmelding** og skriv inn **tekstmeldingen** (opptil 1 600 tegn). Hvis menigheten din har lagret [tekstmaler](../settings/email-templates.md), vises en liste **Start fra en mal** over boksen. Når du velger en, kopieres malens tekst inn i meldingen, og du kan fortsatt redigere den. Steget beholder sin egen kopi, så senere endringer i malen endrer ikke steget. Når et kort kommer inn i steget, mottar personen den tekstmeldingen på mobiltelefonen sin. For å tilpasse meldingen klikker du på en brikke under meldingsboksen — **Fornavn**, **Etternavn**, **Visningsnavn** eller **Menighetsnavn** — for å sette inn `{{firstName}}`, `{{lastName}}`, `{{displayName}}` eller `{{churchName}}` der markøren står. Hver fylles inn med personens opplysninger når meldingen sendes. Brikkene **Beløp**, **Gavedato**, **Fond** og **Kvittering** setter inn gavefeltene, som bare fylles inn når en **Gave · Opprettet**-utløser startet arbeidsflyten. For eksempel: `Thanks {{firstName}} for your gift of {{amount}} to {{fund}}!`

- Hvis personen ikke har et mobilnummer registrert, sendes ingen tekstmelding, og kortets historikk registrerer **Tekstmelding hoppet over: ingen mobiltelefon**.
- Hvis personen har reservert seg, sendes ingen tekstmelding, og kortets historikk registrerer **Tekstmelding hoppet over: reservert**.
- Når tekstmeldingen sendes, registrerer kortets historikk **Tekstmelding sendt**. Hvis sendingen mislykkes — for eksempel fordi ingen tekstmeldingsleverandør er koblet til, eller menigheten er tom for tekstmeldingskreditt — logges feilen i kortets historikk, og de gjenværende handlingene i steget kjører fortsatt.

:::warning
Tekstmeldinger sendes gjennom menighetens egen [tekstmeldingsleverandør](../settings/church-settings.md#texting). Hvis ingen leverandør er koblet til, advarer handlingsredigeringsverktøyet *«Ingen tekstmeldingsleverandør er satt opp»*, og tekstmeldinger vil ikke sendes.
:::

### Vente noen dager (dryppsekvenser) {#waiting-a-few-days-drip-sequences}

Handlingen **Vent** holder et kort i det antall dager du setter. Mens det venter, vises kortet som **Utsatt**. B1 sjekker for ferdige ventetider hvert 30. minutt, så et kort tar opp igjen arbeidet innen ca. en halv time etter at ventetiden er over. Når ventetiden er over:

1. Eventuelle **gjenværende handlinger på samme steg** kjører — slik at du kan bygge en dryppsekvens som **Send e-post → Vent 3 dager → Send en påminnelses-e-post**.
2. Deretter, hvis steget har en automatisk rute, flytter kortet seg videre; ellers hviler det på steget til en person tar det.

:::tip
En **Vent** helt i starten av et steg er en enkel måte å «holde» et kort før det dukker opp for en frivillig — for eksempel *Vent 7 dager, deretter tar en veileder kontakt*.
:::

## Legge til personer som kort {#adding-people-as-cards}

Det finnes flere måter å legge personer på en tavle:

- **Fra tavlen** -- Klikk på **Legg til kort** nederst i en stegkolonne og velg en person. Du kan også velge en gruppe, og hvert medlem av gruppen legges til som et kort.
- **Fra en persons registrering** -- Bruk **Legg til i arbeidsflyt** på en persons side for å legge dem på en arbeidsflyt.
- **Fra personsøket** -- Velg flere personer og bruk den samlede handlingen **Legg til i arbeidsflyt** for å legge dem til alle samtidig.
- **Automatisk med en utløser** -- Legg til personer når noe skjer, for eksempel en skjemainnsending eller en første gave (se [Utløsere](#triggers) nedenfor).

Å legge til noen manuelt, eller med handlingen **Legg til i arbeidsflyt** i et steg, gir aldri en annen person et andre åpent kort på samme arbeidsflyt. Hvis de allerede har et åpent kort, hoppes de over (ved masseinnlegging får bare personene uten kort nye kort). Når kortet deres er lukket, kan du legge dem til igjen. Utløsere følger i stedet sin egen innstilling for **Bare én gang per person**.

## Jobbe med tavlen {#working-the-board}

Åpne en arbeidsflyt for å se tavlen. Hvert kort viser personens navn, hvem det er tildelt, og en brikke for forfallsdato eller status (**Forfalt** eller **Utsatt**). En stegkolonne viser også små merker for automatiske handlinger den kjører, og merknader for ruting, slik at du får et raskt oversiktskart over hvordan kortene flyter. Innen hver kolonne står kortet som kom inn i steget sist, øverst.

- **Flytt et kort** -- Dra et kort fra én kolonne til den neste etter hvert som personen går videre.
- **Åpne et kort** -- Dobbeltklikk på et kort (eller klikk på det) for å åpne detaljpanelet, der du kan endre steg, tildele det på nytt, legge til notater og se gjennom det som allerede har skjedd.

Fra kortpanelet kan du:

- **Tildele** kortet til en annen person eller gruppe.
- **Utsette** kortet i 1 dag, 3 dager eller 1 uke for midlertidig å skjule forfallsdatoen.
- **Send tilbake** til forrige steg eller **Hopp over** til neste steg.
- **Fest tildelingen** -- behold samme eier på kortet selv når det flyttes mellom steg. Som standard tildeles kortet på nytt til det nye stegets standardmottaker når det flyttes; festing beholder den nåværende personen ansvarlig hele veien.
- **Fullfør** kortet for å avslutte det, eller velg en **utfallsknapp** hvis steget har utfall konfigurert (se [Ruting](#routing-cards-with-outcomes-and-conditions)).
- **Fjern kort** -- ta et kort av tavlen uten å fullføre det, for eksempel når noen ble lagt til ved en feil. Etter bekreftelse lukkes kortet og fjernes fra alles liste. Ingen utfall, ruter eller stegshandlinger kjøres, og historikken beholdes med en oppføring om **Fjernet**. For et [kort for bekreftelse av tjenesteoppdrag](#serving-assignment-confirmations) lukker fjerning av kortet forespørselen på samme måte.
- **Legg til notater** og se kortets **aktivitet** -- en logg over automatiske handlinger som har kjørt (e-poster sendt, ventetider osv.), hver med dato og klokkeslett.

For et kort om en person viser panelet også personens mobiltelefon og e-post som lenker du kan trykke på for å ringe eller sende e-post, pluss en lenke **Vis profil** hvis du har tilgang til å se personer. Personen kortet er tildelt, ser telefonnummeret og e-posten selv uten tilgang til Personer.

Notater lagres sammen med kortet. Alle som kan åpne kortet — inkludert personen eller gruppen det er tildelt — kan lese notatene og legge til sine egne. Personer som ikke kan åpne kortet, kan ikke se notatene.

### Massehandlinger {#bulk-actions}

Velg avkrysningsboksene på flere kort for å utføre handlinger på dem samlet. For å velge alle kortene i et steg samtidig, kryss av for boksen **Velg alle** i stegkolonnens overskrift; kryss av igjen for å fjerne valget. En verktøylinje dukker opp, slik at du kan **Fullfør**, **Utsett**, **Tildel** (tildel på nytt) eller **Flytt til…** et annet steg for alle valgte kort samtidig.

## Ruting av kort med utfall og betingelser {#routing-cards-with-outcomes-and-conditions}

Ruting styrer hvor et kort går når det forlater et steg. Åpne steg-redigeringsverktøyet for å konfigurere to typer ruting.

### Utfallsknapper {#outcome-buttons}

Utfall er knapper som vises i kortpanelet når du fullfører et kort på det steget. I stedet for en enkelt **Fullfør**-knapp kan du tilby valg som «Ble med i en gruppe» eller «Ikke interessert». Hvert utfall kan:

- Sende kortet til **et annet steg** i denne arbeidsflyten,
- **Overlevere kortet** til en helt annen arbeidsflyt, eller
- **Lukke** kortet.

Dette lar én beslutning dele personen inn i ulike veier.

### Automatisk ruting (betinget) {#automatic-routing-conditional}

Automatiske ruter flytter et kort videre **i det øyeblikket det kommer inn i et steg** (og etter at de automatiske handlingene er ferdige), uten at noen klikker, hvis personen samsvarer med et sett betingelser. Legg til en rute, velg målsteget, og definer én eller flere **betingelser** (for eksempel en persons menighetsenhet, alder eller medlemsstatus). Tekstfelt kan matches eksakt eller med **inneholder**, **starter med** eller **slutter med**. En rute uten betingelser gjelder for alle.

Datobetingelser (Dagens dato, Fødselsdato eller Jubileum) kan sammenligne hele datoen eller bare deler av den — ukedagen, **Dag i måneden**, **Måned** eller antall år som har gått. For en persons fødselsdato eller jubileum tilbyr **Dag i måneden** et relativt valg **I dag**, slik at en betingelse som *Fødselsdato · Dag i måneden = I dag* matcher personer hvis bursdag faller på dagens dato i måneden. **Måned** tilbyr **Forrige måned**, **Gjeldende måned** og **Neste måned**. Relative verdier som disse beregnes ut fra menighetens tidssone, slik at de stemmer med menighetens kalenderdag og ikke serverens.

Gruppen **Giving** av betingelser har **Tidligere fast giver**, som finner personer som pleide å gi jevnlig, og som så sluttet. Sett tre tall: *Gav i minst* **3** *av de siste* **12** *ukene, deretter ingenting de siste* **3** *ukene* (dette er standardverdiene). Ukene telles bakover fra i dag i menighetens tidssone, og en refundert gave telles ikke. Den er mest nyttig sammen med en [tidsplanutløser](#schedule-triggers) — for eksempel en ukentlig regel som legger tidligere faste givere til en oppfølgingstavle for omsorg. Betingelsen ser bare på gavedatoer, aldri beløp, og kort og varsler viser aldri beløp. Fordi den avslører hvem som har sluttet å gi, ser bare personer som kan se gaver dette alternativet, og bare de kan legge til, endre eller fjerne det.

Hvis betingelsene for en rute ikke kan sjekkes av en eller annen grunn, behandles ruten som ikke samsvarende. Kortet blir på steget (eller følger en annen rute som samsvarer) i stedet for å bli stående fast.

:::info
På tavlen viser hver stegkolonne små merknader som beskriver ruting — for eksempel en utfallsetikett, eller «hvis den samsvarer» etterfulgt av en pil til målsteget eller arbeidsflyten.
:::

## Helt automatiserte steg {#fully-automated-steps}

Du kan få et steg til å kjøre helt av seg selv, uten at noen jobber med det. Gi steget dets **automatiske handlinger**, og legg til en **automatisk rute** (uten betingelser) som peker til neste steg. Når et kort kommer inn, kjører handlingene, og deretter flytter ruten det videre med en gang — kortet går rett gjennom.

:::tip
Kombiner dette med **Vent**: *Send velkomst-e-post → Vent 3 dager → flytt automatisk til steget «Personlig samtale».* E-posten og timingen ordnes for deg, og en frivillig ser kortet først når det er tid for den menneskelige kontakten.
:::

## Utløsere {#triggers}

Utløsere legger personer til i en arbeidsflyt automatisk når noe skjer, slik at du aldri trenger å legge til kort for hånd. På en arbeidsflyttavle klikker du på fanen **Utløsere** og deretter **Legg til utløser**. Det finnes to typer:

### Hendelsesutløsere {#event-triggers}

Utløses så snart en registrering endres i B1. Velg hendelsen, og legg eventuelt til **betingelser** slik at bare samsvarende personer legges til:

- **Person · Opprettet / Oppdatert** -- f.eks. legg til alle som får statusen *Besøkende* eller *Gjest* (statusen som gis til personer som registrerer seg selv).
- **Gave · Opprettet** -- f.eks. legg til en første eller stor gave på en takkearbeidsflyt (match på beløp, fond eller metode).
- **Gruppe · Medlem ble med** / **Gruppe · Opprettet**.
- **Skjema · Sendt inn** -- legg til alle som sender inn et valgt skjema (flott for et kort «Jeg er ny» eller «Bli kjent»).

### Tidsplanutløsere {#schedule-triggers}

Kjøres gjentatte ganger — daglig, ukentlig, månedlig eller årlig — mot et sett betingelser. Bruk disse til tidsbaserte tiltak, for eksempel *alle som har bursdag i dag* (Fødselsdato · Dag i måneden = **I dag**, med måneden matchet til **Gjeldende måned**) eller en *månedlig* oppfølging. Selv uten **Bare én gang per person** legger en tidsplanutløser ikke til samme person igjen innenfor én gjentakelsesperiode (en dag, uke, måned eller år, i samsvar med hvor ofte den kjører).

For alle utløsere kan du også angi:

- **Startsteget** kortet havner på (standard er det første steget).
- **Bare én gang per person** -- slik at samme person ikke legges til arbeidsflyten to ganger av utløseren. Når denne er på, hoppes alle som allerede har et kort på denne arbeidsflyten over.
  - **Legg til igjen etter at kortet er lukket** -- vises når **Bare én gang per person** er på. Kryss av for å la utløseren legge til noen igjen når deres tidligere kort på denne arbeidsflyten er lukket. En person kan fortsatt aldri ha to åpne kort på arbeidsflyten samtidig. Bruk dette for ting som kan skje mer enn én gang, for eksempel en gjest som kommer tilbake, eller en årlig prosess.
- **Aktiv** -- slå utløseren av eller på uten å slette den.

:::tip
Kombiner en **Skjema · Sendt inn**-utløser med malen **Oppfølging av nye gjester** for å gjøre kontaktkortet eller «Jeg er ny»-skjemaet ditt om til en automatisk oppfølgingsprosess.
:::

## Bekreftelse av tjenesteoppdrag {#serving-assignment-confirmations}

En spesiell type arbeidsflyt kan følge opp [tjenesteforespørsler](./plans.md#assigning-team-members) til hver frivillig takker ja eller nei. I stedet for personer følger hvert kort på denne tavlen **ett oppdrag** — én person i én posisjon på én plan. To roller eller to gudstjenester for samme person får egne kort. Dette er valgfritt: ingenting endres for en plan før du velger en bekreftelsesarbeidsflyt i innstillingene for planen.

### Sette opp en {#setting-one-up}

1. På siden Arbeidsflyter klikker du på **Legg til arbeidsflyt** og velger malen **Bekreftelse av tjenesteoppdrag**. (Eller start en **Tom arbeidsflyt** og sett **formålet med arbeidsflyten** til **Bekreftelse av tjenesteoppdrag**.) Å opprette fra malen krever tillatelse til å sende tekstmeldinger, fordi den inkluderer et tekststeg.
2. Gå gjennom stegene. Malen starter med:
   - **Send forespørsel og vent på svar** -- sender tjenesteforespørselen på e-post og tekstmelding, venter 2 dager, sender en påminnelses-e-post, venter 1 dag til, og flytter deretter kortet videre automatisk.
   - **Ring frivillig om ubesvart forespørsel** -- et steg der en person ringer den frivillige, med forfall om 1 dag. Sett en **standard mottaker** på dette steget. Hvis det ikke har en, går kortet til tjenestens leder, eller til tjenesteteamet hvis det ikke finnes en leder.
3. Rediger ventetider, meldinger og steg slik at de passer til menigheten din.
4. Åpne [innstillingene for en plan](./plans.md#plan-settings) og velg denne arbeidsflyten under **Bekreftelsesarbeidsflyt**.

Disse arbeidsflytene bruker handlingen **Send tjenesteforespørsel** i stedet for **Send e-post** og **Send tekstmelding**. Velg **E-post** eller **Tekstmelding** og skriv eventuelt en **forespørselsmelding**. Forespørselen inkluderer alltid rollen, planen, tjenestedatoen og en lenke for å svare; du kan bruke `{{planName}}`, `{{positionName}}` og `{{serviceDate}}` i meldingen din. La meldingen stå tom for å bruke standardforespørselen. Frivilliges varslingsinnstillinger, samtykke til tekstmeldinger, tekstmeldingsleverandøren din og menighetens e-postgodkjenning gjelder alle, og ethvert forsøk som hoppes over eller blokkeres, registreres på kortet. **Send e-post**, **Send tekstmelding** og **Legg til i arbeidsflyt** er ikke tilgjengelige på disse tavlene.

Fanen **Utløsere** på en bekreftelsesarbeidsflyt forklarer hvordan kort startes i stedet for å tilby utløsere, og disse arbeidsflytene vises ikke i listene **Legg til i arbeidsflyt** for personer.

### Hvordan kort startes og lukkes {#how-cards-are-started-and-closed}

- Kort startes når du **varsler** frivillige på en publisert plan (se [Varsle frivillige](./plan-validation.md#notifying-volunteers)). Hvert nytt, ubesvart oppdrag får ett kort. Lagring, publisering, kopiering eller automatisk utfylling av en plan kontakter ingen på egen hånd, og foreløpige planer sender ingenting.
- Frivillige får fortsatt det vanlige appvarselet. E-post- og tekstoppfølging kommer fra arbeidsflyten.
- Når den frivillige **takker ja eller nei**, lukkes kortet deres automatisk, sammen med eventuelle oppfølgingsoppgaver som er knyttet til det.
- Kortpanelet viser posisjonen, tjenestedatoen og en lenke til planen. I stedet for **Fullfør** står knappen **Registrer oppfølging gjort**. Ved å klikke på den registreres det at noen har fulgt opp, men kortet forblir åpent og tildelt (vist som **Venter på svar**) til den frivillige svarer, eller til svarfristen er passert.
- Svarfristen er slutten av den siste gudstjenestetiden posisjonens team tjener i. Hvis planen ikke har matchende tider, er det slutten av tjenestedagen. Hvis ingen har svart innen da, lukkes kortet med **Svarfrist passert**, og en oppgave **Gjennomgå ubesvart tjenesteforespørsel** sendes til kortets nåværende eier eller tjenesteleder, slik at noen kan bestemme hvordan plassen skal dekkes. Oppdraget forblir **Ubekreftet**.
- Hvis du fjerner oppdraget, endrer personen, posisjonen eller plandatoen, setter planen tilbake til foreløpig, eller bytter planen til en annen bekreftelsesarbeidsflyt, lukkes kortet. Et lukket kort gjenåpnes aldri av en ny **Varsle**; legg til et nytt oppdrag for å sende en fersk forespørsel.

:::info
For forespørsler sendt gjennom en bekreftelsesarbeidsflyt går [påminnelser til frivillige](./plans.md#volunteer-reminders) bare til frivillige som har **takket ja**, slik at personer som venter på å svare ikke får påminnelser i tillegg til oppfølgingene fra arbeidsflyten.
:::

## Mine kort {#my-cards}

Frivillige og ansatte trenger ikke å lete gjennom alle tavler for å finne arbeidet sitt. Listen **Mine kort** på siden **Mitt arbeid** viser hvert kort som er tildelt den innloggede brukeren, på tvers av alle arbeidsflyter. For å komme dit klikker du på **Mine kort** øverst på siden Arbeidsflyter, eller åpner **Tjeneste > Mitt arbeid** i Hurtigmenyen. Når du klikker på et kort, åpnes detaljpanelet rett på siden Mitt arbeid, der du kan jobbe med kortet eller fjerne det uten å forlate siden. Hvis du kan se arbeidsflyter, har panelet også en lenke **Åpne arbeidsflyttavlen** til tavlen kortet tilhører.

## Rapporter {#reports}

Åpne en arbeidsflyt og klikk på **Rapporter** for å se analyser for den arbeidsflyten:

- **Forfalt** -- antall kort som er forbi forfallsdatoen.
- **Kort per steg** -- hvor mange kort som for øyeblikket står på hvert steg, vist som et søylediagram.
- **Fullført (30 dager)** -- gjennomstrømning de siste 30 dagene, vist som et linjediagram.

Bruk disse til å finne flaskehalser — for eksempel et steg der kort hoper seg opp og aldri går videre.

## Relaterte artikler {#related-articles}

- [Oppgaver](./tasks.md) -- de enkelte handlingspunktene som arbeidsflytkort er bygget på
- [Skjemaer](../forms/index.md) -- bygg skjemaene som kan utløse arbeidsflyter
- [Grupper](../groups/index.md) -- gruppene en handling «Legg til i gruppe» kan plassere personer i
- [Gudstjenesteplaner](./plans.md) -- velg en bekreftelsesarbeidsflyt for en plans tjenesteforespørsler
- [Roller og tillatelser](../settings/roles-permissions.md) -- styr hvem som kan se, redigere og administrere arbeidsflyter
