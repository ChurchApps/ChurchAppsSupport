---
title: "Campussen"
---

# Campussen

<div class="article-intro">

Als uw kerk op meer dan één locatie samenkomt, kunt u met **Campussen** bijhouden bij welke locatie elke persoon en groep hoort. Eenmaal geconfigureerd, verschijnen campussen als optie op persoonsprofielen, bij het instellen van aanwezigheid en in het dashboard Demografie. Kerken met meerdere locaties kunnen in heel B1 Admin filteren, zoeken en rapporteren per campus.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- U hebt de machtiging **Kerkinstellingen bewerken** nodig om campussen te beheren. Zie [Rollen en machtigingen](./roles-permissions.md).

</div>

## Campusinstellingen openen

Ga in B1 Admin naar **Instellingen** in de zijbalk aan de linkerkant en selecteer **Campussen** in de navigatie van Instellingen. U ziet een lijst met alle geconfigureerde campussen met hun naam, locatie en tijdzone.

## Een campus toevoegen

1. Klik op **Campus toevoegen** (of de knop **+** als er nog geen campussen bestaan).
2. Vul de campusgegevens in:
   - **Naam** *(verplicht)* — de weergavenaam die overal in B1 Admin wordt getoond (bijvoorbeeld "Hoofdcampus" of "Noordcampus").
   - **Adres** — het straatadres van de campus (gebruikt voor informatieve weergave; niet hetzelfde als het hoofdadres van uw kerk in Kerkinstellingen).
   - **Plaats / Provincie / Postcode** — de locatie van de campus.
   - **Tijdzone** — de IANA-tijdzone voor deze campus (bijvoorbeeld *America/Chicago*). Handig wanneer campussen zich in verschillende tijdzones bevinden.
   - **Website** — een optionele URL voor de eigen webaanwezigheid van deze campus.
3. Klik op **Opslaan**.

## Een campus bewerken

Klik op een campusrij in de lijst om de editor in het paneel rechts te openen. Werk de velden bij en klik op **Opslaan**.

## Een campus verwijderen

Open een campus om te bewerken en klik op **Verwijderen**. U wordt gevraagd te bevestigen. Het verwijderen van een campus verwijdert niet de personen die eraan zijn toegewezen — hun campusveld wordt eenvoudig leeg.

## Personen aan een campus toewijzen

Na het aanmaken van campussen kunnen medewerkers een persoon vanuit diens profiel aan een campus toewijzen:

1. Open het record van een persoon in **Personen**.
2. Klik op **Bewerken**.
3. Kies de campus in de vervolgkeuzelijst **Campus**.
4. Klik op **Opslaan**.

U kunt de campus ook in bulk bijwerken vanaf de pagina Personen. Selecteer meerdere personen, gebruik **Bulk bewerken** en stel het veld Campus voor iedereen tegelijk in.

## Filteren op campus

Zodra campussen zijn ingesteld, kunt u overal in B1 Admin filteren op campus:

- **Zoeken in Personen** — voeg een campusvoorwaarde toe in het geavanceerd zoeken, of laad een [opgeslagen lijst](../people/lists.md) die is beperkt tot een campus.
- **Demografie** — het [dashboard Demografie](../people/demographics.md) toont een campusdonutgrafiek zodra ten minste één persoon een campus toegewezen heeft gekregen.
- **Aanwezigheid instellen** — elke diensttijd in Aanwezigheid kan worden gekoppeld aan een campus.

:::tip
Kerken met één locatie hoeven geen campussen te configureren. Alle campusfuncties zijn optioneel — als er geen campussen bestaan, verschijnen campusvelden en -grafieken eenvoudigweg niet.
:::

## Gerelateerde artikelen

- [Kerkinstellingen](./church-settings.md) — uw hoofdadres en huisstijl van de kerk (los van campusadressen)
- [Demografie](../people/demographics.md) — de uitsplitsingsgrafiek per campus
- [Aanwezigheid instellen](../attendance/setup.md) — koppel diensttijden aan een campus
- [Bulkbewerking](../people/bulk-editing.md) — wijs campus toe aan veel personen tegelijk
