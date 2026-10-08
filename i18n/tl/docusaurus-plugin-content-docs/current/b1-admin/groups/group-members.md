---
title: "Mga Miyembro ng Group"
---

# Mga Miyembro ng Group

<div class="article-intro">

Kapag nagawa na ninyo ang isang group, ang susunod na hakbang ay ang pagdaragdag ng mga miyembro. Mula sa detail page ng group, maaari kayong maghanap ng mga tao, idagdag sila sa group, magtalaga ng mga leader, magpadala ng mga mensahe, at mag-export ng listahan ng mga miyembro. Mahalaga ang pamamahala ng pagiging miyembro ng group para sa pag-uugnay ng mga small group, komite, at klase.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan ninyo ng kahit isang group na naka-set up sa B1 Admin. Tingnan ang [Paggawa ng mga Group](creating-groups.md) kung hindi pa kayo nakakagawa.
- Dapat nasa inyong [People](../people/adding-people.md) directory na ang mga taong nais ninyong idagdag. Kung wala pa ang isang tao, maaari ninyo siyang gawin mula sa member search (tingnan sa ibaba).

</div>

## Pagdaragdag ng mga Miyembro sa Group

1. Sa [Jump menu](../introduction.md#getting-around-with-the-jump-menu), piliin ang **People > Groups** at i-click ang group na nais ninyong pamahalaan.
2. I-click ang tab na **Members**.
3. Sa search box, i-type ang pangalan ng taong nais ninyong idagdag.
4. I-click ang **Add** sa tabi ng pangalan ng tao sa mga resulta ng paghahanap.
5. Lalabas na ang tao sa listahan ng mga miyembro ng group.

:::tip
Iwanang blangko ang search box at i-click ang **Search** para i-browse ang inyong buong directory. Kapaki-pakinabang ito kung hindi kayo sigurado sa eksaktong baybay ng pangalan ng isang tao.
:::

### Pagdaragdag ng Taong Wala pa sa B1

Kung walang makita sa inyong paghahanap, ipapakita ng search ang **No records found** na may link na **Add New Person**. I-click ito, ilagay ang first name, last name, at (opsyonal) email ng tao, at i-click ang **Add**. Ang bagong tao ay gagawin sa inyong People directory at idaragdag sa group sa iisang hakbang -- hindi na ninyo kailangang hanapin pa siya ulit.

## Pagtatalaga ng mga Group Leader

May mga espesyal na pribilehiyo ang mga group leader -- maaari nilang i-edit ang [calendar ng group](group-calendar.md), pamahalaan ang mga event, at tumulong sa pag-uugnay ng group.

1. Sa listahan ng mga miyembro ng group, hanapin ang taong nais ninyong gawing leader.
2. I-click ang **green key icon** sa tabi ng pangalan niya.
3. Naitalaga na ang tao bilang group leader.

Para alisin ang pagiging leader, i-click muli ang green key icon.

:::info
Sinumang miyembro ng group ay maaaring tumingin ng calendar at mga event ng group, pero mga leader lang ang maaaring magdagdag o mag-edit ng mga calendar event.
:::

## Pagpapadala ng mga Mensahe sa mga Miyembro ng Group

Maaari kayong makipag-ugnayan sa lahat ng miyembro ng isang group direkta mula sa B1 Admin:

1. Mula sa group detail page, hanapin ang messaging area.
2. I-type ang inyong mensahe sa text box.
3. I-click ang **Send**.

Maihahatid ang inyong mensahe sa lahat ng miyembro ng group.

## Pag-email sa mga Miyembro ng Group

Maaari kayong magpadala ng mga naka-format na email sa lahat ng miyembro ng isang group:

1. Mula sa group detail page, i-click ang **email icon**.
2. Magbubukas ang Send Email dialog, na nagpapakita kung ilang miyembro ang makakatanggap ng email at kung ilan ang walang email address na naka-file.
3. Opsyonal na pumili ng **email template** mula sa dropdown, o sumulat ng mensahe mula sa simula. I-click ang **Manage Templates** para gumawa o mag-edit ng mga template.
4. Maglagay ng **subject line**. Maaari kayong magsingit ng mga merge field sa pamamagitan ng pag-click sa mga field chip: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Buuin ang **email body** gamit ang HTML editor. Available din dito ang parehong mga merge field.
6. I-click ang **Send**.
7. Magpapakita ang isang buod kung ilang email ang matagumpay na naipadala at kung ilang miyembro ang nilaktawan (walang email na naka-file).

:::tip
Gumawa ng mga reusable na email template para sa mga paulit-ulit na komunikasyon tulad ng lingguhang update, anunsyo ng event, o prayer request. Nakakatipid ng oras ang mga template at tinitiyak nilang pare-pareho ang mensahe.
:::

### Pag-on ng Group Email para sa Inyong Simbahan

Lahat ng simbahan sa B1 ay nagpapadala ng email mula sa iisang address, kaya iisa ang kanilang sending reputation. Para hindi mapunta sa spam folder ang email ng lahat, sinusuri ng ChurchApps team ang bawat simbahan nang isang beses bago ito makapagpadala ng group email.

Kung hindi pa nasusuri ang inyong simbahan, ipapakita ng Send Email dialog ang **Group email needs a quick review** sa halip na ang message editor:

1. I-click ang **Request review**. Maaabisuhan ang ChurchApps support team.
2. Magiging **Review requested** ang dialog. Maaari na ninyo itong isara.
3. Karaniwang naka-on na ang group email sa loob ng isang business day. Buksan muli ang Send Email dialog pagkatapos nito para ipadala ang inyong mensahe.

Hangga't hindi pa naaprubahan ang inyong simbahan, hindi rin magpapadala ang B1 ng [mga follow-up email ng form](../forms/creating-forms.md#sending-a-follow-up-email) o ng hakbang na **Send email** sa mga [workflow](../serving/workflows.md).

:::info Mga limitasyon sa pagpapadala
Pagkatapos maaprubahan, ang isang simbahan ay maaaring magpadala ng hanggang 150 email na isinulat ng simbahan kada araw. Lumalaki ang limitasyon habang bumubuo ang inyong simbahan ng malinis na kasaysayan ng pagpapadala, hanggang 2,000 kada araw. Kung bumalik (bounce) ang mga kamakailang mensahe o namarkahang spam, magpa-pause ang group email at hihilingin ng dialog na makipag-ugnayan kayo sa support. Kung lalampas sa inyong pang-araw-araw na limitasyon ang isang pagpapadala, hindi ito ipapadala ng B1 at magpapakita ito ng error.
:::

## Pag-text sa mga Miyembro ng Group

Kapag nakakonekta na ng inyong simbahan ang isang [texting provider](../settings/church-settings.md#texting), lalabas sa header ng group ang isang text icon (**Text this group**).

1. Mula sa group detail page, i-click ang **text icon**.
2. Ipinapakita ng dialog kung ilang miyembro ang makakatanggap ng text. Lalaktawan ang mga miyembrong walang mobile phone na naka-file o nag-opt out.
3. I-type ang inyong mensahe. Para i-personalize ito, i-click ang isang placeholder chip sa ibaba ng message box -- **First Name**, **Last Name**, **Display Name**, o **Church Name** -- para isingit ito sa kinaroroonan ng inyong cursor. Pupunan ang bawat placeholder ng sariling detalye ng tatanggap kapag ipinadala ang text.
4. I-click ang **Send**.

Tingnan ang [Pag-personalize ng mga Text gamit ang Merge Field](../settings/church-settings.md#personalizing-texts-with-merge-fields) para sa higit pang detalye.

## Pag-export ng Datos ng Group

Para i-download ang listahan ng mga miyembro ng group bilang file:

1. Mula sa group detail page, i-click ang **download icon**.
2. Magda-download sa inyong computer ang isang CSV file na naglalaman ng impormasyon ng mga miyembro ng group.

Kapaki-pakinabang ang CSV export para mag-import ng datos sa ibang mga tool, o magtago ng mga offline na record. Para sa higit pang opsyon sa pag-export, tingnan ang [Pag-export ng Datos](../people/exporting-data.md).

## Pag-print ng Listahan ng mga Miyembro {#printing-the-member-list}

I-click ang icon na **Print Roll Sheet** (printer) sa itaas ng listahan ng mga miyembro at pumili ng layout. Magbubukas ang pahina sa bagong tab at awtomatikong lalabas ang print dialog ng iyong browser.

- **Attendance Sheet** -- isang listahan ng klase na walang petsa, na may mga kahong **Present** at **Absent** para markahan ng mga guro nang mano-mano. Tingnan ang [Pag-print ng Roll Sheet](../attendance/recording-attendance.md#printing-a-roll-sheet).
- **Contact Roster** -- isang listahan ng contact para sa group, may petsa ngayong araw at may heading na pangalan ng iyong simbahan at pangalan ng group. May row ang bawat miyembro na may kanyang **Name**, **Phone**, **Email**, at **Address**. Nauuna sa listahan ang mga lider at minamarkahan ng **Leader**, kasunod ang iba pa ayon sa apelyido. Ang ipinapakitang telepono ay ang mobile number ng miyembro, o ang kanyang numero sa bahay o trabaho kung walang mobile. Iniiwang blangko ang mga detalye ng contact ng sinumang nag-opt out.

:::warning
Naglalaman ang contact roster ng personal na impormasyon sa pakikipag-ugnayan ng mga miyembro. Ibahagi lamang ang mga naka-print na kopya sa mga lider ng group at sa iba pang nangangailangan nito.
:::

## Pagpapadala ng mga Push Notification sa mga Miyembro ng Group

Maaari kayong magpadala ng push notification direkta sa lahat ng miyembro ng group na may naka-install na B1.church app sa kanilang device at naka-enable ang push notification.

1. Mula sa group detail page, i-click ang **bell icon** sa header toolbar (sa tabi ng mga email at text icon -- lalabas ang text icon kapag nakakonekta na ang isang [texting provider](../settings/church-settings.md#texting)).
2. Magbubukas ang isang dialog na nagpapakita kung ilan sa mga miyembro ng inyong group ang naka-enable ang push.
3. Punan ang mga detalye ng notification:
   - **Title** *(kinakailangan)* -- Maikling buod, hanggang 80 character.
   - **Message** *(kinakailangan)* -- Ang laman ng notification, hanggang 240 character.
   - **Open link or flyer URL** *(opsyonal)* -- Isang relative app path (halimbawa, `/mobile/groups`) o buong `https://` URL na bubuksan ng notification kapag na-tap.
   - **Image URL** *(opsyonal)* -- Isang `https://` URL ng larawang lalabas kasama ng notification sa mga sinusuportahang device.
4. Magpapakita ang isang live preview kung paano lalabas ang notification sa device.
5. I-click ang **Send Notification**.

:::info
Ang mga push notification ay ihahatid lang sa mga miyembro ng group na may naka-install na B1.church PWA at hindi nag-disable ng push notification. Ang mga miyembrong walang nakarehistrong push device o naka-off ang push ay ibibilang bilang nilaktawan, at ipinapakita ng buod ng pagpapadala kung ilan ang naabot kumpara sa nilaktawan.
:::

:::tip
Pagkatapos magpadala, ipapakita ng dialog kung ilang notification ang matagumpay na na-queue. Kung karamihan sa mga miyembro ay nakalista bilang nilaktawan, paalalahanan silang bisitahin ang kanilang B1.church site, i-install ito bilang home-screen app, at payagan ang mga notification kapag tinanong.
:::

## Pag-alis ng mga Miyembro

Para mag-alis ng tao sa isang group, hanapin ang kanyang pangalan sa listahan ng mga miyembro at i-click ang button na **remove** sa tabi ng kanyang entry.

:::info
Hindi nade-delete sa inyong church directory ang isang tao kapag inalis siya sa group. Lalabas pa rin siya sa seksyong [People](../people/adding-people.md) at maaaring idagdag muli sa group anumang oras.
:::
