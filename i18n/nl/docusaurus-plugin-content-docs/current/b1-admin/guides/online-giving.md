---
title: "Gids: Online geven instellen"
---

# Online geven instellen

<div class="article-intro">

Loop door alles wat u nodig hebt om online donaties op uw kerk te accepteren -- van het maken van donatiefondsen tot het verbinden van Stripe voor betalingsverwerking tot het delen van de geefpagina met uw gemeente. Aan het einde kunnen leden online geven via uw website en mobiele app.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- B1 Admin-account met beheerdersrechten -- zie [Rollen & Machtigingen](../people/roles-permissions.md)
- Een Stripe-account (maak er een gratis aan op [stripe.com](https://stripe.com) indien nodig)

</div>

## Stap 1: Maak donatiefondsen

Fondsen zijn de categorieën waaraan donoren kunnen geven. U hebt minstens één fonds nodig voordat u donaties kunt accepteren.

Volg de gids [Fondsen](../donations/funds.md) om uw gievingscategorieën in te stellen:

1. Maak uw meestvoorkomende fondsen (bijv. "Algemeen Fonds", "Bouwfonds", "Missies")
2. Markeer aftrekbare fondsen op de juiste manier -- dit heeft invloed op jaar-eindgifteverklaringen

:::tip
U kunt op elk moment meer fondsen toevoegen. Begin met uw meestvoorkomende geefcategorieën.
:::

## Stap 2: Verbind Stripe

Stripe verwerkt alle betalingsverwerking. U verbindt uw Stripe-account met B1 Admin zodat donaties in uw bankrekening vloeien.

Volg de gids [Online Geven instellen](../donations/online-giving-setup.md) om Stripe te verbinden:

1. Meld u aan bij uw Stripe-dashboard en haal uw Publishable Key en Secret Key op
2. Ga in B1 Admin naar Instellingen en voer beide sleutels in

:::warning
Stripe toont uw Secret Key slechts eenmaal. Kopieer en sla het op voordat u het Stripe-dashboard verlaat. Als u het kwijtraakt, moet u een nieuw genereren.
:::

## Stap 3: Voeg een geefpagina toe aan uw website

Maak geven toegankelijk door een donatiegepagina aan uw B1-website toe te voegen.

Volg de gidsen [Online Geven instellen](../donations/online-giving-setup.md) en [Pagina's beheren](../website/managing-pages.md) om:

1. Voeg een tabblad "Donatie" toe aan uw B1.church-site
2. Uw geef-URL zal zijn: `https://yoursubdomain.b1.church/donate`
3. Leden kunnen geven zonder in te loggen (openbare pagina) of inloggen voor opgeslagen betaalmethoden en donatiehistorie

## Stap 4: Maak een testdonatie

Voordat u aan uw gemeente aankondigt, verifieert u dat alles werkt.

1. Maak een kleine testdonatie om te verifiëren dat de stroom van begin tot eind werkt
2. Controleer of de donatie in B1 Admin onder Donaties verschijnt

:::tip
Gebruik Stripe's testmodus eerst als u wilt verifiëren zonder werkelijke kosten, schakel vervolgens naar livemodus voordat u aan uw gemeente aankondigt.
:::

## Stap 5: Maak aankondigingen aan uw gemeente

Verspreid het woord zodat leden weten dat zij online kunnen geven.

1. Deel de geef-URL via uw website, e-mailnieuwsbrieven, bulletins en social media
2. Leden kunnen ook geven via de [B1 Mobiele app](../../b1-mobile/giving/) -- de geeffunctie is ingebouwd

:::info
Leden die inloggen, kunnen betaalmethoden opslaan, terugkerende donaties instellen en hun gifthistorie bekijken. Anoniem geven werkt ook -- geen inloggegevens nodig.
:::

## Stap 6: Doorlopend beheer

Houd uw donatiegegevens actueel en genereer rapporten gedurende het jaar.

1. [Importeer Stripe-transacties](../donations/stripe-import.md) regelmatig (wekelijks of maandelijks) om uw gegevens actueel te houden
2. [Bekijk donatierapporten](../donations/donation-reports.md) om giftendtrends en totalen per fonds bij te houden
3. [Genereer jaar-eindgiftverklaringen](../donations/giving-statements.md) voor de belastinggegevens van uw donoren

:::tip
Voer Stripe-import minstens maandelijks uit zodat uw gegevens actueel blijven. Zie de [Gids voor jaar-eindrapporten](./year-end-reports.md) voor het volledige jaar-eindproces.
:::

## U bent klaar!

Uw kerk accepteert nu online donaties. Leden kunnen geven via uw website, de B1 Mobiele app of elk apparaat met een webbrowser. Alle donaties worden automatisch in B1 Admin bijgehouden.

## Gerelateerde artikelen

- [Fondsen](../donations/funds.md) -- donatiecategorieën maken en beheren
- [Batches](../donations/batches.md) -- donaties in groepen organiseren
- [Donaties registreren](../donations/recording-donations.md) -- handmatig contanten en cheque-donaties invoeren
- [Stripe Import](../donations/stripe-import.md) -- online transacties in B1 Admin halen
- [Donatie-rapporten](../donations/donation-reports.md) -- giftentrends en totalen bekijken
- [Giftverklaringen](../donations/giving-statements.md) -- jaar-eindbelastingverklaringen genereren
- [Donaties doen (web)](../../b1-church/giving/making-donations.md) -- de donatiegeving voor leden
- [Donaties doen (mobiel)](../../b1-mobile/giving/making-donations.md) -- geven van de mobiele app
