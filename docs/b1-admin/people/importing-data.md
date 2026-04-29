---
title: "Importing Data"
---

# Importing Data

<div class="article-intro">

The B1 Transfer tool makes it easy to bring your existing data into B1, whether you are starting fresh from a spreadsheet or migrating from another church management platform like Breeze or Planning Center. It can also be used to export or back up your data at any time.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need an active B1 Admin account with access to **Settings**.
- Have your data ready in the appropriate format for your import source (see the sections below).
- This tool is intended for initial data migration. If you have already been using B1 for a while, importing again may create duplicate records.

</div>

## Accessing the Transfer Tool

1. Log in to **B1 Admin**.
2. Go to **Settings** in the left sidebar.
3. Click the **Import/Export** button in the top right of the page header.
4. This will open the **B1 Transfer** tool in a new tab at [transfer.b1.church](https://transfer.b1.church).

The transfer tool walks you through four steps: Source, Preview, Destination, and Run.

---

## Step 1 - Choose Your Source

Select where your data is coming from. There are four options:

- **B1 Database** — Pulls data directly from your existing B1 church. Useful for making a backup or converting your data to another format. You must be logged in to use this option.
- **B1 Import Zip** — A zip file containing CSV files in B1's format. Use this if you are loading data from a spreadsheet or a system not listed below.
- **Breeze Import Zip** — A zip file containing exported files from Breeze ChMS.
- **Planning Center Zip** — A zip or CSV file exported from Planning Center.

If you select a file-based option, you will be prompted to upload your zip file after choosing the source.

---

## Step 2 - Preview Your Data

After uploading, the tool displays a preview of everything that will be imported. Use the tabs to review each data type:

- **People** — Listed by household, with photos if included.
- **Groups** — Organized by campus, service, time, and category.
- **Attendance** — Session dates, groups, and visit counts.
- **Donations** — Batches, funds, donors, and amounts.
- **Forms** — Form names and content types.

Review this carefully before proceeding. If something looks wrong, start over and correct your source file.

---

## Step 3 - Choose Your Destination

Select where you want the data to go:

- **B1 Database** — Imports directly into your church's B1 database. After selecting this, the tool will show a final count of records to be added. Click **Start Transfer** to confirm.
- **B1 Export Zip** — Downloads your data as a B1-format zip file. Good for backups.
- **Breeze Export Zip** — Converts your data to Breeze format.
- **Planning Center Zip** — Converts your data to Planning Center format.

:::warning
The source and destination cannot be the same format. If they match, the tool will warn you to prevent accidental duplication.
:::

---

## Step 4 - Run

The tool processes the transfer and shows progress for each step:

- Campuses, Services, and Times
- People
- Photos
- Groups and Group Members
- Donations
- Attendance
- Forms, Questions, Answers, and Form Submissions
- Compressing (for zip file destinations only)

:::warning
Do not close your browser while the transfer is running. Wait until all steps show as complete.
:::

---

## Preparing a B1 Import Zip

If you are importing from a spreadsheet or a system other than Breeze or Planning Center, use the B1 Import Zip format.

1. On the **Step 1** screen, select **B1 Import Zip** as your source.
2. Click the link to **download sample files** to see the required column format.
3. Edit the CSV files with your data, keeping the header rows intact. Only `people.csv` is required. All other files are optional.
4. If you have member photos, include them in the zip file and reference their filenames in the `photo` column of `people.csv`.
5. Compress everything into a single zip file and upload it.

The zip file may contain any combination of these files:

| File | Contents |
|------|----------|
| `people.csv` | Names, contact info, and household assignments |
| `services.csv` | Campuses, services, and service times |
| `groups.csv` | Group names, categories, and settings |
| `groupmembers.csv` | Which people belong to which groups |
| `attendance.csv` | Attendance records by person, group, and date |
| `donations.csv` | Giving records by person, fund, batch, and date |
| `forms.csv` | Form definitions |
| `questions.csv` | Questions for each form |
| `formSubmissions.csv` | Submissions linked to people and forms |
| `answers.csv` | Answers to form questions |

---

## Preparing a Breeze Import Zip

1. In Breeze, go to **Settings** and click **Export** in the left sidebar.
2. Export three separate files: **People**, **Tags**, and **Contributions**.
3. Select all three files, right-click, and compress them into a single zip file.
   - On a Mac: select the files, right-click, and choose **Compress**.
   - On a PC: select the files, right-click, choose **Send to**, then **Compressed (zipped) folder**.
4. Upload the zip file using the **Breeze Import Zip** option in Step 1.

The Breeze import transfers people, groups (tags), and donation records automatically.

---

## Preparing a Planning Center Export

1. In Planning Center, export your people data as a CSV or zip file.
2. Upload it using the **Planning Center Zip** option in Step 1.

The Planning Center import transfers people and contact information.

---

## After Importing

Once the transfer is complete, take a few minutes to verify your data:

1. Browse the [People](../people/adding-people.md) page and spot-check a few profiles.
2. Confirm that names, emails, phone numbers, and addresses came through correctly.
3. Check that household connections are intact.
4. Review any imported groups and giving records.

If you notice issues, you can edit individual profiles from the People page. You can also run the transfer tool again to [export your data](exporting-data.md) as a backup.
