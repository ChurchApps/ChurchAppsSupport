---
title: "Pagsusuri ng Mga Hiling sa Pagbabura ng Account"
---

# Pagsusuri ng Mga Hiling sa Pagbabura ng Account

<div class="article-intro">

Kapag ang isang simbahan ay may Directory Approval Group na na-configure, ang pagbabura ng account ay hindi na nangyayari kaagad — ang hiling ng isang miyembro ay nagiging gawain na sinusuri ng iyong grupo ng pag-apruba bago ang anumang bagay na mabura. Ang pahina na ito ay nagpapaliwanag kung paano ginagawa ang hiling, kung paano aprubahan o tanggihan ito, at kung ano ang nangyayari sa bawat kaso.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Ang isang **Directory Approval Group** ay dapat na na-configure sa ilalim ng **Mobile → Member portal**. Kung wala, ang pag-click sa **Delete my account** sa Profile page ay nabubura pa rin ng agarang account, nang walang hakbang sa pagsusuri. Tingnan ang [Mobile App Settings](../settings/mobile-app.md).
- Ang pagpapagana o pagtanggi ng isang hiling ay nangangailangan ng **People > Edit** na pahintulot.

</div>

## Paano Humiling ang Miyembro ng Pagbabura

Ang pagbabura ng account ay hinihiling mula sa **My Profile** na pahina — ang parehong ibahagi na pahina na saklaw sa [Managing Your Profile](./managing-profile.md) — sa ilalim ng **Account Deletion** na seksyon. Kapag ang isang grupo ng pag-apruba ay na-configure, ang pagsasaad ng hiling ay hindi nagbabura ng kahit ano sa kaagad. Halip ito ay:

1. Lumilikha ng bukas na gawain na may pamagat na **"Account deletion request"**, na itinalaga sa Directory Approval Group, sa ilalim ng **Serving → Tasks**.
2. Nag-disable sa **Delete my account** na pindot para sa taong iyon at nagpapakita ng abiso na ang hiling ay naghihintay ng pagsusuri.

Ang pagpapasumite ng isang pangalawang hiling habang ang isa ay bukas na ay muling bubuksan lamang ang parehong gawain — ang isang tao ay maaari lamang magkaroon ng isang naghihintay na hiling sa pagbabura sa isang pagkakataon.

## Pagsusuri ng Isang Hiling

1. Pumunta sa **Serving → Tasks** (o **Assigned to My Groups** sa iyong dashboard, ang parehong lugar kung saan ang [profile change requests](./approving-profile-changes.md) ay lumilitaw).
2. Buksan ang gawain na may pamagat na **"Account deletion request from *Name*"**.
3. Makikita mo ang dalawang aksyon: **Approve deletion** at **Decline**.

### Pagpapagana

Kumpirmahin **"Permanently anonymize this person's record and remove their login? This cannot be undone."** Ito ay nagpapalit sa personal na impormasyon ng taong may generic na halaga (ang parehong pag-anonymize na ginagamit ng **Data Management > Anonymize** na aksyon sa talaan ng isang tao — tingnan ang [Data Security](../settings/data-security.md)) at nag-aalis ng kanilang pag-login. Ang gawain ay awtomatikong nagsasara, at ang miyembro ay naabisuhan na ang kanilang hiling ay aprubado.

### Pagtatanggi

Ang pagtatanggi ay nangangailangan ng dahilan, dahil ang GDPR ay nagbibigay-daan lamang sa pagtanggi ng isang request sa pag-aalis para sa isang legal na pagsisikap:

- **Legal retention** (mga donasyon, buwis, o talaan ng trabaho)
- **Needed for a legal claim**
- **Other** — ipasaad sa text box (hindi bababa sa 10 na titik)

Ang miyembro ay naabisuhan ng desisyon kasama ang dahilan na ibinigay mo, at maaaring muling magsumite ng kanilang hiling o pataas sa isang superhusyong awtoridad kung hindi sila sumagot.

:::info
Ang mga simbahan ay may 30 araw upang tumugon sa isang hiling sa pagbabura. Ang gawain ay dapat sa loob ng 28 araw, at ang grupo ng pag-apruba ay nakakakuha ng awtomatikong paalala kung ito ay bukas pa rin pagkatapos ng 21 at 27 araw.
:::

:::tip
Ang pagbabura at mga hiling sa pagbabago ng profile ay gumagamit ng parehong Directory Approval Group at ng parehong Tasks-based na daloy sa pagsusuri — tingnan ang [Approving Profile Changes](./approving-profile-changes.md) kung kailangan mo rin na suriin ang mga hiling sa pag-update ng directory.
:::

## Related Articles

- [Managing Your Profile](./managing-profile.md) — Kung saan ang mga miyembro ay humihiling ng pagbabura ng kanilang sariling account
- [Approving Profile Changes](./approving-profile-changes.md) — Ang katulad na daloy sa pagsusuri para sa mga hiling sa pag-update ng directory
- [Data Security](../settings/data-security.md) — GDPR na kaagapay at pag-anonymize na nagsisimula sa admin
- [Mobile App Settings](../settings/mobile-app.md) — Pagkonfigura ng Directory Approval Group
