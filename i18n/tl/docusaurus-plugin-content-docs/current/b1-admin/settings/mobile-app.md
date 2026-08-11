---
title: "Mga Ayos ng Mobile App"
---

# Mga Ayos ng Mobile App

<div class="article-intro">

Ang pahina ng Mga Ayos ng Mobile App ay nagbibigay-daan sa iyo na i-configure ang mga tab ng navigation na lumalabas sa **karanasan ng mobile ng B1.church (PWA)** para sa mga miyembro ng iyong simbahan. Kinokontrol mo kung aling mga tab ang makikita, kung ano ang naka-link sa kanila, at kung paano ang kanilang ipinapakita.

</div>

:::info Ang native B1 Mobile app ay hindi na ginagamit
Ang mga tab na iko-configure dito ay ihahatid sa pamamagitan ng [B1.church Progressive Web App (PWA)](/docs/b1-church/getting-started/installing-pwa), na nag-palitan ng native B1 Mobile app. Ibahagi ang pahina ng pag-install ng iyong simbahan -- `https://yourchurchname.b1.church/mobile/install` -- sa mga miyembro; ito ay gagabay sa kanila sa pag-install ng app sa kanilang device, nang walang pangangailangan ng App Store o Google Play download.
:::

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng pahintulot na "I-edit ang Mga Ayos ng Simbahan". Tingnan ang [Mga Rol at Pahintulot](./roles-permissions.md) kung wala kang access.
- I-configure ang iyong [Mga Ayos ng Simbahan](./church-settings.md) muna, kasama ang pangalan ng iyong simbahan at tatak

</div>

## Pag-access sa Mga Ayos ng Mobile App

1. Sa B1 Admin, buksan ang **menu ng seksyon** sa sulok sa itaas-kaliwa (ang pangalan ng seksyon na may maliit na arrow) at pumili ng **Mga Ayos**.
2. I-click ang pindutan ng **Mobile Apps** sa header.
3. Ang pahina ng Mga Ayos ng Mobile App ay nagpapakita ng iyong kasalukuyang mga tab ng app.

## Pagdaragdag ng Bagong Tab

1. I-click ang pindutan ng **Magdagdag ng Tab** sa tuktok ng pahina.
2. Punan ang mga detalye ng tab:
   - **Pangalan** -- Ang label na lumalabas sa tab (halimbawa, "Mga Sermon" o "Magbigay").
   - **Icon** -- I-click ang selector ng icon upang pumili ng icon para sa iyong tab. Maaari mo ring mag-upload ng custom na larawan.
   - **Uri ng Tab** -- Pumili mula sa mga opsyon tulad ng Bible, Live Stream, Donation, Website, at marami pang iba.
   - **URL** -- Ipasok ang web address na dapat i-link ng tab.
   - **Visibility** -- Kontrolin kung sino ang makakakita ng tab na ito (lahat, mga miyembro lamang, atb.).
3. I-click ang **Magsave ng Tab** upang idagdag ito sa iyong app.

## Pag-edit ng Umiiral na Tab

1. I-click ang anumang umiiral na tab sa listahan ng **Mga Tab ng App**.
2. I-update ang pangalan, icon, URL, uri, o visibility settings ng tab.
3. I-click ang **Magsave ng Tab** upang i-apply ang iyong mga pagbabago.

## Pagbabago ng Ayos ng Mga Tab

Maaari mong baguhin ang pagkakasunod-sunod kung saan lumilitaw ang mga tab sa mobile app. Drag at drop ang mga tab sa listahan upang muling ayusin ang mga ito. Ang pagkakasunod-sunod na ipinakita sa pahina na ito ay tumutugma sa pagkakasunod-sunod na makikita ng iyong mga miyembro sa app.

:::info
Ang ilang mga tab ay maaaring lumitaw ng awtomatiko kapag ang ilang mga kondisyon ay natugunan -- halimbawa, ang tab ng Live Stream ay maaaring lumitaw kapag aktibo ang isang stream. Ang manu-manong idinagdagdag na mga tab ay nagbibigay sa iyo ng buong kontrol sa kung ano ang makikita ng iyong mga miyembro sa lahat ng oras.
:::

:::tip
Panatilihing naaaasahang ang bilang ng tab mo. Tatlo hanggang limang tab ang gumagana nang mahusay para sa karamihan ng mga simbahan. Ang masyadong maraming tab ay maaaring gawing nakakalito ang navigation para sa iyong mga miyembro.
:::

## Mga Ayos ng Direktoryo ng Miyembro at Pagmemensahe

Ang tab ng **B1 Mobile** sa parehong seksyon ng Mobile ay may mga ayos na nangasalamin sa direktoryo ng miyembro at private messaging sa karanasan ng B1.church:

- **Direktoryong Pangmembro Pangkat** -- Ang grupo na sumusubaybay sa mga update ng direktoryo ng miyembro bago ang kanilang inilapat.
- **Ipakita sa Direktoryo** -- Sino ang maaaring lumitaw sa direktoryo ng miyembro (Lamang sa Kawani sa pamamagitan ng Lahat).
- **Mga Kagustuhan ng Visibility** -- Default na visibility para sa mga address ng miyembro, mga numero ng telepono, at mga email address.
- **Minimum na Edad para sa Mga Pribadong Mensahe** -- Isang kontrol sa kaligtasan ng bata. Ang B1 ay hindi magbubukas ng **bagong** pag-uusap ng pibadong mensahe kapag ang isa pang tao ay mas bata sa edad na ito, batay sa kanilang petsa ng kapanganakan (ang household role ay ginagamit bilang fallback kapag walang petsa ng kapanganakan sa file). Ang mga taong mas bata sa edad ay nananatiling buong nakikita sa direktoryo -- lamang ang direktang pagmemensahe ay napigilan, sa **parehong direksyon**, para sa lahat kabilang ang kawani. Ang mga pag-uusap sa grupo at pagmemensahe sa mga magulang ng bata ay gumagana pa. Ang mga opsyon ay Off, 13, 16, o 18; ang default ay **18**. Ang mga umiiral na pag-uusap ay hindi naaapektuhan.

:::tip
Dahil ang minimum-age check ay nakasalalay sa mga petsa ng kapanganakan, siguraduhin na ang mga petsa ng kapanganakan ay napunan para sa mga bata sa iyong kongregasyon. Ang setting na ito ay kabilang sa parehong pamilya ng kaligtasan ng bata bilang ang [mga kontrol sa kaligtasan ng check-in](../attendance/checkin-safety.md).
:::

## Kung Saan Lumilitaw ang Mga Tab na Ito

Ang mga tab na iyong iko-configure dito ay ipinapakita sa **PWA ng B1.church** na iyong ini-install ng mga miyembro mula sa anumang pahina sa `https://yourchurchname.b1.church`. Ang mga pagbabago na ginagawa mo sa pahina na ito ay makikita sa susunod na pagbubukas ng app ng miyembro. (Ang mga tab ay ire-render din ng legacy [B1 Mobile native app](/docs/b1-mobile/) para sa anumang miyembro na gumagamit pa nito, ngunit ang app na iyon ay hindi na ginagamit at hindi na ina-update.)

## Mga Susunod na Hakbang

- [Mga Ayos ng Simbahan](./church-settings.md) -- I-configure ang impormasyon at tatak ng iyong simbahan
- [Mga Rol at Pahintulot](./roles-permissions.md) -- Pamahalaan ang access para sa iyong koponan
