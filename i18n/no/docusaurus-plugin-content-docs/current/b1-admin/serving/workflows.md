---
title: "Arbeidsflyter"
---

# Arbeidsflyter {#workflows}

<div class="article-intro">

Arbeidsflyter fører personer gjennom en rekke steg på en visuell tavle. Hver person blir et kort som flytter fra ett steg til neste – fra oppfølging av en gjest som kommer for første gang, til en medlemsprosess, til en takkemelding til en som gir for første gang, og alt annet der du må følge mange personer gjennom de samme stadiene. Et steg kan be en frivillig om å gjøre noe (ringe, ha en samtale) **og** kjøre automatiserte handlinger på egen hånd – sende en e-post eller tekstmelding, vente noen dager, legge personen til i en gruppe – slik at arbeidsflyter tar seg av både den menneskelige oppfølgingen og det rutinemessige arbeidet rundt den. Arbeidsflyter utvider [Oppgaver](./tasks.md) til en Kanban-tavle med dra-og-slipp, slik at ingen faller mellom stolene.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sørg for at personene du vil følge opp finnes i B1 Admin
- Gjør deg kjent med hvordan [Oppgaver](./tasks.md) fungerer, siden hvert kort på en tavle er en oppgave
- For å bruke handlingen **Send e-post** må du først opprette e-postmalene du vil sende (administreres under **Innstillinger → E-postmaler**)
- For å bruke handlingen **Send tekstmelding** må du først koble til en [tekstmeldingsleverandør](../settings/church-settings.md#texting)
- Du trenger riktig tillatelse for Oppgaver. Å se, redigere kort og administrere arbeidsflyter er separate tillatelsesnivåer (se [Roller og tillatelser](../settings/roles-permissions.md))

</div>

## Vise arbeidsflyter {#viewing-workflows}

Åpne [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin), utvid **Tjeneste**, og klikk på **Arbeidsflyter**. Arbeidsflytene dine vises i en tabell med **Kategori** og **Status** (**Aktiv** eller **Inaktiv**) for hver. Hvis du bruker kategorier, lar fanene over listen deg filtrere den etter kategori. Klikk på en arbeidsflyt for å åpne tavlen.

## Opprette en arbeidsflyt {#creating-a-workflow}

1. På siden Arbeidsflyter klikker du på **Legg til arbeidsflyt**.
2. Velg hvordan du vil starte:
   - **Tom arbeidsflyt** – start fra bunnen av og bygg dine egne steg.
   - **Fra en mal** – start med et ferdig sett med steg som du kan redigere. Innebygde maler inkluderer:
     - **Oppfølging av nye besøkende** – Send velkomst-e-post → Personlig telefonsamtale → Inviter til neste steg → Tilknyttet
     - **Medlemskurs** – Vis interesse → Meld deg på kurset → Delta på kurset → Fullfør medlemskap
     - **Takk til førstegangsgivere** – Send takkekort → Del hvilken effekt gaven har → Forvaltet
3. Gi arbeidsflyten et **Navn**.
4. Du kan eventuelt angi en **Kategori** for å gruppere beslektede arbeidsflyter. Du kan opprette en ny kategori direkte fra nedtrekkslisten.
5. La arbeidsflyten være **Aktiv** slik at personer kan legges til i den, eller sett den til **Inaktiv** for å skjule den fra listene for å legge til i arbeidsflyt.
6. Klikk på **Lagre**.

:::tip
Bruk knappen **Dupliser** på listen over arbeidsflyter for å kopiere en eksisterende arbeidsflyt – inkludert steg, automatiserte handlinger og ruting – som utgangspunkt for en ny.
:::

## Bygge tavlen med steg {#building-the-board-with-steps}

Hver arbeidsflyttavle består av **steg**, vist som kolonner fra venstre til høyre. Åpne en arbeidsflyt og bruk **Legg til steg** for å opprette hvert trinn i prosessen din.

Når du legger til eller redigerer et steg, kan du konfigurere:

- **Stegnavn** – kolonneoverskriften (for eksempel «Velkomstsamtale» eller «Venter på registrering»).
- **Forfaller om (dager)** – setter automatisk en forfallsdato når et kort kommer til dette steget. Kort som er over forfallsdatoen, merkes som **Forfalt**.
- **Standard ansvarlig** – personen eller gruppen som nye kort på dette steget automatisk tildeles. Når standard ansvarlig er en person, får de et varsel om at et kort er tildelt dem.
- **Automatiserte handlinger** – ting systemet gjør av seg selv når et kort kommer (se nedenfor).
- **Ruting** – hvor kortet går når det forlater steget (se [Ruting](#routing-cards-with-outcomes-and-conditions)).

Dra stegkolonnene i rekkefølgen som samsvarer med prosessen din. Rekkefølgen definerer også standardveien et kort tar når ingen annen ruting gjelder.

:::info
Lagre et nytt steg først. Automatiserte handlinger og ruting knyttes til steget, så redigeringsverktøyet låser opp disse delene når steget finnes.
:::

## Automatiserte handlinger {#automated-actions}

Hvert steg kan ha en liste med **automatiserte handlinger** som kjøres av seg selv øyeblikket et kort **kommer inn** i steget – før noen rører det. Slik kan et steg både be en frivillig om å gjøre noe *og* ta seg av det rutinemessige arbeidet rundt oppfølgingen.

I steg-redigeringsverktøyet åpner du **Automatiserte handlinger**, klikker på **Legg til handling**, velger en type, fyller inn innstillingene og klikker på lagreikonet for den handlingen. Legg til så mange du trenger; de kjøres **fra topp til bunn i rekkefølge**.

| Handling | Hva den gjør |
|---|---|
| **Send e-post** | Sender personen en e-postmal du velger. Du kan overstyre emnelinjen. |
| **Send tekstmelding** | Sender personen en melding du skriver, via kirkens [tekstmeldingsleverandør](../settings/church-settings.md#texting). |
| **Vent** | Setter kortet på pause i et antall dager før det fortsetter (se nedenfor). |
| **Legg til i gruppe** | Legger personen til i en [gruppe](../groups/index.md) du velger. |
| **Fjern fra gruppe** | Fjerner personen fra en gruppe du velger. |
| **Legg til i arbeidsflyt** | Starter personen i en annen arbeidsflyt – nyttig for overlevering mellom prosesser. |
| **Legg til notat** | Registrerer et notat i kortets historikk. |
| **Angi felt** | Oppdaterer et felt på personens post: Medlemsstatus, Sivilstatus, Kjønn, By, Fylke eller Postnummer. |
| **Webhook** | Sender kortets detaljer til en ekstern webadresse (URL) du oppgir, for å koble til andre systemer. |
| **Opprett oppgave** | Oppretter en [oppgave](./tasks.md) med tittelen og beskrivelsen du skriver, tildelt den du velger. |

Etter at alle handlingene i et steg er ferdige, **blir kortet stående på det steget** slik at en person kan jobbe med det – med mindre steget har en automatisk ruting som flytter det videre (se [Helt automatiserte steg](#fully-automated-steps)).

:::info
Automatiserte handlinger kjøres bare når et kort kommer inn gjennom den vanlige flyten – når det legges til for første gang, når et utfall eller en automatisk ruting fører det inn, eller etter at en venting er ferdig. De kjøres **ikke** på nytt når et teammedlem drar et kort manuelt til steget eller sender det tilbake, så en person får ikke den samme e-posten to ganger.
:::

### Sende e-post {#sending-email}

Velg **Send e-post**, velg en av e-postmalene dine, og skriv eventuelt et eget emne. Når et kort kommer inn i steget, mottar personen e-posten automatisk. (Hvis personen ikke har en e-postadresse registrert, hopper steget over denne handlingen.) [Flettefelt](../settings/email-templates.md#merge-fields) i malen, for eksempel `{{firstName}}`, fylles inn med personens egne opplysninger.

:::info
E-post i arbeidsflyter sendes først når kirken din er godkjent for å sende gruppe-e-post, og de teller mot kirkens daglige e-postgrense. Se [Slå på gruppe-e-post for kirken din](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

### Sende tekstmelding {#sending-a-text}

Velg **Send tekstmelding** og skriv inn **Tekstmelding** (opptil 1 600 tegn). Når et kort kommer inn i steget, mottar personen meldingen på mobiltelefonen sin. Du kan tilpasse meldingen med `{{firstName}}`, `{{lastName}}`, `{{displayName}}` eller `{{churchName}}`, som fylles inn med personens opplysninger når meldingen sendes.

- Hvis personen ikke har et mobilnummer registrert, sendes ingen melding, og kortets historikk registrerer **Tekstmelding hoppet over: ingen mobiltelefon**.
- Hvis personen har meldt seg av, sendes ingen melding, og kortets historikk registrerer **Tekstmelding hoppet over: avmeldt**.
- Når meldingen sendes, registrerer kortets historikk **Tekstmelding sendt**. Hvis sendingen mislykkes – for eksempel fordi ingen tekstmeldingsleverandør er tilkoblet, eller kirken din er tom for tekstmeldingskreditt – logges feilen i kortets historikk, og de gjenværende handlingene i steget kjøres likevel.

:::warning
Tekstmeldinger sendes via kirkens egen [tekstmeldingsleverandør](../settings/church-settings.md#texting). Hvis ingen leverandør er tilkoblet, advarer handlingsredigeringsverktøyet med *«Ingen tekstmeldingsleverandør er satt opp»*, og tekstmeldinger sendes ikke.
:::

### Vente noen dager (dryppsekvenser) {#waiting-a-few-days-drip-sequences}

Handlingen **Vent** holder et kort i det antall dager du angir. Mens det venter, vises kortet som **Satt på pause**. B1 sjekker etter ferdige ventetider hvert 30. minutt, så et kort fortsetter igjen innen cirka en halv time etter at ventetiden er over. Når ventetiden er over:

1. Eventuelle **gjenværende handlinger i samme steg** kjøres – slik at du kan bygge en dryppsekvens som **Send e-post → Vent 3 dager → Send en påminnelses-e-post**.
2. Deretter, hvis steget har en automatisk ruting, flytter kortet seg videre; ellers blir det stående på steget til en person tar det.

:::tip
En **Vent** helt i begynnelsen av et steg er en enkel måte å «holde tilbake» et kort før det vises for en frivillig – for eksempel *Vent 7 dager, og deretter tar en coach kontakt*.
:::

## Legge til personer som kort {#adding-people-as-cards}

Det finnes flere måter å legge personer på en tavle:

- **Fra tavlen** – klikk på **Legg til kort** nederst i en stegkolonne og velg en person. Du kan også velge en gruppe, og hvert medlem i gruppen legges til som et kort.
- **Fra en persons post** – bruk **Legg til i arbeidsflyt** på en persons side for å sette dem inn i en arbeidsflyt.
- **Fra personsøk** – velg flere personer og bruk massehandlingen **Legg til i arbeidsflyt** for å legge dem til samtidig.
- **Automatisk med en utløser** – legg til personer når noe skjer, for eksempel en skjemainnsending eller en første gave (se [Utløsere](#triggers) nedenfor).

## Arbeide med tavlen {#working-the-board}

Åpne en arbeidsflyt for å se tavlen. Hvert kort viser personens navn, hvem det er tildelt, og en merkelapp for forfallsdato eller status (**Forfalt** eller **Satt på pause**). En stegkolonne viser også små merker for eventuelle automatiserte handlinger den kjører, og merknader for ruting, slik at du raskt ser hvordan kortene flyter.

- **Flytt et kort** – dra et kort fra én kolonne til den neste når personen går videre.
- **Åpne et kort** – dobbeltklikk på et kort (eller klikk på det) for å åpne detaljpanelet, der du kan endre steg, tildele det på nytt, legge til notater og se hva som allerede har skjedd.

Fra kortpanelet kan du:

- **Tildele** kortet til en annen person eller gruppe.
- **Sette på pause** kortet i 1 dag, 3 dager eller 1 uke for midlertidig å skjule forfallsdatoen.
- **Send tilbake** til forrige steg eller **Hopp over** til neste steg.
- **Fastsett tildeling** – behold samme eier på kortet selv når det flytter mellom steg. Som standard tildeles kortet på nytt til standard ansvarlig for steget når det flyttes; ved å feste tildelingen beholder den nåværende personen ansvaret gjennom hele prosessen.
- **Fullfør** kortet for å avslutte det, eller velg en **Utfall**-knapp hvis steget har utfall konfigurert (se [Ruting](#routing-cards-with-outcomes-and-conditions)).
- **Legg til notater** og se kortets **Aktivitet** – en logg over automatiserte handlinger som har kjørt (sendte e-poster, ventetider osv.).

For et kort om en person viser panelet også personens mobiltelefon og e-post som lenker du kan trykke på for å ringe eller sende e-post, pluss en lenke **Vis profil** hvis du har tillatelse til å se personer. Personen kortet er tildelt, ser telefonnummeret og e-posten selv uten tilgang til Personer.

Notater lagres sammen med kortet. Alle som kan åpne kortet – inkludert personen eller gruppen det er tildelt – kan lese notatene og legge til egne. Personer som ikke kan åpne kortet, kan ikke se notatene.

### Massehandlinger {#bulk-actions}

Kryss av i boksene på flere kort for å utføre handlinger på dem samlet. En verktøylinje vises som lar deg **Fullfør**, **Sett på pause**, **Tildel** (tildel på nytt) eller **Flytt til…** et annet steg for alle valgte kort samtidig.

## Ruting av kort med utfall og betingelser {#routing-cards-with-outcomes-and-conditions}

Ruting styrer hvor et kort går når det forlater et steg. Åpne et steg for redigering for å konfigurere to typer ruting.

### Utfallsknapper {#outcome-buttons}

Utfall er knapper som vises i kortpanelet når du fullfører et kort på det steget. I stedet for én enkelt **Fullfør**-knapp kan du tilby valg som «Ble med i en gruppe» eller «Ikke interessert». Hvert utfall kan:

- Sende kortet til **et annet steg** i denne arbeidsflyten,
- **Overlevere kortet** til en helt annen arbeidsflyt, eller
- **Lukke** kortet.

Dette lar én beslutning føre personen inn på ulike veier.

### Automatisk ruting (betinget) {#automatic-routing-conditional}

Automatiske ruter flytter et kort videre **øyeblikket det kommer inn i et steg** (og etter at de automatiserte handlingene er ferdige), uten at noen klikker, hvis personen oppfyller et sett med betingelser. Legg til en rute, velg målsteget, og definer én eller flere **betingelser** (for eksempel en persons menighet, alder eller medlemsstatus). Tekstfelt kan matches eksakt eller med **inneholder**, **begynner med** eller **slutter med**. En rute uten betingelser gjelder for alle.

Hvis en rutes betingelser av en eller annen grunn ikke kan sjekkes, behandles ruten som om den ikke gjelder. Kortet blir stående på steget (eller følger en annen rute som gjelder) i stedet for å sette seg fast.

:::info
På tavlen viser hver stegkolonne små merknader som beskriver rutingen – for eksempel en utfallsetikett, eller «hvis det stemmer» etterfulgt av en pil til målsteget eller arbeidsflyten.
:::

## Helt automatiserte steg {#fully-automated-steps}

Du kan la et steg kjøre helt av seg selv, uten at noen jobber med det. Gi steget dets **automatiserte handlinger** og legg til en **automatisk ruting** (uten betingelser) som peker til neste steg. Når et kort kommer inn, kjøres handlingene, og deretter flytter ruten kortet videre med en gang – kortet går rett gjennom.

:::tip
Kombiner dette med **Vent**: *Send velkomst-e-post → Vent 3 dager → flytt automatisk til steget «Personlig samtale».* E-posten og timingen ordner seg av seg selv, og en frivillig ser kortet først når det er tid for den menneskelige kontakten.
:::

## Utløsere {#triggers}

Utløsere legger personer til i en arbeidsflyt automatisk når noe skjer, slik at du aldri må legge til kort for hånd. På en arbeidsflyttavle klikker du på fanen **Utløsere**, og deretter på **Legg til utløser**. Det finnes to typer:

### Hendelsesutløsere {#event-triggers}

Utløses så snart en post endres i B1. Velg hendelsen, og legg eventuelt til **betingelser** slik at bare passende personer legges til:

- **Person · Opprettet / Oppdatert** – for eksempel legg til alle hvis status blir *Besøkende*.
- **Gave · Opprettet** – for eksempel legg til en første eller stor gave i en takkearbeidsflyt (match på beløp, fond eller metode).
- **Gruppe · Medlem ble med** / **Gruppe · Opprettet**.
- **Skjema · Innsendt** – legg til alle som sender inn et valgt skjema (flott for et kort som «Jeg er ny» eller «Kontakt»).

### Tidsplanutløsere {#schedule-triggers}

Kjøres med fast intervall – daglig, ukentlig, månedlig eller årlig – mot et sett med betingelser. Bruk disse til tidsbestemt oppfølging, for eksempel *alle hvis medlemsjubileum er i dag* eller en *månedlig* innsjekk.

For alle utløsere kan du også angi:

- **Startsteg** kortet havner i (standard er første steg).
- **Bare én gang per person** – slik at samme person ikke legges til i arbeidsflyten to ganger av utløseren.
- **Aktiv** – slå utløseren av eller på uten å slette den.

:::tip
Kombiner en utløser for **Skjema · Innsendt** med malen **Oppfølging av nye besøkende** for å gjøre kontaktkortet eller «Jeg er ny»-skjemaet ditt om til en automatisk oppfølgingsprosess.
:::

## Mine kort {#my-cards}

Frivillige og ansatte trenger ikke å lete gjennom hver tavle for å finne arbeidet sitt. Listen **Mine kort** på siden **Mitt arbeid** viser alle kort som er tildelt den innloggede brukeren, på tvers av alle arbeidsflyter. For å komme dit klikker du på **Mine kort** øverst på siden Arbeidsflyter, eller åpner **Tjeneste > Mitt arbeid** i Hurtigmenyen. Når du klikker på et kort, åpnes tavlen det tilhører.

## Rapporter {#reports}

Åpne en arbeidsflyt og klikk på **Rapporter** for å se statistikk for den arbeidsflyten:

- **Forfalt** – antall kort som er over forfallsdatoen.
- **Kort per steg** – hvor mange kort som ligger på hvert steg akkurat nå, vist som et søylediagram.
- **Fullført (30 dager)** – gjennomstrømning de siste 30 dagene, vist som et linjediagram.

Bruk disse til å finne flaskehalser – for eksempel et steg der kort hoper seg opp og aldri går videre.

## Relaterte artikler {#related-articles}

- [Oppgaver](./tasks.md) – de enkelte handlingspunktene som arbeidsflytkort er bygget på
- [Skjemaer](../forms/index.md) – bygg skjemaene som kan utløse arbeidsflyter
- [Grupper](../groups/index.md) – gruppene som handlingen «Legg til i gruppe» kan plassere personer i
- [Roller og tillatelser](../settings/roles-permissions.md) – styr hvem som kan se, redigere og administrere arbeidsflyter
