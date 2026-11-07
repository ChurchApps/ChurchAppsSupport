---
title: "Mga Doing Endpoint"
description: "Sanggunian ng endpoint ng Doing API para sa service plan, takda ng boluntaryo, gawain, at automation sa B1 Admin, kasama path, auth, at permission."
---

# Mga Doing Endpoint

<div class="article-intro">

Pinamamahalaan ng Doing module ang pagpaplano ng serbisyo, pag-iskedyul ng boluntaryo, pamamahala ng task, at mga automation. Nagbibigay ito ng mga kasangkapan para gumawa ng service plan na may oras at posisyon, magtakda ng mga boluntaryo, mamahala ng blockout date, bumuo ng mga item ng service order, kumonekta sa mga external na content provider, at mag-configure ng mga automated na workflow na may kondisyon at aksyon.

</div>

**Base path:** `/doing`

## Plans

Base path: `/doing/plans`

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng plan ng simbahan |
| GET | `/:id` | JWT | — | Kunin ang plan ayon sa ID |
| GET | `/ids?ids=` | JWT | — | Kunin ang maraming plan ayon sa mga ID na pinaghihiwalay ng kuwit |
| GET | `/types/:planTypeId` | JWT | — | Kunin ang mga plan ayon sa plan type |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + ministry edit | I-preview ang serving overview na ipapadala ng **Text Volunteers**: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` para sa mga boluntaryong nakatakda sa saklaw (isa bawat tao, nilalaktawan ang mga nag-opt out at walang numero, dinededuplicate ang mga shared number, limitado sa 200) |
| GET | `/presenter` | JWT | — | Kunin ang mga plan para sa susunod na 7 araw (presenter view) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Ministry edit | Mga aktibong serving assignment confirmation workflow (`workflowType = "assignmentConfirmation"`) na maaaring piliin ng isang plan: `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Public | — | Kunin ang kasalukuyang plan para sa isang plan type |
| GET | `/public/signup/:churchId` | Public | — | Mga plan na bukas para sa self-signup, pinakamalapit muna, bawat isa ay may mga self-signup position nito (nakaayos ayon sa `categoryName`, pagkatapos `name`, kasama ang `filledCount` ng mga Accepted/Unconfirmed na takda) at mga oras. Walang pangalan ng boluntaryo. Kapag ang setting ng simbahang `volunteerSignupNextOnly` ay `"true"`, ang unang plan lang ng bawat plan type ang ibinabalik. Kasama sa bawat `plan` ang kinakalkulang `signupDeadline` (ISO instant, o `null`): `signupDeadlineHours` bago ang pinakamaagang `service`-type na oras ng plan (anumang may-oras na entry kung walang service time; 9:00 sa time zone ng simbahan sa `serviceDate` kung walang oras ang plan) |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` para sa mga self-signup position ng plan (mga display name ng mga Accepted/Unconfirmed na itinakda). Nagbabalik ng `[]` maliban kung naka-on ang `showVolunteerNames` ng plan |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga plan (tumatanggap ng iisang object o array). Itakda ang `confirmationWorkflowId` para piliin ang plan sa isang serving confirmation workflow, o `null` para mag-opt out sa mga susunod na request. Ipadala ang `signupDeadlineHours: null` para burahin ang deadline; ang hindi pagsama ng field ay nagpapanatili sa naka-save na halaga |
| POST | `/copy/:id` | JWT | Ministry edit | Kopyahin ang plan kasama ang mga posisyon, oras, takda, at service order item. Kasama sa body ang `ministryId`, `serviceDate`, `copyMode` ("none", "positions", "all") at `copyServiceOrder` (boolean). Kung walang `targetPlanId`, gagawa ng bagong plan, at ang `notes`, `signupDeadlineHours`, `showVolunteerNames`, at `autoReplaceOnDecline` ay dadalhin mula sa source plan maliban kung ibibigay ang mga ito sa body. Kapag may `targetPlanId`, ang kopya ang pupuno sa umiiral na planong iyon (dapat kayang i-edit ng caller ito). Ang opsyong **Repeat weekly** ng B1Admin ay tumatawag nito minsan bawat linggo, bawat beses na kumokopya mula sa planong ginawa noong nakaraang linggo |
| POST | `/textRange` | JWT | `texting.send` + ministry edit | I-text ang bawat boluntaryong nakatakda sa saklaw ng petsa sa pamamagitan ng texting provider ng simbahan. Body: `{ startDate, endDate, ministryId, planTypeId?, message }` (message hanggang 1600 character; nireresolba ang mga merge field para sa bawat tatanggap). Nagbabalik ng mga bilang ng preview kasama ang `recipientCount`, `successCount`, `failCount`, at `error` (`no_provider` o `insufficient_credits`) kapag huminto nang maaga ang pagpapadala |
| POST | `/:id/issueRequests` | JWT | Plan edit | Ilabas ang mga bagong Unconfirmed at hindi pa na-notify na takda ng plan sa pamamagitan ng confirmation workflow nito: minamarkahan ang bawat isa bilang na-notify at nagsisimula ng isang workflow card bawat takda. Walang laman na body; nagbabalik ng `{ issued }`. Nabibigo maliban kung na-publish ang plan (hindi `prepared`), may aktibong `confirmationWorkflowId` na may kahit isang hakbang, at hindi pa lumilipas ang response deadline nito |
| POST | `/autofill/:id` | JWT | — | Awtomatikong punan ang mga takda ng boluntaryo para sa isang plan. Body: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Burahin ang plan at lahat ng kaugnay na oras, takda, posisyon, at plan item |

### Halimbawa: Kopyahin ang Isang Plan

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

## Plan Types

Base path: `/doing/planTypes`

Nagmamana mula sa CRUD base class (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — walang pagsusuri ng permiso).

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng plan type |
| GET | `/:id` | JWT | — | Kunin ang plan type ayon sa ID |
| GET | `/ids?ids=` | JWT | — | Kunin ang maraming plan type ayon sa mga ID na pinaghihiwalay ng kuwit |
| GET | `/ministryId/:ministryId` | JWT | — | Kunin ang mga plan type para sa isang ministry |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga plan type |
| DELETE | `/:id` | JWT | — | Burahin ang plan type |

## Plan Items

Base path: `/doing/planItems`

Pinamamahalaan ang mga item ng service order (header, seksyon, awit, atbp.) na nakaayos sa parent-child na tree structure.

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang plan item ayon sa ID |
| GET | `/ids?ids=` | JWT | — | Kunin ang maraming plan item ayon sa mga ID na pinaghihiwalay ng kuwit |
| GET | `/plan/:planId` | JWT | — | Kunin ang lahat ng plan item ng isang plan (nagbabalik ng tree structure) |
| GET | `/presenter/:churchId/:planId` | Public | — | Kunin ang mga plan item para sa presenter view (nagbabalik ng tree structure) |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga plan item |
| POST | `/sort` | JWT | — | I-update ang sort order ng isang plan item (nire-sort muli ang mga kapatid) |
| DELETE | `/:id` | JWT | — | Burahin ang isang plan item |

## Plan Feed

Base path: `/doing/planFeed`

Nagbibigay ng mga feed ng plan item para sa presenter. Kung walang umiiral na plan item, awtomatikong pupunuan mula sa venue feed ng Lessons.church gamit ang `contentId` ng plan.

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Public | — | Kunin ang plan feed para sa presenter (awtomatikong pupunuan mula sa venue feed kung walang laman) |

## Positions

Base path: `/doing/positions`

Nagmamana mula sa CRUD base class (GET `/:id`, POST `/`, DELETE `/:id` — walang pagsusuri ng permiso).

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang posisyon ayon sa ID |
| GET | `/ids?ids=` | JWT | — | Kunin ang maraming posisyon ayon sa mga ID na pinaghihiwalay ng kuwit |
| GET | `/plan/ids?planIds=` | JWT | — | Kunin ang mga posisyon para sa maraming plan ayon sa mga plan ID na pinaghihiwalay ng kuwit |
| GET | `/plan/:planId` | JWT | — | Kunin ang lahat ng posisyon ng isang plan |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga posisyon |
| DELETE | `/:id` | JWT | — | Burahin ang isang posisyon |

## Times

Base path: `/doing/times`

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | Ilista ang lahat ng oras ng simbahan |
| GET | `/:id` | JWT | — | Kunin ang oras ayon sa ID |
| GET | `/plans?planIds=` | JWT | — | Kunin ang mga oras para sa maraming plan ayon sa mga plan ID na pinaghihiwalay ng kuwit |
| GET | `/plan/:planId` | JWT | — | Kunin ang lahat ng oras ng isang plan |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga oras |
| DELETE | `/:id` | JWT | — | Burahin ang isang oras |

## Assignments

Base path: `/doing/assignments`

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Kunin ang mga takda ng kasalukuyang user |
| GET | `/my/upcoming` | JWT | — | Hanggang 20 takda ng kasalukuyang user sa mga plan na may petsa mula kahapon pataas (nilalaktawan ang penciled-in o `prepared` na plan), pinakamalapit muna: `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Sumusuporta sa serving preview sa home page ng miyembro |
| GET | `/:id` | JWT | — | Kunin ang takda ayon sa ID |
| GET | `/plan/ids?planIds=` | JWT | — | Kunin ang mga takda para sa maraming plan ayon sa mga plan ID na pinaghihiwalay ng kuwit |
| GET | `/plan/:planId` | JWT | — | Kunin ang lahat ng takda ng isang plan |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga takda (ang default na status ay "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | Tanggapin ang isang takda (dapat ang itinakdang tao) |
| POST | `/decline/:id` | JWT | — | Tanggihan ang isang takda (dapat ang itinakdang tao) |
| POST | `/signup` | JWT | — | Self-signup para sa isang posisyon. Body: `{ positionId }`. Dapat pinapayagan ng posisyon ang self-signup at may puwesto pa; gumagawa ng Accepted na takda. Tinatanggihan ng "Signup deadline has passed" kapag lumipas na ang signup deadline ng plan (binibilang pabalik mula sa unang service time nito, gaya ng nasa itaas) |
| DELETE | `/signup/:id` | JWT | — | Alisin ang sarili mong self-signup. Tinatanggihan ng "Removal deadline has passed" pagkatapos ng signup deadline ng plan |
| DELETE | `/:id` | JWT | — | Burahin ang isang takda |

### Halimbawa: Tanggapin ang Isang Takda

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

## Blockout Dates

Base path: `/doing/blockoutDates`

Nagmamana mula sa CRUD base class (GET `/:id`, DELETE `/:id` — walang pagsusuri ng permiso).

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang blockout date ayon sa ID |
| GET | `/ids?ids=` | JWT | — | Kunin ang maraming blockout date ayon sa mga ID na pinaghihiwalay ng kuwit |
| GET | `/my` | JWT | — | Kunin ang mga blockout date ng kasalukuyang user |
| GET | `/upcoming` | JWT | — | Kunin ang lahat ng paparating na blockout date ng simbahan |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga blockout date (awtomatikong ginagamit ang kasalukuyang user bilang personId kung hindi ibinigay) |
| DELETE | `/:id` | JWT | — | Burahin ang blockout date |

## Tasks

Base path: `/doing/tasks`

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Kunin ang mga bukas na task ng kasalukuyang user |
| GET | `/:id` | JWT | — | Kunin ang task ayon sa ID |
| GET | `/:id/contact` | JWT | Can view the card | Impormasyon ng contact para sa taong tinutukoy ng workflow card: `{ personId, displayName, mobilePhone, email }`. Nagpapahintulot sa nakatalagang caller na walang People access na maabot ang tao |
| GET | `/closed` | JWT | — | Kunin ang mga sarado nang task ng kasalukuyang user |
| GET | `/timeline?taskIds=` | JWT | — | Kunin ang timeline data para sa mga task ayon sa mga task ID na pinaghihiwalay ng kuwit |
| GET | `/directoryUpdate/:personId` | JWT | — | Kunin ang directory update task para sa isang tao |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga task. Idagdag ang `?type=directoryUpdate` para hawakan ang mga directory update task (awtomatikong ina-upload ang mga larawan) |
| POST | `/:id/conversation` | JWT | `tasks.edit` o assignee ng card | Ikabit ang notes conversation sa card. Body: `{ conversationId }`. Ang unang conversation na naikabit ang nananaig; ibinabalik ng mga susunod na tawag ang card nang hindi binabago |
| POST | `/loadForGroups` | JWT | — | Mag-load ng mga task para sa mga partikular na grupo. Body: `{ groupIds: [], status: "Open" }` |

## Automations

Base path: `/doing/automations`

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng automation ng simbahan |
| GET | `/:id` | JWT | — | Kunin ang automation ayon sa ID |
| GET | `/check` | Public | — | Mag-trigger ng pagsusuri sa lahat ng automation |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga automation |
| DELETE | `/:id` | JWT | — | Burahin ang automation |

## Actions

Base path: `/doing/actions`

Tinutukoy ng mga action kung ano ang mangyayari kapag na-trigger ang isang automation.

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang action ayon sa ID |
| GET | `/automation/:id` | JWT | — | Kunin ang lahat ng action ng isang automation |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga action |
| DELETE | `/:id` | JWT | — | Burahin ang action |

## Conditions

Base path: `/doing/conditions`

Tinutukoy ng mga condition ang mga pamantayang nag-t-trigger ng isang automation.

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang condition ayon sa ID |
| GET | `/automation/:id` | JWT | — | Kunin ang lahat ng condition ng isang automation |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga condition |
| DELETE | `/:id` | JWT | — | Burahin ang condition |

## Conjunctions

Base path: `/doing/conjunctions`

Pinagdudugtong ng mga conjunction ang maraming condition sa isang automation (lohika ng AND/OR).

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang conjunction ayon sa ID |
| GET | `/automation/:id` | JWT | — | Kunin ang lahat ng conjunction ng isang automation |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga conjunction |
| DELETE | `/:id` | JWT | — | Burahin ang conjunction |

## Content Provider Auths

Base path: `/doing/contentProviderAuths`

Nagmamana mula sa CRUD base class (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — walang pagsusuri ng permiso).

Pinamamahalaan ang mga OAuth authentication record para sa mga external na content provider (hal., mga integration ng presentation software).

Naka-encrypt sa pamamagitan ng `EncryptionHelper` ang `accessToken` at `refreshToken` habang naka-imbak, at dine-decrypt kapag binabasa, kaya plain token pa rin ang ibinabalik ng API. Ang mga row na na-save bago ang encryption ay naglalaman ng plain text (na hindi kailanman naglalaman ng `|`); ibinabalik ang mga ito gaya ng dati at ine-encrypt sa susunod na pag-save.

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng content provider auth |
| GET | `/:id` | JWT | — | Kunin ang content provider auth ayon sa ID |
| GET | `/ids?ids=` | JWT | — | Kunin ang maraming content provider auth ayon sa mga ID na pinaghihiwalay ng kuwit |
| GET | `/ministry/:ministryId` | JWT | — | Kunin ang lahat ng content provider auth ng isang ministry |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Kunin ang auth record para sa partikular na ministry at provider |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga content provider auth |
| DELETE | `/:id` | JWT | — | Burahin ang content provider auth |

## Provider Proxy

Base path: `/doing/providerProxy`

Nagpa-proxy ng mga request sa mga external na content provider (hal., ProPresenter, EasyWorship). Awtomatikong humahawak ng token refresh kapag nag-expire ang mga token.

| Method | Path | Auth | Permiso | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | Mag-browse ng mga file ng content provider. Body: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Kunin ang mga presentasyon mula sa content provider. Body: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Kunin ang playlist mula sa content provider. Body: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Kunin ang mga tagubilin para sa isang content item. Body: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Kunin ang pinalawak na mga tagubilin para sa isang content item. Body: `{ ministryId, providerId, path }` |

## Mga Kaugnay na Pahina

- [Membership Endpoints](./membership.md) — People, grupo, role, at permiso
- [Attendance Endpoints](./attendance.md) — Pagsubaybay sa serbisyo at pagbisita
- [Module Structure](../module-structure.md) — Mga pattern ng organisasyon ng code
