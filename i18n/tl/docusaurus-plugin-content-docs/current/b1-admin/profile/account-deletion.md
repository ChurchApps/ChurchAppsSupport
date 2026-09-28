---
title: "Sinusuri ang mga kahilingan sa pagtanggal ng account"
---

# Sinusuri ang mga kahilingan sa pagtanggal ng account

<div class="article-intro">

Kapag ang isang simbahan ay may Directory Approval Group na nakaayos, ang pagtanggal ng account ay hindi na agad nangyayari — ang kahilingan ng miyembro ay nagiging isang gawain na susuriin ng iyong approval group bago ang anumang tinatanggal. Ang pahinang ito ay nagpapaliwanag kung paano ginawa ang kahilingan, paano ito aprubahan o tanggihan, at kung ano ang mangyayari sa bawat kaso.

</div>

<div class="prereqs">
<h4>Bago ka magsimula</h4>

- Ang isang **Directory Approval Group** ay dapat na maayos sa ilalim ng **Mobile &rarr; Member portal**. Kung wala, ang pagklik sa **Delete my account** sa Profile page ay agad pa rin buburahin ang account, na walang review step. Tingnan ang [Mobile App Settings](../settings/mobile-app.md).
- Ang pag-apruba o pagtanggi sa isang kahilingan ay nangangailangan ng **People &gt; Edit** na pahintulot.

</div>

## Paano hinihiling ng miyembro ang pagtanggal

Ang pagtanggal ng account ay hinihiling mula sa **My Profile** page — ang parehong shared account page na saklaw sa [Managing Your Profile](./managing-profile.md) — sa ilalim ng **Account Deletion** section. Kapag ang approval group ay naayos, ang pagkumpirma sa kahilingan ay hindi buburahin ang kahit ano kaagad. Sa halip, ito ay:

1. Lumilikha ng isang bukas na gawain na may pamagat na **"Account deletion request"**, itinalaga sa Directory Approval Group, sa ilalim ng **Serving &rarr; My Work**.
2. Ini-disable ang **Delete my account** button para sa taong iyon at nagpapakita ng isang abiso na ang kahilingan ay naghihintay ng pagsusuri.

Ang pagpadala ng ikalawang kahilingan habang ang isa ay bukas na ay muling bubuksan lamang ang parehong gawain — ang isang tao ay maaaring lamang magkaroon ng isang pending deletion request sa isang oras.

## Pagsusuri sa isang kahilingan

1. Pumunta sa **Serving &rarr; My Work** (o **Assigned to My Groups** sa iyong dashboard, ang parehong lugar kung saan lumilitaw ang [profile change requests](./approving-profile-changes.md)).
2. Buksan ang gawain na may pamagat na **"Account deletion request from *Name*"**.
3. Makikita mo ang dalawang aksyon: **Approve deletion** at **Decline**.

### Pag-apruba

Kumpirmahin ang **"Permanently anonymize this person's record and remove their login? This cannot be undone."** Ito ay pagpapalit ng personal na impormasyon ng tao ng mga generic na halaga (ang parehong anonymization na ginagamit ng **Data Management &gt; Anonymize** action sa record ng isang tao — tingnan ang [Data Security](../settings/data-security.md)) at tinatanggal ang kanilang login. Ang gawain ay awtomatikong nagsasara, at ang miyembro ay inaabisuhan na ang kanilang kahilingan ay aprubado.

### Pagtatanggi

Ang pagtatanggi ay nangangailangan ng dahilan, dahil ang GDPR ay nagbibigay-daan lamang sa pagtanggi sa isang erasure request para sa legal na exception:

- **Legal retention** (mga donation, tax, o employment records)
- **Needed for a legal claim**
- **Other** — ipaliwanag sa text box (hindi bababa sa 10 characters)

Ang miyembro ay inaabisuhan ng desisyon kasama ang dahilan na ibinigay mo, at maaaring muling magsumite ng kanilang kahilingan o mag-escalate sa isang supervisory authority kung hindi sila sumasang-ayon.

:::info
Ang mga simbahan ay may 30 araw upang tumugon sa isang kahilingan sa pagtanggal. Ang gawain ay dapat sa loob ng 28 araw, at ang approval group ay tumatanggap ng automatic reminders kung ito ay nananatiling bukas pagkatapos ng 21 at 27 araw.
:::

:::tip
Ang pagtanggal at profile-change requests ay gumagamit ng parehong Directory Approval Group at ang parehong Tasks-based review flow — tingnan ang [Approving Profile Changes](./approving-profile-changes.md) kung kailangan mo ring suriin ang directory update requests.
:::

## Mga kaugnay na artikulo

- [Managing Your Profile](./managing-profile.md) — Kung saan ang mga miyembro ay humihiling ng pagtanggal ng kanilang sariling account
- [Approving Profile Changes](./approving-profile-changes.md) — Ang katulad na review flow para sa directory update requests
- [Data Security](../settings/data-security.md) — Pagsunod sa GDPR at admin-initiated anonymization
- [Mobile App Settings](../settings/mobile-app.md) — Pag-setup ng Directory Approval Group
