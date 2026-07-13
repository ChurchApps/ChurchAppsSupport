---
title: "Kufakwa Kwe-Web App"
---

# Kufakwa Kwe-Web App

<div class="article-intro">

Tinhlelo te-web te-ChurchApps tifakwa njengemasayithi lamile ku-**Amazon S3** kanye ne-**CloudFront** njenge-CDN. Kufakwa kwentiwa ngco (automated) ngeluhambo lwe-GitHub Actions, kodvwa kungagijimiswa nangesandla (manually) nangabe kudzingeka.

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekutsi Ucale</h4>

- Hlela uhlelo lwe-web ngasekhaya bese uchaka kutsi liyakha -- bona [Tinhlelo Te-Web](../web-apps/)
- Hlela ema-credential e-AWS anemvumo ye-S3 kanye ne-CloudFront
- Yati ligama le-bucket ye-S3 lehlosiwe kanye ne-ID ye-CloudFront distribution

</div>

## Tinyatselo Tekufakwa

1. **Yakha uhlelo** -- khokhisa lokukhishwa lokumile:

   ```bash
   npm run build
   ```

2. **Hlanganisa (sync) ku-S3** -- layisela (upload) lokukhishwe kwakha ku-bucket ye-S3:

   ```bash
   aws s3 sync build/ s3://bucket-name
   ```

3. **Yenta i-CloudFront ibe ngasetulu (invalidate)** -- sulasula i-cache ye-CDN kute basebentisi batfole vasyini lensha kakhulu:

   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

## Kufakwa Lokwentiwa Ngco

Tinhlelo te-GitHub Actions tiphatsa kufakwa ngco nakukhona kucindzetelwa (push) ku-luhlaka (branch) lwe-`main`. Luhlelo luyenta tonkhe tinyatselo letintsatfu letingetulu -- kwakha, kuhlanganisa ku-S3, kanye nekwenta i-CloudFront ibe ngasetulu -- ngaphandle kwekungenela ngesandla.

:::info
Ngalokuvamile awudzingi kugijimisa lemiyalo ngesandla. Kuhlanganisa (merging) i-pull request ku-`main` kucalisa luhambo lwekufakwa lolwentiwa ngco.
:::

:::tip
Nangabe udzinga kuchaka lokwakhiwe ngasekhaya ngaphambi kwekufaka, gijimisa i-`npm run build` bese uhlola lokukhishiwe ku-directory ye-`build/`. Ungakusatjalalisa ngasekhaya nganoma yimuphi umnikeli wemafayela lamile (static file server) kute uchake kutsi konkhe kuyasebenta.
:::

## Emahloko Lahlobene

- **[Tinhlelo Te-Web](../web-apps/)** -- Imihlahlandlela yekuhlelwa ye-B1Admin, B1App, ne-LessonsApp
- **[Kufakwa Kwe-API](./apis)** -- Kufaka ema-backend API
- **[Kufakwa Kwetinhlelo Teselula](./mobile)** -- Kufaka tinhlelo teselula etitolo tetinhlelo
