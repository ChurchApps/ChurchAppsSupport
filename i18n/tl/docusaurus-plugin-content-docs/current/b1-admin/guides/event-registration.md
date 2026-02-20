---
title: "Gabay: I-set Up ang Pagpaparehistro sa Kaganapan"
---

# I-set Up ang Pagpaparehistro sa Kaganapan

<div class="article-intro">

Gumawa ng form para sa pagpaparehistro sa kaganapan, mangolekta ng impormasyon ng kalahok at opsyonal na mga bayarin, i-embed ito sa website ng iyong simbahan, at pamahalaan ang mga submission habang dumarating. Sa bandang huli, magkakaroon ka ng naisasarang pahina ng pagpaparehistro para sa anumang kaganapan ng simbahan.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- B1 Admin account na may admin access
- Para sa pagkolekta ng bayarin: kailangang [i-configure muna ang Stripe](../donations/online-giving-setup.md)

</div>

## Hakbang 1: Gumawa ng Stand Alone na Form

Ang mga Stand Alone na form ay may sariling pampublikong URL na maa-access ng kahit sino — perpekto para sa pagpaparehistro sa kaganapan.

Sundin ang gabay na [Paggawa ng mga Form](../forms/creating-forms.md) para:

1. Pumunta sa Forms at i-click ang Add Form
2. Piliin ang "Stand Alone" na uri — nagbibigay ito sa iyong form ng sariling pampublikong URL
3. Pangalanan ito ayon sa kaganapan (hal., "Pagpaparehistro sa Men's Retreat", "VBS Sign-Up")

## Hakbang 2: Magdagdag ng mga Tanong

Buuin ang mga field na kailangan mong kolektahin mula sa mga nagpaparehistro.

Sundin ang gabay na [Paggawa ng mga Form](../forms/creating-forms.md#adding-questions) para magdagdag ng iyong mga tanong:

1. Pumunta sa tab na Mga Tanong at magdagdag ng mga field para sa kinakailangang impormasyon: pangalan, email, telepono, dietary restrictions, laki ng t-shirt, emergency contact, atbp.
2. Gumamit ng Multiple Choice para sa mga opsyon tulad ng mga kagustuhan sa pagkain o pagpili ng sesyon

:::warning
Ang uri ng field na Payment ay nangangailangan na naka-configure ang Stripe. Kung hindi mo pa na-set up ang online giving, tingnan ang [Online Giving Setup](../donations/online-giving-setup.md) bago magdagdag ng mga payment field.
:::

## Hakbang 3: I-configure ang mga Setting ng Form

Kontrolin kung kailan at paano available ang iyong form ng pagpaparehistro.

1. Magtakda ng mga petsa ng availability kung ang pagpaparehistro ay dapat lang buksan sa limitadong panahon
2. Kopyahin ang pampublikong URL — maaari mo itong ibahagi nang direkta
3. Magdagdag ng mga miyembro ng form na may Admin o View Only na mga tungkulin para tumulong sa pamamahala ng mga submission

## Hakbang 4: I-embed sa Iyong Website

Gawing madaling mahanap ang form ng pagpaparehistro sa pamamagitan ng pagdaragdag nito sa website ng iyong simbahan.

Sundin ang gabay na [Pamamahala ng mga Pahina](../website/managing-pages.md) para:

1. Sa iyong B1 website editor, magdagdag ng bagong seksyon sa isang pahina at piliin ang Form element
2. Piliin ang iyong form ng pagpaparehistro mula sa listahan

:::tip
Ibahagi rin ang standalone URL sa pamamagitan ng email, social media, at mga bulletin ng simbahan — mas maraming lugar kung saan ito makikita, mas maraming signup ang makukuha mo.
:::

## Hakbang 5: Pamahalaan ang mga Submission

Subaybayan ang mga pagpaparehistro habang dumarating at i-export ang data kapag kailangan mo.

Sundin ang gabay na [Pamamahala ng mga Submission](../forms/managing-submissions.md) para:

1. Suriin ang mga tugon habang dumarating sa tab na Submissions
2. I-export sa CSV para sa mga spreadsheet, pagbibilang ng tao, o pagbabahagi sa mga coordinator ng kaganapan

## Tapos Ka Na!

Live na ang iyong pagpaparehistro sa kaganapan. Ibahagi ang link, i-embed ito sa iyong website, at subaybayan ang mga signup mula sa B1 Admin. Kapag tapos na ang kaganapan, i-export ang huling listahan para sa iyong mga rekord.

## Mga Kaugnay na Artikulo

- [Paggawa ng mga Form](../forms/creating-forms.md) — gumawa ng mga form na may iba't ibang uri ng field
- [Pamamahala ng mga Submission](../forms/managing-submissions.md) — suriin at i-export ang mga tugon sa form
- [Pamamahala ng mga Pahina](../website/managing-pages.md) — i-embed ang mga form sa iyong website
- [Online Giving Setup](../donations/online-giving-setup.md) — kinakailangan para sa mga payment field
