---
title: "Savitarnos registracijos nustatymas su B1 Checkin ir B1 Admin"
sidebar_label: "Registracija"
description: "Nustatykite savitarnos registraciją pamaldoms naudodami B1 Checkin programėlę B1 Admin sistemoje: įrenginiai, kioskų paskyros, tvarkaraščiai, prekinis ženklas ir svečių registracija per QR kodą."
---

# Registracija

<div class="article-intro">

B1 Admin palaiko savitarnos registraciją pamaldų metu naudojant papildomą **B1 Checkin** programėlę. Nariai gali patys save ir savo šeimas užregistruoti kioskuose arba skirtuose įrenginiuose atvykę, taip procesas tampa greitesnis ir sumažėja savanorių darbo krūvis. Kiekviena registracija automatiškai įrašoma kaip lankomumas.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Jūsų filialai, pamaldų laikai ir grupės turi būti sukonfigūruoti skiltyje [Lankomumo nustatymai](setup.md).
- Turite turėti [asmenis savo duomenų bazėje](../people/adding-people.md) su nustatytais [namų ūkiais](../people/adding-people.md#managing-households), kad šeimos galėtų registruotis kartu.
- Jums reikės planšetinio kompiuterio ir, jei norite, „Brother“ etikečių spausdintuvo (žr. žemiau [techninės įrangos rekomendacijas](#recommended-hardware)).

</div>

## Kaip tai veikia

B1 Checkin programėlė susijungia su jūsų B1 Admin lankomumo nustatymais. Kai narys registruojasi, jo lankomumas automatiškai įrašomas prie teisingo filialo, pamaldų laiko ir grupės. Nereikia rankiniu būdu įvesti lankomumo kiekvienam, kuris naudojasi registracijos sistema.

## Registracijos nustatymas

1. **Pirmiausia sukonfigūruokite lankomumo struktūrą.** B1 Admin sistemoje eikite į **Žmonės > Lankomumas** ir spustelėkite **Nustatymai**, kad įsitikintumėte, jog filialai, pamaldų laikai ir grupės yra nustatyti. Registracijos programėlė remiasi šia konfigūracija. Jei norite, kiekvienam pamaldų laikui galite priskirti [registracijos tvarkaraštį](setup.md#setting-a-check-in-schedule), kad registracija kiekvieną savaitę būtų atidaroma ir uždaroma automatiškai. Tvarkaraščiai naudoja pamaldų filialo laiko juostą, o jei filialui ji nenustatyta – jūsų bažnyčios laiko juostą. Kioskas pamaldų laikus, kurių registracijos langas uždarytas, rodo kaip **Uždaryta** ir praneša šeimoms, kada registracija atsidarys. Daugiau informacijos rasite skyriuje [Lankomumo nustatymai](setup.md).
2. **Įdiegite B1 Checkin programėlę** įrenginiuose, kuriuos planuojate naudoti. Programėlė prieinama šiose platformose:
   - **iPad / iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android / Samsung planšetės:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire planšetės:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Prisijunkite prie B1 Checkin programėlės** naudodami paskyrą, turinčią **Registracijos** lankomumo leidimą (arba **Redaguoti lankomumą**). Žr. [Registracijos kioskų paskyros](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Pasirinkite filialą ir pamaldų laiką** dabartiniam susibūrimui.
5. Dabar nariai gali įrenginyje ieškoti savo vardo ir užsiregistruoti.

:::tip
Registracijos įrenginius statykite matomose, lengvai pasiekiamose vietose, pavyzdžiui, prie lobio įėjimų ar sveikinimo stalų. Trumpas pranešimas pamaldų metu padės nariams sužinoti, kad ši galimybė yra.
:::

:::tip
Jei jūsų bažnyčia turi kelis filialus, nustatymą turėsite pakartoti kiekvienam filialui skiltyje [Lankomumo nustatymai](setup.md). Kiekvienas registracijos įrenginys gali būti sukonfigūruotas skirtingam filialui.
:::

## Rekomenduojama įranga

**Planšetiniai kompiuteriai** – su programėle gerai veikia bet kuris iš šių:

- **Kompaktiškas:** Samsung Galaxy Tab A7 Lite 8,7"
- **Didelis ekranas:** Samsung Galaxy Tab A8 10,5"
- **Biudžetinis:** Amazon Fire HD 10

**Spausdintuvai** – registracija veikia su „Brother“ etikečių spausdintuvais vardinėms žymoms spausdinti:

- **Geriausias:** Brother QL-1110NWB (palaiko kelias planšetes per „Bluetooth“ ir „WiFi“)
- **Geras:** Brother QL-810W (palaiko kelias planšetes per „WiFi“)
- **Biudžetinis:** Brother QL-1100 (tik „WiFi“)

**Etiketės:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
B1 Checkin programėlei suderinami tik „Brother“ etikečių spausdintuvai. Kitų gamintojų spausdintuvai vardinėms žymoms spausdinti neveiks.
:::

:::info
Spausdintuvą prijunkite pagal jo sąrankos instrukcijas, kad jis būtų prijungtas prie to paties „WiFi“ tinklo kaip ir planšetė. „Brother“ spausdintuvų tvarkykles ir sąrankos vadovus rasite [Brother palaikymo svetainėje](https://support.brother.com).
:::

## Kiosko išvaizdos pritaikymas

Galite pritaikyti B1 Checkin programėlės išvaizdą, kad ji atitiktų jūsų bažnyčios prekinį ženklą. B1 Admin sistemoje eikite į **Mobilusis > B1 CheckIn** ir naudokite kortelę **Kiosko tema**, kad sukonfigūruotumėte:

### Spalvos

Galite nustatyti aštuonias spalvas, atitinkančias jūsų bažnyčios prekinį ženklą:

- **Pagrindinė** ir **Pagrindinės spalvos tekstas** – pagrindinė prekinio ženklo spalva ir jos teksto spalva.
- **Antrinė** ir **Antrinės spalvos tekstas** – akcentinė spalva ir jos teksto spalva.
- **Antraštės fonas** ir **Poantraštės fonas** – kiosko antraštės sričių spalvos.
- **Mygtuko fonas** ir **Mygtuko tekstas** – interaktyvių mygtukų spalvos.

### Fono paveikslėlis

Galite įkelti neprivalomą fono paveikslėlį kiosko sveikinimo ir paieškos ekranams. Rekomenduojamas dydis – 1920x1080 pikselių.

### Laukimo ekranas / ekrano užsklanda

Nustatykite ekrano užsklandą, kuri aktyvuojasi po tam tikro neveiklumo laiko:

1. Įjunkite arba išjunkite laukimo ekraną.
2. Nustatykite **laiko limitą** (kiek sekundžių be veiklos prieš pradedant ekrano užsklandą, mažiausiai 10 sekundžių).
3. Pridėkite vieną ar daugiau **skaidrių** – kiekvienai skaidrei nurodykite paveikslėlį ir rodymo trukmę (mažiausiai 3 sekundės).

:::tip
Laukimo ekraną naudokite pranešimams, artėjantiems renginiams ar sveikinimo žinutėms rodyti, kai kioskas nenaudojamas.
:::

## Registracija svečiams per QR kodą

Registracijos kioskas gali rodyti QR kodą, kurį lankytojai nuskenuoja, kad patys savo telefonu užsiregistruotų ir užregistruotų savo šeimą. Tai pagreitina registraciją pirmą kartą atvykstantiems svečiams.

Kai svečias nuskenuoja QR kodą, jis nukreipiamas į [svečių registracijos puslapį](../../b1-church/checkin/guest-registration.md), kur įveda savo šeimos narių vardus ir kitą informaciją, kurios norite paprašyti. Tada savanoris gali surasti svečią kioske ir jį užregistruoti.

### QR kodo registracijos įjungimas

Norėdami įjungti QR kodo rodymą:

1. B1 Admin sistemoje atidarykite [Greitąjį meniu](../introduction.md#getting-around-with-the-jump-menu) (paieškos laukas viršuje kairėje) ir išskleiskite **Mobilusis**.
2. Spustelėkite **B1 CheckIn**.
3. Įjunkite **QR svečių registracija** ir spustelėkite **Išsaugoti**.

:::note
Šis nustatymas yra **Mobilusis > B1 CheckIn** (tame pačiame puslapyje kaip ir kortelė **Kiosko tema**), o ne skiltyje Lankomumas. Veiksmas **Kioskas** lankomumo puslapyje turi nuorodą į šį puslapį.
:::

Įjungus jungiklį, toliau nurodytos parinktys atsiranda toje pačioje kortelėje **QR svečių registracija**. Pakeitę bet kurią iš jų, spustelėkite kortelės **Išsaugoti** mygtuką.

### Registracijos laukų pasirinkimas

Sąrašas **Registracijos laukai** nustato, ko klausiama registracijos formoje. **Vardas** ir **Pavardė** formoje visada yra ir visiems šeimos nariams yra privalomi. Kiekvienam kitam laukui įjunkite **Įtraukti**, kad jis būtų pridėtas prie formos, o tada įjunkite **Privalomas**, jei svečiai turi jį užpildyti. **Privalomas** galima įjungti tik įtraukus lauką, o išjungus **Įtraukti**, jis automatiškai išjungiamas.

| Laukas | Klausiama | Įtrauktas pagal numatytuosius nustatymus |
|--------|-----------|------------------------------------------|
| **Titulas** | Kiekvieno šeimos nario, kaip išskleidžiamasis sąrašas prieš vardą (Mr, Mrs, Miss, Ms, Dr, Prof, Rev, Pastor) | Ne |
| **El. paštas** | Tik pagrindiniam kontaktui | Taip (neprivaloma) |
| **Telefonas** | Kiekvienas šeimos narys. Kai privalomas, telefoną turi nurodyti tik pagrindinis kontaktas. | Taip (neprivaloma) |
| **Vaidmuo namų ūkyje** | Kiekvienas šeimos narys, išskyrus pagrindinį kontaktą – sutuoktinis, vaikas arba kitas. Pagrindinis kontaktas yra naujo namų ūkio vadovas. Asmuo be vaidmens išsaugomas kaip kitas. | Taip (neprivaloma) |
| **Namų adresas** | Vieną kartą visai šeimai – gatvė, adreso eilutė 2, miestas, valstija ir pašto kodas. Kai privalomas, turi būti užpildyta viskas, išskyrus adreso eilutę 2. Adresas išsaugomas kiekvienam šeimos nariui. | Ne |
| **Gimimo data** | Kiekvienas šeimos narys | Ne |
| **Lytis** | Kiekvienas šeimos narys | Ne |
| **Šeimyninė padėtis** | Tik pagrindinis kontaktas | Ne |
| **Klasė** | Kiekvienas šeimos narys (nuo PreK iki 12 klasės arba Baigęs) | Ne |
| **Komentarai** | Vieną kartą, lauke po šeimos nariais (iki 1 000 simbolių) | Ne |

Išjungti laukai niekada neišsaugomi, net jei kas nors juos kitu būdu nusiųstų registracijai. Komentarai išsaugomi kaip pastaba pagrindinio kontakto įraše (pažymėta „Svečio registracija“), todėl juos galite perskaityti jo profilio skiltyje **Pastabos**.

### Svečių pridėjimas į grupę

Naudokite **Pridėti naujus svečius į grupę**, kad visi registruojantys asmenys būtų automatiškai įtraukti į vieną iš jūsų grupių – pavyzdžiui, į grupę „Naujokai“ arba į šio savaitgalio renginio grupę. Pasirinkite **Nėra** (numatytoji reikšmė), jei to nereikia. Svečiai grupės nemato ir nepasirenka – ji nustatoma tik čia. Prieš kiekvieną renginį ją pakeiskite, kad galėtumėte kartu sekti tro šio renginio svečius.

### Lankomumo įrašymas

Pasirinkus grupę, atsiranda jungiklis **Taip pat įrašyti lankomumą**. Įjunkite jį, kad svečiai būtų pažymėti kaip dalyvaujantys tą akimirką, kai užsiregistruoja, ir jų nereikėtų registruoti atskirai.

Lankomumas įrašomas tik tuomet, kai registracija vyksta vieno iš pasirinktos grupės **suplanuotų** pamaldų laikų metu:

- Grupė turi būti susieta su vienu ar keliais pamaldų laikais, o tiems pamaldų laikams turi būti nustatytas [registracijos tvarkaraštis](setup.md#setting-a-check-in-schedule) (**Diena** ir **Pradžios laikas**).
- „Metu“ reiškia registracijos langą to pamaldų laiko ribose – nuo **Registracijos atidarymo** minučių iki pradžios iki **Registracijos uždarymo** minučių po pabaigos (arba po pradžios, jei pabaigos laikas nenurodytas; jei nėra nei pabaigos laiko, nei uždarymo minučių – iki tos dienos pabaigos), tuo pačiu laiko juostos, kurią naudoja registracijos tvarkaraštis.
- Kiekvienas šeimos narys pažymimas kaip dalyvaujantis grupėje už kiekvieną jos pamaldų laiką, kuris tuo metu yra atidarytas, šiandienos datai.
- Registracijos, vykstančios kitu metu, arba grupei, kurios pamaldų laikams nenustatytas tvarkaraštis, pridedamos į grupę, bet nelaikomos dalyvavimu.

### Antraštės nuotrauka

Skiltyje **Antraštės nuotrauka** spustelėkite **Keisti nuotrauką**, kad pasirinktumėte arba įkeltumėte paveikslėlį (apkarpytą 16:9 formatu), kuris bus rodomas registracijos puslapio viršuje vietoj numatytosios piktogramos. Spustelėkite **Pašalinti**, kad grįžtumėte prie piktogramos.

### Registracijos nuorodos bendrinimas

Įjungus QR svečių registraciją, kortelės apačioje atsiranda skiltis **Bendrinti registracijos QR kodą**. Ji suteikia dvi galimybes nukreipti svečius į registracijos formą, be kioske rodomo QR kodo:

- **Kopijuoti nuorodą** – nukopijuoja registracijos URL, kad galėtumėte jį įklijuoti į bažnyčios svetainę, el. laiškus ar bet kur internete.
- **Atsisiųsti PNG** – atsisiunčia QR kodą kaip paveikslėlį, kurį galite atspausdinti ant lankstinukų, biuletenių ar iškabų.

:::tip
Įdėkite registracijos nuorodą į bažnyčios svetainės puslapį „Planuokite apsilankymą“ arba „Esu naujas“, kad svečiai galėtų užsiregistruoti dar iki atvykimo.
:::

### Kas nutinka po svečio registracijos

B1 pirmiausia ieško asmenų, kurie jau yra skiltyje **Žmonės**. Šeimos narys priskiriamas esamam asmeniui, kai tiksliai vienas asmuo turi tą patį vardą ir tą patį el. paštą arba telefono numerį. Vaikas, įvestas be el. pašto ar telefono, priskiriamas pagal vardą tame namų ūkyje, kuris buvo priskirtas. Priskirti asmenys naudojami tokie, kokie yra – registracija niekada nekeičia jų duomenų ar narystės statuso – o bet kuris naujas asmuo prisijungia prie priskirto namų ūkio.

Jei niekas nesutampa, registracija sukuria naują namų ūkį, pavadintą pagrindinio kontakto pavarde, ir kiekvienam šeimos nariui – asmens įrašą. Visi nauji asmenys įtraukiami į **Žmones** su narystės statusu **Lankytojas**, o pagrindinis kontaktas yra namų ūkio vadovas.

Visi priskirti ir nauji asmenys pridedami į jūsų pasirinktą grupę (jei jų joje dar nėra), o jų lankomumas įrašomas, jei tai įjungta. Komentarai išsaugomi kaip pastaba pagrindiniame kontakte.

Norėdami automatiškai sekti tolesnius veiksmus, pridėkite [darbo eigos paleidiklį](../serving/workflows.md#triggers), pavyzdžiui, **Asmuo · Sukurtas** su sąlyga *Narystės statusas yra Lankytojas*, arba **Grupė · Narys prisijungė** – grupei, kurią pasirinkote aukščiau.

## Kas įrašoma

Kiekviena registracija sukuria lankomumo įrašą B1 Admin sistemoje. Šiuos įrašus galite peržiūrėti puslapyje [Lankomumas](tracking-attendance.md) ir kiekvienos [grupės](../groups/group-members.md) susitikimuose, kaip ir rankiniu būdu įvestą lankomumą. Duomenys rodomi vienodai – abu būdai maitina tas pačias ataskaitas.
