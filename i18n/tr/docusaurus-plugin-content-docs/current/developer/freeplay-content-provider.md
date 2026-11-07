---
title: "FreePlay İçerik Sağlayıcısı"
description: "Bir ders kütüphanesini FreePlay'e bağlamak için içerik sağlayıcının sunması gerekenler: logo, oturum açma modeli, katalog ve oynatma listesi uç noktaları ile medya formatları."
---

# FreePlay İçerik Sağlayıcısı

<div class="article-intro">

FreePlay, ChurchApps'in telefonlarda, tabletlerde ve televizyonlarda ders ve diğer video içeriklerini yayınlamak için kullandığı medya oynatıcısıdır. Ders içeriklerinden oluşan bir kütüphaneniz varsa ve bunu FreePlay'de kullanılabilir hale getirmek istiyorsanız, bu kılavuz sağlamanız gereken her şeyi kapsar.

</div>

## Marka Kimliği

Entegrasyona başlamadan önce şunlara ihtiyacımız var:

- **Logo** -- **16:9** en-boy oranında bir logo görseli (FreePlay arayüzündeki sağlayıcı kartlarında kullanılır)
- **Marka adı** -- FreePlay'de kuruluşunuz için gösterilmesini istediğiniz ad

## API Uç Noktaları

FreePlay, hizmetinizle küçük bir REST uç noktası kümesi üzerinden iletişim kurar. Her sağlayıcı için özel bir adaptör yazdığımız için tam URL yapısı esnektir -- ancak aşağıdaki bilgiler bize gerekenlerdir.

### Kimlik Doğrulama

İçeriğinize uygun modeli seçin:

| Model | Ne Zaman Kullanılır | Bizim İhtiyacımız Olanlar |
|-------|---------------------|---------------------------|
| **Yok** | Herkese açık içerik, oturum açma gerekmez | Hiçbir şey -- katalog uç noktalarınızı doğrudan çağırırız |
| **OAuth (PKCE)** | Web/mobil oturum açma | Yetkilendirme URL'si, token değişim uç noktası, istemci kimliği, kapsamlar |
| **Cihaz Akışı (Device Flow)** | TV uygulamaları için tercih edilir (kullanıcı telefonunda kısa bir kod girer) | Cihaz yetkilendirme uç noktası, token sorgulama uç noktası, istemci kimliği |

:::tip
İçeriğiniz kimlik doğrulama gerektiriyorsa, kimlik doğrulama uç noktanız bir **kullanıcı token'ı** döndürür; FreePlay bu token'ı gezinme ve ders uç noktalarına iletir ve erişimi yetkilendirir.
:::

### Gezinme / Katalog

Tüm kullanılabilir derslerin **klasör ağacını** döndüren bir uç nokta (veya uç nokta kümesi).

- Bu, tüm ağacı döndüren **tek bir çağrı** olabilir veya kullanıcı daha derine indikçe her biri bir seviye döndüren **birden fazla çağrı** olabilir.
- Ağaçtaki her öğe şunları içermelidir:

| Alan | Zorunlu | Açıklama |
|------|---------|----------|
| `id` | Evet | Klasör için benzersiz bir tanımlayıcı |
| `name` | Evet | Klasör için görüntülenecek ad |
| `thumbnail` | Önerilir | **16:9** küçük resim URL'si |

### Ders Oynatma Listesi

Tek bir ders için **medya dosyaları oynatma listesini** döndüren bir uç nokta.

Oynatma listesindeki her öğe şunları içermelidir:

| Alan | Zorunlu | Açıklama |
|------|---------|----------|
| `title` | Evet | Medya öğesinin görüntülenecek başlığı |
| `mediaType` | Evet | `video` veya `image` |
| `url` | Evet | Dosyanın doğrudan indirme bağlantısı (aşağıdaki [Medya Formatları](#media-formats) bölümüne bakın) |
| `thumbnail` | Önerilir | Öğe için küçük resim görseli |
| `duration` | Önerilir | Süre (saniye cinsinden, videolar için) |

## Medya Formatları

FreePlay dosyaları doğrudan indirir; bu nedenle her medya öğesinin **doğrudan bağlantısı** olmalıdır (gömülü oynatıcı veya sayfa yönlendirmesi olmamalıdır).

| Tür | Kabul Edilen Formatlar |
|-----|------------------------|
| Video | **MP4** (Apple ve Android cihazlarda platformlar arası oynatma için gereklidir) |
| Görsel | JPG, PNG veya GIF |

## Notlar

- **JSON döndüren bir REST API** tipik entegrasyon desenidir; ancak her sağlayıcı için özel bir adaptör yazdığımız için hemen hemen her API formatıyla çalışabiliriz.
- FreePlay içerik sağlayıcısı olmakla ilgileniyorsanız, [Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) üzerinden bize ulaşın veya [GitHub](https://github.com/ChurchApps/ChurchAppsSupport/issues) üzerinde bir konu açın.
