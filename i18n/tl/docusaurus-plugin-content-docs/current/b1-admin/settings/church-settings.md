---
title: "Mga Setting ng Simbahan"
---

# Mga Setting ng Simbahan

<div class="article-intro">

Ang pahina ng Church Settings ay kung saan mo na-configure ang pangunahing impormasyon, mga detalye ng kontak, at branding ng iyong simbahan. Ang mga detalyeng ito ay ginagamit sa lahat ng mga tool ng ChurchApps, kasama ang iyong website ng B1.church at ang app na B1 Mobile.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng pahintulot na "Edit Church Settings". Tingnan ang [Roles & Permissions](./roles-permissions.md) kung wala kang access.
- Magkaroon ng handa na ang iyong address ng simbahan, impormasyon sa kontak, at logo

</div>

## Pag-edit ng Iyong Impormasyon sa Simbahan

1. Sa B1 Admin, buksan ang **section menu** sa tuktok-kaliwa (ang pangalan ng seksyon na may maliit na arrow) at pumili ng **Settings**.
2. Buksan ang seksyon ng **Church Information** at i-click ang edit (pencil) icon nito.
3. I-update ang alinman sa mga sumusunod na larangan:
   - **Church Name** -- Ang pangalan na ipinapakita sa lahat ng mga produktong ChurchApps.
   - **Address** -- Ang pisikal na address ng iyong simbahan.
   - **Contact Information** -- Numero ng telepono, email, at iba pang mga detalye sa kontak.
4. I-click ang **Save** upang ipatupad ang iyong mga pagbabago.

## Pagtatag ng Iyong Subdomain

Ang iyong simbahan ay nakakakuha ng libreng subdomain sa **yourchurch.1.church**. Ito ang web address kung saan ang mga miyembro at mga bumibisita ay maaaring mag-access sa online presence ng iyong simbahan.

1. Sa pahina ng Settings, hanapin ang larangan ng **Subdomain**.
2. Magpasok ng iyong preferred subdomain (halimbawa, "gracechurch" para sa gracechurch.1.church).
3. I-save ang iyong mga pagbabago.

:::info
Ang iyong subdomain ay dapat natatangi sa lahat ng mga simbahang ChurchApps. Kung ang iyong preferred na pangalan ay kinuha, subukan ang pagdaragdag ng iyong lungsod o estado (halimbawa, "gracechurch-dallas").
:::

Kung nais mong ang mga bumibisita na maabot ang iyong site sa iyong sariling domain (halimbawa, **www.gracechurch.org**), tingnan ang [Custom Domain](./custom-domain.md).

## Pagsasaayos ng Branding

I-customize kung paano lumilitaw ang iyong simbahan sa lahat ng mga tool ng ChurchApps:

1. I-upload ang iyong **church logo** sa pamamagitan ng pag-click sa logo area at pagpili ng isang image file.
2. Magdagdag ng anumang dagdag na **church images** na ginagamit sa iyong website at [mobile app](./mobile-app.md).

:::tip
Para sa pinakamahusay na mga resulta, gumamit ng logo na may transparent background sa PNG format. Sinisiguro nito na maganda ito sa parehong light at dark backgrounds.
:::

## Unang Araw ng Linggo

Pumili kung aling araw ang nagsisimula sa iyong mga kalendaryo. Ang dropdown ng **First Day of Week** sa seksyon ng Church Info ay default sa **Sunday**, ngunit maaaring itakda sa anumang araw. Kapag nabago, ito ay ginagalang sa lahat ng calendar grids sa B1 Admin at sa B1.church member portal -- ang mga kalendaryo ng grupo, curated calendars, at ang event editor ay lahat ng naglalabas ng mga linggo na nagsisimula sa araw na iyong pinili.

## File Storage

Sa pamamagitan ng default, ang mga file na iyong ina-upload sa iyong website (sa pamamagitan ng [Files](../website/files.md)) at iba pang mga lugar ng nilalaman ay gumagamit ng free na hosted storage ng B1, hanggang sa 100MB. Kung kailangan mo ng higit pang espasyo, maaari kang magsama ng iyong sariling cloud storage sa halip -- ang mga bagong upload ay napupunta direkta sa iyong account nang walang platform limit.

1. Sa pahina ng Settings, hanapin ang card na **File Storage** at i-click upang i-edit ito.
2. Pumili ng provider: **Google Drive**, **Dropbox**, **OneDrive**, o isang **S3-compatible bucket** (AWS S3, Cloudflare R2, Backblaze B2, atbp.).
3. Para sa Google Drive, Dropbox, o OneDrive, i-click ang **Connect** at mag-sign in upang i-authorize ang access. Para sa isang S3-compatible bucket, magpasok ng iyong access key, secret, bucket name, at public URL base.
4. I-click ang **Save**.

:::info
Ito ay nakakaapekto lamang sa mga bagong upload sa iyong website Files at katulad na mga lugar ng nilalaman. Ang mga imahe ng gallery, thumbnails, logos, at mga larawan ng tao ay laging manatili sa default storage ng B1.
:::

## Grade Promotion

Kung sinusubaybayan mo ang **Grade** sa mga bata at mga estudyante, ang B1 ay maaaring awtomatikong itaas ang lahat ng isang beses sa isang petsa na iyong pinili (halimbawa, Agosto 1) sa halip na kailangan mong mag-edit ng bawat profile nang manu-mano.

1. Sa pahina ng Settings, hanapin ang opsyon ng **Grade Promotion**.
2. I-turn ito on at pumili ng **month at day** upang itaas ang mga beses bawat taon.
3. I-save ang iyong mga pagbabago.

## Import at Export

Ang pindot ng **Import/Export** sa Settings header ay nagbubukas ng isang dedikadong tool sa isang bagong window ng browser. Gamitin ito upang:

- I-import ang data ng miyembro mula sa ibang sistema ng pamamahala ng simbahan.
- I-export ang iyong data ng ChurchApps para sa backup o layunin ng migrasyon.

Ito ay partikular na kapaki-pakinabang kapag nagsisimula ka nang itinakda ang iyong simbahan at kailangan mong ilagay ang mga umiiral na record sa ChurchApps.

:::warning
Kapag nag-import ng data, laging gumawa ng backup ng iyong mga umiiral na record nang una. Ang mga operasyon sa import ay nagdadagdag ng data sa iyong sistema at maaaring lumikha ng mga duplicate entry kung patakbuhin ng maraming beses.
:::
