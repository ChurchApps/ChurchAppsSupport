---
title: "Custom Domain"
---

# Custom Domain

<div class="article-intro">

You can point your own domain (for example, **www.yourchurch.org**) to your B1 site so visitors reach it at your church's real web address instead of the default yourchurch.1.church address.

</div>

## Step 1 — Add the DNS Record First

Before adding your domain in B1, you need to point it to B1's servers at your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.).

Add one of these records — CNAME is preferred:

| Type | Host | Value |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `yourchurch.org` | `3.23.251.61` |

Use the **CNAME** for your `www` address. Use the **A record** if your registrar doesn't support CNAME on a root/apex domain (without www), or if you want the root domain to work as well.

DNS changes can take a few minutes to a few hours to take effect.

## Step 2 — Add the Domain in B1

Once DNS is pointing to B1:

1. Go to **Settings** in B1 Admin.
2. Click **Domains**.
3. Type your domain in the field and click **Save**.

B1 handles SSL automatically — no certificate purchase needed.

:::warning
If you add the domain in B1 before your DNS records are in place, it will not save. Always set up DNS first.
:::

## Checking If It's Working

After saving, visit your domain in a browser. If it loads your B1 site, you're done. If you see an error, DNS may still be propagating — wait a few minutes and try again.

You can also check DNS propagation at [dnschecker.org](https://dnschecker.org) — search for your domain and look for your CNAME or A record showing up.
