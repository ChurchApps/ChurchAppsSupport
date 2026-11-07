---
title: "Bendrinamos bibliotekos"
description: "ChurchApps npm paketų, bendrų B1 Admin, B1.church ir API, dokumentacija, Packages darbo srities sąranka ir leidimas su changesets."
---

# Bendrinamos bibliotekos

<div class="article-intro">

ChurchApps bendrinamas kodas skelbiamas npm registre `@churchapps/*` vardų erdvėje. Visi bendrinami paketai yra vienoje saugykloje – [Packages](https://github.com/ChurchApps/Packages) – kuri valdoma kaip Yarn (Berry) darbo sritis ir versijuojama naudojant [changesets](https://github.com/changesets/changesets).

</div>

## Paketai

| Paketas | Aprašymas | Naudoja |
|---------|-----------|---------|
| [`@churchapps/helpers`](./helpers.md) | Pagrindinis sluoksnis: nuo karkaso nepriklausomos pagalbinės funkcijos ir bendros TypeScript sąsajos, sudarančios tarpprograminį duomenų kontraktą | Visi projektai |
| [`@churchapps/apihelper`](./api-helper.md) | Serverio pusės Express pagalbinės priemonės: autentifikavimas, bazinės valdiklių klasės, prieiga prie duomenų bazės, AWS ir el. pašto integracijos | Visos API |
| [`@churchapps/apphelper`](./app-helper.md) | Bendri React komponentai ir funkciniai moduliai (prisijungimas, aukojimai, formos, Markdown, svetainė) | Visos žiniatinklio programos |
| `@churchapps/content-providers` | Abstrakcija virš trečiųjų šalių turinio teikėjų (Lessons.church, Planning Center, Dropbox ir kiti) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Įrankių rinkinys B1.church integracijoms kurti: webhook patikra, tipizuotas REST klientas, OAuth pagalbinės funkcijos | Išorinių integracijų kūrėjai |
| `@churchapps/texting` | SMS teikėjų abstrakcija (Text In Church, Clearstream, Mutual Ministry, MinistryStuff, Nalo Solutions, Twilio) | Api |

Priklausomybių kryptis griežtai žemyn: programos priklauso nuo `apihelper` ir `apphelper`, kurie `@churchapps/helpers` deklaruoja kaip **lygiavertę priklausomybę (peer dependency)**, todėl kiekviena programa naudoja tik vieną jos kopiją.

## Darbo sritis

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Saugykloje naudojamas Yarn Berry (autoritetinga yra šakninio `packageManager` laukelio reikšmė) su vienu užrakto failu. `yarn build` sukuria visus paketus priklausomybių tvarka; `yarn test` paleidžia visų paketų testus.

## Leidimas su Changesets

Kiekvienas paketo pakeitimas išleidžiamas kartu su changeset:

1. Paleiskite `yarn changeset` darbo sritown šaknyje. Pasirinkite paketą (-us), kuriuos pakeitėte, versijos keitimo tipą (patch = pataisa, minor = nauja eksportuojama funkcija ar galimybė, major = nesuderinamas pakeitimas) ir parašykite vienos eilutės santrauką – ji taps CHANGELOG įrašu.
2. Kartu su kodo pakeitimu įkelkite sugeneruotą `.changeset/*.md` failą. Išankstinis commit kablys blokuoja commit'us, kurie keičia paketo šaltinio kodą be pridėto changeset.
3. Kai būsite pasirengę publikuoti, šaknyje paleiskite `yarn publish-all`. Ši komanda apdoroja laukiančius changeset'us (didina versijas, rašo CHANGELOG, sinchronizuoja vidinių priklausomybių intervalus), sukuria visus paketus priklausomybių tvarka ir publikuoja pakeltų versijų paketus į npm. Tada įkelkite versijų pakeitimus (commit ir push).

:::warning
Niekada nepaleiskite tiesioginio `npm publish` viename pakete – taip praleidžiama sukūrimo tvarka ir versijų apskaita, kuria rūpinasi leidimo scenarijus. Publikavimui reikalinga npm paskyra, turinti `@churchapps` vardų erdvės publikavimo teises.
:::

## Vietinė kūrimo aplinka su vartojančia programa

Darbo srityje paketai kuriami tiesiogiai pagal savo kaimynus – jokio susiejimo nereikia. Norėdami išbandyti nepublikuoto paketo versiją vartojančioje programoje (B1Admin, B1App ir kt.), vartotojo projekte pridėkite laikiną Yarn portalą:

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Pirmiausia sukurkite paketą (`yarn build` darbo sritiės šaknyje) – vartotojas skaito sukompiliuotą `dist/` išvestį, o ne šaltinio kodą.

:::warning
`yarn link` įrašo portalo nustatymą į vartotojo `package.json`. Niekada jo neįkelkite į saugyklą – baigę visada paleiskite `yarn unlink` ir iš naujo įdiekite priklausomybes.
:::
