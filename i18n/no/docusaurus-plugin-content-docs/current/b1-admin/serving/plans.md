---
title: "Gudstjenesteplaner"
---

# Gudstjenesteplaner

<div class="article-intro">

Gudstjenesteplaner organiserer hvem som tjenestegjør og når. Hver plan er knyttet til en bestemt dato og et tjenesteområde, noe som gjør det enkelt å koordinere de frivillige lagene dine uke for uke og sikre at hver gudstjeneste er fullt bemannet.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp tjenesteområdene og lagene dine i Tjeneste-området
- Sørg for at frivillige er lagt til i [personkatalogen](../people/adding-people.md) og tildelt til lag

</div>

## Åpne planer

1. Naviger til **Tjeneste** fra hovedmenyen.
2. Velg en **tjenesteområde-fane** øverst på siden.
3. Klikk på en **plantype** for å se listen over planer for den typen.
4. Klikk på en bestemt plan for å åpne den.

:::info
Full administratortilgang er ikke nødvendig for å administrere planer. Alle som er medlem av et tjenesteområde, kan navigere til Tjeneste og opprette, redigere og planlegge planer for sitt eget tjenesteområde uten å trenge rettigheten Plans Edit. Redaktører med Plans Edit-rollen kan administrere planer på tvers av alle tjenesteområder.
:::

## Opprette en plan

1. Fra plantype-visningen klikker du **Ny plan**.
2. Gi planen et navn, eller bruk datoen som navn. Velg **dato** for gudstjenesten.
3. Hvis du vil kopiere fra en tidligere plan, velg om du vil kopiere kun posisjoner eller posisjoner og tildelinger. Hvis du ikke vil kopiere noe, velger du bare ingenting. Du kan også kopiere gudstjenesterekkefølgen fra en tidligere plan.
4. Lagre planen. Nå kan du begynne å tildele teammedlemmer og bygge ut [gudstjenesterekkefølgen](./service-order.md).

## Plandetalj-siden

Når du åpner en plan, ser du to faner:

- **Tildelinger** -- Administrer hvilke teammedlemmer som er tildelt denne planen. Du kan legge til personer fra dine eksisterende lag og se hvem som har bekreftet eller fortsatt venter.
- **[Gudstjenesterekkefølge](./service-order.md)** -- Bygg gudstjenesterekkefølgen med elementer som lovsang, bønner, kunngjøringer og preken.

## Tildele teammedlemmer

1. Åpne en plan og gå til **Tildelinger**-fanen.
2. Klikk på **Legg til posisjon** for å utvide den. Fyll ut informasjonen i skjemaet for å legge til en posisjon. Skriv inn hvilket kategorinavn du ønsker.
3. Klikk på **Personer som trengs** og velg frivillige til å fylle den posisjonen.
4. Legg til medlemmer fra teamlisten ved å klikke **Legg til**.
5. Tildelte medlemmer vises under laget sitt med tildelingsstatus.
6. Klikk «varsle frivillige» for å varsle dem i B1-appen eller via e-post.

Hver posisjon viser en tellemerke (for eksempel «2/3») slik at du raskt kan se hvor mange plasser som er fylt. Øverst på Tildelinger-fanen viser en fremdriftslinje og en oppsummeringsmerke («X av Y posisjoner fylt») den samlede bemanningen for planen, og bytter til **Fullt bemannet** når hver posisjon er dekket.

:::tip
Sett opp lagene dine i tjenesteområde-innstillingene før du oppretter planer. På den måten har du en klar reserve av frivillige å tildele fra.
:::

## Påminnelser til frivillige

B1 kan automatisk minne frivillige på gudstjenestene de er planlagt for, slik at du ikke trenger å jage laget ditt hver uke. Påminnelser går til **alle som er planlagt** — både de som har bekreftet og de som ennå ikke har svart — via e-post og som en varsling i appen/push-varsel. Hver påminnelse inneholder den frivilliges posisjon(er), gudstjenestedatoen, plannotatene og din egendefinerte melding.

Tidspunkt og innhold for påminnelser angis per **plantype**, slik at hver type gudstjeneste kan ha sin egen tidsplan.

1. Fra **Tjeneste**-området velger du tjenesteområdet som inneholder plantypen.
2. Klikk **rediger (blyant)-ikonet** ved siden av plantypen.
3. I **Påminnelser**-delen setter du:
   - **Antall dager før gudstjenesten** — en kommaseparert liste over hvor mange dager i forveien påminnelsen skal sendes, for eksempel `7,1,0`. Bruk `0` for å sende en påminnelse på gudstjenestedagen. La feltet stå tomt for å slå av påminnelser for denne plantypen.
   - **Egendefinert påminnelsesmelding** *(valgfritt)* — ekstra tekst lagt til påminnelsen, for eksempel «Møt opp 30 minutter tidlig for å øve.»
4. Lagre plantypen.

Nye plantyper minner frivillige **2 dager før** hver gudstjeneste som standard, inntil du endrer dette.

:::tip
Frivillige som ennå ikke har bekreftet, får **Godta**- og **Avslå**-knapper rett i påminnelses-e-posten, slik at de kan svare uten å logge inn.
:::

:::info
Hver påminnelse sendes bare én gang. Planer som fortsatt er i utkast (ikke sendt til laget ennå) utløser ikke påminnelser.
:::

## Knytte grupper til en plantype

Under planlisten på plantype-siden lar **Grupper**-delen deg bestemme hvilke grupper som kan se planene for denne plantypen fra medlemsportalen sin. Dette er en rask måte å synliggjøre kommende gudstjenester for de rette lagene uten å gi dem administratortilgang.

1. På plantype-siden blar du ned til **Grupper**-delen.
2. Klikk **Legg til gruppe** og velg en gruppe fra nedtrekksmenyen.
3. I **Vises**-kolonnen velger du om medlemmer av den gruppen skal se **Tidligere**, **Kommende**, eller **Begge** planer for denne plantypen.
4. Gjenta for å knytte til flere grupper, eller klikk søppelbøtte-ikonet for å fjerne en gruppe.

:::info
Bare grupper merket som **Standard** vises i velgeren. Medlemmer av en tilknyttet gruppe ser automatisk denne plantypens planer under [Planer](/docs/b1-church/plans/)-fanen i B1-medlemsportalen — begrenset til vinduet (tidligere/kommende/begge) du valgte.
:::

## Skrive ut planer

Du kan skrive ut en plan for utdeling til laget ditt. Åpne planen, åpne fanen for gudstjenesterekkefølge og bruk **Skriv ut**-alternativet for å generere en utskriftsvennlig versjon som inkluderer tildelinger og gudstjenesterekkefølgen. Dette er nyttig til å dele ut på øvelser eller henge opp i et fellesområde.

:::info
Planer er organisert etter tjenesteområde. Sørg for at du er på riktig tjenesteområde-fane før du oppretter eller viser planer.
:::

## Neste steg

- Bruk [Oversikt over planer](./plans-overview.md) for å se alle kommende tildelinger på tvers av flere uker i ett rutenett og oppdage ufylte posisjoner — og tildel frivillige direkte fra rutenettet
- Lagre en plans struktur som en [Planmal](./plan-templates.md) slik at du kan stemple den på fremtidige planer med ett klikk
- Bygg ut [gudstjenesterekkefølgen](./service-order.md) med sanger, lesninger og andre elementer
- Legg til [sanger](./songs.md) fra biblioteket ditt direkte i gudstjenesterekkefølgen
- Bruk [Oppgaver](./tasks.md) for å tildele oppfølgingsoppgaver til teammedlemmer
