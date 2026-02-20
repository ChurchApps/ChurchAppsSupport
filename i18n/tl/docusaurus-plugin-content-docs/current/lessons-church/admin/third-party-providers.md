---
title: "Mga Third-Party Provider"
---

# Mga Third-Party Provider

<div class="article-intro">

Sinusuportahan ng Lessons.church ang mga external na provider ng kurikulum sa pamamagitan ng Open Lesson Format. Nangangahulugan ito na maaari kang mag-import ng nilalaman mula sa ibang mga organisasyon at gawin itong available kasama ng built-in na library, na nagbibigay sa mga simbahan ng access sa kurikulum mula sa maraming pinagmulan sa isang lugar.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Magkaroon ng mga pahintulot ng admin para sa Lessons.church (tingnan ang [Pangkalahatang-tanaw ng Administrasyon](./index.md))
- Kunin ang feed URL mula sa external na provider na gusto mong ikonekta

</div>

## Pagdaragdag ng Provider

1. Mag-navigate sa **Admin** area.
2. Buksan ang pahina ng **Third-Party**.
3. I-click ang **Add Provider** (o ang katumbas na button upang magdagdag ng bagong koneksyon).
4. Ilagay ang **feed URL** ng provider. Ito ang URL kung saan ini-publish ng provider ang kanilang data ng kurikulum sa Open Lesson Format.
5. I-save ang koneksyon.

Kapag na-save na, ang Lessons.church ay mag-i-import ng nilalaman ng provider. Ang kanilang mga programa, pag-aaral, at aralin ay lalabas sa library ng kurikulum kasama ng iyong sariling nilalaman.

## Pamamahala ng mga Provider

Mula sa pahina ng **Third-Party**, makikita mo ang lahat ng nakakonektang provider. Para sa bawat provider, maaari mong:

- **Tingnan** ang na-import na nilalaman upang kumpirmahin na tama itong napull in.
- **I-update** ang feed URL kung binago ng provider ang kanilang endpoint.
- **Alisin** ang isang provider kung ayaw mo nang isama ang kanilang nilalaman.

## Ano ang Open Lesson Format?

Ang Open Lesson Format ay isang standardized na schema na naglalarawan ng nilalaman ng kurikulum -- mga programa, pag-aaral, aralin, venue, seksyon, at aksyon -- sa isang structured na paraan. Ang anumang organisasyon na nag-publish ng kanilang nilalaman gamit ang format na ito ay maaaring idagdag bilang provider sa Lessons.church.

Kung ikaw ay isang content provider na interesadong gawin ang iyong kurikulum na available sa pamamagitan ng Lessons.church, mahahanap mo ang kumpletong dokumentasyon ng schema sa [Open Lesson Schema](https://github.com/LiveChurchSolutions/LessonsScreen) repository.

## Bakit Gumamit ng mga Third-Party Provider?

- **Mas maraming pagpipilian para sa mga simbahan** -- Maaaring mag-browse ang mga simbahan ng mas malawak na uri ng kurikulum nang hindi umaalis sa platform.
- **Isang lugar para sa lahat** -- Hindi kailangang bumisita ang mga boluntaryo at coordinator sa maraming website upang maghanap at mag-iskedyul ng mga aralin.
- **Madaling setup** -- Ang pagdaragdag ng provider ay nangangailangan lamang ng feed URL. Walang manual na pag-encode ng data o pag-upload ng file na kasangkot.

:::info
Ang nilalaman ng third-party ay pinamamahalaan ng external na provider. Kung may napansin kang nawawala o hindi napapanahong nilalaman mula sa isang provider, maaaring kailanganin itong resolbahin sa kanilang panig.
:::

:::tip
Para sa pag-configure ng external na provider sa antas ng simbahan (hindi sa antas ng admin), tingnan ang pahina ng [Mga External na Provider](../browsing/external-providers.md) sa seksyon ng Pagba-browse.
:::
