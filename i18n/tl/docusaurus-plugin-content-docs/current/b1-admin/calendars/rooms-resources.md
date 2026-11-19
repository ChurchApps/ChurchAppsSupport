---
title: "Mga Kuwarto, Resource at Pag-iiskedyul"
description: "I-set up ang mga kuwarto, kagamitan, blockout, at event template sa B1 Admin para makahiling ng booking ang mga grupo at ma-approve mo ang mga ito para maiwasan ang dobleng booking."
---

# Mga Kuwarto, Resource at Pag-iiskedyul

<div class="article-intro">

Hinahayaan ka ng Rooms at Resources na subaybayan ang mga espasyo at kagamitan ng iyong simbahan na maaaring i-book. Kapag gustong gamitin ng isang grupo o team ang kuwarto o humiram ng resource para sa isang event, maaari nilang hilingin ito sa pamamagitan ng B1 -- at maaari mong aprubahan o tanggihan ang mga kahilingang iyon para maiwasan ang dobleng booking.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ang **Edit Content** permission
- I-set up ang [mga grupo](../groups/creating-groups.md) na ang mga miyembro ay magsusumite ng mga kahilingan sa booking

</div>

## Pagbubukas ng Rooms & Resources {#opening-rooms--resources}

Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), i-expand ang **Calendars**, at i-click ang **Rooms & Resources**. May apat na tab ang pahina: **Rooms**, **Resources**, **Blockouts**, at **Templates**. Nagbabago ang add button sa itaas ng pahina ayon sa napiling tab, at may kahon na **Find** para i-filter ang kasalukuyang listahan.

## Mga Kuwarto {#rooms}

Ang mga kuwarto ay pisikal na espasyong maaaring i-reserve kasabay ng mga calendar event -- isang santuwaryo, fellowship hall, silid-aralan, at iba pa.

### Pagdaragdag ng Kuwarto {#adding-a-room}

1. Sa **Rooms** tab, i-click ang **Add Room** sa itaas ng pahina.
2. Ilagay ang **Room Name**.
3. Opsyonal na itakda ang **Capacity** (pinakamaraming bilang ng tao) at **Description**. Parehong lumalabas sa tabi ng kuwarto kapag pumipili ang mga tao ng kuwarto para sa event.
4. Magtakda ng **Approval Group** kung kailangan ng pirma sa mga booking. Awtomatikong naaaprubahan ang mga booking na ginawa ng mga miyembro ng grupong iyon; ang booking ng iba ay maghihintay bilang **Pending** hanggang maaprubahan ito sa [Approvals](./approvals.md) page, at makakatanggap ng email ang mga miyembro ng grupo tungkol sa mga bagong kahilingan. Iwanan sa **No approval needed** para awtomatikong maaprubahan ang bawat booking.
5. I-click ang **Save**.

Ipinapakita ng listahan ng Rooms ang **Room Name**, **Capacity**, at **Approval Group** ng bawat kuwarto. Ang mga kuwartong naka-off ay may badge na **Inactive** sa tabi ng pangalan nila.

### Pag-edit o Pagbura ng Kuwarto {#editing-or-deleting-a-room}

I-hover ang isang kuwarto at i-click ang **Edit**, gawin ang mga pagbabago, at i-click ang **Save**. Gamitin ang **Delete** para permanenteng alisin ang kuwarto.

Kung sarado ang isang kuwarto nang ilang panahon -- renovation, season, o walang nakatakdang petsa ng pagbabalik -- i-off ang switch na **Active** nito at i-click ang **Save** sa halip na burahin ito. Pinananatili ng inactive na kuwarto ang mga detalye nito at bawat nakaraang booking, ngunit hindi na ito lumalabas sa mga listahan ng kuwarto kapag may nagsisiskedyul ng event o humihiling ng kuwarto. I-on muli ang switch para maging available ulit ito sa pag-book. Mas mainam ang blockout kapag sarado ang kuwarto sa partikular na mga petsa, dahil nananatili ang kuwarto sa listahan at nagbababala ito tungkol sa mga booking sa mga petsang iyon.

## Mga Resource {#resources}

Ang mga resource ay mga gamit na maaaring i-book kasama ng isang event -- AV equipment, projector, upuan, van, at iba pa.

### Pagdaragdag ng Resource {#adding-a-resource}

1. I-click ang **Resources** tab, pagkatapos ang **Add Resource**.
2. Ilagay ang **Resource Name** at opsyonal na **Description**.
3. Itakda ang **Quantity** na mayroon ka (halimbawa, 3 projector). Bawat event ay nagbu-book ng isa, at nagbababala ang B1 kapag mas maraming event sa parehong oras ang nagbu-book nito kaysa sa dami mo.
4. Magtakda ng **Approval Group** kung may kailangang pumirma sa paghiram ng resource. Pareho itong gumagana sa mga kuwarto.
5. I-click ang **Save**.

I-edit o burahin ang resource sa parehong paraan ng kuwarto. Mayroon ding switch na **Active** ang resource: i-off ito para alisin ang resource sa mga listahan ng resource nang hindi nawawala ang mga detalye o nakaraang booking nito.

## Mga Blockout {#blockouts}

Pinipigilan ng mga blockout ang pag-book ng mga kuwarto o resource sa ilang partikular na oras -- para sa renovation, nakalaang panahon, o maintenance.

### Pagdaragdag ng Blockout {#adding-a-blockout}

1. I-click ang **Blockouts** tab, pagkatapos ang **Add Blockout**.
2. Sa **Applies To**, pumili ng isang kuwarto, isang resource, o **All rooms & resources**.
3. Itakda ang **Start** at **End** na petsa/oras ng blockout.
4. Opsyonal na magdagdag ng **Reason**. Ipinapakita ito sa [Availability](./availability.md) calendar bilang *Blocked: reason*.
5. I-click ang **Save**.

Ang mga event na nagbu-book ng naka-blockout na kuwarto o resource ay nagpapakita ng babala ng conflict sa event editor.

## Mga Event Template {#event-templates}

Hinahayaan ka ng mga template na mag-save ng reusable na setup ng event -- title, description, haba, kuwarto, at resource -- para ang mga event na madalas mong gawin ay pareho ang pagkaka-set up sa bawat pagkakataon.

### Pagdaragdag ng Template {#adding-a-template}

1. I-click ang **Templates** tab, pagkatapos ang **Add Template**.
2. Ilagay ang **Template Name** (ipinapakita kapag pumipili ng template).
3. Punan ang **Event Title**, **Event Description**, at **Duration (minutes)** na gagamitin para sa mga bagong event.
4. Opsyonal na piliin ang **Rooms** at **Resources** na i-book.
5. I-click ang **Save**.

Kapag gumagawa ng bagong event, piliin ang template sa **Template** box ng event editor para punan ang title, description, kuwarto, at resource, at itakda ang end time mula sa haba ng template (itakda muna ang **Start**). Ikaw pa rin ang pipili ng **Group** ng event. Lumalabas lamang ang **Template** box kapag kahit isang template ay umiiral na.

## Mga Kaugnay na Artikulo {#related-articles}

- [Availability Calendar](./availability.md) — tingnan ang lahat ng booking sa isang sulyap at mag-book ng kuwarto o resource nang direkta
- [Calendar Approvals](./approvals.md) — i-approve o tanggihan ang mga kahilingan sa booking ng kuwarto at resource
- [Creating Calendars](./creating-calendars.md) — mag-set up ng mga calendar ng event
- [Creating Groups](../groups/creating-groups.md) — mag-set up ng mga grupong maaaring mag-book ng kuwarto at resource
