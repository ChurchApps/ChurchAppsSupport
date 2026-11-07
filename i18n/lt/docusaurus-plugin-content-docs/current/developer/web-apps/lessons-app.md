---
title: "LessonsApp"
---

# LessonsApp

<div class="article-intro">

LessonsApp yra pamokų turinio valdymo programa, skirta [Lessons.church](https://lessons.church). Ji suteikia sąsają bažnytinių pamokų programoms kurti, tvarkyti ir skelbti. Programa sukurta naudojant Next.js ir React.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Įdiekite **Node.js 22+** ir **Git** -- žr. [Reikalavimai](../setup/prerequisites)
- Sukonfigūruokite API tikslą (vietinis LessonsApi) -- žr. [Aplinkos kintamieji](../setup/environment-variables)

</div>

:::warning
LessonsApp reikalauja Node.js 22 ar naujesnės versijos. Ankstesnės versijos nepalaikomos.
:::

## Sąranka

### 1. Klonuokite saugyklą

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. Įdiekite priklausomybes

```bash
cd LessonsApp
npm install
```

### 3. Sukonfigūruokite aplinkos kintamuosius

Nukopijuokite aplinkos kintamųjų pavyzdžio failą į `.env` ir sukonfigūruokite API galinius taškus:

```bash
cp dotenv.sample.txt .env
```

Atnaujinkite API galinių taškų URL, kad jie rodytų į jūsų vietinį LessonsApi egzempliorių (`http://localhost:8090`). Lessons API pastatymo aplinka nebenaudojama, todėl pakeiskite visus `api.staging.lessons.church` URL, likusius pavyzdžio faile.

### 4. Paleiskite kūrimo serverį

```bash
npm run dev
```

Next.js kūrimo serveris paleidžiamas adresu [http://localhost:3501](http://localhost:3501).

## Pagrindinės komandos

| Komanda | Aprašymas |
|---------|-----------|
| `npm run dev` | Paleisti Next.js kūrimo serverį 3501 prievade |
| `npm run build` | Sukurti produkcinę versiją naudojant Next.js |

## Technologijos

- **Next.js 16** su TypeScript
- **React 19** vartotojo sąsajos komponentams
- **`@churchapps/apphelper*`** paketai bendriems komponentams

:::info
LessonsApp bendrauja su **LessonsApi** serveriu, kuris yra atskira API, nei pagrindinė ChurchApps Api. Įsitikinkite, kad jūsų aplinka sukonfigūruota su teisingu Lessons API galiniu tašku.
:::

## Diegimas

Produkcinės versijos diegiamos naudojant **S3 + CloudFront**:

1. `npm run build` sukuria optimizuotą Next.js versiją
2. Sukurti failai sinchronizuojami su S3 saugykla
3. Paleidžiamas CloudFront talpyklos išvalymas, kad būtų rodoma nauja versija

:::tip
Išsamias diegimo instrukcijas rasite [Web App diegimo](../deployment/web-apps) vadove.
:::
