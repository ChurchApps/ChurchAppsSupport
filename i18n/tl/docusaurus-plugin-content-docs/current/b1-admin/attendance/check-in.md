---
title: "Check-In"
---

# Check-In

<div class="article-intro">

Sinusuportahan ng B1 Admin ang self check-in sa mga serbisyo sa pamamagitan ng kasamang app na **B1 Checkin**. Maaaring i-check in ng mga miyembro ang kanilang sarili at ang kanilang pamilya sa mga kiosk o nakalaang device pagdating nila, kaya mas mabilis ang proseso at nababawasan ang trabaho ng iyong mga boluntaryo. Awtomatikong naitatala bilang attendance ang bawat check-in.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Dapat na naka-configure na ang iyong mga campus, service time, at grupo sa [Attendance Setup](setup.md).
- Kailangan mo ng [mga tao sa iyong database](../people/adding-people.md) na may [mga household](../people/adding-people.md#managing-households) para magkasamang makapag-check in ang mga pamilya.
- Kakailanganin mo ng tablet at, opsyonal, isang Brother label printer (tingnan ang [mga rekomendasyon sa hardware](#recommended-hardware) sa ibaba).

</div>

## Paano Ito Gumagana

Kumokonekta ang B1 Checkin app sa iyong attendance setup sa B1 Admin. Kapag nag-check in ang isang miyembro, awtomatikong naitatala ang kanyang attendance sa tamang campus, service time, at grupo. Hindi mo kailangang manu-manong maglagay ng attendance para sa sinumang gumagamit ng check-in system.

## Pag-set Up ng Check-In

1. **I-configure muna ang iyong attendance structure.** Sa B1 Admin, pumunta sa **People > Attendance** at i-click ang **Setup** para tiyaking nakalagay na ang iyong mga campus, service time, at grupo. Umaasa ang check-in app sa configuration na ito. Opsyonal, bigyan ang bawat service time ng [check-in schedule](setup.md#setting-a-check-in-schedule) para awtomatikong magbukas at magsara ang check-in bawat linggo. Ginagamit ng mga schedule ang time zone ng campus ng serbisyo, o ang time zone ng iyong simbahan kung walang nakatakda sa campus; ipinapakita ng kiosk ang mga service time na sarado na ang window bilang **Closed** at sinasabi sa mga pamilya kung kailan magbubukas ang check-in. Tingnan ang [Attendance Setup](setup.md) para sa mga detalye.
2. **I-install ang B1 Checkin app** sa mga device na balak mong gamitin. Available ang app sa mga sumusunod na platform:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Mag-sign in sa B1 Checkin app** gamit ang mga credential ng account ng iyong simbahan.
4. **Piliin ang campus at service time** para sa kasalukuyang pagtitipon.
5. Maaari nang hanapin ng mga miyembro ang kanilang pangalan sa device at mag-check in.

:::tip
Ilagay ang mga check-in device sa mga lugar na madaling makita at mapuntahan, tulad ng mga pasukan sa lobby o welcome desk. Nakakatulong ang maikling anunsyo habang may serbisyo para malaman ng mga miyembro na may ganitong opsyon.
:::

:::tip
Kung may maraming campus ang iyong simbahan, kailangan mong ulitin ang setup para sa bawat campus sa [Attendance Setup](setup.md). Maaaring i-configure ang bawat check-in device para sa ibang campus.
:::

## Mga Inirerekomendang Hardware

**Tablets** — alinman sa mga ito ay mahusay gamitin sa app:

- **Compact:** Samsung Galaxy Tab A7 Lite 8.7"
- **Malaking Screen:** Samsung Galaxy Tab A8 10.5"
- **Budget:** Amazon Fire HD 10

**Printers** — gumagana ang check-in sa mga Brother label printer para sa pag-print ng name tag:

- **Pinakamahusay:** Brother QL-1110NWB (sumusuporta sa maraming tablet sa pamamagitan ng Bluetooth at WiFi)
- **Maganda:** Brother QL-810W (sumusuporta sa maraming tablet sa pamamagitan ng WiFi)
- **Budget:** Brother QL-1100 (WiFi lang)

**Labels:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Mga Brother label printer lang ang tugma sa B1 Checkin app. Hindi gagana ang ibang brand ng printer para sa pag-print ng name tag.
:::

:::info
Sundin ang setup instructions ng iyong printer para maikonekta ito sa parehong WiFi network ng iyong tablet. Makikita mo ang mga Brother printer driver at setup guide sa [Brother support site](https://support.brother.com).
:::

## Pag-customize ng Itsura ng Kiosk

Maaari mong i-customize ang itsura ng B1 Checkin app para tumugma sa branding ng iyong simbahan. Sa B1 Admin, pumunta sa **Mobile > B1 CheckIn** at gamitin ang **Kiosk Theme** card para i-configure ang:

### Mga Kulay

I-customize ang walong color setting para tumugma sa branding ng iyong simbahan:

- **Primary** at **Primary Contrast** -- Pangunahing brand color at kulay ng teksto nito.
- **Secondary** at **Secondary Contrast** -- Accent color at kulay ng teksto nito.
- **Header Background** at **Subheader Background** -- Mga kulay para sa header area ng kiosk.
- **Button Background** at **Button Text** -- Mga kulay para sa mga interactive na button.

### Background Image

Mag-upload ng opsyonal na background image para sa welcome at lookup screen ng kiosk. Inirerekomendang laki ay 1920x1080 pixels.

### Idle Screen / Screensaver

I-configure ang screensaver na lumalabas pagkatapos ng panahon ng hindi paggamit:

1. I-toggle ang idle screen na **on** o **off**.
2. Itakda ang **timeout** (ilang segundo ng hindi paggamit bago magsimula ang screensaver, pinakamababa ay 10 segundo).
3. Magdagdag ng isa o higit pang **slides** -- ang bawat slide ay may larawan at tagal ng pagpapakita (pinakamababa ay 3 segundo).

:::tip
Gamitin ang idle screen para magpakita ng mga anunsyo, paparating na event, o welcome message kapag hindi aktibong ginagamit ang kiosk.
:::

## Guest Registration sa Pamamagitan ng QR Code

Maaaring magpakita ang check-in kiosk ng QR code na i-scan ng mga bisita para sila mismo ang magparehistro, kasama ang kanilang pamilya, sa sarili nilang telepono. Pinapabilis nito ang check-in ng mga first-time na bisita.

Kapag na-scan ng isang bisita ang QR code, dadalhin siya sa [guest registration page](../../b1-church/checkin/guest-registration) kung saan ilalagay niya ang mga pangalan ng kanyang pamilya at ang iba pang detalyeng gusto mong itanong. Maaari nang hanapin ng isang boluntaryo ang bisita sa kiosk at i-check in siya.

### Pag-enable ng QR Guest Registration

Para i-on ang pagpapakita ng QR code:

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa itaas-kaliwa) at i-expand ang **Mobile**.
2. I-click ang **B1 CheckIn**.
3. I-toggle ang **QR Guest Registration** na on at i-click ang **Save**.

:::note
Nasa ilalim ng **Mobile > B1 CheckIn** ang setting na ito (ang parehong pahina ng **Kiosk Theme** card), hindi sa Attendance. May link sa pahinang ito ang **Kiosk** action sa Attendance page.
:::

Kapag naka-on na ang toggle, lalabas ang iba pang opsyon sa ibaba sa parehong **QR Guest Registration** card. I-click ang **Save** sa card pagkatapos baguhin ang alinman sa mga ito.

### Pagpili ng Sign-up Fields

Kinokontrol ng **Sign-up fields** checklist kung ano ang hihingiin ng registration form. Laging nasa form at laging kailangan para sa bawat miyembro ng pamilya ang **First Name** at **Last Name**. Para sa bawat ibang field, i-on ang **Include** para idagdag ito sa form, at pagkatapos i-on ang **Required** kung kailangang punan ito ng mga bisita. Maaari lang i-on ang **Required** para sa field na may **Include**, at kapag na-off ang **Include**, nawawala rin ang **Required**.

| Field | Hinihingi | Kasama bilang default |
|-------|-----------|---------------------|
| **Email** | Primary contact lang | Oo (opsyonal) |
| **Phone** | Primary contact lang | Oo (opsyonal) |
| **Home address** | Minsan para sa pamilya -- kalye, address line 2, lungsod, estado, at zip. Kapag required, lahat maliban sa address line 2 ay dapat punan. Ise-save ang address sa bawat miyembro ng pamilya. | Hindi |
| **Birth date** | Bawat miyembro ng pamilya | Hindi |
| **Gender** | Bawat miyembro ng pamilya | Hindi |
| **Marital status** | Primary contact lang | Hindi |
| **Grade** | Bawat miyembro ng pamilya (PreK hanggang 12, o Graduated) | Hindi |
| **Comments** | Minsan, sa isang kahon sa ibaba ng mga miyembro ng pamilya (hanggang 1,000 character) | Hindi |

Hindi nase-save ang mga field na na-off mo, kahit may magpadala ng mga ito sa sign-up sa ibang paraan. Ise-save ang mga comment bilang note sa record ng primary contact (naka-post bilang "Guest sign-up"), kaya mababasa mo ang mga ito sa **Notes** section ng kanilang profile.

### Pagdagdag ng mga Bisita sa Grupo

Gamitin ang **Add new guests to group** para awtomatikong ilagay ang lahat ng nag-sign up sa isa sa iyong mga grupo -- halimbawa, grupong "Newcomers" o grupo para sa event ngayong weekend. Piliin ang **None** (ang default) para laktawan ito. Hindi nakikita o napipili ng mga bisita ang grupo; itinatakda lang ito dito. Palitan ito bago ang bawat event para masundan mo nang sabay-sabay ang mga bisita ng event na iyon.

### Pagtatala ng Attendance

Kapag may napiling grupo, lalabas ang switch na **Also record attendance**. I-on ito para markahan ang mga bisita bilang present sa sandaling mag-sign up sila, para hindi mo na sila kailangang i-check in nang hiwalay.

Naitatala lang ang attendance kapag nangyari ang sign-up sa loob ng isa sa mga **naka-iskedyul** na service time ng napiling grupo:

- Dapat nakakonekta ang grupo sa isa o higit pang service time, at dapat may [check-in schedule](setup.md#setting-a-check-in-schedule) ang mga service time na iyon (isang **Day** at isang **Start Time**).
- Ang "sa loob" ay nangangahulugang nasa check-in window ng service time na iyon -- mula sa **Open check-in** na minuto bago ang simula hanggang sa **Close check-in** na minuto pagkatapos ng katapusan (o pagkatapos ng simula, kung walang nakatakdang end time), sa parehong time zone na ginagamit ng check-in schedule.
- Bawat miyembro ng pamilya ay mamarkahang present sa grupo para sa bawat service time nito na bukas sa sandaling iyon, sa petsa ngayon.
- Ang mga sign-up sa anumang ibang oras, o para sa grupong walang schedule ang service time, ay idinadagdag sa grupo pero hindi binibilang bilang dumadalo.

### Header Photo

Sa ilalim ng **Header photo**, i-click ang **Change photo** para pumili o mag-upload ng larawan (ginupitan sa 16:9 na hugis) na ipapakita sa itaas ng registration page kapalit ng default na icon. I-click ang **Remove** para bumalik sa icon.

### Pagbabahagi ng Registration Link

Kapag na-enable na ang QR Guest Registration, lalabas ang seksyong **Share registration QR code** sa ilalim ng card. Nagbibigay ito ng dalawang paraan para maabot ng mga bisita ang registration form bukod sa QR code ng kiosk:

- **Copy link** -- kinokopya ang registration URL para maipaste mo sa website ng iyong simbahan, sa mga email, o kahit saan online.
- **Download PNG** -- dina-download ang QR code bilang larawan na maaari mong i-print sa mga flyer, bulletin, o signage.

:::tip
Idagdag ang registration link sa pahinang "Plan Your Visit" o "I'm New" ng website ng iyong simbahan para makapagparehistro ang mga bisita bago pa sila dumating.
:::

### Ano ang Mangyayari Pagkatapos Mag-sign Up ang Bisita

Ang bawat sign-up ay lumilikha ng bagong household na pinangalanan ayon sa apelyido ng primary contact, na may person record para sa bawat miyembro ng pamilya. Lahat sila ay idinadagdag sa **People** na may membership status na **Visitor**, kasama ang primary contact bilang head of household.

Para awtomatikong masundan sila, magdagdag ng [workflow trigger](../serving/workflows.md#triggers) gaya ng **Person · Created** na may kondisyong *Membership Status is Visitor*, o **Group · Member Joined** para sa grupong pinili mo sa itaas.

## Ano ang Naitatala

Ang bawat check-in ay lumilikha ng attendance record sa B1 Admin. Makikita mo ang mga record na ito sa [Attendance](tracking-attendance.md) page at sa mga session ng [bawat grupo](../groups/group-members.md), gaya ng manual na attendance. Walang pagkakaiba sa paglabas ng datos -- parehong napupunta sa iisang mga ulat ang dalawang paraan.
