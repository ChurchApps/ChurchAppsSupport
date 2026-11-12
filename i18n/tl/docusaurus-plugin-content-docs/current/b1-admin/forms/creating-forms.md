---
title: "Paggawa ng Mga Form"
description: "Gumawa ng custom na form sa B1 Admin para sa event registration, survey, at visitor card, pagkatapos ibahagi ang mga ito sa pamamagitan ng link, QR code, o print."
---

# Paggawa ng Mga Form

<div class="article-intro">

Gumawa ng custom na form para mangolekta ng impormasyon mula sa iyong kongregasyon. Maaari kang gumawa ng mga form para sa event registration, survey, visitor card, membership application, at iba pa. Maaaring naka-link ang mga form sa mga tao sa iyong database o gamitin bilang stand-alone na pahina na may sariling public URL.

</div>

## Training Video {#training-video}

<YouTube id="UZ4dGCNIFw4" title="Creating Forms and Managing Submissions in B1" next="Launching Your Church Website in B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Para sa mga **People** form (naka-link sa person record), kailangan mo munang may [mga tao sa iyong database](../people/adding-people.md).
- Para sa mga form na nangongolekta ng **bayad**, dapat naka-[configure ang Stripe para sa online giving](../donations/online-giving-setup.md).

</div>

## Paggawa ng Bagong Form {#creating-a-new-form}

1. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas ng B1 Admin), i-expand ang **People**, at i-click ang **Forms**.
2. I-click ang **Add Form**.
3. Maglagay ng **name** para sa iyong form.
4. Piliin ang uri ng form mula sa **Associate With** dropdown:
   - **People** -- Iniuugnay ang mga submission sa [mga person record](../people/adding-people.md) sa iyong database. Pinupunan ang People form mula sa record ng isang tao, kaya walang maibabahaging link ang mga ito.
   - **Stand Alone** -- Gumagawa ng hiwalay na form na may sariling public URL, mainam para sa mga external na registration. Tanging ang Stand Alone form ang may [header photo](#adding-a-header-photo), [QR code](#sharing-a-form-with-a-qr-code), [naka-link na grupo](#linking-a-form-to-a-group), at **Create a person record from submissions**.
5. Para sa Stand Alone form, maaari mong punan ang iba pang [properties](#configuring-form-properties) ngayon o mamaya.
6. I-click ang **Save** para gawin ang form.

Lalabas sa listahan ang bago mong form. I-click ito para magsimulang magdagdag ng mga tanong.

## Pag-print ng Blangkong Form {#printing-a-blank-form}

Kailangan ng papel na kopya na ipamimigay -- para sa visitor card sa welcome desk, o form na mapupunan ng taong walang internet sa pamamagitan ng kamay? I-click ang **Print** sa tabi ng form sa pangunahing listahan ng Forms para magbukas ng preview, pagkatapos i-click ang **Print**. Naka-print ang mga blangkong field na may salungguhit o checkbox para sa bawat tanong para mapunan ng kamay; minamarkahan ng asterisk ang mga kinakailangang tanong. Sa itaas ng pahina ay ang logo ng iyong simbahan (ang **Light Background Logo** mula sa [Website > Appearance](../website/appearance.md), kung nag-upload ka nito) na may pangalan ng iyong simbahan sa ilalim, kasunod ang pangalan ng form. Walang ibang opsyon sa pag-print -- buong form ang iniimprenta o wala talaga.

## Pagbabahagi ng Form sa Pamamagitan ng QR Code {#sharing-a-form-with-a-qr-code}

May link na **QR Code** sa tabi ng mga Stand Alone form sa pangunahing listahan ng Forms (wala nito ang mga naka-archive). I-click ito para buksan ang QR code para sa public URL ng form, na may link na nakalagay sa ilalim. I-click ang **Download PNG** para i-save ang code bilang larawang maaari mong i-print sa bulletin o ipakita sa slides. Ang sinumang mag-scan nito ay magbubukas ng form sa kanilang telepono.

## Pagdaragdag ng Mga Tanong {#adding-questions}

1. Buksan ang iyong form at pumunta sa tab na **Questions**.
2. I-click ang **Add Question**.
3. Piliin ang **Field Type**:
   - **Textbox** -- Para sa maiikling sagot na teksto
   - **Whole Number** at **Decimal** -- Para sa mga numero
   - **Date** -- Para sa pagpili ng petsa
   - **Yes/No** -- Para sa sagot na oo o hindi
   - **Email** -- Para sa mga email address
   - **Phone Number** -- Para sa input ng telepono
   - **Text Area** -- Para sa mas mahabang sagot
   - **Multiple Choice** -- Para pumili ng isa sa ilang opsyon
   - **Checkbox** -- Para lagyan ng check ang anumang bilang ng opsyon
   - **Payment** -- Para mangolekta ng bayad
4. Maglagay ng **Title** at opsyonal na **Description** para sa tanong. Lumalabas ang description sa ilalim ng tanong kapag pinupunan ng mga tao ang form, kaya gamitin ito para sa mga paalala gaya ng "Isama ang anumang allergy na dapat naming malaman."
5. Punan ang mga karagdagang field para sa uring pinili mo:
   - Para sa text, number, date, email, at phone na tanong, maaaring magpakita ang opsyonal na **Placeholder** ng halimbawang teksto sa loob ng walang laman na kahon.
   - Para sa **Multiple Choice** at **Checkbox**, idagdag ang bawat opsyon sa ilalim ng **Choices**: maglagay ng **Value** (ang sine-save) at **Text** (ang nakikita ng mga tao), pagkatapos i-click ang add button. I-click ang remove icon para alisin ang isang opsyon.
   - Para sa **Payment**, piliin ang **Fund** kung saan mapupunta ang pera at ang **Amount**.
6. Lagyan ng check ang **Require an answer for this question** kung kinakailangan ang field. (Walang opsyong ito ang mga payment question.)
7. I-click ang **Save**.
8. Ulitin para magdagdag ng mas maraming tanong.

Nakalista sa tab na **Questions** ang bawat tanong kasama ang uri nito at kung kinakailangan ito. I-click ang title ng tanong para i-edit ito, o i-click ang **Delete** sa form ng tanong at kumpirmahin para alisin ito. Gamitin ang mga arrow na **Move up** at **Move down** sa isang row para baguhin ang pagkakasunod ng mga tanong.

:::warning
Kailangan ng Stripe na naka-configure para sa uring **Payment** na field. Kung hindi mo pa naitatakda ang online giving, tingnan muna ang [Online Giving Setup](../donations/online-giving-setup.md) bago magdagdag ng payment field. Ang mga taong nagbabayad sa form nang hindi naka-sign in ay kailangang lagyan ng check ang **I'm not a robot** bago tanggapin ang card.
:::

## Pamamahala ng Form Members {#managing-form-members}

May tab na **Form Members** ang Stand Alone form para magbigay ng access sa partikular na form na iyon sa mga tao.

1. Buksan ang iyong form at pumunta sa tab na **Form Members**.
2. Sa **Add Person**, maghanap ng tao at i-click ang add icon sa tabi ng pangalan niya. Nagsisimula ang mga bagong miyembro bilang **View Only**.
3. Sa column na **Permission**, i-click ang role na gusto mo:
   - **Admin** -- Maaaring i-edit ang form at tingnan ang lahat ng submission.
   - **View Only** -- Maaaring tingnan ang mga submission pero hindi maaaring i-edit ang form.
4. I-on ang **Email Notification** para sa sinumang dapat makatanggap ng email tuwing may magsusumite ng form.

Para alisin ang isang tao sa form, i-click ang **Remove** sa row niya at kumpirmahin.

## Pag-link ng Form sa Grupo {#linking-a-form-to-a-group}

Maaari mong i-link ang anumang Stand Alone form sa isang grupo -- halimbawa, prayer request form para sa maliit na grupo, o medical release para sa youth trip:

1. Buksan ang form at i-click ang **Edit Form** (o i-click ang **Edit** sa tabi ng form sa listahan ng Forms).
2. Sa ilalim ng **Linked group**, piliin ang grupo, o iwanang nakatakda sa **None**.
3. I-click ang **Save**.

Kapag naka-link na ang form:

- **Nakikita ng mga miyembro ng grupo** ang form sa seksyong **Forms** sa page ng grupo sa B1.church habang bukas ang form, kasama ang button na **Fill out** na nagbubukas nito (tingnan ang [Group Details](../../b1-church/groups/group-details.md#linked-forms)).
- **Nakikita rin ng mga lider ng grupo ang mga sarado nang form**, at mababasa at maiprint ang sagot ng bawat submission (isang submission o **Print all**). Makakakita lamang ng sagot ang mga lider -- hindi nila maie-edit ang form maliban kung sila rin ay [form members](#managing-form-members).
- **Sa B1 Admin**, nagpapakita ang page ng grupo ng seksyong **Linked forms** na naglilista ng bawat naka-link na form bilang **Open** o **Closed**. Lumalabas ito para sa mga lider ng grupo at sa mga taong maaaring mag-administer ng form. Tingnan ang [Group Members](../groups/group-members.md#linked-forms).

Sarado ang isang form kapag nasa labas ito ng panahon ng availability nito. Hindi ipinapakita sa page ng grupo ang mga naka-archive na form.

### Awtomatikong Pagdaragdag ng Mga Nagsumite sa Grupo {#automatically-adding-submitters-to-a-group}

Hindi awtomatikong nagdaragdag ng sinuman sa grupo ang pag-link ng form sa grupo. Para idagdag ang bawat nagsumite sa roster ng naka-link na grupo, lagyan din ng check ang **Create a person record from submissions** sa settings ng form at i-click ang **Save**.

Tuwing may magsusumite ng form, idaragdag sa grupo ang naitugmang tao o bagong likhang tao (lalaktawan ang mga umiiral nang miyembro ng grupo). Kapaki-pakinabang ito para sa mga bagay gaya ng sign-up form ng camp na dapat awtomatikong bumuo ng roster group ng camp.

### Pagpapadala ng Follow-up na Email {#sending-a-follow-up-email}

Sa naka-check na **Create a person record from submissions**, maaari mo ring i-email ang bawat taong nagsumite ng form. Punan ang **Follow-up Email Subject** at **Follow-up Email Body** sa settings ng form. Maaari mong gamitin ang mga token na `{firstName}` at `{churchName}` sa parehong field. Ipinapadala lamang ang email kapag napunan ang parehong field.

:::info
Ipinapadala lamang ang follow-up na email pagkatapos maaprubahan ang iyong simbahang magpadala ng group email, at binibilang ang mga ito sa araw-araw na limitasyon ng email ng iyong simbahan. Tingnan ang [Turning On Group Email for Your Church](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Pag-duplicate ng Form {#duplicating-a-form}

Para gamitin muli ang isang form bilang panimulang punto ng bago, i-click ang **Duplicate** sa tabi ng form sa listahan ng Forms at kumpirmahin. Lalabas ang mensaheng **Form duplicated**, at gagawa ang B1 ng eksaktong kopya ng form -- kasama ang lahat ng tanong -- na maaari mong palitan ang pangalan at i-edit nang hiwalay.

:::tip
Kapaki-pakinabang ang pag-duplicate para sa mga paulit-ulit na event kung saan nananatiling pareho ang mga tanong sa registration taon-taon. I-duplicate ang form ng nakaraang taon, i-update ang pangalan at petsa, at handa ka na.
:::

## Pag-configure ng Mga Property ng Form {#configuring-form-properties}

Maaari mong i-update ang pangalan at settings ng form anumang oras: buksan ang form at i-click ang **Edit Form** sa kaliwang bahagi ng pahina, o i-click ang **Edit** sa tabi ng form sa listahan ng Forms. Ipinapakita ng kaliwang bahagi ng form page ang uri ng form (**People** o **Stand Alone**) at, para sa Stand Alone form, kung ito ay **Public** o **Restricted** at ang natatangi nitong **public URL** na maaari mong ibahagi kanino man.

Ito ang mga setting ng **Edit Form**:

- **Form Name** -- Ang pangalang ipinapakita sa B1 Admin at sa itaas ng form.
- **Description** *(Stand Alone)* -- Tekstong ipinapakita sa itaas ng mga tanong sa public na form page, kapaki-pakinabang para sabihin sa mga tao kung para saan ang form bago sila magsimulang punan ito.
- **Header Photo** *(Stand Alone)* -- Tingnan ang [Pagdaragdag ng Header Photo](#adding-a-header-photo).
- **Form Access** *(Stand Alone)* -- Pinapayagan ng **Public** ang sinumang may link na punan ang form; kinakailangan ng **Restricted** na mag-sign in muna ang mga tao sa site ng iyong simbahan bago nila ito mabuksan.
- **Set Form Availability Timeframe** *(Stand Alone)* -- Piliin ang **Yes** at itakda ang **Availability Start Date** at **Availability End Date** para tumanggap lamang ng submission sa pagitan ng mga petsang iyon. Sa labas ng mga iyon, sarado ang form.
- **Thank You Message** -- Ang makikita ng mga tao pagkatapos magsumite (tingnan sa ibaba).
- **Display Mode** -- Ang **Standard** ay nagpapakita ng lahat ng tanong sa isang pahina; ang **Conversational (one question at a time)** ay isa-isang dinadaanan ang mga tanong.
- **Create a person record from submissions** *(Stand Alone)*, **Linked group**, at mga field ng follow-up email -- Tingnan ang [Pag-link ng Form sa Grupo](#linking-a-form-to-a-group) at [Pagpapadala ng Follow-up na Email](#sending-a-follow-up-email).

I-click ang **Save** para panatilihin ang iyong mga pagbabago. Para permanenteng alisin ang form, i-click ang **Delete** sa settings ng form at kumpirmahin; kung gusto mo namang itago ito sa listahan nang hindi binubura, [i-archive](./index.md#what-you-can-do) ito sa halip.

### Pagdaragdag ng Header Photo {#adding-a-header-photo}

Maaaring magpakita ang Stand Alone form ng **Header Photo** sa itaas ng form. Sa mga detalye ng form, i-click ang photo box o ang **Add Photo**, pagkatapos pumili o mag-upload ng larawan (ginugupit ito sa hugis na 16:9). I-click ang **Save**. Lumalabas ang larawan sa ilalim ng pangalan ng form, sa itaas ng description, sa public URL page ng form, at saanman naka-embed ang form gamit ang website **Form** element. Gamitin ang **Change Photo** para palitan ito o **Remove** para alisin ito.

Gamitin ang field na **Thank You Message** para itakda kung ano ang makikita ng mga tao pagkatapos magsumite ng form, kasama na sa public URL page ng form. Kung iiwan itong blangko, makikita nila ang "Thank you for submitting the form!"

:::tip
Mainam ang Stand Alone form para sa mga event registration. Ibahagi ang public URL sa pamamagitan ng email, social media, o i-embed nang direkta ang form sa website ng iyong simbahan.
:::

:::info
Para i-embed ang form sa iyong B1 website, pumunta sa website editor, magdagdag ng bagong section, at piliin ang **Form** element. Pagkatapos piliin ang form na gusto mong ipakita. Tingnan ang [Managing Pages](../website/managing-pages.md) para sa mga detalye sa pag-edit ng iyong website.
:::
