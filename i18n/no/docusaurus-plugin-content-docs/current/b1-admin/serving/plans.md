---
title: "Gudstjenesteplaner"
description: "Sett opp frivillig-planlegging i B1 Admin: opprett gudstjenesteplaner etter dato, kopier fra tidligere uker, tilordne teammedlemmer til posisjoner, og administrer påmeldingsfrister og påminnelser."
---

# Gudstjenesteplaner

<div class="article-intro">

Gudstjenesteplaner organiserer hvem som tjener og når. Hver plan er knyttet til en bestemt dato og tjeneste, noe som gjør det enkelt å koordinere frivillige team uke for uke og sikre at hver gudstjeneste er fullt bemannet.

</div>

## Opplæringsvideo {#training-video}

<YouTube id="_ekj0UR6H5g" title="Opprette planer og planlegge frivillige i B1" next="Bygge gudstjenesterekkefølgen og sangbiblioteket i B1" nextUrl="/docs/b1-admin/serving/service-order" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp tjenestene og teamene dine i tjenesteområdet
- Kontroller at frivillige er lagt til i [personkatalogen](../people/adding-people.md) din og tilordnet team

</div>

## Åpne planer {#accessing-plans}

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Tjeneste** og klikker på **Planer**.
2. Velg en **fane for tjeneste** øverst på siden.
3. Klikk på en **plantype** for å se listen over planer for den typen. Bruk **Kommende** og **Tidligere** over listen for å bytte mellom fremtidige og tidligere planer. **Kommende** lister planer fra og med i dag, tidligst først, med planer uten dato på slutten. **Tidligere** lister bare tidligere planer, nyeste først.
4. Klikk på en bestemt plan for å åpne den.

Hver planside viser lenker tilbake til plantypen og til **Planer**, slik at du kan gå tilbake uten å bruke nettleserens tilbakeknapp.

:::info
Full administratortilgang er ikke nødvendig for å administrere planer. Alle som er medlem av en tjeneste, kan gå til Tjeneste og opprette, redigere og planlegge planer for sin egen tjeneste uten å trenge tillatelsen Rediger planer. Redaktører med rollen Rediger planer kan administrere planer i alle tjenester.
:::

## Opprette en plan {#creating-a-plan}

1. Fra siden for plantypen klikker du på **Ny plan** øverst på siden. Skjemaet **Legg til en plan** åpnes.
2. Gi planen et navn, eller bruk datoen som navn. Velg **tjenestedatoen**. Hvis menigheten din har mer enn én menighetsenhet, kan du også velge planens **menighetsenhet**.
3. Hvis tjenesten din har [maler](./plan-templates.md), kan du velge en under **Start fra mal** for å fylle inn gudstjenesterekkefølgen, posisjoner og notater i ett steg.
4. Ellers, hvis du vil kopiere fra en tidligere plan, bruker du **Kopier fra forrige plan** for å velge **Bare posisjoner** eller **Posisjoner og oppdrag**. Hvis du ikke vil kopiere, velger du **Ingenting**. Du kan også krysse av for **Kopier gudstjenesterekkefølge**. Når du kopierer fra en tidligere plan, beholder den nye planen også den planens **Notater**, **Påmeldingsfrist**, innstillingen **Vis navn på frivillige på påmeldingssiden** og innstillingen for automatisk erstatning, slik at du slipper å skrive dem inn på nytt hver uke. Du kan endre hvilken som helst av dem i innstillingene for den nye planen.
5. For å sette opp flere planer samtidig mens du kopierer, velger du **Gjenta hver** og **Frekvens** (Dag, Uke eller Måned), og skriver deretter inn **Antall planer** (opptil 12). For Måned lar **På** deg beholde samme dag i måneden eller samme ukedag, for eksempel andre lørdag. B1 viser datoene før du lagrer, og oppretter én plan for hver dato, hver kopiert fra den forrige. Hvis planen er navngitt etter datoen, får hver nye plan navn etter sin egen dato.
6. Eventuelt setter du **Påmeldingsfrist (timer før gudstjeneste)**. En ny plan starter med den forrige planens frist, og du kan endre den her. La den stå tom for ingen frist. Se [Innstillinger for plan](#plan-settings) for hvordan fristen telles.
7. Lagre planen. Du kan nå begynne å tilordne teammedlemmer og bygge ut [gudstjenesterekkefølgen](./service-order.md).

:::tip
Innstillingene for gjentakelse er bare tilgjengelige mens du kopierer noe fra den forrige planen (posisjoner, oppdrag eller gudstjenesterekkefølgen).
:::

## Planssiden {#the-plan-page}

Når du åpner en plan, vises tjenesten og plantypen, navnet og tjenestedatoen øverst, med knappene **Skriv ut** og **Rediger detaljer**. Siden gir deg en oversikt over hele planen:

- **Kjøretid**, **Tjenesteteam** og **Svar** viser lengden på gudstjenesterekkefølgen, hvor mange posisjoner som er fylt (for eksempel «10 av 13 fylt»), og hvor mange frivillige som har takket ja, venter eller har takket nei.
- **Gudstjenesterekkefølge** viser de første elementene i [gudstjenesterekkefølgen](./service-order.md) med lengden deres. Klikk på **Rediger gudstjenesterekkefølge** for å åpne hele gudstjenesterekkefølgen på sin egen side.
- **Tjenesteteam** lister hver posisjon etter kategori, med de frivillige som er tilordnet, og hvor mange som fortsatt trengs. Hvis noe trenger oppmerksomhet, vises en linje som «1 konflikt · 3 ikke varslet» med en lenke til **Gjennomgå**. Klikk på **Administrer tjenesteteam** for å åpne hele siden for tjenesteteam.
- **Tider** lister planens gudstjeneste- og øvingstider. Se [Gudstjenestetider](#service-times).
- **Notater** inneholder notater for hele teamet. Klikk på **Rediger**, skriv notatene dine og klikk på **Lagre notater**.

Sidene for gudstjenesterekkefølge og tjenesteteam har hver en lenke **Tilbake til plan** som fører deg tilbake til oversikten.

## Gudstjenestetider {#service-times}

Tider forteller B1 når gudstjenesten og eventuelle øvinger finner sted. De brukes til påmeldingsfristen, [planvalidering](./plan-validation.md), påminnelser til frivillige og klokkeslettene i gudstjenesterekkefølgen.

1. På planssiden klikker du på **Legg til tid** ved siden av **Tider**.
2. Velg **Type**: **Gudstjeneste**, **Øving** eller **Annet**.
3. Skriv inn et **visningsnavn** (for eksempel «Søndagsgudstjeneste» eller «Øving»).
4. Sett **starttid** og **sluttid**.
5. Under **Nødvendige tjenesteteam** krysser du av for posisjonskategoriene (for eksempel Lovsang eller Teknisk) som tjener på dette tidspunktet.
6. Klikk på **Lagre**.

Klikk på navnet til en tid for å redigere eller slette den.

## Tilordne teammedlemmer {#assigning-team-members}

1. Åpne en plan og klikk på **Administrer tjenesteteam**.
2. Klikk på **Legg til posisjon**. I dialogen **Legg til en posisjon** velger eller skriver du inn et **kategorinavn** (for eksempel Lovsang eller Gjestfrihet), skriver inn posisjonens **navn** og **antall frivillige**, og velger en **frivilliggruppe**. For å la hvem som helst i menigheten din fylle posisjonen (ikke bare medlemmer av ett team), lar du **Frivilliggruppe** stå på **Ingen**. Kryss av for **Tillat selvpåmelding** for å la frivillige melde seg på ledige plasser selv, og legg til en valgfri **beskrivelse** som de frivillige ser når de blar i påmeldingsmulighetene. Klikk på **Lagre**.
3. Klikk på lenken **Personer som trengs** ved siden av posisjonen (for eksempel «2 personer som trengs»).
4. I dialogen **Tilordne posisjon** klikker du på et teammedlems navn for å tilordne dem. Hvis posisjonens frivilliggruppe er satt til **Ingen**, søker du i stedet etter hvem som helst i menigheten din og klikker på ikonet for å legge til person ved siden av personen. Klikk på **Ferdig** når du er ferdig.
5. Tilordnede frivillige vises ved siden av posisjonen. En grønn prikk på bildet deres betyr at de har takket ja, og en rød prikk betyr at de har takket nei.
6. Varsle de frivillige fra panelet **Validering** (se [Varsle frivillige](./plan-validation.md#notifying-volunteers)). Hvis planen bruker en [bekreftelsesarbeidsflyt](#plan-settings), starter varsling også et arbeidsflytkort som følger opp hver forespørsel til den frivillige svarer.

For å endre eller fjerne et oppdrag klikker du på den frivilliges navn og klikker på **Slett** i dialogen **Rediger oppdrag**. For å endre en posisjon klikker du på navnet; **Slett** i dialogen **Rediger posisjon** fjerner posisjonen og avplanlegger alle som er tilordnet den.

Hver posisjon viser en tellebrikke (for eksempel «2/3», eller «1/2 påmelding» for posisjoner med selvpåmelding), slik at du ser hvor mange plasser som er fylt med et blikk. Øverst på siden for tjenesteteam viser en oppsummering («X av Y posisjoner fylt») den totale bemanningen for planen, sammen med hvor mange som fortsatt trengs. Den bytter til **Fullt bemannet** når alle posisjoner er dekket.

:::tip
Sett opp teamene dine i innstillingene for tjenesten før du oppretter planer. Da har du en klar pool av frivillige å tilordne fra.
:::

### Automatisk tilordning {#auto-assign}

Klikk på **Automatisk tilordning** på siden for tjenesteteam for å fylle alle ledige plasser fra posisjonens frivilliggruppe. Posisjoner uten frivilliggruppe hoppes over. For å ta tilbake frivillige som nettopp ble lagt til, klikker du på **Angre automatisk tilordning**. Du kan også fylle mange planer samtidig fra [Planoversikten](./plans-overview.md#auto-scheduling-from-the-overview).

### Planleggingspreferanser {#scheduling-preferences}

I dialogen **Tilordne posisjon** klikker du på skyveikonet ved siden av et teammedlem for å angi deres **planleggingspreferanser**: **Maks antall ganger per måned**, **foretrukne gudstjenestetider** og **planlegging for husstand** (planlegg husstanden sammen, eller ikke samme dag). [Planvalidering](./plan-validation.md) varsler deg når et oppdrag strider mot disse preferansene.

### Kopiere posisjoner inn i en tom plan {#copying-positions-into-an-empty-plan}

Hvis en plan ikke har posisjoner ennå, og det finnes en tidligere plan av samme type, vises en lenke **Kopier fra forrige plan** på siden for tjenesteteam. Velg **Bare posisjoner** eller **Posisjoner og oppdrag** for å fylle den åpne planen med posisjonene (og de frivillige) fra forrige plan. Kopien går inn i den gjeldende planen; den oppretter ikke en ny plan for samme dato.

## Innstillinger for plan {#plan-settings}

Hver plan har flere innstillinger du kan konfigurere ved å klikke på **Rediger** ved siden av planen i listen for plantypen, eller **Rediger detaljer** øverst på planssiden. Klikk på **Ferdig** (eller planens navn over skjemaet) for å gå tilbake til planen. Det samme skjemaet har en knapp **Slett** som sletter planen, inkludert posisjonene, oppdragene og gudstjenesterekkefølgen. Innstillingene inkluderer:

- **Påmeldingsfrist (timer før gudstjeneste)** — antall timer før gudstjenesten da påmeldingen for frivillige stenger. Timene telles bakover fra planens første **gudstjeneste**-tid (øvinger og andre tider hoppes over med mindre planen ikke har noe annet), så en frist på 2 timer for en gudstjeneste kl. 10:00 stenger påmeldingen kl. 08:00 den morgenen. Hvis planen ikke har noen tider, telles fristen fra kl. 09:00 på tjenestedatoen i menighetens tidssone. Når fristen har passert, kan frivillige verken melde seg på eller melde seg av. Skriv inn et negativt tall for å holde påmeldingen åpen etter at gudstjenesten har startet. La feltet stå tomt, eller tøm det, for ingen frist.
- **Bekreftelsesarbeidsflyt** — velg en [arbeidsflyt for bekreftelse av tjenesteoppdrag](./workflows.md#serving-assignment-confirmations) for å følge opp tjenesteforespørslene for denne planen via e-post og tekstmelding, til hver frivillig takker ja eller nei. Når du **varsler** frivillige på den publiserte planen, får hver ny forespørsel sitt eget kort på den arbeidsflytens tavle, og en merknad over varslingslenken sier *«Nye forespørsler bruker bekreftelsesarbeidsflyten.»* La den stå på **Bruk eksisterende varsler for oppdrag** for å beholde de vanlige varslene. Bare aktive bekreftelsesarbeidsflyter vises i listen; opprett en under **Tjeneste > Arbeidsflyter** først.
- **Vis navn på frivillige på påmeldingssiden** — når dette er krysset av, kan innloggede frivillige se hvem andre som allerede er meldt på hver posisjon på påmeldingssiden på B1.church. Navn vises aldri til besøkende som ikke er logget inn. Innstillingen styrer også om de frivillige som dekker hvert element i gudstjenesterekkefølgen skrives ut ved siden av det (se [Skrive ut planer](#printing-plans)).
- **Foreløpig** — skjuler oppdrag for frivillige til du er klar til å publisere planen. Mens en plan er foreløpig, viser panelet **Validering** på siden for tjenesteteam en knapp for **Publiser plan** (eller **Publiser og varsle** når de frivillige ikke er varslet ennå), som gjør oppdragene synlige.
- **Planlegg automatisk en erstatning når en frivillig takker nei** — når dette er krysset av, og en tilordnet frivillig takker nei til sin posisjon, kontakter B1 automatisk neste tilgjengelige person i teamlisten og spør om de kan tjene. Dette fortsetter nedover listen til noen takker ja, slik at posisjonene forblir fylt uten manuell oppfølging.

:::tip
På påmeldingssiden for medlemmer listes hver plans ledige posisjoner etter kategori og deretter etter navn. Medlemmer ser hver kommende uke med ledige posisjoner, med mindre du slår på **Vis bare neste uke for hver plantype** i [Innstillinger > Frivillig påmelding](../settings/church-settings.md#volunteer-signup).
:::

## Påminnelser til frivillige {#volunteer-reminders}

B1 kan automatisk minne frivillige på gudstjenestene de er planlagt for, slik at du ikke må jage teamet ditt hver uke. Påminnelser sendes til **alle som er planlagt** — både de som har bekreftet og de som ikke har svart ennå. Unntaket er en forespørsel sendt gjennom en [bekreftelsesarbeidsflyt](./workflows.md#serving-assignment-confirmations): den frivillige får påminnelser først etter at de har takket ja, siden arbeidsflyten følger opp frem til da. Hver påminnelses e-post inkluderer den frivilliges posisjon(er), tjenestedatoen, planens notater og din egen melding.

Tidspunkt og innhold for påminnelser settes per **plantype**, slik at hver type gudstjeneste kan ha sin egen plan.

1. Fra området **Tjeneste** velger du tjenesten som inneholder plantypen.
2. I listen **Plantyper** klikker du på **Rediger** ved siden av plantypen.
3. Utvid delen **Påminnelser** og slå på **Send påminnelser for planer av denne typen**.
4. Under **Når skal påminnelsene sendes?** velger du opptil tre tidspunkter: **7 dager før**, **3 dager før**, **2 dager før**, **1 dag før** eller **Samme dag**.
5. Sett **klokkeslettet** påminnelsene sendes.
6. Eventuelt legger du til en **melding**. La den stå tom for å bruke standardteksten for påminnelser.
7. Under **Send via** velger du **Push**, **E-post** og, hvis menigheten din har en [tekstmeldingsleverandør](../settings/church-settings.md#texting) koblet til, **Tekstmelding**.
8. Klikk på **Lagre påminnelser**.

Påminnelser er av for en plantype til du slår dem på.

:::tip
Frivillige som ikke har bekreftet ennå, får knappene **Ta imot** og **Takk nei** rett inne i påminnelses-e-posten, slik at de kan svare uten å logge inn.
:::

### Tekstpåminnelser {#text-reminders}

Alternativet **Tekstmelding** vises bare når menigheten din har en tekstmeldingsleverandør koblet til. Tekstmeldinger sendes gjennom menighetens tekstmeldingsleverandør, og hver tekstmelding kan koste menigheten din penger. En frivillig mottar bare en tekstpåminnelse hvis de har slått på **Tekstmeldinger** i sine [varslingsinnstillinger](../../b1-church/getting-started/notification-preferences.md) og har et mobilnummer på profilen sin. Ansatte med tillatelse til å sende tekstmeldinger kan slå på **Text reminders** for en frivillig fra den frivilliges [personpost](../people/adding-people.md#text-reminders). Hver tekstmelding starter med menighetens navn, holdes til én enkelt tekstmelding og avsluttes med «Svar STOP for å melde deg av.» Alle som svarer STOP, slutter å motta tekstmeldinger fra menigheten din. For at STOP-svar skal nå B1, må du lime inn **URL-en for innkommende (STOP) webhook** fra dine [tekstmeldingsinnstillinger](../settings/church-settings.md#texting) i leverandørens webhook for innkommende meldinger.

For å sende tekstmelding til alle som er planlagt over et datointervall med én gang, bruk **Send tekstmelding til frivillige** i [Planoversikten](./plans-overview.md#texting-everyone-scheduled).

:::info
Hver påminnelse sendes én gang. Tekstpåminnelser sendes i tillegg til push og e-post, ikke i stedet for dem.
:::

## Koble grupper til en plantype {#associating-groups-with-a-plan-type}

Under planlisten på siden for plantypen lar delen **Tilknyttede grupper** deg bestemme hvilke grupper som kan se planene for denne plantypen fra sin medlemsportal. Dette er en rask måte å vise kommende gudstjenester til riktige team uten å gi dem administratortilgang.

1. På siden for plantypen klikker du på **Tilknyttede grupper** øverst på siden (eller blar ned til den delen).
2. Klikk på **Legg til gruppe** og velg en gruppe fra nedtrekkslisten.
3. I kolonnen **Viser** velger du om medlemmer av den gruppen skal se **Bare tidligere planer**, **Bare kommende planer** eller **Tidligere og kommende planer** for denne plantypen.
4. Gjenta for å koble til flere grupper, eller klikk på søppelbøtteikonet for å fjerne en gruppe.

:::info
Bare grupper merket som **Standard** vises i velgeren. Medlemmer av en tilknyttet gruppe ser automatisk denne plantypens planer på gruppens side i B1-medlemsportalen — begrenset til tidsvinduet du valgte.
:::

Hvis planene er Lessons.church-leksjoner, ser medlemmer av den tilknyttede gruppen også et kort **Ukens leksjon** på gruppesiden (bunnlinje, vers og et spørsmål til foreldre). Koble en foreldregruppe til her, og sett filteret til **Bare tidligere planer**, slik at dagens leksjon er med. Frivillige team bruker vanligvis **Bare kommende planer** eller **Tidligere og kommende planer**.

## Skrive ut planer {#printing-plans}

Du kan skrive ut en plan til teamet ditt. Åpne planen og klikk på **Skriv ut** øverst på siden for å lage en utskriftsvennlig versjon som inkluderer oppdrag og gudstjenesterekkefølgen. Toppen av utskriften viser menighetens logo (**logo for lys bakgrunn** fra [Nettside > Utseende](../website/appearance.md), hvis du har lastet opp en), med menighetens navn under, og planens navn, slik at løse sider er enkle å identifisere. Dette er nyttig å dele ut på øvinger eller henge opp i et fellesområde.

Når planen har mer enn én gudstjenestetid, har utskriften en tidskolonne for hver gudstjeneste, med overskrift etter starttidspunktet. Et element som er utelatt fra en gudstjeneste (se [Inkludere elementer i bestemte gudstjenestetider](./service-order.md#including-items-in-specific-service-times)) vises med en strek i den gudstjenestens kolonne.

Utskriften utelater alt som ville vært tomt. Hvis ingen frivillige er tilordnet, finnes det ingen teamboks, og gudstjenesterekkefølgen bruker hele sidebredden. Hvis ingen elementer har en lengde, utelates kolonnen **Lengde**, og hvis planen ikke har gudstjenestetider eller lengder, utelates også kolonnen **Tid**. For å fjerne den svarte overskriftslinjen **Gudstjenesterekkefølge** med tjenestedatoen, fjern merket for **Vis overskrift for gudstjenesterekkefølge** øverst på utskriftssiden; B1 Admin husker valget ditt i den nettleseren.

:::info
Planer er organisert etter tjeneste. Pass på at du er på riktig fane for tjeneste før du oppretter eller ser på planer.
:::

## Neste steg {#next-steps}

- Bruk [Planoversikten](./plans-overview.md) for å se alle kommende oppdrag over flere uker i ett rutenett, finne ubesatte posisjoner, og tilordne frivillige direkte fra rutenettet
- Lagre en plans struktur som en [plan-mal](./plan-templates.md), slik at du kan bruke den på fremtidige planer med ett klikk
- Bygg ut [gudstjenesterekkefølgen](./service-order.md) med sanger, lesninger og andre elementer
- Legg til [sanger](./songs.md) fra biblioteket ditt direkte i gudstjenesterekkefølgen
- Bruk [Oppgaver](./tasks.md) til å tildele oppfølgingsoppgaver til teammedlemmer
- Vis gjeldende leksjonsinnhold på en TV i foajeen med [Digital skilting](./digital-signage.md)
