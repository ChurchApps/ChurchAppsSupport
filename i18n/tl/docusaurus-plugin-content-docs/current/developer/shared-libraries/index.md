---
title: "Shared Libraries"
---

# Shared Libraries

<div class="article-intro">

Ang ChurchApps shared code ay nai-publish sa npm sa ilalim ng `@churchapps/*` scope. Lahat ng shared packages ay nakatira sa isang repository -- [Packages](https://github.com/ChurchApps/Packages) -- pinamamahalaan bilang Yarn (Berry) workspace at versioned gamit ang [changesets](https://github.com/changesets/changesets).

</div>

## Packages

| Package | Description | Used By |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Foundation layer: framework-free helper functions at ang shared TypeScript interfaces na bumubuo ng cross-app data contract | Lahat ng projects |
| [`@churchapps/apihelper`](./api-helper) | Server-side Express utilities: auth, base controllers, database access, AWS at email integrations | Lahat ng APIs |
| [`@churchapps/apphelper`](./app-helper) | Shared React components at feature modules (login, donations, forms, markdown, website) | Lahat ng web apps |
| `@churchapps/content-providers` | Abstraction sa third-party content providers (Lessons.church, Planning Center, Dropbox, at iba pa) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Toolkit para sa pagbuo ng B1.church integrations: webhook verification, typed REST client, OAuth helpers | External integration developers |
| `@churchapps/texting` | SMS provider abstraction (Text In Church, Clearstream, Mutual Ministry) | Api |

Ang dependency direction ay mahigpit na pababa: ang apps ay nakadepende sa `apihelper` at `apphelper`, na nag-declare ng `@churchapps/helpers` bilang **peer dependency** kaya bawat app ay nag-resolve ng eksaktong isang copy nito.

## Workspace Setup

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Ang repo ay gumagamit ng Yarn Berry (ang root `packageManager` field ay authoritative) na may isang lockfile. Ang `yarn build` ay bumubuo ng bawat package sa dependency order; `yarn test` ay tumatakbo sa lahat ng package tests.

## Releasing gamit ang Changesets

Bawat change sa isang package ay nagdadala ng isang changeset:

1. Patakbuhin ang `yarn changeset` sa workspace root. Pumili ng package(s) na tinouchahan mo, ang bump type (patch = fix, minor = new export o feature, major = breaking), at sumulat ng one-line summary -- ito ay nagiging CHANGELOG entry.
2. I-commit ang generated `.changeset/*.md` file kasama ang iyong code change. Isang pre-commit hook ay humihigil sa commits na nagbabago ng source ng package nang walang staged changeset.
3. Kapag handa na mag-publish, patakbuhin ang `yarn publish-all` sa root. Ito ay gumagamit ng pending changesets (bumubuo ng versions, nagsusulat ng CHANGELOGs, nag-sync ng internal dependency ranges), bumubuo ng lahat sa dependency order, at nag-publish ng bumped packages sa npm. Pagkatapos ay i-commit at i-push ang version bumps.

:::warning
Huwag kailanman patakbuhin ang raw `npm publish` sa loob ng isang single package -- ito ay nag-skip ng build ordering at ang version bookkeeping na hinahawakan ng release script. Ang publishing ay nangangailangan ng npm account na may publish rights sa `@churchapps` scope.
:::

## Local Development Laban sa Consuming App

Sa loob ng workspace, ang packages ay bumubuo direkta laban sa siblings nila -- walang linking na kailangan. Upang subukan ang isang unpublished package build sa loob ng isang consuming app (B1Admin, B1App, atbp.), magdagdag ng isang temporary Yarn portal sa consumer:

```bash
# sa consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

I-build ang package muna (`yarn build` sa workspace root) -- ang consumer ay bumabasa sa compiled `dist/` output, hindi ang source.

:::warning
Ang `yarn link` ay nagsusulat ng portal resolution sa consumer's `package.json`. Hindi ito kailanman i-commit -- laging `yarn unlink` at muling i-install kapag tapos na.
:::
