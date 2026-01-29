---
layout: page
app: b1Admin
section: "06 Groups"
title: Groups Setup
---

# How to Set Up Groups in B1.church Admin

<div id="videoContainer">
  <ul id="playlist">
      <li class="active"><a href="/videos/b1Admin/groups/output.mp4" data-steps="groups-steps">Setting Up Groups</a></li>
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

<div id="groups-steps" class="video-steps active">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">Navigate to the B1 dashboard</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/groups/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">Click on the Groups tab</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/groups/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">Click Add Group and enter a Category Name</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/groups/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">Enter the Group Name</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/groups/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">Click Add. Your new group will appear in the list</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/groups/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">Click on the group name, then click the pencil icon</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/groups/6.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">7.</span><span class="step-text">Configure the group settings including attendance tracking, meeting times, group description, and service times. Click Save</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/groups/7.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">8.</span><span class="step-text">Click the Members tab and search for a person or scroll through your database</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/groups/8.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">9.</span><span class="step-text">Click the Add button next to the person's name</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/groups/9.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">10.</span><span class="step-text">Your group members are now listed. Use the green key icon to designate group leaders</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/groups/10.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">11.</span><span class="step-text">Send messages to all group members. Type your message and click Send</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/groups/11.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">12.</span><span class="step-text">To export your group data, click the download icon</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/groups/12.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">13.</span><span class="step-text">All your church groups are organized by categories</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/groups/13.png" onclick="showModal(this.src)"></div>
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

- <a href="/b1Admin/group-roster.html">Group Roster</a>
- <a href="/b1Admin/group-calendar.html">Group Calendar</a>
