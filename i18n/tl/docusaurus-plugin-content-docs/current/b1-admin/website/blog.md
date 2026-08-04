---
title: "Blog"
---

# Blog

<div class="article-intro">

Ang pahinang Blog ay nagbibigay-daan sa iyong maglathala ng balita, update, at debosyonal sa website ng iyong simbahan. Ang mga post ay lumalabas sa isang card listing sa `/blog`, sa sarili nitong URL, at sa isang RSS feed na maaaring bantayan ng ibang mga tool (tulad ng Zapier) para sa mga bagong post.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kumpletuhin ang [Initial Setup](initial-setup) para sa iyong website
- Magdagdag ng navigation link papunta sa `/blog` mula sa [Managing Pages](managing-pages) kung gusto mong mahanap ng mga bisita ang iyong blog mula sa menu

</div>

## Pag-access sa Blog

1. Sa B1 Admin, i-click ang **Website** sa kaliwang menu.
2. I-click ang tab na **Blog** sa itaas ng Website Pages view.
3. Nililista ng pahinang Blog ang bawat post kasama ang estado at petsa ng paglathala nito.

## Pagdaragdag ng Post

1. I-click ang **Add Post** sa kanang itaas na sulok.
2. Ilagay ang isang **Title**. Awtomatikong bubuo ang isang URL-friendly na slug habang nagta-type ka -- maaari mo itong direktang i-edit kung gusto mo ng ibang address.
3. Magdagdag ng **Excerpt** -- isang maikling buod na ipinapakita sa post listing, meta description, at RSS feed. Kung iiwanan mong blangko ito, awtomatikong bubuo ang isa mula sa simula ng nilalaman ng iyong post.
4. Isulat ang katawan ng post sa **Content** editor gamit ang Markdown. I-click ang **Preview** para makita kung ano ang magiging itsura ng na-format na post.
5. Pumili ng isang **Category** (pumili ng umiiral na o mag-type ng bago) at opsyonal na **Tags** na pinaghihiwalay ng kuwit.
6. I-click ang **Select Image** para pumili ng litrato mula sa iyong [Files](files) gallery, o mag-upload ng bago. Ang mga na-upload na litrato ay bubuksan sa isang built-in na crop tool na naka-lock sa 16:9 na ratio, kaya't maaari mong i-frame ang anumang litrato para bumagay ito sa header at listing card ng post.
7. I-set ang **Author** -- default itong ikaw, ngunit maaari kang maghanap at pumili ng sinumang tao sa iyong database.
8. I-on ang **Published** at i-set ang **Publish Date** kapag handa ka nang gawing pampubliko ang post. Iwanang naka-off para i-save ang post bilang draft.

:::tip
I-set ang **Publish Date** sa hinaharap para mag-schedule ng post. Nananatili itong nakatago mula sa mga bisita at nagpapakita ng chip na **Scheduled** sa listahan ng Blog hanggang sa dumating ang petsang iyon.
:::

## Mga Estado ng Post

Ang bawat post sa listahan ay nagpapakita ng isa sa tatlong estado:

- **Draft** -- Hindi pa nalalathala. Nakikita lamang sa admin.
- **Scheduled** -- Naka-on ang Published, ngunit ang petsa ng paglathala ay nasa hinaharap.
- **Published** -- Live sa iyong website at kasama sa RSS feed.

## Pag-edit, Pag-preview, at Pagbura ng mga Post

- I-click ang icon na **Edit** sa tabi ng isang post para gumawa ng mga pagbabago.
- I-click ang icon na **View** (nakikita sa mga nalathalang post) para buksan ang live na post sa iyong website sa isang bagong tab.
- I-click ang icon na **Delete** para permanenteng alisin ang isang post.

## Paano Nakikita ng mga Bisita ang Iyong Blog

Lumalabas ang mga nalathalang post sa `{yoursite}/blog`, 10 kada pahina na may mga link na **Older**/**Newer** para maglakbay sa iyong archive, kasama ang isang filter ng kategorya at ang byline at litrato ng bawat post. Nagiging clickable chip din ang mga tag, na nagbibigay-daan sa mga bisita na i-filter ang listahan sa parehong paraan ayon sa tag. Ang mga indibidwal na post ay nasa `{yoursite}/blog/{slug}` at may kasamang mga kaugnay na post mula sa parehong kategorya. Naglalathala rin ang pahina ng blog ng isang RSS feed, na awtomatikong madidiskubre ng mga feed reader at automation tool tulad ng Zapier.

:::info
Ang mga blog post ay isang hiwalay na uri ng content mula sa mga regular na pahina ng website -- hindi ito ginagawa sa [page editor](page-editor) at hindi lumalabas sa listahan ng Pages. Pinapanatili nitong mabilis at nakatuon sa pagsusulat ang paggawa ng blog.
:::

## Susunod na mga Hakbang

- [Managing Pages](managing-pages) -- Magdagdag ng navigation link papunta sa iyong blog
- [Files](files) -- Mag-upload ng mga litrato para gamitin sa iyong mga post
- [Zapier Integration](../integrations/zapier.md) -- I-trigger ang mga automation kapag may nalathalang bagong post
