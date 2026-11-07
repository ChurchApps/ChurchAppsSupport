---
title: "Implementarea aplicației web"
description: "Pași pentru implementarea aplicațiilor web ChurchApps (ex. B1 Admin) pe Amazon S3 și CloudFront, prin GitHub Actions la îmbinare sau manual."
---

# Implementarea aplicației web

<div class="article-intro">

Aplicațiile web ChurchApps sunt implementate ca site-uri statice pe **Amazon S3**, cu **CloudFront** ca rețea de livrare a conținutului (CDN). Implementările sunt automatizate prin GitHub Actions, dar pot fi rulate și manual, atunci când este necesar.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Configurați aplicația web local și verificați că se compilează corect -- consultați [Aplicații web](../web-apps/index.md)
- Configurați credențialele AWS cu acces la S3 și CloudFront
- Cunoașteți numele bucket-ului S3 țintă și ID-ul distribuției CloudFront

</div>

## Pașii de implementare

1. **Compilați aplicația** -- generați rezultatul static:

   ```bash
   npm run build
   ```

2. **Sincronizați cu S3** -- încărcați rezultatul compilării în bucket-ul S3:

   ```bash
   aws s3 sync build/ s3://bucket-name
   ```

3. **Invalidați CloudFront** -- goliți cache-ul CDN, astfel încât utilizatorii să primească cea mai recentă versiune:

   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

## Implementările automate

Workflow-urile GitHub Actions gestionează automat implementarea la fiecare push pe ramura `main`. Workflow-ul execută toți cei trei pași de mai sus -- compilarea, sincronizarea cu S3 și invalidarea CloudFront -- fără intervenție manuală.

:::info
De obicei, nu este necesar să rulați aceste comenzi manual. Îmbinarea unei pull request în `main` declanșează pipeline-ul automat de implementare.
:::

:::tip
Dacă doriți să verificați o compilare local înainte de implementare, rulați `npm run build` și inspectați rezultatul din directorul `build/`. Îl puteți servi local cu orice server de fișiere statice pentru a confirma că totul funcționează.
:::

## Articole înrudite

- **[Aplicații web](../web-apps/index.md)** -- Ghiduri de configurare pentru B1Admin, B1App și LessonsApp
- **[Implementarea API-ului](./apis.md)** -- Implementarea API-urilor backend
- **[Implementarea aplicațiilor mobile](./mobile.md)** -- Implementarea aplicațiilor mobile în magazinele de aplicații
