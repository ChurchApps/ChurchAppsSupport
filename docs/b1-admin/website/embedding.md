---
title: "Embedding B1 on Your Own Website"
description: "Show your B1 giving form, a Stand Alone form, or a calendar inside a website you host elsewhere by listing that website and pasting an embed code."
---

# Embedding B1 on Your Own Website

<div class="article-intro">

If your church keeps its main website somewhere other than B1, you can still put three B1 pages inside it: your giving form, any Stand Alone form, and any calendar. Visitors give, fill in the form, or browse your events without leaving your website. You tell B1 which website is yours, copy a short piece of code, and paste it into a page.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Your website must load over `https`, and you need a way to paste HTML into it. Most website builders have an HTML, code, or embed block for this.
- You need the **Edit Content** permission to open the Website Pages screen and the calendar pages, and the **Edit Church Settings** permission to save the list of websites. See [Roles & Permissions](../settings/roles-permissions.md).
- Set up [online giving](../donations/online-giving-setup.md) before you embed the giving form.

</div>

## When to Use It

Use an embed when your church website is built with another tool and you want giving, a sign-up form, or your events calendar to appear on it as part of the page.

- If your website is a B1 website, you don't need this page. Add the **Donation**, **Form**, or **Calendar** element in the [page editor](./page-editor.md) instead.
- A plain link or QR code still works on any website. See [Sharing Your Giving Link](../donations/online-giving-setup.md#sharing-your-giving-link) and [Sharing a Form with a QR Code](../forms/creating-forms.md#sharing-a-form-with-a-qr-code).

## Step 1: List Your Website

B1 only lets the websites you list show your pages in a frame. Until your website is on the list, an embed stays blank there. This keeps other websites from putting your giving form inside their own pages.

1. In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), expand **Website**, and click **Pages**.
2. In the panel on the right, below the **Show Login** and **Disable Public Website** switches, find **Embed on your website**.
3. In **Websites allowed to embed your pages**, type your website's address, for example `yourchurch.org`. Put each website on its own line.
4. Click **Save**. The note *Saved. Embeds can take a minute to pick up the change.* confirms it.

What you can enter:

- **Just the domain.** If you paste a full address such as `https://www.yourchurch.org/give`, B1 keeps only `yourchurch.org`.
- **Subdomains are included.** Listing `yourchurch.org` also covers `www.yourchurch.org` and any other address that ends in `.yourchurch.org`.
- **Up to 10 websites.** Extra entries are listed under *Only 10 websites can be listed. Not saved:*.
- **Website addresses only.** Anything else, such as an IP address or a name with no dot in it, is listed under *Not a website address, so not saved:*.

To turn embedding off, empty the box and click **Save**.

:::info
The list belongs to your whole church, not to one site. If you have [more than one B1 website](./managing-pages.md#multiple-websites), you still keep a single list, and the embed code always points at your church's main B1 address.
:::

## Step 2: Copy the Embed Code

Each embed has its own code. Open it from the place that matches what you want to show:

| To embed | Where to find the code |
|---|---|
| Your giving form | On the **Website > Pages** screen, click **Giving form embed code** beside the **Embed on your website** heading |
| A form | Open the form from **Forms** and click **Embed code** on the left side of its page. Only Stand Alone forms that are not archived have it |
| A calendar | Open the calendar from **Calendars** and click **Embed code**, next to **Import .ics** and **Print** |

The **Embed code** dialog shows the code for that one item. Click **Copy** (the button changes to **Copied**), then **Close**.

If you have not listed a website yet, the dialog warns *Your website is not on the allowed list yet, so this embed will stay blank there.* Click **Add your website** to jump to the box from Step 1.

## Step 3: Paste It into Your Website

In your website's editor, add an HTML or embed block where the giving form, form, or calendar should appear, paste the code, and publish the page.

The code has two parts: an `<iframe>` that shows the B1 page, and a short `<script>` that resizes the frame to fit its content. Paste both, unchanged.

- If your website builder removes scripts, the embed still works. The frame keeps its starting height (900 pixels for giving, 800 for a form, 720 for a calendar) and scrolls when the content is taller.
- You can put more than one embed on the same page.

### Presetting the Giving Form

The giving form accepts the same options as a [giving link](../donations/online-giving-setup.md#links-with-a-preset-fund-and-amount). Add them to the end of the address in the code's `src`:

`https://yoursubdomain.b1.church/embed/donate?fundId=FUND_ID&amount=25&recurring=1`

`fundId` picks the fund, `amount` fills in the amount, and `recurring=1` opens the form on a recurring gift. Use any one of them or all three.

## What Each Embed Shows

Every embed uses your church's colors and fonts on a white background, with none of the rest of your B1 site around it: no header, footer, banner, or analytics. Embedded pages are not indexed by search engines.

Visitors are always treated as guests. An embed never signs anyone in and never shows a member's own information, even for someone who is signed in to your B1 site in the same browser. A link that leads out of the embed opens in a new tab, so your website stays on screen.

- **Giving form** -- The guest giving form, the same one a visitor who is not signed in sees at `/donate`. Saved payment methods and giving history stay on your B1 site.
- **Form** -- The form's name, header photo, description, and questions, followed by its thank-you message once it is submitted. [Availability dates](../forms/form-access.md) still apply. Embed **Public** forms: a **Restricted** form shows a login link instead of its questions, and that link opens your B1 site in a new tab.
- **Calendar** -- The calendar and its events. Clicking an event opens its details in a dialog inside the frame.

## If Your Public Website Is Disabled

Churches that turn on [Disable Public Website](./managing-pages.md#what-disabling-the-public-website-does) can still embed. Once at least one website is on your list, the giving form, form, and calendar embeds are served to visitors who are not signed in. Until then they are sent to the login screen like every other hidden page, and the embed stays blank.

## Troubleshooting

- **The frame is blank.** Your website is not on the list, or you added it less than a minute ago. Check the spelling in **Websites allowed to embed your pages** against the address in your browser's address bar, wait a minute, and reload. Also check that your page loads over `https`.
- **The frame is blank only in your website builder.** Some builders show pasted HTML inside a frame of their own, served from a different domain than your website. If the embed works on your published page but not in the builder, or not at all, try adding the domain the builder serves that frame from to your list as well.
- **The frame does not resize, or it has its own scrollbar.** Your website builder removed the script, so the frame is staying at its starting height. Use a block that allows scripts, or change the `height` number in the code to suit your page.
- **The frame is blank and your public website is disabled.** List at least one website. See [If Your Public Website Is Disabled](#if-your-public-website-is-disabled).
- **A form shows a login link.** The form is **Restricted**. Change **Form Access** to **Public** in the form's settings to let visitors fill it in from the embed.
- **There is no Embed code link on a form.** Only Stand Alone forms have one, and archived forms do not.

## Related Articles

- [Managing Pages](./managing-pages.md) -- The Website Pages screen, including the **Disable Public Website** switch
- [Online Giving Setup](../donations/online-giving-setup.md) -- Giving links, preset funds, and recurring gifts
- [Creating Forms](../forms/creating-forms.md) -- Building Stand Alone forms and sharing them
- [Curated Calendar](../calendars/curated-calendar.md) -- Other ways to share a calendar
