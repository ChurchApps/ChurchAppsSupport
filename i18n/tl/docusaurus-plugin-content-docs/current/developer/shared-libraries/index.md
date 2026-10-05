---
title: "Mga Shared Library"
---

# Mga Shared Library

<div class="article-intro">

Ang shared code ng ChurchApps ay inilalathala sa npm sa ilalim ng `@churchapps/*` scope. Ang lahat ng shared package ay nasa iisang repository -- [Packages](https://github.com/ChurchApps/Packages) -- na pinamamahalaan bilang Yarn (Berry) workspace at binibigyan ng bersyon gamit ang [changesets](https://github.com/changesets/changesets).

</div>

## Mga Package

| Package | Paglalarawan | Ginagamit ng |
|---------|--------------|--------------|
| [`@churchapps/helpers`](./helpers) | Pundasyong layer: mga helper function na walang framework at ang mga shared TypeScript interface na bumubuo sa cross-app na data contract | Lahat ng proyekto |
| [`@churchapps/apihelper`](./api-helper) | Mga server-side Express utility: auth, base controller, database access, mga integration sa AWS at email | Lahat ng API |
| [`@churchapps/apphelper`](./app-helper) | Mga shared na React component at feature module (login, donasyon, form, markdown, website) | Lahat ng web app |
| `@churchapps/content-providers` | Abstraction sa mga third-party content provider (Lessons.church, Planning Center, Dropbox, at iba pa) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Toolkit para sa paggawa ng mga B1.church integration: webhook verification, typed REST client, OAuth helper | Mga external integration developer |
| `@churchapps/texting` | Abstraction ng SMS provider (Text In Church, Clearstream, Mutual Ministry, MinistryStuff, Nalo Solutions) | Api |

Mahigpit na pababa ang direksyon ng dependency: ang mga app ay umaasa sa `apihelper` at `apphelper`, na nagdedeklara ng `@churchapps/helpers` bilang **peer dependency** para ang bawat app ay magresolba ng eksaktong isang kopya nito.

## Pag-setup ng Workspace

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Gumagamit ang repo ng Yarn Berry (ang root `packageManager` field ang masusunod) na may iisang lockfile. Ang `yarn build` ay nagbi-build ng bawat package ayon sa pagkakasunod ng dependency; ang `yarn test` ay nagpapatakbo ng lahat ng test ng package.

## Pagre-release gamit ang Changesets

Bawat pagbabago sa isang package ay may kasamang changeset:

1. Patakbuhin ang `yarn changeset` sa workspace root. Piliin ang (mga) package na ginalaw mo, ang uri ng bump (patch = ayos, minor = bagong export o feature, major = breaking), at sumulat ng isang-linyang buod -- ito ang magiging entry sa CHANGELOG.
2. I-commit ang nabuong `.changeset/*.md` file kasama ng pagbabago mo sa code. Hinaharang ng pre-commit hook ang mga commit na nagbabago ng source ng package nang walang naka-stage na changeset.
3. Kapag handa nang maglathala, patakbuhin ang `yarn publish-all` sa root. Kinokonsumo nito ang mga nakabinbing changeset (nagba-bump ng bersyon, nagsusulat ng CHANGELOG, nagsi-sync ng mga internal dependency range), bina-build ang lahat ayon sa pagkakasunod ng dependency, at inilalathala ang mga na-bump na package sa npm. Pagkatapos ay i-commit at i-push ang mga version bump.

:::warning
Huwag kailanman magpatakbo ng hilaw na `npm publish` sa loob ng isang package -- nilalaktawan nito ang pagkakasunod ng build at ang bookkeeping ng bersyon na inaasikaso ng release script. Ang paglalathala ay nangangailangan ng npm account na may karapatang maglathala sa `@churchapps` scope.
:::

## Lokal na Development Laban sa Isang Consuming App

Sa loob ng workspace, direktang nagbi-build ang mga package laban sa kanilang mga kapatid -- hindi na kailangan ng linking. Para subukan ang hindi pa nailalathalang build ng package sa loob ng isang consuming app (B1Admin, B1App, atbp.), magdagdag ng pansamantalang Yarn portal sa consumer:

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

I-build muna ang package (`yarn build` sa workspace root) -- binabasa ng consumer ang naka-compile na `dist/` output, hindi ang source.

:::warning
Ang `yarn link` ay nagsusulat ng portal resolution sa `package.json` ng consumer. Huwag itong i-commit -- laging mag-`yarn unlink` at mag-install muli kapag tapos na.
:::
