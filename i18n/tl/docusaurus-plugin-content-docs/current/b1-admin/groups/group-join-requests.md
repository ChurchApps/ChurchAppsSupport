---
title: "Mga Group Join Requests"
---

# Mga Group Join Requests

<div class="article-intro">

Kapag ang isang grupo ay na-configure na may approval-based join policy, ang mga tao ay maaaring magpadala ng mga kahilingan na sumali. Ang mga lider ng grupo at mga administrator ay sinusuri ang mga kahilingan na ito at aprubahan o tumanggihan ang mga ito. Ito ay nagbibigay sa iyong simbahan ng kontrol sa pagiging miyembro ng grupo habang ginagawang madali para sa mga tao na ipahayag ang interes sa pagsali.

</div>

<div class="prereqs">
<h4>Bago ka magsimula</h4>

- Kailangan mo ng pahintulot upang pamahalaan ang mga grupo, o kailangan mong maging lider ng tiyak na grupo. Makita ang [Roles & Permissions](../people/roles-permissions.md) para sa mga detalye.
- Ang grupo ay dapat na may join policy nito na nakatakda sa **Request** (kailangan ng pagsang-ayon). Makita ang [Lumilikha ng Mga Grupo](./creating-groups.md) para sa kung paano i-configure ang mga join policy.

</div>

## Pag-unawa sa mga Join Policy

Ang mga grupo ay maaaring magkaroon ng tatlong magkakaibang join policy:

- **Open** -- Ang sinuman ay maaaring sumali kaagad nang walang pagsang-ayon
- **Request** -- Ang mga tao ay nagpadala ng isang join request na nangangailangan ng pagsang-ayon
- **Closed** -- Walang maaaring humiling na sumali (ang mga miyembro ay dapat na idagdag nang manu-manong)

Kapag ang isang grupo ay gumagamit ng **Request** policy, ang lahat ng mga pagsubok sa pagsali ay dumaan sa workflow ng pagsang-ayon na inilarawan sa pahinang ito.

## Pagsusuri ng mga Pending na Kahilingan

### Para sa mga Lider ng Grupo

1. Mag-navigate sa **Groups** sa B1 Admin
2. I-click ang pangalan ng grupo
3. Ang mga pending na kahilingan para sa grupo na ito ay lumilitaw sa tuktok ng tab na **Members**

### Para sa mga Administrator

Ang mga administrator na may mga pahintulot sa pagsasalin ng grupo ay maaaring tingnan ang mga pending na kahilingan sa lahat ng mga grupo:

1. Mag-navigate sa **Groups** sa B1 Admin
2. I-click ang button na **pending requests** sa page header (halimbawa, "3 pending requests"). Ito ay lumalabas lamang kapag may mga kahilingan na naghihintay.
3. Suriin ang lahat ng mga pending na kahilingan sa buong simbahan

## Pagsusuri ng Join Request

Bawat join request ay nagpapakita:

- **Pangalan at larawan ng tao** -- Ang taong humihingi na sumali
- **Opsyonal na mensahe** -- Isang personal na mensahe na nagpapaliwanag kung bakit nais nilang sumali (kung ibinigay)
- **Petsa ng kahilingan** -- Kailan ang kahilingan ay naitala

Upang suriin ang isang kahilingan:

1. Basahin ang mensahe ng tao kung nagbigay sila ng isa
2. I-click ang pangalan ng tao upang tingnan ang kanilang profile kung kinakailangan
3. Magpasya kung aprubahan o tumanggihan

## Pag-aprubahan ng isang Kahilingan

1. I-click ang **Approve** sa join request
2. Ang tao ay kaagad na idinadagdag sa grupo bilang isang miyembro
3. Ang nag-request ay nakatanggap ng notification na ang kanilang kahilingan ay aprubado
4. Ang kahilingan ay minarkahan bilang aprubado sa sistema

:::tip
Kapag aprubahan mo ang isang kahilingan, ang tao ay nagiging isang regular na miyembro ng grupo. Maaari mong i-promote ang mga ito sa lider ng grupo nang huli kung kinakailangan mula sa [Group Members](./group-members.md) page.
:::

## Pagtutanggi ng isang Kahilingan

1. I-click ang **Decline** sa join request
2. Opsyonal na magbigay ng isang dahilan para tumanggihan (hanggang 500 character)
3. I-click ang **Confirm**
4. Ang nag-request ay nakatanggap ng notification na may iyong dahilan sa pagtutanggi (kung ibinigay)
5. Ang kahilingan ay minarkahan bilang itinanggi

:::info
Ang pagbibigay ng isang dahilan sa pagtutanggi ay tumutulong sa tao na maunawaan kung bakit ang kanilang kahilingan ay hindi aprubado at maaaring hikayatin silang subukan muli nang huli o tuklasin ang ibang mga grupo.
:::

## Pag-aprubahan mula sa ang Pahina ng Mga Gawain

Bawat join request ay lumilikha rin ng isang gawain sa ilalim ng **Serving &rarr; My Work**, na may pamagat "*Person* requested to join *Group*." Ito ay nakatalagang sa mga lider ng grupo. Kung ang grupo ay walang lider pa, ito ay napupunta sa anumang staff na may pahintulot ng **Group Members > Edit**, o sa mga admin ng domain ng iyong simbahan kung walang nagkakaroon ng pahintulot na iyon. Ang mga staff at admin na nakakuha ng gawain sa ganitong paraan ay nakakatanggap din ng notification na nag-link direkta dito.

Ang pagbubukas ng gawain ay nagpapakita ng pangalan ng nag-request, ng grupo, at ng kanilang opsyonal na mensahe, na may **Approve** at **Decline** na mga button sa kanang gawain card (Decline ay bumubukas ng parehong opsyonal na dahilan field na inilarawan sa itaas). Ito ay nagbibigay sa mga lider ng pangalawang, notification-driven na paraan upang kumilos sa isang kahilingan nang hindi nag-navigate sa tab ng Join Requests ng grupo.

Ang pagpapasya ng isang kahilingan mula sa alinman sa lugar -- ang tab ng Join Requests ng grupo o ang card ng Mga Gawain nito -- ay nagsasara nito saanman, upang ang mga lider ay hindi kailanman makita ang isang lumang gawain para sa isang kahilingan na inaasikaso na ng isinasagot.

## Mga Notification

Ang sistema ng join request ay awtomatikong nagpadala ng mga notification:

- **Kapag ang isang kahilingan ay naitala** -- Ang lahat ng mga lider ng grupo ay nakakatanggap ng notification. Kung ang grupo ay walang lider, ang mga staff o admin na nakatalagang sa gawain ay isinaabiso sa halip (makita ang itaas).
- **Kapag ang isang kahilingan ay aprubado** -- Ang nag-request ay nakakatanggap ng confirmation
- **Kapag ang isang kahilingan ay itinanggi** -- Ang nag-request ay nakakatanggap ng notification na may anumang dahilan sa pagtutanggi

Ang mga notification ay lumalabas sa notification center ng user sa B1.church at sa mobile app.

## Pag-manage ng mga Kahilingan mula sa ang Bahagi ng Miyembro

Ang mga tao ay maaaring pamahalaan ang kanilang sariling mga join request mula sa B1.church:

- Tingnan ang status ng kanilang mga pending na kahilingan sa group detail page
- Kanselahin ang isang pending na kahilingan kung nagbago ang kanilang isip
- Makita kung ang kanilang kahilingan ay aprubado o itinanggi

## Mga Best Practice

- **Tumugon sa mabilis** -- Subukan na suriin ang mga kahilingan sa loob ng 24-48 oras upang ang mga tao ay hindi maiwan na naghihintay
- **Maging malinaw sa mga dahilan sa pagtutanggi** -- Tulungan ang mga tao na maunawaan ang mga susunod na hakbang o mga alternatibong opsyon
- **Suriin ang mga profile** -- Suriin ang profile ng tao upang makita kung sila ay isang magandang pares para sa grupo
- **Makipag-ugnayan ng mga inaasahan** -- Tiyakin na ang iyong paglalarawan ng grupo ay malinaw na nagsasaad kung sino ang grupo ay para sa

## Kaugnay na Mga Artikulo

- [Lumilikha ng Mga Grupo](./creating-groups.md) -- Matuto kung paano mag-set up ng mga grupo at mag-configure ng mga join policy
- [Group Members](./group-members.md) -- Pamahalaan ang mga umiiral na miyembro ng grupo
- [Group Calendar](./group-calendar.md) -- I-schedule ang mga pagtitipon at kaganapan ng grupo
