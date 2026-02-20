---
title: "Pag-import ng Datos"
---

# Pag-import ng Datos

<div class="article-intro">

Pinapadali ng B1 Admin ang pagdadala ng iyong mga kasalukuyang datos ng miyembro sa sistema. Maging nagmi-migrate ka man mula sa ibang church management platform o naglo-load ng mga record mula sa spreadsheet, ang mga import tool ay nagliligtas sa iyo mula sa manu-manong paglalagay ng bawat tao. Maaari kang mag-import mula sa CSV file o mag-migrate nang direkta mula sa Breeze ChMS.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng aktibong B1 Admin account na may access sa **Settings**. Tingnan ang [Mga Role at Pahintulot](roles-permissions.md) kung hindi ka sigurado sa iyong antas ng access.
- Ihanda ang iyong datos ng miyembro sa isang spreadsheet o i-export mula sa iyong nakaraang sistema.
- Kung nagmi-migrate ka mula sa Breeze, siguraduhing na-export mo muna ang iyong People, Tags, at Contributions file mula sa Breeze.

</div>

## Pag-import mula sa CSV

Kung mayroon kang datos ng miyembro sa isang spreadsheet o ibang sistema, maaari mo itong i-import gamit ang CSV (comma-separated values) file.

1. Pumunta sa **Settings** sa kaliwang sidebar.
2. I-click ang **Import/Export** sa itaas na navigation.
3. Piliin ang **B1 Import Zip** mula sa dropdown na **Data Source**.
4. I-click ang link upang **download sample files** para makita mo ang inaasahang format.
5. Buksan ang sample na `people.csv` file at palitan ang sample data ng iyong sarili. Panatilihin ang header row.
6. Kung mayroon kang mga larawan ng miyembro, idagdag ang mga ito sa folder gamit ang 400x300px na mga imahe, at pangalanan ang mga ito upang tumugma sa mga `importKey` number sa iyong CSV.
7. I-compress ang iyong mga na-edit na file sa isang zip file.
8. Bumalik sa B1 Admin, i-click ang **Upload** at piliin ang iyong zip file.
9. Suriin ang data preview at i-click ang **Continue to Destination**.
10. I-verify na ang **B1 Database** ay napili, suriin ang import summary, at i-click ang **Start Transfer**.
11. Hintayin na makumpleto ang import, pagkatapos ay i-click ang **Go to B1** upang bumalik sa iyong dashboard.

:::tip
Palaging i-download at suriin muna ang mga sample file. Ang pagtutugma sa inaasahang format ng column ay maiiwasan ang mga error sa import.
:::

:::warning
Ang pag-import ng datos ay magdadagdag ng mga bagong record sa iyong database. Kung dalawang beses mong i-import ang parehong file, maaari kang magkaroon ng mga duplicate na entry. I-double check ang iyong file bago simulan ang transfer.
:::

## Pag-import mula sa Breeze ChMS

Kung nagmi-migrate ka mula sa Breeze, ang B1 ay may dedikadong opsyon sa import na awtomatikong humahawak ng conversion.

1. Sa Breeze, pumunta sa **Settings** at i-click ang **Export** sa kaliwang sidebar.
2. Mag-export ng tatlong file: **People**, **Tags**, at **Contributions**.
3. Piliin ang lahat ng tatlong na-export na file, i-right-click, at i-compress sa isang zip file.
4. Sa B1 Admin, pumunta sa **Settings** pagkatapos ay **Import/Export**.
5. Piliin ang **Breeze Import Zip** mula sa dropdown na **Data Source**.
6. I-upload ang iyong zip file at sundin ang mga hakbang sa screen upang suriin at kumpletuhin ang import.

:::info
Ang Breeze import ay naglilipat ng mga tao, larawan, grupo, donasyon, attendance, form, at marami pa -- nagbibigay sa iyo ng kumpletong migration sa isang hakbang.
:::

## Pagkatapos Mag-import

Kapag kumpleto na ang iyong import, maglaan ng ilang minuto upang i-verify ang iyong datos:

1. Mag-browse sa pahina ng [People](../people/adding-people.md) at random na suriin ang ilang profile.
2. I-confirm na ang mga pangalan, email, numero ng telepono, at address ay lumabas nang tama.
3. Suriin na ang mga koneksyon ng sambahayan ay buo pa.
4. Suriin ang anumang [mga grupo](../groups/creating-groups.md) o tag na na-import.

Kung may napansin kang mga isyu, maaari kang mag-edit ng mga indibidwal na profile nang direkta mula sa pahina ng People. Maaari mo ring [i-export ang iyong datos](exporting-data.md) anumang oras upang lumikha ng backup.
