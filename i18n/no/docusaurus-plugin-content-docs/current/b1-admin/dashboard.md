---
title: "Oversikt"
description: "Se hva B1 Admin-oversikten viser: gudstjenestens rekkefølge denne uken, hvem som tjener og har sjekket inn, saker som venter på deg, og dine oppgaver og grupper."
---

# Oversikt

<div class="article-intro">

Oversikten er hjemmesiden i B1 Admin. Den åpnes når du logger inn, og er bygget rundt menighetens ukentlige gudstjeneste: gudstjenestens rekkefølge for den kommende planen, hvem som tjener, hvem som er i rommet på søndag, saker som venter på deg, og dine egne oppgaver og grupper.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Logg inn i [B1 Admin](https://admin.b1.church). Alle innloggede brukere har en oversikt, men innholdet avhenger av din [rolle og dine tillatelser](./settings/roles-permissions.md).
- Seksjonene for gudstjenesten fylles ut når du tar i bruk [Planer](./serving/plans.md) og [Oppmøte](./attendance/index.md) eller [Innsjekking](./attendance/check-in.md).

</div>

## Åpne oversikten {#opening-the-dashboard}

- Logg inn – B1 Admin starter på oversikten.
- Klikk på den lille menighetslogoen øverst til venstre på en hvilken som helst side.
- Åpne [hurtigmenyen](./introduction.md#getting-around-with-the-jump-menu) (klikk på søkefeltet eller trykk **Ctrl+K** / **Cmd+K**) og velg **Dashboard**.

## Denne ukens gudstjeneste {#this-weeks-service}

Det store kortet øverst viser én gudstjenesteplan: neste kommende plan mellom forrige søndag og kommende søndag, eller forrige søndags plan hvis ingenting er på vei. Hvis flere planer faller på samme dag, kommer en plan som bruker en gudstjenesteordning først, deretter planen med tidligst gudstjenestetidspunkt.

- **Datolinjen** – planens dag, dato og første gudstjenestetidspunkt (for eksempel *Sunday · November 15 · 9:00 AM*).
- **Tittel** – planens navn. Hvis du kan åpne planen (du kan redigere planer, tilhører planens tjeneste, eller tjener på den), lenker tittelen til [planen](./serving/plans.md).
- **Gudstjenestens rekkefølge** – hvert element fra planens [gudstjenesteordning](./serving/service-order.md) med klokkeslettet det starter, beregnet ut fra første gudstjenestetidspunkt og lengden på hvert element. Mens gudstjenesten pågår, markeres det elementet som er i gang.

Hvis det ikke er noen plan denne uken, står det **No service planned this week.** på kortet. Hvis planen ikke har en gudstjenesteordning, står det **No order of service on this plan.** Personer som kan redigere planer ser en lenke **Plans** ved siden av en av meldingene.

### Hvem tjener, og hvem er i rommet {#who-is-serving-and-who-is-in-the-room}

Ved siden av gudstjenestens rekkefølge legger oversikten til det som skjer rundt gudstjenesten, når det finnes data for det:

| Seksjon | Hva den viser |
|---|---|
| **in the room** | Hvor mange som har sjekket inn eller er registrert som til stede. På søndag er det dagens antall, med en markering **Live**; ellers i uken vises antallet for **Last Sunday**. Hvis ingen er registrert med navn, brukes dagens [antallsregistreringer](./attendance/headcount-entry.md). |
| **Serving Sunday** / **Serving this hour** | Alle som er planlagt på planen, med sin posisjon, lenket til personposten. Avslåtte oppgaver utelates. |
| **First time** / **First time last Sunday** | Førstegangsgjester (personer med medlemsstatus *Visitor* eller *Guest*, eller som har sjekket inn som gjest), gruppert etter husstand. |
| **Rooms** | Innsjekkinger per klasse eller rom for uken, med en kapasitetslinje når gruppen har satt en **Capacity**. |

Før noe av dette finnes, viser kortet et kort hint med lenker til **People**, **Attendance** og **Plans** (bare de du har tilgang til).

:::info
Antallene og navnene hentes fra data om oppmøte og tjeneste, så de vises bare for personer som har tillatelse til å se dem. For eksempel krever gjestenavn og tjenerlisten tillatelse til å se personer, mens romantallene krever tillatelse til å se oppmøte.
:::

## Saker som venter {#needs-attention}

Når noe venter på deg, lister kortet **Needs attention** det opp med en lenke:

- **pending calendar approvals** – hendelser og booking av rom eller ressurser som må godkjennes. Åpner [Approvals](./calendars/approvals.md). Vises for personer som kan redigere innhold.
- **pending group join requests** – personer som ber om å bli med i en gruppe. Åpner listen over [ventende forespørsler](./groups/group-join-requests.md). Vises for personer som kan redigere gruppemedlemmer.

Kortet skjules når det ikke er noe å gjøre.

## Mine oppgaver og Mine grupper {#my-tasks-and-my-groups}

Nederst på siden:

- **My tasks** lister opptil fire åpne [oppgaver](./serving/tasks.md) som er tildelt deg; klikk på en for å åpne den. Klikk **Add Task** for å opprette en oppgave her (velg hvem den gjelder og hvem den er tildelt, og skriv inn en tittel, forfallsdato og notater), eller **All tasks** for å åpne **Serving > My Work**.
- **My Groups** lister gruppene du er med i; klikk på en for å åpne den. Hvis du kan administrere grupper eller se personer, åpner **All groups** hele listen over [grupper](./groups/index.md).

## Hurtighandlinger {#quick-actions}

Oppsettssnarveiene som tidligere lå på oversikten (for eksempel **Add Your Church Logo**, **Set Up Online Giving** og **Create Your First Group**) finnes nå i hurtigmenyen under **Quick Actions**. Se [Hurtighandlinger](./introduction.md#quick-actions).

## Relaterte artikler {#related-articles}

- [Introduksjon](./introduction.md) – logge inn og finne frem med hurtigmenyen
- [Varsler og meldinger](./notifications.md) – varslene og de private meldingene i brukermenyen din
- [Planer](./serving/plans.md) og [Gudstjenesteordning](./serving/service-order.md) – det som mater gudstjenestekortet
- [Innsjekking](./attendance/check-in.md) – hvordan folk telles i rommet
