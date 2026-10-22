---
title: "सूचनाएं और रिमाइंडर आर्किटेक्चर"
---

# सूचनाएं और रिमाइंडर आर्किटेक्चर {#notifications--reminders-architecture}

<div class="article-intro">

हर संदेश जो कोई चर्च सदस्य अपने सामने के पेज के बाहर देखता है — बैज काउंट, पुश सूचना, या डाइजेस्ट ईमेल — MessagingApi के दो दरवाज़ों में से किसी एक से होकर गुज़रता है। यह पेज उस फ़नल, उसे शेड्यूल पर भरने वाले रिमाइंडर इंजन, और उस प्राथमिकता मॉडल का दस्तावेज़ है जो तय करता है कि किसी व्यक्ति तक वास्तव में क्या पहुंचेगा।

</div>

## अवलोकन — दो द्वार {#overview--two-doors}

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **ऐसी कोई भी चीज़ जो किसी व्यक्ति को कुछ बताती है** messaging मॉड्यूल में `NotificationHelper.createNotifications()` से होकर जाती है। यह एक `notifications` पंक्ति सहेजता है और socket → push → email की ओर बढ़ाता है, और हर चैनल के लिए `PreferenceGateHelper` का मूल्यांकन करता है — जिसमें स्तर 0 पर `in_app` भी शामिल है।
2. **कोई भी शेड्यूल की गई चीज़** एक `reminderDefinition` है (entity-स्तर या scope-स्तर), जिसे `reminderOccurrences` में विस्तारित किया जाता है और एक आवर्ती टाइमर पर `ReminderEngine.scan()` द्वारा भेजा जाता है। एक विस्तारक, एक डिस्पैचर, एक भेजने का लेजर (`reminderSentLog`)।
3. **सीधा ईमेल** केवल `TransactionalEmailHelper.sendTransactional()` के पीछे मौजूद है। एक ESLint नियम इसे कंपाइल समय पर लागू करता है — नीचे देखें।

:::tip ईमेल द्वार लिंट द्वारा लागू होता है, केवल परंपरा नहीं
`Api/tools/eslint-rules/email-door.cjs` में `no-direct-email-helper` नियम परिभाषित है: `NotificationHelper.ts` या `TransactionalEmailHelper.ts` के बाहर कहीं भी `EmailHelper.sendTemplatedEmail()` या `EmailHelper.sendEmail()` की कोई भी कॉल lint में विफल होती है। यदि आपको ईमेल भेजना है, तो उसे फ़नल से (`emailImmediate` के साथ `createNotifications`) या `TransactionalEmailHelper.sendTransactional()` से रूट करें — CI पास करने वाला कोई तीसरा तरीका नहीं है।
:::

## सूचना फ़नल {#the-notification-funnel}

`NotificationHelper.createNotifications()` हर उस चीज़ के लिए एकमात्र प्रवेश बिंदु है जो शेड्यूल या ट्रांसैक्शनल नहीं है:

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

हर प्राप्तकर्ता के लिए यह `notifications` में एक पंक्ति सहेजता है और `attemptDeliveryWithEscalation` को कॉल करता है, जो नीचे दी गई चैनल सीढ़ी पर चलता है। उसी `(contentType, contentId)` के लिए एक अब भी अपठित पंक्ति दोबारा बनने से रोकती है — यह डुप्लिकेट-रोकथाम गार्ड `emailImmediate` भेजने (रिमाइंडर ऑफ़सेट, स्टाफ़ का "email all", वर्कफ़्लो स्टेप्स अपना खुद का डुप्लिकेट-नियंत्रण रखते हैं) और सीधे संदेशों के लिए छोड़ दिया जाता है, जो हमेशा socket पर पिंग करते हैं।

`shared/helpers/NotificationService.ts` messaging मॉड्यूल के बाहर के कॉलर्स के लिए वही सिग्नेचर (`NotificationServiceOptions`) दर्शाता है और बूट के समय messaging मॉड्यूल के साथ रजिस्टर होता है।

## चैनल एस्केलेशन चेन {#channel-escalation-chain}

डिलीवरी एक स्तर से शुरू होती है (डिफ़ॉल्ट रूप से 0, या रिमाइंडर/स्पष्ट भेजने के लिए उच्च), और अगले चैनल पर तभी जाती है जब पिछला सफल न हो। हर स्तर पर कुछ भी प्रयास करने से पहले `PreferenceGateHelper` गेट लगाता है।

| स्तर | चैनल | व्यवहार |
|-------|---------|----------|
| 0 | **in_app / socket** | पहले `in_app` गेट जांचा जाता है। यदि दबा दिया गया (म्यूट), तो पंक्ति `isNew=false` के साथ सहेजी जाती है और डिलीवरी पूरी तरह रुक जाती है — कोई socket पिंग नहीं, कोई बैज नहीं, आगे कोई एस्केलेशन नहीं। अन्यथा सर्वर व्यक्ति के `alerts` रूम के लिए खुले socket कनेक्शन खोजता है और एक `notification` (या `privateMessage`) फ़्रेम भेजता है। सामान्य सूचनाओं के लिए, सफल socket डिलीवरी इसी बिंदु पर चेन रोक देती है — 30 मिनट का टाइमर अपठित आइटम फिर जांचता है और बाद में उन्हें एस्केलेट करता है। सीधे संदेश socket पर कभी नहीं रुकते: इंस्टॉल किया गया PWA बैकग्राउंड में alerts socket खुला रख सकता है, और यह OS-स्तर के push को दबा देगा। |
| 1 | **push** | `allowPush` / श्रेणी से opt-out / quiet hours पर गेटेड। व्यक्ति के `devices` पंक्तियों में मिले Expo push tokens और Web Push subscriptions दोनों पर भेजता है, endpoint के आधार पर डुप्लिकेट हटाता है और रास्ते में पुराने टोकन हटाता है। |
| 2 | **email** | `emailFrequency` और श्रेणी से opt-out पर गेटेड। तुरंत भेजे जाने वाले (`emailImmediate`) ईमेल तुरंत रेंडर होते हैं और एक `deliveryLogs` पंक्ति लिखते हैं; अन्यथा सूचना नीचे वर्णित बैच डाइजेस्ट के लिए लंबित छोड़ दी जाती है। |
| — | **sms** | एस्केलेशन सीढ़ी का कोई स्तर नहीं है। एकमात्र गेटेड SMS उत्पादक रिमाइंडर इंजन है: जब किसी परिभाषा के `channels` में `sms` हो, तो `ReminderEngine.sendSms()` push/email सूचना के **अतिरिक्त** हर प्राप्तकर्ता को टेक्स्ट भेजता है (देखें [Text reminders](#text-reminders))। बल्क टेक्स्टिंग (`TextingController` / `@churchapps/texting`), सेवा अवलोकन का **Text Volunteers** भेजना (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`), और वर्कफ़्लो **Send Text** स्टेप एक्शन (`StepActionHelper.sendText` → `sendPersonText`) सभी सीधे चर्च के प्रदाता के माध्यम से टेक्स्ट करते हैं, इसलिए सूचना प्राथमिकताएं और quiet hours उन पर लागू नहीं होते — केवल व्यक्ति का `optedOut` फ़्लैग माना जाता है। |

socket या push पर छोड़ी गई अपठित सूचनाएं 30-मिनट के टाइमर (`NotificationHelper.escalateDelivery`) द्वारा एस्केलेट की जाती हैं। बैच ईमेल `NotificationHelper.sendEmailNotifications(frequency)` द्वारा भेजा जाता है, जो हर व्यक्ति की `emailFrequency` प्राथमिकता से चलता है: `individual` 30-मिनट के टाइमर पर चलता है, `daily` रात्रि टाइमर पर। (`weekly` एक मान्य प्राथमिकता मान है, लेकिन अभी इसके लिए कोई समर्पित बैच रन नहीं है।)

## रिमाइंडर इंजन {#reminder-engine}

निर्धारित रिमाइंडर — इवेंट रिमाइंडर, टास्क की नियत तिथियां, सेवा/प्लान असाइनमेंट रिमाइंडर — सभी एक सामान्यीकृत इंजन से गुज़रते हैं, न कि हर फ़ीचर के लिए अलग-अलग cron लॉजिक से।

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**परिभाषाएं** (`reminderDefinitions`) या तो entity-स्तर की होती हैं (`entityId` सेट — एक विशिष्ट इवेंट, टास्क या प्लान) या scope-स्तर की (`entityId` null, `scopeId` सेट — जैसे किसी सेवा प्लान प्रकार के अंतर्गत हर प्लान)। एक परिभाषा में मिनट ऑफ़सेट की CSV (`offsets`, जैसे एक दिन और एक घंटा पहले के लिए `"1440,60"`), स्थानीय भेजने का समय (`sendLocalTime`), चैनलों की CSV (`channels` — जिसमें `email` भेजने के समय तुरंत रिच ईमेल ट्रिगर करता है), एक `recipientMode`, और एक वैकल्पिक कस्टम `message` होता है।

**विस्तार** (expansion) आने वाले क्षितिज (एक रोलिंग कई-दिन की विंडो) के लिए fire पंक्तियां बनाता है। यह रात्रि टाइमर पर चलता है, और जब भी कोई परिभाषा सहेजी जाती है तब तुरंत — ताकि आखिरी समय के इवेंट का रिमाइंडर भी फायर हो। Scope परिभाषाएं एडैप्टर के `loadScopeEntities` के माध्यम से फैलती हैं, और हर ठोस entity के लिए एक occurrence सेट बनाती हैं; entity-स्तर की occurrences `definitionId:occurrenceISO:offset` कुंजी का उपयोग करती हैं, जबकि scoped occurrences entity id से नेमस्पेस होती हैं ताकि वे कभी टकराएं नहीं। किसी occurrence को upsert करने पर पहले रद्द की गई पंक्ति **पुनर्जीवित** हो जाती है — अंतर्निहित entity बदलने के बाद रिमाइंडर को फिर से सिंक करने का मानक तरीका cancel-then-re-expand है; जिन पंक्तियों की स्थिति `sent`, `failed`, या `processing` है, उन्हें नहीं छुआ जाता।

**डिस्पैच** (`ReminderEngine.scan()`) 30-मिनट के टाइमर पर चलता है। यह देय occurrences को claim करता है (एक lease दोहरी प्रोसेसिंग रोकता है), entity के एडैप्टर के माध्यम से प्राप्तकर्ता लोड करता है, उन सभी को छानता है जो उस occurrence के लिए `reminderSentLog` में पहले से दर्ज हैं, और `createNotifications` को `deliveryStartLevel: 1` (सीधे push पर जाएं) के साथ कॉल करता है, साथ ही परिभाषा के चैनलों में email होने पर `emailImmediate`/`emailByPerson` भी।

### टेक्स्ट रिमाइंडर {#text-reminders}

जब किसी परिभाषा के `channels` में `sms` हो, तो push/email सूचनाएं बन जाने के बाद `scan()` उन्हीं नए प्राप्तकर्ताओं के लिए `ReminderEngine.sendSms()` को कॉल करता है। टेक्स्टिंग हर सदस्य के लिए वैकल्पिक (opt-in) है:

- हर प्राप्तकर्ता `PreferenceGateHelper.evaluate(..., "sms", ...)` से गुज़रता है, इसलिए `allowSms` चालू होना चाहिए (यह डिफ़ॉल्ट रूप से बंद होता है और B1App के **Text messages** स्विच से सेट होता है), और श्रेणी का `sms` चैनल बंद करके ओवरराइड नहीं किया गया होना चाहिए। `event_reminders`, `serving_schedule`, और `tasks` अपने `defaultChannels` और `allowedChannels` दोनों में `sms` सूचीबद्ध करते हैं।
- जिन लोगों के पास `mobilePhone` नहीं है या जिनका `optedOut` सेट है, उन्हें दबा दिया जाता है। यदि चर्च के पास कोई टेक्स्टिंग प्रदाता नहीं है, तो बाकी बैच कारण `no_provider` के साथ दबा दिया जाता है।
- संदेश `ReminderEngine.smsBody()` द्वारा बनता है: `"<Church name>: <message> Reply STOP to opt out."`, जिसे एक 160-अक्षर के सेगमेंट तक छोटा किया जाता है।
- हर प्राप्तकर्ता को `channel: "sms"` और स्थिति `sent` / `suppressed` / `failed` वाली अपनी `reminderSentLog` पंक्ति मिलती है, जो push/email पंक्ति से अलग कुंजीबद्ध होती है, ताकि विफल टेक्स्ट कभी push या email को दोबारा न भेजे।

एडिटर्स **Text** विकल्प तभी दिखाते हैं जब `GET /messaging/texting/status` `{ enabled: true }` लौटाता है (चर्च का पहला टेक्स्टिंग प्रदाता सक्रिय है)।

**STOP opt-out।** `POST /messaging/texting/inbound/:churchId/:token` एक गुमनाम webhook है जिसे चर्च अपने प्रदाता में चिपकाता है (B1Admin टेक्स्टिंग सेटिंग्स में `GET /messaging/texting/inboundUrl` से URL दिखाता है)। टोकन चर्च id का HMAC है (`SmsOptOutHelper.token`)। `SmsOptOutHelper.parse` Twilio-शैली के फ़ॉर्म फ़ील्ड और Clearstream/TextInChurch-शैली के JSON दोनों स्वीकार करता है; यदि उत्तर बिल्कुल कैरियर स्टॉप शब्द है (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), तो चर्च में हर गैर-हटाए गए व्यक्ति जिसका मोबाइल नंबर मेल खाता है, उसे `people.optedOut = true` और `allowSms = false` मिलता है। अन्य उत्तर स्वीकार किए जाते हैं और अनदेखे रहते हैं।

एक आंतरिक इवेंट बस entity बदलावों पर रात्रि विस्तार का इंतज़ार किए बिना प्रतिक्रिया देती है: कॉन्टेंट इवेंट्स (webhook dispatcher के माध्यम से) और प्लान/टास्क अपडेट इवेंट्स प्रभावित entity के लिए तुरंत पुनः-विस्तार या रद्दीकरण ट्रिगर करते हैं, और प्लान अपडेट उसके प्लान प्रकार से जुड़ी किसी भी scope परिभाषा को भी फिर से विस्तारित करता है।

### एडैप्टर {#adapters}

इंजन entity-अज्ञेयवादी है; समर्थित हर entity प्रकार एक एडैप्टर (`helpers/adapters/`) के माध्यम से जुड़ता है:

| Entity प्रकार | एडैप्टर | नोट्स |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | इवेंट और `recipientMode` के आधार पर प्राप्तकर्ता रजिस्ट्रेंट या समूह सदस्यों तक सीमित। |
| `plan` | `PlanReminderAdapter` | प्राप्तकर्ता Accepted + Unconfirmed प्लान असाइनमेंट हैं। `buildEmails` `DoingModuleGateway.buildPlanReminderEmails` को कॉल करता है, जो `doing/helpers/PlanReminderEmailHelper` के माध्यम से पद, नोट्स, और कस्टम संदेश रेंडर करता है, जिसमें `ReminderTokenHelper` द्वारा साइन किए गए Accept/Decline बटन शामिल हैं, जो एक सार्वजनिक असाइनमेंट-उत्तर एंडपॉइंट पर POST करते हैं। |
| `task` | `TaskReminderAdapter` | प्राप्तकर्ता टास्क के असाइनी हैं। |

### एंडपॉइंट्स {#endpoints}

| Method | Path | उद्देश्य |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | एक entity के लिए रिमाइंडर परिभाषा लोड या सहेजें। |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | scope-स्तर की (विरासत में मिली) रिमाइंडर परिभाषा लोड या सहेजें। |
| `DELETE` | `/messaging/reminders/:defId` | परिभाषा हटाएं और उसकी लंबित occurrences रद्द करें। |
| `GET` | `/messaging/reminders/event/:eventId/preview` | सहेजने से पहले इवेंट रिमाइंडर के लिए प्राप्तकर्ता संख्या और अगले फायर होने के समय का पूर्वावलोकन। |
| `GET` | `/messaging/reminders/log` | किसी चर्च के लिए हाल की रिमाइंडर occurrence इतिहास। |
| `POST` | `/messaging/reminders/mute` | किसी विशिष्ट entity के लिए रिमाइंडर म्यूट करें। |

परिभाषा सहेजने पर उस entity या scope के लिए सिंक्रोनस पुनः-विस्तार ट्रिगर होता है, ताकि एडिटर्स रात्रि जॉब का इंतज़ार किए बिना अद्यतन "अगले फायर" देख सकें।

## सीधे संदेश {#direct-messages}

सीधे संदेश एक अलग एस्केलेशन पाथ के बजाय बाकी सब की तरह उसी फ़नल से चलते हैं। हर अपठित बातचीत को `notifications` में एक **shadow row** मिलती है (`contentType='privateMessage'`, `contentId` = निजी संदेश id, `category='direct_messages'`), जो सभी डिलीवरी स्थिति — socket/push/email एस्केलेशन, read tracking, सब कुछ — संभालती है। `privateMessages` टेबल स्वयं संदेश पेलोड और `notifyPersonId` कॉलम रखती है, जो अपठित बैज का स्रोत है और प्राप्तकर्ता द्वारा बातचीत पढ़ने पर साफ़ हो जाता है।

Shadow rows सूचना घंटी से अदृश्य हैं: वे अपठित गिनती क्वेरी, सूचना सूची क्वेरी, और mark-read/delete क्वेरी से बाहर रखी जाती हैं, जो सभी `contentType <> 'privateMessage'` फ़िल्टर करती हैं। हर DM पिंग अपठित स्थिति की परवाह किए बिना socket तक पहुंचता है (लाइव चैट व्यवहार — कोई डुप्लिकेट-रोकथाम नहीं), और DM कभी socket डिलीवरी पर नहीं रुकते जैसे सामान्य सूचनाएं रुकती हैं, क्योंकि बैकग्राउंड में चल रहा PWA socket खुला रखते हुए भी OS-स्तर के push की ज़रूरत रख सकता है। यदि कोई व्यक्ति DM सूचनाएं म्यूट करता है, तो shadow row रोक दी जाती है (`isNew=false`, `notifyPersonId` साफ़), जिसका अर्थ है कि वह बातचीत के भीतर अब भी दिखती है, बस बैज या अलर्ट के बिना।

## प्राथमिकताएं और गेटिंग {#preferences--gating}

हर भेजना `PreferenceGateHelper.evaluate()` से गुज़रता है, जो एक शुद्ध फ़ंक्शन है (सारी स्थिति बाहर से दी जाती है, हॉट पाथ पर कोई DB कॉल नहीं), और `allow`, `suppress`, या `defer` लौटाता है। परतें क्रम से चलती हैं, और जो पहली परत निर्णय ले, वही जीतती है:

1. **Locked category** — कुछ श्रेणियां अनिवार्य (tier 0) हैं और बाकी हर परत को बायपास करती हैं।
2. **Master mute / channel kill** — `masterMute`, `allowPush`, `allowSms` (डिफ़ॉल्ट रूप से बंद — सदस्य opt in करते हैं), या `emailFrequency='never'` सीधे दबा देते हैं।
3. **Quiet hours** — केवल push और SMS पर (ईमेल को गैर-आक्रामक माना जाता है)। यदि व्यक्ति के समय क्षेत्र में वर्तमान दीवार-घड़ी का समय उसकी quiet विंडो में है, तो ट्रांसैक्शनल श्रेणी फिर भी पहुंचती है; गैर-ट्रांसैक्शनल को quiet विंडो के अंत तक टाल दिया जाता है, जिसकी गणना `TimezoneHelper.wallClockToUtc` के माध्यम से DST-सही UTC क्षण के रूप में होती है।
4. **Per-category preference override** — एक श्रेणी × चैनल जोड़ी के लिए स्पष्ट opt-out; अनुपस्थिति का अर्थ है श्रेणी का डिफ़ॉल्ट।
5. **Per-entity mute** — किसी विशिष्ट entity (जैसे एक इवेंट, एक प्लान) पर दर्ज म्यूट श्रेणी-स्तर की सेटिंग से अधिक प्रतिबंध लगाता है, लेकिन तभी लागू होता है जब कॉलर सूचना के साथ entity id/type भी दे।

शामिल टेबल: `notificationPreferences` (वैश्विक — `masterMute`, `emailFrequency` जिसका मान `individual|daily|weekly|never` हो सकता है, `allowPush`, quiet-hours विंडो और समय क्षेत्र, `allowSms`), `notificationPreferenceOverrides` (प्रति श्रेणी × चैनल), और `notificationEntityMutes` (प्रति entity)।

यह गेट in-app (स्तर 0), push (स्तर 1), और email (स्तर 2) के लिए फ़नल के भीतर लागू होता है — तुरंत भेजे जाने वाले रिमाइंडर/डाइजेस्ट ईमेल सहित — और रिमाइंडर टेक्स्ट के लिए `ReminderEngine.sendSms()` में। ट्रांसैक्शनल ईमेल (ऑथ कोड, पासवर्ड रीसेट, आमंत्रण, दान रसीदें) डिज़ाइन से इसे बायपास करते हैं; यही दूसरे द्वार का पूरा उद्देश्य है।

## चर्च-लिखित ईमेल सीमाएं {#church-authored-email-limits}

जो ईमेल कंटेंट चर्च ने लिखा है, वह साझा ChurchApps SES पहचान से जाता है, इसलिए उसे `Api/src/shared/helpers/ChurchEmailLimiter.ts` द्वारा प्रति चर्च मीटर किया जाता है। तीन पाथ इसे कॉल करते हैं: ग्रुप/टेम्पलेट भेजना (`EmailTemplateController`, कंटेंट प्रकार `email`), फ़ॉर्म फ़ॉलो-अप ईमेल (`FormSubmissionController`, `formFollowUp`), और वर्कफ़्लो **Send email** एक्शन (`NotificationHelper` के साथ `churchAuthored`, `workflowEmail`)। सिस्टम मेल (ऑथ कोड, रसीदें, रिमाइंडर) और भूमिका व ग्रुप आमंत्रण (`UserController.sendInviteEmail`, एक निश्चित टेम्पलेट) मीटर नहीं किए जाते।

- **स्वीकृति गेट।** जब तक सर्वर एडमिन `churches.emailApprovedDate` सेट नहीं करता, चर्च कुछ नहीं भेजता (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → **Group Email** चिप)। आर्काइव किए गए चर्च हमेशा ब्लॉक रहते हैं। B1Admin का Send Email डायलॉग `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) पढ़ता है और अस्वीकृत होने पर एडिटर की जगह **Request review** कार्ड दिखाता है। `POST /messaging/emailTemplates/requestApproval` सहायता टीम को ईमेल करता है, प्रति चर्च प्रति सप्ताह अधिकतम एक बार।
- **अर्जित भत्ता।** स्वीकृत चर्च को `max(150, 2 × पिछले 30 दिनों में उसका सर्वोत्तम चर्च-लिखित दिन)` मिलता है, जो रोलिंग 24 घंटों में अधिकतम 2,000 पर सीमित है। वर्तमान 24 घंटे "सर्वोत्तम दिन" की गणना से बाहर रखे जाते हैं, ताकि एक बाढ़ अपनी ही सीमा न बढ़ा सके।
- **Reserve, फिर settle।** `reserve()` भेजने से पहले प्रति प्राप्तकर्ता एक `deliveryLogs` पंक्ति लिखता है, उन पंक्तियों की गिनती के साथ भत्ते की फिर से जांच करता है, और यदि दो अनुरोध सीमा पार करने की दौड़ में आ गए हों तो वापस लौट जाता है (भेजना 429 लौटाता है)। `settle()` हर पंक्ति को sent या failed चिह्नित करता है।
- **शिकायत विराम।** `sesFeedback` Lambda (`Api/src/lambda/ses-feedback-handler.ts`, SES → SNS से फ़ीड होता है) हर स्थायी बाउंस या शिकायत को उस चर्च से जोड़ता है जिसका चर्च-लिखित ईमेल उस समय के आसपास उस पते तक पहुंचा था, और उसे `deliveryMethod` `sesBounce` / `sesComplaint` के रूप में संग्रहीत करता है। 7 दिनों में 2+ शिकायतें (भेजे गए का ≥ 0.3%) या 10+ हार्ड बाउंस (≥ 5%) होने पर चर्च विराम में डाल दिया जाता है।

## शेड्यूलिंग {#scheduling}

रिमाइंडर इंजन और सूचना डाइजेस्ट दोनों मौजूदा शेड्यूल्ड टाइमरों पर चलते हैं, किसी नए इन्फ्रास्ट्रक्चर की ज़रूरत के बिना:

| टाइमर | शेड्यूल | क्या चलता है |
|-------|---------|-------------|
| 30-मिनट का टाइमर | हर 30 मिनट | अपठित सूचनाएं एस्केलेट करें; `individual` आवृत्ति के डाइजेस्ट ईमेल भेजें; देय रिमाइंडर occurrences डिस्पैच करें (`ReminderEngine.scan`); स्वीकृति डाइजेस्ट; देय ऑटोमेशन एक्ज़ीक्यूशन |
| रात्रि टाइमर | 05:00 UTC | ग्रुप उपस्थिति रिमाइंडर; आवर्ती स्ट्रीमिंग सेवाएं आगे बढ़ाएं; ऑटो-रिफ़्रेश सूचियां ताज़ा करें; अगले क्षितिज के लिए रिमाइंडर occurrences विस्तारित करें (`ReminderEngine.expandAll`); `daily` आवृत्ति के डाइजेस्ट ईमेल भेजें |

स्थानीय रूप से, वही तर्क `Api` प्रोजेक्ट से `npm run timer:30min` और `npm run timer:midnight` के साथ मांग पर चलाया जा सकता है।

## फ़ाइल सूची {#file-inventory}

| क्षेत्र | फ़ाइलें |
|------|-------|
| फ़नल | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| साझा प्रवेश बिंदु | `Api/src/shared/helpers/NotificationService.ts` |
| ट्रांसैक्शनल द्वार | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, लिंट नियम `Api/tools/eslint-rules/email-door.cjs` |
| चर्च ईमेल सीमाएं | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| रिमाइंडर इंजन | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| टेक्स्टिंग / STOP opt-out | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (सेवा अवलोकन **Text Volunteers**) |
| रिमाइंडर रिपॉज़िटरी | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| सेवा/प्लान ईमेल | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| रिमाइंडर एडिटर (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| रिमाइंडर एडिटर / प्राथमिकताएं (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## संबंधित पेज {#related-pages}

- [Real-time Architecture](../realtime) — WebSocket प्रोटोकॉल और क्लाइंट प्रिमिटिव (`SocketHelper`, `SubscriptionManager`, `ConversationStore`), जिन पर in-app डिलीवरी स्तर चलता है
- [Web Push Notifications](../web-push) — VAPID सेटअप और ब्राउज़र Push API पाथ, जिसे push एस्केलेशन स्तर उपयोग करता है
- [Messaging Endpoints](../api/endpoints/messaging) — संदेशों, बातचीत, कनेक्शन, और सूचना/रिमाइंडर रूट्स के लिए पूरी REST सतह
