---
title: "LessonsApp"
---

# LessonsApp

<div class="article-intro">

LessonsApp je aplikácia na správu lekcií pre [Lessons.church](https://lessons.church). Poskytuje rozhranie na vytváranie, organizovanie a publikovanie cirkevných učebných osnov a je postavená na Next.js a React.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Nainštalujte **Node.js 22+** a **Git** -- pozrite si [Predpoklady](../setup/prerequisites)
- Nakonfigurujte cieľ API (lokálne LessonsApi) -- pozrite si [Premenné prostredia](../setup/environment-variables)

</div>

:::warning
LessonsApp vyžaduje Node.js 22 alebo novší. Staršie verzie nie sú podporované.
:::

## Nastavenie

### 1. Klonovanie repozitára

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. Inštalácia závislostí

```bash
cd LessonsApp
npm install
```

### 3. Konfigurácia premenných prostredia

Skopírujte vzorový súbor premenných prostredia do `.env` a nakonfigurujte koncové body API:

```bash
cp dotenv.sample.txt .env
```

Aktualizujte URL koncových bodov API tak, aby smerovali na vašu lokálnu inštanciu LessonsApi (`http://localhost:8090`). Staging API pre Lessons bolo vyradené z prevádzky, preto nahraďte všetky URL `api.staging.lessons.church`, ktoré zostali vo vzorovom súbore.

### 4. Spustenie vývojového servera

```bash
npm run dev
```

Vývojový server Next.js sa spustí na [http://localhost:3501](http://localhost:3501).

## Kľúčové príkazy

| Príkaz | Popis |
|---------|-------------|
| `npm run dev` | Spustí vývojový server Next.js na porte 3501 |
| `npm run build` | Produkčné zostavenie cez Next.js |

## Technológie

- **Next.js 16** s TypeScriptom
- **React 19** pre komponenty UI
- **`@churchapps/apphelper*`** balíčky pre zdieľané komponenty

:::info
LessonsApp komunikuje s backendom **LessonsApi**, ktoré je samostatným API oddeleným od hlavného ChurchApps Api. Uistite sa, že vaše prostredie je nakonfigurované so správnym koncovým bodom API pre Lessons.
:::

## Nasadenie

Produkčné zostavenia sa nasadzujú do **S3 + CloudFront**:

1. `npm run build` vygeneruje optimalizované zostavenie Next.js
2. Výstup zostavenia sa synchronizuje do S3 bucketu
3. Spustí sa invalidácia CloudFront, aby sa doručila nová verzia

:::tip
Podrobné pokyny na nasadenie nájdete v sprievodcovi [Nasadenie webových aplikácií](../deployment/web-apps).
:::
