---
title: "Helpers"
---

# Helpers

<div class="article-intro">

Liphakheji le-`@churchapps/helpers` linikeza tisetjentiswa tesisekelo letisetjentiswa yato tonkhe tiphrojekthi ta-ChurchApps, kokubili ngasembili nangasemuva. Alibotjelelwe kuluhlaka lolutsite futsi licuketse tisetjentiswa letivamile njenge-`DateHelper`, `ApiHelper`, `CurrencyHelper`, ndzawonye netincumo te-TypeScript letihlanganyelwe letakha sivumelwano sedatha emkhatsini wetinhlelo kanye ne-API.

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekucala</h4>

- Faka i-**Node.js** kanye ne-**Git** -- bona [Tidzingo Letandzulelo](../setup/prerequisites)
- Tijwayeze ne-[indzawo yekusebenta ye-Packages](./index.md) kanye nendlela yekukhishwa

</div>

## Ngubani Losebentisa Leli

Onkhe ema-API a-ChurchApps (i-Api yesisekelo, i-AskApi, kanye ne-LessonsApi) kanye nato tonkhe tinhlelo tangasembili (B1Admin, B1App, B1Transfer, LessonsApp) tincika kuleliphakheji ngalokucondzile. Tinhlelo tangasembili nato titfola letinyenti taloko lokukhishwako (`ApiHelper`, `DateHelper`, `UserHelper`, kanye netinye tincumo) letikhishwa kabusha nge-[`@churchapps/apphelper`](./app-helper). Lamanye emaphakheji lahlanganyelwe achaza leli njengentfo lencikako yakhe ye-peer, kuze uhlelo ngalunye lususe likhophi linye kuphela.

## Kuhlela Kwekutfuthukisa Kwasekhaya

Leliphakheji lihlala endzaweni yekusebenta ye-[Packages](https://github.com/ChurchApps/Packages) kanye netinye tincwadzi letihlanganyelwe:

1. Khuphela indzawo yekusebenta:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Faka tintfo letincikako emsukeni wendzawo yekusebenta:

   ```bash
   cd Packages && yarn install
   ```

3. Yakha (yakhela i-TypeScript ku-`dist/`):

   ```bash
   yarn workspace @churchapps/helpers build
   ```

   Nome ugijimise `yarn build` emsukeni kuze wakhe onkhe emaphakheji ngendlela lelandzelana ngayo kuncika.

Kuze uhlole tishintjo ngekhatsi kwephrojekthi leludzingako, sebentisa i-Yarn portal yesikhashana -- bona [Kutfuthukisa Kwasekhaya Kumelene Nehlelo Loludzingako](./index.md#local-development-against-a-consuming-app).

## Kukhishwa

Kukhishwa kuhamba ngema-changeset kunekutfutfukiswa kwenombolo yeveshini ngesandla:

1. Gijimisa `yarn changeset` emsukeni wendzawo yekusebenta bese ukhetsa `@churchapps/helpers` nalohlobo lekutfutfukiswa lelifanele; faka lifayela le-changeset lelentiwe ndzawonye nalushintjo lwakho.
2. Nasekulungele kukhishwa, gijimisa `yarn publish-all` emsukeni -- itfutfukisa emaveshini, ibhale ema-CHANGELOG, yakhe ngendlela lelandzelana ngayo kuncika, bese ishicilela ku-npm.

Tincumo letisha letihlanganyelwe tifakwa ku-`helpers/src/interfaces/` bese tikhishwa kabusha ngendlela ye-barrel yeliphakheji. Luhlu lwemtfombo wewebhusayithi lolwakhako lwemtfombo (`ElementTypes.ts` -- tinhlobo letingu-35 ndzawonye netincumo tato te-answers schema) nalo luhlala lapha; ngiso sivumelwano lesabelwana ngaso ema-renderer e-apphelper, emafomu emhleli we-B1Admin, kanye netincitakalo te-AI tekukhicita (bona [Luhlaka Lwesakhi Sewebhusayithi](../architecture/website-builder)).

:::warning
Njengobe leliphakheji lisetjentiswa yiyo yonkhe iphrojekthi ya-ChurchApps, tishintjo lapha tinemtselela lomkhulu. Kukhishwa kwe-`helpers` kutfutfukisa ngekwato-ke i-`apihelper` ne-`apphelper` kuze tibanga letincikako tato tihlale tisesikhatsini. Hlola nge-Yarn portal kulokungenani i-API linye leludzingako kanye nohlelo lunye lwangasembili loludzingako ngaphambi kwekushicilela.
:::

## Bomake Lohlobene

- **[ApiHelper](./api-helper)** -- Tisetjentiswa tehlangotsi lweseva letincika kuleliphakheji
- **[AppHelper](./app-helper)** -- Tincumo te-React letincika kuleliphakheji
- **[Sibonakaliso Sesikhashana Setincwadzi Letihlanganyelwe](./index.md)** -- Kuhlela kwendzawo yekusebenta, indlela yekukhishwa, kanye nendlela yekuhlanganiswa kwasekhaya
