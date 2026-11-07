---
title: "Aukų paketai"
---

# Aukų paketai

<div class="article-intro">

Paketai padeda sugrupuoti aukas, kad jas būtų lengviau sekti ir suderinti. Įprastas paketas atitinka vieną rinkliavą, pavyzdžiui, sekmadienio auką ar specialaus renginio aukas. Paketų naudojimas padeda išlaikyti tvarką ir paprasčiau patikrinti, ar įrašai sutampa su faktiškai gautais indėliais.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Įsitikinkite, kad [esate nustatę savo fondus](funds.md), kad jie būtų pasiekiami įrašant aukas
- Norint matyti paketų puslapį, reikia leidimo **Peržiūrėti aukų suvestines**, **Redaguoti aukas** arba **Įvesti aukas** (žr. [Kas gali keisti paketą](#who-can-change-a-batch))

</div>

## Paketų puslapis

Kai atsidarote **Aukos > Paketai**, matysite savo paketų sąrašą. Kiekvienoje eilutėje rodoma:

- **Pavadinimas** – jūsų suteiktas paketo pavadinimas
- **Data** – rinkliavos data
- **Aukos** – atskirų aukų skaičius pakete
- **Iš viso** – bendra suma
- **Būsena** – **Atidarytas** arba **Uždarytas** (žr. [Paketo uždarymas ir atidarymas iš naujo](#closing-and-reopening-a-batch))

Virš sąrašo metų mygtukai leidžia rodyti tik vienų metų paketus arba visus paketus – **Visi**. Vienos eilutės santrauka rodo rodomų paketų skaičių, dovanų skaičių ir bendrą sumą.

## Naujo paketo kūrimas

1. Viršuje spustelėkite **Pridėti paketą**.
2. Įveskite aprašomąjį pavadinimą (pvz., „Sekmadienio auka – vas. 9“).
3. Pasirinkite rinkliavos datą.
4. Spustelėkite **Išsaugoti**.

Jūsų naujas paketas atsiras sąraše, ir galėsite pridėti aukas.

## Darbas su paketais

- **Peržiūrėti aukas** – spustelėkite paketo pavadinimą, kad atidarytumėte jį ir pamatytumėte visas jame esančias aukas. Ten galite pridėti, redaguoti ar pašalinti aukas arba spustelėti **Importuoti CSV**, kad iš skaičiuoklės vienu metu pridėtumėte daug aukų (žr. [Aukų importavimas iš CSV failo](recording-donations.md#importing-donations-from-a-csv-file)).
- **Redaguoti paketo duomenis** – paketo eilutėje spustelėkite mygtuką **Redaguoti**, kad pakeistumėte pavadinimą ar datą. Paketą ištrinti gali tik asmenys, turintys leidimą **Redaguoti aukas**.
- **Rikiavimas** – naudokite stulpelių antraštes, kad paketus surikiuotumėte pagal pavadinimą ar datą.
- **Eksportas** – viršuje spustelėkite **Eksportuoti**, kad atsisiųstumėte rodomus paketus kaip skaičiuoklę (CSV).
- **Nesėkmingi įvykiai** – jei jūsų aukų priėmimo tiekėjas pranešė apie problemų, viršuje atsiranda mygtukas **Nesėkmingi įvykiai** (su neišspręstų įvykių skaičiumi). Spustelėkite jį, kad parodytumėte arba paslėptumėte įvykių sąrašą po paketais.
- **Importuoti iš Stripe** – viršuje spustelėkite **Importuoti trūkstamas Stripe operacijas**, kad atidarytumėte [Stripe importo](stripe-import.md) įrankį. Šis mygtukas rodomas tik tada, kai jūsų bažnyčios aukų priėmimo tiekėjas yra Stripe.

## Kas įvedė kiekvieną auką

Kiekviena į paketą įvesta auka rodo **Įvedė** ir asmens vardą po aukotojo vardu, todėl galite sužinoti, kas ją įvedė, be parašų lapo. B1 tai įrašo automatiškai pagal prisijungusį asmenį, o vėliau redagavus auką šis įrašas nesikeičia. Aukos, įneštos naudojant **Importuoti CSV**, rodo asmenį, kuris vykdė importą.

Internetinės aukos, [Stripe importo](stripe-import.md) įrankiu pridėtos aukos ir aukos, įvestos prieš tai pridedant šią funkciją 2026 m. lapkritį, vardo nerodo.

## Paketo uždarymas ir atidarymas iš naujo

Kai paketas suskaičiuotas ir pinigai įnešti į banką, uždarykite jį, kad aukos liktų tokios, kokios buvo jį uždarant.

1. Atidarykite paketą.
2. Viršuje spustelėkite **Uždaryti paketą**.

Būsenos žymė šalia paketo pavadinimo pasikeičia iš **Atidarytas** į **Uždarytas**, paketų puslapio stulpelyje **Būsena** paketas rodomas kaip **Uždarytas**, o paketo viršuje pateiktas pranešimas paaiškina, kad jis uždarytas. Kol paketas uždarytas, asmenys, turintys leidimą **Įvesti aukas**, gali jį peržiūrėti, bet negali pridėti, redaguoti ar ištrinti jo aukų ar keisti paketo pavadinimo ar datos.

Norėdami vėl keisti, atidarykite paketą ir spustelėkite **Atidaryti paketą iš naujo**. Nauji paketai visada pradedami atidaryti.

:::info
Mygtukus **Uždaryti paketą** ir **Atidaryti paketą iš naujo** mato tik asmenys, turintys leidimą **Redaguoti aukas**. Jie taip pat gali keisti aukas uždarytame pakete, jei reikia ištaisymo, nebeatidarę paketo.
:::

## Kas gali keisti paketą

Du [vaidmenų leidimai](../settings/roles-permissions.md) leidžia asmeniui dirbti su paketais:

- **Redaguoti aukas** – pilna prieiga: galima pridėti ir ištrinti paketus, juos uždaryti ir atidaryti iš naujo, pridėti, redaguoti ar ištrinti bet kokią auką, nepriklausomai nuo to, ar paketas atidarytas, ar uždarytas.
- **Įvesti aukas** – skirta skaičiavimo komandoms ir savanoriams, įvedantiems rinkliavas. Jie gali pridėti paketus ir pridėti, redaguoti ar ištrinti aukas, bet tik tada, kai paketas atidarytas. Jie negali ištrinti paketų, jų uždaryti ar atidaryti iš naujo arba keisti aukų, gautų per internetines aukas.

Asmuo, turintis **Įvesti aukas**, bet neturintis **Peržiūrėti aukų suvestines**, B1 Admin meniu mato **Aukos**, kuris tiesiogiai veda į paketų puslapį. **Suvestinė**, **Fondai**, **Kampanijos** ir **Aukų pažymos** jiems lieka paslėpti. Norint atidaryti paketą ir pamatyti jame esančias aukas, vaidmeniui taip pat reikalingas leidimas **Peržiūrėti aukas**.

:::tip
Dažnas nustatymas – vaidmuo „Skaičiavimo komanda“ su leidimais **Įvesti aukas** ir **Peržiūrėti aukas**, o iždininkas su leidimu **Redaguoti aukas** uždaro kiekvieną paketą, kai indėlis suderintas.
:::

## Paketo spausdinimas

Atidarykite paketą ir virš aukų sąrašo spustelėkite **Spausdinti**, kad atspausdintumėte popierinę kopiją savo skaičiavimo komandai ar indėlių įrašams. Spaudinyje yra:

- Jūsų bažnyčios antraštė – jūsų logotipas (**Šviesaus fono logotipas** iš [Svetainė > Išvaizda](../website/appearance.md), jei jį įkėlėte), o po juo – bažnyčios pavadinimas – tada paketo pavadinimas ir paketo data
- Kiekviena paketo auka su aukotojo vardu, kas ją įvedė, būdu, pastabomis, data ir suma (grąžintos aukos perbrauktos ir pažymėtos kaip grąžintos)
- **Fondų tarpinės sumos** – bendra kiekvienam fondui paketo metu surinkta suma
- **Paketo suma** – bendra visos paketo sumos vertė

Mygtukas **Spausdinti** rodomas tik tada, kai pakete yra bent viena auka.

### Kelių paketų spausdinimas vienu metu

Norėdami vienu kartu atspausdinti visus tam tikro laikotarpio paketus – pavyzdžiui, visus praėjusio mėnesio indėlius – viršuje, šalia **Eksportuoti**, spustelėkite **Spausdinti** paketų puslapyje. Atsidaro puslapis **Spausdinti paketus** su **Pradžios data** ir **Pabaigos data**, atitinkančiomis ekrane rodomus paketus: nuo sausio 1 d. iki gruodžio 31 d. pasirinktų metų arba nuo ankstyviausios iki vėliausios paketo datos, kai pasirinkta **Visi**. Bet kurią datą galite pakeisti, kad pasirinktumėte kitą laikotarpį.

Kiekvienas paketas, datuotas nurodytame laikotarpyje (įskaitant pradžios ir pabaigos datas), spausdinamas datos tvarka, po vieną paketą puslapyje, naudojant tokį patį maketą kaip ir vieno paketo spaudinys. Paketai be aukų praleidžiami, o jei nė viename laikotarpio pakete nėra aukų, pamatysite pranešimą „Šiame datų intervale nėra paketų su aukomis.“ Spustelėkite **Spausdinti**, kad atidarytumėte naršyklės spausdinimo langą, arba **Uždaryti**, kad grįžtumėte į paketų sąrašą.

## Paketo eksportavimas į QuickBooks Online

Atidarykite paketą ir spustelėkite **Eksportuoti QuickBooks**, kad atsisiųstumėte paketą kaip žurnalo įrašą, kurį QuickBooks Online gali importuoti (**Nustatymai > Importuoti duomenis > Žurnalo įrašai**). Faile yra vienas debetas sąskaitoje **Neįnešti fondai** už bendrą paketo sumą ir vienas kreditas kiekvienam fondui, o kaip sąskaitos pavadinimas naudojamas kiekvieno fondo pavadinimas. Importuojant QuickBooks paprašys susieti šiuos pavadinimus su jūsų sąskaitų planu, todėl pavadinkite fondus taip, kaip buhalteris vadina pajamų sąskaitas, arba susiekite juos kartą importavimo metu.

:::tip
Vienodai pavadinkite paketus, kad vėliau juos būtų lengva rasti. Įtraukus datą ir rinkliavos tipą (pvz., „Sekmadienio rytas – 2025-02-09“), sąrašas išlieka tvarkingas, kai jis auga.
:::

## Kiti žingsniai

Kai turite paketą, žr. [Aukų įrašymas](recording-donations.md), kad sužinotumėte, kaip į jį pridėti atskiras aukas. Taip pat galite [importuoti Stripe operacijas](stripe-import.md), kad automatiškai sukurtumėte paketus iš internetinių aukų.
