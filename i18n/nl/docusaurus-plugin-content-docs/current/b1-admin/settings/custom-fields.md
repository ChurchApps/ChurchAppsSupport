---
title: "Aangepaste velden"
---

# Aangepaste velden

<div class="article-intro">

Met **Aangepaste velden** kunt u uw eigen informatie bijhouden op elk persoonsrecord — dingen waarvoor B1 geen ingebouwd veld heeft, zoals een vervaldatum van een antecedentenonderzoek, een T-shirtmaat of een doopcursusstatus. U definieert een veld eenmaal in Instellingen en vult vervolgens op elk profiel van een persoon een waarde in en kunt erop zoeken of lijsten opbouwen. Dit vervangt de oudere workaround van het maken van een Personenformulier alleen om één stukje aangepaste data op te slaan.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- U hebt de bewerkingsmachtiging voor **Personen** nodig om velden te definiëren en waarden in te vullen, en toegang tot het gebied **Instellingen**. Iedereen met de weergavemachtiging voor Personen kan de waarden zien. Zie [Rollen en machtigingen](./roles-permissions.md).
- Bepaal wat u wilt bijhouden en welk type het beste past (tekst, een getal, een datum, een ja/nee-antwoord of een keuzelijst) voordat u begint.

</div>

## Aangepaste velden openen

Ga in B1 Admin naar **Instellingen** in de zijbalk aan de linkerkant en selecteer de kaart **Aangepaste velden**. U kunt ook rechtstreeks naar **/settings/custom-fields** gaan. U ziet een lijst met elk veld dat u hebt gedefinieerd, met de **Naam** en het **Veldtype**. Als u er nog geen hebt aangemaakt, leest het paneel *"Er zijn nog geen aangepaste velden toegevoegd."*

## Een veld toevoegen

1. Klik op **Veld toevoegen**.
2. Voer in de editor die rechts opent een **Naam** in — dit is het label dat medewerkers zien op persoonsprofielen en in zoekopdrachten (bijvoorbeeld *Antecedentenonderzoek verloopt*).
3. Kies een **Veldtype**:
   - **Tekstvak** — vrije, korte tekst.
   - **Geheel getal** — getallen zonder decimalen (bijvoorbeeld een aantal).
   - **Decimaal** — getallen die decimalen kunnen bevatten.
   - **Datum** — een kalenderdatum.
   - **Ja/Nee** — een eenvoudig ja-of-nee-antwoord.
   - **Meerkeuze** — een keuzelijst. Wanneer u dit type kiest, verschijnt een **keuze-editor** zodat u elke optie kunt toevoegen waaruit mensen kunnen kiezen.
4. Klik op **Opslaan**.

Het veld is nu beschikbaar op ieders persoonsprofiel.

:::info
De veldtypes zijn dezelfde set die wordt gebruikt voor [formuliervragen](../forms/creating-forms.md), zodat waarden zich consistent gedragen in heel B1.
:::

## Een veld bewerken

Klik op een veldrij in de lijst om deze opnieuw te openen in de editor. Wijzig de naam, het type of de keuzes en klik op **Opslaan**.

:::warning
Het wijzigen van het **Veldtype** van een veld dat al waarden bevat (bijvoorbeeld van Tekstvak naar Datum) kan ertoe leiden dat eerder ingevoerde waarden in een indeling staan die niet meer overeenkomt met het nieuwe type. Wijzig types voorzichtig zodra medewerkers het veld zijn gaan invullen.
:::

## Een veld verwijderen

Open een veld om te bewerken en klik op **Verwijderen**. U wordt gevraagd te bevestigen: *"Weet u zeker dat u dit aangepaste veld wilt verwijderen? De opgeslagen waarden worden ook verwijderd."* Het verwijderen van een veld verwijdert het permanent **en elke waarde die ervoor is opgeslagen** bij alle personen — dit kan niet ongedaan worden gemaakt.

## Waarden invullen bij een persoon

Zodra er minstens één aangepast veld bestaat, staan de waarden ervan direct naast de ingebouwde details op het record van elke persoon — u bekijkt ze in **Persoonlijke gegevens** en bewerkt ze op hetzelfde formulier dat u gebruikt voor de rest van de informatie van de persoon. Er verschijnt niets extra's totdat u uw eerste veld hebt gedefinieerd.

1. Open het record van een persoon in **Personen**.
2. Klik in de sectie **Persoonlijke gegevens** op de knop **Bewerken** (potlood).
3. Blader naar het gebied **Aangepaste velden** onderaan het bewerkingsformulier en vul een waarde in voor elk veld. Elk veld toont de invoer die bij het type past — een datumkiezer voor Datumvelden, een ja/nee-vervolgkeuzelijst voor Ja/Nee-velden, een keuzelijst voor Meerkeuze, enzovoort.
4. Klik op **Opslaan**. Uw waarden voor aangepaste velden worden samen met de rest van de gegevens van de persoon opgeslagen.

Terug op het profiel wordt elk veld met een waarde nu weergegeven in de sectie **Persoonlijke gegevens** (Ja/Nee-antwoorden worden gelezen als *Ja* of *Nee*, en Meerkeuze toont het label van de optie). Velden die leeg zijn gelaten, worden gewoon verborgen. Om een waarde te verwijderen, bewerkt u de persoon, maakt u het veld leeg en slaat u op — een lege waarde wordt uit het record verwijderd in plaats van als leeg opgeslagen te blijven.

:::tip
Het klassieke gebruiksscenario is vrijwilligersveiligheid: maak een **Datum**-veld genaamd *Antecedentenonderzoek verloopt*, registreer de datum van elke vrijwilliger en bouw vervolgens een [opgeslagen lijst](../people/lists.md) die iedereen markeert wiens datum is verstreken.
:::

## Zoeken en lijsten opbouwen op aangepaste velden

Aangepaste velden zijn volledig doorzoekbaar:

1. Open op de pagina **Personen** de [Geavanceerd zoeken](../people/searching-people.md).
2. Klap de categorie **Aangepaste velden** open.
3. Vink het veld aan waarop u wilt filteren, kies een operator en voer een waarde in. De aangeboden operators komen overeen met het type van het veld:
   - **Tekstvak** — bevat, is gelijk aan, begint met, eindigt met.
   - **Geheel getal / Decimaal** — is gelijk aan, groter dan, groter dan of gelijk aan, kleiner dan, kleiner dan of gelijk aan.
   - **Datum** — is gelijk aan, na (groter dan), voor (kleiner dan).
   - **Ja/Nee** — is gelijk aan Ja of Nee.
   - **Meerkeuze** — is gelijk aan of bevat een van de keuzes.

Sla elke zoekopdracht op aangepaste velden op als een [lijst](../people/lists.md). Lijsten zijn live query's, dus een lijst die is gebouwd op *Antecedentenonderzoek verloopt vóór vandaag* controleert elke persoon opnieuw telkens wanneer u deze opent — geen handmatig onderhoud nodig.

## Wat er gebeurt bij samenvoegen

Wanneer u [twee persoonsrecords samenvoegt](../people/adding-people.md), worden de waarden van aangepaste velden automatisch overgenomen. De persoon die u behoudt, houdt zijn eigen waarden; voor elk veld waarbij alleen de verwijderde persoon een waarde had, wordt die waarde overgenomen zodat er niets verloren gaat.

## Gerelateerde artikelen

- [Personen zoeken](../people/searching-people.md) — geavanceerd zoeken, inclusief de categorie Aangepaste velden
- [Opgeslagen lijsten](../people/lists.md) — sla een zoekopdracht op aangepaste velden op en voer deze live opnieuw uit
- [Rollen en machtigingen](./roles-permissions.md) — wie velden kan definiëren en waarden kan bewerken
- [Formulieren aanmaken](../forms/creating-forms.md) — voor het verzamelen van gegevens met meerdere vragen, wanneer een volledig formulier beter past dan losse velden
