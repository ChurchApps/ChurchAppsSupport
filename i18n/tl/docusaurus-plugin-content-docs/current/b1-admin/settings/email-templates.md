---
title: "Mga Template ng Email"
---

# Mga Template ng Email

<div class="article-intro">

Ang Mga Template ng Email ay nagbibigay-daan sa iyo na magsave ng mabagong nilalaman ng email -- isang welcome message, isang reminder ng event, isang giving thank-you -- upang ikaw (o isang [workflow](../serving/workflows.md)) ay maaaring magpadala nito sa isang click sa halip na isulat ito mula sa simula bawat pagkakataon.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng access sa lugar ng Mga Ayos sa B1 Admin.

</div>

## Pag-access sa Mga Template ng Email

1. Sa B1 Admin, buksan ang **menu ng seksyon** sa sulok sa itaas-kaliwa (ang pangalan ng seksyon na may maliit na arrow) at pumili ng **Mga Ayos**.
2. I-click ang **Mga Template ng Email**.
3. Makikita mo ang isang listahan ng mga umiiral na template na may kanilang subject, kategorya, at huling binago na petsa.

## Paglikha ng Isang Template

1. I-click ang **Bagong Template**.
2. Ipasok ang **Pangalan ng Template** upang tukuyin ito sa listahan, at pumili ng **Kategorya** (Pangkalahatan, Mga Event, Mga Grupo, Nagbibigay, o Pagbubukas) upang tumulong na ayusin ang iyong mga template.
3. Ipasok ang linya ng **Pakikipag-ugnayan**.
4. Isulat ang **Katawan** gamit ang rich text editor.
5. I-click ang **Magsave**.

## Mga Merge Field

I-click ang isang merge field chip sa itaas ng Subject o Katawan upang ilagay ito sa iyong cursor. Kapag ipinadala ang email, bawat merge field ay pinalitan ng aktwal na impormasyon ng tumatanggap:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Ang pangalan ng tumatanggap
- `{{email}}` -- Ang email address ng tumatanggap
- `{{churchName}}` -- Ang pangalan ng iyong simbahan

## Pag-preview ng Isang Template

I-click ang **Preview** upang makita kung paano ang subject at katawan ay magmumukhang may sample na data na puno para sa mga merge field, bago mo i-save o magpadala.

## Paggamit ng Isang Template

Ang mga nakaligtas na template ay available upang piliin mula sa paglikha ng isang email sa mga tao o isang grupo, at bilang isang aksyon sa [Mga Workflow](../serving/workflows.md).

## Pag-edit at Pagtanggal

I-click ang icon ng **Edit** sa tabi ng isang template upang i-update ito, o ang icon ng **Delete** upang permanenteng alisin ito.

## Mga Susunod na Hakbang

- [Mga Workflow](../serving/workflows.md) -- I-trigger ang template email ng awtomatiko batay sa mga patakaran
