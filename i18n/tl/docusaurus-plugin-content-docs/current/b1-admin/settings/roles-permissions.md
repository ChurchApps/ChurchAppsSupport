---
title: "Mga Role at Permiso"
description: "I-set up ang mga role sa B1 Admin para kontrolin kung ano ang nakikita at mababago ng mga staff at volunteer, mula sa donasyon at attendance hanggang sa mga tao at grupo."
---

# Mga Role at Permiso

<div class="article-intro">

Hinahayaan ka ng mga role na kontrolin kung ano ang maaaring ma-access ng iba't ibang user sa loob ng iyong ChurchApps account. Maaari kang gumawa ng custom na role para sa mga staff, volunteer, at iba pang miyembro ng team, bawat isa ay may sariling antas ng access para mapanatiling ligtas ang iyong datos.

</div>

## Training Video {#training-video}

<YouTube id="ZzCIkinVMnE" title="Mga Role, Permiso, at Pag-imbita sa Iyong Team sa B1" next="Pag-set Up ng Services at Attendance sa B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng Domain Admin access o isang role na may permiso para mamahala ng mga role
- Magkaroon ng listahan ng mga miyembro ng team at ng mga lugar na kailangan nilang ma-access
- Suriin ang mga available na kategorya ng permiso sa ibaba para mapagplanuhan ang iyong mga role

</div>

## Pag-access sa Mga Role {#accessing-roles}

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa itaas-kaliwa) at palawakin ang **Settings**.
2. I-click ang **Roles**.
3. Ipinapakita ng pahinang Roles ang lahat ng kasalukuyang nakadefine na role ng iyong simbahan. Ipinapakita ng column na **Members** kung ilang user ang nasa bawat role, at ipinapakita ng row na **(Everyone)** ang **All users**.

## Paggawa ng Role {#creating-a-role}

I-click ang **Add role** sa itaas ng pahinang Roles. Nag-aalok ang menu ng:

- **Add Custom Role** -- Nagbubukas ng form na **Edit Role** sa itaas ng listahan. Maglagay ng **Role Name** at i-click ang **Save**. Walang permiso sa simula ang bagong role.
- **Add "Accounting" Role**, **Add "Church Staff" Role**, **Add "Content Admin" Role**, at **Add "Lessons Admin" Role** -- Mga handang role na may nakalagay nang makatuwirang hanay ng mga permiso. Hihilingin ng B1 na kumpirmahin mo, pagkatapos gagawin ang role. Maaari mong baguhin ang mga permiso nito pagkatapos, gaya ng alinmang role.

## Pagpapalit ng Pangalan o Pagbura ng Role {#renaming-or-deleting-a-role}

I-hover ang row ng isang role at i-click ang **Edit**. Sa form na **Edit Role**, baguhin ang **Role Name** at i-click ang **Save**, o i-click ang **Delete** at kumpirmahin para alisin ang role. Hindi maaaring burahin ang role na **Domain Admins**.

## Pag-unawa sa Pahina ng Role {#understanding-a-roles-page}

I-click ang pangalan ng isang role para buksan ang pahina nito. May dalawang panel ito:

- **Members** (kaliwa) -- Ang mga tao sa role, kasama ang kanilang pangalan at email.
- **Edit Permissions** (kanan) -- Ang mga permisong maaaring ibigay sa role.

Ang row na **(Everyone)** ay nagbubukas ng pahina para sa mga permisong nalalapat sa bawat user ng iyong simbahan; walang listahan ng miyembro ito.

## Pagdaragdag ng User sa Role {#adding-users-to-a-role}

1. Buksan ang role at i-click ang **Add** sa panel na **Members**. Magbubukas ang form na **Add To** para sa role na iyon.
2. I-type ang pangalan o email sa search box at i-click ang search button.
3. I-click ang add button sa tabi ng tao. Idinadagdag siya sa role agad, at mag-aalok ang B1 na magpadala sa kanya ng invite email para makapag-sign in.
4. Kung wala pa sa simbahan mo ang tao, i-click ang **Create New User** sa ilalim ng mga resulta ng paghahanap, ilagay ang kanyang **First Name**, **Last Name**, at **Email**, at i-click ang **Save**.

Para baguhin ang pangalan o email ng isang miyembro, i-click ang edit icon sa kanyang row.

## Pag-aalis ng User sa Role {#removing-users-from-a-role}

1. Buksan ang role na naglalaman ng user na gusto mong alisin.
2. Hanapin ang tao sa listahang **Members**.
3. I-click ang delete icon sa kanyang row at kumpirmahin.

Dapat palaging may kahit isang Domain Admin ang simbahan mo, kaya hindi maaaring alisin ang huling miyembro ng **Domain Admins**. Magpapakita ang B1 ng "At least one Domain Admin is required. Add another Domain Admin before removing this one." Hindi rin maaaring umalis sa simbahan o burahin ang sarili nilang account ang nag-iisang Domain Admin hangga't walang ibang idinadagdag sa **Domain Admins**.

## Pag-configure ng Mga Permiso {#configuring-permissions}

Maaaring bigyan ng access ang bawat role sa mga partikular na lugar ng B1 Admin. Sa panel na **Edit Permissions**, nakapangkat ang mga permiso sa mga seksyong maaari mong palawakin, gaya ng **Attendance**, **Content**, **Donations**, **Forms and Plans**, **Lessons**, **Messaging**, **People and Groups**, at **Tasks**. I-type sa kahong **Filter permissions** para ipakita lamang ang mga permisong tumutugma.

Lagyan ng check o alisan ng check ang isang permiso para ibigay o alisin ito sa role. Agad na nagse-save ang bawat pagbabago; walang Save button. Pansinin na ang **Edit Church Settings**, na nagbubukas ng pahinang Settings, ay nasa seksyong **Content**. Ipinapakita ng heading ng bawat seksyon kung ilan sa mga permiso nito ang hawak ng role, gaya ng **2 of 5**, at nag-a-update ang bilang habang naglalagay at nag-aalis ka ng check sa mga kahon.

### Mga Permiso sa Donations {#donations-permissions}

May mga sumusunod na permiso ang seksyong **Donations**:

- **View Donation Summaries** -- makita ang seksyong Donations, kabilang ang mga pahina ng Summary, Batches, Funds, Campaigns, at Giving Statements.
- **View Donations** -- makita ang mga indibidwal na donasyon, gaya ng mga handog sa loob ng isang batch.
- **Edit Donations** -- buong kontrol: magdagdag, mag-edit, at magbura ng mga donasyon at batch, at [magsara at magbukas muli ng mga batch](../donations/batches.md#closing-and-reopening-a-batch).
- **Enter Donations** -- magdagdag ng mga batch at mag-enter, mag-edit, o magbura ng mga donasyon, pero sa mga batch lamang na bukas pa. Ang mga may ganitong permiso lamang ay hindi makakapagbura ng batch, makakapagsara o makakapagbukas nito, o makakabago ng mga handog na pumasok sa pamamagitan ng online giving.
- **Edit Settings** -- pamahalaan ang mga setting ng donasyon.

Ang sinumang may **Enter Donations** pero walang **View Donation Summaries** ay makikita lamang ang pahinang **Batches** sa ilalim ng **Donations**. Bigyan ng role na may kapwa **Enter Donations** at **View Donations** ang isang counting team para makabukas nila ang isang batch at makita ang mga handog na inilagay nila. Tingnan ang [Who Can Change a Batch](../donations/batches.md#who-can-change-a-batch) para sa mga detalye.

### People Names Only {#people-names-only}

Kasama sa seksyong **People and Groups** ang **View People Names Only**. Gamitin ito para sa mga volunteer na kailangang maghanap ng tao ayon sa pangalan -- halimbawa, para pumili ng tao sa isang search box -- nang walang access sa buong directory. Sa permisong ito lamang, ang isang tao:

- Makakapaghanap ng mga tao ayon sa pangalan at makakakita ng listahan ng mga kamakailang idinagdag na tao, pero pangalan, larawan, at membership status lamang ng bawat tao ang nakikita
- Hindi makakapaghanap gamit ang email, hindi makakakita ng contact details, at hindi makakabukas ng **People** directory

Ipares ang **View People Names Only** sa **View Attendance** o **Edit Attendance** para sa mga volunteer na nagtatala ng attendance sa klase. Ang **People** sa kanilang menu ay magbubukas ng **Groups**, kung saan nila mabubuksan ang listahang **All groups** at makikita ang mga pangalan ng miyembro at mga session ng bawat klase. Sa **Edit Attendance**, maaari rin nilang [itala ang attendance](../attendance/recording-attendance.md) at magdagdag ng mga bisita sa pamamagitan ng paghahanap ng kanilang mga pangalan. Hindi nagli-link ang mga pangalan sa talaan ng tao, at nananatiling nakatago ang mga confidential na grupo maliban kung miyembro ang volunteer.

Itinatago ng B1 Admin ang mga link at button na nangangailangan ng permisong wala sa isang role. Halimbawa, ang listahang **All groups** ay available lamang sa mga taong maaaring mag-edit ng mga grupo, tumingin ng mga miyembro ng grupo, o tumingin ng mga tao, o may **View People Names Only** kasama ang **View Attendance** o **Edit Attendance** (ang iba ay ibabalik sa Dashboard); lumalabas ang attendance setup lamang sa **Edit Services**; ang button na **Email** ng grupo ay lumalabas lamang sa mga taong may **Edit Group Members** (ang permisong kailangan para magpadala ng group email); ang pag-print ng roster ng grupo ay nangangailangan ng **View Group Members** o pamumuno sa grupong iyon; at ang pagbura ng calendar event ay nangangailangan ng **Edit Content** (o pag-withdraw ng sarili mong nakabinbing request).

### Mga Account ng Check-In Kiosk {#check-in-kiosk-accounts}

Ang account na nagla-log in sa isang [B1 Checkin](../../b1-checkin/getting-started/logging-in.md) kiosk ay nangangailangan ng permiso na **Checkin** sa seksyong **Attendance** (o **Edit Attendance**). Sa **Checkin** lamang, makakahanap ng pamilya ayon sa pangalan o telepono ang kiosk, makakapag-check in at check out ng mga ito, at makakapagpakita kung sino ang maaaring sumundo sa isang bata, nang walang access sa People directory.

Hindi na ibinibigay ang Checkin sa pamamagitan ng row na **(Everyone)**. Ang pagiging nasa role na may ibang permiso ay hindi nagbibigay sa sinuman ng kakayahang magpatakbo ng kiosk; idagdag ang **Checkin** sa isang role gaya ng "Check-In Volunteers" at ilagay doon ang mga account ng kiosk.

:::warning
May buong access ang **Domain Admins** sa lahat ng lugar ng iyong ChurchApps account. Hindi maaaring baguhin o limitahan ang kanilang mga permiso. Gamitin lamang ang role na ito para sa pinakapinagkakatiwalaan mong mga administrator.
:::

:::tip
Gumawa ng mga tiyak na role gaya ng "Treasurer" na may access lamang sa **Donations**, "Counting Team" na may **Enter Donations** at **View Donations**, o "Check-In Volunteer" na may access lamang sa **Attendance**. Sinusunod nito ang prinsipyo ng least privilege at pinananatiling ligtas ang iyong datos. Tingnan ang [Data Security](./data-security.md) para sa higit pa kung paano pinoprotektahan ng ChurchApps ang iyong impormasyon.
:::
