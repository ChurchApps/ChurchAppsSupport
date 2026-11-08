---
title: "Gids: Online Geven Instellen"
description: "Stel online geven in B1 Admin in door donatiefondsen aan te maken, Stripe te koppelen en een Doneer-pagina aan je B1.church-website toe te voegen voor leden."
---

# Online Geven Instellen

<div class="article-intro">

Doorloop alles wat nodig is om online donaties in je kerk te ontvangen — van het aanmaken van donatiefondsen, tot het koppelen van Stripe voor betalingsverwerking, tot het delen van de gevenpagina met je gemeente. Aan het eind kunnen leden online geven via je website en mobiele app.

</div>

<div class="prereqs">
<h4>Voordat je begint</h4>

- B1 Admin-account met beheerderstoegang — zie [Rollen & Rechten](../people/roles-permissions.md)
- Een Stripe-account (maak gratis een account aan op [stripe.com](https://stripe.com) indien nodig)

</div>

## Stap 1: Donatiefondsen Aanmaken

Fondsen zijn de categorieën waarin donateurs kunnen geven. Je hebt minstens één fonds nodig voordat je donaties kunt ontvangen.

Volg de gids [Fondsen](../donations/funds.md) om je gevenscategorieën in te stellen:

1. Maak je meest voorkomende fondsen aan (bijv. "Algemeen Fonds", "Bouwfonds", "Zending")
2. Markeer fondsen die fiscaal aftrekbaar zijn — dit heeft invloed op de jaaroverzichten van giften

:::tip
Je kunt op elk moment extra fondsen toevoegen. Begin met je meest voorkomende gevenscategorieën.
:::

## Stap 2: Stripe Koppelen

Stripe verwerkt alle betalingen. Je koppelt je Stripe-account aan B1 Admin, zodat donaties op je bankrekening terechtkomen.

Volg de gids [Online Geven Instellen](../donations/online-giving-setup.md) om Stripe te koppelen:

1. Log in op je Stripe-dashboard en haal je Publishable Key en Secret Key op
2. Ga in B1 Admin naar Instellingen en vul beide sleutels in

:::warning
Stripe toont je Secret Key slechts één keer. Kopieer en bewaar deze voordat je het Stripe-dashboard verlaat. Als je hem kwijtraakt, moet je een nieuwe genereren.
:::

## Stap 3: Een Gevenpagina Toevoegen aan Je Website

Maak geven toegankelijk door een donatiepagina aan je B1-website toe te voegen.

Volg de gidsen [Online Geven Instellen](../donations/online-giving-setup.md) en [Pagina's Beheren](../website/managing-pages.md) om:

1. Een tabblad "Doneer" aan je B1.church-site toe te voegen
2. Je gever-URL wordt: `https://yoursubdomain.b1.church/donate`
3. Leden kunnen geven zonder in te loggen (openbare pagina) of inloggen voor opgeslagen betaalmethoden en donatiegeschiedenis

## Stap 4: Een Testdonatie Doen

Controleer alles voordat je het aan je gemeente aankondigt.

1. Doe een kleine testdonatie om te controleren of het hele proces goed werkt
2. Controleer of de donatie in B1 Admin verschijnt onder Donaties

:::tip
Gebruik eerst de testmodus van Stripe als je wilt controleren zonder echte betalingen, en schakel daarna over naar de live-modus voordat je het aan je gemeente aankondigt.
:::

## Stap 5: Je Gemeente Informeren

Laat je leden weten dat ze online kunnen geven.

1. Deel de gever-URL via je website, e-mailnieuwsbrieven, kerkbladen en sociale media
2. Leden kunnen ook geven via de [B1 App](../../b1-church/giving/index.md) — de gevenfunctie is al ingebouwd

:::info
Leden die inloggen kunnen betaalmethoden opslaan, terugkerende donaties instellen en hun gevengeschiedenis bekijken. Anoniem geven werkt ook — er is geen inlog nodig.
:::

## Stap 6: Doorlopend Beheer

Houd je donatieadministratie up-to-date en genereer het hele jaar door rapporten.

1. [Stripe-transacties importeren](../donations/stripe-import.md) regelmatig (wekelijks of maandelijks) om je administratie actueel te houden
2. [Donatierapporten bekijken](../donations/donation-reports.md) om gevenstrends en totalen per fonds bij te houden
3. [Jaaroverzichten van giften genereren](../donations/giving-statements.md) voor de belastingadministratie van je donateurs

:::tip
Voer Stripe-importen minstens maandelijks uit, zodat je administratie up-to-date blijft. Zie de [Gids Jaarrapportages](./year-end-reports.md) voor het volledige jaarproces.
:::

## Klaar!

Je kerk accepteert nu online donaties. Leden kunnen geven via je website, de B1 App of elk apparaat met een webbrowser. Alle donaties worden automatisch bijgehouden in B1 Admin.

## Gerelateerde Artikelen

- [Fondsen](../donations/funds.md) — donatiecategorieën aanmaken en beheren
- [Batches](../donations/batches.md) — donaties in groepen indelen
- [Donaties Registreren](../donations/recording-donations.md) — contant- en cheque-donaties handmatig invoeren
- [Stripe-import](../donations/stripe-import.md) — online transacties in B1 Admin ophalen
- [Donatierapporten](../donations/donation-reports.md) — gevenstrends en totalen bekijken
- [Jaaroverzichten van Giften](../donations/giving-statements.md) — jaarlijkse belastingoverzichten genereren
- [Donaties Doen](../../b1-church/giving/making-donations.md) — de gevenervaring voor leden op B1.church en in de B1 App
