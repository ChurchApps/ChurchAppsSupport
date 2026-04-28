---
title: "Auditlogboek"
---

# Auditlogboek

<div class="article-intro">

Het auditlogboek volgt alle belangrijke acties en wijzigingen in uw kerkbeheersysteem. Gebruik het om inlogactiviteit te controleren, bij te houden wie wijzigingen in persoonsgegevens heeft aangebracht, machtigingsupdates te monitoren en verantwoordingskap in uw team te behouden.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- B1 Admin-account met serverbeheerders-toegang
- Navigeer naar **Instellingen** om het auditlogboek te vinden

</div>

## Het auditlogboek bekijken

1. Ga naar **Instellingen** in B1 Admin.
2. Selecteer **Auditlogboek**.
3. Het logboek geeft recente vermeldingen weer in een tabel met de volgende kolommen:
   - **Datum** -- Wanneer de actie plaatsvond.
   - **Categorie** -- Het type actie (kleurgecodeerd voor snelle opsporing).
   - **Actie** -- Wat is er gedaan (bijv. create, update, delete, login_success).
   - **Entiteit** -- Het type en ID van het record dat werd beïnvloed.
   - **IP-adres** -- Het IP-adres van de gebruiker die de actie heeft uitgevoerd.
   - **Details** -- Een samenvatting van de specifieke wijzigingen die zijn aangebracht.

## Het logboek filteren

Gebruik de filters bovenaan de pagina om de resultaten in te perken:

- **Categorie** -- Filteren op actietype:
  - **Alle categorieën** -- Alles weergeven.
  - **Inloggen** -- InlogSuccesvoluitvoeringen en fouten.
  - **Personen** -- Persoonrecordcreaties, updates of verwijderingen.
  - **Machtigingen** -- Machtigingen verlenen en intrekken.
  - **Donaties** -- Wijzigingen in donatiegegevens.
  - **Groepen** -- Groepsbeheerder acties.
  - **Formulieren** -- Formulierinzendingsactiviteit.
  - **Instellingen** -- Configuratiewijzigingen.
- **Begindatum** -- Vermeldingen van deze datum voorwaarts weergeven.
- **Einddatum** -- Vermeldingen tot deze datum weergeven.

Klik op **Zoeken** nadat u uw filters hebt ingesteld om de resultaten bij te werken.

## Categorieën begrijpen

Elke categorie is kleurgecodeerd voor snelle identificatie:

- **Inloggen** -- Blauwe chip. Volgt geslaagde en mislukte inloggingspogingen.
- **Personen** -- Paarse chip. Volgt persoonsrecordcreaties, updates en verwijderingen.
- **Machtigingen** -- Rode chip. Volgt wanneer toegangsrechten worden verleend of ingetrokken.
- **Donaties** -- Groene chip. Volgt wijzigingen in donatiegegevens.
- **Groepen** -- Grijze chip. Volgt groepsbeheerder operaties.
- **Formulieren** -- Oranje chip. Volgt formulierinzendingsactiviteit.
- **Instellingen** -- Gele chip. Volgt configuratiewijzigingen.

## Het logboek exporteren

Wanneer logboekingangen worden weergegeven, verschijnt een knop **CSV-download**. Klik erop om de huidige gefilterde resultaten naar een spreadsheet te exporteren voor offline controle of recordbehoud.

## Paginering

Gebruik de pagineringbedieningselementen onderaan de tabel om door resultaten te navigeren. U kunt 25, 50 of 100 ingangen per pagina weergeven.

:::info
Auditlogboekvermeldingen worden automatisch gedurende één jaar bewaard. Vermeldingen ouder dan 365 dagen worden verwijderd om het systeem performant te houden.
:::

:::tip
Controleer het auditlogboek regelmatig, vooral na het onboarden van nieuwe teamleden of het aanbrengen van belangrijke configuratiewijzigingen. Het helpt onverwachte activiteit vroeg te identificeren.
:::

## Gerelateerde artikelen

- [Rollen & Machtigingen](../settings/roles-permissions) -- Beheer wie toegang tot wat heeft
- [Gegevensbeveiliging](../settings/data-security) -- Begrijp hoe uw gegevens worden beschermd
- [Rapportoverzicht](./index.md) -- Zie alle beschikbare rapporten
