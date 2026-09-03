---
title: "Service Plans"
---

# Service Plans

<div class="article-intro">

Ang mga service plan ay nag-organize kung sino ang naglilingkod at kailan. Bawat plan ay nakatali sa isang specific na petsa at ministry, na ginagawang madali ang coordinate ng iyong volunteer team linggo-linggo at tiyakin na ang bawat serbisyo ay puno ng staff.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- I-setup ang iyong mga ministry at team sa Serving area
- Tiyakin na ang mga volunteer ay naidagdag sa iyong [people directory](../people/adding-people.md) at na-assign sa teams

</div>

## Pag-access ng Mga Plan

1. Mag-navigate sa **Serving** mula sa main menu.
2. Piliin ang **ministry tab** sa tuktok ng pahina.
3. I-click ang **plan type** upang makita ang listahan ng mga plan para sa uri na iyon.
4. I-click ang isang specific na plan upang buksan ito.

:::info
Full admin access ay hindi kinakailangan upang i-manage ang mga plan. Ang sinuman na miyembro ng isang ministry ay maaaring mag-navigate sa Serving at lumikha, mag-edit, at mag-schedule ng mga plan para sa kanilang sariling ministry nang hindi kailangan ang Plans Edit permission. Ang mga editor na may Plans Edit role ay maaaring i-manage ang mga plan sa lahat ng ministry.
:::

## Lumilikha ng Isang Plan

1. Mula sa plan type view, i-click ang **New Plan**.
2. Bigyan ng pangalan ang plan o gamitin ang petsa bilang pangalan. Piliin ang **date** para sa serbisyo.
3. Kung gusto mong kopyahin mula sa nakaraang plan, pumili ng mga posisyon lamang o mga posisyon at assignment. Kung hindi mo gusto na kopyahin, basta pumili ng walang. Maaari mo rin kopyahin ang order ng serbisyo mula sa aking nakaraang plan.
4. I-save ang plan. Maaari mo na ngayon magsimulang mag-assign ng mga miyembro ng team at bumuo ng [service order](./service-order.md).

## Ang Plan Detail Page

Kapag buksan mo ang isang plan, makikita mo ang dalawang tab:

- **Assignments** -- I-manage kung aling mga miyembro ng team ay na-assign sa plan na ito. Maaari kang magdagdag ng mga tao mula sa iyong umiiral na mga team at makita kung sino ang nag-confirm o pa rin ang pending.
- **[Service Order](./service-order.md)** -- Bumuo ng order ng serbisyo na may mga elemento tulad ng worship songs, prayers, announcement, at ang sermon.

## Pag-assign ng Mga Miyembro ng Team

1. Buksan ang isang plan at pumunta sa **Assignments** tab.
2. I-click ang **add Position** upang palawakin ito. Punan ang impormasyon sa form ng pagdagdag ng posisyon. Para sa pangalan ng kategorya magdagdag ng kahit anong kategorya na gusto mo.
3. I-click ang **People Needed** at pumili ng mga volunteer upang punan ang posisyong iyon.
4. Magdagdag ng mga miyembro mula sa iyong team roster sa pamamagitan ng pag-click ng **Add**.
5. Ang mga na-assign na miyembro ay lalabas sa ilalim ng kanilang team na may kanilang assignment status.
6. I-click ang notify volunteers upang mag-notify sa kanila sa loob ng B1 app o sa pamamagitan ng email.

Bawat posisyon ay nagpapakita ng count chip (halimbawa, "2/3") upang makita mo kung gaano karaming puwang ang puno nang mabilis. Sa tuktok ng Assignments tab, isang progress bar at isang summary chip ("X ng Y posisyon na puno") ay nagpapakita ng iyong kabuuang pag-staff para sa plan, na lumipat sa **Fully staffed** kapag saklaw ang bawat posisyon.

:::tip
I-setup ang iyong mga team sa mga setting ng ministry bago lumikha ng mga plan. Sa ganitong paraan, magkakaroon ka ng ready pool ng mga volunteer na mag-assign mula.
:::

## Mga Setting ng Plan

Bawat plan ay may mga karagdagang setting na maaari mong i-configure sa pamamagitan ng pag-click ng edit (pencil) icon sa plan. Ang mga ito ay kasama:

- **Signup Deadline** — ang bilang ng oras bago ang serbisyo kapag ang volunteer signup ay nagsasara. Magpasok ng negative na numero upang panatilihing bukas ang signup na lumampas sa service start time.
- **Show volunteer names on signup page** — kapag sinuri, ang mga volunteer ay makikita kung sino pang na-sign up para sa bawat posisyon.
- **Penciled in** — nagtago ng assignment mula sa mga volunteer hanggang handa ka nang i-publish ang schedule.
- **Automatically schedule a replacement when a volunteer declines** — kapag sinuri, kung ang isang na-assign na volunteer ay tumanggi ng kanilang posisyon ang B1 ay awtomatikong makipag-ugnayan sa susunod na available na taong sa team roster at itanong kung maaari sila maglingkod. Ito ay patuloy na bumaba sa listahan hanggang sa pumayag ang sino, na nagpapanatili ng iyong mga puwang na puno nang walang manual na follow-up.

## Mga Volunteer Reminder

Ang B1 ay maaaring awtomatikong mag-remind ng mga volunteer bago ang mga serbisyo na na-schedule sila, kaya hindi mo kailangang hulihin ang iyong team bawat linggo. Ang mga reminder ay napupunta sa **lahat na na-schedule** — kapwa ang mga nag-confirm at ang mga hindi pa sumagot — sa pamamagitan ng email at bilang isang in-app/push notification. Bawat reminder ay kasama ang posisyon ng volunteer, ang petsa ng serbisyo, ang mga tala ng plan, at ang iyong custom message.

Ang reminder timing at nilalaman ay itinakda bawat **plan type**, kaya ang bawat uri ng serbisyo ay maaaring panatilihin ang sarili nitong iskedyul.

1. Mula sa **Serving** area, piliin ang ministry na naglalaman ng uri ng plan.
2. I-click ang **edit (pencil) icon** sa tabi ng uri ng plan.
3. Sa **Reminders** section, itakda ang:
   - **Reminder days before service** — isang comma-separated list kung gaano maraming araw ng mauna upang magpadala, halimbawa `7,1,0`. Gamitin ang `0` upang magpadala ng reminder sa araw ng serbisyo. Iwanan ang field na ito blangko upang i-turn off ang mga reminder para sa ganitong uri ng plan.
   - **Custom reminder message** *(optional)* — karagdagang teksto na idinagdag sa reminder, tulad ng "Dumalo 30 minuto ng maaga upang mag-rehearse."
