---
title: "Text In Church"
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) SMS plus drip workflows और connect-card automations को bundle करता है। इसका Zapier app दोनों directions को expose करता है — B1 events को एक Text In Church workflow में pipe करें, और connect-card या new-contact triggers को दूसरे side से B1 में pull करें।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- एक [Text In Church](https://textinchurch.com) account एक plan पर जो Zapier integration को include करता है
- एक [Zapier](https://zapier.com) खाता
- **Edit Settings** अनुमति वाला एक B1Admin user

</div>

## आप क्या Wire Up कर सकते हैं

| Direction | Trigger | Action |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Create/Update Person + Add to Group |
| B1 → Text In Church | B1 `form.submission.created` | Send Text Message relevant team के माध्यम से |
| B1 → Text In Church | B1 `group.member.added` | Add to Group (mirror group membership) |
| Text In Church → B1 | Connect Card Submitted | B1: Create Person + Add Group Member |
| Text In Church → B1 | Person Created | B1: Create Person |
| Text In Church → B1 | Person Joined Group | B1: Add Group Member |

Text In Church actions भी include करता है *Send Text Message*, *Send Voice Broadcast*, *Create Task*, *Find Person/Group*, और group membership add/remove।

## सेटअप

### 1. एक B1 API कुंजी Mint करें

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — B1-triggered Zaps के लिए आवश्यक
- `people:read`, `people:write` — person को find या create करने के लिए
- `groups:write` — group syncing के लिए
- (Optional) `donations:write` यदि आप gift confirmations को TIC में wire करते हैं

### 2. Zapier को Text In Church से connect करें

[Text In Church का Zapier integration guide](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) को follow करें। वह TIC dashboard के अंदर से एक API token को generate करता है।

### 3. connect-card-to-B1 Zap बनाएं

सबसे common direction। TIC से connect cards को fired किए गए automatic B1 लोग बन जाते हैं।

1. **Trigger** — Text In Church: Connect Card Submitted।
2. **Action** — B1.church: Find Person (by email)।
3. **Path** — found / not found पर branch करें:
   - Not found → B1.church: Create Person।
   - Found → continue।
4. **Action** — B1.church: Add Group Member को एक "New Contact" group में।

Zap को चालू करें। अगली connect card TIC के माध्यम से submitted **B1Admin → People** में automatically land करती है।

## सामान्य Recipes

### एक B1 form से एक connect-card-style workflow को trigger करें

- **Trigger** — B1.church: New Form Submission (filter करें "I'm new here" form id पर)
- **Action** — Text In Church: Create/Update Person, form के email / phone / name answers को map करते हुए
- **Action** — Text In Church: Add to Group, जहां group एक pre-built welcome workflow को attached रखता है

### Mirror group membership

- **Trigger** — B1.church: New Group Member, filtered on एक specific `groupId`
- **Action** — Text In Church: Add to Group (समान person, mirror group)। यदि आप full sync चाहते हैं तो एक `group.member.removed` Zap के साथ pair करें।

### Page एक leader जब कोई join करे

- **Trigger** — B1.church: New Group Member
- **Action** — Text In Church: Send Text Message, recipient = group leader का phone, body = `"{first} {last} just joined {group}"`।

## Limits & Notes

- **TIC का Zapier app gates plan tier के पीछे।** यदि Zapier integration TIC dashboard में greyed out है, तो TIC support को enable करने के लिए contact करें अपने plan पर।
- **Group ids TIC के हैं, B1 के नहीं।** जब mirroring करते हैं, तो आप कहीं एक mapping table को maintain करेंगे (एक Zapier *Lookup Table*, या per-Zap hard-coded)।
- **Send Text Message costs credits.** हर Zap जो *Send Text* को fires करता है आपके TIC SMS allotment से consume करता है।

## समस्या निवारण

- **Connect-Card trigger fire नहीं होता** — TIC को Zapier integration toggle on करने की जरूरत है। यह भी verify करें कि form जिसे आपने test किया था वह एक "Connect Card" के रूप में configured है, generic survey नहीं।
- **B1 में Create Person fails 401 के साथ** — API कुंजी गलत है, revoked है, या `people:write` को missing है। Re-mint करें।
- **Duplicate B1 लोग** — TIC दोनों *Person Created* और *Connect Card Submitted* को भेजता है समान event के लिए। एक को आपके source of truth के रूप में pick करें और दूसरे पर एक Zapier Filter को add करें।

## यह भी देखें

- [Clearstream](./clearstream) — alternative SMS platform similar Zapier shape के साथ
- [Zapier (overview)](../zapier) — हर Zapier recipe का B1 side
- [Text In Church Zapier guide](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (TIC docs)
