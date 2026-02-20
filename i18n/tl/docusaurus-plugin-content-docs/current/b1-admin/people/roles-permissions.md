---
title: "Pag-assign ng mga Role"
---

# Pag-assign ng mga Role

<div class="article-intro">

Ang B1 Admin ay gumagamit ng role-based na sistema ng pahintulot upang kontrolin kung ano ang makikita at magagawa ng bawat user sa iyong team. Sa pag-assign ng mga role, maaari mong bigyan ang mga staff at volunteer ng access sa eksaktong mga lugar na kailangan nila -- at wala nang iba pa. Ang tamang pamamahala ng role ay nagpapanatiling ligtas sa datos ng iyong simbahan habang binibigyang-kapangyarihan ang iyong team na magtrabaho nang mahusay.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng access na **Domain Admin** o isang role na may pahintulot na pamahalaan ang **Settings** sa B1 Admin.
- Ang mga tao na gusto mong assignan ng mga role ay kailangang umiiral na sa iyong direktoryo. Tingnan ang [Pagdaragdag ng mga Tao](adding-people.md) kung kailangan mo munang idagdag sila.

</div>

## Pag-unawa sa mga Role

Ang role ay isang set ng mga pahintulot na iyong ina-assign sa isa o higit pang mga user. Halimbawa, maaari kang lumikha ng role na "Finance Team" na nagbibigay ng access sa [mga record ng donasyon](../donations/recording-donations.md), o isang role na "Check-In Volunteer" na nagbibigay lamang ng access sa [mga feature ng attendance](../attendance/check-in.md).

Ang bawat role ay kumokontrol ng access sa mga partikular na lugar ng B1 Admin, kabilang ang:

- **People** -- pagtingin at pag-edit ng mga profile ng miyembro
- **Donations** -- pamamahala ng mga kontribusyon at financial report
- **Attendance** -- pagre-record at pagtingin ng datos ng attendance
- **Forms** -- paglikha at pamamahala ng [mga custom form](../forms/creating-forms.md)
- **Groups** -- pamamahala ng [membership sa grupo](../groups/group-members.md) at mga kalendaryo
- **Settings** -- pag-configure ng mga setting ng buong simbahan

:::warning
Ang **Domain Admins** ay may buong access sa bawat lugar ng B1 Admin. Ang kanilang mga pahintulot ay hindi maaaring i-edit o i-restrict. Gamitin ang role na ito para lamang sa iyong mga pangunahing administrator.
:::

## Pagtingin at Pamamahala ng mga Role

1. I-click ang **Settings** sa kaliwang sidebar.
2. I-click ang **Roles** sa itaas na navigation.
3. Makikita mo ang listahan ng lahat ng mga role na na-configure para sa iyong simbahan.
4. I-click ang anumang role upang tingnan ang mga miyembro at pahintulot nito.

## Pagdaragdag ng mga User sa isang Role

1. Mag-navigate sa **Settings** pagkatapos ay **Roles**.
2. I-click ang role kung saan mo gustong magdagdag ng user.
3. Sa seksyon ng **Members**, maghanap ng tao ayon sa pangalan.
4. I-click ang **Add** upang i-assign sila sa role.

Ang user ay magkakaroon ng lahat ng pahintulot na nauugnay sa role na iyon sa susunod na pag-log in nila.

## Pag-edit ng mga Pahintulot ng Role

1. Mag-navigate sa **Settings** pagkatapos ay **Roles**.
2. I-click ang role na gusto mong baguhin.
3. Sa seksyon ng **Permissions**, i-check o i-uncheck ang mga lugar na gusto mong ma-access ng role.
4. I-click ang **Save** upang i-apply ang iyong mga pagbabago.

:::tip
Sundin ang prinsipyo ng least privilege -- bigyan ang bawat role ng mga pahintulot lamang na talagang kailangan nito. Pinapanatili nitong ligtas ang iyong datos at binabawasan ang pagkakataon ng mga aksidenteng pagbabago.
:::

## Mga Karaniwang Halimbawa ng Role

- **Office Staff** -- access sa People, Donations, Attendance, at Forms
- **Group Leaders** -- access lamang sa [Groups](../groups/creating-groups.md)
- **Check-In Volunteers** -- access lamang sa [Attendance](../attendance/check-in.md)
- **Finance Team** -- access sa [Donations](../donations/recording-donations.md) at reporting
