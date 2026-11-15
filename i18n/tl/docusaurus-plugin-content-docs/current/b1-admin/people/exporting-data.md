---
title: "Pag-export ng Datos"
description: "I-export ang mga tao bilang CSV, mga listahan ng miyembro ng grupo, o isang buong backup ng B1 database mula sa B1 Admin, at tingnan kung ano ang laman ng B1 Export Zip."
---

# Pag-export ng Datos

<div class="article-intro">

Hinahayaan ka ng B1 Admin na i-export ang datos ng iyong simbahan para magamit mo ito sa mga spreadsheet, maibahagi sa iyong team, o maitabi bilang backup. Kailangan mo man ng mabilisang listahan ng mga pangalan at email o kumpletong export ng database, may mga opsyon para sa iyong pangangailangan.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng aktibong B1 Admin account na may pahintulot na tingnan ang datos na gusto mong i-export. Tingnan ang [Roles & Permissions](roles-permissions.md) kung hindi ka sigurado sa antas ng access mo.
- Para sa kumpletong database export, kailangan mo ng access sa lugar na **Settings**.

</div>

## Pag-export mula sa Pahinang People {#exporting-from-the-people-page}

Ang pinakamabilis na paraan para i-export ang directory mo ay direkta sa pahinang **People**:

1. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas ng B1 Admin), buksan ang **People**, at i-click ang **People**.
2. Gamitin ang search bar o mga filter para paliitin ang mga resultang gusto mong i-export (o iwanang walang filter para i-export ang lahat). Tingnan ang [Searching People](searching-people.md) para sa mga tip sa pag-filter.
3. I-click ang button na **Export** sa header ng pahinang People.
4. Made-download sa iyong computer ang CSV file na pinangalanang `people.csv` kasama ang mga taong nasa kasalukuyan mong resulta, kabilang ang pangalan, impormasyon ng contact, address, at iba pang karaniwang field. Kung hindi ka nag-search, kasama sa export ang buong directory mo, kahit na ang pahina ay nagpapakita lang ng unang bahagi nito.

:::tip
Kasama sa export ang lahat ng tao sa kasalukuyan mong resulta. Mag-search muna, mag-load ng [Saved List](./lists.md), o gamitin ang **Advanced** search para i-export lang ang mga taong kailangan mo.
:::

## Buong Data Export mula sa Settings {#full-data-export-from-settings}

Para sa kumpletong export ng lahat ng datos mo sa B1 (hindi lang ng mga tao), gamitin ang export tool sa Settings:

1. Sa Jump menu, piliin ang **Settings > Settings**.
2. I-click ang link na **Import/Export** sa ilalim ng pangalan ng iyong simbahan sa itaas ng kaliwang settings menu.
3. Piliin ang **B1 Database** mula sa dropdown na **Data Source**.
4. Suriin ang preview ng datos at i-click ang **Continue to Destination**.
5. Piliin ang **B1 Export Zip** bilang destinasyon ng export.
6. Bantayan ang progreso ng export hanggang lumitaw ang berdeng checkmark sa lahat ng item.
7. Awtomatikong made-download ang export file. Hanapin ang file na `B1Export` sa iyong downloads folder.
8. I-unzip ang file para ma-access ang mga indibidwal na CSV file (gaya ng `people.csv`) na mabubuksan mo sa Excel, Google Sheets, o Numbers.

:::info
Ang B1 Export Zip ay kumpletong backup ng datos ng iyong simbahan. Naglalaman ito ng:

- mga tao (kasama ang mga larawan) at mga household, kasama ang mga pickup contact ng household
- mga campus, service, at oras ng service
- mga grupo at miyembro ng grupo
- mga pondo at donasyon, kasama ang mga regalong hinati sa ilang pondo
- attendance
- mga form, tanong, submission, at sagot
- mga custom field at ang kanilang mga halaga
- mga naka-save na listahan ng tao

Kung hindi ma-download o mabasa ang larawan ng isang tao habang nag-e-export, lalaktawan ang larawang iyon at magpapatuloy ang export nang wala ito.

Para ibalik ito, piliin ang **B1 Import Zip** bilang source at ang **B1 Database** bilang destinasyon (tingnan ang [Importing Data](./importing-data.md)). Muling bubuuin ang mga household, pickup contact, at naka-save na listahan kasama ng mga tao. Ituturo sa mga naibalik na grupo, pondo, campus, at custom field ang mga filter ng naka-save na listahan.
:::

## Pag-export ng Datos ng Grupo {#exporting-group-data}

Puwede ka ring mag-export ng listahan ng miyembro para sa mga indibidwal na grupo. Mula sa pahinang **Groups**, buksan ang isang grupo at i-click ang **download icon** para i-export ang listahan ng miyembro ng grupong iyon. Tingnan ang [Group Members](../groups/group-members.md) para sa mas maraming detalye.

:::info
Gumagana ang mga na-export na CSV file sa lahat ng pangunahing spreadsheet application, kabilang ang Microsoft Excel, Google Sheets, at Apple Numbers.
:::
