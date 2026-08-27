---
title: "Importazione Dati"
---

# Importing Data

<div class="article-intro">

The B1 Transfer tool makes it easy Per bring your existing data into B1, whether you are starting fresh from a spreadsheet, migrating from another church management platform, or importing giving records. It can also be used Per Esporta or Indietro up your data at any Ora.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- You need an Attivo B1 Admin Account with access Per **Impostazioni**.
- Have your data exported and ready from your previous system before starting.
- This tool is intended for initial data migration. If you have already been using B1 for a while, importing again may Crea duplicate records.

</div>

## Accessing the Transfer Tool

1. Log in Per **B1 Admin**.
2. Apri the **menu della sezione** in the angolo in alto a sinistra (the section name with the small arrow) and Scegli **Impostazioni**.
3. Fai clic the **Importa/Esporta** button in the top right of the page header.
4. This will Apri the **B1 Transfer** tool in a new tab at [transfer.b1.church](https://transfer.b1.church).

The transfer tool walks you through four steps: Source, Preview, Destination, and Run.

---

## Step 1 - Scegli Your Source

Seleziona where your data is coming from. There are seven options:

- **B1 Database** — Pulls data directly from your existing B1 church. Useful for making a backup or converting your data Per another format. You must be logged in Per use this option.
- **B1 Importa Zip** — A zip file in B1's own format. This is primarily used Per restore a previous B1 Esporta.
- **Breeze Importa Zip** — A zip file containing exported files from Breeze ChMS.
- **Planning Center Zip** — A zip or CSV file exported from Planning Center.
- **Custom CSV / Excel** — Any CSV or Excel file containing people data. After uploading, you will map your columns Per B1 fields before the Importa proceeds.
- **Tithe.ly CSV** — A people or giving Esporta file from Tithe.ly (CSV or Excel format accepted).
- **CCB / Pushpay CSV** — A people or giving Esporta CSV from Church Community Builder or Pushpay.

You can drag and drop your file onto the Carica area, or Fai clic Per browse for it.

---

## Step 1b - Map Your Fields (Custom CSV / Excel only)

If you selected **Custom CSV / Excel**, after uploading your file the tool will show a field mapping screen before moving Per the preview.

Each column from your file is listed alongside a sample value. For each column, use the dropdown Per Scegli the matching B1 field. The tool will auto-detect common column names like "First Name," "Email," or "Zip Code," but you should review every row and correct anything it missed.

Disponibile B1 fields include:

- First Name, Last Name, Middle Name, Nickname, Display Name, Title/Prefix, Suffix
- Email, Home Phone, Mobile Phone, Work Phone
- Address Line 1, Address Line 2, City, State, Zip Code
- Birth Data, Gender, Marital Status, Membership Status
- Household/Family Name
- Gruppo Name — assigns the person Per a Gruppo by name
- **Modulo Answer (custom field)** — saves that column's value as a custom field attached Per the person's record. If you use this option, you will be asked Per give the form a name.

Columns you do not want Per Importa can be set Per **(Skip)**. At least one name field (First Name or Last Name) must be mapped before you can continue.

Fai clic **Confirm Mapping & Importa** Per proceed Per the preview.

---

## Step 2 - Preview Your Data

After uploading, the tool displays a preview of everything that will be imported. Use the tabs Per review each data Digita:

- **People** — Listed by household, with photos if included.
- **Gruppi** — Organized by campus, Servizio, Ora, and category.
- **Frequenza** — Sessione dates, Gruppi, and visit counts.
- **Donations** — Batches, funds, donors, and amounts.
- **Forms** — Modulo names and content types.

Review this carefully before proceeding. If something looks wrong, Fai clic **Start Over** and correct your source file.

---

## Step 3 - Scegli Your Destination

Seleziona where you want the data Per go:

- **B1 Database** — Imports directly into your church's B1 database. After selecting this, the tool will show a final count of records Per be added. Fai clic **Start Transfer** Per confirm.
- **B1 Esporta Zip** — Downloads your data as a B1-format zip file. Good for backups.
- **Breeze Esporta Zip** — Converts your data Per Breeze format.
- **Planning Center Zip** — Converts your data Per Planning Center format.

:::warning
The source and destination cannot be the same format. If they match, the tool will warn you Per prevent accidental duplication.
:::

---

## Step 4 - Run

The tool processes the transfer and shows progress for each step:

- Campuses, Servizi, and Times
- People
- Photos
- Gruppi and Gruppo Membri
- Donations
- Frequenza
- Forms, Questions, Answers, and Modulo Submissions
- Compressing (for zip file destinations only)

:::warning
Do not Chiudi your browser while the transfer is running. Wait until all steps show as complete.
:::

---

## Preparing a Breeze Importa Zip

1. In Breeze, go Per **Impostazioni** and Fai clic **Esporta** in the left sidebar.
2. Esporta three separate files: **People**, **Tags**, and **Contributions**.
3. Seleziona all three files, right-Fai clic, and compress them into a single zip file.
   - On a Mac: Seleziona the files, right-Fai clic, and Scegli **Compress**.
   - On a PC: Seleziona the files, right-Fai clic, Scegli **Send Per**, then **Compressed (zipped) folder**.
4. Carica the zip file using the **Breeze Importa Zip** option in Step 1.

The Breeze Importa transfers people, Gruppi (tags), and donation records automatically.

---

## Preparing a Planning Center Esporta

1. Log in Per Planning Center and Apri the **People** product.
2. In the left sidebar, Fai clic **Lists** and Crea a list that includes everyone you want Per bring over. (If you already have a list of your whole congregation, use that one.)
3. Apri the list and use its **Esporta** option Per Scarica your people as a **CSV** file. Include the fields you want Per keep — name, email, phone, address, birthdate, gender, and membership status all map over Per B1.
4. If Planning Center gives you more than one file, Seleziona them all, right-Fai clic, and compress them into a single zip.
   - On a Mac: Seleziona the files, right-Fai clic, and Scegli **Compress**.
   - On a PC: Seleziona the files, right-Fai clic, Scegli **Send Per**, then **Compressed (zipped) folder**.
5. Carica the CSV or zip using the **Planning Center Zip** option in Step 1.

After uploading, continue Per the preview and confirm your people and households look right before running the Importa.

---

## Preparing a Tithe.ly Esporta

1. In Tithe.ly, Esporta your **People** data as a CSV or Excel file. You can also Esporta a separate **Giving** file if you want Per bring in donation records.
2. The tool will automatically detect whether the file contains people or giving data based on the column names.
3. Carica the file using the **Tithe.ly CSV** option in Step 1.

:::info
Tithe.ly exports can be imported one file at a Ora. Run the process twice if you need Per Importa both people and giving records separately.
:::

---

## Preparing a CCB or Pushpay Esporta

1. In Church Community Builder or Pushpay, Esporta your **People** data as a CSV file. You can also Esporta a separate giving/contributions file.
2. The tool will automatically detect whether the file contains people or giving data based on the column names.
3. Carica the file using the **CCB / Pushpay CSV** option in Step 1.

---

## After Importing

Once the transfer is complete, take a few minutes Per verify your data:

1. Browse the [People](../people/adding-people.md) page and spot-check a few Profili.
2. Confirm that names, emails, phone numbers, and addresses came through correctly.
3. Check that household connections are intact.
4. Review any imported Gruppi and giving records.

If you notice issues, you can Modifica individual Profili from the People page. You can also run the transfer tool again Per [export your data](exporting-data.md) as a backup.
