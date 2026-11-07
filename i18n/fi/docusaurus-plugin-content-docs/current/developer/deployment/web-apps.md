---
title: "Verkkosovelluksen käyttöönotto"
description: "Ohjeet ChurchApps-verkkosovellusten (esim. B1 Admin) julkaisuun Amazon S3:een ja CloudFrontiin: automaattiset GitHub Actions -julkaisut tai manuaaliset komennot."
---

# Verkkosovelluksen käyttöönotto

<div class="article-intro">

ChurchAppsin verkkosovellukset otetaan käyttöön staattisina sivustoina **Amazon S3**:een, ja sisältöjakelussa (CDN) käytetään **CloudFrontia**. Käyttöönotot automatisoidaan GitHub Actionsin avulla, mutta ne voidaan tarvittaessa suorittaa myös manuaalisesti.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Määritä verkkosovellus paikallisesti ja varmista, että se käännetään onnistuneesti -- katso [Verkkosovellukset](../web-apps/index.md)
- Määritä AWS-tunnukset, joilla on S3- ja CloudFront-käyttöoikeudet
- Tiedä kohde-S3-bucketin nimi ja CloudFront-jakelun tunnus

</div>

## Käyttöönoton vaiheet

1. **Käännä sovellus** -- luo staattinen tuloste:

   ```bash
   npm run build
   ```

2. **Synkronoi S3:een** -- lataa käännöksen tuloste S3-bucketiin:

   ```bash
   aws s3 sync build/ s3://bucket-name
   ```

3. **Mitätöi CloudFront-välimuisti** -- tyhjennä CDN-välimuisti, jotta käyttäjät saavat uusimman version:

   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

## Automatisoidut käyttöönotot

GitHub Actions -työnkulut hoitavat käyttöönoton automaattisesti, kun muutoksia viedään `main`-haaraan. Työnkulku suorittaa kaikki kolme yllä mainittua vaihetta -- käännöksen, S3-synkronoinnin ja CloudFront-välimuistin mitätöinnin -- ilman manuaalista väliintuloa.

:::info
Näitä komentoja ei yleensä tarvitse suorittaa käsin. Pull requestin yhdistäminen `main`-haaraan käynnistää automatisoidun käyttöönottoputken.
:::

:::tip
Jos haluat varmistaa käännöksen paikallisesti ennen käyttöönottoa, suorita `npm run build` ja tarkista tuloste `build/`-hakemistosta. Voit tarjoilla sen paikallisesti millä tahansa staattisten tiedostojen palvelimella ja varmistaa, että kaikki toimii.
:::

## Aiheeseen liittyvät artikkelit

- **[Verkkosovellukset](../web-apps/index.md)** -- Asennusohjeet B1Adminille, B1Appille ja LessonsAppille
- **[API-käyttöönotto](./apis.md)** -- Taustajärjestelmän API-rajapintojen käyttöönotto
- **[Mobiilin käyttöönotto](./mobile.md)** -- Mobiilisovellusten julkaiseminen sovelluskauppoihin
