---
title: "B1App"
description: "Vietinė B1App narių žiniatinklio programos sąranka su Next.js 22+, API galinių taškų nustatymas .env faile ir kūrimo serverio paleidimas prievade 3301."
---

# B1App

<div class="article-intro">

B1App yra viešoji bažnyčios narių programa, sukurta naudojant Next.js. Ji suteikia narių patirtį, įskaitant profilius, grupių katalogus, tiesioginę transliaciją ir aukojimo puslapius.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Įdiekite **Node.js 22+** ir **Git** -- žr. [Reikalavimai](../setup/prerequisites.md)
- Sukonfigūruokite API tikslą (demonstracinį arba lokalų) -- žr. [Aplinkos kintamieji](../setup/environment-variables.md)

</div>

:::warning
B1App reikalauja Node.js 22 ar naujesnės versijos. Ankstesnės versijos nepalaikomos.
:::

## Sąranka

### 1. Klonuokite saugyklą

```bash
git clone https://github.com/ChurchApps/B1App.git
```

### 2. Įdiekite priklausomybes

```bash
cd B1App
npm install
```

### 3. Sukonfigūruokite aplinkos kintamuosius

```bash
cp dotenv.sample.txt .env
```

Atidarykite `.env` ir sukonfigūruokite `NEXT_PUBLIC_*_API` galinių taškų URL. Jie gali nurodyti į bendrą demonstracinį API (`https://api.demo.churchapps.org`) arba į jūsų lokalų API egzempliorių. Pavyzdinis failas vis dar gali nurodyti pasenusius testavimo URL; pakeiskite juos.

### 4. Paleiskite kūrimo serverį

```bash
npm run dev
```

Next.js kūrimo serveris paleidžiamas adresu [http://localhost:3301](http://localhost:3301).

## Pagrindinės komandos

| Komanda | Aprašymas |
|---------|-----------|
| `npm run dev` | Paleisti Next.js kūrimo serverį 3301 prievade |
| `npm run build` | Produkcinis kūrimas per Next.js |
| `npm run test` | Vykdyti galas-iki-galo (end-to-end) testus su Playwright |
| `npm run lint` | Vykdyti Next.js lint tikrinimą |

## Pagrindiniai aplinkos kintamieji

| Kintamasis | Aprašymas |
|----------|-----------|
| `NEXT_PUBLIC_*_API` | Kiekvieno modulio API galinių taškų URL |

:::info
`postinstall` skriptas nukopijuoja lokalės ir CSS failus iš `@churchapps/apphelper`. Jei po diegimo komponentai atrodo be stilių, paleiskite `npm run postinstall` rankiniu būdu.
:::

## Technologijų rinkinys

- **Next.js 16** su TypeScript
- **React 19** vartotojo sąsajos komponentams
- **Material-UI 7** dizaino sistemai
- **React Query 5** serverio būsenai
- **`@churchapps/apphelper*`** paketai bendriems komponentams

## Diegimas

Produkciniai kūriniai diegiami į **S3 + CloudFront**:

1. `npm run build` sugeneruoja optimizuotą Next.js kūrinį
2. Kūrinio išvestis sinchronizuojama su S3 bucket
3. Paleidžiamas CloudFront invalidavimas, kad būtų pateikta nauja versija

:::tip
Išsamias diegimo instrukcijas rasite vadove [Web App diegimas](../deployment/web-apps.md).
:::
