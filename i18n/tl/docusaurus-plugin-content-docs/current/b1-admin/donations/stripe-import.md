---
title: "Stripe Import"
---

# Stripe Import

<div class="article-intro">

Kung tumatanggap ka ng online na donasyon sa pamamagitan ng Stripe, pinapayagan ka ng Stripe Import tool na hilahin ang mga transaksyong iyon papasok sa B1 Admin para nasa iisang lugar ang lahat ng datos ng iyong giving. Lalo itong kapaki-pakinabang para mahuli ang mga transaksyong hindi awtomatikong na-sync.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kumpletuhin ang [Online Giving Setup](online-giving-setup.md) para maikonekta ang iyong Stripe account sa B1 Admin. Lumalabas lang ang menu item na **Stripe Import** at ang butones sa pahina ng Batches kapag Stripe ang giving gateway ng iyong simbahan, at para lang sa mga taong maaaring mag-edit ng donasyon
- Siguraduhing may mga donasyon ka sa iyong Stripe dashboard para sa saklaw ng petsa na gusto mong i-import

</div>

## Paano Ito Gumagana

Dalawang hakbang ang proseso ng pag-import: una mong makikita ang preview ng ii-import, pagkatapos kukumpirmahin mo ang pag-import. Sa ganitong dry-run na paraan, masusuri mo ang lahat bago magawa ang anumang datos.

## Pag-import ng Mga Transaksyon

1. Sa **B1 Admin**, pumunta sa **Donations > Stripe Import**. (Maaari ka ring mag-click ng **Import missing Stripe transactions** sa itaas ng pahina ng **Batches**.)
2. Bubukas ang pahinang **Stripe Import**.
3. Pumili ng **date range** para sa mga transaksyong gusto mong i-import.
4. I-click ang **Preview** para patakbuhin ang dry-run check.

## Pagrepaso sa Preview

Ipinapakita ng preview ang bawat transaksyon mula sa Stripe kasama ang status indicator:

- **New** -- hindi pa naiimport ang transaksyong ito at isasama kung magpapatuloy ka.
- **Already Imported** -- umiiral na ang transaksyong ito sa B1 Admin at lalaktawan.
- **Skipped** -- hindi isinama ang transaksyong ito dahil sa ibang dahilan (halimbawa, refund o nabigong singil).

May seksyon ng buod sa itaas na nagpapakita ng kabuuang bilang ng mga transaksyon sa bawat kategorya at ang mga halagang kasangkot.

:::info
Hindi lumilikha ng anumang record ang hakbang ng preview. Read-only itong pagsusuri para ma-verify mo ang mangyayari bago ito gawin.
:::

## Pagkumpleto ng Pag-import

1. Repasuhin ang resulta ng preview at ang kabuuang buod.
2. I-click ang **Import Missing** para ma-import ang lahat ng transaksyong may markang **New**.
3. Pagkatapos makumpleto ang pag-import, magbabago ang mga status badge sa tabi ng bawat transaksyon para ipakita ang resulta.

## Mga Tip sa Paggamit ng Stripe Import

- Patakbuhin ang pag-import nang regular (lingguhan o buwanan) para manatiling updated ang iyong mga tala.
- Kung ang isang transaksyon ay nagpapakitang **Already Imported**, ibig sabihin mayroon nang tugmang record ang B1 Admin -- hindi na kailangan ng anumang aksyon.
- Gamitin ang date range filter para tumutok sa isang partikular na panahon kung naghahanap ka ng ilang partikular na transaksyon.

:::tip
Pagkatapos ng pag-import, bisitahin ang pahina ng [Batches](batches.md) para i-verify na lumalabas nang tama ang mga naimport na donasyon at tugma ang mga kabuuan sa nakikita mo sa iyong Stripe dashboard.
:::

## Mga Susunod na Hakbang

- Tingnan ang [Donation Reports](donation-reports.md) para suriin ang mga naimport na transaksyon kasama ang iba pang datos ng giving
- Siguraduhing nakatakda sa tamang [funds](funds.md) ang mga naimport na donasyon para tumpak ang [giving statements](giving-statements.md)
