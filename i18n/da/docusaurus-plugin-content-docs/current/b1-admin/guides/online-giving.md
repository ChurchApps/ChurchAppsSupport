---
title: "Vejledning: Opsætning af online giving"
---

# Opsætning af online giving

<div class="article-intro">

Gå gennem alt, der er nødvendigt for at acceptere onlinedonationer på din kirke -- fra oprettelse af donationsfonde til forbindelse af Stripe til betalingsbehandling til deling af giving-siden med din menighed. Til slutningen vil medlemmer kunne give online gennem dit websted og din mobilapp.

</div>

<div class="prereqs">
<h4>Før du starter</h4>

- B1 Admin-konto med administratoradgang -- se [Roller og tilladelser](../people/roles-permissions.md)
- En Stripe-konto (opret en gratis på [stripe.com](https://stripe.com), hvis det er nødvendigt)

</div>

## Trin 1: Opret donationsfonde

Fonde er de kategorier, som givere kan donere til. Du har brug for mindst en fond, før du kan acceptere donationer.

Følg vejledningen [Fonde](../donations/funds.md) for at sætte dine givekategorier op:

1. Opret dine mest almindelige fonde (f.eks. "Generel Fond", "Byggefondsgivende", "Missions")
2. Markér skattefradragsberettigede fonde hensigtsmæssigt -- dette påvirker år-slut giveerklæringer

:::tip
Du kan tilføje flere fonde til enhver tid. Start med dine mest almindelige givekategorier.
:::

## Trin 2: Forbind Stripe

Stripe håndterer al betalingsbehandling. Du forbinder din Stripe-konto til B1 Admin, så donationer flyder ind på din bankkonto.

Følg vejledningen [Online Giving Setup](../donations/online-giving-setup.md) for at forbinde Stripe:

1. Log ind i dit Stripe-dashboard og hent din Publishable Key og Secret Key
2. I B1 Admin skal du gå til Indstillinger og angive begge nøgler

:::warning
Stripe viser din Secret Key kun én gang. Kopier og gem det, før du forlader Stripe-dashboardet. Hvis du mister det, skal du generere en ny.
:::

## Trin 3: Tilføj en giving-side til dit websted

Gør giving tilgængelig ved at tilføje en donationsside til dit B1-websted.

Følg vejledningerne [Online Giving Setup](../donations/online-giving-setup.md) og [Styring af sider](../website/managing-pages.md) for at:

1. Tilføj en "Donér" fane til dit B1.church-sted
2. Dit giving-URL vil være: `https://dit-underdomæne.b1.church/donate`
3. Medlemmer kan give uden at logge ind (offentlig side) eller logge ind for gemte betalingsmetoder og donationshistorik

## Trin 4: Foretag en testdonation

Før annoncering til din menighed skal du bekræfte, at alt virker.

1. Foretag en lille testdonation for at bekræfte, at flowet virker end-to-end
2. Kontroller, at donationen vises i B1 Admin under Donationer

:::tip
Brug Stripe's testilstand først, hvis du vil bekræfte uden rigtige gebyrer, skift derefter til live-tilstand, før du annoncerer til din menighed.
:::

## Trin 5: Annoncér til din menighed

Spred ordet, så medlemmer ved, at de kan give online.

1. Del giving-URL'en via dit websted, e-mail-nyhedsbreve, bulletiner og sociale medier
2. Medlemmer kan også give gennem [B1 Mobile-appen](../../b1-mobile/giving/) -- giving-funktionen er indbygget

:::info
Medlemmer, der logger ind, kan gemme betalingsmetoder, opsætte tilbagevendende donationer og se deres donationshistorik. Anonym giving virker også -- ingen login påkrævet.
:::

## Trin 6: Løbende administration

Hold dine donationsrecords aktuelle og generer rapporter hele året.

1. [Importér Stripe-transaktioner](../donations/stripe-import.md) regelmæssigt (ugentlig eller månedlig) for at holde dine records aktuelle
2. [Se donationsrapporter](../donations/donation-reports.md) for at spore givertrends og totaler efter fond
3. [Generer år-slut givererklæringer](../donations/giving-statements.md) for dine giveres skatterecords

:::tip
Kør Stripe-importer mindst månedligt, så dine records holder sig opdateret. Se [vejledningen År-slut rapporter](./year-end-reports.md) for hele år-slut-processen.
:::

## Du er færdig!

Din kirke accepterer nu onlinedonationer. Medlemmer kan give gennem dit websted, B1 Mobile-appen eller enhver enhed med en internetbrowser. Alle donationer spores automatisk i B1 Admin.

## Relaterede artikler

- [Fonde](../donations/funds.md) -- opret og administrer donationskategorier
- [Batcher](../donations/batches.md) -- organiser donationer i grupper
- [Registrering af donationer](../donations/recording-donations.md) -- angiv kontant- og check-donationer manuelt
- [Stripe Import](../donations/stripe-import.md) -- træk onlinetransaktioner ind i B1 Admin
- [Donationsrapporter](../donations/donation-reports.md) -- se givertrends og totaler
- [Giverbekendtelser](../donations/giving-statements.md) -- generer år-slut momsopgørelser
- [Foretage donationer (Web)](../../b1-church/giving/making-donations.md) -- medlemmernes giving-erfaring
- [Foretage donationer (Mobil)](../../b1-mobile/giving/making-donations.md) -- giving fra mobilappen
