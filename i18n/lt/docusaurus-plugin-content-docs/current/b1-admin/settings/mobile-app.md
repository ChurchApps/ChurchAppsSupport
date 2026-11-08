---
title: "Mobiliosios programėlės nustatymai"
description: "Sukonfigūruokite navigacijos skirtukus, pagrindinio ekrano plytteles, prisijungimo raginimą ir narių katalogo privatumo nustatymus B1.church narių programėlei B1 Admin sistemoje."
---

# Mobiliosios programėlės nustatymai

<div class="article-intro">

Puslapis „Mobiliosios programėlės nustatymai“ leidžia sukonfigūruoti navigacijos skirtukus, kurie rodomi jūsų bažnyčios nariams **B1.church mobiliojoje versijoje (PWA)**. Galite nuspręsti, kurie skirtukai matomi, kur jie veda ir kaip rodomi.

</div>

## Mokomasis vaizdo įrašas

<YouTube id="ydY7WGK16fE" title="Bažnyčios narių programėlės pritaikymas B1 sistemoje" />

:::info
Čia sukonfigūruoti skirtukai rodomi B1 programėlėje, kurią nariai gali [įdiegti kaip progresyviąją žiniatinklio programėlę (PWA)](../../b1-church/getting-started/installing-pwa.md). Pasidalinkite su nariais savo bažnyčios diegimo puslapiu — `https://yourchurchname.b1.church/mobile/install`. Jame nurodoma, kaip įdiegti programėlę savo įrenginyje, be atsisiuntimo iš App Store ar Google Play.
:::

<div class="prereqs">
<h4>Prieš pradėdami</h4>

- Jums reikia leidimo „Edit Church Settings“ (redaguoti bažnyčios nustatymus). Jei neturite prieigos, žr. [Vaidmenys ir leidimai](./roles-permissions.md).
- Pirmiausia sukonfigūruokite [Bažnyčios nustatymus](./church-settings.md), įskaitant bažnyčios pavadinimą ir prekinį ženklą.

</div>

## Navigacijos nustatymų atidarymas

1. B1 Admin sistemoje atidarykite [Šuolio meniu](../introduction.md#getting-around-with-the-jump-menu) (paieškos juosta viršuje kairėje) ir išskleiskite **Mobile** (**Mobilioji**).
2. Spustelėkite **Navigation** (**Navigacija**) (`/mobile/navigation`).
3. Navigacijos puslapyje rodomi dabartiniai programėlės skirtukai.

## Naujo skirtuko pridėjimas

1. Spustelėkite mygtuką **Add Tab** (**Pridėti skirtuką**) puslapio viršuje.
2. Užpildykite skirtuko informaciją:
   - **Name** (**Pavadinimas**) -- etiketė, rodoma skirtuke (pavyzdžiui, „Pamokslai“ arba „Aukoti“).
   - **Icon** (**Piktograma**) -- spustelėkite piktogramos pasirinkiklį ir pasirinkite skirtuko piktogramą.
   - **Image** (**Paveikslėlis**) -- spustelėkite **Select Image** (**Pasirinkti paveikslėlį**) arba **Change Image** (**Keisti paveikslėlį**), kad skirtukui priskirtumėte nuotrauką. Skirtukai su nuotrauka programėlės pagrindiniame ekrane rodomi kaip nuotraukų plytelės -- žr. [Pagrindinio ekrano plytelės](#home-screen-tiles).
   - **Tab Type** (**Skirtuko tipas**) -- pasirinkite iš variantų, pavyzdžiui, Biblija, Tiesioginė transliacija, Aukojimas, Svetainė ir kt.
   - **URL** -- įveskite interneto adresą, į kurį turi vesti skirtukas.
   - **Visibility** (**Matomumas**) -- nustatykite, kas gali matyti šį skirtuką (visi, tik nariai ir pan.). Narių katalogo skirtukui šis nustatymas valdo tik tai, kas mato patį skirtuką. Kas gali atidaryti katalogą, nustatoma parinktimi **Show in Directory** (**Rodyti kataloge**) puslapyje Member portal (žr. [Narių katalogo ir žinučių nustatymai](#member-directory--messaging-settings)).
3. Spustelėkite **Save Tab** (**Išsaugoti skirtuką**), kad pridėtumėte jį prie programėlės.

## Esamo skirtuko redagavimas

1. Spustelėkite bet kurį esamą skirtuką sąraše **App Tabs** (**Programėlės skirtukai**).
2. Atnaujinkite skirtuko pavadinimą, piktogramą, URL, tipą ar matomumo nustatymus.
3. Spustelėkite **Save Tab**, kad pritaikytumėte pakeitimus.

## Skirtukų perrikiavimas

Galite keisti skirtukų tvarką mobiliojoje programėlėje. Vilkite ir mesdami perkelkite skirtukus sąraše. Šiame puslapyje rodoma tvarka atitinka tą, kurią nariai matys programėlėje.

:::info
Kai kurie skirtukai gali atsirasti automatiškai, esant tam tikroms sąlygoms -- pavyzdžiui, skirtukas Tiesioginė transliacija gali pasirodyti, kai transliacija vyksta. Rankiniu būdu pridėti skirtukai suteikia visišką kontrolę, ką nariai mato visada.
:::

:::tip
Nepersistenkite su skirtukų skaičiumi. Trys–penki skirtukai tinka daugumai bažnyčių. Per daug skirtukų gali supainioti narius naršant.
:::

## Narių katalogo ir žinučių nustatymai

Elementas **Member portal** (**Narių portalas**) tame pačiame skyriuje **Mobile** talpina nustatymus, kurie valdo narių katalogą ir privačias žinutes B1.church patirtyje:

- **Directory Approval Group** (**Katalogo patvirtinimo grupė**) -- grupė, kuri peržiūri narių katalogo atnaujinimus ir [paskyros ištrynimo prašymus](../profile/account-deletion.md) prieš jiems įsigaliojant.
- **Show in Directory** (**Rodyti kataloge**) -- kas gali atidaryti narių katalogą ir kas jame įtraukiamas: **Admins Only** (**Tik administratoriai**), **Members and Above** (**Nariai ir aukštesni**, numatytasis), **Regular Attendees and Above** (**Reguliarūs lankytojai ir aukštesni**) arba **Visitors and Above** (**Lankytojai ir aukštesni**). Asmenys, kurių narystės statusas žemesnis nei pasirinktas lygis, katalogo nemato ir jame neįtraukiami. **Admins Only** uždaro katalogą visiems, išskyrus darbuotojus, turinčius leidimą People &gt; View (vien darbuotojo narystės statuso neužtenka). Jie visada gali atidaryti katalogą ir matyti visus, nepriklausomai nuo šio nustatymo. Svečiai niekada neįtraukiami, nes kiekvienas, kas prisiregistruoja internetu, pradeda kaip svečias.
- **Visibility Preference** (**Matomumo nuostata**) -- nustato bažnyčios mastu numatytąjį nustatymą nariams, kurie dar nepasirinko savo. **Address** (**Adresas**), **Phone Number** (**Telefono numeris**) ir **Email** (**El. paštas**) turi kiekvienas savo išskleidžiamąjį sąrašą su tais pačiais penkiais lygiais, prieinamais visur, kur konfigūruojamas matomumas:
  - **Everyone** (**Visi**) -- matoma bet kam, įskaitant anoniminius lankytojus
  - **Members** (**Nariams**) -- matoma tik asmenims, turintiems Narys arba Darbuotojas įrašą
  - **Groups Only** (**Tik grupėms**) -- matoma tik asmenims, kurie dalijasi grupe su šiuo asmeniu, bei darbuotojams
  - **My Group Leaders and Staff** (**Mano grupių vadovams ir darbuotojams**) -- matoma tik šio asmens narystės grupių vadovams ir darbuotojams
  - **Staff Only** (**Tik darbuotojams**) -- matoma tik darbuotojams (kiekvienam, kieno narystės statusas yra Darbuotojas, arba kuris turi leidimą People &gt; View) ir pačiam asmeniui

  „Darbuotojas“ šiuose lygiuose reiškia bet ką, kieno narystės statusas yra Darbuotojas, arba ką turintį leidimą People &gt; View. Grupių pakeitimai įsigalioja iš karto: asmuo, prisijungęs prie grupės arba paskirtas grupės vadovu, gali matyti atitinkamus **Groups Only** ar **My Group Leaders and Staff** lygio grupės narių duomenis, neatsijungdamas ir neprisijungdamas iš naujo.

  Nariai gali pakeisti šias numatytąsias nuostatas savo įrašui B1.church PWA profilio skirtuke **Privacy** (**Privatumas**). Žr. [Profilio redagavimas](/docs/b1-church/getting-started/me-page).
- **Minimum Age for Private Messages** (**Minimalus amžius privačioms žinutėms**) -- vaikų saugos valdiklis. B1 neatvers **naujo** privataus pokalbio, jei bet kuris iš asmenų yra jaunesnis už šį amžių pagal gimimo datą (jei gimimo data neįrašyta, naudojamas namų ūkio vaidmuo). Jaunesni asmenys katalogo vis tiek matomi visiškai. Blokuojamos tik tiesioginės žinutės **abiem kryptimis**, visiems, įskaitant darbuotojus. Grupių pokalbiai ir žinutės vaiko tėvams veikia. Pasirinkimai: Off (Išjungta), 13, 16 arba 18. Numatytasis -- **18**. Esami pokalbiai nepaveikiami.

:::tip
Kadangi minimalaus amžiaus patikra remiasi gimimo datomis, įsitikinkite, kad bažnyčios vaikams užpildytos gimimo datos. Šis nustatymas priklauso tai pačiai vaikų saugos šeimai kaip [registracijos saugos valdikliai](../attendance/checkin-safety.md).
:::

### Pagrindinio ekrano prisijungimo raginimas

Lankytojai, atidarę programėlės [Pagrindinį ekraną](/docs/b1-church/getting-started/navigating#home) neprisijungę, mato trumpą raginimą -- pagal numatytuosius nustatymus *„Prisijunkite, kad matytumėte savo grupes, aukas ir kita.“* -- šalia mygtuko **Sign In** (**Prisijungti**). Nustatymai **Home screen sign-in prompt** (**Pagrindinio ekrano prisijungimo raginimas**) tame pačiame Narių portalo puslapyje (`/mobile/b1-mobile`) leidžia jį pakeisti:

- **Show sign-in prompt on the app home screen** (**Rodyti prisijungimo raginimą programėlės pagrindiniame ekrane**) -- išjunkite, kad paslėptumėte ir raginimą, ir mygtuką **Sign In** iš pagrindinio ekrano. Lankytojai vis tiek gali prisijungti per programėlės meniu.
- **Sign-in prompt text** (**Prisijungimo raginimo tekstas**) -- pakeiskite numatytąjį tekstą savo žinute (iki 150 simbolių). Palikite tuščią, kad būtų naudojamas numatytasis tekstas. Šis laukelis išjungtas, kol raginimas išjungtas.

Spustelėkite **Save** (**Išsaugoti**), kad pritaikytumėte. Pranešimas **Saved** (**Išsaugota**) patvirtina pakeitimą. Išsaugojus atnaujinami programėlės talpykloje saugomi nustatymai, todėl pakeitimas matomas kitą kartą įkėlus pagrindinį ekraną.

### Pagrindinio ekrano plytelės

Skirtukai, turintys nuotrauką (žr. **Image** skyriuje [Naujo skirtuko pridėjimas](#adding-a-new-tab)), programėlės [Pagrindiniame ekrane](/docs/b1-church/getting-started/navigating#home) rodomi kaip nuotraukų plytelės skyriuje, pavadintame jūsų bažnyčios vardu. Tai apima ir Dienos eilutės (Verse of the Day) skirtuką, jei jam priskirsite nuotrauką. Nuotraukų skirtukai vis tiek rodomi ir skirtukų juostoje.

Nustatymas **Home screen tiles** (**Pagrindinio ekrano plytelės**) tame pačiame Narių portalo puslapyje (`/mobile/b1-mobile`) valdo, kaip tos plytelės išdėstytos. Pasirinkite **Layout** (**Išdėstymas**):

- **Grid** (**Tinklelis**) -- dvi plytelės eilutėje (numatytasis). Kai plytelių skaičius nelyginis, pirmoji plytelė užima visą plotį.
- **Scrolling row** (**Slenkama eilutė**) -- viena plytelių eilutė, kurią nariai perbraukia į šonus.
- **Scrolling (automatic)** (**Slenkama (automatiškai)**) -- ta pati šoninė eilutė, bet ji juda pati, maždaug kas keturias sekundes pereidama vieną plytelę ir po paskutinės vėl grįždama prie pirmosios. Ji sustoja, kai narys paliečia, užveda pelę ar pereina į eilutę klaviatūra, ir vėl pajuda po kelių sekundžių. Įrenginiuose, nustatytuose sumažinti judesį, eilutė stovi vietoje ir veikia kaip **Scrolling row**.
- **List** (**Sąrašas**) -- sąrašas su maža nuotraukos miniatiūra prie kiekvieno skirtuko pavadinimo.

Abiejuose slenkamuose išdėstymuose, kai plytelių yra daugiau, nei telpa ekrane, po plytelėmis rodoma taškų eilutė -- po vieną tašką kiekvienai plytelei. Dabartinės plytelės taškas užpildytas. Nariai gali bakstelėti tašką, kad pereitų prie tos plytelės.

Spustelėkite **Save**, kad pritaikytumėte.

### Pagrindinio ekrano skyriai

Prisijungę nariai visada mato savo lankomumo istoriją ir pateiktas formas [Me puslapyje](/docs/b1-church/getting-started/me-page). Jungikliai **Home screen sections** (**Pagrindinio ekrano skyriai**) tame pačiame Narių portalo puslapyje (`/mobile/b1-mobile`) leidžia rodyti juos ir pagrindiniame ekrane:

- **Show My Attendance on Home** (**Rodyti mano lankomumą pagrindiniame ekrane**) -- prideda skyrių **My Attendance** (**Mano lankomumas**), kuriame rodoma, kiek kartų narys lankėsi per paskutines 90 dienų, jo du paskutiniai apsilankymai ir nuoroda **History** (**Istorija**) į visą lankomumo sąrašą.
- **Show My Forms on Home** (**Rodyti mano formas pagrindiniame ekrane**) -- prideda skyrių **My Forms** (**Mano formos**), kuriame rodomi du paskutiniai nario formų pateikimai ir nuoroda **All forms** (**Visos formos**).

Abu nustatymai pagal numatytuosius nustatymus išjungti. Skyrius rodomas tik prisijungusiems nariams, turintiems bent vieną įrašą. Spustelėkite **Save**, kad pritaikytumėte.

## Kur rodomi šie skirtukai

Čia sukonfigūruoti skirtukai rodomi **B1.church PWA**, kurią nariai įdiegia iš bet kurio `https://yourchurchname.b1.church` puslapio. Šiame puslapyje atlikti pakeitimai atsispindi kitą kartą, kai narys atidaro programėlę.

Telefone apatinėje skirtukų juostoje rodomi **Home** (**Pagrindinis**), iki trijų jūsų skirtukų ir **More** (**Daugiau**). Kompiuteryje antraštėje rodoma iki penkių skirtukų. Integruoti ekranai (pavyzdžiui, Pamokslai, Aukojimas arba Grupės) pirmiausia gauna vietas, o **Internal Page** (**Vidinis puslapis**) skirtukai užpildo likusias vietas. **External URL** (**Išorinis URL**) ir **Verse of the Day** (**Dienos eilutė**) skirtukams vietos niekada neskiriama. Kiekvienas skirtukas, įskaitant tuos, kurie netelpa, išvardytas programėlės puslapyje **More**.

Skirtukai, įdėti į **Folder** (**Aplankas**) skirtuką, yra išimtis: jie rodomi tik paties aplanko ekrane, kurį nariai atidaro bakstelėję aplanką. Tame ekrane skirtukai rodomi kaip nuotraukų plytelės, jei kiekvienas iš jų turi paveikslėlį, o kitu atveju -- kaip sąrašas. Aplankas, kuriame nėra skirtukų, kuriuos narys gali matyti, tam nariui paslepiamas. Žr. [Aplankų skirtukai](../../b1-church/getting-started/navigating.md#folder-tabs). Apie tai, ką mato nariai, žr. [Navigacija B1App](../../b1-church/getting-started/navigating.md).

## Kiti žingsniai

- [Bažnyčios nustatymai](./church-settings.md) -- sukonfigūruokite bažnyčios informaciją ir prekinį ženklą
- [Vaidmenys ir leidimai](./roles-permissions.md) -- tvarkykite savo komandos prieigą
