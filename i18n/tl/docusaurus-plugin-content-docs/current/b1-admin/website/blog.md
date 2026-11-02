---
title: "Blog"
---

# Blog

<div class="article-intro">

Hinahayaan ka ng pahinang Blog na mag-publish ng mga balita, update, at debosyonal sa website ng iyong simbahan. Lumalabas ang mga post sa isang listahan ng card sa `/blog`, sa sarili nilang URL, at sa RSS feed na maaaring bantayan ng ibang tool (gaya ng Zapier) para sa mga bagong post.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kumpletuhin ang [Initial Setup](initial-setup) para sa iyong website
- Magdagdag ng navigation link papunta sa `/blog` mula sa [Managing Pages](managing-pages) kung gusto mong makita ng mga bisita ang iyong blog mula sa menu

</div>

## Pag-access sa Blog

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas) at palawakin ang **Website**.
2. I-click ang **Blog**.
3. Inililista ng pahinang Blog ang bawat post kasama ang estado at petsa ng publikasyon nito.

## Pagdaragdag ng Post

1. I-click ang **Add Post** sa kanang itaas.
2. Maglagay ng **Title**. Awtomatikong gagawa ng URL-friendly na **Web address** (slug) habang nagta-type ka -- maaari mo itong i-edit nang direkta kung gusto mo ng ibang address.
3. Magdagdag ng **Excerpt** -- maikling buod na ipinapakita sa listahan ng post, meta description, at RSS feed. Kung iiwan itong blangko, awtomatikong gagawa ng isa mula sa simula ng nilalaman ng post.
4. Isulat ang katawan ng post sa editor ng **Content** gamit ang Markdown. I-click ang **Preview** para makita kung paano lilitaw ang naka-format na post.
5. Pumili ng **Category** (pumili ng umiiral na o mag-type ng bago) at opsyonal na **Tags** na pinaghihiwalay ng kuwit.
6. I-click ang **Select Image** para pumili ng larawan mula sa iyong gallery ng [Files](files), o mag-upload ng bago. Ang mga na-upload na larawan ay bumubukas sa built-in na crop tool na naka-lock sa 16:9 na ratio, para maayos mo ang anumang larawan para magkasya sa header ng post at sa mga card ng listahan.
7. Itakda ang **Author** -- ikaw ang default, pero maaari kang maghanap at pumili ng sinumang tao sa iyong database.
8. I-on ang **Published** at itakda ang **Publish Date** kapag handa ka nang gawing publiko ang post. Iwanan itong naka-off para i-save ang post bilang draft.

:::tip
Magtakda ng **Publish Date** sa hinaharap para mag-iskedyul ng post. Mananatili itong nakatago sa mga bisita at magpapakita ng **Scheduled** chip sa listahan ng Blog hanggang dumating ang petsang iyon.
:::

## Mga Estado ng Post

Bawat post sa listahan ay nagpapakita ng isa sa tatlong estado:

- **Draft** -- Hindi pa naipu-publish. Nakikita lang sa admin.
- **Scheduled** -- Naka-on ang Published, pero nasa hinaharap ang publish date.
- **Published** -- Live sa iyong website at kasama sa RSS feed.

## Pag-edit, Pag-preview, at Pagbura ng Post

- I-click ang **Edit** sa tabi ng post para gumawa ng mga pagbabago.
- I-click ang **View on Site** (lumalabas sa mga naka-publish na post) para buksan ang live na post sa iyong website sa bagong tab.
- I-click ang **Delete** para tuluyang alisin ang post.

## Paano Nakikita ng Mga Bisita ang Iyong Blog

Lumalabas ang mga naka-publish na post sa `{yoursite}/blog`, 10 bawat pahina, na may mga link na **Older**/**Newer** para mag-navigate sa iyong archive, kasama ang filter ng category at byline at larawan ng bawat post. Lumalabas din bilang mga chip na maaaring i-click ang mga tag, kaya maaaring salain ng mga bisita ang listahan ayon sa tag sa parehong paraan. Nasa `{yoursite}/blog/{slug}` ang bawat indibidwal na post at kasama nito ang mga kaugnay na post mula sa parehong category. Naglalathala rin ang pahina ng blog ng RSS feed, na awtomatikong natutuklasan ng mga feed reader at automation tool gaya ng Zapier.

:::info
Hiwalay na uri ng nilalaman ang mga blog post mula sa regular na pahina ng website -- hindi sila ginagawa sa [page editor](page-editor) at hindi lumalabas sa listahan ng Pages. Pinapanatili nitong mabilis at nakatuon sa pagsusulat ang paggawa ng blog.
:::

## Pagdaragdag ng Mga Komento Sa Ibaba ng Post

Hindi nagho-host ang B1 ng mga komento sa blog, pero maaari kang magdagdag ng serbisyo ng komento. Maaari ka ring maglagay ng anumang iba pa sa ibaba ng bawat post, gaya ng newsletter signup o giving button.

1. Mag-sign up sa serbisyo ng komento gaya ng [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com), o [Disqus](https://disqus.com) at kopyahin ang embed code nito.
2. Sa pahinang Blog, mag-scroll sa **Below Every Post**.
3. I-paste ang embed code at i-click ang **Save**.

Lalabas ang code sa ilalim ng nilalaman ng bawat naka-publish na post. Ang serbisyo ng komento ang humahawak sa moderation at spam filtering, kaya regular itong suriin sa dashboard nito.

:::tip
Burahin ang laman ng kahon at i-click ang **Save** para alisin ang code sa bawat post. Tanging mga taong maaaring mag-edit ng church settings ang nakakakita ng kahong ito.
:::

## Mga Susunod na Hakbang

- [Managing Pages](managing-pages) -- Magdagdag ng navigation link papunta sa iyong blog
- [Files](files) -- Mag-upload ng mga larawang gagamitin sa iyong mga post
- [Zapier Integration](../integrations/zapier.md) -- Mag-trigger ng mga automation kapag may nai-publish na bagong post
