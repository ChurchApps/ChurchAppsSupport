---
title: "Predpogoji"
---

# Predpogoji

<div class="article-intro">

Orodja, ki jih potrebujete, so odvisna od tega, na katerih projektih nameravate delati. Ta stran navaja vso potrebno programsko opremo, razvrščeno po razvojnih področjih, od splošnih zahtev do orodij, specifičnih za posamezne platforme.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Oglejte si [pregled projektov](./project-overview), da ugotovite, na katerih projektih želite delati
- Na razvojnem računalniku morate imeti skrbniški dostop za namestitev programske opreme

</div>

## Vsi projekti

To je potrebno ne glede na to, na katerem projektu delate:

| Orodje | Različica | Opombe |
|------|---------|-------|
| **Node.js** | 20+ | Za B1App in LessonsApp (Next.js 16) je potrebna različica 22+; za Api je potrebna različica 24+ |
| **npm** | Je priložen Node.js | Uporablja se kot upravitelj paketov v vseh projektih |
| **Git** | Najnovejša | Vsak projekt je ločen repozitorij |

:::tip
Za preprosto preklapljanje med različicami Node uporabite upravitelja različic, na primer [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) ali [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows).
:::

## Razvoj zaledne programske opreme (API)

Če nameravate API zagnati lokalno (namesto da se povezujete z demo API-ji):

| Orodje | Različica | Opombe |
|------|---------|-------|
| **MySQL** | 8.0+ | Vsak modul API uporablja svojo podatkovno bazo |

Za osnovni API potrebujete šest podatkovnih baz: `membership`, `attendance`, `content`, `giving`, `messaging` in `doing`. API vključuje skripte za inicializacijo sheme -- glejte vodnik [lokalna nastavitev API](../api/local-setup).

## Razvoj mobilnih aplikacij

Za B1Mobile, B1Checkin, LessonsScreen ali druge aplikacije React Native / Expo:

| Orodje | Različica | Opombe |
|------|---------|-------|
| **Expo CLI** | Najnovejša | Globalna namestitev: `npm install -g expo-cli` |
| **Android Studio** | Najnovejša | Potrebna za razvoj za Android (vključuje Android SDK) |
| **Xcode** | Najnovejša | Potrebna za razvoj za iOS (samo macOS) |

:::info
Za hitro preizkušanje na fizični napravi lahko uporabite aplikacijo Expo Go, brez Android Studia ali Xcode. Za izdelavo produkcijskih binarnih datotek pa so potrebna orodja za domače platforme.
:::

## Razvoj za FreeShow (namizna aplikacija)

FreeShow ima dodatne odvisnosti za gradnjo domačih modulov, ker prevaja domače Node module (na primer `canvas`):

### Vse platforme

| Orodje | Različica | Opombe |
|------|---------|-------|
| **Python** | 3.12 | Potrebuje ga `node-gyp` za prevajanje domačih modulov |
| **setuptools** | Najnovejša | Namestitev prek `pip install setuptools` |

### Windows

| Orodje | Opombe |
|------|-------|
| **Visual Studio** | Zadostuje izdaja Community |
| **Obremenitev »Razvoj namiznih aplikacij v C++«** | Izberite med namestitvijo Visual Studia |
| **Windows 10 SDK** | Vključen v obremenitev C++; poskrbite, da je označen |

Orodja za gradnjo Visual Studio lahko namestite iz ukazne vrstice:

```bash
npm install --global windows-build-tools
```

Ali namestite Visual Studio Community in med namestitvijo izberite obremenitev »Razvoj namiznih aplikacij v C++«.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Običajno zadostujejo orodja Xcode Command Line Tools:

```bash
xcode-select --install
```

## Preverite namestitev

Za preverjanje, ali je vse nameščeno, zaženite naslednje ukaze:

```bash
node --version    # Treba bi bilo izpisati v20.x.x ali višje
npm --version     # Treba bi bilo izpisati 10.x.x ali višje
git --version     # Treba bi bilo izpisati git version 2.x.x
mysql --version   # Potrebno samo za lokalni razvoj API
```

## Naslednji koraki

- **[Pregled projektov](./project-overview)** -- Oglejte si vse projekte in kaj počnejo
- **[Okoljske spremenljivke](./environment-variables)** -- Nastavite datoteke `.env`
