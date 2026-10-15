---
title: "अपनी Profile संपादित करना"
---

# अपनी Profile संपादित करना

<div class="article-intro">

member portal में आपका profile page आपको अपनी contact जानकारी अपडेट करने, अपने household को प्रबंधित करने, अपना account email और password बदलने, और यह नियंत्रित करने देता है कि आपका address, phone number, और email address कौन देख सकता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- आपको [logged in](./logging-in.md) होना चाहिए -- profile संपादित करने के लिए एक account आवश्यक है

</div>

## अपनी Profile खोलना

ऊपर के app bar में अपनी profile photo पर tap करें, या **More** page के ऊपर या अपने [Me page](./me-page.md) पर **Edit Profile** पर tap करें, ताकि `/mobile/profileEdit` पर **Your profile** खुले। यह page sections की एक शीट है -- **Photo & name**, **Contact**, **Household**, **Account**, और **Privacy** -- जिनमें से हर एक आपकी वर्तमान जानकारी दिखाता है और एक **Edit** link (या **Add Family Member** / **Change**) होता है, जो एक panel खोलता है जहां आप बदलाव करते हैं।

## Photo & Name और Contact

ये sections वह जानकारी रखते हैं जो आपका church आपके person record पर देखता है:

- **Photo & name** — नई तस्वीर अपलोड करने के लिए **Change Photo** पर tap करें, और अपना First, Middle, और Last name संपादित करें।
- **Contact** — Email, Mobile Phone, Home Phone, Work Phone, Birth Date, और आपका Address (street, city, state, और zip)। यदि आप [Notification Preferences](./notification-preferences.md) में text reminders चालू करते हैं, तो वे आपके mobile number पर जाते हैं।

panel में अपने बदलाव करें और **Save Changes** पर tap करें।

:::info
यदि आपका church directory के बदलावों के लिए approval मांगता है, तो पेज कहता है "Changes to your profile go to church staff for approval." और button **Submit for Approval** दिखाता है -- आपके बदलाव तुरंत लागू होने के बजाय एक अनुरोध के रूप में जमा होते हैं। आपके church इनकी समीक्षा कैसे करता है, इसके लिए देखें [Approving Profile Changes](/docs/b1-admin/profile/approving-profile-changes)।
:::

## Household

Household section आपके household से जुड़े अन्य लोगों को उनकी household role (Head, Spouse, Child, आदि) के साथ दिखाता है। किसी household सदस्य का विवरण देखने के लिए उस पर tap करें।

जो परिवार का सदस्य अभी सिस्टम में नहीं है उसे जोड़ने के लिए **Add Family Member** पर tap करें, उनका पहला नाम लिखें, और **Add** पर tap करें। नए परिवार के सदस्य एक pending सूची में जोड़े जाते हैं और आपके अन्य profile बदलावों के साथ आपके church की समीक्षा के लिए जमा किए जाते हैं।

## Account

Account section आपके church profile के बजाय आपके login को प्रबंधित करता है। उसे खोलने के लिए **Edit** पर tap करें:

- **Display Name** — आपके login पर दिखने वाला पहला और अंतिम नाम (आपके church profile के नाम से अलग)।
- **Change Email** — वह email address अपडेट करें जिससे आप sign in करते हैं।
- **Change Password** — अपना वर्तमान password लिखें, फिर अपना नया password दो बार लिखें। आपका नया password कम से कम 8 अक्षरों का होना चाहिए।

हर भाग का अपना **Save** button है।

## Privacy

Privacy section दिखाता है कि ChurchApps में आपकी contact जानकारी कौन देख सकता है। **Visibility Preferences** खोलने के लिए **Change** पर tap करें:

- **Hide me from the member directory** — एक switch जो आपको [member directory](../community/member-directory.md) से पूरी तरह हटा देता है।
- **Address Visibility**, **Phone Visibility**, और **Email Visibility** — हर एक का अपना dropdown है, ताकि आप उदाहरण के लिए अपना email पूरे church के साथ साझा कर सकें और अपना address अधिक निजी रख सकें। विकल्प ये हैं:

| स्तर | कौन देख सकता है |
|---|---|
| **Everyone** | जो कोई भी directory देख सकता है, उसे दिखता है। |
| **Members Only** | साइन इन किए हुए अन्य church members को दिखता है। |
| **My Groups Only** | केवल उन groups के सदस्यों को दिखता है जिनके आप सदस्य हैं। |
| **My Group Leaders and Staff** | केवल church staff और आपके groups के leaders को दिखता है। |
| **Staff Only** | केवल church staff को दिखता है। |

अपनी पसंद लागू करने के लिए **Save** पर tap करें। आपका church इन तीनों fields में से हर एक के लिए default सेट करता है -- देखें [Mobile App Settings](/docs/b1-admin/settings/mobile-app) -- लेकिन यहां आप जो चुनते हैं वह आपके अपने record के लिए उस default को overrides करता है।

:::tip
इन settings की परवाह किए बिना आप हमेशा अपनी जानकारी देखते हैं, और People view permission वाला staff भी उसे हमेशा देख सकता है।
:::

## संबंधित लेख

- [The Me Page](./me-page.md) — आपका व्यक्तिगत dashboard
- [Member Directory](../community/member-directory.md) — अन्य members को ब्राउज़ करना
- [Approving Profile Changes](/docs/b1-admin/profile/approving-profile-changes) — आपका church जमा किए गए बदलावों की समीक्षा कैसे करता है
