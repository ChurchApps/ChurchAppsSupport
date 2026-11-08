---
title: "Kılavuz: Çevrimiçi Bağışları Ayarlama"
description: "B1 Admin'de bağış fonları oluşturarak, Stripe'ı bağlayarak ve üyeler için B1.church web sitenize Bağış sayfası ekleyerek çevrimiçi bağışları ayarlayın."
---

# Çevrimiçi Bağışları Ayarlama

<div class="article-intro">

Kilisenizde çevrimiçi bağış kabul etmek için gereken her şeyi adım adım görün: bağış fonları oluşturmaktan, ödeme işlemi için Stripe'ı bağlamaya ve bağış sayfasını cemaatinizle paylaşmaya kadar. Bu işlemler tamamlandığında üyeler web siteniz ve mobil uygulamanız üzerinden çevrimiçi bağış yapabilecek.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Yönetici erişimine sahip bir B1 Admin hesabı — bkz. [Roller ve İzinler](../people/roles-permissions.md)
- Bir Stripe hesabı (gerekirse [stripe.com](https://stripe.com) adresinde ücretsiz oluşturabilirsiniz)

</div>

## Adım 1: Bağış Fonları Oluşturma

Fonlar, bağışçıların bağış yapabileceği kategorilerdir. Bağış kabul edebilmek için en az bir fona ihtiyacınız vardır.

Bağış kategorilerinizi ayarlamak için [Fonlar](../donations/funds.md) kılavuzunu izleyin:

1. En yaygın fonlarınızı oluşturun (ör. "Genel Fon", "Bina Fonu", "Misyonlar")
2. Vergi indirimine tabi fonları uygun şekilde işaretleyin — bu, yıl sonu bağış belgelerini etkiler

:::tip
İstediğiniz zaman daha fazla fon ekleyebilirsiniz. En yaygın bağış kategorilerinizle başlayın.
:::

## Adım 2: Stripe'ı Bağlama

Tüm ödeme işlemleri Stripe tarafından yürütülür. Bağışların banka hesabınıza ulaşması için Stripe hesabınızı B1 Admin'e bağlayacaksınız.

Stripe'ı bağlamak için [Çevrimiçi Bağış Kurulumu](../donations/online-giving-setup.md) kılavuzunu izleyin:

1. Stripe panonuza giriş yapın ve Yayımlanabilir Anahtarınızı ve Gizli Anahtarınızı alın
2. B1 Admin'de Ayarlar bölümüne gidin ve her iki anahtarı da girin

:::warning
Stripe, Gizli Anahtarınızı yalnızca bir kez gösterir. Stripe panosundan çıkmadan önce kopyalayıp kaydedin. Kaybederseniz yeni bir tane oluşturmanız gerekir.
:::

## Adım 3: Web Sitenize Bir Bağış Sayfası Ekleme

Bağış yapmayı kolaylaştırmak için B1 web sitenize bir bağış sayfası ekleyin.

Şunları yapmak için [Çevrimiçi Bağış Kurulumu](../donations/online-giving-setup.md) ve [Sayfaları Yönetme](../website/managing-pages.md) kılavuzlarını izleyin:

1. B1.church sitenize bir "Bağış" sekmesi ekleyin
2. Bağış URL'niz şu şekilde olacak: `https://yoursubdomain.b1.church/donate`
3. Üyeler giriş yapmadan bağış yapabilir (herkese açık sayfa) veya kayıtlı ödeme yöntemleri ve bağış geçmişi için giriş yapabilir

## Adım 4: Deneme Bağışı Yapma

Cemaatinize duyurmadan önce her şeyin çalıştığını doğrulayın.

1. Sürecin baştan sona çalıştığını doğrulamak için küçük bir deneme bağışı yapın
2. Bağışın B1 Admin'de Bağışlar altında göründüğünü kontrol edin

:::tip
Gerçek ücretlendirme olmadan doğrulamak istiyorsanız önce Stripe'ın test modunu kullanın, ardından cemaatinize duyurmadan önce canlı moda geçin.
:::

## Adım 5: Cemaatinize Duyurun

Üyelerinizin çevrimiçi bağış yapabileceklerini bilmesi için haber verin.

1. Bağış URL'sini web siteniz, e-posta bültenleriniz, bülteniniz ve sosyal medya üzerinden paylaşın
2. Üyeler ayrıca [B1 Uygulaması](../../b1-church/giving/index.md) üzerinden de bağış yapabilir — bağış özelliği uygulamaya dahildir

:::info
Giriş yapan üyeler ödeme yöntemlerini kaydedebilir, düzenli bağışlar ayarlayabilir ve bağış geçmişlerini görüntüleyebilir. Anonim bağış da mümkündür — giriş yapmaya gerek yoktur.
:::

## Adım 6: Sürekli Yönetim

Bağış kayıtlarınızı güncel tutun ve yıl boyunca raporlar oluşturun.

1. Kayıtlarınızı güncel tutmak için [Stripe işlemlerini içe aktarın](../donations/stripe-import.md) (haftalık veya aylık olarak)
2. Bağış eğilimlerini ve fona göre toplamları takip etmek için [bağış raporlarını görüntüleyin](../donations/donation-reports.md)
3. Bağışçılarınızın vergi kayıtları için [yıl sonu bağış belgeleri oluşturun](../donations/giving-statements.md)

:::tip
Kayıtlarınızın güncel kalması için Stripe içe aktarmalarını en az ayda bir çalıştırın. Tüm yıl sonu süreci için [Yıl Sonu Raporları Kılavuzu](./year-end-reports.md) bölümüne bakın.
:::

## Tamamlandı!

Kiliseniz artık çevrimiçi bağış kabul ediyor. Üyeler web siteniz, B1 Uygulaması veya web tarayıcısı olan herhangi bir cihaz üzerinden bağış yapabilir. Tüm bağışlar B1 Admin'de otomatik olarak takip edilir.

## İlgili Makaleler

- [Fonlar](../donations/funds.md) — bağış kategorilerini oluşturun ve yönetin
- [Gruplar](../donations/batches.md) — bağışları gruplar halinde düzenleyin
- [Bağışları Kaydetme](../donations/recording-donations.md) — nakit ve çek bağışlarını elle girin
- [Stripe İçe Aktarma](../donations/stripe-import.md) — çevrimiçi işlemleri B1 Admin'e aktarın
- [Bağış Raporları](../donations/donation-reports.md) — bağış eğilimlerini ve toplamlarını görüntüleyin
- [Bağış Belgeleri](../donations/giving-statements.md) — yıl sonu vergi belgeleri oluşturun
- [Bağış Yapma](../../b1-church/giving/making-donations.md) — B1.church ve B1 Uygulaması'nda üyelerin bağış deneyimi
