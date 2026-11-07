---
title: "Nastavitev samostojne prijave z B1 Checkin in B1 Admin"
sidebar_label: "Prijava obiskovalcev"
description: "Nastavite samostojno prijavo na bogoslužja z aplikacijo B1 Checkin v B1 Admin: naprave, računi za kiosk, urniki, videz in prijava gostov prek QR kode."
---

# Prijava obiskovalcev

<div class="article-intro">

B1 Admin omogoča samoprijavo na bogoslužja prek spremljajoče aplikacije **B1 Checkin**. Člani se ob prihodu lahko sami prijavijo, skupaj s svojimi družinami, na kioskih ali namenskih napravah. Tako je postopek hiter in razbremeni vaše prostovoljce. Vsaka prijava se samodejno zabeleži kot prisotnost.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Vaše podružnice, časi bogoslužij in skupine morajo biti nastavljeni v [Nastavitvah prisotnosti](setup.md).
- Potrebujete [osebe v vaši bazi podatkov](../people/adding-people.md) z nastavljenimi [gospodinjstvi](../people/adding-people.md#managing-households), da se lahko družine prijavijo skupaj.
- Potrebovali boste tablični računalnik in po želji tiskalnik nalepk Brother (glejte [priporočila o strojni opremi](#recommended-hardware) spodaj).

</div>

## Kako deluje

Aplikacija B1 Checkin se poveže z vašimi nastavitvami prisotnosti v B1 Admin. Ko se član prijavi, se njegova prisotnost samodejno zabeleži za pravilno podružnico, čas bogoslužja in skupino. Za osebe, ki uporabljajo sistem prijave, ročno vnašanje prisotnosti ni potrebno.

## Nastavitev prijave

1. **Najprej nastavite strukturo prisotnosti.** V B1 Admin pojdite na **Ljudje > Prisotnost** in kliknite **Nastavitve**, da se prepričate, da so vaše podružnice, časi bogoslužij in skupine nastavljeni. Aplikacija za prijavo se opira na to konfiguracijo. Po želji lahko vsakemu času bogoslužja nastavite [urnik prijave](setup.md#setting-a-check-in-schedule), da se prijava vsak teden samodejno odpre in zapre. Urniki uporabljajo časovni pas podružnice, h kateri bogoslužje spada, ali časovni pas vaše cerkve, če podružnica nima nastavljenega svojega. Kiosk prikaže časi bogoslužij, katerih okno je zaprto, kot **Zaprto**, in družinam pove, kdaj se prijava odpre. Podrobnosti najdete v [Nastavitvah prisotnosti](setup.md).
2. **Namestite aplikacijo B1 Checkin** na naprave, ki jih nameravate uporabljati. Aplikacija je na voljo za naslednje platforme:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/tablični računalniki Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablični računalniki Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Prijavite se v aplikacijo B1 Checkin** z računom, ki ima dovoljenje za prijavo na prisotnost (**Checkin**) ali **Urejanje prisotnosti**. Glejte [Računi kioskov za prijavo](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Izberite podružnico in čas bogoslužja** za trenutno srečanje.
5. Člani zdaj lahko na napravi poiščejo svoje ime in se prijavijo.

:::tip
Naprave za prijavo postavite na vidna in lahko dostopna mesta, na primer ob vhodih v preddverje ali na recepcijske pulte. Kratka napoved med bogoslužji pomaga članom vedeti, da ta možnost obstaja.
:::

:::tip
Če ima vaša cerkev več podružnic, boste morali nastavitev ponoviti za vsako podružnico v [Nastavitvah prisotnosti](setup.md). Vsako napravo za prijavo lahko nastavite za drugo podružnico.
:::

## Priporočena strojna oprema

**Tablični računalniki** — z aplikacijo dobro delujejo kateri koli od teh:

- **Kompakten:** Samsung Galaxy Tab A7 Lite 8,7"
- **Velik zaslon:** Samsung Galaxy Tab A8 10,5"
- **Cenovno ugoden:** Amazon Fire HD 10

**Tiskalniki** — prijave delujejo s tiskalniki nalepk Brother za tiskanje imenskih značk:

- **Najboljši:** Brother QL-1110NWB (podpira več tabličnih računalnikov prek Bluetootha in WiFi)
- **Dober:** Brother QL-810W (podpira več tabličnih računalnikov prek WiFi)
- **Cenovno ugoden:** Brother QL-1100 (samo WiFi)

**Nalepke:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Z aplikacijo B1 Checkin so združljivi samo tiskalniki nalepk Brother. Tiskalniki drugih znamk za tiskanje imenskih značk ne bodo delovali.
:::

:::info
Sledite navodilom za nastavitev tiskalnika in ga povežite z istim omrežjem WiFi kot vaš tablični računalnik. Gonilnike in navodila za nastavitev tiskalnikov Brother najdete na [spletni strani za podporo Brother](https://support.brother.com).
:::

## Prilagajanje videza kioska

Videz aplikacije B1 Checkin lahko prilagodite tako, da se ujema zблagovno podobo vaše cerkve. V B1 Admin pojdite na **Mobilne > B1 CheckIn** in uporabite kartico **Tema kioska**, da nastavite:

### Barve

Prilagodite osem barvnih nastavitev, da se ujemajo zблagovno podobo vaše cerkve:

- **Primarna** in **Primarna kontrastna** -- glavna barva blagovne znamke in njena barva besedila.
- **Sekundarna** in **Sekundarna kontrastna** -- poudarna barva in njena barva besedila.
- **Ozadje glave** in **Ozadje podglave** -- barve področij glave kioska.
- **Ozadje gumba** in **Besedilo gumba** -- barve interaktivnih gumbov.

### Slika ozadja

Naložite lahko neobvezno sliko ozadja za pozdravni zaslon kioska in zaslon za iskanje. Priporočena velikost je 1920x1080 slikovnih pik.

### Zaslon v mirovanju / ohranjevalnik zaslona

Nastavite ohranjevalnik zaslona, ki se aktivira po obdobju nedejavnosti:

1. Zaslon v mirovanju vklopite ali izklopite.
2. Nastavite **časovno omejitev** (koliko sekund nedejavnosti pred začetkom ohranjevalnika zaslona, najmanj 10 sekund).
3. Dodajte eno ali več **diapozitivov** -- vsak diapozitiv ima sliko in čas prikaza (najmanj 3 sekunde).

:::tip
Zaslon v mirovanju uporabite za prikaz napovedi, prihajajočih dogodkov ali pozdravnih sporočil, kadar kiosk ni v aktivni uporabi.
:::

## Registracija gostov prek QR kode

Kiosk za prijavo lahko prikaže QR kodo, ki jo obiskovalci optično preberejo in se nato sami registrirajo s svojo družino na lastnem telefonu. To pospeši prijavo za goste, ki so prvič tukaj.

Ko gost optično prebere QR kodo, ga stran odpre na [strani za registracijo gostov](../../b1-church/checkin/guest-registration.md), kjer vnese imena svoje družine in druge podatke, ki jih želite zbirati. Prostovoljec ga nato lahko poišče na kiosku in ga prijavi.

### Omogočanje registracije gostov prek QR kode

Za vklop prikaza QR kode:

1. V B1 Admin odprite [meni Jump](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje na vrhu levo) in razširite **Mobilne**.
2. Kliknite **B1 CheckIn**.
3. Vklopite **Registracija gostov prek QR** in kliknite **Shrani**.

:::note
Ta nastavitev je pod **Mobilne > B1 CheckIn** (na isti strani kot kartica **Tema kioska**), ne pod Prisotnostjo. Dejanje **Kiosk** na strani Prisotnost ima povezavo na to stran.
:::

Ko je preklop vklopljen, se preostale možnosti spodaj prikažejo na isti kartici **Registracija gostov prek QR**. Po spremembi katere koli od njih kliknite **Shrani** na kartici.

### Izbira polj za prijavo

Seznam **Polja za prijavo** določa, kaj obrazec za registracijo zahteva. **Ime** in **Priimek** sta vedno na obrazcu in sta vedno obvezna za vsakega družinskega člana. Pri vsakem drugem polju vklopite **Vključi**, da ga dodate v obrazec, nato vklopite **Obvezno**, če ga morajo gostje izpolniti. **Obvezno** lahko vklopite samo za vključeno polje, izklop **Vključi** pa ga počisti.

| Polje | Zahtevano za | Privzeto vključeno |
|-------|--------------|--------------------|
| **E-pošta** | Samo glavnega kontakta | Da (neobvezno) |
| **Telefon** | Samo glavnega kontakta | Da (neobvezno) |
| **Domači naslov** | Enkrat za družino -- ulica, naslovna vrstica 2, mesto, regija in poštna številka. Če je obvezno, morajo biti izpolnjeni vsi deli razen naslovne vrstice 2. Naslov se shrani pri vsakem družinskem članu. | Ne |
| **Datum rojstva** | Vsakega družinskega člana | Ne |
| **Spol** | Vsakega družinskega člana | Ne |
| **Zakonski stan** | Samo glavnega kontakta | Ne |
| **Razred** | Vsakega družinskega člana (od predšolskega do 12. razreda ali Diplomiral) | Ne |
| **Komentarji** | Enkrat, v polju pod družinskimi člani (do 1.000 znakov) | Ne |

Polja, ki jih izklopite, se nikoli ne shranijo, tudi če jih nekdo na drug način pošlje v prijavo. Komentarji se shranijo kot opomba v zapisu glavnega kontakta (objavljena kot »Prijava gosta«), zato jih lahko preberete v razdelku **Opombe** njegovega profila.

### Dodajanje gostov v skupino

Z možnostjo **Nove goste dodaj v skupino** samodejno uvrstite vse, ki se prijavijo, v eno od vaših skupin -- na primer skupino »Novinci« ali skupino za dogodek tega vikenda. Izberite **Brez** (privzeto), če tega ne želite. Gostje skupine nikoli ne vidijo in je ne morejo izbrati; nastavi se samo tukaj. Pred vsakim dogodkom jo spremenite, da lahko goste tega dogodka spremljate skupaj.

### Beleženje prisotnosti

Ko izberete skupino, se prikaže stikalo **Prav tako zabeleži prisotnost**. Vklopite ga, da so gostje označeni kot prisotni takoj, ko se prijavijo, da jih vam ni treba prijaviti posebej.

Prisotnost se zabeleži samo, če se prijava zgodi med enim od **načrtovanih** časov bogoslužij izbrane skupine:

- Skupina mora biti povezana z enim ali več časi bogoslužij, ti časi pa morajo imeti [urnik prijave](setup.md#setting-a-check-in-schedule) (**Dan** in **Začetni čas**).
- »Med« pomeni znotraj okna prijave tega časa bogoslužja -- od **Odpri prijavo** minut pred začetkom do **Zapri prijavo** minut po koncu (ali po začetku, če končni čas ni nastavljen; če nista nastavljena ne končni čas ne minute zapiranja, do konca tistega dne), v istem časovnem pasu, ki ga uporablja urnik prijave.
- Vsak družinski član se označi kot prisoten v skupini za vsak njen čas bogoslužja, ki je v tistem trenutku odprt, za današnji datum.
- Prijave ob katerem koli drugem času ali za skupino, katere časi bogoslužij nimajo urnika, se dodajo v skupino, vendar se ne štejejo kot prisotnost.

### Glava fotografije

Pod **Fotografija glave** kliknite **Spremeni fotografijo**, da izberete ali naložite sliko (obrezano v obliko 16:9), ki se bo na vrhu strani za registracijo prikazala namesto privzete ikone. Kliknite **Odstrani**, da se vrnete na ikono.

### Deljenje povezave za registracijo

Ko je registracija gostov prek QR kode omogočena, se na dnu kartice prikaže razdelek **Deli QR kodo za registracijo**. To vam omogoča dva načina, da goste pripeljete do obrazca za registracijo, poleg QR kode na kiosku:

- **Kopiraj povezavo** -- kopira URL za registracijo, da ga lahko prilepite na spletno stran cerkve, v e-pošto ali kamorkoli na spletu.
- **Prenesi PNG** -- prenese QR kodo kot sliko, ki jo lahko natisnete na letake, biltene ali označevalne table.

:::tip
Povezavo za registracijo dodajte na spletno stran vaše cerkve na stran »Načrtujte obisk« ali »Sem nov« , da se gostje lahko registrirajo, še preden pridejo.
:::

### Kaj se zgodi, ko se gost prijavi

B1 najprej poišče ljudi, ki so že v **Ljudeh**. Družinski član se ujema z obstoječo osebo, če ima natanko ena oseba enako ime in enako e-pošto ali telefonsko številko. Otrok, vnesen brez e-pošte ali telefona, se ujema po imenu znotraj ujemajočega se gospodinjstva. Ujemajoče se osebe se ponovno uporabijo takšne, kot so -- prijava nikoli ne spremeni njihovih podatkov ali statusa članstva -- vsak nov človek pa se pridruži ujemajočemu se gospodinjstvu.

Če se nihče ne ujema, prijava ustvari novo gospodinjstvo, poimenovano po priimku glavnega kontakta, z zapisom osebe za vsakega družinskega člana. Vsi novi se dodajo v **Ljudi** s članskim statusom **Obiskovalec**, glavni kontakt pa je nosilec gospodinjstva.

Ujemajoči se in novi ljudje se dodajo v skupino, ki ste jo izbrali (če v njej še niso), in se jim prisotnost zabeleži, če je to vklopljeno. Komentarji se shranijo kot opomba pri glavnem kontaktu.

Za samodejno sledenje dodajte [sprožilec poteka dela](../serving/workflows.md#triggers), na primer **Oseba · Ustvarjena** s pogojem *Članski status je Obiskovalec*, ali **Skupina · Član se je pridružil** za zgoraj izbrano skupino.

## Kaj se zabeleži

Vsaka prijava ustvari zapis o prisotnosti v B1 Admin. Te zapise lahko pregledate na strani [Prisotnost](tracking-attendance.md) in v [sejah vsake skupine](../groups/group-members.md), tako kot ročno vnesene prisotnosti. Podatki so prikazani enako, obe metodi pa se stekata v ista poročila.
