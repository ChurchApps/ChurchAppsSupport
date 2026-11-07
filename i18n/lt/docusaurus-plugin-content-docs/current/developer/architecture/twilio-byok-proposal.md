---
title: "Twilio BYOK (pasiūlymas)"
description: "Siūloma bažnyčiai priklausanti Twilio integracija, sutikimo modelis, įgyvendinimo apimtis ir išleidimo kriterijai."
---

# Twilio BYOK integracijos pasiūlymas

:::caution Pasiūlymas — dar neprieinama integracija
Tai projektas, skirtas palaikytojams peržiūrėti. Jis parengtas remiantis viešuoju šaltiniu ir Twilio dokumentacija, peržiūrėta 2026 m. spalio 22 d. Nuo tada buvo išleistas pagrindinis Twilio teikėjas (`@churchapps/texting` 0.6.0 ir B1 Admin **Nustatymai > Teksto žinutės**): bažnyčia įveda savo Account SID, Auth Token ir From numerį. Teikėjas taip pat priima Messaging Service SID, prasidedantį `MG`, tačiau stulpelis `fromNumber` vis dar yra `varchar(20)`, todėl jis per trumpas 34 simbolių SID. Žinutės siunčiamos po vieną užklausą kiekvienam gavėjui per Twilio Messages API, o STOP atsakymai pasiekia B1 per esamą gaunamųjų žinučių webhook. Žr. [Bažnyčios nustatymai: teksto žinutės](../../b1-admin/settings/church-settings.md#texting). Toliau aprašytas sutikimo modelis, Advanced Opt-Out tvarkymas, pristatymo būsena ir sąrankos parengtumo patikros vis dar yra pasiūlymai, o ne išleista funkcija. [Bažnyčios įdiegimo juodraštis](./twilio-byok-onboarding-draft.md) pateikia siūlomas sąrankos gaires ir bažnyčioms skirtus pavyzdžius.
:::

## Rekomenduojamas kelias

Pridėkite Twilio prie esamos B1 teksto žinučių teikėjų sistemos, naudodami **bažnyčiai priklausančią Twilio paskyrą, API prisijungimo duomenis, Messaging Service ir SMS palaikantį telefono numerį**. Bažnyčia registruoja savo juridinį subjektą ir žinučių kampaniją, moka Twilio tiesiogiai, palaiko gavėjų sutikimą ir tvarko patvirtinimą Twilio Console. ChurchApps teikia integraciją ir dokumentaciją.

Pradėkite nuo vienos žinučių programos, vieno Messaging Service ir vieno JAV vietinio 10DLC siuntėjo kiekvienai B1 bažnyčiai. Palaikykite atskiras žinutes, grupines žinutes, darbo eigos (workflow) žinutes ir priminimus apie prisijungimą per esamus B1 ekranus. Pirmoji tinkama programa apima pamaldų pakeitimus, renginių priminimus ir savanorių grafiko sudarymą, jei visi trys aprašyti tos bažnyčios sutikime ir patvirtintoje kampanijoje. Finansavimo ar reklaminių žinučių siuntimui reikalinga atskirai įvertinta apimtis ir sutikimas; neįtraukite jų į šią programą tyliai.

| Atsakomybė | Bažnyčia | B1 / ChurchApps |
|---|---|---|
| Twilio paskyra, mokėjimai, numerių nuosavybė | Turi ir administruoja | Neteikia platformos paskyros ir neperparduoda kreditų |
| Prekės ženklas, kampanija, numerio registracija | Pateikia tikslią bažnyčios informaciją; tvarko peržiūrą ir taisymus | Paaiškina būtinas sąlygas ir skaito turimą parengtumo informaciją |
| Registracijos puslapis, politikos, žinutės paskirtis | Skelbia ir palaiko | Pateikia suderinamus formos elementus, pavyzdžius ir sutikimo įrašus |
| Gavėjų tinkamumas ir STOP tvarkymas | Peržiūri sutikimo įrodymus ir prašo, kad atsakymai būtų gauti ne per SMS | Vykdo sutikimo, sąrašų išbraukimo, leidimų ir pasirašytų webhook reikalavimus |
| Pristatymas ir palaikymas | Stebi Twilio klaidas, paskyros būklę ir gaunamus atsakymus | Rodo pateikimo ir pristatymo būseną, nepažadėdama patvirtinimo garantijų |

Atidėkite ChurchApps valdomą Twilio pagrindinę paskyrą, kliento subpaskyras, numerių pirkimą, Trust Hub pateikimus, mokėjimus, pokalbių gaunamųjų žinučių langą, MMS/WhatsApp, tarptautinį siuntimą ir nemokamų numerių (toll-free) registraciją. Nemokamas numeris yra atskiras patvirtinto siuntėjo kelias, o ne registracijos apėjimas. Šios ribos suderina pirmąjį leidimą su esamu B1 modeliu „atsineškite savo teikėją“.

## Esamas pagrindas ir spragos

Toliau pateikti stebėjimai susiję su šaltinio kodo momentinėmis nuotraukomis, o ne su prielaida, kas šiuo metu įdiegta:

| Komponentas | Esama elgsena | Pasekmės |
|---|---|---|
| [Teikėjų registras ir sutartis](https://github.com/ChurchApps/Packages/tree/68c93d610031d3ed56d3582055413e851c5cb2ee/texting/src) | `ITextingProvider` palaiko vienos ir masines siuntimo operacijas, tikrinimą, pasirinktinius prenumeratorių ar sąrašų gebėjimus ir teikėjo žinutės ID rezultatuose. Twilio adapteris neįregistruotas. | Pridėkite Twilio į `@churchapps/texting`; jam nereikia kurti prenumeratorių ar teikėjo valdomų sąrašų. |
| [Teksto žinučių nustatymai](https://github.com/ChurchApps/B1Admin/blob/e33cc2386d96e2e3cb24e760d458a72b699c71c3/src/settings/components/TextingSettingsEdit.tsx) | Pasirinktini yra Clearstream, Text In Church ir Nalo; MinistryStuff yra apribotas funkcijų vėliavėlėmis. Siuntėjo redagavimas ir išsaugojimas šiuo metu skirti tik Nalo. | Pridėkite aiškius Twilio laukus, tikrinimą, siuntėjo išsaugojimą ir sąrankos pagalbą. Vien išskleidžiamojo sąrašo įrašo neužtenka. |
| [Valdiklis](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/controllers/TextingController.ts) ir [modulio šliuzas](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/shared/modules/MessagingModuleGateway.ts) | Prisijungimo duomenys užšifruoti ir paslėpti; rankiniai ir automatiniai siuntimai nustato bažnyčios teikėją. Grupiniai siuntimai pašalina pasikartojančius telefono numerius. | Naudokite šiuos kelius ir išsaugokite autorizaciją. Nauji sutikimo ir parengtumo vartai turi būti bendrame serverio kelyje, kad darbo eigos jų neapeitų. |
| [STOP pagalbinė funkcija](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/helpers/SmsOptOutHelper.ts) | Analizuoja Twilio stiliaus `From`/`Body`; patvirtina bažnyčios URL žymeklį; nustato `person.optedOut` ir išjungia SMS priminimus. Kiti atsakymai ignoruojami. | Tai naudingas pradžios taškas, o ne pilnas Twilio webhook. Pridėkite Twilio parašus ir nepriklausomą SMS prenumeratos būseną. |
| [Žinučių schema](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/tools/migrations/messaging/2026-04-03_initial_schema.ts) | Saugo `apiKey`, `apiSecret` ir 20 simbolių `fromNumber`. Siuntimo žurnalai saugo tik tiesioginę sėkmę ar klaidą, o ne teikėjo ID ar galutines pristatymo būsenas. | E.164 siuntėjas tinka; 34 simbolių Messaging Service SID reikalingas atskiras laukas. Pridėkite patvarią teikėjo žinutės ir būsenos saugyklą. |
| [Viešas formos puslapis](https://github.com/ChurchApps/B1App/blob/5ca19ee4ef947235b8ffba9fbb35af42d0dcb41d/src/app/%5BsdSlug%5D/%28public%29/%5BpageSlug%5D/%5Bid%5D/components/FormPage.tsx), [bendras formos atvaizdavimas](https://github.com/ChurchApps/Packages/blob/68c93d610031d3ed56d3582055413e851c5cb2ee/apphelper/src/forms/components/QuestionEdit.tsx) ir [pateikimų valdiklis](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/membership/controllers/FormSubmissionController.ts) | Egzistuoja neribotos formos ir pasirenkami žymimieji langeliai. Aprašymai yra paprastas tekstas. Pateikimai išsaugo atsakymus, tačiau teksto žinučių kelyje nėra kampanijai skirto sutikimo registro. | Pridėkite sukonfigūruotą SMS sutikimo valdiklį su tikromis politikos nuorodomis ir serverio pusės įrodymų fiksavimu. Bendras žymimasis langelis ar grupės narystė automatiškai nesuteikia teisės siųsti SMS. |

Vartotojams skirta [bažnyčios nustatymų dokumentacija](../../b1-admin/settings/church-settings.md#texting) taip pat paaiškina, kad dabartinis atsisakymo žymeklis yra bendras su katalogo privatumu. Ši sąsaja yra išleidimo problema: atsakius START niekada negali keistis katalogo matomumas.

## Konfigūracijos ir prisijungimo duomenų dizainas

Naudokite aiškius, papildomus konfigūracijos laukus, o ne perkraukite `fromNumber` ar saugokite struktūrinius duomenis API rakto eilutėje:

| Laukas | Siūloma paskirtis |
|---|---|
| `accountSid` | Bažnyčiai priklausantis Twilio paskyros ir projekto identifikatorius (`AC…`) |
| `apiKey`, `apiSecret` | Atskiras Twilio API rakto SID (`SK…`) ir paslaptis išeiniems API prieigos poreikiams; užšifruota ir paslėpta |
| `webhookAuthToken` | Paskyros Auth Token, kurį Twilio SDK naudoja gaunamiems parašams patikrinti; atskirai užšifruota ir paslėpta |
| `messagingServiceSid` | Bažnyčios Messaging Service (`MG…`, 34 simboliai) |
| `fromNumber` | Pasirinktas SMS palaikantis numeris E.164 formatu, patvirtintas kaip siuntėjas toje paskyroje ar servise |
| Programos konfigūracija | Stabilus programos ID, pavadinimas, leidžiami tikslai, registracijos ir politikos URL bei atskleidimo versija |

Twilio [teikia pirmenybę API raktams REST autentifikacijai](https://www.twilio.com/docs/iam/api-keys). Naudokite siauriausius išbandytus rakto leidimus, kurie apima siuntimą ir reikalingas tik skaitymo sąrankos patikras. Paskyros Auth Token vis dar reikalingas [standartiniam Twilio webhook parašo patikrinimui](https://www.twilio.com/docs/usage/security). Paaiškinkite šį skirtumą sąsajoje: API paslaptis nėra webhook Auth Token. Prisijungimo duomenys turi būti laikomi tik serverio pusės nustatymų saugykloje, niekada viešuose puslapiuose, formų atsakymuose, naršyklės siuntimo užklausose ar palaikymo problemose.

Bažnyčia kuria ir tvarko šiuos išteklius Twilio Console. B1 patvirtinimo veiksmas turi tik skaityti sukonfigūruotą servisą, siuntėjus ir registracijos informaciją. Jis neturi pirkti numerių, kurti kampanijų, keisti Twilio nustatymų ar siųsti bandomosios žinutės kaip šalutinio poveikio. Pateikite atskirą aiškų bandomojo siuntimo veiksmą, apribotą tinkamu, sutikusiu gavėju.

Išsaugokite paslėptus prisijungimo duomenis tik redaguojant tą patį išsaugotą teikėją. Perjungiant į Twilio reikia atskirų prisijungimo duomenų, o pasenusias teikėjui būdingas reikšmes reikia išvalyti. Nekopijuokite paslėpto Clearstream ar Nalo rakto į Twilio konfigūraciją.

Kiekvieną įkėlimą ir atnaujinimą apribokite autentifikuota B1 bažnyčia. Susiekite grįžtamuosius skambučius su išsaugota integracija ir numatoma Twilio paskyra, servisu ar siuntėju, o prieštaringus tarpbažnytinius priskyrimus atmeskite. Prisijungimo duomenų rotacija ir teikėjo atjungimas turi panaikinti parengtumą ir sustabdyti eilėje laukiančius siuntimus, neištrindami sutikimo ar istorinių pristatymo įrašų.

## Sutikimas ir sąrašo išbraukimas yra privalomas išleidimo darbas

Twilio programai įveskite su telefono numeriu susietus prenumeratos įrašus ir tik papildomus (append-only) sutikimo bei sąrašo išbraukimo įvykius. Siūlomi minimalūs įrodymai: bažnyčios ID, programos ID, normalizuotas telefono numeris, neprivalomas patikrintas asmens susiejimas, aktyvus veiksmas, šaltinio formos ar pateikimo ID arba peržiūrėtas išorinis įrodymas, serverio laikas, atskleidimo tekstas ir versija, šaltinio URL, politikos URL ir atšaukimo ar atnaujinimo įvykiai. Apribokite prieigą ir saugojimo laikotarpį pagal esamą bažnyčios duomenų saugumo politiką.

Naudokite tokias būsenas kaip `unknown`, `pending`, `active` ir `suppressed`. Esami mobilieji numeriai, importuoti kontaktai, lankomumas, aukos, grupės narystė, `person.optedOut = false` ir `allowSms` nėra aiškus programos sutikimas. Dokumentuoto sutikimo importavimas turi būti leidžiamas, audituojamas veiksmas su įrašytu šaltiniu. Migracija neturi įtraukti visų.

Pradiniam žiniatinklio srautui naudokite standartinį B1 viešos formos režimą. Pridėkite aiškiai sukonfigūruotą SMS sutikimo klausimą, kuris prasideda nepažymėtas, lieka neprivalomas, rodo paspaudžiamas politikos nuorodas ir susiejamas su viena programa bei vienu mobiliojo lauku. Patikrinkite šį susiejimą serverio pusėje ir užfiksuokite rodomo atskleidimo kopiją, kai išsaugomas teigiamas atsakymas. Niekada neišvedžiokite sutikimo iš savavališkų klausimų etikečių, pokalbių DI ar darbo eigos narystės. Pokalbinį atitikmenį įjunkite tik tada, kai jo aiškus teigiamas veiksmas ir įrodymų fiksavimas yra išbandyti.

Nepažymėtas pateikimas nesukuria prenumeratos ir negali atšaukti kito asmens esamo sutikimo. Sutikimas susiejamas su pateiktu telefono numeriu. Darbuotojai gali išspręsti neaiškius asmens susiejimus neapjungdami namų ūkio įrašų. Pakeistas mobilusis numeris reikalauja naujo sutikimo. Anoniminėms formoms taikykite piktnaudžiavimo kontrolę ir aiškiai nurodykite bet kokį numerio nuosavybės patvirtinimo ar dvigubo patvirtinimo žingsnį. Vien pažymėtas langelis neįrodo, kas valdo telefoną. Jei naudojamas patvirtinimas, palikite prenumeratą laukiančią, kol jis bus atliktas, ir tiksliai aprašykite šį srautą registracijos medžiagoje.

Twilio atveju atskirkite SMS atsisakymą nuo katalogo matomumo. Konservatyviai perkelkite bet kokį senąjį atsisakymą į atsisakymo įrašą; kitus senus gavėjus palikite `unknown`. Aiškus, dokumentuotas naujas prisijungimas gali nustatyti SMS sutikimą, o katalogo privatumas lieka nepakeistas. Kitų teikėjų elgseną palikite nepakeistą, kol atskirai nebus peržiūrėtos jų migracijos.

Kiekvieno faktinio siuntimo metu reikalaukite, kad bažnyčios integracija būtų įjungta ir parengta, galiotų dabartinis programos sutikimas tiksliam telefono numeriui, nebūtų telefono lygio atsisakymo ir būtų tenkinamas esamas siuntėjo leidimas. Priminimams papildomai taikykite `allowSms`, kategorijų nuostatas ir tylias valandas. Patikrinkite dar kartą po įtraukimo į eilę, išspręskite lauko reikšmes, normalizuokite ir patikrinkite numerius bei pašalinkite pasikartojimus pagal telefono numerį. STOP sustabdo visus siuntimus servisui ar programai, įskaitant rankinius siuntimus ir darbo eigas. Jis turi apimti visus asmenis, dalijančius tą patį telefono numerį.

Bendrame Twilio siuntimo kelyje nuosekliai pateikite bažnyčios tapatybę ir STOP instrukciją bei peržiūrėkite galutinį SMS ir segmentų skaičių. Lauko išplėtimas ir ilgio tvarkymas turi išsaugoti šiuos elementus; neapkarpykite atsisakymo instrukcijos tyliai. Pavyzdžiai ir tikri priminimų bei darbo eigos šablonai turi būti suderinti.

## Twilio siuntimai, atsakymai ir pristatymo būsena

Įgyvendinkite `TwilioProvider.sendMessage` per Messages API su pasirinktu Messaging Service ir siuntėju. Grąžinkite teikėjo žinutės SID ir priimto ar pateikto rezultato būseną. HTTP priėmimas nėra pristatymas į telefoną. Grupinis siuntimas grąžina rezultatus kiekvienam gavėjui įvesties tvarka.

Apribokite išeinančių užklausų lygiagretumą **tiek** `sendBulk`, tiek atskiriems siuntimams: dabartinė sujungimo šaka paleidžia `sendMessage` kvietimus lygiagrečiai. Grupėms, kurios netelpa į užklausos biudžetą, saugokite siuntimo ketinimą ir darbą, kurį galima paimti, eilėje. Pakartokite esamą diegimo modelį, o ne reikalaukite, kad bažnyčios paleistų kitą paslaugą. Pakartokite žinomas laikinas klaidas ir greičio ribos klaidas su atidėjimu. Dviprasmiškus baigimo laiko pabaigimus (timeout) traktuokite kaip nežinomus rezultatus, kuriuos reikia suderinti. Nesiųskite iš naujo aklai, nes tai rizikuoja dublikuotomis žinutėmis ir mokesčiais.

Konfigūruokite bažnyčiai specifinius gaunamųjų ir būsenos grįžtamųjų skambučių URL. Patikrinkite `X-Twilio-Signature` naudodami SDK, tikslų sukonfigūruotą išorinį URL, originalius formos parametrus ir atitinkamą paskyros Auth Token. Vien paslaptus URL nepakanka. Susiekite grįžtamuosius skambučius su išsaugotais bažnyčios, paskyros ir žinutės įrašais, tvarkykite dublikatus ir skambučius, atvykstančius prieš įsipareigojant siuntimo rezultatą. Neleiskite senesniems įvykiams perrašyti galutinės būsenos. Gaunamo patvirtinimui grąžinkite tuščią TwiML, o būsenos įvykiams tinkamą sėkmės atsakymą. [Twilio saugumas](https://www.twilio.com/docs/usage/security), [būsenos grįžtamieji skambučiai](https://www.twilio.com/docs/messaging/guides/track-outbound-message-status)

Rekomenduokite Messaging Service **Advanced Opt-Out**. Twilio valdo STOP, START ir HELP patvirtinimus. B1 priima autentifikuotus `OptOutType` įvykius ir nesiunčia dubliuotų patvirtinimų. STOP iš karto įrašo atsisakymą. START atkuria tik žinomą prenumeratą šiai pačiai atskleistai programai, su nauju atnaujinimo įvykiu. Jis neturi prenumeruoti naujo telefono į nesusijusius pranešimus ar įjungti priminimų nuostatų. HELP niekono neįtraukia. Kiti gaunami atsakymai lieka už B1 gaunamųjų žinučių ribų. Bažnyčioms reikia dokumentuoto būdo stebėti juos Twilio. [Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

Saugokite Twilio žinutės SID, paskyros ir serviso susiejimą, pateikimo laiką, galutinę būseną ar klaidos kodą ir grįžtamojo skambučio laiką kartu su siuntimo žurnalu. Tiksliai rodykite: eilėje ar priimta, pristatyta, nepavyko, nepristatyta arba nežinoma. Išlaikykite esamą atsakymo sutartį kitiems teikėjams ir apibrėžkite, ar bendras sėkmės skaičius reiškia pateikimą, ar pristatymą.

## Sąrankos parengtumas ir patvirtinimo patikra

Rodykite atskirus tikrinimo etapus: prisijungimo duomenis, servisą ir siuntėjo nuosavybę, kampanijos patvirtinimą, numerio registraciją, webhook patikras ir pristatytą bandomąjį siuntimą. Niekada nerodykite vieno žalio ženklelio „patvirtinta“ vien dėl to, kad prisijungimo duomenys veikia.

JAV vietiniams numeriams perskaitykite serviso [Usa2p kampanijos išteklių](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) ir reikalaukite, kad atitinkama kampanija būtų `VERIFIED`. Atskirai patikrinkite, ar pasirinktas telefonas susietas su tuo servisu ir yra užbaigęs numerio registraciją. Patvirtinta kampanija vis dar gali turėti laukiantį numerį. Jei palaikomas skaitymo API neatskleidžia reikalingo signalo, rodykite **reikalinga rankinė patikra Console** ir įrašykite bažnyčios administratoriaus datuotą patvirtinimą kaip tokį. Nežymėkite jo kaip API patikrinto. Automatiniai numerių registracijos įvykiai gali būti vėlesnis darbas. [Numerio registracijos klaidos](https://www.twilio.com/docs/api/errors/30035), [A2P registracijos įvykiai](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/event-streams-setup)

Reikalaukite dabartinių patikrų prieš įjungiant siuntimą. Įrašykite, kada ir kaip buvo tikrinamas parengtumas, ir leiskite pasenusioms patikroms nebegalioti. Sustabdykite siuntimą, kai prisijungimo duomenys atšaukti, siuntėjai pakeisti, registracija nepavyksta ar nuolat fiksuojamos paskyros klaidos. Bandomojo siuntimo pristatymas patvirtina išbandytą kelią, o ne visuotinį operatoriaus patvirtinimą ar gavėjo sutikimą. Papildomame juodraštyje aprašomos bažnyčios prieš pateikimą, prieš paleidimą ir nuolatinės veiklos patikros.

## Saugykla ir išleidimo planas

[Organizacijos įnašų gairės](https://github.com/ChurchApps/.github/blob/main/CONTRIBUTING.md) nukreipia B1 funkcijų užklausas į ChurchAppsSupport, o įgyvendinimo PR į atitinkamas saugyklas. Naudokite vieną centrinę funkcijos užklausą ir susiekite sutelktus įgyvendinimo PR su ja:

1. **ChurchAppsSupport:** peržiūrėkite šį dizainą ir jo įdiegimo juodraštį prieš pristatant Twilio kaip prieinamą vartotojo funkciją.
2. **Packages:** pridėkite Twilio adapterį, aiškią bendrą konfigūraciją ir sąsajas bei SMS sutikimo formos atvaizdavimą, kai jis bendras B1Admin ir B1App. Įtraukite changeset ir publikuokite per esamą išleidimo darbo eigą prieš atnaujindami vartotojus.
3. **Api:** pridėkite papildomas migracijas integracijos metaduomenims, sutikimui ir atsisakymui bei pristatymo būsenoms. Įgyvendinkite konfigūracijos tikrinimą, bendrus siuntimo vartus, formos įrodymų fiksavimą, webhook tvarkymą ir siuntimo saugojimą.
4. **B1Admin:** pridėkite Twilio konfigūracijos ir parengtumo sąsają, programos ir sutikimo valdymą, teikėjui pritaikytą siuntėjo išsaugojimą bei tikslią pristatymo ataskaitą. Neatskleiskite jokio SMS sutikimo perrašymo per įprastą asmens redagavimą.
5. **B1App:** patikrinkite viešą formos ir puslapio bei politikos nuorodų patirtį, palygindami ją su bendrais valdikliais, įskaitant anoniminius ir mobiliuosius lankytojus. Atskiras Twilio naršyklės klientas nereikalingas.
6. **ChurchAppsSupport:** po išleidimo paverskite įdiegimo juodraštį palaikomais nustatymų ir pagalbos puslapiais, pridėkite tikras ekrano nuotraukas, susiekite jį iš teksto žinučių nustatymų ir organizuokite vertimus.

Pirmiausia diegkite schemą ir bendrus paketus, o tik tada vartotojus. Laikykite Twilio prieinamą tik per funkcijų vartus mažam pasirinktiniam bandomajam projektui; esami teikėjai turi toliau veikti. Atšaukimas išjungia Twilio siuntimą ir atšaukia nepateiktus darbus, išsaugodamas atsisakymus ir įrodymus. Jis neturi automatiškai perjungti gavėjų į kitą teikėją ar siuntėją.

## Pastangų įvertinimas

Planavimo įvertinimas dalyviui, gerai išmanančiam ekosistemą. Šiame vertinime nebuvo naudojami gamybiniai prisijungimo duomenys ar tikri SMS:

| Darbas | Kūrėjo dienos |
|---|---|
| Adapteris, konfigūracijos ir schemos plėtiniai, nustatymų sąsaja | 2–3 |
| Telefono ir programos sutikimas, nepriklausomas atsisakymas, bendri siuntimo vartai, viešos formos integracija | 3–5 |
| Pasirašyti grįžtamieji skambučiai, pristatymo saugojimas, apribotas ir patvarus siuntimas | 2–3 |
| Parengtumo sąsaja, bažnyčios vadovas, integracijos ir regresijos testavimas, bandomieji pataisymai | 3–4 |
| **Rekomenduojama paleidimo apimtis** | **10–15 iš viso** |

Paprastas adapterio ir nustatymų įrodymas koncepcijai trunka maždaug 1–2 dienas. Vien siuntėjo įvertinimas neįskaičiuoja sutikimo ir įdiegimo darbo, kuris būtinas šiai rekomendacijai. Išorinės Twilio ir operatorių peržiūros laikas yra atskiras ir kintamas. Projektas neturėtų žadėti patvirtinimo datos ar patvirtinimo rezultato.

## Priėmimo kriterijai

- [ ] Bažnyčia valdo ir moka už paskyrą, servisą, registruotą siuntėją ir kampaniją; ChurchApps valdoma Twilio paskyra nereikalinga.
- [ ] Prisijungimo duomenys užšifruoti ir paslėpti, priskirti nuomininkui, keičiami ir nėra žurnaluose ar viešame turinyje; patikra tik skaitoma.
- [ ] Pasirenkamas nepažymėtas sutikimas rodo tikras politikos nuorodas ir serverio pusėje išsaugo programos, telefono ir atskleidimo įrodymus; atsisakymas vis tiek leidžia pagrindinį formos veiksmą.
- [ ] Visi rankiniai, grupiniai, lauko reikšmių, darbo eigos ir priminimų keliai taiko tą patį Twilio tinkamumo vartą. Nežinomi, nesutikę, pakeitę telefoną ar atsisakę gavėjai praleidžiami su naudinga priežastimi. Atvaizdavimas išsaugo bažnyčios tapatybę ir STOP instrukcijas po išplėtimo bei ilgio tvarkymo.
- [ ] Senasis katalogo privatumas neįtraukia gavėjų. STOP ir START niekada nekeičia katalogo matomumo ar nesusijusių nuostatų. Bandomi bendro telefono ir tarpbažnytiniai atvejai.
- [ ] Pasirašyti STOP, START ir HELP įvykiai, neteisingi parašai, neteisingos paskyros ar servisai, dubliuoti įvykiai, pakartotinai pateikiamos formos ir suklastoti sutikimo susiejimai padengti testais.
- [ ] Grupės dydis ir pasibaigimo laikas, greičio ribos, dalinės klaidos, dviprasmiški rezultatai, grįžtamųjų skambučių lenktynės ir neeilinės pristatymo įvykiai testuojami be dublikuotų siuntimų.
- [ ] Kampanijos patvirtinimas ir baigta numerio registracija skiriasi nuo prisijungimo duomenų patikros. Rankinis įrodymas aiškiai pažymėtas, o pasenęs ar atšauktas parengtumas blokuoja siuntimą.
- [ ] Bandomoji bažnyčia patikrina savo registracijos puslapį, atsisakymo ir priėmimo formos kelius, tikslias politikos URL ir sutikusį bandomąjį gavėją per pateikimą, pristatymą, STOP panaikinimą ir leidžiamą pakartotinį prenumeravimą.
- [ ] Esami Clearstream, Text In Church ir Nalo nustatymai bei siuntimo elgsena praeina regresijos patikras. Pagalbos tekste aiškiai atskiriami pasiūlymai nuo išleistų funkcijų.
