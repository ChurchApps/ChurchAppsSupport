---
title: "Mailchimp"
description: "B1 Admin kişilerini ve grup ya da kayıtlı liste üyeliklerini etiket olarak Mailchimp kitlesiyle senkronize edin; kurulum, ilk içe aktarma ve sorun giderme adımlarıyla."
---

# Mailchimp

<div class="article-intro">

B1 ile bir Mailchimp kitlesini otomatik olarak eşitleyin: kişiler adları, e-posta adresleri ve telefon numaralarıyla otomatik olarak aktarılır; grup ve liste üyelikleri Mailchimp etiketlerine dönüşür; silinen kişiler arşivlenir. Eşitleme B1'in içine yerleşiktir. Üçüncü taraf bir hizmet gerekmez, görev başına ücretlendirme yoktur ve değişiklikler gece bir kez değil, neredeyse gerçek zamanlı olarak iletilir.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- B1'in yönetmesini istediğiniz kitleyi içeren bir [Mailchimp](https://mailchimp.com) hesabı
- Bir Mailchimp **API anahtarı** (Mailchimp: profil simgesi → **Account & billing → Extras → API keys**)
- **Kitle Kimliğiniz** (Mailchimp: **Audience → Settings → Audience name and defaults**)
- **Ayarları Düzenle** iznine sahip bir B1Admin kullanıcısı

</div>

## Neler Eşitlenir

| B1 değişikliği | Mailchimp'teki etkisi |
|---|---|
| Kişi eklendi veya güncellendi | Abone eklenir/güncellenir (ad, soyad, telefon; yeni aboneler `subscribed` durumuyla gelir) |
| Kişi silindi (veya GDPR kapsamında silindi) | Abone arşivlenir |
| Kişi bir gruba katıldı | Grubun adıyla anılan etiket eklenir |
| Kişi bir gruptan ayrıldı | Bu etiket kaldırılır |
| Kişi kayıtlı bir listeye girdi | Listenin adıyla anılan etiket eklenir |
| Kişi kayıtlı bir listeden ayrıldı | Bu etiket kaldırılır |

**Genellikle kayıtlı listeler daha iyi bir etiket kaynağıdır.** B1 [kayıtlı liste](/docs/b1-admin/people/lists), kendini yeniden değerlendiren, kurallara dayalı bir kitledir. Örneğin "Kuzey kampüsündeki herkes" veya "pastoral e-postalara katılmayı kabul eden üyeler" gibi. Mailchimp segmentlerinizi liste etiketlerine yönlendirirseniz eşitleme bunları kendiliğinden güncel tutar. Grup etiketlerini ise ekip bazlı posta gönderimleri için kullanın.

Eşitleme **tek yönlüdür** (B1 → Mailchimp) ve yalnızca Mailchimp'in standart alanlarına dokunur. Bu nedenle Mailchimp içinde yönettiğiniz birleştirme alanlarıyla veya segmentlerle çakışmaz.

## Kurulum

1. B1Admin'de **Settings → Developer → Webhooks → New Webhook** yolunu izleyin.
2. **Connector Type** alanını **Mailchimp** olarak ayarlayın.
3. **Mailchimp API Key** ve **Audience ID** değerlerinizi yapıştırın. Anahtar şifrelenmiş olarak saklanır ve bir daha gösterilmez.
4. İlgili olaylar önceden seçilidir. İstemediklerinizin işaretini kaldırın (örneğin kişi olaylarını açık bırakıp grup etiketlerini atlayabilirsiniz).
5. Kaydedin. B1, kabul etmeden önce anahtarı ve kitleyi Mailchimp ile doğrular. Yazım hatası varsa neden belirtilerek hemen hata verilir.

Bağlantıyı istediğiniz zaman yeniden doğrulamak için **Test Gönder** seçeneğini kullanın. Her eşitleme denemesi, webhook'un teslimat geçmişinde Mailchimp'in gerçek yanıtıyla birlikte kaydedilir. Başarısız teslimatlar, yaklaşık beş gün boyunca artan bekleme süreleriyle otomatik olarak yeniden denenir.

## İlk Aktarım

Bağlayıcı, açıldığı andan itibaren *değişiklikleri* eşitler. Mevcut rehberinizi geriye dönük olarak aktarmaz. Kurulum gününde şunları yapın:

1. B1Admin'de **People** bölümüne gidin, aktarmak istediğiniz kişileri arayın (veya kayıtlı bir listeyi çalıştırın) ve CSV dosyasını indirmek için **Export** düğmesine tıklayın.
2. Mailchimp'te **Audience → Import contacts** ile CSV dosyasını yükleyin ve içe aktarma sırasında istediğiniz etiketleri uygulayın.

İlk yüklemeyi Mailchimp'in içe aktarıcısı üzerinden yapmak, onay konusunda kontrolü elinizde tutmanızı sağlar. Yalnızca e-posta almayı gerçekten kabul etmiş kişileri içe aktarın. Tüm bir rehberi abone olarak toplu şekilde aktarmak, Mailchimp'in kullanım koşullarını ve spam karşıtı yasaları (CAN-SPAM/GDPR) ihlal edebilir.

## Sınırlamalar ve Notlar

- **Tek yönlü eşitleme.** Mailchimp'te yapılan abonelikten çıkmalar, geri dönen e-postalar ve düzenlemeler B1'e geri aktarılmaz. Mailchimp'te abonelikten çıkan biri, B1'den doğrudan gönderilen e-postaları almaya devam edebilir. Toplu posta onayı konusunda Mailchimp'i gerçek kaynak olarak kabul edin.
- **E-posta adresi olmayan kişiler atlanır** (teslimat geçmişinde bu şekilde kaydedilir). Mailchimp aboneleri e-posta adresiyle eşleştirilir.
- **E-posta adresi değişiklikleri yeni bir abone oluşturur.** Mailchimp kişileri e-posta adresiyle tanımlar. Bu nedenle B1'de bir kişinin e-posta adresini değiştirmek, kişiyi yeni adresle ekler. Eski abone, siz Mailchimp'te arşivleyene kadar kalır.
- **Yalnızca standart alanlar eşitlenir**: ad, soyad ve telefon. Bu sürümde üyelik durumu, kampüs ve özel B1 alanları Mailchimp birleştirme alanlarıyla eşleşmez. Segmentasyon için liste etiketlerini kullanın.
- **Etiket adları, grup ve liste adlarıdır.** Bir grubu veya listeyi yeniden adlandırdığınızda yeni etiketleme yeni adla başlar. Eski etiket, Mailchimp'te kaldırılana kadar mevcut abonelerde kalır.
- **Mailchimp'in kişi sınırları geçerlidir.** Ücretsiz planlı bir kitleyi sınırını aşan bir eşitleme, teslimat geçmişinde `Member limit reached` hatalarını kaydeder.

## Diğer Tarifler (Zapier / Make)

Kitle eşitlemesinin ötesindeki işlemler (örneğin `donation.created` olayında bağışçılara etiket eklemek, Mailchimp'ten B1'e ters yönde veri aktarmak veya tamamen farklı bir e-posta platformuna, örneğin Constant Contact veya Brevo'ya eşitleme yapmak) hâlâ [Zapier](../zapier.md) veya [Make](../make.md) üzerinden yapılabilir. Bu araçlar aynı webhook olaylarını tetikler:

- **Bağışçılara etiket ekleme:** B1 *New Donation* → B1 *Find Person* → Mailchimp *Add Subscriber to Tag* (`Gave-2026`)
- **İki yönlü:** Mailchimp *New Subscriber* → B1 *Create Person*

Kişi ve grup eşitlemesini daha önce Zapier üzerinden kurduysanız, yerleşik bağlayıcıyı etkinleştirdikten sonra bu Zap'leri kapatın. İkisini birden çalıştırmak her olayı iki kez işler ve boşuna Zapier görevi tüketir.

## Sorun Giderme

- **Kaydetme "Mailchimp rejected the API key" hatasıyla başarısız oluyor.** Anahtar iptal edilmiş veya yanlış yazılmıştır. Anahtarlar `-us21` gibi bir veri merkezi son ekiyle bitmelidir.
- **Kaydetme "audience not found" hatasıyla başarısız oluyor.** Kitle Kimliği o hesapta bulunmuyor. **Audience → Settings → Audience name and defaults** bölümünden kopyalayın. Kitlenin adı değil, kimliği kullanılmalıdır.
- **Bir kişi Mailchimp'te hiç görünmedi.** Webhook'un teslimat geçmişini kontrol edin. "Skipped: person has no email address" mesajı tam olarak bunu belirtir. Mailchimp'ten gelen bir `4xx` yanıtı, nedenini yanıt gövdesinde gösterir.
- **Teslimatlar tamamen durdu.** Art arda tükenen teslimatlardan sonra webhook otomatik olarak devre dışı kalır. Nedeni giderin (genellikle iptal edilmiş bir anahtar), webhook'u yeniden etkinleştirin ve doğrulamak için **Test Gönder** seçeneğini kullanın.

## Ayrıca Bakınız

- [Webhooks (geliştirici başvuru kılavuzu)](/docs/developer/api/webhooks): altyapı, olay kataloğu, teslimat ve yeniden deneme davranışı
- [Kayıtlı Listeler](/docs/b1-admin/people/lists): Mailchimp etiketleriyle doğal olarak eşleşen, kurallara dayalı kitleler
- [Zapier (genel bakış)](../zapier.md): kitle eşitlemesinin ötesindeki tarifler için
