---
title: "Open Lesson Format"
---

# Open Lesson Format

<div class="article-intro">

I-Open Lesson Format sisakhiwo se-JSON lesijwayelekile lesivumela banikeli bekontenti bangaphandle kutsi bashicilele tinhlelo tekufundzisa ku-Lessons.church. Nome ngukuphi inhlangano lehlela ifidi ngalolusayo luhlobo ingangetwa njengemnikeli wangaphandle, lokwenta kontenti yayo yiphequluleke futsi idlaleke kanye nemtapo losemgceka.

</div>

## Kusebenta Njani

Umnikeli uhlela tinhlobo letimbili teti-endpoint:

1. **Provider Tree** -- I-URL lelinye lelibuyisa umtapo lophelele wetinhlelo, tifundvo, tifundzo, nema-venue. I-venue ngayinye ihlanganisa i-URL yefidi lekhomba kukontenti lecatsulwe yesifundzo.
2. **Venue Feed** -- I-URL ngayinye nga-venue, lebuyisa kontenti lephelele yesifundzo (tigaba, tento, nemafayela emidiya).

Nalibandla lengeta i-URL yemnikeli wakho ku-Lessons.church, sistimu iyalanda umtsi wakho kuze itfole kontenti letfolakalako, bese ilanda tifidi te-venue letitsite ngesikhatsi tidzingeka.

## Provider Tree

I-URL yemnikeli wakho kufanele ibuyise sento se-JSON ngalesisakhiwo:

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

### Emabala We-Tree

| Libala | Luhlobo | Incazelo |
|-------|------|-------------|
| `programs[].id` | string | Sikhombisi lesihlukile selinhlelo |
| `programs[].name` | string | Ligama lelibonakalako |
| `programs[].slug` | string | Ligama lelihambisana ne-URL |
| `programs[].image` | string | I-URL yesitfombe selinhlelo (akuphoceleki) |
| `programs[].about` | string | Incazelo (akuphoceleki) |
| `studies[].id` | string | Sikhombisi lesihlukile sesifundvo |
| `studies[].name` | string | Ligama lelibonakalako |
| `studies[].slug` | string | Ligama lelihambisana ne-URL |
| `studies[].image` | string | I-URL yesitfombe sesifundvo (akuphoceleki) |
| `lessons[].id` | string | Sikhombisi lesihlukile sesifundzo |
| `lessons[].name` | string | Ligama lelibonakalako |
| `lessons[].slug` | string | Ligama lelihambisana ne-URL |
| `lessons[].title` | string | Sihloko lesigcwele |
| `lessons[].image` | string | I-URL yesitfombe sesifundzo (akuphoceleki) |
| `lessons[].description` | string | Sifingqo sesifundzo (akuphoceleki) |
| `venues[].id` | string | Sikhombisi lesihlukile se-venue |
| `venues[].name` | string | Ligama le-venue (sib. "Kids", "Adults", "Youth") |
| `venues[].apiUrl` | string | I-URL lebuyisa i-venue feed (bona ngentasi) |

**Ema-venue** amela tinhlobo letahlukene tesifundzo lesifanako lesilungiselelwe tilaleli letahlukene (emacembu eminyaka, tetimo, njll.).

## Venue Feed

I-`apiUrl` ye-venue ngayinye kufanele ibuyise sento se-JSON lesihambisana nalesi sakhiwo:

```json
{
  "id": "venue-1",
  "name": "Kids",
  "lessonId": "lesson-1",
  "lessonName": "The Baptism of Jesus",
  "lessonImage": "https://example.com/images/lesson1.jpg",
  "lessonDescription": "An introduction to Jesus' ministry.",
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

### Emabala We-Venue Feed

#### Sento Sesisekelo (Root Object)

| Libala | Luhlobo | Incazelo |
|-------|------|-------------|
| `id` | string | Sikhombisi se-venue |
| `name` | string | Ligama le-venue |
| `lessonId` | string | Sikhombisi sesifundzo |
| `lessonName` | string | Ligama lelibonakalako lesifundzo |
| `lessonImage` | string | I-URL yesitfombe sesifundzo |
| `lessonDescription` | string | Sifingqo sesifundzo |
| `studyName` | string | Ligama lesifundvo lesizali |
| `studySlug` | string | I-slug yesifundvo lesizali |
| `programName` | string | Ligama lelinhlelo lelizali |
| `programSlug` | string | I-slug yelinhlelo lelizali |
| `programAbout` | string | Incazelo yelinhlelo |
| `downloads` | array | Emacembu emafayela langalandwa |
| `sections` | array | Tigaba tesifundzo letihleliwe |

#### Section (Sigaba)

| Libala | Luhlobo | Incazelo |
|-------|------|-------------|
| `id` | string | Sikhombisi sesigaba |
| `name` | string | Sihloko sesigaba |
| `sort` | number | Luhlelo lekubonakala |
| `materials` | string | Tintfo tekusebenta nome emanothi ekulungiselela (akuphoceleki) |
| `actions` | array | Tento letihleliwe ngekhatsi kwalesisigaba |

#### Action (Sento)

| Libala | Luhlobo | Incazelo |
|-------|------|-------------|
| `id` | string | Sikhombisi sesento |
| `actionType` | string | Lokunye kwaloku: `play`, `text`, `question`, `quote`, `subhead` |
| `content` | string | Umbhalo nome ligama lemidiya |
| `sort` | number | Luhlelo lekubonakala |
| `role` | string | Ligama lendzima, sib. "Leader", "Kids" (akuphoceleki) |
| `roleId` | string | Sikhombisi sendzima (akuphoceleki) |
| `files` | array | Emafayela emidiya etentweni te-`play` (akuphoceleki) |

#### File (Ifayela)

| Libala | Luhlobo | Incazelo |
|-------|------|-------------|
| `id` | string | Sikhombisi sefayela |
| `name` | string | Ligama lefayela |
| `url` | string | I-URL yekulanda ngco |
| `streamUrl` | string | I-URL yekusakata, sib. sihlanti se-Vimeo (akuphoceleki) |
| `fileType` | string | Luhlobo lwe-MIME (sib. `video/mp4`, `image/jpeg`) |
| `seconds` | number | Sikhatsi ngemasekhondi ye-audio/video (akuphoceleki) |
| `bytes` | number | Bukhulu befayela nge-bytes (akuphoceleki) |
| `thumbnail` | string | I-URL yesitfombe lesincane (akuphoceleki) |
| `loop` | boolean | Nangabe imidiya kufanele iphindzaphindwe (akuphoceleki, ku-default ku-false) |

#### Download (Kulanda)

| Libala | Luhlobo | Incazelo |
|-------|------|-------------|
| `name` | string | Ligama lelicembu lekulandwa (sib. "Printable Materials") |
| `files` | array | Emafayela kulelicembu lekulanda (emabala lafanako neFile ngenhla) |

## Tinhlobo Tetento

| Luhlobo | Injongo |
|------|---------|
| `play` | Kudlala kwemidiya -- vidiyo, umsindvo, nome sitshelo setitfombe. Kufanele kubandzakanye `files`. |
| `text` | Umbhalo lomile. Wesekela kucinisa kwe-markdown-style (`**umbhalo**`). |
| `question` | Umbuto wengcoco nome wekucabangisisa welilaleli. |
| `quote` | Sicaphuno lesicinisiwe nome umbhalo weliBhayibheli. |
| `subhead` | Sihloko nome sehlukanisi ngekhatsi kwesigaba. |

:::tip
Kubona sibonelo lesisebentako sefidi, ungabona umtsi wekontenti wemgceka we-Lessons.church ku-`https://api.lessons.church/lessons/public/tree` bese ulanda nome ngukuphi i-venue feed URL kuwo.
:::
