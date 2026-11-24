---
title: "Appearance"
description: "Set colors, fonts, spacing, logo, and navigation for your church website in B1 Admin, plus widgets, GA4 analytics, redirects, and custom CSS."
---

# Appearance

<div class="article-intro">

The Appearance page lets you customize the overall look and feel of your church website. From colors and fonts to spacing and custom CSS, you can control every visual aspect of your site from one place.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Complete the [Initial Setup](./initial-setup.md) for your website
- Have your church logo ready in PNG format with a transparent background and a 4:1 aspect ratio
- Know your church's brand colors (hex values) if you have an existing style guide

</div>

## Accessing Appearance Settings

1. In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left) and expand **Website**.
2. Click **Appearance**.
3. The **Site Styles** page loads. The **Theme, fonts & footer** card shows the **Style Settings** list on the left and a preview of a sample site on the right. As the page says, this is a sample site with your colors, fonts, and logos, not your actual content; it also applies your custom CSS so you can check its effect. Below it are the **Announcement & widgets** and **Redirects & analytics** cards.

If your church has more than one website, use the site switcher in the header to pick which site's styles you are editing. See [Appearance and Multiple Websites](#appearance-and-multiple-websites).

## Color Palette {#color-palette}

1. Click **Color Palette** in the Style Settings panel.
2. Under **Color Values** you will see the five **Base Colors** -- **Light** (lightest shade, for section backgrounds), **Light Accent** (soft accent for subtle backgrounds), **Accent** (main accent for buttons and highlights), **Dark Accent** (deep accent for headings and links), and **Dark** (darkest shade, for body text) -- and the **Semantic Colors**: **Primary** (primary buttons and links), **Secondary**, **Success**, **Warning**, and **Error**. The base colors are the swatches offered everywhere in the page editor; the semantic colors drive the **Button Link** element's **Color** choices and status messages.
3. Click any color swatch to open the color picker. Drag the selector or enter a hex value to choose your color.
4. The **Color Combinations Preview** shows every pairing of your base colors as background and text, so you can see which ones read well together.
5. Use **Suggested Palettes** (sixteen ready-made schemes, **Palette 1** through **Palette 16**) to start from a pre-designed color scheme. Clicking a palette only loads its five base colors into the editor; your semantic colors are kept.
6. Click **Save Palette** to apply your colors to the site, or **Cancel** to discard them.

## Typography

1. Click **Fonts** in the Style Settings panel.
2. Click the **Heading Font** or **Body Font** button to open the **Select a Font** browser, which lists Google Fonts by popularity, ten to a page, each with a **Sample** line in that font. Type in **Search** to find a font by name, or use the **Category Filter** (**Serif**, **Sans Serif**, **Display**, **Handwriting**, or **Monospace**). Click a font to choose it. You can also click one of the **Popular Font Combinations** -- pairings of Open Sans, Montserrat, Oswald, Roboto, Poppins, Playfair Display, Lato, Raleway, and Inter -- to set both fonts at once. The **Typography Preview** shows headings and body text in your current choices.
3. Click **Save Fonts** to apply your font choices.
4. To adjust the size hierarchy for Heading 1 through Heading 4, click **Typography Scale** in the Style Settings panel. Set the **Base Size (px)** for body text (12 to 24, default 16), the **Type Scale** multiplier applied for each heading level (1.1 to 2, default 1.25), and the **Line Height** for body text (1 to 2.5, default 1.6). The **Preview** shows the resulting pixel size of each heading and of small text. Click **Save Typography**.

## Spacing

1. Click **Spacing Scale** in the Style Settings panel.
2. Adjust the six **Spacing Values** in pixels: **Extra Small** (default 4), **Small** (8), **Medium** (16), **Large** (24), **Extra Large** (32), and **2X Large** (48). The **Practical Examples** below -- an icon row, a card, a hero section, and a full-width banner -- redraw as you type so you can see how each value affects layout.
3. Click **Save Spacing** to apply the values across your entire site. These are also the steps the page editor's spacing handles snap to.

## Logo and Branding {#logo-and-branding}

1. Click **Logo** in the Style Settings panel.
2. Under **Main Logos**, click **Upload Light Background Logo** and **Upload Dark Background Logo** (or **Edit ...** to replace one). Each opens a crop tool locked to a 4:1 shape and saved at 1280 x 320 pixels, so use a horizontal logo with a transparent background.
3. Under **SEO & Browser Assets**, upload a **Social Media Image** for link previews (cropped to 1200 x 630) and a **Favicon** for the browser tab icon (square, saved at 400 x 400; a small 16 x 16 copy is made automatically). The social media image is the picture that appears when someone shares a link to your site on Facebook, in a text, or in another app. You crop it to a wide 1200 x 630 pixel shape, and it is saved exactly as cropped, filling the whole preview with no border.
4. Optionally enter a **PWA Short Name** (up to 12 characters) -- the name shown under your church's app icon when someone adds it to their phone's home screen.
5. Click **Save Changes**. Uploaded images aren't stored until you save, so if you try to close or reload the browser tab first, your browser warns you that you have unsaved changes.

Logos are shared by all of your church's websites, and by your app and printed materials such as roll sheets.

:::tip
For best results, use a logo with a transparent background in PNG format. This ensures it looks great on both light and dark backgrounds across your website and [mobile app](../settings/mobile-app.md).
:::

## Navigation Styles

Customize your website's navigation bar colors for both solid and transparent modes:

1. Click **Navigation** in the Style Settings panel
2. Configure colors for **Header (solid)** and **Header over hero (transparent)**
3. Click **Save Navigation** to apply your navigation colors

For detailed instructions, see [Navigation Styles](./navigation-styles.md).

## Site Footer

Click **Site Footer** in the Style Settings panel to open your footer in the block editor (the first time, B1 creates an empty block named **Site Footer** for you). Build it like any page section -- for example, your address, service times, and social links -- and click **Exit** when you are done. The footer appears at the bottom of every page that uses the **Header & Footer** layout; until you add content to it, visitors see a default footer with your dark-background logo, church name, and address. Each of your websites has its own footer. You can also reach the footer from any page in the editor through **More** (⋮) > **Edit site footer**. See [Your Site Footer Is a Block](./blocks.md#your-site-footer-is-a-block).

## Announcement & Widgets

Site widgets appear on every page of your site, floating above the page content:

- **Announcement Banner** -- A dismissible bar at the top of your site for time-sensitive messages, like an upcoming event or a service change.
- **Launcher** -- A floating button that opens a quick-access menu, for example links to give, check in, or view the bulletin.

1. Find the **Announcement & widgets** card below the Style Settings.
2. For the **Announcement Bar**, check **Enabled** and fill in the **Text**, an optional **Link URL** and **Link Text**, and the **Background Color** and **Text Color**. Set a **Start Date** and **End Date** to show the bar only during that window.
3. For the **Launcher**, check **Enabled**, then click **Add Action** for each link (up to five) and give it a **Label**, a **URL**, and an **Icon**. Choose its **Position** (bottom right or bottom left) and its **Color**.
4. Click **Save**.

Uncheck **Enabled** and click **Save** to turn a widget off. These widgets apply to every one of your church's websites.

## Redirects & Analytics

The **Redirects & analytics** card (below the Style Settings) holds two unrelated but commonly-needed settings:

- **Analytics** -- Add your **GA4 Measurement ID** (format `G-XXXXXXXXXX`) and click **Save** to track visitor traffic on your website. The same ID also tracks page views in your church's B1 app (the member portal at `/mobile`, including the installed app), tagged with a `display_mode` of `installed` or `browser` so you can tell installed-app visits from browser visits in Google Analytics.
- **Redirects** -- Map an old URL path to a new one, so links to a page you moved or renamed keep working instead of 404ing. Enter the old **From Path** and the new **To Path**, then click **Add**. The redirect is saved right away and listed above the fields; click its delete icon to remove it. Paths are saved in lowercase, with a leading slash and no trailing slash. Both paths are required, they cannot be the same, and a church can have up to 200 redirects. A redirect also takes priority over B1's built-in pages (`/sermons`, `/stream`, `/donate`, `/bible`, and `/votd`), so you can send that address somewhere else (for example, to your own sermons page or a YouTube channel). It doesn't override a page you built yourself at the same address. Delete that page first if you want the redirect to apply.

## Custom CSS and JavaScript

1. Click **CSS & Javascript** in the Style Settings panel.
2. Add **Custom CSS** to override default styles for advanced customization.
3. Add **Custom HTML** for tracking codes or other scripts.
4. Use the **Common CSS Examples** and **Common JavaScript Examples** sections for ready-made snippets, then click **Save Changes**.

:::warning
Custom CSS is powerful but can break your site's layout if used incorrectly. Most churches can achieve the look they want using the built-in color, font, and spacing controls. Only use custom CSS if you are comfortable with web development.
:::

:::info
Your site enforces a Content Security Policy that blocks inline scripts from any other source. The **Custom HTML** field here, and the [HTML element](./page-editor.md#using-the-html-element) on individual pages, are the trusted exceptions -- code you save there runs as-is, so only paste scripts from sources you trust (analytics tags, chat widgets, and similar embeds).
:::

## Style Themes

If you want a quick starting point, the **Suggested Palettes** in the Color Palette section offer pre-built themes with coordinated colors. Click one to load it, adjust any color you like, then click **Save Palette**. A [site template](./site-templates.md) also sets a palette and font pair, but only on a site that has never saved a palette.

## Appearance and Multiple Websites

If your church runs [more than one website](./managing-pages.md#multiple-websites), the **Color Palette**, **Fonts**, **Typography Scale**, **Spacing Scale**, **Navigation**, **CSS & Javascript**, and **Site Footer** settings belong to the site selected in the site switcher. A new site starts out showing the main website's styles; the first time you save any of these settings for it, it gets its own copy and the two sites can diverge from then on.

The **Logo**, **Announcement & widgets**, and **Redirects & analytics** settings are shared by every website your church has.

## Next Steps

- [Managing Pages](./managing-pages.md) -- Build and organize your website pages
- [Files](./files.md) -- Upload media assets for your site
