---
title: "Serverio administravimas"
description: "Tik Server.Admin naudotojams: iš naujo nustatyti dviejų veiksnių prisijungimą, veikti kaip kitas naudotojas, moderuoti Commons, patvirtinti bažnyčios el. paštą."
---

# Serverio administravimas

<div class="article-intro">

Serverio administravimo funkcijos ChurchApps platformoje pasiekiamos tik naudotojams, turintiems leidimą **Server.Admin**. Šiais įrankiais naudojamasi platformos veikimui, palaikymui ir gedimų šalinimui visose sistemos bažnyčiose.

</div>

:::warning Prieiga apribota
Šiame puslapyje aprašytoms funkcijoms reikalingas leidimas **Server.Admin**, todėl jos nepasiekiamos įprastiems bažnyčių administratoriams. Jos skirtos tik platformos operatoriams ir palaikymo darbuotojams.
:::

## Prieiga prie serverio administravimo

Naudotojai, turintys leidimą Server.Admin, gali atidaryti serverio administravimo skydelį iš B1 Admin:

1. Prisijunkite prie [admin.b1.church](https://admin.b1.church)
2. Atidarykite [Greitojo perėjimo meniu](../b1-admin/introduction.md#getting-around-with-the-jump-menu), išskleiskite **Nustatymai** ir spustelėkite **Serverio administravimas**. (Taip pat galite tiesiogiai atidaryti `admin.b1.church/admin`.)
3. Serverio administravimo skydelio kairėje pusėje skyriai suskirstyti į tris grupes: **Katalogas** (Bažnyčios, Naudotojai, Prisijungti kaip vartotojas), **Operacijos** (Fono darbai, Commons, Naudojimo tendencijos) ir **Sistema** (Vertimų paieška, Serverio būklė, Duomenų bazės migracijos)

## Dviejų veiksnių prisijungimo atstatymas

Jei naudotojas yra įjungęs [dviejų veiksnių prisijungimą](../b1-admin/profile/managing-profile.md#two-factor-sign-in) ir yra praradęs tiek telefoną, tiek atsarginius kodus, serverio administratorius gali jį išjungti:

1. Serverio administravimo skydelyje atidarykite skyrių **Naudotojai** ir raskite naudotoją.
2. Naudotojams, turintiems dviejų veiksnių prisijungimą, rodomas ženklelis **Dviejų veiksnių įjungta**. Spustelėkite šalia jo esantį mygtuką **Atstatyti 2FA**.
3. Patvirtinkite užklausą. Tai darykite tik įsitikinę, su kuo bendraujate.

Tada naudotojas gali prisijungti tik su slaptažodžiu ir iš naujo nustatyti dviejų veiksnių prisijungimą savo profilyje. Atstatymai įrašomi į auditų žurnalą kaip `mfa_reset`. Galinis taškas (endpoint) yra `POST /membership/users/mfa/reset/:userId`, jam reikalingas leidimas Server.Admin.

## Prisijungimas kaip vartotojas

Ši funkcija leidžia serverio administratoriams prisijungti kaip kitam naudotojui palaikymo ir gedimų šalinimo tikslais. Tai naudinga tiriant naudotojų pranešimus apie problemas arba padedant bažnyčioms sukonfigūruoti savo sistemas.

### Kaip prisijungti kaip vartotojas

1. Serverio administravimo skydelyje atidarykite skyrių **Prisijungti kaip vartotojas**.
2. Paieškos lauke įveskite naudotojo vardą arba el. pašto adresą.
3. Spustelėkite **Ieškoti** arba paspauskite Enter.
4. Paieškos rezultatuose spustelėkite naudotoją, kuriuo norite prisijungti.
5. Patvirtinkite prisijungimą dialogo lange.
6. Būsite prisijungę kaip tas naudotojas ir nukreipti į jo paskyrą.

### Svarbios pastabos

- Prisijungimas kaip vartotojas sukuria naują sesiją su tikslinio naudotojo leidimais ir prieiga prie bažnyčių.
- Jūsų pradinė administratoriaus sesija baigiasi, kai prisijungiate kaip kitas naudotojas.
- Visi veiksmai, atlikti prisijungus kaip vartotojas, įrašomi į auditų žurnalą.
- Norėdami grįžti prie savo administratoriaus paskyros, atsijunkite ir vėl prisijunkite su savo prisijungimo duomenimis.
- Prisijungimą kaip vartotoją naudokite tik tada, kai tai būtina palaikymo tikslais, ir visada informuokite naudotojus, kai pasiekiate jų paskyras palaikymo tikslais.

### API galinis taškas

Prisijungimo kaip vartotojas funkciją palaiko `/users/:userId/impersonate` galinis taškas Membership API. Techninės informacijos ieškokite [Membership galinių taškų](/docs/developer/api/endpoints/membership#users) puslapyje.

### Saugumo aspektai

- Prisijungimui kaip vartotojas reikalingas leidimas Server.Admin. Šis leidimas turėtų būti suteikiamas saikingai ir tik patikimiems platformos operatoriams.
- Visi prisijungimo kaip vartotojas įvykiai įrašomi su administratoriaus naudotojo ID ir tikslinio naudotojo ID.
- Bažnyčios apie prisijungimą kaip vartotojas nėra informuojamos, todėl nustatykite aiškias taisykles, kada ir kaip šia funkcija turi būti naudojamasi.
- Apsvarstykite galimybę užfiksuoti prisijungimo kaip vartotojas įvykius savo palaikymo bilietų sistemoje, kad būtų užtikrinama atskaitomybė.

## Commons moderavimas

Commons yra bendra moderavimo eilė naudotojų pateiktam turiniui visuose produktuose – WorshipCommons dainos, Lessons.church pamokos, FreeShow šablonai ir B1 svetainės kūrėjo šablonai visi patenka į vieną eilę, o ne į atskirus kiekvieno produkto peržiūros įrankius.

### Prieiga prie Commons

1. Eikite į skirtuką **Commons** serverio administravimo skydelyje.
2. Pamatysite tris poskirčius: **Eilė**, **Pranešimai** ir **Turinys**.

Ribotos **muzikos redaktoriaus** rolės naudotojai taip pat gali matyti skirtuką Eilė, tačiau negali patvirtinti pateikimų, keičiančių dainos teises ar licencijavimą.

### Eilė

Eilėje rodomi visi laukiantys pateikimai visuose produktuose; ją galima filtruoti pagal produktą ir turinio tipą. Kiekvienoje eilutėje nurodoma, ar pateikimas yra naujas turinys, pradinio autoriaus redaguotas turinys, ar trečiosios šalies redaguotas turinys, taip pat pateikėjo patvirtinimų istorija ir tai, kiek laiko pateikimas laukia (pažymima, kai laukiama ilgiau nei 72 valandas).

Spustelėkite **Peržiūrėti**, kad atidarytumėte šoninį skydelį su laukų lygio skirtumais, failų peržiūromis ir įterptu tik skaitymui skirtu elemento peržiūros langu. Norėdami patvirtinti ar atmesti pateikimą, naudokite klaviatūros klavišus **a** / **r**, o norėdami pereiti prie kito ar ankstesnio pateikimo nepaliekant šoninio skydelio – **j** / **k**. Atmesdami pateikimą, turite pasirinkti priežastį (pavyzdžiui, kokybė, dublikatas, licencija, CCLI, AI arba nesusijusi tema) ir pateikti pastabą.

### Pranešimai

Skirtuke Pranešimai tvarkomi autorių teisių ir politikos bei kokybės pranešimai apie jau paskelbtą turinį. Jie suskirstyti į atskiras eiles – Autorių teisės ir Politika bei kita – ir Išspręstų pranešimų istoriją. Norėdami pradėti darbą su pranešimu, jį priskirkite sau, o tada išspręskite, nurodydami sprendimą (patvirtinta, atmesta arba dublikatas) ir veiksmą (nėra, paslėpti arba pašalinti).

### Turinys

Skirtuke Turinys galima ieškoti paskelbto turinio. Čia galite **Išskirti** turinį (jis bus rodomas produkto pradiniame puslapyje), **Paslėpti** arba **Vėl paskelbti** jį, arba **Pašalinti** jį (nurodydami autorių teisių ar politikos priežastį).

Dainoms šis skirtukas taip pat lemia, ar daina tampa **paruošta sekmadienio pamaldoms** ir ar ji gali pasirodyti bažnyčios B1 Admin dainų paieškoje. Peržiūrėtojas atidaro dainą ir pažymi kiekvieną paskelbtą tonaciją kaip **Išklausyta**, kai ją išklauso ir patikrina, kad natos, akordai ir skaidrės yra visi. Daina tampa paruošta sekmadienio pamaldoms tik tada, kai pažymėtos visos tonacijos.

:::info
Commons moderavimas skirtas tik darbuotojams – atskiros bažnyčios šios eilės niekada nemato. Vienintelė vieta, kurioje atskiros bažnyčios B1 Admin naudoja Commons duomenis, yra skyrius „WorshipCommons — nemokama“ [dainų paieškoje](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons). Jame rodomos tik dainos, kurios jau praėjo šią peržiūros procedūrą.
:::

Apie pagrindinį duomenų modelį ir pateikimo ciklą skaitykite [Bendro turinio architektūros](/docs/developer/architecture/commons) puslapyje.

## Grupinių el. laiškų patvirtinimas

Bažnyčios negali siųsti bažnyčios rašytų el. laiškų (grupinių laiškų, formų tolesnių veiksmų, darbo eigos laiškų ir paskyros kvietimų), kol serverio administratorius jų nepatvirtins. Tai neleidžia robotų registruotoms bažnyčioms naudoti bendro ChurchApps siuntimo adreso šlamštui.

1. Serverio administravimo skydelyje atidarykite skirtuką **Bažnyčios**.
2. Kiekviena bažnyčia rodo žymą **Grupinis el. paštas**: **Patvirtinta** (žalia) arba **Nepatvirtinta** (kontūras).
3. Spustelėkite žymą ir patvirtinkite, kad patvirtintumėte bažnyčią arba panaikintumėte patvirtinimą.

Bažnyčios darbuotojai patvirtinimo prašo mygtuku **Prašyti peržiūros** B1 Admin el. laiško siuntimo dialogo lange. Užklausa išsiunčiama palaikymo adresu ir nurodo bažnyčios pavadinimą, ID, registracijos datą, vietą ir tai, kas prašė. Bažnyčia gali pateikti vieną užklausą per savaitę. Apie dienos limitą ir automatinį sustabdymą dėl grąžintų laiškų bei skundų žr. [Bažnyčios rašytų el. laiškų apribojimai](/docs/developer/architecture/notifications#church-authored-email-limits).

## Duomenų bazės migracijos

Darbo eiga **Deploy Prod** pati pritaiko laukiančias migracijas. Hostinguojamos duomenų bazės priima ryšius tik iš Api tinklo, todėl GitHub vykdytuvas jų pasiekti negali. Vietoj to iš karto po `serverless deploy` darbo eiga iškviečia Api `migrate` Lambda funkciją (`api-Prod-migrate`). Ji paleidžia kiekvieno modulio laukiančias migracijas tuo pačiu vykdytuvu, kaip ir šis skirtukas, ir nutraukia diegimą, jei kuris nors modulis patiria klaidą arba migracija yra atmesta. **Rollback Prod** atkuria tik Lambda kodą; pritaikytos migracijos lieka pritaikytos. Skirtukas **Duomenų bazės migracijos** skirtas būklei tikrinti, paleisti tai, ko diegimas nepaleido (pavyzdžiui, demo aplinkoje, kurios diegimas migracijų nepaleidžia), ir moduliams be istorijos įregistruoti.

Skirtuke rodoma dabartinė aplinka ir po vieną eilutę kiekvienam moduliui (membership, attendance, giving ir kt.) su būkle, pritaikytų ir laukiančių migracijų skaičiumi bei paskutine pritaikyta migracija.

- **Paleisti laukiančias migracijas** pritaiko visas laukiančias migracijas, po vieną modulį, tvarkingai. Ji sustoja ties pirma klaida ir parodo, kas buvo pritaikyta kiekvienam moduliui.
- Modulis pažymėtas **Nėra istorijos**, jei jo duomenų bazė yra senesnė nei migracijų sekimas. Jo niekada nevykdoma automatiškai, nes tai pakartotų senas duomenų migracijas gyvose lentelėse. Vietoj to tam moduliui spustelėkite **Tikrinti schemą**. Api palygina kiekvienos migracijos sukuriamas lenteles, stulpelius ir indeksus su gyva duomenų baze ir pažymi kiekvieną migraciją kaip **Jau pritaikyta**, **Trūksta**, **Iš dalies pritaikyta** arba **Tik duomenys**. Tikrinimas nieko nekeičia.
- Tikrinimo rezultatuose **Įrašyti kaip jau pritaikytas** įrašo aptiktas migracijas į migracijų istoriją, jų nevykdydamas (po patvirtinimo). Įrašoma viskas iki paskutinės **Jau pritaikytos** migracijos, įskaitant tame intervale esančias **Tik duomenys** migracijas. **Trūksta** migracijos lieka laukiančiomis ir vėliau gali būti paleistos įprastai su **Paleisti laukiančias migracijas**.
- **Iš dalies pritaikyta** migracija blokuoja įrašymą. Jei migraciją saugu paleisti dar kartą (pirmiausia ją perskaitykite), pažymėkite **Vykdyti iš naujo**, kad ji liktų laukianti ir būtų paleista iš naujo nuo pradžios.

Serverio administravimo skydelis ir CLI (`yarn migrate:up`) naudoja tą patį Kysely migratorių ir `kysely_migration` lentelę, todėl visada sutampa, kas jau pritaikyta. Galiniai taškai yra `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` ir `POST .../:module/baseline` – visi prieinami tik Server.Admin.

(Savarankiškai įdiegtos Docker versijos vis dar migracijas paleidžia automatiškai, kai pradeda veikti Api konteineris.)

## Susiję puslapiai

- [Autentifikacija ir leidimai](/docs/developer/api/endpoints/authentication) — Leidimų modelis ir JWT autentifikacija
- [Membership galiniai taškai](/docs/developer/api/endpoints/membership) — Naudotojų ir bažnyčių valdymo API
- [Auditų žurnalas](/docs/b1-admin/reports/audit-log) — Bažnyčios veiklos žurnalų peržiūra
- [Bendro turinio architektūra](/docs/developer/architecture/commons) — Bendrinamo turinio modelis ir moderavimo ciklas
