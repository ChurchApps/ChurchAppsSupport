---
title: "Žiniatinklio programos diegimas"
---

# Žiniatinklio programos diegimas

<div class="article-intro">

ChurchApps žiniatinklio programos diegiamos kaip statinės svetainės į **Amazon S3**, o turinio pristatymo tinklą (CDN) užtikrina **CloudFront**. Diegimai automatizuoti per GitHub Actions, tačiau prireikus juos galima vykdyti ir rankiniu būdu.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Nustatykite žiniatinklio programą lokaliai ir įsitikinkite, kad ji sukompiliuojama -- žr. [Žiniatinklio programos](../web-apps/)
- Sukonfigūruokite AWS prisijungimo duomenis su S3 ir CloudFront prieigos teisėmis
- Žinokite tikslinio S3 bucket pavadinimą ir CloudFront distribucijos ID

</div>

## Diegimo žingsniai

1. **Sukompiliuokite programą** -- sugeneruokite statinį rezultatą:

   ```bash
   npm run build
   ```

2. **Sinchronizuokite su S3** -- įkelkite kompiliavimo rezultatus į S3 bucket:

   ```bash
   aws s3 sync build/ s3://bucket-name
   ```

3. **Panaikinkite CloudFront talpyklą** -- išvalykite CDN talpyklą, kad naudotojai gautų naujausią versiją:

   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

## Automatiniai diegimai

GitHub Actions darbo eigos automatiškai atlieka diegimą, kai pakeitimai įkeliami į `main` šaką. Darbo eiga atlieka visus tris aukščiau nurodytus veiksmus -- kompiliavimą, S3 sinchronizavimą ir CloudFront talpyklos panaikinimą -- be rankinio įsikišimo.

:::info
Paprastai šių komandų vykdyti rankiniu būdu nereikia. Sujungus pull request į `main` šaką, paleidžiamas automatinis diegimo procesas.
:::

:::tip
Jei prieš diegimą norite lokaliai patikrinti kompiliavimą, paleiskite `npm run build` ir apžiūrėkite rezultatus `build/` kataloge. Galite juos paleisti bet kuriuo statinių failų serveriu, kad įsitikintumėte, jog viskas veikia.
:::

## Susiję straipsniai

- **[Žiniatinklio programos](../web-apps/)** -- Sąrankos vadovai, skirti B1Admin, B1App ir LessonsApp
- **[API diegimas](./apis)** -- Backend API diegimas
- **[Mobiliųjų programų diegimas](./mobile)** -- Mobiliųjų programų diegimas į programėlių parduotuves
