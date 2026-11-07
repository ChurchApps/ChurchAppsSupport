---
title: "Kılavuz: Etkinlik Kaydını Ayarlama"
description: "B1 Admin'de katılımcı bilgilerini ve isteğe bağlı ödemeleri toplayan bir etkinlik kayıt formu kurun, web sitenize gömün ve kayıtları takip edin."
---

# Etkinlik Kaydını Ayarlama

<div class="article-intro">

Bir etkinlik kayıt formu oluşturun, katılımcı bilgilerini ve isteğe bağlı ödemeleri toplayın, formu kilise web sitenize yerleştirin ve gelen kayıtları yönetin. Bu işlemin sonunda, herhangi bir kilise etkinliği için paylaşılabilir bir kayıt sayfanız olacak.

</div>

:::info
**Etkinlik kaydını yönetmenin iki yolu:** Bu kılavuz, özel alanlar ve ödeme toplama üzerinde tam denetim sağlayan **form tabanlı kaydı** kapsar. Yalnızca kimin katılacağını takip etmeniz gereken daha basit etkinlikler için takvimde yerleşik olan **yerel etkinlik kaydını** kullanın. Kurulum talimatları için [Takvim Oluşturma](../calendars/creating-calendars.md#enabling-event-registration) bölümüne bakın. Yerel kayıt, üyelerin kapasite takibi, tarih aralıkları ve e-posta onayları ile [B1 web sitesi](../../b1-church/events/registering.md) ve [mobil uygulama](../../b1-church/events/registering.md) üzerinden doğrudan kaydolmasına olanak tanır.
:::

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Yönetici erişimine sahip bir B1 Admin hesabı
- Ödeme toplamak için: önce [Stripe'ın yapılandırılmış olması](../donations/online-giving-setup.md) gerekir

</div>

## Adım 1: Bağımsız Bir Form Oluşturma

Bağımsız formların, herkesin erişebileceği kendi herkese açık URL'leri vardır. Bu da etkinlik kaydı için idealdir.

Şu işlemleri yapmak için [Form Oluşturma](../forms/creating-forms.md) kılavuzunu izleyin:

1. Formlar bölümüne gidin ve Form Ekle düğmesine tıklayın
2. Form türü olarak "Bağımsız" seçin. Bu, formunuza kendi herkese açık URL'sini verir.
3. Forma etkinliğin adını verin (ör. "Erkekler Kampı Kaydı", "Tatil Okulu Kaydı")

## Adım 2: Sorular Ekleme

Kayıt olanlardan toplamanız gereken alanları oluşturun.

Soruları eklemek için [Form Oluşturma](../forms/creating-forms.md#adding-questions) kılavuzunu izleyin:

1. Sorular sekmesine gidin ve ihtiyacınız olan bilgiler için alanlar ekleyin: ad, e-posta, telefon, beslenme kısıtlamaları, tişört bedeni, acil durum iletişim kişisi vb.
2. Yemek tercihleri veya oturum seçimleri gibi seçenekler için Çoktan Seçmeli alanını kullanın

:::warning
Ödeme alan türü, Stripe'ın yapılandırılmış olmasını gerektirir. Çevrimiçi bağış sistemini henüz kurmadıysanız, ödeme alanları eklemeden önce [Çevrimiçi Bağış Kurulumu](../donations/online-giving-setup.md) bölümüne bakın.
:::

## Adım 3: Form Ayarlarını Yapılandırma

Kayıt formunuzun ne zaman ve nasıl kullanılabilir olacağını denetleyin.

1. Kaydın yalnızca sınırlı bir süre açık olması gerekiyorsa kullanılabilirlik tarihlerini ayarlayın
2. Herkese açık URL'yi kopyalayın. Bunu doğrudan paylaşabilirsiniz.
3. Gönderileri yönetmeye yardımcı olması için formun Yönetici veya Yalnızca Görüntüleme rolüne sahip üyeler ekleyin

## Adım 4: Web Sitenize Yerleştirme

Kayıt formunun kolayca bulunmasını sağlamak için kilise web sitenize ekleyin.

Şu işlemleri yapmak için [Sayfaları Yönetme](../website/managing-pages.md) kılavuzunu izleyin:

1. B1 web sitesi düzenleyicinizde bir sayfaya yeni bir bölüm ekleyin ve Form öğesini seçin
2. Listeden kayıt formunuzu seçin

:::tip
Bağımsız URL'yi e-postayla, sosyal medyada ve kilise bültenlerinde de paylaşın. Formun görünür olduğu yer ne kadar çoksa, o kadar fazla kayıt alırsınız.
:::

## Adım 5: Gönderileri Yönetme

Kayıtları geldikçe takip edin ve ihtiyaç duyduğunuzda verileri dışa aktarın.

Şu işlemleri yapmak için [Gönderileri Yönetme](../forms/managing-submissions.md) kılavuzunu izleyin:

1. Gelen yanıtları Gönderiler sekmesinde inceleyin
2. Elektronik tablolar, katılımcı sayısı takibi veya etkinlik koordinatörleriyle paylaşım için CSV olarak dışa aktarın

## Tamamlandı!

Etkinlik kaydınız yayında. Bağlantıyı paylaşın, web sitenize yerleştirin ve kayıtları B1 Admin üzerinden takip edin. Etkinlik sona erdiğinde, kayıtlarınız için son listeyi dışa aktarın.

## İlgili Makaleler

- [Form Oluşturma](../forms/creating-forms.md) — farklı alan türleriyle form oluşturun
- [Gönderileri Yönetme](../forms/managing-submissions.md) — form yanıtlarını inceleyin ve dışa aktarın
- [Sayfaları Yönetme](../website/managing-pages.md) — formları web sitenize yerleştirin
- [Çevrimiçi Bağış Kurulumu](../donations/online-giving-setup.md) — ödeme alanları için gereklidir
