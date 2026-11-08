---
title: "Documentația pentru dezvoltatori"
description: "Găsiți drumul prin documentația pentru dezvoltatori ChurchApps: configurarea locală, ghidurile pentru API și aplicațiile web, bibliotecile partajate, compilările pentru mobil și implementarea pentru proiectele open-source."
---

# Documentația pentru dezvoltatori

<div class="article-intro">

ChurchApps este o colecție de aproximativ 20 de proiecte open-source care, împreună, oferă o platformă completă de management pentru biserici. Proiectele acoperă API-uri backend, aplicații web, aplicații mobile, o aplicație desktop și biblioteci partajate -- toate scrise în TypeScript. Această secțiune oferă tot ce aveți nevoie pentru a configura un mediu de dezvoltare local și pentru a începe să contribuiți.

</div>

## Arhitectura pe scurt

Proiectele sunt **depozite independente** (nu un monorepo). Codul partajat este publicat în npm sub domeniul `@churchapps/*` și este utilizat ca dependență obișnuită. Aceasta înseamnă că puteți lucra la un singur proiect fără a clona întregul ecosistem.

Caracteristici cheie:

- **Limbaj:** TypeScript în tot proiectul
- **Backend:** API-uri Node.js / Express implementate pe AWS Lambda prin Serverless Framework
- **Web:** React 19 (Vite și Next.js), Material-UI 7
- **Mobil:** React Native cu Expo
- **Bază de date:** MySQL 8.0, câte o bază de date pentru fiecare modul API

## Ce acoperă această secțiune

- **[Configurare](./setup/index.md)** -- Mediul de dezvoltare local, cerințele preliminare și configurarea
  - [Cerințe preliminare](./setup/prerequisites.md) -- Instrumente și software necesare
  - [Prezentarea proiectului](./setup/project-overview.md) -- Toate proiectele dintr-o privire
  - [Variabile de mediu](./setup/environment-variables.md) -- Configurarea fișierelor `.env`
- **[API](./api/index.md)** -- Configurarea locală a API-ului principal, inițializarea bazei de date și structura modulelor
- **[Aplicații web](./web-apps/index.md)** -- Rularea B1Admin, B1App și LessonsApp local
- **[Aplicații mobile](./mobile/index.md)** -- Compilarea B1Checkin și a altor aplicații Expo
- **[Biblioteci partajate](./shared-libraries/index.md)** -- Lucrul cu Helpers, ApiHelper și AppHelper
- **[Implementare](./deployment/index.md)** -- Implementarea API-urilor, a aplicațiilor web și a aplicațiilor mobile
- **[Furnizor de conținut FreePlay](./freeplay-content-provider.md)** -- Integrarea bibliotecii dvs. de lecții cu FreePlay

## Comunitate și resurse

| Resursă | Link |
|----------|------|
| Organizația GitHub | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Lista de probleme | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Comunitatea Slack | [Alăturați-vă pe Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Cea mai rapidă cale de a începe să contribuiți este să alegeți o aplicație web (cum ar fi B1Admin), să o conectați la **API-urile demo** partajate și să începeți să faceți modificări în frontend. Nu este necesară nicio configurare a bazei de date sau a API-ului.
:::
