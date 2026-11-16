---
title: "प्रोफ़ाइल बदलावों को स्वीकृत करना"
description: "B1 Admin में सदस्यों के प्रोफ़ाइल बदलाव के अनुरोधों की समीक्षा करें और उन्हें स्वीकृत करें, और वह Directory Approval Group सेट करें जो उन्हें प्राप्त करता है।"
---

# प्रोफ़ाइल बदलावों को स्वीकृत करना {#approving-profile-changes}

<div class="article-intro">

जब आपका चर्च प्रोफ़ाइल अपडेट के लिए administrator की स्वीकृति माँगता है, तो सदस्य अपने बदलाव B1 App के माध्यम से भेजते हैं और वे अनुरोध B1 Admin में tasks के रूप में दिखते हैं। यह गाइड बताती है कि उनकी समीक्षा और स्वीकृति कैसे करें।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- आपको **Mobile &rarr; Member portal** में **Directory Approval Group** के रूप में नामित group का सदस्य होना चाहिए
- अगर कोई approval group कॉन्फ़िगर नहीं है, तो प्रोफ़ाइल बदलाव बिना समीक्षा के तुरंत लागू हो जाते हैं

</div>

## लंबित अनुरोध कहाँ मिलते हैं {#where-to-find-pending-requests}

जब कोई सदस्य प्रोफ़ाइल बदलाव भेजता है, तो वह आपके approval group को सौंपे गए task के रूप में दिखता है। आप इसे दो जगह पा सकते हैं:

**Dashboard (आपके होम पेज) से:**
1. B1 Admin में लॉग इन करें — Dashboard अपने-आप लोड होता है।
2. **My tasks** सेक्शन में **All tasks** पर क्लिक करें। (My tasks केवल वे खुले tasks दिखाता है जो आपको व्यक्तिगत रूप से सौंपे गए हैं।)
3. **Assigned to My Groups** tab पर क्लिक करें। कोई भी लंबित प्रोफ़ाइल बदलाव अनुरोध वहाँ सूचीबद्ध होंगे।

**Serving &rarr; My Work से:**
1. [Jump menu](../introduction.md#getting-around-with-the-jump-menu) खोलें (B1 Admin के ऊपर-बाईं ओर का सर्च बार) और **Serving** खोलें।
2. **My Work** पर क्लिक करें।
3. Tasks के अंतर्गत **Assigned to My Groups** tab पर क्लिक करें।

## अनुरोध की समीक्षा और स्वीकृति {#reviewing-and-approving-a-request}

1. task खोलने के लिए **Profile Update** task पर क्लिक करें।
2. **Requested Changes** के अंतर्गत, हर वह फ़ील्ड दिखेगा जिसे सदस्य अपडेट करना चाहता है, साथ में उसका भेजा गया नया मान।
3. बदलावों की समीक्षा करें।
4. स्वीकृति देने और उनके प्रोफ़ाइल में बदलाव सहेजने के लिए **Apply** पर क्लिक करें।

परिवार के किसी सदस्य को जोड़ने के अनुरोध में नए व्यक्ति का title, नाम, household भूमिका, मोबाइल फ़ोन, और ईमेल एक पंक्ति में दिखते हैं (उदाहरण के लिए, *Mr John Smith · Child · 555-0100 · john@example.com*)। अगर सदस्य ने फ़ोटो जोड़ी है, तो वह उसके बगल में दिखती है। इसे लागू करने पर उस सदस्य के household में उन विवरणों और फ़ोटो के साथ वह व्यक्ति बन जाता है।

बदलाव लागू होते ही task अपने-आप बंद हो जाता है।

## Approval Group सेट करना {#setting-up-the-approval-group}

अगर आपका चर्च चाहता है कि प्रोफ़ाइल बदलावों के लिए स्वीकृति चाहिए, तो पहले Directory Approval Group कॉन्फ़िगर होना ज़रूरी है।

1. Jump menu खोलें और **Mobile** खोलें।
2. **Member portal** पर क्लिक करें (the "Portal settings" पेज)।
3. **Directory Approval Group** के अंतर्गत वह group चुनें जिसके सदस्य प्रोफ़ाइल बदलाव अनुरोधों की समीक्षा करें।
4. **Save** पर क्लिक करें।

उस group का कोई भी सदस्य अपने Dashboard पर **Assigned to My Groups** के अंतर्गत आने वाले प्रोफ़ाइल बदलाव अनुरोध देखेगा।

वही Directory Approval Group **खाता हटाने के अनुरोधों** की भी समीक्षा करता है — देखें [Reviewing Account Deletion Requests](./account-deletion.md)।

:::tip
सुनिश्चित करें कि आपके approvers वास्तव में कॉन्फ़िगर किए गए group के सदस्य हैं — केवल group के सदस्य ही अनुरोध देखेंगे।
:::

## संबंधित लेख {#related-articles}

- [Managing Your Profile](./managing-profile.md) — अपने खाते की सेटिंग्स संपादित करें
- [Reviewing Account Deletion Requests](./account-deletion.md) — खाता हटाने के लिए वही approval-group समीक्षा प्रवाह
- [Editing Your Profile](../../b1-church/getting-started/editing-your-profile.md) — प्रोफ़ाइल बदलाव भेजने पर सदस्य क्या देखते हैं
