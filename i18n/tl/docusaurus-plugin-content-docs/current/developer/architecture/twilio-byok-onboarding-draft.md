---
title: "Twilio Church Onboarding (Draft)"
description: "Draft ng pag-setup ng Twilio na pag-aari ng simbahan sa B1, patnubay sa pampublikong signup, mga halimbawa ng kampanya, at checklist ng pag-apruba."
---

# Draft ng onboarding ng Twilio na pag-aari ng simbahan

:::caution Draft para sa iminungkahing integrasyon
Ito ay isang iminungkahing workflow. May pangunahing opsyon na **Twilio** na ang B1 ngayon sa ilalim ng **Settings > Texting** (Account SID, Auth Token, From Number, at ang inbound STOP webhook) -- tingnan ang [Church Settings: Texting](../../b1-admin/settings/church-settings.md#texting). Ang mga karagdagang kontrol sa setup ng B1, consent mapping, at mga hakbang sa validation sa ibaba ay mga kinakailangan para sa susunod na release, hindi mga tagubilin para hanapin ang umiiral na mga setting. Basahin ang [technical proposal](./twilio-byok-proposal) para sa saklaw at mga dependency. Sinuri ang mga source ng Twilio noong Oktubre 22, 2026; i-verify ang kasalukuyang mga kinakailangan bago magsumite ng kampanya.
:::

## Ang inirerekomendang kaayusan

Pagmamay-ari ng iyong simbahan ang bayad nitong Twilio account, phone number, Messaging Service, billing, at campaign registration. Magpapadala ang B1 sa pamamagitan ng mga resource na iyon gamit ang mga credential na ilalagay nang pribado sa mga setting ng simbahan. Panatilihin ang hindi bababa sa dalawang angkop na administrator ng simbahan na may access sa Twilio account, i-enable ang seguridad ng account, at magtalaga ng taong mananagot sa pahintulot, mga papasok na reply, at mga abiso ng pagtanggi.

Ang unang release na iminumungkahi rito ay sumasaklaw sa isang US local number at isang malinaw na inilarawang messaging program ng simbahan. Ang mga halimbawa sa ibaba ay gumagamit ng kathang-isip na programang **Grace Church Updates** ng kathang-isip na **Grace Community Church** para sa mga pagbabago sa serbisyo, paalala sa event, at pag-iiskedyul ng boluntaryo. Palitan ang bawat pangalan, domain, dalas, contact, at layunin ng tunay na gawi ng simbahan. Mga halimbawang tiyak sa simbahan ang mga ito ng mga panuntunan ng Twilio, hindi isang paunang-aprubadong kampanya o pangako ng pag-apruba.

## 1. Ihanda ang pampublikong karanasan ng signup sa B1

Maglathala ng pahinang gaya ng `https://www.example.org/text-updates` sa website ng simbahan sa B1, na may naka-embed na pampublikong form ng B1 o malinaw na link sa standalone nitong pampublikong form. Maglathala rin ng `https://www.example.org/privacy` at `https://www.example.org/sms-terms`. Mga placeholder ang mga address na ito; isumite ang aktwal na mga URL na maaabot.

Para sa iminungkahing SMS signup form:

| Setting | Inirerekomendang configuration |
|---|---|
| Access | Pampubliko/walang restriksyon; aktibo habang nire-review at sa tuloy-tuloy na enrollment; available nang walang login |
| Form mode | Standard mode sa umpisa; ang conversational mode ay nangangailangan ng tahasang suporta sa consent na inilarawan sa technical proposal |
| Mobile | Malinaw na may label na may country code; kinakailangan lamang kapag pinili ang SMS enrollment, kung gagamitin sa loob ng pangkalahatang connection/event form |
| SMS choice | Hiwalay na opsyonal na checkbox, hindi naka-check bilang default, na naka-map sa partikular na programa at mobile field |
| Disclosures | Nakikita sa tabi ng SMS choice: simbahan/programa, layunin at dalas ng mensahe, posibleng singil, STOP, HELP, contact para sa suporta, at totoong nako-click na link sa Privacy Policy/SMS Terms |
| Iba pang aksyon | Maaaring isumite ng mga bisita ang connection card, magparehistro sa event, o humiling ng impormasyon nang hindi nagpapa-opt in sa SMS |
| Ebidensya | I-save ang programa, eksaktong telepono, piniling consent, pinagmulang submission, server time, at bersyon ng disclosure/policy; hindi nagpapa-enroll ng sinuman ang karaniwang sagot sa form lamang sa ngayon |
| Awtomasyon ng tao/grupo | Panatilihing naka-off ang awtomatikong paglikha ng tao/pagtatalaga sa grupo para sa unang signup pilot, maliban kung nasuri ayon sa umiiral na matching rules ng simbahan. Hindi kailanman ang pagtatalaga sa grupo ang awtorisasyon sa SMS |
| Umiiral na mga automation | Huwag i-enroll sa isang texting workflow ang bawat nagsumite ng form o miyembro ng grupo. Tanging ang iminungkahing na-verify na consent mapping lamang ang maaaring mag-awtorisa sa programang iyon |
| Thank-you text | Kumpirmahin na natanggap ang form nang hindi nagsasabing naka-enroll na sa SMS kapag tinanggihan ang checkbox o nakabinbin pa ang kumpirmasyon/review |

Maaaring gamitin ang kasalukuyang checkbox question bilang halimbawa ng form, pero kailangan pa rin ng B1 ang consent ledger at mga send gate. Ipinapakita ng kasalukuyang shared renderer ang mga paglalarawan bilang plain text; ang pag-type ng Markdown o URL doon ay hindi sapat na katiyakan na magiging nako-click ang mga link ng policy. Dapat magbigay ang implementasyon ng accessible na consent control na may aktwal na mga link. Tingnan ang [paggawa ng B1 forms](../../b1-admin/forms/creating-forms) at ang [technical proposal](./twilio-byok-proposal#consent-and-suppression-are-required-release-work).

Kinakailangan ng Twilio ang boluntaryo at mabe-verify na opt-in. Huwag isama ang SMS sa mga kinakailangang tuntunin ng pagiging miyembro, pahintulot sa email/telepono, consent sa donasyon, o event registration. Hindi sapat na consent sa SMS ang mobile number sa visitor card. Tingnan ang [voluntary-consent requirements](https://www.twilio.com/docs/api/errors/30923) ng Twilio at ang [campaign recommendations](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations).

### Halimbawang kopya ng signup

Gamitin ito pagkatapos lamang piliin ng simbahan ang aktwal na layunin, sender, at dalas. Opsyonal ang checkbox at nagsisimulang hindi naka-check; ang mga pangalan ng policy sa ibaba ay dapat maging link sa naka-render na form.

> Oo, gusto kong tumanggap ng text mula sa Grace Community Church sa pamamagitan ng Grace Church Updates tungkol sa mga pagbabago sa serbisyo, mga church event, at mga iskedyul ng boluntaryo mula sa [registered church number]. Asahan ang hanggang 4 na mensahe bawat buwan. Maaaring may singil para sa mensahe at data. Mag-reply ng STOP para mag-unsubscribe o HELP para sa tulong. Opsyonal ang SMS enrollment at hindi ito kailangan para dumalo, magparehistro, o magbigay. Tingnan ang aming Privacy Policy at SMS Terms. Mga tanong: [church support email or phone].

Ang "Hanggang 4" ay halimbawang pangako, hindi limitasyong itinakda ng Twilio. Palitan ito ng dalas na talagang kayang tuparin ng simbahan; kung nag-iiba ang dalas, sabihin ito nang totoo at ilarawan ang inaasahang takbo. Panatilihing nasa labas ng checkbox na ito ang mga promotional na apela o karagdagang programa ng ministeryo, maliban kung hiwalay nang nasuri ang mga layunin at consent nito.

Para sa pangkalahatang visitor/event form, dapat magtagumpay pa rin ang pagsusumite kapag hindi naka-check ang kahon. Maaaring ipaliwanag ng dedikadong SMS-only form na ang pag-check nito ay humihiling ng enrollment, pero hindi nito dapat gawing nakadepende ang mga walang-kaugnayang serbisyo ng simbahan sa enrollment. Kumpirmahin ang aktwal na gawi sa parehong telepono at desktop.

### Nilalaman ng policy na ihahanda

Dapat ipaliwanag ng privacy page ng simbahan kung anong impormasyon ang kinokolekta nito para sa texting, paano ito ginagamit at pinoprotektahan, at ang mga kasanayan nito sa retention/contact. Dapat malinaw nitong sabihin na ang mga mobile number at messaging consent ay hindi ibinebenta o ibinabahagi sa mga third party o kaanib para sa kanilang marketing o promotional na gamit. Ipaliwanag nang tama ang kinakailangang pagproseso ng service provider; huwag magsabing hindi kailanman gumagamit ng processor ang simbahan habang gumagamit ito ng B1 at Twilio. Ang [patnubay sa privacy policy](https://www.twilio.com/docs/api/errors/30908) ng Twilio at ang [campaign recommendations](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations) ang sanggunian para sa pagkakaibang ito.

Dapat tukuyan ng SMS terms ang simbahan at programa, mga layunin, aktwal na dalas, posibleng singil sa mensahe, mga tagubilin sa STOP/HELP, contact para sa suporta, at ang privacy link; isama ang anumang karagdagang disclosure na hinihingi ng kasalukuyang review ng Twilio. Itugma nang eksakto ang mga policy link ng opt-in page sa mga URL na isinumite sa campaign. Mula Hunyo 30, 2026, kinakailangan ng Twilio ang mga dedikadong pampublikong privacy at terms URL para sa mga bagong API campaign registration; kinokolekta rin ito ng Console flow nito. [Kinakailangan ng Twilio](https://www.twilio.com/en-us/changelog/a2p-10dlc-campaign-registration-will-require-privacy-policy-and-)

Ito ay mga kinakailangan sa nilalaman na ilalapat sa aktwal na mga policy ng simbahan, hindi kapalit ng umiiral nitong kasanayan sa privacy o generic na policy na ipapaste nang hindi sinusuri.

## 2. Irehistro ang simbahan at ang messaging program nito sa Twilio

1. Gumawa o gamitin ang **bayad na account na pag-aari ng simbahan** at isang SMS-capable na US local number. Gamitin nang pare-pareho ang lehitimong pangalan ng simbahan, EIN/impormasyon ng business registration, address, website, at awtorisadong kinatawan. Huwag palitan ng pagkakakilanlan ng ChurchApps o ng ibang simbahan ang impormasyon.
2. Sundin ang Brand registration flow ng Twilio para sa direct customer para sa aktwal na uri ng entity ng simbahan. Para sa karapat-dapat na nonprofit, gamitin ang [patnubay sa nonprofit registration](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/onboarding-for-government-and-non-profit-agencies). Nakadepende ang mga charity/501(c)(3) na use case sa pagiging karapat-dapat; ang pangalan lamang ng simbahan ay hindi nagtatatag ng pag-apruba o exemption ng Twilio.
3. Gumawa ng dedikadong Messaging Service at isumite ang kaugnay na A2P 10DLC campaign. Piliin ang use case na tapat na tumutugma sa aktwal na mga mensahe at sa mga opsyon na available sa approved Brand na iyon; hindi nagtatakda ng iisang universal na church use-case code ang mga halimbawa rito.
4. Ibigay ang pampublikong signup URL, mga policy URL, buong paglalarawan ng opt-in/message flow, at mga hinihinging sample message. Isama ang bawat tunay na paraan ng signup; itugma ang mga deklarasyon ng embedded-link/phone-number sa aktwal na nilalaman. Huwag ilista ang keyword enrollment o double opt-in maliban kung umiiral at nasubukan na ang flow na iyon.
5. Iugnay ang sending number sa service at sa naaprubahang campaign. Hintayin ang kapwa **campaign verification at kumpletong number registration** bago magpadala.

Panatilihin ang mga hakbang na ito sa sariling Twilio Console ng simbahan. Hindi nagsusumite ang iminungkahing integrasyon ng B1 ng mga registration para sa mga simbahan. Ipinapaliwanag ng [registration quickstart](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/quickstart) at [campaign resource](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) ng Twilio ang mga field at status ng registration. Maaaring humarang pa rin sa pagpapadala ang pending na number kahit naaprubahan na ang campaign. [Number registration](https://www.twilio.com/docs/api/errors/30035)

### Halimbawang paglalarawan ng campaign

> Gumagamit ang Grace Community Church ng Grace Church Updates para magpadala ng mga pagbabago sa iskedyul ng serbisyo, paalala para sa mga church event, at mga abiso sa iskedyul ng boluntaryo sa mga taong pumipili ng programang ito sa aming pampublikong website ng simbahan. Nagpapadala kami ng hindi lalampas sa apat na mensahe bawat buwan sa ilalim ng programang ito. Maaaring itigil ng mga tatanggap ang mga mensaheng ito anumang oras. Hindi kasama sa programang ito ang mga binilhang contact, third-party na promosyon, o mga apela para sa pangangalap ng pondo.

Angkop lamang ang halimbawang ito sa simbahang aktwal na sumusunod sa mga limitasyon at eksklusyong iyon. Kung lumampas sa ipinangakong dalas ang mga paalala para lamang sa boluntaryo, baguhin ang disenyo ng programa at ang disclosure bago magsumite.

### Halimbawang paglalarawan ng message flow

> Binubuksan ng mga bisita ang [aktwal na signup URL ng simbahan], inilalagay ang kanilang mobile number, at malayang pinipili ang opsyonal na checkbox ng Grace Church Updates. Hindi ito naka-check kapag bumukas ang form. Tinutukoy ng disclosure ang Grace Community Church, inilalarawan ang mga pagbabago sa serbisyo, paalala sa event, at iskedyul ng boluntaryo, ibinibigay ang buwanang limitasyon at posibleng singil, at ipinapaliwanag ang STOP at HELP. Ang ipinapakitang Privacy Policy at SMS Terms ay nagli-link sa [aktwal na privacy URL] at [aktwal na SMS terms URL]. Ang pagtanggi sa SMS ay hindi pumipigil sa pagdalo, pagpaparehistro sa event, pagbibigay, o paggamit ng pangkalahatang connection form. Itinatala ng B1 ang tahasang pagpili, phone number, oras ng pagsusumite, at bersyon ng disclosure. Nagpapadala lamang kami ng programang ito sa mga nakadokumentong subscriber at pinipigilan ang mga withdrawal bago ang anumang karagdagang send.

Iangkop ang talatang iyon sa aktwal na naipatupad na flow. Kung gumagamit ng phone confirmation o staff review, ilarawan ang pending na estado at ang eksaktong hakbang ng activation. Kung may ibang paraan, isama ang bawat paraan at ang ebidensya nito. Kapag nasa likod ng login ang enrollment o nangyayari ito sa papel, humihingi ang Twilio ng pampubliko, nire-redact na ebidensya ng aktwal na karanasan sa opt-in; huwag kailanman ilantad ang mga nakumpletong form o datos ng miyembro. [Patnubay sa verifiable opt-in](https://www.twilio.com/docs/api/errors/30923)

### Mga halimbawang outbound na mensahe

Ito ay mga kathang-isip na sample na iaangkop; gumamit ng tunay na URL ng simbahan at palitan ang mga halagang nasa bracket bago magsumite. Tumatanggap ang campaign API ng Twilio ng dalawa hanggang limang sample. Dapat tukuyan ng mga sample ang simbahan, ipakita ang idineklarang layunin, at magsama ng tagubilin sa opt-out. [Mga field ng campaign sample](https://www.twilio.com/docs/messaging/api/usapptoperson-resource)

```text
Grace Community Church: Magsisimula ang serbisyo sa Linggo ng [time] dahil sa [reason]. Mga detalye: [church website URL]. Mag-reply ng STOP para itigil ang mga text.
```

```text
Grace Community Church: Paalala na ang [church event] ay sa [date] ng [time]. Impormasyon: [church event URL]. Mag-reply ng STOP para itigil ang mga text.
```

```text
Grace Community Church: Nakaiskedyul kang maglingkod sa [team] ngayong [day]. Pakitingnan ang iyong plano: [B1 church portal URL]. Mag-reply ng STOP para itigil ang mga text.
```

Ipinapakita ng mga bracket na URL ang mga sample na variable; dapat ipakita ng mga isinumiteng halimbawa ang tunay na domain ng simbahan at ang aktwal na istilo ng link. Maaaring mangailangan ng login ang link sa isang plano, pero dapat maaaring suriin nang publiko ang signup page at mga policy na gagamitin sa pagsusuri. Huwag isama ang pribadong tala, impormasyon ng mga bata, o mga detalyeng nakikilala ang miyembro sa mga sample para sa pag-apruba. Panatilihing tugma ang nilalaman ng sample sa kung ano talaga ang ipinapadala ng mga template ng B1; huwag mangako ng reply inbox o partikular na gawi ng paalala na hindi available.

### Mga tugon sa STOP, START, at HELP

Gamitin ang Twilio Messaging Service Advanced Opt-Out para sa mga kumpirmasyong ito, at i-customize ang pagkakakilanlan ng simbahan/programa at mga detalye ng suporta. Halimbawa ng intensyon ng tugon:

- **STOP:** Kumpirmahin na huminto na ang Grace Church Updates at ipaliwanag ang suportadong paraan para ipagpatuloy ito.
- **START:** Kumpirmahin ang pagpapatuloy ng parehong programa, kasama ang pagkakakilanlan, dalas/singil, at mga tagubilin sa help/stop nito ayon sa hinihingi ng naka-configure na flow.
- **HELP:** Tukuyin ang Grace Community Church at ibigay ang aktwal na contact para sa suporta at mga tagubilin sa opt-out.

Huwag magpadala ng pangalawang kumpirmasyon mula sa B1 kapag sumagot na ang Twilio. Ang HELP reply ay hindi enrollment. Hindi dapat magpa-sign up ng sinuman ang START para sa dagdag na programa ng simbahan o ilantad sila sa member directory. [Twilio Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

## 3. Suriin ang approval packet bago isumite

- [ ] Magkakatugma ang aktwal na legal/Brand na impormasyon ng simbahan, pagkakakilanlan sa website, at layunin ng campaign.
- [ ] Bumubukas nang walang login sa isang pribadong browser ang signup page at ang aktibong form, kasama na sa mobile device.
- [ ] Nagsisimulang hindi naka-check ang SMS box at maaaring tanggihan habang kinukumpleto ang pangunahing aksyon ng bisita/event.
- [ ] Lumalabas sa tabi ng SMS choice ang layunin ng programa, nagpapadala, aktwal na dalas, posibleng singil, STOP, HELP, contact para sa suporta, at mga nako-click na policy link.
- [ ] Ang eksaktong privacy/terms URL na ibinigay sa Twilio ay pampubliko, gumagana nang walang credentials, at tumutukoy sa parehong simbahan/programa. Tumutugma ang nilalaman ng policy sa aktwal na pagproseso.
- [ ] Tumutugma ang bawat sample na mensahe sa programa, sa aktwal na pagkakakilanlan ng sender, at sa inaasahang gawi ng link/phone. Inilalarawan ng campaign ang bawat tunay na paraan ng opt-in.
- [ ] Ipinapakita ng mga nire-redact na screenshot ang blangkong form, checkbox/disclosure, at mga policy link gaya ng makikita ng mga reviewer. Walang tala ng miyembro o susi sa ebidensya.
- [ ] May operational na paraan ang simbahan para itago ang ebidensya ng consent at igalang ang mga withdrawal bago magpadala, kasama ang mga kahilingang natanggap sa pamamagitan ng telepono/email.

Binabawasan ng mga pagsusuring ito ang maiiwasang hindi pagtutugma; ang Twilio at ang mga kasosyo nito sa review ang nagpapasya sa pag-apruba. Panatilihing available ang tunay na signup page at mga policy URL pagkatapos ng pag-apruba, hindi lamang habang nire-review.

## 4. Ikonekta at i-validate ang hinaharap na integrasyon ng B1

Pagkatapos ma-ship ang integrasyon, dapat kolektahin ng iminungkahing setup ng Texting ang Account SID ng simbahan, dedikadong API Key SID/secret, hiwalay na webhook Auth Token, Messaging Service SID, at napiling sender. Gumawa ng mga key lamang sa Console ng simbahan at ilagay ang mga secret lamang sa pribadong setting ng B1. [Patnubay sa Twilio API key](https://www.twilio.com/docs/iam/api-keys)

Kopyahin ang mga webhook URL ng simbahan para sa papasok at delivery-status na ibinigay ng B1 sa katugmang configuration ng Twilio service. I-enable ang Advanced Opt-Out at tiyaking umaabot sa naka-configure na webhook ang mga papasok na mensahe. Dapat magpakita ang B1 ng hiwalay na check para sa credentials, pagmamay-ari ng service/sender, na-verify na campaign, kumpletong number registration, inbound verification, at naihatid na test. Hindi ang na-save na credential o ang tinanggap na API request ang huling delivery.

Kung hindi programmatic na masusuri ng B1 ang signal ng registration, kumpirmahin ito nang direkta sa Console; dapat lagyan ng label ng UI ang may petsang resulta bilang kinumpirma ng administrator. Lutasin muna ang pending/failed na status bago paganahin ang production texts. Gumamit ng hiwalay at tahasang hiniling na test sa isang tunay na nagsang-ayong adult na test recipient, pagkatapos:

1. Kumpirmahin na ang tugmang nakadokumentong signup ay lumilikha ng tamang phone/program consent record; ang pagtanggi o pagbabago ng telepono ay hindi dapat tahimik na mag-enroll ng tatanggap.
2. Magpadala ng isang test, kumpirmahin ang pagtanggap, at ihambing ang status ng B1 sa Twilio Message SID at kinalabasan ng delivery.
3. Mag-reply ng STOP at tiyaking nilalaktawan ng mga manual text, group text, workflow, at paalala ang telepono na iyon. Hindi dapat magbago ang directory visibility.
4. Subukan ang nakadokumentong daloy ng muling pag-subscribe sa parehong programa at ang tugon sa HELP; i-verify na walang duplicate na kumpirmasyon at walang hindi kaugnay na pagbabago sa preference.

## 5. Panatilihin ang programa

Magtalaga ng may-ari sa simbahan na magbabantay sa status ng campaign/account, mga alerto sa balanse at billing, mga pagkabigo ng mensahe, at mga papasok na reply sa Twilio. Walang conversational SMS inbox ang unang iminungkahing release ng B1, kaya maglathala at bantayan ang isang tunay na help contact at suriin ang mga reply sa halip na ipagpalagay na nakikita ng staff ang mga ito sa B1.

Panatilihin sa mga talaang kontrolado ng simbahan ang kasaysayan ng consent at withdrawal, kasalukuyang bersyon ng disclosure/policy, campaign identifiers, at nire-redact na ebidensya ng pag-apruba. Huwag kailanman idikit ang mga susi o listahan ng tatanggap sa mga public support ticket. Kapag nagbago ang isang number, service, credentials, signup flow, dalas, o layunin, suriin muli ang integrasyon at i-update ang registration/consent kung kinakailangan bago ituloy. Maingat na suriin ang mga shared na numero ng sambahayan at mga nabagong numero; nakabatay ang pagiging karapat-dapat sa nagsang-ayong telepono at programa, hindi sa talaan ng bawat miyembro ng pamilya.

Para sa pagtanggi, basahin ang aktwal na error ng Twilio, itama ang tiyak na hindi pagkakatugma sa kapwa website at isinumite, at muling isumite sa pamamagitan ng Console ng simbahan. Para sa mga unregistered/pending na sender, hintayin ang pagkumpleto ng registration sa halip na magpalit ng mga numero para makaiwas dito. Gamitin ang [troubleshooting ng registration ng Twilio](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands) at ang ibinigay na sanggunian ng error code. Huwag mangako ng nakapirming oras ng pagproseso.
