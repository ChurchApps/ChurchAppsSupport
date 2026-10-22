---
title: "Subsplash"
---

# Subsplash

<div class="article-intro">

यदि आप अपनी church app, giving, या forms के लिए Subsplash का उपयोग करते हैं, लेकिन लोगों और donations के लिए B1 को system of record रखना चाहते हैं, तो Subsplash का Zapier app donations, नए profiles, और form responses को real time में B1 में भेज सकता है। ध्यान रहे कि Subsplash का Zapier app अभी **केवल triggers** वाला है — इसका wiring एक-तरफ़ा है (Subsplash → B1)।

</div>

<div class="prereqs">
<h4>शुरुआत करने से पहले</h4>

- एक Subsplash account जिसका plan **API + Zapier** access शामिल करता हो (यह plan tier पर निर्भर है — अपने Subsplash Client Success Manager से पुष्टि करें)
- एक [Zapier](https://zapier.com) account
- B1Admin उपयोगकर्ता जिसके पास **Edit Settings** अनुमति हो

</div>

## आप क्या जोड़ सकते हैं {#what-you-can-wire-up}

नीचे के सभी triggers Subsplash के हैं। Actions B1 के हैं।

| Subsplash trigger | B1 action |
|---|---|
| New Donation | Find Person → Add Donation (यदि व्यक्ति न हो तो Create Person) |
| New Pledge | Add Donation (`notes` = "Pledge: …" के साथ) |
| New Person Created | Create Person |
| Person Updated Profile | (कोई सीधी B1 action नहीं — मैन्युअल समीक्षा के लिए Google Sheet में log करें) |
| New Form Response | Create Person + (वैकल्पिक रूप से) form के आधार पर Add Group Member |

Subsplash → B1 ही वह एकमात्र दिशा है जिसे Subsplash का app अभी समर्थित करता है।

## सेटअप {#setup}

### 1. B1 API key बनाएं {#1-mint-a-b1-api-key}

B1Admin में: **Settings → Developer → API Keys → New API Key**। Scopes:

- `people:read` — email से donor को खोजने के लिए
- `people:write` — यदि व्यक्ति मौजूद न हो तो उसे बनाने के लिए
- `donations:write` — दान दर्ज करने के लिए
- (`settings:write` की आवश्यकता नहीं — यहां trigger Subsplash का है, B1 का नहीं।)

### 2. Subsplash को Zapier से जोड़ें {#2-connect-subsplash-to-zapier}

[Subsplash का Zapier integration guide](https://support.subsplash.com/en/articles/9825926-zapier-integration) फ़ॉलो करें। वे Subsplash Dashboard के भीतर से एक API token जारी करते हैं, जिसे Zapier trigger की ओर से प्रमाणीकरण के लिए उपयोग करता है।

### 3. "दान दर्ज करने" वाला Zap बनाएं {#3-build-the-record-a-donation-zap}

1. **Trigger** — Subsplash: New Donation
2. **Action** — B1.church: Find Person (email से)
3. **Filter / Path** — "person found" के आधार पर शाखा बनाएं:
   - **मिला:** B1.church: Add Donation। amount, date, fund, method = "Online", और notes = Subsplash transaction id मैप करें।
   - **नहीं मिला:** B1.church: Create Person → B1.church: Add Donation (नए बनाए गए व्यक्ति के id का उपयोग करके)।

Zap चालू करें। आगे के Subsplash donations कुछ ही सेकंड में **B1Admin → Donations** में आ जाएंगे।

## सामान्य recipes {#common-recipes}

### पहली बार दान आने पर धन्यवाद संदेश भेजें {#send-a-thank-you-when-a-first-time-gift-lands}

- **Trigger** — Subsplash: New Donation
- **Action** — Zapier द्वारा Filter: केवल तभी आगे बढ़ें जब यह donor का पहला दान हो (पिछले donors की Google Sheet पर Donor Email के लिए *Lookup Table* का उपयोग करें, या donor के बनने की तारीख पर Zapier *Paths* step का उपयोग करें)
- **Action** — Mailchimp / SMTP / SendGrid: पहले दान का धन्यवाद संदेश भेजें
- **Action** — B1.church: Add Donation (सामान्य रूप से)

### नियमित giving flow से pledges को अलग करें {#filter-pledges-off-the-regular-giving-flow}

- **Trigger** — Subsplash: New Pledge
- **Action** — B1.church: Add Donation, जिसमें `notes = "Pledge — Subsplash"` हो और `Pledges` नाम का एक fund हो (आपके operating fund से अलग), ताकि आप **B1Admin → Donations → Summary** में pledges की रिपोर्ट अलग से बना सकें।

### नए app users को B1 people के रूप में सिंक करें {#sync-new-app-users-as-b1-people}

- **Trigger** — Subsplash: New Person Created
- **Action** — B1.church: Create Person, जिसमें name, email, phone भरें। नए व्यक्ति को "Subsplash App Users" जैसे group में जोड़कर B1 में tag करें।

## सीमाएं और नोट्स {#limits--notes}

- **Subsplash का Zapier app केवल triggers वाला है।** यदि आप चाहते हैं कि B1 में होने वाले बदलाव (जैसे B1 में नया व्यक्ति) Subsplash में भी पहुंचें, तो आपको B1 के Zapier app triggers से एक bridge बनाना होगा जो *Webhooks by Zapier — POST* action के माध्यम से Subsplash के REST API को call करे। यह एक custom integration है, कोई तैयार recipe नहीं।
- **API access plan पर निर्भर है।** यदि Zapier connection `403 Forbidden` के साथ विफल होता है, तो आपके Subsplash plan में API access शामिल नहीं हो सकता — अपने Client Success Manager से संपर्क करें।
- **Fund mapping मैन्युअल है।** Subsplash एक campaign या category का नाम भेजता है; B1 को एक संख्यात्मक fund id चाहिए। या तो Zap में fund को hard-code करें, या Subsplash campaigns को B1 funds से मैप करने वाली Zapier *Lookup Table* रखें।

## समस्या-निवारण {#troubleshooting}

- **दान के बाद कोई trigger नहीं चलता** — Subsplash के Zapier dashboard में जांचें कि connection अभी भी *Connected* दिखा रहा है। यदि Subsplash की ओर से API token बदला गया है, तो Zap चुपचाप रुक जाता है; दोबारा connect करें।
- **B1 *Add Donation* 422 के साथ विफल होता है** — अधिकतर कारण एक गायब या अपरिचित `fundId` होता है। **B1Admin → Donations → Funds** के माध्यम से अपने funds की सूची देखें और सटीक id Zap step में कॉपी करें।
- **पहला दान दो बार trigger होता है** — Zapier के ack छूट जाने पर Subsplash कभी-कभी trigger को दोबारा भेज देता है। डुप्लिकेट हटाने के लिए donation id (जो Subsplash payload में भेजता है) पर *Filter by Zapier* जोड़ें।

## इसे भी देखें {#see-also}

- [Donorbox](./donorbox) — वही recipe ढांचा, अलग donation platform के लिए
- [Zapier (overview)](../zapier) — हर Zapier recipe का B1 पक्ष
- [Subsplash Zapier integration guide](https://support.subsplash.com/en/articles/9825926-zapier-integration) (Subsplash के docs)
