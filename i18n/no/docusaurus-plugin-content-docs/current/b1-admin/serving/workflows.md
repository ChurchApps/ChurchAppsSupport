---
title: "Arbeidsflyter"
description: "Bygg Kanban-lignende tavler i B1 Admin for å føre personer gjennom oppfølgingstrinn med automatiske e-poster, tekster og utløsere som legger til personer av seg selv."
---

# Arbeidsflyter

<div class="article-intro">

Arbeidsflyter fører personer gjennom en rekke steg på en visuell tavle. Hver person blir et kort som beveger seg fra ett steg til det neste -- fra oppfølging av førstegangsgjester, til en medlemsprosess, til takk til førstegangsgivere, og alt annet der du må følge mange personer gjennom de samme stadiene. Et steg kan be en frivillig om å gjøre noe (ringe, ha en samtale) **og** kjøre automatiske handlinger på egen hånd -- sende en e-post eller tekst, vente noen dager, legge personen til i en gruppe -- slik at arbeidsflyter tar seg av både den menneskelige oppfølgingen og arbeidet rundt den. Arbeidsflyter utvider [Oppgaver](./tasks.md) til en Kanban-tavle du drar og slipper kort på, slik at ingen og ingenting faller mellom stolene.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Pass på at personene du vil følge, finnes i B1 Admin
- Gjør deg kjent med hvordan [Oppgaver](./tasks.md) fungerer, siden hvert kort på en tavle er en oppgave
- For å bruke handlingen **Send e-post** må du først lage e-postmalene du vil sende (administreres under **Innstillinger → E-postmaler**)
- For å bruke handlingen **Send tekst** må du først koble til en [tekstleverandør](../settings/church-settings.md#texting)
- Du trenger riktig tillatelse for oppgaver. Å se, redigere kort og administrere arbeidsflyter er separate tillatelsesnivåer (se [Roller og tillatelser](../settings/roles-permissions.md))

</div>

## Vise arbeidsflyter

Åpne [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin), utvid **Tjeneste** og klikk **Arbeidsflyter**. Arbeidsflytene dine vises i en tabell med **Kategori** og **Status** (**Aktiv** eller **Inaktiv**) for hver. Hvis du bruker kategorier, lar fanene over listen deg filtrere den etter kategori. Klikk på en arbeidsflyt for å åpne tavlen.

## Opprette en arbeidsflyt

1. På siden Arbeidsflyter klikker du **Legg til arbeidsflyt**.
2. Velg hvordan du vil starte:
   - **Tom arbeidsflyt** -- start fra scratch og bygg egne steg.
   - **Fra en mal** -- start med et ferdig sett med steg du kan redigere. Innebygde maler inkluderer:
     - **Oppfølging av nye besøkende** -- Send velkomst-e-post → Personlig telefonsamtale → Inviter til neste steg → Tilknyttet
     - **Medlemsklasse** -- Uttrykk interesse → Meld deg på klassen → Delta på klassen → Fullfør medlemskap
     - **Takk til førstegangsgivere** -- Send takkebrev → Del hvilken betydning gaven har → Forvaltet
     - **Bekreftelse av tjenesteoppdrag** -- Be om svar og vent på svar → Ring frivillig om ubesvart forespørsel (se [Bekreftelse av tjenesteoppdrag](#serving-assignment-confirmations))

   Det kan ta litt tid å bygge stegene i en mal. Mens det pågår, står knappen **Legg til arbeidsflyt** på **Oppretter...** og kan ikke klikkes igjen, slik at du ikke ender opp med en duplikat. Hvis noe går galt, viser siden meldingen *«Arbeidsflyten kunne ikke opprettes. Prøv igjen.»*
3. Gi arbeidsflyten et **navn**.
4. Du kan eventuelt angi en **kategori** for å gruppere beslektede arbeidsflyter. Du kan opprette en ny kategori direkte fra nedtrekkslisten.
   For en tom arbeidsflyt velger du også **Formål med arbeidsflyten**: **Oppfølging av personer** (den vanlige typen) eller **Bekreftelse av tjenesteoppdrag**. Formålet kan ikke endres etter at arbeidsflyten er opprettet.
5. La arbeidsflyten være **Aktiv** slik at personer kan legges til i den, eller sett den til **Inaktiv** for å skjule den fra listene for å legge til i arbeidsflyt.
6. Klikk **Lagre**.

:::tip
Bruk knappen **Dupliser** på listen over arbeidsflyter for å kopiere en eksisterende arbeidsflyt -- inkludert stegene, automatiske handlinger og rutingen -- som utgangspunkt for en ny.
:::

## Bygge tavlen med steg

Hver arbeidsflyttavle består av **steg**, vist som kolonner fra venstre mot høyre. Åpne en arbeidsflyt og bruk **Legg til steg** for å lage hvert trinn i prosessen din.

Når du legger til eller redigerer et steg, kan du konfigurere:

- **Stegnavn** -- kolonneoverskriften (for eksempel «Velkomstsamtale» eller «Venter på påmelding»).
- **Forfaller om (dager)** -- setter automatisk en forfallsdato når et kort kommer inn i dette steget. Kort som er forbi forfallsdatoen, merkes **Forfalt**.
- **Standard ansvarlig** -- personen eller gruppen nye kort på dette steget tildeles automatisk. Når den standard ansvarlige er en person, får de et varsel om at et kort er tildelt dem.
- **Automatiske handlinger** -- ting systemet gjør av seg selv når et kort kommer (se nedenfor).
- **Ruting** -- hvor kortet går når det forlater steget (se [Ruting](#routing-cards-with-outcomes-and-conditions)).

Dra stegkolonnene i rekkefølgen som samsvarer med prosessen din. Rekkefølgen bestemmer også standardveien et kort tar når ingen annen ruting gjelder.

:::info
Lagre et nytt steg først. Automatiske handlinger og ruting knyttes til steget, og redigeringsvinduet låser opp disse delene når steget finnes.
:::

## Automatiske handlinger

Hvert steg kan ha en liste med **automatiske handlinger** som kjører av seg selv i det øyeblikket et kort **kommer inn** i steget -- før noen rører det. Slik kan et steg både be en frivillig om å gjøre noe *og* ta seg av rutinearbeidet rundt oppfølgingen.

I steg-editoren åpner du **Automatiske handlinger**, klikker **Legg til handling**, velger en type og fyller ut innstillingene. Legg til så mange du trenger; de kjøres **fra topp til bunn i rekkefølge**. Klikk **Lagre** på steget for å lagre steget og alle handlingene sammen. Fjerner du en handling med søppelbøtteikonet, skjer det med en gang.

| Handling | Hva den gjør |
|---|---|
| **Send e-post** | Sender personen en e-postmal du velger. Du kan overstyre emnelinjen. |
| **Send tekst** | Sender personen en melding du skriver, via menighetens [tekstleverandør](../settings/church-settings.md#texting). |
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

Etter at alle handlingene i et steg er ferdige, **blir kortet liggende på det steget**, slik at en person kan jobbe med det -- med mindre steget har en automatisk ruting som flytter det videre (se [Helautomatiske steg](#fully-automated-steps)).

:::info
Automatiske handlinger kjøres bare når et kort kommer inn gjennom den vanlige flyten -- når det først legges til, når et utfall eller en automatisk rute henter det inn, eller etter at en Vent er ferdig. De kjøres **ikke** på nytt når en ansatt drar et kort manuelt til steget eller sender det tilbake, slik at en person ikke får samme e-post to ganger.
:::

### Sende e-post {#sending-email}

Velg **Send e-post**, velg en av e-postmalene dine, og skriv eventuelt et eget emne. Når et kort kommer inn i steget, mottar personen e-posten automatisk. (Hvis personen ikke har en e-postadresse registrert, hopper steget over denne handlingen.) [Flettefelt](../settings/email-templates.md#merge-fields) i malen, for eksempel `{{firstName}}`, fylles ut med personens egne opplysninger. Hvis en utløser **Donasjon · Opprettet** startet arbeidsflyten, fylles gavefeltene `{{amount}}`, `{{giftDate}}`, `{{fund}}` og `{{receipt}}` ut fra den gaven, også på steg som kjøres etter en Vent. Se [Flettefelt for gaver](../settings/email-templates.md#gift-merge-fields).

Når e-posten sendes, registrerer kortets historikk **E-post sendt**. Hvis den ikke kan sendes -- for eksempel fordi menighetens e-post ikke er godkjent ennå, eller den daglige grensen er nådd -- legges ingen oppføring for «E-post sendt» til.

:::info
E-poster fra arbeidsflyter sendes bare etter at menigheten din er godkjent til å sende gruppe-e-post, og de teller mot menighetens daglige e-postgrense. Se [Slå på gruppe-e-post for menigheten din](../groups/group-members.md#turning-on-group-email-for-your-church). Handlingen **Send e-post** varsler deg i steg-editoren når disse e-postene ikke vil bli sendt: *«Menighetens e-post er ikke godkjent ennå...»* hvis godkjenningen fortsatt venter, eller *«Menighetens e-post er satt på pause...»* hvis nylige meldinger har returnert eller blitt meldt som spam.
:::

### Registrere oppmøte

Velg **Registrer oppmøte** og klikk **Velg gruppe** for å velge gruppen som oppmøtet skal registreres for. Når handlingen kjøres, markeres personen som til stede for den gruppens gudstjenestetid som pågår -- akkurat som om de hadde sjekket inn. Dette er nyttig sammen med en utløser som legger personer til i arbeidsflyten når de kommer, slik at de telles uten egen innsjekking.

- Oppmøte måles i det øyeblikket kortet ble **opprettet**, så en **Vent** tidligere i arbeidsflyten skyver det ikke forbi gudstjenesten.
- Bare gudstjenestetider med dag og starttid telles. Hvis ingen av gruppens gudstjenestetider pågår i det øyeblikket, registreres ingenting, og kortets historikk noterer **Ingen planlagt gudstjeneste pågår -- oppmøte ikke registrert**.
- Når oppmøte er registrert, viser kortets historikk **Oppmøte registrert** etterfulgt av gruppens navn. Å kjøre handlingen på nytt for samme gudstjeneste teller ikke personen to ganger.

### Varsle en person

Velg **Varsle person**, klikk **Velg person** og skriv eventuelt en **melding**. Når et kort kommer inn i steget, får personen en e-post og et B1-varsel med navnet på personen på kortet, navnene på arbeidsflyten og steget, meldingen din og en lenke for å åpne kortet. Bruk det til å gi en ansatt eller en leder i en tjeneste et lite varsel -- for eksempel *«Varsle pastoren når noen når steget Medlemsintervju.»* Kortets historikk registrerer **Varslet** etterfulgt av personens navn.

### Sende en tekstmelding {#sending-a-text}

Velg **Send tekst** og skriv inn **tekstmeldingen** (opptil 1 600 tegn). Hvis menigheten din har lagret [tekstmaler](../settings/email-templates.md), vises en liste med **Start fra en mal** over boksen. Når du velger en, kopieres malens tekst inn i meldingen, og du kan fortsatt redigere den. Steget beholder sin egen kopi, så senere endringer i malen endrer ikke steget. Når et kort kommer inn i steget, mottar personen teksten på mobiltelefonen sin. For å tilpasse meldingen klikker du en brikke under meldingsboksen -- **Fornavn**, **Etternavn**, **Visningsnavn** eller **Menighetens navn** -- for å sette inn `{{firstName}}`, `{{lastName}}`, `{{displayName}}` eller `{{churchName}}` der markøren står. Hver av dem fylles ut med personens opplysninger når teksten sendes. Brikkene **Beløp**, **Gavedato**, **Fond** og **Kvittering** setter inn gavefeltene, som bare fylles ut når en utløser **Donasjon · Opprettet** startet arbeidsflyten. For eksempel: `Takk {{firstName}} for gaven din på {{amount}} til {{fund}}!`

- Hvis personen ikke har et mobilnummer registrert, sendes ingen tekst, og kortets historikk registrerer **Tekst hoppet over: ingen mobiltelefon**.
- Hvis personen har meldt seg av, sendes ingen tekst, og kortets historikk registrerer **Tekst hoppet over: meldt av**.
- Når teksten sendes, registrerer kortets historikk **Tekst sendt**. Hvis sendingen mislykkes -- for eksempel fordi ingen tekstleverandør er koblet til, eller menigheten er tom for tekstkreditter -- logges feilen i kortets historikk, og de gjenværende handlingene i steget kjøres likevel.

:::warning
Tekster sendes via menighetens egen [tekstleverandør](../settings/church-settings.md#texting). Hvis ingen leverandør er koblet til, advarer handlingseditoren *«Ingen tekstleverandør er satt opp»*, og tekster blir ikke sendt.
:::

### Vente noen dager (dryppsekvenser)

Handlingen **Vent** holder et kort i så mange dager du har angitt. Mens det venter, vises kortet som **Satt på pause**. B1 sjekker for ferdige ventetider hvert 30. minutt, slik at et kort tas opp igjen innen en halv time etter at ventetiden er over. Når ventetiden er over:

1. Eventuelle **gjenværende handlinger i samme steg** kjøres -- slik at du kan bygge en dryppsekvens som **Send e-post → Vent 3 dager → Send en påminnelses-e-post**.
2. Deretter går kortet videre hvis steget har en automatisk ruting; ellers blir det liggende på steget, til en person tar det opp.

:::tip
En **Vent** helt i begynnelsen av et steg er en enkel måte å «holde» et kort før det dukker opp for en frivillig -- for eksempel *Vent 7 dager, så tar en coach kontakt*.
:::

## Legge til personer som kort

Det finnes flere måter å få personer på en tavle:

- **Fra tavlen** -- Klikk **Legg til kort** nederst i en stegkolonne og velg en person. Du kan også velge en gruppe, og hvert medlem av gruppen legges til som kort.
- **Fra en persons post** -- Bruk **Legg til i arbeidsflyt** på en persons side for å plassere dem på en arbeidsflyt.
- **Fra personsøket** -- Velg flere personer og bruk den massehandlingen **Legg til i arbeidsflyt** for å legge dem til samtidig.
- **Automatisk med en utløser** -- Legg til personer når noe skjer, for eksempel en skjemainnsending eller en første gave (se [Utløsere](#triggers) nedenfor).

Å legge til noen for hånd, eller med en handling **Legg til i arbeidsflyt** i et steg, gir dem aldri et andre åpent kort på samme arbeidsflyt. Har de allerede et åpent kort, hoppes de over (ved massetillegging får bare personene uten kort nye kort). Når kortet deres er lukket, kan du legge dem til igjen. Utløsere følger i stedet sin egen innstilling **Bare én gang per person**.

## Jobbe med tavlen {#working-the-board}

Åpne en arbeidsflyt for å se tavlen. Hvert kort viser personens navn, hvem det er tildelt, og en brikke med forfallsdato eller status (**Forfalt** eller **Satt på pause**). En stegkolonne viser også små merker for automatiske handlinger den kjører, og merknader for rutingen, slik at du får et oversiktskart over hvordan kortene flyter.

- **Flytt et kort** -- Dra et kort fra en kolonne til den neste etter hvert som personen går videre.
- **Åpne et kort** -- Dobbeltklikk på et kort (eller klikk på det) for å åpne detaljpanelet, der du kan endre steg, tildele på nytt, legge til notater og se hva som allerede har skjedd.

Fra kortpanelet kan du:

- **Tildele** kortet til en annen person eller gruppe.
- **Sette på pause** kortet i 1 dag, 3 dager eller 1 uke for midlertidig å skjule forfallsdatoen.
- **Send tilbake** til forrige steg, eller **Hopp over** til neste steg.
- **Fest ansvarlig** -- behold samme eier på kortet selv når det flytter mellom steg. Som standard tildeles kortet på nytt til steget sin standard ansvarlige når det flyttes til et nytt steg; ved å feste beholder den nåværende personen ansvaret gjennom hele prosessen.
- **Fullfør** kortet for å avslutte det, eller velg en knapp for **Utfall** hvis steget har utfall konfigurert (se [Ruting](#routing-cards-with-outcomes-and-conditions)).
- **Fjern kort** -- ta et kort av tavlen uten å fullføre det, for eksempel når noen ble lagt til ved en feil. Etter at du har bekreftet, lukkes kortet og fjernes fra alles liste. Ingen utfall, ruter eller steghandlinger kjøres, og historikken beholdes med en oppføring for **Fjernet**. For et [kort for bekreftelse av tjenesteoppdrag](#serving-assignment-confirmations) lukker fjerning av kortet forespørselen på samme måte.
- **Legg til notater** og se kortets **Aktivitet** -- en logg over automatiske handlinger som har kjørt (sendte e-poster, ventetider osv.), hver med dato og klokkeslett.

For et kort om en person viser panelet også personens mobiltelefon og e-post som lenker du kan trykke på for å ringe eller sende e-post, samt en lenke **Vis profil** hvis du har tillatelse til å se personer. Personen kortet er tildelt, ser telefonnummeret og e-posten selv uten tilgang til Personer.

Notater lagres sammen med kortet. Alle som kan åpne kortet -- inkludert personen eller gruppen det er tildelt -- kan lese notatene og legge til sine egne. Personer som ikke kan åpne kortet, ser ikke notatene.

### Massehandlinger

Merk av i flere kort for å handle på dem samlet. For å velge alle kort i et steg samtidig, huk av boksen **Velg alle** i kolonneoverskriften for steget; huk den av igjen for å fjerne markeringene. En verktøylinje vises, der du kan **Fullfør**, **Sett på pause**, **Tildel** (på nytt) eller **Flytt til…** et annet steg for alle valgte kort samtidig.

## Ruting av kort med utfall og betingelser {#routing-cards-with-outcomes-and-conditions}

Ruting styrer hvor et kort går når det forlater et steg. Åpne steg-editoren for å konfigurere to typer ruting.

### Utfallsknapper

Utfall er knapper som vises i kortpanelet når du fullfører et kort på det steget. I stedet for én enkelt knapp **Fullfør** kan du tilby valg som «Ble med i en gruppe» eller «Ikke interessert». Hvert utfall kan:

- Sende kortet til **et annet steg** i denne arbeidsflyten,
- **Overlevere kortet** til en helt annen arbeidsflyt, eller
- **Lukke** kortet.

Slik kan én beslutning styre personen inn på ulike veier.

### Automatisk ruting (betinget)

Automatiske ruter flytter et kort videre **i det øyeblikket det kommer inn i et steg** (og etter at de automatiske handlingene er ferdige), uten at noen klikker, hvis personen samsvarer med et sett betingelser. Legg til en rute, velg målsteget og definer én eller flere **betingelser** (for eksempel en persons campus, alder eller medlemsstatus). Tekstfelt kan matches eksakt eller med **inneholder**, **starter med** eller **slutter med**. En rute uten betingelser gjelder alle.

Datobetingelser (Dagens dato, Fødselsdato eller Jubileum) kan sammenligne hele datoen eller bare deler av den -- ukedagen, **dag i måneden**, **måneden** eller antall år som har gått. For en persons fødselsdato eller jubileum tilbyr **dag i måneden** et relativt valg **I dag**, slik at en betingelse som *Fødselsdato · Dag i måneden = I dag* matcher personer som har bursdag i dag. **Måned** tilbyr **Forrige måned**, **Inneværende måned** og **Neste måned**. Relative verdier som disse regnes ut med menighetens tidssone, slik at de stemmer med menighetens kalenderdag og ikke serverens.

Gruppen med betingelser **Giving** har **Tidligere fast giver**, som finner personer som ga jevnlig før de sluttet. Sett tre tall: *Ga i minst* **3** *av de siste* **12** *ukene, deretter ingenting de siste* **3** *ukene* (dette er standardverdiene). Ukene telles bakover fra i dag i menighetens tidssone, og en refundert gave teller ikke. Den er mest nyttig sammen med en [tidsplanutløser](#schedule-triggers) -- for eksempel en ukentlig regel som legger tidligere faste givere til i en oppfølgingstavle for pastoral omsorg. Betingelsen ser bare på gavedatoer, aldri beløp, og kort og varsler viser aldri beløp. Fordi den avslører hvem som har sluttet å gi, er det bare personer som kan se donasjoner som ser dette alternativet og kan legge det til, endre det eller fjerne det.

Hvis en rutes betingelser ikke kan sjekkes av en eller annen grunn, behandles ruten som ikke matchende. Kortet blir liggende på steget (eller følger en annen rute som matcher), i stedet for å bli sittende fast.

:::info
På tavlen viser hver stegkolonne små merknader som beskriver rutingen -- for eksempel en utfallsetikett eller «hvis den matcher» etterfulgt av en pil til målsteget eller arbeidsflyten.
:::

## Helautomatiske steg {#fully-automated-steps}

Du kan få et steg til å kjøre helt av seg selv, uten at noen jobber med det. Gi steget dets **automatiske handlinger** og legg til en **automatisk rute** (uten betingelser) som peker på neste steg. Når et kort kommer inn, kjøres handlingene, og deretter flytter ruten kortet videre umiddelbart -- kortet går rett gjennom.

:::tip
Kombiner dette med **Vent**: *Send velkomst-e-post → Vent 3 dager → gå automatisk videre til steget «Personlig samtale». E-posten og tidspunktet ordnes for deg, og en frivillig ser kortet først når det er tid for den menneskelige kontakten.*
:::

## Utløsere {#triggers}

Utløsere legger personer til i en arbeidsflyt automatisk når noe skjer, slik at du aldri trenger å legge til kort for hånd. Klikk på fanen **Utløsere** på en arbeidsflyttavle, og deretter **Legg til utløser**. Det finnes to typer:

### Hendelsesutløsere

Utløses så snart en post endres i B1. Velg hendelsen, og legg eventuelt til **betingelser** slik at bare samsvarende personer legges til:

- **Person · Opprettet / Oppdatert** -- f.eks. legg til alle hvis status blir *Besøkende* eller *Gjest* (statusen som gis til personer som registrerer seg selv).
- **Donasjon · Opprettet** -- f.eks. legg til en første eller stor gave i en takkearbeidsflyt (match på beløp, fond eller metode).
- **Gruppe · Medlem ble med** / **Gruppe · Opprettet**.
- **Skjema · Sendt inn** -- legg til alle som sender inn et valgt skjema (flott for et kort «Jeg er ny» eller «Bli kjent»).

### Tidsplanutløsere {#schedule-triggers}

Kjøres med jevne mellomrom -- daglig, ukentlig, månedlig eller årlig -- mot et sett betingelser. Bruk disse til tidsbasert oppfølging, for eksempel *alle som har bursdag i dag* (Fødselsdato · Dag i måneden = **I dag**, med måneden matchet til **Inneværende måned**) eller en *månedlig* innsjekking. Selv uten **Bare én gang per person** legger en tidsplanutløser ikke til samme person igjen innenfor én gjentakelsesperiode (en dag, uke, måned eller år, avhengig av hvor ofte den kjører).

For alle utløsere kan du også angi:

- Det **startsteget** det nye kortet havner på (standard er første steg).
- **Bare én gang per person** -- slik at samme person ikke legges til i arbeidsflyten to ganger av utløseren. Når dette er på, hoppes alle som allerede har et kort på arbeidsflyten over.
  - **Legg til igjen etter at kortet er lukket** -- vises når **Bare én gang per person** er på. Huk den av for å la utløseren legge til en person igjen når deres tidligere kort på denne arbeidsflyten er lukket. En person kan fortsatt aldri ha to åpne kort på arbeidsflyten samtidig. Bruk dette for ting som kan skje mer enn én gang, for eksempel en tilbakevendende gjest eller en årlig prosess.
- **Aktiv** -- slå utløseren av eller på uten å slette den.

:::tip
Kombiner en utløser for **Skjema · Sendt inn** med malen **Oppfølging av nye besøkende** for å gjøre skjemaet «Connect Card» eller «Jeg er ny» til en automatisk oppfølgingsprosess.
:::

## Bekreftelse av tjenesteoppdrag {#serving-assignment-confirmations}

En spesiell type arbeidsflyt kan følge opp [tjenesteforespørsler](./plans.md#assigning-team-members) til hver frivillig godtar eller avslår. I stedet for personer representerer hvert kort på denne tavlen **ett oppdrag** -- én person i én posisjon på én plan. To roller eller to gudstjenester for samme person får egne kort. Dette er frivillig: ingenting endres for en plan før du velger en bekreftelsesarbeidsflyt i innstillingene for planen.

### Sette opp en

1. På siden Arbeidsflyter klikker du **Legg til arbeidsflyt** og velger malen **Bekreftelse av tjenesteoppdrag**. (Eller start med en **Tom arbeidsflyt** og sett **Formål med arbeidsflyten** til **Bekreftelse av tjenesteoppdrag**.) Å opprette fra malen krever tillatelse til å sende tekster, fordi den inneholder et tekststeg.
2. Gå gjennom stegene. Malen starter med:
   - **Be om forespørselen og vent på svar** -- sender tjenesteforespørselen på e-post og tekst, venter 2 dager, sender en påminnelses-e-post, venter 1 dag til, og flytter deretter kortet automatisk videre.
   - **Ring frivillig om ubesvart forespørsel** -- et steg der en person ringer den frivillige, forfaller om 1 dag. Sett en **Standard ansvarlig** på dette steget. Hvis det ikke har en, går kortet til tjenestens leder, eller til tjenesteteamet hvis det ikke finnes noen leder.
3. Rediger ventetidene, meldingene og stegene slik at de passer menigheten din.
4. Åpne [innstillingene for en plan](./plans.md#plan-settings) og velg denne arbeidsflyten under **Bekreftelsesarbeidsflyt**.

Disse arbeidsflytene bruker handlingen **Send tjenesteforespørsel** i stedet for **Send e-post** og **Send tekst**. Velg **E-post** eller **Tekstmelding** og skriv eventuelt en **forespørselsmelding**. Forespørselen inneholder alltid rollen, planen, tjenestedatoen og en lenke for å svare; du kan bruke `{{planName}}`, `{{positionName}}` og `{{serviceDate}}` i meldingen din. La meldingen stå tom for å bruke standardforespørselen. Frivilliges varselinnstillinger, samtykke til tekst, tekstleverandøren din og menighetens godkjenning for e-post gjelder alle, og ethvert forsøk som hoppes over eller blokkeres, registreres på kortet. **Send e-post**, **Send tekst** og **Legg til i arbeidsflyt** er ikke tilgjengelige på disse tavlene.

Fanen **Utløsere** på en bekreftelsesarbeidsflyt forklarer hvordan kort startes i stedet for å tilby utløsere, og disse arbeidsflytene vises ikke i listene **Legg til i arbeidsflyt** for personer.

### Slik startes og lukkes kort

- Kort starter når du **varsler** frivillige på en publisert plan (se [Varsle frivillige](./plan-validation.md#notifying-volunteers)). Hvert nytt, ubesvart oppdrag får ett kort. Lagring, publisering, kopiering eller automatisk utfylling av en plan kontakter ingen på egen hånd, og planer som er satt som foreløpige, sender ingenting.
- Frivillige får fortsatt det vanlige varselet i appen. E-post- og tekstoppfølging kommer fra arbeidsflyten.
- Når den frivillige **godtar eller avslår**, lukkes kortet automatisk, sammen med eventuelle oppfølgingsoppgaver som er knyttet til det.
- Kortpanelet viser posisjonen, tjenestedatoen og en lenke til planen. I stedet for **Fullfør** står knappen **Registrer oppfølging utført**. Når du klikker på den, registreres det at noen har fulgt opp, men kortet forblir åpent og tildelt (vist som **Venter på svar**) til den frivillige svarer, eller svarfristen passerer.
- Svarfristen er slutten av den siste gudstjenestetiden som posisjonens team tjenestegjør i. Hvis planen ikke har tilsvarende tider, er det slutten av tjenestedagen. Hvis ingen har svart innen da, lukkes kortet med **Svarfrist passert**, og en oppgave **Gjennomgå ubesvart tjenesteforespørsel** sendes til kortets nåværende eier eller tjenestelederen, slik at noen kan avgjøre hvordan plassen dekkes. Oppdraget forblir **Ubekreftet**.
- Å fjerne oppdraget, endre personen, posisjonen eller plandatoen, sette planen tilbake til foreløpig, eller bytte planen til en annen bekreftelsesarbeidsflyt lukker kortet. Et lukket kort gjenåpnes aldri av et nytt **Varsle**; legg til et nytt oppdrag for å sende en ny forespørsel.

:::info
For forespørsler sendt via en bekreftelsesarbeidsflyt går [påminnelser for frivillige](./plans.md#volunteer-reminders) bare til frivillige som har **godtatt**, slik at personer som venter på å svare ikke får påminnelser i tillegg til oppfølgingen i arbeidsflyten.
:::

## Mine kort

Frivillige og ansatte trenger ikke lete gjennom alle tavler for å finne arbeidet sitt. Listen **Mine kort** på siden **Mitt arbeid** viser alle kort tildelt den innloggede brukeren, på tvers av alle arbeidsflyter. For å komme dit klikker du **Mine kort** øverst på siden Arbeidsflyter, eller åpner **Tjeneste > Mitt arbeid** i hurtigmenyen. Når du klikker på et kort, åpnes detaljpanelet rett på siden Mitt arbeid, der du kan jobbe med kortet eller fjerne det uten å forlate siden. Hvis du kan se arbeidsflyter, har panelet også en lenke **Åpne arbeidsflyttavlen** til tavlen kortet tilhører.

## Rapporter

Åpne en arbeidsflyt og klikk **Rapporter** for å se analyser for den arbeidsflyten:

- **Forfalt** -- antall kort som har passert forfallsdatoen.
- **Kort per steg** -- hvor mange kort som for øyeblikket ligger på hvert steg, vist som et søylediagram.
- **Fullført (30 dager)** -- gjennomstrømning de siste 30 dagene, vist som et linjediagram.

Bruk disse til å finne flaskehalser -- for eksempel et steg der kort hoper seg opp og aldri går videre.

## Relaterte artikler

- [Oppgaver](./tasks.md) -- de enkelte handlingspunktene arbeidsflytkortene er bygd på
- [Skjemaer](../forms/index.md) -- bygg skjemaene som kan utløse arbeidsflyter
- [Grupper](../groups/index.md) -- gruppene en handling «Legg til i gruppe» kan plassere personer i
- [Tjenesteplaner](./plans.md) -- velg en bekreftelsesarbeidsflyt for en plans tjenesteforespørsler
- [Roller og tillatelser](../settings/roles-permissions.md) -- styr hvem som kan se, redigere og administrere arbeidsflyter
