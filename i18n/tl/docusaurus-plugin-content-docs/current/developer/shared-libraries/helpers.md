---
title: "Helpers"
---

# Helpers

<div class="article-intro">

Ang `@churchapps/helpers` package ay nagbibigay ng mga base utility na ginagamit ng lahat ng proyekto ng ChurchApps, parehong frontend at backend. Ito ay framework-agnostic at kasama ang mga karaniwang helper tulad ng `DateHelper`, `ApiHelper`, `CurrencyHelper`, at iba pang mga shared utility.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Mag-install ng **Node.js** at **Git** -- tingnan ang [Mga Pangangailangan](../setup/prerequisites)
- Pamilyarisahin ang sarili sa [daloy ng trabaho ng npm link](./index.md) para sa lokal na development

</div>

## Pag-setup para sa Lokal na Development

1. I-clone ang repository:

   ```bash
   git clone https://github.com/ChurchApps/Helpers.git
   ```

2. Mag-install ng mga dependency:

   ```bash
   cd Helpers && npm install
   ```

3. Buuin ang package (nag-co-compile ng TypeScript sa `dist/`):

   ```bash
   npm run build
   ```

4. Gawing magagamit para sa lokal na pag-link:

   ```bash
   npm link
   ```

Maaari mo itong i-link sa anumang gumagamit na proyekto:

```bash
cd ../YourProject && npm link @churchapps/helpers
```

## Pag-publish

Upang mag-publish ng bagong bersyon sa npm:

1. I-update ang bersyon sa `package.json`
2. Mag-publish:

   ```bash
   npm publish --access=public
   ```

:::warning
Dahil ang package na ito ay ginagamit ng bawat proyekto ng ChurchApps, ang mga pagbabago dito ay may malawak na epekto. Subukang mabuti gamit ang `npm link` sa kahit isang gumagamit na API at isang gumagamit na web app bago mag-publish.
:::

## Mga Kaugnay na Artikulo

- **[ApiHelper](./api-helper)** -- Mga server-side utility na umaasa sa package na ito
- **[AppHelper](./app-helper)** -- Mga React component na umaasa sa package na ito
- **[Pangkalahatang-tanaw ng Mga Shared Library](./index.md)** -- Daloy ng trabaho ng `npm link` at pangkalahatang-tanaw ng package
