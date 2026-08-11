---
title: "Check-In Safety"
---

# Check-In Safety

<div class="article-intro">

Kasama ng B1 ang hanay ng child-safety control para sa check-in: capacity limit ng kuwarto at volunteer-to-child ratio, guidance sa edad at grade sa kiosk, check-in type na nagkilala ng miyembro, bisita, at volunteer, at ang trusted-pickup list bawat household na nive-verify sa checkout. Ang page na ito ay nagsasaad kung paano i-configure ang bawat safety feature sa B1 Admin.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- I-set up ang iyong [attendance structure](setup.md) at [check-in kiosk](check-in.md)
- Ang mga kuwarto ay [group](../groups/creating-groups.md) na naka-link sa service time — ang safety setting sa ibaba ay buhay sa group
- Ang page-a-parent at emergency broadcast ay nangangailangan ng connected texting provider ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), o Mutual Ministry)

</div>

## Room Capacity at Pagsara ng Kuwarto

Bawat check-in room (group) ay maaaring mag-enforce ng sariling limit. Buksan ang group, i-click ang **pencil icon** upang i-edit ang setting nito, at hanapin ang **Check-In Capacity** section:

- **Capacity** -- Ang maximum na bilang ng tao na maaaring ma-check-in sa kuwartong ito nang sabay-sabay. Kapag puno ang kuwarto, ang check-in dito ay nakabawal at ang kiosk ay tinatawag ang puno na kuwarto.
- **Guest Capacity** -- Isang optional na hiwalay na cap sa kung gaano karaming bisita ang maaaring hawakan ng kuwarto.
- **Closed for Check-In** -- Itakda sa **Yes** upang ihinto ang lahat ng check-in sa kuwartong ito kaagad (halimbawa, kapag cancelled ang klase o unavailable ang kuwarto). Ang check-out ay patuloy na gumagana.

## Volunteer Ratio

Ang parehong **Check-In Capacity** section sa group ay may kasamang staffing rule:

- **Children per Volunteer** -- Ang maximum na bilang ng bata na maaaring saklaw ng bawat naka-check-in na volunteer (halimbawa, 5 ay nangangahulugang isang volunteer bawat limang bata).
- **Minimum Volunteer** -- Ang pinakamaliit na bilang ng volunteer na dapat na checked-in bago ang mga bata ay maaaring mag-check-in sa kuwarto.

Ang mga volunteer ay binibilang sa mga patakarang ito kapag nag-check-in sila na may uri ng **Volunteer** sa kiosk (tingnan ang [Check-In Type](#check-in-types) sa ibaba).

### Pagpili ng Warn vs. Block

Kung paano mahigpit ang pagpapatupad ng ratio ay isang setting sa buong simbahan:

1. Sa B1 Admin, pumunta sa **Settings > Manage Church** at buksan ang **Check-In** tile.
2. Itakda ang **Volunteer Ratio Enforcement**:
   - **Warn (allow with confirmation)** -- Ang kiosk ay nagpapakita ng warning kapag ang kuwarto ay over ratio o under sa minimum volunteer, at ang staff member ay maaaring mag-confirm upang magpatuloy. Ito ang default.
   - **Block (prevent check-in)** -- Ang check-in sa kuwarto ay hindi pinapayagan hanggang sa sapat na volunteer ang check-in.

:::info
Ang Capacity at Closed for Check-In ay palaging hard limit — ang warn/block na pagpili ay nalalapat lamang sa volunteer ratio.
:::

## Check-In Type

Bawat check-in ay nire-record kung ang tao ay isang **Member**, **Guest**, o **Volunteer**. Ang uri ay pinili sa pamamagitan ng chip sa kiosk household screen (Member ang default). Ang uri ay nag-feed sa safety rule — ang volunteer ay nagbibigay ng ratio coverage, at ang guest ay bumibilang laban sa room's Guest Capacity.

## Age at Grade Room Guidance

Maaari kang magbigay sa bawat kuwarto ng edad o grade bound para gawing guide ang mga pamilya sa tamang kuwarto:

- Sa setting ng group, gamitin ang **Age & Grade** section upang itakda ang minimum/maximum na edad (taon at buwan) at/o grade para sa kuwarto.
- Sa kiosk, ang kuwarto na karapat-dapat ang bata ay highlighted at ang hindi sila ay dimmed. Ang dimmed na kuwarto ay maaaring pa ring mapili na may staff confirmation — ang guidance ay hindi kailanman hard-block.

Ang mga grade ay nagsisimula muli sa iyong simbahan **grade promotion date**:

1. Sa B1 Admin, pumunta sa **Settings > Manage Church** at buksan ang grade promotion tile.
2. Itakda ang buwan at araw na ang iyong simbahan ay nag-promote ng mga estudyante (halimbawa, Agosto 1). Ang edad at grade sa kiosk ay kinakalkula tulad ng pinakabagong promotion date.

## Trusted at Not-Authorized Pickup People

Bawat household ay maaaring magdulot ng listahan ng tao na — o hindi — pinapayagan na mag-pick up ng mga bata nito.

1. Buksan ang page ng tao sa **People** at hanapin ang **Pickup** card.
2. I-click ang **Add**. Maghanap ng existing na tao, o magdagdag ng hindi nasa system sa pamamagitan ng pagpasok ng kanilang **Name**, **Relationship**, at larawan.
3. Itakda ang **Status**:
   - **Trusted** -- Sa check-out, ang taong ito ay lumalabas bilang tappable pickup card na may larawan, na gumagawang mabilis ang verified pickup.
   - **Not Authorized** -- Kung ang isang sinisikap na mag-pick up sa ilalim ng pangalang ito, ang kiosk ay nagsasara ng check-out na may warning. Ang staff member ay maaaring mag-override, at ang override ay nire-record sa attendance record.

I-click ang status chip ng isang tao sa card upang i-toggle sa pagitan ng Trusted at Not Authorized.

:::tip
Magdagdag ng mga larawan sa trusted pickup people kung kailan man posible — ang check-out screen ay nagpapakita ng larawan upang makapag-visual verify ang volunteer ng taong nakatayo sa harap nila.
:::

## Page-a-Parent at Emergency Broadcast

Ang dalawang feature ay nagpapadala ng text message sa pamamagitan ng connected texting provider ng iyong simbahan — walang built-in SMS service, kaya isa sa mga suportadong provider ay dapat una na ma-configure.

- **Page a parent** -- Mula sa manned kiosk's check-out screen, ang staff ay maaaring magpadala ng text sa mga magulang/guardian ng checked-in child (halimbawa, "Mangyaring dumating sa nursery").
- **Emergency broadcast** -- Mula sa kiosk's admin setting, ang staff ay maaaring magpadala ng text sa bawat checked-in household's guardians para sa pipiliin na service nang sabay-sabay. Ang pagpadala ay nangangailangan ng pag-type ng **EMERGENCY** upang mag-confirm.

Ang mga taong nag-opt out ng text, o walang mobile number sa file, ay awtomatikong na-skip — ang kiosk ay nag-report kung ilang mensahe ang ipinadala at ilang nakalimutan.

Tingnan ang kiosk-side walkthrough sa [Check-Out & Child Safety](../../b1-checkin/check-in/checking-out).

## Mga Kaugnay na Artikulo

- [Check-In](check-in.md) — kiosk setup at hardware
- [Check-Out & Child Safety](../../b1-checkin/check-in/checking-out) — ang kiosk check-out, pickup verification, at paging flow
- [Creating Groups](../groups/creating-groups.md) — kung saan nabubuhay ang room setting
- [Attendance Setup](setup.md) — service, service time, at room assignment
- [Minimum Age for Private Message](../settings/mobile-app.md#member-directory--messaging-settings) — nagsasara ng bagong private-message conversation sa mga bata habang nanatiling sila sa directory
