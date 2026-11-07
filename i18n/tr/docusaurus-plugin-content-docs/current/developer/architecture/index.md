---
title: "Mimari"
description: "Bağış, check-in, bildirim ve web sitelerinin B1 Admin, B1.church ve API arasında nasıl işlediğini gösteren depolar arası sistem haritaları."
---

# Mimari

<div class="article-intro">

Bu sayfalar, ChurchApps'in temel sistemlerinin uçtan uca nasıl çalıştığını belgeleyen depolar arası sistem haritalarıdır. Bu sayfalar tek bir projenin nasıl kurulacağını değil, uygulamalar, API modülleri ve paylaşılan kütüphaneler arasındaki işleyişi açıklar. Bir sistemin davranışını değiştirmeden önce bu sayfaları okuyun. Projeyi çalıştırmak için [Kurulum](../setup/index.md) bölümünü, uç nokta düzeyindeki başvuru için ise [API bölümünü](../api/index.md) okuyun.

</div>

## Ekosisteme genel bakış

ChurchApps, tek bir monorepo değil, yaklaşık 20 bağımsız depodan oluşur. İstemci uygulamaları HTTPS ve WebSocket üzerinden küçük bir dizi arka uç API'siyle iletişim kurar ve kodu `@churchapps` kapsamı altında yayımlanan npm paketleri aracılığıyla paylaşır.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│  B1Mobile   (maintenance-only) │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

Bu bölümde belgelenen her şeyi şekillendiren iki yapısal kural vardır:

1. **Modüller birbirinden yalıtılmıştır.** Her Api modülü kendi veritabanına ve tablolarına sahiptir; diğer modüller ve uygulamalar verilerine yalnızca REST uç noktaları üzerinden erişir. Bkz. [Modül Yapısı](../api/module-structure.md).
2. **Paylaşılan kod npm paketleri olarak dağıtılır.** Uygulamalar birbirlerinin kaynak kodunu asla içe aktarmaz; yeniden kullanılan her şey depo sınırlarını `@churchapps/helpers`, `@churchapps/apphelper` veya `@churchapps/apihelper` aracılığıyla aşar. Bkz. [Paylaşılan Kütüphaneler](../shared-libraries/index.md).

## Sistem haritaları

| Sayfa | Kapsadığı konular | Kapsadığı alanlar |
|------|----------------|-------|
| [Bildirimler ve Hatırlatıcılar](./notifications.md) | Bir sistemin bir kişiye bir şey iletmesi: iki gönderim kapısı, kanal yükseltme zinciri ve hatırlatıcı motoru | Api (messaging), B1Admin, B1App |
| [Gerçek Zamanlı Mimari](../realtime.md) | Sohbet, çevrimiçi durum ve uygulama içi iletimin arkasındaki WebSocket iletim çerçevesi | Api (messaging), tüm web uygulamaları |
| [Web Push Bildirimleri](../web-push.md) | Tarayıcı push kanalı: VAPID anahtarları, abonelik depolama, iletim | Api (messaging), tüm web uygulamaları |
| [Bağışlar](./giving.md) | Ödeme sağlayıcıları ve ağ geçitleri, bağış akışları, fonlar/gruplar, ağ geçidi webhook'ları | Api (giving), apphelper, B1App, B1Admin |
| [Etkinlik Kayıtları](./registrations.md) | Kayıt ticaret modeli: katılımcı türleri, seçimler, indirim kodları, bağış ağ geçidi üzerinden ödemeler ve bekleme listesi | Api (content + giving), B1App, B1Admin |
| [Check-In'ler](./check-ins.md) | Kiosk ve self check-in, katılım veri modeli, oda yönlendirme, çocuk güvenliği katmanı, etiket yazdırma | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Web Sitesi Oluşturucu](./website-builder.md) | Sayfa/bölüm/öğe ağacı, öğe türü sözleşmesi ve görselleştiriciler, blog, erişim kısıtlı sayfalar, SEO ve yapay zekâ ile üretim | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Web Sitesi Yönlendirme ve Çoklu Site](./websites.md) | Bir isteğin bir kiliseye ve belirli bir siteye nasıl çözümlendiği, çoklu site `siteId` veri modeli ve Caddy özel alan adı kenarı | B1App, Api (membership + content), B1Admin |
| [Entegrasyonlar](./integrations.md) | Genişletme yüzeyi: OAuth, API anahtarları, webhook'lar, içerik sağlayıcıları, MCP | Api, paylaşılan kütüphaneler, harici uygulamalar |
| [Denetim Günlüğü ve Geri Alınabilir Toplu İşlemler](./audit-log.md) | Denetleyici darboğaz noktasında her değişikliğin varsayılan olarak açık denetimi ve içe aktarmaları ile toplu işlemleri geri alınabilir kılan toplu katman | Api (tüm modüller), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff.md) | Ücretli depolama ve SMS kredisi hizmeti: paylaşılan JWT kimliği, servis anahtarlı S2S, SMS ve depolama sağlayıcı bağlantı noktaları, Stripe faturalandırma | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), texting/apihelper packages, B1Admin |
| [Kendi Depolamanızı Getirin](./byos-storage.md) | Kiliseler, ücretsiz 100 MB sınırını aşan yüklemeler için Google Drive, Dropbox, OneDrive veya S3 uyumlu bir depolama alanı bağlayabilir: OAuth bağlantısı, sağlayıcıya özgü yükleme biçimleri, genel indirme yönlendirmesi | Api (content + membership), helpers/apphelper packages, B1Admin, B1App |
| [İçerik Ortak Alanı](./commons.md) | Ürünler arası kullanıcı tarafından üretilen içeriğin arkasındaki ortak varlık/gönderim omurgası ve B1Admin Server Admin içindeki tek, yalnızca personele açık moderasyon kuyruğu | Api (commons module), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Bir değişiklik bunlardan birinin çalışma şeklini değiştirdiğinde — yalnızca tek bir uygulama içindeki bir sayfayı değil — buradaki ilgili sistem haritası aynı çalışma kapsamında güncellenmelidir. Bu, bu bölümün yeni katkıda bulunanlar için ilk durak olarak güvenilir kalmasını sağlar.
:::

## Öneriler

Bu belgeler, mevcut ürün davranışı yerine incelenmek üzere önerilen çalışmaları açıklar.

| Öneri | Kapsadığı konular |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal.md) | Kiliseye ait hesap, anahtarlar, hizmet ve telefon numarası; entegrasyon kapsamı, onay, iletim, tahminler ve yayın kontrolleri |
| [Twilio kilise başlangıç taslağı](./twilio-byok-onboarding-draft.md) | Önerilen B1 kayıt formu ayarları, kiliseye özgü kampanya örnekleri ve onay/işletim kontrol listeleri |
