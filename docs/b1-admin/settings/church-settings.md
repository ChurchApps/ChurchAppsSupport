---
title: "Church Settings"
---

# Church Settings

<div class="article-intro">

The Church Settings page is where you configure your church's basic information, contact details, and branding. These details are used across all ChurchApps tools, including your B1.church website and the B1 Mobile app.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need the "Edit Church Settings" permission. See [Roles & Permissions](./roles-permissions.md) if you do not have access.
- Have your church's address, contact information, and logo ready

</div>

## Editing Your Church Information

1. In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), expand **Settings**, and click **Settings**.
2. Open the **Church Information** section and click its edit (pencil) icon.
3. Update any of the following fields:
   - **Church Name** -- The name displayed across all ChurchApps products.
   - **Address** -- Your church's physical address.
   - **Contact Information** -- Phone number, email, and other contact details.
4. Click **Save** to apply your changes.

## Setting Up Your Subdomain

Your church gets a free subdomain at **yourchurch.1.church**. This is the web address where members and visitors can access your church's online presence.

1. On the Settings page, locate the **Subdomain** field.
2. Enter your preferred subdomain (for example, "gracechurch" for gracechurch.1.church).
3. Save your changes.

:::info
Your subdomain must be unique across all ChurchApps churches. If your preferred name is taken, try adding your city or state (for example, "gracechurch-dallas").
:::

If you want visitors to reach your site at your own domain (for example, **www.gracechurch.org**), see [Custom Domain](./custom-domain.md).

## Configuring Branding

Customize how your church appears across all ChurchApps tools:

1. Upload your **church logo** by clicking the logo area and selecting an image file.
2. Add any additional **church images** used on your website and [mobile app](./mobile-app.md).

:::tip
For best results, use a logo with a transparent background in PNG format. This ensures it looks great on both light and dark backgrounds.
:::

## First Day of Week

Choose which day your calendars start on. The **First Day of Week** dropdown on the Church Info section defaults to **Sunday**, but can be set to any day. Once changed, it's honored across calendar grids in B1 Admin and the B1.church member portal -- group calendars, curated calendars, and the event editor all lay out weeks starting on the day you choose.

## Region (Date and Phone Format)

The **Region** setting controls how dates and times are written throughout B1. By default dates use the United States format (for example, "Sep 28, 2026" and "9/28/2026"). Churches outside the US can switch to their own format -- for example, choosing English (United Kingdom) shows "28 Sept 2026" and "28/09/2026" instead.

1. On the Settings page, find the **Region** card and click to edit it.
2. Choose your region from the **Region** dropdown. Each option shows a sample date so you can see exactly how dates will look.
3. Click **Save**.

The Region card then shows your selected region, a sample of the **Date format**, and your **Phone numbers** format.

### Phone Number Format

The same Region card has a **Phone numbers** setting that controls how phone numbers are entered on a person's record:

- **International (with country code)** -- the default. Phone fields show a country flag picker and save numbers with the country code (for example, +1 918 555 1234).
- **Local (as typed)** -- phone fields become plain text boxes and save numbers exactly as you type them, with no country code added (for example, 0701 234 5678). Choose this if your church writes numbers in a local format and doesn't want B1 to add a country code.

When **Local** is selected, the Region card also shows "Local phone numbers" next to your region.

:::tip
Texting works best when numbers include the country code. If you send texts from B1, keep the **International** format, or make sure numbers you type in Local mode include the country code.
:::

Your region applies to dates and times across B1 Admin and on your B1.church website and member portal, including sermons, blog posts, group calendars, and serving plans, so members see dates in the same format your staff do.

## Texting

Connect a texting provider to send SMS messages to a person or a whole group from B1 Admin. Texts are sent through your own account with the provider, so their pricing and limits apply.

1. On the Settings page, find the **Texting** card and click to edit it.
2. Choose a **Provider**:
   - **Clearstream** -- enter an **API Key**. Create one in your Clearstream Account Settings under API Keys.
   - **Text In Church** -- enter an **API Key**. Ask Text In Church Support for developer API access first, then create a key in your Account Settings > Developer API section.
   - **Nalo Solutions** (Ghana) -- enter the auth key from your Nalo Solutions account as the **API Key**, and a **Sender ID** (up to 11 characters) that Nalo has approved for you.
3. Click **Save**.

To stop texting, set **Provider** to **None** and save. This removes the saved provider.

Once a provider is connected, staff with permission to send texts see a text icon in the header of a group (**Text this group**) and of a person with a mobile phone (**Send text message**). Type your message and click **Send**. The dialog counts characters and SMS segments. For a group, it shows how many members will get the text before you send:

- Members with no mobile phone on file are skipped.
- Members who chose **Hide me from the member directory** are counted as opted out and skipped.
- Family members who share a mobile number get the text only once.

### Personalizing Texts with Merge Fields

Below the message box, the Text dialog shows placeholder chips: **First Name**, **Last Name**, **Display Name**, and **Church Name**. Click a chip to insert its placeholder (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, or `{{churchName}}`) at your cursor. When the text is sent, each placeholder is replaced with that recipient's details, so a group text like `Hi {{firstName}}, see you Sunday!` reaches each member with their own name. Placeholders work for both group texts and texts to a single person.

:::info
The 1,600-character limit applies to the message as you type it. After the placeholders are filled in, any text longer than 1,600 characters is cut off at that length.
:::

Texts can also go out automatically from a [workflow](../serving/workflows.md#sending-a-text) step with the **Send Text** action, which uses the same provider and placeholders.

## File Storage

By default, files you upload to your website (through [Files](../website/files.md)) and other content areas use B1's free hosted storage, up to 100MB. If you need more room, you can connect your own cloud storage instead -- new uploads then go straight to your account with no platform limit.

1. On the Settings page, find the **File Storage** card and click to edit it.
2. Choose a provider: **Google Drive**, **Dropbox**, **OneDrive**, or an **S3-compatible bucket** (AWS S3, Cloudflare R2, Backblaze B2, etc.).
3. For Google Drive, Dropbox, or OneDrive, click **Connect** and sign in to authorize access. For an S3-compatible bucket, enter your access key, secret, bucket name, and public URL base.
4. Click **Save**.

:::info
This only affects new uploads to your website Files and similar content areas. Gallery images, thumbnails, logos, and person photos always stay on B1's default storage.
:::

## Grade Promotion

If you track **Grade** on children and students, B1 can automatically bump everyone up a grade on a date you choose (for example, August 1st) rather than requiring you to edit each profile by hand.

1. On the Settings page, find the **Grade Promotion** option.
2. Turn the switch on (it shows **Enabled**) and choose the **Month** and **Day** to promote grades each year. On that date, everyone with a grade moves up one grade, and 12th graders become **Graduated**.
3. Save your changes.

To stop automatic promotion, turn the switch off so it shows **Disabled** and save. The promotion date is removed and grades will no longer change on their own.

## Import and Export

The **Import/Export** button in the Settings header opens a dedicated tool in a new browser window. Use this to:

- Import member data from another church management system.
- Export your ChurchApps data for backup or migration purposes.

This is especially helpful when you are first setting up your church and need to transfer existing records into ChurchApps.

:::warning
When importing data, always back up your existing records first. Import operations add data to your system and may create duplicate entries if run multiple times.
:::
