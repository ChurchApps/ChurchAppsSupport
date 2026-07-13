---
title: "Kuphepha Kwemininingwane"
---

# Kuphepha Kwemininingwane

<div class="article-intro">

Nanoma kungekho luhlelo lolutsite lolulondzekile ngalokuphelele, i-ChurchApps ithatsa kuphepha kwemininingwane njengendzaba lebalulekile. Leli khasi lichaza tinyatselo letentiwako kute kuvikelwe yonkhe imininingwane lefakwa ku-B1.church Admin naku letinye timikhicito te-ChurchApps.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Buka leli khasi kute utewucondza kutsi imininingwane yelibandla lakho ivikeleka njani
- Lungisa [Roles & Permissions](./roles-permissions.md) kute ulawule kutsi ngubani longafinyelela kumniningwane lebucayi
- Tijwayeze [nemtsetfo wemfihlo](https://churchapps.org/privacy)

</div>

## Kunciphisa Imininingwane Lebucayi Legciniwe

Indlela yetfu yekucala kutsi singagcini imininingwane lebucayi lengeyidzingakali. Loku kusho kutsi asikaze sigcine imininingwane yekhadi lasebhange nome ye-akhawunti yasebhange lesetjentiswa ekwenteni imnikelo. Nangabe umsebentisi wenta umnikelo asebentisa B1.church Admin nome B1, imininingwane yekhadi ayidluliswa naku lunye lwemaseva etfu, ngaphandle kwaleyo yesikhungo sakho sekukhokhisa (payment gateway) (Stripe). Loku kusho kutsi nangabe kuke kwaba nekungena lokungakavunyelwa kwemininingwane (data breach), akukho mininingwane yekhadi nome yasebhange leyayitawuvela obala.

Futsi asikaze sigcine emaphasiwedi kuhlelo lwetfu. Onkhe emaphasiwedi acutjwa ngendlela ye-one-way hashing lapho lenye yemininingwane ichitwa khona, lokwentela kutsi kungenteki kutsi umuntfu abuyisele emaphasiwedi kusuka ku-database, ngisho natsi. Kute kuchekwe liphasiwedi, linani lelifakiwe kufanele lidlule kulendlela lefanako ye-hashing bese likhicita umphumela lofanako.

Ngemuva kwekususa lemitfombo lemibili, lokusele kunguluhlu lwemagama nemininingwane yekutsintsana kuphela.

:::tip
Njengobe i-ChurchApps ingakaze igcine imininingwane yekhadi nome yasebhange, ngisho nakuba kungena lokungakavunyelwa kwemininingwane lokubi kakhulu ngeke kwembule imininingwane ye-akhawunti yemali. Ngukwemagama nemininingwane yekutsintsana kuphela lokungaba sengotini.
:::

## Kusebentisa Tindlela Letijwayelekile Letinhle Kakhulu

Sisebentisa tindlela letijwayelekile temkhakha wonkhe kuphepha, kufaka ekhatsi kuvikela yonkhe imininingwane lehambako kuya nasekuya kumaseva etfu ngekusebentisa i-HTTPS. Onkhe emaseva agcinwe endzaweni levikelekile ye-datacenter ne-Amazon Web Services. Onkhe emaseva e-database agcinwe ngemuva kwe-firewall futsi awafinyeleleki ku-inthanethi.

## Kwehlukanisa Kwemininingwane

Imininingwane yehlukaniswa yafakwa ku-database letehlukene ngekusekelwa kububanzi bayo (scope). Ngayinye ye-API letfu (Membership, Giving, Attendance, Messaging, Doing ne-Lessons) ngu-silo lekutimela lwemininingwane ngeledatabase yalo. Nangabe lenye yato ingena ngekungakavunyelwa, kusetjentiswa kwemininingwane kuncipha ngaphandle kwekutsi netinye letinye tingene nato. Sibonelo, nangabe i-Giving API/database ingena ngekungakavunyelwa, umuntfu lomubi angatfola lifikelelo kuluhlu lwetimnikelo netilanga tato (kodvwa akasoze atfole imininingwane yekhadi/yasebhange). Kodvwa-ke, angeke abe nelifikelelo lekutsi ngubani lowenta imnikelo nome ngutiphi timabandla lekwentelwa wona njengobe loko kugcinwe ku-database lehlukene ye-Membership.

:::info
Kwehlukanisa kwemininingwane kusho kutsi kungena kwesinye sihlelo ngekungakavunyelwa akukuniki lifikelelo kuyo yonkhe imininingwane yelibandla. Ngayinye ye-API isebenta ngekutimela nge-database yayo, lokunciphisa umtsindvo walo lonkhe kungena lokungakavunyelwa lokungenteka.
:::

## Lifikelelo Lelinciphisiwe

Lifikelelo kumaseva ekusebenta kusimisiwe lincitseke kubantfu labaphetse sikhundla sekulawula seva labadzinga lelo fikelelo kuphela. Njengamanje, lena yibantfu labalimbili labatsi futsi bangemalunga ebhodi. Bentisi (developers), tisebenti letivolontile, kanye nalamanye emalunga ebhodi abavumelwa kufinyelela kumaseva ekusebenta.

## Umtsetfo Wemfihlo

Imininingwane yakho yeyakho futsi ayisoze yatsengiswa kubomunye. Ungawufundza wonkhe umtsetfo wetfu wemfihlo [lapha](https://churchapps.org/privacy).

## Kuhambisana ne-GDPR

I-ChurchApps isekela kuhambisana ne-GDPR yemabandla lanemalunga e-UK nome ku-European Union. Nayi indlela lesibhekana ngayo netidzingo letisemtsetfweni:

### Emalungelo Emuntfu Longumniniwo Wemininingwane

I-ChurchApps inikeza tinsita letisita emabandla ekuphendvula ticelo tebantfu labanemininingwane:

- **Ilungelo Lekufinyelela (Article 15)** — Emalunga angacela likhophi lemininingwane yawo yebuwena ngekutsintsana nelibandla lawo. Baphatsi bangakhipha imininingwane yanoma ngumuphi umuntfu kusuka esigabeni se- **Data Management** kukhasi lemininingwane yalowo muntfu ku-B1.church Admin.
- **Ilungelo Lekususwa (Article 17)** — Emalunga angacela kutsi i-akhawunti yawo isuswe ngekutsintsana nelibandla lawo. Baphatsi bangenta imininingwane yemuntfu ingacaci (anonymize) kuto tonkhe tincenye kusuka esigabeni se- **Data Management** kukhasi lemininingwane yalowo muntfu. Kwenta imininingwane ingacaci kubuyisela imininingwane yebuwena ngemanani lajwayelekile kepha kugcinwe emarekhodi laphelele (sitotali setimnikelo, tibalo tekuya) letidzingekako ngenhloso yembiko wetimali welibandla.
- **Ilungelo Lekunciphiswa (Article 18)** — Emalunga angacela kunciphiswa kwekucutjwa kwemininingwane yawo ngekutsintsana nelibandla lawo, kufaka ekhatsi kukhipha bo etincwadzini letitfunyelwako.
- **Ilungelo Lekutfutfusela Imininingwane (Article 20)** — Baphatsi bangakhipha imininingwane yebuwena ngesifomeni se-JSON lesihleliwe futsi lesifundzeka ngemishini, egameni lemalunga lacela loko.

### Kusebentisa Tinsita te-Data Management

Kute ufinyelele kutinsita te-GDPR temuntfu ngamunye:

1. Yendlulela ku- **People** ku-B1 Admin bese uvula umrekhodi walowo muntfu.
2. Chofota **Edit** kute ungene endzaweni yekuhlela.
3. Yehlela phansi uye esigabeni se- **Data Management** (lesivalekile kusukela ekucaleni) bese uchofota kute usivule.
4. Sebentisa **Export Data** kute wehlisele ifayela le-JSON leyayo yonkhe imininingwane legciniwe ngalowo muntfu.
5. Sebentisa **Anonymize** kute ubuyisele imininingwane yebuwena ngemanani lajwayelekile. Utawuceliwa kutsi ubhale `ANONYMIZE` kute ucinisekise — lesento asikwati kubuyiselwa emuva.

:::warning
Kwenta imininingwane ingacaci (anonymization) kuhlala njalo. Sitotali setimnikelo netibalo tekuya kuyagcinwa ngenhloso yembiko wetimali, kodvwa yonkhe imininingwane leyimela umuntfu (ligama, imeyili, likheli, njll.) iyasuswa futsi ayikwati kubuyiselwa.
:::

### Kucutjwa Kwemininingwane

I-ChurchApps isebenta njenge- **data processor** egameni lelibandla lakho (i- **data controller**). Li- [Data Processing Agreement](https://churchapps.org/terms) yetfu ichaza imitsetfo yalinye licembu, kufaka ekhatsi kusetjentiswa kwe-sub-processor, tindlela tekwatisa nakukhona kungena lokungakavunyelwa kwemininingwane, kanye nekuphatfwa kwemininingwane nakuphelelwa sivumelwano.

### Kutfutfusa Kwemininingwane Emazweni Lahlukene

Imininingwane ye-ChurchApps ilondzekile ku-Amazon Web Services (AWS) e-United States. Kutfutfusa kwemininingwane emazweni kusuka e-UK/EU kubandzakanywe yi- Standard Contractual Clauses (SCCs) ye-AWS nge- [AWS Data Processing Addendum](https://aws.amazon.com/compliance/data-processing-addendum/). I-AWS DPA ihlanganiswa ngekutentekela ku-AWS Service Terms yato tonkhe emakhasimende. Kulondvolotwa e-EU akudzingekile nangabe tindlela letifanele tekutfutfusa njenge-SCCs sekusetjentiswa.

Kute ufundze kabanti ngekutsi bungoti lekutfutfusa buhlolwe njani, buka i- [Transfer Risk Assessment](./transfer-risk-assessment.md).

### Ema-Sub-Processor

- **Amazon Web Services (AWS)** — Kulondvolotwa kwesakhiwo (infrastructure), kugcinwa kwemininingwane, nekuletfwa kwekucuketfwa
- **Stripe** — Kucutjwa kwekukhokha kwetimnikelo (akukho mininingwane yemakhadi legcinwa yi-ChurchApps)

:::info
Kute utfole imininingwane leyphelele mayelana nekutsi siphatsa njani imininingwane yebuwena, buka [Privacy Policy](https://churchapps.org/privacy) ne- [Terms of Service](https://churchapps.org/terms) yetfu. Nangabe unemibuto mayelana nekuhambisana ne-GDPR, sitsintse ku support@churchapps.org.
:::
