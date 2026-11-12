---
title: "VOMO"
description: "Zapier के साथ VOMO volunteer signups और kiosk check-ins को B1 Admin के लोगों और groups से जोड़ें, API key scopes और सेटअप चरणों के साथ।"
---

# VOMO

<div class="article-intro">

VOMO एक volunteer engagement platform है — लोग projects के लिए signup करते हैं, kiosk पर check in करते हैं, और घंटे जमा करते हैं। अगर आप volunteer scheduling के लिए VOMO और लोगों के रिकॉर्ड के लिए B1 इस्तेमाल करते हैं, तो Zapier दोनों के बीच सदस्यता और check-ins को सिंक कर सकता है ताकि कोई भी पक्ष दूसरे से अलग न हो।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- ऐसे plan पर [VOMO](https://vomo.org) account जो Zapier उपलब्ध कराता हो (अनिश्चित हों तो VOMO support से पूछें)
- एक [Zapier](https://zapier.com) account
- **Edit Settings** अनुमति वाला एक B1Admin user

</div>

## आप क्या वायर कर सकते हैं {#what-you-can-wire-up}

VOMO के Zapier ऐप में चार तत्काल triggers और चार actions हैं। ज़्यादातर चर्च जो रेसिपी चाहते हैं:

| दिशा | Trigger | Action |
|---|---|---|
| VOMO → B1 | VOMO Membership (बनाया गया) | B1: Find Person → Create Person (अगर नया है) |
| VOMO → B1 | VOMO Kiosk check-in | B1: "Currently Serving" group में Add Group Member, या attendance के रूप में दर्ज करें |
| B1 → VOMO | B1 `person.created` | VOMO: Find Organizer (email से); नहीं मिला तो कस्टम चरण |
| कोई भी | VOMO Participation (signups) | B1: project-विशिष्ट group में Add Group Member |

VOMO actions केवल **projects का मसौदा बनाने** और मौजूदा organizers/projects **खोजने** तक सीमित हैं — फ़िलहाल "इस व्यक्ति को VOMO project में जोड़ो" जैसा कोई action नहीं है। दिलचस्प वायरिंग ज़्यादातर VOMO → B1 है।

## सेटअप {#setup}

### 1. B1 API key बनाएँ {#1-mint-a-b1-api-key}

**Settings → Developer → API Keys → New API Key**। Scopes:

- `settings:write` — जब आप key जोड़ते हैं तो Zapier हर B1 key को B1 की webhook सूची से मिलाता है, इसलिए इसके बिना connection विफल हो जाता है
- `people:read`, `people:write` — volunteers को B1 लोगों के रूप में खोजने और बनाने के लिए
- `groups:write` — उन्हें serving-team groups में जोड़ने के लिए
- (वैकल्पिक) `attendance:write` अगर आप kiosk check-ins को attendance मानते हैं

### 2. membership-सिंक Zap बनाएँ {#2-build-the-membership-sync-zap}

1. **Trigger** — VOMO: Membership (event = `created`)।
2. **Action** — B1.church: Find Person, email पर मिलान करके।
3. **Action** — B1.church: Add Group Member, चरण 2 के व्यक्ति को उपयुक्त volunteer group में जोड़ते हुए।

   जब कोई मेल नहीं खाता तो B1 का *Find Person* "No person found" त्रुटि के साथ Zap रोक देता है। जो volunteers अभी B1 में नहीं हैं, उनके लिए Find Person चरण के लिए Zapier की error handling चालू करें और उसके error path में B1.church: Create Person, फिर Add Group Member चलाएँ।
4. चालू करें। नए VOMO volunteers अब सही group सदस्यता के साथ B1 में दिखते हैं।

### 3. (वैकल्पिक) kiosk-check-in Zap बनाएँ {#3-optional-build-the-kiosk-check-in-zap}

1. **Trigger** — VOMO: Kiosk
2. **Action** — B1.church: Find Person (email से)
3. **Action** — आपकी पसंद:
   - *अगर इसे attendance मानते हैं* — B1 के `/attendance/visits` endpoint पर Webhooks by Zapier POST (B1 के Zapier ऐप में अभी पहली-श्रेणी का *Record Attendance* action नहीं है)। B1 [API key](/docs/developer/api/api-keys) `Authorization: Bearer cak_…` header में जाती है।
   - *अगर इसे group सदस्यता मानते हैं* — B1.church: "Currently Serving (Today)" group में Add Group Member, और दिन में बाद में एक दूसरा Zap, जो एक निर्धारित सफ़ाई के ज़रिए उन्हें हटाता है।

## सामान्य रेसिपी {#common-recipes}

### प्रति-project group सिंक {#per-project-group-sync}

- **Trigger** — VOMO: Participation (बनाया गया)
- **Action** — Zapier द्वारा project id पर Filter, फिर
- **Action** — B1.church: एक B1 group में Add Group Member, जिसका नाम VOMO project से मेल खाता हो।

जब VOMO project समाप्त हो, तो B1 group को मैन्युअल रूप से साफ़ करें (या इसे *Participation deleted* trigger के साथ जोड़ें जो उन्हें हटाता है)।

### "साइन अप करने के लिए धन्यवाद" SMS भेजें {#send-a-thanks-for-signing-up-text-via-sms}

उसी Zap में VOMO Participation → Clearstream Send Text या Text In Church Send Message जोड़ें। दोनों के पास पहली-श्रेणी के Zapier actions हैं — देखें [Clearstream](./clearstream.md) और [Text In Church](./text-in-church.md)।

### छूटे हुए लोगों का पता लगाएँ {#detect-drop-off}

हर दिन एक Zapier *Schedule* trigger चलाएँ जो VOMO में Find Organizer को उन B1 लोगों की सूची के लिए call करे जो इस महीने serving team में जुड़े — अगर VOMO "not found" लौटाता है, तो उन्होंने VOMO सक्रिय नहीं किया और उन्हें याद दिलाने की ज़रूरत है।

## सीमाएँ और नोट्स {#limits--notes}

- **Email ही जोड़ने वाली कुंजी है।** VOMO के payloads उपयोगकर्ता का email देते हैं पर B1 person id नहीं। जो donors हर सिस्टम में अलग email इस्तेमाल करते हैं, वे डुप्लिकेट बनाएँगे।
- **VOMO के Zapier ऐप में आज "Add to Project" action नहीं है।** अगर आपको B1 → VOMO project enrollment चाहिए, तो आपको *Webhooks by Zapier* चरण से VOMO के REST API पर POST करना होगा, जो एक कस्टम integration है।
- **VOMO के मुफ़्त / निचले स्तर पर Zapier शामिल नहीं हो सकता।** किसी वायरिंग तिथि का वादा करने से पहले VOMO support से पुष्टि करें।

## समस्या निवारण {#troubleshooting}

- **Trigger कभी फ़ायर नहीं होता** — VOMO के तत्काल triggers के लिए API token का वैध रहना ज़रूरी है। Zap फिर से परीक्षण करें; अगर token बदला गया है तो VOMO को फिर से जोड़ें।
- **B1 *Add Group Member* विफल** — action में दिया group अब मौजूद नहीं है। चरण के **Group** dropdown से group फिर से चुनें, या B1Admin (**People > Groups**) में group खोलें और उसके वेब पते के अंत से id कॉपी करें।
- **एक VOMO volunteer से डुप्लिकेट B1 लोग** — शायद उन्होंने ऐसे email से signup किया जो B1 में पहले से अलग था। या तो emails को मानक बनाएँ, या बनाने से पहले फ़ोन से भी खोजने वाला Zapier *Path* जोड़ें।

## यह भी देखें {#see-also}

- [Zapier (overview)](../zapier.md) — हर Zapier रेसिपी का B1 हिस्सा
- [Clearstream](./clearstream.md), [Text In Church](./text-in-church.md) — volunteer signups को SMS पुष्टियों के साथ जोड़ें
- [Webhooks (developer reference)](/docs/developer/api/webhooks) — वे events जिन पर VOMO trigger हो सकता है
