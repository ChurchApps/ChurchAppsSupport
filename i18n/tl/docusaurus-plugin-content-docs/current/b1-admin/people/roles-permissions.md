---
title: "Pagtatalaga ng Mga Role"
---

# Pagtatalaga ng Mga Role

<div class="article-intro">

Gumagamit ang B1 Admin ng sistema ng permiso na nakabatay sa role para kontrolin kung ano ang nakikita at magagawa ng bawat user sa iyong team. Sa pamamagitan ng pagtatalaga ng mga role, mabibigyan mo ang mga staff at boluntaryo ng access sa mga lugar na kailangan nila -- at wala nang higit pa. Ang tamang pamamahala ng role ay nagpapanatiling ligtas ang datos ng iyong simbahan habang pinapagana ang iyong team na magtrabaho nang mahusay.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng **Domain Admin** access o role na may permisong mamahala ng **Settings** sa B1 Admin.
- Dapat nang umiiral sa iyong directory ang mga taong gusto mong bigyan ng role. Tingnan ang [Adding People](adding-people.md) kung kailangan mo pa silang idagdag.

</div>

## Pag-unawa sa Mga Role

Ang role ay set ng mga permiso na itinatalaga mo sa isa o higit pang user. Halimbawa, maaari kang gumawa ng role na "Finance Team" na nagbibigay ng access sa [mga tala ng donasyon](../donations/recording-donations.md), o role na "Check-In Volunteer" na nagpapahintulot lang sa [mga feature ng attendance](../attendance/check-in.md).

Kinokontrol ng bawat role ang access sa partikular na bahagi ng B1 Admin, kabilang ang:

- **People** -- pagtingin at pag-edit ng mga profile ng miyembro. Ang seksyong Notes sa person record ay nangangailangan ng **Edit People**, at hiwalay na permiso na **View Confidential Notes** ang kumokontrol sa access sa seksyong Confidential Notes (para sa pastoral care, personal na kasaysayan, at katulad na sensitibong note). Pinapayagan ng **View People Names Only** ang isang tao na maghanap ng mga tao ayon sa pangalan (nakikita lang ang pangalan, larawan, at membership status) nang walang access sa buong directory. Kasama ng **View Attendance** o **Edit Attendance**, pinapayagan nitong buksan ng isang boluntaryo ang **Groups** at makita ang mga listahan ng klase ayon sa pangalan; sa **Edit Attendance**, maaari rin nilang [i-record ang attendance](../attendance/recording-attendance.md). Tingnan ang [People Names Only](../settings/roles-permissions.md#people-names-only).
- **Donations** -- pamamahala ng mga kontribusyon at financial report. Mas makitid na opsyon ang **Enter Donations** para sa mga counting team: pinapayagan nitong maglagay ng regalo ang isang tao, pero sa [mga batch](../donations/batches.md#who-can-change-a-batch) lang na bukas pa.
- **Attendance** -- pagtatala at pagtingin ng datos ng attendance
- **Forms** -- paggawa at pamamahala ng [mga custom na form](../forms/creating-forms.md)
- **Groups** -- pamamahala ng [membership ng grupo](../groups/group-members.md) at mga calendar
- **Settings** -- pag-configure ng mga setting para sa buong simbahan

:::warning
May buong access ang **Domain Admins** sa bawat bahagi ng B1 Admin. Hindi maaaring i-edit o paghigpitan ang kanilang mga permiso. Gamitin lang ang role na ito para sa pangunahin mong mga administrator.
:::

## Pagtingin at Pamamahala ng Mga Role

1. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas ng B1 Admin) at palawakin ang **Settings**.
2. I-click ang **Roles**.
3. Makikita mo ang listahan ng lahat ng role na naka-configure para sa iyong simbahan, kasama ang column na **Members** na nagpapakita kung ilang user ang nasa bawat role.
4. I-click ang alinmang role para tingnan ang mga miyembro at permiso nito.

## Pagdaragdag ng Mga User sa Isang Role

1. Sa Jump menu, piliin ang **Settings > Roles**.
2. I-click ang role na gusto mong pagdagdagan ng user.
3. Sa seksyong **Members**, hanapin ang tao sa pamamagitan ng pangalan.
4. I-click ang **Add** para italaga siya sa role.

Magkakaroon ang user ng lahat ng permisong kaugnay ng role na iyon sa susunod niyang pag-log in.

## Pag-edit ng Mga Permiso ng Role

1. Sa Jump menu, piliin ang **Settings > Roles**.
2. I-click ang role na gusto mong baguhin.
3. Sa seksyong **Permissions**, lagyan ng check o alisin ang check sa mga bahaging gusto mong maabot ng role. Ipinapakita ng bawat grupo ng permiso kung ilan sa mga permiso nito ang naka-check (halimbawa, **2 of 5**).
4. Nase-save ang bawat pagbabago sa sandaling mag-check o mag-uncheck ka ng kahon.

:::tip
Sundin ang prinsipyo ng least privilege -- bigyan ang bawat role lamang ng mga permisong talagang kailangan nito. Pinapanatiling ligtas nito ang iyong datos at binabawasan ang tsansa ng hindi sinasadyang pagbabago.
:::

## Mga Karaniwang Halimbawa ng Role

- **Office Staff** -- access sa People, Donations, Attendance, at Forms
- **Group Leaders** -- access sa [Groups](../groups/creating-groups.md) lamang
- **Check-In Volunteers** -- ang permiso sa attendance na **Checkin**, na kailangan ng account na naka-sign in sa isang [check-in kiosk](../attendance/check-in.md)
- **Finance Team** -- access sa [Donations](../donations/recording-donations.md) at pag-uulat
- **Counting Team** -- **Enter Donations** at **View Donations**, para makapaglagay ng offering ang mga boluntaryo sa mga bukas na batch nang hindi nakikita ang mga buod ng giving

Tingnan ang [Roles & Permissions](../settings/roles-permissions.md) para sa mas malapitang pagtingin sa mga permiso ng donasyon at tao.
