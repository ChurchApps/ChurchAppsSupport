---
title: "Custom Domain"
description: "Point your own domain, like www.yourchurch.org, at your B1 site in B1 Admin by setting up DNS records and adding the domain in Settings."
---

# Custom Domain

<div class="article-intro">

You can point your own domain (for example, **`www.yourchurch.org`**) to your B1 site so visitors reach it at your church's real web address instead of the default yourchurch.b1.church address.

</div>

## Training Video

<YouTube id="L5yaDusHts8" title="Connecting a Custom Domain in B1" next="Setting Up Live Streaming in B1" nextUrl="/docs/b1-admin/sermons/live-streaming" />

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
2. Click **Domains** in the left-hand list, then click **Edit** in the **Domains** section.
3. Type your domain in the field and click **Save**.

You don't need to click the **+** button first -- a domain left typed in the field is added when you save. Use **+** (or press **Enter**) when you want to add several domains to the list before saving. Enter just the domain, such as `www.yourchurch.org` -- not `https://` or a page path.

If your church has more than one website, each domain also gets a **Website** dropdown. Leave it on **Main Website**, or pick the site that domain should open.

To remove a domain, click the delete icon on its row and click **Save**.

B1 handles SSL automatically — no certificate purchase needed.

:::warning
B1 saves the domain even if your DNS records aren't in place yet, but the domain won't load your site, and B1 can't issue its SSL certificate, until DNS points to B1. Set up DNS first. A domain that another church already uses can't be added.
:::

## Checking If It's Working

After saving, visit your domain in a browser. If it loads your B1 site, you're done. If you see an error, DNS may still be propagating — wait a few minutes and try again.

You can also check DNS propagation at [dnschecker.org](https://dnschecker.org) — search for your domain and look for your CNAME or A record showing up.
