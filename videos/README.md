# ChurchApps Video Tutorial Guide

This guide explains how to create video tutorials for the ChurchApps Support site.

## Tutorial Structure

Each tutorial consists of:
1. **Screenshots** - Numbered PNG images (1.png, 2.png, 3.png, etc.)
2. **Script.xml** - XML file with narration and timing marks
3. **output.mp4** - Generated video file (created by TutorialMaker)

## Creating a Tutorial

### Using TutorialScreenshot App

The **TutorialScreenshot.app** (located on Desktop) automates the screenshot process:

**Features:**
- Automatically captures Chrome browser in fullscreen (no URL bar)
- Resizes screenshots to 1920x1080 for consistent video output
- Auto-numbers screenshots sequentially (1.png, 2.png, 3.png, etc.)
- Supports multiple displays with display selection

**How to Use:**
1. Open the webpage/app you want to capture in Google Chrome
2. Run **TutorialScreenshot.app** from your Desktop
3. If you have multiple displays, a dialog will appear:
   - Select "Display 1 (Main)" for your main display
   - Select "Display 2 (Extended)" for your extended display
   - If you only have one display, this is skipped automatically
4. The app will:
   - Make Chrome fullscreen
   - Wait 5.5 seconds for animations to settle
   - Take a screenshot of the selected display
   - Exit fullscreen
   - Save to `~/Desktop/Screenshots/` with the next available number

**Important Notes:**
- Screenshots are saved to: `/Users/[username]/Desktop/Screenshots/`
- The app only captures the Chrome browser content, not your wallpaper or other windows
- If you have multiple displays, only the selected display's screenshot is saved
- Numbers continue from the last screenshot (if 7.png exists, next will be 8.png)
- To start a new tutorial, move existing screenshots to your tutorial folder first

**Workflow:**
1. Clear or move old screenshots from `~/Desktop/Screenshots/`
2. Run TutorialScreenshot.app and select your display
3. Click through your tutorial steps, running the app for each screenshot
4. When done, move all numbered screenshots to your tutorial directory:
   ```
   mv ~/Desktop/Screenshots/*.png /Users/terrybyrd/ChurchAppsSupport/videos/[app]/[tutorial-name]/
   ```

### 1. Take Screenshots (Manual Method)
Alternative to TutorialScreenshot app:
- Capture each step of the process as numbered PNG files
- Name them sequentially: 1.png, 2.png, 3.png, etc.
- Place in a directory under the appropriate app folder (e.g., `/videos/b1Admin/tutorial-name/`)

### 2. Write the Script
Create a `script.xml` file in the same directory:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<tutorial>
    <speak>
    <break time="1s"/>
    <mark name="1" />
    First instruction here.
    <break time="1s"/>
    <mark name="2" />
    Second instruction here.
    <break time="1s"/>
    <mark name="3" />
    Third instruction here.
    <break time="2s"/>
    <mark name="end"/>
    </speak>
</tutorial>
```

### 3. Generate the Video
Run TutorialMaker from the tutorial directory:
```bash
cd /Users/terrybyrd/ChurchAppsSupport/videos/[app]/[tutorial-name]
node /Users/terrybyrd/TutorialMaker/bin/tutorial-maker.js
```

This creates `output.mp4` in the same directory.

## Adding Tutorial to Documentation Page

When adding a tutorial to a documentation page (e.g., `b1Admin/intro.md`), use the **accordion-style collapsible steps format**:

### Complete Example

```markdown
---
layout: page
app: b1Admin
section: " Getting Started"
title: Page Title
---

# Page Heading

Introduction text here.

<div id="videoContainer">
  <ul id="playlist">
      <li class="active"><a href="/videos/b1Admin/tutorial1/output.mp4" data-steps="tutorial1-steps">Tutorial 1 Name</a></li>
      <li><a href="/videos/b1Admin/tutorial2/output.mp4" data-steps="tutorial2-steps">Tutorial 2 Name</a></li>
  </ul>
</div>

<style>
.video-steps { display: none; margin-top: 20px; }
.video-steps.active { display: block; }
.step-accordion { border: 1px solid #333; border-radius: 4px; overflow: hidden; }
.step-header { display: flex; align-items: center; padding: 10px 15px; cursor: pointer; background: #1a1a1a; border-bottom: 1px solid #333; transition: background 0.2s; }
.step-header:hover { background: #252525; }
.step-header:last-child { border-bottom: none; }
.step-num { font-weight: bold; color: #08c; margin-right: 10px; min-width: 30px; }
.step-text { color: #ccc; flex: 1; }
.step-arrow { color: #666; transition: transform 0.2s; }
.step-header.active .step-arrow { transform: rotate(180deg); }
.step-content { display: none; padding: 15px; background: #121212; border-bottom: 1px solid #333; text-align: center; }
.step-content.active { display: block; }
.step-content img { max-width: 100%; cursor: pointer; border: 2px solid #333; border-radius: 4px; }
.step-content img:hover { border-color: #08c; }
</style>

<div id="tutorial1-steps" class="video-steps active">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">First step description here</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/tutorial1/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">Second step description here</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/tutorial1/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">Third step description here</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/tutorial1/3.png" onclick="showModal(this.src)"></div>
</div>
</div>

<div id="tutorial2-steps" class="video-steps">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">First step of tutorial 2</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/tutorial2/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">Second step of tutorial 2</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/tutorial2/2.png" onclick="showModal(this.src)"></div>
</div>
</div>

<script>
function toggleStep(header) {
  var content = header.nextElementSibling;
  var isActive = header.classList.contains('active');

  // Close all other steps
  header.parentElement.querySelectorAll('.step-header').forEach(function(h) {
    h.classList.remove('active');
    h.nextElementSibling.classList.remove('active');
  });

  // Toggle this one
  if (!isActive) {
    header.classList.add('active');
    content.classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('#playlist a').forEach(function(link) {
    link.addEventListener('click', function() {
      var stepsId = this.getAttribute('data-steps');
      document.querySelectorAll('.video-steps').forEach(function(el) {
        el.classList.remove('active');
      });
      if (stepsId) {
        var stepsEl = document.getElementById(stepsId);
        if (stepsEl) stepsEl.classList.add('active');
      }
    });
  });
});
</script>

## Additional content...
```

## Key Components

### 1. Playlist with data-steps
Each playlist item must have a `data-steps` attribute that matches the ID of its corresponding steps section:
```html
<li><a href="/videos/app/tutorial/output.mp4" data-steps="tutorial-steps">Tutorial Name</a></li>
```

### 2. Steps Section
Each tutorial must have a steps section with:
- Unique ID matching the `data-steps` attribute (e.g., `id="tutorial-steps"`)
- Class `video-steps` (add `active` to the first tutorial to show by default)
- Step accordion structure with step-header and step-content pairs

### 3. Step Structure
Each step consists of two parts:
```html
<div class="step-header" onclick="toggleStep(this)">
  <span class="step-num">1.</span>
  <span class="step-text">Description of what to do</span>
  <span class="step-arrow">▼</span>
</div>
<div class="step-content">
  <img src="../videos/app/tutorial/1.png" onclick="showModal(this.src)">
</div>
```

### 4. Required CSS and JavaScript
- Always include the `<style>` block with accordion styling
- Always include the `<script>` block with toggleStep() function and DOMContentLoaded listener
- These enable the collapsible accordion behavior and video/steps switching

## Example Real Tutorial
See `/lessons/1-setup.md` for a complete working example with multiple tutorials and accordion steps.

## Notes
- The first tutorial in the playlist should have `class="active"` on the `<li>` element
- The first tutorial's steps section should have `class="video-steps active"` (includes "active")
- All other tutorials' steps sections should have `class="video-steps"` (no "active")
- Step descriptions should be concise but clear about what action to take
- Images are clickable and will open in a modal via the `showModal()` function
