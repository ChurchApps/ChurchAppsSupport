---
title: "Helpers"
---

# Helpers

<div class="article-intro">

Ang `@churchapps/helpers` package ay nagbibigay ng base utilities na ginagamit ng lahat ng ChurchApps projects, parehong frontend at backend. Ito ay framework-agnostic at may kasamang common helpers tulad ng `DateHelper`, `ApiHelper`, `CurrencyHelper`, kasama ang shared TypeScript interfaces na bumubuo ng data contract sa pagitan ng apps at APIs.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-install ang **Node.js** at **Git** -- tingnan ang [Prerequisites](../setup/prerequisites)
- Pamilyarin mo ang sarili mo sa [Packages workspace](./index.md) setup at release flow

</div>

## Sino ang Gumagamit Nito

Bawat ChurchApps API (ang core Api, AskApi, at LessonsApi) at bawat web frontend (B1Admin, B1App, B1Transfer, LessonsApp) ay direktang nakadepende sa package na ito. Ang mga frontends ay nakakakuha rin ng marami sa exports nito (`ApiHelper`, `DateHelper`, `UserHelper`, at iba pang interfaces) na muling nai-export sa pamamagitan ng [`@churchapps/apphelper`](./app-helper). Ang iba pang shared packages ay nag-declare nito bilang peer dependency kaya bawat app ay nag-resolve ng eksaktong isang copy.

## Setup para sa Local Development

Ang package na ito ay nakatira sa [Packages](https://github.com/ChurchApps/Packages) workspace kasama ang iba pang shared libraries:

1. I-clone ang workspace:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. I-install ang dependencies sa workspace root:

   ```bash
   cd Packages && yarn install
   ```

3. I-build (nag-compile ng TypeScript sa `dist/`):

   ```bash
   yarn workspace @churchapps/helpers build
   ```

   O patakbuhin ang `yarn build` sa root upang i-build ang bawat package sa dependency order.

Upang subukan ang changes sa loob ng isang consuming project, gamitin ang isang temporary Yarn portal -- tingnan ang [Local Development Against a Consuming App](./index.md#local-development-against-a-consuming-app).

## Publishing

Ang mga releases ay napupunta sa pamamagitan ng changesets sa halip na manual version bumps:

1. Patakbuhin ang `yarn changeset` sa workspace root at pumili ng `@churchapps/helpers` na may angkop na bump type; i-commit ang generated changeset file kasama ang iyong change.
2. Kapag handa na mag-release, patakbuhin ang `yarn publish-all` sa root -- ito ay bumubuo ng versions, nag-write ng CHANGELOGs, bumubuo sa dependency order, at nag-publish sa npm.

Ang bagong shared interfaces ay napupunta sa `helpers/src/interfaces/` at muling nai-export sa pamamagitan ng package barrel. Ang element-type catalog ng website builder (`ElementTypes.ts` — 35 types na may answers schemas) ay nakatira rin dito; ito ay ang contract na shared ng apphelper renderers, ang B1Admin editor forms, at ang AI generation prompts (tingnan ang [Website Builder Architecture](../architecture/website-builder)).

:::warning
Dahil ang package na ito ay ginagamit ng bawat ChurchApps project, ang mga changes dito ay may malawak na impact. Isang release ng `helpers` ay automatically na bumubuo ng `apihelper` at `apphelper` upang ang dependency ranges nila ay manatiling current. Subukan gamit ang Yarn portal sa hindi bababa sa isang consuming API at isang consuming web app bago mag-publish.
:::

## Related Articles

- **[ApiHelper](./api-helper)** -- Server-side utilities na nakadepende sa package na ito
- **[AppHelper](./app-helper)** -- React components na nakadepende sa package na ito
- **[Shared Libraries Overview](./index.md)** -- Workspace setup, release flow, at local-link workflow
