---
title: "B1 Admin"
description: "Lokalna namestitev B1 Admin: kloniraj nadzorno ploščo React/Vite, nastavi API-jeve končne točke v .env in zaženi razvojni strežnik za upravljanje cerkve."
---

# B1 Admin

<div class="article-intro">

B1Admin je nadzorna plošča za upravljanje cerkve – aplikacija s stranmi v enem zavihku (SPA) v Reactu, zgrajena z Vite in Material-UI. Cerkveno osebje jo uporablja za upravljanje oseb, skupin, prisotnosti, donacij, vsebin in drugega.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Namestite **Node.js 22+** in **Git** – glejte [Predpogoji](../setup/prerequisites.md)
- Nastavite svoj cilj API (demo ali lokalni) – glejte [Spremenljivke okolja](../setup/environment-variables.md)

</div>

## Nastavitev

### 1. Klonirajte repozitorij

```bash
git clone https://github.com/ChurchApps/B1Admin.git
```

### 2. Namestite odvisnosti

```bash
cd B1Admin
npm install
```

### 3. Nastavite spremenljivke okolja

```bash
cp dotenv.sample.txt .env
```

Odprite `.env` in nastavite končne točke API. Lahko jih usmerite na skupni demo API (`https://api.demo.churchapps.org`) ali na svojo lokalno instanco API. Vzorčna datoteka morda še vedno navaja ukinjene testne naslove (staging); zamenjajte jih.

### 4. Zaženite razvojni strežnik

```bash
npm start
```

To zažene razvojni strežnik Vite. Aplikacija bo na voljo v brskalniku, z omogočeno zamenjavo modulov med delovanjem (hot module replacement).

## Ključne spremenljivke okolja

| Spremenljivka | Opis |
|----------|-------------|
| `REACT_APP_STAGE` | Ime okolja (npr. `demo`, kot v vzorčni datoteki, `prod` ali `selfhost`) |
| `PORT` | Vrata razvojnega strežnika (privzeto: `3101`) |
| `REACT_APP_*_API` | URL-ji končnih točk API za posamezne module |

:::info
Skripta `postinstall` kopira datoteke z lokalizacijo in CSS iz `@churchapps/apphelper`. Če so komponente videti brez slogov, zaženite `npm run postinstall` ročno.
:::

## Ključni ukazi

| Ukaz | Opis |
|---------|-------------|
| `npm start` | Zažene razvojni strežnik Vite |
| `npm run build` | Produkcijska gradnja prek Vite |
| `npm run test` | Zažene end-to-end teste s Playwright |
| `npm run lint` | Zažene ESLint s samodejnim popravljanjem |

## Tehnološki sklad

- **React 19** s TypeScript
- **Vite** za orodja za gradnjo in razvojni strežnik
- **Material-UI 7** za uporabniške komponente
- **React Query 5** za stanje na strani strežnika
- **`@churchapps/apphelper*`** paketi za skupne komponente

## Uvajanje

Produkcijske gradnje se uvajajo na **S3 + CloudFront**:

1. `npm run build` ustvari statične datoteke
2. Datoteke se sinhronizirajo z vedrom S3
3. Sproži se invalidacija CloudFront, da se prikaže nova različica

:::tip
Za podrobna navodila o uvajanju glejte vodnik [Uvajanje spletnih aplikacij](../deployment/web-apps.md).
:::
