---
title: "Mga Email Template"
description: "I-set up ang mga template ng email at text message sa B1 Admin, may mga merge field, opsyon sa text message, at preview para sa mass communication."
---

# Mga Email Template

<div class="article-intro">

Hinahayaan ka ng Email Templates na mag-save ng reusable na content ng email -- isang welcome message, paalala sa event, o pasasalamat sa donasyon -- para ikaw (o isang [workflow](../serving/workflows.md)) ay makapagpadala nito sa isang click sa halip na isulat ito mula sa simula sa bawat pagkakataon. Naglalaman din ang parehong listahan ng mga template ng text message para sa mga Text window ng grupo at ng indibidwal, at para sa aksyong **Send Text** ng workflow.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng permiso na **Edit Church Settings** (lumalabas lamang ang menu item na **Email Templates** kung mayroon nito). Maaari ring buksan ng mga taong may **Edit Group Members** ang pahina nang direkta sa **/settings/email-templates**.

</div>

## Pag-access sa Email Templates {#accessing-email-templates}

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa itaas-kaliwa) at palawakin ang **Settings**.
2. I-click ang **Email Templates**.
3. Makikita mo ang listahan ng mga umiiral na template kasama ang **Name**, **Subject**, **Category**, at petsa ng **Modified** ng bawat isa.

## Paggawa ng Template {#creating-a-template}

1. I-click ang **New Template**.
2. Maglagay ng **Template Name** para makilala ito sa listahan, at pumili ng **Category** (General, Events, Groups, Giving, Welcome, o Text) para makatulong sa pag-aayos ng iyong mga template. Piliin ang **Text** para gumawa ng template ng text message sa halip (tingnan ang [Text Templates](#text-templates) sa ibaba).
3. Ilagay ang linya ng **Subject**.
4. Isulat ang **Body** gamit ang rich text editor.
5. I-click ang **Save**.

## Mga Merge Field {#merge-fields}

I-click ang merge field chip sa itaas ng Subject o Body para ipasok ito sa iyong cursor -- i-click muna sa lugar ng teksto kung saan mo gustong ilagay ang field, pagkatapos i-click ang chip. Nananatili ang iyong cursor sa puwesto, kaya maaari kang magpatuloy sa pag-type pagkatapos ng ipinasok na field. Kung mag-click ka ng Body chip nang hindi muna nag-click sa body, idaragdag ang field sa dulo ng body. Kapag naipadala na ang email, papalitan ang bawat merge field ng aktwal na impormasyon ng tatanggap:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Ang pangalan ng tatanggap
- `{{email}}` -- Ang email address ng tatanggap
- `{{churchName}}` -- Ang pangalan ng iyong simbahan

### Mga gift merge field {#gift-merge-fields}

Pinupunan lamang ang mga field na ito kapag ipinadala ang email ng isang [workflow](../serving/workflows.md#sending-email) na sinimulan ng trigger na **Donation · Created**. Sa anumang ibang email, iniiwang blangko ang mga ito.

- `{{amount}}` -- Ang halaga ng handog, gaya ng $50.00
- `{{giftDate}}` -- Ang petsa ng handog
- `{{fund}}` -- Ang fund o mga fund kung saan napunta ang handog
- `{{receipt}}` -- Buod ng handog: ang petsa at paraan, isang row para sa bawat fund kasama ang halaga nito, at ang kabuuan. Gamitin ito para magpadala sa donor ng resibo sa parehong email ng pasasalamat mo. Inaalok lamang ito para sa body, hindi para sa subject.

## Text Templates {#text-templates}

Ang template na may kategoryang **Text** ay isang plain-text na mensahe para sa texting sa halip na email:

- Walang subject ito. Pinapalitan ang rich text editor ng plain na kahong **Text Message** na may hanggang 1,600 karakter.
- Ang mga merge field chip sa itaas ng kahon ay nagpapasok ng `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`, o ang [mga gift merge field](#gift-merge-fields) sa iyong cursor. Sa text, nagiging isang linya ang `{{receipt}}`, gaya ng *$50.00 to General Fund on Nov 8, 2026*.
- Lumalabas ang mga text template sa picker na **Load Template (optional)** ng Text window para sa isang [grupo](../groups/group-members.md#texting-group-members) o isang indibidwal na tao. Ang pagpili ng isa ay pupunuin ang mensahe, at maaari mo pa rin itong i-edit bago ipadala.
- Lumalabas din sila sa listahang **Start from a template** ng aksyong workflow na [Send Text](../serving/workflows.md#sending-a-text).
- Hindi kasama ang mga ito sa mga email template picker, kasama na ang aksyong workflow na **Send email**.

Kailangan ng texting ng nakakabit na [texting provider](./church-settings.md#texting).

## Pag-preview ng Template {#previewing-a-template}

I-click ang **Preview** para makita kung paano lalabas ang subject at body na may sample na datos na pumupuno sa mga merge field, bago mo i-save o ipadala.

## Paggamit ng Template {#using-a-template}

Maaaring piliin ang mga naka-save na template kapag gumagawa ng email para sa mga tao o grupo, at bilang aksyon sa [Workflows](../serving/workflows.md). Bago makapagpadala ang simbahan mo ng mga ito, kailangang aprubahan ng team ng ChurchApps ang simbahan mo para sa group email nang isang beses. Tingnan ang [Turning On Group Email for Your Church](../groups/group-members.md#turning-on-group-email-for-your-church).

## Pag-edit at Pagbura {#editing-and-deleting}

I-click ang **Edit** sa row ng isang template para i-update ito, o ang **Delete** para permanenteng alisin ito. Humihingi ang B1 ng kumpirmasyon bago magbura.

## Mga Susunod na Hakbang {#next-steps}

- [Workflows](../serving/workflows.md) -- Awtomatikong i-trigger ang email ng template batay sa mga panuntunan
