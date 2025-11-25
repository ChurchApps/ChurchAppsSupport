---
layout: page
app: b1Admin
section: Admin
title: Stream - Setup
---

# Configuring Online Streaming and Sermon Videos

<div id="videoContainer">
  <ul id="playlist">
      <li class="active"><a href="/videos/b1/streaming/services/output.mp4">Configure Service Times</a></li>
      <li><a href="/videos/b1/streaming/links-tabs/output.mp4">Adding Links and Tabs</a></li>
      <li><a href="/videos/b1/streaming/appearance/output.mp4">Set Colors and Logo</a></li>
      <li><a href="/videos/b1/streaming/import/output.mp4">Import Existing Videos</a></li>
      <li><a href="/videos/b1/streaming/hosts/output.mp4">Adding Hosts</a></li>
  </ul>
</div>

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
- <a href="/b1Admin/website-setup.html">Website Builder</a>
