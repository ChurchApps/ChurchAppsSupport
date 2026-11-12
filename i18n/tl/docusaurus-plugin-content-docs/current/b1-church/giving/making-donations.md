---
title: "Pagbibigay ng Donasyon sa B1.church Member Portal"
sidebar_label: "Pagbibigay ng Donasyon"
description: "Magbigay ng isahan o paulit-ulit na regalo sa iyong simbahan sa pamamagitan ng B1.church, may account man o wala, at suriin ang iyong kasaysayan ng pagbibigay pagkatapos."
---

# Pagbibigay ng Donasyon

<div class="article-intro">

May dalawang paraan para magbigay ng donasyon sa pamamagitan ng site ng B1.church ng iyong simbahan: ang pampublikong donate page (hindi kailangan ng login) at ang donate page ng miyembro (kailangan ng login). Parehong gumagamit ng ligtas na donation form mula sa payment provider ng iyong simbahan (karamihan ng simbahan ay gumagamit ng Stripe).

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Para sa mga pampublikong donasyon, hindi kailangan ng account -- bisitahin lamang ang pahinang **Donate** ng iyong simbahan.
- Para sa mga donasyon ng miyembro na may pagsubaybay sa kasaysayan at mga naka-save na paraan ng pagbabayad, [mag-log in](../getting-started/logging-in.md) muna sa iyong account.

</div>

## Pampublikong Donate Page (Hindi Kailangan ng Login) {#public-donation-page-no-login-required}

Sinuman ay maaaring magbigay ng donasyon nang hindi gumagawa ng account:

1. Pumunta sa pahinang **Donate** ng iyong simbahan.
2. Ipinapakita ang donation form sa kaliwang bahagi ng pahina. Piliin ang **Make a Donation** para sa isahang regalo, o **Make a Recurring Donation** para magbigay ayon sa iskedyul (piliin ang dalas at petsa ng pagsisimula).
3. Ilagay ang iyong **First Name**, **Last Name**, at **Email**, pagkatapos ang detalye ng iyong card.
4. Sa ilalim ng **Funds**, maglagay ng **Amount** at piliin ang **Fund**. I-click ang **Add More** para hatiin ang iyong regalo sa ilang pondo.
5. Opsyonal na magdagdag ng **Memo**. Kung pinapayagan ito ng iyong simbahan, maaari mong lagyan ng check ang kahon para sagutin ang bayad sa transaksyon.
6. I-click ang **Donate** para makumpleto ang iyong donasyon.

Para magbigay nang hindi ipinapakita ang iyong pangalan sa regalo, lagyan ng check ang **Give anonymously (one-time gifts only)**. Mawawala ang mga field ng pangalan at ang opsyon ng paulit-ulit na regalo.

Sa kanang bahagi ng pahina, sa ilalim ng **Manage Donations**, makikita mo ang link na **Instructions for ACH Payment** kung mas gusto mong magbigay sa pamamagitan ng bank transfer. May button ding **Login** (at link na **Login to manage existing donations** sa ilalim ng form) kung gusto mong mag-sign in para ma-access ang karagdagang feature gaya ng kasaysayan ng donasyon.

Ipinapakita ng screen na **Giving** sa member portal (`/mobile/donate`) ang parehong form kapag naka-sign out ka, na may link na **Sign in to manage recurring gifts and view history** sa ilalim.

:::tip
Kung naka-log in ka na kapag binisita mo ang pampublikong donate page, awtomatiko kang ire-redirect sa donate page ng miyembro kung saan may access ka sa buo mong kasaysayan ng pagbibigay at mga naka-save na paraan ng pagbabayad.
:::

## Donate Page ng Miyembro (Naka-log In) {#member-donation-page-logged-in}

Kapag naka-log in ka, ang pahinang **Giving** sa member portal ay nagpapakita ng button na **Give** at button na **Print Statement** sa itaas, kasunod ng mga seksyong ito:

- **This year** (may pamagat na kasalukuyang taon) -- Ang kabuuan ng iyong pagbibigay ngayong taon at bilang ng mga regalo, kasama ang link na **All history**. Tingnan ang [Kasaysayan ng Donasyon](./donation-history.md) para sa mga detalye.
- **Recurring** -- Ang iyong mga nakaiskedyul na regalo, kasama ang link na **Manage**.
- **Recent Activity** -- Ang iyong huling tatlong regalo, kasama ang link na **Repeat last gift** na nagbubukas ng donation form.
- **Payment methods** -- Ang iyong mga naka-save na card at bank account, kasama ang link na **Manage** para magdagdag ng card o bank account at mag-edit o mag-alis ng mga naka-save.
- Isang campaign progress card, kung may aktibong campaign ang iyong simbahan.

Para magbigay:

1. Buksan ang pahinang giving mula sa tab na **Donate** ng iyong simbahan, mula sa button na **Give** sa seksyong **Giving** ng iyong [Home dashboard](../getting-started/navigating.md#home), o mula sa **History** sa seksyong **Giving** ng iyong [Me page](../getting-started/me-page.md). Sa pahinang Giving, i-tap ang **Give** para buksan ang donation form.
2. Piliin ang **Make a Donation** o **Make a Recurring Donation**.
3. Pumili ng umiiral na naka-save na paraan ng pagbabayad o maglagay ng bagong detalye ng card. Kapag naglalagay ng bagong card, lagyan ng check ang **Save this card for future donations** para itabi ito sa susunod (kung sinusuportahan ng provider ng iyong simbahan ang mga naka-save na card).
4. Piliin ang **Fund** na nais mong pagbigyan at ilagay ang **Amount**; i-click ang **Add More** para magbigay sa higit sa isang pondo. Ipinapakita ng listahan ang mga pondong inaalok ng iyong simbahan sa mga donor lamang, kahit staff ka na nakakakita ng ibang pondo sa B1 Admin.
5. I-click ang **Preview Donation** para suriin ang iyong regalo, pagkatapos ay **Donate** para makumpleto ito. Ibinabalik ka ng **Cancel** sa pahinang Giving.

Pagkatapos maproseso ang iyong donasyon, lalabas ang mensahe ng tagumpay at lilitaw ang iyong donasyon sa iyong [kasaysayan ng donasyon](./donation-history.md).

:::info
Kung ang mga donasyong ibinigay mo ay naitala sa higit sa isang currency, iko-convert sa currency ng iyong simbahan ang iyong kabuuan para sa taon at ang kabuuan sa History, na may tala sa ilalim na **Converted at current exchange rates**. Ipinapakita pa rin ng mga indibidwal na donasyon sa iyong kasaysayan ang orihinal nilang currency.
:::

## Mga Paraan ng Pagbabayad {#payment-methods}

Ligtas na pinoproseso ang mga donasyon ng payment provider na ikinonekta ng iyong simbahan. Ang maaari mong bayaran ay nakadepende sa provider na iyon:

- **Stripe** -- credit o debit card, o bank account (ACH).
- **Kingdom Funding** -- credit o debit card, o bank account (ACH).
- **Paystack** (mga simbahan sa Africa) -- lokal na card at mobile money, sa lokal mong currency.
- **PayPal at Venmo** -- ipinapakita ng mga simbahang dati nang may PayPal setup ang mga button na **PayPal** at **Venmo** sa itaas ng mga field ng card para sa isahang regalo. Gumagamit ng mga field ng card ang paulit-ulit na regalo.

Kapag naka-log in ka, maaaring i-save ang iyong mga paraan ng pagbabayad para sa susunod na paggamit, para mas mabilis magbigay sa susunod.

:::info Pagbibigay sa pamamagitan ng bank account nang hindi nag-sign in
Kung magbibigay ka bilang bisita (nang walang login) sa pamamagitan ng bank account, kailangang ma-verify agad ang account sa pamamagitan ng pag-sign in sa iyong bangko. Kung hindi ito maaaring i-verify, makikita mo ang "This bank account couldn't be verified instantly. Please give by card, or sign in and add the bank account under your giving profile." Ang mga bank account na nangangailangan ng ilang araw para ma-verify ay maaari lamang idagdag pagkatapos mong mag-sign in.
:::

:::warning
Kung hindi matuloy ang iyong donasyon, i-double-check ang iyong detalye sa pagbabayad at subukan muli. Kung magpapatuloy ang problema, makipag-ugnayan sa opisina ng iyong simbahan para sa tulong.
:::

## Mga Susunod na Hakbang {#next-steps}

- [Kasaysayan ng Donasyon](./donation-history.md) -- Tingnan ang iyong mga nakaraang donasyon at mag-print ng giving statement
