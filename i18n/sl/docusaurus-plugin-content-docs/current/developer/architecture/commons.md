---
title: "Skupna vsebina"
description: "Kako uporabniško oddane pesmi, lekcije in predloge potujejo skozi skupno čakalno vrsto moderiranja v Server Admin B1 Admin, od oddaje do objave."
---

# Skupna vsebina — knjižnica skupnih virov in moderiranje

Vsebina, ki jo uporabniki pošljejo v skupno rabo med izdelki (pesmi WorshipCommons, lekcije Lessons.church, predloge FreeShow, predloge spletnih strani B1), gre skozi eno skupno vrsto za moderiranje, ne skozi ločen postopek pregleda za vsak izdelek. Ta stran opisuje življenjski cikel oddaje in odobritve, podatkovni model skupnih virov ter mesto moderiranja.

## Osrednji del virov

Vsak element skupne vsebine, ne glede na izdelek, je zapisan v dveh tabelah:

- **`assets`** — javna identitetna vrstica. `status`: `pending` | `published` | `unpublished` | `removed`. Podatki, specifični za vrsto (podrobnosti o pesmi, avtorji), so v pomožnih tabelah, povezanih prek `assetId`.
- **`assetFiles`** — vse datoteke, priložene viru (zvok, slike, dokumenti). Nadomeščajo starejša stolpca `path` in `files`, ločena z vejicami, v posameznih tabelah vsebine.
- **`submissions`** — enota moderiranja. Življenjski cikel: `draft → pending → approved | rejected | withdrawn`. Oddaja je lahko popolnoma nov vir ali predlog za spremembo že objavljenega vira (od prvotnega avtorja ali tretje osebe).

Ob odobritvi oddaje se zažene **kljuka za objavo** (`publish hook`), specifična za izdelek (`Api/src/modules/commons/helpers/publishHooks/`, npr. `song.ts`), ki oddajo razširi v lastne zapise izdelka.

## Potek oddaje

`CommonsSubmissionController` (`Api/src/modules/commons/`) je API, namenjen končnim uporabnikom: ustvari osnutek, naloži in priloži datoteke, pošlje v pregled ali umakne oddajo. Njegovi dejanski odjemalci so zunanja spletna mesta ponudnikov (spletno mesto WorshipCommons, Lessons.church, FreeShow, galerija predlog spletnih strani B1), ne B1Admin.

## Uporaba za cerkve

Poleg moderiranja B1Admin neposredno bere tudi iz osrednjega dela skupne vsebine: iskanje »Add Song« v razdelku Serving → Songs v B1Admin poizveduje `GET /songs?sundayReady=true` poleg obstoječe zunanje zbirke pesmi ter prikazuje objavljene pesmi WorshipCommons, ki jih je osebje označilo kot pripravljene za nedeljo (glejte vrata poslušanja spodaj), z oznako licence. Ob izbiri se nova `SongDetail` poveže z izvorom prek `songDetailLinks`. To je edina pot, po kateri se podatki skupne vsebine v B1Admin posamezne cerkve obravnavajo neposredno, namesto prek orodij Server Admin, ki so namenjena samo osebju. Opis za cerkve najdete v razdelku dokumentacije za podporo [Brezplačne pesmi iz WorshipCommons](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons).

## Vrsta za moderiranje

Vrsta je v **B1Admin → Server Admin → Commons** (`B1Admin/src/serverAdmin/components/CommonsTab.tsx`) in je omejena z dovoljenjem `Permissions.server.admin` — enakim, ki omejuje Churches/Impersonate/Jobs na tej strani. Gre za notranje orodje, namenjeno samo osebju ChurchApps; posamezne cerkve ga ne vidijo.

Tri podzavihke:

- **Queue** — vse oddaje v čakanju za vse izdelke, filtrirljive po izdelku ali vrsti vira. Vsaka vrstica prikazuje oznako nov vir, uredi od avtorja ali uredi od tretje osebe, zgodovino odobritev pošiljatelja, povzetek razlik v poljih in datotekah ter starost (označeno po 72 urah). **Review** odpre predal z razlikami po poljih, predogledi datotek in vgrajenim predogledom izdelka samo za branje. Odobritev in zavrnitev podpirata bližnjice na tipkovnici (j/k za krmarjenje, a/r za dejanje).
- **Reports** — poročila o avtorskih pravicah ter pravilnikih in kakovosti za objavljene vire, razdeljena v dve vrsti in zgodovino rešenih. Član osebja prevzame poročilo in ga reši z rezultatom (potrjeno/zavrnjeno/podvojeno) in dejanjem (brez dejanja/prekliči objavo/odstrani).
- **Assets** — iskalnik objavljene vsebine z dejanji za posamezne vire: izpostavi, prekliči objavo ali ponovno objavi ali odstrani (razlog: avtorske pravice/pravilnik). Pri pesmih je tukaj **vrata poslušanja** (listen gate), prek katerih pesem postane »pripravljena za nedeljo«: osebje jo označi, ko je prepoznalo vse objavljene tonalitete in potrdilo, da so notni zapis, akordi in diapozitivi prisotni.

Vsaka končna točka pod `/commons/admin/*` (`CommonsAdminController.ts`) samostojno ponovno preveri dovoljenje server-admin.

:::info
Ta zasnova namerno uporablja eno samo vrsto: lastni vmesnik za moderiranje `/admin` pri WorshipCommons je bil ukinjen, da se oddaje vseh izdelkov usmerjajo prek orodij Server Admin v B1Admin.
:::

## Obseg

Api (modul commons), B1Admin (Server Admin) in zunanja spletna mesta ponudnikov: WorshipCommons, Lessons.church, FreeShow, predloge gradnika spletnih strani B1.
