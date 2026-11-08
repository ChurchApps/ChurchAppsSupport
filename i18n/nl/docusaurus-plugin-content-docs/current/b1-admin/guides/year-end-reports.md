---
title: "Gids: jaaroverzichten van giften genereren"
description: "Rond in B1 Admin de donatiegegevens van het jaar af, controleer de belastinginstellingen van de fondsen en genereer belastingaftrekbare giftenoverzichten voor elke donateur."
---

# Jaaroverzichten van giften genereren

<div class="article-intro">

Doorloop het jaarlijkse proces om je donatiegegevens af te ronden, de fondsinstellingen te controleren en belastingaftrekbare giftenoverzichten voor elke donateur te genereren. Dit wordt doorgaans begin januari gedaan voor het voorgaande kalenderjaar.

</div>

<div class="prereqs">
<h4>Voordat je begint</h4>

- B1 Admin-account met toegang tot financiën
- Donaties die het hele jaar door zijn vastgelegd (online via Stripe en/of handmatig ingevoerd)
- Toegang tot je Stripe-account als je online donaties accepteert

</div>

## Stap 1: Definitieve Stripe-transacties importeren

Zorg ervoor dat alle online donaties van het einde van het jaar in je systeem staan.

Volg de handleiding [Stripe Import](../donations/stripe-import.md) om:

1. Naar Donaties > Stripe Import te navigeren
2. Een datumbereik te selecteren dat het einde van het jaar omvat (bijv. 1 december t/m 31 december)
3. Klik eerst op Voorvertoning om te controleren en daarna op Ontbrekende importeren om het af te ronden

:::warning
Voer deze import uit voordat je de overzichten genereert. Transacties die je niet hebt geïmporteerd, verschijnen niet op de giftenoverzichten van donateurs.
:::

## Stap 2: Donatierapporten controleren

Controleer of je gegevens correct zijn voordat je overzichten genereert.

Volg de handleiding [Donatierapporten](../donations/donation-reports.md) om:

1. De samenvatting van donaties voor het hele jaar te bekijken
2. Totalen per fonds na te lopen en ze te vergelijken met je bankafschriften om eventuele afwijkingen op te sporen
3. Indien nodig op individuele batches te klikken om gegevens per donateur te controleren

## Stap 3: Belastingstatus van fondsen controleren

Zorg dat de instelling voor belastingaftrek van elk fonds correct is, zodat de overzichten juist zijn.

Volg de handleiding [Fondsen](../donations/funds.md) om:

1. Elk fonds te openen en te bevestigen dat de instelling voor belastingaftrek correct is

:::info
Alleen donaties aan fondsen die als belastingaftrekbaar zijn gemarkeerd, verschijnen op giftenoverzichten. Als een fonds belastingaftrekbaar zou moeten zijn maar dat niet is aangemerkt, werk het dan bij voordat je de overzichten genereert.
:::

## Stap 4: Giftenoverzichten genereren

Maak de officiële giftenoverzichten voor je donateurs.

Volg de handleiding [Giftenoverzichten](../donations/giving-statements.md) om:

1. Naar **Donaties > Giftenoverzichten** te navigeren
2. Het jaar te selecteren in de keuzelijst en de samenvattende statistieken te bekijken
3. Je downloadmethode te kiezen:
   - **ZIP downloaden**: afzonderlijke CSV-bestanden, één per donateur
   - **Alles afdrukken**: afdrukweergave met elk overzicht op een nieuwe pagina, met je kerklogo bovenaan (als je er een hebt geüpload)

:::tip
Genereer de overzichten begin januari, terwijl de gegevens nog vers zijn. Zo heb je tijd om eventuele problemen op te lossen voordat ze worden verstuurd.
:::

## Stap 5: Verspreiden naar donateurs

Zorg dat de overzichten bij je donateurs terechtkomen.

1. Print de overzichten en verstuur ze per post, of stuur de afzonderlijke CSV's per e-mail naar donateurs
2. Leden kunnen hun eigen giftengeschiedenis ook bekijken en overzichten afdrukken op [B1.church of in de B1 App](../../b1-church/giving/donation-history.md)

## Klaar!

Je jaaroverzichten van giften zijn compleet. Donateurs hebben hun belastingaftrekbare overzichten ontvangen en je financiële administratie is voor het jaar afgerond.

## Gerelateerde artikelen

- [Stripe Import](../donations/stripe-import.md): online transacties importeren
- [Donatierapporten](../donations/donation-reports.md): giftentrends en totalen bekijken
- [Fondsen](../donations/funds.md): fondsen en instellingen voor belastingaftrek beheren
- [Giftenoverzichten](../donations/giving-statements.md): jaaroverzichten genereren
- [Donaties registreren](../donations/recording-donations.md): contant- en chequedonaties handmatig invoeren
- [Donatiegeschiedenis (web)](../../b1-church/giving/donation-history.md): zelfbedieningsweergave voor leden
- [Gids: online giften instellen](./online-giving.md): eerste Stripe- en giftenconfiguratie
