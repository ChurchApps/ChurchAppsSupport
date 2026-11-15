---
title: "लोग जोड़ना"
description: "B1 Admin में अपने चर्च के डेटाबेस में एक व्यक्ति जोड़ें, उनका विवरण भरें, और check-in और रिपोर्टिंग के लिए परिवार के सदस्यों को households में जोड़ें।"
---

# लोग जोड़ना

<div class="article-intro">

People सेक्शन B1 Admin की नींव है — यह आपके चर्च का सदस्य डेटाबेस है। हर दूसरी सुविधा (groups, attendance, donations, forms) व्यक्ति के रिकॉर्ड से जुड़ती है। यह गाइड आपको अपने डेटाबेस में किसी को जोड़ने, उनका विवरण संपादित करने, और परिवार के सदस्यों को households में जोड़ने की प्रक्रिया बताती है।

</div>

## ट्रेनिंग वीडियो {#training-video}

<YouTube id="GtsczJ8JPio" title="Adding People and Households in B1" next="Importing Your People Database in B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- लोगों को प्रबंधित करने की अनुमति वाला एक सक्रिय B1 Admin account चाहिए। अगर आप अपनी पहुँच के स्तर के बारे में निश्चित नहीं हैं, तो [Roles & Permissions](roles-permissions.md) देखें।
- अगर आप मुट्ठी भर से ज़्यादा लोग जोड़ रहे हैं, तो इसके बजाय [CSV Import](importing-data.md) उपकरण का उपयोग करने पर विचार करें।

</div>

## एक व्यक्ति जोड़ना {#adding-a-person}

1. B1.church Admin dashboard पर जाएँ।
2. [Jump menu](../introduction.md#getting-around-with-the-jump-menu) खोलें (ऊपर-बाईं ओर का सर्च बार), **People** खोलें, और **People** पर क्लिक करें।
3. पेज हेडर में **Add Person** बटन पर क्लिक करें। पेज directory के नीचे **Add a New Person** फ़ॉर्म तक स्क्रॉल हो जाता है।
4. व्यक्ति का **First Name** और **Last Name** भरें (दोनों आवश्यक हैं)। वैकल्पिक रूप से **Title**, **Email**, और **Mobile Phone** जोड़ें, फिर **Add** पर क्लिक करें (या **Enter** दबाएँ)।

B1 व्यक्ति के लिए एक नया household बनाता है, जिसका नाम उनके अंतिम नाम पर रखा जाता है।

व्यक्ति का profile पेज खुलेगा, जहाँ आप और विवरण जोड़ सकते हैं।

:::tip
अगर आप किसी दूसरे चर्च प्रबंधन सिस्टम से आ रहे हैं, तो [Import Data](importing-data.md) सुविधा आपको CSV फ़ाइल से अपनी पूरी directory लाने देती है — एक-एक करके लोग जोड़ने से कहीं तेज़।
:::

### डुप्लिकेट चेतावनियाँ {#duplicate-warnings}

जब आप **Add a New Person** फ़ॉर्म पर email पता दर्ज करते हैं, तो B1 सेव करने से पहले डुप्लिकेट जाँचता है। अगर email पता (या पूरे Edit फ़ॉर्म से व्यक्ति बनाते समय, फ़ोन नंबर या मेल खाते पहला नाम + अंतिम नाम + जन्मतिथि) आपके डेटाबेस में पहले से किसी व्यक्ति से मेल खाता है, तो नया रिकॉर्ड सेव होने से पहले एक **Possible Duplicate** dialog दिखता है। यह हर मेल खाते व्यक्ति को उनके email, फ़ोन, और जन्मतिथि के साथ सूचीबद्ध करता है ताकि आप तुलना कर सकें।

- किसी मेल के आगे **Use Existing** पर क्लिक करें ताकि नया रिकॉर्ड बनाने के बजाय उस व्यक्ति का रिकॉर्ड उपयोग हो।
- **Create Anyway** पर क्लिक करें ताकि संभावित मेल मिलने के बावजूद नया व्यक्ति जुड़ जाए।

यह जाँच केवल तभी होती है जब आप एक बिल्कुल नया व्यक्ति बना रहे हों — मौजूदा रिकॉर्ड का संपादन इसे कभी ट्रिगर नहीं करता। यह केवल नए डुप्लिकेट रोकता है; यह पहले से मौजूद दो रिकॉर्डों को मर्ज नहीं करता।

## विवरण संपादित करना {#editing-details}

1. व्यक्ति के profile पेज पर, **Household** सेक्शन के नीचे बाईं ओर **Edit** बटन पर क्लिक करें।
2. **Personal Details** फ़ॉर्म में अतिरिक्त जानकारी भरें, जैसे **Title** (सूची से Mr, Mrs, Miss, Ms, Dr, Prof, Rev, या Pastor चुनें, या अपना लिखें, 10 अक्षरों तक), मध्य नाम, उपनाम, **Name Tag Notes** (check-in name tags पर छपते हैं और profile पर चेतावनी टैग के रूप में दिखते हैं), **Donor Number**, membership status (**Visitor**, **Guest**, **Regular Attendee**, **Member**, **Staff**, **Inactive**, या **Deceased**), लिंग, वैवाहिक स्थिति, जन्मतिथि और वर्षगाँठ, campus, पता, विस्तार सहित फ़ोन नंबर, और (बच्चों और छात्रों के लिए) कक्षा और स्कूल। व्यक्ति को [छपी हुई directory](./print-directory.md) और ऐप की member directory से बाहर रखने के लिए **Hide me from the member directory** चेक करें। कोई भी [custom fields](../settings/custom-fields.md) **Custom Fields** के अंतर्गत दिखते हैं।
3. निजी जानकारी सेव करने के लिए **Save** पर क्लिक करें, या बिना सेव किए फ़ॉर्म बंद करने के लिए **Cancel** पर क्लिक करें।

अगर आप किसी ऐसे व्यक्ति का पता बदलते हैं जो दूसरों के साथ household साझा करता है, तो B1 पूछता है कि क्या नया पता पूरे household के लिए उपयोग करना है। फ़ॉर्म में एक **Delete** बटन भी है (व्यक्ति को हटाने के लिए) और एक **Data Management** सेक्शन है जिससे व्यक्ति का डेटा निर्यात या गुमनाम किया जा सकता है (देखें [Data Security](../settings/data-security.md#using-the-data-management-tools))।

profile के बाईं ओर व्यक्ति का फ़ोटो, नाम, आयु, लिंग, वैवाहिक स्थिति, campus, membership status, संपर्क विवरण, कोई भी [custom field](../settings/custom-fields.md) मान, और उनका household दिखता है। नाम के नीचे के टैग दिखाते हैं कि व्यक्ति के पास **Has login** (एक B1 account) है, वह **Hidden from directory** है, या उसके name tag notes हैं। household के ऊपर **Added** दिखाता है कि रिकॉर्ड कब बना (केवल अक्टूबर 2026 के अंत से जोड़े गए लोगों के लिए)। फ़ोटो बदलने के लिए उस पर क्लिक करें। household के नीचे **Edit**, **Email**, और **Text** बटन हैं (नीचे देखें) और कुछ और actions: **Workflow** (व्यक्ति को किसी [workflow](../serving/workflows.md) में जोड़ें), **Merge**, **Export**, और **Export Data**। अगर व्यक्ति किसी household का सदस्य है, तो **Pickup** सेक्शन उन लोगों की सूची देता है जिन्हें [check-in](../attendance/checkin-safety.md#trusted-and-not-authorized-pickup-people) पर बच्चों को लेने की अनुमति है।

profile का बाकी हिस्सा हर प्रकार की संबंधित जानकारी के लिए एक सारांश सेक्शन दिखाता है:

- **Attendance** — दिखाता है कि पिछले कुछ हफ़्तों में व्यक्ति कौन से हफ़्ते आया और उसकी सबसे हाल की visits। पूरा visit इतिहास देखने के लिए **All years** पर क्लिक करें, जिसमें campus, service, service time, group, और kiosk check-in समय वाला **Checked In** कॉलम शामिल है (जिन visits में kiosk check-in दर्ज नहीं है, उनके लिए डैश दिखता है), या उसे छापने के लिए **Print** (छपे पन्ने के ऊपर बीच में आपके चर्च का लोगो और नाम होता है, व्यक्ति के नाम के ऊपर)। किसी एक व्यक्ति के इतिहास के बजाय चर्च-व्यापी रुझानों के लिए देखें [Tracking Attendance](../attendance/tracking-attendance.md)
- **Donations** — इस साल के उपहार दिखाता है, जिनमें गैर-कर-कटौती योग्य funds के उपहार भी शामिल हैं। पूरा [donation इतिहास](../donations/recording-donations.md) देखने के लिए **All years** पर क्लिक करें, या नया उपहार दर्ज करने के लिए **Log a gift**। अगर आपके चर्च ने [Giving Privacy](../settings/church-settings.md#giving-privacy) चालू किया है, तो **Show giving** पर क्लिक करने तक राशियाँ छिपी रहती हैं
- **Groups** — व्यक्ति की [group सदस्यताएँ](../groups/group-members.md) सूचीबद्ध करता है, जिसमें **Joined** और हर group में जुड़ने की तारीख (जब वह दर्ज हो) दिखती है
- **Notes** — व्यक्ति के बारे में हाल के notes दिखाता है (pastoral care, follow-ups, आदि)। notes पढ़ने और जोड़ने के लिए **All notes** पर क्लिक करें। हर note दिखाता है कि उसे किसने लिखा और कब पोस्ट किया गया। note को फ़ॉर्मेट करने के लिए note box में टेक्स्ट हाइलाइट करें और छोटे popup से **Bold**, **Italic**, **Bulleted list**, या **Numbered list** चुनें (या **Ctrl+B** / **Ctrl+I** दबाएँ, Mac पर **Cmd**); पोस्ट होने के बाद note फ़ॉर्मेटिंग दिखाता है। note हटाने से पहले पुष्टि माँगी जाती है, क्योंकि यह वापस नहीं हो सकता। सभी लोगों के हाल के notes एक साथ देखने के लिए [Notes](./notes.md) पेज का उपयोग करें
- **Forms** — व्यक्ति के forms और हर एक जमा हुआ है या नहीं, यह सूचीबद्ध करता है (नीचे [Working with Forms](#working-with-forms) देखें)
- **Requests & registrations** — व्यक्ति की कमरे और संसाधन की [event requests](../calendars/approvals.md) (माँगे गए कमरों या संसाधनों और **Pending**, **Approved**, या **Rejected** के साथ) और उनकी [event registrations](../calendars/paid-registrations.md) (कितने लोगों का पंजीकरण किया और **Registered**, **Pending**, **Waitlisted**, या **Cancelled** के साथ), सबसे नए पहले। सबसे हाल की पाँच दिखाई जाती हैं; पूरी सूची के लिए **All requests** पर क्लिक करें। अगर आप [Approvals](../calendars/approvals.md) पेज इस्तेमाल कर सकते हैं तो आप event requests देखते हैं, और अगर आप registrations देख सकते हैं तो registrations; दोनों में से कोई नहीं, तो सेक्शन छिपा रहता है

इनमें से किसी पूर्ण दृश्य को खोलने पर, प्रोफ़ाइल पर लौटने के लिए ऊपर व्यक्ति के नाम वाले **Back to** link पर क्लिक करें।

## व्यक्ति को Email करना {#emailing-a-person}

अगर व्यक्ति का email पता रिकॉर्ड में है, तो profile के बाईं ओर household के नीचे, **Edit** के बगल में एक **Email** बटन दिखता है।

1. व्यक्ति के profile पर, **Email** पर क्लिक करें।
2. व्यक्ति के नाम वाला एक **Email** dialog खुलता है, जिसमें **Sending to** के अंतर्गत व्यक्ति का पता दिखता है।
3. वैकल्पिक रूप से **Load Template (optional)** से सहेजा गया template चुनें।
4. **Subject** दर्ज करें और संदेश लिखें।
5. **Send Email** पर क्लिक करें।

संदेश अपने ही mail प्रोग्राम में लिखने के लिए **Open in my email app** पर क्लिक करें।

:::info
B1 से भेजने पर वही स्वीकृति और दैनिक सीमाएँ लागू होती हैं जो group email पर लागू होती हैं। अगर आपका चर्च अभी स्वीकृत नहीं हुआ है, तो dialog समीक्षा का अनुरोध करने को कहता है — इस बीच आप **Open in my email app** पर क्लिक कर सकते हैं। देखें [Turning On Group Email for Your Church](../groups/group-members.md#turning-on-group-email-for-your-church)। जिन उपयोगकर्ताओं के पास group members संपादित करने की अनुमति नहीं है, वे **Email** पर क्लिक करते ही सीधे अपने email ऐप पर जाते हैं।
:::

## व्यक्ति को Text करना {#texting-a-person}

अगर आपके चर्च का कोई [texting provider](../settings/church-settings.md#texting) जुड़ा है, आपके पास text भेजने की अनुमति है, और व्यक्ति का मोबाइल नंबर है, तो **Email** के बगल में एक **Text** बटन दिखता है। उस पर क्लिक करें, अपना **Message** लिखें, और **Send** पर क्लिक करें। dialog दिखाता है कि text किस नंबर पर जाएगा। texting कैसे काम करती है, इसके लिए देखें [Texting Group Members](../groups/group-members.md#texting-group-members)।

## Forms के साथ काम करना {#working-with-forms}

आप व्यक्ति के profile से सीधे custom forms भर सकते हैं। ये उपयोगकर्ता-परिभाषित forms हैं जिन्हें आप [Creating Forms](../forms/creating-forms.md) गाइड का पालन करके बना सकते हैं।

1. व्यक्ति के profile पर **Forms** सेक्शन ढूँढें। यह हर form को सूचीबद्ध करता है और बताता है कि वह **Submitted** है या **Not submitted**।
2. उसे खोलने के लिए form के नाम पर क्लिक करें (या पूरी सूची देखने के लिए **All forms** पर क्लिक करें)।
3. form पर **edit icon** (पेंसिल) पर क्लिक करें, विवरण भरें, और **Save** पर क्लिक करें।

एक बार form जमा हो जाने पर, उस व्यक्ति के भरे हुए उत्तर छापने के लिए उसके बगल के **print icon** पर क्लिक करें। जब व्यक्ति के किसी form की एक ही submission हो, तो उत्तरों के ऊपर तारीख के साथ form **Submitted** दिखाता है।

अगर कोई submission गलत व्यक्ति के नाम पर दर्ज हो गई, तो उसे किसी और को ले जाने या उसका लिंक हटाने के लिए उसके बगल का **Change person** icon (दो तीर) पर क्लिक करें। देखें [Changing the Person on a Submission](../forms/managing-submissions.md#changing-the-person-on-a-submission)।

:::info
व्यक्ति के profile से जुड़े forms **People** form type का उपयोग करते हैं। अगर आपको एक स्वतंत्र form चाहिए (जैसे event registration), तो forms गाइड में [Stand Alone form option](../forms/creating-forms.md) देखें।
:::

:::tip
अगर आपको लोगों के बारे में केवल एक या दो अतिरिक्त जानकारी ट्रैक करनी है — एक तारीख, एक संख्या, एक हाँ/नहीं उत्तर — तो form के बजाय [Custom Fields](../settings/custom-fields.md) का उपयोग करें। वे भरने में तेज़ हैं और Advanced Search में सीधे खोजे जा सकते हैं।
:::

## Households प्रबंधित करना {#managing-households}

Households आपको परिवार के सदस्यों को एक साथ जोड़ने देते हैं। यह [check-in](../attendance/check-in.md) के लिए विशेष रूप से उपयोगी है, जहाँ एक माता-पिता अपने सभी बच्चों को एक साथ check in कर सकते हैं।

1. व्यक्ति के profile पर, बाईं ओर **Household** शीर्षक के आगे **Edit** पर क्लिक करें।
2. household editor खुलेगा। वर्तमान व्यक्ति के लिए **household role** चुनें (जैसे Head, Spouse, Child, Other)।
3. किसी और household सदस्य को जोड़ने के लिए **Add** आइकन पर क्लिक करें।
4. **Add Household Member** के अंतर्गत खोज बॉक्स में व्यक्ति का नाम टाइप करें और **Enter** दबाएँ या खोज आइकन पर क्लिक करें। (टाइप करने से पहले **Recent people** की एक छोटी सूची दिखती है — वे लोग जिन्हें आपने हाल में किसी भी व्यक्ति खोज में चुना, फिर B1 में सबसे नए लोग।)
5. जब परिणामों में व्यक्ति दिखे, तो उनके नाम या उसके बगल के add आइकन पर क्लिक करें।
6. उनकी household role चुनें और household सेटअप पूरा करने के लिए **Save** पर क्लिक करें।

अगर व्यक्ति अभी B1 में नहीं है, तो खोज के नीचे **Add New Person** पर क्लिक करें। नाम, title, email, और मोबाइल फ़ोन के साथ dialog उनकी **Household Role** (Head, Spouse, Child, या Other) भी पूछता है। नया व्यक्ति बनाया जाता है और उस भूमिका के साथ इस household में रखा जाता है; समाप्त करने के लिए **Save** पर क्लिक करें।
