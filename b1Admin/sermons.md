---
layout: page
app: b1Admin
section: "02 Admin"
title: Stream - Sermons
order: 3
---

# How to Add a Sermon


<div id="videoContainer">
  <ul id="playlist">
      <li class="active"><a href="/videos/b1/streaming/sermon/output.mp4" data-steps="sermon-steps">Add a Sermon Video</a></li>
      <li><a href="/videos/b1/streaming/live/output.mp4" data-steps="live-steps">Add a Live Stream URL</a></li>
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

<div id="sermon-steps" class="video-steps active">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">From the Dashboard, click on Sermons in the left sidebar to access your sermon library.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/sermon/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">On the Sermons page, click the Add Sermon button in the top right corner and select Add Sermon from the dropdown.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/sermon/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">Select a Playlist for your sermon, choose YouTube as the video provider, then enter the YouTube video ID and click Fetch.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/sermon/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">We recommend YouTube for your video library. However, we also support Vimeo, Facebook, or your own Custom URL.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/sermon/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">When you click Fetch, all of the video details will be imported automatically. Make any changes you wish and click Save.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/sermon/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">The sermon will now appear in your sermons list, organized by playlist.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/sermon/6.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">7.</span><span class="step-text">To schedule this sermon for a live stream, go to Live Stream Times and select your sermon from the Video Settings dropdown.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/sermon/7.png" onclick="showModal(this.src)"></div>
</div>
</div>

<div id="live-steps" class="video-steps">
<h3>Steps</h3>
<parameter name="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">To set up a permanent live stream that automatically shows whatever is currently live on your YouTube channel, start from the Dashboard and click on "Sermons" in the left sidebar.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/live/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">From the Sermons page, click the "Add Sermon" button in the top right corner.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/live/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">From the dropdown menu, select "Add Permanent Live URL". This option allows you to create a permanent connection to your YouTube channel's live stream.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/live/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">On the Edit Permanent Live URL page, the Video Provider is set to "Current YouTube Live Stream" by default. You can also choose YouTube, Vimeo, Facebook, or Custom Embed URL if needed.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/live/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">You'll need your YouTube Channel ID to connect your live stream. Enter it in the YouTube Channel ID field.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/live/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">If you don't know your Channel ID, click the help link to see instructions on how to find it in your YouTube account settings.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/live/6.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">7.</span><span class="step-text">After entering your Channel ID, add a title and description for your live stream. For example, "First Ironwood Church Worship Service" with a description like "Weekly Worship Service for First Ironwood Church". Then click "Save".</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/live/7.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">8.</span><span class="step-text">Now you need to schedule when this live stream will be available. Click on "Live Stream Times" in the top navigation.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/live/8.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">9.</span><span class="step-text">On the Live Stream Times page, click the "Add Service" button to create a new scheduled service time.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/live/9.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">10.</span><span class="step-text">In the Add New Service form, enter a Service Name like "Sunday Morning" and set your Service Time. For example, 9:00 AM on Sundays.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/live/10.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">11.</span><span class="step-text">Set "Recurs Weekly" to "Yes" if this is a regular weekly service, or "No" if it's a one-time event. Most churches will choose "Yes" for their regular Sunday services.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/live/11.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">12.</span><span class="step-text">Configure your Chat Settings by setting how many minutes before and after the service the chat should be enabled. Under Video Settings, you can set how early to start showing the video for countdown or pre-service content.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/live/12.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">13.</span><span class="step-text">In the Sermon dropdown under Video Settings, select the permanent live URL you just created, "First Ironwood Church Worship Service". This connects your scheduled service to your live stream.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/live/13.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">14.</span><span class="step-text">Click "Save" to schedule your service. Your live stream is now configured and will automatically appear at the scheduled time.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/live/14.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">15.</span><span class="step-text">You'll see your service listed under Services. To customize your streaming page further, click on the "Settings" tab at the top.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/live/15.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">16.</span><span class="step-text">In Settings, you can configure Content Tabs like Calendar, Chat, and Prayer requests that will appear alongside your stream. Click "View Your Stream" to see how it will look to your viewers.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/live/16.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">17.</span><span class="step-text">Your live stream page is now ready. Viewers will see your church logo, the next scheduled service time, and can access the tabs you configured. When you go live on YouTube, the stream will automatically appear on this page.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/live/17.png" onclick="showModal(this.src)"></div>
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
- <a href="/b1Admin/youtube-channel-id.html">Get Your YouTube Channel ID</a>
- <a href="/b1Admin/website-setup.html">Website Builder</a>
- <a href="https://vimeo.com/760360001">OBS Basics</a>
