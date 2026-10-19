---
title: "Pagtatalaga ng mga Role"
---

# Pagtatalaga ng mga Role

<div class="article-intro">

Gumagamit ang B1 Admin ng role-based na sistema ng mga permission para kontrolin kung ano ang makikita at magagawa ng bawat user sa inyong team. Sa pagtatalaga ng mga role, maibibigay ninyo sa mga staff at volunteer ang access sa mga bahaging kailangan lang nila -- wala nang iba. Ang maayos na pamamahala ng mga role ay nagpapanatiling ligtas ng datos ng inyong simbahan habang natutulungan ang inyong team na magtrabaho nang mahusay.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan ninyo ng **Domain Admin** access o isang role na may permission na mamahala ng **Settings** sa B1 Admin.
- Ang mga taong gusto ninyong bigyan ng role ay dapat nasa inyong directory na. Tingnan ang [Pagdaragdag ng mga Tao](adding-people.md) kung kailangan muna ninyo silang idagdag.

</div>

## Pag-unawa sa mga Role

Ang role ay isang set ng mga permission na itinatalaga ninyo sa isa o higit pang user. Halimbawa, maaari kayong gumawa ng role na "Finance Team" na may access sa [mga talaan ng donasyon](../donations/recording-donations.md), o role na "Check-In Volunteer" na may access lang sa [mga feature ng attendance](../attendance/check-in.md).

Kinokontrol ng bawat role ang access sa mga partikular na bahagi ng B1 Admin, kabilang ang:

- **People** -- pagtingin at pag-edit ng mga profile ng miyembro. Ang seksyong Notes sa record ng isang tao ay nangangailangan ng **Edit People**, at hiwalay na permission na **View Confidential Notes** ang kumokontrol sa access sa seksyong Confidential Notes (para sa pastoral care, personal na kasaysayan, at iba pang katulad na sensitibong tala). Pinapayagan ng **View People Names Only** ang isang tao na maghanap ng mga tao ayon sa pangalan (nakikita lang ang pangalan, larawan, at membership status) nang walang access sa buong directory.
- **Donations** -- pamamahala ng mga handog at financial report. Ang **Enter Donations** ay mas makitid na opsyon para sa mga counting team: pinapayagan nitong maglagay ng handog ang isang tao, pero sa mga [batch](../donations/batches.md#who-can-change-a-batch) lang na bukas pa.
- **Attendance** -- pagtatala at pagtingin ng datos ng attendance
- **Forms** -- paggawa at pamamahala ng [mga custom form](../forms/creating-forms.md)
- **Groups** -- pamamahala ng [mga membership ng group](../groups/group-members.md) at mga kalendaryo
- **Settings** -- pag-configure ng mga setting ng buong simbahan

:::warning
Ang **Domain Admin** ay may buong access sa bawat bahagi ng B1 Admin. Hindi maaaring i-edit o higpitan ang kanilang mga permission. Gamitin lang ang role na ito para sa mga pangunahin ninyong administrator.
:::

## Pagtingin at Pamamahala ng mga Role

1. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas ng B1 Admin) at i-expand ang **Settings**.
2. I-click ang **Roles**.
3. Makikita ninyo ang listahan ng lahat ng role na naka-configure para sa inyong simbahan.
4. I-click ang anumang role para tingnan ang mga miyembro at permission nito.

## Pagdagdag ng mga User sa Role

1. Sa Jump menu, piliin ang **Settings > Roles**.
2. I-click ang role na gusto ninyong dagdagan ng user.
3. Sa seksyong **Members**, hanapin ang tao sa pamamagitan ng pangalan.
4. I-click ang **Add** para italaga siya sa role.

Magkakaroon na ng lahat ng permission na kaugnay ng role na iyon ang user sa susunod niyang pag-login.

## Pag-edit ng mga Permission ng Role

1. Sa Jump menu, piliin ang **Settings > Roles**.
2. I-click ang role na gusto ninyong baguhin.
3. Sa seksyong **Permissions**, lagyan ng check o alisin ang check sa mga bahaging gusto ninyong maabot ng role.
4. I-click ang **Save** para ilapat ang mga pagbabago.

:::tip
Sundin ang prinsipyo ng least privilege -- bigyan ang bawat role ng mga permission lang na talagang kailangan nito. Pinapanatili nitong ligtas ang inyong datos at binabawasan ang tsansang may aksidenteng pagbabago.
:::

## Mga Karaniwang Halimbawa ng Role

- **Office Staff** -- access sa People, Donations, Attendance, at Forms
- **Group Leaders** -- access sa [Groups](../groups/creating-groups.md) lang
- **Check-In Volunteers** -- access sa [Attendance](../attendance/check-in.md) lang
- **Finance Team** -- access sa [Donations](../donations/recording-donations.md) at reporting
- **Counting Team** -- **Enter Donations** at **View Donations**, para makapaglagay ng handog ang mga volunteer sa mga bukas na batch nang hindi nakikita ang mga buod ng giving

Tingnan ang [Roles & Permissions](../settings/roles-permissions.md) para sa mas malalim na pagtingin sa mga permission ng donasyon at tao.
