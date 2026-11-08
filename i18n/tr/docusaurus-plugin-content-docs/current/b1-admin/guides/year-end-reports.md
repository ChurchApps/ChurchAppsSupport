---
title: "Kılavuz: Yıl Sonu Bağış Raporlarını Oluşturma"
description: "B1 Admin'de yılın bağış kayıtlarını tamamlayın, fon vergi ayarlarını kontrol edin ve her bağışçı için vergi indirimine uygun bağış belgelerini oluşturun."
---

# Yıl Sonu Bağış Raporlarını Oluşturma

<div class="article-intro">

Bağış kayıtlarınızı tamamlama, fon ayarlarını doğrulama ve her bağışçı için vergi indirimine uygun bağış belgeleri oluşturma yıl sonu sürecini adım adım inceleyin. Bu işlem genellikle bir önceki takvim yılı için Ocak ayının başında yapılır.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Finans erişimine sahip bir B1 Admin hesabı
- Yıl boyunca kaydedilmiş bağışlar (çevrimiçi olarak Stripe üzerinden ve/veya elle girilmiş)
- Çevrimiçi bağış kabul ediyorsanız Stripe hesabınıza erişim

</div>

## Adım 1: Son Stripe İşlemlerini İçe Aktarma

Yıl sonundaki tüm çevrimiçi bağışların sisteminizde olduğundan emin olun.

Şu işlemleri yapmak için [Stripe İçe Aktarma](../donations/stripe-import.md) kılavuzunu izleyin:

1. Bağışlar > Stripe İçe Aktarma bölümüne gidin
2. Yıl sonunu kapsayan bir tarih aralığı seçin (ör. 1 Aralık - 31 Aralık)
3. İncelemek için önce **Önizleme**'ye, ardından işlemi tamamlamak için **Eksikleri İçe Aktar**'a tıklayın

:::warning
Belge oluşturmadan önce bu içe aktarmayı çalıştırın. İçe aktarmadığınız işlemler bağışçı belgelerinde görünmez.
:::

## Adım 2: Bağış Raporlarını İnceleme

Belge oluşturmadan önce kayıtlarınızın doğru olduğunu doğrulayın.

Şu işlemleri yapmak için [Bağış Raporları](../donations/donation-reports.md) kılavuzunu izleyin:

1. Tam yıl için bağış özeti sayfasını kontrol edin
2. Fona göre toplamları inceleyin ve tutarsızlıkları yakalamak için banka ekstrelerinizle karşılaştırın
3. Gerekirse bağışçı bazındaki ayrıntıları doğrulamak için tek tek partilere tıklayın

## Adım 3: Fon Vergi Durumunu Doğrulama

Belgelerin doğru olması için her fonun vergi indirimi ayarının doğru olduğundan emin olun.

Şu işlemleri yapmak için [Fonlar](../donations/funds.md) kılavuzunu izleyin:

1. Her fonu açın ve vergi indirimi ayarının doğru olduğunu onaylayın

:::info
Yalnızca vergi indirimine uygun olarak işaretlenmiş fonlara yapılan bağışlar bağış belgelerinde görünür. Bir fon vergi indirimine uygun olmalıyken öyle işaretlenmemişse, belgeleri oluşturmadan önce güncelleyin.
:::

## Adım 4: Bağış Belgelerini Oluşturma

Bağışçılarınız için resmi bağış belgelerini oluşturun.

Şu işlemleri yapmak için [Bağış Belgeleri](../donations/giving-statements.md) kılavuzunu izleyin:

1. **Bağışlar > Bağış Belgeleri** bölümüne gidin
2. Açılır listeden yılı seçin ve özet istatistikleri inceleyin
3. İndirme yönteminizi seçin:
   - **ZIP İndir** — her bağışçı için bir tane olmak üzere ayrı CSV dosyaları
   - **Tümünü Yazdır** — her belgenin yeni bir sayfada yer aldığı, yazdırılabilir görünüm; yüklediyseniz kilise logonuz en üstte yer alır

:::tip
Kayıtlar taze kalırken Ocak ayının başında belgeleri oluşturun. Bu, postalamadan önce olası sorunları yakalamanız için zaman tanır.
:::

## Adım 5: Bağışçılara Dağıtma

Belgeleri bağışçılarınızın eline ulaştırın.

1. Belgeleri yazdırıp postalayın veya ayrı CSV dosyalarını bağışçılara e-posta ile gönderin
2. Üyeler de kendi bağış geçmişlerini görüntüleyebilir ve belgelerini [B1.church üzerinde veya B1 Uygulamasında](../../b1-church/giving/donation-history.md) yazdırabilir

## Tamamlandı!

Yıl sonu bağış raporlarınız hazır. Bağışçılar vergi indirimine uygun belgelerini aldı ve kayıtlarınız yıl için kesinleştirildi.

## İlgili Makaleler

- [Stripe İçe Aktarma](../donations/stripe-import.md) — çevrimiçi işlemleri içe aktarma
- [Bağış Raporları](../donations/donation-reports.md) — bağış eğilimlerini ve toplamları görüntüleme
- [Fonlar](../donations/funds.md) — fonları ve vergi indirimi ayarlarını yönetme
- [Bağış Belgeleri](../donations/giving-statements.md) — yıl sonu belgelerini oluşturma
- [Bağış Kaydetme](../donations/recording-donations.md) — nakit/çek bağışlarını elle girme
- [Bağış Geçmişi (Web)](../../b1-church/giving/donation-history.md) — üyelerin kendi kendine hizmet görünümü
- [Çevrimiçi Bağış Kurulumu Kılavuzu](./online-giving.md) — ilk Stripe ve bağış kurulumu
