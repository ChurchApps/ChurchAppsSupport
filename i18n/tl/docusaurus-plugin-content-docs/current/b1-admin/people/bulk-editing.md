---
title: "Maramihang Pag-edit ng mga Tao"
description: "I-update ang membership status, marital status, kasarian, directory opt-out, campus, Yes/No custom field, o grupo para sa maraming tao nang sabay-sabay sa B1 Admin."
---

# Maramihang Pag-edit ng mga Tao

<div class="article-intro">
Pinapayagan ka ng bulk editing na i-update ang maraming tao nang sabay-sabay, na nakakatipid ng oras kapag pareho ang pagbabagong ginagawa sa maraming indibidwal. Puwede mong i-update ang membership status, marital status, kasarian, directory opt-out, campus, Yes/No custom field, membership sa grupo, at mga workflow sa iisang operasyon, o magbura ng mga tao.
</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng pahintulot na mamahala ng datos ng mga tao. Tingnan ang [Roles & Permissions](./roles-permissions.md) para sa mga detalye.
- Dapat ay naidagdag o na-import mo na ang mga taong gusto mong i-edit. Tingnan ang [Adding People](./adding-people.md) kung kailangan.
</div>

## Pagpili ng mga Tao para sa Bulk Editing {#selecting-people-for-bulk-editing}

1. Pumunta sa **People** sa B1 Admin
2. Gamitin ang search o mga filter para hanapin ang mga taong gusto mong i-update
3. Lagyan ng check ang mga kahon para pumili ng mga tao
   - Sa view na **Households**, kapag nag-check ka ng household, napipili ang lahat ng nasa loob nito
   - Sa view na **Table** (lumipat gamit ang toggle na **View as**), maaari kang pumili ng mga tao nang isa-isa
   - O gamitin ang checkbox sa itaas ng listahan para piliin ang lahat ng nakikitang tao
4. Kapag napili mo na ang kahit isang tao, ipinapakita ng bar sa itaas ng listahan kung ilan ang napili, kasama ang **Clear Selection** at button na **Actions**

:::tip
Kung kailangan mong i-update ang malaking grupo ng mga tao batay sa partikular na pamantayan, gamitin ang feature na [AI Search](./ai-search.md) o mga filter para paliitin muna ang listahan mo, pagkatapos ay piliin lahat ng tugmang tao.
:::

## Mga Available na Bulk Action {#available-bulk-actions}

Nagbibigay ang menu na **Actions** ng mga opsyong nasa ibaba. Bawat isa ay nagbubukas ng maliit na dialog na nagsasabi kung ilang tao ang babaguhin nito; pumili ng halaga at i-click ang **Apply**. Papalitan ng bagong halaga ang anumang dating halaga ng bawat napiling tao. Kapag tapos na, may mensaheng lalabas sa ibaba ng pahina na nagkukumpirma kung ilang tao ang na-update.

### Set Membership Status {#set-membership-status}

1. I-click ang **Actions** → **Set Membership Status**
2. Piliin ang bagong **Membership Status**:
   - **Visitor** -- Mga unang beses o paminsan-minsang dumadalo
   - **Guest** -- Mga bisita, gaya ng mga pamilyang nagparehistro sa check-in kiosk
   - **Regular Attendee** -- Mga madalas dumalo na hindi miyembro
   - **Member** -- Mga opisyal na miyembro ng simbahan
   - **Staff** -- Mga staff ng simbahan
   - **Inactive** -- Mga taong hindi na dumadalo
   - **Deceased** -- Mga taong namatay na
3. I-click ang **Apply**

### Set Marital Status {#set-marital-status}

1. I-click ang **Actions** → **Set Marital Status**
2. Piliin ang **Unknown**, **Single**, **Married**, **Divorced**, o **Widowed**
3. I-click ang **Apply**

### Set Gender {#set-gender}

1. I-click ang **Actions** → **Set Gender**
2. Piliin ang **Unspecified**, **Male**, o **Female**
3. I-click ang **Apply**

### Set Directory Opt-Out {#set-directory-opt-out}

Kinokontrol ng directory opt-out kung lumalabas ang mga tao sa member directory -- ang [naka-print na directory](./print-directory.md) at ang member directory sa B1 app. Ito ang parehong setting ng **Hide me from the member directory** sa record ng isang tao.

1. I-click ang **Actions** → **Set Directory Opt-Out**
2. Piliin ang **Opted Out Yes** para itago ang mga napiling tao sa directory, o **Opted Out No** para ipakitang muli sila
3. I-click ang **Apply**

:::warning
Ang mga taong pumili na itago ang sarili nila sa directory ay dapat manatiling nakatago maliban kung hilingin nilang ilista muli.
:::

### Set Campus {#set-campus}

Lumalabas ang opsyong ito kapag may [mga campus](../settings/campuses.md) na naka-set up ang iyong simbahan.

1. I-click ang **Actions** → **Set Campus**
2. Piliin ang campus
3. I-click ang **Apply**

### Set Custom Field {#set-custom-field}

Magtakda ng halagang Yes/No [custom field](../settings/custom-fields.md) para sa lahat ng napiling tao nang sabay-sabay:

1. I-click ang **Actions** → **Set Custom Field**.
2. Piliin ang Yes/No **Custom Field** na gusto mong itakda.
3. Piliin ang **Value** (**Yes** o **No**) na ilalapat.
4. I-click ang **Apply**.

:::info
Yes/No custom field lang ang available para sa bulk action na ito. Para magtakda ng ibang uri ng field, i-edit ang bawat tao nang isa-isa. Kung walang Yes/No custom field ang iyong simbahan, sasabihin ito ng dialog.
:::

### Add to Group {#add-to-group}

1. I-click ang **Actions** → **Add to Group**
2. Piliin ang **Group** na paglalagyan ng mga tao. Para ilagay sila sa bagong grupo, lagyan ng check ang **Create New Group** at i-type ang **New Group Name**.
3. I-click ang **Apply**

Idinadagdag ang bawat tao bilang regular na miyembro ng grupo. Maaari mo silang gawing group leader sa ibang pagkakataon mula sa pahinang [Group Members](../groups/group-members.md). Para magdagdag ng mga tao sa ilang grupo, ulitin ito para sa bawat grupo.

### Remove from Group {#remove-from-group}

1. I-click ang **Actions** → **Remove from Group**
2. Piliin ang **Group** na aalisan ng mga tao
3. I-click ang **Apply**

:::info
Inaalis lang ng aksyong ito ang mga tao sa grupo. Hindi nito binubura ang kanilang person record.
:::

### Add to Workflow {#add-to-workflow}

Idagdag ang mga napiling tao sa isang [workflow](../serving/workflows.md) bilang mga card:

1. I-click ang **Actions** → **Add to Workflow**
2. Piliin ang workflow
3. I-click ang **Apply**

### Delete People {#delete-people}

Burahin ang mga napiling tao sa database ng iyong simbahan:

1. I-click ang **Actions** → **Delete**
2. Hihingi ng kumpirmasyon ang dialog na **Delete Selected People** kung ilang tao ang buburahin
3. I-click ang **Delete**

:::danger
Nawawala sa iyong directory, mga grupo, at mga search ang mga binurang tao. Gamitin lang ang aksyong ito kung sigurado kang gusto mong alisin ang mga taong ito sa iyong sistema.
:::

Hindi mo maaaring piliin ang sarili mo, kaya hindi mo mabubura nang maramihan o mababago nang maramihan ang sarili mong record.


## Mga Pinakamahusay na Gawi {#best-practices}

- **Magsimula nang maliit** -- Subukan muna ang mga bulk operation sa ilang record para matiyak na tama ang mga pagbabagong ginagawa mo
- **Gumamit ng mga filter** -- Paliitin ang listahan mo gamit ang mga filter o AI search bago pumili ng mga tao para matiyak na ang tamang indibidwal lang ang ina-update mo
- **I-double-check ang mga pinili** -- Suriin ang mga napiling tao bago ilapat ang mga bulk change
- **Itala ang mga pangunahing pagbabago** -- Magtago ng mga tala tungkol sa mga bulk update kung sakaling kailanganin mo itong balikan
- **Makipag-ugnayan sa iyong team** -- Ipaalam sa ibang administrator kapag gagawa ka ng malalaking bulk change

## Mga Karaniwang Gamit {#common-use-cases}

### Pag-update ng mga Bagong Miyembro {#updating-new-members}

Pagkatapos ng klase sa pagiging miyembro, i-update ang lahat ng dumalo bilang Member status:

1. Hanapin ang mga taong dumalo sa klase
2. Piliin silang lahat
3. Gamitin ang **Actions** → **Set Membership Status** → **Member**

### Pag-aayos ng mga Small Group {#organizing-small-groups}

Magdagdag ng maraming tao sa bagong small group:

1. Hanapin ang mga taong gusto mo sa grupo
2. Piliin sila
3. Gamitin ang **Actions** → **Add to Group** at piliin ang small group

### Paglilinis ng Datos {#cleaning-up-data}

Markahan ang grupo ng mga dating dumadalo bilang inactive:

1. Buksan ang **Advanced** search at i-filter ang mga taong gusto mong i-update (halimbawa, lahat ng hindi kamakailang dumalo)
2. Piliin sila
3. Gamitin ang **Actions** → **Set Membership Status** → **Inactive**

## Mga Kaugnay na Artikulo {#related-articles}

- [Searching People](./searching-people.md) -- Hanapin ang mga taong ie-edit
- [AI Search](./ai-search.md) -- Gumamit ng natural na wika para hanapin ang partikular na grupo ng mga tao
- [Group Members](../groups/group-members.md) -- Pamahalaan ang membership sa grupo
- [Exporting Data](./exporting-data.md) -- I-export ang datos ng mga tao bago gumawa ng bulk change
