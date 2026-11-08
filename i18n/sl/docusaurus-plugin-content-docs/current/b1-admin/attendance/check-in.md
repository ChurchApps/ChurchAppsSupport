---
title: "Nastavitev samoprijave z aplikacijama B1 Checkin in B1 Admin"
sidebar_label: "Prijava"
description: "Nastavite samoprijavo za bogoslužja z aplikacijo B1 Checkin v B1 Admin, vključno z napravami, računi za kiosk, urniki, blagovno podobo in prijavo gostov prek kode QR."
---

# Prijava

<div class="article-intro">

B1 Admin omogoča samoprijavo ob bogoslužjih prek spremljevalne aplikacije **B1 Checkin**. Člani se lahko ob prihodu sami prijavijo sebe in svojo družino na kioskih ali namenskih napravah, s čimer je postopek hitrejši in se zmanjša obremenitev vaših prostovoljcev. Vsaka prijava se samodejno zabeleži kot prisotnost.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Vaše kampuse, čase bogoslužij in skupine morate nastaviti v [Nastavitvah prisotnosti](setup.md).
- Potrebujete [osebe v vaši bazi podatkov](../people/adding-people.md) z nastavljenimi [gospodinjstvi](../people/adding-people.md#managing-households), da se lahko družine prijavijo skupaj.
- Potrebovali boste tablični računalnik in po želji tiskalnik nalepk Brother (glejte [priporočila o strojni opremi](#recommended-hardware) spodaj).

</div>

## Kako deluje

Aplikacija B1 Checkin se poveže z vašo nastavitvijo prisotnosti v B1 Admin. Ko se član prijavi, se njegova prisotnost samodejno zabeleži za pravilni kampus, čas bogoslužja in skupino. Za osebe, ki uporabljajo sistem prijave, prisotnosti ni treba vnašati ročno.

## Nastavitev prijave

1. **Najprej nastavite strukturo prisotnosti.** V B1 Admin pojdite na **Osebe > Prisotnost** in kliknite **Nastavitve**, da zagotovite, da so vaši kampusi, časi bogoslužij in skupine pripravljeni. Aplikacija za prijavo se opira na to konfiguracijo. Po želji lahko vsakemu času bogoslužja dodelite [urnik prijave](setup.md#setting-a-check-in-schedule), tako da se prijava vsak teden samodejno odpre in zapre. Urniki uporabljajo časovni pas kampusa bogoslužja oziroma časovni pas vaše cerkve, če kampus nima nastavljenega svojega. Kiosk čase bogoslužij, katerih časovno okno je zaprto, prikaže kot **Zaprto** in družinam sporoči, kdaj se prijava odpre. Podrobnosti najdete v [Nastavitvah prisotnosti](setup.md).
2. **Namestite aplikacijo B1 Checkin** na naprave, ki jih nameravate uporabljati. Aplikacija je na voljo na naslednjih platformah:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/tablice Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **tablice Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Prijavite se v aplikacijo B1 Checkin** z računom, ki ima dovoljenje za prijavo prisotnosti (**Checkin**) ali dovoljenje **Urejanje prisotnosti**. Glejte [Računi za kiosk za prijavo](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Izberite kampus in čas bogoslužja** za trenutno srečanje.
5. Člani lahko zdaj na napravi poiščejo svoje ime in se prijavijo.

:::tip
Naprave za prijavo postavite na vidna in lahko dostopna mesta, na primer ob vhodih v preddverje ali na pult za dobrodošlico. Kratko napoved med bogoslužji članom pomaga vedeti, da ta možnost obstaja.
:::

:::tip
Če ima vaša cerkev več kampusov, morate nastavitev ponoviti za vsak kampus v [Nastavitvah prisotnosti](setup.md). Vsako napravo za prijavo lahko nastavite za drug kampus.
:::

## Priporočena strojna oprema

**Tablični računalniki** — z aplikacijo dobro delujejo vsi ti:

- **Kompaktni:** Samsung Galaxy Tab A7 Lite 8.7"
- **Velik zaslon:** Samsung Galaxy Tab A8 10.5"
- **Cenovno ugoden:** Amazon Fire HD 10

**Tiskalniki** — prijave delujejo s tiskalniki nalepk Brother za tiskanje imenskih značk:

- **Najboljši:** Brother QL-1110NWB (podpira več tabličnih računalnikov prek Bluetootha in WiFi)
- **Dober:** Brother QL-810W (podpira več tabličnih računalnikov prek WiFi)
- **Cenovno ugoden:** Brother QL-1100 (samo WiFi)

**Nalepke:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Z aplikacijo B1 Checkin so združljivi samo tiskalniki nalepk Brother. Tiskalniki drugih blagovnih znamk ne bodo delovali za tiskanje imenskih značk.
:::

:::info
Sledite navodilom za nastavitev tiskalnika, da ga povežete z istim omrežjem WiFi kot vaš tablični računalnik. Gonilnike in navodila za nastavitev tiskalnikov Brother najdete na [spletnem mestu za podporo Brother](https://support.brother.com).
:::

## Prilagajanje videza kioska

Videz aplikacije B1 Checkin lahko prilagodite svoji cerkveni blagovni podobi. V B1 Admin pojdite na **Mobilno > B1 CheckIn** in v kartici **Tema kioska** nastavite:

### Barve

Prilagodite osem barvnih nastavitev, da se ujemajo z blagovno podobo vaše cerkve:

- **Primarna** in **Primarna kontrastna** -- glavna barva blagovne znamke in njena barva besedila.
- **Sekundarna** in **Sekundarna kontrastna** -- poudarjena barva in njena barva besedila.
- **Ozadje glave** in **Ozadje podglave** -- barve za glavna območja kioska.
- **Ozadje gumbov** in **Besedilo gumbov** -- barve za interaktivne gumbe.

### Slika ozadja

Za zaslone dobrodošlice in iskanja v kiosku lahko naložite izbirno sliko ozadja. Priporočena velikost je 1920x1080 slikovnih pik.

### Zaslon v mirovanju / ohranjevalnik zaslona

Nastavite ohranjevalnik zaslona, ki se aktivira po obdobju nedejavnosti:

1. Zaslon v mirovanju **vklopite** ali **izklopite**.
2. Nastavite **časovno omejitev** (koliko sekund nedejavnosti pred začetkom ohranjevalnika zaslona, najmanj 10 sekund).
3. Dodajte eno ali več **diapozitivov** -- vsak diapozitiv ima sliko in trajanje prikaza (najmanj 3 sekunde).

:::tip
Zaslon v mirovanju uporabite za prikaz napovedi, prihajajočih dogodkov ali pozdravnih sporočil, kadar kiosk ni aktivno v uporabi.
:::

## Prijava gostov prek kode QR

Kiosk za prijavo lahko prikaže kodo QR, ki jo obiskovalci optično preberejo in se na svojem telefonu sami prijavijo sebe in svojo družino. To pospeši prijavo za goste, ki so prvič tukaj.

Ko gost optično prebere kodo QR, ga odpre [stran za prijavo gostov](../../b1-church/checkin/guest-registration.md), kjer vpiše imena svoje družine in druge podatke, ki jih želite zbrati. Prostovoljec ga nato lahko poišče na kiosku in ga prijavi.

### Vklop prijave gostov prek kode QR

Če želite vklopiti prikaz kode QR:

1. V B1 Admin odprite [meni Jump](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje v zgornjem levem kotu) in razširite **Mobilno**.
2. Kliknite **B1 CheckIn**.
3. Vklopite **Prijava gostov prek kode QR** in kliknite **Shrani**.

:::note
Ta nastavitev je pod **Mobilno > B1 CheckIn** (na isti strani kot kartica **Tema kioska**), ne pod Prisotnostjo. Ukaz **Kiosk** na strani Prisotnost ima povezavo na to stran.
:::

Ko je preklop vklopljen, se ostale možnosti spodaj prikažejo na isti kartici **Prijava gostov prek kode QR**. Po spremembi katere koli od njih kliknite **Shrani** na kartici.

### Izbira polj za prijavo

Seznam **Polja za prijavo** določa, kaj obrazec za prijavo zahteva. **Ime** in **Priimek** sta vedno na obrazcu in vedno obvezna za vsakega člana družine. Pri vsakem drugem polju vklopite **Vključi**, da ga dodate na obrazec, nato vklopite **Obvezno**, če ga morajo gostje izpolniti. **Obvezno** lahko vklopite samo za vključeno polje, izklop **Vključi** pa ga počisti.

| Polje | Vpraša se | Privzeto vključeno |
|-------|-----------|---------------------|
| **Naziv** | Za vsakega člana družine, kot spustni seznam pred imenom (Mr, Mrs, Miss, Ms, Dr, Prof, Rev, Pastor) | Ne |
| **E-pošta** | Samo za glavnega stika | Da (neobvezno) |
| **Telefon** | Za vsakega člana družine. Ko je obvezen, mora telefon vpisati samo glavni stik. | Da (neobvezno) |
| **Vloga v gospodinjstvu** | Za vsakega člana družine po glavnem stiku -- zakonec, otrok ali drugo. Glavni stik je vodja novega gospodinjstva. Kdor nima vloge, se shrani kot Drugo. | Da (neobvezno) |
| **Domači naslov** | Enkrat za družino -- ulica, naslovna vrstica 2, mesto, zvezna država in poštna številka. Ko je obvezen, mora biti izpolnjeno vse razen naslovne vrstice 2. Naslov se shrani pri vsakem članu družine. | Ne |
| **Datum rojstva** | Za vsakega člana družine | Ne |
| **Spol** | Za vsakega člana družine | Ne |
| **Zakonski stan** | Samo za glavnega stika | Ne |
| **Razred** | Za vsakega člana družine (od predšolskega do 12. razreda ali Diplomiral) | Ne |
| **Komentarji** | Enkrat, v polju pod člani družine (do 1.000 znakov) | Ne |

Polja, ki jih izklopite, se nikoli ne shranijo, tudi če jih nekdo kako drugače pošlje v prijavo. Komentarji se shranijo kot opomba v zapisu glavnega stika (objavljeno kot „Prijava gosta“), zato jih lahko preberete v razdelku **Opombe** na njegovem profilu.

### Dodajanje gostov v skupino

Z možnostjo **Dodaj nove goste v skupino** samodejno uvrstite vse, ki se prijavijo, v eno od vaših skupin -- na primer skupino „Novinci“ ali skupino za dogodek tega vikenda. Izberite **Brez** (privzeto), če tega ne želite. Gostje skupine nikoli ne vidijo ali ne izberejo; nastavi se samo tukaj. Pred vsakim dogodkom jo spremenite, da lahko goste tega dogodka skupaj obiščete.

### Beleženje prisotnosti

Ko je izbrana skupina, se prikaže stikalo **Tudi zabeleži prisotnost**. Vklopite ga, da gostje ob prijavi takoj označeni kot prisotni, tako da jih ni treba ločeno prijaviti.

Prisotnost se zabeleži samo, če se prijava zgodi v enem od **načrtovanih** časov bogoslužij izbrane skupine:

- Skupina mora biti povezana z enim ali več časi bogoslužij, ti časi pa morajo imeti [urnik prijave](setup.md#setting-a-check-in-schedule) (**dan** in **začetni čas**).
- „Med“ pomeni znotraj časovnega okna prijave tega časa bogoslužja -- od **Odpri prijavo** minut pred začetkom do **Zapri prijavo** minut po koncu (ali po začetku, če končni čas ni nastavljen; če nista nastavljena niti končni čas niti minute zaprtja, pa do konca tistega dne), v istem časovnem pasu, kot ga uporablja urnik prijave.
- Vsak član družine je označen kot prisoten v skupini za vsak njen čas bogoslužja, ki je v tistem trenutku odprt, za današnji datum.
- Prijave ob kateri koli drugi uri ali za skupino, katere časi bogoslužij nimajo urnika, se dodajo v skupino, vendar se ne štejejo kot prisotnost.

### Glava fotografije

V razdelku **Glava fotografije** kliknite **Spremeni fotografijo**, da izberete ali naložite sliko (obrezano na razmerje 16:9), ki se prikaže na vrhu strani za prijavo namesto privzete ikone. Kliknite **Odstrani**, da se vrnete na ikono.

### Deljenje povezave za prijavo

Ko je prijava gostov prek kode QR vklopljena, se na dnu kartice prikaže razdelek **Deli kodo QR za prijavo**. Ta ponuja dva načina, kako goste pripeljati do obrazca za prijavo, poleg kode QR na kiosku:

- **Kopiraj povezavo** -- kopira URL za prijavo, da ga lahko prilepite na spletno mesto vaše cerkve, v e-pošto ali kamor koli na spletu.
- **Prenesi PNG** -- prenese kodo QR kot sliko, ki jo lahko natisnete na letake, biltene ali označevalne table.

:::tip
Povezavo za prijavo dodajte na stran „Načrtujte obisk“ ali „Sem nov“ na spletnem mestu vaše cerkve, da se gostje lahko prijavijo, še preden pridejo.
:::

### Kaj se zgodi po prijavi gosta

B1 najprej poišče osebe, ki so že v **Osebah**. Član družine se ujema z obstoječo osebo, če ima natanko ena oseba enako ime in enak e-poštni naslov ali telefonsko številko. Otrok, vnesen brez e-pošte ali telefona, se ujema po imenu znotraj gospodinjstva, ki se je ujemalo. Ujemajoče se osebe se ponovno uporabijo takšne, kot so -- prijava nikoli ne spremeni njihovih podatkov ali statusa članstva -- nove osebe pa se pridružijo ujemajočemu se gospodinjstvu.

Če se nihče ne ujema, prijava ustvari novo gospodinjstvo, poimenovano po priimku glavnega stika, z zapisom osebe za vsakega člana družine. Vsi novi se dodajo v **Osebe** s statusom članstva **Obiskovalec**, glavni stik pa je vodja gospodinjstva.

Ujemajoče se in nove osebe se dodajo v skupino, ki ste jo izbrali (če še niso v njej), in če je to vklopljeno, se jim zabeleži prisotnost. Komentarji se shranijo kot opomba pri glavnem stiku.

Za samodejno spremljanje dodajte [sprožilec poteka dela](../serving/workflows.md#triggers), na primer **Oseba · Ustvarjena** s pogojem *Status članstva je Obiskovalec*, ali **Skupina · Član se je pridružil** za skupino, ki ste jo izbrali zgoraj.

## Kaj se zabeleži

Vsaka prijava ustvari zapis o prisotnosti v B1 Admin. Te zapise si lahko ogledate na strani [Prisotnost](tracking-attendance.md) in v [sejah vsake skupine](../groups/group-members.md), tako kot prisotnost, vneseno ročno. Način prikaza podatkov je enak -- obe metodi se stekata v ista poročila.
