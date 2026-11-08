---
title: "Tinhlelo Tefoni"
description: "Incwadzi lebhalwe ngetinhlelo te-ChurchApps letisebentisa i-Expo ne-React Native, B1 Checkin ne-LessonsScreen, kanye netinyatselo tekusetfwa lokwendzele kwemathuluzi abelane i-Expo."
---

# Tinhlelo Tefoni

<div class="article-intro">

Tinhlelo tefoni te-ChurchApps yakhiwe nge **React Native** ne **Expo**, tinika umuntfu kusebentisa ngendlela yemtselemuti ku-Android, iOS, ne-Android TV. Tonkhe tinhlelo tefoni tisebentisa emathuluzi lafanako asekelwe ku-Expo, kangangoba uma ungakwati kwakha lenye, ungakwati kwakha tonkhe.

</div>

## Tinhlelo

| Inhlelo | Inhloso | Sitfombe |
|-----|---------|----------|
| B1 Checkin | Inhlelo yekhiyosiki yetiteshi tekungena | Android, iOS |
| LessonsScreen | Inhlelo ye-Android TV yekuveta tifundvo emakilasini | Android TV |

:::info
Inhlelo lebhekiswe emalungwini ye-B1 App -- sigaba se-`/mobile` se-B1App, lamalunga afakela njenge-Progressive Web App. Yiwebhu-app, hhayi iprojekthi ye-Expo; bona [Web Apps](../web-apps/index.md) kuze uyisebentise endzaweni yakho.
:::

### B1 Checkin

Inhlelo yekhiyosiki lakhelwe ngenhloso yetiteshi tekungena emasontweni. Inika indlela lelula lekusebentisa ngetinhlobo letisebentisa kutfintsa, ivumela emalunga kutsi angenise bantfwana futsi arekhodze kuhambela kwetinkhonzo netehlelo.

### LessonsScreen

Inhlelo ye-Android TV leveta emacondvo ekufundza emakilasini. Titsitsi tingacindzetela tiphepha tetifundvo, tividiyo, nemisebenti ku-skrini ye-TV, kuyenta kube lula kwetsembisa sakhiwo sekufundza ngesikhatsi semakilasi.

## Kusetfwa Lokwendzele

Tonkhe tinhlelo tefoni tisebentisa emathuluzi lafanako lasekelwe ku-Expo futsi tilandela timo tekusetfwa letifanako. Kusebentisa B1 Checkin njengesibonelo:

1. Faka **Node.js**, Android Studio (yekutfola i-Android emulator), ne-Xcode (ye-iOS simulator, i-macOS kuphela) -- bona [Prerequisites](../setup/prerequisites.md).
2. Clona indzawo yekugcina ikhodi bese ufake ema-dependencies (B1 Checkin isebentisa Yarn):

   ```bash
   git clone https://github.com/ChurchApps/B1Checkin.git
   cd B1Checkin && yarn install
   ```

3. Kopisha `dotenv.sample.txt` ku `.env` bese usetsa simo lapho inhlelo kufanele ixhumane khona (`dev` ye-API yendzawo) -- bona [Environment Variables](../setup/environment-variables.md#b1checkin-react-native--expo).
4. Qala i-Expo dev server ngo `yarn start`, bese usebentisa `yarn android` noma `yarn ios` kuvula inhlelo ku-emulator noma kudivayisi.

Bona [Mobile Deployment](../deployment/mobile.md) ngetinguquko letikhishwa kanye nekuvuselelwa ngelugagasi (over-the-air).
