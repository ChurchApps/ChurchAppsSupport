---
title: "Creating Calendars"
---

# Creating Calendars

<div class="article-intro">

Ang paggawa ng calendar sa B1 Admin ay nagbibigay-daan sa iyong bumuo ng isang piniling pananaw ng mga event sa pamamagitan ng pagkonekta ng isa o higit pang grupo. Pinamamahalaan ang mga event ng mga leader ng grupo sa loob ng kanilang mga grupo, at ipinapakita ng iyong calendar ang mga event na iyon sa isang lugar. Kahit ang isang domain admin ay hindi puwedeng magdagdag o mag-edit ng mga event nang direkta sa seksyong calendar maliban kung siya ay leader ng grupong kinabibilangan ng mga event.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-set up ang mga [grupo](../groups/creating-groups.md) na ang mga event ay gusto mong isama sa iyong calendar
- Kailangan mo ng administrative access sa seksyong Calendars sa B1 Admin

</div>

## Paggawa ng Bagong Calendar

1. Sa B1 Admin, pumunta sa **Website**, pagkatapos ay sa seksyong **Calendars**.
2. I-click ang **Add Calendar**.
3. Ilagay ang **pangalan** ng iyong calendar (halimbawa, "Youth Ministry Events" o "Main Church Calendar").
4. Magdagdag ng opsyonal na **description** para matulungan ang iyong team na maunawaan kung para saan ang calendar na ito.
5. I-click ang **Create** para i-save ang iyong bagong calendar.

## Ang Calendar Detail Page

Pagkatapos gumawa ng calendar, i-click ito para buksan ang detail page. Ang page na ito ay may dalawang pangunahing bahagi:

- **Kaliwang column** -- Isang view ng calendar na nagpapakita ng mga event mula sa mga konektadong grupo.
- **Kanang column** -- Ang listahan ng mga kaugnay na grupo. Dito mo pinamamahalaan kung aling mga grupo ang isasama sa calendar na ito.

## Pagkonekta ng mga Grupo

Ang mga grupong may mga event sa calendar ay awtomatikong lumalabas sa listahan ng grupo sa kanang bahagi ng detail page.

1. I-click ang **Add** sa seksyon ng grupo para ikonekta ang isang grupo sa iyong calendar.
2. Piliin ang grupo mula sa dropdown.
3. Piliin kung isasama ang **lahat ng event** mula sa grupong iyon o **mga partikular na event** lamang.
4. I-click ang **Save**.

:::tip
Ang pagkonekta ng mga grupo sa iyong calendar ay isang makapangyarihang paraan para awtomatikong pagsama-samahin ang mga event. Kapag nagdagdag ang isang leader ng grupo ng event sa kanilang [grupo](../groups/creating-groups.md), maaari itong dumaloy papunta sa iyong calendar para sa buong simbahan nang walang dagdag na trabaho mula sa iyo.
:::

:::info
Kung gusto mong gumawa ng iisang calendar na kumukuha ng mga event mula sa maraming grupo sa buong simbahan, tingnan ang [Curated Calendar](curated-calendar) para sa isang mas simpleng paraan.
:::

## Pag-enable ng Event Registration

Puwede mong i-enable ang registration para sa anumang calendar event para makapag-sign up ang mga miyembro sa pamamagitan ng B1 website o mobile app.

1. I-click ang isang umiiral na event o gumawa ng bago.
2. Sa event editor, i-toggle ang **Registration** para i-enable ito.
3. I-configure ang mga setting ng registration:
   - **Capacity** (opsyonal) -- Magtakda ng maximum na bilang ng registration. Iwanang blangko para sa walang limitasyon.
   - **Registration Opens** -- Ang petsa at oras kung kailan magiging available ang registration.
   - **Registration Closes** -- Ang petsa at oras kung kailan magsasara ang registration.
   - **Tags** -- Mga label na pinaghihiwalay ng kuwit (hal., "youth, retreat, vbs") para tumulong sa pag-categorize ng mga event na puwedeng irehistro.
   - **Registration Questions** -- Opsyonal na maglakip ng [form](../forms/creating-forms.md) para makasagot ang mga rehistrante ng karagdagang tanong (dietary restrictions, sukat ng T-shirt, emergency contact, atbp.) bilang bahagi ng pag-sign up. Piliin ang **None** para laktawan ang mga tanong.
   - **Enable Waitlist** -- Kapag napuno na ang event, bigyang-daan ang karagdagang mga rehistrante na sumali sa waitlist sa halip na tanggihan. Tingnan ang [Paid Registrations](paid-registrations#waitlist).
4. I-save ang event.

Para sa mga bayad na event, ang parehong settings page ay nagbibigay-daan sa iyong tukuyin ang mga presyong **Attendee Types**, opsyonal na **Selections** (add-on), at **Discount Codes**, kung saan kinokolekta ang bayad sa pamamagitan ng giving provider ng iyong simbahan. Tingnan ang [Paid Registrations](paid-registrations) para sa buong walkthrough.

Kapag na-enable na ang registration, makikita ng mga miyembro ang button na **Register for this Event** kapag tiningnan nila ang event sa [B1 website](../../b1-church/events/registering) o [B1 Mobile app](../../b1-mobile/events/registering). Kung naglakip ka ng form, makikita ng mga rehistrante ang hakbang na **Questions** habang nagrerehistro at ise-save ang kanilang mga sagot kasama ng kanilang registration.

:::info
Ang Registration Questions ay gumagana lamang sa mga form na **hindi** naka-mark na Restricted. Ang isang restricted na form ay awtomatikong nilalaktawan sa registration sa halip na ipakita, kaya gumamit ng unrestricted na form kapag naglalakip ng mga tanong sa isang event.
:::

### Pamamahala ng mga Registration

Para tingnan at pamahalaan ang mga registration para sa iyong mga event:

1. Pumunta sa page na **Registrations** sa B1 Admin.
2. Makikita mo ang isang talahanayan ng lahat ng event na may naka-enable na registration, na nagpapakita ng title ng event, petsa, kasalukuyang bilang ng registration kumpara sa capacity, at mga tag.
3. I-click ang isang event para makita ang buong listahan ng mga registration, kasama ang mga pangalan, bilang ng miyembro, attendee types, status ng bayad, at petsa ng registration.
4. Mula sa detail page, puwede mong:
   - **Add Attendee** -- Manu-manong irehistro ang isang taong nag-sign up offline o sa telepono.
   - **Cancel** ng indibidwal na registration
   - **Delete** ng registration nang permanente
   - **Promote** ng mga registration na naka-waitlist kapag may nabakanteng slot
   - **Export CSV** -- I-download ang lahat ng registration, kabilang ang attendee types, selections, halaga ng bayad, at mga sagot sa tanong

Kung may kalakip na Registration Questions ang event, ipinapakita rin ng detail page ang filter na **Unanswered questions only** para mabilis na mahanap ang mga rehistranteng hindi pa nagsusumite ng sagot, at isang button na **View Answers** sa bawat nasagutang registration para makita ang kanilang mga tugon. Sa mga bayad na event, may dagdag na column na **Type**, column na **Paid / Total**, bilang bawat type, at isang payments detail dialog -- tingnan ang [Paid Registrations](paid-registrations#the-registration-roster).

:::tip
Gamitin ang capacity progress bar para subaybayan kung gaano kabilis napupuno ang mga event. Nagiging pula ang bar kapag ang isang event ay nasa o lampas na sa capacity nito.
:::

## Mga Susunod na Hakbang

- [Curated Calendar](curated-calendar) -- Gumawa ng calendar na kumukuha mula sa maraming grupo
- [Paid Registrations](paid-registrations) -- Attendee types, add-on selections, discount codes, bayad, at waitlists
- [Event Registration Guide](../guides/event-registration) -- Step-by-step na gabay para sa pag-set up ng event registration
- [Calendars Overview](./) -- Bumalik sa overview ng calendars
