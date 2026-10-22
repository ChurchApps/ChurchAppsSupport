---
title: "कैंपस"
---

# कैंपस {#campuses}

<div class="article-intro">

अगर आपका चर्च एक से ज़्यादा स्थानों पर मिलता है, तो **Campuses** आपको यह ट्रैक करने देते हैं कि हर व्यक्ति और group किस स्थान से जुड़ा है। एक बार configure होने के बाद, campuses person profiles, attendance setup, और Demographics dashboard में एक विकल्प के रूप में दिखते हैं। Multi-site चर्च पूरे B1 Admin में campus के अनुसार filter, search और report कर सकते हैं।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- Campuses प्रबंधित करने के लिए आपको **Edit Church Settings** की अनुमति चाहिए। [भूमिकाएं और अनुमतियां](./roles-permissions.md) देखें।

</div>

## कैंपस सेटिंग्स खोलना {#opening-campus-settings}

B1 Admin में, [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ऊपर-बाईं ओर का search bar) खोलें, **Settings > Settings** चुनें, और बाईं ओर की सूची में **Campuses** पर click करें ताकि **Campuses** section तक scroll हो जाए। आप सीधे **/settings/campuses** पर भी जा सकते हैं। आपको सभी configured campuses की सूची दिखेगी, जिसमें उनका नाम, स्थान और timezone होगा।

## कैंपस जोड़ना {#adding-a-campus}

1. **Add Campus** पर click करें।
2. कैंपस का विवरण भरें:
   - **Name** *(required)* — वह display name जो पूरे B1 Admin में दिखता है (उदाहरण के लिए, "Main Campus" या "North Campus")।
   - **Address** — campus का street address (सूचना के रूप में दिखाने के लिए; यह Church Settings में आपके मुख्य चर्च के address से अलग है)।
   - **City / State / Zip** — campus का स्थान।
   - **Time Zone** — इस campus के लिए IANA time zone (उदाहरण के लिए, *America/Chicago*)। इस campus की सेवाओं के लिए [चेक-इन schedule](../attendance/setup.md#setting-a-check-in-schedule) इसी time zone में खुलते और बंद होते हैं। अगर यह **None** पर सेट है, तो इसकी जगह आपके चर्च का [समय क्षेत्र](./church-settings.md#time-zone) इस्तेमाल होता है। यह तब उपयोगी है जब campuses अलग-अलग time zones में हों।
   - **Website** — इस campus की अपनी web presence के लिए एक वैकल्पिक URL।
3. **Save** पर click करें।

## कैंपस संपादित करना {#editing-a-campus}

सूची में किसी भी campus row पर click करें ताकि उसका editor दाईं ओर के panel में खुले। Fields अपडेट करें और **Save** पर click करें।

## कैंपस हटाना {#deleting-a-campus}

किसी campus को edit के लिए खोलें और **Delete** पर click करें। आपसे पुष्टि मांगी जाएगी। कैंपस हटाने से उसे सौंपे गए लोग नहीं हटते — उनका campus field बस खाली हो जाता है।

## लोगों को कैंपस सौंपना {#assigning-people-to-a-campus}

कैंपस बनाने के बाद, staff किसी व्यक्ति के profile से उसे कैंपस सौंप सकते हैं:

1. **People** में व्यक्ति का record खोलें।
2. **Edit** पर click करें।
3. **Campus** dropdown से campus चुनें।
4. **Save** पर click करें।

आप People page से bulk में भी campus अपडेट कर सकते हैं। कई लोगों को चुनें, **Bulk Edit** इस्तेमाल करें, और सभी के लिए Campus field एक साथ सेट करें।

## कैंपस के अनुसार filter करना {#filtering-by-campus}

कैंपस सेट होने के बाद, आप पूरे B1 Admin में campus के अनुसार filter कर सकते हैं:

- **People search** — advanced search में Campus condition जोड़ें, या किसी campus तक सीमित [सहेजी गई सूची](../people/lists.md) लोड करें।
- **Demographics** — जब कम से कम एक व्यक्ति को campus सौंपा गया हो, तब [Demographics डैशबोर्ड](../people/demographics.md) में Campus donut chart दिखता है।
- **Attendance Setup** — Attendance में हर service time को एक campus से जोड़ा जा सकता है।

:::tip
एक ही स्थान वाले चर्च को campuses configure करने की ज़रूरत नहीं है। सभी campus सुविधाएं वैकल्पिक हैं — अगर कोई campus मौजूद नहीं है, तो campus fields और charts बस नहीं दिखते।
:::

## संबंधित लेख {#related-articles}

- [चर्च सेटिंग्स](./church-settings.md) — आपका मुख्य चर्च address और branding (campus addresses से अलग)
- [जनसांख्यिकी](../people/demographics.md) — Campus breakdown chart
- [उपस्थिति सेटअप](../attendance/setup.md) — service times को campus से जोड़ें
- [थोक संपादन](../people/bulk-editing.md) — कई लोगों को एक साथ campus सौंपें
