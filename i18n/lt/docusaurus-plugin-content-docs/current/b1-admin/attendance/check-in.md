---
title: "Savitarnos registracija: B1 Checkin ir B1 Admin"
sidebar_label: "Registracija atvykus"
description: "Nustatykite savitarnos registraciją su B1 Checkin programėle B1 Admin: įrenginiai, kioskų paskyros, tvarkaraščiai, prekės ženklas ir QR svečių registracija."
---

# Registracija atvykus

<div class="article-intro">

B1 Admin palaiko savitarnos registraciją į pamaldas per papildomą programėlę **B1 Checkin**. Nariai gali patys užsiregistruoti ir įregistruoti savo šeimos narius prie savitarnos terminalų arba specialių įrenginių atvykę, todėl procesas vyksta greitai, o savanoriams tenka mažiau darbo. Kiekviena registracija automatiškai įrašoma kaip lankomumas.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Jūsų filialai, pamaldų laikai ir grupės turi būti sukonfigūruoti [lankomumo nustatymuose](setup.md).
- Reikia, kad [žmonės būtų įtraukti į duomenų bazę](../people/adding-people.md), o [namų ūkiai](../people/adding-people.md#managing-households) būtų nustatyti, kad šeimos galėtų registruotis kartu.
- Jums reikės planšetinio kompiuterio ir, jei norite, Brother etikečių spausdintuvo (žr. [aparatinės įrangos rekomendacijas](#recommended-hardware) žemiau).

</div>

## Kaip tai veikia

Programėlė B1 Checkin prisijungia prie jūsų B1 Admin lankomumo nustatymų. Kai narys užsiregistruoja, jo lankomumas automatiškai įrašomas į atitinkamą filialą, pamaldų laiką ir grupę. Nereikia rankiniu būdu įvesti lankomumo asmenims, kurie naudojasi registracijos sistema.

## Registracijos atvykus nustatymas

1. **Pirmiausia sukonfigūruokite lankomumo struktūrą.** B1 Admin eikite į **People > Attendance** ir spustelėkite **Setup**, kad įsitikintumėte, jog filialai, pamaldų laikai ir grupės yra nustatyti. Registracijos programėlė remiasi šiuo nustatymu. Pasirinktinai kiekvienam pamaldų laikui galite nustatyti [registracijos tvarkaraštį](setup.md#setting-a-check-in-schedule), kad registracija kiekvieną savaitę būtų atidaroma ir uždaromas automatiškai. Tvarkaraščiai naudoja pamaldų filialo laiko juostą arba jūsų bažnyčios laiko juostą, jei filialui ji nenustatyta. Terminale pamaldų laikai, kurių registracijos langas uždarytas, rodomi kaip **Closed**, o šeimoms nurodoma, kada registracija atsidarys. Daugiau informacijos rasite [Lankomumo nustatymuose](setup.md).
2. **Įdiekite programėlę B1 Checkin** įrenginiuose, kuriuos ketinate naudoti. Programėlė prieinama šiose platformose:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung planšetėms:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire planšetėms:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Prisijunkite prie programėlės B1 Checkin** naudodami paskyrą, kuri turi **Checkin** lankomumo leidimą (arba **Edit Attendance**). Žr. [Registracijos terminalų paskyros](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Pasirinkite filialą ir pamaldų laiką** dabartiniam susirinkimui.
5. Dabar nariai gali įrenginyje ieškoti savo vardo ir užsiregistruoti.

:::tip
Registracijos įrenginius pastatykite matomose, lengvai pasiekiamose vietose, pavyzdžiui, bažnyčios įėjime arba sveikinimo stalelyje. Trumpas pranešimas per pamaldas padeda nariams žinoti, kad ši galimybė yra.
:::

:::tip
Jei jūsų bažnyčia turi kelis filialus, [Lankomumo nustatymuose](setup.md) reikės pakartoti sąranką kiekvienam filialui. Kiekvienas registracijos įrenginys gali būti sukonfigūruotas skirtingam filialui.
:::

## Rekomenduojama aparatinė įranga

**Planšetiniai kompiuteriai** – su programėle gerai veikia bet kuris iš šių:

- **Kompaktiškas:** Samsung Galaxy Tab A7 Lite 8.7"
- **Didelis ekranas:** Samsung Galaxy Tab A8 10.5"
- **Ekonomiškas:** Amazon Fire HD 10

**Spausdintuvai** – registracija veikia su Brother etikečių spausdintuvais, kurie spausdina vardines žymes:

- **Geriausias:** Brother QL-1110NWB (palaiko kelis planšetinius kompiuterius per Bluetooth ir WiFi)
- **Geras:** Brother QL-810W (palaiko kelis planšetinius kompiuterius per WiFi)
- **Ekonomiškas:** Brother QL-1100 (tik WiFi)

**Etiketės:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Programėlei B1 Checkin suderinami tik Brother etikečių spausdintuvai. Kitų gamintojų spausdintuvai vardinių žymių nespausdins.
:::

:::info
Prijunkite spausdintuvą pagal jo sąrankos instrukcijas, kad jis būtų prijungtas prie to paties WiFi tinklo kaip ir planšetinis kompiuteris. Brother spausdintuvų tvarkykles ir sąrankos vadovus rasite [Brother palaikymo svetainėje](https://support.brother.com).
:::

## Registracijos terminalo išvaizdos pritaikymas

Galite pritaikyti programėlės B1 Checkin išvaizdą, kad ji atitiktų jūsų bažnyčios stilių. B1 Admin eikite į **Mobile > B1 CheckIn** ir naudokite kortelę **Kiosk Theme**, kad sukonfigūruotumėte:

### Spalvos

Galite pritaikyti aštuonis spalvų nustatymus, kad jie atitiktų jūsų bažnyčios stilių:

- **Primary** ir **Primary Contrast** -- pagrindinė prekės ženklo spalva ir jos teksto spalva.
- **Secondary** ir **Secondary Contrast** -- papildoma spalva ir jos teksto spalva.
- **Header Background** ir **Subheader Background** -- registracijos terminalo antraštės sričių spalvos.
- **Button Background** ir **Button Text** -- interaktyvių mygtukų spalvos.

### Fono paveikslėlis

Pasirinktinai įkelkite fono paveikslėlį registracijos sveikinimo ir paieškos ekranams. Rekomenduojamas dydis – 1920x1080 pikselių.

### Laukimo ekranas / ekrano užsklanda

Nustatykite ekrano užsklandą, kuri įsijungs po tam tikro neveiklumo laikotarpio:

1. Įjunkite arba išjunkite laukimo ekraną.
2. Nustatykite **timeout** (kiek sekundžių neveiklumo praeis, kol įsijungs ekrano užsklanda; mažiausiai 10 sekundžių).
3. Pridėkite vieną ar daugiau **slides** -- kiekviename skaidrėje yra paveikslėlis ir rodymo trukmė (mažiausiai 3 sekundės).

:::tip
Kai terminalas nenaudojamas, laukimo ekrane rodykite skelbimus, artėjančius renginius ar sveikinimus.
:::

## Svečių registracija per QR kodą

Registracijos terminale gali būti rodomas QR kodas, kurį lankytojai nuskaito, kad patys savo telefonu užsiregistruotų ir įregistruotų savo šeimą. Tai pagreitina registraciją pirmą kartą atvykstantiems svečiams.

Nuskaitę QR kodą, svečiai patenka į [svečių registracijos puslapį](../../b1-church/checkin/guest-registration.md), kur įveda savo šeimos narių vardus ir kitą informaciją, kurios pageidaujate. Tuomet savanoris gali juos rasti terminale ir užregistruoti.

### QR kodo svečių registracijos įjungimas

Norėdami įjungti QR kodo rodymą:

1. B1 Admin atidarykite [Jump meniu](../introduction.md#getting-around-with-the-jump-menu) (paieškos laukelis viršutiniame kairiajame kampe) ir išskleiskite **Mobile**.
2. Spustelėkite **B1 CheckIn**.
3. Įjunkite **QR Guest Registration** ir spustelėkite **Save**.

:::note
Šis nustatymas yra **Mobile > B1 CheckIn** (tame pačiame puslapyje, kaip ir kortelė **Kiosk Theme**), o ne Attendance skiltyje. Veiksmas **Kiosk** lankomumo puslapyje turi nuorodą į šį puslapį.
:::

Įjungus jungiklį, kitos toliau aprašytos parinktys pasirodo toje pačioje kortelėje **QR Guest Registration**. Pakeitę bet kurią iš jų, spustelėkite kortelės mygtuką **Save**.

### Registracijos laukų pasirinkimas

Sąrašas **Sign-up fields** nurodo, ko klausiama registracijos formoje. **First Name** ir **Last Name** visada yra formoje ir visiems šeimos nariams privalomi. Kiekvienam kitam laukui įjunkite **Include**, kad jis būtų įtrauktas į formą, o tada įjunkite **Required**, jei svečiai privalo jį užpildyti. **Required** galima įjungti tik įtrauktam laukui, o išjungus **Include**, **Required** nustatymas panaikinamas.

| Laukas | Klausiama | Įtraukta pagal numatytuosius nustatymus |
|-------|-----------|---------------------|
| **Email** | Tik pagrindinio kontaktinio asmens | Taip (neprivaloma) |
| **Phone** | Tik pagrindinio kontaktinio asmens | Taip (neprivaloma) |
| **Home address** | Vieną kartą visai šeimai -- gatvė, adreso eilutė 2, miestas, valstija ir pašto kodas. Kai laukas privalomas, turi būti užpildyta viskas, išskyrus adreso eilutę 2. Adresas išsaugomas kiekvienam šeimos nariui. | Ne |
| **Birth date** | Kiekvienam šeimos nariui | Ne |
| **Gender** | Kiekvienam šeimos nariui | Ne |
| **Marital status** | Tik pagrindinio kontaktinio asmens | Ne |
| **Grade** | Kiekvienam šeimos nariui (nuo PreK iki 12 klasės arba Graduated) | Ne |
| **Comments** | Vieną kartą, lauke po šeimos nariais (iki 1 000 simbolių) | Ne |

Išjungti laukai niekada neišsaugomi, net jei kas nors registracijai juos pateiktų kitu būdu. Komentarai išsaugomi kaip pastaba pagrindinio kontaktinio asmens įraše (pažymima kaip „Guest sign-up“), todėl juos galite perskaityti jo profilio skiltyje **Notes**.

### Svečių priskyrimas grupei

Naudokite **Add new guests to group**, kad visi užsiregistravę asmenys būtų automatiškai priskirti vienai iš jūsų grupių, pavyzdžiui, grupei „Naujokai“ arba šio savaitgalio renginio grupei. Pasirinkite **None** (numatytasis), jei to nenorite. Svečiai nemato ir nepasirenka grupės – ji nustatoma tik čia. Prieš kiekvieną renginį ją pakeiskite, kad vėliau galėtumėte kartu susisiekti su tano renginio svečiais.

### Lankomumo įrašymas

Pasirinkus grupę, pasirodo jungiklis **Also record attendance**. Įjunkite jį, kad svečiai būtų iš karto pažymėti kaip dalyvaujantys, kai užsiregistruoja, ir jų nereikėtų registruoti atskirai.

Lankomumas įrašomas tik tuomet, kai registracija vyksta vieno iš pasirinktos grupės **planuotų** pamaldų laikų metu:

- Grupė turi būti susieta su vienu ar keliais pamaldų laikais, o tiems pamaldų laikams turi būti nustatytas [registracijos tvarkaraštis](setup.md#setting-a-check-in-schedule) (**Day** ir **Start Time**).
- „Metu“ reiškia registracijos langą to pamaldų laiko ribose – nuo **Open check-in** minučių prieš pradžią iki **Close check-in** minučių po pabaigos (arba po pradžios, jei pabaigos laikas nenurodytas; jei nenurodytas nei pabaigos laikas, nei uždarymo minutės, – iki tos dienos pabaigos). Laikas skaičiuojamas toje pačioje laiko juostoje, kurią naudoja registracijos tvarkaraštis.
- Kiekvienas šeimos narys pažymimas kaip dalyvaujantis grupėje dėl kiekvieno jos pamaldų laiko, kuris tuo metu yra atviras, šios dienos datai.
- Registracijos, vykusios kitu laiku, arba grupei, kurios pamaldų laikams tvarkaraštis nenustatytas, pridedamos į grupę, bet laikomos nedalyvavusiomis.

### Antraštės nuotrauka

Skiltyje **Header photo** spustelėkite **Change photo**, kad pasirinktumėte arba įkeltumėte paveikslėlį (apkarpytą 16:9 formatu), kuris bus rodomas registracijos puslapio viršuje vietoj numatytosios piktogramos. Spustelėkite **Remove**, kad grįžtumėte prie piktogramos.

### Registracijos nuorodos bendrinimas

Įjungus QR Guest Registration, kortelės apačioje pasirodo skyrius **Share registration QR code**. Jis suteikia dvi papildomas galimybes, kaip nukreipti svečius į registracijos formą, be terminalo QR kodo:

- **Copy link** – nukopijuoja registracijos URL, kad galėtumėte jį įdėti į bažnyčios svetainę, el. laiškus ar bet kur internete.
- **Download PNG** – atsisiunčia QR kodą kaip paveikslėlį, kurį galima spausdinti ant skrajučių, biuletenių ar iškabų.

:::tip
Registracijos nuorodą įdėkite į bažnyčios svetainės puslapį „Plan Your Visit“ arba „I'm New“, kad svečiai galėtų užsiregistruoti dar iki atvykimo.
:::

### Kas nutinka po svečio registracijos

B1 pirmiausia ieško asmenų, kurie jau yra skiltyje **People**. Šeimos narys priskiriamas esamam asmeniui, kai yra tiksliai vienas asmuo su tuo pačiu vardu ir tuo pačiu el. paštu arba telefono numeriu. Vaikas, įvestas be el. pašto ar telefono, priskiriamas pagal vardą priskirtame namų ūkyje. Priskirti asmenys naudojami tokie, kokie yra – registracija niekada nekeičia jų duomenų ar narystės statuso – o naujas narys prisijungia prie priskirto namų ūkio.

Jei niekas nesutampa, registracija sukuria naują namų ūkį, pavadintą pagrindinio kontaktinio asmens pavarde, ir kiekvienam šeimos nariui – asmens įrašą. Visi nauji asmenys pridedami prie **People** su narystės statusu **Visitor**, o pagrindinis kontaktinis asmuo tampa namų ūkio vadovu.

Ir priskirti, ir nauji asmenys pridedami prie jūsų pasirinktos grupės (jei jų joje dar nėra), o jei tai įjungta, jų lankomumas įrašomas. Komentarai išsaugomi kaip pastaba pagrindiniam kontaktiniam asmeniui.

Norėdami automatiškai susisiekti su svečiais, pridėkite [darbo eigos paleidiklį](../serving/workflows.md#triggers), pavyzdžiui, **Person · Created** su sąlyga *Membership Status is Visitor*, arba **Group · Member Joined** jūsų pasirinktai grupei.

## Kas įrašoma

Kiekviena registracija sukuria lankomumo įrašą B1 Admin. Šiuos įrašus galite peržiūrėti [Lankomumo](tracking-attendance.md) puslapyje ir kiekvienos [grupės](../groups/group-members.md) susirinkimuose, lygiai taip pat kaip rankiniu būdu įvestą lankomumą. Duomenys rodomi vienodai – abu būdai maitina tas pačias ataskaitas.
