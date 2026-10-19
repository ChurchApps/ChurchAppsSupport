---
title: "Pag-export ng Datos"
---

# Pag-export ng Datos

<div class="article-intro">

Hinahayaan ka ng B1 Admin na i-export ang datos ng iyong simbahan para magamit sa mga spreadsheet, maibahagi sa iyong team, o maitabi bilang backup. Kailangan mo man ng mabilisang listahan ng mga pangalan at email o kumpletong database export, may mga opsyon para sa iyo.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng aktibong B1 Admin account na may pahintulot na tingnan ang datos na gusto mong i-export. Tingnan ang [Roles & Permissions](roles-permissions.md) kung hindi ka sigurado sa iyong antas ng access.
- Para sa buong database export, kailangan mo ng access sa **Settings** area.

</div>

## Pag-export mula sa People Page

Ang pinakamabilis na paraan para i-export ang iyong directory ay direkta mula sa **People** page:

1. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas ng B1 Admin), i-expand ang **People**, at i-click ang **People**.
2. Gamitin ang search bar o mga filter para paliitin ang mga resultang gusto mong i-export (o iwanang walang filter para i-export ang lahat). Tingnan ang [Paghahanap ng mga Tao](searching-people.md) para sa mga tip sa pag-filter.
3. I-click ang button na **Export** sa header ng People page.
4. Magda-download ang isang CSV file sa iyong computer kasama ang mga taong nasa kasalukuyan mong resulta, kasama ang kanilang pangalan, impormasyon sa pakikipag-ugnayan, address, at iba pang karaniwang field.

:::tip
Kasama sa export ang lahat ng nasa kasalukuyan mong resulta. Magsagawa muna ng paghahanap, mag-load ng [Saved List](./lists.md), o gamitin ang **Advanced** search para i-export lamang ang mga taong kailangan mo.
:::

## Buong Data Export mula sa Settings {#full-data-export-from-settings}

Para sa kumpletong export ng lahat ng datos ng iyong B1 (hindi lang mga tao), gamitin ang export tool sa Settings:

1. Sa Jump menu, piliin ang **Settings > Settings**.
2. I-click ang link na **Import/Export** sa ilalim ng pangalan ng iyong simbahan sa itaas ng kaliwang settings menu.
3. Piliin ang **B1 Database** mula sa dropdown na **Data Source**.
4. Suriin ang preview ng datos at i-click ang **Continue to Destination**.
5. Piliin ang **B1 Export Zip** bilang export destination.
6. Subaybayan ang progreso ng export hanggang lumabas ang berdeng checkmark sa lahat ng item.
7. Awtomatikong magda-download ang export file. Hanapin ang `B1Export` file sa iyong downloads folder.
8. I-unzip ang file para ma-access ang mga indibidwal na CSV file (gaya ng `people.csv`) na mabubuksan mo sa Excel, Google Sheets, o Numbers.

:::info
Ang B1 Export Zip ay kumpletong backup ng datos ng iyong simbahan. Naglalaman ito ng:

- mga tao (kasama ang mga larawan) at mga household, kasama ang mga contact sa household pickup
- mga campus, serbisyo, at oras ng serbisyo
- mga grupo at miyembro ng grupo
- mga pondo at donasyon, kasama ang mga regalong hinati sa ilang pondo
- attendance
- mga form, tanong, submission, at sagot
- mga custom field at ang kanilang mga value
- mga saved na listahan ng tao

Kung hindi ma-download o mabasa ang larawan ng isang tao habang nag-e-export, lalaktawan ang larawang iyon at magpapatuloy ang export nang wala ito.

Para ibalik ito, piliin ang **B1 Import Zip** bilang source at ang **B1 Database** bilang destination (tingnan ang [Pag-import ng Datos](./importing-data.md)). Muling bubuuin ang mga household, pickup contact, at saved list kasama ng mga tao. Ang mga filter ng saved list ay itinuturo sa mga naibalik na grupo, pondo, campus, at custom field.
:::

## Pag-export ng Datos ng Grupo

Maaari ka ring mag-export ng mga listahan ng miyembro para sa mga indibidwal na grupo. Mula sa **Groups** page, buksan ang isang grupo at i-click ang **download icon** para i-export ang listahan ng miyembro ng grupong iyon. Tingnan ang [Mga Miyembro ng Grupo](../groups/group-members.md) para sa mas detalyadong impormasyon.

:::info
Gumagana ang mga na-export na CSV file sa lahat ng pangunahing spreadsheet application, kabilang ang Microsoft Excel, Google Sheets, at Apple Numbers.
:::
