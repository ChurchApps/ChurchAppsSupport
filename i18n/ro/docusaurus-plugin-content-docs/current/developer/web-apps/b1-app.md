---
title: "B1App"
---

# B1App

<div class="article-intro">

B1App este aplicația publică pentru membrii bisericii, construită cu Next.js. Oferă experiența membrului, inclusiv profiluri, directoare de grupuri, transmisiuni live și pagini de donații.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Instalați **Node.js 22+** și **Git** -- vezi [Cerințe preliminare](../setup/prerequisites)
- Configurați ținta API (demo sau locală) -- vezi [Variabile de mediu](../setup/environment-variables)

</div>

:::warning
B1App necesită Node.js 22 sau o versiune ulterioară. Versiunile anterioare nu sunt acceptate.
:::

## Configurare

### 1. Clonați depozitul

```bash
git clone https://github.com/ChurchApps/B1App.git
```

### 2. Instalați dependențele

```bash
cd B1App
npm install
```

### 3. Configurați variabilele de mediu

```bash
cp dotenv.sample.txt .env
```

Deschideți `.env` și configurați URL-urile endpoint-urilor `NEXT_PUBLIC_*_API`. Acestea pot indica API-ul demo comun (`https://api.demo.churchapps.org`) sau instanța dvs. locală de API. Fișierul exemplu poate încă să listeze URL-uri de staging retrase; înlocuiți-le.

### 4. Porniți serverul de dezvoltare

```bash
npm run dev
```

Serverul de dezvoltare Next.js pornește la adresa [http://localhost:3301](http://localhost:3301).

## Comenzi principale

| Comandă | Descriere |
|---------|-----------|
| `npm run dev` | Pornește serverul de dezvoltare Next.js pe portul 3301 |
| `npm run build` | Build de producție prin Next.js |
| `npm run test` | Rulează testele end-to-end cu Playwright |
| `npm run lint` | Rulează linter-ul Next.js |

## Variabile de mediu principale

| Variabilă | Descriere |
|-----------|-----------|
| `NEXT_PUBLIC_*_API` | URL-urile endpoint-urilor API pentru fiecare modul |

:::info
Scriptul `postinstall` copiază fișierele de localizare și CSS din `@churchapps/apphelper`. Dacă componentele arată fără stiluri după instalare, rulați manual `npm run postinstall`.
:::

## Stack tehnologic

- **Next.js 16** cu TypeScript
- **React 19** pentru componentele de interfață
- **Material-UI 7** pentru sistemul de design
- **React Query 5** pentru starea serverului
- **`@churchapps/apphelper*`** pachete pentru componentele partajate

## Implementare

Build-urile de producție sunt implementate pe **S3 + CloudFront**:

1. `npm run build` generează build-ul optimizat Next.js
2. Rezultatul build-ului este sincronizat cu un bucket S3
3. Se declanșează invalidarea CloudFront pentru a servi noua versiune

:::tip
Pentru instrucțiuni detaliate de implementare, vezi ghidul [Implementarea aplicațiilor web](../deployment/web-apps).
:::
