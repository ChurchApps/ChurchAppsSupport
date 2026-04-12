---
title: "Check-In"
---

# Check-In

<div class="article-intro">

Sinusuportahan ng B1 Admin ang self check-in sa mga serbisyo sa pamamagitan ng kasamang app na **B1 Checkin**. Maaaring mag-check in ang mga miyembro at ang kanilang mga pamilya sa mga kiosk o nakalaang device pagdating nila, na nagpapabilis ng proseso at nagpapabawas ng trabaho ng inyong mga boluntaryo. Awtomatikong naitatalang bilang attendance ang bawat check-in.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Dapat naka-configure na ang inyong mga campus, oras ng serbisyo, at mga grupo sa [Pag-set Up ng Attendance](setup.md).
- Kailangan ng [mga tao sa inyong database](../people/adding-people.md) na may naka-set up na [mga sambahayan](../people/adding-people.md#managing-households) para makapag-check in nang magkakasama ang mga pamilya.
- Kakailanganin ninyo ang isang tablet at opsyonal na Brother label printer (tingnan ang [mga rekomendasyon sa hardware](#recommended-hardware) sa ibaba).

</div>

## Paano Ito Gumagana

Kumokonekta ang B1 Checkin app sa inyong B1 Admin attendance setup. Kapag nag-check in ang isang miyembro, awtomatikong naitatalang ang kanilang attendance sa tamang campus, oras ng serbisyo, at grupo. Hindi na kailangang manu-manong mag-enter ng attendance para sa sinumang gumagamit ng check-in system.

## Pag-set Up ng Check-In

1. **I-configure muna ang inyong attendance structure.** Sa B1 Admin, pumunta sa **Attendance > Setup** at siguraduhing naka-set up na ang inyong mga campus, oras ng serbisyo, at mga grupo. Umaasa ang check-in app sa configuration na ito. Tingnan ang [Pag-set Up ng Attendance](setup.md) para sa mga detalye.
2. **I-install ang B1 Checkin app** sa mga device na plano ninyong gamitin. Available ang app sa mga sumusunod na platform:
   - **Android/Samsung Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Mag-sign in sa B1 Checkin app** gamit ang mga kredensyal ng account ng inyong simbahan.
4. **Pumili ng campus at oras ng serbisyo** para sa kasalukuyang pagtitipon.
5. Maaari nang maghanap ng kanilang pangalan sa device ang mga miyembro at mag-check in.

:::tip
Ilagay ang mga check-in device sa mga madaling makita at maabot na lokasyon tulad ng mga pasukan ng lobby o welcome desk. Ang maikling anunsyo habang may serbisyo ay makakatulong para malaman ng mga miyembro na available ang opsyong ito.
:::

:::tip
Kung may maraming campus ang inyong simbahan, kailangan ninyong ulitin ang setup para sa bawat campus sa [Pag-set Up ng Attendance](setup.md). Maaaring i-configure ang bawat check-in device para sa ibang campus.
:::

## Mga Rekomendasyon sa Hardware

**Mga Tablet** — alinman sa mga ito ay gumagana nang maayos sa app:

- **Compact:** Samsung Galaxy Tab A7 Lite 8.7"
- **Malaking Screen:** Samsung Galaxy Tab A8 10.5"
- **Budget:** Amazon Fire HD 10

**Mga Printer** — gumagana ang mga check-in sa Brother label printer para sa pag-print ng name tag:

- **Pinakamahusay:** Brother QL-1110NWB (sumusuporta sa maraming tablet sa pamamagitan ng Bluetooth at WiFi)
- **Maganda:** Brother QL-810W (sumusuporta sa maraming tablet sa pamamagitan ng WiFi)
- **Budget:** Brother QL-1100 (WiFi lamang)

**Mga Label:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Tanging Brother label printer lamang ang compatible sa B1 Checkin app. Hindi gagana ang ibang brand ng printer para sa pag-print ng name tag.
:::

:::info
Sundin ang mga setup instruction ng inyong printer para ikonekta ito sa parehong WiFi network ng inyong tablet. Mahahanap ninyo ang mga Brother printer driver at setup guide sa [Brother support site](https://support.brother.com).
:::

## Pag-customize ng Hitsura ng Kiosk

Maaari ninyong i-customize ang hitsura ng B1 Checkin app para tumugma sa branding ng inyong simbahan. Sa B1 Admin, pumunta sa **Attendance > Kiosk Theme** para i-configure ang:

### Mga Kulay

I-customize ang walong color setting para tumugma sa branding ng inyong simbahan:

- **Primary** at **Primary Contrast** -- Pangunahing kulay ng brand at kulay ng teksto nito.
- **Secondary** at **Secondary Contrast** -- Accent na kulay at kulay ng teksto nito.
- **Header Background** at **Subheader Background** -- Mga kulay para sa kiosk header area.
- **Button Background** at **Button Text** -- Mga kulay para sa mga interactive button.

### Background Image

Mag-upload ng opsyonal na background image para sa kiosk welcome at lookup screen. Ang inirerekomendang sukat ay 1920x1080 pixel.

### Idle Screen / Screensaver

I-configure ang screensaver na mag-a-activate pagkatapos ng panahon ng walang ginagawa:

1. I-toggle ang idle screen na **on** o **off**.
2. I-set ang **timeout** (ilang segundo ng walang ginagawa bago magsimula ang screensaver, minimum 10 segundo).
3. Magdagdag ng isa o higit pang **slide** -- ang bawat slide ay may larawan at tagal ng pagpapakita (minimum 3 segundo).

:::tip
Gamitin ang idle screen para magpakita ng mga anunsyo, paparating na event, o mga mensahe ng pagbati kapag hindi aktibong ginagamit ang kiosk.
:::

## Guest Registration sa pamamagitan ng QR Code

Maaaring magpakita ang check-in kiosk ng QR code na ini-scan ng mga bisita para i-rehistro ang kanilang sarili at pamilya sa kanilang sariling telepono. Pinabibilis nito ang proseso ng check-in para sa mga first-time na bisita.

Kapag na-scan ng bisita ang QR code, dadalhin sila sa isang [guest registration page](../../b1-church/checkin/guest-registration) kung saan ilalagay nila ang kanilang pangalan, email, at mga miyembro ng pamilya. Maaaring hanapin sila ng isang boluntaryo sa kiosk at i-check in sila.

### Pag-enable ng QR Guest Registration

Para i-on ang QR code display:

1. Sa B1 Admin, pumunta sa **Mobile** sa kaliwang sidebar (icon ng telepono).
2. Piliin ang **Check-In** tab.
3. I-toggle ang **QR Guest Registration** na on.

:::note
Ang setting na ito ay nasa ilalim ng **Mobile**, hindi sa Attendance > Kiosk Theme.
:::

## Ano ang Naitatala

Ang bawat check-in ay gumagawa ng attendance record sa B1 Admin. Maaari ninyong tingnan ang mga record na ito sa [Attendance](tracking-attendance.md) at [Groups](../groups/group-members.md) tab tulad ng manu-manong nilagay na attendance. Walang pagkakaiba sa kung paano lumilitaw ang data — pareho ang pinagkukunan ng dalawang paraan para sa mga ulat.
