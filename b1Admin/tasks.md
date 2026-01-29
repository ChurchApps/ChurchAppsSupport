---
layout: page
app: b1Admin
section: "12 Automation"
title: Tasks Setup
---

# Setting up Tasks in B1.church Admin

<div id="videoContainer">
  <ul id="playlist">
      <li class="active"><a href="/videos/b1Admin/tasks/output.mp4" data-steps="tasks-steps">Setting up Tasks</a></li>
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

<div id="tasks-steps" class="video-steps active">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">To set up tasks for your leaders, church members, or groups, navigate to the B1.church Admin Dashboard</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/tasks/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">Then click the Add Task button on the right side of your screen</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/tasks/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">Here is where you will fill out the information for your task. Since you are the one that is making the task, it is associated with you</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/tasks/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">Click the assign to box and type in the name of a person or click on group and type the name of a group</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/tasks/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">Hit search</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/tasks/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">Select the person or add them if they are not in the database</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/tasks/6.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">7.</span><span class="step-text">Now give the task a title</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/tasks/7.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">8.</span><span class="step-text">Type in a note to the person the task is assigned to</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/tasks/8.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">9.</span><span class="step-text">Click save</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/tasks/9.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">10.</span><span class="step-text">You can now see the task that you assigned. If you need to edit the task, just click on it and edit</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/tasks/10.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">11.</span><span class="step-text">Now I'll log in as Terry Seven so you can see what the task notification looks like to the person receiving the task</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/tasks/11.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">12.</span><span class="step-text">I'm now logged in as Terry Seven and navigated to the Tasks page</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/tasks/12.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">13.</span><span class="step-text">Here you can see the task assigned to me. You can also see these tasks on the Dashboard and on your mobile app</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/tasks/13.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">14.</span><span class="step-text">You can view your assigned tasks from either the Tasks page or from the Dashboard tasks panel</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/tasks/14.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">15.</span><span class="step-text">Click on the task to open the details. Once the task is completed, you can change the status from open to closed</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/tasks/15.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">16.</span><span class="step-text">Click on the status dropdown and choose closed</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/tasks/16.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">17.</span><span class="step-text">The task is now marked as completed and closed</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/tasks/17.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">18.</span><span class="step-text">Closed tasks will no longer appear in your open tasks list unless you enable Show Closed. To automate a task follow the Automation tutorial below</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/tasks/18.png" onclick="showModal(this.src)"></div>
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

- <a href="/b1Admin/automations.html">Automations</a>
- <a href="/b1Admin/groups.html">Groups</a>
