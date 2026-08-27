---
title: "Blog"
---

# Blog

<div class="article-intro">

The Blog page lets you publish news, updates, and devotionals Per your church website. Posts appear in a card listing at `/blog`, at their own URL, and in an RSS feed that other tools (like Zapier) can watch for new posts.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Complete the [Initial Setup](initial-setup) for your website
- Aggiungi a navigation link Per `/blog` from [Managing Pages](managing-pages) if you want visitors Per Trova your blog from the menu

</div>

## Accessing the Blog

1. In the B1 Admin, Fai clic **Sito Web** in the left menu.
2. Fai clic the **Blog** tab at the top of the Sito Web Pages Visualizza.
3. The Blog page lists every post along with its state and publish Data.

## Adding a Post

1. Fai clic **Aggiungi Post** in the top right corner.
2. Inserisci a **Title**. A URL-friendly slug is generated for you automatically as you Digita -- you can Modifica it directly if you want a different address.
3. Aggiungi an **Excerpt** -- a short summary shown in the post listing, meta descriptions, and RSS feed. If you leave it blank, one is generated automatically from the start of your post content.
4. Write the post body in the **Content** editor using Markdown. Fai clic **Preview** Per see how the formatted post will look.
5. Scegli a **Category** (pick an existing one or Digita a new one) and Facoltativo comma-separated **Tags**.
6. Fai clic **Seleziona Image** Per Scegli a photo from your [Files](files) gallery, or Carica a new one. Uploaded photos Apri in a built-in crop tool locked Per a 16:9 ratio, so you can frame any photo Per fit the post header and listing cards.
7. Set the **Author** -- it defaults Per you, but you can Cerca for and Seleziona any person in your database.
8. Turn on **Published** and set a **Publish Data** when you are ready Per make the post public. Leave it off Per Salva the post as a draft.

:::tip
Set a **Publish Data** in the future Per schedule a post. It stays hidden from visitors and shows a **Scheduled** chip in the Blog list until that Data arrives.
:::

## Post States

Each post in the list shows one of three states:

- **Draft** -- Not published. Only visible in the admin.
- **Scheduled** -- Published is on, but the publish Data is in the future.
- **Published** -- Live on your website and included in the RSS feed.

## Editing, Previewing, and Deleting Posts

- Fai clic the **Modifica** icon Avanti Per a post Per make changes.
- Fai clic the **Visualizza** icon (visible on published posts) Per Apri the live post on your website in a new tab.
- Fai clic the **Elimina** icon Per permanently Rimuovi a post.

## How Visitors See Your Blog

Published posts appear at `{yoursite}/blog`, 10 per page with **Older**/**Newer** links Per page through your archive, along with a category filter and each post's byline and photo. Tags render as clickable chips too, letting visitors filter the list by tag the same way. Individual posts live at `{yoursite}/blog/{slug}` and include related posts from the same category. The blog page also publishes an RSS feed, auto-discoverable by feed readers and automation tools like Zapier.

:::info
Blog posts are a separate content Digita from regular website pages -- they are not built in the [page editor](page-editor) and do not appear in the Pages list. This keeps blog authoring fast and focused on writing.
:::

## Avanti Steps

- [Managing Pages](managing-pages) -- Aggiungi a navigation link Per your blog
- [Files](files) -- Carica photos Per use in your posts
- [Zapier Integration](../integrations/zapier.md) -- Trigger automations when new posts are published
