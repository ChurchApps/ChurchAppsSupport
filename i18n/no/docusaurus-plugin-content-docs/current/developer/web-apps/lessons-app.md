---
title: "LessonsApp"
---

# LessonsApp

<div class="article-intro">

LessonsApp er applikasjonen for administrasjon av leksjonsinnhold for [Lessons.church](https://lessons.church). Den gir et grensesnitt for å lage, organisere og publisere læreplaner for menigheter, og er bygget med Next.js og React.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Installer **Node.js 22+** og **Git**. Se [Forutsetninger](../setup/prerequisites)
- Konfigurer API-målet ditt (lokal LessonsApi). Se [miljøvariabler](../setup/environment-variables)

</div>

:::warning
LessonsApp krever Node.js 22 eller nyere. Tidligere versjoner støttes ikke.
:::

## Oppsett

### 1. Klon repositoryet

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. Installer avhengigheter

```bash
cd LessonsApp
npm install
```

### 3. Konfigurer miljøvariabler

Kopier eksempelfilen for miljøvariabler til `.env` og konfigurer API-endepunktene:

```bash
cp dotenv.sample.txt .env
```

Oppdater URL-ene for API-endepunktene slik at de peker på din lokale LessonsApi-instans (`http://localhost:8090`). Staging-API-et for Lessons er avviklet, så bytt ut eventuelle `api.staging.lessons.church`-URL-er som står igjen i eksempelfilen.

### 4. Start utviklingsserveren

```bash
npm run dev
```

Next.js-utviklingsserveren starter på [http://localhost:3501](http://localhost:3501).

## Viktige kommandoer

| Kommando | Beskrivelse |
|---------|-------------|
| `npm run dev` | Start Next.js-utviklingsserveren på port 3501 |
| `npm run build` | Produksjonsbygg via Next.js |

## Teknologistakk

- **Next.js 16** med TypeScript
- **React 19** for UI-komponenter
- **`@churchapps/apphelper*`**-pakker for delte komponenter

:::info
LessonsApp kommuniserer med **LessonsApi**-backenden, som er et eget API som er separat fra hovedAPI-et for ChurchApps. Sørg for at miljøet ditt er konfigurert med riktig Lessons-API-endepunkt.
:::

## Distribusjon

Produksjonsbygg distribueres til **S3 + CloudFront**:

1. `npm run build` lager det optimaliserte Next.js-bygget
2. Byggresultatet synkroniseres til en S3-bøtte
3. En CloudFront-invalidering utløses for å servere den nye versjonen

:::tip
For detaljerte distribusjonsinstruksjoner, se veiledningen [Distribusjon av webapper](../deployment/web-apps).
:::
