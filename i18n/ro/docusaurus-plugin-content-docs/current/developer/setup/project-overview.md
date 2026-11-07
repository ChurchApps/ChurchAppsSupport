---
title: "Prezentare generală a proiectului"
description: "Harta depozitelor ChurchApps pe categorii, cu framework-uri, porturi de dezvoltare, baze de date și legăturile dintre pachetele comune @churchapps."
---

# Prezentare generală a proiectului

<div class="article-intro">

ChurchApps cuprinde aproximativ 20 de depozite independente, fiecare publicat sub [organizația GitHub ChurchApps](https://github.com/ChurchApps). Această pagină oferă un inventar complet al tuturor proiectelor, organizate pe categorii, împreună cu framework-urile, porturile și relațiile dintre ele.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Instalați [cerințele preliminare](./prerequisites.md) pentru categoria de proiecte la care doriți să lucrați

</div>

## API-uri backend

Toate API-urile sunt construite cu Node.js, Express și TypeScript și sunt implementate pe AWS Lambda prin Serverless Framework.

| Proiect | Scop | Port de dezvoltare | Bază de date |
|---------|------|--------------------|--------------|
| **[Api](https://github.com/ChurchApps/Api)** | Monolit modular de bază care acoperă membrii, prezența, conținutul, donațiile, mesageria și activitățile | 8084 | Bază de date MySQL separată pentru fiecare modul (6 în total) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Backend pentru Lessons.church | -- | Bază de date MySQL unică `lessons` |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | Instrument de interogare AI alimentat de OpenAI | -- | -- |

:::info
Proiectul principal **Api** este un monolit modular. Fiecare modul (membership, attendance, content, giving, messaging, doing) are propria bază de date și este accesibil la un subcale precum `/membership` sau `/giving`. În producție, acestea sunt expuse ca funcții Lambda separate, în spatele API Gateway.
:::

## Aplicații web

| Proiect | Framework | Port de dezvoltare | Scop |
|---------|-----------|--------------------|------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Panou de administrare a bisericii |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Aplicația publică pentru membrii bisericii |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Interfața frontend pentru Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Utilitar de import/export de date |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Static | -- | Site-uri statice de prezentare ale bisericilor |

## Aplicații mobile

Toate aplicațiile mobile folosesc React Native cu Expo.

| Proiect | Scop | Versiuni cheie |
|---------|------|----------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | Aplicația pentru membrii bisericii, pentru iOS și Android | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Aplicația chioșcului de check-in | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Afișarea lecțiilor pe Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Redarea conținutului (inclusiv pe sisteme TV) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Telecomandă mobilă pentru FreeShow | Expo |

## Desktop

| Proiect | Stivă | Scop |
|---------|-------|------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Software pentru prezentări și servicii religioase |

## Biblioteci partajate

Codul partajat este publicat pe npm sub domeniul `@churchapps` și este utilizat ca dependență npm obișnuită de proiectele de mai sus. Toate pachetele partajate se află într-un singur depozit, [Packages](https://github.com/ChurchApps/Packages), gestionat ca spațiu de lucru Yarn și lansat cu ajutorul changesets.

| Pachet | Scop | Folosit de |
|--------|------|------------|
| `@churchapps/helpers` | Utilitare de bază și interfețe TypeScript comune (DateHelper, ApiHelper, CurrencyHelper etc.) | Toate proiectele |
| `@churchapps/apihelper` | Utilitare pentru serverul Express (autentificare, controllere de bază, acces la baza de date, integrări AWS) | Toate API-urile |
| `@churchapps/apphelper` | Bibliotecă de componente React cu module secundare pentru autentificare, donații, formulare, markdown și construirea site-urilor web | Toate aplicațiile web |
| `@churchapps/content-providers` | Abstractizare pentru furnizorii externi de conținut (Lessons.church, Planning Center, Dropbox și alții) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Set de instrumente pentru integrarea cu B1.church: webhook-uri, client REST, OAuth | Dezvoltatorii externi de integrări |
| `@churchapps/texting` | Abstractizare pentru furnizorii de SMS | Api |

Consultați [Biblioteci partajate](../shared-libraries/index.md) pentru configurarea spațiului de lucru și fluxul de lansare.

## Relațiile dintre proiecte

```
Aplicații frontend         Biblioteci partajate       API-uri backend
------------------         --------------------       ---------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

Toate aplicațiile frontend depind de `@churchapps/helpers`. Aplicațiile web depind, în plus, de pachetele `@churchapps/apphelper`. Toate API-urile backend depind atât de `@churchapps/helpers`, cât și de `@churchapps/apihelper`.

## Pașii următori

- **[Variabile de mediu](./environment-variables.md)** -- Configurați fișierele `.env` pentru a conecta aplicațiile la API-uri
- **[Configurarea locală a API-ului](../api/local-setup.md)** -- Configurați local API-ul backend
