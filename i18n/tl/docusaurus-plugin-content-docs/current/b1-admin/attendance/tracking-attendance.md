---
title: "Pagsubaybay ng Attendance"
description: "Suriin ang mga trend ng attendance, i-filter ang mga report ayon sa campus, serbisyo, o grupo, at i-export ang attendance ng grupo mula sa Attendance page sa B1 Admin."
---

# Pagsubaybay ng Attendance

<div class="article-intro">

Kapag na-configure na ang iyong mga campus, oras ng serbisyo, at grupo, pinapadali ng B1 Admin ang pagrepaso ng datos ng attendance at pagtukoy ng mga trend. Nagbubukas ang Attendance page sa buod ng attendance ngayong linggo, at ang mga **All years** report nito ay may dalawang pangunahing pagtingin -- ang **Attendance Trend** tab para sa mga trend ng buong simbahan at ang **Group Attendance** tab para sa detalye ng bawat grupo -- kasama ang **Headcount Trend** tab para sa [mga kabuuan ng headcount](headcount-entry.md). Gamitin ang mga kasangkapang ito para maunawaan ang mga pattern ng paglago, matukoy ang bumababang partisipasyon, at makagawa ng mga desisyong batay sa datos para sa iyong simbahan.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Dapat naka-set up ang iyong istruktura ng attendance na may kahit isang campus at oras ng serbisyo. Tingnan ang [Attendance Setup](setup.md) kung hindi mo pa ito nagagawa.
- Kailangang maitala muna ang datos ng attendance bago magpakita ng resulta ang mga report. Maaaring manggaling ang datos sa [manu-manong pagpasok](recording-attendance.md) o [self check-in](check-in.md).

</div>

## Pagtingin sa Mga Trend ng Attendance {#viewing-attendance-trends}

1. Buksan ang **B1 Admin**, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), i-expand ang **People**, at i-click ang **Attendance**.
2. I-click ang **All years** sa kaliwang column. Pinipili bilang default ang **Attendance Trend** tab.
3. Awtomatikong tumatakbo ang report kapag nabuksan ang tab, na nagpapakita ng kabuuang attendance kada linggo.

:::tip
Para sa mabilisang pagtingin sa kasalukuyang linggo, ipinapakita ng pangunahing Attendance page kung ilan ang tao sa kuwarto ngayong linggo, ang hati ayon sa kuwarto (grupo), anumang bisita, at 13-linggong bar chart ng check-in -- hindi na kailangan ng report.
:::

## Pag-filter ng Iyong Datos {#filtering-your-data}

Gamitin ang mga filter sa **Filter Report** box para paliitin ang resulta, pagkatapos i-click ang **Run Report**:

- **Campus** -- pumili ng campus para makita ang attendance para lamang sa lokasyong iyon.
- **Service** -- limitahan ang report sa isang serbisyo.
- **Service Time** -- pumili ng oras ng serbisyo para tingnan ang isang partikular na pagtitipon.
- **Group** -- ipakita ang attendance para sa isang grupo.
- **Start Date** at **End Date** -- ang date range na isasama. Bbilang default, sakop ng report ang nakaraang taon, mula isang taon na ang nakalipas hanggang ngayon, at kasama nang buo ang end date.

Nagpapakita ang report ng bar chart at table ng kabuuang bisita kada linggo. Gamitin ang print icon para i-print ito, o ang **Download Options** para i-save ang datos. Bawat linggo ay may label na petsa ng Linggo ng linggong iyon. Mayroon ding column na **Session Dates** ang table na naglilista ng aktwal na mga petsa sa linggong iyon na may attendance (halimbawa, "9/27, 9/30"), para makita mo kung kailan binibilang sa parehong linggo ng Linggo ang isang midweek na pagtitipon.

:::info
Awtomatikong tumatakbo ang mga report sa tuwing bubuksan mo ang Attendance Trend tab, kaya laging updated ang mga numero nang hindi kailangang i-click ang refresh button.
:::

## Group Attendance {#group-attendance}

Ipinapakita ng **Group Attendance** tab kung sino ang dumalo sa bawat session ng grupo. Kapaki-pakinabang ito kapag gusto mong bantayan ang isang partikular na klase, ministry team, o small group sa halip na tingnan ang pangkalahatang bilang ng serbisyo.

1. Sa **All years** reports, piliin ang **Group Attendance** tab.
2. Opsyonal na pumili ng **Campus** at **Service**.
3. Itakda ang **Start Date** at **End Date**. Bilang default, sakop ng report mula nakaraang Linggo hanggang ngayon.
4. I-click ang **Run Report**.

Nakapangkat ang mga resulta ayon sa petsa ng session, pagkatapos ayon sa oras ng serbisyo at grupo, kasama ang mga taong dumalo na nakalista sa ilalim ng bawat grupo. Nakaayos nang alpabeto ang mga oras ng serbisyo, grupo, at pangalan para lumitaw ang bawat heading nang isang beses. Ang row ng bawat tao ay nagpapakita rin ng **Checked In** column na may oras kung kailan naitala ang kanyang attendance (blangko kapag walang oras na nakatala) at **Membership Status** column (halimbawa, Member o Visitor), para madaling makita ang mga bisita.

Para i-download ang datos, i-click ang **Download Options** at piliin ang **Summary**. Ang CSV ay may isang row kada miyembro ng grupo, nakaayos ayon sa grupo at pagkatapos ayon sa pangalan, at isang column para sa bawat session na may petsa sa saklaw (halimbawa, "Sunday - 9:00 AM (2026-09-27)") na may markang **present** o **absent**.

:::tip
Lalong mahalaga ang group attendance para sa mga lider ng [small group](../groups/creating-groups.md) na gustong subaybayan ang partisipasyon sa loob ng kanilang grupo sa paglipas ng panahon.
:::

## Mga Tip sa Paggamit ng Datos ng Attendance {#tips-for-using-attendance-data}

- Rebyuhin ang mga trend buwan-buwan para maagang mahuli ang mga seasonal na pattern.
- Ikumpara ang datos sa antas ng campus para maintindihan kung aling lokasyon ang lumalago.
- Gamitin ang mga report sa antas ng grupo para ma-follow up ang mga [grupong](../groups/group-members.md) bumababa ang attendance.
- Pagsamahin ang mga insight sa attendance sa [AI Search](../people/ai-search.md) tool para mahanap ang mga taong hindi nakadalo kamakailan.

## Mga Kaugnay na Pahina {#related-pages}

- [Recording Attendance](recording-attendance.md) -- manu-manong ilagay ang attendance para sa isang session ng grupo
- [Headcount Entry & Trend](headcount-entry.md) -- isang mas simpleng alternatibo ng kabuuang bilang, na may sariling weekly trend chart
- [Check-In](check-in.md) -- mag-set up ng self check-in para awtomatikong maitala ang attendance
