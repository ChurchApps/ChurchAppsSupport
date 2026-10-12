---
title: "Attendance Setup"
---

# Attendance Setup

<div class="article-intro">

Bago kayo makapagsubaybay ng attendance, kailangan ninyong ipaalam sa B1 Admin ang mga pisikal na lokasyon ng inyong simbahan, kailan ginaganap ang mga serbisyo, at aling mga grupo ang nagpupulong sa bawat serbisyo. Ang minsanang setup na ito ang lumilikha ng istrukturang nagpapatakbo sa lahat ng pagsubaybay at pag-uulat ng attendance sa inyong simbahan.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan ninyo ng aktibong B1 Admin account na may pahintulot na mamahala ng attendance. Tingnan ang [Mga Role at Pahintulot](../people/roles-permissions.md) kung hindi kayo sigurado sa antas ng inyong access.
- Kung balak ninyong magtalaga ng mga grupo sa mga oras ng serbisyo, tiyaking [nalikha na ang inyong mga grupo](../groups/creating-groups.md) muna.

</div>

## Mahahalagang Konsepto

- **Campus** -- isang pisikal na lokasyon kung saan nagtitipon ang inyong simbahan (hal., "Main Campus," "North Campus"). Pinamamahalaan ang mga campus sa ilalim ng **Settings**.
- **Service** -- isang paulit-ulit na pagtitipon sa isang campus (hal., "Sunday Service," "Midweek").
- **Service Time** -- isang partikular na oras kung kailan ginaganap ang serbisyo (hal., "9:00 AM," "11:00 AM").
- **Scheduled Group** -- isang grupong nakatalaga sa isang partikular na oras ng serbisyo. Sinusubaybayan ang attendance sa konteksto ng serbisyong iyon.
- **Unscheduled Group** -- isang grupong sumusubaybay ng attendance nang mag-isa, nang hindi nakatali sa oras ng serbisyo.

## Pag-set Up ng Inyong Attendance Structure

1. Buksan ang **B1 Admin**, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), at i-expand ang **People**.
2. I-click ang **Attendance**, pagkatapos ay i-click ang **Setup** sa kaliwang column. Bubukas ang talahanayang **Service structure**, kasama ang mga bilang ng inyong mga campus, oras ng serbisyo, at naka-iskedyul at walang iskedyul na grupo sa itaas.
3. I-click ang **Manage Campuses** (kanang itaas ng panel na **Service structure**). Dadalhin kayo nito sa **Settings → Campuses**. I-click ang **Add Campus**, ilagay ang pangalan ng inyong lokasyon (opsyonal ang address at time zone), at i-click ang **Save**.
4. Bumalik sa **People → Attendance** at i-click ang **Setup**. Lalabas na ngayon ang inyong campus sa setup table.
5. I-click ang **+ button sa column na Service** sa ilalim ng inyong campus. Maglagay ng pangalan ng serbisyo tulad ng "Sunday Service" at i-click ang **Save**.
6. I-click ang **+ button sa column na Time** sa ilalim ng serbisyo. Maglagay ng pangalan ng **Service Time** tulad ng "9:00 AM", opsyonal na punan ang [check-in schedule](#setting-a-check-in-schedule), at i-click ang **Save**. Ulitin para sa bawat oras ng serbisyo.
7. Para ikonekta ang isang grupo sa oras ng serbisyo, buksan ang grupo mula sa **People > Groups**, i-click ang **Edit**, at gamitin ang **Add Service Time** — tingnan ang susunod na seksyon.

### Pag-enable ng Track Attendance sa Isang Grupo

Bago makapagtala ng attendance ang isang grupo, dapat munang naka-on ang Track Attendance para sa grupong iyon.

1. Sa Jump menu, piliin ang **People > Groups** at piliin ang grupo.
2. I-click ang button na **Edit** sa ilalim ng pangalan ng grupo.
3. Itakda ang **Track Attendance** sa **Yes**.
4. I-click ang **Save**.

:::tip
Kung itinalaga ninyo ang grupo sa isang oras ng serbisyo sa nakaraang hakbang, gamitin din ang opsyong **Add Service Time** sa edit screen ng grupo para i-link ito sa tamang serbisyo. Tinitiyak nito na nakakonekta ang mga session sa tamang campus at oras.
:::

:::tip
Kung nagpupulong ang isang grupo sa labas ng regular na serbisyo -- tulad ng midweek small group na sumusubaybay ng sarili nitong attendance -- maaari ninyo itong iwanang unscheduled group. Lalabas pa rin ito sa ulat na **Group Attendance** para sa pag-uulat ng attendance.
:::

## Pagtatakda ng Check-in Schedule {#setting-a-check-in-schedule}

Maaaring magkaroon ng opsyonal na check-in schedule ang bawat oras ng serbisyo para awtomatikong magbukas at magsara ang [self check-in](check-in.md) bawat linggo. Kapag walang schedule, nananatiling available ang check-in para sa oras ng serbisyong iyon anumang oras (basta hindi sarado ang kwarto dahil sa ibang dahilan, gaya ng pagiging puno nito).

1. Sa view na **Setup**, i-click ang pangalan ng oras ng serbisyo sa column na **Time** (o magdagdag ng bago).
2. Sa ilalim ng **Check-in Schedule**, piliin ang **Day** ng linggo kung kailan ginaganap ang oras ng serbisyo.
3. Itakda ang **Start Time** at, kung nais, ang **End Time**.
4. Maglagay ng **Open check-in (minutes before start)** -- halimbawa, ang `30` ay magbubukas ng check-in kalahating oras bago magsimula ang serbisyo.
5. Maglagay ng **Close check-in (minutes after end)** -- halimbawa, ang `15` ay magpapanatiling bukas ng check-in hanggang 15 minuto pagkatapos ng end time. Kung walang itinakdang end time, bibilangin ito mula sa start time.
6. I-click ang **Save**.

Ginagamit ng schedule ang lokal na oras ng inyong simbahan at inuulit kada linggo. Para alisin ang schedule, itakda ulit ang **Day** sa **No schedule** at i-click ang **Save**. Gumagana lamang ang schedule kapag nakatakda ang **Day** at **Start Time**.

Habang sarado ang check-in window ng isang oras ng serbisyo:

- **Self check-in sa B1.church** ay itinatago ang oras ng serbisyong iyon. Kung walang bukas na oras ang isang serbisyo, makikita ng mga pamilya ang "Check-in isn't open for this service right now."
- **Ang B1 Checkin kiosk app** ay hindi makukumpleto ang check-in sa mga grupo ng oras ng serbisyong iyon; ipinapakita ng kiosk ang screen na **Can't check in yet** na naglilista ng apektadong kwarto para makapili ng ibang kwarto ang pamilya.

:::tip
Magtakda ng malawak na open window (halimbawa, 45 minuto bago magsimula) para makapag-check in ang mga pamilyang maagang dumating at mga boluntaryo, at maikling close window para makapag-check in pa rin ang mga huling dumating kahit nagsimula na ang serbisyo.
:::

## Pag-edit ng Inyong Setup

Maaari ninyong i-update ang inyong setup anumang oras. Pumili ng campus, oras ng serbisyo, o grupo at i-click ang **Edit** para baguhin ang mga detalye nito, o **Delete** para alisin ito.

:::info
Hindi binubura ng pag-alis ng oras ng serbisyo ang mga nakaraang attendance record. Nananatili ang inyong makasaysayang datos kahit baguhin ninyo ang inyong iskedyul.
:::

## Susunod na Hakbang

Kapag nailagay na ang inyong mga campus, oras ng serbisyo, at mga grupo, handa na kayong magsimulang [magtala ng attendance](recording-attendance.md) nang manu-mano o mag-set up ng [self check-in](check-in.md) para sa inyong mga serbisyo.
