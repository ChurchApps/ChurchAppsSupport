---
title: "Bulk Import"
description: "Vaaz videolarını bir YouTube kanalından veya Vimeo hesabından toplu olarak B1 Admin'e aktarın, ardından bunları bir oynatma listesinde düzenleyin."
---

# Bulk Import

<div class="article-intro">

Sayfa Toplu İçe Aktar, YouTube veya Vimeo'dan videoları içe aktararak sermon kitaplığınızı hızlıca doldurmanızı sağlar. Her videoyu tek tek eklemek yerine mevcut sermon içeriğinizi getirmenin en hızlı yoludur.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- **contentApi.streamingServices.edit** iznine ihtiyacınız var. Erişiminiz yoksa [Roller ve İzinler](../settings/roles-permissions.md) bölümüne bakın.
- Sermonlarınızı içe aktaracağınız en az bir [playlist](./playlists.md) oluşturun
- YouTube Kanal Kimliğinizi veya Vimeo hesap bilgilerinizi hazır bulundurun

</div>

## Kaynağınızı Seçme

1. B1 Admin'de, [Atlama menüsünü](../introduction.md#getting-around-with-the-jump-menu) (sol üstteki arama çubuğu) açın, **Sermons** öğesini genişletin ve **Sermons**'a tıklayın. **Add Sermon**'a tıklayın ve menüden **Bulk Import** seçeneğini seçin.
2. **Choose Import Source** altında iki seçenek göreceksiniz:
   - **YouTube** -- Bir YouTube kanalından videoları içe aktarın
   - **Vimeo** -- Bir Vimeo hesabından videoları içe aktarın
3. Sermonlarınızın barındırıldığı platformun seçeneğine tıklayın (veya açıklamasının altındaki **Import from YouTube** / **Import from Vimeo** düğmesine tıklayın). Kaynak seçimine dönmek için sayfanın üstündeki **Back** düğmesine tıklayın.

:::tip
Videolarınız her iki platformda da varsa, dilediğiniz zaman geri dönüp kaynağı değiştirebilirsiniz.
:::

## İçe Aktarmadan Önce

Videoları içe aktarmadan önce, bunları düzenleyeceğiniz en az bir playlist'e ihtiyacınız var. Henüz hiç playlist oluşturmadıysanız:

1. **Sermons** sayfasına dönün ve **Playlists** panelini bulun.
2. **Create First Playlist** düğmesine tıklayın ve adı, açıklamayı, yayın tarihini ve küçük resmi doldurun.
3. **Save** düğmesine tıklayın, ardından **Add Sermon**'a tıklayıp **Bulk Import** seçeneğini seçerek Toplu İçe Aktar sayfasına geri dönün.

Playlist oluşturma ve yönetme hakkında ayrıntılı bilgi için [Playlists](./playlists.md) sayfasına bakın.

## Videoları İçe Aktarma

1. YouTube veya Vimeo'yu seçtikten sonra, ilgili alana **YouTube Channel ID** veya **Vimeo account information** bilginizi girin.
2. Kanalınızdaki veya hesabınızdaki tüm mevcut videoları getirmek için **Fetch** düğmesine tıklayın.
3. Getirme işlemi tamamlandığında, onay kutularıyla birlikte tüm videolarınızın listesini göreceksiniz.
4. İçe aktarmak istediğiniz videoların yanındaki kutuları işaretleyin. Hepsini seçebilir veya belirli videoları seçebilirsiniz.
5. Gelecekteki yüklemeleri kitaplığınıza otomatik olarak eklemek için isteğe bağlı olarak **Auto Import New Videos** seçeneğini etkinleştirin.
6. Bu videoların hangi playlist'e eklenmesi gerektiğini seçmek için **Import Into Playlist** açılır menüsüne tıklayın.
7. Toplu içe aktarmayı tamamlamak için **Import** düğmesine tıklayın.

Videolarınız başlıkları, açıklamaları, tarihleri ve küçük resimleri dahil tüm ayrıntılarıyla içe aktarılacaktır. YouTube başlıklarındaki ve açıklamalarındaki `&`, kesme işaretleri ve tırnak işaretleri gibi özel karakterler, `&amp;` gibi kodlar yerine olduğu gibi görünür.

:::info
Toplu içe aktarma, başka bir platformdan geçiş yaparken başlangıç yapmak için idealdir. Bundan sonra tek tek sermon eklemek için bunun yerine [Managing Sermons](./managing-sermons.md) sayfasına bakın.
:::

## Sonraki Adımlar

- [Managing Sermons](./managing-sermons.md) -- İçe aktarılan sermon ayrıntılarını düzenleyin
- [Playlists](./playlists.md) -- Sermon serilerini oluşturun ve yönetin
- [Live Streaming](./live-streaming.md) -- Ibadetleriniz için canlı yayını ayarlayın
