---
title: "Webapp-installation"
---

# Webapp-installation

<div class="article-intro">

ChurchApps-webapplikationer implementeres som statiske websteder til **Amazon S3** med **CloudFront** som CDN. Installationer automatiseres gennem GitHub Actions, men kan også køres manuelt, når det er nødvendigt.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Opsætning af webapp lokalt og bekræft, at den bygger -- se [Webapps](../web-apps/)
- Konfigurér AWS-legitimationsoplysninger med S3- og CloudFront-adgang
- Kend S3-bucketnavnet og CloudFront-distribuerings-ID'et for målet

</div>

## Installationstrin

1. **Byg appen** -- generer det statiske output:

   ```bash
   npm run build
   ```

2. **Synkroniser til S3** -- upload byggeoutput til S3-bucketen:

   ```bash
   aws s3 sync build/ s3://bucket-name
   ```

3. **Ugyldigd CloudFront** -- ryd CDN-cachen, så brugerne modtager den seneste version:

   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

## Automatiserede installationer

GitHub Actions-workflows håndterer installation automatisk ved push til `main`-grenen. Workflow'en udfører alle tre trin ovenfor -- byg, S3 sync og CloudFront-ugyldighed -- uden manuel indgribelse.

:::info
Du behøver typisk ikke at køre disse kommandoer manuelt. Fusionering af en pull request til `main` udløser den automatiserede installationspipeline.
:::

:::tip
Hvis du har brug for at bekræfte en build lokalt før installation, skal du køre `npm run build` og inspicere outputtet i `build/`-mappen. Du kan betjene det lokalt med en statisk filserver for at bekræfte, at alt fungerer.
:::

## Relaterede artikler

- **[Webapps](../web-apps/)** -- Opsætningsvejledninger til B1Admin, B1App og LessonsApp
- **[API-installation](./apis)** -- Installation af backend-API'erne
- **[Mobilinstallation](./mobile)** -- Installation af mobilapps til app-butikkerne
