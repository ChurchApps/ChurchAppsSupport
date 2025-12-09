---
layout: page
app: b1Admin
section: Groups
title: Group Calendar
---

# How to set up a Group Calendar in B1.church Admin

<div id="videoContainer">
  <ul id="playlist">
      <li class="active"><a href="/videos/b1Admin/calendars/output.mp4" data-steps="calendar-steps">Setting up a Group Calendar</a></li>
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

<div id="calendar-steps" class="video-steps active">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">Let's make a new group and set up the group calendar. Navigate to the B1.church Admin dashboard then to People</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">Choose Groups</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">Click Add Group in the top right corner to add a group</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">Choose a category name or make a new category</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">Give your group a name</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">Now click on your group name</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/6.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">7.</span><span class="step-text">Click the edit pencil</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/7.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">8.</span><span class="step-text">Fill in as much information as you like</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/8.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">9.</span><span class="step-text">Be sure to click save</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/9.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">10.</span><span class="step-text">To add a person to the group type their name then click add</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/10.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">11.</span><span class="step-text">You can also add members by leaving the search bar blank and hitting search</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/11.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">12.</span><span class="step-text">Choose a person to be the leader of the group. The leader of the group is the only person who can edit the calendar. Any group member can see a list of events and comment on them</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/12.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">13.</span><span class="step-text">Navigate to the drop down menu at the top right of your screen</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/13.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">14.</span><span class="step-text">Choose switch app</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/14.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">15.</span><span class="step-text">Go to B1.church</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/15.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">16.</span><span class="step-text">On the left side of your screen choose groups</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/16.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">17.</span><span class="step-text">Choose your group to edit the calendar. In this case Master's Men</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/17.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">18.</span><span class="step-text">Click calendar on the left hand side of the screen</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/18.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">19.</span><span class="step-text">Click add an event</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/19.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">20.</span><span class="step-text">Give the event a title</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/20.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">21.</span><span class="step-text">Write a short description of the event</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/21.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">22.</span><span class="step-text">Add a start time</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/22.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">23.</span><span class="step-text">And an end time</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/23.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">24.</span><span class="step-text">Click the recurring box if the event is recurring</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/24.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">25.</span><span class="step-text">You can choose intervals so the event will recur every so many days. For instance if you put three in the interval box it will repeat every third day</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/25.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">26.</span><span class="step-text">Or you can choose frequency by day, week or month</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/26.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">27.</span><span class="step-text">This event will repeat every Saturday</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/27.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">28.</span><span class="step-text">There are multiple ways to view the calendar, Month</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/28.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">29.</span><span class="step-text">Week</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/29.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">30.</span><span class="step-text">Day</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/30.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">31.</span><span class="step-text">And agenda</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/31.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">32.</span><span class="step-text">Click the event to see details. Members and leaders can start a conversation within the event and leaders can edit</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/32.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">33.</span><span class="step-text">You can add your calendar to your google calendar (or any other calendar) by clicking subscribe. You can also make a curated calendar to add to your website. Follow the curated calendar tutorial below</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/calendars/33.png" onclick="showModal(this.src)"></div>
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
- <a href="/b1Admin/curated-calendar.html">Curated Calendar</a>
