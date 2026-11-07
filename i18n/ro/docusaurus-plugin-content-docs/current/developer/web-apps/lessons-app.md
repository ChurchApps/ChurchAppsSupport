---
title: "LessonsApp"
---

# LessonsApp

<div class="article-intro">

LessonsApp este aplicația de gestionare a conținutului lecțiilor pentru [Lessons.church](https://lessons.church). Oferă o interfață pentru crearea, organizarea și publicarea programelor de lecții ale bisericii, fiind construită cu Next.js și React.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Instalați **Node.js 22+** și **Git** -- consultați [Cerințe preliminare](../setup/prerequisites)
- Configurați ținta API (LessonsApi local) -- consultați [Variabile de mediu](../setup/environment-variables)

</div>

:::warning
LessonsApp necesită Node.js 22 sau o versiune mai recentă. Versiunile anterioare nu sunt acceptate.
:::

## Configurare

### 1. Clonați depozitul

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. Instalați dependențele

```bash
cd LessonsApp
npm install
```

### 3. Configurați variabilele de mediu

Copiați fișierul de exemplu pentru variabilele de mediu în `.env` și configurați adresele endpoint-urilor API:

```bash
cp dotenv.sample.txt .env
```

Actualizați adresele URL ale endpoint-urilor API astfel încât să indice instanța locală LessonsApi (`http://localhost:8090`). API-ul de staging Lessons a fost retras, prin urmare înlocuiți orice adrese `api.staging.lessons.church` rămase în fișierul de exemplu.

### 4. Porniți serverul de dezvoltare

```bash
npm run dev
```

Serverul de dezvoltare Next.js se lansează la adresa [http://localhost:3501](http://localhost:3501).

## Comenzi principale

| Comandă | Descriere |
|---------|-----------|
| `npm run dev` | Pornește serverul de dezvoltare Next.js pe portul 3501 |
| `npm run build` | Compilare de producție prin Next.js |

## Stiva tehnologică

- **Next.js 16** cu TypeScript
- **React 19** pentru componentele de interfață
- **`@churchapps/apphelper*`** pachete pentru componentele partajate

:::info
LessonsApp comunică cu backend-ul **LessonsApi**, care este un API separat de ChurchApps Api principal. Asigurați-vă că mediul dvs. este configurat cu endpoint-ul corect al API-ului Lessons.
:::

## Implementare

Compilările de producție sunt implementate pe **S3 + CloudFront**:

1. `npm run build` generează compilarea optimizată Next.js
2. Rezultatul compilării este sincronizat cu un bucket S3
3. Se declanșează invalidarea CloudFront pentru a servi noua versiune

:::tip
Pentru instrucțiuni detaliate de implementare, consultați ghidul [Implementarea aplicațiilor web](../deployment/web-apps).
:::
