---
title: "Service Plans"
---

# Service Plans

<div class="article-intro">

Service plans organize करते हैं कि कौन serving कर रहा है और कब। प्रत्येक plan एक specific date और ministry से tied है, जिससे आपके volunteer teams को week by week coordinate करना आसान हो जाता है और सुनिश्चित करता है कि हर service fully staffed है।

</div>

<div class="prereqs">
<h4>शुरुआत से पहले</h4>

- अपने ministries और teams को Serving area में setup करें
- सुनिश्चित करें कि volunteers को आपकी [people directory](../people/adding-people.md) में add किया गया है और teams को assign किया गया है

</div>

## Plans को Access करना

1. Main menu से **Serving** पर navigate करें।
2. पृष्ठ के शीर्ष पर एक **ministry tab** को select करें।
3. उस plan type के लिए plans की list को देखने के लिए एक **plan type** पर click करें।
4. इसे खोलने के लिए एक specific plan पर click करें।

:::info
Plans को manage करने के लिए full admin access की आवश्यकता नहीं है। कोई भी जो एक ministry का member है Serving पर navigate कर सकता है और अपनी ministry के लिए plans को create, edit, और schedule कर सकता है Plans Edit permission की आवश्यकता के बिना। Editors जिनके पास Plans Edit role है हर ministry के लिए plans को manage कर सकते हैं।
:::

## एक Plan बनाना

1. Plan type view से, **New Plan** पर click करें।
2. Plan को एक name दें या date को name के रूप में use करें। Service के लिए **date** को select करें।
3. यदि आप एक previous plan से copy करना चाहते हैं, तो positions only को चुनें या positions और assignments को। यदि आप copy नहीं करना चाहते, तो कुछ न चुनें। आप अपने previous plan से service order को भी copy कर सकते हैं।
4. Plan को save करें। आप अब team members को assign करना शुरू कर सकते हैं और [service order](./service-order.md) को build कर सकते हैं।

## Plan Detail Page

जब आप एक plan खोलते हैं, तो आपको दो tabs दिखाई देते हैं:

- **Assignments** -- Manage करें कि कौन से team members इस plan को assign किए गए हैं। आप अपनी existing teams से लोगों को add कर सकते हैं और देख सकते हैं कि किसने confirm किया है या अभी pending है।
- **[Service Order](./service-order.md)** -- Service को elements जैसे worship songs, prayers, announcements, और sermon के साथ build करें।

## Team Members को Assign करना

1. एक plan खोलें और **Assignments** tab पर जाएं।
2. **add Position** पर click करें इसे expand करने के लिए। Add a position form में information भरें। Category name के लिए जो भी category आप चाहते हैं add करें।
3. **People Needed** पर click करें और उस position को भरने के लिए volunteers को select करें।
4. अपनी team roster से members को **Add** पर click करके add करें।
5. Assigned members उनकी team के तहत दिखाई देंगे उनकी assignment status के साथ।
6. Volunteers को B1 app के भीतर या email के माध्यम से notify करने के लिए notify volunteers पर click करें।

:::tip
Plans को create करने से पहले अपनी teams को ministry settings में setup करें। इस तरह, आपके पास volunteers को assign करने के लिए ready pool होगा।
:::

## Volunteer Reminders

B1 volunteers को automatically remind कर सकता है services से ahead जो वे scheduled हैं, इसलिए आपको हर week अपनी team को chase करने की आवश्यकता नहीं है। Reminders **everyone scheduled** को go करते हैं - both जिन्होंने confirm किया है और जिन्होंने अभी respond नहीं किया है - email और in-app/push notification के द्वारा। प्रत्येक reminder में volunteer की position(s), service date, plan notes, और आपका custom message शामिल है।

Reminder timing और content को **plan type** per set किया जाता है, इसलिए हर तरह की service अपना schedule रख सकता है।

1. **Serving** area से, उस ministry को select करें जो plan type को contain करता है।
2. Plan type के next **edit (pencil) icon** पर click करें।
3. **Reminders** सेक्शन में, set करें:
   - **Reminder days before service** — एक comma-separated list कि कितने दिन ahead को send करें, उदाहरण के लिए `7,1,0`। Service के दिन एक reminder को send करने के लिए `0` use करें। इस plan type के लिए reminders को turn off करने के लिए इस फील्ड को blank छोड़ें।
   - **Custom reminder message** *(optional)* — reminder में जोड़ा गया extra text, जैसे "Arrive 30 minutes early to rehearse."
4. Plan type को save करें।

नई plan types जब तक आप इसे change न करें तब तक volunteers को **2 days before** हर service को remind करते हैं।

:::tip
Volunteers जिन्होंने अभी confirm नहीं किया है उन्हें reminder email के भीतर सीधे **Accept** और **Decline** buttons मिलते हैं, इसलिए वे sign in किए बिना respond कर सकते हैं।
:::

:::info
प्रत्येक reminder एक बार sent होता है। Plans जो अभी भी penciled in हैं (अभी team को send नहीं किए गए हैं) reminders को trigger नहीं करते।
:::

## एक Plan Type के साथ Groups को Associate करना

Plan type page पर plan list के नीचे, **Groups** सेक्शन आपको decide करने देता है कि कौन से groups इस plan type के plans को अपने member portal से देख सकते हैं। यह उन्हें admin access दिए बिना upcoming services को सही teams के पास surface करने का एक quick तरीका है।

1. Plan type page पर, **Groups** सेक्शन तक scroll करें।
2. **Add Group** पर click करें और dropdown से एक group pick करें।
3. **Shows** column में, choose करें कि क्या उस group के members इस plan type के **Past**, **Future**, या **Both** plans को देखेंगे।
4. Additional groups को associate करने के लिए repeat करें, या एक group को remove करने के लिए trash icon पर click करें।

:::info
केवल **Standard** के रूप में tagged groups picker में दिखाई देते हैं। एक associated group के members स्वचालित रूप से B1 member portal में [Plans](/docs/b1-church/plans/) tab पर इस plan type के plans को देखते हैं - past/future/both window तक limited जो आपने select किया था।
:::

## Plans को Print करना

आप अपनी team को distribution के लिए एक plan को print कर सकते हैं। Plan को खोलें, Service order tab को खोलें और printable version generate करने के लिए **Print** option को use करें जो assignments और service order को include करता है। यह rehearsals में hand out करने या एक common area में post करने के लिए उपयोगी है।

:::info
Plans को ministry द्वारा organize किया जाता है। Plans को create या view करने से पहले सुनिश्चित करें कि आप सही ministry tab पर हैं।
:::

## अगले कदम

- Multiple weeks में सभी upcoming assignments को एक single grid में देखने के लिए [Plans Overview](./plans-overview.md) को use करें और unfilled positions को spot करें - और grid से सीधे volunteers को assign करें
- एक plan के structure को एक [Plan Template](./plan-templates.md) के रूप में save करें ताकि आप इसे future plans में एक click में stamp कर सकें
- Songs, readings, और अन्य elements के साथ अपने [Service Order](./service-order.md) को build करें
- Service order में directly अपनी library से [songs](./songs.md) को add करें
- Team members को follow-up action items को assign करने के लिए [Tasks](./tasks.md) को use करें
