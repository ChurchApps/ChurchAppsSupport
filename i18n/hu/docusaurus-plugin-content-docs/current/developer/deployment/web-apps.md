---
title: "Webalkalmazás telepítése"
description: "Lépések a B1 Admin és más ChurchApps webalkalmazások telepítéséhez Amazon S3-ra és CloudFrontra: automatikus GitHub Actions-telepítés vagy kézi parancsok."
---

# Webalkalmazás telepítése

<div class="article-intro">

A ChurchApps webalkalmazásai statikus webhelyekként kerülnek telepítésre az **Amazon S3**-ra, a **CloudFront** tartalomkézbesítő hálózattal (CDN) kiegészítve. A telepítések a GitHub Actions segítségével automatizáltak, de szükség esetén manuálisan is futtathatók.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Állítsa be a webalkalmazást helyileg, és ellenőrizze, hogy sikeresen felépül-e -- lásd: [Webalkalmazások](../web-apps/index.md)
- Konfigurálja az AWS hitelesítő adatokat, amelyek S3 és CloudFront hozzáféréssel rendelkeznek
- Ismerje a célzott S3 vödör (bucket) nevét és a CloudFront disztribúció azonosítóját

</div>

## Telepítési lépések

1. **Az alkalmazás összeállítása** -- a statikus kimenet létrehozása:

   ```bash
   npm run build
   ```

2. **Szinkronizálás S3-ra** -- a build kimenet feltöltése az S3 vödörbe:

   ```bash
   aws s3 sync build/ s3://bucket-name
   ```

3. **CloudFront érvénytelenítése** -- a CDN gyorsítótár törlése, hogy a felhasználók a legfrissebb verziót kapják:

   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

## Automatikus telepítések

A GitHub Actions munkafolyamatok automatikusan kezelik a telepítést a `main` ágra történő push esetén. A munkafolyamat mind a három fenti lépést elvégzi -- felépítés, S3-szinkronizálás és CloudFront-érvénytelenítés -- manuális beavatkozás nélkül.

:::info
Általában nem kell manuálisan futtatnia ezeket a parancsokat. A pull request `main` ágba történő egyesítése elindítja az automatikus telepítési folyamatot.
:::

:::tip
Ha a telepítés előtt helyileg szeretné ellenőrizni a buildet, futtassa az `npm run build` parancsot, és vizsgálja meg a `build/` könyvtárban lévő kimenetet. Bármely statikus fájlkiszolgálóval helyileg is kiszolgálhatja, hogy megbizonyosodjon arról, hogy minden működik.
:::

## Kapcsolódó cikkek

- **[Webalkalmazások](../web-apps/index.md)** -- Beállítási útmutatók a B1Admin, B1App és LessonsApp alkalmazásokhoz
- **[API telepítés](./apis.md)** -- A háttérszolgáltatások (API-k) telepítése
- **[Mobil telepítés](./mobile.md)** -- Mobilalkalmazások közzététele az alkalmazásboltokban
