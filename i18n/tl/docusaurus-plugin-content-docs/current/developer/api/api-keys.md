---
title: "Mga API Key"
description: "Gumawa, magtakda ng saklaw, at magbawi ng mga B1 API key sa B1 Admin para sa mga server script at sa mga connector na Zapier, Make, o Google Sheets, nang walang buong OAuth flow."
---

# Mga API Key

<div class="article-intro">

Ang mga API key (personal access token) ang pinakasimpleng paraan para mag-authenticate sa B1 API mula sa server-side script, third-party connector (Zapier, Make, Google Sheets), o saanman na sobra na ang buong OAuth flow. Nakatali ang isang key sa isang partikular na tao sa isang partikular na simbahan at minamana ang mga pahintulot ng taong iyon, na pinaliit ng opsyonal na hanay ng mga scope.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Ang admin ng simbahan na may pahintulot na **Edit Settings** ang gumagawa at namamahala ng mga key
- Ipinapakita ang buong key **minsan lamang** sa paggawa nito -- itabi ito sa ligtas na lugar agad
- Dapat gumamit ng **HTTPS** ang lahat ng API request

</div>

## Format ng Key {#key-format}

Ganito ang itsura ng B1 API key:

```
cak_<prefix>.<secret>
```

- `cak_` -- nakapirming identifier (ang prefix ng API key na itinutugma ng auth layer)
- `<prefix>` -- 8-karakter na pampublikong lookup segment
- `<secret>` -- 48-karakter na secret; SHA-256 hash lamang ang itinatabi sa server

Ipinapasa ang buong key sa server sa karaniwang bearer header:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

Dinidirekta ng API auth layer ang anumang token na nagsisimula sa `cak_` sa API-key path, hina-hash ang secret, hinahanap ito ayon sa prefix, at kinukuha ang kasalukuyang pahintulot ng tao ng key -- kaya agad na nagkakabisa sa susunod na request ang pagbawi ng pahintulot sa B1Admin, at hindi kailanman nagiging hindi magkasabay ang key at ang role.

## Paggawa ng Key (B1Admin) {#creating-a-key-b1admin}

1. Mag-sign in sa B1Admin bilang user na may **Edit Settings**.
2. Buksan ang **Settings → Developer → API Keys**.
3. I-click ang **New API Key**, bigyan ito ng nakikilalang **Name** (hal. "Zapier — donations sync"), piliin ang kahit isa sa mga **Scopes** na dapat taglayin ng key, opsyonal na pumili ng petsa sa **Expires** (iwanang blangko para sa key na hindi nag-e-expire), at i-**Save**.
4. Ipinapakita ang buong `cak_…` key **minsan lamang** sa isang dialog. Kopyahin ito sa config ng iyong integration bago isara -- walang paraan para makuha ito muli. Maaari kang palaging gumawa ng bagong key.

## Mga Scope {#scopes}

**Pinaliliit** ng scope ang kayang gawin ng key -- hindi ito kailanman makapagbibigay ng pahintulot na wala sa tao sa ilalim nito. Ang walang laman o walang scope ay nangangahulugang taglay ng key ang buong pahintulot ng tao; laging humihingi ang B1Admin ng kahit isang scope, kaya ang key na walang scope ay maaari lamang gawin sa pamamagitan ng API.

| Scope | Pinapayagan |
|---|---|
| `people:read` / `people:write` | Tingnan / i-edit ang mga tao, sambahayan, miyembro ng grupo |
| `groups:read` / `groups:write` | Tingnan / i-edit ang mga grupo at ang kanilang membership |
| `donations:read` / `donations:write` | Tingnan / itala ang mga donasyon |
| `attendance:read` / `attendance:write` | Tingnan / itala ang attendance, mga session, check-in |
| `forms:write` | Pamahalaan ang mga form (implicit ang read access sa write) |
| `content:read` / `content:write` | Tingnan / i-edit ang content ng website, mga pagpaparehistro, streaming |
| `messaging:read` / `messaging:write` | Magbasa ng messaging; kasama rin sa write ang pagpapadala ng SMS |
| `roles:read` / `roles:write` | Tingnan / i-edit ang mga kahulugan ng role |
| `settings:read` / `settings:write` | Tingnan / i-edit ang mga setting ng simbahan (**kailangan** para programmatic na magrehistro ng webhook) |
| `workflows:read` / `workflows:write` | Tingnan ang mga workflow at task / patakbuhin at i-edit ang mga workflow. Maaaring magpadala ng email at text, mag-fire ng webhook, at magbago ng membership ng grupo ang pagpapatakbo ng workflow |
| `offline_access` | Pinapayagan ang mga long-lived refresh token (para lamang sa OAuth flow -- walang epekto sa mga API key) |

Kasama na implicit ang kaukulang `read` sa mga `write` scope. Sinadyang hindi ilantad bilang scope ang mga pahintulot ng server at domain admin -- hindi kailanman makakataas sa administrasyon ng site ang isang credential na may saklaw.

:::tip
Kung gagamitin mo ang key para magrehistro ng webhook (halimbawa, para sa integration ng Zapier o Make), kailangan ng key ang `settings:write`. Ang key na `people:read` lamang ay tahimik na magbabalik ng 403 sa `POST /membership/webhooks`.
:::

## Paggamit ng Key {#using-a-key}

Pareho ito sa anumang bearer token -- tinatanggap ng bawat naka-authenticate na endpoint ang mga API key gaya ng pagtanggap nito sa mga JWT:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

Ang request na may key na kulang sa scope ay tutugon ng **403 Forbidden** na may parehong hugis ng karaniwang permission-denied error.

## Pamamahala ng Mga Key sa Pamamagitan ng API {#managing-keys-via-the-api}

Lahat ng endpoint ay nasa path na `/membership/apiKeys` ng Membership module at nangangailangan ng JWT (hindi API key) mula sa admin ng simbahan na may **Edit Settings**.

| Method at Path | Layunin |
|---|---|
| `GET /membership/apiKeys` | Ilista ang mga key ng simbahan (walang secret -- `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt` lamang) |
| `GET /membership/apiKeys/scopes` | Listahan ng lahat ng available na pangalan ng scope -- para sa UI ng paggawa ng key |
| `POST /membership/apiKeys` | Gumawa ng bagong key. Body: `{ "name": "...", "scopes": ["people:read"] }`. Kasama sa response ang buong `cak_…` key **minsan lamang**. |
| `DELETE /membership/apiKeys/:id` | Bawiin ang key -- nagkakabisa sa susunod na request |

Agad na nawawala ang nabawing key -- walang grace period.

## Mga Pinakamahusay na Gawi {#best-practices}

- **Isang key bawat integration.** Kung may makompromiso, isang key lamang ang babawiin mo nang hindi nasisira ang iba.
- **Gumawa ng pinakamakitid na scope na gumagana.** Ang export sa Google Sheets ay kailangan lamang ng `people:read`, hindi `settings:write`.
- **Itali ang key sa service account, hindi sa totoong staff.** Kapag umalis ang isang staff, magtatapos ang kanyang access sa B1 -- at gayundin ang anumang key na ginawa sa ilalim ng kanyang pagkakakilanlan.
- **Itabi ang mga key sa secret manager** (environment variable ng iyong hosting provider, AWS Secrets Manager, atbp.) -- huwag kailanman sa source control.
- **I-rotate ang mga key** kung pinaghihinalaang nalantad: gumawa ng bagong key, i-update ang integration, pagkatapos burahin ang luma.

## Paano Ito Naiiba sa OAuth {#how-it-differs-from-oauth}

Angkop ang mga API key kapag **ang iyong simbahan lamang ang gumagamit ng integration**. Para sa connector na kailangang mag-access sa maraming simbahan na may tahasang pahintulot ng bawat isa -- gaya ng SaaS app na ibinabahagi sa B1 community -- gamitin ang [OAuth at Connected Apps](./connected-apps.md) sa halip.

| | API key | OAuth |
|---|---|---|
| Sino ang nag-i-install | Isang admin ng simbahan | Bawat admin ng simbahan ang nag-aawtorisa ng app |
| Auth header | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Haba ng token | Hanggang mabawi | Access ≈ 7 araw, refresh ≈ 90 araw |
| Pinakamainam para sa | Internal na script, Zapier/Make/Sheets connector | Multi-tenant na third-party app |
