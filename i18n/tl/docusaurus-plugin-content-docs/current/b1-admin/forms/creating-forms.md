---
title: "Paggawa ng Mga Form"
---

# Paggawa ng Mga Form

<div class="article-intro">

Gumawa ng sariling form para mangolekta ng impormasyon mula sa iyong kongregasyon. Maaari kang gumawa ng form para sa pagpaparehistro sa event, survey, visitor card, aplikasyon sa membership, at iba pa. Ang mga form ay maaaring i-link sa mga tala ng tao sa iyong database o gamitin bilang mga standalone page na may sarili nilang public URL.

</div>

## Training Video

<YouTube id="sr9wxEj9ghQ" title="Creating Forms and Managing Submissions in B1" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Para sa **People** forms (naka-link sa mga tala ng tao), kailangan mo munang magkaroon ng [mga tao sa iyong database](../people/adding-people.md).
- Para sa mga form na tumatanggap ng **bayad**, dapat ay naka-[Stripe configured for online giving](../donations/online-giving-setup.md) ka muna.

</div>

## Paggawa ng Bagong Form

1. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas ng B1 Admin), i-expand ang **People**, at i-click ang **Forms**.
2. I-click ang **Add Form**.
3. Maglagay ng **name** para sa iyong form.
4. Piliin ang uri ng form mula sa **Associate With** dropdown:
   - **People** -- Iniuugnay ang mga submission sa [mga tala ng tao](../people/adding-people.md) sa iyong database. Pinupunan ang People forms mula sa tala ng isang tao, kaya hindi sila nagkakaroon ng shareable na link.
   - **Stand Alone** -- Gumagawa ng independent na form na may sariling public URL, mainam para sa external na pagpaparehistro. Tanging ang Stand Alone forms ang nag-aalok ng [header photo](#adding-a-header-photo), [QR code](#sharing-a-form-with-a-qr-code), [naka-link na group](#linking-a-form-to-a-group), at **Create a person record from submissions**.
5. I-click ang **Save** para magawa ang form.

Lalabas ang bago mong form sa listahan. I-click ito para magsimulang magdagdag ng mga tanong.

## Pag-print ng Blangkong Form {#printing-a-blank-form}

Kailangan ng papel na kopya na ibibigay -- para sa visitor card sa welcome desk, o para sa form na mapupunan ng taong walang internet? I-click ang **Print** sa tabi ng form sa pangunahing listahan ng Forms para buksan ang preview, saka i-click ang **Print**. Ang mga blangkong field ay ipi-print na may salungguhit o checkbox para sa bawat tanong para mapunan ng kamay; ang mga kinakailangang tanong ay minarkahan ng asterisk. Sa itaas ng pahina ay makikita ang logo ng iyong simbahan (ang **Light Background Logo** mula sa [Website > Appearance](../website/appearance.md), kung nag-upload ka na nito) na may pangalan ng simbahan sa ilalim, at pagkatapos ay ang pangalan ng form. Wala nang ibang opsyon sa pag-print -- i-print ang buong form o wala.

## Pagbabahagi ng Form gamit ang QR Code {#sharing-a-form-with-a-qr-code}

Ang mga Stand Alone form ay may link na **QR Code** sa tabi nila sa pangunahing listahan ng Forms (hindi ito lumalabas sa mga naka-archive na form). I-click ito para buksan ang QR code para sa public URL ng form, na may link na nakalagay sa ilalim. I-click ang **Download PNG** para i-save ang code bilang larawan na maaari mong i-print sa bulletin o ipakita sa mga slide. Ang sinumang mag-scan nito ay magbubukas ng form sa kanilang telepono.

## Pagdaragdag ng mga Tanong {#adding-questions}

1. Buksan ang iyong form at pumunta sa tab na **Questions**.
2. I-click ang **Add Question**.
3. Pumili ng **field type** mula sa Provider dropdown. Kabilang sa mga available na uri ang:
   - **Textbox** -- Para sa maikling sagot na teksto
   - **Date** -- Para sa pagpili ng petsa
   - **Email** -- Para sa mga email address
   - **Phone Number** -- Para sa input ng numero ng telepono
   - **Multiple Choice** -- Para sa pagpili mula sa mga nakatakdang opsyon
   - **Payment** -- Para sa pangongolekta ng bayad
4. Maglagay ng **Title** at opsyonal na **Description** para sa tanong. Lalabas ang paglalarawan sa ilalim ng tanong kapag pinupunan ng mga tao ang form, kaya gamitin ito para sa mga paalala tulad ng "Isama ang anumang allergy na dapat naming malaman."
5. Lagyan ng check ang **Require an answer** kung sapilitan ang field.
6. I-click ang **Save**.
7. Ulitin para magdagdag ng iba pang tanong.

:::warning
Kailangang naka-configure ang Stripe para sa **Payment** field type. Kung hindi mo pa na-set up ang online giving, tingnan ang [Online Giving Setup](../donations/online-giving-setup.md) bago magdagdag ng payment fields.
:::

## Pamamahala ng Form Members {#managing-form-members}

1. Buksan ang iyong form at pumunta sa tab na **Form Members**.
2. Maghanap ng tao at idagdag siya na may role:
   - **Admin** -- Maaaring i-edit ang form at tingnan ang lahat ng submission.
   - **View Only** -- Maaaring tingnan ang mga submission pero hindi maaaring i-edit ang form.

## Pag-link ng Form sa Group {#linking-a-form-to-a-group}

Maaari mong i-link ang anumang Stand Alone form sa isang group -- halimbawa, isang prayer request form para sa maliit na grupo, o medical release para sa youth trip:

1. Buksan ang **Details** ng iyong form.
2. Sa ilalim ng **Linked group**, piliin ang group, o iwan itong nakatakda sa **None**.
3. I-click ang **Save**.

Kapag na-link na ang form:

- Makikita ng **mga miyembro ng group** ang form sa seksyong **Forms** sa pahina ng group sa B1.church habang bukas pa ang form, na may button na **Fill out** na nagbubukas nito (tingnan ang [Group Details](../../b1-church/groups/group-details.md#linked-forms)).
- Makikita rin ng **mga lider ng group** ang mga sarado nang form, at mababasa ang sagot ng bawat submission at maipi-print ang mga ito (isang submission o **Print all**). Mga sagot lang ang makikita ng mga lider -- hindi nila maaaring i-edit ang form maliban kung sila rin ay [form members](#managing-form-members).
- **Sa B1 Admin**, ipinapakita ng pahina ng group ang seksyong **Linked forms** na naglilista ng bawat naka-link na form bilang **Open** o **Closed**. Lumalabas ito para sa mga lider ng group at sa mga taong maaaring mangasiwa ng mga form. Tingnan ang [Group Members](../groups/group-members.md#linked-forms).

Sarado ang isang form kapag nasa labas ito ng panahon ng availability nito. Hindi ipinapakita sa pahina ng group ang mga naka-archive na form.

### Awtomatikong Pagdaragdag ng mga Nagsumite sa Group {#automatically-adding-submitters-to-a-group}

Hindi awtomatikong nagdaragdag ng sinuman sa group ang pag-link ng form sa group. Para idagdag ang bawat nagsumite sa roster ng naka-link na group, i-on rin ang **Create a person record from submissions** sa mga detalye ng form at i-click ang **Save**.

Sa bawat pagsusumite, ang tugmang tao o bagong likhang tala ng tao ay idaragdag sa group (lalaktawan ang mga miyembro ng group na nandoon na). Kapaki-pakinabang ito para sa mga bagay tulad ng camp sign-up form na dapat awtomatikong bumuo ng roster ng group ng camp.

### Pagpapadala ng Follow-up Email

Kapag naka-on ang **Create a person record from submissions**, maaari mo ring i-email ang bawat taong magsumite ng form. Punan ang **Follow-up Email Subject** at **Follow-up Email Body** sa mga detalye ng form. Maaari mong gamitin ang mga token na `{firstName}` at `{churchName}` sa parehong field. Ipapadala lang ang email kapag napunan ang parehong field.

:::info
Ipapadala lang ang follow-up emails pagkatapos maaprubahan ang iyong simbahan na magpadala ng group email, at ibinibilang ang mga ito sa araw-araw na limitasyon ng email ng iyong simbahan. Tingnan ang [Turning On Group Email for Your Church](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Pagkopya ng Form

Para gamitin ang isang form bilang panimulang punto ng bago, i-click ang **Duplicate** sa tabi ng form sa listahan ng Forms at kumpirmahin. Gagawa ang B1 ng eksaktong kopya ng form -- kasama ang lahat ng tanong -- na maaari mong palitan ang pangalan at i-edit nang hiwalay.

:::tip
Nakakatulong ang pagkopya para sa mga umuulit na event kung saan nananatiling pareho ang mga tanong sa pagpaparehistro taon-taon. Kopyahin ang form ng nakaraang taon, i-update ang pangalan at petsa, at handa ka na.
:::

## Pag-configure ng Mga Katangian ng Form

Maaari mong i-update ang pangalan at mga setting ng iyong form anumang oras. Para sa Stand Alone forms, makikita mo rin ang natatanging **public URL** na maaari mong ibahagi kahit kanino, kasama ang field na **Description** -- tekstong ipinapakita sa itaas ng mga tanong sa public form page, kapaki-pakinabang para sabihin sa mga tao kung para saan ang form bago nila ito punan.

### Pagdaragdag ng Header Photo {#adding-a-header-photo}

Maaaring magpakita ng **Header Photo** sa itaas ng form ang Stand Alone forms. Sa mga detalye ng form, i-click ang kahon ng larawan o ang **Add Photo**, pagkatapos ay pumili o mag-upload ng larawan (gugupitin ito sa 16:9 na hugis). I-click ang **Save**. Lalabas ang larawan sa ilalim ng pangalan ng form, sa itaas ng paglalarawan, sa public URL page ng form, at saanman naka-embed ang form gamit ang website na **Form** element. Gamitin ang **Change Photo** para palitan ito o ang **Remove** para alisin ito.

Gamitin ang field na **Thank You Message** para itakda kung ano ang makikita ng mga tao pagkatapos nilang isumite ang form, kasama na sa public URL page ng form. Kung iiwan itong blangko, makikita nila ang "Thank you for submitting the form!"

:::tip
Mainam ang Stand Alone forms para sa mga pagpaparehistro sa event. Ibahagi ang public URL sa pamamagitan ng email, social media, o i-embed nang direkta ang form sa website ng iyong simbahan.
:::

:::info
Para i-embed ang form sa iyong B1 website, pumunta sa website editor, magdagdag ng bagong section, at piliin ang **Form** element. Pagkatapos ay piliin ang form na nais mong ipakita. Tingnan ang [Managing Pages](../website/managing-pages.md) para sa mga detalye tungkol sa pag-edit ng iyong website.
:::
