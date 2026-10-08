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
3. Klikk på en **plantype** for å se listen over planer av den typen.
4. Klikk på en bestemt plan for å åpne den.

:::info
Du trenger ikke full administratortilgang for å administrere planer. Alle som er medlem av et tjenesteområde, kan gå til Tjeneste og opprette, redigere og sette opp planer for sitt eget tjenesteområde uten å trenge tillatelsen Rediger planer. Redaktører med rollen Rediger planer kan administrere planer på tvers av alle tjenesteområder.
:::

## Opprette en plan

1. Klikk på **Ny plan** i plantypevisningen.
2. Gi planen et navn, eller bruk datoen som navn. Velg **dato** for gudstjenesten.
3. Hvis du vil kopiere fra en tidligere plan, velger du bare posisjoner eller posisjoner og tildelinger. Hvis du ikke vil kopiere, velger du ingenting. Du kan også kopiere gudstjenesteforløpet fra den forrige planen. Når du kopierer fra en tidligere plan, beholder den nye planen også den planens **Notater** og **Påmeldingsfrist**, slik at du slipper å skrive dem inn på nytt hver uke. Du kan endre begge i den nye planens innstillinger.
4. Lagre planen. Nå kan du begynne å tildele teammedlemmer og bygge opp [gudstjenesteforløpet](./service-order.md).

## Plandetaljsiden

Når du åpner en plan, ser du to faner:

- **Tildelinger** -- Administrer hvilke teammedlemmer som er tildelt denne planen. Du kan legge til personer fra eksisterende lag og se hvem som har bekreftet, og hvem som fortsatt venter.
- **[Gudstjenesteforløp](./service-order.md)** -- Bygg opp gudstjenesteforløpet med elementer som lovsanger, bønner, kunngjøringer og prekenen.

## Tildele teammedlemmer

1. Åpne en plan og gå til fanen **Tildelinger**.
2. Klikk på **Legg til posisjon** for å utvide den. Fyll ut opplysningene i skjemaet for å legge til en posisjon. Som kategorinavn kan du skrive hvilken kategori du vil. For at hvem som helst i menigheten skal kunne fylle posisjonen (ikke bare medlemmer av ett lag), lar du **Frivilliggruppe** stå på **Ingen**.
3. Klikk på **Personer som trengs** og velg frivillige til å fylle posisjonen. Hvis posisjonen har en **frivilliggruppe**, velger du blant medlemmene i den gruppen. Hvis frivilliggruppen er satt til **Ingen**, kan du i stedet søke etter hvem som helst i menigheten.
4. Legg til medlemmer fra lagets liste ved å klikke på **Legg til**.
5. Tildelte medlemmer vises under laget sitt med tildelingsstatus.
6. Klikk på varsle frivillige for å varsle dem i B1-appen eller via e-post.

Hver posisjon viser en teller (for eksempel «2/3») slik at du ser hvor mange plasser som er fylt med et øyekast. Øverst i fanen Tildelinger viser en fremdriftslinje og en oppsummering («X av Y posisjoner fylt») den samlede bemanningen for planen. Den bytter til **Fullt bemannet** så snart alle posisjoner er dekket.

:::tip
Sett opp lagene dine i innstillingene for tjenesteområdet før du oppretter planer. Da har du en ferdig gruppe frivillige å tildele fra.
:::

## Planinnstillinger

Hver plan har flere innstillinger du kan konfigurere ved å klikke på redigeringsikonet (blyanten) på planen. Disse omfatter:

- **Påmeldingsfrist** — antall timer før gudstjenesten når påmeldingen for frivillige stenger. Skriv inn et negativt tall for å holde påmeldingen åpen etter at gudstjenesten har startet.
- **Vis navn på frivillige på påmeldingssiden** — når dette er avkrysset, kan innloggede frivillige se hvem andre som allerede er påmeldt hver posisjon på påmeldingssiden på B1.church. Navn vises aldri for besøkende som ikke er innlogget.
- **Foreløpig** — skjuler tildelinger for frivillige til du er klar til å publisere timeplanen.
- **Sett automatisk opp en erstatter når en frivillig takker nei** — når dette er avkrysset, kontakter B1 automatisk den neste tilgjengelige personen på lagets liste og spør om vedkommende kan tjenestegjøre hvis en tildelt frivillig takker nei til posisjonen sin. Dette fortsetter nedover listen til noen sier ja, slik at posisjonene dine holdes fylt uten manuell oppfølging.

## Påminnelser til frivillige

B1 kan automatisk minne frivillige på gudstjenestene de er satt opp til, slik at du slipper å jage laget ditt hver uke. Påminnelser sendes til **alle som er satt opp** -- både de som har bekreftet og de som ikke har svart ennå -- på e-post og som varsel i appen/push. Hver påminnelse inneholder den frivilliges posisjon(er), gudstjenestedatoen, plannotatene og din egen melding.

Tidspunkt og innhold for påminnelser angis per **plantype**, slik at hver type gudstjeneste kan ha sin egen tidsplan.

1. Velg tjenesteområdet som inneholder plantypen, fra **Tjeneste**-området.
2. Klikk på **redigeringsikonet (blyanten)** ved siden av plantypen.
3. I delen **Påminnelser** angir du:
   - **Dager før gudstjenesten for påminnelse** — en kommaseparert liste over hvor mange dager i forveien påminnelsen skal sendes, for eksempel `7,1,0`. Bruk `0` for å sende en påminnelse på selve gudstjenestedagen. La feltet stå tomt for å slå av påminnelser for denne plantypen.
   - **Egendefinert påminnelsesmelding** *(valgfritt)* — ekstra tekst som legges til i påminnelsen, for eksempel «Kom 30 minutter før for å øve.»
4. Lagre plantypen.

Nye plantyper minner frivillige på **2 dager før** hver gudstjeneste som standard, helt til du endrer dette.

:::tip
Frivillige som ikke har bekreftet ennå, får knappene **Godta** og **Avslå** rett i påminnelses-e-posten, slik at de kan svare uten å logge inn.
:::

:::info
Hver påminnelse sendes én gang. Planer som fortsatt er foreløpige (ikke sendt til laget ennå), utløser ikke påminnelser.
:::

## Knytte grupper til en plantype

Under planlisten på plantypesiden lar delen **Grupper** deg bestemme hvilke grupper som kan se planene for denne plantypen fra medlemsportalen sin. Dette er en rask måte å gjøre kommende gudstjenester synlige for de riktige lagene uten å gi dem administratortilgang.

1. Rull ned til delen **Grupper** på plantypesiden.
2. Klikk på **Legg til gruppe** og velg en gruppe fra nedtrekksmenyen.
3. I kolonnen **Viser** velger du om medlemmene i den gruppen skal se **tidligere**, **fremtidige** eller **begge** planer for denne plantypen.
4. Gjenta for å knytte til flere grupper, eller klikk på søppelkasseikonet for å fjerne en gruppe.

:::info
Bare grupper merket som **Standard** vises i valglisten. Medlemmer av en tilknyttet gruppe ser automatisk planene for denne plantypen på gruppens side i B1-medlemsportalen -- begrenset til tidsvinduet du valgte (tidligere/fremtidige/begge).
:::

Hvis planene er Lessons.church-leksjoner, ser medlemmer av den tilknyttede gruppen også et kort for **ukens leksjon** på gruppesiden (hovedbudskap, bibelvers og et spørsmål til foreldre). Knytt en foreldregruppe hit og sett filteret til **Tidligere**, slik at dagens leksjon tas med. Frivilliglag bruker vanligvis **Fremtidige** eller **Begge**.

## Skrive ut planer

Du kan skrive ut en plan som du kan dele ut til laget ditt. Åpne planen, åpne fanen for gudstjenesteforløp og bruk alternativet **Skriv ut** for å lage en utskriftsvennlig versjon som inneholder tildelinger og gudstjenesteforløpet. Øverst på utskriften står menighetens navn og planens navn, slik at løse sider er lette å kjenne igjen. Dette er nyttig å dele ut på øvelser eller henge opp på et felles sted.

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
