---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

Iphakheji `@churchapps/apihelper` ihlinzeka ngetisebenti tase-server kuwo onkhe ema-Express.js API e-ChurchApps. Ihlanganisa i-base controller class, kutivela nge-JWT, tisebenti te-database, kanye nekuhlanganiswa ne-AWS lokusetjentiswa yiwo onkhe emaphrojekthi e-API.

</div>

<div class="prereqs">
<h4>Ngembi Kwekucala</h4>

- Faka **Node.js** ne-**Git** -- bona [Tidzingo Tekucala](../setup/prerequisites)
- Tijwayeze [Kulungiselela kwe-Packages workspace](./index.md) kanye netindlela tekushicilela
- Lephakheji itsembela ku-[`@churchapps/helpers`](./helpers) (njenge-peer dependency) futsi iyayikhipha kabusha

</div>

## Loku Lokufakiwe

- **CustomBaseController** -- i-base class yema-controller e-API, lakhiwe phezu kwe-`inversify-express-utils`
- **Kutivela** -- kutivela nge-JWT ngendlela ye-`CustomAuthProvider`, `AuthenticatedUser`, kanye ne-`Principal`
- **Tisebenti te-database** -- `DB.query` / `DB.queryOne` kanye ne-class ye-`Pool` yekulawula kuhlanganiswa kwe-MySQL, kanjalo ne-`MySqlHelper` ne-`DBCreator` yekulungiselela sakhiwo se-database
- **Kuhlanganiswa ne-AWS** -- `AwsHelper` yekugcina emafayela ku-S3 kanye nekufundza kuSSM Parameter Store
- **Imeyili** -- `EmailHelper` lesekela kutfunyelwa nge-SES nge-SMTP
- **Kulayisha kulungiselelwa** -- `EnvironmentBase` ifundza tintsambo tekuhlangana netimfihlo kusuka kuma-environment variable nome ku-Parameter Store
- **Kunye nalokunye** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## Kulungiselela Indzawo Yekusebenta

Lephakheji ihlala ku-workspace ye-[Packages](https://github.com/ChurchApps/Packages) kanye naletinye tincwadzi letabelwanako:

1. Khoba i-workspace:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Faka tintfo letidzingekako ekucaleni kwe-workspace:

   ```bash
   cd Packages && yarn install
   ```

3. Yakha (kuguqula i-TypeScript ibe yi-`dist/`):

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

   Nome sebentisa `yarn build` ekucaleni kute wakhe wonkhe phakheji ngendlela yekutsembelana.

Kuhlola tishintjo ngekhatsi kwe-API leyitsembelako, sebentisa i-Yarn portal yesikhashana -- bona [Kulungiselela Endzaweni Yakho Uchamana Ne-App Leyitsembelako](./index.md#local-development-against-a-consuming-app).

## Kushicilela

Kukhishwa kuhamba ngendlela ye-changesets: sebentisa `yarn changeset` ekucaleni kwe-workspace nganoma nguluphi lushintjo, bese usebentisa `yarn publish-all` nawusulungele kukhipha. Bona [Sifingqo Setincwadzi Letabelwanako](./index.md#releasing-with-changesets) yendlela lephelele.

:::info
Lephakheji ingulokutsembelako kuwo onkhe ema-API e-ChurchApps -- i-core Api, AskApi, kanye ne-LessonsApi. Nawenta tishintjo, tihlole ku-API endzaweni yakho ngembi kwekushicilela.
:::

## Tincwadzi Letihambelanako

- **[Helpers](./helpers)** -- Iphakheji yesisekelo yetisebenti letincwadzi itsembela kuyo
- **[Sakhiwo se-Module](../api/module-structure)** -- Indlela ema-controller kanye ne-auth middleware asetjentiswa ngayo kuma-module e-API
- **[Kulungiselela kwe-API Yendzawo](../api/local-setup)** -- Kulungiselela i-API yekusebenta endzaweni yakho
