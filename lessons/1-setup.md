---
layout: page
app: lessons
section: " Lessons.church"
title: Setup Lessons.church
---

# Setting up Lessons.Church

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; padding: 30px; margin-bottom: 30px; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);">
  <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
    <span style="background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); padding: 8px 20px; border-radius: 20px; font-weight: bold; color: white; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; border: 2px solid rgba(255,255,255,0.3);">🚀 Coming Soon</span>
    <h2 style="margin: 0; color: white; font-size: 28px; font-weight: 800;">Lessons.Church Admin is Moving to B1.church!</h2>
  </div>

  <p style="color: rgba(255,255,255,0.95); font-size: 18px; line-height: 1.6; margin-bottom: 20px;">
    Get ready for an amazing upgrade! We're bringing Lessons.church directly into B1.church Admin for a seamless experience.
  </p>

  <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 8px; padding: 20px; margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.2);">
    <h3 style="color: white; margin-top: 0; font-size: 20px; margin-bottom: 15px;">✨ What's New?</h3>
    <ul style="color: rgba(255,255,255,0.9); font-size: 16px; line-height: 1.8; margin: 0; padding-left: 25px;">
      <li><strong>Schedule lessons right in B1Admin</strong> - No more switching between apps!</li>
      <li><strong>New TV Player Coming</strong> - Better than ever with improved performance</li>
      <li><strong>Seamless Integration</strong> - Everything in one place</li>
    </ul>
  </div>

  <div style="background: rgba(255, 193, 7, 0.15); backdrop-filter: blur(10px); border-left: 4px solid #ffc107; padding: 15px 20px; border-radius: 6px; margin-bottom: 20px;">
    <p style="margin: 0; color: white; font-size: 16px;">
      <strong>📅 Start Scheduling Now!</strong> You can begin scheduling your lessons in B1Admin today. The new TV player app will be available soon to present your scheduled lessons.
    </p>
  </div>

  <video controls style="width: 100%; border-radius: 8px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
    <source src="../videos/b1Admin/lesson-scheduling/output.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <p style="color: rgba(255,255,255,0.8); font-size: 14px; margin-top: 10px; text-align: center;">
    Watch: How to Schedule Lessons.church Content in B1Admin
  </p>
</div>

<div id="videoContainer">
  <ul id="playlist">
      <li class="active"><a href="../videos/lessons/register/output.mp4" data-steps="register-steps">Register Your Church</a></li>
      <li><a href="../videos/lessons/groups/output.mp4" data-steps="groups-steps">Create Groups</a></li>
      <li><a href="../videos/lessons/create-classroom/output.mp4" data-steps="classroom-steps">Create a Classroom</a></li>
      <li><a href="../videos/lessons/schedule-lesson/output.mp4" data-steps="schedule-steps">Schedule Lessons</a></li>
      <li><a href="../videos/lessons/customize-lessons/output.mp4" data-steps="customize-steps">Customize Lessons</a></li>
      <li><a href="../videos/lessons/connect-mobile/output.mp4" data-steps="mobile-steps">Connect Mobile App</a></li>
      <li><a href="../videos/lessons/connect-tv/output.mp4" data-steps="tv-steps">Connect TV App</a></li>
      <li><a href="../videos/lessons/connect_to_signpresenter/output.mp4" data-steps="signpresenter-steps">Connect to SignPresenter</a></li>
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
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">Click Add First Classroom</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/create-classroom/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">Enter a name for your classroom (e.g., Elementary Class)</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/create-classroom/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">Select the Volunteer Team we created earlier (Elementary Teachers)</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/create-classroom/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">Select the Parent/Student Group we created (Parents Of Elementary Kids)</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/create-classroom/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">Click Save to create your classroom</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/create-classroom/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">Your classroom is created and ready to use</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/create-classroom/6.png" onclick="showModal(this.src)"></div>
</div>
</div>

<div id="schedule-steps" class="video-steps">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">Click on your classroom to open it</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/schedule-lesson/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">Click Add First Schedule</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/schedule-lesson/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">Select Date, Program, Study, Lesson, and Venue, then click Save</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/schedule-lesson/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">Your first lesson is scheduled - click Add Schedule for more</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/schedule-lesson/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">System auto-selects next week and next lesson in series - just Save</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/schedule-lesson/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">Multiple lessons scheduled - continue to build your full schedule</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/schedule-lesson/6.png" onclick="showModal(this.src)"></div>
</div>
</div>

<div id="customize-steps" class="video-steps">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">Click the small but powerful Customize link next to any scheduled lesson</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/customize-lessons/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">View all sections in the lesson that you can customize</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/customize-lessons/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">Click a section to select it, then click the trash icon to remove</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/customize-lessons/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">Choose This Classroom or All Classrooms - useful when sharing lessons across rooms</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/customize-lessons/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">Removed sections show in red with strikethrough</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/customize-lessons/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">Use the up/down arrows to reorder sections</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/customize-lessons/6.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">7.</span><span class="step-text">Apply changes to just this classroom or all classrooms as needed</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/customize-lessons/7.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">8.</span><span class="step-text">Your customized lesson is ready to present</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/customize-lessons/8.png" onclick="showModal(this.src)"></div>
</div>
</div>

<div id="mobile-steps" class="video-steps">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">Download the B1 Church app from the Apple App Store or Google Play Store</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect-mobile/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">Open the app and you'll see the Church Search screen</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect-mobile/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">Type your church name in the search field</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect-mobile/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">Select your church from the search results</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect-mobile/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">On the home screen, tap the menu icon in the top left corner</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect-mobile/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">From the side menu, tap the Login button at the bottom</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect-mobile/6.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">7.</span><span class="step-text">The login screen opens where you can sign in with your account</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect-mobile/7.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">8.</span><span class="step-text">Enter your Lessons.church email and password, then tap Sign In</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect-mobile/8.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">9.</span><span class="step-text">After logging in, you'll see your Lessons card - tap it to view lessons</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect-mobile/9.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">10.</span><span class="step-text">Select a scheduled lesson from your classrooms</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect-mobile/10.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">11.</span><span class="step-text">View the lesson with section tabs - tap any tab to jump to that section</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect-mobile/11.png" onclick="showModal(this.src)"></div>
</div>
</div>

<div id="tv-steps" class="video-steps">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">Present lessons on any Android streaming device (Fire TV, Onn from Walmart, Android 10+)</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect-tv/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">Hold the blue mic button and say "Download Lessons Dot Church App" or search manually</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect-tv/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">Open the app to see the Browse Programs screen with available curriculum</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect-tv/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">Go to Settings using the gear icon, then select Your Church to set it up</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect-tv/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">Type your church name or scan the QR code with your phone for easier setup</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect-tv/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">Select your church from the search results</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect-tv/6.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">7.</span><span class="step-text">Choose the classroom you want to present lessons for</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect-tv/7.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">8.</span><span class="step-text">Wait for the lesson to download - this allows offline playback</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect-tv/8.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">9.</span><span class="step-text">Once downloaded, select Start Lesson to begin presenting</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect-tv/9.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">10.</span><span class="step-text">Your lesson is now playing on the big screen</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect-tv/10.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">11.</span><span class="step-text">Press the up arrow to see all videos - select any to jump directly to it</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect-tv/11.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">12.</span><span class="step-text">Use your remote to play, pause, and navigate through the lesson</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect-tv/12.png" onclick="showModal(this.src)"></div>
</div>
</div>

<div id="signpresenter-steps" class="video-steps">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">In Lessons.church, click the RSS icon next to your classroom (use correct venue)</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect_to_signpresenter/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">Right-click "this url" and select Copy Link Address</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect_to_signpresenter/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">In SignPresenter, go to Playlists tab and select Horizontal</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect_to_signpresenter/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">Choose External Feed, or subscribe to bigBigWorship and other feeds for later use</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect_to_signpresenter/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">Name your playlist and paste the feed URL, then click Save</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect_to_signpresenter/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">Select a pre-built feed, or click Create a New Custom Playlist</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect_to_signpresenter/6.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">7.</span><span class="step-text">Name your custom playlist (e.g., Preschool) - add slides and playlists to it</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect_to_signpresenter/7.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">8.</span><span class="step-text">Click the Playlists tab in Available Content to see your saved playlists</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect_to_signpresenter/8.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">9.</span><span class="step-text">Click on a playlist like Ark Kids Feed to add it to your custom playlist</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect_to_signpresenter/9.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">10.</span><span class="step-text">Add bigBigWorship content for countdowns, worship songs, and games (updated weekly)</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect_to_signpresenter/10.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">11.</span><span class="step-text">Click the gear icon to set start/end points for each feed</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect_to_signpresenter/11.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">12.</span><span class="step-text">Break your playlist into sections (slides 1-3, countdown, slides 3-9, worship, etc.)</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect_to_signpresenter/13.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">13.</span><span class="step-text">Go to Screens tab - add to Schedule (recommended, auto-advance) or Manual Playlist</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect_to_signpresenter/12.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">14.</span><span class="step-text">Upload your own videos or images in My Content > Messages</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/lessons/connect_to_signpresenter/14.png" onclick="showModal(this.src)"></div>
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
      document.querySelectorAll('#playlist li').forEach(function(li) {
        li.classList.remove('active');
      });
      this.parentElement.classList.add('active');
      if (stepsId) {
        var stepsEl = document.getElementById(stepsId);
        if (stepsEl) stepsEl.classList.add('active');
      }
    });
  });

  // Handle direct links via URL hash (e.g., #tv or #mobile)
  var hash = window.location.hash.replace('#', '');
  if (hash) {
    var link = document.querySelector('#playlist a[data-steps="' + hash + '-steps"]');
    if (link) link.click();
  }
});
</script>
