---
title: "Twilio BYOK (Isiphakamiso)"
description: "Isiphakamiso sekuhlanganiswa kwe-Twilio lesiphethwe ngulibandla, imodeli yekuvumela, lubuchwepheshe bekusetjentiswa, kanye netimfuneko zekukhishwa."
---

# Isiphakamiso sekuhlanganiswa kwe-Twilio

:::caution Isiphakamiso — asisiyo sihlanganiso lesitfolakala
Lesi yidizayini yekubuyekezwa ngumgcini, esekelwe ekhodi lomphakathi kanye nemagama Twilio lebuyekezwe ngo-Ntjaka 22, 2026. Kusukela lapho, umhlinzeki lolula we-Twilio usuvele watfolakala (`@churchapps/texting` 0.6.0 kanye ne-B1 Admin **Settings > Texting**): libandla lifaka i-Account SID, i-Auth Token, kanye nenombolo ye-From (umhlinzeki uphindze wemukele i-Messaging Service SID lecala ngo-`MG`, kepha kolunsi `fromNumber` isafaka `varchar(20)`, lincane kakhulu ku-SID lenemakhasi langu-34), emagama athunyelwa sicelo ngasinye kumuntfu ngamunye ngalokusetjentiswa kwe-Messages API ye-Twilio, kanye nemaphendvulo ye-STOP afika ku-B1 ngesikhangiso lesingenako lesikhona. Bona [Izilungiselelo Zelibandla: Texting](../../b1-admin/settings/church-settings.md#texting). Imodeli yekuvumela, kuphatfwa kwe-Advanced Opt-Out, kubonakala kwesimo sekuhlanganiswa, kanye nemahlolo ekulungela kwekusetjenswa lalandzelako asasiso siphakamiso, hhayi lokusebenta lokukhishiwe. Umhlahlandlela wekwamukela libandla lolandzelako [umbhalo wekwamukela libandla](./twilio-byok-onboarding-draft) uluhlanganisa lulwati lwekusetfwa lolusaphakamiso kanye netibonelo letikhetsa libandla.
:::

## Indlela lebekwe yona

Engeza i-Twilio kuhlelo lwabahlinzeki bemilayezo lwe-B1 lolukhona, usebentisa **i-akhawunti ye-Twilio lephethwe ngulibandla, tincwadzi tekuxhumana te-API, i-Messaging Service, kanye nenombolo yefoni lekwati kuthumela i-SMS**. Libandla libhalisa ngalo bunikeli bayo bemtsetfo kanye nekhampeni yemilayezo, likhokhela i-Twilio ngqo, ligcina kuvumelana kwabamukeli, futsi liphatsa kuvunyelwa ku-Twilio Console. I-ChurchApps inika lihlanganiso kanye nemagama.

Qala ngelinye lenkhoyisa yemilayezo, i-Messaging Service leyodvwa, kanye nemtfumi we-US local 10DLC longu-B1 nganyenye libandla. Sekela imilayezo yomuntfu ngamunye, yeliqembu, yemsebenti, kanye nekukhumbutsa kwekubhalisa ngetikhala letikhona te-B1. Inkhoyisa yekuqala lenhle ihlanganisa tintfo letitsite letinjengetinguquko temkhonto, tikhumbuso temcimbi, kanye nekuhleleka kwebasebenti labavolontiya, uma tonkhe letintfo tichazwe kulivumelwano lelibandla kanye nekhampeni levunyeleke. Imilayezo yekuthengisa noma yekukhangisa idzinga inhlolo lehlukile yelisamo kanye nekuvumelana; ungayingeni ngekutsi ingena ngekuthula kulenkhoyisa.

| Umsebenti | Libandla | B1 / ChurchApps |
|---|---|---|
| I-akhawunti ye-Twilio, kuhlawula, kanye nekuba ngumnikati wenombolo | Liyayibusa futsi liyilawule | Ayiliseti i-akhawunti yenkhundla, futsi ayithengisi emakhredithi |
| Libhizinisi, ikhampeni, kubhalisa kwenombolo | Ilandzelisa ulwati lolunembile lwelibandla; liphatsa kubuyekezwa kanye nekulungisa | Ichaza tidzingo letingenteka futsi ifundza lulwati lwekulungela lolutfolakalako |
| Likhasi lekubhalisa, tinqubomgomo, injongo yemilayezo | Liyashicilela futsi liyigcina | Inika tilawuli letihambisana netifomo, tibonelo, kanye netirekhodi tekuvumelana |
| Kufanela kwemamemba kanye nekuphatsa i-STOP | Iyabuyekeza bufakazi bekuvumelana futsi icela kuphendvulwa lokungasi nge-SMS | B1 iphoqelela kuvumelana, kukhishwa, kwemvume, kanye nama-webhook asayinwe |
| Kulethwa kanye nekusekela | Iyabona emaphutsa e-Twilio, kulungile kwe-akhawunti, kanye namaphendvulo langenako | Ikhombisa simo sekutfumela kanye nekulethwa ngaphandle kwekuthembisa kuvunyelwa |

Yeka kusekwa kwe-akhawunti yenkhundla ye-Twilio lephethwe yi-ChurchApps, ama-akhawunti langetulu, kuthenga kwenombolo, kutfumela kwetemtfumi ku-Trust Hub, kuhlawula, ibhokisi yemhlangano, i-MMS/WhatsApp, kutfumela kwemave lamanye emave, kanye nekubhalisa kwe-toll-free. I-toll-free liyindlela lehlukile yomtfumi lokuvunyelwe, hhayi indlela yekudlula kubhalisa. Lemingcele igcina kukhishwa kwekucala kuhambisana nemodeli yeB1 yekuletfwa komhlinzeki losiletsa ngaye.

## Umsebenti lobekhona kanye netinkinga letisele

Lokubonwe lalandzelako kuhlobene nemifanekiso yekhodi, hhayi kucabanga kutsi yini lesetjentiswa njengamanje:

| Ingcenye | Lokwentekako lokukhona | Umphumela |
|---|---|---|
| [Ilulwati lwabahlinzeki kanye nesivumelwano](https://github.com/ChurchApps/Packages/tree/68c93d610031d3ed56d3582055413e851c5cb2ee/texting/src) | I-`ITextingProvider` inetindlela tekutfumela kumuntfu munye kanye kubantfu abanyenti, kuhlola, emakhono langetulu wekubhalisa/wetiribhuthu, kanye ne-ID yemlayezo wemhlinzeki ekuphumeleni. Ayikho i-adaptha ye-Twilio elubhaliswe. | Engeza i-Twilio ku-`@churchapps/texting`; ayidzingi kudala bhalisi noma tibhalo letilawulwa ngumhlinzeki. |
| [Izilungiselelo zemilayezo](https://github.com/ChurchApps/B1Admin/blob/e33cc2386d96e2e3cb24e760d458a72b699c71c3/src/settings/components/TextingSettingsEdit.tsx) | I-Clearstream, i-Text In Church, kanye ne-Nalo kukhethwa; i-MinistryStuff ivalelwe ngetimphawu. Kuhlela kanye nekugcinwa kwemtfumi kutsatsekile ku-Nalo kuphela. | Engeza tindawo letibonakalako te-Twilio, kuhlolwa, kugcinwa kwemtfumi, kanye nemhlahlandlela wekwamukela. Ikhetho lodropdown lodvwa alwanele. |
| [Umlawuli](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/controllers/TextingController.ts) kanye [nesango lemodyuli](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/shared/modules/MessagingModuleGateway.ts) | Tincwadzi tekuxhumana itfolakala ngekubhalwa kwekhodi futsi itfihliwe; tintfumelo letenziwa ngesandla kanye ngekuzenta ihlangabeta umhlinzeki welibandla. Tintfumelo zeliqembu zisusa tinombolo letifanako tefoni. | Phinda usebentise lemendlo, futsi ugcine kugunyazwa lokukhona. Faka tinhlolo letintsha zekuvumelana/ekulungeleni kulendlela yakhona lenye yalenhlanganisela ukuze emasekethe angadlula. |
| [Umsizi we-STOP](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/helpers/SmsOptOutHelper.ts) | Ufunda `From`/`Body` lefana ne-Twilio, ufaka ngekuqinisekile ithokheni yelinki lelibandla, abeka `person.optedOut` futsi acime tikhumbuzo te-SMS. Lamanye emaphendvulo ayancitfwa. | Kuyindzawo lencono yekuqala, kodvwa ayisiwo i-webhook ephelele ye-Twilio. Engeza tisayinelo te-Twilio kanye nesimo sekubhalisa kwe-SMS lesimelelwe. |
| [Lisheme lemilayezo](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/tools/migrations/messaging/2026-04-03_initial_schema.ts) | Igcina `apiKey`, `apiSecret`, kanye ne-`fromNumber` lelinemakhasi langu-20; emarekhodi wekutfumela agcina impumelelo/iphutha lelisheshako, hhayi ema-ID wemhlinzeki noma simo lesiphelele sekulethwa. | Inombolo ye-E.164 ayilingani; i-Messaging Service SID lenemakhasi langu-34 idzinga lilinga layo. Engeza kugcinwa lokuhlala kwemilayezo/simo semhlinzeki. |
| [Likhasi lefomu lomphakathi](https://github.com/ChurchApps/B1App/blob/5ca19ee4ef947235b8ffba9fbb35af42d0dcb41d/src/app/%5BsdSlug%5D/%28public%29/%5BpageSlug%5D/%5Bid%5D/components/FormPage.tsx), [umenzi wefomu lelabelwako](https://github.com/ChurchApps/Packages/blob/68c93d610031d3ed56d3582055413e851c5cb2ee/apphelper/src/forms/components/QuestionEdit.tsx), kanye [nomlawuli wekutfumela lefomu](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/membership/controllers/FormSubmissionController.ts) | Kukhona lamafomu angenamikhawu kanye nemabhokisi lakhethwako langakhetfwa. Tincazelo ngumbhalo lolula. Kutfunyelwa kwefomu kugcina timphendvulo, kodvwa indlela yemilayezo ayinalo ikhodi yekuvumelana lechazwe yalenkhankaso. | Engeza silawuli sekuvumelana kwe-SMS lesimiselwe nemalinki emtfetfo lamaciniso, kanye nekuqoqwa kwebufakazi ngakusevha. Bhokisi lelingakhethwa kumbe ilungu leliqembu alikwazi kuvumela i-SMS ngekuzenta. |

Umbhalo wemtfolamphilo welibandla [lwelizalo lwemilayezo](../../b1-admin/settings/church-settings#texting) uphindze uchaze kutsi bendzawo yekukhishwa yamanje ayihlanganiswe nekubonakala kwelitfuba. Lokuhlanganiswa kuyinkinga yekukhishwa: kutsi kuphendvula START akufanele kuguquke kubonakala kwelitfuba ngalesikhatsi.

## Lidizayini lelisekelwe kanye nekugunyazwa

Sebentisa tinkhundla letitsite, letingeniswa ngekwehlukana kunekutsi ufake `fromNumber` noma uletse ulwati lolwakhiwe ku-API-key string:

| Inkhundla | Injongo lehlosiwe |
|---|---|
| `accountSid` | I-akhawunti lephethwe yilibandla/i-ID yeprojekthi ye-Twilio (`AC…`) |
| `apiKey`, `apiSecret` | I-API Key SID ye-Twilio lenikelwe (`SK…`) kanye nemfihlo yayo kulokuphumayo kwe-API; ifakwa ekhodini futsi itfihliwe |
| `webhookAuthToken` | I-Auth Token ye-akhawunti lesetjentiswa yi-Twilio SDK kuvikela tisayinelo letingenayo; ifakwa ekhodini futsi itfihliwe ngayo |
| `messagingServiceSid` | I-Messaging Service yelibandla (`MG…`, emanyeji langu-34) |
| `fromNumber` | Inombolo leyikhetsiwe lenkhona kwe-SMS ngefomethi ye-E.164, leqinisekiswe njengomtfumi kulolwakhiwo/kwelisevisi |
| Kumiswa kwenkhoyisa | I-ID lezinzile yenkhoyisa, ligama, tinhlobo letivunyelwe, ema-URL ekubhalisa/tinqubomgomo, kanye nenguqulo yesaziso |

I-Twilio [ikhetsa ema-API key ekugunyazweni kwe-REST](https://www.twilio.com/docs/iam/api-keys). Sebentisa tincwadzi letincane letihlolwe tekuvumelwa lesekela kutfumela kanye netihlolo letitfolakala tekumisa letifundza kuphela. I-Auth Token ye-akhawunti isadzingeka kutisayinelo tesuka [kuhlolwa kwesayinelo lejwayelekile lesebentisa i-Twilio](https://www.twilio.com/docs/usage/security). Chaza lomehluko kusikhatsi se-UI; i-API secret ayisiyo i-Auth Token ye-webhook. Gcina tincwadzi tekuxhumana kuphela esitoreni selisevisi lelisemva, hhayi emakhasini lomphakathi, ekuphenduleni kwefomu, ekucelweni kwekutfumela kwesiphequluli, noma etikhalweni letisekelo.

Libandla lidala futsi lilawule letinsita kuConsole. Sehlolo se-B1 lesenta kufanele kufundze kuphela ilisevisi lelimisiwe, labatfumi, kanye nelwati lwekubhalisa. Akufanele ithenge tinombolo, idale tikhampeni, iguqule tilungiselelo te-Twilio, noma itfumele umlayezo wetulo njengento lesenta ngakhoti. Nikeza senzo lesihlukile sekutfumela sivivinyo lesikhawulelwe kumamemba lavumelekile nalevumelanako.

Gcina tincwadzi tekuxhumana letifihliwe kuphela uma uhlela lomhlinzeki lolugciniwe lofanako. Kushintja ku-Twilio kudzinga tincwadzi tayo letimeme, futsi kusule tintfo letisetjentiswa yimhlinzeki letingumlandzelo; ungaphatsi ikhiye lelifihliwe le-Clearstream noma le-Nalo ekulungiseleleni kwe-Twilio.

Bekela tonkhe tilayisho/tibuyekezo kumtfu welibandla le-B1 lobhalisile. Bopha tilalelo netilungiselelo ku-syncing lelugciniwe nelisele lelihloselwe i-akhawunti/sevisi/mtfumi wa-Twilio, futsi ala kuvunyelwa lokuphindze kuncika kumabandla lalandzelanako. Kuphinde kubuyisela tincwadzi tekuxhumana kanye nekukhishwa kumhlinzeki kumele kuphungule kulungela futsi kulime tintfumelo letilindzele ngaphandle kwekusula kuvumelana noma imirekhodi yekulethwa lelandzelako.

## Kuvumelana nekukhishwa kwemtfu kudzingeka njengemsebenti wekukhishwa

Letsa emarekhodi ekubhalisa elibhondelwe ngefoni yalenkhoyisa ya-Twilio, kanye nemirekhodi lengeteliwe kuphela lekuvumelana/lekukhishwa. Lesihloko lesincane lesicabangwako yi: ID yelibandla, ID yenkhoyisa, lenombolo yefoni lelolekiwe, sinyatselo lesiphumelelako, ilungu lelivumetako lebhalwe ngalo kumbe nalo, kuvumelana lesivela kufomu/ID yekutfumelwa noma bufakazi lobuphendulwe ngaphandle, sikhatsi sesevha, umbhalo wesaziso/inguqulo, ema-URL emsebenti, ema-URL etinqubomgomo, kanye netimo tekuhoxa/kuphindza kuqala. Khawula kufinyeleleka kanye nekugcinwa ngaphansi kwenqubomgomo lekhona yekuvikela kwedatha yelibandla.

Sebentisa timo letifana ne-`unknown`, `pending`, `active`, ne-`suppressed`. Tinombolo letikhona tefoni, emaliti etiphatsekako, kuvakashelwa, kunikela, lilungu leliqembu, `person.optedOut = false`, ne-`allowSms` akusiso kuvumelana lokuhlosiwe kulenkhoyisa. Kungenisa kuvumelana lokubhalwe kufanele kube sinyatselo lesivunyelwe lesihlolwako lesine umthombo lobhaliwe; kufudulela akufanele kubhalise wonkhe umuntfu.

Ekuhambeni kwefomu lekucala lelisekelwe kuweb, sebentisa imodi lejwayelekile yefomu lomphakathi le-B1. Engeza umbuzo wekuvumelana kwe-SMS lomiselwe ngekucacile lotsala ungakhethiwe, usale ukhetsiwe ngeluhlobo, usale uchasiswe ngetinkhombandlela letibonakala, futsi uhlanganise nenkhoyisa lenye kanye nenkundla yefoni lehlangene. Hlola lokuhlanganisa ngakusevha futsi ukhombe kuphela lesaziso lesikhombisiwe lapho kugcinwa impendulo levumako. Ungatfoli kuvumelana emabhuzweni lamelela labo lobabhalwa ngetiketsi, kusebenta kwengcondvo lekwenta, noma kubhalisa kumsebenti. Vumela ukuxoxisana kwekuvumelana lokulinganako kuphela nasemva kwekutsi sinyatselo lesivumako lesisebenta ngekucacile futsi bufakazi bekugcinwa sekuhlolwe.

Lifomu lelingakhethiwe alikhiqizi kubhalisa futsi alikufanele lichithe kuvumelana kwelinye umuntfu losekhona. Bopha kuvumelana nenombolo yefoni lethunyeliwe; sebasebenti bangahlobanisa emaphrofayili lakhombisa kahle lapho kukhona kungacaci, kodvwa bangadzingi kuhlanganisa emakhaya. Inombolo lenguquko yefoni idzinga kuvumelana lakhona. Kumafomu langenamagama, sebentisa tikhetho tekuvimba, futsi yenta kucace kutsi kuhlolwa kwenkhundla yenombolo kumbe sinyatselo se-double opt-in siyadzingeka; ibhokisi lelikhetshiwe lodvwa alikhombisi kutsi ngubani lonelifoni. Uma kusetjentiswa kuqinisekiswa, shiya kubhalisa kusemkhatsini kuze kuphele, futsi uchaze lencenye yekuqinisekisa kumbhalo wekubhalisa.

Ye-Twilio, hlukanisa kukhishwa kwe-SMS kubonakala kwelitfuba. Lilungu lelidlulile lekukhishwa lelakhishwa ngekungafani libe ngumtfumelo wekukhishwa we-SMS; uma kukhona, uya kumsebenti wesiyalo. Ukuvumelana okusha lokucaciswe kulokubhalwa kungamisa kuvumelana kwe-SMS kuyeqinisa kuhlanganiswa kwesimo selitfuba. Gcina ukuziphatsa kwabahlinzeki labanye kuze kuhlolwe ngekwehlukana.

Ngekutfumela lokusebenta ngasinye, qinisekisa kutsi kuhlanganiswa kwelibandla kuyasebenta/kulungele, kunekuvumelana lokukhona kwenombolo lenye yefoni, kute kukhishwa kwesiphambano kwalenkhoyisa, futsi kuvunyelwa kwemtfumi lokukhona. Tikhumbuzo ngekwengeziwe zihlonipha i-`allowSms`, tikhetho temagugu, kanye nemahora ekuphumula. Hlola kabusha ngemuva kwekubeka emugceni, bona timfanelo tekuhlanganisa, uchazele kutsi tinombolo zifanele futsi ngucinisekile, kanye nekuhlanganisa ngefoni. STOP ivimba tonkhe tintfumelo lesevisini/enkhoyisweni, kubalwa netintfumelo letenziwa ngesandla kanye nemisebenti; futsi kufanele imbale wonkhe umuntfu lowabelana ngalenombolo yefoni.

Khombisa ukuvana kwelibandla kanye nemtfetfo we-STOP kahle kulendlela lehlanganyelwako yekutfumela ye-Twilio, bese ubona inani lemagama/semasegment lalandzelako e-SMS. Kwandziswa kwetinkhundla temagama kanye nekuphatfwa kwebude kufanele kugcine lezintfo; ungafinyi umtfetfo wekukhishwa ngekungati. Gcina tibonelo kanye nematemplate emikhumbuzo/emisebenti ehambisana.

## Tintfumelo ze-Twilio, tiphendvulo, kanye nesimo sekulethwa

Yenta `TwilioProvider.sendMessage` ngekuhamba ku-Messages API, nelisevisi lelikhetsiwe lemilayezo kanye nemtfumi. Buyisa i-SID yemlayezo wemhlinzeki kanye nemphumela lamukelwe/lathunyeliwe; kwemukelwa kwe-HTTP akusikho kulethwa kumtfolamphilo. Tintfumelo zeliqembu zisebentisa imiphumela yemuntfu ngamunye ngalandzelelo lwekufakwa.

Khawula kutfumela lokuhambisanako kubo **bobabili** `sendBulk` kanye netintfumelo tomuntfu ngamunye: liwebhu lamanje lenkhondlo yemasegment lishaya tintfumelo `sendMessage`. Gcina umsebenti wekutfumela kanye nemsebenti lotfolakalako lolungelelwako kumaliqembu langakwati kufaka esicelweni sesibonelo; sebentisa indlela yekusebenta lekhona yekusetfwa kwesevisi ngaphandle kwekufuna kutsi emabandla asebentise lenye sevisi. Phinda tizama emaphutsa lalindzelekile/lakhawulelwe ngemuva kwesikhatsi. Phatsa imiphumela lengatiwa njengemiphumela lengatiwa lekumele ihlolwe, hhayi umyalo wekuphindza kutfumela ngekungati futsi uvule ingozi yemilayezo lephindwe kanye nemalilo.

Hlela ema-URL ekutfumela lemabalo kanye nelembe lelibandla. Qinisekisa `X-Twilio-Signature` ngeSDK, ngelinki lelisemphini lelicoshiwe lelihlinzekwa ngaphandle, ngemaparamitha lefomu lekucala, kanye ne-Auth Token lehambisanako ye-akhawunti. I-URL lemfihlo yodvwa ayinele. Hlanganisa ema-callback nemirekhodi lelondolotjiwe yelibandla/ye-akhawunti/yemilayezo, phatsa tiphindvo kanye nema-callback lafika ngaphambi kwekutsi umphumela wekutfumela wentiwe, futsi uvimbele ticiko letindala kutsi tibhale ngaphezu kwesimo lesiphelele. Buyisa ikhodi lelitungu le-TwiML yesivumelwano lesingenako, kanye nemphendvulo lefanele yekuphumelela kumicimbi yesimo. [Kuvikelwa kwe-Twilio](https://www.twilio.com/docs/usage/security), [ama-callback wesimo](https://www.twilio.com/docs/messaging/guides/track-outbound-message-status)

Ncoma i-Messaging Service **Advanced Opt-Out**. I-Twilio iyanika ematemplate ekuqinisekisa ye-STOP/START/HELP; B1 idla imicimbi ye-`OptOutType` lefakazwako ngaphandle kwekutfumela kuqinisekiswa lokuphindwe. STOP irekhodi kukhishwa ngekushesha; START ibuyisela kuphela kuvumelana lokwatiwako kulenkhoyisa lefanako lechazwe, ngemicimbi lemisha yekuqalisa kabusha, futsi akufanele ivule ikhishwa kwemiyalezo lengehlanganyelwe noma ivule tikhetho tekukhumbutsa. HELP ayibhalisi muntfu. Imiyalezo lengenako lengentiwe lefanele ingasetjentiswa ngaphandle kwebhokisi yemilayezo ye-B1; emabandla kufanele abe nendlela lebhalwako yekuyibeka ngaphansi kwesimo se-Twilio. [Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

Gcina i-SID yemlayezo we-Twilio, kubotjwa kwe-akhawunti/sevisi, sikhatsi sekutfumela, simo sekugcina/likhodi lephutsa, kanye nesikhatsi sekuphendvula ngasemuva kwerekhodi lekutfumela. Kukhombisa lokulindzile/lekuthunyelwe, lekulethwe, lehlulekile, lekungalethwanga, kanye lokungatiwa kahle. Gcina sakhiwo lesikhona semphendvulo kubahlinzeki labanye, futsi uchaze kutsi ingabe tingeniso letihlanganisiwe titfumela kumbe ziletfwa.

## Kuhlola kulungela kanye nekuphathwa kwesimo

Veta tinqubo letehlukene tekutfumela kwesisekelo: tincwadzi tekuxhumana, ukubuyisela sevisi/mtfumi, kuhlolwa kwekukhishwa, kuhlolwa kwema-webhook, kanye nekuhlolwa kwekutfumela lokulethwe. Ungabonisi nemcondvo lomunye lowatiwako "ugunyazwe" kuphela ngenca yekutsi tincwadzi tekuxhumana tiyasebenta.

Ngetinombolo zemasiteshi lamabili ase-US, funda i-[Usa2p campaign resource](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) yesevisi, bese ufuna kutsi ikhampeni lelifanele libe `VERIFIED`. Ngakwehlukana, qinisekisa kutsi umtfumi lokhetsiwe ubhalelwe leyo sevisi futsi ubhalise kuphelele inombolo: ikhampeni levunyelwe ingasaba nenombolo lelinde. Lapho indlela yeAPI lesekelekako ingakhombisi lesiphawu lesidzingekako, khombisa **kuhlolwa kwe-Console ngesandla kuyadingeka** futsi urekhodi kuvumelwa kwelilunga lelibandla lelilawulako ngemhla njengalokunjalo; ungabhale kutsi kuqinisekiswe yi-API. Ticiko temabhaliso wenombolo zingaba ngumsebenti lolandzelako lolungelelwa emuva. [Tiphutsa tekubhalisa kwenombolo](https://www.twilio.com/docs/api/errors/30035), [Ticiko tekubhalisa kwe-A2P](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/event-streams-setup)

Dzinga tihlolo letitsite ngaphambi kwekuvumela tintfumelo; rekhoda kutsi kuhlolwa kwenziwa nini futsi kanjani, phelelisa tihlolo letidzala, futsi ume uma kukhona tincwadzi letihoxisiwe, tabatfumi lashintjiwe, kuhlulekwa kwekubhalisa, noma emaphutsa e-akhawunti lalandzelako. Kulethwa kwesivivinyo sekutfumela kuqinisekisa kuhamba lokuhlolwe, hhayi kuvunyelwa kwemasiteshi lamabili lamanene noma kuvumelana kwemamemba. Umbhalo lolandzelako losekelwe ucacisa tinhlolo tangaphambi kwekutfumela, tangaphambi kwekukhishwa, kanye netinhlolo tekusebenta letiqhubekako tekwamukela libandla.

## Ikhodi yetiresiphozidi kanye nekuhlelwa kwekukhishwa

[Umhlahlandlela wekwenyeta wenhlangano](https://github.com/ChurchApps/.github/blob/main/CONTRIBUTING.md) uyala tikhalo tetimfuneko te-B1 ku-ChurchAppsSupport, kanye nemakhophi wekusebentisa emarepositori lanawo. Sebentisa sikhalo sinye lesikhulu semsebenti, futsi uhlanganise tiphendvulo letigxilako nesikhalo lesikhulu:

1. **ChurchAppsSupport:** buyekeza lesi sidizayini kanye nalumbhalo wekwamukela lesihambisanako ngaphambi kwekwethula i-Twilio njengesici lesitfolakalako semsebenti.
2. **Packages:** engeza i-adaptha ye-Twilio, kumiswa lokucacile lokwabelwako/okusebenta, kanye nekwenta kwefomu lekuvumelana kwe-SMS lapho kwabelwana khona nge-B1Admin/B1App. Faka ushintjo lwetinguqulo (changesets) futsi ushicilele ngemsebenti lowajwayelekile wekukhishwa ngaphambi kwekubuyekeza labasebenti.
3. **Api:** engeza ukuguquka lokwengeziwe kwetisakhiwo tekugcina, kuvumelana/kukhishwa, kanye nemiphumela yekulethwa; kusebentisa kuqinisekiswa kwekumiswa, emasango wekutfumela lalabelanwako, kuqoqwa kwebufakazi bulefomu, kuphatfwa kwema-webhook, kanye nekugcinwa kwekutfumelwa kwemisebenti.
4. **B1Admin:** engeza kumiswa kwe-Twilio/UI yekulungela, kuphatfwa kwenkhoyisa/kuvumelana, kugcinwa kwemtfumi lolwazi lwemhlinzeki, kanye nekubika kwekulethwa lokulungile. Ungavunyeli kuchitwa kuvumelana kwe-SMS ngekuhlela kwemuntfu lojwayelekile.
5. **B1App:** hlola likhasi lomphakathi/lefomu kanye nemakhasi wemtfetfo wenkhoyisa ngekuhambisana nalawulo lolwabelwako, kubandzakanya bavakashi labangenamagama kanye labasebenta ngemiselo. Akudzingeki kuba ne-client ye-Twilio yesiphequluli lehlukile.
6. **ChurchAppsSupport:** emva kwekukhishwa, shintjela umbhalo wekwamukela ube ngumphilo wetilungiselelo/tiphepho letisekelwako, engeze tidzidzisi letitfutfukile, uyibophe kuTilungiselelo Tekutfumela, futsi uhlele kuhunyushwa.

Faka tigaba temasiko langaphambi kwekukhishwa nekubhaliswa kuqala kutsi tibe ngumlandzelo. Ngaphambi kwekukhishwa, tinye kutfumela kwekusetjentiswa kwemiyalo kanye nemacala kumele kuhlale kuhamba ngemuva kwetinsiza letibonelelwako.

Khetha ukukhishwa kwe-Twilio kunguchwepheshe lweluhlobo lwekuvula kumbusi lomncane lolungiseleleko; tinkhoyisa letikhona kufanele tiphindze tisebente. Ukubuyela emuva kuvala kutfumela kwe-Twilio futsi kuhoxisa imisebenti lengakatfumelwa kodvwa kugcine kukhishwa kwebufakazi; akufanele kushintja emagama ngekuzenta kumtfumi lohluke kumbe kuhlomelwa.

## Isilinganiso semzamo

Isilinganiso sekuhlela somsebenti lowatiwa ngumsebenzi lowatiwa kahle nemkhakha; akukasebentisi tincwadzi tekuphila kwekukhiqiza noma lamasevisi e-SMS kulesi silinganiso:

| Umsebenti | Kusebenta kwemalanga |
|---|---|
| Adaptha, kwandziswa kwekumiswa/sakhiwo, kwetiwebhu tetilungiselelo | 2–3 |
| Kuvumelana komuntfu/nenkhoyisa, kukhishwa kwemtfumi, tisangelo tekutfumela letilabelwanako, kuhlanganiswa kwefomu lomphakathi | 3–5 |
| Ema-callback lasayiniwe, kugcinwa kwekulethwa, kutfumela lokubekiwe nelugcinwako | 2–3 |
| UI yekulungela, umhlahlandlela welibandla, kuhlolwa kwekuhlanganiswa nekubuyela emuva, kulungiswa kwelivivinyo | 3–4 |
| **Kukhishwa lokunconywa** | **10–15 kubo bonkhe** |

Adaptha/ikhonsepthi lelula lemasiko lalula ngaphandle kwemisebenti lemincane yemalanga 1–2. Kulinganisa kutfumela kwemtfumi kwedvwa kuhlanganisa umsebenti wekuvumelana nemtfetfo wekwamukela lolidzingekako kulesi siphakamiso. Sikhatsi sekubuyekeza kwe-Twilio/mhlinzeki wetemtfetfo ngaphandle kwalesi sikhatsi, futsi asikho lelandzelako lelungiswa ngaso; iphrojekthi akufanele ithembise lusuku lekuvunyelwa noma umphumela wekuvunyelwa.

## Tinkhombandlela tekwemukela

- [ ] Libandla liyasibusa futsi likhokhela i-akhawunti, insita, mtfumi lobhalisiwe, kanye nekampeni; alidzingi i-akhawunti ye-Twilio lelawulwa yi-ChurchApps.
- [ ] Tincwadzi tekuxhumana zifihliwe, zigunyazwe ngekubhalwa kwekhodi, zingashintjwa, futsi azikho kumalogi/ekuqukeni lokubonakalako emphakathini.
- [ ] Kuvumelana lokungakhethiwe, lokungakhethiwe lokuphathelene nemabhokisi lakhombisa emalinki lamaciniso etinqubomgomo futsi kugcina bufakazi bekhombo lweprogremu/lwenombolo/lwesaziso ngakusevha; kwala kuvuma lokuphindze kwenta sinyatselo lesiyinhloko selifomu.
- [ ] Tonkhe tindlela temanual, leliqembu, lemasegmenti, lemsebenti, kanye nelemikhumbuzo tisebentisa ligeyithi lefanako lekuvumela le-Twilio. Bamukeli labangaziwa, labangavumelanga, labashintjile inombolo yefoni, kumbe labaphoqwe bayasikhwelwa ngesizathu lesisebenta; kuveta kubonisa umhlangano lolusebenta/lesaziso se-STOP ngemuva kwekukhulisa lokudzingekako kanye nekuphatfwa kwebude.
- [ ] Kukhishwa kwelifalo kwemalunga lemtfetfo akufaki bamukeli; i-STOP/START ayiguquli kubonakala kwelitfuba noma tinkhetho lezingehlanganyelwe. Tindzawo letabelana ngenombolo yefoni kanye netimo temabandla lamanyenti tiyahlolwa.
- [ ] Tisayinelo letisayiniwe ze-STOP/START/HELP, tisayinelo letingasebenti, tinkhundla temasevisi lalunga, tisehlo letiphindwe, kutfunyelwa kwefomu lelikhasiwe ngekuphindza, kanye nemakhephu wekuvumelana lakhohlisa ayahlolwa.
- [ ] Kubukeka kwemabandla leliqembu, emasikhatsi lakhawulelwe, emikhawulo yemazinga, kwehluleka lokungenelelwa, emiphumela lengatiwa kahle, kuncintisana kwema-callback, kanye nemicimbi yekulethwa lengalandzeli luhlelo ayahlolwa ngaphandle kwekutfumela lokuphindwe.
- [ ] Ukuvunyelwa kwekampeni kanye nekubhalisa kwenombolo lokuphelele kwehlukene nekuqinisekiswa kwetincwadzi. Bufakazi bekusebentisa ngesandla lubhalwa ngekucacile; ukungakhoni lokuvuthiwe kanye nekungaphindzi kwekulungela kuvimbela tintfumelo.
- [ ] Lilungu lelibandla lelihlolako lihlola likhasi lalo lekubhalisa, tindlela tefomu lelivunyeliwe kanye lelinqatshiwe, emalinki wetinqubomgomo lamaciniso, kanye nemamemba lelivumelako lelivivinyo kusukela kutfunyelwa kwefomu, kulethwa, kukhishwa kwe-STOP, kanye nekubhalisa kabusha lokuvunyelwako.
- [ ] Tinhlelo letikhona te-Clearstream, i-Text In Church, kanye ne-Nalo kanye nekutfumela kwemilayezo kuhlola kubuyela emuva ngempumelelo; umbhalo wesisito uhlukanisa tiphakamiso kusuka kutici letikhishiwe.
