---
title: "Formų kūrimas"
description: "Kurkite tinkintas formas B1 Admin renginių registracijoms, apklausoms ir lankytojų kortelėms, tada dalinkitės jomis nuoroda, QR kodu ar spausdinta versija."
---

# Formų kūrimas

<div class="article-intro">

Sukurkite pritaikytas formas, kad surinktumėte informaciją iš savo bendruomenės. Galite kurti formas renginių registracijai, apklausoms, lankytojų kortelėms, narystės paraiškoms ir kitiems tikslams. Formos gali būti susietos su žmonėmis jūsų duomenų bazėje arba naudojamos kaip atskiri puslapiai su savo viešu URL adresu.

</div>

## Mokomasis vaizdo įrašas

<YouTube id="sr9wxEj9ghQ" title="Formų kūrimas ir pateikimų valdymas B1 sistemoje" next="Bažnyčios svetainės paleidimas B1 sistemoje" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Formoms **Žmonės** (susietoms su asmenų įrašais) pirmiausia reikia [žmonių jūsų duomenų bazėje](../people/adding-people.md).
- Formoms, kurios renka **mokėjimus**, turite [sukonfigūruoti Stripe internetiniam aukojimui](../donations/online-giving-setup.md).

</div>

## Naujos formos kūrimas

1. Atidarykite [Jump meniu](../introduction.md#getting-around-with-the-jump-menu) (paieškos juostą viršutiniame kairiajame **B1 Admin** kampe), išskleiskite **Žmonės** ir spustelėkite **Formos**.
2. Spustelėkite **Pridėti formą**.
3. Įveskite formos **pavadinimą**.
4. Pasirinkite formos tipą išskleidžiamajame sąraše **Susieta su**:
   - **Žmonės** — Pateikimus sieja su [asmenų įrašais](../people/adding-people.md) jūsų duomenų bazėje. Formos su žmonėmis užpildomos iš asmens įrašo, todėl jų bendrinamos nuorodos nėra.
   - **Savarankiška** — Sukuria nepriklausomą formą su savo viešu URL adresu, idealiai tinkančią išorinėms registracijoms. Tik savarankiškos formos siūlo [antraštės nuotrauką](#adding-a-header-photo), [QR kodą](#sharing-a-form-with-a-qr-code), [susietą grupę](#linking-a-form-to-a-group) ir **Sukurti asmens įrašą iš pateikimų**.
5. Spustelėkite **Išsaugoti**, kad sukurtumėte formą.

Jūsų nauja forma pasirodys sąraše. Spustelėkite ją, kad pradėtumėte pridėti klausimus.

## Tuščios formos spausdinimas {#printing-a-blank-form}

Reikia popierinės kopijos, kurią galėtumėte išdalinti — lankytojų kortelės prie registratūros ar formos, kurią žmogus be interneto galėtų užpildyti ranka? Spustelėkite **Spausdinti** šalia formos pagrindiniame formų sąraše, kad atidarytumėte peržiūrą, tada spustelėkite **Spausdinti**. Tušti laukai spausdinami su pabraukimu arba langeliu kiekvienam klausimui, kad žmonės galėtų juos užpildyti ranka; privalomi klausimai pažymėti žvaigždute. Puslapio viršuje rodomas jūsų bažnyčios logotipas (**Šviesaus fono logotipas** iš [Svetainė > Išvaizda](../website/appearance.md), jei esate jį įkėlę), o po juo — bažnyčios pavadinimas, tada formos pavadinimas. Kitų spausdinimo parinkčių nėra — spausdinkite visą formą arba nieko.

## Formos bendrinimas su QR kodu {#sharing-a-form-with-a-qr-code}

Savarankiškos formos pagrindiniame formų sąraše turi nuorodą **QR kodas** (archyvuotos formos jos neturi). Spustelėkite ją, kad atidarytumėte formos viešo URL adreso QR kodą, po kuriuo rodoma nuoroda. Spustelėkite **Atsisiųsti PNG**, kad išsaugotumėte kodą kaip paveikslėlį, kurį galėsite atspausdinti ant biuletenių ar rodyti skaidrėse. Kas nuskaito jį, atidaro formą savo telefone.

## Klausimų pridėjimas {#adding-questions}

1. Atidarykite savo formą ir eikite į skirtuką **Klausimai**.
2. Spustelėkite **Pridėti klausimą**.
3. Pasirinkite **lauko tipą** iš išskleidžiamojo sąrašo **Provider**. Galimi tipai:
   - **Teksto laukas** — trumpiems tekstiniams atsakymams
   - **Data** — datos pasirinkimui
   - **El. paštas** — el. pašto adresams
   - **Telefono numeris** — telefono numeriui įvesti
   - **Kelių pasirinkimų** — iš iš anksto nustatytų variantų pasirinkti
   - **Mokėjimas** — mokėjimams rinkti
4. Įveskite klausimo **Pavadinimą** ir pasirinktinai **Aprašymą**. Aprašymas rodomas po klausimu, kai žmonės pildo formą, todėl naudokite jį patarimams, pvz., „Nurodykite visas alergijas, apie kurias turėtume žinoti.“
5. Pažymėkite **Reikalauti atsakymo**, jei laukas privalomas.
6. Spustelėkite **Išsaugoti**.
7. Pakartokite, kad pridėtumėte daugiau klausimų.

:::warning
Lauko tipui **Mokėjimas** reikia sukonfigūruoto Stripe. Jei dar nesate nustatę internetinio aukojimo, prieš pridėdami mokėjimo laukus žr. [Internetinio aukojimo nustatymas](../donations/online-giving-setup.md). Žmonės, mokantys formoje neprisijungę, prieš priimant kortelę turi pažymėti langelį **Aš nesu robotas**.
:::

## Formos narių valdymas {#managing-form-members}

1. Atidarykite savo formą ir eikite į skirtuką **Formos nariai**.
2. Ieškokite asmens ir pridėkite jį su vaidmeniu:
   - **Administratorius** — gali redaguoti formą ir peržiūrėti visus pateikimus.
   - **Tik peržiūra** — gali peržiūrėti pateikimus, bet negali redaguoti formos.

## Formos susiejimas su grupe {#linking-a-form-to-a-group}

Bet kurią savarankišką formą galite susieti su grupe — pavyzdžiui, maldos prašymų formą mažai grupei arba medicininį leidimą jaunimo kelionei:

1. Atidarykite savo formos **Išsamią informaciją**.
2. Skiltyje **Susieta grupė** pasirinkite grupę arba palikite **Nėra**.
3. Spustelėkite **Išsaugoti**.

Kai forma susieta:

- **Grupės nariai** mato formą skiltyje **Formos** grupės puslapyje B1.church, kol forma atvira, su mygtuku **Pildyti**, kuris ją atidaro (žr. [Grupės informacija](../../b1-church/groups/group-details.md#linked-forms)).
- **Grupių vadovai** mato ir uždarytas formas bei gali perskaityti kiekvieno pateikimo atsakymus ir juos atspausdinti (vieną pateikimą arba **Spausdinti visus**). Vadovai gali tik peržiūrėti atsakymus — redaguoti formos negali, nebent jie taip pat yra [formos nariai](#managing-form-members).
- **B1 Admin** sistemoje grupės puslapyje rodoma skiltis **Susietos formos**, kurioje išvardyta kiekviena susieta forma su būsena **Atidaryta** arba **Uždaryta**. Ji matoma grupės vadovams ir asmenims, galintiems administruoti formas. Žr. [Grupės nariai](../groups/group-members.md#linked-forms).

Forma yra uždaryta, kai ji yra už savo galiojimo laikotarpio ribų. Archyvuotos formos grupės puslapyje nerodomos.

### Pateikėjų automatinis pridėjimas į grupę {#automatically-adding-submitters-to-a-group}

Formos susiejimas su grupe savaime nieko į ją nepridės. Norėdami pridėti visus pateikėjus į susietos grupės sąrašą, taip pat įjunkite **Sukurti asmens įrašą iš pateikimų** formos išsamioje informacijoje ir spustelėkite **Išsaugoti**.

Kiekvieną kartą, kai kas nors pateikia formą, atitinkamas arba naujai sukurtas asmuo pridedamas prie grupės (jau esantys grupės nariai praleidžiami). Tai naudinga tokiems atvejams kaip stovyklos registracijos forma, kuri turėtų automatiškai sudaryti stovyklos grupės sąrašą.

### Sekimo laiško siuntimas

Įjungus **Sukurti asmens įrašą iš pateikimų**, galite taip pat siųsti el. laišką kiekvienam asmeniui, kuris pateikia formą. Formos išsamioje informacijoje užpildykite **Sekimo laiško temą** ir **Sekimo laiško tekstą**. Abiejuose galite naudoti žymas `{firstName}` ir `{churchName}`. Laiškas siunčiamas tik tada, kai užpildyti abu laukai.

:::info
Sekimo laiškai siunčiami tik po to, kai jūsų bažnyčiai bus patvirtinta siųsti grupinius el. laiškus, ir jie skaičiuojami į jūsų bažnyčios dienos el. laiškų limitą. Žr. [Grupinių el. laiškų įjungimas jūsų bažnyčiai](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Formos dubliavimas

Norėdami panaudoti formą kaip naujos formos pagrindą, formų sąraše šalia formos spustelėkite **Dubliuoti** ir patvirtinkite. B1 sukuria tikslią formos kopiją — įskaitant visus klausimus — kurią galite pervadinti ir redaguoti nepriklausomai.

:::tip
Dubliavimas patogus pasikartojantiems renginiams, kai registracijos klausimai iš metų į metus nesikeičia. Dubliuokite praėjusių metų formą, atnaujinkite pavadinimą ir datas — ir viskas paruošta.
:::

## Formos savybių konfigūravimas

Formos pavadinimą ir nustatymus galite atnaujinti bet kada. Savarankiškoms formoms taip pat matysite unikalų **viešą URL adresą**, kuriuo galite dalytis su bet kuo, ir lauką **Aprašymas** — tekstą, rodomą virš klausimų viešame formos puslapyje. Jis naudingas paaiškinti žmonėms, kam skirta forma, prieš jiems pradedant ją pildyti.

### Antraštės nuotraukos pridėjimas {#adding-a-header-photo}

Savarankiškos formos gali rodyti **Antraštės nuotrauką** viršuje. Formos išsamioje informacijoje spustelėkite nuotraukos langelį arba **Pridėti nuotrauką**, tada pasirinkite arba įkelkite paveikslėlį (jis apkarpomas iki 16:9 formato). Spustelėkite **Išsaugoti**. Nuotrauka rodoma po formos pavadinimu, virš aprašymo, viešo formos URL puslapyje ir visur, kur forma įterpta naudojant svetainės elementą **Forma**. Spustelėkite **Keisti nuotrauką**, kad ją pakeistumėte, arba **Pašalinti**, kad ją nuimtumėte.

Naudokite lauką **Padėkos žinutė**, kad nustatytumėte, ką žmonės mato pateikę formą, įskaitant viešo URL adreso puslapį. Jei paliksite tuščią, jie mato „Ačiū, kad pateikėte formą!“

:::tip
Savarankiškos formos puikiai tinka renginių registracijoms. Bendrinkite viešą URL adresą el. paštu, socialiniuose tinkluose arba įterpkite formą tiesiogiai į savo bažnyčios svetainę.
:::

:::info
Norėdami įterpti formą į savo B1 svetainę, eikite į svetainės redaktorių, pridėkite naują skyrių ir pasirinkite elementą **Forma**. Tada pasirinkite formą, kurią norite rodyti. Išsamesnės informacijos apie svetainės redagavimą žr. [Puslapių valdymas](../website/managing-pages.md).
:::
