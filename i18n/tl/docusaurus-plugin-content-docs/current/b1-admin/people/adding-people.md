---
title: "Pagdagdag ng mga Tao"
---

# Pagdagdag ng mga Tao

<div class="article-intro">

Ang seksyong People ang pundasyon ng B1 Admin -- ito ang database ng mga miyembro ng iyong simbahan. Ang bawat ibang feature (group, attendance, donasyon, forms) ay nakaugnay sa mga person record. Gagabayan ka ng gabay na ito sa pagdagdag ng isang tao sa iyong database, pag-edit ng kanyang mga detalye, at pag-uugnay ng mga miyembro ng pamilya sa mga household.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng aktibong B1 Admin account na may permission na pamahalaan ang mga tao. Tingnan ang [Roles & Permissions](roles-permissions.md) kung hindi ka sigurado sa iyong antas ng access.
- Kung magdadagdag ka ng higit sa ilang tao, isaalang-alang ang paggamit ng [CSV Import](importing-data.md) na tool sa halip.

</div>

## Pagdagdag ng Tao

1. Pumunta sa B1.church Admin dashboard.
2. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), i-expand ang **People**, at i-click ang **People**.
3. I-click ang **Add Person** button sa header ng pahina. Mag-i-scroll pababa ang pahina sa **Add New Person** form sa ilalim ng directory.
4. Punan ang **First Name**, **Last Name**, at **Email** ng tao, pagkatapos i-click ang **Add**.

Magbubukas ang profile page ng tao, handa para sa karagdagang detalye.

:::tip
Kung lilipat ka mula sa ibang church management system, pinapayagan ka ng [Import Data](importing-data.md) feature na i-import ang buong directory mo mula sa CSV file -- mas mabilis ito kaysa magdagdag ng isa-isang tao.
:::

### Mga Babala sa Duplicate

Kung ang email address (o, kapag gumagawa ng tao mula sa buong Edit form, ang phone number o tugmang first name + last name + birth date) ay tumutugma sa isang taong nasa iyong database, lalabas ang dialog na **Possible Duplicate** bago ma-save ang bagong record. Inililista nito ang bawat tugmang tao kasama ang kanyang email, telepono, at birth date upang maikumpara mo.

- I-click ang **Use Existing** sa tabi ng isang tugma upang gamitin ang record ng taong iyon sa halip na gumawa ng bago.
- I-click ang **Create Anyway** upang idagdag pa rin ang bagong tao kahit may nahanap na posibleng tugma.

Tumitingin lamang ito ng duplicate kapag gumagawa ka ng bagong tao -- hindi ito nag-tri-trigger kapag nag-e-edit ng umiiral na record. Pinipigilan lamang nito ang bagong duplicate; hindi nito pinagsasama ang dalawang record na umiiral na.

## Pag-edit ng Detalye

1. Sa profile page ng tao, i-click ang **Edit** button sa ilalim ng kanyang contact details sa kaliwa.
2. Sa **Personal Details** form, punan ang karagdagang impormasyon gaya ng middle name, membership status (**Visitor**, **Guest**, **Regular Attendee**, **Member**, **Staff**, **Inactive**, o **Deceased**), mga petsa, address, numero ng telepono, at (para sa mga bata at estudyante) grade at school.
3. I-click ang **Save** upang maitabi ang personal na impormasyon.

Ipinapakita ng kaliwang bahagi ng profile ang larawan, pangalan, membership status, contact details, anumang halaga ng [custom field](../settings/custom-fields.md), at household ng tao. I-click ang larawan upang baguhin ito. Sa ibaba ng **Edit** button ay ilan pang aksyon: **Workflow** (idagdag ang tao sa isang [workflow](../serving/workflows.md)), **Merge**, **Export**, at **Export Data**.

Ang natitirang bahagi ng profile ay nagpapakita ng buod para sa bawat uri ng kaugnay na impormasyon:

- **Attendance** -- Ipinapakita kung aling mga linggo sa huling ilang linggo ang dinaluhan ng tao at ang kanyang pinakabagong pagbisita. I-click ang **All years** para sa kanyang buong kasaysayan ng pagbisita, kasama ang campus, service, service time, group, at isang **Checked In** column na may oras ng kiosk check-in (ipinapakitang dash para sa mga pagbisitang naitala nang walang kiosk check-in), o i-click ang **Print** upang i-print ito. Para sa mga trend ng buong simbahan sa halip na kasaysayan ng iisang tao, tingnan ang [Tracking Attendance](../attendance/tracking-attendance.md)
- **Donations** -- Ipinapakita ang mga regalo ngayong taon, kasama ang mga regalo sa mga non-deductible na fund. I-click ang **All years** para sa buong [donation history](../donations/recording-donations.md) niya, o **Log a gift** upang magtala ng bago. Kung in-on ng iyong simbahan ang [Giving Privacy](../settings/church-settings.md#giving-privacy), mananatiling nakatago ang mga halaga hanggang i-click mo ang **Show giving**
- **Groups** -- Inililista ang [group memberships](../groups/group-members.md) ng tao
- **Notes** -- Ipinapakita ang mga kamakailang tala tungkol sa tao (pastoral care, follow-up, atbp.). I-click ang **All notes** upang basahin at magdagdag ng tala
- **Forms** -- Inililista ang mga form ng tao at kung naisumite na ang bawat isa (tingnan ang [Working with Forms](#working-with-forms) sa ibaba)

Kapag binuksan mo ang alinman sa mga buong view na ito, i-click ang link na **Back to** kasama ang pangalan ng tao sa itaas upang bumalik sa profile.

## Pag-email sa Isang Tao

Kung may email address ang tao sa record, lalabas ang **Email** button sa ilalim ng kanyang contact details sa kaliwa ng profile.

1. Sa profile ng tao, i-click ang **Email**.
2. Magbubukas ang **Email** dialog na may pangalan ng tao bilang pamagat, na nagpapakita ng **Sending to** kasama ang address ng tao.
3. Opsyonal na pumili ng naka-save na template mula sa **Load Template (optional)**.
4. Maglagay ng **Subject** at isulat ang mensahe.
5. I-click ang **Send Email**.

Upang isulat ang mensahe sa sarili mong mail program sa halip, i-click ang **Open in my email app**.

:::info
Ang pagpapadala mula sa B1 ay gumagamit ng parehong approval at araw-araw na limitasyon ng group email. Kung hindi pa naaaprubahan ang iyong simbahan, hihilingin sa iyo ng dialog na humiling ng review -- maaari mo pa ring i-click ang **Open in my email app** sa ngayon. Tingnan ang [Turning On Group Email for Your Church](../groups/group-members.md#turning-on-group-email-for-your-church). Ang mga user na walang permission na mag-edit ng miyembro ng group ay direktang mapupunta sa kanilang email app kapag na-click nila ang **Email**.
:::

## Pakikitungo sa Forms

Maaari mong sagutan nang direkta mula sa profile ng tao ang mga custom na form. Ito ay mga user-defined na form na maaari mong gawin sa pamamagitan ng pagsunod sa gabay na [Creating Forms](../forms/creating-forms.md).

1. Sa profile ng tao, hanapin ang seksyong **Forms**. Inililista nito ang bawat form kasama kung ito ay **Submitted** o **Not submitted**.
2. I-click ang pangalan ng form upang buksan ito (o i-click ang **All forms** upang makita ang buong listahan).
3. I-click ang **edit icon** (lapis) sa form, punan ang mga detalye, at i-click ang **Save**.

Kapag naisumite na ang isang form, i-click ang **print icon** sa tabi nito upang i-print ang mga sagot ng taong iyon.

Kung napunta sa maling tao ang isang submission, i-click ang **Change person** icon (dalawang arrow) sa tabi nito upang ilipat ito sa ibang tao o i-unlink. Tingnan ang [Changing the Person on a Submission](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Ang mga form na naka-link sa profile ng tao ay gumagamit ng **People** form type. Kung kailangan mo ng standalone na form (gaya ng event registration), tingnan ang [Stand Alone form option](../forms/creating-forms.md) sa gabay sa forms.
:::

:::tip
Kung kailangan mo lamang subaybayan ang isa o dalawang dagdag na impormasyon tungkol sa mga tao -- isang petsa, isang numero, o oo/hindi na sagot -- gamitin ang [Custom Fields](../settings/custom-fields.md) sa halip na form. Mas mabilis itong sagutan at maaaring hanapin nang direkta sa Advanced Search.
:::

## Pamamahala ng Mga Household

Hinahayaan ka ng Household na pag-ugnayin ang mga miyembro ng pamilya. Lalo itong kapaki-pakinabang para sa [check-in](../attendance/check-in.md), kung saan maaaring i-check in ng magulang ang lahat ng kanyang anak nang sabay-sabay.

1. Sa profile ng isang tao, i-click ang **Edit** sa tabi ng heading na **Household** sa kaliwa.
2. Magbubukas ang household editor. Piliin ang **household role** para sa kasalukuyang tao (hal., Head, Spouse, Child, Other).
3. I-click ang **Add** icon upang magdagdag ng isa pang miyembro ng household.
4. Sa ilalim ng **Add Household Member**, i-type ang pangalan ng tao sa search box at pindutin ang **Enter** o i-click ang search icon. (Bago ka mag-type, may maikling listahan ng **Recent people** na ipinapakita.)
5. Kapag lumitaw ang tao sa mga resulta, i-click ang kanyang pangalan o ang add icon sa tabi nito.
6. Piliin ang kanyang household role at i-click ang **Save** upang makumpleto ang setup ng household.
