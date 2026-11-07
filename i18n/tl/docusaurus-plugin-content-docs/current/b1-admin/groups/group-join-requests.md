---
title: "Mga Join Request sa Grupo"
description: "Suriin, aprubahan, o tanggihan ang join request sa grupo sa B1 Admin, hanapin ang nakabinbin bilang leader o admin, at maglagay ng dahilan kapag tinanggihan."
---

# Mga Join Request sa Grupo

<div class="article-intro">

Kapag naka-configure ang grupo na may join policy na nangangailangan ng pag-apruba, maaaring magsumite ng request ang mga tao para sumali. Sinusuri at inaaprubahan o tinatanggihan ng mga group leader at administrator ang mga request na ito. Sa ganitong paraan, may kontrol ang iyong simbahan sa membership ng grupo habang madali para sa mga tao na ipahayag ang kanilang interes na sumali.

</div>

## Training Video

<YouTube id="1vj-suCiIsE" title="Group Join Requests and Group Calendars in B1" next="Setting Up Services and Attendance in B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng permiso sa pamamahala ng mga grupo, o dapat ikaw ay leader ng partikular na grupo. Tingnan ang [Roles & Permissions](../people/roles-permissions.md) para sa mga detalye.
- Dapat nakatakda sa **Request** ang join policy ng grupo (kailangan ng pag-apruba). Tingnan ang [Creating Groups](./creating-groups.md) para malaman kung paano i-configure ang mga join policy.

</div>

## Pag-unawa sa Mga Join Policy

Maaaring may tatlong magkakaibang join policy ang mga grupo:

- **Open** -- Sinuman ay maaaring sumali kaagad nang walang pag-apruba
- **Request** -- Nagsusumite ang mga tao ng join request na nangangailangan ng pag-apruba
- **Closed** -- Walang sinuman ang makakapag-request na sumali (dapat idagdag nang manual ang mga miyembro)

Kapag gumagamit ang grupo ng **Request** policy, dumadaan lahat ng pagtatangkang sumali sa approval workflow na inilalarawan sa pahinang ito.

## Pagtingin sa Mga Nakabinbing Request

### Para sa Mga Group Leader

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) at piliin ang **People > Groups**
2. I-click ang pangalan ng grupo
3. Ipinapakita ng seksyong **Members** kung ilan ang nakabinbing request. I-click ang **All members** -- lalabas ang mga nakabinbing request para sa grupong ito sa itaas ng listahan ng miyembro

### Para sa Mga Administrator

Ang mga administrator na may permiso sa pamamahala ng grupo ay maaaring tingnan ang mga nakabinbing request sa lahat ng grupo:

1. Sa Jump menu, piliin ang **People > Groups**
2. I-click ang butones na **pending requests** sa header ng pahina (halimbawa, "3 pending requests"). Lumalabas lang ito kapag may naghihintay na request.
3. Suriin ang lahat ng nakabinbing request sa buong simbahan

## Pagrepaso sa Join Request

Ipinapakita ng bawat join request ang:

- **Pangalan at larawan ng tao** -- ang taong humihiling na sumali
- **Opsyonal na mensahe** -- personal na mensahe na nagpapaliwanag kung bakit gustong sumali (kung ibinigay)
- **Petsa ng request** -- kung kailan isinumite ang request

Para repasuhin ang isang request:

1. Basahin ang mensahe ng tao kung nagbigay siya nito
2. I-click ang pangalan ng tao para tingnan ang kanyang profile kung kailangan
3. Magpasya kung aaprubahan o tatanggihan

## Pag-apruba ng Request

1. I-click ang **Approve** sa join request
2. Agad idinadagdag ang tao sa grupo bilang miyembro
3. Makakatanggap ang nag-request ng notification na naaprubahan ang kanyang request
4. Mamarkahan ang request bilang naaprubahan sa sistema

:::tip
Kapag inaprubahan mo ang request, nagiging regular na miyembro ng grupo ang tao. Maaari mo siyang i-promote sa group leader sa ibang pagkakataon mula sa pahina ng [Group Members](./group-members.md) kung kinakailangan.
:::

## Pagtanggi sa Request

1. I-click ang **Decline** sa join request
2. Opsyonal na magbigay ng dahilan sa pagtanggi (hanggang 500 character)
3. I-click ang **Confirm**
4. Makakatanggap ang nag-request ng notification kasama ang iyong dahilan sa pagtanggi (kung ibinigay)
5. Mamarkahan ang request bilang tinanggihan

:::info
Ang pagbibigay ng dahilan sa pagtanggi ay nakakatulong sa tao na maunawaan kung bakit hindi naaprubahan ang kanyang request at maaaring mag-udyok sa kanya na subukan ulit sa hinaharap o tumingin ng ibang grupo.
:::

## Pag-apruba Mula sa Tasks Page {#approving-from-the-tasks-page}

Bawat join request ay lumilikha rin ng task sa ilalim ng **Serving &rarr; My Work**, na pinamagatang "*Person* requested to join *Group*." Itinalaga ito sa mga leader ng grupo. Kung wala pang leader ang grupo, mapupunta ito sa sinumang staff na may permiso na **Group Members &gt; Edit**, o sa mga domain admin ng iyong simbahan kung walang may ganoong permiso. Ang mga staff at admin na nakatanggap ng task sa paraang ito ay makakatanggap din ng notification na direktang nagli-link dito.

Kapag binuksan ang task, makikita ang pangalan ng nag-request, ang grupo, at ang opsyonal nilang mensahe, kasama ang mga butones na **Approve** at **Decline** mismo sa task card (ang Decline ay nagbubukas ng parehong opsyonal na field ng dahilan na inilarawan sa itaas). Sa ganitong paraan, may pangalawang paraan ang mga leader para kumilos sa request na nakabatay sa notification, nang hindi binubuksan ang listahan ng miyembro ng grupo.

Ang pagpapasya sa request mula sa alinman sa dalawang lugar -- ang listahan ng miyembro ng grupo o ang Tasks card -- ay isinasara ito sa lahat ng lugar, kaya hindi kailanman makakakita ang mga leader ng lumang task para sa request na naasikaso na ng iba.

## Mga Notification

Awtomatikong nagpapadala ng notification ang sistema ng join request:

- **Kapag may isinumiteng request** -- Lahat ng group leader ay makakatanggap ng notification. Kung walang leader ang grupo, ang staff o admin na itinalaga sa task ang aabisuhan sa halip (tingnan sa itaas).
- **Kapag naaprubahan ang request** -- Makakatanggap ang nag-request ng kumpirmasyon
- **Kapag tinanggihan ang request** -- Makakatanggap ang nag-request ng notification kasama ang anumang dahilan sa pagtanggi

Lumalabas ang mga notification sa notification center ng user sa B1.church at sa mobile app. Sa notification bell ng B1 Admin, kapag na-click ang notification ng join request (o ang **View Details** nito), magbubukas ang grupo sa B1.church site ng iyong simbahan sa bagong tab.

## Pamamahala ng Mga Request Mula sa Panig ng Miyembro

Maaaring pamahalaan ng mga tao ang sarili nilang join request mula sa B1.church:

- Tingnan ang status ng kanilang mga nakabinbing request sa detail page ng grupo
- Kanselahin ang nakabinbing request kung magbago ang isip nila
- Tingnan kung naaprubahan o tinanggihan ang kanilang request

## Mga Mabuting Kasanayan

- **Tumugon agad** -- Subukang repasuhin ang mga request sa loob ng 24-48 oras para hindi naghihintay nang matagal ang mga tao
- **Maging malinaw sa dahilan ng pagtanggi** -- Tulungan ang mga tao na maunawaan ang mga susunod na hakbang o alternatibong opsyon
- **Suriin ang mga profile** -- Tingnan ang profile ng tao para malaman kung bagay siya sa grupo
- **Ipaalam ang inaasahan** -- Siguraduhing malinaw sa deskripsyon ng grupo kung para kanino ang grupo

## Mga Kaugnay na Artikulo

- [Creating Groups](./creating-groups.md) -- Alamin kung paano mag-set up ng grupo at mag-configure ng join policy
- [Group Members](./group-members.md) -- Pamahalaan ang mga umiiral nang miyembro ng grupo
- [Group Calendar](./group-calendar.md) -- Mag-iskedyul ng mga pagpupulong at event ng grupo
