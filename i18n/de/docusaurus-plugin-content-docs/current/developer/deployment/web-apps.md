---
title: "Web-App-Deployment"
---

# Web-App-Deployment

<div class="article-intro">

ChurchApps Web-Anwendungen werden als statische Seiten zu **Amazon S3** mit **CloudFront** als CDN deployed. Deployments werden durch GitHub Actions automatisiert, können aber auch manuell bei Bedarf ausgeführt werden.

</div>

<div class="prereqs">
<h4>Vor dem Start</h4>

- Richten Sie die Web-App lokal ein und verifizieren Sie, dass sie built — siehe [Web-Apps](../web-apps/)
- Konfigurieren Sie AWS-Anmeldedaten mit S3- und CloudFront-Zugriff
- Kennen Sie den Ziel-S3-Bucket-Namen und die CloudFront-Distribution-ID

</div>

## Deployment-Schritte

1. **App bauen** — statischen Output generieren:

   ```bash
   npm run build
   ```

2. **Zu S3 synchen** — Build-Output zum S3-Bucket hochladen:

   ```bash
   aws s3 sync build/ s3://bucket-name
   ```

3. **CloudFront invalidieren** — CDN-Cache löschen, sodass Benutzer die neueste Version erhalten:

   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

## Automatisierte Deployments

GitHub Actions-Workflows handhaben Deployment automatisch beim Push zum `main`-Branch. Der Workflow führt alle drei oben beschriebenen Schritte durch — Build, S3-Sync und CloudFront-Invalidation — ohne manuelle Intervention.

:::info
Sie müssen diese Befehle typischerweise nicht manuell ausführen. Das Mergen eines Pull-Requests in `main` triggert die automatisierte Deployment-Pipeline.
:::

:::tip
Wenn Sie einen Build lokal vor dem Deployment verifizieren möchten, führen Sie `npm run build` aus und überprüfen Sie den Output im `build/`-Verzeichnis. Sie können es mit jedem statischen Dateiserver lokal bedienen, um alles zu bestätigen.
:::

## Verwandte Artikel

- **[Web-Apps](../web-apps/)** — Setup-Leitfäden für B1Admin, B1App und LessonsApp
- **[API-Deployment](./apis)** — Backend-APIs deployen
- **[Mobile-Deployment](./mobile)** — Mobile-Apps an App-Stores deployen
