---
layout: page
app: lessons
section: Tutorial Maker
title: How to Make Tutorials
---

# How to Make Tutorials

## Installing Tutorial Maker
<video style="width:100%" controls >
  <source src="../videos/tutorial-maker/install/output.mp4" type="video/mp4">
</video>
- [NodeJS Download](https://nodejs.org/en)
- [FFMPEG Download](https://ffmpeg.org/download.html#build-windows)
- Clone: git clone https://github.com/ChurchApps/TutorialMaker.git
- Install: npm install -g

## Creating a Tutorial Script
<video style="width:100%" controls >
  <source src="../videos/tutorial-maker/create/output.mp4" type="video/mp4">
</video>
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

## Running the Tutorial Maker
<video style="width:100%" controls >
  <source src="../videos/tutorial-maker/run/output.mp4" type="video/mp4">
</video>
