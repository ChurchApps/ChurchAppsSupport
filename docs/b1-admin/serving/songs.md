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
- Adding, editing, exporting, and deleting songs needs the **Edit Content** permission in the **Content** section of a role (see [Roles & Permissions](../settings/roles-permissions.md)); anyone else can browse the library and open songs read-only

</div>

## Browsing Your Song Library

When you open the **Songs** page, your songs are listed in a table. Each row shows the song's thumbnail image, title, artist, and duration. Use the page controls under the list to move through a large library (10, 25, or 50 songs per page), or search to find what you need.

## Searching for Songs

1. Click in the **Search Songs** box at the top of the Songs page.
2. Type a song **title** or **artist** name.
3. The list filters as you type, showing matching songs from your library and how many matched. Click **Clear** to show every song again.

## Adding a Song

1. Click **Add Song** at the top of the Songs page.
2. In **Search for a Song**, type a **Title or Artist** and press **Enter** (or click the search icon). Results come from the PraiseCharts catalog (the dialog notes **Powered by: PraiseCharts**) and may be joined by a **WorshipCommons — free** section (see below).
3. Click the song you want. B1 adds it to your library with its title, artist, key, and length filled in, creates a first arrangement named **(Default)** with a **Default** key in the song's key, and opens the song's page.
4. If the song isn't listed, click **Create Manually**, enter the **Song Title** and **Artist** in the **Create Song** form, and click **Save**. You can fill in the rest of the details on the song's page.

:::info
Adding a song that is already in your library opens the existing song instead of creating a duplicate.
:::

:::tip
After adding a song, click on it to review and update its details, add arrangements, or attach external links like YouTube videos or chord charts.
:::

### Free Songs from WorshipCommons

Your search results may also include a **WorshipCommons — free** section alongside the regular results. These are Sunday-ready songs from [WorshipCommons](https://worshipcommons.org) that have been reviewed and licensed for worship use. Each result shows a review badge such as **Sunday-ready** and a license badge -- **Free for worship** or **Public domain** -- so you know the terms before you add it.

- Click a WorshipCommons result to add it to your library, just like a regular search result. The song gets a **WorshipCommons** external link back to its listing.
- Click **View on WorshipCommons** to open the original listing in a new tab.

Only songs that have passed WorshipCommons' review process appear here, so the selection may be smaller than the main song database.

To browse the full WorshipCommons library, print charts, or export slides, see the [WorshipCommons docs](../../worship-commons/index.md).

## Deleting Songs

Check the box next to one or more songs (or the box in the header to select every song on the current page), then click **Delete Selected** in the bar that appears and confirm. Click **Clear** to deselect. Deleting a song removes its arrangements, keys, and uploaded files; plans that used it keep the song's name in their order of service but lose the link to its chart.

## Exporting Your Songs

Two exports at the top of the Songs page download spreadsheets (CSV files). You need permission to edit songs to see them.

- **Export** downloads your whole song library, with each song's **Title**, **Artist**, **CCLI number**, **CCLI link**, and **Keys**.
- **Export song usage** lists the songs used on your plans over a date range, for your CCLI report:
  1. Click **Export song usage**.
  2. Set the **Start date** and **End date**. The range starts as the last six months.
  3. Click **Export CSV**.

  The file lists each song's **Title**, **Artist**, **CCLI number**, **Times used**, and **Plan dates**. If no songs were used on plans in that range, the dialog says so instead of downloading an empty file.

:::tip
The CCLI number comes from the song's **CCLI** external link. Add a CCLI link to each song (see [External Links](#external-links) below) so your usage report is ready to copy into CCLI. A song counts once per plan it appears on, even if it was sung in several service times, and songs whose key was deleted since still appear under the name they had on the plan.
:::

## Viewing and Editing a Song

Click a song's title to open its detail page. The song's title, artist, and details such as album, key, length, BPM, meter, and language appear on the left, along with its arrangements and external links. The selected arrangement, with its lyrics and keys, fills the rest of the page. From here you can:

- **Edit song details** -- Click **Edit** to change the song's **Album**, **Language**, **Release Date**, **BPM**, **Key**, and length in **Seconds**, then click **Save**. The title and artist come from the catalog entry the song was added from and can't be changed here; to fix a wrong title, add the song again from the right catalog entry (or with **Create Manually**) and delete this one. Click **Done** to leave the edit view. To remove the song from your library, click **Edit** and then **Delete song**.
- **Manage arrangements** -- Each song can have multiple arrangements (for example, different keys or versions). Click **Add Arrangement** to create one named "New Arrangement" with a **Default** key in the song's key, and click an arrangement's name under **Arrangements** to open it. To start a new arrangement from an existing one, click **Duplicate** next to the arrangement's name (see [Duplicating an Arrangement](#duplicating-an-arrangement)).
- **Add lyrics** -- Click **Edit** next to the arrangement's name to change its **Arrangement Name**, **BPM**, **Meter**, **Length** (in seconds), **Sequence**, and **Lyrics**. Enter the lyrics using ChordPro notation (for example, `[G]Amazing grace`, with section headers such as `[Verse 1]`). A live preview next to the editor renders the formatted chord chart as you type, so you can see exactly what your team will see. The same form has a **Delete** button that removes the arrangement.
- **Set the key** -- Specify the musical key for each arrangement using the **Key** picker above the lyrics. The picker lists keys the way musicians usually write them (C, Db, D, Eb, E, F, F#, G, Ab, A, Bb, B). Changing the key transposes the displayed chords immediately, both on the arrangement page and when opening the song from a service plan, so your team always sees chords in the key they're actually playing. Chords are spelled to match the key: flat keys such as Bb or Eb show flat chord names (Bb, Eb, Ab) instead of sharps. The picker only appears when the song has a key saved in its details.
- **Add external links** -- See [External Links](#external-links) below. Links to chord charts or sheet music hosted elsewhere go on a key instead (see **Manage keys**).
- **Manage keys** -- Under **Keys**, click **Add key** to add a key the arrangement is played in: enter the **Key Signature** and an optional **Label (optional)**, such as "John's Key", and click **Save**. Keys appear as tabs labeled with the label and key (for example, "Default · G"). Select a key and click **Edit** next to the **Keys** heading to change or delete it, or click **Add Files** to **Import files from PraiseCharts**, **Add external link** for that key (such as a chord chart in that key), or **Upload Audio or Chart PDF**.

### External Links {#external-links}

External links point your team to the song on streaming and licensing services. They belong to the song (not to one arrangement) and appear as logo tiles under **External Links** on the song's page.

1. Click **Edit** next to **External Links** (or **Add First Link** when the song has none).
2. Click the **+** icon, choose the **Service** -- **Apple**, **CCLI**, **Genius**, **Hymnary**, **MusicBrainz**, **Spotify**, or **YouTube** -- and paste that service's **Id** for the song. The placeholder shows what the Id looks like: a CCLI song number such as `6016351`, a YouTube video id such as `XtwIT8JjddM`, a Spotify track id, the end of an Apple Music album URL, and so on. B1 builds the full link from the service and Id.
3. Click **Save**. Click an existing link's service name to change or **Delete** it.
4. Click the check mark (**Done**) to return to the song.

A song added from PraiseCharts also gets a **PraiseCharts** tile automatically. The **CCLI** link is special: its Id is the song's CCLI number, which the [exports](#exporting-your-songs) use for your CCLI report.

### Importing from PraiseCharts {#importing-from-praisecharts}

Songs added from the PraiseCharts catalog can pull in PraiseCharts' own charts, lyrics, and audio:

- **Lyrics** -- when an arrangement has no lyrics yet and the song came from PraiseCharts, a banner above the lyrics asks *"Would you like to import the text lyrics from PraiseCharts?"* Click **Import** to fill the arrangement's lyrics with the song's sections (you can then add chords in ChordPro notation).
- **Charts and audio** -- select a key and choose **Add Files > Import files from PraiseCharts**. The **Add Products from PraiseCharts** dialog lists the products available for that key -- chord charts, lead sheets, vocal sheets, rehearsal tracks, and so on -- with the file type and price next to each. Expand a bundle to see what's inside. Click **Download** on products you already own, **Free** on free ones, or the price button to buy one; purchases open PraiseCharts in a popup and the list refreshes when you return. Click **Close** when you're done.
- Anything you've downloaded for a key then appears under **Available Downloads** on that key's tab, in the song dialog on plans, and under **Files** when your team opens the song from a plan in the member app.

:::info
PraiseCharts products are tied to your own PraiseCharts account. If the dialog says *"You do not have a linked PraiseCharts account"*, follow its **profile** link and connect your PraiseCharts login under your [profile](../profile/managing-profile.md) first.
:::

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
