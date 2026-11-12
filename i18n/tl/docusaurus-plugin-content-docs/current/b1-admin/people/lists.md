---
title: "Mga Naka-save na Listahan"
description: "I-save ang isang People search sa B1 Admin bilang pinangalanang listahan, at i-load ito muli gamit ang isang click. Buhay ang mga listahan, kaya awtomatikong lumalabas ang mga bagong tugmang miyembro."
---

# Mga Naka-save na Listahan

<div class="article-intro">

Hinahayaan ka ng **Saved Lists** na itago ang isang search query sa ilalim ng pangalan at patakbuhin itong muli gamit ang isang click anumang oras. Buuin ang listahan nang isang beses — "Active Members in Campus North," "Visitors in the last 90 days," o anumang advanced filter — at mananatili ito sa itaas ng pahinang People para hindi mo na kailangang buuin muli ang query.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Magpatakbo ng kahit isang search sa seksyong People para may mga resultang maisa-save. Tingnan ang [Searching People](./searching-people.md) o [AI Search](./ai-search.md).
- Ang pag-save, pagbabago, at pagbura ng mga listahan ay nangangailangan ng pahintulot na **Edit People**. Tingnan ang [Assigning Roles](./roles-permissions.md).

</div>

## Pag-save ng Search bilang Listahan {#saving-a-search-as-a-list}

1. Magpatakbo ng search sa pahinang **People** — quick search, AI search, o advanced filter search.
2. Kapag may nahanap na kahit isang tao, lalabas ang button na **Save as List** sa header ng pahinang People.
3. I-click ang **Save as List**.
4. Maglagay ng **List Name** (kailangan).
5. Opsyonal na maglagay ng **Category** para pagpangkatin ang mga kaugnay na listahan (halimbawa, "Outreach" o "Membership").
6. Sa ilalim ng **Who can see this list**, piliin ang **All staff** o **Only me**.
7. Sa ilalim ng **Match**, piliin ang **All filters** (dapat tumugma ang tao sa bawat filter) o **Any filter** (mga taong tumutugma sa kahit isang filter).
8. Sa ilalim ng **Include household**, piliin ang **Matches only**, **Children of matches** (idinadagdag din ang mga anak sa household ng bawat tumutugmang tao), o **Entire household** (idinadagdag ang lahat sa household ng bawat tumutugmang tao).
9. Opsyonal na lagyan ng check ang **Refresh nightly** (tingnan ang [Nightly Refresh](#nightly-refresh) sa ibaba). Kapag naka-check ito, puwede mo ring lagyan ng check ang **Email me when membership changes**.
10. I-click ang **Save**.

Naka-save na ang listahan at lumilitaw bilang button sa hilera ng mga naka-save na listahan sa itaas ng pahinang People, sa tabi ng **Everyone**. Ang mga listahang minarkahang **Only me** ay may maliit na lock icon.

:::info
Ang mga listahang nakatakdang **All staff** ay ibinabahagi sa buong simbahan — sinumang may access sa People ay makakakita at makakapag-load nito. Tanging ang mga staff na may tamang pahintulot ang makakapagbago o makakapagbura ng mga listahan.
:::

## Pag-load ng Naka-save na Listahan {#loading-a-saved-list}

Sa itaas ng pahinang People, i-click ang alinmang pangalan ng listahan. Agad na tatakbo muli ang search gamit ang nakaimbak na query at ia-update ang mga resulta. I-click ang **Everyone** para bumalik sa buong directory mo.

Pinagpapangkat ang mga listahan ayon sa category (kung nagtalaga ka nito), at ang mga listahang walang category ay nasa huli.

:::tip
Ang mga listahan ay **live query**, hindi snapshot. Sa bawat pag-load ng listahan, sariwang tumatakbo ang search laban sa kasalukuyang datos, kaya lalabas ang mga bagong tao na ngayon ay tumutugma sa pamantayan.
:::

## Pagpapalit ng Pangalan at Pagbura ng mga Listahan {#renaming-and-deleting-lists}

Ang mga staff na may manage permission ay maaaring magpalit ng pangalan o magbura ng alinmang listahan mula sa pahinang People. Una, i-click ang listahan para i-load ito — dalawang icon ang lalabas sa tabi ng pangalan nito:

- I-click ang icon na **List Settings** (gear) para palitan ang pangalan nito o baguhin ang category at pagbabahagi. Ang mga listahang na-save gamit ang mga opsyong ito ay puwede ring baguhin ang **Include household**, **Refresh nightly**, at **Email me when membership changes** dito. Hindi na mababago ang setting na **Match** pagkatapos i-save ang listahan.
- I-click ang icon na **Delete** (trash) para burahin ito (kukumpirmahin ka muna).

## Nightly Refresh {#nightly-refresh}

Sariwang tumatakbo ang search tuwing ilo-load ang isang listahan, naka-check man o hindi ang **Refresh nightly**. Ipinapatakbo rin ng **Refresh nightly** muli ng B1 ang listahan tuwing gabi at sinusubaybayan kung sino ang sumali o umalis dito. Kapag na-check mo ang **Email me when membership changes**, magpapadala ang B1 sa iyo (ang nag-save ng listahan) ng email pagkatapos ng nightly refresh na nagdagdag o nag-alis ng sinuman, kasama ang bilang ng mga taong nadagdag at naalis. Ipinapadala rin ng nightly refresh ang mga pagbabago sa membership ng listahan sa iyong [mga integration](../integrations/index.md), gaya ng mga tag ng Mailchimp.

## Mga Gamit {#use-cases}

| Sitwasyon | Paano buuin ang listahan |
|---|---|
| Lahat ng bisita | Advanced search: Membership Status = Visitor |
| Mga miyembrong nasa partikular na campus | Advanced search: Campus = [iyong campus] |
| Mga volunteer na expired na ang background check | Advanced search: [Custom Field](../settings/custom-fields.md) "Background check expires" ay bago ang araw na ito |
| Mga resulta mula sa tanong sa AI | Magtanong sa AI Search, pagkatapos i-save |

## Mga Kaugnay na Artikulo {#related-articles}

- [Searching People](./searching-people.md) — mabilisang search at pag-customize ng column
- [AI Search](./ai-search.md) — mga natural-language query na puwede mong i-save bilang listahan
- [Custom Fields](../settings/custom-fields.md) — gumawa ng sarili mong field ng tao, pagkatapos mag-filter at mag-save ng mga listahan batay sa mga ito
- [Demographics](./demographics.md) — i-drill ang demographic chart patungo sa People filter, pagkatapos i-save ito bilang listahan
- [Bulk Editing](./bulk-editing.md) — pagkatapos mag-load ng listahan, sabay-sabay na i-update ang lahat ng miyembro nito
