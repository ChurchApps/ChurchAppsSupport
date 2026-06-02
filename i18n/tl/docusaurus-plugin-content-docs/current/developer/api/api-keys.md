---
title: "API Keys"
---

# API Keys

<div class="article-intro">

Ang API keys (personal access tokens) ay ang pinakasimpleng paraan upang mag-authenticate laban sa B1 API mula sa isang server-side script. Ang isang susi ay nakatali sa isang partikular na tao sa isang partikular na simbahan at nagmamana ng mga pahintulot ng taong iyon, napakaliit ng isang opsyonal na hanay ng mga scope.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Ang church admin na may **Edit Settings** na pahintulot ay lumilikha at namamahal sa mga susi
- Ang raw key ay ipinakita **minsan** sa paglikha -- i-imbak ito sa ligtas na lugar kaagad
- Lahat ng API requests ay dapat gumagamit ng **HTTPS**

</div>

## Format ng Susi

Ang isang B1 API key ay parang `cak_<prefix>.<secret>`.

Ang buong susi ay ipinasok sa server sa standard bearer header:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

Ang API auth layer ay nagsasagawa ng anumang token na nagsisimula sa `cak_` sa API-key path, at nalutas ang mga pahintulot ng kasalukuyang tao ng susi.

## Lumilikha ng isang Susi (B1Admin)

1. Mag-sign in sa B1Admin bilang isang user na may **Edit Settings**.
2. Buksan ang **Settings → Developer → API Keys**.
3. I-click ang **New API Key**, bigyan ito ng kinikilalang pangalan, piliin ang mga scope, at **Save**.
4. Ang buong `cak_…` key ay ipinakita **minsan** sa isang dialog. Kopyahin ito bago magsara.

## Mga Scope

Ang isang scope ay **naghahangad** kung ano ang maaaring gawin ng isang susi.

| Scope | Nagbibigay-daan |
|---|---|
| `people:read` / `people:write` | Tingnan / i-edit ang mga tao, pamilya, mga miyembro ng grupo |
| `groups:read` / `groups:write` | Tingnan / i-edit ang mga grupo at kanilang pagiging miyembro |
| `donations:read` / `donations:write` | Tingnan / mag-record ng mga donasyon |
| `attendance:read` / `attendance:write` | Tingnan / mag-record ng attendance, sessions, check-ins |
| `forms:write` | Pamahalaan ang mga form |
| `content:read` / `content:write` | Tingnan / i-edit ang website content |
| `messaging:read` / `messaging:write` | Basahin ang messaging |
| `roles:read` / `roles:write` | Tingnan / i-edit ang mga kahulugan ng papel |
| `settings:read` / `settings:write` | Tingnan / i-edit ang mga setting ng simbahan |
| `offline_access` | Payagan ang mahabang buhay ng refresh tokens |

:::tip
Kung gagamitin mo ang susi upang magrehistro ng mga webhooks, ang susi ay nangangailangan ng `settings:write`.
:::

## Paggamit ng Susi

Kapareho ng anumang bearer token -- bawat authenticated endpoint ay tumatanggap ng API keys na eksakto tulad ng tinatanggap nito ang JWTs:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

## Pamamahalaan ang Mga Susi sa pamamagitan ng API

| Pamamaraan at Path | Layunin |
|---|---|
| `GET /membership/apiKeys` | Listahan ang mga susi ng simbahan |
| `GET /membership/apiKeys/scopes` | Listahan ng lahat ng available na scope |
| `POST /membership/apiKeys` | Lumikha ng isang bagong susi |
| `DELETE /membership/apiKeys/:id` | I-revoke ang isang susi |

## Mga Best Practice

- **Isang susi bawat integration.** Kung may napinsalang kahit ano ay i-revoke mo ang isang susi nang hindi sinisira ang iba.
- **Mint ang pinakamaliit na scope na gumagana.** Ang isang Google Sheets export ay kailangan lamang ng `people:read`.
- **Itali ang susi sa isang service account, hindi isang tunay na miyembro ng staff.**
- **Mag-imbak ng mga susi sa isang secret manager** -- hindi kailanman sa source control.
- **I-rotate ang mga susi** kung ikaw ay nagsususpetsa ng exposure.

## Paano Ito Naiiba mula sa OAuth

Ang mga API keys ay angkop kapag **ang iyong simbahan lamang ang gumagamit ng integration**. Para sa isang connector na kailangang mag-access ng maraming simbahan, gamitin ang [OAuth at Connected Apps](./connected-apps) halip.

| | API key | OAuth |
|---|---|---|
| Sino ang nag-install nito | Isang church admin | Bawat church admin |
| Auth header | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Token lifetime | Hanggang revoked | Access ≈ 7 araw, refresh ≈ 90 araw |
| Best para sa | Internal scripts, Zapier/Make/Sheets | Multi-tenant third-party apps |
