---
title: "डिप्लॉयमेंट"
---

# डिप्लॉयमेंट

<div class="article-intro">

ChurchApps प्रोजेक्ट के प्रकार के अनुसार अलग-अलग डिप्लॉयमेंट रणनीतियाँ उपयोग करता है। API AWS Lambda पर डिप्लॉय होते हैं, वेब ऐप्स CloudFront के साथ S3 पर स्टेटिक साइट्स के रूप में डिप्लॉय होते हैं, और मोबाइल ऐप्स Expo EAS और ऐप स्टोर के माध्यम से बनाए और वितरित किए जाते हैं।

</div>

## प्रोजेक्ट प्रकार के अनुसार डिप्लॉयमेंट

| प्रोजेक्ट प्रकार | डिप्लॉयमेंट लक्ष्य | टूलिंग |
|-------------|-------------------|---------|
| [APIs](./apis) | AWS Lambda | Serverless Framework v3 (Node.js 24.x runtime) |
| [Web Apps](./web-apps) | S3 + CloudFront | स्टेटिक build, S3 sync, CloudFront invalidation |
| [Mobile Apps](./mobile) | ऐप स्टोर | Expo EAS Build + OTA Updates |
| [Self-Hosting (Railway)](./railway-template) | Railway | One-click template: MySQL + Api + B1Admin + B1App |
| [Self-Hosting (Docker)](./docker) | कोई भी Docker होस्ट | एक-लाइन इंस्टॉलर; पहले से बनी GHCR images + Caddy, `./deploy/b1` upgrade/backup/rollback |
| [Caddy Custom-Domain Proxy](./caddy-proxy) | Windows EC2 (Elastic IP `3.23.251.61`) | स्टेटिक Caddyfile + WinSW सेवा + निर्धारित map sync |
| FreeShow | सीधा डाउनलोड | Electron Builder (क्रॉस-प्लेटफ़ॉर्म बाइनरी) |

## वातावरण

| वातावरण | उद्देश्य |
|-------------|---------|
| `dev` | स्थानीय विकास |
| `demo` | सार्वजनिक डेमो इंस्टेंस; `main` पर हर push पर डिप्लॉय होता है, इसलिए यह प्री-प्रोडक्शन परीक्षण का भी काम करता है |
| `prod` | प्रोडक्शन |

:::info
हर वातावरण के अपने API endpoints, डेटाबेस और कॉन्फ़िगरेशन होते हैं। वातावरण-विशिष्ट सेटिंग्स स्थानीय रूप से `.env` फ़ाइलों के माध्यम से और डिप्लॉय किए गए वातावरणों में AWS SSM Parameter Store के माध्यम से प्रबंधित होती हैं।
:::
