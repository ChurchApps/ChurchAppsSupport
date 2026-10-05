---
title: "Blog"
---

# Blog

<div class="article-intro">

Ang pahinang Blog ay nagbibigay-daan sa iyong mag-publish ng mga balita, update, at devotional sa website ng inyong simbahan. Lumalabas ang mga post sa isang card listing sa `/blog`, sa sarili nilang URL, at sa isang RSS feed na maaaring bantayan ng ibang tool (tulad ng Zapier) para sa mga bagong post.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kumpletuhin ang [Initial Setup](initial-setup) para sa iyong website
- Magdagdag ng navigation link papuntang `/blog` mula sa [Pamamahala ng mga Pahina](managing-pages) kung gusto mong mahanap ng mga bisita ang blog mula sa menu

</div>

## Pagpunta sa Blog

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas) at i-expand ang **Website**.
2. I-click ang **Blog**.
3. Inililista ng pahinang Blog ang bawat post kasama ang estado at petsa ng pag-publish nito.

## Pagdaragdag ng Post

1. I-click ang **Add Post** sa kanang itaas na sulok.
2. Maglagay ng **Title**. Awtomatikong ginagawa ang isang URL-friendly na slug habang nagta-type ka -- maaari mo itong i-edit nang direkta kung gusto mo ng ibang address.
3. Magdagdag ng **Excerpt** -- isang maikling buod na makikita sa listahan ng mga post, sa meta descriptions, at sa RSS feed. Kung iiwan mo itong blangko, awtomatiko itong gagawin mula sa simula ng nilalaman ng iyong post.
4. Isulat ang katawan ng post sa **Content** editor gamit ang Markdown. I-click ang **Preview** para makita kung ano ang magiging itsura ng naka-format na post.
5. Pumili ng **Category** (pumili ng dati na o mag-type ng bago) at opsyonal na **Tags** na pinaghihiwalay ng kuwit.
6. I-click ang **Select Image** para pumili ng larawan mula sa iyong [Files](files) gallery, o mag-upload ng bago. Ang mga na-upload na larawan ay bumubukas sa built-in na crop tool na naka-lock sa 16:9 na ratio, kaya maaari mong i-frame ang anumang larawan para magkasya sa header ng post at sa mga listing card.
7. Itakda ang **Author** -- ikaw ang default, ngunit maaari kang maghanap at pumili ng sinumang tao sa iyong database.
8. I-on ang **Published** at magtakda ng **Publish Date** kapag handa ka nang gawing pampubliko ang post. Iwan itong naka-off para i-save ang post bilang draft.

:::tip
Magtakda ng **Publish Date** sa hinaharap para i-schedule ang isang post. Mananatili itong nakatago sa mga bisita at magpapakita ng **Scheduled** na chip sa Blog list hanggang sa dumating ang petsang iyon.
:::

## Mga Estado ng Post

Ang bawat post sa listahan ay nagpapakita ng isa sa tatlong estado:

- **Draft** -- Hindi pa naka-publish. Makikita lamang sa admin.
- **Scheduled** -- Naka-on ang Published, ngunit nasa hinaharap pa ang petsa ng pag-publish.
- **Published** -- Live na sa iyong website at kasama sa RSS feed.

## Pag-edit, Pag-preview, at Pagtanggal ng mga Post

- I-click ang **Edit** icon sa tabi ng isang post para gumawa ng mga pagbabago.
- I-click ang **View** icon (makikita sa mga naka-publish na post) para buksan sa bagong tab ang live na post sa iyong website.
- I-click ang **Delete** icon para permanenteng tanggalin ang isang post.

## Paano Nakikita ng mga Bisita ang Iyong Blog

Lumalabas ang mga naka-publish na post sa `{yoursite}/blog`, 10 kada pahina na may mga link na **Older**/**Newer** para mag-page sa iyong archive, kasama ang category filter at ang byline at larawan ng bawat post. Lumalabas din ang mga tag bilang mga chip na maaaring i-click, para ma-filter ng mga bisita ang listahan ayon sa tag sa parehong paraan. Ang mga indibidwal na post ay nasa `{yoursite}/blog/{slug}` at may kasamang mga kaugnay na post mula sa parehong kategorya. Naglalathala rin ang pahina ng blog ng isang RSS feed, na awtomatikong natutuklasan ng mga feed reader at ng mga automation tool tulad ng Zapier.

:::info
Ang mga blog post ay hiwalay na uri ng nilalaman mula sa mga karaniwang pahina ng website -- hindi sila binubuo sa [page editor](page-editor) at hindi lumalabas sa listahan ng Pages. Dahil dito, mabilis at nakatuon sa pagsusulat ang paggawa ng blog.
:::

## Mga Susunod na Hakbang

- [Pamamahala ng mga Pahina](managing-pages) -- Magdagdag ng navigation link papunta sa iyong blog
- [Files](files) -- Mag-upload ng mga larawang gagamitin sa iyong mga post
- [Zapier Integration](../integrations/zapier.md) -- Magpatakbo ng mga automation kapag may bagong post na na-publish
