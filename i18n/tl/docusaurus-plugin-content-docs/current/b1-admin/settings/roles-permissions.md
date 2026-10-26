---
title: "Mga Role at Permission"
---

# Mga Role at Permission

<div class="article-intro">

Hinahayaan ka ng mga role na kontrolin kung ano ang maaaring ma-access ng iba't ibang user sa loob ng iyong ChurchApps account. Maaari kang gumawa ng custom na role para sa staff, volunteer, at iba pang miyembro ng team, bawat isa ay may sariling antas ng access upang mapanatiling ligtas ang iyong datos.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng Domain Admin access o role na may permiso na mamahala ng mga role
- Magkaroon ng listahan ng mga miyembro ng team at ng mga lugar na kailangan nilang ma-access
- Suriin ang mga available na kategorya ng permiso sa ibaba para mapagplanuhan ang iyong mga role

</div>

## Pag-access sa Mga Role

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas) at i-expand ang **Settings**.
2. I-click ang **Roles**.
3. Ipinapakita ng pahinang Roles ang lahat ng kasalukuyang role ng iyong simbahan. Ipinapakita ng column na **Members** kung ilang user ang nasa bawat role, at ang row na **(Everyone)** ay nagpapakita ng **All users**.

## Pag-unawa sa Pahinang Roles

Nahahati sa dalawang panel ang pahinang Roles:

- **Kaliwa** -- Ipinapakita ang listahan ng mga miyembrong nakatalaga sa napiling role.
- **Kanan** -- Ipinapakita ang mga setting ng permiso na maaari mong itakda para sa role na iyon.

I-click ang alinmang pangalan ng role para tingnan at pamahalaan ang mga miyembro at permiso nito.

## Pagdaragdag ng Mga User sa Role

1. Piliin ang role na nais mong lagyan ng mga miyembro.
2. Gamitin ang **search field** sa kaliwa para hanapin ang taong nais mong idagdag.
3. Piliin ang tao mula sa mga resulta ng paghahanap.
4. Agad na maidaragdag siya sa role.

## Pag-aalis ng Mga User sa Role

1. Piliin ang role na naglalaman ng user na nais mong alisin.
2. Hanapin ang tao sa listahan ng miyembro sa kaliwa.
3. I-click ang **remove button** sa tabi ng kanyang pangalan.

## Pagtatakda ng Mga Permiso

Maaaring bigyan ang bawat role ng access sa mga partikular na bahagi ng B1 Admin. Sa panel na **Edit Permissions**, pinagpapangkat ang mga permiso sa mga seksyong maaari mong i-expand, tulad ng **Attendance**, **Content**, **Donations**, **Forms and Plans**, **Lessons**, **Messaging**, **People and Groups**, at **Tasks**. I-type sa kahon na **Filter permissions** para ipakita lamang ang mga permisong tumutugma.

I-check o i-uncheck ang isang permiso para ibigay o alisin ito sa role. Ipinapakita ng bawat heading ng seksyon kung ilan sa mga permiso nito ang mayroon ang role, tulad ng **2 of 5**, at nag-a-update ang bilang habang nagche-check at nag-u-uncheck ka ng mga kahon.

### Mga Permiso sa Donations

Ang seksyong **Donations** ay may mga sumusunod na permiso:

- **View Donation Summaries** -- makita ang seksyong Donations, kabilang ang mga pahinang Summary, Batches, Funds, Campaigns, at Giving Statements.
- **View Donations** -- makita ang mga indibidwal na donasyon, tulad ng mga handog sa loob ng isang batch.
- **Edit Donations** -- buong kontrol: magdagdag, mag-edit, at magbura ng mga donasyon at batch, at [magsara at magbukas muli ng mga batch](../donations/batches.md#closing-and-reopening-a-batch).
- **Enter Donations** -- magdagdag ng mga batch at maglagay, mag-edit, o magbura ng mga donasyon, ngunit sa mga batch lamang na bukas pa. Ang mga may ganitong permiso lamang ay hindi makakabura ng batch, hindi makakapagsara o makakapagbukas muli nito, at hindi makakabago ng mga handog na pumasok sa pamamagitan ng online giving.
- **Edit Settings** -- pamahalaan ang mga setting ng donasyon.

Ang taong may **Enter Donations** pero walang **View Donation Summaries** ay makikita lamang ang pahinang **Batches** sa ilalim ng **Donations**. Bigyan ng parehong **Enter Donations** at **View Donations** ang isang counting team role para makabukas sila ng batch at makita ang mga handog na kanilang inilagay. Tingnan ang [Who Can Change a Batch](../donations/batches.md#who-can-change-a-batch) para sa mga detalye.

### Pangalan Lamang ng Mga Tao

Kasama sa seksyong **People and Groups** ang **View People Names Only**. Gamitin ito para sa mga volunteer na kailangang maghanap ng tao sa pamamagitan ng pangalan -- halimbawa, para pumili ng tao sa isang search box -- nang walang access sa buong directory. Sa permisong ito lamang, ang isang tao ay:

- Maaaring maghanap ng tao sa pamamagitan ng pangalan at makita ang listahan ng mga kamakailang idinagdag na tao, ngunit makikita lamang ang pangalan, larawan, at membership status ng bawat tao
- Hindi makakapaghanap sa pamamagitan ng email, hindi makakakita ng contact details, at hindi makakabukas ng **People** directory

Ipares ang **View People Names Only** sa **View Attendance** o **Edit Attendance** para sa mga volunteer na nagtatala ng attendance sa klase. Ang **People** sa kanilang menu ay magbubukas ng **Groups**, kung saan mabubuksan nila ang listahang **All groups** at makikita ang pangalan ng mga miyembro at sesyon ng bawat klase. Kung mayroon silang **Edit Attendance**, maaari rin nilang [itala ang attendance](../attendance/recording-attendance.md) at magdagdag ng mga bisita sa pamamagitan ng paghahanap sa kanilang mga pangalan. Hindi nagiging link papunta sa person record ang mga pangalan, at nananatiling nakatago ang mga kumpidensyal na grupo maliban kung miyembro ang volunteer.

Itinatago ng B1 Admin ang mga link at button na nangangailangan ng permisong wala sa isang role. Halimbawa, ang listahang **All groups** ay available lamang sa mga taong maaaring mag-edit ng grupo, tumingin ng miyembro ng grupo, o tumingin ng mga tao, o sa mga may **View People Names Only** kasama ang **View Attendance** o **Edit Attendance** (ang iba ay ibabalik sa Dashboard). Lumalabas ang attendance setup kapag may **View Attendance** o **Edit Services**. Ang button na **Email** ng grupo ay lumalabas lamang para sa mga may **Edit Group Members** (ang permisong kailangan para magpadala ng email sa grupo). Ang pag-print ng roster ng grupo ay nangangailangan ng **View Group Members** o ng pamumuno sa grupong iyon, at ang pagbura ng calendar event ay nangangailangan ng **Edit Content** (o ang pag-withdraw ng sarili mong nakabinbing kahilingan).

:::warning
Ang **Domain Admins** ay may ganap na access sa lahat ng bahagi ng iyong ChurchApps account. Hindi mababago o mapaghihigpitan ang kanilang mga permiso. Gamitin lamang ang role na ito para sa iyong pinakakatiwalaang administrator.
:::

:::tip
Gumawa ng mga espesipikong role gaya ng "Treasurer" na may access lamang sa **Donations**, "Counting Team" na may **Enter Donations** at **View Donations**, o "Check-In Volunteer" na may access lamang sa **Attendance**. Sinusunod nito ang prinsipyo ng least privilege at pinananatiling ligtas ang iyong datos. Tingnan ang [Data Security](./data-security.md) para sa higit pa tungkol sa kung paano pinoprotektahan ng ChurchApps ang iyong impormasyon.
:::
