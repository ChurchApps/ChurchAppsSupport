---
title: "Website Builder-arkitektur"
---

# Website Builder-arkitektur

<div class="article-intro">

Hver kirkenettsted som betjenes av B1App gjengis fra et innholdstre -- sider, seksjoner, elementer -- lagret i ContentApi og redigert visuelt i B1Admin. Ett delt komponentbibliotek gjengjør både editorforhåndsvisningen og det aktive nettstedet, en element-type-katalog definerer hva som kan vises på en side, og en separat AI-tjeneste kan generere eller omskrive det treet. Denne siden kartlegger hele stakken.

</div>

## Oversikt

Tre regler holder på tvers av stakken:

1. **Ett tre, to renderere.** En side er et `pages → sections → elements`-tre hvor hver node bærer innstillingene som en `answers`-JSON-blob.
2. **Kontrakten bor i `@churchapps/helpers`.** `ElementTypes.ts` er den eneste katalogen over element-typer; renderes løser seg gjennom et register i apphelper.
3. **Det offentlige nettstedet leser anonyme endepunkter.** Alt B1App trenger -- sidetreen, innstillingene, blogginnlegg, omdirigeringer -- er offentlig.

## Innholdstreet

Innholdsmodulen (`Api/src/modules/content`) eier byggerens data:

| Tabell | Rolle |
|--------|-------|
| `pages` | En side per URL: `url`, `title`, `layout`, pluss `visibility`/`groupIds` (tilgangsporing) |
| `sections` | Horisontale bånd på en side (eller i en blokk): bakgrunn, tekstfarget og en `answersJSON` |
| `elements` | Innholdsstykker innenfor en seksjons: `elementType` + `answersJSON`, nestbar for layouttyper |
| `blocks` | Gjenbrukbare seksjons/element-grupper delt på tvers av sider |
| `posts` | Frittstående blogginnlegg |
| `redirects` | Per-kirke `fromPath → toPath`-par for SEO |
| `settings` | Nøkkelverdi kirkeinnstillinger; rader flagget `public` betjenes anonymt |

## Element-kontrakten

### Katalogen

`Packages/helpers/src/ElementTypes.ts` definerer hver element-type som en `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults` og en JSON-schema-stil `answersSchema`.

**35 typer leveres i dag:**

| Kategori | Element-typer |
|----------|---------------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

## Church-data-elementer

Tre element-typer gjengir live kirkedata i stedet for forfattet innhold:

| Element | Endepunkt | Notater |
|---------|-----------|--------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Returnerer `{ fundId, totalAmount, donationCount }` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Opt-in only**: gruppen må ha `publicRoster` satt |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Returnerer campus → service → time-treet |

## Blog

Bloggen er en frittstående innholdstype, ikke ett lag over bygger-sider. En `posts`-rad holder hele innlegget.

| Rute | Formål |
|------|--------|
| `GET /content/posts/public/:churchId` | Publiserte innlegg, filtrerbar etter `?category=&tag=` |
| `GET /content/posts/public/:churchId/slug/:slug` | Ett publisert innlegg |
| `GET /content/posts/rss/:churchId` | RSS 2.0 feed |

## AI-generering

Sidegenerering kjøres i **AskApi**, en separat tjeneste, under `/website`-kontrolleren.

| Endepunkt | Formål |
|-----------|--------|
| `POST /website/generateSite` | Hel-side-generering. To-fase: først planskisse, deretter full innhold |
| `POST /website/rewriteSection` | Struktur-bevarende omskriving |
| `POST /website/generateAltText` | Syn-anrop over opp til 20 bilde-URL-er |
| `POST /website/generateMetaDescription` | Ett SEO-meta-beskrivelse |

