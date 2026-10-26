---
title: "Mga Doing Endpoint"
---

# Mga Doing Endpoint

<div class="article-intro">

Pinamamahalaan ng Doing module ang pagpaplano ng serbisyo, pag-iiskedyul ng boluntaryo, pamamahala ng gawain, at mga automation. Nagbibigay ito ng mga kasangkapan sa paggawa ng mga plano ng serbisyo na may mga oras at posisyon, pagtatalaga ng mga boluntaryo, pamamahala ng mga blockout date, pagbuo ng mga item sa order ng serbisyo, pagkonekta sa mga panlabas na content provider, at pag-configure ng mga awtomatikong workflow na may mga kondisyon at aksyon.

</div>

**Base path:** `/doing`

## Mga Plano

Base path: `/doing/plans`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng plano ng simbahan |
| GET | `/:id` | JWT | — | Kunin ang isang plano ayon sa ID |
| GET | `/ids?ids=` | JWT | — | Kunin ang maraming plano ayon sa mga ID na pinaghihiwalay ng kuwit |
| GET | `/types/:planTypeId` | JWT | — | Kunin ang mga plano ayon sa uri ng plano |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + ministry edit | I-preview ang buod ng paglilingkod na **Text Volunteers** ang ipapadala: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` para sa mga boluntaryong nakatalaga sa saklaw (isa bawat tao; nilalaktawan ang mga nag-opt out at ang mga walang numero; dedup ang mga shared na numero; hanggang 200 lamang) |
| GET | `/presenter` | JWT | — | Kunin ang mga plano para sa susunod na 7 araw (presenter view) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Ministry edit | Mga aktibong workflow ng kumpirmasyon ng takdang paglilingkod (`workflowType = "assignmentConfirmation"`) na maaaring piliin ng isang plano: `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Public | — | Kunin ang kasalukuyang plano para sa isang uri ng plano |
| GET | `/public/signup/:churchId` | Public | — | Mga planong bukas para sa sariling pag-signup, pinakamalapit muna, bawat isa ay may mga posisyong self-signup (sinunod ayon sa `categoryName`, pagkatapos `name`, kasama ang `filledCount` ng mga Accepted/Unconfirmed na takda) at mga oras. Walang pangalan ng boluntaryo. Kapag ang setting ng simbahang `volunteerSignupNextOnly` ay `"true"`, isang plano lamang ng bawat uri ng plano ang ibinabalik. Ang bawat `plan` ay may computed na `signupDeadline` (ISO instant, o `null`): `signupDeadlineHours` bago ang pinakamaagang `service`-type na oras ng plano (anumang may-oras na entry kung walang oras ng serbisyo; 9:00 sa time zone ng simbahan sa `serviceDate` kung walang oras ang plano) |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` para sa mga posisyong self-signup ng plano (mga display name ng mga Accepted/Unconfirmed na takda). Nagbabalik ng `[]` maliban kung naka-on ang `showVolunteerNames` ng plano |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga plano (tumatanggap ng iisang object o array). Itakda ang `confirmationWorkflowId` para isali ang plano sa workflow ng kumpirmasyon ng paglilingkod, o `null` para umalis sa mga susunod na request. Ipadala ang `signupDeadlineHours: null` para alisin ang deadline; kung hindi isasama ang field, mananatili ang naka-save na halaga |
| POST | `/copy/:id` | JWT | Ministry edit | Kopyahin ang plano kasama ang mga posisyon, oras, takda, at mga item ng order ng serbisyo. Kasama sa body ang `ministryId`, `serviceDate`, `copyMode` (`"none"`, `"positions"`, `"all"`) at `copyServiceOrder` (boolean). Kung walang `targetPlanId`, gagawa ng bagong plano, at ang `notes`, `signupDeadlineHours`, `showVolunteerNames`, at `autoReplaceOnDecline` ay ililipat mula sa pinagmulang plano maliban kung ibibigay ang mga ito sa body. Kapag may `targetPlanId`, ang kopya ang pupuno sa umiiral na planong iyon (dapat may pahintulot ang tumatawag na i-edit ito). Tinatawag ng opsyong **Repeat weekly** ng B1Admin ang endpoint na ito kada linggo, at bawat beses ay kinokopya mula sa planong ginawa noong nakaraang linggo |
| POST | `/textRange` | JWT | `texting.send` + ministry edit | I-text ang bawat boluntarong nakatalaga sa saklaw ng petsa sa pamamagitan ng texting provider ng simbahan. Body: `{ startDate, endDate, ministryId, planTypeId?, message }` (message hanggang 1600 karakter; nire-resolve ang mga merge field para sa bawat tatanggap). Nagbabalik ng mga bilang ng preview kasama ang `recipientCount`, `successCount`, `failCount`, at `error` (`no_provider` o `insufficient_credits`) kapag huminto nang maaga ang pagpapadala |
| POST | `/:id/issueRequests` | JWT | Plan edit | Ipadala ang mga bagong Unconfirmed at hindi pa naaabisuhang takda ng plano sa pamamagitan ng workflow ng kumpirmasyon nito: minamarkahan ang bawat isa bilang naabisuhan at nagsisimula ng isang workflow card bawat takda. Walang laman na body; nagbabalik ng `{ issued }`. Nabibigo maliban kung na-publish ang plano (hindi `prepared`), may aktibong `confirmationWorkflowId` na may kahit isang hakbang, at hindi pa lumilipas ang response deadline nito |
| POST | `/autofill/:id` | JWT | — | Awtomatikong punan ang mga takda ng boluntaryo para sa isang plano. Body: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Burahin ang isang plano at lahat ng kaugnay na oras, takda, posisyon, at item ng plano |

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

Nagmamana mula sa CRUD base class (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — walang pagsusuri ng pahintulot).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng uri ng plano |
| GET | `/:id` | JWT | — | Kunin ang isang uri ng plano ayon sa ID |
| GET | `/ids?ids=` | JWT | — | Kunin ang maraming uri ng plano ayon sa mga ID na pinaghihiwalay ng kuwit |
| GET | `/ministryId/:ministryId` | JWT | — | Kunin ang mga uri ng plano ng isang ministry |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga uri ng plano |
| DELETE | `/:id` | JWT | — | Burahin ang isang uri ng plano |

## Mga Item ng Plano

Base path: `/doing/planItems`

Pinamamahalaan ang mga item ng order ng serbisyo (mga header, seksyon, awit, atbp.) na nakaayos sa isang parent-child na tree structure.

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

Nagbibigay ng mga feed ng item ng plano para sa presenter. Kung walang umiiral na item ng plano, awtomatikong pinupuno ito mula sa venue feed ng Lessons.church gamit ang `contentId` ng plano.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Public | — | Kunin ang feed ng plano para sa presenter (awtomatikong pinupuno mula sa venue feed kung walang laman) |

## Mga Posisyon

Base path: `/doing/positions`

Nagmamana mula sa CRUD base class (GET `/:id`, POST `/`, DELETE `/:id` — walang pagsusuri ng pahintulot).

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

## Mga Takda

Base path: `/doing/assignments`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Kunin ang mga takda ng kasalukuyang user |
| GET | `/my/upcoming` | JWT | — | Hanggang 20 sa mga takda ng kasalukuyang user sa mga planong may petsa mula kahapon pataas (ang mga planong nakalaan pa lamang, o `prepared`, ay nilalaktawan), pinakamalapit muna: `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Sinusuportahan ang preview ng paglilingkod sa home page ng miyembro |
| GET | `/:id` | JWT | — | Kunin ang isang takda ayon sa ID |
| GET | `/plan/ids?planIds=` | JWT | — | Kunin ang mga takda ng maraming plano ayon sa mga plan ID na pinaghihiwalay ng kuwit |
| GET | `/plan/:planId` | JWT | — | Kunin ang lahat ng takda ng isang plano |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga takda (ang default na status ay "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | Tanggapin ang isang takda (dapat ang itinalagang tao) |
| POST | `/decline/:id` | JWT | — | Tanggihan ang isang takda (dapat ang itinalagang tao) |
| POST | `/signup` | JWT | — | Sariling pag-signup para sa isang posisyon. Body: `{ positionId }`. Dapat payagan ng posisyon ang self-signup at may bakante; gumagawa ng Accepted na takda. Tinatanggihan ng "Signup deadline has passed" kapag lumipas na ang signup deadline ng plano (binibilang paatras mula sa unang oras ng serbisyo, gaya ng nasa itaas) |
| DELETE | `/signup/:id` | JWT | — | Alisin ang sarili mong self-signup. Tinatanggihan ng "Removal deadline has passed" pagkatapos ng signup deadline ng plano |
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

## Mga Blockout Date

Base path: `/doing/blockoutDates`

Nagmamana mula sa CRUD base class (GET `/:id`, DELETE `/:id` — walang pagsusuri ng pahintulot).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang blockout date ayon sa ID |
| GET | `/ids?ids=` | JWT | — | Kunin ang maraming blockout date ayon sa mga ID na pinaghihiwalay ng kuwit |
| GET | `/my` | JWT | — | Kunin ang mga blockout date ng kasalukuyang user |
| GET | `/upcoming` | JWT | — | Kunin ang lahat ng paparating na blockout date ng simbahan |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga blockout date (awtomatikong itinatakda ang personId sa kasalukuyang user kung hindi ibinigay) |
| DELETE | `/:id` | JWT | — | Burahin ang isang blockout date |

## Mga Gawain

Base path: `/doing/tasks`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Kunin ang mga bukas na gawain ng kasalukuyang user |
| GET | `/:id` | JWT | — | Kunin ang isang gawain ayon sa ID |
| GET | `/:id/contact` | JWT | Can view the card | Impormasyon ng kontak ng taong tinutukoy ng workflow card: `{ personId, displayName, mobilePhone, email }`. Nagbibigay-daan sa itinalagang tumatawag na walang access sa People na maabot ang tao |
| GET | `/closed` | JWT | — | Kunin ang mga sarado nang gawain ng kasalukuyang user |
| GET | `/timeline?taskIds=` | JWT | — | Kunin ang datos ng timeline para sa mga gawain ayon sa mga task ID na pinaghihiwalay ng kuwit |
| GET | `/directoryUpdate/:personId` | JWT | — | Kunin ang gawain ng pag-update ng directory para sa isang tao |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga gawain. Magdagdag ng `?type=directoryUpdate` para hawakan ang mga gawain ng pag-update ng directory (awtomatikong nag-a-upload ng mga larawan) |
| POST | `/:id/conversation` | JWT | `tasks.edit` o assignee ng card | Ikabit ang notes conversation sa isang card. Body: `{ conversationId }`. Ang unang conversation na nakabit ang mananaig; ang mga kasunod na tawag ay nagbabalik ng card na hindi nagbago |
| POST | `/loadForGroups` | JWT | — | Iload ang mga gawain para sa partikular na mga grupo. Body: `{ groupIds: [], status: "Open" }` |

## Mga Automation

Base path: `/doing/automations`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng automation ng simbahan |
| GET | `/:id` | JWT | — | Kunin ang isang automation ayon sa ID |
| GET | `/check` | Public | — | Simulan ang pagsusuri ng lahat ng automation |
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

Tinutukoy ng mga kondisyon ang pamantayang nagti-trigger sa isang automation.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang kondisyon ayon sa ID |
| GET | `/automation/:id` | JWT | — | Kunin ang lahat ng kondisyon ng isang automation |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga kondisyon |
| DELETE | `/:id` | JWT | — | Burahin ang isang kondisyon |

## Mga Conjunction

Base path: `/doing/conjunctions`

Pinagdurugtong ng mga conjunction ang maraming kondisyon sa isang automation (lohika ng AND/OR).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang conjunction ayon sa ID |
| GET | `/automation/:id` | JWT | — | Kunin ang lahat ng conjunction ng isang automation |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga conjunction |
| DELETE | `/:id` | JWT | — | Burahin ang isang conjunction |

## Content Provider Auth

Base path: `/doing/contentProviderAuths`

Nagmamana mula sa CRUD base class (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — walang pagsusuri ng pahintulot).

Pinamamahalaan ang mga record ng OAuth authentication para sa mga panlabas na content provider (hal. mga integrasyon ng presentation software).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Ilista ang lahat ng content provider auth |
| GET | `/:id` | JWT | — | Kunin ang isang content provider auth ayon sa ID |
| GET | `/ids?ids=` | JWT | — | Kunin ang maraming content provider auth ayon sa mga ID na pinaghihiwalay ng kuwit |
| GET | `/ministry/:ministryId` | JWT | — | Kunin ang lahat ng content provider auth ng isang ministry |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Kunin ang auth record para sa isang partikular na ministry at provider |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga content provider auth |
| DELETE | `/:id` | JWT | — | Burahin ang isang content provider auth |

## Provider Proxy

Base path: `/doing/providerProxy`

Ipinapasa ang mga request sa mga panlabas na content provider (hal. ProPresenter, EasyWorship). Awtomatikong hinahawakan ang pag-refresh ng token kapag nag-expire ang mga token.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | I-browse ang mga file ng content provider. Body: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Kunin ang mga presentation mula sa isang content provider. Body: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Kunin ang playlist mula sa isang content provider. Body: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Kunin ang mga tagubilin para sa isang content item. Body: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Kunin ang pinalawak na mga tagubilin para sa isang content item. Body: `{ ministryId, providerId, path }` |

## Mga Kaugnay na Pahina

- [Membership Endpoints](./membership) — Mga tao, grupo, tungkulin, at pahintulot
- [Attendance Endpoints](./attendance) — Pagsubaybay ng serbisyo at pagbisita
- [Module Structure](../module-structure) — Mga pattern ng organisasyon ng code
