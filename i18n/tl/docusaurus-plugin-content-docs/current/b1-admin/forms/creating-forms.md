---
title: "Paggawa ng mga Form"
---

# Paggawa ng mga Form

<div class="article-intro">

Gumawa ng mga custom na form para mangolekta ng impormasyon mula sa inyong kongregasyon. Maaari kayong gumawa ng mga form para sa event registration, survey, visitor card, aplikasyon sa pagiging miyembro, at iba pa. Maaaring i-link ang mga form sa mga tao sa inyong database o gamitin bilang mga hiwalay na pahina na may sariling pampublikong URL.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Para sa mga form na **People** (naka-link sa mga person record), kailangan muna ninyo ng [mga taong nasa inyong database](../people/adding-people.md).
- Para sa mga form na nangongolekta ng **bayad**, kailangang [naka-configure ang Stripe para sa online giving](../donations/online-giving-setup.md).

</div>

## Paggawa ng Bagong Form {#creating-a-new-form}

1. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas ng B1 Admin), i-expand ang **People**, at i-click ang **Forms**.
2. I-click ang **Add Form**.
3. Maglagay ng **pangalan** para sa inyong form.
4. Piliin ang uri ng form mula sa dropdown:
   - **People** — Iniuugnay ang mga submission sa [mga person record](../people/adding-people.md) sa inyong database.
   - **Stand Alone** — Gumagawa ng independiyenteng form na may sariling pampublikong URL, mainam para sa mga panlabas na registration.
5. I-click ang **Save** para likhain ang form.

Lalabas ang bago ninyong form sa listahan. I-click ito para magsimulang magdagdag ng mga tanong.

## Pag-print ng Blangkong Form {#printing-a-blank-form}

Kailangan ninyo ng papel na kopya na ipamimigay—para sa visitor card sa welcome desk, o para sa form na sasagutan ng kamay ng taong walang internet? I-click ang **Print** sa tabi ng form sa pangunahing listahan ng Forms para magbukas ng preview, saka i-click ang **Print**. Ang mga blangkong field ay magkakaroon ng salungguhit o checkbox para sa bawat tanong para masagutan ng kamay ng mga tao; ang mga kinakailangang tanong ay may markang asterisk. Sa itaas ng pahina ay makikita ang logo ng inyong simbahan (ang **Light Background Logo** mula sa [Website > Appearance](../website/appearance.md), kung nag-upload na kayo nito) kasama ang pangalan ng simbahan sa ilalim, at pagkatapos ay ang pangalan ng form. Walang ibang print option—i-print ang buong form o wala talaga.

## Pagdaragdag ng mga Tanong {#adding-questions}

1. Buksan ang inyong form at pumunta sa tab na **Questions**.
2. I-click ang **Add Question**.
3. Piliin ang **field type** mula sa Provider dropdown. Kabilang sa mga available na uri ang:
   - **Textbox** — Para sa maiikling sagot na teksto
   - **Date** — Para sa pagpili ng petsa
   - **Email** — Para sa mga email address
   - **Phone Number** — Para sa pag-input ng numero ng telepono
   - **Multiple Choice** — Para pumili mula sa mga nakatakdang opsyon
   - **Payment** — Para mangolekta ng bayad
4. Maglagay ng **Title** at opsyonal na **Description** para sa tanong.
5. Lagyan ng check ang **Require an answer** kung sapilitan ang field.
6. I-click ang **Save**.
7. Ulitin para magdagdag pa ng mga tanong.

:::warning
Kailangang naka-configure ang Stripe para sa uri ng field na **Payment**. Kung hindi pa ninyo na-set up ang online giving, tingnan muna ang [Online Giving Setup](../donations/online-giving-setup.md) bago magdagdag ng mga payment field.
:::

## Pamamahala ng Form Members {#managing-form-members}

1. Buksan ang inyong form at pumunta sa tab na **Form Members**.
2. Maghanap ng tao at idagdag siya na may role:
   - **Admin** — Maaaring i-edit ang form at tingnan ang lahat ng submission.
   - **View Only** — Maaaring tingnan ang mga submission pero hindi maaaring i-edit ang form.

## Awtomatikong Pagdaragdag ng mga Nagsumite sa isang Group {#automatically-adding-submitters-to-a-group}

Kapag naka-on ang **Create a person record from submissions**, maaari ninyo ring i-link ang form sa isang group para awtomatikong maidagdag ang bawat nagsumite sa roster ng group na iyon:

1. Buksan ang **Details** ng inyong form at i-on ang **Create a person record from submissions**.
2. Sa ilalim ng **Add submitters to a group**, piliin ang group na paglalagyan ng mga nagsumite, o iwanan itong naka-set sa **None**.
3. I-click ang **Save**.

Tuwing may magsusumite ng form, ang tugmang tao o bagong likhang tao ay idadagdag sa group (ang mga umiiral nang miyembro ng group ay nilalaktawan). Kapaki-pakinabang ito para sa mga bagay tulad ng camp sign-up form na dapat awtomatikong bumuo ng roster ng camp group.

### Pagpapadala ng Follow-up Email {#sending-a-follow-up-email}

Kapag naka-on ang **Create a person record from submissions**, maaari ring i-email ang bawat taong nagsumite ng form. Punan ang **Follow-up Email Subject** at **Follow-up Email Body** sa details ng form. Maaari ninyong gamitin ang mga token na `{firstName}` at `{churchName}` sa dalawa. Ipapadala lamang ang email kapag napunan ang parehong field.

:::info
Ipapadala lamang ang follow-up email pagkatapos maaprubahan ang inyong simbahan na magpadala ng group email, at binibilang ang mga ito sa daily email limit ng inyong simbahan. Tingnan ang [Pag-on ng Group Email para sa Inyong Simbahan](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Pagkopya ng Form {#duplicating-a-form}

Para gamitin ang isang form bilang panimulang punto ng bago, i-click ang **Duplicate** sa tabi ng form sa listahan ng Forms at kumpirmahin. Gumagawa ang B1 ng eksaktong kopya ng form—kasama ang lahat ng tanong—na maaari ninyong palitan ng pangalan at i-edit nang hiwalay.

:::tip
Madaling gamitin ang pagkopya para sa mga paulit-ulit na event na hindi nagbabago ang mga tanong sa registration taon-taon. Kopyahin ang form ng nakaraang taon, i-update ang pangalan at mga petsa, at handa na kayo.
:::

## Pag-configure ng mga Property ng Form {#configuring-form-properties}

Maaari ninyong baguhin ang pangalan at mga setting ng form anumang oras. Para sa mga Stand Alone form, makikita rin ninyo ang natatanging **public URL** na maaari ninyong ibahagi kanino man, kasama ang field na **Description**—tekstong lalabas sa itaas ng mga tanong sa public form page. Kapaki-pakinabang ito para sabihin sa mga tao kung para saan ang form bago sila magsimulang sumagot.

Gamitin ang field na **Thank You Message** para itakda kung ano ang makikita ng mga tao pagkatapos nilang magsumite ng form, kasama na sa pahina ng public URL ng form. Kung iiwan itong blangko, makikita nila ang "Thank you for submitting the form!"

:::tip
Mainam ang mga Stand Alone form para sa event registration. Ibahagi ang public URL sa pamamagitan ng email, social media, o i-embed ang form direkta sa website ng inyong simbahan.
:::

:::info
Para i-embed ang form sa inyong B1 website, pumunta sa website editor, magdagdag ng bagong section, at piliin ang elementong **Form**. Pagkatapos, piliin ang form na nais ipakita. Tingnan ang [Pamamahala ng mga Page](../website/managing-pages.md) para sa mga detalye sa pag-edit ng inyong website.
:::
