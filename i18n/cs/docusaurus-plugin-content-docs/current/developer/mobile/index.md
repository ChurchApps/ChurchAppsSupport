---
title: "Mobilní aplikace"
description: "Přehled mobilních aplikací ChurchApps postavených na Expo a React Native, B1 Checkin a LessonsScreen, a také kroky místní instalace sdíleného nástroje Expo."
---

# Mobilní aplikace

<div class="article-intro">

Mobilní aplikace ChurchApps jsou postaveny na **React Native** a **Expo** a nabízejí nativní zážitek na Androidu, iOS a Android TV. Všechny mobilní aplikace sdílejí stejný nástrojový řetězec založený na Expo, takže pokud dokážete sestavit jednu, dokážete sestavit všechny.

</div>

## Aplikace

| Aplikace | Účel | Platforma |
|-----|---------|----------|
| B1 Checkin | Kiosková aplikace pro check-in stanoviště | Android, iOS |
| LessonsScreen | Aplikace pro Android TV pro zobrazování lekcí ve třídách | Android TV |

:::info
Aplikací určenou pro členy je B1 App -- sekce `/mobile` v B1App, kterou si členové instalují jako Progressive Web App. Jde o webovou aplikaci, nikoli o projekt Expo; k jejímu spuštění lokálně viz [Webové aplikace](../web-apps/index.md).
:::

### B1 Checkin

Speciálně navržená kiosková aplikace pro check-in stanoviště v kostelech. Poskytuje jednoduché rozhraní vhodné pro dotyk, které členům umožňuje přihlašovat děti a zaznamenávat docházku na bohoslužbách a akcích.

### LessonsScreen

Aplikace pro Android TV, která zobrazuje obsah lekcí ve třídách. Učitelé mohou odesílat snímky lekcí, videa a aktivity na obrazovku televizoru, což usnadňuje prezentaci učebních materiálů během hodin.

## Místní instalace

Všechny mobilní aplikace sdílejí stejný nástrojový řetězec založený na Expo a řídí se podobnými postupy instalace. Na příkladu B1 Checkin:

1. Nainstalujte **Node.js**, Android Studio (pro emulátor Androidu) a Xcode (pro simulátor iOS, pouze macOS) -- viz [Předpoklady](../setup/prerequisites.md).
2. Naklonujte repozitář a nainstalujte závislosti (B1 Checkin používá Yarn):

   ```bash
   git clone https://github.com/ChurchApps/B1Checkin.git
   cd B1Checkin && yarn install
   ```

3. Zkopírujte `dotenv.sample.txt` do `.env` a nastavte prostředí, ke kterému se má aplikace připojit (`dev` pro lokální API) -- viz [Proměnné prostředí](../setup/environment-variables.md#b1checkin-react-native--expo).
4. Spusťte vývojový server Expo příkazem `yarn start` a poté spusťte `yarn android` nebo `yarn ios` pro spuštění aplikace v emulátoru nebo na zařízení.

Informace o produkčních sestaveních a aktualizacích přes vzduch najdete v [Nasazení mobilních aplikací](../deployment/mobile.md).
