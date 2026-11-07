---
title: "B1 Admin"
description: "Configurați B1 Admin local: clonați dashboard-ul React/Vite, setați endpoint-urile API în .env și porniți serverul de dezvoltare."
---

# B1 Admin

<div class="article-intro">

B1Admin este panoul de administrare al bisericii -- o aplicație single-page React construită cu Vite și Material-UI. Personalul bisericii o folosește pentru a gestiona persoanele, grupurile, prezența, donațiile, conținutul și altele.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Instalați **Node.js 22+** și **Git** -- consultați [Cerințe preliminare](../setup/prerequisites.md)
- Configurați ținta API (demo sau locală) -- consultați [Variabile de mediu](../setup/environment-variables.md)

</div>

## Configurare

### 1. Clonați depozitul

```bash
git clone https://github.com/ChurchApps/B1Admin.git
```

### 2. Instalați dependențele

```bash
cd B1Admin
npm install
```

### 3. Configurați variabilele de mediu

```bash
cp dotenv.sample.txt .env
```

Deschideți `.env` și configurați punctele de acces ale API-ului. Puteți indica fie API-ul demo partajat (`https://api.demo.churchapps.org`), fie instanța dvs. locală de API. Fișierul exemplu poate încă să listeze adrese de staging retrase; înlocuiți-le.

### 4. Porniți serverul de dezvoltare

```bash
npm start
```

Aceasta pornește serverul de dezvoltare Vite. Aplicația va fi disponibilă în browser, cu înlocuirea modulelor la cald (hot module replacement) activată.

## Variabile de mediu esențiale

| Variabilă | Descriere |
|----------|-------------|
| `REACT_APP_STAGE` | Numele mediului (de ex., `demo` ca în fișierul exemplu, `prod` sau `selfhost`) |
| `PORT` | Portul serverului de dezvoltare (implicit: `3101`) |
| `REACT_APP_*_API` | Adresele URL ale API-ului pentru fiecare modul |

:::info
Scriptul `postinstall` copiază fișierele de localizare și CSS din `@churchapps/apphelper`. Dacă componentele par nestilizate, rulați manual `npm run postinstall`.
:::

## Comenzi esențiale

| Comandă | Descriere |
|---------|-------------|
| `npm start` | Pornește serverul de dezvoltare Vite |
| `npm run build` | Build de producție prin Vite |
| `npm run test` | Rulează testele end-to-end cu Playwright |
| `npm run lint` | Rulează ESLint cu corectare automată |

## Stack tehnologic

- **React 19** cu TypeScript
- **Vite** pentru instrumentele de build și serverul de dezvoltare
- **Material-UI 7** pentru componentele de interfață
- **React Query 5** pentru starea de pe server
- **`@churchapps/apphelper*`** pachete pentru componente partajate

## Implementare

Build-urile de producție sunt implementate pe **S3 + CloudFront**:

1. `npm run build` generează activele statice
2. Activele sunt sincronizate cu un bucket S3
3. Se declanșează invalidarea CloudFront, pentru ca noua versiune să fie servită

:::tip
Pentru instrucțiuni detaliate de implementare, consultați ghidul [Implementarea aplicațiilor web](../deployment/web-apps.md).
:::
