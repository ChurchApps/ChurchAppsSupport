---
title: "Nasadenie webovej aplikácie"
---

# Nasadenie webovej aplikácie

<div class="article-intro">

Webové aplikácie ChurchApps sa nasadzujú ako statické weby do **Amazon S3** s **CloudFront** ako CDN. Nasadenia sú automatizované prostredníctvom GitHub Actions, ale v prípade potreby ich možno spustiť aj manuálne.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Nastavte webovú aplikáciu lokálne a overte, že sa úspešne zostaví -- pozrite si [Webové aplikácie](../web-apps/)
- Nakonfigurujte prihlasovacie údaje AWS s prístupom k S3 a CloudFront
- Zistite názov cieľového bucketu S3 a ID distribúcie CloudFront

</div>

## Kroky nasadenia

1. **Zostavte aplikáciu** -- vygenerujte statický výstup:

   ```bash
   npm run build
   ```

2. **Synchronizujte s S3** -- nahrajte výstup zostavenia do bucketu S3:

   ```bash
   aws s3 sync build/ s3://bucket-name
   ```

3. **Invalidujte CloudFront** -- vymažte vyrovnávaciu pamäť CDN, aby používatelia dostali najnovšiu verziu:

   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

## Automatizované nasadenia

Pracovné postupy GitHub Actions zabezpečujú nasadenie automaticky pri odoslaní zmien do vetvy `main`. Pracovný postup vykonáva všetky tri kroky uvedené vyššie -- zostavenie, synchronizáciu s S3 a invalidáciu CloudFront -- bez manuálneho zásahu.

:::info
Tieto príkazy zvyčajne nemusíte spúšťať manuálne. Zlúčenie žiadosti o stiahnutie (pull request) do vetvy `main` spustí automatizovaný proces nasadenia.
:::

:::tip
Ak potrebujete pred nasadením overiť zostavenie lokálne, spustite `npm run build` a skontrolujte výstup v adresári `build/`. Na lokálne spustenie môžete použiť ľubovoľný server statických súborov a overiť, že všetko funguje.
:::

## Súvisiace články

- **[Webové aplikácie](../web-apps/)** -- Sprievodcovia nastavením pre B1Admin, B1App a LessonsApp
- **[Nasadenie API](./apis)** -- Nasadenie backendových API
- **[Nasadenie mobilnej aplikácie](./mobile)** -- Nasadenie mobilných aplikácií do obchodov s aplikáciami
