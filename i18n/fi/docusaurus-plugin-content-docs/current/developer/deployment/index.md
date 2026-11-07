---
title: "Käyttöönotto"
---

# Käyttöönotto

<div class="article-intro">

ChurchApps käyttää eri käyttöönottostrategioita projektityypin mukaan. API:t otetaan käyttöön AWS Lambdaan, verkkosovellukset staattisina sivustoina S3:een CloudFrontin kautta, ja mobiilisovellukset rakennetaan ja jaetaan Expo EAS:n ja sovelluskauppojen kautta.

</div>

## Käyttöönotto projektityypin mukaan

| Projektityyppi | Käyttöönottokohde | Työkalut |
|-------------|-------------------|---------|
| [API:t](./apis) | AWS Lambda | Serverless Framework v3 (Node.js 24.x -ajoympäristö) |
| [Verkkosovellukset](./web-apps) | S3 + CloudFront | Staattinen käännös, S3-synkronointi, CloudFront-välimuistin mitätöinti |
| [Mobiilisovellukset](./mobile) | Sovelluskaupat | Expo EAS Build + OTA-päivitykset |
| [Itsenäinen isännöinti (Railway)](./railway-template) | Railway | Yhden napsautuksen malli: MySQL + Api + B1Admin + B1App |
| [Itsenäinen isännöinti (Docker)](./docker) | Mikä tahansa Docker-isäntä | Yhden rivin asennusohjelma; valmiiksi rakennetut GHCR-kuvat + Caddy, `./deploy/b1` päivitys/varmuuskopiointi/palautus |
| [Caddy-välityspalvelin mukautetulle verkkotunnukselle](./caddy-proxy) | Windows EC2 (Elastic IP `3.23.251.61`) | Staattinen Caddyfile + WinSW-palvelu + ajoitettu karttasynkronointi |
| FreeShow | Suora lataus | Electron Builder (alustojen väliset binäärit) |

## Ympäristöt

| Ympäristö | Käyttötarkoitus |
|-------------|-------------------|
| `dev` | Paikallinen kehitys |
| `demo` | Julkinen demo-instanssi; julkaistaan jokaisella `main`-haaran pushilla, joten se toimii samalla tuotantoa edeltävänä testiympäristönä |
| `prod` | Tuotanto |

:::info
Jokaisella ympäristöllä on omat API-päätepisteensä, tietokantansa ja asetuksensa. Ympäristökohtaisia asetuksia hallitaan paikallisesti `.env`-tiedostoilla ja käyttöönotetuissa ympäristöissä AWS SSM Parameter Store -palvelun kautta.
:::
