---
title: "सूचनाएँ और रिमाइंडर आर्किटेक्चर"
description: "B1 Admin API सूचनाओं, निर्धारित रिमाइंडरों, चर्च ईमेल सीमाओं, और टेक्स्ट opt-outs को एक डिलीवरी फ़नल और प्राथमिकता गेट के माध्यम से कैसे रूट करता है।"
---

# सूचनाएँ और रिमाइंडर आर्किटेक्चर

<div class="article-intro">

हर संदेश जो कोई चर्च सदस्य अपने देखे जा रहे पेज के बाहर देखता है -- बैज संख्या, पुश सूचना, या डाइजेस्ट ईमेल -- MessagingApi के दो दरवाज़ों में से एक से गुज़रता है। यह पेज उस फ़नल, उसे समय पर भरने वाले रिमाइंडर इंजन, और उस प्राथमिकता मॉडल का दस्तावेज़ है जो तय करता है कि वास्तव में किस तक क्या पहुँचेगा।

</div>

## अवलोकन — दो दरवाज़े

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
scheduled staff push ─▶ scheduledNotifications (1-minute timer) ───────────┤
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **जो भी किसी व्यक्ति को कुछ बताता है** वह messaging module के `NotificationHelper.createNotifications()` से गुज़रता है। यह एक `notifications` पंक्ति सहेजता है और socket → push → ईमेल के क्रम में आगे बढ़ाता है, हर चैनल के लिए `PreferenceGateHelper` का मूल्यांकन करते हुए -- स्तर 0 पर `in_app` सहित।
2. **जो भी निर्धारित है** वह एक `reminderDefinition` (इकाई-स्तर या scope-स्तर) है, जिसे `reminderOccurrences` में विस्तारित किया जाता है और एक आवर्ती टाइमर पर `ReminderEngine.scan()` द्वारा भेजा जाता है। एक विस्तारक, एक डिस्पैचर, एक भेजने का लेजर (`reminderSentLog`)। एक अपवाद है: B1Admin के **Mobile > Push Notifications** पेज या किसी समूह के **Notify** डायलॉग से निर्धारित स्टाफ़ push -- यह एक `scheduledNotifications` पंक्ति है (audience `church` या `group`), जिसे 1-मिनट टाइमर पर `ScheduledNotificationHelper.dispatchDue()` भेजता है। पहले प्रयास पर `sendAt` से 30 मिनट से अधिक देर हुई पंक्ति देर से भेजी जाने के बजाय `missed send window` के साथ विफल चिह्नित होती है, और विफल होने वाला भेजना 3 बार तक दोबारा आज़माया जाता है। प्राप्तकर्ता भेजने के समय `PushAudienceHelper` द्वारा तय होते हैं, वही हेल्पर जिसे तुरंत समूह भेजना उपयोग करता है, और `createNotifications()` के ज़रिए `churchPushNotification` (प्राथमिकता श्रेणी `announcements`) या `groupPushNotification` के रूप में पहुँचाए जाते हैं।
3. **सीधा ईमेल** केवल `TransactionalEmailHelper.sendTransactional()` के पीछे मौजूद है। एक ESLint नियम इसे कंपाइल समय पर लागू करता है -- नीचे देखें।

:::tip ईमेल दरवाज़ा लिंट द्वारा लागू होता है, केवल परंपरा से नहीं
`Api/tools/eslint-rules/email-door.cjs` `no-direct-email-helper` परिभाषित करता है: `NotificationHelper.ts` या `TransactionalEmailHelper.ts` के बाहर किसी भी `EmailHelper.sendTemplatedEmail()` या `EmailHelper.sendEmail()` कॉल पर लिंट विफल होता है। अगर आपको ईमेल भेजना है, तो उसे फ़नल से (`emailImmediate` के साथ `createNotifications`) या `TransactionalEmailHelper.sendTransactional()` से रूट करें -- तीसरा तरीका नहीं है जो CI पास करे।
:::

## सूचना फ़नल

`NotificationHelper.createNotifications()` हर उस चीज़ के लिए एकल प्रवेश बिंदु है जो निर्धारित या लेन-देन वाली नहीं है:

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
    deliveryStartLevel?: number;      // 0 socket (डिफ़ॉल्ट), 1 push, 2 केवल ईमेल
    category?: string;                // प्राथमिकता अक्ष; छोड़ने पर contentType से निकाला जाता है
    emailByPerson?: Record<string, { subject: string; html: string }>;
    emailImmediate?: boolean;         // डाइजेस्ट की प्रतीक्षा करने के बजाय ईमेल अभी भेजें
  }
)
```

हर प्राप्तकर्ता के लिए यह `notifications` में एक पंक्ति सहेजता है और `attemptDeliveryWithEscalation` को कॉल करता है, जो नीचे दी चैनल सीढ़ी पर चलता है। उसी `(contentType, contentId)` की एक अब भी अपठित पंक्ति दोबारा बनने से रोकती है -- यह डुप्लिकेट गार्ड `emailImmediate` भेजने (रिमाइंडर ऑफ़सेट, स्टाफ़ "email all", workflow चरण अपने स्वयं के डुप्लिकेट गार्ड रखते हैं) और सीधे संदेशों के लिए छोड़ा जाता है, जो हमेशा socket को पिंग करते हैं।

`shared/helpers/NotificationService.ts` messaging module के बाहर के कॉलर के लिए वही सिग्नेचर (`NotificationServiceOptions`) दोहराता है और बूट पर messaging module के साथ पंजीकृत होता है।

## चैनल एस्केलेशन चेन

डिलीवरी एक स्तर से शुरू होती है (डिफ़ॉल्ट रूप से 0, या रिमाइंडर/स्पष्ट भेजने के लिए ऊँचा), और अगले चैनल पर केवल तभी जाती है जब पिछला सफल न हुआ हो। हर स्तर कुछ भी आज़माने से पहले `PreferenceGateHelper` से गेटेड होता है।

| स्तर | चैनल | व्यवहार |
|-------|---------|----------|
| 0 | **in_app / socket** | पहले `in_app` गेट जाँचा जाता है। अगर दबा दिया गया (म्यूट), तो पंक्ति `isNew=false` के साथ सहेजी जाती है और डिलीवरी पूरी तरह रुक जाती है -- कोई socket पिंग नहीं, कोई बैज नहीं, आगे कोई एस्केलेशन नहीं। नहीं तो सर्वर व्यक्ति के `alerts` रूम के खुले socket कनेक्शन खोजता है और `notification` (या `privateMessage`) फ़्रेम भेजता है। सामान्य सूचनाओं के लिए, socket डिलीवरी सफल होने पर चेन यहीं रुकती है -- 30-मिनट का टाइमर अपठित आइटम दोबारा जाँचता है और बाद में आगे बढ़ाता है। सीधे संदेश कभी socket पर नहीं रुकते: इंस्टॉल किया हुआ PWA पृष्ठभूमि में socket खुला रख सकता है, जो नहीं तो OS-स्तर की push को दबा देता। |
| 1 | **push** | `allowPush` / श्रेणी opt-out / quiet hours पर गेटेड। व्यक्ति के `devices` पंक्तियों पर मिले Expo push tokens और Web Push subscriptions दोनों पर भेजता है, endpoint से डुप्लिकेट हटाते हुए और रास्ते में पुराने tokens छाँटते हुए। |
| 2 | **email** | `emailFrequency` और श्रेणी opt-out पर गेटेड। तत्काल भेजने (`emailImmediate`) तुरंत रेंडर होता है और `deliveryLogs` पंक्ति लिखता है; नहीं तो सूचना नीचे वर्णित बैच डाइजेस्ट के लिए लंबित रहती है। |
| — | **sms** | एस्केलेशन सीढ़ी में कोई स्तर नहीं। एकमात्र गेटेड SMS निर्माता रिमाइंडर इंजन है: जब किसी definition के `channels` में `sms` हो, तो `ReminderEngine.sendSms()` हर प्राप्तकर्ता को push/ईमेल सूचना **के अतिरिक्त** टेक्स्ट करता है (देखें [टेक्स्ट रिमाइंडर](#text-reminders))। थोक टेक्स्टिंग (`TextingController` / `@churchapps/texting`), सेवा अवलोकन **Text Volunteers** भेजना (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`), और workflow **Send Text** चरण कार्रवाई (`StepActionHelper.sendText` → `sendPersonText`) सभी सीधे चर्च के प्रदाता के ज़रिए टेक्स्ट करते हैं, इसलिए सूचना प्राथमिकताएँ और quiet hours उन पर लागू नहीं होते -- केवल व्यक्ति का `optedOut` फ़्लैग माना जाता है। |

socket या push पर छोड़ी गई अपठित सूचनाएँ 30-मिनट के टाइमर (`NotificationHelper.escalateDelivery`) से आगे बढ़ती हैं। बैच ईमेल `NotificationHelper.sendEmailNotifications(frequency)` से भेजा जाता है, जो हर व्यक्ति की `emailFrequency` प्राथमिकता से चलता है: `individual` 30-मिनट टाइमर पर, `daily` रात्रि टाइमर पर। (`weekly` एक वैध प्राथमिकता मान है, लेकिन अभी उसका कोई समर्पित बैच रन नहीं है।)

## रिमाइंडर इंजन

निर्धारित रिमाइंडर -- इवेंट रिमाइंडर, टास्क की देय तिथियाँ, सेवा/योजना असाइनमेंट रिमाइंडर -- सभी एक सामान्यीकृत इंजन से गुज़रते हैं, न कि हर सुविधा के लिए अलग cron तर्क से।

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 इकाई- या scope-स्तर            एक पंक्ति प्रति (definition,          deliveryStartLevel: 1
                                 entity, occurrence, offset)           + reminderSentLog लेजर
```

**Definitions** (`reminderDefinitions`) या तो इकाई-स्तर (`entityId` सेट -- एक विशिष्ट इवेंट, टास्क, या योजना) या scope-स्तर (`entityId` null, `scopeId` सेट -- जैसे किसी योजना प्रकार की हर योजना) होते हैं। एक definition में मिनट ऑफ़सेट की CSV (`offsets`, जैसे एक दिन और एक घंटा पहले के लिए `"1440,60"`), एक स्थानीय भेजने का समय (`sendLocalTime`), चैनलों की CSV (`channels` -- जिसमें `email` भेजने के समय तुरंत एक समृद्ध ईमेल ट्रिगर करता है), एक `recipientMode`, और एक वैकल्पिक कस्टम `message` होता है।

**Expansion** आगे के क्षितिज (एक रोलिंग कई-दिन की विंडो) के लिए fire पंक्तियाँ बनाता है। यह रात्रि टाइमर पर चलता है, और जब भी कोई definition सहेजा जाता है तब तुरंत, ताकि अंतिम-क्षण के इवेंट का रिमाइंडर भी फ़ायर हो। Scope definitions adapter के `loadScopeEntities` के ज़रिए फैलते हैं, हर ठोस इकाई के लिए एक occurrence सेट बनाते हैं; इकाई-स्तर occurrences `definitionId:occurrenceISO:offset` कुंजी उपयोग करते हैं, जबकि scoped occurrences इकाई ID से namespace होते हैं ताकि कभी टकराएँ नहीं। किसी पहले से रद्द की गई occurrence को upsert करने पर वह **पुनर्जीवित** होती है -- रद्द-फिर-विस्तार इकाई बदलने के बाद रिमाइंडर को फिर से सिंक करने का मानक तरीका है; `sent`, `failed`, या `processing` पंक्तियाँ अछूती रहती हैं।

**Dispatch** (`ReminderEngine.scan()`) 30-मिनट टाइमर पर चलता है। यह देय occurrences claim करता है (एक lease दोहरी प्रक्रिया रोकता है), adapter के ज़रिए प्राप्तकर्ता लोड करता है, उन्हें छानता है जो `reminderSentLog` में उस occurrence के लिए पहले से दर्ज हैं, और `createNotifications` को `deliveryStartLevel: 1` (सीधे push पर) के साथ कॉल करता है, और definition के चैनलों में ईमेल होने पर `emailImmediate`/`emailByPerson` के साथ।

### टेक्स्ट रिमाइंडर {#text-reminders}

जब किसी definition के `channels` में `sms` हो, तो push/ईमेल सूचनाएँ बनने के बाद `scan()` उन्हीं ताज़ा प्राप्तकर्ताओं के लिए `ReminderEngine.sendSms()` कॉल करता है। टेक्स्टिंग हर सदस्य के लिए opt-in है:

- हर प्राप्तकर्ता `PreferenceGateHelper.evaluate(..., "sms", ...)` से गुज़रता है, इसलिए `allowSms` चालू होना चाहिए (डिफ़ॉल्ट रूप से बंद रहता है और B1App के **Text messages** स्विच से सेट होता है), और श्रेणी का `sms` चैनल overridden off नहीं होना चाहिए। `event_reminders`, `serving_schedule`, और `tasks` दोनों `defaultChannels` और `allowedChannels` में `sms` सूचीबद्ध करते हैं।
- जिन लोगों के पास `mobilePhone` नहीं है या जिनका `optedOut` सेट है, उन्हें दबाया जाता है। अगर चर्च के पास कोई टेक्स्टिंग प्रदाता नहीं है, तो शेष बैच `no_provider` कारण के साथ दबा दिया जाता है।
- संदेश `ReminderEngine.smsBody()` बनाता है: `"<Church name>: <message> Reply STOP to opt out."`, एक 160-अक्षर सेगमेंट तक छोटा किया जाता है।
- हर प्राप्तकर्ता को `channel: "sms"` और स्थिति `sent` / `suppressed` / `failed` के साथ अपनी `reminderSentLog` पंक्ति मिलती है, push/ईमेल पंक्ति से अलग कुंजी के साथ, ताकि विफल टेक्स्ट push या ईमेल को कभी दोबारा न भेजे।

एडिटर केवल तभी **Text** देते हैं जब `GET /messaging/texting/status` `{ enabled: true }` लौटाता है (चर्च का पहला टेक्स्टिंग प्रदाता सक्षम है)।

**STOP opt-out।** `POST /messaging/texting/inbound/:churchId/:token` एक अनाम वेबहुक है जिसे चर्च अपने प्रदाता में चिपकाता है (B1Admin टेक्स्टिंग सेटिंग्स में `GET /messaging/texting/inboundUrl` से URL दिखाता है)। टोकन चर्च ID का HMAC है (`SmsOptOutHelper.token`)। `SmsOptOutHelper.parse` Twilio-शैली के फ़ॉर्म फ़ील्ड और Clearstream/TextInChurch-शैली के JSON दोनों स्वीकार करता है; अगर उत्तर बिल्कुल एक कैरियर stop शब्द है (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), तो चर्च में हर गैर-हटाए गए व्यक्ति, जिसका मोबाइल नंबर मेल खाता है, को `people.optedOut = true` और `allowSms = false` मिलता है। अन्य उत्तरों को स्वीकार करके अनदेखा किया जाता है।

एक आंतरिक इवेंट बस इकाई बदलावों पर बिना रात्रि विस्तार की प्रतीक्षा किए प्रतिक्रिया देती है: कंटेंट इवेंट (वेबहुक dispatcher के ज़रिए) और योजना/टास्क अपडेट इवेंट प्रभावित इकाई के लिए तुरंत पुनः-विस्तार या रद्दीकरण ट्रिगर करते हैं, और योजना अपडेट उसके योजना प्रकार से जुड़ी किसी भी scope definitions को भी फिर से विस्तारित करता है।

### Adapters

इंजन इकाई-अज्ञेयवादी है; हर समर्थित इकाई प्रकार एक adapter (`helpers/adapters/`) के माध्यम से जुड़ता है:

| इकाई प्रकार | Adapter | नोट्स |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | प्राप्तकर्ता इवेंट और `recipientMode` के आधार पर रजिस्ट्रेंट या समूह सदस्यों तक सीमित। |
| `plan` | `PlanReminderAdapter` | प्राप्तकर्ता प्रकाशित (गैर-draft) योजनाओं पर Accepted + Unconfirmed असाइनमेंट हैं। सेवा पुष्टि workflow से जारी Unconfirmed असाइनमेंट तब तक छोड़े जाते हैं जब तक वे स्वीकार न हों (नीचे देखें)। `buildEmails` `DoingModuleGateway.buildPlanReminderEmails` को कॉल करता है, जो `doing/helpers/PlanReminderEmailHelper` के ज़रिए पद, नोट्स, और कस्टम संदेश रेंडर करता है, जिसमें `ReminderTokenHelper` से हस्ताक्षरित Accept/Decline बटन शामिल हैं जो एक सार्वजनिक असाइनमेंट-उत्तर एंडपॉइंट पर पोस्ट करते हैं। |
| `task` | `TaskReminderAdapter` | प्राप्तकर्ता टास्क के assignee(s) हैं। |

### एंडपॉइंट

| Method | Path | उद्देश्य |
|--------|------|----------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | एक इकाई के लिए रिमाइंडर definition लोड या सहेजें। |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | scope-स्तर (विरासत में मिली) रिमाइंडर definition लोड या सहेजें। |
| `DELETE` | `/messaging/reminders/:defId` | definition हटाएँ और उसकी लंबित occurrences रद्द करें। |
| `GET` | `/messaging/reminders/event/:eventId/preview` | सहेजने से पहले इवेंट रिमाइंडर का प्राप्तकर्ता गिनती और अगले fire समय दिखाएँ। |
| `GET` | `/messaging/reminders/log` | चर्च के लिए हाल की रिमाइंडर occurrence इतिहास। |
| `POST` | `/messaging/reminders/mute` | किसी विशिष्ट इकाई के रिमाइंडर म्यूट करें। |

definition सहेजने पर उस इकाई या scope के लिए तुरंत पुनः-विस्तार ट्रिगर होता है, ताकि एडिटर रात्रि जॉब की प्रतीक्षा किए बिना ताज़ा "next fires" देखें।

## सीधे संदेश

सीधे संदेश बाकी सब की तरह उसी फ़नल पर चलते हैं, किसी अलग एस्केलेशन पथ पर नहीं। हर अपठित बातचीत को `notifications` में एक **shadow row** मिलती है (`contentType='privateMessage'`, `contentId` = निजी संदेश ID, `category='direct_messages'`), जो सारी डिलीवरी स्थिति का मालिक है -- socket/push/ईमेल एस्केलेशन, पढ़ने का ट्रैकिंग, सब कुछ। `privateMessages` तालिका स्वयं संदेश payload और `notifyPersonId` कॉलम रखती है, जो अपठित बैज का स्रोत है और प्राप्तकर्ता द्वारा बातचीत पढ़ने पर साफ़ हो जाता है।

Shadow rows घंटी सूचना से अदृश्य हैं: वे अपठित गिनती क्वेरी, सूचना सूची क्वेरी, और mark-read/delete क्वेरियों से बाहर रखी जाती हैं, जो सभी `contentType <> 'privateMessage'` फ़िल्टर करती हैं। हर DM पिंग अपठित स्थिति से स्वतंत्र रूप से socket तक जाता है (लाइव चैट शब्दार्थ -- कोई डुप्लिकेट गार्ड नहीं), और DM कभी socket डिलीवरी पर नहीं रुकते जैसे सामान्य सूचनाएँ रुकती हैं, क्योंकि पृष्ठभूमि PWA socket खुला रख सकता है फिर भी OS-स्तर की push की ज़रूरत हो सकती है। अगर कोई व्यक्ति DM सूचनाएँ म्यूट करता है, तो shadow row पार्क हो जाती है (`isNew=false`, `notifyPersonId` साफ़), -- बातचीत के भीतर फिर भी दिखती है, बस बैज या अलर्ट के बिना।

## प्राथमिकताएँ और गेटिंग

हर भेजना `PreferenceGateHelper.evaluate()` से गुज़रता है, एक शुद्ध फ़ंक्शन (सारी स्थिति बाहर से दी जाती है, गर्म पथ पर कोई DB कॉल नहीं), जो `allow`, `suppress`, या `defer` लौटाता है। परतें क्रम से चलती हैं, और पहली जो तय करे वही जीतती है:

1. **लॉक्ड श्रेणी** -- कुछ श्रेणियाँ अनिवार्य हैं (tier 0) और बाकी हर परत को बायपास करती हैं।
2. **मास्टर म्यूट / चैनल किल** -- `masterMute`, `allowPush`, `allowSms` (डिफ़ॉल्ट रूप से बंद -- सदस्य opt in करते हैं), या `emailFrequency='never'` सीधे दबा देते हैं।
3. **Quiet hours** -- केवल push और SMS (ईमेल को गैर-दखलंदाज़ माना जाता है)। अगर व्यक्ति के समय क्षेत्र में दीवार-घड़ी का समय उसकी quiet विंडो में है, तो एक लेन-देन श्रेणी फिर भी पहुँचती है; एक गैर-लेन-देन श्रेणी quiet विंडो के अंत तक टाल दी जाती है, जिसकी गणना `TimezoneHelper.wallClockToUtc` के ज़रिए DST-सही UTC क्षण के रूप में होती है।
4. **प्रति-श्रेणी प्राथमिकता override** -- एक श्रेणी × चैनल जोड़ी के लिए स्पष्ट opt-out; अनुपस्थिति का अर्थ श्रेणी का डिफ़ॉल्ट।
5. **प्रति-इकाई म्यूट** -- किसी विशिष्ट इकाई (जैसे एक इवेंट, एक योजना) पर दर्ज म्यूट श्रेणी-स्तर की सेटिंग से और सीमित करता है, लेकिन केवल तब लागू होता है जब कॉलर सूचना के साथ इकाई ID/प्रकार भी दे।

तालिकाएँ जो इसमें शामिल हैं: `notificationPreferences` (वैश्विक -- `masterMute`, `emailFrequency` जिसका मान `individual|daily|weekly|never` है, `allowPush`, quiet-hours विंडो + समय क्षेत्र, `allowSms`), `notificationPreferenceOverrides` (प्रति श्रेणी × चैनल), और `notificationEntityMutes` (प्रति इकाई)।

यह गेट फ़नल के भीतर in-app (स्तर 0), push (स्तर 1), और ईमेल (स्तर 2) के लिए लागू होता है -- तुरंत रिमाइंडर/डाइजेस्ट ईमेल सहित -- और रिमाइंडर टेक्स्ट के लिए `ReminderEngine.sendSms()` में। लेन-देन वाला ईमेल (ऑथ कोड, पासवर्ड रीसेट, आमंत्रण, दान रसीदें) डिज़ाइन से इसे बायपास करता है; यही दूसरे दरवाज़े का पूरा उद्देश्य है।

### सेवा पुष्टि workflows

एक योजना `workflowType = "assignmentConfirmation"` workflow (`plans.confirmationWorkflowId`) के लिए opt in कर सकती है। Publish/Notify फिर प्रति-असाइनमेंट सूचना के बजाय `POST /doing/plans/:id/issueRequests` को कॉल करता है: हर नए Unconfirmed असाइनमेंट को `notified` + `confirmationWorkflowId` और एक workflow कार्ड (`tasks.assignmentId`, अद्वितीय `followupKey`) मिलता है। कार्ड एक केवल-ऐप अलर्ट भेजता है (`appOnly: true` -- कोई push/ईमेल एस्केलेशन नहीं), फिर workflow की `sendAssignmentRequest` कार्रवाइयाँ चलाता है, जो `MessagingModuleGateway.sendServingWorkflowMessage` से गुज़रती हैं: `NotificationHelper.sendWorkflowEmail` के ज़रिए ईमेल (प्राथमिकता गेट + `ChurchEmailLimiter`, `workflowEmail` के रूप में मीटर्ड), और `sendPersonText` के ज़रिए SMS केवल `allowSms` और `serving_schedule` श्रेणी गेट के साथ। Accept/Decline (इवेंट बस पर `assignment.updated`) कार्ड बंद करता है; 30-मिनट टाइमर (`AssignmentWorkflowHelper.processPending`) छूटी हुई शुरुआतें और इवेंट सुधारता है, और फ़ॉलो-अप डेडलाइन पर अनुत्तरित अनुरोध को लीडर समीक्षा टास्क में बदल देता है। पूरा जीवनचक्र: `Api/docs/assignment-confirmation-workflows.md`।

## चर्च-लिखित ईमेल की सीमाएँ

वह ईमेल जिसकी सामग्री किसी चर्च ने लिखी है, साझा ChurchApps SES identity से बाहर जाता है, इसलिए इसे `Api/src/shared/helpers/ChurchEmailLimiter.ts` द्वारा प्रति चर्च मीटर किया जाता है। चार पथ इसे कॉल करते हैं: समूह/टेम्पलेट भेजना (`EmailTemplateController`, सामग्री प्रकार `email`), फ़ॉर्म फ़ॉलो-अप ईमेल (`FormSubmissionController`, `formFollowUp`), workflow **Send email** कार्रवाइयाँ (`churchAuthored` के साथ `NotificationHelper`, `workflowEmail`), और सेवा पुष्टि अनुरोध ईमेल (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`)। सिस्टम मेल (ऑथ कोड, रसीदें, रिमाइंडर) और भूमिका व समूह आमंत्रण (`UserController.sendInviteEmail`, एक निश्चित टेम्पलेट) मीटर्ड नहीं हैं।

- **स्वीकृति गेट।** एक चर्च तब तक कुछ नहीं भेजता जब तक सर्वर एडमिन `churches.emailApprovedDate` सेट न करे (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → **Group Email** चिप)। Archived चर्च हमेशा ब्लॉक होते हैं। B1Admin का Send Email डायलॉग `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) पढ़ता है और, जब अस्वीकृत हो, संपादक के बजाय **Request review** कार्ड दिखाता है। Workflow चरण संपादक वही एंडपॉइंट पढ़ता है (`tasks.admin` के साथ `groupMembers.edit` के लिए भी खुला) ताकि **Send email** कार्रवाइयों पर चेतावनी दे सके जब चर्च अस्वीकृत या रुका हुआ हो। भेजने के समय, `MessagingModuleGateway.sendTemplatedEmail` `false` लौटाता है बिना सूचना बनाए जब `ChurchEmailLimiter.remaining()` 1 से कम हो, ताकि कार्ड का इतिहास कभी उस मेल के लिए **Email sent** न दावा करे जो छोड़ा गया। `POST /messaging/emailTemplates/requestApproval` support को ईमेल करता है, प्रति चर्च प्रति सप्ताह अधिकतम एक बार।
- **अर्जित अनुमति।** एक स्वीकृत चर्च को `max(150, 2 × उसका पिछले 30 दिनों का सबसे अच्छा चर्च-लिखित दिन)` मिलता है, प्रति घूमते 24 घंटों में 2,000 तक सीमित। मौजूदा 24 घंटे "सबसे अच्छे दिन" से बाहर रखे जाते हैं, ताकि कोई बर्स्ट अपनी ही सीमा न बढ़ा सके।
- **Reserve, फिर settle।** `reserve()` भेजने से पहले हर प्राप्तकर्ता के लिए एक `deliveryLogs` पंक्ति लिखता है, उन पंक्तियों को गिनकर अनुमति दोबारा जाँचता है, और अगर दो अनुरोध सीमा से आगे निकल गए तो वापस लौटता है (भेजना 429 लौटाता है)। `settle()` हर पंक्ति को sent या failed चिह्नित करता है।
- **शिकायत विराम।** `sesFeedback` Lambda (`Api/src/lambda/ses-feedback-handler.ts`, SES → SNS से फ़ीड होता है) हर स्थायी बाउंस या शिकायत को उस चर्च से जोड़ता है जिसका चर्च-लिखित ईमेल उस पते तक लगभग उसी समय पहुँचा था, `deliveryMethod` `sesBounce` / `sesComplaint` के रूप में संग्रहीत। 7 दिनों में 2+ शिकायतें (≥ 0.3% भेजने पर) या 10+ हार्ड बाउंस (≥ 5%) होने पर चर्च विराम में जाता है।

## शेड्यूलिंग

रिमाइंडर इंजन और सूचना डाइजेस्ट दोनों मौजूदा शेड्यूल्ड टाइमरों पर चलते हैं, नया इंफ़्रास्ट्रक्चर लाए बिना:

| टाइमर | शेड्यूल | क्या चलाता है |
|-------|----------|----------|
| 30-मिनट टाइमर | हर 30 मिनट | अपठित सूचनाएँ आगे बढ़ाना; `individual` आवृत्ति के डाइजेस्ट ईमेल भेजना; देय रिमाइंडर occurrences डिस्पैच करना (`ReminderEngine.scan`); स्वीकृति डाइजेस्ट; देय स्वचालन निष्पादन |
| 1-मिनट टाइमर (`timerWebhooks`) | हर मिनट | देय निर्धारित push सूचनाएँ भेजना (`ScheduledNotificationHelper.dispatchDue`, job `scheduledNotifications`) |
| रात्रि टाइमर | 05:00 UTC | समूह उपस्थिति रिमाइंडर; आवर्ती स्ट्रीमिंग सेवाएँ आगे बढ़ाना; auto-refresh सूचियाँ ताज़ा करना; अगले क्षितिज के लिए रिमाइंडर occurrences विस्तार करना (`ReminderEngine.expandAll`); `daily` आवृत्ति के डाइजेस्ट ईमेल भेजना |

स्थानीय रूप से, वही तर्क `Api` प्रोजेक्ट से `npm run timer:30min` और `npm run timer:midnight` के साथ मांग पर चलाया जा सकता है।

## फ़ाइल सूची

| क्षेत्र | फ़ाइलें |
|------|-------|
| फ़नल | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| साझा प्रवेश बिंदु | `Api/src/shared/helpers/NotificationService.ts` |
| लेन-देन दरवाज़ा | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, लिंट नियम `Api/tools/eslint-rules/email-door.cjs` |
| चर्च ईमेल सीमाएँ | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| रिमाइंडर इंजन | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| टेक्स्टिंग / STOP opt-out | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (सेवा अवलोकन **Text Volunteers**) |
| रिमाइंडर रिपॉज़िटरी | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| सेवा/योजना ईमेल | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| रिमाइंडर एडिटर (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| रिमाइंडर एडिटर / प्राथमिकताएँ (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## संबंधित पेज

- [Real-time आर्किटेक्चर](../realtime.md) — WebSocket प्रोटोकॉल और क्लाइंट प्रिमिटिव (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) जिन पर in-app डिलीवरी स्तर चलता है
- [Web Push सूचनाएँ](../web-push.md) — VAPID सेटअप और push एस्केलेशन स्तर द्वारा उपयोग किया जाने वाला ब्राउज़र Push API पथ
- [Messaging Endpoints](../api/endpoints/messaging.md) — संदेश, बातचीत, कनेक्शन, और सूचना/रिमाइंडर रूट्स का पूरा REST सतह
