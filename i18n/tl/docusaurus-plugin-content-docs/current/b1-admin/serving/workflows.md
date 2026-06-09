---
title: "Mga Workflow"
---

# Mga Workflow

<div class="article-intro">

Ang mga workflow ay nagsisimula sa mga tao sa pamamagat ng isang serye ng mga hakbang sa isang visual board. Bawat tao ay nagiging isang card na naglalakbay mula sa isang hakbang papunta sa susunod -- mula sa isang first-time guest follow-up, papunta sa isang membership process, papunta sa isang first-time giver thank-you, at anumang iba pang lugar kung saan kailangan mong subaybayan ang maraming tao sa pamamagat ng parehong hanay ng mga yugto. Ang isang hakbang ay maaaring magtanong sa isang volunteer na gumawa ng isang bagay (makipag-call, makipag-usap) **at** magpatakbo ng mga automated action sa sarili nito -- magpadala ng email, maghintay ng ilang araw, magdagdag sa isang grupo -- upang ang mga workflow ay humawak ng parehong human follow-up at ang gawain sa paligid nito. Ang mga workflow ay nag-extend ng [Mga Gawain](./tasks.md) sa isang drag-and-drop Kanban board upang walang tao ang mahulog sa pagitan.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Siguraduhing ang mga taong nais mong subaybayan ay umiiral sa B1 Admin
- Maging pamilyar kung paano gumagana ang [Mga Gawain](./tasks.md), dahil bawat card sa isang board ay isang gawain
- Upang gamitin ang aksyon ng **Magpadala ng email**, lumikha muna ng mga template ng email na nais mong ipadala (pinamamahalaan sa ilalim ng **Messaging → Manage Templates**)
- Kailangan mo ng angkop na pahintulot sa Mga Gawain. Ang pagtingin, pag-edit ng mga card, at pagpamahalaan ng mga workflow ay mga hiwalay na antas ng pahintulot (tingnan ang [Mga Tungkulin at Pahintulot](../settings/roles-permissions.md))

</div>

## Pagtingin sa mga Workflow

Mag-navigate sa **Paglilingkod**, buksan ang lugar ng **Mga Gawain**, at pumili ng **Mga Workflow** mula sa menu. Makikita mo ang iyong mga workflow na nakalista at nakagrupo ayon sa kategorya, na may mga aktibong workflow na highlight. I-click ang anumang workflow upang buksan ang kanyang board.

## Paglikha ng isang Workflow

1. Sa pahina ng Mga Workflow, i-click ang **Magdagdag ng Workflow**.
2. Pumili kung paano magsimula:
   - **Blank workflow** -- magsimula mula sa simula at bumuo ng iyong sariling mga hakbang.
   - **Mula sa isang template** -- magsimula sa isang ready-made na hanay ng mga hakbang na maaari mong i-edit. Ang mga built-in na template ay kinabibilangan ng:
     - **New Visitor Follow-up** -- Magpadala ng welcome email → Personal phone call → Imbitahan sa susunod na hakbang → Connected
     - **Membership Class** -- Express interest → Magparehistro para sa klase → Dumalo sa klase → Kumpleto ang membership
     - **First-time Giver Thank-you** -- Magpadala ng thank-you note → Ibahagi ang giving impact → Stewarded
3. Bigyan ng **Pangalan** ang workflow.
4. Opsyonal na magtalaga ng **Kategorya** upang pagsama ang mga kaugnay na workflow nang magkasama. Maaari kang lumikha ng isang bagong kategorya direkta mula sa dropdown.
5. Iwanan ang workflow na **Active** upang ang mga tao ay maaaring idagdag dito, o itakda ito sa **Inactive** upang itago ito mula sa mga listahan na magdagdag sa workflow.
6. I-click ang **Mag-save**.

:::tip
Gamitin ang button ng **Duplicate** sa listahan ng Mga Workflow upang kopyahin ang isang umiiral na workflow -- kasama ang mga hakbang, mga automated action, at routing -- bilang ang panimulang punto para sa isang bagong isa.
:::

## Pagbuo ng Board na may mga Hakbang

Bawat workflow board ay binubuo ng **mga hakbang**, na ipinakita bilang mga column mula kaliwa hanggang kanan. Buksan ang isang workflow at gamitin ang **Magdagdag ng Hakbang** upang lumikha ng bawat yugto ng iyong proseso.

Kapag nagdagdag o nag-edit ka ng isang hakbang, maaari mong i-configure ang:

- **Pangalan ng Hakbang** -- ang heading ng column (halimbawa, "Welcome Call" o "Naghihintay ng Pagpaparehistro").
- **Dahil sa (araw)** -- awtomatikong nagtakda ng due date kapag ang isang card ay papasok sa hakbang na ito. Ang mga card na lumampas sa kanilang due date ay minarka bilang **Overdue**.
- **Ang default na na-assign** -- ang tao o grupo na ang mga bagong card sa hakbang na ito ay awtomatikong naglalaan sa.
- **Mga automated action** -- mga bagay na ginagawa ng sistema nang sarili nito kapag ang isang card ay dumating (tingnan sa ibaba).
- **Routing** -- kung saan napupunta ang card kapag umaalis ito sa hakbang (tingnan ang [Routing](#routing-cards-with-outcomes-and-conditions)).

I-drag ang mga column ng hakbang sa order na tumutugma sa iyong proseso. Ang order ay tumutukoy din sa default na daan na sinusundan ng isang card kapag walang ibang routing na nalalapat.

:::info
Mag-save ng isang bagong hakbang muna. Ang mga automated action at routing ay nakaakay sa hakbang, kaya ang editor ay nag-unlock ng mga seksyong iyon kapag ang hakbang ay umiiral na.
:::

## Mga Automated Action

Bawat hakbang ay maaaring magdulot ng isang listahan ng **mga automated action** na tumatakbo nang sarili nito sa sandaling ang isang card ay **papasok** sa hakbang -- bago ang sinuman ay humawak nito. Ito ay kung paano ang isang hakbang ay nagsasabing mag-prompt sa isang volunteer *at* nag-aalaga ng routine na gawain sa paligid ng follow-up.

Sa editor ng hakbang, buksan ang **Mga automated action**, i-click ang **Magdagdag ng Aksyon**, pumili ng isang uri, punan ang mga setting nito, at i-click ang save icon sa aksyon na iyon. Magdagdag ng kasing maraming kinakailangan; tumatakbo sila **mula itaas hanggang ibaba sa order**.

| Aksyon | Ano ang ginagawa nito |
|---|---|
| **Magpadala ng email** | Nag-email sa tao ng isang template ng email na iyong pinili. Maaari mong i-override ang linya ng pakikipag-ugnayan. |
| **Maghintay** | Inaantala ang card para sa isang bilang ng mga araw bago magpatuloy (tingnan sa ibaba). |
| **Magdagdag sa grupo** | Nagdadagdag sa tao sa isang [grupo](../groups/index.md) na iyong pinili. |
| **Magdagdag sa workflow** | Nagsisimula sa tao sa ibang workflow -- kapaki-pakinabang para sa paghahatid sa pagitan ng mga proseso. |
| **Magdagdag ng nota** | Nagrerekord ng isang nota sa kasaysayan ng card. |
| **Itakda ang field** | Nag-update ng isang field sa rekord ng tao: Status ng Miyembro, Estado ng Kasal, Kasarian, Lungsod, Estado, o Zip. |
| **Webhook** | Nagpadala ng mga detalye ng card sa isang panlabas na web address (URL) na iyong ibinibigay, para sa pagkonekta sa ibang mga sistema. |

Pagkatapos ng lahat ng mga aksyon ng isang hakbang ay kumpleto, ang card ay **nagpapahinga sa hakbang na iyon** upang ang isang tao ay maaaring magtrabaho dito -- maliban kung ang hakbang ay may isang automatic na route na nagsisimula dito (tingnan ang [Ganap na automated na mga hakbang](#fully-automated-steps)).

:::info
Ang mga automated action ay tumatakbo lamang kapag ang isang card ay dumating sa pamamagat ng normal na daloy -- kapag ito ay unang idinagdag, kapag ang isang outcome o automatic na route ay nagdadala dito, o pagkatapos ng Wait ay nagtatapos. Sila ay **hindi** muling tumatakbo kapag ang isang miyembro ng staff ay manu-manong i-drag ang isang card sa hakbang o ipinapadala ito pabalik, upang ang isang tao ay hindi makakatanggap ng parehong email nang dalawang beses.
:::

### Pagpadala ng email

Pumili ng **Magpadala ng email**, pumili ng isa sa iyong mga template ng email, at opsyonal na mag-type ng isang custom na linya ng pakikipag-ugnayan. Kapag ang isang card ay papasok sa hakbang, ang tao ay tumatanggap ng email na iyon nang awtomatiko. (Kung ang tao ay walang email address sa file, ang hakbang ay simpleng nag-skip sa aksyon na ito.)

### Naghihintay ng ilang araw (drip sequences)

Ang aksyon ng **Maghintay** ay nagsasagawa ng isang card para sa bilang ng mga araw na iyong itinakda. Habang ito ay naghihintay, ang card ay ipinakita bilang **Snoozed**. Kapag ang paghihintay ay tapos na:

1. Anumang **mga natitirang aksyon sa parehong hakbang** ay tumatakbo -- upang maaari kang bumuo ng isang drip tulad ng **Magpadala ng email → Maghintay ng 3 araw → Magpadala ng isang reminder na email**.
2. Pagkatapos, kung ang hakbang ay may isang automatic na route, ang card ay nagsisimula; kung hindi, ito ay nagpapahinga sa hakbang para sa isang tao na kunin.

:::tip
Ang **Maghintay** sa napakasimula ng isang hakbang ay isang simpleng paraan upang "hawakan" ang isang card bago ito lumabas sa isang volunteer -- halimbawa, *Maghintay ng 7 araw, pagkatapos ay isang coach ay makipag-reach out*.
:::

## Pagdadagdag ng mga Tao bilang mga Card

Maraming paraan upang ilagay ang mga tao sa isang board:

- **Mula sa board** -- I-click ang **Magdagdag ng Card** sa ilalim ng isang column ng hakbang at pumili ng isang tao. Maaari mo ring pumili ng isang grupo, at bawat miyembro ng grupo ay idadagdag bilang isang card.
- **Mula sa rekord ng tao** -- Gamitin ang **Magdagdag sa Workflow** sa pahina ng tao upang ilagay sila sa isang workflow.
- **Mula sa paghahanap ng Mga Tao** -- Pumili ng maraming mga tao at gamitin ang bulk na aksyon ng **Magdagdag sa Workflow** upang idagdag ang lahat nang sabay-sabay.
- **Awtomatiko na may trigger** -- Magdagdag ng mga tao kapag may nangyari, tulad ng isang form submission o isang unang regalo (tingnan ang [Mga Trigger](#triggers) sa ibaba).

## Pagtrabaho sa Board

Buksan ang isang workflow upang makita ang kanyang board. Bawat card ay nagpapakita ng pangalan ng tao, sino ito na-assign sa, at isang chip ng due-date o status (**Overdue** o **Snoozed**). Ang column ng hakbang ay nagpapakita din ng mga maliit na badge para sa anumang mga automated action na ginagawa nito at mga anotasyon para sa kanyang routing, na nagbibigay sa iyo ng isang mabilis na mapa ng kung paano umuusad ang mga card.

- **Ilipat ang card** -- I-drag ang isang card mula sa isang column patungo sa susunod habang umuusad ang tao.
- **Buksan ang card** -- I-double-click ang isang card (o i-click ito) upang buksan ang drawer ng detalye nito, kung saan maaari mong baguhin ang hakbang, muling magtalaga, magdagdag ng mga nota, at suriin kung ano na ang nangyari.

Mula sa drawer ng card maaari mong:

- **Magtalaga** ng card sa isang ibang tao o grupo.
- **Snooze** ang card para sa 1 araw, 3 araw, o 1 linggo upang pansamantalang itago ang kanyang due date.
- **Ipadala Pabalik** sa nakaraang hakbang o **Lumipat** sa susunod na hakbang.
- **Pin assignment** -- panatilihin ang parehong may-ari sa card kahit na ito ay nagsisimula sa pagitan ng mga hakbang. Sa pamamagitan ng default, ang paglipat ng isang card sa isang bagong hakbang ay muling nagde-designate nito sa default na na-assign ng hakbang na iyon; ang pag-pin ay pinapanatili ang kasalukuyang taong responsable sa buong panahon.
- **Kumpleto** ang card upang tapusin ito, o pumili ng isang button na **Resulta** kung ang hakbang ay may mga resulta na na-configure (tingnan ang [Routing](#routing-cards-with-outcomes-and-conditions)).
- **Magdagdag ng mga nota** at suriin ang **kasaysayan** ng card -- kasama ang isang log ng mga automated action na tumakbo (mga email na ipinadala, paghihintay, atbp.).

### Mga bulk action

Pumili ng mga checkbox sa maraming mga card upang kumilos sa kanila nang sabay-sabay. Ang isang toolbar ay lumalabas na nagpapahintulot sa iyo na **Kumpleto**, **Snooze**, **Muling Magtalaga**, o **Ilipat** ang lahat ng mga napiling card sa ibang hakbang nang sabay-sabay.

## Pag-route ng mga Card na may mga Resulta at Kondisyon

Ang routing ay kumokontrol kung saan napupunta ang card kapag umaalis ito sa isang hakbang. Buksan ang editor ng hakbang upang i-configure ang dalawang uri ng routing.

### Mga button ng resulta

Ang mga resulta ay mga button na ipinakita sa drawer ng card kapag kumukumpleto ka ng isang card sa hakbang na iyon. Sa halip na isang solong button ng **Kumpleto**, maaari kang mag-alok ng mga pagpipilian tulad ng "Sumali sa isang Grupo" o "Hindi Interesado." Bawat resulta ay maaaring:

- Magpadala ng card sa **ibang hakbang** sa workflow na ito,
- **Hatiin ang card** sa isang ganap na ibang workflow, o
- **Isara** ang card.

Ito ay nagpapahintulot sa isang desisyon na mag-branch ang tao pababa sa iba't ibang mga daan.

### Automatic na routing (conditional)

Ang mga automatic na route ay nagsisimula sa card **sa sandaling ito ay papasok sa isang hakbang** (at pagkatapos ng mga automated action ay tapos na), nang walang sinuman na nag-click, kung ang tao ay tumutugma sa isang hanay ng mga kondisyon. Magdagdag ng isang route, pumili ng target hakbang, at tukuyin ang isa o higit pang **mga kondisyon** (halimbawa, campus ng tao, edad, o status ng miyembro). Ang isang route na walang mga kondisyon ay tumutugma sa lahat.

:::info
Sa board, bawat column ng hakbang ay nagpapakita ng mga maliit na anotasyon na naglalarawan ng routing nito -- halimbawa, isang label ng resulta o "kung tumutugma" na sinusundan ng isang arrow sa destination hakbang o workflow.
:::

## Ganap na Automated na mga Hakbang

Maaari mong gawing ganap na awtomatiko ang isang hakbang, nang walang sinuman na gumagana dito. Bigyan ng mga hakbang nito ng **mga automated action** at magdagdag ng **automatic na route** (na walang mga kondisyon) na tumuturo sa susunod na hakbang. Kapag ang isang card ay papasok, ang mga aksyon ay tumatakbo, at pagkatapos ang route ay nag-advance nito kaagad -- ang card ay napupunta nang direkta.

:::tip
Pagsama ito sa **Maghintay**: *Magpadala ng welcome email → Maghintay ng 3 araw → awtomatikong paunlarin sa "Personal call" hakbang.* Ang email at ang timing ay hinahawakan para sa iyo, at ang isang volunteer ay nakakakita lamang ng card kapag panahon na para sa human touch.
:::

## Mga Trigger

Ang mga trigger ay nagdadagdag ng mga tao sa isang workflow nang awtomatiko kapag may nangyari, upang hindi mo na kailangang magdagdag ng mga card nang manu-manong. Sa isang workflow board, i-click ang tab ng **Mga Trigger**, pagkatapos **Magdagdag ng Trigger**. Mayroong dalawang uri:

### Mga trigger ng kaganapan

Sumusunog sa sandaling nagbabago ang isang record sa B1. Pumili ng kaganapan, pagkatapos opsyonal na magdagdag ng **mga kondisyon** upang lamang ang mga tumutugmang tao ay idinagdag:

- **Tao · Gawa / Nag-update** -- halimbawa, magdagdag ng sinuman na ang status ay nagiging *Bisita*.
- **Donasyon · Gawa** -- halimbawa, magdagdag ng isang unang beses o malaking regalo sa isang thank-you workflow (tugma sa halaga, pondo, o paraan).
- **Grupo · Sumali ang Miyembro** / **Grupo · Gawa**.
- **Form · Isinumite** -- magdagdag ng sinuman na nagsumite ng isang piniling form (mahusay para sa isang "I'm New" o "Connect" card).

### Mga schedule trigger

Tumatakbo sa isang paulit-ulit na batayan -- pang-araw-araw, linggo-linggo, buwang-buwan, o taun-taon -- laban sa isang hanay ng mga kondisyon. Gamitin ang mga ito para sa time-based na outreach tulad ng *lahat ng taong ang anibersaryo ng miyembro ay ngayon* o isang *buwang-buwan* na check-in.

Para sa anumang trigger maaari mo ring itakda ang:

- Ang **entry step** na nagsisimula ang bagong card sa (defaulting sa unang hakbang).
- **Minsan bawat tao** -- upang ang parehong tao ay hindi idadagdag sa workflow nang dalawang beses ng trigger.
- **Aktibo** -- i-turn on o off ang trigger nang hindi ito binubuksang.

:::tip
Pagsama ang **Form · Isinumite** trigger sa template ng **New Visitor Follow-up** upang gawing isang automatic na follow-up pipeline ang iyong "Connect Card" o "I'm New" form.
:::

## Ang Aking mga Card

Ang mga volunteer at staff ay hindi na kailangang mag-dig sa bawat board upang mahanap ang kanilang trabaho. Ang pahina ng **My Cards** (na-link mula sa pahina ng Mga Workflow) ay naglalista ng bawat card na na-assign sa kasalukuyang user sa lahat ng mga workflow. Ang pag-click sa isang card ay nagbubukas ng board na kabilang nito.

## Mga Ulat

Buksan ang isang workflow at i-click ang **Mga Ulat** upang makita ang analytics para sa workflow na iyon:

- **Overdue** -- ang bilang ng mga card na lumampas sa kanilang due date.
- **Mga Card bawat Hakbang** -- gaano karaming mga card ay kasalukuyang nakakaupo sa bawat hakbang, ipinapakita bilang isang column chart.
- **Kumpleto (30 araw)** -- throughput sa nakaraang 30 araw, ipinapakita bilang isang line chart.

Gamitin ang mga ito upang matanggal ang mga bottleneck -- halimbawa, isang hakbang kung saan ang mga card ay nag-pile up at hindi kailanman umusulong.

## Kaugnay na mga Artikulo

- [Mga Gawain](./tasks.md) -- ang mga indibidwal na item ng aksyon na binuo ang mga card ng workflow sa
- [Mga Automations](./automations.md) -- lumikha ng mga paulit-ulit na gawain sa isang schedule
- [Mga Form](../forms/index.md) -- bumuo ng mga form na maaaring mag-trigger ng mga workflow
- [Mga Grupo](../groups/index.md) -- ang mga grupo na maaaring ilagay ng isang aksyon ng "Magdagdag sa grupo"
- [Mga Tungkulin at Pahintulot](../settings/roles-permissions.md) -- kontrolin kung sino ang maaaring magpanood, mag-edit, at pamahalaan ang mga workflow
