---
layout: page
app: b1Admin
section: Data
title: Exporting Data From B1.church Admin
---

# Exporting Data from B1.church Admin

<div id="videoContainer">
  <ul id="playlist">
    <li class="active">
      <a href="/videos/b1Admin/export-data/output.mp4" data-steps="export-data-steps">How to Export Data from B1.church Admin</a>
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

<div id="export-data-steps" class="video-steps active">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">Click on the Settings icon in the B1.church Admin dashboard</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/export-data/1.png" onclick="showModal(this.src)"></div>

  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">Click on the Import/Export button to access the import and export tool</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/export-data/2.png" onclick="showModal(this.src)"></div>

  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">Click on the Data Source dropdown in Step 1 - Import Source</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/export-data/3.png" onclick="showModal(this.src)"></div>

  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">Select "B1 Database" from the dropdown menu to export your B1 church data</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/export-data/4.png" onclick="showModal(this.src)"></div>

  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">Review the preview of data to be exported and click "Continue to Destination"</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/export-data/5.png" onclick="showModal(this.src)"></div>

  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">Click on the Export Destination dropdown in Step 3</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/export-data/6.png" onclick="showModal(this.src)"></div>

  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">7.</span><span class="step-text">Select "B1 Export Zip" to create a zip file containing all your exported data</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/export-data/7.png" onclick="showModal(this.src)"></div>

  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">8.</span><span class="step-text">Monitor the export progress with green check marks. Wait for the process to finish</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/export-data/8.png" onclick="showModal(this.src)"></div>

  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">9.</span><span class="step-text">View the downloaded B1Export file in the Recent Download History</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/export-data/9.png" onclick="showModal(this.src)"></div>

  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">10.</span><span class="step-text">Locate and unzip the B1Export file in your downloads folder</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/export-data/10.png" onclick="showModal(this.src)"></div>

  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">11.</span><span class="step-text">Open CSV files like people.csv with Excel or Numbers to view your exported data</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/export-data/11.png" onclick="showModal(this.src)"></div>
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
