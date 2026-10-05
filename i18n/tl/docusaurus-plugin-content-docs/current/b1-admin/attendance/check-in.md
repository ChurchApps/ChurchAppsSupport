---
title: "Check-In"
---

# Check-In

<div class="article-intro">

Sinusuportahan ng B1 Admin ang self check-in sa mga serbisyo sa pamamagitan ng kasamang app na **B1 Checkin**. Maaaring i-check in ng mga miyembro ang kanilang sarili at ang kanilang pamilya sa mga kiosk o nakalaang device pagdating nila, kaya mabilis ang proseso at nababawasan ang trabaho ng inyong mga volunteer. Awtomatikong naitatala bilang attendance ang bawat check-in.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Dapat naka-configure na ang inyong mga campus, oras ng serbisyo, at mga grupo sa [Attendance Setup](setup.md).
- Kailangan ninyo ng [mga tao sa inyong database](../people/adding-people.md) na may naka-set up na [mga sambahayan](../people/adding-people.md#managing-households) para makapag-check in nang sama-sama ang mga pamilya.
- Kakailanganin ninyo ng tablet at, kung nais, isang Brother label printer (tingnan ang [mga inirerekomendang hardware](#recommended-hardware) sa ibaba).

</div>

## Paano Ito Gumagana

Nakakonekta ang B1 Checkin app sa attendance setup ninyo sa B1 Admin. Kapag nag-check in ang isang miyembro, awtomatikong naitatala ang kanyang attendance sa tamang campus, oras ng serbisyo, at grupo. Hindi na ninyo kailangang manu-manong ilagay ang attendance ng sinumang gumagamit ng check-in system.

## Pag-set Up ng Check-In

1. **I-configure muna ang inyong attendance structure.** Sa B1 Admin, pumunta sa **Attendance > Setup** at tiyaking nakalagay na ang inyong mga campus, oras ng serbisyo, at mga grupo. Umaasa ang check-in app sa configuration na ito. Tingnan ang [Attendance Setup](setup.md) para sa mga detalye.
2. **I-install ang B1 Checkin app** sa mga device na balak ninyong gamitin. Available ang app sa mga sumusunod na platform:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Mag-sign in sa B1 Checkin app** gamit ang account credentials ng inyong simbahan.
4. **Piliin ang campus at oras ng serbisyo** para sa kasalukuyang pagtitipon.
5. Maaari nang hanapin ng mga miyembro ang kanilang pangalan sa device at mag-check in.

:::tip
Ilagay ang mga check-in device sa mga lugar na kitang-kita at madaling abutin, tulad ng pasukan ng lobby o welcome desk. Makakatulong ang maikling anunsyo habang may serbisyo para malaman ng mga miyembro na may ganitong opsyon.
:::

:::tip
Kung may maraming campus ang inyong simbahan, kailangan ninyong ulitin ang setup para sa bawat campus sa [Attendance Setup](setup.md). Maaaring i-configure ang bawat check-in device para sa ibang campus.
:::

## Mga Inirerekomendang Hardware

**Mga Tablet** — alinman sa mga ito ay mahusay gumana sa app:

- **Compact:** Samsung Galaxy Tab A7 Lite 8.7"
- **Malaking Screen:** Samsung Galaxy Tab A8 10.5"
- **Budget:** Amazon Fire HD 10

**Mga Printer** — gumagana ang check-in sa mga Brother label printer para sa pag-print ng name tag:

- **Pinakamahusay:** Brother QL-1110NWB (sumusuporta sa maraming tablet sa pamamagitan ng Bluetooth at WiFi)
- **Maganda:** Brother QL-810W (sumusuporta sa maraming tablet sa pamamagitan ng WiFi)
- **Budget:** Brother QL-1100 (WiFi lamang)

**Mga Label:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Mga Brother label printer lamang ang compatible sa B1 Checkin app. Hindi gagana ang ibang brand ng printer sa pag-print ng name tag.
:::

:::info
Sundin ang mga tagubilin sa setup ng inyong printer para ikonekta ito sa parehong WiFi network ng inyong tablet. Makikita ninyo ang mga driver at gabay sa setup ng Brother printer sa [Brother support site](https://support.brother.com).
:::

## Pag-customize ng Hitsura ng Kiosk

Maaari ninyong i-customize ang hitsura at dating ng B1 Checkin app para tumugma sa branding ng inyong simbahan. Sa B1 Admin, pumunta sa **Mobile > B1 CheckIn** at gamitin ang card na **Kiosk Theme** para i-configure ang:

### Mga Kulay

I-customize ang walong setting ng kulay para tumugma sa branding ng inyong simbahan:

- **Primary** at **Primary Contrast** -- Ang pangunahing kulay ng brand at ang kulay ng teksto nito.
- **Secondary** at **Secondary Contrast** -- Ang accent color at ang kulay ng teksto nito.
- **Header Background** at **Subheader Background** -- Mga kulay para sa mga bahagi ng header ng kiosk.
- **Button Background** at **Button Text** -- Mga kulay para sa mga button.

### Background Image

Mag-upload ng opsyonal na background image para sa welcome at lookup screen ng kiosk. Ang inirerekomendang laki ay 1920x1080 pixels.

### Idle Screen / Screensaver

Mag-configure ng screensaver na gagana pagkatapos ng ilang sandaling walang gumagamit:

1. I-toggle ang idle screen na **on** o **off**.
2. I-set ang **timeout** (ilang segundong walang gumagamit bago magsimula ang screensaver, minimum na 10 segundo).
3. Magdagdag ng isa o higit pang **slide** -- may larawan at tagal ng pagpapakita ang bawat slide (minimum na 3 segundo).

:::tip
Gamitin ang idle screen para magpakita ng mga anunsyo, paparating na event, o mga mensahe ng pagtanggap kapag hindi aktibong ginagamit ang kiosk.
:::

## Guest Registration sa pamamagitan ng QR Code

Maaaring magpakita ang check-in kiosk ng QR code na i-scan ng mga bisita para irehistro ang kanilang sarili at pamilya sa sarili nilang telepono. Pinabibilis nito ang check-in ng mga unang beses na bisita.

Kapag na-scan ng bisita ang QR code, madadala siya sa [pahina ng guest registration](../../b1-church/checkin/guest-registration) kung saan ilalagay niya ang kanyang pangalan, email, at mga miyembro ng pamilya. Pagkatapos, maaari siyang hanapin ng isang volunteer sa kiosk at i-check in.

### Pag-enable ng QR Guest Registration

Para i-on ang pagpapakita ng QR code:

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas) at i-expand ang **Mobile**.
2. I-click ang **B1 CheckIn**.
3. I-toggle na on ang **QR Guest Registration** at i-click ang **Save**.

:::note
Ang setting na ito ay nasa **Mobile > B1 CheckIn** (parehong pahina ng card na **Kiosk Theme**), hindi sa Attendance.
:::

### Pagbabahagi ng Registration Link

Kapag naka-enable na ang QR Guest Registration, may lalabas na seksyong **Share registration QR code** sa ilalim ng toggle. May dalawa kayong paraan dito para maihatid ang mga bisita sa registration form, bukod sa QR code sa kiosk:

- **Copy link** — kinokopya ang registration URL para mai-paste ninyo ito sa website ng simbahan, sa mga email, o saanman online.
- **Download PNG** — dina-download ang QR code bilang larawan na maaari ninyong i-print sa mga flyer, bulletin, o signage.

:::tip
Idagdag ang registration link sa pahinang "Plan Your Visit" o "I'm New" ng website ng inyong simbahan para makapagrehistro ang mga bisita bago pa man sila dumating.
:::

## Ano ang Naitatala

Bawat check-in ay lumilikha ng attendance record sa B1 Admin. Makikita ninyo ang mga record na ito sa mga tab na [Attendance](tracking-attendance.md) at [Groups](../groups/group-members.md), gaya ng attendance na manu-manong inilagay. Walang pagkakaiba sa paraan ng paglabas ng datos -- pareho silang napupunta sa iisang mga report.
