---
title: "API"
---

# API

<div class="article-intro">

A ChurchApps API egy **moduláris monolit** -- egyetlen kódbázis, amely hat adatmodult szolgál ki, mindegyiknek saját adatbázisával. Ez az architektúra a mikroszolgáltatások szervezési előnyeit (egyértelmű határok, független adattárolók) kínálja az egyetlen telepítés műveleti egyszerűségével.

</div>

## Modulok

| Modul | Cél |
|--------|---------|
| **Membership** | Személyek, csoportok, háztartások, jogosultságok |
| **Attendance** | Istentiszteletek, alkalmak, bejelentkezési bejegyzések |
| **Content** | Oldalak, szakaszok, elemek, közvetítés |
| **Giving** | Adományok, alapok, fizetésfeldolgozás |
| **Messaging** | Beszélgetések, értesítések, e-mail |
| **Doing** | Feladatok, tervek, kiosztások |

## Technológiai verem

- **Futtatókörnyezet:** Node.js 24.x TypeScripttel (ES modulok)
- **Keretrendszer:** Express
- **Függőségi injektálás:** Inversify (dekorátor-alapú útvonalkezelés)
- **Adatbázis:** MySQL -- modulonként egy adatbázis, mindegyiknek saját kapcsolati készlettel
- **Hitelesítés:** JWT-alapú hitelesítés a `CustomAuthProvider` segítségével
- **Telepítés:** AWS Lambda a Serverless Framework v3 segítségével

## Portok

| Protokoll | Port | Leírás |
|----------|------|-------------|
| HTTP | `8084` | Fő REST API |
| WebSocket | `8087` | Valós idejű socket-kapcsolatok |

## Lambda-függvények

Az AWS-re történő telepítéskor az API hat Lambda-függvényként fut:

- **`web`** -- minden HTTP-kérést kezel
- **`socket`** -- WebSocket-kapcsolatokat kezel
- **`timer15Min`** -- 30 percenként fut e-mail értesítésekhez (a név történeti okokból maradt)
- **`timerMidnight`** -- naponta fut összesítő e-mailekhez és karbantartási feladatokhoz
- **`timerScheduledTasks`** -- naponta fut az esedékes automatizálások és a lejárt munkafolyamatok feldolgozásához
- **`timerWebhooks`** -- percenként fut a sorba állított kimenő webhookok kézbesítéséhez

## Megosztott könyvtárak

Az API két megosztott ChurchApps csomagra épül:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Alapvető segédeszközök (DateHelper, ApiHelper stb.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Express szerver-segédeszközök, köztük hitelesítés, adatbázis-segédfüggvények és AWS-integrációk

:::info
Az API ES modulokat használ (`"type": "module"` a `package.json` fájlban). Győződj meg róla, hogy az importok ES modul szintaxist használnak.
:::

## Ebben a szakaszban

- **[Helyi telepítés](./local-setup)** -- Az API klónozása, konfigurálása és helyi futtatása
- **[Adatbázis](./database)** -- Adatbázisonkénti modulfelépítés, sémaszkriptek és adathozzáférési minták
- **[Modulstruktúra](./module-structure)** -- Vezérlők, repozitóriumok, modellek és hitelesítés
- **[API-kulcsok](./api-keys)** -- Személyes hozzáférési tokenek szkriptekhez és csatlakozókhoz
- **[Csatlakoztatott alkalmazások (OAuth)](./connected-apps)** -- Többbérlős OAuth-folyamat harmadik féltől származó alkalmazásokhoz
- **[Webhookok](./webhooks)** -- Eseményértesítések küldése külső rendszerekbe
- **[MCP-szerver](./mcp)** -- Model Context Protocol végpont, amely az API-t MI-asszisztensek számára teszi elérhetővé
- **[Végpontok referenciája](./endpoints/)** -- Teljes REST API-dokumentáció minden modulhoz
