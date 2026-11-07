---
title: "Implementación de aplicaciones web"
description: "Distribuera ChurchApps webbappar som B1 Admin till Amazon S3 och CloudFront, med automatisk GitHub Actions-deploy vid merge eller manuella kommandon."
---

Oops, that wasn't right: the file is for Swedish, not Spanish. Here is the correct version.

---
title: "Distribution av webbappar"
---

# Distribution av webbappar

<div class="article-intro">

ChurchApps webbapplikationer distribueras som statiska webbplatser till **Amazon S3** med **CloudFront** som CDN. Distributionerna automatiseras via GitHub Actions, men kan också köras manuellt vid behov.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Konfigurera webbappen lokalt och kontrollera att den går att bygga -- se [Webbappar](../web-apps/index.md)
- Konfigurera AWS-autentiseringsuppgifter med åtkomst till S3 och CloudFront
- Känna till namnet på målbucketen i S3 och distributions-ID:t för CloudFront

</div>

## Distributionssteg

1. **Bygg appen** -- generera de statiska filerna:

   ```bash
   npm run build
   ```

2. **Synkronisera till S3** -- ladda upp byggresultatet till S3-bucketen:

   ```bash
   aws s3 sync build/ s3://bucket-name
   ```

3. **Ogiltigförklara CloudFront** -- rensa CDN-cachen så att användarna får den senaste versionen:

   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

## Automatiska distributioner

GitHub Actions-arbetsflöden hanterar distributionen automatiskt vid push till grenen `main`. Arbetsflödet utför alla tre stegen ovan -- bygge, synkronisering till S3 och ogiltigförklaring av CloudFront -- utan manuella ingrepp.

:::info
Du behöver normalt sett inte köra dessa kommandon manuellt. När en pull request slås samman till `main` startar den automatiska distributionspipelinen.
:::

:::tip
Om du vill verifiera ett bygge lokalt innan du distribuerar kan du köra `npm run build` och granska resultatet i katalogen `build/`. Du kan servera den lokalt med valfri statisk filserver för att bekräfta att allt fungerar.
:::

## Relaterade artiklar

- **[Webbappar](../web-apps/index.md)** -- Installationsguider för B1Admin, B1App och LessonsApp
- **[API-distribution](./apis.md)** -- Distribution av backend-API:erna
- **[Mobildistribution](./mobile.md)** -- Distribution av mobilappar till appbutikerna
