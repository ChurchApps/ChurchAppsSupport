---
title: "Paggawa ng Mga Form"
---

# Paggawa ng Mga Form

<div class="article-intro">

Gumawa ng sariling mga form para mangolekta ng impormasyon mula sa iyong kongregasyon. Maaari kang gumawa ng mga form para sa event registration, survey, visitor card, membership application, at iba pa. Maaaring i-link ang mga form sa mga tao sa iyong database o gamitin bilang hiwalay na pahina na may sariling public URL.

</div>

## Training Video

<YouTube id="sr9wxEj9ghQ" title="Creating Forms and Managing Submissions in B1" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Para sa mga **People** form (naka-link sa person record), kailangan mo munang may [mga tao sa iyong database](../people/adding-people.md).
- Para sa mga form na tumatanggap ng **bayad**, dapat naka-configure ang [Stripe para sa online giving](../donations/online-giving-setup.md).

</div>

## Paggawa ng Bagong Form

1. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas ng B1 Admin), palawakin ang **People**, at i-click ang **Forms**.
2. I-click ang **Add Form**.
3. Maglagay ng **name** para sa iyong form.
4. Piliin ang uri ng form mula sa dropdown na **Associate With**:
   - **People** -- Ikinakabit ang mga sumite sa [person records](../people/adding-people.md) sa iyong database. Pinupunan ang mga People form mula sa record ng isang tao, kaya walang maibabahaging link ang mga ito.
   - **Stand Alone** -- Gumagawa ng hiwalay na form na may sariling public URL, mainam para sa mga panlabas na registration. Tanging ang Stand Alone form ang nag-aalok ng [header photo](#adding-a-header-photo), [QR code](#sharing-a-form-with-a-qr-code), [naka-link na grupo](#linking-a-form-to-a-group), at **Create a person record from submissions**.
5. I-click ang **Save** para gawin ang form.

Lalabas ang bago mong form sa listahan. I-click ito para simulang magdagdag ng mga tanong.

## Pag-print ng Blangkong Form {#printing-a-blank-form}

Kailangan ng papel na kopyang ipamimigay -- para sa visitor card sa welcome desk, o form na sasagutan ng taong walang internet? I-click ang **Print** sa tabi ng form sa pangunahing listahan ng Forms para magbukas ng preview, pagkatapos i-click ang **Print**. Lalabas ang mga blangkong field na may salungguhit o checkbox para sa bawat tanong para masagutan ito nang kamay; minamarkahan ng asterisk ang mga kinakailangang tanong. Sa itaas ng pahina makikita ang logo ng iyong simbahan (ang **Light Background Logo** mula sa [Website > Appearance](../website/appearance.md), kung nag-upload ka na nito) na may pangalan ng simbahan sa ilalim, kasunod ang pangalan ng form. Walang ibang opsyon sa pag-print -- i-print ang buong form o wala.

## Pagbabahagi ng Form Gamit ang QR Code {#sharing-a-form-with-a-qr-code}

May link na **QR Code** sa tabi ng mga Stand Alone form sa pangunahing listahan ng Forms (hindi ito lumalabas sa mga naka-archive na form). I-click ito para magbukas ng QR code para sa public URL ng form, na may link na nakalagay sa ilalim. I-click ang **Download PNG** para i-save ang code bilang larawang maaari mong i-print sa bulletin o ipakita sa slides. Ang sinumang mag-scan nito ay bubukas ng form sa kanyang telepono.

## Pagdaragdag ng Mga Tanong {#adding-questions}

1. Buksan ang iyong form at pumunta sa tab na **Questions**.
2. I-click ang **Add Question**.
3. Piliin ang **field type** mula sa Provider dropdown. Kabilang sa mga available na uri ang:
   - **Textbox** -- Para sa maikling sagot na teksto
   - **Date** -- Para sa pagpili ng petsa
   - **Email** -- Para sa mga email address
   - **Phone Number** -- Para sa input ng telepono
   - **Multiple Choice** -- Para pumili mula sa mga nakatakdang opsyon
   - **Payment** -- Para mangolekta ng bayad
4. Maglagay ng **Title** at opsyonal na **Description** para sa tanong. Lumalabas ang paglalarawan sa ilalim ng tanong kapag sinasagutan ng mga tao ang form, kaya gamitin ito para sa mga paalala gaya ng "Isama ang anumang allergy na dapat naming malaman."
5. Lagyan ng check ang **Require an answer** kung sapilitan ang field.
6. I-click ang **Save**.
7. Ulitin para magdagdag ng marami pang tanong.

:::warning
Kinakailangan ng uring **Payment** field na naka-configure ang Stripe. Kung hindi mo pa naitatakda ang online giving, tingnan ang [Online Giving Setup](../donations/online-giving-setup.md) bago magdagdag ng payment field. Ang mga taong magbabayad sa form nang hindi naka-sign in ay dapat lagyan muna ng check ang **I'm not a robot** bago tanggapin ang card.
:::

## Pamamahala ng Mga Miyembro ng Form {#managing-form-members}

1. Buksan ang iyong form at pumunta sa tab na **Form Members**.
2. Maghanap ng tao at idagdag siya na may role:
   - **Admin** -- Maaaring i-edit ang form at tingnan ang lahat ng sumite.
   - **View Only** -- Maaaring tingnan ang mga sumite pero hindi maaaring i-edit ang form.

## Pag-link ng Form sa Grupo {#linking-a-form-to-a-group}

Maaari mong i-link ang anumang Stand Alone form sa isang grupo -- halimbawa, prayer request form para sa maliit na grupo, o medical release para sa youth trip:

1. Buksan ang **Details** ng iyong form.
2. Sa ilalim ng **Linked group**, piliin ang grupo, o iwan itong nakatakda sa **None**.
3. I-click ang **Save**.

Kapag na-link na ang form:

- Makikita ng **mga miyembro ng grupo** ang form sa seksyong **Forms** ng pahina ng grupo sa B1.church habang bukas ang form, kasama ang butones na **Fill out** na nagbubukas nito (tingnan ang [Group Details](../../b1-church/groups/group-details.md#linked-forms)).
- Makikita rin ng **mga group leader** ang mga sarado nang form, at mababasa nila ang mga sagot ng bawat sumite at mai-print ang mga ito (isang sumite o **Print all**). Maaari lang tingnan ng mga leader ang mga sagot -- hindi nila maie-edit ang form maliban kung sila rin ay [form members](#managing-form-members).
- **Sa B1 Admin**, ipinapakita ng pahina ng grupo ang seksyong **Linked forms** na naglilista ng bawat naka-link na form bilang **Open** o **Closed**. Lumalabas ito para sa mga leader ng grupo at sa mga taong maaaring mag-administer ng mga form. Tingnan ang [Group Members](../groups/group-members.md#linked-forms).

Sarado ang isang form kapag nasa labas ito ng panahon ng availability nito. Hindi ipinapakita sa pahina ng grupo ang mga naka-archive na form.

### Awtomatikong Pagdaragdag ng Mga Nagsumite sa Grupo {#automatically-adding-submitters-to-a-group}

Hindi awtomatikong nagdaragdag ng sinuman sa grupo ang pag-link lang ng form sa grupo. Para maidagdag ang bawat nagsumite sa roster ng naka-link na grupo, i-on din ang **Create a person record from submissions** sa details ng form at i-click ang **Save**.

Tuwing may magsusumite ng form, idinadagdag sa grupo ang tugmang tao o bagong likhang tao (nilalaktawan ang mga umiiral nang miyembro ng grupo). Kapaki-pakinabang ito para sa mga bagay gaya ng camp sign-up form na dapat awtomatikong bumuo ng roster ng grupo ng kampo.

### Pagpapadala ng Follow-up Email {#sending-a-follow-up-email}

Kapag naka-on ang **Create a person record from submissions**, maaari mo ring i-email ang bawat taong magsusumite ng form. Punan ang **Follow-up Email Subject** at **Follow-up Email Body** sa details ng form. Maaari mong gamitin ang mga token na `{firstName}` at `{churchName}` sa parehong field. Ipinapadala lang ang email kapag puno ang dalawang field.

:::info
Ipinapadala lang ang follow-up email pagkatapos maaprubahan ang iyong simbahan sa pagpapadala ng group email, at binibilang ang mga ito sa araw-araw na limitasyon ng email ng iyong simbahan. Tingnan ang [Turning On Group Email for Your Church](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Pagkopya ng Form

Para gamitin muli ang isang form bilang panimulang punto ng bago, i-click ang **Duplicate** sa tabi ng form sa listahan ng Forms at kumpirmahin. Gumagawa ang B1 ng eksaktong kopya ng form -- kasama ang lahat ng tanong -- na maaari mong palitan ang pangalan at i-edit nang hiwalay.

:::tip
Kapaki-pakinabang ang pagkopya para sa mga paulit-ulit na event kung saan nananatiling pareho ang mga tanong sa registration taon-taon. Kopyahin ang form ng nakaraang taon, i-update ang pangalan at mga petsa, at handa ka na.
:::

## Pag-configure ng Mga Katangian ng Form

Maaari mong i-update ang pangalan at mga setting ng iyong form anumang oras. Para sa mga Stand Alone form, makikita mo rin ang natatanging **public URL** na maibabahagi mo kanino man, kasama ang field na **Description** -- tekstong ipinapakita sa itaas ng mga tanong sa public form page, kapaki-pakinabang para sabihin sa mga tao kung para saan ang form bago nila ito simulang sagutan.

### Pagdaragdag ng Header Photo {#adding-a-header-photo}

Maaaring magpakita ang Stand Alone form ng **Header Photo** sa itaas ng form. Sa details ng form, i-click ang photo box o **Add Photo**, pagkatapos pumili o mag-upload ng larawan (ginugupit ito sa 16:9 na hugis). I-click ang **Save**. Lalabas ang larawan sa ilalim ng pangalan ng form, sa itaas ng description, sa public URL page ng form, at saanman naka-embed ang form gamit ang website **Form** element. Gamitin ang **Change Photo** para palitan ito o **Remove** para alisin.

Gamitin ang field na **Thank You Message** para itakda kung ano ang makikita ng mga tao pagkatapos nilang isumite ang form, kasama na sa public URL page ng form. Kung iiwan itong blangko, makikita nila ang "Thank you for submitting the form!"

:::tip
Mainam ang Stand Alone form para sa mga event registration. Ibahagi ang public URL sa pamamagitan ng email, social media, o direktang i-embed ang form sa website ng iyong simbahan.
:::

:::info
Para i-embed ang form sa iyong B1 website, pumunta sa editor ng iyong website, magdagdag ng bagong section, at piliin ang **Form** element. Pagkatapos piliin ang form na gusto mong ipakita. Tingnan ang [Managing Pages](../website/managing-pages.md) para sa mga detalye tungkol sa pag-edit ng iyong website.
:::
