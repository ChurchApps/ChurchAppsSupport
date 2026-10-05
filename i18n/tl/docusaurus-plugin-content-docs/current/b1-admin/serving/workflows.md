---
title: "Mga Workflow"
---

# Mga Workflow

<div class="article-intro">

Ang mga Workflow ay nagpapausad sa mga tao sa serye ng mga hakbang sa isang visual na board. Ang bawat tao ay nagiging card na lumilipat mula sa isang hakbang patungo sa susunod -- mula sa follow-up sa unang beses na bisita, sa proseso ng pagiging miyembro, hanggang sa pasasalamat sa unang beses na nagbigay, at sa anumang iba pang pagkakataon na kailangan mong subaybayan ang maraming tao sa iisang set ng mga yugto. Ang isang hakbang ay maaaring mag-atas sa isang volunteer na gumawa ng isang bagay (tumawag, makipag-usap) **at** magpatakbo ng mga awtomatikong aksyon nang mag-isa -- magpadala ng email o text, maghintay ng ilang araw, magdagdag ng tao sa isang grupo -- kaya ang mga Workflow ang bahala sa personal na follow-up at sa mga nakakapagod na gawain sa paligid nito. Pinalalawak ng mga Workflow ang [Mga Task](./tasks.md) tungo sa isang drag-and-drop na Kanban board para walang makaligtaan o mapabayaan.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Siguraduhing nasa B1 Admin na ang mga taong gusto mong subaybayan
- Alamin muna kung paano gumagana ang [Mga Task](./tasks.md), dahil ang bawat card sa board ay isang task
- Para magamit ang aksyong **Send email**, gawin muna ang mga email template na gusto mong ipadala (pinamamahalaan sa ilalim ng **Messaging → Manage Templates**)
- Para magamit ang aksyong **Send text**, i-connect muna ang isang [texting provider](../settings/church-settings.md#texting)
- Kakailanganin mo ang angkop na pahintulot sa Tasks. Magkakahiwalay na antas ng pahintulot ang pagtingin, pag-edit ng mga card, at pamamahala ng mga workflow (tingnan ang [Mga Tungkulin at Pahintulot](../settings/roles-permissions.md))

</div>

## Pagtingin sa mga Workflow

Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa itaas na kaliwa ng B1 Admin), i-expand ang **Serving**, at i-click ang **Workflows**. Makikita mo ang listahan ng iyong mga workflow na naka-grupo ayon sa kategorya, at naka-highlight ang mga aktibong workflow. I-click ang anumang workflow para buksan ang board nito.

## Paggawa ng Workflow

1. Sa pahina ng Workflows, i-click ang **Add Workflow**.
2. Piliin kung paano magsisimula:
   - **Blank workflow** -- magsimula sa wala at buuin ang sarili mong mga hakbang.
   - **From a template** -- magsimula sa handa nang set ng mga hakbang na maaari mong i-edit. Kasama sa mga built-in na template ang:
     - **New Visitor Follow-up** -- Magpadala ng welcome email → Personal na tawag → Imbitahan sa susunod na hakbang → Connected
     - **Membership Class** -- Magpahayag ng interes → Magpa-rehistro sa klase → Dumalo sa klase → Kumpletuhin ang pagiging miyembro
     - **First-time Giver Thank-you** -- Magpadala ng thank-you note → Ibahagi ang epekto ng pagbibigay → Stewarded
3. Bigyan ng **Pangalan** ang workflow.
4. Opsyonal, magtalaga ng **Kategorya** para pagsama-samahin ang magkakaugnay na workflow. Maaari kang gumawa ng bagong kategorya mismo mula sa dropdown.
5. Iwanang **Active** ang workflow para may maidagdag na tao rito, o itakda sa **Inactive** para itago ito sa mga listahan ng add-to-workflow.
6. I-click ang **Save**.

:::tip
Gamitin ang button na **Duplicate** sa listahan ng Workflows para kopyahin ang isang umiiral na workflow -- kasama ang mga hakbang, awtomatikong aksyon, at routing nito -- bilang panimulang punto ng bago.
:::

## Pagbuo ng Board gamit ang mga Hakbang

Ang bawat workflow board ay binubuo ng mga **hakbang** (steps), na ipinapakita bilang mga column mula kaliwa pakanan. Buksan ang isang workflow at gamitin ang **Add Step** para gawin ang bawat yugto ng iyong proseso.

Kapag nagdagdag o nag-edit ka ng hakbang, maaari mong i-configure ang:

- **Step Name** -- ang pamagat ng column (halimbawa, "Welcome Call" o "Awaiting Registration").
- **Due in (days)** -- awtomatikong nagtatakda ng due date kapag pumasok ang isang card sa hakbang na ito. Ang mga card na lampas na sa due date ay minamarkahang **Overdue**.
- **Default assignee** -- ang taong o grupong awtomatikong pagtatalagahan ng mga bagong card sa hakbang na ito.
- **Automated actions** -- mga bagay na kusang ginagawa ng sistema kapag dumating ang isang card (tingnan sa ibaba).
- **Routing** -- kung saan pupunta ang card kapag umalis ito sa hakbang (tingnan ang [Routing](#routing-cards-with-outcomes-and-conditions)).

I-drag ang mga column ng hakbang sa pagkakasunod-sunod na tugma sa iyong proseso. Ang pagkakasunod-sunod din ang tumutukoy sa default na daang tatahakin ng card kapag walang ibang routing na umiiral.

:::info
I-save muna ang bagong hakbang. Nakakabit sa hakbang ang mga awtomatikong aksyon at routing, kaya mabubuksan lamang ng editor ang mga seksyong iyon kapag nagawa na ang hakbang.
:::

## Mga Awtomatikong Aksyon

Ang bawat hakbang ay maaaring may listahan ng **awtomatikong aksyon** na kusang tumatakbo sa sandaling **pumasok** ang isang card sa hakbang -- bago pa ito mahawakan ng sinuman. Ganito napapakilos ng isang hakbang ang isang volunteer *at* naaasikaso rin ang mga nakagawiang gawain sa paligid ng follow-up.

Sa editor ng hakbang, buksan ang **Automated actions**, i-click ang **Add Action**, pumili ng uri, punan ang mga setting nito, at i-click ang save icon ng aksyong iyon. Magdagdag ng kasing dami ng kailangan mo; tumatakbo ang mga ito **mula itaas pababa nang may pagkakasunod-sunod**.

| Aksyon | Ano ang ginagawa nito |
|---|---|
| **Send email** | Nagpapadala sa tao ng email template na pipiliin mo. Maaari mong baguhin ang subject line. |
| **Send text** | Nagte-text sa tao ng mensaheng isusulat mo, sa pamamagitan ng [texting provider](../settings/church-settings.md#texting) ng iyong simbahan. |
| **Wait** | Pinaghihintay ang card nang ilang araw bago magpatuloy (tingnan sa ibaba). |
| **Add to group** | Idinadagdag ang tao sa isang [grupo](../groups/index.md) na pipiliin mo. |
| **Remove from group** | Inaalis ang tao sa isang grupong pipiliin mo. |
| **Add to workflow** | Sinisimulan ang tao sa ibang workflow -- kapaki-pakinabang sa paglilipat mula sa isang proseso patungo sa iba. |
| **Add note** | Nagtatala ng tala sa kasaysayan ng card. |
| **Set field** | Ina-update ang isang field sa record ng tao: Membership Status, Marital Status, Gender, City, State, o Zip. |
| **Webhook** | Ipinapadala ang mga detalye ng card sa isang panlabas na web address (URL) na ibibigay mo, para makakonekta sa ibang mga sistema. |
| **Create task** | Gumagawa ng [task](./tasks.md) na may pamagat at paglalarawang ilalagay mo, na itatalaga sa sinumang piliin mo. |

Pagkatapos matapos ang lahat ng aksyon ng isang hakbang, ang card ay **mananatili sa hakbang na iyon** para magawan ng aksyon ng isang tao -- maliban kung may awtomatikong route ang hakbang na naglilipat dito (tingnan ang [Mga ganap na awtomatikong hakbang](#fully-automated-steps)).

:::info
Tumatakbo lamang ang mga awtomatikong aksyon kapag dumating ang card sa normal na daloy -- kapag unang idinagdag ito, kapag dinala ito ng isang outcome o awtomatikong route, o pagkatapos matapos ang isang Wait. **Hindi** ito tumatakbo muli kapag manu-manong i-drag ng staff ang card sa hakbang o ibalik ito, kaya hindi makakatanggap ang tao ng parehong email nang dalawang beses.
:::

### Pagpapadala ng email

Piliin ang **Send email**, pumili ng isa sa iyong mga email template, at opsyonal na maglagay ng sariling subject. Kapag pumasok ang card sa hakbang, awtomatikong matatanggap ng tao ang email na iyon. (Kung walang email address na nakatala ang tao, lalaktawan lang ng hakbang ang aksyong ito.) Ang mga [merge field](../settings/email-templates.md#merge-fields) sa template, tulad ng `{{firstName}}`, ay pinupunan ng sariling detalye ng tao.

:::info
Lalabas lamang ang mga email ng workflow kapag naaprubahan na ang iyong simbahan na magpadala ng group email, at binibilang ang mga ito sa pang-araw-araw na limitasyon ng email ng iyong simbahan. Tingnan ang [Pag-on ng Group Email para sa Iyong Simbahan](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

### Pagpapadala ng text

Piliin ang **Send Text** at i-type ang **Text message** (hanggang 1,600 character). Kapag pumasok ang card sa hakbang, matatanggap ng tao ang text na iyon sa kanyang mobile phone. Maaari mong i-personalize ang mensahe gamit ang `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, o `{{churchName}}`, na pinupunan ng detalye ng tao kapag ipinadala ang text.

- Kung walang mobile phone na nakatala ang tao, lalaktawan ang aksyon.
- Kung nag-opt out ang tao, walang ipapadalang text at itatala sa kasaysayan ng card ang **Text skipped: opted out**.
- Kapag naipadala na ang text, itatala sa kasaysayan ng card ang **Text sent**. Kung pumalya ang pagpapadala -- halimbawa, dahil walang naka-connect na texting provider o naubusan na ng texting credits ang iyong simbahan -- itatala ang pagkabigo sa kasaysayan ng card at tatakbo pa rin ang natitirang aksyon ng hakbang.

:::warning
Ipinapadala ang mga text sa pamamagitan ng sarili mong [texting provider](../settings/church-settings.md#texting) ng iyong simbahan. Kung walang naka-connect na provider, magbababala ang editor ng aksyon na *"No texting provider is set up"* at hindi makakapagpadala ng text.
:::

### Paghihintay ng ilang araw (drip sequence)

Hinahawakan ng aksyong **Wait** ang card sa bilang ng araw na itinakda mo. Habang naghihintay, ipinapakita ang card bilang **Snoozed**. Kapag tapos na ang paghihintay:

1. Tatakbo ang anumang **natitirang aksyon sa parehong hakbang** -- kaya makakabuo ka ng drip tulad ng **Send email → Wait 3 days → Send a reminder email**.
2. Pagkatapos, kung may awtomatikong route ang hakbang, lilipat na ang card; kung wala, mananatili ito sa hakbang para kunin ng isang tao.

:::tip
Ang **Wait** sa pinakasimula ng isang hakbang ay simpleng paraan para "hawakan" ang card bago ito lumitaw sa isang volunteer -- halimbawa, *Wait 7 days, tapos lalapit ang isang coach*.
:::

## Pagdaragdag ng mga Tao bilang mga Card

Maraming paraan para maglagay ng mga tao sa board:

- **Mula sa board** -- I-click ang **Add Card** sa ibaba ng column ng hakbang at pumili ng tao. Maaari ka ring pumili ng grupo, at ang bawat miyembro ng grupong iyon ay idadagdag bilang card.
- **Mula sa record ng tao** -- Gamitin ang **Add to Workflow** sa pahina ng isang tao para ilagay siya sa isang workflow.
- **Mula sa People search** -- Pumili ng maraming tao at gamitin ang bulk na aksyong **Add to Workflow** para maidagdag silang lahat nang sabay-sabay.
- **Awtomatiko gamit ang trigger** -- Magdagdag ng mga tao kapag may nangyari, tulad ng pagsusumite ng form o unang handog (tingnan ang [Mga Trigger](#triggers) sa ibaba).

## Pagtatrabaho sa Board

Buksan ang isang workflow para makita ang board nito. Ipinapakita ng bawat card ang pangalan ng tao, kung kanino ito nakatalaga, at isang chip ng due date o katayuan (**Overdue** o **Snoozed**). Nagpapakita rin ang column ng hakbang ng maliliit na badge para sa anumang awtomatikong aksyong pinapatakbo nito at mga anotasyon para sa routing nito, kaya makikita mo sa isang sulyap ang mapa kung paano dumadaloy ang mga card.

- **Ilipat ang card** -- I-drag ang card mula sa isang column patungo sa susunod habang sumusulong ang tao.
- **Buksan ang card** -- I-double-click ang card (o i-click lang) para buksan ang drawer ng detalye nito, kung saan maaari mong baguhin ang hakbang, italaga sa iba, magdagdag ng mga tala, at suriin ang mga nangyari na.

Mula sa drawer ng card, maaari mong:

- **Assign** ang card sa ibang tao o grupo.
- **Snooze** ang card nang 1 araw, 3 araw, o 1 linggo para pansamantalang itago ang due date nito.
- **Send Back** sa nakaraang hakbang o **Skip** sa susunod na hakbang.
- **Pin assignment** -- panatilihin ang parehong may-ari ng card kahit lumipat ito sa iba't ibang hakbang. Bilang default, ang paglipat ng card sa bagong hakbang ay nagtatalaga ulit nito sa default assignee ng hakbang na iyon; pinapanatili ng pag-pin ang kasalukuyang tao bilang responsable hanggang dulo.
- **Complete** ang card para tapusin ito, o pumili ng button na **Outcome** kung may naka-configure na mga outcome ang hakbang (tingnan ang [Routing](#routing-cards-with-outcomes-and-conditions)).
- **Magdagdag ng mga tala** at suriin ang **kasaysayan** ng card -- kasama ang log ng mga awtomatikong aksyong tumakbo na (mga naipadalang email, paghihintay, atbp.).

### Mga bulk na aksyon

Piliin ang mga checkbox sa maraming card para sabay-sabay silang magawan ng aksyon. Lalabas ang isang toolbar na nagbibigay-daan sa iyong **Complete**, **Snooze**, **Reassign**, o **Move** ang lahat ng napiling card sa ibang hakbang nang sabay-sabay.

## Pag-route ng mga Card gamit ang mga Outcome at Kondisyon

Kinokontrol ng routing kung saan pupunta ang card kapag umalis ito sa isang hakbang. Buksan ang editor ng isang hakbang para i-configure ang dalawang uri ng routing.

### Mga outcome button

Ang mga outcome ay mga button na lumilitaw sa drawer ng card kapag kinukumpleto mo ang card sa hakbang na iyon. Sa halip na isang button na **Complete**, maaari kang mag-alok ng mga pagpipilian tulad ng "Joined a Group" o "Not Interested." Ang bawat outcome ay maaaring:

- Ipadala ang card sa **ibang hakbang** sa workflow na ito,
- **Ipasa ang card** sa ibang workflow, o
- **Isara** ang card.

Dahil dito, ang isang desisyon ay maaaring magdala sa tao sa iba't ibang landas.

### Awtomatikong routing (may kondisyon)

Inililipat ng mga awtomatikong route ang card **sa sandaling pumasok ito sa isang hakbang** (at pagkatapos matapos ang mga awtomatikong aksyon nito), nang walang nagki-click, kung tumutugma ang tao sa isang set ng mga kondisyon. Magdagdag ng route, piliin ang target na hakbang, at tukuyin ang isa o higit pang **kondisyon** (halimbawa, campus, edad, o membership status ng tao). Ang route na walang kondisyon ay tumutugma sa lahat.

:::info
Sa board, ang bawat column ng hakbang ay nagpapakita ng maliliit na anotasyon na naglalarawan sa routing nito -- halimbawa, isang label ng outcome o "if matches" na sinusundan ng arrow patungo sa destinasyong hakbang o workflow.
:::

## Mga Ganap na Awtomatikong Hakbang

Maaari mong gawing ganap na kusang tumakbo ang isang hakbang, nang walang gumagawa rito. Ibigay sa hakbang ang mga **awtomatikong aksyon** nito at magdagdag ng **awtomatikong route** (walang kondisyon) na tumuturo sa susunod na hakbang. Kapag pumasok ang card, tatakbo ang mga aksyon, at pagkatapos ay agad itong ililipat ng route -- diretso lang na dadaan ang card.

:::tip
Pagsamahin ito sa **Wait**: *Magpadala ng welcome email → Wait 3 days → awtomatikong lumipat sa hakbang na "Personal call."* Ang email at ang tiyempo ay naaasikaso para sa iyo, at makikita lang ng volunteer ang card kapag oras na para sa personal na pakikitungo.
:::

## Mga Trigger

Awtomatikong idinadagdag ng mga trigger ang mga tao sa isang workflow kapag may nangyari, kaya hindi mo na kailangang magdagdag ng mga card nang mano-mano. Sa workflow board, i-click ang tab na **Triggers**, pagkatapos ay **Add Trigger**. May dalawang uri:

### Mga event trigger

Tumatakbo agad kapag may nagbago sa isang record sa B1. Piliin ang event, pagkatapos ay opsyonal na magdagdag ng **kondisyon** para tanging mga tumutugmang tao lang ang maidagdag:

- **Person · Created / Updated** -- hal. idagdag ang sinumang ang status ay naging *Visitor*.
- **Donation · Created** -- hal. idagdag ang unang handog o malaking handog sa isang thank-you workflow (itugma ayon sa halaga, pondo, o paraan).
- **Group · Member Joined** / **Group · Created**.
- **Form · Submitted** -- idagdag ang sinumang magsumite ng piniling form (mahusay para sa "I'm New" o "Connect" card).

### Mga schedule trigger

Tumatakbo nang paulit-ulit -- araw-araw, lingguhan, buwanan, o taunan -- laban sa isang set ng mga kondisyon. Gamitin ang mga ito para sa outreach na nakabatay sa oras, tulad ng *lahat ng ang anibersaryo ng pagiging miyembro ay ngayon* o isang *buwanang* check-in.

Para sa anumang trigger, maaari mo ring itakda ang:

- Ang **entry step** kung saan magsisimula ang bagong card (default ay ang unang hakbang).
- **Once per person** -- para hindi madagdag nang dalawang beses sa workflow ang parehong tao ng trigger.
- **Active** -- i-on o i-off ang trigger nang hindi ito binubura.

:::tip
Ipares ang trigger na **Form · Submitted** sa template na **New Visitor Follow-up** para gawing awtomatikong follow-up pipeline ang iyong "Connect Card" o "I'm New" na form.
:::

## My Cards

Hindi na kailangang halughugin ng mga volunteer at staff ang bawat board para hanapin ang kanilang gawain. Ang pahinang **My Cards** (may link mula sa pahina ng Workflows) ay naglilista ng bawat card na nakatalaga sa kasalukuyang user sa lahat ng workflow. Ang pag-click sa isang card ay magbubukas ng board na kinabibilangan nito.

## Mga Ulat

Buksan ang isang workflow at i-click ang **Reports** para makita ang analytics ng workflow na iyon:

- **Overdue** -- ang bilang ng mga card na lampas na sa due date.
- **Cards per Step** -- kung ilang card ang kasalukuyang nasa bawat hakbang, na ipinapakita bilang column chart.
- **Completed (30 days)** -- ang natapos sa nakalipas na 30 araw, na ipinapakita bilang line chart.

Gamitin ang mga ito para matukoy ang mga bottleneck -- halimbawa, isang hakbang kung saan nag-iipon ang mga card at hindi umuusad.

## Mga Kaugnay na Artikulo

- [Mga Task](./tasks.md) -- ang mga indibidwal na gawain kung saan nakabatay ang mga workflow card
- [Mga Form](../forms/index.md) -- buuin ang mga form na maaaring mag-trigger ng mga workflow
- [Mga Grupo](../groups/index.md) -- ang mga grupong mapaglalagyan ng tao ng aksyong "Add to group"
- [Mga Tungkulin at Pahintulot](../settings/roles-permissions.md) -- kontrolin kung sino ang maaaring tumingin, mag-edit, at mamahala ng mga workflow
