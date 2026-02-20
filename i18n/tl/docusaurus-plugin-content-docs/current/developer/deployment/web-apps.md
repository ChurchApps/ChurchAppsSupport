---
title: "Pag-deploy ng Web App"
---

# Pag-deploy ng Web App

<div class="article-intro">

Ang mga ChurchApps web application ay dine-deploy bilang mga static site sa **Amazon S3** na may **CloudFront** bilang CDN. Ang mga pag-deploy ay awtomatiko sa pamamagitan ng GitHub Actions, ngunit maaari ding patakbuhin nang mano-mano kung kinakailangan.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-setup ang web app nang lokal at i-verify na ito ay nagbu-build -- tingnan ang [Mga Web App](../web-apps/)
- I-configure ang mga AWS credential na may access sa S3 at CloudFront
- Alamin ang target na S3 bucket name at CloudFront distribution ID

</div>

## Mga Hakbang sa Pag-deploy

1. **Buuin ang app** -- bumuo ng static output:

   ```bash
   npm run build
   ```

2. **I-sync sa S3** -- i-upload ang build output sa S3 bucket:

   ```bash
   aws s3 sync build/ s3://bucket-name
   ```

3. **I-invalidate ang CloudFront** -- burahin ang CDN cache upang matanggap ng mga gumagamit ang pinakabagong bersyon:

   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

## Mga Automated na Pag-deploy

Ang mga daloy ng trabaho ng GitHub Actions ay awtomatikong hina-handle ang pag-deploy sa pag-push sa `main` branch. Isinasagawa ng workflow ang lahat ng tatlong hakbang sa itaas -- build, S3 sync, at CloudFront invalidation -- nang walang manu-manong interbensyon.

:::info
Karaniwan mong hindi kailangang patakbuhin ang mga utos na ito nang mano-mano. Ang pag-merge ng pull request sa `main` ay nagti-trigger ng automated na deployment pipeline.
:::

:::tip
Kung kailangan mong i-verify ang isang build nang lokal bago mag-deploy, patakbuhin ang `npm run build` at suriin ang output sa direktoryo ng `build/`. Maaari mo itong isilbi nang lokal gamit ang anumang static file server upang makumpirma na gumagana ang lahat.
:::

## Mga Kaugnay na Artikulo

- **[Mga Web App](../web-apps/)** -- Mga gabay sa pag-setup para sa B1Admin, B1App, at LessonsApp
- **[Pag-deploy ng API](./apis)** -- Pag-deploy ng mga backend API
- **[Pag-deploy ng Mobile](./mobile)** -- Pag-deploy ng mga mobile app sa mga app store
