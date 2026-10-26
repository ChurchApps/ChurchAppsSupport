---
title: "Check-In"
---

# Check-In

<div class="article-intro">

B1 Admin supports self check-in at services through the companion **B1 Checkin** app. Members can check themselves and their families in at kiosks or dedicated devices when they arrive, making the process fast and reducing the workload on your volunteers. Every check-in is automatically recorded as attendance.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Your campuses, service times, and groups must be configured in [Attendance Setup](setup.md).
- You need [people in your database](../people/adding-people.md) with [households](../people/adding-people.md#managing-households) set up so families can check in together.
- You'll need a tablet and optionally a Brother label printer (see [hardware recommendations](#recommended-hardware) below).

</div>

## How It Works

The B1 Checkin app connects to your B1 Admin attendance setup. When a member checks in, their attendance is automatically recorded against the correct campus, service time, and group. You do not need to enter attendance manually for anyone who uses the check-in system.

## Setting Up Check-In

1. **Configure your attendance structure first.** In B1 Admin, go to **People > Attendance** and click **Setup** to make sure your campuses, service times, and groups are in place. The check-in app relies on this configuration. Optionally give each service time a [check-in schedule](setup.md#setting-a-check-in-schedule) so check-in opens and closes automatically each week. Schedules use the time zone of the service's campus, or your church's time zone if the campus doesn't have one set; the kiosk lists service times whose window is closed as **Closed** and tells families when check-in opens. See [Attendance Setup](setup.md) for details.
2. **Install the B1 Checkin app** on the devices you plan to use. The app is available on the following platforms:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Sign in to the B1 Checkin app** using your church's account credentials.
4. **Select the campus and service time** for the current gathering.
5. Members can now search for their name on the device and check in.

:::tip
Place check-in devices in visible, easy-to-reach locations such as lobby entrances or welcome desks. A brief announcement during services helps members know the option is available.
:::

:::tip
If your church has multiple campuses, you'll need to repeat the setup for each campus in [Attendance Setup](setup.md). Each check-in device can be configured for a different campus.
:::

## Recommended Hardware

**Tablets** — any of these work well with the app:

- **Compact:** Samsung Galaxy Tab A7 Lite 8.7"
- **Large Screen:** Samsung Galaxy Tab A8 10.5"
- **Budget:** Amazon Fire HD 10

**Printers** — check-ins work with Brother label printers for printing name tags:

- **Best:** Brother QL-1110NWB (supports multiple tablets via Bluetooth and WiFi)
- **Good:** Brother QL-810W (supports multiple tablets via WiFi)
- **Budget:** Brother QL-1100 (WiFi only)

**Labels:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Only Brother label printers are compatible with the B1 Checkin app. Other printer brands will not work for printing name tags.
:::

:::info
Follow your printer's setup instructions to connect it to the same WiFi network as your tablet. You can find Brother printer drivers and setup guides on the [Brother support site](https://support.brother.com).
:::

## Customizing the Kiosk Appearance

You can customize the look and feel of the B1 Checkin app to match your church's branding. In B1 Admin, go to **Mobile > B1 CheckIn** and use the **Kiosk Theme** card to configure:

### Colors

Customize eight color settings to match your church branding:

- **Primary** and **Primary Contrast** -- Main brand color and its text color.
- **Secondary** and **Secondary Contrast** -- Accent color and its text color.
- **Header Background** and **Subheader Background** -- Colors for the kiosk header areas.
- **Button Background** and **Button Text** -- Colors for interactive buttons.

### Background Image

Upload an optional background image for the kiosk welcome and lookup screens. Recommended size is 1920x1080 pixels.

### Idle Screen / Screensaver

Configure a screensaver that activates after a period of inactivity:

1. Toggle the idle screen **on** or **off**.
2. Set the **timeout** (how many seconds of inactivity before the screensaver starts, minimum 10 seconds).
3. Add one or more **slides** -- each slide has an image and a display duration (minimum 3 seconds).

:::tip
Use the idle screen to display announcements, upcoming events, or welcome messages when the kiosk is not actively being used.
:::

## Guest Registration via QR Code

The check-in kiosk can display a QR code that visitors scan to register themselves and their family on their own phone. This speeds up the check-in process for first-time guests.

When a guest scans the QR code, they are taken to a [guest registration page](../../b1-church/checkin/guest-registration) where they enter their family's names and whatever other details you choose to ask for. A volunteer can then look them up on the kiosk and check them in.

### Enabling QR Guest Registration

To turn on the QR code display:

1. In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left) and expand **Mobile**.
2. Click **B1 CheckIn**.
3. Toggle **QR Guest Registration** on and click **Save**.

:::note
This setting is under **Mobile > B1 CheckIn** (the same page as the **Kiosk Theme** card), not under Attendance. The **Kiosk** action on the Attendance page has a link to this page.
:::

Once the toggle is on, the rest of the options below appear in the same **QR Guest Registration** card. Click **Save** on the card after changing any of them.

### Choosing Sign-up Fields

The **Sign-up fields** checklist controls what the registration form asks for. **First Name** and **Last Name** are always on the form and always required for every family member. For each other field, turn on **Include** to add it to the form, then turn on **Required** if guests must fill it in. **Required** can only be turned on for an included field, and turning **Include** off clears it.

| Field | Asked for | Included by default |
|-------|-----------|---------------------|
| **Email** | Primary contact only | Yes (optional) |
| **Phone** | Primary contact only | Yes (optional) |
| **Home address** | Once for the family -- street, address line 2, city, state, and zip. When required, everything except address line 2 must be filled in. The address is saved on every family member. | No |
| **Birth date** | Each family member | No |
| **Gender** | Each family member | No |
| **Marital status** | Primary contact only | No |
| **Grade** | Each family member (PreK through 12, or Graduated) | No |
| **Comments** | Once, in a box below the family members (up to 1,000 characters) | No |

Fields you turn off are never saved, even if someone sends them to the sign-up some other way. Comments are saved as a note on the primary contact's record (posted as "Guest sign-up"), so you can read them in the **Notes** section of their profile.

### Adding Guests to a Group

Use **Add new guests to group** to put everyone who signs up into one of your groups automatically -- for example, a "Newcomers" group or a group for this weekend's event. Choose **None** (the default) to skip this. Guests never see or choose the group; it's set only here. Change it before each event so you can follow up with that event's guests together.

### Recording Attendance

When a group is selected, an **Also record attendance** switch appears. Turn it on to mark guests present the moment they sign up, so you don't have to check them in separately.

Attendance is only recorded when the sign-up happens during one of the selected group's **scheduled** service times:

- The group must be linked to one or more service times, and those service times must have a [check-in schedule](setup.md#setting-a-check-in-schedule) (a **Day** and a **Start Time**).
- "During" means inside that service time's check-in window -- from the **Open check-in** minutes before the start until the **Close check-in** minutes after the end (or after the start, if no end time is set), in the same time zone the check-in schedule uses.
- Each family member is marked present in the group for every one of its service times that is open at that moment, on today's date.
- Sign-ups at any other time, or for a group whose service times have no schedule, are added to the group but are not counted as attending.

### Header Photo

Under **Header photo**, click **Change photo** to pick or upload an image (cropped to a 16:9 shape) to show at the top of the registration page in place of the default icon. Click **Remove** to go back to the icon.

### Sharing the Registration Link

Once QR Guest Registration is enabled, a **Share registration QR code** section appears at the bottom of the card. This gives you two ways to get guests to the registration form beyond the kiosk QR code:

- **Copy link** — copies the registration URL so you can paste it on your church website, in emails, or anywhere online.
- **Download PNG** — downloads the QR code as an image you can print on flyers, bulletins, or signage.

:::tip
Add the registration link to your church website's "Plan Your Visit" or "I'm New" page so guests can register before they even arrive.
:::

### What Happens After a Guest Signs Up

Each sign-up creates a new household named after the primary contact's last name, with a person record for every family member. Everyone is added to **People** with the membership status **Visitor**, with the primary contact as head of household.

To follow up automatically, add a [workflow trigger](../serving/workflows.md#triggers) such as **Person · Created** with the condition *Membership Status is Visitor*, or **Group · Member Joined** for the group you chose above.

## What Gets Recorded

Every check-in creates an attendance record in B1 Admin. You can view these records on the [Attendance](tracking-attendance.md) page and in each [group's](../groups/group-members.md) sessions just like manually entered attendance. There is no difference in how the data appears — both methods feed into the same reports.
