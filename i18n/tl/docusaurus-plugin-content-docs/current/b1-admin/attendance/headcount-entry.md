---
title: "Headcount Entry at Trend"
description: "Maglagay ng kabuuang headcount para sa isang serbisyo o grupo sa B1 Admin nang walang pinangalanang roster, at subaybayan ang mga kabuuang iyon linggo-linggo sa Headcount Trend report."
---

# Headcount Entry at Trend

<div class="article-intro">

Hinahayaan ka ng mga headcount na itala ang simpleng kabuuang bilang ng attendance -- para sa isang serbisyo, isang oras ng serbisyo, o isang grupo -- nang hindi nagche-check in ng pinangalanang roster. Gamitin ito kapag ang kailangan mo lang malaman ay "ilan ang tao rito," at ipares ito sa Headcount Trend report para subaybayan ang bilang na iyon sa paglipas ng panahon.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Dapat na naka-configure ang iyong mga campus, serbisyo, at oras ng serbisyo. Tingnan ang [Attendance Setup](setup.md).
- Ang paglalagay ng headcount ay nangangailangan ng **Attendance &gt; Edit** na permission; ang pagtingin sa trend report ay nangangailangan ng **Attendance &gt; View**. Tingnan ang [Roles & Permissions](../settings/roles-permissions.md).

</div>

:::info
Ang mga headcount ay alternatibo na kabuuan lamang ng [Recording Attendance](recording-attendance.md). Kung kailangan mong malaman **kung sino** ang dumalo -- halimbawa, para ma-follow up ang mga taong hindi na bumalik -- ipagpatuloy ang paggamit ng named session attendance sa Sessions ng grupo. Ang mga headcount ay nag-iimbak lamang ng numero.
:::

## Pagtatala ng Headcount {#recording-a-headcount}

1. Buksan ang **B1 Admin**, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), i-expand ang **People**, at i-click ang **Attendance**.
2. I-click ang **Enter headcount** sa kaliwang column.
3. Punan ang form:
   - **Service** *(kinakailangan)*
   - **Service Time** -- iwanan sa **All service times** para magtala ng kabuuan sa lahat ng oras ng serbisyo
   - **Group** -- opsyonal; tanging mga grupong naka-enable ang Track Attendance ang nakalista. Iwanang blangko para sa "No group (whole service)."
   - **Date**
   - **Headcount** -- ang kabuuang bilang ng taong present (buong numero, 0 o higit pa)
4. I-click ang **Save**.

Nakalista sa **Recent Headcounts** table sa tabi ng form ang iyong huling ilang entry, kasama ang petsa, serbisyo, oras ng serbisyo, grupo, at bilang. I-click ang isang row para ibalik ito sa form kung kailangan mong itama o burahin ito.

## Headcount Trend Report {#headcount-trend-report}

1. Mula sa parehong **Attendance** page, i-click ang **All years** sa kaliwang column, pagkatapos piliin ang **Headcount Trend** tab.
2. Tumatakbo ang report kapag binuksan ang tab. Para paliitin ito, pumili ng **Campus**, **Service**, **Service Time**, o **Group** at i-click ang **Run Report**. Walang date filter -- sakop ng report ang bawat linggong may headcount.

Ipinapakita ng report ang mga naitalang headcount mo na pinagsama kada linggo, bilang line chart at table -- kapareho ng istilo ng report na ginagamit sa [Attendance Trend at Group Attendance tabs](tracking-attendance.md). Lumalabas din ang mga headcount na nailagay para sa kasalukuyang linggo sa ilalim ng **Headcounts this week** sa pangunahing Attendance page.

## Mga Kaugnay na Pahina {#related-pages}

- [Recording Attendance](recording-attendance.md) -- pinangalanan, bawat-tao na session attendance
- [Tracking Attendance](tracking-attendance.md) -- mga trend report ng attendance at grupo
- [Attendance Setup](setup.md) -- i-configure ang mga campus, serbisyo, at oras ng serbisyo
