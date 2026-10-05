---
title: "Church Settings"
---

# Church Settings

<div class="article-intro">

Ang pahina ng Church Settings ay kung saan mo isinasaayos ang pangunahing impormasyon, contact details, at branding ng iyong simbahan. Ginagamit ang mga detalyeng ito sa lahat ng tool ng ChurchApps, kasama ang iyong B1.church website at ang B1 Mobile app.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan mo ang pahintulot na "Edit Church Settings". Tingnan ang [Mga Tungkulin at Pahintulot](./roles-permissions.md) kung wala kang access.
- Ihanda ang address, contact information, at logo ng iyong simbahan

</div>

## Pag-edit ng Impormasyon ng Iyong Simbahan

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa itaas na kaliwa), i-expand ang **Settings**, at i-click ang **Settings**.
2. Buksan ang seksyong **Church Information** at i-click ang edit (lapis) icon nito.
3. I-update ang alinman sa mga sumusunod na field:
   - **Church Name** -- Ang pangalang ipinapakita sa lahat ng produkto ng ChurchApps.
   - **Address** -- Ang pisikal na address ng iyong simbahan.
   - **Contact Information** -- Numero ng telepono, email, at iba pang contact details.
4. I-click ang **Save** para ilapat ang iyong mga pagbabago.

## Pag-set Up ng Iyong Subdomain

Nakakakuha ang iyong simbahan ng libreng subdomain sa **yourchurch.1.church**. Ito ang web address kung saan maaaring puntahan ng mga miyembro at bisita ang online na presensya ng iyong simbahan.

1. Sa pahina ng Settings, hanapin ang field na **Subdomain**.
2. Ilagay ang gusto mong subdomain (halimbawa, "gracechurch" para sa gracechurch.1.church).
3. I-save ang iyong mga pagbabago.

:::info
Dapat natatangi ang iyong subdomain sa lahat ng simbahan sa ChurchApps. Kung kinuha na ang gusto mong pangalan, subukang idagdag ang iyong lungsod o probinsya (halimbawa, "gracechurch-dallas").
:::

Kung gusto mong marating ng mga bisita ang iyong site sa sarili mong domain (halimbawa, **www.gracechurch.org**), tingnan ang [Custom Domain](./custom-domain.md).

## Pag-configure ng Branding

I-customize kung paano lumilitaw ang iyong simbahan sa lahat ng tool ng ChurchApps:

1. I-upload ang iyong **logo ng simbahan** sa pamamagitan ng pag-click sa lugar ng logo at pagpili ng image file.
2. Magdagdag ng iba pang **larawan ng simbahan** na gagamitin sa iyong website at [mobile app](./mobile-app.md).

:::tip
Para sa pinakamagandang resulta, gumamit ng logo na may transparent na background sa PNG format. Sisiguraduhin nito na maganda ito sa maliwanag at madilim na background.
:::

## Unang Araw ng Linggo

Piliin kung anong araw nagsisimula ang iyong mga kalendaryo. Ang dropdown na **First Day of Week** sa seksyong Church Info ay naka-default sa **Sunday**, pero maaaring itakda sa anumang araw. Kapag binago, susundin ito sa mga calendar grid sa B1 Admin at sa B1.church member portal -- ang mga kalendaryo ng grupo, curated na kalendaryo, at event editor ay pawang magsisimula ng linggo sa araw na pinili mo.

## Rehiyon (Format ng Petsa)

Kinokontrol ng setting na **Region** kung paano isinusulat ang mga petsa at oras sa buong B1. Bilang default, gumagamit ang mga petsa ng format ng Estados Unidos (halimbawa, "Sep 28, 2026" at "9/28/2026"). Ang mga simbahang nasa labas ng US ay maaaring lumipat sa sarili nilang format -- halimbawa, kapag pinili ang English (United Kingdom), ipapakita ang "28 Sept 2026" at "28/09/2026".

1. Sa pahina ng Settings, hanapin ang card na **Region** at i-click para i-edit ito.
2. Piliin ang iyong rehiyon mula sa dropdown na **Region**. Ang bawat opsyon ay may sample na petsa para makita mo nang eksakto kung paano lalabas ang mga petsa.
3. I-click ang **Save**.

Ipapakita na ng card na Region ang napili mong rehiyon at isang sample ng **Date format**.

Naaangkop ang iyong rehiyon sa mga petsa at oras sa buong B1 Admin at sa iyong B1.church website at member portal, kasama ang mga sermon, blog post, kalendaryo ng grupo, at serving plan, para makita ng mga miyembro ang mga petsa sa parehong format na nakikita ng iyong staff.

## Texting

Mag-connect ng texting provider para makapagpadala ng SMS sa isang tao o sa buong grupo mula sa B1 Admin. Ipinapadala ang mga text sa pamamagitan ng sarili mong account sa provider, kaya umiiral ang kanilang presyo at mga limitasyon.

1. Sa pahina ng Settings, hanapin ang card na **Texting** at i-click para i-edit ito.
2. Pumili ng **Provider**:
   - **Clearstream** -- ilagay ang **API Key**. Gumawa nito sa iyong Clearstream Account Settings sa ilalim ng API Keys.
   - **Text In Church** -- ilagay ang **API Key**. Humingi muna sa Text In Church Support ng developer API access, pagkatapos ay gumawa ng key sa iyong Account Settings > seksyong Developer API.
   - **Nalo Solutions** (Ghana) -- ilagay ang auth key mula sa iyong Nalo Solutions account bilang **API Key**, at isang **Sender ID** (hanggang 11 character) na inaprubahan ng Nalo para sa iyo.
3. I-click ang **Save**.

Para itigil ang pag-text, itakda ang **Provider** sa **None** at i-save. Aalisin nito ang naka-save na provider.

Kapag may naka-connect nang provider, ang staff na may pahintulot na magpadala ng text ay makakakita ng text icon sa header ng isang grupo (**Text this group**) at ng isang taong may mobile phone (**Send text message**). I-type ang iyong mensahe at i-click ang **Send**. Binibilang ng dialog ang mga character at SMS segment. Para sa grupo, ipinapakita nito kung ilang miyembro ang makakatanggap ng text bago mo ipadala:

- Lalaktawan ang mga miyembrong walang nakatalang mobile phone.
- Ang mga miyembrong pumili ng **Hide me from the member directory** ay ibibilang na nag-opt out at lalaktawan.
- Ang mga miyembro ng pamilya na iisa ang mobile number ay makakatanggap lang ng text nang isang beses.

### Pag-personalize ng mga Text gamit ang Merge Field

Sa ibaba ng message box, ipinapakita ng Text dialog ang mga placeholder chip: **First Name**, **Last Name**, **Display Name**, at **Church Name**. I-click ang isang chip para ipasok ang placeholder nito (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, o `{{churchName}}`) sa kinaroroonan ng iyong cursor. Kapag ipinadala ang text, papalitan ang bawat placeholder ng detalye ng tatanggap, kaya ang group text na `Hi {{firstName}}, see you Sunday!` ay makakarating sa bawat miyembro na may sarili nilang pangalan. Gumagana ang mga placeholder sa mga group text at sa mga text sa iisang tao.

:::info
Ang limitasyong 1,600 character ay naaangkop sa mensahe habang tina-type mo ito. Pagkatapos mapunan ang mga placeholder, ang anumang text na lampas sa 1,600 character ay puputulin sa haba na iyon.
:::

Maaari ring awtomatikong lumabas ang mga text mula sa isang hakbang ng [workflow](../serving/workflows.md#sending-a-text) gamit ang aksyong **Send Text**, na gumagamit ng parehong provider at mga placeholder.

## File Storage

Bilang default, ang mga file na ina-upload mo sa iyong website (sa pamamagitan ng [Files](../website/files.md)) at iba pang content area ay gumagamit ng libreng hosted storage ng B1, hanggang 100MB. Kung kailangan mo ng mas malaking espasyo, maaari mong i-connect ang sarili mong cloud storage -- ang mga bagong upload ay diretso nang mapupunta sa iyong account nang walang limitasyon mula sa platform.

1. Sa pahina ng Settings, hanapin ang card na **File Storage** at i-click para i-edit ito.
2. Pumili ng provider: **Google Drive**, **Dropbox**, **OneDrive**, o isang **S3-compatible bucket** (AWS S3, Cloudflare R2, Backblaze B2, atbp.).
3. Para sa Google Drive, Dropbox, o OneDrive, i-click ang **Connect** at mag-sign in para pahintulutan ang access. Para sa S3-compatible bucket, ilagay ang iyong access key, secret, pangalan ng bucket, at public URL base.
4. I-click ang **Save**.

:::info
Naaapektuhan lang nito ang mga bagong upload sa Files ng iyong website at mga katulad na content area. Ang mga larawan sa gallery, thumbnail, logo, at litrato ng mga tao ay laging mananatili sa default na storage ng B1.
:::

## Grade Promotion

Kung sinusubaybayan mo ang **Grade** ng mga bata at estudyante, maaaring awtomatikong i-akyat ng B1 ang lahat ng isang grade sa petsang pipiliin mo (halimbawa, Agosto 1) kaysa sa mano-manong pag-edit ng bawat profile.

1. Sa pahina ng Settings, hanapin ang opsyong **Grade Promotion**.
2. I-on ang switch (ipapakita nitong **Enabled**) at piliin ang **Month** at **Day** ng pag-akyat ng grade bawat taon. Sa petsang iyon, ang lahat ng may grade ay aakyat ng isang grade, at ang mga 12th grader ay magiging **Graduated**.
3. I-save ang iyong mga pagbabago.

Para itigil ang awtomatikong pag-akyat, i-off ang switch para ipakita nitong **Disabled** at i-save. Aalisin ang petsa ng pag-akyat at hindi na kusang magbabago ang mga grade.

## Import at Export

Ang button na **Import/Export** sa header ng Settings ay nagbubukas ng hiwalay na tool sa bagong browser window. Gamitin ito para:

- Mag-import ng datos ng mga miyembro mula sa ibang church management system.
- Mag-export ng iyong datos sa ChurchApps para sa backup o paglipat.

Lalo itong nakakatulong kapag kasisimula mo pa lang i-set up ang iyong simbahan at kailangan mong ilipat ang mga umiiral na record sa ChurchApps.

:::warning
Kapag nag-i-import ng datos, laging mag-backup muna ng iyong mga umiiral na record. Nagdaragdag ang mga import operation ng datos sa iyong sistema at maaaring lumikha ng mga duplicate na entry kung ulit-ulitin.
:::
