---
title: "Yoklama Raporları"
description: "B1 Admin'in üç katılım raporunu (Katılım Eğilimi, Grup Katılımı, Günlük Grup Katılımı) ve her birinin gösterdiklerini; çalıştırma ve dışa aktarma adımlarıyla öğrenin."
---

# Yoklama Raporları

<div class="article-intro">

B1 Admin, hizmetlerinize ve gruplarınıza katılımın nasıl olduğunu anlamanıza yardımcı olmak için üç yoklama raporu sunar. Her rapor, yoklama verilerinize genel eğilimlerden günlük ayrıntılara kadar farklı bir bakış açısı sunar.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Hizmetleriniz ve gruplarınız için yoklamanın [düzenli olarak takip edildiğinden](../attendance/tracking-attendance.md) emin olun
- [Gruplarınızın](../groups/creating-groups.md) ve hizmetlerinizin B1 Admin içinde yapılandırıldığından emin olun
- Raporlara erişmek için uygun [izinlere](../settings/roles-permissions.md) ihtiyacınız var

</div>

## Yoklama Eğilimi

Yoklama Eğilimi raporu, hizmetleriniz için yoklamanın zaman içinde nasıl değiştiğini gösterir.

1. Tarayıcınızda doğrudan **admin.b1.church/reports/attendanceTrend** adresine gidin (raporların gezinme menüsünde bir girişi yoktur; bu nedenle adresi yer imlerine eklemek buraya dönmenin en kolay yoludur). Aynı rapor Yoklama sayfasında da bulunur: **Tüm yıllar** seçeneğine tıklayın, ardından **Yoklama Eğilimi** sekmesini seçin.
2. Sonuçları filtrelemek için isteğe bağlı olarak bir **Kampüs**, **Hizmet**, **Hizmet Saati** veya **Grup** seçin.
3. **Başlangıç Tarihi** ve **Bitiş Tarihi** değerlerini belirleyin. Varsayılan olarak rapor, bir yıl öncesinden bugüne kadar olan geçmiş yılı kapsar ve bitiş tarihi tam olarak dahil edilir. **Raporu Çalıştır** düğmesine tıklayın.
4. Rapor, haftalık toplam ziyaretleri gösteren bir çubuk grafik ve tablo görüntüler. Her hafta, o haftanın Pazar gününün tarihiyle etiketlenir; tablodaki **Oturum Tarihleri** sütunu, o haftada yoklama kaydı bulunan gerçek tarihleri listeler (örneğin "9/27, 9/30").

Bu rapor, mevsimsel düşüşler, büyüme eğilimleri veya özel etkinliklerin etkisi gibi örüntüleri fark etmek için kullanışlıdır.

## Grup Yoklaması

Grup Yoklaması raporu, belirli bir tarih aralığında her grup oturumuna kimlerin katıldığını gösterir.

1. Tarayıcınızda doğrudan **admin.b1.church/reports/groupAttendance** adresine gidin veya Yoklama sayfasında **Tüm yıllar** seçeneğine tıklayıp **Grup Yoklaması** sekmesini seçin.
2. İsteğe bağlı olarak bir **Kampüs** ve **Hizmet** seçin.
3. **Başlangıç Tarihi** ve **Bitiş Tarihi** değerlerini belirleyin. Varsayılan olarak rapor, geçen Pazar gününden bugüne kadarı kapsar ve bitiş tarihi tam olarak dahil edilir.
4. **Raporu Çalıştır** düğmesine tıklayın.

Sonuçlar önce oturum tarihine, ardından hizmet saatine, sonra gruba göre gruplandırılır ve her grubun altında katılan kişiler listelenir. Hizmet saatleri, gruplar ve isimler alfabetik olarak sıralanır. Her kişinin adının yanındaki **Giriş Saati** sütunu, yoklamasının kaydedildiği saati gösterir (kayıtlı bir saat yoksa boş kalır). **Üyelik Durumu** sütunu ise Üye veya Ziyaretçi gibi durumlarını gösterir. Belirli bir hizmet saatinde toplanmayan gruplara ait oturumlar da dahil edilir; bunlar hizmet saati olmadan görünür.

Bir elektronik tablo indirmek için **İndirme Seçenekleri** düğmesine tıklayıp **Özet** seçeneğini seçin. CSV dosyası şunları içerir:

- Tarih aralığında toplanan her grubun her üyesi için bir satır; grup ve ardından isme göre sıralanmış.
- İlk sütunlarda kişinin adı ve grup adı.
- Tarihli her oturum için bir sütun; sütun adı hizmet, hizmet saati ve tarihten oluşur (örneğin "Pazar - 9:00 AM (2026-09-27)"). Her kişi için **mevcut** veya **yok** işareti bulunur. Hizmet saati olmayan bir oturumun adı yalnızca tarihiyle belirtilir.

Bu raporu, gruplar arasında katılımı karşılaştırmak ve hangi grupların büyüdüğünü veya ilgi gerektirdiğini belirlemek için kullanın.

## Günlük Grup Yoklaması

Günlük Grup Yoklaması raporu (başlığı **Güne göre grup yoklaması**) bir grubun her gün kaç kişi katıldığını gün gün sayar.

1. Tarayıcınızda doğrudan **admin.b1.church/reports/dailyGroupAttendance** adresine gidin.
2. Listeyi daraltmak için **Kampüs**, **Hizmet** ve **Hizmet Saati** açılır menülerini kullanın, ardından incelemek istediğiniz **Grubu** seçin.
3. Raporu çalıştırın. Grubun toplandığı her günü, en eskiden en yeniye doğru listeler; her gün için **Tarih** ve kaydedilen **Katılımcı** sayısını gösterir.

Bu rapor ayrıntılı bilgi sunar; haftadan haftaya değişimleri anlamak veya olağandışı derecede yüksek ya da düşük yoklamaya sahip belirli günleri tespit etmek için yararlıdır.

:::tip
Genel bir bakış için Yoklama Eğilimi raporunu, belirli tarihlere inmeniz gerektiğinde ise Günlük Grup Yoklaması raporunu kullanın.
:::

## Pratik Kullanımlar

- **Planlama** -- Yaklaşan hizmetler için oturma düzenini, personeli ve kaynakları planlamak üzere yoklama eğilimlerini kullanın.
- **Ulaşma** -- Üyelerle iletişime geçebilmeniz için düşen yoklama örüntülerini erken fark edin.
- **Yönetim kurulu raporları** -- Hizmetin sağlığını göstermek için yoklama verilerini düzenli liderlik raporlarınıza ekleyin.
- **Etkinlik değerlendirmesi** -- Özel etkinliklerin etkisini ölçmek için etkinlik öncesi ve sonrası yoklamaları karşılaştırın.

:::warning
Yoklama verileri, grup ve hizmet giriş süreçleriniz aracılığıyla kaydedilir. Yoklama tutarlı bir şekilde takip edilmiyorsa raporlarınız gerçek katılımı doğru yansıtmayacaktır. Kurulum talimatları için [Yoklamayı Takip Etme](../attendance/tracking-attendance.md) bölümüne bakın.
:::
