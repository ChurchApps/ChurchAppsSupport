---
title: "FreePlay Content Provider"
---

# FreePlay Content Provider

<div class="article-intro">

Ang FreePlay ay media player ng ChurchApps para sa pag-stream ng mga aralin at iba pang video content sa mga telepono, tablet, at TV. Kung mayroon kang library ng lesson content at nais mong gawing available ito sa FreePlay, ang gabay na ito ay sumasaklaw sa lahat ng kailangan mong ibigay.

</div>

## Branding

Bago magsimula ang integration, kailangan namin ng:

- **Logo** -- Isang logo image sa **16:9** aspect ratio (ginagamit para sa provider cards sa FreePlay UI)
- **Brand name** -- Ang preferred na pangalan na ipapakita para sa iyong organisasyon sa FreePlay

## API Endpoints

Ang FreePlay ay nakikipag-ugnayan sa iyong serbisyo sa pamamagitan ng maliit na set ng REST endpoint. Nagsusulat kami ng custom adapter para sa bawat provider, kaya ang eksakto ng URL structure ay flexible -- ngunit ang impormasyon sa ibaba ay kung ano ang kailangan namin.

### Authentication

Piliin ang model na akma sa iyong content:

| Model | Kailan Gamitin | Ano ang Kailangan Namin |
|-------|-------------|--------------|
| **None** | Pampublikong content, walang kinakailangang sign-in | Wala -- direkta naming tinatawag ang iyong catalog endpoint |
| **OAuth (PKCE)** | Web/mobile sign-in | Authorization URL, token-exchange endpoint, client ID, scope |
| **Device Flow** | Preferred para sa TV apps (ang user ay nagpapasok ng maikling code sa kanilang telepono) | Device-authorization endpoint, token-polling endpoint, client ID |

:::tip
Kung ang iyong content ay nangangailangan ng authentication, ang auth endpoint ay nagbabalik ng **user token** na ipinasa ng FreePlay sa browse at lesson endpoint upang pahintulutan ang access.
:::

### Browse / Catalog

Isang endpoint (o set ng mga endpoint) na nagbabalik ng **folder tree** ng lahat ng available na aralin.

Ang bawat item sa tree ay dapat magsama ng:

| Field | Kinakailangan | Paglalarawan |
|-------|----------|-------------|
| `id` | Oo | Isang unique identifier para sa folder |
| `name` | Oo | Display name para sa folder |
| `thumbnail` | Inirerekomenda | Isang **16:9** thumbnail URL |

### Lesson Playlist

Isang endpoint na nagbabalik ng **playlist ng mga media file** para sa isang aralin.

Ang bawat item sa playlist ay dapat magsama ng:

| Field | Kinakailangan | Paglalarawan |
|-------|----------|-------------|
| `title` | Oo | Display title ng media item |
| `mediaType` | Oo | `video` o `image` |
| `url` | Oo | Direktang download link sa file |
| `thumbnail` | Inirerekomenda | Isang thumbnail image para sa item |
| `duration` | Inirerekomenda | Tagal sa segundo (para sa mga video) |

## Media Formats

Ang FreePlay ay direktang nag-download ng mga file, kaya ang bawat media item ay dapat magkaroon ng **direktang link** (walang naka-embed na player o page redirect).

| Uri | Tinatanggap na Format |
|------|-----------------|
| Video | **MP4** (kinakailangan para sa cross-platform playback sa Apple at Android device) |
| Image | JPG, PNG, o GIF |

## Mga Tala

- Ang **REST API na nagbabalik ng JSON** ay ang tipikal na integration pattern, ngunit dahil nagsusulat kami ng custom adapter para sa bawat provider, maaari kaming magtrabaho sa halos anumang API format.
- Kung interesado kang maging FreePlay content provider, makipag-ugnayan sa [Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) o magbukas ng issue sa [GitHub](https://github.com/ChurchApps/ChurchAppsSupport/issues).
