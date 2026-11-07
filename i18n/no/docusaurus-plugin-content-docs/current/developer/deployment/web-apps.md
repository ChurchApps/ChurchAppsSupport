---
title: "Webappdistribusjon"
description: "Trinnene for å distribuere ChurchApps-webapper, som B1 Admin, til Amazon S3 og CloudFront, med automatisk distribusjon via GitHub Actions ved sammenslåing eller manuelle kommandoer."
---

# Webappdistribusjon

<div class="article-intro">

ChurchApps webapplikasjoner distribueres som statiske nettsteder til **Amazon S3** med **CloudFront** som CDN. Distribusjoner er automatisert gjennom GitHub Actions, men kan også kjøres manuelt ved behov.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp webappen lokalt og verifiser at den bygger -- se [Webapper](../web-apps/index.md)
- Konfigurer AWS-legitimasjon med S3- og CloudFront-tilgang
- Kjenn til mål-S3-bøttenavnet og CloudFront-distribusjons-ID-en

</div>

## Distribusjonssteg

1. **Bygg appen** -- generer den statiske utdataen:

   ```bash
   npm run build
   ```

2. **Synkroniser til S3** -- last opp byggeutdataen til S3-bøtten:

   ```bash
   aws s3 sync build/ s3://bucket-name
   ```

3. **Invalider CloudFront** -- tøm CDN-hurtigbufferen slik at brukerne mottar den nyeste versjonen:

   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

## Automatiserte distribusjoner

GitHub Actions-arbeidsflyter håndterer distribusjon automatisk ved push til `main`-grenen. Arbeidsflyten utfører alle tre stegene ovenfor -- bygging, S3-synkronisering og CloudFront-invalidering -- uten manuell inngripen.

:::info
Du trenger vanligvis ikke kjøre disse kommandoene manuelt. Sammenslåing av en pull request til `main` utløser den automatiserte distribusjonspipelinen.
:::

:::tip
Hvis du trenger å verifisere en bygging lokalt før distribusjon, kjør `npm run build` og inspiser utdataen i `build/`-katalogen. Du kan servere den lokalt med hvilken som helst statisk filserver for å bekrefte at alt fungerer.
:::

## Relaterte artikler

- **[Webapper](../web-apps/index.md)** -- Oppsettsguider for B1Admin, B1App og LessonsApp
- **[API-distribusjon](./apis.md)** -- Distribuere backend-API-ene
- **[Mobildistribusjon](./mobile.md)** -- Distribuere mobilapper til appbutikker
