---
title: "Mga Workflow"
description: "Gumawa ng Kanban-style na board sa B1 Admin para gabayan ang tao sa follow-up na hakbang, gamit ang awtomatikong email, text, at trigger na nagdadagdag ng tao."
---

# Mga Workflow

<div class="article-intro">

Inililipat ng mga workflow ang mga tao sa isang serye ng mga hakbang sa isang visual na board. Bawat tao ay nagiging card na naglalakbay mula sa isang hakbang papunta sa susunod -- mula sa follow-up ng first-time na bisita, hanggang sa proseso ng membership, hanggang sa pasasalamat sa unang beses na nagbigay, at anumang iba pang sitwasyong kailangan mong subaybayan ang maraming tao sa parehong mga yugto. Ang isang hakbang ay maaaring humiling sa boluntaryo na gumawa ng isang bagay (tumawag, makipag-usap) **at** magpatakbo ng mga awtomatikong aksyon nang mag-isa -- magpadala ng email o text, maghintay ng ilang araw, magdagdag ng tao sa grupo -- kaya kayang asikasuhin ng Workflows ang kapwa follow-up ng tao at ang mga gawaing nakapalibot dito. Pinalalawak ng Workflows ang [Tasks](./tasks.md) bilang drag-and-drop na Kanban board para walang maiwan o mapabayaan.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Siguraduhing umiiral sa B1 Admin ang mga taong gusto mong subaybayan
- Pamilyarisin ang sarili mo sa paraan ng paggana ng [Tasks](./tasks.md), dahil bawat card sa board ay isang task
- Para gamitin ang aksyong **Send email**, gawin muna ang mga email template na gusto mong ipadala (pinamamahalaan sa ilalim ng **Settings → Email Templates**)
- Para gamitin ang aksyong **Send text**, ikonekta muna ang isang [texting provider](../settings/church-settings.md#texting)
- Kakailanganin mo ang angkop na permiso sa Tasks. Ang pagtingin, pag-edit ng card, at pamamahala ng mga workflow ay magkakahiwalay na antas ng permiso (tingnan ang [Roles & Permissions](../settings/roles-permissions.md))

</div>

## Pagtingin sa Mga Workflow

Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas ng B1 Admin), palawakin ang **Serving**, at i-click ang **Workflows**. Nakalista ang mga workflow mo sa isang table na nagpapakita ng **Category** at **Status** ng bawat isa (**Active** o **Inactive**). Kung gumagamit ka ng mga kategorya, sinasala ng mga tab sa itaas ng listahan ang mga ito ayon sa kategorya. I-click ang alinmang workflow para buksan ang board nito.

## Paggawa ng Workflow

1. Sa pahinang Workflows, i-click ang **Add Workflow**.
2. Piliin kung paano magsisimula:
   - **Blank workflow** -- magsimula sa wala at buuin ang sarili mong mga hakbang.
   - **From a template** -- magsimula sa isang handa nang hanay ng mga hakbang na maaari mong i-edit. Kabilang sa mga built-in na template ang:
     - **New Visitor Follow-up** -- Magpadala ng welcome email → Personal na tawag sa telepono → Anyayahan sa susunod na hakbang → Connected
     - **Membership Class** -- Ipahayag ang interes → Magparehistro sa klase → Dumalo sa klase → Kumpletuhin ang membership
     - **First-time Giver Thank-you** -- Magpadala ng sulat ng pasasalamat → Ibahagi ang epekto ng giving → Stewarded
     - **Serving Assignment Confirmation** -- Humiling at maghintay ng tugon → Tawagan ang boluntaryo tungkol sa hindi nasagot na request (tingnan ang [Serving Assignment Confirmations](#serving-assignment-confirmations))

   Maaaring tumagal nang sandali ang pagbuo ng mga hakbang ng template. Habang ginagawa ito, ang butones na **Add Workflow** ay nagbabasang **Creating...** at hindi na ito maaaring i-click muli, para hindi ka magkaroon ng duplicate. Kung may mali, ipapakita ng pahina ang *"The workflow could not be created. Please try again."*
3. Bigyan ng **Name** ang workflow.
4. Opsyonal na magtalaga ng **Category** para pagsama-samahin ang mga kaugnay na workflow. Maaari kang gumawa ng bagong kategorya mismo mula sa dropdown.
   Para sa blank workflow, pipiliin mo rin ang **Workflow purpose** nito: **People follow-up** (ang karaniwang uri) o **Serving assignment confirmation**. Hindi na mababago ang layunin pagkatapos gawin ang workflow.
5. Iwanang **Active** ang workflow para maidagdag doon ang mga tao, o itakda ito sa **Inactive** para itago ito sa mga listahan ng add-to-workflow.
6. I-click ang **Save**.

:::tip
Gamitin ang butones na **Duplicate** sa listahan ng Workflows para kopyahin ang umiiral na workflow -- kasama ang mga hakbang, awtomatikong aksyon, at routing nito -- bilang panimulang punto ng bago.
:::

## Pagbuo ng Board Gamit ang Mga Hakbang

Binubuo ang bawat board ng workflow ng mga **hakbang**, na ipinapakita bilang mga column mula kaliwa pakanan. Buksan ang isang workflow at gamitin ang **Add Step** para gawin ang bawat yugto ng iyong proseso.

Kapag nagdagdag o nag-edit ka ng hakbang, maaari mong i-configure ang:

- **Step Name** -- ang heading ng column (halimbawa, "Welcome Call" o "Awaiting Registration").
- **Due in (days)** -- awtomatikong nagtatakda ng due date kapag pumasok ang card sa hakbang na ito. Ang mga card na lampas na sa due date ay minamarkahang **Overdue**.
- **Default assignee** -- ang taong o grupong awtomatikong itinatalaga sa mga bagong card sa hakbang na ito. Kapag ang default assignee ay isang tao, makakatanggap siya ng notification na may itinalagang card sa kanya.
- **Automated actions** -- mga bagay na kusang ginagawa ng sistema kapag dumating ang card (tingnan sa ibaba).
- **Routing** -- saan pupunta ang card kapag umalis ito sa hakbang (tingnan ang [Routing](#routing-cards-with-outcomes-and-conditions)).

I-drag ang mga column ng hakbang sa pagkakasunod-sunod na tumutugma sa iyong proseso. Tinutukoy din ng pagkakasunod-sunod ang default na landas na tinatahak ng card kapag walang ibang routing na nalalapat.

:::info
I-save muna ang bagong hakbang. Ikinakabit sa hakbang ang mga awtomatikong aksyon at routing, kaya ina-unlock ng editor ang mga seksyong iyon kapag umiiral na ang hakbang.
:::

## Mga Awtomatikong Aksyon

Maaaring magdala ang bawat hakbang ng listahan ng **automated actions** na kusang tumatakbo sa sandaling **pumasok** ang card sa hakbang -- bago pa may humawak nito. Ito ang paraan kung paano ang isang hakbang ay kapwa nag-uudyok sa boluntaryo *at* inaasikaso ang nakagawiang gawaing nakapalibot sa follow-up.

Sa step editor, buksan ang **Automated actions**, i-click ang **Add Action**, pumili ng uri, at punan ang mga setting nito. Magdagdag ng kasing dami ng kailangan mo; tumatakbo ang mga ito **mula itaas pababa, ayon sa pagkakasunod-sunod**. I-click ang **Save** sa hakbang para i-save ang hakbang at lahat ng aksyon nito nang magkakasama. Ang pag-alis ng aksyon gamit ang trash icon nito ay agad na nagkakabisa.

| Aksyon | Ano ang ginagawa nito |
|---|---|
| **Send email** | Nagpapadala ng email template na pipiliin mo sa tao. Maaari mong i-override ang subject line. |
| **Send text** | Nagte-text sa tao ng mensaheng isusulat mo, sa pamamagitan ng [texting provider](../settings/church-settings.md#texting) ng iyong simbahan. |
| **Wait** | Pinapahinto ang card nang ilang araw bago magpatuloy (tingnan sa ibaba). |
| **Add to group** | Idinadagdag ang tao sa isang [grupo](../groups/index.md) na pipiliin mo. |
| **Remove from group** | Inaalis ang tao sa isang grupong pipiliin mo. |
| **Record Attendance** | Minamarkahang present ang tao sa service time ng isang grupo na kasalukuyang nagaganap (tingnan sa ibaba). |
| **Add to workflow** | Sinisimulan ang tao sa ibang workflow -- kapaki-pakinabang para sa paglilipat sa pagitan ng mga proseso. |
| **Add note** | Nagtatala ng note sa kasaysayan ng card. |
| **Set field** | Ina-update ang isang field sa record ng tao: Membership Status, Marital Status, Gender, City, State, o Zip. |
| **Webhook** | Ipinapadala ang mga detalye ng card sa isang external na web address (URL) na ibibigay mo, para makakonekta sa ibang sistema. |
| **Create task** | Gumagawa ng [task](./tasks.md) na may pamagat at paglalarawang ilalagay mo, itinalaga sa sinumang piliin mo. |
| **Notify Person** | Nagpapadala sa isang staff member o boluntaryong pipiliin mo ng email at B1 notification tungkol sa card (tingnan sa ibaba). |

Pagkatapos matapos ang lahat ng aksyon ng isang hakbang, **nananatili ang card sa hakbang na iyon** para mahawakan ito ng isang tao -- maliban kung may awtomatikong route ang hakbang na naglilipat dito pasulong (tingnan ang [Fully automated steps](#fully-automated-steps)).

:::info
Tumatakbo lang ang mga awtomatikong aksyon kapag dumaan ang card sa normal na daloy -- kapag unang idinagdag ito, kapag dinala ito ng outcome o awtomatikong route, o pagkatapos matapos ang isang Wait. **Hindi** sila muling tumatakbo kapag manual na idinrag ng staff member ang card papunta sa hakbang o ibinalik ito, kaya hindi makakatanggap ang isang tao ng parehong email nang dalawang beses.
:::

### Pagpapadala ng email

Piliin ang **Send email**, pumili ng isa sa iyong mga email template, at opsyonal na mag-type ng sariling subject. Kapag pumasok ang card sa hakbang, awtomatikong natatanggap ng tao ang email na iyon. (Kung walang nakatalang email address ang tao, nilalaktawan lang ng hakbang ang aksyong ito.) Pinupunan ng [mga merge field](../settings/email-templates.md#merge-fields) sa template, gaya ng `{{firstName}}`, ng sariling detalye ng tao.

Kapag naipadala na ang email, itatala ng kasaysayan ng card ang **Email sent**. Kung hindi ito maipadala -- halimbawa, dahil hindi pa naaaprubahan ang email ng iyong simbahan o naabot na ang araw-araw na limitasyon -- walang idaragdag na entry na "Email sent".

:::info
Lalabas lang ang mga email ng workflow pagkatapos maaprubahan ang iyong simbahan sa pagpapadala ng group email, at binibilang ang mga ito sa araw-araw na limitasyon ng email ng iyong simbahan. Tingnan ang [Turning On Group Email for Your Church](../groups/group-members.md#turning-on-group-email-for-your-church). Binabalaan ka ng aksyong **Send email** sa step editor kapag hindi maipapadala ang mga email na ito: *"Your church's email hasn't been approved yet..."* kung nakabinbin pa ang approval, o *"Your church's email is paused..."* kung may bumalik na mensaheng bounce o naiulat na spam kamakailan.
:::

### Pag-record ng attendance

Piliin ang **Record Attendance** at i-click ang **Pick group** para piliin ang grupong dapat itala ang attendance. Kapag tumakbo ang aksyon, minamarkahang present ang tao para sa service time ng grupong iyon na kasalukuyang nagaganap -- katulad ng kung nag-check in siya. Kapaki-pakinabang ito kasama ng trigger na nagdaragdag ng mga tao sa workflow habang dumarating sila, para mabilang sila nang walang hiwalay na check-in.

- Sinusukat ang attendance sa sandaling **nagawa** ang card, kaya ang **Wait** na nasa unahan ng workflow ay hindi ito itutulak lampas sa serbisyo.
- Tanging mga service time na may araw at start time ang binibilang. Kung walang service time ng grupo na kasalukuyang nagaganap sa sandaling iyon, walang maitatala at ilalagay ng kasaysayan ng card ang **No scheduled service in progress — attendance not recorded**.
- Kapag naitala na ang attendance, ipinapakita ng kasaysayan ng card ang **Attendance recorded** kasunod ang pangalan ng grupo. Ang pagpapatakbo muli ng aksyon para sa parehong serbisyo ay hindi magbibilang sa tao nang dalawang beses.

### Pag-notify sa isang tao

Piliin ang **Notify Person**, i-click ang **Pick person**, at opsyonal na mag-type ng **Message**. Kapag pumasok ang card sa hakbang, natatanggap ng taong iyon ang isang email at B1 notification na may pangalan ng taong nasa card, ang mga pangalan ng workflow at hakbang, ang iyong mensahe, at link para buksan ang card. Gamitin ito para bigyan ng abiso ang isang staff member o lider ng ministry -- halimbawa, *"Notify the pastor when someone reaches the Membership Interview step."* Itinatala ng kasaysayan ng card ang **Notified** kasunod ang pangalan ng tao.

### Pagpapadala ng text {#sending-a-text}

Piliin ang **Send Text** at i-type ang **Text message** (hanggang 1,600 character). Kapag pumasok ang card sa hakbang, natatanggap ng tao ang text na iyon sa kanyang mobile phone. Para i-personalize ang mensahe, i-click ang isang chip sa ilalim ng message box -- **First Name**, **Last Name**, **Display Name**, o **Church Name** -- para ilagay ang `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, o `{{churchName}}` sa kinalalagyan ng cursor mo. Pinupunan ang bawat isa ng detalye ng tao kapag naipadala na ang text.

- Kung walang nakatalang mobile phone ang tao, walang text na ipapadala at itatala ng kasaysayan ng card ang **Text skipped: no mobile phone**.
- Kung nag-opt out ang tao, walang text na ipapadala at itatala ng kasaysayan ng card ang **Text skipped: opted out**.
- Kapag naipadala na ang text, itatala ng kasaysayan ng card ang **Text sent**. Kung mabigo ang pagpapadala -- halimbawa, dahil walang nakakonektang texting provider o naubusan ng texting credit ang iyong simbahan -- itatala ang pagkabigo sa kasaysayan ng card at tatakbo pa rin ang natitirang aksyon ng hakbang.

:::warning
Ipinapadala ang mga text sa pamamagitan ng sarili mong [texting provider](../settings/church-settings.md#texting) ng iyong simbahan. Kung walang nakakonektang provider, babalaan ka ng action editor ng *"No texting provider is set up"* at hindi maipapadala ang mga text.
:::

### Paghihintay ng ilang araw (drip sequence)

Pinapahinto ng aksyong **Wait** ang card nang bilang ng araw na itinakda mo. Habang naghihintay, ipinapakita ang card bilang **Snoozed**. Sinusuri ng B1 ang mga natapos nang paghihintay kada 30 minuto, kaya bumabalik sa daloy ang card sa loob ng humigit-kumulang kalahating oras pagkatapos matapos ang paghihintay. Kapag natapos na ang paghihintay:

1. Tumatakbo ang anumang **natitirang aksyon sa parehong hakbang** -- para makabuo ka ng drip gaya ng **Send email → Wait 3 days → Send a reminder email**.
2. Pagkatapos, kung may awtomatikong route ang hakbang, lilipat na pasulong ang card; kung wala, mananatili ito sa hakbang para kunin ng isang tao.

:::tip
Ang **Wait** sa pinakasimula ng isang hakbang ay simpleng paraan para "pigilan" ang card bago ito ipakita sa isang boluntaryo -- halimbawa, *Wait 7 days, then a coach reaches out*.
:::

## Pagdaragdag ng Mga Tao Bilang Card

May ilang paraan para mailagay ang mga tao sa isang board:

- **Mula sa board** -- I-click ang **Add Card** sa ilalim ng column ng hakbang at pumili ng tao. Maaari ka ring pumili ng grupo, at bawat miyembro ng grupong iyon ay idaragdag bilang card.
- **Mula sa record ng tao** -- Gamitin ang **Add to Workflow** sa pahina ng isang tao para ilagay sila sa isang workflow.
- **Mula sa People search** -- Pumili ng maraming tao at gamitin ang bulk na aksyong **Add to Workflow** para idagdag silang lahat nang sabay.
- **Awtomatiko gamit ang trigger** -- Magdagdag ng mga tao kapag may nangyari, gaya ng form submission o unang regalo (tingnan ang [Triggers](#triggers) sa ibaba).

Ang pagdaragdag ng tao nang manual, o sa pamamagitan ng aksyon ng hakbang na **Add to workflow**, ay hindi kailanman nagbibigay sa kanya ng pangalawang bukas na card sa parehong workflow. Kung mayroon na siyang bukas na card, nilalaktawan siya (sa bulk add, ang mga taong walang card lang ang makakakuha ng bagong card). Kapag sarado na ang kanyang card, maaari mo na siyang idagdag muli. Sumusunod ang mga trigger sa sarili nilang setting na **Only once per person** sa halip.

## Pagtatrabaho sa Board {#working-the-board}

Buksan ang isang workflow para makita ang board nito. Ipinapakita ng bawat card ang pangalan ng tao, kung kanino ito itinalaga, at isang due-date o status chip (**Overdue** o **Snoozed**). Nagpapakita rin ang column ng hakbang ng maliliit na badge para sa anumang awtomatikong aksyong tumatakbo rito at mga annotation para sa routing nito, na nagbibigay ng mabilisang mapa kung paano dumadaloy ang mga card.

- **Ilipat ang card** -- I-drag ang card mula sa isang column papunta sa susunod habang umuusad ang tao.
- **Buksan ang card** -- I-double-click ang card (o i-click ito) para buksan ang detail drawer nito, kung saan maaari mong baguhin ang hakbang, muling italaga, magdagdag ng note, at suriin ang mga nangyari na.

Mula sa card drawer, maaari mo:

- **Assign** ang card sa ibang tao o grupo.
- **Snooze** ang card nang 1 araw, 3 araw, o 1 linggo para pansamantalang itago ang due date nito.
- **Send Back** sa nakaraang hakbang o **Skip** sa susunod na hakbang.
- **Pin assignment** -- panatilihin ang parehong may-ari ng card kahit lumilipat ito sa pagitan ng mga hakbang. Bilang default, kapag inilipat ang card sa bagong hakbang, muling itinatalaga ito sa default assignee ng hakbang na iyon; pinapanatili ng pin ang kasalukuyang tao bilang responsable mula simula hanggang dulo.
- **Complete** ang card para tapusin ito, o pumili ng butones na **Outcome** kung may naka-configure na outcome ang hakbang (tingnan ang [Routing](#routing-cards-with-outcomes-and-conditions)).
- **Remove card** -- alisin ang card sa board nang hindi ito tinatapos, halimbawa kapag may naidagdag na tao nang mali. Pagkatapos mong kumpirmahin, isinasara ang card at tinatanggal sa listahan ng lahat. Walang outcome, route, o aksyon ng hakbang na tatakbo, at napapanatili ang kasaysayan nito na may entry na **Removed**. Para sa card ng [serving assignment confirmation](#serving-assignment-confirmations), ang pag-alis dito ay isinasara ang request sa parehong paraan.
- **Magdagdag ng note** at tingnan ang **Activity** ng card -- isang log ng mga awtomatikong aksyong tumakbo na (mga email na naipadala, paghihintay, atbp.), na may petsa at oras ng bawat isa.

Para sa card tungkol sa isang tao, ipinapakita rin ng drawer ang mobile phone at email ng taong iyon bilang mga link na maaari mong i-tap para tumawag o mag-email, pati ang link na **View profile** kung may permiso kang tingnan ang mga tao. Nakikita ng taong itinalaga sa card ang telepono at email kahit walang access sa People.

Ang mga tala ay nase-save kasama ng card. Sinumang makakabukas ng card -- kabilang ang taong o grupong itinalaga rito -- ay makakabasa ng mga note at makakapagdagdag ng sarili nila. Ang mga hindi makakabukas ng card ay hindi makikita ang mga note nito.

### Bulk actions

Pumili ng mga checkbox sa maraming card para kumilos sa mga ito nang sabay. Para pumili ng bawat card sa isang hakbang nang sabay, lagyan ng check ang kahong **Select all** sa header ng column ng hakbang na iyon; lagyan ulit ng check para alisin ang pagkakapili. Lumalabas ang isang toolbar na nagpapahintulot sa iyong **Complete**, **Snooze**, **Assign** (muling italaga), o **Move to…** ang ibang hakbang para sa lahat ng napiling card nang sabay.

## Pag-route ng Mga Card Gamit ang Outcome at Kondisyon {#routing-cards-with-outcomes-and-conditions}

Kinokontrol ng routing kung saan pupunta ang card kapag umalis ito sa isang hakbang. Buksan ang editor ng hakbang para i-configure ang dalawang uri ng routing.

### Mga outcome button

Ang mga outcome ay mga butones na ipinapakita sa card drawer kapag tinatapos mo ang card sa hakbang na iyon. Sa halip na iisang butones na **Complete**, maaari kang mag-alok ng mga pagpipiliang gaya ng "Joined a Group" o "Not Interested." Ang bawat outcome ay maaaring:

- Ipadala ang card sa **ibang hakbang** sa workflow na ito,
- **Ilipat ang card** sa ibang workflow nang ganap, o
- **Isara** ang card.

Dahil dito, ang iisang desisyon ay maaaring magsanga sa tao papunta sa iba't ibang landas.

### Awtomatikong routing (may kondisyon)

Inililipat ng mga awtomatikong route ang card pasulong **sa sandaling pumasok ito sa hakbang** (at pagkatapos matapos ang mga awtomatikong aksyon nito), nang walang nag-click, kung tumutugma ang tao sa isang hanay ng kondisyon. Magdagdag ng route, piliin ang target na hakbang, at tukuyin ang isa o higit pang **kondisyon** (halimbawa, campus, edad, o membership status ng tao). Maaaring tumugma nang eksakto ang mga text field, o gamit ang **contains**, **starts with**, o **ends with**. Ang route na walang kondisyon ay tumutugma sa lahat.

Maaaring ikumpara ng mga date condition (Today's Date, Birth Date, o Anniversary) ang buong petsa o bahagi lang nito -- ang araw ng linggo, ang **Day of Month**, ang **Month**, o mga taong lumipas. Para sa Birth Date o Anniversary ng tao, nag-aalok ang **Day of Month** ng kaugnay na opsyong **Today**, kaya ang kondisyong gaya ng *Birth Date · Day of Month = Today* ay tumutugma sa mga taong ang kaarawan ay tumapat sa araw ng buwan ngayon. Nag-aalok ang **Month** ng **Previous Month**, **Current Month**, at **Next Month**. Kinakalkula ang mga kaugnay na halagang gaya nito gamit ang time zone ng iyong simbahan, kaya tumutugma ang mga ito sa araw ng kalendaryo ng iyong simbahan at hindi sa oras ng server.

Ang grupo ng mga kondisyon na **Giving** ay may **Lapsed regular giver**, na naghahanap ng mga taong dating regular na nagbibigay pero huminto na. Magtakda ng tatlong numero: *Gave in at least* **3** *of the last* **12** *weeks, then nothing in the last* **3** *weeks* (ito ang mga default). Binibilang ang mga linggo pabalik mula ngayon sa time zone ng iyong simbahan, at hindi binibilang ang ni-refund na regalo. Pinakamakabuluhan ito sa [schedule trigger](#schedule-triggers) -- halimbawa, lingguhang patakaran na nagdadagdag ng mga lapsed giver sa pastoral care follow-up board. Tanging mga petsa ng regalo ang tinitingnan ng kondisyon, hindi kailanman ang mga halaga, at hindi kailanman ipinapakita ng mga card at alerto ang mga halaga. Dahil inilalantad nito kung sino ang tumigil sa pagbibigay, tanging mga taong makakatingin ng donasyon ang nakakakita ng opsyong ito at nakakapagdagdag, nakakapagbago, o nakakapag-alis nito.

Kung hindi matiyak ang mga kondisyon ng isang route sa anumang dahilan, ituturing na hindi tumutugma ang route na iyon. Mananatili ang card sa hakbang (o susunod sa ibang route na tumutugma) sa halip na ma-stuck.

:::info
Sa board, ang bawat column ng hakbang ay nagpapakita ng maliliit na annotation na naglalarawan ng routing nito -- halimbawa, label ng outcome o "if matches" kasunod ng arrow papunta sa target na hakbang o workflow.
:::

## Mga Ganap na Awtomatikong Hakbang {#fully-automated-steps}

Maaari mong gawing tumakbo nang ganap nang mag-isa ang isang hakbang, nang walang gumagawa nito. Bigyan ang hakbang ng mga **automated action** nito at magdagdag ng **automatic route** (walang kondisyon) na tumuturo sa susunod na hakbang. Kapag pumasok ang card, tatakbo ang mga aksyon, at pagkatapos ay agad itong isusulong ng route -- dumadaan lang ang card nang diretso.

:::tip
Pagsamahin ito sa **Wait**: *Send welcome email → Wait 3 days → automatically advance to the "Personal call" step.* Inaasikaso para sa iyo ang email at ang timing, at makikita lang ng boluntaryo ang card kapag oras na para sa personal na pakikipag-ugnayan.
:::

## Mga Trigger {#triggers}

Awtomatikong nagdadagdag ng tao sa workflow ang mga trigger kapag may nangyari, kaya hindi mo na kailangang magdagdag ng card nang manual. Sa isang workflow board, i-click ang tab na **Triggers**, pagkatapos **Add Trigger**. May dalawang uri:

### Event trigger

Tumatakbo sa sandaling magbago ang isang record sa B1. Piliin ang event, at opsyonal na magdagdag ng **kondisyon** para ang mga tugmang tao lang ang maidagdag:

- **Person · Created / Updated** -- hal. idagdag ang sinumang nagiging *Visitor* o *Guest* ang status (ang status na ibinibigay sa mga nagpaparehistro ng sarili).
- **Donation · Created** -- hal. idagdag ang una o malaking regalo sa workflow ng pasasalamat (itugma sa halaga, fund, o paraan).
- **Group · Member Joined** / **Group · Created**.
- **Form · Submitted** -- idagdag ang sinumang magsumite ng piniling form (mainam para sa card na "I'm New" o "Connect").

### Schedule trigger {#schedule-triggers}

Tumatakbo nang paulit-ulit -- araw-araw, lingguhan, buwanan, o taunan -- ayon sa isang hanay ng kondisyon. Gamitin ito para sa outreach na nakabatay sa oras, gaya ng *lahat ng may kaarawan ngayon* (Birth Date · Day of Month = **Today**, kasama ang buwang tumutugma sa **Current Month**) o *buwanang* check-in. Kahit walang **Only once per person**, hindi idaragdag muli ng schedule trigger ang parehong tao sa loob ng isang repeat period (isang araw, linggo, buwan, o taon, depende sa dalas ng pagtakbo nito).

Para sa anumang trigger, maaari mo ring itakda ang:

- Ang **Starting step** na mapupuntahan ng bagong card (default ay ang unang hakbang).
- **Only once per person** -- para hindi maidagdag ang parehong tao sa workflow nang dalawang beses ng trigger. Kapag naka-on ito, nilalaktawan ang sinumang mayroon nang card sa workflow na ito.
  - **Add again after their card is closed** -- lumalabas kapag naka-on ang **Only once per person**. Lagyan ito ng check para payagan ang trigger na idagdag muli ang isang tao kapag nasara na ang naunang card niya sa workflow na ito. Hindi pa rin magkakaroon ng dalawang bukas na card ang isang tao sa workflow nang sabay. Gamitin ito para sa mga bagay na maaaring mangyari nang higit sa isang beses, gaya ng bumabalik na bisita o taunang proseso.
- **Active** -- i-on o i-off ang trigger nang hindi ito binubura.

:::tip
Ipares ang trigger na **Form · Submitted** sa template na **New Visitor Follow-up** para gawing awtomatikong follow-up pipeline ang iyong "Connect Card" o "I'm New" form.
:::

## Mga Serving Assignment Confirmation {#serving-assignment-confirmations}

Isang espesyal na uri ng workflow ang maaaring mag-follow up sa [mga serving request](./plans.md#assigning-team-members) hanggang tanggapin o tanggihan ng bawat boluntaryo. Sa halip na mga tao, bawat card sa board na ito ay sumusubaybay sa **isang takda** -- isang tao sa isang posisyon sa isang plan. Ang dalawang role o dalawang serbisyo para sa iisang tao ay may hiwalay na card. Opsyonal ito: walang magbabago para sa isang plan hangga't hindi ka pumipili ng confirmation workflow sa mga setting nito.

### Pag-set up nito

1. Sa pahinang Workflows, i-click ang **Add Workflow** at piliin ang template na **Serving Assignment Confirmation**. (O magsimula sa **Blank workflow** at itakda ang **Workflow purpose** nito sa **Serving assignment confirmation**.) Ang paggawa mula sa template ay nangangailangan ng permiso sa pagpapadala ng text, dahil may kasamang text step ito.
2. Suriin ang mga hakbang. Nagsisimula ang template sa:
   - **Request and wait for response** -- nagpapadala ng serving request sa pamamagitan ng email at text, naghihintay ng 2 araw, nagpapadala ng reminder email, naghihintay ng 1 araw pa, pagkatapos awtomatikong ilipat ang card.
   - **Call volunteer about unanswered request** -- hakbang para sa isang tao na tawagan ang boluntaryo, due sa loob ng 1 araw. Magtakda ng **Default assignee** sa hakbang na ito. Kung wala itong nakatakda, mapupunta ang card sa lider ng ministry, o sa team ng ministry kung wala ito.
3. I-edit ang mga paghihintay, mensahe, at hakbang para bagay sa iyong simbahan.
4. Buksan ang [mga setting ng plan](./plans.md#plan-settings) at piliin ang workflow na ito sa ilalim ng **Confirmation workflow**.

Gumagamit ang mga workflow na ito ng aksyong **Send serving request** sa halip na **Send email** at **Send text**. Piliin ang **Email** o **Text message** at, opsyonal, magsulat ng **Request message**. Palaging kasama sa request ang tungkulin, plan, petsa ng serbisyo, at link para tumugon; maaari mong gamitin ang `{{planName}}`, `{{positionName}}`, at `{{serviceDate}}` sa iyong mensahe. Iwanang walang laman ang mensahe para gamitin ang default na request. Nalalapat ang mga notification preference ng mga boluntaryo, opt-in sa text, ang texting provider ng iyong simbahan, at ang approval ng email ng iyong simbahan, at anumang nilaktawan o hinadlangang pagtatangka ay itatala sa card. Hindi available sa mga board na ito ang **Send email**, **Send text**, at **Add to workflow**.

Ipinapaliwanag ng tab na **Triggers** sa isang confirmation workflow kung paano sinisimulan ang mga card sa halip na mag-alok ng mga trigger, at hindi lumalabas ang mga workflow na ito sa listahan ng **Add to Workflow** para sa mga tao.

### Paano sinisimulan at isinasara ang mga card

- Nagsisimula ang mga card kapag **ni-Notify** mo ang mga boluntaryo sa isang nai-publish na plan (tingnan ang [Notifying Volunteers](./plan-validation.md#notifying-volunteers)). Bawat bago at hindi pa nasagot na takda ay nakakakuha ng isang card. Ang pag-save, pag-publish, pagkopya, o awtomatikong pagpuno sa isang plan ay hindi nakikipag-ugnayan sa sinuman nang mag-isa, at ang mga plan na penciled in ay walang ipinapadalang anuman.
- Nakakatanggap pa rin ang mga boluntaryo ng karaniwang alerto sa loob ng app. Ang follow-up sa email at text ay nagmumula sa workflow.
- Kapag **tinanggap o tinanggihan** ng boluntaryo, awtomatikong nagsasara ang kanyang card, kasama ang anumang follow-up task na nakakabit dito.
- Ipinapakita ng card drawer ang posisyon, petsa ng serbisyo, at link sa plan. Sa halip na **Complete**, ang butones ay nagbabasang **Record follow-up done**. Ang pag-click dito ay nagtatala na may nag-follow up, pero nananatiling bukas at nakatalaga ang card (ipinapakitang **Awaiting response**) hanggang tumugon ang boluntaryo o lumipas ang response deadline.
- Ang response deadline ay ang pagtatapos ng huling service time na pinaglilingkuran ng team ng posisyon. Kung walang tugmang oras ang plan, ito ang pagtatapos ng araw ng serbisyo. Kung walang sumagot pagsapit ng panahong iyon, magsasara ang card na may **Response deadline passed** at may task na **Review unanswered serving request** na mapupunta sa kasalukuyang may-ari ng card o sa lider ng ministry para may magpasya kung paano sasakupin ang puwesto. Nananatiling **Unconfirmed** ang takda.
- Ang pag-alis ng takda, pagpapalit ng tao, posisyon, o petsa ng plan nito, pagbabalik ng plan sa penciled in, o paglipat ng plan sa ibang confirmation workflow ay magsasara ng card. Hindi kailanman mabubuksang muli ang isang saradong card ng isa pang **Notify**; magdagdag ng bagong takda para magpadala ng bagong request.

:::info
Para sa mga request na ipinadala sa pamamagitan ng confirmation workflow, ang [mga paalala sa boluntaryo](./plans.md#volunteer-reminders) ay napupunta lang sa mga boluntaryong **nakatanggap** na, para hindi makatanggap ng paalala ang mga naghihintay pang tumugon bukod sa mga follow-up ng workflow.
:::

## Aking Mga Card

Hindi kailangang maghukay sa bawat board ng mga boluntaryo at staff para mahanap ang kanilang gawain. Ipinapakita ng listahang **My Cards** sa pahinang **My Work** ang bawat card na nakatalaga sa kasalukuyang user sa lahat ng workflow. Para mapuntahan ito, i-click ang **My Cards** sa itaas ng pahinang Workflows, o buksan ang **Serving > My Work** sa Jump menu. Ang pag-click sa card ay magbubukas ng detail panel nito mismo sa pahinang My Work, kung saan maaari mong asikasuhin o alisin ang card nang hindi umaalis sa pahina. Kung makakatingin ka ng mga workflow, mayroon ding link na **Open workflow board** ang panel papunta sa board kung saan kabilang ang card.

## Mga Ulat

Buksan ang isang workflow at i-click ang **Reports** para makita ang analytics ng workflow na iyon:

- **Overdue** -- ang bilang ng mga card na lampas na sa due date.
- **Cards per Step** -- ilang card ang kasalukuyang nasa bawat hakbang, ipinapakita bilang column chart.
- **Completed (30 days)** -- throughput sa nakaraang 30 araw, ipinapakita bilang line chart.

Gamitin ang mga ito para matukoy ang mga bottleneck -- halimbawa, isang hakbang kung saan nagtatambak ang mga card at hindi kailanman umuusad.

## Mga Kaugnay na Artikulo

- [Tasks](./tasks.md) -- ang mga indibidwal na action item kung saan nakabatay ang mga workflow card
- [Forms](../forms/index.md) -- gumawa ng mga form na maaaring mag-trigger ng mga workflow
- [Groups](../groups/index.md) -- ang mga grupong mapaglalagyan ng mga tao ng aksyong "Add to group"
- [Service Plans](./plans.md) -- pumili ng confirmation workflow para sa mga serving request ng isang plan
- [Roles & Permissions](../settings/roles-permissions.md) -- kontrolin kung sino ang makakatingin, makakapag-edit, at makakapamahala ng mga workflow
