---
title: "LessonsApp"
description: "Lokální nastavení editoru lekcí LessonsApp (Next.js) na Node.js 22+, připojení k lokálnímu LessonsApi a popis sestavení a nasazení na S3/CloudFront."
---

# LessonsApp

<div class="article-intro">

LessonsApp je aplikace pro správu lekcí pro [Lessons.church](https://lessons.church). Poskytuje rozhraní pro vytváření, organizování a publikování církevních kurikul lekcí a je postavena na Next.js a Reactu.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Nainstalujte **Node.js 22+** a **Git** -- viz [Požadavky](../setup/prerequisites.md)
- Nakonfigurujte cíl API (místní LessonsApi) -- viz [Proměnné prostředí](../setup/environment-variables.md)

</div>

:::warning
LessonsApp vyžaduje Node.js 22 nebo novější. Starší verze nejsou podporovány.
:::

## Nastavení

### 1. Klonování repozitáře

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. Instalace závislostí

```bash
cd LessonsApp
npm install
```

### 3. Konfigurace proměnných prostředí

Zkopírujte ukázkový soubor proměnných prostředí do `.env` a nakonfigurujte koncové body API:

```bash
cp dotenv.sample.txt .env
```

Aktualizujte URL koncových bodů API tak, aby ukazovaly na vaši místní instanci LessonsApi (`http://localhost:8090`). Testovací (staging) Lessons API bylo vyřazeno, proto nahraďte všechny URL `api.staging.lessons.church`, které v ukázkovém souboru zůstaly.

### 4. Spuštění vývojového serveru

```bash
npm run dev
```

Vývojový server Next.js se spustí na adrese [http://localhost:3501](http://localhost:3501).

## Klíčové příkazy

| Příkaz | Popis |
|---------|-------------|
| `npm run dev` | Spustí vývojový server Next.js na portu 3501 |
| `npm run build` | Produkční sestavení pomocí Next.js |

## Technologie

- **Next.js 16** s TypeScriptem
- **React 19** pro komponenty uživatelského rozhraní
- Balíčky **`@churchapps/apphelper*`** pro sdílené komponenty

:::info
LessonsApp komunikuje s backendem **LessonsApi**, který je samostatným API odděleným od hlavního API ChurchApps. Ujistěte se, že je vaše prostředí nakonfigurováno se správným koncovým bodem API pro lekce.
:::

## Nasazení

Produkční sestavení se nasazují do **S3 + CloudFront**:

1. `npm run build` vygeneruje optimalizované sestavení Next.js
2. Výstup sestavení se synchronizuje do bucketu S3
3. Spustí se invalidace CloudFront, aby se doručovala nová verze

:::tip
Podrobné pokyny k nasazení najdete v průvodci [Nasazení webových aplikací](../deployment/web-apps.md).
:::
