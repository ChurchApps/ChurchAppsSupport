---
title: "B1 Admin"
description: "B1 Admin helyi beállítása: a React/Vite-irányítópult klónozása, API-végpontok megadása a .env-ben, fejlesztői szerver indítása."
---

# B1 Admin

<div class="article-intro">

A B1Admin az egyházi adminisztrációs vezérlőpult, egy React alapú egyoldalas alkalmazás (SPA), amelyet Vite-tal és Material-UI-val építettek. Az egyházi munkatársak ezzel kezelik a személyeket, csoportokat, részvételt, adományokat, tartalmakat és egyebeket.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Telepítse a **Node.js 22+** verziót és a **Git**-et -- lásd: [Előfeltételek](../setup/prerequisites.md)
- Állítsa be az API célpontot (demo vagy helyi) -- lásd: [Környezeti változók](../setup/environment-variables.md)

</div>

## Beállítás

### 1. A tároló klónozása

```bash
git clone https://github.com/ChurchApps/B1Admin.git
```

### 2. Függőségek telepítése

```bash
cd B1Admin
npm install
```

### 3. Környezeti változók beállítása

```bash
cp dotenv.sample.txt .env
```

Nyissa meg a `.env` fájlt, és állítsa be az API végpontokat. Beállíthatja őket a megosztott demo API-ra (`https://api.demo.churchapps.org`) vagy a saját helyi API-példányára. A mintafájl még tartalmazhat visszavont staging URL-eket; ezeket cserélje le.

### 4. A fejlesztői szerver indítása

```bash
npm start
```

Ez elindítja a Vite fejlesztői szervert. Az alkalmazás a böngészőben lesz elérhető, a forrókód-cserével (hot module replacement) együtt.

## Fontos környezeti változók

| Változó | Leírás |
|----------|-------------|
| `REACT_APP_STAGE` | Környezet neve (pl. `demo` a mintafájlban, `prod` vagy `selfhost`) |
| `PORT` | Fejlesztői szerver portja (alapértelmezett: `3101`) |
| `REACT_APP_*_API` | Az API végpont URL-jei modulonként |

:::info
A `postinstall` szkript a `@churchapps/apphelper` csomagból másolja a nyelvi és CSS fájlokat. Ha a komponensek stílus nélkül jelennek meg, futtassa kézzel az `npm run postinstall` parancsot.
:::

## Fontos parancsok

| Parancs | Leírás |
|---------|-------------|
| `npm start` | Vite fejlesztői szerver indítása |
| `npm run build` | Éles build készítése Vite-tal |
| `npm run test` | End-to-end tesztek futtatása Playwright-tal |
| `npm run lint` | ESLint futtatása automatikus javítással |

## Technológiai verem

- **React 19** TypeScripttel
- **Vite** a build eszközökhöz és a fejlesztői szerverhez
- **Material-UI 7** a felhasználói felület komponenseihez
- **React Query 5** a szerveroldali állapotkezeléshez
- **`@churchapps/apphelper*`** csomagok a megosztott komponensekhez

## Üzembe helyezés

Az éles buildeket **S3 + CloudFront** szolgáltatásba helyezzük:

1. A `npm run build` statikus eszközöket generál
2. Az eszközöket szinkronizáljuk egy S3 bucketbe
3. CloudFront invalidációt indítunk, hogy az új verzió legyen kiszolgálva

:::tip
A részletes üzembe helyezési útmutatóért lásd a [Webalkalmazás üzembe helyezése](../deployment/web-apps.md) útmutatót.
:::
