---
title: "Ondersteuning voor meerdere valuta"
---

# Ondersteuning voor meerdere valuta

<div class="article-intro">

Met de functie voor meerdere valuta van B1 kan uw kerk donaties in verschillende valuta accepteren en bijhouden. Dit is vooral nuttig voor kerken met internationale leden, zendelingen of meerdere campussen in verschillende landen.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- U hebt toestemming nodig om donaties te beheren. Zie [Rollen en machtigingen](../people/roles-permissions.md) voor details.
- Stel uw [online geven](./online-giving-setup.md) in met Stripe, dat transacties in meerdere valuta ondersteunt.
- Begrijp de boekhoudkundige behoeften van uw kerk voor het omgaan met meerdere valuta.

</div>

## Meerdere valuta inschakelen

Ondersteuning voor meerdere valuta is nu standaard ingeschakeld in B1. Eenmaal ingeschakeld:

- Kunnen leden geven in hun lokale valuta wanneer ze online doneren
- Kunt u handmatig donaties in elke valuta registreren
- Tonen donatierapporten bedragen in hun oorspronkelijke valuta
- Verwerkt Stripe valutaconversie automatisch voor online geven

## Ondersteunde valuta

Het systeem ondersteunt alle belangrijke wereldvaluta's, waaronder:

- **USD** -- Amerikaanse dollar
- **EUR** -- Euro
- **GBP** -- Britse pond
- **CAD** -- Canadese dollar
- **AUD** -- Australische dollar
- **MXN** -- Mexicaanse peso
- **BRL** -- Braziliaanse real
- **INR** -- Indiase roepie
- **CNY** -- Chinese yuan
- **JPY** -- Japanse yen
- En vele andere...

De beschikbare valuta voor online geven zijn afhankelijk van de door uw Stripe-account ondersteunde valuta.

## Donaties in verschillende valuta registreren

### Online donaties

Wanneer een lid online geeft via Stripe:

1. Kiest hij of zij de gewenste valuta bij het afrekenen
2. Verwerkt Stripe de betaling in die valuta
3. Wordt de donatie in B1 geregistreerd met het oorspronkelijke valutabedrag
4. Verwerkt Stripe automatisch elke benodigde valutaconversie naar de standaardvaluta van uw account

### Handmatige invoer

Om een contante of chequedonatie in een andere valuta te registreren:

1. Navigeer naar **Donaties** in B1 Admin
2. Klik op **Donatie toevoegen**
3. Selecteer de valuta uit het valuta-dropdownmenu
4. Voer het bedrag in die valuta in
5. Vul de rest van de donatiegegevens in
6. Klik op **Opslaan**

## Donaties in meerdere valuta bekijken

### Donatierapporten

Donatierapporten tonen bedragen in hun oorspronkelijke valuta:

- Individuele donatiegegevens tonen de valutacode (bijvoorbeeld "$100,00 USD")
- Totalen worden per valuta berekend
- U kunt filteren op specifieke valuta

### Geefoverzichten

Bij het genereren van geefoverzichten:

- Verschijnt elke donatie met zijn oorspronkelijke valuta
- Worden totalen uitgesplitst per valuta
- Zien leden precies wat ze hebben gegeven in elke valuta

## Stripe-integratie

Voor online geven verwerkt Stripe transacties in meerdere valuta:

- **Automatische conversie** -- Stripe converteert valuta naar de standaardvaluta van uw account
- **Wisselkoersen** -- Stripe gebruikt actuele marktwisselkoersen
- **Kosten** -- Valutaconversie kan extra Stripe-kosten met zich meebrengen
- **Uitbetalingsvaluta** -- Gelden worden gestort in de standaardvaluta van uw account

:::info
Controleer uw Stripe-dashboard om de huidige conversiekoersen en eventuele kosten in verband met transacties in meerdere valuta te bekijken.
:::

## Boekhoudkundige overwegingen

Bij het werken met meerdere valuta:

- **Administratie** -- Houd de oorspronkelijke donatiebedragen en valuta bij voor nauwkeurige rapportage
- **Wisselkoersen** -- Houd er rekening mee dat de conversiekoersen van Stripe kunnen afwijken van die van uw bank
- **Belastingontvangstbewijzen** -- Overleg met uw boekhouder over hoe donaties in verschillende valuta voor belastingdoeleinden te rapporteren
- **Fondstoewijzing** -- U kunt donaties toewijzen aan specifieke fondsen, ongeacht de valuta

## Aanbevolen werkwijzen

- **Standaardvaluta** -- Stel uw primaire kerkvaluta in als standaard voor de meeste transacties
- **Duidelijke communicatie** -- Vertel donateurs in welke valuta zij geven tijdens het afrekenproces
- **Consistente rapportage** -- Beslis of u rapporteert in oorspronkelijke valuta of converteert naar één valuta voor overzichten
- **Regelmatige afstemming** -- Stem Stripe-uitbetalingen af op uw donatiegegevens, rekening houdend met valutaconversies

## Beperkingen

- Valutaconversie wordt alleen door Stripe verwerkt voor online geven
- Handmatige donaties worden geregistreerd zoals ingevoerd, zonder automatische conversie
- Historische rapporten tonen donaties in hun oorspronkelijke valuta
- Totaalberekeningen worden per valuta gedaan, niet over valuta heen

## Gerelateerde artikelen

- [Online geven instellen](./online-giving-setup.md) -- Stripe configureren voor het accepteren van donaties
- [Donaties registreren](./recording-donations.md) -- Donatiegegevens handmatig invoeren
- [Donatierapporten](./donation-reports.md) -- Donatieoverzichten genereren en bekijken
- [Geefoverzichten](./giving-statements.md) -- Jaarlijkse geefoverzichten maken
