---
layout: page
app: lessons
section: Developer
title: Open Lesson Schema
---

# Introducing Open Lesson Schema

There are a variety of curriculums and other church lessons available from a number of independent providers. There are also a number of desktop, television and mobile applications used to present these lessons in classrooms. There is typically a recurring task to download lesson videos and print outlines each week in order to lead a classroom. This is a time consuming an expensive process.

Some curriculum providers have provided applications to making delivery of their content easier, but separate applications must be written for each content provider which greatly increases expense. Open Lesson Format aims to resolve these issues, by providing a standardize JSON structure for lesson content, in order to provide a variety of presentation applications with the ability to automatically show content from a variety of content providers.

## How does it work?

There are three JSON data file formats that make up Open Lesson format. They are

1. [**Open Lesson List (OLL)**](oll.html) - This contains a list of lessons that are available from a provider. These are broken down by program, study, lesson and venue. For paid curriculum providers, this feed does not need to be public, it can be restricted by a user specific access token passed in the query string.

2. [**Open Lesson Format (OLF)**](olf.html) - This contains the detailed lesson instructions for an individual lesson/venue. The lesson is broken down into sections for organizational purposes. Within each section there are a series of actions indicating what the leader should "play", "say", or "do", along with notes.

3. [**Open Lesson Playlist (OLP)**](olp.html) - This is a condensed list of just the "play" actions from the OLM file. It is designed to be a simpler format for use in presentation software with just a list of the images and videos that should be presented as part of the lesson. The software should be able to read this file to automatically download all the linked media and assemble them into a playlist.

## Which providers support Open Lesson Format?

Open Lesson Format is a new standard we are introducing at Lessons.church which is supported by the following platofrms at launch.

**Software**

- **Lessons.church TV App** - Lessons.church provides an Android TV app for Amazon Firesticks, Google TV devices and any other Android based TV device. It supports both content from the Lessons.church website as well as third party OLF providers.

- **B1.church Mobile App** - Instructions for scheduled lessons will show up in the B1 Mobile app for classroom leaders at churches in order to avoid having to print lesson instructions each week.

- **SignPresenter** - SignPresenter is digital signage software for a variety of TV devices and is fully compatible with OLF.

- **FreeShow** - FreeShow is an open source desktop based presentation platform that is available free of charge. It supports the ability to import Open Lesson Playlist Files.

**Curriculum Providers**

- **Lessons.church** - All lessons hosted on lessons.church are fully available in Open Lesson Format. OLL, OLF and OLM files are provided.
