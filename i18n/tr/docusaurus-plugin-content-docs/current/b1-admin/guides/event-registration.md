---
title: "Kılavuz: Etkinlik Kaydını Ayarlama"
description: "Katılımcı bilgilerini ve isteğe bağlı ödemeleri toplamak, kiliseniz web sitesine yerleştirmek ve kayıtları takip etmek için B1 Admin'de bir etkinlik kayıt formu ayarlayın."
---

# Etkinlik Kaydını Ayarlama

<div class="article-intro">

Bir etkinlik kayıt formu oluşturun, katılımcı bilgilerini ve isteğe bağlı ödemeleri toplayın, kiliseniz web sitesine yerleştirin ve gelen kayıtları yönetin. Sonunda, kilisenizin herhangi bir etkinliği için paylaşılabilir bir kayıt sayfanız olacak.

</div>

:::info
**Etkinlik kaydını yönetmenin iki yolu:** Bu kılavuz, özel alanlar ve ödeme toplama üzerinde tam kontrol sağlayan **formlara dayalı kayıt**ı kapsar. Yalnızca kimin katılacağını takip etmeniz gereken daha basit etkinlikler için takvime yerleşik **yerel etkinlik kaydını** kullanın -- kurulum talimatları için [Takvim Oluşturma](../calendars/creating-calendars.md#enabling-event-registration) sayfasına bakın. Yerel kayıt, üyelerin [B1.church veya B1 Uygulaması](../../b1-church/events/registering.md) üzerinden doğrudan kayıt olmasına; kapasite takibi, tarih aralıkları ve e-posta onayları ile olanak tanır.
:::

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Yönetici erişimine sahip bir B1 Admin hesabı
- Ödeme toplamak için: önce [Stripe'ın yapılandırılmış olması gerekir](../donations/online-giving-setup.md)

</div>

## Adım 1: Bağımsız Bir Form Oluşturma

Bağımsız formların, herkesin erişebildiği kendi herkese açık URL'leri vardır -- etkinlik kaydı için mükemmeldir.

Şunları yapmak için [Form Oluşturma](../forms/creating-forms.md) kılavuzunu izleyin:

1. Formlar bölümüne gidin ve Form Ekle düğmesine tıklayın
2. "Bağımsız" türünü seçin -- bu, formunuza kendi herkese açık URL'sini verir
3. Formu etkinliğin adıyla adlandırın (ör. "Erkekler Inziva Kaydı", "VBS Kaydı")

## Adım 2: Soruları Ekleme

Kayıt olanlardan toplamanız gereken alanları oluşturun.

Soruları eklemek için [Form Oluşturma](../forms/creating-forms.md#adding-questions) kılavuzunu izleyin:

1. Soru sekmesine gidin ve ihtiyacınız olan bilgiler için alanlar ekleyin: ad, e-posta, telefon, beslenme kısıtlamaları, tişört bedeni, acil durum iletişim kişisi vb.
2. Yemek tercihleri veya oturum seçimleri gibi seçenekler için Çoktan Seçmeli alanını kullanın

:::warning
Ödeme alan türü, Stripe'ın yapılandırılmış olmasını gerektirir. Henüz çevrimiçi bağışları ayarlamadıysanız, ödeme alanları eklemeden önce [Çevrimiçi Bağış Kurulumu](../donations/online-giving-setup.md) sayfasına bakın.
:::

## Adım 3: Form Ayarlarını Yapılandırma

Kayıt formunuzun ne zaman ve nasıl kullanılabilir olacağını kontrol edin.

1. Kaydın yalnızca sınırlı bir süre açık olması gerekiyorsa kullanılabilirlik tarihlerini ayarlayın
2. Herkese açık URL'yi kopyalayın -- bunu doğrudan paylaşabilirsiniz
3. Kayıtların yönetilmesine yardımcı olmak için Yönetici veya Yalnızca Görüntüleme rollerine sahip form üyeleri ekleyin

## Adım 4: Web Sitenize Yerleştirme

Kayıt formunu, kilise web sitenize ekleyerek kolayca bulunmasını sağlayın.

Şunları yapmak için [Sayfaları Yönetme](../website/managing-pages.md) kılavuzunu izleyin:

1. B1 web sitesi düzenleyicinizde, bir sayfaya yeni bir bölüm ekleyin ve Form öğesini seçin
2. Listeden kayıt formunuzu seçin

:::tip
Bağımsız URL'yi e-posta, sosyal medya ve kilise bültenleri aracılığıyla da paylaşın -- formun görünür olduğu yer sayısı arttıkça kayıt sayınız da artacaktır.
:::

## Adım 5: Kayıtları Yönetme

Kayıtlar geldikçe takip edin ve ihtiyaç duyduğunuzda verileri dışa aktarın.

Şunları yapmak için [Gönderimleri Yönetme](../forms/managing-submissions.md) kılavuzunu izleyin:

1. Gönderimler sekmesinde gelen yanıtları inceleyin
2. Elektronik tablolar, katılımcı sayısı takibi veya etkinlik koordinatörleriyle paylaşım için CSV olarak dışa aktarın

## Tamamlandı!

Etkinlik kaydınız yayında. Bağlantıyı paylaşın, web sitenize yerleştirin ve B1 Admin'den kayıtları takip edin. Etkinlik sona erdiğinde, kayıtlarınız için son listeyi dışa aktarın.

## İlgili Makaleler

- [Form Oluşturma](../forms/creating-forms.md) — farklı alan türlerine sahip formlar oluşturun
- [Gönderimleri Yönetme](../forms/managing-submissions.md) — form yanıtlarını inceleyin ve dışa aktarın
- [Sayfaları Yönetme](../website/managing-pages.md) — formları web sitenize yerleştirin
- [Çevrimiçi Bağış Kurulumu](../donations/online-giving-setup.md) — ödeme alanları için gereklidir
