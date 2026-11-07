---
title: "Documentație pentru dezvoltatori"
---

# Documentație pentru dezvoltatori

<div class="article-intro">

ChurchApps este o colecție de aproximativ 20 de proiecte open-source care împreună oferă o platformă completă de administrare a bisericii. Proiectele includ API-uri backend, aplicații web, aplicații mobile, o aplicație desktop și biblioteci partajate -- toate scrise în TypeScript. Această secțiune oferă tot ce ai nevoie pentru a configura un mediu local de dezvoltare și pentru a începe să contribui.

</div>

## Arhitectura, pe scurt

Proiectele sunt **depozite independente** (nu un monorepo). Codul partajat este publicat în npm sub scope-ul `@churchapps/*` și este utilizat ca dependență obișnuită. Aceasta înseamnă că poți lucra la un singur proiect fără a clona întregul ecosistem.

Caracteristici cheie:

- **Limbaj:** TypeScript în tot proiectul
- **Backend:** API-uri Node.js / Express, implementate pe AWS Lambda prin Serverless Framework
- **Web:** React 19 (Vite și Next.js), Material-UI 7
- **Mobil:** React Native cu Expo
- **Bază de date:** MySQL 8.0, câte o bază de date pentru fiecare modul API

## Ce acoperă această secțiune

- **[Configurare](setup/)** -- Mediul local de dezvoltare, cerințele preliminare și configurarea
  - [Cerințe preliminare](setup/prerequisites) -- Instrumente și software necesare
  - [Prezentare generală a proiectului](setup/project-overview) -- Toate proiectele, pe scurt
  - [Variabile de mediu](setup/environment-variables) -- Configurarea fișierelor `.env`
- **[API](api/)** -- Configurarea locală a API-ului principal, inițializarea bazei de date și structura modulelor
- **[Aplicații web](web-apps/)** -- Rularea B1Admin, B1App și LessonsApp local
- **[Aplicații mobile](mobile/)** -- Compilarea B1Mobile și a altor aplicații Expo
- **[Biblioteci partajate](shared-libraries/)** -- Lucrul cu Helpers, ApiHelper și AppHelper
- **[Implementare](deployment/)** -- Implementarea API-urilor, a aplicațiilor web și a aplicațiilor mobile
- **[Furnizor de conținut FreePlay](freeplay-content-provider)** -- Integrarea bibliotecii tale de lecții cu FreePlay

## Comunitate și resurse

| Resursă | Link |
|----------|------|
| Organizația GitHub | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Lista de probleme | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Comunitatea Slack | [Alătură-te pe Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Cel mai rapid mod de a începe să contribui este să alegi o aplicație web (cum ar fi B1Admin), să o conectezi la **API-urile demo** partajate și să începi să faci modificări în frontend. Nu este necesară nicio configurare a bazei de date sau a API-ului.
:::
