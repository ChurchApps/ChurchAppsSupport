---
title: "Adding People"
description: "Add a person to your church database in B1 Admin, fill in their details, and link family members into households for check-in and reporting."
---

# Adding People

<div class="article-intro">

The People section is the foundation of B1 Admin — it's your church's member database. Every other feature (groups, attendance, donations, forms) ties back to person records. This guide walks you through adding someone to your database, editing their details, and linking family members into households.

</div>

## Training Video

<YouTube id="GtsczJ8JPio" title="Adding People and Households in B1" next="Importing Your People Database in B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Before You Begin</h4>

- You need an active B1 Admin account with permission to manage people. See [Roles & Permissions](roles-permissions.md) if you're unsure about your access level.
- If you're adding more than a handful of people, consider using the [CSV Import](importing-data.md) tool instead.

</div>

## Adding a Person

1. Navigate to the B1.church Admin dashboard.
2. Open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), expand **People**, and click **People**.
3. Click the **Add Person** button in the page header. The page scrolls down to the **Add a New Person** form below the directory.
4. Fill in the person's **First Name** and **Last Name** (both required). Optionally add a **Title**, **Email**, and **Mobile Phone**, then click **Add** (or press **Enter**).

B1 creates a new household for the person, named after their last name.

The person's profile page will open, ready for you to add more details.

:::tip
If you're migrating from another church management system, the [Import Data](importing-data.md) feature lets you bring in your entire directory from a CSV file — much faster than adding people one at a time.
:::

### Duplicate Warnings

When you enter an email address on the **Add a New Person** form, B1 checks for duplicates before saving. If the email address (or, when creating a person from the full Edit form, the phone number or matching first name + last name + birth date) matches someone already in your database, a **Possible Duplicate** dialog appears before the new record is saved. It lists each matching person along with their email, phone, and birth date so you can compare.

- Click **Use Existing** next to a match to use that person's record instead of creating a new one.
- Click **Create Anyway** to add the new person even though a possible match was found.

This only checks for duplicates when you're creating a brand-new person — editing an existing record never triggers it. It only prevents new duplicates; it doesn't merge two records that already exist. To find and merge records that are already duplicated, use [Possible Duplicates](./searching-people.md#possible-duplicates) on the People page.

## Editing Details

1. On the person's profile page, click the **Edit** button on the left, below the **Household** section.
2. In the **Personal Details** form, fill in additional information such as a **Title** (pick Mr, Mrs, Miss, Ms, Dr, Prof, Rev, or Pastor from the list, or type your own, up to 10 characters), middle name, nickname, **Name Tag Notes** (printed on check-in name tags and shown as a warning tag on the profile), **Donor Number**, membership status (**Visitor**, **Guest**, **Regular Attendee**, **Member**, **Staff**, **Inactive**, or **Deceased**), gender, marital status, birth date and anniversary, campus, address, phone numbers with extensions, and (for children and students) grade and school. Check **Hide me from the member directory** to leave the person out of the [printed directory](./print-directory.md) and the app's member directory. Check **Disable private messages** to stop the person from starting or receiving new one-on-one messages in the B1 app; they can still take part in group conversations, existing private conversations are not affected, and only staff can change this setting. It works alongside the church-wide [Minimum Age for Private Messages](../settings/mobile-app.md) setting. Any [custom fields](../settings/custom-fields.md) appear under **Custom Fields**.
3. Click **Save** to store the personal information, or **Cancel** to close the form without saving.

If you change the address or home phone of someone who shares a household with others, B1 asks whether to use the new value for the whole household. The dialog is titled **Update Address**, **Update Home Phone**, or **Update Address and Home Phone**, depending on what changed; click **Yes** to copy it to everyone in the household or **No** to change only this person. Phone numbers you don't touch are saved exactly as they were, so editing another field never reformats them. The profile shows every number in one style: US numbers as (555) 123-4567, and other numbers with their country code followed by a space. If your church uses the **Local (as typed)** phone format in [Region settings](../settings/church-settings.md#region-date-and-phone-format), numbers are shown exactly as stored.

The form also has a **Delete** button (to delete the person) and a **Data Management** section for exporting or anonymizing the person's data (see [Data Security](../settings/data-security.md#using-the-data-management-tools)).

The left side of the profile shows the person's photo, name, age, gender, marital status, campus, membership status, contact details, any [custom field](../settings/custom-fields.md) values, and their household. Tags under the name show when the person **Has login** (a B1 account), is **Hidden from directory**, has **Opted out of texts**, has **Private messages off**, or has name tag notes. **Opted out of texts** means the person replied STOP to one of your church's texts; it is separate from hiding them from the directory, and only the person replying START clears it. If the last email sent to the person's current address bounced, a small warning icon appears beside their email; hover over it to read "The last email to this address bounced." (Only staff who can view or edit people see it.) In the household, members whose membership status is **Inactive** or **Deceased** show that status under their photo. Above the household, **Added** shows the date the record was created (only for people added since late October 2026). Click the photo to change it. Below the household are the **Edit**, **Email**, and **Text** buttons (see below) and a few more actions: **Workflow** (add the person to a [workflow](../serving/workflows.md)), **Merge** (see [Merging Duplicate Records](#merging-duplicate-records)), **Export** (a CSV of their details and form answers), and **Export Data** (a JSON copy of everything B1 holds about them). See [Exporting One Person's Record](./exporting-data.md#exporting-one-persons-record) for both exports. If the person belongs to a household, a **Pickup** section lists the people allowed to pick up children at [check-in](../attendance/checkin-safety.md#trusted-and-not-authorized-pickup-people).

The rest of the profile shows a summary section for each kind of related information:

- **Attendance** — Shows which of the last several weeks the person attended and their most recent visits. Click **All years** for their full visit history, including the campus, service, service time, group, and a **Checked In** column with the kiosk check-in time (shown as a dash for visits recorded without a kiosk check-in). Visits from a kiosk or self check-in can also show **Checked In By**, **Checked Out**, and **Picked Up By** (see [Check-In Details](../attendance/recording-attendance.md#check-in-details)). Click **Print** to print it (the printout has your church logo and name centered at the top, above the person's name). For church-wide trends rather than one person's history, see [Tracking Attendance](../attendance/tracking-attendance.md)
- **Donations** — Shows this year's gifts, including gifts to non-deductible funds. Click **All years** for their full [donation history](../donations/person-giving.md), or **Log a gift** to record a new one. Staff can also give on the person's behalf and manage their recurring gifts and payment methods from this view; see [Giving on a Person's Record](../donations/person-giving.md). If your church turned on [Giving Privacy](../settings/church-settings.md#giving-privacy), amounts stay hidden until you click **Show giving**
- **Groups** — Lists the person's [group memberships](../groups/group-members.md) (each name opens [the group's page](../groups/group-page.md)), with **Joined** and the date they joined each group when it's on file
- **Notes** — Shows recent notes about the person (pastoral care, follow-ups, etc.). Click **All notes** to read and add notes. Each note shows who wrote it and the date and time it was posted. To format a note, highlight text in the note box and pick **Bold**, **Italic**, **Bulleted list**, or **Numbered list** from the small popup (or press **Ctrl+B** / **Ctrl+I**, **Cmd** on a Mac); the note shows the formatting once posted. Deleting a note asks you to confirm first, because it can't be undone. To see recent notes across everyone at once, use the [Notes](./notes.md) page
- **Delivery problems** — Lists the person's most recent failed emails, texts, and app notifications, with the **Date**, **Channel** (**Email**, **Email bounced**, **Marked as spam**, **Text**, or **App notification**), **Address** the message went to, and the **Error**. The message content is never shown. The section appears only to staff who can edit people, and only when something failed. See [Delivery Problems](#delivery-problems) below
- **Documents** — Private files and links kept on the person's record, such as a baptism certificate. See [Documents](#documents) below
- **Forms** — Lists the person's forms and whether each one has been submitted (see [Working with Forms](#working-with-forms) below)
- **Requests & registrations** — Lists the person's room and resource [event requests](../calendars/approvals.md) (with the rooms or resources asked for and **Pending**, **Approved**, or **Rejected**) and their [event registrations](../calendars/paid-registrations.md) (with how many people they registered and **Registered**, **Pending**, **Waitlisted**, or **Cancelled**), newest first. The five latest are shown; click **All requests** for the full list. You see event requests if you can use the [Approvals](../calendars/approvals.md) page, and registrations if you can view registrations; without either, the section is hidden

When you open one of these full views, click the **Back to** link with the person's name at the top to return to the profile.

## Adding a Person to a Workflow

Staff who can edit people see a **Workflow** link under the household on a person's profile. Click it to open the **Add to Workflow** dialog, pick a workflow from the **Workflows** list (only active workflows are offered; the built-in assignment-confirmation workflow is left out), and click **Add**. A card for the person is created on that workflow's board, and the dialog confirms it. To add many people at once, select them on the People page and use **Actions > Add to Workflow** instead; see [Bulk Editing](./bulk-editing.md#add-to-workflow). Workflows themselves are set up under **Serving**; see [Workflows](../serving/workflows.md).

## Merging Duplicate Records {#merging-duplicate-records}

If the same person has two records, merge them from the record you want to keep. (To find duplicates across the whole directory, use [Possible Duplicates](./searching-people.md#possible-duplicates) on the People page instead.)

1. Open the record you want to **keep** and click **Merge** under the household (you need permission to edit people). A **Find person to merge** panel opens above the profile.
2. Type the other person's name and search, then click **merge** next to the record to remove.
3. The merge dialog asks *Merge `<this person>` with `<other person>`?* Where the two records disagree -- a different email, phone, address, birth date, photo, household, and so on -- the dialog lists the field under *Please resolve field conflicts:* with both values. Pick the value to keep for each; you cannot continue until every conflict has a choice.
4. Click **Confirm**. The button reads **Merging...** while it works, then B1 returns you to the People page.

Everything from the removed record moves onto the one you keep: the other household's members join this household, group memberships are added (a group both records were in is kept once), attendance, donations, form submissions, notes, documents, and [custom field](../settings/custom-fields.md) values all carry over, and the removed record is deleted. You cannot merge away your own record. Click **Close** on the panel to cancel without merging.

## Emailing a Person

If the person has an email address on file, an **Email** button appears next to **Edit**, below the household on the left of the profile.

1. On the person's profile, click **Email**.
2. An **Email** dialog titled with the person's name opens, showing **Sending to** with the person's address.
3. Optionally choose a saved template from **Load Template (optional)**.
4. Enter a **Subject** and compose the message.
5. Click **Send Email**.

To write the message in your own mail program instead, click **Open in my email app**.

:::info
Sending from B1 uses the same approval and daily limits as group email. If your church hasn't been approved yet, the dialog asks you to request a review — you can still click **Open in my email app** in the meantime. See [Turning On Group Email for Your Church](../groups/group-members.md#turning-on-group-email-for-your-church). Users without permission to edit group members go straight to their email app when they click **Email**.
:::

## Texting a Person

If your church has a [texting provider](../settings/church-settings.md#texting) connected, you have permission to send texts, and the person has a mobile phone number, a **Text** button appears next to **Email**. Click it, type your **Message**, and click **Send**. The dialog shows the number the text goes to. See [Texting Group Members](../groups/group-members.md#texting-group-members) for how texting works.

### Text Reminders {#text-reminders}

Task, event, and serving reminders only go out by text to people who have turned text messages on. With the same texting provider, permission, and mobile number, the person's record shows **Text reminders** under their mobile number, with **On** or **Off**. Click **Turn on** to start sending them reminder texts, or **Turn off** to stop. This is the same switch as **Text messages** in the person's own [Notification Preferences](../../b1-church/getting-started/notification-preferences.md), so either of you can change it. Someone who replied STOP to your church's texts still gets no reminder texts, even with **Text reminders** on; their record shows **Opted out of texts** until they reply START.

## Delivery Problems {#delivery-problems}

When an email, text, or app notification to a person fails, B1 records it. Staff with permission to edit people see a **Delivery problems** section on the person's profile listing the 25 most recent failures, newest first. Use it to spot a mistyped email address, a number that can't receive texts, or an address that bounced, then fix the contact details with **Edit**. App notifications don't show an address, because it is only a device code.

The section is hidden when nothing has failed.

## Documents {#documents}

The **Documents** section on a person's profile holds private files and links for that person, such as a baptism certificate, a membership class record, or a link to a background check. Staff with permission to view people can see the list and download files. Uploading, adding links, and deleting require permission to edit people.

**To upload a file:**

1. On the person's profile, find **Documents** and click **Upload**.
2. Choose the file and click **Upload**.

**To add a link:**

1. Click **Add link**.
2. Enter a **Name** and the **Web address** (it must start with `http://` or `https://`).
3. Click **Add link**.

Each file shows its **Name**, **Size**, and the date **Added**, with a **Download** action; links show **Open**. Click **Delete** to remove a file or link (you'll be asked to confirm, and it can't be undone). A line under the list shows how much of the 100 MB per-person limit is used.

:::info
Person documents are private. They always go to ChurchApps storage, even if your church uses its own [file storage](../settings/church-settings.md) provider, and each download uses a link that expires after a few minutes. A person's documents and links are included when you export their data from **Data Management**.
:::

## Working with Forms

You can fill out custom forms directly from a person's profile. These are user-defined forms that you can build by following the [Creating Forms](../forms/creating-forms.md) guide.

1. On the person's profile, find the **Forms** section. It lists each form along with whether it has been **Submitted** or **Not submitted**.
2. Click a form's name to open it (or click **All forms** to see the full list).
3. Click the **edit icon** (pencil) on the form, fill in the details, and click **Save**.

Once a form is submitted, click the **print icon** next to it to print that person's filled-in answers. When the person has a single submission of a form, the form shows **Submitted** with the date above the answers.

If a submission landed on the wrong person, click the **Change person** icon (two arrows) next to it to move it to someone else or unlink it. See [Changing the Person on a Submission](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Forms linked to a person's profile use the **People** form type. If you need a standalone form (like an event registration), see the [Stand Alone form option](../forms/creating-forms.md) in the forms guide.
:::

:::tip
If you only need to track one or two extra pieces of information on people — a date, a number, a yes/no answer — use [Custom Fields](../settings/custom-fields.md) instead of a form. They're quicker to fill in and are searchable directly in Advanced Search.
:::

## Managing Households {#managing-households}

Households let you link family members together. This is especially useful for [check-in](../attendance/check-in.md), where a parent can check in all their children at once.

1. On a person's profile, click **Edit** next to the **Household** heading on the left.
2. The household editor will open. Select the **household role** for the current person (e.g., Head, Spouse, Child, Other).
3. Click the **Add** icon to add another household member.
4. Under **Add Household Member**, type the person's name in the search box and press **Enter** or click the search icon. (Before you type, a short list of **Recent people** is shown -- the people you picked most recently in any person search, then the newest people in B1.)
5. When the person appears in the results, click their name or the add icon next to it. The search stays open with the same results, so you can add several family members from one search of the last name. People already in the household are left out of the results.
6. Choose each new member's household role and click **Save** to complete the household setup. Nothing is saved until you click **Save**.

If the person isn't in B1 yet, click **Add New Person** under the search instead. Along with name, title, email, and mobile phone, the dialog asks for their **Household Role** (Head, Spouse, Child, or Other). The new person is created and placed in this household with that role; click **Save** to finish.
