---
title: "Importing Data"
---

# Importing Data

B1 Admin makes it easy to bring your existing member data into the system. You can import from a CSV file or migrate directly from Breeze ChMS.

## Importing from CSV

If you have member data in a spreadsheet or another system, you can import it using a CSV (comma-separated values) file.

1. Go to **Settings** in the left sidebar.
2. Click **Import/Export** in the top navigation.
3. Select **B1 Import Zip** from the **Data Source** dropdown.
4. Click the link to **download sample files** so you can see the expected format.
5. Open the sample `people.csv` file and replace the sample data with your own. Keep the header row intact.
6. If you have member photos, add them to the folder using 400x300px images, naming them to match the `importKey` numbers in your CSV.
7. Compress your edited files into a zip file.
8. Back in B1 Admin, click **Upload** and select your zip file.
9. Review the data preview and click **Continue to Destination**.
10. Verify **B1 Database** is selected, review the import summary, and click **Start Transfer**.
11. Wait for the import to complete, then click **Go to B1** to return to your dashboard.

:::tip
Always download and review the sample files first. Matching the expected column format will prevent import errors.
:::

## Importing from Breeze ChMS

If you are migrating from Breeze, B1 has a dedicated import option that handles the conversion automatically.

1. In Breeze, go to **Settings** and click **Export** in the left sidebar.
2. Export three files: **People**, **Tags**, and **Contributions**.
3. Select all three exported files, right-click, and compress them into a single zip file.
4. In B1 Admin, go to **Settings** then **Import/Export**.
5. Select **Breeze Import Zip** from the **Data Source** dropdown.
6. Upload your zip file and follow the on-screen steps to review and complete the import.

:::info
The Breeze import transfers people, photos, groups, donations, attendance, forms, and more -- giving you a complete migration in one step.
:::

## After Importing

Once your import is complete, take a few minutes to verify your data:

1. Browse the **People** page and spot-check a few profiles.
2. Confirm that names, emails, phone numbers, and addresses came through correctly.
3. Check that household connections are intact.
4. Review any groups or tags that were imported.

If you notice any issues, you can edit individual profiles directly from the People page.
