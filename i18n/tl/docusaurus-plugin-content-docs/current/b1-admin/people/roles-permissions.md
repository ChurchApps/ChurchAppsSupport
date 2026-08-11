---
title: "Assigning Roles"
---

# Assigning Roles

<div class="article-intro">

Ang B1 Admin ay gumagamit ng role-based permission system upang kontrolin kung ano ang makikita at makagawa ng bawat user sa iyong team. Sa pamamagitan ng pag-assign ng mga role, maaari kang magbigay ng staff at volunteer access sa eksaktong area na kailangan nila -- at wala nang iba. Ang tamang role management ay nagpapanatili ng iyong church data na secure habang nag-empower sa iyong team na magtrabaho nang episyoso.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan mo ng **Domain Admin** access o isang role na may pahintulot na pamahalaan ang **Settings** sa B1 Admin.
- Ang mga taong gusto mong italagang mga role ay dapat na mayroon nang sa iyong direktoryo. Tingnan ang [Adding People](adding-people.md) kung kailangan mong magdagdag sa kanila muna.

</div>

## Pag-unawa sa Mga Role

Ang role ay isang hanay ng pahintulot na iyong italagang sa isa o maraming user. Halimbawa, maaari kang lumikha ng "Finance Team" role na nagbibigay ng access sa [donation record](../donations/recording-donations.md), o isang "Check-In Volunteer" role na nagbibigay-daan lamang sa access sa [attendance feature](../attendance/check-in.md).

Bawat role ay kumokontrol ng access sa specific na area ng B1 Admin, kasama ang:

- **People** -- pagtingin at pag-edit ng profile ng miyembro. Ang Notes tab sa isang person record ay nangangailangan ng **Edit People**, at isang hiwalay na **View Confidential Notes** permission ay kumokontrol ng access sa Confidential Notes section (para sa pastoral care, personal history, at katulad na sensitive note).
- **Donations** -- pamamalaan ang kontribusyon at financial report
- **Attendance** -- pag-record at pagtingin ng attendance data
- **Forms** -- lumilikha at pamamalaan ang [custom form](../forms/creating-forms.md)
- **Groups** -- pamamalaan ang [group membership](../groups/group-members.md) at kalendaryo
- **Settings** -- pag-configure ng church-wide setting

:::warning
Ang **Domain Admin** ay may buong access sa bawat area ng B1 Admin. Ang kanilang pahintulot ay hindi maaaring i-edit o bawalain. Gamitin ang role na ito lamang para sa iyong pangunahing administrator.
:::

## Pagtingin at Pamahalaan ang Mga Role

1. Buksan ang **section menu** sa top-left corner (ang pangalan ng section na may maliit na arrow) at piliin ang **Settings**.
2. I-click ang **Roles** sa top navigation.
3. Makikita mo ang isang listahan ng lahat ng role na naka-configure para sa iyong simbahan.
4. I-click ang anumang role upang tingnan ang miyembro nito at pahintulot.

## Pagdadagdag ng User sa isang Role

1. Mag-navigate sa **Settings** pagkatapos **Roles**.
2. I-click ang role na gusto mong magdagdag ng user.
3. Sa **Members** section, maghanap ng tao ayon sa pangalan.
4. I-click ang **Add** upang italagang sila sa role.

Ang user ay magkakaroon na ng lahat ng pahintulot na nauugnay sa role na iyon sa susunod na pagkakataon na sila ay mag-log in.

## Pag-edit ng Role Permission

1. Mag-navigate sa **Settings** pagkatapos **Roles**.
2. I-click ang role na gusto mong baguhin.
3. Sa **Permissions** section, i-check o i-uncheck ang area na gusto mo ang access ng role.
4. I-click ang **Save** upang ilapat ang iyong mga pagbabago.

:::tip
Sundin ang prinsipyo ng least privilege -- bigyan ang bawat role lamang ng pahintulot na tunay na kailangan nito. Ito ay nagpapanatili ng iyong data na secure at binabawasan ang pagkakataon ng accidental na pagbabago.
:::

## Karaniwang Role na Halimbawa

- **Office Staff** -- access sa People, Donations, Attendance, at Forms
- **Group Leader** -- access lamang sa [Groups](../groups/creating-groups.md)
- **Check-In Volunteer** -- access lamang sa [Attendance](../attendance/check-in.md)
- **Finance Team** -- access sa [Donations](../donations/recording-donations.md) at pag-report
