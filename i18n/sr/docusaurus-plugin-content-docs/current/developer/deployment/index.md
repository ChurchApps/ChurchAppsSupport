---
title: "Implementacija"
description: "Пронађите где се распоређује сваки ChurchApps пројекат: AWS Lambda API, S3 веб апликације, Expo мобилне збирке и B1 Admin на Railway-у или Docker-у."
---

# Implementacija

<div class="article-intro">

ChurchApps koristi različite strategije implementacije u zavisnosti od vrste projekta. API-ji se implementiraju na AWS Lambda, veb aplikacije se implementiraju kao statički sajtovi na S3 uz CloudFront, a mobilne aplikacije se grade i distribuiraju putem Expo EAS-a i prodavnica aplikacija.

</div>

## Implementacija prema vrsti projekta

| Vrsta projekta | Cilj implementacije | Alati |
|-------------|-------------------|---------|
| [API-ji](./apis.md) | AWS Lambda | Serverless Framework v3 (Node.js 24.x runtime) |
| [Veb aplikacije](./web-apps.md) | S3 + CloudFront | Statička izgradnja, S3 sinhronizacija, CloudFront invalidacija |
| [Mobilne aplikacije](./mobile.md) | Prodavnice aplikacija | Expo EAS Build + OTA ažuriranja |
| [Samostalno hostovanje (Railway)](./railway-template.md) | Railway | Šablon u jednom kliku: MySQL + Api + B1Admin + B1App |
| [Samostalno hostovanje (Docker)](./docker.md) | Bilo koji Docker host | Instalater u jednom redu; unapred izgrađene GHCR slike + Caddy, `./deploy/b1` za nadogradnju/rezervne kopije/vraćanje |
| [Caddy prokси za prilagođeni domen](./caddy-proxy.md) | Windows EC2 (Elastic IP `3.23.251.61`) | Statički Caddyfile + WinSW servis + zakazana sinhronizacija mape |
| FreeShow | Direktno preuzimanje | Electron Builder (binarne datoteke za više platformi) |

## Okruženja

| Okruženje | Namena |
|-------------|---------|
| `dev` | Lokalni razvoj |
| `demo` | Javna demo instanca; implementira se pri svakom push-u na `main`, tako da služi i kao testiranje pre produkcije |
| `prod` | Produkcija |

:::info
Svako okruženje ima sopstveni skup API krajnjih tačaka, baza podataka i konfiguracije. Podešavanja specifična za okruženje upravljaju se putem `.env` datoteka lokalno i AWS SSM Parameter Store-a u implementiranim okruženjima.
:::
