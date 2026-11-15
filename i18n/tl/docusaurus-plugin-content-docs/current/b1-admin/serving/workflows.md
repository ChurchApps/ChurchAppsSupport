---
title: "Mga Workflow"
description: "Gumawa ng mga Kanban-style na board sa B1 Admin para dalhin ang mga tao sa mga follow-up na hakbang, gamit ang mga awtomatikong email, text, at trigger na awtomatikong nagdaragdag ng mga tao."
---

# Mga Workflow

<div class="article-intro">

Inililipat ng mga workflow ang mga tao sa serye ng mga hakbang sa isang visual na board. Ang bawat tao ay nagiging card na lumilipat mula sa isang hakbang papunta sa susunod -- mula sa follow-up sa unang beses na bisita, hanggang sa proseso ng membership, sa pasasalamat sa unang beses na nagbigay, at kahit anong iba pa kung saan kailangan mong subaybayan ang maraming tao sa iisang hanay ng mga yugto. Maaaring humiling ang isang hakbang sa volunteer na gumawa ng isang bagay (tumawag, makipag-usap) **at** magpatakbo ng mga awtomatikong aksyon sa sarili nito -- magpadala ng email o text, maghintay ng ilang araw, idagdag ang tao sa isang grupo -- kaya sakop ng mga Workflow ang parehong follow-up na ginagawa ng tao at ang mga paulit-ulit na gawaing nakapaligid dito. Pinalalawak ng mga Workflow ang [Tasks](./tasks.md) bilang isang drag-and-drop na Kanban board para walang tao o bagay na malaglag sa pagitan.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Siguraduhing umiiral sa B1 Admin ang mga taong gusto mong subaybayan
- Alamin kung paano gumagana ang [Tasks](./tasks.md), dahil ang bawat card sa board ay isang task
- Para magamit ang aksyong **Send email**, gumawa muna ng mga email template na gusto mong ipadala (pinamamahalaan sa ilalim ng **Settings → Email Templates**)
- Para magamit ang aksyong **Send text**, ikonekta muna ang isang [texting provider](../settings/church-settings.md#texting)
- Kailangan mo ng angkop na permiso sa Tasks. Magkahiwalay na antas ng permiso ang pagtingin, pag-edit ng card, at pamamahala ng mga workflow (tingnan ang [Roles & Permissions](../settings/roles-permissions.md))

</div>

## Pagtingin sa mga Workflow {#viewing-workflows}

Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa itaas-kaliwa ng B1 Admin), palawakin ang **Serving**, at i-click ang **Workflows**. Nakalista ang iyong mga workflow sa isang table na nagpapakita ng **Category** at **Status** ng bawat isa (**Active** o **Inactive**). Kung gumagamit ka ng mga category, pinapayagan ka ng mga tab sa itaas ng listahan na i-filter ito ayon sa category. I-click ang alinmang workflow para buksan ang board nito.

## Paggawa ng Workflow {#creating-a-workflow}

1. Sa pahinang Workflows, i-click ang **Add Workflow**.
2. Pumili kung paano magsisimula:
   - **Blank workflow** -- magsimula sa wala at gawin ang sarili mong mga hakbang.
   - **From a template** -- magsimula sa handa nang hanay ng mga hakbang na maaari mong i-edit. Kabilang sa mga built-in na template ang:
     - **New Visitor Follow-up** -- Magpadala ng welcome email → Personal na tawag sa telepono → Imbitahan sa susunod na hakbang → Connected
     - **Membership Class** -- Ipahayag ang interes → Magparehistro sa klase → Dumalo sa klase → Kumpletuhin ang membership
     - **First-time Giver Thank-you** -- Magpadala ng sulat ng pasasalamat → Ibahagi ang epekto ng handog → Stewarded
     - **Serving Assignment Confirmation** -- Humiling at maghintay ng tugon → Tumawag sa volunteer tungkol sa hindi nasagot na request (tingnan ang [Serving Assignment Confirmations](#serving-assignment-confirmations))

   Maaaring tumagal ng sandali ang pagbuo ng mga hakbang ng template. Habang ginagawa ito, ang button na **Add Workflow** ay magiging **Creating...** at hindi na mai-click muli, kaya hindi ka magkakaroon ng duplicate. Kung may magkamali, ipapakita ng pahina ang *"The workflow could not be created. Please try again."*
3. Bigyan ng **Name** ang workflow.
4. Opsyonal na magtalaga ng **Category** para pagsama-samahin ang magkakaugnay na workflow. Maaari kang gumawa ng bagong category mismo mula sa dropdown.
   Para sa blank workflow, pinipili mo rin ang **Workflow purpose** nito: **People follow-up** (ang karaniwang uri) o **Serving assignment confirmation**. Hindi na mababago ang purpose pagkatapos gawin ang workflow.
5. Iwanang **Active** ang workflow para maidagdag ang mga tao dito, o itakda sa **Inactive** para itago ito sa mga listahan ng add-to-workflow.
6. I-click ang **Save**.

:::tip
Gamitin ang button na **Duplicate** sa listahan ng Workflows para kopyahin ang umiiral na workflow -- kasama ang mga hakbang, awtomatikong aksyon, at routing nito -- bilang panimulang punto ng bago.
:::

## Pagbuo ng Board gamit ang mga Hakbang {#building-the-board-with-steps}

Ang bawat workflow board ay binubuo ng **mga hakbang**, na ipinapakita bilang mga column mula kaliwa pakanan. Buksan ang isang workflow at gamitin ang **Add Step** para gawin ang bawat yugto ng iyong proseso.

Kapag nagdagdag o nag-edit ka ng hakbang, maaari mong i-configure ang:

- **Step Name** -- ang heading ng column (halimbawa, "Welcome Call" o "Awaiting Registration").
- **Due in (days)** -- awtomatikong nagtatakda ng due date kapag pumasok ang isang card sa hakbang na ito. Ang mga card na lampas na sa due date ay mamarkahang **Overdue**.
- **Default assignee** -- ang tao o grupong awtomatikong itinatalaga sa mga bagong card sa hakbang na ito. Kapag tao ang default assignee, makakatanggap siya ng notification na may card na naitalaga sa kanya.
- **Automated actions** -- mga bagay na awtomatikong ginagawa ng sistema kapag dumating ang card (tingnan sa ibaba).
- **Routing** -- kung saan pupunta ang card kapag umalis ito sa hakbang (tingnan ang [Routing](#routing-cards-with-outcomes-and-conditions)).

I-drag ang mga column ng hakbang sa pagkakasunod-sunod na tumutugma sa iyong proseso. Tinutukoy din ng pagkakasunod-sunod ang default na daanan ng card kapag walang ibang routing na nalalapat.

:::info
I-save muna ang bagong hakbang. Nakakabit sa hakbang ang mga awtomatikong aksyon at routing, kaya ina-unlock ng editor ang mga seksyong iyon kapag umiiral na ang hakbang.
:::

## Mga Awtomatikong Aksyon {#automated-actions}

Maaaring magdala ang bawat hakbang ng listahan ng **mga awtomatikong aksyon** na tumatakbo nang mag-isa sa sandaling **pumasok** ang card sa hakbang -- bago pa may humawak nito. Ganito nakakapag-prompt ang isang hakbang sa volunteer *at* inaasikaso rin ang mga nakagawiang gawain sa paligid ng follow-up.

Sa step editor, buksan ang **Automated actions**, i-click ang **Add Action**, pumili ng uri, at punan ang mga setting nito. Magdagdag ng kasing-dami ng kailangan mo; tumatakbo ang mga ito **mula itaas pababa ayon sa pagkakasunod-sunod**. I-click ang **Save** sa hakbang para i-save nang sabay ang hakbang at lahat ng aksyon nito. Ang pag-alis ng aksyon gamit ang trash icon nito ay nagkakabisa kaagad.

| Aksyon | Ano ang ginagawa nito |
|---|---|
| **Send email** | Nagpapadala ng email sa tao gamit ang email template na pipiliin mo. Maaari mong i-override ang subject line. |
| **Send text** | Nagte-text sa tao ng mensaheng isusulat mo, sa pamamagitan ng [texting provider](../settings/church-settings.md#texting) ng iyong simbahan. |
| **Wait** | Pinapahinto ang card nang ilang araw bago magpatuloy (tingnan sa ibaba). |
| **Add to group** | Idinadagdag ang tao sa isang [grupo](../groups/index.md) na pipiliin mo. |
| **Remove from group** | Inaalis ang tao sa isang grupong pipiliin mo. |
| **Record Attendance** | Minamarkahan ang tao bilang present sa service time ng isang grupo na kasalukuyang nagaganap (tingnan sa ibaba). |
| **Add to workflow** | Sinisimulan ang tao sa ibang workflow -- kapaki-pakinabang para sa paglilipat sa pagitan ng mga proseso. |
| **Add note** | Nagtatala ng note sa kasaysayan ng card. |
| **Set field** | Ina-update ang isang field sa talaan ng tao: Membership Status, Marital Status, Gender, City, State, o Zip. |
| **Webhook** | Ipinapadala ang mga detalye ng card sa external na web address (URL) na ibibigay mo, para makakonekta sa ibang sistema. |
| **Create task** | Gumagawa ng [task](./tasks.md) na may pamagat at paglalarawang ilalagay mo, na itinalaga sa sinumang piliin mo. |
| **Notify Person** | Nagpapadala sa staff o volunteer na pipiliin mo ng email at B1 notification tungkol sa card (tingnan sa ibaba). |

Pagkatapos matapos ang lahat ng aksyon ng isang hakbang, **nananatili ang card sa hakbang na iyon** para maharap ito ng isang tao -- maliban kung may awtomatikong route ang hakbang na naglilipat dito pasulong (tingnan ang [Fully automated steps](#fully-automated-steps)).

:::info
Tumatakbo lamang ang mga awtomatikong aksyon kapag dumating ang card sa normal na daloy -- kapag unang idinagdag ito, kapag dinala ito ng isang outcome o awtomatikong route, o pagkatapos matapos ang isang Wait. **Hindi** sila muling tumatakbo kapag manwal na idinrag ng staff ang card papunta sa hakbang o ibinalik ito, kaya hindi makakatanggap ang isang tao ng parehong email nang dalawang beses.
:::

### Pagpapadala ng email {#sending-email}

Piliin ang **Send email**, pumili ng isa sa iyong email template, at opsyonal na i-type ang custom na subject. Kapag pumasok ang card sa hakbang, awtomatikong natatanggap ng tao ang email na iyon. (Kung walang email address ang tao sa talaan, nilalaktawan lamang ng hakbang ang aksyong ito.) Pinupunan ng [mga merge field](../settings/email-templates.md#merge-fields) sa template, gaya ng `{{firstName}}`, ang sariling detalye ng tao. Kung sinimulan ng trigger na **Donation · Created** ang workflow, pinupunan ang mga gift field na `{{amount}}`, `{{giftDate}}`, `{{fund}}`, at `{{receipt}}` mula sa handog na iyon, kahit sa mga hakbang na tumatakbo pagkatapos ng Wait. Tingnan ang [Gift merge fields](../settings/email-templates.md#gift-merge-fields).

Kapag naipadala na ang email, itatala ng kasaysayan ng card ang **Email sent**. Kung hindi ito maipadala -- halimbawa, dahil hindi pa naaaprubahan ang email ng simbahan mo o naabot na ang pang-araw-araw na limitasyon -- walang idadagdag na entry na "Email sent".

:::info
Lalabas lamang ang mga workflow email matapos maaprubahan ang simbahan mo na magpadala ng group email, at binibilang ang mga ito sa pang-araw-araw na limitasyon ng email ng simbahan mo. Tingnan ang [Turning On Group Email for Your Church](../groups/group-members.md#turning-on-group-email-for-your-church). Binabalaan ka ng aksyong **Send email** sa step editor kapag hindi maipapadala ang mga email na ito: *"Your church's email hasn't been approved yet..."* kung nakabinbin pa ang pag-apruba, o *"Your church's email is paused..."* kung may bumalik na mensahe kamakailan o na-report bilang spam.
:::

### Pagtatala ng attendance {#recording-attendance}

Piliin ang **Record Attendance** at i-click ang **Pick group** para piliin ang grupong dapat itala ang attendance. Kapag tumakbo ang aksyon, minamarkahang present ang tao para sa service time ng grupong iyon na kasalukuyang nagaganap -- katulad ng kung nag-check-in siya. Kapaki-pakinabang ito kasama ng trigger na nagdaragdag ng mga tao sa workflow habang dumarating sila, para mabilang sila nang walang hiwalay na check-in.

- Sinusukat ang attendance sa sandaling **ginawa** ang card, kaya hindi ito maitutulak ng isang **Wait** na mas maaga sa workflow lampas sa serbisyo.
- Tanging ang mga service time na may araw at oras ng simula ang binibilang. Kung walang service time ng grupo ang nagaganap sa sandaling iyon, walang mare-record at itatala ng kasaysayan ng card ang **No scheduled service in progress — attendance not recorded**.
- Kapag na-record ang attendance, ipinapakita ng kasaysayan ng card ang **Attendance recorded** kasunod ang pangalan ng grupo. Ang pag-uulit ng aksyon para sa parehong serbisyo ay hindi magbibilang sa tao nang dalawang beses.

### Pag-notify sa isang tao {#notifying-a-person}

Piliin ang **Notify Person**, i-click ang **Pick person**, at opsyonal na i-type ang isang **Message**. Kapag pumasok ang card sa hakbang, makakatanggap ang taong iyon ng email at B1 notification na may pangalan ng taong nasa card, mga pangalan ng workflow at hakbang, ang iyong mensahe, at link para buksan ang card. Gamitin ito para bigyan ng abiso ang isang staff member o ministry leader -- halimbawa, *"Notify the pastor when someone reaches the Membership Interview step."* Itinatala ng kasaysayan ng card ang **Notified** kasunod ang pangalan ng tao.

### Pagpapadala ng text {#sending-a-text}

Piliin ang **Send Text** at i-type ang **Text message** (hanggang 1,600 karakter). Kung may naka-save kang [text templates](../settings/email-templates.md) ang simbahan mo, may lalabas na listahang **Start from a template** sa itaas ng kahon. Ang pagpili ng isa ay kinokopya ang teksto ng template sa mensahe, at maaari mo pa rin itong i-edit. Sariling kopya ang hawak ng hakbang, kaya hindi nababago ng mga susunod na pagbabago sa template ang hakbang. Kapag pumasok ang card sa hakbang, natatanggap ng tao ang text na iyon sa kanyang mobile phone. Para i-personalize ang mensahe, i-click ang isang chip sa ibaba ng kahon ng mensahe -- **First Name**, **Last Name**, **Display Name**, o **Church Name** -- para ipasok ang `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, o `{{churchName}}` sa iyong cursor. Pinupunan ang bawat isa ng detalye ng tao kapag naipadala ang text. Ipinapasok ng mga chip na **Amount**, **Gift Date**, **Fund**, at **Receipt** ang mga gift field, na napupunan lamang kapag sinimulan ng trigger na **Donation · Created** ang workflow. Halimbawa: `Thanks {{firstName}} for your gift of {{amount}} to {{fund}}!`

- Kung walang mobile phone ang tao sa talaan, walang text na ipapadala at itatala ng kasaysayan ng card ang **Text skipped: no mobile phone**.
- Kung nag-opt out ang tao, walang text na ipapadala at itatala ng kasaysayan ng card ang **Text skipped: opted out**.
- Kapag naipadala na ang text, itatala ng kasaysayan ng card ang **Text sent**. Kung pumalya ang pagpapadala -- halimbawa, dahil walang nakakabit na texting provider o naubusan ng texting credits ang simbahan mo -- itatala ang pagkabigo sa kasaysayan ng card at tuloy pa rin ang natitirang aksyon ng hakbang.

:::warning
Ipinapadala ang mga text sa sarili mong [texting provider](../settings/church-settings.md#texting) ng simbahan. Kung walang nakakabit na provider, babalaan ka ng action editor ng *"No texting provider is set up"* at hindi magpapadala ng text.
:::

### Paghihintay ng ilang araw (drip sequences) {#waiting-a-few-days-drip-sequences}

Hinahawakan ng aksyong **Wait** ang card nang bilang ng araw na itinakda mo. Habang naghihintay, ipinapakitang **Snoozed** ang card. Tinitingnan ng B1 ang mga natapos na wait kada 30 minuto, kaya babalik ang card sa daloy sa loob ng halos kalahating oras matapos matapos ang wait nito. Kapag tapos na ang wait:

1. Tatakbo ang anumang **natitirang aksyon sa parehong hakbang** -- kaya maaari kang bumuo ng drip gaya ng **Send email → Wait 3 days → Send a reminder email**.
2. Pagkatapos, kung may awtomatikong route ang hakbang, gagalaw ang card; kung wala, mananatili ito sa hakbang para kunin ng isang tao.

:::tip
Ang **Wait** sa pinakasimula ng isang hakbang ay simpleng paraan para "hawakan" ang card bago ito ipakita sa isang volunteer -- halimbawa, *Wait 7 days, then a coach reaches out*.
:::

## Pagdaragdag ng mga Tao bilang Card {#adding-people-as-cards}

May ilang paraan para maglagay ng tao sa isang board:

- **Mula sa board** -- I-click ang **Add Card** sa ibaba ng column ng isang hakbang at pumili ng tao. Maaari ka ring pumili ng grupo, at idadagdag ang bawat miyembro ng grupong iyon bilang card.
- **Mula sa talaan ng tao** -- Gamitin ang **Add to Workflow** sa pahina ng isang tao para ilagay siya sa workflow.
- **Mula sa People search** -- Pumili ng maraming tao at gamitin ang bulk na aksyong **Add to Workflow** para idagdag silang lahat nang sabay.
- **Awtomatiko gamit ang trigger** -- Magdagdag ng mga tao kapag may nangyari, gaya ng form submission o unang handog (tingnan ang [Triggers](#triggers) sa ibaba).

Ang pagdaragdag ng tao nang manwal, o sa pamamagitan ng aksyong **Add to workflow** ng hakbang, ay hindi kailanman magbibigay sa kanila ng pangalawang bukas na card sa parehong workflow. Kung mayroon na silang bukas na card, nilalaktawan sila (sa bulk add, tanging ang mga walang card pa ang makakatanggap ng bagong card). Kapag nasara na ang card nila, maaari mo na silang idagdag muli. Ang mga trigger ay sumusunod sa sarili nilang setting na **Only once per person** sa halip.

## Pagtatrabaho sa Board {#working-the-board}

Buksan ang isang workflow para makita ang board nito. Ipinapakita ng bawat card ang pangalan ng tao, kung kanino ito naitalaga, at chip ng due date o status (**Overdue** o **Snoozed**). Nagpapakita rin ng maliliit na badge ang column ng hakbang para sa mga awtomatikong aksyong tumatakbo rito, at mga annotation para sa routing nito, na nagbibigay ng mapa ng daloy ng mga card sa isang tingin. Sa loob ng bawat column, ang card na pinakahuling pumasok sa hakbang ay nasa itaas.

- **Ilipat ang card** -- I-drag ang card mula sa isang column papunta sa susunod habang sumusulong ang tao.
- **Buksan ang card** -- I-double-click ang card (o i-click ito) para buksan ang detail drawer nito, kung saan maaari mong baguhin ang hakbang, muling italaga, magdagdag ng notes, at suriin ang mga nangyari na.

Mula sa card drawer, maaari mo:

- **I-assign** ang card sa ibang tao o grupo.
- **I-snooze** ang card nang 1 araw, 3 araw, o 1 linggo para pansamantalang itago ang due date nito.
- **Send Back** sa nakaraang hakbang o **Skip** papunta sa susunod na hakbang.
- **Pin assignment** -- panatilihin ang parehong may-ari ng card kahit lumilipat ito sa pagitan ng mga hakbang. Bilang default, kapag inilipat ang card sa bagong hakbang, muling itinatalaga ito sa default assignee ng hakbang na iyon; pinapanatili ng pin ang kasalukuyang tao na responsable sa buong proseso.
- **Complete** ang card para tapusin ito, o pumili ng button na **Outcome** kung may naka-configure na outcome ang hakbang (tingnan ang [Routing](#routing-cards-with-outcomes-and-conditions)).
- **Remove card** -- alisin ang card sa board nang hindi tinatapos, halimbawa kapag may nadagdag na tao nang hindi sinasadya. Pagkatapos mong kumpirmahin, isasara ang card at aalisin sa listahan ng lahat. Walang outcome, route, o aksyon ng hakbang na tatakbo, at pananatilihin ang kasaysayan nito na may entry na **Removed**. Para sa card ng [serving assignment confirmation](#serving-assignment-confirmations), ang pag-alis dito ay magsasara sa request sa parehong paraan.
- **Magdagdag ng notes** at suriin ang **Activity** ng card -- isang log ng mga awtomatikong aksyong tumakbo na (mga email na naipadala, mga wait, atbp.), kasama ang petsa at oras ng bawat isa.

Para sa card tungkol sa isang tao, ipinapakita rin ng drawer ang mobile phone at email ng taong iyon bilang mga link na maaari mong i-tap para tawagan o i-email siya, kasama ang link na **View profile** kung may permiso kang tingnan ang mga tao. Nakikita ng taong naitalaga sa card ang phone at email kahit walang access sa People.

Naka-save ang mga note kasama ng card. Sinumang makakabukas ng card -- kasama ang taong o grupong naitalaga dito -- ay makakabasa ng mga note at makakapagdagdag ng sarili nila. Ang mga hindi makakabukas ng card ay hindi makakakita ng mga note nito.

### Bulk actions {#bulk-actions}

Lagyan ng check ang mga checkbox sa maraming card para kumilos sa mga ito nang sabay. Para pumili ng bawat card sa isang hakbang nang sabay-sabay, lagyan ng check ang kahong **Select all** sa header ng column ng hakbang na iyon; lagyan muli ng check para alisin ang pagkakapili. Lalabas ang toolbar na nagpapahintulot sa iyong **Complete**, **Snooze**, **Assign** (muling italaga), o **Move to…** ang ibang hakbang para sa lahat ng napiling card nang sabay.

## Pag-route ng Card gamit ang Outcome at Kondisyon {#routing-cards-with-outcomes-and-conditions}

Kinokontrol ng routing kung saan pupunta ang card kapag umalis ito sa isang hakbang. Buksan ang editor ng hakbang para i-configure ang dalawang uri ng routing.

### Mga outcome button {#outcome-buttons}

Ang mga outcome ay mga button na lumalabas sa card drawer kapag tinatapos mo ang card sa hakbang na iyon. Sa halip na iisang button na **Complete**, maaari kang mag-alok ng mga pagpipilian gaya ng "Joined a Group" o "Not Interested." Ang bawat outcome ay maaaring:

- Ipadala ang card sa **ibang hakbang** sa workflow na ito,
- **Ilipat ang card** sa ibang workflow nang tuluyan, o
- **Isara** ang card.

Dahil dito, ang isang desisyon ay maaaring magsanga sa tao papunta sa iba't ibang daanan.

### Awtomatikong routing (may kondisyon) {#automatic-routing-conditional}

Inililipat ng mga awtomatikong route ang card pasulong **sa sandaling pumasok ito sa hakbang** (at pagkatapos matapos ang mga awtomatikong aksyon nito), nang walang nag-click, kung tugma ang tao sa isang hanay ng mga kondisyon. Magdagdag ng route, piliin ang target na hakbang, at magtakda ng isa o higit pang **kondisyon** (halimbawa, campus, edad, o membership status ng tao). Maaaring itugma nang eksakto ang mga text field, o gamit ang **contains**, **starts with**, o **ends with**. Ang route na walang kondisyon ay tumutugma sa lahat.

Maaaring ihambing ng mga date condition (Today's Date, Birth Date, o Anniversary) ang buong petsa o bahagi lamang nito -- ang araw ng linggo, ang **Day of Month**, ang **Month**, o ang bilang ng taong lumipas. Para sa Birth Date o Anniversary ng tao, nag-aalok ang **Day of Month** ng kamag-anak na opsyong **Today**, kaya ang kondisyong gaya ng *Birth Date · Day of Month = Today* ay tumutugma sa mga taong kaarawan ngayong araw ng buwan. Nag-aalok ang **Month** ng **Previous Month**, **Current Month**, at **Next Month**. Kinakalkula ang mga kamag-anak na halagang tulad nito gamit ang time zone ng simbahan mo, kaya tumutugma ang mga ito sa araw ng kalendaryo ng simbahan mo at hindi sa oras ng server.

Ang grupo ng mga kondisyon na **Giving** ay may **Lapsed regular giver**, na naghahanap ng mga taong dating regular na nagbibigay at pagkatapos ay tumigil. Magtakda ng tatlong numero: *Gave in at least* **3** *of the last* **12** *weeks, then nothing in the last* **3** *weeks* (ito ang mga default). Binibilang ang mga linggo pabalik mula ngayon ayon sa time zone ng simbahan mo, at hindi binibilang ang handog na na-refund. Pinakakapaki-pakinabang ito sa [schedule trigger](#schedule-triggers) -- halimbawa, isang lingguhang panuntunang nagdaragdag ng mga lapsed giver sa pastoral care follow-up board. Tanging mga petsa ng handog ang tinitingnan ng kondisyon, hindi kailanman ang halaga, at hindi kailanman ipinapakita ng mga card at alerto ang mga halaga. Dahil nagbubunyag ito kung sino ang tumigil sa pagbibigay, tanging ang mga taong makakatingin ng mga donasyon ang nakakakita ng opsyong ito at nakakapagdagdag, nakakapagbago, o nakakapag-alis nito.

Kung sakaling hindi masuri ang mga kondisyon ng isang route, ituturing na hindi tugma ang route na iyon. Mananatili ang card sa hakbang (o susunod sa ibang route na tumutugma) sa halip na ma-stuck.

:::info
Sa board, nagpapakita ang bawat column ng hakbang ng maliliit na annotation na naglalarawan sa routing nito -- halimbawa, label ng outcome o "if matches" na sinusundan ng arrow papunta sa target na hakbang o workflow.
:::

## Mga Ganap na Awtomatikong Hakbang {#fully-automated-steps}

Maaari mong gawing tumakbo nang ganap sa sarili nito ang isang hakbang, nang walang taong humahawak dito. Bigyan ang hakbang ng mga **awtomatikong aksyon** nito at magdagdag ng **awtomatikong route** (walang kondisyon) na tumuturo sa susunod na hakbang. Kapag pumasok ang card, tatakbo ang mga aksyon, at pagkatapos ay agad itong itutulak ng route pasulong -- dumadaan nang diretso ang card.

:::tip
Pagsamahin ito sa **Wait**: *Send welcome email → Wait 3 days → automatically advance to the "Personal call" step.* Ang email at ang timing ay hinahawakan para sa iyo, at makikita lamang ng volunteer ang card kapag oras na para sa personal na pakikipag-ugnayan.
:::

## Mga Trigger {#triggers}

Awtomatikong nagdaragdag ng mga tao sa workflow ang mga trigger kapag may nangyari, kaya hindi mo na kailangang magdagdag ng card nang manwal. Sa isang workflow board, i-click ang tab na **Triggers**, pagkatapos ang **Add Trigger**. Dalawa ang uri:

### Mga event trigger {#event-triggers}

Tumatakbo sa sandaling may nagbago sa talaan sa B1. Piliin ang event, pagkatapos opsyonal na magdagdag ng **kondisyon** para ang mga tumutugmang tao lamang ang maidagdag:

- **Person · Created / Updated** -- hal., idagdag ang sinumang nagiging *Visitor* o *Guest* ang status (ang status na ibinibigay sa mga taong nagparehistro ng sarili nila).
- **Donation · Created** -- hal., idagdag ang unang beses o malaking handog sa isang workflow ng pasasalamat (itugma ayon sa halaga, fund, o paraan).
- **Group · Member Joined** / **Group · Created**.
- **Form · Submitted** -- idagdag ang sinumang nagsumite ng piniling form (mainam para sa card na "I'm New" o "Connect").

### Mga schedule trigger {#schedule-triggers}

Tumatakbo nang paulit-ulit -- araw-araw, lingguhan, buwan-buwan, o taun-taon -- laban sa isang hanay ng mga kondisyon. Gamitin ito para sa outreach na nakabatay sa oras, gaya ng *lahat ng may kaarawan ngayon* (Birth Date · Day of Month = **Today**, na ang buwan ay itinugma sa **Current Month**) o isang *buwanang* check-in. Kahit walang **Only once per person**, hindi idaragdag muli ng schedule trigger ang parehong tao sa loob ng iisang repeat period (isang araw, linggo, buwan, o taon, ayon sa dalas ng pagtakbo nito).

Para sa anumang trigger, maaari mo ring itakda ang:

- Ang **Starting step** kung saan lalapag ang bagong card (default ang unang hakbang).
- **Only once per person** -- para hindi maidagdag ang parehong tao sa workflow nang dalawang beses ng trigger. Kapag naka-on ito, nilalaktawan ang sinumang may card na sa workflow na ito.
  - **Add again after their card is closed** -- lumalabas kapag naka-on ang **Only once per person**. Lagyan ng check para payagan ang trigger na idagdag muli ang isang tao kapag nasara na ang naunang card niya sa workflow na ito. Hindi pa rin magkakaroon ng dalawang bukas na card ang isang tao sa workflow nang sabay. Gamitin ito para sa mga bagay na maaaring mangyari nang higit sa isang beses, gaya ng balik-bisitang bisita o taunang proseso.
- **Active** -- i-on o i-off ang trigger nang hindi ito binubura.

:::tip
Ipares ang trigger na **Form · Submitted** sa template na **New Visitor Follow-up** para gawing awtomatikong follow-up pipeline ang iyong "Connect Card" o "I'm New" form.
:::

## Serving Assignment Confirmations {#serving-assignment-confirmations}

Isang espesyal na uri ng workflow ang maaaring mag-follow up sa [mga serving request](./plans.md#assigning-team-members) hanggang sa tanggapin o tanggihan ng bawat volunteer. Sa halip na mga tao, bawat card sa board na ito ay sumusubaybay sa **isang assignment** -- isang tao sa isang posisyon sa isang plan. Magkahiwalay na card ang dalawang papel o dalawang serbisyo para sa iisang tao. Opt-in ito: walang magbabago sa isang plan hanggang pumili ka ng confirmation workflow sa mga setting nito.

### Pag-set up nito {#setting-one-up}

1. Sa pahinang Workflows, i-click ang **Add Workflow** at piliin ang template na **Serving Assignment Confirmation**. (O magsimula sa **Blank workflow** at itakda ang **Workflow purpose** nito sa **Serving assignment confirmation**.) Ang paggawa mula sa template ay nangangailangan ng permiso na magpadala ng text, dahil may kasama itong text step.
2. Suriin ang mga hakbang. Nagsisimula ang template sa:
   - **Request and wait for response** -- nagpapadala ng serving request sa pamamagitan ng email at text, naghihintay ng 2 araw, nagpapadala ng reminder email, naghihintay ng 1 araw pa, pagkatapos awtomatikong ililipat ang card pasulong.
   - **Call volunteer about unanswered request** -- hakbang para tawagan ng isang tao ang volunteer, due sa loob ng 1 araw. Magtakda ng **Default assignee** sa hakbang na ito. Kung wala itong nakatakda, mapupunta ang card sa leader ng ministry, o sa ministry team kung wala namang leader.
3. I-edit ang mga wait, mensahe, at hakbang para bumagay sa simbahan mo.
4. Buksan ang [mga setting ng plan](./plans.md#plan-settings) at piliin ang workflow na ito sa ilalim ng **Confirmation workflow**.

Ang mga workflow na ito ay gumagamit ng aksyong **Send serving request** sa halip na **Send email** at **Send text**. Piliin ang **Email** o **Text message** at, opsyonal, sumulat ng **Request message**. Laging kasama sa request ang papel, plan, service date, at link para tumugon; maaari mong gamitin ang `{{planName}}`, `{{positionName}}`, at `{{serviceDate}}` sa iyong mensahe. Iwanang walang laman ang mensahe para gamitin ang default na request. Nalalapat sa mga volunteer ang kanilang mga notification preference, text opt-in, texting provider mo, at pag-apruba ng email ng simbahan, at anumang nilaktawan o na-block na pagsubok ay itatala sa card. Hindi available sa mga board na ito ang **Send email**, **Send text**, at **Add to workflow**.

Ang tab na **Triggers** sa isang confirmation workflow ay nagpapaliwanag kung paano sinisimulan ang mga card sa halip na nag-aalok ng mga trigger, at hindi lumalabas ang mga workflow na ito sa listahan ng **Add to Workflow** para sa mga tao.

### Paano sinisimulan at isinasara ang mga card {#how-cards-are-started-and-closed}

- Nagsisimula ang mga card kapag ni-**Notify** mo ang mga volunteer sa isang nai-publish na plan (tingnan ang [Notifying Volunteers](./plan-validation.md#notifying-volunteers)). Bawat bago at hindi pa nasasagot na assignment ay nakakakuha ng isang card. Ang pag-save, pag-publish, pagkopya, o pag-auto-fill ng plan ay hindi nakikipag-ugnayan sa sinuman nang mag-isa, at hindi nagpapadala ng kahit ano ang mga penciled-in na plan.
- Nakakatanggap pa rin ang mga volunteer ng karaniwang in-app alert. Ang email at text follow-up ay mula sa workflow.
- Kapag **tinanggap o tinanggihan** ng volunteer, awtomatikong magsasara ang kanyang card, kasama ang anumang follow-up task na naka-link dito.
- Ipinapakita ng card drawer ang posisyon, service date, at link papunta sa plan. Sa halip na **Complete**, ang button ay magbabasa ng **Record follow-up done**. Ang pag-click dito ay nagtatala na may nag-follow up, pero nananatiling bukas at naitalaga ang card (ipinapakitang **Awaiting response**) hanggang tumugon ang volunteer o lumampas ang response deadline.
- Ang response deadline ay ang katapusan ng huling service time na pinaglilingkuran ng team ng posisyon. Kung walang tugmang oras ang plan, ito ay ang katapusan ng araw ng serbisyo. Kung walang sumagot pagsapit nito, magsasara ang card na may **Response deadline passed**, at isang task na **Review unanswered serving request** ang mapupunta sa kasalukuyang may-ari ng card o sa ministry leader para may magpasya kung paano sasaklawin ang puwesto. Mananatiling **Unconfirmed** ang assignment.
- Ang pag-alis ng assignment, pagbabago ng tao, posisyon, o petsa ng plan nito, pagbabalik ng plan sa penciled in, o paglipat ng plan sa ibang confirmation workflow ay magsasara ng card. Hindi kailanman muling bubuksan ang isang nasarang card ng isa pang **Notify**; magdagdag ng bagong assignment para magpadala ng bagong request.

:::info
Para sa mga request na ipinadala sa pamamagitan ng confirmation workflow, ang [mga paalala sa volunteer](./plans.md#volunteer-reminders) ay napupunta lamang sa mga volunteer na **tumanggap na**, para hindi makatanggap ng paalala ang mga taong naghihintay pa ng tugon bukod sa mga follow-up ng workflow.
:::

## Aking mga Card {#my-cards}

Hindi na kailangang maghanap ng mga volunteer at staff sa bawat board para mahanap ang kanilang trabaho. Ipinapakita ng listahang **My Cards** sa pahinang **My Work** ang bawat card na naitalaga sa kasalukuyang user sa lahat ng workflow. Para makarating doon, i-click ang **My Cards** sa itaas ng pahinang Workflows, o buksan ang **Serving > My Work** sa Jump menu. Ang pag-click sa isang card ay nagbubukas ng detail panel nito mismo sa pahinang My Work, kung saan maaari mong gawin ang card o alisin ito nang hindi umaalis sa pahina. Kung makakatingin ka ng workflow, mayroon ding link na **Open workflow board** ang panel papunta sa board kung saan kabilang ang card.

## Mga Report {#reports}

Buksan ang isang workflow at i-click ang **Reports** para makita ang analytics nito:

- **Overdue** -- ang bilang ng mga card na lampas na sa due date.
- **Cards per Step** -- ilang card ang kasalukuyang nasa bawat hakbang, ipinapakita bilang column chart.
- **Completed (30 days)** -- throughput sa nakaraang 30 araw, ipinapakita bilang line chart.

Gamitin ang mga ito para matukoy ang mga bottleneck -- halimbawa, isang hakbang kung saan nagtatambak ang mga card at hindi kailanman sumusulong.

## Mga Kaugnay na Artikulo {#related-articles}

- [Tasks](./tasks.md) -- ang mga indibidwal na action item kung saan nakabatay ang mga workflow card
- [Forms](../forms/index.md) -- gumawa ng mga form na maaaring mag-trigger ng mga workflow
- [Groups](../groups/index.md) -- ang mga grupong maaaring paglagyan ng mga tao ng aksyong "Add to group"
- [Service Plans](./plans.md) -- pumili ng confirmation workflow para sa mga serving request ng isang plan
- [Roles & Permissions](../settings/roles-permissions.md) -- kontrolin kung sino ang maaaring tumingin, mag-edit, at mamahala ng mga workflow
