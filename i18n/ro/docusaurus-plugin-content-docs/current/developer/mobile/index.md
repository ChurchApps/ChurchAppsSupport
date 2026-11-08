---
title: "Aplicații mobile"
description: "Prezentare generală a aplicațiilor mobile Expo și React Native ale ChurchApps, B1 Checkin și LessonsScreen, plus pașii de configurare locală pentru toolchain-ul Expo comun."
---

# Aplicații mobile

<div class="article-intro">

Aplicațiile mobile ChurchApps sunt construite cu **React Native** și **Expo**, oferind experiențe native pe Android, iOS și Android TV. Toate aplicațiile mobile folosesc același toolchain bazat pe Expo, deci dacă o poți construi pe una, le poți construi pe toate.

</div>

## Aplicații

| Aplicație | Scop | Platformă |
|-----|---------|----------|
| B1 Checkin | Aplicație tip chioșc pentru punctele de check-in | Android, iOS |
| LessonsScreen | Aplicație Android TV pentru afișarea lecțiilor în clase | Android TV |

:::info
Aplicația destinată membrilor este B1 App -- secțiunea `/mobile` din B1App, pe care membrii o instalează ca Progressive Web App. Este o aplicație web, nu un proiect Expo; consultă [Aplicații web](../web-apps/index.md) pentru a o rula local.
:::

### B1 Checkin

O aplicație tip chioșc special concepută pentru punctele de check-in din biserici. Oferă o interfață simplă, adaptată atingerii, pentru ca membrii să poată înregistra copiii și să consemneze prezența la servicii și evenimente.

### LessonsScreen

O aplicație Android TV care afișează conținutul lecțiilor în clase. Profesorii pot trimite diapozitive, videoclipuri și activități cu lecții pe ecranul TV, facilitând prezentarea materialului de curs în timpul orelor.

## Configurare locală

Toate aplicațiile mobile folosesc același toolchain bazat pe Expo și urmează modele de configurare similare. Folosind B1 Checkin ca exemplu:

1. Instalează **Node.js**, Android Studio (pentru emulatorul Android) și Xcode (pentru simulatorul iOS, doar pe macOS) -- consultă [Cerințe prealabile](../setup/prerequisites.md).
2. Clonează repository-ul și instalează dependențele (B1 Checkin folosește Yarn):

   ```bash
   git clone https://github.com/ChurchApps/B1Checkin.git
   cd B1Checkin && yarn install
   ```

3. Copiază `dotenv.sample.txt` în `.env` și setează mediul la care aplicația ar trebui să se conecteze (`dev` pentru un API local) -- consultă [Variabile de mediu](../setup/environment-variables.md#b1checkin-react-native--expo).
4. Pornește serverul de dezvoltare Expo cu `yarn start`, apoi rulează `yarn android` sau `yarn ios` pentru a lansa aplicația pe un emulator sau dispozitiv.

Consultă [Implementarea aplicațiilor mobile](../deployment/mobile.md) pentru versiunile de lansare și actualizările over-the-air.
