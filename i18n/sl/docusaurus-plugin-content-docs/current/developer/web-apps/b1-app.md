---
title: "B1App"
description: "Lokalna namestitev spletne aplikacije za člane B1App z Next.js 22+, nastavitev API-jevih končnih točk v .env in zagon razvojnega strežnika na vratih 3301."
---

# B1App

<div class="article-intro">

B1App je aplikacija za člane cerkve, namenjena javnosti, zgrajena z Next.js. Zagotavlja izkušnjo za člane, vključno s profili, imeniki skupin, prenosi v živo in stranmi za darovanja.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Namestite **Node.js 22+** in **Git** -- glejte [Predpogoji](../setup/prerequisites.md)
- Nastavite svoj ciljni API (demo ali lokalni) -- glejte [Okoljske spremenljivke](../setup/environment-variables.md)

</div>

:::warning
B1App zahteva Node.js 22 ali novejši. Starejše različice niso podprte.
:::

## Nastavitev

### 1. Klonirajte repozitorij

```bash
git clone https://github.com/ChurchApps/B1App.git
```

### 2. Namestite odvisnosti

```bash
cd B1App
npm install
```

### 3. Nastavite okoljske spremenljivke

```bash
cp dotenv.sample.txt .env
```

Odprite `.env` in nastavite URL-je končnih točk `NEXT_PUBLIC_*_API`. Ti lahko kažejo na skupni demo API (`https://api.demo.churchapps.org`) ali na vaš lokalni primerek API-ja. Vzorčna datoteka morda še vedno navaja opuščene testne URL-je; zamenjajte jih.

### 4. Zaženite razvojni strežnik

```bash
npm run dev
```

Razvojni strežnik Next.js se zažene na [http://localhost:3301](http://localhost:3301).

## Ključni ukazi

| Ukaz | Opis |
|------|------|
| `npm run dev` | Zažene razvojni strežnik Next.js na vratih 3301 |
| `npm run build` | Produkcijska gradnja prek Next.js |
| `npm run test` | Zažene teste od konca do konca s Playwright |
| `npm run lint` | Zažene lint za Next.js |

## Ključne okoljske spremenljivke

| Spremenljivka | Opis |
|---------------|------|
| `NEXT_PUBLIC_*_API` | URL-ji končnih točk API-ja za posamezen modul |

:::info
Skript `postinstall` kopira datoteke lokalizacije in CSS iz `@churchapps/apphelper`. Če so komponente po namestitvi brez oblikovanja, ročno zaženite `npm run postinstall`.
:::

## Sklad tehnologij

- **Next.js 16** s TypeScriptom
- **React 19** za uporabniške komponente
- **Material-UI 7** za sistem oblikovanja
- **React Query 5** za stanje na strežniku
- **`@churchapps/apphelper*`** paketi za skupne komponente

## Namestitev

Produkcijske gradnje se namestijo v **S3 + CloudFront**:

1. `npm run build` ustvari optimizirano gradnjo Next.js
2. Izhod gradnje se sinhronizira s segmentom S3
3. Sproži se razveljavitev CloudFront, da se prikaže nova različica

:::tip
Podrobna navodila za namestitev najdete v vodniku [Namestitev spletnih aplikacij](../deployment/web-apps.md).
:::
