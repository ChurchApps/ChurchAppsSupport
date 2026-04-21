---
title: "Vejledning: Opsætning af børneministeriums ind- og udchecking"
---

# Opsætning af børneministeriums ind- og udchecking

<div class="article-intro">

Denne vejledning fører dig gennem alt, der er nødvendigt for at få et børneministriums ind- og udchecking-system kørende på din kirke -- fra indtastning af familier i databasen til konfigurering af alderspassende grupper til printning af navneskilt på søndagens morgen. Til sidst vil forældre kunne tjekke deres børn ind ved en kioskktablet og få et matchende sikkerhedsmærke.

</div>

<div class="prereqs">
<h4>Før du starter</h4>

- Opret din kirkekonto på [admin.b1.church](https://admin.b1.church)
- Sørg for, at du har administratoradgang -- se [Roller og tilladelser](../people/roles-permissions.md), hvis det er nødvendigt
- Valgfrit: Forbered en CSV-fil med familier, hvis du migrerer fra et andet system

</div>

## Trin 1: Tilføj familier til din database

Før ind- og udchecking kan virke, skal systemet vide om dine familier. Hvert barn skal være linket til en forælder gennem husstands-funktionen.

Følg vejledningen [Tilføjelse af personer](../people/adding-people.md) for at tilføje mindst en familie. Sørg for at:

- Tilføj forælder(ne) først
- Tilføj hvert barn
- Link dem i samme husstand ved hjælp af [husstands-editoren](../people/adding-people.md#managing-households)

:::tip
Hvis du har mere end nogle få familier at tilføje, skal du bruge værktøjet [CSV Import](../people/importing-data.md) i stedet for at tilføje dem en ad gangen. Du kan importere hele dit dir på få minutter.
:::

## Trin 2: Opret børneministeriums grupper

Grupper definerer de klasser, børn tjekker ind i. Du ønsker typisk en gruppe pr. aldersgruppe.

Følg vejledningen [Oprettelse af grupper](../groups/creating-groups.md) for at oprette grupper som:

- **Barselstue** (alder 0-2)
- **Småbørn** (alder 3-5)
- **Elementær** (alder 6-10)

Du kan justere navne og aldersgrupper for at passe til din ministeriestruktur.

## Trin 3: Konfigurer campusser og tjenester

Ind- og udchecking er knyttet til specifikke servicetider. Du skal have mindst en campus og en servicet konfigureret.

Følg vejledningen [Fremmøde-opsætning](../attendance/setup.md) for at:

1. Tilføj dit campus (f.eks. "Hovedcampus")
2. Tilføj en tjeneste (f.eks. "Søndag morgen")
3. Indstil servicetiden (f.eks. "9:00")
4. Tildel dine børneministeriums grupper til tjenesten

## Trin 4: Opsætning af ind- og udchecking-appen

Nu forbinder du alt ved at installere ind- og udchecking-appen på en tablet.

1. Installer **B1 Ind- og udchecking-appen** -- se artiklen [Ind- og udchecking](../attendance/check-in.md) for downloadlinks
2. Log ind med dine B1 Admin-legitimationsoplysninger
3. Vælg dit campus og din servicetid

Se artiklen [Ind- og udchecking](../attendance/check-in.md) for detaljerede opsætningstrin.

## Trin 5: Få dit hardware

Du skal have en tablet til kioskken og eventuelt en Brother-etikett printer for navneskilte.

Som minimum:
- **En Android eller Amazon Fire-tablet** -- se [anbefalede tablets](../attendance/check-in.md#recommended-hardware)
- **En Brother-etikett printer** -- QL-1110NWB anbefales for dens Bluetooth- og WiFi-support
- **Brother DK-1201 etiketter** (1-1/7" x 3-1/2")

:::warning
Kun Brother-etikett printere er kompatible med B1 Ind- og udchecking-appen. Andre printer-mærker virker ikke.
:::

## Trin 6: Kør en test ind- og udchecking

Før søndagens morgen skal du lave en test:

1. Åbn B1 Ind- og udchecking-appen på din tablet
2. Vælg dit campus og den korrekte servicetid
3. Søg efter en af de familier, du tilføjede
4. Check et barn ind og bekræft:
   - Fremmødet vises i B1 Admin under **Fremmøde**
   - Hvis du bruger en printer, udskrives et navneskilt korrekt

:::tip
Træn dine velkomst-holdsvoluntere på ind- og udchecking-processen, før lancering. En quick 5-minuts gennemgang er normalt alt der er nødvendigt.
:::

## Du er færdig!

Dit børneministeriums ind- og udchecking er klar. Forældre kan søge efter deres familie, vælge deres børn og tjekke ind ved kioskken. Fremmødet registreres automatisk i B1 Admin.

## Relaterede artikler

- [Tilføjelse af personer](../people/adding-people.md) -- tilføj flere familier, når de besøger
- [Oprettelse af grupper](../groups/creating-groups.md) -- administrer dine børneministerium grupper
- [Fremmøde-opsætning](../attendance/setup.md) -- konfigurer campusser og tjenester
- [Ind- og udchecking](../attendance/check-in.md) -- detaljeret ind- og udchecking-app opsætning og hardware
- [Sporing af fremmøde](../attendance/tracking-attendance.md) -- se ind- og udchecking-rapporter
