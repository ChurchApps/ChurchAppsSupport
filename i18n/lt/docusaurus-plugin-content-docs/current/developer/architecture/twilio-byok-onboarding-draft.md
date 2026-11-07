---
title: "Twilio bažnyčios įdiegimas (juodraštis)"
description: "Juodraštis: bažnyčiai priklausančios B1 Twilio sąrankos, viešos registracijos gairės, kampanijų pavyzdžiai ir patvirtinimo kontrolinis sąrašas."
---

# Bažnyčiai priklausančio Twilio įdiegimo juodraštis

:::caution Siūlomai integracijai skirtas juodraštis
Tai siūlomas darbo eigos aprašas. Šiuo metu B1 turi pagrindinį **Twilio** pasirinkimą skyriuje **Nustatymai > Teksto žinutės** (Account SID, Auth Token, From Number ir gaunamų STOP žinučių webhook). Žr. [Bažnyčios nustatymai: Teksto žinutės](../../b1-admin/settings/church-settings.md#texting). Toliau aprašyti papildomi B1 sąrankos valdikliai, sutikimo susiejimas ir patikros žingsniai yra būsimos versijos reikalavimai, o ne nurodymai ieškoti esamų nustatymų. Apie apimtį ir priklausomybes skaitykite [techninį pasiūlymą](./twilio-byok-proposal). Twilio šaltiniai buvo patikrinti 2026 m. spalio 22 d.; prieš pateikiant kampaniją patikrinkite dabartinius reikalavimus.
:::

## Rekomenduojamas modelis

Jūsų bažnyčia valdo savo mokamą Twilio paskyrą, telefono numerį, Messaging Service, sąskaitas ir kampanijos registraciją. B1 siųstų žinutes per šiuos išteklius, naudodamas bažnyčios nustatymuose privačiai įvestus prisijungimo duomenis. Bent du tinkami bažnyčios administratoriai turi galėti pasiekti Twilio paskyrą, turi būti įjungtas paskyros saugumas, o vienas asmuo turi būti atsakingas už sutikimus, gaunamus atsakymus ir atmetimo pranešimus.

Čia siūlomas pirmasis leidimas apima vieną JAV vietinį numerį ir vieną aiškiai aprašytą bažnyčios žinučių programą. Toliau pateiktuose pavyzdžiuose naudojama išgalvota **Grace Community Church** programa **Grace Church Updates** pamaldų pokyčiams, renginių priminimams ir savanorių grafikams. Visus vardus, domenus, dažnumą, kontaktus ir paskirtį pakeiskite tikrąja bažnyčios praktika. Tai bažnyčiai pritaikyti Twilio taisyklių pavyzdžiai, o ne iš anksto patvirtinta kampanija ar garantuotas patvirtinimas.

## 1. Paruoškite viešą B1 registracijos patirtį

Bažnyčios B1 svetainėje paskelbkite puslapį, pavyzdžiui, `https://www.example.org/text-updates`, su įterptu viešu B1 formos elementu arba aiškia nuoroda į savarankišką viešą formą. Taip pat paskelbkite `https://www.example.org/privacy` ir `https://www.example.org/sms-terms`. Šie adresai yra vietos rezervavimo ženklai; pateikite tikrus, pasiekiamus URL.

Siūlomai SMS registracijos formai:

| Nustatymas | Rekomenduojama konfigūracija |
|---|---|
| Prieiga | Vieša / be apribojimų; aktyvi per peržiūrą ir nuolatinę registraciją; prieinama be prisijungimo |
| Formos režimas | Pradžioje standartinis režimas; pokalbio režimui reikia aiškios sutikimo palaikymo, aprašytos techniniame pasiūlyme |
| Mobilusis numeris | Aiškiai pažymėtas su šalies kodu; privalomas tik pasirinkus SMS registraciją, jei naudojamas bendroje ryšio / renginio formoje |
| SMS pasirinkimas | Atskiras neprivalomas žymimasis langelis, pagal numatytuosius nustatymus nepažymėtas, susietas su konkrečia programa ir mobiliojo numerio lauku |
| Informacija | Šalia SMS pasirinkimo matomi: bažnyčia / programa, žinučių paskirtis ir dažnumas, galimi mokesčiai, STOP, HELP, pagalbos kontaktas ir tikros paspaudžiamos Privatumo politikos / SMS sąlygų nuorodos |
| Kiti veiksmai | Svečiai gali pateikti ryšio kortelę, registruotis į renginį arba prašyti informacijos, neprisijungdami prie SMS |
| Įrodymai | Išsaugokite programą, tikslų telefono numerį, pasirinktą sutikimą, pateiktą formą, serverio laiką ir informacijos / politikos versiją; vien paprastas formos atsakymas šiandien nereiškia registracijos |
| Asmenų / grupių automatizavimas | Pirminiam registracijos bandymui išjunkite automatinį asmenų kūrimą ir grupių priskyrimą, nebent jie peržiūrėti pagal esamas bažnyčios atitikties taisykles. Priskyrimas grupei niekada nėra SMS leidimas |
| Esamos automatizacijos | Neregistruokite kiekvieno formos pateikėjo ar grupės nario į žinučių darbo eigą. Tai programai leidžia tik siūlomas patikrintas sutikimo susiejimas |
| Padėkos žinutė | Patvirtinkite, kad forma gauta, neteigdami, jog registracija į SMS įvyko, kai langelis nepažymėtas arba patvirtinimas ar peržiūra dar nebaigta |

Esamas žymimasis klausimas gali iliustruoti formą, tačiau B1 vis tiek reikia sutikimų įrašų ir siuntimo vartų. Dabartinis bendras atvaizdavimo įrankis aprašymus rodo kaip paprastą tekstą; vien Markdown ar URL įrašymas ten nepakankamai užtikrina, kad politikos nuorodos bus paspaudžiamos. Įgyvendinime turi būti pateiktas prieinamas sutikimo valdiklis su tikromis nuorodomis. Žr. [B1 formų kūrimas](../../b1-admin/forms/creating-forms) ir [techninį pasiūlymą](./twilio-byok-proposal#consent-and-suppression-are-required-release-work).

Twilio reikalauja savanoriško, patikrinamo sutikimo. Nejunkite SMS su privalomomis narystės sąlygomis, el. pašto / telefono leidimais, aukojimo sutikimu ar renginio registracija. Mobilusis numeris lankytojo kortelėje savaime nėra SMS sutikimas. Žr. Twilio [savanoriško sutikimo reikalavimus](https://www.twilio.com/docs/api/errors/30923) ir [kampanijos rekomendacijas](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations).

### Registracijos teksto pavyzdys

Naudokite tik tada, kai bažnyčia jau pasirinko tikras paskirtis, siuntėją ir dažnumą. Žymimasis langelis yra neprivalomas ir pradžioje nepažymėtas; toliau nurodytos politikos pavadinimai formoje turi būti nuorodos.

> Taip, noriu, kad Grace Community Church man rašytų per Grace Church Updates apie pamaldų pokyčius, bažnyčios renginius ir savanorių grafikus iš [registruoto bažnyčios numerio]. Kiekvieną mėnesį galite tikėtis iki 4 žinučių. Gali būti taikomi žinutių ir duomenų mokesčiai. Atsakykite STOP, kad atsisakytumėte, arba HELP, kad gautumėte pagalbos. Registracija į SMS neprivaloma ir nereikalinga norint dalyvauti pamaldose, registruotis ar aukoti. Žr. mūsų Privatumo politiką ir SMS sąlygas. Klausimai: [bažnyčios pagalbos el. paštas arba telefonas].

„Iki 4“ yra pavyzdinis įsipareigojimas, o ne Twilio nustatytas limitas. Pakeiskite jį dažnumu, kurio bažnyčia tikrai gali laikytis; jei dažnumas kinta, tai nurodykite sąžiningai ir aprašykite numatomą ritmą. Reklaminius kvietimus ar papildomas ministerijų programas laikykite už šio žymimojo langelio ribų, nebent jų paskirtis ir sutikimas buvo atskirai įvertinti.

Bendrai lankytojų / renginių formai su nepažymėtu langeliu pateikimas vis tiek turi būti sėkmingas. Atskira forma tik SMS gali paaiškinti, kad pažymėjus prašoma registracijos, tačiau niekada neturi daryti, kad nesusiję bažnyčios susirinkimai priklausytų nuo registracijos. Patikrinkite tikrą elgseną telefone ir kompiuteryje.

### Parengtinos politikos turinys

Bažnyčios privatumo puslapyje turi būti paaiškinta, kokią informaciją ji renka žinutėms, kaip ją naudoja ir saugo, bei kokia jos saugojimo ir kontaktų tvarka. Jame aiškiai turi būti nurodyta, kad mobilieji numeriai ir žinučių sutikimai nėra parduodami ir nedalijami trečiosioms šalims ar filialams jų rinkodaros ar reklamos tikslais. Tiksliai paaiškinkite būtiną paslaugų teikėjų tvarkymą; nesakykite, kad bažnyčia niekada nenaudoja tvarkytojo, kai naudoja B1 ir Twilio. Šio skirtumo atskaitos taškas – Twilio [privatumo politikos gairės](https://www.twilio.com/docs/api/errors/30908) ir [kampanijos rekomendacijos](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations).

SMS sąlygose nurodykite bažnyčią ir programą, paskirtis, tikrą dažnumą, galimus žinutių mokesčius, STOP / HELP nurodymus, pagalbos kontaktą ir privatumo nuorodą; įtraukite visus papildomus atskleidimus, kuriuos reikalauja dabartinė Twilio peržiūra. Registracijos puslapio politikos nuorodos turi tiksliai atitikti kampanijai pateiktus URL. Nuo 2026 m. birželio 30 d. Twilio naujoms API kampanijų registracijoms reikalauja atskirų viešų privatumo ir sąlygų URL; jos Console procesas taip pat jų prašo. [Twilio reikalavimas](https://www.twilio.com/en-us/changelog/a2p-10dlc-campaign-registration-will-require-privacy-policy-and-)

Tai yra turinio reikalavimai, kuriuos reikia taikyti tikroms bažnyčios politikoms. Jie nepakeičia esamos privatumo praktikos ir nėra bendra politika, kurią galima įklijuoti nepatikrinus.

## 2. Užregistruokite bažnyčią ir jos žinučių programą Twilio

1. Sukurkite arba naudokite **bažnyčiai priklausančią mokamą paskyrą** ir SMS palaikantį JAV vietinį numerį. Nuosekliai naudokite bažnyčios teisinį pavadinimą, EIN / verslo registracijos informaciją, adresą, svetainę ir įgaliotą atstovą. Nekeiskite ChurchApps ar kitos bažnyčios duomenimis.
2. Vykdykite Twilio tiesioginio kliento prekių ženklo registracijos procesą tinkamam bažnyčios juridiniam tipui. Tinkamam ne pelno subjektui naudokite [ne pelno registracijos gaires](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/onboarding-for-government-and-non-profit-agencies). Labdaros / 501(c)(3) naudojimo atvejai priklauso nuo tinkamumo; vien bažnyčios pavadinimas nereiškia Twilio patvirtinimo ar išimties.
3. Sukurkite atskirą Messaging Service ir pateikite atitinkamą A2P 10DLC kampaniją. Pasirinkite naudojimo atvejį, kuris tikrai atitinka realias žinutes ir to patvirtinto prekių ženklo galimybes; čia pateikti pavyzdžiai nenurodo visuotinio bažnyčios naudojimo atvejo kodo.
4. Pateikite viešą registracijos URL, politikos nuorodas, visą sutikimo ir žinučių eigos aprašymą bei prašomus pavyzdinius pranešimus. Įtraukite visus tikrus registracijos būdus; nuorodų / telefono numerių deklaracijas nustatykite pagal tikrą turinį. Neįrašykite raktažodžių registracijos ar dvigubo sutikimo, jei tokia eiga neegzistuoja ir nebuvo išbandyta.
5. Susiekite siuntimo numerį su paslauga ir patvirtinta kampanija. Prieš siųsdami žinutes palaukite, kol bus patvirtinta kampanija **ir užbaigta numerio registracija**.

Šiuos žingsnius atlikite bažnyčios Twilio Console. Siūlomas B1 integravimas bažnyčioms registracijų nepateikia. Registracijos laukus ir statusą paaiškina Twilio [registracijos greitasis startas](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/quickstart) ir [kampanijos išteklius](https://www.twilio.com/docs/messaging/api/usapptoperson-resource). Laukiantis numeris gali blokuoti siuntimą net ir patvirtinus kampaniją. [Numerio registracija](https://www.twilio.com/docs/api/errors/30035)

### Kampanijos aprašymo pavyzdys

> Grace Community Church naudoja Grace Church Updates, kad žmonėms, kurie pasirenka šią programą mūsų viešoje bažnyčios svetainėje, siųstų pamaldų tvarkaraščio pokyčius, bažnyčios renginių priminimus ir savanorių grafiko pranešimus. Pagal šią programą siunčiame ne daugiau kaip keturias žinutes per mėnesį. Gavėjai bet kada gali atsisakyti šių žinučių. Ši programa neapima įsigytų kontaktų, trečiųjų šalių reklamos ar lėšų rinkimo kvietimų.

Šis pavyzdys tinka tik bažnyčiai, kuri tikrai laikosi šių ribų ir išimčių. Jei vien savanorių priminimai viršija pažadėtą dažnumą, prieš pateikdami pakeiskite programos dizainą ir atskleidimą.

### Žinučių eigos aprašymo pavyzdys

> Lankytojai atidaro [tikrą bažnyčios registracijos URL], įveda savo mobilųjį numerį ir savarankiškai pasirenka neprivalomą Grace Church Updates langelį. Formai atidarius jis nepažymėtas. Atskleidime nurodoma Grace Community Church, aprašomi pamaldų pokyčiai, renginių priminimai ir savanorių grafikai, pateikiama mėnesio riba ir galimi mokesčiai, taip pat paaiškinami STOP ir HELP. Rodoma Privatumo politika ir SMS sąlygos veda į [tikrą privatumo URL] ir [tikrą SMS sąlygų URL]. Atsisakius SMS nėra trukdoma dalyvauti pamaldose, registruotis į renginius, aukoti ar naudoti bendros ryšio formos. B1 įrašo aiškų pasirinkimą, telefono numerį, pateikimo laiką ir atskleidimo versiją. Šią programą siunčiame tik dokumentuotiems prenumeratoriams ir prieš tolesnius siuntimus pašaliname atsisakiusius.

Pritaikykite šią pastraipą įgyvendintam procesui. Jei naudojamas telefono patvirtinimas ar darbuotojo peržiūra, aprašykite laukiamą būseną ir tikslų aktyvavimo veiksmą. Jei naudojami kiti būdai, įtraukite kiekvieną jų ir įrodymus. Jei registracija yra už prisijungimo ribų arba vyksta popieriuje, Twilio prašo viešų, redaguotų tikros sutikimo patirties įrodymų; niekada neatskleiskite užpildytų formų ar narių duomenų. [Patikrinamo sutikimo gairės](https://www.twilio.com/docs/api/errors/30923)

### Pavyzdiniai siunčiami pranešimai

Tai išgalvoti pavyzdžiai, kuriuos reikia pritaikyti; prieš pateikdami naudokite tikrus bažnyčios URL ir pakeiskite laužtiniuose skliaustuose esančias reikšmes. Twilio kampanijų API priima nuo dviejų iki penkių pavyzdžių. Pavyzdžiuose turi būti nurodyta bažnyčia, atitinkama deklaruota paskirtis ir atsisakymo instrukcija. [Kampanijos pavyzdžių laukai](https://www.twilio.com/docs/messaging/api/usapptoperson-resource)

```text
Grace Community Church: Sekmadienio pamaldos prasidės [laikas] dėl [priežastis]. Išsamiau: [bažnyčios svetainės URL]. Atsakykite STOP, kad nebegautumėte žinučių.
```

```text
Grace Community Church: Primename, kad [bažnyčios renginys] vyks [data] [laikas]. Informacija: [bažnyčios renginio URL]. Atsakykite STOP, kad nebegautumėte žinučių.
```

```text
Grace Community Church: Esate užsirašęs tarnauti komandoje [komanda] šią [diena]. Peržiūrėkite savo planą: [B1 bažnyčios portalo URL]. Atsakykite STOP, kad nebegautumėte žinučių.
```

Laužtiniuose skliaustuose esantys URL nurodo pavyzdinius kintamuosius; pateiktuose pavyzdžiuose turi būti tikras bažnyčios domenas ir tikras nuorodų stilius. Nuoroda į planą gali reikalauti prisijungimo, tačiau registracijos puslapis ir politikos, naudojamos patikrinimui, turi būti viešai peržiūrimi. Patvirtinimo pavyzdžiuose neįtraukite privačių pastabų, vaikų informacijos ar identifikuojamų narių duomenų. Pavyzdinį turinį suderinkite su tuo, ką tikrai siunčia B1 šablonai; nežadėkite atsakymų gavimo pašto dėžutės ar konkretaus priminimų elgesio, kurio nėra.

### STOP, START ir HELP atsakymai

Šiems patvirtinimams naudokite Twilio Messaging Service Advanced Opt-Out ir pritaikykite bažnyčios / programos pavadinimą bei pagalbos duomenis. Atsakymų paskirties pavyzdys:

- **STOP:** patvirtinkite, kad Grace Church Updates žinutės sustabdytos, ir paaiškinkite, kaip galima vėl prisijungti.
- **START:** patvirtinkite, kad ta pati programa vėl įjungta, įskaitant jos pavadinimą, dažnumą / mokesčius ir pagalbos bei sustabdymo nurodymus, kaip reikalauja sukonfigūruota eiga.
- **HELP:** nurodykite Grace Community Church ir pateikite tikrą pagalbos kontaktą bei atsisakymo instrukcijas.

Kai Twilio jau atsakė, neduokite antro B1 patvirtinimo. HELP atsakymas nėra registracija. START neturi užregistruoti asmens į kitas bažnyčios programas ar parodyti jo narių kataloge. [Twilio Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

## 3. Patikrinkite patvirtinimo paketą prieš pateikdami

- [ ] Bažnyčios tikra juridinė / prekių ženklo informacija, svetainės tapatybė ir kampanijos paskirtis sutampa.
- [ ] Registracijos puslapis ir aktyvi forma atsidaro be prisijungimo privačiame naršyklės lange, įskaitant mobilųjį įrenginį.
- [ ] SMS langelis pradžioje nepažymėtas ir jį galima nepažymėti užbaigiant pagrindinį lankytojo / renginio veiksmą.
- [ ] Šalia SMS pasirinkimo matomi programos paskirtis, siuntėjas, tikras dažnumas, galimi mokesčiai, STOP, HELP, pagalbos kontaktas ir paspaudžiamos politikos nuorodos.
- [ ] Tiksli privatumo / sąlygų URL, pateikti Twilio, yra vieši, veikia be prisijungimo duomenų ir nurodo tą pačią bažnyčią bei programą. Politikos turinys atitinka tikrą duomenų tvarkymą.
- [ ] Kiekvienas pavyzdinis pranešimas atitinka programą, tikrą siuntėjo tapatybę ir numatomą nuorodų / telefono numerių elgseną. Kampanijoje aprašyti visi tikri sutikimo būdai.
- [ ] Redaguotos ekrano nuotraukos rodo tuščią formą, langelį / atskleidimus ir politikos nuorodas taip, kaip jas matys peržiūrėtojai. Įrodymuose nėra narių įrašų ar raktų.
- [ ] Bažnyčia turi veikiantį būdą saugoti sutikimo įrodymus ir gerbti atsisakymus prieš siunčiant žinutes, įskaitant užklausas, gautas telefonu ar el. paštu.

Šie patikrinimai padeda išvengti nereikalingų neatitikimų, tačiau sprendimą priima Twilio ir jos peržiūros partneriai. Tikrą registracijos puslapį ir politikos URL palaikykite pasiekiamus ir po patvirtinimo, o ne tik peržiūros metu.

## 4. Prijunkite ir patikrinkite būsimą B1 integravimą

Po integravimo išleidimo siūlomoje Teksto žinučių sąrankoje turi būti renkami bažnyčios Account SID, atskiras API Key SID / paslaptis, atskiras webhook Auth Token, Messaging Service SID ir pasirinktas siuntėjas. Raktus kurkite tik bažnyčios Console, o paslaptis įveskite tik privačiuose B1 nustatymuose. [Twilio API raktų gairės](https://www.twilio.com/docs/iam/api-keys)

B1 pateiktus bažnyčiai skirtus gaunamųjų ir pristatymo būsenos webhook URL nukopijuokite į atitinkamą Twilio paslaugos konfigūraciją. Įjunkite Advanced Opt-Out ir patikrinkite, ar gaunamos žinutės pasiekia sukonfigūruotą webhook. B1 turėtų rodyti atskirus patikrinimus: prisijungimo duomenys, paslaugos ir siuntėjo nuosavybė, patvirtinta kampanija, užbaigta numerio registracija, gaunamųjų žinučių patikrinimas ir sėkmingai pristatytas bandymo pranešimas. Išsaugoti prisijungimo duomenys ar priimta API užklausa dar nereiškia galutinio pristatymo.

Jei B1 negali programiškai patikrinti registracijos signalo, patvirtinkite jį tiesiogiai Console; sąsaja turi pažymėti datuotą rezultatą kaip administratoriaus patvirtintą. Prieš įjungdami gamybines žinutes išspręskite laukiančią ar nesėkmingą būseną. Atskiram, aiškiai pageidaujamam bandymui naudokite realų sutikimą davusį suaugusį bandymo gavėją, tada:

1. Patikrinkite, ar atitinkama dokumentuota registracija sukuria teisingą telefono / programos sutikimo įrašą; atsisakymas ar telefono numerio pakeitimas neturi tyliai registruoti gavėjo.
2. Išsiųskite vieną bandymo žinutę, patvirtinkite gavimą ir palyginkite B1 būseną su Twilio Message SID bei pristatymo rezultatu.
3. Atsiųskite STOP ir patikrinkite, ar rankinės žinutės, grupių žinutės, darbo eigos ir priminimai praleidžia tą telefoną. Matomumas kataloge neturi keistis.
4. Išbandykite dokumentuotą tos pačios programos pakartotinės registracijos eigą ir HELP atsakymą; patikrinkite, ar nėra dublikuotų patvirtinimų ir nepasikeitė nesusiję nustatymai.

## 5. Prižiūrėkite programą

Paskirkite bažnyčios savininką, kuris stebės kampanijos / paskyros būseną, balanso ir mokėjimo įspėjimus, žinučių klaidas ir gaunamus atsakymus Twilio. Siūlomas pirmasis B1 leidimas neturi pokalbių SMS gautiesiems, todėl paskelbkite ir stebėkite tikrą pagalbos kontaktą bei tikrinkite atsakymus, o ne darykite prielaidą, kad darbuotojai juos mato B1.

Sutikimų ir atsisakymų istoriją, dabartines atskleidimo ir politikos versijas, kampanijos identifikatorius bei redaguotus patvirtinimo įrodymus laikykite bažnyčios kontroliuojamuose įrašuose. Niekada neįklijuokite raktų ar gavėjų sąrašų į viešus pagalbos prašymus. Pasikeitus numeriui, paslaugai, prisijungimo duomenims, registracijos eigai, dažnumui ar paskirčiai, iš naujo patikrinkite integravimą ir prieš tęsdami atnaujinkite registraciją / sutikimus, kur to reikia. Atidžiai peržiūrėkite bendrus šeimos numerius ir pakeistus numerius; tinkamumas priklauso nuo sutinkančio telefono ir programos, o ne nuo kiekvieno šeimos nario įrašo.

Jei registracija atmesta, perskaitykite tikrą Twilio klaidą, ištaisykite konkretų neatitikimą ir svetainėje, ir pateikime, tada vėl pateikite per bažnyčios Console. Neužregistruotų ar laukiančių siuntėjų atveju palaukite registracijos užbaigimo, o ne keiskite numerius, kad apeitumėte kliūtį. Naudokite [Twilio registracijos trikčių šalinimo](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands) ir pateiktą klaidų kodų žinyną. Nežadėkite fiksuoto atsakymo laiko.
