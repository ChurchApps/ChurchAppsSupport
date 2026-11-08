---
title: "Mimari"
description: "B1 Admin, B1.church ve Api genelinde bağışların, check-in'lerin, bildirimlerin ve web sitelerinin nasıl çalıştığını, değişiklik yapmadan önce gösteren depolar arası sistem haritaları."
---

# Mimari

<div class="article-intro">

Bu sayfalar depolar arası sistem haritalarıdır: temel bir ChurchApps sisteminin uçtan uca nasıl işlediğini (uygulamalar, API modülleri ve paylaşılan kütüphaneler boyunca) belgeler. Tek bir projenin nasıl kurulacağını anlatmazlar. Bir sistemin davranışını değiştirmeden önce bunları okuyun. Bir projeyi çalıştırmak için [Kurulum](../setup/index.md) sayfasını, uç nokta düzeyindeki referans için ise [API bölümünü](../api/index.md) okuyun.

</div>

## Ekosisteme genel bakış

ChurchApps tek bir monorepo değil, yaklaşık 20 bağımsız depodan oluşur. İstemci uygulamaları HTTPS ve WebSocket üzerinden küçük bir dizi arka uç API'siyle konuşur. Kodu ise `@churchapps` kapsamı altında yayımlanan npm paketleri aracılığıyla paylaşır.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│                                │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

Bu bölümde belgelenen her şeyi şekillendiren iki yapısal kural vardır:

1. **Modüller birbirinden yalıtılmıştır.** Her Api modülü kendi veritabanına ve tablolarına sahiptir. Diğer modüller ve uygulamalar bu verilere yalnızca REST uç noktaları üzerinden erişir. Bkz. [Modül Yapısı](../api/module-structure.md).
2. **Paylaşılan kod npm paketleri olarak dağıtılır.** Uygulamalar birbirinin kaynak kodunu içe aktarmaz. Yeniden kullanılan her şey depo sınırlarını `@churchapps/helpers`, `@churchapps/apphelper` veya `@churchapps/apihelper` üzerinden aşar. Bkz. [Paylaşılan Kütüphaneler](../shared-libraries/index.md).

## Sistem haritaları

| Sayfa | Kapsamı | Kapsadığı alanlar |
|-------|---------|-------------------|
| [Bildirimler ve Hatırlatıcılar](./notifications.md) | Bir kişiye bir şeyin nasıl bildirildiği: iki gönderim kapısı, kanal yükseltme zinciri ve hatırlatıcı motoru | Api (messaging), B1Admin, B1App |
| [Gerçek Zamanlı Mimari](../realtime.md) | Sohbet, çevrimiçi durum ve uygulama içi iletimin arkasındaki WebSocket iletim çerçevesi | Api (messaging), tüm web uygulamaları |
| [Web Push Bildirimleri](../web-push.md) | Tarayıcı push kanalı: VAPID anahtarları, abonelik depolama ve iletim | Api (messaging), tüm web uygulamaları |
| [Bağış](./giving.md) | Ödeme sağlayıcıları ve geçitler, bağış akışları, fonlar ve partiler, geçit webhook'ları | Api (giving), apphelper, B1App, B1Admin |
| [Etkinlik Kayıtları](./registrations.md) | Kayıt ticaret modeli: katılımcı türleri, seçimler, indirim kodları, bağış geçidi üzerinden ödemeler ve bekleme listesi | Api (content + giving), B1App, B1Admin |
| [Check-In'ler](./check-ins.md) | Kiosk ve self check-in, yoklama veri modeli, oda yönlendirme, çocuk güvenliği katmanı ve etiket yazdırma | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Web Sitesi Oluşturucu](./website-builder.md) | Sayfa, bölüm ve öğe ağacı, öğe türü sözleşmesi ve oluşturucular, blog, erişim kontrollü sayfalar, SEO ve yapay zekâ ile üretim | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Web Sitesi Yönlendirme ve Çoklu Site](./websites.md) | Bir isteğin bir kiliseye ve belirli bir siteye nasıl çözümlendiği, çoklu site `siteId` veri modeli ve Caddy özel alan adı kenarı | B1App, Api (membership + content), B1Admin |
| [Entegrasyonlar](./integrations.md) | Genişleme yüzeyi: OAuth, API anahtarları, webhook'lar, içerik sağlayıcıları ve MCP | Api, paylaşılan kütüphaneler, dış uygulamalar |
| [Denetim Günlüğü ve Geri Alınabilir Partiler](./audit-log.md) | Denetim noktasında her değişikliğin varsayılan olarak denetlenmesi ve içe aktarmaları ile toplu işlemleri geri alınabilir kılan parti katmanı | Api (tüm modüller), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff.md) | Ücretli depolama ve SMS kredisi hizmeti: ortak JWT kimliği, servis anahtarlı S2S, SMS ve depolama sağlayıcı bağlantı noktaları, Stripe faturalandırması | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), texting/apihelper paketleri, B1Admin |
| [Kendi Depolamanızı Getirin](./byos-storage.md) | Kiliseler, ücretsiz 100 MB sınırının ötesindeki yüklemeler için Google Drive, Dropbox, OneDrive veya S3 uyumlu bir depoyu bağlar: OAuth bağlantısı, sağlayıcıya özgü yükleme biçimleri ve genel indirme yönlendirmesi | Api (content + membership), helpers/apphelper paketleri, B1Admin, B1App |
| [İçerik Ortak Alanı](./commons.md) | Ürünler arası kullanıcı tarafından üretilen içeriğin arkasındaki ortak varlık ve gönderim omurgası ile B1Admin Sunucu Yönetimi'ndeki tek, yalnızca personele açık moderasyon kuyruğu | Api (commons modülü), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Bu bölümdeki sistemlerden biri çalışma şeklini değiştirdiğinde (yalnızca tek bir uygulama içindeki bir sayfayı değil) eşleşen sistem haritası aynı çalışmada güncellenmelidir. Bu, bu bölümün yeni katkıda bulunanlar için güvenilir ilk durak olmasını sağlar.
:::

## Öneriler

Bu belgeler, mevcut ürün davranışını değil, inceleme için önerilen çalışmayı açıklar.

| Öneri | Kapsamı |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal.md) | Kiliseye ait hesap, anahtarlar, servis ve telefon numarası; entegrasyon kapsamı, onay, teslimat, tahminler ve yayın kontrolleri |
| [Twilio kilise başlangıç taslağı](./twilio-byok-onboarding-draft.md) | Önerilen B1 kayıt formu ayarları, kiliseye özgü kampanya örnekleri ve onay/işletim kontrol listeleri |
