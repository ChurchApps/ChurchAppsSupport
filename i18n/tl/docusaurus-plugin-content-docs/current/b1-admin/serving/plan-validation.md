---
title: "Pagsusuri ng Plan at mga Notification"
description: "Suriin ang mga service plan sa B1 Admin para sa mga hindi napunang posisyon, banggaan sa iskedyul, at mga volunteer na naka-block out, pagkatapos i-push-notify ang buong team sa isang click."
---

# Pagsusuri ng Plan at mga Notification sa Volunteer {#plan-validation-volunteer-notifications}

<div class="article-intro">

Awtomatikong sinusuri ng B1 Admin ang iyong mga plan para sa mga problema bago ang Linggo -- mga hindi napunang posisyon, banggaan sa iskedyul, at mga volunteer na nag-block out ng petsa. Kapag maayos ang lahat, maaari mong i-notify ang buong team mo sa isang click lang.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Gumawa ng [service plan](./plans.md) at mag-assign ng mga volunteer sa mga posisyon
- Magdagdag ng [service times](./plans.md) sa plan para makapag-check ang conflict detection ng mga magkapatong na oras
- Tiyaking may [naka-install na B1 App](../../b1-church/getting-started/installing-pwa.md) ang mga volunteer para makatanggap ng push notification

</div>

## Ang Validation Panel {#the-validation-panel}

May panel na **Validation** ang bawat plan na awtomatikong tumatakbo habang binubuo mo ito. Buksan ang plan at i-click ang **Manage serving team** para makita ito sa tabi ng mga posisyon. Ang mismong plan page ay nagpapakita ng isang linyang buod sa ilalim ng **Serving team** (halimbawa, "2 conflicts · 3 not notified") na may link na **Review** papunta sa buong panel. Nakalista rin sa plan page ang mga posisyong kailangan pa ng tao, kaya ang linya ng buod ay nagbibilang lamang ng mga conflict at mga volunteer na hindi pa na-notify.

Sinusuri ng panel ang mga sumusunod:

### Mga Hindi Napunang Posisyon {#unfilled-positions}
Kung mas maraming tao ang kailangan ng isang posisyon kaysa sa kasalukuyang naitalaga, ililista ng validation panel kung ano eksakto ang kulang -- halimbawa, *"Sound Tech: 1 more person needed."* Makikita mo sa isang tingin kung kumpleto na ang staffing ng plan bago dumating ang linggo.

### Mga Banggaan sa Iskedyul {#scheduling-conflicts}
Kung naitalaga ang isang volunteer sa dalawang posisyon na nagkakapatong sa oras sa loob ng iisang plan, mamarkahan ito ng validation panel bilang conflict -- halimbawa, *"Jane Smith: time conflict between Worship Leader and Children's Check-in during Sunday Service."* Nahuhuli nito ang mga double-booking bago pa maging problema sa Linggong umaga.

### Mga Blockout Date {#blockout-dates}
Maaaring magtakda ang mga volunteer ng mga petsang hindi sila available sa B1 App. Kung may naitalagang tao sa plan na nasa loob ng isa sa kanyang blockout date, awtomatikong ipapakita ng validation panel ang conflict para makahanap ka ng kapalit.

Namamarkahan din ang mga volunteer na naka-block out habang nag-iiskedyul ka. Sa serving team page at sa dialog na **Assign Position**, may pulang badge na **Unavailable** ang kanilang pangalan; i-hover ito para makita ang mga petsa (halimbawa, *Blocked out: Nov 22, 2026 – Nov 29, 2026*). Sa dialog na **Assign Position**, nakalista sila pagkatapos ng iba pa sa team, at maaari mo pa rin silang i-assign. Sa grid ng [Plans Overview](./plans-overview.md), may maliit na pulang calendar icon sa tabi ng pangalan na nagpapahiwatig ng parehong bagay.

Para sa mga volunteer na hindi gumagamit ng app, maaaring maglagay ang staff ng block-out date para sa kanila. Buksan ang team (mula sa listahang **Serving Teams** ng ministry) at mag-scroll pababa sa card na **Block-out dates** sa ilalim ng listahan ng miyembro, na nagpapakita ng mga paparating na block-out ng bawat miyembro ng team kasama ang **Team member**, **From**, at **To**:

1. I-click ang **Add block-out**.
2. Piliin ang **Team member**, pagkatapos itakda ang mga petsang **From** at **To**.
3. I-click ang **Save**.

Para mag-alis ng isa, i-click ang delete icon sa row nito at kumpirmahin. Ang pagdaragdag at pag-alis ng block-out ay nangangailangan ng pahintulot na mag-edit ng plan; ang iba pang magbubukas ng team ay makakakita lamang ng listahan.

### Mga Conflict sa Pagitan ng Plan {#cross-plan-conflicts}
Sinusuri rin ng validation ang lahat ng plan mo nang sabay-sabay. Kung ang parehong volunteer ay naitalaga sa dalawang magkaibang plan na nagkakapatong sa oras -- halimbawa, isang 9am na serbisyo at isang 10am na serbisyo na parehong tumatagal hanggang 10:30am -- mamarkahan ng B1 Admin ang taong iyon bilang double-booked sa pagitan ng mga plan.

### Mga Kagustuhan sa Pag-iskedyul {#scheduling-preferences}
Kung may [mga kagustuhan sa pag-iskedyul](./plans.md#scheduling-preferences) ang isang volunteer, binabalaan ka ng panel kapag may assignment na sumasalungat sa mga ito: kapag mas maraming beses siyang naiskedyul ngayong buwan kaysa sa kanyang **Max times per month**, kapag walang tugma ang mga oras ng plan sa kanyang **Preferred service times**, o kapag humiling siyang huwag maglingkod sa parehong araw ng kanyang pamilya at may kasamahan sa pamilya na naiskedyul din.

Kapag tama ang lahat, ang nakasulat sa panel ay **Plan is valid.**

:::tip
Hindi mo kailangang gumawa ng anuman para patakbuhin ang validation -- awtomatiko itong nag-a-update tuwing magdaragdag o magbabago ka ng assignment. Bantayan lamang ang panel habang binubuo mo ang plan.
:::

## Pag-notify sa mga Volunteer {#notifying-volunteers}

Kapag tapos na ang plan, maaari mong i-notify ang lahat ng naitalagang volunteer nang sabay-sabay mula mismo sa validation panel.

1. Buksan ang plan at i-click ang **Manage serving team** (o ang **Review** sa linya ng buod ng plan) para makita ang panel na **Validation**.
2. Kung may mga volunteer na hindi pa na-notify, makikita mo ang link na nagpapakita kung ilan ang kailangang i-notify (halimbawa, *"Notify 8 volunteer(s)"*). Kapag na-notify na ang lahat, ang nakasulat sa panel ay **All volunteers notified.**
3. I-click ang link para magpadala ng push notification sa lahat ng hindi pa na-notify.
4. Makakatanggap ang mga volunteer ng notification sa kanilang telepono na nagsasabing naiskedyul na sila at hinihikayat silang kumpirmahin ang kanilang assignment.

:::info
Tanging ang mga volunteer na hindi pa na-notify ang isasama. Kung magdadagdag ka ng tao sa plan sa ibang pagkakataon, lilitaw muli ang link para ma-notify ang bagong dagdag nang hindi na muling ina-abisuhan ang iba pang team.
:::

### Pag-publish ng Penciled-In na Plan {#publishing-a-penciled-in-plan}

Kung [penciled in](./plans.md#plan-settings) ang plan, hindi pa makikita ng mga volunteer ang kanilang assignment, at nagpapakita ang panel ng *"Penciled in — volunteers can't see these assignments yet."* kasama ang button sa halip na notify link:

- Ginagawang nakikita ng **Publish Plan** ang mga assignment.
- Ginagawang nakikita ng **Publish & Notify** (lumalabas kapag may mga volunteer na hindi pa na-notify, halimbawa *"Publish & Notify 8 volunteer(s)"*) ang mga assignment at agad na ina-abisuhan ang mga volunteer na iyon.

Kumpirmahin sa dialog para i-publish.

### Mga Plan na May Confirmation Workflow {#plans-with-a-confirmation-workflow}

Kung ang settings ng plan ay nagpapangalan ng [confirmation workflow](./workflows.md#serving-assignment-confirmations), nagpapakita ang panel ng *"New requests use the confirmation workflow. App alerts stay enabled. Follow-ups stop when each request is accepted or declined."* Sa ganitong kaso:

- Ang notify link ay nagbibilang lamang ng mga volunteer na hindi pa na-notify at hindi pa tumutugon.
- Ang pag-click dito ay nagpapadala ng karaniwang in-app alert at nagsisimula ng isang card bawat request sa board ng workflow. Ang workflow na ang nagpapadala ng follow-up sa email at text at, kung kailangan, ibinibigay ang request sa isang taong tatawag.
- Dapat na-publish ang plan (hindi penciled in) at aktibo ang workflow. Kung hindi, magpapakita ang panel ng *"Requests could not be issued. Check that the selected workflow is active and the plan is published, then try again."*

:::warning
Kailangang naka-install ang B1 App sa home screen ng mga volunteer at naka-on ang notification para makatanggap ng push notification. Tingnan ang [Installing as an App (PWA)](../../b1-church/getting-started/installing-pwa.md) para sa mga tagubilin sa setup.
:::

## Mga Kaugnay na Artikulo {#related-articles}

- [Service Plans](./plans.md)
- [Workflows](./workflows.md)
- [Pag-install ng B1.church PWA](/docs/b1-church/getting-started/installing-pwa)
