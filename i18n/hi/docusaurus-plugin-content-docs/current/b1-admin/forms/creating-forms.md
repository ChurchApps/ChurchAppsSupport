---
title: "Forms बनाना"
---

# Forms बनाना

<div class="article-intro">

अपने congregation से जानकारी इकट्ठा करने के लिए custom forms बनाएं। आप event registrations, surveys, visitor cards, membership applications, और अन्य के लिए forms बना सकते हैं। Forms आपके database के people से जोड़े जा सकते हैं या अपने स्वयं के public URL वाले standalone pages के रूप में उपयोग किए जा सकते हैं।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- **People** forms (person records से जुड़े) के लिए, पहले आपके database में [people](../people/adding-people.md) होने चाहिए।
- जो forms **payments** इकट्ठा करते हैं, उनके लिए [online giving के लिए Stripe कॉन्फ़िगर](../donations/online-giving-setup.md) होना चाहिए।

</div>

## नया Form बनाना

1. [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (B1 Admin में ऊपर-बाईं ओर का search bar) खोलें, **People** को expand करें, और **Forms** पर click करें।
2. **Add Form** पर click करें।
3. अपने form के लिए एक **name** लिखें।
4. dropdown से form type चुनें:
   - **People** — submissions को आपके database में [people records](../people/adding-people.md) से जोड़ता है।
   - **Stand Alone** — अपने स्वयं के public URL के साथ एक स्वतंत्र form बनाता है, जो बाहरी registrations के लिए उपयुक्त है।
5. form बनाने के लिए **Save** पर click करें।

आपका नया form सूची में दिखाई देगा। सवाल जोड़ना शुरू करने के लिए उस पर click करें।

## खाली Form प्रिंट करना {#printing-a-blank-form}

किसी को बांटने के लिए कागज़ की प्रति चाहिए -- जैसे welcome desk पर visitor card, या ऐसा form जिसे इंटरनेट न होने वाला कोई व्यक्ति हाथ से भर सके? मुख्य Forms list पर किसी form के आगे **Print** पर click करें ताकि preview खुले, फिर **Print** पर click करें। खाली fields में हर सवाल के लिए एक underline या checkbox प्रिंट होता है ताकि लोग उन्हें हाथ से भर सकें; आवश्यक सवालों पर एक asterisk (*) लगा होता है। पेज के ऊपर आपके church का logo दिखता है ([Website > Appearance](../website/appearance.md) से **Light Background Logo**, यदि आपने एक अपलोड किया है), उसके नीचे आपके church का नाम, फिर form का नाम। कोई अन्य print options नहीं हैं -- या तो पूरा form प्रिंट करें या कुछ नहीं।

## सवाल जोड़ना {#adding-questions}

1. अपना form खोलें और **Questions** tab पर जाएं।
2. **Add Question** पर click करें।
3. Provider dropdown से **field type** चुनें। उपलब्ध types में शामिल हैं:
   - **Textbox** — छोटे text उत्तरों के लिए
   - **Date** — तारीख चुनने के लिए
   - **Email** — email addresses के लिए
   - **Phone Number** — phone input के लिए
   - **Multiple Choice** — पूर्व-निर्धारित विकल्पों में से चुनने के लिए
   - **Payment** — payments इकट्ठा करने के लिए
4. सवाल के लिए एक **Title** और वैकल्पिक **Description** लिखें। लोग form भरते समय description सवाल के नीचे दिखती है, इसलिए इसका उपयोग "Include any allergies we should know about." जैसे संकेतों के लिए करें।
5. यदि field अनिवार्य है तो **Require an answer** पर checkmark लगाएं।
6. **Save** पर click करें।
7. और सवाल जोड़ने के लिए दोहराएं।

:::warning
**Payment** field type के लिए Stripe का कॉन्फ़िगर होना आवश्यक है। यदि आपने अभी तक online giving सेट नहीं किया है, तो payment fields जोड़ने से पहले [Online Giving Setup](../donations/online-giving-setup.md) देखें।
:::

## Form Members प्रबंधित करना

1. अपना form खोलें और **Form Members** tab पर जाएं।
2. किसी व्यक्ति को खोजें और एक role के साथ जोड़ें:
   - **Admin** — form संपादित कर सकता है और सभी submissions देख सकता है।
   - **View Only** — submissions देख सकता है, लेकिन form संपादित नहीं कर सकता।

## Submitters को स्वतः किसी Group में जोड़ना {#automatically-adding-submitters-to-a-group}

जब **Create a person record from submissions** सक्षम हो, तो आप form को एक group से भी जोड़ सकते हैं ताकि हर submitter उस group की roster में अपने-आप जुड़ जाए:

1. अपने form के **Details** खोलें, और **Create a person record from submissions** चालू करें।
2. **Add submitters to a group** के अंतर्गत, वह group चुनें जिसमें submitters को जोड़ना है, या उसे **None** पर छोड़ दें।
3. **Save** पर click करें।

हर बार कोई form submit करता है, तो मिलने वाला या नया बना व्यक्ति group में जुड़ जाता है (जो लोग पहले से group के सदस्य हैं, उन्हें छोड़ दिया जाता है)। यह उन चीज़ों के लिए उपयोगी है जैसे camp sign-up form, जो camp की roster group अपने-आप बनाए।

### Follow-up Email भेजना {#sending-a-follow-up-email}

**Create a person record from submissions** चालू होने पर, आप form submit करने वाले हर व्यक्ति को email भी भेज सकते हैं। form के details में **Follow-up Email Subject** और **Follow-up Email Body** भरें। आप दोनों में `{firstName}` और `{churchName}` tokens का उपयोग कर सकते हैं। email केवल तभी भेजा जाता है जब दोनों fields भरे हों।

:::info
Follow-up emails केवल तब भेजे जाते हैं जब आपके church को group email भेजने की अनुमति मिल चुकी हो, और वे आपके church की daily email limit में गिने जाते हैं। देखें [Turning On Group Email for Your Church](../groups/group-members.md#turning-on-group-email-for-your-church)।
:::

## Form की प्रति बनाना (Duplicate)

किसी form को नए form के आधार के रूप में दोबारा उपयोग करने के लिए, Forms list में form के आगे **Duplicate** पर click करें और पुष्टि करें। B1 form की बिल्कुल एक प्रति बनाता है -- सभी सवालों सहित -- जिसका नाम आप बदल सकते हैं और स्वतंत्र रूप से edit कर सकते हैं।

:::tip
Duplicate करना उन recurring events के लिए सुविधाजनक है जहां registration सवाल हर साल एक जैसे रहते हैं। पिछले साल का form duplicate करें, नाम और तारीखें अपडेट करें, और आप तैयार हैं।
:::

## Form Properties कॉन्फ़िगर करना

आप किसी भी समय अपने form का नाम और settings अपडेट कर सकते हैं। Stand Alone forms के लिए, आपको एक अनोखा **public URL** भी दिखेगा जिसे आप किसी के साथ भी साझा कर सकते हैं, साथ में एक **Description** field भी -- यह public form page पर सवालों के ऊपर दिखने वाला text है, जो लोगों को भरना शुरू करने से पहले बताता है कि form किस लिए है।

**Thank You Message** field का उपयोग यह सेट करने के लिए करें कि form submit करने के बाद लोग क्या देखें, जिसमें form के public URL page पर भी शामिल है। यदि इसे खाली छोड़ते हैं, तो वे "Thank you for submitting the form!" देखते हैं।

:::tip
Stand Alone forms event registrations के लिए बेहतरीन हैं। public URL email, social media पर साझा करें, या form को सीधे अपनी church website पर embed करें।
:::

:::info
अपनी B1 website पर form embed करने के लिए, अपने website editor में जाएं, एक नया section जोड़ें, और **Form** element चुनें। फिर वह form चुनें जिसे आप दिखाना चाहते हैं। अपनी website संपादित करने के विवरण के लिए [Managing Pages](../website/managing-pages.md) देखें।
:::
