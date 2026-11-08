---
title: "Pagsusuri ng Plano at mga Abiso"
description: "Suriin ang mga service plan sa B1 Admin para sa mga bakanteng posisyon, mga banggaan ng iskedyul, at mga boluntaryong naka-block out, pagkatapos ay magpadala ng push notification sa buong team mo sa isang click."
---

# Pagsusuri ng Plano at Mga Abiso sa Boluntaryo

<div class="article-intro">

Awtomatikong sinusuri ng B1 Admin ang iyong mga plano para sa mga problema bago ang Linggo: mga bakanteng posisyon, mga banggaan ng iskedyul, at mga boluntaryong nag-block out ng petsa. Kapag maayos na ang lahat, maaari mong abisuhan ang buong team mo sa isang click lang.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Gumawa ng [service plan](./plans.md) at magtalaga ng mga boluntaryo sa mga posisyon
- Magdagdag ng [service times](./plans.md) sa plano para masuri ng conflict detection ang mga magkakapatong na oras
- Siguraduhing naka-install ang [B1 App](../../b1-church/getting-started/installing-pwa.md) ng mga boluntaryo para makatanggap sila ng push notification

</div>

## Ang Validation Panel

Bawat plano ay may **Validation** panel na awtomatikong tumatakbo habang binubuo mo ito. Tatlong bagay ang sinusuri nito:

### Mga Bakanteng Posisyon
Kung nangangailangan ng mas maraming tao ang isang posisyon kaysa sa kasalukuyang nakatalaga, ililista ng validation panel kung ano pa ang kulang, halimbawa, *"Sound Tech: 1 tao pa ang kailangan."* Makikita mo agad kung kumpleto na ang staff ng plano mo bago dumating ang linggo.

### Mga Banggaan ng Iskedyul
Kung nakatalaga ang isang boluntaryo sa dalawang posisyong nagkakapatong ang oras sa loob ng iisang plano, mamarkahan ng validation panel ang banggaan, halimbawa, *"Jane Smith: banggaan sa oras ng Worship Leader at Children's Check-in sa Sunday Service."* Nahuhuli nito ang double-booking bago pa ito maging problema tuwing Linggo ng umaga.

### Mga Petsang Naka-block Out
Maaaring magtakda ang mga boluntaryo ng mga petsang hindi sila available sa B1 App. Kung may nakatalaga sa isang plano na nasa loob ng isa sa kanilang blockout date, awtomatikong ipapakita ng validation panel ang banggaan para makahanap ka ng kapalit.

### Mga Banggaan sa Pagitan ng Mga Plano
Sinusuri rin ng validation ang lahat ng plano mo nang sabay-sabay. Kung nakatalaga ang parehong boluntaryo sa dalawang magkaibang plano na nagkakapatong ang oras, halimbawa, isang serbisyo ng 9am at isang serbisyo ng 10am na parehong tumatagal hanggang 10:30am, markahan ng B1 Admin ang taong iyon bilang double-booked sa pagitan ng mga plano.

:::tip
Hindi mo kailangang gawin ang anuman para patakbuhin ang validation. Awtomatiko itong nag-a-update tuwing magdaragdag o magbabago ka ng assignment. Bantayan lang ang panel habang binubuo mo ang plano.
:::

## Pag-abiso sa mga Boluntaryo

Kapag handa na ang plano mo, maaari mong abisuhan ang lahat ng nakatalagang boluntaryo nang sabay-sabay mula mismo sa validation panel.

1. Buksan ang plano at mag-scroll papunta sa **Validation** panel
2. Kung may mga boluntaryong hindi pa nabibigyan ng abiso, makikita mo ang isang link na nagpapakita kung ilan ang kailangang abisuhan (hal., *"I-notify ang 8 boluntaryo"*)
3. I-click ang link para magpadala ng push notification sa lahat ng hindi pa nabibigyan ng abiso
4. Makakatanggap ang mga boluntaryo ng notification sa kanilang telepono na nagsasabing naitakda na sila sa iskedyul at hinihikayat silang kumpirmahin ang kanilang assignment

:::info
Kasama lang ang mga boluntaryong hindi pa nabibigyan ng abiso. Kung magdaragdag ka ng tao sa plano sa ibang pagkakataon, muling lilitaw ang link para maabisuhan mo ang bagong dagdag nang hindi inaabisuhan muli ang iba pang team.
:::

### Mga Plano na May Workflow ng Kumpirmasyon

Kung ang settings ng plano ay tumutukoy sa isang [confirmation workflow](./workflows.md#serving-assignment-confirmations), ipapakita ng panel ang mensaheng *"Ang mga bagong kahilingan ay gumagamit ng confirmation workflow. Nananatiling naka-enable ang mga alerto sa app. Hihinto ang mga follow-up kapag tinanggap o tinanggihan ang bawat kahilingan."* Sa ganitong kaso:

- Binibilang ng notify link ang mga boluntaryong hindi pa nabibigyan ng abiso at hindi pa tumutugon.
- Kapag na-click ito, magpapadala ito ng karaniwang in-app alert at gagawa ng isang card para sa bawat kahilingan sa board ng workflow. Pagkatapos, magpapadala ang workflow ng mga follow-up sa email at text at, kung kinakailangan, ibibigay ang kahilingan sa isang tao para tawagan.
- Dapat na-publish na ang plano (hindi lang pansamantalang nakalagay) at aktibo ang workflow. Kung hindi, ipapakita ng panel ang mensaheng *"Hindi naipadala ang mga kahilingan. Tiyaking aktibo ang napiling workflow at na-publish ang plano, pagkatapos ay subukan muli."*

:::warning
Dapat naka-install ang B1 App sa home screen ng mga boluntaryo at naka-enable ang notifications para makatanggap sila ng push notification. Tingnan ang [Pag-install bilang App (PWA)](../../b1-church/getting-started/installing-pwa.md) para sa mga tagubilin sa pag-setup.
:::

## Mga Kaugnay na Artikulo

- [Service Plans](./plans.md)
- [Workflows](./workflows.md)
- [Pag-install ng B1.church PWA](/docs/b1-church/getting-started/installing-pwa)
