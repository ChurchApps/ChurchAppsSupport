---
title: "Paggawa ng Forms"
---

# Paggawa ng Forms

<div class="article-intro">

Gumawa ng custom na forms upang mangolekta ng impormasyon mula sa iyong kongregasyon. Maaari kang gumawa ng forms para sa event registration, survey, visitor card, membership application, at iba pa. Maaaring i-link ang forms sa mga tao sa iyong database o gamitin bilang standalone na pahina na may sariling public URL.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Para sa **People** forms (naka-link sa person records), kailangan mo munang may [mga tao sa iyong database](../people/adding-people.md).
- Para sa mga form na nangongolekta ng **payments**, dapat ay mayroon kang [Stripe na naka-configure para sa online giving](../donations/online-giving-setup.md).

</div>

## Paggawa ng Bagong Form

1. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas ng B1 Admin), i-expand ang **People**, at i-click ang **Forms**.
2. I-click ang **Add Form**.
3. Maglagay ng **name** para sa iyong form.
4. Piliin ang uri ng form mula sa dropdown:
   - **People** -- Iniuugnay ang mga submission sa [mga person record](../people/adding-people.md) sa iyong database.
   - **Stand Alone** -- Gumagawa ng hiwalay na form na may sariling public URL, mainam para sa mga external registration.
5. I-click ang **Save** upang gawin ang form.

Lalabas ang bago mong form sa listahan. I-click ito upang simulang magdagdag ng mga tanong.

## Pag-print ng Blangkong Form {#printing-a-blank-form}

Kailangan ng papel na kopya na ipamimigay -- para sa visitor card sa welcome desk, o form na hindi magagamit ng taong walang internet access para sagutan ng kamay? I-click ang **Print** sa tabi ng form sa pangunahing listahan ng Forms upang buksan ang preview, pagkatapos i-click ang **Print**. Ang mga blangkong field ay nagpi-print na may salungguhit o checkbox para sa bawat tanong upang masagutan ito ng kamay; ang mga kinakailangang tanong ay minarkahan ng asterisk. Nasa itaas ng pahina ang logo ng iyong simbahan (ang **Light Background Logo** mula sa [Website > Appearance](../website/appearance.md), kung nag-upload ka na nito) na may pangalan ng simbahan sa ilalim, at pagkatapos ay ang pangalan ng form. Walang ibang opsyon sa pag-print -- ang buong form lamang o wala.

## Pagdagdag ng Mga Tanong {#adding-questions}

1. Buksan ang iyong form at pumunta sa tab na **Questions**.
2. I-click ang **Add Question**.
3. Piliin ang **field type** mula sa Provider dropdown. Kabilang sa mga available na uri ang:
   - **Textbox** -- Para sa maiikling sagot na teksto
   - **Date** -- Para sa pagpili ng petsa
   - **Email** -- Para sa mga email address
   - **Phone Number** -- Para sa input ng telepono
   - **Multiple Choice** -- Para sa pagpili mula sa mga nakatakdang opsyon
   - **Payment** -- Para sa pangongolekta ng bayad
4. Maglagay ng **Title** at opsyonal na **Description** para sa tanong. Lumalabas ang description sa ilalim ng tanong kapag sinasagutan ng mga tao ang form, kaya gamitin ito para sa mga paalala gaya ng "Isama ang anumang allergy na dapat naming malaman."
5. Lagyan ng check ang **Require an answer** kung sapilitan ang field.
6. I-click ang **Save**.
7. Ulitin upang magdagdag pa ng mga tanong.

:::warning
Kailangang naka-configure ang Stripe para sa **Payment** field type. Kung hindi mo pa na-set up ang online giving, tingnan ang [Online Giving Setup](../donations/online-giving-setup.md) bago magdagdag ng payment fields.
:::

## Pamamahala ng Form Members

1. Buksan ang iyong form at pumunta sa tab na **Form Members**.
2. Maghanap ng tao at idagdag siya na may role:
   - **Admin** -- Maaaring i-edit ang form at tingnan ang lahat ng submission.
   - **View Only** -- Maaaring tingnan ang mga submission ngunit hindi maaaring i-edit ang form.

## Awtomatikong Pagdagdag ng Mga Nagsumite sa Group {#automatically-adding-submitters-to-a-group}

Kapag naka-enable ang **Create a person record from submissions**, maaari mo ring i-link ang form sa isang group upang awtomatikong maidagdag ang bawat nagsumite sa roster ng group na iyon:

1. Buksan ang **Details** ng iyong form, at i-on ang **Create a person record from submissions**.
2. Sa ilalim ng **Add submitters to a group**, piliin ang group na paglalagyan ng mga nagsumite, o iwanan itong nakatakda sa **None**.
3. I-click ang **Save**.

Sa bawat pagsusumite ng form, idadagdag ang tugmang tao o bagong likhang tao sa group (nilalaktawan ang mga existing na miyembro ng group). Kapaki-pakinabang ito para sa mga bagay gaya ng camp sign-up form na dapat awtomatikong bumuo ng roster ng camp group.

### Pagpapadala ng Follow-up Email {#sending-a-follow-up-email}

Kapag naka-on ang **Create a person record from submissions**, maaari mo ring i-email ang bawat taong magsusumite ng form. Punan ang **Follow-up Email Subject** at **Follow-up Email Body** sa details ng form. Maaari mong gamitin ang mga token na `{firstName}` at `{churchName}` sa parehong field. Ipapadala lamang ang email kapag napunan ang parehong field.

:::info
Lalabas lamang ang follow-up emails pagkatapos maaprubahan ang iyong simbahan na magpadala ng group email, at ibinibilang ang mga ito sa araw-araw na limitasyon ng email ng iyong simbahan. Tingnan ang [Turning On Group Email for Your Church](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Pagkopya ng Form

Upang gamitin muli ang form bilang panimulang punto ng bago, i-click ang **Duplicate** sa tabi ng form sa listahan ng Forms at kumpirmahin. Gumagawa ang B1 ng eksaktong kopya ng form -- kasama ang lahat ng tanong -- na maaari mong palitan ng pangalan at i-edit nang hiwalay.

:::tip
Nakakatulong ang duplication para sa mga paulit-ulit na event kung saan nananatili ang parehong registration questions taon-taon. Kopyahin ang form ng nakaraang taon, i-update ang pangalan at mga petsa, at handa ka na.
:::

## Pag-configure ng Mga Katangian ng Form

Maaari mong i-update ang pangalan at settings ng iyong form anumang oras. Para sa Stand Alone forms, makikita mo rin ang natatanging **public URL** na maaari mong ibahagi kanino man, kasama ang **Description** field -- tekstong lumalabas sa itaas ng mga tanong sa public form page, kapaki-pakinabang para sabihin sa mga tao kung para saan ang form bago nila ito sagutan.

Gamitin ang **Thank You Message** field upang itakda kung ano ang makikita ng mga tao pagkatapos nilang maisumite ang form, kasama na sa public URL page ng form. Kung iiwanan itong blangko, makikita nila ang "Thank you for submitting the form!"

:::tip
Mahusay ang Stand Alone forms para sa mga event registration. Ibahagi ang public URL sa pamamagitan ng email, social media, o i-embed ang form nang direkta sa website ng iyong simbahan.
:::

:::info
Upang i-embed ang form sa iyong B1 website, pumunta sa website editor, magdagdag ng bagong section, at piliin ang **Form** element. Pagkatapos piliin ang form na nais mong ipakita. Tingnan ang [Managing Pages](../website/managing-pages.md) para sa mga detalye tungkol sa pag-edit ng iyong website.
:::
