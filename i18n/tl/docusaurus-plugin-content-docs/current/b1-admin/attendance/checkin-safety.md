---
title: "Kaligtasan sa Check-In"
---

# Kaligtasan sa Check-In

<div class="article-intro">

Kasama ng B1 ang isang hanay ng mga kontrol sa kaligtasan ng bata para sa check-in: mga limitasyon sa kapasidad ng kwarto at mga ratio ng volunteer-sa-bata, gabay sa edad at antas sa kiosk, mga uri ng check-in na nagpapahiwalay ng mga miyembro, bisita, at volunteer, at isang listahan ng mga pinagkakatiwalaang taong maaaring magpakuha bawat pamilya na sinusuri sa checkout. Ang pahinang ito ay sumasaklaw sa paano i-configure ang bawat tampok sa kaligtasan sa B1 Admin.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- I-setup ang inyong [attendance structure](setup.md) at [check-in kiosks](check-in.md)
- Ang mga kwarto ay [groups](../groups/creating-groups.md) na naka-link sa mga oras ng serbisyo — ang mga setting sa kaligtasan sa ibaba ay nasa group
- Ang page-a-parent at emergency broadcast ay nangangailangan ng konektadong texting provider ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), o Mutual Ministry)

</div>

## Kapasidad ng Kwarto at Pagsasara ng Isang Kwarto

Bawat check-in na kwarto (group) ay maaaring magpatupad ng sariling mga limitasyon. Buksan ang group, i-click ang **pencil icon** upang baguhin ang mga setting nito, at hanapin ang **Check-In Capacity** na seksyon:

- **Capacity** -- Ang maximum na bilang ng mga taong maaaring checked in sa kwartong ito nang sabay-sabay. Kapag puno ang kwarto, ang check-in ay naharang at ang kiosk ay nagpapakita ng puno na kwarto.
- **Guest Capacity** -- Isang opsyonal na hiwalay na cap sa kung gaano karaming bisita ang maaaring hawakan ng kwarto.
- **Closed for Check-In** -- I-set sa **Yes** upang ihinto ang lahat ng check-in sa kwartong ito kaagad (halimbawa, kapag kinansela ang isang klase o ang kwarto ay hindi available). Ang mga checkout ay patuloy na gumagana.

## Mga Ratio ng Volunteer

Ang parehong **Check-In Capacity** na seksyon sa group ay kasama ang mga patakaran sa pag-staff:

- **Children per Volunteer** -- Ang maximum na bilang ng mga bata na bawat checked-in volunteer ay maaaring suportahan (hal. 5 ay nangangahulugang isang volunteer para sa limang mga bata).
- **Minimum Volunteers** -- Ang pinakamaliit na bilang ng mga volunteer na dapat na naka-check in bago ang mga bata ay maaaring mag-check in sa kwarto.

Ang mga volunteer ay binabalanse sa mga panuntunang ito kapag nag-check in nila gamit ang **Volunteer** na uri sa kiosk (tingnan ang [Check-In Types](#check-in-types) sa ibaba).

### Pagpili ng Warn vs. Block

Kung gaano kahigpit ang mga ratio ay ipinapatupad ay isang setting sa buong simbahan:

1. Sa B1 Admin, pumunta sa **Settings > Manage Church** at buksan ang **Check-In** tile.
2. I-set ang **Volunteer Ratio Enforcement**:
   - **Warn (allow with confirmation)** -- Ang kiosk ay nagpapakita ng babala kapag ang kwarto ay higit sa ratio o mas mababa sa minimum na volunteer nito, at ang staff member ay maaaring magpatuloy kahit gaano. Ito ang default.
   - **Block (prevent check-in)** -- Ang check-in sa kwarto ay tinatanggihan hanggang sa may sapat na volunteer na naka-check in.

:::info
Ang Capacity at Closed for Check-In ay palaging mahigpit na limitasyon — ang pagpili ng warn/block ay nalalapat lamang sa mga ratio ng volunteer.
:::

## Mga Uri ng Check-In

Bawat check-in ay nag-record kung ang taong ito ay isang **Member**, **Guest**, o **Volunteer**. Ang uri ay pinili ng mga chip sa kiosk household screen (Member ang default). Ang mga uri ay nagpapakain sa mga patakaran sa kaligtasan — ang mga volunteer ay nagbibigay ng coverage sa ratio, at ang mga bisita ay bumubuo laban sa Guest Capacity ng kwarto.

## Gabay sa Edad at Antas ng Kwarto

Maaari kayong magbigay sa bawat kwarto ng mga hangganan sa edad o antas upang ang kiosk ay gumagabay sa mga pamilya sa mga naaangkop na kwarto:

- Sa mga setting ng group, gamitin ang **Age & Grade** na seksyon upang i-set ang minimum/maximum na edad (taon at buwan) at/o antas para sa kwarto.
- Sa kiosk, ang mga kwarto na angkop ang bata ay naka-highlight at ang mga hindi angkop ay hindi maliwanag. Ang isang hindi maliwanag na kwarto ay maaaring pa rin pumili gamit ang staff confirmation — ang gabay ay hindi kailanman mahigpit na nagsasara.

Ang mga antas ay lumilipat sa **grade promotion date** ng inyong simbahan:

1. Sa B1 Admin, pumunta sa **Settings > Manage Church** at buksan ang grade promotion tile.
2. I-set ang buwan at araw ng pagpo-promote ng mga estudyante sa inyong simbahan (halimbawa, Agosto 1). Ang mga edad at antas sa kiosk ay kinukwenta mula sa pinakabagong promotion date.

## Mga Taong Mapagkakatiwalaan at Hindi Awtorisadong Pagkuha

Bawat pamilya ay maaaring magdulot ng isang listahan ng mga taong — o hindi — pinapayagan na magpakuha ng mga bata nito.

1. Buksan ang pahina ng isang tao sa **People** at hanapin ang **Pickup** card.
2. I-click ang **Add**. Maghanap ng isang umiiral na taong, o magdagdag ng sino nang hindi nasa system sa pamamagitan ng pagpasok ng kanilang **Name**, **Relationship**, at larawan.
3. I-set ang **Status**:
   - **Trusted** -- Sa checkout, ang taong ito ay lumalabas bilang isang tappable pickup card na may kanilang larawan, na ginagawang mabilis ang napatunayan na pickup.
   - **Not Authorized** -- Kung ang sino ay sumusubok sa pagkuha sa ilalim ng taong pangalan, ang kiosk ay nagsasara ng checkout gamit ang babala. Ang staff member ay maaaring magbigay-daan, at ang override ay naitala sa attendance record.

I-click ang status chip ng isang taong sa card upang palitan ang Trusted at Not Authorized.

:::tip
Magdagdag ng mga larawan sa mga pinagkakatiwalaang taong magpakuha kung posible — ang checkout screen ay nagpapakita ng larawan upang ang mga volunteer ay maaaring biswal na mapatunayan ang taong nakatayo sa harap nila.
:::

## Page-a-Parent at Emergency Broadcast

Ang parehong mga feature ay nagpapadala ng text message sa pamamagitan ng konektadong texting provider ng inyong simbahan — walang built-in na SMS service, kaya ang isa sa mga suportadong provider ay dapat na i-configure muna.

- **Page a parent** -- Mula sa isang manned kiosk's checkout screen, ang staff ay maaaring mag-text sa mga magulang/guardians ng isang checked-in child (halimbawa, "Mangyaring dumalo sa nursery").
- **Emergency broadcast** -- Mula sa mga setting ng admin ng kiosk, ang staff ay maaaring mag-text sa bawat checked-in household's guardians para sa napiling serbisyo nang sabay-sabay. Ang pagpapadala ay nangangailangan ng pag-type ng **EMERGENCY** upang kumpirmahin.

Ang mga taong nag-opt out ng mga text, o walang mobile number sa file, ay awtomatikong na-skip — ang kiosk ay nag-report kung gaano karaming mensahe ang ipinadala at gaano karaming ay na-skip.

Tingnan ang kiosk-side walkthrough sa [Check-Out & Child Safety](../../b1-checkin/check-in/checking-out).

## Mga Kaugnay na Artikulo

- [Check-In](check-in.md) — kiosk setup at hardware
- [Check-Out & Child Safety](../../b1-checkin/check-in/checking-out) — ang kiosk checkout, pickup verification, at paging flows
- [Creating Groups](../groups/creating-groups.md) — kung saan ang mga setting ng kwarto ay nabubuhay
- [Attendance Setup](setup.md) — mga serbisyo, oras ng serbisyo, at assignment sa kwarto
- [Minimum Age for Private Messages](../settings/mobile-app.md#member-directory--messaging-settings) — naghaharang ng mga bagong private-message na pag-uusap sa mga bata habang pinapanatili sila sa directory
