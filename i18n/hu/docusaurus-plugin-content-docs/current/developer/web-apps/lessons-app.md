---
title: "LessonsApp"
---

# LessonsApp

<div class="article-intro">

A LessonsApp a [Lessons.church](https://lessons.church) tartalomkezelő alkalmazása a leckék számára. Felületet biztosít egyházi leckesorozatok létrehozásához, rendezéséhez és közzétételéhez. Next.js és React segítségével készült.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Telepítse a **Node.js 22+** verziót és a **Git**-et -- lásd: [Előfeltételek](../setup/prerequisites)
- Állítsa be az API-célpontot (helyi LessonsApi) -- lásd: [Környezeti változók](../setup/environment-variables)

</div>

:::warning
A LessonsApp a Node.js 22-es vagy újabb verzióját igényli. A korábbi verziók nem támogatottak.
:::

## Beállítás

### 1. A tárolóház klónozása

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. Függőségek telepítése

```bash
cd LessonsApp
npm install
```

### 3. Környezeti változók beállítása

Másolja a környezeti változók mintafájlját `.env` néven, majd állítsa be az API-végpontokat:

```bash
cp dotenv.sample.txt .env
```

Módosítsa az API-végpont URL-jeit úgy, hogy a helyi LessonsApi példányra mutassanak (`http://localhost:8090`). A staging Lessons API már nem üzemel, ezért cserélje le a mintafájlban szereplő `api.staging.lessons.church` URL-eket.

### 4. A fejlesztői szerver indítása

```bash
npm run dev
```

A Next.js fejlesztői szerver a [http://localhost:3501](http://localhost:3501) címen indul el.

## Fontos parancsok

| Parancs | Leírás |
|---------|--------|
| `npm run dev` | Next.js fejlesztői szerver indítása a 3501-es porton |
| `npm run build` | Éles build készítése a Next.js segítségével |

## Technológiai verem

- **Next.js 16** TypeScripttel
- **React 19** a felhasználói felület komponenseihez
- **`@churchapps/apphelper*`** csomagok a megosztott komponensekhez

:::info
A LessonsApp a **LessonsApi** háttérrendszerrel kommunikál, amely különálló API a fő ChurchApps Api-tól. Ügyeljen rá, hogy a környezete a helyes Lessons API-végponttal legyen beállítva.
:::

## Telepítés

Az éles buildek **S3 + CloudFront** rendszerbe kerülnek:

1. A `npm run build` parancs elkészíti az optimalizált Next.js buildet
2. A build kimenete szinkronizálódik egy S3 tárolóba
3. CloudFront-invalidálás indul, hogy az új verzió legyen kiszolgálva

:::tip
A részletes telepítési útmutatóért lásd: [Webalkalmazások telepítése](../deployment/web-apps).
:::
