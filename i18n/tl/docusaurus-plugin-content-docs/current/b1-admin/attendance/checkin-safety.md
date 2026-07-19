---
title: "Check-In Safety"
---

# Check-In Safety

<div class="article-intro">

Ang B1 ay may kasamang set ng child-safety controls para sa check-in: room capacity limits at volunteer-to-child ratios, age at grade guidance sa kiosk, check-in types na nakakaiba ng members, guests, at volunteers, at isang trusted-pickup list bawat household na verified sa check-out. Ang page na ito ay sumasaklaw kung paano mag-configure ng bawat safety feature sa B1 Admin.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-setup ang iyong [attendance structure](setup.md) at [check-in kiosks](check-in.md)
- Ang mga rooms ay [groups](../groups/creating-groups.md) na naka-link sa service times — ang safety settings sa ibaba ay nakatira sa group
- Ang Page-a-parent at emergency broadcast ay nangangailangan ng connected texting provider ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), o Mutual Ministry)

</div>

## Room Capacity at Pagsasara ng Isang Room

Bawat check-in room (group) ay maaaring magpatibay ng sarili nitong limits. Buksan ang group, i-click ang **pencil icon** upang mag-edit ng settings, at mahanap ang **Check-In Capacity** section:

- **Capacity** -- Ang maximum number ng people na maaaring ma-check in sa room na ito sa isang pagkakataon. Kapag puno ang room, ang check-in dito ay blocked at ang kiosk ay nagsasaad ng full room.
- **Guest Capacity** -- Isang optional na hiwalay na cap sa kung gaano karaming guests ang room ay maaaring hawakan.
- **Closed for Check-In** -- Itakda sa **Yes** upang humigil sa lahat ng check-ins sa room na ito kaagad (halimbawa, kapag ang class ay cancelled o ang room ay unavailable). Ang check-outs ay gumagana pa rin.

## Volunteer Ratios

Ang parehong **Check-In Capacity** section sa group ay may kasamang staffing rules:

- **Children per Volunteer** -- Ang maximum number ng children na bawat checked-in volunteer ay maaaring i-cover (hal. 5 ay nangangahulugan ng isang volunteer bawat limang bata).
- **Minimum Volunteers** -- Ang smallest number ng volunteers na dapat na ma-check in bago ang mga bata ay maaaring mag-check in sa room.

Ang mga volunteers ay bumibilang sa mga rules na ito kapag nag-check in sila na may **Volunteer** type sa kiosk (tingnan ang [Check-In Types](#check-in-types) sa ibaba).

### Pagpili ng Warn vs. Block

Kung paano mahigpit ang enforcement ng ratios ay isang church-wide setting:

1. Sa B1 Admin, pumunta sa **Settings > Manage Church** at buksan ang **Check-In** tile.
2. Itakda ang **Volunteer Ratio Enforcement**:
   - **Warn (allow with confirmation)** -- Ang kiosk ay nagpapakita ng warning kapag ang room ay over ratio o under ang minimum volunteers, at ang isang staff member ay maaaring mag-confirm upang magpatuloy pa rin. Ito ang default.
   - **Block (prevent check-in)** -- Ang check-in sa room ay tinanggihan hanggang sa sapat na volunteers ay checked in.

:::info
Ang Capacity at Closed for Check-In ay palaging hard limits — ang warn/block choice ay nag-apply lamang sa volunteer ratios.
:::

## Check-In Types

Bawat check-in ay nag-record kung ang person ay **Member**, **Guest**, o **Volunteer**. Ang type ay pinipili gamit ang chips sa kiosk household screen (Member ang default). Ang mga types ay sumusuporta sa safety rules — ang mga volunteers ay nagbibigay ng ratio coverage, at ang guests ay bumibilang laban sa Guest Capacity ng room.

## Age at Grade Room Guidance

Maaari kang magbigay sa bawat room ng age o grade bounds upang ang kiosk ay gabay ang mga pamilya sa tamang rooms:

- Sa settings ng group, gamitin ang **Age & Grade** section upang itakda ang minimum/maximum age (taon at buwan) at/o grade para sa room.
- Sa kiosk, ang mga rooms na qualified para sa isang bata ay naka-highlight at ang hindi nila ay naka-dim. Ang isang dimmed room ay maaaring pa ring mapili na may staff confirmation — ang guidance ay hindi kailanman hard-block.

Ang grades ay nag-roll over sa **grade promotion date** ng iyong church:

1. Sa B1 Admin, pumunta sa **Settings > Manage Church** at buksan ang grade promotion tile.
2. Itakda ang buwan at araw na ang iyong church ay nag-promote ng students (halimbawa, August 1). Ang ages at grades sa kiosk ay kinakompute bilang ng most recent promotion date.

## Trusted at Not-Authorized Pickup People

Bawat household ay maaaring magdala ng isang lista ng mga tao na — o hindi — allowed na mag-pick up ng mga bata nito.

1. Buksan ang page ng isang tao sa **People** at mahanap ang **Pickup** card.
2. I-click ang **Add**. Maghanap ng isang existing person, o magdagdag ng isang hindi sa system sa pamamagitan ng pagpasok ng kanilang **Name**, **Relationship**, at isang photo.
3. Itakda ang **Status**:
   - **Trusted** -- Sa check-out, ang personang ito ay lumalabas bilang isang tappable pickup card na may photo, na gumagawa ng verified pickup na mabilis.
   - **Not Authorized** -- Kung ang sinuman ay sinubukan ang pickup sa ilalim ng pangalang ito, ang kiosk ay humahantong sa check-out na may warning. Ang isang staff member ay maaaring mag-override, at ang override ay na-record sa attendance record.

I-click ang status chip ng isang tao sa card upang mag-toggle sa pagitan ng Trusted at Not Authorized.

:::tip
Magdagdag ng mga photos sa trusted pickup people kapag posible — ang check-out screen ay nagpapakita ng photo kaya ang mga volunteers ay maaaring visual na mag-verify ng tao na nakatayo sa kanilang harap.
:::

## Page-a-Parent at Emergency Broadcast

Ang parehong features ay nagpadala ng text messages sa pamamagitan ng connected texting provider ng iyong church — walang built-in na SMS service, kaya isa sa mga supported providers ay dapat na ma-configure muna.

- **Page a parent** -- Mula sa isang manned kiosk's check-out screen, ang staff ay maaaring magpadala ng text sa parents/guardians ng isang checked-in bata (halimbawa, "Please come to the nursery").
- **Emergency broadcast** -- Mula sa kiosk's admin settings, ang staff ay maaaring magpadala ng text sa bawat checked-in household's guardians para sa selected service nang sabay-sabay. Ang pag-send ay nangangailangan ng pag-type ng **EMERGENCY** upang mag-confirm.

Ang mga tao na nag-opt out ng texts, o na walang mobile number sa file, ay automatic na nag-skip — ang kiosk ay nag-report kung ilang messages ang ipinapadala at ilang ang na-skip.

Tingnan ang kiosk-side walkthrough sa [Check-Out & Child Safety](../../b1-checkin/check-in/checking-out).

## Related Articles

- [Check-In](check-in.md) — kiosk setup at hardware
- [Check-Out & Child Safety](../../b1-checkin/check-in/checking-out) — ang kiosk check-out, pickup verification, at paging flows
- [Creating Groups](../groups/creating-groups.md) — kung saan nakatira ang room settings
- [Attendance Setup](setup.md) — services, service times, at room assignments
