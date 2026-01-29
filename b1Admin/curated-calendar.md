---
layout: page
app: b1Admin
section: "08 Calendar"
title: Curated Calendar
---

# How to Create a Curated Calendar in B1.church Admin

<div id="videoContainer">
  <ul id="playlist">
      <li class="active"><a href="/videos/b1Admin/curated-calendar/output.mp4" data-steps="curated-calendar-steps">Creating a Curated Calendar</a></li>
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

<div id="curated-calendar-steps" class="video-steps active">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">From the B1.church Dashboard click on B1.Church</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/curated-calendar/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">Click your name then Click the Admin Portal</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/curated-calendar/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">From the dashboard navigate to the Website section</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/curated-calendar/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">Click on Calendars from the top navigation</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/curated-calendar/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">Click Add Calendar to create a new curated calendar</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/curated-calendar/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">Give your calendar a name and click Create</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/curated-calendar/6.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">7.</span><span class="step-text">Click on the manage events icon to configure your new calendar</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/curated-calendar/7.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">8.</span><span class="step-text">Click Add in the Groups in Calendar section to add groups</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/curated-calendar/8.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">9.</span><span class="step-text">Select a group from the dropdown menu</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/curated-calendar/9.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">10.</span><span class="step-text">Choose whether to add all events or specific events then click Save</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/curated-calendar/10.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">11.</span><span class="step-text">Add as many groups as you want to include in your curated calendar</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/curated-calendar/11.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">12.</span><span class="step-text">Click Subscribe to copy the ICS link or download the file to share your calendar. Your calendar can now be embedded on your website and mobile app</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/curated-calendar/12.png" onclick="showModal(this.src)"></div>
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

- <a href="/b1Admin/groups.html">Groups</a>
- <a href="/b1Admin/group-calendar.html">Group Calendar</a>
