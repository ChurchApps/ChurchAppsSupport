---
title: "Implementacija"
---

# Implementacija

<div class="article-intro">

ChurchApps uporablja različne strategije implementacije glede na vrsto projekta. API-ji se implementirajo na AWS Lambda, spletne aplikacije pa kot statična mesta na S3 s CloudFrontom, mobilne aplikacije pa se gradijo in distribuirajo prek Expo EAS ter trgovin z aplikacijami.

</div>

## Implementacija glede na vrsto projekta

| Vrsta projekta | Cilj implementacije | Orodja |
|-------------|-------------------|---------|
| [API-ji](./apis) | AWS Lambda | Serverless Framework v3 (izvajalno okolje Node.js 24.x) |
| [Spletne aplikacije](./web-apps) | S3 + CloudFront | Statična gradnja, sinhronizacija S3, razveljavitev predpomnilnika CloudFront |
| [Mobilne aplikacije](./mobile) | Trgovine z aplikacijami | Expo EAS Build + OTA posodobitve |
| [Samostojno gostovanje (Railway)](./railway-template) | Railway | Predloga z enim klikom: MySQL + Api + B1Admin + B1App |
| [Samostojno gostovanje (Docker)](./docker) | Poljubni gostitelj Docker | Namestitev z eno vrstico; vnaprej zgrajene slike GHCR + Caddy, `./deploy/b1` za posodobitev/varnostno kopiranje/vrnitev na prejšnjo različico |
| [Caddy posrednik za domeno po meri](./caddy-proxy) | Windows EC2 (Elastic IP `3.23.251.61`) | Statična datoteka Caddyfile + storitev WinSW + načrtovana sinhronizacija zemljevidov |
| FreeShow | Neposredni prenos | Electron Builder (binarne datoteke za več platform) |

## Okolja

| Okolje | Namen |
|-------------|---------|
| `dev` | Lokalni razvoj |
| `demo` | Javni predstavitveni primerek; implementira se ob vsakem potisku v `main`, zato služi tudi kot predprodukcijsko testiranje |
| `prod` | Produkcija |

:::info
Vsako okolje ima svoj nabor končnih točk API, baz podatkov in konfiguracije. Nastavitve, specifične za okolje, se lokalno upravljajo prek datotek `.env`, v implementiranih okoljih pa prek AWS SSM Parameter Store.
:::
