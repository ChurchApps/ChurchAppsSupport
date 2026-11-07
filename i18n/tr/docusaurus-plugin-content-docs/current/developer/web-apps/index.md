---
title: "Web Uygulamaları"
---

# Web Uygulamaları

<div class="article-intro">

ChurchApps üç web uygulaması içerir. Her biri farklı bir kitleye ve amaca hizmet eder. Hepsi React 19, TypeScript ve Material-UI 7 temel teknolojilerini paylaşır, ancak derleme araçları ve dağıtım hedefleri farklıdır.

</div>

## Uygulamalara Genel Bakış

| Uygulama | Amaç | Çatı | Geliştirme Portu |
|-----|---------|-----------|----------|
| [**B1Admin**](./b1-admin.md) | Kilise yönetim paneli | React 19 + Vite + MUI 7 | 5173 |
| [**B1App**](./b1-app.md) | Halka açık kilise üye uygulaması | Next.js 16 + React 19 + MUI 7 | 3301 |
| [**LessonsApp**](./lessons-app.md) | Ders içeriği yönetimi | Next.js 16 + React 19 | 3501 |

## Ortak Teknoloji Yığını

Üç web uygulamasının tümü şu teknolojilerle geliştirilmiştir:

- **TypeScript** -- Uçtan uca tür güvenliği
- **React 19** -- Kullanıcı arayüzü bileşen kütüphanesi
- **Material-UI 7** -- Tasarım sistemi ve bileşen araç seti
- **React Query 5** -- Sunucu durumu yönetimi

## Ortak Bileşenler

Uygulamalar, UI bileşenlerini ve yardımcı araçları `@churchapps/apphelper*` paket ailesi aracılığıyla paylaşır:

| Paket | Amaç |
|---------|---------|
| `@churchapps/apphelper` | Temel paylaşılan React bileşenleri |
| `@churchapps/apphelper-login` | Kimlik doğrulama arayüz bileşenleri |
| `@churchapps/apphelper-donations` | Bağış ve bağış formları |
| `@churchapps/apphelper-forms` | Form oluşturucu bileşenleri |
| `@churchapps/apphelper-markdown` | Markdown işleme |
| `@churchapps/apphelper-website` | Web sitesi/CMS bileşenleri |

:::tip
Bu paketleri yerel olarak geliştirme hakkında ayrıntılar için [AppHelper](../shared-libraries/app-helper) belgelerine bakın.
:::

## Postinstall Betiği

Her web uygulamasında, `@churchapps/apphelper` paketinden yerel ayar dosyalarını ve CSS varlıklarını projeye kopyalayan bir `postinstall` betiği bulunur. Bu betik `npm install` komutundan sonra otomatik olarak çalışır.

:::info
Bağımlılıkları yükledikten sonra bileşenlerin stilsiz göründüğünü fark ederseniz `postinstall` betiği düzgün çalışmamış olabilir. `npm run postinstall` komutuyla bu betiği elle çalıştırabilirsiniz.
:::

## Derleme Araçları

Uygulamalar iki farklı derleme aracı kullanır:

- **B1Admin**, tek sayfalık uygulamalar için ideal, hızlı ve modern bir paketleyici olan **Vite**'ı kullanır
- **B1App** ve **LessonsApp**, sunucu tarafı işleme, dosya tabanlı yönlendirme ve optimize edilmiş üretim derlemeleri sunan **Next.js**'i kullanır
