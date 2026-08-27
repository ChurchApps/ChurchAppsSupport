---
title: "Workflows"
---

# Workflows

<div class="article-intro">

Ang Workflows ay gumagalaw ng mga tao sa pamamagitan ng isang serye ng mga hakbang sa isang visual board. Bawat tao ay nagiging isang card na naglalakbay mula sa isang hakbang hanggang sa susunod -- mula sa isang first-time guest follow-up, hanggang sa isang membership process, hanggang sa isang first-time giver thank-you, at kahit ano pa kung saan kailangan mong subaybayan ang maraming mga tao sa pamamagitan ng parehong hanay ng mga yugto. Ang isang hakbang ay maaaring magtanong sa isang boluntaryo na gumawa ng isang bagay (magtawag, makipag-usap) **at** magpatakbo ng mga automated action sa sarili nito -- magpadala ng email, maghintay ng ilang araw, idagdag ang tao sa isang grupo -- upang ang Workflows ay magsagawa ng parehong human follow-up at ang busywork sa paligid nito. Ang Workflows ay nag-extend ng [Tasks](./tasks.md) sa isang drag-and-drop Kanban board upang walang tao ay makasama sa pamamagitan ng mga buhay.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Siguraduhin na ang mga taong gusto mong subaybayan ay umiiral sa B1 Admin
- Maging pamilya sa kung paano gumagana ang [Tasks](./tasks.md), dahil bawat card sa board ay isang task
- Upang gamitin ang **Send email** action, lumikha muna ng mga email template na gusto mong ipadala (pinamamahalaan sa ilalim ng **Messaging → Manage Templates**)
- Kailangan mo ng angkop na Tasks permission. Ang pag-view, pag-edit ng mga card, at pag-manage ng mga workflow ay mga hiwalay na antas ng pahintulot (tingnan ang [Roles & Permissions](../settings/roles-permissions.md))

</div>

## Viewing Workflows

Mag-navigate sa **Serving**, buksan ang **Tasks** area, at pumili ng **Workflows** mula sa menu. Makikita mo ang iyong mga workflow na nakalista at na-grupo ayon sa kategorya, na may mga active workflow na naka-highlight. I-click ang anumang workflow upang buksan ang board nito.

## Creating a Workflow

1. Sa Workflows page, i-click ang **Add Workflow**.
2. Pumili kung paano magsimula:
   - **Blank workflow** -- magsimula mula sa simula at bumuo ng iyong sariling mga hakbang.
   - **Mula sa isang template** -- magsimula sa isang handa na nakaset ng mga hakbang na maaari mong i-edit. Ang mga built-in template ay kasama ang:
     - **New Visitor Follow-up** -- Magpadala ng welcome email → Personal phone call → Mag-imbita sa susunod na hakbang → Connected
     - **Membership Class** -- Ipahayag ang interes → Magparehistro para sa klase → Dumalo sa klase → Kumpleto ang membership
     - **First-time Giver Thank-you** -- Magpadala ng thank-you note → Ibahagi ang giving impact → Stewarded
3. Bigyan ng pangalan ang workflow.
4. Opsyonal na magtalagang **Category** upang i-grupo ang mga kaugnay na workflow. Maaari kang lumikha ng isang bagong kategorya nang direkta mula sa dropdown.
5. Iwanan ang workflow na **Active** upang makuha ang mga tao na idagdag dito, o itakda ito sa **Inactive** upang itago ito mula sa add-to-workflow lists.
6. I-click ang **Save**.

:::tip
Gamitin ang **Duplicate** button sa Workflows list upang kopyahin ang isang umiiral na workflow -- kasama ang mga hakbang, automated actions, at routing -- bilang nagsisimula para sa isang bagong isa.
:::

## Building the Board with Steps

Bawat workflow board ay binubuo ng **steps**, ipinakita bilang mga column mula kaliwa hanggang kanan. Buksan ang isang workflow at gamitin ang **Add Step** upang lumikha ng bawat yugto ng iyong proseso.

Kapag nagdagdag o nag-edit ng isang hakbang, maaari mo i-configure:

- **Step Name** -- ang column heading (halimbawa, "Welcome Call" o "Awaiting Registration").
- **Due sa (days)** -- awtomatikong nagtakda ng due date kapag pumasok ang isang card sa hakbang na ito. Ang mga card na lumampas sa kanilang due date ay nakabendera bilang **Overdue**.
- **Default assignee** -- ang tao o grupo na awtomatikong nakatalagang mga bagong card sa hakbang na ito.
- **Automated actions** -- mga bagay na ginagawa ng sistema sa sarili nito kapag dumating ang isang card (tingnan sa ibaba).
- **Routing** -- kung saan napupunta ang card kapag umalis ito sa hakbang (tingnan ang [Routing](#routing-cards-with-outcomes-and-conditions)).

Mag-drag ng step column sa order na tumutugma sa iyong proseso. Ang order ay nagbibigay-daan sa default na landas na kinukuha ng isang card kapag walang ibang routing na nalalapat.

:::info
Magsave ng isang bagong hakbang muna. Ang mga automated action at routing ay nakakabit sa hakbang, kaya ang editor ay nag-unlock ng mga seksyong iyon kapag ang hakbang ay umiiral na.
:::

## Automated Actions

Bawat hakbang ay maaaring magdala ng isang listahan ng **automated actions** na tumatakbo sa kanilang sarili sa sandaling ang isang card ay **pumapasok** sa hakbang -- bago ang sinuman ay humawak nito. Ito ay kung paano ang isang hakbang ay nagpapagana sa isang boluntaryo *at* kumuha ng pangangalaga ng routine na gawain sa paligid ng pag-follow up.

Sa step editor, buksan ang **Automated actions**, i-click ang **Add Action**, pumili ng uri, punan ang mga setting, at i-click ang save icon sa action na iyon. Magdagdag ng marami tulad ng kailangan; ang tumatakbo **mula itaas hanggang ilalim sa order**.

| Action | What it does |
|---|---|
| **Send email** | Mga email sa tao ng isang email template na iyong pipiliin. Maaari mong i-override ang subject line. |
| **Wait** | Nagpapahintay ang card ng ilang araw bago magpatuloy (tingnan sa ibaba). |
| **Add to group** | Nagdadagdag ang tao sa [grupo](../groups/index.md) na iyong pipiliin. |
| **Add to workflow** | Nagsisimula ng tao sa ibang workflow -- kapaki-pakinabang para sa pag-hand off sa pagitan ng mga proseso. |
| **Add note** | Nag-record ng isang tala sa card's history. |
| **Set field** | Ina-update ang isang field sa person's record: Membership Status, Marital Status, Gender, City, State, o Zip. |
| **Webhook** | Ipinapadala ang card's details sa isang external web address (URL) na iyong ibinibigay, para sa pag-connect sa ibang mga sistema. |

Pagkatapos kumpleto ang lahat ng mga aksyon ng isang hakbang, ang card **ay nagpapahinga sa hakbang na iyon** upang ang isang tao ay magtrabaho -- maliban kung ang hakbang ay may isang automatic route na gumagalaw nito papunta (tingnan ang [Fully automated steps](#fully-automated-steps)).

:::info
Ang mga automated action ay tumatakbo lamang kapag ang isang card ay dumating sa pamamagitan ng normal na daloy -- kapag unang idinagdag, kapag ang isang resulta o automatic route ay nagdadala, o pagkatapos ng isang Wait na nagtatapos. Ang mga ito ay **hindi** muling tumatakbo kapag ang isang staff member ay manu-manong i-drag ang isang card sa hakbang o ipinabalik ito, kaya ang isang tao ay hindi makakakuha ng parehong email nang dalawang beses.
:::

### Sending email

Pumili ng **Send email**, pumili ng isa sa iyong email templates, at opsyonal na mag-type ng isang custom subject. Kapag ang isang card ay pumasok sa hakbang, ang tao ay tumatanggap ng email na iyon nang awtomatiko. (Kung ang tao ay walang email address sa file, ang hakbang ay simpleng lalalabas sa aksyong ito.)

### Waiting a few days (drip sequences)

Ang **Wait** action ay nagsasagawa ng card ng bilang ng araw na itinakda mo. Habang naghihintay, ang card ay nagpapakita bilang **Snoozed**. Kapag natapos ang paghihintay:

1. Anumang **natitirang aksyon sa parehong hakbang** ay tumatakbo -- upang makabuo kayo ng isang drip na tulad ng **Send email → Wait 3 days → Magpadala ng reminder email**.
2. Pagkatapos, kung ang hakbang ay may isang automatic route, ang card ay gumagalaw; kung hindi ito ay nagpapahinga sa hakbang para sa isang tao upang kumuha ng.

:::tip
Ang **Wait** sa pinakasimulan ng isang hakbang ay isang simpleng paraan upang "mag-hold" ng isang card bago ito lumilitaw sa isang boluntaryo -- halimbawa, *Maghintay 7 araw, pagkatapos ay isang coach ay umaabot*.
:::

## Adding People as Cards

Mayroong maraming mga paraan upang maglagay ng mga tao sa board:

- **Mula sa board** -- I-click ang **Add Card** sa ilalim ng isang step column at pumili ng isang tao. Maaari mo ring pumili ng isang grupo, at bawat miyembro ng grupo ay idinagdag bilang isang card.
- **Mula sa person's record** -- Gamitin ang **Add to Workflow** sa person's page upang i-drop sila sa isang workflow.
- **Mula sa People search** -- Pumili ng maraming mga tao at gamitin ang bulk **Add to Workflow** action upang idagdag ang lahat nang sabay-sabay.
- **Automatically na may isang trigger** -- Magdagdag ng mga tao kapag may nagaganap, tulad ng isang form submission o isang unang regalo (tingnan ang [Triggers](#triggers) sa ibaba).

## Working the Board

Buksan ang isang workflow upang makita ang board nito. Bawat card ay nagpapakita ng pangalan ng tao, kung sino ito ay nakatalagang, at isang due-date o status chip (**Overdue** o **Snoozed**). Ang isang step column ay nagpapakita din ng maliliit na badge para sa anumang automated actions ito ay tumatakbo at annotations para sa routing nito, na nagbibigay sa iyo ng isang at-a-glance map ng kung paano ang mga card ay daluyong.

- **Magalaw ng isang card** -- Mag-drag ng isang card mula sa isang column hanggang sa susunod habang ang tao ay umaabot.
- **Buksan ang isang card** -- I-double-click ang isang card (o i-click ito) upang buksan ang detail drawer nito, kung saan maaari mong baguhin ang hakbang, i-reassign ito, magdagdag ng mga tala, at suriin kung ano ang nangyari na.

Mula sa card drawer maaari mo:

- **Italaga** ang card sa isang ibang tao o grupo.
- **Snooze** ang card para sa 1 araw, 3 araw, o 1 linggo upang pansamantalang itago ang due date.
- **Ipadala Pabalik** sa nakaraang hakbang o **Laktawan** sa susunod na hakbang.
- **Pin assignment** -- panatilihin ang parehong may-ari sa card kahit ito ay gumagalaw sa pagitan ng mga hakbang. Sa pamamagitan ng default, ang paglilipat ng isang card sa isang bagong hakbang ay muling nag-assign nito sa default na assignee ng hakbang na iyon; ang pinning ay pinapanatili ang kasalukuyang tao na responsable sa buong.
- **Kumpleto** ang card upang tapusin ito, o pumili ng isang **Outcome** button kung ang hakbang ay may mga resulta na na-configure (tingnan ang [Routing](#routing-cards-with-outcomes-and-conditions)).
- **Magdagdag ng mga tala** at suriin ang card's **history** -- kasama ang isang log ng mga automated action na tumatakbo (mga email na ipinadala, mga paghihintay, atbp.).

### Bulk actions

Pumili ng mga checkbox sa maraming mga card upang kumilos sa kanila nang magkasama. Isang toolbar ay lilitaw na nagpapahintulot sa iyo na **Kumpleto**, **Snooze**, **I-assign**, o **Magalaw** lahat ng mga napiling card sa ibang hakbang nang sabay-sabay.

## Routing Cards with Outcomes at Conditions

Ang routing ay kumokontrol kung saan napupunta ang card kapag umalis ito sa isang hakbang. Buksan ang step's editor upang mag-configure ng dalawang uri ng routing.

### Outcome buttons

Ang mga resulta ay mga button na ipinakita sa card drawer kapag ikaw ay kumakumpleto ng isang card sa hakbang na iyon. Sa halip na isang solong **Complete** button, maaari kang mag-alok ng mga pagpipilian tulad ng "Sumali sa isang Grupo" o "Hindi Interesado." Bawat resulta ay maaaring:

- Magpadala ng card sa **ibang hakbang** sa workflow na ito,
- **Hand the card off** sa isang ganap na ibang workflow, o
- **Isara** ang card.

Ito ay nagpapahintulot sa isang desisyon na mag-branch ng tao pababa sa iba't ibang mga landas.

### Automatic routing (conditional)

Ang mga automatic route ay gumagalaw ng card nang patuloy sa **sandaling ito ay pumapasok sa isang hakbang** (at pagkatapos ng mga automated action ay kumpleto), nang walang sinuman na nag-click, kung ang tao ay tumutugma sa isang hanay ng mga kondisyon. Magdagdag ng isang route, pumili ng target hakbang, at tukuyin ang isa o higit pang **conditions** (halimbawa, campus ng tao, edad, o membership status). Ang isang route na walang mga kondisyon ay tumutugma sa lahat.

:::info
Sa board, bawat step column ay nagpapakita ng maliliit na annotations na naglalarawan ng routing -- halimbawa, isang outcome label o "kung tumutugma" na sinusundan ng isang arrow sa destination hakbang o workflow.
:::

## Fully Automated Steps

Maaari kang gawing ganap nang tumatakbo ang isang hakbang, walang sinuman na kumikilos nito. Bigyan ito ng **automated actions** at magdagdag ng **automatic route** (na walang mga kondisyon) na nakaturo sa susunod na hakbang. Kapag ang isang card ay pumasok, ang mga aksyon ay tumatakbo, at pagkatapos ang route ay nag-advance agad -- ang card ay dumadaan nang direkta.

:::tip
Pagsamahin ito sa **Wait**: *Magpadala ng welcome email → Maghintay 3 araw → awtomatikong mag-advance sa "Personal call" hakbang.* Ang email at ang timing ay hawakan para sa iyo, at ang isang boluntaryo ay lamang makikita ang card kapag oras na para sa human touch.
:::

## Triggers

Ang mga trigger ay nagdadagdag ng mga tao sa isang workflow nang awtomatiko kapag may nagaganap, kaya hindi mo na kailangang magdagdag ng mga card sa pamamagitan ng kamay. Sa workflow board, i-click ang **Triggers** tab, pagkatapos **Add Trigger**. Mayroong dalawang uri:

### Event triggers

Apoy kaagad kapag ang isang record ay nag-babago sa B1. Piliin ang kaganapan, pagkatapos opsyonal na magdagdag ng **conditions** upang lamang magdagdag ng mga tumutugmang tao:

- **Person · Created / Updated** -- hal. magdagdag ng sinuman na ang status ay nagiging *Visitor*.
- **Donation · Created** -- hal. magdagdag ng isang first-time o malaking regalo sa isang thank-you workflow (match sa halaga, fund, o pamamaraan).
- **Group · Member Joined** / **Group · Created**.
- **Form · Submitted** -- magdagdag ng sinuman na nagsumite ng piniling form (mahusay para sa isang "I'm New" o "Connect" card).

### Schedule triggers

Tumakbo sa isang recurring na batayan -- araw-araw, linggo, buwanan, o taun-taon -- laban sa isang hanay ng mga kondisyon. Gamitin ang mga ito para sa time-based outreach tulad ng *lahat ng taong ang membership anniversary ay ngayon* o isang *monthly* check-in.

Para sa anumang trigger maaari mo ring itakda:

- Ang **entry step** na ang bagong card ay nagsisimula (defaults sa unang hakbang).
- **Once per person** -- upang ang parehong tao ay hindi idadagdag sa workflow nang dalawang beses ng trigger.
- **Active** -- i-turn on o off ang trigger nang hindi ito binabura.

:::tip
Ipairing ng isang **Form · Submitted** trigger sa **New Visitor Follow-up** template upang ibahin ang "Connect Card" o "I'm New" form sa isang automatic follow-up pipeline.
:::

## My Cards

Ang mga boluntaryo at staff ay hindi kailangang i-dig sa bawat board upang mahanap ang kanilang gawain. Ang **My Cards** page (naka-link mula sa Workflows page) ay naglilista sa bawat card na nakatalagang sa kasalukuyang user sa lahat ng mga workflow. Ang pag-click ng isang card ay nagbubukas ng board na ito ay pagmamay-ari.

## Reports

Buksan ang isang workflow at i-click ang **Reports** upang makita ang analytics para sa workflow na iyon:

- **Overdue** -- ang bilang ng mga card na lumampas sa kanilang due date.
- **Cards per Step** -- kung gaano karaming mga card ay kasalukuyang nakaupoon sa bawat hakbang, ipinakita bilang isang column chart.
- **Completed (30 days)** -- ang throughput sa nakaraang 30 araw, ipinakita bilang isang line chart.

Gamitin ang mga ito upang mahanap ang mga bottleneck -- halimbawa, isang hakbang kung saan ang mga card ay nag-pile up at hindi kailanman umangat.

## Related Articles

- [Tasks](./tasks.md) -- ang mga indibidwal na item ng aksyon na ang mga workflow card ay itinayo
- [Automations](./automations.md) -- lumikha ng mga recurring task sa isang schedule
- [Forms](../forms/index.md) -- bumuo ang mga form na maaaring mag-trigger ng mga workflow
- [Groups](../groups/index.md) -- ang mga grupo na ang "Add to group" action ay maaaring maglagay ng mga tao sa
- [Roles & Permissions](../settings/roles-permissions.md) -- kontrolin kung sino ang maaaring tingnan, mag-edit, at pamahalaan ang mga workflow
