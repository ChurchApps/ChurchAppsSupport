---
title: "Stripe Import"
---

# Stripe Import

<div class="article-intro">

Als u online donaties accepteert via Stripe, kunt u met het Stripe Import-hulpmiddel die transacties in B1 Admin halen zodat al uw giftgegevens op één plaats staan. Dit is vooral handig voor het opvangen van transacties die niet automatisch werden gesynchroniseerd.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- Voltooi [Online Geven instellen](online-giving-setup.md) om uw Stripe-account met B1 Admin te verbinden
- Controleer of u donaties in uw Stripe-dashboard hebt voor het datumbereik dat u wilt importeren

</div>

## Hoe het werkt

Het importproces gebruikt een werkstroom met twee stappen: eerst bekijkt u wat zou worden geïmporteerd, vervolgens bevestigt u de import. Deze proefversie stelt u in staat om alles te controleren voordat gegevens worden gemaakt.

## Transacties importeren

1. Ga in **B1 Admin** naar **Donaties > Batches**.
2. Klik op de **Stripe Import**-link onderaan de Batches-pagina.
3. Selecteer een **datumbereik** voor de transacties die u wilt importeren.
4. Klik op **Voorbeeld** om een proefcontrole uit te voeren.

## Het voorbeeld controleren

Het voorbeeld toont elke transactie van Stripe samen met een statusindicator:

- **Nieuw** -- deze transactie is nog niet geïmporteerd en zal worden opgenomen als u doorgaat.
- **Al geïmporteerd** -- deze transactie bestaat al in B1 Admin en zal worden overgeslagen.
- **Overgeslagen** -- deze transactie is om een ander reden uitgesloten (bijv. een restitutie of mislukte betaling).

Een samenvattingssectie bovenaan toont het totale aantal transacties in elke categorie en de betrokken dollarbedragen.

:::info
De voorbeeldstap maakt geen gegevens. Het is een alleen-lezen controle zodat u kunt verifiëren wat er gebeurt voordat u het bevestigt.
:::

## De import voltooien

1. Controleer de voorbeeldresultaten en de samenvattingstotalen.
2. Klik op **Ontbrekende importeren** om alle transacties met het label **Nieuw** te importeren.
3. Nadat de import is voltooid, worden statuschips naast elke transactie bijgewerkt om het resultaat weer te geven.

## Tips voor het gebruik van Stripe Import

- Voer de import regelmatig uit (wekelijks of maandelijks) om uw gegevens actueel te houden.
- Als een transactie als **Al geïmporteerd** wordt weergegeven, betekent dit dat B1 Admin al een overeenkomend gegevens -- geen actie is nodig.
- Gebruik het datumberekfilter om u op een bepaalde periode te concentreren als u naar bepaalde transacties zoekt.

:::tip
Bezoek na het importeren de pagina [Batches](batches.md) om te verifiëren dat de geïmporteerde donaties correct verschijnen en dat de totalen overeenkomen met wat u in uw Stripe-dashboard ziet.
:::

## Volgende stappen

- Controleer [Donatie-rapporten](donation-reports.md) om de geïmporteerde transacties naast uw andere giftgegevens te controleren
- Zorg ervoor dat geïmporteerde donaties aan de juiste [fondsen](funds.md) zijn toegewezen voor nauwkeurige [giftverklaringen](giving-statements.md)
