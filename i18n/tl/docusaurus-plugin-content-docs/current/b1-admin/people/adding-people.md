---
title: "Pagdaragdag ng mga Tao"
---

# Pagdaragdag ng mga Tao

<div class="article-intro">

Ang seksyong People ang pundasyon ng B1 Admin — ito ang database ng mga miyembro ng inyong simbahan. Ang bawat iba pang tampok (mga grupo, attendance, mga donasyon, mga form) ay konektado sa mga record ng tao. Ginagabayan ka ng gabay na ito sa pagdaragdag ng isang tao sa iyong database, pag-edit ng kanyang mga detalye, at pag-uugnay ng mga miyembro ng pamilya sa mga sambahayan.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan mo ng aktibong B1 Admin account na may pahintulot na pamahalaan ang mga tao. Tingnan ang [Mga Tungkulin at Pahintulot](roles-permissions.md) kung hindi ka sigurado sa antas ng iyong access.
- Kung higit sa ilang tao ang idadagdag mo, isaalang-alang na gamitin na lang ang [CSV Import](importing-data.md).

</div>

## Pagdaragdag ng Isang Tao

1. Pumunta sa dashboard ng B1.church Admin.
2. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), i-expand ang **People**, at i-click ang **People**.
3. I-click ang button na **Add Person** sa header ng page. Mag-i-scroll pababa ang page sa form na **Add New Person** sa ibaba ng directory.
4. Ilagay ang **First Name**, **Last Name**, at **Email** ng tao, pagkatapos ay i-click ang **Add**.

Bubuksan ang profile page ng tao, handa para sa pagdaragdag mo ng iba pang detalye.

:::tip
Kung lilipat ka mula sa ibang church management system, hinahayaan ka ng tampok na [Import Data](importing-data.md) na dalhin ang buong direktoryo mo mula sa isang CSV file — mas mabilis kaysa isa-isang pagdaragdag ng mga tao.
:::

### Mga Babala sa Duplicate

Kung ang email address (o, kapag lumilikha ng tao mula sa buong Edit form, ang numero ng telepono o ang magkatugmang first name + last name + petsa ng kapanganakan) ay tumutugma sa isang taong nasa database mo na, may lalabas na dialog na **Possible Duplicate** bago i-save ang bagong record. Inililista nito ang bawat katugmang tao kasama ang kanyang email, telepono, at petsa ng kapanganakan para maikumpara mo.

- I-click ang **Use Existing** sa tabi ng isang tugma para gamitin ang record ng taong iyon sa halip na lumikha ng bago.
- I-click ang **Create Anyway** para idagdag ang bagong tao kahit may nakitang posibleng tugma.

Sinusuri lang nito ang mga duplicate kapag lumilikha ka ng ganap na bagong tao — hindi ito kailanman na-trigger sa pag-edit ng umiiral na record. Pinipigilan lang nito ang mga bagong duplicate; hindi nito pinagsasama ang dalawang record na umiiral na.

## Pag-edit ng mga Detalye

1. Sa profile page ng tao, i-click ang button na **Edit** sa ibaba ng kanyang contact details sa kaliwa.
2. Sa form na **Personal Details**, ilagay ang karagdagang impormasyon tulad ng middle name, katayuan ng pagiging miyembro (**Visitor**, **Guest**, **Regular Attendee**, **Member**, **Staff**, **Inactive**, o **Deceased**), mga petsa, address, mga numero ng telepono, at (para sa mga bata at estudyante) grade at paaralan.
3. I-click ang **Save** para i-store ang personal na impormasyon.

Makikita sa kaliwang bahagi ng profile ang larawan, pangalan, katayuan ng pagiging miyembro, contact details, anumang value ng [custom field](../settings/custom-fields.md), at sambahayan ng tao. I-click ang larawan para palitan ito. Sa ibaba ng button na **Edit** ay may ilan pang aksyon: **Workflow** (idagdag ang tao sa isang [workflow](../serving/workflows.md)), **Merge**, **Export**, at **Export Data**.

Ang natitira sa profile ay nagpapakita ng buod para sa bawat uri ng kaugnay na impormasyon:

- **Attendance** — Ipinapakita kung aling mga linggo sa huling ilang linggo ang dinaluhan ng tao at ang kanyang pinakahuling pagdalo. I-click ang **All years** para sa buong kasaysayan ng pagdalo niya, kasama ang campus, serbisyo, oras ng serbisyo, grupo, at isang column na **Checked In** na may oras ng kiosk check-in (ipinapakita bilang gitling para sa mga pagdalong na-record nang walang kiosk check-in), o **Print** para i-print ito. Para sa mga trend ng buong simbahan sa halip na kasaysayan ng isang tao, tingnan ang [Pagsubaybay ng Attendance](../attendance/tracking-attendance.md)
- **Donations** — Ipinapakita ang mga handog ngayong taon. I-click ang **All years** para sa buong [kasaysayan ng donasyon](../donations/recording-donations.md), o ang **Log a gift** para magtala ng bago
- **Groups** — Nakalista ang [pagiging miyembro sa mga grupo](../groups/group-members.md) ng tao
- **Notes** — Ipinapakita ang mga kamakailang tala tungkol sa tao (pastoral care, follow-up, atbp.). I-click ang **All notes** para basahin at magdagdag ng mga tala
- **Forms** — Nakalista ang mga form ng tao at kung naisumite na ang bawat isa (tingnan ang [Pagtatrabaho sa mga Form](#pagtatrabaho-sa-mga-form) sa ibaba)

Kapag binuksan ninyo ang isa sa mga buong view na ito, i-click ang link na **Back to** kasama ang pangalan ng tao sa itaas para bumalik sa profile.

## Pag-email sa Isang Tao

Kung may email address na nakatala ang tao, may lalabas na button na **Email** sa ibaba ng kanyang contact details sa kaliwa ng profile.

1. Sa profile ng tao, i-click ang **Email**.
2. Magbubukas ang dialog na **Email** na may pangalan ng tao bilang pamagat, na nagpapakita ng **Sending to** kasama ang address ng tao.
3. Opsyonal, pumili ng naka-save na template mula sa **Load Template (optional)**.
4. Maglagay ng **Subject** at isulat ang mensahe.
5. I-click ang **Send Email**.

Para isulat ang mensahe sa sarili mong mail program, i-click ang **Open in my email app**.

:::info
Ang pagpapadala mula sa B1 ay gumagamit ng parehong pag-apruba at pang-araw-araw na limitasyon gaya ng group email. Kung hindi pa naaprubahan ang inyong simbahan, hihilingin ng dialog na humiling ka ng review — maaari mo pa ring i-click ang **Open in my email app** sa pansamantala. Tingnan ang [Pag-on ng Group Email para sa Inyong Simbahan](../groups/group-members.md#turning-on-group-email-for-your-church). Ang mga user na walang pahintulot na mag-edit ng mga miyembro ng grupo ay direktang mapupunta sa kanilang email app kapag nag-click sila sa **Email**.
:::

## Pagtatrabaho sa mga Form {#working-with-forms}

Maaari kang mag-fill out ng mga custom na form direkta mula sa profile ng isang tao. Ito ay mga form na tinukoy ng user na maaari mong buuin sa pamamagitan ng pagsunod sa gabay na [Paglikha ng mga Form](../forms/creating-forms.md).

1. Sa profile ng tao, hanapin ang seksyong **Forms**. Nakalista roon ang bawat form kasama kung ito ay **Submitted** o **Not submitted**.
2. I-click ang pangalan ng isang form para buksan ito (o i-click ang **All forms** para makita ang buong listahan).
3. I-click ang **edit icon** (lapis) sa form, punan ang mga detalye, at i-click ang **Save**.

Kapag naisumite na ang form, i-click ang **icon ng print** sa tabi nito para i-print ang mga sagot ng taong iyon.

Kung napunta ang isang submission sa maling tao, i-click ang icon na **Change person** (dalawang arrow) sa tabi nito para ilipat ito sa iba o tanggalin ang pagkakaugnay. Tingnan ang [Pagpapalit ng Tao sa isang Submission](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Ang mga form na nakaugnay sa profile ng isang tao ay gumagamit ng uri ng form na **People**. Kung kailangan mo ng standalone na form (tulad ng rehistrasyon sa event), tingnan ang [opsyong Stand Alone form](../forms/creating-forms.md) sa gabay sa mga form.
:::

:::tip
Kung isa o dalawang karagdagang impormasyon lang ang kailangan mong subaybayan sa mga tao — isang petsa, isang numero, isang sagot na oo/hindi — gamitin ang [Custom Fields](../settings/custom-fields.md) sa halip na form. Mas mabilis itong punan at direkta itong mahahanap sa Advanced Search.
:::

## Pamamahala ng mga Sambahayan

Hinahayaan ka ng mga sambahayan na iugnay ang mga miyembro ng pamilya. Lalo itong kapaki-pakinabang sa [check-in](../attendance/check-in.md), kung saan maaaring i-check in ng magulang ang lahat ng kanyang anak nang sabay-sabay.

1. Sa profile ng isang tao, i-click ang **Edit** sa tabi ng heading na **Household** sa kaliwa.
2. Magbubukas ang household editor. Piliin ang **tungkulin sa sambahayan** ng kasalukuyang tao (hal., Head, Spouse, Child, Other).
3. I-click ang **Add** icon para magdagdag ng isa pang miyembro ng sambahayan.
4. Sa ilalim ng **Add Household Member**, i-type ang pangalan ng tao sa search box at pindutin ang **Enter** o i-click ang search icon. (Bago kayo mag-type, may maikling listahan ng **Recent people** na ipinapakita.)
5. Kapag lumabas ang tao sa mga resulta, i-click ang kanyang pangalan o ang add icon sa tabi nito.
6. Piliin ang kanyang tungkulin sa sambahayan at i-click ang **Save** para makumpleto ang setup ng sambahayan.
