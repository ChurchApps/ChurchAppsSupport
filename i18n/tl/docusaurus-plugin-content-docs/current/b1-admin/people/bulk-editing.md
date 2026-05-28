---
title: "Pag-Bulk Edit ng mga Tao"
---

# Pag-Bulk Edit ng mga Tao

<div class="article-intro">
Ang bulk editing ay nagpapahintulot sa inyong mag-update ng maraming tao nang sabay-sabay, na nakakatipid ng oras kapag gumagawa ng parehong pagbabago sa maraming indibidwal. Maaari ninyong i-update ang membership status, marital status, kasarian, mga kagustuhan sa opt-out, at mga pagiging miyembro ng grupo sa isang operasyon.
</div>

<div class="prereqs">
<h4>Bago Kayo Magsimula</h4>

- Kailangan ninyo ng pahintulot upang pamahalaan ang datos ng mga tao. Tingnan ang [Roles & Permissions](./roles-permissions.md) para sa mga detalye.
- Dapat nang naidagdag o na-import ninyo ang mga taong gusto ninyong i-edit. Tingnan ang [Adding People](./adding-people.md) kung kinakailangan.
</div>

## Pagpili ng mga Tao para sa Bulk Editing

1. Mag-navigate sa **People** sa B1 Admin
2. Gamitin ang mga tool sa paghahanap o pag-filter upang makahanap ng mga taong gusto ninyong i-update
3. I-check ang mga kahon sa tabi ng pangalan ng bawat tao upang piliin sila
   - Maaari ninyong piliin ang mga tao nang isa-isa
   - O gamitin ang header checkbox upang piliin lahat ng nakikitang tao sa kasalukuyang pahina
4. Kapag nakapili na kayo ng kahit isang tao, lilitaw ang **Bulk Actions** button

:::tip
Kung kailangan ninyong mag-update ng malaking grupo ng mga tao batay sa mga partikular na criteria, gamitin ang [AI Search](./ai-search.md) feature o mga filter upang papangkutin muna ang inyong listahan, pagkatapos ay piliin lahat ng tumutugmang mga tao.
:::

## Mga Available na Bulk Action

Ang **Bulk Actions** menu ay nagbibigay ng ilang opsyon:

### I-update ang Membership Status

I-update ang membership status para sa lahat ng mga napiling tao:

1. I-click ang **Bulk Actions** → **Set Membership Status**
2. Pumili ng bagong status:
   - **Visitor** -- Mga unang pagkakataon o paminsan-minsang dumadalo
   - **Regular Attendee** -- Mga madalas dumadalong hindi miyembro
   - **Member** -- Mga opisyal na miyembro ng simbahan
   - **Staff** -- Mga miyembro ng staff ng simbahan
   - **Inactive** -- Mga taong hindi na dumaradalo
3. Pumili ng update mode:
   - **Overwrite all** -- Palitan ang kasalukuyang status para sa lahat ng mga napiling tao
   - **Only update empty** -- Itakda lamang ang status para sa mga taong walang isa
4. I-click ang **Update**

### I-update ang Marital Status

I-update ang marital status nang bulk:

1. I-click ang **Bulk Actions** → **Set Marital Status**
2. Pumili ng bagong status:
   - **Unknown**
   - **Single**
   - **Married**
   - **Divorced**
   - **Widowed**
3. Pumili kung i-overwrite ang mga umiiral na halaga o i-update lamang ang mga walang laman na field
4. I-click ang **Update**

### I-update ang Kasarian

I-update ang impormasyon sa kasarian para sa maraming tao:

1. I-click ang **Bulk Actions** → **Set Gender**
2. Pumili ng halaga:
   - **Unspecified**
   - **Male**
   - **Female**
3. Pumili ng update mode (overwrite all o only empty)
4. I-click ang **Update**

### I-update ang Opt-Out Status

Kontrolin kung nag-opt out ang mga tao sa mga komunikasyon:

1. I-click ang **Bulk Actions** → **Set Opted Out**
2. Pumili:
   - **No** -- Payagan ang mga komunikasyon (alisin ang opt-out)
   - **Yes** -- Harangan ang mga komunikasyon (itakda ang opt-out)
3. Pumili ng update mode
4. I-click ang **Update**

:::warning
Mag-ingat kapag binabago ang opt-out status. Ang mga taong hayagang nag-opt out ay hindi dapat makatanggap ng mga komunikasyon maliban kung nagbigay sila ng bagong pahintulot.
:::

### Idagdag sa Grupo

Idagdag ang lahat ng mga napiling tao sa isa o higit pang mga grupo:

1. I-click ang **Bulk Actions** → **Add to Group**
2. Maghanap at pumili ng (mga) grupo kung saan idadagdag ang mga tao
3. Maaari kayong pumili ng maraming grupo upang idagdag ang mga tao sa lahat ng mga ito
4. I-click ang **Add to Groups**

Ang bawat tao ay idadagdag bilang regular na miyembro ng mga napiling grupo. Maaari ninyong i-promote ang mga indibidwal sa mga lider ng grupo kung kinakailangan mula sa pahina ng [Group Members](../groups/group-members.md).

### Alisin sa Grupo

Alisin ang lahat ng mga napiling tao mula sa isa o higit pang mga grupo:

1. I-click ang **Bulk Actions** → **Remove from Group**
2. Maghanap at pumili ng (mga) grupo kung saan aalisin ang mga tao
3. Maaari kayong pumili ng maraming grupo
4. I-click ang **Remove from Groups**

:::info
Ang aksyon na ito ay nag-aalis lamang ng mga tao sa mga tinukoy na grupo. Hindi nito binubura ang kanilang mga rekord ng tao.
:::

### Burahin ang mga Tao

Permanenteng burahin ang mga napiling tao mula sa database ng inyong simbahan:

1. I-click ang **Bulk Actions** → **Delete**
2. Suriin ang listahan ng mga taong buburahin
3. I-type ang **DELETE** sa confirmation field
4. I-click ang **Confirm Delete**

:::danger
Ang pagbura ng mga tao ay permanente at hindi maaaring i-undo. Ito ay mag-aalis ng lahat ng kanilang datos kabilang ang:
- Personal na impormasyon
- Mga pagiging miyembro ng grupo
- Mga rekord ng pagdalo
- Kasaysayan ng donasyon
- Mga submission ng form

Gamitin lamang ang aksyon na ito kung sigurado kayo na gusto ninyong alisin ang mga taong ito sa inyong sistema.
:::

## Mga Resulta ng Bulk Edit

Pagkatapos makumpleto ang isang bulk action, makikita ninyo ang isang buod na nagpapakita ng:

- **Total selected** -- Ilang tao ang kasama sa operasyon
- **Successfully updated** -- Ilang rekord ang nabago
- **Failed** -- Anumang mga rekord na hindi ma-update (kung naaangkop)
- **Unchanged** -- Mga rekord na hindi na kailangan ng mga pagbabago (hal., kapag gumagamit ng "only update empty" mode)

Kung nabigo ang anumang mga update, makikita ninyo ang mga detalye ng error na nagpapaliwanag kung bakit.

## Mga Best Practice

- **Magsimula nang maliit** -- Subukan ang mga bulk operation sa ilang rekord muna upang matiyak na gumagawa kayo ng tamang mga pagbabago
- **Gumamit ng mga filter** -- Papangkutin ang inyong listahan gamit ang mga filter o AI search bago pumili ng mga tao upang matiyak na ina-update ninyo lamang ang tamang mga indibidwal
- **Doble-suriin ang mga pinili** -- Suriin ang mga napiling tao bago mag-apply ng mga bulk change
- **Gumamit ng "only update empty" mode** -- Kapag gusto ninyong punan ang mga nawawalang datos nang hindi ino-overwrite ang umiiral na impormasyon
- **Mag-dokumento ng mga pangunahing pagbabago** -- Magtago ng mga tala tungkol sa mga bulk update sakaling kailangan ninyong sumangguni sa mga ito mamaya
- **Makipag-coordinate sa inyong koponan** -- Ipaalam sa ibang mga administrator kapag gumagawa ng malalaking bulk change

## Mga Karaniwang Gamit

### Pag-update ng mga Bagong Miyembro

Pagkatapos ng membership class, i-update ang lahat ng dumalo sa Member status:

1. Maghanap ng mga taong dumalo sa klase
2. Piliin silang lahat
3. Gamitin ang **Bulk Actions** → **Set Membership Status** → **Member**

### Pag-organisa ng mga Maliliit na Grupo

Idagdag ang maraming tao sa isang bagong maliit na grupo:

1. Maghanap ng mga taong gusto ninyo sa grupo
2. Piliin sila
3. Gamitin ang **Bulk Actions** → **Add to Group** at piliin ang maliit na grupo

### Paglilinis ng Datos

Punan ang nawawalang marital status para sa mga mag-asawa:

1. Mag-filter para sa mga taong kasal (gamit ang impormasyon sa sambahayan)
2. Piliin ang mga walang laman na marital status
3. Gamitin ang **Bulk Actions** → **Set Marital Status** → **Married** → **Only update empty**

## Mga Kaugnay na Artikulo

- [Searching People](./searching-people.md) -- Maghanap ng mga tao upang i-edit
- [AI Search](./ai-search.md) -- Gumamit ng natural language upang makahanap ng mga partikular na grupo ng mga tao
- [Group Members](../groups/group-members.md) -- Pamahalaan ang pagiging miyembro ng grupo
- [Exporting Data](./exporting-data.md) -- I-export ang datos ng mga tao bago gumawa ng mga bulk change
