---
title: "Paggawa ng Mga Grupo"
description: "Mag-set up ng bagong grupo sa B1 Admin, mula sa pagpili ng kategorya at pagbibigay ng pangalan hanggang sa pag-configure ng join policy, label, messaging, at mga setting ng attendance."
---

# Paggawa ng Mga Grupo

<div class="article-intro">

Madali ang paggawa ng grupo sa B1 Admin. Mag-se-set up ka ng kategorya, pangalanan ang iyong grupo, at pagkatapos i-configure ang mga setting nito. Tumutulong ang mga grupo na maayos ang iyong simbahan sa mga makabuluhang yunit gaya ng small group, committee, at klase.

</div>

## Training Video {#training-video}

<YouTube id="uG93pXVreNo" title="Creating Groups and Adding Members in B1" next="Group Join Requests and Group Calendars in B1" nextUrl="/docs/b1-admin/groups/group-join-requests" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng aktibong B1 Admin account na may permission na mamahala ng mga grupo. Tingnan ang [Roles & Permissions](../people/roles-permissions.md) kung hindi ka sigurado sa antas ng iyong access.
- Magpasya ng istruktura ng kategorya para sa iyong mga grupo (halimbawa, "Small Groups," "Ministries," "Committees"). Nakakatulong ang mga kategorya para maayos ang mga magkakaugnay na grupo.

</div>

## Pagdaragdag ng Bagong Grupo {#adding-a-new-group}

1. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas ng B1 Admin), i-expand ang **People**, at i-click ang **Groups**.
2. I-click ang **Add Group** sa header ng pahina. Bubukas ang form na **New Group** sa ilalim ng listahan. Maglagay ng **Category Name**. Nakakatulong ang mga kategorya para pagsama-samahin ang mga magkakaugnay na grupo (halimbawa, "Small Groups," "Ministries," o "Committees"). Kung umiiral na ang kategorya, maaari mo itong piliin mula sa listahan.
3. Ilagay ang **Name** ng grupo.
4. I-click ang **Add** (o **Cancel** para isara ang form). Lalabas sa listahan ang bago mong grupo, kasama ang kategorya nito sa ilalim ng pangalan.

## Pag-configure ng Mga Setting ng Grupo {#configuring-group-settings}

Kapag nagawa na ang iyong grupo, maaari mo nang punan ang karagdagang detalye:

1. I-click ang **pangalan ng grupo** sa listahan para buksan ito.
2. I-click ang button na **Edit** sa kaliwang bahagi ng pahina ng grupo, sa ilalim ng mga detalye ng grupo. Bubukas ang form na **Group Details**.
3. I-configure ang mga sumusunod na opsyon:
   - **Category Name** at **Group Name** -- Palitan ang kategorya ng grupo o pangalanan itong muli.
   - **Meeting Time** at **Meeting Location** -- Kailan at saan karaniwang nagkikita ang grupo (halimbawa, "Wednesdays at 7 PM" sa "Room 204").
   - **Description** -- Maikling buod ng layunin ng grupo, isinulat sa formatting editor. Nakikita ito ng mga miyembro.
   - **Photo** -- I-click ang photo box o **Add Photo** para pumili o mag-upload ng larawan para sa grupo.
   - **Slug** -- Ang maikling key name na ginagamit sa web address ng grupo sa site ng iyong simbahan.
   - **Labels** -- Magtalaga ng isa o higit pang deskriptibong label sa grupo (halimbawa, "In-Person", "Online", "New Members Welcome"). Malayang tag ang mga label na ikaw ang nagtatakda; lagyan ng check ang lahat ng angkop, o i-click ang **Add New Label** para gumawa ng bago. Maaaring gamitin ang mga label para i-filter ang mga grupo sa Groups Browser website element, at maaaring magpakita ang Group List website element ng mga grupong may iisang label lamang.
   - **Campus** -- Ang campus na kinabibilangan ng grupo, kung may higit sa isang campus ang iyong simbahan.
   - **Enrollment** -- Piliin kung sino ang maaaring sumali sa grupong ito:
     - **Open (members can join immediately)** -- Sinuman ay maaaring sumali nang walang approval
     - **Request to Join (leader approval required)** -- Kailangang magsumite ng join request na nangangailangan ng approval ang mga tao (tingnan ang [Group Join Requests](./group-join-requests.md))
     - **Closed (admin-add only)** -- Kailangang idagdag nang manu-mano ang mga miyembro ng mga lider o administrator
   - **Discussions** -- Ino-on o ino-off ang chat feed ng grupo, kung saan maaaring mag-post ang sinumang miyembro. Naka-on (**Yes**) bilang default.
   - **Announcements** -- Ino-on ang pangalawang chat feed na para lamang sa mga lider -- nababasa at napapatugunan ng mga miyembro, pero mga lider lamang ang maaaring mag-post. Naka-on (**Yes**) bilang default.
   - **Show roster on website** -- Itakda sa **Yes** para ilista ang mga miyembro ng grupo sa page nito sa website ng iyong simbahan.
   - **Confidential group** -- Itago ang grupo at ang roster nito sa mga pampublikong page, sa group finder, at sa mga hindi miyembro. Gamitin ito para sa mga sensitibong grupo gaya ng recovery o counseling ministry; ang mga miyembro ng grupo at ang staff ng simbahan lamang ang makakakita nito.
4. Para sa mga klase at silid ng mga bata, may karagdagang seksyon ang form na ito:
   - **Age & Grade** -- **Minimum Age** at **Maximum Age** (sa taon at buwan) at **Minimum Grade** at **Maximum Grade**, na ginagamit para magmungkahi ng tamang kuwarto sa check-in. Iwanang blangko (o **No limit**) kung walang limitasyon. Tingnan ang [Check-In Safety](../attendance/checkin-safety.md#age-and-grade-room-guidance).
   - **Check-In Capacity** -- **Capacity**, **Guest Capacity**, **Children per Volunteer**, **Minimum Volunteers**, at **Closed for Check-In**. Tingnan ang [Check-In Safety](../attendance/checkin-safety.md#room-capacity-and-closing-a-room).
   - **Attendance** -- **Track Attendance** (itakda sa **Yes** para itala ang [attendance](../attendance/tracking-attendance.md) para sa grupong ito), **Attendance Reminder Emails** (nagpapaalala sa mga lider ng grupo kapag may naganap na calendar event ng grupo kahapon pero walang naitalang attendance), **Parent Pickup**, at **Print Nametag** (mga opsyon sa check-in para sa mga grupo ng bata).
   - **Service Times (optional)** -- Pumili ng oras ng serbisyo sa **Add Service Time** at i-click ang plus button para maiugnay ang grupo rito; i-click ang remove icon sa tabi ng oras ng serbisyo para alisin ito. Tingnan ang [Attendance Setup](../attendance/setup.md) para sa mga detalye tungkol sa mga oras ng serbisyo.
5. I-click ang **Save** para ilapat ang iyong mga pagbabago, o **Cancel** para isara ang form nang hindi nagse-save.

Sa kaliwang bahagi ng pahina ng grupo ipinapakita ang kategorya ng grupo, meeting time at lokasyon, description, label, at oras ng serbisyo, kasama ang mga check mark para sa **Track Attendance**, **Print Nametag**, **Parent Pickup**, **Discussions**, at **Announcements** para makita mo agad kung alin ang naka-on.

:::tip
Ang malinaw na description at meeting time ay nakakatulong sa mga miyembro na malaman kung ano ang aasahan kapag sumali sila sa grupo.
:::

:::info
Kapag ino-off ang parehong Discussions at Announcements, tuluyang aalisin ang tab na Messages ng grupo sa member portal. Kapag isa lamang ang ino-off, nakatago ang tab nito at mapupunta ang mga miyembro sa feed na naka-on pa. Nananatili ang mga umiiral na mensahe sa alinmang kaso -- ang mga toggle ay kumokontrol lamang sa bagong pag-post.
:::

## Pagdo-duplicate ng Grupo {#duplicating-a-group}

Magsisimula ka ba ng bagong session ng paulit-ulit na klase o ministry? Sa halip na i-type muli ang lahat ng setting, i-duplicate ang umiiral na grupo:

1. Buksan ang grupo at i-click ang **Duplicate** (sa ilalim ng button na **Edit** sa kaliwang bahagi ng pahina ng grupo).
2. Kumpirmahin ang pag-duplicate.

Dinadala ng kopya ang mga setting ng orihinal -- kategorya, description, larawan, meeting time/lokasyon, enrollment, label, campus, chat feed, confidentiality, limitasyon sa edad at grado, check-in capacity, at mga opsyon sa attendance -- pero **hindi** ang mga miyembro o oras ng serbisyo nito. Agad bumubukas ang bagong grupo; pinangalanan ito ayon sa orihinal na may dagdag na " (Copy)," kaya palitan ang pangalan nito sa mga setting ng grupo.

## Pag-archive ng Grupo {#archiving-a-group}

Kapag hindi na aktibo ang isang grupo pero gusto mong panatilihin ang kasaysayan nito sa halip na burahin:

1. Buksan ang grupo at i-click ang **Edit** para i-edit ang mga setting nito.
2. I-click ang **Archive** at kumpirmahin.

Nawawala sa pangunahing listahan ng Groups ang mga naka-archive na grupo. Para mahanap ulit ito, i-click ang button na **Show archived** sa tabi ng mga button ng kategorya sa itaas ng pahina ng Groups, pagkatapos i-click ang **Restore** sa tabi ng grupo at kumpirmahin para maibalik ito.

:::info
Ang pag-archive ng grupo ay hindi nagbubura ng mga miyembro, kasaysayan ng attendance, o calendar event nito -- itinatago lamang nito ang grupo sa default na listahan hanggang maibalik mo ito.
:::

## Pagbura ng Grupo {#deleting-a-group}

Para permanenteng alisin ang grupo, buksan ito, i-click ang **Edit**, i-click ang **Delete** sa ibaba ng form na **Group Details**, at kumpirmahin. Hindi na mababawi ang pagbura -- kung posibleng kailanganin mo ang kasaysayan ng grupo sa hinaharap, [i-archive](#archiving-a-group) na lamang ito.

## Mga Susunod na Hakbang {#next-steps}

Pagkatapos gawin at i-configure ang iyong grupo, handa ka nang:

- **Magdagdag ng mga miyembro** -- Maghanap ng mga tao at idagdag sila sa grupo. Gamitin ang star icon (**Make Leader**) para magtalaga ng mga lider ng grupo. Tingnan ang [Group Members](./group-members.md).
- **Mag-set up ng calendar** -- Gumawa ng mga event at paulit-ulit na pagpupulong para sa grupo. Tingnan ang [Group Calendar](./group-calendar.md).
- **Makipag-usap** -- Mag-email, mag-text, o magpadala ng push notification sa mga miyembro ng grupo mula sa page ng grupo. Tingnan ang [Group Members](./group-members.md#emailing-group-members).
- **Mag-export ng datos** -- I-click ang **Export** sa itaas ng listahan ng miyembro ng grupo para i-download ito. Para i-download ang buong listahan ng mga grupo, i-click ang **Export** sa header ng pahina ng Groups.

:::info
Bawat grupo ay kabilang sa isang kategorya, at pinapayagan ka ng pangunahing pahina ng Groups na i-filter ang listahan ayon sa kategorya. Maaari mong ayusin o palitan ang pangalan ng mga kategorya habang lumalaki ang iyong simbahan.
:::
