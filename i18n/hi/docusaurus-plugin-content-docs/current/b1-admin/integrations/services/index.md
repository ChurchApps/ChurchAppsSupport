---
title: "Connected Services"
---

# Connected Services

<div class="article-intro">

B1 को दूसरे church-tech tool से connect करने का सबसे तेज़ तरीका आमतौर पर एक Zapier या Make recipe है — आपको नए B1 infrastructure की जरूरत नहीं है, और third party workflow को host करता है। यह page services की एक curated list है जो हमने आज wireable की पुष्टि की है, हर एक के साथ एक short, copy-paste setup guide के साथ।

</div>

## एक नज़र में

| Service | Category | Bridge | आप क्या wire कर सकते हैं |
|---|---|---|---|
| [Mailchimp](./mailchimp) | Email | Zapier or Make | नए B1 लोगों / givers को एक Mailchimp audience में sync करें |
| [Donorbox](./donorbox) | Donations | Zapier | Donorbox donations और donors को B1 में वापस push करें |
| [Subsplash](./subsplash) | App / Donations | Zapier | Subsplash giving और लोगों को B1 में pull करें |
| [VOMO](./vomo) | Volunteering | Zapier | B1 groups और VOMO projects के बीच volunteer signups को sync करें |
| [Clearstream](./clearstream) | SMS | Zapier | B1 events से एक Clearstream text को trigger करें; replies को B1 records के रूप में ingest करें |
| [Text In Church](./text-in-church) | SMS / Workflows | Zapier | B1 से Text In Church workflows को trigger करें; Connect Card data को receive करें |
| [Mobile Message](./mobile-message) | SMS (AU) | Webhooks by Zapier or Make | किसी भी B1 event से SMS भेजें |
| [Checkr](./checkr) | Background checks | Make | जब कोई serving team को join करे तो एक background check को kick off करें |

## इन सभी के पास क्या समान है

1. **B1 side की wiring identical है** — **B1Admin → Settings → Developer → API Keys** में सही scopes के साथ एक API कुंजी create करें, फिर या तो bridge को trigger के लिए एक webhook को register करने दें (Zapier / Make यह automatically करते हैं, `settings:write` requires) या downstream action से B1 के REST endpoints को कॉल करें।
2. **Bridge आपको बिल करता है, हमें नहीं।** ChurchApps निःशुल्क है; Zapier और Make दोनों के पास free tiers हैं जो एक handful of recipes को cover करते हैं।
3. **आप live जाने से बिना wiring को test कर सकते हैं।** दोनों bridges के पास एक "Test step" बटन है जो trigger को एक बार B1 के विरुद्ध fires करता है और आपको turn करने से पहले data shape दिखाता है।

## एक Bridge picking करना

- **Zapier** अधिक friendly है और बड़े app catalogue को है — जब तक cost एक issue न हो तो इसे default के रूप में use करें।
- **Make** scale में सस्ता है और अधिक flexible routing/filter logic को है — जब एक single workflow में fan-out, conditionals, या कई steps हों तो इसे use करें।
- **Webhooks by Zapier** (Mobile Message doc के लिए use किया जाता है) एक generic adapter है जो आपको किसी भी HTTP endpoint को POST करने देता है जब destination एक first-class Zapier app न हो।

यदि आप इस list में कुछ नहीं चाहते हैं, तो B1 के [REST API](/docs/developer/api) और [webhooks](/docs/developer/api/webhooks) खुले हैं — आप एक one-off bridge को [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) के साथ कुछ घंटों में बना सकते हैं।

## क्या यहां नहीं है (और क्यों)

कई popular church-tech tools — Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck, MinistrySafe — के पास आज एक published Zapier app या Make module नहीं है। उनके पास अपने APIs हैं लेकिन उन्हें B1 से wire करना एक custom-code job है, recipe नहीं, इसलिए वह इस list में fit नहीं होता। यदि एक vendor एक Zapier app या Make module add करता है, तो हम doc को add करेंगे।

हमने intentionally Planning Center-Services-specific tools (music, presentation), competing ChMS products, migration consultants, और tools को skip किया है जो केवल PCO-specific डेटा को clean up करते हैं — कोई भी उनके पास B1 में एक useful wiring path नहीं है।

## यह भी देखें

- [Zapier (overview)](../zapier) — हर Zapier recipe का B1 side identical है; यह doc इसे एक बार cover करता है
- [Make (overview)](../make) — Make scenarios के लिए समान
- [Slack & Discord](../slack-discord) — किसी भी bridge के बिना chat notifications
- [Google Sheets](../google-sheets) — on-demand निर्यात
- [Webhooks (developer reference)](/docs/developer/api/webhooks) — हर recipe जो rely करता है वह event catalog
