---
title: "Vejledning: Opsæt online-donationer"
description: "Opsæt online-donationer i B1 Admin ved at oprette donationsfonde, forbinde Stripe og tilføje en Donér-side til din B1.church-hjemmeside, så medlemmer kan give."
---

# Opsæt online-donationer

<div class="article-intro">

Gennemgå alt, der skal til for at modtage online-donationer i din kirke — fra oprettelse af donationsfonde, til tilslutning af Stripe til betalingsbehandling, til deling af donationssiden med din menighed. Når du er færdig, kan medlemmer give online via din hjemmeside og mobilapp.

</div>

<div class="prereqs">
<h4>Før du går i gang</h4>

- B1 Admin-konto med administratorrettigheder — se [Roller og tilladelser](../people/roles-permissions.md)
- En Stripe-konto (opret en gratis på [stripe.com](https://stripe.com), hvis du ikke har en)

</div>

## Trin 1: Opret donationsfonde

Fonde er de kategorier, donorer kan give til. Du skal have mindst én fond, før du kan modtage donationer.

Følg vejledningen [Fonde](../donations/funds.md) for at opsætte dine donationskategorier:

1. Opret dine mest almindelige fonde (f.eks. "Generel fond", "Byggefond", "Missioner")
2. Markér skattefradragsberettigede fonde korrekt — dette påvirker årsopgørelser for donationer

:::tip
Du kan til enhver tid tilføje flere fonde. Start med dine mest almindelige donationskategorier.
:::

## Trin 2: Forbind Stripe

Stripe håndterer al betalingsbehandling. Du forbinder din Stripe-konto til B1 Admin, så donationer går direkte ind på din bankkonto.

Følg vejledningen [Opsætning af online-donationer](../donations/online-giving-setup.md) for at forbinde Stripe:

1. Log ind på dit Stripe-dashboard, og hent din publicerbare nøgle (Publishable Key) og hemmelige nøgle (Secret Key)
2. I B1 Admin går du til Indstillinger og indtaster begge nøgler

:::warning
Stripe viser kun din hemmelige nøgle (Secret Key) én gang. Kopiér og gem den, før du forlader Stripe-dashboardet. Hvis du mister den, skal du generere en ny.
:::

## Trin 3: Tilføj en donationsside til din hjemmeside

Gør det nemt at give ved at tilføje en donationsside til din B1-hjemmeside.

Følg vejledningerne [Opsætning af online-donationer](../donations/online-giving-setup.md) og [Administration af sider](../website/managing-pages.md) for at:

1. Tilføje en fane "Donér" til dit B1.church-website
2. Din donationsadresse bliver: `https://dinunderdomæne.b1.church/donate`
3. Medlemmer kan give uden at logge ind (offentlig side) eller logge ind for at bruge gemte betalingsmetoder og se donationshistorik

## Trin 4: Foretag en testdonation

Før du informerer din menighed, skal du kontrollere, at alt fungerer.

1. Foretag en lille testdonation for at bekræfte, at hele forløbet fungerer
2. Kontrollér, at donationen vises i B1 Admin under Donationer

:::tip
Brug Stripes testtilstand først, hvis du vil kontrollere uden rigtige betalinger, og skift derefter til live-tilstand, inden du informerer din menighed.
:::

## Trin 5: Informér din menighed

Fortæl om det, så medlemmerne ved, at de kan give online.

1. Del donationsadressen via din hjemmeside, e-mail-nyhedsbreve, programblade og sociale medier
2. Medlemmer kan også give via [B1-appen](../../b1-church/giving/index.md) — donationsfunktionen er indbygget

:::info
Medlemmer, der logger ind, kan gemme betalingsmetoder, oprette gentagne donationer og se deres donationshistorik. Anonym donation fungerer også — der kræves ingen login.
:::

## Trin 6: Løbende administration

Hold dine donationsregistreringer opdaterede, og generér rapporter hele året.

1. [Importér Stripe-transaktioner](../donations/stripe-import.md) regelmæssigt (ugentligt eller månedligt), så dine registreringer er opdaterede
2. [Se donationsrapporter](../donations/donation-reports.md) for at følge givemønstre og totaler pr. fond
3. [Generér årsopgørelser for donationer](../donations/giving-statements.md) til dine donorers skatteregnskab

:::tip
Kør Stripe-importen mindst én gang om måneden, så dine registreringer er opdaterede. Se [Vejledning til årsrapporter](./year-end-reports.md) for den fulde årsafslutningsproces.
:::

## Du er klar!

Din kirke modtager nu online-donationer. Medlemmer kan give via din hjemmeside, B1-appen eller en hvilken som helst enhed med en webbrowser. Alle donationer registreres automatisk i B1 Admin.

## Relaterede artikler

- [Fonde](../donations/funds.md) — opret og administrer donationskategorier
- [Batches](../donations/batches.md) — organisér donationer i grupper
- [Registrering af donationer](../donations/recording-donations.md) — indtast kontant- og checkdonationer manuelt
- [Stripe-import](../donations/stripe-import.md) — hent online-transaktioner ind i B1 Admin
- [Donationsrapporter](../donations/donation-reports.md) — se givemønstre og totaler
- [Årsopgørelser for donationer](../donations/giving-statements.md) — generér skatteopgørelser for året
- [Donation](../../b1-church/giving/making-donations.md) — medlemmernes oplevelse af at give på B1.church og i B1-appen
