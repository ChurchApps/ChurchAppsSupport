---
title: "Pagtatalaga ng mga Role"
description: "Magtalaga ng mga role sa B1 Admin para bigyan ang staff at mga volunteer ng access lamang sa mga lugar ng tao, donasyon, attendance, at grupo na kailangan nila."
---

# Pagtatalaga ng mga Role

<div class="article-intro">

Gumagamit ang B1 Admin ng sistema ng pahintulot na nakabatay sa role para kontrolin kung ano ang makikita at magagawa ng bawat user sa iyong team. Sa pagtatalaga ng mga role, mabibigyan mo ng access ang staff at mga volunteer sa eksaktong mga lugar na kailangan nila -- at wala nang iba. Ang maayos na pamamahala ng role ay nagpapanatiling ligtas ang datos ng iyong simbahan habang pinapagana ang iyong team na magtrabaho nang mahusay.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng **Domain Admin** access o isang role na may pahintulot na mamahala ng **Settings** sa B1 Admin.
- Dapat umiiral na sa iyong directory ang mga taong gusto mong bigyan ng role. Tingnan ang [Adding People](adding-people.md) kung kailangan mo muna silang idagdag.

</div>

## Pag-unawa sa mga Role {#understanding-roles}

Ang role ay set ng mga pahintulot na itinatalaga mo sa isa o higit pang user. Halimbawa, maaari kang gumawa ng role na "Finance Team" na nagbibigay ng access sa [mga talaan ng donasyon](../donations/recording-donations.md), o role na "Check-In Volunteer" na nagpapahintulot lang sa [mga feature ng attendance](../attendance/check-in.md).

Kinokontrol ng bawat role ang access sa mga partikular na lugar ng B1 Admin, kabilang ang:

- **People** -- pagtingin at pag-edit ng mga profile ng miyembro. Kailangan ng seksyong Notes sa record ng tao ang **Edit People**, at may hiwalay na pahintulot na **View Confidential Notes** na kumokontrol sa access sa seksyong Confidential Notes (para sa pastoral care, personal na kasaysayan, at katulad na sensitibong note). Hinahayaan ng **View People Names Only** ang isang tao na maghanap ng mga tao ayon sa pangalan (nakikita lang ang pangalan, larawan, at membership status) nang walang access sa buong directory. Kasama ang **View Attendance** o **Edit Attendance**, pinapayagan nitong buksan ng isang volunteer ang **Groups** at makita ang mga class roster ayon sa pangalan; sa **Edit Attendance**, maaari rin nilang [itala ang attendance](../attendance/recording-attendance.md). Tingnan ang [People Names Only](../settings/roles-permissions.md#people-names-only).
- **Donations** -- pamamahala ng mga kontribusyon at financial report. Ang **Enter Donations** ay mas makitid na opsyon para sa mga counting team: pinapayagan nitong maglagay ang isang tao ng mga regalo, pero tanging sa [mga batch](../donations/batches.md#who-can-change-a-batch) na bukas pa.
- **Attendance** -- pagtatala at pagtingin ng datos ng attendance
- **Forms** -- paggawa at pamamahala ng [custom na form](../forms/creating-forms.md)
- **Groups** -- pamamahala ng [membership sa grupo](../groups/group-members.md) at mga kalendaryo
- **Settings** -- pag-configure ng mga setting ng buong simbahan

:::warning
Ang **Domain Admin** ay may buong access sa bawat lugar ng B1 Admin. Hindi maaaring i-edit o limitahan ang kanilang mga pahintulot. Gamitin lang ang role na ito para sa iyong mga pangunahing administrator.
:::

## Pagtingin at Pamamahala ng mga Role {#viewing-and-managing-roles}

1. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas ng B1 Admin) at buksan ang **Settings**.
2. I-click ang **Roles**.
3. Makikita mo ang listahan ng lahat ng role na naka-configure para sa iyong simbahan, na may column na **Members** na nagpapakita kung ilang user ang nasa bawat role. Nalalapat ang role na **(Everyone)** sa lahat ng user.
4. I-click ang alinmang role para tingnan ang mga miyembro at pahintulot nito.

## Pagdaragdag ng mga User sa Role {#adding-users-to-a-role}

1. Sa Jump menu, piliin ang **Settings > Roles**.
2. I-click ang role na gusto mong pagdagdagan ng user.
3. Sa seksyong **Members**, i-click ang **Add**.
4. Maghanap ng tao ayon sa pangalan (o piliin sila mula sa **Recent people**), pagkatapos ay i-click ang kanilang pangalan o ang add icon sa tabi nito. Idinadagdag sila sa role kaagad.

Mayroon na ngayong lahat ng pahintulot na kaugnay ng role na iyon ang user sa susunod nilang pag-log in.

## Pag-edit ng mga Pahintulot ng Role {#editing-role-permissions}

1. Sa Jump menu, piliin ang **Settings > Roles**.
2. I-click ang role na gusto mong baguhin.
3. Sa seksyong **Edit Permissions**, buksan ang isang pangkat ng pahintulot (gaya ng **People and Groups**, **Donations**, o **Attendance**) at lagyan ng check o alisan ng check ang mga pahintulot na gusto mong magkaroon ang role. Ipinapakita ng bawat pangkat kung ilan sa mga pahintulot nito ang naka-check (halimbawa, **2 of 5**). Mag-type sa **Filter permissions** para hanapin ang pahintulot ayon sa pangalan.
4. Agad na nase-save ang bawat pagbabago kapag nag-check o nag-uncheck ka ng kahon.

:::tip
Sundin ang prinsipyo ng least privilege -- bigyan ang bawat role ng mga pahintulot lamang na talagang kailangan nito. Pinapanatiling ligtas nito ang iyong datos at binabawasan ang tsansa ng hindi sinasadyang pagbabago.
:::

## Mga Karaniwang Halimbawa ng Role {#common-role-examples}

- **Office Staff** -- access sa People, Donations, Attendance, at Forms
- **Group Leaders** -- access sa [Groups](../groups/creating-groups.md) lamang
- **Check-In Volunteers** -- ang pahintulot na **Checkin** sa attendance, na kailangan ng account na naka-sign in sa isang [check-in kiosk](../attendance/check-in.md)
- **Finance Team** -- access sa [Donations](../donations/recording-donations.md) at pag-uulat
- **Counting Team** -- **Enter Donations** at **View Donations**, para makapaglagay ang mga volunteer ng handog sa mga bukas na batch nang hindi nakikita ang mga buod ng giving

Tingnan ang [Roles & Permissions](../settings/roles-permissions.md) para sa mas malapitang pagtingin sa mga pahintulot sa donasyon at tao.
