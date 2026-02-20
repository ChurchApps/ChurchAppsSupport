---
title: "Stripe Import"
---

# Stripe Import

<div class="article-intro">

Kung tumatanggap ka ng online donation sa pamamagitan ng Stripe, ang Stripe Import tool ay nagpapahintulot sa iyo na i-pull ang mga transaksyong iyon sa B1 Admin para ang lahat ng iyong giving data ay nasa isang lugar. Ito ay partikular na kapaki-pakinabang para sa pag-catch ng anumang transaksyon na hindi awtomatikong na-sync.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kumpletuhin ang [Pag-setup ng Online na Pag-aalay](online-giving-setup.md) para ikonekta ang iyong Stripe account sa B1 Admin
- I-verify na mayroon kang mga donasyon sa iyong Stripe dashboard para sa date range na gusto mong i-import

</div>

## Paano Ito Gumagana

Ang proseso ng import ay gumagamit ng two-step workflow: una ay mag-preview ka kung ano ang ii-import, pagkatapos ay kukumpirmahin mo ang import. Ang dry-run na approach na ito ay nagpapahintulot sa iyo na suriin ang lahat bago magawa ang anumang data.

## Pag-import ng mga Transaksyon

1. Sa **B1 Admin**, mag-navigate sa **Donations > Batches**.
2. I-click ang **Stripe Import** link sa ibaba ng Batches page.
3. Pumili ng **date range** para sa mga transaksyon na gusto mong i-import.
4. I-click ang **Preview** para mag-run ng dry-run check.

## Pagsusuri ng Preview

Ang preview ay nagpapakita ng bawat transaksyon mula sa Stripe kasama ang isang status indicator:

- **New** -- ang transaksyong ito ay hindi pa na-import at isasama kung magpapatuloy ka.
- **Already Imported** -- ang transaksyong ito ay umiiral na sa B1 Admin at lalaktawan.
- **Skipped** -- ang transaksyong ito ay hindi kasama sa ibang dahilan (hal., refund o failed charge).

Ang summary section sa itaas ay nagpapakita ng kabuuang bilang ng mga transaksyon sa bawat kategorya at ang mga halagang kasangkot.

:::info
Ang preview step ay hindi gumagawa ng anumang record. Ito ay read-only na pagsusuri para ma-verify mo kung ano ang mangyayari bago mag-commit.
:::

## Pagkumpleto ng Import

1. Suriin ang mga preview result at summary total.
2. I-click ang **Import Missing** para i-import ang lahat ng transaksyon na namarkahan bilang **New**.
3. Pagkatapos makumpleto ang import, ang mga status chip sa tabi ng bawat transaksyon ay mag-a-update para ipakita ang resulta.

## Mga Tip para sa Paggamit ng Stripe Import

- Regular na mag-run ng import (linggu-linggo o buwan-buwan) para mapanatiling updated ang iyong mga record.
- Kung ang isang transaksyon ay lumalabas bilang **Already Imported**, nangangahulugan itong mayroon nang matching record ang B1 Admin -- walang kailangang aksyon.
- Gamitin ang date range filter para mag-focus sa isang partikular na panahon kung naghahanap ka ng mga partikular na transaksyon.

:::tip
Pagkatapos mag-import, bisitahin ang [Batches](batches.md) page para i-verify na tama ang paglabas ng mga na-import na donasyon at tumutugma ang mga total sa nakikita mo sa iyong Stripe dashboard.
:::

## Mga Susunod na Hakbang

- Suriin ang [Mga Report ng Donasyon](donation-reports.md) para suriin ang mga na-import na transaksyon kasama ng iyong iba pang giving data
- Siguraduhing ang mga na-import na donasyon ay naka-assign sa tamang mga [fund](funds.md) para sa tumpak na [mga giving statement](giving-statements.md)
