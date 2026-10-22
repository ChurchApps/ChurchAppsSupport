---
title: "वर्कफ़्लो"
---

# वर्कफ़्लो {#workflows}

<div class="article-intro">

वर्कफ़्लो एक visual board पर लोगों को कदम-दर-कदम आगे बढ़ाते हैं। हर व्यक्ति एक card बन जाता है जो एक step से अगले step तक जाता है — पहली बार आए guest के follow-up से लेकर membership प्रक्रिया और पहली बार दान देने वाले के धन्यवाद तक, और हर उस स्थिति तक जहां आपको एक ही चरणों से कई लोगों को गुजारकर नज़र रखनी हो। कोई step volunteer से कुछ करने को कह सकता है (फ़ोन करना, बातचीत करना) **और** अपने-आप स्वचालित क्रियाएं चला सकता है — email या text भेजना, कुछ दिन इंतज़ार करना, व्यक्ति को group में जोड़ना — इसलिए वर्कफ़्लो मानवीय follow-up और उसके आसपास के दोहराव वाले काम, दोनों को संभालते हैं। वर्कफ़्लो [Tasks](./tasks.md) को एक drag-and-drop Kanban board में बढ़ाते हैं, ताकि कोई भी चीज़ या कोई भी व्यक्ति छूटने न पाए।

</div>

<div class="prereqs">
<h4>शुरुआत करने से पहले</h4>

- सुनिश्चित करें कि जिन लोगों को आप ट्रैक करना चाहते हैं, वे B1 Admin में मौजूद हैं
- [Tasks](./tasks.md) कैसे काम करते हैं, इससे परिचित हो जाएं, क्योंकि board पर हर card एक task है
- **Send email** क्रिया उपयोग करने के लिए, पहले वे email templates बनाएं जो आप भेजना चाहते हैं (जो **Settings → Email Templates** के अंतर्गत प्रबंधित होते हैं)
- **Send text** क्रिया उपयोग करने के लिए, पहले एक [टेक्स्टिंग प्रदाता](../settings/church-settings.md#texting) जोड़ें
- आपको उपयुक्त Tasks अनुमति चाहिए। कार्ड देखना, कार्ड संपादित करना, और वर्कफ़्लो प्रबंधित करना अलग-अलग अनुमति स्तर हैं (देखें [भूमिकाएं और अनुमतियां](../settings/roles-permissions.md))

</div>

## वर्कफ़्लो देखना {#viewing-workflows}

[Jump menu](../introduction.md#getting-around-with-the-jump-menu) खोलें (B1 Admin के ऊपर-बाएं कोने में खोज बार), **Serving** को expand करें, और **Workflows** पर click करें। आपके वर्कफ़्लो एक table में सूचीबद्ध होंगे, जिसमें हर एक की **Category** और **Status** (**Active** या **Inactive**) दिखेगी। यदि आप categories उपयोग करते हैं, तो सूची के ऊपर के tabs आपको category के अनुसार उसे filter करने देते हैं। किसी भी वर्कफ़्लो का board खोलने के लिए उस पर click करें।

## वर्कफ़्लो बनाना {#creating-a-workflow}

1. Workflows पेज पर, **Add Workflow** पर click करें।
2. शुरू करने का तरीका चुनें:
   - **Blank workflow** -- शुरू से शुरू करें और अपने steps खुद बनाएं।
   - **From a template** -- एक तैयार steps का set लें जिसे आप संपादित कर सकते हैं। अंतर्निर्मित templates में शामिल हैं:
     - **New Visitor Follow-up** -- स्वागत email भेजें → व्यक्तिगत फ़ोन कॉल → अगले step के लिए आमंत्रित करें → Connected
     - **Membership Class** -- रुचि व्यक्त करें → class के लिए register करें → class में भाग लें → membership पूरी करें
     - **First-time Giver Thank-you** -- धन्यवाद नोट भेजें → giving के प्रभाव को साझा करें → Stewarded
3. वर्कफ़्लो को एक **Name** दें।
4. संबंधित वर्कफ़्लो को एक साथ रखने के लिए वैकल्पिक रूप से **Category** चुनें। आप dropdown से सीधे नई category बना सकते हैं।
5. लोगों को उसमें जोड़ा जा सके इसके लिए वर्कफ़्लो को **Active** रखें, या add-to-workflow सूचियों से छिपाने के लिए **Inactive** करें।
6. **Save** पर click करें।

:::tip
किसी मौजूदा वर्कफ़्लो को नए वर्कफ़्लो के आरंभिक बिंदु के रूप में कॉपी करने के लिए Workflows सूची पर **Duplicate** button उपयोग करें — इसमें उसके steps, स्वचालित क्रियाएं, और routing शामिल होते हैं।
:::

## Steps के साथ बोर्ड बनाना {#building-the-board-with-steps}

हर वर्कफ़्लो बोर्ड **steps** से बनता है, जो बाएं से दाएं columns के रूप में दिखते हैं। एक वर्कफ़्लो खोलें और अपनी प्रक्रिया का हर चरण बनाने के लिए **Add Step** उपयोग करें।

जब आप कोई step जोड़ते या संपादित करते हैं, तो आप ये कॉन्फ़िगर कर सकते हैं:

- **Step Name** -- column का शीर्षक (जैसे "Welcome Call" या "Awaiting Registration")।
- **Due in (days)** -- जब कोई card इस step में प्रवेश करता है, तो अपने-आप due date सेट करता है। जिन cards की due date निकल चुकी है, उन्हें **Overdue** चिह्नित किया जाता है।
- **Default assignee** -- वह व्यक्ति या group जिसे इस step पर नए cards अपने-आप असाइन होते हैं। जब default assignee एक व्यक्ति हो, तो उसे सूचना मिलती है कि एक card उसे असाइन किया गया है।
- **Automated actions** -- वे काम जो सिस्टम किसी card के आने पर अपने-आप करता है (नीचे देखें)।
- **Routing** -- card step छोड़ते समय कहां जाता है (देखें [Routing](#routing-cards-with-outcomes-and-conditions))।

अपनी प्रक्रिया से मेल खाने वाले क्रम में step columns को drag करें। यह क्रम उस default रास्ते को भी परिभाषित करता है जिस पर card तब चलता है जब कोई अन्य routing लागू नहीं होती।

:::info
पहले एक नया step save करें। स्वचालित क्रियाएं और routing step से जुड़ते हैं, इसलिए step बन जाने के बाद ही editor उन सेक्शनों को खोलता है।
:::

## स्वचालित क्रियाएं {#automated-actions}

हर step में **स्वचालित क्रियाओं** की एक सूची हो सकती है, जो किसी card के step में **प्रवेश** करते ही अपने-आप चलती हैं — किसी के उसे छूने से पहले। इसी तरह एक step volunteer को सूचित भी करता है और उसके आसपास के नियमित काम भी संभालता है।

step editor में, **Automated actions** खोलें, **Add Action** पर click करें, एक प्रकार चुनें, उसकी settings भरें, और उस action के save icon पर click करें। जितनी चाहें उतनी जोड़ें; वे **ऊपर से नीचे क्रम में** चलती हैं।

| क्रिया | यह क्या करती है |
|---|---|
| **Send email** | व्यक्ति को आपके चुने हुए email template से email भेजता है। आप subject line को बदल सकते हैं। |
| **Send text** | आपके लिखे संदेश का text व्यक्ति को भेजता है, आपके church के [टेक्स्टिंग प्रदाता](../settings/church-settings.md#texting) के माध्यम से। |
| **Wait** | जारी रहने से पहले card को कुछ दिनों के लिए रोकता है (नीचे देखें)। |
| **Add to group** | व्यक्ति को आपके चुने हुए [group](../groups/index.md) में जोड़ता है। |
| **Remove from group** | व्यक्ति को आपके चुने हुए group से हटाता है। |
| **Add to workflow** | व्यक्ति को किसी दूसरे वर्कफ़्लो में शुरू करता है -- प्रक्रियाओं के बीच हस्तांतरण के लिए उपयोगी। |
| **Add note** | card के इतिहास में एक note दर्ज करता है। |
| **Set field** | व्यक्ति के record पर एक field अपडेट करता है: Membership Status, Marital Status, Gender, City, State, या Zip। |
| **Webhook** | card का विवरण आपके दिए गए बाहरी web address (URL) पर भेजता है, अन्य सिस्टम से जोड़ने के लिए। |
| **Create task** | आपके दर्ज किए गए शीर्षक और विवरण के साथ एक [task](./tasks.md) बनाता है, जो आपके चुने व्यक्ति को असाइन होता है। |

किसी step की सभी क्रियाएं पूरी होने के बाद, card **उसी step पर टिका रहता** है ताकि कोई व्यक्ति उस पर काम कर सके — जब तक कि step में कोई स्वचालित route न हो जो उसे आगे न बढ़ा दे (देखें [पूरी तरह स्वचालित steps](#fully-automated-steps))।

:::info
स्वचालित क्रियाएं केवल तब चलती हैं जब card सामान्य प्रवाह से आता है — जब वह पहली बार जोड़ा जाता है, जब कोई outcome या स्वचालित route उसे लाता है, या Wait पूरा होने के बाद। जब कोई staff सदस्य card को मैन्युअल रूप से step पर खींचता है या वापस भेजता है, तो ये **दोबारा** नहीं चलतीं, ताकि किसी व्यक्ति को एक ही email दो बार न मिले।
:::

### Email भेजना {#sending-email}

**Send email** चुनें, अपने email templates में से एक चुनें, और वैकल्पिक रूप से एक कस्टम subject लिखें। जब कोई card step में प्रवेश करता है, तो व्यक्ति को वह email अपने-आप मिलता है। (यदि व्यक्ति का रिकॉर्ड में email address नहीं है, तो step बस इस क्रिया को छोड़ देता है।) template में [मर्ज फ़ील्ड्स](../settings/email-templates.md#merge-fields), जैसे `{{firstName}}`, व्यक्ति के अपने विवरण से भरे जाते हैं।

:::info
वर्कफ़्लो email केवल तभी भेजे जाते हैं जब आपकी church को group email भेजने की स्वीकृति मिल चुकी हो, और वे आपकी church की दैनिक email सीमा में गिने जाते हैं। देखें [आपकी church के लिए group email चालू करना](../groups/group-members.md#turning-on-group-email-for-your-church)।
:::

### Text भेजना {#sending-a-text}

**Send Text** चुनें और **Text message** लिखें (अधिकतम 1,600 अक्षर)। जब कोई card step में प्रवेश करता है, तो व्यक्ति को वह text उसके mobile phone पर मिलता है। आप संदेश को `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, या `{{churchName}}` के साथ personalize कर सकते हैं, जो text भेजे जाने के समय व्यक्ति के विवरण से भरे जाते हैं।

- यदि व्यक्ति का mobile phone रिकॉर्ड में नहीं है, तो कोई text नहीं भेजा जाता और card के इतिहास में **Text skipped: no mobile phone** दर्ज होता है।
- यदि व्यक्ति opt out कर चुका है, तो कोई text नहीं भेजा जाता और card के इतिहास में **Text skipped: opted out** दर्ज होता है।
- जब text भेज दिया जाता है, तो card के इतिहास में **Text sent** दर्ज होता है। यदि भेजना विफल होता है — उदाहरण के लिए, कोई texting provider जुड़ा नहीं है या आपके church के texting credits समाप्त हो गए हैं — तो विफलता card के इतिहास में लॉग होती है और step की बाकी क्रियाएं फिर भी चलती हैं।

:::warning
Texts आपके church के अपने [टेक्स्टिंग प्रदाता](../settings/church-settings.md#texting) के माध्यम से भेजे जाते हैं। यदि कोई provider जुड़ा नहीं है, तो action editor चेतावनी देता है *"No texting provider is set up"* और texts नहीं भेजे जाएंगे।
:::

### कुछ दिनों तक इंतज़ार करना (drip sequences) {#waiting-a-few-days-drip-sequences}

**Wait** क्रिया card को आपके सेट किए गए दिनों के लिए रोके रखती है। जब तक वह इंतज़ार कर रहा है, card **Snoozed** दिखता है। B1 हर 30 मिनट में पूरे हुए waits की जांच करता है, इसलिए wait खत्म होने के लगभग आधे घंटे के भीतर card फिर से आगे बढ़ता है। wait खत्म होने के बाद:

1. **उसी step की बाकी सभी क्रियाएं** चलती हैं — ताकि आप एक drip बना सकें जैसे **Send email → Wait 3 days → Send a reminder email**।
2. फिर, यदि step में कोई स्वचालित route है, तो card आगे बढ़ जाता है; अन्यथा वह किसी व्यक्ति के उठाने के लिए step पर टिका रहता है।

:::tip
किसी step की बिल्कुल शुरुआत में एक **Wait** लगाना किसी card को किसी volunteer के सामने आने से पहले "रोकने" का एक सरल तरीका है — उदाहरण के लिए, *7 दिन रुकें, फिर एक coach संपर्क करता है*।
:::

## लोगों को cards के रूप में जोड़ना {#adding-people-as-cards}

बोर्ड पर लोगों को रखने के कई तरीके हैं:

- **बोर्ड से** -- किसी step column के नीचे **Add Card** पर click करें और एक व्यक्ति चुनें। आप एक group भी चुन सकते हैं, और उस group का हर सदस्य एक card के रूप में जुड़ जाएगा।
- **किसी व्यक्ति के record से** -- किसी व्यक्ति के पेज पर **Add to Workflow** उपयोग करके उसे एक वर्कफ़्लो में डालें।
- **People search से** -- कई लोगों को चुनें और एक साथ सभी को जोड़ने के लिए बल्क **Add to Workflow** क्रिया उपयोग करें।
- **Trigger के साथ अपने-आप** -- जब कुछ होता है, जैसे form submission या पहला दान, तब लोगों को जोड़ें (नीचे [ट्रिगर्स](#triggers) देखें)।

## बोर्ड पर काम करना {#working-the-board}

किसी वर्कफ़्लो का बोर्ड देखने के लिए उसे खोलें। हर card पर व्यक्ति का नाम, उसे किसे असाइन किया गया है, और एक due-date या status chip (**Overdue** या **Snoozed**) दिखता है। एक step column पर उस step द्वारा चलाई जाने वाली स्वचालित क्रियाओं के छोटे badges और उसके routing के annotations भी दिखते हैं, जिससे आप एक नज़र में देख सकते हैं कि cards कैसे आगे बढ़ते हैं।

- **Card को ले जाएं** -- व्यक्ति की प्रगति के साथ card को एक column से अगले column में drag करें।
- **Card खोलें** -- card पर double-click करें (या उस पर click करें) ताकि उसका detail drawer खुले, जहां आप step बदल सकते हैं, उसे फिर से असाइन कर सकते हैं, notes जोड़ सकते हैं, और अब तक जो हो चुका है उसे देख सकते हैं।

card drawer से आप यह कर सकते हैं:

- Card को किसी दूसरे व्यक्ति या group को **Assign** करें।
- Card को 1 दिन, 3 दिन, या 1 हफ्ते के लिए **Snooze** करें ताकि उसकी due date अस्थायी रूप से छिप जाए।
- पिछले step पर **Send Back** करें या अगले step पर **Skip** करें।
- **Pin assignment** -- card के step बदलने पर भी उसका वही owner रखें। डिफ़ॉल्ट रूप से, card को नए step पर ले जाने पर वह उस step के default assignee को फिर से असाइन हो जाता है; pin करने से मौजूदा व्यक्ति पूरे समय ज़िम्मेदार रहता है।
- Card को पूरा करने के लिए **Complete** करें, या यदि step में outcomes कॉन्फ़िगर हैं तो एक **Outcome** button चुनें (देखें [Routing](#routing-cards-with-outcomes-and-conditions))।
- **Add notes** करें और card की **Activity** देखें -- स्वचालित क्रियाओं का लॉग (भेजे गए emails, waits, आदि)।

किसी व्यक्ति के card के लिए, drawer उस व्यक्ति का mobile phone और email भी links के रूप में दिखाता है, जिन पर tap करके आप उन्हें call या email कर सकते हैं, और यदि आपको लोगों को देखने की अनुमति है तो **View profile** link भी। जिस व्यक्ति को card असाइन है, वह People तक पहुंच न होने पर भी phone और email देखता है।

Notes card के साथ सेव होते हैं। जो भी व्यक्ति card खोल सकता है — जिसमें वह व्यक्ति या group शामिल है जिसे वह असाइन है — notes पढ़ सकता है और अपने notes जोड़ सकता है। जो लोग card नहीं खोल सकते, वे उसके notes नहीं देख सकते।

### बल्क क्रियाएं {#bulk-actions}

एक साथ कई cards पर काम करने के लिए उनके checkboxes चुनें। एक toolbar दिखेगा जिससे आप सभी चुने हुए cards के लिए एक साथ **Complete**, **Snooze**, **Assign** (पुनः असाइन), या किसी दूसरे step पर **Move to…** कर सकते हैं।

## Outcomes और शर्तों के साथ cards को रूट करना {#routing-cards-with-outcomes-and-conditions}

Routing नियंत्रित करता है कि card किसी step को छोड़ते समय कहां जाता है। दो प्रकार की routing कॉन्फ़िगर करने के लिए step का editor खोलें।

### Outcome buttons {#outcome-buttons}

Outcomes वे buttons हैं जो उस step पर card पूरा करते समय card drawer में दिखते हैं। एक single **Complete** button के बजाय, आप "Joined a Group" या "Not Interested" जैसे विकल्प दे सकते हैं। हर outcome यह कर सकता है:

- Card को इसी वर्कफ़्लो में **किसी दूसरे step** पर भेजें,
- Card को पूरी तरह किसी दूसरे वर्कफ़्लो को **हस्तांतरित** करें, या
- Card को **बंद** करें।

इससे एक ही निर्णय व्यक्ति को अलग-अलग रास्तों पर ले जा सकता है।

### स्वचालित routing (शर्तीय) {#automatic-routing-conditional}

स्वचालित routes card को **उसी क्षण** आगे बढ़ाते हैं जब वह किसी step में प्रवेश करता है (और उसकी स्वचालित क्रियाएं पूरी होने के बाद), बिना किसी के click किए, यदि व्यक्ति शर्तों के एक set से मेल खाता है। एक route जोड़ें, लक्ष्य step चुनें, और एक या अधिक **conditions** परिभाषित करें (जैसे व्यक्ति का campus, आयु, या सदस्यता स्थिति)। Text फ़ील्ड्स का मिलान सटीक रूप से या **contains**, **starts with**, या **ends with** से किया जा सकता है। बिना conditions वाला route सभी से मेल खाता है।

यदि किसी route की conditions किसी कारण से जांची नहीं जा सकतीं, तो वह route मेल न खाने वाला माना जाता है। Card उसी step पर टिका रहता है (या कोई दूसरा मेल खाने वाला route फॉलो करता है), बजाय इसके कि वह अटक जाए।

:::info
बोर्ड पर, हर step column अपनी routing का वर्णन करने वाले छोटे annotations दिखाता है — जैसे एक outcome label या "if matches", इसके बाद गंतव्य step या वर्कफ़्लो की ओर एक तीर।
:::

## पूरी तरह स्वचालित steps {#fully-automated-steps}

आप किसी step को बिना किसी के उस पर काम किए, पूरी तरह अपने-आप चला सकते हैं। step को उसकी **स्वचालित क्रियाएं** दें और अगले step की ओर इशारा करने वाला एक **स्वचालित route** (बिना conditions के) जोड़ें। जब कोई card प्रवेश करता है, तो क्रियाएं चलती हैं, और फिर route उसे तुरंत आगे बढ़ा देता है — card सीधे निकल जाता है।

:::tip
इसे **Wait** के साथ मिलाएं: *स्वागत email भेजें → 3 दिन रुकें → अपने-आप "Personal call" step पर आगे बढ़ें।* email और समय आपके लिए संभाले जाते हैं, और volunteer को card तभी दिखता है जब मानवीय संपर्क का समय आए।
:::

## ट्रिगर्स {#triggers}

ट्रिगर्स किसी घटना के होने पर लोगों को अपने-आप वर्कफ़्लो में जोड़ते हैं, ताकि आपको cards हाथ से कभी न जोड़ने पड़ें। वर्कफ़्लो बोर्ड पर, **Triggers** tab पर click करें, फिर **Add Trigger**। दो प्रकार होते हैं:

### Event triggers {#event-triggers}

B1 में कोई record बदलते ही चालू हो जाते हैं। घटना चुनें, फिर वैकल्पिक रूप से **conditions** जोड़ें ताकि केवल मेल खाने वाले लोग जुड़ें:

- **Person · Created / Updated** -- जैसे, किसी भी ऐसे व्यक्ति को जोड़ें जिसकी स्थिति *Visitor* बन जाती है।
- **Donation · Created** -- जैसे, पहले बार या बड़े दान को धन्यवाद वर्कफ़्लो में जोड़ें (राशि, fund, या method के आधार पर मिलान करें)।
- **Group · Member Joined** / **Group · Created**।
- **Form · Submitted** -- किसी भी ऐसे व्यक्ति को जोड़ें जो चुना हुआ form जमा करे (एक "I'm New" या "Connect" card के लिए बढ़िया)।

### Schedule triggers {#schedule-triggers}

किसी set की conditions के विरुद्ध दैनिक, साप्ताहिक, मासिक, या वार्षिक आधार पर चलते हैं। इनका उपयोग समय-आधारित outreach के लिए करें, जैसे *जिस व्यक्ति की सदस्यता वर्षगांठ आज है* या एक *मासिक* check-in।

किसी भी trigger के लिए आप यह भी सेट कर सकते हैं:

- **Starting step** -- जहां नया card पहुंचता है (डिफ़ॉल्ट पहला step है)।
- **Only once per person** -- ताकि वही व्यक्ति trigger द्वारा वर्कफ़्लो में दो बार न जुड़े।
- **Active** -- trigger को बिना हटाए चालू या बंद करें।

:::tip
एक **Form · Submitted** trigger को **New Visitor Follow-up** template के साथ जोड़ें, ताकि आपका "Connect Card" या "I'm New" form एक स्वचालित follow-up pipeline बन जाए।
:::

## मेरे Cards {#my-cards}

Volunteers और staff को अपना काम खोजने के लिए हर बोर्ड नहीं खंगालना पड़ता। **My Work** पेज पर **My Cards** सूची वर्तमान उपयोगकर्ता को सभी वर्कफ़्लो में असाइन हर card दिखाती है। वहां पहुंचने के लिए, Workflows पेज के ऊपर **My Cards** पर click करें, या Jump menu में **Serving > My Work** खोलें। किसी card पर click करने से वह बोर्ड खुलता है जिसका वह हिस्सा है।

## रिपोर्ट्स {#reports}

कोई वर्कफ़्लो खोलें और उसकी analytics देखने के लिए **Reports** पर click करें:

- **Overdue** -- उन cards की संख्या जिनकी due date निकल चुकी है।
- **Cards per Step** -- हर step पर अभी कितने cards हैं, column chart के रूप में दिखाए गए।
- **Completed (30 days)** -- पिछले 30 दिनों का throughput, line chart के रूप में दिखाया गया।

इनका उपयोग रुकावटों (bottlenecks) को पहचानने के लिए करें — उदाहरण के लिए, एक step जहां cards जमा होते रहते हैं और आगे नहीं बढ़ते।

## संबंधित लेख {#related-articles}

- [Tasks](./tasks.md) -- वे व्यक्तिगत कार्य जिन पर वर्कफ़्लो cards बने होते हैं
- [Forms](../forms/index.md) -- वे forms बनाएं जो वर्कफ़्लो को ट्रिगर कर सकते हैं
- [Groups](../groups/index.md) -- वे groups जिनमें "Add to group" क्रिया लोगों को रख सकती है
- [भूमिकाएं और अनुमतियां](../settings/roles-permissions.md) -- नियंत्रित करें कि कौन वर्कफ़्लो देख, संपादित, और प्रबंधित कर सकता है
