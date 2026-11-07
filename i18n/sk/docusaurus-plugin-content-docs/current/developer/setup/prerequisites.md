---
title: "Predpoklady"
---

# Predpoklady

<div class="article-intro">

Nástroje, ktoré potrebujete, závisia od toho, na ktorých projektoch plánujete pracovať. Táto stránka uvádza všetok požadovaný softvér usporiadaný podľa oblasti vývoja, od všeobecných požiadaviek až po nástroje špecifické pre jednotlivé platformy.

</div>

<div class="prereqs">
<h4>Skôr než začnete</h4>

- Prečítajte si [Prehľad projektov](./project-overview) a rozhodnite sa, na ktorých projektoch chcete pracovať
- Na inštaláciu softvéru potrebujete na svojom vývojovom počítači správcovský (administrátorský) prístup

</div>

## Všetky projekty

Tieto nástroje sú potrebné bez ohľadu na to, na ktorom projekte pracujete:

| Nástroj | Verzia | Poznámky |
|------|---------|-------|
| **Node.js** | 20+ | Verzia 22+ je potrebná pre B1App a LessonsApp (Next.js 16); verzia 24+ je potrebná pre Api |
| **npm** | Súčasť Node.js | Používa sa ako správca balíkov vo všetkých projektoch |
| **Git** | Najnovšia | Každý projekt je samostatný repozitár |

:::tip
Na jednoduché prepínanie medzi verziami Node použite správcu verzií Node, ako je [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) alebo [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows).
:::

## Vývoj backend API

Ak plánujete spúšťať API lokálne (namiesto pripojenia k demo API):

| Nástroj | Verzia | Poznámky |
|------|---------|-------|
| **MySQL** | 8.0+ | Každý modul API používa vlastnú databázu |

Pre základné API budete potrebovať šesť databáz: `membership`, `attendance`, `content`, `giving`, `messaging` a `doing`. API obsahuje skripty na inicializáciu schémy -- pozrite si návod [Lokálne nastavenie API](../api/local-setup).

## Vývoj mobilnej aplikácie

Pre B1Mobile, B1Checkin, LessonsScreen alebo iné aplikácie React Native / Expo:

| Nástroj | Verzia | Poznámky |
|------|---------|-------|
| **Expo CLI** | Najnovšia | Inštalácia globálne: `npm install -g expo-cli` |
| **Android Studio** | Najnovšia | Potrebné pre vývoj na Android (obsahuje Android SDK) |
| **Xcode** | Najnovšia | Potrebné pre vývoj na iOS (iba macOS) |

:::info
Na rýchle testovanie môžete použiť aplikáciu Expo Go na fyzickom zariadení bez Android Studio alebo Xcode. Na zostavenie produkčných binárnych súborov však potrebujete natívne nástroje.
:::

## Vývoj FreeShow (desktopová aplikácia)

FreeShow má ďalšie závislosti pre natívne zostavenie, pretože kompiluje natívne moduly Node (ako `canvas`):

### Všetky platformy

| Nástroj | Verzia | Poznámky |
|------|---------|-------|
| **Python** | 3.12 | Vyžaduje ho `node-gyp` na kompiláciu natívnych modulov |
| **setuptools** | Najnovšia | Inštalácia cez `pip install setuptools` |

### Windows

| Nástroj | Poznámky |
|------|-------|
| **Visual Studio** | Stačí Community edícia |
| **Pracovná záťaž „Desktop development with C++“** | Vyberte počas inštalácie Visual Studio |
| **Windows 10 SDK** | Súčasť pracovnej záťaže C++; uistite sa, že je zaškrtnutý |

Nástroje na zostavenie pre Visual Studio môžete nainštalovať z príkazového riadku:

```bash
npm install --global windows-build-tools
```

Alebo nainštalujte Visual Studio Community a počas inštalácie vyberte pracovnú záťaž „Desktop development with C++“.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Zvyčajne postačujú nástroje príkazového riadku Xcode:

```bash
xcode-select --install
```

## Overenie inštalácie

Spustite tieto príkazy, aby ste potvrdili, že je všetko nainštalované:

```bash
node --version    # Malo by vypísať v20.x.x alebo vyššie
npm --version     # Malo by vypísať 10.x.x alebo vyššie
git --version     # Malo by vypísať git version 2.x.x
mysql --version   # Potrebné iba pre lokálny vývoj API
```

## Ďalšie kroky

- **[Prehľad projektov](./project-overview)** -- Pozrite si všetky projekty a to, čo robia
- **[Premenné prostredia](./environment-variables)** -- Nastavte svoje súbory `.env`
