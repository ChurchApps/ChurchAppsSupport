---
title: "Pag-validate ng Plano at Mga Notification"
---

# Pag-validate ng Plano at Mga Notification sa Volunteer

<div class="article-intro">

Ang B1 Admin ay awtomatikong sinusuri ang iyong mga plan para sa mga problema bago ang Linggo — walang pulong na posisyon, scheduling conflicts, at mga volunteer na nag-block out ng petsa. Kapag ang lahat ay mukhang maganda, maaari mong abisuhan ang buong team na may isang klik lamang.

</div>

<div class="prereqs">
<h4>Bago ka magsimula</h4>

- Lumikha ng isang [service plan](./plans.md) at italagang mga volunteer sa mga posisyon
- Magdagdag ng [service times](./plans.md) sa plan upang ang conflict detection ay makapagsuri para sa mga overlap
- Siguraduhin na ang mga volunteer ay may naka-install na B1 Mobile app upang makatanggap ng push notifications

</div>

## Ang validation panel

Ang bawat plan ay may isang **Validation** panel na tumatakbo nang awtomatiko habang itinayo mo ito. Ito ay susumusubaybay sa tatlong bagay:

### Unfilled Positions
Kung ang isang posisyon ay nangangailangan ng higit pang mga tao kaysa sa kasalukuyang itinalagang mga hakbang, ang validation panel ay nagsasabing kung ano pa ang kailangan — halimbawa, *"Sound Tech: 1 more person needed."* Maaari mong makita sa isang sulyap kung ang iyong plan ay ganap na staffed bago ang linggo ay dumating.

### Scheduling Conflicts
Kung ang isang volunteer ay itinalagang sa dalawang posisyon na nagsasapilitanan ng oras sa loob ng parehong plan, ang validation panel ay nagbibigay ng flag sa conflict — halimbawa, *"Jane Smith: time conflict between Worship Leader at Children's Check-in during Sunday Service."* Ito ay nakakahuli ng double-bookings bago sila ay nagiging Sunday morning problema.

### Blockout Dates
Ang mga volunteer ay maaaring magtakda ng mga petsa na sila ay hindi available sa B1 Mobile. Kung ang isang taong ay itinalagang sa isang plan na bumabagay sa loob ng isa sa kanilang blockout dates, ang validation panel ay lumalabas sa conflict nang awtomatiko upang maaari mong mahanap ang isang kapalit.

### Cross-Plan Conflicts
Ang validation ay sumusuri din sa lahat ng iyong mga plan nang sabay-sabay. Kung ang parehong volunteer ay itinalagang sa dalawang magkakaibang plano na nagsasapilitanan ng oras — halimbawa, isang 9am service at isang 10am service na parehong tumatakbo hanggang 10:30am — ang B1 Admin ay magbibigay ng flag sa taong iyon bilang double-booked sa mga plan.

:::tip
Hindi mo kailangang gumawa ng kahit ano upang magpatakbo ng validation — ito ay nag-update nang awtomatiko sa bawat pagkakataon na ikaw ay nagdagdag o nagbago ng isang assignment. Manatiling bantay lang sa panel habang binubuo mo ang plan.
:::

## Abiso sa mga volunteer

Kapag handa na ang iyong plan, maaari mong abisuhan ang lahat ng itinalagang volunteer nang sabay-sabay direkta mula sa validation panel.

1. Buksan ang plan at i-scroll sa **Validation** panel
2. Kung may mga hindi pa na-notify na volunteer, makikita mo ang isang link na nagpapakita kung gaano karami ang kailangan i-notify (hal., *"Notify 8 volunteers"*)
3. I-click ang link upang magpadala ng push notifications sa lahat na hindi pa na-notify
4. Ang mga volunteer ay tumatanggap ng isang notification sa kanilang telepono na nagbibigay-alam sa kanila na sila ay na-schedule at nag-aalok sa kanila na kumpirmahin ang kanilang assignment

:::info
Lamang ang mga volunteer na hindi pa na-notify ang kasama. Kung magdagdag ka ng isang tao sa plan mamaya, ang link ay muling lalitaw upang maaari mong abisuhan ang bagong karagdagan nang hindi muli-notify ang natitirang team.
:::

:::warning
Ang mga volunteer ay dapat na may naka-install na B1.church mobile experience (PWA sa kanilang home screen, o ang deprecated B1 Mobile native app para sa mga gumagamit na mayroon pa ito) na may enabled notifications upang makatanggap ng push notifications. Tingnan ang [Installing as an App (PWA)](/docs/b1-church/getting-started/installing-pwa) para sa mga instruction sa pag-setup.
:::

## Mga kaugnay na artikulo

- [Service Plans](./plans.md)
- [Workflows](./workflows.md)
- [Installing the B1.church PWA](/docs/b1-church/getting-started/installing-pwa)
