---
title: "Twilio povezava za cerkev (osnutek)"
description: "Osnutek nastavitve Twilio računa v lasti B1 cerkve, javnih navodil za prijavo, primerov kampanj in kontrolnega seznama za odobritev."
---

# Osnutek uvajanja Twilio računa v lasti cerkve

:::caution Osnutek za predlagano integracijo
To je predlagani postopek. B1 zdaj ima osnovno možnost **Twilio** pod **Nastavitve > Sporočanje** (Account SID, Auth Token, From Number in webhook za dohodni STOP). Glejte [Nastavitve cerkve: Sporočanje](../../b1-admin/settings/church-settings.md#texting). Dodatne nastavitve B1, preslikava soglasij in koraki preverjanja spodaj so zahteve za prihodnjo izdajo, ne navodila za iskanje obstoječih nastavitev. Območje uporabe in odvisnosti preberite v [tehničnem predlogu](./twilio-byok-proposal.md). Viri Twilia so bili preverjeni 22. oktobra 2026; pred oddajo kampanje preverite trenutne zahteve.
:::

## Priporočena ureditev

Vaša cerkev je lastnica svojega plačljivega Twilio računa, telefonske številke, Messaging Service, obračunavanja in registracije kampanje. B1 bi pošiljal preko teh virov z dostopnimi podatki, ki bi bili zasebno vneseni v nastavitvah cerkve. Vsaj dva ustrezna cerkvena skrbnika morata imeti dostop do Twilio računa, varnost računa mora biti omogočena, določiti pa je treba osebo, odgovorno za soglasja, dohodne odgovore in obvestila o zavrnitvi.

Prvi predlagani izdaji zajema eno lokalno številko v ZDA in en jasno opisan cerkveni program sporočil. Spodnji primeri uporabljajo izmišljeno **cerkev Grace Community Church** in program **Grace Church Updates** za spremembe bogoslužij, opomnike o dogodkih in razporejanje prostovoljcev. Vsa imena, domene, pogostosti, kontakte in namene zamenjajte z dejansko prakso vaše cerkve. Gre za cerkvene primere Twilievih pravil, ne za vnaprej odobreno kampanjo ali obljubo odobritve.

## 1. Pripravite javno prijavno izkušnjo B1

Na spletni strani cerkve objavite stran, na primer `https://www.example.org/text-updates`, z vdelanim javnim obrazcem B1 ali jasno povezavo do samostojnega javnega obrazca. Objavite tudi `https://www.example.org/privacy` in `https://www.example.org/sms-terms`. Ti naslovi so nadomestni; oddajte dejanske dosegljive URL-je.

Za predlagani obrazec za prijavo na SMS:

| Nastavitev | Priporočena konfiguracija |
|---|---|
| Dostop | Javno/neomejeno; aktivno med pregledom in stalnim vpisom; dostopno brez prijave |
| Način obrazca | Najprej standardni način; pogovorni način zahteva izrecno podporo za soglasje, opisano v tehničnem predlogu |
| Mobilni telefon | Jasno označen s predpono države; obvezen le ob izbiri prijave na SMS, če se uporablja v splošnem obrazcu za stik/dogodek |
| Izbira SMS | Ločeno izbirno potrditveno polje, privzeto neobkljukano, preslikano na določen program in polje za mobilni telefon |
| Obvestila | Vidna ob izbiri SMS: cerkev/program, namen in pogostost sporočil, možne cene, STOP, HELP, kontakt za podporo ter dejanske klikabilne povezave do politike zasebnosti in pogojev za SMS |
| Druga dejanja | Gostje lahko oddajo kartico za stik, se prijavijo na dogodek ali zahtevajo informacije, ne da bi se prijavili na SMS |
| Dokazila | Shranite program, natančno telefonsko številko, izbrano soglasje, oddano prijavo, strežniški čas in različico obvestila/politike; običajen odgovor v obrazcu danes sam po sebi ne prijavi osebe |
| Samodejno ustvarjanje oseb/dodeljevanje skupin | Za začetni pilotni vpis izklopite samodejno ustvarjanje oseb in dodeljevanje skupin, razen če so bila pravila za ujemanje v vaši cerkvi pregledana. Dodelitev skupine nikoli ni pooblastilo za SMS. |
| Obstoječe avtomatizacije | Ne vpisujte vseh oddajateljev obrazcev ali članov skupin v delovni tok za sporočila. Samo predlagana preverjena preslikava soglasja lahko pooblasti ta program. |
| Sporočilo po oddaji | Potrdite, da je bil obrazec prejet, ne da bi trdili, da je oseba prijavljena na SMS, kadar je polje zavrnjeno ali pa potrditev oziroma pregled še čakata. |

Obstoječe potrditveno polje lahko ponazori obrazec, vendar B1 še vedno potrebuje evidenco soglasij in zaporne točke pred pošiljanjem. Trenutni skupni prikazovalnik obvestila prikazuje kot navadno besedilo; če v opis vpišete Markdown ali URL, to ne zagotavlja, da bodo povezave do politik klikabilne. Implementacija mora zagotoviti dostopno kontrolo soglasja z dejanskimi povezavami. Glejte [ustvarjanje obrazcev B1](../../b1-admin/forms/creating-forms.md) in [tehnični predlog](./twilio-byok-proposal.md#consent-and-suppression-are-required-release-work).

Twilio zahteva prostovoljno in preverljivo privolitev. SMS ne vključujte v obvezne pogoje članstva, dovoljenja za e-pošto ali telefon, soglasje za darovanje ali prijavo na dogodek. Mobilna številka na kartici obiskovalca sama po sebi ni soglasje za SMS. Glejte Twilieve [zahteve za prostovoljno soglasje](https://www.twilio.com/docs/api/errors/30923) in [priporočila za kampanje](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations).

### Primer besedila za prijavo

Uporabite to šele, ko cerkev izbere dejanske namene, pošiljatelja in pogostost. Potrditveno polje je izbirno in privzeto neobkljukano; imena politik morajo biti v prikazanem obrazcu povezave.

> Da, želim, da me cerkev Grace Community Church prek programa Grace Church Updates obvešča po SMS o spremembah bogoslužij, cerkvenih dogodkih in razporedih prostovoljcev z številke [registrirana cerkvena številka]. Pričakujte največ 4 sporočila na mesec. Veljajo lahko standardne cene sporočil in prenosa podatkov. Za odjavo pošljite STOP, za pomoč pa HELP. Prijava na SMS je neobvezna in ni pogoj za udeležbo, prijavo ali darovanje. Oglejte si našo politiko zasebnosti in pogoje za SMS. Vprašanja: [e-pošta ali telefon cerkvene podpore].

»Največ 4« je primer obveznosti, ne omejitev, ki jo predpisuje Twilio. Nadomestite jo s pogostostjo, ki jo cerkev dejansko lahko izpolni; če se pogostost spreminja, to resnično povejte in opišite pričakovani ritem. Promocijskih vsebin ali dodatnih programov služenja ne vključujte v to potrditveno polje, razen če so bili njihovi nameni in soglasje ločeno ocenjeni.

Za splošni obrazec za obiskovalce ali dogodke mora oddaja uspeti tudi, če polje ni obkljukano. Namenski obrazec samo za SMS lahko pojasni, da obkljukanje pomeni zahtevo za prijavo, vendar nikoli ne sme pogojevati neodvisnih cerkvenih storitev s prijavo. Dejansko vedenje preverite na telefonu in računalniku.

### Vsebina politik, ki jo je treba pripraviti

Cerkvena stran o zasebnosti mora pojasniti, katere podatke zbira za sporočanje, kako jih uporablja in varuje ter kakšne so prakse hrambe in stikov. Jasno mora navesti, da se mobilne številke in soglasja za sporočila ne prodajajo in ne delijo s tretjimi osebami ali povezanimi družbami za njihove tržne ali promocijske namene. Nujno obdelavo prek ponudnikov storitev opišite natančno; ne trdite, da cerkev nikoli ne uporablja obdelovalca, če uporablja B1 in Twilio. Pri tem razlikovanju so merilo [smernice Twilia o zasebnosti](https://www.twilio.com/docs/api/errors/30908) in [priporočila za kampanje](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations).

Pogoji za SMS morajo navajati cerkev in program, namene, dejansko pogostost, morebitne stroške sporočil, navodila za STOP/HELP, kontakt za podporo in povezavo do zasebnosti. Dodajte tudi morebitna dodatna obvestila, ki jih zahteva trenutni Twilijev pregled. Povezave do politik na strani za prijavo morajo natančno ustrezati URL-jem, oddanim v kampanji. Od 30. junija 2026 Twilio za nove registracije kampanj prek API-ja zahteva namenska javna URL-ja za zasebnost in pogoje; tudi njegov tok v konzoli ju zbira. [Zahteva Twilia](https://www.twilio.com/en-us/changelog/a2p-10dlc-campaign-registration-will-require-privacy-policy-and-)

To so vsebinske zahteve, ki jih je treba uporabiti na dejanskih politikah vaše cerkve, ne nadomestilo za obstoječe prakse zasebnosti in ne splošna politika, ki bi jo prilepili brez preverjanja.

## 2. Registrirajte cerkev in njen program sporočil v Twiliu

1. Ustvarite ali uporabite **plačljiv račun v lasti cerkve** in lokalno številko v ZDA, ki podpira SMS. Pravno ime cerkve, EIN/podatke o registraciji, naslov, spletno stran in pooblaščenega zastopnika uporabljajte dosledno. Ne nadomeščajte podatkov s podatki podjetja ChurchApps ali druge cerkve.
2. Sledite Twilievemu postopku registracije blagovne znamke za neposredne stranke glede na dejanski pravni status cerkve. Za upravičeno neprofitno organizacijo uporabite [navodila za registracijo neprofitnih organizacij](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/onboarding-for-government-and-non-profit-agencies). Primeri dobrodelnosti/501(c)(3) so odvisni od upravičenosti; samo ime cerkve ne pomeni, da je Twilio odobril ali izjemo.
3. Ustvarite namenski Messaging Service in oddajte ustrezno kampanjo A2P 10DLC. Izberite primer uporabe, ki resnično ustreza dejanskim sporočilom in možnostim, ki so na voljo odobreni blagovni znamki; primeri tu ne predpisujejo univerzalne kode primera uporabe za cerkve.
4. Navedite javni URL za prijavo, URL-je politik, celoten opis tokov soglasja in sporočil ter zahtevane primere sporočil. Navedite vse dejanske načine prijave in uskladite izjave o vdelanih povezavah/telefonskih številkah z dejansko vsebino. Ne navajajte prijave s ključno besedo ali dvojne potrditve, če tak tok ne obstaja in ni preizkušen.
5. Povežite pošiljateljsko številko s storitvijo in odobreno kampanjo. Pred pošiljanjem počakajte na preverjeno kampanjo **in dokončano registracijo številke**.

Te korake izvedite v lastni konzoli Twilio vaše cerkve. Predlagana integracija B1 registracij za cerkve ne oddaja. Twilijev [hitri vodnik za registracijo](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/quickstart) in [vir kampanje](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) pojasnjujeta registracijska polja in stanje. Številka, ki čaka na registracijo, lahko pošiljanje blokira tudi potem, ko je kampanja odobrena. [Registracija številke](https://www.twilio.com/docs/api/errors/30035)

### Primer opisa kampanje

> Cerkev Grace Community Church prek programa Grace Church Updates pošilja obvestila o spremembah urnika bogoslužij, opomnike o cerkvenih dogodkih in obvestila o razporedu prostovoljcev osebam, ki se za ta program prijavijo na naši javni spletni strani. V okviru tega programa pošiljamo največ štiri sporočila na mesec. Prejemniki lahko sporočila kadarkoli ustavijo. Program ne vključuje kupljenih stikov, tretjih promocij ali poziva k donacijam.

Ta primer ustreza samo cerkvi, ki se resnično drži teh omejitev in izključitev. Če že opomniki prostovoljcem presegajo obljubljeno pogostost, pred oddajo spremenite zasnovo programa in obvestilo.

### Primer opisa toka sporočil

> Obiskovalci odprejo [dejanski URL prijave v cerkvi], vnesejo mobilno številko in neodvisno izberejo neobvezno potrditveno polje Grace Church Updates. Polje je ob odprtju obrazca neobkljukano. Obvestilo navaja cerkev Grace Community Church, opisuje spremembe bogoslužij, opomnike za dogodke in razporede prostovoljcev, navaja mesečno omejitev in možne cene ter pojasnjuje STOP in HELP. Prikazani povezavi do politike zasebnosti in pogojev za SMS vodita na [dejanski URL zasebnosti] in [dejanski URL pogojev za SMS]. Če se oseba ne prijavi na SMS, to ne preprečuje udeležbe, prijave na dogodek, darovanja ali uporabe splošnega obrazca za stik. B1 zabeleži potrditveno izbiro, telefonsko številko, čas oddaje in različico obvestila. Ta program pošiljamo samo dokumentiranim naročnikom in pred nadaljnjimi pošiljkami upoštevamo odjave.

Ta odstavek prilagodite dejansko implementiranemu toku. Če se uporablja potrditev po telefonu ali pregled osebja, opišite stanje čakanja in natančen korak aktivacije. Če se uporabljajo drugi načini, vključite vsakega in njegova dokazila. Če je prijava za prijavo, ki zahteva prijavo ali poteka na papirju, Twilio zahteva javna, redigirana dokazila o dejanski izkušnji privolitve; nikoli ne razkrivajte izpolnjenih obrazcev ali podatkov o članih. [Smernice za preverljivo privolitev](https://www.twilio.com/docs/api/errors/30923)

### Primeri odhodnih sporočil

To so izmišljeni vzorci za prilagoditev; pred oddajo uporabite dejanske URL-je cerkve in nadomestite oglate oklepaje. Twilijev API za kampanje sprejme dva do pet vzorcev. Vzorci morajo navajati cerkev, odražati navedeni namen in vključevati navodilo za odjavo. [Polja vzorca kampanje](https://www.twilio.com/docs/messaging/api/usapptoperson-resource)

```text
Grace Community Church: Nedeljsko bogoslužje se bo zaradi [razlog] začelo ob [čas]. Podrobnosti: [URL spletne strani cerkve]. Za prekinitev sporočil odgovorite STOP.
```

```text
Grace Community Church: Opomnik: [cerkveni dogodek] bo [datum] ob [čas]. Informacije: [URL cerkvenega dogodka]. Za prekinitev sporočil odgovorite STOP.
```

```text
Grace Community Church: Razporejeni ste za služenje v ekipi [ekipa] ta [dan]. Prosimo, preglejte svoj načrt: [URL cerkvenega portala B1]. Za prekinitev sporočil odgovorite STOP.
```

Oglati URL-ji opisujejo spremenljivke vzorca; oddani primeri morajo prikazovati pravo domeno cerkve in dejanski slog povezav. Povezava do načrta lahko zahteva prijavo, vendar morata biti stran za prijavo in politike, uporabljeni za preverjanje, javno dostopni. V vzorcih za odobritev ne navajajte zasebnih opomb, podatkov o otrocih ali osebnih podatkov članov. Vsebina vzorcev mora ustrezati temu, kar dejansko pošiljajo predloge B1; ne obljubljajte poštnega nabiralnika za odgovore ali določenega vedenja opomnikov, ki ni na voljo.

### Odgovori na STOP, START in HELP

Za te potrditve uporabite Twilio Messaging Service Advanced Opt-Out in prilagodite identiteto cerkve/programa ter podatke o podpori. Primer namena odgovorov:

- **STOP:** Potrdite, da je Grace Church Updates ustavljen, in pojasnite podprt način ponovnega vklopa.
- **START:** Potrdite ponovno začetek istega programa, vključno z njegovo identiteto, pogostostjo/cenami in navodili za pomoč ter ustavitev, kot jih zahteva konfiguriran tok.
- **HELP:** Navedite cerkev Grace Community Church ter dejanski kontakt za podporo in navodila za odjavo.

Če je Twilio že odgovoril, ne pošiljajte drugega potrdila iz B1. Odgovor HELP ni prijava. START ne sme nikogar prijaviti v dodatne cerkvene programe ali ga razkriti v imeniku članov. [Twilio Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

## 3. Preglejte paket za odobritev pred oddajo

- [ ] Pravni podatki cerkve za blagovno znamko, identiteta spletne strani in namen kampanje se ujemajo.
- [ ] Stran za prijavo in aktivni obrazec se v zasebnem brskalniku odprejo brez prijave, tudi na mobilni napravi.
- [ ] Potrditveno polje za SMS je privzeto neobkljukano in ga lahko oseba zavrne, medtem ko opravi glavno dejanje obiskovalca ali dogodka.
- [ ] Namen programa, pošiljatelj, dejanska pogostost, morebitni stroški, STOP, HELP, kontakt za podporo in klikabilne povezave do politik so prikazani ob izbiri SMS.
- [ ] Točna URL-ja za zasebnost in pogoje, oddana Twiliu, sta javna, delujeta brez poverilnic in navajata isto cerkev/program. Vsebina politik se ujema z dejansko obdelavo.
- [ ] Vsak vzorec sporočila ustreza programu, dejanski identiteti pošiljatelja in pričakovanemu vedenju povezav/telefonske številke. Kampanja opisuje vse dejanske načine privolitve.
- [ ] Redigirani posnetki zaslona prikazujejo prazen obrazec, potrditveno polje/obvestila in povezave do politik, kot jih bodo videli pregledovalci. Dokazila ne vsebujejo zapisov članov ali ključev.
- [ ] Cerkev ima operativen način za hrambo dokazil o soglasju in za upoštevanje odjav pred pošiljanjem, vključno z zahtevami, prejetimi po telefonu ali e-pošti.

Ti pregledi preprečijo izogibne neskladnosti; odločitev o odobritvi sprejmeta Twilio in njegovi partnerji za pregled. Dejanski URL-ji strani za prijavo in politik morajo biti na voljo tudi po odobritvi, ne samo med pregledom.

## 4. Povežite in preverite prihodnjo integracijo B1

Po izdaji integracije mora predlagana nastavitev Sporočanje v B1 zbrati Account SID cerkve, namenski API Key SID/skrivnost, ločen Auth Token za webhook, SID Messaging Service in izbranega pošiljatelja. Ključe ustvarjajte samo v konzoli cerkve, skrivnosti pa vnašajte samo v zasebne nastavitve B1. [Navodila za API ključe Twilia](https://www.twilio.com/docs/iam/api-keys)

Cerkvena URL-ja za dohodne webhook-e in webhook-e za stanje dostave, ki ju navede B1, kopirajte v ustrezno konfiguracijo storitve Twilio. Omogočite Advanced Opt-Out in preverite, ali dohodna sporočila dosežejo nastavljen webhook. B1 mora prikazati ločena preverjanja za poverilnice, lastništvo storitve/pošiljatelja, preverjeno kampanjo, dokončano registracijo številke, preverjanje dohodnih sporočil in uspešno testno dostavo. Shranjene poverilnice ali sprejeta API zahteva še nista končna dostava.

Če B1 registracijskega signala ne more preveriti programsko, ga potrdite neposredno v konzoli. Vmesnik mora datirani rezultat označiti kot potrjen s strani skrbnika. Pred omogočanjem produkcijskih sporočil rešite stanje čakanja ali neuspeha. Uporabite ločen, izrecno zahtevan test za pravega, privolitev dajajočega odraslega prejemnika testa, nato pa:

1. Potrdite, da ustrezna dokumentirana prijava ustvari pravilen zapis soglasja za telefon/program; zavrnitev ali sprememba telefona ne sme tiho prijaviti prejemnika.
2. Pošljite eno testno sporočilo, potrdite prejem in primerjajte stanje v B1 s Twilio SID sporočila in izidom dostave.
3. Odgovorite STOP in preverite, ali ročna sporočila, skupinska sporočila, delovni tokovi in opomniki preskočijo ta telefon. Vidnost v imeniku se ne sme spremeniti.
4. Preizkusite dokumentirani tok ponovne naročnine za isti program in odgovor HELP; preverite, da ni podvojenih potrditev in nobenih nepovezanih sprememb nastavitev.

## 5. Vzdržujte program

Določite lastnika v cerkvi, ki spremlja stanje kampanje/računa, opozorila o stanju in obračunu, napake pri pošiljanju ter dohodne odgovore v Twiliu. Predlagana prva izdaja B1 nima pogovornega SMS-predala, zato objavite in spremljajte dejanski kontakt za pomoč ter preverjajte odgovore, namesto da predpostavljate, da jih osebje vidi v B1.

Zgodovino soglasij in odjav, trenutne različice obvestil/politik, identifikatorje kampanj in redigirana dokazila za odobritev hranite v evidencah pod nadzorom cerkve. Ključev ali seznamov prejemnikov nikoli ne lepite v javne podporne zahtevke. Ko se spremenijo številka, storitev, poverilnice, tok prijave, pogostost ali namen, ponovno preverite integracijo in pred nadaljevanjem po potrebi posodobite registracijo ali soglasja. Skupne gospodinjske številke in spremenjene številke pregledujte skrbno; upravičenost sledi soglasju telefona in programa, ne evidenci vsakega člana družine.

Pri zavrnitvi preberite dejansko Twilio napako, odpravite točno nedoslednost tako na spletni strani kot v oddaji ter ponovno oddajte prek konzole cerkve. Pri nepregledanih ali čakajočih pošiljateljih počakajte na dokončanje registracije, namesto da bi menjali številke za zaobid. Uporabite [Twilijevo odpravljanje težav z registracijo](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands) in priloženi seznam kod napak. Ne obljubljajte fiksnega časa obdelave.
