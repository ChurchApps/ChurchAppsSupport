---
layout: page
app: b1Admin
section: "12 Data"
title: Import from Breeze
---

# Importing Data from Breeze Church Management into B1.church Admin

<div id="videoContainer">
  <ul id="playlist">
    <li class="active">
      <a href="/videos/b1Admin/import-breeze/output.mp4" data-steps="import-breeze-steps">How to Import Data from Breeze into B1.church Admin</a>
    </li>
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

<div id="import-breeze-steps" class="video-steps active">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">Log into Breeze and click the settings gear icon</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-breeze/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">Select settings to manage your organization</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-breeze/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">Click Export in the left sidebar</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-breeze/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">Select People and click Export</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-breeze/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">Select Tags and click Export</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-breeze/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">Select Contributions and click Export</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-breeze/6.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">7.</span><span class="step-text">Locate and select all three exported files on your desktop</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-breeze/7.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">8.</span><span class="step-text">Right-click and compress the files into a zip</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-breeze/8.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">9.</span><span class="step-text">Log into B1.church Admin and click Settings</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-breeze/9.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">10.</span><span class="step-text">Click Import/Export button</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-breeze/10.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">11.</span><span class="step-text">Click Choose One dropdown under Step 1 - Import Source</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-breeze/11.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">12.</span><span class="step-text">Select Breeze Import Zip from the dropdown</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-breeze/12.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">13.</span><span class="step-text">Upload the zip file you created</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-breeze/13.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">14.</span><span class="step-text">Review the data preview and click Continue</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-breeze/14.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">15.</span><span class="step-text">Select B1 Database as the export destination</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-breeze/15.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">16.</span><span class="step-text">Review the import summary and proceed to Step 4</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-breeze/16.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">17.</span><span class="step-text">Watch the export progress with checkmarks for all items</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-breeze/17.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">18.</span><span class="step-text">Click Go to B1 to return to your dashboard</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-breeze/18.png" onclick="showModal(this.src)"></div>
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

## Key Features

- **Direct Import**: B1 has a dedicated "Breeze Import Zip" option that automatically converts Breeze data
- **Three Required Files**: Export People, Tags, and Contributions from Breeze
- **Complete Data Transfer**: Imports people, photos, groups, donations, attendance, forms, and more

## Related Tutorials

- <a href="/b1Admin/import-csv.html">Import from CSV</a>

## Additional Resources

- [Breeze Export Documentation](https://support.breezechms.com/hc/en-us/articles/360001160713-Exporting-People)
- [Tithely Export Guide](https://support.tithe.ly/hc/en-us/articles/32166404593175-Exporting-Your-People-Data)
