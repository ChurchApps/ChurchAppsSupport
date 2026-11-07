---
title: "Kampüsler"
description: "B1 Admin'de kampüsleri ayarlayarak her kişinin ve grubun hangi kampüse ait olduğunu takip edin; ardından kişileri, katılımı ve demografik verileri konuma göre filtreleyin."
---

# Kampüsler

<div class="article-intro">

Kirk veya kilisenizin birden fazla konumda toplanıyorsa, **Kampüsler** sayesinde her kişinin ve grubun hangi mekâna ait olduğunu takip edebilirsiniz. Yapılandırıldıktan sonra kampüsler kişi profillerinde, katılım kurulumunda ve Demografi panosunda seçenek olarak görünür. Birden fazla mekânı olan kiliseler, B1 Admin genelinde kampüse göre filtreleme, arama ve raporlama yapabilir.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Kampüsleri yönetmek için **Edit Church Settings** iznine ihtiyacınız var. [Roller ve İzinler](./roles-permissions.md) bölümüne bakın.

</div>

## Kampüs Ayarlarını Açma

B1 Admin'de, [Jump menüsünü](../introduction.md#getting-around-with-the-jump-menu) (sol üstteki arama çubuğu) açın, **Settings > Settings** seçeneğini seçin ve sol taraftaki listeden **Campuses** öğesine tıklayarak **Campuses** bölümüne gidin. Doğrudan **/settings/campuses** adresine de gidebilirsiniz. Yapılandırılmış tüm kampüslerin adını, konumunu ve saat dilimini gösteren bir liste görürsünüz.

## Kampüs Ekleme

1. **Add Campus** düğmesine tıklayın.
2. Kampüs bilgilerini doldurun:
   - **Name** *(zorunlu)* — B1 Admin genelinde gösterilecek görünen ad (örneğin "Ana Kampüs" veya "Kuzey Kampüs").
   - **Address** — kampüsün sokak adresi (yalnızca bilgilendirme amaçlı gösterilir; Church Settings içindeki ana kilise adresinizle aynı değildir).
   - **City / State / Zip** — kampüsün konumu.
   - **Time Zone** — bu kampüse ait IANA saat dilimi (örneğin *America/Chicago*). Bu kampüsteki ayinler için [yoklama programları](../attendance/setup.md#setting-a-check-in-schedule) bu saat diliminde açılıp kapanır. **None** olarak ayarlanırsa, kilisenizin [Saat Dilimi](./church-settings.md#time-zone) ayarı kullanılır. Kampüsler farklı saat dilimlerinde olduğunda bu seçenek işinize yarar.
   - **Website** — kampüsün kendi web sitesi için isteğe bağlı bir URL.
3. **Save** düğmesine tıklayın.

## Kampüs Düzenleme

Listedeki herhangi bir kampüs satırına tıklayarak sağdaki panelde düzenleyiciyi açın. Alanları güncelleyin ve **Save** düğmesine tıklayın.

## Kampüs Silme

Bir kampüsü düzenleme modunda açın ve **Delete** düğmesine tıklayın. Onaylamanız istenecektir. Bir kampüsü silmek, o kampüse atanmış kişileri silmez; yalnızca kişilerin kampüs alanı boş kalır.

## Kişileri Bir Kampüse Atama

Kampüsleri oluşturduktan sonra, personel bir kişiyi profilinden bir kampüse atayabilir:

1. **People** bölümünde kişinin kaydını açın.
2. **Edit** düğmesine tıklayın.
3. **Campus** açılır listesinden kampüsü seçin.
4. **Save** düğmesine tıklayın.

Kampüsü People sayfasından toplu olarak da güncelleyebilirsiniz. Birden fazla kişi seçin, **Bulk Edit** özelliğini kullanın ve herkes için Campus alanını aynı anda ayarlayın.

## Kampüse Göre Filtreleme

Kampüsler ayarlandıktan sonra, B1 Admin genelinde kampüse göre filtreleme yapabilirsiniz:

- **People arama** — gelişmiş aramaya bir Campus koşulu ekleyin veya bir kampüse göre sınırlandırılmış bir [Kayıtlı Liste](../people/lists.md) yükleyin.
- **Demographics** — en az bir kişiye kampüs atanmışsa, [Demografi panosu](../people/demographics.md) bir Campus halka grafiği gösterir.
- **Attendance Setup** — Attendance içindeki her ayin saati bir kampüse bağlanabilir.

:::tip
Tek konumlu kiliselerin kampüs ayarlaması gerekmez. Tüm kampüs özellikleri isteğe bağlıdır; hiç kampüs yoksa kampüs alanları ve grafikler görünmez.
:::

## İlgili Makaleler

- [Church Settings](./church-settings.md) — ana kilise adresiniz ve markanız (kampüs adreslerinden ayrıdır)
- [Demographics](../people/demographics.md) — Campus dağılım grafiği
- [Attendance Setup](../attendance/setup.md) — ayin saatlerini bir kampüse bağlama
- [Bulk Editing](../people/bulk-editing.md) — birçok kişiye aynı anda kampüs atama
