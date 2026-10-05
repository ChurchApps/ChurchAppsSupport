---
title: "Paggawa ng mga Form"
---

# Paggawa ng mga Form

<div class="article-intro">

Gumawa ng mga custom na form para mangolekta ng impormasyon mula sa inyong kongregasyon. Maaari kayong gumawa ng mga form para sa event registration, survey, visitor card, aplikasyon sa pagiging miyembro, at iba pa. Maaaring i-link ang mga form sa mga tao sa inyong database o gamitin bilang hiwalay na page na may sariling pampublikong URL.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Para sa mga form na **People** (naka-link sa mga person record), kailangan muna ninyo ng [mga tao sa inyong database](../people/adding-people.md).
- Para sa mga form na nangongolekta ng **bayad**, kailangang [naka-configure ang Stripe para sa online giving](../donations/online-giving-setup.md).

</div>

## Paggawa ng Bagong Form

1. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas ng B1 Admin), i-expand ang **People**, at i-click ang **Forms**.
2. I-click ang **Add Form**.
3. Maglagay ng **pangalan** para sa inyong form.
4. Piliin ang uri ng form mula sa dropdown:
   - **People** — Iniuugnay ang mga submission sa [mga person record](../people/adding-people.md) sa inyong database.
   - **Stand Alone** — Gumagawa ng independiyenteng form na may sariling pampublikong URL, mainam para sa mga panlabas na registration.
5. I-click ang **Save** para likhain ang form.

Lalabas ang inyong bagong form sa listahan. I-click ito para magsimulang magdagdag ng mga tanong.

## Pag-print ng Blangkong Form

Kailangan ng papel na kopya na ipamimigay -- para sa visitor card sa welcome desk, o form na maaaring sulatan ng kamay ng taong walang internet? I-click ang **print icon** sa tabi ng isang form sa pangunahing listahan ng Forms para magbukas ng preview, pagkatapos ay i-click ang **Print**. Ipi-print ang mga blangkong field na may guhit o checkbox sa bawat tanong para masulatan ito ng kamay; may asterisk ang mga kinakailangang tanong. Nakaprint sa itaas ang pangalan ng inyong simbahan, sa ibabaw ng pangalan ng form. Wala nang ibang opsyon sa pag-print -- i-print ang buong form o huwag na lang.

## Pagdaragdag ng mga Tanong

1. Buksan ang inyong form at pumunta sa tab na **Questions**.
2. I-click ang **Add Question**.
3. Pumili ng **field type** mula sa Provider dropdown. Kabilang sa mga available na uri ang:
   - **Textbox** — Para sa maikling sagot na teksto
   - **Date** — Para sa pagpili ng petsa
   - **Email** — Para sa mga email address
   - **Phone Number** — Para sa numero ng telepono
   - **Multiple Choice** — Para sa pagpili mula sa mga paunang itinakdang opsyon
   - **Payment** — Para sa pangongolekta ng bayad
4. Maglagay ng **Title** at opsyonal na **Description** para sa tanong.
5. Lagyan ng check ang **Require an answer** kung sapilitan ang field.
6. I-click ang **Save**.
7. Ulitin para magdagdag ng iba pang tanong.

:::warning
Kailangang naka-configure ang Stripe para sa field type na **Payment**. Kung hindi pa kayo nakapag-set up ng online giving, tingnan ang [Pag-set Up ng Online Giving](../donations/online-giving-setup.md) bago magdagdag ng mga payment field.
:::

## Pamamahala ng mga Miyembro ng Form

1. Buksan ang inyong form at pumunta sa tab na **Form Members**.
2. Maghanap ng tao at idagdag siya na may role:
   - **Admin** — Maaaring mag-edit ng form at tumingin ng lahat ng submission.
   - **View Only** — Maaaring tumingin ng mga submission pero hindi makakapag-edit ng form.

## Awtomatikong Pagdaragdag ng mga Nag-submit sa Isang Group

Kapag naka-enable ang **Create a person record from submissions**, maaari rin ninyong i-link ang form sa isang group para awtomatikong maidagdag sa roster ng group na iyon ang bawat nag-submit:

1. Buksan ang **Details** ng inyong form, at i-on ang **Create a person record from submissions**.
2. Sa ilalim ng **Add submitters to a group**, piliin ang group na paglalagyan ng mga nag-submit, o iwanan itong nakatakda sa **None**.
3. I-click ang **Save**.

Sa tuwing may mag-submit ng form, idaragdag sa group ang natugmang o bagong likhang tao (lalaktawan ang mga umiiral nang miyembro ng group). Kapaki-pakinabang ito sa mga bagay tulad ng camp sign-up form na dapat awtomatikong bumuo ng roster group ng camp.

### Pagpapadala ng Follow-up Email

Kapag naka-on ang **Create a person record from submissions**, maaari rin ninyong i-email ang bawat taong nag-submit ng form. Punan ang **Follow-up Email Subject** at **Follow-up Email Body** sa mga detalye ng form. Maaari ninyong gamitin ang mga token na `{firstName}` at `{churchName}` sa pareho. Ipapadala lang ang email kapag napunan ang parehong field.

:::info
Lalabas lang ang mga follow-up email pagkatapos maaprubahan ang inyong simbahan na magpadala ng group email, at binibilang ang mga ito sa pang-araw-araw na limitasyon ng email ng inyong simbahan. Tingnan ang [Pag-on ng Group Email para sa Inyong Simbahan](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Pag-duplicate ng Form

Para gamitin ang isang form bilang panimulang punto ng bago, i-click ang **Duplicate** icon (copy icon) sa tabi ng form sa listahan ng Forms. Gagawa ang B1 ng eksaktong kopya ng form — kasama ang lahat ng tanong — na maaari ninyong palitan ng pangalan at i-edit nang hiwalay.

:::tip
Madaling gamitin ang pag-duplicate para sa mga paulit-ulit na event kung saan pareho ang mga tanong sa registration taon-taon. I-duplicate ang form noong nakaraang taon, i-update ang pangalan at mga petsa, at handa na kayo.
:::

## Pag-configure ng mga Property ng Form

Maaari ninyong i-update ang pangalan at mga setting ng inyong form anumang oras. Para sa mga Stand Alone na form, makikita rin ninyo ang natatanging **public URL** na maaari ninyong ibahagi kaninuman, kasama ang field na **Description** -- tekstong ipinapakita sa itaas ng mga tanong sa pampublikong page ng form, na kapaki-pakinabang para sabihin sa mga tao kung para saan ang form bago nila ito simulang sagutan.

Gamitin ang field na **Thank You Message** para itakda ang makikita ng mga tao pagkatapos nilang mag-submit ng form, kasama na sa page ng pampublikong URL ng form. Kung iiwanan itong blangko, makikita nila ang "Thank you for submitting the form!"

:::tip
Mainam ang mga Stand Alone na form para sa event registration. Ibahagi ang pampublikong URL sa pamamagitan ng email, social media, o i-embed ang form direkta sa website ng inyong simbahan.
:::

:::info
Para mag-embed ng form sa inyong B1 website, pumunta sa inyong website editor, magdagdag ng bagong section, at piliin ang elementong **Form**. Pagkatapos ay piliin ang form na nais ninyong ipakita. Tingnan ang [Pamamahala ng mga Page](../website/managing-pages.md) para sa mga detalye sa pag-edit ng inyong website.
:::
