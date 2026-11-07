---
title: "Puslapių redaktoriaus naudojimas"
---

# Puslapių redaktoriaus naudojimas

<div class="article-intro">

B1 puslapių redaktorius – tai vizualus vilkimo ir nuleidimo kūrimo įrankis, leidžiantis kurti bažnyčios svetainės puslapius nerašant jokio kodo. Galite pridėti skyrius ir turinio blokus, keisti stilius, peržiūrėti savo darbą ir atšaukti pakeitimus – viską tiesiai naršyklėje.

</div>

## Mokomasis vaizdo įrašas

<YouTube id="m2B_JxmfFm4" title="Puslapių ir navigacijos redagavimas B1 sistemoje" next="Pasirinktinio domeno prijungimas B1 sistemoje" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Atlikite [Pradinis nustatymas](initial-setup), kad sukonfigūruotumėte savo svetainę
- Sukurkite bent vieną puslapį skyriuje [Puslapių valdymas](managing-pages)
- Norint pasiekti redaktorių, reikia **content.edit** leidimo

</div>

## Redaktoriaus atidarymas

1. B1 Admin sistemoje atidarykite [Greitąjį meniu](../introduction.md#getting-around-with-the-jump-menu) (paieškos juostą viršutiniame kairiajame kampe), išskleiskite **Website** ir spustelėkite **Pages**.
2. Puslapių lentelėje raskite puslapį, kurį norite redaguoti, ir spustelėkite **Edit Content**.

Redaktorius atsidaro visame ekrane. Kairiajame skydelyje rodoma jūsų puslapio struktūra ir galimi turinio elementai; centrinėje srityje rodoma tiesioginė puslapio peržiūra.

:::info
Redaktorius visada rodomas šviesiame režime, neatsižvelgiant į jūsų B1 Admin temos nustatymą, ir naudoja antraštių bei pagrindinio teksto šriftus, kuriuos pasirinkote skiltyje [Appearance](appearance). Taip peržiūra tiksliai atitinka tai, kaip puslapis atrodys svetainės lankytojams.
:::

## Puslapio struktūra: skyriai ir elementai

Kiekvienas puslapis sudarytas iš dviejų lygmenų:

- **Skyriai** – aukščiausio lygmens konteineriai, kurie puslapį padalija į horizontalias juostas (pavyzdžiui, pagrindinis baneris, turinio blokas ar poraštės juosta). Prieš pridedant turinį, kiekviename puslapyje turi būti bent vienas skyrius.
- **Elementai** – atskiri turinio fragmentai, įdėti į skyrių, pavyzdžiui, tekstas, nuotraukos, mygtukai, kortelės, formos ir kalendoriai.

### Skyriaus pridėjimas

1. Spustelėkite **Pridėti skyrių** (arba mygtuką **+** kairiojo skydelio viršuje).
2. Pasirinkite, kaip pradėti:
   - **Iš šablono** – naršykite skyrių šablonų galeriją, surūšiuotą pagal kategorijas (Hero, About, Services, Giving ir kt.), ir spustelėkite vieną, kad įterptumėte jį kaip visiškai suformatuotą, iš anksto užpildytą skyrių. Po įterpimo galite pakeisti bet ką.
   - **Tuščias skyrius** – pasirinkite stulpelių išdėstymą (vienas stulpelis, du stulpeliai, trys stulpeliai ir kt.) ir kurkite nuo nulio.
3. Naujas skyrius atsiranda peržiūroje. Spustelėkite jį, kad jį pažymėtumėte, ir sukonfigūruotumėte fono spalvą, vidinius tarpus bei kitus stiliaus nustatymus.

### Skyriaus išdėstymo keitimas

Jei skyrius jau sukurtas, bet norite kitokios struktūros? Naudokite to skyriaus išdėstymo keitiklį, kad pakeistumėte stulpelių išdėstymą į kitą iš galerijos, išlaikydami esamą turinį ir elementus.

### Elementų pridėjimas į skyrių

1. Peržiūroje spustelėkite skyriaus vidų, kad jį pažymėtumėte.
2. Spustelėkite **Pridėti turinį** ir iš sąrašo pasirinkite elemento tipą:
   - **Tekstas** – antraštės, pastraipos ir formatuotas tekstas
   - **Nuotrauka** – įkelkite nuotrauką arba nurodykite jos nuorodą
   - **Mygtukas** – spustelėjamas raginimo veikti (call-to-action) nuorodos mygtukas
   - **Kortelė** – nuotrauka su pavadinimu ir aprašymu
   - **Forma** – įterpkite [formą](../forms/creating-forms) tiesiai į puslapį. Jei formai pridėta [antraštės nuotrauka](../forms/creating-forms.md#adding-a-header-photo), ji rodoma virš klausimų
   - **Kalendorius** – rodo renginių kalendorių
   - **DUK** – akordeono tipo klausimų ir atsakymų blokai
   - **Video** – įterpkite vaizdo įrašą pagal URL
   - **Grupių katalogas** – filtruojamas visų bažnyčios grupių katalogas su pasirenkama paieška, kategorijos ir žymos filtrais
   - **Funkcijos piktograma** – piktograma su pavadinimu ir trumpu aprašymu, skirta funkcijoms ar tarnystėms pabrėžti
   - **Galerija** – tinklelis iš kelių nuotraukų arba masonry išdėstymas
   - **Liudijimas** – viena ar daugiau citatų su autoriaus vardu, pareigomis ir nuotrauka
   - **Socialinių tinklų piktogramos** – nuorodų piktogramos į bažnyčios socialinių tinklų profilius: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo ir Podcast. Įveskite nuorodą kiekvienam norimam rodyti tinklui; **WhatsApp** atveju naudokite `https://wa.me/` nuorodą su savo numeriu arba grupės kvietimo nuorodą
   - **Laikrodis** – laikmatis, skaičiuojantis iki datos ar įprasto tarnystės laiko
   - **Statistika** – eilutė didelių skaičių su žymėmis (nariai, metai, filialai)
   - **Kampanijos eiga** – tiesioginė eigos juosta aukojimų kampanijai, rodanti surinktą sumą nuo fondo tikslo
   - **Personalo tinklelis** – grupės narių nuotraukų kortelės; grupei turi būti įjungta parinktis **viešas sąrašas**
   - **Tarnystių laikai** – jūsų filialų tarnystių tvarkaraštis, automatiškai paimtas iš lankomumo nustatymų
   - **Pamokslai** – jūsų pamokslų biblioteka, pateikiama kaip visas naršyklės vaizdas arba tinklelio, sąrašo ar paryškinto naujausio pamokslo išdėstymu
   - **Žemėlapis** – įterptas žemėlapis, centruotas pagal bažnyčios adresą
   - **Lentelė** – paprastas eilučių ir stulpelių tinklelis lentelių duomenims
   - **Tekstas su nuotrauka** – tekstas ir nuotrauka šalia vienas kito
   - **Logotipas** – jūsų bažnyčios logotipas, paimtas iš skilties [Appearance](appearance)
   - **Tiesioginė transliacija** – jūsų tiesioginės transliacijos grotuvas, įterptas tiesiai į puslapį
   - **Podkastas** – epizodų sąrašas, paimtas iš jūsų nurodyto išorinio podkasto RSS srauto URL, su nustatymais, kiek epizodų rodyti ir ar rodyti datas bei aprašymus. Kiekvienas epizodas gyvoje svetainėje turi garso grotuvą ir **Download** nuorodą, kuri išsaugo epizodo garso failą pavadinimu pagal epizodo pavadinimą. Tai skirta bet kokio podkasto srautui rodyti svetainėje; jei norite publikuoti savo pamokslus kaip podkastą, žr. [Pamokslų valdymas](../sermons/managing-sermons.md#your-podcast-feed)
   - **Auka** – aukojimo mygtukas arba įterpta aukojimo forma
   - **HTML** – jūsų pačių neapdorotas HTML kodas, skirtas pažengusiam naudojimui, pavyzdžiui, trečiosios šalies valdiklio įterpimui (žr. [HTML elemento naudojimas](#using-the-html-element))
   - **iFrame** – įterpkite išorinį turinį pagal URL
3. Sukonfigūruokite elementą naudodami atsidarantį nustatymų skydelį.

### HTML elemento naudojimas

**HTML** elementas turi du laukus:

- **HTML turinys** – žymėjimas, rodomas puslapyje. Visi čia įdėti `<script>` žymės veikia jūsų gyvoje svetainėje.
- **JavaScript (be script žymės)** – scenarijaus kodas, kuris vykdomas įkeliant puslapį. Čia taip pat galite įklijuoti tiekėjo įterpimo fragmentą su `<script>` žymėmis, ir jis veiks gyvoje svetainėje.

Jei į JavaScript lauką įklijuosite tik interneto adresą (pavyzdžiui, paveikslėlio nuorodą), laukas paraudonuos su įspėjimu *„Tai yra interneto adresas, o ne JavaScript.“* Adresas tame lauke neveiks. Norėdami parodyti paveikslėlį, naudokite **Nuotrauka** elementą arba įdėkite `<img src="...">` į **HTML turinys** lauką.

### Kalendoriaus elemento naudojimas {#using-the-calendar-element}

**Kalendorius** elementas rodo renginius iš vieno iš jūsų kalendorių:

1. Skiltyje **Select** pasirinkite **Group Calendar** (vienos grupės renginiai – sąraše rodomos grupės, kuriose esate narys) arba **Curated Calendar** (kalendorius, kurį sukūrėte skiltyje **Calendars**; žr. [Curated Calendar](../calendars/curated-calendar)).
2. Skiltyje **Select Calendar** pasirinkite grupę ar kalendorių.
3. Skiltyje **Display** pasirinkite rodymo būdą:
   - **Month calendar** – mėnesio tinklelis, kurį lankytojai gali peržiūrėti puslapis po puslapio.
   - **Upcoming events** – artimiausių 12 renginių plytelių tinklelis; pasikartojantis renginys rodomas kartą, su artimiausia data. Kiekvienoje plytelėje rodoma renginio nuotrauka (arba jo pavadinimas temos tamsiu spalvos fonu, jei nuotraukos nėra), datos ženklelis, diena ir laikas bei pirmoji aprašymo eilutė. Virš plytelių esantis mygtukas **Subscribe** leidžia lankytojams nukopijuoti kalendoriaus ICS nuorodą arba jį atsisiųsti. Šiam rodymui atsiranda nustatymas **Layout**: **Grid** (numatytasis) arba **Scrolling (automatic)**, kai plytelės išdėstomos vienoje eilėje ir automatiškai slenka.
4. Norėdami rodyti tik kai kuriuos renginius, įveskite žymą lauke **Only events tagged** – pavyzdžiui, `youth`. Rodomi tik tie renginiai, kurių **Tags** apima šį žodį. Palikite tuščią, kad būtų rodomi visi renginiai. Žymos nustatomos kiekvienam renginiui; žr. [Renginių pridėjimas ir redagavimas](../calendars/creating-calendars.md#adding-and-editing-events).

Abiem atvejais spustelėjus renginį atsidaro jo puslapis jūsų svetainėje. Renginio puslapyje rodoma renginio nuotrauka, pavadinimas, data ir laikas bei aprašymas, taip pat langelis su **When** (įskaitant pasikartojimo tvarkaraštį pasikartojančiam renginiui) ir **Where** (renginiui rezervuotos patalpos). Jei įjungta registracija, rodomas mygtukas **Register for this Event**, o nuoroda **Add to my calendar** atsisiunčia renginį kaip kalendoriaus failą. Puslapis sukurtas taip, kad paieškos sistemos galėtų rodyti renginio datą ir informaciją savo rezultatuose. Renginių puslapiai iš jūsų puslapiuose rodomų kuruojamų kalendorių (renginiams artimiausiais šešiais mėnesiais) taip pat įtraukiami į svetainės svetainės žemėlapį (sitemap), kad paieškos sistemos galėtų juos rasti.

### Turinio perrikiavimas

Vilkite skyrius ar elementus, naudodami rankenėlės piktogramą (šeši taškai) kiekvieno elemento kairėje, kad pakeistumėte jų tvarką. Elementus galite vilkti skyriaus viduje arba perkelti tarp skyrių.

## Puslapio stilizavimas

### Skyrių stiliai

Spustelėkite bet kurį skyrių, kad atidarytumėte jo stiliaus skydelį. Galite nustatyti:

- **Background** – vientisa spalva, gradientas ar nuotrauka. Naudojant nuotrauką kaip foną, **Focal Point** parinktis leidžia spustelėti ir nustatyti, kuri nuotraukos dalis lieka centre, kai skyrius keičia dydį. Parinktis **Overlay** leidžia uždėti pusiau permatomą atspalvį ant nuotraukos, kad tekstas būtų geriau įskaitomas.
- **Padding** – viršutinis ir apatinis tarpas skyriaus viduje
- **Width** – visas plotis arba centruotas / ribotas plotis
- **Dividers** – dekoratyvios formos skyriklių (banga, įstrižas, lanko, trikampis ir kt.) skyriaus viršutiniame ar apatiniame krašte, su spalvos, aukščio ir apvertimo parinktimis

### Elementų stiliai

Spustelėkite bet kurį elementą, kad atidarytumėte jo stiliaus skydelį. Dažniausios parinktys – šrifto dydis, spalva, lygiavimas, paraštės ir vidiniai tarpai. Nuotraukoms galite nustatyti alternatyvųjį tekstą (alt) ir nuorodų tikslus.

### Pasirinktinis CSS

Pažengusiam stilizavimui kiekvienas skyrius ir elementas turi lauką **Custom CSS**, kuriame galite rašyti savo CSS taisykles. Jos taikomos tik tam elementui, todėl nepaveiks kitų puslapio dalių.

:::tip
Jei norite taikyti stilius visai svetainei – pavyzdžiui, pasirinktinį šriftą ar bendrą spalvą – naudokite [Appearance](appearance) nustatymus, o ne pasirinktinį CSS atskiruose puslapiuose.
:::

## Puslapio peržiūra

Naudokite peržiūros valdiklius įrankių juostoje, kad patikrintumėte, kaip puslapis atrodo skirtingo dydžio ekranuose:

- **Desktop** – visas naršyklės plotis
- **Mobile** – siauras telefono dydžio vaizdas

Telefonuose stulpeliai eilutėje sustoja vienas po kito visu plotiu, nebent eilutės nustatymuose nustatysite **Mobile Width**. Pamokslų ir podkastų sąrašuose kiekvieno epizodo tekstas telefonuose taip pat rodomas po miniatiūra.

Norėdami pamatyti gyvą puslapį tiksliai taip, kaip jį matys lankytojai, grįžkite į puslapių sąrašą ir spustelėkite puslapio kelią. Jis atsidarys naujame naršyklės skirtuke.

## Prieinamumo tikrinimas

Spustelėkite **Accessibility** piktogramą įrankių juostoje, kad greitai patikrintumėte dažniausias problemas – nuotraukas be alternatyviojo teksto, prastą spalvų kontrastą ar antraštes netinkamoje eilės tvarkoje. Kiekviena problema tiesiogiai nukreipia į elementą, kurį reikia pataisyti, todėl galite ją ištaisyti vietoje.

## Pakeitimų atšaukimas

Redaktorius automatiškai seka jūsų redagavimo istoriją. Naudokite įrankių juostos mygtukus arba klaviatūros sparčiuosius klavišus:

- **Undo** (Ctrl+Z / Cmd+Z) – atšaukti paskutinį veiksmą
- **Redo** (Ctrl+Shift+Z arba Ctrl+Y / Cmd+Shift+Z) – pakartoti atšauktą veiksmą

Taip pat galite atkurti puslapį į ankstesnę būseną. Spustelėkite **View history** įrankių juostoje, kad pamatytumėte išsaugotų momentinių kopijų sąrašą su aprašymais, ir spustelėkite bet kurį įrašą, kad grįžtumėte į tą būseną.

:::warning
Atkūrus momentinę kopiją, dabartinis puslapio turinys pakeičiamas momentinės kopijos versija. Tai negalima atšaukti standartiniu mygtuku **Undo**. Jei norite išlaikyti galimybę grįžti, prieš atkurdami seną versiją išsaugokite dabartinės būsenos momentinę kopiją.
:::

## Išsaugojimas ir publikavimas

Pakeitimai išsaugomi automatiškai, kai dirbate. Būsenos indikatorius įrankių juostoje rodo, ar jūsų pakeitimai išsaugoti.

### Juodraščio ir publikuotos būsenos

Puslapiai gali būti **published** (publikuoti) būsenos, kuri nusako, kada lankytojai mato jūsų pakeitimus. Įrankių juostoje rodomas būsenos žymeklis:

- **Live on save** – puslapis nenaudoja publikavimo eigos. Kiekvienas išsaugotas pakeitimas iš karto tampa matomas svetainėje. Tai numatytasis nustatymas naujiems puslapiams.
- **Unpublished changes** – puslapis jau buvo publikuotas anksčiau, bet nuo paskutinio publikavimo padarėte pakeitimų. Lankytojai dar mato ankstesnę publikuotą versiją.
- **Published** – puslapis yra gyvas, o jūsų išsaugotas turinys sutampa su tuo, ką mato lankytojai.

Norėdami publikuoti pakeitimus, spustelėkite mygtuką **Publish** įrankių juostoje. Puslapis iš karto tampa gyvas.

Norėdami grįžti prie paskutinės publikuotos versijos, nepaveikdami to, ką mato lankytojai, atidarykite papildomą meniu (⋮) ir spustelėkite **Discard unpublished changes**.

Norėdami nebenaudoti publikavimo eigos, atidarykite papildomą meniu ir spustelėkite **Turn off publishing**. Tada redagavimai vėl iš karto tampa gyvi.

:::tip
Naudokite juodraščio / publikavimo eigą, kai norite paruošti puslapį – pavyzdžiui, artėjančiam renginiui – ir padaryti jį gyvą tinkamu momentu. Sukurkite ir peržiūrėkite puslapį, o kai būsite pasiruošę, spustelėkite Publish.
:::

## Susiję straipsniai

- [Puslapių valdymas](managing-pages) – kurkite puslapius, nustatykite URL ir tvarkykite svetainės navigaciją
- [Appearance](appearance) – nustatykite visos svetainės spalvas, šriftus ir prekinį ženklą
- [Failai](files) – įkelkite nuotraukas ir dokumentus, kuriuos norite naudoti redaktoriuje
- [Formų kūrimas](../forms/creating-forms) – kurkite formas, kurias galite įterpti į puslapius
