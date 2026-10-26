---
title: "Pagdaragdag ng Tao"
---

# Pagdaragdag ng Tao

<div class="article-intro">

Ang seksyong People ang pundasyon ng B1 Admin — ito ang database ng mga miyembro ng iyong simbahan. Ang bawat ibang feature (groups, attendance, donations, forms) ay nakaugnay sa mga tala ng tao. Ginagabayan ka ng gabay na ito sa pagdaragdag ng isang tao sa iyong database, pag-edit ng kanyang mga detalye, at pag-uugnay ng mga miyembro ng pamilya sa mga household.

</div>

## Training Video

<YouTube id="NTL1UDQpx8s" title="Adding People and Households in B1" next="Importing Your People Database in B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng aktibong B1 Admin account na may pahintulot na pamahalaan ang mga tao. Tingnan ang [Roles & Permissions](roles-permissions.md) kung hindi ka sigurado sa antas ng iyong access.
- Kung magdaragdag ka ng higit sa ilang tao, isaalang-alang ang paggamit ng [CSV Import](importing-data.md) na tool.

</div>

## Pagdaragdag ng Tao

1. Pumunta sa dashboard ng B1.church Admin.
2. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), buksan ang **People**, at i-click ang **People**.
3. I-click ang button na **Add Person** sa header ng pahina. Mag-i-scroll pababa ang pahina sa **Add New Person** form sa ibaba ng directory.
4. Punan ang **First Name**, **Last Name**, at **Email** ng tao, pagkatapos i-click ang **Add**.

Magbubukas ang profile page ng tao, handang lagyan ng higit pang detalye.

:::tip
Kung lilipat ka mula sa ibang church management system, pinapayagan ka ng feature na [Import Data](importing-data.md) na dalhin ang buong directory mo mula sa CSV file — mas mabilis ito kaysa magdagdag ng isa-isang tao.
:::

### Mga Babala sa Duplicate

Kung ang email address (o, kapag gumagawa ng tao mula sa buong Edit form, ang numero ng telepono o tugmang first name + last name + birth date) ay tumutugma sa isang taong nasa iyong database, lalabas ang dialog na **Possible Duplicate** bago mai-save ang bagong tala. Inililista nito ang bawat tugmang tao kasama ang kanyang email, telepono, at birth date para maikumpara mo.

- I-click ang **Use Existing** sa tabi ng isang tugma para gamitin ang tala ng taong iyon sa halip na gumawa ng bago.
- I-click ang **Create Anyway** para idagdag pa rin ang bagong tao kahit may nakitang posibleng tugma.

Sinusuri lamang ang mga duplicate kapag gumagawa ka ng bagong tao — hindi kailanman nagti-trigger ito kapag nag-e-edit ng umiiral na tala. Pinipigilan lamang nito ang mga bagong duplicate; hindi nito pinagsasama ang dalawang tala na umiiral na.

## Pag-edit ng mga Detalye

1. Sa profile page ng tao, i-click ang button na **Edit** sa ibaba ng kanyang contact details sa kaliwa.
2. Sa **Personal Details** form, punan ang karagdagang impormasyon tulad ng middle name, membership status (**Visitor**, **Guest**, **Regular Attendee**, **Member**, **Staff**, **Inactive**, o **Deceased**), mga petsa, address, numero ng telepono, at (para sa mga bata at estudyante) grade at paaralan.
3. I-click ang **Save** para i-store ang personal na impormasyon.

Ipinapakita ng kaliwang bahagi ng profile ang larawan, pangalan, membership status, contact details ng tao, anumang halaga ng [custom field](../settings/custom-fields.md), at ang kanyang household. I-click ang larawan para baguhin ito. Sa ibaba ng button na **Edit** ay may ilan pang aksyon: **Workflow** (idagdag ang tao sa isang [workflow](../serving/workflows.md)), **Merge**, **Export**, at **Export Data**.

Ang natitirang bahagi ng profile ay nagpapakita ng buod para sa bawat uri ng kaugnay na impormasyon:

- **Attendance** — Ipinapakita kung aling mga linggo sa huling ilang linggo ang dinaluhan ng tao at ang kanyang pinakahuling pagbisita. I-click ang **All years** para sa kumpletong kasaysayan ng pagbisita, kasama ang campus, serbisyo, oras ng serbisyo, group, at isang column na **Checked In** na may oras ng kiosk check-in (ipinapakita bilang gitling para sa mga pagbisitang walang kiosk check-in), o **Print** para i-print ito (nasa itaas-gitna ng printout ang logo at pangalan ng iyong simbahan, sa itaas ng pangalan ng tao). Para sa mga trend ng pagdalo sa buong simbahan sa halip na kasaysayan ng isang tao, tingnan ang [Tracking Attendance](../attendance/tracking-attendance.md)
- **Donations** — Ipinapakita ang mga regalo ngayong taon, kasama ang mga regalo sa mga non-deductible na fund. I-click ang **All years** para sa kumpletong [donation history](../donations/recording-donations.md), o ang **Log a gift** para magtala ng bago. Kung in-on ng iyong simbahan ang [Giving Privacy](../settings/church-settings.md#giving-privacy), mananatiling nakatago ang mga halaga hanggang i-click mo ang **Show giving**
- **Groups** — Inililista ang [group memberships](../groups/group-members.md) ng tao
- **Notes** — Ipinapakita ang mga kamakailang tala tungkol sa tao (pastoral care, mga follow-up, atbp.). I-click ang **All notes** para basahin at magdagdag ng mga tala. Ipinapakita ng bawat tala kung sino ang sumulat nito at ang petsa at oras ng pagkakalagay. Para makita ang mga kamakailang tala ng lahat nang sabay-sabay, gamitin ang pahinang [Notes](./notes.md)
- **Forms** — Inililista ang mga form ng tao at kung naisumite na ang bawat isa (tingnan ang [Working with Forms](#working-with-forms) sa ibaba)

Kapag binuksan mo ang isa sa mga buong view na ito, i-click ang link na **Back to** kasama ang pangalan ng tao sa itaas para bumalik sa profile.

## Pag-email sa Isang Tao

Kung may email address ang tao sa talaan, lalabas ang button na **Email** sa ibaba ng kanyang contact details sa kaliwa ng profile.

1. Sa profile ng tao, i-click ang **Email**.
2. Magbubukas ang dialog na **Email** na may pangalan ng tao bilang pamagat, na nagpapakita ng **Sending to** kasama ang address ng tao.
3. Opsyonal na pumili ng nai-save na template mula sa **Load Template (optional)**.
4. Maglagay ng **Subject** at isulat ang mensahe.
5. I-click ang **Send Email**.

Para isulat ang mensahe sa sarili mong mail program, i-click ang **Open in my email app**.

:::info
Ang pagpapadala mula sa B1 ay gumagamit ng parehong approval at pang-araw-araw na limitasyon gaya ng group email. Kung hindi pa naaprubahan ang iyong simbahan, hihilingin ng dialog na humiling ka ng pagrepaso — maaari mo pa ring i-click ang **Open in my email app** sa ngayon. Tingnan ang [Turning On Group Email for Your Church](../groups/group-members.md#turning-on-group-email-for-your-church). Ang mga user na walang pahintulot na mag-edit ng group members ay diretsong pupunta sa kanilang email app kapag na-click ang **Email**.
:::

## Pagtatrabaho sa mga Form

Maaari kang punan ang mga custom form nang direkta mula sa profile ng isang tao. Ito ay mga form na tinukoy ng user na maaari mong buuin sa pamamagitan ng pagsunod sa gabay na [Creating Forms](../forms/creating-forms.md).

1. Sa profile ng tao, hanapin ang seksyong **Forms**. Inililista nito ang bawat form kasama kung na-**Submitted** na ito o **Not submitted**.
2. I-click ang pangalan ng form para buksan ito (o i-click ang **All forms** para makita ang kumpletong listahan).
3. I-click ang **edit icon** (lapis) sa form, punan ang mga detalye, at i-click ang **Save**.

Kapag naisumite na ang isang form, i-click ang **print icon** sa tabi nito para i-print ang mga sagot ng taong iyon.

Kung napunta ang isang submission sa maling tao, i-click ang icon na **Change person** (dalawang arrow) sa tabi nito para ilipat ito sa ibang tao o alisin ang pagkakaugnay nito. Tingnan ang [Changing the Person on a Submission](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Ang mga form na nakaugnay sa profile ng tao ay gumagamit ng uri ng form na **People**. Kung kailangan mo ng hiwalay na form (tulad ng event registration), tingnan ang [Stand Alone form option](../forms/creating-forms.md) sa gabay sa forms.
:::

:::tip
Kung isa o dalawang dagdag na impormasyon lang ang kailangan mong subaybayan sa mga tao — isang petsa, isang numero, o oo/hindi na sagot — gamitin ang [Custom Fields](../settings/custom-fields.md) sa halip na form. Mas mabilis itong punan at maaaring hanapin nang direkta sa Advanced Search.
:::

## Pamamahala ng mga Household {#managing-households}

Pinapayagan ka ng mga household na pagsamahin ang mga miyembro ng pamilya. Lalo itong kapaki-pakinabang para sa [check-in](../attendance/check-in.md), kung saan maaaring i-check in ng magulang ang lahat ng kanyang anak nang sabay-sabay.

1. Sa profile ng isang tao, i-click ang **Edit** sa tabi ng heading na **Household** sa kaliwa.
2. Magbubukas ang household editor. Piliin ang **household role** ng kasalukuyang tao (hal. Head, Spouse, Child, Other).
3. I-click ang icon na **Add** para magdagdag ng isa pang miyembro ng household.
4. Sa ilalim ng **Add Household Member**, i-type ang pangalan ng tao sa search box at pindutin ang **Enter** o i-click ang search icon. (Bago ka mag-type, may maikling listahan ng **Recent people** na ipinapakita.)
5. Kapag lumabas ang tao sa mga resulta, i-click ang kanyang pangalan o ang add icon sa tabi nito.
6. Piliin ang kanyang household role at i-click ang **Save** para tapusin ang pag-set up ng household.
