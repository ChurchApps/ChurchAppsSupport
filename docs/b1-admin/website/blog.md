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

1. In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left) and expand **Website**.
2. Click **Blog**.
3. The Blog page lists every post along with its state and publish date.

## Adding a Post

1. Click **Add Post** in the top right corner.
2. Enter a **Title**. A URL-friendly **Web address** (slug) is generated for you automatically as you type -- you can edit it directly if you want a different address.
3. Add an **Excerpt** -- a short summary shown in the post listing, meta descriptions, and RSS feed. If you leave it blank, one is generated automatically from the start of your post content.
4. Write the post body in the **Content** editor using Markdown. Click **Preview** to see how the formatted post will look.
5. Choose a **Category** (pick an existing one or type a new one) and optional comma-separated **Tags**.
6. Click **Select Image** to choose a photo from your [Files](files) gallery, or upload a new one. Uploaded photos open in a built-in crop tool locked to a 16:9 ratio, so you can frame any photo to fit the post header and listing cards.
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

- Click **Edit** next to a post to make changes.
- Click **View on Site** (shown on published posts) to open the live post on your website in a new tab.
- Click **Delete** to permanently remove a post.

## How Visitors See Your Blog

Published posts appear at `{yoursite}/blog`, 10 per page with **Older**/**Newer** links to page through your archive, along with a category filter and each post's byline and photo. Tags render as clickable chips too, letting visitors filter the list by tag the same way. Individual posts live at `{yoursite}/blog/{slug}` and include related posts from the same category. The blog page also publishes an RSS feed, auto-discoverable by feed readers and automation tools like Zapier.

:::info
Blog posts are a separate content type from regular website pages -- they are not built in the [page editor](page-editor) and do not appear in the Pages list. This keeps blog authoring fast and focused on writing.
:::

## Adding Comments Below Posts

B1 doesn't host blog comments itself, but you can add a comments service. You can also put anything else below every post, like a newsletter signup or a giving button.

1. Sign up with a comments service such as [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com), or [Disqus](https://disqus.com) and copy its embed code.
2. On the Blog page, scroll to **Below Every Post**.
3. Paste the embed code and click **Save**.

The code appears below the content of every published post. Your comments service handles moderation and spam filtering, so check its dashboard regularly.

:::tip
Clear the box and click **Save** to remove the code from every post. Only people who can edit church settings see this box.
:::

## Next Steps

- [Managing Pages](managing-pages) -- Add a navigation link to your blog
- [Files](files) -- Upload photos to use in your posts
- [Zapier Integration](../integrations/zapier.md) -- Trigger automations when new posts are published
