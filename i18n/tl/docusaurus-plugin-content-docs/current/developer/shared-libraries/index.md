---
title: "Mga Shared Library"
---

# Mga Shared Library

<div class="article-intro">

Ang shared code ng ChurchApps ay nilalathala sa npm sa ilalim ng scope na `@churchapps/*`. Nasa iisang repository ang lahat ng shared package — ang [Packages](https://github.com/ChurchApps/Packages) — na pinamamahalaan bilang Yarn (Berry) workspace at may bersyon sa pamamagitan ng [changesets](https://github.com/changesets/changesets).

</div>

## Mga Package

| Package | Paglalarawan | Ginagamit Ng | 
|---------|-------------|--------------|
| [`@churchapps/helpers`](./helpers) | Pundasyong layer: mga helper function na walang framework at ang mga shared TypeScript interface na bumubuo ng cross-app data contract | Lahat ng project |
| [`@churchapps/apihelper`](./api-helper) | Mga utility ng server-side Express: auth, base controller, database access, mga integrasyon ng AWS at email | Lahat ng API |
| [`@churchapps/apphelper`](./app-helper) | Mga shared React component at feature module (login, donasyon, form, markdown, website) | Lahat ng web app |
| `@churchapps/content-providers` | Abstraksyon sa mga third-party content provider (Lessons.church, Planning Center, Dropbox, at iba pa) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Toolkit para sa paggawa ng integrasyon ng B1.church: webhook verification, typed REST client, OAuth helper | Mga external na developer ng integrasyon |
| `@churchapps/texting` | Abstraksyon ng SMS provider (Text In Church, Clearstream, Mutual Ministry, MinistryStuff, Nalo Solutions, Twilio) | Api |

Mahigpit na pababa ang direksyon ng dependency: ang mga app ay nakadepende sa `apihelper` at `apphelper`, na nagdedeklara ng `@churchapps/helpers` bilang **peer dependency** para iisang kopya lamang nito ang nare-resolve ng bawat app.

## Pag-setup ng Workspace

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Gumagamit ang repo ng Yarn Berry (ang field na `packageManager` sa root ang may final na say) na may iisang lockfile. Binubuo ng `yarn build` ang bawat package ayon sa pagkakasunod-sunod ng dependency; pinapatakbo ng `yarn test` ang lahat ng test ng package.

## Paglalabas gamit ang Changesets

Bawat pagbabago sa isang package ay may kasamang changeset:

1. Patakbuhin ang `yarn changeset` sa root ng workspace. Piliin ang package(s) na ginalaw mo, ang uri ng bump (patch = ayos, minor = bagong export o feature, major = breaking), at magsulat ng isang linyang buod — ito ang magiging entry sa CHANGELOG.
2. I-commit ang nagawang `.changeset/*.md` na file kasama ng iyong pagbabago sa code. Hinaharangan ng pre-commit hook ang mga commit na nagbabago sa source ng isang package nang walang naka-stage na changeset.
3. Kapag handa nang i-publish, patakbuhin ang `yarn publish-all` sa root. Kinokonsumo nito ang mga nakabinbing changeset (ina-update ang mga bersyon, sinusulat ang mga CHANGELOG, sine-sync ang mga internal dependency range), binubuo ang lahat ayon sa dependency order, at ina-publish sa npm ang mga package na may bagong bersyon. Pagkatapos, i-commit at i-push ang mga version bump.

:::warning
Huwag kailanman magpatakbo ng raw na `npm publish` sa loob ng isang package — nilalaktawan nito ang build ordering at ang version bookkeeping na hinahawakan ng release script. Kailangan ng npm account na may publish rights sa scope na `@churchapps` para makapag-publish.
:::

## Lokal na Development Laban sa Consuming App

Sa loob ng workspace, direktang bumubuo ang mga package laban sa mga kapatid nito — walang kailangang linking. Para subukan ang isang hindi pa nai-publish na build ng package sa loob ng consuming app (B1Admin, B1App, atbp.), magdagdag ng pansamantalang Yarn portal sa consumer:

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

I-build muna ang package (`yarn build` sa root ng workspace) — binabasa ng consumer ang na-compile na `dist/` output, hindi ang source.

:::warning
Nagsusulat ang `yarn link` ng portal resolution sa `package.json` ng consumer. Huwag itong i-commit kailanman — palaging `yarn unlink` at mag-reinstall kapag tapos na.
:::
