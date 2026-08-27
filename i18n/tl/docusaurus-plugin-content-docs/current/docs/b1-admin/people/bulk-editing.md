---
title: "Bulk Editing People"
---

# Bulk Editing People

<div class="article-intro">
Ang bulk editing ay nagpapahintulot sa iyo na mag-update ng maraming mga tao nang sabay-sabay, na nakakatipid ng oras kapag gumagawa ng parehong pagbabago sa maraming indibidwal. Maaari mong i-update ang membership status, marital status, gender, opt-out preferences, at group memberships sa isang operasyon.
</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Kailangan mo ng pahintulot upang pamahalaan ang data ng mga tao. Tingnan ang [Roles & Permissions](./roles-permissions.md) para sa mga detalye.
- Dapat mo nang idagdag o mag-import ng mga taong gusto mong i-edit. Tingnan ang [Adding People](./adding-people.md) kung kailangan.
</div>

## Selecting People for Bulk Editing

1. Mag-navigate sa **People** sa B1 Admin
2. Gamitin ang search o filter tools upang mahanap ang mga taong nais mong i-update
3. Suriin ang mga kahon sa tabi ng bawat pangalan ng tao upang piliin ang mga ito
   - Maaari mong piliin ang mga tao nang indibidwal
   - O gamitin ang header checkbox upang piliin ang lahat ng nakikitang mga tao sa kasalukuyang pahina
4. Kapag pumili na ka ng hindi bababa sa isang tao, ang **Bulk Actions** button ay lilitaw

:::tip
Kung kailangan mong i-update ang isang malaking grupo ng mga tao batay sa partikular na mga pamantayan, gamitin ang [AI Search](./ai-search.md) feature o mga filter upang paliitin ang iyong listahan muna, pagkatapos piliin ang lahat ng tumutugon na mga tao.
:::

## Available Bulk Actions

Ang **Bulk Actions** menu ay nagbibigay ng maraming mga pagpipilian:

### Update Membership Status

I-update ang membership status para sa lahat ng napiling mga tao:

1. I-click ang **Bulk Actions** → **Set Membership Status**
2. Pumili ng bagong status:
   - **Visitor** -- Ang mga unang pagbisita o pang-okasyong dumalo
   - **Regular Attendee** -- Mga frequent na dumalo na hindi mga miyembro
   - **Member** -- Mga opisyal na miyembro ng simbahan
   - **Staff** -- Ang mga miyembro ng staff ng simbahan
   - **Inactive** -- Ang mga taong hindi na dumalo
3. Pumili ng update mode:
   - **Overwrite all** -- Palitan ang kasalukuyang status para sa lahat ng napiling mga tao
   - **Only update empty** -- Itakda lamang ang status para sa mga taong walang isa
4. I-click ang **Update**

### Update Marital Status

I-update ang marital status sa bulk:

1. I-click ang **Bulk Actions** → **Set Marital Status**
2. Pumili ng bagong status:
   - **Unknown**
   - **Single**
   - **Married**
   - **Divorced**
   - **Widowed**
3. Pumili kung i-overwrite ang mga umiiral na halaga o lamang i-update ang mga patlang na walang laman
4. I-click ang **Update**

### Update Gender

I-update ang impormasyon ng kasarian para sa maraming mga tao:

1. I-click ang **Bulk Actions** → **Set Gender**
2. Pumili ng halaga:
   - **Unspecified**
   - **Male**
   - **Female**
3. Pumili ng update mode (overwrite lahat o lamang walang laman)
4. I-click ang **Update**

### Update Opt-Out Status

Kontrolin kung ang mga tao ay nag-opt out ng mga komunikasyon:

1. I-click ang **Bulk Actions** → **Set Opted Out**
2. Pumili:
   - **No** -- Payagan ang mga komunikasyon (alisin ang opt-out)
   - **Yes** -- I-block ang mga komunikasyon (itakda ang opt-out)
3. Pumili ng update mode
4. I-click ang **Update**

:::warning
Maging maingat kapag binabago ang opt-out status. Ang mga taong lubos na nag-opt out ay hindi dapat makatanggap ng mga komunikasyon maliban kung nagbigay sila ng bagong pahintulot.
:::

### Set Custom Field

Itakda ang halaga ng Yes/No [custom field](../settings/custom-fields.md) para sa lahat ng napiling mga tao nang sabay-sabay:

1. I-click ang **Bulk Actions** → **Set Custom Field**.
2. Pumili ng Yes/No custom field na gusto mong itakda.
3. Pumili ng halaga (**Yes** o **No**) na ilalapat.
4. I-click ang **Update**.

:::info
Ang lamang ang Yes/No custom fields ay available para sa bulk action na ito. Upang itakda ang ibang uri ng field, i-edit ang bawat tao nang indibidwal.
:::

### Add to Group

Magdagdag ng lahat ng napiling mga tao sa isa o maraming mga grupo:

1. I-click ang **Bulk Actions** → **Add to Group**
2. Maghanap at pumili ng grupo(po) upang magdagdag ng mga tao
3. Maaari kang pumili ng maraming mga grupo upang magdagdag ng mga tao sa lahat ng mga ito
4. I-click ang **Add to Groups**

Bawat tao ay idadagdag bilang isang regular na miyembro ng napiling grupo(po). Maaari mo itong i-promote nang indibidwal sa mga group leader mamaya mula sa [Group Members](../groups/group-members.md) page.

### Remove from Group

Tanggalin ang lahat ng napiling mga tao mula sa isa o maraming mga grupo:

1. I-click ang **Bulk Actions** → **Remove from Group**
2. Maghanap at pumili ng grupo(po) upang alisin ang mga tao
3. Maaari kang pumili ng maraming mga grupo
4. I-click ang **Remove from Groups**

:::info
Ang aksyong ito ay lamang na naglalabas ng mga tao mula sa mga tinukoy na grupo. Hindi ito nagtanggal ng kanilang mga person record.
:::

### Delete People

Permanenteng i-delete ang mga napiling mga tao mula sa iyong church database:

1. I-click ang **Bulk Actions** → **Delete**
2. Suriin ang listahan ng mga taong aalis
3. Mag-type ng **DELETE** sa confirmation field
4. I-click ang **Confirm Delete**

:::danger
Ang pag-delete ng mga tao ay permanente at hindi maaaring i-undo. Ito ay aalis ang lahat ng kanilang data kasama ang:
- Ang personal na impormasyon
- Ang mga miyembro ng grupo
- Ang mga attendance record
- Ang kasaysayan ng donasyon
- Ang mga submission ng form

Gamitin lamang ang aksyong ito kung lubos mong sigurado na gusto mong alisin ang mga taong ito mula sa iyong sistema.
:::

## Bulk Edit Results

Pagkatapos makumpleto ang isang bulk action, makikita mo ang isang buod na nagpapakita ng:

- **Total selected** -- Ilang mga tao ang kasama sa operasyon
- **Successfully updated** -- Ilang mga record ang nabago
- **Failed** -- Anuman ang mga record na hindi ma-update (kung applicable)
- **Unchanged** -- Ang mga record na hindi kailangan ng mga pagbabago (hal., kapag gumagamit ng "only update empty" mode)

Kung nabigo ang anuman na mga update, makikita mo ang error details na nagpapaliwanag kung bakit.

## Best Practices

- **Magsimula nang maliit** -- I-test ang mga bulk operations sa ilang mga record muna upang siguruhing gumagawa ka ng tamang pagbabago
- **Gamitin ang mga filter** -- Paliitin ang iyong listahan na may mga filter o AI search bago pumili ng mga tao upang siguruhin na i-update mo lamang ang mga tamang indibidwal
- **Double-check ang mga pagpipilian** -- Suriin ang mga napiling mga tao bago ilapat ang bulk changes
- **Gamitin ang "only update empty" mode** -- Kapag gusto mong punan ang nawawalang data nang hindi overwriting ng umiiral na impormasyon
- **I-document ang mga pangunahing pagbabago** -- Panatilihing mga tala tungkol sa mga bulk update kung sakaling kailangan mo ng sanggunian mamaya
- **Magko-coordinate sa iyong team** -- Hayaan ang ibang mga administrator na malaman kapag gumagawa ng malaking bulk changes

## Common Use Cases

### Updating New Members

Pagkatapos ng isang membership class, i-update ang lahat ng dumalo sa Member status:

1. Maghanap ng mga taong nag-attend ng klase
2. Piliin ang lahat
3. Gamitin ang **Bulk Actions** → **Set Membership Status** → **Member**

### Organizing Small Groups

Magdagdag ng maraming mga tao sa isang bagong small group:

1. Maghanap ng mga taong gusto mo sa grupo
2. Piliin ang mga ito
3. Gamitin ang **Bulk Actions** → **Add to Group** at piliin ang small group

### Cleaning Up Data

Punan ang nawawalang marital status para sa mga kasal na mga kapareha:

1. I-filter para sa mga taong kasal (gamit ang impormasyon ng sambahayan)
2. Pumili ng mga may blank marital status
3. Gamitin ang **Bulk Actions** → **Set Marital Status** → **Married** → **Only update empty**

## Related Articles

- [Searching People](./searching-people.md) -- Hanapin ang mga taong i-edit
- [AI Search](./ai-search.md) -- Gamitin ang natural na wika upang mahanap ang mga partikular na grupo ng mga tao
- [Group Members](../groups/group-members.md) -- Pamahalaan ang membership ng grupo
- [Exporting Data](./exporting-data.md) -- I-export ang data ng mga tao bago gumawa ng bulk changes
