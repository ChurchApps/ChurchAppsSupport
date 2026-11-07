---
title: "Webalkalmazások"
description: "A három ChurchApps webalkalmazás (B1 Admin, B1.church, Lessons.church) áttekintése: közös React/MUI-stack, apphelper-csomagok és buildeszközök."
---

# Webalkalmazások

<div class="article-intro">

A ChurchApps három webalkalmazást tartalmaz, amelyek mindegyike más közönséget és célt szolgál. Közös technológiai alapjuk a React 19, a TypeScript és a Material-UI 7, de build-eszközeik és telepítési céljaik eltérnek.

</div>

## Az alkalmazások áttekintése

| Alkalmazás | Cél | Keretrendszer | Fejlesztői port |
|-----|---------|-----------|----------|
| [**B1Admin**](./b1-admin.md) | Gyülekezeti adminisztrációs irányítópult | React 19 + Vite + MUI 7 | 5173 |
| [**B1App**](./b1-app.md) | Nyilvános, gyülekezeti tagoknak szánt alkalmazás | Next.js 16 + React 19 + MUI 7 | 3301 |
| [**LessonsApp**](./lessons-app.md) | Leckék tartalmának kezelése | Next.js 16 + React 19 | 3501 |

## Közös technológiai verem

Mindhárom webalkalmazás a következőkkel készült:

- **TypeScript** -- Végponttól végpontig tartó típusbiztonság
- **React 19** -- Felhasználói felület komponenskönyvtára
- **Material-UI 7** -- Tervezési rendszer és komponenseszköztár
- **React Query 5** -- Szerverállapot-kezelés

## Megosztott komponensek

Az alkalmazások a `@churchapps/apphelper*` csomagcsalád révén osztoznak a felhasználói felület komponensein és segédfüggvényein:

| Csomag | Cél |
|---------|---------|
| `@churchapps/apphelper` | Megosztott React-alapkomponensek |
| `@churchapps/apphelper-login` | Hitelesítési felhasználói felület komponensei |
| `@churchapps/apphelper-donations` | Adomány- és adakozási űrlapok |
| `@churchapps/apphelper-forms` | Űrlapszerkesztő komponensek |
| `@churchapps/apphelper-markdown` | Markdown-megjelenítés |
| `@churchapps/apphelper-website` | Weboldal- és CMS-komponensek |

:::tip
A megosztott csomagok helyi fejlesztésével kapcsolatos részletekért lásd az [AppHelper](../shared-libraries/app-helper.md) dokumentációt.
:::

## Telepítés utáni szkript

Minden webalkalmazásnak van egy `postinstall` szkriptje, amely a nyelvi fájlokat és a CSS-eszközöket másolja a `@churchapps/apphelper` csomagból a projektbe. Ez automatikusan lefut az `npm install` után.

:::info
Ha a komponensek stílus nélkül jelennek meg a függőségek telepítése után, előfordulhat, hogy a `postinstall` szkript nem futott le megfelelően. Manuálisan is elindíthatod az `npm run postinstall` paranccsal.
:::

## Build-eszközök

Az alkalmazások két különböző build-eszközt használnak:

- A **B1Admin** a **Vite**-ot használja -- gyors, modern csomagoló, amely ideális egyoldalas alkalmazásokhoz
- A **B1App** és a **LessonsApp** a **Next.js**-t használja -- ez szerveroldali renderelést, fájlalapú útvonalkezelést és optimalizált éles buildeket biztosít
