---
title: "Clearstream"
---

# Clearstream

<div class="article-intro">

किसी भी B1 event से एक [Clearstream](https://clearstream.io) text message को trigger करें — नया person, नया gift, form submission, calendar update — और B1 records के रूप में replies को pull करें। Clearstream का Zapier app दोनों directions को expose करता है, इसलिए पूरी wiring एक recipe है और custom code नहीं।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- कम से कम एक list और एक SMS allowance के साथ एक [Clearstream](https://clearstream.io) खाता
- एक [Zapier](https://zapier.com) खाता
- **Edit Settings** अनुमति वाला एक B1Admin user

</div>

## आप क्या Wire Up कर सकते हैं

| Direction | Trigger | Action |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Create/Update Subscriber + Send Text to Number |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Send Text to List (उदाहरण के लिए finance team को notify करें) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Send Text to एक routing list (उदाहरण के लिए prayer request team) |
| Clearstream → B1 | New Incoming Text | B1: Create Person; tag के साथ tag जो वे texted |

Clearstream के Zapier actions: *Send Text to Number*, *Send Text to List*, *Create/Update Subscriber*, *Add Subscriber to Automated Workflow*, *Add Tag to Subscriber*, *Remove Subscriber From List*।

## सेटअप

### 1. एक B1 API कुंजी Mint करें

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — B1 के लिए trigger webhook को register करने के लिए आवश्यक
- `people:read` — event से person को lookup करने के लिए आवश्यक (`personId` → name/phone/email)
- (Optional) `people:write` यदि Clearstream replies को B1 contacts बनाना चाहिए

### 2. "new gift पर text" Zap बनाएं

1. **Trigger** — B1.church: New Donation
2. **Action** — B1.church: Find Person (donation के `personId`)
3. **Action** — Clearstream: Send Text to Number। step 2 से person के phone को recipient के रूप में use करें, message compose करें (`"Thanks for your gift, {first}! …"`)।

Zap को चालू करें। B1 donation webhook को activation पर register करता है; आप **Settings → Developer → Webhooks** में `Zapier — donation.created` appear देखेंगे।

### 3. (Optional) Replies को B1 records के रूप में pull करें

1. **Trigger** — Clearstream: New Incoming Text
2. **Action** — Filter by Zapier on the keyword — उदाहरण के लिए केवल continue यदि text body `PRAY` से start होता है
3. **Action** — B1.church: Find Person (by phone)
4. **Action** — Filter / Path — यदि नहीं मिला, उन्हें create करें; या तो तरह से, text body को कहीं file करें (Slack, Google Sheet, या एक Webhooks by Zapier के माध्यम से B1 form submission)।

## सामान्य Recipes

### Volunteer team paging

- **Trigger** — B1.church: New Form Submission (prayer-request form id पर filtered)
- **Action** — Clearstream: Send Text to List, जहां list आपकी on-call pastoral team है। Body को compose करें as `New prayer request: {data.questions.0.answer}`।

### First-time visitor follow-up sequence

- **Trigger** — B1.church: New Person, filtered on एक B1 person tag of "First-time visitor"
- **Action** — Clearstream: Add Subscriber to Automated Workflow। workflow id को एक pre-built 7-day text drip में map करें।

### Keyword-driven group join

- **Trigger** — Clearstream: New Incoming Text (filter to keyword `MENS`)
- **Action** — B1.church: Find Person (by phone); fork on not-found → Create Person
- **Action** — B1.church: Add Group Member to Men's Ministry group में

## Limits & Notes

- **Clearstream meters SMS by message।** हर Send Text action length और recipients की संख्या के आधार पर एक या अधिक credits consume करता है — आपकी plan की allowance को check करें।
- **Phone को E.164 format में होना चाहिए** (उदाहरण के लिए `+15555550199`) *Send Text to Number* के लिए। B1 का person record जो कुछ भी enter किया जाता है उसे store करता है; यदि आप format की guarantee नहीं दे सकते तो एक *Formatter by Zapier — Numbers → Format Phone Number* step का उपयोग करें।
- **B1 के side से कोई header की आवश्यकता नहीं है** — Clearstream का auth पूरी तरह से इसके Zapier connection के अंदर रहता है।

## समस्या निवारण

- **Trigger कभी fire नहीं होता** — `Settings → Developer → Webhooks` को Zap को चालू करने के बाद एक `Zapier — <event>` row show करना चाहिए। यदि नहीं, तो B1 API कुंजी में `settings:write` गायब है। Re-mint करें और फिर से connect करें।
- **Clearstream returns "Invalid phone number"** — recipient field E.164 में नहीं है। एक Format Phone Number step जोड़ें।
- **Send Text to List fails with `403`** — Clearstream API user के पास उस list के लिए अनुमति नहीं है, या list id गलत है। List ids Clearstream list detail page पर दृश्यमान हैं।

## यह भी देखें

- [Text In Church](./text-in-church) — alternative SMS platform, similar wiring shape
- [Mobile Message](./mobile-message) — US के बाहर churches के लिए
- [Zapier (overview)](../zapier) — हर Zapier recipe का B1 side
- [Clearstream API docs](https://api-docs.clearstream.io/) — Zapier app से परे custom integrations के लिए
