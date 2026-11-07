---
title: "Kurulum"
description: "ChurchApps projeleri için yerel geliştirme yolunu seçin: ön uç çalışması için paylaşılan demo API'lere yönelin ya da arka uç değişiklikleri için MySQL ile tam yığını yerel olarak çalıştırın."
---

# Kurulum

<div class="article-intro">

Bu bölüm, ChurchApps projeleri için yerel bir geliştirme ortamının nasıl kurulacağını adım adım anlatır. Hızlı geliştirme için ön yüzünüzü paylaşılan demo API'lerine yönlendirebilir veya arka uç çalışmaları için tüm yığını yerel olarak çalıştırabilirsiniz.

</div>

## İki Yaklaşım

Yerel geliştirme için, ihtiyacınız olan yığının boyutuna bağlı olarak iki yol vardır:

### 1. Demo API'lerine Yönlendirme (En Kolay)

**Ön yüz projesi** (web uygulaması, mobil uygulama veya masaüstü uygulaması) üzerinde çalışıyorsanız en hızlı yol, yerel uygulamanızı paylaşılan demo API'lerine yönlendirmektir. Veritabanı veya arka uç kurulumu gerekmez.

Demo API temel URL'si şudur:

```
https://api.demo.churchapps.org
```

Her API modülü, bu temel adresin altındaki bir yolda kullanılabilir. Örneğin:

```
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/giving
```

Demo ortamı `main` dalındaki en son kodu çalıştırır ve örnek verileri her gece yeniden yüklenir. Bu nedenle orada oluşturduğunuz hiçbir şeyin kalıcı olmasını beklemeyin. (Eski hazırlık ortamı, `api.staging.churchapps.org`, artık kullanımdan kaldırılmıştır. Bazı örnek `.env` dosyaları hâlâ hazırlık URL'lerini listeleyebilir. Bunları demo veya yerel URL'lerle değiştirin.)

:::tip
Bu yaklaşım, birkaç dakika içinde ön yüz değişikliklerine başlamanızı sağlar. Çoğu katkıda bulunan için önerilen yoldur.
:::

### 2. Her Şeyi Yerel Olarak Çalıştırma

API kodunu değiştirmeniz veya çevrimdışı çalışmanız gerekiyorsa tüm yığını yerel olarak çalıştırabilirsiniz. Bunun için MySQL 8.0+ ve ek yapılandırma gerekir. Ayrıntılı talimatlar için [API yerel kurulumu](../api/local-setup.md) kılavuzuna bakın.

## Başlarken

Bu sayfaları sırayla izleyin:

1. **[Ön Koşullar](./prerequisites.md)** -- Gerekli araçları kurun (Node.js, Git, MySQL vb.)
2. **[Proje Genel Bakışı](./project-overview.md)** -- Hangi projelerin var olduğunu ve ne işe yaradıklarını öğrenin
3. **[Ortam Değişkenleri](./environment-variables.md)** -- Her şeyi birbirine bağlamak için `.env` dosyalarınızı yapılandırın

:::info
Her ChurchApps projesi bağımsız bir Git deposudur. Yalnızca üzerinde çalışmak istediğiniz projeleri klonlamanız yeterlidir.
:::
