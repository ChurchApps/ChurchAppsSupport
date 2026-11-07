---
title: "Darbo eigos"
---

# Darbo eigos

<div class="article-intro">

Darbo eigos perkelia žmones per nuoseklių žingsnių seką vizualioje lentoje. Kiekvienas žmogus tampa kortele, kuri keliauja nuo vieno žingsnio prie kito: nuo pirmą kartą atvykusio svečio sekimo, iki narystės proceso ar pirmą kartą aukojusio asmens padėkos, bei bet kur kitur, kur reikia sekti daug žmonių per tuos pačius etapus. Žingsnis gali paprašyti savanorio ką nors padaryti (paskambinti, pasikalbėti) **ir** savarankiškai vykdyti automatinius veiksmus, pavyzdžiui, išsiųsti el. laišką ar SMS, palaukti kelias dienas, pridėti asmenį prie grupės. Taip darbo eigos apima tiek žmogaus atliekamą sekimą, tiek su juo susijusius rutininius darbus. Darbo eigos išplečia [Užduotis](./tasks.md) į vilkdomą Kanban lentą, kad niekas nenukristų pro plyšius.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Įsitikinkite, kad žmonės, kuriuos norite sekti, jau yra B1 Admin sistemoje
- Susipažinkite, kaip veikia [Užduotys](./tasks.md), nes kiekviena lentos kortelė yra užduotis
- Norėdami naudoti veiksmą **Siųsti el. laišką**, pirmiausia sukurkite norimus el. laiškų šablonus (tvarkomus skiltyje **Nustatymai → El. laiškų šablonai**)
- Norėdami naudoti veiksmą **Siųsti SMS**, pirmiausia prijunkite [SMS teikėją](../settings/church-settings.md#texting)
- Jums reikės atitinkamų Užduočių leidimų. Peržiūra, kortelių redagavimas ir darbo eigų valdymas yra atskiri leidimų lygiai (žr. [Vaidmenys ir leidimai](../settings/roles-permissions.md))

</div>

## Darbo eigų peržiūra

Atidarykite [Greito perėjimo meniu](../introduction.md#getting-around-with-the-jump-menu) (paieškos juosta viršutiniame kairiajame B1 Admin kampe), išskleiskite **Tarnystė** ir spustelėkite **Darbo eigos**. Jūsų darbo eigos rodomos lentelėje, kurioje nurodoma kiekvienos **Kategorija** ir **Būsena** (**Aktyvi** arba **Neaktyvi**). Jei naudojate kategorijas, sąrašo viršuje esantys skirtukai leidžia jį filtruoti pagal kategoriją. Spustelėkite bet kurią darbo eigą, kad atidarytumėte jos lentą.

## Darbo eigos kūrimas

1. Darbo eigų puslapyje spustelėkite **Pridėti darbo eigą**.
2. Pasirinkite, kaip pradėti:
   - **Tuščia darbo eiga** -- pradėkite nuo nulio ir sukurkite savo žingsnius.
   - **Pagal šabloną** -- pradėkite nuo paruošto žingsnių rinkinio, kurį galite redaguoti. Įmontuoti šablonai apima:
     - **Naujo lankytojo sekimas** -- Siųsti sveikinimo laišką → Asmeninis telefono skambutis → Pakviesti į kitą žingsnį → Prisijungė
     - **Narystės klasė** -- Išreikšti susidomėjimą → Registruotis į klasę → Dalyvauti klasėje → Baigti narystę
     - **Padėka pirmą kartą aukojusiam** -- Siųsti padėkos laišką → Pasidalyti aukojimo poveikiu → Įgyvendinta
     - **Tarnystės paskyrimo patvirtinimas** -- Prašyti ir laukti atsakymo → Skambinti savanoriui dėl neatsakytos užklausos (žr. [Tarnystės paskyrimų patvirtinimai](#serving-assignment-confirmations))

   Šablono žingsnių kūrimas gali užtrukti. Kol jis vyksta, mygtukas **Pridėti darbo eigą** rodo **Kuriama...** ir negali būti spustelėtas dar kartą, todėl nesukursite dublikato. Jei kas nors nepavyksta, puslapyje rodoma žinutė *„Darbo eigos sukurti nepavyko. Bandykite dar kartą.“*
3. Suteikite darbo eigai **Pavadinimą**.
4. Pasirinktinai priskirkite **Kategoriją**, kad susijusios darbo eigos būtų sugrupuotos. Naują kategoriją galite sukurti tiesiai iš išskleidžiamojo sąrašo.
   Tuščios darbo eigos atveju taip pat pasirenkate jos **Darbo eigos paskirtį**: **Žmonių sekimas** (įprastinė) arba **Tarnystės paskyrimo patvirtinimas**. Paskirties pakeisti po darbo eigos sukūrimo negalima.
5. Palikite darbo eigą **Aktyvią**, kad į ją būtų galima pridėti žmones, arba nustatykite **Neaktyvią**, kad ji būtų paslėpta pridėjimo prie darbo eigos sąrašuose.
6. Spustelėkite **Išsaugoti**.

:::tip
Darbo eigų sąraše naudokite mygtuką **Dublikuoti**, kad nukopijuotumėte esamą darbo eigą -- įskaitant jos žingsnius, automatinius veiksmus ir maršrutavimą -- ir panaudotumėte ją kaip naujos darbo eigos pradžios tašką.
:::

## Lentos kūrimas su žingsniais

Kiekviena darbo eigos lenta sudaryta iš **žingsnių**, rodomų kaip stulpeliai iš kairės į dešinę. Atidarykite darbo eigą ir naudokite **Pridėti žingsnį**, kad sukurtumėte kiekvieną proceso etapą.

Pridedant ar redaguojant žingsnį, galite nustatyti:

- **Žingsnio pavadinimas** -- stulpelio antraštė (pavyzdžiui, „Sveikinimo skambutis“ arba „Laukiama registracijos“).
- **Terminas (dienomis)** -- automatiškai nustato terminą, kai kortelė patenka į šį žingsnį. Kortelės, kurių terminas praėjo, pažymimos kaip **Pradelsta**.
- **Numatytasis atsakingasis** -- asmuo arba grupė, kuriems automatiškai priskiriamos naujos šio žingsnio kortelės. Kai numatytasis atsakingasis yra asmuo, jis gauna pranešimą, kad jam priskirta kortelė.
- **Automatiniai veiksmai** -- veiksmai, kuriuos sistema atlieka savarankiškai, kai kortelė patenka į žingsnį (žr. toliau).
- **Maršrutavimas** -- kur kortelė keliauja, kai palieka žingsnį (žr. [Maršrutavimas](#routing-cards-with-outcomes-and-conditions)).

Žingsnių stulpelius vilkite į tokią tvarką, kuri atitinka jūsų procesą. Ši tvarka taip pat nustato numatytąjį kelią, kuriuo kortelė eina, kai netaikomas joks kitas maršrutavimas.

:::info
Pirmiausia išsaugokite naują žingsnį. Automatiniai veiksmai ir maršrutavimas priklauso žingsniui, todėl redaktorius atrakina šias dalis tik tada, kai žingsnis jau egzistuoja.
:::

## Automatiniai veiksmai

Kiekvienas žingsnis gali turėti automatinių veiksmų sąrašą, kuris vykdomas savarankiškai tą akimirką, kai kortelė **patenka** į žingsnį -- dar prieš tai, kai kas nors ją paliečia. Taip žingsnis tiek paragina savanorį, tiek atlieka rutininį darbą aplink sekimą.

Žingsnio redaktoriuje atidarykite **Automatiniai veiksmai**, spustelėkite **Pridėti veiksmą**, pasirinkite tipą ir užpildykite jo nustatymus. Pridėkite tiek, kiek reikia; jie vykdomi **iš viršaus į apačią eilės tvarka**. Spustelėkite **Išsaugoti** žingsnyje, kad išsaugotumėte žingsnį ir visus jo veiksmus kartu. Veiksmą pašalinus šiukšliadėžės piktograma, pakeitimas įsigalioja iš karto.

| Veiksmas | Ką daro |
|---|---|
| **Siųsti el. laišką** | Asmeniui išsiunčia pasirinktą el. laiško šabloną. Galite pakeisti temos eilutę. |
| **Siųsti SMS** | Asmeniui išsiunčia jūsų parašytą žinutę per jūsų bažnyčios [SMS teikėją](../settings/church-settings.md#texting). |
| **Laukti** | Sustabdo kortelę nustatytam dienų skaičiui prieš tęsiant (žr. toliau). |
| **Pridėti prie grupės** | Prideda asmenį prie pasirinktos [grupės](../groups/index.md). |
| **Pašalinti iš grupės** | Pašalina asmenį iš pasirinktos grupės. |
| **Įrašyti lankomumą** | Pažymi asmenį kaip dalyvaujantį vykstančiame grupės pamaldų laike (žr. toliau). |
| **Pridėti į darbo eigą** | Pradeda asmens kelią kitoje darbo eigoje -- naudinga perduodant tarp procesų. |
| **Pridėti pastabą** | Įrašo pastabą į kortelės istoriją. |
| **Nustatyti lauką** | Atnaujina lauką asmens įraše: Narystės statusas, Šeimyninė padėtis, Lytis, Miestas, Valstija arba Pašto kodas. |
| **Webhook** | Išsiunčia kortelės duomenis į jūsų nurodytą išorinį interneto adresą (URL), kad būtų galima prisijungti prie kitų sistemų. |
| **Sukurti užduotį** | Sukuria [užduotį](./tasks.md) su jūsų įvestu pavadinimu ir aprašymu, priskirtą pasirinktam asmeniui. |
| **Pranešti asmeniui** | Išsiunčia pasirinktam darbuotojui ar savanoriui el. laišką ir B1 pranešimą apie kortelę (žr. toliau). |

Baigus visus žingsnio veiksmus, kortelė **lieka tame žingsnyje**, kad ją galėtų tvarkyti žmogus -- nebent žingsnyje yra automatinis maršrutas, perkeliantis ją toliau (žr. [Visiškai automatiniai žingsniai](#fully-automated-steps)).

:::info
Automatiniai veiksmai vykdomi tik tada, kai kortelė patenka įprastu keliu -- kai ji pirmą kartą pridedama, kai ją atneša rezultatas ar automatinis maršrutas, arba kai Laukimas baigiasi. Jie **nevykdomi** iš naujo, kai darbuotojas rankiniu būdu nuvilkia kortelę į žingsnį ar ją grąžina, todėl asmuo negaus to paties laiško du kartus.
:::

### El. laiškų siuntimas

Pasirinkite **Siųsti el. laišką**, išrinkite vieną iš savo el. laiškų šablonų ir pasirinktinai įveskite individualizuotą temą. Kai kortelė patenka į žingsnį, asmuo automatiškai gauna šį laišką. (Jei asmens el. pašto adresas nėra įrašytas, žingsnis tiesiog praleidžia šį veiksmą.) Šablone esantys [sujungimo laukai](../settings/email-templates.md#merge-fields), pavyzdžiui, `{{firstName}}`, užpildomi asmens paties duomenimis.

Kai laiškas išsiunčiamas, kortelės istorijoje įrašoma **El. laiškas išsiųstas**. Jei jo išsiųsti nepavyksta -- pavyzdžiui, dėl to, kad jūsų bažnyčios el. paštas dar nepatvirtintas arba pasiekta dienos riba -- įrašas „El. laiškas išsiųstas“ nepridedamas.

:::info
Darbo eigų laiškai išsiunčiami tik tada, kai jūsų bažnyčiai suteikiamas leidimas siųsti grupės el. laiškus, ir jie skaičiuojami į jūsų bažnyčios dienos el. laiškų ribą. Žr. [Grupės el. laiškų įjungimas jūsų bažnyčiai](../groups/group-members.md#turning-on-group-email-for-your-church). Veiksmas **Siųsti el. laišką** žingsnio redaktoriuje įspėja, kai šie laiškai nebus išsiųsti: *„Jūsų bažnyčios el. paštas dar nepatvirtintas...“*, jei patvirtinimas dar laukiamas, arba *„Jūsų bažnyčios el. paštas pristabdytas...“*, jei neseniai siųsti laiškai buvo grąžinti arba pažymėti kaip šlamštas.
:::

### Lankomumo įrašymas

Pasirinkite **Įrašyti lankomumą** ir spustelėkite **Pasirinkti grupę**, kad nurodytumėte grupę, kurios lankomumas turi būti įrašytas. Veiksmui įvykdžius, asmuo pažymimas kaip dalyvavęs tos grupės vykstančiame pamaldų laike -- lygiai taip, tarsi jis būtų užsiregistravęs. Tai naudinga kartu su paleidikliu, kuris pridėtų žmones prie darbo eigos, kai jie atvyksta, kad jie būtų įskaičiuoti be atskiros registracijos.

- Lankomumas matuojamas tą akimirką, kai kortelė buvo **sukurta**, todėl ankstesnis **Laukimas** darbo eigoje nestumia jos už pamaldų ribų.
- Įskaitomi tik pamaldų laikai, turintys nurodytą dieną ir pradžios laiką. Jei joks grupės pamaldų laikas tuo metu nevyksta, nieko neįrašoma, o kortelės istorijoje pažymima **Nėra planuotų pamaldų vykstant -- lankomumas neįrašytas**.
- Kai lankomumas įrašomas, kortelės istorijoje rodoma **Lankomumas įrašytas**, o po to -- grupės pavadinimas. Veiksmo paleidimas pakartotinai tai pačiai pamaldų laidai asmens nebeskaičiuoja du kartus.

### Asmens informavimas

Pasirinkite **Pranešti asmeniui**, spustelėkite **Pasirinkti asmenį** ir pasirinktinai įveskite **Žinutę**. Kai kortelė patenka į žingsnį, tas asmuo gauna el. laišką ir B1 pranešimą, kuriame nurodomas kortelėje esančio asmens vardas, darbo eigos ir žingsnio pavadinimai, jūsų žinutė ir nuoroda atidaryti kortelę. Tai naudinga, norint įspėti darbuotoją ar tarnystės vadovą -- pavyzdžiui, *„Pranešti pastoriui, kai kas nors pasiekia Narystės pokalbio žingsnį.“* Kortelės istorijoje įrašoma **Pranešta**, o po to -- asmens vardas.

### SMS siuntimas

Pasirinkite **Siųsti SMS** ir įveskite **SMS žinutę** (iki 1 600 simbolių). Kai kortelė patenka į žingsnį, asmuo gauna šią SMS žinutę savo mobiliajame telefone. Norėdami individualizuoti žinutę, spustelėkite žetoną po žinutės lauku -- **Vardas**, **Pavardė**, **Rodomas vardas** arba **Bažnyčios pavadinimas** -- ir žymeklio vietoje bus įterpta `{{firstName}}`, `{{lastName}}`, `{{displayName}}` arba `{{churchName}}`. Kiekvienas jų užpildomas asmens duomenimis, kai SMS išsiunčiama.

- Jei asmens mobilaus telefono numeris nėra įrašytas, SMS neišsiunčiama, o kortelės istorijoje įrašoma **SMS praleista: nėra mobiliojo telefono**.
- Jei asmuo atsisakė žinučių, SMS neišsiunčiama, o kortelės istorijoje įrašoma **SMS praleista: atsisakyta**.
- Kai SMS išsiunčiama, kortelės istorijoje įrašoma **SMS išsiųsta**. Jei siuntimas nepavyksta -- pavyzdžiui, nes nėra prijungto SMS teikėjo arba bažnyčiai baigėsi SMS kreditai -- gedimas užregistruojamas kortelės istorijoje, o likę žingsnio veiksmai vis tiek vykdomi.

:::warning
SMS žinutės siunčiamos per jūsų bažnyčios [SMS teikėją](../settings/church-settings.md#texting). Jei joks teikėjas nėra prijungtas, veiksmų redaktorius įspėja *„Nėra nustatytas SMS teikėjas“*, ir SMS nebus išsiųstos.
:::

### Kelių dienų laukimas (lašelinės sekos)

Veiksmas **Laukti** sulaiko kortelę nustatytą dienų skaičių. Kol ji laukia, kortelė rodoma kaip **Atidėta**. B1 patikrina pasibaigusius laukimus kas 30 minučių, todėl kortelė vėl atsinaujina per maždaug pusvalandį nuo laukimo pabaigos. Pasibaigus laukimui:

1. Vykdomi visi **likę to paties žingsnio veiksmai** -- todėl galite sukurti lašelinę seką, pavyzdžiui, **Siųsti el. laišką → Laukti 3 dienas → Siųsti priminimo el. laišką**.
2. Tada, jei žingsnyje yra automatinis maršrutas, kortelė keliauja toliau; priešingu atveju ji lieka žingsnyje, kad ją perimtų asmuo.

:::tip
**Laukimas** žingsnio pradžioje yra paprastas būdas „sulaikyti“ kortelę, kol ji pasirodys savanoriui -- pavyzdžiui, *Laukti 7 dienas, tada trenerį pasiekia asmuo.*
:::

## Žmonių pridėjimas kaip kortelių

Yra keletas būdų įtraukti žmones į lentą:

- **Iš lentos** -- Spustelėkite **Pridėti kortelę** žingsnio stulpelio apačioje ir pasirinkite asmenį. Taip pat galite pasirinkti grupę, ir kiekvienas tos grupės narys bus pridėtas kaip kortelė.
- **Iš asmens įrašo** -- Naudokite **Pridėti į darbo eigą** asmens puslapyje, kad įtrauktumėte jį į darbo eigą.
- **Iš žmonių paieškos** -- Pažymėkite kelis asmenis ir naudokite masinį veiksmą **Pridėti į darbo eigą**, kad visus pridėtumėte vienu metu.
- **Automatiškai su paleidikliu** -- Pridėkite žmones, kai kas nors įvyksta, pavyzdžiui, pateikiama forma arba įvyksta pirma auka (žr. toliau [Paleidikliai](#triggers)).

Pridėjus asmenį rankiniu būdu arba su žingsnio veiksmu **Pridėti į darbo eigą**, jis niekada negaus antros atviros kortelės toje pačioje darbo eigoje. Jei asmuo jau turi atvirą kortelę, jis praleidžiamas (masinio pridėjimo metu nauja kortelė sukuriama tik tiems, kurie jos neturi). Uždarius kortelę, asmenį galima pridėti iš naujo. Paleidikliai vadovaujasi savo nustatymu **Tik vieną kartą kiekvienam asmeniui**.

## Darbas su lenta

Atidarykite darbo eigą, kad pamatytumėte jos lentą. Kiekviena kortelė rodo asmens vardą, kam ji priskirta, ir termino ar būsenos žymę (**Pradelsta** arba **Atidėta**). Žingsnio stulpelyje taip pat rodomi maži ženkleliai apie automatinius veiksmus, kuriuos jis vykdo, ir jo maršrutavimo pastabos, todėl galite greitai matyti, kaip kortelės juda.

- **Perkelti kortelę** -- Vilkite kortelę iš vieno stulpelio į kitą, kai asmuo juda į priekį.
- **Atidaryti kortelę** -- Dukart spustelėkite kortelę (arba spustelėkite ją), kad atidarytumėte jos detalių skydelį, kuriame galite pakeisti žingsnį, perskirti kortelę, pridėti pastabų ir peržiūrėti, kas jau įvyko.

Kortelės skydelyje galite:

- **Priskirti** kortelę kitam asmeniui ar grupei.
- **Atidėti** kortelę 1 dienai, 3 dienoms arba 1 savaitei, kad laikinai paslėptumėte jos terminą.
- **Grąžinti** į ankstesnį žingsnį arba **Praleisti** į kitą žingsnį.
- **Fiksuoti priskyrimą** -- išlaikyti tą patį savininką kortelėje, net kai ji juda tarp žingsnių. Pagal numatytuosius nustatymus, perkėlus kortelę į naują žingsnį, ji priskiriama tam žingsniui numatytam atsakingajam; fiksavimas išlaiko dabartinį asmenį atsakingą visą laiką.
- **Užbaigti** kortelę, kad ją baigtumėte, arba pasirinkti mygtuką **Rezultatas**, jei žingsniui sukonfigūruoti rezultatai (žr. [Maršrutavimas](#routing-cards-with-outcomes-and-conditions)).
- **Pašalinti kortelę** -- Išimkite kortelę iš lentos, nebaigę jos, pavyzdžiui, kai asmuo buvo pridėtas per klaidą. Patvirtinus, kortelė uždaroma ir pašalinama iš visų sąrašų. Jokie rezultatai, maršrutai ar žingsnio veiksmai nevykdomi, o jos istorija išsaugoma su įrašu **Pašalinta**. [Tarnystės paskyrimo patvirtinimo](#serving-assignment-confirmations) kortelės atveju jos pašalinimas uždaro užklausą tuo pačiu būdu.
- **Pridėti pastabas** ir peržiūrėti kortelės **Veiklą** -- įvykdytų automatinių veiksmų žurnalą (išsiųsti laiškai, laukimai ir pan.), kiekvienas su data ir laiku, kada jis įvyko.

Kortelės, susijusios su asmeniu, skydelyje taip pat rodomas to asmens mobilusis telefonas ir el. pašto adresas kaip nuorodos, kurias galite paliesti, kad paskambintumėte ar parašytumėte, bei nuoroda **Peržiūrėti profilį**, jei turite leidimą peržiūrėti žmones. Asmuo, kuriam priskirta kortelė, mato telefoną ir el. paštą net neturėdamas prieigos prie skilties Žmonės.

Pastabos išsaugomos kartu su kortele. Kiekvienas, kas gali atidaryti kortelę -- įskaitant asmenį ar grupę, kuriai ji priskirta -- gali perskaityti pastabas ir pridėti savo. Asmenys, kurie negali atidaryti kortelės, jos pastabų nemato.

### Masiniai veiksmai

Pažymėkite kelių kortelių žymimuosius langelius, kad veiktumėte su jomis kartu. Norėdami pažymėti visas žingsnio korteles iš karto, pažymėkite langelį **Pažymėti visas** tame žingsnio stulpelio antraštėje; dar kartą pažymėjus, žymėjimas panaikinamas. Pasirodo įrankių juosta, leidžianti visoms pažymėtoms kortelėms iš karto **Užbaigti**, **Atidėti**, **Priskirti** (perskirti) arba **Perkelti į…** kitą žingsnį.

## Maršrutavimas su rezultatais ir sąlygomis

Maršrutavimas nustato, kur kortelė keliauja, kai palieka žingsnį. Atidarykite žingsnio redaktorių, kad sukonfigūruotumėte dviejų tipų maršrutavimą.

### Rezultatų mygtukai

Rezultatai yra mygtukai, rodomi kortelės skydelyje, kai baigiate kortelę tame žingsnyje. Vietoj vieno mygtuko **Užbaigti** galite pasiūlyti tokius pasirinkimus kaip „Prisijungė prie grupės“ ar „Nesidomi“. Kiekvienas rezultatas gali:

- Nusiųsti kortelę į **kitą žingsnį** šioje darbo eigoje,
- **Perduoti kortelę** visiškai kitai darbo eigai, arba
- **Uždaryti** kortelę.

Taip vienas sprendimas gali nukreipti asmenį skirtingais keliais.

### Automatinis maršrutavimas (sąlyginis)

Automatiniai maršrutai perkelia kortelę toliau **tą akimirką, kai ji patenka į žingsnį** (ir baigus jos automatinius veiksmus), be jokio paspaudimo, jei asmuo atitinka nustatytų sąlygų rinkinį. Pridėkite maršrutą, pasirinkite tikslinį žingsnį ir nurodykite vieną ar daugiau **sąlygų** (pavyzdžiui, asmens kampusą, amžių ar narystės statusą). Teksto laukai gali būti atitinkami tiksliai arba pagal **turi**, **prasideda su** ar **baigiasi** su. Maršrutas be sąlygų atitinka visus.

Datos sąlygos (Šiandienos data, Gimimo data arba Metinių data) gali lyginti visą datą arba tik jos dalį -- savaitės dieną, **Mėnesio dieną**, **Mėnesį** arba praėjusių metų skaičių. Asmens Gimimo datai ar Metinėms **Mėnesio diena** siūlo santykinę parinktį **Šiandien**, todėl sąlyga *Gimimo data · Mėnesio diena = Šiandien* atitinka žmones, kurių gimtadienis būna šiandien. **Mėnuo** siūlo **Praeitas mėnuo**, **Einamasis mėnuo** ir **Kitas mėnuo**. Tokios santykinės reikšmės skaičiuojamos pagal jūsų bažnyčios laiko juostą, todėl atitinka bažnyčios kalendoriaus dieną, o ne serverio.

Sąlygų grupė **Aukojimas** turi **Pasibaigusį reguliarų aukotoją**, kuris randa žmones, kurie anksčiau reguliariai aukojo, o paskui nustojo. Nustatykite tris skaičius: *Aukojo bent* **3** *iš paskutinių* **12** *savaičių, tada nė karto per paskutines* **3** *savaites* (tai numatytosios reikšmės). Savaitės skaičiuojamos atgal nuo šiandienos pagal jūsų bažnyčios laiko juostą, o grąžinta auka neskaičiuojama. Ši sąlyga ypač naudinga su [tvarkaraščio paleidikliu](#schedule-triggers) -- pavyzdžiui, savaitine taisykle, kuri pasibaigusius aukotojus pridėtų prie ganytojiškos priežiūros sekimo lentos. Sąlyga žiūri tik į aukojimo datas, niekada į sumas, o kortelės ir pranešimai sumų nerodo. Kadangi ji atskleidžia, kas nustojo aukoti, šią parinktį mato ir gali pridėti, keisti ar pašalinti tik asmenys, galintys peržiūrėti aukas.

Jei maršruto sąlygų dėl kokios nors priežasties negalima patikrinti, tas maršrutas laikomas neatitinkančiu. Kortelė lieka žingsnyje (arba seka kitą atitinkantį maršrutą), o ne įstringa.

:::info
Lentoje kiekvienas žingsnio stulpelis rodo trumpas maršrutavimo pastabas -- pavyzdžiui, rezultato žymą arba „jei atitinka“, po kurios rodoma rodyklė į paskirties žingsnį ar darbo eigą.
:::

## Visiškai automatiniai žingsniai

Galite padaryti, kad žingsnis veiktų visiškai savarankiškai, be nieko, kas jį tvarkytų. Suteikite žingsniui jo **automatinius veiksmus** ir pridėkite **automatinį maršrutą** (be sąlygų), nukreiptą į kitą žingsnį. Kai kortelė patenka į žingsnį, veiksmai įvykdomi, o tada maršrutas ją iš karto perkelia -- kortelė praeina tiesiai pro šalį.

:::tip
Tai derinkite su **Laukti**: *Siųsti sveikinimo laišką → Laukti 3 dienas → automatiškai pereiti į žingsnį „Asmeninis skambutis“.* El. laiškas ir laikas tvarkomi už jus, o savanoris kortelę pamato tik tada, kai atėjo metas asmeniniam kontaktui.
:::

## Paleidikliai

Paleidikliai automatiškai pridedia žmones į darbo eigą, kai įvyksta tam tikras įvykis, todėl niekada nereikia pridėti kortelių rankiniu būdu. Darbo eigos lentoje spustelėkite skirtuką **Paleidikliai**, tada **Pridėti paleidiklį**. Yra du tipai:

### Įvykių paleidikliai

Suveikia tą akimirką, kai B1 pasikeičia įrašas. Pasirinkite įvykį, tada pasirinktinai pridėkite **sąlygas**, kad būtų pridedami tik atitinkantys asmenys:

- **Asmuo · Sukurtas / Atnaujintas** -- pavyzdžiui, pridėti bet ką, kieno statusas tampa *Lankytojas* ar *Svečias* (statusas, suteikiamas žmonėms, kurie registruojasi patys).
- **Auka · Sukurta** -- pavyzdžiui, pridėti pirmą kartą ar didelę auką į padėkos darbo eigą (atitikimas pagal sumą, fondą ar būdą).
- **Grupė · Narys prisijungė** / **Grupė · Sukurta**.
- **Forma · Pateikta** -- pridėti bet ką, kas pateikia pasirinktą formą (puikiai tinka kortelei „Aš naujas“ ar „Prisijungti“).

### Tvarkaraščio paleidikliai

Veikia periodiškai -- kasdien, kas savaitę, kas mėnesį ar kasmet -- pagal nustatytų sąlygų rinkinį. Naudokite juos laiku pagrįstam sekimui, pavyzdžiui, *visiems, kurių gimtadienis šiandien* (Gimimo data · Mėnesio diena = **Šiandien**, o mėnuo atitinka **Einamąjį mėnesį**) arba *mėnesiniam* patikrinimui. Net jei **Tik vieną kartą kiekvienam asmeniui** neįjungta, tvarkaraščio paleidiklis to paties asmens nepridės dar kartą per vieną pakartojimo laikotarpį (dieną, savaitę, mėnesį ar metus, priklausomai nuo to, kaip dažnai jis vykdomas).

Bet kuriam paleidikliui taip pat galite nustatyti:

- **Pradinis žingsnis**, kuriame atsiras nauja kortelė (pagal numatytuosius nustatymus -- pirmasis žingsnis).
- **Tik vieną kartą kiekvienam asmeniui** -- kad to paties asmens paleidiklis nepridėtų dukart į darbo eigą. Įjungus šią parinktį, praleidžiami visi, kurie jau turi kortelę šioje darbo eigoje.
  - **Pridėti iš naujo, uždarius kortelę** -- rodoma, kai įjungta **Tik vieną kartą kiekvienam asmeniui**. Pažymėkite ją, kad paleidiklis galėtų pridėti asmenį iš naujo, kai ankstesnė jo kortelė šioje darbo eigoje bus uždaryta. Asmuo niekada neturi dviejų atvirų kortelių darbo eigoje vienu metu. Naudokite tai reiškiniams, kurie gali pasikartoti, pavyzdžiui, grįžtančiam svečiui ar metiniam procesui.
- **Aktyvus** -- įjungti ar išjungti paleidiklį neištrinant jo.

:::tip
Porą **Forma · Pateikta** paleidiklio su šablonu **Naujo lankytojo sekimas**, kad jūsų forma „Connect Card“ ar „Aš naujas“ taptų automatiniu sekimo procesu.
:::

## Tarnystės paskyrimų patvirtinimai

Ypatinga darbo eigos rūšis gali sekti [tarnystės užklausas](./plans.md#assigning-team-members), kol kiekvienas savanoris priims ar atmes paskyrimą. Vietoj žmonių kiekviena šios lentos kortelė seka **vieną paskyrimą** -- vieną asmenį vienoje pareigoje viename plane. Du vaidmenys ar dvi tarnystės tam pačiam asmeniui turi atskiras korteles. Tai pasirinktinis veiksmas: nieko nekeičiama plane, kol jo nustatymuose nepasirenkama patvirtinimo darbo eiga.

### Kaip tai nustatyti

1. Darbo eigų puslapyje spustelėkite **Pridėti darbo eigą** ir pasirinkite šabloną **Tarnystės paskyrimo patvirtinimas**. (Arba pradėkite **Tuščią darbo eigą** ir nustatykite jos **Darbo eigos paskirtį** kaip **Tarnystės paskyrimo patvirtinimas**.) Kuriant pagal šabloną reikalingas leidimas siųsti SMS, nes jame yra SMS žingsnis.
2. Peržiūrėkite žingsnius. Šablonas prasideda taip:
   - **Prašyti ir laukti atsakymo** -- išsiunčia tarnystės užklausą el. paštu ir SMS, laukia 2 dienas, siunčia priminimo el. laišką, laukia dar 1 dieną, tada automatiškai perkelia kortelę toliau.
   - **Skambinti savanoriui dėl neatsakytos užklausos** -- asmens skambučio savanoriui žingsnis, terminas -- 1 diena. Nustatykite šiame žingsnyje **Numatytąjį atsakingąjį**. Jei jo nėra, kortelė skiriama tarnystės vadovui arba, jei jo nėra, tarnystės komandai.
3. Redaguokite laukimus, žinutes ir žingsnius, kad jie atitiktų jūsų bažnyčią.
4. Atidarykite [plano nustatymus](./plans.md#plan-settings) ir pasirinkite šią darbo eigą skiltyje **Patvirtinimo darbo eiga**.

Šiose darbo eigose vietoj **Siųsti el. laišką** ir **Siųsti SMS** naudojamas veiksmas **Siųsti tarnystės užklausą**. Pasirinkite **El. laiškas** arba **Tekstinė žinutė** ir pasirinktinai parašykite **Užklausos žinutę**. Užklausoje visada nurodomas vaidmuo, planas, tarnystės data ir nuoroda atsakyti; savo žinutėje galite naudoti `{{planName}}`, `{{positionName}}` ir `{{serviceDate}}`. Jei žinutės nepaliksite tuščios, bus naudojama numatytoji užklausa. Savanorių pranešimų nustatymai, sutikimas gauti SMS, jūsų SMS teikėjas ir bažnyčios el. pašto patvirtinimas taikomi visiems, o kiekvienas praleistas ar užblokuotas bandymas įrašomas kortelėje. Veiksmai **Siųsti el. laišką**, **Siųsti SMS** ir **Pridėti į darbo eigą** šiose lentose nepasiekiami.

Skirtuke **Paleidikliai** patvirtinimo darbo eigoje paaiškinama, kaip kortelės pradedamos, o ne siūlomi paleidikliai, ir šios darbo eigos nerodomos žmonių sąrašuose **Pridėti į darbo eigą**.

### Kaip kortelės pradedamos ir uždaromos

- Kortelės pradedamos, kai paskelbtame plane **pranešate** savanoriams (žr. [Savanorių informavimas](./plan-validation.md#notifying-volunteers)). Kiekvienas naujas, neatsakytas paskyrimas gauna vieną kortelę. Plano išsaugojimas, paskelbimas, kopijavimas ar automatinis užpildymas savaime niekam nerašo, o plano juodraštis nieko neišsiunčia.
- Savanoriai vis tiek gauna įprastą pranešimą programėlėje. Tolesnį sekimą el. paštu ir SMS vykdo darbo eiga.
- Kai savanoris **priima ar atmeta**, jo kortelė automatiškai užsidaro kartu su visomis su ja susietomis sekimo užduotimis.
- Kortelės skydelyje rodoma pozicija, tarnystės data ir nuoroda į planą. Vietoj **Užbaigti** mygtukas rodo **Įrašyti atlikus sekimą**. Jį paspaudus įrašoma, kad kažkas atliko sekimą, bet kortelė lieka atvira ir priskirta (rodoma kaip **Laukiama atsakymo**), kol savanoris atsakys arba praeis atsakymo terminas.
- Atsakymo terminas -- tai paskutinio tarnystės laiko, kuriuo pozicijos komanda tarnauja, pabaiga. Jei plane nėra atitinkamų laikų, tai yra tarnystės dienos pabaiga. Jei iki to laiko niekas neatsakė, kortelė užsidaro su **Atsakymo terminas praėjo**, o kortelės dabartiniam savininkui arba tarnystės vadovui siunčiama užduotis **Peržiūrėti neatsakytą tarnystės užklausą**, kad kas nors galėtų nuspręsti, kaip padengti vietą. Paskyrimas lieka **Nepatvirtintas**.
- Pašalinus paskyrimą, pakeitus jo asmenį, pareigas ar plano datą, grąžinus planą į juodraštį arba perjungus planą į kitą patvirtinimo darbo eigą, kortelė užsidaro. Uždarytos kortelės kitas **Pranešti** neatidaro iš naujo; norint išsiųsti naują užklausą, pridėkite naują paskyrimą.

:::info
Užklausoms, siunčiamoms per patvirtinimo darbo eigą, [savanorių priminimai](./plans.md#volunteer-reminders) siunčiami tik savanoriams, kurie **priėmė**, todėl žmonės, laukiantys atsakymo, negauna priminimų be darbo eigos sekimo.
:::

## Mano kortelės

Savanoriams ir darbuotojams nereikia ieškoti savo darbo kiekvienoje lentoje. Sąrašas **Mano kortelės** puslapyje **Mano darbas** rodo visas kortelės, priskirtas dabartiniam naudotojui, visose darbo eigose. Norėdami ten patekti, spustelėkite **Mano kortelės** Darbo eigų puslapio viršuje arba Greito perėjimo meniu atidarykite **Tarnystė > Mano darbas**. Spustelėję kortelę, jos detalių skydelį atversite tiesiai puslapyje Mano darbas, kur galite tvarkyti kortelę ar ją pašalinti nepalikdami puslapio. Jei galite peržiūrėti darbo eigas, skydelyje taip pat yra nuoroda **Atidaryti darbo eigos lentą**, vedanti į lentą, kuriai kortelė priklauso.

## Ataskaitos

Atidarykite darbo eigą ir spustelėkite **Ataskaitos**, kad pamatytumėte tos darbo eigos analitiką:

- **Pradelsta** -- kortelių, kurių terminas praėjo, skaičius.
- **Kortelės pagal žingsnį** -- kiek kortelių šiuo metu yra kiekviename žingsnyje, rodoma stulpelinėje diagramoje.
- **Užbaigta (30 dienų)** -- pralaidumas per paskutines 30 dienų, rodomas linijine diagrama.

Naudokite jas kliūtims aptikti -- pavyzdžiui, žingsniui, kuriame kortelės kaupiasi ir niekada nepereina toliau.

## Susiję straipsniai

- [Užduotys](./tasks.md) -- atskiros veiksmų užduotys, kuriomis remiasi darbo eigų kortelės
- [Formos](../forms/index.md) -- formos, kurios gali paleisti darbo eigas
- [Grupės](../groups/index.md) -- grupės, į kurias gali patekti veiksmas „Pridėti prie grupės“
- [Tarnystės planai](./plans.md) -- pasirinkite plano tarnystės užklausų patvirtinimo darbo eigą
- [Vaidmenys ir leidimai](../settings/roles-permissions.md) -- nustatykite, kas gali peržiūrėti, redaguoti ir valdyti darbo eigas
