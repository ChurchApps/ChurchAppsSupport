---
title: "Mga Workflow"
---

# Mga Workflow

<div class="article-intro">

Ang mga workflow ay gumagalaw sa mga tao sa pamamagitan ng isang serye ng mga hakbang sa isang visual na talahanayan. Ang bawat tao ay nagiging isang card na umiikot mula sa isang hakbang hanggang sa susunod -- mula sa pagsunod-sunod sa isang unang pagbisita, hanggang sa isang prosesong pagsali, hanggang sa isang unang pagbibigay ng pasasalamat, at anumang bagay kung saan kailangan mong subaybayan ang maraming tao sa parehong hanay ng mga yugto. Ang isang hakbang ay maaaring humiling sa isang volunteer na gumawa ng isang bagay (magtawag, makipag-usap) **at** maglunsad ng mga automated na aksyon sa sarili nitong -- magpadala ng email, maghintay ng ilang araw, magdagdag ng tao sa isang grupo -- upang ang mga Workflow ay umaabot sa parehong human follow-up at ang busywork sa paligid nito. Ang mga Workflow ay lumalaki sa [Tasks](./tasks.md) sa isang drag-and-drop Kanban board upang walang tao o sino man ang mahulog sa pagitan ng mga bitak.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Tiyakin na ang mga taong nais mong subaybayan ay umiiral sa B1 Admin
- Maging pamilyar kung paano gumagana ang [Tasks](./tasks.md), dahil ang bawat card sa isang talahanayan ay isang gawain
- Upang gamitin ang aksyon ng **Send email**, lumikha muna ng mga email template na nais mong ipadala (pinapamahalan sa ilalim ng **Messaging → Manage Templates**)
- Kailangan mo ng angkop na pahintulot sa Tasks. Ang pagtingin, pag-edit ng mga card, at pag-manage ng mga workflow ay mga hiwalay na antas ng pahintulot (tingnan ang [Roles & Permissions](../settings/roles-permissions.md))

</div>

## Pagtingin sa mga Workflow

Mag-navigate sa **Serving** at piliin ang **Workflows** mula sa menu. Makikita mo ang iyong mga workflow na nakalista at pinagsama ayon sa kategorya, na may mga aktibong workflow na na-highlight. I-click ang anumang workflow upang buksan ang board nito.

## Lumilikha ng Workflow

1. Sa pahina ng Workflows, i-click ang **Add Workflow**.
2. Pumili kung paano magsimula:
   - **Blank workflow** -- magsimula mula sa simula at bumuo ng iyong sariling mga hakbang.
   - **From a template** -- magsimula gamit ang isang handa nang itakdang mga hakbang na maaari mong baguhin. Ang mga built-in template ay sumasaklaw sa:
     - **New Visitor Follow-up** -- Magpadala ng welcome email → Personal phone call → Mag-alok sa susunod na hakbang → Connected
     - **Membership Class** -- Ipahayag ang interes → Mag-rehistro para sa klase → Dumalo sa klase → Tapusin ang pagsali
     - **First-time Giver Thank-you** -- Magpadala ng pasasalamat → Ibahagi ang epekto ng pagbibigay → Stewarded
3. Bigyan ng **Name** ang workflow.
4. Maaaring magtalaga ng **Category** upang pagsama-samahin ang mga kaugnay na workflow. Maaari kang lumikha ng bagong kategorya direkta mula sa dropdown.
5. Iwanan ang workflow na **Active** upang maaaring idagdag ang mga tao dito, o itakda ito sa **Inactive** upang itago ito mula sa mga listahan ng add-to-workflow.
6. I-click ang **Save**.

:::tip
Gamitin ang pindot na **Duplicate** sa listahan ng Workflows upang kopyahin ang isang umiiral nang workflow -- kasama ang mga hakbang nito, mga automated na aksyon, at pag-route -- bilang panimulang punto para sa bagong isa.
:::

## Pagbuo ng Board na may mga Hakbang

Ang bawat workflow board ay binubuo ng **steps**, ipinakita bilang mga haligi mula sa kaliwa patungo sa kanan. Buksan ang isang workflow at gumamit ng **Add Step** upang lumikha ng bawat yugto ng iyong proseso.

Kapag nagdagdag o nag-edit ka ng isang hakbang, maaari mong i-configure:

- **Step Name** -- ang pamagat ng haligi (halimbawa, "Welcome Call" o "Awaiting Registration").
- **Due in (days)** -- awtomatikong nagtakda ng due date kapag ang isang card ay pumapasok sa hakbang na ito. Ang mga card na lumampas sa kanilang due date ay minarkahan bilang **Overdue**.
- **Default assignee** -- ang tao o grupo na awtomatikong itinalaga sa mga bagong card sa hakbang na ito.
- **Automated actions** -- mga bagay na ginagawa ng sistema sa sarili nito kapag ang isang card ay dumating (tingnan sa ibaba).
- **Routing** -- kung saan napupunta ang card kapag umalis sa hakbang (tingnan ang [Routing](#routing-cards-with-outcomes-and-conditions)).

I-drag ang mga haligi ng hakbang sa pagkakasunud-sunod na tumutugma sa iyong proseso. Ang pagkakasunud-sunod ay tumutukoy din sa default na landas na ginagawa ng isang card kapag walang ibang routing na naaangkop.

:::info
Unang i-save ang isang bagong hakbang. Ang mga automated na aksyon at pag-route ay naaayon sa hakbang, kaya ang editor ay nagbubukas ng mga seksyong ito kapag ang hakbang ay umiiral na.
:::

## Mga Automated na Aksyon

Ang bawat hakbang ay maaaring magdala ng isang listahan ng **automated actions** na gumagana sa kanilang sarili sa sandaling ang isang card ay **pumapasok** sa hakbang -- bago ang sinuman ay humawak nito. Ito ay kung paano ang isang hakbang ay nagsasabing mauuna ang isang volunteer *at* nag-aalaga ng routine work sa paligid ng follow-up.

Sa editor ng hakbang, buksan ang **Automated actions**, i-click ang **Add Action**, pumili ng isang uri, punin ang mga setting nito, at i-click ang icon ng pag-save sa aksyon na ito. Magdagdag ng kasing dami na kailangan mo; tumutakbo ang mga ito **mula sa tuktok hanggang sa ibaba sa pagkakasunud-sunod**.

| Action | Ano ang ginagawa nito |
|---|---|
| **Send email** | Nagpapadala sa tao ng isang email template na pipiliin mo. Maaari mong i-override ang linya ng paksa. |
| **Wait** | Humihinto sa card para sa isang bilang ng mga araw bago magpatuloy (tingnan sa ibaba). |
| **Add to group** | Nagdadagdag sa tao sa isang [grupo](../groups/index.md) na pipiliin mo. |
| **Add to workflow** | Nagsisimula sa tao sa ibang workflow -- kapaki-pakinabang para sa paghahatid sa pagitan ng mga proseso. |
| **Add note** | Nag-record ng isang tala sa kasaysayan ng card. |
| **Set field** | Nag-update ng isang larangan sa record ng tao: Membership Status, Marital Status, Gender, City, State, o Zip. |
| **Webhook** | Nagpapadala ng mga detalye ng card sa isang panlabas na address sa web (URL) na ibinibigay mo, para sa pagkonekta sa ibang mga sistema. |

Matapos ang lahat ng mga aksyon ng isang hakbang, ang card ay **nagpapahinga sa hakbang na ito** upang ang isang tao ay maaaring magtrabaho -- maliban kung ang hakbang ay may isang automatic route na gumagalaw nito pasulong (tingnan ang [Fully automated steps](#fully-automated-steps)).

:::info
Ang mga automated na aksyon ay tumatakbo lamang kapag ang isang card ay dumating sa pamamagitan ng normal na daloy -- kapag unang idinagdag, kapag ang isang resulta o awtomatikong ruta ay nagdadala nito, o matapos ang Wait ay nagtatapos. Ang mga ito ay **hindi** muling tumatakbo kapag ang isang miyembro ng staff ay manually na nag-drag ng card sa hakbang o ipinapadala ito pabalik, kaya ang tao ay hindi makakatanggap ng parehong email nang dalawang beses.
:::

### Pagpapadala ng email

Pumili ng **Send email**, piliin ang isa sa iyong mga email template, at maaaring i-type ang isang custom subject. Kapag ang isang card ay pumapasok sa hakbang, ang tao ay awtomatikong makakatanggap ng email na iyon. (Kung ang tao ay walang email address sa file, ang hakbang ay simpleng nag-skip ng aksyon na ito.)

:::info
Ang mga workflow email ay umaabot lamang pagkatapos na ang iyong paglalaksang kailanman ay aprubado na magpadala ng group email, at sila ay bumibigay tungo sa araw-araw na email limit ng iyong paglalaksan. Tingnan ang [Turning On Group Email for Your Church](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

### Naghihintay ng ilang araw (drip sequences)

Ang aksyon ng **Wait** ay naghihintay sa isang card para sa bilang ng mga araw na itinakda mo. Habang naghihintay, ang card ay nagpapakita bilang **Snoozed**. Kapag ang paghihintay ay tapos na:

1. Ang anumang **natitirang mga aksyon sa parehong hakbang** ay tumatakbo -- upang maaari kang bumuo ng isang drip tulad ng **Send email → Wait 3 days → Send a reminder email**.
2. Pagkatapos, kung ang hakbang ay may isang automatic route, ang card ay gumagalaw; kung hindi man ito ay nagpapahinga sa hakbang para sa isang tao na kunin.

:::tip
Ang isang **Wait** sa pinakasimula ng isang hakbang ay isang simpleng paraan upang "hawakan" ang isang card bago ito makita sa isang volunteer -- halimbawa, *Wait 7 days, then a coach reaches out*.
:::

## Pagdadagdag ng mga Tao bilang mga Card

May ilang paraan upang ilagay ang mga tao sa isang board:

- **From the board** -- I-click ang **Add Card** sa ibaba ng isang haligi ng hakbang at piliin ang isang tao. Maaari mo ring piliin ang isang grupo, at bawat miyembro ng grupo ay idinagdag bilang isang card.
- **From a person's record** -- Gamitin ang **Add to Workflow** sa pahina ng tao upang ihulog sila sa isang workflow.
- **From People search** -- Pumili ng maraming tao at gamitin ang bulk na aksyon ng **Add to Workflow** upang idagdag ang lahat sa isang pagkakataon.
- **Automatically with a trigger** -- Magdagdag ng mga tao kapag may nangyari, tulad ng isang form submission o isang unang regalo (tingnan ang [Triggers](#triggers) sa ibaba).

## Pagtatrabaho sa Board

Buksan ang isang workflow upang makita ang board nito. Ang bawat card ay nagpapakita ng pangalan ng tao, kung sino ito itinalaga, at isang chip sa due-date o status (**Overdue** o **Snoozed**). Ang isang haligi ng hakbang ay nagpapakita rin ng mga maliit na badge para sa anumang mga automated na aksyon na tumatakbo at ang mga anotasyon para sa pag-route nito, na nagbibigay sa iyo ng isang quick na mapa kung paano dumadaloy ang mga card.

- **Move a card** -- I-drag ang isang card mula sa isang haligi tungo sa susunod habang umuusad ang tao.
- **Open a card** -- Double-i-click ang isang card (o i-click ito) upang buksan ang drawer ng detalye nito, kung saan maaari mong baguhin ang hakbang, muling italagang ito, magdagdag ng mga tala, at suriin kung ano na ang nangyari.

Mula sa drawer ng card maaari mong:

- **Assign** ang card sa ibang tao o grupo.
- **Snooze** ang card para sa 1 araw, 3 araw, o 1 linggo upang pansamantalang itago ang due date nito.
- **Send Back** sa nakaraang hakbang o **Skip** sa susunod na hakbang.
- **Pin assignment** -- panatilihin ang parehong may-ari sa card kahit ito ay gumagalaw sa pagitan ng mga hakbang. Sa pamamagit ng default, ang paglulunsad ng card sa isang bagong hakbang ay muling itatalaga ito sa default assignee ng hakbang na ito; ang pinning ay pinapanatili ang kasalukuyang taong responsable sa buong paraan.
- **Complete** ang card upang tapusin ito, o pumili ng isang **Outcome** button kung ang hakbang ay may mga resulta na na-configure (tingnan ang [Routing](#routing-cards-with-outcomes-and-conditions)).
- **Add notes** at suriin ang **history** ng card -- kasama ang isang log ng mga automated na aksyon na tumakbo (mga email na ipinadala, naghintay, atbp.).

### Mga bulk na aksyon

Piliin ang mga checkbox sa maraming card upang kumilos sa kanila nang magkasama. Ang isang toolbar ay lilitaw na nagbibigay-daan sa iyo na **Complete**, **Snooze**, **Reassign**, o **Move** ang lahat ng napiling card sa ibang hakbang nang sabay-sabay.

## Pag-route ng mga Card na may mga Resulta at Kondisyon

Ang pag-route ay kumokontrol kung saan napupunta ang card kapag ito ay umalis sa isang hakbang. Buksan ang editor ng hakbang upang mag-configure ng dalawang uri ng pag-route.

### Mga button ng resulta

Ang mga resulta ay mga pindot na ipinakita sa card drawer kapag kumukumpleto ka ng isang card sa hakbang na ito. Halip sa isang solong **Complete** button, maaari kang mag-alok ng mga pagpipilian tulad ng "Joined a Group" o "Not Interested." Ang bawat resulta ay maaaring:

- Ipadala ang card sa **ibang hakbang** sa workflow na ito,
- **Hand the card off** sa ibang workflow nang buo, o
- **Close** ang card.

Ito ay nagbibigay-daan sa isang desisyon na mangaba sa tao sa iba't ibang mga landas.

### Awtomatikong pag-route (kondisyonal)

Ang mga automatic route ay gumagalaw ng isang card pasulong **sa sandaling ito ay pumapasok sa isang hakbang** (at pagkatapos ng automated na aksyon nito ay tapos), nang walang sinuman na nag-click, kung ang tao ay tumutugma sa isang hanay ng mga kondisyon. Magdagdag ng isang ruta, pumili ng target na hakbang, at tukuyin ang isa o higit pang **kondisyon** (halimbawa, ang campus, edad, o status ng pagsali ng isang tao). Ang isang ruta na walang mga kondisyon ay tumutugma sa lahat.

:::info
Sa board, ang bawat haligi ng hakbang ay nagpapakita ng maliit na mga anotasyon na naglalarawan ng pag-route nito -- halimbawa, isang label ng resulta o "if matches" na sinusundan ng isang arrow sa hakbang o workflow ng destinasyon.
:::

## Ganap na Automated na mga Hakbang

Maaari kang gumawa ng isang hakbang na tumatakbo nang gusto nito, na walang sinumang gumagana nito. Bigyan ang hakbang ng mga **automated na aksyon** nito at magdagdag ng isang **automatic route** (na walang mga kondisyon) na namumuway sa susunod na hakbang. Kapag ang isang card ay pumapasok, ang mga aksyon ay tumatakbo, at pagkatapos ay ang ruta ay umuusad nito kaagad -- ang card ay dumadaan nang direkta.

:::tip
Pagsamahin ito sa **Wait**: *Send welcome email → Wait 3 days → automatically advance to the "Personal call" step.* Ang email at ang timing ay hinawakan para sa iyo, at ang isang volunteer ay nakikita lamang ang card kapag panahon na para sa human touch.
:::

## Mga Trigger

Ang mga trigger ay nagdadagdag ng mga tao sa isang workflow nang awtomatiko kapag may nangyari, upang hindi ka kailanman kailangang magdagdag ng mga card nang mano-mano. Sa isang workflow board, i-click ang tab ng **Triggers**, pagkatapos **Add Trigger**. May dalawang uri:

### Mga trigger ng kaganapan

Sumikat sa sandaling ang isang tala ay nagbabago sa B1. Piliin ang kaganapan, pagkatapos maaaring magdagdag ng **kondisyon** upang lamang ang mga tumutugmang tao ay idinagdag:

- **Person · Created / Updated** -- halimbawa, magdagdag ng sinumang ang status ay nagiging *Visitor*.
- **Donation · Created** -- halimbawa, magdagdag ng isang unang pagbibigay o malaking regalo sa isang thank-you workflow (tugma sa halaga, pondo, o paraan).
- **Group · Member Joined** / **Group · Created**.
- **Form · Submitted** -- magdagdag ng sinumang nagsumite ng isang napiling form (mahusay para sa isang "I'm New" o "Connect" card).

### Mga trigger ng iskedyul

Tumatakbo sa isang repetisyon na batayan -- araw-araw, lingguhan, buwan-buwan, o taun-taon -- laban sa isang hanay ng mga kondisyon. Gamitin ang mga ito para sa panahon-batay na pakikipag-ugnayan tulad ng *lahat na ang kakasal na anibersaryo ay ngayong araw* o isang *buwan-buwan* na pagsusuri.

Para sa anumang trigger maaari mo ring itakda:

- Ang hakbang ng **entry** ang bagong card ay nagsisimula (default sa unang hakbang).
- **Once per person** -- upang ang parehong tao ay hindi maidagdag sa workflow nang dalawang beses ng trigger.
- **Active** -- buksan o isara ang trigger nang hindi ito binubura.

:::tip
Pagsama-samahin ang isang **Form · Submitted** trigger sa template ng **New Visitor Follow-up** upang gawing isang automatic na follow-up pipeline ang iyong "Connect Card" o "I'm New" form.
:::

## Aking mga Card

Ang mga volunteer at staff ay hindi kailangang mag-scan sa bawat board upang mahanap ang kanilang trabaho. Ang pahina ng **My Cards** (na naka-link mula sa pahina ng Workflows) ay naglilista ng bawat card na itinalaga sa kasalukuyang gumagamit sa lahat ng mga workflow. Ang pag-click ng isang card ay nagbubukas ng board na kabilang nito.

## Mga Ulat

Buksan ang isang workflow at i-click ang **Reports** upang makita ang analytics para sa workflow na iyon:

- **Overdue** -- ang bilang ng mga card na lumampas sa kanilang due date.
- **Cards per Step** -- kung gaano karaming mga card ang kasalukuyang nakaupong sa bawat hakbang, na ipinapakita bilang isang column chart.
- **Completed (30 days)** -- throughput sa nakaraang 30 araw, na ipinapakita bilang isang line chart.

Gamitin ang mga ito upang mahanap ang mga bottleneck -- halimbawa, isang hakbang kung saan ang mga card ay nagsasabing-sabi at hindi kailanman umuusad.

## Mga Kaugnay na Artikulo

- [Tasks](./tasks.md) -- ang mga indibidwal na item na aksyon na itinayo ng mga workflow card
- [Forms](../forms/index.md) -- bumuo ng mga form na maaaring mag-trigger ng mga workflow
- [Groups](../groups/index.md) -- ang mga grupo na maaaring ilagay ng aksyon ng "Add to group"
- [Roles & Permissions](../settings/roles-permissions.md) -- kontrolin kung sino ang maaaring makita, mag-edit, at pamahalaan ang mga workflow
