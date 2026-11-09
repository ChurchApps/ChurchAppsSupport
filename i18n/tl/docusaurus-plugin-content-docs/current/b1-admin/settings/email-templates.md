---
title: "Mga Email Template"
description: "I-set up ang mga email at text message template sa B1 Admin, may mga merge field, opsyon sa text message, at preview para sa mass communication."
---

# Mga Email Template

<div class="article-intro">

Hinahayaan ka ng Email Templates na mag-save ng magagamit muli na nilalaman ng email -- isang mensahe ng pagtanggap, paalala sa event, o pasasalamat sa pagbibigay -- para maipadala mo ito (o ng isang [workflow](../serving/workflows.md)) sa isang click lang, sa halip na isulat ito mula sa simula sa bawat pagkakataon. Naglalaman din ang parehong listahan ng mga text message template para sa mga window ng Text ng grupo at ng tao, at para sa aksyong **Send Text** ng workflow.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng access sa lugar ng Settings sa B1 Admin.

</div>

## Pag-access sa Email Templates

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas) at i-expand ang **Settings**.
2. I-click ang **Email Templates**.
3. Makikita mo ang listahan ng mga umiiral na template kasama ang kanilang subject, kategorya, at petsa ng huling pagbabago.

## Paggawa ng Template

1. I-click ang **New Template**.
2. Maglagay ng **Template Name** para makilala ito sa listahan, at pumili ng **Category** (General, Events, Groups, Giving, Welcome, o Text) para matulungan ang pag-aayos ng mga template. Piliin ang **Text** para gawing text message template ito (tingnan ang [Text Templates](#text-templates) sa ibaba).
3. Ilagay ang **Subject** line.
4. Isulat ang **Body** gamit ang rich text editor.
5. I-click ang **Save**.

## Mga Merge Field {#merge-fields}

I-click ang merge field chip sa itaas ng Subject o Body para ilagay ito sa kinaroroonan ng cursor mo -- i-click muna ang lugar ng teksto kung saan mo gustong ilagay ang field, pagkatapos i-click ang chip. Nananatili sa lugar ang cursor mo, kaya maaari mong ipagpatuloy ang pag-type kaagad pagkatapos ng ipinasok na field. Kung mag-click ka ng chip sa Body nang hindi muna nag-click sa loob ng body, idaragdag ang field sa dulo ng body. Kapag naipadala na ang email, papalitan ng aktwal na impormasyon ng tatanggap ang bawat merge field:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Ang pangalan ng tatanggap
- `{{email}}` -- Ang email address ng tatanggap
- `{{churchName}}` -- Ang pangalan ng iyong simbahan

### Gift merge fields {#gift-merge-fields}

Pinupunan lamang ang mga field na ito kapag ipinadala ang email ng isang [workflow](../serving/workflows.md#sending-email) na sinimulan ng trigger na **Donation · Created**. Sa anumang ibang email, nananatili silang blangko.

- `{{amount}}` -- Ang halaga ng regalo, gaya ng $50.00
- `{{giftDate}}` -- Ang petsa ng regalo
- `{{fund}}` -- Ang fund o mga fund kung saan napunta ang regalo
- `{{receipt}}` -- Buod ng regalo: ang petsa at paraan, isang hanay para sa bawat fund kasama ang halaga nito, at ang kabuuan. Gamitin ito para makapagpadala ng resibo sa donor sa parehong email ng iyong pasasalamat. Para sa katawan lamang ito inaalok, hindi sa subject.

## Mga Text Template {#text-templates}

Ang template na may kategoryang **Text** ay simpleng text message para sa texting, sa halip na email:

- Walang subject ito. Pinapalitan ng simpleng kahong **Text Message** na may hanggang 1,600 karakter ang rich text editor.
- Ang mga merge field chip sa itaas ng kahon ay naglalagay ng `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`, o ang [gift merge fields](#gift-merge-fields) sa kinaroroonan ng cursor mo. Sa isang text, nagiging isang linya ang `{{receipt}}`, gaya ng *$50.00 to General Fund on Nov 8, 2026*.
- Lumalabas ang mga text template sa picker na **Load Template (optional)** ng Text window para sa isang [grupo](../groups/group-members.md#texting-group-members) o isang tao. Pinupunan ng pagpili ang mensahe, at maaari mo pa rin itong i-edit bago ipadala.
- Lumalabas din sila sa listahang **Start from a template** ng aksyong [Send Text](../serving/workflows.md#sending-a-text) ng workflow.
- Hindi isinasama ang mga ito sa mga email template picker, kabilang ang aksyong workflow na **Send email**.

Kailangan ng texting ng nakakonektang [texting provider](./church-settings.md#texting).

## Pag-preview ng Template

I-click ang **Preview** para makita kung paano lilitaw ang subject at body na may sample na datos na pumupuno sa mga merge field, bago ka mag-save o magpadala.

## Paggamit ng Template

Maaaring piliin ang mga naka-save na template kapag bumubuo ng email para sa mga tao o grupo, at bilang aksyon sa [Workflows](../serving/workflows.md). Bago sila maipadala ng iyong simbahan, kailangang aprubahan ng koponan ng ChurchApps ang iyong simbahan para sa group email nang isang beses. Tingnan ang [Turning On Group Email for Your Church](../groups/group-members.md#turning-on-group-email-for-your-church).

## Pag-e-edit at Pagbura

I-click ang icon na **Edit** sa tabi ng template para i-update ito, o ang icon na **Delete** para tuluyan itong alisin.

## Mga Susunod na Hakbang

- [Workflows](../serving/workflows.md) -- Awtomatikong i-trigger ang email ng template batay sa mga patakaran
