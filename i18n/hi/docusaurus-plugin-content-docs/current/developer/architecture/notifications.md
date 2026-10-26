---
title: "सूचनाएँ और रिमाइंडर आर्किटेक्चर"
---

# सूचनाएँ और रिमाइंडर आर्किटेक्चर

<div class="article-intro">

हर वह संदेश जो कोई चर्च सदस्य उस पेज के बाहर देखता है जिस पर वह है -- जैसे बैज गिनती, पुश नोटिफ़िकेशन, या डाइजेस्ट ईमेल -- MessagingApi के दो द्वारों में से किसी एक से होकर गुजरता है। यह पेज उस फ़नल, उसे शेड्यूल पर भरने वाले रिमाइंडर इंजन, और उस प्रेफ़रेंस मॉडल का दस्तावेज़ है जो तय करता है कि किसी व्यक्ति तक वास्तव में क्या पहुँचेगा।

</div>

## अवलोकन -- दो द्वार

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **कोई भी ऐसी चीज़ जो किसी व्यक्ति को कुछ बताती है** messaging मॉड्यूल में `NotificationHelper.createNotifications()` से होकर जाती है। यह एक `notifications` पंक्ति सहेजती है और socket → push → email की ओर बढ़ाती है, और हर चैनल के लिए `PreferenceGateHelper` का मूल्यांकन करती है -- जिसमें स्तर 0 पर `in_app` भी शामिल है।
2. **कोई भी शेड्यूल की गई चीज़** एक `reminderDefinition` होती है (entity-स्तर या scope-स्तर) जिसे `reminderOccurrences` में विस्तारित किया जाता है और `ReminderEngine.scan()` द्वारा एक आवर्ती टाइमर पर भेजा जाता है। एक विस्तारक, एक डिस्पैचर, और एक भेजने का लेजर (`reminderSentLog`).
3. **सीधा ईमेल** केवल `TransactionalEmailHelper.sendTransactional()` के पीछे मौजूद है। एक ESLint नियम इसे कम्पाइल समय पर लागू करता है -- नीचे देखें।

:::tip ईमेल द्वार लिंट द्वारा लागू होता है, केवल परंपरा नहीं
`Api/tools/eslint-rules/email-door.cjs` में `no-direct-email-helper` नियम परिभाषित है: `NotificationHelper.ts` या `TransactionalEmailHelper.ts` के बाहर किसी भी `EmailHelper.sendTemplatedEmail()` या `EmailHelper.sendEmail()` कॉल पर लिंट विफल होता है। अगर आपको ईमेल भेजना है, तो उसे फ़नल से (`emailImmediate` के साथ `createNotifications`) या `TransactionalEmailHelper.sendTransactional()` से भेजें -- CI से पास होने वाला कोई तीसरा तरीका नहीं है।
:::

## सूचना फ़नल

`NotificationHelper.createNotifications()` उन सब चीज़ों के लिए एकल प्रवेश बिंदु है जो शेड्यूल की गई या ट्रांज़ैक्शनल नहीं हैं:

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

हर प्राप्तकर्ता के लिए यह `notifications` में एक पंक्ति सहेजता है और `attemptDeliveryWithEscalation` को बुलाता है, जो नीचे दिए चैनल क्रम पर चलता है। उसी `(contentType, contentId)` के लिए एक अभी भी बिना पढ़ी पंक्ति नई सूचना बनने से रोकती है -- यह डुप्लिकेट रोकने का नियम `emailImmediate` भेजने (रिमाइंडर ऑफ़सेट, स्टाफ़ का "सभी को ईमेल", वर्कफ़्लो चरण अपना डुप्लिकेट नियंत्रण स्वयं रखते हैं) और सीधे संदेशों के लिए छोड़ दिया जाता है, जो हमेशा socket को पिंग करते हैं।

`shared/helpers/NotificationService.ts` messaging मॉड्यूल के बाहर के callers के लिए वही सिग्नेचर (`NotificationServiceOptions`) दर्शाता है और बूट के समय messaging मॉड्यूल में पंजीकृत होता है।

## चैनल एस्केलेशन क्रम

डिलीवरी एक स्तर से शुरू होती है (डिफ़ॉल्ट रूप से 0, या रिमाइंडर/स्पष्ट भेजने के लिए उच्च स्तर से), और अगले चैनल पर तभी जाती है जब पिछला सफल न हो। हर स्तर पर कुछ भी प्रयास करने से पहले `PreferenceGateHelper` द्वारा गेट लगता है।

| स्तर | चैनल | व्यवहार |
|-------|---------|----------|
| 0 | **in_app / socket** | पहले `in_app` गेट जाँचा जाता है। अगर दबा हुआ है (म्यूट), तो पंक्ति `isNew=false` के साथ सहेजी जाती है और डिलीवरी पूरी तरह रुक जाती है -- कोई socket पिंग नहीं, कोई बैज नहीं, कोई और एस्केलेशन नहीं। अन्यथा सर्वर व्यक्ति के `alerts` रूम के खुले socket कनेक्शन खोजता है और `notification` (या `privateMessage`) फ़्रेम भेजता है। सामान्य सूचनाओं के लिए, socket डिलीवरी सफल होने पर श्रृंखला यहीं रुक जाती है -- 30 मिनट का टाइमर बची हुई अपठित चीज़ों को दोबारा जाँचकर बाद में एस्केलेट करता है। सीधे संदेश कभी socket पर नहीं रुकते: इंस्टॉल किया हुआ PWA पृष्ठभूमि में alerts socket खुला रख सकता है, जो अन्यथा OS-स्तर के push को दबा देगा। |
| 1 | **push** | `allowPush` / श्रेणी से opt-out / शांत घंटे पर निर्भर। व्यक्ति के `devices` पंक्तियों में मिले Expo push टोकन और Web Push सदस्यताएँ दोनों पर भेजता है, endpoint के आधार पर डुप्लिकेट हटाता है और रास्ते में पुराने टोकन हटाता है। |
| 2 | **email** | `emailFrequency` और श्रेणी से opt-out पर निर्भर। तत्काल भेजे गए (`emailImmediate`) ईमेल तुरंत रेंडर होते हैं और `deliveryLogs` पंक्ति लिखते हैं; अन्यथा सूचना नीचे वर्णित बैच डाइजेस्ट के लिए लंबित रहती है। |
| — | **sms** | एस्केलेशन क्रम में कोई स्तर नहीं। एकमात्र गेटेड SMS उत्पादक रिमाइंडर इंजन है: जब किसी परिभाषा के `channels` में `sms` हो, तो `ReminderEngine.sendSms()` हर प्राप्तकर्ता को push/email सूचना **के अलावा** टेक्स्ट भेजता है (देखें [टेक्स्ट रिमाइंडर](#text-reminders))। थोक टेक्स्टिंग (`TextingController` / `@churchapps/texting`), सर्विंग अवलोकन का **Text Volunteers** भेजना (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`), और वर्कफ़्लो का **Send Text** चरण क्रिया (`StepActionHelper.sendText` → `sendPersonText`) सभी सीधे चर्च के प्रदाता के माध्यम से टेक्स्ट करते हैं, इसलिए सूचना प्राथमिकताएँ और शांत घंटे इन पर लागू नहीं होते -- केवल व्यक्ति का `optedOut` फ़्लैग मान्य होता है। |

`socket` या `push` पर छोड़ी गई अपठित सूचनाओं को 30 मिनट का टाइमर (`NotificationHelper.escalateDelivery`) एस्केलेट करता है। बैच ईमेल `NotificationHelper.sendEmailNotifications(frequency)` द्वारा भेजा जाता है, जो हर व्यक्ति की `emailFrequency` प्राथमिकता से चलता है: `individual` 30 मिनट के टाइमर पर चलता है, `daily` रात के टाइमर पर चलता है। (`weekly` एक वैध प्राथमिकता मान है, लेकिन इसके लिए अभी कोई समर्पित बैच रन नहीं है।)

## रिमाइंडर इंजन

शेड्यूल किए गए रिमाइंडर -- इवेंट रिमाइंडर, कार्य की नियत तिथियाँ, सर्विंग/प्लान असाइनमेंट रिमाइंडर -- सभी एक सामान्यीकृत इंजन से होकर जाते हैं, न कि हर फ़ीचर के लिए अलग cron लॉजिक से।

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**परिभाषाएँ** (`reminderDefinitions`) या तो entity-स्तर की होती हैं (`entityId` सेट -- कोई विशिष्ट इवेंट, कार्य, या प्लान) या scope-स्तर की (`entityId` null, `scopeId` सेट -- जैसे किसी सर्विंग प्लान प्रकार के अंतर्गत हर प्लान)। एक परिभाषा में मिनटों के ऑफ़सेट की CSV (`offsets`, जैसे एक दिन और एक घंटा पहले के लिए `"1440,60"`), स्थानीय भेजने का समय (`sendLocalTime`), चैनलों की CSV (`channels` -- जिसमें `email` भेजने के समय तत्काल समृद्ध ईमेल ट्रिगर करता है), एक `recipientMode`, और एक वैकल्पिक कस्टम `message` होता है।

**विस्तार** आगे के horizon (एक रोलिंग कई-दिनों की विंडो) के लिए fire पंक्तियाँ साकार करता है। यह रात के टाइमर पर चलता है, और जब भी कोई परिभाषा सहेजी जाती है तब तुरंत चलता है, ताकि आख़िरी समय के इवेंट का रिमाइंडर भी फ़ायर हो। Scope परिभाषाएँ adapter के `loadScopeEntities` के माध्यम से फैलती हैं, और हर ठोस entity के लिए एक occurrence सेट बनाती हैं; entity-स्तर की occurrences `definitionId:occurrenceISO:offset` कुंजी का उपयोग करती हैं, जबकि scoped occurrences entity id से नेमस्पेस होती हैं ताकि वे कभी टकराएँ नहीं। किसी occurrence का upsert पहले रद्द की गई पंक्ति को **पुनर्जीवित** करता है -- अंतर्निहित entity बदलने के बाद रिमाइंडर को फिर से सिंक करने का मानक तरीका है cancel-then-re-expand; जो पंक्तियाँ पहले से `sent`, `failed`, या `processing` हैं, उन्हें छुआ नहीं जाता।

**डिस्पैच** (`ReminderEngine.scan()`) 30 मिनट के टाइमर पर चलता है। यह देय occurrences को claim करता है (एक lease दोहरी प्रोसेसिंग रोकता है), entity के adapter के माध्यम से प्राप्तकर्ता लोड करता है, उन लोगों को छाँटता है जो उस occurrence के लिए `reminderSentLog` में पहले से दर्ज हैं, और `createNotifications` को `deliveryStartLevel: 1` (सीधे push पर जाना) के साथ कॉल करता है, साथ में `emailImmediate`/`emailByPerson` जब परिभाषा के चैनलों में email हो।

### टेक्स्ट रिमाइंडर

जब किसी परिभाषा के `channels` में `sms` हो, तो push/email सूचनाएँ बनने के बाद `scan()` उन्हीं ताज़ा प्राप्तकर्ताओं के लिए `ReminderEngine.sendSms()` को कॉल करता है। टेक्सटिंग हर सदस्य के लिए opt-in है:

- हर प्राप्तकर्ता `PreferenceGateHelper.evaluate(..., "sms", ...)` से गुज़रता है, इसलिए `allowSms` चालू होना चाहिए (यह डिफ़ॉल्ट रूप से बंद होता है और B1App के **Text messages** स्विच से सेट होता है), और श्रेणी का `sms` चैनल बंद करके ओवरराइड नहीं किया गया होना चाहिए। `event_reminders`, `serving_schedule`, और `tasks` `defaultChannels` और `allowedChannels` दोनों में `sms` सूचीबद्ध करते हैं।
- जिन लोगों के पास `mobilePhone` नहीं है या जिनका `optedOut` सेट है, उन्हें दबा दिया जाता है। अगर चर्च के पास टेक्स्टिंग प्रदाता नहीं है, तो बाकी बैच कारण `no_provider` के साथ दबा दिया जाता है।
- संदेश `ReminderEngine.smsBody()` द्वारा बनता है: `"<Church name>: <message> Reply STOP to opt out."`, जिसे एक 160-अक्षर के सेगमेंट तक छोटा किया जाता है।
- हर प्राप्तकर्ता को `channel: "sms"` और स्थिति `sent` / `suppressed` / `failed` वाली अपनी `reminderSentLog` पंक्ति मिलती है, जो push/email पंक्ति से अलग कुंजीबद्ध है, ताकि विफल टेक्स्ट push या email को कभी दोबारा न भेजे।

एडिटर **Text** तभी दिखाते हैं जब `GET /messaging/texting/status` `{ enabled: true }` लौटाता है (चर्च का पहला टेक्स्टिंग प्रदाता सक्षम है)।

**STOP opt-out।** `POST /messaging/texting/inbound/:churchId/:token` एक अनाम webhook है जिसे चर्च अपने प्रदाता में चिपकाता है (B1Admin टेक्स्टिंग सेटिंग्स में `GET /messaging/texting/inboundUrl` से URL दिखाता है)। टोकन चर्च id का HMAC है (`SmsOptOutHelper.token`)। `SmsOptOutHelper.parse` Twilio-शैली के फ़ॉर्म फ़ील्ड और Clearstream/TextInChurch-शैली के JSON दोनों स्वीकार करता है; यदि उत्तर बिल्कुल कैरियर स्टॉप शब्द है (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), तो चर्च में हर ऐसा गैर-हटाया गया व्यक्ति जिसका मोबाइल नंबर मेल खाता है, उसे `people.optedOut = true` और `allowSms = false` मिलता है। अन्य उत्तरों को स्वीकृति दी जाती है और अनदेखा किया जाता है।

एक आंतरिक इवेंट बस entity में होने वाले बदलावों पर रात के विस्तार की प्रतीक्षा किए बिना प्रतिक्रिया देती है: कंटेंट इवेंट (webhook dispatcher के माध्यम से) और प्लान/कार्य अपडेट इवेंट प्रभावित entity के लिए तुरंत पुनः-विस्तार या रद्दीकरण ट्रिगर करते हैं, और प्लान अपडेट उसके प्लान प्रकार से जुड़ी किसी भी scope परिभाषा को भी पुनः विस्तारित करता है।

### Adapters

इंजन entity-अज्ञेयवादी है; समर्थित हर entity प्रकार `helpers/adapters/` में एक adapter के माध्यम से जुड़ता है:

| Entity प्रकार | Adapter | टिप्पणियाँ |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | प्राप्तकर्ता इवेंट और `recipientMode` के आधार पर पंजीकृत लोगों या समूह सदस्यों तक सीमित होते हैं। |
| `plan` | `PlanReminderAdapter` | प्राप्तकर्ता प्रकाशित (गैर-draft) प्लानों पर Accepted + Unconfirmed असाइनमेंट होते हैं। सर्विंग पुष्टि वर्कफ़्लो के माध्यम से जारी किए गए Unconfirmed असाइनमेंट तब तक बाहर रखे जाते हैं जब तक वे स्वीकार न हों (नीचे देखें)। `buildEmails` `DoingModuleGateway.buildPlanReminderEmails` को कॉल करता है, जो `doing/helpers/PlanReminderEmailHelper` के माध्यम से पद, नोट्स, और कस्टम संदेश रेंडर करता है, जिसमें `ReminderTokenHelper` द्वारा हस्ताक्षरित Accept/Decline बटन शामिल हैं जो एक सार्वजनिक असाइनमेंट-उत्तर endpoint पर पोस्ट करते हैं। |
| `task` | `TaskReminderAdapter` | प्राप्तकर्ता कार्य के असाइनी होते हैं। |

### Endpoints

| विधि | Path | उद्देश्य |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | एक entity के लिए रिमाइंडर परिभाषा लोड या सहेजें। |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | scope-स्तर (विरासत में मिली) रिमाइंडर परिभाषा लोड या सहेजें। |
| `DELETE` | `/messaging/reminders/:defId` | परिभाषा हटाएँ और उसकी लंबित occurrences रद्द करें। |
| `GET` | `/messaging/reminders/event/:eventId/preview` | सहेजने से पहले इवेंट रिमाइंडर के लिए प्राप्तकर्ता संख्या और अगले fire समय का पूर्वावलोकन। |
| `GET` | `/messaging/reminders/log` | किसी चर्च के लिए हाल की रिमाइंडर occurrence इतिहास। |
| `POST` | `/messaging/reminders/mute` | किसी विशिष्ट entity के लिए रिमाइंडर म्यूट करें। |

परिभाषा सहेजने से उस entity या scope के लिए सिंक्रोनस पुनः-विस्तार ट्रिगर होता है, ताकि एडिटर रात के जॉब की प्रतीक्षा किए बिना अद्यतन "अगला fire" देख सकें।

## सीधे संदेश

सीधे संदेश किसी अलग एस्केलेशन पथ के बजाय बाकी सब की तरह उसी फ़नल से चलते हैं। हर अपठित बातचीत को `notifications` में एक **shadow row** मिलती है (`contentType='privateMessage'`, `contentId` = निजी संदेश id, `category='direct_messages'`) जो सारी डिलीवरी स्थिति रखती है -- socket/push/email एस्केलेशन, पढ़ने का ट्रैकिंग, सब कुछ। `privateMessages` तालिका स्वयं संदेश का पेलोड और `notifyPersonId` कॉलम रखती है, जो अपठित बैज का स्रोत है और जब प्राप्तकर्ता बातचीत पढ़ता है तो साफ़ हो जाता है।

Shadow rows notifications bell से अदृश्य रहती हैं: वे अपठित गिनती क्वेरी, सूचना सूची क्वेरी, और mark-read/delete क्वेरी से बाहर रखी जाती हैं, जो सभी `contentType <> 'privateMessage'` से फ़िल्टर करती हैं। हर DM पिंग अपठित स्थिति की परवाह किए बिना socket को हिट करता है (लाइव चैट व्यवहार -- कोई डुप्लिकेट नियंत्रण नहीं), और DM कभी socket डिलीवरी पर नहीं रुकते जैसे सामान्य सूचनाएँ रुकती हैं, क्योंकि पृष्ठभूमि में PWA socket खुला रख सकता है और फिर भी OS-स्तर के push की आवश्यकता हो सकती है। अगर कोई व्यक्ति DM सूचनाएँ म्यूट करता है, तो shadow row रोक दी जाती है (`isNew=false`, `notifyPersonId` साफ़) -- फिर भी बातचीत के अंदर दिखती है, बस बैज या अलर्ट के बिना।

## प्राथमिकताएँ और गेटिंग

हर भेजना `PreferenceGateHelper.evaluate()` से गुज़रता है, जो एक शुद्ध फ़ंक्शन है (सारी स्थिति बाहर से दी जाती है, hot path पर कोई DB कॉल नहीं) और `allow`, `suppress`, या `defer` लौटाता है। परतें क्रम से चलती हैं, और जो पहली परत निर्णय लेती है वही जीतती है:

1. **Locked category** -- कुछ श्रेणियाँ अनिवार्य (tier 0) हैं और बाकी हर परत को बायपास करती हैं।
2. **Master mute / channel kill** -- `masterMute`, `allowPush`, `allowSms` (डिफ़ॉल्ट रूप से बंद -- सदस्य opt in करते हैं), या `emailFrequency='never'` सीधे दबा देते हैं।
3. **शांत घंटे** -- केवल push और SMS पर (ईमेल को गैर-व्यवधानकारी माना जाता है)। अगर व्यक्ति के समय क्षेत्र में दीवार-घड़ी का समय उनकी शांत विंडो में आता है, तो ट्रांज़ैक्शनल श्रेणी फिर भी पहुँचती है; गैर-ट्रांज़ैक्शनल श्रेणी शांत विंडो के अंत तक टाल दी जाती है, जिसे `TimezoneHelper.wallClockToUtc` के माध्यम से DST-सही UTC क्षण के रूप में गणना किया जाता है।
4. **प्रति-श्रेणी प्राथमिकता ओवरराइड** -- एक श्रेणी × चैनल जोड़ी के लिए स्पष्ट opt-out; अनुपस्थिति का अर्थ श्रेणी का डिफ़ॉल्ट है।
5. **प्रति-entity म्यूट** -- किसी विशिष्ट entity (जैसे एक इवेंट, एक प्लान) पर दर्ज म्यूट श्रेणी-स्तर की सेटिंग से अधिक प्रतिबंध लगाता है, लेकिन तभी लागू होता है जब कॉलर सूचना के साथ entity id/type भी दे।

शामिल तालिकाएँ: `notificationPreferences` (वैश्विक -- `masterMute`, `emailFrequency` जिसका मान `individual|daily|weekly|never` है, `allowPush`, शांत घंटों की विंडो + समय क्षेत्र, `allowSms`), `notificationPreferenceOverrides` (प्रति श्रेणी × चैनल), और `notificationEntityMutes` (प्रति entity)।

यह गेट फ़नल के भीतर in-app (स्तर 0), push (स्तर 1), और email (स्तर 2) के लिए लागू होता है -- जिसमें तत्काल रिमाइंडर/डाइजेस्ट ईमेल भी शामिल हैं -- और `ReminderEngine.sendSms()` में रिमाइंडर टेक्स्ट के लिए। ट्रांज़ैक्शनल ईमेल (ऑथ कोड, पासवर्ड रीसेट, आमंत्रण, दान रसीदें) डिज़ाइन के अनुसार इसे बायपास करते हैं; यही दूसरे द्वार का उद्देश्य है।

### सर्विंग पुष्टि वर्कफ़्लो

कोई प्लान `workflowType = "assignmentConfirmation"` वर्कफ़्लो (`plans.confirmationWorkflowId`) में शामिल हो सकता है। Publish/Notify फिर प्रति-असाइनमेंट सूचना के बजाय `POST /doing/plans/:id/issueRequests` को कॉल करता है: हर नए Unconfirmed असाइनमेंट को `notified` + `confirmationWorkflowId` मिलता है और एक वर्कफ़्लो कार्ड (`tasks.assignmentId`, अद्वितीय `followupKey`)। कार्ड एक केवल-ऐप अलर्ट भेजता है (`appOnly: true` -- कोई push/email एस्केलेशन नहीं), फिर वर्कफ़्लो की `sendAssignmentRequest` क्रियाएँ चलाता है, जो `MessagingModuleGateway.sendServingWorkflowMessage` से होकर जाती हैं: `NotificationHelper.sendWorkflowEmail` के माध्यम से ईमेल (प्राथमिकता गेट + `ChurchEmailLimiter`, `workflowEmail` के रूप में मीटर्ड), और `sendPersonText` के माध्यम से SMS केवल `allowSms` और `serving_schedule` श्रेणी गेट के साथ। Accept/Decline (इवेंट बस पर `assignment.updated`) कार्ड बंद करता है; 30 मिनट का टाइमर (`AssignmentWorkflowHelper.processPending`) छूटे हुए आरंभ और इवेंट ठीक करता है और अनुत्तरित अनुरोध को अनुवर्ती समय-सीमा पर एक लीडर समीक्षा कार्य में बदल देता है। पूरा जीवनचक्र: `Api/docs/assignment-confirmation-workflows.md`।

## चर्च द्वारा लिखे ईमेल की सीमाएँ

वह ईमेल जिसकी सामग्री किसी चर्च ने लिखी है, साझा ChurchApps SES पहचान से जाता है, इसलिए इसे `Api/src/shared/helpers/ChurchEmailLimiter.ts` द्वारा प्रति चर्च मीटर किया जाता है। चार पथ इसे कॉल करते हैं: समूह/टेम्पलेट भेजना (`EmailTemplateController`, सामग्री प्रकार `email`), फ़ॉर्म फ़ॉलो-अप ईमेल (`FormSubmissionController`, `formFollowUp`), वर्कफ़्लो **Send email** क्रियाएँ (`churchAuthored` के साथ `NotificationHelper`, `workflowEmail`), और सर्विंग पुष्टि अनुरोध ईमेल (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`)। सिस्टम मेल (ऑथ कोड, रसीदें, रिमाइंडर) और भूमिका और समूह आमंत्रण (`UserController.sendInviteEmail`, एक निश्चित टेम्पलेट) मीटर नहीं होते।

- **स्वीकृति गेट।** सर्वर एडमिन जब तक `churches.emailApprovedDate` सेट नहीं करता, तब तक चर्च कुछ नहीं भेजता (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → **Group Email** चिप)। संग्रहीत चर्च हमेशा अवरुद्ध रहते हैं। B1Admin का Send Email डायलॉग `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) पढ़ता है और, अगर अस्वीकृत है, तो एडिटर की जगह **Request review** कार्ड दिखाता है। वर्कफ़्लो चरण एडिटर उसी endpoint को पढ़ता है (`tasks.admin` के साथ-साथ `groupMembers.edit` के लिए भी खुला) ताकि अस्वीकृत या रोके गए चर्च के **Send email** क्रियाओं पर चेतावनी दे सके। भेजने के समय, `MessagingModuleGateway.sendTemplatedEmail` `false` लौटाता है और सूचना नहीं बनाता जब `ChurchEmailLimiter.remaining()` 1 से कम हो, ताकि कार्ड का इतिहास उस ईमेल के लिए **Email sent** का दावा न करे जो गिराया गया था। `POST /messaging/emailTemplates/requestApproval` प्रति चर्च प्रति सप्ताह अधिकतम एक बार support को ईमेल करता है।
- **अर्जित भत्ता।** स्वीकृत चर्च को `max(150, 2 × पिछले 30 दिनों में उसका सर्वश्रेष्ठ चर्च-लिखित दिन)` मिलता है, जो प्रति रोलिंग 24 घंटे अधिकतम 2,000 तक सीमित है। वर्तमान 24 घंटे "सर्वश्रेष्ठ दिन" की गणना से बाहर रखे जाते हैं, ताकि एक बाढ़ अपनी ही सीमा न बढ़ा सके।
- **आरक्षित करें, फिर निपटाएँ।** `reserve()` भेजने से पहले प्रति प्राप्तकर्ता एक `deliveryLogs` पंक्ति लिखता है, उन पंक्तियों की गिनती के साथ भत्ते की दोबारा जाँच करता है, और अगर दो अनुरोध सीमा पार कर गए तो वापस लौटता है (भेजना 429 लौटाता है)। `settle()` हर पंक्ति को sent या failed चिह्नित करता है।
- **शिकायत विराम।** `sesFeedback` Lambda (`Api/src/lambda/ses-feedback-handler.ts`, SES → SNS से फ़ीड) हर स्थायी बाउंस या शिकायत को उस चर्च से जोड़ता है जिसका चर्च-लिखित ईमेल उस पते तक लगभग उसी समय पहुँचा था, और इसे `deliveryMethod` `sesBounce` / `sesComplaint` के रूप में संग्रहीत करता है। 7 दिनों में 2+ शिकायतें (≥ 0.3% भेजने पर) या 10+ हार्ड बाउंस (≥ 5%) होने पर चर्च विराम में डाल दिया जाता है।

## शेड्यूलिंग

रिमाइंडर इंजन और सूचना डाइजेस्ट दोनों मौजूदा शेड्यूल्ड टाइमरों पर चलते हैं, नया इंफ़्रास्ट्रक्चर लाए बिना:

| टाइमर | शेड्यूल | क्या चलाता है |
|-------|----------|----------|
| 30 मिनट का टाइमर | हर 30 मिनट | अपठित सूचनाएँ एस्केलेट करें; `individual` आवृत्ति के डाइजेस्ट ईमेल भेजें; देय रिमाइंडर occurrences डिस्पैच करें (`ReminderEngine.scan`); अनुमोदन डाइजेस्ट; देय ऑटोमेशन निष्पादन |
| रात का टाइमर | 05:00 UTC | समूह उपस्थिति रिमाइंडर; आवर्ती स्ट्रीमिंग सेवाएँ आगे बढ़ाएँ; ऑटो-रिफ़्रेश सूचियाँ ताज़ा करें; अगले horizon के लिए रिमाइंडर occurrences विस्तारित करें (`ReminderEngine.expandAll`); `daily` आवृत्ति के डाइजेस्ट ईमेल भेजें |

स्थानीय रूप से, `Api` प्रोजेक्ट से `npm run timer:30min` और `npm run timer:midnight` के साथ वही तर्क माँग पर चलाया जा सकता है।

## फ़ाइल सूची

| क्षेत्र | फ़ाइलें |
|------|-------|
| फ़नल | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| साझा प्रवेश | `Api/src/shared/helpers/NotificationService.ts` |
| ट्रांज़ैक्शनल द्वार | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, लिंट नियम `Api/tools/eslint-rules/email-door.cjs` |
| चर्च ईमेल सीमाएँ | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| रिमाइंडर इंजन | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| टेक्स्टिंग / STOP opt-out | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (सर्विंग अवलोकन **Text Volunteers**) |
| रिमाइंडर रिपॉज़िटरी | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| सर्विंग/प्लान ईमेल | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| रिमाइंडर एडिटर (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| रिमाइंडर एडिटर / प्राथमिकताएँ (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## संबंधित पृष्ठ

- [Real-time Architecture](../realtime) -- WebSocket प्रोटोकॉल और क्लाइंट प्रिमिटिव (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) जिन पर in-app डिलीवरी स्तर चलता है
- [Web Push Notifications](../web-push) -- VAPID सेटअप और ब्राउज़र Push API पथ जो push एस्केलेशन स्तर उपयोग करता है
- [Messaging Endpoints](../api/endpoints/messaging) -- संदेश, बातचीत, कनेक्शन, और सूचना/रिमाइंडर रूट्स के लिए पूरी REST सतह
