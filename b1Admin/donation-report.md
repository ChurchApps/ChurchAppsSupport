---
layout: page
app: b1Admin
section: "09 Giving"
title: Donation Report
---

# How to Generate a Donation Report in B1.church Admin

<div id="videoContainer">
  <ul id="playlist">
      <li class="active"><a href="/videos/b1Admin/donation-report/output.mp4" data-steps="donation-report-steps">Generating a Donation Report</a></li>
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

<div id="donation-report-steps" class="video-steps active">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">Welcome to the Donations and Giving Management tutorial for B1 Admin. This guide will show you how to manage donations, funds, and batches.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">From the dashboard, click on Donations in the sidebar to view the donations summary page with charts and filters.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">Click on Batches to manage your donation batches.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">Click on Funds to view and manage donation funds.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">To create a new fund, click the Add Fund button.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">The fund edit form opens with fields for the name and tax deductible status.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/6.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">7.</span><span class="step-text">Enter a name for your fund, such as Building Fund.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/7.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">8.</span><span class="step-text">The Tax Deductible checkbox determines if donations to this fund are included in annual giving statements.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/8.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">9.</span><span class="step-text">Click Save to create the fund.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/9.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">10.</span><span class="step-text">Your new fund now appears in the funds list along with any existing funds.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/10.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">11.</span><span class="step-text">You can click Edit on any fund to modify its settings.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/11.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">12.</span><span class="step-text">The edit form also includes a Delete button if you need to remove a fund.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/12.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">13.</span><span class="step-text">Click on a fund name to view detailed donation history for that specific fund.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/13.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">14.</span><span class="step-text">The fund detail page shows all donations with date range filters and summary statistics.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/14.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">15.</span><span class="step-text">Now let's enter donations. Navigate back to the Batches page to manage donation batches.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/15.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">16.</span><span class="step-text">Click Add Batch to create a new batch for organizing donations.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/16.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">17.</span><span class="step-text">Enter a batch name and select the date, then click Save.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/17.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">18.</span><span class="step-text">Your new batch appears in the list showing zero donations and zero dollars.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/18.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">19.</span><span class="step-text">Click on the batch name to open it and begin entering donations.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/19.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">20.</span><span class="step-text">Type a person's name in the search field to find the donor.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/20.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">21.</span><span class="step-text">After selecting a person, the donation entry form displays with fields for date, payment method, fund, amount, and check number.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/21.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">22.</span><span class="step-text">Fill in the amount and check number, then click Add Donation.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/22.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">23.</span><span class="step-text">The donation is added to the table below and the form resets for the next entry.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/23.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">24.</span><span class="step-text">To edit a donation, click the Edit button on the donation row.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/24.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">25.</span><span class="step-text">The edit form opens showing all the donation details that can be modified.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/25.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">26.</span><span class="step-text">You can split a donation across multiple funds by adding amounts to different funds.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/26.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">27.</span><span class="step-text">Click Save to update the donation with your changes.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/27.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">28.</span><span class="step-text">The Donations Summary page shows visual reports with options to view different report formats.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/28.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">29.</span><span class="step-text">Navigate to Giving Statements to download tax receipts for all donors for a selected year.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/29.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">30.</span><span class="step-text">You can export a csv file for each donor or</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/30.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">31.</span><span class="step-text">You can print all giving statements at once by clicking the Print All Statements button.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/31.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">32.</span><span class="step-text">The print preview shows how each donor's annual giving statement will appear.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/32.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">33.</span><span class="step-text">Back on the Batches page, you can access the Stripe import feature using the link at the bottom.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/33.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">34.</span><span class="step-text">The Stripe Import page lets you select a date range to check for missing transactions.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/34.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">35.</span><span class="step-text">Click Preview to see which transactions would be imported, then Import Missing to complete the import. You now know how to create funds, manage batches, enter donations, and generate giving statements in B1 Admin.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/donation-report/35.png" onclick="showModal(this.src)"></div>
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

- <a href="/b1Admin/manual-input.html">Manual Input</a>
- <a href="/b1Admin/reports.html">Reports</a>

