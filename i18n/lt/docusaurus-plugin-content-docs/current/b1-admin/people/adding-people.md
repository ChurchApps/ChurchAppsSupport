---
title: "Asmenų pridėjimas"
---

# Asmenų pridėjimas

<div class="article-intro">

Skyrius „Asmenys“ yra B1 Admin pagrindas – tai jūsų bažnyčios narių duomenų bazė. Visos kitos funkcijos (grupės, lankomumas, aukos, formos) yra susijusios su asmenų įrašais. Šiame vadove paaiškinama, kaip pridėti asmenį į duomenų bazę, redaguoti jo duomenis ir susieti šeimos narius į namų ūkius.

</div>

## Mokomasis vaizdo įrašas

<YouTube id="NTL1UDQpx8s" title="Asmenų ir namų ūkių pridėjimas B1 sistemoje" next="Asmenų duomenų bazės importavimas B1 sistemoje" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Jums reikia aktyvios B1 Admin paskyros su teise tvarkyti asmenis. Jei nesate tikri dėl savo prieigos lygio, žr. [Vaidmenys ir leidimai](roles-permissions.md).
- Jei norite pridėti daugiau nei kelis asmenis, verta naudoti [CSV importo](importing-data.md) įrankį.

</div>

## Asmens pridėjimas

1. Atidarykite B1.church Admin valdymo skydelį.
2. Atidarykite [Greitojo meniu](../introduction.md#getting-around-with-the-jump-menu) (paieškos juostą viršutiniame kairiajame kampe), išskleiskite **People** ir spustelėkite **People**.
3. Puslapio antraštėje spustelėkite mygtuką **Add Person**. Puslapis nuslinks žemyn iki formos **Add New Person**, esančios po katalogu.
4. Įveskite asmens **First Name** (vardą), **Last Name** (pavardę) ir **Email** (el. pašto adresą), tada spustelėkite **Add**.

Atsidarys asmens profilio puslapis, kuriame galėsite pridėti daugiau informacijos.

:::tip
Jei perkeliate duomenis iš kitos bažnyčios valdymo sistemos, funkcija [Import Data](importing-data.md) leidžia įkelti visą katalogą iš CSV failo – tai gerokai greičiau nei pridėti asmenis vieną po kito.
:::

### Dublikatų perspėjimai

Jei el. pašto adresas (arba, kai asmuo kuriamas iš pilnos formos **Edit**, telefono numeris ar sutampantis vardas, pavardė ir gimimo data) sutampa su jau jūsų duomenų bazėje esančiu asmeniu, prieš išsaugant naują įrašą pasirodo dialogo langas **Possible Duplicate**. Jame pateikiamas kiekvienas sutampantis asmuo kartu su el. paštu, telefonu ir gimimo data, kad galėtumėte palyginti duomenis.

- Spustelėkite **Use Existing** šalia atitikmens, kad vietoj naujo įrašo būtų naudojamas to asmens įrašas.
- Spustelėkite **Create Anyway**, kad pridėtumėte naują asmenį, nepaisydami rasto galimo sutapimo.

Dublikatai tikrinami tik kuriant visiškai naują asmenį – redaguojant esamą įrašą šis langas niekada nepasirodo. Ši funkcija tik užkerta kelią naujiems dublikatams; ji nesujungia jau egzistuojančių dviejų įrašų.

## Duomenų redagavimas

1. Asmens profilio puslapyje kairėje spustelėkite mygtuką **Edit**, esantį po kontaktiniais duomenimis.
2. Formoje **Personal Details** įveskite papildomą informaciją, pavyzdžiui, **Title** (pasirinkite iš sąrašo: Pon., Pn., Panelė, Ms, Dr., Prof., Kun. arba Pastorius, arba įveskite savo – iki 10 simbolių), antrąjį vardą, narystės statusą (**Visitor**, **Guest**, **Regular Attendee**, **Member**, **Staff**, **Inactive** arba **Deceased**), datas, adresą, telefono numerius ir (vaikams bei moksleiviams) klasę ir mokyklą.
3. Spustelėkite **Save**, kad išsaugotumėte asmens duomenis.

Profilio kairėje pusėje rodoma asmens nuotrauka, vardas, narystės statusas, kontaktiniai duomenys, bet kokios [papildomo lauko](../settings/custom-fields.md) reikšmės ir namų ūkis. Po namų ūkiu **Added** nurodoma įrašo sukūrimo data (tik asmenims, pridėtiems nuo 2026 m. spalio pabaigos). Norėdami pakeisti nuotrauką, spustelėkite ją. Po mygtuku **Edit** yra dar keli veiksmai: **Workflow** (pridėti asmenį į [darbo eigą](../serving/workflows.md)), **Merge**, **Export** ir **Export Data**.

Likusioje profilio dalyje pateikiama santrauka kiekvienai su asmeniu susijusios informacijos rūšiai:

- **Attendance** – rodo, kuriose iš paskutinių kelių savaičių asmuo dalyvavo, ir jo artimiausius apsilankymus. Spustelėkite **All years**, kad pamatytumėte visą apsilankymų istoriją, įskaitant filialą, pamaldas, pamaldų laiką, grupę ir stulpelį **Checked In** su registravimo terminalo registracijos laiku (apsilankymams be registracijos terminale rodomas brūkšnys), arba **Print**, kad atspausdintumėte (spausdininyje viršuje, virš asmens vardo, centre rodomas jūsų bažnyčios logotipas ir pavadinimas). Bažnyčios bendrų tendencijų, o ne vieno asmens istorijos, ieškokite skyriuje [Lankomumo stebėjimas](../attendance/tracking-attendance.md).
- **Donations** – rodo šių metų aukas, įskaitant aukas į neatskaitomus fondus. Spustelėkite **All years**, kad pamatytumėte visą [aukų istoriją](../donations/recording-donations.md), arba **Log a gift**, kad įrašytumėte naują auką. Jei jūsų bažnyčia įjungė [aukų privatumą](../settings/church-settings.md#giving-privacy), sumos lieka paslėptos, kol nespustelėsite **Show giving**.
- **Groups** – išvardija asmens [grupių narystes](../groups/group-members.md), o jei įrašyta, nurodo **Joined** ir prisijungimo prie kiekvienos grupės datą.
- **Notes** – rodo naujausias su asmeniu susijusias pastabas (dvasinė priežiūra, tolesni veiksmai ir pan.). Spustelėkite **All notes**, kad skaitytumėte ir pridėtumėte pastabas. Kiekvienoje pastaboje nurodoma, kas ją parašė, bei įrašymo data ir laikas. Norėdami iš karto pamatyti naujausias pastabas visiems asmenims, naudokite puslapį [Notes](./notes.md).
- **Forms** – išvardija asmens formas ir nurodo, ar kiekviena jau yra pateikta (žr. toliau skyrių [Darbas su formomis](#working-with-forms)).

Atidarę bet kurį iš šių išsamių rodinių, spustelėkite nuorodą **Back to** su asmens vardu viršuje, kad grįžtumėte į profilį.

## Asmens el. laiškas

Jei asmuo turi įrašytą el. pašto adresą, profilio kairėje, po kontaktiniais duomenimis, pasirodo mygtukas **Email**.

1. Asmens profilyje spustelėkite **Email**.
2. Atsidarys dialogo langas **Email** su asmens vardu antraštėje, kuriame rodoma eilutė **Sending to** su asmens adresu.
3. Pasirinktinai iš **Load Template (optional)** pasirinkite išsaugotą šabloną.
4. Įveskite **Subject** (temą) ir parašykite pranešimą.
5. Spustelėkite **Send Email**.

Jei norite parašyti laišką savo pašto programoje, spustelėkite **Open in my email app**.

:::info
Siunčiant laiškus iš B1, taikomi tie patys patvirtinimo ir dienos limitai kaip ir grupių laiškams. Jei jūsų bažnyčia dar nepatvirtinta, dialogo lange bus prašoma kreiptis dėl peržiūros – tuo tarpu galite spustelėti **Open in my email app**. Žr. [Grupių el. pašto įjungimas jūsų bažnyčiai](../groups/group-members.md#turning-on-group-email-for-your-church). Vartotojai, neturintys teisės redaguoti grupių narių, spustelėję **Email**, iš karto pereina į savo el. pašto programą.
:::

## Darbas su formomis

Pildyti pasirinktines formas galite tiesiogiai iš asmens profilio. Tai vartotojo sukurtos formos, kurias galite kurti vadovaudamiesi [Formų kūrimo](../forms/creating-forms.md) vadovu.

1. Asmens profilyje raskite skyrių **Forms**. Jame išvardijama kiekviena forma ir nurodoma, ar ji **Submitted** (pateikta), ar **Not submitted** (nepateikta).
2. Spustelėkite formos pavadinimą, kad ją atidarytumėte (arba spustelėkite **All forms**, kad pamatytumėte visą sąrašą).
3. Spustelėkite formos **edit icon** (pieštuko piktogramą), užpildykite duomenis ir spustelėkite **Save**.

Kai forma pateikta, spustelėkite šalia jos esančią **print icon** (spausdinimo piktogramą), kad atspausdintumėte to asmens užpildytus atsakymus. Jei asmuo yra pateikęs vieną formos pateikimą, forma virš atsakymų rodo **Submitted** ir pateikimo datą.

Jei pateikimas buvo priskirtas ne tam asmeniui, spustelėkite šalia jo esančią **Change person** piktogramą (dvi rodyklės), kad perkeltumėte jį kitam asmeniui arba atsietumėte. Žr. [Pateikimo asmens keitimas](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Formos, susietos su asmens profiliu, naudoja **People** formos tipą. Jei jums reikia atskiros formos (pavyzdžiui, renginio registracijos), žr. [Atskiros formos parinktį](../forms/creating-forms.md) formų vadove.
:::

:::tip
Jei jums reikia tik vienos ar dviejų papildomų žinomų apie asmenis – datos, skaičiaus ar taip / ne atsakymo, – vietoj formos naudokite [Papildomus laukus](../settings/custom-fields.md). Jie greičiau užpildomi ir juos galima tiesiogiai ieškoti išplėstinėje paieškoje.
:::

## Namų ūkių tvarkymas {#managing-households}

Namų ūkiai leidžia susieti šeimos narius. Tai ypač naudinga [registracijos terminale](../attendance/check-in.md), kur tėvai gali iš karto užregistruoti visus savo vaikus.

1. Asmens profilyje, kairėje, spustelėkite **Edit** šalia antraštės **Household**.
2. Atsidarys namų ūkio redaktorius. Pasirinkite dabartinio asmens **household role** (namų ūkio vaidmenį), pavyzdžiui, Head (vadovas), Spouse (sutuoktinis), Child (vaikas) arba Other (kita).
3. Spustelėkite **Add** piktogramą, kad pridėtumėte kitą namų ūkio narį.
4. Skiltyje **Add Household Member** paieškos laukelyje įveskite asmens vardą ir paspauskite **Enter** arba spustelėkite paieškos piktogramą. (Prieš įvesdami tekstą, matysite trumpą **Recent people** (neseniai peržiūrėtų asmenų) sąrašą.)
5. Kai asmuo pasirodys rezultatuose, spustelėkite jo vardą arba šalia jo esančią pridėjimo piktogramą.
6. Pasirinkite jo namų ūkio vaidmenį ir spustelėkite **Save**, kad užbaigtumėte namų ūkio sudarymą.
