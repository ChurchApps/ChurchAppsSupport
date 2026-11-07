---
title: "Content Commons"
description: "Kaip vartotojų pateiktos dainos, pamokos ir šablonai eina per bendrą moderavimo eilę B1 Admin Serverio administravime – nuo pateikimo iki paskelbimo."
---

# Content Commons — bendroji medžiagų biblioteka ir moderavimas

Vartotojų pateiktas turinys, bendrinamas tarp produktų (WorshipCommons dainos, Lessons.church pamokos, FreeShow šablonai, B1 svetainių šablonai), patenka į vieną moderavimo eilę, o ne į atskirą peržiūros procesą kiekvienam produktui. Šiame puslapyje aprašoma pateikimo ir patvirtinimo eiga, bendrosios medžiagos duomenų modelis ir tai, kur veikia moderavimas.

## Medžiagos pagrindas

Visus bendrosios medžiagos elementus, nepriklausomai nuo produkto, saugo dvi lentelės:

- **`assets`** — viešasis elemento identifikatorius. `status`: `pending` | `published` | `unpublished` | `removed`. Konkretaus tipo duomenys (dainos informacija, autoriai) saugomi papildomose lentelėse, susietose per `assetId`.
- **`assetFiles`** — visi elementui priskirti failai (garsas, paveikslėliai, dokumentai). Jie pakeičia senesnius `path` ir kableliais atskirtus `files` stulpelius atskirose turinio lentelėse.
- **`submissions`** — moderavimo vienetas. Gyvavimo ciklas: `draft → pending → approved | rejected | withdrawn`. Pateikimas gali būti visiškai naujas elementas arba esamo paskelbto elemento redagavimas (tiek jo pradinio autoriaus, tiek trečiosios šalies).

Patvirtinus pateikimą, paleidžiamas produkto specifinis **publikavimo kablys** (`Api/src/modules/commons/helpers/publishHooks/`, pvz., `song.ts`), kuris išskleidžia pateikimą į produkto įrašus.

## Pateikimo eiga

`CommonsSubmissionController` (`Api/src/modules/commons/`) yra galutiniams vartotojams skirta API: sukuria juodraštį, pateikia failus (presign ir priskyrimas), pateikia peržiūrai arba atšaukia pateikimą. Jos tikri klientai yra išoriniai gamintojų puslapiai (WorshipCommons svetainė, Lessons.church, FreeShow, B1 svetainių šablonų galerija), o ne B1Admin.

## Naudojimas bažnyčioms

Be moderavimo, B1Admin taip pat tiesiogiai skaito bendrosios medžiagos duomenis: Serving → Songs „Add Song“ paieška užklausia `GET /songs?sundayReady=true` kartu su esama išorine dainų duomenų baze. Ji rodo paskelbtas WorshipCommons dainas, kurias darbuotojai pažymėjo kaip paruoštas sekmadieniui (žr. klausymo vartus žemiau), su licencijos ženkleliu. Pasirinkus dainą, nauja `SongDetail` susiejama su šaltiniu per `songDetailLinks`. Tai vienintelis kelias, kuriuo atskiros bažnyčios B1Admin tiesiogiai naudoja bendrosios medžiagos duomenis, o ne per tik personalui skirtus Server Admin įrankius. Bažnyčioms skirtą aprašymą rasite pagalbos dokumento skiltyje [Free Songs from WorshipCommons](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons).

## Moderavimo eilė

Eilė yra **B1Admin → Server Admin → Commons** (`B1Admin/src/serverAdmin/components/CommonsTab.tsx`). Prie jos prieiga ribojama leidimu `Permissions.server.admin`, tuo pačiu, kuris riboja Churches, Impersonate ir Jobs šiame puslapyje. Tai vidinis įrankis, skirtas tik ChurchApps darbuotojams, o ne bažnyčioms.

Yra trys skirtukai:

- **Queue**: visi laukiantys pateikimai visuose produktuose, filtruojami pagal produktą ir elemento tipą. Kiekvienoje eilutėje rodomas naujo elemento, redagavimo autoriaus arba trečiosios šalies redagavimo ženklelis, pateikėjo patvirtinimų istorija, laukų ir failų skirtumų suvestinė bei amžius (pažymima, jei praėjo daugiau nei 72 valandos). **Review** atidaro šoninį skydelį su laukų lygio skirtumais, failų peržiūromis ir įterptu tik skaitymui skirtu produkto peržiūros langu. Mygtukai Approve ir Reject palaiko klaviatūros trumpinius (j/k naršymui, a/r veiksmui).
- **Reports**: autorių teisių ir politikos bei kokybės pranešimai apie paskelbtus elementus, suskirstyti į dvi eiles ir išspręstų pranešimų istoriją. Darbuotojas pasiima pranešimą ir jį išsprendžia nurodydamas sprendimą (upheld, dismissed arba duplicate) ir veiksmą (none, unpublish arba remove).
- **Assets**: paskelbto turinio naršyklė su paieška ir kiekvieno elemento veiksmais: išskirti, nepublikuoti, vėl publikuoti arba pašalinti (priežastis: autorių teisės arba politika). Dainoms čia esantys **klausymo vartai** lemia, ar daina tampa „paruošta sekmadieniui“. Darbuotojai ją pažymi tik išklausę visus paskelbtus tonus ir patvirtinę, kad nata, akordai ir skaidrės yra visi.

Kiekvienas `/commons/admin/*` galutinis taškas (`CommonsAdminController.ts`) savarankiškai patikrina server-admin leidimą.

:::info
Ši struktūra tyčia turi vieną eilę: WorshipCommons savo `/admin` moderavimo sąsaja buvo nutraukta, kad visų produktų pateikimai būtų nukreipiami per B1Admin Server Admin įrankius.
:::

## Apimtis

Api (commons modulis), B1Admin (Server Admin) ir išoriniai gamintojų puslapiai: WorshipCommons, Lessons.church, FreeShow ir B1 svetainių kūrėjo šablonai.
