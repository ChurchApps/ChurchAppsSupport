---
title: "Custom Domain"
---

# Custom Domain

<div class="article-intro">

Maaari mong ituro ang sarili mong domain (halimbawa, **www.yourchurch.org**) sa iyong B1 site para makarating ang mga bisita sa tunay na web address ng iyong simbahan sa halip na sa default na yourchurch.b1.church.

</div>

## Hakbang 1 — Idagdag Muna ang DNS Record

Bago idagdag ang iyong domain sa B1, kailangan mo itong ituro sa mga server ng B1 sa iyong domain registrar (GoDaddy, Namecheap, Cloudflare, atbp.).

Magdagdag ng isa sa mga record na ito — mas gusto ang CNAME:

| Type | Host | Value |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `yourchurch.org` | `3.23.251.61` |

Gamitin ang **CNAME** para sa iyong `www` address. Gamitin ang **A record** kung hindi sinusuportahan ng iyong registrar ang CNAME sa root/apex domain (walang www), o kung gusto mong gumana rin ang root domain.

Maaaring tumagal ng ilang minuto hanggang ilang oras bago magkabisa ang mga pagbabago sa DNS.

## Hakbang 2 — Idagdag ang Domain sa B1

Kapag nakaturo na ang DNS sa B1:

1. Pumunta sa **Settings** sa B1 Admin.
2. I-click ang **Domains** sa listahang nasa kaliwa, pagkatapos i-click ang **Edit** sa seksyong **Domains**.
3. I-type ang iyong domain sa field at i-click ang **Save**.

Hindi mo kailangang i-click muna ang **+** na button -- ang domain na naiwan sa field ay idadagdag kapag nag-save ka. Gamitin ang **+** (o pindutin ang **Enter**) kapag gusto mong magdagdag ng ilang domain sa listahan bago mag-save.

Awtomatikong hinahawakan ng B1 ang SSL — walang kailangang bilhing certificate.

:::warning
Kung idaragdag mo ang domain sa B1 bago pa nakalagay ang mga DNS record, hindi ito mase-save. Laging i-set up muna ang DNS.
:::

## Pagsuri Kung Gumagana

Pagkatapos mag-save, bisitahin ang iyong domain sa browser. Kung nag-load ang iyong B1 site, tapos ka na. Kung may makita kang error, maaaring nagpapalaganap pa ang DNS -- maghintay ng ilang minuto at subukan ulit.

Maaari mo ring suriin ang propagation ng DNS sa [dnschecker.org](https://dnschecker.org) -- hanapin ang iyong domain at tingnan kung lumalabas ang iyong CNAME o A record.
