---
title: "Nasazení webové aplikace"
---

# Nasazení webové aplikace

<div class="article-intro">

Webové aplikace ChurchApps se nasazují jako statické weby do **Amazon S3** s **CloudFront** jako CDN. Nasazení probíhají automaticky přes GitHub Actions, ale v případě potřeby je lze spustit i ručně.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Nastavte webovou aplikaci lokálně a ověřte, že se sestaví -- viz [Webové aplikace](../web-apps/)
- Nakonfigurujte přihlašovací údaje AWS s přístupem k S3 a CloudFront
- Zjistěte název cílového S3 bucketu a ID distribuce CloudFront

</div>

## Kroky nasazení

1. **Sestavte aplikaci** -- vygenerujte statický výstup:

   ```bash
   npm run build
   ```

2. **Synchronizujte do S3** -- nahrajte výstup sestavení do S3 bucketu:

   ```bash
   aws s3 sync build/ s3://bucket-name
   ```

3. **Zneplatněte CloudFront** -- vymažte cache CDN, aby uživatelé dostali nejnovější verzi:

   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

## Automatická nasazení

Nasazení automaticky zajišťují pracovní postupy GitHub Actions při odeslání změn do větve `main`. Tento postup provádí všechny tři výše uvedené kroky -- sestavení, synchronizaci S3 a zneplatnění CloudFront -- bez zásahu člověka.

:::info
Tyto příkazy obvykle nemusíte spouštět ručně. Sloučení pull requestu do větve `main` spustí automatizovaný proces nasazení.
:::

:::tip
Pokud potřebujete před nasazením ověřit sestavení lokálně, spusťte `npm run build` a zkontrolujte výstup ve složce `build/`. Můžete jej spustit lokálně pomocí libovolného serveru statických souborů a ověřit, že vše funguje.
:::

## Související články

- **[Webové aplikace](../web-apps/)** -- Návody na nastavení pro B1Admin, B1App a LessonsApp
- **[Nasazení API](./apis)** -- Nasazení backendových API
- **[Nasazení mobilních aplikací](./mobile)** -- Nasazení mobilních aplikací do obchodů s aplikacemi
