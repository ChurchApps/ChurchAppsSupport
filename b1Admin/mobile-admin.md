---
layout: page
app: b1Admin
section: "02 Admin"
title: Mobile Admin
---

# Mobile Admin

Learn how to configure and customize your church's mobile app experience using B1.church Admin.

For further support, please email [support@churchapps.org](mailto:support@churchapps.org).

<div id="videoContainer">
  <ul id="playlist">
      <li class="active"><a href="/videos/b1/admin/overview/output.mp4" data-steps="overview-steps">Mobile Admin Overview</a></li>
      <li><a href="/videos/b1/admin/Tabs/output.mp4" data-steps="tabs-steps">Adding Tabs</a></li>
      <li><a href="/videos/b1/admin/members/output.mp4">Member Tabs</a></li>
      <li><a href="/videos/b1/admin/manual/output.mp4">Manual Tabs</a></li>
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

<div id="overview-steps" class="video-steps active">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">B1 is the platform for communicating with members and visitors of your church. It is broken into two main parts.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/admin/overview/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">A website builder where you can create your primary church website or supplemental web content.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/admin/overview/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">And the member portal that provides various ways for users to interact with your church.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/admin/overview/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">This member portal is also available as a mobile app, the B1.church app.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/admin/overview/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">As an admin, you can configure which tabs appear in the mobile app from the Mobile App Settings page.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/admin/overview/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">Some tabs show up automatically when conditions are met. Others can be manually added by clicking the Add Tab button.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/admin/overview/6.png" onclick="showModal(this.src)"></div>
</div>
</div>

<div id="tabs-steps" class="video-steps">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">This tutorial will help you configure your tabs in the B1 mobile app. From the B1 dashboard, click Settings in the left sidebar.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/admin/Tabs/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">Click on Mobile Apps to access the mobile app settings.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/admin/Tabs/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">Click the Add Tab button in the top right to create a new tab.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/admin/Tabs/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">The Add Tab dialog opens. Enter a name for your tab, such as Website.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/admin/Tabs/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">Click on the icon to choose an icon for your tab.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/admin/Tabs/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">The Select Icon modal opens with various icon options to choose from.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/admin/Tabs/6.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">7.</span><span class="step-text">Click Select Image to add a custom image to your tab.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/admin/Tabs/7.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">8.</span><span class="step-text">Choose your image from the gallery, upload a photo, or stock photos.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/admin/Tabs/8.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">9.</span><span class="step-text">The Tab Type dropdown offers many options including Bible, Live Stream, Donation, and more.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/admin/Tabs/9.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">10.</span><span class="step-text">Enter the URL you want the tab to link to in the URL field.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/admin/Tabs/10.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">11.</span><span class="step-text">Choose the Visibility setting to control who can see this tab.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/admin/Tabs/11.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">12.</span><span class="step-text">Once you've configured all settings, click Save Tab.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/admin/Tabs/12.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">13.</span><span class="step-text">Your new tab now appears in the App Tabs list.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/admin/Tabs/13.png" onclick="showModal(this.src)"></div>
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
- <a href="/b1Admin/website-setup.html">Website Setup</a>
- <a href="/b1Admin/website-elements.html">Page Content - Sections and Elements</a>
