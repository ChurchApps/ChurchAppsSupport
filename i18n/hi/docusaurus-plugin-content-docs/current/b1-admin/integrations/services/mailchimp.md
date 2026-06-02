---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

नए B1 लोगों, givers, या group members को एक Mailchimp audience में pipe करें ताकि अगली welcome series, year-end appeal, या volunteer newsletter एक list से pull हो जो हमेशा up to date होता है। wiring पूरी तरह से Zapier (या Make) में रहता है — B1 event को fire करता है, Mailchimp subscriber को ingests करता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- कम से कम एक audience के साथ एक [Mailchimp](https://mailchimp.com) खाता जिसमें आप B1 लोगों को push करना चाहते हैं
- एक [Zapier](https://zapier.com) खाता (free tier छोटे churches को cover करता है)
- **Edit Settings** अनुमति वाला एक B1Admin user ताकि आप एक API कुंजी को mint कर सकें

</div>

## आप क्या Wire Up कर सकते हैं

| Direction | B1 trigger | Mailchimp action |
|---|---|---|
| B1 → Mailchimp | `person.created` | Add/Update Subscriber |
| B1 → Mailchimp | `donation.created` | Add Subscriber to Tag (उदाहरण के लिए "Gave in 2026") |
| B1 → Mailchimp | `group.member.added` | Add Subscriber to Tag scoped to that group |
| Mailchimp → B1 | New Subscriber | B1 *Create Person* |

Mailchimp side बहुत अधिक expose करता है (campaigns, segments, automations) — [Mailchimp की Zapier triggers](https://zapier.com/apps/mailchimp/integrations) को पूर्ण list के लिए देखें। कुछ भी B1 envelope से mappable है fair game है।

## सेटअप

### 1. एक B1 API कुंजी Mint करें

B1Admin में **Settings → Developer → API Keys → New API Key** पर जाएं। Zap को जरूरत वाले scopes दें:

- `settings:write` — trigger को अपने webhook को register करने के लिए आवश्यक
- `people:read` — ताकि Zap first/last name, email, आदि को पढ़ सके
- (Optional) `people:write` यदि आप भी एक Mailchimp → B1 direction की योजना बनाते हैं

सहेजें और `cak_…` string को copy करें — यह केवल एक बार दिखाया जाता है।

### 2. Zap बनाएं

1. **Trigger:** `B1.church — New Person`। पहले use पर Zapier आपको *Sign in to B1.church* के लिए ask करता है; API कुंजी को paste करें।
2. **Action:** `Mailchimp — Add/Update Subscriber`। trigger output को map करें:
   - `data.contactInfo.email` → Email Address
   - `data.name.first` → First Name
   - `data.name.last` → Last Name
   - (Optional) `data.id` → एक Mailchimp merge field यदि आप B1 के person id को साथ रखना चाहते हैं।
3. Zap को चालू करें। Zapier एक `person.created` webhook को B1 पर register करता है — verify करें कि **Settings → Developer → Webhooks** में "Zapier — person.created" नाम की एक row दिखाई दे।

बस। B1Admin में एक person को add करें confirm करने के लिए — नया subscriber Zapier के अंदर seconds के अंदर दिखाई देता है।

## सामान्य Recipes

### Tag givers automatically

- **Trigger** — B1: New Donation
- **Action** — B1: Find Person (lookup by `personId`) email को प्राप्त करने के लिए
- **Action** — Mailchimp: Add Subscriber to Tag (tag `Gave-2026`)

### Drop a group-specific welcome series

- **Trigger** — B1: New Group Member, filtered by `data.groupId`
- **Action** — Mailchimp: Add Subscriber to Tag named after group; अपने existing automation को उस tag से trigger करें

### Two-way: नए Mailchimp signups B1 contacts बन जाते हैं

- **Trigger** — Mailchimp: New Subscriber
- **Action** — B1: Create Person (map First/Last/Email)

## Make Alternative

Make का [Mailchimp app](https://www.make.com/en/integrations/mailchimp) 44 modules को cover करता है — wiring identical है, B1 *Watch Events* trigger को Zapier के जगह replace करते हैं। B1 side के लिए [Make overview doc](../make) देखें।

## Limits & Notes

- **Mailchimp का free tier contacts और audiences को cap करता है** — एक Zap जो एक free audience को अपनी limit के past flood करता है वह `4xx Member limit reached` के साथ error करना start करेगा। Mailchimp logs यह obvious बनाता है।
- **Mailchimp deduplicates by email**, तो same B1 person पर एक Zap को फिर से run करने से उन्हें in place update किया जाता है; यह duplicates नहीं बनाता।
- **Mailchimp से Unsubscribes B1 में वापस flow नहीं होते।** यदि आप Mailchimp unsubscribes को B1 के "Send Mail" preference को clear करना चाहते हैं, तो explicitly reverse Zap को बनाएं।

## समस्या निवारण

- **Zap कभी fire नहीं होता** — `Settings → Developer → Webhooks` को `Zapier — person.created` row के लिए check करें। यदि absent, तो Zap को चालू करते समय API कुंजी में `settings:write` गायब था। Re-mint, फिर से connect, Zap को toggle off और on करें।
- **Add/Update पर `Member exists` warning** — action को *Add Subscriber* से *Add/Update Subscriber* में switch करें (verb महत्वपूर्ण है)। upsert variant idempotent है।
- **First name / last name blank के माध्यम से आते हैं** — B1 का `data.name.first` और `data.name.last` केवल populate होता है यदि उन fields को person पर set किया जाता है। `data.name.display` को fallback के रूप में map करें।

## यह भी देखें

- [Zapier (overview)](../zapier) — हर Zapier recipe का B1 side
- [Make (overview)](../make) — समान विचार, visual builder
- [Webhooks (developer reference)](/docs/developer/api/webhooks#event-catalog)
