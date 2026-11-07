---
title: "B1App"
---

# B1App

<div class="article-intro">

B1App je veřejně dostupná aplikace pro členy církve, postavená na Next.js. Nabízí prostředí pro členy včetně profilů, adresářů skupin, živého přenosu a stránek pro dary.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Nainstalujte **Node.js 22+** a **Git** -- viz [Předpoklady](../setup/prerequisites)
- Nastavte cílové API (demo nebo lokální) -- viz [Proměnné prostředí](../setup/environment-variables)

</div>

:::warning
B1App vyžaduje Node.js 22 nebo novější. Starší verze nejsou podporovány.
:::

## Nastavení

### 1. Klonování repozitáře

```bash
git clone https://github.com/ChurchApps/B1App.git
```

### 2. Instalace závislostí

```bash
cd B1App
npm install
```

### 3. Nastavení proměnných prostředí

```bash
cp dotenv.sample.txt .env
```

Otevřete `.env` a nastavte adresy koncových bodů `NEXT_PUBLIC_*_API`. Mohou směřovat na sdílené demo API (`https://api.demo.churchapps.org`) nebo na vaši lokální instanci API. Ukázkový soubor může stále obsahovat vyřazené testovací adresy URL; nahraďte je.

### 4. Spuštění vývojového serveru

```bash
npm run dev
```

Vývojový server Next.js se spustí na adrese [http://localhost:3301](http://localhost:3301).

## Klíčové příkazy

| Příkaz | Popis |
|--------|-------|
| `npm run dev` | Spustí vývojový server Next.js na portu 3301 |
| `npm run build` | Produkční sestavení pomocí Next.js |
| `npm run test` | Spustí end-to-end testy pomocí Playwright |
| `npm run lint` | Spustí lint pro Next.js |

## Klíčové proměnné prostředí

| Proměnná | Popis |
|----------|-------|
| `NEXT_PUBLIC_*_API` | Adresy koncových bodů API pro každý modul |

:::info
Skript `postinstall` kopíruje soubory locale a CSS z `@churchapps/apphelper`. Pokud komponenty po instalaci vypadají bez stylů, spusťte `npm run postinstall` ručně.
:::

## Technologický zásobník

- **Next.js 16** s TypeScriptem
- **React 19** pro komponenty uživatelského rozhraní
- **Material-UI 7** pro designový systém
- **React Query 5** pro stav na serveru
- **`@churchapps/apphelper*`** balíčky pro sdílené komponenty

## Nasazení

Produkční sestavení se nasazují na **S3 + CloudFront**:

1. `npm run build` vygeneruje optimalizované sestavení Next.js
2. Výstup sestavení se synchronizuje do bucketu S3
3. Spustí se invalidace CloudFront, aby se načetla nová verze

:::tip
Podrobné pokyny k nasazení najdete v průvodci [Nasazení webových aplikací](../deployment/web-apps).
:::
