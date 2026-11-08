---
title: "Mga Setting ng Simbahan"
description: "Itakda ang pangalan, address, subdomain, time zone, format ng rehiyon, texting provider, at file storage ng iyong simbahan sa pahina ng Church Settings sa B1 Admin."
---

# Mga Setting ng Simbahan

<div class="article-intro">

Ang pahina ng Church Settings ay kung saan mo isinasaayos ang pangunahing impormasyon, detalye ng pakikipag-ugnayan, at branding ng iyong simbahan. Ginagamit ang mga detalyeng ito sa lahat ng kasangkapan ng ChurchApps, kasama ang iyong B1.church website at ang B1 App.

</div>

## Video ng Pagsasanay

<YouTube id="634zSbzDkYA" title="Pagsasaayos ng Impormasyon at Branding ng Simbahan sa B1" next="Roles, Permissions, and Inviting Your Team in B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ang pahintulot na "Edit Church Settings". Tingnan ang [Roles & Permissions](./roles-permissions.md) kung wala kang access.
- Ihanda ang address, impormasyon sa pakikipag-ugnayan, at logo ng iyong simbahan

</div>

## Pag-e-edit ng Impormasyon ng Iyong Simbahan

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), palawakin ang **Settings**, at i-click ang **Settings**.
2. Sa seksyong **Church Information** (sa itaas ng pahina), i-click ang **Edit**.
3. I-update ang alinman sa mga sumusunod na field:
   - **Church Name** -- Ang pangalang ipinapakita sa lahat ng produkto ng ChurchApps.
   - **Address** -- Ang pisikal na address ng iyong simbahan.
   - **Contact Information** -- Numero ng telepono, email, at iba pang detalye ng pakikipag-ugnayan.
   - **Time Zone** -- Ang time zone ng iyong simbahan. Tingnan ang [Time Zone](#time-zone) sa ibaba.
4. I-click ang **Save** para ilapat ang mga pagbabago.

## Pagtatakda ng Iyong Subdomain

Makakakuha ang iyong simbahan ng libreng subdomain sa **yourchurch.1.church**. Ito ang web address kung saan maaaring ma-access ng mga miyembro at bisita ang online presence ng iyong simbahan.

1. Sa pahina ng Settings, i-click ang **Edit** sa seksyong **Church Information** at hanapin ang field na **Subdomain**.
2. Ilagay ang gusto mong subdomain (halimbawa, "gracechurch" para sa gracechurch.1.church).
3. I-save ang mga pagbabago.

:::info
Dapat natatangi ang iyong subdomain sa lahat ng simbahan ng ChurchApps. Kung kinuha na ang gusto mong pangalan, subukang idagdag ang iyong lungsod o estado (halimbawa, "gracechurch-dallas").
:::

Kung gusto mong maabot ng mga bisita ang iyong site sa sarili mong domain (halimbawa, **`www.gracechurch.org`**), tingnan ang [Custom Domain](./custom-domain.md).

## Pag-aayos ng Branding

I-customize kung paano lumalabas ang iyong simbahan sa lahat ng kasangkapan ng ChurchApps:

1. I-upload ang iyong **church logo** sa pamamagitan ng pag-click sa logo area at pagpili ng image file.
2. Idagdag ang anumang karagdagang **church images** na ginagamit sa iyong website at [mobile app](./mobile-app.md).

:::tip
Para sa pinakamahusay na resulta, gumamit ng logo na may transparent na background sa PNG format. Tinitiyak nitong maganda ito sa parehong light at dark na background.
:::

## Unang Araw ng Linggo

Piliin kung aling araw magsisimula ang iyong mga kalendaryo. Ang dropdown na **First Day of Week** sa seksyong Church Info ay nakatakda sa **Sunday** bilang default, ngunit maaaring itakda sa anumang araw. Kapag nabago na, sinusunod ito sa mga calendar grid sa B1 Admin at sa B1.church member portal. Ang mga group calendar, curated calendar, at event editor ay naglalatag ng mga linggo simula sa araw na pipiliin mo.

## Time Zone

Itinatakda ng dropdown na **Time Zone** sa seksyong **Church Information** ang time zone ng iyong simbahan (halimbawa, *America/Chicago*). Piliin ang **None** para iwanan itong blangko. Kapag na-save na, lalabas ang zone sa buod ng Church Information.

Ginagamit ng B1 ang time zone na ito para sa mga oras na sakop ng buong simbahan, gaya ng mga paalala ng event at ang mga iskedyul sa iyong [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md) TV. Ang [mga iskedyul ng check-in](../attendance/setup.md#setting-a-check-in-schedule) ay sinusukat muna sa time zone ng [campus](./campuses.md) ng serbisyo, at ginagamit lamang ang time zone ng simbahan kapag walang time zone ang campus na iyon. Kung nasa iisang time zone ang lahat ng iyong campus, itakda ito sa simbahan at sa bawat campus.

## Rehiyon (Format ng Petsa at Telepono)

Kinokontrol ng setting na **Region** kung paano isinusulat ang mga petsa at oras sa buong B1. Bilang default, gumagamit ang mga petsa ng format ng Estados Unidos (halimbawa, "Sep 28, 2026" at "9/28/2026"). Maaaring lumipat ang mga simbahan sa labas ng US sa sarili nilang format. Halimbawa, kapag pinili ang English (United Kingdom), lalabas ang "28 Sept 2026" at "28/09/2026".

1. Sa pahina ng Settings, i-click ang **Region** sa listahan sa kaliwa, pagkatapos i-click ang **Edit** sa seksyong **Region**.
2. Piliin ang iyong rehiyon mula sa dropdown na **Region**. Nagpapakita ang bawat opsyon ng halimbawang petsa para makita mo kung paano talaga lalabas ang mga petsa.
3. I-click ang **Save**.

Ipinapakita ng seksyong Region ang napili mong rehiyon, halimbawa ng **Date format**, at ang iyong format ng **Phone numbers**.

### Format ng Numero ng Telepono

Ang parehong seksyong Region ay may setting na **Phone numbers** na kumokontrol kung paano inilalagay ang mga numero ng telepono sa record ng isang tao:

- **International (with country code)** -- ang default. Nagpapakita ang mga phone field ng country flag picker at sine-save ang mga numero kasama ang country code (halimbawa, +1 918 555 1234).
- **Local (as typed)** -- nagiging simpleng text box ang mga phone field at sine-save ang mga numero eksakto ayon sa pagkakatype mo, nang walang idinagdag na country code (halimbawa, 0701 234 5678). Piliin ito kung ang simbahan mo ay nagsusulat ng mga numero sa lokal na format at ayaw mong magdagdag ang B1 ng country code.

Kapag napili ang **Local**, ipinapakita rin ng seksyong Region ang "Local phone numbers" sa tabi ng iyong rehiyon.

:::tip
Pinakamahusay gumagana ang texting kapag kasama ang country code ng mga numero. Kung nagpapadala ka ng text mula sa B1, panatilihin ang **International** na format, o siguraduhing kasama ang country code ng mga numerong itinype mo sa Local mode.
:::

Nalalapat ang rehiyon mo sa mga petsa at oras sa buong B1 Admin at sa iyong B1.church website at member portal, kasama ang mga sermon, blog post, group calendar, at serving plan, para makita ng mga miyembro ang mga petsa sa parehong format na nakikita ng iyong staff.

## Texting {#texting}

Ikonekta ang isang texting provider para magpadala ng SMS sa isang tao o sa buong grupo mula sa B1 Admin. Ipinapadala ang mga text sa pamamagitan ng sarili mong account sa provider, kaya nalalapat ang kanilang presyo at limitasyon.

1. Sa pahina ng Settings, i-click ang **Texting** sa listahan sa kaliwa, pagkatapos i-click ang **Edit** sa seksyong **Texting**.
2. Pumili ng **Provider**:
   - **Clearstream** -- ilagay ang **API Key**. Gumawa nito sa iyong Clearstream Account Settings sa ilalim ng API Keys.
   - **Text In Church** -- ilagay ang **API Key**. Humingi muna ng developer API access sa Text In Church Support, pagkatapos gumawa ng key sa iyong Account Settings > seksyong Developer API.
   - **Nalo Solutions** (Ghana) -- ilagay ang auth key mula sa iyong Nalo Solutions account bilang **API Key**, at ang **Sender ID** (hanggang 11 karakter) na inaprubahan sa iyo ng Nalo.
   - **Twilio** -- gamitin ang sarili mong Twilio account ng simbahan; direktang sinisingil ka ng Twilio. Kopyahin ang **Account SID** at **Auth Token** mula sa [Twilio Console](https://console.twilio.com), at ilagay ang **From Number**, isang Twilio phone number na nakarehistro para sa A2P 10DLC, sa format na tulad ng `+15551234567`. Pagkatapos i-save, i-paste ang inbound webhook URL (tingnan sa ibaba) sa **A message comes in** webhook ng numero sa Twilio para maitala rin sa B1 ang mga STOP reply.
3. I-click ang **Save**.

Para ihinto ang texting, itakda ang **Provider** sa **None** at i-save. Tinatanggal nito ang naka-save na provider.

### Pag-opt Out sa mga Taong Sumasagot ng STOP

Kapag na-save na ang provider, buksan muli ang seksyong Texting gamit ang **Edit**. Sa ilalim ng mga setting ng provider, ipinapakita ng read-only na field na **Inbound (STOP) webhook URL** ang web address na natatangi sa iyong simbahan. I-click ang field para piliin ang address, kopyahin ito, at i-paste sa setting ng inbound message (reply) webhook ng iyong texting provider. Gumagana ito sa alinmang nabanggit na provider na kayang ipasa ang mga papasok na reply sa isang webhook.

Pagkatapos nito, kapag may sumagot ng **STOP** (o STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT, o REVOKE) sa isa sa mga text mo, hahanapin ng B1 ang lahat ng may katugmang mobile number, markahan sila bilang opted out, at io-off ang kanilang mga paalala sa text. Lalaktawan na sila sa mga group text. Hindi pinapansin ang ibang reply.

:::info
Gumagamit ito ng parehong opt-out setting ng **Hide me from the member directory**, kaya ang mga sumasagot ng STOP ay ipinapakita rin bilang **Hidden from directory** sa kanilang profile. Lumalabas lamang ang field habang napili ang naka-save na provider. Kung palitan mo ang dropdown sa ibang provider, i-save muna para makita muli ang URL.
:::

Kapag nakakonekta na ang provider, makikita ng mga staff na may pahintulot magpadala ng text ang button na **Text** sa pahina ng isang grupo (**Text this group**) at ng isang taong may mobile phone (**Send text message**). I-type ang mensahe at i-click ang **Send**. Binibilang ng dialog ang mga karakter at SMS segment. Para sa grupo, ipinapakita nito kung ilang miyembro ang makakatanggap ng text bago mo ipadala:

- Nilalaktawan ang mga miyembrong walang mobile phone na nakatala.
- Ibinibilang na opted out at nilalaktawan ang mga miyembrong pumili ng **Hide me from the member directory**.
- Isang beses lang nakakatanggap ng text ang mga miyembro ng pamilyang may iisang mobile number.

### Pag-personalize ng mga Text gamit ang Merge Fields {#personalizing-texts-with-merge-fields}

Sa ilalim ng message box, ipinapakita ng Text dialog ang mga placeholder chip: **First Name**, **Last Name**, **Display Name**, at **Church Name**. I-click ang chip para ipasok ang placeholder nito (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, o `{{churchName}}`) sa kinaroroonan ng cursor mo. Kapag naipadala na ang text, papalitan ang bawat placeholder ng detalye ng tatanggap, kaya ang group text na tulad ng `Hi {{firstName}}, see you Sunday!` ay makakarating sa bawat miyembro na may sariling pangalan. Gumagana ang mga placeholder sa parehong group text at text sa iisang tao. Nag-aalok din ang mga text sa grupo ng chip na **Group Name** (`{{groupName}}`), na papalitan ng pangalan ng grupo.

Para magamit muli ang isang mensahe, i-save ito bilang [text template](./email-templates.md#text-templates) (isang email template na may kategoryang **Text**) at piliin ito mula sa **Load Template (optional)** sa itaas ng Text window.

:::info
Nalalapat ang limit na 1,600 karakter sa mensaheng tina-type mo. Pagkatapos mapunan ang mga placeholder, anumang text na mahigit 1,600 karakter ay puputulin sa haba na iyon.
:::

Maaari ding awtomatikong ipadala ang mga text mula sa isang hakbang ng [workflow](../serving/workflows.md#sending-a-text) gamit ang aksyong **Send Text**, na gumagamit ng parehong provider at mga placeholder.

## File Storage

Bilang default, ginagamit ng mga file na ina-upload mo sa iyong website (sa pamamagitan ng [Files](../website/files.md)) at sa iba pang content area ang libreng hosted storage ng B1, hanggang 100MB. Kung kailangan mo ng mas maraming espasyo, maaari mong ikonekta ang sarili mong cloud storage. Didiretso na ang mga bagong upload sa iyong account nang walang limitasyon ng platform.

1. Sa pahina ng Settings, i-click ang **File Storage** sa listahan sa kaliwa, pagkatapos i-click ang **Edit** sa seksyong **File Storage**.
2. Pumili ng provider: **Google Drive**, **Dropbox**, **OneDrive**, o isang **S3-compatible bucket** (AWS S3, Cloudflare R2, Backblaze B2, atbp.).
3. Para sa Google Drive, Dropbox, o OneDrive, i-click ang **Connect** at mag-sign in para pahintulutan ang access. Para sa S3-compatible bucket, ilagay ang iyong access key, secret, pangalan ng bucket, at public URL base.
4. I-click ang **Save**.

:::info
Nakakaapekto lamang ito sa mga bagong upload sa Files ng iyong website at katulad na content area. Ang mga gallery image, thumbnail, logo, at larawan ng tao ay laging nananatili sa default na storage ng B1.
:::

## Grade Promotion

Kung sinusubaybayan mo ang **Grade** ng mga bata at estudyante, maaaring awtomatikong itaas ng B1 ang lahat ng isang grado sa petsang pipiliin mo (halimbawa, Agosto 1) sa halip na i-edit mo isa-isa ang bawat profile.

1. Sa pahina ng Settings, i-click ang **Grade Promotion** sa listahan sa kaliwa, pagkatapos i-click ang **Edit** sa seksyong **Grade Promotion**.
2. I-on ang switch (ipinapakitang **Enabled**) at piliin ang **Month** at **Day** para sa pagtaas ng grado kada taon. Sa petsang iyon, lilipat ang lahat ng may grado nang isang antas pataas, at ang mga nasa ika-12 grado ay magiging **Graduated**.
3. I-save ang mga pagbabago.

Para ihinto ang awtomatikong pagtaas, i-off ang switch para ipakitang **Disabled** at i-save. Tinatanggal ang petsa ng pagtaas at hindi na awtomatikong magbabago ang mga grado.

## Volunteer Signup {#volunteer-signup}

Bilang default, nakikita ng mga miyembrong nagba-browse ng [volunteer signup](../../b1-church/serving/volunteer-signup.md) ang bawat paparating na linggo na may bukas na posisyon. Kung humaba ang listahang iyon, maaari mong ipakita na lang ang susunod na linggo ng bawat uri ng plano.

1. Sa pahina ng Settings, i-click ang **Volunteer Signup** sa listahan sa kaliwa, pagkatapos i-click ang **Edit** sa seksyong **Volunteer Signup**.
2. I-on ang **Show only the next week of each plan type**.
3. I-save ang mga pagbabago.

Kapag naka-on ito, bawat uri ng plano ay nagpapakita lamang ng susunod nitong paparating na plano. Lalabas ang kasunod na linggo kapag lumipas na ang petsang iyon. Ang hilera ng **Weeks shown** sa seksyon ay nagsasabing **Only the next week of each plan type** o **All upcoming weeks**.

## Giving Privacy {#giving-privacy}

Karaniwang nakikita ng mga taong may giving access ang kabuuang donasyon ng isang tao sa kanilang [person record](../people/adding-people.md#editing-details). Kung ayaw mong laging nakikita sa screen ang mga halaga tuwing bubuksan ang isang record, maaari mo itong itago hanggang may humiling.

1. Sa pahina ng Settings, i-click ang **Giving privacy** sa listahan sa kaliwa, pagkatapos i-click ang **Edit** sa seksyong **Giving privacy**.
2. I-on ang **Hide giving on person records until clicked**.
3. I-save ang mga pagbabago.

Kapag naka-on ito, nagsasabi ang giving card sa person record ng "Giving is hidden on person records." I-click ang **Show giving** para i-load at ipakita ang donasyon ng taong iyon. Muling nagtatago ito kapag nagbukas ka ng ibang tao. Hindi nagbabago kung sino ang makakakita ng donasyon: tanging ang mga taong may giving access lamang ang nakakakita ng card.

## Pag-import at Pag-export

Ang link na **Import/Export** sa ilalim ng pangalan ng iyong simbahan sa pahina ng Settings ay nagbubukas ng nakalaang kasangkapan sa bagong browser window. Gamitin ito para:

- Mag-import ng datos ng miyembro mula sa ibang church management system.
- Mag-export ng iyong ChurchApps data para sa backup o paglilipat.

Lalo itong nakatutulong kapag unang isinasaayos ang iyong simbahan at kailangang ilipat ang mga umiiral na record sa ChurchApps.

:::warning
Kapag nag-iimport ng datos, laging i-back up muna ang iyong mga umiiral na record. Idinaragdag ng mga import operation ang datos sa iyong sistema at maaaring lumikha ng duplicate na entry kapag inulit.
:::
