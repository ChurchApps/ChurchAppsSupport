---
layout: page
app: b1Admin
section: Forms
title: Forms
---

# How to Create Forms in B1.church Admin

<div id="videoContainer">
  <ul id="playlist">
      <li class="active"><a href="/videos/b1Admin/forms/output.mp4" data-steps="forms-steps">Creating Forms</a></li>
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

<div id="forms-steps" class="video-steps active">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">Click on Settings to get started with Forms</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">Click on the Forms tab in the top menu</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">Click Add Form to create a new form</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">Enter a name for your form and associate it with People</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">Choose between People or Stand Alone from the dropdown</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">Click Save to create your form</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/6.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">7.</span><span class="step-text">Your new form appears in the list - click on it to add questions</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/7.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">8.</span><span class="step-text">Click Add Question to create fields</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/8.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">9.</span><span class="step-text">The Provider dropdown determines the input field type</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/9.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">10.</span><span class="step-text">Options include Textbox, Date, Email, Phone Number, Multiple Choice, and Payment</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/10.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">11.</span><span class="step-text">Fill in the Title and Description - check Require an answer if mandatory</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/11.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">12.</span><span class="step-text">Click Save, then Add Question for more fields</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/12.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">13.</span><span class="step-text">Go to People from the navigation menu</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/13.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">14.</span><span class="step-text">Click on a person to view their profile</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/14.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">15.</span><span class="step-text">Click on the Forms tab to access forms</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/15.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">16.</span><span class="step-text">Select Date of Membership from the dropdown</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/16.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">17.</span><span class="step-text">Click Add Form to enter data</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/17.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">18.</span><span class="step-text">Enter the date and click Save</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/18.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">19.</span><span class="step-text">Go back to People</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/19.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">20.</span><span class="step-text">Click the filter icon</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/20.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">21.</span><span class="step-text">Click Custom and check Date of Membership</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/21.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">22.</span><span class="step-text">Click Apply Filters</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/22.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">23.</span><span class="step-text">The list now shows the Date of Membership column</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/23.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">24.</span><span class="step-text">Create a Stand Alone form - click Add Form</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/24.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">25.</span><span class="step-text">Create Men's Retreat as Stand Alone with availability dates and thank you message</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/25.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">26.</span><span class="step-text">Stand Alone forms get a unique URL - click the form to configure it</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/26.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">27.</span><span class="step-text">Click Add Question</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/27.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">28.</span><span class="step-text">Add a Name field and check Require an answer</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/28.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">29.</span><span class="step-text">Add questions for Name, Email, Phone, and Payment</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/29.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">30.</span><span class="step-text">Click Form Members to manage administrators</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/30.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">31.</span><span class="step-text">Search and add people as Admin or View Only</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/31.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">32.</span><span class="step-text">Form Submissions shows completed registrations</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/32.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">33.</span><span class="step-text">To embed forms on your website, go to Website</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/33.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">34.</span><span class="step-text">Click Add Page</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/34.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">35.</span><span class="step-text">Select Blank, enter Men's Retreat, and Save</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/35.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">36.</span><span class="step-text">Click the plus icon to add elements</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/36.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">37.</span><span class="step-text">Add a Section and choose colors</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/37.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">38.</span><span class="step-text">Click plus and select Form</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/38.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">39.</span><span class="step-text">Click Select to choose the form</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/39.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">40.</span><span class="step-text">Select Men's Retreat and Save</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/40.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">41.</span><span class="step-text">Your form is now embedded and ready for registrations</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1Admin/forms/41.png" onclick="showModal(this.src)"></div>
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
- <a href="/b1Admin/automations.html">Automations</a>
- <a href="/b1Admin/adding-people.html">Adding People</a>
