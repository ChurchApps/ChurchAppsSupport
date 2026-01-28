# Website Tutorial Reorganization - Backup Documentation

**Date:** 2026-01-28

## Original Setup

### Original Files (Before Reorganization)
- `website-intro.md` - Section: Admin - Standalone intro tutorial with 32 accordion steps
- `website-setup.md` - Section: Admin - Setup page with multiple video playlists
- `website-elements.md` - Section: Admin - Elements page with multiple video playlists

### Sidebar Structure (Before)
All website tutorials appeared under the **Admin** section in the sidebar:
- Admin
  - Website - Introduction
  - Website - Setup
  - Website - Elements
  - (plus other admin tutorials)

## New Setup

### New Files (After Reorganization)
- `website-initial-setup.md` - Section: Website - Playlist: Getting Started, Global Appearance, Domain Configuration
- `website-page-setup.md` - Section: Website - Playlist: Creating Pages, Sections, Text/Photo, Video/Card/Location, Rows, Containers, Church-Specific
- `website-advanced.md` - Section: Website - Playlist: Reusable Blocks, File Management, Advanced Options

### Sidebar Structure (After)
Website tutorials appear under their own **Website** section in the sidebar:
- Website
  - Initial Setup
  - Page Setup
  - Advanced

## Backup Files

Backup copies saved with "old-" prefix:
- `old-website-intro.md`
- `old-website-setup.md`
- `old-website-elements.md`

## How to Revert (If Needed)

If the new structure doesn't work and you need to go back:

```bash
cd /Users/terrybyrd/ChurchAppsSupport/b1Admin

# Delete new files
rm website-initial-setup.md
rm website-page-setup.md
rm website-advanced.md

# Restore original files from backups
cp old-website-intro.md website-intro.md
cp old-website-setup.md website-setup.md
cp old-website-elements.md website-elements.md

# Commit the revert
git add .
git commit -m "Revert website tutorial reorganization"
git push origin main
```

## Video Tutorial Mapping

### Videos in Initial Setup
- `/videos/b1/website/website-intro/output.mp4` (Getting Started)
- `/videos/b1/website/appearance/output.mp4` (Global Appearance)
- `/videos/b1/website/domain/output.mp4` (Domain Configuration)

### Videos in Page Setup
- `/videos/b1/website/pages/output.mp4` (Creating Pages)
- `/videos/b1/website/sections/output.mp4` (Sections)
- `/videos/b1/website/text-photo/output.mp4` (Text and Photo)
- `/videos/b1/website/video-card-location/output.mp4` (Video, Card, Location)
- `/videos/b1/website/rows/output.mp4` (Rows)
- `/videos/b1/website/containers/output.mp4` (Containers)
- `/videos/b1/website/church/output.mp4` (Church-Specific)

### Videos in Advanced
- `/videos/b1/website/blocks/output.mp4` (Reusable Blocks)
- `/videos/b1/website/files/output.mp4` (File Management)
- `/videos/b1/website/advanced/output.mp4` (Advanced Options)

## Testing Checklist

- [ ] Website section appears in sidebar
- [ ] All 3 pages load correctly
- [ ] Video playlists work on each page
- [ ] Videos play correctly
- [ ] Related tutorial links work
- [ ] No broken links
- [ ] Mobile responsive

## Cleanup Instructions (After Testing)

Once everything is confirmed working:

```bash
cd /Users/terrybyrd/ChurchAppsSupport/b1Admin

# Delete backup files
rm old-website-intro.md
rm old-website-setup.md
rm old-website-elements.md

# Delete this documentation file
rm WEBSITE_REORGANIZATION_BACKUP.md

# Commit cleanup
git add .
git commit -m "Clean up website tutorial reorganization backups"
git push origin main
```
