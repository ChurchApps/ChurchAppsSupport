---
title: "Mga Email Template"
description: "I-set up ang email at text message template sa B1 Admin, may merge field, opsyon sa text message, at preview para sa mass communication."
---

# Mga Email Template

<div class="article-intro">

Hinahayaan ka ng Email Templates na mag-save ng magagamit muli na nilalaman ng email -- isang mensahe ng pagtanggap, paalala sa event, o pasasalamat sa pagbibigay -- para ikaw (o ang isang [workflow](../serving/workflows.md)) ay makapagpadala nito sa isang click lang sa halip na isulat ito mula sa simula sa bawat pagkakataon. Naglalaman din ang parehong listahan ng mga template ng text message para sa mga window ng Text ng grupo at ng tao.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng access sa Settings area sa B1 Admin.

</div>

## Pag-access sa Email Templates

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas) at palawakin ang **Settings**.
2. I-click ang **Email Templates**.
3. Makikita mo ang listahan ng mga umiiral na template kasama ang kanilang subject, kategorya, at petsa ng huling pagbabago.

## Paggawa ng Template

1. I-click ang **New Template**.
2. Maglagay ng **Template Name** para makilala ito sa listahan, at pumili ng **Category** (General, Events, Groups, Giving, Welcome, o Text) para matulungan ang pag-aayos ng mga template. Piliin ang **Text** para gawing template ng text message ang template (tingnan ang [Text Templates](#text-templates) sa ibaba).
3. Ilagay ang **Subject** line.
4. Isulat ang **Body** gamit ang rich text editor.
5. I-click ang **Save**.

## Merge Field {#merge-fields}

I-click ang merge field chip sa itaas ng Subject o Body para ilagay ito sa kinalalagyan ng cursor mo -- i-click muna ang text kung saan mo gustong ilagay ang field, pagkatapos i-click ang chip. Nananatili ang cursor mo sa lugar nito, kaya maaari mong ituloy ang pag-type kaagad pagkatapos ng ipinasok na field. Kung mag-click ka ng chip sa Body nang hindi muna nagki-click sa loob ng body, idaragdag ang field sa dulo ng body. Kapag naipadala na ang email, papalitan ang bawat merge field ng aktwal na impormasyon ng tatanggap:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Ang pangalan ng tatanggap
- `{{email}}` -- Ang email address ng tatanggap
- `{{churchName}}` -- Ang pangalan ng iyong simbahan

## Text Template {#text-templates}

Ang template na may kategoryang **Text** ay simpleng mensahe ng text para sa texting sa halip na email:

- Walang subject ito. Pinapalitan ang rich text editor ng simpleng kahong **Text Message** na may hanggang 1,600 character.
- Ang mga merge field chip sa itaas ng kahon ay naglalagay ng `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, o `{{churchName}}` sa kinalalagyan ng cursor mo.
- Lumalabas ang mga text template sa picker na **Load Template (optional)** ng Text window para sa isang [grupo](../groups/group-members.md#texting-group-members) o isang tao. Ang pagpili nito ay pupunuan ang mensahe, at maaari mo pa rin itong i-edit bago magpadala.
- Hindi isinasama ang mga ito sa mga email template picker, kabilang ang aksyong workflow na **Send email**.

Kailangan ng texting ang isang nakakonektang [texting provider](./church-settings.md#texting).

## Pag-preview ng Template

I-click ang **Preview** para makita kung paano lilitaw ang subject at body na may sample na datos na nakapuno sa mga merge field, bago ka mag-save o magpadala.

## Paggamit ng Template

Ang mga naka-save na template ay maaaring piliin kapag bumubuo ng email para sa mga tao o grupo, at bilang aksyon sa [Workflows](../serving/workflows.md). Bago sila maipadala ng iyong simbahan, kailangang aprubahan ng koponan ng ChurchApps ang iyong simbahan para sa group email nang isang beses. Tingnan ang [Turning On Group Email for Your Church](../groups/group-members.md#turning-on-group-email-for-your-church).

## Pag-edit at Pagbura

I-click ang icon na **Edit** sa tabi ng template para i-update ito, o ang icon na **Delete** para tuluyan itong alisin.

## Mga Susunod na Hakbang

- [Workflows](../serving/workflows.md) -- Awtomatikong i-trigger ang email ng template batay sa mga tuntunin
