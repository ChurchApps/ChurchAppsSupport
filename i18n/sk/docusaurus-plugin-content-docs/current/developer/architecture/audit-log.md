---
title: "Denník auditu a dávky s možnosťou vrátenia"
---

# Denník auditu a dávky s možnosťou vrátenia

<div class="article-intro">

Každá zmena vykonaná používateľom v Api sa zaznamenáva – kto, čo, kedy a odkiaľ – naprieč všetkými modulmi, bez akéhokoľvek nastavenia v jednotlivých kontroléroch. Nad týmto záznamom stojí vrstva dávok: import alebo hromadnú akciu možno označiť ako dávku a neskôr ju **vrátiť späť** riadok po riadku, v štýle Planning Center. Obe časti sú uložené v jednej tabuľke `auditLogs` v databáze členstva a riadia sa výlučne z jedného kontrolného bodu, `BaseController.actionWrapper`. Táto stránka mapuje, čo sa audituje, kde sa údaje nachádzajú, kompromisy výkonu, ktoré tento návrh formujú, a ako vrátenie dávky bezpečne obráti zmeny bez transakcií naprieč databázami.

</div>

## Prehľad

```
každá požiadavka meniaca dáta (POST/PUT/PATCH/DELETE)
        │
        ▼
BaseController.actionWrapper ──▶ odvodenie {module, entityType, category, action}
        │                         z req.baseUrl + metódy  (AUDIT_REGISTRY = iba výnimky/odhlásenia)
        │
        ├─ normálny režim ──────▶ spustenie akcie ─▶ await AuditLogHelper.log(hodnoty po zmene)  ──┐
        │                                          (mazania zachytia aj obraz pred zmenou)          │
        │                                                                                           ▼
        └─ prítomné X-Batch-Id ─▶ snímka hodnôt pred zmenou (prísna) ─▶ spustenie akcie ─▶ záznamy auditu označené batchId
                                                                                                    │
                                                                                                    ▼
                                                             auditLogs  (databáza členstva, jedna tabuľka, všetky moduly)
                                                                                                    │
   POST /membership/batches/:id/undo ──▶ BatchUndoHelper ──▶ prechod záznamov v opačnom poradí, po entitách ┘
                                          kontrola konfliktov → obnovenie / zmazanie / opätovné vloženie
```

Za všetkým nižšie stoja dve štrukturálne skutočnosti:

1. **Jediné miesto, ktoré pozná používateľa, ktorý vykonal zmenu, je vrstva kontrolérov.** Repozitáre nikdy nevidia `AuthenticatedUser`; iba kontroléry držia `au`. Všetky kontroléry každého modulu už prechádzajú cez `BaseController.actionWrapper`, preto sa audit napája práve tam – nemení sa žiadna signatúra repozitára.
2. **Jedna tabuľka slúži všetkým modulom.** Záznamy auditu pre dary, účasť, obsah atď. sa zapisujú do tabuľky `auditLogs` v databáze členstva cez `RepoManager.getRepos("membership")`, a to aj z kontroléra mimo modulu členstva. Otázka „čo Jane dnes zmenila“ tak zostáva jediným dopytom.

## Čo sa audituje

Audit je **predvolene zapnutý** pre každé sloveso meniace dáta na každej trase. `actionWrapper` odvodzuje polia auditu z požiadavky bez akejkoľvek konfigurácie pre jednotlivé trasy:

| Pole | Odvodené z |
|------|------------|
| `module` | `this.moduleName` (vlastniaci modul) |
| `entityType` | singulár poslednej časti `req.baseUrl` (napr. `/membership/people` → `person`) |
| `category` | predvolene `entityType` |
| `action` | `${entityType}_saved` pre `POST /`, `${entityType}_deleted` pre `DELETE /:id`, inak `${entityType}_${method}:${routePath}`, takže vedľajšie trasy mimo CRUD (napr. `task_post:/:id/move`) sa zachytia automaticky |

`BaseController.AUDIT_REGISTRY` slúži **iba na výnimky a odhlásenia** – nie je to zoznam povolených. Trasa sa do neho zapíše, ak chceme premenovať jej kategóriu alebo `entityType`, ak deklarujeme `{ dbModule, table }` (čím sa stane schopnou dávkovania a vrátenia), ak ju označíme ako `sensitive` (audit anonymných zmien), alebo ak ju vypneme pomocou `optOut: true`.

**Zoznam odhlásení** (zápisy s veľkým objemom, ktoré by zahltili denník): `visits` / `visitsessions` / `sessions` / `checkin` v module účasti (nápor pri nedeľnom check-ine) a `messages` / `connections` / `devices` v module správ (chat a prítomnosť). Všetko ostatné sa zaznamenáva.

**Hromadné koncové body** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) sú zaregistrované v `BULK_ROUTES` a zapisujú **jeden záznam auditu na každé dotknuté ID**, takže import 10 000 osôb vytvorí 10 000 záznamov. Práve táto granularita na úrovni entít umožňuje, aby bola dávka vrátiteľná.

**Anonymné zmeny** (`actionWrapperAnon` – anonymné dary, registrácia hostí, odoslania formulárov) sa auditujú iba pre trasy označené v registri ako `sensitive`. Zapisujú sa s `userId="anonymous"` a IP adresou klienta. Na čele tohto zoznamu sú dary; táto cesta má skutočnú históriu regresií.

### Redakcia tajomstiev a limity veľkosti

Predtým, než sa akýkoľvek payload `details` uloží, `AuditLogHelper.capDetails()` spustí `sanitizeValue()`:

- **Kľúče s tajomstvami sa redigujú.** Každé pole, ktorého názov malými písmenami je v `SENSITIVE_KEYS` (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, …), sa nahradí hodnotou `"[redacted]"`.
- **Veľké skalárne hodnoty sa odstránia.** Každý URI `data:` alebo reťazec dlhší ako 4 KB (base64 fotografie, binárne bloby) sa zmení na `"[stripped]"`.
- **Príliš veľké záznamy sa orezávajú.** Ak serializovaný JSON presiahne približne 64 KB, celý payload sa nahradí objektom `{ truncated: true }`. Orezané záznamy sa stále dajú zobraziť, ale **nedajú sa vrátiť späť** (nie je z čoho obnoviť obraz pred ani po zmene).

## Kde sa údaje nachádzajú

Jedna tabuľka `auditLogs` v databáze **členstva** slúži všetkým modulom. Stĺpce: `id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT JSON reťazec), ipAddress, module, batchId, created`. Migrácia `tools/migrations/membership/2026-07-04_audit_universal.ts` pridáva `module` a `batchId`, rozširuje `details` z `TEXT` na `MEDIUMTEXT`, pridáva indexy `ix_auditLogs_batch (batchId)` a `ix_auditLogs_entity (churchId, module, entityType, entityId, created)` a vytvára tabuľku `batches`. Stĺpec `module` existuje presne preto, aby zostali filtrovateľné kolízie `entityType` medzi modulmi (napr. `note` a `setting` existujú vo viacerých) a index entity slúži zároveň na históriu jednotlivých entít a na kontrolu konfliktov pri vrátení.

Zápisy medzi modulmi prechádzajú cez `RepoManager.getRepos("membership")` zvnútra wrappera. Poradie je zámerné: **hlavný zápis sa najprv potvrdí v databáze modulu, až potom sa vloží záznam auditu.** V normálnom režime sa chyba pri vkladaní auditu potichu prehltne (`console.error`, Sentry ju zachytí) – audit je informatívny a nikdy nesmie zlyhať požiadavku používateľa. V **dávkovom režime je prísny** (pozri nižšie).

:::info Prečo nie triggery, CDC alebo tabuľky auditu pre jednotlivé moduly?
- **Triggery MySQL** nepoznajú konajúceho používateľa (spojenie nemá `au`) a znamenali by udržiavanie sád triggerov vo všetkých schémach.
- **binlog / CDC** je samostatný infraštruktúrny projekt s rovnakým problémom s identitou konajúceho.
- **Prenos `userId` cez každý repozitár** by zasiahol stovky súborov kvôli informácii, ktorú vrstva kontrolérov už má.
- **Tabuľky auditu pre jednotlivé moduly** by znamenali sedemnásobok zapojenia a dopyty rozosielané do všetkých modulov pri každej otázke naprieč modulmi. Jedna tabuľka v kontrolnom bode kontroléra je najmenej kódu, ktorý stále zachytáva konajúceho.
:::

## Prístup k výkonu

Kritická cesta je zámerne lacná; náklady sa platia iba tam, kde niečo prinášajú.

- **Žiadne čítanie pred zápisom pri bežných úpravách.** Bežné uloženie **nenačíta** starý záznam. **Odoslané hodnoty po zmene** sa uložia do `details.after`; používateľské rozhranie rekonštruuje prechod zo starej na novú hodnotu **až pri zobrazení** porovnaním s predchádzajúcim záznamom auditu danej entity. Jeden dopyt pri zobrazení, nulové náklady pri zápise. Polia, ktoré sa od spustenia nikdy nezmenili, jednoducho nezobrazujú „starú“ hodnotu – to je prijateľné.
- **Mazania získajú obraz pred zmenou.** `DELETE /:id` na trase z registra s `{ dbModule, table }` najprv všeobecne načíta riadok a uloží ho do `details.before`. Mazania sú zriedkavé a obraz pred zmenou je celá ich forenzná hodnota.
- **Dávkový režim je jediným systematickým čítaním pred zápisom** a je voliteľný – hromadná operácia alebo import sú už aj tak nákladné, takže N čítaní snímok je cena za možnosť vrátenia.
- **Vloženia do auditu sa čakajú (`await`).** `actionWrapper` zbiera sľuby zápisov a pred návratom volá `await Promise.allSettled(...)`. Toto je najdôležitejší invariant: na Lambde sa kontajner **zmrazí v momente, keď sa odošle odpoveď**, takže nečakané vloženie sa potichu stratí. „Odpáliť a zabudnúť“ tu znamená *chyby nikdy nezlyhajú požiadavku*, nie *nečakať* – jedno vloženie do už zahriateho fondu spojení databázy členstva trvá zhruba 1–3 ms.

## Dávky a vrátenie

**Dávka** zoskupuje sadu zmien, aby sa dali spoločne skontrolovať a spoločne zvrátiť. Existujú dva spôsoby, ako ju otvoriť:

- **Explicitne:** `POST /membership/batches { label, source }` vráti `batchId`. Klient (B1Transfer, importné rozhranie B1Admin) potom pri každom ďalšom uložení alebo zmazaní pošle `X-Batch-Id: <id>`. `POST /membership/batches/:id/complete` dávku uzavrie a zapíše `itemCount`.
- **Implicitne:** štyri hromadné koncové body otvoria, naplnia a dokončia vlastnú dávku v rámci jednej požiadavky a vrátia `batchId` v odpovedi.

Tabuľka `batches` (databáza členstva): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### Dávkový režim je prísny

Ak je prítomné `X-Batch-Id`, `actionWrapper` sprísni každú kontrolu (`writeBatchAuditRows`):

1. Dávka musí existovať, byť `open` a patriť k `au.churchId` – inak **403**.
2. Trasa musí podporovať dávkovanie (`{ dbModule, table }` v registri) – inak **400**.
3. Pred spustením akcie sa obrazy pred zmenou všetkých dotknutých ID načítajú **jedným** dopytom `WHERE id IN (...) AND churchId = ?`. Ak toto čítanie snímky zlyhá, požiadavka skončí chybou **500** a akcia sa **nevykoná** – dávkový režim nesmie potichu vytvoriť denník, ktorý sa nedá vrátiť. (Normálny režim naopak funguje na princípe najlepšieho úsilia a chyby snímok potichu prehltáva.)
4. Po úspešnom vykonaní akcie sa pre každú entitu zapíše jeden záznam auditu s `batchId`, `details.before` a `details.after`, plus explicitný **značku vytvorenia** pre riadky, ktoré dávka vytvorila.

### Vrátenie

`POST /membership/batches/:id/undo` (oprávnenie: tvorca dávky alebo `Permissions.server.admin`). Požiadavku odmietne, ak dávka nie je `completed`, alebo ak je staršia ako **30-dňové okno na vrátenie**. `BatchUndoHelper.undo()` potom:

1. Načíta záznamy auditu dávky a **zoskupí ich podľa `(module, entityType, entityId)`**. Entita, ktorá bola v rámci jednej dávky zmenená viackrát, sa vráti **raz**, do svojho skutočného stavu pred dávkou – teda najskorším obrazom pred zmenou, alebo zmazaním, ak ju dávka vytvorila. Preto vrátenie neprehráva jednoducho každý riadok: obnovenie medzistavu uprostred dávky by bolo nesprávne.
2. Pre každú entitu najprv spustí **kontrolu konfliktov**: `auditLog.hasLaterModification()` zisťuje, či pre rovnaké `(module, entityType, entityId)` existuje *neskorší* záznam auditu mimo tejto dávky. Ak áno, entita bola upravená po importe – **preskočí sa a nahlási**, nikdy sa nepremaže. Týmto sa samotný denník auditu používa ako detektor zmien; stĺpce `modifiedAt` v žiadnej tabuľke nie sú potrebné.
3. Vráti zmenu podľa zaznamenanej operácie, pričom `{ dbModule, table }` získa z registra a používa všeobecné zápisy Kysely:
   - **vytvorené** → natvrdo zmaže riadok.
   - **upravené** → zapíše späť `details.before`.
   - **zmazané** → znovu vloží `details.before` (aktualizuje alebo vloží, ak sa riadok s daným ID medzitým znova objavil).
4. Každé vrátenie je samo zaznamenané do auditu (`action: "<entityType>_undone"`, bez `batchId` – vrátenie vrátenia je mimo rozsahu).

Operácia sa vyberie podľa explicitnej **značky vytvorenia**, nie odvodením z chýbajúceho obrazu pred zmenou – legitímne prázdny obraz pred zmenou alebo orezaný riadok sa nesmie zamieňať za vytvorenie.

Výsledný payload je `{ restored, skippedConflicts: [...], failed: [...], status }`; dávka prejde do stavu `undone` (bez problémov) alebo `partial`. **Neexistuje transakcia naprieč databázami** – vrátenie je po jednotlivých riadkoch podľa najlepšieho úsilia, rovnaké obmedzenie, aké Planning Center dokumentuje pri zlúčených profiloch.

:::warning Entity s vedľajšími účinkami potrebujú hook `onUndo`
Vrátenie vytvorenia `groupMember` musí zároveň zapísať `groupMemberHistory` (stav „left“), inak sa potichu pokazia analýzy fluktuácie – je to trvalý invariant pracovného priestoru. Takéto entity registrujú v `AUDIT_REGISTRY` callback `onUndo`, ktorý vráti `true`, ak vrátenie úplne spracoval, čím obíde všeobecnú cestu. Kanonickým prípadom sú `groupMembers` (na explicitnej ceste sa identifikujú podľa ID riadku, na hromadných koncových bodoch podľa `personId` a história sa sleduje pri každom pridaní a odstránení).
:::

## Spotrebiteľské rozhrania

Obe administrátorské rozhrania sú **vo vývoji**; zámer je tento:

| Rozhranie | Repozitár | Účel |
|-----------|-----------|------|
| **Stránka denníka auditu** | B1Admin (ManageChurch → Audit Log) | Filtrovanie podľa modulu/kategórie/používateľa/entity a zobrazenie rozdielov zo starej na novú hodnotu – pri úpravách porovnaním s predchádzajúcim záznamom entity, pri mazaniach z `details.before`. Poskytuje ho `GET /membership/auditlogs`, prístup je obmedzený na `Permissions.server.admin`. |
| **Stránka dávok** | B1Admin (rovnaký hub nastavení) | Zoznam dávok so stavom a počtami, **Zobraziť výsledky** (záznamy auditu dávky cez `GET /membership/batches/:id/results`) a tlačidlo **Vrátiť**, ktoré zobrazí správu o preskočených konfliktoch a zlyhaniach. |
| **Importné dávky** | B1Transfer | Otvorenie dávky, odoslanie `X-Batch-Id` pri jej bežných uloženiach a dokončenie na konci – importy sa dajú vrátiť bez nových importných koncových bodov. Pôvodný `importKey` zostáva ako značka pôvodu len pre vytvorenia; pre vrátenie je nahradený. |

## Úskalia, ktoré budúca zmena nesmie zhoršiť

- **Vloženia do auditu musia zostať čakané (`await`).** Nečakané volanie `AuditLogHelper.log(...)` sa zmrazením na Lambde stratí. Pred návratom zbierajte sľuby a volajte `await Promise.allSettled`.
- **Kysely vynecháva `undefined` v `.set()`/`.values()`.** Pri obnovení by vymazaný stĺpec ostal nedotknutý. `BatchUndoHelper` každé chýbajúce pole prevedie na explicitné `null` (`nullify`) – nikdy to neobchádzajte kvôli „rýchlejšiemu“ priamemu zápisu.
- **Uchovávanie musí zostať výrazne nad oknom na vrátenie.** `AuditLogRepo.deleteOld()` beží na nočnom časovači (predvolené uchovávanie 365 dní); okno na vrátenie je 30 dní. Ak by sa uchovávanie niekedy priblížilo k oknu, denníky na vrátenie by sa vymazali spod otvorených dávok.
- **Orezané riadky sa nedajú vrátiť.** Payload `{ truncated: true }` nemá obraz pred ani po zmene; vrátenie ho nahlási ako `failed` a nikdy nehádže.
- **Poradie je najprv zápis v module, potom audit.** Vloženie do auditu nikdy nepresúvajte pred skutočný zápis a dodržiavajte prísny režim v dávke / informatívny režim v normálnom režime.

## Inventár súborov

| Oblasť | Súbory |
|--------|--------|
| Wrapper / register | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, snímka + zápis riadkov) |
| Motor vrátenia | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Pomocník auditu | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Kontroléry | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Modely / repozitáre | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Migrácia | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| Administrátorské rozhranie (vo vývoji) | Stránky B1Admin Audit Log a Batches; hlavička importnej dávky v B1Transfer |

## Súvisiace stránky

- [Štruktúra modulov](../api/module-structure) – ako sa kontrolér mimo modulu členstva dostane k repozitárom členstva cez `RepoManager`
- [Dary](./giving) – zápisy darov, ktoré sú auditované ako `sensitive` aj v anonymnom režime
- [Koncové body členstva](../api/endpoints/membership) – REST rozhranie, ktoré prenáša `X-Batch-Id` a sprístupňuje `/auditlogs` a `/batches`
