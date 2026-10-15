---
title: "लोगों को जोड़ना"
---

# लोगों को जोड़ना

<div class="article-intro">

People section B1 Admin की नींव है -- यह आपके church का member database है। बाकी हर feature (groups, attendance, donations, forms) person records से जुड़ा है। यह guide बताती है कि किसी व्यक्ति को अपने database में कैसे जोड़ें, उनका विवरण कैसे edit करें, और परिवार के सदस्यों को households में कैसे जोड़ें।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- आपको लोगों को प्रबंधित करने की अनुमति वाला एक सक्रिय B1 Admin account चाहिए। यदि आपको अपने access level के बारे में निश्चितता नहीं है, तो [Roles & Permissions](roles-permissions.md) देखें।
- यदि आप कुछ लोगों से अधिक जोड़ रहे हैं, तो इसके बजाय [CSV Import](importing-data.md) tool का उपयोग करने पर विचार करें।

</div>

## एक व्यक्ति जोड़ना

1. B1.church Admin dashboard पर जाएं।
2. [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ऊपर-बाईं ओर का search bar) खोलें, **People** को expand करें, और **People** पर click करें।
3. page के header में **Add Person** button पर click करें। page directory के नीचे **Add New Person** form तक scroll करेगा।
4. व्यक्ति का **First Name**, **Last Name**, और **Email** भरें, फिर **Add** पर click करें।

व्यक्ति का profile page खुलेगा, जहां आप और विवरण जोड़ सकते हैं।

:::tip
यदि आप किसी अन्य church management system से migrate कर रहे हैं, तो [Import Data](importing-data.md) feature आपको CSV file से अपनी पूरी directory लाने देता है -- एक-एक करके लोगों को जोड़ने से कहीं तेज़।
:::

### Duplicate Warnings

यदि email address (या जब full Edit form से कोई व्यक्ति बनाया जा रहा हो, तो phone number या first name + last name + birth date का मिलान) आपके database में पहले से किसी व्यक्ति से मेल खाता है, तो नया record save होने से पहले एक **Possible Duplicate** dialog दिखता है। यह मेल खाने वाले हर व्यक्ति को उनके email, phone, और birth date के साथ सूचीबद्ध करता है ताकि आप तुलना कर सकें।

- किसी match के आगे **Use Existing** पर click करें ताकि नया record बनाने के बजाय उस व्यक्ति का record उपयोग हो।
- संभावित match मिलने के बावजूद नया व्यक्ति जोड़ने के लिए **Create Anyway** पर click करें।

यह duplicates की जाँच केवल तब करता है जब आप बिल्कुल नया व्यक्ति बना रहे हों -- मौजूदा record को edit करने पर यह कभी नहीं चलता। यह केवल नए duplicates को रोकता है; यह पहले से मौजूद दो records को merge नहीं करता।

## विवरण Edit करना

1. व्यक्ति के profile page पर, बाईं ओर उनकी contact details के नीचे **Edit** button पर click करें।
2. **Personal Details** form में अतिरिक्त जानकारी भरें, जैसे middle name, membership status (**Visitor**, **Guest**, **Regular Attendee**, **Member**, **Staff**, **Inactive**, या **Deceased**), तारीखें, address, phone numbers, और (बच्चों और students के लिए) grade और school।
3. व्यक्तिगत जानकारी save करने के लिए **Save** पर click करें।

profile के बाईं ओर व्यक्ति की photo, नाम, membership status, contact details, कोई भी [custom field](../settings/custom-fields.md) values, और उनका household दिखता है। photo बदलने के लिए उस पर click करें। **Edit** button के नीचे कुछ और actions हैं: **Workflow** (व्यक्ति को एक [workflow](../serving/workflows.md) में जोड़ें), **Merge**, **Export**, और **Export Data**।

profile का बाकी हिस्सा संबंधित जानकारी के हर प्रकार के लिए एक सारांश section दिखाता है:

- **Attendance** — दिखाता है कि पिछले कुछ हफ्तों में व्यक्ति कौन-से हफ्तों में उपस्थित था और उनकी सबसे हाल की visits। उनका पूरा visit history देखने के लिए **All years** पर click करें, जिसमें campus, service, service time, group, और एक **Checked In** column शामिल है जिसमें kiosk check-in का समय दिखता है (जिन visits का kiosk check-in दर्ज नहीं है, उनके लिए एक dash दिखता है), या इसे प्रिंट करने के लिए **Print**। किसी एक व्यक्ति के इतिहास के बजाय church-wide trends के लिए, [Tracking Attendance](../attendance/tracking-attendance.md) देखें
- **Donations** — इस साल के gifts दिखाता है, जिसमें non-deductible funds को दिए gifts भी शामिल हैं। उनका पूरा [donation history](../donations/recording-donations.md) देखने के लिए **All years** पर click करें, या नया gift दर्ज करने के लिए **Log a gift** पर click करें। यदि आपके church ने [Giving Privacy](../settings/church-settings.md#giving-privacy) चालू किया है, तो **Show giving** पर click करने तक राशि छिपी रहती है
- **Groups** — व्यक्ति की [group memberships](../groups/group-members.md) सूचीबद्ध करता है
- **Notes** — व्यक्ति के बारे में हाल के notes दिखाता है (pastoral care, follow-ups, आदि)। notes पढ़ने और जोड़ने के लिए **All notes** पर click करें
- **Forms** — व्यक्ति के forms और यह दिखाता है कि हर एक submit हुआ है या नहीं (नीचे [Working with Forms](#working-with-forms) देखें)

इन पूर्ण views में से किसी को खोलने पर, profile पर वापस जाने के लिए ऊपर व्यक्ति के नाम वाले **Back to** link पर click करें।

## किसी व्यक्ति को Email करना

यदि व्यक्ति का email address रिकॉर्ड में है, तो profile के बाईं ओर उनकी contact details के नीचे एक **Email** button दिखता है।

1. व्यक्ति के profile पर, **Email** पर click करें।
2. व्यक्ति के नाम के शीर्षक वाला एक **Email** dialog खुलता है, जिसमें **Sending to** के आगे उनका address दिखता है।
3. वैकल्पिक रूप से **Load Template (optional)** से एक सहेजा गया template चुनें।
4. **Subject** लिखें और संदेश तैयार करें।
5. **Send Email** पर click करें।

संदेश अपने mail program में लिखने के लिए, **Open in my email app** पर click करें।

:::info
B1 से भेजने पर वही approval और daily limits लागू होती हैं जो group email पर लागू होती हैं। यदि आपके church को अभी तक approval नहीं मिला है, तो dialog आपसे review का अनुरोध करने के लिए कहता है -- तब तक आप **Open in my email app** पर click कर सकते हैं। देखें [Turning On Group Email for Your Church](../groups/group-members.md#turning-on-group-email-for-your-church)। जिन users के पास group members edit करने की अनुमति नहीं है, वे **Email** पर click करते ही सीधे अपने email app पर जाते हैं।
:::

## Forms के साथ काम करना

आप किसी व्यक्ति के profile से सीधे custom forms भर सकते हैं। ये user-defined forms हैं, जिन्हें आप [Creating Forms](../forms/creating-forms.md) guide का पालन करके बना सकते हैं।

1. व्यक्ति के profile पर, **Forms** section खोजें। वह हर form सूचीबद्ध करता है और यह भी कि उसे **Submitted** किया गया है या **Not submitted**।
2. किसी form का नाम click करके उसे खोलें (या पूरी सूची देखने के लिए **All forms** पर click करें)।
3. form पर **edit icon** (पेंसिल) पर click करें, विवरण भरें, और **Save** पर click करें।

एक बार form submit हो जाने पर, उस व्यक्ति के भरे हुए उत्तर प्रिंट करने के लिए उसके बगल में **print icon** पर click करें।

यदि कोई submission गलत व्यक्ति के नाम पर दर्ज हो गई है, तो उसे किसी और को ले जाने या उसका link हटाने के लिए उसके बगल में **Change person** icon (दो तीर) पर click करें। देखें [Changing the Person on a Submission](../forms/managing-submissions.md#changing-the-person-on-a-submission)।

:::info
व्यक्ति के profile से जुड़े forms **People** form type का उपयोग करते हैं। यदि आपको standalone form चाहिए (जैसे event registration), तो forms guide में [Stand Alone form option](../forms/creating-forms.md) देखें।
:::

:::tip
यदि आपको लोगों के बारे में केवल एक या दो अतिरिक्त जानकारी ट्रैक करनी है -- एक तारीख, एक संख्या, एक हां/नहीं उत्तर -- तो form के बजाय [Custom Fields](../settings/custom-fields.md) का उपयोग करें। वे भरने में तेज़ हैं और सीधे Advanced Search में खोजे जा सकते हैं।
:::

## Households प्रबंधित करना

Households परिवार के सदस्यों को आपस में जोड़ने देते हैं। यह [check-in](../attendance/check-in.md) के लिए विशेष रूप से उपयोगी है, जहां कोई माता-पिता अपने सभी बच्चों को एक साथ check in कर सकते हैं।

1. किसी व्यक्ति के profile पर, बाईं ओर **Household** heading के आगे **Edit** पर click करें।
2. household editor खुलेगा। वर्तमान व्यक्ति के लिए **household role** चुनें (जैसे, Head, Spouse, Child, Other)।
3. एक और household सदस्य जोड़ने के लिए **Add** icon पर click करें।
4. **Add Household Member** के अंतर्गत, search box में व्यक्ति का नाम टाइप करें और **Enter** दबाएं या search icon पर click करें। (टाइप करने से पहले **Recent people** की एक छोटी सूची दिखती है।)
5. जब व्यक्ति परिणामों में दिखे, तो उनके नाम पर या उसके बगल के add icon पर click करें।
6. उनका household role चुनें और household setup पूरा करने के लिए **Save** पर click करें।
