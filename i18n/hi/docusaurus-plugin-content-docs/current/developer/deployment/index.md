---
title: "Deployment"
---

# Deployment

<div class="article-intro">

ChurchApps प्रोजेक्ट प्रकार के अनुसार अलग deployment रणनीतियाँ उपयोग करता है। APIs AWS Lambda पर deploy होते हैं, वेब ऐप्स S3 + CloudFront पर static sites के रूप में deploy होते हैं, और मोबाइल ऐप्स Expo EAS और ऐप स्टोर के माध्यम से बनाए और वितरित किए जाते हैं।

</div>

## प्रोजेक्ट प्रकार के अनुसार Deployment

| प्रोजेक्ट प्रकार | Deployment लक्ष्य | टूलिंग |
|-------------|-------------------|---------|
| [APIs](./apis) | AWS Lambda | Serverless Framework v3 (Node.js 24.x runtime) |
| [Web Apps](./web-apps) | S3 + CloudFront | Static build, S3 sync, CloudFront invalidation |
| [Mobile Apps](./mobile) | App Stores | Expo EAS Build + OTA Updates |
| [Self-Hosting (Railway)](./railway-template) | Railway | One-click template: MySQL + Api + B1Admin + B1App |
| [Self-Hosting (Docker)](./docker) | कोई भी Docker host | One-line installer; prebuilt GHCR images + Caddy, `./deploy/b1` upgrade/backup/rollback |
| [Caddy Custom-Domain Proxy](./caddy-proxy) | Windows EC2 (Elastic IP `3.23.251.61`) | Static Caddyfile + WinSW service + scheduled map sync |
| FreeShow | सीधा डाउनलोड | Electron Builder (cross-platform binaries) |

## Environments

| Environment | उद्देश्य |
|-------------|-------------|
| `dev` | स्थानीय विकास |
| `demo` | सार्वजनिक डेमो इंस्टेंस; `main` पर हर push पर deploy होता है, इसलिए यह pre-production परीक्षण का भी काम करता है |
| `prod` | Production |

:::info
हर environment के अपने API endpoints, डेटाबेस, और कॉन्फ़िगरेशन होते हैं। Environment-विशिष्ट सेटिंग्स स्थानीय रूप से `.env` फ़ाइलों के माध्यम से और deployed environments में AWS SSM Parameter Store के माध्यम से प्रबंधित होती हैं।
:::
