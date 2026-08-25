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

1. In B1 Admin, open the **section menu** in the top-left corner (the section name with the small arrow) and choose **Settings**.
2. Click the **Edit Settings** button in the header.
3. Update any of the following fields:
   - **Church Name** -- The name displayed across all ChurchApps products.
   - **Address** -- Your church's physical address.
   - **Contact Information** -- Phone number, email, and other contact details.
4. Click **Save** to apply your changes.

## Setting Up Your Subdomain

Your church gets a free subdomain at **yourchurch.b1.church**. This is the web address where members and visitors can access your church's online presence.

1. On the Settings page, locate the **Subdomain** field.
2. Enter your preferred subdomain (for example, "gracechurch" for gracechurch.b1.church).
3. Save your changes.

:::info
Your subdomain must be unique across all ChurchApps churches. If your preferred name is taken, try adding your city or state (for example, "gracechurch-dallas").
:::

## Configuring Branding

Customize how your church appears across all ChurchApps tools:

1. Upload your **church logo** by clicking the logo area and selecting an image file.
2. Add any additional **church images** used on your website and [mobile app](./mobile-app.md).

:::tip
For best results, use a logo with a transparent background in PNG format. This ensures it looks great on both light and dark backgrounds.
:::

## First Day of Week

Choose which day your calendars start on. The **First Day of Week** dropdown on the Church Info section defaults to **Sunday**, but can be set to any day. Once changed, it's honored across calendar grids in B1 Admin and the B1.church member portal -- group calendars, curated calendars, and the event editor all lay out weeks starting on the day you choose.

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
2. Turn it on and choose the **month and day** to promote grades each year.
3. Save your changes.

## Import and Export

The **Import/Export** button in the Settings header opens a dedicated tool in a new browser window. Use this to:

- Import member data from another church management system.
- Export your ChurchApps data for backup or migration purposes.

This is especially helpful when you are first setting up your church and need to transfer existing records into ChurchApps.

:::warning
When importing data, always back up your existing records first. Import operations add data to your system and may create duplicate entries if run multiple times.
:::
