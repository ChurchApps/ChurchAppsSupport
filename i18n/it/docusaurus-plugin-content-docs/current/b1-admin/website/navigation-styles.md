---
title: "Stili di Navigazione"
---

# Navigation Styles

<div class="article-intro">

Customize your church website's navigation bar colors Per match your branding. You can configure colors for both solid backgrounds and transparent overlays, giving you complete control over how your navigation looks across different pages.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- You need Permesso Per manage your church website. See [Roles & Permissions](../people/roles-permissions.md) for details.
- Have your brand colors ready, including hex color codes (e.g., #03A9F4).
- Understand the difference between solid and transparent navigation styles on your website.

</div>

## Understanding Navigation Modes

Your website navigation can appear in two different styles depending on the page:

- **Solid navigation** -- Navigation bar with a background color, typically used on content pages
- **Transparent navigation** -- Navigation that overlays the page content, typically used on pages with hero images or full-screen backgrounds

You can customize colors for both modes independently.

## Accessing Navigation Styles

1. Navigate Per **Sito Web** in B1 Admin
2. Fai clic the **Appearance** tab at the top of the Sito Web Pages Visualizza
3. Scroll Per the **Navigation Styles** section
4. Fai clic **Modifica Navigation Styles**

## Configuring Solid Navigation

Solid navigation appears with a background color behind the navigation bar. You can customize:

### Background Color

1. Toggle the **Override** switch for **Background Color**
2. Fai clic the color picker
3. Scegli your desired background color
4. The default is white (#FFFFFF)

### Link Color

1. Toggle the **Override** switch for **Link Color**
2. Scegli the color for navigation link text
3. This affects links in their default state
4. The default is dark gray (#555555)

### Link Hover Color

1. Toggle the **Override** switch for **Link Hover Color**
2. Scegli the color links change Per when Utenti hover over them
3. This provides visual feedback for clickable links
4. The default is light blue (#03A9F4)

### Attivo Color

1. Toggle the **Override** switch for **Attivo Color**
2. Scegli the color for the currently Attivo page link
3. This helps Utenti know which page they're on
4. The default is light blue (#03A9F4)

## Configuring Transparent Navigation

Transparent navigation overlays your page content with No background. You can customize:

### Link Color

1. Toggle the **Override** switch for **Link Color**
2. Scegli a color that contrasts well with your page background
3. Often white or light colors work best over dark backgrounds
4. The default is dark gray (#555555)

### Link Hover Color

1. Toggle the **Override** switch for **Link Hover Color**
2. Scegli the hover state color
3. Ensure it's visible against your page background
4. The default is light blue (#03A9F4)

### Attivo Color

1. Toggle the **Override** switch for **Attivo Color**
2. Scegli the Attivo page indicator color
3. Should stand out while still fitting your design
4. The default is light blue (#03A9F4)

:::info
Transparent navigation does not have a background color setting since it overlays the page content directly.
:::

## Saving Your Changes

1. After configuring your colors, Fai clic **Salva Navigation Styles**
2. Your changes apply immediately Per your live website
3. Visit your website Per see the navigation in both modes

## Resetting Per Defaults

If you want Per go Indietro Per the default colors:

1. Toggle off the **Override** switches for any custom colors
2. Fai clic **Salva Navigation Styles**
3. The navigation returns Per the default color scheme

Or Fai clic **Cancel** Per discard all changes without saving.

## Best Practices

### Color Contrast

- **Readability** -- Ensure link colors have enough contrast with the background
- **WCAG compliance** -- Aim for at least 4.5:1 contrast ratio for accessibility
- **Test both modes** -- Preview your site with both solid and transparent navigation

### Brand Consistency

- **Use your brand colors** -- Match your logo and website theme
- **Limit your palette** -- Stick Per 2-3 colors for a cohesive look
- **Consider your images** -- If using transparent navigation, test it against typical page backgrounds

### Hover and Attivo States

- **Clear feedback** -- Make hover states obviously different from default links
- **Distinguish Attivo pages** -- Use a distinct color so Utenti know where they are
- **Smooth transitions** -- The system automatically animates color changes

## Troubleshooting

### Colors Don't Look Right

- **Clear your cache** -- Browser caching may show old colors
- **Check hex codes** -- Make sure you entered valid hex color codes
- **Test on different backgrounds** -- Colors may look different depending on the page

### Navigation Not Visible

- **Transparent mode** -- If using transparent navigation over light images, dark text may be hard Per see
- **Solution** -- Adjust your link colors or use darker page backgrounds
- **Alternative** -- Aggiungi a subtle shadow or background overlay Per the navigation area

## Technical Details

Navigation styles are stored as JSON and applied using CSS variables:

- Changes take effect immediately without rebuilding the site
- Colors cascade Per all navigation elements
- Overrides are Facoltativo; unset colors use theme defaults

## Articoli Correlati

- [Appearance](./appearance.md) -- Customize your website's overall look and feel
- [Managing Pages](./managing-pages.md) -- Crea and organize your website pages
- [Page Editor](./page-editor.md) -- Design page layouts and content
