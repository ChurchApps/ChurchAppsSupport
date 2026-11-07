---
title: "Delovni tokovi"
description: "V B1 Admin ustvarite table v slogu Kanban, ki vodijo ljudi skozi korake nadaljnjih dejanj, s samodejnimi e-poštnimi sporočili, SMS-i in sprožilci, ki ljudi dodajo samodejno."
---

# Delovni tokovi

<div class="article-intro">

Delovni tokovi premikajo ljudi skozi zaporedje korakov na vizualni tabli. Vsaka oseba postane kartica, ki potuje od enega koraka do naslednjega: od nadaljnjega sledenja obiskovalcu, ki je prvič prišel, do postopka včlanitve in zahvale darovalcu, ki daruje prvič, ter do vsega drugega, kjer morate spremljati veliko ljudi skozi iste faze. Korak lahko prostovoljca prosi, naj nekaj opravi (pokliče, se pogovori), **in** samodejno izvede dejanja, kot so pošiljanje e-pošte ali SMS-a, čakanje nekaj dni ali dodajanje osebe v skupino. Delovni tokovi tako pokrivajo tako osebno sledenje kot rutinska opravila okoli njega. Delovni tokovi razširjajo [Naloge](./tasks.md) v Kanban tablo, ki jo premikate z miško, da nihče ne ostane brez pozornosti.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Poskrbite, da osebe, ki jih želite spremljati, obstajajo v B1 Admin
- Seznanite se z delovanjem [Nalog](./tasks.md), saj je vsaka kartica na tabli naloga
- Za uporabo dejanja **Pošlji e-pošto** najprej ustvarite predloge e-pošte, ki jih želite pošiljati (upravljajo se pod **Nastavitve → Predloge e-pošte**)
- Za uporabo dejanja **Pošlji SMS** najprej povežite [ponudnika SMS-sporočil](../settings/church-settings.md#texting)
- Potrebujete ustrezno dovoljenje za naloge. Ogled, urejanje kartic in upravljanje delovnih tokov so ločene ravni dovoljenj (glejte [Vloge in dovoljenja](../settings/roles-permissions.md))

</div>

## Ogled delovnih tokov

Odprite [meni Skok](../introduction.md#getting-around-with-the-jump-menu) (iskalna vrstica v zgornjem levem kotu B1 Admin), razširite **Služenje** in kliknite **Delovni tokovi**. Vaši delovni tokovi so navedeni v tabeli, ki prikazuje **Kategorijo** in **Stanje** (**Aktiven** ali **Neaktiven**) vsakega. Če uporabljate kategorije, vam zavihki nad seznamom omogočajo filtriranje po kategoriji. Kliknite kateri koli delovni tok, da odprete njegovo tablo.

## Ustvarjanje delovnega toka

1. Na strani Delovni tokovi kliknite **Dodaj delovni tok**.
2. Izberite, kako začeti:
   - **Prazen delovni tok** -- začnite od začetka in sami zgradite korake.
   - **Iz predloge** -- začnite z vnaprej pripravljenim nizom korakov, ki ga lahko uredite. Vgrajene predloge vključujejo:
     - **Nadaljnje sledenje novemu obiskovalcu** -- Pošlji dobrodošlico po e-pošti → Osebni telefonski klic → Povabilo na naslednji korak → Povezan
     - **Tečaj za člane** -- Izrazite zanimanje → Prijava na tečaj → Udeležba na tečaju → Zaključite včlanitev
     - **Zahvala darovalcu, ki daruje prvič** -- Pošlji zahvalno sporočilo → Delite vpliv darovanja → Oskrbovan
     - **Potrditev dodelitve služenja** -- Zahtevajte in počakajte na odgovor → Pokličite prostovoljca glede neodgovorjene zahteve (glejte [Potrditve dodelitev služenja](#serving-assignment-confirmations))

   Gradnja korakov predloge lahko traja trenutek. Med tem gumb **Dodaj delovni tok** prikazuje **Ustvarjanje...** in ga ni mogoče ponovno klikniti, zato ne boste ustvarili podvojenega delovnega toka. Če gre kaj narobe, stran prikaže sporočilo *"Delovnega toka ni bilo mogoče ustvariti. Poskusite znova."*
3. Delovnemu toku dajte **Ime**.
4. Po želji dodelite **Kategorijo**, da združite sorodne delovne tokove. Novo kategorijo lahko ustvarite kar iz spustnega seznama.
   Za prazen delovni tok izberete tudi njegov **Namen delovnega toka**: **Nadaljnje sledenje osebam** (običajni primer) ali **Potrditev dodelitve služenja**. Namena po ustvarjanju delovnega toka ni mogoče spremeniti.
5. Pustite delovni tok **Aktiven**, da lahko vanj dodajate osebe, ali ga nastavite na **Neaktiven**, da ga skrijete s seznamov za dodajanje v delovni tok.
6. Kliknite **Shrani**.

:::tip
Na seznamu Delovnih tokov uporabite gumb **Podvoji**, da kopirate obstoječi delovni tok, vključno z njegovimi koraki, samodejnimi dejanji in usmerjanjem, kot izhodišče za novega.
:::

## Gradnja table s koraki

Vsaka tabla delovnega toka je sestavljena iz **korakov**, prikazanih kot stolpci od leve proti desni. Odprite delovni tok in uporabite **Dodaj korak**, da ustvarite vsako fazo vašega procesa.

Ko dodajate ali urejate korak, lahko nastavite:

- **Ime koraka** -- naslov stolpca (na primer "Dobrodošlni klic" ali "Čaka na prijavo").
- **Rok (dnevi)** -- samodejno nastavi datum roka, ko kartica vstopi v ta korak. Kartice, ki so prekoračile rok, so označene kot **Zamujeno**.
- **Privzeti nosilec** -- oseba ali skupina, ki ji se nove kartice tega koraka samodejno dodelijo. Če je privzeti nosilec oseba, prejme obvestilo, da ji je bila kartica dodeljena.
- **Samodejna dejanja** -- stvari, ki jih sistem izvede sam, ko kartica prispe (glejte spodaj).
- **Usmerjanje** -- kam gre kartica, ko zapusti korak (glejte [Usmerjanje](#routing-cards-with-outcomes-and-conditions)).

Stolpce korakov povlecite v vrstni red, ki ustreza vašemu procesu. Vrstni red določa tudi privzeto pot, ki jo kartica ubere, kadar ne velja nobeno drugo usmerjanje.

:::info
Najprej shranite nov korak. Samodejna dejanja in usmerjanje sta vezana na korak, zato urejevalnik ta razdelka odklene, ko korak obstaja.
:::

## Samodejna dejanja

Vsak korak lahko vsebuje seznam **samodejnih dejanj**, ki se izvedejo sama, takoj ko kartica **vstopi** v korak, preden se jih kdo dotakne. Tako korak hkrati poziva prostovoljca *in* poskrbi za rutinsko delo okoli sledenja.

V urejevalniku koraka odprite **Samodejna dejanja**, kliknite **Dodaj dejanje**, izberite vrsto in izpolnite nastavitve. Dodajte, kolikor jih potrebujete; izvedejo se **od zgoraj navzdol po vrstnem redu**. Kliknite **Shrani** pri koraku, da shranite korak in vsa njegova dejanja skupaj. Odstranitev dejanja z ikono koša začne veljati takoj.

| Dejanje | Kaj naredi |
|---|---|
| **Pošlji e-pošto** | Osebi pošlje izbrano predlogo e-pošte. Predmet lahko prepišete. |
| **Pošlji SMS** | Osebi pošlje sporočilo, ki ga napišete, prek [ponudnika SMS-sporočil](../settings/church-settings.md#texting) vaše cerkve. |
| **Počakaj** | Zadrži kartico za določeno število dni, preden nadaljuje (glejte spodaj). |
| **Dodaj v skupino** | Doda osebo v izbrano [skupino](../groups/index.md). |
| **Odstrani iz skupine** | Odstrani osebo iz izbrane skupine. |
| **Zabeleži udeležbo** | Označi osebo kot prisotno na bogoslužju skupine, ki poteka (glejte spodaj). |
| **Dodaj v delovni tok** | Začne osebo v drugem delovnem toku, uporabno za prenos med procesi. |
| **Dodaj opombo** | Zabeleži opombo v zgodovini kartice. |
| **Nastavi polje** | Posodobi polje v zapisu osebe: Stanje članstva, Zakonski stan, Spol, Mesto, Država ali Poštna številka. |
| **Webhook** | Pošlje podatke o kartici na zunanji spletni naslov (URL), ki ga navedete, za povezavo z drugimi sistemi. |
| **Ustvari nalogo** | Ustvari [nalogo](./tasks.md) z naslovom in opisom, ki ju vnesete, dodeljeno komur izberete. |
| **Obvesti osebo** | Izbranemu članu osebja ali prostovoljcu pošlje e-pošto in obvestilo v B1 o kartici (glejte spodaj). |

Ko se vsa dejanja koraka zaključijo, kartica **ostane na tem koraku**, da jo oseba lahko obdela, razen če korak nima samodejne poti, ki jo premakne naprej (glejte [Popolnoma samodejni koraki](#fully-automated-steps)).

:::info
Samodejna dejanja se izvedejo le, ko kartica prispe po običajnem toku: ko je prvič dodana, ko jo prinese rezultat ali samodejna pot ali po koncu čakanja. **Ne** izvedejo se znova, ko član osebja kartico ročno povleče na korak ali jo vrne, zato oseba ne prejme iste e-pošte dvakrat.
:::

### Pošiljanje e-pošte

Izberite **Pošlji e-pošto**, izberite eno od svojih predlog e-pošte in po želji vnesite predmet po meri. Ko kartica vstopi v korak, oseba samodejno prejme to e-pošto. (Če oseba nima naslova e-pošte v evidenci, korak to dejanje preskoči.) [Polja za združevanje](../settings/email-templates.md#merge-fields) v predlogi, kot je `{{firstName}}`, se zapolnijo s podatki same osebe.

Ko e-pošta odide, zgodovina kartice zabeleži **E-pošta poslana**. Če je ni mogoče poslati, na primer zato, ker e-pošta vaše cerkve še ni odobrena ali je bila dosežena dnevna omejitev, se vnos "E-pošta poslana" ne doda.

:::info
E-pošta delovnih tokov odide šele, ko je vaša cerkev odobrena za pošiljanje skupinske e-pošte, in šteje v dnevno omejitev e-pošte vaše cerkve. Glejte [Vklop skupinske e-pošte za vašo cerkev](../groups/group-members.md#turning-on-group-email-for-your-church). Dejanje **Pošlji e-pošto** vas v urejevalniku koraka opozori, kadar e-pošta ne bo odšla: *"E-pošta vaše cerkve še ni bila odobrena..."*, če odobritev še čaka, ali *"E-pošta vaše cerkve je začasno ustavljena..."*, če so nedavna sporočila zavrnjena ali prijavljena kot neželena.
:::

### Zabeleževanje udeležbe

Izberite **Zabeleži udeležbo** in kliknite **Izberi skupino**, da izberete skupino, katere udeležbo je treba zabeležiti. Ko se dejanje izvede, je oseba označena kot prisotna na bogoslužju te skupine, ki poteka, enako kot če bi se prijavila. To je uporabno s sprožilcem, ki osebe dodaja v delovni tok ob prihodu, tako da se štejejo brez ločene prijave.

- Udeležba se meri v trenutku, ko je bila kartica **ustvarjena**, zato **Počakaj** prej v delovnem toku kartice ne bo premaknil čez čas bogoslužja.
- Šteje se le čas bogoslužja z dnevom in začetno uro. Če nobeden od časov bogoslužja skupine v tistem trenutku ne poteka, se nič ne zabeleži, zgodovina kartice pa zapiše **Ni načrtovanega bogoslužja v teku — udeležba ni zabeležena**.
- Ko je udeležba zabeležena, zgodovina kartice prikaže **Udeležba zabeležena**, ji sledi ime skupine. Ponovni zagon dejanja za isto bogoslužje osebe ne šteje dvakrat.

### Obveščanje osebe

Izberite **Obvesti osebo**, kliknite **Izberi osebo** in po želji vnesite **Sporočilo**. Ko kartica vstopi v korak, ta oseba prejme e-pošto in obvestilo v B1 z imenom osebe na kartici, imeni delovnega toka in koraka, vašim sporočilom ter povezavo za odpiranje kartice. Uporabite ga, da član osebja ali vodja službe dobi vnaprejšnje obvestilo, na primer: *"Obvesti pastorja, ko nekdo doseže korak Razgovor za članstvo."* Zgodovina kartice zabeleži **Obveščen/a** in ime osebe.

### Pošiljanje SMS-a

Izberite **Pošlji SMS** in vnesite **Besedilo sporočila** (do 1.600 znakov). Ko kartica vstopi v korak, oseba prejme to besedilo na svoj mobilni telefon. Če želite sporočilo personalizirati, kliknite čip pod poljem za sporočilo (**Ime**, **Priimek**, **Prikazno ime** ali **Ime cerkve**), da se na vaš kazalec vstavi `{{firstName}}`, `{{lastName}}`, `{{displayName}}` ali `{{churchName}}`. Ob pošiljanju se vsako polje zapolni s podatki osebe.

- Če oseba nima mobilne številke v evidenci, SMS ni poslan, zgodovina kartice pa zabeleži **SMS preskočen: ni mobilne številke**.
- Če se je oseba odjavila, SMS ni poslan, zgodovina kartice pa zabeleži **SMS preskočen: odjavljen/a**.
- Ko SMS odide, zgodovina kartice zabeleži **SMS poslan**. Če pošiljanje ne uspe, na primer zato, ker ni povezanega ponudnika SMS-sporočil ali vaša cerkev nima več kreditov za SMS, je napaka zabeležena v zgodovini kartice, preostala dejanja koraka pa se še izvedejo.

:::warning
SMS-sporočila se pošiljajo prek [ponudnika SMS-sporočil](../settings/church-settings.md#texting) vaše cerkve. Če ni povezan noben ponudnik, urejevalnik dejanj opozori *"Ponudnik SMS-sporočil ni nastavljen"* in SMS-sporočila ne bodo poslana.
:::

### Čakanje nekaj dni (zaporedja kapljanja)

Dejanje **Počakaj** zadrži kartico za število dni, ki jih nastavite. Med čakanjem je kartica prikazana kot **Odložena**. B1 preverja zaključene čakalne dobe vsakih 30 minut, zato se kartica nadaljuje v dobrih pol ure po koncu čakanja. Ko čakanje poteče:

1. Izvedejo se vsa **preostala dejanja na istem koraku**, tako lahko sestavite zaporedje kot **Pošlji e-pošto → Počakaj 3 dni → Pošlji e-pošto z opomnikom**.
2. Nato, če ima korak samodejno pot, kartica gre naprej. Sicer ostane na koraku, da jo oseba prevzame.

:::tip
**Počakaj** na samem začetku koraka je preprost način, kako "zadržati" kartico, preden pride do prostovoljca, na primer *Počakaj 7 dni, nato se oglasi trener*.
:::

## Dodajanje oseb kot kartic

Osebe na tablo lahko dodate na več načinov:

- **S table** -- Kliknite **Dodaj kartico** na dnu stolpca koraka in izberite osebo. Izberete lahko tudi skupino, pri čemer se vsak član te skupine doda kot kartica.
- **Iz zapisa osebe** -- Na strani osebe uporabite **Dodaj v delovni tok**, da jo postavite na delovni tok.
- **Iz iskanja oseb** -- Izberite več oseb in z množičnim dejanjem **Dodaj v delovni tok** jih dodajte vse naenkrat.
- **Samodejno s sprožilcem** -- Dodajte osebe, ko se nekaj zgodi, kot je oddan obrazec ali prvo darilo (glejte [Sprožilce](#triggers) spodaj).

Ročno dodajanje osebe ali dodajanje z dejanjem **Dodaj v delovni tok** ji nikoli ne dodeli druge odprte kartice na istem delovnem toku. Če že ima odprto kartico, je preskočena (pri množičnem dodajanju dobijo nove kartice le osebe brez nje). Ko je njena kartica zaprta, jo lahko ponovno dodate. Sprožilci namesto tega upoštevajo svojo nastavitev **Samo enkrat na osebo**.

## Delo na tabli

Odprite delovni tok, da vidite njegovo tablo. Vsaka kartica prikazuje ime osebe, komu je dodeljena, ter čip z rokom ali stanjem (**Zamujeno** ali **Odloženo**). Stolpec koraka prikazuje tudi majhne značke za samodejna dejanja, ki jih izvede, in oznake za njegovo usmerjanje, kar vam daje pregled nad tokom kartic.

- **Premaknite kartico** -- Povlecite kartico iz enega stolpca v naslednjega, ko oseba napreduje.
- **Odprite kartico** -- Dvakrat kliknite kartico (ali kliknite nanjo), da odprete njen podrobni predal, kjer lahko spremenite korak, jo znova dodelite, dodate opombe in pregledate, kaj se je že zgodilo.

V predalu kartice lahko:

- **Dodelite** kartico drugi osebi ali skupini.
- **Odložite** kartico za 1 dan, 3 dni ali 1 teden, da začasno skrijete njen rok.
- **Pošljite nazaj** na prejšnji korak ali **Preskočite** na naslednjega.
- **Zaklenite dodelitev** -- ohranite istega nosilca na kartici, tudi ko se premika med koraki. Privzeto premik kartice na nov korak kartico ponovno dodeli privzetemu nosilcu tega koraka. Zaklenitev ohrani trenutno odgovorno osebo ves čas.
- **Zaključite** kartico, da jo dokončate, ali izberite gumb **Rezultat**, če so za korak nastavljeni rezultati (glejte [Usmerjanje](#routing-cards-with-outcomes-and-conditions)).
- **Odstranite kartico** -- odstranite kartico s table, ne da bi jo dokončali, na primer, ko je bila oseba dodana po pomoti. Po potrditvi je kartica zaprta in odstranjena s seznamov vseh. Nobeni rezultati, poti ali dejanja koraka se ne izvedejo, njena zgodovina pa se ohrani z vnosom **Odstranjeno**. Pri [kartici potrditve dodelitve služenja](#serving-assignment-confirmations) odstranitev zaključi zahtevo na enak način.
- **Dodajte opombe** in pregledate **Aktivnost** kartice, dnevnik samodejnih dejanj, ki so se izvedla (poslane e-pošte, čakanja itd.), vsako z datumom in uro.

Za kartico o osebi predal prikazuje tudi njeno mobilno številko in e-pošto kot povezave, na katere lahko kliknete, da jo pokličete ali pišete, ter povezavo **Ogled profila**, če imate dovoljenje za ogled oseb. Oseba, ki ji je kartica dodeljena, vidi telefon in e-pošto tudi brez dostopa do Oseb.

Opombe se shranijo s kartico. Kdorkoli lahko odpre kartico, vključno z osebo ali skupino, ki ji je dodeljena, lahko bere opombe in doda svoje. Osebe, ki ne morejo odpreti kartice, ne vidijo njenih opomb.

### Množična dejanja

Označite potrditvena polja na več karticah, da z njimi delujete skupaj. Če želite izbrati vse kartice na koraku naenkrat, označite polje **Izberi vse** v glavi stolpca tega koraka. Ponovno ga označite, da izbiro počistite. Pojavi se orodna vrstica, ki vam omogoča, da za vse izbrane kartice hkrati **Zaključite**, **Odložite**, **Dodelite** (ponovna dodelitev) ali **Premaknete v…** drug korak.

## Usmerjanje kartic z rezultati in pogoji

Usmerjanje določa, kam gre kartica, ko zapusti korak. Odprite urejevalnik koraka, da nastavite dve vrsti usmerjanja.

### Gumbi za rezultate

Rezultati so gumbi, prikazani v predalu kartice, ko kartico zaključujete na tem koraku. Namesto enega samega gumba **Zaključi** lahko ponudite izbire, kot sta "Pridružil/a se skupini" ali "Ni zanimanja". Vsak rezultat lahko:

- Pošlje kartico na **drug korak** v tem delovnem toku,
- **Prenese kartico** v popolnoma drug delovni tok, ali
- **Zapre** kartico.

To omogoča, da ena odločitev osebo usmeri po različnih poteh.

### Samodejno usmerjanje (pogojno)

Samodejne poti premaknejo kartico naprej **takoj, ko vstopi v korak** (in ko se njegova samodejna dejanja zaključijo), brez klika kogarkoli, če oseba ustreza nizu pogojev. Dodajte pot, izberite ciljni korak in določite enega ali več **pogojev** (na primer kampus osebe, starost ali stanje članstva). Besedilna polja se lahko ujemajo natanko ali z **vsebuje**, **se začne z** ali **se konča z**. Pot brez pogojev ustreza vsem.

Pogoji datuma (Današnji datum, Datum rojstva ali Obletnica) lahko primerjajo celoten datum ali le njegov del: dan v tednu, **Dan v mesecu**, **Mesec** ali preteklo število let. Pri datumu rojstva ali obletnici osebe ponuja **Dan v mesecu** relativno možnost **Danes**, tako da pogoj *Datum rojstva · Dan v mesecu = Danes* ustreza osebam, katerih rojstni dan pade na današnji dan v mesecu. **Mesec** ponuja **Prejšnji mesec**, **Tekoči mesec** in **Naslednji mesec**. Takšne relativne vrednosti se izračunajo po časovnem pasu vaše cerkve, zato se ujemajo z dnevom v koledarju vaše cerkve, ne pa s časom strežnika.

Skupina pogojev **Darovanje** ima **Prenehal/a redni dajalec**, ki najde osebe, ki so prej redno dajale in nato nehale. Nastavite tri števila: *Daroval/a vsaj* **3** *od zadnjih* **12** *tednov, nato nič v zadnjih* **3** *tednih* (to so privzete vrednosti). Tedni se štejejo nazaj od danes po časovnem pasu vaše cerkve, vrnjeno darilo pa se ne šteje. Najkoristnejši je pri [urnem sprožilcu](#schedule-triggers), na primer tedenskem pravilu, ki doda osebe, ki so prenehale darovati, na tablo za pastoralno skrb. Pogoj gleda le datume daril, nikoli zneske, kartice in opozorila pa zneskov nikoli ne prikazujejo. Ker razkriva, kdo je nehal darovati, to možnost vidijo in lahko dodajo, spremenijo ali odstranijo le osebe, ki lahko pregledujejo darove.

Če pogojev poti iz kakršnega koli razloga ni mogoče preveriti, se pot šteje kot neustrezna. Kartica ostane na koraku (ali sledi drugi poti, ki ustreza), namesto da bi obtičala.

:::info
Na tabli vsak stolpec koraka prikazuje majhne oznake, ki opisujejo njegovo usmerjanje, na primer oznako rezultata ali "če ustreza", ki mu sledi puščica do ciljnega koraka ali delovnega toka.
:::

## Popolnoma samodejni koraki

Korak lahko naredite popolnoma samostojen, brez da bi ga kdo obdeloval. Dajte koraku njegova **samodejna dejanja** in dodajte **samodejno pot** (brez pogojev), ki kaže na naslednji korak. Ko kartica vstopi, se dejanja izvedejo, nato pa pot kartico takoj premakne naprej.

:::tip
Kombinirajte to s **Počakaj**: *Pošlji dobrodošlo e-pošto → Počakaj 3 dni → samodejno premakni na korak "Osebni klic"*. E-pošto in čas poskrbi sistem, prostovoljec pa kartico vidi šele, ko je čas za človeški stik.
:::

## Sprožilci

Sprožilci samodejno dodajajo osebe v delovni tok, ko se nekaj zgodi, zato vam ni treba kartic dodajati ročno. Na tabli delovnega toka kliknite zavihek **Sprožilci**, nato **Dodaj sprožilec**. Obstajata dve vrsti.

### Dogodkovni sprožilci

Sprožijo se takoj, ko se zapis v B1 spremeni. Izberite dogodek in po želji dodajte **pogoje**, da se dodajo le ustrezne osebe:

- **Oseba · Ustvarjena / Posodobljena** -- npr. dodajte vsakogar, čigar stanje postane *Obiskovalec* ali *Gost* (stanje, ki ga dobijo osebe, ki se same registrirajo).
- **Darilo · Ustvarjeno** -- npr. dodajte prvo ali veliko darilo v delovni tok za zahvalo (ujemanje po znesku, skladu ali načinu).
- **Skupina · Član se je pridružil** / **Skupina · Ustvarjena**.
- **Obrazec · Oddan** -- dodajte vsakogar, ki odda izbrani obrazec (odlično za kartico "Sem nov/a" ali "Povežimo se").

### Urni sprožilci

Izvajajo se ponavljajoče (dnevno, tedensko, mesečno ali letno) glede na niz pogojev. Uporabite jih za časovno odvisna sporočila, kot je *vsakdo, katerega rojstni dan je danes* (Datum rojstva · Dan v mesecu = **Danes**, z mesecem, ki ustreza **Tekoči mesec**), ali *mesečni* pregled. Tudi brez **Samo enkrat na osebo** urni sprožilec iste osebe ne bo dodal znova v enem obdobju ponavljanja (dan, teden, mesec ali leto, odvisno od pogostosti izvajanja).

Za vsak sprožilec lahko nastavite tudi:

- **Začetni korak**, na katerega pride nova kartica (privzeto prvi korak).
- **Samo enkrat na osebo**, da ista oseba ne bo dodana v delovni tok dvakrat prek sprožilca. Če je to vklopljeno, je vsakdo, ki že ima kartico na tem delovnem toku, preskočen.
  - **Dodaj znova po zaprtju njihove kartice**, prikaže se, ko je vklopljeno **Samo enkrat na osebo**. Označite, da sprožilec osebo ponovno doda, ko je njena prejšnja kartica na tem delovnem toku zaprta. Oseba še vedno nikoli ne more imeti dveh odprtih kartic na delovnem toku hkrati. Uporabite za stvari, ki se lahko zgodijo večkrat, kot sta vračajoči se obiskovalec ali letni postopek.
- **Aktiven**, vklop ali izklop sprožilca brez brisanja.

:::tip
Sprožilec **Obrazec · Oddan** povežite s predlogo **Nadaljnje sledenje novemu obiskovalcu**, da vaš obrazec "Kartica za povezavo" ali "Sem nov/a" postane samodejni nadaljnji postopek.
:::

## Potrditve dodelitev služenja

Posebna vrsta delovnega toka lahko sledi [zahtevam za služenje](./plans.md#assigning-team-members), dokler vsak prostovoljec ne sprejme ali zavrne. Namesto oseb vsaka kartica na tej tabli spremlja **eno dodelitev**, to je eno osebo na enem položaju v enem načrtu. Dve vlogi ali dve storitvi za isto osebo imata ločeni kartici. To je izbirno: za načrt se nič ne spremeni, dokler v njegovih nastavitvah ne izberete delovnega toka za potrditev.

### Nastavitev

1. Na strani Delovni tokovi kliknite **Dodaj delovni tok** in izberite predlogo **Potrditev dodelitve služenja**. (Ali začnite s **Prazen delovni tok** in nastavite njegov **Namen delovnega toka** na **Potrditev dodelitve služenja**.) Ustvarjanje iz predloge zahteva dovoljenje za pošiljanje SMS-ov, ker vključuje korak s SMS-om.
2. Preglejte korake. Predloga se začne z:
   - **Zahtevajte in počakajte na odgovor** -- pošlje zahtevo za služenje po e-pošti in SMS-u, počaka 2 dni, pošlje opomnik po e-pošti, počaka še 1 dan in nato kartico samodejno premakne naprej.
   - **Pokličite prostovoljca glede neodgovorjene zahteve** -- korak, na katerem oseba pokliče prostovoljca, z rokom čez 1 dan. Nastavite **Privzetega nosilca** na tem koraku. Če ga nima, kartica gre k vodji službe ali, če je ni, v ekipo službe.
3. Uredite čakalne dobe, sporočila in korake, da ustrezajo vaši cerkvi.
4. Odprite [nastavitve načrta](./plans.md#plan-settings) in pod **Delovni tok za potrditev** izberite ta delovni tok.

Ti delovni tokovi namesto **Pošlji e-pošto** in **Pošlji SMS** uporabljajo dejanje **Pošlji zahtevo za služenje**. Izberite **E-pošta** ali **Sporočilo SMS** in po želji napišite **Sporočilo zahteve**. Zahteva vedno vključuje vlogo, načrt, datum službe in povezavo za odgovor. V svojem sporočilu lahko uporabite `{{planName}}`, `{{positionName}}` in `{{serviceDate}}`. Če sporočilo pustite prazno, se uporabi privzeta zahteva. Veljajo nastavitve obveščanja prostovoljcev, njihovo soglasje za SMS, vaš ponudnik SMS-sporočil in odobritev e-pošte vaše cerkve. Vsak preskočen ali blokiran poskus je zabeležen na kartici. Dejanja **Pošlji e-pošto**, **Pošlji SMS** in **Dodaj v delovni tok** na teh tablah niso na voljo.

Zavihek **Sprožilci** na delovnem toku za potrditev razlaga, kako se kartice začnejo, namesto da bi ponujal sprožilce. Ti delovni tokovi se tudi ne prikazujejo na seznamih **Dodaj v delovni tok** za osebe.

### Kako se kartice začnejo in zaprejo

- Kartice se začnejo, ko **Obvestite** prostovoljce na objavljenem načrtu (glejte [Obveščanje prostovoljcev](./plan-validation.md#notifying-volunteers)). Vsaka nova, neodgovorjena dodelitev dobi eno kartico. Shranjevanje, objava, kopiranje ali samodejno zapolnjevanje načrta samo po sebi nikogar ne kontaktira, načrti v osnutku (označeni s svinčnikom) pa ne pošljejo ničesar.
- Prostovoljci še vedno prejmejo običajno opozorilo v aplikaciji. Nadaljnje sledenje po e-pošti in SMS-u prihaja iz delovnega toka.
- Ko prostovoljec **sprejme ali zavrne**, se njegova kartica samodejno zapre, skupaj z morebitnimi nalogami za nadaljnje sledenje, povezanimi z njo.
- Predal kartice prikazuje položaj, datum službe in povezavo do načrta. Namesto **Zaključi** gumb piše **Zabeleži opravljeno sledenje**. Ko ga kliknete, se zabeleži, da je bilo sledenje opravljeno, kartica pa ostane odprta in dodeljena (prikazano kot **Čaka na odgovor**), dokler prostovoljec ne odgovori ali dokler ne poteče rok za odgovor.
- Rok za odgovor je konec zadnjega časa bogoslužja, v katerem ekipa položaja služi. Če načrt nima ustreznih časov, je to konec službenega dne. Če nihče ni odgovoril do takrat, se kartica zapre z **Rok za odgovor je potekel**, nalogo **Pregled neodgovorjene zahteve za služenje** pa dobi trenutni nosilec kartice ali vodja službe, da se lahko kdo odloči, kako pokriti mesto. Dodelitev ostane **Nepotrjena**.
- Odstranitev dodelitve, sprememba njene osebe, položaja ali datuma načrta, vrnitev načrta v osnutek ali preklop načrta na drug delovni tok za potrditev zapre kartico. Zaprte kartice ne ponovno odpre noben drug **Obvesti**. Za pošiljanje nove zahteve dodajte novo dodelitev.

:::info
Pri zahtevah, poslanih prek delovnega toka za potrditev, [opomniki prostovoljcem](./plans.md#volunteer-reminders) gredo le prostovoljcem, ki so **sprejeli**, tako da ljudje, ki čakajo na odgovor, ne dobijo opomnikov poleg nadaljnjih sledenj delovnega toka.
:::

## Moje kartice

Prostovoljcem in članom osebja ni treba pregledovati vsake table, da bi našli svoje delo. Seznam **Moje kartice** na strani **Moje delo** prikazuje vsako kartico, dodeljeno trenutnemu uporabniku, na vseh delovnih tokovih. Do njega pridete s klikom na **Moje kartice** na vrhu strani Delovni tokovi ali z odpiranjem **Služenje > Moje delo** v meniju Skok. Klik na kartico odpre njen podrobni panel kar na strani Moje delo, kjer lahko z njo delate ali jo odstranite, ne da bi zapustili stran. Če lahko pregledujete delovne tokove, ima panel tudi povezavo **Odpri tablo delovnega toka** do table, ki ji kartica pripada.

## Poročila

Odprite delovni tok in kliknite **Poročila**, da vidite analitiko za ta delovni tok:

- **Zamujeno** -- število kartic, ki so prekoračile rok.
- **Kartice po koraku** -- koliko kartic trenutno leži na vsakem koraku, prikazano kot stolpični grafikon.
- **Zaključeno (30 dni)** -- pretok v zadnjih 30 dneh, prikazan kot črtni grafikon.

S temi podatki odkrijte ozka grla, na primer korak, na katerem se kartice kopičijo in nikoli ne napredujejo.

## Sorodni članki

- [Naloge](./tasks.md) -- posamezne postavke, na katerih temeljijo kartice delovnih tokov
- [Obrazci](../forms/index.md) -- izdelava obrazcev, ki lahko sprožijo delovne tokove
- [Skupine](../groups/index.md) -- skupine, v katere lahko dejanje "Dodaj v skupino" postavi osebe
- [Načrti služenja](./plans.md) -- izbira delovnega toka za potrditev zahtev za služenje v načrtu
- [Vloge in dovoljenja](../settings/roles-permissions.md) -- nadzor, kdo lahko pregleduje, ureja in upravlja delovne tokove
