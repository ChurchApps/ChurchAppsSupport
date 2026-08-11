---
title: "Adding People"
---

# Adding People

<div class="article-intro">

Ang People section ay ang foundation ng B1 Admin — ito ang database ng miyembro ng iyong simbahan. Bawat ibang feature (grupo, attendance, donation, form) ay nakabalik sa person record. Ang gabay na ito ay gumagabay sa iyo sa pagdadagdag ng isang tao sa iyong database, pag-edit ng kanilang detalye, at pag-link ng miyembro ng pamilya sa mga household.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan mo ng active B1 Admin account na may pahintulot na pamahalaan ang mga tao. Tingnan ang [Roles & Permissions](roles-permissions.md) kung hindi ka sigurado tungkol sa iyong access level.
- Kung nagdadagdag ka ng maraming tao, isaalang-alang ang paggamit ng [CSV Import](importing-data.md) tool sa halip.

</div>

## Pagdadagdag ng Isang Tao

1. Mag-navigate sa B1.church Admin dashboard.
2. Buksan ang **section menu** sa top-left corner at piliin ang **People**.
3. I-click ang **Add Person** button sa upper right corner.
4. Puno ang unang pangalan, huling pangalan, at email address ng tao, pagkatapos i-click ang **Add**.

Ang profile page ng tao ay bubuksan, handa nang magdagdag ng higit pang detalye.

:::tip
Kung nag-migrate ka mula sa ibang church management system, ang [Import Data](importing-data.md) feature ay nagbibigay-daan sa iyo na magdala ng buong direktoryo mula sa CSV file — mas mabilis kaysa magdagdag ng mga tao nang isa.
:::

## Pag-edit ng Detalye

1. Sa profile page ng tao, i-click ang **edit pencil** sa tabi ng kanilang pangalan.
2. Puno ang karagdagang impormasyon tulad ng middle name, membership status, petsa, address, phone number, at (para sa mga bata at estudyante) grade at school.
3. I-click ang **Save** upang i-store ang personal na impormasyon.

Ang profile ay may kasamang ilang tab para sa kaugnay na impormasyon:

- **Notes** — Magdagdag ng note tungkol sa tao (pastoral care, follow-up, atbp.)
- **Groups** — Tingnan at pamahalaan ang [group membership](../groups/group-members.md)
- **Attendance** — Tingnan ang [attendance record](../attendance/tracking-attendance.md)
- **Donations** — Tingnan ang [donation history](../donations/recording-donations.md)

## Pagtrabaho sa Form

Maaari kang magpuno ng custom form direkta mula sa profile ng isang tao. Ang mga ito ay user-defined form na maaari mong gawin sa pamamagitan ng pagsunod sa [Creating Forms](../forms/creating-forms.md) guide.

1. Sa profile ng tao, i-click ang **Forms** dropdown upang piliin ang isang form.
2. I-click ang **Add Form** upang buksan ito.
3. Puno ang form detail at i-click ang **Save**.

:::info
Ang form na naka-link sa profile ng isang tao ay gumagamit ng **People** form type. Kung kailangan mo ng standalone form (tulad ng event registration), tingnan ang [Stand Alone form option](../forms/creating-forms.md) sa forms guide.
:::

:::tip
Kung kailangan mo lamang mag-track ng isa o dalawang karagdagang piraso ng impormasyon sa mga tao — isang petsa, isang numero, isang yes/no answer — gamitin ang [Custom Fields](../settings/custom-fields.md) sa halip na form. Mas mabilis silang mapuno at makikita sa Advanced Search.
:::

## Pamahalaan ang Household

Ang Household ay nagbibigay-daan sa iyo na ikonekta ang miyembro ng pamilya. Ito ay lalo pang kapaki-pakinabang para sa [check-in](../attendance/check-in.md), kung saan ang magulang ay maaaring mag-check-in ng lahat ng kanilang mga anak nang sabay-sabay.

1. Sa profile ng tao, i-click ang **edit pencil** sa tabi ng pangalan ng household.
2. Ang household editor ay bubuksan. Piliin ang **household role** para sa kasalukuyang tao (halimbawa, Head, Spouse, Child).
3. I-click ang **Add** upang magdagdag ng ibang miyembro ng household.
4. I-type ang pangalan ng tao sa search box at i-click ang **Search**.
5. Kapag lumitaw ang tao sa search result, i-click ang **Select**.
6. Piliin ang kanilang household role at i-click ang **Save** upang tapusin ang household setup.
