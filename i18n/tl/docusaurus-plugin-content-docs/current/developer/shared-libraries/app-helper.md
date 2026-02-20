---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

Ang mga `@churchapps/apphelper*` package ay nagbibigay ng mga shared React component at utility para sa lahat ng ChurchApps web application. Ang AppHelper ay nakabalangkas bilang isang monorepo workspace na naglalaman ng anim na package na sumasaklaw sa mga core component, authentication, donasyon, form, markdown, at website/CMS functionality.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Mag-install ng **Node.js** at **Git** -- tingnan ang [Mga Pangangailangan](../setup/prerequisites)
- Pamilyarisahin ang sarili sa [daloy ng trabaho ng npm link](./index.md) para sa lokal na development

</div>

## Mga Package

| Package | Paglalarawan |
|---------|-------------|
| `@churchapps/apphelper` | Mga core component at utility |
| `@churchapps/apphelper-login` | UI ng pag-login at pagpaparehistro |
| `@churchapps/apphelper-donations` | Mga component ng pagbibigay at donasyon |
| `@churchapps/apphelper-forms` | Mga component ng form builder |
| `@churchapps/apphelper-markdown` | Markdown editor at renderer |
| `@churchapps/apphelper-website` | Mga component ng website at CMS |

## Pag-setup para sa Lokal na Development

1. I-clone ang repository:

   ```bash
   git clone https://github.com/ChurchApps/AppHelper.git
   ```

2. Mag-install ng mga dependency:

   ```bash
   cd AppHelper && npm install
   ```

3. Buuin ang lahat ng package at ilunsad ang Vite playground:

   ```bash
   npm run playground:reload
   ```

   Binubuo nito ang bawat package sa workspace, pagkatapos ay sinisimulan ang playground dev server sa **http://localhost:3001**.

:::tip
Ang playground ang pinakamabilis na paraan upang mag-develop at mag-test ng mga AppHelper component. Nag-ho-hot-reload ito ng Vite dev server upang makita mo ang mga pagbabago nang real time.
:::

## Pag-publish

Mag-publish ng isang package:

```bash
npm run publish:apphelper
```

Mag-publish ng lahat ng package:

```bash
npm run publish:all
```

:::warning
Kapag nagpu-publish, siguraduhing i-update ang numero ng bersyon sa kaugnay na (mga) `package.json` file bago patakbuhin ang publish command. Lahat ng package na umaasa sa isang binagong package ay kailangan ding i-update.
:::

## Mga Kaugnay na Artikulo

- **[Helpers](./helpers)** -- Ang base utility package na ginagamit kasabay ng AppHelper
- **[Mga Web App](../web-apps/)** -- Ang mga web application na gumagamit ng mga package na ito
- **[Pangkalahatang-tanaw ng Mga Shared Library](./index.md)** -- Daloy ng trabaho ng `npm link` at pangkalahatang-tanaw ng package
