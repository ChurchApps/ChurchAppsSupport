---
title: "Mobile App Settings"
description: "Configure the navigation tabs, Home screen tiles, sign-in prompt, and member directory privacy settings for the B1.church member app in B1 Admin."
---

# Mobile App Settings

<div class="article-intro">

The Mobile App Settings page lets you configure the navigation tabs that appear in the **B1.church mobile experience (PWA)** for your church members. You control which tabs are visible, what they link to, and how they are displayed.

</div>

## Training Video

<YouTube id="ydY7WGK16fE" title="Customizing Your Church's Member App in B1" />

:::info
Tabs configured here appear in the B1 App, which members can [install as a Progressive Web App (PWA)](../../b1-church/getting-started/installing-pwa.md). Share your church's install page — `https://yourchurchname.b1.church/mobile/install` — with members; it walks them through installing the app on their device, with no App Store or Google Play download required.
:::

<div class="prereqs">
<h4>Before You Begin</h4>

- You need the "Edit Church Settings" permission. See [Roles & Permissions](./roles-permissions.md) if you do not have access.
- Configure your [Church Settings](./church-settings.md) first, including your church name and branding

</div>

## Accessing Navigation Settings

1. In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left) and expand **Mobile**.
2. Click **Navigation** (`/mobile/navigation`). You need the **Edit Content** permission to see it.
3. The **App Tabs** list shows your current tabs in order, each with its visibility. Tabs inside a folder are indented under it.

The Mobile menu also holds **App Theme**, **Member portal**, **B1 Check-In**, **Labels**, and **Push Notifications**. App Theme and Member portal are covered below; see [Push Notifications](#push-notifications) for scheduling notifications.

## Adding a New Tab

1. Click the **Add Tab** button at the top of the page.
2. Fill in the tab details:
   - **Tab Name** -- The label that appears on the tab (for example, "Sermons" or "Give").
   - **Icon** -- Click the icon selector to choose an icon for your tab.
   - **Image** -- Click **Select Image** (or **Change Image**) to give the tab a photo. Tabs with a photo appear as photo tiles on the app's Home screen -- see [Home Screen Tiles](#home-screen-tiles).
   - **Tab Type** -- **Bible**, **Live Stream**, **Verse of the Day**, **Sermons**, **Check-in**, **Donation**, **Member Directory**, **My Groups**, **Volunteer Opportunities**, **Serving Plans**, **Registrations**, **Requests**, **External URL**, **Internal Page**, or **Folder**. **Registrations** opens the member's event registrations; **Requests** opens My Requests, where a member can request an event and see the status of past requests. Set Visibility to Logged-in Users or Members & Staff for these, since they need a signed-in member.
   - **URL** -- Shown for **External URL** tabs: the web address the tab opens.
   - **Page** -- Shown for **Internal Page** tabs: pick one of your website's pages.
   - **Parent tab** -- Put the tab inside a **Folder** tab, or leave it on **None (top level)**. See [Where These Tabs Appear](#where-these-tabs-appear).
   - **Visibility** -- Who can see this tab: **Everyone (including anonymous)**, **Logged-in Users**, **Members & Staff**, **Staff Only**, **Serving Team Members**, or **Specific Groups...** (then check the groups). For a **Member Directory** tab, this only controls who sees the tab itself; who can open the directory is set by **Show in Directory** on the Member portal page (see [Member Directory & Messaging Settings](#member-directory--messaging-settings)).
3. Click **Save Tab** to add it to your app.

## Editing an Existing Tab

1. Click the edit (pencil) icon on a tab in the **App Tabs** list.
2. Update the tab's name, icon, image, type, or visibility settings.
3. Click **Save Tab** to apply your changes. To remove the tab, click **Delete Tab** instead. Deleting a folder moves its tabs back to the top level.

## Reordering Tabs

You can change the order in which tabs appear in the mobile app. Use the **Move Up** and **Move Down** arrows on each tab to rearrange them. Tabs inside a folder move within that folder. The order shown on this page matches the order your members will see in the app.

:::info
Some tabs may appear automatically when certain conditions are met -- for example, a Live Stream tab may show up when a stream is active. Manually added tabs give you full control over what your members see at all times.
:::

:::tip
Keep your tab count manageable. Three to five tabs works well for most churches. Too many tabs can make navigation confusing for your members.
:::

## App Theme {#app-theme}

**Mobile > App Theme** (`/mobile/theme`) sets the colors used by the B1 app, the member portal, and the check-in kiosk. You need the **Edit Church Settings** permission.

1. Expand **Light Mode** or **Dark Mode**.
2. For each color -- **Background**, **Surface**, **Primary**, **Primary Contrast** (text on primary-colored buttons and headers), **Secondary**, and **Text Color** -- click the swatch to pick a color, or type it in the **Hex** box. The **Preview** below shows a header, a card, and a button in your colors.
3. Click **Save**.

Click **Reset to Defaults** to go back to the standard colors. B1 Admin's own **Custom** theme also uses the light-mode **Primary** color -- see [Managing Your Profile](../profile/managing-profile.md).

## Member Directory & Messaging Settings

The **Member portal** item in the same Mobile section (`/mobile/b1-mobile`, titled **Portal settings**) holds the settings that govern the member directory and private messaging in the B1.church experience. You need the **Edit Church Settings** permission. Change any of the settings below and click **Save** at the bottom of the page:

- **Directory Approval Group** -- The group that reviews member directory updates, and [account deletion requests](../profile/account-deletion.md), before they take effect.
- **Show in Directory** -- Who can open the member directory and who is listed in it: **Admins Only**, **Members and Above** (the default), **Regular Attendees and Above**, or **Visitors and Above**. People whose membership status is below the level you pick don't see the directory and aren't listed in it. **Admins Only** closes the directory to everyone except staff with the People &gt; View permission (a Staff membership status alone isn't enough), who can always open the directory and see everyone, whatever this is set to. Guests are never included, since anyone who self-registers online starts out as a guest.
- **Visibility Preference** -- Sets the church-wide default for members who haven't chosen their own setting yet. **Address**, **Phone Number**, and **Email** each have their own dropdown (each starts at **Members**), with the same five levels available everywhere visibility is configured:
  - **Everyone** -- visible to anyone, including anonymous visitors
  - **Members** -- visible only to people with a Member or Staff record
  - **Groups Only** -- visible only to people who share a group with this person, plus staff
  - **My Group Leaders and Staff** -- visible only to leaders of a group this person belongs to, plus staff
  - **Staff Only** -- visible only to staff (anyone whose membership status is Staff, or who has the People &gt; View permission), and to the person themselves

  "Staff" in these levels means anyone whose membership status is Staff or who has the People &gt; View permission. Group changes take effect right away: someone who joins a group, or is made a group leader, can see the matching **Groups Only** or **My Group Leaders and Staff** details of that group's members without signing out and back in.

  Members can override these defaults for their own record from the **Privacy** tab of their profile in the B1.church PWA -- see [Editing Your Profile](/docs/b1-church/getting-started/me-page).
- **Minimum Age for Private Messages** -- A child-safety control. B1 will not open a **new** private-message conversation when either person is under this age, based on their birthdate (household role is used as a fallback when no birthdate is on file). People under the age remain fully visible in the directory -- only direct messaging is blocked, in **both directions**, for everyone including staff. Group conversations and messaging a child's parents still work. Options are Off, 13, 16, or 18; the default is **18**. Existing conversations are not affected.

:::tip
Because the minimum-age check relies on birthdates, make sure birthdates are filled in for children in your congregation. This setting belongs to the same child-safety family as the [check-in safety controls](../attendance/checkin-safety.md).
:::

### Home Screen Sign-In Prompt

Visitors who open the app's [Home screen](/docs/b1-church/getting-started/navigating#home) without signing in see a short prompt -- by default, *"Sign in to see your groups, giving, and more."* -- next to a **Sign In** button. The **Home screen sign-in prompt** settings on the same Member portal page (`/mobile/b1-mobile`) let you change it:

- **Show sign-in prompt on the app home screen** -- Turn this off to hide both the prompt and the **Sign In** button from the Home screen. Visitors can still sign in from the app menu.
- **Sign-in prompt text** -- Replace the default wording with your own message (up to 150 characters). Leave it blank to use the default. This box is disabled while the prompt is turned off.

Click **Save** to apply. A **Saved** message confirms the change. Saving refreshes the app's cached settings, so the change shows up the next time the Home screen loads.

### Home Screen Tiles

Tabs that have a photo (see **Image** under [Adding a New Tab](#adding-a-new-tab)) appear on the app's [Home screen](/docs/b1-church/getting-started/navigating#home) as photo tiles, in a section headed with your church's name. This includes a Verse of the Day tab, if you give it a photo. Photo tabs still appear in the tab bar as well.

The **Home screen tiles** setting on the same Member portal page (`/mobile/b1-mobile`) controls how those tiles are laid out. Pick a **Layout**:

- **Grid** -- Two tiles per row (the default). When the number of tiles is odd, the first tile spans the full width.
- **Scrolling row** -- One row of tiles that members swipe sideways.
- **Scrolling (automatic)** -- The same sideways row, but it also moves on its own, advancing one tile about every four seconds and carrying on forward to the first tile again after the last one. It pauses while a member touches, hovers over, or tabs into the row and picks up again a few seconds later. On devices set to reduce motion, the row stays still and works like **Scrolling row**.
- **List** -- A list with a small photo thumbnail next to each tab's name.
- **Grid and list** -- The first three photo tabs as a grid, with the first tile spanning the full width, and the rest listed beneath with a small thumbnail beside each name. When there are more than three, the section heading shows an **All** link that opens the app's **More** page, which lists every tab.
- **Scrolling (automatic) and list** -- The first three photo tabs in the self-advancing row described above, and the rest listed beneath, with the same **All** link.

In both scrolling layouts, when there are more tiles than fit across the screen, a row of dots appears under the tiles, one per tile, with the current tile's dot filled in. Members can tap a dot to jump to that tile.

Click **Save** to apply.

### Home Screen Sections

Signed-in members always see their own attendance history and submitted forms on the [Me page](/docs/b1-church/getting-started/me-page). The **Home screen sections** switches on the same Member portal page (`/mobile/b1-mobile`) can show them on the Home screen too:

- **Show My Attendance on Home** -- Adds a **My Attendance** section with how many times the member attended in the last 90 days, their two most recent visits, and a **History** link to their full attendance list.
- **Show My Forms on Home** -- Adds a **My Forms** section with the member's two most recent form submissions and an **All forms** link.

Both are off by default. A section only appears for members who are signed in and have at least one record to show.

- **Show News on Home** -- Adds a **News** section right under the greeting that shows your five latest published [blog posts](../website/blog.md) as photo cards in a row that moves along on its own. Tapping a card opens the full post inside the app, and an **All news** link lists your recent posts. Once it is on, **Only this category** lets you pick one blog category (for example, *Announcements*) so only those posts appear; leave it on **All posts** to show everything. News shows for everyone who opens the app, signed in or not, because blog posts are public on your website. It is off by default and only appears when you have at least one published post.

Click **Save** to apply.

## Push Notifications {#push-notifications}

**Mobile > Push Notifications** (`/mobile/notifications`) sends or schedules a push notification to people who have the B1 app installed with notifications turned on. You need **Edit Content** to send to everyone, or **Edit Group Members** to send to a group.

1. Click **Send Notification**.
2. Choose the **Audience**: **Everyone with the app**, or one of your groups.
3. Enter a **Title** and **Message**, and optionally an **Open link or flyer URL** and an **Image URL** (the same fields as a [group notification](../groups/group-members.md#sending-push-notifications-to-group-members)).
4. Under **When**, keep **Send now**, or choose **Schedule for later** and pick a **Send at** time in the future.
5. Click **Send Notification** (or **Schedule Notification**).

The page lists **Scheduled** notifications (with **Edit**, **Send now**, and **Cancel** on each) and **Recent** ones with their status, such as *Sent: 12 of 15*, *Cancelled*, or *Missed (the send time passed)*. Click **Remove** to take a finished notification off the list, or **Clear all** to remove every sent, failed, and cancelled one. Times are shown in your church's [time zone](./church-settings.md#time-zone), or your computer's if the church has none set. Who receives a scheduled notification is worked out again when it goes out.

## Where These Tabs Appear

The tabs you configure here are displayed in the **B1.church PWA** that your members install from any page on `https://yourchurchname.b1.church`. Changes you make on this page are reflected the next time a member opens the app.

On a phone, the bottom tab bar shows **Home**, up to three of your tabs, and **More**; on a computer, the header shows up to five. Built-in screens (such as Sermons, Giving, or Groups) get those slots first, and **Internal Page** tabs fill any slots left over. **External URL** and **Verse of the Day** tabs never get a slot. Every tab, including those that don't fit, is listed on the app's **More** page.

Tabs placed inside a **Folder** tab are the exception: they appear only on the folder's own screen, which members open by tapping the folder. That screen shows the tabs as photo tiles when every one of them has an image, or as a list otherwise. A folder that holds no tabs a member can see is hidden from that member. See [Folder Tabs](../../b1-church/getting-started/navigating.md#folder-tabs). See [Navigating B1App](../../b1-church/getting-started/navigating.md) for what members see.

## Next Steps

- [Church Settings](./church-settings.md) -- Configure your church information and branding
- [Roles & Permissions](./roles-permissions.md) -- Manage access for your team
