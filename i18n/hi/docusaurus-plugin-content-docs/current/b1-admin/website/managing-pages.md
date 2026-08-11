---
title: "पृष्ठों को प्रबंधित करना"
---

# पृष्ठों को प्रबंधित करना

<div class="article-intro">

Website Pages view आपकी चर्च वेबसाइट पर सभी पृष्ठों को create, edit, और organize करने के लिए आपका central hub है। आप इस single screen से अपने पृष्ठ content और अपनी site के navigation दोनों को manage कर सकते हैं।

</div>

<div class="prereqs">
<h4>शुरुआत करने से पहले</h4>

- अपनी domain और basic site settings को configure करने के लिए [Initial Setup](initial-setup) complete करें
- अपनी content और images तैयार रखें। [Files](files) manager का उपयोग करके पहले media assets को upload करें।

</div>

:::info
यदि आपकी चर्च के एक से अधिक websites हैं (उदाहरण के लिए, प्रत्येक campus के लिए separate sites), Website Pages view के top पर site switcher का उपयोग करके उनके बीच jump करें। प्रत्येक site के अपने pages, navigation, और [appearance](appearance) settings हैं।
:::

## Page Types को समझना

**Pages** table आपकी site पर हर पृष्ठ को अपनी status के साथ list करता है:

- **Generated** -- Pages जो automatically system द्वारा बनाए गए हैं आपकी चर्च के डेटा के आधार पर (उदाहरण के लिए, एक Groups page, एक Sermons page, या आपकी sermon library में हर sermon के लिए एक individual page)। ये pages अपने आप को update करते हैं जैसे आपका डेटा changes होता है।
- **Custom** -- Pages जिन्हें आपने अपने स्वयं के content और layout के साथ स्वयं बनाया है।

यदि आप full control चाहते हैं तो आप किसी भी auto-generated page को एक custom page में convert कर सकते हैं।

## Pages जोड़ना और संपादित करना

1. Pages table के top right corner में **Add Page** बटन पर क्लिक करें।
2. एक page type चुनें (blank या एक template) और इसे एक नाम दें।
3. [page editor](page-editor) को खोलने के लिए किसी भी page के आगे **Edit** पर क्लिक करें, जहां आप sections, text, images, और अन्य elements को जोड़ सकते हैं।
4. Page title, URL path, और अन्य metadata को update करने के लिए **Page Settings** पर क्लिक करें।
5. **Preview** button का उपयोग करके अपने page को एक नई window में खोलें और देखें कि यह visitors के लिए कैसा दिखेगा।

:::tip
अपने home page के लिए, URL path को सिर्फ `/` के लिए सेट करें। अन्य सभी pages के लिए, `/about` या `/contact` जैसे एक descriptive path का उपयोग करें।
:::

### Page Settings

किसी भी page पर **Page Settings** को खोलकर configure करें:

- **Title और URL Path** -- Page का नाम और आपकी site पर इसका पता।
- **Visibility** -- चुनें कि कौन page को देख सकता है: everyone, members only, staff only, या specific groups के members। यह एक password के बिना एक private page (जैसे एक staff resource page) को gate करने का एक quick तरीका है।
- **Meta Description** -- Search engine results और social media link previews में दिखाया गया एक short summary।
- **Redirects** -- एक old URL path को इस page की ओर point करें, ताकि links और bookmarks एक retired page के लिए काम करते रहें।

## Navigation को Manage करना

Website Pages view आपके navigation links को display करता है। ये links menu को control करते हैं जो visitors आपकी वेबसाइट पर देखते हैं।

1. एक नया navigation link बनाने के लिए **Add** पर क्लिक करें। आप इसे अपनी site पर किसी भी page या एक external URL की ओर point कर सकते हैं।
2. Links को reorder करने के लिए, उन्हें drag और drop करें वह order में जो आप चाहते हैं। आप dropdown menus बनाने के लिए links को एक parent item के नीचे भी nest कर सकते हैं।
3. किसी भी link के label, URL, या position को बदलने के लिए उसके आगे **Edit** icon पर क्लिक करें।
4. Navigation से link को हटाने के लिए, **Delete** icon पर क्लिक करें।

:::info
एक navigation link को remove करने से page को delete नहीं किया जाता है। Page अभी भी exists करता है और अपने URL द्वारा सीधे accessible होता है -- यह simply menu में display नहीं होगा।
:::

## अपनी Site को Organize करने के लिए Tips

- अपने top-level navigation को पांच या छह items तक रखें ताकि visitors चीजें quickly पा सकें।
- Related sub-pages के लिए nested links का उपयोग करें (उदाहरण के लिए, एक "About" dropdown जिसमें "Our Team," "Beliefs," और "History" हों)।
- **Mobile Preview** पर क्लिक करके छोटी screens पर अपने navigation को review करें यह सुनिश्चित करने के लिए कि यह अच्छी तरह काम करता है।
- Pages को clear, descriptive names दें जो visitors को समझने में मदद करें कि वे क्या पाएंगे।

:::tip
अपने pages में [forms](../forms/creating-forms.md) जोड़ सकते हैं registrations, prayer requests, या visitors से अन्य जानकारी collect करने के लिए।
:::

## एक Site Template से शुरुआत करना

यदि आप अपनी site को scratch से build कर रहे हैं, तो आप एक बार में pages को create करने के बजाय एक **Site Template** का उपयोग करके bootstrap कर सकते हैं। एक site template एक set के pre-built pages बनाता है — home, about, connect, give, और अन्य — placeholder content और already wired-up navigation links के साथ।

1. Pages screen पर, (**Add Page** button के बगल में) **Site Templates** button पर क्लिक करें।
2. उपलब्ध templates को browse करें और एक को preview करने के लिए क्लिक करें।
3. जब आप एक को पसंद करते हैं, **Apply Template** पर क्लिक करें।
4. Pages जो पहले से exist नहीं करते हैं create किए जाएंगे और आपके navigation में जोड़े जाएंगे। Existing pages as-is रहते हैं।

Template apply करने के बाद, [page editor](page-editor) में हर page को खोलें placeholder text और images को अपनी चर्च की real content से replace करने के लिए।

:::info
Site templates page structure और navigation create करते हैं। वे आपकी site के color scheme या fonts को override नहीं करते — वे [Appearance](appearance) द्वारा controlled होते हैं।
:::

## Image Lightbox

जब visitors आपकी वेबसाइट पर किसी image पर क्लिक करते हैं, तो यह एक full-screen lightbox overlay में खुलता है। यह लोगों को page को छोड़े बिना बड़े size में photos देखने देता है। कोई configuration की आवश्यकता नहीं — lightbox automatically enabled होता है आपकी page content में images के लिए।

## अगले कदम

- [Initial Setup](initial-setup) -- पहली-बार setup निर्देश
- [Using the Page Editor](page-editor) -- Page content को build और style करना सीखें
- [Appearance](appearance) -- अपनी site के visual theme को customize करें
- [Files](files) -- अपने pages के लिए media assets को upload और manage करें
