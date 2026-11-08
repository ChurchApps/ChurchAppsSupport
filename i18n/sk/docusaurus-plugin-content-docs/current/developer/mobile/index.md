---
title: "Mobilné aplikácie"
description: "Prehľad mobilných aplikácií ChurchApps postavených na Expo a React Native, B1 Checkin a LessonsScreen, plus lokálne nastavenie spoločného nástrojového reťazca Expo."
---

# Mobilné aplikácie

<div class="article-intro">

Mobilné aplikácie ChurchApps sú vytvorené pomocou **React Native** a **Expo** a poskytujú natívny zážitok na Androide, iOS a Android TV. Všetky mobilné aplikácie zdieľajú rovnaký nástrojový reťazec založený na Expo, takže ak dokážete zostaviť jednu, dokážete zostaviť všetky.

</div>

## Aplikácie

| Aplikácia | Účel | Platforma |
|-----|---------|----------|
| B1 Checkin | Kioskové aplikácia pre check-in stanovištia | Android, iOS |
| LessonsScreen | Aplikácia pre Android TV na zobrazovanie lekcií v triedach | Android TV |

:::info
Aplikácia pre členov je B1 App -- sekcia `/mobile` v B1App, ktorú členovia inštalujú ako Progressive Web App. Je to webová aplikácia, nie projekt Expo; na jej lokálne spustenie pozrite [Webové aplikácie](../web-apps/index.md).
:::

### B1 Checkin

Aplikácia typu kiosk, navrhnutá špeciálne pre check-in stanovištia v kostoloch. Poskytuje jednoduché rozhranie vhodné na dotyk, cez ktoré členovia môžu prihlasovať deti a zaznamenávať účasť na bohoslužbách a podujatiach.

### LessonsScreen

Aplikácia pre Android TV, ktorá zobrazuje obsah lekcií v triedach. Učitelia môžu na obrazovku televízora posielať snímky lekcií, videá a aktivity, čo uľahčuje prezentovanie učebných materiálov počas vyučovania.

## Lokálne nastavenie

Všetky mobilné aplikácie zdieľajú rovnaký nástrojový reťazec založený na Expo a sledujú podobné postupy nastavenia. Na príklade B1 Checkin:

1. Nainštalujte **Node.js**, Android Studio (pre emulátor Androidu) a Xcode (pre simulátor iOS, iba macOS) -- pozrite [Predpoklady](../setup/prerequisites.md).
2. Naklonujte repozitár a nainštalujte závislosti (B1 Checkin používa Yarn):

   ```bash
   git clone https://github.com/ChurchApps/B1Checkin.git
   cd B1Checkin && yarn install
   ```

3. Skopírujte `dotenv.sample.txt` do `.env` a nastavte prostredie, ku ktorému sa má aplikácia pripájať (`dev` pre lokálne API) -- pozrite [Premenné prostredia](../setup/environment-variables.md#b1checkin-react-native--expo).
4. Spustite vývojový server Expo príkazom `yarn start`, potom spustite `yarn android` alebo `yarn ios` a aplikáciu otvorte v emulátore alebo na zariadení.

Informácie o release buildoch a aktualizáciách over-the-air (OTA) nájdete v časti [Nasadenie mobilných aplikácií](../deployment/mobile.md).
