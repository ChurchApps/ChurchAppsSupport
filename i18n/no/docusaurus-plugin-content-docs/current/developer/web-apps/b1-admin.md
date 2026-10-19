---
title: "B1 Admin"
---

# B1 Admin

<div class="article-intro">

B1Admin er administrasjonsdashbordet for kirken -- en React-enkeltsideapplikasjon bygget med Vite og Material-UI. Kirkens ansatte bruker det til å administrere personer, grupper, oppmøte, gaver, innhold og mer.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Installer **Node.js 22+** og **Git** -- se [Forutsetninger](../setup/prerequisites)
- Konfigurer API-målet ditt (demo eller lokalt) -- se [Miljøvariabler](../setup/environment-variables)

</div>

## Oppsett

### 1. Klon repositoriet

```bash
git clone https://github.com/ChurchApps/B1Admin.git
```

### 2. Installer avhengigheter

```bash
cd B1Admin
npm install
```

### 3. Konfigurer miljøvariabler

```bash
cp dotenv.sample.txt .env
```

Åpne `.env` og konfigurer API-endepunktene. Du kan peke dem mot enten det delte demo-API-et (`https://api.demo.churchapps.org`) eller din lokale API-instans. Eksempelfilen kan fortsatt liste utgåtte staging-URL-er; erstatt dem.

### 4. Start utviklingsserveren

```bash
npm start
```

Dette starter Vite-utviklingsserveren. Appen er tilgjengelig i nettleseren din med hot module replacement aktivert.

## Viktige miljøvariabler

| Variabel | Beskrivelse |
|----------|-------------|
| `REACT_APP_STAGE` | Miljønavn (f.eks. `demo` som i eksempelfilen, `prod` eller `selfhost`) |
| `PORT` | Port for utviklingsserveren (standard: `3101`) |
| `REACT_APP_*_API` | API-endepunkt-URL-er for hver modul |

:::info
`postinstall`-skriptet kopierer språk- og CSS-filer fra `@churchapps/apphelper`. Hvis komponentene ser ustilte ut, kjør `npm run postinstall` manuelt.
:::

## Viktige kommandoer

| Kommando | Beskrivelse |
|---------|-------------|
| `npm start` | Start Vite-utviklingsserveren |
| `npm run build` | Produksjonsbygg via Vite |
| `npm run test` | Kjør ende-til-ende-tester med Playwright |
| `npm run lint` | Kjør ESLint med automatisk retting |

## Teknologistakk

- **React 19** med TypeScript
- **Vite** for byggverktøy og utviklingsserver
- **Material-UI 7** for UI-komponenter
- **React Query 5** for serverstatus
- **`@churchapps/apphelper*`**-pakker for delte komponenter

## Distribusjon

Produksjonsbygg distribueres til **S3 + CloudFront**:

1. `npm run build` genererer statiske ressurser
2. Ressursene synkroniseres til en S3-bøtte
3. CloudFront-invalidering utløses for å servere den nye versjonen

:::tip
For detaljerte distribusjonsinstruksjoner, se veiledningen [Distribusjon av webapper](../deployment/web-apps).
:::
