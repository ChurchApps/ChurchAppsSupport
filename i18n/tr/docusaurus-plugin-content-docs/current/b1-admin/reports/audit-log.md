---
title: "Denetim Günlüğü"
---

# Denetim Günlüğü

<div class="article-intro">

Denetim günlüğü, kilise yönetim sisteminizdeki tüm önemli işlemleri ve değişiklikleri kaydeder. Oturum açma etkinliklerini incelemek, kişi kayıtlarında kimin değişiklik yaptığını izlemek, izin güncellemelerini takip etmek ve ekibiniz genelinde hesap verebilirliği sağlamak için bunu kullanın.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Sunucu yönetici erişimine sahip bir B1 Admin hesabı
- Denetim Günlüğü'nü bulmak için **Ayarlar** bölümüne gidin

</div>

## Denetim Günlüğünü Görüntüleme

1. [Jump menüsünü](../introduction.md#getting-around-with-the-jump-menu) (B1 Admin'in sol üst kısmındaki arama çubuğu) açın ve **Ayarlar**'ı genişletin.
2. **Denetim Günlüğü**'ne tıklayın.
3. Günlük, aşağıdaki sütunlara sahip bir tabloda en son kayıtları gösterir:
   - **Tarih** -- İşlemin gerçekleştiği zaman.
   - **Kategori** -- İşlemin türü (hızlı tarama için renk kodlu).
   - **İşlem** -- Yapılan eylem (ör. create, update, delete, login_success).
   - **Varlık** -- Etkilenen kaydın türü ve kimliği.
   - **IP Adresi** -- İşlemi gerçekleştiren kullanıcının IP adresi.
   - **Ayrıntılar** -- Yapılan belirli değişikliklerin özeti.

## Günlüğü Filtreleme

Sonuçları daraltmak için sayfanın üst kısmındaki filtreleri kullanın:

- **Kategori** -- İşlem türüne göre filtreleyin:
  - **Tüm Kategoriler** -- Her şeyi gösterir.
  - **Oturum Açma** -- Başarılı ve başarısız oturum açma işlemleri.
  - **Kişiler** -- Kişi kayıtlarının oluşturulması, güncellenmesi veya silinmesi.
  - **İzinler** -- İzin verilmesi ve iptal edilmesi.
  - **Bağışlar** -- Bağış kaydı değişiklikleri.
  - **Gruplar** -- Grup yönetimi işlemleri.
  - **Formlar** -- Form gönderim etkinliği.
  - **Ayarlar** -- Yapılandırma değişiklikleri.
- **Başlangıç Tarihi** -- Bu tarihten itibaren olan kayıtları gösterir.
- **Bitiş Tarihi** -- Bu tarihe kadar olan kayıtları gösterir.

Filtreleri ayarladıktan sonra sonuçları güncellemek için **Ara**'ya tıklayın.

## Kategorileri Anlamak

Her kategori, hızlı tanımlama için renk koduyla işaretlenmiştir:

- **Oturum Açma** -- Mavi çip. Başarılı ve başarısız oturum açma denemelerini izler.
- **Kişiler** -- Mor çip. Kişi kaydı oluşturma, güncelleme ve silme işlemlerini izler.
- **İzinler** -- Kırmızı çip. Erişim haklarının verildiği veya iptal edildiği zamanları izler.
- **Bağışlar** -- Yeşil çip. Bağış kaydı değişikliklerini izler.
- **Gruplar** -- Gri çip. Grup yönetimi işlemlerini izler.
- **Formlar** -- Turuncu çip. Form gönderim etkinliğini izler.
- **Ayarlar** -- Sarı çip. Yapılandırma değişikliklerini izler.

## Günlüğü Dışa Aktarma

Günlük kayıtları görüntülendiğinde bir **CSV indir** düğmesi belirir. Mevcut filtrelenmiş sonuçları çevrimdışı inceleme veya kayıt tutma amacıyla bir elektronik tabloya aktarmak için buna tıklayın.

## Sayfalama

Sonuçlar arasında gezinmek için tablonun altındaki sayfalama denetimlerini kullanın. Sayfa başına 25, 50 veya 100 kayıt gösterebilirsiniz.

:::info
Denetim günlüğü kayıtları otomatik olarak bir yıl boyunca saklanır. Sistemin performansını korumak için 365 günden eski kayıtlar silinir.
:::

:::tip
Denetim günlüğünü düzenli olarak inceleyin; özellikle yeni ekip üyeleri katıldıktan veya önemli yapılandırma değişiklikleri yaptıktan sonra. Beklenmeyen etkinlikleri erken fark etmenize yardımcı olur.
:::

## İlgili Makaleler

- [Roller ve İzinler](../settings/roles-permissions) -- Kimin neye erişebileceğini yönetin
- [Veri Güvenliği](../settings/data-security) -- Verilerinizin nasıl korunduğunu öğrenin
- [Raporlara Genel Bakış](./index.md) -- Kullanılabilir tüm raporları görün
