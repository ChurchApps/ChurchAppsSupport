---
title: "Sakhiwo Sesakhi Sewebhusayithi"
---

# Sakhiwo Sesakhi Sewebhusayithi

<div class="article-intro">

Wonkhe umsango webandla lohanjiswa yi-B1App wentiwa kusuka esihlahleni selwati -- emakhasi, tigaba, tincenye -- lesigcinwa ku-ContentApi futsi silungiswe ngekubukwa ku-B1Admin. Incwadi yentcenye letabelwanako yinye ihlanganisa nembukiso wesilungisi kanye nemsango losetjentiswako, luhlu lunye lwetinhlobo tetincenye luchaza loko lokungavela ekhasini, futsi kusetjentiswa insita yehlukene ye-AI kwakha nome kubhala kabusha lesihlahla. Leli khasi lenta imephu yesakhiwo sonkhe: sivumelwano setincenye ku-`@churchapps/helpers`, luketjani lwekubonakalisa, tincenye telwati lwebandla, tintfo letisebentako esayithini yonkhe, sendlalelo sebhulogi, emakhasi lavikelekile ngekungena, i-SEO, kwakha nge-AI, kanye nemafomu enkulumo-mphendvulwano.

</div>

## Sifingqo

```
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  B1Admin — editor            │             │  Api — /content module (ContentApi)     │
│  ContentEditor · SectionEdit │  POST /…    │                                         │
│  ElementEdit · PageLinkEdit  │ ──────────▶ │  pages ─ sections ─ elements   blocks   │
│  SiteWidgetsEdit · Blog      │             │  posts   redirects   settings   styles  │
└──────────┬───────────────────┘             └───────────────┬─────────────────────────┘
           │                                                 │ GET /content/pages/:churchId/tree?url=…
           │        shared render pipeline                   ▼            (anon, JWT honored)
           │   ┌───────────────────────────────┐   ┌─────────────────────────────────┐
           └──▶│  @churchapps/helpers          │◀──│  B1App — public site (Next.js)  │
               │    ElementTypes.ts (catalog)  │   │  Zone → Section → Element       │
               │  @churchapps/apphelper        │   │  + widgets, JSON-LD, sitemap,   │
               │    ElementRegistry, renderers │   │    redirects, branded 404       │
               │    SectionDivider, widgets    │   └───────────────┬─────────────────┘
               └───────────────────────────────┘                   │ church-data elements
┌──────────────────────────────┐                                   ▼
│  AskApi — /website/* (AI)    │             ┌─────────────────────────────────────────┐
│  generateSite · rewriteSection│            │  /giving/funds/public/…/total           │
│  generateAltText · metaDesc  │             │  /membership/groupmembers/public/…      │
│  returns JSON; B1Admin saves │             │  /attendance/servicetimes/public/…      │
└──────────────────────────────┘             └─────────────────────────────────────────┘
```

Imitsetfo lemitsatfu ime endlwini yonkhe:

1. **Sihlahla sinye, tibonakalisi letimbili.** Likhasi sihlahla se-`pages → sections → elements` lapho ngulunye nalunye luphatsa tilungiselelo talo njenge-`answers` JSON blob. Tincenye letifananako te-apphelper tibonakalisa silungisi se-drag-and-drop ku-B1Admin kanye nesayithi lesibonakaliswa yi-server ku-B1App -- akukho "fomati yekushicilela" lehlukile.
2. **Sivumelwano sihlala ku-`@churchapps/helpers`.** I-`ElementTypes.ts` lulu lolulodvwa lwetinhlobo tetincenye; tibonakalisi tifinyelela ngendlela ye-registry ku-apphelper; emafomu esilungisi ahlala ku-B1Admin. Kwengeta luhlobo lwencenye kusho kutsintsa tonkhe letintsatfu, ngalobuya buhlangana.
3. **Isayithi yalomphakathi ifundza ema-endpoint langakhethi.** Konkhe lokudzingwa yi-B1App -- sihlahla samakhasi, tilungiselelo, imibhalo yebhulogi, kucondziswa kabusha, kanye nema-endpoint elwati lwebandla akuletinye tema-module -- akhethi. Kutivela akuphocelekile: i-JWT ku-endpoint yesihlahla lengakhethi ivula emakhasi ekuphela emalunga, akukho lokunye lokushintjako.

## Sihlahla Selwati

I-content module (`Api/src/modules/content`) yiyona ephatse lwati lwesakhi:

| Lithebula | Umsebenti |
|-------|------|
| `pages` | Likhasi linye ngayinye ye-URL: `url`, `title`, `layout`, kanye ne-`visibility`/`groupIds` (kuvikela kungena) kanye ne-`metaDescription` (SEO) |
| `sections` | Tigaba letitikhandlekile ekhasini (nome ku-block): umbala wangemuva, umbala wembhalo, kanye ne-`answersJSON` lephatsa buhle kanye netilungiselelo te-`dividerTop`/`dividerBottom` shape-divider |
| `elements` | Tincenye telwati ngekhatsi kwesigaba: `elementType` + `answersJSON`, letingafakwa ngekhatsi kwaletinye ngetinhlobo tekuhleleka (row/column, carousel) |
| `blocks` | Emacembu ekusetjentiswa kabusha esigaba/tincenye labelwana ngawo emakhasini onkhe |
| `posts` | Lwati lwebhulogi lolungetulu kwelikhasi lelijwayelekile (bona [Bhulogi](#bhulogi-imibhalo-ngetulu-kwemakhasi)) |
| `redirects` | Emabhaha e-`fromPath → toPath` ngebandla ngalinye, avinjelwe ku-200 (bona [SEO](#seo-nekutfolakala)) |
| `settings` | Tilungiselelo tebandla te-key-value; imigca lehlonyulwe `public` ihanjiswa ngaphandle kwekukhetsa futsi iphatsa kulungiselelwa kwe-widget/analytics |

Sihlahla sonkhe se-URL yinye sibuya nesicelo sinye lesingakhethi -- `GET /content/pages/:churchId/tree?url=/about` -- lokuyilo B1App leyibonakalisa ku-server kusuka kuko. Ticelo tesilungisi tifundza nge-id kunaloko futsi tigcina ema-id angekhatsi.

## Sivumelwano Sencenye

### Luhlu (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` ichaza luhlobo lwencenye ngalunye njenge-`ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults`, kanye ne-`answersSchema` lefana ne-JSON-schema yemiphendvulo yayo. I-`validateElementAnswers()` ayicinile ngabomo -- tinhlobo letingatiwa kanye nemakhiya lengetiwe ayadlula, ngako-ke lwati lwakadze aluze lwephuke nawukhushulwa luhlu. **Tinhlobo letingu-35 tisebenta nyalo:**

| Sigaba | Tinhlobo tencenye |
|----------|---------------|
| kuhleleka (6) | row, column, box, carousel, whiteSpace, block |
| lwati (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| midiya (4) | image, gallery, video, map |
| bandla (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| lokuphakeme (2) | rawHTML, iframe |

Incenye ye-`sermons` ngiyo lenetilungiselelo letinyenti kunato tonkhe tetinhlobo tebandla: umphendvulo we-`layout` ukhetsa `browse` (sibonakalisi lesidzala lesigcwele), `grid`, `list`, nome `featuredLatest`, ngeku-`playlistId`, `itemCount`, `showTitles`, ne-`showDates` letihlobisa loko lokungasiko browse.

### Tibonakalisi (`@churchapps/apphelper`)

Tibonakalisi tihlala ku-`Packages/apphelper/src/website/components/elementTypes/`, incenye yinye ngaluhlobo, tifinyelela ngendlela ye-`ElementRegistry.ts` -- imephu yemazinga lamabili lapho `Element.tsx` ibhalisa sibonakalisi lesijwayelekile setinhlobo totsi tema-35 (`registerDefaultElementRenderer`) kantsi i-app lesamukelako ingashintja nome nguyiphi kuto ngesikhatsi lesisebentako (`registerElementRenderer`) ngaphandle kwekufoka iphakheji.

### Emafomu Esilungisi (B1Admin)

Emafomu etilungiselelo taluhlobo ngaluhlobo esilungisi ahlala ku-`B1Admin/src/site/admin/elements/` -- `ElementEdit.tsx` idlulisela kuncenye lehlukanisiwe (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) nome sakhi sensimu sangekhatsi ngaluhlobo. Sibonakaliso se-AI selolu luhlu yithulusi le-MCP ye-API le-`describe_page_builder` (bona [Server ye-MCP](../api/mcp)).

### Tihlukanisi Tesigaba Tesimo

Tigaba tingaba nesihlukanisi lesihle sesimo emaceleni omabili. Kulungiselelwa kuhlala ku-`answersJSON` yesigaba njengetintfo te-`dividerTop` / `dividerBottom` -- `{ shape, color, height, flip }` na-`shape` lulodvwa kuto letinhlobo `wave, waves, slant, curve, triangle, peaks`. I-apphelper ihlinzeka ngencenye ye-`SectionDivider` kanye nethulusi le-`parseDividerConfig()`; tibonakalisi te-Section te-app tombili (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) tifundza imiphendvulo futsi tifake sihlukanisi, kantsi `SectionEdit.tsx` ku-B1Admin ihlinzeka ngesento sekukhetsa. Emaphakheji ahlinzeka kuphela ngesitini sekwakha -- kuhlanganiswa endzaweni yesigaba ngumsebenti wema-app lasebentisako.

## Tincenye Telwati Lwebandla

Tinhlobo letintsatfu tetincenye tibonakalisa lwati lwebandla loluphila kunekutsi tibhalwe nguwe. Kwehlukaniswa kwema-module kusasebenta -- ngayinye itfumela ku-endpoint yayo lengakhethi lekhona endzaweni yayo kusuka ku-browser:

| Incenye | Endpoint | Luphawu |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Ibuyisa `{ fundId, totalAmount, donationCount }`, sikhala lesingakhetfwa se-`?startDate=&endDate=`; incenye ikucatsanisa lokhu ne-`goalAmount` yayo |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Kukhetsa kuphela**: licembu kufanele libe ne-`publicRoster` ihlonyuliwe (icimile ngekwendlulo). Loku lokuboniswako kwehlukaniswe ngabomo -- `personId`, `displayName`, `leader`, sitfombe -- akukho lwati lwekutfola nome lwesibalo |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Ibuyisa sihlahla se-campus → service → sikhatsi; sibonakalisi se-apphelper sikhipha i-schema.org `Event` JSON-LD kusuka kuso ngekwenta konkhe lokungakhona (i-API ibuyisa lwati lolujwayelekile) |

:::warning
`publicRoster` yisivimbo sebumfihlo sa-`staffGrid`. Ungakaze wandzise loko lokuboniswako kwemalunga elicembu langakhethi nome udlule luphawu -- endpoint ye-roster ayikhethi ngabomo futsi luhlu lweminsimu lolumncane yisici sekuphepha.
:::

## Tintfo Letisebentako Esayithini Yonkhe

Tintfo letimbili tibonakala kuwo onkhe emakhasi langakhethi kunekutsi tibe ngekhatsi kwesihlahla: **AnnouncementBanner** (bha lengetulu kwelikhasi leyingavalwa) kanye ne-**Launcher** (sikhungo sesento sentungetayo se-give/visit/watch). Tincenye tombili kanye nethulusi tato te-`parse*Config()` tihlala ku-apphelper. Kulungiselelwa kwemigca yembili ye-settings lengakhethi -- emakhiya `announcementBanner` na-`launcher` -- lebhalwe yi-`SiteWidgetsEdit` ye-B1Admin (ekhasini le-Appearance) futsi ifundzwa yindlela yekubukwa lengakhethi ye-B1App nge-`GET /content/settings/public/:churchId`. I-API ibona loku njengemapheya wemakhiya-lelinani langakacaci; emagama emakhiya sivumelwano emkatsi wema-app womabili.

## Bhulogi: Imibhalo Ngetulu Kwemakhasi

Ibhulogi luketjani lolumncane lwelwati, hhayi luhlelo lwesibili lwelwati. Umgca we-`posts` (`title`, `slug`, `excerpt`, `authorId`, `photoUrl`, `publishDate`, `category`, `tags`) ukhomba likhasi lesakhi lelijwayelekile nge-`pageId`; likhasi liphatsa umtimba futsi lilungiswa esilungisini lesijwayelekile lesamakhasi. Indlela lengakhethi yalomphakathi (yonkhe akhethi, `PostController`):

| Indlela | Injongo |
|-------|---------|
| `GET /content/posts/public/:churchId` | Imibhalo leshicilelwe, ehlungwa nge-`?category=&tag=`, ehlukanise ngemakhasi |
| `GET /content/posts/public/:churchId/slug/:slug` | Lwati lombhalo munye |
| `GET /content/posts/rss/:churchId?siteUrl=` | I-feed ye-RSS 2.0 |

Umbhalo "ushicilelwe" nawe-`publishDate` seyihlonyuliwe futsi seyidlulile. B1App ihlinzeka `/{sdSlug}/blog` (luhlu, nge-feed ye-RSS letjengiswa njengelinye linki) kanye ne-`/{sdSlug}/blog/[postSlug]`, lekhipha sihlahla selikhasi lelisemuva ku-`/blog/{slug}` futsi sisibonakalise ngendlela lefanako ye-Zone/Section leyisetjentiswa nakuliphi lelinye likhasi, lengete i-`BlogPosting` JSON-LD. Ema-URL ebhulogi afakwe ku-sitemap yebandla ngalinye. Sento sekubhala se-B1Admin (**Site → Blog**) sakha likhasi lelisemuva ku-`/blog/{slug}` kanye nemgca we-`posts` ndzawonye.

## Emakhasi Ekuphela Emalunga

`pages.visibility` isebentisa lulu lolufananako lwemalinki ekuya -- `everyone` (yendlalelwe), `visitors`, `members`, `staff`, `team`, `groups` (nge-`groupIds`) -- kepha njenge-**sivimbo lesicinile sekungena**, hhayi sihlungi selwati sekuya (`PageVisibilityHelper.canViewPage`). Luketjani:

1. I-endpoint yesihlahla lengakhethi ihlola kuboneka kutsatelwa emakhasi laficwa nge-URL. Bafiki labangakhethi belikhasi lelivinjelwe batfola `{ restricted: true, visibility }` esikhundleni selwati -- sihlahla asikaze sivute.
2. I-endpoint ihlala ihlonipha i-JWT: `CustomAuthProvider` ihlola sihloko se-`Authorization` ku*noma yisiphi* sicelo, kufaka ekhatsi tindlela letingakhethi, ngako-ke kufica kwelilunga lelitiwelwe kwaleyo URL kuyaphumelela ngendlela lejwayelekile.
3. B1App ibonakalisa `RestrictedPage` nakukhona sicelo se-`restricted`: ikhipha luhlaka kusuka ekuciniseni lokugciniwe, iphindze ifundze sihlahla nge-JWT, futsi isibonakalise -- nome ikhombise sivimbo sekungena nge-`returnUrl` nangabe kute luhlaka.

:::info
Kubanjwa kwesivimbo kuyehluka ngezinga: `groups` ihlola `groupIds` ye-token kumelene noluhlu lwelikhasi kantsi `staff` ihlola `membershipStatus`, kepha `members` na-`team` kwamanje kuvumela nome ngubani lotivelile webandla. Bona `groups` njengekhetso lesicinile.
:::

## SEO Nekutfolakala

Konkhe loku kubonakaliswa ngu-B1App phezu kwelwati lwe-ContentApi -- i-API igcina, i-app ikhipha:

| Sici | Indlela lokusebenta ngayo |
|---------|--------------|
| Tichasiso te-Meta | `pages.metaDescription` (≤300 tinhlamvu) ihamba ngendlela ye-`MetaHelper.getMetaData()` iye ku-`Metadata` ye-Next.js (sichasiso + Open Graph) kunoma yiliphi likhasi lelibonakaliswe sisakhi. Tilungiselelo temakhasi te-B1Admin tinenkinobho ye-AI "Generate" (bona ngentasi) |
| Kucondzisa kabusha | Imigca ye-`redirects` yebandla ngalinye ilawulwa ku-`/content/redirects` (`content.edit`, sivimbo semigca lengu-200, tindlela letilungiswe). Naku-404 lekungenzeka, indlela yelikhasi ye-B1App icondzisa indlela kumelene ne-`GET /content/redirects/public/:churchId` futsi ikhipha i-HTTP 308 nge-`permanentRedirect` ye-Next; tindlela letingafanani tidzimate ku-`notFound()` |
| 404 lenemake yebandla | `not-found.tsx` ibonakalisa `BrandedNotFound` ngelogo yebandla, ligama, kanye netema esikhundleni sesiphosiso lesijwayelekile |
| Lwati lolwakhiwe | `BlogPosting` JSON-LD emibhalweni yebhulogi; `VideoObject` emakhasini ngaluntjumo (`/{sdSlug}/sermons/[sermonId]`) nasemakhasini lanencenye ye-`sermons`; `Event` kusuka etincenyeni tekhalenda/emicimbi emakhasini esakhi; schema.org `Event` kusuka encenyeni ye-`serviceTimes` |
| Emakhasi entjumo | Yonkhe intjumo yalomphakathi itfola likhasi lelibonakalako lengasetjentiswa yi-search engine ku-`/sermons/[sermonId]` nga-metadata lephelele -- tintjumo atisavalelwa ngekhatsi kwencenye ye-browser ye-client |
| Kuhlaziya | Ikhiya letilungiselelo langakhethi le-`ga4MeasurementId` (lilawulwa eceleni kwekucondzisa kabusha ku-B1Admin) ifaka i-gtag ye-GA4 yebandla ngalinye nge-`next/script` |
| Sitemap netifeed | Indlela ye-`sitemap.xml` yebandla ngalinye ihlanganisa emakhasi esakhi nema-URL ebhulogi; luhlu lwebhulogi lukhangisa i-feed ye-RSS |
| Kutfolakala | Umbukiso wangalomphakathi ubonakalisa linki lekweqa lelicondzise ku-landmark ye-`<main id="main-content">` kuso sonkhe sigqoko sekwakha |

## Kwakha Nge-AI (AskApi)

Kwakha likhasi nesayithi kusebenta ku-**AskApi**, insita lehlukene, ngaphasi kwe-controller ye-`/website`. Itivela nge-JWT lefanako ye-`CustomAuthProvider` njengakho konkhe lokunye futsi **ayigcini lwati**: yonkhe endpoint ibuyisa JSON kantsi lofakako (B1Admin) ugcina umphumela ngendlela ye-ContentApi (`POST /content/pages/temp/ai` igcina licembu lelakhiwe le-page-sections-elements ngesicelo sinye).

:::info
Kusukela nga-2026-07-03, tindzawo tekungena te-B1Admin kulomshini -- template ye-"AI" yesayithi ku-`AddPageModal`, inkinobho yekubhala kabusha ye-`SectionToolbar`, kanye nenkinobho ye-"Generate Site" eluhlwini lwemakhasi -- tikhomishwe (commented out) ecaleni le-client ngesikhatsi sento sisakhiwa kabusha. Ema-endpoint e-AskApi langentasi awatsintsiwe futsi asaphendvula; ngumbukiso we-B1Admin kuphela loficikile.
:::

| Endpoint | Injongo |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Luketjani lwekucala lwemabanga lamabili elikhasi: sishwatelo kucala, bese sicelo sinye ngesigaba ngasinye. Template ye-"AI" yelikhasi ye-B1Admin ku-`AddPageModal` icondzisa loku -- sishwatelo, bese kwakhiwa tigaba ndzawonye, bese kubukwa embikweni |
| `POST /website/generateSite` | Kwakha sayithi sonkhe. **Kwakhiwe ngemabanga lamabili ngabomo**: sicelo se-`planOnly: true` sibuyisa kuphela sishwatelo semakhasi lamanyenti (sicelo sinye lesisheshako semodeli), bese client icela lwati loluphelele -- kugcinisa sicelo ngasinye ngekhatsi kwesikhatsi se-Lambda/API-Gateway |
| `POST /website/rewriteSection` | Kubhalwa kabusha lokugcina sakhiwo: imodeli ingashintja kuphela miphendvulo lene mbhalo. Luphawu lwesakhiwo lolutentekayo (ema-id + tinhlobo + luhlu) lucatjaniswa ngembi nangemuva; nome ngabe yikuphi kungahambisani kubuyisa sigaba sasekucaleni nge-`fallback: true` esikhundleni sesakhiwo lesonakele |
| `POST /website/generateAltText` | Sicelo se-vision phezu kwema-URL emafotfo langadlula ku-20; ibuyisa mbhalo lomfishane wa-alt (≤125 tinhlamvu, "photo of" ikhishwa ekucaleni) |
| `POST /website/generateMetaDescription` | Sichasiso sinye se-SEO meta (≤155 tinhlamvu) kusuka embhalweni welikhasi -- kuhlanganiswe nenkinobho ye-Generate etilungiselelweni temakhasi te-B1Admin |

Ema-prompt yimafayela e-markdown ngaphasi kwe-`AskApi/config/instructions/`, kufaka luhlu lwetincenye lesetjentiswa nguemodeli kwakha kuko. Tici letimbili tekwakha tigcina luhlu lutsembekile: i-client itfumela `availableElementTypes` kuso sonkhe sicelo (i-prompt ingasebentisa kuphela tinhlobo letisebenta kulolu luhlu -- i-server ayikaze ibhale luhlu lolugcwele ngekwayo), kanye nethulusi le-MCP ye-API `describe_page_builder` liphatsa luchazelo lolufanako lwema-AI agent lasebenta ngendlela ye-[MCP](../api/mcp). Emamodeli ngu-Anthropic Claude ngendlela ye-OpenRouter -- 3.5 Haiku yelwati lwesigaba (kusheshisa), 3.5 Sonnet yetishwatelo, tinhlelo tesayithi, ne-vision -- nge-OpenAI njengekusekela nangabe kute khiya le-OpenRouter lelungiselelwe.

## Emafomu Enkulumo-Mphendvulwano

Emafomu (i-module ye-membership) atfole indlela yenkulumo-mphendvulwano lecondzise emakhasini afana ne-connect-card. Tinsimu letine ku-`forms` tiyacondzisa: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, `followUpBody`.

- **Kubonakaliswa** -- `FormSubmissionEdit` ye-apphelper ishintjela encenyeni ye-`ConversationalForm` (umbuto munye ngesikhatsi) nangabe `displayMode` ingu-`conversational`; likhasi lefomu le-B1App lidlulisela lomo. Lokutfunyelwe kufanako nome ngayiphi indlela.
- **Kwakhiwa kabusha komuntfu** -- ekufakweni nge-`autoCreatePerson` ihlonyuliwe, `ConversationalFormHelper.findOrCreatePerson` ivimba kuphindzaphindza nge-imeyili (ingakhatsateli tinhlamvu letikhulu/letincane) futsi kungenjalo yakha likhaya + umuntfu nge-`membershipStatus: "Guest"`, bese ihlanganisa lokufakiwe naloyomuntfu.
- **Imeyili yekulandzelela** -- nangabe sihloko nemtimba kuhlonyuliwe, lofakile utfola imeyili yetemplate (nge-`{firstName}` / `{churchName}` emathokheni) ngendlela lesetjentiswako sekutfunyelwa (`TransactionalEmailHelper`), hhayi indlela yesikhumbuto lesihlanganisiwe. Tiphumela tombili atibucayi: kwehluleka akulahlekisi lokufakiwe.

Letinsimu letine tihlonyulwa nge-API nyalo; silungisi sefomu se-B1Admin asikativeti.

## Emakhasi Lahambelanako

- [Kucondzisa Kwewebhusayithi Ne-Multi-Site](./websites) -- indlela sicelo lesifika kubandla/sayithi kucondziswa ngayo kanye nendlela ema-domain langakini acondzisa ngayo
- [Ema-Endpoint E-Content](../api/endpoints/content) -- indzawo yonkhe ye-REST yemakhasi, tigaba, tincenye, ema-block, imibhalo, kucondzisa kabusha, kanye netilungiselelo
- [AppHelper](../shared-libraries/app-helper) -- iphakheji ye-npm lehlinzeka ngetibonakalisi, i-registry, tihlukanisi, kanye netintfo letisebentako
- [Server ye-MCP](../api/mcp) -- kufaka ekhatsi lithulusi le-`describe_page_builder`
- [Silungisi Selikhasi (umsebentisi wekugcina)](/docs/b1-admin/website/page-editor) -- imibhalo yesilungisi lebhekene netisebenti
