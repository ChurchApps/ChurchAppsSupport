---
title: "Pag-validate ng Plano at Mga Notification"
---

# Pag-validate ng Plano at Mga Notification sa Boluntaryo

<div class="article-intro">

Awtomatikong sinusuri ng B1 Admin ang iyong mga plano para sa mga problema bago dumating ang Linggo — mga hindi napunang posisyon, mga conflict sa scheduling, at mga boluntaryo na nag-block ng petsang iyon. Kapag maayos na ang lahat, maaari mong i-notify ang buong team mo sa isang click lang.

</div>

<div class="prereqs">
<h4>Bago ka magsimula</h4>

- Gumawa ng [plano ng serbisyo](./plans.md) at mag-assign ng mga boluntaryo sa mga posisyon
- Magdagdag ng [oras ng serbisyo](./plans.md) sa plano para masuri ng conflict detection ang mga overlap
- Tiyaking naka-install ang B1 Mobile app sa mga boluntaryo para makatanggap ng push notification

</div>

## Ang Validation Panel

Ang bawat plano ay may **Validation** panel na awtomatikong tumatakbo habang binubuo mo ito. Sinusuri nito ang tatlong bagay:

### Mga hindi napunang posisyon
Kung ang isang posisyon ay nangangailangan ng mas maraming tao kaysa sa kasalukuyang naka-assign, ililista ng validation panel kung ano pa ang kailangan — halimbawa, *"Sound Tech: 1 pang tao ang kailangan."* Makikita mo agad kung ang iyong plano ay may kumpletong tauhan bago dumating ang linggo.

### Mga conflict sa scheduling
Kung ang isang boluntaryo ay naka-assign sa dalawang posisyon na magkakapatong sa oras sa loob ng parehong plano, iha-highlight ng validation panel ang conflict — halimbawa, *"Jane Smith: conflict sa oras sa pagitan ng Worship Leader at Children's Check-in sa panahon ng Sunday Service."* Nahuhuli nito ang mga double-booking bago sila maging problema sa umaga ng Linggo.

### Mga blockout date
Maaaring mag-set ang mga boluntaryo ng mga petsa kung kailan sila hindi available sa B1 Mobile. Kung may naka-assign sa isang plano na nahuhulog sa isa sa kanilang mga blockout date, awtomatikong ipinapakita ng validation panel ang conflict para makahanap ka ng kapalit.

### Mga cross-plan conflict
Sinusuri rin ng validation ang lahat ng iyong mga plano nang sabay-sabay. Kung ang parehong boluntaryo ay naka-assign sa dalawang magkaibang plano na magkakapatong sa oras — halimbawa, isang 9am na serbisyo at isang 10am na serbisyo na parehong tumatagal hanggang 10:30am — iha-flag ng B1 Admin ang taong iyon bilang double-booked sa mga plano.

:::tip
Hindi mo kailangang gumawa ng anuman para patakbuhin ang validation — awtomatiko itong nag-a-update sa tuwing magdadagdag o magbabago ka ng assignment. Bantayan lang ang panel habang binubuo mo ang plano.
:::

## Pag-notify sa mga boluntaryo

Kapag handa na ang iyong plano, maaari mong i-notify ang lahat ng naka-assign na boluntaryo nang sabay-sabay mula mismo sa validation panel.

1. Buksan ang plano at mag-scroll pababa sa **Validation** panel
2. Kung may mga hindi pa na-notify na boluntaryo, makikita mo ang isang link na nagpapakita kung ilan ang kailangang i-notify (hal., *"I-notify ang 8 boluntaryo"*)
3. I-click ang link para magpadala ng push notification sa lahat ng hindi pa na-notify
4. Makakatanggap ang mga boluntaryo ng notification sa kanilang telepono na nagsasabing sila ay na-schedule at hinihikayat silang kumpirmahin ang kanilang assignment

:::info
Ang mga boluntaryo lamang na hindi pa na-notify ang isasama. Kung magdagdag ka ng isang tao sa plano sa ibang pagkakataon, muling lalabas ang link para ma-notify mo ang bagong dagdag nang hindi muling nino-notify ang natitirang team.
:::

:::warning
Ang mga boluntaryo ay kailangang may naka-install na B1 Mobile app at naka-enable ang mga notification para makatanggap ng push notification. Tingnan ang [gabay sa Mga Notification](/docs/b1-mobile/community/notifications) para sa kung paano mai-enable ito ng mga boluntaryo sa kanilang device.
:::

## Mga kaugnay na artikulo

- [Mga Plano ng Serbisyo](./plans.md)
- [Mga Automation](./automations.md)
- [Mga Notification ng B1 Mobile](/docs/b1-mobile/community/notifications)
