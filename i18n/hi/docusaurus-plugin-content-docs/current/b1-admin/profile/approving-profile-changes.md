---
title: "प्रोफाइल परिवर्तनों को approve करना"
---

# प्रोफाइल परिवर्तनों को approve करना

<div class="article-intro">

जब आपका चर्च profile updates के लिए administrator approval की आवश्यकता करता है, तो सदस्य B1 Mobile app के माध्यम से अपने परिवर्तन submit करते हैं और वे requests B1 Admin में tasks के रूप में दिखाई देते हैं। यह guide बताता है कि कैसे उन्हें review और approve करना है।

</div>

<div class="prereqs">
<h4>शुरुआत करने से पहले</h4>

- आप उस group के एक सदस्य होने चाहिए जिसे **Mobile → Member portal** में **Directory Approval Group** के रूप में designate किया गया है
- यदि कोई approval group configure नहीं किया गया है, तो profile changes review के बिना तुरंत apply किए जाते हैं

</div>

## Pending Requests को कहां खोजें

जब एक सदस्य profile change submit करता है, तो यह आपके approval group को एक task के रूप में assigned दिखाई देता है। आप इसे दो जगह खोज सकते हैं:

**Dashboard से (आपका home page):**
1. B1 Admin में लॉगिन करें — Dashboard automatically load होगा।
2. दाईं ओर **Tasks** section में, **Assigned to My Groups** tab पर क्लिक करें।
3. कोई भी pending profile change requests वहां listed होंगे।

**Serving → My Work से:**
1. [Jump menu](../introduction.md#getting-around-with-the-jump-menu) खोलें (B1 Admin के ऊपरी-बाएं में खोज बार) और **Serving** को expand करें।
2. **My Work** पर क्लिक करें।
3. Tasks के अंतर्गत **Assigned to My Groups** tab पर क्लिक करें।

## एक Request को Review और Approve करना

1. **Profile Update** task पर क्लिक करें इसे खोलने के लिए।
2. **Requested Changes** के तहत, आप हर field को देखेंगे जिसे सदस्य update करना चाहता है उस नए value के साथ जिसे उन्होंने submit किया है।
3. परिवर्तनों को review करें।
4. परिवर्तनों को approve और save करने के लिए उनके profile में **Apply** पर क्लिक करें।

Task automatically close हो जाएगा एक बार जब changes apply हो जाएं।

## Approval Group को Setup करना

यदि आपका चर्च चाहता है कि profile changes को approval की आवश्यकता हो, तो एक Directory Approval Group को पहले configure किया जाना चाहिए।

1. Jump menu को खोलें और **Mobile** को expand करें।
2. **Member portal** पर क्लिक करें ("Portal settings" page)।
3. **Directory Approval Group** के तहत, वह group चुनें जिसके सदस्यों को profile change requests को review करना चाहिए।
4. **Save** पर क्लिक करें।

उस group के कोई भी सदस्य अपने Dashboard पर **Assigned to My Groups** के अंतर्गत incoming profile change requests को देखेंगे।

समान Directory Approval Group भी **account deletion requests** को review करता है — [Reviewing Account Deletion Requests](./account-deletion.md) देखें।

:::tip
सुनिश्चित करें कि आपके approvers actually configured group के सदस्य हैं — केवल group members को requests दिखाई देंगे।
:::

## संबंधित लेख

- [अपने Profile को प्रबंधित करना](./managing-profile.md) — अपनी खुद की account settings को edit करें
- [Account Deletion Requests को Review करना](./account-deletion.md) — account deletion के लिए समान approval-group review flow
- [B1 Mobile Settings](../../b1-mobile/profile/editing-profile.md) — जो सदस्य देखते हैं जब वे profile change submit करते हैं
