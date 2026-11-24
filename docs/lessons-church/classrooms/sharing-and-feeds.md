---
title: "Classroom Pages, Feeds, and B1 Groups"
sidebar_label: "Sharing and Feeds"
description: "Share a Lessons.church classroom's recent or upcoming lessons with parents and teachers, connect it to B1 groups, and get the feed URL for digital signage."
---

# Classroom Pages, Feeds, and B1 Groups

<div class="article-intro">

Every classroom in the Lessons.church portal has a public page, a playlist feed, and two optional links to B1 groups. Together these let parents see what their kids studied, let teachers see what is coming up, and let a TV or signage player show the scheduled lesson. This guide covers each of them and where to find the links.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- [Set up at least one classroom](./setting-up-classrooms.md) in the portal
- [Schedule a lesson](./scheduling-lessons.md) to it, so the pages and feeds have something to show

</div>

## Opening the Subscribe Box

1. Log in and go to **Schedules** (the portal's **Classroom Management** page).
2. In the **Classrooms** box, click the **Subscribe to feed** (RSS) icon next to a classroom.
3. The **Subscribe** box opens above the schedule with three sections: **Display in Your Classroom**, **Use with Digital Signage**, and **Share Your Current Lesson**. Click **Done** to close it.

Each link in the box is specific to the classroom you clicked.

## Display in Your Classroom

The simplest way to play scheduled lessons on a classroom TV is the free [FreePlay](https://freeplay.church) app. Pair it to your church and it plays whatever is on the classroom's schedule. See the [FreePlay documentation](/docs/freeplay/) for setup. Leaders follow along with the lesson on their phones through the B1 app, covered in [Teaching from the B1 App](../presenting/b1-teacher-view.md).

## Use with Digital Signage

If you already run digital signage software, the classroom has a playlist feed you can point it at:

1. In the **Subscribe** box, under **Use with Digital Signage**, right-click **this url** and copy the link. It has the form `https://api.lessons.church/classrooms/playlist/CLASSROOM_ID`.
2. Add it to your signage software. The box links to SignPresenter's instructions for connecting a Lessons.church feed; other players that accept a JSON playlist URL work the same way.

The feed always returns the media for the lesson currently scheduled for that classroom, so you set it up once and it follows your schedule.

## Share Your Current Lesson

Each classroom has a public page at `https://lessons.church/classroom/CLASSROOM_ID`. Nobody needs to log in to open it.

- **For parents and students** -- Link to **this page** (the first link under **Share Your Current Lesson**). It is titled with the classroom name followed by **Lesson** and lists the most recent lessons, up to four, newest first. Each entry shows the date, the lesson image, name, title, and description, and when the curriculum includes parent take-home content it also shows **Bottom line**, **Verse**, **Question**, and any optional note. Clicking an entry opens the full lesson.
- **For teachers** -- Share the second link, which adds `?upcoming=1` to the address. That version lists the next four scheduled lessons, soonest first, so teachers can prepare ahead.

:::tip
The page shows your church's logo at the top when one has been uploaded in B1 Admin. Follow the **here** link in the Subscribe box (it opens B1 Admin settings) to upload one.
:::

## Linking a Classroom to B1 Groups

The classroom edit form has two optional group fields that connect the classroom to the B1 app:

1. In the **Classrooms** box, click the **Edit classroom** (pencil) icon.
2. Choose a **Volunteer Team (optional)**. The list shows your church's teams from B1. Members of that team get access to the classroom's upcoming lessons in the B1 app.
3. Choose a **Parent/Student Group (optional)**. The list shows your church's standard groups. Members of that group get access to recent lessons in the B1 app.
4. Click **Save**.

Leave either field on **None** if you do not use it. See [Teaching from the B1 App](../presenting/b1-teacher-view.md) for what team members see.

:::info
Churches that schedule lessons through B1 Admin serving plans see parent take-home content on the group's page in B1 instead. The classroom page described here is for churches scheduling in the Lessons.church portal.
:::

## Related Articles

- [Setting Up Classrooms](./setting-up-classrooms.md) -- Create and edit classrooms
- [Scheduling Lessons](./scheduling-lessons.md) -- Put lessons on the classroom calendar
- [Teaching from the B1 App](../presenting/b1-teacher-view.md) -- How volunteers open lessons on their phones
- [Managing Lessons](../admin/managing-lessons.md) -- Where content admins enter the parent take-home fields
