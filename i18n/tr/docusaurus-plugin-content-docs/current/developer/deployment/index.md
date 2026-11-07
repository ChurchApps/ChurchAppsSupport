---
title: "Dağıtım"
description: "ChurchApps projelerinin dağıtım yerleri: AWS Lambda API'leri, S3 web uygulamaları, Expo mobil derlemeleri ve Railway veya Docker'daki B1 Admin."
---

# Dağıtım

<div class="article-intro">

ChurchApps, proje türüne bağlı olarak farklı dağıtım stratejileri kullanır. API'ler AWS Lambda'ya dağıtılır, web uygulamaları CloudFront ile S3 üzerinde statik siteler olarak yayımlanır ve mobil uygulamalar Expo EAS aracılığıyla oluşturulup uygulama mağazalarında dağıtılır.

</div>

## Proje Türüne Göre Dağıtım

| Proje Türü | Dağıtım Hedefi | Araçlar |
|-------------|-------------------|---------|
| [API'ler](./apis.md) | AWS Lambda | Serverless Framework v3 (Node.js 24.x çalışma zamanı) |
| [Web Uygulamaları](./web-apps.md) | S3 + CloudFront | Statik derleme, S3 eşitleme, CloudFront önbellek geçersiz kılma |
| [Mobil Uygulamalar](./mobile.md) | Uygulama Mağazaları | Expo EAS Build + OTA Güncellemeleri |
| [Kendi Sunucunuzda Barındırma (Railway)](./railway-template.md) | Railway | Tek tıklamalı şablon: MySQL + Api + B1Admin + B1App |
| [Kendi Sunucunuzda Barındırma (Docker)](./docker.md) | Herhangi bir Docker ana bilgisayarı | Tek satırlık yükleyici; önceden derlenmiş GHCR imajları + Caddy, `./deploy/b1` ile yükseltme/yedekleme/geri alma |
| [Caddy Özel Alan Adı Proxy'si](./caddy-proxy.md) | Windows EC2 (Elastic IP `3.23.251.61`) | Statik Caddyfile + WinSW hizmeti + zamanlanmış harita eşitleme |
| FreeShow | Doğrudan indirme | Electron Builder (platformlar arası ikili dosyalar) |

## Ortamlar

| Ortam | Amaç |
|-------------|---------|
| `dev` | Yerel geliştirme |
| `demo` | Herkese açık demo örneği; `main` dalına her gönderimde dağıtılır, bu nedenle üretim öncesi testler için de kullanılır |
| `prod` | Üretim |

:::info
Her ortamın kendi API uç noktaları, veritabanları ve yapılandırması vardır. Ortama özgü ayarlar yerelde `.env` dosyaları aracılığıyla, dağıtılan ortamlarda ise AWS SSM Parameter Store üzerinden yönetilir.
:::
