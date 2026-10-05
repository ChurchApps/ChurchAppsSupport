---
title: "सर्वर प्रशासन"
---

# सर्वर प्रशासन

<div class="article-intro">

ChurchApps में सर्वर प्रशासन सुविधाएं केवल **Server.Admin** permission वाले उपयोगकर्ताओं के लिए उपलब्ध हैं। ये tools सिस्टम में सभी चर्चों में प्लेटफॉर्म operations, support, और troubleshooting के लिए उपयोग किए जाते हैं।

</div>

:::warning Access Restricted
इस पृष्ठ पर वर्णित features को **Server.Admin** permission की आवश्यकता है और नियमित church administrators के लिए उपलब्ध नहीं हैं। ये केवल platform operators और support staff के लिए हैं।
:::

## सर्वर एडमिन को एक्सेस करना

Server.Admin permission वाले उपयोगकर्ता B1 Admin से server admin panel को एक्सेस कर सकते हैं:

1. [admin.b1.church](https://admin.b1.church) में लॉग इन करें
2. [Jump menu](../b1-admin/introduction.md#getting-around-with-the-jump-menu) को खोलें, **Settings** को expand करें, और **Server Admin** को click करें। (आप `admin.b1.church/admin` पर सीधे भी जा सकते हैं।)
3. Server Admin panel में Churches, Users, Impersonate User, Background Jobs, Commons, Usage Trends, Translation Lookups, Server Health, और Database Migrations के sections हैं।

## User Impersonation

Impersonation feature server admins को support और troubleshooting purposes के लिए एक अन्य उपयोगकर्ता के रूप में लॉग इन करने की अनुमति देता है। यह उपयोगकर्ता-reported issues को investigate करते समय या चर्चों को उनके systems को configure करने में मदद करते समय उपयोगी है।

### User को Impersonate कैसे करें

1. Server Admin panel के **Impersonate User** section को खोलें
2. search field में user के name या email address को enter करें
3. **Search** को click करें या Enter दबाएं
4. search results से, जिस user को impersonate करना चाहते हैं उसे click करें
5. उपस्थित dialog में impersonation को confirm करें
6. आप उस user के रूप में लॉग इन हो जाएंगे और उनके account में redirect हो जाएंगे

### महत्वपूर्ण नोट्स

- Impersonation एक नया session create करता है target user की permissions और church access के साथ
- जब आप दूसरे user को impersonate करते हैं तो आपका original admin session समाप्त हो जाता है
- Impersonation के दौरान की जाने वाली सभी actions audit trail में logged होती हैं
- अपने admin account पर वापस जाने के लिए, logout करें और अपनी credentials के साथ फिर से login करें
- Impersonation का उपयोग केवल support purposes के लिए और आवश्यकता पड़ने पर करें और जब users के accounts को support के लिए access किया जा रहा हो तो users को हमेशा inform करें

### API Endpoint

Impersonation feature `/users/:userId/impersonate` endpoint द्वारा Membership API में backed है। Technical details के लिए [Membership Endpoints](/docs/developer/api/endpoints/membership#users) देखें।

### Security Considerations

- Impersonation को Server.Admin permission की आवश्यकता है - यह permission को sparingly grant किया जाना चाहिए और केवल trusted platform operators को
- सभी impersonation events admin user ID और target user ID के साथ logged होते हैं
- जब impersonation होता है तो churches को notify नहीं किया जाता है, इसलिए स्पष्ट policies establish करें कि यह feature कब और कैसे use किया जाना चाहिए
- अपने support ticket system में impersonation events को document करने पर विचार करें accountability के लिए

## Commons Moderation

Commons user-submitted content के लिए shared moderation queue है सभी products में — WorshipCommons songs, Lessons.church lessons, FreeShow templates, और B1 website builder templates सभी एक ही queue में flow करते हैं बजाय separate per-product review tools के।

### Commons को एक्सेस करना

1. Server Admin panel में **Commons** tab navigate करें।
2. आपको तीन sub-tabs दिखाई देंगे: **Queue**, **Reports**, और **Assets**।

एक limited **music editor** role भी Queue tab को see कर सकता है, लेकिन ऐसे submissions को approve करने से blocked है जो किसी song के rights या licensing को change करते हैं।

### Queue

Queue हर pending submission को सभी products में list करता है, product और asset type द्वारा filterable। प्रत्येक row दिखाता है कि submission एक नया asset है, इसके original author द्वारा एक edit है, या एक third party द्वारा एक edit है, साथ ही submitter के approval track record और कितने समय से submission wait कर रहा है (72 घंटे से अधिक होने पर flagged)।

**Review** को click करें एक drawer को खोलने के लिए जिसमें field-level diffs, file previews, और item का एक embedded read-only preview हो। **a**/**r** keyboard shortcuts का उपयोग करें approve या reject करने के लिए, और **j**/**k** को अगले या previous submission पर जाने के लिए drawer को leave किए बिना। Reject करने के लिए एक reason select करना आवश्यक है (उदाहरण के लिए quality, duplicate, licensing, ccli, ai, या off-topic) और एक note।

### Reports

Reports tab already-published assets के against filed copyright और policy/quality reports को handle करता है, separate Copyright और Policy & Other queues में split किया हुआ एक Resolved history के साथ। एक report को claim करें work करना शुरू करने के लिए, फिर इसे एक resolution (upheld, dismissed, या duplicate) और एक action (none, unpublish, या remove) के साथ resolve करें।

### Assets

Assets tab एक searchable browser है published content का actions के साथ **Feature** एक asset (इसे product के home page पर highlight करता है), **Unpublish**/**Republish** करने के लिए, या **Remove** करने के लिए (एक copyright या policy reason के साथ)।

Songs के लिए specifically, यह भी है जहां एक song **Sunday-ready** बनता है और church के B1 Admin song search में appear करने के लिए eligible हो जाता है: एक reviewer asset को open करता है और प्रत्येक published key को **Listened** के रूप में mark करता है एक बार वे इसे सुन लेते हैं और score, chords, और slides सभी present हैं को confirm करते हैं। एक song केवल Sunday-ready बनता है एक बार हर key checked off हो।

:::info
Commons moderation staff-only है — individual churches इस queue को कभी नहीं देखते। एकमात्र जगह जहां एक individual church का B1 Admin Commons data को touch करता है वह [song search](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons) का "WorshipCommons — free" section है, जो केवल songs को surface करता है जो पहले से इस review process के through हो चुके हैं।
:::

[Content Commons architecture](/docs/developer/architecture/commons) page को see करें underlying data model और submission lifecycle के लिए।

## Group Email Approval

Churches church-written email नहीं भेज सकते (group email, form follow-ups, workflow emails, और account invites) जब तक एक server admin उन्हें approve नहीं करता है। यह bot-registered churches को shared ChurchApps sending address को spam के लिए use करने से रोकता है।

1. Server Admin panel में **Churches** tab खोलें।
2. प्रत्येक church एक **Group Email** chip दिखाता है: **Approved** (green) या **Not approved** (outlined)।
3. chip को click करें और confirm करें church को approve करने के लिए, या एक approval को revoke करने के लिए।

Church staff **Request review** button का उपयोग करके approval माँग सकते हैं B1 Admin के Send Email dialog में। Request को support address को email किया जाता है और church के name, ID, registration date, location, और किसने ask किया को list करता है। एक church एक week में एक request भेज सकता है। [Church-authored email limits](/docs/developer/architecture/notifications#church-authored-email-limits) के लिए daily allowance और bounces और complaints पर automatic pause देखें।

## Database Migrations

Deploys database को change नहीं करते हैं। Hosted databases केवल Api की network के अंदर से connections को accept करते हैं, तो एक release के बाद जो एक migration add करता है, एक server admin इसे **Database Migrations** tab से apply करता है। (Self-hosted Docker installs अभी भी automatically migrations को run करते हैं जब Api container start होता है।)

Tab current environment को show करता है और एक row per module (membership, attendance, giving, और इसी तरह) इसके status, applied और pending migrations की संख्या, और last one applied के साथ।

- **Run Pending Migrations** हर pending migration को apply करता है, एक module at a time, order में। यह पहली failure पर stops करता है और दिखाता है कि प्रत्येक module के लिए क्या apply किया गया।
- एक module marked **No history** के पास एक database है जो migration tracking से पहले का है। इसे कभी automatically run नहीं किया जाता है, क्योंकि यह live tables पर old data migrations को replay करेगा। इस module पर **Check Schema** को click करें। Api तालिकाओं, columns, और indexes को compare करता है कि प्रत्येक migration create करता है live database के साथ और प्रत्येक migration को mark करता है **Already applied**, **Missing**, **Partly applied**, या **Data only**। Check द्वारा कुछ भी change नहीं होता है।
- Check results में, **Record as Already Applied** detected migrations को migration history में write करता है उन्हें run किए बिना (एक confirmation के बाद)। सब कुछ last **Already applied** migration तक recorded है, including **Data only** ones उस range में; **Missing** ones pending रहते हैं और फिर **Run Pending Migrations** के साथ normally run किए जा सकते हैं।
- एक **Partly applied** migration को recording block करता है। अगर migration को फिर से run करना safe है (पहले इसे read करें), **Re-run** को tick करें तो यह pending रहता है और top से फिर से run होता है।

Server Admin panel और CLI (`yarn migrate:up`) same Kysely migrator और `kysely_migration` table का use करते हैं, तो वे हमेशा agree करते हैं कि क्या apply किया गया है। Backing endpoints हैं `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect`, और `POST .../:module/baseline`, सभी Server.Admin only।

## Related Pages

- [Authentication & Permissions](/docs/developer/api/endpoints/authentication) — Permission model और JWT authentication
- [Membership Endpoints](/docs/developer/api/endpoints/membership) — User और church management API
- [Audit Log](/docs/b1-admin/reports/audit-log) — church के लिए activity logs को view करें
- [Content Commons Architecture](/docs/developer/architecture/commons) — Shared asset model और moderation lifecycle
