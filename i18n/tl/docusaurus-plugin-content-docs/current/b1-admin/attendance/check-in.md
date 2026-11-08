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

## Paano Ito Gumagana

Kumokonekta ang B1 Checkin app sa iyong attendance setup sa B1 Admin. Kapag nag-check in ang isang miyembro, awtomatikong naitatala ang kanyang attendance sa tamang campus, oras ng serbisyo, at grupo. Hindi mo kailangang manu-manong maglagay ng attendance para sa sinumang gumagamit ng check-in system.

## Pag-set Up ng Check-In

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

## Mga Inirerekomendang Hardware

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
Tanging mga Brother label printer ang compatible sa B1 Checkin app. Hindi gagana para sa pag-print ng name tag ang ibang brand ng printer.
:::

:::info
Sundin ang mga tagubilin sa pag-setup ng iyong printer para ikonekta ito sa parehong WiFi network ng iyong tablet. Makikita mo ang mga driver at gabay sa pag-setup ng Brother printer sa [Brother support site](https://support.brother.com).
:::

## Pag-customize ng Itsura ng Kiosk

Maaari mong baguhin ang itsura ng B1 Checkin app para tumugma sa branding ng iyong simbahan. Sa B1 Admin, pumunta sa **Mobile > B1 CheckIn** at gamitin ang **Kiosk Theme** card para i-configure ang:

### Mga Kulay

I-customize ang walong color setting para tumugma sa branding ng iyong simbahan:

- **Primary** at **Primary Contrast** -- Pangunahing kulay ng brand at kulay ng teksto nito.
- **Secondary** at **Secondary Contrast** -- Kulay ng accent at kulay ng teksto nito.
- **Header Background** at **Subheader Background** -- Mga kulay para sa mga bahagi ng header ng kiosk.
- **Button Background** at **Button Text** -- Mga kulay para sa mga interactive na button.

### Larawan sa Background

Mag-upload ng opsyonal na larawan sa background para sa welcome at lookup screen ng kiosk. Inirerekomendang laki ay 1920x1080 pixels.

### Idle Screen / Screensaver

I-configure ang screensaver na lalabas pagkatapos ng panahong walang aktibidad:

1. I-toggle ang idle screen na **on** o **off**.
2. Itakda ang **timeout** (ilang segundo ng walang aktibidad bago magsimula ang screensaver, pinakamababa ay 10 segundo).
3. Magdagdag ng isa o higit pang **slides** -- bawat slide ay may larawan at tagal ng pagpapakita (pinakamababa ay 3 segundo).

:::tip
Gamitin ang idle screen para ipakita ang mga anunsiyo, paparating na event, o mensahe ng pagbati kapag hindi aktibong ginagamit ang kiosk.
:::

## Guest Registration gamit ang QR Code

Maaaring magpakita ang check-in kiosk ng QR code na ii-scan ng mga bisita para mairehistro ang kanilang sarili at ang kanilang pamilya sa sarili nilang telepono. Pinabibilis nito ang check-in para sa mga first-time na bisita.

Kapag ini-scan ng isang bisita ang QR code, dadalhin siya sa isang [guest registration page](../../b1-church/checkin/guest-registration.md) kung saan ilalagay niya ang mga pangalan ng kanyang pamilya at anumang iba pang detalyeng pipiliin mong itanong. Maaaring hanapin ng isang boluntaryo ang bisita sa kiosk at i-check in ito.

### Pag-enable ng QR Guest Registration

Para i-on ang pagpapakita ng QR code:

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas) at i-expand ang **Mobile**.
2. I-click ang **B1 CheckIn**.
3. I-toggle ang **QR Guest Registration** sa **on** at i-click ang **Save**.

:::note
Nasa ilalim ng **Mobile > B1 CheckIn** ang setting na ito (ang parehong pahina ng **Kiosk Theme** card), hindi sa Attendance. May link papunta sa pahinang ito ang aksyong **Kiosk** sa pahina ng Attendance.
:::

Kapag naka-on ang toggle, lalabas ang iba pang opsyon sa ibaba sa parehong **QR Guest Registration** card. I-click ang **Save** sa card pagkatapos baguhin ang alinman sa mga ito.

### Pagpili ng Sign-up Fields

Kinokontrol ng **Sign-up fields** checklist kung ano ang hihingin ng registration form. Palaging nasa form ang **First Name** at **Last Name** at palaging kailangan para sa bawat miyembro ng pamilya. Para sa bawat ibang field, i-on ang **Include** para idagdag ito sa form, pagkatapos ay i-on ang **Required** kung kailangang punan ito ng mga bisita. Maaari lamang i-on ang **Required** para sa field na naka-include, at kapag i-na-off ang **Include**, nabubura ang **Required** nito.

| Field | Hinihingi para sa | Naka-include bilang default |
|-------|-------------------|-----------------------------|
| **Title** | Bawat miyembro ng pamilya, bilang dropdown sa unahan ng pangalan (Mr, Mrs, Miss, Ms, Dr, Prof, Rev, Pastor) | Hindi |
| **Email** | Primary contact lamang | Oo (opsyonal) |
| **Phone** | Bawat miyembro ng pamilya. Kapag required, ang primary contact lamang ang kailangang maglagay nito. | Oo (opsyonal) |
| **Household role** | Bawat miyembro ng pamilya maliban sa primary contact -- Spouse, Child, o Other. Ang primary contact ang magiging head ng bagong household. Ang sinumang walang role ay ise-save bilang Other. | Oo (opsyonal) |
| **Home address** | Minsan para sa buong pamilya -- kalye, address line 2, lungsod, estado, at zip. Kapag required, dapat punan ang lahat maliban sa address line 2. Ise-save ang address sa bawat miyembro ng pamilya. | Hindi |
| **Birth date** | Bawat miyembro ng pamilya | Hindi |
| **Gender** | Bawat miyembro ng pamilya | Hindi |
| **Marital status** | Primary contact lamang | Hindi |
| **Grade** | Bawat miyembro ng pamilya (PreK hanggang 12, o Graduated) | Hindi |
| **Comments** | Minsan, sa kahon sa ibaba ng mga miyembro ng pamilya (hanggang 1,000 karakter) | Hindi |

Hindi kailanman nise-save ang mga field na i-na-off mo, kahit ipadala pa ng isang tao ang mga ito sa sign-up sa ibang paraan. Ise-save ang mga comment bilang note sa record ng primary contact (nakasulat bilang "Guest sign-up"), kaya mababasa mo ang mga ito sa seksyong **Notes** ng kanyang profile.

### Pagdagdag ng mga Bisita sa Grupo

Gamitin ang **Add new guests to group** para awtomatikong ilagay ang lahat ng nagpa-sign up sa isa sa iyong mga grupo, halimbawa, isang grupong "Newcomers" o grupo para sa event ngayong weekend. Piliin ang **None** (ang default) para laktawan ito. Hindi nakikita o napipili ng mga bisita ang grupo; dito lamang ito itinatakda. Baguhin ito bago ang bawat event para magawa mong i-follow up nang sabay-sabay ang mga bisita ng event na iyon.

### Pagtatala ng Attendance

Kapag may napiling grupo, lalabas ang **Also record attendance** switch. I-on ito para markahang present ang mga bisita sa sandaling mag-sign up sila, para hindi mo na sila kailangang i-check in nang hiwalay.

Naitatala lamang ang attendance kapag nangyari ang sign-up sa loob ng isa sa mga **nakaiskedyul** na oras ng serbisyo ng napiling grupo:

- Dapat na naka-link ang grupo sa isa o higit pang oras ng serbisyo, at dapat may [iskedyul ng check-in](setup.md#setting-a-check-in-schedule) ang mga oras ng serbisyong iyon (isang **Day** at **Start Time**).
- Ang "sa loob" ay nangangahulugang nasa loob ng check-in window ng oras ng serbisyo na iyon -- mula sa bilang ng **Open check-in** na minuto bago ang simula hanggang sa bilang ng **Close check-in** na minuto pagkatapos ng pagtatapos (o pagkatapos ng simula, kung walang nakatakdang oras ng pagtatapos; kung wala ring oras ng pagtatapos at close minutes, hanggang sa katapusan ng araw na iyon), sa parehong time zone na ginagamit ng iskedyul ng check-in.
- Mamarkahang present sa grupo ang bawat miyembro ng pamilya para sa bawat oras ng serbisyo nito na bukas sa sandaling iyon, sa petsa ngayon.
- Ang mga sign-up sa anumang ibang oras, o para sa grupong walang iskedyul ang oras ng serbisyo, ay idinadagdag sa grupo ngunit hindi binibilang bilang dumalo.

### Header Photo

Sa ilalim ng **Header photo**, i-click ang **Change photo** para pumili o mag-upload ng larawan (ginupitan sa hugis na 16:9) na ipapakita sa itaas ng registration page kapalit ng default na icon. I-click ang **Remove** para bumalik sa icon.

### Pagbabahagi ng Registration Link

Kapag na-enable ang QR Guest Registration, lalabas ang seksyong **Share registration QR code** sa ibaba ng card. Dalawang paraan ito para maabot ng mga bisita ang registration form, bukod sa QR code sa kiosk:

- **Copy link** — kinokopya ang registration URL para maipaste mo ito sa website ng iyong simbahan, sa mga email, o saanman online.
- **Download PNG** — dina-download ang QR code bilang larawan na maaari mong i-print sa mga flyer, bulletin, o signage.

:::tip
Idagdag ang registration link sa pahinang "Plan Your Visit" o "I'm New" ng website ng iyong simbahan para makapagparehistro ang mga bisita bago pa sila dumating.
:::

### Ano ang Nangyayari Pagkatapos Mag-sign Up ng Bisita

Unang hinahanap ng B1 ang mga taong nasa **People** na. Naitutugma ang isang miyembro ng pamilya sa umiiral nang tao kapag eksaktong isang tao lamang ang may parehong first name at parehong email o phone number. Ang batang inilagay nang walang email o phone ay natutugma sa pamamagitan ng first name sa loob ng household na natugma. Muling ginagamit ang mga natugmang tao nang walang pagbabago -- hindi kailanman binabago ng sign-up ang kanilang mga detalye o membership status -- at ang sinumang bago ay sumasali sa natugmang household.

Kapag walang natugma, lumilikha ang sign-up ng bagong household na pinangalanan ayon sa apelyido ng primary contact, na may record ng tao para sa bawat miyembro ng pamilya. Ang lahat ng bago ay idinadagdag sa **People** na may membership status na **Visitor**, at ang primary contact ang head ng household.

Idinadagdag ang mga natugma at bagong tao sa napili mong grupo (kung wala pa sila roon) at naitatala ang kanilang attendance kapag naka-on ito. Ise-save ang mga comment bilang note sa primary contact.

Para awtomatikong mag-follow up, magdagdag ng [workflow trigger](../serving/workflows.md#triggers) gaya ng **Person · Created** na may kondisyong *Membership Status is Visitor*, o **Group · Member Joined** para sa grupong pinili mo sa itaas.

## Ano ang Naitatala

Bawat check-in ay lumilikha ng attendance record sa B1 Admin. Makikita mo ang mga record na ito sa pahinang [Attendance](tracking-attendance.md) at sa mga session ng bawat [grupo](../groups/group-members.md), gaya ng manu-manong inilagay na attendance. Walang pagkakaiba sa paraan ng pagpapakita ng datos; parehong nagpapakain ng iisang mga report ang dalawang paraan.
