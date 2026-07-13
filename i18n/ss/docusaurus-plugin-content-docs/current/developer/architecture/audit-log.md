---
title: "Luhlu Lwekuhlola & Emacembu Langabuyiswa"
---

# Luhlu Lwekuhlola & Emacembu Langabuyiswa

<div class="article-intro">

Konkhe kushintjwa lokwenteka ngumsebentisi ku-Api kuyabhalwa — ngubani, yini, nini, futsi kuvela kuphi — kuwo onkhe emodyuli, ngephandle kwekufaka umtsetfo ku-controller ngayinye. Ngetulu kwaloko-lwazi kunelevele ye-cembu: kungeniswa kwemininingwane nome sento sesicaba singamakwa njengecembu bese kamuva **sibuyiselwa** (undone) umugca ngamunye, ngendlela ye-Planning Center. Kokubili kuhlala kuthebula linye le-`auditLogs` ku-database ye-membership futsi kucondziswa endzaweni yinye yekungena, i-`BaseController.actionWrapper`. Lelikhasi limephu kutsi yini lehlolwako, kutsi imininingwane igcinwa kuphi, imitsetfo yekusebenta lokushintja sakhiwo, kanye nendlela lecembu libuyiswa ngayo ngekuphepha ngephandle kwe-transaction lehlanganisa emadatabase lamaningi.

</div>

## Sifinyeto

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

Emaciniso lamabili wesakhiwo acondzisa konkhe lokungentasi:

1. **Levele ye-controller ngiyo yodvwa lekwatiko lomenti.** Ema-repository akakaze abone i-`AuthenticatedUser`; ema-controller kuphela laphetse i-`au`. Ema-controller onkhe wemodyuli ngamunye sekewedlula ku-`BaseController.actionWrapper`, ngako lapho kufaka khona kuhlola — akukho luhlobo lwe-repository loshintjako nakuphi.
2. **Lithebula linye lisebentela onkhe emodyuli.** Imigca yekuhlola yekunikela, kubakhona, kucuketfwa, njll. yonkhe ibhalwa ku-`auditLogs` ye-database ye-membership nge-`RepoManager.getRepos("membership")`, ngisho nakusuka ku-controller lengasiyo ye-membership. "Konkhe Jane lakushintjile lamuhla" kusala kuba query yinye.

## Yini lehlolwako

Kuhlolwa **kusebenta ngekwehluleka ku-verb wonkhe lolshintjako etindleleni tonkhe.** I-`actionWrapper` icabanga tinkambu tekuhlola kusicelo ngephandle kwekuhlela ngendlela nga inye:

| Inkambu | Icatjwa kuphi |
|-------|--------------|
| `module` | `this.moduleName` (umodyuli lomnini) |
| `entityType` | incenye yekugcina ye-`req.baseUrl` lesincane (sib. `/membership/people` → `person`) |
| `category` | ihlulekela ku-`entityType` |
| `action` | `${entityType}_saved` kwentela `POST /`, `${entityType}_deleted` kwentela `DELETE /:id`, ngephandle kwaloko `${entityType}_${method}:${routePath}` ngako tindlela letingasiko ema-CRUD (sib. `task_post:/:id/move`) tiyahlolwa ngekutitjela |

I-`BaseController.AUDIT_REGISTRY` **ikwentela kuhlela nekukhipha kuphela** — akusiyo luhlu lwevunyelwe. Indlela iyavela lapho kuphindza igama lekhathegori/entityType layo, kucacisa `{ dbModule, table }` (lokwentako kutsi ibe yi-batch- naye undo-capable), kumaka njenge-`sensitive` (kuhlola kushintja lokungaziwa lomenti walo), nome kuyicima nge-`optOut: true`.

**Luhlu lwekukhishwa** (tindlela letigcwele kakhulu letibengangicimeza luhlu): attendance `visits` / `visitsessions` / `sessions` / `checkin` (lisiphepho sekubakhona ngeSonto) kanye ne-messaging `messages` / `connections` / `devices` (inkulumo kanye nekubakhona). Konkhe lokunye kuyabhalwa.

**Ema-endpoint ekubulukisa (bulk)** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) abhaliswe ku-`BULK_ROUTES` bese akhicita **umugca lokuhlola munye ngesici ngasinye lesitsintekile**, ngako kungenisa lokungu-10k-labantfu kukhicita imigca lengu-10k — loko kucaca ngesici ngasinye kunguko lokwenta cembu libuyiswe.

**Kushintja lokungaziwa** (`actionWrapperAnon` — kunikela kwesihambi, kubhalisa kwesihambi, kutfumela kwefomu) kuyahlolwa kuphela kutindlela letimakwe ku-registry njenge-`sensitive`, kubhalwa nge-`userId="anonymous"` kanye ne-IP yeclient. Kunikela kukhokhela luhlu; lendlela inemlandvo weliciniso lekuvela kwemaphutsa.

### Kususa lwati loluyimfihlo kanye ne-size caps

Ngaphambi kwekutsi umtfwalo we-`details` ugcinwe, i-`AuditLogHelper.capDetails()` isebentisa i-`sanitizeValue()` phezu kwawo:

- **Emakhi ayimfihlo ayasuswa.** Nome yiphi inkambu leligama layo lelincane liku-`SENSITIVE_KEYS` (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, …) ishintjwa yaba ne-`"[redacted]"`.
- **Emanani lamakhulu ayakhishwa.** Nome yini i-`data:` URI nome incwadzi lengetulu kwe-4 KB (titfombe te-base64, ma-blob) iba ne-`"[stripped]"`.
- **Imigca lemikhulu kakhulu iyanciphiswa.** Nangabe i-JSON lesikwe kuba ngetulu kwecishe ku-64 KB, wonkhe umtfwalo ushintjwa waba ne-`{ truncated: true }`. Imigca lenciphisiwe isabonakala — kodvwa **ayikwati kubuyiswa** (akukho sitfombe se-before/after sekubuyisela kuso).

## Lapho lwati lugcinwa khona

Lithebula linye le-`auditLogs` ku-database ye-**membership** lisekela onkhe emodyuli. Emakholomu: `id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT JSON string), ipAddress, module, batchId, created`. Kwakhwa kwesikhwishukisi `tools/migrations/membership/2026-07-04_audit_universal.ts` kwengeta `module` + `batchId`, kwandzisa `details` kusuka ku-`TEXT` kuya ku-`MEDIUMTEXT`, kwengeta tinkomba `ix_auditLogs_batch (batchId)` kanye ne-`ix_auditLogs_entity (churchId, module, entityType, entityId, created)`, futsi kwakha lithebula le-`batches`. Likholomu le-`module` likhona ngco kuze kungakonakali kuhlangana kwe-`entityType` emodyulini lahlukene (`note`, `setting` bakhona emodyulini lamaningi) kuze kusale kuhlungeka, kantsi inkomba ye-entity ngiyo lelawula umlandvo ngesici kanye nesivikelo sekungqubuzana sekubuyisa.

Kubhala lokwelula-modyuli kuhamba nge-`RepoManager.getRepos("membership")` ngekhatsi kwesongelo. Kuhleleka kwentiwe ngekucabanga: **kubhala lokusemgoceni kuqala emodyulini we-database, kubhala lekuhlola kulandzele.** Ku-normal mode liphutsa lekufaka lekuhlola liyagwinywa (`console.error`, i-Sentry iyakubona). Kuhlola kululeko futsi akukaze kwenta sicelo somsebentisi sehluleke. Ku-**batch mode kuncintekile** (bona ngentasi).

:::info Kungani hhayi ema-trigger, i-CDC, nome emathebula ngemodyuli?
- **Ema-trigger e-MySQL** akakwati kwati mentibitsintsintekile (i-connection ayinayo i-`au`), futsi kungasho kugcinwa kwe-trigger sets kuwo onkhe ma-schema.
- **I-binlog / CDC** yiphrojekthi lephelele ye-infrastructure lenengcinamandla lefanako yemento wentibitsintsintekile.
- **Kufaka `userId` kuma-repository onkhe** kungatsintsa emafayela lamakhulukhulu kudlulisela lwati lesivele lukhona ku-controller.
- **Emathebula ekuhlola ngemodyuli** kungasho ku-7× umsebenti wekufaka ne-ma-query lakhicaba nge-imibuto lehlanganisa ma-modyuli. Lithebula linye kundzawo yinye yekungena yindlela lena nekhodi lencane kepha lesagcina lomenti.
:::

## Simo semsebenti (Performance)

Indlela leshesha yenteliswe ngekucabanga kutsi ibe libhora; lidzabu likhokhelwa kuphela lapho likhicita intfo.

- **Akukho kufunda-ngaphambi-kwekubhala kukushintja lokujwayelekile.** Kugcina lokujwayelekile **akulayishi** umugca wakhale. **Emanani lalayishwe emuva kwekushintja** agcinwa ku-`details.after`; i-UI iyakha kabusha kudzala→kusha ngesikhatsi sekubukwa nge-diffing kumelene nemugca wangaphambili welo entity. I-query yinye ngesikhatsi sekubukwa, akukho lidzabu ngesikhatsi sekubhala. Tinkambu letingakatsintwa kusukela ekucaleni tikhombisa nje kungabikho linani "lakadze" — loku kwemukeleka.
- **Kususwa kutfola sitfombe sangaphambi.** I-`DELETE /:id` ku-indlela ye-registry lene-`{ dbModule, table }` ilayisha umugca ngendlela lejwayelekile kucala futsi iwugcine ku-`details.before`. Kususa kuvela kancane futsi sitfombe sangaphambi sisho lonkhe lugcuku lolutfolwa yiwo.
- **Batch mode nguyona indlela yodvwa lehleliwe ye-funda-ngaphambi-kwekubhala**, futsi ngeyekukhetsa — sento se-bulk/kungeniswa sesivele sibiza kakhulu, ngako kufunda N snapshots sikhokha kwekutsi kube khona kubuyiswa.
- **Kubhala kwekuhlola kulindzelwe (awaited).** I-`actionWrapper` iqoqa ema-promise ekubhala futsi i-`await Promise.allSettled(...)` ngaphambi kwekubuya. Loku kungumtsetfo lobalulekile kunato tonkhe: ku-Lambda i-container **iyayekiswa (freeze) kanye nasibuya sicelo**, ngako kufaka lokungakalindzelwa kuyalahleka ngephandle kwekwatiwa. "Kwenta futsi ukhohlwe" lapha kusho kutsi *emaphutsa akakaze enta sicelo sehluleke*, hhayi kutsi *ungalindzeli* — kufaka kunye kupula ye-membership lesetjwayelekile kucishe kube ngu-1–3 ms.

## Emacembu nekubuyiswa

**Icembu** lihlanganisa luhlu lwekushintja kuze kuhlolwe futsi kubuyiswe ndzawonye. Kunetindlela letimbili tekuvula linye:

- **Lekucacile:** `POST /membership/batches { label, source }` ibuyisa `batchId`. I-client (B1Transfer, i-UI yekungenisa ye-B1Admin) beseyitfumela `X-Batch-Id: <id>` kukugcina/kususa konkhe lokulandzelako. `POST /membership/batches/:id/complete` iyayivala futsi ifake `itemCount`.
- **Lengakacaci (Implicit):** ema-endpoint lamane e-bulk avula, agcwalise, futsi aphelelise icembu lawo ngekhatsi kwesicelo sinye, ibuyisa `batchId` ku-response.

Lithebula le-`batches` (database ye-membership): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### I-Batch mode incintekile

Nangabe i-`X-Batch-Id` ikhona, i-`actionWrapper` iyacinisa sivikelo ngasinye (`writeBatchAuditRows`):

1. Icembu kufanele libe khona, libe `open`, futsi libe ngele-`au.churchId` — ngephandle kwaloko **403**.
2. Indlela kufanele ibe batch-capable (`{ dbModule, table }` ku-registry) — ngephandle kwaloko **400**.
3. Ngaphambi kwekutsi sento sisebente, titfombe tangaphambi teto tonkhe ma-id latsintekile tilayishwa ku-query **yinye** ye-`WHERE id IN (...) AND churchId = ?`. Nangabe lokufunda kwesitfombe kwehluleka, sicelo **siyehluleka 500 futsi sento asisebenti**. I-batch mode akukafanele nanini ikhicite luhlu lolungabuyiseki ngekuthula. (I-normal mode, ngalenye indlela, yenta konkhe lokusemandleni futsi iyagwinya kwehluleka kwesitfombe.)
4. Ngemuva kwekutsi sento siphumelele, umugca munye wekuhlola ngesici ubhalwa nge-`batchId`, `details.before`, kanye ne-`details.after`, kanye nephawu lekwakha lelisobala kwemigca lekwakhwe yicembu.

### Kubuyiswa

`POST /membership/batches/:id/undo` (imvume: umakhi wecembu nome `Permissions.server.admin`). Iyala nangabe icembu alisiyo `completed` nome selidzala kunesikhala se-**emalanga langu-30 sekubuyisa**. I-`BatchUndoHelper.undo()` beseyenta:

1. Ilayisha imigca yekuhlola yecembu bese **iyihlanganisa nge-`(module, entityType, entityId)`.** I-entity letsintekile kanyenti ngekhatsi kwecembu linye ibuyiselwa **kanye kuphela**, ibuyisele esimeni sayo saphambi kwecembu leliciniso — sitfombe sangaphambi sekucala, nome kususa nangabe icembu lakwakha. Yingakoke kubuyiswa akukapindzi umugca ngamunye ngamunye: kubuyisela sitfombe sangekhatsi kwecembu bekungeba liphutsa.
2. Kwentela i-entity ngayinye, kuchubeka **sivikelo sekungqubuzana kucala**: `auditLog.hasLaterModification()` ibuta kutsi ngabe kukhona umbhalo wekuhlola *lolandzelako* walelifana i-`(module, entityType, entityId)` ngephandle kwaleli cembu. Nangabe kunjalo, i-entity beyihleliwe ngemuva kwekungeniswa — iyayewa (skipped) futsi ibikwe, ayikaze icoshwe. Loku kusebentisa kabusha luhlu lwekuhlola ngekwalo njengemhloli wekushintja; akukho tinkholomu te-`modifiedAt` letidzingekako kunome ngutoni ithebula.
3. Iyabuyisa ngekwenteka lokubhaliwe, ikhipha `{ dbModule, table }` kusuka ku-registry futsi isebentisa Kysely writes lejwayelekile:
   - **kwakhiwe** → susa umugca ngco.
   - **kushintjiwe** → bhala `details.before` kabusha.
   - **kususiwe** → faka kabusha `details.before` (buyekeza-nome-faka nangabe umugca lonaleyo id uvele kabusha).
4. Kubuyiswa ngakunye kuyahlolwa ngekwako (`action: "<entityType>_undone"`, akuna `batchId` — kubuyisa-kwe-kubuyiswa akusiyo incenye).

Sento sikhetfwa kusuka **kuphawu lekwakha lesicace**, hhayi kuchazwa kusuka esitfombeni sesele songelutfo — sitfombe sangaphambi lesingelutfo ngemtsetfo nome umugca lonciphisiwe akukafanele kudideke naloko kwakha.

Umphumela wekubuya u-`{ restored, skippedConflicts: [...], failed: [...], status }`, icembu liyanyakata liye ku-`undone` (kucocile) nome `partial`. **Akukho transaction lehlanganisa ma-database lamaningi** — kubuyiswa kwenta konkhe lokusemandleni ngemugca, umkhawulo lofanako i-Planning Center lewubhalile kwentela ema-profile lahlanganisiwe.

:::warning Ema-entity anemiphumela lengetiwe adzinga i-`onUndo` hook
Kubuyisa kwakhiwa kwe-`groupMember` kufanele futsi kubhale i-`groupMemberHistory` ("left"), nome kuhlaziya kwekusuka/kungena kuyawephuka ngekuthula — umtsetfo wesakhiwo lomile. Ema-entity lanjalo abhalisa i-`onUndo` callback ku-`AUDIT_REGISTRY` lebuyisa `true` nasesiphetse konkhe kubuyiswa, ayeqa indlela lejwayelekile. `groupMembers` yisibonelo lesisemtsetfweni (sikhiywe ngu-id wemugca endleleni lecacile kodvwa nge-`personId` kuma-endpoint e-bulk, futsi kulandzelelwa umlandvo ekwengeteni/kususeni konkhe).
:::

## Bubanti bemsebentisi

Bubanti bombili be-admin ba**sesikhatsini sekusebenta**; injongo:

| Bubanti | Repositori | Injongo |
|---------|------|---------|
| **Likhasi Lweluhlu Lwekuhlola** | B1Admin (ManageChurch → Audit Log) | Hlunga nge-modyuli/khathegori/msebentisi/entity futsi ukhicite kudzala→kusha diffs — kwentela kushintja nge-diffing kumelene nemugca wangaphambili we-entity, kwentela kususa kusuka ku-`details.before`. Kusekelwe yi-`GET /membership/auditlogs`, kuvikelwe yi-`Permissions.server.admin`. |
| **Likhasi Lemacembu** | B1Admin (ku-Settings hub lefanako) | Luhlu lwemacembu ngesistatus kanye netibalo, **View Results** (imigca yekuhlola yecembu nge-`GET /membership/batches/:id/results`), kanye nenkhinobho ye-**Undo** lekhombisa umbiko wekungqubuzana-lokwewiwe / lokwehlulekile. |
| **Emacembu ekungenisa** | B1Transfer | Vula icembu, tfumela `X-Batch-Id` kukugcina kwako lokujwayelekile, uphelelise ekugcineni — kungenisa kuyaba lokungabuyiswa ngephandle kwema-endpoint amasha ekungenisa. `importKey` lakadze isasala njengephawu lelucwalo lekwakha-kuphela, seliyekelwe kwentela kubuyiswa. |

## Tintfo letidzinga kucwayiswa esintweni lesilandzelako

- **Kubhala kwekuhlola kufanele kuhlale kulindzelwe (awaited).** I-`AuditLogHelper.log(...)` lengakalindzelwa iyalahlwa yi-Lambda freeze. Qoqa ema-promise futsi i-`await Promise.allSettled` ngaphambi kwekubuya.
- **I-Kysely iyalahla `undefined` ku-`.set()`/`.values()`.** Nasekubuyiseni, likholomu lelisusiwe lingasala lingatsintekanga. I-`BatchUndoHelper` ishintja inkambu ngayinye lengekho iba ne-`null` lesicace (`nullify`) — akukafanele kuyewe kwentela kubhala lokusheshako "ngco".
- **Kugcinwa kufanele kuhlale kungetulu kwesikhala sekubuyisa.** I-`AuditLogRepo.deleteOld()` isebenta etayimeni yasebusuku (kugcinwa kwehluleka kusuka ku-365-usuku), sikhala sekubuyisa singemalanga langu-30. Nangabe kugcinwa kwehla kuya esikhaleni, ma-ledger ekubuyisa ayasuswa ngephasi kwemacembu lasavulekile.
- **Imigca lenciphisiwe ayikwati kubuyiswa.** Umtfwalo we-`{ truncated: true }` awunasitfombe se-before/after; kubuyiswa kubika njenge-`failed`, akukaze ucabange.
- **Kuhleleka kubhalwa-modyuli-bese-kuhlola.** Ungakaze uhambise kubhala kwekuhlola phambili kwekubhala lokweli, futsi kugcine kuncintekile-ku-batch / kululeko-ku-normal.

## Luhlu Lwemafayela

| Sifundza | Emafayela |
|------|-------|
| Songelo / Registry | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, snapshot + write-rows) |
| Injini yekubuyisa | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Umsiti wekuhlola | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Ema-controller | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Emamodeli / ma-repository | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Sikhwishukisi | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| Bubanti be-Admin (sesikhatsini) | B1Admin Audit Log + Batches pages; B1Transfer import-batch header |

## Emakhasi Lahlobene

- [Sakhiwo Semodyuli](../api/module-structure) — kutsi controller lengasiyo ye-membership ifinyelela njani kuma-repository we-membership nge-`RepoManager`
- [Kunikela](./giving) — tindlela tekubhala tekunikela letihlolwako njenge-`sensitive` ngisho nanome kungaziwa
- [Ema-Endpoint E-Membership](../api/endpoints/membership) — bubanti be-REST lobuthwala `X-Batch-Id` futsi bukhombisa `/auditlogs` kanye ne-`/batches`
