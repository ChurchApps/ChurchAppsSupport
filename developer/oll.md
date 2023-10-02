---
layout: page
---

# Open Lesson Lists (OLL)

Open Lesson List is part of [Open Lesson Format](./open-lesson-format.md). It contains a list of lessons that are available from a provider. These are broken down by program, study, lesson and venue. For paid curriculum providers, this feed does not need to be public, it can be restricted by a user specific access token passed in the query string.

The format is as follows:

**Programs**
A collection of studies usually designed for a specific demographic such as kids, teen, adult.

```
{
  "id": //An alphanumeric unique id for this program.
  "name": // The display name for the program
  "description": //A short 1-3 sentence description of the program.
  "image": //A 16x9 image for the program.  Ideally at least 800x450 in size
  "studies": //An array of Study objects for the program.  See below
}
```

**Study**
A collection of lessons on the same topic. Typically 4-12 weeks in length.

```
{
  "id": //An alphanumeric unique id for the study.
  "name": // The display name for the study
  "description": //A short 1-3 sentence description of the study.
  "image": //A 16x9 image for the study.  Ideally at least 800x450 in size
  "lessons": //An array of Lesson objects for the study.  See below
}
```

**Lesson**
An individual lesson designed to be covered in a single sitting.

```
{
  "id": //An alphanumeric unique id for the lesson.
  "name": // The display name for the lesson
  "description": //A short 1-3 sentence description of the lesson.
  "image": //A 16x9 image for the lesson.  Ideally at least 800x450 in size
  "venues": //An array of Venue objects for the lesson.  See below
}
```

**Venue**
A venue is a variant of a lesson designed for a specific setting. For example you may have the same lesson covered in a large group format, small group format, and at home format. It is also normal to just have a single venue for each lesson, such as "Classroom".

```
{
  "id": //An alphanumeric unique id for the venue.
  "name": // The display name for the venue
  "apiUrl": //The url to the OLF JSON file with instructions for this specific venue.  If access controlled, this url should contain any access token needed to authorize the access.
}
```
