---
layout: page
app: lessons
section: " Lessons.church"
title: Setup Lessons.church
---

# Setting up Lessons.Church

<div id="videoContainer">
  <ul id="playlist">
      <li class="active"><a href="../videos/lessons/register/output.mp4" data-steps="register-steps">Register Your Church</a></li>
      <li><a href="../videos/lessons/groups/output.mp4" data-steps="groups-steps">Create Groups</a></li>
      <li><a href="../videos/lessons/create-classroom/output.mp4" data-steps="classroom-steps">Create a Classroom</a></li>
      <li><a href="../videos/lessons/schedule-lesson/output.mp4" data-steps="schedule-steps">Schedule Lessons</a></li>
      <li><a href="../videos/lessons/connect.mp4" data-steps="connect-steps">Connect Apps</a></li>
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

<div id="groups-steps" class="video-steps">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">Click your profile icon in the top right</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/groups/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">Click Switch App, then select B1.church</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/groups/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">Click your name in the Member Portal</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/groups/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">Select Admin Portal</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/groups/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">This is the B1.church Dashboard</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/groups/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">Click Dashboard dropdown and select Serving</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/groups/6.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">7.</span><span class="step-text">Click Add Ministry</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/groups/7.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">8.</span><span class="step-text">Enter a name for your ministry</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/groups/8.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">9.</span><span class="step-text">Type Children's Ministry and click Add</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/groups/9.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">10.</span><span class="step-text">Click Manage to configure your ministry</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/groups/10.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">11.</span><span class="step-text">Click the Teams tab</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/groups/11.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">12.</span><span class="step-text">Click Create Team</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/groups/12.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">13.</span><span class="step-text">Enter a name like Elementary Teachers and click Add</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/groups/13.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">14.</span><span class="step-text">Click Dashboard dropdown and select People</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/groups/14.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">15.</span><span class="step-text">Click Groups in the top navigation</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/groups/15.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">16.</span><span class="step-text">Click Add Group</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/groups/16.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">17.</span><span class="step-text">Click Category Name dropdown and select Add New</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/groups/17.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">18.</span><span class="step-text">Enter Parents as category and Parents Of Elementary Kids as group name, click Add</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/groups/18.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">19.</span><span class="step-text">Your parent group is now created</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/groups/19.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">20.</span><span class="step-text">Click your profile icon and select Switch App</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/groups/20.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">21.</span><span class="step-text">Click Lessons.church</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/groups/21.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">22.</span><span class="step-text">You're back in Lessons.church - click Add First Classroom to continue</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/groups/22.png" onclick="showModal(this.src)"></div>
</div>
</div>

<div id="register-steps" class="video-steps active">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">Visit lessons.church and click the Register button</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/register/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">Enter your first name, last name, and email address, then click Register</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/register/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">Check your email for a verification link (check spam if needed)</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/register/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">Click the email link and set your password, then click Sign In</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/register/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">Click in the search box to select your church</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/register/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">Search for your church, or click Register a New Church if not found</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/register/6.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">7.</span><span class="step-text">Click OK on the confirmation dialog</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/register/7.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">8.</span><span class="step-text">Enter your church information and click Save</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/register/8.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">9.</span><span class="step-text">Click on your church to select it</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/register/9.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">10.</span><span class="step-text">You're all set! You can now access the classroom management dashboard</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/register/10.png" onclick="showModal(this.src)"></div>
</div>
</div>

<div id="classroom-steps" class="video-steps">
<h3>Steps</h3>
<p><em>Steps coming soon...</em></p>
</div>

<div id="schedule-steps" class="video-steps">
<h3>Steps</h3>
<p><em>Steps coming soon...</em></p>
</div>

<div id="connect-steps" class="video-steps">
<h3>Steps</h3>
<p><em>Steps coming soon...</em></p>
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
