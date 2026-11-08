---
title: "Bažnyčios nustatymai"
description: "Nustatykite bažnyčios pavadinimą, adresą, subdomeną, laiko juostą, regiono formatą, SMS paslaugos teikėją ir failų saugyklą B1 Admin puslapyje Bažnyčios nustatymai."
---

# Bažnyčios nustatymai

<div class="article-intro">

Puslapyje Bažnyčios nustatymai konfigūruojama pagrindinė jūsų bažnyčios informacija, kontaktiniai duomenys ir prekinis ženklas. Šie duomenys naudojami visuose ChurchApps įrankiuose, įskaitant jūsų B1.church svetainę ir B1 App.

</div>

## Mokomasis vaizdo įrašas

<YouTube id="634zSbzDkYA" title="Bažnyčios informacijos ir prekinio ženklo nustatymas B1 sistemoje" next="Vaidmenys, leidimai ir komandos kvietimas B1 sistemoje" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Jums reikalingas leidimas „Edit Church Settings“ (Redaguoti bažnyčios nustatymus). Jei jo neturite, žr. [Vaidmenys ir leidimai](./roles-permissions.md).
- Pasiruoškite bažnyčios adresą, kontaktinę informaciją ir logotipą.

</div>

## Bažnyčios informacijos redagavimas

1. B1 Admin sistemoje atidarykite [Šuolio meniu](../introduction.md#getting-around-with-the-jump-menu) (paieškos juosta viršuje kairėje), išskleiskite **Settings** (Nustatymai) ir spustelėkite **Settings** (Nustatymai).
2. Skiltyje **Church Information** (Bažnyčios informacija), esančioje puslapio viršuje, spustelėkite **Edit** (Redaguoti).
3. Atnaujinkite bet kurį iš šių laukų:
   - **Church Name** (Bažnyčios pavadinimas) -- pavadinimas, rodomas visuose ChurchApps produktuose.
   - **Address** (Adresas) -- fizinis bažnyčios adresas.
   - **Contact Information** (Kontaktinė informacija) -- telefono numeris, el. paštas ir kiti kontaktiniai duomenys.
   - **Time Zone** (Laiko juosta) -- bažnyčios laiko juosta. Žr. toliau [Laiko juosta](#time-zone).
4. Spustelėkite **Save** (Išsaugoti), kad pakeitimai įsigaliotų.

## Subdomeno nustatymas

Jūsų bažnyčia gauna nemokamą subdomeną **yourchurch.1.church**. Tai interneto adresas, pagal kurį nariai ir lankytojai gali pasiekti jūsų bažnyčios internetinę svetainę.

1. Nustatymų puslapyje skiltyje **Church Information** (Bažnyčios informacija) spustelėkite **Edit** (Redaguoti) ir raskite lauką **Subdomain** (Subdomenas).
2. Įveskite norimą subdomeną (pavyzdžiui, „gracechurch“, kad gautumėte gracechurch.1.church).
3. Išsaugokite pakeitimus.

:::info
Jūsų subdomenas turi būti unikalus visose ChurchApps bažnyčiose. Jei norimas pavadinimas jau užimtas, pabandykite pridėti miesto ar valstijos pavadinimą (pavyzdžiui, „gracechurch-dallas“).
:::

Jei norite, kad lankytojai į jūsų svetainę patektų per jūsų pačių domeną (pavyzdžiui, **`www.gracechurch.org`**), žr. [Pasirinktinis domenas](./custom-domain.md).

## Prekinio ženklo konfigūravimas

Pritaikykite, kaip jūsų bažnyčia atrodo visuose ChurchApps įrankiuose:

1. Įkelkite **bažnyčios logotipą** spustelėdami logotipo sritį ir pasirinkdami paveikslėlio failą.
2. Pridėkite papildomus **bažnyčios paveikslėlius**, naudojamus jūsų svetainėje ir [mobiliojoje programėlėje](./mobile-app.md).

:::tip
Geriausiems rezultatams naudokite PNG formato logotipą su skaidriu fonu. Taip jis gerai atrodys ir ant šviesaus, ir ant tamsaus fono.
:::

## Savaitės pirmoji diena

Pasirinkite, nuo kurios dienos prasideda jūsų kalendoriai. Išskleidžiamasis sąrašas **First Day of Week** (Savaitės pirmoji diena) skiltyje Church Info (Bažnyčios informacija) pagal numatytuosius nustatymus rodo **Sunday** (Sekmadienis), tačiau galima nustatyti bet kurią kitą dieną. Pakeitus šį nustatymą, jis taikomas kalendorių lentelėms B1 Admin sistemoje ir B1.church narių portale -- grupių kalendoriams, kuruojamiems kalendoriams ir renginių redaktoriui savaitės pradedamos pasirinkta diena.

## Laiko juosta

Išskleidžiamasis sąrašas **Time Zone** (Laiko juosta) skiltyje **Church Information** (Bažnyčios informacija) nustato jūsų bažnyčios laiko juostą (pavyzdžiui, *America/Chicago*). Pasirinkite **None** (Nėra), jei norite palikti tuščią. Išsaugojus laiko juosta rodoma bažnyčios informacijos santraukoje.

B1 šią laiko juostą naudoja bendriems bažnyčios laikams, pavyzdžiui, renginių priminimams ir tvarkaraščiams jūsų [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md) televizoriuose. [Registracijos tvarkaraščiai](../attendance/setup.md#setting-a-check-in-schedule) pirmiausia matuojami pagal bamboso, kurioje vyksta pamaldos, [filialo](./campuses.md) laiko juostą, o bažnyčios laiko juosta naudojama tik tuo atveju, jei filialas laiko juostos neturi. Jei visi jūsų filialai yra vienoje laiko juostoje, nustatykite ją ir bažnyčiai, ir kiekvienam filialui.

## Regionas (datos ir telefono numerių formatas)

Nustatymas **Region** (Regionas) valdo, kaip visoje B1 sistemoje rašomos datos ir laikai. Pagal numatytuosius nustatymus datos rašomos JAV formatu (pavyzdžiui, „Sep 28, 2026“ ir „9/28/2026“). Bažnyčios už JAV ribų gali pasirinkti savo formatą -- pavyzdžiui, pasirinkus English (United Kingdom) (Anglų (Jungtinė Karalystė)), rodoma „28 Sept 2026“ ir „28/09/2026“.

1. Nustatymų puslapyje kairiajame sąraše spustelėkite **Region** (Regionas), tada skiltyje **Region** spustelėkite **Edit** (Redaguoti).
2. Išskleidžiamajame sąraše **Region** pasirinkite savo regioną. Kiekviena parinktis rodo datos pavyzdį, kad matytumėte, kaip datos atrodys.
3. Spustelėkite **Save** (Išsaugoti).

Tuomet skiltyje Region rodomas pasirinktas regionas, **Date format** (Datos formato) pavyzdys ir **Phone numbers** (Telefono numerių) formatas.

### Telefono numerių formatas

Ta pati skiltis Region turi nustatymą **Phone numbers** (Telefono numeriai), kuris valdo, kaip telefono numeriai įvedami asmens įraše:

- **International (with country code)** (Tarptautinis (su šalies kodu)) -- numatytoji parinktis. Telefono laukuose rodomas šalies vėliavos pasirinkimas, o numeriai išsaugomi su šalies kodu (pavyzdžiui, +1 918 555 1234).
- **Local (as typed)** (Vietinis (kaip įvesta)) -- telefono laukai tampa paprastais tekstiniais laukais, o numeriai išsaugomi tiksliai taip, kaip įvedate, be pridėto šalies kodo (pavyzdžiui, 0701 234 5678). Pasirinkite šią parinktį, jei jūsų bažnyčia rašo numerius vietiniu formatu ir nenorite, kad B1 pridėtų šalies kodą.

Pasirinkus **Local** (Vietinis), skiltyje Region šalia jūsų regiono rodomas užrašas „Local phone numbers“ (Vietiniai telefono numeriai).

:::tip
Žinutės siuntimas geriausiai veikia, kai numeriuose nurodytas šalies kodas. Jei siunčiate SMS žinutes iš B1, palikite **International** (Tarptautinį) formatą arba įsitikinkite, kad numeriai, įvesti Local režime, turi šalies kodą.
:::

Jūsų regionas taikomas datoms ir laikams visoje B1 Admin sistemoje, B1.church svetainėje ir narių portale, įskaitant pamokslus, tinklaraščio įrašus, grupių kalendorius ir tarnystės planus, todėl nariai mato datas tokiu pačiu formatu, kaip ir jūsų darbuotojai.

## SMS žinutės {#texting}

Prijunkite SMS paslaugos teikėją, kad iš B1 Admin sistemos galėtumėte siųsti SMS žinutes atskiram asmeniui ar visai grupei. Žinutės siunčiamos per jūsų paties paskyrą pas teikėją, todėl taikomos jo kainos ir apribojimai.

1. Nustatymų puslapyje kairiajame sąraše spustelėkite **Texting** (SMS žinutės), tada skiltyje **Texting** spustelėkite **Edit** (Redaguoti).
2. Pasirinkite **Provider** (Teikėją):
   - **Clearstream** -- įveskite **API Key** (API raktą). Jį sukurkite savo Clearstream paskyros nustatymuose skiltyje API Keys (API raktai).
   - **Text In Church** -- įveskite **API Key** (API raktą). Pirmiausia kreipkitės į Text In Church palaikymo tarnybą dėl prieigos prie kūrėjų API, tada sukurkite raktą skiltyje Account Settings > Developer API (Paskyros nustatymai > Kūrėjo API).
   - **Nalo Solutions** (Gana) -- kaip **API Key** (API raktą) įveskite autentifikavimo raktą iš savo Nalo Solutions paskyros, o kaip **Sender ID** (Siuntėjo ID) -- iki 11 simbolių, kuriuos Nalo jums patvirtino.
   - **Twilio** -- naudokite savo bažnyčios Twilio paskyrą; mokestį už paslaugas Twilio skaičiuoja jums tiesiogiai. Nukopijuokite **Account SID** ir **Auth Token** iš [Twilio konsolės](https://console.twilio.com) ir įveskite **From Number** (Siuntimo numerį) -- Twilio telefono numerį, užregistruotą A2P 10DLC, pavyzdžiui, `+15551234567`. Išsaugoję įklijuokite gaunamųjų žinučių webhook URL (žr. toliau) į numerio **A message comes in** (Gaunama žinutė) webhook nustatymą Twilio, kad atsakymai STOP būtų įrašomi ir B1 sistemoje.
3. Spustelėkite **Save** (Išsaugoti).

Norėdami nutraukti SMS žinučių siuntimą, nustatykite **Provider** (Teikėją) į **None** (Nėra) ir išsaugokite. Tai pašalina išsaugotą teikėją.

### Asmenų, atsakančių STOP, atsisakymas

Kai teikėjas išsaugotas, iš naujo atidarykite SMS žinučių skiltį spustelėdami **Edit** (Redaguoti). Po teikėjo nustatymais rodomas tik skaitomas laukas **Inbound (STOP) webhook URL** (Gaunamųjų (STOP) webhook URL), kuriame nurodytas jūsų bažnyčiai būdingas interneto adresas. Spustelėkite lauką, kad pažymėtumėte adresą, nukopijuokite jį ir įklijuokite į savo SMS teikėjo gaunamųjų žinučių (atsakymų) webhook nustatymą. Tai veikia su visais aukščiau nurodytais teikėjais, kurie gali perduoti gaunamus atsakymus į webhook.

Po to, kai kas nors atsako **STOP** (arba STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT ar REVOKE) į jūsų žinutę, B1 suranda visus, kurių mobiliojo telefono numeris sutampa, pažymi juos kaip atsisakiusius ir išjungia jų teksto priminimus. Tada jie praleidžiami grupinėse SMS žinutėse. Kiti atsakymai ignoruojami.

:::info
Tai naudoja tą patį atsisakymo nustatymą kaip **Hide me from the member directory** (Paslėpti mane narių kataloge), todėl asmenys, atsakę STOP, savo profilyje taip pat rodomi kaip **Hidden from directory** (Paslėpta iš katalogo). Šis laukas rodomas tik tada, kai pasirinktas išsaugotas teikėjas -- jei išskleidžiamajame sąraše pasirinksite kitą teikėją, pirmiausia išsaugokite, kad vėl pamatytumėte URL.
:::

Kai teikėjas prijungtas, darbuotojai, turintys leidimą siųsti žinutes, grupės puslapyje (**Text this group** (Rašyti šiai grupei)) ir asmens, turinčio mobiliojo telefono numerį, puslapyje (**Send text message** (Siųsti žinutę)) mato mygtuką **Text** (Rašyti). Įveskite žinutę ir spustelėkite **Send** (Siųsti). Dialogo lange skaičiuojami simboliai ir SMS segmentai. Grupei jis prieš siunčiant parodo, kiek narių gaus žinutę:

- Nariai, kurių įraše nėra mobiliojo telefono numerio, praleidžiami.
- Nariai, pasirinkę **Hide me from the member directory** (Paslėpti mane narių kataloge), laikomi atsisakiusiais ir praleidžiami.
- Šeimos nariai, dalijantys tą patį mobiliojo telefono numerį, žinutę gauna tik vieną kartą.

### Žinučių personalizavimas naudojant sujungimo laukus {#personalizing-texts-with-merge-fields}

Po žinutės lauku rašymo dialogo lange Text rodomi vietos rezervavimo žymekliai: **First Name** (Vardas), **Last Name** (Pavardė), **Display Name** (Rodomas vardas) ir **Church Name** (Bažnyčios pavadinimas). Spustelėkite žymeklį, kad į žymeklio vietą įterptumėte jo vietos rezervavimo tekstą (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` arba `{{churchName}}`). Kai žinutė išsiunčiama, kiekvienas vietos rezervavimo tekstas pakeičiamas gavėjo duomenimis, todėl grupinė žinutė, pavyzdžiui, `Hi {{firstName}}, see you Sunday!`, pasiekia kiekvieną narį su jo vardu. Vietos rezervavimo tekstai veikia ir grupinėms žinutėms, ir žinutėms vienam asmeniui. Žinutėms grupei taip pat rodomas žymeklis **Group Name** (Grupės pavadinimas) (`{{groupName}}`), kuris pakeičiamas grupės pavadinimu.

Norėdami pakartotinai naudoti žinutę, išsaugokite ją kaip [žinutės šabloną](./email-templates.md#text-templates) (el. laiško šabloną su kategorija **Text**) ir pasirinkite ją iš **Load Template (optional)** (Įkelti šabloną (neprivaloma)) viršuje esančiame Text lange.

:::info
Simbolių riba 1 600 taikoma žinutei, kaip ją rašote. Po to, kai užpildomi vietos rezervavimo tekstai, bet koks tekstas, ilgesnis nei 1 600 simbolių, nukerpamas iki šio ilgio.
:::

Žinutės taip pat gali būti siunčiamos automatiškai iš [darbo eigos](../serving/workflows.md#sending-a-text) žingsnio su veiksmu **Send Text** (Siųsti žinutę), kuris naudoja tą patį teikėją ir vietos rezervavimo tekstus.

## Failų saugykla

Pagal numatytuosius nustatymus failai, kuriuos įkeliate į svetainę (per [Failus](../website/files.md)) ir kitas turinio sritis, naudoja nemokamą B1 talpinimo saugyklą, iki 100 MB. Jei reikia daugiau vietos, galite prijungti savo debesies saugyklą -- tada nauji įkėlimai eina tiesiai į jūsų paskyrą be platformos apribojimo.

1. Nustatymų puslapyje kairiajame sąraše spustelėkite **File Storage** (Failų saugykla), tada skiltyje **File Storage** spustelėkite **Edit** (Redaguoti).
2. Pasirinkite teikėją: **Google Drive**, **Dropbox**, **OneDrive** arba **S3-compatible bucket** (S3 suderinamą saugyklos krepšį) (AWS S3, Cloudflare R2, Backblaze B2 ir kt.).
3. Google Drive, Dropbox ar OneDrive atveju spustelėkite **Connect** (Prisijungti) ir prisijunkite, kad suteiktumėte prieigą. S3 suderinamo krepšio atveju įveskite prieigos raktą, slaptąjį raktą, krepšio pavadinimą ir viešojo URL pagrindą.
4. Spustelėkite **Save** (Išsaugoti).

:::info
Tai veikia tik naujus įkėlimus į jūsų svetainės Failus ir panašias turinio sritis. Galerijos nuotraukos, miniatiūros, logotipai ir asmenų nuotraukos visada lieka B1 numatytojoje saugykloje.
:::

## Klasės perkėlimas

Jei vaikams ir moksleiviams fiksuojate **Grade** (Klasę), B1 gali automatiškai perkelti visus į aukštesnę klasę pasirinktą dieną (pavyzdžiui, rugpjūčio 1-ąją), o ne reikalauti redaguoti kiekvieną profilį rankiniu būdu.

1. Nustatymų puslapyje kairiajame sąraše spustelėkite **Grade Promotion** (Klasės perkėlimas), tada skiltyje **Grade Promotion** spustelėkite **Edit** (Redaguoti).
2. Įjunkite jungiklį (jis rodo **Enabled** (Įjungta)) ir pasirinkite **Month** (Mėnesį) bei **Day** (Dieną), kada kasmet perkelti klases. Tą dieną visi, turintys klasę, pakeliami viena klase aukštyn, o 12-okai tampa **Graduated** (Baigę).
3. Išsaugokite pakeitimus.

Norėdami sustabdyti automatinį perkėlimą, išjunkite jungiklį, kad jis rodytų **Disabled** (Išjungta), ir išsaugokite. Perkėlimo data pašalinama, o klasės nebesikeis savaime.

## Savanorių registracija {#volunteer-signup}

Pagal numatytuosius nustatymus nariai, naršantys [savanorių registracijas](../../b1-church/serving/volunteer-signup.md), mato kiekvieną artėjančią savaitę, kurioje yra laisvų pozicijų. Jei sąrašas tampa ilgas, galite rodyti tik kitą savaitę kiekvienam plano tipui.

1. Nustatymų puslapyje kairiajame sąraše spustelėkite **Volunteer Signup** (Savanorių registracija), tada skiltyje **Volunteer Signup** spustelėkite **Edit** (Redaguoti).
2. Įjunkite **Show only the next week of each plan type** (Rodyti tik kitą savaitę kiekvienam plano tipui).
3. Išsaugokite pakeitimus.

Įjungus šią parinktį, kiekvienam plano tipui rodomas tik artimiausias planas. Kitas planas atsiranda tada, kai praeina ankstesnė data. Skilties eilutėje **Weeks shown** (Rodomos savaitės) rašoma **Only the next week of each plan type** (Tik kitą savaitę kiekvienam plano tipui) arba **All upcoming weeks** (Visos artėjančios savaitės).

## Aukų privatumas {#giving-privacy}

Asmenys, turintys prieigą prie aukų, paprastai mato asmens aukų sumas savo [asmens įraše](../people/adding-people.md#editing-details). Jei nenorite, kad sumos būtų matomos kiekvieną kartą atidarant įrašą, galite jas paslėpti, kol kas nors nepaprašys.

1. Nustatymų puslapyje kairiajame sąraše spustelėkite **Giving privacy** (Aukų privatumas), tada skiltyje **Giving privacy** spustelėkite **Edit** (Redaguoti).
2. Įjunkite **Hide giving on person records until clicked** (Slėpti aukas asmens įrašuose, kol nepaspausta).
3. Išsaugokite pakeitimus.

Įjungus šią parinktį, aukų kortelėje asmens įraše rodomas tekstas „Giving is hidden on person records.“ (Asmens įrašuose aukos paslėptos.). Spustelėkite **Show giving** (Rodyti aukas), kad įkeltumėte ir parodytumėte to asmens aukas. Jos vėl paslepiamos, kai atidarote kitą asmenį. Tai, kas gali matyti aukas, nepasikeičia: kortelę mato tik asmenys, turintys prieigą prie aukų.

## Importas ir eksportas

Nuoroda **Import/Export** (Importas / eksportas), esanti po jūsų bažnyčios pavadinimu Nustatymų puslapyje, atidaro specialų įrankį naujame naršyklės lange. Juo galite:

- Importuoti narių duomenis iš kitos bažnyčios valdymo sistemos.
- Eksportuoti savo ChurchApps duomenis atsarginei kopijai ar perkėlimui.

Tai ypač naudinga, kai pirmą kartą nustatote savo bažnyčią ir reikia perkelti esamus įrašus į ChurchApps.

:::warning
Importuodami duomenis, visada pirmiausia sukurkite atsargines esamų įrašų kopijas. Importavimo operacijos prideda duomenų prie jūsų sistemos ir gali sukurti dublikatus, jei jas paleisite kelis kartus.
:::
