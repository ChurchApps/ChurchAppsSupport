---
layout: page
app: b1Admin
section: "09 Giving"
title: Manual-Input
---

# How to Manually Input Donations in B1.church Admin

<div id="videoContainer">
  <ul id="playlist">
      <li class="active"><a href="/videos/b1Admin/manual-input/output.mp4" data-steps="manual-input-steps">Manually Inputting Donations</a></li>
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

<div id="manual-input-steps" class="video-steps active">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">Welcome to the Manual Donation Entry tutorial for B1 Admin. This guide will show you how to manually enter donations into a batch.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/manual-input/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">Navigate to the Batches page and click Add Batch to create a new batch for organizing donations.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/manual-input/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">Enter a batch name and select the date, then click Save.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/manual-input/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">Your new batch appears in the list showing zero donations and zero dollars.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/manual-input/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">Click on the batch name to open it and begin entering donations.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/manual-input/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">Type a person's name in the search field to find the donor.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/manual-input/6.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">7.</span><span class="step-text">After selecting a person, the donation entry form displays with fields for date, payment method, fund, amount, and check number.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/manual-input/7.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">8.</span><span class="step-text">Fill in the amount and check number, then click Add Donation.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/manual-input/8.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">9.</span><span class="step-text">The donation is added to the table below and the form resets for the next entry.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/manual-input/9.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">10.</span><span class="step-text">To split a donation across multiple funds, click the Edit button on the donation row.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/manual-input/10.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">11.</span><span class="step-text">The edit form opens showing all the donation details that can be modified.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/manual-input/11.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">12.</span><span class="step-text">You can split a donation across multiple funds by adding amounts to different funds. The total will automatically calculate from the fund amounts.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/manual-input/12.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">13.</span><span class="step-text">Click Save to update the donation with your multi-fund allocation. You now know how to manually enter donations and split them across multiple funds.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/manual-input/13.png" onclick="showModal(this.src)"></div>
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

## Related Tutorials

- <a href="/b1Admin/donation-report.html">Donation Report</a>
- <a href="/b1Admin/reports.html">Reports</a>
