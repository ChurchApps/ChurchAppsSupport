---
title: "Arbeidsflyter"
---

# Arbeidsflyter

<div class="article-intro">

Arbeidsflyter fører mennesker gjennom en rekke trinn på en visuell tavle. Hver person blir et kort som flytter seg fra ett trinn til det neste -- fra oppfølging av en førstegangsbesøkende, via en medlemsprosess, til en takk til en førstegangsgiver, og alt annet der du må følge mange personer gjennom de samme stadiene. Et trinn kan be en frivillig om å gjøre noe (ringe, ta en samtale) **og** samtidig kjøre automatiske handlinger -- sende en e-post eller SMS, vente noen dager, legge personen til i en gruppe -- slik at arbeidsflyter dekker både den menneskelige oppfølgingen og rutinearbeidet rundt den. Arbeidsflyter utvider [Oppgaver](./tasks.md) til en Kanban-tavle med dra og slipp, slik at ingen faller mellom stolene.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Pass på at personene du vil følge opp finnes i B1 Admin
- Gjør deg kjent med hvordan [Oppgaver](./tasks.md) fungerer, siden hvert kort på en tavle er en oppgave
- For å bruke handlingen **Send e-post** må du først opprette e-postmalene du vil sende (administreres under **Meldinger → Administrer maler**)
- For å bruke handlingen **Send SMS** må du først koble til en [tekstmeldingsleverandør](../settings/church-settings.md#texting)
- Du trenger riktig tillatelse for Oppgaver. Visning, redigering av kort og administrasjon av arbeidsflyter er separate tillatelsesnivåer (se [Roller og tillatelser](../settings/roles-permissions.md))

</div>

## Vise arbeidsflyter

Åpne [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin), utvid **Tjeneste** og klikk på **Arbeidsflyter**. Du ser arbeidsflytene dine gruppert etter kategori, med aktive arbeidsflyter uthevet. Klikk på en arbeidsflyt for å åpne tavlen.

## Opprette en arbeidsflyt

1. På siden Arbeidsflyter klikker du på **Legg til arbeidsflyt**.
2. Velg hvordan du vil starte:
   - **Tom arbeidsflyt** -- start fra bunnen av og bygg dine egne trinn.
   - **Fra en mal** -- start med et ferdig sett med trinn som du kan redigere. Innebygde maler er blant annet:
     - **Oppfølging av nye besøkende** -- Send velkomst-e-post → Personlig telefonsamtale → Inviter til neste steg → Tilkoblet
     - **Medlemskurs** -- Uttrykk interesse → Meld deg på kurset → Delta på kurset → Fullfør medlemskap
     - **Takk til førstegangsgiver** -- Send takkebrev → Del hva gaven får bety → Forvaltet
3. Gi arbeidsflyten et **Navn**.
4. Du kan eventuelt velge en **Kategori** for å gruppere beslektede arbeidsflyter. Du kan opprette en ny kategori direkte fra nedtrekksmenyen.
5. La arbeidsflyten stå som **Aktiv** slik at personer kan legges til i den, eller sett den til **Inaktiv** for å skjule den fra listene over arbeidsflyter man kan legge til.
6. Klikk på **Lagre**.

:::tip
Bruk knappen **Dupliser** i listen over arbeidsflyter for å kopiere en eksisterende arbeidsflyt -- inkludert trinn, automatiske handlinger og ruting -- som utgangspunkt for en ny.
:::

## Bygge tavlen med trinn

Hver arbeidsflyttavle består av **trinn**, vist som kolonner fra venstre mot høyre. Åpne en arbeidsflyt og bruk **Legg til trinn** for å opprette hvert stadium i prosessen din.

Når du legger til eller redigerer et trinn, kan du konfigurere:

- **Trinnnavn** -- kolonneoverskriften (for eksempel «Velkomstsamtale» eller «Venter på registrering»).
- **Frist om (dager)** -- setter automatisk en frist når et kort kommer inn i dette trinnet. Kort som har passert fristen markeres som **Forfalt**.
- **Standard ansvarlig** -- personen eller gruppen som nye kort i dette trinnet automatisk tildeles.
- **Automatiske handlinger** -- ting systemet gjør av seg selv når et kort kommer inn (se nedenfor).
- **Ruting** -- hvor kortet går når det forlater trinnet (se [Ruting](#routing-cards-with-outcomes-and-conditions)).

Dra trinnkolonnene i den rekkefølgen som passer prosessen din. Rekkefølgen bestemmer også standardveien et kort følger når ingen annen ruting gjelder.

:::info
Lagre et nytt trinn først. Automatiske handlinger og ruting knyttes til trinnet, så redigeringsvinduet låser opp disse delene først når trinnet finnes.
:::

## Automatiske handlinger

Hvert trinn kan ha en liste med **automatiske handlinger** som kjører av seg selv i det øyeblikket et kort **kommer inn** i trinnet -- før noen har rørt det. Slik kan et trinn både be en frivillig om oppfølging *og* ta seg av rutinearbeidet rundt den.

I redigeringsvinduet for trinnet åpner du **Automatiske handlinger**, klikker på **Legg til handling**, velger en type, fyller ut innstillingene og klikker på lagre-ikonet på den handlingen. Legg til så mange du trenger; de kjører **ovenfra og ned i rekkefølge**.

| Handling | Hva den gjør |
|---|---|
| **Send e-post** | Sender personen en e-postmal du velger. Du kan endre emnelinjen. |
| **Send SMS** | Sender personen en melding du skriver, via kirkens [tekstmeldingsleverandør](../settings/church-settings.md#texting). |
| **Vent** | Setter kortet på pause i et antall dager før det går videre (se nedenfor). |
| **Legg til i gruppe** | Legger personen til i en [gruppe](../groups/index.md) du velger. |
| **Fjern fra gruppe** | Fjerner personen fra en gruppe du velger. |
| **Legg til i arbeidsflyt** | Starter personen på en annen arbeidsflyt -- nyttig for overlevering mellom prosesser. |
| **Legg til notat** | Registrerer et notat i kortets historikk. |
| **Sett felt** | Oppdaterer et felt i personens profil: medlemsstatus, sivilstatus, kjønn, by, fylke/delstat eller postnummer. |
| **Webhook** | Sender kortets detaljer til en ekstern nettadresse (URL) du oppgir, for å koble til andre systemer. |
| **Opprett oppgave** | Oppretter en [oppgave](./tasks.md) med tittelen og beskrivelsen du skriver inn, tildelt den du velger. |

Når alle handlingene i et trinn er ferdige, **blir kortet liggende i trinnet** slik at en person kan jobbe med det -- med mindre trinnet har en automatisk rute som flytter det videre (se [Helautomatiske trinn](#fully-automated-steps)).

:::info
Automatiske handlinger kjører bare når et kort kommer inn via den vanlige flyten -- når det først legges til, når et utfall eller en automatisk rute bringer det inn, eller etter at en Vent er ferdig. De kjører **ikke** på nytt når en medarbeider manuelt drar et kort til trinnet eller sender det tilbake, så en person får ikke den samme e-posten to ganger.
:::

### Sende e-post

Velg **Send e-post**, velg en av e-postmalene dine og skriv eventuelt et eget emne. Når et kort kommer inn i trinnet, får personen e-posten automatisk. (Hvis personen ikke har noen e-postadresse registrert, hopper trinnet ganske enkelt over denne handlingen.) [Flettefelt](../settings/email-templates.md#merge-fields) i malen, som `{{firstName}}`, fylles ut med personens egne opplysninger.

:::info
Arbeidsflyt-e-poster sendes først etter at kirken din er godkjent for gruppe-e-post, og de teller med i kirkens daglige e-postgrense. Se [Slå på gruppe-e-post for kirken din](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

### Sende en SMS

Velg **Send SMS** og skriv **Tekstmeldingen** (opptil 1 600 tegn). Når et kort kommer inn i trinnet, mottar personen meldingen på mobiltelefonen. Du kan personalisere meldingen med `{{firstName}}`, `{{lastName}}`, `{{displayName}}` eller `{{churchName}}`, som fylles ut med personens opplysninger når meldingen sendes.

- Hvis personen ikke har noen mobiltelefon registrert, hoppes handlingen over.
- Hvis personen har reservert seg, sendes ingen SMS, og kortets historikk viser **SMS hoppet over: reservert**.
- Når SMS-en er sendt, viser kortets historikk **SMS sendt**. Hvis sendingen mislykkes -- for eksempel fordi ingen tekstmeldingsleverandør er koblet til eller kirken har tomt for SMS-kreditter -- logges feilen i kortets historikk, og trinnets øvrige handlinger kjører likevel.

:::warning
SMS-er sendes via kirkens egen [tekstmeldingsleverandør](../settings/church-settings.md#texting). Hvis ingen leverandør er koblet til, advarer handlingsredigereren med *«Ingen tekstmeldingsleverandør er satt opp»*, og SMS-er blir ikke sendt.
:::

### Vente noen dager (drypp-sekvenser)

Handlingen **Vent** holder tilbake et kort i det antallet dager du angir. Mens det venter, vises kortet som **Utsatt**. Når ventetiden er over:

1. Alle **gjenstående handlinger i samme trinn** kjører -- slik at du kan bygge en drypp-sekvens som **Send e-post → Vent 3 dager → Send en påminnelses-e-post**.
2. Deretter flyttes kortet videre hvis trinnet har en automatisk rute; ellers blir det liggende i trinnet til en person tar det opp.

:::tip
En **Vent** helt i starten av et trinn er en enkel måte å «holde» et kort tilbake før det dukker opp hos en frivillig -- for eksempel *Vent 7 dager, deretter tar en veileder kontakt*.
:::

## Legge til personer som kort

Det finnes flere måter å få personer inn på en tavle:

- **Fra tavlen** -- Klikk på **Legg til kort** nederst i en trinnkolonne og velg en person. Du kan også velge en gruppe, og alle medlemmene i gruppen legges til som kort.
- **Fra en persons profil** -- Bruk **Legg til i arbeidsflyt** på personens side for å sette dem inn i en arbeidsflyt.
- **Fra personsøk** -- Velg flere personer og bruk massehandlingen **Legg til i arbeidsflyt** for å legge dem alle til samtidig.
- **Automatisk med en utløser** -- Legg til personer når noe skjer, som en skjemainnsending eller en første gave (se [Utløsere](#triggers) nedenfor).

## Arbeide med tavlen

Åpne en arbeidsflyt for å se tavlen. Hvert kort viser personens navn, hvem det er tildelt, og en merkelapp for frist eller status (**Forfalt** eller **Utsatt**). En trinnkolonne viser også små merker for eventuelle automatiske handlinger den kjører og merknader om rutingen, slik at du får et raskt oversiktskart over hvordan kortene flyter.

- **Flytt et kort** -- Dra et kort fra en kolonne til den neste etter hvert som personen kommer videre.
- **Åpne et kort** -- Dobbeltklikk på et kort (eller klikk på det) for å åpne detaljpanelet, der du kan endre trinn, tildele det på nytt, legge til notater og se hva som allerede har skjedd.

Fra kortpanelet kan du:

- **Tildele** kortet til en annen person eller gruppe.
- **Utsette** kortet i 1 dag, 3 dager eller 1 uke for å skjule fristen midlertidig.
- **Sende tilbake** til forrige trinn eller **Hoppe over** til neste trinn.
- **Feste tildeling** -- la samme eier beholde kortet selv om det flyttes mellom trinn. Som standard tildeles et kort på nytt til det nye trinnets standard ansvarlige når det flyttes; ved å feste beholder den nåværende personen ansvaret hele veien.
- **Fullføre** kortet for å avslutte det, eller velge en **Utfall**-knapp hvis trinnet har utfall konfigurert (se [Ruting](#routing-cards-with-outcomes-and-conditions)).
- **Legge til notater** og se kortets **historikk** -- inkludert en logg over automatiske handlinger som har kjørt (sendte e-poster, ventetider osv.).

### Massehandlinger

Merk avmerkingsboksene på flere kort for å behandle dem samlet. En verktøylinje vises der du kan **Fullføre**, **Utsette**, **Tildele på nytt** eller **Flytte** alle valgte kort til et annet trinn på én gang.

## Ruting av kort med utfall og betingelser

Ruting styrer hvor et kort går når det forlater et trinn. Åpne redigeringsvinduet for et trinn for å konfigurere to typer ruting.

### Utfallsknapper

Utfall er knapper som vises i kortpanelet når du fullfører et kort i det trinnet. I stedet for én enkelt **Fullfør**-knapp kan du tilby valg som «Ble med i en gruppe» eller «Ikke interessert». Hvert utfall kan:

- Sende kortet til **et annet trinn** i denne arbeidsflyten,
- **Overlevere kortet** til en helt annen arbeidsflyt, eller
- **Lukke** kortet.

Dermed kan én beslutning sende personen videre på ulike veier.

### Automatisk ruting (betinget)

Automatiske ruter flytter et kort videre **i det øyeblikket det kommer inn i et trinn** (og etter at de automatiske handlingene er ferdige), uten at noen klikker, hvis personen oppfyller et sett med betingelser. Legg til en rute, velg målsteget og definer én eller flere **betingelser** (for eksempel en persons menighetssted, alder eller medlemsstatus). En rute uten betingelser passer for alle.

:::info
På tavlen viser hver trinnkolonne små merknader som beskriver rutingen -- for eksempel en utfallsetikett eller «hvis treff» etterfulgt av en pil til målsteget eller målarbeidsflyten.
:::

## Helautomatiske trinn

Du kan la et trinn kjøre helt av seg selv, uten at noen jobber med det. Gi trinnet sine **automatiske handlinger** og legg til en **automatisk rute** (uten betingelser) som peker til neste trinn. Når et kort kommer inn, kjører handlingene, og deretter flytter ruten det videre umiddelbart -- kortet passerer rett gjennom.

:::tip
Kombiner dette med **Vent**: *Send velkomst-e-post → Vent 3 dager → gå automatisk videre til trinnet «Personlig samtale».* E-posten og tidspunktet tas hånd om for deg, og en frivillig ser bare kortet når det er tid for den menneskelige kontakten.
:::

## Utløsere

Utløsere legger automatisk personer til i en arbeidsflyt når noe skjer, slik at du aldri trenger å legge til kort for hånd. På en arbeidsflyttavle klikker du på fanen **Utløsere** og deretter **Legg til utløser**. Det finnes to typer:

### Hendelsesutløsere

Utløses så snart en post endres i B1. Velg hendelsen, og legg eventuelt til **betingelser** slik at bare matchende personer legges til:

- **Person · Opprettet / Oppdatert** -- f.eks. legg til alle som får statusen *Besøkende*.
- **Donasjon · Opprettet** -- f.eks. legg til en førstegangsgave eller en stor gave i en takke-arbeidsflyt (match på beløp, fond eller metode).
- **Gruppe · Medlem ble med** / **Gruppe · Opprettet**.
- **Skjema · Sendt inn** -- legg til alle som sender inn et valgt skjema (flott for et «Jeg er ny»- eller «Ta kontakt»-kort).

### Tidsplanutløsere

Kjører regelmessig -- daglig, ukentlig, månedlig eller årlig -- mot et sett med betingelser. Bruk disse til tidsbasert oppfølging, som *alle som har medlemsjubileum i dag* eller en *månedlig* oppfølging.

For alle utløsere kan du også angi:

- **Inngangstrinnet** det nye kortet starter på (standard er det første trinnet).
- **Én gang per person** -- slik at samme person ikke legges til i arbeidsflyten to ganger av utløseren.
- **Aktiv** -- slå utløseren av eller på uten å slette den.

:::tip
Kombiner en **Skjema · Sendt inn**-utløser med malen **Oppfølging av nye besøkende** for å gjøre «Kontaktkort»- eller «Jeg er ny»-skjemaet ditt om til en automatisk oppfølgingsrørledning.
:::

## Mine kort

Frivillige og ansatte trenger ikke grave gjennom hver tavle for å finne oppgavene sine. Siden **Mine kort** (lenket fra siden Arbeidsflyter) viser alle kort som er tildelt den innloggede brukeren på tvers av alle arbeidsflyter. Når du klikker på et kort, åpnes tavlen det hører til.

## Rapporter

Åpne en arbeidsflyt og klikk på **Rapporter** for å se analyser for den arbeidsflyten:

- **Forfalt** -- antall kort som har passert fristen.
- **Kort per trinn** -- hvor mange kort som for øyeblikket ligger i hvert trinn, vist som et søylediagram.
- **Fullført (30 dager)** -- gjennomstrømning de siste 30 dagene, vist som et linjediagram.

Bruk disse til å oppdage flaskehalser -- for eksempel et trinn der kort hoper seg opp og aldri kommer videre.

## Relaterte artikler

- [Oppgaver](./tasks.md) -- de enkelte oppgavene som arbeidsflytkortene bygger på
- [Skjemaer](../forms/index.md) -- bygg skjemaene som kan utløse arbeidsflyter
- [Grupper](../groups/index.md) -- gruppene en «Legg til i gruppe»-handling kan plassere personer i
- [Roller og tillatelser](../settings/roles-permissions.md) -- styr hvem som kan se, redigere og administrere arbeidsflyter
