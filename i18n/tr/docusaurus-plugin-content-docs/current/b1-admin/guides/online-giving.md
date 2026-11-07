---
title: "Kılavuz: Çevrimiçi Bağış Ayarlama"
---

# Çevrimiçi Bağış Ayarlama

<div class="article-intro">

Kilisenizde çevrimiçi bağış kabul etmek için gereken her adımı izleyin: bağış fonları oluşturmaktan ödeme işlemi için Stripe'ı bağlamaya ve bağış sayfasını cemaatinizle paylaşmaya kadar. Bu işlemlerin sonunda üyeler web siteniz ve mobil uygulamanız üzerinden çevrimiçi bağış yapabilecek.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Yönetici erişimi olan bir B1 Admin hesabı — bkz. [Roller ve İzinler](../people/roles-permissions.md)
- Bir Stripe hesabı (gerekirse [stripe.com](https://stripe.com) adresinden ücretsiz oluşturabilirsiniz)

</div>

## Adım 1: Bağış Fonları Oluşturun

Fonlar, bağışçıların bağış yapabileceği kategorilerdir. Bağış kabul edebilmek için en az bir fona ihtiyacınız var.

Bağış kategorilerinizi ayarlamak için [Fonlar](../donations/funds.md) kılavuzunu izleyin:

1. En yaygın fonlarınızı oluşturun (ör. "Genel Fon", "Bina Fonu", "Misyonlar")
2. Vergi indirimine tabi fonları uygun şekilde işaretleyin — bu, yıl sonu bağış belgelerini etkiler

:::tip
İstediğiniz zaman daha fazla fon ekleyebilirsiniz. En yaygın bağış kategorilerinizle başlayın.
:::

## Adım 2: Stripe'ı Bağlayın

Stripe tüm ödeme işlemlerini yönetir. Bağışların banka hesabınıza ulaşması için Stripe hesabınızı B1 Admin'e bağlayacaksınız.

Stripe'ı bağlamak için [Çevrimiçi Bağış Kurulumu](../donations/online-giving-setup.md) kılavuzunu izleyin:

1. Stripe panonuza giriş yapın ve Yayınlanabilir Anahtarınızı (Publishable Key) ve Gizli Anahtarınızı (Secret Key) alın
2. B1 Admin'de Ayarlar bölümüne gidin ve her iki anahtarı da girin

:::warning
Stripe, Gizli Anahtarınızı yalnızca bir kez gösterir. Stripe panosundan ayrılmadan önce kopyalayıp kaydedin. Kaybederseniz yeni bir anahtar oluşturmanız gerekir.
:::

## Adım 3: Web Sitenize Bir Bağış Sayfası Ekleyin

Bağış yapmayı kolaylaştırmak için B1 web sitenize bir bağış sayfası ekleyin.

Şunları yapmak için [Çevrimiçi Bağış Kurulumu](../donations/online-giving-setup.md) ve [Sayfaları Yönetme](../website/managing-pages.md) kılavuzlarını izleyin:

1. B1.church sitenize bir "Bağış Yap" sekmesi ekleyin
2. Bağış adresiniz şu şekilde olacak: `https://yoursubdomain.b1.church/donate`
3. Üyeler giriş yapmadan bağış yapabilir (herkese açık sayfa) veya kayıtlı ödeme yöntemleri ve bağış geçmişi için giriş yapabilir

## Adım 4: Bir Deneme Bağışı Yapın

Cemaatinize duyurmadan önce her şeyin çalıştığını doğrulayın.

1. Sürecin baştan sona çalıştığını doğrulamak için küçük bir deneme bağışı yapın
2. Bağışın B1 Admin'de Bağışlar altında göründüğünü kontrol edin

:::tip
Gerçek ücret almadan doğrulamak istiyorsanız önce Stripe'ın test modunu kullanın, ardından cemaatinize duyurmadan önce canlı moda geçin.
:::

## Adım 5: Cemaatinize Duyurun

Üyelerin çevrimiçi bağış yapabileceğini bilmeleri için duyurun.

1. Bağış adresini web siteniz, e-posta bültenleriniz, ibadet bültenleriniz ve sosyal medya hesaplarınız üzerinden paylaşın
2. Üyeler ayrıca [B1 Mobile uygulaması](../../b1-mobile/giving/) üzerinden bağış yapabilir — bağış özelliği uygulamaya dahildir

:::info
Giriş yapan üyeler ödeme yöntemlerini kaydedebilir, düzenli bağışlar ayarlayabilir ve bağış geçmişlerini görüntüleyebilir. Anonim bağış da yapılabilir — giriş yapmak gerekmez.
:::

## Adım 6: Sürekli Yönetim

Yıl boyunca bağış kayıtlarınızı güncel tutun ve raporlar oluşturun.

1. Kayıtlarınızı güncel tutmak için [Stripe işlemlerini içe aktarın](../donations/stripe-import.md) (haftalık veya aylık olarak)
2. Bağış eğilimlerini ve fona göre toplamları takip etmek için [bağış raporlarını görüntüleyin](../donations/donation-reports.md)
3. Bağışçılarınızın vergi kayıtları için [yıl sonu bağış belgeleri oluşturun](../donations/giving-statements.md)

:::tip
Kayıtlarınızın güncel kalması için Stripe içe aktarımlarını en az ayda bir çalıştırın. Yıl sonu sürecinin tamamı için [Yıl Sonu Raporları Kılavuzu](./year-end-reports.md) sayfasına bakın.
:::

## Tamamlandı!

Kiliseniz artık çevrimiçi bağış kabul ediyor. Üyeler web siteniz, B1 Mobile uygulaması veya web tarayıcısı olan herhangi bir cihaz üzerinden bağış yapabilir. Tüm bağışlar B1 Admin içinde otomatik olarak takip edilir.

## İlgili Makaleler

- [Fonlar](../donations/funds.md) — bağış kategorileri oluşturun ve yönetin
- [Gruplar (Batches)](../donations/batches.md) — bağışları gruplar halinde düzenleyin
- [Bağışları Kaydetme](../donations/recording-donations.md) — nakit ve çek bağışlarını elle girin
- [Stripe İçe Aktarma](../donations/stripe-import.md) — çevrimiçi işlemleri B1 Admin'e aktarın
- [Bağış Raporları](../donations/donation-reports.md) — bağış eğilimlerini ve toplamlarını görüntüleyin
- [Bağış Belgeleri](../donations/giving-statements.md) — yıl sonu vergi belgeleri oluşturun
- [Bağış Yapma (Web)](../../b1-church/giving/making-donations.md) — üyelerin bağış deneyimi
- [Bağış Yapma (Mobil)](../../b1-mobile/giving/making-donations.md) — mobil uygulamadan bağış yapma
