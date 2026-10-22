---
title: "पेज एडिटर का उपयोग"
---

# पेज एडिटर का उपयोग {#using-the-page-editor}

<div class="article-intro">

B1 पेज एडिटर एक visual drag-and-drop builder है जो आपको बिना कोई code लिखे अपनी church website के पेज डिज़ाइन करने देता है। आप sections और content blocks जोड़ सकते हैं, styles कस्टमाइज़ कर सकते हैं, अपने काम का preview देख सकते हैं, और बदलाव पूर्ववत कर सकते हैं -- यह सब आपके browser के भीतर।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- अपनी website कॉन्फ़िगर करने के लिए [प्रारंभिक सेटअप](initial-setup) पूरा करें
- [पेज प्रबंधित करना](managing-pages) में कम से कम एक पेज बनाएं
- एडिटर तक पहुंचने के लिए आपको **content.edit** अनुमति चाहिए

</div>

## एडिटर खोलना {#opening-the-editor}

1. B1 Admin में, [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ऊपर-बाईं ओर का search bar) खोलें, **Website** को expand करें, और **Pages** पर click करें।
2. Pages table में वह पेज ढूंढें जिसे आप संपादित करना चाहते हैं और **Edit Content** पर click करें।

एडिटर full-screen मोड में खुलता है। बाईं ओर का panel आपके पेज की संरचना और उपलब्ध content elements दिखाता है; बीच का क्षेत्र आपके पेज का live preview दिखाता है।

:::info
एडिटर हमेशा light mode में दिखता है, चाहे आपकी B1 Admin theme setting कुछ भी हो, और [स्वरूप](appearance) में आपके चुने हुए heading और body fonts का उपयोग करता है। इससे preview सटीक रूप से दिखाता है कि आपका पेज website visitors को कैसा दिखेगा।
:::

## पेज संरचना: Sections और Elements {#page-structure-sections-and-elements}

हर पेज दो स्तरों से बनता है:

- **Sections** -- सबसे ऊपर के containers जो आपके पेज को क्षैतिज पट्टियों में बांटते हैं (उदाहरण के लिए, एक hero section, एक content block, या एक footer strip)। सामग्री जोड़ने से पहले हर पेज में कम से कम एक section होना चाहिए।
- **Elements** -- किसी section के अंदर रखे व्यक्तिगत content टुकड़े, जैसे text, images, buttons, cards, forms, और calendars।

### सेक्शन जोड़ना {#adding-a-section}

1. **Add Section** पर click करें (या बाएं panel के ऊपर **+** button पर)।
2. चुनें कि कैसे शुरू करना है:
   - **Template से** -- category (Hero, About, Services, Giving, आदि) के अनुसार व्यवस्थित section template gallery देखें और किसी एक पर click करें ताकि वह पूरी तरह styled, पहले से भरा हुआ section बन जाए। जोड़ने के बाद आप सब कुछ कस्टमाइज़ कर सकते हैं।
   - **Blank section** -- एक column layout चुनें (single, two columns, three columns, आदि) और शुरू से बनाएं।
3. नया section preview में दिखता है। उसे चुनने के लिए click करें और उसका background color, padding, और अन्य style options configure करें।

### सेक्शन का layout बदलना {#switching-a-sections-layout}

किसी section को पहले से बना लिया है, लेकिन उसकी संरचना बदलनी है? उस section पर layout switcher का उपयोग करें ताकि उसका column arrangement gallery के किसी दूसरे विकल्प से बदला जा सके, और आपकी मौजूदा सामग्री व elements अपनी जगह पर बने रहें।

### सेक्शन में elements जोड़ना {#adding-elements-to-a-section}

1. Preview में किसी section के अंदर click करके उसे चुनें।
2. **Add Content** पर click करें और सूची से एक element type चुनें:
   - **Text** -- Headings, paragraphs, और rich text
   - **Image** -- एक फ़ोटो अपलोड करें या उसका link दें
   - **Button** -- एक clickable call-to-action link
   - **Card** -- एक image जिसके साथ title और description हो
   - **Form** -- पेज पर सीधे एक [फ़ॉर्म](../forms/creating-forms) embed करें
   - **Calendar** -- एक event calendar दिखाएं
   - **FAQ** -- Accordion-style प्रश्न और उत्तर blocks
   - **Video** -- URL से एक video embed करें
   - **Groups Browser** -- सभी church groups की एक filterable directory, वैकल्पिक search, category filter, और label filter के साथ
   - **Icon Feature** -- एक icon जिसके साथ title और छोटा विवरण हो, feature या ministry की highlights के लिए
   - **Gallery** -- एक multi-photo grid या masonry layout
   - **Testimonial** -- एक या अधिक quotes, author का नाम, role, और फ़ोटो के साथ
   - **Social Icons** -- आपके चर्च की social media profiles के linked icons
   - **Countdown** -- किसी तारीख या साप्ताहिक service time की ओर उल्टी गिनती करने वाला timer
   - **Stats** -- labels के साथ बड़े नंबरों की एक पंक्ति (सदस्य, वर्ष, campuses)
   - **Campaign Progress** -- किसी giving campaign के लिए live progress bar, जो fund goal की ओर जुटाई गई कुल राशि दिखाता है
   - **Staff Grid** -- किसी group के सदस्यों के लिए फ़ोटो cards; group का **public roster** विकल्प चालू होना चाहिए
   - **Service Times** -- आपके campuses का service schedule, attendance setup से अपने-आप लिया गया
   - **Sermons** -- आपकी sermon library, पूरे browser के रूप में, या grid, list, या featured-latest layout में
   - **Map** -- आपके चर्च के address पर केंद्रित एक embedded map
   - **Table** -- tabular content के लिए rows और columns का एक सरल grid
   - **Text with Photo** -- Text और एक image साथ-साथ
   - **Logo** -- आपका चर्च logo, [स्वरूप](appearance) से लिया गया
   - **Live Stream** -- आपका live stream player, सीधे पेज पर embedded
   - **Podcast** -- आपके दिए गए बाहरी podcast RSS feed URL से लिए गए episodes की सूची, जिसमें यह सेट करने के विकल्प हैं कि कितने episodes दिखें और तारीखें व विवरण दिखें या नहीं। लाइव साइट पर हर episode में एक audio player और एक **Download** link होता है जो episode की audio file को episode के शीर्षक के नाम से सहेजता है। यह किसी भी podcast feed को अपनी साइट पर दिखाने के लिए है; अपने sermons को podcast के रूप में प्रकाशित करने के लिए इसकी जगह [Sermons प्रबंधित करना](../sermons/managing-sermons.md#your-podcast-feed) देखें।
   - **Donation** -- एक giving button या embedded donation form
   - **HTML** -- आपका अपना raw HTML, उन्नत उपयोग के लिए, जैसे किसी तीसरे पक्ष के widget को embed करना (देखें [HTML element का उपयोग](#using-the-html-element))
   - **iFrame** -- URL से बाहरी सामग्री embed करें
3. दिखने वाले settings panel से element configure करें।

### HTML element का उपयोग {#using-the-html-element}

**HTML** element में दो boxes होते हैं:

- **HTML Content** -- वह markup जो पेज पर दिखाना है। यहां आप जो भी `<script>` tags डालते हैं, वे आपकी लाइव साइट पर चलते हैं।
- **JavaScript (exclude script tag)** -- Script code जो पेज लोड होने पर चलता है। आप किसी vendor का embed snippet भी यहां उसके `<script>` tags सहित paste कर सकते हैं, और वह लाइव साइट पर चलेगा।

अगर आप JavaScript box में केवल एक web address (जैसे कोई image link) paste करते हैं, तो box लाल हो जाता है और चेतावनी दिखती है *"This is a web address, not JavaScript."* उस box में अकेला address कुछ नहीं करता। कोई तस्वीर दिखाने के लिए **Image** element इस्तेमाल करें या **HTML Content** में `<img src="...">` डालें।

### Calendar element का उपयोग {#using-the-calendar-element}

**Calendar** element आपके किसी calendar के events दिखाता है:

1. **Select** के अंतर्गत **Group Calendar** चुनें (किसी एक group के events -- सूची में वे groups दिखते हैं जिनके आप सदस्य हैं) या **Curated Calendar** (**Calendars** के अंतर्गत आपके बनाए गए calendar; देखें [क्यूरेटेड Calendar](../calendars/curated-calendar))।
2. **Select Calendar** के अंतर्गत group या calendar चुनें।
3. **Display** के अंतर्गत चुनें कि इसे कैसे दिखाना है:
   - **Month calendar** -- एक महीने का grid जिसमें visitors पन्ने पलट सकते हैं।
   - **Upcoming events** -- अगले 12 आने वाले events की tiles का grid, जिसमें दोहराने वाला event अपनी अगली तारीख पर एक बार दिखता है। हर tile में event की फ़ोटो (या फ़ोटो न होने पर आपकी theme के dark color पर उसका शीर्षक), एक date badge, दिन और समय, और विवरण की पहली पंक्ति दिखती है। Tiles के ऊपर का **Subscribe** button visitors को calendar का ICS link कॉपी करने या उसे download करने देता है।
4. केवल कुछ events दिखाने के लिए **Only events tagged** में एक tag टाइप करें -- उदाहरण के लिए, `youth`। केवल वे events दिखते हैं जिनके **Tags** में वह शब्द है। सभी events दिखाने के लिए इसे खाली छोड़ें। Tags हर event पर सेट होते हैं; देखें [इवेंट जोड़ना और संपादित करना](../calendars/creating-calendars.md#adding-and-editing-events)।

दोनों display प्रकारों में, किसी event पर click करने से उसका अपना पेज आपकी website पर खुलता है। Event पेज पर event की फ़ोटो, शीर्षक, तारीख और समय, और विवरण दिखता है, साथ ही **When** (दोहराने वाले event के लिए repeat pattern सहित) और **Where** (उसके लिए बुक किए गए rooms) वाला एक box। Registration चालू होने पर इसमें **Register for this Event** button भी होता है, और **Add to my calendar** link होता है जो event को calendar file के रूप में download करता है। पेज ऐसा बना है कि search engines अपने परिणामों में event की तारीख और विवरण दिखा सकें।

### Content को पुनर्व्यवस्थित करना {#reordering-content}

हर item के बाईं ओर के handle icon (छह बिंदु) का उपयोग करके sections या elements को खींचें और उनका क्रम बदलें। आप किसी section के भीतर elements खींच सकते हैं या उन्हें sections के बीच ले जा सकते हैं।

## अपने पेज को स्टाइल करना {#styling-your-page}

### Section styles {#section-styles}

किसी भी section पर click करके उसका style panel खोलें। आप सेट कर सकते हैं:

- **Background** -- ठोस रंग, gradient, या image। Image background इस्तेमाल करने पर, **Focal Point** picker आपको click करके यह चुनने देता है कि section के scale होने पर image का कौन सा हिस्सा केंद्र में रहे, और **Overlay** color विकल्प आपको image पर एक अर्ध-पारदर्शी tint जोड़ने देता है ताकि text पढ़ने में आसान हो।
- **Padding** -- section के अंदर ऊपर और नीचे की जगह
- **Width** -- Full-width या centered/contained
- **Dividers** -- section के ऊपरी या निचले किनारे पर सजावटी shape dividers (wave, slant, curve, triangle, और अन्य), जिनमें color, height, और flip विकल्प हैं

### Element styles {#element-styles}

किसी भी element पर click करके उसका style panel खोलें। आम विकल्पों में font size, color, alignment, margin, और padding शामिल हैं। Images के लिए, आप alt text और link targets सेट कर सकते हैं।

### Custom CSS {#custom-css}

उन्नत styling के लिए, हर section और element में एक **Custom CSS** field है जहां आप अपने CSS rules लिख सकते हैं। ये उसी element तक सीमित रहते हैं, इसलिए ये पेज के बाकी हिस्से को अनजाने में प्रभावित नहीं करेंगे।

:::tip
अगर आपको पूरी साइट पर styles लागू करने हैं -- जैसे कोई custom font या global color -- तो व्यक्तिगत पेजों पर custom CSS की जगह [स्वरूप](appearance) settings का उपयोग करें।
:::

## अपने पेज का preview देखना {#previewing-your-page}

अलग-अलग screen sizes पर अपना पेज कैसा दिखता है, यह जांचने के लिए toolbar के preview controls का उपयोग करें:

- **Desktop** -- पूरी चौड़ाई वाला browser view
- **Mobile** -- संकरा फ़ोन-आकार का view

लाइव पेज को ठीक वैसा देखने के लिए, जैसा visitors देखेंगे, Pages सूची पर वापस जाएं और पेज के path पर click करें। वह एक नए browser tab में खुलता है।

## Accessibility की जांच {#checking-accessibility}

सामान्य समस्याओं की त्वरित जांच के लिए toolbar में **Accessibility** icon पर click करें -- जैसे alt text के बिना images, कम color contrast, या क्रम से बाहर headings। हर समस्या सीधे उस element से link होती है जिसे ध्यान चाहिए, ताकि आप उसे वहीं ठीक कर सकें।

## बदलाव पूर्ववत करना {#undoing-changes}

एडिटर आपका editing इतिहास अपने-आप ट्रैक करता है। नेविगेट करने के लिए toolbar buttons या keyboard shortcuts का उपयोग करें:

- **Undo** (Ctrl+Z / Cmd+Z) -- आपकी आखिरी क्रिया को वापस लें
- **Redo** (Ctrl+Shift+Z या Ctrl+Y / Cmd+Shift+Z) -- पूर्ववत की गई क्रिया को फिर से लागू करें

आप पेज को किसी पिछले snapshot पर भी restore कर सकते हैं। सहेजे गए snapshots की विवरण सहित सूची देखने के लिए toolbar में **View history** पर click करें, और उस बिंदु पर वापस जाने के लिए किसी भी entry पर click करें।

:::warning
Snapshot restore करने से आपकी मौजूदा पेज सामग्री snapshot वाले version से बदल जाती है। इसे सामान्य undo button से वापस नहीं लाया जा सकता। अगर आप वापस जाने का विकल्प रखना चाहते हैं, तो कोई पुराना snapshot restore करने से पहले अपनी मौजूदा स्थिति का snapshot सहेजें।
:::

## सेव करना और प्रकाशित करना {#saving-and-publishing}

आप जैसे-जैसे काम करते हैं, बदलाव अपने-आप सेव होते हैं। Toolbar में एक status indicator दिखाता है कि आपके बदलाव सेव हुए हैं या नहीं।

### Draft और published स्थिति {#draft-and-published-state}

पेजों की **published** स्थिति हो सकती है, जो नियंत्रित करती है कि visitors आपके बदलाव कब देखें। Toolbar वर्तमान स्थिति दिखाने वाला status chip प्रदर्शित करता है:

- **Live on save** -- पेज publish workflow का उपयोग नहीं करता। हर सहेजा गया बदलाव तुरंत लाइव हो जाता है। नए पेजों के लिए यही डिफ़ॉल्ट है।
- **Unpublished changes** -- पेज पहले publish हो चुका है, लेकिन आखिरी publish के बाद आपने बदलाव किए हैं। Visitors अब भी पिछला published version देखते हैं।
- **Published** -- पेज लाइव है और आपकी सहेजी गई सामग्री वही है जो visitors देखते हैं।

अपने बदलाव publish करने के लिए toolbar में **Publish** button पर click करें। पेज तुरंत लाइव हो जाता है।

Visitors को प्रभावित किए बिना आखिरी published version पर वापस जाने के लिए, overflow menu (⋮) खोलें और **Discard unpublished changes** पर click करें।

Publish workflow का उपयोग बंद करने के लिए, overflow menu खोलें और **Turn off publishing** पर click करें। फिर बदलाव तुरंत लाइव होने लगते हैं।

:::tip
Publish workflow का उपयोग तब करें जब आप किसी पेज को तैयार करना चाहते हैं -- उदाहरण के लिए, किसी आने वाले event के लिए -- और उसे सही समय पर ही लाइव करना चाहते हैं। पेज बनाएं और preview करें, फिर तैयार होने पर **Publish** पर click करें।
:::

## संबंधित लेख {#related-articles}

- [पेज प्रबंधित करना](managing-pages) -- पेज बनाएं, URLs सेट करें, और साइट navigation प्रबंधित करें
- [स्वरूप](appearance) -- साइट-व्यापी colors, fonts, और branding सेट करें
- [फ़ाइलें](files) -- एडिटर में उपयोग के लिए images और documents अपलोड करें
- [फ़ॉर्म बनाना](../forms/creating-forms) -- ऐसे forms बनाएं जिन्हें पेजों पर embed किया जा सके
