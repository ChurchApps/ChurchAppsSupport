---
title: "Audit Log & Undoable Batches"
---

# Audit Log & Undoable Batches

<div class="article-intro">

Api में हर यूज़र-initiated mutation रिकॉर्ड की जाती है — कौन, क्या, कब, और कहाँ से — सभी मॉड्यूल में, बिना किसी प्रति-कंट्रोलर वायरिंग के। उस ledger के ऊपर एक बैच लेयर बैठती है: एक import या bulk action को एक बैच के रूप में टैग किया जा सकता है और बाद में **undo** किया जा सकता है, row-by-row, Planning-Center की शैली में। दोनों membership डेटाबेस में एक ही `auditLogs` टेबल में रहते हैं और पूरी तरह से एक choke point, `BaseController.actionWrapper` से संचालित होते हैं। यह पृष्ठ मैप करता है कि क्या audit किया जाता है, डेटा कहाँ रहता है, वे performance trade-offs जो इसे आकार देते हैं, और undo बिना cross-database transactions के एक बैच को सुरक्षित रूप से कैसे उलटता है।

</div>

## अवलोकन

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

दो structural facts नीचे की हर चीज़ को चलाते हैं:

1. **कंट्रोलर लेयर ही एकमात्र जगह है जो actor को जानती है।** Repositories कभी `AuthenticatedUser` नहीं देखतीं; केवल कंट्रोलर `au` रखते हैं। हर मॉड्यूल के कंट्रोलर पहले से ही `BaseController.actionWrapper` से होकर गुज़रते हैं, इसलिए यही वह जगह है जहाँ auditing hook होती है — कहीं भी repo signatures नहीं बदलते।
2. **एक टेबल सभी मॉड्यूल की सेवा करती है।** Giving, attendance, content आदि के लिए audit rows सभी `RepoManager.getRepos("membership")` के माध्यम से membership DB की `auditLogs` में लिखी जाती हैं, यहाँ तक कि एक non-membership कंट्रोलर से भी। "आज Jane ने जो कुछ बदला" एक ही query रहता है।

## क्या audit किया जाता है

Auditing **हर route पर हर mutating verb के लिए डिफ़ॉल्ट-चालू है**। `actionWrapper` शून्य प्रति-route कॉन्फ़िगरेशन के साथ रिक्वेस्ट से audit फ़ील्ड derive करता है:

| फ़ील्ड | कहाँ से derived |
|-------|--------------|
| `module` | `this.moduleName` (मालिक मॉड्यूल) |
| `entityType` | `req.baseUrl` का singularized अंतिम खंड (जैसे `/membership/people` → `person`) |
| `category` | डिफ़ॉल्ट रूप से `entityType` |
| `action` | `POST /` के लिए `${entityType}_saved`, `DELETE /:id` के लिए `${entityType}_deleted`, अन्यथा `${entityType}_${method}:${routePath}` ताकि non-CRUD sub-routes (जैसे `task_post:/:id/move`) स्वचालित रूप से कैप्चर हों |

`BaseController.AUDIT_REGISTRY` **केवल overrides और opt-outs के लिए है** — यह एक allowlist नहीं है। एक route वहाँ अपनी category/entityType बदलने के लिए, `{ dbModule, table }` घोषित करने के लिए (जो इसे बैच- और undo-सक्षम बनाता है), इसे `sensitive` के रूप में चिह्नित करने के लिए (anonymous mutations को audit करना), या इसे `optOut: true` से बंद करने के लिए दिखाई देता है।

**Opt-out सूची** (firehose write paths जो ledger को डुबो देते): attendance की `visits` / `visitsessions` / `sessions` / `checkin` (रविवार का check-in तूफ़ान) और messaging की `messages` / `connections` / `devices` (चैट और presence)। बाकी सब कुछ लॉग होता है।

**Bulk endpoints** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) `BULK_ROUTES` में रजिस्टर्ड हैं और **प्रति touched id एक audit row** emit करते हैं, इसलिए एक 10k-व्यक्ति import 10k rows बनाता है — वही per-entity granularity है जो बैच को undoable बनाती है।

**Anonymous mutations** (`actionWrapperAnon` — guest giving, guest registration, form submissions) केवल registry-flagged `sensitive` routes के लिए audit की जाती हैं, `userId="anonymous"` प्लस client IP के साथ लिखी जाती हैं। Donations सूची में सबसे ऊपर हैं; उस पाथ का एक असली regression इतिहास है।

### Secret redaction और size caps

किसी भी `details` payload को स्टोर करने से पहले, `AuditLogHelper.capDetails()` इसके ऊपर `sanitizeValue()` चलाता है:

- **Secret keys redact की जाती हैं।** कोई भी फ़ील्ड जिसका lowercase नाम `SENSITIVE_KEYS` (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, …) में है, `"[redacted]"` से बदल दी जाती है।
- **विशाल scalars हटा दिए जाते हैं।** कोई भी `data:` URI या 4 KB से बड़ी string (base64 फोटो, blobs) `"[stripped]"` बन जाती है।
- **Oversized rows को cap किया जाता है।** यदि serialized JSON ~64 KB से बड़ा है तो पूरा payload `{ truncated: true }` से बदल दिया जाता है। Truncated rows फिर भी देखी जा सकती हैं — लेकिन **undoable नहीं** (restore करने के लिए कोई before/after image नहीं है)।

## डेटा कहाँ रहता है

Membership डेटाबेस में एक ही `auditLogs` टेबल हर मॉड्यूल का समर्थन करती है। Columns: `id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT JSON string), ipAddress, module, batchId, created`। माइग्रेशन `tools/migrations/membership/2026-07-04_audit_universal.ts` `module` + `batchId` जोड़ता है, `details` को `TEXT` से `MEDIUMTEXT` तक चौड़ा करता है, इंडेक्स `ix_auditLogs_batch (batchId)` और `ix_auditLogs_entity (churchId, module, entityType, entityId, created)` जोड़ता है, और `batches` टेबल बनाता है। `module` कॉलम ठीक इसीलिए मौजूद है ताकि मॉड्यूल के बीच `entityType` टकराव (`note`, `setting` कई में मौजूद हैं) फ़िल्टर करने योग्य बने रहें, और entity इंडेक्स वही है जो प्रति-entity इतिहास और undo conflict गार्ड दोनों को शक्ति देता है।

Cross-module writes wrapper के अंदर से `RepoManager.getRepos("membership")` से होकर जाती हैं। क्रम जानबूझकर है: **मुख्य write पहले मॉड्यूल DB में commit होता है, audit insert दूसरे नंबर पर।** सामान्य मोड में एक audit-insert विफलता निगल ली जाती है (`console.error`, Sentry इसे पकड़ लेता है) — audit सलाहकारी है और कभी किसी यूज़र की रिक्वेस्ट को विफल नहीं होने देना चाहिए। **बैच मोड में यह strict है** (नीचे देखें)।

:::info Triggers, CDC, या प्रति-मॉड्यूल टेबल क्यों नहीं?
- **MySQL triggers** actor को नहीं जानते (connection के पास कोई `au` नहीं है), और इसका मतलब होगा हर schema में trigger sets को बनाए रखना।
- **binlog / CDC** एक पूरा infrastructure प्रोजेक्ट है उसी actor-identity समस्या के साथ।
- **हर repo के माध्यम से `userId` को thread करना** उस जानकारी को move करने के लिए सैकड़ों फ़ाइलों को touch करने का मतलब होगा जो कंट्रोलर लेयर के पास पहले से है।
- **प्रति-मॉड्यूल audit टेबल** का मतलब होगा किसी भी cross-module सवाल के लिए 7× plumbing और fan-out queries। कंट्रोलर choke point पर एक टेबल सबसे कम-कोड डिज़ाइन है जो फिर भी actor को कैप्चर करता है।
:::

## Performance रुख़

Hot पाथ जानबूझकर सस्ता है; लागत केवल वहीं चुकाई जाती है जहाँ यह कुछ खरीदती है।

- **सामान्य अपडेट पर कोई read-before-write नहीं।** एक नियमित सेव पुराना रिकॉर्ड लोड **नहीं** करता। **सबमिट की गई after-values** को `details.after` में स्टोर किया जाता है; UI *view* के समय entity की पिछली audit row के विरुद्ध diff करके old→new को दोबारा बनाता है। View समय पर एक query, write समय पर शून्य लागत। लॉन्च के बाद से कभी न छुई गई फ़ील्ड्स बस कोई "पुरानी" वैल्यू नहीं दिखातीं — स्वीकार्य।
- **Deletes को एक before-image मिलती है।** `{ dbModule, table }` वाले एक registry route पर `DELETE /:id` पहले row को generically लोड करता है और इसे `details.before` में स्टोर करता है। Deletes दुर्लभ हैं और before-image ही पूरा forensic मूल्य है।
- **बैच मोड ही एकमात्र systematic read-before-write है**, और यह opt-in है — एक bulk/import ऑपरेशन पहले से महंगा है, इसलिए N snapshot reads undo की कीमत हैं।
- **Audit inserts await किए जाते हैं।** `actionWrapper` log promises इकट्ठा करता है और लौटने से पहले `await Promise.allSettled(...)` करता है। यह सबसे महत्वपूर्ण invariant है: Lambda पर container **response लौटते ही freeze हो जाता है**, इसलिए एक un-awaited insert चुपचाप गिरा दिया जाता है। यहाँ "Fire and forget" का मतलब है *errors कभी रिक्वेस्ट को fail नहीं करतीं*, *await मत करो* नहीं — पहले से warm membership pool पर एक एकल insert ~1–3 ms का है।

## बैच और undo

एक **बैच** mutations के एक सेट को समूहित करता है ताकि उन्हें एक साथ review और reverse किया जा सके। इसे खोलने के दो तरीके हैं:

- **Explicit:** `POST /membership/batches { label, source }` एक `batchId` लौटाता है। क्लाइंट (B1Transfer, एक B1Admin import UI) फिर हर बाद के save/delete पर `X-Batch-Id: <id>` भेजता है। `POST /membership/batches/:id/complete` इसे बंद करता है और `itemCount` को stamp करता है।
- **Implicit:** चार bulk endpoints एक ही रिक्वेस्ट के अंदर अपना ही बैच खोलते, भरते, और पूरा करते हैं, response में `batchId` लौटाते हुए।

`batches` टेबल (membership DB): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`।

### बैच मोड strict है

जब `X-Batch-Id` मौजूद है, `actionWrapper` हर गार्ड को कड़ा करता है (`writeBatchAuditRows`):

1. बैच मौजूद होनी चाहिए, `open` होनी चाहिए, और `au.churchId` से संबंधित होनी चाहिए — अन्यथा **403**।
2. Route बैच-सक्षम होना चाहिए (registry में `{ dbModule, table }`) — अन्यथा **400**।
3. Action चलने से पहले, सभी प्रभावित ids के लिए before-images को **एक** `WHERE id IN (...) AND churchId = ?` query में लोड किया जाता है। यदि वह snapshot read fail होता है, तो रिक्वेस्ट **500 फेल होती है और action execute नहीं होता** — बैच मोड को कभी चुपचाप एक un-undoable ledger produce नहीं करना चाहिए। (इसके विपरीत, सामान्य मोड best-effort है और snapshot विफलताओं को निगल जाता है।)
4. Action सफल होने के बाद, प्रति entity एक audit row `batchId`, `details.before`, और `details.after` के साथ लिखी जाती है, प्लस बैच द्वारा बनाई गई rows के लिए एक explicit **create marker**।

### Undo

`POST /membership/batches/:id/undo` (अनुमति: बैच निर्माता या `Permissions.server.admin`)। यह रिजेक्ट करता है यदि बैच `completed` नहीं है या **30-दिन की undo विंडो** से पुरानी है। `BatchUndoHelper.undo()` फिर:

1. बैच की audit rows को लोड करता है और उन्हें **`(module, entityType, entityId)` से समूहित करता है।** एक entity जिसे एक बैच के अंदर कई बार छुआ गया है उसे **एक बार** उलटा जाता है, उसकी असली pre-batch स्थिति में — सबसे पहली before-image, या यदि बैच ने उसे बनाया था तो एक delete। यही वजह है कि undo हर row को नीरसता से replay नहीं करता: एक intermediate mid-batch snapshot को restore करना गलत होगा।
2. हर entity के लिए, **पहले conflict गार्ड चलाता है**: `auditLog.hasLaterModification()` पूछता है कि क्या इस बैच के बाहर उसी `(module, entityType, entityId)` के लिए कोई *बाद की* audit entry मौजूद है। यदि हाँ, तो entity को import के बाद edit किया गया था — इसे **skip और report** किया जाता है, कभी clobber नहीं किया जाता। यह modification detector के रूप में audit log को खुद ही दोबारा उपयोग करता है; किसी भी टेबल पर `modifiedAt` कॉलम की ज़रूरत नहीं है।
3. रिकॉर्ड किए गए op के अनुसार reverse करता है, registry से `{ dbModule, table }` resolve करके और generic Kysely writes का उपयोग करके:
   - **created** → row को hard-delete करें।
   - **updated** → `details.before` को वापस लिखें।
   - **deleted** → `details.before` को दोबारा insert करें (update-or-insert यदि उस id के साथ एक row फिर से सामने आ गई)।
4. हर reversal खुद audit की जाती है (`action: "<entityType>_undone"`, कोई `batchId` नहीं — undo-of-undo दायरे से बाहर है)।

Op को explicit **create marker** से चुना जाता है, किसी गायब before-image से अनुमान नहीं लगाया जाता — एक वैध रूप से खाली before-image या एक truncated row को create समझने की गलती नहीं होनी चाहिए।

Result payload `{ restored, skippedConflicts: [...], failed: [...], status }` है; बैच `undone` (clean) या `partial` में चली जाती है। **कोई cross-DB transaction नहीं है** — undo प्रति row best-effort है, वही सीमा जिसे Planning Center merged profiles के लिए दस्तावेज़ करता है।

:::warning Side-effect entities को एक `onUndo` hook चाहिए
एक `groupMember` create को उलटने के लिए `groupMemberHistory` ("left") भी लिखनी होगी, अन्यथा churn analytics चुपचाप टूट जाते हैं — एक स्थायी workspace invariant। ऐसी entities `AUDIT_REGISTRY` में एक `onUndo` कॉलबैक रजिस्टर करती हैं जो `true` लौटाता है जब वह reversal को पूरी तरह हैंडल कर चुका होता है, generic पाथ को bypass करते हुए। `groupMembers` canonical केस है (explicit पाथ पर row id से keyed लेकिन bulk endpoints पर `personId` से, और हर add/remove पर history-tracked)।
:::

## उपभोक्ता सतहें

दोनों admin सतहें **प्रगति में हैं**; इरादा:

| सतह | रेपो | उद्देश्य |
|---------|------|---------|
| **Audit Log पेज** | B1Admin (ManageChurch → Audit Log) | मॉड्यूल/category/यूज़र/entity से फ़िल्टर करें और old→new diffs रेंडर करें — edits के लिए entity की पिछली entry के विरुद्ध diff करके, deletes के लिए `details.before` से। `GET /membership/auditlogs` से backed, `Permissions.server.admin` से gated। |
| **Batches पेज** | B1Admin (वही Settings hub) | Status और counts के साथ बैच सूची, **View Results** (बैच की audit rows `GET /membership/batches/:id/results` के माध्यम से), और एक **Undo** बटन जो skipped-conflict / failed report सामने लाता है। |
| **Import batches** | B1Transfer | एक बैच खोलें, उसके सामान्य save calls पर `X-Batch-Id` भेजें, अंत में पूरा करें — imports बिना किसी नए import endpoint के undoable बन जाते हैं। Legacy `importKey` एक creates-only lineage मार्कर के रूप में बना रहता है, undo के लिए superseded। |

## Gotchas जिन्हें भविष्य के बदलाव को regress नहीं करना चाहिए

- **Audit inserts awaited रहने चाहिए।** Un-awaited `AuditLogHelper.log(...)` Lambda freeze से गिरा दिया जाता है। Promises इकट्ठा करें और लौटने से पहले `await Promise.allSettled` करें।
- **Kysely `.set()`/`.values()` से `undefined` को गिरा देता है।** Restore पर, एक cleared कॉलम untouched रह जाएगा। `BatchUndoHelper` हर absent फ़ील्ड को explicit `null` में बदलता है (`nullify`) — इसे "तेज़" direct write के लिए कभी bypass न करें।
- **Retention undo विंडो से काफ़ी ऊपर रहनी चाहिए।** `AuditLogRepo.deleteOld()` nightly टाइमर पर चलता है (डिफ़ॉल्ट 365-दिन retention); undo विंडो 30 दिन है। यदि retention कभी विंडो की ओर गिरती है, तो undo ledgers खुली batches के नीचे से purge हो जाते हैं।
- **Truncated rows undoable नहीं हैं।** एक `{ truncated: true }` payload के पास कोई before/after image नहीं है; undo इसे `failed` के रूप में रिपोर्ट करता है, कभी अनुमान नहीं लगाता।
- **क्रम module-write-then-audit है।** Audit insert को कभी भी असली write से आगे न ले जाएँ, और इसे बैच में strict / सामान्य में advisory रखें।

## File inventory

| क्षेत्र | फ़ाइलें |
|------|-------|
| Wrapper / registry | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, snapshot + write-rows) |
| Undo engine | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Audit helper | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Controllers | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Models / repos | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Migration | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| Admin UI (प्रगति में) | B1Admin Audit Log + Batches पेज; B1Transfer import-batch header |

## संबंधित पृष्ठ

- [Module Structure](../api/module-structure) — कैसे एक non-membership कंट्रोलर `RepoManager` के माध्यम से membership repos तक पहुँचता है
- [Giving](./giving) — donation write paths जो anonymous होने पर भी `sensitive` के रूप में audit किए जाते हैं
- [Membership Endpoints](../api/endpoints/membership) — वह REST सतह जो `X-Batch-Id` carry करती है और `/auditlogs` और `/batches` expose करती है
