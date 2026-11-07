---
title: "Fejlesztői dokumentáció"
---

# Fejlesztői dokumentáció

<div class="article-intro">

A ChurchApps körülbelül 20 nyílt forráskódú projektből álló gyűjtemény, amelyek együtt egy teljes gyülekezetkezelő platformot alkotnak. A projektek backend API-kat, webalkalmazásokat, mobilalkalmazásokat, egy asztali alkalmazást és megosztott könyvtárakat ölelnek fel, mindegyik TypeScriptben íródott. Ez a rész mindent tartalmaz, amire szükséged lehet a helyi fejlesztői környezet beállításához és a közreműködés megkezdéséhez.

</div>

## Architektúra röviden

A projektek **független tárolók** (nem monorepo). A megosztott kód az `@churchapps/*` névtér alatt jelenik meg npm-en, és szokásos függőségként használják. Ez azt jelenti, hogy az ökoszisztéma egészének klónozása nélkül is dolgozhatsz egyetlen projekten.

Főbb jellemzők:

- **Nyelv:** Mindenhol TypeScript
- **Backend:** Node.js / Express API-k, amelyeket a Serverless Framework segítségével telepítenek az AWS Lambdára
- **Web:** React 19 (Vite és Next.js), Material-UI 7
- **Mobil:** React Native Expo-val
- **Adatbázis:** MySQL 8.0, API-modulonként egy adatbázis

## Mit fed le ez a rész

- **[Beállítás](setup/)** -- Helyi fejlesztői környezet, előfeltételek és konfiguráció
  - [Előfeltételek](setup/prerequisites) -- Szükséges eszközök és szoftverek
  - [Projektáttekintés](setup/project-overview) -- Az összes projekt egy helyen
  - [Környezeti változók](setup/environment-variables) -- A `.env` fájlok beállítása
- **[API](api/)** -- Az alap API helyi beállítása, az adatbázis inicializálása és a modulszerkezet
- **[Webalkalmazások](web-apps/)** -- A B1Admin, a B1App és a LessonsApp helyi futtatása
- **[Mobilalkalmazások](mobile/)** -- A B1Mobile és más Expo-alkalmazások építése
- **[Megosztott könyvtárak](shared-libraries/)** -- Munka a Helpers, az ApiHelper és az AppHelper könyvtárakkal
- **[Telepítés](deployment/)** -- API-k, webalkalmazások és mobilalkalmazások telepítése
- **[FreePlay tartalomszolgáltató](freeplay-content-provider)** -- A leckekönyvtárad integrálása a FreePlay-be

## Közösség és források

| Forrás | Hivatkozás |
|--------|------------|
| GitHub-szervezet | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Hibakövető | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Slack-közösség | [Csatlakozás a Slackhez](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
A közreműködés leggyorsabb módja, ha kiválasztasz egy webalkalmazást (például a B1Admint), a megosztott **demó API-kra** irányítod, és elkezdesz frontend-módosításokat végezni. Nincs szükség adatbázisra vagy API-beállításra.
:::
