---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

Ang `@churchapps/apihelper` package ay nagbibigay ng mga server-side na utility para sa lahat ng ChurchApps Express.js API. Kasama dito ang base controller class, JWT authentication middleware, mga utility ng database, at mga integrasyon sa AWS na pinag-aaralan ng bawat proyekto ng API.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Mag-install ng **Node.js** at **Git** -- tingnan ang [Mga Pangangailangan](../setup/prerequisites)
- Pamilyarisahin ang sarili sa [daloy ng trabaho ng npm link](./index.md) para sa lokal na development
- Ang package na ito ay umaasa sa [`@churchapps/helpers`](./helpers)

</div>

## Mga Kasama

- **CustomBaseController** -- base class para sa mga API controller
- **Auth middleware** -- JWT authentication sa pamamagitan ng `CustomAuthProvider`
- **Mga utility ng database** -- `DB.query`, `EnhancedPoolHelper` para sa pamamahala ng koneksyon sa MySQL
- **Mga integrasyon sa AWS** -- mga helper para sa S3, SSM Parameter Store, at iba pang mga serbisyo ng AWS
- **Pag-setup ng Inversify DI** -- configuration ng dependency injection container

## Pag-setup para sa Lokal na Development

1. I-clone ang repository:

   ```bash
   git clone https://github.com/ChurchApps/ApiHelper.git
   ```

2. Mag-install ng mga dependency:

   ```bash
   cd ApiHelper && npm install
   ```

3. Buuin ang package (nag-co-compile ng TypeScript sa `dist/`):

   ```bash
   npm run build
   ```

4. Gawing magagamit para sa lokal na pag-link:

   ```bash
   npm link
   ```

## Mga Pangunahing Utos

| Utos | Paglalarawan |
|---------|-------------|
| `npm run build` | I-compile ang TypeScript sa `dist/` |
| `npm run lint` | Patakbuhin ang ESLint |
| `npm run lint:fix` | Patakbuhin ang ESLint na may auto-fix |
| `npm run format` | I-format ang code gamit ang Prettier |

:::info
Ang package na ito ay dependency ng bawat ChurchApps API. Kapag gumagawa ng mga pagbabago, gamitin ang `npm link` upang subukan laban sa isang API nang lokal bago mag-publish.
:::

## Mga Kaugnay na Artikulo

- **[Helpers](./helpers)** -- Ang base utility package na pinag-aaralan ng package na ito
- **[Istraktura ng Module](../api/module-structure)** -- Kung paano ginagamit ang mga controller at auth middleware sa mga API module
- **[Lokal na Pag-setup ng API](../api/local-setup)** -- Pag-setup ng API para sa lokal na development
