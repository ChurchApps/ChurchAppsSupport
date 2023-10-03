---
layout: page
---

# Open Lesson Format (OLF)

Open Lesson Format is part of [Open Lesson Schema](./open-lesson-schema.html). It contains the detailed lesson instructions for an individual lesson/venue. The lesson is broken down into sections for organizational purposes. Within each section there are a series of actions indicating what the leader should "play", "say", or "do", along with notes and materials needed and other downloads available.

The format is as follows:

**Root Objects**

The root object defines lesson venue (Large Group, Small Group, At Home, Classroom, etc). It does however contain limited information about the parent lesson, study and program.

```
{
  "name": //The display name for the venue
  "lessonId": //An alphanumeric unique id for this program
  "lessonName": //The display name for the lesson
  "lessonDescription": //A short 1-3 sentence description of the lesson.
  "lessonImage": //A 16x9 image for the program.  Ideally at least 800x450 in size
  "studyName": //The display name for the lesson
  "studySlug": //An alphanumeric unique identifier for this study.  Often a url path.
  "programName": //The display name for the lesson
  "programSlug": //An alphanumeric unique identifier for this study.  Often a url path.
  "programAbout": //A short 1-3 sentence description of the program provider.  Often with a link back to the provider.
  "downloads": //An array of Download objects for the venue.  See below.
  "sections": //An array of Section objects for the venue.  See below.
}
```

**Download**

An object that can be downloaded. A single download my have multiple files for different variants of the same object. For example the same Slides object may be downloadable as a ZIP, Powerpoint, or ProPresenter file.

```
{
  "name": //The display name for the download
  "files": //An array of File objects for the study.  One for each variant. See below.
}
```

**File**

An individual file that is available to be downloaded or played.

```
{
  "name": //The file name as it should be stored on disk after download.
  "url": //The link to download the file.
  "bytes": //The size of the file in bytes
  "fileType": //The mime type of the file such as image/jpeg or application/zip
  "thumbnail": //A 16:9 image to use for a preview.  Not requied
  "streamUrl": //When a video can be streamed in addition to being downloaded, include the url here.
  "seconds": //The duration of a video, when not a looping video
  "loop": //Boolean indicating if a video should loop
}
```

**Section**

A logical categorization of parts of a lesson such as Welcome, Act 1, Memory Verse, and Closing. Sections and Actions within them should be listed in chronological order.

```
{
  "name": //The display name for the section
  "materials": //A list of any materials needed for this section, such as props.
  "actions": //An array of Action objects for the section.  See below.
}
```

**Action**

An action is an instruction to the leader of what they should "play", "say" or "do". It can also include a "note"

```
{
  "actionType": //The type of action: "play", "say", "do", or "note".
  "content": //Markdown stating what shoudl be played, said, done, or noted.
  "files": //An array of File objects for the "play" actions only.  See above.
}
```

## Sample

The OLF file for Lessons.church is available [here](https://api.staging.lessons.church/venues/public/feed/P3y6AZm4SJo).
