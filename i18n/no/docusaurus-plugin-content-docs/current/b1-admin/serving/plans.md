---
title: "Gudstjenesteplaner"
---

# Gudstjenesteplaner

<div class="article-intro">

Gudstjenesteplaner organiserer hvem som tjenestegjør og når. Hver plan er knyttet til en bestemt dato og tjeneste, noe som gjør det enkelt å koordinere de frivillige teamene dine uke for uke og sikre at hver gudstjeneste er fullt bemannet.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp tjenestene og teamene dine i området Tjeneste
- Sørg for at frivillige er lagt til i [personkatalogen din](../people/adding-people.md) og tilordnet team

</div>

## Åpne planer

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Tjeneste** og klikker **Planer**.
2. Velg en **fane for tjeneste** øverst på siden.
3. Klikk en **plantype** for å se listen over planer for den typen. Bruk **Kommende** og **Tidligere** over listen for å bytte mellom fremtidige og tidligere planer. **Kommende** lister planer fra i dag og fremover, de nærmeste først, med udaterte planer til slutt. **Tidligere** lister bare tidligere planer, de nyeste først.
4. Klikk på en bestemt plan for å åpne den.

Hver planside viser lenker tilbake til plantypen og til **Planer**, slik at du kan gå opp igjen uten nettleserens tilbakeknapp.

:::info
Full administratortilgang er ikke nødvendig for å administrere planer. Alle som er medlem av en tjeneste kan gå til Tjeneste og opprette, redigere og planlegge planer for sin egen tjeneste uten å trenge tillatelsen Plan – rediger. Redaktører med rollen Plan – rediger kan administrere planer på tvers av alle tjenester.
:::

## Opprette en plan

1. Fra plantypens side klikker du **Ny plan** øverst på siden.
2. Gi planen et navn, eller bruk datoen som navn. Velg **datoen** for gudstjenesten.
3. Hvis tjenesten din har [maler](./plan-templates.md), kan du velge en under **Start fra mal** for å fylle inn gudstjenesteprogrammet, posisjonene og notatene i ett steg.
4. Ellers, hvis du vil kopiere fra en tidligere plan, bruker du **Kopier fra forrige plan** for å velge **Bare posisjoner** eller **Posisjoner og tildelinger**. Hvis du ikke vil kopiere, velger du **Ingenting**. Du kan også krysse av for **Kopier gudstjenesteprogram**. Når du kopierer fra en tidligere plan, beholder den nye planen også den planens **Notater**, **Påmeldingsfrist**, **Vis navn på frivillige på påmeldingssiden** og innstillingen for automatisk erstatning, slik at du ikke trenger å skrive dem inn igjen hver uke. Du kan endre noen av dem i den nye planens innstillinger.
5. Hvis du vil sette opp flere uker samtidig mens du kopierer, skriv inn et tall i **Gjenta ukentlig i så mange uker** (opptil 12). B1 oppretter én plan per uke, hver kopiert fra den forrige. Hvis planen er navngitt etter datoen, får hver nye plan navn etter sin egen dato.
6. Eventuelt angi **Påmeldingsfrist (timer før gudstjenesten)**. En ny plan starter med den forrige planens frist, og du kan endre den her. La det stå tomt for ingen frist. Se [Planinnstillinger](#plan-settings) for hvordan fristen telles.
7. Lagre planen. Du kan nå begynne å tilordne teammedlemmer og bygge ut [gudstjenesteprogrammet](./service-order.md).

:::tip
**Gjenta ukentlig i så mange uker** er bare tilgjengelig mens du kopierer noe fra forrige plan (posisjoner, tildelinger eller gudstjenesteprogrammet).
:::

## Planens detaljside

Når du åpner en plan, vises planens navn, tjeneste, plantype og gudstjenestedato øverst, med knappene **Rediger** og **Skriv ut**. Under det er alt på én side:

- **[Gudstjenesteprogram](./service-order.md)** — bygg gudstjenesteprogrammet med elementer som lovsanger, bønner, kunngjøringer og talen.
- **Tildelinger i tjenesteteamet** — administrer hvilke teammedlemmer som er tilordnet denne planen. Du kan legge til personer fra de eksisterende teamene dine og se hvem som har bekreftet, eller fortsatt venter. Lenker over posisjonene lar deg åpne planens **Notater** og **Tider**.

## Tilordne teammedlemmer

1. Åpne en plan og scroll ned til **Tildelinger i tjenesteteamet**.
2. Klikk **Legg til posisjon**. Fyll inn informasjonen i skjemaet for å legge til en posisjon. For kategorinavn kan du skrive hva du vil. For at hvem som helst i kirken din skal kunne fylle posisjonen (ikke bare medlemmer av ett team), la **Frivillig gruppe** stå på **Ingen**.
3. Klikk på **Personer som trengs** og velg frivillige til å fylle posisjonen. Hvis posisjonen har en **Frivillig gruppe**, velger du blant medlemmene i den gruppen. Hvis dens frivillige gruppe er satt til **Ingen**, kan du søke etter hvem som helst i kirken i stedet.
4. Legg til medlemmer fra teamlisten din ved å klikke **Legg til**.
5. Tildelte medlemmer vises under teamet sitt med sin tildelingsstatus.
6. Klikk **varsle frivillige** for å varsle dem i B1-appen eller via e-post. Hvis planen bruker en [bekreftelsesarbeidsflyt](#plan-settings), starter varsling også et arbeidsflytkort som følger opp hver forespørsel til den frivillige svarer.

Hver posisjon viser en teller (for eksempel «2/3»), slik at du kan se hvor mange plasser som er fylt med et blikk. Under overskriften **Tildelinger i tjenesteteamet** viser et sammendrag («X av Y posisjoner fylt») den samlede bemanningen for planen, sammen med hvor mange som fortsatt mangler, og som bytter til **Fullt bemannet** når alle posisjoner er dekket.

:::tip
Sett opp teamene dine i tjenesteinnstillingene før du oppretter planer. Da har du en klar pool av frivillige å tildele fra.
:::

### Kopiere posisjoner inn i en tom plan

Hvis en plan ikke har noen posisjoner ennå, og det finnes en tidligere plan av samme type, vises en lenke **Kopier fra forrige plan** under **Tildelinger i tjenesteteamet**. Velg **Bare posisjoner** eller **Posisjoner og tildelinger** for å fylle planen du har åpen med den forrige planens posisjoner (og frivillige). Kopien går inn i den gjeldende planen; den oppretter ikke en ny plan for samme dato.

## Planinnstillinger

Hver plan har flere innstillinger du kan konfigurere ved å klikke **Rediger** ved siden av planen i plantypens liste, eller knappen **Rediger** øverst på planens side. Klikk **Ferdig** (eller planens navn) for å gå tilbake til planen. Disse inkluderer:

- **Påmeldingsfrist (timer før gudstjenesten)** — antall timer før gudstjenesten da påmeldingen for frivillige stenger. Timene telles tilbake fra planens første **gudstjenestetid** (øvelser og andre tider hoppes over med mindre planen ikke har noe annet), så en frist på 2 timer for en gudstjeneste kl. 10.00 stenger påmeldingen kl. 08.00 samme morgen. Hvis planen ikke har noen tider, telles fristen fra kl. 09.00 på gudstjenestedatoen i kirkens tidssone. Når den har passert, kan frivillige verken melde seg på eller fjerne seg selv. Skriv inn et negativt tall for å holde påmeldingen åpen etter at gudstjenesten har startet. La det stå tomt, eller tøm det, for ingen frist.
- **Bekreftelsesarbeidsflyt** — velg en [arbeidsflyt for bekreftelse av tjenesteoppdrag](./workflows.md#serving-assignment-confirmations) for å følge opp denne planens tjenesteforespørsler via e-post og tekst, til hver frivillig godtar eller avslår. Når du **varsler** frivillige på den publiserte planen, får hver ny forespørsel sitt eget kort på den arbeidsflytens tavle, og en merknad over varselslenken sier *«Nye forespørsler bruker bekreftelsesarbeidsflyten.»* La det stå på **Bruk eksisterende varsler for tjenesteoppdrag** for å beholde de vanlige varslene. Bare aktive bekreftelsesarbeidsflyter vises i listen; opprett en under **Tjeneste > Arbeidsflyter** først.
- **Vis navn på frivillige på påmeldingssiden** — når det er krysset av, kan innloggede frivillige se hvem andre som allerede er påmeldt hver posisjon på B1.church-påmeldingssiden. Navn vises aldri til besøkende som ikke er innlogget.
- **Foreløpig** — skjuler tildelinger for frivillige til du er klar til å publisere plantavlen.
- **Planlegg automatisk en erstatning når en frivillig avslår** — når det er krysset av, og en tildelt frivillig avslår sin posisjon, kontakter B1 automatisk den neste tilgjengelige personen på teamlisten og spør om de kan tjenestegjøre. Dette fortsetter nedover listen til noen godtar, slik at posisjonene dine forblir fylt uten manuell oppfølging.

:::tip
På påmeldingssiden for medlemmer er hver plans åpne posisjoner listet etter kategori og deretter etter navn. Medlemmer ser alle kommende uker med åpne posisjoner, med mindre du slår på **Vis bare neste uke for hver plantype** i [Innstillinger > Frivillig påmelding](../settings/church-settings.md#volunteer-signup).
:::

## Påminnelser til frivillige {#volunteer-reminders}

B1 kan automatisk minne frivillige på gudstjenestene de er planlagt for, slik at du ikke trenger å jage teamet ditt hver uke. Påminnelser sendes til **alle som er planlagt** — både de som har bekreftet og de som ikke har svart ennå. Unntaket er en forespørsel sendt via en [bekreftelsesarbeidsflyt](./workflows.md#serving-assignment-confirmations): den frivillige får påminnelser først etter at de har godtatt, siden arbeidsflyten håndterer oppfølgingen inntil da. Hver påminnelses e-post inkluderer den frivilliges posisjon(er), gudstjenestedatoen, planens notater og din egendefinerte melding.

Tidspunkt og innhold for påminnelser settes per **plantype**, slik at hver type tjeneste kan ha sin egen plan.

1. Fra området **Tjeneste** velger du tjenesten som inneholder plantypen.
2. I listen **Plantyper** klikker du **Rediger** ved siden av plantypen.
3. Utvid seksjonen **Påminnelser** og slå på **Send påminnelser for planer av denne typen**.
4. Under **Når skal påminnelser sendes?** velger du opptil tre tidspunkter: **7 dager før**, **3 dager før**, **2 dager før**, **1 dag før** eller **Samme dag**.
5. Sett **Klokkeslett** for når påminnelsene skal sendes.
6. Eventuelt legg til en **Melding**. La det stå tomt for å bruke standardteksten for påminnelser.
7. Under **Send via** velger du **Push**, **E-post** og, hvis kirken din har [en tekstmeldingstjeneste](../settings/church-settings.md#texting) koblet til, **Tekst**.
8. Klikk **Lagre påminnelser**.

Påminnelser er av for en plantype til du slår dem på.

:::tip
Frivillige som ikke har bekreftet ennå får knappene **Godta** og **Avslå** rett inne i påminnelsens e-post, slik at de kan svare uten å logge inn.
:::

### Tekstpåminnelser

Alternativet **Tekst** vises bare når kirken din har en tekstmeldingstjeneste koblet til. Tekstmeldinger sendes gjennom kirkens tekstmeldingstjeneste, og hver tekstmelding kan koste kirken din penger. En frivillig mottar bare en tekstpåminnelse hvis de har slått på **Tekstmeldinger** i sine [varslingsinnstillinger](../../b1-church/getting-started/notification-preferences.md) og har et mobilnummer på profilen sin. Hver tekstmelding begynner med kirkens navn, holdes til én enkelt tekstmelding, og avsluttes med «Svar STOPP for å melde deg av.». Alle som svarer STOPP slutter å motta tekster fra kirken din. For at STOPP-svar skal nå B1, lim inn **URL for innkommende (STOPP)-webhook** fra dine [tekstmeldingsinnstillinger](../settings/church-settings.md#texting) i leverandørens webhook for innkommende meldinger.

For å sende tekst til alle som er planlagt over et datointervall med en gang, bruk **Send tekst til frivillige** på [Planoversikten](./plans-overview.md#texting-everyone-scheduled).

:::info
Hver påminnelse sendes én gang. Tekstpåminnelser sendes i tillegg til push og e-post, ikke i stedet for dem.
:::

## Knytte grupper til en plantype

Under planlisten på plantypens side lar seksjonen **Tilknyttede grupper** deg bestemme hvilke grupper som kan se planene for denne plantypen fra medlemsportalen sin. Dette er en rask måte å vise kommende gudstjenester til de riktige teamene uten å gi dem administratortilgang.

1. På plantypens side klikker du **Tilknyttede grupper** øverst på siden (eller scroller ned til den seksjonen).
2. Klikk **Legg til gruppe** og velg en gruppe fra nedtrekkslisten.
3. I kolonnen **Viser** velger du om medlemmer av den gruppen skal se **Bare tidligere planer**, **Bare kommende planer** eller **Tidligere og kommende planer** for denne plantypen.
4. Gjenta for å knytte til flere grupper, eller klikk søppelbøtteikonet for å fjerne en gruppe.

:::info
Bare grupper merket som **Standard** vises i velgeren. Medlemmer av en tilknyttet gruppe ser automatisk denne plantypens planer på gruppens side i B1-medlemsportalen — begrenset til tidsvinduet du valgte.
:::

Hvis planene er Lessons.church-leksjoner, ser medlemmene av den tilknyttede gruppen også et kort **Ukens leksjon** på gruppesiden (bunnlinje, vers og et spørsmål til foreldre). Knytt en foreldregruppe hit og sett filteret til **Bare tidligere planer**, slik at dagens leksjon er med. Frivillige team bruker vanligvis **Bare kommende planer** eller **Tidligere og kommende planer**.

## Skrive ut planer

Du kan skrive ut en plan for å dele ut til teamet ditt. Åpne planen og klikk **Skriv ut** øverst på siden for å lage en utskriftsvennlig versjon som inkluderer tildelinger og gudstjenesteprogrammet. Toppen av utskriften viser kirkens logo (**Logo for lys bakgrunn** fra [Nettsted > Utseende](../website/appearance.md), hvis du har lastet opp en) med kirkens navn under, og planens navn, slik at løse ark er enkle å identifisere. Dette er nyttig for å dele ut på øvelser eller henge opp i et felles område.

Utskriften utelater alt som ville vært tomt. Hvis ingen frivillige er tildelt, er det ingen teamboks, og gudstjenesteprogrammet bruker hele sidebredden. Hvis ingen elementer har en lengde, utelates kolonnen **Lengde**, og hvis planen ikke har noen gudstjenestetider og ingen lengder, utelates også kolonnen **Tid**. For å fjerne den svarte overskriftslinjen **Gudstjenesteprogram** med gudstjenestedatoen, fjern merket for **Vis overskrift for gudstjenesteprogram** øverst på utskriftssiden; B1 Admin husker valget ditt i den nettleseren.

:::info
Planer er organisert etter tjeneste. Sørg for at du er på riktig fane for tjeneste før du oppretter eller viser planer.
:::

## Neste steg

- Bruk [Planoversikten](./plans-overview.md) for å se alle kommende tildelinger over flere uker i ett rutenett, og finn ubesatte posisjoner — og tildel frivillige direkte fra rutenettet
- Lagre en plans struktur som en [Planmal](./plan-templates.md), slik at du kan bruke den på fremtidige planer med ett klikk
- Bygg ut [gudstjenesteprogrammet](./service-order.md) med sanger, lesninger og andre elementer
- Legg til [sanger](./songs.md) fra biblioteket ditt direkte i gudstjenesteprogrammet
- Bruk [Oppgaver](./tasks.md) til å tildele oppfølgingsoppgaver til teammedlemmer
- Vis gjeldende leksjonsinnhold på en lobby-TV med [Digital skilting](./digital-signage.md)
