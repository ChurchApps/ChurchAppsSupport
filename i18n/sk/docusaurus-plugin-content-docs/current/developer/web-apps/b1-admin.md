---
title: "B1 Admin"
---

# B1 Admin

<div class="article-intro">

B1Admin je administračný panel pre správu cirkvi – jednostránková aplikácia (SPA) postavená na Reacte s použitím Vite a Material-UI. Pracovníci cirkvi ho používajú na správu ľudí, skupín, dochádzky, darov, obsahu a ďalšieho.

</div>

<div class="prereqs">
<h4>Pred začatím</h4>

- Nainštalujte **Node.js 22+** a **Git** – pozri [Požiadavky](../setup/prerequisites)
- Nakonfigurujte cieľ API (demo alebo lokálny) – pozri [Premenné prostredia](../setup/environment-variables)

</div>

## Inštalácia

### 1. Naklonujte repozitár

```bash
git clone https://github.com/ChurchApps/B1Admin.git
```

### 2. Nainštalujte závislosti

```bash
cd B1Admin
npm install
```

### 3. Nakonfigurujte premenné prostredia

```bash
cp dotenv.sample.txt .env
```

Otvorte `.env` a nakonfigurujte koncové body API. Môžete ich nasmerovať buď na zdieľané demo API (`https://api.demo.churchapps.org`), alebo na vašu lokálnu inštanciu API. Ukážkový súbor môže stále obsahovať zastarané URL adresy testovacieho prostredia; nahraďte ich.

### 4. Spustite vývojový server

```bash
npm start
```

Spustí sa vývojový server Vite. Aplikácia bude dostupná vo vašom prehliadači so zapnutou funkciou Hot Module Replacement.

## Kľúčové premenné prostredia

| Premenná | Popis |
|----------|-------|
| `REACT_APP_STAGE` | Názov prostredia (napr. `demo` ako v ukážkovom súbore, `prod` alebo `selfhost`) |
| `PORT` | Port vývojového servera (predvolene: `3101`) |
| `REACT_APP_*_API` | URL adresy koncových bodov API pre každý modul |

:::info
Skript `postinstall` kopíruje jazykové súbory a súbory CSS z `@churchapps/apphelper`. Ak komponenty vyzerajú bez štýlov, spustite `npm run postinstall` manuálne.
:::

## Kľúčové príkazy

| Príkaz | Popis |
|--------|-------|
| `npm start` | Spustí vývojový server Vite |
| `npm run build` | Produkčný build pomocou Vite |
| `npm run test` | Spustí end-to-end testy pomocou Playwright |
| `npm run lint` | Spustí ESLint s automatickou opravou |

## Technológie

- **React 19** s TypeScriptom
- **Vite** pre nástroje na zostavovanie a vývojový server
- **Material-UI 7** pre komponenty UI
- **React Query 5** pre stav servera
- balíčky **`@churchapps/apphelper*`** pre zdieľané komponenty

## Nasadenie

Produkčné buildy sa nasadzujú do **S3 + CloudFront**:

1. `npm run build` vygeneruje statické assety
2. Assety sa synchronizujú do bucketu S3
3. Spustí sa invalidácia CloudFront, aby sa doručila nová verzia

:::tip
Podrobné pokyny na nasadenie nájdete v príručke [Nasadenie webovej aplikácie](../deployment/web-apps).
:::
