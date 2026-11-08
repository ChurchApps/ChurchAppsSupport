---
title: "Preduvzetni pogoji"
description: "Nastavite Node.js, npm, Git in platformska orodja, preden začnete delati na projektih ChurchApps, kot so B1 Admin, Lessons.church, FreePlay ali API, lokalno."
---

# Preduvzetni pogoji

<div class="article-intro">

Orodja, ki jih potrebujete, so odvisna od tega, na katerih projektih nameravate delati. Ta stran navaja vso potrebno programsko opremo, razvrščeno po razvojnih področjih, od splošnih zahtev do platformsko specifičnih orodij.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Preglejte [pregled projektov](./project-overview.md), da določite, na katerih projektih želite delati
- Na razvojnem računalniku morate imeti skrbniški dostop za namestitev programske opreme

</div>

## Vsi projekti

To so zahtevano ne glede na to, na katerem projektu delate:

| Orodje | Različica | Opombe |
|------|---------|-------|
| **Node.js** | 20+ | Za B1App in LessonsApp (Next.js 16) je potrebna različica 22+; za Api je potrebna 24+ |
| **npm** | Priložen z Node.js | Uporablja se kot upravitelj paketov v vseh projektih |
| **Git** | Najnovejša | Vsak projekt je ločen repozitorij |

:::tip
Za preprosto preklapljanje med različicami Node uporabite upravitelja različic Node, kot sta [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) ali [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows).
:::

## Razvoj zaledne storitve API

Če nameravate API zagnati lokalno (namesto da se povezujete na demo API-je):

| Orodje | Različica | Opombe |
|------|---------|-------|
| **MySQL** | 8.0+ | Vsak modul API uporablja svojo podatkovno bazo |

Za osrednji API boste potrebovali šest podatkovnih baz: `membership`, `attendance`, `content`, `giving`, `messaging` in `doing`. API vključuje skripte za inicializacijo sheme -- glejte vodnik [lokalna nastavitev API](../api/local-setup.md).

## Razvoj mobilnih aplikacij

Za B1Checkin, LessonsScreen ali druge aplikacije React Native / Expo:

| Orodje | Različica | Opombe |
|------|---------|-------|
| **Expo CLI** | Najnovejša | Globalna namestitev: `npm install -g expo-cli` |
| **Android Studio** | Najnovejša | Potrebno za razvoj za Android (vključuje Android SDK) |
| **Xcode** | Najnovejša | Potrebno za razvoj za iOS (samo macOS) |

:::info
Za hitro testiranje na fizični napravi lahko uporabite aplikacijo Expo Go, brez Android Studia ali Xcoda. Za izdelavo produkcijskih binarnih datotek pa so potrebna izvorna orodja.
:::

## Razvoj namizne aplikacije FreeShow

FreeShow ima dodatne odvisnosti za nativno gradnjo, ker prevaja nativne module Node (kot je `canvas`):

### Vse platforme

| Orodje | Različica | Opombe |
|------|---------|-------|
| **Python** | 3.12 | Potrebuje ga `node-gyp` za prevajanje nativnih modulov |
| **setuptools** | Najnovejša | Namestitev z `pip install setuptools` |

### Windows

| Orodje | Opombe |
|------|-------|
| **Visual Studio** | Zadostuje izdaja Community |
| **Obremenitev "Desktop development with C++"** | Izberite med namestitvijo Visual Studia |
| **Windows 10 SDK** | Vključen v obremenitev C++; prepričajte se, da je označen |

Orodja za gradnjo Visual Studia lahko namestite prek ukazne vrstice:

```bash
npm install --global windows-build-tools
```

Lahko pa namestite Visual Studio Community in med namestitvijo izberete obremenitev "Desktop development with C++".

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Orodja ukazne vrstice Xcode so običajno zadostna:

```bash
xcode-select --install
```

## Preverite namestitev

Zaženite te ukaze, da potrdite, da je vse nameščeno:

```bash
node --version    # Should print v20.x.x or higher
npm --version     # Should print 10.x.x or higher
git --version     # Should print git version 2.x.x
mysql --version   # Only needed for local API development
```

## Naslednji koraki

- **[Pregled projektov](./project-overview.md)** -- Oglejte si vse projekte in kaj počnejo
- **[Okoljske spremenljivke](./environment-variables.md)** -- Konfigurirajte svoje datoteke `.env`
