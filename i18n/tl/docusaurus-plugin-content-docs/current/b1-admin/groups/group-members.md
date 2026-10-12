---
title: "Mga Miyembro ng Group"
---

# Mga Miyembro ng Group

<div class="article-intro">

Kapag nakagawa na kayo ng group, ang susunod na hakbang ay ang pagdaragdag ng mga miyembro. Mula sa detail page ng isang group, maaari kayong maghanap ng mga tao, idagdag sila sa group, magtalaga ng mga leader, magpadala ng mensahe, at i-export ang listahan ng miyembro. Mahalaga ang pamamahala ng membership ng group para sa maayos na pagpapatakbo ng mga small group, komite, at klase.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan ninyo ng kahit isang group na naka-set up sa B1 Admin. Tingnan ang [Paggawa ng mga Group](creating-groups.md) kung wala pa kayong nagawang group.
- Dapat nasa inyong direktoryo ng [People](../people/adding-people.md) na ang mga taong nais ninyong idagdag. Kung wala pa sila roon, maaari ninyo silang gawin mula sa member search (tingnan sa ibaba).

</div>

## Pagdaragdag ng mga Miyembro sa Group {#adding-members-to-a-group}

1. Sa [Jump menu](../introduction.md#getting-around-with-the-jump-menu), piliin ang **People > Groups** at i-click ang group na nais ninyong pamahalaan.
2. Sa seksyong **Members** ng pahina ng group, i-click ang **All members**. (Ang mga team at ministry ay direktang bumubukas sa kanilang listahan ng miyembro.)
3. Sa kahon na **Add Person** sa ibaba ng listahan ng miyembro, i-type ang pangalan ng taong nais ninyong idagdag at pindutin ang **Enter** o i-click ang search icon.
4. I-click ang pangalan ng tao, o ang add icon sa tabi nito, sa mga resulta ng paghahanap.
5. Lalabas na ngayon ang tao sa listahan ng miyembro ng group.

:::tip
Bago kayo mag-type ng kahit ano, ipinapakita ng kahon na **Add Person** ang maikling listahan ng mga **Recent people** na maaari ninyong idagdag sa isang click.
:::

Kapag tapos na kayo, i-click ang link na **Back to** kasama ang pangalan ng group para bumalik sa pahina ng group. Ipinapakita ng pahina ng group ang buod ng **Members**, **Sessions**, **Calendar**, at **Health** ng group, na may kanya-kanyang link papunta sa buong view nito.

### Pagdaragdag ng Taong Wala pa sa B1 {#adding-someone-who-isnt-in-b1-yet}

Kung walang makita ang paghahanap, magpapakita ang search ng **No records found** kasama ang link na **Add New Person**. I-click ito, ilagay ang unang pangalan, apelyido, at (opsyonal) email ng tao, at i-click ang **Add**. Ang bagong tao ay malilikha sa inyong People directory at idadagdag sa group sa isang hakbang lamang—hindi na ninyo kailangang hanapin muli siya.

## Pagtatalaga ng mga Group Leader {#designating-group-leaders}

May espesyal na pribilehiyo ang mga group leader—maaari nilang i-edit ang [group calendar](group-calendar.md), pamahalaan ang mga event, at tumulong sa pag-coordinate ng group.

1. Sa listahan ng miyembro ng group, hanapin ang taong nais ninyong gawing leader.
2. I-click ang **star icon** (**Make Leader**) sa tabi ng pangalan niya.
3. Itinalaga na ang tao bilang group leader at magpapakita siya ng badge na **Leader**.

Para alisin ang status ng leader, i-click muli ang star icon (**Remove Leader Access**).

:::info
Maaaring tingnan ng sinumang miyembro ng group ang group calendar at mga event, pero ang mga leader lamang ang maaaring magdagdag o mag-edit ng mga event sa calendar.
:::

## Pagpapadala ng Mensahe sa mga Miyembro ng Group {#sending-messages-to-group-members}

Maaari ninyong makipag-usap sa lahat ng miyembro ng group nang direkta mula sa B1 Admin:

1. Sa listahan ng miyembro ng group, i-click ang icon na **Send a message to members** sa itaas ng listahan.
2. I-type ang inyong mensahe sa text box (o pumili ng isa mula sa **Templates**).
3. I-click ang **Send**.

Ihahatid ang inyong mensahe sa lahat ng miyembro ng group.

## Pag-email sa mga Miyembro ng Group {#emailing-group-members}

Maaari kayong magpadala ng naka-format na email sa lahat ng miyembro ng group:

1. Mula sa detail page ng group, i-click ang button na **Email** sa kaliwang bahagi ng pahina.
2. Magbubukas ang Send Email dialog, na nagpapakita kung ilang miyembro ang makakatanggap ng email at kung ilan ang walang naka-file na email address.
3. Opsyonal, pumili ng **email template** mula sa dropdown, o sumulat ng mensahe mula sa simula. I-click ang **Manage Templates** para gumawa o mag-edit ng mga template.
4. Ilagay ang **subject line**. Maaari kayong maglagay ng merge field sa pamamagitan ng pag-click sa mga field chip: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Isulat ang **email body** gamit ang HTML editor. Available din dito ang parehong merge field.
6. I-click ang **Send**.
7. Magpapakita ng buod kung ilang email ang matagumpay na naipadala at kung ilang miyembro ang nilaktawan (walang naka-file na email).

:::tip
Gumawa ng mga reusable na email template para sa mga paulit-ulit na komunikasyon, tulad ng lingguhang update, anunsyo ng event, o prayer request. Nakakatipid ng oras ang mga template at tinitiyak ang pare-parehong mensahe.
:::

### Pag-on ng Group Email para sa Inyong Simbahan {#turning-on-group-email-for-your-church}

Ang lahat ng simbahan sa B1 ay nagpapadala ng email mula sa iisang address, kaya nagbabahagi sila ng iisang sending reputation. Para mapanatiling wala sa spam folder ang email ng lahat, sinusuri ng ChurchApps team ang bawat simbahan nang isang beses bago ito makapagpadala ng group email.

Kung hindi pa nasusuri ang inyong simbahan, ipapakita ng Send Email dialog ang **Group email needs a quick review** sa halip na message editor:

1. I-click ang **Request review**. Aabisuhan ang support team ng ChurchApps.
2. Magbabago ang dialog at magiging **Review requested**. Maaari na ninyo itong isara.
3. Karaniwang nabubuksan ang group email sa loob ng isang business day. Buksan muli ang Send Email dialog pagkatapos nito para ipadala ang inyong mensahe.

Hangga't hindi naaprubahan ang inyong simbahan, hindi rin magpapadala ang B1 ng [form follow-up email](../forms/creating-forms.md#sending-a-follow-up-email) o ang hakbang na **Send email** sa [workflows](../serving/workflows.md).

:::info Mga limitasyon sa pagpapadala
Pagkatapos maaprubahan, maaaring magpadala ang isang simbahan ng hanggang 150 email na isinulat ng simbahan kada araw. Tumataas ang limitasyon habang bumubuo ang simbahan ng malinis na kasaysayan ng pagpapadala, hanggang 2,000 kada araw. Kung may mga mensaheng bumalik (bounced) o namarkahang spam kamakailan, mapapatigil ang group email at hihilingin ng dialog na makipag-ugnayan sa support. Kung lalampas sa araw-araw na limitasyon ang isang pagpapadala, hindi ito ipapadala ng B1 at magpapakita ito ng error.
:::

## Pag-text sa mga Miyembro ng Group {#texting-group-members}

Kapag nakakonekta na ng inyong simbahan ang isang [texting provider](../settings/church-settings.md#texting), lalabas ang isang button na **Text** (**Text this group**) sa tabi ng button na **Email** sa pahina ng group.

1. Mula sa detail page ng group, i-click ang **Text**.
2. Ipinapakita ng dialog kung ilang miyembro ang makakatanggap ng text. Lalaktawan ang mga miyembrong walang naka-file na mobile phone o nag-opt out.
3. I-type ang inyong mensahe. Para gawing personal ito, i-click ang placeholder chip sa ibaba ng message box—**First Name**, **Last Name**, **Display Name**, o **Church Name**—para ilagay ito sa kinaroroonan ng inyong cursor. Pupunan ang bawat placeholder ng sariling detalye ng tatanggap kapag naipadala na ang text.
4. I-click ang **Send**.

Tingnan ang [Pag-personalize ng mga Text gamit ang Merge Field](../settings/church-settings.md#personalizing-texts-with-merge-fields) para sa mas detalyadong impormasyon.

## Pag-export ng Datos ng Group {#exporting-group-data}

Para i-download ang listahan ng miyembro ng group bilang file:

1. Sa listahan ng miyembro ng group, i-click ang **Export** sa itaas ng listahan.
2. Made-download sa inyong computer ang CSV file na naglalaman ng impormasyon ng mga miyembro ng group.

Kapaki-pakinabang ang CSV export para mag-import ng datos sa ibang tool, o para magtago ng offline na talaan. Para sa iba pang opsyon sa pag-export, tingnan ang [Pag-export ng Datos](../people/exporting-data.md).

## Pag-print ng Listahan ng mga Miyembro {#printing-the-member-list}

Sa listahan ng miyembro ng group, i-click ang icon na **Print Roll Sheet** (printer) sa itaas ng listahan at pumili ng layout. Magbubukas ang pahina sa bagong tab at awtomatikong lilitaw ang print dialog ng inyong browser.

- **Attendance Sheet** -- Isang listahan ng klase na walang petsa, may mga kahon na **Present** at **Absent** para markahan ng mga guro sa pamamagitan ng kamay. Tingnan ang [Pag-print ng Roll Sheet](../attendance/recording-attendance.md#printing-a-roll-sheet).
- **Contact Roster** -- Listahan ng contact para sa group, may petsa ngayong araw at may logo ng simbahan (ang **Light Background Logo** mula sa [Website > Appearance](../website/appearance.md), kung nag-upload na kayo nito) at pangalan ng simbahan sa ilalim, at ang pangalan ng group. May hilera ang bawat miyembro para sa kanilang **Name**, **Phone**, **Email**, at **Address**. Nauuna sa listahan ang mga leader at minarkahan ng **Leader**, saka ang iba pa ayon sa apelyido. Ang numerong ipinapakita ay ang mobile number ng miyembro, o ang home o work number niya kung walang mobile. Nananatiling blangko ang mga detalye ng contact ng sinumang nag-opt out.

:::warning
Naglalaman ang contact roster ng personal na impormasyon sa contact ng mga miyembro. Ibahagi lamang ang mga naka-print na kopya sa mga leader ng group at sa iba pang nangangailangan nito.
:::

## Pagpapadala ng Push Notification sa mga Miyembro ng Group {#sending-push-notifications-to-group-members}

Maaari kayong magpadala ng push notification nang direkta sa lahat ng miyembro ng group na may naka-install na B1.church app sa kanilang device at naka-on ang push notification.

1. Mula sa detail page ng group, i-click ang **Notify** (sa ibaba ng mga button na **Email** at **Text**—lalabas ang button na **Text** kapag nakakonekta na ang isang [texting provider](../settings/church-settings.md#texting)).
2. Magbubukas ang isang dialog na nagpapakita kung ilang miyembro ng group ninyo ang naka-enable ang push.
3. Punan ang detalye ng notification:
   - **Title** *(kinakailangan)* -- Maikling buod, hanggang 80 character.
   - **Message** *(kinakailangan)* -- Katawan ng notification, hanggang 240 character.
   - **Open link or flyer URL** *(opsyonal)* -- Isang relative na app path (halimbawa, `/mobile/groups`) o buong `https://` URL na bubukas kapag na-tap ang notification.
   - **Image URL** *(opsyonal)* -- Isang `https://` URL ng larawang lalabas kasabay ng notification sa mga suportadong device.
4. Ipinapakita ng live preview kung paano lilitaw ang notification sa device.
5. I-click ang **Send Notification**.

:::info
Naihahatid lamang ang push notification sa mga miyembro ng group na may naka-install na B1.church PWA at hindi pa nag-o-off ng push notification. Ang mga miyembrong walang nakarehistrong push device o naka-off ang push ay binibilang bilang nilaktawan, at ipinapakita ng buod ng pagpapadala kung ilan ang naabot at ilan ang nilaktawan.
:::

:::tip
Pagkatapos magpadala, ipapakita ng dialog kung ilang notification ang matagumpay na naila-queue. Kung karamihan ng miyembro ay nakalista bilang nilaktawan, paalalahanan sila na bisitahin ang kanilang B1.church site, i-install ito bilang app sa home screen, at payagan ang mga notification kapag hiningi.
:::

## Pag-alis ng mga Miyembro {#removing-members}

Para alisin ang isang tao sa group, hanapin ang pangalan niya sa listahan ng miyembro at i-click ang **remove** button sa tabi ng kanyang entry.

:::info
Ang pag-alis ng isang tao sa group ay hindi siya tinatanggal sa inyong direktoryo ng simbahan. Lalabas pa rin siya sa seksyong [People](../people/adding-people.md) at maaari siyang muling idagdag sa group anumang oras.
:::
