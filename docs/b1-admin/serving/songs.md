---
title: "Songs"
description: "Manage your worship song library in B1 Admin: search and add songs, attach ChordPro lyrics and arrangements, upload rehearsal audio and chord chart PDFs, and export song usage for CCLI."
---

# Songs

<div class="article-intro">

The Songs page manages your worship song library. Keep all your song details, lyrics, and arrangements in one place so your worship team can easily prepare for upcoming services and maintain a consistent repertoire.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- In the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) in B1 Admin, choose **Serving > Songs** to access the Songs page
- Optionally, have your [service plans](./plans.md) set up so you can link songs directly into the [service order](./service-order.md)

</div>

## Browsing Your Song Library

When you open the **Songs** page, your songs are listed in a table. Each row shows the song's thumbnail image, title, artist, and duration. Use the page controls under the list to move through a large library, or search to find what you need.

## Searching for Songs

1. Click in the **Search Songs** box at the top of the Songs page.
2. Type a song **title** or **artist** name.
3. The list filters as you type, showing matching songs from your library and how many matched. Click **Clear** to show every song again.

## Adding a Song

1. Click **Add Song** at the top of the Songs page.
2. In **Search for a Song**, search the external song database by **Title or Artist**.
3. Select the song you want to add, or click **Create Manually** if you can't find it.
4. The song will be added to your library with its basic details pre-filled.

:::tip
After adding a song, click on it to review and update its details, add arrangements, or attach external links like YouTube videos or chord charts.
:::

### Free Songs from WorshipCommons

Your search results may also include a **WorshipCommons — free** section alongside the regular results. These are Sunday-ready songs from [WorshipCommons](https://worshipcommons.org) that have been reviewed and licensed for worship use. Each result shows a license badge -- **Free for worship** or **Public domain** -- so you know the terms before you add it.

- Click a WorshipCommons result to add it to your library, just like a regular search result.
- Click **View on WorshipCommons** to open the original listing in a new tab.

Only songs that have passed WorshipCommons' review process appear here, so the selection may be smaller than the main song database.

To browse the full WorshipCommons library, print charts, or export slides, see the [WorshipCommons docs](../../worship-commons/index.md).

## Deleting Songs

Check the box next to one or more songs (or the box in the header to select every song shown), then click **Delete Selected** in the bar that appears and confirm. Click **Clear** to deselect.

## Exporting Your Songs

Two exports at the top of the Songs page download spreadsheets (CSV files). You need permission to edit songs to see them.

- **Export** downloads your whole song library, with each song's **Title**, **Artist**, **CCLI number**, **CCLI link**, and **Keys**.
- **Export song usage** lists the songs used on your plans over a date range, for your CCLI report:
  1. Click **Export song usage**.
  2. Set the **Start date** and **End date**. The range starts as the last six months.
  3. Click **Export CSV**.

  The file lists each song's **Title**, **Artist**, **CCLI number**, **Times used**, and **Plan dates**. If no songs were used on plans in that range, the dialog says so instead of downloading an empty file.

:::tip
The CCLI number comes from the song's **CCLI** external link. Add a CCLI link to each song (see **Add external links** below) so your usage report is ready to copy into CCLI.
:::

## Viewing and Editing a Song

Click a song's title to open its detail page. The song's title, artist, and details such as album, key, length, BPM, and meter appear on the left, along with its arrangements and external links. The selected arrangement, with its lyrics and keys, fills the rest of the page. From here you can:

- **Edit song details** -- Click **Edit** to update the title, artist, duration, and other metadata. Click **Done** when you're finished. To remove the song from your library, click **Edit** and then **Delete song**.
- **Manage arrangements** -- Each song can have multiple arrangements (for example, different keys or versions). Click **Add Arrangement** to create one, and click an arrangement's name under **Arrangements** to open it. To start a new arrangement from an existing one, click **Duplicate** next to the arrangement's name (see [Duplicating an Arrangement](#duplicating-an-arrangement)).
- **Add lyrics** -- Click **Edit** next to the arrangement's name to change its name, BPM, meter, length, sequence, and lyrics. Enter the lyrics using ChordPro notation (for example, `[G]Amazing grace`). A live preview next to the editor renders the formatted chord chart as you type, so you can see exactly what your team will see.
- **Set the key** -- Specify the musical key for each arrangement using the **Key** picker above the lyrics. The picker lists keys the way musicians usually write them (C, Db, D, Eb, E, F, F#, G, Ab, A, Bb, B). Changing the key transposes the displayed chords immediately, both on the arrangement page and when opening the song from a service plan, so your team always sees chords in the key they're actually playing. Chords are spelled to match the key: flat keys such as Bb or Eb show flat chord names (Bb, Eb, Ab) instead of sharps.
- **Add external links** -- Click **Edit** next to **External Links** on the left to link the song on services such as YouTube, Spotify, Apple, CCLI, or Hymnary. Links to chord charts or sheet music hosted elsewhere go on a key (see **Manage keys**).
- **Manage keys** -- Under **Keys**, click **Add key** to add a key the arrangement is played in (a **Key Signature** and an optional label, such as "John's Key"). Select a key and click **Add Files** to **Import from PraiseCharts**, **Add External Link** for that key (such as a chord chart in that key), or **Upload Audio or Chart PDF**.

## Arrangements

An arrangement represents a distinct version of a song — for example, a faster modern version versus a slower acoustic take, or the same song in a different key for a different team. Each arrangement of the same song shares the song title and artist but has its own independent settings:

- **Key** — the musical key the arrangement is performed in
- **BPM** — tempo in beats per minute
- **Length** — duration in seconds
- **Meter** — time signature (e.g., 4/4, 3/4, 6/8)
- **Sequence** — the chord/section structure (e.g., Intro → Verse → Chorus → Bridge)
- **Lyrics** — for display or projection
- **External links** — chord charts, YouTube recordings, sheet music, or other resources

When you add a song to a [Service Order](./service-order.md), you can choose which arrangement to use for that specific service, so your team always rehearses and plays the right version.

### Duplicating an Arrangement {#duplicating-an-arrangement}

To make a new version of an arrangement without retyping it, open the arrangement and click **Duplicate** next to its name. B1 creates a new arrangement of the same song named after the original with "(copy)" added (or "(copy 2)" and so on if that name is taken) and opens it. The copy gets the original's BPM, meter, length, sequence, lyrics, keys, and each key's external links. Uploaded audio tracks and chart PDFs stay with the original arrangement. Click **Edit** on the copy to rename it and make your changes.

### Rehearsal Audio and Chart PDFs

Worship admins can attach a rehearsal audio track or a chord chart PDF to an arrangement so the team can listen and read ahead of practice:

1. Open the song and select the arrangement.
2. Under **Keys**, select a key (click **Add key** first if the arrangement has none), click **Add Files**, and choose **Upload Audio or Chart PDF**.
3. Choose an MP3, M4A, or AAC audio file (up to 25 MB -- WAV isn't accepted, to keep storage usage manageable), or a PDF chart (up to 4 MB).
4. Click **Save**.

Audio tracks play inline wherever that arrangement appears -- on the arrangement page in B1 Admin and in the service plan when a team member opens the song in the B1.church member portal. Plan items with audio show a music-note icon instead of a thumbnail.

Chart PDFs are listed under **Chart PDFs** in the **Keys** panel. Click one to open it in a new tab, or click its trash icon to delete it. Team members see the chart under **Files** when they open the song from a plan in the member portal (see [Viewing Song Lyrics and Chords](../../b1-church/plans/service-order.md#viewing-song-lyrics-and-chords)).

Uploaded files belong to the arrangement, not to one key, so they show on every key tab. Deleting the arrangement also removes its uploaded files.

:::info
If the upload is refused, the message tells you why: the file is not a supported type, **This file is not a valid PDF.**, or **PDF is too large. Maximum size is 4 MB.**
:::

To print each song's chord chart with the plan, check **Include chord charts** when you print (see [Printing Plans](./plans.md#printing-plans)).

:::info
Songs from your library can be added directly to a [Service Order](./service-order.md) within a plan, linking the song details and the chosen arrangement to that specific service.
:::

## Next Steps

- Add songs to your [Service Order](./service-order.md) when building out a [service plan](./plans.md)
- Print chord charts for every song in a plan with [Printing Plans](./plans.md#printing-plans)
- Coordinate with your worship team using [Tasks](./tasks.md) for song preparation and practice
