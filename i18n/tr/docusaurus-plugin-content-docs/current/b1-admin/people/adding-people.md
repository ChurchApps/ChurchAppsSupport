---
title: "Kişi Ekleme"
---

# Kişi Ekleme

<div class="article-intro">

Kişiler bölümü B1 Admin'in temelidir; kilisenizin üye veritabanıdır. Diğer tüm özellikler (gruplar, yoklama, bağışlar, formlar) kişi kayıtlarına bağlıdır. Bu kılavuz, veritabanınıza bir kişi eklemeyi, bilgilerini düzenlemeyi ve aile üyelerini hanelere bağlamayı adım adım gösterir.

</div>

## Eğitim Videosu

<YouTube id="NTL1UDQpx8s" title="B1'de Kişi ve Hane Ekleme" next="B1'de Kişi Veritabanınızı İçe Aktarma" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Kişileri yönetme iznine sahip etkin bir B1 Admin hesabına ihtiyacınız var. Erişim düzeyinizden emin değilseniz [Roller ve İzinler](roles-permissions.md) sayfasına bakın.
- Birkaç kişiden fazlasını ekleyecekseniz, bunun yerine [CSV İçe Aktarma](importing-data.md) aracını kullanmayı düşünün.

</div>

## Kişi Ekleme

1. B1.church Admin gösterge paneline gidin.
2. [Hızlı Erişim menüsünü](../introduction.md#getting-around-with-the-jump-menu) (sol üstteki arama çubuğu) açın, **Kişiler**'i genişletin ve **Kişiler**'e tıklayın.
3. Sayfa başlığındaki **Kişi Ekle** düğmesine tıklayın. Sayfa aşağı kayarak dizinin altındaki **Yeni Kişi Ekle** formuna gider.
4. Kişinin **Adı**, **Soyadı** ve **E-postası**nı doldurun, ardından **Ekle**'ye tıklayın.

Kişinin profil sayfası açılır ve buradan daha fazla ayrıntı ekleyebilirsiniz.

:::tip
Başka bir kilise yönetim sisteminden geçiş yapıyorsanız, [Verileri İçe Aktar](importing-data.md) özelliği tüm dizininizi bir CSV dosyasından aktarmanıza olanak tanır. Bu, kişileri tek tek eklemekten çok daha hızlıdır.
:::

### Yinelenen Kayıt Uyarıları

Girilen e-posta adresi (veya tam Düzenle formundan kişi oluşturulurken telefon numarası ya da aynı ad, soyad ve doğum tarihi) veritabanınızda zaten bulunan biriyle eşleşirse, yeni kayıt kaydedilmeden önce **Olası Yinelenen** iletişim kutusu açılır. Kutuda her eşleşen kişi, e-posta adresi, telefon numarası ve doğum tarihiyle birlikte listelenir, böylece karşılaştırma yapabilirsiniz.

- Bir eşleşmenin yanındaki **Mevcut Olanı Kullan**'a tıklayarak yeni kayıt oluşturmak yerine o kişinin kaydını kullanın.
- Olası bir eşleşme bulunmasına rağmen yeni kişiyi eklemek için **Yine de Oluştur**'a tıklayın.

Bu kontrol yalnızca tamamen yeni bir kişi oluştururken yapılır. Mevcut bir kaydı düzenlemek hiçbir zaman bu uyarıyı tetiklemez. Yalnızca yeni yinelenen kayıtları önler; zaten var olan iki kaydı birleştirmez.

## Bilgileri Düzenleme

1. Kişinin profil sayfasında, solda iletişim bilgilerinin altındaki **Düzenle** düğmesine tıklayın.
2. **Kişisel Bilgiler** formunda; listeden **Unvan** (Mr, Mrs, Miss, Ms, Dr, Prof, Rev veya Pastor) seçin ya da en fazla 10 karakterlik kendi unvanınızı yazın. Ardından ikinci adı, üyelik durumunu (**Ziyaretçi**, **Misafir**, **Düzenli Katılımcı**, **Üye**, **Personel**, **Pasif** veya **Vefat Etmiş**), tarihleri, adresi, telefon numaralarını ve (çocuklar ve öğrenciler için) sınıf ve okul bilgisini doldurun.
3. Kişisel bilgileri kaydetmek için **Kaydet**'e tıklayın.

Profilin solunda kişinin fotoğrafı, adı, üyelik durumu, iletişim bilgileri, varsa [özel alan](../settings/custom-fields.md) değerleri ve hanesi görünür. Hanenin altında **Eklenme** tarihi, kaydın oluşturulduğu tarihi gösterir (yalnızca 2026 yılının Ekim ayının sonundan sonra eklenen kişiler için). Fotoğrafı değiştirmek için fotoğrafa tıklayın. **Düzenle** düğmesinin altında birkaç işlem daha bulunur: **İş Akışı** (kişiyi bir [iş akışına](../serving/workflows.md) ekleyin), **Birleştir**, **Dışa Aktar** ve **Verileri Dışa Aktar**.

Profilin geri kalanında, ilgili bilgi türlerinin her biri için bir özet bölümü yer alır:

- **Yoklama**: Kişinin son birkaç haftada hangi haftalara katıldığını ve en son ziyaretlerini gösterir. Tüm ziyaret geçmişini (kampüs, ayin, ayin saati, grup ve kiosk check-in saatini gösteren **Check-in Saati** sütunu; kiosk check-in'i olmayan ziyaretler için tire işareti gösterilir) görmek için **Tüm yıllar**'a tıklayın. Yazdırmak için **Yazdır**'a tıklayın. Yazdırılan çıktının üst kısmında, kişinin adının üzerinde kilisenizin logosu ve adı ortalanmış olarak yer alır. Tek bir kişinin geçmişi yerine kilise genelindeki eğilimler için [Yoklamayı Takip Etme](../attendance/tracking-attendance.md) sayfasına bakın.
- **Bağışlar**: Bu yılki bağışları, bağışlanamaz fonlara yapılanlar dahil olmak üzere gösterir. Tam [bağış geçmişi](../donations/recording-donations.md) için **Tüm yıllar**'a veya yeni bir bağış kaydetmek için **Bağış kaydet**'e tıklayın. Kiliseniz [Bağış Gizliliği](../settings/church-settings.md#giving-privacy) özelliğini açtıysa, tutarlar siz **Bağışları göster**'e tıklayana kadar gizli kalır.
- **Gruplar**: Kişinin [grup üyeliklerini](../groups/group-members.md) listeler. Kayıtlı olduğunda her grup için **Katılma** ve katıldığı tarihi gösterir.
- **Notlar**: Kişi hakkındaki son notları gösterir (pastoral bakım, takip vb.). Notları okumak ve eklemek için **Tüm notlar**'a tıklayın. Her not, kimin yazdığını ve notun gönderildiği tarih ve saati gösterir. Tüm kişilerdeki son notları aynı anda görmek için [Notlar](./notes.md) sayfasını kullanın.
- **Formlar**: Kişinin formlarını ve her birinin gönderilip gönderilmediğini listeler (aşağıdaki [Formlarla Çalışma](#working-with-forms) bölümüne bakın).

Bu tam görünümlerden birini açtığınızda, profile dönmek için sayfanın üstündeki kişinin adını içeren **Geri dön** bağlantısına tıklayın.

## Kişiye E-posta Gönderme

Kişinin kayıtlı bir e-posta adresi varsa, profilin solunda iletişim bilgilerinin altında bir **E-posta** düğmesi görünür.

1. Kişinin profilinde **E-posta**'ya tıklayın.
2. Kişinin adıyla başlığı olan **E-posta** iletişim kutusu açılır ve **Alıcı** kısmında kişinin adresini gösterir.
3. İsterseniz **Şablon Yükle (isteğe bağlı)** seçeneğinden kayıtlı bir şablon seçin.
4. Bir **Konu** girin ve iletiyi yazın.
5. **E-postayı Gönder**'e tıklayın.

Bunun yerine iletiyi kendi e-posta programınızda yazmak için **E-posta uygulamamda aç**'a tıklayın.

:::info
B1 üzerinden gönderim, grup e-postasıyla aynı onay ve günlük limitlerini kullanır. Kiliseniz henüz onaylanmadıysa iletişim kutusu sizden inceleme talep etmenizi ister. Bu sırada yine de **E-posta uygulamamda aç**'a tıklayabilirsiniz. Bkz. [Kiliniz İçin Grup E-postasını Açma](../groups/group-members.md#turning-on-group-email-for-your-church). Grup üyelerini düzenleme izni olmayan kullanıcılar **E-posta**'ya tıkladıklarında doğrudan e-posta uygulamalarına yönlendirilir.
:::

## Formlarla Çalışma

Özel formları doğrudan kişinin profilinden doldurabilirsiniz. Bunlar, [Form Oluşturma](../forms/creating-forms.md) kılavuzunu izleyerek oluşturabileceğiniz kullanıcı tanımlı formlardır.

1. Kişinin profilinde **Formlar** bölümünü bulun. Bu bölüm her formu, **Gönderildi** veya **Gönderilmedi** durumuyla birlikte listeler.
2. Bir formu açmak için adına tıklayın (ya da tam listeyi görmek için **Tüm formlar**'a tıklayın).
3. Formdaki **düzenle simgesine** (kalem) tıklayın, ayrıntıları doldurun ve **Kaydet**'e tıklayın.

Bir form gönderildikten sonra, kişinin doldurduğu yanıtları yazdırmak için yanındaki **yazdır simgesine** tıklayın. Kişinin bir formu tek bir kez göndermiş olması durumunda, form yanıtların üstünde tarihle birlikte **Gönderildi** olarak görünür.

Bir gönderim yanlış kişiye ait olduysa, onu başka birine taşımak veya bağlantısını kaldırmak için yanındaki **Kişiyi değiştir** simgesine (iki ok) tıklayın. Bkz. [Bir Gönderimdeki Kişiyi Değiştirme](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Kişinin profiline bağlı formlar **Kişiler** form türünü kullanır. Bir etkinlik kaydı gibi bağımsız bir form gerekiyorsa, form kılavuzundaki [Bağımsız form seçeneğine](../forms/creating-forms.md) bakın.
:::

:::tip
Kişiler hakkında yalnızca bir veya iki ek bilgi (bir tarih, bir sayı ya da evet/hayır yanıtı) takip etmeniz gerekiyorsa, form yerine [Özel Alanlar](../settings/custom-fields.md) kullanın. Bunları doldurmak daha hızlıdır ve doğrudan Gelişmiş Arama'da aranabilirler.
:::

## Hanelerle Çalışma {#managing-households}

Haneler, aile üyelerini birbirine bağlamanıza olanak tanır. Bu özellik özellikle [check-in](../attendance/check-in.md) için kullanışlıdır, çünkü bir ebeveyn tüm çocuklarını tek seferde check-in yapabilir.

1. Kişinin profilinde, solda **Hane** başlığının yanındaki **Düzenle**'ye tıklayın.
2. Hane düzenleyici açılır. Mevcut kişi için **hane rolünü** seçin (örneğin Baş, Eş, Çocuk veya Diğer).
3. Başka bir hane üyesi eklemek için **Ekle** simgesine tıklayın.
4. **Hane Üyesi Ekle** altında, arama kutusuna kişinin adını yazın ve **Enter** tuşuna basın ya da arama simgesine tıklayın. (Yazmadan önce kısa bir **Son kişiler** listesi gösterilir.)
5. Kişi sonuçlarda göründüğünde, adına veya yanındaki ekle simgesine tıklayın.
6. Kişinin hane rolünü seçin ve hane kurulumunu tamamlamak için **Kaydet**'e tıklayın.
