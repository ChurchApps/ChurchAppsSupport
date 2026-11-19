---
title: "Church Settings"
description: "Itakda ang pangalan, address, subdomain, time zone, format ng rehiyon, texting provider, at file storage ng iyong simbahan sa pahinang Church Settings ng B1 Admin."
---

# Church Settings

<div class="article-intro">

Ang pahinang Church Settings ang kinaroroonan para i-configure ang pangunahing impormasyon, contact details, at branding ng iyong simbahan. Ginagamit ang mga detalyeng ito sa lahat ng ChurchApps tool, kabilang ang iyong B1.church website at ang B1 App.

</div>

## Training Video {#training-video}

<YouTube id="634zSbzDkYA" title="Pag-set Up ng Church Info at Branding sa B1" next="Mga Role, Permiso, at Pag-imbita sa Iyong Team sa B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng permiso na "Edit Church Settings". Tingnan ang [Roles & Permissions](./roles-permissions.md) kung wala kang access.
- Ihanda ang address, contact information, at logo ng iyong simbahan

</div>

## Pag-edit ng Impormasyon ng Simbahan {#editing-your-church-information}

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa itaas-kaliwa), palawakin ang **Settings**, at i-click ang **Settings**.
2. Sa seksyong **Church Information** (sa itaas ng pahina), i-click ang **Edit**.
3. I-update ang alinman sa mga sumusunod na field:
   - **Church Name** *(kinakailangan)* -- Ang pangalang ipinapakita sa lahat ng ChurchApps product.
   - **Subdomain** *(kinakailangan)* -- Ang iyong libreng B1 web address. Tingnan ang [Setting Up Your Subdomain](#setting-up-your-subdomain) sa ibaba.
   - **Address Line 1**, **Address Line 2**, **City**, **State**, **Zip**, at **Country** -- Ang pisikal na address ng iyong simbahan.
   - **First Day of Week** -- Tingnan ang [First Day of Week](#first-day-of-week) sa ibaba.
   - **Time Zone** -- Ang time zone ng iyong simbahan. Tingnan ang [Time Zone](#time-zone) sa ibaba.
4. I-click ang **Save** para ilapat ang iyong mga pagbabago, o **Cancel** para itapon ang mga ito.

Lumalabas din ang pangalan ng simbahan, subdomain, at address sa panel sa itaas-kaliwa ng pahinang Settings.

## Pag-set Up ng Iyong Subdomain {#setting-up-your-subdomain}

Makakakuha ang iyong simbahan ng libreng subdomain sa **yourchurch.b1.church**. Ito ang web address kung saan maaaring pumunta ang mga miyembro at bisita para ma-access ang online presence ng simbahan.

1. Sa pahinang Settings, i-click ang **Edit** sa seksyong **Church Information** at hanapin ang field na **Subdomain**.
2. Ilagay ang gusto mong subdomain (halimbawa, "gracechurch" para sa gracechurch.b1.church).
3. I-save ang iyong mga pagbabago.

:::info
Dapat natatangi ang iyong subdomain sa lahat ng simbahan ng ChurchApps. Kung kinuha na ang gusto mong pangalan, subukang idagdag ang iyong lungsod o estado (halimbawa, "gracechurch-dallas").
:::

Kung gusto mong maabot ng mga bisita ang iyong site sa sarili mong domain (halimbawa, **`www.gracechurch.org`**), tingnan ang [Custom Domain](./custom-domain.md).

## Pag-configure ng Branding {#configuring-branding}

Hindi itinatakda sa pahinang Settings ang logo at mga kulay ng iyong simbahan. I-upload ang logo ng simbahan at piliin ang mga kulay sa ilalim ng **Website > Appearance** -- tingnan ang [Logo and Branding](../website/appearance.md#logo-and-branding). Ang mga kulay na ginagamit ng B1 app, member portal, at check-in kiosk ay itinatakda sa ilalim ng **Mobile > App Theme** -- tingnan ang [App Theme](./mobile-app.md#app-theme).

## General (Support Contact) {#general-support-contact}

Nasa seksyong **General** ang iyong **Support Contact**: ang email address o link ng contact form na ginagamit ng mga tao para maabot ang simbahan mo. I-click ang **Edit** sa seksyong **General**, ilagay ito sa field na **Link**, at i-click ang **Save**. Hanggang wala kang nakatakda, ipinapakita ng seksyon ang **Not set**.

## First Day of Week {#first-day-of-week}

Piliin kung aling araw nagsisimula ang iyong mga kalendaryo. Ang dropdown na **First Day of Week** sa seksyong Church Info ay naka-default sa **Sunday**, pero maaaring itakda sa anumang araw. Kapag nabago na, sinusunod ito sa mga calendar grid sa B1 Admin at sa B1.church member portal -- ang mga group calendar, curated calendar, at event editor ay nagsisimula ang linggo sa araw na pipiliin mo.

## Time Zone {#time-zone}

Itinatakda ng dropdown na **Time Zone** sa seksyong **Church Information** ang time zone ng iyong simbahan (halimbawa, *America/Chicago*). Piliin ang **None** para iwanang blangko. Kapag na-save na, lalabas ang zone sa buod ng Church Information.

Ginagamit ng B1 ang time zone na ito para sa mga oras na sakop ng buong simbahan, gaya ng mga paalala sa event at mga iskedyul sa iyong [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md) TV. Ang [mga check-in schedule](../attendance/setup.md#setting-a-check-in-schedule) ay sinusukat muna sa time zone ng [campus](./campuses.md) ng serbisyo, at ginagamit lamang ang time zone ng simbahan kapag walang time zone ang campus na iyon. Kung nasa iisang time zone ang lahat ng campus mo, itakda ito sa simbahan at sa bawat campus.

## Region (Format ng Petsa at Telepono) {#region-date-and-phone-format}

Kinokontrol ng setting na **Region** kung paano isinusulat ang mga petsa at oras sa buong B1. Bilang default, gumagamit ang mga petsa ng format ng United States (halimbawa, "Sep 28, 2026" at "9/28/2026"). Maaaring lumipat sa sarili nilang format ang mga simbahang nasa labas ng US -- halimbawa, kung pipiliin ang English (United Kingdom), "28 Sept 2026" at "28/09/2026" ang lalabas.

1. Sa pahinang Settings, i-click ang **Region** sa listahan sa kaliwa, pagkatapos i-click ang **Edit** sa seksyong **Region**.
2. Piliin ang iyong rehiyon mula sa dropdown na **Region**. Nagpapakita ang bawat opsyon ng sample na petsa para makita mo kung paano eksaktong lalabas ang mga petsa.
3. I-click ang **Save**.

Pagkatapos nito, ipinapakita ng seksyong Region ang napili mong rehiyon, sample ng **Date format**, at format ng **Phone numbers** mo.

### Format ng Numero ng Telepono {#phone-number-format}

Ang parehong seksyong Region ay may setting na **Phone numbers** na kumokontrol kung paano inilalagay ang mga numero ng telepono sa talaan ng tao:

- **International (with country code)** -- ang default. Nagpapakita ang mga phone field ng country flag picker at sine-save ang mga numero kasama ang country code (halimbawa, +1 918 555 1234).
- **Local (as typed)** -- nagiging simpleng text box ang mga phone field at sine-save ang mga numero nang eksakto gaya ng pag-type mo, nang walang idinagdag na country code (halimbawa, 0701 234 5678). Piliin ito kung ang simbahan mo ay nagsusulat ng mga numero sa lokal na format at ayaw mong magdagdag ang B1 ng country code.

Kapag napili ang **Local**, ipinapakita rin ng seksyong Region ang "Local phone numbers" sa tabi ng rehiyon mo.

:::tip
Pinakamahusay gumana ang texting kapag may country code ang mga numero. Kung nagpapadala ka ng text mula sa B1, panatilihin ang format na **International**, o siguraduhing kasama ang country code ang mga numerong ita-type mo sa Local mode.
:::

Nalalapat ang rehiyon mo sa mga petsa at oras sa buong B1 Admin at sa iyong B1.church website at member portal, kabilang ang mga sermon, blog post, group calendar, at serving plan, para makita ng mga miyembro ang mga petsa sa parehong format na nakikita ng staff mo.

### Araw ng Pagsamba {#worship-day}

Mayroon ding setting na **Worship day** ang seksyong Region para sa araw kung kailan nagaganap ang iyong pangunahing serbisyo. Ito ay **Sunday** maliban kung babaguhin mo. Maaaring piliin ng mga simbahang sumasamba tuwing Sabado (o ibang araw) ang araw na iyon, at sinusunod ito ng Dashboard: ang pangunahing heading ay nagsasabing "This Saturday", ang mga side panel ay nagsasabing "Serving Saturday" at "Last Saturday", ang petsa ng serbisyong ipinapakita ay ang paparating na Sabado, at naiilawan ang live na bilang na "in the room" sa mga check-in tuwing Sabado.

Kapag hindi Sunday ang worship day, ipinapakita rin ng entry na Region sa kaliwang listahan ang araw sa tabi ng iyong rehiyon.

## Texting {#texting}

Mag-connect ng texting provider para makapagpadala ng SMS sa isang tao o sa buong grupo mula sa B1 Admin. Ipinapadala ang mga text sa sarili mong account sa provider, kaya nalalapat ang kanilang presyo at limitasyon.

1. Sa pahinang Settings, i-click ang **Texting** sa listahan sa kaliwa, pagkatapos i-click ang **Edit** sa seksyong **Texting**.
2. Pumili ng **Provider**:
   - **Clearstream** -- maglagay ng **API Key**. Gumawa nito sa iyong Clearstream Account Settings sa ilalim ng API Keys.
   - **Text In Church** -- maglagay ng **API Key**. Humingi muna ng developer API access sa Text In Church Support, pagkatapos gumawa ng key sa iyong Account Settings > Developer API section.
   - **Nalo Solutions** (Ghana) -- ilagay ang auth key mula sa iyong Nalo Solutions account bilang **API Key**, at ang **Sender ID** (hanggang 11 karakter) na inaprubahan sa iyo ng Nalo.
   - **Twilio** -- gamitin ang sarili mong Twilio account ng simbahan; direktang sinisingil ka ng Twilio. Kopyahin ang **Account SID** at **Auth Token** mula sa [Twilio Console](https://console.twilio.com), at ilagay ang **From Number** -- isang Twilio phone number na nakarehistro para sa A2P 10DLC, sa format na tulad ng `+15551234567`. Pagkatapos mag-save, i-paste ang inbound webhook URL (tingnan sa ibaba) sa webhook na **A message comes in** ng numero sa Twilio para maitala rin sa B1 ang mga sagot na STOP.
3. I-click ang **Save**.

Para ihinto ang texting, itakda ang **Provider** sa **None** at i-save. Tinatanggal nito ang naka-save na provider.

### Pag-opt Out sa mga Taong Sumasagot ng STOP {#opting-out-people-who-reply-stop}

Kapag na-save na ang provider, buksan muli ang seksyong Texting gamit ang **Edit**. Sa ilalim ng mga setting ng provider, may read-only na field na **Inbound (STOP) webhook URL** na nagpapakita ng web address na natatangi sa simbahan mo. I-click ang field para piliin ang address, kopyahin ito, at i-paste sa setting ng inbound message (reply) webhook ng iyong texting provider. Gumagana ito sa alinman sa mga provider sa itaas na kayang magpasa ng mga papasok na reply sa isang webhook.

Pagkatapos nito, kapag may sumagot ng **STOP** (o STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT, o REVOKE) sa isa sa mga text mo, hahanapin ng B1 ang lahat ng may mobile number na tumutugma, mamarkahan silang nag-opt out, at papatayin ang kanilang text reminder. Nilalaktawan na sila ng mga group text. Hindi pinapansin ang ibang reply.

:::info
Gumagamit ito ng parehong opt-out setting ng **Hide me from the member directory**, kaya ang mga sumasagot ng STOP ay ipinapakita ring **Hidden from directory** sa kanilang profile. Lumalabas lamang ang field kapag napili ang naka-save na provider -- kung palitan mo ang dropdown sa ibang provider, mag-save muna bago makita muli ang URL.
:::

Kapag nakakonekta na ang provider, ang staff na may permiso na magpadala ng text ay makakakita ng button na **Text** sa pahina ng grupo (**Text this group**) at ng taong may mobile phone (**Send text message**). I-type ang iyong mensahe at i-click ang **Send**. Binibilang ng dialog ang mga karakter at SMS segment. Para sa grupo, ipinapakita nito kung ilang miyembro ang makakatanggap ng text bago ka magpadala:

- Nilalaktawan ang mga miyembrong walang mobile phone sa talaan.
- Ang mga miyembrong pumili ng **Hide me from the member directory** ay binibilang bilang nag-opt out at nilalaktawan.
- Ang mga miyembro ng pamilyang nagbabahagi ng mobile number ay isang beses lamang makakatanggap ng text.

### Pag-personalize ng Text gamit ang Merge Field {#personalizing-texts-with-merge-fields}

Sa ilalim ng kahon ng mensahe, nagpapakita ang Text dialog ng mga placeholder chip: **First Name**, **Last Name**, **Display Name**, at **Church Name**. I-click ang isang chip para ipasok ang placeholder nito (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, o `{{churchName}}`) sa iyong cursor. Kapag naipadala na ang text, papalitan ang bawat placeholder ng detalye ng tatanggap, kaya ang group text na gaya ng `Hi {{firstName}}, see you Sunday!` ay makakarating sa bawat miyembro na may sariling pangalan. Gumagana ang mga placeholder kapwa sa group text at sa text sa iisang tao. Ang mga text sa grupo ay nag-aalok din ng chip na **Group Name** (`{{groupName}}`), na papalitan ng pangalan ng grupo.

Para magamit muli ang isang mensahe, i-save ito bilang [text template](./email-templates.md#text-templates) (isang email template na may kategoryang **Text**) at piliin ito mula sa **Load Template (optional)** sa itaas ng Text window.

:::info
Nalalapat ang limitasyong 1,600 karakter sa mensahe habang tina-type mo ito. Pagkatapos mapuno ang mga placeholder, anumang text na lalampas sa 1,600 karakter ay puputulin sa haba na iyon.
:::

Maaari ring ipadala nang awtomatiko ang mga text mula sa isang hakbang ng [workflow](../serving/workflows.md#sending-a-text) gamit ang aksyong **Send Text**, na gumagamit ng parehong provider at mga placeholder.

## File Storage {#file-storage}

Bilang default, ang mga file na ina-upload mo sa iyong website (sa pamamagitan ng [Files](../website/files.md)) at iba pang content area ay gumagamit ng libreng hosted storage ng B1, hanggang 100MB. Kung kailangan mo ng mas maraming espasyo, maaari kang mag-connect ng sarili mong cloud storage -- ang mga bagong upload ay didiretso na sa iyong account nang walang limitasyon ng platform.

1. Sa pahinang Settings, i-click ang **File Storage** sa listahan sa kaliwa, pagkatapos i-click ang **Edit** sa seksyong **File Storage**.
2. Pumili ng **Provider**: **Google Drive**, **Dropbox**, o **S3-Compatible Bucket (S3, R2, B2)** (AWS S3, Cloudflare R2, Backblaze B2, atbp.). Ang **ChurchApps (Free)** ang built-in na storage.
3. Para sa Google Drive o Dropbox, i-click ang **Connect Account** at mag-sign in para pahintulutan ang access. Lalabas ang badge na **Account connected** kapag gumana na; kailangan mong makakonekta bago ka makapag-save. Para sa S3-compatible bucket, ilagay ang **Access Key Id**, **Secret Access Key**, **Bucket**, **Endpoint** (iwanang blangko para sa AWS), **Region**, at **Public URL Base**. Kinakailangan ang **Bucket** at **Public URL Base**, at dapat payagan ng bucket ang public read at CORS upload mula sa B1.
4. I-click ang **Save**.

Para bumalik sa libreng storage, piliin ang **ChurchApps (Free)** at i-save. Mananatili kung nasaan na ang mga file na na-upload na.

:::info
Ang pagbabagong ito ay nakakaapekto lamang sa mga bagong upload sa Files ng iyong website at mga katulad na content area. Ang mga gallery image, thumbnail, logo, at larawan ng tao ay laging nasa default na storage ng B1.
:::

## Giving {#giving}

Ikinokonekta ng seksyong **Giving** ang iyong payment provider at itinatakda ang currency ng simbahan mo para sa online giving at mga bayad na registration. Tingnan ang [Online Giving Setup](../donations/online-giving-setup.md). Lumalabas lamang ito para sa mga taong maaaring mag-edit ng giving settings.

## Check-In {#check-in}

Itinatakda ng seksyong **Check-In** ang **Volunteer Ratio Enforcement** -- kung magbababala lamang (**Warn (allow with confirmation)**) o hihinto sa pag-check in (**Block (prevent check-in)**) ang check-in kapag kulang sa volunteer ang isang kuwarto. Tingnan ang [Volunteer Ratios](../attendance/checkin-safety.md#volunteer-ratios). Binubuksan ng link na **Check-in kiosk, QR, and labels** sa ilalim nito ang mga setting ng kiosk sa pahinang Mobile.

## Grade Promotion {#grade-promotion}

Kung sinusubaybayan mo ang **Grade** ng mga bata at estudyante, awtomatikong maitataas ng B1 ang lahat ng isang grade sa petsang pipiliin mo (halimbawa, Agosto 1) sa halip na i-edit ang bawat profile nang manwal.

1. Sa pahinang Settings, i-click ang **Grade Promotion** sa listahan sa kaliwa, pagkatapos i-click ang **Edit** sa seksyong **Grade Promotion**.
2. I-on ang switch (magpapakitang **Enabled**) at piliin ang **Month** at **Day** para sa pag-promote ng grade bawat taon. Sa petsang iyon, ang lahat na may grade ay aakyat ng isang grade, at ang mga nasa ika-12 grade ay magiging **Graduated**.
3. I-save ang iyong mga pagbabago.

Para ihinto ang awtomatikong promotion, i-off ang switch para magpakitang **Disabled** at i-save. Tinatanggal ang petsa ng promotion at hindi na awtomatikong magbabago ang mga grade.

## Volunteer Signup {#volunteer-signup}

Bilang default, nakikita ng mga miyembrong nagba-browse ng [volunteer signup](../../b1-church/serving/volunteer-signup.md) ang bawat paparating na linggong may bukas na posisyon. Kung humaba ang listahang ito, maaari mong ipakita na lamang ang susunod na linggo ng bawat plan type.

1. Sa pahinang Settings, i-click ang **Volunteer Signup** sa listahan sa kaliwa, pagkatapos i-click ang **Edit** sa seksyong **Volunteer Signup**.
2. I-on ang **Show only the next week of each plan type**.
3. I-save ang iyong mga pagbabago.

Kapag naka-on ito, ang bawat plan type ay magpapakita lamang ng susunod nitong paparating na plan. Lilitaw ang sumunod na linggo kapag lumipas na ang petsang iyon. Ang row na **Weeks shown** ng seksyon ay magbabasang **Only the next week of each plan type** o **All upcoming weeks**.

## Giving Privacy {#giving-privacy}

Karaniwang nakikita ng mga taong may access sa giving ang kabuuan ng donasyon ng isang tao sa kanyang [talaan](../people/adding-people.md#editing-details). Kung ayaw mong laging nakikita ang mga halaga sa tuwing bubuksan ang talaan, maaari mo itong itago hanggang may humiling.

1. Sa pahinang Settings, i-click ang **Giving privacy** sa listahan sa kaliwa, pagkatapos i-click ang **Edit** sa seksyong **Giving privacy**.
2. I-on ang **Hide giving on person records until clicked**.
3. I-save ang iyong mga pagbabago.

Kapag naka-on ito, ang giving card sa talaan ng tao ay magsasabing "Giving is hidden on person records." I-click ang **Show giving** para i-load at ipakita ang giving ng taong iyon. Muling nagtatago ito kapag nagbukas ka ng ibang tao. Hindi nagbabago kung sino ang makakakita ng giving: tanging ang mga taong may access sa giving lamang ang makakakita ng card.

## Import at Export {#import-and-export}

Ang link na **Import/Export** sa ilalim ng pangalan ng iyong simbahan sa pahinang Settings ay nagbubukas ng hiwalay na tool sa bagong browser window. Gamitin ito para:

- Mag-import ng datos ng miyembro mula sa ibang church management system.
- Mag-export ng iyong ChurchApps data para sa backup o paglilipat.

Lalo itong kapaki-pakinabang kapag unang nagse-set up ka ng iyong simbahan at kailangang ilipat ang umiiral na mga talaan papunta sa ChurchApps.

:::warning
Kapag mag-i-import ng datos, laging i-back up muna ang iyong umiiral na mga talaan. Nagdaragdag ng datos sa iyong sistema ang mga import operation at maaaring gumawa ng duplicate na entry kung paulit-ulit na patatakbuhin.
:::
