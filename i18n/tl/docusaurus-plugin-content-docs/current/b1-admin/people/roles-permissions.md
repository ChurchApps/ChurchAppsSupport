---
title: "Pagtatalaga ng mga Role"
---

# Pagtatalaga ng mga Role

<div class="article-intro">

Gumagamit ang B1 Admin ng role-based na sistema ng mga pahintulot (permission) para kontrolin kung ano ang makikita at magagawa ng bawat user sa inyong team. Sa pagtatalaga ng mga role, maibibigay ninyo sa mga staff at volunteer ang access sa mga bahaging kailangan lang nila -- wala nang iba. Ang maayos na pamamahala ng mga role ay nagpapanatiling ligtas ng datos ng inyong simbahan habang natutulungan ang inyong team na magtrabaho nang mahusay.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan ninyo ng **Domain Admin** access o isang role na may pahintulot na mamahala ng **Settings** sa B1 Admin.
- Ang mga taong gusto ninyong bigyan ng role ay dapat nasa inyong directory na. Tingnan ang [Pagdaragdag ng mga Tao](adding-people.md) kung kailangan muna ninyo silang idagdag.

</div>

## Pag-unawa sa mga Role

Ang role ay isang set ng mga pahintulot na itinatalaga ninyo sa isa o higit pang user. Halimbawa, maaari kayong gumawa ng role na "Finance Team" na may access sa [mga talaan ng donasyon](../donations/recording-donations.md), o role na "Check-In Volunteer" na may access lang sa [mga tampok ng attendance](../attendance/check-in.md).

Kinokontrol ng bawat role ang access sa mga partikular na bahagi ng B1 Admin, kabilang ang:

- **People** -- pagtingin at pag-edit ng mga profile ng miyembro. Ang tab na Notes sa talaan ng isang tao ay nangangailangan ng **Edit People**, at hiwalay na pahintulot na **View Confidential Notes** ang kumokontrol sa access sa seksyon ng Confidential Notes (para sa pastoral care, personal na kasaysayan, at iba pang katulad na sensitibong tala).
- **Donations** -- pamamahala ng mga handog at ulat pinansyal
- **Attendance** -- pagrerehistro at pagtingin ng datos ng attendance
- **Forms** -- paggawa at pamamahala ng [mga custom form](../forms/creating-forms.md)
- **Groups** -- pamamahala ng [mga miyembro ng group](../groups/group-members.md) at mga kalendaryo
- **Settings** -- pagko-configure ng mga setting para sa buong simbahan

:::warning
Ang mga **Domain Admin** ay may buong access sa lahat ng bahagi ng B1 Admin. Hindi mae-edit o malilimitahan ang kanilang mga pahintulot. Gamitin lang ang role na ito para sa inyong mga pangunahing administrator.
:::

## Pagtingin at Pamamahala ng mga Role

1. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas ng B1 Admin) at palawakin ang **Settings**.
2. I-click ang **Roles**.
3. Makikita ninyo ang listahan ng lahat ng role na naka-configure para sa inyong simbahan.
4. I-click ang anumang role para makita ang mga miyembro at pahintulot nito.

## Pagdaragdag ng mga User sa isang Role

1. Sa Jump menu, piliin ang **Settings > Roles**.
2. I-click ang role na gusto ninyong pagdagdagan ng user.
3. Sa seksyong **Members**, hanapin ang tao gamit ang pangalan.
4. I-click ang **Add** para italaga siya sa role.

Makukuha na ng user ang lahat ng pahintulot ng role na iyon sa susunod niyang pag-log in.

## Pag-edit ng mga Pahintulot ng Role

1. Sa Jump menu, piliin ang **Settings > Roles**.
2. I-click ang role na gusto ninyong baguhin.
3. Sa seksyong **Permissions**, lagyan o alisan ng check ang mga bahaging gusto ninyong ma-access ng role.
4. I-click ang **Save** para ilapat ang inyong mga pagbabago.

:::tip
Sundin ang prinsipyo ng least privilege -- ibigay lang sa bawat role ang mga pahintulot na talagang kailangan nito. Pinananatili nitong ligtas ang inyong datos at binabawasan ang posibilidad ng hindi sinasadyang mga pagbabago.
:::

## Mga Karaniwang Halimbawa ng Role

- **Office Staff** -- access sa People, Donations, Attendance, at Forms
- **Group Leaders** -- access sa [Groups](../groups/creating-groups.md) lang
- **Check-In Volunteers** -- access sa [Attendance](../attendance/check-in.md) lang
- **Finance Team** -- access sa [Donations](../donations/recording-donations.md) at pag-uulat
