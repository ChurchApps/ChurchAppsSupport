---
title: "Custom Domain"
---

# Custom Domain

<div class="article-intro">

Maaari mong ituro ang sarili mong domain (halimbawa, **www.yourchurch.org**) sa iyong B1 site para marating ito ng mga bisita sa tunay na web address ng iyong simbahan sa halip na sa default na yourchurch.1.church.

</div>

## Hakbang 1 — Idagdag Muna ang DNS Record

Bago idagdag ang iyong domain sa B1, kailangan mo munang ituro ito sa mga server ng B1 sa iyong domain registrar (GoDaddy, Namecheap, Cloudflare, atbp.).

Magdagdag ng isa sa mga record na ito — mas mainam ang CNAME:

| Uri | Host | Value |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `yourchurch.org` | `3.23.251.61` |

Gamitin ang **CNAME** para sa iyong `www` address. Gamitin ang **A record** kung hindi sinusuportahan ng iyong registrar ang CNAME sa root/apex domain (walang www), o kung gusto mong gumana rin ang root domain.

Maaaring abutin ng ilang minuto hanggang ilang oras bago magkabisa ang mga pagbabago sa DNS.

## Hakbang 2 — Idagdag ang Domain sa B1

Kapag nakaturo na ang DNS sa B1:

1. Pumunta sa **Settings** sa B1 Admin.
2. I-click ang **Domains**.
3. I-type ang iyong domain sa field at i-click ang **Save**.

Hindi mo kailangang i-click muna ang button na **+** -- ang domain na naiwang naka-type sa field ay idinaragdag kapag nag-save ka. Gamitin ang **+** (o pindutin ang **Enter**) kapag gusto mong magdagdag ng ilang domain sa listahan bago mag-save.

Awtomatikong inaasikaso ng B1 ang SSL — hindi mo kailangang bumili ng certificate.

:::warning
Kung idinagdag mo ang domain sa B1 bago pa nakalagay ang iyong mga DNS record, hindi ito masisave. Laging i-set up muna ang DNS.
:::

## Pagsuri Kung Gumagana Na

Pagkatapos mag-save, bisitahin ang iyong domain sa browser. Kung nag-load ang iyong B1 site, tapos ka na. Kung may lumabas na error, maaaring kumakalat pa ang DNS — maghintay ng ilang minuto at subukan ulit.

Maaari mo ring tingnan ang DNS propagation sa [dnschecker.org](https://dnschecker.org) — hanapin ang iyong domain at tingnan kung lumalabas na ang iyong CNAME o A record.
