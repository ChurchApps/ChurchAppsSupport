---
title: "Check-In"
---

# Check-In

<div class="article-intro">

Sinusuportahan ng B1 Admin ang self check-in sa mga serbisyo sa pamamagitan ng kasamang **B1 Checkin** app. Ang mga miyembro ay maaaring mag-check in para sa kanilang sarili at sa kanilang mga pamilya sa mga kiosk o dedikadong mga device kapag dumating sila, na ginagawang mabilis ang proseso at binabawasan ang workload sa inyong mga volunteer. Ang bawat check-in ay awtomatikong nire-record bilang attendance.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Ang inyong mga campus, oras ng serbisyo, at mga grupo ay dapat na na-configure sa [Attendance Setup](setup.md).
- Kailangan ninyo ng [mga tao sa inyong database](../people/adding-people.md) na may [mga household](../people/adding-people.md#managing-households) na naka-setup upang ang mga pamilya ay maaaring mag-check in nang magkasama.
- Kailangan ninyo ng tablet at opsyonal na Brother label printer (tingnan ang [hardware recommendations](#recommended-hardware) sa ibaba).

</div>

## Paano Ito Gumagana

Ang B1 Checkin app ay kumokonekta sa inyong B1 Admin attendance setup. Kapag nag-check in ang isang miyembro, ang kanilang attendance ay awtomatikong nire-record laban sa tamang campus, oras ng serbisyo, at grupo. Hindi ninyo kailangang manual na ilagay ang attendance para sa sinumang gumagamit ng check-in system.

## Pag-setup ng Check-In

1. **Ayusin muna ang inyong attendance structure.** Sa B1 Admin, pumunta sa **Attendance > Setup** at siguraduhin na ang inyong mga campus, oras ng serbisyo, at mga grupo ay naka-place. Ang check-in app ay umaasa sa configuration na ito. Tingnan ang [Attendance Setup](setup.md) para sa detalye.
2. **I-install ang B1 Checkin app** sa mga device na plano ninyong gamitin. Ang app ay available sa mga sumusunod na platform:
   - **Android/Samsung Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Mag-sign in sa B1 Checkin app** gamit ang credentials ng inyong church account.
4. **Piliin ang campus at oras ng serbisyo** para sa kasalukuyang gathering.
5. Ang mga miyembro ay maaari na ngayong maghanap ng kanilang pangalan sa device at mag-check in.

:::tip
Ilagay ang check-in devices sa makikita at madaling maaabot na mga lokasyon tulad ng lobby entrances o welcome desks. Ang isang maikling announcement sa panahon ng serbisyo ay tumutulong sa mga miyembro na malaman na ang option na ito ay available.
:::

:::tip
Kung ang inyong church ay may maraming mga campus, kailangan ninyong ulitin ang setup para sa bawat campus sa [Attendance Setup](setup.md). Ang bawat check-in device ay maaaring i-configure para sa ibang campus.
:::

## Inirerekomendang Hardware

**Tablets** — anumang ito ay gumagana nang maayos sa app:

- **Compact:** Samsung Galaxy Tab A7 Lite 8.7"
- **Large Screen:** Samsung Galaxy Tab A8 10.5"
- **Budget:** Amazon Fire HD 10

**Printers** — ang mga check-in ay gumagana sa Brother label printer para sa pagpi-print ng name tag:

- **Best:** Brother QL-1110NWB (sumusuporta sa maraming tablets sa pamamagitan ng Bluetooth at WiFi)
- **Good:** Brother QL-810W (sumusuporta sa maraming tablets sa pamamagitan ng WiFi)
- **Budget:** Brother QL-1100 (WiFi lamang)

**Labels:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Ang mga Brother label printer lamang ay compatible sa B1 Checkin app. Ang ibang mga brand ng printer ay hindi gagana para sa pagpi-print ng name tag.
:::

:::info
Sundin ang setup instructions ng inyong printer upang ikonekta ito sa parehong WiFi network ng inyong tablet. Makikita ninyo ang Brother printer driver at setup guides sa [Brother support site](https://support.brother.com).
:::

## Pag-customize ng Kiosk Appearance

Maaari ninyong i-customize ang look at feel ng B1 Checkin app upang tumugma sa branding ng inyong church. Sa B1 Admin, pumunta sa **Attendance > Kiosk Theme** upang i-configure:

### Mga Kulay

I-customize ang walo na color setting upang tumugma sa inyong church branding:

- **Primary** at **Primary Contrast** -- Main brand color at ang color ng text nito.
- **Secondary** at **Secondary Contrast** -- Accent color at ang color ng text nito.
- **Header Background** at **Subheader Background** -- Mga kulay para sa kiosk header areas.
- **Button Background** at **Button Text** -- Mga kulay para sa interactive buttons.

### Background Image

I-upload ang optional background image para sa kiosk welcome at lookup screens. Ang inirerekomendang size ay 1920x1080 pixels.

### Idle Screen / Screensaver

I-configure ang screensaver na mag-activate pagkatapos ng panahon ng inactivity:

1. I-toggle ang idle screen **on** o **off**.
2. Itakda ang **timeout** (ilang segundo ng inactivity bago magsimula ang screensaver, minimum 10 segundo).
3. Magdagdag ng isa o maraming **slides** -- bawat slide ay may image at display duration (minimum 3 segundo).

:::tip
Gamitin ang idle screen upang ipakita ang announcements, mga paparating na event, o welcome messages kapag ang kiosk ay hindi aktibong ginagamit.
:::

## Guest Registration via QR Code

Ang check-in kiosk ay maaaring magpakita ng QR code na i-scan ng mga bisita upang mag-register sa kanilang sarili at sa kanilang pamilya sa kanilang sariling phone. Ito ay nagpapabilis sa check-in process para sa mga first-time guest.

Kapag nag-scan ang guest ng QR code, sila ay dadalhin sa [guest registration page](../../b1-church/checkin/guest-registration) kung saan sila ay magpapasok ng kanilang pangalan, email, at mga miyembro ng pamilya. Ang isang volunteer ay maaaring maghanap para sa kanila sa kiosk at mag-check in sa kanila.

### Pag-enable ng QR Guest Registration

Upang i-turn on ang QR code display:

1. Sa B1 Admin, pumunta sa **Mobile** sa left sidebar (phone icon).
2. Piliin ang **Check-In** tab.
3. I-toggle ang **QR Guest Registration** on.

:::note
Ang setting na ito ay nasa **Mobile**, hindi sa Attendance > Kiosk Theme.
:::

## Ano ang Na-record

Ang bawat check-in ay lumilikha ng attendance record sa B1 Admin. Maaari ninyong tingnan ang mga record na ito sa [Attendance](tracking-attendance.md) at [Groups](../groups/group-members.md) tabs tulad ng manually entered attendance. Walang pagkakaiba sa kung paano lumilitaw ang data — parehong mga method ay napupunta sa parehong mga report.
