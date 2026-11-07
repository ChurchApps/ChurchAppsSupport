---
title: "Açık Ders Formatı"
description: "Lessons.church'teki üçüncü taraf müfredat sağlayıcıları için biçim belirtimi: sağlayıcı ağacı ve mekân akışı JSON alanları, eylemler ve medya dosyaları."
---

# Açık Ders Formatı

<div class="article-intro">

Açık Ders Formatı, üçüncü taraf içerik sağlayıcılarının Lessons.church için müfredat yayımlamasına olanak tanıyan standart bir JSON şemasıdır. Bu formatta bir besleme barındıran herhangi bir kuruluş harici sağlayıcı olarak eklenebilir; böylece içerikleri yerleşik kütüphanedeki içeriklerle birlikte göz atılabilir ve oynatılabilir hale gelir.

</div>

## Nasıl Çalışır

Bir sağlayıcı iki tür uç nokta barındırır:

1. **Sağlayıcı Ağacı** -- Programların, çalışmaların, derslerin ve mekânların tam kataloğunu döndüren tek bir URL. Her mekân, ayrıntılı ders içeriğine işaret eden bir besleme URL'si içerir.
2. **Mekân Beslemesi** -- Mekân başına bir URL. Tam ders içeriğini (bölümler, eylemler ve medya dosyaları) döndürür.

Bir kilise Lessons.church'te sağlayıcı URL'nizi eklediğinde platform, mevcut içeriği keşfetmek için ağacınızı getirir ve ardından mekân beslemelerini isteğe bağlı olarak tek tek getirir.

## Sağlayıcı Ağacı

Sağlayıcı URL'niz bu yapıda bir JSON nesnesi döndürmelidir:

```json
{
  "programs": [
    {
      "id": "program-1",
      "name": "Gospel of Mark",
      "slug": "gospel-of-mark",
      "image": "https://example.com/images/mark.jpg",
      "about": "A 12-week study through the Gospel of Mark.",
      "studies": [
        {
          "id": "study-1",
          "name": "The Beginning",
          "slug": "the-beginning",
          "image": "https://example.com/images/study1.jpg",
          "lessons": [
            {
              "id": "lesson-1",
              "name": "The Baptism of Jesus",
              "slug": "baptism-of-jesus",
              "title": "The Baptism of Jesus",
              "image": "https://example.com/images/lesson1.jpg",
              "description": "An introduction to Jesus' ministry.",
              "bottomLine": "God keeps His promises.",
              "verse": "Genesis 9:13 — I have set my rainbow in the clouds…",
              "parentQuestion": "What is one promise God has kept in our family?",
              "parentNote": "Pray together thanking God for keeping His promises.",
              "venues": [
                {
                  "id": "venue-1",
                  "name": "Kids",
                  "apiUrl": "https://example.com/feed/venues/venue-1"
                },
                {
                  "id": "venue-2",
                  "name": "Adults",
                  "apiUrl": "https://example.com/feed/venues/venue-2"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

### Ağaç Alanları

| Alan | Tür | Açıklama |
|-------|------|-------------|
| `programs[].id` | string | Benzersiz program tanımlayıcısı |
| `programs[].name` | string | Görüntülenen ad |
| `programs[].slug` | string | URL dostu ad |
| `programs[].image` | string | Program görseli URL'si (isteğe bağlı) |
| `programs[].about` | string | Açıklama (isteğe bağlı) |
| `studies[].id` | string | Benzersiz çalışma tanımlayıcısı |
| `studies[].name` | string | Görüntülenen ad |
| `studies[].slug` | string | URL dostu ad |
| `studies[].image` | string | Çalışma görseli URL'si (isteğe bağlı) |
| `lessons[].id` | string | Benzersiz ders tanımlayıcısı |
| `lessons[].name` | string | Görüntülenen ad |
| `lessons[].slug` | string | URL dostu ad |
| `lessons[].title` | string | Tam başlık |
| `lessons[].image` | string | Ders görseli URL'si (isteğe bağlı) |
| `lessons[].description` | string | Ders özeti (isteğe bağlı). Kütüphaneye göz atan öğretmenler için katalog metni; ebeveynlerin eve götürdüğü içerik değildir. |
| `lessons[].bottomLine` | string | Ebeveynler için tek cümlelik eve götürülecek ana fikir (isteğe bağlı) |
| `lessons[].verse` | string | Ezberlenecek ayet referansı ve kısa metin (isteğe bağlı) |
| `lessons[].parentQuestion` | string | Ebeveynlerin evde sorabileceği bir soru (isteğe bağlı) |
| `lessons[].parentNote` | string | Ebeveynler için isteğe bağlı ek not (markdown) |
| `venues[].id` | string | Benzersiz mekân tanımlayıcısı |
| `venues[].name` | string | Mekân adı (ör. "Kids", "Adults", "Youth") |
| `venues[].apiUrl` | string | Mekân beslemesini döndüren URL (aşağıya bakın) |

Dört ebeveyn eve götürme alanı (`bottomLine`, `verse`, `parentQuestion`, `parentNote`) hem ağaçta hem de mekân beslemesinde isteğe bağlıdır. Atlanırlarsa boş kabul edilirler. `description` alanını bu alanların içine kopyalamayın.

**Mekânlar**, aynı dersin farklı kitleler (yaş grupları, ortamlar vb.) için uyarlanmış sürümlerini temsil eder.

## Mekân Beslemesi

Her mekânın `apiUrl` adresi bu şemaya uyan bir JSON nesnesi döndürmelidir:

```json
{
  "id": "venue-1",
  "name": "Kids",
  "lessonId": "lesson-1",
  "lessonName": "The Baptism of Jesus",
  "lessonImage": "https://example.com/images/lesson1.jpg",
  "lessonDescription": "An introduction to Jesus' ministry.",
  "bottomLine": "God keeps His promises.",
  "verse": "Genesis 9:13 — I have set my rainbow in the clouds…",
  "parentQuestion": "What is one promise God has kept in our family?",
  "parentNote": "Pray together thanking God for keeping His promises.",
  "studyName": "The Beginning",
  "studySlug": "the-beginning",
  "programName": "Gospel of Mark",
  "programSlug": "gospel-of-mark",
  "programAbout": "A 12-week study through the Gospel of Mark.",
  "downloads": [],
  "sections": [
    {
      "id": "section-1",
      "name": "Opening Discussion",
      "sort": 1,
      "materials": "Whiteboard and markers",
      "actions": [
        {
          "id": "action-1",
          "actionType": "text",
          "content": "**Key Verse:** Mark 1:9-11",
          "sort": 1
        },
        {
          "id": "action-2",
          "actionType": "question",
          "content": "What do you know about baptism?",
          "sort": 2,
          "role": "Leader"
        },
        {
          "id": "action-3",
          "actionType": "play",
          "content": "Intro Video",
          "sort": 3,
          "files": [
            {
              "id": "file-1",
              "name": "intro-video.mp4",
              "url": "https://example.com/media/intro.mp4",
              "streamUrl": "https://vimeo.com/123456789",
              "fileType": "video/mp4",
              "seconds": 180,
              "bytes": 52428800,
              "thumbnail": "https://example.com/media/intro-thumb.jpg",
              "loop": false
            }
          ]
        }
      ]
    }
  ]
}
```

### Mekân Beslemesi Alanları

#### Kök Nesne

| Alan | Tür | Açıklama |
|-------|------|-------------|
| `id` | string | Mekân tanımlayıcısı |
| `name` | string | Mekân adı |
| `lessonId` | string | Ders tanımlayıcısı |
| `lessonName` | string | Dersin görüntülenen adı |
| `lessonImage` | string | Ders görseli URL'si |
| `lessonDescription` | string | Ders özeti (katalog metni) |
| `bottomLine` | string | Ebeveynler için tek cümlelik eve götürülecek ana fikir (isteğe bağlı) |
| `verse` | string | Ezberlenecek ayet referansı ve kısa metin (isteğe bağlı) |
| `parentQuestion` | string | Ebeveynlerin evde sorabileceği bir soru (isteğe bağlı) |
| `parentNote` | string | Ebeveynler için isteğe bağlı ek not, markdown (isteğe bağlı) |
| `studyName` | string | Üst çalışmanın adı |
| `studySlug` | string | Üst çalışmanın slug'ı |
| `programName` | string | Üst programın adı |
| `programSlug` | string | Üst programın slug'ı |
| `programAbout` | string | Program açıklaması |
| `downloads` | array | İndirilebilir dosya paketleri |
| `sections` | array | Sıralı ders bölümleri |

#### Bölüm

| Alan | Tür | Açıklama |
|-------|------|-------------|
| `id` | string | Bölüm tanımlayıcısı |
| `name` | string | Bölüm başlığı |
| `sort` | number | Görüntüleme sırası |
| `materials` | string | Materyaller veya hazırlık notları (isteğe bağlı) |
| `actions` | array | Bu bölüm içindeki sıralı eylemler |

#### Eylem

| Alan | Tür | Açıklama |
|-------|------|-------------|
| `id` | string | Eylem tanımlayıcısı |
| `actionType` | string | Şunlardan biri: `play`, `text`, `question`, `quote`, `subhead` |
| `content` | string | Metin içeriği veya medya etiketi |
| `sort` | number | Görüntüleme sırası |
| `role` | string | Rol adı, ör. "Lider", "Çocuklar" (isteğe bağlı) |
| `roleId` | string | Rol tanımlayıcısı (isteğe bağlı) |
| `files` | array | `play` eylemleri için medya dosyaları (isteğe bağlı) |

#### Dosya

| Alan | Tür | Açıklama |
|-------|------|-------------|
| `id` | string | Dosya tanımlayıcısı |
| `name` | string | Dosya adı |
| `url` | string | Doğrudan indirme URL'si |
| `streamUrl` | string | Akış URL'si, ör. Vimeo bağlantısı (isteğe bağlı) |
| `fileType` | string | MIME türü (ör. `video/mp4`, `image/jpeg`) |
| `seconds` | number | Ses veya video için saniye cinsinden süre (isteğe bağlı) |
| `bytes` | number | Bayt cinsinden dosya boyutu (isteğe bağlı) |
| `thumbnail` | string | Küçük resim URL'si (isteğe bağlı) |
| `loop` | boolean | Medyanın döngüye girip girmeyeceği (isteğe bağlı, varsayılan false) |

#### İndirme

| Alan | Tür | Açıklama |
|-------|------|-------------|
| `name` | string | İndirme paketi adı (ör. "Yazdırılabilir Materyaller") |
| `files` | array | Bu indirme paketindeki dosyalar (yukarıdaki Dosya ile aynı alanlar) |

## Eylem Türleri

| Tür | Amaç |
|------|---------|
| `play` | Medya oynatma: video, ses veya slayt gösterisi. `files` içermelidir. |
| `text` | Statik metin içeriği. Markdown tarzı kalın yazıyı (`**metin**`) destekler. |
| `question` | Katılımcılar için tartışma veya düşünme sorusu. |
| `quote` | Vurgulanmış bir alıntı veya Kutsal Kitap pasajı. |
| `subhead` | Bir bölüm içinde başlık veya ayırıcı. |

:::tip
Besleme örneğini çalışırken görmek için `https://api.lessons.church/lessons/public/tree` adresindeki yerleşik Lessons.church içerik ağacını görüntüleyebilir ve oradan herhangi bir mekân besleme URL'sini getirebilirsiniz.
:::
