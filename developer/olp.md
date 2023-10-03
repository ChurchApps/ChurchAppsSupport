---
layout: page
---

# Open Lesson Playlist (OLP)

Open Lesson Playlist is part of [Open Lesson Schema](./open-lesson-schema.html). It is a simplified view of the content from Open Lesson Format, that only include the media items that need to be downloaded and played by a player. Additional instructions on how to lead the lesson are excluded.

The format is as follows:

**Root Objects**

```
{
  "lessonName": //A short name for the lesson. ("Genesis 1")
  "lessonTitle": //The display title for the lesson. ("In the Beginning - The Opening Chapter of the Bible")
  "lessonImage": //A 16x9 image for the lesson.  Ideally at least 800x450 in size
  "lessonDescription": //A short 1-3 sentence description of the lesson.
  "venueName": //The name of the venue. ("Classroom")
  "messages": //An array of Message objects for the venue.  See below
}
```

**Message**

A single logical block of content that is showed as a set. It can consist of multiple images and videos. This typically equates to a Section from the OLF data format.

```
{
  "name": //The display name for the message
  "files": //An array of Message objects for the venue.  See below
}
```

**File**

An individual file that is available to be downloaded.

```
{
  "name": //The file name as it should be stored on disk after download.
  "url": //The link to download the file.
  "seconds": //The duration of a video, when not a looping video
  "loop": //Boolean indicating if a video should loop
}
```

## Sample

The OLP file for Lessons.church is available [here](https://api.lessons.church/classrooms/playlist/cSbHF-jWjh-).
