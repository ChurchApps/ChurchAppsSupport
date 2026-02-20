---
title: "Paglikha ng Mga Form"
---

# Paglikha ng Mga Form

<div class="article-intro">

Bumuo ng mga custom na form upang mangolekta ng impormasyon mula sa iyong kongregasyon. Maaari kang lumikha ng mga form para sa event registration, survey, visitor card, membership application, at marami pa. Ang mga form ay maaaring i-link sa mga tao sa iyong database o gamitin bilang standalone na pahina na may sariling pampublikong URL.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Para sa mga form na **People** (naka-link sa mga record ng tao), kailangan mo munang magkaroon ng [mga tao sa iyong database](../people/adding-people.md).
- Para sa mga form na nangongolekta ng **bayad**, kailangan mong [i-configure ang Stripe para sa online giving](../donations/online-giving-setup.md).

</div>

## Paglikha ng Bagong Form

1. Mag-navigate sa **Forms** mula sa pangunahing menu.
2. I-click ang **Add Form**.
3. Maglagay ng **pangalan** para sa iyong form.
4. Pumili ng uri ng form mula sa dropdown:
   - **People** — Iniuugnay ang mga sagot sa [mga record ng tao](../people/adding-people.md) sa iyong database.
   - **Stand Alone** — Lumilikha ng independiyenteng form na may sariling pampublikong URL, mainam para sa mga panlabas na pagpaparehistro.
5. I-click ang **Save** upang likhain ang form.

Ang iyong bagong form ay lilitaw sa listahan. I-click ito upang simulang magdagdag ng mga tanong.

## Pagdaragdag ng mga Tanong

1. Buksan ang iyong form at pumunta sa tab na **Questions**.
2. I-click ang **Add Question**.
3. Pumili ng **uri ng field** mula sa Provider dropdown. Ang mga available na uri ay kinabibilangan ng:
   - **Textbox** — Para sa maikling text na sagot
   - **Date** — Para sa pagpili ng petsa
   - **Email** — Para sa mga email address
   - **Phone Number** — Para sa input ng telepono
   - **Multiple Choice** — Para sa pagpili mula sa mga naunang tinukoy na opsyon
   - **Payment** — Para sa pangongolekta ng bayad
4. Maglagay ng **Title** at opsyonal na **Description** para sa tanong.
5. I-check ang **Require an answer** kung ang field ay kinakailangan.
6. I-click ang **Save**.
7. Ulitin upang magdagdag ng higit pang mga tanong.

:::warning
Ang uri ng field na **Payment** ay nangangailangan na na-configure ang Stripe. Kung hindi mo pa na-set up ang online giving, tingnan ang [Online Giving Setup](../donations/online-giving-setup.md) bago magdagdag ng mga payment field.
:::

## Pamamahala ng mga Miyembro ng Form

1. Buksan ang iyong form at pumunta sa tab na **Members**.
2. Maghanap ng isang tao at idagdag siya na may role:
   - **Admin** — Maaaring mag-edit ng form at tingnan ang lahat ng mga sagot.
   - **View Only** — Maaaring tingnan ang mga sagot ngunit hindi maaaring mag-edit ng form.

## Pag-configure ng mga Katangian ng Form

Maaari mong i-update ang pangalan at mga setting ng iyong form anumang oras. Para sa mga Stand Alone na form, makikita mo rin ang isang natatanging **pampublikong URL** na maaari mong ibahagi sa sinuman.

:::tip
Ang mga Stand Alone na form ay mainam para sa event registration. Ibahagi ang pampublikong URL sa pamamagitan ng email, social media, o i-embed ang form nang direkta sa website ng iyong simbahan.
:::

:::info
Upang mag-embed ng form sa iyong B1 website, pumunta sa iyong website editor, magdagdag ng bagong seksyon, at piliin ang elementong **Form**. Pagkatapos ay piliin ang form na gusto mong ipakita. Tingnan ang [Pamamahala ng mga Pahina](../website/managing-pages.md) para sa mga detalye sa pag-edit ng iyong website.
:::
