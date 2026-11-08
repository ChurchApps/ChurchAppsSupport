---
title: "Mobiliosios programėlės"
description: "ChurchApps Expo ir React Native mobiliųjų programėlių, B1 Checkin ir LessonsScreen, apžvalga bei vietinio diegimo žingsniai bendram Expo įrankių rinkiniui."
---

# Mobiliosios programėlės

<div class="article-intro">

ChurchApps mobiliosios programėlės kuriamos naudojant **React Native** ir **Expo**, ir suteikia natyvią patirtį Android, iOS ir Android TV platformose. Visos mobiliosios programėlės naudoja tą patį Expo pagrindu sukurtą įrankių rinkinį, todėl, jei mokate sukurti vieną, galite sukurti ir visas kitas.

</div>

## Programėlės

| Programėlė | Paskirtis | Platforma |
|-----|---------|----------|
| B1 Checkin | Kioskų programėlė registracijos punktams | Android, iOS |
| LessonsScreen | Android TV programėlė pamokoms rodyti klasėse | Android TV |

:::info
Nariams skirta programėlė yra B1 App – B1App `/mobile` skyrius, kurį nariai įdiegia kaip progresyviąją interneto programėlę (PWA). Tai interneto programėlė, o ne Expo projektas. Norėdami ją paleisti vietiniame kompiuteryje, žr. [Interneto programėlės](../web-apps/index.md).
:::

### B1 Checkin

Specialiai bažnyčių registracijos punktams sukurta kioskų programėlė. Ji suteikia paprastą, patogią liečiamąją sąsają, leidžiančią nariams registruoti vaikus ir fiksuoti dalyvavimą pamaldose bei renginiuose.

### LessonsScreen

Android TV programėlė, rodanti pamokų turinį klasėse. Mokytojai gali siųsti pamokų skaidres, vaizdo įrašus ir veiklas į televizoriaus ekraną, todėl mokomąją medžiagą pamokų metu pristatyti tampa paprasta.

## Vietinis diegimas

Visos mobiliosios programėlės naudoja tą patį Expo pagrindu sukurtą įrankių rinkinį ir seka panašius diegimo žingsnius. Pavyzdžiui, imkime B1 Checkin:

1. Įdiekite **Node.js**, Android Studio (Android emuliatoriui) ir Xcode (iOS simuliatoriui, tik macOS) – žr. [Reikalavimai](../setup/prerequisites.md).
2. Klonuokite saugyklą ir įdiekite priklausomybes (B1 Checkin naudoja Yarn):

   ```bash
   git clone https://github.com/ChurchApps/B1Checkin.git
   cd B1Checkin && yarn install
   ```

3. Nukopijuokite `dotenv.sample.txt` į `.env` ir nustatykite aplinką, prie kurios programėlė turėtų jungtis (`dev` vietinei API) – žr. [Aplinkos kintamieji](../setup/environment-variables.md#b1checkin-react-native--expo).
4. Paleiskite Expo kūrimo serverį komanda `yarn start`, tada vykdykite `yarn android` arba `yarn ios`, kad paleistumėte programėlę emuliatoriuje ar įrenginyje.

Išleidimo versijų kūrimo ir atnaujinimų oru (over-the-air) informacijos žr. [Mobiliųjų programėlių diegimas](../deployment/mobile.md).
