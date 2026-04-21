---
title: "Importér data"
---

# Importér data

<div class="article-intro">

B1 Admin gør det nemt at bringe dine eksisterende medlemmer data ind i systemet. Uanset om du migrerer fra en anden kirke administrations platform eller ladning registreringer fra et regneark, import værktøjerne sparer dig fra manuelt at indtaste hver person. Du kan importere fra en CSV-fil eller migrere direkte fra Breeze ChMS.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Du har brug for en aktiv B1 Admin-konto med adgang til **Indstillinger**. Se [Roller og tilladelser](roles-permissions.md) hvis du er usikker på dit adgangsniveau.
- Har dine medlemsdata klar i et regneark eller eksporteret fra dit forrige system.
- Hvis du migrerer fra Breeze, sørg for at du har eksporteret dine folk, Tags og bidrag filer fra Breeze først.

</div>

## Importér fra CSV

Hvis du har medlemdata i et regneark eller et andet system, kan du importere det ved hjælp af en CSV (komma-adskilte værdier) fil.

1. Gå til **Indstillinger** i venstre sidebar.
2. Klik **Import/eksport** i øverste navigation.
3. Vælg **B1 import ZIP** fra **datakilde** dropdown.
4. Klik linket for at **download eksempel filer** så du kan se det forventede format.
5. Åbn eksempel `people.csv` filen og erstat eksempel dataene med dine egne. Hold header-rækken intakt.
6. Hvis du har medlemfotos, tilføj dem til mappen ved hjælp af 400x300px billeder, navngiv dem for at matche `importKey` numre i din CSV.
7. Komprimer dine redigerede filer ind i en zip-fil.
8. Tilbage i B1 Admin, klik **upload** og vælg din zip fil.
9. Gennemgå data forhåndsvisning og klik **Fortsæt til destination**.
10. Verificer **B1 database** er valgt, gennemgå import sammendrag og klik **Start overførsel**.
11. Vent på at import er fuldført, derefter klik **Gå til B1** for at vende tilbage til dit dashboard.

:::tip
Altid download og gennemgå eksempel filer først. Matchning af det forventede søjle format vil forhindre import fejl.
:::

:::warning
Importering af data vil tilføje nye registreringer til din database. Hvis du importerer samme fil to gange, kan du ende op med duplikat poster. Dobbelkontrol din fil før du starter overførslen.
:::

## Importér fra Breeze ChMS

Hvis du migrerer fra Breeze, B1 har en dedikeret import mulighed som håndterer omtransformationen automatisk.

1. I Breeze, gå til **Indstillinger** og klik **Eksport** i venstre sidebar.
2. Eksportér tre filer: **Folk**, **Tags** og **bidrag**.
3. Vælg alle tre eksporterede filer, højre-klik og komprimer dem ind i en enkelt zip-fil.
4. I B1 Admin, gå til **Indstillinger** derefter **Import/eksport**.
5. Vælg **Breeze import ZIP** fra **datakilde** dropdown.
6. Upload din zip-fil og følg on-screen trin til at gennemgå og fuldføre importen.

:::info
Breeze importen overfører folk, fotos, grupper, donationer, tilstedeværelse, formularer og mere -- giv dig en komplet migration i ét trin.
:::

## Efter importering

Når din import er fuldført, tag nogle få minutter til at verificere dine data:

1. Brows [folk](../people/adding-people.md) siden og point-kontrol et par profiler.
2. Bekræft at navne, e-mails, telefonnumre og adresser kom gennem korrekt.
3. Kontrollér at husstand forbindelser er intakt.
4. Gennemgå enhver [grupper](../groups/creating-groups.md) eller tags som blev importeret.

Hvis du bemærker nogle problemer, kan du redigere individuelle profiler direkte fra folk siden. Du kan også [eksportere dine data](exporting-data.md) til enhver tid for at opbygge en backup.
