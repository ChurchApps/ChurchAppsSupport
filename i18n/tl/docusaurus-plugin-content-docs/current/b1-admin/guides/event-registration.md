---
title: "Gabay: Mag-set Up ng Event Registration"
description: "I-set up ang event registration form sa B1 Admin para mangolekta ng detalye ng mga dadalo at opsyonal na bayad, i-embed ito sa website ng iyong simbahan, at subaybayan ang mga nagpatala."
---

# Mag-set Up ng Event Registration

<div class="article-intro">

Gumawa ng event registration form, mangolekta ng impormasyon ng mga dadalo at opsyonal na bayad, i-embed ito sa website ng iyong simbahan, at pamahalaan ang mga isinumiteng form habang dumarating ang mga ito. Pagkatapos ng gabay na ito, magkakaroon ka na ng page para sa pagpapatala na maibabahagi para sa anumang event ng simbahan.

</div>

:::info
**Dalawang paraan para sa event registration:** Tinatalakay ng gabay na ito ang **forms-based registration**, na nagbibigay sa iyo ng ganap na kontrol sa mga custom na field at pangongolekta ng bayad. Para sa mas simpleng event na kailangan mo lang subaybayan kung sino ang darating, gamitin ang **native event registration** na nasa calendar. Tingnan ang [Creating Calendars](../calendars/creating-calendars.md#enabling-event-registration) para sa mga hakbang sa pag-set up. Sa native registration, maaaring direktang magpatala ang mga miyembro mula sa [B1.church o sa B1 App](../../b1-church/events/registering.md), kasama ang pagsubaybay sa kapasidad, mga petsa ng pagpapatala, at mga email confirmation.
:::

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Account sa B1 Admin na may admin access
- Para sa pangongolekta ng bayad: kailangan munang [i-configure ang Stripe](../donations/online-giving-setup.md)

</div>

## Hakbang 1: Gumawa ng Stand Alone na Form

Ang mga Stand Alone form ay may sariling pampublikong URL na maaaring ma-access ng sinuman, kaya perpekto ito para sa event registration.

Sundin ang gabay na [Creating Forms](../forms/creating-forms.md) para:

1. Pumunta sa Forms at i-click ang Add Form
2. Piliin ang uri na "Stand Alone" para magkaroon ang form ng sarili nitong pampublikong URL
3. Pangalanan ito ayon sa event (hal., "Men's Retreat Registration", "VBS Sign-Up")

## Hakbang 2: Magdagdag ng mga Tanong

Buuin ang mga field na kailangan mong kolektahin mula sa mga magpapatala.

Sundin ang gabay na [Creating Forms](../forms/creating-forms.md#adding-questions) para idagdag ang iyong mga tanong:

1. Pumunta sa tab na Questions at magdagdag ng mga field para sa impormasyong kailangan mo: pangalan, email, telepono, dietary restrictions, laki ng T-shirt, emergency contact, at iba pa.
2. Gamitin ang Multiple Choice para sa mga opsyon tulad ng kagustuhan sa pagkain o pagpili ng session.

:::warning
Nangangailangan ng Stripe ang uri ng field na Payment. Kung hindi mo pa na-set up ang online giving, tingnan muna ang [Online Giving Setup](../donations/online-giving-setup.md) bago magdagdag ng mga payment field.
:::

## Hakbang 3: I-configure ang Mga Setting ng Form

Kontrolin kung kailan at paano magiging available ang iyong registration form.

1. Itakda ang mga petsa ng availability kung ang pagpapatala ay dapat bukas lamang sa limitadong panahon.
2. Kopyahin ang pampublikong URL. Maaari mo itong direktang ibahagi.
3. Magdagdag ng mga miyembro ng form na may role na Admin o View Only para makatulong sa pamamahala ng mga isinumiteng form.

## Hakbang 4: I-embed sa Iyong Website

Gawing madaling mahanap ang registration form sa pamamagitan ng pagdagdag nito sa website ng iyong simbahan.

Sundin ang gabay na [Managing Pages](../website/managing-pages.md) para:

1. Sa iyong B1 website editor, magdagdag ng bagong section sa isang page at piliin ang Form element.
2. Piliin ang iyong registration form mula sa listahan.

:::tip
Ibahagi rin ang standalone URL sa pamamagitan ng email, social media, at mga church bulletin. Kung mas maraming lugar itong makikita, mas maraming magpapatala.
:::

## Hakbang 5: Pamahalaan ang mga Isinumiteng Form

Subaybayan ang mga pagpapatala habang dumarating ang mga ito at i-export ang data kapag kailangan mo.

Sundin ang gabay na [Managing Submissions](../forms/managing-submissions.md) para:

1. Suriin ang mga sagot habang dumarating ang mga ito sa tab na Submissions.
2. I-export sa CSV para sa mga spreadsheet, pagbilang ng dadalo, o pagbabahagi sa mga event coordinator.

## Tapos Ka Na!

Live na ang iyong event registration. Ibahagi ang link, i-embed ito sa iyong website, at subaybayan ang mga nagpatala mula sa B1 Admin. Kapag tapos na ang event, i-export ang huling listahan para sa iyong mga talaan.

## Mga Kaugnay na Artikulo

- [Creating Forms](../forms/creating-forms.md) — gumawa ng mga form na may iba't ibang uri ng field
- [Managing Submissions](../forms/managing-submissions.md) — suriin at i-export ang mga sagot sa form
- [Managing Pages](../website/managing-pages.md) — i-embed ang mga form sa iyong website
- [Online Giving Setup](../donations/online-giving-setup.md) — kinakailangan para sa mga payment field
