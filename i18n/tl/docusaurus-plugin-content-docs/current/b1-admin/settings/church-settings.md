---
title: "Church Settings"
---

# Mga Setting ng Simbahan

<div class="article-intro">

Ang pahina ng Church Settings ang lugar kung saan mo i-configure ang pangunahing impormasyon ng simbahan mo, mga detalye ng contact, at branding. Ginagamit ang mga detalyeng ito sa lahat ng ChurchApps tool, kabilang ang iyong B1.church website at ang B1 Mobile app.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ang permiso na "Edit Church Settings". Tingnan ang [Roles & Permissions](./roles-permissions.md) kung wala kang access.
- Ihanda ang address, impormasyon ng contact, at logo ng simbahan mo

</div>

## Pag-edit ng Impormasyon ng Simbahan

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), palawakin ang **Settings**, at i-click ang **Settings**.
2. Sa seksyong **Church Information** (sa itaas ng pahina), i-click ang **Edit**.
3. I-update ang alinman sa mga sumusunod na field:
   - **Church Name** -- ang pangalang ipinapakita sa lahat ng ChurchApps product.
   - **Address** -- ang pisikal na address ng simbahan mo.
   - **Contact Information** -- numero ng telepono, email, at iba pang detalye ng contact.
   - **Time Zone** -- ang time zone ng simbahan mo. Tingnan ang [Time Zone](#time-zone) sa ibaba.
4. I-click ang **Save** para ilapat ang mga pagbabago.

## Pag-set up ng Subdomain

Makakakuha ang simbahan mo ng libreng subdomain sa **yourchurch.1.church**. Ito ang web address kung saan maaaring bisitahin ng mga miyembro at bisita ang online presence ng simbahan mo.

1. Sa pahina ng Settings, i-click ang **Edit** sa seksyong **Church Information** at hanapin ang field na **Subdomain**.
2. Ilagay ang gusto mong subdomain (halimbawa, "gracechurch" para sa gracechurch.1.church).
3. I-save ang mga pagbabago.

:::info
Dapat natatangi ang subdomain mo sa lahat ng simbahang gumagamit ng ChurchApps. Kung kinuha na ang gusto mong pangalan, subukang idagdag ang lungsod o estado mo (halimbawa, "gracechurch-dallas").
:::

Kung gusto mong maabot ng mga bisita ang site mo sa sarili mong domain (halimbawa, **www.gracechurch.org**), tingnan ang [Custom Domain](./custom-domain.md).

## Pag-configure ng Branding

I-customize kung paano lumilitaw ang simbahan mo sa lahat ng ChurchApps tool:

1. I-upload ang **church logo** sa pamamagitan ng pag-click sa lugar ng logo at pagpili ng image file.
2. Magdagdag ng anumang karagdagang **church images** na gagamitin sa iyong website at [mobile app](./mobile-app.md).

:::tip
Para sa pinakamahusay na resulta, gumamit ng logo na may transparent na background sa PNG format. Tinitiyak nitong maganda ito sa parehong light at dark na background.
:::

## Unang Araw ng Linggo

Piliin kung aling araw nagsisimula ang iyong mga kalendaryo. Ang dropdown na **First Day of Week** sa seksyong Church Info ay nakatakda sa **Sunday** bilang default, pero maaaring itakda sa alinmang araw. Kapag nabago na, ginagamit ito sa mga calendar grid sa B1 Admin at sa B1.church member portal -- ang mga group calendar, curated calendar, at event editor ay nagsisimula ang linggo sa araw na pinili mo.

## Time Zone

Itinatakda ng dropdown na **Time Zone** sa seksyong **Church Information** ang time zone ng simbahan mo (halimbawa, *America/Chicago*). Piliin ang **None** para iwanang blangko. Kapag na-save na, lilitaw ang zone sa buod ng Church Information.

Ginagamit ng B1 ang time zone na ito para sa mga oras na sakop ng buong simbahan, gaya ng mga paalala ng event at ang mga iskedyul sa iyong [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md) TV. Ang [check-in schedules](../attendance/setup.md#setting-a-check-in-schedule) ay sinusukat ayon sa time zone ng [campus](./campuses.md) ng serbisyo muna, at ginagamit lamang ang time zone ng simbahan kapag walang time zone ang campus na iyon. Kung nasa iisang time zone lahat ng campus mo, itakda ito sa simbahan at sa bawat campus.

## Rehiyon (Format ng Petsa at Telepono)

Kinokontrol ng setting na **Region** kung paano isinusulat ang mga petsa at oras sa buong B1. Bilang default, gumagamit ang mga petsa ng format ng United States (halimbawa, "Sep 28, 2026" at "9/28/2026"). Maaaring lumipat ang mga simbahan sa labas ng US sa sarili nilang format -- halimbawa, kapag pinili ang English (United Kingdom), lalabas ang "28 Sept 2026" at "28/09/2026" sa halip.

1. Sa pahina ng Settings, i-click ang **Region** sa listahan sa kaliwa, pagkatapos i-click ang **Edit** sa seksyong **Region**.
2. Piliin ang iyong rehiyon mula sa dropdown na **Region**. Ang bawat opsyon ay nagpapakita ng halimbawang petsa para makita mo kung paano eksaktong lalabas ang mga petsa.
3. I-click ang **Save**.

Ipinapakita ng seksyong Region ang napili mong rehiyon, halimbawa ng **Date format**, at ang format ng iyong **Phone numbers**.

### Format ng Numero ng Telepono

Ang parehong seksyong Region ay may setting na **Phone numbers** na kumokontrol kung paano inilalagay ang mga numero ng telepono sa record ng isang tao:

- **International (with country code)** -- ang default. Nagpapakita ang mga phone field ng country flag picker at sine-save ang mga numero kasama ang country code (halimbawa, +1 918 555 1234).
- **Local (as typed)** -- nagiging simpleng text box ang mga phone field at sine-save ang mga numero nang eksakto ayon sa pagta-type mo, nang walang idinadagdag na country code (halimbawa, 0701 234 5678). Piliin ito kung sumusulat ang simbahan mo ng mga numero sa lokal na format at ayaw mong magdagdag ng country code ang B1.

Kapag napili ang **Local**, ipinapakita rin ng seksyong Region ang "Local phone numbers" sa tabi ng rehiyon mo.

:::tip
Mas maayos gumana ang texting kapag kasama ang country code ng mga numero. Kung nagpapadala ka ng text mula sa B1, panatilihin ang **International** na format, o siguraduhing kasama ang country code ng mga numerong tina-type mo sa Local mode.
:::

Nalalapat ang rehiyon mo sa mga petsa at oras sa buong B1 Admin at sa B1.church website at member portal, kabilang ang sermon, blog post, group calendar, at serving plan, para makita ng mga miyembro ang mga petsa sa parehong format na nakikita ng staff mo.

## Texting {#texting}

Ikonekta ang isang texting provider para makapagpadala ng SMS sa isang tao o sa buong group mula sa B1 Admin. Ipinapadala ang mga text sa pamamagitan ng sarili mong account sa provider, kaya nalalapat ang presyo at limit nila.

1. Sa pahina ng Settings, i-click ang **Texting** sa listahan sa kaliwa, pagkatapos i-click ang **Edit** sa seksyong **Texting**.
2. Pumili ng **Provider**:
   - **Clearstream** -- ilagay ang **API Key**. Gumawa nito sa iyong Clearstream Account Settings sa ilalim ng API Keys.
   - **Text In Church** -- ilagay ang **API Key**. Humingi muna ng developer API access sa Text In Church Support, pagkatapos gumawa ng key sa iyong Account Settings > Developer API section.
   - **Nalo Solutions** (Ghana) -- ilagay ang auth key mula sa iyong Nalo Solutions account bilang **API Key**, at ang **Sender ID** (hanggang 11 character) na naaprubahan sa iyo ng Nalo.
   - **Twilio** -- gamitin ang sarili mong Twilio account ng simbahan; direktang sisingilin ka ng Twilio. Kopyahin ang **Account SID** at **Auth Token** mula sa [Twilio Console](https://console.twilio.com), at ilagay ang **From Number** -- isang numero ng telepono sa Twilio na nakarehistro para sa A2P 10DLC, sa format tulad ng `+15551234567`. Pagkatapos i-save, i-paste ang inbound webhook URL (tingnan sa ibaba) sa **A message comes in** webhook ng numero sa Twilio para maitala rin sa B1 ang mga STOP reply.
3. I-click ang **Save**.

Para ihinto ang texting, itakda ang **Provider** sa **None** at i-save. Tinatanggal nito ang naka-save na provider.

### Pag-opt Out sa mga Taong Sumasagot ng STOP

Kapag na-save na ang provider, buksan muli ang seksyong Texting gamit ang **Edit**. Sa ilalim ng mga setting ng provider, may field na read-only na **Inbound (STOP) webhook URL** na nagpapakita ng web address na natatangi sa simbahan mo. I-click ang field para mapili ang address, kopyahin ito, at i-paste sa inbound message (reply) webhook setting ng texting provider mo. Gumagana ito sa alinman sa mga provider sa itaas na kayang magpasa ng mga papasok na reply sa isang webhook.

Pagkatapos nito, kapag may sumagot ng **STOP** (o STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT, o REVOKE) sa isa sa mga text mo, hahanapin ng B1 ang lahat ng may tugmang mobile number, mamarkahan silang opted out, at i-o-off ang kanilang mga text na paalala. Lalaktawan na sila sa mga group text. Hindi papansinin ang ibang reply.

:::info
Ginagamit nito ang parehong opt-out setting ng **Hide me from the member directory**, kaya ang mga sumasagot ng STOP ay lalabas ding **Hidden from directory** sa kanilang profile. Lumilitaw lamang ang field kapag napili ang naka-save na provider -- kung palitan mo ang dropdown sa ibang provider, i-save muna para makita muli ang URL.
:::

Kapag nakakonekta na ang provider, makikita ng mga staff na may permiso sa pagpapadala ng text ang button na **Text** sa pahina ng isang group (**Text this group**) at ng isang taong may mobile phone (**Send text message**). I-type ang mensahe mo at i-click ang **Send**. Binibilang ng dialog ang mga character at SMS segment. Para sa isang group, ipinapakita nito kung ilang miyembro ang makakatanggap ng text bago mo ipadala:

- Lalaktawan ang mga miyembrong walang mobile phone sa talaan.
- Ang mga miyembrong pumili ng **Hide me from the member directory** ay bibilangin bilang opted out at lalaktawan.
- Ang mga miyembro ng pamilya na nagbabahagi ng mobile number ay makakatanggap ng text nang isang beses lang.

### Pag-personalize ng mga Text gamit ang Merge Field {#personalizing-texts-with-merge-fields}

Sa ilalim ng kahon ng mensahe, nagpapakita ang Text dialog ng mga placeholder chip: **First Name**, **Last Name**, **Display Name**, at **Church Name**. I-click ang isang chip para ipasok ang placeholder nito (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, o `{{churchName}}`) sa kinaroroonan ng cursor mo. Kapag naipadala na ang text, papalitan ang bawat placeholder ng detalye ng tatanggap, kaya ang group text na tulad ng `Hi {{firstName}}, see you Sunday!` ay makakarating sa bawat miyembro na may sariling pangalan. Gumagana ang mga placeholder sa parehong group text at text sa isang tao.

:::info
Nalalapat ang 1,600-character na limit sa mensaheng tina-type mo. Pagkatapos mapunan ang mga placeholder, anumang text na lalampas sa 1,600 character ay puputulin sa haba na iyon.
:::

Maaari ding awtomatikong lumabas ang mga text mula sa isang hakbang ng [workflow](../serving/workflows.md#sending-a-text) gamit ang aksyong **Send Text**, na gumagamit ng parehong provider at mga placeholder.

## File Storage

Bilang default, ang mga file na ina-upload mo sa iyong website (sa pamamagitan ng [Files](../website/files.md)) at iba pang content area ay gumagamit ng libreng hosted storage ng B1, hanggang 100MB. Kung kailangan mo ng mas maraming espasyo, maaari mong ikonekta ang sarili mong cloud storage -- ang mga bagong upload ay didiretso na sa account mo nang walang limit ng platform.

1. Sa pahina ng Settings, i-click ang **File Storage** sa listahan sa kaliwa, pagkatapos i-click ang **Edit** sa seksyong **File Storage**.
2. Pumili ng provider: **Google Drive**, **Dropbox**, **OneDrive**, o isang **S3-compatible bucket** (AWS S3, Cloudflare R2, Backblaze B2, atbp.).
3. Para sa Google Drive, Dropbox, o OneDrive, i-click ang **Connect** at mag-sign in para bigyan ng pahintulot ang access. Para sa S3-compatible bucket, ilagay ang access key, secret, pangalan ng bucket, at public URL base.
4. I-click ang **Save**.

:::info
Naaapektuhan lamang nito ang mga bagong upload sa Files ng website mo at sa mga katulad na content area. Ang mga gallery image, thumbnail, logo, at larawan ng tao ay laging nasa default storage ng B1.
:::

## Grade Promotion

Kung sinusubaybayan mo ang **Grade** ng mga bata at estudyante, kayang awtomatikong itaas ng B1 ang lahat ng isang grade sa petsang pipiliin mo (halimbawa, Agosto 1) sa halip na manwal na i-edit ang bawat profile.

1. Sa pahina ng Settings, i-click ang **Grade Promotion** sa listahan sa kaliwa, pagkatapos i-click ang **Edit** sa seksyong **Grade Promotion**.
2. I-on ang switch (magpapakitang **Enabled**) at piliin ang **Month** at **Day** para sa pagtaas ng grade bawat taon. Sa petsang iyon, ang lahat ng may grade ay tataas ng isang grade, at ang mga nasa ika-12 grade ay magiging **Graduated**.
3. I-save ang mga pagbabago.

Para ihinto ang awtomatikong pagtaas, i-off ang switch para magpakitang **Disabled** at i-save. Aalisin ang petsa ng pagtaas, at hindi na awtomatikong magbabago ang mga grade.

## Volunteer Signup {#volunteer-signup}

Bilang default, nakikita ng mga miyembrong nagba-browse ng [volunteer signup](../../b1-church/serving/volunteer-signup.md) ang bawat darating na linggo na may bukas na posisyon. Kung humahaba na ang listahan, maaari mong ipakita na lamang ang susunod na linggo ng bawat uri ng plan.

1. Sa pahina ng Settings, i-click ang **Volunteer Signup** sa listahan sa kaliwa, pagkatapos i-click ang **Edit** sa seksyong **Volunteer Signup**.
2. I-on ang **Show only the next week of each plan type**.
3. I-save ang mga pagbabago.

Kapag naka-on ito, ipapakita ng bawat uri ng plan ang susunod nitong darating na plan lamang. Lilitaw ang susunod na linggo kapag lumipas na ang petsang iyon. Ang hilera na **Weeks shown** sa seksyon ay magbabasang **Only the next week of each plan type** o **All upcoming weeks**.

## Privacy sa Giving {#giving-privacy}

Karaniwang nakikita ng mga taong may access sa giving ang kabuuang kaloob ng isang tao sa kanyang [person record](../people/adding-people.md#editing-details). Kung ayaw mong laging nakalitaw ang mga halaga sa screen tuwing may bubuksang record, maaari mo itong itago hanggang may humingi nito.

1. Sa pahina ng Settings, i-click ang **Giving privacy** sa listahan sa kaliwa, pagkatapos i-click ang **Edit** sa seksyong **Giving privacy**.
2. I-on ang **Hide giving on person records until clicked**.
3. I-save ang mga pagbabago.

Kapag naka-on ito, sasabihin ng giving card sa person record na "Giving is hidden on person records." I-click ang **Show giving** para i-load at ipakita ang kaloob ng taong iyon. Muling magtatago ito kapag nagbukas ka ng ibang tao. Hindi nagbabago kung sino ang makakakita ng giving: tanging ang mga taong may giving access lamang ang makakakita ng card.

## Import at Export

Ang link na **Import/Export** sa ilalim ng pangalan ng simbahan mo sa pahina ng Settings ay nagbubukas ng hiwalay na tool sa bagong browser window. Gamitin ito para:

- Mag-import ng datos ng miyembro mula sa ibang church management system.
- Mag-export ng iyong ChurchApps data para sa backup o paglipat.

Lalo itong nakakatulong kapag kakasimula mo pa lang mag-set up ng simbahan at kailangang ilipat ang umiiral na mga record sa ChurchApps.

:::warning
Kapag nag-iimport ng datos, laging i-back up muna ang umiiral mong mga record. Dinadagdagan ng import operation ang datos sa sistema mo at maaaring gumawa ng duplicate na entry kung maraming beses itong tatakbo.
:::
