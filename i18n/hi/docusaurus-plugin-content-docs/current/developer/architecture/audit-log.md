---
title: "ऑडिट लॉग और पूर्ववत करने योग्य बैच"
---

# ऑडिट लॉग और पूर्ववत करने योग्य बैच

<div class="article-intro">

Api में उपयोगकर्ता द्वारा शुरू किया गया हर बदलाव दर्ज किया जाता है: कौन, क्या, कब, और कहाँ से, सभी मॉड्यूल में, और किसी भी कंट्रोलर में अलग से वायरिंग किए बिना। इसके ऊपर एक बैच लेयर है। किसी इंपोर्ट या बल्क क्रिया को बैच के रूप में चिह्नित किया जा सकता है और बाद में उसे पंक्ति-दर-पंक्ति **पूर्ववत** किया जा सकता है, Planning Center शैली में। दोनों चीज़ें membership डेटाबेस की एक ही `auditLogs` तालिका में रहती हैं और पूरी तरह एक ही चोकपॉइंट, `BaseController.actionWrapper`, से संचालित होती हैं। यह पृष्ठ बताता है कि क्या ऑडिट होता है, डेटा कहाँ रहता है, किन प्रदर्शन समझौतों ने इसे आकार दिया है, और पूर्ववत करना बिना क्रॉस-डेटाबेस ट्रांज़ैक्शन के बैच को सुरक्षित रूप से कैसे पलटता है।

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

दो संरचनात्मक तथ्य नीचे की हर बात को संचालित करते हैं:

1. **नियंत्रक (controller) परत ही एकमात्र जगह है जो actor को जानती है।** Repositories कभी `AuthenticatedUser` नहीं देखते; केवल नियंत्रकों के पास `au` होता है। हर मॉड्यूल के नियंत्रक पहले से `BaseController.actionWrapper` से होकर गुज़रते हैं, इसलिए ऑडिटिंग वहीं जुड़ती है। कहीं भी repo signatures नहीं बदलते।
2. **एक तालिका सभी मॉड्यूल की सेवा करती है।** Giving, attendance, content आदि के ऑडिट रो membership DB की `auditLogs` में `RepoManager.getRepos("membership")` के माध्यम से लिखे जाते हैं, भले ही कंट्रोलर membership का न हो। "Jane ने आज जो कुछ बदला" एक ही क्वेरी में मिल जाता है।

## क्या ऑडिट होता है

ऑडिटिंग हर रूट पर हर mutating verb के लिए **डिफ़ॉल्ट रूप से चालू** है। `actionWrapper` बिना किसी प्रति-रूट कॉन्फ़िग के request से ऑडिट फ़ील्ड निकालता है:

| फ़ील्ड | किससे निकाला गया |
|-------|--------------|
| `module` | `this.moduleName` (स्वामी मॉड्यूल) |
| `entityType` | `req.baseUrl` के अंतिम खंड का एकवचन रूप (जैसे `/membership/people` → `person`) |
| `category` | डिफ़ॉल्ट रूप से `entityType` |
| `action` | `POST /` के लिए `${entityType}_saved`, `DELETE /:id` के लिए `${entityType}_deleted`, अन्यथा `${entityType}_${method}:${routePath}`, ताकि गैर-CRUD उप-रूट (जैसे `task_post:/:id/move`) अपने-आप कैप्चर हों |

`BaseController.AUDIT_REGISTRY` **केवल ओवरराइड और opt-out के लिए** है। यह allowlist नहीं है। किसी रूट को वहाँ इसलिए जोड़ा जाता है ताकि उसकी category/entityType का नाम बदला जा सके, `{ dbModule, table }` घोषित किया जा सके (जिससे वह बैच- और undo-योग्य बनता है), उसे `sensitive` चिह्नित किया जा सके (गुमनाम बदलावों का ऑडिट), या `optOut: true` से बंद किया जा सके।

**Opt-out सूची** (ऐसे भारी write पथ जो लेजर को भर देंगे): attendance की `visits` / `visitsessions` / `sessions` / `checkin` (रविवार का check-in तूफ़ान) और messaging की `messages` / `connections` / `devices` (चैट और presence)। बाकी सब कुछ लॉग होता है।

**बल्क एंडपॉइंट** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) `BULK_ROUTES` में पंजीकृत हैं और प्रभावित हर id के लिए **एक ऑडिट रो** उत्सर्जित करते हैं। इसलिए 10k लोगों के इंपोर्ट से 10k रो बनते हैं। यही प्रति-इकाई सूक्ष्मता बैच को पूर्ववत-योग्य बनाती है।

**गुमनाम बदलाव** (`actionWrapperAnon`: guest giving, guest registration, form submissions) केवल रजिस्ट्री में `sensitive` चिह्नित रूटों के लिए ऑडिट होते हैं, `userId="anonymous"` और क्लाइंट IP के साथ लिखे जाते हैं। Donations इस सूची में सबसे ऊपर हैं; उस पथ का एक वास्तविक regression इतिहास है।

### सीक्रेट रिडैक्शन और आकार सीमा

किसी भी `details` payload को संग्रहीत करने से पहले, `AuditLogHelper.capDetails()` उस पर `sanitizeValue()` चलाता है:

- **सीक्रेट keys रिडैक्ट किए जाते हैं।** जिस फ़ील्ड का lowercase नाम `SENSITIVE_KEYS` में है (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, …) उसे `"[redacted]"` से बदल दिया जाता है।
- **बड़े scalar हटाए जाते हैं।** कोई भी `data:` URI या 4 KB से बड़ी string (base64 फ़ोटो, blobs) `"[stripped]"` बन जाती है।
- **बड़े रो सीमित किए जाते हैं।** यदि serialized JSON ~64 KB से बड़ा हो, तो पूरा payload `{ truncated: true }` से बदल दिया जाता है। Truncated रो फिर भी देखे जा सकते हैं, लेकिन **पूर्ववत नहीं किए जा सकते** (पुनर्स्थापित करने के लिए कोई before/after image नहीं है)।

## डेटा कहाँ रहता है

एक `auditLogs` तालिका **membership** डेटाबेस में हर मॉड्यूल को सहारा देती है। Columns: `id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT JSON string), ipAddress, module, batchId, created`। Migration `tools/migrations/membership/2026-07-04_audit_universal.ts` `module` और `batchId` जोड़ता है, `details` को `TEXT` से `MEDIUMTEXT` तक चौड़ा करता है, indexes `ix_auditLogs_batch (batchId)` और `ix_auditLogs_entity (churchId, module, entityType, entityId, created)` जोड़ता है, और `batches` तालिका बनाता है। `module` column ठीक इसलिए है ताकि कई मॉड्यूल में मौजूद `entityType` के टकराव (`note`, `setting` कई जगह हैं) फ़िल्टर योग्य रहें। Entity index वही है जो प्रति-entity इतिहास और undo conflict guard, दोनों को चलाता है।

रैपर के भीतर से cross-module लेखन `RepoManager.getRepos("membership")` के माध्यम से होते हैं। क्रम जानबूझकर है: **मुख्य लेखन पहले module DB में commit होता है, ऑडिट insert दूसरे नंबर पर।** Normal mode में ऑडिट-insert की विफलता निगल ली जाती है (`console.error`, Sentry उसे उठा लेता है)। ऑडिट सलाहकार है और उपयोगकर्ता के request को कभी विफल नहीं करना चाहिए। **बैच mode में यह सख़्त है** (नीचे देखें)।

:::info ट्रिगर, CDC, या प्रति-मॉड्यूल तालिकाएँ क्यों नहीं?
- **MySQL triggers** को acting user का पता नहीं होता (connection के पास `au` नहीं है), और इसके लिए हर schema में trigger sets रखने पड़ते।
- **binlog / CDC** एक पूरा infrastructure प्रोजेक्ट है, उसी actor-पहचान की समस्या के साथ।
- **हर repo में `userId` पास करना** सैकड़ों फ़ाइलों को छूता, केवल वह जानकारी ले जाने के लिए जो नियंत्रक परत के पास पहले से है।
- **प्रति-मॉड्यूल ऑडिट तालिकाओं** का मतलब 7× plumbing और किसी भी cross-module प्रश्न के लिए fan-out queries होते। एक तालिका, controller चोकपॉइंट पर, सबसे कम कोड वाला डिज़ाइन है जो फिर भी actor को कैप्चर करता है।
:::

## प्रदर्शन नीति

Hot path जानबूझकर सस्ता रखा गया है। लागत केवल वहीं चुकाई जाती है जहाँ उससे कुछ मिलता है।

- **सामान्य अपडेट पर पढ़ने-से-पहले-लिखना नहीं।** सामान्य save पुराना रिकॉर्ड **लोड नहीं** करता। **सबमिट किए गए after-values** `details.after` में संग्रहीत होते हैं। UI पुराने→नए मान का पुनर्निर्माण *देखते समय* entity की पिछली ऑडिट रो से तुलना करके करता है। View के समय एक क्वेरी, लिखते समय शून्य लागत। जो फ़ील्ड लॉन्च के बाद कभी नहीं छुए गए, उनमें बस कोई "पुराना" मान नहीं दिखता, और यह स्वीकार्य है।
- **डिलीट को before-image मिलती है।** `{ dbModule, table }` वाले registry रूट पर `DELETE /:id` पहले पंक्ति को सामान्य रूप से लोड करता है और उसे `details.before` में रखता है। डिलीट दुर्लभ होते हैं, और before-image ही उनका पूरा फ़ोरेंसिक मूल्य है।
- **बैच mode ही एकमात्र व्यवस्थित read-before-write है**, और यह opt-in है। बल्क/इंपोर्ट ऑपरेशन पहले से महँगा है, इसलिए N snapshot reads ही undo की कीमत है।
- **Audit inserts को await किया जाता है।** `actionWrapper` log promises इकट्ठा करता है और लौटने से पहले `await Promise.allSettled(...)` करता है। यह सबसे महत्वपूर्ण invariant है: Lambda पर response लौटते ही container **फ़्रीज़ हो जाता है**, इसलिए बिना await का insert चुपचाप खो जाता है। यहाँ "fire and forget" का मतलब है *त्रुटियाँ request को कभी विफल नहीं करतीं*, *await न करना* नहीं। पहले से गर्म membership pool पर एक insert लगभग 1–3 ms लेता है।

## बैच और undo

एक **बैच** बदलावों के एक समूह को इकट्ठा करता है ताकि उन्हें एक साथ समीक्षा और उलटा जा सके। बैच खोलने के दो तरीके हैं:

- **स्पष्ट (Explicit):** `POST /membership/batches { label, source }` एक `batchId` लौटाता है। क्लाइंट (B1Transfer, B1Admin इंपोर्ट UI) फिर हर बाद के save/delete पर `X-Batch-Id: <id>` भेजता है। `POST /membership/batches/:id/complete` इसे बंद करता है और `itemCount` दर्ज करता है।
- **अंतर्निहित (Implicit):** चार बल्क एंडपॉइंट एक ही request के भीतर अपना बैच खोलते हैं, भरते हैं और पूरा करते हैं, और response में `batchId` लौटाते हैं।

`batches` तालिका (membership DB): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`।

### बैच mode सख़्त है

जब `X-Batch-Id` मौजूद होता है, तो `actionWrapper` हर guard को कसता है (`writeBatchAuditRows`):

1. बैच मौजूद होना चाहिए, `open` होना चाहिए, और `au.churchId` का होना चाहिए। अन्यथा **403**।
2. रूट batch-capable होना चाहिए (registry में `{ dbModule, table }`)। अन्यथा **400**।
3. Action चलने से पहले, सभी प्रभावित ids के before-images **एक** `WHERE id IN (...) AND churchId = ?` क्वेरी में लोड होते हैं। यदि वह snapshot read विफल होता है, तो request **500 से विफल होता है और action नहीं चलता**। बैच mode को कभी चुपचाप ऐसा लेजर नहीं बनाना चाहिए जिसे पूर्ववत न किया जा सके। (इसके विपरीत, normal mode सर्वोत्तम-प्रयास है और snapshot की विफलताएँ निगल लेता है।)
4. Action सफल होने के बाद, हर entity के लिए एक ऑडिट रो लिखी जाती है जिसमें `batchId`, `details.before`, और `details.after` होते हैं, साथ ही बैच द्वारा बनाई गई रो के लिए एक स्पष्ट **create marker**।

### Undo

`POST /membership/batches/:id/undo` (अनुमति: बैच का निर्माता या `Permissions.server.admin`)। यदि बैच `completed` नहीं है या **30-दिन की undo विंडो** से पुराना है, तो यह मना कर देता है। फिर `BatchUndoHelper.undo()`:

1. बैच की ऑडिट रो लोड करता है और उन्हें **`(module, entityType, entityId)` के अनुसार समूहित करता है।** एक बैच में कई बार छुई गई entity को **एक बार** उसकी सच्ची पूर्व-बैच स्थिति में उलटा जाता है: सबसे पहली before-image, या यदि बैच ने उसे बनाया था तो एक डिलीट। इसीलिए undo हर रो को सीधे दोहराता नहीं। बीच-बैच के किसी मध्यवर्ती snapshot को पुनर्स्थापित करना गलत होता।
2. हर entity के लिए पहले **conflict guard** चलाता है: `auditLog.hasLaterModification()` पूछता है कि क्या उसी `(module, entityType, entityId)` के लिए इस बैच के *बाहर* कोई *बाद की* ऑडिट प्रविष्टि मौजूद है। यदि हाँ, तो entity इंपोर्ट के बाद संपादित हुई थी। उसे **छोड़ दिया जाता है और रिपोर्ट किया जाता है**, कभी ओवरराइट नहीं किया जाता। यह ऑडिट लॉग को ही बदलाव-डिटेक्टर के रूप में उपयोग करता है। किसी भी तालिका पर `modifiedAt` columns की ज़रूरत नहीं।
3. दर्ज किए गए op के अनुसार उलटता है, registry से `{ dbModule, table }` हल करके और generic Kysely writes का उपयोग करके:
   - **created** → रो को hard-delete करें।
   - **updated** → `details.before` वापस लिखें।
   - **deleted** → `details.before` को फिर से insert करें (यदि उस id की कोई रो फिर से दिखे तो update-or-insert)।
4. हर उलटाव स्वयं भी ऑडिट होता है (`action: "<entityType>_undone"`, कोई `batchId` नहीं। undo-का-undo दायरे से बाहर है)।

Op स्पष्ट **create marker** से चुना जाता है, न कि गायब before-image से अनुमान लगाकर। एक वैध रूप से खाली before-image या truncated रो को create समझ लेना नहीं चाहिए।

Result payload है `{ restored, skippedConflicts: [...], failed: [...], status }`। बैच या तो `undone` (साफ़) या `partial` में चला जाता है। **कोई cross-DB ट्रांज़ैक्शन नहीं है।** Undo प्रति-रो सर्वोत्तम-प्रयास है, वही सीमा जो Planning Center merged profiles के लिए दस्तावेज़ करता है।

:::warning Side-effect entities को `onUndo` hook चाहिए
`groupMember` create को पूर्ववत करते समय `groupMemberHistory` ("left") भी लिखना ज़रूरी है, वरना churn analytics चुपचाप टूट जाते हैं। यह एक स्थायी workspace invariant है। ऐसी entities `AUDIT_REGISTRY` में एक `onUndo` callback पंजीकृत करती हैं जो `true` लौटाता है जब वह उलटाव को पूरी तरह संभाल चुका हो, जिससे सामान्य पथ बायपास हो जाता है। `groupMembers` इसका मानक उदाहरण है (explicit पथ पर row id से, पर बल्क एंडपॉइंट पर `personId` से कुंजीबद्ध, और हर add/remove पर इतिहास-ट्रैक किया जाता है)।
:::

## उपभोक्ता सतहें

दोनों एडमिन सतहें **प्रगति में** हैं। उद्देश्य यह है:

| सतह | Repo | उद्देश्य |
|---------|------|---------|
| **Audit Log पृष्ठ** | B1Admin (ManageChurch → Audit Log) | module/category/user/entity से फ़िल्टर करें और पुराने→नए अंतर दिखाएँ: संपादनों के लिए entity की पिछली प्रविष्टि से तुलना करके, हटाए गए के लिए `details.before` से। `GET /membership/auditlogs` द्वारा समर्थित, `Permissions.server.admin` द्वारा सीमित। |
| **Batches पृष्ठ** | B1Admin (उसी Settings hub में) | स्थिति और गिनती के साथ बैच सूचीबद्ध करें, **परिणाम देखें** (बैच की ऑडिट रो `GET /membership/batches/:id/results` के माध्यम से), और एक **Undo** बटन जो छोड़े गए conflict / विफल रिपोर्ट दिखाता है। |
| **इंपोर्ट बैच** | B1Transfer | एक बैच खोलें, उसकी सामान्य save कॉल्स पर `X-Batch-Id` भेजें, अंत में पूरा करें। नए इंपोर्ट एंडपॉइंट जोड़े बिना इंपोर्ट पूर्ववत-योग्य हो जाते हैं। पुराना `importKey` केवल creates-only वंश चिह्नक के रूप में बना रहता है, undo के लिए अब उसका स्थान ले लिया गया है। |

## नुकसान जिन्हें भविष्य का बदलाव न बिगाड़े

- **ऑडिट inserts awaited रहने चाहिए।** बिना await का `AuditLogHelper.log(...)` Lambda freeze से खो जाता है। Promises इकट्ठा करें और लौटने से पहले `await Promise.allSettled` करें।
- **Kysely `.set()`/`.values()` से `undefined` हटा देता है।** Restore पर साफ़ किया गया column अछूता रह जाएगा। `BatchUndoHelper` हर अनुपस्थित फ़ील्ड को स्पष्ट `null` (`nullify`) में बदलता है। "तेज़" सीधे लेखन के लिए इसे कभी बायपास न करें।
- **Retention undo विंडो से कहीं ऊपर रहना चाहिए।** `AuditLogRepo.deleteOld()` रात्रि टाइमर पर चलता है (डिफ़ॉल्ट 365-दिन retention)। Undo विंडो 30 दिन है। यदि retention कभी विंडो की ओर घटे, तो खुले बैचों के undo लेजर उनके नीचे से हटा दिए जाएँगे।
- **Truncated रो पूर्ववत नहीं हो सकतीं।** `{ truncated: true }` payload में कोई before/after image नहीं होती। Undo उसे `failed` रिपोर्ट करता है, कभी अनुमान नहीं लगाता।
- **क्रम module-write-then-audit है।** ऑडिट insert को असली लेखन से आगे कभी न ले जाएँ, और इसे बैच में सख़्त / सामान्य में सलाहकार रखें।

## फ़ाइल सूची

| क्षेत्र | फ़ाइलें |
|------|-------|
| Wrapper / registry | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, snapshot + लेखन-रो) |
| Undo engine | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Audit helper | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Controllers | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Models / repos | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Migration | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| Admin UI (प्रगति में) | B1Admin Audit Log + Batches पृष्ठ; B1Transfer इंपोर्ट-बैच हेडर |

## संबंधित पृष्ठ

- [मॉड्यूल संरचना](../api/module-structure): एक गैर-membership नियंत्रक `RepoManager` के माध्यम से membership repos तक कैसे पहुँचता है
- [Giving (दान)](./giving): donation लेखन पथ, जो गुमनाम होने पर भी `sensitive` के रूप में ऑडिट होते हैं
- [Membership एंडपॉइंट](../api/endpoints/membership): REST सतह जो `X-Batch-Id` ले जाती है और `/auditlogs` तथा `/batches` उजागर करती है
