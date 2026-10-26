---
title: "Plan Validation & Notifications"
---

# Plan Validation & Volunteer Notifications

<div class="article-intro">

Awtomatikong sinusuri ng B1 Admin ang iyong mga plan para sa mga problema bago ang Linggo: mga posisyong hindi pa napupunan, mga banggaan sa iskedyul, at mga volunteer na nag-block out ng petsa. Kapag maayos ang lahat, maaari mong abisuhan ang buong team mo sa isang click lang.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Gumawa ng [service plan](./plans.md) at magtalaga ng mga volunteer sa mga posisyon
- Magdagdag ng [mga oras ng service](./plans.md) sa plan para matukoy ng conflict detection ang mga magkakapatong na oras
- Tiyaking may naka-install na B1 Mobile app ang mga volunteer para makatanggap ng push notification

</div>

## Ang Validation Panel

Bawat plan ay may **Validation** panel na awtomatikong tumatakbo habang binubuo mo ito. Tatlong bagay ang sinusuri nito:

### Mga Hindi Napunang Posisyon
Kung ang isang posisyon ay nangangailangan ng mas maraming tao kaysa sa kasalukuyang naka-assign, ililista ng validation panel kung ano ang kulang pa, halimbawa, *"Sound Tech: 1 more person needed."* Makikita mo agad kung kumpleto na ang staffing ng plan bago dumating ang linggo.

### Mga Banggaan sa Iskedyul
Kung ang isang volunteer ay naka-assign sa dalawang posisyon na nagkakapatong sa oras sa loob ng iisang plan, mamarkahan ito ng validation panel bilang conflict, halimbawa, *"Jane Smith: time conflict between Worship Leader and Children's Check-in during Sunday Service."* Nahuhuli nito ang double-booking bago pa ito maging problema tuwing Linggo ng umaga.

### Mga Blockout Date
Maaaring magtakda ang mga volunteer ng mga petsa na hindi sila available sa B1 Mobile. Kung may naka-assign sa kanilang plan na tumapat sa isa sa kanilang blockout date, awtomatikong ipapakita ng validation panel ang conflict para makahanap ka ng kapalit.

### Mga Conflict sa Iba't Ibang Plan
Sinusuri din ng validation ang lahat ng plan mo nang sabay-sabay. Kung ang parehong volunteer ay naka-assign sa dalawang magkaibang plan na nagkakapatong sa oras, halimbawa, ang serbisyo ng 9am at ang serbisyo ng 10am na parehong tumatagal hanggang 10:30am, mamarkahan ng B1 Admin ang taong iyon bilang double-booked sa magkakaibang plan.

:::tip
Hindi mo kailangang gawin ang anuman para patakbuhin ang validation. Awtomatiko itong nag-a-update tuwing magdadagdag ka o magbabago ng assignment. Bantayan lang ang panel habang binubuo mo ang plan.
:::

## Pag-abiso sa mga Volunteer

Kapag tapos na ang plan, maaari mong abisuhan ang lahat ng naka-assign na volunteer nang sabay-sabay mula sa validation panel.

1. Buksan ang plan at mag-scroll sa **Validation** panel
2. Kung may mga volunteer na hindi pa nababatid, makikita mo ang link na nagpapakita kung ilan ang kailangang abisuhan (halimbawa, *"Notify 8 volunteers"*)
3. I-click ang link para magpadala ng push notification sa lahat ng hindi pa nababatiran
4. Makakatanggap ang mga volunteer ng notification sa kanilang telepono na nagsasabing naka-iskedyul sila at hinihilingang kumpirmahin ang kanilang assignment

:::info
Tanging ang mga volunteer na hindi pa nababatiran ang kasama. Kung magdadagdag ka ng tao sa plan sa susunod, lilitaw muli ang link para mabatiran ang bagong dagdag nang hindi na muling inaabisuhan ang iba pang team.
:::

### Mga Plan na May Confirmation Workflow

Kung ang settings ng plan ay nagtatakda ng [confirmation workflow](./workflows.md#serving-assignment-confirmations), ipapakita ng panel ang *"New requests use the confirmation workflow. App alerts stay enabled. Follow-ups stop when each request is accepted or declined."* Sa ganitong kaso:

- Binibilang ng notify link ang mga volunteer na hindi pa nababatiran at hindi pa tumutugon.
- Kapag na-click ito, magpapadala ito ng karaniwang in-app alert at gagawa ng isang card para sa bawat request sa board ng workflow. Ang workflow na ang magpapadala ng email at text na follow-up at, kung kailangan, ibibigay ang request sa isang taong tatawag.
- Dapat na nai-publish ang plan (hindi penciled in) at aktibo ang workflow. Kung hindi, ipapakita ng panel ang *"Requests could not be issued. Check that the selected workflow is active and the plan is published, then try again."*

:::warning
Dapat naka-install ang B1.church mobile experience ng mga volunteer (PWA sa home screen nila, o ang deprecated na B1 Mobile native app para sa mga user na mayroon pa nito) at naka-enable ang notification para makatanggap ng push notification. Tingnan ang [Installing as an App (PWA)](/docs/b1-church/getting-started/installing-pwa) para sa setup.
:::

## Mga Kaugnay na Artikulo

- [Service Plans](./plans.md)
- [Workflows](./workflows.md)
- [Pag-install ng B1.church PWA](/docs/b1-church/getting-started/installing-pwa)
