---
layout: page
app: b1Admin
section: "03 Website"
title: Initial Setup
---

# Website Initial Setup

Get your B1 website up and running with these foundational tutorials.

<div id="videoContainer">
  <ul id="playlist">
      <li class="active"><a href="/videos/b1/website/website-intro/output.mp4" data-steps="website-intro-steps">Getting Started</a></li>
      <li><a href="/videos/b1/website/appearance/output.mp4" data-steps="appearance-steps">Global Appearance</a></li>
      <li><a href="/videos/b1/website/domain/output.mp4" data-steps="domain-steps">Domain Configuration</a></li>
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

<div id="appearance-steps" class="video-steps">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">From the B1 dashboard, click Website in the left sidebar to access website management.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">This opens the Website Pages view where you manage all your pages.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">Click the Appearance tab at the top to access the global appearance settings.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">The Site Styles page loads, showing a preview of your website with your current colors, fonts, and logos.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">On the right side you'll see Style Settings options. Click Color Palette to customize your site's colors.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">The Color Palette dialog opens showing Base Colors and Semantic Colors for Primary, Secondary, Success, Warning, and Error.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/6.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">7.</span><span class="step-text">A color picker appears. Drag the selector to choose your desired color or use the color slider below.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/7.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">8.</span><span class="step-text">Customize each semantic color and view Color Combinations Preview. Use Suggested Palettes to apply pre-designed color schemes. Be sure to save.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/8.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">9.</span><span class="step-text">Next, let's customize fonts.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/9.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">10.</span><span class="step-text">In the Typography Settings panel, you'll see options for Font Selection and a preview showing how headings will look.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/10.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">11.</span><span class="step-text">Click Select a Font to open the font browser. You can search for specific fonts or browse by category.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/11.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">12.</span><span class="step-text">The font list shows categories like Serif, Sans Serif, Display, Handwriting, and Monospace with alphabet previews.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/12.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">13.</span><span class="step-text">Be sure to save your font selection.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/13.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">14.</span><span class="step-text">The Typography Scale displays your heading hierarchy with pixel sizes for Heading 1 through Heading 4.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/14.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">15.</span><span class="step-text">Click on Typography Scale to adjust the sizes with input fields for scale multiplier and base size.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/15.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">16.</span><span class="step-text">The preview updates to show how your heading sizes appear. Type directly into input fields to fine-tune. Click save.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/16.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">17.</span><span class="step-text">Click on Spacing Scale in the Style Settings menu.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/17.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">18.</span><span class="step-text">The Spacing Scale dialog shows spacing values for Extra Small through Extra Large with Practical Examples below.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/18.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">19.</span><span class="step-text">When you're satisfied with your spacing values, click Save Spacing to apply them across your entire site.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/19.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">20.</span><span class="step-text">For advanced users, click CSS and Javascript in the Style Settings.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/20.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">21.</span><span class="step-text">Add Custom CSS to override default styles, Custom HTML for tracking codes, and Common Javascript Examples like Google Analytics.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/21.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">22.</span><span class="step-text">Click Logo in the Style Settings to open Logo and Branding.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/22.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">23.</span><span class="step-text">Upload your Light Background Logo, Dark Background Logo, Social Media Image, and Favicon. Your uploaded logo appears in the site preview.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/23.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">24.</span><span class="step-text">Now let's customize the footer. Click Site Footer in the Style Settings.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/24.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">25.</span><span class="step-text">The Site Footer editor opens showing an empty canvas. Click the plus button in the toolbar to add content.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/25.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">26.</span><span class="step-text">Click on section to add a new section element.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/26.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">27.</span><span class="step-text">Drag the section onto the footer page.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/27.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">28.</span><span class="step-text">Edit the section with a custom color or image or leave as is.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/28.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">29.</span><span class="step-text">Be sure to click save.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/29.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">30.</span><span class="step-text">Now click the plus sign to add other elements.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/30.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">31.</span><span class="step-text">Select rows to create a common footer setup with three columns of text.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/31.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">32.</span><span class="step-text">Drag and drop the rows element to the page and select thirds for the configuration.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/32.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">33.</span><span class="step-text">Be sure to save.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/33.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">34.</span><span class="step-text">Now let's drop some text in each section.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/34.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">35.</span><span class="step-text">Drag and drop a text element to add text.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/35.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">36.</span><span class="step-text">The Edit Element dialog opens with a text editor. Type your church information and use the formatting toolbar to style your text.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/36.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">37.</span><span class="step-text">Click Done to save your footer. Your completed footer now shows with all your church information and will appear on every page of your website.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/appearance/37.png" onclick="showModal(this.src)"></div>
</div>
</div>

<div id="domain-steps" class="video-steps">
<h3>Steps</h3>
<div class="step-accordion">
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">1.</span><span class="step-text">Configuring domains for your site takes place in B1.church Admin. You can go to admin.b1.church and login.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/domain/1.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">2.</span><span class="step-text">Or if you're on B1, click the profile drop down and choose switch app.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/domain/2.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">3.</span><span class="step-text">In B1.church Admin, click on the dashboard on the left.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/domain/3.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">4.</span><span class="step-text">In the dashboard pulldown menu click on settings. If you are missing these options, it's because you lack permissions. Request the person who set up your church grant you access to "Edit Church Settings".</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/domain/4.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">5.</span><span class="step-text">Click on manage. Every church that uses B1 has a subdomain assigned to them. In our case, we have chosen "ironwood" as the subdomain for our test church of Ironwood Church. This means we can go to ironwood.b1.church to get to our B1 content.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/domain/5.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">6.</span><span class="step-text">Set this subdomain to whatever you would like. It needs to have no spaces and be unique.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/domain/6.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">7.</span><span class="step-text">In addition to the subdomain, you can set up your own custom domains to point to your B1 site. For example, the site ChurchApps.org is hosted with B1.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/domain/7.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">8.</span><span class="step-text">To configure this, you will need to log into your DNS provider such as GoDaddy, CloudFlare, or in our case A.W.S.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/domain/8.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">9.</span><span class="step-text">There are two records you will need to add. An A record for your root domain of 3.23.251.61.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/domain/9.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">10.</span><span class="step-text">And a CNAME record for your www subdomain pointing to proxy.b1.church.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/domain/10.png" onclick="showModal(this.src)"></div>
  <div class="step-header" onclick="toggleStep(this)"><span class="step-num">11.</span><span class="step-text">Once these have been added, return to B1.church Admin and add your domain to the list of custom domains and click Add and Save. After a few minutes your B1 site will be accessible from your custom domain.</span><span class="step-arrow">▼</span></div>
  <div class="step-content"><img src="../videos/b1/website/domain/11.png" onclick="showModal(this.src)"></div>
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

- <a href="/b1Admin/website-page-setup.html">Page Setup</a>
- <a href="/b1Admin/website-advanced.html">Advanced</a>
