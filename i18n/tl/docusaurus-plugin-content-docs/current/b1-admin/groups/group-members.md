---
title: "Mga Miyembro ng Grupo"
---

# Mga Miyembro ng Grupo

<div class="article-intro">

Kapag nakagawa ka na ng grupo, ang susunod na hakbang ay ang pagdaragdag ng mga miyembro. Mula sa detail page ng grupo, maaari kang maghanap ng mga tao, idagdag sila sa grupo, magtalaga ng mga leader, magpadala ng mensahe, at i-export ang listahan ng miyembro. Mahalaga ang pamamahala ng membership ng grupo para sa pag-coordinate ng mga small group, komite, at klase.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng hindi bababa sa isang grupong naka-set up sa B1 Admin. Tingnan ang [Paggawa ng mga Grupo](creating-groups.md) kung wala ka pang nagawang grupo.
- Dapat nasa iyong [direktoryo ng People](../people/adding-people.md) na ang mga taong gusto mong idagdag. Kung wala pa sila roon, maaari mo silang gawin mula sa member search (tingnan sa ibaba).

</div>

## Pagdaragdag ng mga Miyembro sa Grupo

1. Sa [Jump menu](../introduction.md#getting-around-with-the-jump-menu), piliin ang **People > Groups** at i-click ang grupong gusto mong pamahalaan.
2. Sa seksyong **Members** ng pahina ng grupo, i-click ang **All members**. (Ang mga team at ministeryo ay direktang bumubukas sa kanilang listahan ng miyembro.)
3. Sa kahon na **Add Person** sa ibaba ng listahan ng miyembro, i-type ang pangalan ng taong gusto mong idagdag at pindutin ang **Enter** o i-click ang search icon.
4. I-click ang pangalan ng tao, o ang add icon sa tabi nito, sa mga resulta ng paghahanap.
5. Lumalabas na ang tao sa listahan ng miyembro ng grupo.

:::tip
Bago ka mag-type ng anuman, ang kahon na **Add Person** ay nagpapakita ng maikling listahan ng mga **Recent people** na maaari mong idagdag gamit ang isang click lamang.
:::

Kapag tapos ka na, i-click ang link na **Back to** kasama ang pangalan ng grupo para bumalik sa pahina ng grupo. Ipinapakita ng pahina ng grupo ang buod ng mga **Members**, **Sessions**, **Calendar**, at **Health** ng grupo, bawat isa ay may link sa buong view nito. Kung isa ka sa mga leader ng grupo, ipinapakita rin nito ang **Leader notes** (tingnan ang [Mga Tala ng Leader](#leader-notes) sa ibaba).

### Pagdaragdag ng Taong Wala Pa sa B1

Kung walang makita ang iyong paghahanap, ipinapakita ng search ang **No records found** na may link na **Add New Person**. I-click ito, ilagay ang unang pangalan, apelyido, at (opsyonal) email ng tao, at i-click ang **Add**. Nagagawa ang bagong tao sa iyong People directory at naidadagdag sa grupo sa isang hakbang lamang -- hindi mo na siya kailangang hanapin muli.

## Pagtatalaga ng mga Leader ng Grupo {#designating-group-leaders}

May espesyal na pribilehiyo ang mga leader ng grupo -- maaari nilang i-edit ang [kalendaryo ng grupo](group-calendar.md), pamahalaan ang mga event, at tumulong sa pag-coordinate ng grupo.

1. Sa listahan ng miyembro ng grupo, hanapin ang taong gusto mong gawing leader.
2. I-click ang **star icon** (**Make Leader**) sa tabi ng kanyang pangalan.
3. Itinalaga na ang tao bilang leader ng grupo at may ipinapakitang badge na **Leader**.

Para alisin ang leader status, i-click muli ang star icon (**Remove Leader Access**).

:::info
Maaaring tingnan ng sinumang miyembro ng grupo ang kalendaryo at mga event ng grupo, ngunit ang mga leader lamang ang maaaring magdagdag o mag-edit ng mga event sa kalendaryo.
:::

## Mga Tala ng Leader {#leader-notes}

Maaaring magtago ng pribadong tala ang mga leader ng grupo tungkol sa grupo -- halimbawa, mga follow-up, pangangailangan sa panalangin, o pastoral na alalahanin -- na hindi kailanman nakikita ng iba pang miyembro ng grupo.

Lumalabas ang seksyong **Leader notes** sa pahina ng grupo para lamang sa mga taong leader ng grupong iyon. Ipinapakita nito ang pinakabagong tala, kung sino ang sumulat nito at kailan, at kung ilan ang kabuuang tala.

1. Sa pahina ng grupo, i-click ang **All notes** sa seksyong **Leader notes**.
2. I-type ang iyong tala sa kahon at i-post ito. Nakalista ang mga tala kasama ang pangalan at larawan ng may-akda.
3. I-click ang link na **Back to** kasama ang pangalan ng grupo para bumalik sa pahina ng grupo.

:::info
Nakikita lamang ng mga leader ng grupo ang mga tala ng leader. Hindi ito nakikita ng ibang miyembro, at hindi rin ng staff o administrator -- kahit may buong pahintulot sila -- maliban kung leader din sila ng grupong iyon. Para bigyan ng access ang ibang tao, [gawin siyang leader](#designating-group-leaders). Nakikita rin ng mga leader ang mga tala na ito sa seksyong **Leader notes** ng pahina ng grupo sa [B1.church](../../b1-church/groups/group-details.md#leader-notes).
:::

## Pagpapadala ng Mensahe sa mga Miyembro ng Grupo

Maaari mong kausapin ang lahat ng miyembro ng grupo nang direkta mula sa B1 Admin:

1. Sa listahan ng miyembro ng grupo, i-click ang icon na **Send a message to members** sa itaas ng listahan.
2. I-type ang iyong mensahe sa text box (o pumili ng isa mula sa **Templates**).
3. I-click ang **Send**.

Maihahatid ang iyong mensahe sa lahat ng miyembro ng grupo.

## Pag-email sa mga Miyembro ng Grupo

Maaari kang magpadala ng naka-format na email sa lahat ng miyembro ng grupo:

1. Mula sa detail page ng grupo, i-click ang button na **Email** sa kaliwang bahagi ng pahina.
2. Bubukas ang dialog na Send Email, na nagpapakita kung ilang miyembro ang makakatanggap ng email at kung ilan ang walang naka-file na email address.
3. Opsyonal, pumili ng **email template** mula sa dropdown, o sumulat ng mensahe mula sa simula. I-click ang **Manage Templates** para gumawa o mag-edit ng mga template.
4. Ilagay ang **subject line**. Maaari kang maglagay ng merge field sa pamamagitan ng pag-click sa mga field chip: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Sumulat ng **email body** gamit ang HTML editor. Available din dito ang parehong merge field.
6. I-click ang **Send**.
7. Ipinapakita ng buod kung ilang email ang matagumpay na naipadala at kung ilang miyembro ang nilaktawan (walang email na naka-file).

:::tip
Gumawa ng mga email template na magagamit muli para sa mga paulit-ulit na komunikasyon gaya ng lingguhang update, anunsyo ng event, o mga kahilingan sa panalangin. Nakakatipid ng oras ang mga template at tinitiyak ang pare-parehong mensahe.
:::

### Pagbuksan ng Group Email para sa Iyong Simbahan {#turning-on-group-email-for-your-church}

Lahat ng simbahan sa B1 ay nagpapadala ng email mula sa parehong address, kaya iisa ang sending reputation nila. Para mapanatili ang email ng lahat sa labas ng spam folder, sinusuri ng koponan ng ChurchApps ang bawat simbahan nang isang beses bago ito makapagpadala ng group email.

Kung hindi pa nasusuri ang iyong simbahan, ipinapakita ng dialog na Send Email ang **Group email needs a quick review** sa halip na message editor:

1. I-click ang **Request review**. Aabisuhan ang support team ng ChurchApps.
2. Magbabago ang dialog at magiging **Review requested**. Maaari mo na itong isara.
3. Karaniwang bubuksan ang group email sa loob ng isang business day. Buksan muli ang dialog na Send Email pagkatapos nito para maipadala ang iyong mensahe.

Hanggang maaprubahan ang iyong simbahan, hindi rin nagpapadala ang B1 ng [mga follow-up email ng form](../forms/creating-forms.md#sending-a-follow-up-email) o ng hakbang na **Send email** sa mga [workflow](../serving/workflows.md).

:::info Mga limitasyon sa pagpapadala
Pagkatapos ng pag-apruba, maaaring magpadala ang isang simbahan ng hanggang 150 email na isinulat ng simbahan kada araw. Tumataas ang limitasyon habang bumubuo ang iyong simbahan ng malinis na sending history, hanggang 2,000 kada araw. Kung may kamakailang mensaheng bumalik (bounced) o namarkahang spam, pansamantalang titigil ang group email at hihilingin ng dialog na makipag-ugnayan sa support. Kung lalampas sa iyong pang-araw-araw na limitasyon ang isang pagpapadala, hindi ito ipapadala ng B1 at magpapakita ng error.
:::

## Pag-text sa mga Miyembro ng Grupo

Kapag nakakonekta na ng iyong simbahan ang isang [texting provider](../settings/church-settings.md#texting), lalabas ang button na **Text** (**Text this group**) sa tabi ng button na **Email** sa pahina ng grupo.

1. Mula sa detail page ng grupo, i-click ang **Text**.
2. Ipinapakita ng dialog kung ilang miyembro ang makakatanggap ng text. Nilalaktawan ang mga miyembrong walang nakalistang mobile phone o nag-opt out.
3. I-type ang iyong mensahe. Para gawin itong personal, i-click ang placeholder chip sa ibaba ng message box -- **First Name**, **Last Name**, **Display Name**, o **Church Name** -- para maipasok ito sa kinaroroonan ng iyong cursor. Pinupunan ang bawat placeholder ng sariling detalye ng tatanggap kapag naipadala na ang text.
4. I-click ang **Send**.

Tingnan ang [Pag-personalize ng mga Text gamit ang Merge Fields](../settings/church-settings.md#personalizing-texts-with-merge-fields) para sa mas detalyadong impormasyon.

## Pag-export ng Datos ng Grupo

Para i-download ang listahan ng miyembro ng grupo bilang file:

1. Sa listahan ng miyembro ng grupo, i-click ang **Export** sa itaas ng listahan.
2. Magda-download sa iyong computer ang isang CSV file na naglalaman ng impormasyon ng mga miyembro ng grupo.

Kapaki-pakinabang ang CSV export para mag-import ng datos sa ibang tool, o para magtago ng offline na tala. Para sa iba pang opsyon sa pag-export, tingnan ang [Pag-export ng Datos](../people/exporting-data.md).

## Pag-print ng Listahan ng Miyembro {#printing-the-member-list}

Sa listahan ng miyembro ng grupo, i-click ang icon na **Print Roll Sheet** (printer) sa itaas ng listahan at pumili ng layout. Bubukas ang pahina sa bagong tab at awtomatikong lilitaw ang print dialog ng iyong browser.

- **Attendance Sheet** -- isang listahan ng klase na walang petsa, na may mga kahong **Present** at **Absent** para markahan ng mga guro nang manu-mano. Tingnan ang [Pag-print ng Roll Sheet](../attendance/recording-attendance.md#printing-a-roll-sheet).
- **Contact Roster** -- isang listahan ng contact para sa grupo, may petsa ngayong araw at nasa itaas ang logo ng iyong simbahan (ang **Light Background Logo** mula sa [Website > Appearance](../website/appearance.md), kung nag-upload ka na nito) kasama ang pangalan ng simbahan sa ilalim, at ang pangalan ng grupo. Bawat miyembro ay may hilera na may kanilang **Name**, **Phone**, **Email**, at **Address**. Nasa unahan ang mga leader at minarkahang **Leader**, sumunod ang iba ayon sa apelyido. Ang numerong ipinapakita ay ang mobile number ng miyembro, o ang kanilang home o work number kung wala silang mobile. Nananatiling blangko ang detalye ng contact para sa sinumang nag-opt out.

:::warning
Naglalaman ang contact roster ng personal na impormasyon sa pakikipag-ugnayan ng mga miyembro. Ibahagi lamang ang mga naka-print na kopya sa mga leader ng grupo at sa iba pang nangangailangan nito.
:::

## Pagpapadala ng Push Notification sa mga Miyembro ng Grupo

Maaari kang magpadala ng push notification nang direkta sa lahat ng miyembro ng grupo na may naka-install na B1.church app sa kanilang device at naka-enable ang push notification.

1. Mula sa detail page ng grupo, i-click ang **Notify** (nasa ibaba ng mga button na **Email** at **Text** -- lalabas ang button na **Text** kapag nakakonekta na ang isang [texting provider](../settings/church-settings.md#texting)).
2. May bubukas na dialog na nagpapakita kung ilan sa mga miyembro ng iyong grupo ang naka-enable ang push.
3. Punan ang detalye ng notification:
   - **Title** *(kinakailangan)* -- Maikling buod, hanggang 80 karakter.
   - **Message** *(kinakailangan)* -- Ang katawan ng notification, hanggang 240 karakter.
   - **Open link or flyer URL** *(opsyonal)* -- Isang relative na app path (halimbawa, `/mobile/groups`) o buong `https://` URL na bubuksan ng notification kapag na-tap.
   - **Image URL** *(opsyonal)* -- Isang `https://` URL ng larawang lalabas kasama ng notification sa mga sinusuportahang device.
4. Ipinapakita ng live preview kung paano lilitaw ang notification sa device.
5. I-click ang **Send Notification**.

:::info
Naihahatid lamang ang mga push notification sa mga miyembro ng grupo na may naka-install na B1.church PWA at hindi nag-disable ng push notification. Ang mga miyembrong walang nakarehistrong push device o may naka-off na push ay binibilang bilang nilaktawan, at ipinapakita ng buod ng pagpapadala kung ilan ang naabot at kung ilan ang nilaktawan.
:::

:::tip
Pagkatapos magpadala, ipinapakita ng dialog kung ilang notification ang matagumpay na naipila. Kung karamihan ng miyembro ay nakalista bilang nilaktawan, paalalahanan sila na bisitahin ang kanilang B1.church site, i-install ito bilang app sa home screen, at payagan ang mga notification kapag hiningi.
:::

## Pag-alis ng mga Miyembro

Para alisin ang isang tao sa grupo, hanapin ang kanyang pangalan sa listahan ng miyembro at i-click ang button na **remove** sa tabi ng kanyang entry.

:::info
Ang pag-alis ng tao sa grupo ay hindi nagbubura sa kanya sa direktoryo ng iyong simbahan. Lalabas pa rin siya sa seksyong [People](../people/adding-people.md) at maaari siyang idagdag muli sa grupo anumang oras.
:::
