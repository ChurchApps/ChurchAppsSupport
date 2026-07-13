---
title: "Ema-Endpoint E-Doing"
---

# Ema-Endpoint E-Doing

<div class="article-intro">

I-module ye-Doing iphatsa kuhlelwa kwe-service, kuhlelwa kwesikhatsi sematiligvane, kuphatsa imisebenti, kanye nekuzenzakalela. Iniketa emathulusi ekwakha ema-plan e-service anemasikhatsi netikhundla, kwabela matiligvane, kuphatsa emalanga lavinjelwe, kwakha titfo te-service order, kuxhumana kubaniketi bekucuketfwe bangaphandle, kanye nekuhlela ema-workflow lazenzakalelako anetimo netento.

</div>

**Umkhondvo Losisekelo:** `/doing`

## Ema-Plan

Umkhondvo losisekelo: `/doing/plans`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Bala onkhe ema-plan elibandla |
| GET | `/:id` | JWT | — | Tfola plan nge-ID |
| GET | `/ids?ids=` | JWT | — | Tfola ema-plan lamanyenti nge-ID letihlukaniswe ngekhoma |
| GET | `/types/:planTypeId` | JWT | — | Tfola ema-plan nge-luhlobo lwe-plan |
| GET | `/presenter` | JWT | — | Tfola ema-plan emalanga lasi-7 lalandzelako (kubukwa ngu-presenter) |
| GET | `/public/current/:planTypeId` | Ngeyeveleni | — | Tfola plan yanyalo yeluhlobo lwe-plan |
| POST | `/` | JWT | — | Akha nobe buyeketa ema-plan (yemukela sitfo lesisodwa nobe luhla) |
| POST | `/copy/:id` | JWT | — | Kopisha plan kufaka tikhundla, emasikhatsi, kwabelwa, kanye netitfo te-service order. Umtimba ufaka i-`copyMode` ("none", "positions", "all") kanye ne-`copyServiceOrder` (boolean) |
| POST | `/autofill/:id` | JWT | — | Zenzakalelisa kwabelwa kwematiligvane ku-plan. Umtimba: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Sula plan kanye netonkhe emasikhatsi lahlobene, kwabelwa, tikhundla, kanye netitfo te-plan |

### Sibonelo: Kopisha Plan

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

## Tinhlobo Te-Plan

Umkhondvo losisekelo: `/doing/planTypes`

Yandzisa i-CRUD base class (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — akukho kuhlolwa kwemvumo).

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Bala tonkhe tinhlobo te-plan |
| GET | `/:id` | JWT | — | Tfola luhlobo lwe-plan nge-ID |
| GET | `/ids?ids=` | JWT | — | Tfola tinhlobo te-plan letinyenti nge-ID letihlukaniswe ngekhoma |
| GET | `/ministryId/:ministryId` | JWT | — | Tfola tinhlobo te-plan te-ministry |
| POST | `/` | JWT | — | Akha nobe buyeketa tinhlobo te-plan |
| DELETE | `/:id` | JWT | — | Sula luhlobo lwe-plan |

## Titfo Te-Plan

Umkhondvo losisekelo: `/doing/planItems`

Iphatsa titfo te-service order (tinhloko, tigaba, tingoma, njll.) tihlelwe ku-sifanekiso se-tree se-mzali-mntfwana.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Tfola sitfo se-plan nge-ID |
| GET | `/ids?ids=` | JWT | — | Tfola titfo te-plan letinyenti nge-ID letihlukaniswe ngekhoma |
| GET | `/plan/:planId` | JWT | — | Tfola tonkhe titfo te-plan te-plan (ibuyisela sifanekiso se-tree) |
| GET | `/presenter/:churchId/:planId` | Ngeyeveleni | — | Tfola titfo te-plan kwekubukwa ngu-presenter (ibuyisela sifanekiso se-tree) |
| POST | `/` | JWT | — | Akha nobe buyeketa titfo te-plan |
| POST | `/sort` | JWT | — | Buyeketa luhla lwekuhlela sitfo se-plan (ihlela kabusha emazalwane) |
| DELETE | `/:id` | JWT | — | Sula sitfo se-plan |

## Plan Feed

Umkhondvo losisekelo: `/doing/planFeed`

Iniketa ema-feed etitfo te-plan ku-presenter. Nangabe kute titfo te-plan letikhona, izenzakalelisa kusuka ku-feed ye-venue ye-Lessons.church kusetjentiswa i-`contentId` ye-plan.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Ngeyeveleni | — | Tfola i-plan feed ye-presenter (izenzakalelisa kusuka ku-venue feed nangabe kute lutfo) |

## Tikhundla

Umkhondvo losisekelo: `/doing/positions`

Yandzisa i-CRUD base class (GET `/:id`, POST `/`, DELETE `/:id` — akukho kuhlolwa kwemvumo).

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Tfola sikhundla nge-ID |
| GET | `/ids?ids=` | JWT | — | Tfola tikhundla letinyenti nge-ID letihlukaniswe ngekhoma |
| GET | `/plan/ids?planIds=` | JWT | — | Tfola tikhundla tema-plan lamanyenti nge-plan ID letihlukaniswe ngekhoma |
| GET | `/plan/:planId` | JWT | — | Tfola tonkhe tikhundla te-plan |
| POST | `/` | JWT | — | Akha nobe buyeketa tikhundla |
| DELETE | `/:id` | JWT | — | Sula sikhundla |

## Emasikhatsi

Umkhondvo losisekelo: `/doing/times`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | Bala onkhe emasikhatsi elibandla |
| GET | `/:id` | JWT | — | Tfola sikhatsi nge-ID |
| GET | `/plans?planIds=` | JWT | — | Tfola emasikhatsi ema-plan lamanyenti nge-plan ID letihlukaniswe ngekhoma |
| GET | `/plan/:planId` | JWT | — | Tfola onkhe emasikhatsi e-plan |
| POST | `/` | JWT | — | Akha nobe buyeketa emasikhatsi |
| DELETE | `/:id` | JWT | — | Sula sikhatsi |

## Kwabelwa

Umkhondvo losisekelo: `/doing/assignments`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Tfola kwabelwa kwemsebentisi wanyalo |
| GET | `/:id` | JWT | — | Tfola kwabelwa nge-ID |
| GET | `/plan/ids?planIds=` | JWT | — | Tfola kwabelwa kwema-plan lamanyenti nge-plan ID letihlukaniswe ngekhoma |
| GET | `/plan/:planId` | JWT | — | Tfola tonkhe kwabelwa kwe-plan |
| POST | `/` | JWT | — | Akha nobe buyeketa kwabelwa (kuhlela simo esiye ku-"Unconfirmed" ngekwentiwa) |
| POST | `/accept/:id` | JWT | — | Vuma kwabelwa (kufanele ube ngumuntfu lowabelwe) |
| POST | `/decline/:id` | JWT | — | Yala kwabelwa (kufanele ube ngumuntfu lowabelwe) |
| DELETE | `/:id` | JWT | — | Sula kwabelwa |

### Sibonelo: Vuma Kwabelwa

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

## Emalanga Lavinjelwe

Umkhondvo losisekelo: `/doing/blockoutDates`

Yandzisa i-CRUD base class (GET `/:id`, DELETE `/:id` — akukho kuhlolwa kwemvumo).

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Tfola lilanga lelivinjelwe nge-ID |
| GET | `/ids?ids=` | JWT | — | Tfola emalanga lavinjelwe lamanyenti nge-ID letihlukaniswe ngekhoma |
| GET | `/my` | JWT | — | Tfola emalanga lavinjelwe emsebentisi wanyalo |
| GET | `/upcoming` | JWT | — | Tfola onkhe emalanga lavinjelwe latako elibandla |
| POST | `/` | JWT | — | Akha nobe buyeketa emalanga lavinjelwe (i-personId iba ngeyemsebentisi wanyalo ngekwentiwa nangabe ingakanikwa) |
| DELETE | `/:id` | JWT | — | Sula lilanga lelivinjelwe |

## Imisebenti

Umkhondvo losisekelo: `/doing/tasks`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Tfola imisebenti levulekile yemsebentisi wanyalo |
| GET | `/:id` | JWT | — | Tfola umsebenti nge-ID |
| GET | `/closed` | JWT | — | Tfola imisebenti levaliwe yemsebentisi wanyalo |
| GET | `/timeline?taskIds=` | JWT | — | Tfola idatha ye-timeline yemisebenti nge-task ID letihlukaniswe ngekhoma |
| GET | `/directoryUpdate/:personId` | JWT | — | Tfola umsebenti wekubuyeketa i-directory womuntfu |
| POST | `/` | JWT | — | Akha nobe buyeketa imisebenti. Engeta `?type=directoryUpdate` kuphatsa imisebenti yekubuyeketa i-directory (izenzakalelisa kulayisha titfombe) |
| POST | `/loadForGroups` | JWT | — | Layisha imisebenti yemacembu lakhetsekile. Umtimba: `{ groupIds: [], status: "Open" }` |

## Kuzenzakalela

Umkhondvo losisekelo: `/doing/automations`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Bala tonkhe kuzenzakalela kwelibandla |
| GET | `/:id` | JWT | — | Tfola kuzenzakalela nge-ID |
| GET | `/check` | Ngeyeveleni | — | Vusa kuhlolwa kwako konkhe kuzenzakalela |
| POST | `/` | JWT | — | Akha nobe buyeketa kuzenzakalela |
| DELETE | `/:id` | JWT | — | Sula kuzenzakalela |

## Tento

Umkhondvo losisekelo: `/doing/actions`

Tento tichaza loku lokwentekako nangabe kuzenzakalela kuvusiwe.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Tfola sento nge-ID |
| GET | `/automation/:id` | JWT | — | Tfola tonkhe tento tekuzenzakalela |
| POST | `/` | JWT | — | Akha nobe buyeketa tento |
| DELETE | `/:id` | JWT | — | Sula sento |

## Timo

Umkhondvo losisekelo: `/doing/conditions`

Timo tichaza sisekelo lesivusa kuzenzakalela.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Tfola simo nge-ID |
| GET | `/automation/:id` | JWT | — | Tfola tonkhe timo tekuzenzakalela |
| POST | `/` | JWT | — | Akha nobe buyeketa timo |
| DELETE | `/:id` | JWT | — | Sula simo |

## Kuhlanganiswa

Umkhondvo losisekelo: `/doing/conjunctions`

Kuhlanganiswa kuxhumanisa timo letinyenti ndzawonye kuzenzakalela (i-logic ye-AND/OR).

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Tfola kuhlanganiswa nge-ID |
| GET | `/automation/:id` | JWT | — | Tfola tonkhe kuhlanganiswa kwekuzenzakalela |
| POST | `/` | JWT | — | Akha nobe buyeketa kuhlanganiswa |
| DELETE | `/:id` | JWT | — | Sula kuhlanganiswa |

## Kutivakaliswa Kwabaniketi Bekucuketfwe

Umkhondvo losisekelo: `/doing/contentProviderAuths`

Yandzisa i-CRUD base class (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — akukho kuhlolwa kwemvumo).

Iphatsa imibhalo yekutivakalisa ye-OAuth yabaniketi bekucuketfwe bangaphandle (sibonelo, kuhlanganiswa netulusi tekwetulwa).

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Bala konkhe kutivakaliswa kwabaniketi bekucuketfwe |
| GET | `/:id` | JWT | — | Tfola kutivakaliswa kwemniketi wekucuketfwe nge-ID |
| GET | `/ids?ids=` | JWT | — | Tfola kutivakaliswa lokunyenti kwabaniketi bekucuketfwe nge-ID letihlukaniswe ngekhoma |
| GET | `/ministry/:ministryId` | JWT | — | Tfola konkhe kutivakaliswa kwabaniketi bekucuketfwe be-ministry |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Tfola umbhalo wekutivakalisa we-ministry nemniketi lokhetsekile |
| POST | `/` | JWT | — | Akha nobe buyeketa kutivakaliswa kwabaniketi bekucuketfwe |
| DELETE | `/:id` | JWT | — | Sula kutivakaliswa kwemniketi wekucuketfwe |

## Provider Proxy

Umkhondvo losisekelo: `/doing/providerProxy`

Idlulisela ticelo kubaniketi bekucuketfwe bangaphandle (sibonelo, ProPresenter, EasyWorship). Iphatsa kubuyeketwa kwe-token ngekutentekela nangabe ema-token asaphelile.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | Hlola emafayela emniketi wekucuketfwe. Umtimba: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Tfola kwetulwa kusuka kumniketi wekucuketfwe. Umtimba: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Tfola playlist kusuka kumniketi wekucuketfwe. Umtimba: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Tfola imiyalo yesitfo sekucuketfwe. Umtimba: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Tfola imiyalo lengetiwe yesitfo sekucuketfwe. Umtimba: `{ ministryId, providerId, path }` |

## Emakhasi Lahlobene

- [Membership Endpoints](./membership) — Bantfu, emacembu, ema-role, kanye netimvumo
- [Attendance Endpoints](./attendance) — Kulandzelela service kanye nekuvakasha
- [Module Structure](../module-structure) — Sifanekiso sekuhlelwa kwekhodi
