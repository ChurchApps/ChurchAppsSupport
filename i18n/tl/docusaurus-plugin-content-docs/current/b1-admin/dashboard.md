---
title: "Dashboard"
description: "Tingnan ang ipinapakita ng B1 Admin Dashboard: ang order of service ngayong linggo, sino ang naglilingkod at nag-check in, mga bagay na nangangailangan ng atensyon, at ang iyong mga gawain at grupo."
---

# Dashboard

<div class="article-intro">

Ang Dashboard ang home page ng B1 Admin. Bumubukas ito kapag nag-sign in ka at nakabatay sa lingguhang serbisyo ng iyong simbahan: ang order of service para sa paparating na plan, sino ang naglilingkod, sino ang nasa kuwarto tuwing Linggo, anumang naghihintay sa iyo, at ang sarili mong mga gawain at grupo.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Mag-sign in sa [B1 Admin](https://admin.b1.church). May Dashboard ang bawat naka-sign in na user, pero nakadepende sa iyong [role at permissions](./settings/roles-permissions.md) ang ipinapakita nito.
- Napupunan ang mga seksyon ng serbisyo kapag ginamit mo na ang [Plans](./serving/plans.md) at [Attendance](./attendance/index.md) o [Check-In](./attendance/check-in.md).

</div>

## Pagbubukas ng Dashboard {#opening-the-dashboard}

- Mag-sign in -- nagsisimula ang B1 Admin sa Dashboard.
- I-click ang maliit na church logo sa kaliwang itaas ng anumang pahina.
- Buksan ang [Jump menu](./introduction.md#getting-around-with-the-jump-menu) (i-click ang search bar o pindutin ang **Ctrl+K** / **Cmd+K**) at piliin ang **Dashboard**.

## Serbisyo Ngayong Linggo {#this-weeks-service}

Ang malaking card sa itaas ay nagpapakita ng isang service plan: ang susunod na paparating na plan sa pagitan ng nakaraang Linggo at ng darating na Linggo, o ang plan ng nakaraang Linggo kung walang paparating. Kung may ilang plan sa parehong araw, mauuna ang plan na gumagamit ng order of service, saka ang may pinakamaagang oras ng serbisyo.

- **Linya ng petsa** -- ang araw, petsa, at unang oras ng serbisyo ng plan (halimbawa, *Sunday · November 15 · 9:00 AM*).
- **Title** -- ang pangalan ng plan. Kung mabubuksan mo ang plan (maaari kang mag-edit ng plan, kabilang ka sa ministry ng plan, o naglilingkod ka rito), naka-link ang title sa [plan](./serving/plans.md).
- **Order of service** -- bawat item mula sa [service order](./serving/service-order.md) ng plan, kasama ang oras kung kailan ito magsisimula, na kinuwenta mula sa unang oras ng serbisyo at haba ng bawat item. Habang tumatakbo ang serbisyo, naka-highlight ang kasalukuyang item.

Kung walang plan ngayong linggo, nakasulat sa card na **No service planned this week.**, at kung walang order of service ang plan, nakasulat na **No order of service on this plan.** Makikita ng mga maaaring mag-edit ng plan ang link na **Plans** sa tabi ng alinmang mensahe.

### Sino ang naglilingkod at sino ang nasa kuwarto {#who-is-serving-and-who-is-in-the-room}

Sa tabi ng order of service, idinadagdag ng Dashboard ang nangyayari sa paligid ng serbisyo kapag may datos na para dito:

| Seksyon | Ano ang ipinapakita |
|---|---|
| **in the room** | Ilan ang nag-check in o minarkahang present. Tuwing Linggo, ito ang bilang ngayong araw, na may markang **Live**; sa buong linggo, ipinapakita nito ang bilang ng **Last Sunday**. Kung walang naitalang pangalan, ginagamit nito ang [headcount](./attendance/headcount-entry.md) ng araw na iyon. |
| **Serving Sunday** / **Serving this hour** | Lahat ng nakaiskedyul sa plan kasama ang kanilang posisyon, naka-link sa kanilang person record. Hindi kasama ang mga assignment na tinanggihan. |
| **First time** / **First time last Sunday** | Mga first-time na bisita (mga taong may *Visitor* o *Guest* na membership status, o nag-check in bilang bisita), nakapangkat ayon sa household. |
| **Rooms** | Mga check-in kada klase o kuwarto para sa linggong iyon, may capacity bar kapag may nakatakdang **Capacity** ang grupo. |

Bago pa umiral ang alinman dito, nagpapakita ang card ng maikling hint na may mga link sa **People**, **Attendance** at **Plans** (ang mga kaya mong buksan lamang).

:::info
Galing sa datos ng attendance at serving ang mga bilang at pangalan, kaya lumilitaw lamang ang mga ito para sa mga taong may permission na makita ang mga ito. Halimbawa, kailangan ng permission na makita ang mga tao para sa pangalan ng bisita at listahan ng naglilingkod, at kailangan ng permission na makita ang attendance para sa bilang ng kuwarto.
:::

## Nangangailangan ng Atensyon {#needs-attention}

Kapag may naghihintay sa iyo, nakalista ito sa card na **Needs attention** kasama ang link:

- **pending calendar approvals** -- mga event at booking ng kuwarto o resource na kailangan ng approval. Bumubukas ang [Approvals](./calendars/approvals.md). Ipinapakita sa mga maaaring mag-edit ng content.
- **pending group join requests** -- mga taong humihiling na sumali sa isang grupo. Bumubukas ang listahan ng [pending requests](./groups/group-join-requests.md). Ipinapakita sa mga maaaring mag-edit ng miyembro ng grupo.

Nakatago ang card kapag walang dapat gawin.

## Aking Mga Gawain at Aking Mga Grupo {#my-tasks-and-my-groups}

Sa ibaba ng pahina:

- Inililista ng **My tasks** ang hanggang apat na bukas na [gawain](./serving/tasks.md) na naka-assign sa iyo; i-click ang isa para buksan ito. I-click ang **Add Task** para gumawa ng gawain dito mismo (piliin kung tungkol kanino at kung sino ang naka-assign, pagkatapos ilagay ang title, due date, at notes), o ang **All tasks** para buksan ang **Serving > My Work**.
- Inililista ng **My Groups** ang mga grupong kinabibilangan mo; i-click ang isa para buksan ito. Kung maaari mong pamahalaan ang mga grupo o tingnan ang mga tao, bubukas ang **All groups** sa buong listahan ng [Groups](./groups/index.md).

## Mga Mabilisang Aksyon {#quick-actions}

Ang mga shortcut sa pag-set up na dating nasa Dashboard (gaya ng **Add Your Church Logo**, **Set Up Online Giving** at **Create Your First Group**) ay nasa Jump menu na sa ilalim ng **Quick Actions**. Tingnan ang [Quick Actions](./introduction.md#quick-actions).

## Mga Kaugnay na Artikulo {#related-articles}

- [Introduction](./introduction.md) -- pag-sign in at paghanap ng daan gamit ang Jump menu
- [Notifications & Messages](./notifications.md) -- ang mga alerto at pribadong mensahe sa iyong user menu
- [Plans](./serving/plans.md) at [Service Order](./serving/service-order.md) -- ang pinagmumulan ng service card
- [Check-In](./attendance/check-in.md) -- paano nabibilang ang mga tao sa kuwarto
