---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) staff और volunteers के लिए background screening चलाता है — children या youth program चलाने वाले किसी भी चर्च के लिए एक near-universal need। Checkr के पास एक Zapier app नहीं है, लेकिन [Make.com का Checkr integration](https://www.make.com/en/integrations/checkr) verified है और आपको एक B1 event से एक check को kick off करने के लिए आवश्यक actions को expose करता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- API access और कम से कम एक screening package configured के साथ एक [Checkr](https://checkr.com) खाता
- एक [Make](https://www.make.com) खाता
- **Edit Settings** अनुमति वाला एक B1Admin user

</div>

## आप क्या Wire Up कर सकते हैं

Make का Checkr app 1 trigger और 6 actions को expose करता है:

| Direction | B1 / Make trigger | Action |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (एक volunteer group को filtered) | Checkr: Create Candidate → Create Background Check Invitation |
| Checkr → B1 | Checkr webhook (invitation / report event) | B1: person के record को अपडेट करें (उदाहरण के लिए tag "Checkr cleared") |

Make के Checkr actions: Create Candidate, Create Background Check Invitation, Get Candidate, Get Report, Get Report का ETA, Get एक Invitation। Plus 4 search modules।

## सेटअप

### 1. एक B1 API कुंजी Mint करें

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — trigger webhook के लिए
- `people:read` — एक check को start करते समय person का नाम/email देखने के लिए
- (Optional) `people:write` यदि आप report status को एक custom field या tag के रूप में लिखना चाहते हैं

### 2. Make में "volunteer signup पर एक check को kick off करें" scenario बनाएं

1. **Trigger** — B1.church: Watch Events (`group.member.added`)।
2. **Filter** — केवल continue यदि `data.groupId` आपके "Children's Volunteers" (या equivalent) group से मेल खाता है।
3. **Action** — B1.church: Find Person (द्वारा `data.personId`) email + first/last name प्राप्त करने के लिए।
4. **Action** — Checkr: Create Candidate। step 3 से first/last/email को map करें।
5. **Action** — Checkr: Create Background Check Invitation। step 4 से नई candidate id को *candidate_id* field में map करें। screening package को pick करें (उदाहरण के लिए `tasker_standard` या जो कुछ आपका खाता expose करता है)।
6. (Optional) **Action** — Slack: आपके safe-ministry coordinator को notify करें कि एक check initiate किया गया है।

scenario को चालू करें। targeted group में नए volunteers को automatic Checkr invitation by email मिलता है; वे अपने phone या laptop पर इसे पूरा करते हैं; Checkr screen चलाता है।

### 3. (Optional) report को वापस प्राप्त करें

1. **Trigger** — Checkr: Watch Events (webhook)। Make activation पर एक Checkr webhook registers करता है।
2. **Filter** — केवल continue यदि `event_type = report.completed`।
3. **Action** — Checkr: Get Report (webhook से report id का उपयोग करें)।
4. **Action** — B1.church: Find Person (candidate email द्वारा)।
5. **Action** — Conditional Slack / Email: coordinator को `clear` / `consider` / `suspended` status के साथ notify करें।

Note: B1 के पास आज एक built-in "background-check status" field नहीं है। pragmatic options हैं (a) result को एक private Slack channel में post करें for review, (b) इसे audit के लिए एक Google Sheet में लिखें, या (c) person को `clear` पर एक "Cleared volunteers" B1 group में जोड़ें।

## सामान्य Recipes

### हर 2 साल में volunteers को फिर से screen करें

उपरोक्त को एक Make schedule trigger के साथ pair करें:

- **Trigger** — Make: Schedule (monthly)
- **Action** — B1.church: List Group Members for "Cleared volunteers"
- **Action** — Filter by Make: cleared date older than 22 months
- **Action** — Checkr: Create Background Check Invitation (initial flow के समान)

### Stage 1 access को check के पूरा होने तक block करें

यदि आपका चर्च B1 group membership का उपयोग करता है access को gate करने के लिए (उदाहरण के लिए केवल "Cleared" group members serving schedules में दिखाई देते हैं), नए volunteers को एक holding group में रखें जब तक Checkr `report.completed` event उन्हें flip नहीं करता।

## Limits & Notes

- **Checkr is US-only** अधिकांश screening packages के लिए। Australian, UK, और Canadian churches को एक alternative की आवश्यकता होगी।
- **Pricing** per check — हर Create Invitation Make में एक real check को burn करता है। Checkr के sandbox / staging account में पहले test करें (Make का Checkr app आप pass करने वाले credentials को respect करता है, तो creds को swap करने से sandbox/live को switch किया जाता है)।
- **Checkr API access is plan-gated.** छोटे Checkr accounts एक UI-only tier पर हो सकते हैं; Checkr को API को enable करने के लिए contact करें।

## समस्या निवारण

- **Create Candidate fails with `403`** — Checkr API token read-only है या सही account permissions नहीं है। Checkr dashboard से write scope के साथ re-issue करें।
- **Invitation कभी arrive नहीं होता** — step 3 में candidate के email को check करें; B1 के पास उस person के लिए एक empty email field हो सकता है। Checkr step से पहले एक email-required filter जोड़ें।
- **Webhook trigger fire नहीं होता** — Checkr का webhook registration कभी-कभी silently fail होता है यदि आपका Make account एक paid tier पर नहीं है जो outbound webhooks को support करता है। Checkr के dashboard *Webhooks* page में verify करें कि Make का URL listed है।

## यह भी देखें

- [Make (overview)](../make) — हर Make scenario का B1 side
- [Mobile Message](./mobile-message) — SMS-providers-without-Zapier-apps के लिए, Checkr Make wiring के समान Webhooks/HTTP pattern
- [Checkr API docs](https://docs.checkr.com/)
