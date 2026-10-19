---
title: "Check-In"
---

# Check-In

<div class="article-intro">

Sinusuportahan ng B1 Admin ang self check-in sa mga serbisyo sa pamamagitan ng kasamang app na **B1 Checkin**. Maaaring i-check in ng mga miyembro ang kanilang sarili at pamilya sa mga kiosk o nakalaang device pagdating nila, kaya mabilis ang proseso at gumagaan ang trabaho ng iyong mga volunteer. Awtomatikong nire-record bilang attendance ang bawat check-in.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Dapat na naka-configure na ang iyong mga campus, oras ng serbisyo, at grupo sa [Attendance Setup](setup.md).
- Kailangan mo ng [mga tao sa iyong database](../people/adding-people.md) na may [mga household](../people/adding-people.md#managing-households) para magkasamang makapag-check in ang mga pamilya.
- Kakailanganin mo ng tablet at, opsyonal, isang Brother label printer (tingnan ang [mga rekomendasyon sa hardware](#recommended-hardware) sa ibaba).

</div>

## Paano Ito Gumagana

Kumokonekta ang B1 Checkin app sa iyong attendance setup sa B1 Admin. Kapag nag-check in ang isang miyembro, awtomatikong nire-record ang kanilang attendance sa tamang campus, oras ng serbisyo, at grupo. Hindi mo kailangang maglagay nang manu-mano ng attendance para sa sinumang gumagamit ng sistema ng check-in.

## Pag-set Up ng Check-In

1. **I-configure muna ang estruktura ng iyong attendance.** Sa B1 Admin, pumunta sa **People > Attendance** at i-click ang **Setup** para matiyak na nakalagay na ang iyong mga campus, oras ng serbisyo, at grupo. Umaasa ang check-in app sa configuration na ito. Opsyonal, bigyan ang bawat oras ng serbisyo ng [iskedyul ng check-in](setup.md#setting-a-check-in-schedule) para awtomatikong magbukas at magsara ang check-in linggo-linggo. Ginagamit ng mga iskedyul ang time zone ng iyong simbahan, o ng campus mo kung walang naka-set na time zone ang simbahan; itinatago ng kiosk ang mga oras ng serbisyo na sarado na ang window at sinasabi sa mga pamilya kapag hindi pa bukas ang check-in. Tingnan ang [Attendance Setup](setup.md) para sa mga detalye.
2. **I-install ang B1 Checkin app** sa mga device na balak mong gamitin. Available ang app sa mga sumusunod na platform:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Mag-sign in sa B1 Checkin app** gamit ang mga kredensyal ng account ng iyong simbahan.
4. **Piliin ang campus at oras ng serbisyo** para sa kasalukuyang pagtitipon.
5. Maaari nang hanapin ng mga miyembro ang kanilang pangalan sa device at mag-check in.

:::tip
Ilagay ang mga check-in device sa nakikita at madaling abutin na lugar, gaya ng pasukan ng lobby o welcome desk. Nakakatulong ang maikling anunsyo habang may serbisyo para malaman ng mga miyembro na may ganitong opsyon.
:::

:::tip
Kung maraming campus ang iyong simbahan, kailangan mong ulitin ang setup para sa bawat campus sa [Attendance Setup](setup.md). Maaaring i-configure ang bawat check-in device para sa ibang campus.
:::

## Inirerekomendang Hardware {#recommended-hardware}

**Mga Tablet** — alinman sa mga ito ay gumagana nang maayos sa app:

- **Compact:** Samsung Galaxy Tab A7 Lite 8.7"
- **Malaking Screen:** Samsung Galaxy Tab A8 10.5"
- **Budget:** Amazon Fire HD 10

**Mga Printer** — gumagana ang check-in sa mga Brother label printer para sa pag-print ng name tag:

- **Pinakamaganda:** Brother QL-1110NWB (sumusuporta sa maraming tablet sa pamamagitan ng Bluetooth at WiFi)
- **Maganda:** Brother QL-810W (sumusuporta sa maraming tablet sa pamamagitan ng WiFi)
- **Budget:** Brother QL-1100 (WiFi lamang)

**Mga Label:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Tanging mga Brother label printer lamang ang tugma sa B1 Checkin app. Hindi gagana para sa pag-print ng name tag ang ibang brand ng printer.
:::

:::info
Sundin ang mga tagubilin sa pag-setup ng iyong printer para ikonekta ito sa parehong WiFi network ng iyong tablet. Makikita mo ang mga driver at gabay sa setup ng Brother printer sa [Brother support site](https://support.brother.com).
:::

## Pag-customize ng Hitsura ng Kiosk

Maaari mong i-customize ang itsura at dating ng B1 Checkin app para tumugma sa branding ng iyong simbahan. Sa B1 Admin, pumunta sa **Mobile > B1 CheckIn** at gamitin ang card na **Kiosk Theme** para i-configure ang:

### Mga Kulay

I-customize ang walong setting ng kulay para tumugma sa branding ng iyong simbahan:

- **Primary** at **Primary Contrast** -- Pangunahing kulay ng brand at kulay ng teksto nito.
- **Secondary** at **Secondary Contrast** -- Kulay na pang-accent at kulay ng teksto nito.
- **Header Background** at **Subheader Background** -- Mga kulay para sa mga header area ng kiosk.
- **Button Background** at **Button Text** -- Mga kulay para sa mga interactive na button.

### Larawan sa Background

Mag-upload ng opsyonal na larawan sa background para sa welcome at lookup screen ng kiosk. Inirerekomendang laki ay 1920x1080 pixels.

### Idle Screen / Screensaver

I-configure ang isang screensaver na mag-a-activate pagkatapos ng panahon ng hindi paggamit:

1. I-toggle ang idle screen **on** o **off**.
2. Itakda ang **timeout** (ilang segundo ng hindi paggamit bago magsimula ang screensaver, minimum na 10 segundo).
3. Magdagdag ng isa o higit pang **slides** -- ang bawat slide ay may larawan at tagal ng pagpapakita (minimum na 3 segundo).

:::tip
Gamitin ang idle screen para ipakita ang mga anunsyo, paparating na event, o mensaheng pang-welcome kapag hindi aktibong ginagamit ang kiosk.
:::

## Guest Registration sa Pamamagitan ng QR Code

Maaaring magpakita ang check-in kiosk ng QR code na i-scan ng mga bisita para mairehistro ang kanilang sarili at pamilya sa sarili nilang telepono. Pinapabilis nito ang check-in para sa mga unang beses na bisita.

Kapag na-scan ng isang bisita ang QR code, dadalhin sila sa isang [guest registration page](../../b1-church/checkin/guest-registration) kung saan nila ilalagay ang kanilang pangalan, email, at mga miyembro ng pamilya. Maaari nang hanapin sila ng isang volunteer sa kiosk at i-check in sila.

### Pag-enable ng QR Guest Registration

Para i-on ang pagpapakita ng QR code:

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa itaas-kaliwa) at palawakin ang **Mobile**.
2. I-click ang **B1 CheckIn**.
3. I-toggle ang **QR Guest Registration** sa on at i-click ang **Save**.

:::note
Nasa ilalim ng **Mobile > B1 CheckIn** ang setting na ito (sa parehong pahina ng card na **Kiosk Theme**), hindi sa Attendance. May link sa pahinang ito ang aksyong **Kiosk** sa pahina ng Attendance.
:::

### Pagbabahagi ng Registration Link

Kapag na-enable na ang QR Guest Registration, lalabas ang seksyong **Share registration QR code** sa ibaba ng toggle. Nagbibigay ito ng dalawang paraan para maabot ng mga bisita ang registration form bukod sa QR code ng kiosk:

- **Copy link** — kinokopya ang registration URL para maidikit mo sa website ng iyong simbahan, sa mga email, o saanman online.
- **Download PNG** — dina-download ang QR code bilang larawang maaari mong i-print sa mga flyer, bulletin, o signage.

:::tip
Idagdag ang registration link sa pahinang "Plan Your Visit" o "I'm New" ng website ng iyong simbahan para makapagparehistro ang mga bisita bago pa sila dumating.
:::

## Ano ang Naitatala

Ang bawat check-in ay lumilikha ng isang attendance record sa B1 Admin. Makikita mo ang mga record na ito sa pahina ng [Attendance](tracking-attendance.md) at sa mga [session](../groups/group-members.md) ng bawat grupo, kapareho ng manwal na inilagay na attendance. Walang pagkakaiba sa paraan ng pagpapakita ng datos — pareho silang napupunta sa parehong mga ulat.
