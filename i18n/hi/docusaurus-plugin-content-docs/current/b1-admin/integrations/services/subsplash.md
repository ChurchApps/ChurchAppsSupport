---
title: "Subsplash"
---

# Subsplash

<div class="article-intro">

यदि आप अपने church app, giving, या forms के लिए Subsplash का उपयोग करते हैं लेकिन लोगों और donations के लिए B1 को system of record के रूप में चाहते हैं, तो Subsplash का Zapier app donations, नए profiles, और form responses को real time में B1 में pipe कर सकता है। Note करें कि Subsplash का Zapier app वर्तमान में **triggers-only** है — wiring one-way है (Subsplash → B1)।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- एक Subsplash account एक plan पर जो **API + Zapier** access को include करता है (आपके Subsplash Client Success Manager से check करें — ये plan tier के पीछे gate होते हैं)
- एक [Zapier](https://zapier.com) खाता
- **Edit Settings** अनुमति वाला एक B1Admin user

</div>

## आप क्या Wire Up कर सकते हैं

नीचे सभी triggers Subsplash के हैं। actions B1 के हैं।

| Subsplash trigger | B1 action |
|---|---|
| New Donation | Find Person → Add Donation (Create Person यदि missing) |
| New Pledge | Add Donation (with `notes` = "Pledge: …") |
| New Person Created | Create Person |
| Person Updated Profile | (कोई direct B1 action नहीं — manual review के लिए एक Google Sheet में log करें) |
| New Form Response | Create Person + (optionally) Add Group Member form के आधार पर |

Subsplash → B1 एकमात्र direction है जिसे Subsplash का app right now support करता है।

## सेटअप

### 1. एक B1 API कुंजी Mint करें

B1Admin में: **Settings → Developer → API Keys → New API Key**। Scopes:

- `people:read` — email द्वारा donor को lookup करने के लिए
- `people:write` — यदि वे exist नहीं करते तो उन्हें create करने के लिए
- `donations:write` — gift को record करने के लिए
- (कोई `settings:write` needed नहीं — Subsplash, B1 नहीं, यहां trigger को own करता है।)

### 2. Subsplash को Zapier से connect करें

[Subsplash का Zapier integration guide](https://support.subsplash.com/en/articles/9825926-zapier-integration) को follow करें। वह Subsplash Dashboard के अंदर से एक API token को issue करता है जिसे Zapier trigger side को authenticate करने के लिए use करता है।

### 3. "record a donation" Zap बनाएं

1. **Trigger** — Subsplash: New Donation
2. **Action** — B1.church: Find Person (by email)
3. **Filter / Path** — person found पर branch करें:
   - **Found:** B1.church: Add Donation। amount, date, fund, method = "Online", notes = Subsplash transaction id को map करें।
   - **Not found:** B1.church: Create Person → B1.church: Add Donation (नए created person के id का उपयोग करते हुए)।

Zap को चालू करें। Future Subsplash donations **B1Admin → Donations** के अंदर seconds के अंदर flow करते हैं।

## सामान्य Recipes

### जब एक first-time gift land हो तो एक thank-you भेजें

- **Trigger** — Subsplash: New Donation
- **Action** — Filter by Zapier: केवल continue यदि यह donor का first gift है (एक *Lookup Table* को past givers के एक Google Sheet पर Donor Email के विरुद्ध use करें, या एक Zapier *Paths* step को donor created date पर use करें)
- **Action** — Mailchimp / SMTP / SendGrid: first-gift thank-you message भेजें
- **Action** — B1.church: Add Donation (as usual)

### Filter pledges को regular giving flow से

- **Trigger** — Subsplash: New Pledge
- **Action** — B1.church: Add Donation with `notes = "Pledge — Subsplash"` and एक fund जिसे `Pledges` कहा जाता है (अपने operating fund से अलग) ताकि आप B1Admin → Donations → Reports में pledges पर independently report कर सकें।

### नए app users को B1 लोगों के रूप में sync करें

- **Trigger** — Subsplash: New Person Created
- **Action** — B1.church: Create Person, name, email, phone को populating करते हुए। B1 में एक group जैसे "Subsplash App Users" में adding द्वारा tag करें।

## Limits & Notes

- **Subsplash का Zapier app is triggers-only.** यदि आप चाहते हैं कि B1-side changes (उदाहरण के लिए एक नया B1 person भी Subsplash में land हो), तो आपको उस bridge को B1 के Zapier app triggers से Subsplash के REST API को एक custom *Webhooks by Zapier — POST* action के माध्यम से बनाना होगा। वह एक custom integration है, recipe नहीं।
- **API access is plan-gated.** यदि Zapier connection `403 Forbidden` के साथ fail करता है, तो आपका Subsplash plan सायद API access को include नहीं करता — अपने Client Success Manager से contact करें।
- **Fund mapping is manual.** Subsplash एक campaign या category name को pass करता है; B1 को एक numeric fund id की आवश्यकता है। या तो fund को Zap में hard-code करें या Subsplash campaigns को B1 funds में map करने वाली एक Zapier *Lookup Table* को maintain करें।

## समस्या निवारण

- **Donation के बाद कोई trigger fire नहीं होता** — Subsplash के Zapier dashboard में verify करें कि connection अभी भी *Connected* दिखाता है। यदि API token को Subsplash side पर rotate किया गया था, तो Zap silently stop होता है; फिर से connect करें।
- **B1 *Add Donation* fails with 422** — अक्सर एक missing या unrecognised `fundId`। अपने funds को **B1Admin → Donations → Funds** के माध्यम से list करें और exact id को Zap step में copy करें।
- **First gift triggers twice** — Subsplash occasionally एक trigger को फिर से deliver करता है यदि Zapier को अपना ack miss किया। donation id को *Filter by Zapier* में add करें (Subsplash payload में एक भेजता है) duplicates को drop करने के लिए।

## यह भी देखें

- [Donorbox](./donorbox) — एक और donation platform एक Zapier app के साथ same recipe shape
- [Zapier (overview)](../zapier) — हर Zapier recipe का B1 side
- [Subsplash Zapier integration guide](https://support.subsplash.com/en/articles/9825926-zapier-integration) (Subsplash docs)
