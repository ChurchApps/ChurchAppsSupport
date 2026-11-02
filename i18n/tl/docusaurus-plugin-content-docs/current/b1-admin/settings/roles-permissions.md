---
title: "Mga Role at Permiso"
---

# Mga Role at Permiso

<div class="article-intro">

Hinahayaan ka ng mga role na kontrolin kung ano ang maaaring ma-access ng iba't ibang user sa loob ng iyong ChurchApps account. Maaari kang gumawa ng custom na role para sa mga staff, boluntaryo, at iba pang miyembro ng team, bawat isa ay may sariling antas ng access para mapanatiling ligtas ang iyong datos.

</div>

## Training Video

<YouTube id="ZzCIkinVMnE" title="Roles, Permissions, and Inviting Your Team in B1" next="Setting Up Services and Attendance in B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng Domain Admin access o role na may permiso na mamahala ng mga role
- Magkaroon ng listahan ng mga miyembro ng team at ng mga lugar na kailangan nilang ma-access
- Suriin ang mga available na kategorya ng permiso sa ibaba para mapag-planuhan ang iyong mga role

</div>

## Pag-access sa Mga Role

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas) at palawakin ang **Settings**.
2. I-click ang **Roles**.
3. Ipinapakita ng pahinang Roles ang lahat ng kasalukuyang nakadefine na role para sa iyong simbahan. Ipinapakita ng column na **Members** kung ilang user ang nasa bawat role, at ang row na **(Everyone)** ay nagpapakita ng **All users**.

## Pag-unawa sa Pahinang Roles

Nahahati sa dalawang panel ang pahinang Roles:

- **Kaliwang bahagi** -- Ipinapakita ang listahan ng mga miyembrong nakatalaga sa napiling role.
- **Kanang bahagi** -- Ipinapakita ang mga setting ng permiso na maaari mong i-configure para sa role na iyon.

I-click ang alinmang pangalan ng role para tingnan at pamahalaan ang mga miyembro at permiso nito.

## Pagdaragdag ng Mga User sa Isang Role

1. Piliin ang role na gusto mong pagdagdagan ng mga miyembro.
2. Gamitin ang **search field** sa kaliwang bahagi para hanapin ang taong gusto mong idagdag.
3. Piliin ang tao mula sa mga resulta ng paghahanap.
4. Idadagdag siya sa role kaagad.

## Pag-aalis ng Mga User sa Isang Role

1. Piliin ang role na naglalaman ng user na gusto mong alisin.
2. Hanapin ang tao sa listahan ng miyembro sa kaliwang bahagi.
3. I-click ang **remove button** sa tabi ng kanyang pangalan.

## Pag-configure ng Mga Permiso

Maaaring bigyan ang bawat role ng access sa partikular na bahagi ng B1 Admin. Sa panel na **Edit Permissions**, nakapangkat ang mga permiso sa mga seksyong maaari mong palawakin, gaya ng **Attendance**, **Content**, **Donations**, **Forms and Plans**, **Lessons**, **Messaging**, **People and Groups**, at **Tasks**. I-type sa kahong **Filter permissions** para ipakita lang ang mga permisong tumutugma.

Lagyan ng check o alisin ang check sa isang permiso para ibigay o alisin ito sa role. Ipinapakita ng bawat heading ng seksyon kung ilan sa mga permiso nito ang mayroon ang role, gaya ng **2 of 5**, at nag-a-update ang bilang habang naglalagay at nag-aalis ka ng check sa mga kahon.

### Mga Permiso sa Donations

May mga sumusunod na permiso ang seksyong **Donations**:

- **View Donation Summaries** -- makita ang seksyong Donations, kabilang ang mga pahinang Summary, Batches, Funds, Campaigns, at Giving Statements.
- **View Donations** -- makita ang mga indibidwal na donasyon, gaya ng mga regalong nasa loob ng isang batch.
- **Edit Donations** -- buong kontrol: magdagdag, mag-edit, at magbura ng mga donasyon at batch, at [isara at buksang muli ang mga batch](../donations/batches.md#closing-and-reopening-a-batch).
- **Enter Donations** -- magdagdag ng mga batch at maglagay, mag-edit, o magbura ng mga donasyon, pero sa mga batch lang na bukas pa. Ang mga may ganitong permiso lang ay hindi makakapagbura ng batch, makakapagsara o makakapagbukas ng mga ito, o makakapagbago ng mga regalong dumating sa pamamagitan ng online giving.
- **Edit Settings** -- pamahalaan ang mga setting ng donasyon.

Ang taong may **Enter Donations** pero walang **View Donation Summaries** ay makikita lang ang pahinang **Batches** sa ilalim ng **Donations**. Bigyan ang isang counting team role ng parehong **Enter Donations** at **View Donations** para mabuksan nila ang isang batch at makita ang mga regalong inilagay nila. Tingnan ang [Who Can Change a Batch](../donations/batches.md#who-can-change-a-batch) para sa mga detalye.

### People Names Only {#people-names-only}

Kasama sa seksyong **People and Groups** ang **View People Names Only**. Gamitin ito para sa mga boluntaryong kailangang maghanap ng tao ayon sa pangalan -- halimbawa, para pumili ng tao sa isang search box -- nang walang access sa buong directory. Sa permiso lang na ito, ang isang tao:

- Makakapaghanap ng mga tao ayon sa pangalan at makakakita ng listahan ng mga kamakailang idinagdag na tao, pero makikita lang ang pangalan, larawan, at membership status ng bawat tao
- Hindi makakapaghanap ayon sa email, hindi makakakita ng contact details, at hindi makakabukas ng **People** directory

Ipares ang **View People Names Only** sa **View Attendance** o **Edit Attendance** para sa mga boluntaryong nagtatala ng attendance sa klase. Ang **People** sa kanilang menu ay magbubukas ng **Groups**, kung saan mabubuksan nila ang listahang **All groups** at makikita ang mga pangalan ng miyembro at sesyon ng bawat klase. Sa **Edit Attendance**, maaari rin nilang [i-record ang attendance](../attendance/recording-attendance.md) at magdagdag ng mga bisita sa pamamagitan ng paghahanap ng kanilang mga pangalan. Hindi nagli-link ang mga pangalan sa mga person record, at nananatiling nakatago ang mga confidential group maliban kung miyembro ang boluntaryo.

Itinatago ng B1 Admin ang mga link at butones na nangangailangan ng permisong wala sa role. Halimbawa, ang listahang **All groups** ay available lang sa mga taong maaaring mag-edit ng grupo, tumingin ng mga miyembro ng grupo, o tumingin ng mga tao, o may **View People Names Only** kasama ang **View Attendance** o **Edit Attendance** (ang iba ay ibabalik sa Dashboard); lumalabas lang ang attendance setup kasama ang **Edit Services**; ang butones na **Email** ng grupo ay lumalabas lang para sa mga may **Edit Group Members** (ang permisong kailangan para magpadala ng group email); ang pag-print ng roster ng grupo ay nangangailangan ng **View Group Members** o pamumuno sa grupong iyon; at ang pagbura ng event sa calendar ay nangangailangan ng **Edit Content** (o pag-withdraw ng sarili mong nakabinbing request).

### Mga Kiosk Account sa Check-In {#check-in-kiosk-accounts}

Ang account na nag-sign in sa isang [B1 Checkin](../../b1-checkin/getting-started/logging-in.md) kiosk ay kailangan ng permisong **Checkin** sa seksyong **Attendance** (o **Edit Attendance**). Sa **Checkin** lang, maaaring hanapin ng kiosk ang mga pamilya ayon sa pangalan o telepono, i-check in at i-check out sila, at ipakita kung sino ang maaaring sumundo sa isang bata, nang walang access sa People directory.

Hindi na ibinibigay ang Checkin sa pamamagitan ng row na **(Everyone)**. Ang pagiging nasa role na may ibang permiso ay hindi nagpapahintulot sa isang tao na patakbuhin ang kiosk; idagdag ang **Checkin** sa isang role gaya ng "Check-In Volunteers" at ilagay doon ang mga kiosk account.

:::warning
May kumpletong access ang **Domain Admins** sa lahat ng bahagi ng iyong ChurchApps account. Hindi maaaring baguhin o paghigpitan ang kanilang mga permiso. Gamitin lang ang role na ito para sa iyong pinakamapagkakatiwalaang administrator.
:::

:::tip
Gumawa ng mga partikular na role gaya ng "Treasurer" na may access lang sa **Donations**, "Counting Team" na may **Enter Donations** at **View Donations**, o "Check-In Volunteer" na may access lang sa **Attendance**. Sinusunod nito ang prinsipyo ng least privilege at pinapanatiling ligtas ang iyong datos. Tingnan ang [Data Security](./data-security.md) para sa higit pa tungkol sa kung paano pinoprotektahan ng ChurchApps ang iyong impormasyon.
:::
