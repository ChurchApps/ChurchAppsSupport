---
title: "Pagtatalaga ng Tungkulin"
---

# Pagtatalaga ng Tungkulin

<div class="article-intro">

Gumagamit ang B1 Admin ng sistema ng pahintulot na nakabatay sa tungkulin para kontrolin kung ano ang nakikita at magagawa ng bawat user sa iyong team. Sa pagtatalaga ng mga tungkulin, mabibigyan mo ang mga staff at boluntaryo ng access sa eksaktong mga lugar na kailangan nila — at wala nang higit pa. Ang maayos na pamamahala ng tungkulin ay nagpapanatiling ligtas ang datos ng iyong simbahan habang pinapagana ang iyong team na magtrabaho nang mahusay.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng **Domain Admin** na access o tungkuling may pahintulot na pamahalaan ang **Settings** sa B1 Admin.
- Ang mga taong gusto mong bigyan ng tungkulin ay dapat nang nasa iyong directory. Tingnan ang [Adding People](adding-people.md) kung kailangan mo pa silang idagdag.

</div>

## Pag-unawa sa mga Tungkulin

Ang tungkulin ay hanay ng mga pahintulot na itinatalaga mo sa isa o higit pang user. Halimbawa, maaari kang gumawa ng tungkuling "Finance Team" na nagbibigay ng access sa [mga tala ng donasyon](../donations/recording-donations.md), o tungkuling "Check-In Volunteer" na nagpapahintulot lamang sa [mga feature ng attendance](../attendance/check-in.md).

Kinokontrol ng bawat tungkulin ang access sa mga partikular na lugar ng B1 Admin, kabilang ang:

- **People** -- pagtingin at pag-e-edit ng mga profile ng miyembro. Kailangan ng seksyong Notes sa tala ng tao ang **Edit People**, at kinokontrol ng hiwalay na pahintulot na **View Confidential Notes** ang access sa seksyong Confidential Notes (para sa pastoral care, personal na kasaysayan, at katulad na sensitibong tala). Pinapayagan ng **View People Names Only** ang isang tao na maghanap ng mga tao sa pamamagitan ng pangalan (nakikita lamang ang pangalan, larawan, at membership status) nang hindi nakikita ang buong directory. Kasama ng **View Attendance** o **Edit Attendance**, pinapayagan nito ang isang boluntaryo na buksan ang **Groups** at makita ang mga class roster ayon sa pangalan; sa **Edit Attendance**, maaari rin nilang [itala ang attendance](../attendance/recording-attendance.md). Tingnan ang [People Names Only](../settings/roles-permissions.md#people-names-only).
- **Donations** -- pamamahala ng mga kontribusyon at ulat pinansyal. Ang **Enter Donations** ay mas makitid na opsyon para sa mga counting team: pinapayagan nitong maglagay ng regalo ang isang tao, pero sa mga [batch](../donations/batches.md#who-can-change-a-batch) lamang na bukas pa.
- **Attendance** -- pagtatala at pagtingin sa datos ng attendance
- **Forms** -- paggawa at pamamahala ng [custom forms](../forms/creating-forms.md)
- **Groups** -- pamamahala ng [group memberships](../groups/group-members.md) at calendars
- **Settings** -- pag-configure ng mga setting para sa buong simbahan

:::warning
May buong access ang **Domain Admins** sa bawat lugar ng B1 Admin. Hindi maaaring i-edit o paghigpitan ang kanilang mga pahintulot. Gamitin lamang ang tungkuling ito para sa iyong mga pangunahing administrador.
:::

## Pagtingin at Pamamahala ng mga Tungkulin

1. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas ng B1 Admin) at buksan ang **Settings**.
2. I-click ang **Roles**.
3. Makikita mo ang listahan ng lahat ng tungkuling naka-configure para sa iyong simbahan, na may column na **Members** na nagpapakita kung ilan ang user sa bawat tungkulin.
4. I-click ang anumang tungkulin para makita ang mga miyembro at pahintulot nito.

## Pagdaragdag ng mga User sa Tungkulin

1. Sa Jump menu, piliin ang **Settings > Roles**.
2. I-click ang tungkuling gusto mong idagdagan ng user.
3. Sa seksyong **Members**, hanapin ang tao ayon sa pangalan.
4. I-click ang **Add** para italaga siya sa tungkulin.

Taglay na ng user ang lahat ng pahintulot na kaugnay ng tungkuling iyon sa susunod niyang pag-log in.

## Pag-e-edit ng mga Pahintulot ng Tungkulin

1. Sa Jump menu, piliin ang **Settings > Roles**.
2. I-click ang tungkuling gusto mong baguhin.
3. Sa seksyong **Permissions**, lagyan o alisin ang check ng mga lugar na gusto mong pag-access ng tungkulin. Ipinapakita ng bawat pangkat ng pahintulot kung ilan sa mga pahintulot nito ang naka-check (halimbawa, **2 of 5**).
4. Agad na nase-save ang bawat pagbabago kapag naglagay o nag-alis ka ng check sa isang kahon.

:::tip
Sundin ang prinsipyo ng least privilege — bigyan ang bawat tungkulin ng mga pahintulot na talagang kailangan lamang nito. Pinapanatili nitong ligtas ang iyong datos at binabawasan ang posibilidad ng hindi sinasadyang pagbabago.
:::

## Karaniwang Halimbawa ng Tungkulin

- **Office Staff** -- access sa People, Donations, Attendance, at Forms
- **Group Leaders** -- access sa [Groups](../groups/creating-groups.md) lamang
- **Check-In Volunteers** -- access sa [Attendance](../attendance/check-in.md) lamang
- **Finance Team** -- access sa [Donations](../donations/recording-donations.md) at pag-uulat
- **Counting Team** -- **Enter Donations** at **View Donations**, para makapaglagay ang mga boluntaryo ng handog sa mga bukas na batch nang hindi nakikita ang mga buod ng giving

Tingnan ang [Roles & Permissions](../settings/roles-permissions.md) para sa mas malapitang pagtingin sa mga pahintulot sa donasyon at tao.
