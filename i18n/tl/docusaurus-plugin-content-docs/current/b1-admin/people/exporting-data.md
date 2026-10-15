---
title: "Pag-export ng Datos"
---

# Pag-export ng Datos

<div class="article-intro">

Hinahayaan ka ng B1 Admin na i-export ang datos ng iyong simbahan upang magamit sa mga spreadsheet, maibahagi sa iyong team, o maitabi bilang backup. Kailangan mo man ng mabilisang listahan ng mga pangalan at email o kumpletong export ng database, may mga opsyon para sa iyong pangangailangan.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng aktibong B1 Admin account na may permission na tingnan ang datos na nais mong i-export. Tingnan ang [Roles & Permissions](roles-permissions.md) kung hindi ka sigurado sa iyong antas ng access.
- Para sa buong database export, kailangan mo ng access sa **Settings** area.

</div>

## Pag-export mula sa People Page

Ang pinakamabilis na paraan upang i-export ang iyong directory ay direkta mula sa **People** page:

1. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas ng B1 Admin), i-expand ang **People**, at i-click ang **People**.
2. Gamitin ang search bar o mga filter upang paliitin ang mga resultang nais mong i-export (o iwanan itong walang filter upang i-export ang lahat). Tingnan ang [Searching People](searching-people.md) para sa mga tip sa pag-filter.
3. I-click ang **Export** button sa header ng People page.
4. Magda-download ang isang CSV file sa iyong computer kasama ang mga taong nasa kasalukuyan mong resulta, kabilang ang pangalan, impormasyon sa contact, address, at iba pang karaniwang field.

:::tip
Kasama sa export ang lahat ng nasa kasalukuyan mong resulta. Magsagawa muna ng search, mag-load ng [Saved List](./lists.md), o gamitin ang **Advanced** search upang i-export lamang ang mga taong kailangan mo.
:::

## Buong Data Export mula sa Settings

Para sa kumpletong export ng lahat ng datos mo sa B1 (hindi lamang ang mga tao), gamitin ang export tool sa Settings:

1. Sa Jump menu, piliin ang **Settings > Settings**.
2. I-click ang **Import/Export** link sa ilalim ng pangalan ng iyong simbahan sa itaas ng left-hand settings menu.
3. Piliin ang **B1 Database** mula sa **Data Source** dropdown.
4. Suriin ang data preview at i-click ang **Continue to Destination**.
5. Piliin ang **B1 Export Zip** bilang export destination.
6. Bantayan ang progreso ng export hanggang lumitaw ang berdeng checkmark sa lahat ng item.
7. Awtomatikong magda-download ang export file. Hanapin ang `B1Export` file sa iyong downloads folder.
8. I-unzip ang file upang ma-access ang mga indibidwal na CSV file (gaya ng `people.csv`) na maaari mong buksan sa Excel, Google Sheets, o Numbers.

:::info
Ang B1 Export Zip ay buong backup ng datos ng iyong simbahan. Naglalaman ito ng:

- mga tao (kasama ang mga larawan) at household, kabilang ang household pickup contact
- campus, service, at service time
- group at group member
- fund at donasyon, kasama ang mga regalong hinati sa ilang fund
- attendance
- form, tanong, submission, at sagot
- custom field at ang kanilang mga halaga
- naka-save na listahan ng tao

Upang maibalik ito, piliin ang **B1 Import Zip** bilang source at **B1 Database** bilang destination (tingnan ang [Importing Data](./importing-data.md)). Muling bubuuin ang mga household, pickup contact, at naka-save na listahan kasama ng mga tao. Ang mga filter ng naka-save na listahan ay itinuturo sa mga naibalik na group, fund, campus, at custom field.
:::

## Pag-export ng Datos ng Group

Maaari ka ring mag-export ng listahan ng miyembro para sa mga indibidwal na group. Mula sa **Groups** page, buksan ang isang group at i-click ang **download icon** upang i-export ang listahan ng miyembro ng group na iyon. Tingnan ang [Group Members](../groups/group-members.md) para sa mas maraming detalye.

:::info
Gumagana ang mga na-export na CSV file sa lahat ng pangunahing spreadsheet application, kabilang ang Microsoft Excel, Google Sheets, at Apple Numbers.
:::
