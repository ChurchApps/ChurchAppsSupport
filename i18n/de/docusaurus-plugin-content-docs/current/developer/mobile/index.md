---
title: "Mobile Apps"
description: "Überblick über die Expo- und React-Native-Apps von ChurchApps, B1 Checkin und LessonsScreen, sowie lokale Einrichtungsschritte für deren gemeinsame Expo-Toolchain."
---

# Mobile Apps

<div class="article-intro">

Die mobilen Apps von ChurchApps basieren auf **React Native** und **Expo** und bieten native Erfahrungen auf Android, iOS und Android TV. Alle mobilen Apps nutzen dieselbe Expo-basierte Toolchain. Wenn du eine davon bauen kannst, kannst du alle bauen.

</div>

## Apps

| App | Zweck | Plattform |
|-----|-------|-----------|
| B1 Checkin | Kiosk-App für Check-in-Stationen | Android, iOS |
| LessonsScreen | Android-TV-App zur Anzeige von Lektionen in Klassenräumen | Android TV |

:::info
Die App für Mitglieder ist die B1 App -- der Bereich `/mobile` von B1App, den Mitglieder als Progressive Web App installieren. Sie ist eine Web-App und kein Expo-Projekt. Informationen zum lokalen Ausführen findest du unter [Web-Apps](../web-apps/index.md).
:::

### B1 Checkin

Eine speziell entwickelte Kiosk-Anwendung für Check-in-Stationen in Kirchen. Sie bietet eine einfache, touchfreundliche Oberfläche, mit der Mitglieder Kinder einchecken und die Anwesenheit bei Gottesdiensten und Veranstaltungen erfassen können.

### LessonsScreen

Eine Android-TV-Anwendung, die Lerninhalte in Klassenräumen anzeigt. Lehrkräfte können Lektionsfolien, Videos und Aktivitäten auf einen Fernseher übertragen. So lässt sich Unterrichtsmaterial während des Unterrichts einfach präsentieren.

## Lokale Einrichtung

Alle mobilen Apps nutzen dieselbe Expo-basierte Toolchain und folgen ähnlichen Einrichtungsschritten. Am Beispiel von B1 Checkin:

1. Installiere **Node.js**, Android Studio (für den Android-Emulator) und Xcode (für den iOS-Simulator, nur macOS). Siehe [Voraussetzungen](../setup/prerequisites.md).
2. Klone das Repository und installiere die Abhängigkeiten (B1 Checkin verwendet Yarn):

   ```bash
   git clone https://github.com/ChurchApps/B1Checkin.git
   cd B1Checkin && yarn install
   ```

3. Kopiere `dotenv.sample.txt` nach `.env` und lege die Stage fest, mit der die App sich verbinden soll (`dev` für eine lokale API). Siehe [Umgebungsvariablen](../setup/environment-variables.md#b1checkin-react-native--expo).
4. Starte den Expo-Entwicklungsserver mit `yarn start` und führe danach `yarn android` oder `yarn ios` aus, um die App auf einem Emulator oder Gerät zu starten.

Informationen zu Release-Builds und Over-the-Air-Updates findest du unter [Mobile Bereitstellung](../deployment/mobile.md).
