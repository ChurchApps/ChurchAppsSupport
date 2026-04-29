---
title: "Importing Data"
---

# Importing Data

<div class="article-intro">

The B1 Transfer tool makes it easy to bring your existing data into B1, whether you are starting fresh from a spreadsheet, migrating from another church management platform, or importing giving records. It can also be used to export or back up your data at any time.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need an active B1 Admin account with access to **Settings**.
- Have your data exported and ready from your previous system before starting.
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

Select where your data is coming from. There are seven options:

- **B1 Database** — Pulls data directly from your existing B1 church. Useful for making a backup or converting your data to another format. You must be logged in to use this option.
- **B1 Import Zip** — A zip file in B1's own format. This is primarily used to restore a previous B1 export.
- **Breeze Import Zip** — A zip file containing exported files from Breeze ChMS.
- **Planning Center Zip** — A zip or CSV file exported from Planning Center.
- **Custom CSV / Excel** — Any CSV or Excel file containing people data. After uploading, you will map your columns to B1 fields before the import proceeds.
- **Tithe.ly CSV** — A people or giving export file from Tithe.ly (CSV or Excel format accepted).
- **CCB / Pushpay CSV** — A people or giving export CSV from Church Community Builder or Pushpay.

You can drag and drop your file onto the upload area, or click to browse for it.

---

## Step 1b - Map Your Fields (Custom CSV / Excel only)

If you selected **Custom CSV / Excel**, after uploading your file the tool will show a field mapping screen before moving to the preview.

Each column from your file is listed alongside a sample value. For each column, use the dropdown to choose the matching B1 field. The tool will auto-detect common column names like "First Name," "Email," or "Zip Code," but you should review every row and correct anything it missed.

Available B1 fields include:

- First Name, Last Name, Middle Name, Nickname, Display Name, Title/Prefix, Suffix
- Email, Home Phone, Mobile Phone, Work Phone
- Address Line 1, Address Line 2, City, State, Zip Code
- Birth Date, Gender, Marital Status, Membership Status
- Household/Family Name
- Group Name — assigns the person to a group by name
- **Form Answer (custom field)** — saves that column's value as a custom field attached to the person's record. If you use this option, you will be asked to give the form a name.

Columns you do not want to import can be set to **(Skip)**. At least one name field (First Name or Last Name) must be mapped before you can continue.

Click **Confirm Mapping & Import** to proceed to the preview.

---

## Step 2 - Preview Your Data

After uploading, the tool displays a preview of everything that will be imported. Use the tabs to review each data type:

- **People** — Listed by household, with photos if included.
- **Groups** — Organized by campus, service, time, and category.
- **Attendance** — Session dates, groups, and visit counts.
- **Donations** — Batches, funds, donors, and amounts.
- **Forms** — Form names and content types.

Review this carefully before proceeding. If something looks wrong, click **Start Over** and correct your source file.

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

---

## Preparing a Tithe.ly Export

1. In Tithe.ly, export your **People** data as a CSV or Excel file. You can also export a separate **Giving** file if you want to bring in donation records.
2. The tool will automatically detect whether the file contains people or giving data based on the column names.
3. Upload the file using the **Tithe.ly CSV** option in Step 1.

:::info
Tithe.ly exports can be imported one file at a time. Run the process twice if you need to import both people and giving records separately.
:::

---

## Preparing a CCB or Pushpay Export

1. In Church Community Builder or Pushpay, export your **People** data as a CSV file. You can also export a separate giving/contributions file.
2. The tool will automatically detect whether the file contains people or giving data based on the column names.
3. Upload the file using the **CCB / Pushpay CSV** option in Step 1.

---

## After Importing

Once the transfer is complete, take a few minutes to verify your data:

1. Browse the [People](../people/adding-people.md) page and spot-check a few profiles.
2. Confirm that names, emails, phone numbers, and addresses came through correctly.
3. Check that household connections are intact.
4. Review any imported groups and giving records.

If you notice issues, you can edit individual profiles from the People page. You can also run the transfer tool again to [export your data](exporting-data.md) as a backup.
