---
title: "Slack & Discord"
---

# Slack & Discord

<div class="article-intro">

B1 से directly एक Slack या Discord channel में readable notifications को post करें — नए लोग, दान, group sign-ups, form submissions, calendar events, और अधिक। कोई third-party account नहीं, कोई Zap को maintain नहीं: B1 events को chat messages में reformat करता है और channel के webhook URL को स्वयं POST करता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- आपको B1Admin में **Edit Settings** अनुमति की जरूरत है
- आपके Slack workspace या Discord server में एक admin channel के Incoming Webhook को बनाने के लिए
- तय करें कि आप किस channel में notifications चाहते हैं (आप एक ही channel को event types के लिए use कर सकते हैं, या उन्हें channels में split कर सकते हैं)

</div>

## यह कैसे काम करता है

B1 के पास chat platforms के लिए एक built-in **Connector Type** है। जब आप **Slack** या **Discord** type के साथ एक webhook को create करते हैं, तब webhook engine अभी भी अपना usual delivery + retry + signed-header dance को करता है, लेकिन जो body वह भेजता है उसे B1 के सामान्य `{event,churchId,data}` envelope से उन services को expect करते हैं में `{text}` (Slack) या `{content}` (Discord) message में reshaped किया जाता है।

कोई भी B1 servers per-church basis पर Slack तक नहीं पहुंचता है existing outbound webhook flow के अलावा — host करने के लिए कोई भी नया नहीं है, extra pay करने के लिए कुछ भी नहीं है।

## Slack — Step by Step

### 1. एक Slack Incoming Webhook URL प्राप्त करें

1. [api.slack.com/apps](https://api.slack.com/apps) को उस Slack workspace में खोलें जहां आप notifications चाहते हैं।
2. **Create New App → From scratch** पर क्लिक करें, इसे कुछ जैसे "B1 Notifications" नाम दें, और workspace को pick करें।
3. बाएं nav में **Incoming Webhooks** को चुनें और **Activate Incoming Webhooks** को *On* में toggle करें।
4. **Add New Webhook to Workspace** पर क्लिक करें, channel को pick करें (उदाहरण के लिए `#donations`), फिर **Allow**।
5. Slack आपको page पर एक fresh **Webhook URL** के साथ land करता है जो `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…` जैसा दिख रहा है। इसे copy करें — यह एकमात्र piece of information है जिसे B1 को आवश्यकता है।

:::caution
Slack webhook URL को एक secret के रूप में treat करें। anyone जिसके पास यह है channel को arbitrary messages को post कर सकता है। यदि आप accidentally expose करते हैं, Slack app page (regenerating केवल URL को rotate करता है; B1 को match करने के लिए अपडेट करें) से regenerate करें।
:::

### 2. B1Admin में connect करें

1. B1Admin में **Settings → Developer → Webhooks** पर जाएं।
2. **New Webhook** पर क्लिक करें।
3. Fill in:
   - **Name** — कुछ readable जैसे "Donations → #donations"। केवल आपकी टीम इसे देखती है।
   - **Connector Type** — **Slack** को choose करें।
   - **Payload URL** — step 1 से Slack URL को paste करें।
   - **Events** — tick करें events जो आप messages के रूप में चाहते हैं। एक donations channel के लिए, सिर्फ `donation.created`। एक #people channel के लिए, `person.created` और `group.member.added` को try करें।
4. **Save** पर क्लिक करें। एक "Signing Secret" dialog दिखाई देता है — आप इसे Slack के लिए ignore कर सकते हैं (Slack B1 signatures को verify नहीं करता) और इसे close कर सकते हैं।

### 3. इसे test करें

list से webhook को re-open करें और **Send Test Event** पर क्लिक करें। एक second या दो के अंदर एक message जैसे

> 💝 New donation: $50.00

आपके Slack channel में दिखाई देता है, और नई row **Recent Deliveries** table में दिखाई देती है same screen पर status `succeeded` के साथ। आप पूर्ण हैं।

## Discord — Step by Step

### 1. एक Discord Webhook URL प्राप्त करें

1. अपने Discord server में, जिस channel में आप notifications चाहते हैं उस पर hover करें और **⚙ gear** पर क्लिक करें (Edit Channel)।
2. **Integrations → Webhooks → New Webhook** को खोलें।
3. इसे एक नाम दें और (optionally) एक avatar, फिर **Copy Webhook URL** पर क्लिक करें — `https://discord.com/api/webhooks/123…/abc…` जैसा दिख रहा है।

### 2. B1Admin में connect करें

Slack flow के identical, except **Connector Type** को **Discord** पर set करें। **Payload URL** में Discord URL को paste करें और save करें।

:::tip
आपको Discord URL के अंत में `/slack` को add करने की जरूरत **नहीं** है — B1 Discord-native `{content}` payloads भेजता है, Slack-compatible नहीं। सिर्फ URL को paste करें जिसे Discord आपको दिया है।
:::

### 3. इसे test करें

same **Send Test Event** बटन — Discord chosen channel में message दिखाता है और delivery log को `succeeded` में flip करता है।

## Messages कैसे दिखते हैं

| Event | Example message |
|---|---|
| `person.created` | 👤 New person added: Jordan Rivera |
| `person.updated` | 👤 Person updated: Jordan Rivera |
| `group.created` | 👥 New group created: Tuesday Bible Study |
| `group.member.added` | ➕ Someone was added to a group |
| `donation.created` | 💝 New donation: $50.00 |
| `donation.updated` | 💝 Donation updated: $75.00 |
| `attendance.recorded` | ✅ Attendance recorded |
| `form.submission.created` | 📝 New form submission received |
| `event.created` | 📅 New event: Easter Service |

पूर्ण list [webhook event catalog](/docs/developer/api/webhooks#event-catalog) में रहता है — कोई भी event वहां route को Slack/Discord में किया जा सकता है।

## One Channel Per Topic

आपको हर event को एक जगह में डालना नहीं है। most churches एक handful की webhook को set up करता है:

- एक **#donations** channel जो केवल `donation.created` को सुनता है
- एक **#new-people** channel `person.created` और `group.member.added` के लिए
- एक **#admin-alerts** channel low-volume चीजों के लिए जैसे `form.submission.created`

प्रति church webhooks पर कोई limit नहीं। हर एक independent है — एक को delete या disable करना दूसरों को affect नहीं करता।

## Deliveries को Inspecting करें

webhook editor का **Recent Deliveries** table आखिरी 50 attempts को दिखाता है। एक row पर क्लिक करें exact payload को देखने के लिए जो भेजा गया था और response जो वापस आया। एक Slack connector के लिए payload `{"text":"💝 New donation: $50.00"}` है — raw `{event,churchId,...}` envelope नहीं — क्योंकि B1 delivery से पहले इसे reshape करता है।

यदि कुछ fail हो गया (red `failed` या `exhausted` badge), तो dialog HTTP status और response body दिखाता है ताकि आप देख सकें कि Slack या Discord को क्या पसंद नहीं था — आमतौर पर URL में एक copy/paste error।

## समस्या निवारण

- **कोई message appear नहीं होता है + delivery status `400`** — आमतौर पर Connector Type **Standard** पर set है लेकिन URL एक Slack/Discord का है। Slack/Discord raw envelope को reject करते हैं। dropdown को **Slack** या **Discord** में switch करें और test को फिर से भेजें।
- **Webhook auto-disabled** — 3 consecutive failed deliveries के बाद B1 webhook को turn off करता है। URL को fix करें (या Slack/Discord पर इसे rotate करें) और **Active** को toggle back करें।
- **Message arrive हुआ लेकिन detail missing है** — हर chat platform message size को limit करता है। B1 messages design द्वारा one-liners हैं; richer notifications के लिए [Zapier](./zapier) या [Make](./make) का उपयोग करें एक fuller Slack message को compose करने के लिए उनके Slack actions के माध्यम से।

## Connector Types को Switch करना Later

आप एक existing webhook पर Connector Type को change कर सकते हैं — यह अगले delivery पर लागू होता है। यदि आप Slack से Standard पर switch करते हैं, तो URL को अपने स्वयं के HTTPS endpoint की ओर point करें और same signing secret (यह webhook create होने पर issue किया गया था) raw envelope के रूप में verifiable होना start करता है।

## यह भी देखें

- [Zapier](./zapier) — B1 events द्वारा triggered multi-step workflows के लिए
- [Make](./make) — visual scenario builder
- [Webhooks (developer reference)](/docs/developer/api/webhooks) — पूर्ण payload + signature format यदि आप कभी webhook को अपने स्वयं के server में point करते हैं
