---
title: "FreePlay Content Provider"
---

# FreePlay Content Provider

<div class="article-intro">

FreePlay is ChurchApps' media player for streaming lessons and other video content on phones, tablets, and TVs. If you have a library of lesson content and would like to make it available in FreePlay, this guide covers everything you need to provide.

</div>

## Branding

Before integration can begin, we need:

- **Logo** -- A logo image in **16:9** aspect ratio (used for provider cards in the FreePlay UI)
- **Brand name** -- The preferred name to display for your organization in FreePlay

## API Endpoints

FreePlay communicates with your service through a small set of REST endpoints. We write a custom adapter for each provider, so the exact URL structure is flexible -- but the information below is what we need.

### Authentication

Choose the model that fits your content:

| Model | When to Use | What We Need |
|-------|-------------|--------------|
| **None** | Public content, no sign-in required | Nothing -- we call your catalog endpoints directly |
| **OAuth (PKCE)** | Web/mobile sign-in | Authorization URL, token-exchange endpoint, client ID, scopes |
| **Device Flow** | Preferred for TV apps (user enters a short code on their phone) | Device-authorization endpoint, token-polling endpoint, client ID |

:::tip
If your content requires authentication, the auth endpoint returns a **user token** that FreePlay passes to the browse and lesson endpoints to authorize access.
:::

### Browse / Catalog

An endpoint (or set of endpoints) that returns a **folder tree** of all available lessons.

- This can be a **single call** that returns the entire tree, or **multiple calls** where each returns one level as the user navigates deeper.
- Each item in the tree should include:

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | A unique identifier for the folder |
| `name` | Yes | Display name for the folder |
| `thumbnail` | Recommended | A **16:9** thumbnail URL |

### Lesson Playlist

An endpoint that returns the **playlist of media files** for a single lesson.

Each item in the playlist should include:

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Display title of the media item |
| `mediaType` | Yes | `video` or `image` |
| `url` | Yes | Direct download link to the file (see [Media Formats](#media-formats) below) |
| `thumbnail` | Recommended | A thumbnail image for the item |
| `duration` | Recommended | Duration in seconds (for videos) |

## Media Formats

FreePlay downloads files directly, so every media item must have a **direct link** (no embedded players or page redirects).

| Type | Accepted Formats |
|------|-----------------|
| Video | **MP4** (required for cross-platform playback on Apple and Android devices) |
| Image | JPG, PNG, or GIF |

## Notes

- A **REST API returning JSON** is the typical integration pattern, but since we write a custom adapter for each provider we can work with just about any API format.
- If you're interested in becoming a FreePlay content provider, reach out on [Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) or open an issue on [GitHub](https://github.com/ChurchApps/ChurchAppsSupport/issues).
