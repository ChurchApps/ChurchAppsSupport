---
title: "Pagdagdag ng Mga Tao"
---

# Pagdagdag ng Mga Tao

<div class="article-intro">

Ang seksyon ng Mga Tao ay ang pundasyon ng B1 Admin -- ito ay ang iyong church member database. Bawat ibang feature (mga grupo, dumalo, mga donation, mga form) ay nababaligtad sa mga record ng tao. Ang gabay na ito ay gumagabay sa iyo sa pagdagdag ng isang tao sa iyong database, pag-edit ng kanilang mga detalye, at pag-link ng mga miyembro ng pamilya sa mga tahanan.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng isang active B1 Admin account na may pahintulot upang pamahalaan ang mga tao. Tingnan ang [Mga Papel & Pahintulot](roles-permissions.md) kung hindi ka sigurado tungkol sa iyong antas ng access.
- Kung nagdagdag ka ng higit sa iilan na mga tao, isaalang-alang ang paggamit ng [CSV Import](importing-data.md) tool sa halip.

</div>

## Pagdagdag ng isang Tao

1. Mag-navigate sa B1.church Admin dashboard.
2. Buksan ang **section menu** sa itaas-kaliwa na sulok at pumili ng **Mga Tao**.
3. I-click ang **Add Person** button sa itaas na kanang sulok.
4. Punan ang pangalan, pangalawang pangalan, at email address ng tao, pagkatapos i-click ang **Idagdag**.

Ang pahina ng profile ng tao ay bubuksan, handa na sa iyo na magdagdag ng higit pang mga detalye.

:::tip
Kung gumagalaw ka mula sa ibang church management system, ang [Import Data](importing-data.md) feature ay nagbibigay-daan sa iyo na dalhin ang buong directory mula sa isang CSV file -- mas mabilis kaysa magdagdag ng mga tao ng isa.
:::

### Mga Babala ng Duplicate

Kung ang email address (o, kapag lumilikha ng isang tao mula sa buong Edit form, ang telepono o tumutugma na pangalan + pangalawang pangalan + araw ng pagkapanganakan) ay tumutugma sa isang taong nasa iyong database, isang **Posibleng Duplicate** dialog ay lilitaw bago ang bagong record ay i-save. Ito ay nagbabahagi ng bawat tumutugmang tao kasama ang kanilang email, telepono, at araw ng pagkapanganakan upang maaari mong ihambing.

- I-click ang **Gamitin ang Kasalukuyang** sa tabi ng isang tugma upang gamitin ang record ng taong iyon sa halip na lumikha ng isang bagong isa.
- I-click ang **Lumikha Anyway** upang idagdag ang bagong tao kahit na ang isang posibleng tugma ay natuklasan.

Ito ay nag-check lamang para sa mga duplicate kapag lumilikha ka ng isang brand-new na tao -- ang pag-edit ng isang umiiral na record ay hindi kailanman nag-trigger nito. Ito ay lamang pumipigil sa mga bagong duplicate; hindi ito nagsasama ng mga record na umiiral na.

## Pag-edit ng Mga Detalye

1. Sa pahina ng profile ng tao, i-click ang **edit pencil** sa tabi ng kanilang pangalan.
2. Punan ang karagdagang impormasyon tulad ng pangalawang pangalan, status ng pagiging miyembro, mga petsa, address, mga telepono, at (para sa mga bata at mag-aaral) grade at paaralan.
3. I-click ang **I-save** upang magtipid ng personal na impormasyon.

Ang profile ay kinabibilangan din ng maraming mga tab para sa kaugnay na impormasyon:

- **Mga Tala** -- Magdagdag ng mga tala tungkol sa tao (pastoral care, mga follow-up, atbp.)
- **Mga Grupo** -- Tingnan at pamahalaan ang [group memberships](../groups/group-members.md)
- **Dumalo** -- Tingnan ang kasaysayan ng indibidwal na bisita ng taong ito, kabilang ang campus, serbisyo, oras ng serbisyo, grupo, at isang **Nag-check In** na haligi na may oras ng pag-check in ng kiosk (ipinakita bilang isang dash para sa mga bisita na naitala nang walang pag-check in ng kiosk). Para sa mga trend sa buong simbahan kaysa sa kasaysayan ng isang tao, tingnan ang [Pag-track ng Dumalo](../attendance/tracking-attendance.md)
- **Mga Donation** -- Tingnan ang [kasaysayan ng donation](../donations/recording-donations.md)

## Pagtrabaho sa Mga Form

Maaari kang magpuno ng mga customized na form nang direkta mula sa profile ng tao. Ito ay mga user-defined na form na maaari mong bumuo sa pamamagitan ng pagsunod sa [Paglikha ng Mga Form](../forms/creating-forms.md) gabay.

1. Sa profile ng tao, i-click ang **Forms** dropdown upang pumili ng isang form.
2. I-click ang **Magdagdag ng Form** upang buksan ito.
3. Punan ang mga detalye ng form at i-click ang **I-save**.

Pagkatapos magsumite ng isang form, i-click ang **print icon** sa tabi nito upang i-print ang mga sasagot na puno ng tao sa form.

:::info
Ang mga form na naka-link sa profile ng tao ay gumagamit ng uri ng **Mga Tao**. Kung kailangan mo ng isang standalone form (tulad ng event registration), tingnan ang [Stand Alone form option](../forms/creating-forms.md) sa gabay ng mga form.
:::

:::tip
Kung kailangan mo lamang na subaybayan ang isang o dalawang karagdagang piraso ng impormasyon sa mga tao -- isang petsa, isang numero, isang oo/hindi na sumagot -- gamitin ang [Custom Fields](../settings/custom-fields.md) sa halip na isang form. Sila ay mas mabilis na mapapuno at ay maaaring mahanap nang direkta sa Advanced Search.
:::

## Pag-manage ng mga Tahanan

Ang mga tahanan ay nagbibigay-daan sa iyo na i-link ang mga miyembro ng pamilya nang magkasama. Ito ay partikular na kapaki-pakinabang para sa [check-in](../attendance/check-in.md), kung saan ang magulang ay maaaring mag-check in ng lahat ng kanilang mga anak nang sabay-sabay.

1. Sa profile ng tao, i-click ang **edit pencil** sa tabi ng pangalan ng tahanan.
2. Ang editor ng tahanan ay bubuksan. Pumili ng **household role** para sa kasalukuyang tao (hal., Ulo, Asawa, Anak).
3. I-click ang **Idagdag** upang magdagdag ng ibang miyembro ng tahanan.
4. I-type ang pangalan ng tao sa search box at i-click ang **Maghanap**.
5. Kapag ang tao ay lilitaw sa mga resulta ng paghahanap, i-click ang **Pumili**.
6. Pumili ng kanilang household role at i-click ang **I-save** upang tapusin ang pag-setup ng tahanan.
