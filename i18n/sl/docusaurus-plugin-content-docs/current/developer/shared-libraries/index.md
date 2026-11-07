---
title: "Deljene knjižnice"
description: "Dokumentacija za npm pakete @churchapps, ki jih uporabljajo B1 Admin, B1.church in API-ji, nastavitev delovnega prostora Packages ter izdaja z changesets."
---

# Deljene knjižnice

<div class="article-intro">

Deljena koda ChurchApps je objavljena na npm pod okriljem `@churchapps/*`. Vsi deljeni paketi so v enem repozitoriju -- [Packages](https://github.com/ChurchApps/Packages) -- ki ga upravljamo kot delovni prostor (workspace) Yarn (Berry) in katerega različice upravljamo z [changesets](https://github.com/changesets/changesets).

</div>

## Paketi

| Paket | Opis | Uporablja |
|-------|------|-----------|
| [`@churchapps/helpers`](./helpers.md) | Temeljna plast: pomožne funkcije brez ogrodja in deljeni vmesniki TypeScript, ki tvorijo podatkovno pogodbo med aplikacijami | Vsi projekti |
| [`@churchapps/apihelper`](./api-helper.md) | Strežniški pripomočki za Express: avtentikacija, osnovni krmilniki, dostop do baze podatkov, integracije z AWS in e-pošto | Vsi API-ji |
| [`@churchapps/apphelper`](./app-helper.md) | Deljene komponente React in funkcijski moduli (prijava, darovanja, obrazci, markdown, spletna stran) | Vse spletne aplikacije |
| `@churchapps/content-providers` | Abstrakcija nad zunanjimi ponudniki vsebin (Lessons.church, Planning Center, Dropbox in drugi) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Orodja za gradnjo integracij z B1.church: preverjanje webhookov, tipiziran REST odjemalec in pomožne funkcije OAuth | Zunanji razvijalci integracij |
| `@churchapps/texting` | Abstrakcija ponudnikov SMS-sporočil (Text In Church, Clearstream, Mutual Ministry, MinistryStuff, Nalo Solutions, Twilio) | Api |

Smer odvisnosti je strogo navzdol: aplikacije so odvisne od `apihelper` in `apphelper`, ki `@churchapps/helpers` navajata kot **peer dependency**, tako da vsaka aplikacija uporablja natanko eno kopijo.

## Nastavitev delovnega prostora

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Repozitorij uporablja Yarn Berry (merodajno je polje `packageManager` v korenu) z eno samo datoteko zaklepanja (lockfile). `yarn build` zgradi vse pakete v vrstnem redu odvisnosti; `yarn test` zažene teste vseh paketov.

## Objava z Changesets

Vsaka sprememba paketa se objavi s changesetom:

1. V korenu delovnega prostora zaženite `yarn changeset`. Izberite paket(e), ki ste jih spremenili, vrsto povečanja različice (patch = popravek, minor = nov izvoz ali funkcija, major = nezdružljiva sprememba) in napišite enovrstični povzetek -- ta postane vnos v CHANGELOG.
2. Ustvarjeno datoteko `.changeset/*.md` shranite (commit) skupaj s spremembo kode. Predhodna kavlja (pre-commit hook) blokira potrditve, ki spreminjajo izvorno kodo paketa brez prej pripravljene changeset datoteke.
3. Ko ste pripravljeni na objavo, v korenu zaženite `yarn publish-all`. Ta obdela čakajoče changesete (poveča različice, zapiše CHANGELOG-e, uskladi razpone notranjih odvisnosti), zgradi vse v vrstnem redu odvisnosti in objavi spremenjene pakete na npm. Nato shranite (commit) in potisnite (push) povečanja različic.

:::warning
Nikoli ne zaganjajte surovega `npm publish` znotraj posameznega paketa -- preskoči vrstni red gradnje in knjigovodstvo različic, ki ga upravlja skripta za objavo. Za objavo potrebujete račun na npm s pravicami objave v obsegu `@churchapps`.
:::

## Lokalni razvoj proti aplikaciji, ki uporablja paket

Znotraj delovnega prostora pakete gradimo neposredno proti njihovim sosednjim paketom -- povezovanje ni potrebno. Za preizkus neobjavljene gradnje paketa znotraj porabniške aplikacije (B1Admin, B1App itd.) v porabniku dodajte začasen Yarn portal:

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Najprej zgradite paket (`yarn build` v korenu delovnega prostora) -- porabniška aplikacija bere prevedeni izhod v `dist/`, ne izvorne kode.

:::warning
`yarn link` v `package.json` porabniške aplikacije zapiše razrešitev portala. Nikoli je ne shranjujte (commit) -- ko končate, vedno zaženite `yarn unlink` in ponovno namestite odvisnosti.
:::
