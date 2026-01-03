---
layout: page
app: b1Admin
section: People
title: Adding People
---

# How to Add People in B1.church Admin

<div id="videoContainer">
  <ul id="playlist">
      <li class="active"><a href="/videos/b1Admin/adding-people/output.mp4" data-steps="adding-people-steps">Adding People</a></li>
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

<div id="adding-people-steps" class="video-steps active">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">Navigate to the B1.church Admin dashboard</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/adding-people/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">Click on People in the left sidebar</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/adding-people/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">Click the Add Person button in the upper right corner</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/adding-people/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">Fill in the person's first name, last name, and email address, then click Add</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/adding-people/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">The person's profile page will open. Click the edit pencil next to their name to edit their details</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/adding-people/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">Fill in additional information such as middle name, membership status, dates, address, and phone numbers</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/adding-people/6.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">7.</span><span class="step-text">Click on the Notes tab to add notes about the person</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/adding-people/7.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">8.</span><span class="step-text">Click on the Groups tab to view group memberships</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/adding-people/8.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">9.</span><span class="step-text">Click on the Attendance tab to view attendance records</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/adding-people/9.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">10.</span><span class="step-text">Click on the Donations tab to view donations</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/adding-people/10.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">11.</span><span class="step-text">Click on the Forms dropdown to select a form to fill out. These forms are user defined forms which you can build by following the forms tutorial</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/adding-people/11.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">12.</span><span class="step-text">Click Add Form to open the form</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/adding-people/12.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">13.</span><span class="step-text">Fill in the form details and click Save</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/adding-people/13.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">14.</span><span class="step-text">Return to the Details tab and click Save to save the personal information</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/adding-people/14.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">15.</span><span class="step-text">The details are now saved and visible on the profile</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/adding-people/15.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">16.</span><span class="step-text">To add household members, click the edit pencil next to the household name</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/adding-people/16.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">17.</span><span class="step-text">The household editor will open. Select the household role for the current person</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/adding-people/17.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">18.</span><span class="step-text">After selecting the role, click Add to add another household member</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/adding-people/18.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">19.</span><span class="step-text">Type the person's name in the search box and click Search</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/adding-people/19.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">20.</span><span class="step-text">When the person appears in the search results, click Select</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/adding-people/20.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">21.</span><span class="step-text">Choose their household role and click Save to complete the household setup</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/adding-people/21.png" onclick="showModal(this.src)"></div>
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

- <a href="/b1Admin/advanced-search.html">Advanced Search</a>
- <a href="/b1Admin/assigning-roles.html">Assigning Roles</a>
- <a href="/b1Admin/forms.html">Forms</a>
