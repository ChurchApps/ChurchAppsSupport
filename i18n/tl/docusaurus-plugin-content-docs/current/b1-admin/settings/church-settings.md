---
title: "Mga Setting ng Simbahan"
description: "Itakda ang pangalan, address, subdomain, time zone, format ng rehiyon, texting provider, at file storage ng simbahan sa pahina ng Church Settings sa B1 Admin."
---

# Mga Setting ng Simbahan

<div class="article-intro">

Ang pahinang Church Settings ang lugar kung saan mo i-configure ang pangunahing impormasyon ng iyong simbahan, mga detalye ng contact, at branding. Ginagamit ang mga detalyeng ito sa lahat ng ChurchApps tool, kabilang ang iyong B1.church website at ang B1 Mobile app.

</div>

## Training Video

<YouTube id="634zSbzDkYA" title="Setting Up Church Info and Branding in B1" next="Roles, Permissions, and Inviting Your Team in B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng permiso na "Edit Church Settings". Tingnan ang [Roles & Permissions](./roles-permissions.md) kung wala kang access.
- Ihanda ang address, impormasyon ng contact, at logo ng iyong simbahan

</div>

## Pag-edit ng Impormasyon ng Iyong Simbahan

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), palawakin ang **Settings**, at i-click ang **Settings**.
2. Sa seksyong **Church Information** (sa itaas ng pahina), i-click ang **Edit**.
3. I-update ang alinman sa mga sumusunod na field:
   - **Church Name** -- Ang pangalang ipinapakita sa lahat ng ChurchApps product.
   - **Address** -- Ang pisikal na address ng iyong simbahan.
   - **Contact Information** -- Numero ng telepono, email, at iba pang detalye ng contact.
   - **Time Zone** -- Ang time zone ng iyong simbahan. Tingnan ang [Time Zone](#time-zone) sa ibaba.
4. I-click ang **Save** para ilapat ang iyong mga pagbabago.

## Pag-set Up ng Iyong Subdomain

Makakakuha ang iyong simbahan ng libreng subdomain sa **yourchurch.1.church**. Ito ang web address kung saan maaaring pumunta ang mga miyembro at bisita para ma-access ang online presence ng iyong simbahan.

1. Sa pahinang Settings, i-click ang **Edit** sa seksyong **Church Information** at hanapin ang field na **Subdomain**.
2. Ilagay ang gusto mong subdomain (halimbawa, "gracechurch" para sa gracechurch.1.church).
3. I-save ang iyong mga pagbabago.

:::info
Dapat natatangi ang iyong subdomain sa lahat ng simbahan sa ChurchApps. Kung nakuha na ang gusto mong pangalan, subukang idagdag ang lungsod o estado mo (halimbawa, "gracechurch-dallas").
:::

Kung gusto mong maabot ng mga bisita ang iyong site sa sarili mong domain (halimbawa, **`www.gracechurch.org`**), tingnan ang [Custom Domain](./custom-domain.md).

## Pag-configure ng Branding

I-customize kung paano lumilitaw ang iyong simbahan sa lahat ng ChurchApps tool:

1. I-upload ang **logo ng simbahan** sa pamamagitan ng pag-click sa lugar ng logo at pagpili ng image file.
2. Magdagdag ng anumang karagdagang **church images** na gagamitin sa iyong website at [mobile app](./mobile-app.md).

:::tip
Para sa pinakamagandang resulta, gumamit ng logo na may transparent na background sa PNG format. Tinitiyak nitong maganda ang itsura nito sa parehong light at dark na background.
:::

## Unang Araw ng Linggo

Piliin kung aling araw magsisimula ang iyong mga calendar. Ang dropdown na **First Day of Week** sa seksyong Church Info ay nakatakda bilang default sa **Sunday**, pero maaari itong itakda sa anumang araw. Kapag nabago na, sinusunod ito sa mga calendar grid sa B1 Admin at sa B1.church member portal -- ang mga group calendar, curated calendar, at event editor ay nagsisimula ang mga linggo sa araw na iyong pinili.

## Time Zone {#time-zone}

Itinatakda ng dropdown na **Time Zone** sa seksyong **Church Information** ang time zone ng iyong simbahan (halimbawa, *America/Chicago*). Piliin ang **None** para iwanang blangko. Kapag na-save na, lalabas ang zone sa buod ng Church Information.

Ginagamit ng B1 ang time zone na ito para sa mga oras na sakop ng buong simbahan, gaya ng mga paalala sa event at ng mga iskedyul sa iyong mga [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md) TV. Ang [mga check-in schedule](../attendance/setup.md#setting-a-check-in-schedule) ay sinusukat sa time zone ng [campus](./campuses.md) ng serbisyo muna, at ang time zone ng simbahan lang ang ginagamit kapag walang nakatakda sa campus na iyon. Kung nasa iisang time zone ang lahat ng iyong campus, itakda ito sa simbahan at sa bawat campus.

## Rehiyon (Format ng Petsa at Telepono)

Kinokontrol ng setting na **Region** kung paano isinusulat ang mga petsa at oras sa buong B1. Bilang default, gumagamit ang mga petsa ng format ng United States (halimbawa, "Sep 28, 2026" at "9/28/2026"). Maaaring lumipat ang mga simbahan sa labas ng US sa sarili nilang format -- halimbawa, ang pagpili ng English (United Kingdom) ay nagpapakita ng "28 Sept 2026" at "28/09/2026" sa halip.

1. Sa pahinang Settings, i-click ang **Region** sa listahan sa kaliwa, pagkatapos i-click ang **Edit** sa seksyong **Region**.
2. Piliin ang iyong rehiyon mula sa dropdown na **Region**. Nagpapakita ang bawat opsyon ng sample na petsa para makita mo kung paano eksaktong lilitaw ang mga petsa.
3. I-click ang **Save**.

Pagkatapos nito, ipinapakita ng seksyong Region ang napili mong rehiyon, sample ng **Date format**, at ang format ng iyong **Phone numbers**.

### Format ng Numero ng Telepono

May setting na **Phone numbers** ang parehong seksyong Region na kumokontrol kung paano inilalagay ang mga numero ng telepono sa record ng isang tao:

- **International (with country code)** -- ang default. Nagpapakita ang mga phone field ng country flag picker at sine-save ang mga numero kasama ang country code (halimbawa, +1 918 555 1234).
- **Local (as typed)** -- nagiging simpleng text box ang mga phone field at sine-save ang mga numero eksakto ayon sa pagkaka-type mo, nang walang idinadagdag na country code (halimbawa, 0701 234 5678). Piliin ito kung ang iyong simbahan ay nagsusulat ng mga numero sa lokal na format at ayaw mong magdagdag ang B1 ng country code.

Kapag napili ang **Local**, ipinapakita rin ng seksyong Region ang "Local phone numbers" sa tabi ng iyong rehiyon.

:::tip
Pinakamahusay gumana ang texting kapag kasama ang country code ng mga numero. Kung nagpapadala ka ng text mula sa B1, panatilihin ang format na **International**, o siguraduhing kasama ang country code ng mga numerong ita-type mo sa Local mode.
:::

Nalalapat ang iyong rehiyon sa mga petsa at oras sa buong B1 Admin at sa iyong B1.church website at member portal, kabilang ang mga sermon, blog post, group calendar, at serving plan, para makita ng mga miyembro ang mga petsa sa parehong format na nakikita ng iyong staff.

## Texting {#texting}

Ikonekta ang isang texting provider para makapagpadala ng SMS sa isang tao o sa buong grupo mula sa B1 Admin. Ipinapadala ang mga text sa pamamagitan ng sarili mong account sa provider, kaya nalalapat ang kanilang presyo at limitasyon.

1. Sa pahinang Settings, i-click ang **Texting** sa listahan sa kaliwa, pagkatapos i-click ang **Edit** sa seksyong **Texting**.
2. Pumili ng **Provider**:
   - **Clearstream** -- maglagay ng **API Key**. Gumawa nito sa iyong Clearstream Account Settings sa ilalim ng API Keys.
   - **Text In Church** -- maglagay ng **API Key**. Humingi muna ng developer API access sa Text In Church Support, pagkatapos gumawa ng key sa iyong Account Settings > Developer API section.
   - **Nalo Solutions** (Ghana) -- ilagay ang auth key mula sa iyong Nalo Solutions account bilang **API Key**, at ang **Sender ID** (hanggang 11 character) na inaprubahan ng Nalo para sa iyo.
   - **Twilio** -- gamitin ang sarili mong Twilio account ng simbahan; direktang sinisingil ka ng Twilio. Kopyahin ang **Account SID** at **Auth Token** mula sa [Twilio Console](https://console.twilio.com), at ilagay ang **From Number** -- isang Twilio phone number na nakarehistro para sa A2P 10DLC, sa format na gaya ng `+15551234567`. Pagkatapos mag-save, i-paste ang inbound webhook URL (tingnan sa ibaba) sa **A message comes in** webhook ng numero sa Twilio para maitala rin sa B1 ang mga sagot na STOP.
3. I-click ang **Save**.

Para ihinto ang texting, itakda ang **Provider** sa **None** at mag-save. Inaalis nito ang naka-save na provider.

### Pag-opt Out sa Mga Taong Sumagot ng STOP

Kapag na-save na ang isang provider, buksan muli ang seksyong Texting gamit ang **Edit**. Sa ilalim ng mga setting ng provider, may field na read-only na **Inbound (STOP) webhook URL** na nagpapakita ng web address na natatangi sa iyong simbahan. I-click ang field para piliin ang address, kopyahin ito, at i-paste sa setting ng inbound message (reply) webhook ng iyong texting provider. Gumagana ito sa alinman sa mga provider sa itaas na kayang ipasa ang mga papasok na sagot sa isang webhook.

Pagkatapos nito, kapag may sumagot ng **STOP** (o STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT, o REVOKE) sa isa sa iyong mga text, hahanapin ng B1 ang lahat ng may tugmang mobile number, markahan silang nag-opt out, at ipapatay ang kanilang mga paalala sa text. Nilalaktawan na sila sa mga group text. Hindi pinapansin ang iba pang sagot.

:::info
Ginagamit nito ang parehong setting ng opt-out gaya ng **Hide me from the member directory**, kaya ang mga sumagot ng STOP ay lumalabas ding **Hidden from directory** sa kanilang profile. Lumalabas lang ang field kapag napili ang naka-save na provider -- kung ililipat mo ang dropdown sa ibang provider, mag-save muna para makita ulit ang URL.
:::

Kapag nakakonekta na ang isang provider, makakakita ang mga staff na may permiso na magpadala ng text ng butones na **Text** sa pahina ng grupo (**Text this group**) at ng tao na may mobile phone (**Send text message**). I-type ang iyong mensahe at i-click ang **Send**. Binibilang ng dialog ang mga character at SMS segment. Para sa grupo, ipinapakita nito kung ilang miyembro ang makakatanggap ng text bago ka magpadala:

- Nilalaktawan ang mga miyembrong walang nakatalang mobile phone.
- Ang mga miyembrong pumili ng **Hide me from the member directory** ay binibilang na nag-opt out at nilalaktawan.
- Ang mga kamag-anak na nagbabahagi ng iisang mobile number ay makakatanggap ng text nang isang beses lang.

### Pag-personalize ng Text Gamit ang Merge Field {#personalizing-texts-with-merge-fields}

Sa ilalim ng message box, ipinapakita ng Text dialog ang mga placeholder chip: **First Name**, **Last Name**, **Display Name**, at **Church Name**. I-click ang isang chip para ilagay ang placeholder nito (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, o `{{churchName}}`) sa kinalalagyan ng cursor mo. Kapag naipadala na ang text, papalitan ang bawat placeholder ng detalye ng tatanggap, kaya ang group text na gaya ng `Hi {{firstName}}, see you Sunday!` ay makakarating sa bawat miyembro na may sariling pangalan. Gumagana ang mga placeholder sa parehong group text at text sa iisang tao. Ang mga text sa grupo ay nag-aalok din ng chip na **Group Name** (`{{groupName}}`), na papalitan ng pangalan ng grupo.

Para magamit muli ang isang mensahe, i-save ito bilang [text template](./email-templates.md#text-templates) (isang email template na may kategoryang **Text**) at piliin ito mula sa **Load Template (optional)** sa itaas ng Text window.

:::info
Nalalapat ang limitasyon na 1,600 character sa mensahe habang tina-type mo ito. Pagkatapos mapunan ang mga placeholder, anumang text na lampas sa 1,600 character ay puputulin sa haba na iyon.
:::

Maaari ding ipadala nang kusa ang mga text mula sa isang hakbang ng [workflow](../serving/workflows.md#sending-a-text) gamit ang aksyong **Send Text**, na gumagamit ng parehong provider at mga placeholder.

## File Storage

Bilang default, ang mga file na ina-upload mo sa iyong website (sa pamamagitan ng [Files](../website/files.md)) at iba pang content area ay gumagamit ng libreng hosted storage ng B1, hanggang 100MB. Kung kailangan mo ng mas maraming espasyo, maaari mong ikonekta ang sarili mong cloud storage -- ang mga bagong upload ay didiretso na sa iyong account nang walang limitasyon ng platform.

1. Sa pahinang Settings, i-click ang **File Storage** sa listahan sa kaliwa, pagkatapos i-click ang **Edit** sa seksyong **File Storage**.
2. Pumili ng provider: **Google Drive**, **Dropbox**, **OneDrive**, o isang **S3-compatible bucket** (AWS S3, Cloudflare R2, Backblaze B2, atbp.).
3. Para sa Google Drive, Dropbox, o OneDrive, i-click ang **Connect** at mag-sign in para bigyan ng pahintulot ang access. Para sa S3-compatible bucket, ilagay ang iyong access key, secret, pangalan ng bucket, at public URL base.
4. I-click ang **Save**.

:::info
Ang pagbabagong ito ay nakakaapekto lang sa mga bagong upload sa Files ng iyong website at mga katulad na content area. Ang mga gallery image, thumbnail, logo, at larawan ng tao ay laging nananatili sa default na storage ng B1.
:::

## Grade Promotion

Kung sinusubaybayan mo ang **Grade** ng mga bata at estudyante, maaaring awtomatikong itaas ng B1 ang grade ng lahat sa isang petsang pipiliin mo (halimbawa, Agosto 1) sa halip na i-edit nang manual ang bawat profile.

1. Sa pahinang Settings, i-click ang **Grade Promotion** sa listahan sa kaliwa, pagkatapos i-click ang **Edit** sa seksyong **Grade Promotion**.
2. I-on ang switch (ipinapakitang **Enabled**) at piliin ang **Month** at **Day** para itaas ang mga grade kada taon. Sa petsang iyon, ang bawat may grade ay aakyat ng isang grade, at ang mga nasa ika-12 grade ay magiging **Graduated**.
3. I-save ang iyong mga pagbabago.

Para ihinto ang awtomatikong pag-promote, i-off ang switch para ipakitang **Disabled** at mag-save. Tatanggalin ang petsa ng promotion at hindi na magbabago ang mga grade nang kusa.

## Volunteer Signup {#volunteer-signup}

Bilang default, nakikita ng mga miyembrong bumubrowse ng [volunteer signup](../../b1-church/serving/volunteer-signup.md) ang bawat paparating na linggong may bukas na posisyon. Kung humaba nang husto ang listahang iyon, maaari mong ipakita na lang ang susunod na linggo ng bawat uri ng plan.

1. Sa pahinang Settings, i-click ang **Volunteer Signup** sa listahan sa kaliwa, pagkatapos i-click ang **Edit** sa seksyong **Volunteer Signup**.
2. I-on ang **Show only the next week of each plan type**.
3. I-save ang iyong mga pagbabago.

Kapag naka-on ito, ang bawat uri ng plan ay nagpapakita lang ng susunod nitong paparating na plan. Lilitaw ang kasunod na linggo kapag lumipas na ang petsang iyon. Ang row na **Weeks shown** ng seksyon ay nagbabasang **Only the next week of each plan type** o **All upcoming weeks**.

## Giving Privacy {#giving-privacy}

Karaniwang nakikita ng mga taong may access sa giving ang kabuuang regalo ng isang tao sa kanyang [person record](../people/adding-people.md#editing-details). Kung ayaw mong laging nakalitaw ang mga halaga tuwing bubuksan ang isang record, maaari mo itong itago hanggang may humingi.

1. Sa pahinang Settings, i-click ang **Giving privacy** sa listahan sa kaliwa, pagkatapos i-click ang **Edit** sa seksyong **Giving privacy**.
2. I-on ang **Hide giving on person records until clicked**.
3. I-save ang iyong mga pagbabago.

Kapag naka-on ito, sinasabi ng giving card sa person record na "Giving is hidden on person records." I-click ang **Show giving** para i-load at ipakita ang giving ng taong iyon. Muling magtatago ito kapag may binuksan kang ibang tao. Hindi nagbabago kung sino ang makakakita ng giving: tanging mga taong may access sa giving lang ang nakakakita ng card.

## Import at Export

Binubuksan ng link na **Import/Export** sa ilalim ng pangalan ng iyong simbahan sa pahinang Settings ang isang nakalaang tool sa bagong browser window. Gamitin ito para:

- Mag-import ng datos ng miyembro mula sa ibang church management system.
- Mag-export ng iyong ChurchApps data para sa backup o migration.

Lalo itong nakatutulong kapag unang nag-se-set up ka ng iyong simbahan at kailangang ilipat ang mga umiiral na record papunta sa ChurchApps.

:::warning
Kapag nag-i-import ng datos, laging i-back up muna ang iyong mga umiiral na record. Nagdadagdag ng datos sa iyong sistema ang mga operasyon ng import at maaaring gumawa ng duplicate na entry kung paulit-ulit itong patatakbuhin.
:::
