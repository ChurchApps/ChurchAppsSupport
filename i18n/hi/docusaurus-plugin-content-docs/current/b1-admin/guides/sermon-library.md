---
title: "गाइड: अपनी Sermon Library और Live Stream बनाएँ"
description: "अपने YouTube या Vimeo sermons इंपोर्ट करें, उन्हें playlists में व्यवस्थित करें, और अपनी चर्च वेबसाइट के लिए B1 Admin में chat के साथ आवर्ती live streams सेट करें।"
---

# अपनी Sermon Library और Live Stream बनाएँ

<div class="article-intro">

अपने sermons की आर्काइव ऑनलाइन लाएँ और live streaming सेट करें — अपनी मौजूदा YouTube या Vimeo लाइब्रेरी इंपोर्ट करने से लेकर interactive chat के साथ आवर्ती live services शेड्यूल करने तक। अंत में, आपकी मंडली आपकी वेबसाइट और mobile app पर पुराने sermons देख सकेगी और live services में शामिल हो सकेगी।

</div>

## ट्रेनिंग वीडियो {#training-video}

<YouTube id="b3B3A25g2Sk" title="Building Your Sermon Library in B1" next="Setting Up Live Streaming in B1" nextUrl="/docs/b1-admin/sermons/live-streaming" />

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- content प्रबंधन अनुमति वाला B1 Admin account
- sermon videos वाला YouTube या Vimeo channel, और उसकी channel ID (अपनी archive इंपोर्ट करने के लिए)
- YouTube Channel ID (live streaming के लिए — इसे अपनी YouTube Studio settings में खोजें)

</div>

## चरण 1: Sermon Playlists बनाएँ {#step-1-create-sermon-playlists}

Playlists आपके sermons को series और collections में व्यवस्थित करती हैं ताकि ब्राउज़ करना आसान हो।

इन कामों के लिए [Playlists](../sermons/playlists.md) गाइड का पालन करें:

1. [Jump menu](../introduction.md#getting-around-with-the-jump-menu) में **Sermons > Sermons** चुनें और **Playlists** panel खोजें
2. "2024 Sunday Messages", "Marriage Series", "Christmas Services" जैसी series/collections बनाने के लिए **Add playlist** (या **Create First Playlist**) पर क्लिक करें
3. **Playlist Title**, **Description**, और **Publish Date** दर्ज करें, कोई image जोड़ने के लिए **Add Thumbnail** पर क्लिक करें, और **Save** पर क्लिक करें

:::tip
sermons जोड़ने से पहले playlists बनाएँ। इससे sermons जोड़ते समय उन्हें सही series में व्यवस्थित करना आसान हो जाता है।
:::

## चरण 2: अपने मौजूदा Sermons इंपोर्ट करें {#step-2-import-your-existing-sermons}

अगर आपके sermon videos पहले से YouTube या Vimeo पर हैं, तो आप उन सबको एक साथ ला सकते हैं।

इन कामों के लिए [Bulk Import](../sermons/bulk-import.md) गाइड का पालन करें:

1. **Add Sermon** पर क्लिक करें और **Bulk Import** चुनें, फिर YouTube या Vimeo चुनें
2. अपनी **YouTube Channel ID** या **Vimeo Channel ID** दर्ज करें और channel के videos की सूची लाने के लिए **Fetch** पर क्लिक करें
3. जो videos चाहिए उन्हें चेक करें, **Import Into Playlist** में एक playlist चुनें, और **Import** पर क्लिक करें

## चरण 3: व्यक्तिगत Sermons जोड़ें {#step-3-add-individual-sermons}

एक-बार के जोड़ या ऐसे sermons के लिए जो bulk import का हिस्सा नहीं हैं, उन्हें अलग-अलग जोड़ें।

इन कामों के लिए [Managing Sermons](../sermons/managing-sermons.md) गाइड का पालन करें:

1. **Add Sermon** पर क्लिक करें और **Add Sermon** चुनें
2. एक **Playlist** और **Video Provider** (YouTube, Vimeo, Facebook, या Custom Embed Url) चुनें, फिर video का link या ID चिपकाएँ
3. YouTube और Vimeo के लिए, video से title, description, thumbnail, duration, और publish date भरने के लिए **Fetch** पर क्लिक करें, फिर **Save** पर क्लिक करें

## चरण 4: Live Streaming सेट करें {#step-4-set-up-live-streaming}

अपना YouTube channel जोड़ें ताकि आपकी B1 साइट आपका live stream अपने-आप पहचान ले।

इन कामों के लिए [Live Streaming](../sermons/live-streaming.md) गाइड का पालन करें:

1. **Sermons** पेज पर **Add Sermon** पर क्लिक करें, **Add Permanent Live URL** चुनें, अपनी **YouTube Channel ID** दर्ज करें, और **Save** पर क्लिक करें
2. Jump menu में **Sermons > Live Stream Times** चुनें, **Add Service** पर क्लिक करें, **Service Time** सेट करें (जैसे रविवार सुबह 10:00 बजे) जिसमें **Recurs Weekly** चालू हो, और **Sermon** dropdown में अपना permanent live URL चुनें
3. **Sermons > Settings** पेज पर streaming पेज के tabs (Chat, Prayer, और बाहरी links) को अपनी पसंद के अनुसार बदलें

:::info
जब आप YouTube पर live जाते हैं, तो B1 streaming पेज stream को अपने-आप पहचान लेता है। रविवार सुबह कोई अतिरिक्त कदम ज़रूरी नहीं है।
:::

## चरण 5: अपनी वेबसाइट पर दिखाएँ {#step-5-display-on-your-website}

अपनी sermon library और live stream को आगंतुकों के लिए आसानी से उपलब्ध बनाएँ।

इन कामों के लिए [Page Editor](../website/page-editor.md) गाइड का पालन करें:

1. आगंतुक library ब्राउज़ कर सकें इसके लिए अपनी B1 वेबसाइट के किसी पेज पर **Sermons** element जोड़ें
2. live viewing अनुभव के लिए **Stream** element जोड़ें

## चरण 6: Mobile पर पहुँच {#step-6-mobile-access}

सदस्य किसी भी device से sermons और live services देख सकते हैं।

1. सदस्य [B1.church और B1 App पर](../../b1-church/content/sermons.md) sermons देख सकते हैं
2. chat के साथ live streaming फ़ोन और कंप्यूटर दोनों पर काम करती है

:::info
live chat सुविधा आपकी ऑनलाइन मंडली को वास्तविक समय में भाग लेने देती है, बिल्कुल कमरे में मौजूद होने की तरह।
:::

## हो गया! {#youre-done}

आपकी sermon library ऑनलाइन है और आपका live stream कॉन्फ़िगर हो चुका है। सदस्य कभी भी पुराने sermons देख सकते हैं और कहीं से भी live services में शामिल हो सकते हैं। हर नया sermon YouTube या Vimeo पर पोस्ट होने के बाद **Add Sermon** (या किसी और **Bulk Import**) से जोड़ें।

## संबंधित लेख {#related-articles}

- [Playlists](../sermons/playlists.md) — sermons को series में व्यवस्थित करें
- [Bulk Import](../sermons/bulk-import.md) — YouTube या Vimeo से इंपोर्ट करें
- [Managing Sermons](../sermons/managing-sermons.md) — व्यक्तिगत sermons जोड़ें और संपादित करें
- [Live Streaming](../sermons/live-streaming.md) — live services कॉन्फ़िगर करें
- [Sermons (Members)](../../b1-church/content/sermons.md) — सदस्यों के लिए sermon देखने का अनुभव
- [Live Streaming (Members)](../../b1-church/content/live-streaming.md) — सदस्यों के लिए live stream अनुभव
