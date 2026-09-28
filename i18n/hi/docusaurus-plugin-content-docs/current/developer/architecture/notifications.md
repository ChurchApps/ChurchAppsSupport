---
title: "सूचनाएं और अनुस्मारक आर्किटेक्चर"
---

# सूचनाएं और अनुस्मारक आर्किटेक्चर

<div class="article-intro">

हर संदेश जो एक चर्च सदस्य को उस पृष्ठ के बाहर देखता है जो वह देख रहा है — एक बैज गणना, एक पुश सूचना, एक डाइजेस्ट ईमेल — MessagingApi में दो दरवाजों में से एक से गुजरता है। यह पृष्ठ फनल, अनुस्मारक इंजन जो इसे एक शेड्यूल पर फीड करता है, और वरीयता मॉडल को दस्तावेज़ करता है जो निर्णय लेता है कि वास्तव में एक व्यक्ति तक क्या पहुंचता है।

</div>

## अवलोकन — दो दरवाजे

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **कुछ भी जो किसी को कुछ बताता है** `NotificationHelper.createNotifications()` के माध्यम से मेसेजिंग मॉड्यूल में जाता है। यह एक `notifications` पंक्ति को बनाए रखता है और socket → push → email को बढ़ाता है, प्रत्येक चैनल के लिए `PreferenceGateHelper` का मूल्यांकन करता है — स्तर 0 पर `in_app` सहित।
2. **कुछ भी शेड्यूल किया गया** एक `reminderDefinition` है (इकाई-स्तर या दायरा-स्तर) `reminderOccurrences` में विस्तृत और `ReminderEngine.scan()` द्वारा एक आवर्ती टाइमर पर भेजा गया। एक एक्सपेंडर, एक डिस्पैचर, एक भेजना लेजर (`reminderSentLog`)।
3. **प्रत्यक्ष ईमेल** केवल `TransactionalEmailHelper.sendTransactional()` के पीछे मौजूद है। एक ESLint नियम इसे कंपाइल समय पर लागू करता है — नीचे देखें।

:::tip ईमेल दरवाजा lint-enforced है, केवल सम्मेलन नहीं
`Api/tools/eslint-rules/email-door.cjs` `no-direct-email-helper` को परिभाषित करता है: `NotificationHelper.ts` या `TransactionalEmailHelper.ts` के बाहर `EmailHelper.sendTemplatedEmail()` या `EmailHelper.sendEmail()` को कॉल करना CI विफल करता है। यदि आपको एक ईमेल भेजने की आवश्यकता है, तो इसे फनल के माध्यम से रूट करें (`createNotifications` के साथ `emailImmediate`) या `TransactionalEmailHelper.sendTransactional()` के माध्यम से — ऐसा कोई तीसरा तरीका नहीं है जो CI पास करे।
:::

## सूचना फनल

`NotificationHelper.createNotifications()` कुछ भी जो शेड्यूल या लेनदेन संबंधी नहीं है के लिए एकल प्रवेश बिंदु है:

```typescript
createNotifications(
  peopleIds: string[],
  churchId: string,
  contentType: string,
  contentId: string,
  message: string,
  link?: string,
  triggeredByPersonId?: string,
  options?: {
    deliveryStartLevel?: number;      // 0 socket (default), 1 push, 2 email-only
    category?: string;                // preference axis; derived from contentType if omitted
    emailByPerson?: Record<string, { subject: string; html: string }>;
    emailImmediate?: boolean;         // send email now instead of waiting for the digest
  }
)
```

प्रत्येक प्राप्तकर्ता के लिए यह `notifications` में एक पंक्ति सहेजता है और `attemptDeliveryWithEscalation` को कॉल करता है, जो नीचे चैनल सीढ़ी को चलता है। समान `(contentType, contentId)` के लिए अभी भी अपढ़ पंक्ति इसे फिर से बनाने के लिए दबाता है — यह dedup गार्ड `emailImmediate` भेजने (अनुस्मारक ऑफसेट, कर्मचारी "सभी को ईमेल करें", वर्कफ़्लो चरण अपना स्वयं का dedup स्वामित्व) और सीधे संदेशों के लिए छोड़ दिया जाता है, जो हमेशा socket को पिंग करते हैं।

`shared/helpers/NotificationService.ts` समान हस्ताक्षर को दर्शाता है (`NotificationServiceOptions`) मेसेजिंग मॉड्यूल के बाहर कॉलर्स के लिए और बूट पर मेसेजिंग मॉड्यूल के साथ पंजीकृत है।

## चैनल एस्केलेशन चेन

डिलीवरी एक स्तर पर शुरू होती है (डिफ़ॉल्ट रूप से 0, या अनुस्मारक/स्पष्ट भेजने के लिए उच्च) और केवल अगले चैनल पर आगे बढ़ता है यदि पिछला एक सफल नहीं हुआ। प्रत्येक स्तर `PreferenceGateHelper` द्वारा gated है कुछ भी प्रयास करने से पहले।

| स्तर | चैनल | व्यवहार |
|-------|---------|----------|
| 0 | **in_app / socket** | `in_app` गेट पहले जांचा जाता है। यदि दबाया गया (म्यूट), पंक्ति को `isNew=false` के साथ बनाए रखा जाता है और डिलीवरी पूरी तरह बंद हो जाती है — कोई socket पिंग नहीं, कोई बैज नहीं, कोई आगे एस्केलेशन नहीं। अन्यथा सर्वर व्यक्ति के `alerts` कमरे के लिए खुले socket कनेक्शन को लुकअप करता है और एक `notification` (या `privateMessage`) फ्रेम को पुश करता है। साधारण सूचनाओं के लिए, सफल socket डिलीवरी यहां चेन को बंद करता है — 30-मिनट का टाइमर अपठित आइटमों को फिर से जांचता है और बाद में उन्हें बढ़ाता है। सीधे संदेश कभी भी socket पर नहीं रुकते: एक स्थापित PWA अलर्ट को पृष्ठभूमि में रख सकता है, जो अन्यथा OS-स्तरीय पुश को दबा देगा। |
| 1 | **push** | `allowPush` / श्रेणी ऑप्ट-आउट / शांत घंटे पर gated। व्यक्ति की `devices` पंक्तियों पर पाए गए Expo push टोकन और Web Push सदस्यता दोनों को भेजता है, एंडपॉइंट द्वारा deduplicating और rancid टोकन को प्रूning के साथ।  |
| 2 | **email** | `emailFrequency` और श्रेणी ऑप्ट-आउट पर gated। तत्काल भेजना (`emailImmediate`) तुरंत प्रस्तुत करता है और एक `deliveryLogs` पंक्ति लिखता है; अन्यथा सूचना बैच डाइजेस्ट के लिए लंबित छोड़ी जाती है, नीचे वर्णित है। |
| — | **sms** | वरीयता nálstering (`allowSms`, प्रति-श्रेणी चैनल सूची) पहले से ही एक SMS चैनल के लिए खाते। लेकिन कोई निर्माता आज इसके माध्यम से नहीं भेजता है — यह थोक SMS उत्पाद के लिए आरक्षित रहता है, जो `TextingController` / `@churchapps/texting` के माध्यम से एक अलग, siloed प्रवाह के रूप में चलता है। |

Socket या push पर छोड़ी गई अपढ़ सूचनाओं को 30-मिनट के टाइमर द्वारा बढ़ाया जाता है (`NotificationHelper.escalateDelivery`)। बैच ईमेल को `NotificationHelper.sendEmailNotifications(frequency)` द्वारा भेजा जाता है, प्रत्येक व्यक्ति की `emailFrequency` वरीयता द्वारा संचालित: `individual` 30-मिनट के टाइमर पर चलता है, `daily` मध्यरात्रि टाइमर पर चलता है। (`weekly` एक वैध वरीयता मूल्य है लेकिन अभी तक समर्पित बैच रन नहीं है।)

## अनुस्मारक इंजन

शेड्यूल किए गए अनुस्मारक — इवेंट अनुस्मारक, कार्य देय तिथियां, सेवा/योजना असाइनमेंट अनुस्मारक — सभी एक सामान्यीकृत इंजन के माध्यम से जाते हैं बजाय bespoke प्रति-सुविधा cron तर्क।

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**परिभाषाएं** (`reminderDefinitions`) या तो इकाई-स्तर (`entityId` सेट — एक विशिष्ट इवेंट, कार्य, या योजना) या दायरा-स्तर (`entityId` null, `scopeId` सेट — उदा। एक सेवा योजना प्रकार के तहत हर योजना)। एक परिभाषा मिनट ऑफसेट का एक CSV ले जाता है (`offsets`, उदा। `"1440,60"` एक दिन और एक घंटा पहले), एक स्थानीय भेजने का समय (`sendLocalTime`), चैनल का एक CSV (`channels` — `email` सहित भेजने का समय पर एक तत्काल अमीर ईमेल को ट्रिगर करता है), एक `recipientMode`, और एक वैकल्पिक कस्टम `message`।

**विस्तार** आगे क्षितिज के लिए आग की पंक्तियों को realizes (एक रोलिंग बहु-दिन की खिड़की)। यह रात्रिकालीन टाइमर पर चलता है, और तुरंत जब भी एक परिभाषा सहेजी जाती है ताकि एक अंतिम-मिनट के इवेंट के लिए एक अनुस्मारक अभी भी आग। दायरा परिभाषाएं एडाप्टर के `loadScopeEntities` के माध्यम से पंखा करते हैं, एक ठोस इकाई प्रति एक घटना सेट का उत्पादन; इकाई-स्तरीय घटनाएं कुंजी `definitionId:occurrenceISO:offset` का उपयोग करती हैं, जबकि scoped घटनाएं इकाई आईडी द्वारा नामस्थान करते हैं ताकि वे कभी नहीं टकराएं। एक घटना को upserting **resurrects** एक पहले-रद्द की गई पंक्ति — रद्द-फिर-पुनः-विस्तार एक अनुस्मारक को पुनः-सिंक करने का मानक तरीका है अंतर्निहित इकाई परिवर्तन के बाद; पंक्तियां पहले से `sent`, `failed`, या `processing` छोड़ दी जाती हैं।

**डिस्पैच** (`ReminderEngine.scan()`) 30-मिनट के टाइमर पर चलता है। यह due occurrences को दावा करता है (एक लीज दोहरी-प्रसंस्करण को रोकता है), इकाई के एडाप्टर के माध्यम से प्राप्तकर्ताओं को लोड करता है, उस घटना के लिए `reminderSentLog` में पहले से दर्ज किसी को छोड़ता है, और `createNotifications` को कॉल करता है `deliveryStartLevel: 1` के साथ (पुश के लिए सीधे स्किप करें) साथ ही `emailImmediate`/`emailByPerson` जब परिभाषा के चैनलों में ईमेल शामिल है।

एक आंतरिक इवेंट बस इकाई उत्परिवर्तन पर प्रतिक्रिया करता है रात्रिकालीन विस्तार के लिए प्रतीक्षा किए बिना: सामग्री इवेंट (वेबहुक डिस्पैचर के माध्यम से) और योजना/कार्य अपडेट इवेंट तत्काल पुनः-विस्तार या प्रभावित इकाई के लिए रद्द करने को ट्रिगर करते हैं, और एक योजना अपडेट इसके योजना प्रकार से जुड़ी किसी भी दायरा परिभाषा को फिर से विस्तृत करता है।

### एडाप्टर

इंजन इकाई-agnostic है; प्रत्येक समर्थित इकाई प्रकार एक एडाप्टर (`helpers/adapters/`) के माध्यम से प्लग करता है:

| इकाई प्रकार | एडाप्टर | नोट्स |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | प्राप्तकर्ता इवेंट और `recipientMode` के आधार पर पंजीकारकों या समूह सदस्यों के लिए scoped। |
| `plan` | `PlanReminderAdapter` | प्राप्तकर्ता स्वीकृत + अपुष्टि योजना असाइनमेंट हैं। `buildEmails` `DoingModuleGateway.buildPlanReminderEmails` में कॉल करता है, जो `doing/helpers/PlanReminderEmailHelper` के माध्यम से स्थिति, नोट्स, और एक कस्टम संदेश प्रदान करता है, सहित Accept/Decline बटन `ReminderTokenHelper` द्वारा हस्ताक्षरित जो एक सार्वजनिक असाइनमेंट-प्रतिक्रिया एंडपॉइंट को पोस्ट करते हैं। |
| `task` | `TaskReminderAdapter` | प्राप्तकर्ता कार्य के assignee(s) हैं। |

### एंडपॉइंट्स

| विधि | पाथ | उद्देश्य |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | एक इकाई के लिए अनुस्मारक परिभाषा लोड या सहेजें। |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | एक दायरा-स्तरीय (विरासत) अनुस्मारक परिभाषा लोड या सहेजें। |
| `DELETE` | `/messaging/reminders/:defId` | एक परिभाषा हटाएं और इसके लंबित घटनाओं को रद्द करें। |
| `GET` | `/messaging/reminders/event/:eventId/preview` | सहेजने से पहले एक इवेंट अनुस्मारक के लिए प्राप्तकर्ता गणना और अगली आग समय का पूर्वावलोकन करें। |
| `GET` | `/messaging/reminders/log` | एक चर्च के लिए हाल के अनुस्मारक घटना इतिहास। |
| `POST` | `/messaging/reminders/mute` | एक विशिष्ट इकाई के लिए अनुस्मारक म्यूट करें। |

एक परिभाषा को सहेजना उस इकाई या दायरा के लिए एक तुरंत पुनः-विस्तार को ट्रिगर करता है, इसलिए संपादक मध्यरात्रि नौकरी के लिए प्रतीक्षा किए बिना अप-टू-डेट "अगली आग" देखते हैं।

## सीधे संदेश

सीधे संदेश एक अलग एस्केलेशन पाथ के बजाय समान फनल पर सवारी करते हैं। प्रत्येक अपठित कथोपकथन `notifications` में एक **छाया पंक्ति** पाता है (`contentType='privateMessage'`, `contentId` = निजी संदेश आईडी, `category='direct_messages'`) जो सभी डिलीवरी राज्य के मालिक है — socket/push/email एस्केलेशन, पढ़ने की ट्रैकिंग, सब कुछ। `privateMessages` तालिका ही संदेश पेलोड और एक `notifyPersonId` कॉलम रखती है, जो अपठित बैज का स्रोत है और जब प्राप्तकर्ता कथोपकथन को पढ़ता है तो साफ हो जाता है।

छाया पंक्तियां सूचना घंटी के लिए अदृश्य हैं: वे अपठित गणना क्वेरी, सूचना सूची क्वेरी, और चिह्न-पढ़ें/हटाएं क्वेरी से बाहर रखे गए हैं, सभी `contentType <> 'privateMessage'` को फ़िल्टर करते हैं। हर DM पिंग socket को अपठित राज्य की परवाह किए बिना हिट करता है (लाइव चैट शब्दार्थ — कोई dedup नहीं), और DMs कभी भी socket डिलीवरी पर नहीं रुकते जैसे साधारण सूचनाएं करती हैं, क्योंकि एक backgrounded PWA एक socket को खुला रख सकता है जबकि अभी भी एक OS-स्तरीय पुश की आवश्यकता है। यदि कोई DM सूचना को म्यूट करता है, तो छाया पंक्ति पार्क किया जाता है (`isNew=false`, `notifyPersonId` साफ) — अभी भी कथोपकथन के अंदर दृश्यमान, सिर्फ बैज या अलर्ट के बिना।

## वरीयताएं & gating

हर भेजना `PreferenceGateHelper.evaluate()` के माध्यम से जाता है, एक शुद्ध कार्य (सभी राज्य पास हुए, गर्म पाथ पर कोई DB कॉल नहीं) जो `allow`, `suppress`, या `defer` लौटाता है। परतें क्रम में चलती हैं, और पहला जो निर्णय लेता है जीतता है:

1. **लॉक किया गया श्रेणी** — कुछ श्रेणियां अनिवार्य (tier 0) हैं और हर दूसरी परत को बायपास करते हैं।
2. **मास्टर म्यूट / चैनल किल** — `masterMute`, `allowPush`, `allowSms`, या `emailFrequency='never'` बाहर निकालें।
3. **शांत घंटे** — केवल पुश और SMS (ईमेल को गैर-घुसपैठ माना जाता है)। यदि व्यक्ति के समय क्षेत्र में वर्तमान दीवार-घड़ी समय उनकी शांत खिड़की में गिरता है, तो एक लेनदेन संबंधी श्रेणी अभी भी मिलती है; एक गैर-लेनदेन संबंधी को शांत खिड़की के अंत तक स्थगित किया जाता है, `TimezoneHelper.wallClockToUtc` के माध्यम से एक DST-सही UTC तत्काल के रूप में गणना की गई।
4. **प्रति-श्रेणी वरीयता ओवरराइड** — एक श्रेणी × चैनल जोड़ी के लिए एक स्पष्ट ऑप्ट-आउट; अनुपस्थिति का मतलब है कि श्रेणी का डिफ़ॉल्ट।
5. **प्रति-इकाई म्यूट** — एक विशिष्ट इकाई के विरुद्ध दर्ज एक म्यूट (उदा। एक इवेंट, एक योजना) श्रेणी-स्तरीय सेटिंग से अधिक प्रतिबंधित करता है, लेकिन केवल लागू होता है जब कॉलर सूचना के साथ एक इकाई आईडी/प्रकार प्रदान करता है।

तालिकाएं शामिल: `notificationPreferences` (वैश्विक — `masterMute`, `individual|daily|weekly|never` का `emailFrequency`, `allowPush`, शांत-घंटे की खिड़की + समय क्षेत्र, `allowSms`), `notificationPreferenceOverrides` (प्रति श्रेणी × चैनल), और `notificationEntityMutes` (प्रति इकाई)।

यह गेट in-app (स्तर 0), पुश (स्तर 1), और ईमेल (स्तर 2) में लागू होता है फनल के अंदर — तत्काल अनुस्मारक/डाइजेस्ट ईमेल सहित। लेनदेन संबंधी ईमेल (auth कोड, पासवर्ड रीसेट, आमंत्रण, दान रसीद) इसे डिज़ाइन द्वारा बायपास करता है; वह दूसरे दरवाजे का पूरा बिंदु है।

## चर्च-लेखक ईमेल सीमाएं

ईमेल जिसकी सामग्री एक चर्च ने लिखी थी साझा ChurchApps SES पहचान से बाहर जाती है, इसलिए यह `Api/src/shared/helpers/ChurchEmailLimiter.ts` द्वारा प्रति चर्च मीटर किया जाता है। चार इसे कॉल करते हैं: समूह/टेम्पलेट भेजना (`EmailTemplateController`, सामग्री प्रकार `email`), फॉर्म फॉलो-अप ईमेल (`FormSubmissionController`, `formFollowUp`), वर्कफ़्लो **ईमेल भेजें** कार्य (`NotificationHelper` के साथ `churchAuthored`, `workflowEmail`), और B1 खाता आमंत्रण (`UserController.sendInviteEmail`, `invite`)। सिस्टम मेल (auth कोड, रसीद, अनुस्मारक) मीटर नहीं किया जाता है।

- **अनुमोदन गेट।** एक चर्च कुछ भी नहीं भेजता है जब तक एक सर्वर व्यवस्थापक `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → **Group Email** chip) सेट नहीं करता। आर्काइव किए गए चर्च हमेशा ब्लॉक होते हैं। B1Admin की Send Email डायलॉग `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) को पढ़ता है और जब अनुमोदित नहीं, एक **Request review** कार्ड दिखाता है संपादक के बजाय। `POST /messaging/emailTemplates/requestApproval` समर्थन ईमेल करता है, सर्वाधिक प्रति चर्च प्रति सप्ताह एक बार।
- **अर्जित भत्ता।** एक अनुमोदित चर्च को `max(150, 2 × its best church-authored day in the prior 30 days)`, 2,000 प्रति रोलिंग 24 घंटे तक सीमित मिलता है। वर्तमान 24 घंटे "सर्वश्रेष्ठ दिन" से बाहर रखे जाते हैं ताकि एक फटना अपनी स्वयं की सीमा न बढ़ा सके।
- **रिजर्व, फिर निपटारा करें।** `reserve()` भेजने से पहले प्रति प्राप्तकर्ता एक `deliveryLogs` पंक्ति लिखता है, भत्ते को फिर से जांचता है उन पंक्तियों के साथ गिना गया, और यदि दो अनुरोध सीमा के पिछले दौड़े तो वापस लिया जाता है (भेजना 429 लौटाता है)। `settle()` प्रत्येक पंक्ति को भेजा या विफल के रूप में चिह्नित करता है।
- **शिकायत विराम।** `sesFeedback` Lambda (`Api/src/lambda/ses-feedback-handler.ts`, SES → SNS द्वारा संचालित) प्रत्येक स्थायी बाउंस या शिकायत को चर्च को पिन करता है जिसका चर्च-लेखक ईमेल उस समय के आसपास उस पते तक पहुंचा, `deliveryMethod` `sesBounce` / `sesComplaint` के रूप में संग्रहीत। एक चर्च 7 दिनों में 2+ शिकायत (≥ 0.3% भेजना) या 10+ कठिन bounces (≥ 5%) पर विराम दिया जाता है।

## शेड्यूलिंग

अनुस्मारक इंजन और सूचना डाइजेस्ट दोनों नई अवसंरचना शुरू करने के बजाय मौजूदा शेड्यूल की गई टाइमर पर सवारी करते हैं:

| टाइमर | शेड्यूल | रन |
|-------|----------|------|
| 30-मिनट टाइमर | हर 30 मिनट | Escalate अपठित सूचनाएं; `individual`-आवृत्ति डाइजेस्ट ईमेल भेजें; due अनुस्मारक घटना भेजें (`ReminderEngine.scan`); अनुमोदन डाइजेस्ट; due स्वचालन निष्पादन |
| रात्रि टाइमर | 05:00 UTC | समूह उपस्थिति अनुस्मारक; आवर्ती स्ट्रीमिंग सेवाएं अग्रिम; ऑटो-रिफ्रेश सूचियां ताज़ा करें; अगले क्षितिज के लिए अनुस्मारक घटना विस्तृत करें (`ReminderEngine.expandAll`); `daily`-आवृत्ति डाइजेस्ट ईमेल भेजें |

स्थानीय रूप से, समान तर्क `Api` परियोजना से `npm run timer:30min` और `npm run timer:midnight` के साथ मांग पर ट्रिगर किया जा सकता है।

## फाइल सूची

| क्षेत्र | फाइलें |
|------|-------|
| फनल | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| साझा प्रवेश | `Api/src/shared/helpers/NotificationService.ts` |
| लेनदेन संबंधी दरवाजा | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, lint नियम `Api/tools/eslint-rules/email-door.cjs` |
| चर्च ईमेल सीमाएं | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| अनुस्मारक इंजन | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| अनुस्मारक भंडार | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| सेवा/योजना ईमेल | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| अनुस्मारक संपादक (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx` |
| अनुस्मारक संपादक / वरीयताएं (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## संबंधित पृष्ठ

- [रीयल-टाइम आर्किटेक्चर](../realtime) — WebSocket प्रोटोकॉल और क्लाइंट primitives (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) जो in-app डिलीवरी स्तर पर सवारी करते हैं
- [Web Push सूचनाएं](../web-push) — VAPID सेटअप और पुश एस्केलेशन स्तर द्वारा उपयोग किया गया ब्राउज़र Push API पाथ
- [मेसेजिंग एंडपॉइंट्स](../api/endpoints/messaging) — संदेश, कथोपकथन, कनेक्शन, और सूचना/अनुस्मारक मार्गों के लिए पूर्ण REST सतह
