---
title: "Pag-set up ng Self Check-In gamit ang B1 Checkin at B1 Admin"
sidebar_label: "Check-In"
description: "I-set up ang self check-in sa mga serbisyo gamit ang B1 Checkin app sa B1 Admin: mga device, kiosk, iskedyul, branding, at QR sign-up ng bisita."
---

# Check-In

<div class="article-intro">

Sinusuportahan ng B1 Admin ang self check-in sa mga serbisyo sa pamamagitan ng kasamang app na **B1 Checkin**. Maaaring i-check in ng mga miyembro ang kanilang sarili at ang kanilang pamilya sa mga kiosk o nakalaang device pagdating nila, kaya mas mabilis ang proseso at mas gumagaan ang trabaho ng mga boluntaryo. Awtomatikong nire-record bilang attendance ang bawat check-in.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Dapat na naka-configure ang iyong mga campus, oras ng serbisyo, at mga grupo. Tingnan ang [Attendance Setup](setup.md).
- Kailangan mo ng [mga tao sa iyong database](../people/adding-people.md) na may [mga household](../people/adding-people.md#managing-households) para magkasama-samang makapag-check in ang mga pamilya.
- Kakailanganin mo ng tablet at, kung gusto, isang Brother label printer (tingnan ang [mga rekomendasyon sa hardware](#recommended-hardware) sa ibaba).

</div>

## Paano Ito Gumagana

Kumokonekta ang B1 Checkin app sa attendance setup ng iyong B1 Admin. Kapag nag-check in ang isang miyembro, awtomatikong nire-record ang kanyang attendance sa tamang campus, oras ng serbisyo, at grupo. Hindi mo na kailangang maglagay nang manual ng attendance para sa sinumang gumagamit ng check-in system.

## Pag-set Up ng Check-In

1. **I-configure muna ang iyong attendance structure.** Sa B1 Admin, pumunta sa **People > Attendance** at i-click ang **Setup** para tiyaking nakalagay na ang iyong mga campus, oras ng serbisyo, at grupo. Umaasa ang check-in app sa configuration na ito. Opsyonal, bigyan ang bawat oras ng serbisyo ng [check-in schedule](setup.md#setting-a-check-in-schedule) para awtomatikong magbukas at magsara ang check-in kada linggo. Ginagamit ng mga schedule ang time zone ng campus ng serbisyo, o ang time zone ng iyong simbahan kung walang nakatakda sa campus; ipinapakita ng kiosk bilang **Closed** ang mga oras ng serbisyo na sarado na ang window, at sinasabi nito sa mga pamilya kung kailan magbubukas ang check-in. Tingnan ang [Attendance Setup](setup.md) para sa mga detalye.
2. **I-install ang B1 Checkin app** sa mga device na balak mong gamitin. Available ang app sa mga sumusunod na platform:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Mag-sign in sa B1 Checkin app** gamit ang account na may **Checkin** attendance permission (o **Edit Attendance**). Tingnan ang [Check-In Kiosk Accounts](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Piliin ang campus at oras ng serbisyo** para sa kasalukuyang pagtitipon.
5. Maaari nang hanapin ng mga miyembro ang kanilang pangalan sa device at mag-check in.

:::tip
Ilagay ang mga check-in device sa mga nakikita at madaling mapuntahan na lugar, gaya ng pasukan ng lobby o welcome desk. Nakakatulong ang maikling anunsyo sa panahon ng serbisyo para malaman ng mga miyembro na may ganitong opsyon.
:::

:::tip
Kung may maraming campus ang iyong simbahan, kailangan mong ulitin ang setup para sa bawat campus sa [Attendance Setup](setup.md). Maaaring i-configure ang bawat check-in device para sa magkakaibang campus.
:::

## Mga Inirerekomendang Hardware {#recommended-hardware}

**Tablets** — gumagana nang maayos sa app ang alinman sa mga ito:

- **Compact:** Samsung Galaxy Tab A7 Lite 8.7"
- **Malaking Screen:** Samsung Galaxy Tab A8 10.5"
- **Budget:** Amazon Fire HD 10

**Printers** — gumagana ang check-in sa mga Brother label printer para sa pag-print ng name tag:

- **Pinakamahusay:** Brother QL-1110NWB (sumusuporta sa maraming tablet sa pamamagitan ng Bluetooth at WiFi)
- **Maganda:** Brother QL-810W (sumusuporta sa maraming tablet sa pamamagitan ng WiFi)
- **Budget:** Brother QL-1100 (WiFi lang)

**Labels:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Tanging mga Brother label printer lang ang tugma sa B1 Checkin app. Hindi gagana para sa pag-print ng name tag ang ibang brand ng printer.
:::

:::info
Sundin ang setup instructions ng iyong printer para ikonekta ito sa parehong WiFi network ng iyong tablet. Makikita mo ang mga Brother printer driver at setup guide sa [Brother support site](https://support.brother.com).
:::

## Pag-customize ng Itsura ng Kiosk

Maaari mong baguhin ang itsura ng B1 Checkin app para tumugma sa branding ng iyong simbahan. Sa B1 Admin, pumunta sa **Mobile > B1 CheckIn** at gamitin ang **Kiosk Theme** card para i-configure ang:

### Mga Kulay

I-customize ang walong color setting para tumugma sa branding ng iyong simbahan:

- **Primary** at **Primary Contrast** -- Pangunahing brand color at kulay ng teksto nito.
- **Secondary** at **Secondary Contrast** -- Accent color at kulay ng teksto nito.
- **Header Background** at **Subheader Background** -- Mga kulay para sa header area ng kiosk.
- **Button Background** at **Button Text** -- Mga kulay para sa mga interactive na button.

### Background Image

Mag-upload ng opsyonal na background image para sa welcome at lookup screen ng kiosk. Inirerekomendang sukat ay 1920x1080 pixels.

### Idle Screen / Screensaver

I-configure ang screensaver na lumilitaw pagkatapos ng panahong walang aktibidad:

1. I-toggle ang idle screen na **on** o **off**.
2. Itakda ang **timeout** (ilang segundo ng walang aktibidad bago magsimula ang screensaver, pinakamababa ay 10 segundo).
3. Magdagdag ng isa o higit pang **slides** -- bawat slide ay may larawan at tagal ng pagpapakita (pinakamababa ay 3 segundo).

:::tip
Gamitin ang idle screen para magpakita ng mga anunsyo, paparating na event, o welcome message kapag hindi aktibong ginagamit ang kiosk.
:::

## Guest Registration sa Pamamagitan ng QR Code {#guest-registration-via-qr-code}

Maaaring magpakita ang check-in kiosk ng QR code na ini-scan ng mga bisita para sila mismo at ang kanilang pamilya ay makapagparehistro sa sarili nilang telepono. Pinapabilis nito ang proseso ng check-in para sa mga unang beses na bisita.

Kapag nag-scan ng QR code ang isang bisita, dinadala siya sa [guest registration page](../../b1-church/checkin/guest-registration.md) kung saan ilalagay niya ang mga pangalan ng kanyang pamilya at anumang iba pang detalyeng hihingin mo. Maaari na siyang hanapin ng boluntaryo sa kiosk at i-check in.

### Pag-enable ng QR Guest Registration

Para i-on ang pagpapakita ng QR code:

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas) at palawakin ang **Mobile**.
2. I-click ang **B1 CheckIn**.
3. I-toggle ang **QR Guest Registration** sa on at i-click ang **Save**.

:::note
Nasa ilalim ng **Mobile > B1 CheckIn** ang setting na ito (ang parehong pahina ng **Kiosk Theme** card), hindi sa Attendance. Mayroong link sa pahinang ito ang **Kiosk** action sa Attendance page.
:::

Kapag naka-on na ang toggle, lalabas ang iba pang opsyon sa ibaba sa parehong **QR Guest Registration** card. I-click ang **Save** sa card pagkatapos baguhin ang alinman sa mga ito.

### Pagpili ng Sign-up Fields

Kinokontrol ng **Sign-up fields** checklist kung ano ang hihingin ng registration form. Palaging nasa form at palaging kailangan para sa bawat miyembro ng pamilya ang **First Name** at **Last Name**. Para sa bawat ibang field, i-on ang **Include** para idagdag ito sa form, pagkatapos i-on ang **Required** kung kailangang punan ito ng mga bisita. Maaari lang i-on ang **Required** para sa field na may **Include**, at kapag na-off ang **Include**, nabubura rin ito.

| Field | Hinihingi para sa | Kasama bilang default |
|-------|-----------|---------------------|
| **Email** | Primary contact lang | Oo (opsyonal) |
| **Phone** | Primary contact lang | Oo (opsyonal) |
| **Home address** | Isang beses para sa pamilya -- street, address line 2, city, state, at zip. Kapag required, dapat punan ang lahat maliban sa address line 2. Sine-save ang address sa bawat miyembro ng pamilya. | Hindi |
| **Birth date** | Bawat miyembro ng pamilya | Hindi |
| **Gender** | Bawat miyembro ng pamilya | Hindi |
| **Marital status** | Primary contact lang | Hindi |
| **Grade** | Bawat miyembro ng pamilya (PreK hanggang 12, o Graduated) | Hindi |
| **Comments** | Isang beses, sa kahon sa ibaba ng mga miyembro ng pamilya (hanggang 1,000 character) | Hindi |

Hindi nase-save ang mga field na naka-off, kahit ipadala pa ito ng isang tao sa sign-up sa ibang paraan. Sine-save ang mga comment bilang note sa record ng primary contact (nakalagay bilang "Guest sign-up"), kaya mababasa mo ang mga ito sa seksyong **Notes** ng kanilang profile.

### Pagdagdag ng Mga Bisita sa Grupo

Gamitin ang **Add new guests to group** para awtomatikong ilagay ang lahat ng nagpaparehistro sa isa sa iyong mga grupo -- halimbawa, grupong "Newcomers" o grupo para sa event ngayong weekend. Piliin ang **None** (ang default) para lumaktaw dito. Hindi kailanman nakikita o napipili ng mga bisita ang grupo; dito lang ito itinatakda. Palitan ito bago ang bawat event para sabay-sabay mong ma-follow up ang mga bisita ng event na iyon.

### Pag-record ng Attendance

Kapag may napiling grupo, lalabas ang **Also record attendance** switch. I-on ito para markahang present ang mga bisita sa sandaling magparehistro sila, para hindi mo na sila kailangang i-check in nang hiwalay.

Nire-record lang ang attendance kapag nangyari ang sign-up sa isa sa mga **naka-iskedyul** na oras ng serbisyo ng napiling grupo:

- Dapat naka-link ang grupo sa isa o higit pang oras ng serbisyo, at dapat may [check-in schedule](setup.md#setting-a-check-in-schedule) ang mga oras na iyon (isang **Day** at isang **Start Time**).
- Ang "sa panahon ng" ay nangangahulugang nasa loob ng check-in window ng oras ng serbisyo na iyon -- mula sa **Open check-in** na minuto bago magsimula hanggang sa **Close check-in** na minuto pagkatapos ng pagtatapos (o pagkatapos ng simula, kung walang nakatakdang oras ng pagtatapos), sa parehong time zone na ginagamit ng check-in schedule.
- Bawat miyembro ng pamilya ay mamarkahang present sa grupo para sa bawat oras ng serbisyo nito na bukas sa sandaling iyon, sa petsa ngayon.
- Ang mga sign-up sa anumang ibang oras, o para sa grupong walang schedule ang mga oras ng serbisyo, ay idinadagdag sa grupo ngunit hindi binibilang bilang dumadalo.

### Header Photo

Sa ilalim ng **Header photo**, i-click ang **Change photo** para pumili o mag-upload ng larawan (ginugupit sa 16:9 na hugis) na ipapakita sa itaas ng registration page sa halip na default na icon. I-click ang **Remove** para bumalik sa icon.

### Pagbabahagi ng Registration Link

Kapag na-enable na ang QR Guest Registration, lalabas ang seksyong **Share registration QR code** sa ibaba ng card. Nagbibigay ito sa iyo ng dalawang paraan para maabot ng mga bisita ang registration form bukod sa QR code ng kiosk:

- **Copy link** -- kinokopya ang registration URL para maipaskil mo ito sa website ng simbahan, sa mga email, o saanman online.
- **Download PNG** -- dina-download ang QR code bilang larawan na maaari mong i-print sa mga flyer, bulletin, o signage.

:::tip
Idagdag ang registration link sa pahinang "Plan Your Visit" o "I'm New" ng website ng iyong simbahan para makapagparehistro na ang mga bisita bago pa sila dumating.
:::

### Ano ang Mangyayari Pagkatapos Magparehistro ang Bisita

Unang hinahanap ng B1 ang mga taong nasa **People** na. Natutugma ang isang miyembro ng pamilya sa umiiral nang tao kapag eksaktong isang tao lang ang may parehong first name at parehong email o phone number. Ang batang inilagay nang walang email o phone ay natutugma sa pamamagitan ng first name sa loob ng household na natugma. Ginagamit muli ang mga natugmang tao kung paano sila naroon -- hindi kailanman binabago ng sign-up ang kanilang detalye o membership status -- at ang sinumang bago ay sumasali sa natugmang household.

Kapag walang natugma, gumagawa ang sign-up ng bagong household na pinangalanan ayon sa last name ng primary contact, na may person record para sa bawat miyembro ng pamilya. Ang lahat ng bago ay idinadagdag sa **People** na may membership status na **Visitor**, kung saan ang primary contact ang head of household.

Idinadagdag sa napiling grupo ang natugma at bagong tao (kung wala pa sila roon) at nire-record ang kanilang attendance kapag naka-on ito. Sine-save ang mga comment bilang note sa primary contact.

Para awtomatikong i-follow up sila, magdagdag ng [workflow trigger](../serving/workflows.md#triggers) gaya ng **Person · Created** na may kondisyong *Membership Status is Visitor*, o **Group · Member Joined** para sa grupong pinili mo sa itaas.

## Ano ang Nire-record

Bawat check-in ay lumilikha ng attendance record sa B1 Admin. Makikita mo ang mga record na ito sa pahinang [Attendance](tracking-attendance.md) at sa mga session ng bawat [grupo](../groups/group-members.md), tulad ng manual na attendance. Walang pagkakaiba sa itsura ng datos -- parehong pumapasok sa iisang mga ulat ang dalawang paraan.
