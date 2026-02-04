---
layout: page
app: b1Admin
section: "12 Data"
title: Import from CSV
---

# Importing Data from Excel or CSV into B1.church Admin

<div id="videoContainer">
  <ul id="playlist">
    <li class="active">
      <a href="/videos/b1Admin/import-csv/output.mp4" data-steps="import-csv-steps">How to Import Data from Excel or CSV into B1.church Admin</a>
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

<div id="import-csv-steps" class="video-steps active">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">Click Settings in the left sidebar</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-csv/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">Click Import/Export in the top navigation</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-csv/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">Select B1 Import Zip from the Data Source dropdown</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-csv/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">Click the link to download sample files</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-csv/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">Locate and unzip the sampleImport file on your desktop</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-csv/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">View the unzipped folder contents</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-csv/6.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">7.</span><span class="step-text">Edit people.csv with your data, keeping the header row</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-csv/7.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">8.</span><span class="step-text">Replace sample photos with your own (400x300px) matching importKey numbers</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-csv/8.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">9.</span><span class="step-text">Return to B1 and click Upload</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-csv/9.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">10.</span><span class="step-text">Select your prepared zip file and click Open</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-csv/10.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">11.</span><span class="step-text">Review the imported data preview and click Continue to Destination</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-csv/11.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">12.</span><span class="step-text">Verify B1 Database is selected and review the import summary</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-csv/12.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">13.</span><span class="step-text">Click Start Transfer to begin importing</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-csv/13.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">14.</span><span class="step-text">Wait for the import process to complete</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-csv/14.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">15.</span><span class="step-text">Click Go to B1 to return to your dashboard</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/import-csv/15.png" onclick="showModal(this.src)"></div>
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
