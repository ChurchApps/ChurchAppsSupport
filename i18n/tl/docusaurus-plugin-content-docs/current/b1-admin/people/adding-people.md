---
title: "Pagdaragdag ng mga Tao"
description: "Magdagdag ng tao sa database ng iyong simbahan sa B1 Admin, punan ang kanilang mga detalye, at i-link ang mga miyembro ng pamilya sa mga household para sa check-in at pag-uulat."
---

# Pagdaragdag ng mga Tao {#adding-people}

<div class="article-intro">

Ang seksyong People ang pundasyon ng B1 Admin — ito ang database ng mga miyembro ng iyong simbahan. Nakaugnay sa mga record ng tao ang bawat ibang feature (grupo, attendance, donasyon, form). Gagabayan ka ng gabay na ito sa pagdaragdag ng isang tao sa iyong database, pag-edit ng kanilang mga detalye, at pag-uugnay ng mga miyembro ng pamilya sa mga household.

</div>

## Training Video {#training-video}

<YouTube id="GtsczJ8JPio" title="Pagdaragdag ng mga Tao at Household sa B1" next="Pag-import ng Iyong Database ng mga Tao sa B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng aktibong B1 Admin account na may pahintulot na mamahala ng mga tao. Tingnan ang [Roles & Permissions](roles-permissions.md) kung hindi ka sigurado sa antas ng access mo.
- Kung magdaragdag ka ng higit sa ilang tao, isaalang-alang ang paggamit ng [CSV Import](importing-data.md) na tool.

</div>

## Pagdaragdag ng Tao {#adding-a-person}

1. Pumunta sa B1.church Admin dashboard.
2. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), palawakin ang **People**, at i-click ang **People**.
3. I-click ang button na **Add Person** sa header ng pahina. Mag-i-scroll pababa ang pahina sa form na **Add a New Person** sa ilalim ng directory.
4. Punan ang **First Name** at **Last Name** ng tao (parehong kailangan). Opsyonal na magdagdag ng **Title**, **Email**, at **Mobile Phone**, pagkatapos ay i-click ang **Add** (o pindutin ang **Enter**).

Gagawa ang B1 ng bagong household para sa tao, na ipinangalan sa kanilang apelyido.

Bubukas ang profile page ng tao, handa para sa karagdagang detalye.

:::tip
Kung lilipat ka mula sa ibang church management system, hinahayaan ka ng feature na [Import Data](importing-data.md) na dalhin ang buong directory mo mula sa CSV file — mas mabilis ito kaysa magdagdag ng isa-isang tao.
:::

### Mga Babala sa Duplicate {#duplicate-warnings}

Kapag naglagay ka ng email address sa form na **Add a New Person**, tinitingnan ng B1 ang mga duplicate bago i-save. Kung tumutugma ang email address (o, kapag gumagawa ng tao mula sa buong Edit form, ang phone number o tugmang first name + last name + birth date) sa taong nasa database mo na, lalabas ang dialog na **Possible Duplicate** bago i-save ang bagong record. Inililista nito ang bawat tumutugmang tao kasama ang kanilang email, telepono, at birth date para maikumpara mo.

- I-click ang **Use Existing** sa tabi ng isang tumutugma para gamitin ang record ng taong iyon sa halip na gumawa ng bago.
- I-click ang **Create Anyway** para idagdag ang bagong tao kahit may nakitang posibleng tumutugma.

Tanging kapag gumagawa ka ng ganap na bagong tao lang tinitingnan ang mga duplicate — hindi kailanman nati-trigger ito ng pag-edit ng umiiral na record. Pinipigilan lang nito ang mga bagong duplicate; hindi nito pinagsasama ang dalawang record na umiiral na.

## Pag-edit ng mga Detalye {#editing-details}

1. Sa profile page ng tao, i-click ang button na **Edit** sa kaliwa, sa ilalim ng seksyong **Household**.
2. Sa form na **Personal Details**, punan ang karagdagang impormasyon gaya ng **Title** (pumili ng Mr, Mrs, Miss, Ms, Dr, Prof, Rev, o Pastor mula sa listahan, o mag-type ng sarili mo, hanggang 10 character), middle name, nickname, **Name Tag Notes** (ipinapa-print sa name tag ng check-in at ipinapakita bilang tag ng babala sa profile), **Donor Number**, membership status (**Visitor**, **Guest**, **Regular Attendee**, **Member**, **Staff**, **Inactive**, o **Deceased**), kasarian, marital status, birth date at anibersaryo, campus, address, mga numero ng telepono na may extension, at (para sa mga bata at estudyante) grade at paaralan. Lagyan ng check ang **Hide me from the member directory** para hindi isama ang tao sa [naka-print na directory](./print-directory.md) at sa member directory ng app. Lalabas sa ilalim ng **Custom Fields** ang anumang [custom field](../settings/custom-fields.md).
3. I-click ang **Save** para itago ang personal na impormasyon, o **Cancel** para isara ang form nang hindi nagse-save.

Kapag binago mo ang address ng isang taong may kasamang ibang tao sa household, tatanungin ka ng B1 kung gagamitin ang bagong address para sa buong household. May button na **Delete** ang form (para burahin ang tao) at seksyong **Data Management** para mag-export o mag-anonymize ng datos ng tao (tingnan ang [Data Security](../settings/data-security.md#using-the-data-management-tools)).

Ipinapakita ng kaliwang bahagi ng profile ang larawan ng tao, pangalan, edad, kasarian, marital status, campus, membership status, detalye ng contact, anumang halaga ng [custom field](../settings/custom-fields.md), at ang kanilang household. Ipinapakita ng mga tag sa ilalim ng pangalan kung ang tao ay **Has login** (may B1 account), **Hidden from directory**, o may name tag notes. Sa itaas ng household, ipinapakita ng **Added** ang petsa ng paggawa ng record (para lang sa mga taong idinagdag mula huling bahagi ng Oktubre 2026). I-click ang larawan para baguhin ito. Sa ilalim ng household ay ang mga button na **Edit**, **Email**, at **Text** (tingnan sa ibaba) at ilan pang aksyon: **Workflow** (idagdag ang tao sa isang [workflow](../serving/workflows.md)), **Merge**, **Export**, at **Export Data**. Kung kabilang ang tao sa isang household, nakalista sa seksyong **Pickup** ang mga taong pinapayagang kumuha ng mga bata sa [check-in](../attendance/checkin-safety.md#trusted-and-not-authorized-pickup-people).

Ang natitirang bahagi ng profile ay nagpapakita ng buod na seksyon para sa bawat uri ng kaugnay na impormasyon:

- **Attendance** — Ipinapakita kung aling mga linggo sa huling ilang linggo ang dinaluhan ng tao at ang kanilang mga pinakabagong pagbisita. I-click ang **All years** para sa kumpletong kasaysayan ng pagbisita, kasama ang campus, service, service time, grupo, at column na **Checked In** na may oras ng kiosk check-in (ipinapakitang dash para sa mga pagbisitang naitala nang walang kiosk check-in), o **Print** para i-print ito (may logo at pangalan ng iyong simbahan sa gitna sa itaas ng printout, sa itaas ng pangalan ng tao). Para sa mga trend ng buong simbahan sa halip na kasaysayan ng isang tao, tingnan ang [Tracking Attendance](../attendance/tracking-attendance.md)
- **Donations** — Ipinapakita ang mga regalo ngayong taon, kasama ang mga regalo sa mga pondong hindi tax-deductible. I-click ang **All years** para sa kumpletong [kasaysayan ng donasyon](../donations/recording-donations.md), o **Log a gift** para magtala ng bago. Kung ini-on ng iyong simbahan ang [Giving Privacy](../settings/church-settings.md#giving-privacy), mananatiling nakatago ang mga halaga hanggang i-click mo ang **Show giving**
- **Groups** — Inililista ang [membership sa grupo](../groups/group-members.md) ng tao, na may **Joined** at ang petsa ng pagsali sa bawat grupo kapag nakatala ito
- **Notes** — Ipinapakita ang mga kamakailang note tungkol sa tao (pastoral care, follow-up, atbp.). I-click ang **All notes** para basahin at magdagdag ng mga note. Ipinapakita ng bawat note kung sino ang sumulat nito at ang petsa at oras ng pag-post. Para i-format ang note, i-click ang loob ng note box -- lalabas sa ilalim nito ang hanay ng mga button na **Bold**, **Italic**, **Bulleted list**, at **Numbered list** habang nakapili ang box -- pagkatapos ay i-highlight ang teksto at i-click ang button (o pindutin ang **Ctrl+B** / **Ctrl+I**, **Cmd** sa Mac). Sa loob ng listahan, ang pagpindot sa **Enter** ay nagsisimula ng susunod na bullet o numero; ang pagpindot sa **Enter** sa walang lamang item ay nagtatapos sa listahan. Ipinapakita ng note ang formatting, kasama ang mga bullet at numero nito, pagkatapos i-post. Kapag binura ang isang note, hihingi muna ng kumpirmasyon dahil hindi na ito maibabalik. Para makita ang mga kamakailang note para sa lahat nang sabay-sabay, gamitin ang pahinang [Notes](./notes.md)
- **Forms** — Inililista ang mga form ng tao at kung naisumite na ang bawat isa (tingnan ang [Working with Forms](#working-with-forms) sa ibaba)
- **Requests & registrations** — Inililista ang mga [kahilingan sa event](../calendars/approvals.md) ng tao para sa kuwarto at resource (kasama ang paglalarawan na ibinigay nila, ang mga kuwarto o resource na hiniling, at **Pending**, **Approved**, o **Rejected**) at ang kanilang [mga event registration](../calendars/paid-registrations.md) (kasama ang bilang ng taong nirehistro nila at **Registered**, **Pending**, **Waitlisted**, o **Cancelled**), pinakabago muna. Ang limang pinakabago ang ipinapakita; i-click ang **All requests** para sa buong listahan. Makikita mo ang mga kahilingan sa event kung kaya mong gamitin ang pahinang [Approvals](../calendars/approvals.md), at ang mga registration kung kaya mong tingnan ang mga registration; kapag wala sa dalawa, nakatago ang seksyon

Kapag binuksan mo ang isa sa mga buong view na ito, i-click ang link na **Back to** kasama ang pangalan ng tao sa itaas para bumalik sa profile.

## Pag-email sa Isang Tao {#emailing-a-person}

Kung may email address na nakatala ang tao, lalabas ang button na **Email** sa tabi ng **Edit**, sa ilalim ng household sa kaliwa ng profile.

1. Sa profile ng tao, i-click ang **Email**.
2. Magbubukas ang dialog na **Email** na may pangalan ng tao bilang pamagat, na nagpapakita ng **Sending to** kasama ang address ng tao.
3. Opsyonal na pumili ng nakasave na template mula sa **Load Template (optional)**.
4. Maglagay ng **Subject** at isulat ang mensahe.
5. I-click ang **Send Email**.

Para isulat ang mensahe sa sarili mong mail program sa halip, i-click ang **Open in my email app**.

:::info
Ang pagpapadala mula sa B1 ay gumagamit ng parehong approval at araw-araw na limitasyon gaya ng group email. Kung hindi pa naaprubahan ang iyong simbahan, hihilingin ng dialog na humingi ka ng review — maaari mo pa ring i-click ang **Open in my email app** sa ngayon. Tingnan ang [Turning On Group Email for Your Church](../groups/group-members.md#turning-on-group-email-for-your-church). Ang mga user na walang pahintulot na mag-edit ng group member ay dumidiretso sa kanilang email app kapag na-click nila ang **Email**.
:::

## Pag-text sa Isang Tao {#texting-a-person}

Kung nakakonekta ang iyong simbahan sa isang [texting provider](../settings/church-settings.md#texting), may pahintulot kang magpadala ng text, at may mobile phone number ang tao, lalabas ang button na **Text** sa tabi ng **Email**. I-click ito, i-type ang iyong **Message**, at i-click ang **Send**. Ipinapakita ng dialog ang numerong padadalhan ng text. Tingnan ang [Texting Group Members](../groups/group-members.md#texting-group-members) para sa kung paano gumagana ang texting.

## Pagtatrabaho sa mga Form {#working-with-forms}

Puwede mong punan ang mga custom na form nang direkta mula sa profile ng tao. Mga form na ginawa ng user ang mga ito na maaari mong buuin sa pamamagitan ng gabay na [Creating Forms](../forms/creating-forms.md).

1. Sa profile ng tao, hanapin ang seksyong **Forms**. Inililista nito ang bawat form kasama ang kung ito ay **Submitted** o **Not submitted**.
2. I-click ang pangalan ng form para buksan ito (o i-click ang **All forms** para makita ang buong listahan).
3. I-click ang **edit icon** (lapis) sa form, punan ang mga detalye, at i-click ang **Save**.

Kapag naisumite na ang form, i-click ang **print icon** sa tabi nito para i-print ang mga sagot na napunan ng taong iyon. Kapag iisa lang ang submission ng tao para sa isang form, ipinapakita ng form ang **Submitted** kasama ang petsa sa itaas ng mga sagot.

Kung napunta ang isang submission sa maling tao, i-click ang icon na **Change person** (dalawang arrow) sa tabi nito para ilipat ito sa iba o i-unlink. Tingnan ang [Changing the Person on a Submission](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Ang mga form na naka-link sa profile ng isang tao ay gumagamit ng uring form na **People**. Kung kailangan mo ng hiwalay na form (gaya ng event registration), tingnan ang [Stand Alone form option](../forms/creating-forms.md) sa gabay ng forms.
:::

:::tip
Kung isa o dalawang dagdag na impormasyon lang ang kailangan mong subaybayan sa mga tao — petsa, numero, o oo/hindi na sagot — gamitin ang [Custom Fields](../settings/custom-fields.md) sa halip na form. Mas mabilis itong punan at direktang mahahanap sa Advanced Search.
:::

## Pamamahala ng mga Household {#managing-households}

Hinahayaan ka ng mga household na i-link nang magkakasama ang mga miyembro ng pamilya. Lalo itong kapaki-pakinabang para sa [check-in](../attendance/check-in.md), kung saan maaaring i-check in ng magulang ang lahat ng kanyang anak nang sabay-sabay.

1. Sa profile ng isang tao, i-click ang **Edit** sa tabi ng heading na **Household** sa kaliwa.
2. Magbubukas ang household editor. Piliin ang **household role** ng kasalukuyang tao (hal., Head, Spouse, Child, Other).
3. I-click ang **Add** icon para magdagdag ng isa pang miyembro ng household.
4. Sa ilalim ng **Add Household Member**, i-type ang pangalan ng tao sa search box at pindutin ang **Enter** o i-click ang search icon. (Bago ka mag-type, may maikling listahan ng **Recent people** — ang mga taong pinili mo kamakailan sa anumang person search, pagkatapos ang pinakabagong mga tao sa B1.)
5. Kapag lumabas ang tao sa mga resulta, i-click ang pangalan nila o ang add icon sa tabi nito.
6. Piliin ang household role nila at i-click ang **Save** para tapusin ang setup ng household.

Kung wala pa sa B1 ang tao, i-click ang **Add New Person** sa ilalim ng search. Kasama ng pangalan, title, email, at mobile phone, hihingin ng dialog ang kanilang **Household Role** (Head, Spouse, Child, o Other). Gagawin ang bagong tao at ilalagay sa household na ito na may role na iyon; i-click ang **Save** para tapusin.
