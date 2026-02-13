---
layout: page
app: b1Admin
section: "02 Admin"
title: Stream - Setup
order: 2
---

# Configuring Online Streaming and Sermon Videos

<div id="videoContainer">
  <ul id="playlist">
      <li class="active"><a href="/videos/b1/streaming/services/output.mp4" data-steps="services-steps">Configure Service Times</a></li>
      <li><a href="/videos/b1/streaming/links-tabs/output.mp4" data-steps="links-tabs-steps">Adding Links and Tabs</a></li>
      <li><a href="/videos/b1/streaming/appearance/output.mp4" data-steps="appearance-steps">Set Colors and Logo</a></li>
      <li><a href="/videos/b1/streaming/import/output.mp4" data-steps="import-steps">Import Existing Videos</a></li>
      <li><a href="/videos/b1/streaming/hosts/output.mp4" data-steps="hosts-steps">Adding Hosts</a></li>
      <li><a href="/videos/b1/streaming/sermon/output.mp4" data-steps="sermon-steps">Add a Sermon</a></li>
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

<div id="services-steps" class="video-steps active">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">To configure your live stream times, log into the B1 admin and click on "Sermons".</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/services/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">In the top navigation, click on "Live Stream Times".</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/services/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">Click the "Add Service" button to add a new service.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/services/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">Give your service a name and set the service time. In most cases you'll want to set it as recurring weekly, unless this is a special one-time service.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/services/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">Under "Chat Settings", you can configure how many minutes before and after the service the chat should be enabled. This lets visitors start chatting before service begins and continue afterward. Under "Video Settings", you can set how early to start the video stream for countdown or pre-service content.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/services/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">Then select which sermon to play. "Latest Sermon" automatically plays your most recently added video. "Current live service" plays your current live stream from YouTube. You can also choose any sermon you have already saved. When you're done, click "Save".</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/services/6.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">7.</span><span class="step-text">Your service is now scheduled and will automatically update each week. You can add as many services as you need for your church.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/services/7.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">8.</span><span class="step-text">Visitors will see the next scheduled service time when they visit your streaming page.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/services/8.png" onclick="showModal(this.src)"></div>
</div>
</div>

<div id="links-tabs-steps" class="video-steps">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">To configure navigation links and tabs for your live stream, start from the Dashboard and click on "Sermons" in the left navigation menu.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/links-tabs/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">From the Sermons page, click on the "Live Stream Times" tab to access stream configuration.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/links-tabs/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">On the Live Stream Times page, click the "Settings" button to configure your streaming page options.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/links-tabs/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">In the Settings page, click the add button to add tabs to your livestream.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/links-tabs/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">You can add a tab using any external URL or add one of the pre-designed tabs, chat or prayer. If you add a pre-designed tab just give it a name in the tab Text box and the setup is complete.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/links-tabs/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">To add a linked tab, give the tab a name and click the icon button to change the icon for the tab.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/links-tabs/6.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">7.</span><span class="step-text">Choose from any of the icons listed or search for more icons.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/links-tabs/7.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">8.</span><span class="step-text">Now enter the URL for the tab you just created. In this case, it is the church calendar for First Ironwood Church.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/links-tabs/8.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">9.</span><span class="step-text">Your streaming settings now show all configured navigation links. These will appear on your live streaming page for viewers to access additional resources and interactive features.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/links-tabs/9.png" onclick="showModal(this.src)"></div>
</div>
</div>

<div id="appearance-steps" class="video-steps">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">To set your color scheme and logo for your live stream page, start from the B1 dashboard and click on Website in the left sidebar.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/appearance/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">This opens the Website Pages view where you manage all your pages.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/appearance/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">Click the Appearance tab at the top to access the global appearance settings.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/appearance/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">The Site Styles page loads, showing a preview of your website with your current colors and logos. On the right side you'll see Style Settings options. Click Color Palette to customize your colors.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/appearance/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">The Color Palette dialog opens, showing Base Colors at the top for light, accent, and dark shades, and Semantic Colors below. The stream uses the light accent color with dark text for the header, and the dark accent color with light text for the sidebar.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/appearance/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">Click on any color box to change it. A color picker appears where you can drag the selector to choose your desired color. Your choice updates the preview instantly.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/appearance/6.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">7.</span><span class="step-text">You can also use the Suggested Palettes section. Click any palette to instantly apply a pre-designed color scheme. The Color Combinations Preview shows how your selected colors will look together. Be sure to click Save when you're done.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/appearance/7.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">8.</span><span class="step-text">To set your logo, click Logo in the Style Settings sidebar. You'll see sections for Main Logos with Light Background Logo and Dark Background Logo, as well as SEO and Browser Assets.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/appearance/8.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">9.</span><span class="step-text">For streaming, you'll need to set the Light Background Logo. Click Edit Light Background Logo, then upload your logo file. You'll want to select an image with a transparent background and a 4 to 1 aspect ratio. Use the cropping tool to center your logo and click Update.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/appearance/9.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">10.</span><span class="step-text">Your logo will now appear on your live streaming page.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/appearance/10.png" onclick="showModal(this.src)"></div>
</div>
</div>

<div id="import-steps" class="video-steps">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">To import your existing videos from YouTube or Vimeo, start from the Dashboard and click on Sermons in the left navigation menu.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/import/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">From the Sermons page, click on the Bulk Import tab at the top.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/import/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">Before importing videos, you'll need to create a playlist to organize them. Click on the Playlists tab.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/import/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">If you don't have any playlists yet, click the Create First Playlist button to get started.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/import/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">Enter a name and description for your playlist, set a publish date, and add a thumbnail image. Then click Save to create your playlist.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/import/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">Now return to the Bulk Import tab. Click either Import from YouTube or Import from Vimeo depending on where your videos are hosted.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/import/6.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">7.</span><span class="step-text">Enter your YouTube Channel ID or Vimeo account information in the field provided.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/import/7.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">8.</span><span class="step-text">Click the Fetch button to retrieve all available videos from your channel.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/import/8.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">9.</span><span class="step-text">After fetching, you'll see a list of all your videos. Check the boxes next to the videos you want to import. You can also enable Auto Import New Videos to automatically add future uploads.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/import/9.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">10.</span><span class="step-text">Click the Import Into Playlist dropdown to select which playlist these videos should be added to.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/import/10.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">11.</span><span class="step-text">After selecting your playlist and videos, click the Import button to complete the bulk import. Your videos will be imported with all their details including titles, descriptions, dates, and thumbnails.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/import/11.png" onclick="showModal(this.src)"></div>
</div>
</div>

<div id="hosts-steps" class="video-steps">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">To add hosts for your live stream, start from the Dashboard and click on Settings in the left navigation menu.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/hosts/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">From the Settings page, click on the Roles button in the top navigation to access role management.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/hosts/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">On the Roles page, click the plus button in the top right corner and select Add Custom Role from the dropdown menu.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/hosts/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">In the Role Name field, enter Streaming Host and click Save to create the new role.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/hosts/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">Your new Streaming Host role will now appear in the roles list.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/hosts/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">Click on the Streaming Host role to edit it. You'll see the Members section where you can add people to this role.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/hosts/6.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">7.</span><span class="step-text">Click the Add button in the Members section, search for the person you want to add as a host, and click Select next to their name.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/hosts/7.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">8.</span><span class="step-text">The person you selected will now appear in the Members list for this role.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/hosts/8.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">9.</span><span class="step-text">Now scroll down to Edit Permissions and expand the Content section. Check the Host Chat permission to give this role the ability to moderate chat and respond to prayer requests.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/hosts/9.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">10.</span><span class="step-text">When your host logs into the live stream page, they will have special host capabilities including the ability to moderate the chat and respond to prayer requests.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/hosts/10.png" onclick="showModal(this.src)"></div>
</div>
</div>

<div id="sermon-steps" class="video-steps">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">From the Dashboard, click on Sermons in the left sidebar to access your sermon library.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/sermon/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">On the Sermons page, click the Add Sermon button in the top right corner and select Add Sermon from the dropdown.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/sermon/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">Select a Playlist for your sermon, choose YouTube as the video provider, then enter the YouTube video I.D. and click Fetch. The video I.D. is the string of characters after "v=" in the YouTube URL.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/sermon/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">We recommend YouTube for your video library because it seems to work best with our system. However, we also support Vimeo, Facebook, or your own Custom URL.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/sermon/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">When you click Fetch, all of the video details will be imported automatically. This includes the publish date, duration, title, description, and thumbnail. Make any changes you wish and click Save.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/sermon/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">The sermon will now appear in your sermons list, organized by playlist.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/sermon/6.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">7.</span><span class="step-text">To schedule this sermon for a live stream, go to Live Stream Times. Under Video Settings, you can select your sermon from the dropdown to broadcast it as a pre-recorded stream.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/streaming/sermon/7.png" onclick="showModal(this.src)"></div>
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

## Troubleshooting YouTube Automated Livestream

If your automated YouTube livestream is not displaying correctly when using the "Current YouTube Live Stream" option with your Channel ID, try the following:

### Issue: Livestream Shows "Video Unavailable" or Doesn't Load

**Symptoms:**
- The livestream embed shows "Video unavailable"
- The page loads but no video appears
- Direct YouTube embeds work, but the automated channel livestream doesn't

**Solution:**
Check your YouTube channel for old or upcoming scheduled livestreams and delete them:

1. Go to your YouTube Studio
2. Navigate to Content > Live
3. Look for any OLD scheduled lives or upcoming scheduled streams
4. Delete these old/scheduled livestream entries
5. Test your livestream page again

**Why this happens:** YouTube's automated channel livestream embed (`/embed/live_stream?channel=YOUR_CHANNEL_ID`) can be blocked when there are multiple scheduled or past livestream entries in your channel. Removing these allows YouTube to properly identify and serve your current live stream.

**Additional Requirements:**
- Ensure your livestream is set to **Public** (not Unlisted or Private)
- Verify that embedding is allowed in your YouTube stream settings
- Make sure you're using "Current YouTube Live Stream" provider (with Channel ID), not "YouTube" provider (with Video ID)

## Related Tutorials
- <a href="/b1Admin/youtube-channel-id.html">Get Your YouTube Channel ID</a>
- <a href="/b1Admin/website-initial-setup.html">Website Builder</a>
