---
title: "Doing galiniai taškai"
description: "Doing API galutinių taškų nuoroda: tarnystės planai, savanorių paskyrimai, užduotys ir automatizavimai B1 Admin, su keliais ir teisėmis."
---

# Doing galiniai taškai

<div class="article-intro">

Doing modulis tvarko tarnystės planavimą, savanorių grafikus, užduočių valdymą ir automatizacijas. Jis suteikia įrankius tarnystės planams su laikais ir pozicijomis kurti, savanoriams priskirti, užimtumo datoms valdyti, tarnystės tvarkos elementams kurti, prisijungti prie išorinių turinio teikėjų ir konfigūruoti automatizuotus darbo eigas su sąlygomis ir veiksmais.

</div>

**Bazinis kelias:** `/doing`

## Planai

Bazinis kelias: `/doing/plans`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Išvardyti visus bažnyčios planus |
| GET | `/:id` | JWT | — | Gauti planą pagal ID |
| GET | `/ids?ids=` | JWT | — | Gauti kelis planus pagal kableliais atskirtus ID |
| GET | `/types/:planTypeId` | JWT | — | Gauti planus pagal plano tipą |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + ministerijos redagavimas | Peržiūrėti tarnystės apžvalgą, kurią **Text Volunteers** išsiųs: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` intervale priskirtiems savanoriams (vienas kiekvienam asmeniui, praleidžiami atsisakiusieji ir tie, kurie neturi numerio, pasikartojantys numeriai sujungiami, riba – 200) |
| GET | `/presenter` | JWT | — | Gauti planus artimiausioms 7 dienoms (pristatytojo rodinys) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Ministerijos redagavimas | Aktyvios tarnystės paskyrimo patvirtinimo darbo eigos (`workflowType = "assignmentConfirmation"`), kurias plsmi gali pasirinkti: `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Viešas | — | Gauti dabartinį planą pagal plano tipą |
| GET | `/public/signup/:churchId` | Viešas | — | Planai, kuriems galima užsiregistruoti savarankiškai, artimiausi pirmi, kiekvienas su savarankiškos registracijos pozicijomis (rūšiuojamos pagal `categoryName`, tada pagal `name`, ir su `filledCount` Accepted/Unconfirmed paskyrimams) bei laikais. Savanorių vardų nėra. Kai bažnyčios nustatymas `volunteerSignupNextOnly` yra `"true"`, grąžinamas tik pirmas kiekvieno plano tipo planas. Kiekvienas `plan` apima apskaičiuotą `signupDeadline` (ISO momentas arba `null`): `signupDeadlineHours` valandų iki ankstyviausio plano `service` tipo laiko (jei tarnystės laiko nėra – bet kurio laiko įrašo; jei planas neturi laikų – 9:00 bažnyčios laiko zonoje `serviceDate` dieną) |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` plano savarankiškos registracijos pozicijoms (Accepted/Unconfirmed paskyrimų gavėjų rodomi vardai). Grąžina `[]`, nebent plano `showVolunteerNames` įjungta |
| POST | `/` | JWT | — | Sukurti arba atnaujinti planus (priima vieną objektą arba masyvą). Nustatykite `confirmationWorkflowId`, kad planas prisijungtų prie tarnystės patvirtinimo darbo eigos, arba `null`, kad būsimoms užklausoms atsisakytumėte. Siųskite `signupDeadlineHours: null`, kad išvalytumėte terminą; jei lauko nepateiksite, išsaugota reikšmė liks |
| POST | `/copy/:id` | JWT | Ministerijos redagavimas | Nukopijuoti planą kartu su pozicijomis, laikais, paskyrimais ir tarnystės tvarkos elementais. Užklausos turinyje yra `ministryId`, `serviceDate`, `copyMode` (`"none"`, `"positions"`, `"all"`) ir `copyServiceOrder` (loginė reikšmė). Be `targetPlanId` sukuriamas naujas planas, o `notes`, `signupDeadlineHours`, `showVolunteerNames` ir `autoReplaceOnDecline` perkeliami iš šaltinio plano, nebent užklausoje pateikiamos kitos reikšmės. Su `targetPlanId` kopija užpildo nurodytą esamą planą (iškviečiantysis turi galėti jį redaguoti). B1Admin **Kartoti kas savaitę** parinktis kviečia šį metodą kartą per savaitę, kiekvieną kartą kopijuodama iš prieš savaitę sukurto plano |
| POST | `/textRange` | JWT | `texting.send` + ministerijos redagavimas | Išsiųsti žinutę kiekvienam intervale priskirtam savanoriui per bažnyčios teksto žinučių teikėją. Užklausos turinys: `{ startDate, endDate, ministryId, planTypeId?, message }` (žinutė iki 1600 simbolių; jungiamieji laukai išskleidžiami kiekvienam gavėjui). Grąžina peržiūros skaičius, `recipientCount`, `successCount`, `failCount` ir `error` (`no_provider` arba `insufficient_credits`), jei siuntimas nutrūksta anksčiau |
| POST | `/:id/issueRequests` | JWT | Plano redagavimas | Išsiųsti naujus, dar nepraneštus, nepatvirtintus plano paskyrimus per jo patvirtinimo darbo eigą: kiekvienas paskyrimas pažymimas kaip praneštas ir sukuriama viena darbo eigos kortelė. Tuščias turinys; grąžina `{ issued }`. Nepavyksta, jei planas nepaskelbtas (yra `prepared`), neturi aktyvaus `confirmationWorkflowId` su bent vienu žingsniu arba jo atsakymo terminas jau praėjo |
| POST | `/autofill/:id` | JWT | — | Automatiškai užpildyti savanorių paskyrimus plane. Užklausos turinys: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Ištrinti planą ir visus susijusius laikus, paskyrimus, pozicijas ir plano elementus |

### Pavyzdys: plano kopijavimas

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

## Plano tipai

Bazinis kelias: `/doing/planTypes`

Paveldi bazinę CRUD klasę (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` – be leidimų tikrinimo).

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Išvardyti visus plano tipus |
| GET | `/:id` | JWT | — | Gauti plano tipą pagal ID |
| GET | `/ids?ids=` | JWT | — | Gauti kelis plano tipus pagal kableliais atskirtus ID |
| GET | `/ministryId/:ministryId` | JWT | — | Gauti ministerijos plano tipus |
| POST | `/` | JWT | — | Sukurti arba atnaujinti plano tipus |
| DELETE | `/:id` | JWT | — | Ištrinti plano tipą |

## Plano elementai

Bazinis kelias: `/doing/planItems`

Valdo tarnystės tvarkos elementus (antraštes, skyrius, giesmes ir kt.), sudėtus į tėvinių ir vaikinių elementų medžio struktūrą.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Gauti plano elementą pagal ID |
| GET | `/ids?ids=` | JWT | — | Gauti kelis plano elementus pagal kableliais atskirtus ID |
| GET | `/plan/:planId` | JWT | — | Gauti visus plano elementus (grąžina medžio struktūrą) |
| GET | `/presenter/:churchId/:planId` | Viešas | — | Gauti plano elementus pristatytojo rodiniui (grąžina medžio struktūrą) |
| POST | `/` | JWT | — | Sukurti arba atnaujinti plano elementus |
| POST | `/sort` | JWT | — | Atnaujinti plano elemento rūšiavimo tvarką (perrūšiuoja tos pačios grupės elementus) |
| DELETE | `/:id` | JWT | — | Ištrinti plano elementą |

## Plano srautas

Bazinis kelias: `/doing/planFeed`

Teikia plano elementų srautus pristatytojui. Jei plano elementų nėra, automatiškai užpildo iš Lessons.church vietos srauto, naudodamas plano `contentId`.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/presenter/:churchId/:planId` | Viešas | — | Gauti plano srautą pristatytojui (jei tuščias, automatiškai užpildo iš vietos srauto) |

## Pozicijos

Bazinis kelias: `/doing/positions`

Paveldi bazinę CRUD klasę (GET `/:id`, POST `/`, DELETE `/:id` – be leidimų tikrinimo).

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Gauti poziciją pagal ID |
| GET | `/ids?ids=` | JWT | — | Gauti kelias pozicijas pagal kableliais atskirtus ID |
| GET | `/plan/ids?planIds=` | JWT | — | Gauti kelių planų pozicijas pagal kableliais atskirtus plano ID |
| GET | `/plan/:planId` | JWT | — | Gauti visas plano pozicijas |
| POST | `/` | JWT | — | Sukurti arba atnaujinti pozicijas |
| DELETE | `/:id` | JWT | — | Ištrinti poziciją |

## Laikai

Bazinis kelias: `/doing/times`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/all` | JWT | — | Išvardyti visus bažnyčios laikus |
| GET | `/:id` | JWT | — | Gauti laiką pagal ID |
| GET | `/plans?planIds=` | JWT | — | Gauti kelių planų laikus pagal kableliais atskirtus plano ID |
| GET | `/plan/:planId` | JWT | — | Gauti visus plano laikus |
| POST | `/` | JWT | — | Sukurti arba atnaujinti laikus |
| DELETE | `/:id` | JWT | — | Ištrinti laiką |

## Paskyrimai

Bazinis kelias: `/doing/assignments`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/my` | JWT | — | Gauti dabartinio naudotojo paskyrimus |
| GET | `/my/upcoming` | JWT | — | Iki 20 dabartinio naudotojo paskyrimų planuose, datuotuose nuo vakar ir vėliau (preliminarūs arba `prepared` planai praleidžiami), artimiausi pirmi: `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Naudojama tarnystės peržiūrai narių pradžios puslapyje |
| GET | `/:id` | JWT | — | Gauti paskyrimą pagal ID |
| GET | `/plan/ids?planIds=` | JWT | — | Gauti kelių planų paskyrimus pagal kableliais atskirtus plano ID |
| GET | `/plan/:planId` | JWT | — | Gauti visus plano paskyrimus |
| POST | `/` | JWT | — | Sukurti arba atnaujinti paskyrimus (būsena pagal nutylėjimą – "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | Priimti paskyrimą (turi būti priskirtasis asmuo) |
| POST | `/decline/:id` | JWT | — | Atsisakyti paskyrimo (turi būti priskirtasis asmuo) |
| POST | `/signup` | JWT | — | Užsiregistruoti į poziciją savarankiškai. Užklausos turinys: `{ positionId }`. Pozicija turi leisti savarankišką registraciją ir turėti laisvų vietų; sukuriamas Accepted paskyrimas. Atmetama su "Signup deadline has passed", kai praėjo plano registracijos terminas (skaičiuojamas atgal nuo pirmo tarnystės laiko, kaip aprašyta aukščiau) |
| DELETE | `/signup/:id` | JWT | — | Pašalinti savo savarankišką registraciją. Po plano registracijos termino atmetama su "Removal deadline has passed" |
| DELETE | `/:id` | JWT | — | Ištrinti paskyrimą |

### Pavyzdys: paskyrimo priėmimas

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

## Užimtumo datos

Bazinis kelias: `/doing/blockoutDates`

Paveldi bazinę CRUD klasę (GET `/:id`, DELETE `/:id` – be leidimų tikrinimo).

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Gauti užimtumo datą pagal ID |
| GET | `/ids?ids=` | JWT | — | Gauti kelias užimtumo datas pagal kableliais atskirtus ID |
| GET | `/my` | JWT | — | Gauti dabartinio naudotojo užimtumo datas |
| GET | `/upcoming` | JWT | — | Gauti visas bažnyčios būsimas užimtumo datas |
| POST | `/` | JWT | — | Sukurti arba atnaujinti užimtumo datas (jei `personId` nepateiktas, nustatomas dabartinis naudotojas) |
| DELETE | `/:id` | JWT | — | Ištrinti užimtumo datą |

## Užduotys

Bazinis kelias: `/doing/tasks`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Gauti dabartinio naudotojo atviras užduotis |
| GET | `/:id` | JWT | — | Gauti užduotį pagal ID |
| GET | `/:id/contact` | JWT | Gali peržiūrėti kortelę | Darbo eigos kortelės asmens kontaktinė informacija: `{ personId, displayName, mobilePhone, email }`. Leidžia priskirtam skambinančiajam, neturinčiam prieigos prie Asmenų, susisiekti su asmeniu |
| GET | `/closed` | JWT | — | Gauti dabartinio naudotojo uždarytas užduotis |
| GET | `/timeline?taskIds=` | JWT | — | Gauti užduočių laiko juostos duomenis pagal kableliais atskirtus užduočių ID |
| GET | `/directoryUpdate/:personId` | JWT | — | Gauti asmens katalogo atnaujinimo užduotį |
| POST | `/` | JWT | — | Sukurti arba atnaujinti užduotis. Pridėkite `?type=directoryUpdate`, kad tvarkytumėte katalogo atnaujinimo užduotis (nuotraukos įkeliamos automatiškai) |
| POST | `/:id/conversation` | JWT | `tasks.edit` arba kortelės atsakingasis asmuo | Pridėti pastabų pokalbį prie kortelės. Užklausos turinys: `{ conversationId }`. Pirmasis pridėtas pokalbis lieka; vėlesni kvietimai grąžina kortelę nepakeistą |
| POST | `/loadForGroups` | JWT | — | Įkelti konkrečių grupių užduotis. Užklausos turinys: `{ groupIds: [], status: "Open" }` |

## Automatizacijos

Bazinis kelias: `/doing/automations`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Išvardyti visas bažnyčios automatizacijas |
| GET | `/:id` | JWT | — | Gauti automatizaciją pagal ID |
| GET | `/check` | Viešas | — | Paleisti visų automatizacijų patikrinimą |
| POST | `/` | JWT | — | Sukurti arba atnaujinti automatizacijas |
| DELETE | `/:id` | JWT | — | Ištrinti automatizaciją |

## Veiksmai

Bazinis kelias: `/doing/actions`

Veiksmai apibrėžia, kas nutinka, kai suveikia automatizacija.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Gauti veiksmą pagal ID |
| GET | `/automation/:id` | JWT | — | Gauti visus automatizacijos veiksmus |
| POST | `/` | JWT | — | Sukurti arba atnaujinti veiksmus |
| DELETE | `/:id` | JWT | — | Ištrinti veiksmą |

## Sąlygos

Bazinis kelias: `/doing/conditions`

Sąlygos apibrėžia kriterijus, kurie suaktyvina automatizaciją.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Gauti sąlygą pagal ID |
| GET | `/automation/:id` | JWT | — | Gauti visas automatizacijos sąlygas |
| POST | `/` | JWT | — | Sukurti arba atnaujinti sąlygas |
| DELETE | `/:id` | JWT | — | Ištrinti sąlygą |

## Jungtys

Bazinis kelias: `/doing/conjunctions`

Jungtys sujungia kelias sąlygas automatizacijoje (IR / ARBA logika).

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Gauti jungtį pagal ID |
| GET | `/automation/:id` | JWT | — | Gauti visas automatizacijos jungtis |
| POST | `/` | JWT | — | Sukurti arba atnaujinti jungtis |
| DELETE | `/:id` | JWT | — | Ištrinti jungtį |

## Turinio teikėjų autentifikacijos

Bazinis kelias: `/doing/contentProviderAuths`

Paveldi bazinę CRUD klasę (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` – be leidimų tikrinimo).

Valdo OAuth autentifikacijos įrašus išorinių turinio teikėjams (pvz., pristatymo programinės įrangos integracijoms).

`accessToken` ir `refreshToken` saugomi užšifruoti su `EncryptionHelper` ir iššifruojami nuskaitant, todėl API vis dar grąžina paprastus žetonus. Įrašai, išsaugoti prieš šifravimą, laikosi paprasto teksto (jame niekada nėra `|`); jie grąžinami kaip yra ir užšifruojami kitą kartą išsaugant.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Išvardyti visas turinio teikėjų autentifikacijas |
| GET | `/:id` | JWT | — | Gauti turinio teikėjo autentifikaciją pagal ID |
| GET | `/ids?ids=` | JWT | — | Gauti kelias turinio teikėjų autentifikacijas pagal kableliais atskirtus ID |
| GET | `/ministry/:ministryId` | JWT | — | Gauti visas ministerijos turinio teikėjų autentifikacijas |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Gauti autentifikacijos įrašą konkrečiai ministerijai ir teikėjui |
| POST | `/` | JWT | — | Sukurti arba atnaujinti turinio teikėjų autentifikacijas |
| DELETE | `/:id` | JWT | — | Ištrinti turinio teikėjo autentifikaciją |

## Teikėjo tarpinis serveris

Bazinis kelias: `/doing/providerProxy`

Persiunčia užklausas išoriniams turinio teikėjams (pvz., ProPresenter, EasyWorship). Automatiškai tvarko žetonų atnaujinimą, kai žetonų galiojimas baigiasi.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|-------------|
| POST | `/browse` | JWT | — | Naršyti turinio teikėjo failus. Užklausos turinys: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Gauti pristatymus iš turinio teikėjo. Užklausos turinys: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Gauti grojaraštį iš turinio teikėjo. Užklausos turinys: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Gauti turinio elemento instrukcijas. Užklausos turinys: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Gauti išplėstas turinio elemento instrukcijas. Užklausos turinys: `{ ministryId, providerId, path }` |

## Susiję puslapiai

- [Narių galiniai taškai](./membership.md) – Asmenys, grupės, vaidmenys ir leidimai
- [Lankomumo galiniai taškai](./attendance.md) – Tarnystės ir apsilankymų sekimas
- [Modulio struktūra](../module-structure.md) – Kodo organizavimo modeliai
