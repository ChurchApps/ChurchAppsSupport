---
title: "B1App"
description: "Lokálne nastavenie webovej aplikácie pre členov B1App s Next.js 22+, konfigurácia API endpointov v .env a spustenie vývojového servera na porte 3301."
---

# B1App

<div class="article-intro">

B1App je verejne prístupná aplikácia pre členov cirkvi, postavená na Next.js. Poskytuje členom prístup k profilom, adresárom skupín, živému streamingu a stránkam na darovanie.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Nainštalujte **Node.js 22+** a **Git** -- pozri [Požiadavky](../setup/prerequisites.md)
- Nakonfigurujte cieľ API (demo alebo lokálny) -- pozri [Premenné prostredia](../setup/environment-variables.md)

</div>

:::warning
B1App vyžaduje Node.js 22 alebo novší. Staršie verzie nie sú podporované.
:::

## Nastavenie

### 1. Naklonujte repozitár

```bash
git clone https://github.com/ChurchApps/B1App.git
```

### 2. Nainštalujte závislosti

```bash
cd B1App
npm install
```

### 3. Nakonfigurujte premenné prostredia

```bash
cp dotenv.sample.txt .env
```

Otvorte `.env` a nakonfigurujte koncové body URL `NEXT_PUBLIC_*_API`. Tie môžu smerovať na zdieľané demo API (`https://api.demo.churchapps.org`) alebo na vašu lokálnu inštanciu API. Ukážkový súbor môže stále obsahovať zrušené URL adresy testovacieho prostredia; nahraďte ich.

### 4. Spustite vývojový server

```bash
npm run dev
```

Vývojový server Next.js sa spustí na adrese [http://localhost:3301](http://localhost:3301).

## Kľúčové príkazy

| Príkaz | Popis |
|---------|-------------|
| `npm run dev` | Spustí vývojový server Next.js na porte 3301 |
| `npm run build` | Produkčný build cez Next.js |
| `npm run test` | Spustí end-to-end testy pomocou Playwright |
| `npm run lint` | Spustí lint Next.js |

## Kľúčové premenné prostredia

| Premenná | Popis |
|----------|-------------|
| `NEXT_PUBLIC_*_API` | URL koncových bodov API pre každý modul |

:::info
Skript `postinstall` kopíruje súbory locale a CSS z `@churchapps/apphelper`. Ak sa komponenty po inštalácii zobrazujú bez štýlov, spustite `npm run postinstall` manuálne.
:::

## Technologický základ

- **Next.js 16** s TypeScriptom
- **React 19** pre komponenty používateľského rozhrania
- **Material-UI 7** ako dizajnový systém
- **React Query 5** pre stav na strane servera
- **`@churchapps/apphelper*`** balíky pre zdieľané komponenty

## Nasadenie

Produkčné buildy sa nasadzujú do **S3 + CloudFront**:

1. `npm run build` vygeneruje optimalizovaný build Next.js
2. Výstup buildu sa synchronizuje do S3 bucketu
3. Spustí sa invalidácia CloudFront, aby sa doručovala nová verzia

:::tip
Podrobné pokyny na nasadenie nájdete v sprievodcovi [Nasadenie webových aplikácií](../deployment/web-apps.md).
:::
