---
title: "Gabay: Pag-set Up ng Event Registration"
description: "I-set up ang event registration form sa B1 Admin para mangolekta ng detalye ng dadalo at opsyonal na bayad, i-embed ito sa website ng simbahan, at subaybayan ang mga sign-up."
---

# Pag-set Up ng Event Registration

<div class="article-intro">

Gumawa ng event registration form, mangolekta ng impormasyon ng dadalo at opsyonal na bayad, i-embed ito sa website ng iyong simbahan, at pamahalaan ang mga submission habang dumarating ang mga ito. Pagkatapos nito, magkakaroon ka na ng registration page na maibabahagi para sa anumang event ng simbahan.

</div>

:::info
**Dalawang paraan para sa event registration:** Sinasaklaw ng gabay na ito ang **forms-based registration** -- isang Stand Alone form na may sariling public link, mga custom na tanong, at opsyonal na payment field. Para sa event sa iyong calendar, maaari mong gamitin sa halip ang **event registration** na nakapaloob sa calendar -- tingnan ang [Creating Calendars](../calendars/creating-calendars.md#enabling-event-registration). Pinapayagan nitong direktang mag-sign up ang mga miyembro mula sa [B1.church o sa B1 App](../../b1-church/events/registering.md), na may capacity, petsa ng pagbubukas at pagsasara, waitlist, opsyonal na registration question mula sa form, at mga may presyong attendee type (tingnan ang [Paid Registrations](../calendars/paid-registrations.md)).
:::

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- B1 Admin account na may admin access
- Para sa pagkolekta ng bayad: [kailangang naka-configure muna ang Stripe](../donations/online-giving-setup.md)

</div>

## Hakbang 1: Gumawa ng Stand Alone Form {#step-1-create-a-stand-alone-form}

May sariling public URL ang Stand Alone form na maaaring ma-access ng sinuman -- perpekto para sa event registration.

Sundin ang gabay na [Creating Forms](../forms/creating-forms.md) para:

1. Sa [Jump menu](../introduction.md#getting-around-with-the-jump-menu), piliin ang **People > Forms** at i-click ang **Add Form**
2. Pangalanan ito ayon sa event (hal., "Men's Retreat Registration", "VBS Sign-Up")
3. Sa **Associate With**, piliin ang **Stand Alone** -- ito ang magbibigay sa iyong form ng sariling public URL
4. I-click ang **Save**

## Hakbang 2: Magdagdag ng Mga Tanong {#step-2-add-questions}

Buuin ang mga field na kailangan mong kolektahin mula sa mga magpapatala.

Sundin ang gabay na [Creating Forms](../forms/creating-forms.md#adding-questions) para magdagdag ng iyong mga tanong:

1. Buksan ang form, pumunta sa tab na **Questions**, at i-click ang **Add Question** para sa bawat impormasyong kailangan mo: pangalan, email, telepono, dietary restriction, laki ng T-shirt, emergency contact, atbp.
2. Gamitin ang **Multiple Choice** para sa mga opsyon gaya ng kagustuhan sa pagkain o pagpili ng session
3. Para mangolekta ng bayad, magdagdag ng **Payment** question at piliin ang **Fund** at **Amount** nito

:::warning
Kailangan ng uring Payment field na naka-configure ang Stripe. Kung hindi mo pa naitatakda ang online giving, tingnan muna ang [Online Giving Setup](../donations/online-giving-setup.md) bago magdagdag ng payment field.
:::

## Hakbang 3: I-configure ang Settings ng Form {#step-3-configure-form-settings}

Kontrolin kung kailan at paano makukuha ang iyong registration form. Sundin ang seksyong [Configuring Form Properties](../forms/creating-forms.md#configuring-form-properties) para:

1. I-click ang **Edit Form** at, kung limitado lamang ang panahon ng registration, itakda ang **Set Form Availability Timeframe** sa **Yes** at piliin ang petsa ng simula at pagtatapos
2. Kopyahin ang **public URL** na nakalagay sa kaliwang bahagi ng form page -- maaari mo itong ibahagi nang direkta. I-click ang **QR Code** sa tabi ng form sa listahan ng Forms para mag-download ng QR code para sa flyer at slides
3. Sa tab na **Form Members**, magdagdag ng mga tao bilang **Admin** o **View Only** para makatulong sa pamamahala ng mga submission, at i-on ang **Email Notification** para sa sinumang dapat padalhan ng email tungkol sa bawat bagong registration

## Hakbang 4: I-embed sa Iyong Website {#step-4-embed-on-your-website}

Gawing madaling makita ang registration form sa pamamagitan ng pagdaragdag nito sa website ng iyong simbahan.

Sundin ang gabay na [Page Editor](../website/page-editor.md) para:

1. Magbukas ng page sa iyong B1 website editor at i-click ang **Add Content**
2. I-drag ang **Form** element papunta sa isang section at piliin ang iyong registration form

:::tip
Ibahagi rin ang standalone URL sa pamamagitan ng email, social media, at church bulletin -- mas maraming lugar kung saan ito nakikita, mas maraming sign-up ang makukuha mo.
:::

## Hakbang 5: Pamahalaan ang Mga Submission {#step-5-manage-submissions}

Subaybayan ang mga registration habang dumarating ang mga ito at i-export ang datos kapag kailangan.

Sundin ang gabay na [Managing Submissions](../forms/managing-submissions.md) para:

1. Rebyuhin ang mga sagot habang dumarating sa tab na **Form Submissions**
2. I-click ang **Export** para mag-download ng CSV para sa mga spreadsheet, pagbibilang ng dadalo, o pagbabahagi sa mga event coordinator

## Tapos Ka Na! {#youre-done}

Live na ang iyong event registration. Ibahagi ang link, i-embed sa iyong website, at subaybayan ang mga sign-up mula sa B1 Admin. Pagkatapos ng event, i-export ang huling listahan para sa iyong mga talaan.

## Mga Kaugnay na Artikulo {#related-articles}

- [Creating Forms](../forms/creating-forms.md) -- bumuo ng mga form na may iba't ibang uri ng field
- [Managing Submissions](../forms/managing-submissions.md) -- rebyuhin at i-export ang mga sagot sa form
- [Page Editor](../website/page-editor.md) -- mag-embed ng mga form sa iyong website
- [Online Giving Setup](../donations/online-giving-setup.md) -- kailangan para sa mga payment field
