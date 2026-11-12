---
title: "Pagsulat ng Blog Post para sa Iyong Website sa B1 Admin"
sidebar_label: "Blog"
description: "Gumawa, mag-iskedyul, at mag-publish ng mga blog post sa website ng iyong simbahan sa B1 Admin, kabilang ang mga excerpt, kategorya, tag, header photo, at comment embed."
---

# Blog

<div class="article-intro">

Hinahayaan ka ng pahinang Blog na mag-publish ng balita, update, at devotional sa website ng iyong simbahan. Lumilitaw ang mga post sa listahan ng card sa `/blog`, sa sarili nilang URL, at sa RSS feed na mababantayan ng ibang tool (gaya ng Zapier) para sa mga bagong post.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kumpletuhin ang [Initial Setup](./initial-setup.md) para sa iyong website
- Magdagdag ng navigation link papunta sa `/blog` mula sa [Managing Pages](./managing-pages.md) kung gusto mong mahanap ng mga bisita ang iyong blog mula sa menu

</div>

## Pag-access sa Blog {#accessing-the-blog}

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa itaas-kaliwa) at palawakin ang **Website**.
2. I-click ang **Blog**.
3. Inililista ng pahinang Blog ang bawat post kasama ang estado at petsa ng publish nito.

## Pagdaragdag ng Post {#adding-a-post}

1. I-click ang **Add Post** sa kanang-itaas na sulok.
2. Maglagay ng **Title**. Awtomatikong ginagawa ang **Web address** (slug) na madaling basahin ng URL habang nagta-type ka -- maaari mo itong i-edit nang direkta kung gusto mo ng ibang address.
3. Magdagdag ng **Excerpt** -- isang maikling buod na ipinapakita sa listahan ng post, sa meta description, at sa RSS feed. Kung iiwan itong blangko, awtomatikong gagawa ng isa mula sa simula ng nilalaman ng post mo.
4. Isulat ang katawan ng post sa **Content** editor gamit ang Markdown. I-click ang **Preview** para makita kung paano lalabas ang naka-format na post.
5. Pumili ng **Category** (pumili ng umiiral o mag-type ng bago) at opsyonal na **Tags** na pinaghihiwalay ng kuwit.
6. I-click ang **Select Image** para pumili ng larawan mula sa iyong [Files](./files.md) gallery, o mag-upload ng bago. Ang mga na-upload na larawan ay nagbubukas sa built-in na crop tool na naka-lock sa 16:9 na ratio, para maayos mo ang anumang larawan para magkasya sa header ng post at sa mga card ng listahan.
7. Itakda ang **Author** -- ikaw ang default, pero maaari kang maghanap at pumili ng sinumang tao sa iyong database.
8. I-on ang **Published** kapag handa ka nang gawing pampubliko ang post. Lilitaw ang field na **Publish Date**, nakatakda sa araw ngayon; palitan ito kung gusto mo ng ibang petsa. Iwanan ang switch sa **Draft** para i-save ang post bilang draft.
9. I-click ang **Save**. Kailangan ng post ng pamagat at web address na hindi pa ginagamit ng ibang post.

:::tip
Magtakda ng **Publish Date** sa hinaharap para mag-iskedyul ng post. Nananatili itong nakatago sa mga bisita at nagpapakita ng chip na **Scheduled** sa listahan ng Blog hanggang dumating ang petsang iyon.
:::

## Mga Estado ng Post {#post-states}

Bawat post sa listahan ay nagpapakita ng isa sa tatlong estado:

- **Draft** -- Hindi pa nai-publish. Nakikita lamang sa admin.
- **Scheduled** -- Naka-on ang Published, pero nasa hinaharap ang publish date.
- **Published** -- Live sa iyong website at kasama sa RSS feed.

## Pag-edit, Pag-preview, at Pagbura ng Post {#editing-previewing-and-deleting-posts}

- I-click ang **Edit** sa tabi ng post para gumawa ng mga pagbabago.
- I-click ang **View on Site** (lumalabas sa mga naka-publish na post) para buksan ang live na post sa iyong website sa bagong tab.
- I-click ang **Delete** para tuluyang alisin ang post.

## Paano Nakikita ng mga Bisita ang Iyong Blog {#how-visitors-see-your-blog}

Lumilitaw ang mga naka-publish na post sa `{yoursite}/blog`, 10 kada pahina na may mga link na **Older posts**/**Newer posts** para ma-browse ang iyong archive, kasama ang mga category chip na nagfi-filter sa listahan at ang byline at larawan ng bawat post. Lumalabas bilang mga clickable chip sa ibaba ng bawat post ang mga tag, kaya maaaring mag-filter ang mga bisita ng listahan ayon sa tag sa parehong paraan. Nasa `{yoursite}/blog/{slug}` ang mga indibidwal na post at nagtatapos sa seksyong **More in** *category* na naglilista ng hanggang tatlong ibang post mula sa parehong kategorya. Tingnan ang [Blog](../../b1-church/content/blog.md) sa gabay ng B1.church para sa makikita ng mga bisita. Naglalathala rin ang pahina ng blog ng RSS feed, na awtomatikong natutuklasan ng mga feed reader at automation tool gaya ng Zapier.

Maaari ring lumabas ang mga naka-publish na post sa seksyong **News** sa Home screen ng app ng simbahan mo, kung i-on mo ito -- tingnan ang [Home Screen Sections](../settings/mobile-app.md#home-screen-sections).

:::info
Hiwalay na uri ng nilalaman ang mga blog post mula sa regular na pahina ng website -- hindi sila ginagawa sa [page editor](./page-editor.md) at hindi lumalabas sa listahan ng Pages. Pinananatiling mabilis at nakatuon sa pagsulat ang paggawa ng blog.
:::

## Pagdaragdag ng Comment sa Ibaba ng Post {#adding-comments-below-posts}

Hindi nagho-host ang B1 ng mga comment sa blog mismo, pero maaari kang magdagdag ng serbisyo ng comment. Maaari ka ring maglagay ng anumang iba pa sa ibaba ng bawat post, gaya ng newsletter signup o giving button.

1. Mag-sign up sa serbisyo ng comment gaya ng [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com), o [Disqus](https://disqus.com) at kopyahin ang embed code nito.
2. Sa pahinang Blog, mag-scroll sa **Below Every Post**.
3. I-paste ang embed code at i-click ang **Save**.

Lumilitaw ang code sa ibaba ng nilalaman ng bawat naka-publish na post. Ang serbisyo ng comment mo ang humahawak sa moderation at spam filtering, kaya regular itong suriin sa dashboard nito.

:::tip
I-clear ang kahon at i-click ang **Save** para alisin ang code sa bawat post. Tanging ang mga taong maaaring mag-edit ng church settings lamang ang nakakakita ng kahong ito.
:::

## Mga Susunod na Hakbang {#next-steps}

- [Managing Pages](./managing-pages.md) -- Magdagdag ng navigation link papunta sa iyong blog
- [Files](./files.md) -- Mag-upload ng mga larawang gagamitin sa iyong mga post
- [Zapier Integration](../integrations/zapier.md) -- Mag-trigger ng mga automation kapag may bagong post na nai-publish
