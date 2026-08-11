---
title: "Check-In"
---

# Check-In

<div class="article-intro">

Sinusuportahan ng B1 Admin ang self check-in sa mga serbisyo sa pamamagitan ng kasama na **B1 Checkin** app. Maaaring mag-check-in ang mga miyembro ng kanilang sarili at ng kanilang mga pamilya sa mga kiosk o dedikadong device pagdating nila, na nagpapabilis ng proseso at binabawasan ang workload ng iyong mga volunteer. Bawat check-in ay awtomatikong nire-record bilang attendance.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Dapat na configured ang iyong mga campus, service time, at group sa [Attendance Setup](setup.md).
- Kailangan mo ng [mga tao sa iyong database](../people/adding-people.md) na may [household](../people/adding-people.md#managing-households) na naka-setup para makasama-sama ang mga pamilya sa check-in.
- Kailangan mo ng tablet at opsyonal na Brother label printer (tingnan ang [hardware recommendations](#recommended-hardware) sa ibaba).

</div>

## Paano Ito Gumagana

Ang B1 Checkin app ay nag-connect sa iyong B1 Admin attendance setup. Kapag nag-check-in ang isang miyembro, ang kanilang attendance ay awtomatikong nire-record laban sa tamang campus, service time, at group. Hindi mo kailangang manu-manong ipasok ang attendance para sa sinumang gumagamit ng check-in system.

## Pag-set Up ng Check-In

1. **Configure ang iyong attendance structure muna.** Sa B1 Admin, pumunta sa **Attendance > Setup** at siguraduhin na nandoon ang iyong mga campus, service time, at group. Nakadepende ang check-in app sa configuration na ito. Tingnan ang [Attendance Setup](setup.md) para sa mga detalye.
2. **I-install ang B1 Checkin app** sa mga device na plano mong gamitin. Available ang app sa mga sumusunod na platform:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Mag-sign in sa B1 Checkin app** gamit ang credentials ng iyong simbahan.
4. **Piliin ang campus at service time** para sa kasalukuyang gathering.
5. Maaari na ngayong ang mga miyembro na maghanap ng kanilang pangalan sa device at mag-check-in.

:::tip
Ilagay ang check-in device sa nakikitang, madaling maabot na lokasyon tulad ng lobby entrance o welcome desk. Ang maikling announcement sa panahon ng mga serbisyo ay tumutulong sa mga miyembro na malaman na available ang opsyon.
:::

:::tip
Kung may mga campus ang iyong simbahan, kailangan mong ulitin ang setup para sa bawat campus sa [Attendance Setup](setup.md). Bawat check-in device ay maaaring i-configure para sa ibang campus.
:::

## Inirerekomendasyon na Hardware

**Tablet** — ang sinumang ito ay gumagana nang maayos sa app:

- **Compact:** Samsung Galaxy Tab A7 Lite 8.7"
- **Large Screen:** Samsung Galaxy Tab A8 10.5"
- **Budget:** Amazon Fire HD 10

**Printer** — gumagana ang check-in sa Brother label printer para sa pag-print ng name tag:

- **Best:** Brother QL-1110NWB (sumusuporta ng maraming tablet via Bluetooth at WiFi)
- **Good:** Brother QL-810W (sumusuporta ng maraming tablet via WiFi)
- **Budget:** Brother QL-1100 (WiFi lang)

**Labels:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Lamang ang Brother label printer ang compatible sa B1 Checkin app. Hindi gumagana ang ibang brand ng printer para sa pag-print ng name tag.
:::

:::info
Sundin ang setup instruction ng iyong printer para ikonekta ito sa parehong WiFi network ng iyong tablet. Makikita mo ang Brother printer driver at setup guide sa [Brother support site](https://support.brother.com).
:::

## Pagkusubaybayan ang Hitsura ng Kiosk

Maaari mong i-customize ang look at feel ng B1 Checkin app upang tumugma sa branding ng iyong simbahan. Sa B1 Admin, pumunta sa **Attendance > Kiosk Theme** upang i-configure:

### Kulay

I-customize ang walong color setting upang tumugma sa iyong church branding:

- **Primary** at **Primary Contrast** -- Pangunahing brand color at ang text color nito.
- **Secondary** at **Secondary Contrast** -- Accent color at ang text color nito.
- **Header Background** at **Subheader Background** -- Kulay para sa kiosk header area.
- **Button Background** at **Button Text** -- Kulay para sa interactive button.

### Background Image

I-upload ang optional background image para sa kiosk welcome at lookup screen. Ang inirerekomendasyon na laki ay 1920x1080 pixels.

### Idle Screen / Screensaver

Mag-configure ng screensaver na nag-activate pagkatapos ng panahon ng inactivity:

1. I-toggle ang idle screen **on** o **off**.
2. Itakda ang **timeout** (ilang segundo ng inactivity bago magsimula ang screensaver, minimum 10 segundo).
3. Magdagdag ng isa o higit pang **slide** -- bawat slide ay may larawan at display duration (minimum 3 segundo).

:::tip
Gamitin ang idle screen upang ipakita ang mga announcement, paparating na event, o welcome message kapag hindi aktibong ginagamit ang kiosk.
:::

## Guest Registration sa pamamagitan ng QR Code

Ang check-in kiosk ay maaaring magpakita ng QR code na sinuscan ng mga bisita upang i-register ang kanilang sarili at pamilya sa sariling kanilang telepono. Nagpapabilis ito ng check-in process para sa first-time guest.

Kapag sincan ng guest ang QR code, sila ay dadalhin sa [guest registration page](../../b1-church/checkin/guest-registration) kung saan sila nagpapasok ng kanilang pangalan, email, at mga miyembro ng pamilya. Ang isang volunteer ay maaaring tukuyin sila sa kiosk at i-check-in sila.

### Pagpapagana ng QR Guest Registration

Upang i-on ang QR code display:

1. Sa B1 Admin, buksan ang **section menu** sa top-left corner (ang pangalan ng section na may maliit na arrow) at piliin ang **Mobile**.
2. Piliin ang **B1 CheckIn** tab.
3. I-toggle ang **QR Guest Registration** on at i-click ang **Save**.

:::note
Ang setting na ito ay nasa ilalim ng **Mobile**, hindi sa Attendance > Kiosk Theme.
:::

### Pagbabahagi ng Registration Link

Pagkatapos i-enable ang QR Guest Registration, ang **Share registration QR code** section ay lumilitaw sa ibaba ng toggle. Ito ay nagbibigay sa iyo ng dalawang paraan upang makarating ang mga bisita sa registration form bukod sa kiosk QR code:

- **Copy link** — kinokopya ang registration URL para maaari mong i-paste ito sa iyong church website, sa mga email, o kahit saan online.
- **Download PNG** — nag-download ng QR code bilang larawan na maaari mong i-print sa mga flyer, bulletin, o signage.

:::tip
Idagdag ang registration link sa "Plan Your Visit" o "I'm New" page ng iyong church website upang ang mga bisita ay makapag-register kahit bago pa sila dumating.
:::

## Ano ang Nire-record

Bawat check-in ay lumilikha ng attendance record sa B1 Admin. Maaari mong tingnan ang mga record na ito sa [Attendance](tracking-attendance.md) at [Groups](../groups/group-members.md) tabs tulad ng manu-manong ipinasok na attendance. Walang pagkakaiba kung paano lumilitaw ang data — ang parehong paraan ay nagsusumite sa parehong report.
