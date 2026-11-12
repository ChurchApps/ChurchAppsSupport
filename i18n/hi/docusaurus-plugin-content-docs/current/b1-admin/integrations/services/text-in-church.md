---
title: "Text In Church"
description: "Zapier के साथ B1 Admin और Text In Church को जोड़ें: API key बनाएँ, connect-card-से-B1 Zap बनाएँ, और group सदस्यता मिरर करें।"
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) SMS के साथ drip workflows और connect-card स्वचालन को एक साथ देता है। इसका Zapier ऐप दोनों दिशाएँ देता है — B1 events को Text In Church workflow में भेजें, और connect-card या नए-contact triggers को दूसरी ओर से B1 में लाएँ।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- ऐसे plan पर [Text In Church](https://textinchurch.com) account जिसमें Zapier integration शामिल हो
- एक [Zapier](https://zapier.com) account
- **Edit Settings** अनुमति वाला एक B1Admin user

</div>

## आप क्या वायर कर सकते हैं {#what-you-can-wire-up}

| दिशा | Trigger | Action |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Create/Update Person + Group में जोड़ें |
| B1 → Text In Church | B1 `form.submission.created` | संबंधित टीम के माध्यम से Text Message भेजें |
| B1 → Text In Church | B1 `group.member.added` | Group में जोड़ें (group सदस्यता मिरर करें) |
| Text In Church → B1 | Connect Card Submitted | B1: Create Person + Add Group Member |
| Text In Church → B1 | Person Created | B1: Create Person |
| Text In Church → B1 | Person Joined Group | B1: Add Group Member |

Text In Church के actions में *Send Text Message*, *Send Voice Broadcast*, *Create Task*, *Find Person/Group*, और group membership add/remove भी शामिल हैं।

## सेटअप {#setup}

### 1. B1 API key बनाएँ {#1-mint-a-b1-api-key}

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — key को Zapier से जोड़ने और B1-triggered Zaps के लिए ज़रूरी
- `people:read`, `people:write` — व्यक्ति खोजने या बनाने के लिए
- `groups:write` — group सिंक के लिए
- (वैकल्पिक) `donations:write` अगर आप उपहार की पुष्टि TIC से जोड़ते हैं

### 2. Text In Church को Zapier से जोड़ें {#2-connect-text-in-church-to-zapier}

[Text In Church की Zapier integration गाइड](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) का पालन करें। वे TIC dashboard के भीतर से एक API token बनाते हैं।

### 3. connect-card-से-B1 Zap बनाएँ {#3-build-the-connect-card-to-b1-zap}

यह सबसे आम दिशा है। TIC से भेजे गए connect cards अपने-आप नए B1 लोग बन जाते हैं।

1. **Trigger** — Text In Church: Connect Card Submitted।
2. **Action** — B1.church: Find Person (email से)।
3. **Action** — B1.church: Add Group Member, "New Contact" group में, चरण 2 के व्यक्ति की id का उपयोग करके।

जब कोई मेल नहीं खाता तो B1 का *Find Person* "No person found" त्रुटि के साथ Zap रोक देता है, इसलिए Path उस पर शाखा नहीं बना सकता। नए contacts के लिए, Find Person चरण के लिए Zapier की error handling चालू करें और उसके error path में B1.church: Create Person, फिर Add Group Member चलाएँ।

Zap चालू करें। TIC के ज़रिए भेजा गया अगला connect card अपने-आप **B1Admin → People** में आ जाएगा।

## सामान्य रेसिपी {#common-recipes}

### B1 form से connect-card-जैसा workflow शुरू करें {#trigger-a-connect-card-style-workflow-from-a-b1-form}

- **Trigger** — B1.church: New Form Submission ("I'm new here" form id पर filter)
- **Action** — Text In Church: Create/Update Person, form के email / फ़ोन / नाम के उत्तर map करते हुए
- **Action** — Text In Church: Add to Group, जहाँ group के साथ पहले से बना welcome workflow जुड़ा हो

### group सदस्यता मिरर करें {#mirror-group-membership}

- **Trigger** — B1.church: New Group Member, किसी विशिष्ट `groupId` पर filter
- **Action** — Text In Church: Add to Group (वही व्यक्ति, मिरर group में)। पूर्ण सिंक चाहिए तो इसके साथ `group.member.removed` Zap जोड़ें।

### कोई जुड़ने पर leader को पेज करें {#page-a-leader-when-someone-joins}

- **Trigger** — B1.church: New Group Member
- **Action** — Text In Church: Send Text Message, प्राप्तकर्ता = group leader का फ़ोन, संदेश = `"{first} {last} just joined {group}"`।

## सीमाएँ और नोट्स {#limits--notes}

- **TIC का Zapier ऐप plan स्तर पर सीमित है।** अगर TIC dashboard में Zapier integration धूसर दिखता है, तो अपने plan पर उसे सक्षम कराने के लिए TIC support से संपर्क करें।
- **Group ids TIC की हैं, B1 की नहीं।** मिररिंग करते समय आपको कहीं एक मैपिंग तालिका रखनी होगी (एक Zapier *Lookup Table*, या हर Zap में हार्ड-कोडेड)।
- **Send Text Message credits खर्च करता है।** जो हर Zap *Send Text* चलाता है, वह आपके TIC SMS कोटा से घटता है।

## समस्या निवारण {#troubleshooting}

- **Connect-Card trigger फ़ायर नहीं होता** — TIC को Zapier integration toggle चालू चाहिए। साथ ही जाँचें कि जिस form से आपने परीक्षण किया वह "Connect Card" के रूप में कॉन्फ़िगर है, सामान्य survey के रूप में नहीं।
- **B1 में Create Person 401 के साथ विफल** — API key गलत है, रद्द हो चुकी है, या उसमें `people:write` नहीं है। फिर से बनाएँ।
- **B1 में डुप्लिकेट लोग** — TIC एक ही event के लिए *Person Created* और *Connect Card Submitted* दोनों भेजता है। एक को अपना सत्य का स्रोत चुनें और दूसरे पर Zapier Filter जोड़ें।

## यह भी देखें {#see-also}

- [Clearstream](./clearstream.md) — समान Zapier रूप वाला वैकल्पिक SMS platform
- [Zapier (overview)](../zapier.md) — हर Zapier रेसिपी का B1 हिस्सा
- [Text In Church Zapier guide](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (TIC के दस्तावेज़)
