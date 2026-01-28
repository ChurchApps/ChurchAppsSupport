---
layout: page
app: b1Admin
section: Admin
title: Website - Introduction
---

# Introduction to B1 Website Builder

<div id="videoContainer">
  <ul id="playlist">
      <li class="active"><a href="/videos/b1/website/website-intro/output.mp4" data-steps="website-intro-steps">Website Builder Introduction</a></li>
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

<div id="website-intro-steps" class="video-steps active">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">Every B1 account comes with a website. To access your website builder, click Website in the left menu.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">This opens Website Pages where you can manage pages and content. Click Add Page at the top right.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">Choose blank as the page type and name it Home.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">Click Edit to start building your page.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">Click Page Settings to configure the title and URL.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">Click the edit pencil.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/6.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">7.</span><span class="step-text">Edit your page title and URL path here.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/7.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">8.</span><span class="step-text">For the home page, enter a forward slash with no text. Other pages use forward slash and page title. Click Save.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/8.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">9.</span><span class="step-text">Click Edit Content to begin adding content.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/9.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">10.</span><span class="step-text">Click Add Content to open the elements panel.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/10.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">11.</span><span class="step-text">Every page must begin with a Section. Choose Section to add a container.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/11.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">12.</span><span class="step-text">Drag a Section onto your page.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/12.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">13.</span><span class="step-text">Click the section and switch to the CUSTOM tab.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/13.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">14.</span><span class="step-text">The CUSTOM tab controls colors for backgrounds, headings, text, and links.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/14.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">15.</span><span class="step-text">Click the Background Type dropdown.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/15.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">16.</span><span class="step-text">Choose Image to upload a background image.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/16.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">17.</span><span class="step-text">Or choose YouTube Video to add a video background.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/17.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">18.</span><span class="step-text">Select Color and choose a background color.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/18.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">19.</span><span class="step-text">Add an optional section ID for advanced styling.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/19.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">20.</span><span class="step-text">Click Save.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/20.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">21.</span><span class="step-text">Your section displays with the custom background.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/21.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">22.</span><span class="step-text">Click MOBILE to preview mobile layout.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/22.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">23.</span><span class="step-text">Click Add Content again.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/23.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">24.</span><span class="step-text">Choose from text, images, videos, cards, forms, and more.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/24.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">25.</span><span class="step-text">Drag a Text element into your section.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/25.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">26.</span><span class="step-text">Type your text and customize formatting. Click Save.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/26.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">27.</span><span class="step-text">Drag an Image element below your text.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/27.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">28.</span><span class="step-text">Click Select Photo.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/28.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">29.</span><span class="step-text">Upload images or download stock photos. Select an image.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/29.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">30.</span><span class="step-text">Click Save.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/30.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">31.</span><span class="step-text">Your section displays with text and image.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/31.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">32.</span><span class="step-text">Preview your complete website.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/website-intro/32.png" onclick="showModal(this.src)"></div>
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

- <a href="/b1Admin/website-setup.html">Website Setup</a>
- <a href="/b1Admin/website-elements.html">Page Content - Sections and Elements</a>
