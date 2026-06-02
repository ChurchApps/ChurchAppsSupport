---
title: "VOMO"
---

# VOMO

<div class="article-intro">

VOMO एक volunteer engagement platform है — लोग projects के लिए sign up करते हैं, kiosk पर check in करते हैं, और घंटे accumulate करते हैं। यदि आप volunteer scheduling के लिए VOMO का उपयोग करते हैं लेकिन लोगों के records के लिए B1 का उपयोग करते हैं, तो Zapier membership और check-ins को उनके बीच sync कर सकता है ताकि neither side drift न हो।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- एक [VOMO](https://vomo.org) account एक plan पर जो Zapier को expose करता है (यदि unsure हैं तो VOMO support से check करें)
- एक [Zapier](https://zapier.com) खाता
- **Edit Settings** अनुमति वाला एक B1Admin user

</div>

## आप क्या Wire Up कर सकते हैं

VOMO का Zapier app चार instant triggers और चार actions को expose करता है। recipes जो most churches चाहते हैं:

| Direction | Trigger | Action |
|---|---|---|
| VOMO → B1 | VOMO Membership (created) | B1: Find Person → Create Person (if new) |
| VOMO → B1 | VOMO Kiosk check-in | B1: Add Group Member को एक "Currently Serving" group में, या attendance के रूप में record करें |
| B1 → VOMO | B1 `person.created` | VOMO: Find Organizer (by email); else custom step |
| Either | VOMO Participation (signups) | B1: Add Group Member को project-specific group में |

VOMO actions limited हैं **drafting projects** और **finding** existing organizers/projects के लिए — आज "इस person को VOMO project में add करें" action नहीं है। interesting wiring mostly VOMO → B1 है।

## सेटअप

### 1. एक B1 API कुंजी Mint करें

**Settings → Developer → API Keys → New API Key**। Scopes:

- `people:read`, `people:write` — volunteers को B1 लोगों के रूप में lookup और create करने के लिए
- `groups:write` — उन्हें serving-team groups में add करने के लिए
- (Optional) `attendance:write` यदि आप kiosk check-ins को attendance के रूप में treat करते हैं

### 2. membership-sync Zap बनाएं

1. **Trigger** — VOMO: Membership (event = `created`)।
2. **Action** — B1.church: Find Person, email पर matched।
3. **Filter / Path** — found vs. not found पर fork करें:
   - Not found → B1.church: Create Person, फिर Add Group Member को appropriate volunteer group में।
   - Found → B1.church: Add Group Member directly।
4. चालू करें। नए VOMO volunteers अब appropriate group membership के साथ B1 में दिखाई देते हैं।

### 3. (Optional) kiosk-check-in Zap बनाएं

1. **Trigger** — VOMO: Kiosk
2. **Action** — B1.church: Find Person (by email)
3. **Action** — आपकी choice:
   - *यदि attendance के रूप में treating करते हैं* — Webhooks by Zapier POST को B1 के `/attendance/visits` endpoint (B1 का Zapier app अभी तक एक first-class *Record Attendance* action नहीं है)। B1 [API key](/docs/developer/api/api-keys) `Authorization: Bearer cak_…` header में जाता है।
   - *यदि group membership के रूप में treating करते हैं* — B1.church: Add Group Member एक "Currently Serving (Today)" group के साथ, और एक दूसरा Zap बाद में दिन में एक scheduled cleanup के माध्यम से उन्हें remove करता है।

## सामान्य Recipes

### Per-project group sync

- **Trigger** — VOMO: Participation (created)
- **Action** — Filter by Zapier on project id, फिर
- **Action** — B1.church: Add Group Member को एक B1 group में जिसका नाम VOMO project को mirror करता है।

जब VOMO project end होता है, तो manually B1 group को clear करें (या इसे एक *Participation deleted* trigger के साथ pair करें जो उन्हें remove करता है)।

### "thanks for signing up" text को एक SMS के माध्यम से भेजें

VOMO Participation → Clearstream Send Text या Text In Church Send Message को same Zap में chain करें। दोनों के पास first-class Zapier actions हैं — [Clearstream](./clearstream) और [Text In Church](./text-in-church) देखें।

### Detect drop-off

एक daily Zapier *Schedule* trigger चलाएं जो Find Organizer को VOMO में call करता है इस महीने B1 लोगों को serving team में join करने के लिए — यदि VOMO "नहीं मिला", तो वह VOMO को activate नहीं करते और एक nudge की जरूरत है।

## Limits & Notes

- **Email है join key।** VOMO payloads एक user email को expose करते हैं लेकिन कोई B1 person id नहीं। Donors जो हर system में अलग emails का उपयोग करते हैं duplicates को बनाएंगे।
- **VOMO का Zapier app में आज कोई "Add to Project" action नहीं है।** यदि आपको B1 → VOMO project enrollment की आवश्यकता है, तो आप VOMO के REST API को *Webhooks by Zapier* step से POST करेंगे, जो एक custom integration है।
- **VOMO के free / lower tiers को Zapier include नहीं हो सकता।** VOMO support से promise करने से पहले एक wiring date को confirm करें।

## समस्या निवारण

- **Trigger कभी fire नहीं होता** — VOMO के instant triggers को API token को valid रहने की आवश्यकता है। Zap को फिर से test करें; यदि token को rotate किया गया तो VOMO को फिर से connect करें।
- **B1 *Add Group Member* fails with 422** — action में group id exist नहीं करता है। **B1Admin → Groups** खोलें, group पर क्लिक करें, और URL के id segment को Zap step में copy करें।
- **Duplicate B1 लोग एक single VOMO volunteer से** — शायद वह एक अलग email के तहत sign up करते हैं जो वह पहले से B1 में रखते हैं। या तो emails को standardise करें, या एक Zapier *Path* को add करें जो phone द्वारा भी search करते हैं creating से पहले।

## यह भी देखें

- [Zapier (overview)](../zapier) — हर Zapier recipe का B1 side
- [Clearstream](./clearstream), [Text In Church](./text-in-church) — volunteer signups को SMS confirmations के साथ pair करें
- [Webhooks (developer reference)](/docs/developer/api/webhooks) — events जिन्हें VOMO trigger कर सकता है
