---
title: "ऑडिट लॉग और पूर्ववत योग्य बैच"
---

# ऑडिट लॉग और पूर्ववत योग्य बैच

<div class="article-intro">

Api में हर उपयोगकर्ता-शुरू किए गए परिवर्तन को दर्ज किया जाता है — कौन, क्या, कब, और कहां से — सभी मॉड्यूल में, किसी प्रति-नियंत्रक वायरिंग के बिना। उस लेजर के ऊपर एक बैच लेयर बैठता है: एक आयात या थोक क्रिया को बैच के रूप में टैग किया जा सकता है और बाद में **पूर्ववत** पंक्ति दर पंक्ति, Planning-Center-शैली में किया जा सकता है। दोनों सदस्यता डेटाबेस में एक एकल `auditLogs` तालिका में रहते हैं और पूरी तरह से एक चोक बिंदु, `BaseController.actionWrapper` से संचालित होते हैं। यह पृष्ठ मैप करता है कि क्या ऑडिट किया जाता है, डेटा कहां रहता है, प्रदर्शन ट्रेड-ऑफ जो इसे आकार देते हैं, और पूर्ववत कैसे एक बैच को सुरक्षित रूप से पूर्ववत करता है बिना क्रॉस-डेटाबेस लेनदेन के।

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

दो संरचनात्मक तथ्य नीचे की हर चीज को चलाते हैं:

1. **नियंत्रक परत एकमात्र ऐसी जगह है जो अभिनेता को जानती है।** रिपोजिटरी कभी भी `AuthenticatedUser` नहीं देखते हैं; केवल नियंत्रक `au` धारण करते हैं। हर मॉड्यूल के नियंत्रक पहले से ही `BaseController.actionWrapper` के माध्यम से पारित होते हैं, इसलिए वह वह जगह है जहां ऑडिटिंग हुक करता है — कहीं भी रिपो सिग्नेचर नहीं बदलते हैं।
2. **एक तालिका सभी मॉड्यूल की सेवा करती है।** देने, उपस्थिति, सामग्री आदि के लिए ऑडिट पंक्तियाँ सभी सदस्यता DB के `auditLogs` में `RepoManager.getRepos("membership")` के माध्यम से लिखी जाती हैं, यहां तक कि एक गैर-सदस्यता नियंत्रक से भी। "जेन आज जो कुछ भी बदल गया" एक एकल प्रश्न रहता है।

## क्या ऑडिट किया जाता है

ऑडिटिंग **प्रत्येक मार्ग पर हर परिवर्तनशील क्रिया के लिए डिफ़ॉल्ट-ऑन है**। `actionWrapper` शून्य प्रति-मार्ग कॉन्फ़िगरेशन के साथ अनुरोध से ऑडिट फ़ील्ड प्राप्त करता है:

| फील्ड | इससे प्राप्त |
|-------|--------------|
| `module` | `this.moduleName` (स्वामित्व मॉड्यूल) |
| `entityType` | `req.baseUrl` का singularized अंतिम खंड (जैसे `/membership/people` → `person`) |
| `category` | डिफ़ॉल्ट से `entityType` |
| `action` | `POST /` के लिए `${entityType}_saved`, `DELETE /:id` के लिए `${entityType}_deleted`, अन्यथा `${entityType}_${method}:${routePath}` ताकि गैर-CRUD सब-मार्ग (जैसे `task_post:/:id/move`) स्वचालित रूप से कैप्चर किए जाएं |

`BaseController.AUDIT_REGISTRY` **केवल अधिक्रमण और ऑप्ट-आउट के लिए है** — यह एक allowlist नहीं है। एक मार्ग अपनी श्रेणी/entityType का नाम बदलने के लिए वहां दिखाई देता है, `{ dbModule, table }` घोषित करने के लिए (जो इसे बैच- और पूर्ववत-सक्षम बनाता है), इसे `sensitive` के रूप में चिह्नित करने के लिए (ऑडिट अनाम परिवर्तन), या इसे `optOut: true` के साथ बंद करने के लिए।

**ऑप्ट-आउट सूची** (firehose लेखन पथ जो लेजर को डूब जाएंगे): उपस्थिति `visits` / `visitsessions` / `sessions` / `checkin` (रविवार चेक-इन तूफान) और मैसेजिंग `messages` / `connections` / `devices` (चैट और उपस्थिति)। बाकी सब कुछ लॉग करता है।

**बल्क एंडपॉइंट्स** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) `BULK_ROUTES` में पंजीकृत हैं और **प्रति टच id के लिए एक ऑडिट पंक्ति** उत्सर्जित करते हैं, इसलिए 10k-व्यक्ति आयात 10k पंक्तियां बनाता है — वह प्रति-इकाई granularity बिल्कुल वही है जो बैच को undoable बनाता है।

**अनाम परिवर्तन** (`actionWrapperAnon` — अतिथि देना, अतिथि पंजीकरण, फॉर्म सबमिशन) केवल रजिस्ट्री-फ्लैग किए गए `sensitive` मार्गों के लिए ऑडिट किए जाते हैं, `userId="anonymous"` साथ ही क्लाइंट IP लिखा जाता है। दान सूची की ओर ले जाता है; उस पथ में एक वास्तविक प्रतिगमन इतिहास है।

### गुप्त संपादन और आकार सीमा

किसी भी `details` पेलोड को संग्रहीत करने से पहले, `AuditLogHelper.capDetails()` इसके ऊपर `sanitizeValue()` चलाता है:

- **गुप्त कुंजियों को संपादित किया जाता है।** कोई भी क्षेत्र जिसका लोअरकेस नाम `SENSITIVE_KEYS` (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, ...) में है, को `"[redacted]"` से प्रतिस्थापित किया जाता है।
- **विशाल स्केलर को हटाया जाता है।** कोई भी `data:` URI या 4 KB से अधिक स्ट्रिंग (base64 फोटो, blobs) `"[stripped]"` हो जाता है।
- **ओवरसाइज़्ड पंक्तियों को सीमित किया जाता है।** यदि क्रमबद्ध JSON ~64 KB से अधिक है तो पूरे पेलोड को `{ truncated: true }` से प्रतिस्थापित किया जाता है। Truncated पंक्तियां अभी भी दिखाई देती हैं — लेकिन **पूर्ववत योग्य नहीं** (पुनः स्थापित करने के लिए कोई पहले/बाद की छवि नहीं है)।

## डेटा कहां रहता है

सदस्यता डेटाबेस में एक एकल `auditLogs` तालिका हर मॉड्यूल का समर्थन करती है। कॉलम: `id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT JSON string), ipAddress, module, batchId, created`। माइग्रेशन `tools/migrations/membership/2026-07-04_audit_universal.ts` `module` + `batchId` जोड़ता है, `details` को `TEXT` से `MEDIUMTEXT` तक चौड़ा करता है, इंडेक्स `ix_auditLogs_batch (batchId)` और `ix_auditLogs_entity (churchId, module, entityType, entityId, created)` जोड़ता है, और `batches` तालिका बनाता है। `module` कॉलम ठीक इसलिए मौजूद है कि मॉड्यूल में entityType टकराव (`note`, `setting` कई में मौजूद हैं) filterable रहें, और इकाई सूचकांक वह है जो प्रति-इकाई इतिहास और पूर्ववत विरोध गार्ड दोनों को शक्ति देता है।

क्रॉस-मॉड्यूल लिखता है wrapper के अंदर से `RepoManager.getRepos("membership")` के माध्यम से जाते हैं। क्रमीकरण जानबूझकर है: **मुख्य लिखता है मॉड्यूल DB में पहले, ऑडिट सम्मिलन दूसरे में। ** सामान्य मोड में एक ऑडिट-सम्मिलन विफलता निगल ली जाती है (`console.error`, Sentry इसे उठाता है) — ऑडिट सलाहकारी है और कभी भी उपयोगकर्ता के अनुरोध को विफल नहीं करना चाहिए। **बैच मोड में यह कठोर है** (नीचे देखें)।

:::info ट्रिगर, CDC, या प्रति-मॉड्यूल तालिकाएं क्यों नहीं?
- **MySQL ट्रिगर** अभिनेता को नहीं जानते हैं (कनेक्शन के पास कोई `au` नहीं है), और हर स्कीमा में ट्रिगर सेट बनाए रखने का मतलब होगा।
- **binlog / CDC** एक पूरी बुनियादी ढांचा परियोजना है जिसमें एक ही अभिनेता-पहचान समस्या है।
- **हर रिपो के माध्यम से `userId` threading** सूचना को स्थानांतरित करने के लिए सैकड़ों फाइलों को छूने का मतलब होगा जो नियंत्रक परत पहले से ही रखती है।
- **प्रति-मॉड्यूल ऑडिट तालिका** का मतलब होगा किसी भी क्रॉस-मॉड्यूल प्रश्न के लिए 7× प्लंबिंग और फैन-आउट क्वेरी। नियंत्रक चोक बिंदु पर एक तालिका सबसे कम-कोड डिज़ाइन है जो अभी भी अभिनेता को कैप्चर करता है।
:::

## प्रदर्शन स्थिति

हॉट पाथ जानबूझकर सस्ता है; लागत केवल वहां भुगतान की जाती है जहां यह कुछ खरीदता है।

- **सामान्य अपडेट पर कोई पढ़ें-पहले-लिखना नहीं।** एक नियमित सहेजता है **नहीं** पुरानी रिकॉर्ड लोड करता है। **जमा की गई after-values** को `details.after` में संग्रहीत किया जाता है; UI पुरानी→नई को *view* समय पर इकाई की पिछली ऑडिट पंक्ति के विरुद्ध फर्क करके पुनर्निर्माण करता है। view समय पर एक क्वेरी, लिखने के समय शून्य लागत। कभी भी छुई गई क्षेत्रें खुलून्च के बाद से बस कोई "पुरानी" मान नहीं दिखाती हैं — स्वीकार्य।
- **Deletes को एक before-image मिलता है।** `DELETE /:id` एक रजिस्ट्री मार्ग पर `{ dbModule, table }` के साथ पहले पंक्ति को जेनेरिकली लोड करता है और इसे `details.before` में संग्रहीत करता है। Deletes दुर्लभ हैं और before-image संपूर्ण फोरेंसिक मान है।
- **बैच मोड एकमात्र व्यवस्थित read-before-write है**, और यह ऑप्ट-इन है — एक बल्क/आयात ऑपरेशन पहले से ही महंगा है, इसलिए N स्नैपशॉट पढ़ना पूर्ववत की कीमत है।
- **Audit inserts awaited हैं।** `actionWrapper` लॉग वचनों को एकत्र करता है और `await Promise.allSettled(...)` लौटने से पहले। यह एकल सबसे महत्वपूर्ण अपरिवर्तनीय है: Lambda पर कंटेनर **प्रतिक्रिया लौटते ही फ्रीज करता है**, इसलिए एक un-awaited सम्मिलन चुप से छोड़ दिया जाता है। "Fire and forget" यहां मतलब है *त्रुटियां कभी अनुरोध को विफल नहीं करती हैं*, *await न करें* नहीं — पहले से ही-वार्म सदस्यता पूल पर एक एकल सम्मिलन ~1–3 ms है।

## बैच और पूर्ववत

एक **बैच** परिवर्तनों का एक सेट समूहित करता है ताकि वे एक साथ समीक्षा और उल्टा किए जा सकें। इसे खोलने के दो तरीके हैं:

- **स्पष्ट:** `POST /membership/batches { label, source }` एक `batchId` लौटाता है। क्लाइंट (B1Transfer, B1Admin आयात UI) फिर हर बाद की सहेजने/हटाने पर `X-Batch-Id: <id>` भेजता है। `POST /membership/batches/:id/complete` इसे बंद करता है और `itemCount` को मुहर लगाता है।
- **निहित:** चार बल्क एंडपॉइंट एकल अनुरोध के अंदर अपना ही बैच खोलते हैं, भरते हैं, और पूरा करते हैं, प्रतिक्रिया में `batchId` लौटाते हैं।

`batches` तालिका (सदस्यता DB): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`।

### बैच मोड कठोर है

जब `X-Batch-Id` मौजूद है, `actionWrapper` हर गार्ड को कड़ा करता है (`writeBatchAuditRows`):

1. बैच को मौजूद होना चाहिए, `open` होना चाहिए, और `au.churchId` से संबंधित होना चाहिए — अन्यथा **403**।
2. मार्ग को बैच-सक्षम होना चाहिए (रजिस्ट्री में `{ dbModule, table }`) — अन्यथा **400**।
3. क्रिया चलने से पहले, सभी प्रभावित आईडी के लिए before-images को **एक** `WHERE id IN (...) AND churchId = ?` क्वेरी में लोड किया जाता है। यदि वह स्नैपशॉट पढ़ना विफल हो जाता है, तो अनुरोध **500 विफल होता है और क्रिया निष्पादित नहीं होती है** — बैच मोड को कभी भी silent रूप से एक un-undoable लेजर का उत्पादन नहीं करना चाहिए। (सामान्य मोड, इसके विपरीत, सर्वश्रेष्ठ-प्रयास है और स्नैपशॉट विफलताओं को निगल लेता है।)
4. क्रिया सफल होने के बाद, `batchId`, `details.before`, और `details.after` के साथ प्रति इकाई एक ऑडिट पंक्ति लिखी जाती है, साथ ही एक स्पष्ट **create marker** बैच की बनाई गई पंक्तियों के लिए।

### पूर्ववत

`POST /membership/batches/:id/undo` (अनुमति: बैच निर्माता या `Permissions.server.admin`)। यह अस्वीकार करता है यदि बैच `completed` नहीं है या **30-दिन पूर्ववत विंडो** से पुराना है। `BatchUndoHelper.undo()` फिर:

1. बैच की ऑडिट पंक्तियों को लोड करता है और **उन्हें `(module, entityType, entityId)` द्वारा समूहित करता है।** एक इकाई जिसे एक बैच के अंदर कई बार छुआ गया है को **एक बार उल्टा** किया जाता है, इसकी सच्ची प्री-बैच स्थिति में — सबसे पहली before-image, या एक delete यदि बैच ने इसे बनाया। यह वह जगह है जहां पूर्ववत नीरस रूप से प्रत्येक पंक्ति को दोहराता नहीं है: एक intermediate mid-batch स्नैपशॉट को पुनः स्थापित करना गलत होगा।
2. प्रत्येक इकाई के लिए, **संघर्ष गार्ड को पहले चलाता है**: `auditLog.hasLaterModification()` पूछता है कि क्या इस बैच के बाहर उसी `(module, entityType, entityId)` के लिए कोई *later* ऑडिट प्रविष्टि मौजूद है। यदि हां, तो इकाई को आयात के बाद संपादित किया गया था — यह **skipped और reported** है, कभी भी clobbered नहीं। यह संशोधन डिटेक्टर के रूप में ऑडिट लॉग को स्वयं का उपयोग करता है; किसी भी तालिका पर `modifiedAt` कॉलम की आवश्यकता नहीं है।
3. रजिस्ट्री से `{ dbModule, table }` को resolve करके और जेनेरिक Kysely लिखता का उपयोग करके, दर्ज किए गए op के अनुसार reverse करता है:
   - **created** → पंक्ति को हार्ड-डिलीट करें।
   - **updated** → `details.before` को वापस लिखें।
   - **deleted** → `details.before` को फिर से इंसर्ट करें (update-or-insert यदि एक पंक्ति उस id के साथ resurfaced)।
4. प्रत्येक reversal को स्वयं ऑडिट किया जाता है (`action: "<entityType>_undone"`, कोई `batchId` नहीं — undo-of-undo दायरे से बाहर है)।

op को explicitly **create marker** से चुना जाता है, एक लापता before-image से अनुमान नहीं लगाया जाता है — एक वैध रूप से खाली before-image या एक truncated पंक्ति को create के लिए गलत नहीं माना जाना चाहिए।

परिणाम पेलोड `{ restored, skippedConflicts: [...], failed: [...], status }` है; बैच `undone` (clean) या `partial` में जाता है। **कोई cross-DB लेनदेन नहीं है** — पूर्ववत प्रति पंक्ति सर्वश्रेष्ठ-प्रयास है, वही सीमा जो Planning Center merged प्रोफाइल के लिए दस्तावेज करता है।

:::warning side-effect इकाइयों को एक `onUndo` हुक की आवश्यकता है
एक `groupMember` बनाने को उल्टा करने के लिए `groupMemberHistory` ("left") को भी लिखना होगा, अन्यथा churn विश्लेषण चुप से टूट जाएंगे — एक खड़ी workspace अपरिवर्तनीय। इस तरह की इकाइयां `AUDIT_REGISTRY` में एक `onUndo` कॉलबैक रजिस्टर करती हैं जो `true` लौटाता है जब यह पूरी तरह से reversal को संभाल चुका है, जेनेरिक पाथ को bypass करते हुए। `groupMembers` canonical case है (explicit पाथ पर पंक्ति id द्वारा keyed लेकिन bulk endpoints पर `personId` द्वारा, और हर जोड़/हटाने पर इतिहास-ट्रैक किया गया)।
:::

## उपभोक्ता सतहें

दोनों admin सतहें **प्रगति में हैं**; इरादा:

| सतह | रेपो | उद्देश्य |
|---------|------|---------|
| **Audit Log पृष्ठ** | B1Admin (ManageChurch → Audit Log) | मॉड्यूल/श्रेणी/उपयोगकर्ता/इकाई द्वारा फ़िल्टर करें और old→new diffs प्रस्तुत करें — संपादन के लिए इकाई की पिछली प्रविष्टि के विरुद्ध diffing द्वारा, deletes के लिए `details.before` से। `GET /membership/auditlogs` से backed, `Permissions.server.admin` द्वारा gated। |
| **Batches पृष्ठ** | B1Admin (same Settings hub) | स्थिति और गणना के साथ बैच सूची, **परिणाम देखें** (बैच की ऑडिट पंक्तियां `GET /membership/batches/:id/results` के माध्यम से), और एक **पूर्ववत** बटन जो skipped-conflict / failed report को surface करता है। |
| **Import बैच** | B1Transfer | एक बैच खोलें, इसके सामान्य save calls पर `X-Batch-Id` भेजें, अंत में पूरा करें — आयात कोई नई आयात endpoints के बिना undoable बन जाते हैं। legacy `importKey` एक creates-only lineage marker के रूप से रहता है, pूर्ववत के लिए superseded। |

## Gotchas जो एक भविष्य परिवर्तन को regress नहीं करना चाहिए

- **Audit inserts awaited रहना चाहिए।** Un-awaited `AuditLogHelper.log(...)` Lambda फ्रीज द्वारा dropped है। वचनें एकत्र करें और लौटने से पहले `await Promise.allSettled` करें।
- **Kysely `.set()`/`.values()` से `undefined` को drops करता है।** Restore पर, एक cleared कॉलम untouched रहेगा। `BatchUndoHelper` प्रत्येक absent फील्ड को explicit `null` में कनवर्ट करता है (`nullify`) — कभी भी "faster" प्रत्यक्ष लिखता के लिए इसे bypass न करें।
- **Retention पूर्ववत विंडो के बहुत ऊपर रहना चाहिए।** `AuditLogRepo.deleteOld()` nightly टाइमर पर चलता है (default 365-दिन retention); पूर्ववत विंडो 30 दिन है। यदि retention कभी भी विंडो की ओर गिराता है, तो undo लेजर खुली batches के बाहर purge हो जाते हैं।
- **Truncated पंक्तियें undoable नहीं हैं।** एक `{ truncated: true }` पेलोड के पास कोई before/after छवि नहीं है; undo इसे `failed` के रूप में रिपोर्ट करता है, कभी भी अनुमान नहीं लगाता है।
- **क्रमीकरण module-write-then-audit है।** कभी भी audit सम्मिलन को real लिखने के आगे न ले जाएं, और इसे batch में strict / normal में advisory रखें।

## फाइल इन्वेंटरी

| क्षेत्र | फाइलें |
|------|-------|
| Wrapper / registry | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, snapshot + write-rows) |
| Undo engine | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Audit helper | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Controllers | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Models / repos | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Migration | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| Admin UI (in progress) | B1Admin Audit Log + Batches पृष्ठ; B1Transfer import-batch header |

## संबंधित पृष्ठ

- [Module Structure](../api/module-structure) — कैसे एक गैर-सदस्यता नियंत्रक `RepoManager` के माध्यम से सदस्यता repos तक पहुंचता है
- [Giving](./giving) — donation लेखन पथ जो anonymous भी होने पर `sensitive` के रूप में ऑडिट किए जाते हैं
- [Membership Endpoints](../api/endpoints/membership) — REST सतह जो `X-Batch-Id` को ले जाता है और `/auditlogs` और `/batches` expose करता है
