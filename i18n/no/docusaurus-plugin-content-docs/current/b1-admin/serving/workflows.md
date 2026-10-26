---
title: "Arbeidsflyter"
---

# Arbeidsflyter

<div class="article-intro">

Arbeidsflyter fører folk gjennom en rekke trinn på en visuell tavle. Hver person blir et kort som beveger seg fra ett trinn til det neste — fra oppfølging av en gjest som er her for første gang, til en medlemsprosess, til en takk til en som gir for første gang, og alt annet der du må spore mange mennesker gjennom de samme stadiene. Et trinn kan be en frivillig om å gjøre noe (ringe, ha en samtale) **og** kjøre automatiserte handlinger på egen hånd — sende en e-post eller tekstmelding, vente noen dager, legge personen til i en gruppe — slik at arbeidsflyter tar seg av både den menneskelige oppfølgingen og alt rutinearbeidet rundt den. Arbeidsflyter utvider [Oppgaver](./tasks.md) til en dra-og-slipp Kanban-tavle, slik at ingen og ingenting faller mellom stolene.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sørg for at personene du vil spore, finnes i B1 Admin
- Sett deg inn i hvordan [Oppgaver](./tasks.md) fungerer, siden hvert kort på en tavle er en oppgave
- For å bruke handlingen **Send e-post** må du lage e-postmalene du vil sende først (administreres under **Innstillinger → E-postmaler**)
- For å bruke handlingen **Send tekst** må du koble til en [tekstmeldingsleverandør](../settings/church-settings.md#texting) først
- Du trenger riktig tillatelse for Oppgaver. Å se på, redigere kort og administrere arbeidsflyter er separate tillatelsesnivåer (se [Roller og tillatelser](../settings/roles-permissions.md))

</div>

## Se arbeidsflyter

Åpne [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin), utvid **Tjeneste** og klikk på **Arbeidsflyter**. Arbeidsflytene dine vises i en tabell med **kategori** og **status** (**Aktiv** eller **Inaktiv**) for hver. Hvis du bruker kategorier, lar fanene over listen deg filtrere etter kategori. Klikk på en arbeidsflyt for å åpne tavlen.

## Opprette en arbeidsflyt

1. På siden Arbeidsflyter klikker du på **Legg til arbeidsflyt**.
2. Velg hvordan du vil starte:
   - **Tom arbeidsflyt** -- start fra bunnen av og bygg dine egne trinn.
   - **Fra en mal** -- start med et ferdig sett med trinn som du kan redigere. Innebygde maler inkluderer:
     - **Oppfølging av nye besøkende** -- Send velkomst-e-post → Personlig telefonsamtale → Inviter til neste steg → Tilkoblet
     - **Medlemsklasse** -- Uttrykk interesse → Meld deg på klassen → Delta i klassen → Fullfør medlemskap
     - **Takk til første-gangs giver** -- Send takkekort → Del hvilken effekt giving har → Forvaltet
     - **Bekreftelse av tjenesteoppdrag** -- Be om og vent på svar → Ring frivillig om ubesvart forespørsel (se [Bekreftelser av tjenesteoppdrag](#serving-assignment-confirmations))

   Det kan ta litt tid å bygge trinnene i en mal. Mens det pågår, står knappen **Legg til arbeidsflyt** på **Oppretter...** og kan ikke klikkes igjen, slik at du ikke får en duplikat. Hvis noe går galt, viser siden meldingen *«Arbeidsflyten kunne ikke opprettes. Prøv igjen.»*
3. Gi arbeidsflyten et **navn**.
4. Du kan eventuelt tilordne en **kategori** for å samle relaterte arbeidsflyter. Du kan opprette en ny kategori rett fra rullegardinlisten.
   For en tom arbeidsflyt velger du også **formålet** med arbeidsflyten: **Oppfølging av personer** (den vanlige typen) eller **Bekreftelse av tjenesteoppdrag**. Formålet kan ikke endres etter at arbeidsflyten er opprettet.
5. La arbeidsflyten være **Aktiv** slik at folk kan legges til i den, eller sett den til **Inaktiv** for å skjule den fra listene for å legge til i arbeidsflyt.
6. Klikk på **Lagre**.

:::tip
Bruk knappen **Dupliser** på listen over arbeidsflyter for å kopiere en eksisterende arbeidsflyt — inkludert trinnene, de automatiserte handlingene og rutingen — som utgangspunkt for en ny.
:::

## Bygge tavlen med trinn

Hver arbeidsflyttavle består av **trinn**, vist som kolonner fra venstre til høyre. Åpne en arbeidsflyt og bruk **Legg til trinn** for å lage hvert stadium i prosessen din.

Når du legger til eller redigerer et trinn, kan du konfigurere:

- **Trinnnavn** -- kolonneoverskriften (for eksempel «Velkomstsamtale» eller «Venter på registrering»).
- **Forfaller om (dager)** -- angir automatisk en forfallsdato når et kort kommer til dette trinnet. Kort som har passert forfallsdatoen, merkes som **Forfalt**.
- **Standard ansvarlig** -- personen eller gruppen som nye kort på dette trinnet automatisk tilordnes til. Når den standard ansvarlige er en person, får hun et varsel om at et kort er tilordnet henne.
- **Automatiserte handlinger** -- ting systemet gjør av seg selv når et kort kommer (se nedenfor).
- **Ruting** -- hvor kortet går når det forlater trinnet (se [Ruting](#routing-cards-with-outcomes-and-conditions)).

Dra trinnkolonnene i den rekkefølgen som stemmer med prosessen din. Rekkefølgen definerer også standardveien et kort tar når ingen annen ruting gjelder.

:::info
Lagre et nytt trinn først. Automatiserte handlinger og ruting knyttes til trinnet, så redigeringsverktøyet låser opp disse seksjonene når trinnet finnes.
:::

## Automatiserte handlinger

Hvert trinn kan ha en liste med **automatiserte handlinger** som kjøres av seg selv i det øyeblikket et kort **kommer inn** på trinnet — før noen rører det. Slik kan et trinn både be en frivillig om noe *og* ta seg av den rutinemessige jobben rundt oppfølgingen.

I trinnredigeringen åpner du **Automatiserte handlinger**, klikker på **Legg til handling**, velger en type og fyller ut innstillingene. Legg til så mange du trenger; de kjøres **fra topp til bunn i rekkefølge**. Klikk på **Lagre** for trinnet for å lagre trinnet og alle handlingene samtidig. Når du fjerner en handling med søppelbøtteikonet, trer det i kraft med en gang.

| Handling | Hva den gjør |
|---|---|
| **Send e-post** | Sender personen en e-postmal du velger. Du kan overstyre emnelinjen. |
| **Send tekst** | Sender personen en melding du skriver, gjennom kirkens [tekstmeldingsleverandør](../settings/church-settings.md#texting). |
| **Vent** | Setter kortet på pause i et antall dager før det fortsetter (se nedenfor). |
| **Legg til i gruppe** | Legger personen til i en [gruppe](../groups/index.md) du velger. |
| **Fjern fra gruppe** | Fjerner personen fra en gruppe du velger. |
| **Registrer oppmøte** | Markerer personen som til stede på en gruppes gudstjenestetid som pågår (se nedenfor). |
| **Legg til i arbeidsflyt** | Starter personen i en annen arbeidsflyt — nyttig for overlevering mellom prosesser. |
| **Legg til notat** | Registrerer et notat i kortets historikk. |
| **Angi felt** | Oppdaterer et felt på personens post: Medlemsstatus, Sivilstatus, Kjønn, By, Fylke eller Postnummer. |
| **Webhook** | Sender kortets detaljer til en ekstern webadresse (URL) du oppgir, for å koble til andre systemer. |
| **Opprett oppgave** | Oppretter en [oppgave](./tasks.md) med tittelen og beskrivelsen du skriver inn, tilordnet den du velger. |
| **Varsle person** | Sender en ansatt eller frivillig du velger en e-post og et B1-varsel om kortet (se nedenfor). |

Når alle handlingene på et trinn er ferdige, **hviler kortet på det trinnet** slik at en person kan jobbe med det — med mindre trinnet har en automatisk rute som flytter det videre (se [Helautomatiske trinn](#fully-automated-steps)).

:::info
Automatiserte handlinger kjøres bare når et kort kommer inn gjennom den vanlige flyten — når det legges til første gang, når et utfall eller en automatisk rute bringer det inn, eller etter at en Vent er ferdig. De kjøres **ikke** på nytt når en ansatt manuelt drar et kort til trinnet eller sender det tilbake, slik at ingen får den samme e-posten to ganger.
:::

### Sende e-post

Velg **Send e-post**, velg en av e-postmalene dine, og skriv eventuelt en egendefinert emnelinje. Når et kort kommer inn på trinnet, mottar personen e-posten automatisk. (Hvis personen ikke har en e-postadresse registrert, hopper trinnet bare over denne handlingen.) [Flettefelt](../settings/email-templates.md#merge-fields) i malen, for eksempel `{{firstName}}`, fylles inn med personens egne opplysninger.

Når e-posten sendes, registrerer kortets historikk **E-post sendt**. Hvis den ikke kan sendes — for eksempel fordi kirkens e-post ikke er godkjent ennå, eller grensen per dag er nådd — legges det ikke til noen oppføring for «E-post sendt».

:::info
Arbeidsflyt-e-poster sendes først når kirken din er godkjent for å sende gruppe-e-post, og de teller mot kirkens daglige grense for e-post. Se [Slå på gruppe-e-post for kirken din](../groups/group-members.md#turning-on-group-email-for-your-church). Handlingen **Send e-post** advarer deg i trinnredigeringen når disse e-postene ikke vil sendes: *«Kirkens e-post er ikke godkjent ennå...»* hvis godkjenningen fortsatt venter, eller *«Kirkens e-post er satt på pause...»* hvis nylige meldinger har blitt returnert eller merket som spam.
:::

### Registrere oppmøte

Velg **Registrer oppmøte** og klikk på **Velg gruppe** for å velge gruppen der oppmøtet skal registreres. Når handlingen kjøres, markeres personen som til stede på den gruppens gudstjenestetid som pågår — akkurat som om hun hadde sjekket inn. Dette er nyttig sammen med en utløser som legger folk til i arbeidsflyten når de ankommer, slik at de telles uten en egen innsjekking.

- Oppmøte måles på det øyeblikket kortet ble **opprettet**, så en **Vent** tidligere i arbeidsflyten skyver ikke kortet forbi gudstjenesten.
- Bare gudstjenestetider med dag og starttid teller. Hvis ingen av gruppens gudstjenestetider pågår på det tidspunktet, registreres ingenting, og kortets historikk noterer **Ingen planlagt gudstjeneste pågår — oppmøte ikke registrert**.
- Når oppmøte er registrert, viser kortets historikk **Oppmøte registrert** etterfulgt av gruppens navn. Hvis du kjører handlingen på nytt for samme gudstjeneste, telles personen ikke to ganger.

### Varsle en person

Velg **Varsle person**, klikk på **Velg person**, og skriv eventuelt en **melding**. Når et kort kommer inn på trinnet, får den personen en e-post og et B1-varsel med navnet på personen som står på kortet, navnene på arbeidsflyten og trinnet, meldingen din og en lenke for å åpne kortet. Bruk det til å gi en ansatt eller en leder i tjenesten et varsel på forhånd — for eksempel *«Varsle pastoren når noen kommer til trinnet Medlemsintervju.»* Kortets historikk registrerer **Varslet** etterfulgt av personens navn.

### Sende en tekstmelding

Velg **Send tekst** og skriv **tekstmeldingen** (opptil 1 600 tegn). Når et kort kommer inn på trinnet, mottar personen den teksten på mobiltelefonen sin. Du kan personalisere meldingen med `{{firstName}}`, `{{lastName}}`, `{{displayName}}` eller `{{churchName}}`, som fylles inn med personens opplysninger når teksten sendes.

- Hvis personen ikke har et mobilnummer registrert, sendes ingen tekst, og kortets historikk noterer **Tekst hoppet over: ingen mobil**.
- Hvis personen har reservert seg, sendes ingen tekst, og kortets historikk noterer **Tekst hoppet over: reservert**.
- Når teksten sendes, registrerer kortets historikk **Tekst sendt**. Hvis sendingen mislykkes — for eksempel fordi ingen tekstmeldingsleverandør er koblet til, eller kirken din er tom for tekstmeldingskreditter — logges feilen i kortets historikk, og de resterende handlingene på trinnet kjøres likevel.

:::warning
Tekstmeldinger sendes gjennom kirkens egen [tekstmeldingsleverandør](../settings/church-settings.md#texting). Hvis ingen leverandør er koblet til, advarer handlingseditoren *«Ingen tekstmeldingsleverandør er satt opp»*, og tekstmeldinger vil ikke bli sendt.
:::

### Vente noen dager (dryppsekvenser)

Handlingen **Vent** holder et kort i det antallet dager du angir. Mens det venter, vises kortet som **Satt på pause**. B1 sjekker for ferdige ventetider hvert 30. minutt, så et kort tas opp igjen innen omtrent en halv time etter at ventetiden er over. Når ventetiden er over:

1. Eventuelle **gjenværende handlinger på samme trinn** kjøres — slik at du kan bygge en dryppsekvens som **Send e-post → Vent 3 dager → Send en påminnelses-e-post**.
2. Deretter, hvis trinnet har en automatisk rute, flytter kortet seg videre; ellers hviler det på trinnet til en person plukker det opp.

:::tip
En **Vent** helt i starten av et trinn er en enkel måte å «holde» et kort før det dukker opp for en frivillig — for eksempel *Vent 7 dager, og så tar en coach kontakt*.
:::

## Legge til personer som kort

Det finnes flere måter å sette personer på en tavle:

- **Fra tavlen** -- Klikk på **Legg til kort** nederst i en trinnkolonne og velg en person. Du kan også velge en gruppe, og hvert medlem av gruppen legges til som et kort.
- **Fra en persons post** -- Bruk **Legg til i arbeidsflyt** på en persons side for å legge personen i en arbeidsflyt.
- **Fra personsøk** -- Velg flere personer og bruk den samlede handlingen **Legg til i arbeidsflyt** for å legge dem alle til samtidig.
- **Automatisk med en utløser** -- Legg til personer når noe skjer, for eksempel en skjemainnsending eller en første gave (se [Utløsere](#triggers) nedenfor).

## Arbeide med tavlen

Åpne en arbeidsflyt for å se tavlen. Hvert kort viser personens navn, hvem det er tilordnet til, og en brikke for forfall eller status (**Forfalt** eller **Satt på pause**). En trinnkolonne viser også små merker for automatiserte handlinger den kjører, og merknader for rutingen, slik at du får et helhetsbilde av hvordan kortene flyter.

- **Flytt et kort** -- Dra et kort fra en kolonne til den neste etter hvert som personen går videre.
- **Åpne et kort** -- Dobbeltklikk på et kort (eller klikk på det) for å åpne detaljpanelet, der du kan endre trinn, tilordne på nytt, legge til notater og se hva som allerede har skjedd.

Fra kortpanelet kan du:

- **Tilordne** kortet til en annen person eller gruppe.
- **Sette på pause** kortet i 1 dag, 3 dager eller 1 uke for å skjule forfallsdatoen midlertidig.
- **Send tilbake** til forrige trinn eller **Hopp over** til neste trinn.
- **Fest tilordningen** -- behold den samme eieren på kortet selv når det flytter mellom trinn. Som standard tilordnes kortet på nytt til det nye trinnets standard ansvarlige når det flyttes; ved å feste tilordningen beholder den nåværende personen ansvaret gjennom hele prosessen.
- **Fullfør** kortet for å avslutte det, eller velg en **utfallsknapp** hvis trinnet har utfall konfigurert (se [Ruting](#routing-cards-with-outcomes-and-conditions)).
- **Legg til notater** og se kortets **aktivitet** -- en logg over automatiserte handlinger som har kjørt (e-poster sendt, ventetider osv.), hver med dato og klokkeslett.

For et kort om en person viser panelet også personens mobilnummer og e-postadresse som lenker du kan trykke på for å ringe eller sende e-post, pluss en lenke **Vis profil** hvis du har tillatelse til å se personer. Personen som kortet er tilordnet, ser telefonnummeret og e-postadressen selv uten tilgang til Personer.

Notater lagres sammen med kortet. Alle som kan åpne kortet — inkludert personen eller gruppen det er tilordnet — kan lese notatene og legge til sine egne. De som ikke kan åpne kortet, kan ikke se notatene.

### Samlede handlinger

Kryss av i avkrysningsboksene på flere kort for å utføre handlinger på dem samlet. For å velge alle kortene på et trinn på én gang, kryss av i boksen **Velg alle** i kolonneoverskriften for trinnet; kryss av igjen for å fjerne markeringen. En verktøylinje vises, og lar deg **Fullfør**, **Sett på pause**, **Tilordne** (tilordne på nytt) eller **Flytt til…** et annet trinn for alle valgte kort samtidig.

## Ruting med utfall og betingelser

Ruting styrer hvor et kort går når det forlater et trinn. Åpne trinnredigeringen for å konfigurere to typer ruting.

### Utfallsknapper

Utfall er knapper som vises i kortpanelet når du fullfører et kort på det trinnet. I stedet for en enkelt knapp **Fullfør** kan du tilby valg som «Ble med i en gruppe» eller «Ikke interessert». Hvert utfall kan:

- Sende kortet til **et annet trinn** i denne arbeidsflyten,
- **Overlevere kortet** til en helt annen arbeidsflyt, eller
- **Lukke** kortet.

Dette lar én beslutning dele personen inn i ulike veier.

### Automatisk ruting (betinget)

Automatiske ruter flytter et kort videre **i det øyeblikket det kommer inn på et trinn** (og etter at de automatiserte handlingene er ferdige), uten at noen klikker, hvis personen oppfyller et sett med betingelser. Legg til en rute, velg målskrittet, og definer én eller flere **betingelser** (for eksempel en persons menighet, alder eller medlemsstatus). Tekstfelt kan matches eksakt eller med **inneholder**, **begynner med** eller **slutter med**. En rute uten betingelser gjelder alle.

Datobetingelser (Dagens dato, Fødselsdato eller Jubileum) kan sammenligne hele datoen eller bare en del av den — ukedagen, **dag i måneden**, **måned** eller antall år som er gått. For en persons fødselsdato eller jubileum tilbyr **dag i måneden** et relativt alternativ **I dag**, slik at en betingelse som *Fødselsdato · Dag i måneden = I dag* matcher personer som har bursdag på dagens dato i måneden. **Måned** tilbyr **Forrige måned**, **Denne måneden** og **Neste måned**. Relative verdier som disse beregnes ut fra kirkens tidssone, slik at de stemmer med kirkens kalenderdag og ikke serverens.

Hvis en rutes betingelser ikke kan sjekkes av en eller annen grunn, regnes ruten som ikke-treffende. Kortet blir værende på trinnet (eller følger en annen rute som passer), i stedet for å sitte fast.

:::info
På tavlen viser hver trinnkolonne små merknader som beskriver rutingen — for eksempel en utfallsetikett eller «hvis treff» etterfulgt av en pil til målskrittet eller målarbeidsflyten.
:::

## Helautomatiske trinn

Du kan la et trinn kjøre helt av seg selv, uten at noen jobber med det. Gi trinnet dets **automatiserte handlinger** og legg til en **automatisk rute** (uten betingelser) som peker til neste trinn. Når et kort kommer inn, kjøres handlingene, og deretter flytter ruten kortet videre med en gang — kortet går rett gjennom.

:::tip
Kombiner dette med **Vent**: *Send velkomst-e-post → Vent 3 dager → flytt automatisk til trinnet «Personlig samtale».* E-posten og tidspunktet ordnes for deg, og en frivillig ser kortet først når det er på tide med den menneskelige kontakten.
:::

## Utløsere

Utløsere legger personer til i en arbeidsflyt automatisk når noe skjer, slik at du aldri trenger å legge til kort for hånd. På en arbeidsflyttavle klikker du på fanen **Utløsere**, og deretter **Legg til utløser**. Det finnes to typer:

### Hendelsesutløsere

Utløses så snart en post endres i B1. Velg hendelsen, og legg eventuelt til **betingelser** slik at bare passende personer legges til:

- **Person · Opprettet / Oppdatert** -- f.eks. legg til alle hvis status blir *Besøkende* eller *Gjest* (statusen som gis til personer som registrerer seg selv).
- **Gave · Opprettet** -- f.eks. legg til en første eller stor gave i en takke-arbeidsflyt (match på beløp, fond eller metode).
- **Gruppe · Medlem ble med** / **Gruppe · Opprettet**.
- **Skjema · Innsendt** -- legg til alle som sender inn et valgt skjema (flott for et kort «Jeg er ny» eller «Kontakt»).

### Tidsplanutløsere

Kjøres med jevne mellomrom — daglig, ukentlig, månedlig eller årlig — mot et sett med betingelser. Bruk disse til tidsbasert oppfølging, for eksempel *alle som har bursdag i dag* (Fødselsdato · Dag i måneden = **I dag**, med måneden matchet til **Denne måneden**) eller en *månedlig* innsjekking. Selv uten **Bare én gang per person** legger en tidsplanutløser ikke til samme person igjen innenfor én gjentakelsesperiode (en dag, uke, måned eller år, avhengig av hvor ofte den kjører).

For alle utløsere kan du også angi:

- **Startsteget** kortet havner på (standard er det første trinnet).
- **Bare én gang per person** -- slik at samme person ikke legges til i arbeidsflyten to ganger av utløseren. Når dette er på, hoppes alle over som allerede har et kort i denne arbeidsflyten.
  - **Legg til igjen etter at kortet er lukket** -- vises når **Bare én gang per person** er på. Kryss av for å la utløseren legge til noen igjen når deres tidligere kort i denne arbeidsflyten er lukket. En person får fortsatt aldri to åpne kort i arbeidsflyten samtidig. Bruk dette for ting som kan skje mer enn én gang, som en gjest som kommer tilbake, eller en årlig prosess.
- **Aktiv** -- slå utløseren av eller på uten å slette den.

:::tip
Kombiner en utløser for **Skjema · Innsendt** med malen **Oppfølging av nye besøkende** for å gjøre skjemaet «Kontaktkort» eller «Jeg er ny» om til en automatisk oppfølgingsprosess.
:::

## Bekreftelser av tjenesteoppdrag

En spesiell type arbeidsflyt kan følge opp [tjenesteforespørsler](./plans.md#assigning-team-members) til hver frivillig godtar eller avslår. I stedet for personer representerer hvert kort på denne tavlen **ett oppdrag** — én person i én posisjon på én plan. To roller eller to gudstjenester for samme person får egne kort. Dette er valgfritt: ingenting endres for en plan før du velger en bekreftelsesarbeidsflyt i innstillingene for planen.

### Sette opp en

1. På siden Arbeidsflyter klikker du på **Legg til arbeidsflyt** og velger malen **Bekreftelse av tjenesteoppdrag**. (Eller start med en **Tom arbeidsflyt** og sett **formålet** med arbeidsflyten til **Bekreftelse av tjenesteoppdrag**.) Å lage fra malen krever tillatelse til å sende tekstmeldinger, siden den inkluderer et tekstmeldingstrinn.
2. Gå gjennom trinnene. Malen starter med:
   - **Be om og vent på svar** -- sender tjenesteforespørselen på e-post og tekstmelding, venter 2 dager, sender en påminnelses-e-post, venter 1 dag til, og flytter deretter kortet videre automatisk.
   - **Ring frivillig om ubesvart forespørsel** -- et trinn der en person ringer den frivillige, forfaller om 1 dag. Sett en **standard ansvarlig** på dette trinnet. Hvis det ikke har en, går kortet til tjenesteområdets leder, eller til tjenesteteamet hvis det ikke finnes en leder.
3. Rediger ventetidene, meldingene og trinnene slik at de passer til kirken din.
4. Åpne [innstillingene for en plan](./plans.md#plan-settings) og velg denne arbeidsflyten under **Bekreftelsesarbeidsflyt**.

Disse arbeidsflytene bruker handlingen **Send tjenesteforespørsel** i stedet for **Send e-post** og **Send tekst**. Velg **E-post** eller **Tekstmelding** og skriv eventuelt en **forespørselsmelding**. Forespørselen inkluderer alltid rollen, planen, gudstjenestedatoen og en lenke for å svare; du kan bruke `{{planName}}`, `{{positionName}}` og `{{serviceDate}}` i meldingen din. La meldingen stå tom for å bruke standardforespørselen. Frivilliges varslingsinnstillinger, samtykke til tekstmeldinger, din tekstmeldingsleverandør og kirkens e-postgodkjenning gjelder alle, og ethvert forbigått eller blokkert forsøk registreres på kortet. **Send e-post**, **Send tekst** og **Legg til i arbeidsflyt** er ikke tilgjengelige på disse tavlene.

Fanen **Utløsere** på en bekreftelsesarbeidsflyt forklarer hvordan kort startes, i stedet for å tilby utløsere, og disse arbeidsflytene vises ikke i listene **Legg til i arbeidsflyt** for personer.

### Hvordan kort startes og lukkes

- Kort startes når du klikker **Varsle** frivillige på en publisert plan (se [Varsle frivillige](./plan-validation.md#notifying-volunteers)). Hvert nytt, ubesvart oppdrag får ett kort. Lagring, publisering, kopiering eller automatisk utfylling av en plan kontakter ingen på egen hånd, og blyantmerkede planer sender ingenting.
- Frivillige får fortsatt det vanlige varselet i appen. E-post- og tekstoppfølging kommer fra arbeidsflyten.
- Når den frivillige **godtar eller avslår**, lukkes kortet automatisk, sammen med eventuelle oppfølgingsoppgaver knyttet til det.
- Kortpanelet viser posisjonen, gudstjenestedatoen og en lenke til planen. I stedet for **Fullfør** står knappen **Registrer oppfølging utført**. Når du klikker på den, registreres det at noen har fulgt opp, men kortet forblir åpent og tilordnet (vist som **Venter på svar**) til den frivillige svarer, eller svarfristen passerer.
- Svarfristen er slutten av den siste gudstjenestetiden posisjonens team tjener i. Hvis planen ikke har matchende tider, er det slutten av gudstjenestedagen. Hvis ingen har svart innen da, lukkes kortet med **Svarfrist passert**, og en oppgave **Gjennomgå ubesvart tjenesteforespørsel** sendes til kortets nåværende eier eller tjenesteområdets leder, slik at noen kan bestemme hvordan plassen skal dekkes. Tildelingen forblir **Ubekreftet**.
- Å fjerne tildelingen, endre personen, posisjonen eller plandatoen, sette planen tilbake til blyantmerket, eller bytte planen til en annen bekreftelsesarbeidsflyt lukker kortet. Et lukket kort gjenåpnes aldri av et nytt **Varsle**; legg til et nytt oppdrag for å sende en ny forespørsel.

:::info
For forespørsler sendt gjennom en bekreftelsesarbeidsflyt går [påminnelser til frivillige](./plans.md#volunteer-reminders) bare til frivillige som har **godtatt**, slik at folk som venter på å svare ikke får påminnelser oppå arbeidsflytens oppfølging.
:::

## Mine kort

Frivillige og ansatte trenger ikke grave gjennom alle tavlene for å finne arbeidet sitt. Listen **Mine kort** på siden **Mitt arbeid** viser alle kort som er tilordnet den innloggede brukeren, på tvers av alle arbeidsflyter. For å komme dit klikker du på **Mine kort** øverst på siden Arbeidsflyter, eller åpner **Tjeneste > Mitt arbeid** i Hurtigmenyen. Når du klikker på et kort, åpnes tavlen det tilhører.

## Rapporter

Åpne en arbeidsflyt og klikk på **Rapporter** for å se statistikk for denne arbeidsflyten:

- **Forfalt** -- antall kort som har passert forfallsdatoen.
- **Kort per trinn** -- hvor mange kort som for øyeblikket står på hvert trinn, vist som et søylediagram.
- **Fullført (30 dager)** -- gjennomstrømning de siste 30 dagene, vist som et linjediagram.

Bruk disse for å finne flaskehalser — for eksempel et trinn der kort hoper seg opp og aldri går videre.

## Relaterte artikler

- [Oppgaver](./tasks.md) -- de enkelte handlingspunktene som arbeidsflytkort er bygget på
- [Skjemaer](../forms/index.md) -- lag skjemaene som kan utløse arbeidsflyter
- [Grupper](../groups/index.md) -- gruppene en handling «Legg til i gruppe» kan plassere personer i
- [Tjenesteplaner](./plans.md) -- velg en bekreftelsesarbeidsflyt for en plans tjenesteforespørsler
- [Roller og tillatelser](../settings/roles-permissions.md) -- styr hvem som kan se, redigere og administrere arbeidsflyter
