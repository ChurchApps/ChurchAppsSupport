---
title: "Mga Email Template"
---

# Mga Email Template

<div class="article-intro">

Ang mga Email Template ay nagbibigay-daan sa iyo na makatipid ng nilalaman ng email na maaaring gamitin muli -- isang mensahe ng pagdating, isang reminder ng kaganapan, isang pasasalamat sa pagbibigay -- upang ikaw (o isang [workflow](../serving/workflows.md)) ay maaaring magpadala nito sa isang pag-click sa halip na isulat ito mula simula bawat pagkakataon.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng access sa lugar ng Settings sa B1 Admin.

</div>

## Pag-access ng mga Email Template

1. Sa B1 Admin, buksan ang **section menu** sa tuktok-kaliwa (ang pangalan ng seksyon na may maliit na arrow) at pumili ng **Settings**.
2. I-click ang **Email Templates**.
3. Makikita mo ang isang listahan ng mga umiiral na template na may paksa, kategorya, at huling petsa ng pagbabago.

## Lumilikha ng Template

1. I-click ang **New Template**.
2. Magpasok ng isang **Template Name** upang matukoy ito sa listahan, at pumili ng isang **Category** (General, Events, Groups, Giving, o Welcome) upang makatulong sa pag-ayos ng iyong mga template.
3. Magpasok ng linya ng **Subject**.
4. Isulat ang **Body** gamit ang rich text editor.
5. I-click ang **Save**.

## Merge Fields

I-click ang isang merge field chip sa itaas ng Subject o Body upang ilagay ito sa iyong cursor. Kapag ipinadala ang email, bawat merge field ay pinalitan ng aktwal na impormasyon ng tatanggap:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Ang pangalan ng tatanggap
- `{{email}}` -- Ang email address ng tatanggap
- `{{churchName}}` -- Ang pangalan ng iyong simbahan

## Pag-preview ng Template

I-click ang **Preview** upang makita kung paano ang paksa at katawan ay magmukhang puno ng sample data para sa mga merge field, bago mo i-save o ipadala.

## Paggamit ng Template

Ang mga na-save na template ay available upang piliin kapag bumubuo ng email sa mga tao o grupo, at bilang aksyon sa [Workflows](../serving/workflows.md). Bago ang iyong simbahan ay maaaring magpadala ng mga ito, ang koponan ng ChurchApps ay kailangang aprubahan ito para sa group email minsan. Tingnan ang [Turning On Group Email for Your Church](../groups/group-members.md#turning-on-group-email-for-your-church).

## Pag-edit at Pagbura

I-click ang icon ng **Edit** sa tabi ng template upang i-update ito, o ang icon ng **Delete** upang permanent na alisin ito.

## Mga Susunod na Hakbang

- [Workflows](../serving/workflows.md) -- Mag-trigger ng isang email ng template nang awtomatiko batay sa mga patakaran
