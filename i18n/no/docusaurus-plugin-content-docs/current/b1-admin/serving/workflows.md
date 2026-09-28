---
title: "Arbeidsflyter"
---

# Arbeidsflyter

<div class="article-intro">

Arbeidsflyter flytter personer gjennom en serie med steg på et visuelt brett. Hver person blir til et kort som reiser fra ett steg til det neste -- fra oppfølging av førstegangsgast, til medlemskapsprosess, til takk til førstegangsgiver, og alt annet der du trenger å spore mange personer gjennom samme sett med stadier. Et steg kan spørre en frivillig om å gjøre noe (ringe, ha en samtale) **og** kjøre automatiserte handlinger på egenhånd -- sende en e-post, vente noen dager, legge personen til en gruppe -- så Arbeidsflyter håndterer både den menneskelige oppfølgingen og rutinearbeidet rundt det. Arbeidsflyter utvider [Oppgaver](./tasks.md) til et dra-og-slipp Kanban-brett slik at ingenting og ingen faller gjennom maskene.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sørg for at personene du vil spore finnes i B1 Admin
- Gjør deg kjent med hvordan [Oppgaver](./tasks.md) fungerer, siden hvert kort på et brett er en oppgave
- For å bruke handlingen **Send e-post**, opprett først e-postmalene du vil sende (administrert under **Meldinger → Administrer maler**)
- Du trenger den aktuelle oppgavistillatelsen. Visning, redigering av kort og administrasjon av arbeidsflyter er separate tillatelsenivåer (se [Roller og tillatelser](../settings/roles-permissions.md))

</div>

## Visning av arbeidsflyter

Naviger til **Serving** og velg **Workflows** fra menyen. Du vil se arbeidsflytene dine oppført og gruppert etter kategori, med aktive arbeidsflyter uthevet. Klikk på en hvilken som helst arbeidsflyt for å åpne brettet.

## Opprettelse av en arbeitsflyt

1. På siden Arbeidsflyter klikker du på **Legg til arbeitsflyt**.
2. Velg hvordan du vil starte:
   - **Tom arbeitsflyt** -- start fra bunnen og bygg dine egne steg.
   - **Fra en mal** -- start med et ferdig sett med steg du kan redigere. Innebygde maler inkluderer:
     - **Oppfølging av ny besøkende** -- Send velkomst-e-post → Personlig telefonsamtale → Inviter til neste steg → Koblet
     - **Medlemskapsklasse** -- Uttrykk interesse → Registrer deg for klasse → Delta i klasse → Fullfør medlemskap
     - **Takk til førstegangsgiver** -- Send takk-notat → Del givergavens innvirkning → Forvaltet
3. Gi arbeidsflyten et **Navn**.
4. Tilordne eventuelt en **Kategori** for å gruppere relaterte arbeidsflyter sammen. Du kan opprette en ny kategori direkte fra rullegardinmenyen.
5. La arbeidsflyten være **Aktiv** slik at personer kan legges til den, eller sett den til **Inaktiv** for å skjule den fra listen over arbeitsflyt-lister.
6. Klikk **Lagre**.

:::tip
Bruk **Dupliser**-knappen på Arbeitsflyt-listen for å kopiere en eksisterende arbeitsflyt -- inkludert dens steg, automatiserte handlinger og ruting -- som utgangspunkt for en ny.
:::

## Bygge brettet med steg

Hvert arbeitsflyt-brett er gjort opp av **steg**, vist som kolonner fra venstre til høyre. Åpne en arbeitsflyt og bruk **Legg til steg** for å opprette hver fase av prosessen.

Når du legger til eller redigerer et steg, kan du konfigurere:

- **Stegsnavn** -- kolonneoverskriften (for eksempel, "Velkomstsamtale" eller "Avventer registrering").
- **Forfallsdato (dager)** -- setter automatisk en forfallsdato når et kort enters dette steget. Kort forbi forfallsdatoen deres flagges som **Forfalt**.
- **Standardtilordning** -- personen eller gruppen nye kort på dette steget tilordnes automatisk.
- **Automatiserte handlinger** -- ting systemet gjør på egenhånd når et kort arrives (se nedenfor).
- **Ruting** -- hvor kortet går når det forlater steget (se [Ruting](#ruting-av-kort-med-resultater-og-betingelser)).

Dra stegkolonner inn i rekkefølgen som matcher prosessen din. Rekkefølgen definerer også standardbanen et kort tar når ingen annen ruting gjelder.

:::info
Lagre et nytt steg først. Automatiserte handlinger og ruting knytter seg til steget, så editoren låser opp disse seksjonene når steget finnes.
:::

## Automatiserte handlinger

Hvert steg kan føre en liste med **automatiserte handlinger** som kjøres av seg selv i det øyeblikket et kort **enters** steget -- før noen berører det. Dette er hvordan et steg både prompter en frivillig *og* tar seg av rutinearbeidet rundt oppfølgingen.

I stegeditor, åpne **Automatiserte handlinger**, klikk **Legg til handling**, velg en type, fyll inn innstillinger, og klikk lagre-ikonet på denne handlingen. Legg til så mange som du trenger; de kjøres **fra topp til bunn i rekkefølge**.

| Handling | Hva det gjør |
|---|---|
| **Send e-post** | Sender personen en e-postmal du velger. Du kan overstyre emnelinja. |
| **Vent** | Pause kortet for et antall dager før du fortsetter (se nedenfor). |
| **Legg til gruppe** | Legger personen til en [gruppe](../groups/index.md) du velger. |
| **Legg til arbeitsflyt** | Starter personen på en annen arbeitsflyt -- nyttig for å hånde av mellom prosesser. |
| **Legg til notat** | Registrerer et notat i kortets historie. |
| **Angi felt** | Oppdaterer et felt på personens post: Medlemskapsstatus, Sivilstand, Kjønn, By, Fylke eller Postnummer. |
| **Webhook** | Sender kortets detaljer til en ekstern nettadresse (URL) du oppgir, for tilkobling til andre systemer. |

Etter at alle et steghandlinger er ferdig, **hviler kortet på det steget** slik at en person kan arbeide det -- med mindre steget har en automatisk rute som flytter det videre (se [Helt automatiserte steg](#helt-automatiserte-steg)).

:::info
Automatiserte handlinger kjøres bare når et kort arrives gjennom normal flow -- når det først blir lagt til, når et resultat eller automatisk rute bringer det inn, eller etter en venting er slutt. De **gjør ikke** kjør igjen når en stab manuelt drar et kort på steget eller sender det tilbake, så en person vil ikke få den samme e-posten to ganger.
:::

### Sending av e-post

Velg **Send e-post**, velg en av e-postmalene dine, og skriv eventuelt et egendefinert emne. Når et kort enters steget, mottar personen e-posten automatisk. (Hvis personen ikke har noen e-postadresse på fil, hopper steget ganske enkelt over denne handlingen.)

:::info
Arbeitsflyt-e-poster sendes kun etter at kirken din er godkjent til å sende gruppee-post, og de teller mot kirkens daglige e-postgrense. Se [Slå på gruppee-post for kirken din](../groups/group-members.md#slå-på-gruppee-post-for-kirken-din).
:::

### Vente noen dager (drypsekvenser)

Handlingen **Vent** holder et kort for antall dager du setter. Mens det venter, vises kortet som **Utsatt**. Når ventetiden er over:

1. Alle **gjenværende handlinger på samme steg** kjøres -- slik at du kan bygge en dryp som **Send e-post → Vent 3 dager → Send påminnelse e-post**.
2. Deretter, hvis steget har en automatisk rute, moves kortet videre; ellers hviler det på steget for en person å ta tak.

:::tip
En **Vent** helt i begynnelsen av et steg er en enkel måte å "holde" et kort før det vises til en frivillig -- for eksempel, *Vent 7 dager, deretter en coach ringer*.
:::

## Legge til personer som kort

Det er flere måter å sette personer på et brett:

- **Fra brettet** -- Klikk **Legg til kort** nederst i en stegkolonne og velg en person. Du kan også velge en gruppe, og hvert medlem av gruppen legges til som kort.
- **Fra personens record** -- Bruk **Legg til arbeitsflyt** på en persons side for å droppe dem på en arbeitsflyt.
- **Fra People search** -- Velg flere personer og bruk bulk-handlingen **Legg til arbeitsflyt** for å legge dem alle til på en gang.
- **Automatisk med en trigger** -- Legg til personer når noe skjer, som en skjemainnsending eller en første gave (se [Triggers](#triggers) nedenfor).

## Arbeide med brettet

Åpne en arbeitsflyt for å se brettet. Hvert kort viser personens navn, hvem det er tilordnet til, og en forfallsdato eller statusbrikke (**Forfalt** eller **Utsatt**). En stegkolonne viser også små badges for alle automatiserte handlinger den kjører og merknader for rutingen, som gir deg et øyeblikksbilde over hvordan kort flyter.

- **Flytt et kort** -- Dra et kort fra en kolonne til den neste mens personen progrederer.
- **Åpne et kort** -- Dobbeltklikk et kort (eller klikk det) for å åpne skuffen for detaljer, der du kan endre steget, tilordne det på nytt, legge til notater, og gjennomgå hva som allerede har skjedd.

Fra kortskuffen kan du:

- **Tilordne** kortet til en annen person eller gruppe.
- **Utsett** kortet for 1 dag, 3 dager eller 1 uke for å midlertidig skjule forfallsdatoen.
- **Send tilbake** til forrige steg eller **Hopp over** til neste steg.
- **Pin-tilordning** -- behold samme eier på kortet mens det moves mellom steg. Som standard, når du moves et kort til et nytt steg, blir det tilordnet til det stegets standardtilordning; fastlåsing holder den aktuelle personen ansvarlig gjennom.
- **Fullfør** kortet for å avslutte det, eller velg en **Resultat**-knapp hvis steget har resultater konfigurert (se [Ruting](#ruting-av-kort-med-resultater-og-betingelser)).
- **Legg til notater** og gjennomgå kortets **historie** -- inkludert en logg over automatiserte handlinger som har kjørt (e-poster sendt, venting, osv.).

### Massehandlinger

Velg avmerkingsboksene på flere kort for å handle på dem sammen. Et verktøyslinje vises som lar deg **Fullfør**, **Utsett**, **Tilordne på nytt**, eller **Flytt** alle valgte kort til et annet steg på en gang.

## Ruting av kort med resultater og betingelser

Ruting kontrollerer hvor et kort går når det forlater et steg. Åpne en stegredaktør for å konfigurere to typer ruting.

### Resultatknapper

Resultater er knapper som vises i kortskuffen når du er ferdig med et kort på det steget. I stedet for en enkelt **Fullfør**-knapp, kan du tilby valg som "Tilsluttet en gruppe" eller "Ikke interessert." Hvert resultat kan:

- Sende kortet til **et annet steg** i denne arbeidsflyten,
- **Overlevere kortet** til en helt annen arbeitsflyt, eller
- **Lukk** kortet.

Dette lar en beslutning forgrene personen nedover ulike baner.

### Automatisk ruting (betinget)

Automatiske ruter moves et kort videre **i det øyeblikket det enters et steg** (og etter dets automatiserte handlinger er ferdig), uten at noen klikker, hvis personen matches et sett med betingelser. Legg til en rute, velg målsteget, og definer en eller flere **betingelser** (for eksempel, en persons campus, alder eller medlemskapsstatus). En rute uten betingelser matches alle.

:::info
På brettet, viser hver stegkolonne små merknader som beskriver rutingen -- for eksempel en resultat-etikett eller "hvis matches" etterfulgt av en pil til destinasjons steg eller arbeitsflyt.
:::

## Helt automatiserte steg

Du kan gjøre et steg kjøres helt på egenhånd, uten at noen arbeider det. Gi steget dets **automatiserte handlinger** og legg til en **automatisk rute** (uten betingelser) som peker til neste steg. Når et kort enters, kjøres handlingene, og deretter moves ruten det umiddelbart videre -- kortet passeres rett gjennom.

:::tip
Kombiner dette med **Vent**: *Send velkomst-e-post → Vent 3 dager → automatisk advance til "Personlig samtale"-steget.* E-posten og timingen håndteres for deg, og en frivillig ser bare kortet når det er på tide for menneskelig berøring.
:::

## Triggers

Triggers legger til personer i en arbeitsflyt automatisk når noe skjer, slik at du aldri må legge til kort for hånd. På et arbeitsflyt-brett, klikk på **Triggers**-fanen, deretter **Legg til trigger**. Det er to typer:

### Event triggers

Utløses så snart en post endres i B1. Velg hendelsen, og legg eventuelt til **betingelser** slik at kun matching personer legges til:

- **Person · Created / Updated** -- f.eks. legg til hvem som helst hvis status blir *Besøkende*.
- **Donation · Created** -- f.eks. legg til en første eller stor gave til en takk-arbeitsflyt (match på beløp, fond eller metode).
- **Group · Member Joined** / **Group · Created**.
- **Form · Submitted** -- legg til hvem som helst som sender inn et valgt skjema (flott for "Jeg er ny" eller "Koble"-kort).

### Schedule triggers

Kjør på gjentakende grunnlag -- daglig, ukentlig, månedlig eller årlig -- mot et sett med betingelser. Bruk disse for tidsbasert outreach som *alle hvis medlemskapsanniversary er i dag* eller en *månedlig* innsjekking.

For alle triggers kan du også sette:

- **Entry steg** det nye kortet starter på (standard til første steg).
- **Én gang per person** -- slik at samme person ikke legges til arbeidsflyten to ganger av triggeren.
- **Aktiv** -- slå triggeren på eller av uten å slette den.

:::tip
Pair a **Form · Submitted** trigger med **Ny besøkende oppfølging**-malen for å gjøre "Connect Card" eller "Jeg er ny"-skjemaet til en automatisk oppfølgingspipeline.
:::

## Mine kort

Frivillige og ansatte trenger ikke å grave gjennom alle brett for å finne arbeidet sitt. Siden **Mine kort** (lenket fra Arbeitsflyt-siden) lister alle kort som er tilordnet den nåværende bruker på tvers av alle arbeitsflyter. Klikk på et kort for å åpne brettet det tilhører.

## Rapporter

Åpne en arbeitsflyt og klikk **Rapporter** for å se analyser for den arbeidsflyten:

- **Forfalt** -- antall kort forbi forfallsdatoen.
- **Kort per steg** -- hvor mange kort som for øyeblikket sitter på hvert steg, vist som et søylediagram.
- **Fullført (30 dager)** -- gjennomstrømning over de siste 30 dagene, vist som et linjediagram.

Bruk disse for å oppdage flaskehalser -- for eksempel, et steg der kort ansamler og aldri advanced.

## Relaterte artikler

- [Oppgaver](./tasks.md) -- de enkelte handlingselementer som arbeitsflyt-kort er bygget på
- [Skjemaer](../forms/index.md) -- bygge skjemaene som kan utløse arbeitsflyter
- [Grupper](../groups/index.md) -- gruppene en "Legg til gruppe"-handling kan plassere personer i
- [Roller og tillatelser](../settings/roles-permissions.md) -- styr hvem som kan vise, redigere og administrere arbeitsflyter
