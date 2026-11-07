---
title: "Distribution"
---

# Distribution

<div class="article-intro">

ChurchApps använder olika distributionsstrategier beroende på projekttyp. API:er distribueras till AWS Lambda, webbappar distribueras som statiska webbplatser till S3 med CloudFront, och mobilappar byggs och distribueras via Expo EAS och appbutikerna.

</div>

## Distribution efter projekttyp

| Projekttyp | Distributionsmål | Verktyg |
|-------------|-------------------|---------|
| [API:er](./apis) | AWS Lambda | Serverless Framework v3 (Node.js 24.x-runtime) |
| [Webbappar](./web-apps) | S3 + CloudFront | Statisk build, S3-synkronisering, CloudFront-invalidering |
| [Mobilappar](./mobile) | Appbutiker | Expo EAS Build + OTA-uppdateringar |
| [Self-hosting (Railway)](./railway-template) | Railway | Mallen med ett klick: MySQL + Api + B1Admin + B1App |
| [Self-hosting (Docker)](./docker) | Valfri Docker-värd | Installationsprogram med en rad; förbyggda GHCR-avbildningar + Caddy, `./deploy/b1` för uppgradering/säkerhetskopiering/återställning |
| [Caddy-proxy för egna domäner](./caddy-proxy) | Windows EC2 (Elastic IP `3.23.251.61`) | Statisk Caddyfile + WinSW-tjänst + schemalagd kartsynkronisering |
| FreeShow | Direkt nedladdning | Electron Builder (plattformsoberoende binärfiler) |

## Miljöer

| Miljö | Syfte |
|-------------|---------|
| `dev` | Lokal utveckling |
| `demo` | Publik demoinstans; distribueras vid varje push till `main`, så den fungerar även som testmiljö före produktion |
| `prod` | Produktion |

:::info
Varje miljö har sin egen uppsättning API-slutpunkter, databaser och konfiguration. Miljöspecifika inställningar hanteras via `.env`-filer lokalt och via AWS SSM Parameter Store i distribuerade miljöer.
:::
