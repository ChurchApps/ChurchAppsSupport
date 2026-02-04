# Import from Breeze Tutorial

## Status
**READY FOR SCREENSHOTS** - Script and page completed, awaiting screenshot capture

## Overview
This tutorial guides users through importing data from Breeze Church Management (Tithely) into B1.church Admin using the direct "Breeze Import Zip" feature.

## Key Difference from Manual Import
- B1 has a **dedicated "Breeze Import Zip" option** that automatically converts Breeze data
- No manual column mapping needed - the system handles all conversions automatically
- Much simpler than the CSV import process

## Tutorial Flow (16 steps)

### Part 1: Export from Breeze (Steps 1-4)
1. Log into Breeze, navigate to General Settings
2. Click Export in sidebar, open Select Data to Export dropdown
3. Select People, click Export
4. Download the Breeze export file

### Part 2: Import into B1 (Steps 5-16)
5. Log into B1.church Admin, click Settings
6. Click Import/Export in Tools section
7. Click Login button to re-authenticate
8. Click Choose One dropdown under Step 1 - Import Source
9. Select "Breeze Import Zip" from dropdown
10. Upload your Breeze export file
11. Review data preview, click Continue
12. Select "Chums Database" as export destination
13. Review import summary, proceed to Step 4
14. View export progress with checkmarks for all items
15. Wait for import process to complete
16. Click "Go to Chums" to return to dashboard

## Items Imported
The import includes:
- Campuses/Services/Times
- People
- Photos
- Groups
- Group Members
- Donations
- Attendance
- Forms
- Questions
- Answers
- Form Submissions

## Next Steps to Complete

1. **Capture Screenshots (16 total)**
   - Use screenshot helper: `/Users/terrybyrd/TutorialMaker/tools/macos-screenshot/screenshot.sh`
   - Must be exactly 1920x1080
   - Name sequentially: 1.png, 2.png, ... 16.png
   - You'll need access to:
     - Breeze ChMS account (for export screenshots)
     - B1.church Admin account (for import screenshots)
     - Sample data to demonstrate the process

2. **Generate Video**
   ```bash
   cd /Users/terrybyrd/ChurchAppsSupport/videos/b1Admin/import-breeze
   node /Users/terrybyrd/TutorialMaker/bin/tutorial-maker.js
   ```

3. **Test Locally**
   ```bash
   cd /Users/terrybyrd/ChurchAppsSupport
   bundle exec jekyll serve
   ```
   Visit: http://localhost:4000/b1Admin/import-breeze.html

4. **Deploy**
   ```bash
   git add .
   git commit -m "Add import from Breeze tutorial"
   git push origin main
   ```

## Key Points to Capture in Screenshots

### Breeze Side (Steps 1-4):
- Breeze General Settings screen
- Export section in left sidebar
- "Select Data to Export" dropdown showing People, Tags, Events, Contributions, Notes
- Download confirmation or exported file

### B1 Side (Steps 5-16):
- B1 Settings page
- Import/Export tool in Tools section
- "Important: you must login again" message with Login button
- Step 1 - Import Source dropdown
- "Breeze Import Zip" option highlighted
- Upload interface
- Step 2 - Preview showing households and people data
- Step 3 - Choose Export Destination with "Chums Database" option
- Import summary screen
- Step 4 - Export Progress with checkmarks for all items
- Completion message: "This process may take some time. It is important that you do not close your browser until it has finished."
- "Go to Chums" button

## Notes

- Script created and matches backup screenshots (script.xml)
- Markdown page created with proper accordion format (../../b1Admin/import-breeze.md)
- Backup of old files saved to backup-20260204/
- This is simpler than import-csv tutorial because B1 has native Breeze import support

## References

- Breeze Export Docs: https://support.breezechms.com/hc/en-us/articles/360001160713-Exporting-People
- Tithely Export Guide: https://support.tithe.ly/hc/en-us/articles/32166404593175-Exporting-Your-People-Data
