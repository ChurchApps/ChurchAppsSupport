---
title: "Puslapio redaktoriaus naudojimas"
description: "Nustatykite puslapio redaktorių B1 Admin, pridėdami skyrius ir elementus, juos stilizuodami, peržiūrėdami mobiliajame įrenginyje ir publikuodami juodraščius. Taip pat aprašomas atšaukimas ir versijų istorija."
---

# Puslapio redaktoriaus naudojimas

<div class="article-intro">

B1 puslapio redaktorius yra vizualinis įrankis, leidžiantis vilkti ir kurti elementus, o tai leidžia suprojektuoti bažnyčios svetainės puslapius nerašant jokio kodo. Galite pridėti skyrius ir turinio blokus, pritaikyti stilius, peržiūrėti savo darbą ir atšaukti pakeitimus -- viską tiesiai naršyklėje.

</div>

## Mokomasis vaizdo įrašas

<YouTube id="m2B_JxmfFm4" title="Puslapių ir navigacijos redagavimas B1" next="Pasirinktinio domeno prijungimas B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Atlikite [Pradinę sąranką](./initial-setup.md), kad sukonfigūruotumėte savo svetainę
- Sukurkite bent vieną puslapį skiltyje [Puslapių tvarkymas](./managing-pages.md)
- Norint pasiekti redaktorių, reikia leidimo **content.edit**

</div>

## Redaktoriaus atidarymas

1. B1 Admin programoje atidarykite [Greitosios navigacijos meniu](../introduction.md#getting-around-with-the-jump-menu) (paieškos juosta viršuje kairėje), išskleiskite **Svetainė** ir spustelėkite **Puslapiai**.
2. Puslapių lentelėje raskite puslapį, kurį norite redaguoti, ir spustelėkite **Redaguoti turinį**.

Redaktorius atsidaro viso ekrano režimu. Kairiajame skydelyje rodoma jūsų puslapio struktūra ir turimi turinio elementai; centrinėje srityje rodoma tiesioginė puslapio peržiūra.

:::info
Redaktorius visada rodomas šviesiame režime, neatsižvelgiant į jūsų B1 Admin temos nustatymą, ir naudoja antraštės bei pagrindinio teksto šriftus, pasirinktus skiltyje [Išvaizda](./appearance.md). Taip peržiūra tiksliai atitinka tai, kaip puslapis atrodys svetainės lankytojams.
:::

## Puslapio struktūra: skyriai ir elementai

Kiekvienas puslapis sudarytas iš dviejų lygmenų:

- **Skyriai** -- aukščiausio lygio konteineriai, kurie padalija puslapį į horizontalias juostas (pvz., antraštės skyrius, turinio blokas ar poraštės juosta). Prieš pridedant turinį, kiekviename puslapyje turi būti bent vienas skyrius.
- **Elementai** -- atskiri turinio gabalėliai, įdėti į skyrių, pavyzdžiui, tekstas, nuotraukos, mygtukai, kortelės, formos ir kalendoriai.

### Skyriaus pridėjimas

1. Spustelėkite **Pridėti skyrių** (arba mygtuką **+** kairiojo skydelio viršuje).
2. Pasirinkite, kaip pradėti:
   - **Iš šablono** -- naršykite skyrių šablonų galeriją, sugrupuotą pagal kategorijas (Antraštė, Apie, Paslaugos, Aukojimas ir kt.), ir spustelėkite vieną, kad įterptumėte jį kaip visiškai stilizuotą, iš anksto užpildytą skyrių. Po pridėjimo galite viską pritaikyti.
   - **Tuščias skyrius** -- pasirinkite stulpelių išdėstymą (vienas stulpelis, du stulpeliai, trys stulpeliai ir pan.) ir kurkite nuo nulio.
3. Naujas skyrius atsiranda peržiūroje. Spustelėkite jį, kad pasirinktumėte ir sukonfigūruotumėte jo fono spalvą, užpildą bei kitas stiliaus parinktis.

### Skyriaus išdėstymo keitimas

Jau sukūrėte skyrių, bet norite kitokios struktūros? Naudokite to skyriaus išdėstymo keitiklį, kad pakeistumėte stulpelių išdėstymą į kitą iš galerijos, išlaikydami esamą turinį ir elementus.

### Elementų pridėjimas į skyrių

1. Spustelėkite skyrių peržiūroje, kad jį pasirinktumėte.
2. Spustelėkite **Pridėti turinį** ir pasirinkite elemento tipą iš sąrašo:
   - **Tekstas** -- antraštės, pastraipos ir praturtintas tekstas
   - **Nuotrauka** -- įkelkite nuotrauką arba nurodykite nuorodą į ją
   - **Mygtukas** -- paspaudžiama raginimo veikti nuoroda
   - **Kortelė** -- nuotrauka su pavadinimu ir aprašymu
   - **Forma** -- įterpkite [formą](../forms/creating-forms.md) tiesiai į puslapį. Jei formai pridėta [antraštės nuotrauka](../forms/creating-forms.md#adding-a-header-photo), ji rodoma virš klausimų
   - **Kalendorius** -- rodo renginių kalendorių
   - **DUK** -- akordeono tipo klausimų ir atsakymų blokai
   - **Vaizdo įrašas** -- įterpkite vaizdo įrašą pagal URL
   - **Grupių naršyklė** -- filtruojamas visų bažnyčios grupių katalogas su pasirinktine paieška, kategorijos ir žymos filtrais. Jo **Išdėstymas** gali būti **Tinklelis** (numatytasis) arba **Slenkama (automatiškai)** -- žr. [Slenkami išdėstymai](#scrolling-layouts)
   - **Grupių sąrašas** -- jūsų viešųjų grupių plytelės, pasirinktinai tik grupės su tam tikra žyma. Jo **Išdėstymas** gali būti **Tinklelis** (numatytasis; iki trijų plytelių eilutėje) arba **Slenkama (automatiškai)** -- žr. [Slenkami išdėstymai](#scrolling-layouts)
   - **Piktogramos funkcija** -- piktograma su pavadinimu ir trumpu aprašymu, skirta funkcijų ar tarnysčių akcentams
   - **Galerija** -- kelių nuotraukų tinklelis arba mozaikinis išdėstymas
   - **Atsiliepimas** -- viena ar daugiau citatų su autoriaus vardu, pareigomis ir nuotrauka
   - **Socialinių tinklų piktogramos** -- susietos piktogramos bažnyčios socialinių tinklų profiliams: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo ir Podcast. Įveskite nuorodą kiekvienai, kurią norite rodyti; **WhatsApp** atveju naudokite `https://wa.me/` nuorodą su jūsų numeriu arba grupės kvietimo nuorodą
   - **Atgalinis skaitiklis** -- laikmatis, skaičiuojantis iki datos ar savaitinio pamaldų laiko
   - **Statistika** -- eilutė didelių skaičių su etiketėmis (nariai, metai, filialai)
   - **Kampanijos eiga** -- gyva progreso juosta aukojimų kampanijai, rodanti bendrą sumą, surinktą iki fondo tikslo
   - **Darbuotojų tinklelis** -- nuotraukų kortelės grupės nariams; grupei turi būti įjungta parinktis **viešas sąrašas**
   - **Pamaldų laikai** -- jūsų filialų pamaldų tvarkaraštis, automatiškai paimtas iš lankomumo nustatymų
   - **Pamokslai** -- jūsų pamokslų biblioteka kaip pilnas naršyklės rodinys arba tinklelio, sąrašo ar išskirto naujausio pamokslo išdėstymas
   - **Žemėlapis** -- įterptas žemėlapis, centruotas pagal jūsų bažnyčios adresą
   - **Lentelė** -- paprastas eilučių ir stulpelių tinklelis lentelių turiniui
   - **Tekstas su nuotrauka** -- tekstas ir nuotrauka greta
   - **Logotipas** -- jūsų bažnyčios logotipas, paimtas iš [Išvaizdos](./appearance.md)
   - **Tiesioginė transliacija** -- jūsų tiesioginės transliacijos grotuvas, įterptas tiesiai į puslapį
   - **Podcast** -- epizodų sąrašas, paimtas iš jūsų nurodyto išorinio podcast RSS srauto URL, su nustatymais, kiek epizodų rodyti ir ar rodyti datas bei aprašymus. Kiekvienas epizodas tiesioginėje svetainėje turi garso grotuvą ir **Atsisiųsti** nuorodą, kuri išsaugo epizodo garso failą pagal epizodo pavadinimą. Tai skirta bet kokiam podcast srautui pateikti savo svetainėje; norėdami savo pamokslus publikuoti kaip podcast, žr. [Pamokslų tvarkymas](../sermons/managing-sermons.md#your-podcast-feed)
   - **Auka** -- aukojimo mygtukas arba įterpta aukojimo forma
   - **HTML** -- jūsų pačių neapdorotas HTML, pažengusiems naudojimo atvejams, pavyzdžiui, trečiosios šalies valdiklio įterpimui (žr. [HTML elemento naudojimas](#using-the-html-element))
   - **iFrame** -- įterpkite išorinį turinį pagal URL
3. Sukonfigūruokite elementą naudodami atsidariusį nustatymų skydelį.

### HTML elemento naudojimas

**HTML** elementas turi du laukus:

- **HTML turinys** -- žymėjimas, rodomas puslapyje. Visos čia įtrauktos `<script>` žymės veikia jūsų tiesioginėje svetainėje.
- **JavaScript (be script žymės)** -- scenarijaus kodas, vykdomas įkeliant puslapį. Čia taip pat galite įklijuoti tiekėjo įterpimo fragmentą su jo `<script>` žymėmis, ir jis bus vykdomas tiesioginėje svetainėje.

Jei į JavaScript laukelį įklijuosite tik interneto adresą (pavyzdžiui, nuotraukos nuorodą), laukelis paraudonuos su įspėjimu *„Tai interneto adresas, o ne JavaScript.“* Adresas tame laukelyje nieko nedaro. Norėdami parodyti paveikslėlį, naudokite **Nuotrauka** elementą arba įdėkite `<img src="...">` į **HTML turinys** lauką.

### Kalendoriaus elemento naudojimas {#using-the-calendar-element}

**Kalendorius** elementas rodo renginius iš vieno iš jūsų kalendorių:

1. Skiltyje **Pasirinkti** pasirinkite **Grupės kalendorius** (vienos grupės renginiai -- sąraše rodomos grupės, kurioms priklausote) arba **Kuruotas kalendorius** (kalendorius, kurį sukūrėte skiltyje **Kalendoriai**; žr. [Kuruotas kalendorius](../calendars/curated-calendar.md)).
2. Skiltyje **Pasirinkti kalendorių** pasirinkite grupę ar kalendorių.
3. Skiltyje **Rodymas** pasirinkite, kaip jį rodyti:
   - **Mėnesio kalendorius** -- mėnesio tinklelis, per kurį lankytojai gali naršyti. Kiekvienas renginys nudažomas grupės, kuriai jis priklauso, spalva, todėl grupės renginiai turi tą pačią spalvą kiekviename kalendoriuje. B1 spalvas parenka automatiškai; nieko nereikia konfigūruoti.
   - **Artėjantys renginiai** -- plytelių tinklelis artimiausiems 12 renginių, o pasikartojantis renginys rodomas vieną kartą su artimiausia data. Kiekvienoje plytelėje rodoma renginio nuotrauka (arba jo pavadinimas jūsų temos tamsiojoje spalvoje, jei nuotraukos nėra), datos ženkliukas, diena ir laikas bei pirmoji aprašymo eilutė. Virš plytelių esantis mygtukas **Prenumeruoti** leidžia lankytojams nukopijuoti kalendoriaus ICS nuorodą arba ją atsisiųsti. Šiam rodiniui atsiranda nustatymas **Išdėstymas**: **Tinklelis** (numatytasis) arba **Slenkama (automatiškai)**, kuris išdėsto plyteles viena eilute, slenkančia savaime (žr. [Slenkami išdėstymai](#scrolling-layouts)). Kuruotam kalendoriui įjunkite nustatymą **Grupės ženkliukas**, kad kiekvienos plytelės viršutiniame dešiniajame kampe būtų rodomas renginio grupės pavadinimas tos grupės kalendoriaus spalva. Renginiai iš archyvuotų ar konfidencialių grupių ženkliuko negauna.
4. Norėdami rodyti tik kai kuriuos renginius, įveskite žymą laukelyje **Rodyti tik renginius su žyma** -- pavyzdžiui, `youth`. Rodomi tik tie renginiai, kurių **Žymos** apima šį žodį. Palikite tuščią, kad būtų rodomi visi renginiai. Žymos nustatomos kiekvienam renginiui; žr. [Renginių pridėjimas ir redagavimas](../calendars/creating-calendars.md#adding-and-editing-events).

Bet kuriuo atveju, spustelėjus renginį, atsidaro jo puslapis jūsų svetainėje. Renginio puslapyje rodoma renginio nuotrauka, pavadinimas, data ir laikas bei aprašymas, taip pat langelis su **Kada** (įskaitant pasikartojimo šabloną pasikartojančiam renginiui) ir **Kur** (šiam renginiui rezervuoti kambariai). Jei įjungta registracija, rodomas ir mygtukas **Registruotis į šį renginį**, o nuoroda **Pridėti į mano kalendorių** atsisiunčia renginį kaip kalendoriaus failą. Puslapis sukonfigūruotas taip, kad paieškos sistemos galėtų rodyti renginio datą ir informaciją savo rezultatuose. Jūsų puslapiuose rodomų kuruotų kalendorių renginių puslapiai (artimiausių šešių mėnesių renginiams) taip pat įtraukiami į jūsų svetainės žemėlapį, kad paieškos sistemos galėtų juos rasti.

### Slenkami išdėstymai {#scrolling-layouts}

**Slenkama (automatiškai)** išdėstymas, skirtas **Grupių naršyklei**, **Grupių sąrašui** ir kalendoriaus elemento rodiniui **Artėjantys renginiai**, plyteles išdėsto viena eilute, o ne tinkleliu. Telefone kiekviena plytelė užpildo eilutę; kompiuteryje telpa dvi plytelės greta. Kai plytelių yra daugiau, nei telpa, eilutė:

- Maždaug kas keturias sekundes pereina į kitą plytelę, o po paskutinės vėl grįžta prie pirmosios.
- Sustoja, kai lankytojas užveda pelę, paliečia ar pereina į ją klaviatūra (Tab), ir vėl pradeda po kelių sekundžių.
- Po eilute rodo taškų eilutę, po vieną kiekvienai plytelei, o dabartinės plytelės taškas yra užpildytas. Lankytojai gali spustelėti tašką, kad pereitų prie tos plytelės.

Įrenginiuose, kuriuose įjungtas sumažinto judesio režimas, eilutė nejuda, o lankytojai ją patys perbraukia ar slenka. Jei visos plytelės telpa, eilutė nejuda ir taškai nerodomi.

### Turinio perkėlimas

Vilkite skyrius ar elementus, naudodami rankenėlės piktogramą (šeši taškai) kairėje kiekvieno elemento pusėje, kad pakeistumėte jų tvarką. Galite vilkti elementus skyriaus viduje arba perkelti juos tarp skyrių.

## Puslapio stilizavimas

### Skyriaus stiliai

Spustelėkite bet kurį skyrių, kad atidarytumėte jo stiliaus skydelį. Galite nustatyti:

- **Fonas** -- vientisa spalva, gradientas ar nuotrauka. Naudojant nuotraukos foną, **Fokusinis taškas** parinkiklis leidžia spustelėti, kad nustatytumėte, kuri nuotraukos dalis lieka centre skyriui keičiant mastelį, o parinktis **Uždanga** leidžia pridėti pusiau permatomą atspalvį virš nuotraukos, kad tekstas būtų geriau įskaitomas.
- **Užpildas** -- viršutinis ir apatinis tarpas skyriaus viduje
- **Plotis** -- visas plotis arba centruotas / ribotas
- **Atskyrikliai** -- dekoratyvios formos atskyrikliai (banga, įstrižainė, kreivė, trikampis ir kt.) skyriaus viršutiniame ar apatiniame krašte su spalvos, aukščio ir apvertimo parinktimis

### Elementų stiliai

Spustelėkite bet kurį elementą, kad atidarytumėte jo stiliaus skydelį. Įprastos parinktys apima šrifto dydį, spalvą, lygiavimą, paraštes ir užpildą. Nuotraukoms galite nustatyti alternatyvųjį tekstą ir nuorodų paskirties vietas.

### Pasirinktinis CSS

Pažengusiam stilizavimui kiekvienas skyrius ir elementas turi lauką **Pasirinktinis CSS**, kuriame galite rašyti savo CSS taisykles. Jos taikomos tik tam elementui, todėl jos neturi netyčia paveikti kitų puslapio dalių.

:::tip
Jei reikia pritaikyti stilius visai svetainei -- pavyzdžiui, pasirinktinį šriftą ar bendrą spalvą -- naudokite [Išvaizdos](./appearance.md) nustatymus, o ne pasirinktinį CSS atskiruose puslapiuose.
:::

## Puslapio peržiūra

Naudokite peržiūros valdiklius įrankių juostoje, kad patikrintumėte, kaip puslapis atrodo skirtingų dydžių ekranuose:

- **Kompiuteris** -- visas naršyklės plotis
- **Mobilusis** -- siauras telefono dydžio vaizdas

Telefonuose eilutės stulpeliai sustoja vienas ant kito visu pločiu, nebent eilutės nustatymuose nustatėte jiems **Mobilųjį plotį**. Pamokslų ir podcast sąrašai telefonuose taip pat rodo kiekvieno epizodo tekstą po miniatiūra.

Norėdami pamatyti tiesioginį puslapį tiksliai taip, kaip jį matys lankytojai, grįžkite į puslapių sąrašą ir spustelėkite puslapio kelią. Jis atsidarys naujame naršyklės skirtuke.

## Prieinamumo tikrinimas

Spustelėkite įrankių juostos **Prieinamumas** piktogramą, kad atliktumėte greitą patikrinimą dėl dažnų problemų -- trūkstamo nuotraukų alternatyviojo teksto, prasto spalvų kontrasto ar neteisingos antraščių eilės. Kiekviena problema tiesiogiai nukreipia į elementą, kurį reikia pataisyti, kad galėtumėte ją ištaisyti vietoje.

## Pakeitimų atšaukimas

Redaktorius automatiškai seka jūsų redagavimo istoriją. Naudokite įrankių juostos mygtukus arba klaviatūros trumpinius naršymui:

- **Atšaukti** (Ctrl+Z / Cmd+Z) -- grąžina paskutinį jūsų veiksmą
- **Pakartoti** (Ctrl+Shift+Z arba Ctrl+Y / Cmd+Shift+Z) -- vėl pritaiko atšauktą veiksmą

Taip pat galite atkurti puslapį į ankstesnę momentinę kopiją. Spustelėkite **Peržiūrėti istoriją** įrankių juostoje, kad pamatytumėte išsaugotų momentinių kopijų sąrašą su aprašymais, ir spustelėkite bet kurį įrašą, kad grįžtumėte į tą būseną.

:::warning
Momentinės kopijos atkūrimas pakeičia dabartinį puslapio turinį momentinės kopijos versija. Tai negalima atšaukti įprastu atšaukimo mygtuku. Jei norite išlaikyti galimybę grįžti, prieš atkurdami seną momentinę kopiją išsaugokite dabartinės būsenos momentinę kopiją.
:::

## Išsaugojimas ir publikavimas

Pakeitimai išsaugomi automatiškai, kai dirbate. Įrankių juostoje esantis būsenos indikatorius rodo, ar jūsų pakeitimai išsaugoti.

### Juodraščio ir publikuotos būsenos

Puslapiai gali turėti **publikuotą** būseną, kuri nustato, kada lankytojai mato jūsų pakeitimus. Įrankių juostoje rodomas būsenos žymeklis su dabartine būsena:

- **Gyvai išsaugojus** -- puslapis nenaudoja publikavimo eigos. Kiekvienas išsaugotas pakeitimas iš karto tampa matomas. Tai numatytasis nustatymas naujiems puslapiams.
- **Nepublikuoti pakeitimai** -- puslapis jau buvo publikuotas anksčiau, bet nuo paskutinio publikavimo padarėte pakeitimų. Lankytojai vis dar mato anksčiau publikuotą versiją.
- **Publikuota** -- puslapis yra gyvas, o jūsų išsaugotas turinys atitinka tai, ką mato lankytojai.

Norėdami publikuoti pakeitimus, spustelėkite mygtuką **Publikuoti** įrankių juostoje. Puslapis iš karto tampa matomas.

Norėdami grįžti prie paskutinės publikuotos versijos, neveikiant to, ką mato lankytojai, atidarykite papildomą meniu (⋮) ir spustelėkite **Atmesti nepublikuotus pakeitimus**.

Norėdami nebenaudoti publikavimo eigos, atidarykite papildomą meniu ir spustelėkite **Išjungti publikavimą**. Tada redagavimai vėl iš karto tampa matomi.

:::tip
Naudokite juodraščio / publikavimo eigą, kai norite paruošti puslapį -- pavyzdžiui, artėjančiam renginiui -- ir padaryti jį matomą tinkamu momentu. Sukurkite ir peržiūrėkite puslapį, tada, kai būsite pasiruošę, spustelėkite Publikuoti.
:::

## Susiję straipsniai

- [Puslapių tvarkymas](./managing-pages.md) -- kurkite puslapius, nustatykite URL ir tvarkykite svetainės navigaciją
- [Išvaizda](./appearance.md) -- nustatykite visos svetainės spalvas, šriftus ir prekės ženklą
- [Failai](./files.md) -- įkelkite nuotraukas ir dokumentus, kad galėtumėte naudoti redaktoriuje
- [Formų kūrimas](../forms/creating-forms.md) -- kurkite formas, kurias galite įterpti į puslapius
