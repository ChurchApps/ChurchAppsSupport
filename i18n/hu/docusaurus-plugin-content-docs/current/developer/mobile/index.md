---
title: "Mobilalkalmazások"
description: "Áttekintés a ChurchApps Expo és React Native mobilalkalmazásairól, a B1 Checkinről és a LessonsScreenről, valamint a közös Expo-eszköztáruk helyi beállításáról."
---

# Mobilalkalmazások

<div class="article-intro">

A ChurchApps mobilalkalmazásai **React Native** és **Expo** segítségével készülnek, natív élményt nyújtva Androidon, iOS-en és Android TV-n. Minden mobilalkalmazás ugyanazt az Expo-alapú eszköztárat használja, így ha az egyiket el tudod készíteni, a többit is el tudod.

</div>

## Alkalmazások

| Alkalmazás | Cél | Platform |
|-----|---------|----------|
| B1 Checkin | Bejelentkező kioszk alkalmazás a bejelentkező állomásokhoz | Android, iOS |
| LessonsScreen | Android TV-alkalmazás, amely a leckéket jeleníti meg az osztatermekben | Android TV |

:::info
A tagok számára készült alkalmazás a B1 App -- a B1App `/mobile` része, amelyet a tagok progresszív webalkalmazásként (Progressive Web App, PWA) telepítenek. Ez egy webalkalmazás, nem Expo-projekt. Helyi futtatásához lásd: [Webalkalmazások](../web-apps/index.md).
:::

### B1 Checkin

Kifejezetten a gyülekezetek bejelentkező állomásaihoz tervezett kioszk alkalmazás. Egyszerű, érintésbarát felületet biztosít, amellyel a tagok gyermekeiket jelentkeztethetik be, és rögzíthetik a részvételt istentiszteleteken és eseményeken.

### LessonsScreen

Android TV-alkalmazás, amely a leckeanyagokat jeleníti meg az osztatermekben. A tanárok leckediákat, videókat és feladatokat küldhetnek a TV-képernyőre, így a tananyag órán könnyen bemutatható.

## Helyi telepítés

Minden mobilalkalmazás ugyanazt az Expo-alapú eszköztárat használja, és hasonló telepítési lépéseket követ. A B1 Checkin példáján keresztül:

1. Telepítsd a **Node.js**-t, az Android Studiót (az Android emulátorhoz) és az Xcode-ot (az iOS szimulátorhoz, csak macOS-en) -- lásd: [Előfeltételek](../setup/prerequisites.md).
2. Klónozd a tárolót, és telepítsd a függőségeket (a B1 Checkin Yarnt használ):

   ```bash
   git clone https://github.com/ChurchApps/B1Checkin.git
   cd B1Checkin && yarn install
   ```

3. Másold a `dotenv.sample.txt` fájlt `.env` névre, és állítsd be azt a környezetet, amelyhez az alkalmazásnak kapcsolódnia kell (`dev` helyi API esetén) -- lásd: [Környezeti változók](../setup/environment-variables.md#b1checkin-react-native--expo).
4. Indítsd el az Expo fejlesztői szervert a `yarn start` paranccsal, majd futtasd a `yarn android` vagy `yarn ios` parancsot, hogy az alkalmazás emulátoron vagy eszközön elinduljon.

A kiadási buildekről és a levegőn keresztüli (over-the-air) frissítésekről lásd: [Mobil telepítés](../deployment/mobile.md).
