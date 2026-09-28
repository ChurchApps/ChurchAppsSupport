---
title: "Lumilikha ng Mga Form"
---

# Lumilikha ng Mga Form

<div class="article-intro">

Bumuo ng mga custom form upang makolekta ang impormasyon mula sa iyong congregation. Maaari kang lumikha ng mga form para sa mga registration ng kaganapan, mga survey, mga card ng bisita, mga application sa membership, at marami pang iba. Ang mga form ay maaaring ilink sa mga taong nasa iyong database o gamitin bilang mga standalone na pahina na may sarili nilang pang-publiko na URL.

</div>

<div class="prereqs">
<h4>Bago ka magsimula</h4>

- Para sa mga form na **People** (nakalink sa mga talaan ng tao), kailangan mo ng [mga tao sa iyong database](../people/adding-people.md) muna.
- Para sa mga form na kumakolekta ng **mga pagbabayad**, dapat kang mayroon [Stripe configured para sa online giving](../donations/online-giving-setup.md).

</div>

## Lumilikha ng Bagong Form

1. Buksan ang **People** mula sa section menu, pagkatapos ay i-click ang **Forms** sa navigation bar.
2. I-click ang **Add Form**.
3. Ipasok ang **pangalan** para sa iyong form.
4. Pumili ng uri ng form mula sa dropdown:
   - **People** — Nauugnay ang mga submission sa [mga talaan ng tao](../people/adding-people.md) sa iyong database.
   - **Stand Alone** — Lumilikha ng isang independent form na may sarili nitong pang-publiko na URL, ideal para sa mga panlabas na registration.
5. I-click ang **Save** upang lumikha ng form.

Ang iyong bagong form ay lalabas sa listahan. I-click ito upang magsimulang magdagdag ng mga tanong.

## Pagpapahayag ng Walang Laman na Form

Kailangan ng papel copy upang ihatid -- para sa isang card ng bisita sa welcome desk, o isang form na maaaring mapunan ng kamay ng someone nang wala ang internet access? I-click ang **print icon** sa tabi ng isang form sa pangunahing Forms list upang magbukas ng isang preview, pagkatapos ay i-click ang **Print**. Ang mga blankong field ay nagsasagawa na may underline o checkbox para sa bawat tanong upang ang mga tao ay maaaring puno ang mga ito sa pamamagitan ng kamay; ang mga kinakailangang tanong ay minarkahan na may asterisk. Walang ibang mga opsyon sa pag-print -- i-print ang buong form o wala.

## Pagdaragdag ng mga Tanong

1. Buksan ang iyong form at pumunta sa tab na **Questions**.
2. I-click ang **Add Question**.
3. Pumili ng **uri ng larangan** mula sa Provider dropdown. Ang mga available na uri ay kinabibilangan:
   - **Textbox** — Para sa maikling mga response sa teksto
   - **Date** — Para sa mga pagpili ng petsa
   - **Email** — Para sa mga email address
   - **Phone Number** — Para sa input ng telepono
   - **Multiple Choice** — Para sa pagpili mula sa mga naunang natukoy na opsyon
   - **Payment** — Para sa pagkolekta ng mga pagbabayad
4. Ipasok ang **Pamagat** at opsyonal na **Paglalarawan** para sa tanong.
5. Suriin ang **Require an answer** kung ang larangan ay mandatory.
6. I-click ang **Save**.
7. Ulitin upang magdagdag ng higit pang mga tanong.

:::warning
Ang uri ng field na **Payment** ay nangangailangan ng Stripe na maging na-configure. Kung hindi ka pa nag-setup ng online giving, makita ang [Online Giving Setup](../donations/online-giving-setup.md) bago magdagdag ng mga field ng pagbabayad.
:::

## Pagsasalin ng mga Miyembro ng Form

1. Buksan ang iyong form at pumunta sa tab na **Members**.
2. Maghanap ng isang tao at idagdag ang mga ito na may tungkulin:
   - **Admin** — Maaaring i-edit ang form at tingnan ang lahat ng mga submission.
   - **View Only** — Maaaring tingnan ang mga submission ngunit hindi maaaring i-edit ang form.

## Awtomatikong Pagdaragdag ng mga Nag-submit sa isang Grupo

Kapag ang **Create a person record from submissions** ay enabled, maaari mo ring ilink ang form sa isang grupo upang bawat nag-submit ay awtomatikong idinadagdag sa roster ng grupo:

1. Buksan ang **Details** ng iyong form, at i-turn on ang **Create a person record from submissions**.
2. Sa ilalim ng **Add submitters to a group**, pumili ng grupo upang idagdag ang mga nag-submit, o iwanan ito na nakatakda sa **None**.
3. I-click ang **Save**.

Sa bawat oras na may nag-submit sa form, ang tugmang o bagong lumilikha na tao ay idinadagdag sa grupo (ang mga naging miyembro ng grupo ay natatanggihan). Ito ay kapaki-pakinabang para sa mga bagay tulad ng isang form ng camp sign-up na dapat awtomatikong bumuo ng roster group ng camp.

### Pagpapadala ng Follow-up Email

Na may **Create a person record from submissions** na naka-on, maaari mo ring i-email ang bawat taong nag-submit ng form. Punan ang **Follow-up Email Subject** at **Follow-up Email Body** sa mga detalye ng form. Maaari mong gamitin ang `{firstName}` at `{churchName}` tokens sa pareho. Ang email ay ipinadala lamang kapag pareho ng mga field ay napuno.

:::info
Ang mga follow-up email ay lumalabas lamang pagkatapos na ang iyong simbahan ay aprubado upang magpadala ng group email, at bilang bilang sa araw-araw na limitasyon ng email ng iyong simbahan. Makita ang [Pagbubukas ng Group Email para sa Iyong Simbahan](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplicating ng isang Form

Upang muling gamitin ang isang form bilang panimulang punto para sa isang bago, i-click ang **Duplicate** icon (copy icon) sa tabi ng form sa Forms list. Ang B1 ay lumilikha ng isang eksaktong kopya ng form -- kabilang ang lahat ng mga tanong -- na maaari mo nang baguhin ang pangalan at i-edit nang nagsasara.

:::tip
Ang duplication ay kapaki-pakinabang para sa mga paulit-ulit na kaganapan kung saan ang mga tanong sa registration ay nananatiling pareho mula taon hanggang taon. I-duplicate ang form ng nakaraang taon, i-update ang pangalan at petsa, at handa ka na.
:::

## Pag-configure ng mga Property ng Form

Maaari mong i-update ang pangalan at mga setting ng iyong form sa anumang oras. Para sa Stand Alone forms, makikita mo rin ang isang natatanging **pang-publiko na URL** na maaari mong ibahagi sa sinuman, kasama ng isang field na **Paglalarawan** -- teksto na ipinapakita sa itaas ng mga tanong sa pang-publiko na pahina ng form, kapaki-pakinabang para sa pagsasabi sa mga tao kung saan ginagamit ang form bago nila simulan ang pagpuno nito.

:::tip
Ang Stand Alone forms ay lubhang mahusay para sa mga registration ng kaganapan. Ibahagi ang pang-publiko na URL sa pamamagitan ng email, social media, o i-embed ang form direkta sa iyong website ng simbahan.
:::

:::info
Upang i-embed ang isang form sa iyong website ng B1, pumunta sa iyong website editor, magdagdag ng isang bagong seksyon, at pumili ng elemento na **Form**. Pagkatapos ay pumili ng form na nais mong ipakita. Makita ang [Managing Pages](../website/managing-pages.md) para sa mga detalye sa pag-edit ng iyong website.
:::
