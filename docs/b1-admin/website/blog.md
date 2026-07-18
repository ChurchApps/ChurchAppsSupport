---
title: "Blog"
---

# Blog

<div class="article-intro">

The Blog page lets you publish news, updates, and devotionals to your church website. Posts appear in a card listing at `/blog`, at their own URL, and in an RSS feed that other tools (like Zapier) can watch for new posts.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Complete the [Initial Setup](initial-setup) for your website
- Add a navigation link to `/blog` from [Managing Pages](managing-pages) if you want visitors to find your blog from the menu

</div>

## Accessing the Blog

1. In the B1 Admin, click **Website** in the left menu.
2. Click the **Blog** tab at the top of the Website Pages view.
3. The Blog page lists every post along with its state and publish date.

## Adding a Post

1. Click **Add Post** in the top right corner.
2. Enter a **Title**. A URL-friendly slug is generated for you automatically as you type -- you can edit it directly if you want a different address.
3. Add an **Excerpt** -- a short summary shown in the post listing, meta descriptions, and RSS feed. If you leave it blank, one is generated automatically from the start of your post content.
4. Write the post body in the **Content** editor using Markdown. Click **Preview** to see how the formatted post will look.
5. Choose a **Category** (pick an existing one or type a new one) and optional comma-separated **Tags**.
6. Click **Select Image** to choose a photo from your [Files](files) gallery. Use a 16:9 image for the best fit in the post header and listing cards.
7. Set the **Author** -- it defaults to you, but you can search for and select any person in your database.
8. Turn on **Published** and set a **Publish Date** when you are ready to make the post public. Leave it off to save the post as a draft.

:::tip
Set a **Publish Date** in the future to schedule a post. It stays hidden from visitors and shows a **Scheduled** chip in the Blog list until that date arrives.
:::

## Post States

Each post in the list shows one of three states:

- **Draft** -- Not published. Only visible in the admin.
- **Scheduled** -- Published is on, but the publish date is in the future.
- **Published** -- Live on your website and included in the RSS feed.

## Editing, Previewing, and Deleting Posts

- Click the **Edit** icon next to a post to make changes.
- Click the **View** icon (visible on published posts) to open the live post on your website in a new tab.
- Click the **Delete** icon to permanently remove a post.

## How Visitors See Your Blog

Published posts appear at `{yoursite}/blog`, with a category filter and each post's byline and photo. Individual posts live at `{yoursite}/blog/{slug}` and include related posts from the same category. The blog page also publishes an RSS feed, auto-discoverable by feed readers and automation tools like Zapier.

:::info
Blog posts are a separate content type from regular website pages -- they are not built in the [page editor](page-editor) and do not appear in the Pages list. This keeps blog authoring fast and focused on writing.
:::

## Next Steps

- [Managing Pages](managing-pages) -- Add a navigation link to your blog
- [Files](files) -- Upload photos to use in your posts
- [Zapier Integration](../integrations/zapier.md) -- Trigger automations when new posts are published
