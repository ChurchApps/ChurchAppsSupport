---
title: "Pamokslų valdymas"
description: "Tvarkykite pamokslų biblioteką B1 Admin: pridėkite pamokslus iš YouTube, Vimeo ar Facebook, redaguokite duomenis ir gaukite bažnyčios podcast kanalą."
---

# Pamokslų valdymas

<div class="article-intro">

Puslapyje Pamokslai rodoma visa jūsų pamokslų biblioteka. Čia galite pridėti naujus pamokslus, redaguoti esamus įrašus ir tvarkyti turinį pagal grojaraščius. Kiekvienas pamokslas gali būti susietas su vaizdo ar garso įrašu, talpinamu YouTube, Vimeo, Facebook arba pasirinktinėje nuorodoje.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Jums reikia leidimo **contentApi.streamingServices.edit**. Jei neturite prieigos, žr. [Vaidmenys ir leidimai](../settings/roles-permissions.md).
- Sukurkite bent vieną [grojaraštį](./playlists.md), į kurį surinksite pamokslus
- Iš YouTube, Vimeo ar Facebook pasiruoškite vaizdo įrašų ID arba nuorodas

</div>

## Pamokslų bibliotekos peržiūra

1. Programoje B1 Admin atidarykite [Jump meniu](../introduction.md#getting-around-with-the-jump-menu) (paieškos juosta viršutiniame kairiajame kampe), išskleiskite **Pamokslai** ir spustelėkite **Pamokslai**.
2. Puslapyje Pamokslai pamokslai rodomi lentelėje, kurioje nurodytas kiekvieno pamokslo **Grojaraštis**, pavadinimas ir **Paskelbimo data**. Norėdami filtruoti sąrašą, naudokite paieškos lauką virš lentelės. Jūsų grojaraščiai išvardyti skydelyje **Grojaraščiai** šalia lentelės.
3. Spustelėkite **Redaguoti** bet kurioje pamokslo eilutėje, kad peržiūrėtumėte ar redaguotumėte jo duomenis.

## Pamokslo pridėjimas

1. Viršutiniame dešiniajame kampe spustelėkite mygtuką **Pridėti pamokslą** ir išskleidžiamajame sąraše pasirinkite **Pridėti pamokslą**.
2. Pasirinkite **Grojaraštį**, kuriam priskirti pamokslą.
3. Pasirinkite **Vaizdo teikėją**: YouTube, Vimeo, Facebook arba Pasirinktinė nuoroda. Rekomenduojame YouTube, nes jis geriausiai veikia su B1 sistema.
4. Įveskite vaizdo ID arba nuorodą ir spustelėkite **Gauti duomenis**. YouTube atveju vaizdo ID yra simbolių seka po `v=` YouTube nuorodoje.
5. Spustelėjus **Gauti duomenis**, pamokslo duomenys importuojami automatiškai, įskaitant paskelbimo datą, trukmę, pavadinimą, aprašymą ir miniatiūrą.
6. Atlikite norimus pakeitimus ir spustelėkite **Išsaugoti**.

:::tip
Taip pat galite pridėti nuolatinę tiesioginės transliacijos nuorodą, pasirinkdami **Pridėti nuolatinę tiesioginės transliacijos nuorodą** išskleidžiamajame sąraše **Pridėti pamokslą**. Tai sukuria nuolatinį ryšį su jūsų YouTube kanalo tiesiogine transliacija, naudojant jūsų kanalo ID. Daugiau informacijos rasite skyriuje [Tiesioginė transliacija](./live-streaming.md).
:::

## Pamokslo redagavimas

1. Bibliotekoje spustelėkite **Redaguoti** bet kurioje pamokslo eilutėje, kad atidarytumėte jo duomenis.
2. Prireikus atnaujinkite pavadinimą, pranešėją, datą, aprašymą, miniatiūrą ar medijos nuorodas.
3. Spustelėkite **Išsaugoti**, kad pritaikytumėte pakeitimus.

## Pamokslo duomenys

Kiekvienas pamokslo įrašas gali apimti:

- **Pavadinimas** -- pamokslo pavadinimas, rodomas lankytojams
- **Pranešėjas** -- asmuo, pasakęs pamokslą
- **Data** -- paskelbimo arba pasakymo data
- **Aprašymas** -- trumpas pamokslo turinio apibendrinimas
- **Miniatiūra** -- peržiūros paveikslėlis, rodomas jūsų pamokslų bibliotekoje
- **Vaizdo / garso nuorodos** -- nuorodos į pamokslo mediją YouTube, Vimeo, Facebook arba pasirinktiniame serveryje
- **Garso failo nuoroda (podkastui)** -- tiesioginė nuoroda į šio pamokslo MP3/M4A failą. Įklijuokite nuorodą arba spustelėkite **Įkelti garso įrašą**, kad įkeltumėte failą ir laukas būtų užpildytas automatiškai. Į podkasto srautą įtraukiami tik pamokslai, kuriems nurodytas šis laukas (arba tiesioginė vaizdo failo nuoroda).

## Jūsų podkasto srautas

Kai bent vienam pamokslui pridedamas garso ar vaizdo failas, B1 Admin automatiškai sukuria jūsų bažnyčios podkasto RSS srautą. Jo įjungti nereikia. Jį rasite skydelyje **Podkasto srautas** po pamokslų sąrašu: spustelėkite kopijavimo piktogramą, kad nukopijuotumėte srauto nuorodą, ir tada pateikite ją Apple Podcasts, Spotify ar bet kuriam kitam podkastų katalogui.

:::info
Pamokslai, kurie tik susieti su įterptu grotuvu (pavyzdžiui, YouTube ar Vimeo vaizdo ID), nepasirodys podkasto sraute, nes podkastų programėlėms reikia tiesioginio, atsisiunčiamo medijos failo. Norėdami įtraukti pamokslą, pridėkite **Garso failo nuorodą**.
:::

## Pamokslo planavimas tiesioginei transliacijai

Pridėję pamokslą, galite suplanuoti jo transliaciją savo tiesioginės transliacijos puslapyje:

1. Jump meniu pasirinkite **Pamokslai > Tiesioginės transliacijos laikai**.
2. Redaguokite pamaldas ir skyriuje **Vaizdo nustatymai** išskleidžiamajame sąraše pasirinkite savo pamokslą.
3. Pamokslas bus rodomas suplanuotu pamaldų laiku.

:::info
Norėdami importuoti kelis pamokslus vienu metu, o ne pridėti juos po vieną, naudokite įrankį [Masinis importavimas](./bulk-import.md), kad tiesiogiai iš savo YouTube ar Vimeo paskyros įkeltumėte vaizdo įrašus.
:::

## Kiti žingsniai

- [Grojaraščiai](./playlists.md) -- sutvarkykite pamokslus į serijas
- [Tiesioginė transliacija](./live-streaming.md) -- sukonfigūruokite transliacijos tvarkaraštį
- [Masinis importavimas](./bulk-import.md) -- vienu metu importuokite kelis pamokslus
