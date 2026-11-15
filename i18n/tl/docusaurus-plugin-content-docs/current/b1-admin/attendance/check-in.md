---
title: "Pag-set Up ng Self Check-In gamit ang B1 Checkin at B1 Admin"
sidebar_label: "Check-In"
description: "I-set up ang self check-in para sa mga serbisyo gamit ang B1 Checkin app sa B1 Admin, kabilang ang mga device, kiosk account, iskedyul, branding, at QR guest sign-up."
---

# Check-In

<div class="article-intro">

Sinusuportahan ng B1 Admin ang self check-in sa mga serbisyo sa pamamagitan ng kasamang app na **B1 Checkin**. Maaaring mag-check in ang mga miyembro, kasama ang kanilang mga pamilya, sa mga kiosk o nakalaang device pagdating nila, kaya mas mabilis ang proseso at nababawasan ang trabaho ng iyong mga boluntaryo. Awtomatikong naitatala bilang attendance ang bawat check-in.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Dapat na naka-configure ang iyong mga campus, oras ng serbisyo, at grupo sa [Attendance Setup](setup.md).
- Kailangan mo ng [mga tao sa iyong database](../people/adding-people.md) na may mga [household](../people/adding-people.md#managing-households) na naka-set up para sabay-sabay na makapag-check in ang mga pamilya.
- Kakailanganin mo ng tablet at, opsyonal, isang Brother label printer (tingnan ang [mga rekomendasyon sa hardware](#recommended-hardware) sa ibaba).

</div>

## Paano Ito Gumagana {#how-it-works}

Kumokonekta ang B1 Checkin app sa iyong attendance setup sa B1 Admin. Kapag nag-check in ang isang miyembro, awtomatikong naitatala ang kanyang attendance sa tamang campus, oras ng serbisyo, at grupo. Hindi mo kailangang manu-manong maglagay ng attendance para sa sinumang gumagamit ng check-in system.

## Pag-set Up ng Check-In {#setting-up-check-in}

1. **I-configure muna ang istruktura ng iyong attendance.** Sa B1 Admin, pumunta sa **People > Attendance** at i-click ang **Setup** para tiyaking nakalagay na ang iyong mga campus, oras ng serbisyo, at grupo. Umaasa ang check-in app sa configuration na ito. Opsyonal, bigyan ang bawat oras ng serbisyo ng [iskedyul ng check-in](setup.md#setting-a-check-in-schedule) para awtomatikong magbukas at magsara ang check-in kada linggo. Gumagamit ang mga iskedyul ng time zone ng campus ng serbisyo, o ng time zone ng iyong simbahan kung walang nakatakda sa campus. Ipinapakita ng kiosk ang mga oras ng serbisyo na sarado na ang window bilang **Closed** at sinasabi sa mga pamilya kung kailan magbubukas ang check-in. Tingnan ang [Attendance Setup](setup.md) para sa mga detalye.
2. **I-install ang B1 Checkin app** sa mga device na balak mong gamitin. Available ang app sa mga sumusunod na platform:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Mag-sign in sa B1 Checkin app** gamit ang account na may **Checkin** attendance permission (o **Edit Attendance**). Tingnan ang [Check-In Kiosk Accounts](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Piliin ang campus at oras ng serbisyo** para sa kasalukuyang pagtitipon.
5. Maaari nang hanapin ng mga miyembro ang kanilang pangalan sa device at mag-check in.

:::tip
Ilagay ang mga check-in device sa mga lugar na madaling makita at mapuntahan, gaya ng mga pasukan ng lobby o welcome desk. Nakakatulong ang maikling anunsiyo sa panahon ng serbisyo para malaman ng mga miyembro na may ganitong opsyon.
:::

:::tip
Kung may maraming campus ang iyong simbahan, kailangan mong ulitin ang setup para sa bawat campus sa [Attendance Setup](setup.md). Maaaring i-configure ang bawat check-in device para sa ibang campus.
:::

## Mga Inirerekomendang Hardware {#recommended-hardware}

**Mga tablet** — alinman sa mga ito ay gumagana nang maayos sa app:

- **Compact:** Samsung Galaxy Tab A7 Lite 8.7"
- **Malaking screen:** Samsung Galaxy Tab A8 10.5"
- **Budget:** Amazon Fire HD 10

**Mga printer** — gumagana ang check-in sa mga Brother label printer para sa pag-print ng name tag:

- **Pinakamahusay:** Brother QL-1110NWB (sumusuporta sa maraming tablet sa pamamagitan ng Bluetooth at WiFi)
- **Maganda:** Brother QL-810W (sumusuporta sa maraming tablet sa pamamagitan ng WiFi)
- **Budget:** Brother QL-1100 (WiFi lamang)

**Mga label:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Tanging mga Brother label printer lamang ang compatible sa B1 Checkin app. Hindi gagana ang ibang brand ng printer para sa pag-print ng name tag.
:::

:::info
Sundin ang setup instructions ng iyong printer para ikonekta ito sa parehong WiFi network ng iyong tablet. Makikita mo ang mga Brother printer driver at setup guide sa [Brother support site](https://support.brother.com).
:::

## Pag-customize ng Itsura ng Kiosk {#customizing-the-kiosk-appearance}

Maaari mong i-customize ang itsura at dating ng B1 Checkin app para tumugma sa branding ng iyong simbahan. Sa B1 Admin, pumunta sa **Mobile > B1 CheckIn** (o i-click ang **Kiosk** sa Attendance page) at gamitin ang **Kiosk Theme** card. I-click ang **Save** sa card pagkatapos ng mga pagbabago.

### Mga Kulay {#colors}

Ginagamit ng kiosk ang parehong kulay ng app ng iyong simbahan. Itakda ang mga ito sa ilalim ng **Mobile > App Theme**; walang sariling color settings ang Kiosk Theme card.

### Background Image {#background-image}

Sa ilalim ng **Background Image**, i-click ang **Upload Image** para magdagdag ng opsyonal na background para sa welcome at lookup screen ng kiosk. Inirerekomendang laki ay 1920x1080 pixels. Gamitin ang **Change Image** o **Remove** para palitan o alisin ito.

### Idle Screen / Screensaver {#idle-screen--screensaver}

I-configure ang screensaver na lumalabas pagkatapos ng panahong walang gumagamit:

1. Buksan ang **Idle Screen / Screensaver** at i-on ang **Enable idle screen**.
2. Itakda ang **Timeout (seconds)** -- ilang segundo ng walang gumagamit bago magsimula ang screensaver (pinakamababa ay 10).
3. I-click ang **Add Slide** para sa bawat slide, i-click ang **Upload** para piliin ang larawan nito, at itakda ang **Duration (s)** nito (pinakamababa ay 3 segundo).

:::tip
Gamitin ang idle screen para magpakita ng mga anunsiyo, paparating na event, o welcome message kapag hindi aktibong ginagamit ang kiosk.
:::

## Guest Registration sa Pamamagitan ng QR Code {#guest-registration-via-qr-code}

Maaaring magpakita ang check-in kiosk ng QR code na i-scan ng mga bisita para sila mismo ang magparehistro, kasama ang kanilang pamilya, sa sarili nilang telepono. Pinapabilis nito ang check-in para sa mga first-time na bisita.

Kapag na-scan ng isang bisita ang QR code, dadalhin siya sa [guest registration page](../../b1-church/checkin/guest-registration.md) kung saan ilalagay niya ang mga pangalan ng kanyang pamilya at anumang iba pang detalye na nais mong itanong. Maaaring hanapin siya ng isang boluntaryo sa kiosk at i-check in.

### Pag-on ng QR Guest Registration {#enabling-qr-guest-registration}

Para i-on ang pagpapakita ng QR code:

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas) at i-expand ang **Mobile**.
2. I-click ang **B1 CheckIn**.
3. I-toggle ang **QR Guest Registration** para i-on at i-click ang **Save**.

:::note
Nasa ilalim ng **Mobile > B1 CheckIn** ang setting na ito (ang parehong page ng **Kiosk Theme** card), hindi sa Attendance. May link sa page na ito ang **Kiosk** action sa Attendance page.
:::

Kapag naka-on na ang toggle, lalabas ang iba pang opsyon sa ibaba sa parehong **QR Guest Registration** card. I-click ang **Save** sa card pagkatapos baguhin ang alinman sa mga ito.

### Pagpili ng Sign-up Fields {#choosing-sign-up-fields}

Kinokontrol ng **Sign-up fields** checklist kung ano ang hinihingi ng registration form. Laging nasa form ang **First Name** at **Last Name** at laging kailangan para sa bawat miyembro ng pamilya. Para sa bawat iba pang field, i-on ang **Include** para idagdag ito sa form, pagkatapos i-on ang **Required** kung kailangang punan ito ng mga bisita. Maaari lamang i-on ang **Required** para sa field na may **Include**, at kapag na-off ang **Include**, nabubura ang **Required**.

| Field | Hinihingi para sa | Kasama bilang default |
|-------|-----------|---------------------|
| **Title** | Bawat miyembro ng pamilya, bilang dropdown sa harap ng pangalan (Mr, Mrs, Miss, Ms, Dr, Prof, Rev, Pastor) | Hindi |
| **Email** | Primary contact lamang | Oo (opsyonal) |
| **Phone** | Bawat miyembro ng pamilya. Kapag required, primary contact lamang ang kailangang maglagay nito. | Oo (opsyonal) |
| **Household role** | Bawat miyembro ng pamilya maliban sa primary contact -- Spouse, Child, o Other. Ang primary contact ay head ng bagong household. Ang sinumang walang role ay sine-save bilang Other. | Oo (opsyonal) |
| **Home address** | Minsan para sa pamilya -- street, address line 2, city, state, at zip. Kapag required, lahat maliban sa address line 2 ay kailangang punan. Sine-save ang address sa bawat miyembro ng pamilya. | Hindi |
| **Birth date** | Bawat miyembro ng pamilya | Hindi |
| **Gender** | Bawat miyembro ng pamilya | Hindi |
| **Marital status** | Primary contact lamang | Hindi |
| **Grade** | Bawat miyembro ng pamilya (PreK hanggang 12, o Graduated) | Hindi |
| **Comments** | Minsan, sa isang kahon sa ibaba ng mga miyembro ng pamilya (hanggang 1,000 characters) | Hindi |

Hindi kailanman sine-save ang mga field na naka-off, kahit ipadala pa ito ng isang tao sa sign-up sa ibang paraan. Sine-save ang comments bilang note sa record ng primary contact (nakalagay bilang "Guest sign-up"), kaya mababasa mo ito sa **Notes** section ng kanyang profile.

### Pagdagdag ng Bisita sa Grupo {#adding-guests-to-a-group}

Gamitin ang **Add new guests to group** para awtomatikong ilagay ang lahat ng nagpa-sign up sa isa sa iyong mga grupo -- halimbawa, grupong "Newcomers" o grupo para sa event ngayong weekend. Piliin ang **None** (default) para laktawan ito. Hindi nakikita o napipili ng mga bisita ang grupo; dito lamang ito itinatakda. Palitan ito bago ang bawat event para sabay-sabay mong ma-follow up ang mga bisita ng event na iyon.

### Pagtatala ng Attendance {#recording-attendance}

Kapag may napiling grupo, lalabas ang **Also record attendance** switch. I-on ito para markahang present ang mga bisita sa sandaling mag-sign up sila, para hindi mo na sila kailangang i-check in nang hiwalay.

Naitatala lamang ang attendance kapag nag-sign up ang tao habang nasa isa sa **naka-iskedyul** na oras ng serbisyo ng napiling grupo:

- Dapat naka-link ang grupo sa isa o higit pang oras ng serbisyo, at ang mga oras ng serbisyong iyon ay dapat may [iskedyul ng check-in](setup.md#setting-a-check-in-schedule) (isang **Day** at isang **Start Time**).
- Ang "habang" ay nangangahulugang nasa loob ng check-in window ng oras ng serbisyong iyon -- mula sa **Open check-in** na minuto bago magsimula hanggang sa **Close check-in** na minuto pagkatapos ng pagtatapos (o pagkatapos ng simula, kung walang nakatakdang end time; kung walang end time at walang close minutes, hanggang sa katapusan ng araw na iyon), sa parehong time zone na ginagamit ng iskedyul ng check-in.
- Bawat miyembro ng pamilya ay mamarkahang present sa grupo para sa bawat oras ng serbisyo nito na bukas sa sandaling iyon, sa petsa ngayon.
- Ang mga sign-up sa ibang oras, o para sa grupong walang iskedyul ang mga oras ng serbisyo, ay idinadagdag sa grupo pero hindi binibilang bilang dumalo.

### Header Photo {#header-photo}

Sa ilalim ng **Header photo**, i-click ang **Change photo** para pumili o mag-upload ng larawan (ginupit sa hugis na 16:9) na ipapakita sa itaas ng registration page sa halip na default na icon. I-click ang **Remove** para bumalik sa icon.

### Pagbabahagi ng Registration Link {#sharing-the-registration-link}

Kapag na-enable na ang QR Guest Registration, lalabas ang seksyong **Share registration QR code** sa ibaba ng card. Nagbibigay ito ng dalawang paraan para mapuntahan ng mga bisita ang registration form bukod sa kiosk QR code:

- **Copy link** -- kinokopya ang registration URL para maidikit mo ito sa website ng iyong simbahan, sa mga email, o saanman online.
- **Download PNG** -- dina-download ang QR code bilang larawan na maaari mong i-print sa mga flyer, bulletin, o signage.

:::tip
Idagdag ang registration link sa pahinang "Plan Your Visit" o "I'm New" ng website ng iyong simbahan para makapag-register ang mga bisita bago pa sila dumating.
:::

### Ano ang Mangyayari Pagkatapos Mag-sign Up ang Bisita {#what-happens-after-a-guest-signs-up}

Unang hinahanap ng B1 ang mga taong nasa **People** na. Itinutugma ang miyembro ng pamilya sa umiiral nang tao kapag eksaktong isang tao lamang ang may parehong first name at parehong email o phone number. Ang batang inilagay nang walang email o phone ay itinutugma sa pamamagitan ng first name sa loob ng household na naitugma. Ginagamit muli ang mga naitugmang tao nang buo ang kanilang detalye -- hindi binabago ng sign-up ang kanilang mga detalye o membership status -- at anumang bagong tao ay sumasali sa naitugmang household.

Kapag walang natugma, lumilikha ang sign-up ng bagong household na pinangalanan ayon sa last name ng primary contact, na may person record para sa bawat miyembro ng pamilya. Lahat ng bago ay idinadagdag sa **People** na may membership status na **Visitor**, kasama ang primary contact bilang head ng household.

Ang mga naitugma at bagong tao ay idinadagdag sa grupong pinili mo (kung wala pa sila roon) at naitatala ang kanilang attendance kapag naka-on iyon. Sine-save ang comments bilang note sa primary contact.

Para awtomatikong i-follow up sila, magdagdag ng [workflow trigger](../serving/workflows.md#triggers) gaya ng **Person · Created** na may kondisyong *Membership Status is Visitor*, o **Group · Member Joined** para sa grupong pinili mo sa itaas.

## Ano ang Naitatala {#what-gets-recorded}

Bawat check-in ay lumilikha ng attendance record sa B1 Admin. Makikita mo ang mga record na ito sa [Attendance](tracking-attendance.md) page at sa mga session ng bawat [grupo](../groups/group-members.md), katulad ng manu-manong inilagay na attendance. Walang pagkakaiba sa paraan ng pagpapakita ng datos -- parehong pinagmumulan ay napupunta sa parehong mga ulat.
