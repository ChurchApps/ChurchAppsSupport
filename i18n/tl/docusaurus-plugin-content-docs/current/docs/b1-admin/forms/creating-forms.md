---
title: "Creating Forms"
---

# Creating Forms

<div class="article-intro">

Bumuo ng mga custom forms upang kumuha ng impormasyon mula sa iyong congregasyon. Maaari kang lumikha ng mga form para sa event registrations, surveys, visitor cards, membership applications, at higit pa. Ang mga form ay maaaring i-link sa mga taong nasa iyong database o gamitin bilang mga standalone pages na may sariling public URL.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Para sa **People** forms (linked sa person records), kailangan mo ng [mga tao sa iyong database](../people/adding-people.md) muna.
- Para sa mga form na nagsasagawa ng **payments**, dapat mo ay may [Stripe configured para sa online giving](../donations/online-giving-setup.md).

</div>

## Creating a New Form

1. Mag-navigate sa **Forms** mula sa main menu.
2. I-click ang **Add Form**.
3. Magpasok ng **name** para sa iyong form.
4. Pumili ng form type mula sa dropdown:
   - **People** — Iuugnay ang mga submission sa [people records](../people/adding-people.md) sa iyong database.
   - **Stand Alone** — Lumilikha ng isang independenteng form na may sariling public URL, ideal para sa external registrations.
5. I-click ang **Save** upang lumikha ng form.

Ang iyong bagong form ay lilitaw sa listahan. I-click ito upang magsimulang magdagdag ng mga tanong.

## Adding Questions

1. Buksan ang iyong form at pumunta sa **Questions** tab.
2. I-click ang **Add Question**.
3. Pumili ng **field type** mula sa Provider dropdown. Ang mga available na uri ay kasama ang:
   - **Textbox** — Para sa maikling text answers
   - **Date** — Para sa date selections
   - **Email** — Para sa email addresses
   - **Phone Number** — Para sa phone input
   - **Multiple Choice** — Para sa pagpili mula sa mga predefined na pagpipilian
   - **Payment** — Para sa pagkolekta ng mga pagbabayad
4. Magpasok ng **Title** at opsyonal na **Description** para sa tanong.
5. Suriin ang **Require an answer** kung ang field ay mandatory.
6. I-click ang **Save**.
7. Ulitin upang magdagdag ng mas maraming mga tanong.

:::warning
Ang **Payment** field type ay nangangailangan ng Stripe na i-configure. Kung hindi mo pa nase-setup ang online giving, tingnan ang [Online Giving Setup](../donations/online-giving-setup.md) bago magdagdag ng payment fields.
:::

## Managing Form Members

1. Buksan ang iyong form at pumunta sa **Members** tab.
2. Maghanap ng isang tao at idagdag ang mga ito na may isang function:
   - **Admin** — Maaaring mag-edit ng form at tingnan ang lahat ng mga submission.
   - **View Only** — Maaaring tingnan ang mga submission ngunit hindi maaaring mag-edit ng form.

## Automatically Adding Submitters to a Group

Kapag ang **Create a person record from submissions** ay naka-enable, maaari mo ring iugnay ang form sa isang grupo upang ang bawat submitter ay awtomatikong idinadagdag sa roster ng grupo:

1. Buksan ang iyong form's **Details**, at i-turn on ang **Create a person record from submissions**.
2. Sa ilalim ng **Add submitters to a group**, pumili ng grupo na idadagdag ang mga submitter, o iwanan ang set nito sa **None**.
3. I-click ang **Save**.

Bawat pagkakataon na may nag-submit ng form, ang matched o bagong lumilikha na tao ay idinagdag sa grupo (ang mga umiiral na miyembro ng grupo ay nalampasan). Ito ay kapaki-pakinabang para sa mga bagay tulad ng camp sign-up form na dapat awtomatikong bumuo ng roster group ng camp.

## Duplicating a Form

Upang gamitin muli ang isang form bilang isang starting point para sa isang bagong isa, i-click ang **Duplicate** icon (copy icon) sa tabi ng form sa Forms list. Ang B1 ay lumilikha ng isang eksaktong kopya ng form -- kasama ang lahat ng mga tanong -- na maaari mong baguhin ang pangalan at mag-edit nang independiyente.

:::tip
Ang duplication ay kapaki-pakinabang para sa mga recurring events kung saan ang mga registration questions ay nanatiling pareho mula taon-taon. Dublehin ang nakaraang taon ng form, i-update ang pangalan at mga petsa, at handa ka nang.
:::

## Configuring Form Properties

Maaari mong i-update ang pangalan at mga setting ng iyong form anumang oras. Para sa Stand Alone forms, makikita mo rin ang isang natatanging **public URL** na maaari mong ibahagi sa sinuman.

:::tip
Ang Stand Alone forms ay mahusay para sa event registrations. Ibahagi ang public URL sa pamamagitan ng email, social media, o i-embed ang form nang direkta sa iyong church website.
:::

:::info
Upang i-embed ang isang form sa iyong B1 website, magpunta sa iyong website editor, magdagdag ng isang bagong seksyon, at piliin ang **Form** element. Pagkatapos pumili ng form na gusto mong ipakita. Tingnan ang [Managing Pages](../website/managing-pages.md) para sa mga detalye sa pag-edit ng iyong website.
:::
