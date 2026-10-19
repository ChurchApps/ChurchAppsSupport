---
title: "Mga Tungkulin at Pahintulot"
---

# Mga Tungkulin at Pahintulot

<div class="article-intro">

Hinahayaan ka ng mga tungkulin na kontrolin kung ano ang maaaring ma-access ng iba't ibang user sa loob ng iyong ChurchApps account. Maaari kang gumawa ng custom na tungkulin para sa mga staff, boluntaryo, at iba pang miyembro ng team, bawat isa ay may sariling antas ng access para mapanatiling ligtas ang iyong datos.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng Domain Admin access o isang tungkuling may pahintulot na mamahala ng mga tungkulin
- Magkaroon ng listahan ng mga miyembro ng team at ng mga lugar na kailangan nila ng access
- Suriin ang mga available na kategorya ng pahintulot sa ibaba para mapagplanuhan ang iyong mga tungkulin

</div>

## Pag-access sa mga Tungkulin

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas) at i-expand ang **Settings**.
2. I-click ang **Roles**.
3. Ipinapakita ng pahina ng Roles ang lahat ng kasalukuyang tungkuling naitakda para sa iyong simbahan.

## Pag-unawa sa Pahina ng Roles

Nahahati sa dalawang panel ang pahina ng Roles:

- **Kaliwang bahagi** -- Ipinapakita ang listahan ng mga miyembrong nakatalaga sa napiling tungkulin.
- **Kanang bahagi** -- Ipinapakita ang mga setting ng pahintulot na maaari mong itakda para sa tungkuling iyon.

I-click ang anumang pangalan ng tungkulin para makita at pamahalaan ang mga miyembro at pahintulot nito.

## Pagdaragdag ng mga User sa Tungkulin

1. Piliin ang tungkuling gusto mong dagdagan ng mga miyembro.
2. Gamitin ang **search field** sa kaliwang bahagi para hanapin ang taong gusto mong idagdag.
3. Piliin ang tao mula sa mga resulta ng paghahanap.
4. Agad silang idadagdag sa tungkulin.

## Pag-alis ng mga User sa Tungkulin

1. Piliin ang tungkuling naglalaman ng user na gusto mong alisin.
2. Hanapin ang tao sa listahan ng miyembro sa kaliwang bahagi.
3. I-click ang **remove button** sa tabi ng kanyang pangalan.

## Pagtatakda ng mga Pahintulot

Maaaring bigyan ang bawat tungkulin ng access sa mga partikular na bahagi ng B1 Admin. Sa panel na **Edit Permissions**, nakapangkat ang mga pahintulot sa mga seksyong maaari mong palawakin, gaya ng **Attendance**, **Content**, **Donations**, **Forms and Plans**, **Lessons**, **Messaging**, **People and Groups**, at **Tasks**. I-type sa kahon na **Filter permissions** para ipakita lamang ang mga pahintulot na tumutugma.

Lagyan ng check o alisan ng check ang isang pahintulot para ibigay o alisin ito sa tungkulin.

### Mga Pahintulot sa Donations

May mga sumusunod na pahintulot ang seksyong **Donations**:

- **View Donation Summaries** -- makita ang seksyong Donations, kabilang ang mga pahina ng Summary, Batches, Funds, Campaigns, at Giving Statements.
- **View Donations** -- makita ang mga indibidwal na donasyon, gaya ng mga regalong nasa loob ng isang batch.
- **Edit Donations** -- buong kontrol: magdagdag, mag-edit, at magbura ng mga donasyon at batch, at [magsara at magbukas muli ng mga batch](../donations/batches.md#closing-and-reopening-a-batch).
- **Enter Donations** -- magdagdag ng mga batch at magtala, mag-edit, o magbura ng mga donasyon, ngunit sa mga batch lamang na bukas pa. Ang mga taong may ganitong pahintulot lamang ay hindi makakapagbura ng mga batch, makakapagsara o makakapagbukas muli ng mga ito, o makakapagbago ng mga regalong dumating sa pamamagitan ng online giving.
- **Edit Settings** -- pamahalaan ang mga setting ng donasyon.

Ang taong may **Enter Donations** ngunit walang **View Donation Summaries** ay makikita lamang ang pahinang **Batches** sa ilalim ng **Donations**. Bigyan ng tungkuling pang-counting team ang parehong **Enter Donations** at **View Donations** para mabuksan nila ang isang batch at makita ang mga regalong naitala nila. Tingnan ang [Sino ang Maaaring Magbago ng Batch](../donations/batches.md#who-can-change-a-batch) para sa mga detalye.

### Mga Pangalan ng Tao Lamang

Kasama sa seksyong **People and Groups** ang **View People Names Only**. Gamitin ito para sa mga boluntaryong kailangang maghanap ng tao ayon sa pangalan -- halimbawa, para pumili ng isang tao sa search box -- nang hindi nagkakaroon ng access sa buong direktoryo. Sa pahintulot na ito lamang, ang isang tao:

- Maaaring maghanap ng mga tao ayon sa pangalan at makita ang listahan ng mga kamakailang idinagdag na tao, ngunit makikita lamang ang pangalan, larawan, at katayuan ng membership ng bawat tao
- Hindi makakapaghanap gamit ang email, makakakita ng detalye ng contact, o makakabukas ng direktoryong **People**

Itinatago ng B1 Admin ang mga link at button na nangangailangan ng pahintulot na wala sa isang tungkulin. Halimbawa, ang listahang **All groups** ay available lamang sa mga taong maaaring mag-edit ng grupo, tumingin ng miyembro ng grupo, o tumingin ng mga tao (ang iba ay ibinabalik sa Dashboard); lumalabas lamang ang setting ng attendance kapag may **View Attendance** o **Edit Services**; ang button na **Email** ng grupo ay lumalabas lamang sa mga taong may **Edit Group Members** (ang pahintulot na kailangan para magpadala ng group email); ang pag-print ng roster ng grupo ay nangangailangan ng **View Group Members** o ang pagiging leader ng grupong iyon; at ang pagbura ng event sa kalendaryo ay nangangailangan ng **Edit Content** (o pag-withdraw ng sarili mong nakabinbing kahilingan).

:::warning
Ang **Domain Admins** ay may buong access sa lahat ng bahagi ng iyong ChurchApps account. Hindi mababago o mahihigpitan ang kanilang mga pahintulot. Gamitin lamang ang tungkuling ito para sa iyong pinakapinagkakatiwalaang mga administrator.
:::

:::tip
Gumawa ng mga partikular na tungkulin gaya ng "Treasurer" na may access lamang sa **Donations**, "Counting Team" na may **Enter Donations** at **View Donations**, o "Check-In Volunteer" na may access lamang sa **Attendance**. Sinusunod nito ang prinsipyo ng least privilege at pinananatiling ligtas ang iyong datos. Tingnan ang [Data Security](./data-security.md) para sa higit pang impormasyon kung paano pinoprotektahan ng ChurchApps ang iyong impormasyon.
:::
