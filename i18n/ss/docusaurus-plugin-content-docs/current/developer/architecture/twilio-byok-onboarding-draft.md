---
title: "Ukungenisa Ibandla ku-Twilio (Umdrafthi)"
description: "Umdrafthi wekusetwa kwe-Twilio lenginiwe ibandla kanye ne-B1, umyalo wekubhalisa emphakatsini, tibonelo tekhampeni, kanye nemalunga wekugunyaza."
---

# Umdrafthi wekungenisa ibandla ku-Twilio

:::caution Umdrafthi wekuhlanganiswa lokuhlongozwako
Lena yindlela yekusebenta lehlongozwako. Njengamanje i-B1 inesinketulo lesisekelwe se-**Twilio** ngaphansi kwe-**Settings > Texting** (i-Account SID, i-Auth Token, i-From Number, kanye ne-webhook yekucela lokuphumelela kwe-STOP) -- bona [Church Settings: Texting](../../b1-admin/settings/church-settings.md#texting). Tilawuli letengeziwe te-B1 letisetelwako, kumapha kwemvume, kanye netinyatselo tekuhlola lesitichazwe ngaphansi kulapha tiyimfuneko yekukhishwa lokutawuza, hhayi imiyalo yekutfola tilungiselelo letikhona. Funda [sicelo lesibhalwe ngemayelana netekhinoloji](./twilio-byok-proposal) mayelana nelubanti kanye nalokuncike kukho. Imitfombo ye-Twilio yahlolwa ngomhla ka-22 Mfumfu 2026; hlola timfuneko tamanje ngaphambi kwekutfumela ikhampeni.
:::

## Indlela lenconywa

Ibandla lakho linemali ku-akhawunti yalo lekhokhelwako ye-Twilio, nenombolo yefoni, i-Messaging Service, kukhokha, kanye nekubhalisa kwekhampeni. I-B1 ingatfumela ngaletinsita letitfolakala ngetikhatsatfo letingenwa ngasese etilungiselelweni tebandla. Gcina kungenani bantfu labahlanu labaphatsiwe bebandla labatfola i-akhawunti ye-Twilio, uvule ukuvikelwa kwe-akhawunti, uphinde ubeke umuntu lobhekele kugunyaza, imiyalezo lengenako, kanye nemilayeto yekwenqaba.

Umkhicito wekuqala lowetfulwa lapha ufaka inombolo yendawo ye-US ye-SMS kanye nalohlelo lolucacile lwemilayeto yebandla. Tibonelo letilandzelako titsatsa ibandla lelimbiwa i-**Grace Community Church** nalohlelo **Grace Church Updates** lwetinguquko tetinsita, tesikhumbuzo setimcimbi, kanye nekuhleleka kwebasebenti labazinikele. Tshintja yonkhe imibito, timphathelo, kanye nalokufanele lesikhatsatfo, nalokusebenta kwalo lokufanele bebandla. Latsi tibonelo letibhekene nebandla letitsatsa Twilio kuyo imitsetfo, hhayi kukhishwa kwekhampeni lelivunyiwe kumbe kwetsembiso yekuvunyelwa.

## 1. Lungiselela ukusebenta lomphakatsi kwe-B1

Shicilela ikhasi lelifana ne-`https://www.example.org/text-updates` kuwebhusayithi yebandla ye-B1, ngalokufakiwe ifomu lomphakatsi le-B1 noma sixhumanisi lesicacile lelisikhatsatfo lelisimeme. Shicilela futsi i-`https://www.example.org/privacy` ne-`https://www.example.org/sms-terms`. Lawo mandla angumbhalo wesikhundla; faka ema-URL langempela lafinyeleleka.

Kufomu lelihlongozwako lekubhalisa nge-SMS:

| Lisetelo | Lilungiselelo lelinconywa |
|---|---|
| Kufinyeleleka | Losemphakatsini/lokungavinjelwa; lisebenta ngesikhatsi sekuhlolwa nesekubhalisa lokuqhubekako; litfolakala ngaphandle kwekungena |
| Simo sefomu | Simo lelijwayelekile ekucaleni; simo lesifanako nekuxoxisana lidzinga kwemvume lecacile lechazwe kusicelo sobuchwepheshe |
| Iselula | Icacisiwe ngekhodi yelive; idzingeka kuphela uma kukhetfwa kubhalisa nge-SMS uma isetjentiswa ngaphakathi kwefomu lelivamile lekuxhumana/somcimbi |
| Sinqumo se-SMS | Ibhokisi lelihlukile lelikhetfwako, lingakakhethwa ngekusobala, lihlanganiswe nalohlelo lolucacile kanye nensimu yefoni |
| Tibhalwa temcondvo | Lelivakashi lingasiletsa likhadi lekuxhumana, libhalise kumcimbi, noma licele lwati ngaphandle kwekuvuma i-SMS |
| Bufakazi | Gcina lohlelo, lenombolo yefoni lenembile, imvume lekhetfwe, lesicelo lesitfunyelwe, sikhatsi sesevha, kanye nenguquko yesatfumelo/yemcondvo; umbuzo wefomu wajwayelekile wodvwa awubhalisi umuntu njengamanje |
| Kuzenzakalela kwebantfu/leliqembu | Gcina kucishe kukhishwe kukhicito lelizenzakalelako lekudalwa kwebantfu/kubelwa kweliqembu ekucaleni kwekuhlolwa kwesicelo lesikhatsatfo, ngaphandle kwekubukwa ngekumelene nemithetfo yekufanisa yebandla. Kubelwa kweliqembu akusiyo imvume ye-SMS |
| Tindlela letikhona temcondvo | Ungabhalisi bonkhe labacela fomu noma emalunga eliqembu kulinkhambo lemilayeto yemilayezo lenkhulu. Imvume lehlolwe lehlanganiswe kuphela ingagunyaza lolohlelo |
| Umlayeto wekubonga | Qinisekisa kutsi fomu litfolakele ngaphandle kwekutsi kutfolakale kubhalisa nge-SMS lapho libhokisi lilenqabile noma kucinisekisa kulindzele kubukwa |

Ifomu lelikhona lelinesinketulo lingatsi sibonelo sefomu, kodvwa i-B1 idzinga ledgeria yemvume kanye nemigidvi yekutfumela. Umenzi wekubonisa lolwabelwako wetinhlobo ukhombisa tincazelo njengetemtfwalo lolulula; kubhala i-Markdown noma i-URL kuleyo ndzawo akwanele kutsi kutiqinisekisa kutsi tixhumanisi temcondvo tiyacofa. Kufanele kusetfulwe sinketulo semvume lesifinyeleleka lesinetixhumanisi langempela. Bona [kwakha mafomu e-B1](../../b1-admin/forms/creating-forms) kanye ne-[sicelo sobuchwepheshe](./twilio-byok-proposal#consent-and-suppression-are-required-release-work).

I-Twilio idzinga imvume lenikelwa ngekuzimela lelungumbhalo lobonakalako. Ungahlanganisi i-SMS nemimandla lenhlanganyelo yebulungu, nemvume ye-imeyili/yefoni, nemvume yekunikela, noma nekubhalisa kumcimbi. Inombolo yefoni ekhadini lelivakashi ayisiyo imvume ye-SMS ngayo yayo. Bona [timfuneko temvume lenikelwa ngekuzimela](https://www.twilio.com/docs/api/errors/30923) ne[tincomo tekhampeni](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations) ye-Twilio.

### Umbhalo wetibonelo wekubhalisa

Sebentisa lokuyo kuphela ngemuva kwekutsi ibandla likhetse tinjongo letiyinene, umthumi, kanye nekutfumela. Libhokisi liyinketulo lekukhetfwa, lingakakhethwa ekucaleni; emagama emitsetfo langaphansi kufanele abe tixhumanisi lesikhombiswa kufomu.

> Yebo, ngifuna i-Grace Community Church itfumele i-SMS kimi nge-Grace Church Updates ngetinguquko tetinsita, timcimbi tebandla, kanye netikhatsatfo tebasebenti labazinikele kusuka ku-[inombolo lebhalisiwe yebandla]. Lindzela imiyalezo lengafika ku-4 ngenyanga. Ticashwe temilayezo tekukhokha tingasebenta. Bhala i-STOP ukuze ungakhiphi ngekwakho noma i-HELP ngosito. Kubhalisa nge-SMS akudzingekile kutsi ufike, ubhalise, noma unikele. Bona i-Privacy Policy yethu ne-SMS Terms. Imibuto: [imphilo yebandla yekusekela i-imeyili noma inombolo yefoni].

"Ku-4" ngumbono wetsembiso wetibonelo, hhayi umkhawulo lobekwe yi-Twilio. Yishintje ibe yimvelo lebandla lingayihlonipha ngempela; uma imvelo ishintjana, tshengisa loku ngekwetsembeka, uchaze lenkhatsatfo leyilindzelwako. Gcina tikhangiso letimayelana nekukhulula noma tinhlelo letengeziwe tebuvangeli ngaphandle kwalelibhokisi, ngaphandle kwekutsi tinjongo netimvume tabo sewuzihlolile ngekwehlukile.

Kufomu lelijwayelekile lesendzaweni/somcimbi, kutfumela ngalelibhokisi lingakahlolwa kufanele kuphumelele. Kufomu le-SMS kuphela lingachaza kutsi kuhlolwa kwalelibhokisi kucela kubhalisa, kodvwa lokungenakuba khona kufanele kungasimi tinsita letingakabandlululwa ngekubhalisa. Qinisekisa kusebenta kwangempela kumakhompyutha lamabhayisikili kanye netifoni.

### Umbhalo wemigomo lekufanele uyilungiselele

Ikhasi lemfihlo yebandla kufanele lichaze kutsi lingabhalela ilwati yini letinhlobonhlobo yetemilayezo, kanye nekutsi liyisebentisa kanjani futsi likhuseleke kanjani, kanye nemigomo yekugcina/yekuxhumana. Kufanele libhale ngekucacile kutsi tinombolo tewolwati kanye nemvume yemilayezo akutfengwa noma kwabelwana ngato nebantfu besibili kumbe lamaphatsi kuze batfole ukukhangisa kwabo. Chaza ngekulunga kucubunga kwelive lelidzingekako lebandla lekuhlinzeka ngelive; ungachazi kutsi bandla alisebentisi live ngesikhatsi lisebentisa i-B1 ne-Twilio. Imitsetfo ye-Twilio ye[mtsetfo wemfihlo](https://www.twilio.com/docs/api/errors/30908) kanye ne[tincomo tekhampeni](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations) yisisekelo selokuhlukanisa lokukhulu.

Imimandla ye-SMS kufanele ichaze ibandla kanye nalohlelo, tinjongo, sikhatsi lesitfumelwa ngaso langempela, tindleko letingaba khona temilayezo, imiyalo ye-STOP/HELP, kuxhumana kwekusekela, kanye nesixhumanisi selwati lwemfihlo; lifake nanoma yiphi imitfombo letengeziwe leyecelwe kuhlolwa lokwenta ye-Twilio lokusetfulwako. Lingana kahle temasixhumanisi emitsetfo lakule-opt-in nama-URL lasetfulwe ekhampeni. Kusukela ngomhla wa-30 Mfumfu 2026, i-Twilio idzinga ema-URL emfihlo lomphakatsi nalemigomo kulokubhalisa okusha kwe-API ye-campaign; nayo i-Console yayo iyawaqoqa. [Imfuneko ye-Twilio](https://www.twilio.com/en-us/changelog/a2p-10dlc-campaign-registration-will-require-privacy-policy-and-)

Lokhu kuyimfuneko yemkhatsi lekufanele isetfwe kumigomo yebandla langempela, hhayi kutsatfwa kwemigomo yemfihlo lekhona noma umtsetfo lovamile lowetfulwa ngaphandle kwekuhlolwa.

## 2. Bhalisa ibandla kanye nalohlelo lalo lwemilayezo ku-Twilio

1. Dala noma usebentise **i-akhawunti lekhokhelwako lenikwe ibandla** kanye nenombolo yendawo ye-US lenkhona ye-SMS. Sebentisa ligama lemtsetfo lebandla, i-EIN/lwati lwebhizinisi, ikheli, iwebhusayithi, kanye nemuntu lomcinisekisako ngekulinganako. Ungafaki lwati lwe-ChurchApps noma lwebanye bebandla.
2. Landzela inkhambo yekubhalisa kwe-Brand lelisebentisa ikhasimende le-Twilio lelitfolakala etandleni ekubhalisweni kwebandla lenhlangano yalo langempela. Ngemtfolamphilo lolamukelekako lolungakabi nemvume, sebentisa [umtfolamphilo wekubhalisa emtfolamphilweni](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/onboarding-for-government-and-non-profit-agencies). Kusebentisa kwebandla lenhlangano lengenamvelo/501(c)(3) kuncike ekutsi liyafaneleka; ligama lebandla lodvwa aliqinisekisi kuvunyelwa noma kukhululwa kwe-Twilio.
3. Dala i-Messaging Service lekhethekile bese ufaka i-campaign ye-A2P 10DLC lefanele. Khetsa imvelo lesebenta ngekwetiniwe kulemiyalezo langempela nemikhetsho letfolakala kulowo ma-Brand lavunyiwe; tibonelo lapha atikhombisi kodi yemvelo yebandla yemihlaba wonkhe.
4. Nikela ngesicelo sekubhalisa lomphakatsi, ema-URL emigomo, incazelo yekugunyaza yonkhe kanye nekutfumela, kanye netibonelo temilayezo lecelwako. Faka wonkhe emitfombo lelivela lekubhalisa; setsa tencazelo tekuvela kwemtselelo/inombolo yefoni kute tifanane nemuntfu langempela. Ungakhombisi kubhalisa ngemagama langukhiyela noma ukugunyaza kabili uma lenkhambo ingakakhoni futsi ingakahlolwa.
5. Hlanganisa inombolo yekutfumela nesevisi kanye ne-campaign levunyiwe. Linda kutsi kuhlolwe i-campaign **kanye nekuphelisa kubhalisa kwenombolo** ngaphambi kwekutfumela.

Gcina lamanyatselo ku-Twilio Console yebandla. Lusetelo lwe-B1 lolucelwako alufaki kubhalisa tebandla. Imibhalo ye-Twilio ye[quickstart yekubhalisa](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/quickstart) ne[sisetfo se-campaign](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) ichaza tinkhundla tekubhalisa kanye nesimo. Inombolo lelindzele ingasasiphatsa ukutfumela ngemuva kwekuvunyelwa kwe-campaign. [Kubhalisa kwenombolo](https://www.twilio.com/docs/api/errors/30035)

### Umbhalo wetibonelo wekuchaza i-campaign

> I-Grace Community Church isebentisa i-Grace Church Updates kutfumela tinguquko tetinsita tesikhatsi sekukhonta, tesikhumbuzo setimcimbi tebandla, kanye nemiyalo yekuhleleka kwebasebenti labazinikele kubantfu labakhetha lolohlelo ewebhusayithi yethu lomphakatsi yebandla. Asitfumeli imiyalezo leyenga ku-4 ngenyanga ngaphansi kwalolohlelo. Bantfu labatfolako bangayeka lemiyalezo noma nini. Lolohlelo alufaki tinsita letithengiwe, tikhangiso temphakatsi lesitsatfwe, noma tifiso tetimali.

Lesibonelo sifanele kuphela ibandla lelilandzela ngempela lemikhawulo netibambeko. Uma sikhumbuzo sebasebenti sodvwa sedlula inkhatsatfo lesetsembisiwe, shintja kuklama kwelohlelo nesaziso ngaphambi kwekuphakamisa.

### Umbhalo wetibonelo wekuhamba kwemilayezo

> Tivakashi tivula [i-URL yangempela yesicelo sebandla], tifake inombolo yefoni yayo yeselula, futsi tikhetse ngekuzimela libhokisi lelikhetfwako le-Grace Church Updates. Ilibhokisi lingakakhethwa lapho ifomu livulwa. Sisaziso sitsi i-Grace Community Church, sichaza tinguquko tetinsita, tesikhumbuzo setimcimbi, kanye nemiyalo yebasebenti labazinikele, sinika umkhawulo wenyanga kanye nemali lengaba khona, futsi sichaza i-STOP ne-HELP. Ilwati lwemfihlo le-Privacy Policy ne-SMS Terms letikhombisiwe liyasebenta ku-[i-URL yangempela yemfihlo] ne-[i-URL yangempela yemigomo ye-SMS]. Kwenqaba i-SMS akuvimbi kufika, kubhalisa emcimbini, kunikela, noma kusebentisa lifomu lelivamile lekuxhumana. I-B1 ilondvolota kukhetfwa lokuvumelana, inombolo yefoni, sikhatsi sekutfumela, kanye nenguquko yesaziso. Sitfumela lolohlelo kuphela kubhalisi labarekhodiwe, futsi sicinisa ukuphumela ngaphambi kwekutfumela lokuchubeka.

Tishintje lesigaba kuze sifanane nalokusebenta lokufakiwe. Uma kuvakashelwa ngelucingo lwefoni noma kuhlolwa ngebasebenti, chaza simo lesilindzele kanye nesinyatselo lesinemandla sekuvula. Uma kusetjentiswa tindlela letinyenti, fake yonkhe futsi uchaze bufakazi bayo. Uma kubhalisa kungenwa ngelogini noma kwenta ngelikhalikhalwa lelibhaliwe, i-Twilio icela bufakazi lobubonakala kumuntfu lodvwa lolubonisa umtfombo wangempela wemvume ye-opt-in; ungalitfoli lifomu lelisekeliwe noma tilwati tetelungu. [Umyalo wemvume lobonakalako](https://www.twilio.com/docs/api/errors/30923)

### Tilaleli letiphumako letibhalwako

Lezi ngetibonelo letingumfanekiso lolungiswa; sebentisa ema-URL langempela ebandla bese ushintja tinkhulumo letiboshwe ngemabhulaketi ngaphambi kwekutfumela. Sisekelo sebuchwepheshe se-Twilio sitsembela ku-2 kuya ku-5 emasampula. Emasampula kufanele amise ibandla, akhombise injongo lebhalisiwe, futsi afake umyalo wekuphuma. [Tinkhundla temasampula e-campaign](https://www.twilio.com/docs/messaging/api/usapptoperson-resource)

```text
Grace Community Church: Sisebenti sekukhonta sitawuqala nge-[sikhatsi] ngenca ye-[sizatfu]. Imininingwane: [i-URL yewebhusayithi yebandla]. Phendvula ngeSTOP ukuze uyeke letilaleli.
```

```text
Grace Community Church: Sikhumbuzo sekutsi [umcimbi webandla] ungo-[lusuku] nga-[sikhatsi]. Lwati: [i-URL yemcimbi webandla]. Phendvula ngeSTOP ukuze uyeke letilaleli.
```

```text
Grace Community Church: Uhleleke kutsi usebente ku-[liqembu] ngalolusuku [lusuku]. Sicela ubuke luhlelo lwakho: [i-URL yeportal yebandla ye-B1]. Phendvula ngeSTOP ukuze uyeke letilaleli.
```

Ema-URL lase-bhalo emabhulaketi acoka timphendvulo letisebentisako; emasampula lehlolwako kufanele akhombise sidvwaba sebandla langempela kanye nalendlela yesixhumanisi lesetjentiswako. Sixhumanisi selucwaningo lolusemtfwalweni lingadzinga kungena ngelogini, kodvwa ikhasi lekubhalisa nemigomo lesetjentiswa kuhlola kufanele kubonakale emphakatsini. Ungafaki tincwadzi letimangalisako, tingane, noma tincazelo letibonakala tebantfu ekumemetweni kwesampula. Gcina lokuqukatiwe kwesampula kuhambisana nalokutfunyelwa ngempela tithempulethi te-B1; ungetsembisi inkhomba ye-inbox yekuphendvula noma inkhatsatfo yesikhumbuzo lengatfolakali.

### Tinyatselo te-STOP, START, ne-HELP

Sebentisa i-Twilio Messaging Service Advanced Opt-Out ngaletintfo letiqinisekisako, bese ulungisa sidvwaba/lwati lwebandla lolohlelo kanye nemininingwane yekusekela. Sibonelo sekhambo lekuphendvula:

- **STOP:** Qinisekisa kutsi i-Grace Church Updates iyeke, futsi uchaze indlela lesekelekako yekuphindzela.
- **START:** Qinisekisa kuphindzela kwalolohlelo lofanako, kuhlanganisa sidvwaba salo, sikhatsi/tindleko, kanye nemiyalo ye-help/stop njengoba idzingeka ngalokusetjentiswa lokumisiwe.
- **HELP:** Chaza i-Grace Community Church futsi unike lolwati lwangempela lwekusekela nemiyalo yekuphuma.

Ungatfumeli sicinisekiso sesibili se-B1 uma i-Twilio sekuphendvulile. Umyalezo we-HELP awusiyo ukubhalisa. START kufanele ingakubhalisi emalohlelo lengetiwe ebandla noma iyembulele kukhathalogu yelilunga. [Twilio Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

## 3. Hlola iphakethe lekuvunywa ngaphambi kwekuphakanyiswa

- [ ] Lwati lwesimo selebandla lwangempela, lwemtfombo lwewebhusayithi, kanye nenjongo ye-campaign kuyavumelana.
- [ ] Ikhasi lesicelo kanye nefomu lelisebentako kuvulwa ngaphandle kwelogini ku-browser lelisemfihlweni, kuhlanganisa nakusidzivalo selucingo.
- [ ] Libhokisi le-SMS liqala lingakakhethwa futsi lingalenqatjwa lapho kuphela sisebentisi sekuvakashela/somcimbi lesikhulu.
- [ ] Injongo yelohlelo, umthumi, sikhatsi sekutfumela langempela, tindleko letingaba khona, STOP, HELP, kuxhumana kwekusekela, kanye nemalunga wemigomo lencitwakalo lilungisiwe ngakulembo lolunemvume le-SMS.
- [ ] Ema-URL emfihlo/wetemigomo langempela lanikelwe ku-Twilio afinyeleleka emphakatsini, asebenta ngaphandle kwetifakazelo, futsi acacisa lebandla/lolohlelo lofanako. Lokuqukatiwe kwemigomo kuvumelana nekucubungulwa langempela.
- [ ] Lilungu ngalinye lesampula lifanana nalohlelo, nemumo womthumi langempela, kanye nekwenta kwesixhumanisi/inombolo yefoni lelicabangwako. I-campaign ichaza yonkhe indlela yangempela yekuvuma.
- [ ] Tisithombe letikhombisa lifomu lelingenalutfo, libhokisi/tincazelo, kanye nemalunga wemigomo njengoba bobabhalisi bayobona. Bufakazi alubandzakanyi tirekhodi tetilunga noma tikhiye.
- [ ] Ibandla linendlela lesebenta yekugcina bufakazi bemvume kanye nekuhlonipha kuhoxa ngaphambi kwekutfumela, kuhlanganisa ticelo letfolwe ngelucingo noma nge-imeyili.

Lezi tihlolo tinciphisa kungafani lokungadzingeki; i-Twilio kanye nebalingani bayo bekubuyekeza bayenta sinqumo sekuvumelana. Gcina ikhasi lesicelo langempela nema-URL emigomo atfolakala ngemuva kwekuvunywa, hhayi kuphela ngesikhatsi sekubukwa.

## 4. Xhuma futsi uhlole kuhlanganiswa kwe-B1 lokutawuza

Ngemuva kwekukhishwa kwekuhlanganiswa, kusetfwa kwe-Texting lokuhlongozwako kufanele kutfole i-Account SID yebandla, i-API Key SID/secret lekhethekile, i-Auth Token lehlukile yewebhook, i-Messaging Service SID, kanye nemthumi lokhetfwe. Dala tikhiye kuphela ku-Console yebandla, futsi ufake tifihlo kuphela kulilungiselelo lebucayi le-B1. [Umyalo we-Twilio API key](https://www.twilio.com/docs/iam/api-keys)

Kopisha ema-URL ewebhook yangemphakatsi kanye nalawo wesimo sekuhamba lanikelwa yi-B1 uwafake ekulungiselelweni lokufanako le-Twilio. Vula i-Advanced Opt-Out futsi uhlole kutsi imiyalezo lengenako ifika ku-webhook lelungiselelwe. I-B1 kufanele ikhombise kuhlola lokwehlukene kwetitifiketi, kwemnikati wesevisi/womthumi, i-campaign lenkhona, kubhalisa kwenombolo lokuphelile, kuhlolwa kwemiyalezo lengenako, kanye nelivivinyo lelilethwe. Ikhredenshiyali lelonguliwe noma sicelo se-API lesemukelwe akusiyo lokugcina kulethwe.

Uma i-B1 ingakwazi kuhlola ngekhompyutha sisignali sekubhalisa, qinisekisa ngekuhlola kwe-Console ngqo; i-UI kufanele ibhale ngemumo wesikhatsi lebhalwe ngalokusho kutsi ubhalisela wahlola ngesandla. Hlisa simo lelilindzele/lehlulekile ngaphambi kwekuvula imilayezo yekukhicita. Sebentisa livivinyo lelihlukile lelicelwe ngekucacile kumuntfu lomdzala lovumelana lovivinya, bese:

1. Qinisekisa kutsi sibhalisi lesifanako lesibhalwe ngalo sidala irekhodi lelifanele lemvume yefoni/lohlelo; kwenqaba noma kushintja kwefoni akufanele kubhalise umuntu ngekuthula.
2. Tfumela livivinyo linye, qinisekisa kutfolwa, bese uqhathanisa simo se-B1 ne-Twilio Message SID nemphumelo wekulethwa.
3. Phendvula ngeSTOP futsi uhlole kutsi tilaleli letitfumelwa ngesandla, letiqembu, tinhlelo tekusebenta, kanye netikhumbuzo tiyayeqa lenombolo. Kubonakala kwe-directory akufanele kushintje.
4. Sebenta inkhambo yekubhalisa kabusha lencitwe ngalolohlelo lofanako kanye nemphendvulo ye-HELP; hlola kutsi kute tisiqinisekiso letiphindzaniswako kanye nekushintja lokungafuneki kwetikhetho letingahlobene.

## 5. Gcina lolohlelo

Mkhetse umnikati webandla lobhekele imiso ye-campaign/akhawunti, tisexwayiso temalilo nekukhokha, kwehluleka kwemilayezo, kanye nemiphendvulo lengenako ku-Twilio. I-B1 lokukhishwa kwayo lekuqala lolucelwako alinabo bokuxoxa nge-SMS, ngako gcina futsi uhlole lusito lwekusekela lwangempela kanye nekuhlola kuphendvula, hhayi kucabanga kutsi bebasebenti babona kuphendvula kuB1.

Gcina umlandvo wemvume kanye nekuphuma, tinguquko letikhona tesaziso/temigomo, tinkomba te-campaign, kanye nebufakazi lobuchemiwe lobuhlolwako, etirekhodini lelilawulwa libandla. Ungalinamatsi tifihlo noma tinhlu tebamukeli etitikhalweni letisemphakatsini. Nakushintjwa kwenombolo, sevisi, ikhredenshiyali, ifomu lesicelo, inkhatsatfo, noma injongo, hlola kuhlanganiswa futsi uvuselele kubhalisa/imvume lapho kudzingeka ngaphambi kwekuqalisa kabusha. Hlola ngetinkhathalelo netinombolo letabelwana ngato emndenini kanye netinombolo letishintjiwe; kufanelekela kuncike kufoni lelivumelako nakulohlelo, hhayi kurekhodi lelilulumo lelilungu lelinye ngalinye lemndeni.

Ngekwenqatjwa, funda liphutsa le-Twilio langempela, lilungise umphumela lolungile kuwebhusayithi nakulokuthunyelwa, bese uphinde ufake kusetjentiswa i-Console yebandla. Kwetinkhombisi letingakabhalisiwe/letilindzele, linda kuphelelisa kubhalisa kunekutsi ushintje tinombolo kute usebente ngalokuhle. Sebentisa [kuxazulula tinkinga zokubhalisa kwe-Twilio](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands) kanye nemtfombo wekhodi lephutsa lolunikwe. Ungetsembisi sikhatsi lesisetiwe sekuphendvula.
