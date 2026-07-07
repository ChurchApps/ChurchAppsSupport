---
title: "भुगतान किए गए पंजीकरण"
---

# भुगतान किए गए पंजीकरण

<div class="article-intro">

Event registration एक simple head count से आगे जा सकता है। आप priced attendee types को define कर सकते हैं (जैसे Adult और Child), optional add-ons को अपनी स्वयं की कीमतों और quantities के साथ offer कर सकते हैं, discount codes बना सकते हैं, और आपके church के existing giving provider के माध्यम से पंजीकरण पर payment collect कर सकते हैं। जब एक event भरता है, एक optional waitlist interested members को लाइन में रखता है और स्वचालित रूप से उन्हें promote करता है जैसे spots खुलते हैं।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- Event पर पहले registration enable करें -- [Creating Calendars](creating-calendars#enabling-event-registration) देखें
- Payments collect करने के लिए, आपके church को [online giving configured](../donations/online-giving-setup.md) की आवश्यकता है (Stripe, PayPal, या Kingdom Funding)। Free events को कोई giving setup की आवश्यकता नहीं है।

</div>

## पंजीकरण सेटिंग्स खोलना

1. B1 Admin में, **Registrations** page पर जाएं और अपनी event को खोलें (या event को अपने calendar से खोलें)।
2. **Registration Settings** card basics को दिखाता है -- **Enable Registration**, **Capacity**, **Registration Opens/Closes**, **Tags**, और **Registration Questions**।
3. Basics के नीचे तीन accordions हैं: **Attendee Types**, **Selections**, और **Discount Codes**।

## Attendee Types

Attendee types आपको विभिन्न प्रकार के attendees के लिए विभिन्न कीमतें charge करने देते हैं -- और प्रत्येक को अलग से cap करते हैं।

1. **Attendee Types** accordion को expand करें और **Add Type** को click करें।
2. एक **Name** enter करें (उदाहरण के लिए "Adult", "Child", "Student")।
3. एक **Price** सेट करें। एक free type के लिए 0 का उपयोग करें।
4. Optional रूप से केवल इस type के लिए एक **Capacity** सेट करें (उदाहरण के लिए केवल 20 Child spots)। Per-type limit के लिए blank छोड़ें।
5. **Save** को click करें।

पंजीकरण के दौरान, प्रत्येक attendee एक type को pick करता है; sold-out types को **Sold out** के रूप में दिखाया जाता है और select नहीं किया जा सकता। Roster प्रत्येक attendee के type और running per-type counts दिखाता है।

## Selections

Selections optional priced add-ons हैं -- T-shirts, meal plans, activity upgrades।

1. **Selections** accordion को expand करें और **Add Selection** को click करें।
2. एक **Name**, optional **Description**, और एक **Price** enter करें (0 "Free" के रूप में दिखाई देता है)।
3. Optional रूप से एक **Capacity** (सभी registrations में कुल available) और एक **Max Qty** (एक registration सबसे ज्यादा order कर सकता है) सेट करें।
4. **Save** को click करें।

Registrants signup के दौरान quantities चुनते हैं, और totals capacity के विरुद्ध count होते हैं ताकि आप कभी भी oversell न करें।

## Discount Codes

1. **Discount Codes** accordion को expand करें और **Add Discount Code** को click करें।
2. **Code** enter करें जो registrants type करेंगे।
3. **Type** चुनें -- **Percent** या **Amount** -- और इसका **Value**।
4. Optional रूप से code को एक **Start Date** / **End Date**, एक **Min Members** (registration पर attendees की minimum संख्या), और **Max Uses** के साथ limit करें।
5. **Save** को click करें।

प्रत्येक code एक **Uses** count दिखाता है ताकि आप देख सकें कि यह कितनी बार redeemed हुआ है। Registrants को code apply करते समय instant feedback मिलता है -- including clear messages जब एक code expire हो गया है, started नहीं हुआ है, या अधिक attendees को जरूरत है।

## Waitlist

Registration Settings card में **Enable Waitlist** को turn on करें। जब event capacity तक पहुंचता है:

- नए registrants को turn away होने के बजाय एक waitlist spot की offer की जाती है। वे same signup को complete करते हैं (payment waitlist किए जाने के दौरान skip किया जाता है)।
- जब कोई cancel करता है, सबसे पुरानी waitlisted registration को **automatically promoted** किया जाता है और उसे एक email मिलता है कि एक spot खुल गया। यदि उन्हें balance का बकाया है, email उन्हें payment को complete करने के लिए link करता है।
- आप किसी को किसी भी समय एक waitlisted row पर **Promote** action के साथ manually promote कर सकते हैं -- event capacity raise करने के बाद उपयोगी।

:::info
Promoted registrations किसी भी balance के paid होने तक *pending* रहते हैं; paying (या nothing pay करना) उन्हें confirms करता है।
:::

## पंजीकरण Roster

Registrations page से एक event को खोलें हर पंजीकरण को देखने के लिए। Table **Name**, **Members**, **Type** (प्रत्येक attendee का type), **Paid / Total** (एक balance warning के साथ जब money अभी भी owed है), **Status**, और **Date**, साथ ही table के ऊपर per-type count chips दिखाता है।

- एक row के details icon को click करें **Registration Details** dialog को खोलने के लिए -- members, selections, paid/balance, और एक **Payments** table listing हर charge (amount, method, date) को।
- **Export CSV** full roster को columns के साथ download करता है members, attendee types, selections, paid/total/balance, status, के लिए, और एक प्रत्येक registration question के लिए column।
- **Add Attendee** अभी भी आपको offline signups को manually record करने देता है।

:::info
Refunds को B1 के अंदर process नहीं किया जाता है। यदि आपको एक cancelled paid registration को refund करने की आवश्यकता है, आपके giving provider के dashboard से refund को issue करें (उदाहरण के लिए Stripe)।
:::

## Payment कैसे काम करता है

Payments आपके church के द्वारा donations के लिए पहले से उपयोग किए जाने वाले same giving gateway के माध्यम से चलते हैं -- card details directly provider के पास जाते हैं और कभी भी B1 के servers को नहीं छूते। Prices हमेशा server से आपके configured types, selections, और discount codes से computed होते हैं, ताकि एक registrant total के साथ tamper न कर सके। Logged-in members एक saved card के साथ pay कर सकते हैं; guests checkout पर एक card enter करते हैं।

## संबंधित लेख

- [Creating Calendars](creating-calendars#enabling-event-registration) -- registration को enable करें और basic settings को
- [Online Giving Setup](../donations/online-giving-setup.md) -- checkout पर उपयोग की जाने वाली payment gateway को configure करें
- [Registering for Events](../../b1-church/events/registering) -- जो members sign up के समय देखते हैं
- [My Registrations](../../b1-church/events/my-registrations) -- कैसे members balances को pay करते हैं और registrations को edit करते हैं
