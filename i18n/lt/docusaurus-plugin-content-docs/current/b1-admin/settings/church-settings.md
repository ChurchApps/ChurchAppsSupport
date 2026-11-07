---
title: "Bažnyčios nustatymai"
description: "Nustatykite bažnyčios pavadinimą, adresą, subdomeną, laiko juostą, regiono formatą, SMS tiekėją ir failų saugyklą B1 Admin Bažnyčios nustatymų puslapyje."
---

# Bažnyčios nustatymai

<div class="article-intro">

Bažnyčios nustatymų puslapyje konfigūruojama pagrindinė bažnyčios informacija, kontaktiniai duomenys ir prekės ženklas. Šie duomenys naudojami visuose ChurchApps įrankiuose, įskaitant jūsų B1.church svetainę ir B1 Mobile programėlę.

</div>

## Mokomasis vaizdo įrašas

<YouTube id="634zSbzDkYA" title="Bažnyčios informacijos ir prekės ženklo nustatymas B1 sistemoje" next="Vaidmenys, leidimai ir komandos kvietimas B1 sistemoje" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Jums reikia leidimo „Redaguoti bažnyčios nustatymus“. Jei neturite prieigos, žr. [Vaidmenys ir leidimai](./roles-permissions.md).
- Paruoškite bažnyčios adresą, kontaktinę informaciją ir logotipą

</div>

## Bažnyčios informacijos redagavimas

1. B1 Admin sistemoje atidarykite [Greito šuolio meniu](../introduction.md#getting-around-with-the-jump-menu) (paieškos juosta viršutiniame kairiajame kampe), išskleiskite **Nustatymai** ir spustelėkite **Nustatymai**.
2. Skyriuje **Bažnyčios informacija** (puslapio viršuje) spustelėkite **Redaguoti**.
3. Atnaujinkite bet kurį iš šių laukų:
   - **Bažnyčios pavadinimas** -- pavadinimas, rodomas visuose ChurchApps produktuose.
   - **Adresas** -- fizinis bažnyčios adresas.
   - **Kontaktinė informacija** -- telefono numeris, el. paštas ir kiti kontaktiniai duomenys.
   - **Laiko juosta** -- bažnyčios laiko juosta. Žr. toliau [Laiko juosta](#time-zone).
4. Spustelėkite **Išsaugoti**, kad pritaikytumėte pakeitimus.

## Subdomeno nustatymas

Jūsų bažnyčia gauna nemokamą subdomeną **jūsųbažnyčia.1.church**. Tai interneto adresas, kuriuo nariai ir lankytojai gali pasiekti jūsų bažnyčios internetinį puslapį.

1. Nustatymų puslapyje skyriuje **Bažnyčios informacija** spustelėkite **Redaguoti** ir raskite lauką **Subdomenas**.
2. Įveskite norimą subdomeną (pavyzdžiui, „gracechurch“, kad gautumėte gracechurch.1.church).
3. Išsaugokite pakeitimus.

:::info
Jūsų subdomenas turi būti unikalus visose ChurchApps bažnyčiose. Jei norimas pavadinimas jau užimtas, pabandykite pridėti miesto arba valstijos pavadinimą (pavyzdžiui, „gracechurch-dallas“).
:::

Jei norite, kad lankytojai pasiektų jūsų svetainę savo domenu (pavyzdžiui, **`www.gracechurch.org`**), žr. [Pasirinktinis domenas](./custom-domain.md).

## Prekės ženklo nustatymas

Pritaikykite, kaip jūsų bažnyčia atrodo visuose ChurchApps įrankiuose:

1. Įkelkite **bažnyčios logotipą** spustelėdami logotipo sritį ir pasirinkdami paveikslėlio failą.
2. Pridėkite papildomus **bažnyčios paveikslėlius**, naudojamus jūsų svetainėje ir [mobiliojoje programėlėje](./mobile-app.md).

:::tip
Geriausiems rezultatams naudokite PNG formato logotipą su permatomu fonu. Taip jis gerai atrodys tiek šviesiame, tiek tamsiame fone.
:::

## Savaitės pirmoji diena

Pasirinkite, kuria diena prasideda jūsų kalendoriai. Išskleidžiamajame sąraše **Savaitės pirmoji diena** skyriuje Bažnyčios informacija pagal numatytuosius nustatymus pasirinkta **Sekmadienis**, bet galima nustatyti bet kurią kitą dieną. Pakeitus šį nustatymą, jis taikomas kalendorių tinkleliams B1 Admin sistemoje ir B1.church narių portale. Grupių kalendoriai, kuruojami kalendoriai ir renginių redaktorius savaites rodo pradedamas pasirinkta diena.

## Laiko juosta

Išskleidžiamajame sąraše **Laiko juosta** skyriuje **Bažnyčios informacija** nustatoma jūsų bažnyčios laiko juosta (pavyzdžiui, *America/Chicago*). Pasirinkite **Nėra**, jei norite palikti tuščią lauką. Išsaugojus laiko juosta rodoma bažnyčios informacijos santraukoje.

B1 šią laiko juostą naudoja bendriems bažnyčios laikams, pavyzdžiui, renginių priminimams ir tvarkaraščiams jūsų [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md) televizoriuose. [Registracijos tvarkaraščiai](../attendance/setup.md#setting-a-check-in-schedule) pirmiausia matuojami pagal pamaldų [filialo](./campuses.md) laiko juostą, o bažnyčios laiko juosta naudojama tik tada, kai filialas jos neturi. Jei visi jūsų filialai yra vienoje laiko juostoje, nustatykite ją tiek bažnyčiai, tiek kiekvienam filialui.

## Regionas (datos ir telefono formatas)

Nustatymas **Regionas** valdo, kaip B1 sistemoje rašomos datos ir laikas. Pagal numatytuosius nustatymus naudojamas JAV datos formatas (pavyzdžiui, „Sep 28, 2026“ ir „9/28/2026“). Bažnyčios ne JAV šalyse gali pasirinkti savo formatą. Pavyzdžiui, pasirinkus anglų (Jungtinė Karalystė), datos bus rodomos kaip „28 Sept 2026“ ir „28/09/2026“.

1. Nustatymų puslapyje kairiajame sąraše spustelėkite **Regionas**, tada skyriuje **Regionas** spustelėkite **Redaguoti**.
2. Išskleidžiamajame sąraše **Regionas** pasirinkite savo regioną. Kiekviena parinktis rodo pavyzdinę datą, kad matytumėte, kaip datos atrodys.
3. Spustelėkite **Išsaugoti**.

Skyriuje Regionas tuomet rodomas pasirinktas regionas, **Datos formato** pavyzdys ir jūsų **Telefono numerių** formatas.

### Telefono numerių formatas

Tame pačiame skyriuje Regionas yra nustatymas **Telefono numeriai**, kuris valdo, kaip telefono numeriai įvedami asmens įraše:

- **Tarptautinis (su šalies kodu)** -- numatytoji parinktis. Telefono laukuose rodoma šalies vėliavos pasirinkimo juosta, o numeriai išsaugomi su šalies kodu (pavyzdžiui, +1 918 555 1234).
- **Vietinis (kaip įvesta)** -- telefono laukai tampa paprastais tekstiniais laukais, o numeriai išsaugomi tiksliai taip, kaip įvedate, be šalies kodo (pavyzdžiui, 0701 234 5678). Pasirinkite šią parinktį, jei jūsų bažnyčia rašo numerius vietiniu formatu ir nenori, kad B1 pridėtų šalies kodą.

Pasirinkus **Vietinis**, skyriuje Regionas šalia jūsų regiono rodomas užrašas „Vietiniai telefono numeriai“.

:::tip
Tekstinės žinutės geriausiai veikia, kai numeriai turi šalies kodą. Jei siunčiate žinutes iš B1, palikite **Tarptautinis** formatą arba įsitikinkite, kad numeriai, įvesti vietiniu režimu, turi šalies kodą.
:::

Jūsų regionas taikomas datoms ir laikui visoje B1 Admin sistemoje bei jūsų B1.church svetainėje ir narių portale, įskaitant pamokslus, tinklaraščio įrašus, grupių kalendorius ir tarnystės planus. Taip nariai mato datas tuo pačiu formatu, kaip ir jūsų darbuotojai.

## Teksto žinutės {#texting}

Prijunkite teksto žinučių paslaugos teikėją, kad iš B1 Admin sistemos galėtumėte siųsti SMS žinutes vienam asmeniui ar visai grupei. Žinutės siunčiamos per jūsų paties paslaugos teikėjo paskyrą, todėl taikomos jo kainos ir apribojimai.

1. Nustatymų puslapyje kairiajame sąraše spustelėkite **Teksto žinutės**, tada skyriuje **Teksto žinutės** spustelėkite **Redaguoti**.
2. Pasirinkite **Teikėją**:
   - **Clearstream** -- įveskite **API raktą**. Jį sukurkite savo Clearstream paskyros nustatymuose, skiltyje API Keys.
   - **Text In Church** -- įveskite **API raktą**. Pirmiausia kreipkitės į Text In Church palaikymo tarnybą dėl prieigos prie kūrėjų API, tada raktą sukurkite savo paskyros nustatymuose, skiltyje Developer API.
   - **Nalo Solutions** (Gana) -- kaip **API raktą** įveskite autorizacijos raktą iš savo Nalo Solutions paskyros ir **Siuntėjo ID** (iki 11 simbolių), kurį Nalo jums patvirtino.
   - **Twilio** -- naudokite savo bažnyčios Twilio paskyrą; mokestį už paslaugas Twilio skaičiuoja tiesiogiai jums. Nukopijuokite **Account SID** ir **Auth Token** iš [Twilio Console](https://console.twilio.com) ir įveskite **Siuntėjo numerį** -- Twilio telefono numerį, užregistruotą A2P 10DLC, pavyzdžiui, `+15551234567`. Išsaugoję nustatymus, įklijuokite gaunamų žinučių webhook URL (žr. toliau) į numerio lauką **A message comes in** Twilio sistemoje, kad STOP atsakymai būtų įrašomi ir B1 sistemoje.
3. Spustelėkite **Išsaugoti**.

Norėdami sustabdyti teksto žinučių siuntimą, nustatykite **Teikėją** į **Nėra** ir išsaugokite. Tai pašalina išsaugotą teikėją.

### Atsisakymas gauti žinutes asmenims, atsakiusiems STOP

Kai teikėjas išsaugotas, atidarykite Teksto žinučių skyrių dar kartą spustelėdami **Redaguoti**. Po teikėjo nustatymais rodomas tik skaitomas laukas **Gaunamų žinučių (STOP) webhook URL**, kuriame pateikiamas jūsų bažnyčiai būdingas interneto adresas. Spustelėkite lauką, kad pažymėtumėte adresą, nukopijuokite jį ir įklijuokite į savo teikėjo gaunamų žinučių (atsakymų) webhook nustatymą. Tai veikia su visais aukščiau nurodytais teikėjais, kurie gali perduoti gaunamus atsakymus webhook'ui.

Po to, kai kas nors atsako **STOP** (arba STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT ar REVOKE) į jūsų žinutę, B1 suranda visus, kurių mobiliojo telefono numeris sutampa, pažymi juos kaip atsisakiusius žinučių ir išjungia jų teksto priminimus. Tada jie praleidžiami siunčiant grupines žinutes. Kiti atsakymai ignoruojami.

:::info
Tai naudoja tą patį atsisakymo nustatymą kaip ir **Slėpti mane narių kataloge**, todėl asmenys, atsakę STOP, savo profilyje taip pat rodomi kaip **Paslėpti nuo katalogo**. Šis laukas rodomas tik tada, kai pasirinktas išsaugotas teikėjas -- jei išskleidžiamajame sąraše pasirinksite kitą teikėją, prieš tai išsaugokite nustatymus, kad vėl pamatytumėte URL.
:::

Kai teikėjas prijungtas, darbuotojai, turintys teisę siųsti žinutes, grupės puslapyje mato mygtuką **Teksto žinutė** (**Siųsti žinutę grupei**), o asmens puslapyje, jei yra mobilusis telefono numeris, -- mygtuką **Siųsti teksto žinutę**. Įveskite žinutę ir spustelėkite **Siųsti**. Dialogo lange skaičiuojami simboliai ir SMS segmentai. Grupei dialogo lange prieš siunčiant rodoma, kiek narių gaus žinutę:

- Nariai, kurių mobiliojo telefono numeris nėra įrašytas, praleidžiami.
- Nariai, pasirinkę **Slėpti mane narių kataloge**, laikomi atsisakiusiais žinučių ir praleidžiami.
- Šeimos nariai, dalijantys tą patį mobiliojo telefono numerį, žinutę gauna tik vieną kartą.

### Žinučių personalizavimas naudojant sujungimo laukus {#personalizing-texts-with-merge-fields}

Žemiau žinutės lauko teksto dialogo lange rodomi vietos rezervavimo žymekliai: **Vardas**, **Pavardė**, **Rodomas vardas** ir **Bažnyčios pavadinimas**. Spustelėkite žymeklį, kad į vietą, kurioje yra žymeklis, būtų įterptas atitinkamas vietos rezervavimo žymuo (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` arba `{{churchName}}`). Išsiuntus žinutę, kiekvienas vietos rezervavimo žymuo pakeičiamas gavėjo duomenimis, todėl grupinė žinutė, pavyzdžiui, `Hi {{firstName}}, see you Sunday!`, pasiekia kiekvieną narį su jo vardu. Vietos rezervavimo žymenys veikia tiek grupinėms žinutėms, tiek žinutėms vienam asmeniui. Žinutės grupei taip pat siūlomas žymeklis **Grupės pavadinimas** (`{{groupName}}`), kuris pakeičiamas grupės pavadinimu.

Norėdami pakartotinai naudoti žinutę, išsaugokite ją kaip [teksto šabloną](./email-templates.md#text-templates) (el. laiško šablonas su kategorija **Tekstas**) ir pasirinkite jį iš **Įkelti šabloną (neprivaloma)** viršutinėje Teksto lango dalyje.

:::info
Limitas -- 1 600 simbolių -- taikomas žinutei tokiai, kokią ją rašote. Įterpus vietos rezervavimo žymenis, bet koks tekstas, ilgesnis nei 1 600 simbolių, nukerpamas iki šio ilgio.
:::

Žinutės taip pat gali būti siunčiamos automatiškai iš [darbo eigos](../serving/workflows.md#sending-a-text) žingsnio su veiksmu **Siųsti tekstą**. Jis naudoja tą patį teikėją ir vietos rezervavimo žymenis.

## Failų saugykla

Pagal numatytuosius nustatymus failai, kuriuos įkeliate į savo svetainę (per [Failus](../website/files.md)) ir kitas turinio sritis, saugomi B1 nemokamoje talpykloje, iki 100 MB. Jei reikia daugiau vietos, galite prijungti savo debesies saugyklą. Tada nauji įkėlimai tiesiogiai keliauja į jūsų paskyrą, be platformos apribojimų.

1. Nustatymų puslapyje kairiajame sąraše spustelėkite **Failų saugykla**, tada skyriuje **Failų saugykla** spustelėkite **Redaguoti**.
2. Pasirinkite teikėją: **Google Drive**, **Dropbox**, **OneDrive** arba **S3 suderinamą saugyklą** (AWS S3, Cloudflare R2, Backblaze B2 ir kt.).
3. Google Drive, Dropbox ar OneDrive atveju spustelėkite **Prisijungti** ir prisijunkite, kad suteiktumėte prieigą. S3 suderinamos saugyklos atveju įveskite prieigos raktą, slaptąjį raktą, krepšio (bucket) pavadinimą ir viešojo URL pagrindą.
4. Spustelėkite **Išsaugoti**.

:::info
Tai taikoma tik naujiems failams, įkeliamiems į jūsų svetainės failus ir panašias turinio sritis. Galerijos paveikslėliai, miniatiūros, logotipai ir asmenų nuotraukos visada lieka B1 numatytojoje saugykloje.
:::

## Klasių perkėlimas

Jei vaikams ir moksleiviams nurodote **Klasę**, B1 gali automatiškai perkelti visus į aukštesnę klasę pasirinktą dieną (pavyzdžiui, rugpjūčio 1 d.), o ne reikalauti kiekvieną profilį redaguoti rankiniu būdu.

1. Nustatymų puslapyje kairiajame sąraše spustelėkite **Klasių perkėlimas**, tada skyriuje **Klasių perkėlimas** spustelėkite **Redaguoti**.
2. Įjunkite jungiklį (jis rodo **Įjungta**) ir kiekvienais metais pasirinkite **Mėnesį** ir **Dieną**, kada perkelti klases. Tą dieną visi, turintys klasę, perkeliami į vieną klasę aukščiau, o 12 klasės mokiniai tampa **Baigusiais**.
3. Išsaugokite pakeitimus.

Norėdami sustabdyti automatinį perkėlimą, išjunkite jungiklį, kad jis rodytų **Išjungta**, ir išsaugokite. Perkėlimo data pašalinama, o klasės nebesikeis savaime.

## Savanorių registracija {#volunteer-signup}

Pagal numatytuosius nustatymus nariai, naršantys [savanorių registracijas](../../b1-church/serving/volunteer-signup.md), mato visas artimiausias savaites, kuriose yra laisvų pozicijų. Jei sąrašas tampa ilgas, galite rodyti tik kiekvieno plano tipo kitą savaitę.

1. Nustatymų puslapyje kairiajame sąraše spustelėkite **Savanorių registracija**, tada skyriuje **Savanorių registracija** spustelėkite **Redaguoti**.
2. Įjunkite **Rodyti tik kitą kiekvieno plano tipo savaitę**.
3. Išsaugokite pakeitimus.

Įjungus šią parinktį, kiekvienas plano tipas rodo tik artimiausią planą. Kitas planas pasirodys, kai ši data praeis. Skyriaus eilutėje **Rodomos savaitės** rašoma **Tik kitas kiekvieno plano tipo savaitė** arba **Visos artimiausios savaitės**.

## Aukų privatumas {#giving-privacy}

Asmenys, turintys prieigą prie aukų, paprastai mato asmens [asmens įraše](../people/adding-people.md#editing-details) pateiktas aukų sumas. Jei nenorite, kad sumos būtų matomos kiekvieną kartą atidarius įrašą, galite jas paslėpti, kol kas nors nepaprašys jų parodyti.

1. Nustatymų puslapyje kairiajame sąraše spustelėkite **Aukų privatumas**, tada skyriuje **Aukų privatumas** spustelėkite **Redaguoti**.
2. Įjunkite **Slėpti aukas asmens įrašuose, kol nebus paspausta**.
3. Išsaugokite pakeitimus.

Įjungus šią parinktį, aukų kortelėje asmens įraše rodomas tekstas „Aukos asmens įrašuose paslėptos“. Spustelėkite **Rodyti aukas**, kad įkeltumėte ir parodytumėte to asmens aukas. Kai atidarote kito asmens įrašą, aukos vėl paslepiamos. Tai, kas gali matyti aukas, nesikeičia: aukų kortelę mato tik asmenys, turintys prieigą prie aukų.

## Importas ir eksportas

Nustatymų puslapyje, po jūsų bažnyčios pavadinimu, esanti nuoroda **Importas / eksportas** atveria atskirą įrankį naujame naršyklės lange. Juo galite:

- Importuoti narių duomenis iš kitos bažnyčios valdymo sistemos.
- Eksportuoti savo ChurchApps duomenis atsarginei kopijai ar perkėlimui.

Tai ypač naudinga, kai pirmą kartą sąrankose bažnyčią ir reikia perkelti esamus įrašus į ChurchApps.

:::warning
Importuodami duomenis, visada pirmiausia sukurkite esamų įrašų atsarginę kopiją. Importavimo operacijos prideda duomenų prie jūsų sistemos ir, jei jas paleidžiate kelis kartus, gali sukurti dublikatus.
:::
