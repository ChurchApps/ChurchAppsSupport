---
title: "API-telepítés"
description: "Telepítsd a ChurchApps API-t AWS Lambdára a Serverless segítségével: buildek, a demo és éles munkafolyamatok, adatbázis-migrációk és SSM-konfiguráció."
---

# API-telepítés

<div class="article-intro">

A ChurchApps API-kat AWS Lambda-függvényekként telepítjük a Serverless Framework segítségével. Ez az oldal a demó- és éles környezet build-, telepítési és konfigurációs munkafolyamatát ismerteti.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Állítsa be a API-t helyileg – lásd: [Helyi API-beállítás](../api/local-setup.md)
- Konfigurálja az AWS-hitelesítő adatokat a gépén
- Győződjön meg róla, hogy hozzáférése van a céloldali AWS-fiókhoz

</div>

## Build

Az API-kat éles használatra egy külön TypeScript-konfigurációval építjük:

```bash
npm run build:prod
```

Ez a `tsconfig.prod.json` fájlt használja a projekt Lambda-futtatókörnyezethez való fordításához.

## Telepítés

Telepítés a demó környezetbe:

```bash
npm run deploy-demo
```

Telepítés az éles környezetbe:

```bash
npm run deploy-prod
```

A gyakorlatban az API-t a GitHub Actions telepíti: a **Deploy Demo** minden `main` ágra történő push után fut, a **Deploy Prod** pedig kézzel indítandó (workflow dispatch). Staging környezet már nincs.

## Adatbázis-migrációk

A **Deploy Prod** a telepítés részeként alkalmazza a függőben lévő adatbázis-migrációkat. Az éles adatbázisok csak a VPC-n belülről fogadnak kapcsolatot, ezért a `serverless deploy` után a munkafolyamat meghívja a `migrate` Lambda-függvényt (`api-Prod-migrate`), amely lefuttatja minden modul függőben lévő migrációit, és visszaadja a `{ ok, environment, modules }` értéket. Ha bármelyik modul hibázik vagy elutasításra kerül (például egy olyan adatbázis, amelynek nincs migrációs előzménye), a feladat meghiúsul, így az adatbázis-séma soha nem maradhat el a kódtól. A **Rollback Prod** csak a Lambda-kódot állítja vissza; a migrációk megmaradnak, ezért érdemes őket additívan tervezni. A migrációk állapotának ellenőrzéséhez vagy kézi futtatásához lásd: [Szerveradminisztráció -- Adatbázis-migrációk](../server-admin.md#database-migrations).

## Mi jön létre

Minden API-telepítés az alábbi AWS Lambda-függvényeket hozza létre vagy frissíti:

| Függvény | Feladat |
|----------|---------|
| `web` | HTTP-kéréskezelő az API Gateway-en keresztül |
| `socket` | WebSocket-kapcsolatkezelő |
| `timer15Min` | Ütemezett feladat, amely 30 percenként fut (a név történelmi okokból maradt így) |
| `timerMidnight` | Ütemezett feladat, amely naponta éjfélkor fut |
| `migrate` | Függőben lévő adatbázis-migrációkat alkalmaz; a Deploy Prod munkafolyamat hívja meg |

## Környezeti konfiguráció

Telepített környezetekben a konfigurációt az **AWS SSM Parameter Store** tárolóból olvassuk, nem `.env` fájlokból. Ez a titkos adatokat távol tartja a telepítési csomagtól, és lehetővé teszi a konfigurációs változtatásokat újratelepítés nélkül.

:::warning
Soha ne commitoljon éles hitelesítő adatokat a tárolóba. Minden érzékeny konfigurációt az AWS SSM Parameter Store-ban kell tárolni, és futásidőben onnan kell elérni.
:::

:::tip
A `main` ágra történő minden összevonás először a demó környezetbe telepít. Ellenőrizze a módosítást ott (például a [demo.b1.church](https://demo.b1.church) oldalon), mielőtt elindítaná a Deploy Prod-ot.
:::

## Kapcsolódó cikkek

- **[Helyi API-beállítás](../api/local-setup.md)** -- Az API beállítása fejlesztéshez
- **[Modulszerkezet](../api/module-structure.md)** -- A Lambda-függvényarchitektúra megismerése
- **[Webalkalmazás-telepítés](./web-apps.md)** -- A frontend alkalmazások telepítése
