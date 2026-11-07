---
title: "B1 Admin"
---

# B1 Admin

<div class="article-intro">

B1Admin je administrativní řídicí panel církve -- jednostránková aplikace (SPA) postavená na Reactu, Vite a Material-UI. Pracovníci církve ji používají ke správě lidí, skupin, docházky, darů, obsahu a dalších částí.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Nainstalujte **Node.js 22+** a **Git** -- viz [Předpoklady](../setup/prerequisites)
- Nastavte cíl API (demo nebo lokální) -- viz [Proměnné prostředí](../setup/environment-variables)

</div>

## Nastavení

### 1. Naklonujte repozitář

```bash
git clone https://github.com/ChurchApps/B1Admin.git
```

### 2. Nainstalujte závislosti

```bash
cd B1Admin
npm install
```

### 3. Nastavte proměnné prostředí

```bash
cp dotenv.sample.txt .env
```

Otevřete `.env` a nastavte koncové body API. Můžete je nasměrovat buď na sdílené demo API (`https://api.demo.churchapps.org`), nebo na svou lokální instanci API. Ukázkový soubor může stále obsahovat zastaralé adresy testovacího prostředí; nahraďte je.

### 4. Spusťte vývojový server

```bash
npm start
```

Spustí se vývojový server Vite. Aplikace bude dostupná v prohlížeči se zapnutou výměnou modulů za běhu (hot module replacement).

## Klíčové proměnné prostředí

| Proměnná | Popis |
|----------|-------|
| `REACT_APP_STAGE` | Název prostředí (např. `demo`, jak je uvedeno v ukázkovém souboru, `prod` nebo `selfhost`) |
| `PORT` | Port vývojového serveru (výchozí: `3101`) |
| `REACT_APP_*_API` | URL koncových bodů API pro jednotlivé moduly |

:::info
Skript `postinstall` kopíruje soubory s lokalizacemi a CSS z balíčku `@churchapps/apphelper`. Pokud komponenty vypadají bez stylů, spusťte `npm run postinstall` ručně.
:::

## Klíčové příkazy

| Příkaz | Popis |
|---------|-------------|
| `npm start` | Spustí vývojový server Vite |
| `npm run build` | Produkční sestavení pomocí Vite |
| `npm run test` | Spustí end-to-end testy pomocí Playwright |
| `npm run lint` | Spustí ESLint s automatickou opravou |

## Technologie

- **React 19** s TypeScriptem
- **Vite** pro nástroje sestavení a vývojový server
- **Material-UI 7** pro UI komponenty
- **React Query 5** pro stav na straně serveru
- **`@churchapps/apphelper*`** balíčky pro sdílené komponenty

## Nasazení

Produkční sestavení se nasazují do **S3 + CloudFront**:

1. `npm run build` vygeneruje statické soubory
2. Soubory se synchronizují do bucketu S3
3. Spustí se invalidace CloudFront, aby se doručila nová verze

:::tip
Podrobné pokyny k nasazení najdete v průvodci [Nasazení webových aplikací](../deployment/web-apps).
:::
