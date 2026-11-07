---
title: "Razmestitev spletne aplikacije"
description: "Kako namestiti spletne aplikacije ChurchApps, npr. B1 Admin, v Amazon S3 in CloudFront: samodejno prek GitHub Actions ob združitvi ali ročno z ukazi."
---

# Razmestitev spletne aplikacije

<div class="article-intro">

Spletne aplikacije ChurchApps se razmeščajo kot statična spletna mesta v **Amazon S3**, pri čemer je **CloudFront** omrežje za dostavo vsebine (CDN). Razmestitve so samodejne prek GitHub Actions, po potrebi pa jih je mogoče izvesti tudi ročno.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Nastavite spletno aplikacijo lokalno in preverite, ali se gradi -- glejte [Spletne aplikacije](../web-apps/index.md)
- Nastavite poverilnice AWS z dostopom do S3 in CloudFront
- Poznajte ime ciljnega paketa S3 in ID distribucije CloudFront

</div>

## Koraki razmestitve

1. **Zgradite aplikacijo** -- ustvarite statični izhod:

   ```bash
   npm run build
   ```

2. **Sinhronizirajte z S3** -- naložite izhod gradnje v paket S3:

   ```bash
   aws s3 sync build/ s3://bucket-name
   ```

3. **Razveljavite predpomnilnik CloudFront** -- počistite predpomnilnik CDN, da uporabniki prejmejo najnovejšo različico:

   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

## Samodejne razmestitve

Delovni tokovi GitHub Actions samodejno obravnavajo razmestitev ob potisku v vejo `main`. Delovni tok izvede vse tri zgoraj navedene korake -- gradnjo, sinhronizacijo S3 in razveljavitev CloudFront -- brez ročnega posredovanja.

:::info
Te ukaze običajno ni treba izvajati ročno. Združitev zahteve za vlečenje v `main` sproži samodejni cevovod razmestitve.
:::

:::tip
Če želite pred razmestitvijo lokalno preveriti gradnjo, zaženite `npm run build` in preglejte izhod v imeniku `build/`. Lahko ga postrežete zderhkoli strežnikom statičnih datotek, da potrdite, da vse deluje.
:::

## Sorodni članki

- **[Spletne aplikacije](../web-apps/index.md)** -- Vodniki za nastavitev za B1Admin, B1App in LessonsApp
- **[Razmestitev API-jev](./apis.md)** -- Razmestitev zaledne programske opreme API
- **[Razmestitev mobilnih aplikacij](./mobile.md)** -- Razmestitev mobilnih aplikacij v trgovine z aplikacijami
