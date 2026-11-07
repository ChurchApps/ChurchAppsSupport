---
title: "Audito žurnalas ir atšaukiami paketai"
description: "Aprašomas API auditų žurnalas, įrašantis kiekvieną vartotojo pakeitimą visuose moduliuose, ir kaip B1 Admin galima atšaukti importo partijas eilutė po eilutės."
---

# Audito žurnalas ir atšaukiami paketai

<div class="article-intro">

Kiekvienas vartotojo inicijuotas duomenų keitimas Api yra įrašomas – kas, ką, kada ir iš kur – visuose moduliuose, nereikalaujant jokio papildomo kiekvieno valdiklio (controller) sujungimo. Virš šio žurnalo veikia paketų sluoksnis: importas ar masinis veiksmas gali būti pažymėtas kaip paketas ir vėliau **atšauktas** eilutė po eilutės, panašiai kaip Planning Center. Abu veikia vienoje `auditLogs` lentelėje narystės duomenų bazėje ir visiškai valdomi iš vieno centrinio taško – `BaseController.actionWrapper`. Šis puslapis aprašo, kas yra audituojama, kur saugomi duomenys, našumo kompromisus, lemiančius šią struktūrą, ir kaip atšaukimas saugiai grąžina paketą atgal be transakcijų tarp duomenų bazių.

</div>

## Apžvalga

```
every mutating request (POST/PUT/PATCH/DELETE)
        │
        ▼
BaseController.actionWrapper ──▶ derive {module, entityType, category, action}
        │                         from req.baseUrl + method  (AUDIT_REGISTRY = overrides/opt-outs only)
        │
        ├─ normal mode ─────────▶ run action ─▶ await AuditLogHelper.log(after-values)  ──┐
        │                                        (deletes also capture a before-image)     │
        │                                                                                  ▼
        └─ X-Batch-Id present ──▶ snapshot before-images (strict) ─▶ run action ─▶ audit rows tagged batchId
                                                                                           │
                                                                                           ▼
                                                             auditLogs  (membership DB, one table, all modules)
                                                                                           │
   POST /membership/batches/:id/undo ──▶ BatchUndoHelper ──▶ walk rows reverse, per entity ┘
                                          conflict guard → restore / delete / re-insert
```

Du struktūriniai faktai lemia visa, kas aprašyta toliau:

1. **Tik valdiklių sluoksnis žino vykdytoją.** Repozitorijos niekada nemato `AuthenticatedUser`; tik valdikliai turi `au`. Visi kiekvieno modulio valdikliai jau eina per `BaseController.actionWrapper`, todėl auditas įtraukiamas būtent čia – jokie repozitorijų parašai nekeičiami.
2. **Vienas žurnalo modelis visiems moduliams.** Audito įrašai apie aukas, lankomumą, turinį ir pan. visi rašomi į narystės duomenų bazės `auditLogs` per `RepoManager.getRepos("membership")`, net ir iš ne narystės valdiklio. Todėl klausimas „ką Jane šiandien pakeitė?“ lieka viena užklausa.

## Kas audituojama

Auditas **įjungtas pagal numatytuosius nustatymus** kiekvienam keitimo metodui kiekviename maršrute. `actionWrapper` auditui reikalingus laukus išveda iš užklausos be jokios konfigūracijos kiekvienam maršrutui:

| Laukas | Kaip gaunamas |
|--------|---------------|
| `module` | `this.moduleName` (modulis, kuriam priklauso) |
| `entityType` | `req.baseUrl` paskutinio segmento vienaskaita (pvz., `/membership/people` → `person`) |
| `category` | pagal numatytuosius nustatymus lygus `entityType` |
| `action` | `${entityType}_saved` `POST /` atveju, `${entityType}_deleted` `DELETE /:id` atveju, kitais atvejais `${entityType}_${method}:${routePath}`, todėl ne CRUD pomaršručiai (pvz., `task_post:/:id/move`) fiksuojami automatiškai |

`BaseController.AUDIT_REGISTRY` skirtas **tik perrašymams ir atsisakymams** – tai nėra leidimų sąrašas. Maršrutas šiame registre įrašomas tam, kad pakeistų savo kategoriją ar `entityType`, nurodytų `{ dbModule, table }` (tuomet maršrutas gali būti naudojamas paketuose ir atšaukiamas), pažymėtų jį kaip `sensitive` (auditi anoniminius keitimus) arba jį išjungtų su `optOut: true`.

**Atsisakymų sąrašas** (rašymo keliai, kurie užpildytų žurnalą): lankomumo `visits` / `visitsessions` / `sessions` / `checkin` (sekmadienio registracijos antplūdis) ir pranešimų `messages` / `connections` / `devices` (pokalbiai ir būsena). Visa kita įrašoma.

**Masinės galinės vietos** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) užregistruotos `BULK_ROUTES` ir įrašo **po vieną auditą kiekvienam paliestam ID**, todėl 10 000 asmenų importas sukuria 10 000 įrašų. Būtent toks detalumas leidžia paketą atšaukti.

**Anoniminiai keitimai** (`actionWrapperAnon` – anoniminės aukos, anoniminė registracija, formų pateikimai) auditojami tik registre pažymėtiems `sensitive` maršrutams; įrašoma su `userId="anonymous"` ir kliento IP adresu. Pirmauja aukojimai; šis kelias turi realią regresijų istoriją.

### Slaptųjų duomenų slėpimas ir dydžio ribos

Prieš saugant bet kokį `details` turinį, `AuditLogHelper.capDetails()` paleidžia `sanitizeValue()`:

- **Slaptieji raktai paslepiami.** Kiekvieno lauko, kurio mažosiomis raidėmis parašytas pavadinimas yra `SENSITIVE_KEYS` sąraše (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, …), reikšmė pakeičiama į `"[redacted]"`.
- **Didelės reikšmės pašalinamos.** Bet koks `data:` URI arba eilutė, ilgesnė nei 4 KB (base64 nuotraukos, dvejetainiai duomenys), pakeičiamas į `"[stripped]"`.
- **Per dideli įrašai apribojami.** Jei serializuotas JSON viršija maždaug 64 KB, visas turinys pakeičiamas į `{ truncated: true }`. Sutrumpinti įrašai vis dar matomi, bet **neatšaukiami** (nėra prieš ir po vaizdo, į kurį būtų galima grįžti).

## Kur saugomi duomenys

Visiems moduliams skirta viena `auditLogs` lentelė **narystės** duomenų bazėje. Stulpeliai: `id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT JSON string), ipAddress, module, batchId, created`. Migracija `tools/migrations/membership/2026-07-04_audit_universal.ts` prideda `module` ir `batchId`, `details` tipą iš `TEXT` pakeičia į `MEDIUMTEXT`, prideda indeksus `ix_auditLogs_batch (batchId)` ir `ix_auditLogs_entity (churchId, module, entityType, entityId, created)` bei sukuria `batches` lentelę. Stulpelis `module` egzistuoja tam, kad `entityType` sutapimai tarp modulių (`note`, `setting` yra keliuose) išliktų filtruojami, o entiteto indeksas palaiko tiek vienos entiteto istoriją, tiek atšaukimo konfliktų patikrą.

Tarpmodulinis rašymas vyksta per `RepoManager.getRepos("membership")` iš vidaus `wrapper`. Tvarka yra tyčinė: **pagrindinis įrašas pirmiausia patvirtinamas modulio duomenų bazėje, auditas įrašomas antra.** Normaliu režimu auditas įrašomas nesėkmingai, klaida nutildoma (`console.error`, ją pastebi Sentry) – auditas yra patariamojo pobūdžio ir niekada neturi nutraukti vartotojo užklausos. **Paketo režimu jis griežtas** (žr. žemiau).

:::info Kodėl ne trigeriai, CDC ar atskiros lentelės kiekvienam moduliui?
- **MySQL trigeriai** nežino, kuris vartotojas keičia duomenis (ryšys neturi `au`), be to, reikėtų palaikyti trigerių rinkinius kiekvienoje schemoje.
- **binlog / CDC** – tai visas infrastruktūros projektas su ta pačia vykdytojo tapatybės problema.
- **`userId` perdavimas per kiekvieną repozitoriją** paliestų šimtus failų, kad perduotų informaciją, kurią valdiklių sluoksnis jau turi.
- **Atskiros auditų lentelės kiekvienam moduliui** reikštų 7 kartus daugiau darbo ir išsklaidytas užklausas bet kokiam tarpmoduliniam klausimui. Viena lentelė centriniame valdiklių taške yra mažiausiai kodo reikalaujantis sprendimas, vis dar fiksuojantis vykdytoją.
:::

## Našumo nuostatos

Kritinis kelias tyčia paliktas pigus; kaina mokama tik ten, kur ji atsiperka.

- **Jokio skaitymo prieš rašymą įprasto atnaujinimo metu.** Įprastas išsaugojimas **neįkelia** senojo įrašo. **Pateiktos naujosios reikšmės** saugomos `details.after`; UI senąją ir naująją reikšmes rekonstruoja *peržiūros metu*, lygindama su ankstesniu to paties subjekto auditų įrašu. Viena užklausa peržiūros metu, nulinė kaina rašymo metu. Laukai, kurie nuo paleidimo nebuvo keičiami, tiesiog nerodo „senos“ reikšmės – tai priimtina.
- **Trynimams saugomas prieš vaizdas.** `DELETE /:id` maršrutui, turinčiam `{ dbModule, table }` registre, įrašas pirmiausia įkeliamas bendriniu būdu ir išsaugomas `details.before`. Trynimai reti, o prieš vaizdas yra visa jų teisminė vertė.
- **Paketo režimas yra vienintelis sistemingas skaitymas prieš rašymą**, ir jis įjungiamas pasirinktinai – masinė operacija ar importas ir taip yra brangi, todėl N momentinių nuotraukų skaitymų yra atšaukimo kaina.
- **Auditų įrašymai laukiami.** `actionWrapper` surenka įrašymo pažadus ir prieš grąžindamas atsakymą iškviečia `await Promise.allSettled(...)`. Tai svarbiausia invariantas: Lambda aplinkoje konteineris sustingsta tą akimirką, kai atsakymas grąžinamas, todėl nelaukiamas įrašas būtų tyliai prarastas. „Paleisk ir pamiršk“ čia reiškia *klaidos neturi nutraukti užklausos*, o ne *nelaukti* – vienas įrašas jau sušildytame narystės telkinyje trunka apie 1–3 ms.

## Paketai ir atšaukimas

**Paketas** sugrupuoja keitimų rinkinį, kad jį būtų galima peržiūrėti ir atšaukti kartu. Paketą galima atidaryti dviem būdais:

- **Aiškiai:** `POST /membership/batches { label, source }` grąžina `batchId`. Klientas (B1Transfer, B1Admin importo sąsaja) tada siunčia `X-Batch-Id: <id>` kiekviename vėlesniame išsaugojime ar trynime. `POST /membership/batches/:id/complete` uždaro paketą ir įrašo `itemCount`.
- **Automatiškai:** keturios masinės galinės vietos atidaro, užpildo ir užbaigia savo paketą vienos užklausos viduje, o atsakyme grąžina `batchId`.

`batches` lentelė (narystės duomenų bazė): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### Paketo režimas yra griežtas

Kai `X-Batch-Id` yra, `actionWrapper` sugriežtina kiekvieną apsaugą (`writeBatchAuditRows`):

1. Paketas turi egzistuoti, būti `open` ir priklausyti `au.churchId` – kitaip **403**.
2. Maršrutas turi būti tinkamas paketams (`{ dbModule, table }` registre) – kitaip **400**.
3. Prieš vykdant veiksmą, visi paveikti ID prieš vaizdai įkeliami **vienu** užklausa `WHERE id IN (...) AND churchId = ?`. Jei ši momentinė nuotrauka nepavyksta, užklausa baigiasi **500 klaida ir veiksmas neįvykdomas** – paketo režimas niekada neturi tyliai sukurti neatšaukiamo žurnalo. (Priešingai, normalus režimas daro tik ką gali ir nutildo momentinių nuotraukų klaidas.)
4. Kai veiksmas pavyksta, įrašomas po vieną auditą kiekvienai entiteto eilutei su `batchId`, `details.before` ir `details.after`, taip pat aiškus **sukūrimo žymeklis** eilutėms, kurias paketas sukūrė.

### Atšaukimas

`POST /membership/batches/:id/undo` (leidimas: paketo kūrėjas arba `Permissions.server.admin`). Jei paketas nėra `completed` arba yra senesnis nei **30 dienų atšaukimo langas**, užklausa atmetama. `BatchUndoHelper.undo()` tada:

1. Įkelia paketo auditų įrašus ir **sugrupuoja juos pagal `(module, entityType, entityId)`**. Entitetas, kuris paketo viduje buvo keistas kelis kartus, atšaukiamas **vieną kartą**, grąžinant į tikrąją būseną prieš paketą – ankstyviausią prieš vaizdą arba trynimą, jei paketas jį sukūrė. Todėl atšaukimas neperkartoja kiekvienos eilutės: grąžinti tarpinę momentinę nuotrauką paketo viduryje būtų klaidinga.
2. Kiekvienam entitetui pirmiausia vykdo **konfliktų apsaugą**: `auditLog.hasLaterModification()` patikrina, ar už šio paketo ribų egzistuoja *vėlesnis* auditų įrašas tam pačiam `(module, entityType, entityId)`. Jei taip, entitetas buvo redaguotas po importo – jis **praleidžiamas ir pažymimas ataskaitoje**, bet niekada neperrašomas. Tam pačiam auditų žurnalas naudojamas kaip keitimų detektorius; jokiose lentelėse nereikia `modifiedAt` stulpelių.
3. Atšaukia pagal įrašytą operaciją, nustatydama `{ dbModule, table }` iš registro ir naudodama bendrinius Kysely rašymus:
   - **sukurta** → fiziškai ištrinti eilutę.
   - **atnaujinta** → įrašyti atgal `details.before`.
   - **ištrinta** → iš naujo įterpti `details.before` (atnaujinti arba įterpti, jei eilutė su tuo ID vėl atsirado).
4. Kiekvienas atšaukimas pats yra auditojamas (`action: "<entityType>_undone"`, be `batchId` – atšaukimo atšaukimas nepriklauso šiai apimčiai).

Operacija pasirenkama pagal aiškų **sukūrimo žymeklį**, o ne iš trūkstamo prieš vaizdo – tuščias, bet teisėtas prieš vaizdas ar sutrumpintas įrašas neturi būti supainiotas su sukūrimu.

Rezultato duomenys yra `{ restored, skippedConflicts: [...], failed: [...], status }`; paketas pereina į `undone` (be problemų) arba `partial`. **Tarp duomenų bazių transakcijos nėra** – atšaukimas yra geriausių pastangų kiekvienai eilutei, tas pats apribojimas, kurį Planning Center dokumentuoja sujungtiems profiliams.

:::warning Šalutinį poveikį turiniams entitetams reikia `onUndo` kabliuko
Atšaukiant `groupMember` sukūrimą, taip pat reikia įrašyti `groupMemberHistory` („left“), kitaip narių kaitos analizė tyliai sugestų – tai nuolatinis darbo erdvės invariantas. Tokie entitetai registre `AUDIT_REGISTRY` užregistruoja `onUndo` funkciją, kuri grąžina `true`, kai visiškai apdorojo atšaukimą, ir apeina bendrinį kelią. `groupMembers` yra pagrindinis pavyzdys (aiškiame kelyje raktas yra eilutės ID, o masinėse galinėse vietose – `personId`, ir istorija fiksuojama kiekvieno pridėjimo ir pašalinimo metu).
:::

## Vartotojo paviršiai

Abu administravimo paviršiai dar **kuriami**; numatytas tikslas:

| Paviršius | Repozitorija | Paskirtis |
|-----------|--------------|-----------|
| **Audito žurnalo puslapis** | B1Admin (ManageChurch → Audit Log) | Filtravimas pagal modulį, kategoriją, vartotoją ar entitetą ir senųjų bei naujųjų reikšmių palyginimai – redagavimams lyginant su ankstesniu subjekto įrašu, trynimams pagal `details.before`. Palaikoma `GET /membership/auditlogs`, prieiga suteikiama su `Permissions.server.admin`. |
| **Paketų puslapis** | B1Admin (ta pati Settings vieta) | Paketų sąrašas su būsenomis ir skaičiais, **View Results** (paketo auditų įrašai per `GET /membership/batches/:id/results`) ir **Undo** mygtukas, kuris parodo praleistų konfliktų / nepavykusių operacijų ataskaitą. |
| **Importo paketai** | B1Transfer | Atidaryti paketą, siųsti `X-Batch-Id` įprastiems išsaugojimo kvietimams, užbaigti pabaigoje – importai tampa atšaukiami be naujų importo galinių vietų. Senasis `importKey` lieka tik kaip tik kūrimų kilmės žymeklis; atšaukimui jis pakeistas. |

## Pastabos, kurių ateityje keitimai neturi pažeisti

- **Auditų įrašymai turi likti laukiami.** Nelaukiamas `AuditLogHelper.log(...)` yra prarandamas dėl Lambda sustingimo. Surinkite pažadus ir prieš grąžindami atsakymą atlikite `await Promise.allSettled`.
- **Kysely praleidžia `undefined` reikšmes `.set()` / `.values()` metoduose.** Atkuriant išvalytas stulpelis liktų nepakitęs. `BatchUndoHelper` kiekvieną nebūtą lauką paverčia aiškiu `null` (`nullify`) – niekada neapeikite jo dėl „greitesnio“ tiesioginio rašymo.
- **Saugojimo laikas turi likti gerokai ilgesnis nei atšaukimo langas.** `AuditLogRepo.deleteOld()` veikia kasnakčio laikmačiu (numatytasis saugojimas 365 dienos); atšaukimo langas – 30 dienų. Jei saugojimo laikas kada nors priartėtų prie šio lango, atšaukimo žurnalai bus ištrinti iš po atvirų paketų.
- **Sutrumpinti įrašai neatšaukiami.** `{ truncated: true }` turinys neturi prieš ir po vaizdo; atšaukimas jį pažymi kaip `failed` ir niekada nespėlioja.
- **Tvarka – pirmiausia modulio įrašas, tada auditas.** Niekada nekelkite auditų įrašymo prieš tikrąjį įrašą ir išlaikykite jį griežtą paketuose, patariamąjį įprastame režime.

## Failų sąrašas

| Sritis | Failai |
|--------|--------|
| Apvalkalas / registras | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, momentinės nuotraukos ir eilučių rašymas) |
| Atšaukimo variklis | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Audito pagalbinė klasė | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Valdikliai | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Modeliai / repozitorijos | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Migracija | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| Administravimo UI (kuriama) | B1Admin Audit Log ir Batches puslapiai; B1Transfer importo paketo antraštė |

## Susiję puslapiai

- [Modulio struktūra](../api/module-structure.md) – kaip ne narystės valdiklis pasiekia narystės repozitorijas per `RepoManager`
- [Aukojimai](./giving.md) – aukojimo rašymo keliai, kurie auditojami kaip `sensitive`, net ir anonimiškai
- [Narystės galinės vietos](../api/endpoints/membership.md) – REST paviršius, kuris perduoda `X-Batch-Id` ir atskleidžia `/auditlogs` bei `/batches`
