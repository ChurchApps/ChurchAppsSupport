# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a Jekyll-based documentation site for ChurchApps Support, hosted at https://support.churchapps.org/. The site provides tutorials, documentation, and support content for the ChurchApps ecosystem including B1.church, CHUMS, Lessons.church, and FreeShow.

## Development Commands

**Local Development Setup:**
```bash
gem install jekyll bundler
bundle exec jekyll serve
```

**Build the site:**
```bash
bundle exec jekyll build
```

## Automated Tutorial Update System

### Overview
The repository includes a sophisticated browser automation system for updating the 86 tutorials after UI changes. This system captures real user workflows and generates updated screenshots and scripts.

### Core Files (in `/automation/` directory)
- `tutorial_updater.js` - Main automation script for single tutorials
- `batch_tutorial_updater.js` - Scales to all 86 tutorials
- `test_tutorial_concept.js` - Debug/concept testing script
- `package.json` - Node.js dependencies (Playwright)
- `setup_tutorial_automation.sh` - System setup script
- `TUTORIAL_AUTOMATION_README.md` - Detailed automation documentation

### Setup Requirements
```bash
# Navigate to automation directory
cd automation/

# Install system dependencies (run once)
sudo apt update && sudo apt install -y libnspr4 libnss3 libasound2 libatk-bridge2.0-0 libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxrandr2 libgbm1 libxss1 libatspi2.0-0 libgtk-3-0

# Install Node.js dependencies
npm install

# Install Playwright browsers
npx playwright install chromium
```

### Critical Screenshot Requirements
**ALWAYS follow these rules when updating tutorials:**

1. **Exact Size**: All screenshots MUST be exactly 1920x1080 pixels
   ```javascript
   await this.page.screenshot({ 
     path: filepath, 
     fullPage: false,
     clip: { x: 0, y: 0, width: 1920, height: 1080 }
   });
   ```

2. **Every Screenshot Must Be Unique**: Even if steps are similar, ensure each screenshot shows different content by:
   - Hovering over buttons to highlight them
   - Showing typing in progress (partial form fills)
   - Capturing different UI states
   - Using scroll positions to focus on relevant areas

3. **Progressive Workflow**: Each screenshot should tell part of the story:
   - Step 1: Navigation/page load
   - Step 2: Highlight action button (hover effect)
   - Step 3: Form/modal opened
   - Step 4: Partial data entry (show typing)
   - Step 5: Final result (details page/confirmation)

### Demo Environment
- **URL**: https://chumsdemo.churchapps.org/
- **Login**: demo@chums.org / password
- **Church**: Grace Community Church
- **Note**: Church selection uses `a:has-text("Grace Community Church")` selector

### Common UI Patterns

#### Form Interactions
- Add buttons: `button:has-text("Add Person")`, `button:has-text("Add")`
- Form fields: `input[name="first"]`, `input[name="last"]`, `input[name="email"]`
- Submit: `button[type="submit"]`
- Search: `input[name="searchText"]`, `button:has-text("Search")`

#### Navigation
- Direct URL navigation preferred: `baseUrl + '/people'`
- Use `page.waitForLoadState('networkidle', { timeout: 10000 })` with error handling
- Always scroll to relevant sections: `page.evaluate(() => window.scrollTo(0, 0))`

#### Making Screenshots Unique
```javascript
// Step 2: Highlight button with hover
await this.page.hover('button:has-text("Add Person")');

// Step 4: Show typing in progress  
await this.page.type('input[name="first"]', 'John', { delay: 100 });
// Take screenshot with just first name filled

// Step 5: Navigate to details page after saving
await this.page.click('text=John Doe');
```

### Error Handling Patterns
- Use try/catch with multiple selector fallbacks
- Handle timeouts gracefully with `timeout: 3000`
- Always include debug screenshots for troubleshooting
- Log detailed console messages for each action

### Script Generation
- Preserve SSML structure with `<mark name="N" />` tags
- Match script descriptions to actual screenshot content
- Use modern terminology ("CHUMS dashboard" not "Chums homepage")
- Include timing with `<break time="1s"/>` elements

### Running Tutorial Updates
```bash
# Navigate to automation directory first
cd automation/

# Single tutorial (recommended for testing)
node tutorial_updater.js

# Debug/concept testing
node test_tutorial_concept.js

# Batch process (after validating single tutorials)
node batch_tutorial_updater.js
```

### Quality Validation
After each run, verify:
1. All screenshots are exactly 1920x1080
2. File sizes vary (proving unique content)
3. Each step shows different UI state
4. Final step shows appropriate end state (details page, confirmation, etc.)

## Architecture and Structure

### Content Organization
- **Documentation Pages**: Written in Markdown (.md) located in product-specific directories:
  - `b1/` - B1.church documentation (website, streaming, mobile app)
  - `chums/` - CHUMS church management system docs
  - `lessons/` - Lessons.church documentation
  - `freeshow/` - FreeShow presentation software docs
  - `accounts/` - Account management topics
  - `developer/` - Developer resources and schemas

### Video Tutorial System
- **Tutorial Videos**: Located in `videos/` directory, organized by product
- **Video Scripts**: XML files (script.xml) define tutorial narration using SSML markup
- **Video Playlist**: Custom JavaScript video player (`public/js/video.js`) handles sequential playback
- **Tutorial Assets**: Screenshots and supporting files organized alongside videos
- **86 Total Tutorials**: Across 5 product categories requiring automated updates

### Layout System
- **Jekyll Layouts**: Located in `_layouts/`
  - `default.html` - Main layout with dark theme, Bootstrap 5, navigation
  - `home.html` - Homepage layout
  - `app.html`, `attendance.html`, `page.html` - Specialized layouts
- **Includes**: Reusable components in `_includes/` (navbar, sidebar, footer)
- **Styling**: Custom CSS in `public/css/` with dark theme (#121212 background)

### Navigation Structure
- **Sidebar Navigation**: Dynamically generated based on directory structure
- **Section-based Organization**: Each page belongs to a product section
- **Cross-app Integration**: Documentation covers switching between apps in the ChurchApps ecosystem

### Content Types
- **Tutorial Pages**: Step-by-step guides with embedded videos
- **Reference Documentation**: API schemas, configuration guides
- **Setup Instructions**: Installation and configuration procedures
- **Feature Documentation**: Detailed feature explanations with screenshots

## Key Technical Details

### Video Tutorial Format
- Uses custom XML script format with SSML `<speak>` tags and `<mark>` elements for synchronization
- Screenshots numbered sequentially (1.png, 2.png, etc.) correspond to script markers
- Generated MP4 files with synchronized narration
- Each `<mark name="N" />` corresponds to N.png screenshot

### Jekyll Configuration
- Uses Jekyll 4.2.2 with minimal plugins
- Dark theme with custom CSS overrides
- Bootstrap 5 for responsive layout
- No theme gem dependency - custom layouts throughout

### Content Conventions
- Each documentation page includes frontmatter with layout and section metadata
- Cross-references between apps use consistent naming (B1, CHUMS, Lessons)
- Screenshots and media assets stored alongside content in product directories
- Tutorial updates create `-new` directories for testing before replacing originals