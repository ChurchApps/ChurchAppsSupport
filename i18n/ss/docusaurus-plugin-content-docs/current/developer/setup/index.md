---
title: "Kuhlelwa"
---

# Kuhlelwa

<div class="article-intro">

Lesigaba sikuhambisa ekuhleleni indzawo yekutfutfukisa yasekhaya (local development environment) yemaphrojekthi e-ChurchApps. Ungakhetsa kukhomba i-frontend yakho kuma-staging API lasabelwanako kute utfutfukise ngesivinini, kumbe ugijimise sonkhe situlo (full stack) ngasekhaya kute usebente eceleni kwe-backend.

</div>

## Tindlela Letimbili

Kunetindlela letimbili tekutfutfukisa ngasekhaya, kuya ngekutsi udzinga malini yesitulo (stack):

### 1. Khomba ku-Staging APIs (Lokulula Kakhulu)

Nangabe usebenta ku-**phrojekthi ye-frontend** (uhlelo lwe-web, uhlelo lweselula, kumbe uhlelo lwe-desktop), indlela lesheshako kakhulu kukukhomba uhlelo lwakho lwasekhaya kuma-staging API lasabelwanako. Ku-database noma kuhlelwa kwe-backend akudzingeki.

I-base URL ye-staging API ngu:

```
https://api.staging.churchapps.org
```

Ngamunye we-module ye-API iyatfolakala endleleni (path) ngentasi kwalobu-base, sibonelo:

```
https://api.staging.churchapps.org/membership
https://api.staging.churchapps.org/attendance
https://api.staging.churchapps.org/giving
```

:::tip
Lendlela ikuvumela kutsi ucale kwenta shintjo ku-frontend ngemaminithi lambalwa. Yiyo indlela leyincoshwako kubantfu labanikela umnikelo (contributors) labanyenti.
:::

### 2. Gijimisa Konkhe Ngasekhaya

Nangabe udzinga kushintja i-code ye-API kumbe usebenta ungakho ku-inthanethi (offline), ungagijimisa sonkhe situlo ngasekhaya. Loku kudzinga i-MySQL 8.0+ kanye nekuhlelwa lokwengeteliwe. Bona umhlahlandlela we-[API local setup](../api/local-setup) kutfola imibono lecwebekile.

## Kucala

Landzela emakhasi ngalendlela:

1. **[Tidzingo Tekucala](prerequisites)** -- Faka tinsimbi letidzingekako (Node.js, Git, MySQL, njll.)
2. **[Simo Sonkhe Semaphrojekthi](project-overview)** -- Condza kutsi ngimaphi emaphrojekthi lakhona nekutsi enta ini
3. **[Emavariyebuli Endzawo](environment-variables)** -- Hlela emafayela akho e-`.env` kute uhlanganise konkhe ndzawonye

:::info
Ngamunye we-phrojekthi ye-ChurchApps yi-repository ye-Git lezimele. Udzinga kukopisha (clone) kuphela liphrojekthi (kumbe emaphrojekthi) longawasebenta.
:::
