---
layout: page
app: b1Admin
section: Attendance
title: Checkin Setup
---

# Setting up Kids Check-in for your Church

<div id="videoContainer">
  <ul id="playlist">
    <li class="active"><a href="/videos/b1Admin/checkin-setup/output.mp4" data-steps="checkin-steps">Setting up Check-in</a></li>
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

<div id="checkin-steps" class="video-steps active">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">Navigate to the B1 Dashboard, click on People in the left sidebar.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/checkin-setup/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">Search for the person you'd like to add. If they're not found, you can add them as a new person by filling out the form below.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/checkin-setup/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">Enter their first name, last name, and email address, then click Add.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/checkin-setup/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">You'll be taken to their profile page. Click the edit pencil next to their name to add more details.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/checkin-setup/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">Fill in any additional information you have, such as address, phone numbers, and birth date, then click Save.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/checkin-setup/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">To add family members, click the edit pencil in the Household section.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/checkin-setup/6.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">7.</span><span class="step-text">Click the Add button to add family members to this household.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/checkin-setup/7.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">8.</span><span class="step-text">Next, click on Attendance in the top navigation to set up your services.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/checkin-setup/8.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">9.</span><span class="step-text">Click the plus icon in the top right to add a new campus.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/checkin-setup/9.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">10.</span><span class="step-text">Enter the name of your campus and click Save.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/checkin-setup/10.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">11.</span><span class="step-text">Now click Add Service under your new campus to create a service.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/checkin-setup/11.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">12.</span><span class="step-text">Enter the service name and click Save.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/checkin-setup/12.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">13.</span><span class="step-text">Click Add Service Time to add the time for this service.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/checkin-setup/13.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">14.</span><span class="step-text">Enter the service time and click Save.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/checkin-setup/14.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">15.</span><span class="step-text">Now click on Groups in the top navigation to create groups for check-in.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/checkin-setup/15.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">16.</span><span class="step-text">Click the Add Group button to create a new group.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/checkin-setup/16.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">17.</span><span class="step-text">Select an existing category or choose Add New to create a new category.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/checkin-setup/17.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">18.</span><span class="step-text">Enter the category name and group name, then click Add.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/checkin-setup/18.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">19.</span><span class="step-text">Click on the group you just created to configure it for check-in.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/checkin-setup/19.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">20.</span><span class="step-text">Click the edit pencil to modify the group settings.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/checkin-setup/20.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">21.</span><span class="step-text">Configure your attendance settings. Set Track Attendance to Yes to track who attends. Set Parent Pickup and Print Nametag to Yes if you want to print kid and parent tags at check-in.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/checkin-setup/21.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">22.</span><span class="step-text">Select any labels that apply to this group, then choose a service time from the dropdown.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/checkin-setup/22.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">23.</span><span class="step-text">Click Add to include the service time, then click Save. Your group is now ready for check-in.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/checkin-setup/23.png" onclick="showModal(this.src)"></div>
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

---

## 📱 Quick Setup Guide

### Step 1: Install the App
Download the B1.church Checkin App:
- **Android/Samsung Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
- **Amazon Fire Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/ref=sr_1_1?crid=1QFBOJWLLND2V&dib=eyJ2IjoiMSJ9.oVXLGb2R_L_fNluWNoL4OA.OJSpR1ZcSnSgpurqLjniy2T1Ah3idGLa4_n21Itvmv4&dib_tag=se&keywords=B1+Checkin&qid=1763047568&s=mobile-apps&sprefix=b1+checkin%2Cmobile-apps%2C124&sr=1-1)

### Step 2: Configure Your Printer
Follow the [printer instructions](https://support.brother.com/g/b/downloadtop.aspx?c=us&lang=en&prod=lpql1110nwbeus&_ga=2.156293496.295918436.1665227103-2042905656.1665227103&_gl=1*6hne9l*_ga*MjA0MjkwNTY1Ni4xNjY1MjI3MTAz*_ga_NCEW43SJ8W*MTY2NTIyNzEwMy4xLjEuMTY2NTIyNzE0MS4yMi4wLjA.) to connect it to the same WiFi network as your tablet. [Watch setup video](https://www.youtube.com/watch?v=U5pmTRddt2w).

### Step 3: Connect and Test
Watch this tutorial to connect your printer and print your first name tag:

<video controls width="100%">
  <source src="../videos/b1Admin/checkin-app/output.mp4" type="video/mp4">
</video>

---

## 🛒 What You'll Need

### Tablets
Any of these will work with the app:
- **Compact:** [Samsung Galaxy Tab A7 Lite 8.7"](https://amzn.to/3E0zYaz)
- **Large Screen:** [Samsung Galaxy Tab A8 10.5"](https://amzn.to/3rdXRnm)
- **Budget:** [Amazon Fire HD 10](https://amzn.to/4aHfvpK)

### Printers
Check-ins only work with Brother Printers:
- **Best:** [Brother QL-1110NWB](https://amzn.to/3K9QPL1) - Multiple tablets, Bluetooth + WiFi
- **Good:** [Brother QL-810W](https://amzn.to/3Scj6mf) - Multiple tablets, WiFi only
- **Budget:** [Brother QL-1100](https://amzn.to/3Sps8eX) - WiFi only *(untested but should work)*

### Labels
Only compatible labels: [Brother DK-1201 (1-1/7" x 3-1/2")](https://amzn.to/3LVbEsA)
