---
title: "Audit Log"
---

# Audit Log

<div class="article-intro">

Audit log आपकी चर्च प्रबंधन प्रणाली के पार सभी significant actions और changes को track करता है। इसका उपयोग login activity को review करने, यह track करने के लिए करें कि किसने people records में changes किए, permission updates को monitor करें, और अपनी टीम के पार accountability बनाए रखें।

</div>

<div class="prereqs">
<h4>शुरुआत करने से पहले</h4>

- B1 Admin account with server admin access
- Audit Log को खोजने के लिए **Settings** पर navigate करें

</div>

## Audit Log को देखना

1. [Jump menu](../introduction.md#getting-around-with-the-jump-menu) खोलें (B1 Admin के ऊपरी-बाएं में खोज बार) और **Settings** को expand करें।
2. **Audit Log** पर क्लिक करें।
3. Log एक table में recent entries display करता है जिसमें निम्नलिखित columns हैं:
   - **Date** -- Action कब occurred था।
   - **Category** -- Action का type (quick scanning के लिए color-coded)।
   - **Action** -- क्या किया गया था (उदाहरण के लिए, create, update, delete, login_success)।
   - **Entity** -- Record का type और ID जो affected था।
   - **IP Address** -- उस user का IP address जिसने action perform किया।
   - **Details** -- किए गए specific changes का एक summary।

## Log को Filter करना

Page के शीर्ष पर filters का उपयोग करके परिणामों को narrow down करें:

- **Category** -- Action type के अनुसार filter करें:
  - **All Categories** -- सब कुछ दिखाएं।
  - **Login** -- Login successes और failures।
  - **People** -- Person records को create, update, या delete करना।
  - **Permissions** -- Permission grants और revocations।
  - **Donations** -- Donation record changes।
  - **Groups** -- Group management actions।
  - **Forms** -- Form submission activity।
  - **Settings** -- Configuration changes।
- **Start Date** -- इस date से forward entries दिखाएं।
- **End Date** -- इस date तक entries दिखाएं।

अपनी filters को सेट करने के बाद **Search** पर क्लिक करें परिणामों को update करने के लिए।

## Categories को समझना

हर category quick identification के लिए color-coded है:

- **Login** -- Blue chip। Successful और failed login attempts को track करता है।
- **People** -- Purple chip। Person record creates, updates, और deletes को track करता है।
- **Permissions** -- Red chip। यह track करता है जब access rights दिए जाते हैं या revoked होते हैं।
- **Donations** -- Green chip। Donation record changes को track करता है।
- **Groups** -- Gray chip। Group management operations को track करता है।
- **Forms** -- Orange chip। Form submission activity को track करता है।
- **Settings** -- Yellow chip। Configuration changes को track करता है।

## Log को Export करना

जब log entries display हैं, एक **CSV download** बटन दिखाई देता है। Offline review या record-keeping के लिए current filtered results को एक spreadsheet में export करने के लिए इस पर क्लिक करें।

## Pagination

Results के माध्यम से navigate करने के लिए table के नीचे pagination controls का उपयोग करें। आप 25, 50, या 100 entries per page display कर सकते हैं।

:::info
Audit log entries automatically एक year के लिए retained हैं। 365 days से पुरानी entries को remove किया जाता है system को performant रखने के लिए।
:::

:::tip
Audit log को regularly review करें, especially नए team members को onboard करने या significant configuration changes बनाने के बाद। यह unexpected activity को जल्दी identify करने में मदद करता है।
:::

## संबंधित लेख

- [Roles & Permissions](../settings/roles-permissions) -- किसे क्या access है यह manage करें
- [Data Security](../settings/data-security) -- समझें कि आपका data कैसे protect है
- [Reports Overview](./index.md) -- सभी उपलब्ध reports देखें
