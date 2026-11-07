---
title: "Kılavuz: Yıl Sonu Bağış Raporları Oluşturma"
description: "B1 Admin'de yılın bağış kayıtlarını tamamlayın, fon vergi ayarlarını kontrol edin ve her bağışçı için vergi indirimli bağış dökümleri oluşturun."
---

# Yıl Sonu Bağış Raporları Oluşturma

<div class="article-intro">

Bağış kayıtlarınızı sonlandırma, fon ayarlarını doğrulama ve her bağışçı için vergi indirimli bağış belgeleri oluşturma yıl sonu sürecinde size yol gösterir. Bu işlem genellikle bir önceki takvim yılı için Ocak ayının başında yapılır.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Mali erişimi olan bir B1 Admin hesabı
- Yıl boyunca kaydedilmiş bağışlar (Stripe üzerinden çevrimiçi veya elle girilmiş)
- Çevrimiçi bağış kabul ediyorsanız Stripe hesabınıza erişim

</div>

## Adım 1: Son Stripe İşlemlerini İçe Aktarma

Yılın sonuna ait tüm çevrimiçi bağışların sisteminizde olduğundan emin olun.

Şu işlemleri yapmak için [Stripe İçe Aktarma](../donations/stripe-import.md) kılavuzunu izleyin:

1. Bağışlar > Stripe İçe Aktarma bölümüne gidin
2. Yılın sonunu kapsayan bir tarih aralığı seçin (ör. 1 Aralık - 31 Aralık)
3. İnceleyebilmek için önce Önizle'ye, ardından işlemi tamamlamak için Eksikleri İçe Aktar'a tıklayın

:::warning
Bu içe aktarmayı belge oluşturmadan önce çalıştırın. İçe aktarmadığınız işlemler bağışçı belgelerinde görünmez.
:::

## Adım 2: Bağış Raporlarını İnceleme

Belge oluşturmadan önce kayıtlarınızın doğru olduğunu doğrulayın.

Şu işlemleri yapmak için [Bağış Raporları](../donations/donation-reports.md) kılavuzunu izleyin:

1. Tüm yıla ait bağış özeti sayfasını kontrol edin
2. Fon bazında toplamları gözden geçirin ve olası tutarsızlıkları yakalamak için banka ekstrelerinizle karşılaştırın
3. Gerekirse bağışçı düzeyindeki ayrıntıları doğrulamak için tek tek gruplara tıklayın

## Adım 3: Fonların Vergi Durumunu Doğrulama

Belgelerin doğru olması için her fonun vergi indirimi ayarının doğru olduğundan emin olun.

Şu işlemi yapmak için [Fonlar](../donations/funds.md) kılavuzunu izleyin:

1. Her fonu açın ve vergi indirimi ayarının doğru olduğunu onaylayın

:::info
Yalnızca vergi indirimli olarak işaretlenmiş fonlara yapılan bağışlar bağış belgelerinde görünür. Bir fonun vergi indirimli olması gerekiyorsa ama öyle işaretlenmemişse, belge oluşturmadan önce güncelleyin.
:::

## Adım 4: Bağış Belgeleri Oluşturma

Bağışçılarınız için resmi bağış belgelerini oluşturun.

Şu işlemleri yapmak için [Bağış Belgeleri](../donations/giving-statements.md) kılavuzunu izleyin:

1. **Bağışlar > Bağış Belgeleri** bölümüne gidin
2. Açılır listeden yılı seçin ve özet istatistikleri inceleyin
3. İndirme yönteminizi seçin:
   - **ZIP İndir** — her bağışçı için bir tane olmak üzere ayrı CSV dosyaları
   - **Tümünü Yazdır** — her belgenin yeni bir sayfada yer aldığı, yazdırılabilir görünüm (yüklediyseniz kilise logonuzun en üstte yer aldığı)

:::tip
Kayıtlar taze kalırken Ocak ayının başında belgeleri oluşturun. Bu, postalamadan önce olası sorunları fark etmek için size zaman tanır.
:::

## Adım 5: Bağışçılara Dağıtma

Belgeleri bağışçılarınızın eline ulaştırın.

1. Belgeleri yazdırıp postalayın veya ayrı CSV dosyalarını bağışçılara e-posta ile gönderin
2. Üyeler kendi bağış geçmişlerini görüntüleyebilir ve belgelerini [B1.church](../../b1-church/giving/donation-history.md) ile [B1 Mobile uygulamasından](../../b1-mobile/giving/donation-history.md) yazdırabilir

## Tamamlandı!

Yıl sonu bağış raporlarınız hazır. Bağışçılarınız vergi indirimli belgelerini aldı ve kilise mali kayıtlarınız o yıl için kesinleştirildi.

## İlgili Makaleler

- [Stripe İçe Aktarma](../donations/stripe-import.md) — çevrimiçi işlemleri içe aktarma
- [Bağış Raporları](../donations/donation-reports.md) — bağış eğilimlerini ve toplamları görüntüleme
- [Fonlar](../donations/funds.md) — fonları ve vergi indirimi ayarlarını yönetme
- [Bağış Belgeleri](../donations/giving-statements.md) — yıl sonu belgeleri oluşturma
- [Bağış Kaydetme](../donations/recording-donations.md) — nakit/çek bağışlarını elle girme
- [Bağış Geçmişi (Web)](../../b1-church/giving/donation-history.md) — üyelerin kendi bilgilerini görüntülediği self-servis ekranı
- [Çevrimiçi Bağış Kılavuzunu Kurma](./online-giving.md) — ilk Stripe ve bağış kurulumu
