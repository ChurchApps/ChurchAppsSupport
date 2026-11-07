---
title: "Kılavuz: Kilise Web Sitenizi Yayınlayın"
---

# Kilise Web Sitenizi Yayınlayın

<div class="article-intro">

B1.church, ek bir ücret olmadan tam kapsamlı bir web sitesi oluşturucu içerir. Bu kılavuz, kilise web sitenizi sıfırdan oluşturma sürecinde size yol gösterir: ana sayfanızı ayarlama, görünümünüzü ve hissinizi yapılandırma, önemli sayfalar ekleme ve isteğe bağlı olarak çevrimiçi bağış ve etkinlik kayıt formlarını bağlama.

</div>

## Eğitim Videosu

<YouTube id="aA4UahZpmXg" title="B1'de Kilise Web Sitenizi Yayınlama" next="B1'de Sayfaları ve Gezinmeyi Düzenleme" nextUrl="/docs/b1-admin/website/page-editor" />

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Kilise logonuzu hazır bulundurun (şeffaf arka planlı PNG en iyi sonucu verir)
- Siteniz için 2–3 marka rengi seçin
- Özel bir alan adı kullanacaksanız (ör. yourchurch.com), DNS sağlayıcınıza (GoDaddy, Cloudflare vb.) erişiminiz olsun
- Sitenizde çevrimiçi bağış almak istiyorsanız, önce [Çevrimiçi Bağış Kurulumu](../donations/online-giving-setup.md) (Stripe) adımlarını tamamlayın

</div>

## Adım 1: İlk Web Sitesi Kurulumu

Ana sayfanızı ve temel site yapınızı oluşturarak başlayın.

Şu işlemleri yapmak için [Web Sitesi İlk Kurulumu](../website/initial-setup.md) kılavuzunu izleyin:

1. B1 Admin'de **Web Sitesi** bölümüne gidin
2. Bir kahraman bölümü, hoş geldiniz mesajı ve temel bilgilerle ana sayfanızı oluşturun
3. Kilise adınızı ve sloganınızı ekleyin

## Adım 2: Görünümü Yapılandırın

Sitenizin görsel kimliğini belirleyin: renkler, yazı tipleri, logo ve altbilgi.

Şu işlemleri yapmak için [Görünüm](../website/appearance.md) kılavuzunu izleyin:

1. Kilise logonuzu yükleyin
2. Birincil ve vurgu renklerinizi belirleyin
3. Gezinme çubuğunu ve altbilgiyi yapılandırın
4. Değişikliklerinizi önizleyin

:::tip
Renk paletinizi sade tutun. Genellikle bir birincil renk ve bir vurgu rengi yeterlidir. Geri kalanını web sitesi oluşturucu halleder.
:::

## Adım 3: İçerik Sayfaları Ekleyin

Ziyaretçilerinizin en çok ihtiyaç duyduğu sayfaları oluşturun.

Şu tür sayfaları oluşturmak için [Sayfaları Yönetme](../website/managing-pages.md) kılavuzunu izleyin:

- **Hakkımızda** — Kilisenizin hikayesi, inançları ve liderliği
- **Vaazlar** — [vaaz kütüphanenize](../sermons/managing-sermons.md) bağlantı
- **Etkinlikler** — Yaklaşan etkinlikler ve kayıt
- **Bağış Yap** — Çevrimiçi bağış sayfası ([Stripe kurulumu](../donations/online-giving-setup.md) gerektirir)
- **İletişim** — Konum, ibadet saatleri ve iletişim bilgileri

## Adım 4: Alan Adınızı Bağlayın

Varsayılan B1 adresi yerine kendi alan adınızı (ör. yourchurch.com) kullanmak istiyorsanız:

1. B1 Admin'de **Ayarlar** bölümüne gidin ve **Alan Adları** kısmını açın
2. Özel alan adınızı girin
3. Alan adı sağlayıcınızdaki DNS kayıtlarını B1'i gösterecek şekilde güncelleyin

:::info
DNS değişikliklerinin yayılması 48 saate kadar sürebilir. Sitenize özel alan adınızdan hemen erişilemeyebilir. Bu süre boyunca varsayılan B1 adresi çalışmaya devam eder.
:::

## Adım 5: Bağış ve Formlar Ekleyin

Sitenizi etkileşimli öğelerle zenginleştirin:

- **Çevrimiçi Bağış** — Üyelerin doğrudan web sitenizden bağış yapabilmesi için bir bağış bölümü ekleyin. Önce Stripe'ı yapılandırmak için [Çevrimiçi Bağış Kurulumu](../donations/online-giving-setup.md) bölümüne bakın.
- **Kayıt Formları** — Etkinlik kayıtları, ziyaretçi kartları veya gönüllü başvuruları için [Bağımsız formlar](../forms/creating-forms.md) ekleyin. Herhangi bir sayfaya form öğesinin nasıl ekleneceğini öğrenmek için [Sayfaları Yönetme](../website/managing-pages.md) bölümüne bakın.

## Tamamlandı!

Kilise web siteniz yayında. Adresi cemaatinizle ve sosyal medyada paylaşın. İçeriği güncelleyebilir, yeni sayfalar ekleyebilir ve görünümü istediğiniz zaman B1 Admin panelinden değiştirebilirsiniz.

## İlgili Makaleler

- [Web Sitesi İlk Kurulumu](../website/initial-setup.md) — ayrıntılı kurulum adımları
- [Sayfaları Yönetme](../website/managing-pages.md) — sayfa ekleme ve düzenleme
- [Görünüm](../website/appearance.md) — renkler, logo ve düzen
- [Dosyaları Yönetme](../website/files.md) — görsel ve belge yükleme
- [Çevrimiçi Bağış Kurulumu](../donations/online-giving-setup.md) — Stripe yapılandırması
- [Form Oluşturma](../forms/creating-forms.md) — kayıt ve anket formları oluşturma
