---
title: "Mga Join Request sa Grupo"
description: "Suriin, aprubahan, o tanggihan ang mga join request sa grupo sa B1 Admin, hanapin ang mga nakabinbing request bilang lider o admin, at maglagay ng dahilan kapag tinatanggihan."
---

# Mga Join Request sa Grupo

<div class="article-intro">

Kapag naka-configure ang grupo na may join policy na nakabatay sa approval, maaaring magsumite ng request ang mga tao para sumali. Sinusuri ng mga lider ng grupo at administrator ang mga request na ito at inaaprubahan o tinatanggihan ang mga ito. Nagbibigay ito sa iyong simbahan ng kontrol sa pagiging miyembro ng grupo habang pinapadali para sa mga tao na ipahayag ang interes nilang sumali.

</div>

## Training Video {#training-video}

<YouTube id="1vj-suCiIsE" title="Group Join Requests and Group Calendars in B1" next="Setting Up Services and Attendance in B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng permission na mamahala ng mga grupo, o dapat kang lider ng partikular na grupo. Tingnan ang [Roles & Permissions](../people/roles-permissions.md) para sa mga detalye.
- Dapat nakatakda sa **Request** (kailangan ng approval) ang join policy ng grupo. Tingnan ang [Creating Groups](./creating-groups.md) para sa kung paano i-configure ang mga join policy.

</div>

## Pag-unawa sa Mga Join Policy {#understanding-join-policies}

Maaaring may tatlong magkakaibang join policy ang mga grupo:

- **Open** -- Sinuman ay maaaring sumali kaagad nang walang approval
- **Request** -- Nagsusumite ang mga tao ng join request na kailangang aprubahan
- **Closed** -- Walang sinuman ang makakahiling na sumali (kailangang idagdag nang manu-mano ang mga miyembro)

Kapag gumagamit ng **Request** policy ang grupo, dumadaan lahat ng pagtatangkang sumali sa approval workflow na inilalarawan sa pahinang ito.

## Pagtingin sa Mga Nakabinbing Request {#viewing-pending-requests}

### Para sa Mga Lider ng Grupo {#for-group-leaders}

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) at piliin ang **People > Groups**
2. I-click ang pangalan ng grupo
3. Ipinapakita ng seksyong **Members** kung ilan ang nakabinbing request (halimbawa, "1 pending"). I-click ang **All members** -- lalabas ang mga nakabinbing request para sa grupong ito sa ilalim ng **Pending Requests** sa itaas ng listahan ng miyembro

### Para sa Mga Administrator {#for-administrators}

Makikita ng mga administrator na may permission sa pamamahala ng grupo ang mga nakabinbing request sa lahat ng grupo:

1. Sa Jump menu, piliin ang **People > Groups**
2. I-click ang button na **pending requests** sa header ng pahina (halimbawa, "3 pending requests"). Lumalabas lamang ito kapag may naghihintay na request.
3. Inililista ng pahinang **Pending Join Requests** ang bawat nakabinbing request sa buong simbahan, kasama ang grupong hiniling sumali ng bawat tao sa tabi ng kanyang pangalan. I-click ang **Groups** sa itaas ng pahina para bumalik. Kapag walang naghihintay, ipinapakita ng pahina ang **No pending requests.**

## Pagrepaso ng Join Request {#reviewing-a-join-request}

Ipinapakita ng bawat join request ang:

- **Pangalan at larawan ng tao** -- Ang taong humihiling na sumali (at, sa pahina para sa buong simbahan, ang grupo)
- **Opsyonal na mensahe** -- Personal na mensahe na nagpapaliwanag kung bakit gusto nilang sumali (kung nagbigay sila)
- **Petsa ng request** -- Kailan isinumite ang request

Para mag-review ng request:

1. Basahin ang mensahe ng tao kung nagbigay sila nito
2. I-click ang pangalan ng tao para buksan ang kanyang profile kung kailangan
3. Magpasya kung aaprubahan o tatanggihan

## Pag-apruba ng Request {#approving-a-request}

1. I-click ang **Approve** sa join request
2. Agad na idinadagdag ang tao sa grupo bilang miyembro at mawawala ang request sa listahan
3. Tumatanggap ng notification ang humiling na naaprubahan ang kanyang request
4. Mamarkahan sa sistema na naaprubahan ang request

:::tip
Kapag inaprubahan mo ang isang request, nagiging regular na miyembro ng grupo ang tao. Maaari mo siyang itaas bilang lider ng grupo sa ibang pagkakataon mula sa pahinang [Group Members](./group-members.md).
:::

## Pagtanggi sa Request {#declining-a-request}

1. I-click ang **Decline** sa join request
2. Sa dialog na **Decline Request**, opsyonal na maglagay ng **Reason (optional)** (hanggang 500 character)
3. I-click ang **Decline**
4. Tumatanggap ng notification ang humiling kasama ang dahilan ng pagtanggi (kung nagbigay ka nito)
5. Mamarkahan na tinanggihan ang request

:::info
Nakakatulong ang dahilan ng pagtanggi para maunawaan ng tao kung bakit hindi naaprubahan ang kanyang request, at maaaring mag-udyok sa kanya na subukang muli sa hinaharap o tuklasin ang ibang grupo.
:::

## Pag-apruba mula sa Tasks Page {#approving-from-the-tasks-page}

Lumilikha rin ang bawat join request ng gawain sa ilalim ng **Serving &rarr; My Work**, na may pamagat na "*Person* requested to join *Group*." Naka-assign ito sa mga lider ng grupo. Kung walang lider ang grupo, mapupunta ito sa sinumang staff na may permission na **Group Members &gt; Edit**, o sa mga domain admin ng iyong simbahan kung walang may ganoong permission. Ang mga staff at admin na makakatanggap ng gawain sa ganitong paraan ay makakatanggap din ng notification na direktang nagli-link dito.

Kapag binuksan ang gawain, makikita ang pangalan ng humiling, ang grupo, at ang kanyang opsyonal na mensahe, kasama ang mga button na **Approve** at **Decline** mismo sa task card (ang Decline ay nagbubukas ng parehong opsyonal na reason field na inilarawan sa itaas). Nagbibigay ito sa mga lider ng ikalawang paraan, na hinihimok ng notification, para aksyunan ang isang request nang hindi binubuksan ang listahan ng miyembro ng grupo.

Ang pagdedesisyon sa isang request mula sa alinman sa dalawang lugar -- ang listahan ng miyembro ng grupo o ang Tasks card -- ay magsasara nito sa lahat ng lugar, kaya hindi kailanman makikita ng mga lider ang lumang gawain para sa request na naaksyunan na ng iba.

## Mga Notification {#notifications}

Awtomatikong nagpapadala ng notification ang sistema ng join request:

- **Kapag may isinumiteng request** -- Lahat ng lider ng grupo ay tumatanggap ng notification. Kung walang lider ang grupo, sa halip ay ina-abisuhan ang mga staff o admin na naka-assign sa gawain (tingnan sa itaas).
- **Kapag naaprubahan ang request** -- Tumatanggap ang humiling ng kumpirmasyon
- **Kapag tinanggihan ang request** -- Tumatanggap ang humiling ng notification kasama ang anumang dahilan ng pagtanggi

Lumilitaw ang mga notification sa notification center ng user sa B1.church at sa mobile app. Sa notification bell ng B1 Admin, ang pag-click sa notification ng join request (o sa **View Details** nito) ay magbubukas sa grupo sa B1.church site ng iyong simbahan sa bagong tab.

## Pamamahala ng Request mula sa Panig ng Miyembro {#managing-requests-from-the-member-side}

Maaaring pamahalaan ng mga tao ang sarili nilang join request mula sa B1.church:

- Tingnan ang status ng kanilang mga nakabinbing request sa detail page ng grupo
- Kanselahin ang nakabinbing request kung nagbago ang isip nila
- Tingnan kung naaprubahan o tinanggihan ang kanilang request

## Mga Pinakamahusay na Gawi {#best-practices}

- **Tumugon agad** -- Subukang i-review ang mga request sa loob ng 24-48 oras para hindi naghihintay nang matagal ang mga tao
- **Maging malinaw sa dahilan ng pagtanggi** -- Tulungan ang mga tao na maunawaan ang susunod na hakbang o mga alternatibong opsyon
- **Suriin ang mga profile** -- Tingnan ang profile ng tao para malaman kung angkop siya sa grupo
- **Ipaalam ang inaasahan** -- Siguraduhing malinaw sa description ng grupo kung para kanino ito

## Mga Kaugnay na Artikulo {#related-articles}

- [Creating Groups](./creating-groups.md) -- Alamin kung paano mag-set up ng grupo at mag-configure ng join policy
- [Group Members](./group-members.md) -- Pamahalaan ang mga kasalukuyang miyembro ng grupo
- [Group Calendar](./group-calendar.md) -- Mag-iskedyul ng mga pagpupulong at event ng grupo
