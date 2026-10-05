---
title: "Mga Email Template"
---

# Mga Email Template

<div class="article-intro">

Hinahayaan ka ng mga Email Template na mag-save ng email na magagamit muli -- welcome message, paalala sa event, pasasalamat sa pagbibigay -- para ikaw (o isang [workflow](../serving/workflows.md)) ay makapagpadala nito sa isang click sa halip na isulat ito mula sa simula sa bawat pagkakataon.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan mo ng access sa lugar ng Settings sa B1 Admin.

</div>

## Pagpunta sa Email Templates

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa itaas na kaliwa) at i-expand ang **Settings**.
2. I-click ang **Email Templates**.
3. Makikita mo ang listahan ng mga umiiral na template kasama ang kanilang subject, kategorya, at petsa ng huling pagbabago.

## Paggawa ng Template

1. I-click ang **New Template**.
2. Maglagay ng **Template Name** para makilala ito sa listahan, at pumili ng **Category** (General, Events, Groups, Giving, o Welcome) para mapadali ang pag-aayos ng iyong mga template.
3. Ilagay ang **Subject** line.
4. Isulat ang **Body** gamit ang rich text editor.
5. I-click ang **Save**.

## Mga Merge Field

I-click ang isang merge field chip sa itaas ng Subject o Body para ipasok ito sa kinaroroonan ng cursor mo -- i-click muna ang text kung saan mo gustong ilagay ang field, saka i-click ang chip. Mananatili ang iyong cursor sa lugar nito, kaya maaari kang magpatuloy sa pag-type pagkatapos mismo ng ipinasok na field. Kung mag-click ka ng chip ng Body nang hindi muna nag-click sa loob ng body, idaragdag ang field sa dulo ng body. Kapag ipinadala ang email, papalitan ang bawat merge field ng aktwal na impormasyon ng tatanggap:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Ang pangalan ng tatanggap
- `{{email}}` -- Ang email address ng tatanggap
- `{{churchName}}` -- Ang pangalan ng iyong simbahan

## Pag-preview ng Template

I-click ang **Preview** para makita kung paano magiging hitsura ng subject at body na may sample na datos sa mga merge field, bago ka mag-save o magpadala.

## Paggamit ng Template

Ang mga naka-save na template ay maaaring piliin kapag gumagawa ng email para sa mga tao o grupo, at bilang aksyon sa [Workflows](../serving/workflows.md). Bago makapagpadala ang iyong simbahan, kailangang aprubahan muna ito ng team ng ChurchApps para sa group email nang isang beses. Tingnan ang [Pag-on ng Group Email para sa Iyong Simbahan](../groups/group-members.md#turning-on-group-email-for-your-church).

## Pag-edit at Pagbura

I-click ang icon na **Edit** sa tabi ng template para i-update ito, o ang icon na **Delete** para permanenteng alisin ito.

## Mga Susunod na Hakbang

- [Workflows](../serving/workflows.md) -- Awtomatikong mag-trigger ng email mula sa template batay sa mga alituntunin
