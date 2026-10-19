---
title: "Providers जोड़ना और Playlists बनाना"
---

# Providers जोड़ना और Playlists बनाना

<div class="article-intro">

Playlist छवियों और videos का एक loop है जिसे आप calendar पर रखते हैं। FreePlay Admin में आप अपने content providers को पूरे चर्च के लिए एक बार जोड़ते हैं। फिर उन providers से files चुनकर playlists बनाते हैं।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- [admin.freeplay.church](https://admin.freeplay.church) पर FreePlay Admin में sign in करें
- उस किसी भी provider account का login रखें जिसे आप जोड़ना चाहते हैं, जैसे Dropbox या OneDrive

</div>

## Providers जोड़ना {#connecting-providers}

**Providers** पेज आपके content sources को दो section में सूचीबद्ध करता है:

- **Connected** - Providers जिन्हें आप अभी उपयोग कर सकते हैं। Public providers जिन्हें sign-in की ज़रूरत नहीं, जैसे Lessons.church और Bible Project, हमेशा यहां **Public · no sign-in needed** के रूप में दिखते हैं। Linked accounts पर **Account linked** और link कब expire होगा, यह दिखता है।
- **Available** - Providers जिन्हें उपयोग करने से पहले आपको sign in करना होगा।

किसी provider को जोड़ने के लिए:

1. **Providers** पर जाएं।
2. **Available** के अंतर्गत provider खोजें और **Connect** पर click करें।
3. उस provider के साथ अपने account में sign in करें:
   - कुछ providers, जैसे Dropbox, Google Drive, और OneDrive, एक sign-in popup खोलते हैं। यदि कुछ नहीं दिखता, तो admin.freeplay.church के लिए popups की अनुमति दें।
   - अन्य providers एक link और एक code दिखाते हैं। Link पर जाएं, code दर्ज करें, और access को approve करें। जब आप पूरा कर लेंगे तो dialog अपने आप अपडेट हो जाएगा।
4. जब आप **Account linked successfully!** देखें, तो provider **Connected** में चला जाता है।

Connected providers के तीन actions होते हैं:

- **Browse** - Provider के folders देखें
- **Refresh** - Provider का sign-in नवीनीकरण करें
- **Unlink** - Account को disconnect करें

:::info
FreePlay Admin में provider connections पूरे चर्च के होते हैं, किसी एक व्यक्ति या एक TV के नहीं। Scheduled screens अपनी files इन connections के माध्यम से पाती हैं, इसलिए आपको हर TV पर हर provider में अलग से sign in करने की ज़रूरत नहीं है।
:::

**FreeShow** को **On your church network · each TV finds it itself** के रूप में सूचीबद्ध किया गया है। FreePlay Admin में इसके लिए कुछ connect करने को नहीं है।

## Playlists पेज

**Playlists** पेज हर playlist को उसके items की संख्या, कुल अवधि, उसका उपयोग कहां हो रहा है (किसी group के लिए **Default loop**, या schedules की संख्या), और अंतिम अपडेट के समय के साथ सूचीबद्ध करता है। हर पंक्ति में ये actions होते हैं:

- **Present** - Playlist को आपके browser में full screen चलाएं
- **Edit** - Playlist editor खोलें
- **Duplicate** - "(copy)" नाम से एक प्रति बनाएं

## Playlist बनाना

1. **Playlists** पर जाएं और **Add playlist** पर click करें।
2. एक **Name** दर्ज करें, उदाहरण के लिए "Welcome loop"।
3. **Add playlist** पर click करें। Playlist editor खुलता है।

## Items जोड़ना

Playlist editor बाईं ओर आपके playlist के **Items** और दाईं ओर **Add from provider** दिखाता है।

1. दाईं ओर एक provider tab चुनें। किसी और source को जोड़ने के लिए **Connect another** पर click करें, जो **Providers** पेज खोलता है।
2. Folders में जाने के लिए उन पर click करें। वापस ऊपर जाने के लिए breadcrumb trail का उपयोग करें।
3. Playlist के अंत में जोड़ने के लिए किसी file पर click करें। Playlist में पहले से मौजूद files को selected चिह्नित किया जाता है।
4. वर्तमान folder में सब कुछ एक साथ जोड़ने के लिए **Add all** पर click करें। बटन दिखाता है कि कितनी files अभी playlist में नहीं हैं।
5. Editor के ऊपर **Save** पर click करें।

:::warning
**Save** पर click करने तक बदलाव सहेजे नहीं जाते। बिना सहेजे निकलने के लिए **Cancel** पर click करें।
:::

## Items को व्यवस्थित करना

बाईं ओर **Items** सूची में:

- **Reorder** - किसी item को बाईं ओर के handle से खींचें
- **Image timing** - छवियां डिफ़ॉल्ट रूप से 10 सेकंड दिखती हैं। किसी छवि के आगे सेकंड की संख्या बदलें
- **Videos** - Videos **Plays to end** दिखाते हैं और अपनी पूरी लंबाई तक चलते हैं
- **Remove** - किसी item को playlist से हटाएं

ऊपर का सारांश items की संख्या और playlist की कुल लंबाई दिखाता है।

## नाम बदलना, Duplicate करना और Delete करना

Editor के बाईं ओर का panel दिखाता है कि playlist कहां उपयोग हो रही है। इसमें ये actions भी हैं:

- **Present** - Playlist को अपने browser में चलाएं
- **Rename** - Playlist का नाम बदलें
- **Duplicate** - अलग से edit करने के लिए एक प्रति बनाएं
- **Delete** - Playlist हटाएं। जो schedules इसे चलाते हैं, वे group के default loop पर वापस चले जाते हैं

## Browser में Playlist Present करना

Playlist को अपने browser में full screen चलाने के लिए **Present** पर click करें। यह playlist का पूर्वावलोकन करने, या किसी projector से जुड़े laptop से उसे चलाने के लिए उपयोगी है। Controls bar दिखाने के लिए माउस हिलाएं, फिर ये keys उपयोग करें:

| Key | Action |
|---|---|
| **Space** | Pause या resume |
| **←** / **→** | पिछला या अगला item |
| **F** | Fullscreen चालू/बंद करें |
| **Esc** | बाहर निकलें |

## संबंधित लेख

- **[Calendar का Scheduling](./scheduling-the-calendar)** - अपनी playlist को screen group के calendar पर रखें
- **[Screens और Groups का प्रबंधन](./managing-screens)** - किसी playlist को group का default loop बनाएं
- **[Content Providers](../content-providers/)** - वे providers जिन्हें आप सीधे TV पर जोड़ सकते हैं
