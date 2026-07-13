---
title: "Kuhlolwa Kwebungoti Bekutfutfusa Kwemininingwane"
---

# Kuhlolwa Kwebungoti Bekutfutfusa Kwemininingwane

<div class="article-intro">

Lomculu ubhala luhlolo lwe-ChurchApps mayelana nebungoti lobuhambisana nekutfutfuselwa kwemazweni lahlukene kwemininingwane yebuwena kusuka e-UK/EEA kuya e-United States, njengobe kudzingwa ngaphansi kwe-UK GDPR ne-EU GDPR. Lolu luchazo lwangekhatsi lwekuhambisana nemtsetfo logcinwa yi-ChurchApps njenge-data processor.

</div>

**Kuphindze kwahlolwa ekugcineni:** April 2026

## 1. Imininingwane Yekutfutfusa

| Sihloko | Imininingwane |
|---|---|
| **Lokhipha Imininingwane (Data Exporter)** | Emabandla lasebentisa i-ChurchApps (Ba-Data Controller) latfolakala e-UK/EEA |
| **Lokwemukela Imininingwane (Data Importer)** | ChurchApps (Data Processor), lesebenta iphuma e-United States |
| **Tigaba Tebantfu Labanemininingwane** | Emalunga elibandla, labatamukela, tivakashi, banikeli, tivolontile, bantfwana (labaphetfwe batali/baphatsi) |
| **Tigaba Temininingwane Yebuwena** | Emagama, emakheli emeyili, tinombolo telucingo, emakheli eposi, emalanga ekutalwa, bulili, simo semshado, titfombe telisayidi, emarekhodi etimnikelo, emarekhodi ekuya, bulunga betigcele, imisebenti yetivolontile, umlandvo wekutfumela imilayeto |
| **Imininingwane Lebucayi** | Akukho lokucondzwe kucotjwa. Akukho mininingwane yetimphilo, ye-biometric, nome yemarekhodi elicala lelogciniwe. Imininingwane ye-akhawunti yemali (emakhadi, ema-akhawunti asebhange) ayikaze igcinwe yi-ChurchApps — loku kuphatfwa nge-Stripe ngco. |
| **Inhloso Yekutfutfusa** | Kunika tinsita tesofthiwe yekuphatsa libandla (kuphatsa emalunga, timnikelo, kulandzelela kuya, kutsintsana, kuhlela tivolontile, kubhalisa tehlakalo) |
| **Live Lelifikelwako** | United States |
| **Indlela Yekutfutfusa** | EU Standard Contractual Clauses (SCCs) ne-UK International Data Transfer Addendum (IDTA), tifakwe nge- AWS Data Processing Addendum |

## 2. Ema-Sub-Processor

| Sub-Processor | Umsebenti | Indzawo | Indlela Yekutfutfusa |
|---|---|---|---|
| **Amazon Web Services (AWS)** | Kulondvolotwa kwesakhiwo, kugcinwa kwemininingwane, kuletfwa kwekucuketfwa (indzawo ye-us-east-2) | United States | AWS DPA lene-SCCs (ihlanganiswa ngekutentekela ku-AWS Service Terms) |
| **Stripe** | Kucutjwa kwekukhokha kwetimnikelo | United States | Stripe DPA lene-SCCs |

Imininingwane yekhadi lasebhange nome ye-akhawunti yasebhange idluliswa ngco kusuka ku-browser yalosebentisi kuya ku-Stripe futsi ayisoze yagcinwa nome idluliswe nge-emaseva e-ChurchApps.

## 3. Kuhlolwa Kwebungoti

### 3.1 Kuvikelwa Ngekhodi (Encryption)

- **Ngesikhatsi sekuhamba:** Yonkhe imininingwane ivikelwe nge-TLS/HTTPS kuto tonkhe kutsintsana emkhatsini webasebentisi nemaseva e-ChurchApps.
- **Nase kugciniwe:** Imininingwane legcinwe ku-AWS ivikelwe ngekhodi lokuphatfwa yi-AWS.

### 3.2 Kulawulwa Kwelifikelelo

- Lifikelelo kumaseva ekusebenta kusimisiwe kubantfu labalimbili labamalunga ebhodi lelilawula i-ChurchApps.
- Bentisi (developers), tisebenti letivolontile, kanye nalamanye emalunga ebhodi abanalo lifikelelo kumaseva ekusebenta nome ku-database.
- Emaseva e-database asemgceke we-firewall futsi akafinyeleleki ngco ku-inthanethi.
- Imininingwane yemabandla yehlukanisiwe ngendlela yekwakheka -- lilinye libandla lingakwati kufinyelela kuphela kumininingwane yalo ngekulawulwa kwelifikelelo kulizinga lehlelo (application-level access controls).

### 3.3 Kwehlukanisa Kwemininingwane

Imininingwane isakateke etindzaweni letisitfupha letitimele te-database (Membership, Giving, Attendance, Messaging, Doing, Content). Kungena lokungakavunyelwa kwe-database yinye akwembuli imininingwane yaletinye. Sibonelo, i-database ye-Giving iniketwe emanani netilanga tetimnikelo kodvwa hhayi emagama nome imininingwane yekutsintsana yebanikeli (legcinwe ku-Membership).

### 3.4 Kuncipha Kwemininingwane Legciniwe

- Akukho mininingwane yekhadi nome ye-akhawunti yasebhange legciniwe (iphatfwa yi-Stripe).
- Emaphasiwedi agcinwe ngekusebentisa i-one-way hashing futsi awakwati kubuyiselwa.
- Emabandla alawula kutsi ngukuphi imininingwane latsi ayicoshe kumalunga awo.

### 3.5 Emalungelo Ebantfu Labanemininingwane

I-ChurchApps inikeza tinsita tebuchwepheshe letivumela emabandla kutsi agcwalise ticelo tebantfu labanemininingwane:

- **Kufinyelela Nekutfutfusa:** Kukhishwa lokugcwele kwemininingwane ngesifomeni se-JSON lesifundzeka ngemishini.
- **Kususwa:** Kwenta imininingwane ingacaci kuto tonkhe ema-database lasitfupha, kubuyisela imininingwane yebuwena ngemanani lajwayelekile kepha kugcinwe emarekhodi laphelele ladzingekako embikweni wetimali.
- **Kunciphiswa:** Simo semalunga lesingekho semsebenti sikhipha bantfu ekuseshweni, edirekthri, emibikweni, nasekutfunyelweni kwemilayeto, kepha kugcinwe umrekhodi wabo.
- **Kulungiswa Kwemininingwane:** Emalunga kanye nabaphatsi bangahlela imininingwane yebuwena bacela ngale insita.

### 3.6 Kwatiswa Ngekungena Lokungakavunyelwa

I-ChurchApps itibopha kutsi itawatisa emabandla latsintfwako ngekhatsi kwemahora langu-72 kusukela nasakubona kutsi kungenwe ngekungakavunyelwa kwemininingwane yebuwena, njengobe kubhaliwe ku- [Terms of Service](https://churchapps.org/terms) (Sigaba 11.6).

### 3.7 Bungoti Belifikelelo Lombuso we-US

Bungoti lobukhulu lohambisana nemininingwane legcinwe e-US ngulokutsi lifikelelo langenteka ngemagunya ombuso we-US ngaphansi kwe-FISA Section 702 nome Executive Order 12333. Lobubungoti buhlolwe njenge **buncane** ngetizatfu letilandzelako:

- I-ChurchApps icutja imininingwane yebulunga nekuya kwelibandla, hhayi imininingwane leyinsindzo yekuhlola.
- Bantfu labanemininingwane bangemalunga netivakashi telibandla — hhayi tigaba letijwayele kucondzelwa tinhlelo tekuqapha.
- Akukho mininingwane lebucayi yebuwena (timphilo, ema-akhawunti emali, imibono yepolitiki) legciniwe.
- I-DPA ye-AWS ihlanganisa tibopho letihambisana neticelo telifikelelo lombuso kanye nembiko wekusebenta ngekusobala.
- I-EU-US Data Privacy Framework (leyacaliswa nga-2023) inika kuvikeleka lokungeti kutfutfusa kwemininingwane kuya kumanyuvesi la-US lasemukelwe.

## 4. Sicondzo Sebungoti Lesigcwele

Bungoti kubantfu labanemininingwane kulokhu kutfutfusa kwemazwe lahlukene buhlolwe njenge **buncane**. Kuhlanganiswa kwa:

- Standard Contractual Clauses njengendlela lesemtsetfweni yekutfutfusa
- Kuvikelwa ngekhodi ngesikhatsi sekuhamba nasekugciniwe
- Kulawulwa lokucinile kwelifikelelo nebantfu bebabili kuphela labanemvumo
- Kwehlukanisa kwemininingwane etindzaweni letitimele te-database
- Kungabikho kwekugcinwa kwemininingwane ye-akhawunti yemali
- Kubucayi lobuncane kanye nensindzo lencane yekuhlola yemininingwane lecutjwako
- Tinsita tebuchwepheshe tekusebentisa onkhe emalungelo ebantfu labanemininingwane

kunika tinyatselo letenele letengetiwe kucinisekisa kutsi imininingwane letfutfusiwe ithola lizinga lekuvikelwa lelifana ncamashi naleliciniswa ngekhatsi kwe-UK/EEA.

## 5. Luhlelo Lwekuphindze Kuhlolwa

Loluhlolo lutawuphindze luhlolwe minyaka yonkhe nome ngesikhatsi kunetjintjo lelibalulekile ekucutjweni kwemininingwane, ema-sub-processor, nome umtsetfo lolawula kutfutfusa kwemazwe lahlukene kwemininingwane.
