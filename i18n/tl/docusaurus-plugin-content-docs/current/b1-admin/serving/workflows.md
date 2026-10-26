---
title: "Workflows"
---

# Workflows

<div class="article-intro">

Ginagabayan ng Workflows ang mga tao sa sunud-sunod na hakbang sa isang visual board. Bawat tao ay nagiging card na lumilipat mula sa isang hakbang patungo sa susunod -- mula sa follow-up ng first-time guest, sa proseso ng membership, hanggang sa pasasalamat sa first-time giver, at anupaman kung saan kailangan mong subaybayan ang maraming tao sa parehong mga yugto. Maaaring humiling ang isang hakbang sa isang volunteer na gumawa ng isang bagay (tumawag, makipag-usap) **at** magpatakbo ng mga awtomatikong aksyon sa sarili nito -- magpadala ng email o text, maghintay ng ilang araw, idagdag ang tao sa isang group -- kaya hinahawakan ng Workflows ang kapwa follow-up ng tao at ang mga nakagawiang gawain sa paligid nito. Pinapalawak ng Workflows ang [Tasks](./tasks.md) tungo sa isang drag-and-drop na Kanban board para walang maiwan at walang mapabayaan.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Siguraduhing umiiral sa B1 Admin ang mga taong gusto mong subaybayan
- Alamin muna kung paano gumagana ang [Tasks](./tasks.md), dahil ang bawat card sa board ay isang task
- Para magamit ang aksyong **Send email**, gumawa muna ng mga email template na gusto mong ipadala (pinamamahalaan sa ilalim ng **Settings → Email Templates**)
- Para magamit ang aksyong **Send text**, ikonekta muna ang isang [texting provider](../settings/church-settings.md#texting)
- Kailangan mo ng angkop na Tasks permission. Magkahiwalay ang antas ng pagtingin, pag-edit ng mga card, at pamamahala ng mga workflow (tingnan ang [Roles & Permissions](../settings/roles-permissions.md))

</div>

## Pagtingin sa mga Workflow

Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas ng B1 Admin), palawakin ang **Serving**, at i-click ang **Workflows**. Nakalista ang mga workflow mo sa isang talahanayan na nagpapakita ng bawat **Category** at **Status** (**Active** o **Inactive**). Kung gumagamit ka ng mga kategorya, makakatulong ang mga tab sa itaas ng listahan para i-filter ito ayon sa kategorya. I-click ang alinmang workflow para buksan ang board nito.

## Paggawa ng Workflow

1. Sa pahina ng Workflows, i-click ang **Add Workflow**.
2. Piliin kung paano magsisimula:
   - **Blank workflow** -- magsimula mula sa wala at buuin ang sarili mong mga hakbang.
   - **From a template** -- magsimula sa isang handang hanay ng mga hakbang na maaari mong i-edit. Kabilang sa mga built-in na template ang:
     - **New Visitor Follow-up** -- Magpadala ng welcome email → Personal na tawag sa telepono → Imbitahan sa susunod na hakbang → Connected
     - **Membership Class** -- Ipahayag ang interes → Magpatala sa klase → Dumalo sa klase → Kumpletuhin ang membership
     - **First-time Giver Thank-you** -- Magpadala ng sulat ng pasasalamat → Ibahagi ang epekto ng kaloob → Stewarded
     - **Serving Assignment Confirmation** -- Humiling at maghintay ng tugon → Tumawag sa volunteer tungkol sa hindi pa nasasagot na request (tingnan ang [Serving Assignment Confirmations](#serving-assignment-confirmations))

   Maaaring tumagal nang ilang sandali ang paggawa ng mga hakbang ng template. Habang gumagana ito, ang button na **Add Workflow** ay magbabasa ng **Creating...** at hindi na ito maki-click muli, kaya hindi ka magkakaroon ng duplicate. Kung may magkamali, ipapakita ng pahina ang *"The workflow could not be created. Please try again."*
3. Bigyan ng **Name** ang workflow.
4. Opsyonal, magtalaga ng **Category** para pagsama-samahin ang mga kaugnay na workflow. Maaari kang gumawa ng bagong kategorya mismo mula sa dropdown.
   Para sa blank na workflow, pipiliin mo rin ang **Workflow purpose**: **People follow-up** (ang karaniwang uri) o **Serving assignment confirmation**. Hindi na mababago ang layunin pagkatapos gawin ang workflow.
5. Iwanang **Active** ang workflow para maidagdag ang mga tao dito, o itakda sa **Inactive** para itago ito sa mga listahan ng add-to-workflow.
6. I-click ang **Save**.

:::tip
Gamitin ang button na **Duplicate** sa listahan ng Workflows para kopyahin ang umiiral na workflow -- kasama ang mga hakbang, awtomatikong aksyon, at routing nito -- bilang panimulang punto ng bago.
:::

## Pagbuo ng Board gamit ang mga Hakbang

Ang bawat workflow board ay binubuo ng **steps** (mga hakbang), na ipinapakita bilang mga column mula kaliwa pakanan. Magbukas ng workflow at gamitin ang **Add Step** para gawin ang bawat yugto ng iyong proseso.

Kapag nagdagdag o nag-edit ka ng hakbang, maaari mong i-configure ang:

- **Step Name** -- ang heading ng column (halimbawa, "Welcome Call" o "Awaiting Registration").
- **Due in (days)** -- awtomatikong nagtatakda ng due date kapag pumasok ang card sa hakbang na ito. Ang mga card na lampas sa due date ay minamarkahang **Overdue**.
- **Default assignee** -- ang tao o group na awtomatikong itinatalaga sa mga bagong card sa hakbang na ito. Kapag tao ang default assignee, makakatanggap sila ng notification na may card na naitalaga sa kanila.
- **Automated actions** -- mga bagay na awtomatikong ginagawa ng sistema kapag dumating ang card (tingnan sa ibaba).
- **Routing** -- kung saan pupunta ang card kapag umalis ito sa hakbang (tingnan ang [Routing](#routing-cards-with-outcomes-and-conditions)).

I-drag ang mga column ng hakbang sa pagkakasunod-sunod na tumutugma sa proseso mo. Tinutukoy din ng pagkakasunod-sunod ang default na landas na tatahakin ng card kapag walang ibang routing na nalalapat.

:::info
I-save muna ang bagong hakbang. Nakakabit ang mga awtomatikong aksyon at routing sa hakbang, kaya bubukas ang mga seksyong iyon sa editor kapag umiiral na ang hakbang.
:::

## Mga Awtomatikong Aksyon

Ang bawat hakbang ay maaaring magdala ng listahan ng **automated actions** na tumatakbo nang mag-isa sa sandaling **pumasok** ang card sa hakbang -- bago pa may humawak nito. Ganito pinapaalalahanan ng isang hakbang ang isang volunteer *at* inaasikaso ang nakagawiang gawain sa paligid ng follow-up.

Sa step editor, buksan ang **Automated actions**, i-click ang **Add Action**, pumili ng uri, at punan ang mga setting nito. Magdagdag ng kasing dami ng kailangan mo; tumatakbo ang mga ito **mula itaas pababa, sunod-sunod**. I-click ang **Save** sa hakbang para sabay na mai-save ang hakbang at lahat ng aksyon nito. Ang pag-alis ng aksyon gamit ang icon ng basurahan ay agad na nagkakabisa.

| Aksyon | Ano ang ginagawa nito |
|---|---|
| **Send email** | Nagpapadala sa tao ng email template na pipiliin mo. Maaari mong i-override ang subject line. |
| **Send text** | Nagte-text sa tao ng mensaheng isusulat mo, sa pamamagitan ng [texting provider](../settings/church-settings.md#texting) ng simbahan mo. |
| **Wait** | Pinapahinto ang card nang ilang araw bago magpatuloy (tingnan sa ibaba). |
| **Add to group** | Idinadagdag ang tao sa isang [group](../groups/index.md) na pipiliin mo. |
| **Remove from group** | Inaalis ang tao mula sa isang group na pipiliin mo. |
| **Record Attendance** | Minamarkahang present ang tao sa service time ng group na kasalukuyang nagaganap (tingnan sa ibaba). |
| **Add to workflow** | Sinisimulan ang tao sa ibang workflow -- kapaki-pakinabang para sa paglilipat sa pagitan ng mga proseso. |
| **Add note** | Nagtatala ng note sa kasaysayan ng card. |
| **Set field** | Ina-update ang isang field sa record ng tao: Membership Status, Marital Status, Gender, City, State, o Zip. |
| **Webhook** | Ipinapadala ang mga detalye ng card sa isang panlabas na web address (URL) na ibibigay mo, para kumonekta sa ibang sistema. |
| **Create task** | Gumagawa ng [task](./tasks.md) na may pamagat at paglalarawang ilalagay mo, na itinalaga sa sinumang piliin mo. |
| **Notify Person** | Nagpapadala sa staff o volunteer na pipiliin mo ng email at B1 notification tungkol sa card (tingnan sa ibaba). |

Pagkatapos matapos ang lahat ng aksyon ng hakbang, **nananatili ang card sa hakbang na iyon** para maasikaso ng isang tao -- maliban kung ang hakbang ay may awtomatikong route na naglilipat dito pasulong (tingnan ang [Fully automated steps](#fully-automated-steps)).

:::info
Tumatakbo lamang ang mga awtomatikong aksyon kapag dumating ang card sa karaniwang daloy -- kapag unang idinagdag ito, kapag dinala ito ng outcome o awtomatikong route, o pagkatapos matapos ang Wait. **Hindi** ito muling tumatakbo kapag manwal na idina-drag ng staff ang card papunta sa hakbang o ibinalik ito, kaya hindi makakatanggap ang isang tao ng parehong email nang dalawang beses.
:::

### Pagpapadala ng email

Piliin ang **Send email**, pumili ng isa sa iyong mga email template, at opsyonal na mag-type ng sarili mong subject. Kapag pumasok ang card sa hakbang, awtomatikong natatanggap ng tao ang email na iyon. (Kung walang email address ang tao sa talaan, lalaktawan lang ng hakbang ang aksyong ito.) Pupunuan ng mga [merge field](../settings/email-templates.md#merge-fields) sa template, gaya ng `{{firstName}}`, ang mga detalye ng tao mismo.

Kapag naipadala na ang email, itatala sa kasaysayan ng card ang **Email sent**. Kung hindi ito maipadala -- halimbawa, dahil hindi pa naaaprubahan ang email ng simbahan mo o naabot na ang araw-araw na limit -- walang idadagdag na entry na "Email sent".

:::info
Lalabas lamang ang mga workflow email pagkatapos maaprubahan ang simbahan mo na magpadala ng group email, at binibilang ang mga ito sa araw-araw na limit ng email ng simbahan mo. Tingnan ang [Turning On Group Email for Your Church](../groups/group-members.md#turning-on-group-email-for-your-church). Nagbababala ang aksyong **Send email** sa step editor kapag hindi ipapadala ang mga email na ito: *"Your church's email hasn't been approved yet..."* kung nakabinbin pa ang pag-apruba, o *"Your church's email is paused..."* kung may mga kamakailang mensaheng bumalik o na-report bilang spam.
:::

### Pagtatala ng attendance

Piliin ang **Record Attendance** at i-click ang **Pick group** para piliin ang group na dapat itala ang attendance. Kapag tumakbo ang aksyon, mamarkahang present ang tao para sa service time ng group na kasalukuyang nagaganap -- katulad ng kung nag-check-in sila. Kapaki-pakinabang ito kasama ang trigger na nagdadagdag ng mga tao sa workflow habang dumarating sila, para mabilang sila nang walang hiwalay na check-in.

- Ang attendance ay sinusukat sa sandaling **nagawa** ang card, kaya ang **Wait** na nauna sa workflow ay hindi itutulak ito lampas sa serbisyo.
- Tanging ang mga service time na may araw at oras ng simula ang binibilang. Kung walang service time ng group na nagaganap sa sandaling iyon, walang maitatala at ang kasaysayan ng card ay magtatala ng **No scheduled service in progress -- attendance not recorded**.
- Kapag naitala ang attendance, ipapakita ng kasaysayan ng card ang **Attendance recorded** kasunod ng pangalan ng group. Ang muling pagpapatakbo ng aksyon para sa parehong serbisyo ay hindi magbibilang sa tao nang dalawang beses.

### Pag-abiso sa isang tao

Piliin ang **Notify Person**, i-click ang **Pick person**, at opsyonal na mag-type ng **Message**. Kapag pumasok ang card sa hakbang, makakatanggap ang taong iyon ng email at B1 notification na may pangalan ng taong nasa card, ang mga pangalan ng workflow at hakbang, ang mensahe mo, at isang link para buksan ang card. Gamitin ito para bigyan ng abiso ang isang staff member o lider ng ministry -- halimbawa, *"Notify the pastor when someone reaches the Membership Interview step."* Itatala ng kasaysayan ng card ang **Notified** kasunod ng pangalan ng tao.

### Pagpapadala ng text

Piliin ang **Send Text** at i-type ang **Text message** (hanggang 1,600 character). Kapag pumasok ang card sa hakbang, matatanggap ng tao ang text na iyon sa kanyang mobile phone. Maaari mong i-personalize ang mensahe gamit ang `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, o `{{churchName}}`, na pupunuan ng mga detalye ng tao kapag naipadala ang text.

- Kung walang mobile phone ang tao sa talaan, walang text na ipapadala at itatala ng kasaysayan ng card ang **Text skipped: no mobile phone**.
- Kung nag-opt out na ang tao, walang text na ipapadala at itatala ng kasaysayan ng card ang **Text skipped: opted out**.
- Kapag naipadala na ang text, itatala ng kasaysayan ng card ang **Text sent**. Kung pumalpak ang pagpapadala -- halimbawa, dahil walang nakakonektang texting provider o naubos na ang texting credits ng simbahan mo -- maitatala ang pagkabigo sa kasaysayan ng card, at tatakbo pa rin ang mga natitirang aksyon ng hakbang.

:::warning
Ipinapadala ang mga text sa pamamagitan ng sarili mong [texting provider](../settings/church-settings.md#texting) ng simbahan. Kung walang nakakonektang provider, magbababala ang action editor ng *"No texting provider is set up"* at hindi maipapadala ang mga text.
:::

### Paghihintay ng ilang araw (drip sequences)

Pinapahinto ng aksyong **Wait** ang card sa bilang ng araw na itinakda mo. Habang naghihintay, ipapakita ng card ang **Snoozed**. Tumitingin ang B1 sa mga tapos nang paghihintay tuwing 30 minuto, kaya magpapatuloy ang card sa loob ng humigit-kumulang kalahating oras pagkatapos matapos ang paghihintay. Kapag tapos na ang paghihintay:

1. Tatakbo ang anumang **natitirang aksyon sa parehong hakbang** -- para makabuo ka ng drip gaya ng **Send email → Wait 3 days → Send a reminder email**.
2. Pagkatapos, kung may awtomatikong route ang hakbang, lilipat na ang card; kung wala, mananatili ito sa hakbang para kunin ng isang tao.

:::tip
Ang **Wait** sa simula mismo ng isang hakbang ay simpleng paraan para "pigilin" ang card bago ito ipakita sa isang volunteer -- halimbawa, *Wait 7 days, then a coach reaches out*.
:::

## Pagdaragdag ng mga Tao bilang Card

May ilang paraan para ilagay ang mga tao sa board:

- **Mula sa board** -- I-click ang **Add Card** sa ilalim ng column ng hakbang at pumili ng tao. Maaari ka ring pumili ng group, at idaragdag ang bawat miyembro ng group bilang card.
- **Mula sa record ng tao** -- Gamitin ang **Add to Workflow** sa pahina ng isang tao para ilagay sila sa workflow.
- **Mula sa paghahanap ng People** -- Pumili ng maraming tao at gamitin ang bulk na **Add to Workflow** na aksyon para idagdag silang lahat nang sabay.
- **Awtomatiko gamit ang trigger** -- Magdagdag ng mga tao kapag may nangyari, gaya ng pagsusumite ng form o unang kaloob (tingnan ang [Triggers](#triggers) sa ibaba).

## Pagtatrabaho sa Board

Magbukas ng workflow para makita ang board nito. Ipinapakita ng bawat card ang pangalan ng tao, kung sino ang naitalaga rito, at isang chip ng due-date o status (**Overdue** o **Snoozed**). Nagpapakita rin ang column ng hakbang ng maliliit na badge para sa mga awtomatikong aksyon na tumatakbo rito at mga anotasyon para sa routing nito, na nagbibigay ng mabilisang mapa kung paano dumadaloy ang mga card.

- **Ilipat ang card** -- I-drag ang card mula sa isang column papunta sa susunod habang umuusad ang tao.
- **Buksan ang card** -- I-double-click ang card (o i-click ito) para buksan ang detail drawer nito, kung saan maaari mong palitan ang hakbang, muling italaga, magdagdag ng notes, at suriin ang mga nangyari na.

Mula sa card drawer, maaari mong:

- **Assign** ang card sa ibang tao o group.
- **Snooze** ang card nang 1 araw, 3 araw, o 1 linggo para pansamantalang itago ang due date nito.
- **Send Back** sa nakaraang hakbang o **Skip** papunta sa susunod na hakbang.
- **Pin assignment** -- panatilihin ang parehong may-ari ng card kahit lumipat ito sa pagitan ng mga hakbang. Bilang default, kapag inilipat ang card sa bagong hakbang, muli itong itinatalaga sa default assignee ng hakbang na iyon; pinapanatili ng pin ang kasalukuyang tao bilang responsable sa buong proseso.
- **Complete** ang card para tapusin ito, o pumili ng **Outcome** na button kung may naka-configure na outcome ang hakbang (tingnan ang [Routing](#routing-cards-with-outcomes-and-conditions)).
- **Magdagdag ng notes** at tingnan ang **Activity** ng card -- isang log ng mga awtomatikong aksyon na natakbo na (mga email na naipadala, mga wait, atbp.), bawat isa ay may petsa at oras kung kailan ito nangyari.

Para sa card tungkol sa isang tao, ipinapakita rin ng drawer ang mobile phone at email ng taong iyon bilang mga link na maaari mong i-tap para tawagan o i-email sila, at isang link na **View profile** kung may permiso kang tingnan ang mga tao. Makikita ng taong naitalaga sa card ang telepono at email nila kahit walang access sa People.

Ang mga tala ay nise-save kasama ng card. Sinumang makakabukas ng card -- kasama ang taong o group na naitalaga rito -- ay makakabasa ng mga tala at makakapagdagdag ng sarili nila. Ang mga hindi makakabukas ng card ay hindi makakakita ng mga tala nito.

### Bulk na aksyon

Piliin ang mga checkbox ng maraming card para kumilos sa mga ito nang sabay. Para pumili ng bawat card sa isang hakbang nang sabay-sabay, lagyan ng check ang kahon na **Select all** sa header ng column ng hakbang na iyon; i-check muli para alisin ang lahat ng pagpili. Lalabas ang isang toolbar na nagpapahintulot sa iyong **Complete**, **Snooze**, **Assign** (muling italaga), o **Move to…** ng ibang hakbang para sa lahat ng napiling card nang sabay.

## Pag-route ng mga Card gamit ang Outcome at Kondisyon

Kinokontrol ng routing kung saan pupunta ang card kapag umalis ito sa isang hakbang. Buksan ang editor ng hakbang para i-configure ang dalawang uri ng routing.

### Mga outcome button

Ang mga outcome ay mga button na lumilitaw sa card drawer kapag kinukumpleto mo ang card sa hakbang na iyon. Sa halip na isang button na **Complete** lamang, maaari kang mag-alok ng mga pagpipiliang tulad ng "Joined a Group" o "Not Interested." Ang bawat outcome ay maaaring:

- Ipadala ang card sa **ibang hakbang** sa workflow na ito,
- **Ilipat ang card** sa ibang workflow nang buo, o
- **Isara** ang card.

Sa ganitong paraan, ang isang desisyon ay maaaring magsanga sa tao tungo sa iba't ibang landas.

### Awtomatikong routing (may kondisyon)

Ang mga automatic route ay naglilipat ng card pasulong **sa sandaling pumasok ito sa hakbang** (at pagkatapos matapos ang mga awtomatikong aksyon nito), nang hindi kailangang mag-click ang sinuman, kung tugma ang tao sa isang hanay ng mga kondisyon. Magdagdag ng route, piliin ang target na hakbang, at tukuyin ang isa o higit pang **conditions** (halimbawa, campus, edad, o status ng membership ng tao). Maaaring itugma nang eksakto ang mga text field, o gamit ang **contains**, **starts with**, o **ends with**. Ang route na walang kondisyon ay tumutugma sa lahat.

Maaaring ihambing ng mga date condition (Today's Date, Birth Date, o Anniversary) ang buong petsa o bahagi lamang nito -- ang araw ng linggo, ang **Day of Month**, ang **Month**, o ang bilang ng taon na lumipas. Para sa Birth Date o Anniversary ng tao, nag-aalok ang **Day of Month** ng kamag-anak na opsyong **Today**, kaya ang kondisyong tulad ng *Birth Date · Day of Month = Today* ay tutugma sa mga taong kaarawan ay nasa araw ng buwang ito. Nag-aalok ang **Month** ng **Previous Month**, **Current Month**, at **Next Month**. Ang mga kamag-anak na halagang tulad nito ay kinakalkula gamit ang time zone ng simbahan mo, kaya tumutugma ang mga ito sa araw ng kalendaryo ng simbahan mo at hindi sa server.

Kung hindi masuri ang mga kondisyon ng isang route sa anumang dahilan, ituturing na hindi tumutugma ang route na iyon. Mananatili ang card sa hakbang (o susunod sa ibang route na tumutugma) sa halip na ma-stuck.

:::info
Sa board, nagpapakita ang bawat column ng hakbang ng maliliit na anotasyon na naglalarawan ng routing nito -- halimbawa, label ng outcome o "if matches" na sinusundan ng arrow papunta sa target na hakbang o workflow.
:::

## Ganap na Awtomatikong mga Hakbang

Maaari mong gawing tumakbo nang mag-isa ang isang hakbang, nang walang taong humahawak nito. Bigyan ang hakbang ng mga **automated actions** nito at magdagdag ng **automatic route** (walang kondisyon) na tumuturo sa susunod na hakbang. Kapag pumasok ang card, tatakbo ang mga aksyon, at agad itong ililipat ng route -- dumadaan lang ang card nang diretso.

:::tip
Pagsamahin ito sa **Wait**: *Send welcome email → Wait 3 days → automatically advance to the "Personal call" step.* Ang email at oras ay inaasikaso para sa iyo, at makikita lang ng volunteer ang card kapag oras na para sa personal na pakikipag-ugnayan.
:::

## Mga Trigger

Awtomatikong nagdaragdag ng mga tao sa workflow ang mga trigger kapag may nangyari, kaya hindi mo na kailangang magdagdag ng card nang manwal. Sa isang workflow board, i-click ang tab na **Triggers**, pagkatapos ang **Add Trigger**. May dalawang uri:

### Event triggers

Umaandar sa sandaling magbago ang isang record sa B1. Piliin ang event, pagkatapos opsyonal na magdagdag ng **conditions** para tanging ang mga tugmang tao lamang ang idagdag:

- **Person · Created / Updated** -- hal., idagdag ang sinumang status ay nagiging *Visitor* o *Guest* (ang status na ibinibigay sa mga taong nagrerehistro sa sarili nila).
- **Donation · Created** -- hal., idagdag ang una o malaking kaloob sa isang thank-you workflow (itugma sa halaga, pondo, o paraan).
- **Group · Member Joined** / **Group · Created**.
- **Form · Submitted** -- idagdag ang sinumang nagsumite ng piniling form (mainam para sa card na "I'm New" o "Connect").

### Schedule triggers

Tumatakbo nang paulit-ulit -- araw-araw, lingguhan, buwanan, o taunan -- laban sa isang hanay ng mga kondisyon. Gamitin ang mga ito para sa outreach na batay sa oras, gaya ng *lahat ng may kaarawan ngayon* (Birth Date · Day of Month = **Today**, na may buwang tumutugma sa **Current Month**) o isang *buwanang* check-in. Kahit wala ang **Only once per person**, hindi idaragdag muli ng schedule trigger ang parehong tao sa loob ng iisang repeat period (isang araw, linggo, buwan, o taon, ayon sa dalas ng pagtakbo nito).

Para sa anumang trigger, maaari mo ring itakda ang:

- Ang **Starting step** na tatahakin ng bagong card (default ang unang hakbang).
- **Only once per person** -- para hindi maidagdag nang dalawang beses ang parehong tao sa workflow ng trigger. Kapag naka-on ito, nilalaktawan ang sinumang may card na sa workflow na ito.
  - **Add again after their card is closed** -- lumilitaw kapag naka-on ang **Only once per person**. Lagyan ng check para payagan ang trigger na idagdag muli ang tao kapag naisara na ang nauna nilang card sa workflow na ito. Hindi pa rin magkakaroon ang isang tao ng dalawang bukas na card sa workflow nang sabay. Gamitin ito para sa mga bagay na maaaring mangyari nang higit sa isang beses, gaya ng bumabalik na bisita o taunang proseso.
- **Active** -- i-on o i-off ang trigger nang hindi ito binubura.

:::tip
Ipares ang trigger na **Form · Submitted** sa template na **New Visitor Follow-up** para gawing awtomatikong pipeline ng follow-up ang iyong "Connect Card" o "I'm New" na form.
:::

## Mga Serving Assignment Confirmation

Isang espesyal na uri ng workflow ang maaaring sumunod sa [mga serving request](./plans.md#assigning-team-members) hanggang tanggapin o tanggihan ng bawat volunteer. Sa halip na mga tao, sinusubaybayan ng bawat card sa board na ito ang **isang assignment** -- isang tao sa isang posisyon sa isang plan. Ang dalawang tungkulin o dalawang serbisyo para sa iisang tao ay magkakaroon ng hiwalay na card. Opt-in ito: walang magbabago para sa isang plan hanggang pumili ka ng confirmation workflow sa settings nito.

### Pag-set up nito

1. Sa pahina ng Workflows, i-click ang **Add Workflow** at piliin ang template na **Serving Assignment Confirmation**. (O magsimula sa **Blank workflow** at itakda ang **Workflow purpose** nito sa **Serving assignment confirmation**.) Ang paggawa mula sa template ay nangangailangan ng permiso sa pagpapadala ng text, dahil may kasamang text step ito.
2. Suriin ang mga hakbang. Nagsisimula ang template sa:
   - **Request and wait for response** -- nagpapadala ng serving request sa pamamagitan ng email at text, naghihintay ng 2 araw, nagpapadala ng reminder email, naghihintay pa ng 1 araw, saka awtomatikong inililipat ang card.
   - **Call volunteer about unanswered request** -- isang hakbang para tawagan ng tao ang volunteer, due sa loob ng 1 araw. Magtakda ng **Default assignee** sa hakbang na ito. Kung wala itong nakatakda, mapupunta ang card sa lider ng ministry, o sa team ng ministry kung wala namang lider.
3. I-edit ang mga paghihintay, mensahe, at hakbang para bagay sa simbahan mo.
4. Buksan ang [settings ng plan](./plans.md#plan-settings) at piliin ang workflow na ito sa ilalim ng **Confirmation workflow**.

Ang mga workflow na ito ay gumagamit ng aksyong **Send serving request** sa halip na **Send email** at **Send text**. Piliin ang **Email** o **Text message** at, opsyonal, isulat ang **Request message**. Palaging kasama sa request ang tungkulin, plan, petsa ng serbisyo, at isang link para tumugon; maaari mong gamitin ang `{{planName}}`, `{{positionName}}`, at `{{serviceDate}}` sa mensahe mo. Iwanang blangko ang mensahe para gamitin ang default na request. Ilalapat ang mga kagustuhan sa notification ng mga volunteer, pag-opt in sa text, texting provider mo, at pag-apruba ng email ng simbahan mo, at maitatala sa card ang anumang pagtatangkang nalaktawan o naharang. Hindi available sa mga board na ito ang **Send email**, **Send text**, at **Add to workflow**.

Ipinapaliwanag ng tab na **Triggers** sa confirmation workflow kung paano sinisimulan ang mga card sa halip na mag-alok ng mga trigger, at hindi lumilitaw ang mga workflow na ito sa listahan ng **Add to Workflow** para sa mga tao.

### Paano sinisimulan at isinasara ang mga card

- Sinisimulan ang mga card kapag **in-Notify** mo ang mga volunteer sa nai-publish na plan (tingnan ang [Notifying Volunteers](./plan-validation.md#notifying-volunteers)). Bawat bagong, hindi pa nasasagot na assignment ay nagkakaroon ng isang card. Ang pag-save, pag-publish, pagkopya, o awtomatikong pagpuno sa plan ay hindi nakikipag-ugnayan sa sinuman nang mag-isa, at ang mga penciled-in na plan ay walang ipapadala.
- Nakukuha pa rin ng mga volunteer ang karaniwang in-app alert. Ang email at text na follow-up ay mula sa workflow.
- Kapag **tinanggap o tinanggihan** ng volunteer, awtomatikong magsasara ang card nila, kasama ang anumang follow-up task na naka-ugnay dito.
- Ipinapakita ng card drawer ang posisyon, petsa ng serbisyo, at link sa plan. Sa halip na **Complete**, ang button ay magbabasa ng **Record follow-up done**. Kapag na-click ito, itatala na may nag-follow up, pero mananatiling bukas at naitalaga ang card (ipinapakitang **Awaiting response**) hanggang tumugon ang volunteer o lumampas ang response deadline.
- Ang response deadline ay ang pagtatapos ng huling service time na pinaglilingkuran ng team ng posisyon. Kung walang tumutugmang oras ang plan, ito ang pagtatapos ng araw ng serbisyo. Kung wala pang sumagot pagsapit nito, magsasara ang card na may **Response deadline passed** at may task na **Review unanswered serving request** na mapupunta sa kasalukuyang may-ari ng card o sa lider ng ministry para may magpasya kung paano punan ang puwesto. Mananatiling **Unconfirmed** ang assignment.
- Ang pag-alis ng assignment, pagpalit ng tao, posisyon, o petsa ng plan, pagbalik ng plan sa penciled in, o paglipat ng plan sa ibang confirmation workflow ay magsasara sa card. Hindi na muling bubuksan ng ibang **Notify** ang nasarang card; magdagdag ng bagong assignment para magpadala ng bagong request.

:::info
Para sa mga request na ipinadala sa pamamagitan ng confirmation workflow, [mga paalala sa volunteer](./plans.md#volunteer-reminders) ay mapupunta lamang sa mga volunteer na **tumanggap na**, para hindi makatanggap ng paalala sa ibabaw ng mga follow-up ng workflow ang mga taong naghihintay pang tumugon.
:::

## Aking mga Card

Hindi na kailangang halughugin ng mga volunteer at staff ang bawat board para mahanap ang kanilang gawain. Ipinapakita ng listahang **My Cards** sa pahinang **My Work** ang bawat card na naitalaga sa kasalukuyang user sa lahat ng workflow. Para makarating doon, i-click ang **My Cards** sa itaas ng pahina ng Workflows, o buksan ang **Serving > My Work** sa Jump menu. Ang pag-click sa card ay magbubukas ng board na kinabibilangan nito.

## Mga Ulat

Magbukas ng workflow at i-click ang **Reports** para makita ang analytics ng workflow na iyon:

- **Overdue** -- ang bilang ng mga card na lampas na sa kanilang due date.
- **Cards per Step** -- ilan ang kasalukuyang nasa bawat hakbang, ipinapakita bilang column chart.
- **Completed (30 days)** -- ang throughput sa nakalipas na 30 araw, ipinapakita bilang line chart.

Gamitin ang mga ito para matukoy ang mga bottleneck -- halimbawa, isang hakbang kung saan naiipon ang mga card at hindi kailanman umuusad.

## Mga Kaugnay na Artikulo

- [Tasks](./tasks.md) -- ang indibidwal na mga action item kung saan nakabatay ang mga card ng workflow
- [Forms](../forms/index.md) -- gumawa ng mga form na maaaring mag-trigger ng workflow
- [Groups](../groups/index.md) -- ang mga group na maaaring paglagyan ng "Add to group" na aksyon ng mga tao
- [Service Plans](./plans.md) -- pumili ng confirmation workflow para sa mga serving request ng plan
- [Roles & Permissions](../settings/roles-permissions.md) -- kontrolin kung sino ang maaaring tumingin, mag-edit, at mamahala ng mga workflow
