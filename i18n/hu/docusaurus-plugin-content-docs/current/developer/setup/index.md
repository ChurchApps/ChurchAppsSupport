---
title: "Beállítás"
---

# Beállítás

<div class="article-intro">

Ez a szakasz végigvezet a helyi fejlesztőkörnyezet beállításán a ChurchApps-projektekhez. A frontendet vagy a megosztott demó API-kra irányíthatod a gyors fejlesztéshez, vagy a teljes rendszert helyben futtathatod a backend-munkához.

</div>

## Két megközelítés

Kétféleképpen fejleszthetsz helyben, attól függően, mennyi rendszerre van szükséged:

### 1. Csatlakozás a demó API-khoz (a legegyszerűbb)

Ha **frontend-projekten** dolgozol (webalkalmazás, mobilalkalmazás vagy asztali alkalmazás), a leggyorsabb út, ha a helyi alkalmazásodat a megosztott demó API-khoz irányítod. Nincs szükség adatbázisra vagy backend-beállításra.

A demó API alap-URL-je:

```
https://api.demo.churchapps.org
```

Minden API-modul elérhető ennek az alapnak egy-egy útvonalán, például:

```
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/giving
```

A demókörnyezet a `main` ág legfrissebb kódját futtatja, mintaadatait pedig minden éjjel újratöltik, ezért ne számíts arra, hogy ott létrehozott adatok megmaradnak. (A korábbi staging-környezet, a `api.staging.churchapps.org` megszűnt. Néhány mintaként szolgáló `.env` fájl még staging URL-eket tartalmazhat -- ezeket cseréld le a demó vagy a helyi URL-ekre.)

:::tip
Ezzel a megközelítéssel már percek alatt elkezdhetsz frontend-módosításokat végezni. A legtöbb közreműködőnek ez az ajánlott út.
:::

### 2. Minden helyi futtatása

Ha az API kódját szeretnéd módosítani, vagy offline szeretnél dolgozni, a teljes rendszert helyben futtathatod. Ehhez MySQL 8.0+ és további beállítások szükségesek. A részletes lépésekért lásd az [API helyi beállítása](../api/local-setup) útmutatót.

## Első lépések

Kövesd ezeket az oldalakat a megadott sorrendben:

1. **[Előfeltételek](prerequisites)** -- A szükséges eszközök telepítése (Node.js, Git, MySQL stb.)
2. **[Projektáttekintés](project-overview)** -- Ismerd meg, milyen projektek léteznek és mire valók
3. **[Környezeti változók](environment-variables)** -- A `.env` fájlok beállítása, hogy mindent összekapcsolj

:::info
Minden ChurchApps-projekt önálló Git-tárolóként működik. Csak azokat a projekteket kell klónoznod, amelyeken dolgozni szeretnél.
:::
