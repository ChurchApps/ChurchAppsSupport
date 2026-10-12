---
title: "Appearance"
---

# Appearance

<div class="article-intro">

The Appearance page lets you customize the overall look and feel of your church website. From colors and fonts to spacing and custom CSS, you can control every visual aspect of your site from one place.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Complete the [Initial Setup](initial-setup) for your website
- Have your church logo ready in PNG format with a transparent background and a 4:1 aspect ratio
- Know your church's brand colors (hex values) if you have an existing style guide

</div>

## Accessing Appearance Settings

1. In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left) and expand **Website**.
2. Click **Appearance**.
3. The **Site Styles** page loads. The **Theme, fonts & footer** card shows the **Style Settings** list on the left and a preview of a sample site on the right. Below it are the **Announcement & widgets** and **Redirects & analytics** cards.

## Color Palette

1. Click **Color Palette** in the Style Settings panel.
2. You will see **Base Colors** (light, accent, and dark shades) and **Semantic Colors** (Primary, Secondary, Success, Warning, and Error).
3. Click any color swatch to open the color picker. Drag the selector or enter a hex value to choose your color.
4. The **Color Combinations Preview** shows how your selected colors work together.
5. Use **Suggested Palettes** to quickly apply a pre-designed color scheme.
6. Click **Save Palette** when you are satisfied.

## Typography

1. Click **Fonts** in the Style Settings panel.
2. Click the **Heading Font** or **Body Font** button to open the font browser. You can search by name or browse categories like Serif, Sans Serif, Display, Handwriting, and Monospace. You can also pick one of the **Popular Font Combinations**.
3. Click **Save Fonts** to apply your font choices.
4. To adjust the size hierarchy for Heading 1 through Heading 4, click **Typography Scale** in the Style Settings panel. Use the **Type Scale** multiplier, **Base Size**, and **Line Height** fields to fine-tune, then click **Save Typography**.

## Spacing

1. Click **Spacing Scale** in the Style Settings panel.
2. Adjust spacing values for Extra Small through Extra Large. Practical examples show how each value affects layout.
3. Click **Save Spacing** to apply the values across your entire site.

## Logo and Branding

1. Click **Logo** in the Style Settings panel.
2. Upload your **Light Background Logo** and **Dark Background Logo**. Use images with a transparent background and a 4:1 aspect ratio for best results.
3. Upload a **Social Media Image** for link previews and a **Favicon** for the browser tab icon.

:::tip
For best results, use a logo with a transparent background in PNG format. This ensures it looks great on both light and dark backgrounds across your website and [mobile app](../settings/mobile-app.md).
:::

## Navigation Styles

Customize your website's navigation bar colors for both solid and transparent modes:

1. Click **Navigation** in the Style Settings panel
2. Configure colors for **Header (solid)** and **Header over hero (transparent)**
3. Click **Save Navigation** to apply your navigation colors

For detailed instructions, see [Navigation Styles](./navigation-styles.md).

## Announcement & Widgets

Site widgets appear on every page of your site, floating above the page content:

- **Announcement Banner** -- A dismissible bar at the top of your site for time-sensitive messages, like an upcoming event or a service change.
- **Launcher** -- A floating button that opens a quick-access menu, for example links to give, check in, or view the bulletin.

1. Find the **Announcement & widgets** card below the Style Settings.
2. Turn on the widgets you want and configure their text, links, and colors.
3. Click **Save**.

## Redirects & Analytics

The **Redirects & analytics** card (below the Style Settings) holds two unrelated but commonly-needed settings:

- **Analytics** -- Add your **GA4 Measurement ID** (format `G-XXXXXXXXXX`) to track visitor traffic on your website. The same ID also tracks page views in your church's B1 app (the member portal at `/mobile`, including the installed app), tagged with a `display_mode` of `installed` or `browser` so you can tell installed-app visits from browser visits in Google Analytics.
- **Redirects** -- Map an old URL path to a new one, so links to a page you moved or renamed keep working instead of 404ing. Enter the old **From** path and the new **To** path, then click **Save**. A redirect also takes priority over B1's built-in pages (`/sermons`, `/stream`, `/donate`, `/bible`, and `/votd`), so you can send that address somewhere else (for example, to your own sermons page or a YouTube channel). It doesn't override a page you built yourself at the same address. Delete that page first if you want the redirect to apply.

## Custom CSS and JavaScript

1. Click **CSS & Javascript** in the Style Settings panel.
2. Add **Custom CSS** to override default styles for advanced customization.
3. Add **Custom HTML** for tracking codes or other scripts.
4. Use the **Common JavaScript Examples** section for snippets like Google Analytics integration.

:::warning
Custom CSS is powerful but can break your site's layout if used incorrectly. Most churches can achieve the look they want using the built-in color, font, and spacing controls. Only use custom CSS if you are comfortable with web development.
:::

:::info
Your site enforces a Content Security Policy that blocks inline scripts from any other source. The **Custom HTML** field here, and the [HTML element](page-editor#using-the-html-element) on individual pages, are the trusted exceptions -- code you save there runs as-is, so only paste scripts from sources you trust (analytics tags, chat widgets, and similar embeds).
:::

## Style Themes

If you want a quick starting point, the **Suggested Palettes** in the Color Palette section offer pre-built themes that set coordinated colors in one click. You can always fine-tune individual settings after applying a theme.

## Next Steps

- [Managing Pages](managing-pages) -- Build and organize your website pages
- [Files](files) -- Upload media assets for your site
