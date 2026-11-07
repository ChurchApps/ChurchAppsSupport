---
title: "Devam Takibi"
---

# Devam Takibi

<div class="article-intro">

Kampüsleriniz, ibadet saatleriniz ve gruplarınız yapılandırıldıktan sonra B1 Admin, devam verilerini incelemenizi ve eğilimleri fark etmenizi kolaylaştırır. Devam sayfası, bu haftaki devamın bir özetiyle açılır; **Tüm yıllar** raporları ise iki ana görünüm sunar: kilisenin genelindeki eğilimler için **Devam Eğilimi** sekmesi ve grup düzeyindeki ayrıntılar için **Grup Devamı** sekmesi. Bu araçları büyüme örüntülerini anlamak, azalan katılımı tespit etmek ve kiliseniz için veriye dayalı kararlar almak amacıyla kullanın.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Devam yapınızın en az bir kampüs ve ibadet saati ile kurulmuş olması gerekir. Henüz yapmadıysanız [Devam Kurulumu](setup.md) sayfasına bakın.
- Raporların sonuç göstermesi için devam verilerinin kaydedilmiş olması gerekir. Veriler [manuel giriş](recording-attendance.md) veya [kendi kendine check-in](check-in.md) yoluyla gelebilir.

</div>

## Devam Eğilimlerini Görüntüleme

1. **B1 Admin**'i açın, [Jump menüsünü](../introduction.md#getting-around-with-the-jump-menu) (sol üstteki arama çubuğu) açın, **Kişiler**'i genişletin ve **Devam**'a tıklayın.
2. Sol sütundaki **Tüm yıllar**'a tıklayın. **Devam Eğilimi** sekmesi varsayılan olarak seçilidir.
3. Sekme açıldığında rapor otomatik olarak çalışır ve her hafta için toplam devamı gösterir.

:::tip
Bu haftanın hızlı bir görünümü için, ana Devam sayfası bu hafta odada kaç kişi olduğunu, oda (grup) bazında dağılımı, varsa misafirleri ve son 13 haftalık check-in çubuk grafiğini gösterir -- rapor çalıştırmanıza gerek yoktur.
:::

## Verilerinizi Filtreleme

Sonuçları daraltmak için **Raporu Filtrele** kutusundaki filtreleri kullanın, ardından **Raporu Çalıştır**'a tıklayın:

- **Kampüs** -- yalnızca o konumdaki devamı görmek için bir kampüs seçin.
- **Ayin** -- raporu tek bir ayinle sınırlandırın.
- **İbadet Saati** -- belirli bir toplantıya odaklanmak için bir ibadet saati seçin.
- **Grup** -- tek bir grubun devamını gösterin.
- **Başlangıç Tarihi** ve **Bitiş Tarihi** -- dahil edilecek tarih aralığı. Varsayılan olarak rapor, bir yıl öncesinden bugüne kadar olan son bir yılı kapsar ve bitiş tarihi tam olarak dahil edilir.

Rapor, haftalık toplam ziyaretleri gösteren bir çubuk grafik ve tablo sunar. Her hafta, o haftanın Pazar gününün tarihiyle etiketlenir. Tabloda ayrıca, devamı olan haftanın gerçek tarihlerini listeleyen bir **Oturum Tarihleri** sütunu bulunur (örneğin "9/27, 9/30"); böylece hafta ortasındaki bir toplantının Pazar ile aynı haftada nasıl sayıldığını görebilirsiniz.

:::info
Raporlar, Devam Eğilimi sekmesini her açtığınızda otomatik olarak çalışır; bu nedenle yenile düğmesine tıklamadan her zaman güncel sayıları görürsünüz.
:::

## Grup Devamı

**Grup Devamı** sekmesi, her grup oturumuna kimlerin katıldığını gösterir. Genel ibadet sayılarına bakmak yerine belirli bir sınıfı, hizmet ekibini veya küçük grubu izlemek istediğinizde bu kullanışlıdır.

1. **Tüm yıllar** raporlarında **Grup Devamı** sekmesini seçin.
2. İsteğe bağlı olarak bir **Kampüs** ve **Ayin** seçin.
3. **Başlangıç Tarihi** ve **Bitiş Tarihi**'ni ayarlayın. Varsayılan olarak rapor, geçen Pazar gününden bugüne kadar olan dönemi kapsar.
4. **Raporu Çalıştır**'a tıklayın.

Sonuçlar önce oturum tarihine, ardından ibadet saatine ve gruba göre gruplandırılır; her grubun altında katılan kişiler listelenir. İbadet saatleri, gruplar ve isimler alfabetik olarak sıralanır, böylece her başlık yalnızca bir kez görünür. Her kişinin satırında ayrıca, devamının kaydedildiği saati gösteren bir **Check-In** sütunu (saat kayıtlı değilse boş) ve bir **Üyelik Durumu** sütunu (örneğin Üye veya Ziyaretçi) bulunur; böylece misafirleri bir bakışta fark edebilirsiniz.

Verileri indirmek için **İndirme Seçenekleri**'ne tıklayın ve **Özet**'i seçin. CSV dosyasında her grup üyesi için bir satır bulunur; satırlar grup ve ardından isme göre sıralanır. Ayrıca aralıktaki her tarihli oturum için bir sütun vardır (örneğin "Pazar - 09:00 (2026-09-27)") ve her hücrede **mevcut** veya **yok** yazar.

:::tip
Grup devamı, grubu içindeki katılımı zaman içinde takip etmek isteyen [küçük grup](../groups/creating-groups.md) liderleri için özellikle değerlidir.
:::

## Devam Verilerini Kullanma İpuçları

- Mevsimsel örüntüleri erken yakalamak için eğilimleri aylık olarak gözden geçirin.
- Hangi konumların büyüdüğünü anlamak için kampüs düzeyindeki verileri karşılaştırın.
- Devamı azalan [gruplarla](../groups/group-members.md) ilgilenmek için grup düzeyindeki raporları kullanın.
- Son zamanlarda katılmayan kişileri bulmak için devam içgörülerini [AI Arama](../people/ai-search.md) aracıyla birleştirin.

## İlgili Sayfalar

- [Devam Kaydetme](recording-attendance.md) -- bir grup oturumu için devamı manuel olarak girin
- [Katılımcı Sayısı Girişi ve Eğilimi](headcount-entry.md) -- kendi haftalık eğilim grafiğiyle birlikte gelen, daha basit bir toplam sayı alternatifi
- [Check-In](check-in.md) -- devamın otomatik olarak kaydedilmesi için kendi kendine check-in'i ayarlayın
