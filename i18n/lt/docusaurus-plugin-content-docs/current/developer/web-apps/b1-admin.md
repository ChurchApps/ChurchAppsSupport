---
title: "B1 Admin"
description: "Vietinė B1 Admin sąranka: klonuokite React/Vite valdymo skydelį, nustatykite API adresus .env faile ir paleiskite kūrimo serverį."
---

# B1 Admin

<div class="article-intro">

B1Admin yra bažnyčios administravimo valdymo skydelis – React vienpuslapio programa, sukurta naudojant Vite ir Material-UI. Bažnyčios darbuotojai jį naudoja žmonėms, grupėms, lankomumui, aukoms, turiniui ir kitam valdyti.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Įdiekite **Node.js 22+** ir **Git** – žr. [Reikalavimai](../setup/prerequisites.md)
- Nustatykite API tikslą (demonstracinį arba vietinį) – žr. [Aplinkos kintamieji](../setup/environment-variables.md)

</div>

## Sąranka

### 1. Klonuokite saugyklą

```bash
git clone https://github.com/ChurchApps/B1Admin.git
```

### 2. Įdiekite priklausomybes

```bash
cd B1Admin
npm install
```

### 3. Nustatykite aplinkos kintamuosius

```bash
cp dotenv.sample.txt .env
```

Atidarykite `.env` ir nustatykite API galinius taškus. Galite nukreipti juos į bendrą demonstracinį API (`https://api.demo.churchapps.org`) arba į savo vietinį API egzemplorių. Pavyzdinis failas vis dar gali nurodyti išjungtus bandymo URL adresus; pakeiskite juos.

### 4. Paleiskite kūrimo serverį

```bash
npm start
```

Tai paleidžia Vite kūrimo serverį. Programa bus pasiekiama naršyklėje, įjungtas karšto modulių keitimas (hot module replacement).

## Pagrindiniai aplinkos kintamieji

| Kintamasis | Aprašymas |
|----------|-------------|
| `REACT_APP_STAGE` | Aplinkos pavadinimas (pvz., `demo`, kaip pavyzdiniame faile, `prod` arba `selfhost`) |
| `PORT` | Kūrimo serverio prievadas (numatytasis: `3101`) |
| `REACT_APP_*_API` | Kiekvieno modulio API galinių taškų URL adresai |

:::info
`postinstall` skriptas nukopijuoja lokalizacijos ir CSS failus iš `@churchapps/apphelper`. Jei komponentai atrodo be stiliaus, paleiskite `npm run postinstall` rankiniu būdu.
:::

## Pagrindinės komandos

| Komanda | Aprašymas |
|---------|-------------|
| `npm start` | Paleisti Vite kūrimo serverį |
| `npm run build` | Gamybinė versija per Vite |
| `npm run test` | Paleisti galinio taško (end-to-end) testus su Playwright |
| `npm run lint` | Paleisti ESLint su automatiniu taisymu |

## Technologijų rinkinys

- **React 19** su TypeScript
- **Vite** kūrimo įrankiams ir kūrimo serveriui
- **Material-UI 7** vartotojo sąsajos komponentams
- **React Query 5** serverio būsenai valdyti
- **`@churchapps/apphelper*`** paketai bendriems komponentams

## Diegimas

Gamybinės versijos diegiamos į **S3 + CloudFront**:

1. `npm run build` sukuria statinius failus
2. Failai sinchronizuojami su S3 saugykla
3. Paleidžiamas CloudFront talpyklos išvalymas, kad būtų pateikta nauja versija

:::tip
Išsamias diegimo instrukcijas rasite vadove [Interneto programų diegimas](../deployment/web-apps.md).
:::
