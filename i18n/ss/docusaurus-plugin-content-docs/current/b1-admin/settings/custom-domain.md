---
title: "Custom Domain"
description: "Chumba idomeyini yakho, njenge-www.yourchurch.org, ku-webhusayithi yakho ye-B1 ku-B1 Admin ngekusetela ema-DNS records nekungeta idomeyini kuTilungiselelo."
---

# Custom Domain

<div class="article-intro">

Unaweza kuelekeza domeni yako (kwa mfano, **`www.yourchurch.org`**) kwenye tovuti yako ya B1 ili wageni wafike kwenye anwani halisi ya kanisa lako badala ya anwani ya msingi ya yourchurch.b1.church.

</div>

## Training Video

<YouTube id="L5yaDusHts8" title="Ukuntjintjwa kwedomeyini lekhethekile ku-B1" next="Setting Up Live Streaming in B1" nextUrl="/docs/b1-admin/sermons/live-streaming" />

## Step 1 — Engeza Irekhodi ye-DNS Kuqala

Ngaphambi kokungeza domeni yakho ku-B1, kufanele uyikhombise kumaseva e-B1 kumhlinzeki wakho wedomeni (GoDaddy, Namecheap, Cloudflare, njll.).

Engezaelinye lalawa marekhodi — i-CNAME yiyo leyikhetfwa kakhulu:

| Type | Host | Value |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `yourchurch.org` | `3.23.251.61` |

Sebenta i-**CNAME** ye-anwani yakho ye-`www`. Sebenta irekhodi ye-**A** uma umhlinzeki wakho wedomeni angayisekeli i-CNAME kudomeni yemsuka (ngaphandle kwe-www), noma uma ufuna nedomeni yemsuka isebente.

Tinguquko te-DNS zingatsatsa emaminithi ambalwa kuya emahoreni ambalwa kuze zisebente.

## Step 2 — Engeza Domeni ku-B1

Nakuba i-DNS isikhombise ku-B1:

1. Ya ku **Settings** ku-B1 Admin.
2. Chofoza **Domains** kuluhlu lwesandla sekhoya, bese uchofoza **Edit** esigabeni se-**Domains**.
3. Bhala domeni yakho endzaweni bese uchofoza **Save**.

Akudingeki uchofoze inkinobho ye-**+** kuqala -- domeni lesele endzaweni ilengeniswa nawugcina. Sebentisa **+** (noma ucindzetele **Enter**) uma ufuna kungeta tidomeni letinyenti ohlwini ngaphambi kokugcina.

I-B1 ilawula i-SSL ngekutsi kungadzingeki kutsenga sitifiketi.

:::warning
Uma wengeta domeni ku-B1 ngaphambi kokuba emarekhodi e-DNS asendzaweni, ngeke itfole kugcinwa. Hlala usetha i-DNS kuqala.
:::

## Checking If It's Working

Nawugcina, vakasha domeni yakho ku-browser. Uma i-B1 yakho ivela, usuphelile. Uma ubona liphutsa, i-DNS ingase isenkhulumana -- linda emaminithini ambalwa uphinde uzame futsi.

Ungaphindze uhlole kutfutfukiswa kwe-DNS ku-[dnschecker.org](https://dnschecker.org) — funa domeni yakho ubone uma irekhodi lakho le-CNAME noma le-A livela.
