---
title: "Končne točke za Doing"
description: "Referenca končnih točk API-ja Doing za servisne načrte, dodelitve prostovoljcev, naloge in avtomatizacije v B1 Admin, s potmi, avtentikacijo in dovoljenji."
---

# Končne točke za Doing

<div class="article-intro">

Modul Doing upravlja načrtovanje bogoslužij, razporejanje prostovoljcev, upravljanje nalog in avtomatizacije. Ponuja orodja za ustvarjanje načrtov bogoslužij s časi in položaji, dodeljevanje prostovoljcev, upravljanje datumov nedostopnosti, sestavljanje elementov bogoslužnega reda, povezovanje z zunanjimi ponudniki vsebin ter konfiguriranje avtomatiziranih delovnih tokov s pogoji in dejanji.

</div>

**Osnovna pot:** `/doing`

## Načrti

Osnovna pot: `/doing/plans`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Seznam vseh načrtov za cerkev |
| GET | `/:id` | JWT | — | Pridobi načrt po ID-ju |
| GET | `/ids?ids=` | JWT | — | Pridobi več načrtov po ID-jih, ločenih z vejico |
| GET | `/types/:planTypeId` | JWT | — | Pridobi načrte po vrsti načrta |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + urejanje službe | Predogled pregleda bogoslužja, ki ga **Text Volunteers** pošlje: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` za prostovoljce, dodeljene v obdobju (en zapis na osebo; osebe, ki so se odjavile, in osebe brez številke se preskočijo; skupne številke se podvojijo le enkrat; največ 200) |
| GET | `/presenter` | JWT | — | Pridobi načrte za naslednjih 7 dni (pogled za predstavitev) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Urejanje službe | Aktivni delovni tokovi za potrditev dodelitve bogoslužja (`workflowType = "assignmentConfirmation"`), ki jih lahko načrt izbere: `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Javno | — | Pridobi trenutni načrt za vrsto načrta |
| GET | `/public/signup/:churchId` | Javno | — | Načrti, odprti za samoprijavo, od najbližjega proti najbolj oddaljenemu, vsak s položaji za samoprijavo (razvrščeni po `categoryName`, nato po `name`, plus `filledCount` dodelitev s statusom Accepted/Unconfirmed) in časi. Imena prostovoljcev niso vključena. Če je nastavitev cerkve `volunteerSignupNextOnly` enaka `"true"`, se vrne le prvi načrt za vsako vrsto načrta. Vsak `plan` vključuje izračunan `signupDeadline` (ISO trenutek ali `null`): `signupDeadlineHours` pred najzgodnejšim časom tipa `service` v načrtu (če časa bogoslužja ni, kateri koli časovni vnos; če načrt nima časov, 9:00 v časovnem pasu cerkve na `serviceDate`) |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` za položaje za samoprijavo v načrtu (prikazana imena nosilcev dodelitev s statusom Accepted/Unconfirmed). Vrne `[]`, razen če je `showVolunteerNames` v načrtu vklopljen |
| POST | `/` | JWT | — | Ustvari ali posodobi načrte (sprejme posamezni objekt ali polje). Nastavite `confirmationWorkflowId`, da načrt vključite v delovni tok za potrditev bogoslužja, ali `null`, da se za prihodnje zahteve izključi. Pošljite `signupDeadlineHours: null`, da počistite rok; če polja izpustite, se ohrani shranjena vrednost |
| POST | `/copy/:id` | JWT | Urejanje službe | Kopira načrt, vključno s položaji, časi, dodelitvami in elementi bogoslužnega reda. Telo vsebuje `ministryId`, `serviceDate`, `copyMode` (`"none"`, `"positions"`, `"all"`) in `copyServiceOrder` (logična vrednost). Brez `targetPlanId` se ustvari nov načrt, vrednosti `notes`, `signupDeadlineHours`, `showVolunteerNames` in `autoReplaceOnDecline` pa se prenesejo iz izvornega načrta, razen če jih telo določi drugače. S `targetPlanId` kopija napolni obstoječi načrt (klicatelj ga mora smeti urejati). Možnost **Ponovi tedensko** v B1Admin pokliče to funkcijo enkrat na teden, pri čemer vsakokrat kopira iz načrta, ustvarjenega prejšnji teden |
| POST | `/textRange` | JWT | `texting.send` + urejanje službe | Pošlje SMS vsakemu prostovoljcu, dodeljenemu v določenem obdobju, prek ponudnika SMS-sporočil cerkve. Telo: `{ startDate, endDate, ministryId, planTypeId?, message }` (sporočilo do 1600 znakov; polja za združevanje se razrešijo za vsakega prejemnika). Vrne predogledne številke ter `recipientCount`, `successCount`, `failCount` in `error` (`no_provider` ali `insufficient_credits`), če pošiljanje ustavi prej |
| POST | `/:id/issueRequests` | JWT | Urejanje načrta | Izda nove dodelitve načrta s statusom Unconfirmed, o katerih še niso bili obveščeni, prek njegovega delovnega toka za potrditev: vsako označi kot obveščeno in zažene eno kartico delovnega toka za dodelitev. Prazno telo; vrne `{ issued }`. Ne uspe, če načrt ni objavljen (ni `prepared`), nima aktivnega `confirmationWorkflowId` z vsaj enim korakom ali če je rok za odgovor že potekel |
| POST | `/autofill/:id` | JWT | — | Samodejno napolni dodelitve prostovoljcev za načrt. Telo: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Izbriše načrt ter vse povezane čase, dodelitve, položaje in elemente načrta |

### Primer: kopiranje načrta

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

## Vrste načrtov

Osnovna pot: `/doing/planTypes`

Razširja osnovni razred CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — brez preverjanja dovoljenj).

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Seznam vseh vrst načrtov |
| GET | `/:id` | JWT | — | Pridobi vrsto načrta po ID-ju |
| GET | `/ids?ids=` | JWT | — | Pridobi več vrst načrtov po ID-jih, ločenih z vejico |
| GET | `/ministryId/:ministryId` | JWT | — | Pridobi vrste načrtov za službo |
| POST | `/` | JWT | — | Ustvari ali posodobi vrste načrtov |
| DELETE | `/:id` | JWT | — | Izbriše vrsto načrta |

## Elementi načrta

Osnovna pot: `/doing/planItems`

Upravlja elemente bogoslužnega reda (naslove, razdelke, pesmi itd.), urejene v drevesno strukturo nadrejenih in podrejenih elementov.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Pridobi element načrta po ID-ju |
| GET | `/ids?ids=` | JWT | — | Pridobi več elementov načrta po ID-jih, ločenih z vejico |
| GET | `/plan/:planId` | JWT | — | Pridobi vse elemente načrta (vrne drevesno strukturo) |
| GET | `/presenter/:churchId/:planId` | Javno | — | Pridobi elemente načrta za predstavitveni pogled (vrne drevesno strukturo) |
| POST | `/` | JWT | — | Ustvari ali posodobi elemente načrta |
| POST | `/sort` | JWT | — | Posodobi vrstni red elementa načrta (ponovno razvrsti sorodne elemente) |
| DELETE | `/:id` | JWT | — | Izbriše element načrta |

## Vir načrta

Osnovna pot: `/doing/planFeed`

Zagotavlja vire elementov načrta za predstavitev. Če elementi načrta ne obstajajo, se samodejno napolnijo iz vira prizorišča Lessons.church z uporabo `contentId` načrta.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/presenter/:churchId/:planId` | Javno | — | Pridobi vir načrta za predstavitev (če je prazen, se samodejno napolni iz vira prizorišča) |

## Položaji

Osnovna pot: `/doing/positions`

Razširja osnovni razred CRUD (GET `/:id`, POST `/`, DELETE `/:id` — brez preverjanja dovoljenj).

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Pridobi položaj po ID-ju |
| GET | `/ids?ids=` | JWT | — | Pridobi več položajev po ID-jih, ločenih z vejico |
| GET | `/plan/ids?planIds=` | JWT | — | Pridobi položaje za več načrtov po ID-jih načrtov, ločenih z vejico |
| GET | `/plan/:planId` | JWT | — | Pridobi vse položaje za načrt |
| POST | `/` | JWT | — | Ustvari ali posodobi položaje |
| DELETE | `/:id` | JWT | — | Izbriše položaj |

## Časi

Osnovna pot: `/doing/times`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/all` | JWT | — | Seznam vseh časov za cerkev |
| GET | `/:id` | JWT | — | Pridobi čas po ID-ju |
| GET | `/plans?planIds=` | JWT | — | Pridobi čase za več načrtov po ID-jih načrtov, ločenih z vejico |
| GET | `/plan/:planId` | JWT | — | Pridobi vse čase za načrt |
| POST | `/` | JWT | — | Ustvari ali posodobi čase |
| DELETE | `/:id` | JWT | — | Izbriše čas |

## Dodelitve

Osnovna pot: `/doing/assignments`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/my` | JWT | — | Pridobi dodelitve za trenutnega uporabnika |
| GET | `/my/upcoming` | JWT | — | Do 20 dodelitev trenutnega uporabnika v načrtih, datiranih od včeraj naprej (načrti, ki so v pripravi ali `prepared`, so preskočeni), od najbližje proti najbolj oddaljeni: `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Podpira predogled bogoslužja na domači strani člana |
| GET | `/:id` | JWT | — | Pridobi dodelitev po ID-ju |
| GET | `/plan/ids?planIds=` | JWT | — | Pridobi dodelitve za več načrtov po ID-jih načrtov, ločenih z vejico |
| GET | `/plan/:planId` | JWT | — | Pridobi vse dodelitve za načrt |
| POST | `/` | JWT | — | Ustvari ali posodobi dodelitve (privzeti status je "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | Sprejmi dodelitev (mora biti dodeljena oseba) |
| POST | `/decline/:id` | JWT | — | Zavrni dodelitev (mora biti dodeljena oseba) |
| POST | `/signup` | JWT | — | Samoprijava na položaj. Telo: `{ positionId }`. Položaj mora dovoljevati samoprijavo in imeti prostor; ustvari dodelitev s statusom Accepted. Zavrnjeno z "Signup deadline has passed", ko poteče rok za samoprijavo v načrtu (štet nazaj od prvega časa bogoslužja, kot zgoraj) |
| DELETE | `/signup/:id` | JWT | — | Odstrani lastno samoprijavo. Zavrnjeno z "Removal deadline has passed" po roku za samoprijavo v načrtu |
| DELETE | `/:id` | JWT | — | Izbriše dodelitev |

### Primer: sprejem dodelitve

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

## Datumi nedostopnosti

Osnovna pot: `/doing/blockoutDates`

Razširja osnovni razred CRUD (GET `/:id`, DELETE `/:id` — brez preverjanja dovoljenj).

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Pridobi datum nedostopnosti po ID-ju |
| GET | `/ids?ids=` | JWT | — | Pridobi več datumov nedostopnosti po ID-jih, ločenih z vejico |
| GET | `/my` | JWT | — | Pridobi datume nedostopnosti za trenutnega uporabnika |
| GET | `/upcoming` | JWT | — | Pridobi vse prihajajoče datume nedostopnosti za cerkev |
| POST | `/` | JWT | — | Ustvari ali posodobi datume nedostopnosti (če `personId` ni podan, se privzeto nastavi na trenutnega uporabnika) |
| DELETE | `/:id` | JWT | — | Izbriše datum nedostopnosti |

## Naloge

Osnovna pot: `/doing/tasks`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Pridobi odprte naloge za trenutnega uporabnika |
| GET | `/:id` | JWT | — | Pridobi nalogo po ID-ju |
| GET | `/:id/contact` | JWT | Lahko si ogleda kartico | Kontaktni podatki osebe, na katero se nanaša kartica delovnega toka: `{ personId, displayName, mobilePhone, email }`. Dodeljenemu klicatelju brez dostopa do modula People omogoča stik z osebo |
| GET | `/closed` | JWT | — | Pridobi zaprte naloge za trenutnega uporabnika |
| GET | `/timeline?taskIds=` | JWT | — | Pridobi podatke časovnice za naloge po ID-jih nalog, ločenih z vejico |
| GET | `/directoryUpdate/:personId` | JWT | — | Pridobi nalogo posodobitve imenika za osebo |
| POST | `/` | JWT | — | Ustvari ali posodobi naloge. Dodajte `?type=directoryUpdate`, da obdelate naloge posodobitve imenika (samodejno naloži fotografije) |
| POST | `/:id/conversation` | JWT | `tasks.edit` ali dodeljeni nosilec kartice | Priloži pogovor z opombami h kartici. Telo: `{ conversationId }`. Prvi priloženi pogovor velja; poznejši klici vrnejo kartico nespremenjeno |
| POST | `/loadForGroups` | JWT | — | Naloži naloge za določene skupine. Telo: `{ groupIds: [], status: "Open" }` |

## Avtomatizacije

Osnovna pot: `/doing/automations`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Seznam vseh avtomatizacij za cerkev |
| GET | `/:id` | JWT | — | Pridobi avtomatizacijo po ID-ju |
| GET | `/check` | Javno | — | Sproži preverjanje vseh avtomatizacij |
| POST | `/` | JWT | — | Ustvari ali posodobi avtomatizacije |
| DELETE | `/:id` | JWT | — | Izbriše avtomatizacijo |

## Dejanja

Osnovna pot: `/doing/actions`

Dejanja določajo, kaj se zgodi, ko se avtomatizacija sproži.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Pridobi dejanje po ID-ju |
| GET | `/automation/:id` | JWT | — | Pridobi vsa dejanja za avtomatizacijo |
| POST | `/` | JWT | — | Ustvari ali posodobi dejanja |
| DELETE | `/:id` | JWT | — | Izbriše dejanje |

## Pogoji

Osnovna pot: `/doing/conditions`

Pogoji določajo merila, ki sprožijo avtomatizacijo.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Pridobi pogoj po ID-ju |
| GET | `/automation/:id` | JWT | — | Pridobi vse pogoje za avtomatizacijo |
| POST | `/` | JWT | — | Ustvari ali posodobi pogoje |
| DELETE | `/:id` | JWT | — | Izbriše pogoj |

## Vezniki

Osnovna pot: `/doing/conjunctions`

Vezniki povežejo več pogojev v avtomatizaciji (logika IN/ALI).

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Pridobi veznik po ID-ju |
| GET | `/automation/:id` | JWT | — | Pridobi vse veznike za avtomatizacijo |
| POST | `/` | JWT | — | Ustvari ali posodobi veznike |
| DELETE | `/:id` | JWT | — | Izbriše veznik |

## Overitve ponudnikov vsebin

Osnovna pot: `/doing/contentProviderAuths`

Razširja osnovni razred CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — brez preverjanja dovoljenj).

Upravlja zapise overitve OAuth za zunanje ponudnike vsebin (npr. integracije s programsko opremo za predstavitve).

`accessToken` in `refreshToken` sta šifrirana v mirovanju z `EncryptionHelper` in se ob branju dešifrirata, tako da API še vedno vrača navadne žetone. Zapisi, shranjeni pred uvedbo šifriranja, hranijo navadno besedilo (to nikoli ne vsebuje `|`); vrnjeni so nespremenjeni in šifrirani bodo ob naslednjem shranjevanju.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Seznam vseh overitev ponudnikov vsebin |
| GET | `/:id` | JWT | — | Pridobi overitev ponudnika vsebin po ID-ju |
| GET | `/ids?ids=` | JWT | — | Pridobi več overitev ponudnikov vsebin po ID-jih, ločenih z vejico |
| GET | `/ministry/:ministryId` | JWT | — | Pridobi vse overitve ponudnikov vsebin za službo |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Pridobi zapis overitve za določeno službo in ponudnika |
| POST | `/` | JWT | — | Ustvari ali posodobi overitve ponudnikov vsebin |
| DELETE | `/:id` | JWT | — | Izbriše overitev ponudnika vsebin |

## Posredniški strežnik ponudnika

Osnovna pot: `/doing/providerProxy`

Posreduje zahteve zunanjim ponudnikom vsebin (npr. ProPresenter, EasyWorship). Samodejno upravlja z osveževanjem žetonov, ko ti potečejo.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| POST | `/browse` | JWT | — | Brskanje po datotekah ponudnika vsebin. Telo: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Pridobi predstavitve od ponudnika vsebin. Telo: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Pridobi predvajalni seznam od ponudnika vsebin. Telo: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Pridobi navodila za vsebinski element. Telo: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Pridobi razširjena navodila za vsebinski element. Telo: `{ ministryId, providerId, path }` |

## Sorodne strani

- [Končne točke članstva](./membership.md) — osebe, skupine, vloge in dovoljenja
- [Končne točke obiskovanja](./attendance.md) — spremljanje bogoslužij in obiskov
- [Struktura modula](../module-structure.md) — vzorci organizacije kode
