---
title: "Lumilikha ng Mga Kalendaryo"
---

# Lumilikha ng Mga Kalendaryo

<div class="article-intro">

Ang paggawa ng kalendaryo sa B1 Admin ay nagbibigay-daan sa iyo na bumuo ng isang curated na view ng mga event sa pamamagitan ng pagkonekta ng isa o higit pang mga grupo. Ang mga event ay pinamamahalaan ng mga lider ng grupo sa loob ng kanilang mga grupo, at ang iyong kalendaryo ay nagpapakita ng mga event na iyon sa isang lugar. Kahit ang isang domain admin ay hindi maaaring magdagdag o mag-edit ng mga event nang direkta sa seksyon ng kalendaryo maliban kung sila ay lider ng grupo kung saan nabibilang ang mga event.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-set up ang [mga grupo](../groups/creating-groups.md) na ang mga event ay nais mong isama sa iyong kalendaryo
- Kailangan mo ng administrative access sa seksyon ng Calendars sa B1 Admin

</div>

## Paggawa ng Bagong Kalendaryo

1. Sa B1 Admin, pumunta sa **Website**, pagkatapos sa seksyon ng **Calendars**.
2. I-click ang **Add Calendar**.
3. Maglagay ng **pangalan** para sa iyong kalendaryo (halimbawa, "Youth Ministry Events" o "Main Church Calendar").
4. Magdagdag ng optional na **paglalarawan** upang matulungan ang iyong team na maintindihan kung para saan ang kalendaryong ito.
5. I-click ang **Create** upang i-save ang iyong bagong kalendaryo.

## Ang Pahina ng Detalye ng Kalendaryo

Pagkatapos gumawa ng kalendaryo, i-click ito upang buksan ang pahina ng detalye. Ang pahinang ito ay may dalawang pangunahing bahagi:

- **Kaliwang hanay** -- Isang view ng kalendaryo na nagpapakita ng mga event na nakuha mula sa mga konektadong grupo.
- **Kanang hanay** -- Ang listahan ng mga kaugnay na grupo. Dito mo pinamamahalaan kung aling mga grupo ang kasama sa kalendaryong ito.

## Pagkonekta ng mga Grupo

Ang mga grupo na may mga event sa kalendaryo ay awtomatikong lumalabas sa listahan ng mga grupo sa kanang bahagi ng pahina ng detalye.

1. I-click ang **Add** sa seksyon ng mga grupo upang i-associate ang isang grupo sa iyong kalendaryo.
2. Piliin ang grupo mula sa dropdown.
3. Piliin kung isasama ang **lahat ng mga event** mula sa grupong iyon o mga **partikular na event** lamang.
4. I-click ang **Save**.

:::tip
Ang pagkonekta ng mga grupo sa iyong kalendaryo ay isang makapangyarihang paraan upang awtomatikong pagsama-samahin ang mga event. Kapag ang isang lider ng grupo ay nagdagdag ng event sa kanilang [grupo](../groups/creating-groups.md), maaari itong dumaloy sa iyong church-wide na kalendaryo nang walang dagdag na trabaho mula sa iyo.
:::

:::info
Kung nais mong gumawa ng isang kalendaryo na kumukuha ng mga event mula sa maraming grupo sa iyong simbahan, tingnan ang [Curated Calendar](curated-calendar) para sa isang streamlined na diskarte.
:::

## Pag-enable ng Event Registration

Maaari mong i-enable ang registration para sa anumang calendar event upang ang mga miyembro ay makapag-sign up sa pamamagitan ng B1 website o mobile app.

1. I-click ang isang umiiral na event o gumawa ng bago.
2. Sa event editor, i-toggle ang **Registration** upang i-enable ito.
3. I-configure ang mga setting ng registration:
   - **Capacity** (opsyonal) -- Magtakda ng maximum na bilang ng mga registration. Iwanang blangko para sa unlimited.
   - **Registration Opens** -- Ang petsa at oras kung kailan magiging available ang registration.
   - **Registration Closes** -- Ang petsa at oras kung kailan magsasara ang registration.
   - **Tags** -- Mga label na pinaghihiwalay ng kuwit (hal., "youth, retreat, vbs") upang makatulong sa pag-categorize ng mga registerable event.
   - **Registration Questions** -- Opsyonal na ilakay ang isang [form](../forms/creating-forms.md) upang ang mga registrant ay sumagot sa mga karagdagang tanong (dietary restrictions, laki ng T-shirt, emergency contact, atbp.) bilang bahagi ng pag-sign up. Pumili ng **None** upang laktawan ang mga tanong.
   - **Enable Waitlist** -- Kapag ang event ay napuno, hayaang ang mga karagdagang registrant ay sumali sa isang waitlist sa halip na mapahamak. Tingnan ang [Paid Registrations](paid-registrations#waitlist).
4. I-save ang event.

Para sa mga bayad na event, ang parehong pahina ng setting ay nagbibigay-daan sa iyo na tukuyin ang mga may presyong **Attendee Types**, opsyonal na **Selections** (add-ons), at **Discount Codes**, na may pagbabayad na nakolekta sa pamamagitan ng provider ng pagbibigay ng iyong simbahan. Tingnan ang [Paid Registrations](paid-registrations) para sa kumpletong walkthrough.

Kapag na-enable ang registration, makikita ng mga miyembro ang button na **Register for this Event** kapag tiningnan nila ang event sa [B1 website](../../b1-church/events/registering) o [B1 Mobile app](../../b1-mobile/events/registering). Kung nag-attach ng isang form, ang mga registrant ay makikita ang isang **Questions** step sa panahon ng registration at ang kanilang mga sagot ay nai-save sa kanilang registration.

:::info
Ang Registration Questions ay gumagana lamang sa mga form na **hindi** nakatangi sa Restricted. Ang isang restricted na form ay awtomatikong nilalampas sa panahon ng registration sa halip na ipakita, kaya gumamit ng isang unrestricted na form kapag nag-attach ng mga tanong sa isang event.
:::

### Pamahalaan ang mga Registration

Upang tingnan at pamahalaan ang mga registration para sa iyong mga event:

1. Pumunta sa page ng **Registrations** sa B1 Admin.
2. Makikita mo ang isang talahanayan ng lahat ng mga event na may enabled na registration, na nagpapakita ng pamagat ng event, petsa, kasalukuyang bilang ng registration kumpara sa capacity, at mga tag.
3. I-click ang isang event upang makita ang buong listahan ng mga registration, kabilang ang mga pangalan, bilang ng miyembro, mga uri ng attendee, katayuan ng pagbabayad, at petsa ng registration.
4. Mula sa pahina ng detalye, maaari mong:
   - **Add Attendee** -- Manu-manong magrehistro ng isang taong nag-sign up offline o sa telepono.
   - **Cancel** mga indibidwal na registration
   - **Delete** mga registration nang permanente
   - **Promote** waitlisted na mga registration kapag bumukas ang isang spot
   - **Export CSV** -- I-download ang lahat ng mga registration, kasama ang mga uri ng attendee, mga pagpipilian, mga halaga ng pagbabayad, at mga sagot sa tanong

Kung ang event ay may Registration Questions na nakakabit, ang pahina ng detalye ay nagpapakita rin ng isang **Unanswered questions only** filter upang mabilis na mahanap ang mga registrant na hindi pa nag-submit ng mga sagot, at isang **View Answers** button sa bawat nasagot na registration upang makita ang kanilang mga tugon. Ang mga bayad na event ay nagdadagdag ng isang **Type** column, isang **Paid / Total** column, per-type counts, at isang payments detail dialog -- tingnan ang [Paid Registrations](paid-registrations#the-registration-roster).

:::tip
Gamitin ang capacity progress bar upang subaybayan kung gaano kabilis napupuno ang mga event. Ang bar ay nagiging pula kapag ang isang event ay nasa o lampas na sa capacity.
:::

## Mga Susunod na Hakbang

- [Curated Calendar](curated-calendar) -- Gumawa ng kalendaryo na kumukuha mula sa maraming grupo
- [Paid Registrations](paid-registrations) -- Mga uri ng attendee, mga pagpipiling add-on, mga discount codes, mga pagbabayad, at mga waitlist
- [Event Registration Guide](../guides/event-registration) -- Hakbang-hakbang na gabay para sa pag-set up ng event registration
- [Calendars Overview](./) -- Bumalik sa overview ng mga kalendaryo
