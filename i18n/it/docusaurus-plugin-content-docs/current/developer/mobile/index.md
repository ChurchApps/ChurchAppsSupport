---
title: "App mobili"
description: "Panoramica delle app mobili Expo e React Native di ChurchApps, B1 Checkin e LessonsScreen, con i passaggi di configurazione locale per il loro toolchain Expo condiviso."
---

# App mobili

<div class="article-intro">

Le app mobili di ChurchApps sono sviluppate con **React Native** ed **Expo**, offrendo un'esperienza nativa su Android, iOS e Android TV. Tutte le app mobili condividono lo stesso toolchain basato su Expo, quindi chi sa compilarne una sa compilarle tutte.

</div>

## App

| App | Scopo | Piattaforma |
|-----|---------|----------|
| B1 Checkin | App kiosk per le postazioni di check-in | Android, iOS |
| LessonsScreen | App Android TV per visualizzare le lezioni nelle aule | Android TV |

:::info
L'app destinata ai membri è la B1 App -- la sezione `/mobile` di B1App, che i membri installano come Progressive Web App. Si tratta di un'app web, non di un progetto Expo; consulta [Web Apps](../web-apps/index.md) per eseguirla in locale.
:::

### B1 Checkin

Un'applicazione kiosk progettata appositamente per le postazioni di check-in nelle chiese. Offre un'interfaccia semplice e adatta al tocco, con cui i membri possono registrare l'arrivo dei bambini e la presenza ai culti e agli eventi.

### LessonsScreen

Un'applicazione Android TV che visualizza i contenuti delle lezioni nelle aule. Gli insegnanti possono inviare diapositive, video e attività delle lezioni a uno schermo TV, rendendo semplice presentare il materiale didattico durante le lezioni.

## Configurazione locale

Tutte le app mobili condividono lo stesso toolchain basato su Expo e seguono schemi di configurazione simili. Prendendo come esempio B1 Checkin:

1. Installa **Node.js**, Android Studio (per l'emulatore Android) e Xcode (per il simulatore iOS, solo macOS) -- consulta [Prerequisites](../setup/prerequisites.md).
2. Clona il repository e installa le dipendenze (B1 Checkin usa Yarn):

   ```bash
   git clone https://github.com/ChurchApps/B1Checkin.git
   cd B1Checkin && yarn install
   ```

3. Copia `dotenv.sample.txt` in `.env` e imposta l'ambiente a cui l'app deve connettersi (`dev` per un'API locale) -- consulta [Environment Variables](../setup/environment-variables.md#b1checkin-react-native--expo).
4. Avvia il server di sviluppo Expo con `yarn start`, quindi esegui `yarn android` o `yarn ios` per avviare l'app su un emulatore o un dispositivo.

Consulta [Mobile Deployment](../deployment/mobile.md) per le build di rilascio e gli aggiornamenti over-the-air.
