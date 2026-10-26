---
title: "Tjenesteplaner"
---

# Tjenesteplaner

<div class="article-intro">

Tjenesteplaner organiserer hvem som tjener, og når. Hver plan er knyttet til en bestemt dato og tjenesteområde, noe som gjør det enkelt å koordinere teamene dine med frivillige uke for uke og sikre at hver gudstjeneste er fullt bemannet.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp tjenesteområdene og teamene dine i området Tjeneste
- Sørg for at frivillige er lagt til i [personregisteret](../people/adding-people.md) og tildelt team

</div>

## Gå til planer

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Tjeneste** og klikker på **Planer**.
2. Velg en **fane for tjenesteområde** øverst på siden.
3. Klikk på en **planstype** for å se listen over planer for den typen. Bruk **Kommende** og **Tidligere** over listen for å bytte mellom fremtidige og tidligere planer. **Kommende** viser planer fra i dag og fremover, de nærmeste først, med udaterte planer til slutt. **Tidligere** viser bare tidligere planer, de nyeste først.
4. Klikk på en bestemt plan for å åpne den.

Hver planside viser lenker tilbake til planstypen og til **Planer**, slik at du kan gå opp igjen uten å bruke nettleserens tilbakeknapp.

:::info
Du trenger ikke full administratortilgang for å administrere planer. Alle som er medlem av et tjenesteområde, kan gå til Tjeneste og opprette, redigere og planlegge planer for sitt eget område uten å trenge tillatelsen Planer: Rediger. Redaktører med rollen Planer: Rediger kan administrere planer for alle tjenesteområder.
:::

## Opprette en plan

1. Fra siden for planstypen klikker du på **Ny plan** øverst på siden.
2. Gi planen et navn, eller bruk datoen som navn. Velg **datoen** for gudstjenesten.
3. Hvis tjenesteområdet ditt har [maler](./plan-templates.md), kan du velge en under **Start fra mal** for å fylle inn gudstjenesteordenen, posisjonene og notatene i ett trinn.
4. Ellers, hvis du vil kopiere fra en tidligere plan, bruker du **Kopier fra forrige plan** og velger **Bare posisjoner** eller **Posisjoner og tildelinger**. Hvis du ikke vil kopiere, velger du **Ingenting**. Du kan også krysse av for **Kopier gudstjenesteorden**. Når du kopierer fra en tidligere plan, beholder den nye planen også den planens **Notater**, **Påmeldingsfrist**, **Vis navn på frivillige på påmeldingssiden** og innstillingen for automatisk erstatning, slik at du slipper å taste dem inn på nytt hver uke. Du kan endre noen av dem i innstillingene for den nye planen.
5. For å sette opp flere uker samtidig mens du kopierer, skriver du et tall i **Gjenta ukentlig så mange uker** (opptil 12). B1 lager én plan per uke, og hver kopieres fra den forrige. Hvis planen er navngitt etter datoen, får hver ny plan navn etter sin egen dato.
6. Angi eventuelt **Påmeldingsfrist (timer før gudstjeneste)**. En ny plan starter med den forrige planens frist, og du kan endre den her. La feltet stå tomt for ingen frist. Se [Plan-innstillinger](#plan-settings) for hvordan fristen telles.
7. Lagre planen. Du kan nå begynne å tildele teammedlemmer og bygge ut [gudstjenesteordenen](./service-order.md).

:::tip
**Gjenta ukentlig så mange uker** er bare tilgjengelig mens du kopierer noe fra forrige plan (posisjoner, tildelinger eller gudstjenesteorden).
:::

## Plandetaljsiden

Når du åpner en plan, vises planens navn, tjenesteområde, plantype og gudstjenestedato øverst, med knappene **Rediger** og **Skriv ut**. Under det er alt på én side:

- **[Gudstjenesteorden](./service-order.md)** -- Bygg gudstjenesteordenen med elementer som lovsanger, bønner, kunngjøringer og preken.
- **Tjenerteam-tildelinger** -- Administrer hvilke teammedlemmer som er tildelt denne planen. Du kan legge til personer fra eksisterende team og se hvem som har bekreftet, og hvem som fortsatt venter. Lenker over posisjonene lar deg åpne planens **Notater** og **Tider**.

## Tildele teammedlemmer

1. Åpne en plan og bla ned til **Tjenerteam-tildelinger**.
2. Klikk på **Legg til posisjon**. Fyll ut informasjonen i skjemaet for å legge til en posisjon. Som kategorinavn kan du skrive hva du vil. Hvis du vil at hvem som helst i kirken din skal kunne fylle posisjonen (ikke bare medlemmer av ett team), lar du **Frivilliggruppe** stå på **Ingen**.
3. Klikk på **Personer som trengs** og velg frivillige til å fylle posisjonen. Hvis posisjonen har en **Frivilliggruppe**, velger du blant medlemmene i den gruppen. Hvis frivilliggruppen er satt til **Ingen**, kan du søke etter hvem som helst i kirken din i stedet.
4. Legg til medlemmer fra teamlisten din ved å klikke på **Legg til**.
5. Tildelte medlemmer vises under teamet sitt med status for tildelingen.
6. Klikk på «Varsle frivillige» for å varsle dem i B1-appen eller via e-post. Hvis planen bruker en [bekreftelsesarbeidsflyt](#plan-settings), starter varsling også et arbeidsflytkort som følger opp hver forespørsel til den frivillige svarer.

Hver posisjon viser en teller (for eksempel «2/3») slik at du ser med et blikk hvor mange plasser som er fylt. Under overskriften **Tjenerteam-tildelinger** vises et sammendrag («X av Y posisjoner fylt») som viser den samlede bemanningen for planen, sammen med hvor mange som fortsatt mangler. Det endres til **Fullt bemannet** når alle posisjonene er dekket.

:::tip
Sett opp teamene dine i innstillingene for tjenesteområdet før du oppretter planer. Da har du en klar pool av frivillige å tildele fra.
:::

### Kopiere posisjoner inn i en tom plan

Hvis en plan ikke har noen posisjoner ennå, og det finnes en tidligere plan av samme type, vises en lenke **Kopier fra forrige plan** under **Tjenerteam-tildelinger**. Velg **Bare posisjoner** eller **Posisjoner og tildelinger** for å fylle planen du har åpen med posisjonene (og de frivillige) fra forrige plan. Kopien legges inn i den gjeldende planen; den oppretter ikke en ny plan for samme dato.

## Plan-innstillinger

Hver plan har flere innstillinger du kan konfigurere ved å klikke på **Rediger** ved siden av planen i listen for planstypen, eller på knappen **Rediger** øverst på planssiden. Klikk på **Ferdig** (eller planens navn) for å gå tilbake til planen. Disse inkluderer:

- **Påmeldingsfrist (timer før gudstjeneste)** — antall timer før gudstjenesten da påmeldingen for frivillige stenger. Timene telles tilbake fra planens første **Gudstjeneste**-tid (øvelser og andre tider hoppes over, med mindre planen ikke har noe annet), slik at en frist på 2 timer for en gudstjeneste kl. 10.00 stenger påmeldingen kl. 08.00 samme morgen. Hvis planen ikke har noen tider, telles fristen fra kl. 09.00 på gudstjenestedatoen i kirkens tidssone. Når fristen er passert, kan frivillige verken melde seg på eller melde seg av. Skriv et negativt tall for å holde påmeldingen åpen etter at gudstjenesten har startet. La feltet stå tomt, eller tøm det, for ingen frist.
- **Bekreftelsesarbeidsflyt** — velg en [arbeidsflyt for bekreftelse av tjenesteoppdrag](./workflows.md#serving-assignment-confirmations) for å følge opp tjenesteforespørslene for denne planen med e-post og tekstmelding til hver frivillig godtar eller avslår. Når du klikker **Varsle** frivillige på en publisert plan, får hver ny forespørsel sitt eget kort på arbeidsflytens tavle, og en merknad over varslingslenken sier *«Nye forespørsler bruker bekreftelsesarbeidsflyten.»* La feltet stå på **Bruk eksisterende varsler for tjenesteoppdrag** for å beholde de vanlige varslene. Bare aktive bekreftelsesarbeidsflyter vises i listen; opprett en under **Tjeneste > Arbeidsflyter** først.
- **Vis navn på frivillige på påmeldingssiden** — når dette er krysset av, kan innloggede frivillige se hvem andre som allerede er påmeldt hver posisjon på påmeldingssiden for frivillige på B1.church. Navn vises aldri til besøkende som ikke er innlogget.
- **Blyantmerket** — skjuler tildelinger for frivillige til du er klar til å publisere planen.
- **Automatisk planlegg en erstatning når en frivillig avslår** — når dette er krysset av, og en tildelt frivillig avslår posisjonen sin, vil B1 automatisk kontakte neste tilgjengelige person på teamlisten og spørre om vedkommende kan tjene. Dette fortsetter nedover listen til noen takker ja, slik at posisjonene forblir fylt uten manuell oppfølging.

:::tip
På påmeldingssiden for medlemmer er åpne posisjoner for hver plan listet etter kategori og deretter etter navn. Medlemmer ser alle kommende uker med åpne posisjoner, med mindre du slår på **Vis bare neste uke for hver planstype** under [Innstillinger > Frivilligpåmelding](../settings/church-settings.md#volunteer-signup).
:::

## Påminnelser til frivillige {#volunteer-reminders}

B1 kan automatisk minne frivillige om gudstjenestene de er satt opp til, slik at du ikke trenger å jage teamet ditt hver uke. Påminnelser sendes til **alle som er planlagt** — både de som har bekreftet og de som ikke har svart ennå. Unntaket er en forespørsel sendt gjennom en [bekreftelsesarbeidsflyt](./workflows.md#serving-assignment-confirmations): den frivillige får bare påminnelser etter at hun har godtatt, siden arbeidsflyten tar seg av oppfølgingen fram til da. Hver påminnelses-e-post inneholder den frivilliges posisjon(er), gudstjenestedatoen, planens notater og din egen melding.

Tidspunkt og innhold for påminnelser settes per **planstype**, slik at hver type gudstjeneste kan ha sin egen plan.

1. Fra området **Tjeneste** velger du tjenesteområdet som inneholder planstypen.
2. I listen **Planstyper** klikker du på **Rediger** ved siden av planstypen.
3. Utvid seksjonen **Påminnelser** og slå på **Send påminnelser for planer av denne typen**.
4. Under **Når skal påminnelsene sendes?** velger du opptil tre tidspunkter: **7 dager før**, **3 dager før**, **2 dager før**, **1 dag før** eller **Samme dag**.
5. Angi **klokkeslettet** påminnelsene skal sendes.
6. Du kan eventuelt legge til en **Melding**. La feltet stå tomt for å bruke standardteksten for påminnelser.
7. Under **Send via** velger du **Push**, **E-post** og, hvis kirken din har en [tekstmeldingsleverandør](../settings/church-settings.md#texting) koblet til, **Tekstmelding**.
8. Klikk på **Lagre påminnelser**.

Påminnelser er av for en planstype til du slår dem på.

:::tip
Frivillige som ikke har bekreftet ennå, får knappene **Godta** og **Avslå** rett i påminnelses-e-posten, slik at de kan svare uten å logge inn.
:::

### Tekstpåminnelser

Alternativet **Tekstmelding** vises bare når kirken din har en tekstmeldingsleverandør koblet til. Tekstmeldinger sendes gjennom kirkens tekstmeldingsleverandør, og hver melding kan koste kirken din penger. En frivillig mottar bare en tekstpåminnelse hvis hun har slått på **Tekstmeldinger** i sine [varslingsinnstillinger](../../b1-church/getting-started/notification-preferences.md) og har et mobilnummer på profilen sin. Hver tekstmelding starter med navnet på kirken din, holdes innenfor én SMS, og slutter med «Svar STOP for å melde deg av.» Den som svarer STOP, slutter å motta tekstmeldinger fra kirken din. For at STOP-svar skal nå B1, må du lime inn **URL for innkommende STOP-webhook** fra [innstillingene for tekstmeldinger](../settings/church-settings.md#texting) i leverandørens webhook for innkommende meldinger.

For å sende tekstmelding til alle som er planlagt over et datointervall med en gang, bruk **Send tekst til frivillige** på [Planoversikten](./plans-overview.md#texting-everyone-scheduled).

:::info
Hver påminnelse sendes én gang. Tekstpåminnelser sendes i tillegg til push og e-post, ikke i stedet for.
:::

## Koble grupper til en planstype

Under planlisten på siden for planstypen lar seksjonen **Tilknyttede grupper** deg bestemme hvilke grupper som kan se planene for denne planstypen fra medlemsportalen sin. Dette er en rask måte å vise kommende gudstjenester til riktige team uten å gi dem administratortilgang.

1. På siden for planstypen klikker du på **Tilknyttede grupper** øverst på siden (eller blar ned til den seksjonen).
2. Klikk på **Legg til gruppe** og velg en gruppe fra rullegardinlisten.
3. I kolonnen **Vises** velger du om medlemmer av den gruppen skal se **Bare tidligere planer**, **Bare kommende planer** eller **Tidligere og kommende planer** for denne planstypen.
4. Gjenta for å koble flere grupper, eller klikk på søppelbøtteikonet for å fjerne en gruppe.

:::info
Bare grupper merket **Standard** vises i velgeren. Medlemmer av en tilknyttet gruppe ser automatisk denne planstypens planer på gruppens side i B1-medlemsportalen — begrenset til tidsvinduet du valgte.
:::

Hvis planene er Lessons.church-leksjoner, ser medlemmer av den tilknyttede gruppen også et kort **Ukens leksjon** på gruppesiden (bunnlinje, vers og et spørsmål til foreldre). Koble en foreldregruppe hit og sett filteret til **Bare tidligere planer** slik at dagens leksjon er med. Frivillige team bruker vanligvis **Bare kommende planer** eller **Tidligere og kommende planer**.

## Skrive ut planer

Du kan skrive ut en plan for å dele den med teamet ditt. Åpne planen og klikk på **Skriv ut** øverst på siden for å lage en utskriftsvennlig versjon som inkluderer tildelinger og gudstjenesteorden. Øverst på utskriften vises kirkens logo (**logoen for lys bakgrunn** fra [Nettsted > Utseende](../website/appearance.md), hvis du har lastet opp en), med kirkens navn under, og planens navn, slik at løse ark enkelt kan identifiseres. Dette er nyttig å dele ut på øvelser eller henge opp i et felles område.

:::info
Planer er organisert etter tjenesteområde. Sørg for at du er på riktig fane for tjenesteområde før du oppretter eller ser på planer.
:::

## Neste steg

- Bruk [Planoversikten](./plans-overview.md) for å se alle kommende tildelinger over flere uker i ett rutenett og finne ubesatte posisjoner — og tildel frivillige direkte fra rutenettet
- Lagre strukturen i en plan som en [planmal](./plan-templates.md) slik at du kan bruke den på fremtidige planer med ett klikk
- Bygg ut [gudstjenesteordenen](./service-order.md) med sanger, lesninger og andre elementer
- Legg til [sanger](./songs.md) fra biblioteket ditt direkte i gudstjenesteordenen
- Bruk [Oppgaver](./tasks.md) for å tildele oppfølgingsoppgaver til teammedlemmer
- Vis gjeldende leksjonsinnhold på en TV i lobbyen med [Digital skilting](./digital-signage.md)
