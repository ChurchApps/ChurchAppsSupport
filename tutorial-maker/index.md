---
layout: page
app: tutorial-maker
section: Tutorial Maker
title: How to Make Tutorials
---

# How to Make Tutorials

<div id="videoContainer">
  <ul id="playlist">
      <li class="active"><a href="../videos/tutorial-maker/install/output.mp4">Install the Tutorial Maker</a></li>
      <li><a href="../videos/tutorial-maker/create/output.mp4">Create a Script</a></li>
      <li><a href="../videos/lessons/schedule-lesson/output.mp4">Running the Tutorial Maker</a></li>
      <li><a href="../videos/tutorial-maker/run/output.mp4">Connect Apps</a></li>
  </ul>
</div>

## Download Links
- [NodeJS Download](https://nodejs.org/en)
- [FFMPEG Download](https://ffmpeg.org/download.html#build-windows)
- Clone: git clone https://github.com/ChurchApps/TutorialMaker.git
- Install: npm install -g

## Sample Lesson XML
<code>
&lt;tutorial&gt;<br/>
  &lt;speak&gt;<br/>
    &lt;mark name=&quot;1&quot; /&gt;<br/>
    To register an account, click the register button in the top right corner.<br/>
    &lt;break time=&quot;1s&quot;/&gt;<br/>
    &lt;mark name=&quot;2&quot; /&gt;<br/>
    Enter your name and your email address and click &quot;Register&quot;<br/>
    &lt;break time=&quot;2s&quot;/&gt;<br/>
    &lt;mark name=&quot;end&quot; /&gt;<br/>
  &lt;/speak&gt;<br/>
&lt;/tutorial&gt;<br/>
</code>