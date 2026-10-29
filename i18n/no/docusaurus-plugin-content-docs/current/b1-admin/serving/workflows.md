---
title: "Arbeidsflyter"
---

# Arbeidsflyter

<div class="article-intro">

Arbeidsflyter flytter personer gjennom en serie trinn på en visuell tavle. Hver person blir et kort som beveger seg fra ett trinn til det neste — fra oppfølging av førstegangsgjester, til en medlemsprosess, til en takkemelding til førstegangsgivere, og alt annet der du må følge mange personer gjennom de samme stadiene. Et trinn kan be en frivillig om å gjøre noe (ringe, ha en samtale) **og** kjøre automatiske handlinger av seg selv — sende en e-post eller tekst, vente noen dager, legge personen til i en gruppe — slik at arbeidsflyter håndterer både den menneskelige oppfølgingen og arbeidet rundt den. Arbeidsflyter utvider [Oppgaver](./tasks.md) til en dra-og-slipp Kanban-tavle, slik at ingen og ingenting faller mellom stolene.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sørg for at personene du vil følge opp, finnes i B1 Admin
- Gjør deg kjent med hvordan [Oppgaver](./tasks.md) fungerer, siden hvert kort på en tavle er en oppgave
- For å bruke handlingen **Send e-post** må du først opprette e-postmalene du vil sende (administreres under **Innstillinger → E-postmaler**)
- For å bruke handlingen **Send tekst** må du først koble til en [tekstmeldingstjeneste](../settings/church-settings.md#texting)
- Du trenger den riktige oppgavetillatelsen. Å se, redigere kort og administrere arbeidsflyter er separate tillatelsesnivåer (se [Roller og tillatelser](../settings/roles-permissions.md))

</div>

## Se arbeidsflyter

Åpne [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin), utvid **Tjeneste** og klikk **Arbeidsflyter**. Arbeidsflytene dine listes i en tabell som viser hver enkelts **Kategori** og **Status** (**Aktiv** eller **Inaktiv**). Hvis du bruker kategorier, lar fanene over listen deg filtrere etter kategori. Klikk på en arbeidsflyt for å åpne tavlen.

## Opprette en arbeidsflyt

1. På siden Arbeidsflyter klikker du **Legg til arbeidsflyt**.
2. Velg hvordan du vil starte:
   - **Tom arbeidsflyt** — start fra bunnen av og bygg dine egne trinn.
   - **Fra en mal** — start med et ferdig sett med trinn du kan redigere. Innebygde maler inkluderer:
     - **Oppfølging av nye besøkende** — Send velkomst-e-post → Personlig telefonsamtale → Inviter til neste steg → Tilkoblet
     - **Medlemsklasse** — Uttrykk interesse → Meld deg på klassen → Delta på klassen → Fullfør medlemskap
     - **Takk til førstegangsgivere** — Send takkenotat → Del hvilken effekt gaven har → Forvaltet
     - **Bekreftelse av tjenesteoppdrag** — Be om og vent på svar → Ring frivillig om ubesvart forespørsel (se [Bekreftelser av tjenesteoppdrag](#serving-assignment-confirmations))

   Å bygge trinnene i en mal kan ta et øyeblikk. Mens det pågår, står det **Oppretter …** på knappen **Legg til arbeidsflyt**, og den kan ikke klikkes igjen, slik at du ikke ender opp med et duplikat. Hvis noe går galt, viser siden meldingen *«Arbeidsflyten kunne ikke opprettes. Prøv igjen.»*
3. Gi arbeidsflyten et **Navn**.
4. Eventuelt tilordne en **Kategori** for å samle relaterte arbeidsflyter. Du kan opprette en ny kategori rett fra nedtrekkslisten.
   For en tom arbeidsflyt velger du også dens **Formål**: **Oppfølging av personer** (den vanlige typen) eller **Bekreftelse av tjenesteoppdrag**. Formålet kan ikke endres etter at arbeidsflyten er opprettet.
5. La arbeidsflyten være **Aktiv** slik at personer kan legges til i den, eller sett den til **Inaktiv** for å skjule den fra listene for å legge til i arbeidsflyt.
6. Klikk **Lagre**.

:::tip
Bruk knappen **Dupliser** på listen over arbeidsflyter for å kopiere en eksisterende arbeidsflyt — inkludert trinnene, automatiske handlinger og ruting — som utgangspunkt for en ny.
:::

## Bygge tavlen med trinn

Hver arbeidsflyttavle består av **trinn**, vist som kolonner fra venstre til høyre. Åpne en arbeidsflyt og bruk **Legg til trinn** for å opprette hvert stadium i prosessen din.

Når du legger til eller redigerer et trinn, kan du konfigurere:

- **Trinnnavn** — kolonneoverskriften (for eksempel «Velkomstsamtale» eller «Venter på registrering»).
- **Forfall om (dager)** — setter automatisk en forfallsdato når et kort kommer inn i dette trinnet. Kort som har passert forfallsdatoen merkes med **Forfalt**.
- **Standard ansvarlig** — personen eller gruppen nye kort på dette trinnet automatisk tildeles. Når den standard ansvarlige er en person, får de et varsel om at et kort er tildelt dem.
- **Automatiske handlinger** — ting systemet gjør av seg selv når et kort ankommer (se under).
- **Ruting** — hvor kortet går når det forlater trinnet (se [Ruting](#routing-cards-with-outcomes-and-conditions)).

Dra trinnkolonnene i den rekkefølgen som stemmer med prosessen din. Rekkefølgen definerer også standardveien et kort tar når ingen annen ruting gjelder.

:::info
Lagre et nytt trinn først. Automatiske handlinger og ruting knyttes til trinnet, så redigeringsverktøyet låser opp disse seksjonene når trinnet finnes.
:::

## Automatiske handlinger

Hvert trinn kan ha en liste med **automatiske handlinger** som kjører av seg selv i det øyeblikket et kort **kommer inn** i trinnet — før noen rører ved det. Slik kan et trinn både be en frivillig om å gjøre noe *og* ta seg av rutinearbeidet rundt oppfølgingen.

I trinnredigeringen åpner du **Automatiske handlinger**, klikker **Legg til handling**, velger en type og fyller inn innstillingene. Legg til så mange du trenger; de kjører **fra topp til bunn i rekkefølge**. Klikk **Lagre** på trinnet for å lagre trinnet og alle handlingene sammen. Fjerner du en handling med søppelbøtteikonet, trer det i kraft med en gang.

| Handling | Hva den gjør |
|---|---|
| **Send e-post** | Sender personen en e-postmal du velger. Du kan overstyre emnelinjen. |
| **Send tekst** | Sender personen en melding du skriver, via kirkens [tekstmeldingstjeneste](../settings/church-settings.md#texting). |
| **Vent** | Setter kortet på pause i et antall dager før det fortsetter (se under). |
| **Legg til i gruppe** | Legger personen til i en [gruppe](../groups/index.md) du velger. |
| **Fjern fra gruppe** | Fjerner personen fra en gruppe du velger. |
| **Registrer oppmøte** | Markerer personen som tilstede på en gruppes gudstjenestetid som pågår (se under). |
| **Legg til i arbeidsflyt** | Starter personen i en annen arbeidsflyt — nyttig for overlevering mellom prosesser. |
| **Legg til notat** | Registrerer et notat i kortets historikk. |
| **Sett felt** | Oppdaterer et felt på personens post: Medlemsstatus, Sivilstatus, Kjønn, By, Fylke eller Postnummer. |
| **Webhook** | Sender kortets detaljer til en ekstern nettadresse (URL) du oppgir, for kobling til andre systemer. |
| **Opprett oppgave** | Oppretter en [oppgave](./tasks.md) med tittelen og beskrivelsen du skriver inn, tildelt den du velger. |
| **Varsle person** | Sender en ansatt eller frivillig du velger en e-post og et B1-varsel om kortet (se under). |

Når alle handlingene i et trinn er ferdige, **blir kortet stående på det trinnet** slik at en person kan jobbe med det — med mindre trinnet har en automatisk rute som flytter det videre (se [Helt automatiserte trinn](#fully-automated-steps)).

:::info
Automatiske handlinger kjører bare når et kort kommer inn gjennom den vanlige flyten — når det først legges til, når et utfall eller en automatisk rute bringer det inn, eller etter at en Vent er ferdig. De kjører **ikke** på nytt når en ansatt manuelt drar et kort over til trinnet eller sender det tilbake, slik at en person ikke får den samme e-posten to ganger.
:::

### Sende e-post

Velg **Send e-post**, velg en av e-postmalene dine, og skriv eventuelt inn et tilpasset emne. Når et kort kommer inn i trinnet, mottar personen den e-posten automatisk. (Hvis personen ikke har en e-postadresse registrert, hopper trinnet bare over denne handlingen.) [Flettefelt](../settings/email-templates.md#merge-fields) i malen, for eksempel `{{firstName}}`, fylles ut med personens egne opplysninger.

Når e-posten sendes, registrerer kortets historikk **E-post sendt**. Hvis den ikke kan sendes — for eksempel fordi kirkens e-post ikke er godkjent ennå eller den daglige grensen er nådd — legges det ikke til noen «E-post sendt»-oppføring.

:::info
Arbeidsflyt-e-poster sendes bare etter at kirken din er godkjent for å sende gruppe-e-post, og de teller mot kirkens daglige e-postgrense. Se [Slå på gruppe-e-post for kirken din](../groups/group-members.md#turning-on-group-email-for-your-church). Handlingen **Send e-post** advarer deg i trinnredigeringen når disse e-postene ikke vil bli sendt: *«Kirkens e-post er ikke godkjent ennå …»* hvis godkjenning fortsatt venter, eller *«Kirkens e-post er satt på pause …»* hvis nylige meldinger har blitt returnert eller rapportert som søppelpost.
:::

### Registrere oppmøte

Velg **Registrer oppmøte** og klikk **Velg gruppe** for å velge gruppen oppmøtet skal registreres for. Når handlingen kjører, markeres personen som tilstede på gruppens gudstjenestetid som pågår — akkurat som om de hadde sjekket inn. Dette er nyttig sammen med en utløser som legger personer til i arbeidsflyten når de ankommer, slik at de telles uten en separat innsjekking.

- Oppmøte måles i det øyeblikket kortet ble **opprettet**, slik at en **Vent** tidligere i arbeidsflyten ikke skyver det forbi gudstjenesten.
- Bare gudstjenestetider med dag og starttid telles. Hvis ingen av gruppens gudstjenestetider pågår på det tidspunktet, registreres ingenting, og kortets historikk noterer **Ingen planlagt gudstjeneste pågår — oppmøte ikke registrert**.
- Når oppmøte registreres, viser kortets historikk **Oppmøte registrert** etterfulgt av gruppens navn. Hvis handlingen kjøres igjen for samme gudstjeneste, telles ikke personen to ganger.

### Varsle en person

Velg **Varsle person**, klikk **Velg person**, og skriv eventuelt inn en **Melding**. Når et kort kommer inn i trinnet, får den personen en e-post og et B1-varsel med navnet på personen på kortet, navnene på arbeidsflyten og trinnet, meldingen din og en lenke for å åpne kortet. Bruk dette for å gi en ansatt eller ledere i en tjeneste et varsel — for eksempel *«Varsle pastoren når noen når trinnet Medlemssamtale.»* Kortets historikk registrerer **Varslet** etterfulgt av personens navn.

### Sende en tekst

Velg **Send tekst** og skriv inn **Tekstmelding** (opptil 1 600 tegn). Når et kort kommer inn i trinnet, mottar personen den teksten på mobiltelefonen sin. For å personalisere meldingen klikker du en brikke under meldingsboksen — **Fornavn**, **Etternavn**, **Visningsnavn** eller **Kirkens navn** — for å sette inn `{{firstName}}`, `{{lastName}}`, `{{displayName}}` eller `{{churchName}}` ved markøren. Hver av dem fylles ut med personens opplysninger når teksten sendes.

- Hvis personen ikke har et mobilnummer registrert, sendes ingen tekst, og kortets historikk registrerer **Tekst hoppet over: ingen mobiltelefon**.
- Hvis personen har reservert seg, sendes ingen tekst, og kortets historikk registrerer **Tekst hoppet over: reservert**.
- Når teksten sendes, registrerer kortets historikk **Tekst sendt**. Hvis sendingen mislykkes — for eksempel fordi ingen tekstmeldingstjeneste er koblet til, eller kirken din er tom for tekstkreditter — logges feilen i kortets historikk, og de gjenværende handlingene i trinnet kjører fortsatt.

:::warning
Tekster sendes gjennom kirkens egen [tekstmeldingstjeneste](../settings/church-settings.md#texting). Hvis ingen tjeneste er koblet til, advarer handlingsredigeringen *«Ingen tekstmeldingstjeneste er satt opp»*, og tekster vil ikke bli sendt.
:::

### Vente noen dager (dryppsekvenser)

Handlingen **Vent** holder et kort i det antall dager du setter. Mens det venter, vises kortet som **Utsatt**. B1 sjekker for ferdige ventetider hvert 30. minutt, så et kort tas opp igjen innen en halv time etter at ventetiden er over. Når ventetiden er over:

1. Eventuelle **gjenværende handlinger på samme trinn** kjører — slik at du kan bygge en dryppsekvens som **Send e-post → Vent 3 dager → Send en påminnelses-e-post**.
2. Deretter, hvis trinnet har en automatisk rute, går kortet videre; ellers blir det stående på trinnet for at en person skal ta det.

:::tip
En **Vent** helt i starten av et trinn er en enkel måte å «holde» et kort før det kommer opp for en frivillig — for eksempel *Vent 7 dager, deretter tar en coach kontakt*.
:::

## Legge til personer som kort

Det finnes flere måter å få personer inn på en tavle:

- **Fra tavlen** — klikk **Legg til kort** nederst i en trinnkolonne og velg en person. Du kan også velge en gruppe, og hvert medlem av den gruppen legges til som et kort.
- **Fra en persons post** — bruk **Legg til i arbeidsflyt** på en persons side for å legge dem inn i en arbeidsflyt.
- **Fra personsøk** — velg flere personer og bruk den masseutførte handlingen **Legg til i arbeidsflyt** for å legge dem alle til samtidig.
- **Automatisk med en utløser** — legg til personer når noe skjer, for eksempel en skjemainnsending eller en første gave (se [Utløsere](#triggers) nedenfor).

Å legge til noen manuelt, eller med en handling **Legg til i arbeidsflyt**-trinn, gir dem aldri et annet åpent kort i samme arbeidsflyt. Hvis de allerede har et åpent kort, hoppes de over (ved masseinnlegging får bare personene uten kort nye kort). Når kortet deres er lukket, kan du legge dem til igjen. Utløsere følger i stedet sin egen innstilling **Bare én gang per person**.

## Arbeide med tavlen

Åpne en arbeidsflyt for å se tavlen. Hvert kort viser personens navn, hvem det er tildelt, og en brikke for forfallsdato eller status (**Forfalt** eller **Utsatt**). En trinnkolonne viser også små merker for eventuelle automatiske handlinger den kjører, og merknader for ruting, slik at du raskt ser hvordan kortene flyter.

- **Flytt et kort** — dra et kort fra én kolonne til den neste når personen går videre.
- **Åpne et kort** — dobbeltklikk på et kort (eller klikk på det) for å åpne detaljskuffen, der du kan endre trinn, tildele det på nytt, legge til notater og se hva som allerede har skjedd.

Fra kortskuffen kan du:

- **Tildele** kortet til en annen person eller gruppe.
- **Utsette** kortet i 1 dag, 3 dager eller 1 uke for midlertidig å skjule forfallsdatoen.
- **Send tilbake** til forrige trinn eller **Hopp over** til neste trinn.
- **Fest tildeling** — behold den samme eieren på kortet selv når det flyttes mellom trinn. Som standard, når et kort flyttes til et nytt trinn, tildeles det på nytt til trinnets standard ansvarlige; festing beholder den nåværende personen ansvarlig gjennom hele prosessen.
- **Fullfør** kortet for å avslutte det, eller velg en knapp for **Utfall** hvis trinnet har utfall konfigurert (se [Ruting](#routing-cards-with-outcomes-and-conditions)).
- **Fjern kort** — ta et kort av tavlen uten å fullføre det, for eksempel når noen ble lagt til ved en feil. Etter at du har bekreftet, lukkes kortet og fjernes fra alles liste. Ingen utfall, ruter eller trinnhandlinger kjører, og historikken beholdes med en **Fjernet**-oppføring. For et kort for [bekreftelse av tjenesteoppdrag](#serving-assignment-confirmations) lukker fjerning forespørselen på samme måte.
- **Legg til notater** og se kortets **Aktivitet** — en logg over automatiske handlinger som har kjørt (e-poster sendt, ventetider osv.), hver med dato og klokkeslett.

For et kort om en person viser skuffen også personens mobiltelefon og e-post som lenker du kan trykke på for å ringe eller sende e-post, pluss en lenke **Vis profil** hvis du har tillatelse til å se personer. Personen et kort er tildelt, ser telefonnummeret og e-posten selv uten tilgang til Personer.

Notater lagres med kortet. Alle som kan åpne kortet — inkludert personen eller gruppen det er tildelt — kan lese notatene og legge til sine egne. Personer som ikke kan åpne kortet, kan ikke se notatene.

### Masseaksjoner

Kryss av boksene på flere kort for å handle på dem sammen. For å velge alle kortene i et trinn på en gang, kryss av boksen **Velg alle** i trinnkolonnens overskrift; kryss den av igjen for å fjerne valget. En verktøylinje vises som lar deg **Fullfør**, **Utsett**, **Tildel** (tildel på nytt) eller **Flytt til …** et annet trinn for alle valgte kort på en gang.

## Ruting av kort med utfall og betingelser

Ruting styrer hvor et kort går når det forlater et trinn. Åpne et trinns redigering for å konfigurere to typer ruting.

### Utfallsknapper

Utfall er knapper som vises i kortskuffen når du fullfører et kort på det trinnet. I stedet for en enkelt **Fullfør**-knapp kan du tilby valg som «Ble med i en gruppe» eller «Ikke interessert». Hvert utfall kan:

- Sende kortet til **et annet trinn** i denne arbeidsflyten,
- **Overlevere kortet** til en helt annen arbeidsflyt, eller
- **Lukke** kortet.

Dette lar én beslutning forgrene personen ned forskjellige veier.

### Automatisk ruting (betinget)

Automatiske ruter flytter et kort videre **i det øyeblikket det kommer inn i et trinn** (og etter at dets automatiske handlinger er ferdige), uten at noen klikker, hvis personen passer til et sett med betingelser. Legg til en rute, velg målsteget, og definer én eller flere **betingelser** (for eksempel en persons kampus, alder eller medlemsstatus). Tekstfelt kan matches eksakt eller med **inneholder**, **starter med** eller **slutter med**. En rute uten betingelser passer på alle.

Datobetingelser (Dagens dato, Fødselsdato eller Jubileum) kan sammenligne hele datoen eller bare deler av den — ukedagen, **Dag i måneden**, **Måned** eller antall år som har gått. For en persons Fødselsdato eller Jubileum tilbyr **Dag i måneden** et relativt alternativ **I dag**, slik at en betingelse som *Fødselsdato · Dag i måneden = I dag* passer på personer hvis bursdag faller på dagens dag i måneden. **Måned** tilbyr **Forrige måned**, **Inneværende måned** og **Neste måned**. Relative verdier som disse regnes ut med kirkens tidssone, slik at de stemmer med kirkens kalenderdag og ikke serverens.

Gruppen **Gaver** med betingelser har **Tidligere fast giver**, som finner personer som pleide å gi regelmessig og deretter sluttet. Sett tre tall: *Ga minst* **3** *av de siste* **12** *ukene, deretter ingenting de siste* **3** *ukene* (dette er standardverdiene). Ukene telles tilbake fra i dag i kirkens tidssone, og en refundert gave teller ikke. Det er mest nyttig med en [tidsplanutløser](#schedule-triggers) — for eksempel en ukentlig regel som legger tidligere faste givere til en oppfølgingstavle for sjelesorg. Betingelsen ser bare på gavedatoer, aldri beløp, og kort og varsler viser aldri beløp. Fordi den avslører hvem som har sluttet å gi, ser bare personer som kan se gaver dette alternativet, og kan legge det til, endre det eller fjerne det.

Hvis en rutes betingelser ikke kan sjekkes av en eller annen grunn, behandles den ruten som ikke-passende. Kortet blir stående på trinnet (eller følger en annen rute som passer), i stedet for å sitte fast.

:::info
På tavlen viser hver trinnkolonne små merknader som beskriver ruting — for eksempel en utfallsetikett eller «hvis passer» etterfulgt av en pil til målsteget eller arbeidsflyten.
:::

## Helt automatiserte trinn

Du kan la et trinn kjøre helt av seg selv, uten at noen jobber med det. Gi trinnet sine **automatiske handlinger** og legg til en **automatisk rute** (uten betingelser) som peker til neste trinn. Når et kort kommer inn, kjører handlingene, og deretter flytter ruten det videre umiddelbart — kortet går rett igjennom.

:::tip
Kombiner dette med **Vent**: *Send velkomst-e-post → Vent 3 dager → gå automatisk videre til trinnet «Personlig samtale».* E-posten og timingen håndteres for deg, og en frivillig ser kortet først når det er tid for den menneskelige kontakten.
:::

## Utløsere

Utløsere legger personer til i en arbeidsflyt automatisk når noe skjer, slik at du aldri må legge til kort for hånd. På en arbeidsflyttavle klikker du fanen **Utløsere**, og deretter **Legg til utløser**. Det finnes to typer:

### Hendelsesutløsere

Utløses så snart en post endres i B1. Velg hendelsen, og legg eventuelt til **betingelser** slik at bare passende personer legges til:

- **Person · Opprettet / Oppdatert** — f.eks. legg til alle hvis status blir *Besøkende* eller *Gjest* (statusen som gis til personer som registrerer seg selv).
- **Gave · Opprettet** — f.eks. legg til en første eller stor gave i en takk-arbeidsflyt (filtrer på beløp, fond eller metode).
- **Gruppe · Medlem ble med** / **Gruppe · Opprettet**.
- **Skjema · Sendt inn** — legg til alle som sender inn et valgt skjema (flott for et kort «Jeg er ny» eller «Kobling»).

### Tidsplanutløsere

Kjører gjentatte ganger — daglig, ukentlig, månedlig eller årlig — mot et sett med betingelser. Bruk disse til tidsbasert oppsøking, for eksempel *alle som har bursdag i dag* (Fødselsdato · Dag i måneden = **I dag**, med måneden satt til **Inneværende måned**) eller en *månedlig* innsjekking. Selv uten **Bare én gang per person** legger en tidsplanutløser ikke til den samme personen igjen innenfor én gjentakelsesperiode (en dag, uke, måned eller år, i samsvar med hvor ofte den kjører).

For enhver utløser kan du også sette:

- **Startsteg** som det nye kortet havner på (standard er det første trinnet).
- **Bare én gang per person** — slik at samme person ikke legges til arbeidsflyten to ganger av utløseren. Med dette på hoppes alle som allerede har et kort i denne arbeidsflyten over.
  - **Legg til igjen etter at kortet er lukket** — vises når **Bare én gang per person** er på. Kryss av for å la utløseren legge til noen igjen når deres tidligere kort i denne arbeidsflyten er lukket. En person har fortsatt aldri to åpne kort i arbeidsflyten samtidig. Bruk dette for ting som kan skje mer enn én gang, som en gjest som kommer tilbake eller en årlig prosess.
- **Aktiv** — slå utløseren av eller på uten å slette den.

:::tip
Kombiner en **Skjema · Sendt inn**-utløser med malen **Oppfølging av nye besøkende** for å gjøre kontaktkortet eller «Jeg er ny»-skjemaet til en automatisk oppfølgingsprosess.
:::

## Bekreftelser av tjenesteoppdrag

En spesiell type arbeidsflyt kan følge opp [tjenesteforespørsler](./plans.md#assigning-team-members) til hver frivillig godtar eller avslår. I stedet for personer representerer hvert kort på denne tavlen **ett oppdrag** — én person i én posisjon på én plan. To roller eller to gudstjenester for samme person får egne kort. Dette er valgfritt: ingenting endres for en plan før du velger en bekreftelsesarbeidsflyt i innstillingene.

### Sette opp en

1. På siden Arbeidsflyter klikker du **Legg til arbeidsflyt** og velger malen **Bekreftelse av tjenesteoppdrag**. (Eller start en **Tom arbeidsflyt** og sett dens **Formål** til **Bekreftelse av tjenesteoppdrag**.) Å opprette fra malen krever tillatelse til å sende tekster, siden den inkluderer et tekststeg.
2. Gå gjennom trinnene. Malen starter med:
   - **Be om og vent på svar** — sender tjenesteforespørselen per e-post og tekst, venter 2 dager, sender en påminnelses-e-post, venter 1 dag til, og flytter deretter kortet automatisk videre.
   - **Ring frivillig om ubesvart forespørsel** — et steg der en person ringer den frivillige, med forfall om 1 dag. Sett en **Standard ansvarlig** på dette trinnet. Hvis det ikke har en, går kortet til tjenestens leder, eller til tjenestens team hvis det ikke finnes en leder.
3. Rediger ventetidene, meldingene og trinnene slik at de passer kirken din.
4. Åpne en [plans innstillinger](./plans.md#plan-settings) og velg denne arbeidsflyten under **Bekreftelsesarbeidsflyt**.

Disse arbeidsflytene bruker en handling **Send tjenesteforespørsel** i stedet for **Send e-post** og **Send tekst**. Velg **E-post** eller **Tekstmelding** og skriv eventuelt en **Forespørselsmelding**. Forespørselen inkluderer alltid rollen, planen, gudstjenestedatoen og en lenke for å svare; du kan bruke `{{planName}}`, `{{positionName}}` og `{{serviceDate}}` i meldingen din. La meldingen stå tom for å bruke standardforespørselen. Frivilliges varslingsinnstillinger, tekstreservasjon, tekstmeldingstjenesten din og kirkens e-postgodkjenning gjelder alle, og ethvert hoppet over eller blokkert forsøk registreres på kortet. **Send e-post**, **Send tekst** og **Legg til i arbeidsflyt** er ikke tilgjengelige på disse tavlene.

Fanen **Utløsere** på en bekreftelsesarbeidsflyt forklarer hvordan kort startes, i stedet for å tilby utløsere, og disse arbeidsflytene vises ikke i listene **Legg til i arbeidsflyt** for personer.

### Hvordan kort startes og lukkes

- Kort startes når du **varsler** frivillige på en publisert plan (se [Varsle frivillige](./plans.md#assigning-team-members)). Hvert nytt, ubesvart oppdrag får ett kort. Å lagre, publisere, kopiere eller auto-fylle en plan kontakter ingen på egen hånd, og planer som er foreløpige sender ingenting.
- Frivillige får fortsatt det vanlige varselet i appen. E-post- og tekstoppfølging kommer fra arbeidsflyten.
- Når den frivillige **godtar eller avslår**, lukkes kortet deres automatisk, sammen med eventuelle oppfølgingsoppgaver knyttet til det.
- Kortskuffen viser posisjonen, gudstjenestedatoen og en lenke til planen. I stedet for **Fullfør** står knappen **Registrer oppfølging gjort**. Når du klikker den, registreres at noen har fulgt opp, men kortet forblir åpent og tildelt (vist som **Venter på svar**) til den frivillige svarer, eller svarfristen passerer.
- Svarfristen er slutten av den siste gudstjenestetiden som posisjonens team tjenestegjør i. Hvis planen ikke har passende tider, er det slutten av gudstjenestedagen. Hvis ingen har svart innen da, lukkes kortet med **Svarfrist passert**, og en oppgave **Gjennomgå ubesvart tjenesteforespørsel** går til kortets nåværende eier eller tjenestens leder, slik at noen kan bestemme hvordan plassen skal dekkes. Oppdraget forblir **Ubekreftet**.
- Å fjerne oppdraget, endre personen, posisjonen eller plandatoen, sette planen tilbake til foreløpig, eller bytte planen til en annen bekreftelsesarbeidsflyt lukker kortet. Et lukket kort gjenåpnes aldri av et nytt **Varsle**; legg til et nytt oppdrag for å sende en fersk forespørsel.

:::info
For forespørsler sendt gjennom en bekreftelsesarbeidsflyt får bare frivillige som har **godtatt** [påminnelser for frivillige](./plans.md#volunteer-reminders), slik at personer som venter på å svare ikke får påminnelser i tillegg til arbeidsflytens oppfølginger.
:::

## Mine kort

Frivillige og ansatte trenger ikke å lete gjennom hver tavle for å finne arbeidet sitt. Listen **Mine kort** på siden **Mitt arbeid** viser hvert kort som er tildelt den nåværende brukeren, på tvers av alle arbeidsflyter. For å komme dit klikker du **Mine kort** øverst på siden Arbeidsflyter, eller åpner **Tjeneste > Mitt arbeid** i Hurtigmenyen. Når du klikker et kort, åpnes tavlen det tilhører.

## Rapporter

Åpne en arbeidsflyt og klikk **Rapporter** for å se analyser for den arbeidsflyten:

- **Forfalt** — antall kort som har passert forfallsdatoen.
- **Kort per trinn** — hvor mange kort som for øyeblikket ligger på hvert trinn, vist som et søylediagram.
- **Fullført (30 dager)** — gjennomstrømning de siste 30 dagene, vist som et linjediagram.

Bruk disse for å finne flaskehalser — for eksempel et trinn der kort hoper seg opp og aldri går videre.

## Relaterte artikler

- [Oppgaver](./tasks.md) — de enkelte handlingselementene arbeidsflytkortene er bygget på
- [Skjemaer](../forms/index.md) — bygg skjemaene som kan utløse arbeidsflyter
- [Grupper](../groups/index.md) — gruppene en handling «Legg til i gruppe» kan plassere personer i
- [Gudstjenesteplaner](./plans.md) — velg en bekreftelsesarbeidsflyt for en plans tjenesteforespørsler
- [Roller og tillatelser](../settings/roles-permissions.md) — styr hvem som kan se, redigere og administrere arbeidsflyter
