---
title: "Custom Domain"
---

# Custom Domain

<div class="article-intro">

Maaari mong ituro ang iyong sariling domain (halimbawa, **www.yourchurch.org**) sa iyong site ng B1 upang ang mga bumibisita ay maabot ito sa tunay na web address ng iyong simbahan sa halip na ang default na yourchurch.1.church address.

</div>

## Hakbang 1 — Idagdag Muna ang DNS Record

Bago magdagdag ng iyong domain sa B1, kailangan mong ituro ito sa mga server ng B1 sa iyong domain registrar (GoDaddy, Namecheap, Cloudflare, atbp.).

Magdagdag ng isa sa mga record na ito -- ang CNAME ay mas preferred:

| Type | Host | Value |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `yourchurch.org` | `3.23.251.61` |

Gamitin ang **CNAME** para sa iyong `www` address. Gamitin ang **A record** kung ang iyong registrar ay hindi sumusuporta sa CNAME sa isang root/apex domain (nang walang www), o kung nais mo na ang root domain ay gumana din.

Ang mga pagbabago sa DNS ay maaaring tumagal ng ilang minuto hanggang ilang oras upang magsimula.

## Hakbang 2 — Idagdag ang Domain sa B1

Kapag ang DNS ay namumuway sa B1:

1. Pumunta sa **Settings** sa B1 Admin.
2. I-click ang **Domains**.
3. I-type ang iyong domain sa larangan at i-click ang **Save**.

Ang B1 ay nag-handle ng SSL nang awtomatiko -- walang sertipikong pagbili na kinakailangan.

:::warning
Kung magdagdag ka ng domain sa B1 bago ang iyong mga DNS record ay naka-lugar, hindi ito magsasave. Laging i-setup muna ang DNS.
:::

## Pagsusuri Kung Ito Ay Gumagana

Pagkatapos mag-save, bumisita sa iyong domain sa isang browser. Kung ito ay nag-load ng iyong site ng B1, tapos ka na. Kung nakikita mo ang isang error, ang DNS ay maaaring patuloy na kumakalat -- maghintay ng ilang minuto at subukan muli.

Maaari mo ring suriin ang DNS propagation sa [dnschecker.org](https://dnschecker.org) -- hanapin ang iyong domain at tumingin para sa iyong CNAME o A record na lilitaw.
