---
title: "Geliştirici Dokümantasyonu"
description: "ChurchApps geliştirici dokümanlarında yol bulun: yerel kurulum, API ve web uygulaması rehberleri, paylaşılan kütüphaneler, mobil derlemeler ve açık kaynaklı projelerin dağıtımı."
---

# Geliştirici Dokümantasyonu

<div class="article-intro">

ChurchApps, birlikte eksiksiz bir kilise yönetim platformu sunan yaklaşık 20 açık kaynaklı projenin bir koleksiyonudur. Projeler arka uç API'lerini, web uygulamalarını, mobil uygulamaları, bir masaüstü uygulamasını ve paylaşılan kütüphaneleri kapsar; hepsi TypeScript ile yazılmıştır. Bu bölüm, yerel bir geliştirme ortamı kurmanız ve katkıda bulunmaya başlamanız için ihtiyacınız olan her şeyi içerir.

</div>

## Mimariye Genel Bakış

Projeler **bağımsız depolardır** (monorepo değildir). Paylaşılan kod, `@churchapps/*` kapsamı altında npm'e yayımlanır ve normal bağımlılıklar olarak kullanılır. Bu, tüm ekosistemi klonlamadan tek bir projeyle çalışabileceğiniz anlamına gelir.

Temel özellikler:

- **Dil:** Her yerde TypeScript
- **Arka uç:** Serverless Framework aracılığıyla AWS Lambda'ya dağıtılan Node.js / Express API'leri
- **Web:** React 19 (Vite ve Next.js), Material-UI 7
- **Mobil:** Expo ile React Native
- **Veritabanı:** MySQL 8.0, API modülü başına bir veritabanı

## Bu Bölümün Kapsamı

- **[Kurulum](./setup/index.md)** -- Yerel geliştirme ortamı, ön koşullar ve yapılandırma
  - [Ön Koşullar](./setup/prerequisites.md) -- Gerekli araçlar ve yazılımlar
  - [Proje Genel Bakış](./setup/project-overview.md) -- Tüm projelere hızlı bakış
  - [Ortam Değişkenleri](./setup/environment-variables.md) -- `.env` dosyalarını yapılandırma
- **[API](./api/index.md)** -- Çekirdek API yerel kurulumu, veritabanı başlatma ve modül yapısı
- **[Web Uygulamaları](./web-apps/index.md)** -- B1Admin, B1App ve LessonsApp'i yerel olarak çalıştırma
- **[Mobil Uygulamalar](./mobile/index.md)** -- B1Mobile ve diğer Expo uygulamalarını derleme
- **[Paylaşılan Kütüphaneler](./shared-libraries/index.md)** -- Helpers, ApiHelper ve AppHelper ile çalışma
- **[Dağıtım](./deployment/index.md)** -- API'leri, web uygulamalarını ve mobil uygulamaları dağıtma
- **[FreePlay İçerik Sağlayıcısı](./freeplay-content-provider.md)** -- Ders kitaplığınızı FreePlay ile entegre etme

## Topluluk ve Kaynaklar

| Kaynak | Bağlantı |
|----------|------|
| GitHub Organizasyonu | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Sorun Takip Sistemi | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Slack Topluluğu | [Slack'e Katıl](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Katkıda bulunmaya başlamanın en hızlı yolu, bir web uygulaması (B1Admin gibi) seçmek, onu paylaşılan **demo API'lerine** yönlendirmek ve ön yüz değişikliklerini yapmaya başlamaktır. Veritabanı veya API kurulumu gerekmez.
:::
