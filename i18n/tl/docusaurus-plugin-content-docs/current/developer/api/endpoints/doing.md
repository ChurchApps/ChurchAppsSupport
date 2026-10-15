---
title: "Mga Doing Endpoint"
---

# Mga Doing Endpoint

<div class="article-intro">

Pinamamahalaan ng Doing module ang service planning, iskedyul ng volunteer, pamamahala ng gawain, at automation. Nagbibigay ito ng mga kasangkapan para gumawa ng service plan na may oras at posisyon, mag-assign ng volunteer, mamahala ng blockout date, bumuo ng mga item ng service order, kumonekta sa mga external na content provider, at mag-configure ng mga automated na workflow na may kondisyon at aksyon.

</div>

**Base path:** `/doing`

## Mga Plano

Base path: `/doing/plans`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng plano ng simbahan |
| GET | `/:id` | JWT | — | Kunin ang isang plano ayon sa ID |
| GET | `/ids?ids=` | JWT | — | Kunin ang maraming plano ayon sa mga ID na pinaghihiwalay ng kuwit |
| GET | `/types/:planTypeId` | JWT | — | Kunin ang mga plano ayon sa plan type |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + ministry edit | I-preview ang ipapadalang **Text Volunteers** ng serving overview: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` para sa mga volunteer na naka-assign sa saklaw (isa bawat tao, nilalaktawan ang mga opted-out at walang numero, dinededuplicate ang mga shared na numero, may limit na 200) |
| GET | `/presenter` | JWT | — | Kunin ang mga plano para sa susunod na 7 araw (presenter view) |
| GET | `/public/current/:planTypeId` | Public | — | Kunin ang kasalukuyang plano para sa isang plan type |
| GET | `/public/signup/:churchId` | Public | — | Mga planong bukas para sa self-signup, pinakamalapit muna, bawat isa ay may kanilang self-signup na posisyon (naka-sort ayon sa `categoryName`, pagkatapos `name`, kasama ang `filledCount` ng mga Accepted/Unconfirmed na assignment) at mga oras. Walang pangalan ng volunteer. Kapag ang church setting na `volunteerSignupNextOnly` ay `"true"`, ang unang plano lamang ng bawat plan type ang ibinabalik |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` para sa mga self-signup na posisyon ng plano (mga display name ng mga Accepted/Unconfirmed na assignee). Nagbabalik ng `[]` maliban kung naka-on ang `showVolunteerNames` ng plano |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga plano (tumatanggap ng isang object o array) |
| POST | `/copy/:id` | JWT | Ministry edit | Kopyahin ang isang plano kasama ang mga posisyon, oras, assignment, at mga item ng service order. Kasama sa body ang `ministryId`, `serviceDate`, `copyMode` (`"none"`, `"positions"`, `"all"`) at `copyServiceOrder` (boolean). Kung walang `targetPlanId`, gagawa ng bagong plano, at ang `notes`, `signupDeadlineHours`, `showVolunteerNames`, at `autoReplaceOnDecline` ay ililipat mula sa pinagmulang plano maliban kung ibigay ng body ang mga ito. Kapag may `targetPlanId`, ang kopya ay pupunuin ang umiiral na planong iyon (dapat may karapatan ang tumatawag na i-edit ito). Tinatawag ng opsyong **Repeat weekly** ng B1Admin ang endpoint na ito minsan bawat linggo, bawat beses na kumokopya mula sa planong ginawa noong nakaraang linggo |
| POST | `/textRange` | JWT | `texting.send` + ministry edit | I-text ang bawat volunteer na naka-assign sa saklaw ng petsa sa pamamagitan ng texting provider ng simbahan. Body: `{ startDate, endDate, ministryId, planTypeId?, message }` (mensaheng hanggang 1600 karakter; nireresolba ang mga merge field para sa bawat tatanggap). Nagbabalik ng mga bilang ng preview kasama ang `recipientCount`, `successCount`, `failCount`, at `error` (`no_provider` o `insufficient_credits`) kapag natigil nang maaga ang pagpapadala |
| POST | `/autofill/:id` | JWT | — | Awtomatikong punan ang mga volunteer assignment para sa isang plano. Body: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Burahin ang isang plano at lahat ng kaugnay na oras, assignment, posisyon, at item ng plano |

### Halimbawa: Kopyahin ang Isang Plano

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

Nagmamana mula sa CRUD base class (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` -- walang permission check).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng plan type |
| GET | `/:id` | JWT | — | Kunin ang isang plan type ayon sa ID |
| GET | `/ids?ids=` | JWT | — | Kunin ang maraming plan type ayon sa mga ID na pinaghihiwalay ng kuwit |
| GET | `/ministryId/:ministryId` | JWT | — | Kunin ang mga plan type ng isang ministry |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga plan type |
| DELETE | `/:id` | JWT | — | Burahin ang isang plan type |

## Mga Item ng Plano

Base path: `/doing/planItems`

Pinamamahalaan ang mga item ng service order (mga header, seksyon, awit, atbp.) na nakaayos sa isang parent-child tree structure.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang item ng plano ayon sa ID |
| GET | `/ids?ids=` | JWT | — | Kunin ang maraming item ng plano ayon sa mga ID na pinaghihiwalay ng kuwit |
| GET | `/plan/:planId` | JWT | — | Kunin ang lahat ng item ng plano (nagbabalik ng tree structure) |
| GET | `/presenter/:churchId/:planId` | Public | — | Kunin ang mga item ng plano para sa presenter view (nagbabalik ng tree structure) |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga item ng plano |
| POST | `/sort` | JWT | — | I-update ang sort order ng isang item ng plano (muling inaayos ang mga kapatid) |
| DELETE | `/:id` | JWT | — | Burahin ang isang item ng plano |

## Feed ng Plano

Base path: `/doing/planFeed`

Nagbibigay ng mga feed ng item ng plano para sa presenter. Kung walang umiiral na item ng plano, awtomatikong pupunuin mula sa venue feed ng Lessons.church gamit ang `contentId` ng plano.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Public | — | Kunin ang plan feed para sa presenter (awtomatikong pinupunan mula sa venue feed kapag walang laman) |

## Mga Posisyon

Base path: `/doing/positions`

Nagmamana mula sa CRUD base class (GET `/:id`, POST `/`, DELETE `/:id` -- walang permission check).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang posisyon ayon sa ID |
| GET | `/ids?ids=` | JWT | — | Kunin ang maraming posisyon ayon sa mga ID na pinaghihiwalay ng kuwit |
| GET | `/plan/ids?planIds=` | JWT | — | Kunin ang mga posisyon ng maraming plano ayon sa mga plan ID na pinaghihiwalay ng kuwit |
| GET | `/plan/:planId` | JWT | — | Kunin ang lahat ng posisyon ng isang plano |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga posisyon |
| DELETE | `/:id` | JWT | — | Burahin ang isang posisyon |

## Mga Oras

Base path: `/doing/times`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | Ilista ang lahat ng oras ng simbahan |
| GET | `/:id` | JWT | — | Kunin ang isang oras ayon sa ID |
| GET | `/plans?planIds=` | JWT | — | Kunin ang mga oras ng maraming plano ayon sa mga plan ID na pinaghihiwalay ng kuwit |
| GET | `/plan/:planId` | JWT | — | Kunin ang lahat ng oras ng isang plano |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga oras |
| DELETE | `/:id` | JWT | — | Burahin ang isang oras |

## Mga Assignment

Base path: `/doing/assignments`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Kunin ang mga assignment ng kasalukuyang user |
| GET | `/my/upcoming` | JWT | — | Hanggang 20 sa mga assignment ng kasalukuyang user sa mga planong mula kahapon pataas (ang mga penciled-in o `prepared` na plano ay nilalaktawan), pinakamalapit muna: `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Sumusuporta sa serving preview sa home page ng member |
| GET | `/:id` | JWT | — | Kunin ang isang assignment ayon sa ID |
| GET | `/plan/ids?planIds=` | JWT | — | Kunin ang mga assignment ng maraming plano ayon sa mga plan ID na pinaghihiwalay ng kuwit |
| GET | `/plan/:planId` | JWT | — | Kunin ang lahat ng assignment ng isang plano |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga assignment (ginagawang "Unconfirmed" ang status bilang default) |
| POST | `/accept/:id` | JWT | — | Tanggapin ang isang assignment (dapat ang naka-assign na tao) |
| POST | `/decline/:id` | JWT | — | Tanggihan ang isang assignment (dapat ang naka-assign na tao) |
| DELETE | `/:id` | JWT | — | Burahin ang isang assignment |

### Halimbawa: Tanggapin ang Isang Assignment

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

Nagmamana mula sa CRUD base class (GET `/:id`, DELETE `/:id` -- walang permission check).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang blockout date ayon sa ID |
| GET | `/ids?ids=` | JWT | — | Kunin ang maraming blockout date ayon sa mga ID na pinaghihiwalay ng kuwit |
| GET | `/my` | JWT | — | Kunin ang mga blockout date ng kasalukuyang user |
| GET | `/upcoming` | JWT | — | Kunin ang lahat ng paparating na blockout date ng simbahan |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga blockout date (ginagawang personId ang kasalukuyang user kung walang ibinigay) |
| DELETE | `/:id` | JWT | — | Burahin ang isang blockout date |

## Mga Gawain

Base path: `/doing/tasks`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Kunin ang mga bukas na gawain ng kasalukuyang user |
| GET | `/:id` | JWT | — | Kunin ang isang gawain ayon sa ID |
| GET | `/:id/contact` | JWT | Can view the card | Impormasyon sa contact ng taong tinutukoy ng workflow card: `{ personId, displayName, mobilePhone, email }`. Nagbibigay-daan sa isang naka-assign na caller na walang People access na maabot ang tao |
| GET | `/closed` | JWT | — | Kunin ang mga sarado nang gawain ng kasalukuyang user |
| GET | `/timeline?taskIds=` | JWT | — | Kunin ang timeline data ng mga gawain ayon sa mga task ID na pinaghihiwalay ng kuwit |
| GET | `/directoryUpdate/:personId` | JWT | — | Kunin ang directory update task ng isang tao |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga gawain. Idagdag ang `?type=directoryUpdate` upang hawakan ang mga directory update task (awtomatikong nag-u-upload ng mga larawan) |
| POST | `/:id/conversation` | JWT | `tasks.edit` o card assignee | Ikabit ang usapan ng mga tala sa isang card. Body: `{ conversationId }`. Ang unang nakabit na usapan ang mananaig; ang mga susunod na tawag ay nagbabalik ng card na hindi nagbago |
| POST | `/loadForGroups` | JWT | — | I-load ang mga gawain para sa mga partikular na group. Body: `{ groupIds: [], status: "Open" }` |

## Mga Automation

Base path: `/doing/automations`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng automation ng simbahan |
| GET | `/:id` | JWT | — | Kunin ang isang automation ayon sa ID |
| GET | `/check` | Public | — | I-trigger ang pagsuri sa lahat ng automation |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga automation |
| DELETE | `/:id` | JWT | — | Burahin ang isang automation |

## Mga Aksyon

Base path: `/doing/actions`

Tinutukoy ng mga aksyon kung ano ang mangyayari kapag na-trigger ang isang automation.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang aksyon ayon sa ID |
| GET | `/automation/:id` | JWT | — | Kunin ang lahat ng aksyon ng isang automation |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga aksyon |
| DELETE | `/:id` | JWT | — | Burahin ang isang aksyon |

## Mga Kondisyon

Base path: `/doing/conditions`

Tinutukoy ng mga kondisyon ang pamantayan na nagti-trigger ng isang automation.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang kondisyon ayon sa ID |
| GET | `/automation/:id` | JWT | — | Kunin ang lahat ng kondisyon ng isang automation |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga kondisyon |
| DELETE | `/:id` | JWT | — | Burahin ang isang kondisyon |

## Mga Conjunction

Base path: `/doing/conjunctions`

Pinag-uugnay ng mga conjunction ang maraming kondisyon sa isang automation (AND/OR logic).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang conjunction ayon sa ID |
| GET | `/automation/:id` | JWT | — | Kunin ang lahat ng conjunction ng isang automation |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga conjunction |
| DELETE | `/:id` | JWT | — | Burahin ang isang conjunction |

## Mga Auth ng Content Provider

Base path: `/doing/contentProviderAuths`

Nagmamana mula sa CRUD base class (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` -- walang permission check).

Pinamamahalaan ang mga OAuth authentication record para sa mga external na content provider (hal., mga integration ng presentation software).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng auth ng content provider |
| GET | `/:id` | JWT | — | Kunin ang isang auth ng content provider ayon sa ID |
| GET | `/ids?ids=` | JWT | — | Kunin ang maraming auth ng content provider ayon sa mga ID na pinaghihiwalay ng kuwit |
| GET | `/ministry/:ministryId` | JWT | — | Kunin ang lahat ng auth ng content provider para sa isang ministry |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Kunin ang auth record para sa isang partikular na ministry at provider |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga auth ng content provider |
| DELETE | `/:id` | JWT | — | Burahin ang isang auth ng content provider |

## Provider Proxy

Base path: `/doing/providerProxy`

Ipinapasa ang mga kahilingan sa mga external na content provider (hal., ProPresenter, EasyWorship). Awtomatikong humahawak ng token refresh kapag nag-expire ang mga token.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | I-browse ang mga file ng content provider. Body: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Kunin ang mga presentation mula sa content provider. Body: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Kunin ang playlist mula sa content provider. Body: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Kunin ang mga tagubilin para sa isang content item. Body: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Kunin ang pinalawak na mga tagubilin para sa isang content item. Body: `{ ministryId, providerId, path }` |

## Mga Kaugnay na Pahina

- [Membership Endpoints](./membership) -- Mga tao, group, role, at permission
- [Attendance Endpoints](./attendance) -- Pagsubaybay sa serbisyo at pagbisita
- [Module Structure](../module-structure) -- Mga pattern ng organisasyon ng code
