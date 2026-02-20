---
title: "Mga Endpoint ng Doing"
---

# Mga Endpoint ng Doing

<div class="article-intro">

Pinapamahalaan ng Doing module ang pagpaplano ng serbisyo, pag-iiskedyul ng boluntaryo, pamamahala ng gawain, at mga automation. Nagbibigay ito ng mga kasangkapan para sa paglikha ng mga plano ng serbisyo na may mga oras at posisyon, pagtatalaga ng mga boluntaryo, pamamahala ng mga blockout date, pagbuo ng mga item ng service order, pagkonekta sa mga panlabas na content provider, at pag-configure ng mga automated na daloy ng trabaho na may mga kundisyon at aksyon.

</div>

**Base path:** `/doing`

## Mga Plano

Base path: `/doing/plans`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng plano para sa simbahan |
| GET | `/:id` | JWT | — | Kunin ang isang plano ayon sa ID |
| GET | `/ids?ids=` | JWT | — | Kunin ang maraming plano ayon sa mga ID na pinaghiwalay ng kuwit |
| GET | `/types/:planTypeId` | JWT | — | Kunin ang mga plano ayon sa uri ng plano |
| GET | `/presenter` | JWT | — | Kunin ang mga plano para sa susunod na 7 araw (presenter view) |
| GET | `/public/current/:planTypeId` | Pampubliko | — | Kunin ang kasalukuyang plano para sa isang uri ng plano |
| POST | `/` | JWT | — | Lumikha o mag-update ng mga plano (tumatanggap ng isang object o array) |
| POST | `/copy/:id` | JWT | — | Kopyahin ang isang plano kasama ang mga posisyon, oras, takdang-aralin, at mga item ng service order. Kasama sa body ang `copyMode` ("none", "positions", "all") at `copyServiceOrder` (boolean) |
| POST | `/autofill/:id` | JWT | — | Awtomatikong punan ang mga takdang-aralin ng boluntaryo para sa isang plano. Body: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Burahin ang isang plano at lahat ng kaugnay na oras, takdang-aralin, posisyon, at mga item ng plano |

### Halimbawa: Kopyahin ang isang Plano

```
POST /doing/plans/copy/abc-123
Authorization: Bearer <token>

{
  "serviceDate": "2026-03-01T10:00:00.000Z",
  "copyMode": "all",
  "copyServiceOrder": true
}
```

```json
{
  "id": "def-456",
  "churchId": "church-1",
  "serviceDate": "2026-03-01T10:00:00.000Z"
}
```

## Mga Uri ng Plano

Base path: `/doing/planTypes`

Nag-eextend ng CRUD base class (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — walang pagsusuri ng pahintulot).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng uri ng plano |
| GET | `/:id` | JWT | — | Kunin ang isang uri ng plano ayon sa ID |
| GET | `/ids?ids=` | JWT | — | Kunin ang maraming uri ng plano ayon sa mga ID na pinaghiwalay ng kuwit |
| GET | `/ministryId/:ministryId` | JWT | — | Kunin ang mga uri ng plano para sa isang ministeryo |
| POST | `/` | JWT | — | Lumikha o mag-update ng mga uri ng plano |
| DELETE | `/:id` | JWT | — | Burahin ang isang uri ng plano |

## Mga Item ng Plano

Base path: `/doing/planItems`

Pinapamahalaan ang mga item ng service order (mga header, seksyon, kanta, atbp.) na inorganisa sa isang parent-child na istrukturang puno.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang item ng plano ayon sa ID |
| GET | `/ids?ids=` | JWT | — | Kunin ang maraming item ng plano ayon sa mga ID na pinaghiwalay ng kuwit |
| GET | `/plan/:planId` | JWT | — | Kunin ang lahat ng item ng plano para sa isang plano (nagbabalik ng istrukturang puno) |
| GET | `/presenter/:churchId/:planId` | Pampubliko | — | Kunin ang mga item ng plano para sa presenter view (nagbabalik ng istrukturang puno) |
| POST | `/` | JWT | — | Lumikha o mag-update ng mga item ng plano |
| POST | `/sort` | JWT | — | I-update ang sort order para sa isang item ng plano (muling isinasaayos ang mga kapatid) |
| DELETE | `/:id` | JWT | — | Burahin ang isang item ng plano |

## Feed ng Plano

Base path: `/doing/planFeed`

Nagbibigay ng mga feed ng item ng plano para sa presenter. Kung walang mga item ng plano, awtomatikong nag-populate mula sa Lessons.church venue feed gamit ang `contentId` ng plano.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Pampubliko | — | Kunin ang feed ng plano para sa presenter (awtomatikong nag-populate mula sa venue feed kung walang laman) |

## Mga Posisyon

Base path: `/doing/positions`

Nag-eextend ng CRUD base class (GET `/:id`, POST `/`, DELETE `/:id` — walang pagsusuri ng pahintulot).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang posisyon ayon sa ID |
| GET | `/ids?ids=` | JWT | — | Kunin ang maraming posisyon ayon sa mga ID na pinaghiwalay ng kuwit |
| GET | `/plan/ids?planIds=` | JWT | — | Kunin ang mga posisyon para sa maraming plano ayon sa mga plan ID na pinaghiwalay ng kuwit |
| GET | `/plan/:planId` | JWT | — | Kunin ang lahat ng posisyon para sa isang plano |
| POST | `/` | JWT | — | Lumikha o mag-update ng mga posisyon |
| DELETE | `/:id` | JWT | — | Burahin ang isang posisyon |

## Mga Oras

Base path: `/doing/times`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | Ilista ang lahat ng oras para sa simbahan |
| GET | `/:id` | JWT | — | Kunin ang isang oras ayon sa ID |
| GET | `/plans?planIds=` | JWT | — | Kunin ang mga oras para sa maraming plano ayon sa mga plan ID na pinaghiwalay ng kuwit |
| GET | `/plan/:planId` | JWT | — | Kunin ang lahat ng oras para sa isang plano |
| POST | `/` | JWT | — | Lumikha o mag-update ng mga oras |
| DELETE | `/:id` | JWT | — | Burahin ang isang oras |

## Mga Takdang-aralin

Base path: `/doing/assignments`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Kunin ang mga takdang-aralin para sa kasalukuyang gumagamit |
| GET | `/:id` | JWT | — | Kunin ang isang takdang-aralin ayon sa ID |
| GET | `/plan/ids?planIds=` | JWT | — | Kunin ang mga takdang-aralin para sa maraming plano ayon sa mga plan ID na pinaghiwalay ng kuwit |
| GET | `/plan/:planId` | JWT | — | Kunin ang lahat ng takdang-aralin para sa isang plano |
| POST | `/` | JWT | — | Lumikha o mag-update ng mga takdang-aralin (default na katayuan ay "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | Tanggapin ang isang takdang-aralin (dapat ang nakatalagang tao) |
| POST | `/decline/:id` | JWT | — | Tanggihan ang isang takdang-aralin (dapat ang nakatalagang tao) |
| DELETE | `/:id` | JWT | — | Burahin ang isang takdang-aralin |

### Halimbawa: Tanggapin ang isang Takdang-aralin

```
POST /doing/assignments/accept/assign-123
Authorization: Bearer <token>
```

```json
{
  "id": "assign-123",
  "personId": "person-456",
  "positionId": "pos-789",
  "planId": "plan-abc",
  "status": "Accepted"
}
```

## Mga Blockout Date

Base path: `/doing/blockoutDates`

Nag-eextend ng CRUD base class (GET `/:id`, DELETE `/:id` — walang pagsusuri ng pahintulot).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang blockout date ayon sa ID |
| GET | `/ids?ids=` | JWT | — | Kunin ang maraming blockout date ayon sa mga ID na pinaghiwalay ng kuwit |
| GET | `/my` | JWT | — | Kunin ang mga blockout date para sa kasalukuyang gumagamit |
| GET | `/upcoming` | JWT | — | Kunin ang lahat ng paparating na blockout date para sa simbahan |
| POST | `/` | JWT | — | Lumikha o mag-update ng mga blockout date (default na personId ay kasalukuyang gumagamit kung hindi ibinigay) |
| DELETE | `/:id` | JWT | — | Burahin ang isang blockout date |

## Mga Gawain

Base path: `/doing/tasks`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Kunin ang mga bukas na gawain para sa kasalukuyang gumagamit |
| GET | `/:id` | JWT | — | Kunin ang isang gawain ayon sa ID |
| GET | `/closed` | JWT | — | Kunin ang mga saradong gawain para sa kasalukuyang gumagamit |
| GET | `/timeline?taskIds=` | JWT | — | Kunin ang data ng timeline para sa mga gawain ayon sa mga task ID na pinaghiwalay ng kuwit |
| GET | `/directoryUpdate/:personId` | JWT | — | Kunin ang gawain ng pag-update ng direktoryo para sa isang tao |
| POST | `/` | JWT | — | Lumikha o mag-update ng mga gawain. Magdagdag ng `?type=directoryUpdate` para pangasiwaan ang mga gawain ng pag-update ng direktoryo (awtomatikong nag-a-upload ng mga larawan) |
| POST | `/loadForGroups` | JWT | — | I-load ang mga gawain para sa mga partikular na grupo. Body: `{ groupIds: [], status: "Open" }` |

## Mga Automation

Base path: `/doing/automations`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng automation para sa simbahan |
| GET | `/:id` | JWT | — | Kunin ang isang automation ayon sa ID |
| GET | `/check` | Pampubliko | — | Mag-trigger ng pagsusuri ng lahat ng automation |
| POST | `/` | JWT | — | Lumikha o mag-update ng mga automation |
| DELETE | `/:id` | JWT | — | Burahin ang isang automation |

## Mga Aksyon

Base path: `/doing/actions`

Tinutukoy ng mga aksyon kung ano ang mangyayari kapag na-trigger ang isang automation.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang aksyon ayon sa ID |
| GET | `/automation/:id` | JWT | — | Kunin ang lahat ng aksyon para sa isang automation |
| POST | `/` | JWT | — | Lumikha o mag-update ng mga aksyon |
| DELETE | `/:id` | JWT | — | Burahin ang isang aksyon |

## Mga Kundisyon

Base path: `/doing/conditions`

Tinutukoy ng mga kundisyon ang mga pamantayan na nagti-trigger ng isang automation.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang kundisyon ayon sa ID |
| GET | `/automation/:id` | JWT | — | Kunin ang lahat ng kundisyon para sa isang automation |
| POST | `/` | JWT | — | Lumikha o mag-update ng mga kundisyon |
| DELETE | `/:id` | JWT | — | Burahin ang isang kundisyon |

## Mga Conjunction

Base path: `/doing/conjunctions`

Nag-uugnay ang mga conjunction ng maraming kundisyon sa isang automation (AND/OR logic).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang conjunction ayon sa ID |
| GET | `/automation/:id` | JWT | — | Kunin ang lahat ng conjunction para sa isang automation |
| POST | `/` | JWT | — | Lumikha o mag-update ng mga conjunction |
| DELETE | `/:id` | JWT | — | Burahin ang isang conjunction |

## Mga Auth ng Content Provider

Base path: `/doing/contentProviderAuths`

Nag-eextend ng CRUD base class (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — walang pagsusuri ng pahintulot).

Pinapamahalaan ang mga talaan ng OAuth authentication para sa mga panlabas na content provider (hal., mga integrasyon ng presentation software).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng auth ng content provider |
| GET | `/:id` | JWT | — | Kunin ang isang auth ng content provider ayon sa ID |
| GET | `/ids?ids=` | JWT | — | Kunin ang maraming auth ng content provider ayon sa mga ID na pinaghiwalay ng kuwit |
| GET | `/ministry/:ministryId` | JWT | — | Kunin ang lahat ng auth ng content provider para sa isang ministeryo |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Kunin ang talaan ng auth para sa isang partikular na ministeryo at provider |
| POST | `/` | JWT | — | Lumikha o mag-update ng mga auth ng content provider |
| DELETE | `/:id` | JWT | — | Burahin ang isang auth ng content provider |

## Provider Proxy

Base path: `/doing/providerProxy`

Nagpo-proxy ng mga kahilingan sa mga panlabas na content provider (hal., ProPresenter, EasyWorship). Awtomatikong hina-handle ang token refresh kapag nag-expire ang mga token.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | I-browse ang mga file ng content provider. Body: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Kunin ang mga presentation mula sa isang content provider. Body: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Kunin ang isang playlist mula sa isang content provider. Body: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Kunin ang mga tagubilin para sa isang content item. Body: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Kunin ang mga pinalawak na tagubilin para sa isang content item. Body: `{ ministryId, providerId, path }` |

## Mga Kaugnay na Pahina

- [Mga Endpoint ng Membership](./membership) — Mga tao, grupo, tungkulin, at mga pahintulot
- [Mga Endpoint ng Attendance](./attendance) — Pagsubaybay ng serbisyo at pagbisita
- [Istraktura ng Module](../module-structure) — Mga pattern ng organisasyon ng code
