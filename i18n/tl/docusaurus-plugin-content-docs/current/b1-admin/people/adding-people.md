---
title: "Pagdaragdag ng Tao"
description: "Magdagdag ng tao sa database ng simbahan sa B1 Admin, punan ang detalye, at i-link ang miyembro ng pamilya sa household para sa check-in at report."
---

# Pagdaragdag ng Tao

<div class="article-intro">

Ang seksyong People ang pundasyon ng B1 Admin -- ito ang database ng mga miyembro ng iyong simbahan. Lahat ng iba pang feature (grupo, attendance, donasyon, form) ay nakakabit sa mga person record. Gagabayan ka ng gabay na ito sa pagdaragdag ng isang tao sa iyong database, pag-edit ng kanyang mga detalye, at pag-link ng mga miyembro ng pamilya sa mga household.

</div>

## Training Video

<YouTube id="NTL1UDQpx8s" title="Adding People and Households in B1" next="Importing Your People Database in B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng aktibong B1 Admin account na may permiso sa pamamahala ng mga tao. Tingnan ang [Roles & Permissions](roles-permissions.md) kung hindi ka sigurado sa antas ng iyong access.
- Kung magdaragdag ka ng higit sa ilang tao, isaalang-alang ang paggamit ng [CSV Import](importing-data.md) tool sa halip.

</div>

## Pagdaragdag ng Tao

1. Pumunta sa B1.church Admin dashboard.
2. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), palawakin ang **People**, at i-click ang **People**.
3. I-click ang butones na **Add Person** sa header ng pahina. Mag-i-scroll pababa ang pahina sa form na **Add New Person** sa ilalim ng directory.
4. Punan ang **First Name**, **Last Name**, at **Email** ng tao, pagkatapos i-click ang **Add**.

Bubukas ang profile page ng tao, handa para sa pagdaragdag pa ng mga detalye.

:::tip
Kung manggagaling ka sa ibang church management system, pinapayagan ka ng feature na [Import Data](importing-data.md) na i-import ang buong directory mo mula sa CSV file -- mas mabilis ito kaysa isa-isang pagdaragdag ng tao.
:::

### Mga Babala sa Duplicate

Kung ang email address (o, kapag gumagawa ng tao mula sa buong Edit form, ang phone number o tugmang first name + last name + birth date) ay tumutugma sa isang taong nasa iyong database na, lalabas ang dialog na **Possible Duplicate** bago ma-save ang bagong record. Inililista nito ang bawat tugmang tao kasama ang kanyang email, telepono, at birth date para maikumpara mo.

- I-click ang **Use Existing** sa tabi ng tugma para gamitin ang record ng taong iyon sa halip na gumawa ng bago.
- I-click ang **Create Anyway** para idagdag ang bagong tao kahit may nakitang posibleng tugma.

Sinusuri lang ang duplicate kapag gumagawa ka ng bagong tao -- hindi ito lumalabas kapag nag-e-edit ng umiiral nang record. Pinipigilan lang nito ang mga bagong duplicate; hindi nito pinagsasama ang dalawang record na umiiral na.

## Pag-edit ng Mga Detalye {#editing-details}

1. Sa profile page ng tao, i-click ang butones na **Edit** sa ilalim ng kanyang contact details sa kaliwa.
2. Sa form na **Personal Details**, punan ang karagdagang impormasyon gaya ng **Title** (pumili ng Mr, Mrs, Miss, Ms, Dr, Prof, Rev, o Pastor mula sa listahan, o mag-type ng sarili mo, hanggang 10 character), middle name, membership status (**Visitor**, **Guest**, **Regular Attendee**, **Member**, **Staff**, **Inactive**, o **Deceased**), mga petsa, address, numero ng telepono, at (para sa mga bata at estudyante) grade at paaralan.
3. I-click ang **Save** para i-store ang personal na impormasyon.

Ipinapakita ng kaliwang bahagi ng profile ang larawan, pangalan, membership status, contact details, anumang halaga ng [custom field](../settings/custom-fields.md), at household ng tao. Sa ilalim ng household, ipinapakita ng **Added** ang petsa kung kailan ginawa ang record (para lang sa mga taong naidagdag mula huling bahagi ng Oktubre 2026). I-click ang larawan para baguhin ito. Sa ilalim ng butones na **Edit** ay ilan pang aksyon: **Workflow** (idagdag ang tao sa isang [workflow](../serving/workflows.md)), **Merge**, **Export**, at **Export Data**.

Ang natitira sa profile ay nagpapakita ng buod na seksyon para sa bawat uri ng kaugnay na impormasyon:

- **Attendance** -- Ipinapakita kung aling mga linggo sa nakaraang ilang linggo ang dinaluhan ng tao at ang kanyang pinakahuling pagbisita. I-click ang **All years** para sa buong kasaysayan ng kanyang pagbisita, kabilang ang campus, serbisyo, oras ng serbisyo, grupo, at column na **Checked In** na may oras ng pag-check in sa kiosk (ipinapakitang gitling para sa mga pagbisitang naitala nang walang check-in sa kiosk), o **Print** para i-print ito (may logo at pangalan ng iyong simbahan sa gitna sa itaas ng printout, sa itaas ng pangalan ng tao). Para sa mga trend ng buong simbahan sa halip na kasaysayan ng isang tao, tingnan ang [Tracking Attendance](../attendance/tracking-attendance.md)
- **Donations** -- Ipinapakita ang mga regalo ngayong taon, kabilang ang mga regalo sa mga fund na hindi ma-deduct. I-click ang **All years** para sa buong [kasaysayan ng donasyon](../donations/recording-donations.md), o **Log a gift** para magtala ng bago. Kung in-on ng iyong simbahan ang [Giving Privacy](../settings/church-settings.md#giving-privacy), mananatiling nakatago ang mga halaga hanggang i-click mo ang **Show giving**
- **Groups** -- Inililista ang [mga membership sa grupo](../groups/group-members.md) ng tao, kasama ang **Joined** at ang petsa ng pagsali sa bawat grupo kapag nakatala ito
- **Notes** -- Ipinapakita ang mga kamakailang note tungkol sa tao (pastoral care, follow-up, atbp.). I-click ang **All notes** para basahin at magdagdag ng note. Ipinapakita ng bawat note kung sino ang sumulat nito at ang petsa at oras ng pag-post. Para makita ang mga kamakailang note ng lahat nang sabay-sabay, gamitin ang pahinang [Notes](./notes.md)
- **Forms** -- Inililista ang mga form ng tao at kung naisumite na ang bawat isa (tingnan ang [Working with Forms](#working-with-forms) sa ibaba)

Kapag binuksan mo ang isa sa mga buong view na ito, i-click ang link na **Back to** kasama ang pangalan ng tao sa itaas para bumalik sa profile.

## Pag-email sa Isang Tao

Kung may nakatalang email address ang tao, lalabas ang butones na **Email** sa ilalim ng kanyang contact details sa kaliwa ng profile.

1. Sa profile ng tao, i-click ang **Email**.
2. Magbubukas ang dialog na **Email** na may pangalan ng tao bilang pamagat, na nagpapakita ng **Sending to** kasama ang address ng tao.
3. Opsyonal na pumili ng naka-save na template mula sa **Load Template (optional)**.
4. Maglagay ng **Subject** at sumulat ng mensahe.
5. I-click ang **Send Email**.

Para isulat ang mensahe sa sarili mong mail program sa halip, i-click ang **Open in my email app**.

:::info
Ang pagpapadala mula sa B1 ay gumagamit ng parehong approval at araw-araw na limitasyon gaya ng group email. Kung hindi pa naaaprubahan ang iyong simbahan, hihilingin ng dialog na humiling ka ng review -- maaari mo pa ring i-click ang **Open in my email app** sa pagitan ng panahon. Tingnan ang [Turning On Group Email for Your Church](../groups/group-members.md#turning-on-group-email-for-your-church). Ang mga user na walang permiso sa pag-edit ng mga miyembro ng grupo ay didiretso sa kanilang email app kapag nag-click sila ng **Email**.
:::

## Pagtatrabaho sa Mga Form {#working-with-forms}

Maaari kang sumagot ng mga custom na form nang direkta mula sa profile ng isang tao. Ito ay mga user-defined na form na maaari mong buuin sa pamamagitan ng pagsunod sa gabay na [Creating Forms](../forms/creating-forms.md).

1. Sa profile ng tao, hanapin ang seksyong **Forms**. Inililista nito ang bawat form kasama ang kung ito ay **Submitted** o **Not submitted**.
2. I-click ang pangalan ng form para buksan ito (o i-click ang **All forms** para makita ang buong listahan).
3. I-click ang **edit icon** (lapis) sa form, punan ang mga detalye, at i-click ang **Save**.

Kapag naisumite na ang isang form, i-click ang **print icon** sa tabi nito para i-print ang mga sagot ng taong iyon. Kapag isang beses lang nagsumite ng form ang tao, ipinapakita ng form ang **Submitted** kasama ang petsa sa itaas ng mga sagot.

Kung napunta ang isang submission sa maling tao, i-click ang icon na **Change person** (dalawang arrow) sa tabi nito para ilipat ito sa iba o alisin ang link nito. Tingnan ang [Changing the Person on a Submission](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Ang mga form na naka-link sa profile ng tao ay gumagamit ng uring **People** form. Kung kailangan mo ng hiwalay na form (gaya ng event registration), tingnan ang [Stand Alone form option](../forms/creating-forms.md) sa gabay sa forms.
:::

:::tip
Kung isa o dalawang dagdag na piraso lang ng impormasyon ang kailangan mong subaybayan sa mga tao -- isang petsa, numero, o oo/hindi na sagot -- gamitin ang [Custom Fields](../settings/custom-fields.md) sa halip na form. Mas mabilis itong punan at maaaring hanapin direkta sa Advanced Search.
:::

## Pamamahala ng Mga Household {#managing-households}

Pinapayagan ka ng mga household na i-link nang sama-sama ang mga miyembro ng pamilya. Lalo itong kapaki-pakinabang para sa [check-in](../attendance/check-in.md), kung saan maaaring i-check in ng isang magulang ang lahat ng kanyang mga anak nang sabay.

1. Sa profile ng isang tao, i-click ang **Edit** sa tabi ng heading na **Household** sa kaliwa.
2. Magbubukas ang household editor. Piliin ang **household role** ng kasalukuyang tao (halimbawa, Head, Spouse, Child, Other).
3. I-click ang **Add** icon para magdagdag ng isa pang miyembro ng household.
4. Sa ilalim ng **Add Household Member**, i-type ang pangalan ng tao sa search box at pindutin ang **Enter** o i-click ang search icon. (Bago ka mag-type, may maikling listahan ng **Recent people** na ipinapakita.)
5. Kapag lumitaw na ang tao sa mga resulta, i-click ang kanyang pangalan o ang add icon sa tabi nito.
6. Piliin ang kanyang household role at i-click ang **Save** para tapusin ang setup ng household.
