---
title: "Pag-export ng Datos"
---

# Pag-export ng Datos

<div class="article-intro">

Hinahayaan ka ng B1 Admin na i-export ang datos ng inyong simbahan para magamit sa mga spreadsheet, maibahagi sa iyong team, o mapanatili bilang backup. Kailangan mo man ng mabilis na listahan ng mga pangalan at email o ng kumpletong export ng database, may mga opsyong akma sa pangangailangan mo.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan mo ng aktibong B1 Admin account na may pahintulot na tingnan ang datos na gusto mong i-export. Tingnan ang [Mga Tungkulin at Pahintulot](roles-permissions.md) kung hindi ka sigurado sa antas ng iyong access.
- Para sa buong export ng database, kailangan mo ng access sa lugar ng **Settings**.

</div>

## Pag-export mula sa Pahina ng People

Ang pinakamabilis na paraan para i-export ang iyong direktoryo ay direkta mula sa pahina ng **People**:

1. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas ng B1 Admin), i-expand ang **People**, at i-click ang **People**.
2. Gamitin ang search bar o mga filter para paliitin ang mga resultang gusto mong i-export (o iwanang walang filter para i-export ang lahat). Tingnan ang [Paghahanap ng mga Tao](searching-people.md) para sa mga tip sa pag-filter.
3. Gamitin ang **column selector** para piliin kung aling mga column ang isasama sa export (halimbawa, Name, Email, Phone, Address).
4. I-click ang button na **Export**.
5. Magda-download sa iyong computer ang isang CSV file na may datos na kasalukuyang ipinapakita sa talahanayan.

:::tip
I-customize ang iyong mga column bago mag-export. Isasama ng CSV file ang eksaktong mga column na nakikita mo, kaya maaari mong iangkop ang export sa pangangailangan mo nang hindi na ine-edit ang file pagkatapos.
:::

## Buong Export ng Datos mula sa Settings

Para sa kumpletong export ng lahat ng iyong datos sa B1 (hindi lang ng mga tao), gamitin ang export tool sa Settings:

1. Sa Jump menu, piliin ang **Settings > Settings**.
2. I-click ang button na **Import/Export** sa kanang itaas ng header ng pahina.
3. Piliin ang **B1 Database** mula sa dropdown na **Data Source**.
4. Suriin ang preview ng datos at i-click ang **Continue to Destination**.
5. Piliin ang **B1 Export Zip** bilang destinasyon ng export.
6. Bantayan ang progreso ng export hanggang sa magkaroon ng berdeng checkmark ang lahat ng item.
7. Awtomatikong made-download ang export file. Hanapin ang file na `B1Export` sa iyong downloads folder.
8. I-unzip ang file para ma-access ang mga indibidwal na CSV file (tulad ng `people.csv`) na mabubuksan mo sa Excel, Google Sheets, o Numbers.

:::info
Kasama sa buong export ng datos ang mga tao, grupo, donasyon, attendance, at iba pa -- lahat ng nasa iyong B1 database. Magandang paraan din ito para gumawa ng pana-panahong backup ng mga talaan ng inyong simbahan.
:::

## Pag-export ng Datos ng Grupo

Maaari mo ring i-export ang mga listahan ng miyembro ng mga indibidwal na grupo. Mula sa pahina ng **Groups**, magbukas ng grupo at i-click ang **icon ng download** para i-export ang listahan ng miyembro ng grupong iyon. Tingnan ang [Mga Miyembro ng Grupo](../groups/group-members.md) para sa karagdagang detalye.

:::info
Gumagana ang mga na-export na CSV file sa lahat ng pangunahing spreadsheet application kasama ang Microsoft Excel, Google Sheets, at Apple Numbers.
:::
