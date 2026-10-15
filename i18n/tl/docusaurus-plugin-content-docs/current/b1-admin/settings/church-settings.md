---
title: "Mga Setting ng Simbahan"
---

# Mga Setting ng Simbahan

<div class="article-intro">

Ang pahina ng Church Settings ang lugar kung saan mo i-configure ang pangunahing impormasyon ng iyong simbahan, mga detalye ng contact, at branding. Ginagamit ang mga detalyeng ito sa lahat ng ChurchApps tool, kabilang ang iyong B1.church website at ang B1 Mobile app.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ang permission na "Edit Church Settings". Tingnan ang [Roles & Permissions](./roles-permissions.md) kung wala kang access.
- Ihanda ang address, impormasyon sa contact, at logo ng iyong simbahan

</div>

## Pag-edit ng Impormasyon ng Iyong Simbahan

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), i-expand ang **Settings**, at i-click ang **Settings**.
2. Sa seksyong **Church Information** (sa itaas ng pahina), i-click ang **Edit**.
3. I-update ang alinman sa mga sumusunod na field:
   - **Church Name** -- Ang pangalang ipinapakita sa lahat ng ChurchApps product.
   - **Address** -- Ang pisikal na address ng iyong simbahan.
   - **Contact Information** -- Numero ng telepono, email, at iba pang detalye ng contact.
4. I-click ang **Save** upang ilapat ang iyong mga pagbabago.

## Pag-set up ng Iyong Subdomain

Ang iyong simbahan ay may libreng subdomain sa **yourchurch.1.church**. Ito ang web address kung saan makakapunta ang mga miyembro at bisita sa online presence ng iyong simbahan.

1. Sa Settings page, i-click ang **Edit** sa seksyong **Church Information** at hanapin ang **Subdomain** field.
2. Ilagay ang subdomain na gusto mo (halimbawa, "gracechurch" para sa gracechurch.1.church).
3. I-save ang iyong mga pagbabago.

:::info
Dapat natatangi ang iyong subdomain sa lahat ng ChurchApps church. Kung kinuha na ang pangalang gusto mo, subukang idagdag ang iyong lungsod o estado (halimbawa, "gracechurch-dallas").
:::

Kung nais mong maabot ng mga bisita ang iyong site sa sarili mong domain (halimbawa, **www.gracechurch.org**), tingnan ang [Custom Domain](./custom-domain.md).

## Pag-configure ng Branding

I-customize kung paano lumilitaw ang iyong simbahan sa lahat ng ChurchApps tool:

1. I-upload ang **church logo** ng iyong simbahan sa pamamagitan ng pag-click sa logo area at pagpili ng image file.
2. Magdagdag ng anumang karagdagang **church images** na ginagamit sa iyong website at [mobile app](./mobile-app.md).

:::tip
Para sa pinakamagandang resulta, gumamit ng logo na may transparent na background sa PNG format. Tinitiyak nitong maganda ito sa parehong light at dark na background.
:::

## Unang Araw ng Linggo

Piliin kung aling araw magsisimula ang iyong mga calendar. Ang dropdown na **First Day of Week** sa seksyong Church Info ay nakatakda sa **Sunday** bilang default, ngunit maaaring itakda sa anumang araw. Kapag nabago na, sinusunod ito sa mga calendar grid sa B1 Admin at sa B1.church member portal -- ang mga group calendar, curated calendar, at event editor ay lahat magsisimula ng linggo sa araw na pipiliin mo.

## Region (Format ng Petsa at Telepono)

Kinokontrol ng setting na **Region** kung paano isinusulat ang mga petsa at oras sa buong B1. Bilang default, gumagamit ang mga petsa ng format ng United States (halimbawa, "Sep 28, 2026" at "9/28/2026"). Maaaring lumipat sa sarili nilang format ang mga simbahang nasa labas ng US -- halimbawa, kung pipiliin ang English (United Kingdom), magiging "28 Sept 2026" at "28/09/2026" ang ipapakita.

1. Sa Settings page, i-click ang **Region** sa listahang nasa kaliwa, pagkatapos i-click ang **Edit** sa seksyong **Region**.
2. Piliin ang iyong region mula sa **Region** dropdown. Bawat opsyon ay nagpapakita ng sample na petsa upang makita mo kung paano talaga lilitaw ang mga petsa.
3. I-click ang **Save**.

Ipinapakita ng seksyong Region ang napili mong region, sample ng **Date format**, at ang format ng **Phone numbers** mo.

### Format ng Numero ng Telepono

Kinokontrol ng setting na **Phone numbers** sa parehong seksyong Region kung paano inilalagay ang mga numero ng telepono sa record ng isang tao:

- **International (with country code)** -- ang default. Ang mga phone field ay nagpapakita ng country flag picker at sine-save ang mga numero kasama ang country code (halimbawa, +1 918 555 1234).
- **Local (as typed)** -- nagiging simpleng text box ang mga phone field at sine-save ang mga numero nang eksakto gaya ng pagta-type mo, nang walang idinadagdag na country code (halimbawa, 0701 234 5678). Piliin ito kung ang iyong simbahan ay nagsusulat ng mga numero sa lokal na format at ayaw mong magdagdag ang B1 ng country code.

Kapag napili ang **Local**, ipinapakita rin ng seksyong Region ang "Local phone numbers" sa tabi ng iyong region.

:::tip
Pinakamainam ang texting kapag may country code ang mga numero. Kung nagpapadala ka ng text mula sa B1, panatilihin ang **International** na format, o siguraduhing may country code ang mga numerong itatype mo sa Local mode.
:::

Nalalapat ang iyong region sa mga petsa at oras sa buong B1 Admin at sa iyong B1.church website at member portal, kabilang ang mga sermon, blog post, group calendar, at serving plan, kaya nakikita ng mga miyembro ang mga petsa sa parehong format na nakikita ng iyong staff.

## Texting {#texting}

Kumonekta sa isang texting provider upang magpadala ng SMS sa isang tao o sa buong group mula sa B1 Admin. Ipinapadala ang mga text sa pamamagitan ng sarili mong account sa provider, kaya nalalapat ang kanilang presyo at limitasyon.

1. Sa Settings page, i-click ang **Texting** sa listahang nasa kaliwa, pagkatapos i-click ang **Edit** sa seksyong **Texting**.
2. Pumili ng **Provider**:
   - **Clearstream** -- maglagay ng **API Key**. Gumawa nito sa iyong Clearstream Account Settings sa ilalim ng API Keys.
   - **Text In Church** -- maglagay ng **API Key**. Humingi muna ng developer API access sa Text In Church Support, pagkatapos gumawa ng key sa seksyong Account Settings > Developer API.
   - **Nalo Solutions** (Ghana) -- ilagay ang auth key mula sa iyong Nalo Solutions account bilang **API Key**, at ang **Sender ID** (hanggang 11 karakter) na naaprubahan sa iyo ng Nalo.
3. I-click ang **Save**.

Upang itigil ang texting, itakda ang **Provider** sa **None** at i-save. Aalisin nito ang naka-save na provider.

### Pag-opt Out sa Mga Taong Sumagot ng STOP

Kapag na-save na ang isang provider, buksan muli ang seksyong Texting gamit ang **Edit**. Sa ibaba ng mga setting ng provider, may read-only na field na **Inbound (STOP) webhook URL** na nagpapakita ng web address na natatangi sa iyong simbahan. I-click ang field upang mapili ang address, kopyahin ito, at i-paste sa inbound message (reply) webhook setting ng iyong texting provider. Gumagana ito sa alinman sa mga provider sa itaas na kayang ipasa ang mga papasok na reply sa isang webhook.

Pagkatapos nito, kapag may sumagot ng **STOP** (o STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT, o REVOKE) sa alinman sa iyong mga text, hahanapin ng B1 ang lahat ng may tugmang mobile number, markahan sila bilang opted out, at i-o-off ang kanilang mga text reminder. Lalaktawan na sila sa mga group text. Hindi papansinin ang ibang mga reply.

:::info
Ginagamit nito ang parehong opt-out setting ng **Hide me from the member directory**, kaya ang mga sumagot ng STOP ay makikitang **Hidden from directory** din sa kanilang profile. Lumilitaw lamang ang field kapag napili ang naka-save na provider -- kung ililipat mo ang dropdown sa ibang provider, mag-save muna upang makita muli ang URL.
:::

Kapag nakakonekta na ang isang provider, makikita ng mga staff na may permission magpadala ng text ang isang button na **Text** sa pahina ng isang group (**Text this group**) at ng isang taong may mobile phone (**Send text message**). I-type ang iyong mensahe at i-click ang **Send**. Binibilang ng dialog ang mga karakter at SMS segment. Para sa isang group, ipinapakita nito kung ilang miyembro ang makakatanggap ng text bago mo ipadala:

- Nilalaktawan ang mga miyembrong walang mobile phone sa record.
- Ang mga miyembrong pumili ng **Hide me from the member directory** ay binibilang na opted out at nilalaktawan.
- Ang mga miyembro ng pamilyang nagbabahagi ng mobile number ay isang beses lamang makakatanggap ng text.

### Pag-personalize ng Mga Text Gamit ang Merge Fields {#personalizing-texts-with-merge-fields}

Sa ibaba ng message box, ipinapakita ng Text dialog ang mga placeholder chip: **First Name**, **Last Name**, **Display Name**, at **Church Name**. I-click ang isang chip upang ipasok ang placeholder nito (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, o `{{churchName}}`) sa iyong cursor. Kapag naipadala na ang text, papalitan ang bawat placeholder ng detalye ng bawat tatanggap, kaya ang group text na gaya ng `Hi {{firstName}}, see you Sunday!` ay makakarating sa bawat miyembro na may sarili nilang pangalan. Gumagana ang mga placeholder kapwa sa group text at sa text sa iisang tao.

:::info
Nalalapat ang limitasyong 1,600 karakter sa mensaheng tina-type mo. Pagkatapos mapunan ang mga placeholder, anumang text na lalampas sa 1,600 karakter ay puputulin sa haba na iyon.
:::

Maaari ding awtomatikong lumabas ang mga text mula sa isang [workflow](../serving/workflows.md#sending-a-text) step gamit ang aksyong **Send Text**, na gumagamit ng parehong provider at mga placeholder.

## File Storage

Bilang default, ginagamit ng mga file na ina-upload mo sa iyong website (sa pamamagitan ng [Files](../website/files.md)) at iba pang content area ang libreng hosted storage ng B1, hanggang 100MB. Kung kailangan mo ng mas maraming espasyo, maaari kang kumonekta sa sarili mong cloud storage -- ang mga bagong upload ay didiretso na sa iyong account nang walang limitasyon ng platform.

1. Sa Settings page, i-click ang **File Storage** sa listahang nasa kaliwa, pagkatapos i-click ang **Edit** sa seksyong **File Storage**.
2. Pumili ng provider: **Google Drive**, **Dropbox**, **OneDrive**, o isang **S3-compatible bucket** (AWS S3, Cloudflare R2, Backblaze B2, atbp.).
3. Para sa Google Drive, Dropbox, o OneDrive, i-click ang **Connect** at mag-sign in upang payagan ang access. Para sa S3-compatible bucket, ilagay ang iyong access key, secret, bucket name, at public URL base.
4. I-click ang **Save**.

:::info
Nakakaapekto lamang ito sa mga bagong upload sa iyong website Files at mga katulad na content area. Ang mga gallery image, thumbnail, logo, at larawan ng tao ay laging nananatili sa default storage ng B1.
:::

## Grade Promotion

Kung sinusubaybayan mo ang **Grade** ng mga bata at estudyante, maaaring awtomatikong itaas ng B1 ang lahat ng isang grade sa petsang pipiliin mo (halimbawa, Agosto 1) sa halip na i-edit mo ang bawat profile nang manual.

1. Sa Settings page, i-click ang **Grade Promotion** sa listahang nasa kaliwa, pagkatapos i-click ang **Edit** sa seksyong **Grade Promotion**.
2. I-on ang switch (ipinapakitang **Enabled**) at piliin ang **Month** at **Day** kung kailan itataas ang mga grade bawat taon. Sa petsang iyon, ang lahat na may grade ay aakyat ng isang grade, at ang mga nasa ika-12 grade ay magiging **Graduated**.
3. I-save ang iyong mga pagbabago.

Upang itigil ang awtomatikong pag-promote, i-off ang switch upang ipakitang **Disabled** at i-save. Aalisin ang petsa ng promotion at hindi na magbabago ang mga grade nang kusa.

## Volunteer Signup {#volunteer-signup}

Bilang default, nakikita ng mga miyembrong nagba-browse ng [volunteer signup](../../b1-church/serving/volunteer-signup.md) ang bawat paparating na linggo na may bukas na posisyon. Kung humaba ang listahang iyon, maaari mong ipakita na lamang ang susunod na linggo ng bawat plan type.

1. Sa Settings page, i-click ang **Volunteer Signup** sa listahang nasa kaliwa, pagkatapos i-click ang **Edit** sa seksyong **Volunteer Signup**.
2. I-on ang **Show only the next week of each plan type**.
3. I-save ang iyong mga pagbabago.

Kapag naka-on ito, ang bawat plan type ay magpapakita lamang ng susunod na paparating na plano. Lalabas ang kasunod na linggo kapag lumipas na ang petsang iyon. Ang row na **Weeks shown** ng seksyon ay magbabasang **Only the next week of each plan type** o **All upcoming weeks**.

## Giving Privacy {#giving-privacy}

Karaniwang nakikita ng mga taong may access sa giving ang kabuuang donasyon ng isang tao sa kanilang [person record](../people/adding-people.md#editing-details). Kung ayaw mong makita ang mga halaga sa screen sa tuwing bubuksan ang isang record, maaari mo silang itago hanggang may humingi.

1. Sa Settings page, i-click ang **Giving privacy** sa listahang nasa kaliwa, pagkatapos i-click ang **Edit** sa seksyong **Giving privacy**.
2. I-on ang **Hide giving on person records until clicked**.
3. I-save ang iyong mga pagbabago.

Kapag naka-on ito, sasabihin ng giving card sa person record na "Giving is hidden on person records." I-click ang **Show giving** upang i-load at ipakita ang donasyon ng taong iyon. Muli itong magtatago kapag nagbukas ka ng ibang tao. Hindi nagbabago kung sino ang makakakita ng giving: tanging ang mga taong may giving access lamang ang makakakita ng card.

## Import at Export

Ang link na **Import/Export** sa ilalim ng pangalan ng iyong simbahan sa Settings page ay nagbubukas ng nakalaang tool sa bagong browser window. Gamitin ito upang:

- Mag-import ng datos ng miyembro mula sa ibang church management system.
- Mag-export ng iyong ChurchApps data para sa backup o paglipat.

Lalo itong nakakatulong kapag kakasimula mo pa lang mag-set up ng iyong simbahan at kailangang ilipat ang mga umiiral na record sa ChurchApps.

:::warning
Kapag nag-i-import ng datos, laging i-back up muna ang iyong mga umiiral na record. Dinadagdagan ng mga import operation ang iyong sistema at maaaring gumawa ng duplicate na entry kapag inulit nang maraming beses.
:::
