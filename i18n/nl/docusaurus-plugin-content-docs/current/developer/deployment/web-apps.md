---
title: "Web App Deployment"
---

# Web App Deployment

<div class="article-intro">

ChurchApps web-applicaties worden als statische sites in **Amazon S3** met **CloudFront** als CDN geïmplementeerd. Implementaties worden geautomatiseerd via GitHub Actions, maar kunnen ook handmatig worden uitgevoerd indien nodig.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- Stel de web-app lokaal in en verifieer dat deze wordt gebouwd -- zie [Web Apps](../web-apps/)
- Configureer AWS-gegevens met S3- en CloudFront-toegang
- Ken de doel-S3-bucketnaam en CloudFront-distributie-ID

</div>

## Implementatiestappen

1. **Bouw de app** -- genereer de statische output:

   ```bash
   npm run build
   ```

2. **Sync naar S3** -- upload de bouwoutput naar de S3-bucket:

   ```bash
   aws s3 sync build/ s3://bucket-name
   ```

3. **Invalideer CloudFront** -- wis de CDN-cache zodat gebruikers de nieuwste versie ontvangen:

   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

## Geautomatiseerde Implementaties

GitHub Actions-workflows verwerken de implementatie automatisch bij push naar de `main`-branch. De workflow voert alle drie bovenstaande stappen uit -- bouwen, S3 sync en CloudFront-invalidatie -- zonder handmatige bemoeienis.

:::info
U hoeft deze commando's doorgaans niet handmatig uit te voeren. Het samenvoegen van een pull-verzoek in `main` triggert de geautomatiseerde implementatiepipeline.
:::

:::tip
Als u lokaal een build moet verifiëren voordat u implementeert, voert u `npm run build` uit en inspecteert u de output in de `build/`-map. U kunt dit lokaal met elke statische bestandsserver serveren om te bevestigen dat alles werkt.
:::

## Gerelateerde Artikelen

- **[Web Apps](../web-apps/)** -- Setupgidsen voor B1Admin, B1App en LessonsApp
- **[API Deployment](./apis)** -- De backend-API's implementeren
- **[Mobile Deployment](./mobile)** -- Mobiele apps in app-stores implementeren
