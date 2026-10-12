---
title: "Gudstjenesteplaner"
---

# Gudstjenesteplaner

<div class="article-intro">

Gudstjenesteplaner organiserer hvem som tjenestegjør og når. Hver plan er knyttet til en bestemt dato og et bestemt tjenesteområde, slik at det er enkelt å koordinere frivilliglagene uke for uke og sørge for at hver gudstjeneste er fullt bemannet.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp tjenesteområder og lag i Tjeneste-området
- Kontroller at de frivillige er lagt til i [personregisteret](../people/adding-people.md) og tildelt lag

</div>

## Åpne planer

1. Åpne [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) i B1 Admin (søkefeltet øverst til venstre), utvid **Tjeneste** og klikk på **Planer**.
2. Velg en **tjenesteområdefane** øverst på siden.
3. Klikk på en **plantype** for å se listen over planer av den typen. Bruk **Kommende** og **Tidligere** over listen for å bytte mellom fremtidige og tidligere planer.
4. Klikk på en bestemt plan for å åpne den.

Hver plansides viser lenker tilbake til plantypen og til **Planer**, slik at du kan gå opp igjen uten å bruke nettleserens tilbakeknapp.

:::info
Du trenger ikke full administratortilgang for å administrere planer. Alle som er medlem av et tjenesteområde, kan gå til Tjeneste og opprette, redigere og sette opp planer for sitt eget tjenesteområde uten å trenge tillatelsen Rediger planer. Redaktører med rollen Rediger planer kan administrere planer på tvers av alle tjenesteområder.
:::

## Opprette en plan

1. Klikk på **Ny plan** øverst på plantypesiden.
2. Gi planen et navn, eller bruk datoen som navn. Velg **dato** for gudstjenesten.
3. Hvis tjenesteområdet ditt har [maler](./plan-templates.md), kan du velge en under **Start fra mal** for å fylle inn gudstjenesteforløpet, posisjonene og notatene i ett steg.
4. Hvis du vil kopiere fra en tidligere plan, bruker du **Kopier fra forrige plan** og velger **Bare posisjoner** eller **Posisjoner og tildelinger**. Hvis du ikke vil kopiere, velger du **Ingenting**. Du kan også krysse av for **Kopier gudstjenesteforløp**. Når du kopierer fra en tidligere plan, beholder den nye planen også den planens **Notater**, **Påmeldingsfrist**, **Vis navn på frivillige på påmeldingssiden** og innstillingen for automatisk erstatning, slik at du slipper å skrive dem inn på nytt hver uke. Du kan endre noen av dem i den nye planens innstillinger.
5. Hvis du vil sette opp flere uker om gangen mens du kopierer, skriver du et tall i **Gjenta ukentlig så mange uker** (opptil 12). B1 oppretter én plan per uke, og hver er kopiert fra den forrige. Hvis planen har datoen som navn, får hver nye plan navn etter sin egen dato.
6. Du kan eventuelt angi **Påmeldingsfrist (timer før gudstjenesten)**. En ny plan starter med forrige plans frist, og du kan endre den her. La feltet stå tomt hvis det ikke skal være noen frist.
7. Lagre planen. Nå kan du begynne å tildele teammedlemmer og bygge opp [gudstjenesteforløpet](./service-order.md).

:::tip
**Gjenta ukentlig så mange uker** er bare tilgjengelig mens du kopierer noe fra forrige plan (posisjoner, tildelinger eller gudstjenesteforløpet).
:::

## Plandetaljsiden

Når du åpner en plan, vises planens navn, tjenesteområde, plantype og tjenestedato øverst, med knappene **Rediger** og **Skriv ut**. Under det er alt på én side:

- **Tjenestetildelinger** -- Administrer hvilke teammedlemmer som er tildelt denne planen. Du kan legge til personer fra eksisterende lag og se hvem som har bekreftet, og hvem som fortsatt venter. Lenker over posisjonene lar deg åpne planens **Notater** og **Tidspunkter**.
- **[Gudstjenesteforløp](./service-order.md)** -- Bygg opp gudstjenesteforløpet med elementer som lovsanger, bønner, kunngjøringer og prekenen.

## Tildele teammedlemmer {#assigning-team-members}

1. Åpne en plan og gå ned til **Tjenestetildelinger**.
2. Klikk på **Legg til posisjon**. Fyll ut opplysningene i skjemaet for å legge til en posisjon. Som kategorinavn kan du skrive hvilken kategori du vil. For at hvem som helst i menigheten skal kunne fylle posisjonen (ikke bare medlemmer av ett lag), lar du **Frivilliggruppe** stå på **Ingen**.
3. Klikk på **Personer som trengs** og velg frivillige til å fylle posisjonen. Hvis posisjonen har en **frivilliggruppe**, velger du blant medlemmene i den gruppen. Hvis frivilliggruppen er satt til **Ingen**, kan du i stedet søke etter hvem som helst i menigheten.
4. Legg til medlemmer fra lagets liste ved å klikke på **Legg til**.
5. Tildelte medlemmer vises under laget sitt med tildelingsstatus.
6. Klikk på varsle frivillige for å varsle dem i B1-appen eller via e-post.

Hver posisjon viser en teller (for eksempel «2/3») slik at du ser hvor mange plasser som er fylt med et øyekast. Under overskriften **Tjenestetildelinger** viser en oppsummering («X av Y posisjoner fylt») den samlede bemanningen for planen, sammen med hvor mange som fortsatt mangler. Den bytter til **Fullt bemannet** så snart alle posisjoner er dekket.

:::tip
Sett opp lagene dine i innstillingene for tjenesteområdet før du oppretter planer. Da har du en ferdig gruppe frivillige å tildele fra.
:::

### Kopiere posisjoner til en tom plan {#copying-positions-into-an-empty-plan}

Hvis en plan ikke har noen posisjoner ennå, og det finnes en tidligere plan av samme type, vises en lenke **Kopier fra forrige plan** i **Tjenestetildelinger**. Velg **Bare posisjoner** eller **Posisjoner og tildelinger** for å fylle den åpne planen med posisjonene (og frivillige) fra forrige plan. Kopien legges inn i den nåværende planen; det opprettes ikke en ny plan for samme dato.

## Planinnstillinger

Hver plan har flere innstillinger du kan konfigurere ved å klikke på **Rediger** ved siden av planen i plantypens liste, eller på knappen **Rediger** øverst på plansiden. Klikk på **Ferdig** (eller planens navn) for å gå tilbake til planen. Disse omfatter:

- **Påmeldingsfrist (timer før gudstjenesten)** — antall timer før gudstjenesten når påmeldingen for frivillige stenger. Skriv inn et negativt tall for å holde påmeldingen åpen etter at gudstjenesten har startet. La feltet stå tomt hvis det ikke skal være noen frist.
- **Vis navn på frivillige på påmeldingssiden** — når dette er avkrysset, kan innloggede frivillige se hvem andre som allerede er påmeldt hver posisjon på påmeldingssiden på B1.church. Navn vises aldri for besøkende som ikke er innlogget.
- **Foreløpig** — skjuler tildelinger for frivillige til du er klar til å publisere timeplanen.
- **Sett automatisk opp en erstatter når en frivillig takker nei** — når dette er avkrysset, kontakter B1 automatisk den neste tilgjengelige personen på lagets liste og spør om vedkommende kan tjenestegjøre hvis en tildelt frivillig takker nei til posisjonen sin. Dette fortsetter nedover listen til noen sier ja, slik at posisjonene dine holdes fylt uten manuell oppfølging.

## Påminnelser til frivillige {#volunteer-reminders}

B1 kan automatisk minne frivillige på gudstjenestene de er satt opp til, slik at du slipper å jage laget ditt hver uke. Påminnelser sendes til **alle som er satt opp** -- både de som har bekreftet og de som ikke har svart ennå. Hver påminnelses-e-post inneholder den frivilliges posisjon(er), gudstjenestedatoen, plannotatene og din egen melding.

Tidspunkt og innhold for påminnelser angis per **plantype**, slik at hver type gudstjeneste kan ha sin egen tidsplan.

1. Velg tjenesteområdet som inneholder plantypen, fra **Tjeneste**-området.
2. I listen **Plantyper** klikker du på **Rediger** ved siden av plantypen.
3. Utvid delen **Påminnelser** og slå på **Send påminnelser for plantyper av denne typen**.
4. Under **Når skal påminnelsene sendes?** velger du opptil tre tidspunkter: **7 dager før**, **3 dager før**, **2 dager før**, **1 dag før** eller **Samme dag**.
5. Angi **Klokkeslett** for når påminnelsene sendes.
6. Du kan eventuelt legge til en **Melding**. La feltet stå tomt for å bruke standardteksten i påminnelsen.
7. Under **Send via** velger du **Push**, **E-post** og, hvis menigheten din har en [tekstmeldingsleverandør](../settings/church-settings.md#texting) koblet til, **Tekstmelding**.
8. Klikk på **Lagre påminnelser**.

Påminnelser er av for en plantype helt til du slår dem på.

:::tip
Frivillige som ikke har bekreftet ennå, får knappene **Godta** og **Avslå** rett i påminnelses-e-posten, slik at de kan svare uten å logge inn.
:::

:::info
Hver påminnelse sendes én gang. Tekstmeldingspåminnelser sendes i tillegg til push og e-post, ikke i stedet for dem.
:::

### Tekstpåminnelser {#text-reminders}

Alternativet **Tekstmelding** vises bare når menigheten din har en tekstmeldingsleverandør koblet til. Tekstmeldinger sendes via menighetens tekstmeldingsleverandør, og hver tekstmelding kan koste menigheten din noe. En frivillig får bare en tekstpåminnelse hvis de har slått på **Tekstmeldinger** i sine [varslingsinnstillinger](../../b1-church/getting-started/notification-preferences.md) og har et mobilnummer på profilen sin. Hver tekstmelding starter med menighetens navn, holdes innenfor én tekstmelding og avsluttes med «Svar STOP for å melde deg av.» Den som svarer STOP, slutter å få tekstmeldinger fra menigheten. For at STOP-svar skal nå B1, limer du inn **URL for innkommende STOP-webhook** fra dine [tekstmeldingsinnstillinger](../settings/church-settings.md#texting) i leverandørens webhook for innkommende meldinger.

For å sende tekst til alle som er satt opp over en datoperiode med en gang, bruker du **Send tekstmelding til frivillige** i [Planoversikten](./plans-overview.md#texting-everyone-scheduled).

## Knytte grupper til en plantype

Under planlisten på plantypesiden lar delen **Tilknyttede grupper** deg bestemme hvilke grupper som kan se planene for denne plantypen fra medlemsportalen sin. Dette er en rask måte å gjøre kommende gudstjenester synlige for de riktige lagene uten å gi dem administratortilgang.

1. Klikk på **Tilknyttede grupper** øverst på plantypesiden (eller rull ned til den delen).
2. Klikk på **Legg til gruppe** og velg en gruppe fra nedtrekksmenyen.
3. I kolonnen **Viser** velger du om medlemmene i den gruppen skal se **Bare tidligere planer**, **Bare kommende planer** eller **Tidligere og kommende planer** for denne plantypen.
4. Gjenta for å knytte til flere grupper, eller klikk på søppelkasseikonet for å fjerne en gruppe.

:::info
Bare grupper merket som **Standard** vises i valglisten. Medlemmer av en tilknyttet gruppe ser automatisk planene for denne plantypen på gruppens side i B1-medlemsportalen -- begrenset til tidsvinduet du valgte.
:::

Hvis planene er Lessons.church-leksjoner, ser medlemmer av den tilknyttede gruppen også et kort for **ukens leksjon** på gruppesiden (hovedbudskap, bibelvers og et spørsmål til foreldre). Knytt en foreldregruppe hit og sett filteret til **Bare tidligere planer**, slik at dagens leksjon tas med. Frivilliglag bruker vanligvis **Bare kommende planer** eller **Tidligere og kommende planer**.

## Skrive ut planer

Du kan skrive ut en plan som du kan dele ut til laget ditt. Åpne planen og klikk på **Skriv ut** øverst på siden for å lage en utskriftsvennlig versjon som inneholder tildelinger og gudstjenesteforløpet. Øverst på utskriften står menighetens navn og planens navn, slik at løse sider er lette å kjenne igjen. Dette er nyttig å dele ut på øvelser eller henge opp på et felles sted.

:::info
Planer er organisert etter tjenesteområde. Kontroller at du står på riktig tjenesteområdefane før du oppretter eller viser planer.
:::

## Neste steg

- Bruk [Planoversikt](./plans-overview.md) for å se alle kommende tildelinger over flere uker i ett rutenett og oppdage ubesatte posisjoner -- og tildel frivillige direkte fra rutenettet
- Lagre strukturen til en plan som en [plansmal](./plan-templates.md) slik at du kan bruke den på fremtidige planer med ett klikk
- Bygg opp [gudstjenesteforløpet](./service-order.md) med sanger, tekstlesninger og andre elementer
- Legg til [sanger](./songs.md) fra biblioteket ditt direkte i gudstjenesteforløpet
- Bruk [Oppgaver](./tasks.md) for å tildele oppfølgingsoppgaver til teammedlemmer
- Vis gjeldende leksjonsinnhold på en TV i foajeen med [digital skilting](./digital-signage.md)
