---
title: "Server एडमिनिस्ट्रेशन"
---

# Server एडमिनिस्ट्रेशन

<div class="article-intro">

ChurchApps में Server एडमिनिस्ट्रेशन फीचर्स केवल **Server.Admin** अनुमति वाले users के लिए उपलब्ध हैं। ये tools platform operations, support और पूरे system के across troubleshooting के लिए use होते हैं।

</div>

:::warning Access प्रतिबंधित
इस page पर described features के लिए **Server.Admin** अनुमति की आवश्यकता है और regular चर्च एडमिनिस्ट्रेटर के लिए उपलब्ध नहीं हैं। ये platform operators और support staff के लिए इरादा रखते हैं।
:::

## Server Admin को एक्सेस करना

Server.Admin अनुमति वाले Users B1 Admin से server एडमिन panel को एक्सेस कर सकते हैं:

1. [admin.b1.church](https://admin.b1.church) में लॉगिन करें
2. मुख्य navigation में **Admin** tab को क्लिक करें
3. Server Admin panel चर्चों, users और system operations को प्रबंधित करने के लिए tabs को शामिल करता है

## User Impersonation

Impersonation feature server admins को support और troubleshooting उद्देश्यों के लिए एक और user के रूप में लॉगिन करने देता है। यह user-reported issues को investigate करते समय या चर्चों को अपनी systems को configure करने में मदद करते समय उपयोगी है।

### एक User को Impersonate कैसे करें

1. Server Admin panel में **Impersonate** tab को navigate करें
2. Search field में user के नाम या email address को दर्ज करें
3. **Search** को क्लिक करें या Enter को दबाएं
4. Search results से, उस user को क्लिक करें जिसे आप impersonate करना चाहते हैं
5. Dialog में impersonation को confirm करें
6. आप उस user के रूप में लॉगिन किए जाएंगे और उनके खाते पर redirect किए जाएंगे

### महत्वपूर्ण नोट्स

- Impersonation target user की permissions और church access के साथ एक नया session बनाता है
- आपका original admin session impersonate करते समय समाप्त हो जाता है
- Impersonation के दौरान लिए गए सभी actions audit trail में logged हैं
- अपने admin account पर लौटने के लिए, लॉगआउट करें और अपने credentials के साथ फिर से लॉगिन करें
- Impersonation का उपयोग केवल support purposes के लिए करें जब आवश्यक हो और हमेशा users को inform करें जब उनके accounts को support के लिए access करें

### API Endpoint

Impersonation feature Membership API में `/users/:userId/impersonate` endpoint द्वारा backed है। Technical details के लिए [Membership Endpoints](/docs/developer/api/endpoints/membership#users) देखें।

### सुरक्षा विचार

- Impersonation को Server.Admin अनुमति की आवश्यकता है - यह अनुमति sparingly और केवल trusted platform operators को दी जानी चाहिए
- सभी impersonation events को admin user ID और target user ID के साथ logged किया जाता है
- जब impersonation होता है तो चर्चों को notify नहीं किया जाता, इसलिए स्पष्ट policies establish करें कि यह feature कब और कैसे उपयोग किया जाना चाहिए
- अपने support ticket system में impersonation events को document करने के लिए consider करें accountability के लिए

## संबंधित Pages

- [Authentication & Permissions](/docs/developer/api/endpoints/authentication) — Permission model और JWT authentication
- [Membership Endpoints](/docs/developer/api/endpoints/membership) — User और church management API
- [Audit Log](/docs/b1-admin/reports/audit-log) — एक चर्च के लिए activity logs को view करें
