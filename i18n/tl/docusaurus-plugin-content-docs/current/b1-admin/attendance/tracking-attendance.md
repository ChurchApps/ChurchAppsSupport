---
title: "Pagsubaybay sa Attendance"
---

# Pagsubaybay sa Attendance

<div class="article-intro">

Kapag naka-configure na ang inyong mga campus, oras ng serbisyo, at mga grupo, madali nang suriin ng B1 Admin ang datos ng attendance at makita ang mga trend. May dalawang view sa pag-uulat ang pahinang Attendance -- ang tab na **Attendance Trend** para sa mga trend ng buong simbahan at ang tab na **Group Attendance** para sa detalye sa antas ng grupo. Gamitin ang mga kasangkapang ito para maunawaan ang mga pattern ng paglago, matukoy ang pagbaba ng pakikilahok, at makagawa ng mga desisyong batay sa datos para sa inyong simbahan.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Dapat naka-set up ang inyong attendance structure na may kahit isang campus at oras ng serbisyo. Tingnan ang [Attendance Setup](setup.md) kung hindi pa ninyo ito nagagawa.
- Kailangang maitala muna ang datos ng attendance bago magpakita ng resulta ang mga report. Maaaring magmula ang datos sa [manu-manong pagpasok](recording-attendance.md) o [self check-in](check-in.md).

</div>

## Pagtingin sa mga Trend ng Attendance

1. Buksan ang **B1 Admin**, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), i-expand ang **People**, at i-click ang **Attendance**.
2. I-click ang tab na **Attendance Trend**.
3. Awtomatikong tatakbo ang report kapag nabuksan ang tab, na nagpapakita ng kabuuang attendance kada linggo.

## Pag-filter ng Inyong Datos

Gamitin ang mga filter sa kahong **Filter Report** para paliitin ang mga resulta, saka i-click ang **Run Report**:

- **Campus** -- pumili ng campus para makita ang attendance sa lokasyong iyon lamang.
- **Service** -- limitahan ang report sa isang serbisyo.
- **Service Time** -- pumili ng oras ng serbisyo para tingnan nang mas malalim ang isang partikular na pagtitipon.
- **Group** -- ipakita ang attendance ng isang grupo.
- **Start Date** at **End Date** -- ang saklaw ng petsang isasama. Bilang default, sakop ng report ang nakaraang isang taon, mula isang taon na ang nakalipas hanggang ngayon, at buo ang pagkakasama ng petsa ng pagtatapos.

Ipinapakita ng report ang bar chart at talahanayan ng kabuuang bisita kada linggo. May label ang bawat linggo na petsa ng Linggo ng linggong iyon. May column ding **Session Dates** ang talahanayan na naglilista ng mga aktwal na petsa sa linggong iyon na may attendance (halimbawa, "9/27, 9/30"), para makita ninyo kung kailan binibilang sa parehong linggo ng Linggo ang isang midweek na pagtitipon.

:::info
Awtomatikong tumatakbo ang mga report tuwing bubuksan ninyo ang tab na Attendance Trend, kaya palagi ninyong makikita ang pinakabagong mga numero nang hindi na kailangang mag-click ng refresh button.
:::

## Group Attendance

Ipinapakita ng tab na **Group Attendance** kung sino ang dumalo sa bawat session ng grupo. Kapaki-pakinabang ito kapag nais ninyong subaybayan ang isang partikular na klase, ministry team, o small group sa halip na tingnan ang pangkalahatang bilang ng serbisyo.

1. Piliin ang tab na **Group Attendance**.
2. Opsyonal na pumili ng **Campus** at **Service**.
3. Itakda ang **Start Date** at **End Date**. Bilang default, sakop ng report ang nakaraang Linggo hanggang ngayon.
4. I-click ang **Run Report**.

Pinagsasama-sama ang mga resulta ayon sa petsa ng session, saka ayon sa oras ng serbisyo at grupo, kasama ang mga taong dumalo na nakalista sa ilalim ng bawat grupo. Nakaayos ayon sa alpabeto ang mga oras ng serbisyo, grupo, at pangalan para minsan lang lumabas ang bawat heading. Ipinapakita rin ng hilera ng bawat tao ang column na **Checked In** na may oras kung kailan naitala ang kanyang attendance (blangko kung walang naitalang oras) at column na **Membership Status** (halimbawa, Member o Visitor), para madali ninyong makita ang mga bisita.

Para i-download ang datos, i-click ang **Download Options** at piliin ang **Summary**. May isang hilera ang CSV kada miyembro ng grupo, nakaayos ayon sa grupo at saka sa pangalan, at may column para sa bawat session na may petsa sa saklaw (halimbawa, "Sunday - 9:00 AM (2026-09-27)") na minarkahang **present** o **absent**.

:::tip
Lalo nang mahalaga ang group attendance para sa mga lider ng [small group](../groups/creating-groups.md) na nais subaybayan ang pakikilahok sa loob ng kanilang grupo sa paglipas ng panahon.
:::

## Mga Tip sa Paggamit ng Datos ng Attendance

- Suriin ang mga trend kada buwan para maagang mapansin ang mga pana-panahong pattern.
- Ihambing ang datos sa antas ng campus para malaman kung aling mga lokasyon ang lumalago.
- Gamitin ang mga report sa antas ng grupo para kumustahin ang mga [grupong](../groups/group-members.md) bumababa ang attendance.
- Pagsamahin ang mga kaalaman mula sa attendance at ang kasangkapang [AI Search](../people/ai-search.md) para mahanap ang mga taong matagal nang hindi dumadalo.

## Mga Kaugnay na Pahina

- [Pagtatala ng Attendance](recording-attendance.md) -- manu-manong ilagay ang attendance para sa session ng isang grupo
- [Pagpasok ng Headcount at Trend](headcount-entry.md) -- mas simpleng alternatibong kabuuang bilang, na may sarili nitong lingguhang trend chart
- [Check-In](check-in.md) -- mag-set up ng self check-in para awtomatikong maitala ang attendance
