---
title: "Twilio BYOK (Panukala)"
description: "Iminumungkahing integration ng Twilio na pag-aari ng simbahan, modelo ng pahintulot, saklaw ng implementasyon, at mga criteria bago ilabas."
---

# Panukala para sa Twilio BYOK integration

:::caution Panukala — hindi pa available na integration
Ito ay disenyo para sa pagrepaso ng mga maintainer, batay sa pampublikong source at dokumentasyon ng Twilio na sinuri noong Oktubre 22, 2026. Mula noon, may naipalabas nang pangunahing Twilio provider (`@churchapps/texting` 0.6.0 at ang **Settings > Texting** ng B1 Admin): ilalagay ng simbahan ang kanilang Account SID, Auth Token, at From number (tumatanggap din ang provider ng Messaging Service SID na nagsisimula sa `MG`, ngunit maikli pa rin ang column na `fromNumber` na `varchar(20)` para sa 34-karakter na SID), ipinapadala ang mga text nang isang request bawat tatanggap sa pamamagitan ng Messages API ng Twilio, at umaabot sa B1 ang mga STOP reply sa pamamagitan ng umiiral nang inbound webhook. Tingnan ang [Mga Setting ng Simbahan: Texting](../../b1-admin/settings/church-settings.md#texting). Ang modelo ng pahintulot, paghawak ng Advanced Opt-Out, delivery status, at mga pagsusuri sa kahandaan ng setup sa ibaba ay mga panukala pa rin, hindi pa naipapalabas na gawi. Ang kasamang [draft ng onboarding ng simbahan](./twilio-byok-onboarding-draft) ay naglalaman ng iminumungkahing gabay sa setup at mga halimbawang partikular sa simbahan.
:::

## Inirerekomendang landas

Idagdag ang Twilio sa umiiral na sistema ng texting provider ng B1 gamit ang **isang account ng Twilio na pag-aari ng simbahan, mga API credential, Messaging Service, at numerong may kakayahang magpadala ng SMS**. Irerehistro ng simbahan ang sarili nitong legal na entity at messaging campaign, direktang magbabayad sa Twilio, papanatilihin ang pahintulot ng mga tatanggap, at pamamahalaan ang pag-apruba sa Twilio Console. Ibibigay ng ChurchApps ang integration at dokumentasyon.

Magsimula sa isang messaging program, isang Messaging Service, at isang US local 10DLC sender bawat simbahan sa B1. Suportahan ang indibidwal na text, group text, workflow text, at opt-in reminder sa pamamagitan ng umiiral na mga screen ng B1. Makatwirang unang programa ang sumasaklaw sa mga pagbabago sa serbisyo, paalala sa event, at iskedyul ng boluntaryo, kapag ang tatlong ito ay nakasaad sa pahintulot at aprubadong campaign ng simbahan. Ang fundraising o promotional na messaging ay nangangailangan ng hiwalay na pagsusuri ng saklaw at pahintulot; huwag itong idagdag nang tahimik sa programang ito.

| Responsibilidad | Simbahan | B1 / ChurchApps |
|---|---|---|
| Account, billing, at pagmamay-ari ng numero sa Twilio | Pagmamay-ari at pinamamahalaan nila | Hindi nagbibigay ng platform account o muling nagbebenta ng credits |
| Brand, campaign, at pagpaparehistro ng numero | Nagsusumite ng tumpak na impormasyon ng simbahan; humahawak ng review at pagwawasto | Ipinapaliwanag ang mga kinakailangan at binabasa ang available na impormasyon sa kahandaan |
| Signup page, mga patakaran, at layunin ng mensahe | Nagpapalathala at nagpapanatili sa mga ito | Nagbibigay ng compatible na form control, halimbawa, at talaan ng pahintulot |
| Pagiging karapat-dapat ng tatanggap at paghawak ng STOP | Nirerepaso ang ebidensya ng pahintulot at humihiling ng pahintulot na natanggap sa labas ng SMS | Ipinapatupad ang pahintulot, suppression, pahintulot, at naka-sign na webhook |
| Paghahatid at suporta | Binabantayan ang mga error ng Twilio, kalusugan ng account, at mga papasok na reply | Ipinapakita ang status ng pagsusumite at paghahatid nang hindi nag-aangking may garantiya sa pag-apruba |

Ipagpaliban ang isang parent account ng Twilio na pag-aari ng ChurchApps, mga customer subaccount, pagbili ng numero, pagsusumite sa Trust Hub, billing, inbox ng usapan, MMS/WhatsApp, international na pagpapadala, at toll-free onboarding. Ang toll-free ay hiwalay na landas ng verified sender, hindi paraan para laktawan ang pagpaparehistro. Pinananatili ng mga hangganang ito na nakaayon ang unang release sa umiiral na bring-your-own-provider model ng B1.

## Umiiral na pundasyon at mga puwang

Ang mga sumusunod na obserbasyon ay nakatali sa mga snapshot ng source, at hindi batay sa palagay tungkol sa kung ano ang kasalukuyang naka-deploy:

| Bahagi | Umiiral na gawi | Implikasyon |
|---|---|---|
| [Provider registry at contract](https://github.com/ChurchApps/Packages/tree/68c93d610031d3ed56d3582055413e851c5cb2ee/texting/src) | Ang `ITextingProvider` ay may single/bulk send, validation, opsyonal na subscriber/list capability, at provider message ID sa mga resulta. Walang nakarehistrong Twilio adapter. | Idagdag ang Twilio sa `@churchapps/texting`; hindi ito nangangailangan ng paglikha ng subscriber o provider-managed na list. |
| [Mga setting ng texting](https://github.com/ChurchApps/B1Admin/blob/e33cc2386d96e2e3cb24e760d458a72b699c71c3/src/settings/components/TextingSettingsEdit.tsx) | Maaaring piliin ang Clearstream, Text In Church, at Nalo; naka-feature gate ang MinistryStuff. Sa kasalukuyan, ang pag-edit/pag-save ng sender ay para lamang sa Nalo. | Idagdag ang tahasang Twilio field, validation, pag-save ng sender, at tulong sa onboarding. Hindi sapat ang isang entry lamang sa dropdown. |
| [Controller](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/controllers/TextingController.ts) at [module gateway](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/shared/modules/MessagingModuleGateway.ts) | Naka-encrypt at tinatakpan ang mga credential; ang manu-mano at awtomatikong pagpapadala ay nireresolba ang provider ng simbahan. Dine-deduplicate ng group send ang mga shared na numero ng telepono. | Gamitin muli ang mga path na ito at panatilihin ang pahintulot. Ilagay ang mga bagong gate ng pahintulot at kahandaan sa isang karaniwang server path para hindi ito malampasan ng mga workflow. |
| [STOP helper](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/helpers/SmsOptOutHelper.ts) | Nagpa-parse ng Twilio-style na `From`/`Body`; nagva-validate ng URL token ng simbahan; nagtatakda ng `person.optedOut` at nag-o-off ng SMS reminder. Binabalewala ang ibang reply. | Kapaki-pakinabang na panimulang punto, ngunit hindi ito kumpletong Twilio webhook. Magdagdag ng Twilio signature at hiwalay na estado ng SMS subscription. |
| [Messaging schema](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/tools/migrations/messaging/2026-04-03_initial_schema.ts) | Nag-iimbak ng `apiKey`, `apiSecret`, at 20-karakter na `fromNumber`; ang delivery log ay nag-iimbak lamang ng agarang tagumpay/error, hindi ng provider ID o panghuling estado ng paghahatid. | Angkop ang E.164 sender; ang 34-karakter na Messaging Service SID ay nangangailangan ng sariling field. Magdagdag ng matibay na imbakan ng provider message/status. |
| [Public form page](https://github.com/ChurchApps/B1App/blob/5ca19ee4ef947235b8ffba9fbb35af42d0dcb41d/src/app/%5BsdSlug%5D/%28public%29/%5BpageSlug%5D/%5Bid%5D/components/FormPage.tsx), [shared form renderer](https://github.com/ChurchApps/Packages/blob/68c93d610031d3ed56d3582055413e851c5cb2ee/apphelper/src/forms/components/QuestionEdit.tsx), at [submission controller](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/membership/controllers/FormSubmissionController.ts) | May mga unrestricted na form at opsyonal na checkbox. Plain text ang mga paglalarawan. Pinananatili ng mga submission ang mga sagot, ngunit walang campaign-specific na talaan ng pahintulot ang texting path. | Magdagdag ng naka-configure na SMS consent control na may totoong policy link at ebidensyang kinukuha sa server; hindi awtomatikong nagbibigay ng pahintulot sa SMS ang generic na checkbox o pagiging miyembro ng grupo. |

Ipinapaliwanag din ng [dokumentasyon ng setting ng simbahan para sa user](../../b1-admin/settings/church-settings#texting) na ang kasalukuyang opt-out flag ay pinagsasaluhan sa privacy ng directory. Isa itong alalahanin sa release: ang pagtugon ng START ay hindi dapat kailanman magbago ng visibility sa directory.

## Disenyo ng configuration at credential

Gumamit ng tahasan at additive na configuration field sa halip na pagsamahin ang `fromNumber` o mag-imbak ng structured data sa isang API-key string:

| Field | Iminumungkahing layunin |
|---|---|
| `accountSid` | Identifier ng account/project ng Twilio na pag-aari ng simbahan (`AC…`) |
| `apiKey`, `apiSecret` | Dedikadong Twilio API Key SID (`SK…`) at secret para sa outbound na API access; naka-encrypt at tinatakpan |
| `webhookAuthToken` | Account Auth Token na ginagamit ng Twilio SDK para i-validate ang papasok na signature; hiwalay na naka-encrypt/tinatakpan |
| `messagingServiceSid` | Messaging Service ng simbahan (`MG…`, 34 karakter) |
| `fromNumber` | Piniling numerong may kakayahang magpadala ng SMS sa format na E.164, na na-verify bilang sender sa account/service na iyon |
| Configuration ng programa | Stable na program ID, pangalan, pinapayagang layunin, signup/policy URL, at bersyon ng disclosure |

Mas gusto ng Twilio ang [API keys para sa REST authentication](https://www.twilio.com/docs/iam/api-keys). Gamitin ang pinakamakitid na pahintulot ng key na nasubukan na, na sumasaklaw sa pagpapadala at sa mga read-only na pagsusuri sa setup na kailangan. Kailangan pa rin ang account Auth Token para sa [karaniwang pagsusuri ng webhook signature ng Twilio](https://www.twilio.com/docs/usage/security). Ipaliwanag ang pagkakaibang ito sa UI; ang API secret ay hindi katumbas ng webhook Auth Token. Panatilihin ang mga credential nang eksklusibo sa server-side settings store, hindi kailanman sa mga pampublikong pahina, sagot ng form, browser send request, o support issue.

Ang simbahan ang lumilikha at namamahala sa mga resource na ito sa Console. Ang validation action ng B1 ay dapat magbasa lamang ng naka-configure na service, sender, at impormasyon sa pagpaparehistro. Hindi ito dapat bumili ng numero, gumawa ng campaign, magbago ng setting ng Twilio, o magpadala ng test message bilang side effect. Magbigay ng hiwalay at tahasang test-send action na limitado sa isang karapat-dapat at pumayag na tatanggap.

Panatilihin lamang ang mga masked na credential kapag nag-e-edit ng parehong naka-save na provider. Ang paglipat sa Twilio ay dapat mangailangan ng sarili nitong mga credential at dapat burahin ang mga lumang value na tiyak sa provider; huwag dalhin ang masked na Clearstream o Nalo key sa configuration ng Twilio.

I-scope ang bawat load/update sa naka-authenticate na simbahan ng B1. Itali ang mga callback sa isang naka-save na integration at sa inaasahang Twilio account/service/sender, at tanggihan ang magkasalungat na cross-church na assignment. Ang pag-rotate ng credential at pagdiskonekta ng provider ay dapat magpawalang-bisa sa kahandaan at magpahinto sa mga naka-queue na pagpapadala nang hindi binubura ang pahintulot o ang mga naitalang kasaysayan ng paghahatid.

## Ang pahintulot at suppression ay kinakailangang gawaing release

Magpakilala ng mga talaan ng subscription na nakatali sa telepono para sa programa ng Twilio, kasama ang append-only na mga event ng pahintulot/suppression. Ang iminumungkahing pinakamababang ebidensya ay: church ID, program ID, normalized na telepono, opsyonal na na-verify na ugnayan sa tao, tahasang aksyon ng pagpayag, source form/submission ID o nirepasong panlabas na patunay, server timestamp, teksto/bersyon ng disclosure, source URL, policy URL, at mga event ng pag-withdraw at pag-restart. Limitahan ang access at retention ayon sa umiiral na data-security policy ng simbahan.

Gumamit ng mga estado gaya ng `unknown`, `pending`, `active`, at `suppressed`. Ang mga umiiral na mobile number, na-import na contact, attendance, donasyon, pagiging miyembro ng grupo, `person.optedOut = false`, at `allowSms` ay hindi tahasang pahintulot sa programa. Ang pag-import ng dokumentadong pahintulot ay dapat na aksyong may pahintulot at naitala sa audit na may nakatalang pinagmulan; hindi dapat magpatala ng lahat ang migration.

Para sa paunang web flow, gamitin ang karaniwang public form mode ng B1. Magdagdag ng tahasan at naka-configure na tanong sa pahintulot sa SMS na nagsisimulang hindi naka-check, nananatiling opsyonal, nagre-render ng mga clickable na policy link, at nagmamapa sa isang programa at isang mobile field. I-validate ang mapping na ito sa server at i-snapshot ang ipinapakitang disclosure kapag nagse-save ng positibong sagot. Huwag kailanman kunin ang pahintulot mula sa arbitrary na label ng tanong, conversational AI, o pagiging miyembro ng workflow. Paganahin lamang ang katumbas na conversational pagkatapos masubukan ang tahasang positibong interaksyon at pagtatala ng ebidensya.

Ang hindi na-check na submission ay hindi gumagawa ng subscription at hindi dapat bawiin ang umiiral na pahintulot ng iba. Itali ang pahintulot sa telepono na isinumite; maaaring ayusin ng staff ang malabong ugnayan sa tao nang hindi pinagsasama ang mga rekord ng sambahayan. Kailangan ng bagong pahintulot ang binagong mobile number. Para sa mga anonymous na form, maglapat ng abuse control at gawing tahasan ang anumang hakbang ng pag-verify ng pagmamay-ari ng numero o double opt-in; hindi patunay sa kung sino ang may-ari ng telepono ang isang na-check na checkbox lamang. Kung gagamit ng confirmation, panatilihing pending ang subscription hanggang makumpleto ito at ilarawan nang eksakto ang flow na iyon sa mga materyales sa pagpaparehistro.

Para sa Twilio, ihiwalay ang SMS suppression sa visibility ng directory. Maingat na i-migrate ang anumang legacy na opt-out bilang suppression record; iwanang `unknown` ang ibang legacy na tatanggap. Ang tahasan at dokumentadong bagong enrollment ay maaaring magtatag ng pahintulot sa SMS habang nananatiling hindi nagbabago ang privacy ng directory. Panatilihin ang gawi ng ibang provider hanggang sa hiwalay na masuri ang kanilang mga migration.

Sa bawat aktwal na pagpapadala, kailangang naka-enable/handa ang integration ng simbahan, may kasalukuyang pahintulot sa programa para sa eksaktong telepono, walang suppression sa antas ng telepono, at mayroon ang tumatawag ng kasalukuyang pahintulot. Dagdag pa rito, ang mga reminder ay sumusunod sa `allowSms`, mga kagustuhan sa kategorya, at quiet hours. Muling suriin pagkatapos ng queueing, resolbahin ang mga merge field, i-normalize/i-validate ang mga numero, at i-deduplicate ayon sa telepono. Pinipigilan ng STOP ang lahat ng pagpapadala para sa service/programa, kasama ang manu-manong pagpapadala at mga workflow; dapat din nitong saklawin ang bawat taong nagbabahagi ng telepono.

Ipakita nang pare-pareho ang pagkakakilanlan ng simbahan at ang tagubilin ng STOP sa karaniwang Twilio send path, at ipakita ang panghuling bilang ng SMS/segment bago magpadala. Dapat mapanatili ng pagpapalawak ng merge field at paghawak ng haba ang mga elementong iyon; huwag tahimik na putulin ang tagubilin sa opt-out. Panatilihing magkakatugma ang mga halimbawa at ang mga aktwal na template ng reminder/workflow.

## Mga Twilio send, reply, at estado ng paghahatid

Ipatupad ang `TwilioProvider.sendMessage` sa pamamagitan ng Messages API gamit ang napiling Messaging Service at sender. Magbalik ng provider message SID at resultang tinanggap/naisumite; ang HTTP acceptance ay hindi paghahatid sa handset. Ang group send ay gumagamit ng resulta bawat tatanggap ayon sa pagkakasunod ng input.

Limitahan ang sabay-sabay na outbound para sa **parehong** `sendBulk` at indibidwal na pagpapadala: kasalukuyang nagpapalabas ng maraming tawag sa `sendMessage` ang merge-field branch. Itala ang layunin sa pagpapadala at mga gawaing maaaring i-claim para sa mga grupong hindi kasya sa request budget; gamitin muli ang umiiral na modelo ng deployment sa halip na pilitin ang mga simbahan na magpatakbo ng isa pang serbisyo. Subukan muli ang mga kilalang pansamantala/rate-limit na failure gamit ang backoff. Ituring ang mga hindi tiyak na timeout bilang hindi tiyak na kinalabasan na dapat i-reconcile, hindi bilang utos na basta na lang muling ipadala, para hindi maulit ang mga duplicate na text at singil.

I-configure ang mga URL ng inbound at status callback na partikular sa simbahan. I-validate ang `X-Twilio-Signature` gamit ang SDK, ang eksaktong naka-configure na external URL, ang orihinal na form parameter, at ang katugmang account Auth Token. Hindi sapat ang sekretong URL lamang. Itugma ang mga callback sa naka-save na mga rekord ng simbahan/account/mensahe, hawakan ang mga duplicate at mga callback na dumarating bago pa mai-commit ang resulta ng pagpapadala, at pigilan ang mga mas lumang event na mag-overwrite sa isang terminal na status. Magbalik ng walang laman na TwiML para sa inbound acknowledgment at ng angkop na success response para sa status event. [Seguridad ng Twilio](https://www.twilio.com/docs/usage/security), [status callback](https://www.twilio.com/docs/messaging/guides/track-outbound-message-status)

Irekomenda ang **Advanced Opt-Out** ng Messaging Service. Ang Twilio ang humahawak sa mga kumpirmasyon ng STOP/START/HELP; kinokonsumo ng B1 ang mga naka-authenticate na event na `OptOutType` nang hindi nagpapadala ng dobleng kumpirmasyon. Agad na nagtatala ng suppression ang STOP. Ibinabalik lamang ng START ang isang kilalang subscription sa parehong nakasaad na programa, kasama ang bagong restart event; hindi nito dapat i-opt in ang bagong telepono sa mga hindi kaugnay na mensahe o i-on ang mga reminder preference. Hindi nagpapatala ng sinuman ang HELP. Ang ibang papasok na reply ay nananatili sa labas ng saklaw ng B1 inbox; kailangan ng mga simbahan ng dokumentadong paraan para bantayan ang mga ito sa Twilio. [Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

Itabi ang Twilio message SID, binding ng account/service, oras ng pagsusumite, panghuling status/error code, at oras ng callback kasama ng delivery log. Ipakita nang tumpak ang naka-queue/tinanggap, naihatid, nabigo, hindi naihatid, o hindi tiyak na estado. Panatilihin ang umiiral na response contract para sa ibang provider at tukuyin kung ang mga pinagsama-samang bilang ng tagumpay ay kumakatawan sa pagsusumite o paghahatid.

## Pagsusuri ng kahandaan sa setup at pag-validate ng pag-apruba

Ipakita ang magkakahiwalay na checkpoint para sa mga credential, pagmamay-ari ng service/sender, campaign verification, pagpaparehistro ng numero, mga pagsusuri sa webhook, at isang naihatid na smoke test. Huwag kailanman magpakita ng iisang berdeng badge na "approved" dahil lang gumagana ang mga credential.

Para sa mga US local na numero, basahin ang [Usa2p campaign resource](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) ng service at hingin na ang kaugnay na campaign ay `VERIFIED`. Hiwalay na i-verify na ang napiling telepono ay nakaugnay sa service na iyon at natapos na ang pagpaparehistro ng numero: maaaring may aprubadong campaign pero nakabinbin pa rin ang numero. Kapag hindi inilalantad ng sinusuportahang read API ang kinakailangang signal, ipakita ang **manual Console verification required** at itala ang may petsang kumpirmasyon ng administrator ng simbahan bilang ganoon; huwag itong lagyan ng label na API-verified. Maaaring maging follow-up ang awtomatikong event ng pagpaparehistro ng numero. [Mga error sa pagpaparehistro ng numero](https://www.twilio.com/docs/api/errors/30035), [A2P registration events](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/event-streams-setup)

Kailangan ng kasalukuyang pagsusuri bago paganahin ang mga pagpapadala; itala kung kailan at paano sinuri ang kahandaan, pawalang-bisa ang mga lumang pagsusuri, at ihinto kapag binawi ang mga credential, nagbago ang mga sender, nabigo ang pagpaparehistro, o paulit-ulit ang error ng account. Ang paghahatid ng smoke test ay nagpapatunay lamang sa nasubukang landas, hindi sa pangkalahatang pag-apruba ng carrier o pahintulot ng tatanggap. Tinutukoy ng kasamang draft ang mga pagsusuri ng simbahan bago magsumite, bago ilunsad, at sa patuloy na operasyon.

## Plano ng repository at release

Idinidirekta ng [gabay sa pag-aambag ng organisasyon](https://github.com/ChurchApps/.github/blob/main/CONTRIBUTING.md) ang mga feature request ng B1 sa ChurchAppsSupport, at ang mga implementation PR sa mga repository na nagmamay-ari ng mga ito. Gumamit ng isang sentral na feature request at iugnay dito ang mga nakatutok na implementation PR:

1. **ChurchAppsSupport:** suriin ang disenyong ito at ang draft ng onboarding nito bago ipakita ang Twilio bilang available na feature ng user.
2. **Packages:** idagdag ang Twilio adapter, ang tahasang shared configuration/interface, at ang rendering ng SMS consent form kung saan ito ibinabahagi ng B1Admin/B1App. Isama ang changeset at i-publish sa pamamagitan ng umiiral na release workflow bago i-update ang mga consumer.
3. **Api:** magdagdag ng additive na migration para sa integration metadata, pahintulot/suppression, at mga estado ng paghahatid; ipatupad ang configuration validation, mga shared send gate, pagkuha ng ebidensya sa form, paghawak ng webhook, at pagtatala ng dispatch.
4. **B1Admin:** magdagdag ng configuration/readiness UI ng Twilio, pamamahala ng programa/pahintulot, sender saving na may kamalayan sa provider, at tumpak na pag-uulat ng paghahatid. Huwag maglantad ng anumang override sa pahintulot ng SMS sa ordinaryong pag-edit ng tao.
5. **B1App:** i-verify ang public form/page at karanasan sa policy-link laban sa mga shared control, kasama ang mga anonymous at mobile na bisita. Hindi kailangan ng hiwalay na Twilio browser client.
6. **ChurchAppsSupport:** pagkatapos ng release, gawing suportadong mga pahina ng setting/tulong ang draft ng onboarding, magdagdag ng aktwal na screenshot, ikonekta ito mula sa Texting settings, at mag-ayos ng mga pagsasalin.

I-deploy muna ang schema at mga shared package bago ang mga consumer. Panatilihing naka-feature gate ang Twilio para sa maliit na opt-in na pilot; dapat patuloy na gumana ang umiiral na mga provider. Ang rollback ay nag-di-disable ng Twilio dispatch at kumakansela ng mga hindi pa naisusumiteng job, habang pinananatili ang mga opt-out at ebidensya; hindi nito dapat awtomatikong ilipat ang mga tatanggap sa ibang provider o sender.

## Pagtatasa ng pagsisikap

Tinatayang pagpaplano para sa contributor na pamilyar sa ecosystem; walang production credential o live na SMS na ginamit sa pagtatasang ito:

| Gawain | Araw ng developer |
|---|---|
| Adapter, extension ng configuration/schema, settings UI | 2–3 |
| Pahintulot ng telepono/programa, independent na suppression, shared send gate, integration ng public form | 3–5 |
| Naka-sign na callback, pagpapanatili ng paghahatid, bounded/durable na dispatch | 2–3 |
| Readiness UI, gabay ng simbahan, integration at regression testing, pag-aayos sa pilot | 3–4 |
| **Inirerekomendang saklaw ng launch** | **10–15 kabuuan** |

Ang pangunahing proof of concept ng adapter/settings ay humigit-kumulang 1–2 araw. Hindi kasama sa sender-only na pagtatantya ang gawain sa pahintulot at onboarding na kailangan para sa rekomendasyong ito. Ang oras ng external na pagsusuri ng Twilio/carrier ay hiwalay at nagbabago; hindi dapat mangako ang proyekto ng petsa ng pag-apruba o kinalabasan ng pag-apruba.

## Pamantayan sa pagtanggap

- [ ] Pagmamay-ari at binabayaran ng simbahan ang account, service, nairehistrong sender, at campaign; walang kailangang Twilio account na pinamamahalaan ng ChurchApps.
- [ ] Naka-encrypt/tinatakpan, naka-scope sa tenant, nare-rotate ang mga credential, at wala sa mga log/pampublikong content; read-only ang validation.
- [ ] Ang opsyonal at hindi naka-check na pahintulot ay nagre-render ng totoong policy link at nagse-save ng ebidensya ng programa/telepono/disclosure sa server; ang pagtanggi ay nagpapahintulot pa rin sa pangunahing aksyon ng form.
- [ ] Ipinapatupad ng lahat ng manu-mano, group, merge-field, workflow, at reminder path ang parehong Twilio eligibility gate. Nilalaktawan ang hindi kilala, walang pahintulot, binagong telepono, o suppressed na tatanggap na may kapaki-pakinabang na dahilan; pinananatili ng rendering ang pagkakakilanlan ng simbahan at mga tagubilin ng STOP pagkatapos ng pagpapalawak at paghawak ng haba.
- [ ] Hindi nagpapatala ng tatanggap ang legacy na privacy ng directory; hindi kailanman binabago ng STOP/START ang visibility ng directory o mga hindi kaugnay na preference. Nasubok ang mga kaso ng shared na telepono at cross-church.
- [ ] Nasasakop ang mga naka-sign na STOP/START/HELP, hindi wastong signature, maling account/service, duplicate na event, muling-ipinadalang form submission, at pineke na consent mapping.
- [ ] Nasusubok ang laki ng group/timeout, rate limit, bahagyang pagkabigo, hindi tiyak na kinalabasan, race ng callback, at out-of-order na delivery event nang walang duplicate na pagpapadala.
- [ ] Magkahiwalay ang pag-apruba ng campaign at kumpletong pagpaparehistro ng numero sa credential validation. Malinaw na nilalagyan ng label ang manual na ebidensya; ang luma o binawing kahandaan ay humaharang sa mga pagpapadala.
- [ ] Sinusuri ng isang pilot na simbahan ang kanilang signup page, ang mga landas ng form na tinanggihan at tinanggap, ang eksaktong policy URL, at isang pumayag na test recipient sa pamamagitan ng pagsusumite, paghahatid, STOP suppression, at pinayagang muling pag-subscribe.
- [ ] Pumapasa sa regression check ang umiiral na mga setting at gawi sa pagpapadala ng Clearstream, Text In Church, at Nalo; malinaw na pinagkakaiba ng help copy ang mga panukala sa mga feature na nailabas na.
