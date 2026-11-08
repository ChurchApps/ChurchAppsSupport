---
title: "Fejlesztői dokumentáció"
description: "Tájékozódj a ChurchApps fejlesztői dokumentációjában: helyi környezet beállítása, API- és webalkalmazás-útmutatók, megosztott könyvtárak, mobilos build-ek és telepítés a nyílt forráskódú projektekhez."
---

# Fejlesztői dokumentáció

<div class="article-intro">

A ChurchApps körülbelül 20 nyílt forráskódú projektből álló gyűjtemény, amely együtt egy teljes gyülekezetkezelő platformot alkot. A projektek backend API-kat, webalkalmazásokat, mobilalkalmazásokat, egy asztali alkalmazást és megosztott könyvtárakat foglalnak magukba – mindegyik TypeScriptben készült. Ez a szakasz mindent tartalmaz, amire szükséged van a helyi fejlesztői környezet beállításához és a közreműködés megkezdéséhez.

</div>

## Architektúra röviden

A projektek **önálló tárolók** (nem monorepo). A megosztott kód az npm-en, a `@churchapps/*` névtér alatt érhető el, és szokásos függőségként használják. Ez azt jelenti, hogy egyetlen projekten is dolgozhatsz anélkül, hogy az egész ökoszisztémát klónoznod kellene.

Kulcsfontosságú jellemzők:

- **Nyelv:** mindenhol TypeScript
- **Backend:** Node.js / Express API-k, amelyeket a Serverless Frameworkkel telepítenek az AWS Lambdára
- **Web:** React 19 (Vite és Next.js), Material-UI 7
- **Mobil:** React Native Expo-val
- **Adatbázis:** MySQL 8.0, API-modulonként egy adatbázis

## Mit tartalmaz ez a szakasz

- **[Beállítás](./setup/index.md)** – Helyi fejlesztői környezet, előfeltételek és konfiguráció
  - [Előfeltételek](./setup/prerequisites.md) – Szükséges eszközök és szoftverek
  - [Projektek áttekintése](./setup/project-overview.md) – Az összes projekt egy helyen
  - [Környezeti változók](./setup/environment-variables.md) – A `.env` fájlok beállítása
- **[API](./api/index.md)** – Az alap API helyi beállítása, adatbázis-inicializálás és modulszerkezet
- **[Webalkalmazások](./web-apps/index.md)** – A B1Admin, a B1App és a LessonsApp helyi futtatása
- **[Mobilalkalmazások](./mobile/index.md)** – A B1Checkin és más Expo-alkalmazások építése
- **[Megosztott könyvtárak](./shared-libraries/index.md)** – Munka a Helpers, ApiHelper és AppHelper könyvtárakkal
- **[Telepítés](./deployment/index.md)** – API-k, webalkalmazások és mobilalkalmazások telepítése
- **[FreePlay tartalomszolgáltató](./freeplay-content-provider.md)** – A leckekönyvtár integrálása a FreePlay-be

## Közösség és források

| Erőforrás | Hivatkozás |
|----------|------|
| GitHub szervezet | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Hibakövető | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Slack-közösség | [Csatlakozás a Slack-hez](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
A közreműködés leggyorsabb módja, ha választasz egy webalkalmazást (például a B1Admint), a megosztott **demo API**-kra irányítod, és elkezdesz frontend-módosításokat végezni. Nincs szükség adatbázisra vagy API-beállításra.
:::
