---
title: "Live Streaming"
---

# Live Streaming

<div class="article-intro">

Live Stream Times page आपको अपनी चर्च की streaming schedule को configure करने, service times को manage करने, और viewer experience को customize करने देता है। Recurring weekly services या one-time events को setup करें, chat और video settings को configure करें, और control करें कि आपकी stream कब live जाती है।

</div>

<div class="prereqs">
<h4>शुरुआत करने से पहले</h4>

- आपको **contentApi.streamingServices.edit** अनुमति की आवश्यकता है। यदि आपको access नहीं है तो [Roles & Permissions](../settings/roles-permissions.md) देखें।
- यदि आप automated live streaming का उपयोग करने की plan बना रहे हैं तो अपनी YouTube Channel ID तैयार रखें
- Stream source के रूप में उपयोग करने के लिए कम से कम एक [sermon](managing-sermons) या permanent live URL add करें

</div>

Page के दो मुख्य tabs हैं: आपकी live stream schedule को manage करने के लिए **Services** और अपने streaming page को configure करने के लिए **Settings**।

## Services को Manage करना

### एक Service जोड़ना

1. B1 Admin में, [Jump menu](../introduction.md#getting-around-with-the-jump-menu) खोलें (ऊपरी-बाएं में खोज बार), **Sermons** को expand करें, और **Live Stream Times** पर क्लिक करें।
2. एक नई scheduled service बनाने के लिए **Add Service** बटन पर क्लिक करें।
3. एक **Service Name** enter करें (उदाहरण के लिए, "Sunday Morning")।
4. **Service Time** सेट करें -- अपनी service शुरू होने का दिन और समय चुनें।
5. **Recurs Weekly** को **Yes** पर set करें regular weekly services के लिए, या **No** एक one-time event के लिए।

### Chat और Video Settings को Configure करना

6. **Chat Settings** के तहत, set करें कि service से पहले और बाद में कितने minutes chat को enable किया जाना चाहिए। यह visitors को service शुरू होने से पहले chat करना शुरू करने और बाद में जारी रखने देता है।
7. **Video Settings** के तहत, countdown या pre-service content के लिए video stream को कितनी जल्दी शुरू करना है यह set करें।
8. Dropdown से कौन सा sermon play करना है यह चुनें:
   - **Latest Sermon** -- स्वचालित रूप से आपके most recently added video को play करता है।
   - **Current Live Service** -- आपके Channel ID का उपयोग करके YouTube से अपनी current live stream को play करता है।
   - आप कोई भी specific sermon चुन सकते हैं जिसे आपने already save किया है।
9. अपनी service को schedule करने के लिए **Save** पर क्लिक करें।

:::info
आपकी service automatically हर week update होगी यदि recurring पर set हो। आप जितनी services चाहें add कर सकते हैं। Visitors को अपने streaming page पर next scheduled service time दिखाई देगा।
:::

## Streaming Page Settings

अपने live stream के साथ दिखने वाले tabs और links को customize करने के लिए **Settings** tab पर क्लिक करें।

### Tabs जोड़ना

1. अपने live stream page में एक नया tab जोड़ने के लिए **Add** बटन पर क्लिक करें।
2. पूर्व-डिज़ाइन किए गए **Chat** tab को चुनें या एक बाहरी URL के साथ एक कस्टम tab जोड़ें।
3. Chat tab के लिए, बस **Tab Text** box में इसे एक नाम दें और setup complete है।
4. एक linked tab के लिए, tab का नाम enter करें, icon button पर क्लिक करके एक icon चुनें, और URL enter करें।
5. आपके configured tabs आपके live streaming page पर viewers के लिए additional resources और interactive features को access करने के लिए दिखाई देंगे।

### अपनी Stream को Preview करना

अपनी live streaming page को देखने के लिए **View Your Stream** बटन पर क्लिक करें कि यह visitors को कैसे दिखाई देगा, आपका logo, service times, और configured tabs सहित।

## अपनी YouTube Live Stream को Setup करना

Automatic live streaming के लिए अपने YouTube channel को connect करने के लिए:

1. **Sermons** पर जाएं और **Add Sermon** पर क्लिक करें, फिर **Add Permanent Live URL** को चुनें।
2. Video provider **Current YouTube Live Stream** पर default करता है। अपनी **YouTube Channel ID** enter करें।
3. एक title और description add करें, फिर **Save** पर क्लिक करें।
4. **Live Stream Times** में, एक service create करें और sermon dropdown से अपनी permanent live URL को चुनें।

:::tip
अपनी YouTube Channel ID को खोजने के लिए, अपने YouTube channel के advanced settings पर जाएं और Channel ID value को copy करें।
:::

## Colors और Logo को Customize करना

आपका live stream page आपकी website के [Appearance](../website/appearance) settings का उपयोग करता है:

- **Light accent color** dark text के साथ header के लिए उपयोग किया जाता है।
- **Dark accent color** light text के साथ sidebar के लिए उपयोग किया जाता है।
- आपका **Light Background Logo** streaming page पर दिखाई देता है। एक transparent background वाली image का उपयोग करें और 4:1 aspect ratio रखें।

इन्हें change करने के लिए, **Website** पर जाएं फिर **Appearance** पर जाएं और अपने [Color Palette](../website/appearance#color-palette) और [Logo](../website/appearance#logo-and-branding) settings को update करें।

## Streaming Hosts जोड़ना

Team members को host-only chat के साथ public chat के साथ access देने के लिए:

1. Jump menu में, **Settings > Roles** चुनें।
2. Plus button पर क्लिक करें और **Add Custom Role** को चुनें।
3. Role को "Streaming Host" name दें और **Save** पर क्लिक करें।
4. नई role पर क्लिक करें, फिर Members section में add करने के लिए **Add** पर क्लिक करें।
5. **Edit Permissions** तक scroll down करें, **Content** section को expand करें, और **Host Chat** को check करें।

जब hosts live stream page में login करते हैं, तो public chat के साथ broadcast के दौरान staff-only conversation के लिए एक private **Host Chat** tab दिखाई देता है।

:::info
Roles बनाने और permissions को manage करने पर अधिक details के लिए, [Roles & Permissions](../settings/roles-permissions.md) देखें।
:::

## Troubleshooting

यदि आपकी automated YouTube live stream "Current YouTube Live Stream" option का उपयोग करते हुए अपनी Channel ID के साथ correctly display नहीं हो रही है, तो निम्न को try करें:

**Symptoms:**
- Live stream embed "Video unavailable" दिखाता है
- Page load होता है लेकिन कोई video दिखाई नहीं देता
- Direct YouTube embeds काम करते हैं, लेकिन automated channel live stream नहीं

**Solution:**
पुरानी या upcoming scheduled live streams के लिए अपने YouTube channel को check करें और उन्हें delete करें:

1. अपने YouTube Studio पर जाएं।
2. **Content** फिर **Live** पर navigate करें।
3. कोई old scheduled lives या upcoming scheduled streams को look करें।
4. इन पुरानी या scheduled live stream entries को delete करें।
5. अपने live stream page को फिर से test करें।

:::warning
YouTube का automated channel live stream embed multiple scheduled या past live stream entries होने पर आपके channel में block किया जा सकता है। इन्हें remove करने से YouTube को अपनी current live stream को properly identify और serve करने की अनुमति मिलती है।
:::

**अतिरिक्त requirements:**
- आपकी live stream को **Public** (Unlisted या Private नहीं) पर set किया जाना चाहिए।
- Embedding को आपकी YouTube stream settings में allow किया जाना चाहिए।
- सुनिश्चित करें कि आप **Current YouTube Live Stream** provider (Channel ID के साथ) का उपयोग कर रहे हैं, न कि **YouTube** provider (Video ID के साथ)।

## अगले कदम

- [Managing Sermons](managing-sermons) -- अपनी library में sermons add करें
- [Playlists](playlists) -- Sermons को series में organize करें
