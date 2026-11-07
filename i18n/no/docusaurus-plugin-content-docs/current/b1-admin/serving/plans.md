---
title: "Gudstjenesteplaner"
description: "Planlegg frivillige i B1 Admin: lag gudstjenesteplaner etter dato, kopier fra tidligere uker, tildel posisjoner og sett påmeldingsfrister og påminnelser."
---

# Gudstjenesteplaner

<div class="article-intro">

Gudstjenesteplaner organiserer hvem som tjenestegjør og når. Hver plan er knyttet til en bestemt dato og tjeneste, noe som gjør det enkelt å koordinere frivillige team uke for uke og sikre at hver gudstjeneste er fullt bemannet.

</div>

## Opplæringsvideo

<YouTube id="47DstBXKl74" title="Lage planer og planlegge frivillige i B1" next="Bygge gudstjenesteordenen og sangbiblioteket i B1" nextUrl="/docs/b1-admin/serving/service-order" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp tjenestene og teamene dine i området Tjeneste
- Sørg for at frivillige er lagt til i [personkatalogen din](../people/adding-people.md) og tilordnet team

</div>

## Åpne planer

1. I B1 Admin åpner du [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Tjeneste** og klikker **Planer**.
2. Velg en **tjenestefane** øverst på siden.
3. Klikk på en **plantype** for å se listen over planer for den typen. Bruk **Kommende** og **Tidligere** over listen for å bytte mellom fremtidige og tidligere planer. **Kommende** lister planer fra i dag og utover, tidligste først, med udaterte planer til slutt. **Tidligere** lister bare tidligere planer, nyeste først.
4. Klikk på en bestemt plan for å åpne den.

Hver planside viser lenker tilbake til plantypen og til **Planer**, slik at du kan gå opp igjen uten nettleserens tilbakeknapp.

:::info
Full administratortilgang kreves ikke for å administrere planer. Alle som er medlem av en tjeneste, kan gå til Tjeneste og opprette, redigere og planlegge planer for sin egen tjeneste uten å trenge tillatelsen Rediger planer. Redaktører med rollen Rediger planer kan administrere planer i alle tjenester.
:::

## Opprette en plan

1. Fra plantypesiden klikker du **Ny plan** øverst på siden.
2. Gi planen et navn, eller bruk datoen som navn. Velg **datoen** for gudstjenesten.
3. Hvis tjenesten din har [maler](./plan-templates.md), kan du velge en under **Start fra mal** for å fylle inn gudstjenesteorden, posisjoner og notater i ett steg.
4. Ellers, hvis du vil kopiere fra en tidligere plan, bruker du **Kopier fra forrige plan** og velger **Bare posisjoner** eller **Posisjoner og tildelinger**. Hvis du ikke vil kopiere, velger du **Ingenting**. Du kan også krysse av for **Kopier gudstjenesteorden**. Når du kopierer fra en tidligere plan, beholder den nye planen også den planens **Notater**, **Påmeldingsfrist**, **Vis navn på frivillige på påmeldingssiden** og innstillingen for automatisk erstatning, slik at du ikke må taste dem inn på nytt hver uke. Du kan endre noen av dem i den nye planens innstillinger.
5. For å sette opp flere planer på en gang mens du kopierer, velger du **Gjenta hver** og **Frekvens** (Dag, Uke eller Måned), og angir deretter **Antall planer** (opptil 12). For Måned lar **På** deg beholde samme dag i måneden eller samme ukedag, for eksempel den andre lørdagen. B1 viser datoene før du lagrer og oppretter én plan for hver dato, hver kopiert fra den før den. Hvis planen er navngitt etter datoen, får hver ny plan navn etter sin egen dato.
6. Eventuelt angi **Påmeldingsfrist (timer før gudstjeneste)**. En ny plan starter med forrige plans frist, og du kan endre den her. La feltet stå tomt for ingen frist. Se [Planinnstillinger](#plan-settings) for hvordan fristen telles.
7. Lagre planen. Du kan nå begynne å tilordne teammedlemmer og bygge ut [gudstjenesteordenen](./service-order.md).

:::tip
Gjentakelsesinnstillingene er bare tilgjengelige mens du kopierer noe fra forrige plan (posisjoner, tildelinger eller gudstjenesteorden).
:::

## Planens detaljside

Når du åpner en plan, vises planens navn, tjeneste, plantype og gudstjenestedato øverst, med knappene **Rediger** og **Skriv ut**. Under det er alt på én side:

- **[Gudstjenesteorden](./service-order.md)** -- Bygg gudstjenesteordenen med elementer som lovsangssanger, bønner, kunngjøringer og preken.
- **Tjenesteteamtildelinger** -- Administrer hvilke teammedlemmer som er tildelt denne planen. Du kan legge til personer fra eksisterende team, og se hvem som har bekreftet eller fortsatt venter. Lenker over posisjonene lar deg åpne planens **Notater** og **Tider**.

## Tildele teammedlemmer {#assigning-team-members}

1. Åpne en plan og bla ned til **Tjenesteteamtildelinger**.
2. Klikk **Legg til posisjon**. Fyll ut informasjonen i skjemaet for å legge til en posisjon. Velg hvilket kategorinavn du vil. For at hvem som helst i kirken din skal kunne fylle posisjonen (ikke bare medlemmer av ett team), la **Frivillig gruppe** stå på **Ingen**.
3. Klikk på **Personer som trengs** og velg frivillige til å fylle posisjonen. Hvis posisjonen har en **Frivillig gruppe**, velger du blant medlemmene i den gruppen. Hvis dens frivillig gruppe er satt til **Ingen**, kan du søke etter hvem som helst i kirken din i stedet.
4. Legg til medlemmer fra teamlisten din ved å klikke **Legg til**.
5. Tildelte medlemmer vises under sitt team med sin tildelingsstatus.
6. Klikk varsle frivillige for å varsle dem i B1-appen eller via e-post. Hvis planen bruker en [bekreftelsesarbeidsflyt](#plan-settings), starter varsling også et arbeidsflytkort som følger opp hver forespørsel til den frivillige svarer.

Hver posisjon viser en teller (for eksempel «2/3») slik at du ser med et blikk hvor mange plasser som er fylt. Under overskriften **Tjenesteteamtildelinger** viser et sammendrag («X av Y posisjoner fylt») den samlede bemanningen for planen, sammen med hvor mange som fortsatt mangler. Det byttes til **Fullt bemannet** når alle posisjoner er dekket.

:::tip
Sett opp teamene dine i tjenesteinnstillingene før du oppretter planer. Da har du en klar pool av frivillige å tildele fra.
:::

### Kopiere posisjoner inn i en tom plan

Hvis en plan ikke har noen posisjoner ennå, og det finnes en tidligere plan av samme type, vises en lenke **Kopier fra forrige plan** i **Tjenesteteamtildelinger**. Velg **Bare posisjoner** eller **Posisjoner og tildelinger** for å fylle planen du har åpen med den forrige planens posisjoner (og frivillige). Kopien går inn i den gjeldende planen; den oppretter ikke en ny plan for samme dato.

## Planinnstillinger {#plan-settings}

Hver plan har flere innstillinger du kan konfigurere ved å klikke **Rediger** ved siden av planen i plantypens liste, eller knappen **Rediger** øverst på planssiden. Klikk **Ferdig** (eller planens navn) for å gå tilbake til planen. Disse inkluderer:

- **Påmeldingsfrist (timer før gudstjeneste)** -- antall timer før gudstjenesten da påmeldingen for frivillige stenger. Timene telles tilbake fra planens første **gudstjeneste**-tid (øvinger og andre tider hoppes over, med mindre planen ikke har noe annet), slik at en frist på 2 timer for en gudstjeneste kl. 10.00 stenger påmeldingen kl. 08.00 samme morgen. Hvis planen ikke har noen tider, telles fristen fra kl. 09.00 på gudstjenestedatoen i kirkens tidssone. Når den har passert, kan frivillige verken melde seg på eller fjerne seg selv. Skriv inn et negativt tall for å holde påmeldingen åpen etter at gudstjenesten har startet. La feltet stå tomt, eller tøm det, for ingen frist.
- **Bekreftelsesarbeidsflyt** -- velg en [arbeidsflyt for bekreftelse av tjenesteoppdrag](./workflows.md#serving-assignment-confirmations) for å følge opp denne planens tjenesteforespørsler per e-post og SMS til hver frivillig godtar eller avslår. Når du **varsler** frivillige på den publiserte planen, får hver ny forespørsel sitt eget kort på den arbeidsflytens tavle, og en merknad over varslingslenken sier *«Nye forespørsler bruker bekreftelsesarbeidsflyten.»* La den stå på **Bruk eksisterende varsler for oppdrag** for å beholde de vanlige varslene. Bare aktive bekreftelsesarbeidsflyter vises i listen; opprett en under **Tjeneste > Arbeidsflyter** først.
- **Vis navn på frivillige på påmeldingssiden** -- når den er krysset av, kan innloggede frivillige se hvem andre som allerede er påmeldt hver posisjon på påmeldingssiden på B1.church. Navn vises aldri til besøkende som ikke er innlogget.
- **Foreløpig planlagt** -- skjuler oppdrag for frivillige til du er klar til å publisere planen.
- **Planlegg automatisk en erstatning når en frivillig avslår** -- når den er krysset av, og en tildelt frivillig avslår sin posisjon, kontakter B1 automatisk neste tilgjengelige person på teamlisten og spør om de kan tjenestegjøre. Dette fortsetter nedover listen til noen godtar, slik at posisjonene forblir fylt uten manuell oppfølging.

:::tip
På påmeldingssiden for medlemmer listes hver plans ledige posisjoner etter kategori og deretter etter navn. Medlemmer ser hver kommende uke med ledige posisjoner, med mindre du slår på **Vis bare neste uke for hver plantype** under [Innstillinger > Påmelding for frivillige](../settings/church-settings.md#volunteer-signup).
:::

## Påminnelser til frivillige {#volunteer-reminders}

B1 kan automatisk minne frivillige på gudstjenestene de er planlagt til, slik at du ikke må jage teamet ditt hver uke. Påminnelser går til **alle som er planlagt** -- både de som har bekreftet og de som ikke har svart ennå. Unntaket er en forespørsel sendt gjennom en [bekreftelsesarbeidsflyt](./workflows.md#serving-assignment-confirmations): den frivillige får påminnelser først etter at de har godtatt, siden arbeidsflyten håndterer oppfølgingen frem til da. Hver påminnelses e-post inneholder den frivilliges posisjon(er), gudstjenestedatoen, planens notater og din egendefinerte melding.

Tidspunkt og innhold for påminnelser settes per **plantype**, slik at hver type tjeneste kan ha sin egen plan.

1. Fra området **Tjeneste** velger du tjenesten som inneholder plantypen.
2. I listen **Plantyper** klikker du **Rediger** ved siden av plantypen.
3. Utvid seksjonen **Påminnelser** og slå på **Send påminnelser for planer av denne typen**.
4. Under **Når skal påminnelsene sendes?** velger du opptil tre tidspunkter: **7 dager før**, **3 dager før**, **2 dager før**, **1 dag før** eller **Samme dag**.
5. Angi **klokkeslettet** påminnelsene skal sendes.
6. Eventuelt legg til en **melding**. La den stå tom for å bruke standardteksten for påminnelser.
7. Under **Send med** velger du **Push**, **E-post** og, hvis kirken din har en [SMS-leverandør](../settings/church-settings.md#texting) koblet til, **SMS**.
8. Klikk **Lagre påminnelser**.

Påminnelser er av for en plantype til du slår dem på.

:::tip
Frivillige som ikke har bekreftet ennå, får knappene **Godta** og **Avslå** rett i påminnelses-e-posten, slik at de kan svare uten å logge inn.
:::

### SMS-påminnelser {#text-reminders}

Alternativet **SMS** vises bare når kirken din har en SMS-leverandør koblet til. SMS-meldinger sendes via kirkens SMS-leverandør, og hver SMS kan koste kirken din penger. En frivillig mottar bare en SMS-påminnelse hvis de har slått på **Tekstmeldinger** i sine [varslingsinnstillinger](../../b1-church/getting-started/notification-preferences.md) og har et mobilnummer på profilen sin. Hver SMS starter med kirkens navn, holdes til én enkelt melding, og avsluttes med «Svar STOP for å melde deg av.» Alle som svarer STOP, slutter å få SMS fra kirken din. For at STOP-svar skal nå B1, lim inn **URL for innkommende (STOP)-webhook** fra dine [SMS-innstillinger](../settings/church-settings.md#texting) i leverandørens webhook for innkommende meldinger.

For å sende SMS til alle planlagte over et datointervall med en gang, bruk **Send SMS til frivillige** på [Oversikt over planer](./plans-overview.md#texting-everyone-scheduled).

:::info
Hver påminnelse sendes én gang. SMS-påminnelser sendes i tillegg til push og e-post, ikke i stedet for dem.
:::

## Koble grupper til en plantype

Under planlisten på plantypesiden lar seksjonen **Tilknyttede grupper** deg bestemme hvilke grupper som kan se planene for denne plantypen fra medlemsportalen. Dette er en rask måte å vise kommende gudstjenester til de riktige teamene uten å gi dem administratortilgang.

1. På plantypesiden klikker du **Tilknyttede grupper** øverst på siden (eller blar ned til den seksjonen).
2. Klikk **Legg til gruppe** og velg en gruppe i nedtrekkslisten.
3. I kolonnen **Viser** velger du om medlemmer av den gruppen skal se **Bare tidligere planer**, **Bare kommende planer** eller **Tidligere og kommende planer** for denne plantypen.
4. Gjenta for å knytte flere grupper, eller klikk søppelbøtteikonet for å fjerne en gruppe.

:::info
Bare grupper merket **Standard** vises i velgeren. Medlemmer av en tilknyttet gruppe ser automatisk denne plantypens planer på gruppens side i B1-medlemsportalen -- begrenset til tidsrommet du valgte.
:::

Hvis planene er Lessons.church-leksjoner, ser medlemmer av den tilknyttede gruppen også et kort **Ukens leksjon** på gruppesiden (bunnlinje, vers og et spørsmål for foreldre). Knytt en foreldregruppe hit og sett filteret til **Bare tidligere planer**, slik at dagens leksjon er med. Frivillige team bruker vanligvis **Bare kommende planer** eller **Tidligere og kommende planer**.

## Skrive ut planer {#printing-plans}

Du kan skrive ut en plan for å dele ut til teamet ditt. Åpne planen og klikk **Skriv ut** øverst på siden for å lage en utskriftsversjon som inkluderer tildelinger og gudstjenesteorden. Øverst på utskriften vises kirkens logo (**logo for lys bakgrunn** fra [Nettsted > Utseende](../website/appearance.md), hvis du har lastet opp en) med kirkens navn under, og planens navn, slik at løse ark er enkle å identifisere. Dette er nyttig å dele ut på øvinger eller henge opp i et felles område.

Utskriften utelater alt som ville vært tomt. Hvis ingen frivillige er tildelt, er det ingen teamboks, og gudstjenesteordenen bruker hele sidebredden. Hvis ingen elementer har en lengde, utelates kolonnen **Lengde**, og hvis planen ikke har noen gudstjenestetider og ingen lengder, utelates også kolonnen **Tid**. For å fjerne den svarte overskriftslinjen **Gudstjenesteorden** med gudstjenestedatoen, fjern merket for **Vis overskrift for gudstjenesteorden** øverst på utskriftssiden. B1 Admin husker valget ditt i nettleseren.

:::info
Planer er organisert etter tjeneste. Pass på at du er på riktig tjenestefane før du oppretter eller ser på planer.
:::

## Neste steg

- Bruk [Oversikt over planer](./plans-overview.md) for å se alle kommende oppdrag over flere uker i ett rutenett, finne ubesatte posisjoner -- og tildele frivillige direkte fra rutenettet
- Lagre en plans struktur som en [plan-mal](./plan-templates.md), slik at du kan legge den på fremtidige planer med ett klikk
- Bygg ut [gudstjenesteordenen](./service-order.md) med sanger, lesninger og andre elementer
- Legg til [sanger](./songs.md) fra biblioteket ditt direkte i gudstjenesteordenen
- Bruk [Oppgaver](./tasks.md) for å tildele oppfølgingsoppgaver til teammedlemmer
- Vis gjeldende leksjonsinnhold på en TV i lobbyen med [Digital skilting](./digital-signage.md)
