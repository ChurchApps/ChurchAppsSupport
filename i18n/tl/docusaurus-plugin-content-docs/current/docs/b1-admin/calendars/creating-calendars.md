---
title: "Creating Calendars"
---

# Creating Calendars

<div class="article-intro">

Ang paglikha ng isang calendar sa B1 Admin ay nagbibigay-daan sa iyo na bumuo ng isang curated view ng mga event sa pamamagitan ng pagkonekta ng isa o higit pang mga grupo. Ang mga event ay pinamamahalaan ng mga group leaders sa loob ng kanilang mga grupo, at ang iyong calendar ay nagpapakita ng mga event na iyon sa isang lugar. Ang mga admin na may edit access ay maaaring mag-add o mag-edit ng mga event para sa anumang grupo. Ang mga non-admin group leaders ay maaari lamang pamahalaan ang mga event para sa mga grupo na kanilang pinangunguna.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- I-setup ang [mga grupo](../groups/creating-groups.md) na ang mga event ay gusto mong isama sa iyong calendar
- Kailangan mo ng administrative access sa Calendars section sa B1 Admin

</div>

## Creating a New Calendar

1. Sa B1 Admin, mag-navigate sa **Website**, pagkatapos sa **Calendars** section.
2. I-click ang **Add Calendar**.
3. Ilagay ang isang **name** para sa iyong calendar (halimbawa, "Youth Ministry Events" o "Main Church Calendar").
4. Magdagdag ng isang opsyonal na **description** upang tulungan ang iyong team na maintindihan kung ano ang layunin ng calendar na ito.
5. I-click ang **Create** upang magsave ng iyong bagong calendar.

## The Calendar Detail Page

Pagkatapos lumikha ng isang calendar, i-click ito upang buksan ang detail page. Ang page na ito ay may dalawang pangunahing lugar:

- **Left column** -- Isang view ng calendar na nagpapakita ng mga event na kinuha mula sa mga konektadong grupo.
- **Right column** -- Ang associated groups list. Dito mo pinamamahalaan kung aling mga grupo ang kasama sa calendar na ito.

## Connecting Groups

Ang mga grupo na may mga event sa calendar ay awtomatikong lilitaw sa groups list sa kanang bahagi ng detail page.

1. I-click ang **Add** sa groups section upang iugnay ang isang grupo sa iyong calendar.
2. Piliin ang grupo mula sa dropdown.
3. Piliin kung isasama ang **lahat ng mga event** mula sa grupo o lamang ang **specific events**.
4. I-click ang **Save**.

:::tip
Ang pagkonekta ng mga grupo sa iyong calendar ay isang makapangyarihang paraan upang awtomatikong mag-aggregate ng mga event. Kapag nag-add ang isang group leader ng isang event sa kanilang [grupo](../groups/creating-groups.md), maaari itong dumalyong sa iyong church-wide calendar nang walang anumang dagdag na gawain mula sa iyo.
:::

:::info
Kung gusto mong lumikha ng isang solong calendar na nagkuha ng mga event mula sa maraming mga grupo sa buong iyong simbahan, tingnan ang [Curated Calendar](curated-calendar) para sa isang streamlined approach.
:::

## Enabling Event Registration

Maaari kang mag-enable ng registration para sa anumang calendar event upang ang mga miyembro ay maaaring mag-sign up sa pamamagitan ng B1 website o mobile app.

1. I-click ang isang umiiral na event o lumikha ng isang bagong isa.
2. Sa event editor, i-toggle ang **Registration** upang i-enable ito.
3. I-configure ang registration settings:
   - **Capacity** (opsyonal) -- Itakda ang isang maximum na bilang ng mga registration. Iwanan ang blank para sa walang hanggan.
   - **Registration Opens** -- Ang petsa at oras kung kailan nagiging available ang registration.
   - **Registration Closes** -- Ang petsa at oras kung kailan tumitigil ang registration.
   - **Tags** -- Comma-separated labels (hal., "youth, retreat, vbs") upang tumulong na i-categorize ang mga registerable events.
   - **Registration Questions** -- Opsyonal na ikabit ang isang [form](../forms/creating-forms.md) upang ang mga registrant ay sasagot ng mga karagdagang tanong (dietary restrictions, T-shirt size, emergency contact, atbp.) bilang bahagi ng pag-sign up. Piliin ang **None** upang laktawan ang mga tanong.
   - **Enable Waitlist** -- Kapag ang event ay puno na, bigyan ang mga karagdagang registrant ng isang waitlist spot sa halip na turuan sila. Tingnan ang [Paid Registrations](paid-registrations#waitlist).
4. Savihin ang event.

Para sa mga paid events, ang parehong settings page ay nagpapahintulot sa iyo na tukuyin ang priced **Attendee Types**, opsyonal na **Selections** (add-ons), at **Discount Codes**, na ang bayad ay kinokolekta sa pamamagitan ng giving provider ng iyong simbahan. Tingnan ang [Paid Registrations](paid-registrations) para sa buong walkthrough.

Kapag naka-enable ang registration, makikita ng mga miyembro ang isang **Register for this Event** button kapag tinitingnan nila ang event sa [B1 website](../../b1-church/events/registering) o [B1 Mobile app](../../b1-mobile/events/registering). Kung nag-attach ka ng isang form, ang mga registrant ay makikita ang isang **Questions** step sa panahon ng registration at ang kanilang mga sagot ay nase-save kasama ng kanilang registration.

:::info
Ang Registration Questions ay gumagana lamang sa mga form na **hindi** minarkahang Restricted. Ang isang restricted form ay automatically na sini-skip sa panahon ng registration sa halip na ipakita, kaya gumamit ng isang unrestricted form kapag nag-attach ng mga tanong sa isang event.
:::

### Managing Registrations

Upang tingnan at pamahalaan ang mga registration para sa iyong mga event:

1. Mag-navigate sa **Registrations** page sa B1 Admin.
2. Makikita mo ang isang talahanayan ng lahat ng mga event na may naka-enable ang registration, na nagpapakita ng event title, date, kasalukuyang registration count vs. capacity, at tags.
3. I-click ang isang event upang makita ang buong listahan ng mga registration, kasama ang mga pangalan, member count, attendee types, payment status, at registration date.
4. Mula sa detail page, maaari mong:
   - **Add Attendee** -- Manu-manong mag-register ng isang taong nag-sign up nang offline o sa telepono.
   - **Cancel** individual registrations
   - **Delete** registrations permanently
   - **Promote** waitlisted registrations kapag bumubukas ang isang lugar
   - **Export CSV** -- I-download ang lahat ng mga registration, kasama ang attendee types, selections, payment amounts, at question answers

Kung ang event ay may Registration Questions na nakakabit, ang detail page ay nagpapakita din ng isang **Unanswered questions only** filter upang mabilis na mahanap ang mga registrant na hindi pa nag-submit ng mga sagot, at isang **View Answers** button sa bawat answered registration upang makita ang kanilang mga tugon. Ang mga paid events ay nagdadagdag ng isang **Type** column, isang **Paid / Total** column, per-type counts, at isang payments detail dialog -- tingnan ang [Paid Registrations](paid-registrations#the-registration-roster).

:::tip
Gamitin ang capacity progress bar upang subaybayan kung gaano kabilis ang mga event na puno. Ang bar ay nagiging pula kapag ang isang event ay umabot o lumampas sa capacity.
:::

## Next Steps

- [Curated Calendar](curated-calendar) -- Lumikha ng isang calendar na kumukuha mula sa maraming mga grupo
- [Paid Registrations](paid-registrations) -- Attendee types, add-on selections, discount codes, payments, at waitlists
- [Event Registration Guide](../guides/event-registration) -- Step-by-step guide para sa pag-setup ng event registration
- [Calendars Overview](./) -- Bumalik sa calendars overview
