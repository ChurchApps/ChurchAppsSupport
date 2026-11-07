---
title: "Yoklama Kurulumu"
---

# Yoklama Kurulumu

<div class="article-intro">

Yoklamayı takip etmeden önce B1 Admin'e kilisenizin fiziksel konumlarını, ibadetlerin ne zaman yapıldığını ve her ibadette hangi grupların toplandığını bildirmeniz gerekir. Bu bir kerelik kurulum, kilisenizdeki tüm yoklama takibinin ve raporlamanın temelini oluşturan yapıyı hazırlar.

</div>

## Eğitim Videosu

<YouTube id="LQPc2gVlXvQ" title="B1'de Hizmetleri ve Yoklamayı Ayarlama" next="B1'de Çocuk Check-In Kurulumu" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Yoklama için **Hizmetleri Düzenle** iznine sahip etkin bir B1 Admin hesabına ihtiyacınız vardır. **Kurulum** seçeneği yalnızca bu izne sahip kişilere görünür; yalnızca yoklamayı görüntülemek yeterli değildir. Erişim düzeyinizden emin değilseniz [Roller ve İzinler](../people/roles-permissions.md) bölümüne bakın.
- Grupları ibadet saatlerine atamayı planlıyorsanız, önce [gruplarınızı oluşturduğunuzdan](../groups/creating-groups.md) emin olun.

</div>

## Temel Kavramlar

- **Kampüs** -- kilisenizin toplandığı fiziksel bir konum (ör. "Ana Kampüs", "Kuzey Kampüs"). Kampüsler **Ayarlar** altında yönetilir.
- **Hizmet** -- bir kampüste düzenli olarak yapılan toplantı (ör. "Pazar Ayini", "Hafta Ortası").
- **Hizmet Saati** -- bir hizmetin gerçekleştiği belirli bir saat (ör. "09:00", "11:00").
- **Planlanmış Grup** -- belirli bir hizmet saatine atanmış grup. Yoklama, o hizmet bağlamında takip edilir.
- **Planlanmamış Grup** -- bir hizmet saatine bağlı olmadan kendi yoklamasını takip eden grup.

## Yoklama Yapınızı Ayarlama

1. **B1 Admin**'i açın, [Atlama menüsünü](../introduction.md#getting-around-with-the-jump-menu) (sol üstteki arama çubuğu) açın ve **Kişiler**'i genişletin.
2. **Yoklama**'ya, ardından sol sütundaki **Kurulum**'a tıklayın. **Hizmet yapısı** tablosu açılır; üstte kampüs, hizmet saati ve planlanmış ile planlanmamış grup sayılarınız gösterilir. Tabloya bir şey ekledikçe, düzenledikçe veya kaldırdıkça bu sayılar hemen güncellenir.
3. **Kampüsleri Yönet**'e tıklayın (**Hizmet yapısı** panelinin sağ üstü). Bu sizi **Ayarlar → Kampüsler**'e götürür. **Kampüs Ekle**'ye tıklayın, konumunuzun adını girin (adres ve saat dilimi isteğe bağlıdır) ve **Kaydet**'e tıklayın.
4. **Kişiler → Yoklama**'ya dönün ve **Kurulum**'a tıklayın. Kampüsünüz artık kurulum tablosunda görünür.
5. Kampüsünüzün altındaki **Hizmet** sütunundaki **+ düğmesine** tıklayın. "Pazar Ayini" gibi bir hizmet adı girin ve **Kaydet**'e tıklayın.
6. Hizmetin altındaki **Saat** sütunundaki **+ düğmesine** tıklayın. "09:00" gibi bir **Hizmet Saati** adı girin, isteğe bağlı olarak [check-in programını](#setting-a-check-in-schedule) doldurun ve **Kaydet**'e tıklayın. Her hizmet saati için bu adımı tekrarlayın.
7. Bir grubu hizmet saatine bağlamak için **Kişiler > Gruplar**'dan grubu açın, **Düzenle**'ye tıklayın ve **Hizmet Saati Ekle** seçeneğini kullanın. Bkz. sonraki bölüm.

### Bir Grup İçin Yoklamayı İzlemeyi Etkinleştirme

Bir grup için yoklama kaydedilebilmesi için o grup için Yoklamayı İzle seçeneğinin açık olması gerekir.

1. Atlama menüsünde **Kişiler > Gruplar**'ı seçin ve grubu işaretleyin.
2. Grubun adının altındaki **Düzenle** düğmesine tıklayın.
3. **Yoklamayı İzle** seçeneğini **Evet** olarak ayarlayın.
4. **Kaydet**'e tıklayın.

:::tip
Grubu önceki adımda bir hizmet saatine atadıysanız, grubun düzenleme ekranındaki **Hizmet Saati Ekle** seçeneğini de kullanarak grubu doğru hizmete bağlayın. Bu, oturumların doğru kampüse ve saate bağlanmasını sağlar.
:::

:::tip
Grup düzenli bir hizmetin dışında toplanıyorsa -- kendi yoklamasını takip eden bir hafta ortası küçük grup gibi -- onu planlanmamış grup olarak bırakabilirsiniz. Yine de yoklama raporlaması için **Grup Yoklaması** raporunda görünmeye devam eder.
:::

## Check-in Programı Ayarlama

Her hizmet saati, [self check-in](check-in.md) işleminin her hafta kendiliğinden açılıp kapanması için isteğe bağlı bir check-in programına sahip olabilir. Program yoksa, o hizmet saati için check-in her zaman kullanılabilir kalır (oda dolu olması gibi başka nedenlerle kapatılmadığı sürece).

1. **Kurulum** görünümünde, **Saat** sütunundaki bir hizmet saatinin adına tıklayın (veya yeni bir tane ekleyin).
2. **Check-in Programı** altında, hizmet saatinin toplandığı haftanın **Günü**nü seçin.
3. **Başlangıç Saati**'ni ve isteğe bağlı olarak **Bitiş Saati**'ni ayarlayın.
4. **Check-in'i aç (başlangıçtan kaç dakika önce)** alanına değer girin -- örneğin `30`, check-in'i hizmet başlamadan yarım saat önce açar.
5. **Check-in'i kapat (bitişten kaç dakika sonra)** alanına değer girin -- örneğin `15`, check-in'i bitiş saatinden sonra 15 dakika açık tutar. Bitiş saati belirlemediyseniz, bu süre başlangıç saatinden itibaren hesaplanır. **Bitiş Saati** ve **Check-in'i kapat** alanlarını ikisini de boş bırakırsanız, check-in o günün sonuna kadar açık kalır.
6. **Kaydet**'e tıklayın.

Program her hafta tekrarlanır ve hizmetin kampüsünün saat diliminde ölçülür. Kampüsün saat dilimi yoksa, kilisenizin [Saat Dilimi](../settings/church-settings.md#time-zone) kullanılır; o da yoksa saat dilimi bulunan ilk kampüsünüzün saat dilimi, en son olarak Doğu Saati (America/New_York) kullanılır. Check-in yanlış saatte açılıyorsa, [Kampüsler](../settings/campuses.md) bölümünde kampüsün **Saat Dilimi** ayarını kontrol edin. Bir programı kaldırmak için **Gün**'ü **Program yok** olarak değiştirin ve **Kaydet**'e tıklayın. Bir program yalnızca hem **Gün** hem de **Başlangıç Saati** ayarlandığında etkili olur.

Bir hizmet saatinin check-in penceresi kapalıyken:

- **B1.church üzerindeki self check-in**, o hizmet saatini **Kapalı** (veya örneğin **Kapalı · Paz 09:30'da açılır**) olarak listeler ve seçilemez. Bir hizmetin tüm saatleri kapalıysa, aileler check-in'in ne zaman açılacağını görür, örneğin "Check-in Pazar 09:30'da açılır."
- **B1 Checkin kiosk uygulaması** de hizmet saatini, ne zaman açılacağıyla birlikte **Kapalı** olarak gösterir. Bir hizmetin her saati kapalıysa, kiosk o hizmet için check-in'in ne zaman açılacağını söyler. Kapalı bir hizmet saatine zaten check-in yapmış biri, bunun yerine grubunu **Check-in yapıldı** olarak görür. Bir check-in işlemi sırasında pencere kapanırsa, kiosk işlemi tamamlamaz ve etkilenen odayı listeleyen bir **Henüz check-in yapılamaz** ekranı gösterir; böylece aile farklı bir oda seçebilir.

Daha önce bir hizmet saati için check-in yapmış bir hane, önceki pencere kapandıktan sonra bile geri dönüp açık olan daha sonraki bir hizmet saati ekleyebilir. Mevcut check-in kayıtları korunur.

:::tip
Erken gelen aileler ve gönüllüler check-in yapabilsin diye cömert bir açık pencere (ör. başlangıçtan 45 dakika önce) belirleyin; hizmet başladıktan sonra geç kalanlar da check-in yapabilsin diye kısa bir kapanış penceresi belirleyin.
:::

## Kurulumunuzu Düzenleme

Kurulumunuzu istediğiniz zaman güncelleyebilirsiniz. Bir kampüsü, hizmet saatini veya grubu seçip ayrıntılarını değiştirmek için **Düzenle**'ye, kaldırmak için **Sil**'e tıklayın.

:::info
Bir hizmet saatini kaldırmak geçmiş yoklama kayıtlarını silmez. Programınızı değiştirseniz bile geçmiş verileriniz korunur.
:::

## Sırada Ne Var

Kampüsleriniz, hizmet saatleriniz ve gruplarınız hazır olduğunda, [yoklama kaydetmeye](recording-attendance.md) manuel olarak başlayabilir veya hizmetleriniz için [self check-in](check-in.md) ayarlayabilirsiniz.
