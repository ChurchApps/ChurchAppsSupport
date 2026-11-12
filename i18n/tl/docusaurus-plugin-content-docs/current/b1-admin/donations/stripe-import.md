---
title: "Stripe Import"
description: "I-import ang mga donasyon sa Stripe papunta sa B1 Admin gamit ang preview-muna na import na nagmamarka sa bawat singil bilang bago, na-import na, o nilaktawan bago ka magpatuloy."
---

# Stripe Import

<div class="article-intro">

Kung tumatanggap ka ng online na donasyon sa pamamagitan ng Stripe, hinahayaan ka ng Stripe Import tool na ilipat ang mga transaksyong iyon papunta sa B1 Admin para nasa iisang lugar ang lahat ng datos ng giving mo. Lalo itong kapaki-pakinabang para mahuli ang anumang transaksyong hindi awtomatikong na-sync.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kumpletuhin ang [Online Giving Setup](online-giving-setup.md) para ikonekta ang iyong Stripe account sa B1 Admin. Lumalabas lamang ang menu item na **Stripe Import** at ang button sa Batches page kapag Stripe ang giving gateway ng iyong simbahan, at para lamang sa mga taong maaaring mag-edit ng donasyon
- Tiyaking may mga donasyon ka sa iyong Stripe dashboard para sa saklaw ng petsang gusto mong i-import

</div>

## Paano Ito Gumagana {#how-it-works}

Dalawang hakbang ang proseso ng import: una, makikita mo muna ang preview ng ii-import, pagkatapos kumpirmahin ang import. Sa ganitong dry-run na paraan, masusuri mo ang lahat bago pa gumawa ng anumang datos.

## Pag-import ng Mga Transaksyon {#importing-transactions}

1. Sa **B1 Admin**, pumunta sa **Donations > Stripe Import**. (Maaari mo ring i-click ang **Import missing Stripe transactions** sa itaas ng pahinang **Batches**.)
2. Bubukas ang pahinang **Import Stripe Transactions**.
3. Sa ilalim ng **Select Date Range**, itakda ang **Start Date** at **End Date** para sa mga transaksyong gusto mong i-import. Nagsisimula ang saklaw sa Enero 1 ng taóng ito hanggang ngayon.
4. I-click ang **Preview** para patakbuhin ang dry-run check. Mananatiling disabled ang **Import Missing** hanggang sa makahanap ang preview ng mga bagong transaksyon, at ang pagpalit ng alinman sa dalawang petsa ay buburahin ang preview para muna mong i-preview ang bagong saklaw.

## Pagsusuri ng Preview {#reviewing-the-preview}

Inililista ng preview ang bawat Stripe event kasama ang **Event ID**, **Type**, **Amount**, **Date**, at isang **Status**:

- **New** -- hindi pa na-import ang transaksyong ito at isasama kapag nagpatuloy ka.
- **Already Imported** -- umiiral na ang transaksyong ito sa B1 Admin at lalaktawan.
- **Skipped** -- hindi isinama ang transaksyong ito dahil sa ibang dahilan (hal., refund o pumalyang singil).

Ipinapakita ng buod sa itaas ang kabuuang **Total** ng mga event at kung ilan ang **New**, **Already Imported**, at **Skipped**. Kung may event na hindi mabasa, lalabas ang bilang ng **Errors** at ipapakita ng row ng event ang mensahe sa column na **Notes**.

:::info
Hindi gumagawa ng anumang talaan ang hakbang ng preview. Ito ay read-only na check para ma-verify mo ang mangyayari bago mag-commit.
:::

## Pagkumpleto ng Import {#completing-the-import}

1. Suriin ang resulta ng preview at ang mga kabuuan ng buod.
2. I-click ang **Import Missing** para i-import ang lahat ng transaksyong minarkahang **New**.
3. Pagkatapos makumpleto ang import, magiging **Import Results** ang listahan: bawat transaksyong naidagdag ay magpapakitang **Imported**, at dadagdag ang bilang ng **Imported** sa buod.

## Mga Tip sa Paggamit ng Stripe Import {#tips-for-using-stripe-import}

- Patakbuhin ang import nang regular (lingguhan o buwanan) para maging updated ang iyong mga talaan.
- Kung ang isang transaksyon ay ipinapakitang **Already Imported**, ibig sabihin may tugmang talaan na sa B1 Admin -- hindi na kailangan ng aksyon.
- Gamitin ang filter ng saklaw ng petsa para tumutok sa partikular na panahon kung naghahanap ka ng ilang partikular na transaksyon.

:::tip
Pagkatapos mag-import, bisitahin ang pahinang [Batches](batches.md) para i-verify na lumalabas nang tama ang mga na-import na donasyon at tumutugma ang mga kabuuan sa nakikita mo sa iyong Stripe dashboard.
:::

## Mga Susunod na Hakbang {#next-steps}

- Tingnan ang [Donation Reports](donation-reports.md) para suriin ang mga na-import na transaksyon kasama ng iba mo pang datos ng giving
- Siguraduhing nakatakda sa tamang [mga fund](funds.md) ang mga na-import na donasyon para tumpak ang [giving statements](giving-statements.md)
