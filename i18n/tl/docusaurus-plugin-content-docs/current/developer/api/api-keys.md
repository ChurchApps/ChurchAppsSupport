---
title: "API Keys"
---

# API Keys

<div class="article-intro">

Ang API keys (personal access tokens) ang pinakasimpleng paraan para mag-authenticate sa B1 API mula sa server-side script, third-party connector (Zapier, Make, Google Sheets), o saanman na masyadong mabigat ang buong OAuth flow. Ang key ay nakatali sa isang partikular na tao sa isang partikular na simbahan at minamana ang mga permission ng taong iyon, na pinaliit ng opsyonal na hanay ng mga scope.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Ang church admin na may permission na **Edit Settings** ang gumagawa at namamahala ng mga key
- Ipinapakita ang buong key **minsan lamang** sa paggawa -- itago ito kaagad sa ligtas na lugar
- Dapat gumamit ng **HTTPS** ang lahat ng API request

</div>

## Format ng Key

Ganito ang itsura ng B1 API key:

```
cak_<prefix>.<secret>
```

- `cak_` -- nakapirmi na identifier (ang prefix ng API key na tinutugma ng auth layer)
- `<prefix>` -- 8-karakter na pampublikong lookup segment
- `<secret>` -- 48-karakter na secret; SHA-256 hash lamang nito ang itinatabi sa server

Ipinapasa ang buong key sa server sa karaniwang bearer header:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

Dinidirekta ng API auth layer ang anumang token na nagsisimula sa `cak_` sa API-key path, hinahash ang secret, hinahanap ito ayon sa prefix, at kinukuha ang kasalukuyang permission ng taong pagmamay-ari ng key -- kaya agad na nagkakabisa sa susunod na request ang pagbawi ng permission sa B1Admin, at hindi kailanman nawawalan ng sync ang key sa role.

## Paglikha ng Key (B1Admin)

1. Mag-sign in sa B1Admin bilang user na may **Edit Settings**.
2. Buksan ang **Settings → Developer → API Keys**.
3. I-click ang **New API Key**, bigyan ito ng madaling makilalang pangalan (hal. "Zapier -- donations sync"), piliin ang mga scope na dapat taglayin ng key, at i-click ang **Save**.
4. Ipinapakita ang buong `cak_…` key **minsan lamang** sa isang dialog. Kopyahin ito sa config ng iyong integration bago isara -- walang paraan para makuha ito muli. Maaari kang laging gumawa ng bagong key.

## Mga Scope

Ang scope ay **nagpapaliit** sa kayang gawin ng key -- hindi ito kailanman makapagbibigay ng permission na wala sa mismong tao. Ang walang laman o walang scope ay nangangahulugang taglay ng key ang buong permission set ng tao.

| Scope | Pinapayagan |
|---|---|
| `people:read` / `people:write` | Tingnan / i-edit ang mga tao, household, at miyembro ng grupo |
| `groups:read` / `groups:write` | Tingnan / i-edit ang mga grupo at ang kanilang membership |
| `donations:read` / `donations:write` | Tingnan / itala ang mga donasyon |
| `attendance:read` / `attendance:write` | Tingnan / itala ang attendance, session, check-in |
| `forms:write` | Pamahalaan ang mga form (kasama na ang read access) |
| `content:read` / `content:write` | Tingnan / i-edit ang website content, registration, streaming |
| `messaging:read` / `messaging:write` | Magbasa ng mensahe; kasama sa write ang pagpapadala ng SMS |
| `roles:read` / `roles:write` | Tingnan / i-edit ang mga kahulugan ng role |
| `settings:read` / `settings:write` | Tingnan / i-edit ang mga setting ng simbahan (**kailangan** para programmatic na magrehistro ng webhook) |
| `workflows:read` / `workflows:write` | Tingnan ang mga workflow at task / patakbuhin at i-edit ang mga workflow. Ang pagpapatakbo ng workflow ay maaaring magpadala ng email at text, magpaputok ng webhook, at magbago ng membership ng grupo |
| `offline_access` | Pinapayagan ang matagal na refresh token (para sa OAuth flow lamang -- walang epekto sa API keys) |

Kasama na sa `write` na scope ang katumbas nitong `read`. Sadyang hindi inilalantad bilang scope ang mga permission ng server at domain admin -- hindi kailanman makakaakyat sa site administration ang isang scoped na credential.

:::tip
Kung gagamitin mo ang key para magrehistro ng webhook (hal. para sa Zapier o Make integration), kailangan ng key ang `settings:write`. Ang key na `people:read` lamang ay tahimik na makakatanggap ng 403 sa `POST /membership/webhooks`.
:::

## Paggamit ng Key

Kapareho ng alinmang bearer token -- tinatanggap ng bawat naka-authenticate na endpoint ang API keys nang eksakto gaya ng pagtanggap nito sa JWT:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

Ang request na kulang sa scope ng key ay sasagot ng **403 Forbidden** na may parehong hugis gaya ng anumang error ng tinanggihang permission.

## Pamamahala ng Key sa Pamamagitan ng API

Lahat ng endpoint ay nasa ilalim ng `/membership/apiKeys` path ng Membership module at nangangailangan ng JWT (hindi API key) mula sa church admin na may **Edit Settings**.

| Method at Path | Layunin |
|---|---|
| `GET /membership/apiKeys` | Ilista ang mga key ng simbahan (walang secret -- `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt` lamang) |
| `GET /membership/apiKeys/scopes` | Listahan ng lahat ng available na pangalan ng scope -- para sa UI ng paggawa ng key |
| `POST /membership/apiKeys` | Gumawa ng bagong key. Body: `{ "name": "...", "scopes": ["people:read"] }`. Kasama sa response ang buong `cak_…` key **minsan lamang**. |
| `DELETE /membership/apiKeys/:id` | Bawiin ang key -- nagkakabisa sa susunod na request |

Agad nang hindi na gumagana ang nabawing key -- walang grace period.

## Mga Pinakamahusay na Gawi

- **Isang key bawat integration.** Kung may nakompromiso, binabawi mo lamang ang isang key nang hindi nasisira ang iba.
- **Gumawa ng pinakamakitid na scope na gagana.** Ang Google Sheets export ay kailangan lamang ng `people:read`, hindi `settings:write`.
- **Itali ang key sa service account, hindi sa totoong staff.** Kapag umalis ang isang staff, natatapos ang kanyang B1 access -- at kasama nitong natatapos ang anumang key na ginawa sa ilalim ng kanyang pagkakakilanlan.
- **Itago ang mga key sa secret manager** (environment variables ng iyong hosting provider, AWS Secrets Manager, atbp.) -- hindi kailanman sa source control.
- **I-rotate ang mga key** kung pinaghihinalaang nalantad: gumawa ng bagong key, i-update ang integration, pagkatapos burahin ang lumang key.

## Pagkakaiba sa OAuth

Angkop ang API keys kapag **ang iyong simbahan lamang ang gumagamit ng integration**. Para sa connector na kailangang mag-access ng maraming simbahan na may tahasang pahintulot ng bawat isa -- tulad ng SaaS app na ibinabahagi sa B1 community -- gamitin ang [OAuth and Connected Apps](./connected-apps) sa halip.

| | API key | OAuth |
|---|---|---|
| Sino ang nag-i-install | Isang church admin | Bawat church admin ay nag-a-authorize sa app |
| Auth header | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Haba ng buhay ng token | Hanggang mabawi | Access ≈ 7 araw, refresh ≈ 90 araw |
| Pinakamainam para sa | Internal na script, Zapier/Make/Sheets connector | Multi-tenant na third-party app |
