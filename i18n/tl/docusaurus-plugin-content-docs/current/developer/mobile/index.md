---
title: "Mga Mobile App"
description: "Pangkalahatang-ideya ng mga Expo at React Native mobile app ng ChurchApps, ang B1 Checkin at LessonsScreen, at mga hakbang sa lokal na pag-setup para sa magkakabahagi nilang Expo toolchain."
---

# Mga Mobile App

<div class="article-intro">

Ang mga mobile app ng ChurchApps ay ginawa gamit ang **React Native** at **Expo**, na nagbibigay ng native na karanasan sa Android, iOS, at Android TV. Lahat ng mobile app ay gumagamit ng iisang Expo-based na toolchain, kaya kung kaya mong gumawa ng isa, kaya mo ring gawin ang lahat ng iba.

</div>

## Mga App

| App | Layunin | Platform |
|-----|---------|----------|
| B1 Checkin | Kiosk app para sa mga check-in station | Android, iOS |
| LessonsScreen | Android TV app para sa pagpapakita ng mga aralin sa mga silid-aralan | Android TV |

:::info
Ang app na ginagamit ng mga miyembro ay ang B1 App -- ang seksyong `/mobile` ng B1App, na iniinstall ng mga miyembro bilang isang Progressive Web App. Isa itong web app, hindi Expo project; tingnan ang [Mga Web App](../web-apps/index.md) para patakbuhin ito nang lokal.
:::

### B1 Checkin

Isang espesyal na idinisenyong kiosk application para sa mga check-in station sa mga simbahan. Nagbibigay ito ng simple at madaling gamitin na touch interface para makapag-check in ang mga miyembro ng mga bata at makapagtala ng attendance sa mga serbisyo at kaganapan.

### LessonsScreen

Isang Android TV application na nagpapakita ng nilalaman ng aralin sa mga silid-aralan. Maaaring ipadala ng mga guro ang mga lesson slide, video, at aktibidad sa TV screen, kaya madali nilang maipresenta ang materyal ng kurikulum habang may klase.

## Lokal na Pag-setup

Lahat ng mobile app ay gumagamit ng iisang Expo-based na toolchain at sumusunod sa magkakatulad na pattern ng pag-setup. Gamit ang B1 Checkin bilang halimbawa:

1. I-install ang **Node.js**, Android Studio (para sa Android emulator), at Xcode (para sa iOS simulator, macOS lamang) -- tingnan ang [Mga Kinakailangan](../setup/prerequisites.md).
2. I-clone ang repository at i-install ang mga dependency (gumagamit ang B1 Checkin ng Yarn):

   ```bash
   git clone https://github.com/ChurchApps/B1Checkin.git
   cd B1Checkin && yarn install
   ```

3. Kopyahin ang `dotenv.sample.txt` bilang `.env` at itakda ang stage na dapat kumonekta ang app (`dev` para sa lokal na API) -- tingnan ang [Mga Environment Variable](../setup/environment-variables.md#b1checkin-react-native--expo).
4. Simulan ang Expo dev server gamit ang `yarn start`, pagkatapos ay patakbuhin ang `yarn android` o `yarn ios` para ilunsad ang app sa emulator o device.

Tingnan ang [Mobile Deployment](../deployment/mobile.md) para sa mga release build at over-the-air update.
